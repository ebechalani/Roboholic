'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2, Users, CalendarDays, Printer } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { getCoachClasses, getAllClasses } from '@/lib/classes';
import { CAMP_DATES, planDays, todayStr } from '@/lib/camp';
import { ALL_LESSONS } from '@/lib/curricula';
import type { ClassDoc } from '@/types';

const DOW = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

function fmtShort(date: string): string {
  return new Date(date + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// Group the camp dates into calendar weeks: one row of 5 slots (Mon…Fri).
// A slot is { date, dayN } or null (before camp starts / after it ends).
type Slot = { date: string; dayN: number } | null;
function campWeeks(): Slot[][] {
  const weeks: Slot[][] = [];
  let cur: Slot[] = [null, null, null, null, null];
  let used = false;
  for (let i = 0; i < CAMP_DATES.length; i++) {
    const date = CAMP_DATES[i];
    const wd = new Date(date + 'T12:00:00').getDay(); // 1..5
    if (wd === 1 && used) { weeks.push(cur); cur = [null, null, null, null, null]; }
    cur[wd - 1] = { date, dayN: i + 1 };
    used = true;
  }
  if (used) weeks.push(cur);
  return weeks;
}

export default function CoachSchedulePage() {
  return (
    <RequireRole allow={['coach', 'admin']}>
      <Schedule />
    </RequireRole>
  );
}

function Schedule() {
  const { profile, role } = useAuth();
  const isAdmin = role === 'admin';

  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [classId, setClassId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!profile?.uid) return;
    const p = isAdmin ? getAllClasses() : getCoachClasses(profile.uid);
    p.then(cs => { setClasses(cs); if (cs[0]) setClassId(cs[0].id); }).finally(() => setLoading(false));
  }, [profile?.uid, isAdmin]);

  const cls = classes.find(c => c.id === classId);
  const plan = useMemo(() => (cls ? planDays(cls) : []), [cls]);
  const weeks = useMemo(() => campWeeks(), []);
  const today = todayStr();

  return (
    <>
      <div className="no-print"><Navbar /></div>
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <div className="no-print">
          <SectionHeader badge="🗓️ Camp Schedule"
            title="Week at a glance"
            subtitle="Your whole summer mapped day by day — today is highlighted. Day 1 = Wednesday 1 July 2026." />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : classes.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No classes yet.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-6 no-print">
                <select value={classId} onChange={e => setClassId(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800">
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}{isAdmin && c.coachName ? ` — ${c.coachName}` : ''}</option>)}
                </select>
                <span className="text-xs text-gray-400">{plan.length} planned day{plan.length === 1 ? '' : 's'} · edit the plan in <Link href="/dashboard/coach/classes" className="text-blue-600 font-semibold hover:underline">My Classes</Link></span>
                <button onClick={() => window.print()}
                  className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700">
                  <Printer size={14} /> Print / PDF
                </button>
              </div>

              {/* Print-only header */}
              <div className="hidden print:block mb-4">
                <h1 className="text-xl font-black">{cls?.name} — Summer Camp 2026 schedule</h1>
                <p className="text-sm text-gray-600">Coach {cls?.coachName} · 1 July – 28 August · Day 1 = Wed 1 July</p>
              </div>

              <div className="space-y-5">
                {weeks.map((week, wi) => (
                  <div key={wi} className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ breakInside: 'avoid' }}>
                    <div className="px-5 py-2.5 bg-gray-50 border-b border-gray-100 flex items-center gap-2">
                      <CalendarDays size={14} className="text-blue-600" />
                      <span className="text-sm font-bold text-gray-800">Week {wi + 1}</span>
                      <span className="text-xs text-gray-400">
                        {(() => { const ds = week.filter(Boolean) as { date: string }[]; return ds.length ? `${fmtShort(ds[0].date)} – ${fmtShort(ds[ds.length - 1].date)}` : ''; })()}
                      </span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-5 divide-y sm:divide-y-0 sm:divide-x divide-gray-50">
                      {week.map((slot, di) => {
                        if (!slot) return <div key={di} className="p-3 min-h-[90px] bg-gray-50/50 hidden sm:block" />;
                        const isToday = slot.date === today;
                        const lessons = plan[slot.dayN - 1] ?? null;
                        return (
                          <div key={di} className={`p-3 min-h-[90px] ${isToday ? 'bg-blue-50 ring-2 ring-inset ring-blue-400' : ''}`}>
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <span className={`text-[10px] font-black px-1.5 py-0.5 rounded ${isToday ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>Day {slot.dayN}</span>
                              <span className="text-[11px] text-gray-400 font-semibold">{DOW[di]} {fmtShort(slot.date)}</span>
                              {isToday && <span className="text-[10px] font-bold text-blue-600">TODAY</span>}
                            </div>
                            {lessons === null || lessons.length === 0 ? (
                              <p className="text-[11px] text-gray-300">{slot.dayN <= plan.length ? 'No lessons this day' : 'Not planned yet'}</p>
                            ) : (
                              <ul className="space-y-1">
                                {lessons.map(id => {
                                  const l = ALL_LESSONS[id];
                                  return (
                                    <li key={id}>
                                      <Link href={`/lessons/${id}`} className="flex items-start gap-1.5 group">
                                        <span className="w-2 h-2 rounded-full shrink-0 mt-1" style={{ background: l?.programColor ?? '#9CA3AF' }} />
                                        <span className="text-[11px] leading-snug text-gray-700 group-hover:text-blue-700 group-hover:underline">{l?.title ?? id}</span>
                                      </Link>
                                    </li>
                                  );
                                })}
                              </ul>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
