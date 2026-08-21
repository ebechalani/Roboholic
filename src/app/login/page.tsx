'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Mail, Lock, Loader2, ArrowRight, AlertCircle, Eye, EyeOff,
  GraduationCap, Star, Hash, User,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { friendlyAuthError } from '@/lib/auth/errors';
import { studentEmail, studentPassword } from '@/lib/classes';

type Tab = 'coach' | 'student';

function CoachForm({ next }: { next: string }) {
  const { signIn, resetPassword } = useAuth();
  const router = useRouter();

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
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}
      {info && <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 text-green-700 text-sm">{info}</div>}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email</label>
        <div className="relative">
          <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="email" required value={email} onChange={e => setEmail(e.target.value)}
            placeholder="you@example.com"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
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
          <input type={showPw ? 'text' : 'password'} required value={password} onChange={e => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
          <button type="button" onClick={() => setShowPw(!showPw)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
            {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
          </button>
        </div>
      </div>

      <button type="submit" disabled={busy}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
        {busy ? <Loader2 size={16} className="animate-spin" /> : <>Log In <ArrowRight size={15} /></>}
      </button>

      <p className="text-center text-sm text-gray-500">
        New coach?{' '}
        <Link href="/register" className="text-blue-600 font-semibold hover:underline">Request an account</Link>
      </p>
    </form>
  );
}

function StudentForm() {
  const { signIn } = useAuth();
  const router = useRouter();

  const [code, setCode] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      const u = username.trim();
      await signIn(studentEmail(u, code), studentPassword(code, u));
      router.replace('/dashboard/student');
    } catch {
      setError('Hmm, that didn\'t work. Check your class code and username with your coach!');
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Class code 🏷️</label>
        <div className="relative">
          <Hash size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input required value={code} onChange={e => setCode(e.target.value.toUpperCase())}
            placeholder="RH-K7M2P" autoCapitalize="characters" autoComplete="off"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm uppercase tracking-widest font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400" />
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Username 🤖</label>
        <div className="relative">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input required value={username} onChange={e => setUsername(e.target.value.toLowerCase())}
            placeholder="sami42" autoComplete="off"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400" />
        </div>
      </div>

      <button type="submit" disabled={busy}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
        {busy ? <Loader2 size={16} className="animate-spin" /> : <>Let&apos;s Go! 🚀</>}
      </button>

      <p className="text-center text-xs text-gray-400">
        Your coach gives you your class code and username.
      </p>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="min-h-screen" style={{ background: '#F8FAFF' }} />}>
      <LoginInner />
    </Suspense>
  );
}

function LoginInner() {
  const params = useSearchParams();
  const next = params.get('next') || '/dashboard';
  const [tab, setTab] = useState<Tab>(params.get('tab') === 'student' ? 'student' : 'coach');

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

          <h2 className="text-2xl font-black text-gray-900 mb-1">{tab === 'student' ? 'Student Log In' : 'Log In'}</h2>
          <p className="text-gray-500 text-sm mb-6">{tab === 'student' ? 'Enter your class code and username.' : 'Welcome back! Choose how you log in.'}</p>

          {/* Tabs */}
          <div className="grid grid-cols-2 gap-2 mb-6">
            <button type="button" onClick={() => setTab('coach')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                tab === 'coach' ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              <GraduationCap size={16} /> Coach / Admin
            </button>
            <button type="button" onClick={() => setTab('student')}
              className={`flex items-center justify-center gap-2 py-2.5 rounded-xl border-2 text-sm font-bold transition-all ${
                tab === 'student' ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'}`}>
              <Star size={16} /> Student
            </button>
          </div>

          {tab === 'coach' ? <CoachForm next={next} /> : <StudentForm />}

          <p className="text-center text-xs text-gray-400 mt-6">
            New to RoboHolic? <Link href="/enroll" className="text-blue-600 font-semibold hover:underline">📝 Register your child for 2026–2027</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
