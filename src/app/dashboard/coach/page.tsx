'use client';

import Link from 'next/link';
import { useState, useEffect, useCallback } from 'react';
import { Users, BookOpen, ChevronRight, GraduationCap, Loader2, CalendarDays } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { PROGRAMS } from '@/lib/data';
import { getCoachClasses, getClassStudents } from '@/lib/classes';
import { ALL_LESSONS } from '@/lib/curricula';
import type { ClassDoc } from '@/types';

type Row = ClassDoc & { studentCount: number };

// ─── Stat card ────────────────────────────────────────────────────
function StatCard({ label, value, sub, icon, color }: { label: string; value: string | number; sub?: string; icon: React.ReactNode; color: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ background: color + '15', color }}>{icon}</div>
      <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-semibold text-gray-600">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── My Classes (real data: the coach's own classes + lesson plan) ──
function MyClasses({ rows }: { rows: Row[] }) {
  if (rows.length === 0) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 text-center">
        <Users size={28} className="mx-auto mb-2 text-gray-300" />
        <p className="text-sm text-gray-500 mb-3">You don&apos;t have a class assigned yet.</p>
        <Link href="/dashboard/coach/classes" className="text-sm text-blue-600 font-semibold hover:underline">Go to My Classes →</Link>
      </div>
    );
  }
  return (
    <div className="space-y-5">
      {rows.map(c => {
        const lessons = (c.lessonIds ?? []).map(id => ALL_LESSONS[id]).filter(Boolean);
        const nextUp = lessons.slice(0, 3);
        return (
          <div key={c.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-50">
              <div className="flex items-center gap-2 min-w-0">
                <GraduationCap size={18} className="text-blue-600 shrink-0" />
                <h2 className="font-bold text-gray-900 truncate">{c.name}</h2>
              </div>
              <Link href="/dashboard/coach/classes" className="text-sm text-blue-600 font-semibold hover:underline shrink-0">Open →</Link>
            </div>
            <div className="px-6 py-3 flex flex-wrap gap-2 text-xs border-b border-gray-50">
              <span className="badge-pill bg-gray-100 text-gray-600">Code {c.code}</span>
              <span className="badge-pill bg-purple-50 text-purple-700">{c.studentCount} students</span>
              <span className="badge-pill bg-green-50 text-green-700">{lessons.length} lessons · {Math.ceil(lessons.length / 2)} days</span>
            </div>
            {lessons.length === 0 ? (
              <div className="px-6 py-5 text-sm text-gray-400">No lessons assigned yet — open the class to set the plan.</div>
            ) : (
              <div className="px-6 py-4">
                <div className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-1.5"><CalendarDays size={13} /> Day 1 — start here</div>
                <div className="space-y-2">
                  {nextUp.map(l => (
                    <Link key={l.id} href={`/lessons/${l.id}`} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:bg-gray-50">
                      <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: l.programColor }} />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-semibold text-gray-900 truncate">{l.title}</div>
                        <div className="text-xs text-gray-400 truncate">{l.programTitle}</div>
                      </div>
                      <ChevronRight size={16} className="text-gray-300 shrink-0" />
                    </Link>
                  ))}
                </div>
                <Link href="/dashboard/coach/classes" className="inline-block mt-3 text-xs text-blue-600 font-semibold hover:underline">See the full day-by-day plan →</Link>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

// ─── Quick access to the curriculum ───────────────────────────────
function QuickPrograms() {
  const featured = PROGRAMS.slice(0, 8);
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900">Browse the curriculum</h2>
        <Link href="/curriculum" className="text-sm text-blue-600 font-semibold hover:underline">View all</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {featured.map(program => (
          <Link key={program.id} href={`/curriculum/${program.slug}`}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center card-hover group"
            style={{ borderColor: program.color + '30', backgroundColor: program.bgColor }}>
            <span className="text-2xl">{program.icon}</span>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 leading-tight">{program.shortTitle || program.title}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default function CoachDashboardPage() {
  return (
    <RequireRole allow={['coach', 'admin']}>
      <CoachDashboard />
    </RequireRole>
  );
}

function CoachDashboard() {
  const { profile, configured } = useAuth();
  const coachName = (profile?.full_name || 'Coach').replace('Coach ', '');
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    if (!configured || !profile?.uid) { setLoading(false); return; }
    try {
      const cs = await getCoachClasses(profile.uid);
      const withCounts = await Promise.all(cs.map(async c => {
        let studentCount = 0;
        try { studentCount = (await getClassStudents(c.id)).length; } catch { /* ignore */ }
        return { ...c, studentCount };
      }));
      setRows(withCounts);
    } catch { /* ignore */ } finally { setLoading(false); }
  }, [configured, profile?.uid]);
  useEffect(() => { void load(); }, [load]);

  const totalStudents = rows.reduce((n, r) => n + r.studentCount, 0);
  const totalLessons = rows.reduce((n, r) => n + (r.lessonIds?.length ?? 0), 0);

  const actions = [
    { icon: '🙋', title: 'Attendance', text: 'Take the daily roll call', href: '/dashboard/coach/attendance', color: '#F59E0B', bg: '#FFFBEB' },
    { icon: '📈', title: 'Competencies & Reports', text: 'Tick lessons; competencies auto-fill', href: '/dashboard/coach/progress', color: '#10B981', bg: '#ECFDF5' },
    { icon: '🏫', title: 'My Classes', text: 'Students, logins and the day-by-day plan', href: '/dashboard/coach/classes', color: '#2563EB', bg: '#EFF6FF' },
    { icon: '📚', title: 'Curriculum', text: 'Browse every program and lesson', href: '/curriculum', color: '#7C3AED', bg: '#F5F3FF' },
  ];

  return (
    <div className="flex min-h-screen">
      <Sidebar role="coach" userName={coachName} userEmoji="🎓" />
      <main className="flex-1 ml-64 min-h-screen" style={{ background: '#F0F4FF' }}>
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-8 py-4">
          <h1 className="font-black text-gray-900 text-lg">Welcome, {coachName}! 👋</h1>
          <p className="text-xs text-gray-400">{new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
        </header>

        <div className="p-8 space-y-8 max-w-5xl">
          <div className="grid grid-cols-3 gap-4">
            <StatCard label="My Classes" value={rows.length} sub="assigned to you" icon={<GraduationCap size={20} />} color="#2563EB" />
            <StatCard label="My Students" value={totalStudents} sub="across your classes" icon={<Users size={20} />} color="#7C3AED" />
            <StatCard label="My Lessons" value={totalLessons} sub="in your plan" icon={<BookOpen size={20} />} color="#10B981" />
          </div>

          <div>
            <h2 className="font-black text-gray-900 text-lg mb-4">Your class &amp; lesson plan</h2>
            {loading ? (
              <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
            ) : (
              <MyClasses rows={rows} />
            )}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {actions.map(card => (
              <Link key={card.title} href={card.href}
                className="flex items-start gap-4 p-5 rounded-2xl border-2 card-hover group"
                style={{ backgroundColor: card.bg, borderColor: card.color + '30' }}>
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <div className="font-bold text-gray-900 text-sm mb-1 group-hover:underline">{card.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{card.text}</div>
                </div>
              </Link>
            ))}
          </div>

          <QuickPrograms />
        </div>
      </main>
    </div>
  );
}
