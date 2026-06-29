'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle, CalendarClock, Wallet, Laptop, KeyRound, AlertCircle } from 'lucide-react';

interface Info {
  studentName: string; className: string; coachName: string;
  classCode: string; username: string; dob: string | null; confirmed: boolean;
}

function Welcome() {
  const params = useSearchParams();
  const c = params.get('c');
  const s = params.get('s');

  const [info, setInfo] = useState<Info | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [dob, setDob] = useState('');
  const [busy, setBusy] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    if (!c || !s) { setError('This link is incomplete — please use the link your academy sent you.'); setLoading(false); return; }
    fetch(`/api/welcome?c=${encodeURIComponent(c)}&s=${encodeURIComponent(s)}`)
      .then(async r => ({ ok: r.ok, d: await r.json() }))
      .then(({ ok, d }) => {
        if (!ok) { setError(d.error || 'We could not find this registration.'); return; }
        setInfo(d); setConfirmed(!!d.confirmed); if (d.dob) setDob(d.dob);
      })
      .catch(() => setError('Could not load this page. Please try again.'))
      .finally(() => setLoading(false));
  }, [c, s]);

  async function submit(e: React.FormEvent) {
    e.preventDefault(); setBusy(true); setError('');
    try {
      const res = await fetch('/api/welcome', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ c, s, dob }) });
      const d = await res.json();
      if (!res.ok) throw new Error(d.error || 'Could not confirm. Please try again.');
      setConfirmed(true);
    } catch (err) { setError(err instanceof Error ? err.message : 'Could not confirm.'); }
    finally { setBusy(false); }
  }

  const first = info?.studentName?.split(/\s+/)[0] || 'your child';

  return (
    <div className="min-h-screen flex items-center justify-center p-5" style={{ background: '#F8FAFF' }}>
      <div className="w-full max-w-md">
        <div className="flex items-center justify-center gap-2 mb-5">
          <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white" style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>R</div>
          <div>
            <div className="font-black text-gray-900 leading-none">RoboHolic</div>
            <div className="text-gray-400 text-xs">Summer Camp 2026</div>
          </div>
        </div>

        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">
          {loading ? (
            <div className="flex justify-center py-12"><Loader2 className="animate-spin text-blue-600" size={28} /></div>
          ) : error && !info ? (
            <div className="text-center py-6">
              <AlertCircle className="mx-auto mb-3 text-red-400" size={28} />
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          ) : info && (
            <>
              <h1 className="text-2xl font-black text-gray-900 text-center mb-1">Welcome, {first}! 🎉</h1>
              <p className="text-center text-gray-500 text-sm mb-6">
                We&apos;re delighted to confirm <b className="text-gray-700">{info.studentName}</b>&apos;s place at RoboHolic Summer Camp.
              </p>

              <div className="rounded-2xl bg-gray-50 p-4 text-sm mb-6 space-y-1.5">
                <div className="flex justify-between gap-3"><span className="text-gray-400">Group</span><span className="font-semibold text-gray-800 text-right">{info.className}</span></div>
                {info.coachName && <div className="flex justify-between gap-3"><span className="text-gray-400">Coach</span><span className="font-semibold text-gray-800">{info.coachName}</span></div>}
              </div>

              {!confirmed ? (
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Please confirm {first}&apos;s date of birth</label>
                    <input type="date" required value={dob} onChange={e => setDob(e.target.value)} max={new Date().toISOString().slice(0, 10)}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
                  </div>
                  {error && <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-3 py-2 text-red-700 text-xs"><AlertCircle size={14} className="mt-0.5 shrink-0" /> {error}</div>}
                  <button type="submit" disabled={busy}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60"
                    style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
                    {busy ? <Loader2 size={16} className="animate-spin" /> : 'Confirm registration'}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-start gap-3 bg-green-50 border border-green-200 rounded-2xl p-4">
                    <CheckCircle className="text-green-500 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-green-900">
                      <b>Registration confirmed!</b> We can&apos;t wait to see {first}.
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4">
                    <CalendarClock className="text-blue-600 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-gray-700"><b className="text-gray-900">First day:</b> Wednesday, 1 July 2026 at <b>8:30 AM</b>.</div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4">
                    <Laptop className="text-purple-600 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-gray-700">
                      <b className="text-gray-900">Please bring a tablet or laptop</b> so {first} can save their progress. Log in on the day with:
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="badge-pill bg-gray-100 text-gray-700 text-xs inline-flex items-center gap-1"><KeyRound size={11} /> Class code: <b className="font-mono">{info.classCode}</b></span>
                        <span className="badge-pill bg-gray-100 text-gray-700 text-xs">Username: <b className="font-mono">{info.username}</b></span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 rounded-2xl border border-gray-100 p-4">
                    <Wallet className="text-amber-600 shrink-0 mt-0.5" size={20} />
                    <div className="text-sm text-gray-700">
                      <b className="text-gray-900">July payment:</b> via <b>Whish</b> to wallet <b className="font-mono">70227005</b> (Eddy Bachaalany), or <b>cash on Wednesday</b>.
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
        <p className="text-center text-xs text-gray-300 mt-4">RoboHolic Robotics Academy · this link is personal to your family.</p>
      </div>
    </div>
  );
}

export default function WelcomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: '#F8FAFF' }} />}>
      <Welcome />
    </Suspense>
  );
}
