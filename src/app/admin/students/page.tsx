'use client';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc } from 'firebase/firestore';
import {
  Loader2, RefreshCw, Users, MessageCircle, Mail, Printer, Download, Search,
  Plus, Trash2, CheckCircle, CalendarClock, ChevronDown, ChevronRight, Wallet, Banknote, UserPlus,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { db } from '@/lib/firebase/client';
import { activityById, branchById, ACTIVITIES, BRANCHES, slotLabel } from '@/lib/enrollment';
import { getSettings, DEFAULT_SETTINGS } from '@/lib/settings';
import type { Registration, PaymentRecord, AcademySettings } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Students 2026–2027 — every registered child in one sheet:
//  who they are, when they registered, which class, their parents'
//  WhatsApp + email, and the fees.
//  A payment is valid from the day it is paid until the SAME DAY
//  NEXT MONTH, MINUS ONE DAY (paid 4 Oct → valid to 3 Nov).
// ════════════════════════════════════════════════════════════════

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const today = () => iso(new Date());
const pretty = (d?: string) => (d ? new Date(d + 'T12:00:00').toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : '—');
const waNum = (p?: string) => { let d = (p || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('00')) d = d.slice(2); if (d.startsWith('961')) return d; if (d.startsWith('0')) d = d.slice(1); return '961' + d; };

/** Add n months to a date, clamped to the end of the target month. */
function addMonths(from: string, n: number): string {
  const d = new Date(from + 'T12:00:00');
  if (isNaN(d.getTime())) return '';
  const day = d.getDate();
  const t = new Date(d.getFullYear(), d.getMonth() + n, 1);
  const lastDay = new Date(t.getFullYear(), t.getMonth() + 1, 0).getDate();
  t.setDate(Math.min(day, lastDay));
  return iso(t);
}
/** Valid until = the same day next month, minus one day (month-end safe). */
function validUntilFor(paidAt: string): string {
  const nextSameDay = addMonths(paidAt, 1);
  if (!nextSameDay) return '';
  const t = new Date(nextSameDay + 'T12:00:00');
  t.setDate(t.getDate() - 1);
  return iso(t);
}
/** The day AFTER the paid period — when the next payment falls due. */
function dueAfter(validUntil: string): string {
  const t = new Date(validUntil + 'T12:00:00');
  if (isNaN(t.getTime())) return '';
  t.setDate(t.getDate() + 1);
  return iso(t);
}
const ordinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd'], v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
};
const daysLeft = (until: string) => Math.round((new Date(until + 'T12:00:00').getTime() - new Date(today() + 'T12:00:00').getTime()) / 86400000);

type Status = 'active' | 'expiring' | 'expired' | 'none';
const STATUS = {
  active: { label: 'Paid', color: '#16A34A', bg: '#ECFDF5' },
  expiring: { label: 'Expiring', color: '#F59E0B', bg: '#FFFBEB' },
  expired: { label: 'Expired', color: '#DC2626', bg: '#FEF2F2' },
  none: { label: 'Not paid', color: '#9CA3AF', bg: '#F9FAFB' },
} as const;

/** The first payment anchors the billing day; it stays fixed all year. */
function firstPayment(r: Registration): PaymentRecord | undefined {
  return (r.feePayments ?? []).slice().sort((a, b) => (a.paidAt || '').localeCompare(b.paidAt || ''))[0];
}
/** The day of the month this family pays on (from their first payment). */
function billingDay(r: Registration): number | null {
  const f = firstPayment(r);
  if (!f) return null;
  const d = new Date(dueAfter(f.validUntil) + 'T12:00:00');
  return isNaN(d.getTime()) ? null : d.getDate();
}

const latest = (r: Registration): PaymentRecord | undefined =>
  (r.feePayments ?? []).slice().sort((a, b) => (a.validUntil || '').localeCompare(b.validUntil || '')).pop();
/**
 * The period a new payment covers. The FIRST payment anchors the cycle on the
 * day it was paid; every later payment simply extends the previous period by a
 * month, so the due day never drifts even when a family pays late.
 */
function nextValidUntil(r: Registration, paidAt: string): string {
  const prev = latest(r);
  return prev ? addMonths(prev.validUntil, 1) : validUntilFor(paidAt);
}

function statusOf(r: Registration): { key: Status; days: number } {
  const l = latest(r);
  if (!l) return { key: 'none', days: 0 };
  const d = daysLeft(l.validUntil);
  return { key: d < 0 ? 'expired' : d <= 7 ? 'expiring' : 'active', days: d };
}
/** "🤖 Robotics · Jdeideh · Friday · 4:00 PM" */
function classOf(r: Registration): string {
  const a = activityById(r.activity ?? 'robotics');
  const b = r.branch ? branchById(r.branch)?.name : '';
  const when = r.slotLabel || (r.otherDay ? `asked: ${r.otherDay}` : '');
  return [a?.name, b, when].filter(Boolean).join(' · ');
}

