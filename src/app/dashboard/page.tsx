'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';

/** Routes each signed-in user to the right dashboard for their role. */
export default function DashboardRouter() {
  const { configured, loading, role } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!configured) { router.replace('/dashboard/coach'); return; }
    if (loading) return;
    if (role === 'student') router.replace('/dashboard/student');
    else router.replace('/dashboard/coach'); // coach + admin
  }, [configured, loading, role, router]);

  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFF' }}>
      <Loader2 className="animate-spin text-blue-600" size={28} />
    </div>
  );
}
