'use client';

import Link from 'next/link';
import {
  CalendarDays, ClipboardCheck, BarChart2, Users, BookOpen, FolderOpen, ArrowRight,
} from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import RequireRole from '@/components/auth/RequireRole';
import { ACADEMY_DRIVE_FOLDER } from '@/lib/drive';

export default function CoachHandbookPage() {
  return (
    <RequireRole allow={['coach', 'admin']}>
      <Handbook />
    </RequireRole>
  );
}

const QUICK_LINKS = [
  { label: 'Schedule', href: '/dashboard/coach/schedule', icon: <CalendarDays size={15} />, color: '#2563EB' },
  { label: 'Attendance', href: '/dashboard/coach/attendance', icon: <ClipboardCheck size={15} />, color: '#F59E0B' },
  { label: 'Competencies', href: '/dashboard/coach/progress', icon: <BarChart2 size={15} />, color: '#10B981' },
  { label: 'My Classes', href: '/dashboard/coach/classes', icon: <Users size={15} />, color: '#7C3AED' },
  { label: 'Curriculum', href: '/curriculum', icon: <BookOpen size={15} />, color: '#0D9488' },
];

function Handbook() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader badge="📘 Coach Handbook"
          title="Everything you need, on one page"
          subtitle="How a camp day runs, where the lessons and files live, and what the platform does for you." />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-5">

          {/* Quick links */}
          <div className="flex flex-wrap gap-2">
            {QUICK_LINKS.map(q => (
              <Link key={q.href} href={q.href}
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 bg-white text-xs font-bold text-gray-700 card-hover"
                style={{ borderColor: q.color + '30' }}>
                <span style={{ color: q.color }}>{q.icon}</span> {q.label}
              </Link>
            ))}
            {ACADEMY_DRIVE_FOLDER && (
              <a href={ACADEMY_DRIVE_FOLDER} target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border-2 bg-white text-xs font-bold text-gray-700 card-hover"
                style={{ borderColor: '#F9731630' }}>
                <FolderOpen size={15} className="text-orange-500" /> Academy Drive
              </a>
            )}
          </div>

          {/* 1 — The daily flow */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-gray-900 mb-4 flex items-center gap-2">🌅 Your day at camp</h2>
            <ol className="space-y-3">
              {[
                { t: 'Students arrive (8:30)', d: <>Open <Link href="/dashboard/coach/attendance" className="text-blue-600 font-semibold hover:underline">Attendance</Link> and tick who is present. Only the children who attend that day appear — tap Present (tap again to clear), or use “All present”.</> },
                { t: 'Teach today’s lessons', d: <>Your dashboard shows <b>Today — Day N</b> with the lessons planned for the date; the <Link href="/dashboard/coach/schedule" className="text-blue-600 font-semibold hover:underline">Schedule</Link> shows the whole summer week by week. Open a lesson and follow it — objectives, materials, steps and the coach walkthrough are all inside.</> },
                { t: 'End of day: tick what each child did', d: <>In <Link href="/dashboard/coach/progress" className="text-blue-600 font-semibold hover:underline">Competencies</Link>, pick each student and tick the lessons they completed. The ICT competencies fill in automatically — that is all you have to do.</> },
              ].map((s, i) => (
                <li key={i} className="flex gap-3">
                  <span className="w-7 h-7 rounded-lg bg-blue-600 text-white text-xs font-black flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
                  <div>
                    <div className="font-bold text-gray-900 text-sm">{s.t}</div>
                    <div className="text-sm text-gray-600 leading-relaxed">{s.d}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>

          {/* 2 — Student logins */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-gray-900 mb-3 flex items-center gap-2">🔑 Student logins</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc pl-5">
              <li>Each student logs in with the <b>class code + their username</b> — no password, no PIN.</li>
              <li>Find both in <Link href="/dashboard/coach/classes" className="text-blue-600 font-semibold hover:underline">My Classes → Students</Link>; use <b>Print roster</b> for handout login cards.</li>
              <li>Students go to the site → <b>Log In → Student</b>, enter the code and username.</li>
              <li>They are invited to bring a <b>tablet or laptop</b> so their progress saves to their own account.</li>
              <li>Students only see the lessons assigned to your class — nothing else.</li>
            </ul>
          </div>

          {/* 3 — Plan & lessons */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-gray-900 mb-3 flex items-center gap-2">🗓️ Your plan &amp; the lessons</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc pl-5">
              <li>The plan is built day by day in <Link href="/dashboard/coach/classes" className="text-blue-600 font-semibold hover:underline">My Classes → Lesson Plan</Link>: pick a <b>theme</b>, then a <b>lesson</b>, and add it to a day. Everything saves automatically.</li>
              <li><b>Day 1 = Wednesday 1 July 2026.</b> The <Link href="/dashboard/coach/schedule" className="text-blue-600 font-semibold hover:underline">Schedule</Link> maps every plan day onto the real calendar and highlights today.</li>
              <li>Inside a lesson, use the <b>Coach / Student</b> toggle: Coach view has the prep, steps, answers and walkthrough; Student view is what you project.</li>
              <li>Need paper? Every lesson has a <b>Print / PDF</b> button that produces a clean coach sheet.</li>
            </ul>
          </div>

          {/* 4 — Files */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-gray-900 mb-3 flex items-center gap-2">📁 Files &amp; downloads</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc pl-5">
              <li>Each lesson&apos;s <b>Resources</b> tab lists its files (PDFs, worksheets, code). As an approved coach you get one-click direct downloads.</li>
              <li>Anything not linked yet lives in the shared{' '}
                {ACADEMY_DRIVE_FOLDER
                  ? <a href={ACADEMY_DRIVE_FOLDER} target="_blank" rel="noopener noreferrer" className="text-blue-600 font-semibold hover:underline">academy Google Drive</a>
                  : <b>academy Google Drive</b>} — the same folder is linked from your dashboard.</li>
            </ul>
          </div>

          {/* 5 — Progress & parents */}
          <div className="bg-white rounded-2xl border border-gray-100 p-6">
            <h2 className="font-black text-gray-900 mb-3 flex items-center gap-2">📈 Progress &amp; parent reports</h2>
            <ul className="space-y-2 text-sm text-gray-600 leading-relaxed list-disc pl-5">
              <li>You only <b>tick lessons</b> in <Link href="/dashboard/coach/progress" className="text-blue-600 font-semibold hover:underline">Competencies</Link>; the ICT competencies (computational thinking, coding, robotics…) are credited automatically.</li>
              <li>Ticking from <b>All lessons</b> is fine too — use the search if you taught something outside the plan.</li>
              <li><b>You never message parents directly.</b> The director reviews each generated report, edits it if needed, and sends it (WhatsApp/email).</li>
            </ul>
          </div>

          {/* 6 — Confidentiality */}
          <div className="bg-white rounded-2xl border-2 border-amber-100 p-6" style={{ background: '#FFFBEB' }}>
            <h2 className="font-black text-gray-900 mb-3 flex items-center gap-2">🔒 Keep it in the family</h2>
            <ul className="space-y-2 text-sm text-gray-700 leading-relaxed list-disc pl-5">
              <li>The curriculum and files are the academy&apos;s teaching material — <b>don&apos;t share them outside RoboHolic</b>.</li>
              <li>Pages carry a faint watermark with your account, so shared screenshots are traceable.</li>
              <li>Student and parent details (names, phones, emails) stay inside the platform.</li>
            </ul>
          </div>

          <div className="text-center pt-2">
            <Link href="/dashboard/coach" className="inline-flex items-center gap-1.5 text-sm text-blue-600 font-bold hover:underline">
              Back to your dashboard <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