const EMPTY_NEW = {
  childName: '', dob: '', activity: 'robotics', branch: 'jdeideh', slotId: '',
  parentName: '', parentPhone: '', parentEmail: '', notes: '',
};

export default function AdminStudentsPage() {
  return (
    <RequireRole allow={['admin']}>
      <Students />
    </RequireRole>
  );
}

function Students() {
  const [rows, setRows] = useState<Registration[]>([]);
  const [settings, setSettings] = useState<AcademySettings>({ ...DEFAULT_SETTINGS });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [q, setQ] = useState('');
  const [act, setAct] = useState<'all' | 'robotics' | 'drawing' | 'muaythai'>('all');
  const [pay, setPay] = useState<'all' | Status>('all');
  const [openId, setOpenId] = useState('');
  const [view, setView] = useState<'simple' | 'table'>('simple');
  const [adding, setAdding] = useState(false);
  const [addBusy, setAddBusy] = useState(false);
  const [nf, setNf] = useState({ ...EMPTY_NEW });
  // Times for the class + branch chosen in the add form.
  const newSlots = useMemo(() => {
    const b = branchById(nf.branch);
    const a = activityById(nf.activity);
    return b && a ? a.slots(b) : [];
  }, [nf.branch, nf.activity]);

  /** Add a walk-in family by hand — same shape as a public registration. */
  async function addStudent() {
    const name = nf.childName.trim();
    if (!name) { setError('Enter the child\'s name.'); return; }
    setAddBusy(true); setError('');
    const slot = newSlots.find(x => x.id === nf.slotId);
    const a = activityById(nf.activity);
    const b = branchById(nf.branch);
    const rec = {
      childName: name,
      dob: nf.dob || '',
      parentName: nf.parentName.trim(),
      parentPhone: nf.parentPhone.trim(),
      parentEmail: nf.parentEmail.trim(),
      activity: nf.activity as 'robotics' | 'drawing' | 'muaythai',
      activityName: a?.name ?? '',
      branch: nf.branch,
      branchName: b?.name ?? '',
      slotId: nf.slotId,
      slotLabel: slot ? slotLabel(slot) : '',
      notes: nf.notes.trim(),
      status: 'enrolled' as const,
      addedByAdmin: true,
      createdAt: new Date().toISOString(),
    };
    try {
      const ref = await addDoc(collection(db, 'registrations'), rec);
      setRows(prev => [...prev, { id: ref.id, ...rec } as Registration]
        .sort((x, y) => (x.childName || '').localeCompare(y.childName || '')));
      setNf({ ...EMPTY_NEW });
      setAdding(false);
    } catch {
      setError('Could not add the student — make sure the updated Firestore rules are published.');
    } finally { setAddBusy(false); }
  }
  const [form, setForm] = useState({ amount: '', method: 'whish' as 'whish' | 'cash', paidAt: today(), validUntil: validUntilFor(today()), note: '' });

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const snap = await getDocs(collection(db, 'registrations'));
      const list = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Registration, 'id'>) }))
        .filter(r => r.status !== 'archived')
        .sort((a, b) => (a.childName || '').localeCompare(b.childName || ''));
      setRows(list);
    } catch {
      setError('Could not load the students — check the connection and press Refresh.');
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  useEffect(() => { getSettings().then(setSettings).catch(() => {}); }, []);

  const CUR = settings.currency || '$';
  const fmt = (n: number) => `${CUR}${(n || 0).toLocaleString()}`;
  const feeChips = Object.entries(settings.fees || {}).filter(([, v]) => (v || 0) > 0);

  async function savePayments(r: Registration, feePayments: PaymentRecord[]) {
    setSaving(r.id); setError('');
    setRows(prev => prev.map(x => x.id === r.id ? { ...x, feePayments } : x));
    try { await updateDoc(doc(db, 'registrations', r.id), { feePayments }); }
    catch { setError('Could not save the payment — try again.'); void load(); }
    finally { setSaving(null); }
  }
  function addPayment(r: Registration) {
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) { setError('Enter the amount that was paid.'); return; }
    const paidAt = form.paidAt || today();
    const rec: PaymentRecord = {
      id: `p${Date.now()}${Math.floor(Math.random() * 1000)}`,
      amount, method: form.method, paidAt,
      validUntil: form.validUntil || nextValidUntil(r, paidAt),
      ...(form.note.trim() ? { note: form.note.trim() } : {}),
    };
    void savePayments(r, [...(r.feePayments ?? []), rec]);
    setForm({ amount: '', method: 'whish', paidAt: today(), validUntil: validUntilFor(today()), note: '' });
  }
  const removePayment = (r: Registration, id: string) => void savePayments(r, (r.feePayments ?? []).filter(p => p.id !== id));
  const markConfirmed = (r: Registration, id: string) =>
    void savePayments(r, (r.feePayments ?? []).map(p => p.id === id ? { ...p, confirmedAt: new Date().toISOString() } : p));

  /** The payment as currently typed in the form (for the one-tap receipt). */
  function draftPayment(): PaymentRecord | null {
    const amount = parseFloat(form.amount);
    if (isNaN(amount) || amount <= 0) return null;
    const paidAt = form.paidAt || today();
    return { id: 'draft', amount, method: form.method, paidAt, validUntil: form.validUntil || paidAt };
  }

  function receiptMsg(r: Registration, p: PaymentRecord) {
    const first = (r.childName || '').split(/\s+/)[0] || 'your child';
    const due = dueAfter(p.validUntil);
    const day = due ? new Date(due + 'T12:00:00').getDate() : null;
    return `Dear parent 👋\n\nThis is RoboHolic Academy — we confirm we received *${fmt(p.amount)}* for ${first}'s classes.\n\n✅ Paid: ${pretty(p.paidAt)} (${p.method === 'whish' ? 'Whish' : 'cash'})\n📅 Valid until: *${pretty(p.validUntil)}*\n🔔 Next payment: *${pretty(due)}*${day ? ` — and the ${ordinal(day)} of every month after that.` : ''}\n\nThank you! 🤖`;
  }
  function renewMsg(r: Registration) {
    const first = (r.childName || '').split(/\s+/)[0] || 'your child';
    const l = latest(r);
    const wallet = settings.whishWallet ? ` to wallet ${settings.whishWallet}` : '';
    const day = billingDay(r);
    if (!l) {
      return `Dear parent 👋\n\nThis is RoboHolic Academy — this is a kind reminder about the fee for ${first}'s classes.\n\nYou can pay via Whish${wallet}, or cash at the centre.\n\nThank you! 🤖`;
    }
    const due = dueAfter(l.validUntil);
    const ended = daysLeft(l.validUntil) < 0;
    return `Dear parent 👋\n\nThis is RoboHolic Academy — a kind reminder that ${first}'s subscription ${ended ? 'ended' : 'ends'} on *${pretty(l.validUntil)}*.\n\n🔔 The next payment ${ended ? 'was due' : 'is due'} on *${pretty(due)}*${day ? ` — the ${ordinal(day)} of each month.` : '.'}\n\nYou can pay via Whish${wallet}, or cash at the centre.\n\nThank you! 🤖`;
  }

  const visible = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return rows
      .filter(r => act === 'all' || (r.activity ?? 'robotics') === act)
      .filter(r => pay === 'all' || statusOf(r).key === pay)
      .filter(r => !needle || [r.childName, r.parentName, r.parentPhone, r.parentEmail, classOf(r)]
        .some(v => (v || '').toLowerCase().includes(needle)));
  }, [rows, q, act, pay]);

  const stats = useMemo(() => {
    const c = { active: 0, expiring: 0, expired: 0, none: 0, collected: 0 };
    for (const r of rows) {
      c[statusOf(r).key]++;
      for (const p of r.feePayments ?? []) c.collected += p.amount || 0;
    }
    return { ...c, total: rows.length };
  }, [rows]);

  function exportCsv() {
    const esc = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const tel = (v?: string) => (v ? `"=""${String(v).replace(/"/g, '')}"""` : '""');
    const head = ['Student', 'Registered on', 'Class', 'Parent', 'WhatsApp', 'Email', 'Payment status',
      'Last amount', 'Paid on', 'Valid until', 'Method', 'Total paid', 'Date of birth', 'Notes'];
    const lines = [head.map(esc).join(',')];
    for (const r of visible) {
      const st = statusOf(r); const l = latest(r);
      const total = (r.feePayments ?? []).reduce((n, p) => n + (p.amount || 0), 0);
      lines.push([
        esc(r.childName), esc((r.createdAt || '').slice(0, 10)), esc(classOf(r)),
        esc(r.parentName), tel(r.parentPhone), esc(r.parentEmail),
        esc(STATUS[st.key].label), esc(l?.amount ?? ''), esc(l?.paidAt ?? ''), esc(l?.validUntil ?? ''),
        esc(l?.method ?? ''), esc(total), esc(r.dob ?? ''), esc(r.notes ?? ''),
      ].join(','));
    }
    const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `RoboHolic-students-${settings.yearLabel || '2026-2027'}-${today()}.csv`;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  return (
    <>
      <div className="no-print"><Navbar /></div>
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <div className="no-print">
          <SectionHeader badge="🎓 Students"
            title={`My students ${settings.yearLabel || '2026–2027'}`}
            subtitle="Every registered child: when they signed up, their class, their parents' contacts — and the fees. A payment is valid until the same day next month, minus one day." />
        </div>

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 mb-5 no-print">
            <div className="relative flex-1 min-w-[200px] max-w-xs">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-300" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search a child, parent or number…"
                className="w-full pl-8 pr-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
            </div>
            <button onClick={() => void load()} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
            {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> saving…</span>}
            <div className="ml-auto flex items-center gap-2">
              <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden text-xs font-bold bg-white">
                <button onClick={() => setView('simple')} className={`px-3 py-2 ${view === 'simple' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Simple</button>
                <button onClick={() => setView('table')} className={`px-3 py-2 ${view === 'table' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Table</button>
              </div>
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
          {/* Add a student by hand (walk-in / phone registration) */}
          <div className="mb-5 no-print">
            {!adding ? (
              <button onClick={() => { setAdding(true); setError(''); }}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-bold text-white"
                style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
                <UserPlus size={16} /> Add a student
              </button>
            ) : (
              <div className="bg-white rounded-2xl border-2 border-blue-200 p-5">
                <h3 className="font-black text-gray-900 mb-3 flex items-center gap-2"><UserPlus size={17} className="text-blue-600" /> Add a student</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Child&apos;s name *</label>
                    <input value={nf.childName} onChange={e => setNf({ ...nf, childName: e.target.value })} autoFocus
                      placeholder="e.g. Sami Khoury" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Date of birth</label>
                    <input type="date" value={nf.dob} onChange={e => setNf({ ...nf, dob: e.target.value })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Class</label>
                    <select value={nf.activity} onChange={e => setNf({ ...nf, activity: e.target.value, slotId: '' })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                      {ACTIVITIES.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Branch</label>
                    <select value={nf.branch} onChange={e => setNf({ ...nf, branch: e.target.value, slotId: '' })}
                      className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm bg-white">
                      {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
                    </select>
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1">Day &amp; time</label>
                    <div className="flex flex-wrap gap-2">
                      {newSlots.length === 0 ? (
                        <span className="text-xs text-gray-400">No times for that class at this branch — it will be saved without a time.</span>
                      ) : newSlots.map(s => (
                        <button key={s.id} type="button" onClick={() => setNf({ ...nf, slotId: s.id })}
                          className={`px-3 py-2 rounded-xl border-2 text-xs font-bold ${nf.slotId === s.id ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-600 hover:border-gray-300'}`}>
                          {s.day} · {s.time}{s.note ? ` (${s.note})` : ''}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">Parent&apos;s name</label>
                    <input value={nf.parentName} onChange={e => setNf({ ...nf, parentName: e.target.value })}
                      placeholder="Parent name" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-600 mb-1">WhatsApp number</label>
                    <input value={nf.parentPhone} onChange={e => setNf({ ...nf, parentPhone: e.target.value })} inputMode="tel"
                      placeholder="70 123 456" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
                    <input value={nf.parentEmail} onChange={e => setNf({ ...nf, parentEmail: e.target.value })} type="email"
                      placeholder="parent@example.com" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="block text-xs font-bold text-gray-600 mb-1">Note</label>
                    <input value={nf.notes} onChange={e => setNf({ ...nf, notes: e.target.value })}
                      placeholder="anything to remember" className="w-full px-3 py-2.5 rounded-xl border border-gray-200 text-sm" />
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <button onClick={() => void addStudent()} disabled={addBusy || !nf.childName.trim()}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-40"
                    style={{ background: '#2563EB' }}>
                    {addBusy ? <Loader2 size={14} className="animate-spin" /> : <UserPlus size={14} />} Add student
                  </button>
                  <button onClick={() => { setAdding(false); setNf({ ...EMPTY_NEW }); setError(''); }}
                    className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">Cancel</button>
                </div>
              </div>
            )}
          </div>

              {/* Stats */}
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-5">
                {[
                  { label: 'Students', value: stats.total, color: '#2563EB', icon: <Users size={16} /> },
                  { label: 'Paid', value: stats.active, color: '#16A34A', icon: <CheckCircle size={16} /> },
                  { label: 'Expiring ≤7 days', value: stats.expiring, color: '#F59E0B', icon: <CalendarClock size={16} /> },
                  { label: 'Expired', value: stats.expired, color: '#DC2626', icon: <CalendarClock size={16} /> },
                  { label: 'Collected', value: fmt(stats.collected), color: '#7C3AED', icon: <Wallet size={16} /> },
                ].map(x => (
                  <div key={x.label} className="bg-white rounded-2xl border border-gray-100 p-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center mb-2" style={{ background: x.color + '15', color: x.color }}>{x.icon}</div>
                    <div className="text-xl font-black text-gray-900">{x.value}</div>
                    <div className="text-[11px] text-gray-500">{x.label}</div>
                  </div>
                ))}
              </div>

              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-5 no-print">
                <button onClick={() => setAct('all')} className={`px-3.5 py-2 rounded-xl text-sm font-bold border-2 ${act === 'all' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-600'}`}>All classes</button>
                {ACTIVITIES.map(a => {
                  const n = rows.filter(r => (r.activity ?? 'robotics') === a.id).length;
                  const on = act === a.id;
                  return (
                    <button key={a.id} onClick={() => setAct(a.id)}
                      className={`px-3.5 py-2 rounded-xl text-sm font-bold border-2 ${on ? 'text-white' : 'bg-white text-gray-600 border-gray-200'}`}
                      style={on ? { background: a.color, borderColor: a.color } : {}}>{a.emoji} {a.short} ({n})</button>
                  );
                })}
                <span className="w-px bg-gray-200 mx-1" />
                {(['all', 'active', 'expiring', 'expired', 'none'] as const).map(k => (
                  <button key={k} onClick={() => setPay(k)}
                    className={`px-3.5 py-2 rounded-xl text-sm font-bold border-2 ${pay === k ? 'text-white' : 'bg-white text-gray-600 border-gray-200'}`}
                    style={pay === k ? (k === 'all' ? { background: '#111827', borderColor: '#111827' } : { background: STATUS[k].color, borderColor: STATUS[k].color }) : {}}>
                    {k === 'all' ? 'Any payment' : `${STATUS[k].label} (${stats[k]})`}
                  </button>
                ))}
              </div>

              {/* The sheet */}
              {visible.length === 0 ? (
                <div className="text-center py-16 text-gray-400">
                  <Users size={32} className="mx-auto mb-2 opacity-40" />
                  <p className="text-sm">No students match this filter.</p>
                </div>
              ) : (
                view === 'simple' ? (
                /* ─── Simple view: one card per child ─── */
                <div className="space-y-3">
                  {visible.map(r => {
                    const st = statusOf(r); const l = latest(r); const S = STATUS[st.key];
                    const open = openId === r.id;
                    const draft = open ? draftPayment() : null;
                    const paidCount = (r.feePayments ?? []).length;
                    return (
                      <div key={r.id} className="bg-white rounded-2xl border-2 p-4" style={{ borderColor: open ? '#93C5FD' : '#F3F4F6' }}>
                        <div className="flex items-start gap-3 flex-wrap">
                          <div className="w-11 h-11 rounded-xl flex items-center justify-center text-white font-black shrink-0"
                            style={{ background: S.color }}>{(r.childName || '?').trim().charAt(0).toUpperCase()}</div>
                          <div className="flex-1 min-w-[180px]">
                            <div className="font-black text-gray-900 text-lg leading-tight">{r.childName}</div>
                            <div className="text-xs text-gray-500">{classOf(r)}</div>
                            <div className="text-xs text-gray-600 mt-1.5 flex items-center gap-3 flex-wrap">
                              {r.parentName && <span>👤 {r.parentName}</span>}
                              {r.parentPhone && <a href={`https://wa.me/${waNum(r.parentPhone)}`} target="_blank" rel="noreferrer" className="text-green-600 font-semibold hover:underline">📱 {r.parentPhone}</a>}
                              {r.parentEmail && <a href={`mailto:${r.parentEmail}`} className="text-blue-600 hover:underline">✉️ {r.parentEmail}</a>}
                            </div>
                          </div>
                          <div className="text-right">
                            <span className="badge-pill text-xs font-black" style={{ background: S.bg, color: S.color }}>{S.label}</span>
                            {l && (
                              <div className="text-[11px] mt-1" style={{ color: S.color }}>
                                until {pretty(l.validUntil)}<br />{st.days >= 0 ? `${st.days} days left` : `${Math.abs(st.days)} days ago`}
                                {billingDay(r) && <><br /><span className="text-gray-400">pays the {ordinal(billingDay(r) as number)}</span></>}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-2 flex-wrap mt-3 no-print">
                          <button onClick={() => { setOpenId(open ? '' : r.id); setError(''); setForm(f => ({ ...f, amount: '', paidAt: today(), validUntil: nextValidUntil(r, today()) })); }}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#2563EB' }}>
                            <Plus size={15} /> {open ? 'Close' : 'Record payment'}
                          </button>
                          {l && r.parentPhone && (
                            <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(receiptMsg(r, l))}`}
                              target="_blank" rel="noreferrer" onClick={() => markConfirmed(r, l.id)}
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#25D366' }}>
                              <MessageCircle size={15} /> Send receipt{l.confirmedAt ? ' ✓' : ''}
                            </a>
                          )}
                          {r.parentPhone && st.key !== 'active' && (
                            <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(renewMsg(r))}`}
                              target="_blank" rel="noreferrer"
                              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#F59E0B' }}>
                              <CalendarClock size={15} /> Ask to pay
                            </a>
                          )}
                          {paidCount > 0 && (
                            <span className="text-xs text-gray-400 ml-auto">
                              {paidCount} payment{paidCount === 1 ? '' : 's'} · {fmt((r.feePayments ?? []).reduce((n, p) => n + (p.amount || 0), 0))} total
                            </span>
                          )}
                        </div>

                        {open && (
                          <div className="mt-3 pt-3 border-t border-gray-100">
                            <div className="flex flex-wrap items-end gap-2.5">
                              <label className="text-xs font-bold text-gray-600">How much?
                                <div className="flex items-center gap-1 mt-1">
                                  <span className="text-gray-400">{CUR}</span>
                                  <input type="number" inputMode="decimal" autoFocus value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                                    placeholder="100" className="w-28 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-base font-bold" />
                                </div>
                              </label>
                              {feeChips.length > 0 && (
                                <div className="flex items-center gap-1 pb-1.5 flex-wrap">
                                  {feeChips.map(([k, v]) => (
                                    <button key={k} type="button" onClick={() => setForm({ ...form, amount: String(v) })}
                                      className="px-2.5 py-2 rounded-lg text-xs font-bold text-blue-700 bg-blue-50 border border-blue-100 hover:bg-blue-100">
                                      {CUR}{v} {k}
                                    </button>
                                  ))}
                                </div>
                              )}
                              <label className="text-xs font-bold text-gray-600">How?
                                <select value={form.method} onChange={e => setForm({ ...form, method: e.target.value as 'whish' | 'cash' })}
                                  className="block mt-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm bg-white">
                                  <option value="whish">Whish</option>
                                  <option value="cash">Cash</option>
                                </select>
                              </label>
                              <label className="text-xs font-bold text-gray-600">Paid on
                                <input type="date" value={form.paidAt}
                                  onChange={e => setForm({ ...form, paidAt: e.target.value, validUntil: nextValidUntil(r, e.target.value) })}
                                  className="block mt-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm" />
                              </label>
                              <div className="text-xs font-bold text-gray-600">Valid until
                                <div className="mt-1 px-3 py-2.5 rounded-xl bg-green-50 border-2 border-green-200 text-sm font-black text-green-800 whitespace-nowrap">
                                  {pretty(form.validUntil)}
                                </div>
                                <div className="text-[11px] font-normal text-gray-500 mt-1">
                                  next payment {pretty(dueAfter(form.validUntil))}
                                  {(r.feePayments ?? []).length > 0 && <span className="text-blue-600 font-bold"> · cycle kept</span>}
                                </div>
                              </div>
                            </div>

                            <div className="flex items-center gap-2 flex-wrap mt-3">
                              <button type="button" onClick={() => addPayment(r)} disabled={saving === r.id}
                                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-gray-700 bg-gray-100 hover:bg-gray-200 disabled:opacity-50">
                                {saving === r.id ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />} Save only
                              </button>
                              {draft && r.parentPhone ? (
                                <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(receiptMsg(r, draft))}`}
                                  target="_blank" rel="noreferrer" onClick={() => addPayment(r)}
                                  className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-black text-white" style={{ background: '#25D366' }}>
                                  <MessageCircle size={16} /> Save &amp; send payment received
                                </a>
                              ) : (
                                <span className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-black text-gray-300 bg-gray-50"
                                  title={r.parentPhone ? 'Enter the amount first' : 'No WhatsApp number on file'}>
                                  <MessageCircle size={16} /> Save &amp; send payment received
                                </span>
                              )}
                            </div>

                            {paidCount > 0 && (
                              <div className="mt-3 space-y-1">
                                {(r.feePayments ?? []).slice().sort((a, b) => (b.paidAt || '').localeCompare(a.paidAt || '')).map(p => (
                                  <div key={p.id} className="flex items-center gap-2 text-xs bg-gray-50 rounded-lg px-3 py-1.5 flex-wrap">
                                    <span className="font-bold text-gray-900">{fmt(p.amount)}</span>
                                    <span className="text-gray-500">{p.method === 'whish' ? 'Whish' : 'cash'} · paid {pretty(p.paidAt)} → valid to {pretty(p.validUntil)}</span>
                                    {p.confirmedAt && <span className="badge-pill bg-green-50 text-green-700 text-[10px]">sent ✓</span>}
                                    <button onClick={() => removePayment(r, p.id)} className="ml-auto p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50"><Trash2 size={12} /></button>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
                          <th className="px-3 py-2.5 font-bold">Student</th>
                          <th className="px-3 py-2.5 font-bold">Registered</th>
                          <th className="px-3 py-2.5 font-bold">Class</th>
                          <th className="px-3 py-2.5 font-bold">Parent</th>
                          <th className="px-3 py-2.5 font-bold">WhatsApp</th>
                          <th className="px-3 py-2.5 font-bold">Email</th>
                          <th className="px-3 py-2.5 font-bold">Paid</th>
                          <th className="px-3 py-2.5 font-bold">Valid until</th>
                          <th className="px-3 py-2.5 font-bold no-print">Receipt</th>
                          <th className="px-3 py-2.5 font-bold no-print"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {visible.map(r => {
                          const st = statusOf(r); const l = latest(r); const S = STATUS[st.key];
                          const open = openId === r.id;
                          return (
                            <Fragment key={r.id}>
                              <tr className="border-t border-gray-50 hover:bg-blue-50/30 align-top">
                                <td className="px-3 py-2.5">
                                  <div className="font-bold text-gray-900 whitespace-nowrap">{r.childName}</div>
                                  {r.dob && <div className="text-[11px] text-gray-400">DOB {r.dob}</div>}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap text-gray-600 text-xs">{pretty((r.createdAt || '').slice(0, 10))}</td>
                                <td className="px-3 py-2.5 text-xs text-gray-700 min-w-[180px]">{classOf(r)}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap text-gray-700">{r.parentName || <span className="text-gray-300">—</span>}</td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                  {r.parentPhone
                                    ? <a href={`https://wa.me/${waNum(r.parentPhone)}`} target="_blank" rel="noreferrer" className="text-green-600 font-semibold hover:underline">{r.parentPhone}</a>
                                    : <span className="text-gray-300">—</span>}
                                </td>
                                <td className="px-3 py-2.5">
                                  {r.parentEmail
                                    ? <a href={`mailto:${r.parentEmail}`} className="text-blue-600 hover:underline break-all text-xs">{r.parentEmail}</a>
                                    : <span className="text-gray-300">—</span>}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                  {l ? <>
                                    <span className="font-bold text-gray-900">{fmt(l.amount)}</span>
                                    <div className="text-[11px] text-gray-400">{pretty(l.paidAt)} · {l.method === 'whish' ? 'Whish' : 'cash'}</div>
                                  </> : <span className="text-gray-300">—</span>}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap">
                                  <span className="badge-pill text-[10px] font-bold" style={{ background: S.bg, color: S.color }}>{S.label}</span>
                                  {l && <div className="text-[11px] mt-0.5" style={{ color: S.color }}>
                                    {pretty(l.validUntil)}{st.days >= 0 ? ` · ${st.days}d left` : ` · ${Math.abs(st.days)}d ago`}
                                  </div>}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap no-print">
                                  {!r.parentPhone ? <span className="text-[11px] text-gray-300">no phone</span>
                                    : l && st.key !== 'expired' ? (
                                      <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(receiptMsg(r, l))}`}
                                        target="_blank" rel="noreferrer" onClick={() => markConfirmed(r, l.id)} title="Send the parent a payment confirmation"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white" style={{ background: '#25D366' }}>
                                        <MessageCircle size={11} /> Confirm{l.confirmedAt ? ' ✓' : ''}
                                      </a>
                                    ) : (
                                      <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(renewMsg(r))}`}
                                        target="_blank" rel="noreferrer" title="Ask the parent to pay / renew"
                                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white" style={{ background: '#F59E0B' }}>
                                        <CalendarClock size={11} /> Remind
                                      </a>
                                    )}
                                </td>
                                <td className="px-3 py-2.5 whitespace-nowrap no-print">
                                  <button onClick={() => { setOpenId(open ? '' : r.id); setError(''); setForm(f => ({ ...f, paidAt: today(), validUntil: validUntilFor(today()) })); }}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-blue-700 bg-blue-50 hover:bg-blue-100">
                                    {open ? <ChevronDown size={12} /> : <ChevronRight size={12} />} Payment
                                  </button>
                                </td>
                              </tr>

                              {open && (
                                <tr className="bg-blue-50/40 border-t border-blue-100 no-print">
                                  <td colSpan={10} className="px-4 py-4">
                                    <div className="font-bold text-gray-800 text-sm mb-2">Add a payment for {r.childName}</div>
                                    <div className="flex flex-wrap items-end gap-2.5 mb-2">
                                      <label className="text-xs font-semibold text-gray-600">Amount
                                        <div className="flex items-center gap-1 mt-1">
                                          <span className="text-gray-400 text-sm">{CUR}</span>
                                          <input type="number" inputMode="decimal" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                                            placeholder="100" className="w-24 px-2 py-2 rounded-lg border border-gray-200 text-sm" />
                                        </div>
                                      </label>
                                      {feeChips.length > 0 && (
                                        <div className="flex items-center gap-1 pb-1 flex-wrap">
                                          {feeChips.map(([k, v]) => (
                                            <button key={k} type="button" onClick={() => setForm({ ...form, amount: String(v) })}
                                              className="px-2 py-1.5 rounded-lg text-[11px] font-bold text-blue-700 bg-white border border-blue-200 hover:bg-blue-50">
                                              {CUR}{v} {k}
                                            </button>
                                          ))}
                                        </div>
                                      )}
                                      <label className="text-xs font-semibold text-gray-600">Method
                                        <select value={form.method} onChange={e => setForm({ ...form, method: e.target.value as 'whish' | 'cash' })}
                                          className="block mt-1 px-2 py-2 rounded-lg border border-gray-200 text-sm bg-white">
                                          <option value="whish">Whish</option>
                                          <option value="cash">Cash</option>
                                        </select>
                                      </label>
                                      <label className="text-xs font-semibold text-gray-600">Date of payment
                                        <input type="date" value={form.paidAt}
                                          onChange={e => setForm({ ...form, paidAt: e.target.value, validUntil: nextValidUntil(r, e.target.value) })}
                                          className="block mt-1 px-2 py-2 rounded-lg border border-gray-200 text-sm" />
                                      </label>
                                      <div className="text-xs font-semibold text-gray-600">Valid until <span className="font-normal text-gray-400">(automatic)</span>
                                        <div className="mt-1 px-3 py-2 rounded-lg bg-green-50 border border-green-200 text-sm font-bold text-green-800">
                                          {pretty(form.validUntil)}
                                        </div>
                                      </div>
                                      <input value={form.note} onChange={e => setForm({ ...form, note: e.target.value })} placeholder="note (optional)"
                                        className="flex-1 min-w-[120px] px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                                      <button type="button" onClick={() => addPayment(r)} disabled={saving === r.id}
                                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white disabled:opacity-50" style={{ background: '#2563EB' }}>
                                        <Plus size={14} /> Add payment
                                      </button>
                                    </div>
                                    <p className="text-[11px] text-gray-400 mb-3">
                                      The validity is worked out for you: paid {pretty(form.paidAt)} → valid to the same day next month minus one day.
                                    </p>

                                    {(r.feePayments ?? []).length === 0 ? (
                                      <p className="text-xs text-gray-400">No payments recorded yet.</p>
                                    ) : (
                                      <div className="space-y-1">
                                        <div className="text-[11px] font-bold text-gray-500 uppercase tracking-wide">Payment history</div>
                                        {(r.feePayments ?? []).slice().sort((a, b) => (b.paidAt || '').localeCompare(a.paidAt || '')).map(p => (
                                          <div key={p.id} className="flex items-center gap-2 text-xs bg-white rounded-lg border border-gray-100 px-3 py-2 flex-wrap">
                                            <span className="font-bold text-gray-900">{fmt(p.amount)}</span>
                                            <span className={`badge-pill text-[10px] ${p.method === 'whish' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>
                                              {p.method === 'whish' ? <Wallet size={9} className="inline" /> : <Banknote size={9} className="inline" />} {p.method === 'whish' ? 'Whish' : 'cash'}
                                            </span>
                                            <span className="text-gray-500">paid {pretty(p.paidAt)}</span>
                                            <span className="text-gray-400">→</span>
                                            <span className="font-semibold text-gray-700">valid to {pretty(p.validUntil)}</span>
                                            {p.note && <span className="text-gray-400 italic truncate max-w-[140px]">{p.note}</span>}
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
                    {visible.length} student{visible.length === 1 ? '' : 's'} · click <b>Payment</b> to record an amount — the validity is filled in automatically · <b>Confirm</b> sends the parent a WhatsApp receipt, <b>Remind</b> chases an expired one.
                  </p>
                </div>
              )
              )}
            </>
          )}
        </div>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
