'use client';

import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { PROGRAMS, AGE_GROUPS, BADGES } from '@/lib/data';
import {
  Layers, BookOpen, Users, Package, Upload, GraduationCap, Award, ArrowRight, Eye, ClipboardCheck, Wallet, FilePlus2,
} from 'lucide-react';

export default function AdminPage() {
  return (
    <RequireRole allow={['admin']}>
      <Admin />
    </RequireRole>
  );
}

function Admin() {
  const { profile } = useAuth();

  const stats = [
    { label: 'Programs', value: PROGRAMS.length, icon: <Layers size={18} />, color: '#2563EB' },
    { label: 'Age Groups', value: AGE_GROUPS.length, icon: <Users size={18} />, color: '#7C3AED' },
    { label: 'Badges', value: BADGES.length, icon: <Award size={18} />, color: '#F97316' },
  ];

  const tools = [
    { title: 'Manage Programs', text: 'Create and edit the 26 technology programs.', href: '/admin/programs', icon: <Layers size={20} />, color: '#2563EB', bg: '#EFF6FF' },
    { title: 'Manage Courses', text: 'Organize courses by age and level.', href: '/admin/courses', icon: <BookOpen size={20} />, color: '#7C3AED', bg: '#F5F3FF' },
    { title: 'Manage Lessons', text: 'Build lessons with the full 15-section template.', href: '/admin/lessons', icon: <GraduationCap size={20} />, color: '#10B981', bg: '#ECFDF5' },
    { title: 'Resources', text: 'Add Google Drive links: PDFs, worksheets, videos, code.', href: '/admin/resources', icon: <Package size={20} />, color: '#F59E0B', bg: '#FFFBEB' },
    { title: 'Import Materials', text: 'Bulk-import your Summer Camp 2025 curriculum.', href: '/admin/upload', icon: <Upload size={20} />, color: '#EC4899', bg: '#FDF2F8' },
    { title: 'Manage Users', text: 'Coaches and students — roles and access.', href: '/admin/users', icon: <Users size={20} />, color: '#0EA5E9', bg: '#F0F9FF' },
    { title: 'Coach Oversight', text: 'See each coach\'s classes, assigned lessons & students.', href: '/admin/oversight', icon: <Eye size={20} />, color: '#0D9488', bg: '#F0FDFA' },
    { title: 'Attendance Overview', text: 'Today\'s roll call across all classes + absences per child.', href: '/admin/attendance', icon: <ClipboardCheck size={20} />, color: '#DC2626', bg: '#FEF2F2' },
    { title: 'Payments', text: 'Track July & August camp fees — Whish or cash, per student.', href: '/admin/payments', icon: <Wallet size={20} />, color: '#7C3AED', bg: '#F5F3FF' },
    { title: 'Registrations 2026–27', text: 'Parent sign-ups from the public /enroll form — contact & enroll.', href: '/admin/registrations', icon: <FilePlus2 size={20} />, color: '#F97316', bg: '#FFF7ED' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="⚙️ Admin Control Panel"
          title={`Welcome, ${profile?.full_name || 'Director'}`}
          subtitle="Manage the entire RoboHolic curriculum — programs, courses, lessons, resources, and users."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-10">
            {stats.map(s => (
              <div key={s.label} className="bg-white rounded-2xl border border-gray-100 p-6">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: s.color + '15', color: s.color }}>{s.icon}</div>
                <div className="text-3xl font-black text-gray-900">{s.value}</div>
                <div className="text-sm text-gray-500">{s.label}</div>
              </div>
            ))}
          </div>

          {/* Tools */}
          <h2 className="font-black text-gray-900 text-lg mb-4">Management Tools</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {tools.map(t => (
              <Link key={t.title} href={t.href}
                className="bg-white rounded-2xl border-2 p-5 card-hover group"
                style={{ borderColor: t.color + '25' }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-3" style={{ background: t.bg, color: t.color }}>{t.icon}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:underline">{t.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{t.text}</p>
                <span className="inline-flex items-center gap-1 text-xs font-semibold" style={{ color: t.color }}>
                  Open <ArrowRight size={13} />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
