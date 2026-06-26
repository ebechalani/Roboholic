'use client';

import { useEffect } from 'react';
import { useAuth } from '@/lib/auth/AuthProvider';

/**
 * Lightweight content protection for lesson pages:
 *  - a faint, repeating watermark stamped with the signed-in user's
 *    identity (so any screenshot/photo is traceable to who leaked it),
 *  - disables right-click "Save as" and text selection/copy on the page.
 *
 * NOTE: this is a DETERRENT, not unbreakable DRM — anything shown in a
 * browser can ultimately be captured. It raises the effort and makes
 * casual copying traceable; the real protection is access control
 * (login + coach approval + students only seeing assigned lessons).
 */
export default function ContentGuard() {
  const { profile, firebaseUser, configured, role, status } = useAuth();
  const label = profile?.email || firebaseUser?.email || profile?.full_name || 'RoboHolic user';

  // Admins are always fully exempt; the academy director can also fully exempt
  // specific coaches (profile.watermarkExempt) from the admin panel.
  const exempt = role === 'admin' || profile?.watermarkExempt === true;

  // Approved coaches are trusted teachers: they may download/copy the lesson
  // resources (no right-click / copy lock-down), but still carry the faint
  // identity watermark so any shared material stays traceable to them.
  const approvedCoach = role === 'coach' && (status ?? 'approved') === 'approved';
  const lockInput = !exempt && !approvedCoach;

  useEffect(() => {
    if (!configured || !lockInput) return; // no lock-down in demo mode, for admins, or for approved coaches
    const block = (e: Event) => e.preventDefault();
    document.addEventListener('contextmenu', block);
    document.addEventListener('copy', block);
    document.addEventListener('cut', block);
    const prev = document.body.style.userSelect;
    document.body.style.userSelect = 'none';
    document.body.setAttribute('data-roboholic-user', label);
    return () => {
      document.removeEventListener('contextmenu', block);
      document.removeEventListener('copy', block);
      document.removeEventListener('cut', block);
      document.body.style.userSelect = prev;
    };
  }, [configured, lockInput, label]);

  if (!configured || exempt) return null;

  const stamp = `RoboHolic · ${label} · confidential`;
  return (
    <div aria-hidden className="fixed inset-0 z-[60] pointer-events-none overflow-hidden select-none" style={{ opacity: 0.05 }}>
      <div className="absolute inset-[-50%] flex flex-wrap content-start gap-x-20 gap-y-28" style={{ transform: 'rotate(-28deg)' }}>
        {Array.from({ length: 120 }).map((_, i) => (
          <span key={i} className="text-[11px] font-bold text-gray-900 whitespace-nowrap">{stamp}</span>
        ))}
      </div>
    </div>
  );
}
