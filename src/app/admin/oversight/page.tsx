'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { collection, getDocs } from 'firebase/firestore';
import { Loader2, RefreshCw, Users, GraduationCap, BookOpen, ChevronDown, ChevronRight, KeyRound } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/lib/auth/AuthProvider';
import { ALL_LESSONS } from '@/lib/curricula';
import type { ClassDoc } from '@/types';

export default function AdminOversightPage() {
  return (
    <RequireRole allow={['admin']}>
      <Oversight />
    </RequireRole>
  );
}

type ClassRow = ClassDoc & { studentCount: number };

// Group a class's assigned lesson ids by their program, with titles.
function byProgram(ids: string[]) {
  const groups: Record<string, { program: string; color: string; titles: string[] }> = {};
  for (const id of ids) {
    const l = ALL_LESSONS[id];
    const key = l?.programTitle ?? 'Unknown / removed';
    (groups[key] ??= { program: key, color: l?.programColor ?? '#9CA3AF', titles: [] }).titles.push(l?.title ?? id);
  }
  return Object.values(groups).sort((a, b) => b.titles.length - a.titles.length);
}

function Oversight() {
  const { configured } = useAuth();
  const [rows, setRows] = useState<ClassRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [open, setOpen] = useState<string | null>(null);

  const load = useCallback(async () => {
    if (!configured) { setLoading(false); return; }
    setLoading(true); setError('');
    try {
      const snap = await getDocs(collection(db, 'classes'));
      const classes = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<ClassDoc, 'id'>) }));
      const withCounts = await Promise.all(classes.map(async c => {
        let studentCount = 0;
        try { studentCount = (await getDocs(collection(db, 'classes', c.id, 'students'))).size; } catch { /* ignore */ }
        return { ...c, studentCount };
      }));
      withCounts.sort((a, b) => (a.coachName || '').localeCompare(b.coachName || '') || (a.name || '').localeCompare(b.name || ''));
      setRows(withCounts);
    } catch {
      setError('Could not load classes. Make sure the Firestore rules are published and you are signed in as an admin.');
    } finally {
      setLoading(false);
    }
  }, [configured]);

  useEffect(() => { void load(); }, [load]);

  const totalStudents = rows.reduce((n, r) => n + r.studentCount, 0);
  const totalLessons = rows.reduce((n, r) => n + (r.lessonIds?.length ?? 0), 0);

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="🔎 Coach Oversight"
          title="What each coach is giving"
          subtitle="Every class, its assigned lessons, class code and student count — read-only."
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-3 gap-4 mb-6">
            {[
              { label: 'Classes', value: rows.length, icon: <BookOpen size={18} />, color: '#2563EB' },
              { label: 'Students', value: totalStudents, icon: <Users size={18} />, color: '#7C3AED' },
              { label: 'Assigned lessons', value: totalLessons, icon: <GraduationCap size={18} />, color: '#10B981' },
            ].map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: s.color + '15', color: s.color }}>{s.icon}</div>
                <div className="text-2xl font-black text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500"><b className="text-gray-900">{rows.length}</b> class{rows.length === 1 ? '' : 'es'}</p>
            <button onClick={() => void load()} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline">
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4">{error}</div>}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : rows.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <BookOpen size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No classes yet. They appear here once coaches (or the setup script) create them.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {rows.map(c => {
                const isOpen = open === c.id;
                const groups = byProgram(c.lessonIds ?? []);
                return (
                  <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <button onClick={() => setOpen(isOpen ? null : c.id)} className="w-full flex items-center gap-3 p-5 text-left hover:bg-gray-50">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><GraduationCap size={20} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm">{c.name}</div>
                        <div className="text-xs text-gray-400">Coach: {c.coachName || '—'}</div>
                      </div>
                      <span className="badge-pill bg-gray-100 text-gray-600 text-xs inline-flex items-center gap-1"><KeyRound size={11} /> {c.code}</span>
                      <span className="badge-pill bg-purple-50 text-purple-700 text-xs inline-flex items-center gap-1"><Users size={11} /> {c.studentCount}</span>
                      <span className="badge-pill bg-green-50 text-green-700 text-xs inline-flex items-center gap-1"><BookOpen size={11} /> {c.lessonIds?.length ?? 0}</span>
                      {isOpen ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronRight size={18} className="text-gray-400" />}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 space-y-3">
                        {groups.length === 0 ? (
                          <p className="text-sm text-gray-400">No lessons assigned to this class yet.</p>
                        ) : groups.map(g => (
                          <details key={g.program} className="rounded-xl border border-gray-100">
                            <summary className="cursor-pointer list-none flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-800">
                              <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: g.color }} />
                              {g.program}
                              <span className="ml-auto badge-pill bg-gray-100 text-gray-500 text-xs">{g.titles.length}</span>
                            </summary>
                            <ul className="px-4 pb-3 pt-1 space-y-1">
                              {g.titles.map((t, i) => (
                                <li key={i} className="text-xs text-gray-600 flex gap-2"><span className="text-gray-300">{i + 1}.</span>{t}</li>
                              ))}
                            </ul>
                          </details>
                        ))}
                        <Link href={`/dashboard/coach/classes`} className="inline-block text-xs text-blue-600 font-semibold hover:underline">Open class manager →</Link>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
