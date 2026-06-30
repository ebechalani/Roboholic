'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Loader2, Users, ChevronDown, ChevronRight, Check,
  MessageCircle, Mail, Copy, Send, Star, RefreshCw, AlertCircle, Award,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { auth } from '@/lib/firebase/client';
import {
  getCoachClasses, getAllClasses, getClassStudents,
  setStudentLessonsDone, markReportSent, setParentContact,
} from '@/lib/classes';
import { ICT_STRANDS, mapSkillsToIct } from '@/lib/competencies';
import { ALL_LESSONS } from '@/lib/curricula';
import type { ClassDoc, ClassStudent } from '@/types';

// Normalize a Lebanese/international phone for a wa.me link: strip non-digits,
// drop a leading 00 or 0, and default the country code to 961 (Lebanon).
function waNumber(phone: string): string {
  let d = (phone || '').replace(/\D/g, '');
  if (!d) return '';
  if (d.startsWith('00')) d = d.slice(2);
  if (d.startsWith('961')) return d;
  if (d.startsWith('0')) d = d.slice(1);
  return '961' + d;
}

// The ICT competencies a single lesson demonstrates (auto-mapped from its skills).
function lessonComps(id: string): string[] {
  const l = ALL_LESSONS[id];
  return l ? mapSkillsToIct(l.skills ?? [], l.title) : ['prog-sequence'];
}

// Derive the ICT competencies a student has earned from the lessons they've
// completed. scope 'all' = everything so far; 'new' = only competencies that
// became true after `since` (their last report). Returns them grouped by strand.
function deriveComps(lessonsDone: Record<string, string>, scope: 'new' | 'all', since: string) {
  const before = new Set<string>();
  const all = new Set<string>();
  for (const [lid, date] of Object.entries(lessonsDone || {})) {
    for (const c of lessonComps(lid)) { all.add(c); if (since && date <= since) before.add(c); }
  }
  const ids = scope === 'all' ? all : new Set(Array.from(all).filter(c => !before.has(c)));
  const groups: Record<string, string[]> = {};
  for (const strand of ICT_STRANDS) for (const item of strand.items) {
    if (ids.has(item.id)) (groups[strand.title] ??= []).push(item.label);
  }
  return { groups, total: ids.size };
}

// Group a class's assigned lessons into program → lessons for the tick list.
function lessonTree(lessonIds: string[]) {
  const progs: { program: string; color: string; lessons: { id: string; title: string }[] }[] = [];
  const idx: Record<string, number> = {};
  for (const id of lessonIds) {
    const l = ALL_LESSONS[id];
    const program = l?.programTitle ?? 'Other';
    const color = l?.programColor ?? '#64748B';
    if (idx[program] == null) { idx[program] = progs.length; progs.push({ program, color, lessons: [] }); }
    progs[idx[program]].lessons.push({ id, title: l?.title ?? id });
  }
  return progs;
}

export default function CoachProgressPage() {
  return (
    <RequireRole allow={['coach', 'admin']}>
      <Progress />
    </RequireRole>
  );
}

