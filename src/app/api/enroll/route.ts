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
    // Which activity (tab): robotics | drawing | muaythai
    activity: (['robotics', 'drawing', 'muaythai'] as const).includes(body.activity as 'robotics') ? (body.activity as 'robotics' | 'drawing' | 'muaythai') : 'robotics',
    activityName: clip(body.activityName, 40),
    // Branch + chosen weekly class time
    branch: clip(body.branch, 30),
    branchName: clip(body.branchName, 60),
    trackName: clip(body.trackName, 60),
    slotId: clip(body.slotId, 40),
    slotLabel: clip(body.slotLabel, 60),
    otherDay: clip(body.otherDay, 120),
    // MakeX competition squad
    makex: body.makex === true,
    makexSlotId: clip(body.makexSlotId, 40),
    makexSlotLabel: clip(body.makexSlotLabel, 60),
    // Chess club
    chess: body.chess === true,
    chessSlotId: clip(body.chessSlotId, 40),
    chessSlotLabel: clip(body.chessSlotLabel, 60),
    // Muay Thai
    muayThai: body.muayThai === true,
    muayThaiSlotId: clip(body.muayThaiSlotId, 40),
    muayThaiSlotLabel: clip(body.muayThaiSlotLabel, 60),
    schedule: clip(body.schedule, 60),
    notes: clip(body.notes, 1500),
    status: 'new' as const,
    createdAt: new Date().toISOString(),
  };
  if (!reg.childName || !reg.parentName || !reg.parentPhone || !reg.parentEmail) {
    return NextResponse.json({ error: 'Please fill the child\'s name, your name, your WhatsApp number and your email.' }, { status: 400 });
  }
  if (!/^[^@\s]+@[^@\s.]+\.[^@\s]+$/.test(reg.parentEmail)) {
    return NextResponse.json({ error: 'That email address doesn\'t look right — please check it.' }, { status: 400 });
  }
  if (!reg.slotLabel && !reg.otherDay) {
    return NextResponse.json({ error: 'Please pick a class time — or tell us the day that suits you.' }, { status: 400 });
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
        subject: `New 2026–2027 registration (${reg.activityName || reg.activity}): ${reg.childName}${reg.makex ? ' + MakeX' : ''}${reg.chess ? ' + Chess' : ''}`,
        text: [
          'A parent registered a child for 2026–2027:',
          '',
          `Child:   ${reg.childName}${reg.dob ? ` (DOB ${reg.dob})` : ''}`,
          `Activity: ${reg.activityName || reg.activity}`,
          `Class:   ${reg.trackName || reg.ageGroup || '—'}`,
          `Branch:  ${reg.branchName || reg.branch || '—'}`,
          `Time:    ${reg.slotLabel || '(none picked)'}`,
          ...(reg.otherDay ? [`REQUESTED ANOTHER DAY: ${reg.otherDay}  ← needs your confirmation`] : []),
          ...(reg.makex ? [`MakeX:   YES${reg.makexSlotLabel ? ` — ${reg.makexSlotLabel}` : ' (branch has no squad — arrange at Jdeideh)'}`] : []),
          ...(reg.chess ? [`Chess:   YES${reg.chessSlotLabel ? ` — ${reg.chessSlotLabel}` : ' (branch has no club — arrange at Jdeideh)'}`] : []),
          ...(reg.muayThai ? [`MuayThai: YES${reg.muayThaiSlotLabel ? ` — ${reg.muayThaiSlotLabel}` : ' (branch has no class — arrange at Jdeideh)'}`] : []),
          '',
          `Parent:  ${reg.parentName}`,
          `WhatsApp: ${reg.parentPhone}`,
          `Email:   ${reg.parentEmail || '—'}`,
          `Notes:   ${reg.notes || '—'}`,
          '',
          'See all registrations: Admin Panel → Registrations.',
        ].join('\n'),
      });
    } catch { /* notification only */ }
  }

  return NextResponse.json({ ok: true });
}
