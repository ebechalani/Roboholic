'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Clock, Users, BookOpen, CheckCircle, ArrowRight, Calendar,
  BarChart2, Star, TrendingUp, ChevronRight, Zap, Download,
  Search, Bell,
} from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { COACH_DASHBOARD, PROGRAMS } from '@/lib/data';

// ─── Stat Card ────────────────────────────────────────────────────
function StatCard({
  label, value, sub, icon, color,
}: {
  label: string; value: string | number; sub?: string; icon: React.ReactNode; color: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-start justify-between mb-4">
        <div className="w-11 h-11 rounded-xl flex items-center justify-center" style={{ background: color + '15', color }}>
          {icon}
        </div>
      </div>
      <div className="text-3xl font-black text-gray-900 mb-1">{value}</div>
      <div className="text-sm font-semibold text-gray-600">{label}</div>
      {sub && <div className="text-xs text-gray-400 mt-0.5">{sub}</div>}
    </div>
  );
}

// ─── Today's Lessons ──────────────────────────────────────────────
function TodayLessons() {
  const { todayLessons } = COACH_DASHBOARD;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <Calendar size={18} className="text-blue-600" />
          <h2 className="font-bold text-gray-900">Today&apos;s Lessons</h2>
          <span className="badge-pill bg-blue-50 text-blue-700 ml-1">{todayLessons.length}</span>
        </div>
        <Link href="/lessons" className="text-sm text-blue-600 font-semibold hover:underline">View all</Link>
      </div>
      <div className="divide-y divide-gray-50">
        {todayLessons.map((lesson, i) => (
          <div key={lesson.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors">
            {/* Time + color bar */}
            <div className="shrink-0 text-center">
              <div className="text-xs text-gray-400 font-medium">{lesson.time}</div>
              <div className="text-xs text-gray-300">{lesson.duration}</div>
            </div>
            <div
              className="w-1 h-10 rounded-full shrink-0"
              style={{ backgroundColor: lesson.programColor }}
            />
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">{lesson.title}</div>
              <div className="text-xs text-gray-400 mt-0.5">{lesson.group}</div>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <span
                className="badge-pill text-white text-xs font-semibold"
                style={{ backgroundColor: lesson.programColor }}
              >
                {lesson.programTitle}
              </span>
              <Link href={`/lessons/${lesson.lessonId}`}>
                <ChevronRight size={16} className="text-gray-300 hover:text-gray-600 transition-colors" />
              </Link>
            </div>
          </div>
        ))}
      </div>
      {todayLessons.length === 0 && (
        <div className="px-6 py-10 text-center text-gray-400">
          <Calendar size={32} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">No lessons scheduled for today.</p>
        </div>
      )}
    </div>
  );
}

