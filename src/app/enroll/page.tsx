'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import { Loader2, CheckCircle, ArrowRight, MessageCircle, Trophy, CalendarPlus, MapPin, Crown } from 'lucide-react';
import {
  ACTIVITIES, BRANCHES, TRACKS, activityById, branchById, trackByAge, slotLabel,
  type ActivityId, type Slot,
} from '@/lib/enrollment';

// ════════════════════════════════════════════════════════════════
//  PUBLIC page — parents register their child for 2026–2027.
//  Three tabs: Robotics & Coding · Drawing · Muay Thai.
//  Each: branch → age → day/time (+ request another day) → details.
//  Robotics also offers the MakeX squad and the chess club.
//  No login needed; shows NO curriculum lesson content.
// ════════════════════════════════════════════════════════════════

const EMPTY = {
  branch: '', ageGroup: '', slotId: '', otherDay: '',
  makex: false, makexSlotId: '',
  chess: false, chessSlotId: '',
  childName: '', dob: '', parentName: '', parentPhone: '', parentEmail: '', notes: '', website: '',
};

export default function EnrollPage() {
  const [activityId, setActivityId] = useState<ActivityId>('robotics');
  const [f, setF] = useState({ ...EMPTY });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [sentInfo, setSentInfo] = useState({ child: '', parent: '', what: '', when: '', requested: '' });
  const [error, setError] = useState('');
  const [openTrack, setOpenTrack] = useState<string>('');

  const activity = activityById(activityId)!;
  const isRobotics = activityId === 'robotics';
  const branch = branchById(f.branch);
  const track = trackByAge(f.ageGroup);
  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setF({ ...f, [k]: e.target.value });

  // Times for the activity + branch currently selected.
  const slots = useMemo(() => (branch ? activity.slots(branch) : []), [branch, activity]);
  const chosenSlot = useMemo(() => slots.find(s => s.id === f.slotId), [slots, f.slotId]);
  const makexSlots = branch?.makexSlots ?? [];
  const chessSlots = branch?.chessSlots ?? [];

  function switchTab(id: ActivityId) {
    setActivityId(id);
    // Times differ per activity — clear anything time-related.
    setF(prev => ({ ...prev, slotId: '', otherDay: '', makex: false, makexSlotId: '', chess: false, chessSlotId: '' }));
    setError('');
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!f.branch) return setError('Please choose a branch.');
    if (!f.ageGroup) return setError('Please choose your child\'s age group.');
    if (!f.slotId && !f.otherDay.trim()) return setError('Please pick a time — or tell us the day that suits you.');
    if (isRobotics) {
      if (f.makex && makexSlots.length > 0 && !f.makexSlotId) return setError('Please pick a MakeX training time.');
      if (f.chess && chessSlots.length > 0 && !f.chessSlotId) return setError('Please pick a chess club time.');
      const mx = makexSlots.find(s => s.id === f.makexSlotId);
      const ch = chessSlots.find(s => s.id === f.chessSlotId);
      if (mx && ch && mx.day === ch.day && mx.time === ch.time) {
        return setError('MakeX and chess are both ' + slotLabel(mx) + ' — please pick a different time for one of them.');
      }
    }
    setBusy(true); setError('');
    try {
      const payload = {
        ...f,
        activity: activityId,
        activityName: activity.name,
        // Add-ons only apply to robotics.
        makex: isRobotics && f.makex, chess: isRobotics && f.chess,
        makexSlotId: isRobotics ? f.makexSlotId : '', chessSlotId: isRobotics ? f.chessSlotId : '',
        slotLabel: chosenSlot ? slotLabel(chosenSlot) : '',
        makexSlotLabel: isRobotics && makexSlots.find(s => s.id === f.makexSlotId) ? slotLabel(makexSlots.find(s => s.id === f.makexSlotId) as Slot) : '',
        chessSlotLabel: isRobotics && chessSlots.find(s => s.id === f.chessSlotId) ? slotLabel(chessSlots.find(s => s.id === f.chessSlotId) as Slot) : '',
        branchName: branch?.name ?? '',
        trackName: track ? `${track.name} (${track.age})` : '',
      };
      const res = await fetch('/api/enroll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Something went wrong — please try again.');
      setSentInfo({
        child: f.childName, parent: f.parentName,
        what: `${activity.name}${isRobotics && track ? ` · ${track.name}` : ''}${branch ? ` at ${branch.name}` : ''}`
          + (isRobotics && f.makex ? ' + MakeX squad' : '') + (isRobotics && f.chess ? ' + chess club' : ''),
        when: chosenSlot ? slotLabel(chosenSlot) : '',
        requested: f.otherDay.trim(),
      });
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — please try again.');
    } finally { setBusy(false); }
  }

  const Num = ({ n, children }: { n: number; children: React.ReactNode }) => (
    <h3 className="flex items-center gap-2.5 font-black text-gray-900 mb-3">
      <span className="w-7 h-7 rounded-lg text-white text-xs flex items-center justify-center shrink-0" style={{ background: activity.color }}>{n}</span>
      {children}
    </h3>
  );

  if (sent) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F8FAFF' }}>
        <div className="w-full max-w-md bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
          <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-5"><CheckCircle size={30} /></div>
          <h2 className="text-2xl font-black text-gray-900 mb-2">Registration received! 🎉</h2>
          <p className="text-gray-500 text-sm leading-relaxed mb-4">
            Thank you, {sentInfo.parent.split(/\s+/)[0] || 'friend'}! We&apos;ve registered <b>{sentInfo.child}</b> for{' '}
            <b>{sentInfo.what}</b>{sentInfo.when && <> on <b>{sentInfo.when}</b></>}
            {!sentInfo.when && sentInfo.requested && <> — you asked for <b>{sentInfo.requested}</b></>}.
          </p>
          <p className="text-gray-400 text-xs leading-relaxed mb-6">
            {sentInfo.requested
              ? 'We\'ll check your requested day and confirm on WhatsApp — if it works for a group, you\'ll get a confirmation message.'
              : 'We\'ll confirm your place and the fees on WhatsApp shortly.'}
          </p>
          <div className="flex flex-col gap-2">
            <a href="https://wa.me/96170227005" target="_blank" rel="noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm" style={{ background: '#25D366' }}>
              <MessageCircle size={16} /> Questions? WhatsApp us
            </a>
            <button onClick={() => { setSent(false); setF({ ...EMPTY }); }}
              className="text-xs text-blue-600 font-semibold hover:underline mt-1">
              Register another child or another class
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: '#F8FAFF' }}>
      {/* Hero */}
      <div className="hero-bg section-pattern px-6 pt-12 pb-8">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white shadow-lg"
              style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>R</div>
            <div>
              <div className="font-black text-white text-lg leading-none">RoboHolic</div>
              <div className="text-white/40 text-xs">Academy</div>
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-3">Register for 2026–2027 ✨</h1>
          <p className="text-white/60 max-w-xl leading-relaxed">Choose the class, the branch and the time that suit you. We&apos;ll confirm everything with you on WhatsApp.</p>
        </div>
      </div>

      {/* Activity tabs */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 -mt-5">
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-2 grid grid-cols-3 gap-2">
          {ACTIVITIES.map(a => {
            const on = a.id === activityId;
            return (
              <button key={a.id} type="button" onClick={() => switchTab(a.id)}
                className={`py-3 px-2 rounded-xl text-sm font-black transition-all border-2 ${on ? 'text-white' : 'text-gray-600 border-transparent hover:bg-gray-50'}`}
                style={on ? { background: a.color, borderColor: a.color } : {}}>
                <span className="text-lg block leading-none mb-1">{a.emoji}</span>
                {a.short}
              </button>
            );
          })}
        </div>
        <p className="text-sm text-gray-500 leading-relaxed mt-3 px-1">{activity.blurb}</p>
      </div>

      <form onSubmit={submit} className="max-w-3xl mx-auto px-4 sm:px-6 py-6 space-y-5">

        {/* 1 — Branch */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Num n={1}>Which branch?</Num>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {BRANCHES.map(b => {
              const runs = activity.slots(b).length > 0;
              return (
                <button key={b.id} type="button"
                  onClick={() => setF({ ...f, branch: b.id, slotId: '', makexSlotId: '', chessSlotId: '' })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${f.branch === b.id ? 'bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                  style={f.branch === b.id ? { borderColor: activity.color, background: activity.color + '10' } : {}}>
                  <div className="font-black text-gray-900 flex items-center gap-1.5"><MapPin size={15} style={{ color: activity.color }} /> {b.name}</div>
                  <div className="text-xs text-gray-500 mt-1">
                    {runs
                      ? Array.from(new Set(activity.slots(b).map(s => s.day))).join(' · ')
                      : <span className="text-amber-600">runs at our other branch — we&apos;ll arrange it</span>}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* 2 — Age (full course cards for robotics, simple chips otherwise) */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Num n={2}>{isRobotics ? <>Which class? <span className="font-normal text-gray-400 text-sm">— by age &amp; level</span></> : <>How old is your child?</>}</Num>
          {isRobotics ? (
            <div className="space-y-2.5">
              {TRACKS.map(t => {
                const active = f.ageGroup === t.age;
                const open = openTrack === t.age || active;
                return (
                  <div key={t.age} className={`rounded-xl border-2 overflow-hidden transition-all ${active ? 'border-blue-500' : 'border-gray-200'}`}>
                    <button type="button"
                      onClick={() => { setF({ ...f, ageGroup: t.age, makex: t.makexEligible ? f.makex : false }); setOpenTrack(t.age); }}
                      className={`w-full text-left p-4 ${active ? 'bg-blue-50' : 'hover:bg-gray-50'}`}>
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-2xl">{t.emoji}</span>
                        <span className="font-black text-gray-900">{t.name}</span>
                        <span className="badge-pill bg-white border border-gray-200 text-gray-600 text-[11px]">Ages {t.age}</span>
                        <span className="badge-pill bg-gray-100 text-gray-500 text-[11px]">{t.level}</span>
                        {active && <CheckCircle size={16} className="text-blue-600 ml-auto" />}
                      </div>
                      <p className="text-sm text-gray-600 mt-1.5 leading-relaxed">{t.tagline}</p>
                    </button>
                    {open && (
                      <div className="px-4 pb-4 pt-1 bg-white">
                        <div className="text-xs font-bold text-gray-500 mb-2">The year includes:</div>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 mb-3">
                          {t.includes.map(i => (
                            <li key={i} className="text-xs text-gray-600 flex items-start gap-1.5">
                              <CheckCircle size={12} className="text-green-500 mt-0.5 shrink-0" />{i}
                            </li>
                          ))}
                        </ul>
                        <p className="text-xs text-gray-500 italic bg-gray-50 rounded-lg px-3 py-2">🎯 {t.outcome}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="flex flex-wrap gap-2">
              {TRACKS.map(t => (
                <button key={t.age} type="button" onClick={() => setF({ ...f, ageGroup: t.age })}
                  className={`px-4 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${f.ageGroup === t.age ? 'text-white' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}
                  style={f.ageGroup === t.age ? { background: activity.color, borderColor: activity.color } : {}}>
                  {t.emoji} Ages {t.age}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* 3 — Day & time */}
        {branch && (
          <div className="bg-white rounded-2xl border border-gray-100 p-5">
            <Num n={3}>Which day &amp; time? <span className="font-normal text-gray-400 text-sm">— {activity.name} · {branch.name}</span></Num>
            {slots.length > 0 ? (
              <div className={`grid grid-cols-2 ${slots.length > 3 ? 'sm:grid-cols-4' : 'sm:grid-cols-3'} gap-2.5 mb-4`}>
                {slots.map(s => (
                  <button key={s.id} type="button" onClick={() => setF({ ...f, slotId: s.id, otherDay: '' })}
                    className={`p-3 rounded-xl border-2 text-center transition-all ${f.slotId === s.id ? '' : 'border-gray-200 hover:border-gray-300'}`}
                    style={f.slotId === s.id ? { borderColor: activity.color, background: activity.color + '12' } : {}}>
                    <div className="font-bold text-gray-900 text-sm">{s.day}</div>
                    <div className="text-xs text-gray-500">{s.time}</div>
                  </button>
                ))}
              </div>
            ) : (
              <p className="text-sm text-amber-800 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2.5 mb-4">
                {activity.note(branch) ?? 'This class runs at our other branch — register and we\'ll arrange it with you.'}
              </p>
            )}
            <div className="rounded-xl border border-dashed border-gray-300 p-3.5">
              <label className="flex items-center gap-1.5 text-sm font-semibold text-gray-700 mb-1.5">
                <CalendarPlus size={15} className="text-orange-500" /> None of these suit you? Ask for another day
              </label>
              <input value={f.otherDay} onChange={e => setF({ ...f, otherDay: e.target.value, slotId: e.target.value.trim() ? '' : f.slotId })}
                placeholder="e.g. Monday at 4:00 PM, or Saturday morning"
                className="w-full px-3 py-2.5 rounded-lg border border-gray-200 text-sm" />
              <p className="text-[11px] text-gray-400 mt-1.5">We&apos;ll look for a group at that time — if it works, you&apos;ll get a confirmation on WhatsApp.</p>
            </div>
          </div>
        )}

        {/* 4 & 5 — Robotics-only add-ons */}
        {isRobotics && (
          <>
            {/* MakeX */}
            <div className={`rounded-2xl border-2 p-5 transition-all ${f.makex ? 'border-amber-400 bg-amber-50' : 'border-gray-100 bg-white'}`}>
              <Num n={4}>
                <span className="flex items-center gap-1.5"><Trophy size={17} className="text-amber-500" /> MakeX competition squad
                  <span className="badge-pill bg-amber-100 text-amber-700 text-[10px] font-bold">optional</span>
                </span>
              </Num>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                Extra training to prepare for the <b>MakeX robotics competition</b> — on a <b>different day</b> from the regular class, for students who want to compete.
                {branch && makexSlots.length === 0 && <> {branch.makexNote}</>}
              </p>
              {!branch ? (
                <p className="text-xs text-gray-400">Choose a branch above to see the MakeX times.</p>
              ) : track && !track.makexEligible ? (
                <p className="text-xs text-gray-500 bg-gray-50 rounded-lg px-3 py-2">
                  The competition squad starts from <b>age 6</b> ({track.name} is ages {track.age}) — your child can join it in a future year. 🌱
                </p>
              ) : (
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={f.makex} onChange={e => setF({ ...f, makex: e.target.checked, makexSlotId: '' })} className="w-4 h-4 accent-amber-500" />
                    <span className="font-bold text-gray-900 text-sm">Yes — my child wants to join the MakeX squad 🏆</span>
                  </label>
                  {f.makex && (
                    <div className="mt-4 pl-7">
                      {makexSlots.length > 0 ? (
                        <>
                          <div className="text-xs font-bold text-gray-600 mb-2">Choose the training time:</div>
                          <div className="grid grid-cols-2 gap-2.5 max-w-sm">
                            {makexSlots.map(s => (
                              <button key={s.id} type="button" onClick={() => setF({ ...f, makexSlotId: s.id })}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${f.makexSlotId === s.id ? 'border-amber-500 bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                <div className="font-bold text-gray-900 text-sm">{s.day}</div>
                                <div className="text-xs text-gray-500">{s.time}</div>
                              </button>
                            ))}
                          </div>
                          {chosenSlot && makexSlots.some(s => s.id === f.makexSlotId && s.day === chosenSlot.day) && (
                            <p className="text-[11px] text-amber-700 mt-2">Heads up: that&apos;s the same day as the class — we&apos;ll confirm it works for you.</p>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-amber-800 bg-white rounded-lg px-3 py-2 border border-amber-200">{branch.makexNote}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Chess */}
            <div className={`rounded-2xl border-2 p-5 transition-all ${f.chess ? 'border-emerald-400 bg-emerald-50' : 'border-gray-100 bg-white'}`}>
              <Num n={5}>
                <span className="flex items-center gap-1.5"><Crown size={17} className="text-emerald-600" /> Chess club
                  <span className="badge-pill bg-emerald-100 text-emerald-700 text-[10px] font-bold">optional</span>
                </span>
              </Num>
              <p className="text-sm text-gray-600 leading-relaxed mb-3">
                A separate <b>Saturday chess class</b> — openings, tactics, endgames and real games, taught step by step from first moves to confident play.
                {branch && chessSlots.length === 0 && <> {branch.chessNote}</>}
              </p>
              {!branch ? (
                <p className="text-xs text-gray-400">Choose a branch above to see the chess times.</p>
              ) : (
                <div>
                  <label className="flex items-center gap-2.5 cursor-pointer">
                    <input type="checkbox" checked={f.chess} onChange={e => setF({ ...f, chess: e.target.checked, chessSlotId: '' })} className="w-4 h-4 accent-emerald-600" />
                    <span className="font-bold text-gray-900 text-sm">Yes — my child wants to join the chess club ♟️</span>
                  </label>
                  {f.chess && (
                    <div className="mt-4 pl-7">
                      {chessSlots.length > 0 ? (
                        <>
                          <div className="text-xs font-bold text-gray-600 mb-2">Choose the chess time:</div>
                          <div className="grid grid-cols-2 gap-2.5 max-w-sm">
                            {chessSlots.map(s => (
                              <button key={s.id} type="button" onClick={() => setF({ ...f, chessSlotId: s.id })}
                                className={`p-3 rounded-xl border-2 text-center transition-all ${f.chessSlotId === s.id ? 'border-emerald-500 bg-white' : 'border-gray-200 bg-white hover:border-gray-300'}`}>
                                <div className="font-bold text-gray-900 text-sm">{s.day}</div>
                                <div className="text-xs text-gray-500">{s.time}</div>
                              </button>
                            ))}
                          </div>
                          {f.makex && f.chessSlotId && f.makexSlotId &&
                            chessSlots.find(s => s.id === f.chessSlotId)?.time === makexSlots.find(s => s.id === f.makexSlotId)?.time && (
                            <p className="text-[11px] text-red-600 font-semibold mt-2">
                              That&apos;s the same time as the MakeX squad you picked — please choose the other chess time (or the other MakeX time).
                            </p>
                          )}
                        </>
                      ) : (
                        <p className="text-xs text-emerald-800 bg-white rounded-lg px-3 py-2 border border-emerald-200">{branch.chessNote}</p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </>
        )}

        {/* Details */}
        <div className="bg-white rounded-2xl border border-gray-100 p-5">
          <Num n={isRobotics ? 6 : 4}>Your details</Num>
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Child&apos;s full name *</label>
                <input value={f.childName} onChange={set('childName')} required placeholder="e.g. Sami Khoury"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of birth</label>
                <input type="date" value={f.dob} onChange={set('dob')} className="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm" />
              </div>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Parent&apos;s name *</label>
                <input value={f.parentName} onChange={set('parentName')} required placeholder="Your name"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp number *</label>
                <input value={f.parentPhone} onChange={set('parentPhone')} required placeholder="70 123 456" inputMode="tel"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
              <input value={f.parentEmail} onChange={set('parentEmail')} type="email" required placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
              <p className="text-[11px] text-gray-400 mt-1">We send your child&apos;s progress reports here.</p>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Anything we should know?</label>
              <textarea value={f.notes} onChange={set('notes')} rows={2} placeholder="Previous experience, a sibling also joining, questions…"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none" />
            </div>
            {/* Honeypot — humans never see or fill this */}
            <input value={f.website} onChange={set('website')} name="website" tabIndex={-1} autoComplete="off"
              className="absolute opacity-0 pointer-events-none h-0 w-0" aria-hidden="true" />
          </div>
        </div>

        {/* Summary + submit */}
        <div className="rounded-2xl p-4 text-white text-sm" style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
          <div className="font-bold mb-1">Your choice</div>
          <div className="text-white/70 leading-relaxed">
            {activity.emoji} {activity.name}
            {branch && ` · ${branch.name}`}
            {isRobotics && track && ` · ${track.name} (ages ${track.age})`}
            {!isRobotics && f.ageGroup && ` · ages ${f.ageGroup}`}
            {chosenSlot && ` · ${slotLabel(chosenSlot)}`}
            {f.otherDay.trim() && ` · requested: ${f.otherDay.trim()}`}
            {isRobotics && f.makex && ` · + MakeX${f.makexSlotId ? ` (${slotLabel(makexSlots.find(s => s.id === f.makexSlotId) as Slot)})` : ''}`}
            {isRobotics && f.chess && ` · + Chess${f.chessSlotId ? ` (${slotLabel(chessSlots.find(s => s.id === f.chessSlotId) as Slot)})` : ''}`}
          </div>
        </div>

        {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

        <button type="submit" disabled={busy}
          className="w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-bold text-white disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
          {busy ? <Loader2 size={18} className="animate-spin" /> : <>Register for 2026–2027 <ArrowRight size={16} /></>}
        </button>
        <p className="text-[11px] text-gray-400 text-center pb-4">
          Your details go only to the academy director and are never shared. Already enrolled?{' '}
          <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
        </p>
      </form>
    </div>
  );
}
