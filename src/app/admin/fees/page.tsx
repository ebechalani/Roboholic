'use client';

import { Fragment, useEffect, useMemo, useState, useCallback } from 'react';
import {
  Loader2, RefreshCw, Users, Wallet, Banknote, CheckCircle, X, Printer, Download,
  MessageCircle, Plus, Trash2, CalendarClock, AlertTriangle, ChevronDown, ChevronRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { getAllClasses, getClassStudents, setStudentPaymentRecords } from '@/lib/classes';
import type { ClassDoc, ClassStudent, PaymentRecord } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Fees & validity — the school-year payment sheet.
//  Per student: enter the amount paid, when, and how long it's valid.
//  Each payment can be confirmed to the parent with one WhatsApp tap.
//  Admin only; coaches never see money.
// ════════════════════════════════════════════════════════════════

const CUR = '$';
const fmt = (n: number) => `${CUR}${(n || 0).toLocaleString()}`;
const waNum = (p?: string) => { let d = (p || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('00')) d = d.slice(2); if (d.startsWith('961')) return d; if (d.startsWith('0')) d = d.slice(1); return '961' + d; };

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = () => iso(new Date());
const addMonths = (from: string, n: number) => { const d = new Date(from + 'T12:00:00'); d.setMonth(d.getMonth() + n); return iso(d); };
const daysLeft = (until: string) => Math.round((new Date(until + 'T12:00:00').getTime() - new Date(today() + 'T12:00:00').getTime()) / 86400000);
const pretty = (d?: string) => (d ? new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');

type Row = { cls: ClassDoc; s: ClassStudent };
type Status = 'active' | 'expiring' | 'expired' | 'none';

/** The payment that covers the furthest into the future. */
function latest(s: ClassStudent): PaymentRecord | undefined {
  return (s.paymentRecords ?? []).slice().sort((a, b) => (a.validUntil || '').localeCompare(b.validUntil || '')).pop();
}
function statusOf(s: ClassStudent): { key: Status; days: number } {
  const l = latest(s);
  if (!l) return { key: 'none', days: 0 };
  const d = daysLeft(l.validUntil);
  return { key: d < 0 ? 'expired' : d <= 7 ? 'expiring' : 'active', days: d };
}
const STATUS = {
  active: { label: 'Active', color: '#16A34A', bg: '#ECFDF5' },
  expiring: { label: 'Expiring', color: '#F59E0B', bg: '#FFFBEB' },
  expired: { label: 'Expired', color: '#DC2626', bg: '#FEF2F2' },
  none: { label: 'Not paid', color: '#9CA3AF', bg: '#F9FAFB' },
} as const;

export default function AdminFeesPage() {
  return (
    <RequireRole allow={['admin']}>
      <Fees />
    </RequireRole>
  );
}

function Fees() {
  const [classes, setClasses] = useState<ClassDoc[]>([]);
  const [rows, setRows] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [classId, setClassId] = useState('all');
  const [filter, setFilter] = useState<'all' | Status>('all');
  const [openUid, setOpenUid] = useState('');
  // The "add payment" form for the open student
  const [form, setForm] = useState({ amount: '', method: 'whish' as 'whish' | 'cash', paidAt: today(), validUntil: addMonths(today(), 1), note: '' });

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const cs = await getAllClasses();
      const all: Row[] = [];
      for (const c of cs) {
        const students = await getClassStudents(c.id).catch(() => [] as ClassStudent[]);
        students.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));
        for (const s of students) all.push({ cls: c, s });
      }
      setClasses(cs); setRows(all);
    } catch {
      setError('Could not load the students — check the connection and press Refresh.');
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function saveRecords(r: Row, records: PaymentRecord[]) {
    setSaving(r.s.uid); setError('');
    setRows(prev => prev.map(x => x.s.uid === r.s.uid && x.cls.id === r.cls.id ? { ...x, s: { ...x.s, paymentRecords: records } } : x));
    try { await setStudentPaymentRecords(r.cls.id, r.s.uid, records); }
    catch { setError('Could not save the payment — try again.'); void load(); }
    finally { setSaving(null); }
  }

  function addPayment(r: Row) {
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) { setError('Enter the amount that was paid.'); return; }
    if (!form.validUntil) { setError('Set the date the payment is valid until.'); return; }
    const rec: PaymentRecord = {
      id: `p${Date.now()}${Math.floor(Math.random() * 1000)}`,
      amount, method: form.method, paidAt: form.paidAt || today(), validUntil: form.validUntil,
      ...(form.note.trim() ? { note: form.note.trim() } : {}),
    };
    void saveRecords(r, [...(r.s.paymentRecords ?? []), rec]);
    setForm({ amount: '', method: 'whish', paidAt: today(), validUntil: addMonths(today(), 1), note: '' });
  }
  function removePayment(r: Row, id: string) {
    void saveRecords(r, (r.s.paymentRecords ?? []).filter(p => p.id !== id));
  }
  function markConfirmed(r: Row, id: string) {
    void saveRecords(r, (r.s.paymentRecords ?? []).map(p => p.id === id ? { ...p, confirmedAt: new Date().toISOString() } : p));
  }

  function confirmMsg(r: Row, p: PaymentRecord) {
    const first = (r.s.displayName || '').split(/\s+/)[0] || 'your child';
    const hi = r.s.parentName ? `Hello ${r.s.parentName}!` : 'Hello!';
    return `${hi} 👋\n\nThis is RoboHolic Academy — we confirm we received *${fmt(p.amount)}* for ${first}'s classes.\n\n✅ Paid: ${pretty(p.paidAt)} (${p.method === 'whish' ? 'Whish' : 'cash'})\n📅 Valid until: *${pretty(p.validUntil)}*\n\nThank you! 🤖`;
  }
  function renewMsg(r: Row) {
    const first = (r.s.displayName || '').split(/\s+/)[0] || 'your child';
    const hi = r.s.parentName ? `Hello ${r.s.parentName}!` : 'Hello!';
    const l = latest(r.s);
    const when = l ? ` — ${first}'s current period ${daysLeft(l.validUntil) < 0 ? 'ended' : 'ends'} on ${pretty(l.validUntil)}` : '';
    return `${hi} 👋\n\nThis is RoboHolic Academy${when}. Would you like to renew ${first}'s subscription?\n\nYou can pay via Whish to wallet 70227005 (Eddy Bachaalany), or cash at the centre. Thank you! 🤖`;
  }

  const visible = useMemo(() => rows
    .filter(r => classId === 'all' || r.cls.id === classId)
    .filter(r => filter === 'all' || statusOf(r.s).key === filter), [rows, classId, filter]);

  const stats = useMemo(() => {
    const scope = rows.filter(r => classId === 'all' || r.cls.id === classId);
    const c = { active: 0, expiring: 0, expired: 0, none: 0, collected: 0 };
    for (const r of scope) {
      c[statusOf(r.s).key]++;
      for (const p of r.s.paymentRecords ?? []) c.collected += p.amount || 0;
    }
    return { ...c, total: scope.length };
  }, [rows, classId]);

  function exportCsv() {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const phone = (v?: string) => (v ? `"=""${String(v).replace(/"/g, '')}"""` : '""');
    const head = ['Student', 'Class', 'Status', 'Days left', 'Last amount', 'Paid on', 'Valid until', 'Method', 'Total paid', 'Parent', 'WhatsApp', 'Email'];
    const lines = [head.map(esc).join(',')];
    for (const r of visible) {
      const st = statusOf(r.s); const l = latest(r.s);
      const total = (r.s.paymentRecords ?? []).reduce((n, p) => n + (p.amount || 0), 0);
      lines.push([
        esc(r.s.displayName), esc(r.cls.name), esc(STATUS[st.key].label), esc(l ? st.days : ''),
        esc(l?.amount ?? ''), esc(l?.paidAt ?? ''), esc(l?.validUntil ?? ''), esc(l?.method ?? ''),
        esc(total), esc(r.s.parentName ?? ''), phone(r.s.parentPhone), esc(r.s.parentEmail ?? ''),
      ].join(','));
    }
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `RoboHolic-fees-${today()}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <div className="no-print"><Navbar /></div>
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <div className="no-print">
          <SectionHeader badge="🧾 Fees & Validity"
            title="Who has paid, and until when"
            subtitle="Enter each payment with the period it covers. One tap sends the parent a WhatsApp confirmation — or a renewal reminder when it runs out." />
        </div>

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-5 no-print">
            <select value={classId} onChange={e => setClassId(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-800">
              <option value="all">All classes</option>
              {classes.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
            <button onClick={() => void load()} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
            {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> saving…</span>}
            <div className="ml-auto flex items-center gap-2">
              <button onClick={exportCsv} disabled={visible.length === 0}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: '#16A34A' }}>
                <Download size={14} /> Excel ({visible.length})
              </button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700"><Printer size={14} /> Print</button>
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4 no-print">{error}</div>}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : (
            <>
              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
                {[
                  { label: 'Active', value: stats.active, color: '#16A34A', icon: <CheckCircle size={16} /> },
                  { label: 'Expiring ≤7 days', value: stats.expiring, color: '#F59E0B', icon: <AlertTriangle size={16} /> },
                  { label: 'Expired', value: stats.expired, color: '#DC2626', icon: <X size={16} /> },
                  { label: 'Never paid', value: stats.none, color: '#9CA3AF', icon: <Users size={16} /> },
                  { label: 'Total collected', value: fmt(stats.collected), color: '#2563EB', icon: <Wallet size={16} /> },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: s.color + '15', color: s.color }}>{s.icon}</div>
                    <div className="text-xl font-black text-gray-900">{s.value}</div>
                    <div className="text-[11px] text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Status filter */}
              <div className="flex flex-wrap gap-2 mb-5 no-print">
                <button onClick={() => setFilter('all')}
                  className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${filter === 'all' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-600'}`}>
                  All ({stats.total})
                </button>
                {(['active', 'expiring', 'expired', 'none'] as Status[]).map(k => (
                  <button key={k} onClick={() => setFilter(k)}
                    className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${filter === k ? 'text-white' : 'bg-white text-gray-600 border-gray-200'}`}
                    style={filter === k ? { background: STATUS[k].color, borderColor: STATUS[k].color } : {}}>
                    {STATUS[k].label} ({stats[k]})
                  </button>
                ))}
              </div>

              {/* The sheet */}
              {visible.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Users size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No students with this filter.</p>
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
                          <th className="px-3 py-2.5 font-bold">Student</th>
                          <th className="px-3 py-2.5 font-bold">Class</th>
                          <th className="px-3 py-2.5 font-bold">Last paid</th>
                          <th className="px-3 py-2.5 font-bold">Valid until</th>
                          <th className="px-3 py-2.5 font-bold">Status</th>
                          <th className="px-3 py-2.5 font-bold">Total</th>
                          <th className="px-3 py-2.5 font-bold no-print">Confirm / remind</th>
                          <th className="px-3 py-2.5 font-bold no-print"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {visible.map(r => {
                          const st = statusOf(r.s); const l = latest(r.s); const S = STATUS[st.key];
                          const open = openUid === r.s.uid;
                          const total = (r.s.paymentRecords ?? []).reduce((n, p) => n + (p.amount || 0), 0);
                          return (
                            <Fragment key={r.cls.id + r.s.uid}>
                              <tr key={r.s.uid} className="border-t border-gray-50 hover:bg-blue-50/30 align-top">
                                <td className="px-3 py-2.5">
                                  <div className="font-bold text-gray-900 whitespace-nowrap">{r.s.displayName}</div>
                                  {r.s.parentName && <div className="text-[11px] text-gray-400">{r.s.parentName}</div>}
                                </td>
                                <td className="px-3 py-2.5 text-gray-600 text-xs">{r.cls.name}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                  {l ? <>
                                    <span className="font-bold text-gray-900">{fmt(l.amount)}</span>
                                    <span className="text-[11px] text-gray-400 ml-1">{l.method === 'whish' ? 'Whish' : 'cash'}</span>
                                    <div className="text-[11px] text-gray-400">{pretty(l.paidAt)}</div>
                                  </> : <span className="text-gray-300">—</span>}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                  {l ? <>
                                    <div className="font-semibold text-gray-800">{pretty(l.validUntil)}</div>
                                    <div className="text-[11px]" style={{ color: S.color }}>
                                      {st.days < 0 ? `${Math.abs(st.days)} days ago` : st.days === 0 ? 'ends today' : `${st.days} days left`}
                                    </div>
                                  </> : <span className="text-gray-300">—</span>}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                  <span className="badge-pill text-[10px] font-bold" style={{ background: S.bg, color: S.color }}>{S.label}</span>
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap font-semibold text-gray-700">{total ? fmt(total) : <span className="text-gray-300">—</span>}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap no-print">
                                  {!r.s.parentPhone ? <span className="text-[11px] text-gray-300">no phone</span> : l && st.key !== 'expired' ? (
                                    <a href={`https://wa.me/${waNum(r.s.parentPhone)}?text=${encodeURIComponent(confirmMsg(r, l))}`}
                                      target="_blank" rel="noreferrer" onClick={() => markConfirmed(r, l.id)}
                                      title="Send the parent a payment confirmation"
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white" style={{ background: '#25D366' }}>
                                      <MessageCircle size={11} /> Confirm{l.confirmedAt ? ' ✓' : ''}
                                    </a>
                                  ) : (
                                    <a href={`https://wa.me/${waNum(r.s.parentPhone)}?text=${encodeURIComponent(renewMsg(r))}`}
                                      target="_blank" rel="noreferrer" title="Ask the parent to renew"
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white" style={{ background: '#F59E0B' }}>
                                      <CalendarClock size={11} /> Remind
                                    </a>
                                  )}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap no-print">
                                  <button onClick={() => { setOpenUid(open ? '' : r.s.uid); setError(''); }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100">
                                    {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />} Payment
                                  </button>
                                </td>
                              </tr>

                              {open && (
                                <tr key={r.s.uid + '-form'} className="bg-blue-50/40 border-t border-blue-100 no-print">
                                  <td colSpan={8} className="px-4 py-4">
                                    {/* Add a payment */}
                                    <div className="font-bold text-gray-800 text-sm mb-2">Add a payment for {r.s.displayName}</div>
                                    <div className="flex flex-wrap items-end gap-2.5 mb-3">
                                      <label className="text-xs font-semibold text-gray-600">Amount
                                        <div className="flex items-center gap-1 mt-1">
                                          <span className="text-gray-400 text-sm">{CUR}</span>
                                          <input type="number" inputMode="decimal" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                                            placeholder="100" className="w-24 px-2 py-2 rounded-lg border border-gray-200 text-sm" />
                                        </div>
                                      </label>
                                      <label className="text-xs font-semibold text-gray-600">Method
                                        <select value={form.method} onChange={e => setForm({ ...form, method: e.target.value as 'whish' | 'cash' })}
                                          className="block mt-1 px-2 py-2 rounded-lg border border-gray-200 text-sm bg-white">
                                          <option value="whish">Whish</option>
                                          <option value="cash">Cash</option>
                                        </select>
                                      </label>
                                      <label className="text-xs font-semibold text-gray-600">Paid on
                                        <input type="date" value={form.paidAt} onChange={e => setForm({ ...form, paidAt: e.target.value })}
                                          className="block mt-1 px-2 py-2 rounded-lg border border-gray-200 text-sm" />
                                      </label>
                                      <label className="text-xs font-semibold text-gray-600">Valid until
                                        <input type="date" value={form.validUntil} onChange={e => setForm({ ...form, validUntil: e.target.value })}
                                          className="block mt-1 px-2 py-2 rounded-lg border border-gray-200 text-sm" />
                                      </label>
                                      <div className="flex items-center gap-1 pb-1">
                                        {[1, 3, 12].map(n => (
                                          <button key={n} type="button" onClick={() => setForm({ ...form, validUntil: addMonths(form.paidAt || today(), n) })}
                                            className="px-2 py-1.5 rounded-lg text-[11px] font-bold text-gray-600 bg-white border border-gray-200 hover:border-blue-300">
                                            +{n === 12 ? '1 year' : `${n} month${n > 1 ? 's' : ''}`}
                                          </button>
                                        ))}
                                      </div>
                                      <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="note (optional)"
                                        className="flex-1 min-w-[140px] px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                                      <button type="button" onClick={() => addPayment(r)} disabled={saving === r.s.uid}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white disabled:opacity-50" style={{ background: '#2563EB' }}>
                                        <Plus size={14} /> Add payment
                                      </button>
                                    </div>

                                    {/* History */}
                                    {(r.s.paymentRecords ?? []).length === 0 ? (
                                      <p className="text-xs text-gray-400">No payments recorded yet.</p>
                                    ) : (
                                      <div className="space-y-1">
                                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Payment history</div>
                                        {(r.s.paymentRecords ?? []).slice().sort((a, b) => (b.paidAt || '').localeCompare(a.paidAt || '')).map(p => (
                                          <div key={p.id} className="flex items-center gap-2 text-xs bg-white rounded-lg border border-gray-100 px-3 py-2">
                                            <span className="font-bold text-gray-900">{fmt(p.amount)}</span>
                                            <span className={`badge-pill text-[10px] ${p.method === 'whish' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>
                                              {p.method === 'whish' ? <Wallet size={9} className="inline" /> : <Banknote size={9} className="inline" />} {p.method === 'whish' ? 'Whish' : 'cash'}
                                            </span>
                                            <span className="text-gray-500">paid {pretty(p.paidAt)}</span>
                                            <span className="text-gray-400">→</span>
                                            <span className="font-semibold text-gray-700">valid to {pretty(p.validUntil)}</span>
                                            {p.note && <span className="text-gray-400 italic truncate max-w-[160px]">{p.note}</span>}
                                            {p.confirmedAt && <span className="badge-pill bg-green-50 text-green-700 text-[10px]">confirmed ✓</span>}
                                            <button onClick={() => removePayment(r, p.id)} title="Delete this payment"
                                              className="ml-auto p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50"><Trash2 size={12} /></button>
                                          </div>
                                        ))}
                                      </div>
                                    )}
                                  </td>
                                </tr>
                              )}
                            </Fragment>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                  <p className="text-[11px] text-gray-400 px-3 py-2.5 border-t border-gray-50 no-print">
                    Click <b>Payment</b> to record an amount and how long it covers · <b>Confirm</b> sends the parent a WhatsApp receipt · expired students get a <b>Remind</b> button instead.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