// ─── Groups Overview ──────────────────────────────────────────────
function GroupsOverview() {
  const { groups } = COACH_DASHBOARD;

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <Users size={18} className="text-purple-600" />
          <h2 className="font-bold text-gray-900">My Groups</h2>
        </div>
      </div>
      <div className="divide-y divide-gray-50">
        {groups.map(group => {
          const ageColors: Record<string, string> = {
            '4-5': '#EC4899', '6-7': '#8B5CF6', '8-9': '#10B981', '10-12': '#2563EB', '13-15': '#EF4444',
          };
          return (
            <div key={group.id} className="px-6 py-4">
              <div className="flex items-center justify-between mb-1">
                <div className="font-semibold text-gray-900 text-sm">{group.name}</div>
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <Users size={12} />
                  {group.studentCount} students
                </div>
              </div>
              <div className="text-xs text-gray-500 mb-2">{group.currentCourse}</div>
              <div className="flex items-center justify-between">
                <span
                  className="badge-pill text-xs text-white font-semibold"
                  style={{ backgroundColor: ageColors[group.ageGroup] || '#6B7280' }}
                >
                  Ages {group.ageGroup}
                </span>
                <span className="text-xs text-gray-400">{group.schedule}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Recent Lessons ───────────────────────────────────────────────
function RecentLessons() {
  const { recentLessons } = COACH_DASHBOARD;
  const difficultyStars = (d: number) => '★'.repeat(d) + '☆'.repeat(5 - d);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100">
      <div className="flex items-center justify-between px-6 py-5 border-b border-gray-50">
        <div className="flex items-center gap-2">
          <CheckCircle size={18} className="text-green-600" />
          <h2 className="font-bold text-gray-900">Recently Taught</h2>
        </div>
        <Link href="/lessons" className="text-sm text-blue-600 font-semibold hover:underline">Browse all</Link>
      </div>
      <div className="divide-y divide-gray-50">
        {recentLessons.map(lesson => (
          <div key={lesson.id} className="px-6 py-4 flex items-center gap-4 hover:bg-gray-50 transition-colors cursor-pointer">
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-white text-xs font-bold"
              style={{ backgroundColor: lesson.programColor }}
            >
              {lesson.programTitle.slice(0, 2)}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-gray-900 text-sm truncate">{lesson.title}</div>
              <div className="flex items-center gap-3 mt-0.5">
                <span className="text-xs text-gray-400">{lesson.programTitle}</span>
                <span className="text-xs text-amber-500">{difficultyStars(lesson.difficulty)}</span>
                <span className="text-xs text-gray-300">{lesson.duration}</span>
              </div>
            </div>
            <div className="shrink-0">
              <span className="text-xs text-gray-400">{lesson.completedDate}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Quick Access Programs ────────────────────────────────────────
function QuickPrograms() {
  const featured = PROGRAMS.slice(0, 8);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="font-bold text-gray-900">Quick Access — Programs</h2>
        <Link href="/curriculum" className="text-sm text-blue-600 font-semibold hover:underline">View all 26</Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {featured.map(program => (
          <Link
            key={program.id}
            href={`/curriculum/${program.slug}`}
            className="flex flex-col items-center gap-2 p-3 rounded-xl border-2 text-center card-hover group"
            style={{ borderColor: program.color + '30', backgroundColor: program.bgColor }}
          >
            <span className="text-2xl">{program.icon}</span>
            <span className="text-xs font-semibold text-gray-700 group-hover:text-gray-900 leading-tight">
              {program.shortTitle || program.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}

// ─── Progress Bar ─────────────────────────────────────────────────
function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
      <div className="h-2 rounded-full transition-all duration-500" style={{ width: `${pct}%`, backgroundColor: color }} />
    </div>
  );
}

// ─── Main Coach Dashboard ─────────────────────────────────────────
export default function CoachDashboardPage() {
  return (
    <RequireRole allow={['coach', 'admin']}>
      <CoachDashboard />
    </RequireRole>
  );
}

function CoachDashboard() {
  const { stats } = COACH_DASHBOARD;
  const { profile } = useAuth();
  const coachName = profile?.full_name || COACH_DASHBOARD.coachName;
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="flex min-h-screen">
      <Sidebar role="coach" userName={coachName} userEmoji="🎓" />

      {/* Main content */}
      <main className="flex-1 ml-64 min-h-screen" style={{ background: '#F0F4FF' }}>

        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 sticky top-0 z-30 px-8 py-4">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h1 className="font-black text-gray-900 text-lg">
                Good morning, {coachName.replace('Coach ', '')}! 👋
              </h1>
              <p className="text-xs text-gray-400">
                {new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Search */}
              <div className="relative hidden sm:block">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search lessons..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="pl-9 pr-4 py-2 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400 w-56"
                />
              </div>
              <button className="relative p-2 rounded-xl border border-gray-200 hover:bg-gray-50 transition-colors">
                <Bell size={16} className="text-gray-500" />
                <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-orange-500 rounded-full" />
              </button>
            </div>
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-7xl">

          {/* Stats row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
              label="Total Students"
              value={stats.totalStudents}
              sub="Across all groups"
              icon={<Users size={20} />}
              color="#2563EB"
            />
            <StatCard
              label="Lessons This Week"
              value={stats.completedThisWeek}
              sub="Completed"
              icon={<CheckCircle size={20} />}
              color="#10B981"
            />
            <StatCard
              label="Total Lessons"
              value={stats.completedLessons}
              sub={`of ${stats.totalLessons} in curriculum`}
              icon={<BookOpen size={20} />}
              color="#7C3AED"
            />
            <StatCard
              label="Curriculum Progress"
              value={`${Math.round((stats.completedLessons / stats.totalLessons) * 100)}%`}
              sub="Overall completion"
              icon={<TrendingUp size={20} />}
              color="#F97316"
            />
          </div>

          {/* Curriculum progress bar */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <BarChart2 size={18} className="text-blue-600" />
                <h2 className="font-bold text-gray-900">Curriculum Progress</h2>
              </div>
              <Link href="/curriculum" className="text-sm text-blue-600 font-semibold hover:underline flex items-center gap-1">
                Full Map <ArrowRight size={14} />
              </Link>
            </div>
            <div className="space-y-4">
              {[
                { label: 'Scratch Jr – My First Stories',    color: '#8B5CF6', completed: 2, total: 8 },
                { label: 'mBot2 – Intermediate',             color: '#2563EB', completed: 3, total: 10 },
                { label: 'Python – Intermediate',            color: '#1D4ED8', completed: 5, total: 12 },
                { label: 'micro:bit – Level 1',              color: '#10B981', completed: 4, total: 8 },
              ].map(course => (
                <div key={course.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm font-medium text-gray-700">{course.label}</span>
                    <span className="text-xs text-gray-400 font-medium">{course.completed}/{course.total}</span>
                  </div>
                  <ProgressBar value={course.completed} max={course.total} color={course.color} />
                </div>
              ))}
            </div>
          </div>

          {/* Two column row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <TodayLessons />
            <GroupsOverview />
          </div>

          {/* Recent lessons */}
          <RecentLessons />

          {/* Quick access programs */}
          <QuickPrograms />

          {/* Quick action cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                icon: '📥',
                title: 'Upload Resource',
                text: 'Add PDFs, worksheets, videos, and code files to the library',
                href: '/resources/upload',
                color: '#2563EB',
                bg: '#EFF6FF',
              },
              {
                icon: '📋',
                title: 'Create Lesson',
                text: 'Add a new lesson to the curriculum with full content',
                href: '/admin/lessons/new',
                color: '#7C3AED',
                bg: '#F5F3FF',
              },
              {
                icon: '🏆',
                title: 'Competition Prep',
                text: 'MakeX training materials and competition schedules',
                href: '/competitions',
                color: '#B45309',
                bg: '#FFFBEB',
              },
            ].map(card => (
              <Link
                key={card.title}
                href={card.href}
                className="flex items-start gap-4 p-5 rounded-2xl border-2 card-hover group"
                style={{ backgroundColor: card.bg, borderColor: card.color + '30' }}
              >
                <span className="text-3xl">{card.icon}</span>
                <div>
                  <div className="font-bold text-gray-900 text-sm mb-1 group-hover:underline">{card.title}</div>
                  <div className="text-xs text-gray-500 leading-relaxed">{card.text}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
