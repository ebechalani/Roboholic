'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import {
  Loader2, RefreshCw, Users, GraduationCap, Wallet, Banknote, CheckCircle, X, Printer,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { getAllClasses, getClassStudents, setStudentPayments } from '@/lib/classes';
import type { ClassDoc, ClassStudent, StudentPayment } from '@/types';

const MONTHS = [
  { key: '2026-07', label: 'July 2026' },
  { key: '2026-08', label: 'August 2026' },
];

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
  const [month, setMonth] = useState(MONTHS[0].key);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);   // uid being saved
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const classes = await getAllClasses();
      const full = await Promise.all(classes.map(async c => {
        const students = await getClassStudents(c.id).catch(() => [] as ClassStudent[]);
        students.sort((a, b) => (a.displayName || '').localeCompare(b.displayName || ''));
        return { ...c, students };
      }));
      setRows(full);
    } catch {
      setError('Could not load classes. Make sure the Firestore rules are published.');
    } finally {
      setLoading(false);
    }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function mark(classId: string, s: ClassStudent, method: 'whish' | 'cash') {
    const next: Record<string, StudentPayment> = { ...(s.payments ?? {}), [month]: { method, at: new Date().toISOString() } };
    await save(classId, s, next);
  }
  async function unmark(classId: string, s: ClassStudent) {
    const next = { ...(s.payments ?? {}) };
    delete next[month];
    await save(classId, s, next);
  }
  async function save(classId: string, s: ClassStudent, payments: Record<string, StudentPayment>) {
    setSaving(s.uid); setError('');
    // optimistic update
    setRows(prev => prev.map(r => r.id === classId ? { ...r, students: r.students.map(x => x.uid === s.uid ? { ...x, payments } : x) } : r));
    try { await setStudentPayments(classId, s.uid, payments); }
    catch { setError('Could not save the payment — check the Firestore rules and try again.'); void load(); }
    finally { setSaving(null); }
  }

  const totals = useMemo(() => {
    let paid = 0, whish = 0, cash = 0, total = 0;
    for (const c of rows) for (const s of c.students) {
      total++;
      const p = s.payments?.[month];
      if (p) { paid++; if (p.method === 'whish') whish++; else cash++; }
    }
    return { paid, whish, cash, total, due: total - paid };
  }, [rows, month]);

  const monthLabel = MONTHS.find(m => m.key === month)?.label ?? month;

  return (
    <>
      <div className="no-print"><Navbar /></div>
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <div className="no-print">
          <SectionHeader badge="💰 Payments"
            title="Camp fees per student"
            subtitle="Mark each child's monthly payment — Whish transfer (wallet 70227005) or cash. Admin-only; coaches never see this." />
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

          {/* Print-only header */}
          <div className="hidden print:block mb-4">
            <h1 className="text-xl font-black">RoboHolic Summer Camp 2026 — payments, {monthLabel}</h1>
            <p className="text-sm text-gray-600">{totals.paid}/{totals.total} paid · {totals.due} due</p>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4 no-print">{error}</div>}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : (
            <>
              {/* Totals */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                {[
                  { label: `Paid — ${monthLabel}`, value: `${totals.paid}/${totals.total}`, color: '#16A34A', icon: <CheckCircle size={18} /> },
                  { label: 'Still due', value: totals.due, color: '#DC2626', icon: <X size={18} /> },
                  { label: 'Via Whish', value: totals.whish, color: '#7C3AED', icon: <Wallet size={18} /> },
                  { label: 'Cash', value: totals.cash, color: '#F59E0B', icon: <Banknote size={18} /> },
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
                  const paid = c.students.filter(s => s.payments?.[month]).length;
                  return (
                    <div key={c.id} className="bg-white rounded-2xl border border-gray-100 overflow-hidden" style={{ breakInside: 'avoid' }}>
                      <div className="flex items-center gap-3 px-5 py-3.5 border-b border-gray-50">
                        <div className="w-9 h-9 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0"><GraduationCap size={18} /></div>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-gray-900 text-sm truncate">{c.name}</div>
                          <div className="text-xs text-gray-400">Coach: {c.coachName || '—'}</div>
                        </div>
                        <span className={`badge-pill text-xs ${paid === c.students.length && c.students.length > 0 ? 'bg-green-50 text-green-700' : 'bg-amber-50 text-amber-700'}`}>{paid}/{c.students.length} paid</span>
                      </div>
                      <div className="px-5 py-3 space-y-1.5">
                        {c.students.length === 0 ? (
                          <p className="text-xs text-gray-400">No students.</p>
                        ) : c.students.map(s => {
                          const p = s.payments?.[month];
                          return (
                            <div key={s.uid} className="flex items-center gap-2 flex-wrap">
                              <span className="text-sm text-gray-700 flex-1 min-w-[140px] truncate">
                                {s.displayName}
                                {s.parentName && <span className="text-[11px] text-gray-400"> · {s.parentName}</span>}
                              </span>
                              {p ? (
                                <>
                                  <span className={`badge-pill text-[11px] inline-flex items-center gap-1 ${p.method === 'whish' ? 'bg-purple-50 text-purple-700' : 'bg-amber-50 text-amber-700'}`}>
                                    {p.method === 'whish' ? <Wallet size={11} /> : <Banknote size={11} />}
                                    Paid — {p.method === 'whish' ? 'Whish' : 'cash'} · {new Date(p.at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                                  </span>
                                  <button onClick={() => void unmark(c.id, s)} disabled={saving === s.uid} title="Remove this payment mark"
                                    className="p-1 rounded-lg text-gray-300 hover:text-red-500 hover:bg-red-50 no-print"><X size={13} /></button>
                                </>
                              ) : (
                                <span className="flex items-center gap-1.5 no-print">
                                  <button onClick={() => void mark(c.id, s, 'whish')} disabled={saving === s.uid}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-purple-700 bg-purple-50 hover:bg-purple-100 border border-purple-100">
                                    <Wallet size={11} /> Whish
                                  </button>
                                  <button onClick={() => void mark(c.id, s, 'cash')} disabled={saving === s.uid}
                                    className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-bold text-amber-700 bg-amber-50 hover:bg-amber-100 border border-amber-100">
                                    <Banknote size={11} /> Cash
                                  </button>
                                </span>
                              )}
                              {!p && <span className="hidden print:inline badge-pill bg-red-50 text-red-600 text-[11px]">due</span>}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>

              <p className="text-xs text-gray-400 mt-5 no-print">
                Whish wallet: <b>70227005 (Eddy Bachaalany)</b> · cash is collected on Wednesdays. Click Whish/Cash when a parent pays; click ✕ to undo. Print gives a checklist with “due” marked.
              </p>
            </>
          )}
        </div>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
