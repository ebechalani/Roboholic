'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Loader2, Plus, Users, Hash, BookOpen, Printer, ChevronLeft,
  KeyRound, Trash2, CheckCircle, AlertCircle, GraduationCap,
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import {
  createClass, getCoachClasses, getClassStudents, addStudentToClass,
  setAssignedLessons, removeStudentFromRoster,
} from '@/lib/classes';
import { ALL_COURSES, ALL_LESSONS } from '@/lib/curricula';
import type { ClassDoc, ClassStudent } from '@/types';

export default function CoachClassesPage() {
  return (
    <RequireRole allow={['coach', 'admin']}>
      <Classes />
    </RequireRole>
  );
}

function Classes() {
  const { profile, configured } = useAuth();
  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [selected, setSelected] = useState<ClassDoc | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!configured || !profile) { setLoading(false); return; }
    setLoading(true); setError('');
    try {
      setClasses(await getCoachClasses(profile.uid));
    } catch {
      setError('Could not load classes — make sure the updated Firestore rules are published.');
    } finally {
      setLoading(false);
    }
  }, [configured, profile]);

  useEffect(() => { void load(); }, [load]);

  return (
    <div className="flex min-h-screen" style={{ background: '#F8FAFF' }}>
      <Sidebar role="coach" userName={profile?.full_name || 'Coach'} userEmoji="🎓" />
      <main className="flex-1 ml-64">
        <header className="px-8 py-6 hero-bg">
          <h1 className="text-3xl font-black text-white mb-1">My Classes 🏫</h1>
          <p className="text-white/60">Create classes, add students, and assign lessons.</p>
        </header>

        <div className="p-8 max-w-5xl">
          {error && (
            <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-5">
              <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
            </div>
          )}

          {!configured ? (
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-6 text-amber-800 text-sm">
              Demo mode — class management needs Firebase configured.
            </div>
          ) : loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : selected ? (
            <ClassDetail
              cls={selected}
              onBack={() => { setSelected(null); void load(); }}
              onUpdated={(c) => setSelected(c)}
            />
          ) : (
            <ClassList classes={classes} onCreated={load} onOpen={setSelected} coachId={profile!.uid} coachName={profile!.full_name} />
          )}
        </div>
      </main>
    </div>
  );
}

