import { NextResponse } from 'next/server';
import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// ════════════════════════════════════════════════════════════════
//  Move a student from one class to another. Because a student's login
//  is derived from the class CODE + username, the move must also update
//  their auth email + password — so this runs server-side with the
//  Admin SDK (lazy-init, so a missing config never breaks the build).
//  Competencies + parent contact are carried over; the same uid is kept.
//  Allowed for: an admin (any classes), or a coach who owns BOTH classes.
// ════════════════════════════════════════════════════════════════

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

function admin() {
  if (!getApps().length) {
    const projectId = process.env.FIREBASE_PROJECT_ID;
    const clientEmail = process.env.FIREBASE_CLIENT_EMAIL;
    const privateKey = process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    if (!projectId || !clientEmail || !privateKey) throw new Error('admin-config-missing');
    initializeApp({ credential: cert({ projectId, clientEmail, privateKey }) });
  }
  return { db: getFirestore(), auth: getAuth() };
}

const normalizeCode = (c: string) => c.toLowerCase().replace(/[^a-z0-9]/g, '');

export async function POST(req: Request) {
  let svc;
  try { svc = admin(); } catch { return NextResponse.json({ error: 'Firebase Admin not configured.' }, { status: 503 }); }
  const { db, auth } = svc;

  const token = req.headers.get('authorization')?.replace(/^Bearer\s+/i, '');
  if (!token) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  let caller;
  try { caller = await auth.verifyIdToken(token); } catch { return NextResponse.json({ error: 'Unauthorized' }, { status: 401 }); }

  const callerRole = (await db.collection('users').doc(caller.uid).get()).data()?.role;
  if (callerRole !== 'admin' && callerRole !== 'coach') return NextResponse.json({ error: 'Forbidden' }, { status: 403 });

  let body: { studentUid?: string; fromClassId?: string; toClassId?: string };
  try { body = await req.json(); } catch { return NextResponse.json({ error: 'Bad request' }, { status: 400 }); }
  const { studentUid, fromClassId, toClassId } = body;
  if (!studentUid || !fromClassId || !toClassId) return NextResponse.json({ error: 'Missing fields.' }, { status: 400 });
  if (fromClassId === toClassId) return NextResponse.json({ error: 'Pick a different class.' }, { status: 400 });

  const fromClass = (await db.collection('classes').doc(fromClassId).get()).data();
  const toClass = (await db.collection('classes').doc(toClassId).get()).data();
  if (!fromClass || !toClass) return NextResponse.json({ error: 'Class not found.' }, { status: 404 });

  if (callerRole === 'coach' && (fromClass.coachId !== caller.uid || toClass.coachId !== caller.uid)) {
    return NextResponse.json({ error: 'Coaches can only move students within their own classes.' }, { status: 403 });
  }

  const fromRef = db.collection('classes').doc(fromClassId).collection('students').doc(studentUid);
  const roster = (await fromRef.get()).data();
  if (!roster) return NextResponse.json({ error: 'Student not found in the source class.' }, { status: 404 });

  const username = String(roster.username || '').toLowerCase();
  const toCode = toClass.code as string;
  const newEmail = `${username}.${normalizeCode(toCode)}@students.roboholic.app`;
  const newPassword = `rh-${normalizeCode(toCode)}-${username}`;

  try {
    await auth.updateUser(studentUid, { email: newEmail, password: newPassword });
  } catch (e: unknown) {
    const code = typeof e === 'object' && e && 'code' in e ? String((e as { code: unknown }).code) : '';
    if (code === 'auth/email-already-exists') {
      return NextResponse.json({ error: 'A student with that username already exists in the target class — rename one first.' }, { status: 409 });
    }
    return NextResponse.json({ error: 'Could not update the student login.' }, { status: 500 });
  }

  await db.collection('users').doc(studentUid).set({ classId: toClassId, classCode: toCode, email: newEmail }, { merge: true });
  await db.collection('classes').doc(toClassId).collection('students').doc(studentUid).set({ ...roster, createdAt: roster.createdAt || new Date().toISOString() });
  await fromRef.delete();

  return NextResponse.json({ ok: true, newCode: toCode, username });
}
