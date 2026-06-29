import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// ════════════════════════════════════════════════════════════════
//  Public parent "registration confirmation" page data.
//  A capability link (?c=<classId>&s=<studentUid>) lets a parent see
//  ONLY their child's safe info — name, group, coach, and login
//  (username + class code). NEVER any curriculum / lesson data.
//  Reads/writes go through the Admin SDK so Firestore stays locked.
//  GET  → the safe fields.  POST → save the child's date of birth.
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

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const c = searchParams.get('c'); const s = searchParams.get('s');
  if (!c || !s) return NextResponse.json({ error: 'This link is incomplete.' }, { status: 400 });
  let store;
  try { store = db(); } catch { return NextResponse.json({ error: 'Not configured yet.' }, { status: 503 }); }
  const cls = (await store.collection('classes').doc(c).get()).data();
  const stu = (await store.collection('classes').doc(c).collection('students').doc(s).get()).data();
  if (!cls || !stu) return NextResponse.json({ error: 'We could not find this registration.' }, { status: 404 });
  // Only safe, non-curriculum fields are ever returned.
  return NextResponse.json({
    studentName: stu.displayName ?? '',
    className: cls.name ?? '',
    coachName: cls.coachName ?? '',
    classCode: cls.code ?? '',
    username: stu.username ?? '',
    dob: stu.dob ?? null,
    confirmed: !!stu.confirmedAt,
  });
}

export async function POST(req: Request) {
  let body: { c?: string; s?: string; dob?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }
  const { c, s, dob } = body;
  if (!c || !s || !dob) return NextResponse.json({ error: 'Please enter your child\'s date of birth.' }, { status: 400 });
  let store;
  try { store = db(); } catch { return NextResponse.json({ error: 'Not configured yet.' }, { status: 503 }); }
  const ref = store.collection('classes').doc(c).collection('students').doc(s);
  if (!(await ref.get()).exists) return NextResponse.json({ error: 'Registration not found.' }, { status: 404 });
  await ref.set({ dob, confirmedAt: new Date().toISOString() }, { merge: true });
  return NextResponse.json({ ok: true });
}