// ─── Class list + create ─────────────────────────────────────────
function ClassList({ classes, onCreated, onOpen, coachId, coachName }: {
  classes: ClassDoc[];
  onCreated: () => Promise<void> | void;
  onOpen: (c: ClassDoc) => void;
  coachId: string;
  coachName: string;
}) {
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;
    setBusy(true); setError('');
    try {
      await createClass(coachId, coachName, name);
      setName('');
      await onCreated();
    } catch {
      setError('Could not create the class — check the Firestore rules are published.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Create */}
      <form onSubmit={handleCreate} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-wrap items-end gap-3">
        <div className="flex-1 min-w-[220px]">
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">New class name</label>
          <input value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Saturday WeDo 6–7"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
        </div>
        <button type="submit" disabled={busy || !name.trim()}
          className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm disabled:opacity-50"
          style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
          {busy ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} Create Class
        </button>
        {error && <p className="w-full text-red-600 text-xs">{error}</p>}
      </form>

      {/* List */}
      {classes.length === 0 ? (
        <div className="text-center py-14 text-gray-400">
          <GraduationCap size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No classes yet — create your first one above! 🚀</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {classes.map(c => (
            <button key={c.id} onClick={() => onOpen(c)}
              className="bg-white rounded-2xl border-2 border-gray-100 p-5 text-left card-hover hover:border-blue-200 transition-all">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-black text-gray-900">{c.name}</h3>
                <span className="badge-pill bg-blue-50 text-blue-700 text-xs font-mono font-bold">
                  <Hash size={10} className="inline" /> {c.code}
                </span>
              </div>
              <div className="flex gap-4 text-xs text-gray-400">
                <span className="flex items-center gap-1"><BookOpen size={12} /> {c.lessonIds?.length ?? 0} lessons assigned</span>
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Class detail: roster + lessons ──────────────────────────────
function ClassDetail({ cls, onBack, onUpdated }: {
  cls: ClassDoc;
  onBack: () => void;
  onUpdated: (c: ClassDoc) => void;
}) {
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [loading, setLoading] = useState(true);
  const [newName, setNewName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [lastAdded, setLastAdded] = useState<ClassStudent | null>(null);
  const [tab, setTab] = useState<'students' | 'lessons'>('students');

  const loadStudents = useCallback(async () => {
    setLoading(true);
    try { setStudents(await getClassStudents(cls.id)); }
    catch { setError('Could not load the roster.'); }
    finally { setLoading(false); }
  }, [cls.id]);

  useEffect(() => { void loadStudents(); }, [loadStudents]);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    if (!newName.trim()) return;
    setBusy(true); setError(''); setLastAdded(null);
    try {
      const { student } = await addStudentToClass(cls, newName);
      setNewName('');
      setLastAdded(student);
      setStudents(prev => [...prev, student]);
    } catch {
      setError('Could not create the student account. Check the Firestore rules and try again.');
    } finally {
      setBusy(false);
    }
  }

  async function handleRemove(uid: string) {
    try {
      await removeStudentFromRoster(cls.id, uid);
      setStudents(prev => prev.filter(s => s.uid !== uid));
    } catch { setError('Could not remove the student from the roster.'); }
  }

  return (
    <div className="space-y-5">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-blue-600 font-semibold hover:underline">
        <ChevronLeft size={15} /> All classes
      </button>

      {/* Header card */}
      <div className="bg-white rounded-2xl border border-gray-100 p-6 flex flex-wrap items-center gap-4 print:hidden">
        <div className="flex-1 min-w-[200px]">
          <h2 className="text-xl font-black text-gray-900">{cls.name}</h2>
          <p className="text-xs text-gray-400">{students.length} students · {cls.lessonIds?.length ?? 0} lessons assigned</p>
        </div>
        <div className="text-center px-5 py-3 rounded-2xl border-2 border-dashed border-blue-200 bg-blue-50">
          <div className="text-[10px] uppercase tracking-wide text-blue-500 font-bold">Class code</div>
          <div className="text-2xl font-black font-mono text-blue-800">{cls.code}</div>
        </div>
        <button onClick={() => window.print()}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700">
          <Printer size={15} /> Print roster
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 print:hidden">
        <button onClick={() => setTab('students')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold ${tab === 'students' ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'}`}>
          <Users size={15} /> Students
        </button>
        <button onClick={() => setTab('lessons')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold ${tab === 'lessons' ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'}`}>
          <BookOpen size={15} /> Assigned Lessons
        </button>
      </div>

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm print:hidden">
          <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {tab === 'students' ? (
        <>
          {/* Add student */}
          <form onSubmit={handleAdd} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-wrap items-end gap-3 print:hidden">
            <div className="flex-1 min-w-[200px]">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Add a student (their name)</label>
              <input value={newName} onChange={e => setNewName(e.target.value)} placeholder="e.g. Sami"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
            </div>
            <button type="submit" disabled={busy || !newName.trim()}
              className="flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm disabled:opacity-50"
              style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
              {busy ? <Loader2 size={15} className="animate-spin" /> : <Plus size={15} />} Add Student
            </button>
            <p className="w-full text-xs text-gray-400">
              A username + 4-digit PIN are generated automatically. Students log in with: class code + username + PIN.
            </p>
          </form>

          {lastAdded && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4 print:hidden">
              <CheckCircle className="text-green-500 shrink-0" size={22} />
              <div className="text-sm text-green-900">
                <b>{lastAdded.displayName}</b> added! Login: code <b className="font-mono">{cls.code}</b> ·
                username <b className="font-mono">{lastAdded.username}</b> · PIN <b className="font-mono">{lastAdded.pin}</b>
              </div>
            </div>
          )}

          {/* Roster (printable) */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <div className="hidden print:block mb-4">
              <h2 className="text-xl font-black">{cls.name} — Login Cards</h2>
              <p className="text-sm">Class code: <b className="font-mono">{cls.code}</b> · roboholic.vercel.app → Log In → Student</p>
            </div>
            {loading ? (
              <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-600" size={22} /></div>
            ) : students.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-8">No students yet — add your first student above! 🎒</p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {students.map(s => (
                  <div key={s.uid} className="border-2 border-dashed border-gray-200 rounded-xl p-4 relative">
                    <button onClick={() => void handleRemove(s.uid)} title="Remove from roster"
                      className="absolute top-2 right-2 p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 print:hidden">
                      <Trash2 size={14} />
                    </button>
                    <div className="font-black text-gray-900 mb-2">🎒 {s.displayName}</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600"><Hash size={13} className="text-gray-400" /> Class code: <b className="font-mono">{cls.code}</b></div>
                      <div className="flex items-center gap-2 text-gray-600"><Users size={13} className="text-gray-400" /> Username: <b className="font-mono">{s.username}</b></div>
                      <div className="flex items-center gap-2 text-gray-600"><KeyRound size={13} className="text-gray-400" /> PIN: <b className="font-mono">{s.pin}</b></div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <LessonPicker cls={cls} onUpdated={onUpdated} />
      )}
    </div>
  );
}

// ─── Lesson assignment ───────────────────────────────────────────
function LessonPicker({ cls, onUpdated }: { cls: ClassDoc; onUpdated: (c: ClassDoc) => void }) {
  const [selected, setSelected] = useState<Set<string>>(new Set(cls.lessonIds ?? []));
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);

  function toggle(id: string) {
    setSaved(false);
    setSelected(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }

  async function save() {
    setBusy(true); setSaved(false);
    try {
      const ids = Array.from(selected);
      await setAssignedLessons(cls.id, ids);
      onUpdated({ ...cls, lessonIds: ids });
      setSaved(true);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="space-y-4 print:hidden">
      <div className="flex items-center justify-between bg-white rounded-2xl border border-gray-100 p-4 sticky top-2 z-10">
        <p className="text-sm text-gray-600"><b className="text-gray-900">{selected.size}</b> lessons selected</p>
        <div className="flex items-center gap-3">
          {saved && <span className="text-green-600 text-xs font-semibold">✓ Saved</span>}
          <button onClick={() => void save()} disabled={busy}
            className="px-5 py-2.5 rounded-xl font-bold text-white text-sm disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
            {busy ? 'Saving…' : 'Save Assignments'}
          </button>
        </div>
      </div>

      {ALL_COURSES.map(course => {
        const lessons = course.modules.flatMap(m => m.lessons).filter(l => ALL_LESSONS[l.id]);
        if (lessons.length === 0) return null;
        const picked = lessons.filter(l => selected.has(l.id)).length;
        return (
          <details key={course.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
            <summary className="px-5 py-4 cursor-pointer select-none flex items-center justify-between font-bold text-gray-900 text-sm">
              <span>{course.title}</span>
              <span className="badge-pill bg-gray-100 text-gray-500 text-xs">{picked}/{lessons.length} assigned</span>
            </summary>
            <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {lessons.map(l => (
                <label key={l.id} className={`flex items-center gap-2 px-3 py-2 rounded-lg border text-sm cursor-pointer transition-colors ${selected.has(l.id) ? 'border-green-300 bg-green-50 text-green-900' : 'border-gray-100 text-gray-600 hover:bg-gray-50'}`}>
                  <input type="checkbox" checked={selected.has(l.id)} onChange={() => toggle(l.id)} className="accent-green-600" />
                  <span className="flex-1">{l.title}</span>
                  <Link href={`/lessons/${l.id}`} target="_blank" onClick={e => e.stopPropagation()}
                    className="text-blue-500 text-xs hover:underline shrink-0">view</Link>
                </label>
              ))}
            </div>
          </details>
        );
      })}
    </div>
  );
}
