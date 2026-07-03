'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  Loader2, Users, RefreshCw, CalendarDays, Check, X, HelpCircle, GraduationCap,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { getAllClasses, getClassStudents, getAllAttendance } from '@/lib/classes';
import type { ClassDoc, ClassStudent, AttendanceDoc, AttendanceStatus } from '@/types';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function weekdayOf(s: string): number { return new Date(s + 'T12:00:00').getDay(); }
function prettyDate(s: string): string {
  return new Date(s + 'T12:00:00').toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
/** A student's attendance weekdays (default = every camp day Mon–Fri). */
function daysOf(s: ClassStudent): number[] { return s.attendDays && s.attendDays.length ? s.attendDays : [1, 2, 3, 4, 5]; }

type ClassRow = ClassDoc & { students: ClassStudent[]; attendance: AttendanceDoc[] };

export default function AdminAttendancePage() {
  return (
    <RequireRole allow={['admin']}>
      <AttendanceOverview />
    </RequireRole>
  );
}

function AttendanceOverview() {
  const [rows, setRows] = useState<ClassRow[]>([]);
  const [date, setDate] = useState(todayStr());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const classes = await getAllClasses();
      const full = await Promise.all(classes.map(async c => {
        const [students, attendance] = await Promise.all([
          getClassStudents(c.id).catch(() => [] as ClassStudent[]),
          getAllAttendance(c.id).catch(() => [] as AttendanceDoc[]),
        ]);
        students.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));
        return { ...c, students, attendance };
      }));
      setRows(full);
    } catch {
      setError('Could not load attendance. Make sure the updated Firestore rules are published.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  const wd = weekdayOf(date);
  const isCampDay = wd >= 1 && wd <= 5;

  // Per-class view for the selected date + all-camp absence counts per student.
  const view = useMemo(() => rows.map(c => {
    const day = c.attendance.find(a => a.date === date);
    const marks: Record<string, AttendanceStatus> = day?.marks ?? {};
    const absences: Record<string, number> = {};
    for (const a of c.attendance) for (const [uid, st] of Object.entries(a.marks ?? {})) {
      if (st === 'absent') absences[uid] = (absences[uid] ?? 0) + 1;
    }
    const scheduled = c.students.filter(s => daysOf(s).includes(wd));
    const extras = c.students.filter(s => !daysOf(s).includes(wd) && marks[s.uid]);
    const present = scheduled.filter(s => marks[s.uid] === 'present').length + extras.filter(s => marks[s.uid] === 'present').length;
    const absent = scheduled.filter(s => marks[s.uid] === 'absent').length + extras.filter(s => marks[s.uid] === 'absent').length;
    const unmarked = scheduled.filter(s => !marks[s.uid]).length;
    return { cls: c, marks, absences, scheduled, extras, present, absent, unmarked, taken: !!day };
  }), [rows, date, wd]);

  const totals = view.reduce((t, v) => ({
    expected: t.expected + v.scheduled.length,
    present: t.present + v.present,
    absent: t.absent + v.absent,
    unmarked: t.unmarked + v.unmarked,
  }), { expected: 0, present: 0, absent: 0, unmarked: 0 });

  function StatusBadge({ st }: { st?: AttendanceStatus }) {
    if (st === 'present') return <span className="badge-pill bg-green-50 text-green-700 text-[10px]"><Check size={10} className="inline" /> Present</span>;
    if (st === 'absent') return <span className="badge-pill bg-red-50 text-red-700 text-[10px]"><X size={10} className="inline" /> Absent</span>;
    return <span className="badge-pill bg-gray-100 text-gray-400 text-[10px]"><HelpCircle size={10} className="inline" /> Not marked</span>;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader badge="🙋 Attendance Overview"
          title="Who is here today"
          subtitle="Read-only view of every class's roll call for the day, plus each child's absences so far. Coaches take the roll call from their Attendance page." />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <label className="inline-flex items-center gap-2 text-sm text-gray-600">
              <CalendarDays size={16} className="text-blue-600" />
              <input type="date" value={date} onChange={e => setDate(e.target.value)}
                className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800" />
            </label>
            <button onClick={() => setDate(todayStr())} className="text-sm text-blue-600 font-semibold hover:underline">Today</button>
            <button onClick={() => void load()} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
            <span className="text-xs text-gray-400 ml-auto">{prettyDate(date)}</span>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4">{error}</div>}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : !isCampDay ? (
            <div className="text-center py-16 text-gray-400">
              <CalendarDays size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">{DOW[wd]} is a weekend — camp runs Monday to Friday.</p>
            </div>
          ) : (
            <>
              {/* Day totals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: 'Expected today', value: totals.expected, color: '#2563EB', icon: <Users size={18} /> },
                  { label: 'Present', value: totals.present, color: '#16A34A', icon: <Check size={18} /> },
                  { label: 'Absent', value: totals.absent, color: '#DC2626', icon: <X size={18} /> },
                  { label: 'Not marked yet', value: totals.unmarked, color: '#9CA3AF', icon: <HelpCircle size={18} /> },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: s.color + '15', color: s.color }}>{s.icon}</div>
                    <div className="text-2xl font-black text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Per class */}
              <div className="space-y-3">
                {view.map(({ cls: c, marks, absences, scheduled, extras, present, absent, unmarked, taken }) => (
                  <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                    <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50">
                      <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><GraduationCap size={18} /></div>
                      <div className="flex-1 min-w-0">
                        <div className="font-bold text-gray-900 text-sm truncate">{c.name}</div>
                        <div className="text-xs text-gray-400">Coach: {c.coachName || '—'} · {scheduled.length} expected {DOW[wd]}</div>
                      </div>
                      <span className="badge-pill bg-green-50 text-green-700 text-xs">{present} present</span>
                      <span className="badge-pill bg-red-50 text-red-700 text-xs">{absent} absent</span>
                      {unmarked > 0 && <span className="badge-pill bg-gray-100 text-gray-500 text-xs">{unmarked} unmarked</span>}
                      {!taken && <span className="badge-pill bg-amber-50 text-amber-700 text-xs">roll call not taken</span>}
                    </div>
                    <div className="px-5 py-3">
                      {scheduled.length === 0 && extras.length === 0 ? (
                        <p className="text-xs text-gray-400">No students attend on {DOW[wd]}.</p>
                      ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-1.5">
                          {scheduled.map(s => (
                            <div key={s.uid} className="flex items-center gap-2">
                              <span className="text-sm text-gray-700 flex-1 truncate">{s.displayName}</span>
                              <StatusBadge st={marks[s.uid]} />
                              <span className={`badge-pill text-[10px] shrink-0 ${absences[s.uid] ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}
                                title="Total absences so far">{absences[s.uid] ?? 0} abs</span>
                            </div>
                          ))}
                          {extras.map(s => (
                            <div key={s.uid} className="flex items-center gap-2">
                              <span className="text-sm text-gray-500 flex-1 truncate">{s.displayName} <span className="text-[10px] text-gray-300">(off-day)</span></span>
                              <StatusBadge st={marks[s.uid]} />
                              <span className={`badge-pill text-[10px] shrink-0 ${absences[s.uid] ? 'bg-red-50 text-red-600' : 'bg-gray-50 text-gray-400'}`}>{absences[s.uid] ?? 0} abs</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-gray-400 mt-5">
                Absence counts add up every “Absent” mark across the whole camp. Set which days each child attends in{' '}
                <Link href="/admin/oversight" className="text-blue-600 font-semibold hover:underline">Coach Oversight</Link>.
              </p>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
