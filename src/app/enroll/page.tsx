'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Loader2, CheckCircle, ArrowRight, MessageCircle } from 'lucide-react';

// ════════════════════════════════════════════════════════════════
//  PUBLIC page — parents register their child for the 2026–2027
//  school-year classes. No login needed; shows NO curriculum.
//  Submissions go to /api/enroll → registrations collection.
// ════════════════════════════════════════════════════════════════

const AGE_OPTIONS = [
  { v: '4-5', label: '4–5 years · Tiny Engineers' },
  { v: '6-7', label: '6–7 years · Explorers' },
  { v: '8-9', label: '8–9 years · Builders' },
  { v: '10-12', label: '10–12 years · Innovators' },
  { v: '13-15', label: '13–15 years · Engineers' },
];
const SCHEDULES = ['Saturday morning', 'Saturday afternoon', 'Weekday after school', 'Not sure yet — advise me'];

export default function EnrollPage() {
  const [f, setF] = useState({ childName: '', dob: '', ageGroup: '', parentName: '', parentPhone: '', parentEmail: '', schedule: '', notes: '', website: '' });
  const [busy, setBusy] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState('');

  const set = (k: keyof typeof f) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setF({ ...f, [k]: e.target.value });

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError('');
    try {
      const res = await fetch('/api/enroll', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(f) });
      const j = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(j.error || 'Something went wrong — please try again.');
      setSent(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong — please try again.');
    } finally { setBusy(false); }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-bg section-pattern relative flex-col justify-center px-16">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>R</div>
          <div>
            <div className="font-black text-white text-lg leading-none">RoboHolic</div>
            <div className="text-white/40 text-xs">Robotics Academy</div>
          </div>
        </div>
        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          Robotics classes<br />2026–2027 🤖
        </h1>
        <p className="text-white/60 text-lg max-w-md leading-relaxed">
          Coding, robots, drones, 3D design and more — a full school year of building, for ages 4 to 15.
          Register your child and we&apos;ll contact you to confirm the group and schedule.
        </p>
        <div className="flex gap-3 text-3xl mt-10">🚀 ⚙️ 💡 🏆</div>
      </div>

      {/* Right — form / success */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12" style={{ background: '#F8FAFF' }}>
        <div className="w-full max-w-md">
          <div className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>R</div>
            <span className="font-black text-gray-900">RoboHolic — 2026–2027</span>
          </div>

          {sent ? (
            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-5"><CheckCircle size={30} /></div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">Registration received! 🎉</h2>
              <p className="text-gray-500 text-sm leading-relaxed mb-6">
                Thank you, {f.parentName.split(/\s+/)[0] || 'friend'}! We&apos;ve registered <b>{f.childName}</b> for the 2026–2027 classes.
                We&apos;ll contact you on WhatsApp to confirm the group, schedule and fees.
              </p>
              <a href="https://wa.me/96170227005" target="_blank" rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl font-bold text-white text-sm" style={{ background: '#25D366' }}>
                <MessageCircle size={16} /> Questions? WhatsApp us
              </a>
            </div>
          ) : (
            <>
              <h2 className="text-2xl font-black text-gray-900 mb-1">Register your child ✏️</h2>
              <p className="text-gray-500 text-sm mb-6">School-year robotics classes 2026–2027 · ages 4–15. We&apos;ll confirm everything with you on WhatsApp.</p>

              <form onSubmit={submit} className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Child&apos;s full name *</label>
                  <input value={f.childName} onChange={set('childName')} required placeholder="e.g. Sami Khoury"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Date of birth</label>
                    <input type="date" value={f.dob} onChange={set('dob')}
                      className="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age group</label>
                    <select value={f.ageGroup} onChange={set('ageGroup')} className="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm bg-white">
                      <option value="">Choose…</option>
                      {AGE_OPTIONS.map(a => <option key={a.v} value={a.v}>{a.label}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Parent&apos;s name *</label>
                  <input value={f.parentName} onChange={set('parentName')} required placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">WhatsApp number *</label>
                    <input value={f.parentPhone} onChange={set('parentPhone')} required placeholder="70 123 456" inputMode="tel"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
                    <input value={f.parentEmail} onChange={set('parentEmail')} type="email" placeholder="optional"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred schedule</label>
                  <select value={f.schedule} onChange={set('schedule')} className="w-full px-3 py-3 rounded-xl border border-gray-200 text-sm bg-white">
                    <option value="">Choose…</option>
                    {SCHEDULES.map(s => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Anything we should know?</label>
                  <textarea value={f.notes} onChange={set('notes')} rows={2} placeholder="Previous experience, a sibling also joining, questions…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm resize-none" />
                </div>
                {/* Honeypot — humans never see or fill this */}
                <input value={f.website} onChange={set('website')} name="website" tabIndex={-1} autoComplete="off"
                  className="absolute opacity-0 pointer-events-none h-0 w-0" aria-hidden="true" />

                {error && <p className="text-sm text-red-600">{error}</p>}
                <button type="submit" disabled={busy}
                  className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-white text-sm disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
                  {busy ? <Loader2 size={16} className="animate-spin" /> : <>Register for 2026–2027 <ArrowRight size={15} /></>}
                </button>
                <p className="text-[11px] text-gray-400 text-center">Your details go only to the academy director and are never shared.</p>
              </form>
            </>
          )}

          <p className="text-center text-xs text-gray-400 mt-6">
            Already enrolled? <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
