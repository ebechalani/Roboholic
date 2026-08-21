'use client';

import { useEffect, useMemo, useState, useCallback } from 'react';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import {
  Loader2, RefreshCw, Users, MessageCircle, Mail, Copy, CheckCircle,
  Phone, StickyNote, Baby, Printer,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { db } from '@/lib/firebase/client';
import type { Registration } from '@/types';

const STATUSES: { key: Registration['status']; label: string; color: string; bg: string }[] = [
  { key: 'new', label: 'New', color: '#2563EB', bg: '#EFF6FF' },
  { key: 'contacted', label: 'Contacted', color: '#F59E0B', bg: '#FFFBEB' },
  { key: 'enrolled', label: 'Enrolled ✓', color: '#16A34A', bg: '#ECFDF5' },
  { key: 'archived', label: 'Archived', color: '#9CA3AF', bg: '#F9FAFB' },
];
const waNum = (phone?: string) => { let d = (phone || '').replace(/\D/g, ''); if (!d) return ''; if (d.startsWith('00')) d = d.slice(2); if (d.startsWith('961')) return d; if (d.startsWith('0')) d = d.slice(1); return '961' + d; };

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
            <button onClick={() => window.print()} className="ml-auto inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold bg-gray-100 hover:bg-gray-200 text-gray-700"><Printer size={14} /> Print / PDF</button>
          </div>

          {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4 no-print">{error}</div>}

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

                    <div className="flex items-center gap-3 flex-wrap text-xs mb-3">
                      {r.parentPhone && (
                        <a href={`https://wa.me/${waNum(r.parentPhone)}?text=${encodeURIComponent(`Hello ${r.parentName}! 👋 This is RoboHolic Robotics Academy — thank you for registering ${(r.childName || '').split(/\s+/)[0]} for our 2026–2027 classes! We'd love to confirm the group and schedule with you.`)}`}
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
