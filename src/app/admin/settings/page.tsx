'use client';

import { useEffect, useState } from 'react';
import { Loader2, Save, CheckCircle, CalendarRange, Wallet, Percent, Eye, EyeOff } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { getSettings, saveSettings, DEFAULT_SETTINGS } from '@/lib/settings';
import { ACTIVITIES } from '@/lib/enrollment';
import type { AcademySettings } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Academy settings — the fees and registration details for the
//  academic year. Admin only; the fees can optionally be shown to
//  parents on the public enrolment form.
// ════════════════════════════════════════════════════════════════

// The paid things families can sign up for: the three activities + the add-ons.
const FEE_ITEMS = [
  ...ACTIVITIES.map(a => ({ key: a.id, label: a.name, emoji: a.emoji, color: a.color })),
  { key: 'makex', label: 'MakeX competition squad', emoji: '🏆', color: '#F59E0B' },
  { key: 'chess', label: 'Chess club', emoji: '♟️', color: '#16A34A' },
];

export default function AdminSettingsPage() {
  return (
    <RequireRole allow={['admin']}>
      <Settings />
    </RequireRole>
  );
}

function Settings() {
  const [s, setS] = useState<AcademySettings>({ ...DEFAULT_SETTINGS });
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => { getSettings().then(setS).finally(() => setLoading(false)); }, []);

  const num = (v: string) => { const n = parseFloat(v); return isNaN(n) || n < 0 ? 0 : n; };
  const setFee = (k: string, v: string) => setS({ ...s, fees: { ...s.fees, [k]: num(v) } });

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true); setError(''); setSaved(false);
    try { await saveSettings(s); setSaved(true); setTimeout(() => setSaved(false), 2500); }
    catch { setError('Could not save — make sure the updated Firestore rules are published.'); }
    finally { setBusy(false); }
  }

  const C = s.currency || '$';

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader badge="⚙️ Academy Settings"
          title="Fees & registration details"
          subtitle="Set the fees for the academic year once — they prefill the fees sheet and can be shown to parents on the registration form." />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : (
            <form onSubmit={save} className="space-y-5">

              {/* Academic year */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><CalendarRange size={17} className="text-blue-600" /> Academic year</h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Year label</label>
                    <input value={s.yearLabel} onChange={e => setS({ ...s, yearLabel: e.target.value })} placeholder="2026–2027"
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Starts</label>
                    <input type="date" value={s.yearStart ?? ''} onChange={e => setS({ ...s, yearStart: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Ends</label>
                    <input type="date" value={s.yearEnd ?? ''} onChange={e => setS({ ...s, yearEnd: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                </div>
              </div>

              {/* Fees */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-black text-gray-900 mb-1 flex items-center gap-2"><Wallet size={17} className="text-green-600" /> Fees</h3>
                <p className="text-xs text-gray-400 mb-4">Monthly fee per class. Leave a line at 0 if it isn&apos;t charged.</p>

                <div className="flex items-end gap-3 flex-wrap mb-4 pb-4 border-b border-gray-100">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Currency</label>
                    <input value={s.currency} onChange={e => setS({ ...s, currency: e.target.value.slice(0, 4) })}
                      className="w-20 px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Registration fee <span className="font-normal text-gray-400">(one-off)</span></label>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400 text-sm">{C}</span>
                      <input type="number" inputMode="decimal" value={s.registrationFee ?? ''} onChange={e => setS({ ...s, registrationFee: num(e.target.value) })}
                        placeholder="0" className="w-28 px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5 flex items-center gap-1"><Percent size={13} /> Sibling discount</label>
                    <div className="flex items-center gap-1">
                      <input type="number" inputMode="decimal" value={s.siblingDiscountPct ?? ''} onChange={e => setS({ ...s, siblingDiscountPct: num(e.target.value) })}
                        placeholder="0" className="w-20 px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                      <span className="text-gray-400 text-sm">%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  {FEE_ITEMS.map(it => (
                    <div key={it.key} className="flex items-center gap-3">
                      <span className="text-lg w-7 text-center">{it.emoji}</span>
                      <span className="flex-1 text-sm font-semibold text-gray-800">{it.label}</span>
                      <span className="text-xs text-gray-400">per month</span>
                      <div className="flex items-center gap-1">
                        <span className="text-gray-400 text-sm">{C}</span>
                        <input type="number" inputMode="decimal" value={s.fees[it.key] || ''} onChange={e => setFee(it.key, e.target.value)}
                          placeholder="0" className="w-24 px-3 py-2 rounded-xl border border-gray-200 text-sm" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment details */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5">
                <h3 className="font-black text-gray-900 mb-4 flex items-center gap-2"><Wallet size={17} className="text-purple-600" /> Payment details</h3>
                <div className="space-y-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Whish wallet</label>
                    <input value={s.whishWallet ?? ''} onChange={e => setS({ ...s, whishWallet: e.target.value })}
                      placeholder="70227005 (Eddy Bachaalany)" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Note for parents</label>
                    <textarea value={s.paymentNote ?? ''} onChange={e => setS({ ...s, paymentNote: e.target.value })} rows={2}
                      placeholder="e.g. Fees are due in the first week of each month. Cash accepted at the centre."
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm resize-none" />
                  </div>
                  <label className="flex items-center gap-2.5 cursor-pointer pt-1">
                    <input type="checkbox" checked={!!s.showFeesOnEnroll} onChange={e => setS({ ...s, showFeesOnEnroll: e.target.checked })} className="w-4 h-4 accent-blue-600" />
                    <span className="text-sm font-semibold text-gray-800 flex items-center gap-1.5">
                      {s.showFeesOnEnroll ? <Eye size={14} className="text-blue-600" /> : <EyeOff size={14} className="text-gray-400" />}
                      Show the fees to parents on the registration form
                    </span>
                  </label>
                </div>
              </div>

              {error && <p className="text-sm text-red-600 font-semibold">{error}</p>}

              <div className="flex items-center gap-3">
                <button type="submit" disabled={busy}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm disabled:opacity-60"
                  style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
                  {busy ? <Loader2 size={15} className="animate-spin" /> : <Save size={15} />} Save settings
                </button>
                {saved && <span className="text-sm font-bold text-green-600 inline-flex items-center gap-1.5"><CheckCircle size={15} /> Saved</span>}
              </div>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
