// ════════════════════════════════════════════════════════════════
//  Classes & student-account helpers (all client-side, $0 / Spark).
//
//  Students don't have email addresses. Instead, each student gets:
//    • a USERNAME  (e.g. "sami42") generated from their first name
//    • a 4-digit PIN
//  and logs in with: class code + username + PIN.
//
//  Under the hood we map those to a synthetic Firebase email/password:
//    email    = {username}.{code}@students.roboholic.app
//    password = rh{PIN}{code}
//  Student auth accounts are created from a SECONDARY Firebase app
//  instance so the signed-in coach never gets logged out.
// ════════════════════════════════════════════════════════════════
import { initializeApp, getApps } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword, signOut as sdkSignOut } from 'firebase/auth';
import {
  getFirestore, doc, setDoc, collection, addDoc, getDocs, getDoc,
  updateDoc, query, where, orderBy, deleteDoc,
} from 'firebase/firestore';
import { db, firebaseConfig } from '@/lib/firebase/client';
import type { ClassDoc, ClassStudent } from '@/types';

// Unambiguous characters (no 0/O, 1/I/L) — kid-proof class codes.
const CODE_CHARS = 'ABCDEFGHJKMNPQRSTUVWXYZ23456789';

export function generateClassCode(): string {
  let s = '';
  for (let i = 0; i < 5; i++) s += CODE_CHARS[Math.floor(Math.random() * CODE_CHARS.length)];
  return `RH-${s}`;
}

/** Normalize a class code for matching/emails: "rh-k7m2p" → "rhk7m2p". */
export function normalizeCode(code: string): string {
  return code.toLowerCase().replace(/[^a-z0-9]/g, '');
}

export function generatePin(): string {
  return String(Math.floor(1000 + Math.random() * 9000));
}

export function generateUsername(displayName: string): string {
  const first = (displayName.trim().split(/\s+/)[0] || 'robot')
    .toLowerCase().normalize('NFD').replace(/[^a-z0-9]/g, '').slice(0, 12) || 'robot';
  return `${first}${Math.floor(10 + Math.random() * 90)}`;
}

export function studentEmail(username: string, code: string): string {
  return `${username.toLowerCase()}.${normalizeCode(code)}@students.roboholic.app`;
}

// Deterministic from class code + username (no PIN), so login can rebuild it
// from just the class code + username the coach hands out.
export function studentPassword(code: string, username: string): string {
  return `rh-${normalizeCode(code)}-${username.toLowerCase()}`;
}

// ─── Class CRUD (run as the signed-in coach) ─────────────────────
export async function createClass(coachId: string, coachName: string, name: string): Promise<ClassDoc> {
  const code = generateClassCode();
  const data = {
    name: name.trim(),
    coachId,
    coachName,
    code,
    lessonIds: [] as string[],
    createdAt: new Date().toISOString(),
  };
  const ref = await addDoc(collection(db, 'classes'), data);
  return { id: ref.id, ...data };
}

export async function getCoachClasses(coachId: string): Promise<ClassDoc[]> {
  const snap = await getDocs(query(collection(db, 'classes'), where('coachId', '==', coachId)));
  return snap.docs
    .map(d => ({ id: d.id, ...(d.data() as Omit<ClassDoc, 'id'>) }))
    .sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
}

export async function getClass(classId: string): Promise<ClassDoc | null> {
  const snap = await getDoc(doc(db, 'classes', classId));
  return snap.exists() ? ({ id: snap.id, ...(snap.data() as Omit<ClassDoc, 'id'>) }) : null;
}

export async function setAssignedLessons(classId: string, lessonIds: string[]): Promise<void> {
  await updateDoc(doc(db, 'classes', classId), { lessonIds });
}

export async function getClassStudents(classId: string): Promise<ClassStudent[]> {
  const snap = await getDocs(query(collection(db, 'classes', classId, 'students'), orderBy('createdAt')));
  return snap.docs.map(d => d.data() as ClassStudent);
}

export async function removeStudentFromRoster(classId: string, uid: string): Promise<void> {
  await deleteDoc(doc(db, 'classes', classId, 'students', uid));
}

export async function renameStudent(classId: string, uid: string, displayName: string): Promise<void> {
  await updateDoc(doc(db, 'classes', classId, 'students', uid), { displayName: displayName.trim() });
}

// ─── Per-student competency tracking & parent reports ────────────
/** Replace the student's whole competency map (caller holds the full map). */
export async function setStudentCompetencies(classId: string, uid: string, competencies: Record<string, string>): Promise<void> {
  await setDoc(doc(db, 'classes', classId, 'students', uid), { competencies }, { merge: true });
}

/** Record that a parent report was generated now (resets "new since last report"). */
export async function markReportSent(classId: string, uid: string, atISO: string): Promise<void> {
  await updateDoc(doc(db, 'classes', classId, 'students', uid), { lastReportAt: atISO });
}

/** Save optional parent contact details on the roster entry. */
export async function setParentContact(
  classId: string, uid: string,
  contact: { parentName?: string; parentPhone?: string; parentEmail?: string }
): Promise<void> {
  await updateDoc(doc(db, 'classes', classId, 'students', uid), contact);
}

/** Deletes a class and its whole roster. (Student auth accounts become
 *  unused — they can't reach anything without an assigned class.) */
export async function deleteClass(classId: string): Promise<void> {
  const roster = await getDocs(collection(db, 'classes', classId, 'students'));
  await Promise.all(roster.docs.map(d => deleteDoc(d.ref)));
  await deleteDoc(doc(db, 'classes', classId));
}

// ─── Student account creation (secondary app keeps coach signed in) ──
function getSecondaryApp() {
  const NAME = 'student-factory';
  return getApps().find(a => a.name === NAME) ?? initializeApp(firebaseConfig, NAME);
}

export interface NewStudentResult {
  student: ClassStudent;
}

export async function addStudentToClass(
  cls: ClassDoc,
  displayName: string
): Promise<NewStudentResult> {
  const app2 = getSecondaryApp();
  const auth2 = getAuth(app2);
  const db2 = getFirestore(app2);

  let lastErr: unknown = null;

  // Retry a few times in case a generated username already exists.
  for (let attempt = 0; attempt < 4; attempt++) {
    const username = generateUsername(displayName);
    const email = studentEmail(username, cls.code);
    const password = studentPassword(cls.code, username);
    try {
      const cred = await createUserWithEmailAndPassword(auth2, email, password);
      const uid = cred.user.uid;

      // The new student writes their own profile (allowed by rules: owner + role student).
      await setDoc(doc(db2, 'users', uid), {
        full_name: displayName.trim(),
        email,
        role: 'student',
        status: 'approved',
        classId: cls.id,
        classCode: cls.code,
        username,
        is_active: true,
        created_at: new Date().toISOString(),
      });
      await sdkSignOut(auth2);

      // The coach (primary app) writes the roster entry.
      const student: ClassStudent = {
        uid, displayName: displayName.trim(), username,
        createdAt: new Date().toISOString(),
      };
      await setDoc(doc(db, 'classes', cls.id, 'students', uid), student);
      return { student };
    } catch (err) {
      lastErr = err;
      const code = typeof err === 'object' && err && 'code' in err ? String((err as { code: unknown }).code) : '';
      if (code !== 'auth/email-already-in-use') throw err;
      // else: collision — loop and try a new username
    }
  }
  throw lastErr ?? new Error('Could not create the student account.');
}
