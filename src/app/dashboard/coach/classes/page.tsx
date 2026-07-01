'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Loader2, Plus, Users, Hash, BookOpen, Printer, ChevronLeft,
  Trash2, CheckCircle, AlertCircle, GraduationCap, Pencil, CalendarDays,
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import {
  createClass, getCoachClasses, getClassStudents, addStudentToClass,
  setClassPlan, removeStudentFromRoster, renameStudent, deleteClass,
} from '@/lib/classes';
import { ALL_COURSES, ALL_LESSONS } from '@/lib/curricula';
import { PROGRAMS } from '@/lib/data';
import type { ClassDoc, ClassStudent, AgeGroupId, Course } from '@/types';

// Which age groups each program serves (from the program cards).
const PROG_AGES: Record<string, AgeGroupId[]> = Object.fromEntries(PROGRAMS.map(p => [p.slug, p.ageGroups]));
const AGE_IDS: AgeGroupId[] = ['4-5', '6-7', '8-9', '10-12', '13-15'];
// Per-parent confirmation link + Lebanese WhatsApp number normaliser.
const welcomeUrl = (classId: string, uid: string) => `${typeof window !== 'undefined' ? window.location.origin : ''}/welcome?c=${classId}&s=${uid}`;
const waNum = (phone?: string) => { let d = (phone || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('00')) d = d.slice(2); if (d.startsWith('961')) return d; if (d.startsWith('0')) d = d.slice(1); return '961' + d; };
// Guess a class's age group from its name (e.g. "Camp · Ages 8–9 (Mariebelle)").
function ageFromName(name: string): AgeGroupId | 'all' {
  const n = (name || '').replace(/[–—]/g, '-');
  return AGE_IDS.find(a => n.includes(a)) ?? 'all';
}

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
  const [tab, setTab] = useState<'plan' | 'students'>('plan');

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

  async function handleRemove(uid: string, name: string) {
    if (!window.confirm(`Remove ${name} from this class? Their login will stop working.`)) return;
    try {
      await removeStudentFromRoster(cls.id, uid);
      setStudents(prev => prev.filter(s => s.uid !== uid));
    } catch { setError('Could not remove the student from the roster.'); }
  }

  async function handleRename(uid: string, current: string) {
    const name = window.prompt('New name for this student:', current);
    if (!name || !name.trim() || name.trim() === current) return;
    try {
      await renameStudent(cls.id, uid, name);
      setStudents(prev => prev.map(s => (s.uid === uid ? { ...s, displayName: name.trim() } : s)));
    } catch { setError('Could not rename the student.'); }
  }

  async function handleDeleteClass() {
    if (!window.confirm(`Delete the class "${cls.name}" and all ${students.length} student logins? This cannot be undone.`)) return;
    setBusy(true);
    try {
      await deleteClass(cls.id);
      onBack();
    } catch {
      setError('Could not delete the class.');
      setBusy(false);
    }
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
        <button onClick={() => void handleDeleteClass()} disabled={busy}
          className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold bg-red-50 hover:bg-red-100 text-red-600 border border-red-100 disabled:opacity-50">
          <Trash2 size={15} /> Delete class
        </button>
      </div>

      {/* Tabs */}
      <div className="grid grid-cols-2 gap-2 print:hidden">
        <button onClick={() => setTab('plan')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold ${tab === 'plan' ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'}`}>
          <CalendarDays size={15} /> Lesson Plan
        </button>
        <button onClick={() => setTab('students')}
          className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold ${tab === 'students' ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500'}`}>
          <Users size={15} /> Students
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
              A username is generated automatically. Students log in with: class code + username.
            </p>
          </form>

          {lastAdded && (
            <div className="bg-green-50 border border-green-200 rounded-2xl p-5 flex items-center gap-4 print:hidden">
              <CheckCircle className="text-green-500 shrink-0" size={22} />
              <div className="text-sm text-green-900">
                <b>{lastAdded.displayName}</b> added! Login: code <b className="font-mono">{cls.code}</b> ·
                username <b className="font-mono">{lastAdded.username}</b>
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
                    <div className="absolute top-2 right-2 flex gap-1 print:hidden">
                      <button onClick={() => void handleRename(s.uid, s.displayName)} title="Rename student"
                        className="p-1.5 rounded-lg text-gray-300 hover:text-blue-500 hover:bg-blue-50">
                        <Pencil size={14} />
                      </button>
                      <button onClick={() => void handleRemove(s.uid, s.displayName)} title="Remove from roster"
                        className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50">
                        <Trash2 size={14} />
                      </button>
                    </div>
                    <div className="font-black text-gray-900 mb-2">🎒 {s.displayName}</div>
                    <div className="space-y-1 text-sm">
                      <div className="flex items-center gap-2 text-gray-600"><Hash size={13} className="text-gray-400" /> Class code: <b className="font-mono">{cls.code}</b></div>
                      <div className="flex items-center gap-2 text-gray-600"><Users size={13} className="text-gray-400" /> Username: <b className="font-mono">{s.username}</b></div>
                    </div>
                    <div className="flex flex-wrap items-center gap-2 pt-2 mt-2 border-t border-gray-100 print:hidden">
                      <span className="text-xs text-gray-400">Parent link:</span>
                      <button onClick={() => { void navigator.clipboard?.writeText(welcomeUrl(cls.id, s.uid)); }}
                        className="text-xs font-semibold text-blue-600 hover:underline">Copy</button>
                      {s.parentPhone && (
                        <a target="_blank" rel="noreferrer"
                          href={`https://wa.me/${waNum(s.parentPhone)}?text=${encodeURIComponent(`RoboHolic Summer Camp 2026 — please confirm ${s.displayName}'s registration here: ${welcomeUrl(cls.id, s.uid)}`)}`}
                          className="text-xs font-semibold text-green-600 hover:underline">WhatsApp</a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </>
      ) : (
        <LessonPlan cls={cls} onUpdated={onUpdated} />
      )}
    </div>
  );
}

// ─── Lesson Plan (day builder: per day, pick a theme then a lesson) ──
function LessonPlan({ cls, onUpdated }: { cls: ClassDoc; onUpdated: (c: ClassDoc) => void }) {
  const initial = (): string[][] => {
    if (cls.plan && cls.plan.length) return cls.plan.map(d => [...d]);
    const ids = cls.lessonIds ?? [];
    if (!ids.length) return [[]];
    const out: string[][] = [];
    for (let i = 0; i < ids.length; i += 2) out.push(ids.slice(i, i + 2));
    return out;
  };
  const [plan, setPlan] = useState<string[][]>(initial);
  const [age, setAge] = useState<AgeGroupId | 'all'>(ageFromName(cls.name));
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');
  useEffect(() => { setPlan(initial()); }, [cls.id]); // eslint-disable-line react-hooks/exhaustive-deps

  const themes = ALL_COURSES.filter(c => age === 'all' || (PROG_AGES[c.programSlug] ?? []).includes(age));

  async function persist(next: string[][]) {
    setPlan(next); setBusy(true); setErr('');
    try {
      await setClassPlan(cls.id, next);
      onUpdated({ ...cls, plan: next, lessonIds: next.flat() });
    } catch {
      setErr('Could not save the plan. Make sure the updated Firestore rules are published, then try again.');
    } finally {
      setBusy(false);
    }
  }
  const addToDay = (di: number, id: string) => {
    if (plan.flat().includes(id)) return;
    void persist(plan.map((d, i) => (i === di ? [...d, id] : d)));
  };
  const removeFromDay = (di: number, li: number) =>
    void persist(plan.map((d, i) => (i === di ? d.filter((_, k) => k !== li) : d)));
  const moveToDay = (fromDi: number, li: number, toDi: number) => {
    if (fromDi === toDi) return;
    const id = plan[fromDi][li];
    const next = plan.map((d, i) => (i === fromDi ? d.filter((_, k) => k !== li) : d));
    next[toDi] = [...next[toDi], id];
    void persist(next);
  };
  const addDay = () => void persist([...plan, []]);
  const removeDay = (di: number) => void persist(plan.length <= 1 ? [[]] : plan.filter((_, i) => i !== di));

  const total = plan.reduce((n, d) => n + d.length, 0);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white rounded-2xl border border-gray-100 p-4">
        <p className="text-sm text-gray-600"><b className="text-gray-900">{plan.length}</b> days · <b className="text-gray-900">{total}</b> lessons. For each day, choose a <b>theme</b> then a <b>lesson</b> to add it.{busy && <span className="text-gray-400"> · saving…</span>}</p>
        <label className="text-sm text-gray-600 flex items-center gap-2">Themes for ages
          <select value={age} onChange={e => setAge(e.target.value as AgeGroupId | 'all')} className="rounded-lg border border-gray-200 px-2 py-1.5 text-sm bg-white">
            <option value="all">All</option>
            {AGE_IDS.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
        </label>
      </div>

      {err && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          <AlertCircle size={15} className="mt-0.5 shrink-0" /> {err}
        </div>
      )}

      {plan.map((day, di) => (
        <div key={di} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
          <div className="px-5 py-3 bg-blue-50 border-b border-blue-100 flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center">{di + 1}</span>
            <span className="font-bold text-gray-900 text-sm flex-1">Day {di + 1}</span>
            <button onClick={() => removeDay(di)} title="Remove this day" className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50"><Trash2 size={14} /></button>
          </div>
          <div className="divide-y divide-gray-50">
            {day.length === 0 ? (
              <div className="px-5 py-3 text-xs text-gray-400">No lessons yet — pick a theme and a lesson below.</div>
            ) : day.map((id, li) => {
              const l = ALL_LESSONS[id];
              return (
                <div key={id} className="flex items-center gap-3 px-5 py-3">
                  <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l?.programColor || '#9CA3AF' }} />
                  <div className="flex-1 min-w-0">
                    {l ? (<>
                      <Link href={`/lessons/${l.id}`} target="_blank" className="block text-sm font-semibold text-gray-900 hover:underline truncate">{l.title}</Link>
                      <div className="text-xs text-gray-400 truncate">{l.programTitle}{l.moduleTitle ? ' · ' + l.moduleTitle : ''}</div>
                    </>) : <div className="text-sm text-gray-400">Unknown lesson</div>}
                  </div>
                  <select value={di + 1} onChange={e => moveToDay(di, li, Number(e.target.value) - 1)} title="Move to day"
                    className="text-xs rounded-lg border border-gray-200 px-1.5 py-1 bg-white shrink-0">
                    {plan.map((_, k) => <option key={k} value={k + 1}>Day {k + 1}</option>)}
                  </select>
                  <button onClick={() => removeFromDay(di, li)} title="Remove" className="p-1.5 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 shrink-0"><Trash2 size={14} /></button>
                </div>
              );
            })}
          </div>
          <DayAdder themes={themes} onAdd={id => addToDay(di, id)} />
        </div>
      ))}

      <button onClick={addDay} className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl border-2 border-dashed border-gray-200 text-sm font-bold text-gray-500 hover:border-blue-300 hover:text-blue-600">
        <Plus size={16} /> Add another day
      </button>
    </div>
  );
}

// ─── Day adder: choose a theme (program), then a lesson, then Add ──
function DayAdder({ themes, onAdd }: { themes: Course[]; onAdd: (id: string) => void }) {
  const [theme, setTheme] = useState('');
  const [lesson, setLesson] = useState('');
  const course = themes.find(c => c.id === theme);
  return (
    <div className="flex flex-wrap items-center gap-2 px-5 py-3 bg-gray-50 border-t border-gray-100">
      <span className="text-xs font-bold text-gray-500 shrink-0">Add:</span>
      <select value={theme} onChange={e => { setTheme(e.target.value); setLesson(''); }}
        className="flex-1 min-w-[150px] text-sm rounded-lg border border-gray-200 px-2 py-1.5 bg-white">
        <option value="">1. Choose a theme…</option>
        {themes.map(c => <option key={c.id} value={c.id}>{c.title}</option>)}
      </select>
      <select value={lesson} onChange={e => setLesson(e.target.value)} disabled={!course}
        className="flex-1 min-w-[150px] text-sm rounded-lg border border-gray-200 px-2 py-1.5 bg-white disabled:opacity-50">
        <option value="">{course ? '2. Choose a lesson…' : 'Pick a theme first'}</option>
        {course?.modules.map(m => {
          const ls = m.lessons.filter(l => ALL_LESSONS[l.id]);
          if (!ls.length) return null;
          return <optgroup key={m.id} label={m.title}>{ls.map(l => <option key={l.id} value={l.id}>{l.title}</option>)}</optgroup>;
        })}
      </select>
      <button disabled={!lesson} onClick={() => { onAdd(lesson); setLesson(''); }}
        className="px-4 py-1.5 rounded-lg text-sm font-bold text-white disabled:opacity-40 shrink-0" style={{ background: '#2563EB' }}>Add</button>
    </div>
  );
}
