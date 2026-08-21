import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import nodemailer from 'nodemailer';

// ════════════════════════════════════════════════════════════════
//  Public enrollment form for the 2026–2027 school-year classes.
//  POST only: validates the parent's submission and stores it in the
//  `registrations` collection via the Admin SDK (Firestore stays locked —
//  only the admin can read/update registrations from the app).
//  Best-effort: emails the director a notification when SMTP is configured.
// ════════════════════════════════════════════════════════════════

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function db() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!projectId || !clientEmail || !privateKey) throw new Error('admin-config-missing');
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return getFirestore();
}

const clip = (v: unknown, max: number) => String(v ?? '').trim().slice(0, max);

export async function POST(req: Request) {
  let body: Record<string, unknown>;
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }

  // Honeypot: real parents never fill the hidden "website" field — bots do.
  if (clip(body.website, 10)) return NextResponse.json({ ok: true });

  const reg = {
    childName: clip(body.childName, 120),
    dob: clip(body.dob, 20),
    ageGroup: clip(body.ageGroup, 10),
    parentName: clip(body.parentName, 120),
    parentPhone: clip(body.parentPhone, 30),
    parentEmail: clip(body.parentEmail, 160),
    schedule: clip(body.schedule, 60),
    notes: clip(body.notes, 1500),
    status: 'new' as const,
    createdAt: new Date().toISOString(),
  };
  if (!reg.childName || !reg.parentName || !reg.parentPhone) {
    return NextResponse.json({ error: 'Please fill the child\'s name, your name and your WhatsApp number.' }, { status: 400 });
  }

  let store;
  try { store = db(); } catch { return NextResponse.json({ error: 'Registrations are not open yet — please try again later.' }, { status: 503 }); }
  await store.collection('registrations').add(reg);

  // Notify the director (best-effort — never fails the registration).
  const { SMTP_HOST, SMTP_USER, SMTP_PASS } = process.env;
  if (SMTP_HOST && SMTP_USER && SMTP_PASS) {
    try {
      const port = Number(process.env.SMTP_PORT || 587);
      const t = nodemailer.createTransport({ host: SMTP_HOST, port, secure: port === 465, auth: { user: SMTP_USER, pass: SMTP_PASS } });
      await t.sendMail({
        from: `RoboHolic Enrollment <${SMTP_USER}>`,
        to: SMTP_USER,
        subject: `New 2026–2027 registration: ${reg.childName}`,
        text: `A parent registered a child for 2026–2027:\n\nChild: ${reg.childName}${reg.dob ? ` (DOB ${reg.dob})` : ''}${reg.ageGroup ? ` · ages ${reg.ageGroup}` : ''}\nParent: ${reg.parentName}\nWhatsApp: ${reg.parentPhone}\nEmail: ${reg.parentEmail || '—'}\nPreferred schedule: ${reg.schedule || '—'}\nNotes: ${reg.notes || '—'}\n\nSee all registrations: Admin Panel → Registrations.`,
      });
    } catch { /* notification only */ }
  }

  return NextResponse.json({ ok: true });
}
