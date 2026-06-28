import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { composeReport } from '@/lib/report';
import type { ClassStudent } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Daily parent reports — fired by Vercel Cron (see vercel.json).
//  Emails every parent whose child has NEW competencies since the
//  child's last report, then stamps lastReportAt so nothing repeats.
//  Uses the Admin SDK (bypasses security rules) — initialized lazily
//  so a missing config never breaks the build, only this request.
//  Config: FIREBASE_PROJECT_ID/CLIENT_EMAIL/PRIVATE_KEY, RESEND_API_KEY,
//  REPORT_FROM_EMAIL, and (recommended) CRON_SECRET.
// ════════════════════════════════════════════════════════════════

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
export const maxDuration = 60;

function adminDb() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!projectId || !clientEmail || !privateKey) throw new Error('admin-config-missing');
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getFirestore();
}

async function sendEmail(key: string, from: string, to: string, subject: string, text: string) {
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  return r.ok;
}

export async function GET(req: Request) {
  // Only the Vercel cron (which sends this header when CRON_SECRET is set) may run it.
  const secret = process.env.CRON_SECRET;
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const resendKey = process.env.RESEND_API_KEY;
  const from = process.env.REPORT_FROM_EMAIL || 'RoboHolic Academy <onboarding@resend.dev>';
  if (!resendKey) return NextResponse.json({ error: 'RESEND_API_KEY not set.' }, { status: 503 });

  let db;
  try { db = adminDb(); }
  catch { return NextResponse.json({ error: 'Firebase Admin not configured.' }, { status: 503 }); }

  let sent = 0, skipped = 0, failed = 0;
  const classes = await db.collection('classes').get();
  for (const c of classes.docs) {
    const cls = c.data() as { coachName?: string; lessonIds?: string[] };
    const lessonIds = cls.lessonIds ?? [];
    const coachName = cls.coachName || 'Coach';
    const roster = await db.collection('classes').doc(c.id).collection('students').get();
    for (const sd of roster.docs) {
      const s = sd.data() as ClassStudent;
      if (!s.parentEmail) { skipped++; continue; }
      const r = composeReport(s, 'new', s.competencies ?? {}, lessonIds, coachName);
      if (r.count === 0) { skipped++; continue; }
      const ok = await sendEmail(resendKey, from, s.parentEmail, r.subject, r.text);
      if (ok) {
        await db.collection('classes').doc(c.id).collection('students').doc(sd.id).update({ lastReportAt: new Date().toISOString() });
        sent++;
      } else { failed++; }
    }
  }
  return NextResponse.json({ ok: true, sent, skipped, failed });
}
