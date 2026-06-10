'use client';

import Link from 'next/link';
import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { STUDENT_DASHBOARD } from '@/lib/data';
import { SCRATCH_JR_COURSE, SCRATCH_JR_LESSONS_MAP } from '@/lib/curricula/scratch-jr';
import { CheckCircle, Circle, Play, Lock } from 'lucide-react';

export default function MyPathPage() {
  return (
    <RequireRole allow={['student', 'admin']}>
      <MyPath />
    </RequireRole>
  );
}

function MyPath() {
  const { profile } = useAuth();
  const course = SCRATCH_JR_COURSE;
  const ready = new Set(Object.keys(SCRATCH_JR_LESSONS_MAP));
  // Demo progress: first 2 lessons done, next is current.
  const completed = new Set(['sjb-l1', 'sjb-l2']);
  const allLessons = course.modules.flatMap(m => m.lessons);
  const currentIndex = allLessons.findIndex(l => !completed.has(l.id));

  return (
    <div className="flex min-h-screen" style={{ background: '#FFF7ED' }}>
      <Sidebar role="student" userName={profile?.full_name || STUDENT_DASHBOARD.studentName} userEmoji="⭐" />
      <main className="flex-1 ml-64">
        <header className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #F97316 100%)' }}>
          <h1 className="text-3xl font-black text-white mb-1">My Learning Path 🗺️</h1>
          <p className="text-white/75 font-medium">{course.title}</p>
        </header>

        <div className="p-8 max-w-3xl">
          <div className="relative pl-8">
            {/* vertical line */}
            <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-purple-200" />
            <div className="space-y-3">
              {allLessons.map((lesson, i) => {
                const isDone = completed.has(lesson.id);
                const isCurrent = i === currentIndex;
                const isReady = ready.has(lesson.id);
                const locked = !isDone && !isCurrent && i > currentIndex;
                const inner = (
                  <div className={`bg-white rounded-2xl border-2 p-4 flex items-center gap-4 ${
                    isCurrent ? 'border-orange-400' : 'border-gray-100'} ${isReady && !locked ? 'card-hover' : ''}`}>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-gray-400">Lesson {lesson.order}</span>
                        {isCurrent && <span className="badge-pill bg-orange-100 text-orange-600 text-xs">Current</span>}
                        {isDone && <span className="badge-pill bg-green-100 text-green-600 text-xs">Done</span>}
                      </div>
                      <div className="font-bold text-gray-900 text-sm">{lesson.title}</div>
                    </div>
                    {isReady && !locked && (
                      <span className="text-orange-500"><Play size={18} fill="currentColor" /></span>
                    )}
                  </div>
                );
                return (
                  <div key={lesson.id} className="relative">
                    {/* node */}
                    <div className="absolute -left-[1.45rem] top-5 w-6 h-6 rounded-full flex items-center justify-center"
                      style={{ background: isDone ? '#10B981' : isCurrent ? '#F97316' : '#E5E7EB' }}>
                      {isDone ? <CheckCircle size={14} className="text-white" />
                        : locked ? <Lock size={11} className="text-gray-500" />
                        : <Circle size={10} className="text-white" />}
                    </div>
                    {isReady && !locked
                      ? <Link href={`/lessons/${lesson.id}`}>{inner}</Link>
                      : inner}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
