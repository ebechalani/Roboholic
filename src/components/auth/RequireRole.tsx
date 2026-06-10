'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Loader2, Lock } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';
import type { UserRole } from '@/types';

/**
 * Guards a page by role.
 * - Demo mode (Firebase not configured): renders children so the app stays
 *   browsable locally before keys are added.
 * - Configured + signed out: redirects to /login.
 * - Configured + wrong role: shows an access-denied screen.
 */
export default function RequireRole({
  allow,
  children,
}: {
  allow: UserRole[];
  children: React.ReactNode;
}) {
  const { configured, loading, firebaseUser, role } = useAuth();
  const router = useRouter();

  const needsLogin = configured && !loading && !firebaseUser;

  useEffect(() => {
    if (needsLogin) {
      const next = typeof window !== 'undefined' ? window.location.pathname : '/';
      router.replace(`/login?next=${encodeURIComponent(next)}`);
    }
  }, [needsLogin, router]);

  // Demo mode — no Firebase yet, let everything through.
  if (!configured) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin text-blue-600" size={28} />
      </div>
    );
  }

  if (!firebaseUser) return null; // redirecting

  if (role && !allow.includes(role)) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F8FAFF' }}>
        <div className="text-center max-w-sm">
          <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-500 flex items-center justify-center mx-auto mb-4">
            <Lock size={26} />
          </div>
          <h1 className="text-xl font-black text-gray-900 mb-2">No Access</h1>
          <p className="text-gray-500 text-sm mb-6">
            This area is for {allow.join(' / ')} accounts. You&apos;re signed in as <strong>{role}</strong>.
          </p>
          <Link
            href={role === 'student' ? '/dashboard/student' : '/dashboard/coach'}
            className="inline-flex px-5 py-2.5 rounded-xl font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}
          >
            Go to my dashboard
          </Link>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
