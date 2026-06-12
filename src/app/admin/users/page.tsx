'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import {
  Loader2, CheckCircle, XCircle, Hourglass, GraduationCap, RefreshCw, Users,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/lib/auth/AuthProvider';
import type { Profile, AccountStatus } from '@/types';

export default function AdminUsersPage() {
  return (
    <RequireRole allow={['admin']}>
      <AdminUsers />
    </RequireRole>
  );
}

function statusOf(p: Profile): AccountStatus {
  return p.status ?? 'approved';
}

function AdminUsers() {
  const { configured } = useAuth();
  const [coaches, setCoaches] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!configured) { setLoading(false); return; }
    setLoading(true); setError('');
    try {
      const snap = await getDocs(query(collection(db, 'users'), where('role', '==', 'coach')));
      const list = snap.docs.map(d => ({ uid: d.id, ...(d.data() as Omit<Profile, 'uid'>) }));
      // Pending first, then by name.
      list.sort((a, b) => {
        const pa = statusOf(a) === 'pending' ? 0 : 1;
        const pb = statusOf(b) === 'pending' ? 0 : 1;
        return pa - pb || (a.full_name || '').localeCompare(b.full_name || '');
      });
      setCoaches(list);
    } catch {
      setError('Could not load users. Make sure the updated Firestore rules are published.');
    } finally {
      setLoading(false);
    }
  }, [configured]);

  useEffect(() => { void load(); }, [load]);

  async function setStatus(uid: string, status: AccountStatus) {
    setBusyId(uid); setError('');
    try {
      await updateDoc(doc(db, 'users', uid), { status });
      setCoaches(prev => prev.map(c => (c.uid === uid ? { ...c, status } : c)));
    } catch {
      setError('Could not update — check the Firestore rules are published.');
    } finally {
      setBusyId(null);
    }
  }

  const pendingCount = coaches.filter(c => statusOf(c) === 'pending').length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="👥 User Management"
          title="Coach Approvals"
          subtitle="New coaches can't access anything until you approve them here."
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              <b className="text-gray-900">{coaches.length}</b> coach account{coaches.length === 1 ? '' : 's'}
              {pendingCount > 0 && <span className="ml-2 badge-pill bg-amber-100 text-amber-700 text-xs">⏳ {pendingCount} pending</span>}
            </p>
            <button onClick={() => void load()}
              className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline">
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4">{error}</div>
          )}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : coaches.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No coach accounts yet. Coaches appear here when they sign up.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {coaches.map(c => {
                const st = statusOf(c);
                return (
                  <div key={c.uid} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-wrap items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                      <GraduationCap size={20} />
                    </div>
                    <div className="flex-1 min-w-[180px]">
                      <div className="font-bold text-gray-900 text-sm">{c.full_name || '(no name)'}</div>
                      <div className="text-xs text-gray-400">{c.email}</div>
                    </div>

                    {st === 'pending' && <span className="badge-pill bg-amber-100 text-amber-700 text-xs"><Hourglass size={11} className="inline mr-1" />Pending</span>}
                    {st === 'approved' && <span className="badge-pill bg-green-100 text-green-700 text-xs"><CheckCircle size={11} className="inline mr-1" />Approved</span>}
                    {st === 'rejected' && <span className="badge-pill bg-red-100 text-red-600 text-xs"><XCircle size={11} className="inline mr-1" />Rejected</span>}

                    <div className="flex gap-2">
                      {st !== 'approved' && (
                        <button onClick={() => void setStatus(c.uid, 'approved')} disabled={busyId === c.uid}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                          {busyId === c.uid ? '…' : '✓ Approve'}
                        </button>
                      )}
                      {st !== 'rejected' && (
                        <button onClick={() => void setStatus(c.uid, 'rejected')} disabled={busyId === c.uid}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-100 disabled:opacity-50 hover:bg-red-100">
                          {busyId === c.uid ? '…' : 'Reject'}
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
