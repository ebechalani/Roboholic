'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Menu, X, BookOpen, Cpu, Trophy, GraduationCap, Users,
  LayoutDashboard, Shield, LogOut, Star,
} from 'lucide-react';
import { useAuth } from '@/lib/auth/AuthProvider';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { configured, loading, firebaseUser, profile, role, signOutUser } = useAuth();
  const router = useRouter();

  const signedIn = configured && !loading && !!firebaseUser;
  const firstName = (profile?.full_name || firebaseUser?.displayName || 'Account').split(/\s+/)[0];
  const dashboardHref = role === 'student' ? '/dashboard/student' : '/dashboard/coach';

  async function handleSignOut() {
    try { await signOutUser(); } catch { /* ignore */ }
    setMenuOpen(false);
    router.replace('/login');
  }

  return (
    <nav className="sticky top-0 z-50 glass-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-lg"
              style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
              R
            </div>
            <div className="leading-none">
              <span className="font-black text-white text-base tracking-tight block">RoboHolic</span>
              <span className="text-white/40 text-xs font-medium">Robotics Academy</span>
            </div>
          </Link>

          {/* Desktop nav — catalogue hidden from students */}
          <div className="hidden md:flex items-center gap-1">
            {role !== 'student' && (
              <>
                <NavLink href="/curriculum"><BookOpen size={14} /> Curriculum</NavLink>
                <NavLink href="/lessons"><Cpu size={14} /> Lessons</NavLink>
                <NavLink href="/resources">Resources</NavLink>
                <NavLink href="/competitions"><Trophy size={14} /> Competitions</NavLink>
              </>
            )}
            {role === 'student' && (
              <NavLink href="/dashboard/student"><Star size={14} /> My Missions</NavLink>
            )}
            {role === 'admin' && (
              <NavLink href="/admin"><Shield size={14} /> Admin</NavLink>
            )}
          </div>

          {/* Auth area */}
          <div className="hidden md:flex items-center gap-2">
            {signedIn ? (
              <>
                <Link href={dashboardHref}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-bold transition-all shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                  <LayoutDashboard size={15} /> Dashboard
                </Link>
                <span className="px-3 py-2 rounded-lg bg-white/10 text-white/85 text-sm font-semibold">
                  {role === 'admin' ? '🛡️' : role === 'student' ? '⭐' : '🎓'} {firstName}
                </span>
                <button onClick={handleSignOut} title="Sign out"
                  className="p-2 rounded-lg text-white/60 hover:text-white hover:bg-white/10 transition-all">
                  <LogOut size={16} />
                </button>
              </>
            ) : (
              <>
                <Link href="/login"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white/75 hover:text-white hover:bg-white/10 text-sm font-medium transition-all">
                  <GraduationCap size={15} /> Log In
                </Link>
                <Link href="/register"
                  className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-white text-sm font-bold transition-all shadow-sm"
                  style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                  <Users size={15} /> Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden text-white/80 hover:text-white p-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/10 px-4 py-4 space-y-1"
          style={{ background: 'rgba(15,32,68,0.97)' }}>
          {role !== 'student' && (
            <>
              <MobileLink href="/curriculum" onClick={() => setMenuOpen(false)}>Curriculum</MobileLink>
              <MobileLink href="/lessons" onClick={() => setMenuOpen(false)}>Lessons</MobileLink>
              <MobileLink href="/resources" onClick={() => setMenuOpen(false)}>Resources</MobileLink>
              <MobileLink href="/competitions" onClick={() => setMenuOpen(false)}>Competitions</MobileLink>
            </>
          )}
          {role === 'student' && (
            <MobileLink href="/dashboard/student" onClick={() => setMenuOpen(false)}>My Missions</MobileLink>
          )}
          {role === 'admin' && (
            <MobileLink href="/admin" onClick={() => setMenuOpen(false)}>🛡️ Admin</MobileLink>
          )}

          {signedIn ? (
            <div className="pt-3 space-y-2">
              <Link href={dashboardHref} onClick={() => setMenuOpen(false)}
                className="block text-center py-2.5 text-white rounded-xl text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                Open Dashboard
              </Link>
              <button onClick={handleSignOut}
                className="w-full text-center py-2.5 border border-white/25 text-white/80 rounded-xl text-sm font-semibold">
                Sign out ({firstName})
              </button>
            </div>
          ) : (
            <div className="pt-3 grid grid-cols-2 gap-2">
              <Link href="/login" onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 border border-white/25 text-white rounded-xl text-sm font-semibold">
                Log In
              </Link>
              <Link href="/register" onClick={() => setMenuOpen(false)}
                className="text-center py-2.5 text-white rounded-xl text-sm font-bold"
                style={{ background: 'linear-gradient(135deg, #F97316, #EA580C)' }}>
                Sign Up
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-1.5 px-3 py-2 rounded-lg text-white/65 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
    >
      {children}
    </Link>
  );
}

function MobileLink({ href, onClick, children }: { href: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="block px-3 py-2.5 rounded-lg text-white/75 hover:text-white hover:bg-white/10 text-sm font-medium transition-all"
    >
      {children}
    </Link>
  );
}
