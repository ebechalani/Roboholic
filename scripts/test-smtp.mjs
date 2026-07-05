// ════════════════════════════════════════════════════════════════
//  Local SMTP credential test — runs on YOUR machine, nothing stored.
//  Verifies the Gmail app password works before putting it in Vercel.
//
//  RUN (PowerShell, repo root):
//    $env:SMTP_USER = "ebechalani@gmail.com"
//    $env:SMTP_PASS = "<the 16-character app password>"
//    node scripts/test-smtp.mjs
//
//  Success = "LOGIN OK" + a test email in your own inbox.
// ════════════════════════════════════════════════════════════════
import nodemailer from 'nodemailer';

const host = process.env.SMTP_HOST || 'smtp.gmail.com';
const port = Number(process.env.SMTP_PORT || 465);
const user = (process.env.SMTP_USER || '').trim();
const pass = (process.env.SMTP_PASS || '').replace(/\s+/g, '');

if (!user || !pass) {
  console.error('Set SMTP_USER and SMTP_PASS first (see the header of this file).');
  process.exit(1);
}
console.log(`host=${host} port=${port}`);
console.log(`user="${user}" (${user.length} chars)`);
console.log(`pass: ${pass.length} characters (not shown)`);
if (host.includes('gmail') && pass.length !== 16) {
  console.warn(`!! A Gmail app password is EXACTLY 16 letters — yours has ${pass.length}. This is probably the problem: create one at https://myaccount.google.com/apppasswords`);
}

const t = nodemailer.createTransport({ host, port, secure: port === 465, auth: { user, pass } });
try {
  await t.verify();
  console.log('LOGIN OK ✓ — Gmail accepted these credentials.');
} catch (e) {
  console.error('LOGIN FAILED ✗ —', e.message);
  console.error('\nIf it says BadCredentials: the app password is wrong/revoked, was created on another Google account, or 2-Step Verification is off.');
  process.exit(1);
}
const to = process.env.TEST_TO || user;
await t.sendMail({ from: `RoboHolic Robotics Academy <${user}>`, to, subject: 'RoboHolic SMTP test ✓', text: 'It works! These exact values can go into Vercel.' });
console.log(`TEST EMAIL SENT to ${to} — check the inbox.`);
