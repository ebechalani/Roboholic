'use client';

import { useEffect, useState, useCallback } from 'react';
import {
  Loader2, Users, RefreshCw, Check, X, CalendarDays, CheckCircle2,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import {
  getCoachClasses, getAllClasses, getClassStudents,
  getAttendance, setAttendance,
} from '@/lib/classes';
import type { ClassDoc, ClassStudent, AttendanceStatus } from '@/types';

const DOW = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

function todayStr(): string {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function weekdayOf(s: string): number { return new Date(s + 'T00:00:00').getDay(); }       // 0=Sun … 6=Sat
function prettyDate(s: string): string {
  return new Date(s + 'T00:00:00').toLocaleDateString(undefined, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
}
/** A student's attendance weekdays (default = every camp day Mon–Fri). */
function daysOf(s: ClassStudent): number[] { return s.attendDays && s.attendDays.length ? s.attendDays : [1, 2, 3, 4, 5]; }

export default function CoachAttendancePage() {
  return (
    <RequireRole allow={['coach', 'admin']}>
      <Attendance />
    </RequireRole>
  );
}

function Attendance() {
  const { profile, role } = useAuth();
  const isAdmin = role === 'admin';

  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [classId, setClassId] = useState('');
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [date, setDate] = useState(todayStr());
  const [marks, setMarks] = useState<Record<string, AttendanceStatus>>({});
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saving, setSaving] = useState(false);

  const wd = weekdayOf(date);
  const isCampDay = wd >= 1 && wd <= 5;

  useEffect(() => {
    if (!profile?.uid) return;
    const p = isAdmin ? getAllClasses() : getCoachClasses(profile.uid);
    p.then(cs => { setClasses(cs); if (cs[0]) setClassId(cs[0].id); }).finally(() => setLoading(false));
  }, [profile?.uid, isAdmin]);

  const [loadErr, setLoadErr] = useState('');
  const load = useCallback(async (cid: string, d: string) => {
    if (!cid) return;
    setBusy(true); setLoadErr('');
    try {
      // Roster first — an attendance-read failure must never hide the students.
      setStudents(await getClassStudents(cid));
      try {
        const att = await getAttendance(cid, d);
        setMarks(att?.marks ?? {});
      } catch {
        setMarks({});
        setLoadErr('Loaded the students, but could not read the saved roll call (connection or rules issue) — marks may appear empty.');
      }
    } catch {
      setLoadErr('Could not load the students — check the internet connection and press Refresh.');
    } finally { setBusy(false); }
  }, []);
  useEffect(() => { if (classId) void load(classId, date); }, [classId, date, load]);

  // Students expected today (their attend-days include this weekday), name-sorted.
  const scheduled = students
    .filter(s => daysOf(s).includes(wd))
    .sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));

  const presentCount = scheduled.filter(s => marks[s.uid] === 'present').length;
  const absentCount = scheduled.filter(s => marks[s.uid] === 'absent').length;
  const unmarked = scheduled.length - presentCount - absentCount;

  async function persist(next: Record<string, AttendanceStatus>) {
    setMarks(next);
    setSaving(true);
    try { await setAttendance(classId, date, next, profile?.uid); }
    finally { setSaving(false); }
  }
  function setStatus(uid: string, status: AttendanceStatus) {
    const next = { ...marks };
    if (next[uid] === status) delete next[uid]; else next[uid] = status;   // tap again to clear
    void persist(next);
  }
  function allPresent() {
    const next = { ...marks };
    for (const s of scheduled) next[s.uid] = 'present';
    void persist(next);
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader badge="🙋 Attendance"
          title="Take the roll call"
          subtitle="At the start of each day, tick who is present. Each child only appears on the days they attend (set by the director)." />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : classes.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No classes yet.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-5">
                <select value={classId} onChange={e => setClassId(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800">
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}{isAdmin && c.coachName ? ` — ${c.coachName}` : ''}</option>)}
                </select>
                <label className="inline-flex items-center gap-2 text-sm text-gray-600">
                  <CalendarDays size={16} className="text-blue-600" />
                  <input type="date" value={date} onChange={e => setDate(e.target.value)}
                    className="px-3 py-2 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800" />
                </label>
                <button onClick={() => setDate(todayStr())} className="text-sm text-blue-600 font-semibold hover:underline">Today</button>
                <button onClick={() => load(classId, date)} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
                {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> saving…</span>}
              </div>

              {loadErr && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4">{loadErr}</div>}

              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
                  <div>
                    <div className="font-black text-gray-900 text-lg">{prettyDate(date)}</div>
                    <div className="text-xs text-gray-400">{DOW[wd]} · {isCampDay ? `${scheduled.length} student${scheduled.length === 1 ? '' : 's'} expected` : 'weekend — no camp'}</div>
                  </div>
                  {isCampDay && scheduled.length > 0 && (
                    <div className="flex items-center gap-2 text-xs">
                      <span className="badge-pill bg-green-50 text-green-700">{presentCount} present</span>
                      <span className="badge-pill bg-red-50 text-red-700">{absentCount} absent</span>
                      {unmarked > 0 && <span className="badge-pill bg-gray-100 text-gray-500">{unmarked} to mark</span>}
                      <button onClick={allPresent} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-white" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}><CheckCircle2 size={13} /> All present</button>
                    </div>
                  )}
                </div>

                {busy ? (
                  <div className="flex justify-center py-10"><Loader2 className="animate-spin text-blue-600" size={22} /></div>
                ) : !isCampDay ? (
                  <p className="text-sm text-gray-400 py-6 text-center">Camp runs Monday to Friday. Pick a weekday to take attendance.</p>
                ) : scheduled.length === 0 ? (
                  <p className="text-sm text-gray-400 py-6 text-center">No students attend on {DOW[wd]}. Set each child&apos;s days in <span className="font-semibold">Admin → Coach Oversight</span>.</p>
                ) : (
                  <div className="space-y-1.5">
                    {scheduled.map(s => {
                      const st = marks[s.uid];
                      return (
                        <div key={s.uid} className={`flex items-center gap-3 px-3 py-2.5 rounded-xl border ${st === 'present' ? 'bg-green-50 border-green-100' : st === 'absent' ? 'bg-red-50 border-red-100' : 'border-gray-100'}`}>
                          <span className="flex-1 text-sm font-semibold text-gray-800">{s.displayName}</span>
                          <button onClick={() => setStatus(s.uid, 'present')}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${st === 'present' ? 'bg-green-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-green-100 hover:text-green-700'}`}>
                            <Check size={14} /> Present
                          </button>
                          <button onClick={() => setStatus(s.uid, 'absent')}
                            className={`inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-bold transition-all ${st === 'absent' ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-500 hover:bg-red-100 hover:text-red-700'}`}>
                            <X size={14} /> Absent
                          </button>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
