'use client';

import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { ShieldCheck, Loader2, LogOut, Lock } from 'lucide-react';
import { db } from '@/lib/firebase/client';
import { useAuth } from '@/lib/auth/AuthProvider';
import { TERMS_VERSION, TERMS_POINTS, ACADEMY_NAME } from '@/lib/legal';

/**
 * Shown once (and again after TERMS_VERSION bumps) to coaches & admins.
 * Records who accepted, when, and which version — an accountability trail
 * and deterrent for the academy's confidential curriculum.
 */
export default function TermsGate({ onAccepted }: { onAccepted: () => void }) {
  const { profile, firebaseUser, signOutUser } = useAuth();
  const [checked, setChecked] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  async function accept() {
    if (!checked || !firebaseUser) return;
    setBusy(true); setError('');
    try {
      await updateDoc(doc(db, 'users', firebaseUser.uid), {
        termsAcceptedAt: new Date().toISOString(),
        termsVersion: TERMS_VERSION,
      });
      onAccepted();
    } catch {
      setError('Could not record your acceptance. Please try again.');
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F8FAFF' }}>
      <div className="w-full max-w-lg bg-white rounded-3xl border border-gray-100 shadow-sm p-8">
        <div className="flex items-center gap-3 mb-5">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <ShieldCheck size={26} />
          </div>
          <div>
            <h1 className="text-xl font-black text-gray-900">Confidentiality Agreement</h1>
            <p className="text-xs text-gray-400">{ACADEMY_NAME} · please read and accept to continue</p>
          </div>
        </div>

        <p className="text-sm text-gray-600 mb-4">
          This platform contains <b>{ACADEMY_NAME}&apos;s confidential curriculum</b>. Before you
          can access it, please confirm you agree to the following:
        </p>

        <ul className="space-y-2.5 mb-5">
          {TERMS_POINTS.map((p, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
              <Lock size={14} className="mt-0.5 shrink-0 text-blue-500" />
              <span>{p}</span>
            </li>
          ))}
        </ul>

        {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-2.5 text-red-700 text-sm mb-4">{error}</div>}

        <label className="flex items-start gap-3 p-3 rounded-xl border-2 border-gray-100 cursor-pointer mb-5 hover:bg-gray-50">
          <input type="checkbox" checked={checked} onChange={e => setChecked(e.target.checked)} className="mt-0.5 accent-blue-600 w-4 h-4" />
          <span className="text-sm text-gray-800 font-medium">
            I, <b>{profile?.full_name || firebaseUser?.email}</b>, have read and agree to this
            confidentiality and acceptable-use agreement.
          </span>
        </label>

        <div className="flex items-center gap-3">
          <button onClick={accept} disabled={!checked || busy}
            className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all disabled:opacity-50"
            style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
            {busy ? <Loader2 size={16} className="animate-spin" /> : <>Agree &amp; Continue</>}
          </button>
          <button onClick={async () => { try { await signOutUser(); } catch { /* ignore */ } }}
            className="flex items-center gap-1.5 px-4 py-3 rounded-xl text-gray-500 hover:text-gray-700 hover:bg-gray-100 text-sm font-semibold">
            <LogOut size={15} /> Decline
          </button>
        </div>
      </div>
    </div>
  );
}
