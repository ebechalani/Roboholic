'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard, BookOpen, FolderOpen, Package, Trophy,
  Users, Settings, LogOut, ChevronRight, Star, BarChart2,
  Upload, Cpu,
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
  badge?: string;
  coachOnly?: boolean;
  adminOnly?: boolean;
}

const COACH_NAV: NavItem[] = [
  { label: 'Dashboard',      href: '/dashboard/coach',      icon: <LayoutDashboard size={18} /> },
  { label: 'Curriculum Map', href: '/curriculum',            icon: <Cpu size={18} /> },
  { label: 'Lessons',        href: '/lessons',               icon: <BookOpen size={18} /> },
  { label: 'Projects',       href: '/projects',              icon: <FolderOpen size={18} /> },
  { label: 'Resources',      href: '/resources',             icon: <Package size={18} /> },
  { label: 'Competitions',   href: '/competitions',          icon: <Trophy size={18} /> },
  { label: 'My Students',    href: '/dashboard/coach#students', icon: <Users size={18} />, badge: '47' },
  { label: 'Progress',       href: '/dashboard/coach#progress', icon: <BarChart2 size={18} /> },
];

const STUDENT_NAV: NavItem[] = [
  { label: 'My Dashboard',   href: '/dashboard/student',    icon: <LayoutDashboard size={18} /> },
  { label: 'My Missions',    href: '/student/my-path',      icon: <Star size={18} /> },
  { label: 'My Badges',      href: '/student/badges',       icon: <Trophy size={18} /> },
  { label: 'Resources',      href: '/resources',            icon: <Package size={18} /> },
  { label: 'Submit Project', href: '/student/submit',       icon: <Upload size={18} /> },
];

interface SidebarProps {
  role: 'coach' | 'student' | 'admin';
  userName?: string;
  userEmoji?: string;
}

export default function Sidebar({ role, userName = 'Coach', userEmoji = '👤' }: SidebarProps) {
  const pathname = usePathname();
  const navItems = role === 'student' ? STUDENT_NAV : COACH_NAV;
  const isStudent = role === 'student';

  return (
    <aside
      className="fixed left-0 top-0 bottom-0 w-64 flex flex-col z-40 overflow-y-auto"
      style={{ background: '#0F2044', borderRight: '1px solid rgba(255,255,255,0.08)' }}
    >
      {/* Logo */}
      <div className="px-5 py-5 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link href="/" className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-sm shadow-lg"
            style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
            R
          </div>
          <div>
            <div className="font-black text-white text-sm leading-none">RoboHolic</div>
            <div className="text-white/35 text-xs">Robotics Academy</div>
          </div>
        </Link>
      </div>

      {/* User info */}
      <div className="px-5 py-4 border-b" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg font-bold ${
            isStudent ? 'bg-orange-500' : 'bg-blue-600'
          }`}>
            {userEmoji}
          </div>
          <div>
            <div className="text-white font-semibold text-sm">{userName}</div>
            <div className="text-white/40 text-xs capitalize">{role}</div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-0.5">
        {navItems.map(item => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-white/15 text-white'
                  : 'text-white/55 hover:text-white hover:bg-white/08'
              }`}
              style={!isActive ? {} : {}}
            >
              <span className={`shrink-0 ${isActive ? 'text-white' : 'text-white/40 group-hover:text-white/70'}`}>
                {item.icon}
              </span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="text-xs px-1.5 py-0.5 rounded-full font-bold"
                  style={{ background: isStudent ? '#F97316' : '#2563EB', color: 'white' }}>
                  {item.badge}
                </span>
              )}
              {isActive && <ChevronRight size={14} className="text-white/50" />}
            </Link>
          );
        })}
      </nav>

      {/* Bottom section */}
      <div className="px-3 py-4 space-y-1 border-t" style={{ borderColor: 'rgba(255,255,255,0.08)' }}>
        <Link href="/"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-white/40 hover:text-white hover:bg-white/08 transition-all">
          <LogOut size={18} /> Back to Home
        </Link>
      </div>
    </aside>
  );
}