function Progress() {
  const { profile, role } = useAuth();
  const isAdmin = role === 'admin';
  const coachName = profile?.full_name || 'Coach';

  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [classId, setClassId] = useState('');
  const [students, setStudents] = useState<ClassStudent[]>([]);
  const [uid, setUid] = useState('');
  const [loading, setLoading] = useState(true);
  const [done, setDone] = useState<Record<string, string>>({});   // lessonId → ISO date completed
  const [open, setOpen] = useState<Set<string>>(new Set());
  const [report, setReport] = useState<{ text: string; subject: string; count: number; scope: 'new' | 'all' } | null>(null);
  const [scope, setScope] = useState<'new' | 'all'>('new');
  const [saving, setSaving] = useState(false);
  const [copied, setCopied] = useState(false);
  const [contact, setContact] = useState({ parentName: '', parentPhone: '', parentEmail: '' });
  const [email, setEmail] = useState<{ state: 'idle' | 'sending' | 'sent' | 'error'; msg?: string }>({ state: 'idle' });
  const [bulk, setBulk] = useState('');

  const cls = classes.find(c => c.id === classId);
  const student = students.find(s => s.uid === uid);
  const tree = useMemo(() => lessonTree(cls?.lessonIds ?? []), [cls?.lessonIds]);

  useEffect(() => {
    if (!profile?.uid) return;
    const p = isAdmin ? getAllClasses() : getCoachClasses(profile.uid);
    p.then(cs => {
      setClasses(cs);
      if (cs[0]) setClassId(cs[0].id);
    }).finally(() => setLoading(false));
  }, [profile?.uid, isAdmin]);

  const loadRoster = useCallback(async (cid: string) => {
    const roster = await getClassStudents(cid);
    setStudents(roster);
    setUid(roster[0]?.uid ?? '');
  }, []);
  useEffect(() => { if (classId) void loadRoster(classId); }, [classId, loadRoster]);

  // When the selected student changes, hydrate their completed lessons + contact.
  useEffect(() => {
    setDone(student?.lessonsDone ?? {});
    setContact({ parentName: student?.parentName ?? '', parentPhone: student?.parentPhone ?? '', parentEmail: student?.parentEmail ?? '' });
    setReport(null);
    setEmail({ state: 'idle' });
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tick / untick a lesson for the selected student → competencies follow automatically.
  async function toggleLesson(id: string) {
    if (!student) return;
    const next = { ...done };
    if (next[id]) delete next[id]; else next[id] = new Date().toISOString();
    setDone(next);
    setSaving(true);
    try {
      await setStudentLessonsDone(classId, student.uid, next);
      setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, lessonsDone: next } : s));
    } finally { setSaving(false); }
  }

  const lessonsDoneCount = Object.keys(done).length;
  const earned = useMemo(() => deriveComps(done, 'all', ''), [done]);
  const newComps = useMemo(() => deriveComps(done, 'new', student?.lastReportAt ?? ''), [done, student?.lastReportAt]);

  const composeReport = useCallback((s: ClassStudent, sc: 'new' | 'all', lessonsDone: Record<string, string>) => {
    const since = sc === 'all' ? '' : (s.lastReportAt ?? '');
    const first = s.displayName.split(/\s+/)[0];
    const { groups, total } = deriveComps(lessonsDone, sc, since);
    const lines: string[] = [];
    for (const [strand, items] of Object.entries(groups)) {
      lines.push(`*${strand}*`);
      for (const it of items) lines.push(`• ${it}`);
      lines.push('');
    }
    const today = new Date().toLocaleDateString();
    const emptyText = sc === 'all'
      ? `Hi! We haven't logged any competencies for ${first} yet — we'll share progress soon. — Coach ${coachName}, RoboHolic Robotics Academy`
      : `Hi! No new competencies to report for ${first} since the last update — we'll share progress again soon. — Coach ${coachName}, RoboHolic Robotics Academy`;
    const intro = sc === 'all'
      ? `Here are all the ICT competencies ${first} has demonstrated so far (${total}):`
      : `Since our last update, ${first} has demonstrated ${total} new ICT competenc${total === 1 ? 'y' : 'ies'}:`;
    const text = total === 0 ? emptyText
      : `🎉 RoboHolic Robotics Academy — progress update for ${s.displayName} (${today})\n\n${intro}\n\n${lines.join('\n').trim()}\n\nWell done, ${first}! 👏\n— Coach ${coachName}`;
    return { text, subject: `${s.displayName} — RoboHolic progress update`, count: total };
  }, [coachName]);

  function buildReport() {
    if (!student) return;
    setEmail({ state: 'idle' });
    setReport({ ...composeReport(student, scope, done), scope });
  }

  // Send one report by email through the serverless Resend route.
  async function sendEmailTo(to: string, subject: string, text: string) {
    const token = await auth?.currentUser?.getIdToken?.();
    const res = await fetch('/api/send-report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', ...(token ? { Authorization: `Bearer ${token}` } : {}) },
      body: JSON.stringify({ to, subject, text }),
    });
    if (!res.ok) { const e = await res.json().catch(() => ({})); throw new Error(e.error || 'Could not send the email.'); }
  }

  async function emailSelected() {
    if (!student || !report) return;
    if (!contact.parentEmail) { setEmail({ state: 'error', msg: 'Add a parent email above first.' }); return; }
    setEmail({ state: 'sending' });
    try {
      await sendEmailTo(contact.parentEmail, report.subject, report.text);
      const now = new Date().toISOString();
      await markReportSent(classId, student.uid, now);
      setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, lastReportAt: now } : s));
      setEmail({ state: 'sent' });
    } catch (e) {
      setEmail({ state: 'error', msg: e instanceof Error ? e.message : 'Send failed.' });
    }
  }

  // End-of-day: email every parent whose child has new competencies.
  async function emailTodayAll() {
    setBulk('Sending…');
    let sent = 0, skipped = 0, failed = 0;
    for (const s of students) {
      const r = composeReport(s, 'new', s.lessonsDone ?? {});
      if (r.count === 0 || !s.parentEmail) { skipped++; continue; }
      try {
        await sendEmailTo(s.parentEmail, r.subject, r.text);
        const now = new Date().toISOString();
        await markReportSent(classId, s.uid, now);
        setStudents(prev => prev.map(x => x.uid === s.uid ? { ...x, lastReportAt: now } : x));
        sent++;
      } catch { failed++; }
    }
    setBulk(`Done — emailed ${sent}, skipped ${skipped}${failed ? `, failed ${failed}` : ''}.`);
  }

  async function saveContact() {
    if (!student) return;
    await setParentContact(classId, student.uid, contact);
    setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, ...contact } : s));
  }

  async function markSent() {
    if (!student) return;
    const now = new Date().toISOString();
    await markReportSent(classId, student.uid, now);
    setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, lastReportAt: now } : s));
    setReport(null);
  }

  const waHref = report ? `https://wa.me/${waNumber(contact.parentPhone)}?text=${encodeURIComponent(report.text)}` : '#';

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader badge="📈 Progress & Parent Reports"
          title="Tick the lessons — competencies follow"
          subtitle="Coaches just tick the lessons a student completes; the ICT competencies are credited automatically. The director reviews and sends the parent message." />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : classes.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No classes yet. Create a class and add students first.</p>
            </div>
          ) : (
            <>
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <select value={classId} onChange={e => setClassId(e.target.value)}
                  className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800">
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}{isAdmin && c.coachName ? ` — ${c.coachName}` : ''}</option>)}
                </select>
                <button onClick={() => classId && loadRoster(classId)} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
                {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> saving…</span>}
                {isAdmin && (
                  <button onClick={emailTodayAll} title="Email every parent whose child has new competencies since their last report"
                    className="sm:ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                    <Mail size={14} /> Email today&apos;s reports
                  </button>
                )}
                {bulk && <span className="text-xs text-gray-600 w-full">{bulk}</span>}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Students list */}
                <div className="bg-white rounded-2xl border border-gray-100 p-4 h-fit">
                  <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2"><Users size={16} className="text-blue-600" /> Students ({students.length})</h3>
                  {students.length === 0 ? <p className="text-xs text-gray-400">No students in this class yet.</p> : (
                    <div className="space-y-1">
                      {students.map(s => {
                        const dn = Object.keys(s.lessonsDone ?? {}).length;
                        return (
                          <button key={s.uid} onClick={() => setUid(s.uid)}
                            className={`w-full text-left px-3 py-2.5 rounded-xl text-sm flex items-center justify-between gap-2 ${uid === s.uid ? 'bg-blue-50 text-blue-800 font-semibold' : 'hover:bg-gray-50 text-gray-700'}`}>
                            <span className="truncate">{s.displayName}</span>
                            <span className="badge-pill bg-green-50 text-green-700 text-[10px] shrink-0"><Check size={9} className="inline" /> {dn}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>

                {/* Selected student */}
                <div className="lg:col-span-2 space-y-5">
                  {!student ? (
                    <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">Select a student to track their progress.</div>
                  ) : (
                    <>
                      <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
                          <h2 className="font-black text-gray-900 text-lg flex items-center gap-2"><Star size={18} className="text-amber-500" /> {student.displayName}</h2>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="badge-pill bg-amber-50 text-amber-700">{lessonsDoneCount} lesson{lessonsDoneCount === 1 ? '' : 's'} done</span>
                            <span className="badge-pill bg-green-50 text-green-700">{earned.total} competenc{earned.total === 1 ? 'y' : 'ies'}</span>
                            <span className="badge-pill bg-blue-50 text-blue-700">{newComps.total} new since last report</span>
                          </div>
                        </div>
                        <p className="text-xs text-gray-400">Last report: {student.lastReportAt ? new Date(student.lastReportAt).toLocaleDateString() : 'never sent'}</p>

                        {/* Parent contact */}
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-4">
                          <input value={contact.parentName} onChange={e => setContact({ ...contact, parentName: e.target.value })} onBlur={saveContact} placeholder="Parent name" className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                          <input value={contact.parentPhone} onChange={e => setContact({ ...contact, parentPhone: e.target.value })} onBlur={saveContact} placeholder="WhatsApp (+961…)" className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                          <input value={contact.parentEmail} onChange={e => setContact({ ...contact, parentEmail: e.target.value })} onBlur={saveContact} placeholder="Parent email" className="px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                        </div>

                        {isAdmin ? (
                          <div className="mt-4 flex flex-wrap items-center gap-3">
                            <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden text-xs font-bold">
                              <button onClick={() => setScope('new')} className={`px-3 py-2 ${scope === 'new' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>New since last</button>
                              <button onClick={() => setScope('all')} className={`px-3 py-2 ${scope === 'all' ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Full summary</button>
                            </div>
                            <button onClick={buildReport} className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                              <Send size={15} /> Generate parent message
                            </button>
                          </div>
                        ) : (
                          <p className="mt-4 text-xs text-gray-400">Tick the lessons below as {student.displayName.split(/\s+/)[0]} completes them. The director reviews and sends the parent report.</p>
                        )}
                      </div>

                      {/* Report panel */}
                      {report && (
                        <div className="bg-white rounded-2xl border-2 border-blue-100 p-5">
                          <h3 className="font-bold text-gray-900 text-sm mb-2">Parent message {report.count > 0 ? `· ${report.count} ${report.scope === 'all' ? `competenc${report.count === 1 ? 'y' : 'ies'} total` : `new competenc${report.count === 1 ? 'y' : 'ies'}`}` : (report.scope === 'all' ? '· none yet' : '· nothing new')} <span className="font-normal text-gray-400">— review &amp; edit before sending</span></h3>
                          <textarea value={report.text} onChange={e => setReport(r => r ? { ...r, text: e.target.value } : r)} className="w-full h-44 text-sm rounded-xl border border-gray-200 p-3 bg-white text-gray-800" />
                          <div className="flex flex-wrap gap-2 mt-3">
                            <button onClick={() => { navigator.clipboard?.writeText(report.text); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200"><Copy size={14} /> {copied ? 'Copied!' : 'Copy'}</button>
                            <a href={waHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white" style={{ background: '#25D366' }}><MessageCircle size={14} /> WhatsApp</a>
                            <button onClick={emailSelected} disabled={email.state === 'sending'} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-60" style={{ background: '#EA4335' }}><Mail size={14} /> {email.state === 'sending' ? 'Sending…' : email.state === 'sent' ? 'Emailed ✓' : 'Email'}</button>
                            <button onClick={markSent} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-green-700 bg-green-50 border border-green-100 hover:bg-green-100 ml-auto"><Check size={14} /> Mark as sent</button>
                          </div>
                          {email.state === 'error' && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><AlertCircle size={12} /> {email.msg}</p>}
                          {email.state === 'sent' && <p className="text-xs text-green-600 mt-2">Emailed to {contact.parentEmail}. Marked as sent.</p>}
                          <p className="text-[11px] text-gray-400 mt-2">WhatsApp opens pre-filled (one tap to send). Email sends directly. “Mark as sent” resets so the next message only includes new competencies.</p>
                        </div>
                      )}

                      {/* ICT competencies earned (auto-derived, read-only) */}
                      {earned.total > 0 && (
                        <div className="bg-white rounded-2xl border border-gray-100 p-5">
                          <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2"><Award size={16} className="text-green-600" /> ICT competencies earned ({earned.total}) <span className="font-normal text-gray-400 text-xs">— filled automatically from completed lessons</span></h3>
                          <div className="space-y-2.5">
                            {ICT_STRANDS.filter(s => earned.groups[s.title]?.length).map(strand => (
                              <div key={strand.id}>
                                <div className="text-xs font-bold mb-1" style={{ color: strand.color }}>{strand.title}</div>
                                <div className="flex flex-wrap gap-1.5">
                                  {earned.groups[strand.title].map(label => (
                                    <span key={label} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-semibold bg-green-50 text-green-700 border border-green-100"><Check size={10} /> {label}</span>
                                  ))}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Lesson tick list (coach ticks lessons; competencies follow) */}
                      <div className="space-y-3">
                        <p className="text-xs text-gray-400 px-1">Tick each lesson as {student.displayName.split(/\s+/)[0]} completes it.</p>
                        {tree.length === 0 ? (
                          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-sm text-gray-400">This class has no lessons assigned yet — build the plan in <span className="font-semibold">My Classes</span> first.</div>
                        ) : tree.map(p => {
                          const isOpen = open.has(p.program);
                          const total = p.lessons.length;
                          const got = p.lessons.filter(l => done[l.id]).length;
                          return (
                            <div key={p.program} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                              <button onClick={() => setOpen(o => { const n = new Set(o); n.has(p.program) ? n.delete(p.program) : n.add(p.program); return n; })}
                                className="w-full flex items-center gap-3 px-5 py-3.5 text-left hover:bg-gray-50">
                                <span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: p.color }} />
                                <span className="font-bold text-gray-900 text-sm flex-1">{p.program}</span>
                                <span className="badge-pill bg-gray-100 text-gray-500 text-xs">{got}/{total}</span>
                                {isOpen ? <ChevronDown size={16} className="text-gray-400" /> : <ChevronRight size={16} className="text-gray-400" />}
                              </button>
                              {isOpen && (
                                <div className="px-3 pb-3 space-y-1">
                                  {p.lessons.map(l => {
                                    const on = !!done[l.id];
                                    return (
                                      <button key={l.id} onClick={() => toggleLesson(l.id)}
                                        className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-sm transition-all ${on ? 'bg-green-50 text-green-800' : 'hover:bg-gray-50 text-gray-700'}`}>
                                        <span className={`w-5 h-5 rounded-md shrink-0 flex items-center justify-center border ${on ? 'bg-green-500 border-green-500 text-white' : 'border-gray-300'}`}>{on && <Check size={13} />}</span>
                                        <span className="flex-1">{l.title}</span>
                                      </button>
                                    );
                                  })}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
