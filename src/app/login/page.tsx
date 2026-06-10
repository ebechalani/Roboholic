'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Mail, Lock, Loader2, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { friendlyAuthError } from '@/lib/auth/errors';

function LoginForm() {
  const { signIn, resetPassword, configured } = useAuth();
  const router = useRouter();
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard/coach';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setInfo(''); setBusy(true);
    try {
      await signIn(email, password);
      router.replace(next);
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  async function handleReset() {
    if (!email) { setError('Enter your email first, then tap “Forgot password”.'); return; }
    setError(''); setInfo('');
    try {
      await resetPassword(email);
      setInfo('Password reset email sent! Check your inbox.');
    } catch (err) {
      setError(friendlyAuthError(err));
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!configured && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 text-xs">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>Demo mode — Firebase isn&apos;t configured yet. Add your keys to <code>.env.local</code> to enable real login.</span>
        </div>
      )}

      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {info && (
        <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm">{info}</div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between mb-1.5">
          <label className="block text-sm font-semibold text-gray-700">Password</label>
          <button type="button" onClick={handleReset} className="text-xs text-blue-600 font-medium hover:underline">
            Forgot password?
          </button>
        </div>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
          />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button
        type="submit" disabled={busy}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}
      >
        {busy ? <Loader2 size={16} className="animate-spin" /> : <>Log In <ArrowRight size={15} /></>}
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <div className="min-h-screen flex">
      {/* Left — brand panel */}
      <div className="hidden lg:flex lg:w-1/2 hero-bg section-pattern relative flex-col justify-center px-16">
        <Link href="/" className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-white shadow-lg"
            style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>R</div>
          <div>
            <div className="font-black text-white text-lg leading-none">RoboHolic</div>
            <div className="text-white/40 text-xs">Robotics Academy</div>
          </div>
        </Link>
        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          Welcome back to<br />the lab! 🤖
        </h1>
        <p className="text-white/60 text-lg max-w-md">
          Log in to access your lessons, track progress, and keep building amazing things.
        </p>
        <div className="flex gap-3 text-3xl mt-10">🚀 ⚙️ 💡 🏆</div>
      </div>

      {/* Right — form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12" style={{ background: '#F8FAFF' }}>
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>R</div>
            <span className="font-black text-gray-900">RoboHolic</span>
          </Link>

          <h2 className="text-2xl font-black text-gray-900 mb-1">Log In</h2>
          <p className="text-gray-500 text-sm mb-8">Welcome back! Enter your details to continue.</p>

          <Suspense fallback={<div className="text-gray-400 text-sm">Loading…</div>}>
            <LoginForm />
          </Suspense>

          <p className="text-center text-sm text-gray-500 mt-8">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="text-blue-600 font-semibold hover:underline">Sign up</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
