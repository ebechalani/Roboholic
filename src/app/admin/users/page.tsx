'use client';

import { useEffect, useState, useCallback } from 'react';
import { collection, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import {
  Loader2, CheckCircle, XCircle, Hourglass, GraduationCap, RefreshCw,
  Users, Shield, Crown, ShieldOff,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/lib/auth/AuthProvider';
import { isRootAdmin } from '@/lib/auth/admin';
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
  const { configured, profile } = useAuth();
  const amRoot = isRootAdmin(profile?.email);

  const [people, setPeople] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    if (!configured) { setLoading(false); return; }
    setLoading(true); setError('');
    try {
      const snap = await getDocs(query(collection(db, 'users'), where('role', 'in', ['coach', 'admin'])));
      const list = snap.docs.map(d => ({ uid: d.id, ...(d.data() as Omit<Profile, 'uid'>) }));
      // Order: pending coaches → admins → approved coaches → rejected.
      const rank = (p: Profile) =>
        statusOf(p) === 'pending' ? 0 : p.role === 'admin' ? 1 : statusOf(p) === 'approved' ? 2 : 3;
      list.sort((a, b) => rank(a) - rank(b) || (a.full_name || '').localeCompare(b.full_name || ''));
      setPeople(list);
    } catch {
      setError('Could not load users. Make sure the updated Firestore rules are published.');
    } finally {
      setLoading(false);
    }
  }, [configured]);

  useEffect(() => { void load(); }, [load]);

  async function patch(uid: string, data: Partial<Profile>) {
    setBusyId(uid); setError('');
    try {
      await updateDoc(doc(db, 'users', uid), data);
      setPeople(prev => prev.map(c => (c.uid === uid ? { ...c, ...data } : c)));
    } catch {
      setError('Could not update — only the academy director can change admin rights, and the Firestore rules must be published.');
    } finally {
      setBusyId(null);
    }
  }

  const pendingCount = people.filter(c => statusOf(c) === 'pending' && c.role === 'coach').length;

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="👥 User Management"
          title="Coaches & Admins"
          subtitle="Approve new coaches, and (director only) grant or remove admin rights."
        />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="flex items-center justify-between mb-5">
            <p className="text-sm text-gray-500">
              <b className="text-gray-900">{people.length}</b> account{people.length === 1 ? '' : 's'}
              {pendingCount > 0 && <span className="ml-2 badge-pill bg-amber-100 text-amber-700 text-xs">⏳ {pendingCount} pending approval</span>}
            </p>
            <button onClick={() => void load()}
              className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold hover:underline">
              <RefreshCw size={14} /> Refresh
            </button>
          </div>

          {!amRoot && (
            <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 text-blue-900 text-xs mb-4">
              ℹ️ You can approve coaches. Granting or removing <b>admin</b> rights is reserved for the academy director.
            </div>
          )}

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm mb-4">{error}</div>
          )}

          {loading ? (
            <div className="flex justify-center py-16"><Loader2 className="animate-spin text-blue-600" size={26} /></div>
          ) : people.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Users size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No coach accounts yet. Coaches appear here when they sign up.</p>
            </div>
          ) : (
            <div className="space-y-3">
              {people.map(c => {
                const st = statusOf(c);
                const root = isRootAdmin(c.email);
                const isAdminUser = c.role === 'admin';
                const busy = busyId === c.uid;
                return (
                  <div key={c.uid} className="bg-white rounded-2xl border border-gray-100 p-5 flex flex-wrap items-center gap-4">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${isAdminUser ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                      {root ? <Crown size={20} /> : isAdminUser ? <Shield size={20} /> : <GraduationCap size={20} />}
                    </div>
                    <div className="flex-1 min-w-[180px]">
                      <div className="font-bold text-gray-900 text-sm flex items-center gap-2">
                        {c.full_name || '(no name)'}
                        {root && <span className="badge-pill bg-purple-100 text-purple-700 text-[10px]">DIRECTOR</span>}
                      </div>
                      <div className="text-xs text-gray-400">{c.email}</div>
                    </div>

                    {/* Status / role badges */}
                    {isAdminUser
                      ? <span className="badge-pill bg-purple-100 text-purple-700 text-xs"><Shield size={11} className="inline mr-1" />Admin</span>
                      : st === 'pending'
                        ? <span className="badge-pill bg-amber-100 text-amber-700 text-xs"><Hourglass size={11} className="inline mr-1" />Pending</span>
                        : st === 'approved'
                          ? <span className="badge-pill bg-green-100 text-green-700 text-xs"><CheckCircle size={11} className="inline mr-1" />Coach</span>
                          : <span className="badge-pill bg-red-100 text-red-600 text-xs"><XCircle size={11} className="inline mr-1" />Rejected</span>}

                    <div className="flex flex-wrap gap-2">
                      {/* Coach approval (any admin) */}
                      {!isAdminUser && st !== 'approved' && (
                        <button onClick={() => void patch(c.uid, { status: 'approved' })} disabled={busy}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg, #10B981, #059669)' }}>
                          {busy ? '…' : '✓ Approve'}
                        </button>
                      )}
                      {!isAdminUser && st !== 'rejected' && (
                        <button onClick={() => void patch(c.uid, { status: 'rejected' })} disabled={busy}
                          className="px-4 py-2 rounded-xl text-xs font-bold text-red-600 bg-red-50 border border-red-100 disabled:opacity-50 hover:bg-red-100">
                          {busy ? '…' : 'Reject'}
                        </button>
                      )}

                      {/* Admin rights (DIRECTOR only) */}
                      {amRoot && !root && !isAdminUser && st === 'approved' && (
                        <button onClick={() => void patch(c.uid, { role: 'admin' })} disabled={busy}
                          className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-white disabled:opacity-50"
                          style={{ background: 'linear-gradient(135deg, #7C3AED, #5B21B6)' }}>
                          <Shield size={12} /> {busy ? '…' : 'Make admin'}
                        </button>
                      )}
                      {amRoot && !root && isAdminUser && (
                        <button onClick={() => void patch(c.uid, { role: 'coach', status: 'approved' })} disabled={busy}
                          className="flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-bold text-purple-700 bg-purple-50 border border-purple-100 disabled:opacity-50 hover:bg-purple-100">
                          <ShieldOff size={12} /> {busy ? '…' : 'Remove admin'}
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
