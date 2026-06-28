import { NextResponse } from 'next/server';

// ════════════════════════════════════════════════════════════════
//  Sends a parent progress report by email via Resend (free tier).
//  Config (Vercel / .env.local):
//    RESEND_API_KEY     — from resend.com (required to actually send)
//    REPORT_FROM_EMAIL  — verified sender, e.g. "RoboHolic <reports@roboholic.app>"
//                         (defaults to Resend's onboarding sender for testing)
//  Auth: the caller must pass a valid Firebase ID token (Authorization:
//  Bearer <token>) — verified against this project so the endpoint isn't an
//  open email relay. No Admin SDK needed (stays on the Spark/free plan).
// ════════════════════════════════════════════════════════════════

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const key = process.env.RESEND_API_KEY;
  const from = process.env.REPORT_FROM_EMAIL || 'RoboHolic Academy <onboarding@resend.dev>';
  if (!key) {
    return NextResponse.json({ error: 'Email is not configured yet (RESEND_API_KEY missing).' }, { status: 503 });
  }

  // Verify the caller is a signed-in user of this Firebase project.
  const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token || !apiKey) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  try {
    const v = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${apiKey}`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ idToken: token }),
    });
    if (!v.ok) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  } catch {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  let body: { to?: string; subject?: string; text?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }
  const { to, subject, text } = body;
  if (!to || !subject || !text) return NextResponse.json({ error: 'Missing to / subject / text.' }, { status: 400 });

  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${key}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    return NextResponse.json({ error: 'Email provider rejected the send.', detail }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
