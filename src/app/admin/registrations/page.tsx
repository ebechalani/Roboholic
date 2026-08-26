'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import {
  Loader2, RefreshCw, Users, MessageCircle, Mail, Copy, CheckCircle,
  Phone, StickyNote, Baby, Printer, MapPin, Clock, Trophy, CalendarPlus,
  Download, LayoutGrid, Table2,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { db } from '@/lib/firebase/client';
import { branchById, BRANCHES, slotLabel } from '@/lib/enrollment';
import type { Registration } from '@/types';

const STATUSES: { key: Registration['status']; label: string; color: string; bg: string }[] = [
  { key: 'new', label: 'New', color: '#2563EB', bg: '#EFF6FF' },
  { key: 'contacted', label: 'Contacted', color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'enrolled', label: 'Enrolled ✓', color: '#16A34A', bg: '#ECFDF5' },
  { key: 'archived', label: 'Archived', color: '#9CA3AF', bg: '#F9FAFB' },
];
const waNum = (phone?: string) => { let d = (phone || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('00')) d = d.slice(2); if (d.startsWith('961')) return d; if (d.startsWith('0')) d = d.slice(1); return '961' + d; };

// ─── Excel export ────────────────────────────────────────────────
// CSV that Excel opens natively: UTF-8 BOM (so accents/Arabic survive) and
// phone numbers written as ="03..." so Excel keeps them as text and doesn't
// eat the leading zero of Lebanese numbers.
const csvCell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`;
const csvPhone = (v?: string) => (v ? `"=""${String(v).replace(/"/g, '')}"""` : '""');

const COLUMNS: { header: string; get: (r: Registration) => string; phone?: boolean }[] = [
  { header: 'Registered', get: r => (r.createdAt || '').slice(0, 10) },
  { header: 'Status', get: r => r.status },
  { header: 'Child', get: r => r.childName },
  { header: 'Age group', get: r => r.ageGroup || '' },
  { header: 'Date of birth', get: r => r.dob || '' },
  { header: 'Branch', get: r => (r.branch ? branchById(r.branch)?.name ?? r.branch : '') },
  { header: 'Class day & time', get: r => r.slotLabel || '' },
  { header: 'Requested another day', get: r => r.otherDay || '' },
  { header: 'MakeX', get: r => (r.makex ? 'YES' : '') },
  { header: 'MakeX time', get: r => r.makexSlotLabel || '' },
  { header: 'Chess', get: r => (r.chess ? 'YES' : '') },
  { header: 'Chess time', get: r => r.chessSlotLabel || '' },
  { header: 'Parent', get: r => r.parentName },
  { header: 'WhatsApp', get: r => r.parentPhone, phone: true },
  { header: 'Email', get: r => r.parentEmail || '' },
  { header: 'Notes', get: r => r.notes || '' },
];

function exportCsv(rows: Registration[], label: string) {
  const lines = [
    COLUMNS.map(c => csvCell(c.header)).join(','),
    ...rows.map(r => COLUMNS.map(c => (c.phone ? csvPhone(c.get(r)) : csvCell(c.get(r)))).join(',')),
  ];
  const blob = new Blob(['﻿' + lines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `RoboHolic-registrations-${label}-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a); a.click(); a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export default function AdminRegistrationsPage() {
  return (
    <RequireRole allow={['admin']}>
      <Registrations />
    </RequireRole>
  );
}

function Registrations() {
  const [rows, setRows] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState<'all' | Registration['status']>('all');
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState<'table' | 'cards'>('table');

  const load = useCallback(async () => {
    setLoading(true); setError('');
    try {
      const snap = await getDocs(collection(db, 'registrations'));
      const list = snap.docs.map(d => ({ id: d.id, ...(d.data() as Omit<Registration, 'id'>) }));
      list.sort((a, b) => (b.createdAt || '').localeCompare(a.createdAt || ''));
      setRows(list);
    } catch {
      setError('Could not load registrations — make sure the updated Firestore rules are published.');
    } finally { setLoading(false); }
  }, []);
  useEffect(() => { void load(); }, [load]);

  async function setStatus(r: Registration, status: Registration['status']) {
    setRows(prev => prev.map(x => x.id === r.id ? { ...x, status } : x));
    try { await updateDoc(doc(db, 'registrations', r.id), { status }); }
    catch { setError('Could not save the status — try again.'); void load(); }
  }

  const counts = useMemo(() => {
    const c: Record<string, number> = { all: rows.length };
    for (const s of STATUSES) c[s.key] = rows.filter(r => r.status === s.key).length;
    return c;
  }, [rows]);

  // Group planning: how many children want each time slot (archived excluded).
  const planning = useMemo(() => {
    const live = rows.filter(r => r.status !== 'archived');
    return BRANCHES.map(b => {
      const mine = live.filter(r => r.branch === b.id);
      const slots = [...b.classSlots, ...b.makexSlots, ...b.chessSlots].map(s => ({
        slot: s,
        kind: b.makexSlots.some(m => m.id === s.id) ? 'makex' as const
          : b.chessSlots.some(c => c.id === s.id) ? 'chess' as const : 'class' as const,
        kids: mine.filter(r => (r.slotId === s.id) || (r.makexSlotId === s.id) || (r.chessSlotId === s.id)),
      })).filter(x => x.kids.length > 0);
      const otherDay = mine.filter(r => r.otherDay);
      return { branch: b, total: mine.length, slots, otherDay, makex: mine.filter(r => r.makex).length, chess: mine.filter(r => r.chess).length };
    }).filter(b => b.total > 0);
  }, [rows]);

  const visible = filter === 'all' ? rows : rows.filter(r => r.status === filter);
  const enrollUrl = typeof window !== 'undefined' ? `${window.location.origin}/enroll` : '/enroll';

  return (
    <>
      <div className="no-print"><Navbar /></div>
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <div className="no-print">
          <SectionHeader badge="📝 Registrations 2026–2027"
            title="Who wants to join next year"
            subtitle="Every parent submission from the public /enroll form. Contact them on WhatsApp, then mark Contacted → Enrolled." />
        </div>

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-wrap items-center gap-3 mb-6 no-print">
            <button onClick={() => { void navigator.clipboard?.writeText(enrollUrl); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
              <Copy size={14} /> {copied ? 'Link copied!' : 'Copy the parent registration link'}
            </button>
            <a href={`https://wa.me/?text=${encodeURIComponent(`🤖 RoboHolic Robotics Academy — registrations for the 2026–2027 school-year classes are open (ages 4–15)! Register your child here: ${enrollUrl}`)}`}
              target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-sm font-bold text-white" style={{ background: '#25D366' }}>
              <MessageCircle size={14} /> Share on WhatsApp
            </a>
            <button onClick={() => void load()} className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline"><RefreshCw size={14} /> Refresh</button>

            <div className="ml-auto flex items-center gap-2">
              {/* View toggle */}
              <div className="inline-flex rounded-xl border border-gray-200 overflow-hidden text-xs font-bold bg-white">
                <button onClick={() => setView('table')} className={`px-3 py-2 inline-flex items-center gap-1.5 ${view === 'table' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}><Table2 size={13} /> Table</button>
                <button onClick={() => setView('cards')} className={`px-3 py-2 inline-flex items-center gap-1.5 ${view === 'cards' ? 'bg-gray-900 text-white' : 'text-gray-600 hover:bg-gray-50'}`}><LayoutGrid size={13} /> Cards</button>
              </div>
              <button onClick={() => exportCsv(visible, filter)} disabled={visible.length === 0}
                title="Download an Excel-ready file of the registrations shown"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: '#16A34A' }}>
                <Download size={14} /> Excel ({visible.length})
              </button>
              <button onClick={() => window.print()} className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700"><Printer size={14} /> Print</button>
            </div>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4 no-print">{error}</div>}

          {/* Group planning — how many children want each time slot */}
          {planning.length > 0 && (
            <div className="bg-white rounded-2xl border border-gray-100 p-5 mb-6">
              <h3 className="font-bold text-gray-900 text-sm mb-3">📊 Group planning <span className="font-normal text-gray-400">— demand per time slot (archived excluded)</span></h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {planning.map(p => (
                  <div key={p.branch.id}>
                    <div className="text-xs font-black text-gray-800 mb-1.5 flex items-center gap-1">
                      <MapPin size={12} className="text-indigo-500" /> {p.branch.name}
                      <span className="badge-pill bg-gray-100 text-gray-500 text-[10px] ml-1">{p.total} registered</span>
                      {p.makex > 0 && <span className="badge-pill bg-amber-50 text-amber-700 text-[10px]"><Trophy size={9} className="inline" /> {p.makex} MakeX</span>}
                      {p.chess > 0 && <span className="badge-pill bg-emerald-50 text-emerald-700 text-[10px]">♟️ {p.chess} chess</span>}
                    </div>
                    <div className="space-y-1">
                      {p.slots.map(({ slot, kind, kids }) => (
                        <div key={slot.id} className="flex items-center gap-2 text-xs">
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${kind === 'makex' ? 'bg-amber-500' : kind === 'chess' ? 'bg-emerald-500' : 'bg-blue-500'}`} />
                          <span className="text-gray-600 flex-1">{slotLabel(slot)}
                            {kind === 'makex' && <span className="text-amber-600 font-semibold"> · MakeX</span>}
                            {kind === 'chess' && <span className="text-emerald-600 font-semibold"> · Chess</span>}
                          </span>
                          <span className={`badge-pill text-[10px] ${kids.length >= 4 ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{kids.length} {kids.length === 1 ? 'child' : 'children'}</span>
                        </div>
                      ))}
                      {p.otherDay.length > 0 && (
                        <div className="flex items-center gap-2 text-xs">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0 bg-orange-500" />
                          <span className="text-orange-700 flex-1">asked for another day</span>
                          <span className="badge-pill bg-orange-50 text-orange-700 text-[10px]">{p.otherDay.length}</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Stats + filter */}
          <div className="flex flex-wrap gap-2 mb-6 no-print">
            <button onClick={() => setFilter('all')}
              className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${filter === 'all' ? 'border-gray-900 bg-gray-900 text-white' : 'border-gray-200 bg-white text-gray-600'}`}>
              All ({counts.all})
            </button>
            {STATUSES.map(s => (
              <button key={s.key} onClick={() => setFilter(s.key)}
                className={`px-4 py-2 rounded-xl text-sm font-bold border-2 ${filter === s.key ? 'text-white' : 'bg-white text-gray-600 border-gray-200'}`}
                style={filter === s.key ? { background: s.color, borderColor: s.color } : {}}>
                {s.label} ({counts[s.key]})
              </button>
            ))}
          </div>

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : visible.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">{rows.length === 0 ? 'No registrations yet — share the link with parents!' : 'Nothing with this status.'}</p>
            </div>
          ) : view === 'table' ? (
            /* ─── Table view: everything at a glance ─── */
            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-left text-[11px] uppercase tracking-wide text-gray-500">
                      <th className="px-3 py-2.5 font-bold">Child</th>
                      <th className="px-3 py-2.5 font-bold">Age</th>
                      <th className="px-3 py-2.5 font-bold">Branch</th>
                      <th className="px-3 py-2.5 font-bold">Class time</th>
                      <th className="px-3 py-2.5 font-bold">MakeX</th>
                      <th className="px-3 py-2.5 font-bold">Chess</th>
                      <th className="px-3 py-2.5 font-bold">Parent</th>
                      <th className="px-3 py-2.5 font-bold">WhatsApp</th>
                      <th className="px-3 py-2.5 font-bold">Email</th>
                      <th className="px-3 py-2.5 font-bold">Status</th>
                      <th className="px-3 py-2.5 font-bold no-print"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {visible.map(r => {
                      const st = STATUSES.find(s => s.key === r.status) ?? STATUSES[0];
                      return (
                        <tr key={r.id} className="border-t border-gray-50 hover:bg-blue-50/30 align-top">
                          <td className="px-3 py-2.5">
                            <div className="font-bold text-gray-900 whitespace-nowrap">{r.childName}</div>
                            {r.dob && <div className="text-[11px] text-gray-400">DOB {r.dob}</div>}
                            {r.notes && <div className="text-[11px] text-gray-400 max-w-[220px] truncate" title={r.notes}>📝 {r.notes}</div>}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">{r.ageGroup || '—'}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-gray-600">{r.branch ? branchById(r.branch)?.name ?? r.branch : '—'}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            {r.slotLabel ? <span className="text-gray-800">{r.slotLabel}</span> : <span className="text-gray-300">—</span>}
                            {r.otherDay && <div className="text-[11px] font-semibold text-orange-600">asked: {r.otherDay}</div>}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            {r.makex
                              ? <span className="badge-pill bg-amber-50 text-amber-700 text-[10px]"><Trophy size={9} className="inline" /> {r.makexSlotLabel || 'yes'}</span>
                              : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            {r.chess
                              ? <span className="badge-pill bg-emerald-50 text-emerald-700 text-[10px]">♟️ {r.chessSlotLabel || 'yes'}</span>
                              : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap text-gray-700">{r.parentName}</td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            {r.parentPhone
                              ? <a href={`https://wa.me/${waNum(r.parentPhone)}`} target="_blank" rel="noreferrer" className="text-green-600 font-semibold hover:underline">{r.parentPhone}</a>
                              : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-3 py-2.5">
                            {r.parentEmail
                              ? <a href={`mailto:${r.parentEmail}`} className="text-blue-600 hover:underline break-all">{r.parentEmail}</a>
                              : <span className="text-gray-300">—</span>}
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap">
                            <span className="badge-pill text-[10px] font-bold" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                          </td>
                          <td className="px-3 py-2.5 whitespace-nowrap no-print">
                            <select value={r.status} onChange={e => void setStatus(r, e.target.value as Registration['status'])}
                              className="text-[11px] rounded-lg border border-gray-200 px-2 py-1 bg-white">
                              {STATUSES.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
                            </select>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-[11px] text-gray-400 px-3 py-2.5 border-t border-gray-50 no-print">
                Scroll sideways for more columns · change a status with the dropdown · <b>Excel</b> downloads exactly these {visible.length} row{visible.length === 1 ? '' : 's'} (notes and requested days included).
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {visible.map(r => {
                const st = STATUSES.find(s => s.key === r.status) ?? STATUSES[0];
                return (
                  <div key={r.id} className="bg-white rounded-2xl border border-gray-100 p-5" style={{ breakInside: 'avoid' }}>
                    <div className="flex items-center gap-3 flex-wrap mb-2">
                      <span className="w-9 h-9 rounded-xl bg-orange-50 text-orange-500 flex items-center justify-center shrink-0"><Baby size={18} /></span>
                      <div className="flex-1 min-w-0">
                        <div className="font-black text-gray-900">{r.childName}
                          {r.ageGroup && <span className="badge-pill bg-blue-50 text-blue-700 text-[10px] ml-2">ages {r.ageGroup}</span>}
                          {r.dob && <span className="badge-pill bg-gray-100 text-gray-500 text-[10px] ml-1">DOB {r.dob}</span>}
                        </div>
                        <div className="text-xs text-gray-400">
                          {r.parentName} · {new Date(r.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                          {r.schedule && <> · prefers <b className="text-gray-600">{r.schedule}</b></>}
                        </div>
                      </div>
                      <span className="badge-pill text-xs font-bold" style={{ background: st.bg, color: st.color }}>{st.label}</span>
                    </div>

                    {/* Branch · class time · MakeX */}
                    <div className="flex items-center gap-1.5 flex-wrap mb-2">
                      {r.branch && (
                        <span className="badge-pill bg-indigo-50 text-indigo-700 text-[11px] inline-flex items-center gap-1">
                          <MapPin size={11} /> {branchById(r.branch)?.name ?? r.branch}
                        </span>
                      )}
                      {r.slotLabel && (
                        <span className="badge-pill bg-green-50 text-green-700 text-[11px] inline-flex items-center gap-1">
                          <Clock size={11} /> {r.slotLabel}
                        </span>
                      )}
                      {r.makex && (
                        <span className="badge-pill bg-amber-50 text-amber-700 text-[11px] inline-flex items-center gap-1">
                          <Trophy size={11} /> MakeX{r.makexSlotLabel ? ` · ${r.makexSlotLabel}` : ' (arrange)'}
                        </span>
                      )}
                      {r.chess && (
                        <span className="badge-pill bg-emerald-50 text-emerald-700 text-[11px] inline-flex items-center gap-1">
                          ♟️ Chess{r.chessSlotLabel ? ` · ${r.chessSlotLabel}` : ' (arrange)'}
                        </span>
                      )}
                    </div>

                    {/* Requested a different day — needs the director's confirmation */}
                    {r.otherDay && (
                      <div className="rounded-xl border-2 border-dashed border-orange-300 bg-orange-50 px-3 py-2.5 mb-3">
                        <div className="text-xs font-bold text-orange-800 flex items-center gap-1.5 mb-1">
                          <CalendarPlus size={13} /> Asked for another day: “{r.otherDay}”
                        </div>
                        <p className="text-[11px] text-orange-700 mb-2">If you can open a group at that time, confirm it with the parent.</p>
                        {r.parentPhone && (
                          <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(`Hello ${r.parentName}! 👋 This is RoboHolic Robotics Academy. Good news — we can confirm ${(r.childName || '').split(/\s+/)[0]}'s place for ${r.otherDay}${r.branch ? ` at our ${branchById(r.branch)?.name ?? ''} branch` : ''}. Shall we save the spot?`)}`}
                            target="_blank" rel="noreferrer"
                            className="inline-flex items-center gap-1 text-[11px] font-bold text-white px-3 py-1.5 rounded-lg no-print" style={{ background: '#25D366' }}>
                            <CheckCircle size={11} /> Confirm this day on WhatsApp
                          </a>
                        )}
                      </div>
                    )}

                    <div className="flex items-center gap-3 flex-wrap text-xs mb-3">
                      {r.parentPhone && (
                        <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(`Hello ${r.parentName}! 👋 This is RoboHolic Robotics Academy — thank you for registering ${(r.childName || '').split(/\s+/)[0]} for our 2026–2027 classes${r.slotLabel ? ` (${r.slotLabel}${r.branch ? `, ${branchById(r.branch)?.name ?? ''}` : ''})` : ''}${r.makex ? ' + the MakeX squad' : ''}. We're happy to confirm the place and go over the details with you.`)}`}
                          target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 font-bold text-white px-3 py-1.5 rounded-lg" style={{ background: '#25D366' }}>
                          <MessageCircle size={12} /> WhatsApp {r.parentPhone}
                        </a>
                      )}
                      {r.parentEmail
                        ? <a href={`mailto:${r.parentEmail}`} className="text-blue-600 hover:underline inline-flex items-center gap-1"><Mail size={12} /> {r.parentEmail}</a>
                        : <span className="text-gray-300 inline-flex items-center gap-1"><Mail size={12} /> no email</span>}
                      <span className="text-gray-400 inline-flex items-center gap-1"><Phone size={12} /> {r.parentPhone}</span>
                    </div>

                    {r.notes && (
                      <p className="text-xs text-gray-600 bg-gray-50 rounded-xl px-3 py-2 mb-3 flex items-start gap-1.5"><StickyNote size={12} className="mt-0.5 shrink-0 text-amber-500" /> {r.notes}</p>
                    )}

                    <div className="flex items-center gap-1.5 flex-wrap no-print">
                      {STATUSES.map(s => (
                        <button key={s.key} onClick={() => void setStatus(r, s.key)} disabled={r.status === s.key}
                          className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold border transition-all ${r.status === s.key ? 'text-white' : 'bg-white text-gray-500 border-gray-200 hover:border-gray-300'}`}
                          style={r.status === s.key ? { background: s.color, borderColor: s.color } : {}}>
                          {s.key === 'enrolled' ? <><CheckCircle size={11} className="inline mr-0.5" />Enrolled</> : s.label}
                        </button>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <div className="no-print"><Footer /></div>
    </>
  );
}
