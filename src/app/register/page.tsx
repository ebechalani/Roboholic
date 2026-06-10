'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Mail, Lock, User, Loader2, ArrowRight, AlertCircle, GraduationCap, Star } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import { friendlyAuthError } from '@/lib/auth/errors';
import { AGE_GROUPS } from '@/lib/data';
import type { UserRole, AgeGroupId } from '@/types';

function RegisterForm() {
  const { signUp, configured } = useAuth();
  const router = useRouter();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('student');
  const [ageGroup, setAgeGroup] = useState<AgeGroupId>('8-9');
  const [error, setError] = useState('');
  const [busy, setBusy] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(''); setBusy(true);
    try {
      await signUp({ email, password, fullName, role, ageGroup: role === 'student' ? ageGroup : undefined });
      router.replace(role === 'student' ? '/dashboard/student' : '/dashboard/coach');
    } catch (err) {
      setError(friendlyAuthError(err));
    } finally {
      setBusy(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {!configured && (
        <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 text-amber-800 text-xs">
          <AlertCircle size={15} className="mt-0.5 shrink-0" />
          <span>Demo mode — add your Firebase keys to <code>.env.local</code> to enable real sign-up.</span>
        </div>
      )}
      {error && (
        <div className="flex items-start gap-2 bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-700 text-sm">
          <AlertCircle size={15} className="mt-0.5 shrink-0" /> {error}
        </div>
      )}

      {/* Role selector */}
      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">I am a…</label>
        <div className="grid grid-cols-2 gap-3">
          <button type="button" onClick={() => setRole('student')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
              role === 'student' ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}>
            <Star size={16} /> Student
          </button>
          <button type="button" onClick={() => setRole('coach')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold transition-all ${
              role === 'coach' ? 'border-blue-400 bg-blue-50 text-blue-700' : 'border-gray-200 text-gray-500 hover:border-gray-300'
            }`}>
            <GraduationCap size={16} /> Coach
          </button>
        </div>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full name</label>
        <div className="relative">
          <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="text" required value={fullName} onChange={e => setFullName(e.target.value)}
            placeholder="Your name"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
        </div>
      </div>

      {role === 'student' && (
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age group</label>
          <select value={ageGroup} onChange={e => setAgeGroup(e.target.value as AgeGroupId)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20">
            {AGE_GROUPS.map(ag => <option key={ag.id} value={ag.id}>{ag.emoji} {ag.label}</option>)}
          </select>
        </div>
      )}

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
        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
        <div className="relative">
          <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400" />
        </div>
      </div>

      <button type="submit" disabled={busy}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm transition-all hover:opacity-90 disabled:opacity-60"
        style={{ background: role === 'student' ? 'linear-gradient(135deg, #F97316, #DC2626)' : 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
        {busy ? <Loader2 size={16} className="animate-spin" /> : <>Create Account <ArrowRight size={15} /></>}
      </button>

      <p className="text-xs text-gray-400 text-center">
        Admin accounts are created by your academy director, not here.
      </p>
    </form>
  );
}

export default function RegisterPage() {
  return (
    <div className="min-h-screen flex">
      <div className="hidden lg:flex lg:w-1/2 section-pattern relative flex-col justify-center px-16"
        style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #F97316 100%)' }}>
        <Link href="/" className="flex items-center gap-3 mb-12">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center font-black text-purple-700 bg-white shadow-lg">R</div>
          <div>
            <div className="font-black text-white text-lg leading-none">RoboHolic</div>
            <div className="text-white/60 text-xs">Robotics Academy</div>
          </div>
        </Link>
        <h1 className="text-4xl font-black text-white leading-tight mb-4">
          Start your robotics<br />adventure! 🚀
        </h1>
        <p className="text-white/70 text-lg max-w-md">
          Create your account to unlock missions, earn badges, and build incredible projects.
        </p>
        <div className="flex gap-3 text-3xl mt-10">🤖 🎮 🧠 🏅</div>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 sm:p-12" style={{ background: '#F8FAFF' }}>
        <div className="w-full max-w-sm">
          <Link href="/" className="lg:hidden flex items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>R</div>
            <span className="font-black text-gray-900">RoboHolic</span>
          </Link>

          <h2 className="text-2xl font-black text-gray-900 mb-1">Create Account</h2>
          <p className="text-gray-500 text-sm mb-8">Join RoboHolic and start building!</p>

          <Suspense fallback={<div className="text-gray-400 text-sm">Loading…</div>}>
            <RegisterForm />
          </Suspense>

          <p className="text-center text-sm text-gray-500 mt-8">
            Already have an account?{' '}
            <Link href="/login" className="text-blue-600 font-semibold hover:underline">Log in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
