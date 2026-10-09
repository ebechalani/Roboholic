'use client';

import { Fragment, useCallback, useEffect, useMemo, useState } from 'react';
import { collection, getDocs, doc, updateDoc, addDoc, deleteDoc } from 'firebase/firestore';
import {
  Loader2, RefreshCw, Users, MessageCircle, Mail, Printer, Download, Search,
  Plus, Trash2, CheckCircle, CalendarClock, ChevronDown, ChevronRight, Wallet, Banknote, UserPlus, Pencil,
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
/** 'YYYY-MM' for a date. */
const monthOf = (d: string) => (d || '').slice(0, 7);
const thisMonth = () => monthOf(today());
/** 'October 2026' */
const monthLabel = (m: string) => {
  const d = new Date(m + '-01T12:00:00');
  return isNaN(d.getTime()) ? m : d.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' });
};
/** The academic-year months, e.g. Oct 2026 … Jun 2027. */
function monthsBetween(start: string, end: string): string[] {
  const out: string[] = [];
  const a = new Date((start || '') + 'T12:00:00');
  const b = new Date((end || '') + 'T12:00:00');
  if (isNaN(a.getTime()) || isNaN(b.getTime()) || b < a) return out;
  const cur = new Date(a.getFullYear(), a.getMonth(), 1);
  const last = new Date(b.getFullYear(), b.getMonth(), 1);
  while (cur <= last && out.length < 24) {
    out.push(`${cur.getFullYear()}-${String(cur.getMonth() + 1).padStart(2, '0')}`);
    cur.setMonth(cur.getMonth() + 1);
  }
  return out;
}
/** Day of the month a family is expected to pay, within a given month. */
function expectedDate(r: Registration, month: string): string {
  const day = billingDay(r) ?? new Date((r.createdAt || today()) + '').getDate();
  if (!day || isNaN(day)) return '';
  const first = new Date(month + '-01T12:00:00');
  if (isNaN(first.getTime())) return '';
  const lastDay = new Date(first.getFullYear(), first.getMonth() + 1, 0).getDate();
  return `${month}-${String(Math.min(day, lastDay)).padStart(2, '0')}`;
}
/** Payments actually received during a month. */
const paymentsIn = (r: Registration, month: string) =>
  (r.feePayments ?? []).filter(p => monthOf(p.paidAt) === month).sort((a, b) => (a.paidAt || '').localeCompare(b.paidAt || ''));

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
  const [view, setView] = useState<'monthly' | 'simple' | 'table'>('monthly');
  const [month, setMonth] = useState(thisMonth());
  // Per-row date/method chosen before pressing Mark paid.
  const [payDate, setPayDate] = useState<Record<string, string>>({});
  const [payHow, setPayHow] = useState<Record<string, 'whish' | 'cash'>>({});
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

  /** The default fee for a child, from the per-activity fees in Settings. */
  const defaultFee = (r: Registration) => (settings.fees || {})[r.activity ?? 'robotics'] || 0;
  /** The fee actually charged: the child's own, else the activity default. */
  const feeOf = (r: Registration) => r.monthlyFee ?? defaultFee(r);

  async function saveFee(r: Registration, monthlyFee: number | undefined) {
    setRows(prev => prev.map(x => x.id === r.id ? { ...x, monthlyFee } : x));
    try { await updateDoc(doc(db, 'registrations', r.id), { monthlyFee: monthlyFee ?? null }); }
    catch { setError('Could not save the fee — try again.'); void load(); }
  }

  /** Record this month's fee on the date you choose, extending their cycle. */
  async function recordMonth(r: Registration, when?: string, how?: 'whish' | 'cash') {
    const amount = feeOf(r);
    if (!amount) { setError(`Set a monthly fee for ${r.childName} first.`); return; }
    const paidAt = when || payDate[r.id] || today();
    const rec: PaymentRecord = {
      id: `p${Date.now()}${Math.floor(Math.random() * 1000)}`,
      amount, method: how || (payHow[r.id] ?? 'whish'), paidAt, validUntil: validUntilFor(paidAt),
    };
    await savePayments(r, [...(r.feePayments ?? []), rec]);
  }

  /**
   * Correct the date a payment was received. The payment that anchors the
   * family's cycle also moves its validity, so the fixed payment day follows
   * the correction; later payments keep the agreed cycle.
   */
  async function updatePaidDate(r: Registration, paymentId: string, paidAt: string) {
    if (!paidAt) return;
    const next = (r.feePayments ?? []).map(p =>
      p.id === paymentId ? { ...p, paidAt, validUntil: validUntilFor(paidAt) } : p);
    await savePayments(r, next);
  }

  /** Correct how a payment was made. */
  async function updatePaidMethod(r: Registration, paymentId: string, method: 'whish' | 'cash') {
    await savePayments(r, (r.feePayments ?? []).map(p => p.id === paymentId ? { ...p, method } : p));
  }

  // ── Edit / delete a student record ──
  const [editId, setEditId] = useState('');
  const [editBusy, setEditBusy] = useState(false);
  const [ef, setEf] = useState({ ...EMPTY_NEW });

  function startEdit(r: Registration) {
    setEditId(r.id); setError('');
    setEf({
      childName: r.childName || '', dob: r.dob || '',
      activity: r.activity ?? 'robotics', branch: r.branch || 'jdeideh', slotId: r.slotId || '',
      parentName: r.parentName || '', parentPhone: r.parentPhone || '', parentEmail: r.parentEmail || '',
      notes: r.notes || '',
    });
  }

  async function saveEdit(r: Registration) {
    const name = ef.childName.trim();
    if (!name) { setError('The child needs a name.'); return; }
    setEditBusy(true); setError('');
    const a = activityById(ef.activity); const b = branchById(ef.branch);
    const slot = b && a ? a.slots(b).find(x => x.id === ef.slotId) : undefined;
    const patch = {
      childName: name, dob: ef.dob || '',
      activity: ef.activity as 'robotics' | 'drawing' | 'muaythai',
      activityName: a?.name ?? '', branch: ef.branch, branchName: b?.name ?? '',
      slotId: ef.slotId, slotLabel: slot ? slotLabel(slot) : '',
      parentName: ef.parentName.trim(), parentPhone: ef.parentPhone.trim(), parentEmail: ef.parentEmail.trim(),
      notes: ef.notes.trim(),
    };
    try {
      await updateDoc(doc(db, 'registrations', r.id), patch);
      setRows(prev => prev.map(x => x.id === r.id ? { ...x, ...patch } : x)
        .sort((x, y) => (x.childName || '').localeCompare(y.childName || '')));
      setEditId('');
    } catch {
      setError('Could not save the changes — try again.');
    } finally { setEditBusy(false); }
  }

  /** Remove a student and everything recorded against them. Asks first. */
  async function deleteStudent(r: Registration) {
    const n = (r.feePayments ?? []).length;
    const msg = `Delete ${r.childName} from the ${settings.yearLabel || '2026–2027'} list?`
      + (n ? `\n\nTheir ${n} recorded payment${n === 1 ? '' : 's'} will be deleted too.` : '')
      + '\n\nThis cannot be undone.';
    if (!window.confirm(msg)) return;
    setEditBusy(true); setError('');
    try {
      await deleteDoc(doc(db, 'registrations', r.id));
      setRows(prev => prev.filter(x => x.id !== r.id));
      setEditId('');
    } catch {
      setError('Could not delete the student — try again.');
    } finally { setEditBusy(false); }
  }

  /** Shared edit form for a student record (used by both views). */
  function EditPanel({ r }: { r: Registration }) {
    const slots = (() => {
      const b = branchById(ef.branch); const a = activityById(ef.activity);
      return b && a ? a.slots(b) : [];
    })();
    return (
      <div className="rounded-xl border-2 border-amber-200 bg-amber-50 p-4">
        <div className="font-black text-gray-900 mb-3 flex items-center gap-2"><Pencil size={15} className="text-amber-600" /> Edit {r.childName}</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Child&apos;s name *</label>
            <input value={ef.childName} onChange={e => setEf({ ...ef, childName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Date of birth</label>
            <input type="date" value={ef.dob} onChange={e => setEf({ ...ef, dob: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Class</label>
            <select value={ef.activity} onChange={e => setEf({ ...ef, activity: e.target.value, slotId: '' })}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
              {ACTIVITIES.map(a => <option key={a.id} value={a.id}>{a.emoji} {a.name}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Branch</label>
            <select value={ef.branch} onChange={e => setEf({ ...ef, branch: e.target.value, slotId: '' })}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white">
              {BRANCHES.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1">Day &amp; time</label>
            <div className="flex flex-wrap gap-2">
              {slots.length === 0 ? <span className="text-xs text-gray-400">No times for that class at this branch.</span>
                : slots.map(sl => (
                  <button key={sl.id} type="button" onClick={() => setEf({ ...ef, slotId: sl.id })}
                    className={`px-3 py-1.5 rounded-xl border-2 text-xs font-bold ${ef.slotId === sl.id ? 'border-amber-500 bg-white text-amber-700' : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'}`}>
                    {sl.day} · {sl.time}{sl.note ? ` (${sl.note})` : ''}
                  </button>
                ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">Parent&apos;s name</label>
            <input value={ef.parentName} onChange={e => setEf({ ...ef, parentName: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white" />
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-1">WhatsApp number</label>
            <input value={ef.parentPhone} onChange={e => setEf({ ...ef, parentPhone: e.target.value })} inputMode="tel"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1">Email</label>
            <input value={ef.parentEmail} onChange={e => setEf({ ...ef, parentEmail: e.target.value })} type="email"
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white" />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-gray-600 mb-1">Note</label>
            <input value={ef.notes} onChange={e => setEf({ ...ef, notes: e.target.value })}
              className="w-full px-3 py-2 rounded-xl border border-gray-200 text-sm bg-white" />
          </div>
        </div>
        <div className="flex items-center gap-2 mt-4 flex-wrap">
          <button onClick={() => void saveEdit(r)} disabled={editBusy || !ef.childName.trim()}
            className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: '#2563EB' }}>
            {editBusy ? <Loader2 size={14} className="animate-spin" /> : <CheckCircle size={14} />} Save changes
          </button>
          <button onClick={() => { setEditId(''); setError(''); }}
            className="px-4 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-white border border-gray-200 hover:bg-gray-50">Cancel</button>
          <button onClick={() => void deleteStudent(r)} disabled={editBusy}
            className="ml-auto inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-red-600 bg-white border-2 border-red-200 hover:bg-red-50 disabled:opacity-40">
            <Trash2 size={14} /> Delete this student
          </button>
        </div>
        {(r.feePayments ?? []).length > 0 && (
          <p className="text-[11px] text-red-600 mt-2">
            Deleting removes {r.childName} and their {(r.feePayments ?? []).length} recorded payment{(r.feePayments ?? []).length === 1 ? '' : 's'}. This cannot be undone.
          </p>
        )}
      </div>
    );
  }

  // The months of the academic year (falls back to a 9-month year from today).
  const months = useMemo(() => {
    const fromSettings = monthsBetween(settings.yearStart || '', settings.yearEnd || '');
    if (fromSettings.length) return fromSettings;
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    const out: string[] = [];
    for (let i = 0; i < 10; i++) {
      out.push(`${start.getFullYear()}-${String(start.getMonth() + 1).padStart(2, '0')}`);
      start.setMonth(start.getMonth() + 1);
    }
    return out;
  }, [settings.yearStart, settings.yearEnd]);

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
      validUntil: form.validUntil || validUntilFor(paidAt),
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

  // Expected vs collected for the selected month, across the visible students.
  const monthTotals = useMemo(() => {
    let expected = 0, collected = 0;
    for (const r of visible) {
      expected += r.monthlyFee ?? ((settings.fees || {})[r.activity ?? 'robotics'] || 0);
      for (const p of paymentsIn(r, month)) collected += p.amount || 0;
    }
    return { expected, collected, outstanding: Math.max(0, expected - collected) };
  }, [visible, month, settings.fees]);

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
            {view === 'monthly' && (
              <select value={month} onChange={e => setMonth(e.target.value)}
                className="px-3 py-2.5 rounded-xl border-2 border-blue-200 bg-white text-sm font-bold text-gray-800">
                {months.map(m => <option key={m} value={m}>{monthLabel(m)}</option>)}
              </select>
            )}
            <button onClick={() => void load()} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
            {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> saving…</span>}
            <div className="ml-auto flex items-center gap-2">
              <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden text-xs font-bold bg-white">
                <button onClick={() => setView('monthly')} className={`px-3 py-2 ${view === 'monthly' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>Monthly</button>
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
                view === 'monthly' ? (
                /* ─── Monthly ledger: fees, totals and the expected paying date ─── */
                <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm border-collapse">
                      <thead>
                        <tr className="bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
                          <th className="px-3 py-2.5 font-bold">Student</th>
                          <th className="px-3 py-2.5 font-bold">Class</th>
                          <th className="px-3 py-2.5 font-bold">Monthly fee</th>
                          <th className="px-3 py-2.5 font-bold">Expected on</th>
                          <th className="px-3 py-2.5 font-bold">Paid</th>
                          <th className="px-3 py-2.5 font-bold">Valid until</th>
                          <th className="px-3 py-2.5 font-bold no-print">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {visible.map(r => {
                          const fee = feeOf(r);
                          const due = expectedDate(r, month);
                          const paid = paymentsIn(r, month);
                          const paidTotal = paid.reduce((n, p) => n + (p.amount || 0), 0);
                          const late = !paid.length && due && due < today();
                          const isPaid = paid.length > 0;
                          return (
                            <tr key={r.id} className={`border-t align-top ${isPaid ? 'bg-green-50 hover:bg-green-100/70 border-green-100' : 'border-gray-50 hover:bg-blue-50/30'}`}>
                              <td className="px-3 py-2.5">
                                <div className="font-bold text-gray-900 whitespace-nowrap">{r.childName}</div>
                                {r.parentName && <div className="text-[11px] text-gray-400">{r.parentName}</div>}
                              </td>
                              <td className="px-3 py-2.5 text-xs text-gray-600 min-w-[150px]">{classOf(r)}</td>
                              <td className="px-3 py-2.5 whitespace-nowrap">
                                <span className="inline-flex items-center gap-1">
                                  <span className="text-gray-400 text-xs">{CUR}</span>
                                  <input type="number" inputMode="decimal" key={`fee-${r.id}`} defaultValue={r.monthlyFee ?? ''}
                                    placeholder={String(defaultFee(r) || '')}
                                    onBlur={e => { const v = parseFloat(e.target.value); const next = isNaN(v) || v <= 0 ? undefined : v; if (next !== (r.monthlyFee ?? undefined)) void saveFee(r, next); }}
                                    className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 text-sm no-print" />
                                  <span className="hidden print:inline text-sm">{fee || '—'}</span>
                                </span>
                              </td>
                              <td className="px-3 py-2.5 whitespace-nowrap">
                                {due ? (
                                  <span className={late ? 'text-red-600 font-bold' : 'text-gray-700'}>
                                    {pretty(due)}{late && <div className="text-[11px]">overdue</div>}
                                  </span>
                                ) : <span className="text-gray-300">—</span>}
                              </td>
                              <td className="px-3 py-2.5 whitespace-nowrap">
                                {paid.length ? (
                                  <>
                                    <span className="font-bold text-green-700 inline-flex items-center gap-1"><CheckCircle size={12} /> {fmt(paidTotal)}</span>
                                    {paid.map(p => (
                                      <div key={p.id} className="flex items-center gap-1 mt-0.5">
                                        <input type="date" value={p.paidAt} title="Change the date this was paid"
                                          onChange={e => void updatePaidDate(r, p.id, e.target.value)}
                                          className="text-[11px] px-1.5 py-0.5 rounded-md border border-gray-200 bg-white no-print" />
                                        <select value={p.method} onChange={e => void updatePaidMethod(r, p.id, e.target.value as 'whish' | 'cash')}
                                          className="text-[11px] px-1 py-0.5 rounded-md border border-gray-200 bg-white no-print">
                                          <option value="whish">Whish</option>
                                          <option value="cash">Cash</option>
                                        </select>
                                        <span className="hidden print:inline text-[11px] text-gray-500">{pretty(p.paidAt)}</span>
                                      </div>
                                    ))}
                                  </>
                                ) : (
                                  <span className="inline-flex items-center gap-1">
                                    <span className="badge-pill bg-red-50 text-red-600 text-[10px] print:inline">not paid</span>
                                    <input type="date" value={payDate[r.id] ?? today()}
                                      onChange={e => setPayDate({ ...payDate, [r.id]: e.target.value })}
                                      title="The date the money was received"
                                      className="text-[11px] px-1.5 py-0.5 rounded-md border border-gray-200 bg-white no-print" />
                                    <select value={payHow[r.id] ?? 'whish'} onChange={e => setPayHow({ ...payHow, [r.id]: e.target.value as 'whish' | 'cash' })}
                                      className="text-[11px] px-1 py-0.5 rounded-md border border-gray-200 bg-white no-print">
                                      <option value="whish">Whish</option>
                                      <option value="cash">Cash</option>
                                    </select>
                                  </span>
                                )}
                              </td>
                              <td className="px-3 py-2.5 whitespace-nowrap text-xs">
                                {paid.length ? <span className="text-gray-700">{pretty(paid[paid.length - 1].validUntil)}</span> : <span className="text-gray-300">—</span>}
                              </td>
                              <td className="px-3 py-2.5 whitespace-nowrap no-print">
                                {paid.length ? (
                                  r.parentPhone && (
                                    <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(receiptMsg(r, paid[paid.length - 1]))}`}
                                      target="_blank" rel="noreferrer" onClick={() => markConfirmed(r, paid[paid.length - 1].id)}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white" style={{ background: '#25D366' }}>
                                      <MessageCircle size={11} /> Receipt
                                    </a>
                                  )
                                ) : (
                                  <button onClick={() => void recordMonth(r)} disabled={saving === r.id || !fee}
                                    title={fee ? `Record ${fmt(fee)} for ${monthLabel(month)}` : 'Set the monthly fee first'}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-white disabled:opacity-40" style={{ background: '#2563EB' }}>
                                    {saving === r.id ? <Loader2 size={11} className="animate-spin" /> : <Plus size={11} />} Mark paid
                                  </button>
                                )}
                                <button onClick={() => (editId === r.id ? setEditId('') : startEdit(r))} title="Edit or delete this student"
                                  className="ml-1 p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50"><Pencil size={13} /></button>
                              </td>
                            </tr>
                          );
                        })}
                        {visible.filter(r => r.id === editId).map(r => (
                          <tr key={`edit-${r.id}`} className="bg-amber-50/40 border-t border-amber-100 no-print">
                            <td colSpan={7} className="px-4 py-4"><EditPanel r={r} /></td>
                          </tr>
                        ))}
                      </tbody>
                      <tfoot>
                        <tr className="bg-gray-50 border-t-2 border-gray-200 font-black text-gray-900">
                          <td className="px-3 py-3" colSpan={2}>Totals — {monthLabel(month)}</td>
                          <td className="px-3 py-3 whitespace-nowrap">{fmt(monthTotals.expected)}<div className="text-[10px] font-normal text-gray-400">expected</div></td>
                          <td className="px-3 py-3"></td>
                          <td className="px-3 py-3 whitespace-nowrap text-green-700">{fmt(monthTotals.collected)}<div className="text-[10px] font-normal text-gray-400">collected</div></td>
                          <td className="px-3 py-3 whitespace-nowrap text-red-600">{fmt(monthTotals.outstanding)}<div className="text-[10px] font-normal text-gray-400">outstanding</div></td>
                          <td className="px-3 py-3 no-print"></td>
                        </tr>
                      </tfoot>
                    </table>
                  </div>
                  <p className="text-[11px] text-gray-400 px-3 py-2.5 border-t border-gray-50 no-print">
                    Type each child&apos;s monthly fee once — it is remembered. <b>Mark paid</b> records that fee for {monthLabel(month)} and extends the validity by a month, keeping their payment day fixed.
                  </p>
                </div>
              ) :
                view === 'simple' ? (
                /* ─── Simple view: one card per child ─── */
                <div className="space-y-3">
                  {visible.map(r => {
                    const st = statusOf(r); const l = latest(r); const S = STATUS[st.key];
                    const open = openId === r.id;
                    const draft = open ? draftPayment() : null;
                    const paidCount = (r.feePayments ?? []).length;
                    return (
                      <div key={r.id} className="rounded-2xl border-2 p-4"
                        style={{ borderColor: open ? '#93C5FD' : st.key === 'active' ? '#BBF7D0' : '#F3F4F6', background: st.key === 'active' ? '#F0FDF4' : '#FFFFFF' }}>
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
                          <button onClick={() => { setOpenId(open ? '' : r.id); setError(''); setForm(f => ({ ...f, amount: '', paidAt: today(), validUntil: validUntilFor(today()) })); }}
                            className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#2563EB' }}>
                            <Plus size={15} /> {open ? 'Close' : 'Record payment'}
                          </button>
                          <button onClick={() => (editId === r.id ? setEditId('') : startEdit(r))}
                            className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200">
                            <Pencil size={14} /> Edit
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

                        {editId === r.id && <div className="mt-3"><EditPanel r={r} /></div>}

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
                                  onChange={e => setForm({ ...form, paidAt: e.target.value, validUntil: validUntilFor(e.target.value) })}
                                  className="block mt-1 px-3 py-2.5 rounded-xl border-2 border-gray-200 text-sm" />
                              </label>
                              <div className="text-xs font-bold text-gray-600">Valid until
                                <div className="mt-1 px-3 py-2.5 rounded-xl bg-green-50 border-2 border-green-200 text-sm font-black text-green-800 whitespace-nowrap">
                                  {pretty(form.validUntil)}
                                </div>
                                <div className="text-[11px] font-normal text-gray-500 mt-1">
                                  next payment {pretty(dueAfter(form.validUntil))}
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
                                    <span className="text-gray-500">{p.method === 'whish' ? 'Whish' : 'cash'} · paid</span>
                                    <input type="date" value={p.paidAt} title="Change the date this was paid"
                                      onChange={e => void updatePaidDate(r, p.id, e.target.value)}
                                      className="text-[11px] px-1.5 py-0.5 rounded-md border border-gray-200 bg-white" />
                                    <span className="text-gray-500">→ valid to {pretty(p.validUntil)}</span>
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
                                  <button onClick={() => (editId === r.id ? setEditId('') : startEdit(r))} title="Edit or delete this student"
                                    className="ml-1 p-1.5 rounded-lg text-gray-400 hover:text-amber-600 hover:bg-amber-50"><Pencil size={12} /></button>
                                </td>
                              </tr>

                              {editId === r.id && (
                                <tr className="bg-amber-50/40 border-t border-amber-100 no-print">
                                  <td colSpan={10} className="px-4 py-4"><EditPanel r={r} /></td>
                                </tr>
                              )}

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
                                          onChange={e => setForm({ ...form, paidAt: e.target.value, validUntil: validUntilFor(e.target.value) })}
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
