'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Loader2, RefreshCw, GraduationCap, Wallet, Banknote, CheckCircle, X, Printer,
  Mail, MessageCircle, Plus, Trash2, TrendingDown, TrendingUp,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { getAllClasses, getClassStudents, setStudentPayments, setParentContact } from '@/lib/classes';
import { getExpenses, addExpense, deleteExpense } from '@/lib/finance';
import type { ClassDoc, ClassStudent, StudentPayment, Expense } from '@/types';

const MONTHS = [
  { key: '2026-07', label: 'July 2026' },
  { key: '2026-08', label: 'August 2026' },
];
const CUR = '$';
const fmt = (n: number) => `${CUR}${(n || 0).toLocaleString()}`;
const waNum = (phone?: string) => { let d = (phone || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('00')) d = d.slice(2); if (d.startsWith('961')) return d; if (d.startsWith('0')) d = d.slice(1); return '961' + d; };

type ClassRow = ClassDoc & { students: ClassStudent[] };

export default function AdminPaymentsPage() {
  return (
    <RequireRole allow={['admin']}>
      <Payments />
    </RequireRole>
  );
}

function Payments() {
  const [rows, setRows] = useState<ClassRow[]>([]);
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [month, setMonth] = useState(MONTHS[0].key);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [error, setError] = useState('');
  const [exp, setExp] = useState({ label: '', amount: '', month: '' });
  const [expBusy, setExpBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const [classes, exps] = await Promise.all([getAllClasses(), getExpenses().catch(() => [] as Expense[])]);
      const full = await Promise.all(classes.map(async c => {
        const students = await getClassStudents(c.id).catch(() => [] as ClassStudent[]);
        students.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));
        return { ...c, students };
      }));
      setRows(full); setExpenses(exps);
    } catch {
      setError('Could not load. Make sure the Firestore rules are published (expenses need the new rule).');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function save(classId: string, s: ClassStudent, payments: Record<string, StudentPayment>) {
    setSaving(s.uid); setError('');
    setRows(prev => prev.map(r => r.id === classId ? { ...r, students: r.students.map(x => x.uid === s.uid ? { ...x, payments } : x) } : r));
    try { await setStudentPayments(classId, s.uid, payments); }
    catch { setError('Could not save — check the Firestore rules and try again.'); void load(); }
    finally { setSaving(null); }
  }
  function setAmount(classId: string, s: ClassStudent, amount: number | undefined) {
    const rec: StudentPayment = { ...(s.payments?.[month] ?? {}) };
    if (amount == null) delete rec.amount; else rec.amount = amount;
    const payments = { ...(s.payments ?? {}) };
    if (rec.amount != null || rec.method) payments[month] = rec; else delete payments[month];
    void save(classId, s, payments);
  }
  function mark(classId: string, s: ClassStudent, method: 'whish' | 'cash') {
    const rec: StudentPayment = { ...(s.payments?.[month] ?? {}), method, at: new Date().toISOString() };
    void save(classId, s, { ...(s.payments ?? {}), [month]: rec });
  }
  function unmark(classId: string, s: ClassStudent) {
    const rec: StudentPayment = { ...(s.payments?.[month] ?? {}) };
    delete rec.method; delete rec.at;
    const payments = { ...(s.payments ?? {}) };
    if (rec.amount != null) payments[month] = rec; else delete payments[month];
    void save(classId, s, payments);
  }

  async function saveContact(classId: string, s: ClassStudent, patch: { parentPhone?: string; parentEmail?: string }) {
    setRows(prev => prev.map(r => r.id === classId ? { ...r, students: r.students.map(x => x.uid === s.uid ? { ...x, ...patch } : x) } : r));
    try { await setParentContact(classId, s.uid, patch); }
    catch { setError('Could not save the contact — check the connection and try again.'); void load(); }
  }
  function reminderMsg(s: ClassStudent): string {
    const first = (s.displayName || '').split(/\s+/)[0] || 'your child';
    const hi = s.parentName ? `Hello ${s.parentName}!` : 'Hello!';
    const amt = s.payments?.[month]?.amount;
    const fee = amt ? ` (${fmt(amt)})` : '';
    return `${hi} 👋\n\nThis is RoboHolic Robotics Academy — a friendly reminder about ${first}'s camp fee for ${monthLabel}${fee}.\n\nYou can pay via Whish to wallet 70227005 (Eddy Bachaalany), or cash on Wednesday. Thank you! 🤖`;
  }

  async function addExp(e: React.FormEvent) {
    e.preventDefault();
    const amount = parseFloat(exp.amount);
    if (!exp.label.trim() || isNaN(amount) || amount <= 0) return;
    setExpBusy(true);
    try {
      const created = await addExpense({ label: exp.label.trim(), amount, month: exp.month || undefined, at: new Date().toISOString() });
      setExpenses(prev => [created, ...prev]);
      setExp({ label: '', amount: '', month: '' });
    } catch { setError('Could not save the expense — check the Firestore rules.'); }
    finally { setExpBusy(false); }
  }
  async function delExp(id: string) {
    setExpenses(prev => prev.filter(x => x.id !== id));
    try { await deleteExpense(id); } catch { void load(); }
  }

  const money = useMemo(() => {
    const monthKeys = MONTHS.map(m => m.key);
    let expected = 0, collected = 0, paidCount = 0, studentCount = 0, whish = 0, cash = 0;
    let totalCollectedAll = 0, totalExpectedAll = 0;
    for (const c of rows) for (const s of c.students) {
      studentCount++;
      const p = s.payments?.[month];
      if (p?.amount) expected += p.amount;
      if (p?.method) { paidCount++; if (p.method === 'whish') whish++; else cash++; if (p.amount) collected += p.amount; }
      for (const mk of monthKeys) {
        const pm = s.payments?.[mk];
        if (pm?.amount) totalExpectedAll += pm.amount;
        if (pm?.method && pm?.amount) totalCollectedAll += pm.amount;
      }
    }
    const expensesTotal = expenses.reduce((n, e) => n + (e.amount || 0), 0);
    return { expected, collected, outstanding: expected - collected, paidCount, studentCount, whish, cash,
      totalCollectedAll, totalExpectedAll, expensesTotal, net: totalCollectedAll - expensesTotal };
  }, [rows, month, expenses]);

  const monthLabel = MONTHS.find(m => m.key === month)?.label ?? month;

  return (
    <>
      <div className="no-print"><Navbar /></div>
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <div className="no-print">
          <SectionHeader badge="💰 Payments & Finances"
            title="Camp fees, expenses & totals"
            subtitle="Set each child's fee, mark it paid (Whish or cash), log expenses and see the bottom line. Admin-only." />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center gap-3 mb-6 no-print">
            <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden text-sm font-bold bg-white">
              {MONTHS.map(m => (
                <button key={m.key} onClick={() => setMonth(m.key)}
                  className={`px-4 py-2.5 ${month === m.key ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-50'}`}>{m.label}</button>
              ))}
            </div>
            <button onClick={() => void load()} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>
            {saving && <span className="text-xs text-gray-400 flex items-center gap-1"><Loader2 size={12} className="animate-spin" /> saving…</span>}
            <button onClick={() => window.print()} className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700"><Printer size={14} /> Print / PDF</button>
          </div>

          <div className="hidden print:block mb-4">
            <h1 className="text-xl font-black">RoboHolic Summer Camp 2026 — {monthLabel}</h1>
            <p className="text-sm text-gray-600">Collected {fmt(money.collected)} of {fmt(money.expected)} · {money.outstanding > 0 ? `${fmt(money.outstanding)} outstanding` : 'all in'}</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4 no-print">{error}</div>}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : (
            <>
              {/* Month totals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: `Collected — ${monthLabel}`, value: fmt(money.collected), color: '#16A34A', icon: <CheckCircle size={18} /> },
                  { label: 'Expected this month', value: fmt(money.expected), color: '#2563EB', icon: <TrendingUp size={18} /> },
                  { label: 'Outstanding', value: fmt(money.outstanding), color: '#DC2626', icon: <X size={18} /> },
                  { label: 'Paid students', value: `${money.paidCount}/${money.studentCount}`, color: '#7C3AED', icon: <Wallet size={18} /> },
                ].map(s => (
                  <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-5">
                    <div className="w-9 h-9 rounded-xl flex items-center justify-center mb-2" style={{ background: s.color + '15', color: s.color }}>{s.icon}</div>
                    <div className="text-2xl font-black text-gray-900">{s.value}</div>
                    <div className="text-xs text-gray-500">{s.label}</div>
                  </div>
                ))}
              </div>

              {/* Per class */}
              <div className="space-y-3">
                {rows.map(c => {
                  const paid = c.students.filter(s => s.payments?.[month]?.method).length;
                  const classCollected = c.students.reduce((n, s) => { const p = s.payments?.[month]; return n + (p?.method && p?.amount ? p.amount : 0); }, 0);
                  return (
                    <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ breakInside: 'avoid' }}>
                      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><GraduationCap size={18} /></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-sm truncate">{c.name}</div>
                          <div className="text-xs text-gray-400">Coach: {c.coachName || '—'} · {fmt(classCollected)} collected</div>
                        </div>
                        <span className={`badge-pill text-xs ${paid === c.students.length && c.students.length > 0 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{paid}/{c.students.length} paid</span>
                      </div>
                      <div className="px-5 py-3 space-y-2">
                        {c.students.length === 0 ? (
                          <p className="text-xs text-gray-400">No students.</p>
                        ) : c.students.map(s => {
                          const p = s.payments?.[month];
                          return (
                            <div key={s.uid} className="rounded-xl border border-gray-100 p-2.5">
                              <div className="flex items-center gap-2 flex-wrap">
                                <span className="text-sm font-semibold text-gray-800 flex-1 min-w-[130px] truncate">
                                  {s.displayName}
                                  {s.parentName && <span className="text-[11px] text-gray-400 font-normal"> · {s.parentName}</span>}
                                </span>
                                <div className="inline-flex items-center gap-1">
                                  <span className="text-xs text-gray-400">{CUR}</span>
                                  <input type="number" inputMode="decimal" key={`${s.uid}-${month}`} defaultValue={p?.amount ?? ''} placeholder="fee"
                                    onBlur={e => { const v = parseFloat(e.target.value); const next = isNaN(v) || v <= 0 ? undefined : v; if (next !== (p?.amount ?? undefined)) setAmount(c.id, s, next); }}
                                    className="w-20 px-2 py-1.5 rounded-lg border border-gray-200 text-sm no-print" />
                                  <span className="hidden print:inline text-sm">{p?.amount ?? '—'}</span>
                                </div>
                                {p?.method ? (
                                  <>
                                    <span className={`badge-pill text-[11px] inline-flex items-center gap-1 ${p.method === 'whish' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>
                                      {p.method === 'whish' ? <Wallet size={11} /> : <Banknote size={11} />}
                                      Paid — {p.method === 'whish' ? 'Whish' : 'cash'}{p.at ? ` · ${new Date(p.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}` : ''}
                                    </span>
                                    <button onClick={() => unmark(c.id, s)} disabled={saving === s.uid} title="Undo paid (keeps the fee)"
                                      className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 no-print"><X size={13} /></button>
                                  </>
                                ) : (
                                  <span className="flex items-center gap-1.5 no-print">
                                    <button onClick={() => mark(c.id, s, 'whish')} disabled={saving === s.uid}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-100"><Wallet size={11} /> Whish</button>
                                    <button onClick={() => mark(c.id, s, 'cash')} disabled={saving === s.uid}
                                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-100"><Banknote size={11} /> Cash</button>
                                  </span>
                                )}
                                {!p?.method && <span className="hidden print:inline badge-pill bg-red-50 text-red-600 text-[11px]">due</span>}
                              </div>
                              {/* Parent contact — editable, with a WhatsApp payment reminder */}
                              <div className="flex items-center gap-2 flex-wrap mt-2 pl-0.5 no-print">
                                <span className="inline-flex items-center gap-1">
                                  <MessageCircle size={12} className="text-gray-300 shrink-0" />
                                  <input defaultValue={s.parentPhone ?? ''} key={`ph-${s.uid}`} placeholder="WhatsApp (+961…)"
                                    onBlur={e => { const v = e.target.value.trim(); if (v !== (s.parentPhone ?? '')) void saveContact(c.id, s, { parentPhone: v }); }}
                                    className="w-32 px-2 py-1 rounded-lg border border-gray-200 text-xs" />
                                </span>
                                <span className="inline-flex items-center gap-1">
                                  <Mail size={12} className="text-gray-300 shrink-0" />
                                  <input defaultValue={s.parentEmail ?? ''} key={`em-${s.uid}`} placeholder="parent email"
                                    onBlur={e => { const v = e.target.value.trim(); if (v !== (s.parentEmail ?? '')) void saveContact(c.id, s, { parentEmail: v }); }}
                                    className="w-44 px-2 py-1 rounded-lg border border-gray-200 text-xs" />
                                </span>
                                {s.parentPhone ? (
                                  <a href={`https://wa.me/${waNum(s.parentPhone)}?text=${encodeURIComponent(reminderMsg(s))}`} target="_blank" rel="noreferrer"
                                    title="Send a WhatsApp payment reminder" className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-white" style={{ background: '#25D366' }}>
                                    <MessageCircle size={11} /> Remind
                                  </a>
                                ) : (
                                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg text-[11px] font-bold text-gray-300 bg-gray-50" title="Add a phone number first">
                                    <MessageCircle size={11} /> Remind
                                  </span>
                                )}
                              </div>
                              {/* Print-only contact line */}
                              <div className="hidden print:block text-[11px] text-gray-500 mt-1">{s.parentEmail || 'no email'} · {s.parentPhone || 'no phone'}</div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Expenses */}
              <div className="bg-white rounded-2xl border border-gray-100 p-5 mt-6" style={{ breakInside: 'avoid' }}>
                <h3 className="font-bold text-gray-900 text-sm mb-3 flex items-center gap-2"><TrendingDown size={16} className="text-red-500" /> Expenses <span className="ml-auto text-red-600 font-black">{fmt(money.expensesTotal)}</span></h3>
                <form onSubmit={addExp} className="flex flex-wrap items-end gap-2 mb-3 no-print">
                  <input value={exp.label} onChange={e => setExp({ ...exp, label: e.target.value })} placeholder="What was it for? (e.g. mBot batteries)" className="flex-1 min-w-[160px] px-3 py-2 rounded-lg border border-gray-200 text-sm" />
                  <div className="inline-flex items-center gap-1"><span className="text-xs text-gray-400">{CUR}</span>
                    <input value={exp.amount} onChange={e => setExp({ ...exp, amount: e.target.value })} type="number" inputMode="decimal" placeholder="amount" className="w-24 px-2 py-2 rounded-lg border border-gray-200 text-sm" /></div>
                  <select value={exp.month} onChange={e => setExp({ ...exp, month: e.target.value })} className="px-2 py-2 rounded-lg border border-gray-200 text-sm bg-white">
                    <option value="">no month</option>
                    {MONTHS.map(m => <option key={m.key} value={m.key}>{m.label}</option>)}
                  </select>
                  <button type="submit" disabled={expBusy || !exp.label.trim() || !exp.amount} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-bold text-white disabled:opacity-40" style={{ background: '#DC2626' }}>{expBusy ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />} Add</button>
                </form>
                {expenses.length === 0 ? (
                  <p className="text-xs text-gray-400">No expenses logged yet.</p>
                ) : (
                  <div className="space-y-1">
                    {expenses.map(e => (
                      <div key={e.id} className="flex items-center gap-2 text-sm">
                        <span className="flex-1 text-gray-700">{e.label}</span>
                        {e.month && <span className="badge-pill bg-gray-100 text-gray-500 text-[10px]">{MONTHS.find(m => m.key === e.month)?.label ?? e.month}</span>}
                        <span className="text-xs text-gray-400">{new Date(e.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}</span>
                        <span className="font-bold text-red-600 w-20 text-right">−{fmt(e.amount)}</span>
                        <button onClick={() => delExp(e.id)} className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 no-print"><Trash2 size={13} /></button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom line — both months */}
              <div className="rounded-2xl p-5 mt-6 text-white" style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)', breakInside: 'avoid' }}>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                  <div><div className="text-white/60 text-xs">Collected (Jul+Aug)</div><div className="text-2xl font-black">{fmt(money.totalCollectedAll)}</div></div>
                  <div><div className="text-white/60 text-xs">Expected (Jul+Aug)</div><div className="text-2xl font-black">{fmt(money.totalExpectedAll)}</div></div>
                  <div><div className="text-white/60 text-xs">Expenses</div><div className="text-2xl font-black">−{fmt(money.expensesTotal)}</div></div>
                  <div><div className="text-white/60 text-xs">Net</div><div className={`text-2xl font-black ${money.net < 0 ? 'text-red-300' : 'text-green-300'}`}>{fmt(money.net)}</div></div>
                </div>
              </div>

              <p className="text-xs text-gray-400 mt-5 no-print">
                Type each child&apos;s fee, then tap <b>Whish</b> (wallet 70227005, Eddy Bachaalany) or <b>Cash</b> when paid. Undo (✕) keeps the fee. <b>Net</b> = all fees collected − all expenses.
              </p>
            </>
          )}
        </div>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
