// ════════════════════════════════════════════════════════════════
//  List every student whose parent EMAIL is missing (so progress
//  reports can't be emailed), with the parent's name & phone.
//  Also prints per-class student counts (to spot duplicate classes).
//
//  RUN (repo root):  node scripts/list-missing-emails.mjs
//  Needs scripts/serviceAccountKey.json (local only, never committed).
// ════════════════════════════════════════════════════════════════
import { readFileSync } from 'node:fs';
import admin from 'firebase-admin';

const key = JSON.parse(readFileSync(new URL('./serviceAccountKey.json', import.meta.url), 'utf8'));
admin.initializeApp({ credential: admin.credential.cert(key) });
const db = admin.firestore();

const classes = await db.collection('classes').get();
let totalStudents = 0, totalMissing = 0;
const missing = [];
console.log('=== Classes ===');
for (const c of classes.docs) {
  const d = c.data();
  const students = await db.collection('classes').doc(c.id).collection('students').get();
  totalStudents += students.size;
  console.log(`  ${d.name}  (coach ${d.coachName ?? '?'}, code ${d.code}) — ${students.size} students`);
  for (const sd of students.docs) {
    const s = sd.data();
    if (!(s.parentEmail || '').trim()) {
      totalMissing++;
      missing.push({ cls: d.name, name: s.displayName, parent: s.parentName || '(no parent name)', phone: s.parentPhone || '(no phone)' });
    }
  }
}
console.log(`\n=== Students missing a parent EMAIL: ${totalMissing} of ${totalStudents} ===`);
for (const m of missing) console.log(`  ${m.name.padEnd(28)} ${m.cls.padEnd(34)} parent: ${m.parent} · ${m.phone}`);
process.exit(0);
