'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Loader2, Users, ChevronDown, ChevronRight, Check,
  MessageCircle, Mail, Copy, Send, Star, RefreshCw, AlertCircle,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { auth } from '@/lib/firebase/client';
import {
  getCoachClasses, getAllClasses, getClassStudents,
  setStudentCompetencies, markReportSent, setParentContact,
} from '@/lib/classes';
import { ALL_LESSONS } from '@/lib/curricula';
import type { ClassDoc, ClassStudent } from '@/types';

const KEY = (lessonId: string, skill: string) => `${lessonId}::${skill}`;

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

// Group a class's assigned lessons into program → lessons → skills (competencies).
function competencyTree(lessonIds: string[]) {
  const progs: { program: string; color: string; lessons: { id: string; title: string; skills: string[] }[] }[] = [];
  const idx: Record<string, number> = {};
  for (const id of lessonIds) {
    const l = ALL_LESSONS[id];
    if (!l || !l.skills?.length) continue;
    if (idx[l.programTitle] == null) { idx[l.programTitle] = progs.length; progs.push({ program: l.programTitle, color: l.programColor, lessons: [] }); }
    progs[idx[l.programTitle]].lessons.push({ id, title: l.title, skills: l.skills });
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
  const [comp, setComp] = useState<Record<string, string>>({});
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
  const tree = useMemo(() => competencyTree(cls?.lessonIds ?? []), [cls?.lessonIds]);

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

  // When the selected student changes, hydrate their competencies + contact.
  useEffect(() => {
    setComp(student?.competencies ?? {});
    setContact({ parentName: student?.parentName ?? '', parentPhone: student?.parentPhone ?? '', parentEmail: student?.parentEmail ?? '' });
    setReport(null);
    setEmail({ state: 'idle' });
  }, [uid]); // eslint-disable-line react-hooks/exhaustive-deps

  async function toggle(lessonId: string, skill: string) {
    if (!student) return;
    const k = KEY(lessonId, skill);
    const next = { ...comp };
    if (next[k]) delete next[k]; else next[k] = new Date().toISOString();
    setComp(next);
    setSaving(true);
    try {
      await setStudentCompetencies(classId, student.uid, next);
      setStudents(prev => prev.map(s => s.uid === student.uid ? { ...s, competencies: next } : s));
    } finally { setSaving(false); }
  }

  const doneCount = Object.keys(comp).length;
  const newCount = useMemo(() => {
    const since = student?.lastReportAt ?? '';
    return Object.values(comp).filter(d => d > since).length;
  }, [comp, student?.lastReportAt]);

  const composeReport = useCallback((s: ClassStudent, sc: 'new' | 'all', competencies: Record<string, string>) => {
    const since = sc === 'all' ? '' : (s.lastReportAt ?? '');
    const first = s.displayName.split(/\s+/)[0];
    const groups: Record<string, string[]> = {};
    for (const p of tree) for (const l of p.lessons) for (const sk of l.skills) {
      const at = competencies[KEY(l.id, sk)];
      if (at && at > since) (groups[p.program] ??= []).push(`${sk} — ${l.title}`);
    }
    const lines: string[] = [];
    for (const [program, items] of Object.entries(groups)) {
      lines.push(`*${program}*`);
      for (const it of items) lines.push(`• ${it}`);
      lines.push('');
    }
    const total = Object.values(groups).reduce((n, a) => n + a.length, 0);
    const today = new Date().toLocaleDateString();
    const emptyText = sc === 'all'
      ? `Hi! ${first} hasn't logged any mastered skills yet — we'll share progress soon. — Coach ${coachName}, RoboHolic Robotics Academy`
      : `Hi! No new skills to report for ${first} since the last update — we'll share progress again soon. — Coach ${coachName}, RoboHolic Robotics Academy`;
    const intro = sc === 'all'
      ? `Here is everything ${first} has accomplished at camp so far (${total} skill${total === 1 ? '' : 's'}):`
      : `Since our last update, ${first} has mastered ${total} new skill${total === 1 ? '' : 's'}:`;
    const text = total === 0 ? emptyText
      : `🎉 RoboHolic Robotics Academy — progress update for ${s.displayName} (${today})\n\n${intro}\n\n${lines.join('\n').trim()}\n\nWell done, ${first}! 👏\n— Coach ${coachName}`;
    return { text, subject: `${s.displayName} — RoboHolic progress update`, count: total };
  }, [tree, coachName]);

  function buildReport() {
    if (!student) return;
    setEmail({ state: 'idle' });
    setReport({ ...composeReport(student, scope, comp), scope });
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
      const r = composeReport(s, 'new', s.competencies ?? {});
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
          title="Track competencies & message parents"
          subtitle="Coaches tick the skills a student masters. The director reviews, edits and sends the parent message." />

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
                  {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
                <button onClick={() => classId && loadRoster(classId)} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
                {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> saving…</span>}
                {isAdmin && (
                  <button onClick={emailTodayAll} title="Email every parent whose child has new skills since their last report"
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
                        const dn = Object.keys(s.competencies ?? {}).length;
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
                    <div className="bg-white rounded-2xl border border-gray-100 p-10 text-center text-gray-400 text-sm">Select a student to track their competencies.</div>
                  ) : (
                    <>
                      <div className="bg-white rounded-2xl border border-gray-100 p-5">
                        <div className="flex items-center justify-between flex-wrap gap-3 mb-1">
                          <h2 className="font-black text-gray-900 text-lg flex items-center gap-2"><Star size={18} className="text-amber-500" /> {student.displayName}</h2>
                          <div className="flex items-center gap-2 text-xs">
                            <span className="badge-pill bg-green-50 text-green-700">{doneCount} mastered</span>
                            <span className="badge-pill bg-blue-50 text-blue-700">{newCount} new since last report</span>
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
                          <p className="mt-4 text-xs text-gray-400">Tick the skills above as the student masters them. The director reviews and sends the parent report.</p>
                        )}
                      </div>

                      {/* Report panel */}
                      {report && (
                        <div className="bg-white rounded-2xl border-2 border-blue-100 p-5">
                          <h3 className="font-bold text-gray-900 text-sm mb-2">Parent message {report.count > 0 ? `· ${report.count} ${report.scope === 'all' ? `skill${report.count === 1 ? '' : 's'} total` : `new skill${report.count === 1 ? '' : 's'}`}` : (report.scope === 'all' ? '· none yet' : '· nothing new')} <span className="font-normal text-gray-400">— review &amp; edit before sending</span></h3>
                          <textarea value={report.text} onChange={e => setReport(r => r ? { ...r, text: e.target.value } : r)} className="w-full h-44 text-sm rounded-xl border border-gray-200 p-3 bg-white text-gray-800" />
                          <div className="flex flex-wrap gap-2 mt-3">
                            <button onClick={() => { navigator.clipboard?.writeText(report.text); setCopied(true); setTimeout(() => setCopied(false), 1500); }} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200"><Copy size={14} /> {copied ? 'Copied!' : 'Copy'}</button>
                            <a href={waHref} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white" style={{ background: '#25D366' }}><MessageCircle size={14} /> WhatsApp</a>
                            <button onClick={emailSelected} disabled={email.state === 'sending'} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-60" style={{ background: '#EA4335' }}><Mail size={14} /> {email.state === 'sending' ? 'Sending…' : email.state === 'sent' ? 'Emailed ✓' : 'Email'}</button>
                            <button onClick={markSent} className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-sm font-bold text-green-700 bg-green-50 border border-green-100 hover:bg-green-100 ml-auto"><Check size={14} /> Mark as sent</button>
                          </div>
                          {email.state === 'error' && <p className="text-xs text-red-600 mt-2 flex items-center gap-1"><AlertCircle size={12} /> {email.msg}</p>}
                          {email.state === 'sent' && <p className="text-xs text-green-600 mt-2">Emailed to {contact.parentEmail}. Marked as sent.</p>}
                          <p className="text-[11px] text-gray-400 mt-2">WhatsApp opens pre-filled (one tap to send). Email sends directly. “Mark as sent” resets so the next message only includes new skills.</p>
                        </div>
                      )}

                      {/* Competency checklist */}
                      <div className="space-y-3">
                        {tree.length === 0 ? (
                          <div className="bg-white rounded-2xl border border-gray-100 p-6 text-sm text-gray-400">This class has no skill-based lessons assigned yet.</div>
                        ) : tree.map(p => {
                          const isOpen = open.has(p.program);
                          const total = p.lessons.reduce((n, l) => n + l.skills.length, 0);
                          const got = p.lessons.reduce((n, l) => n + l.skills.filter(sk => comp[KEY(l.id, sk)]).length, 0);
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
                                <div className="px-5 pb-4 space-y-4">
                                  {p.lessons.map(l => (
                                    <div key={l.id}>
                                      <div className="text-xs font-semibold text-gray-500 mb-1.5">{l.title}</div>
                                      <div className="flex flex-wrap gap-2">
                                        {l.skills.map(sk => {
                                          const on = !!comp[KEY(l.id, sk)];
                                          return (
                                            <button key={sk} onClick={() => toggle(l.id, sk)}
                                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border transition-all ${on ? 'bg-green-500 border-green-500 text-white' : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                                              {on ? <Check size={12} /> : <span className="w-3 h-3 rounded-full border border-gray-300 inline-block" />} {sk}
                                            </button>
                                          );
                                        })}
                                      </div>
                                    </div>
                                  ))}
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
