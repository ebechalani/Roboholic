'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Loader2, Hourglass, XCircle, LogOut } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';

// Pages anyone may see without an account.
const PUBLIC_PATHS = ['/', '/login', '/register'];

function isPublic(pathname: string): boolean {
  return PUBLIC_PATHS.includes(pathname);
}

/**
 * Global access gate:
 *  - Demo mode (no Firebase keys): everything stays open.
 *  - Signed out: only the homepage, /login, and /register are visible.
 *  - Coach with status 'pending' / 'rejected': sees a waiting screen
 *    instead of the app until the admin approves them.
 */
export default function AppGate({ children }: { children: React.ReactNode }) {
  const { configured, loading, firebaseUser, role, status, signOutUser } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  const open = isPublic(pathname);
  const needsLogin = configured && !loading && !firebaseUser && !open;

  useEffect(() => {
    if (needsLogin) router.replace(`/login?next=${encodeURIComponent(pathname)}`);
  }, [needsLogin, router, pathname]);

  if (!configured) return <>{children}</>;
  if (open) return <>{children}</>;

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFF' }}>
        <Loader2 className="animate-spin text-blue-600" size={30} />
      </div>
    );
  }

  if (!firebaseUser) return null; // redirecting to /login

  // Coaches awaiting approval are blocked from the whole app.
  if (role === 'coach' && (status === 'pending' || status === 'rejected')) {
    const rejected = status === 'rejected';
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#F8FAFF' }}>
        <div className="text-center max-w-md bg-white rounded-3xl border border-gray-100 shadow-sm p-10">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-5 ${rejected ? 'bg-red-50 text-red-500' : 'bg-amber-50 text-amber-500'}`}>
            {rejected ? <XCircle size={30} /> : <Hourglass size={30} />}
          </div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">
            {rejected ? 'Access not approved' : 'Awaiting approval'}
          </h1>
          <p className="text-gray-500 text-sm leading-relaxed mb-8">
            {rejected
              ? 'Your coach account was not approved. If you think this is a mistake, contact the academy director.'
              : 'Thanks for signing up! The academy director needs to approve your coach account before you can access the curriculum. You\'ll be able to log in normally once approved.'}
          </p>
          <button
            onClick={async () => { try { await signOutUser(); } catch { /* ignore */ } router.replace('/login'); }}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}
          >
            <LogOut size={15} /> Sign out
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
