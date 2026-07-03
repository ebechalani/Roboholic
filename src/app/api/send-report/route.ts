import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// ════════════════════════════════════════════════════════════════
//  Sends a parent progress report by email. Two providers, $0 both:
//
//  1) SMTP (preferred) — send from the director's own mailbox, e.g.
//     Microsoft 365 (makexlebanon.com). Env vars (Vercel / .env.local):
//       SMTP_HOST  e.g. smtp.office365.com
//       SMTP_PORT  e.g. 587
//       SMTP_USER  e.g. eddy.bachaalany@makexlebanon.com
//       SMTP_PASS  the mailbox (or app) password
//       REPORT_FROM_EMAIL  optional display From, defaults to
//         "RoboHolic Robotics Academy <SMTP_USER>"
//
//  2) Resend fallback — RESEND_API_KEY (+ REPORT_FROM_EMAIL verified there).
//
//  Auth: the caller must pass a valid Firebase ID token (Authorization:
//  Bearer <token>) — verified against this project so the endpoint isn't an
//  open email relay. No Admin SDK needed (stays on the Spark/free plan).
// ════════════════════════════════════════════════════════════════

export const runtime = 'nodejs';

export async function POST(req: Request) {
  const smtpHost = process.env.SMTP_HOST;
  const smtpUser = process.env.SMTP_USER;
  const smtpPass = process.env.SMTP_PASS;
  const resendKey = process.env.RESEND_API_KEY;
  const hasSmtp = !!(smtpHost && smtpUser && smtpPass);
  if (!hasSmtp && !resendKey) {
    return NextResponse.json({ error: 'Email is not configured yet — set SMTP_HOST/SMTP_USER/SMTP_PASS (or RESEND_API_KEY) in Vercel and redeploy.' }, { status: 503 });
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

  // ── 1) SMTP — the director's own mailbox is the sender ─────────
  if (hasSmtp) {
    const from = process.env.REPORT_FROM_EMAIL || `RoboHolic Robotics Academy <${smtpUser}>`;
    try {
      const port = Number(process.env.SMTP_PORT || 587);
      const transport = nodemailer.createTransport({
        host: smtpHost,
        port,
        secure: port === 465,            // 587 = STARTTLS, 465 = implicit TLS
        auth: { user: smtpUser, pass: smtpPass },
      });
      await transport.sendMail({ from, to, subject, text });
      return NextResponse.json({ ok: true, via: 'smtp' });
    } catch (e) {
      const detail = e instanceof Error ? e.message : 'SMTP send failed.';
      return NextResponse.json({ error: 'The mailbox refused the send — check SMTP settings (is Authenticated SMTP enabled for the mailbox?).', detail }, { status: 502 });
    }
  }

  // ── 2) Resend fallback ──────────────────────────────────────────
  const from = process.env.REPORT_FROM_EMAIL || 'RoboHolic Academy <onboarding@resend.dev>';
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${resendKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from, to: [to], subject, text }),
  });
  if (!r.ok) {
    const detail = await r.text().catch(() => '');
    return NextResponse.json({ error: 'Email provider rejected the send.', detail }, { status: 502 });
  }
  return NextResponse.json({ ok: true, via: 'resend' });
}
