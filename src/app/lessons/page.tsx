'use client';

import Link from 'next/link';
import { Clock, ChevronRight, BookOpen, Search } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import { ALL_COURSES, AVAILABLE_LESSON_IDS } from '@/lib/curricula';
import { PROGRAMS } from '@/lib/data';

function DifficultyStars({ d }: { d: number }) {
  return <span className="text-amber-400 text-xs">{'★'.repeat(d)}<span className="text-gray-200">{'★'.repeat(5 - d)}</span></span>;
}

export default function LessonLibraryPage() {
  const [q, setQ] = useState('');
  const query = q.toLowerCase();

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="📖 Lesson Library"
          title="All Lessons"
          subtitle="Browse, search, and open ready-to-teach interactive lessons. More are added as your curriculum grows."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Search */}
          <div className="relative max-w-md mb-8">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={q} onChange={e => setQ(e.target.value)}
              placeholder="Search lessons…"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          {/* Each course */}
          {ALL_COURSES.map(course => {
            const lessons = course.modules
              .flatMap(m => m.lessons)
              .filter(l => l.title.toLowerCase().includes(query));
            if (lessons.length === 0) return null;
            return (
              <div key={course.id} className="mb-10">
                <div className="mb-4">
                  <h2 className="font-black text-gray-900 text-lg">{course.title}</h2>
                  <p className="text-xs text-gray-500">Ages {course.ageGroup} · {course.level} · {course.lessonCount} lessons</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {lessons.map(lesson => {
                    const ready = AVAILABLE_LESSON_IDS.includes(lesson.id);
                    const inner = (
                      <div className={`bg-white rounded-2xl border p-5 h-full transition-all ${ready ? 'border-gray-100 card-hover cursor-pointer' : 'border-dashed border-gray-200 opacity-70'}`}>
                        <div className="flex items-center justify-between mb-2">
                          <span className="badge-pill bg-blue-50 text-blue-700 text-xs">Lesson {lesson.order}</span>
                          {ready
                            ? <span className="badge-pill bg-green-50 text-green-600 text-xs">Ready</span>
                            : <span className="badge-pill bg-gray-100 text-gray-400 text-xs">Soon</span>}
                        </div>
                        <h3 className="font-bold text-gray-900 text-sm mb-2">{lesson.title}</h3>
                        <div className="flex items-center gap-3 mb-3">
                          <span className="flex items-center gap-1 text-xs text-gray-400"><Clock size={11} /> {lesson.duration}</span>
                          <DifficultyStars d={lesson.difficulty} />
                        </div>
                        <div className="flex flex-wrap gap-1">
                          {lesson.skills.slice(0, 2).map(s => (
                            <span key={s} className="badge-pill bg-gray-100 text-gray-500 text-xs">{s}</span>
                          ))}
                        </div>
                        {ready && (
                          <div className="flex items-center gap-1 text-blue-600 text-xs font-semibold mt-3">
                            Open lesson <ChevronRight size={13} />
                          </div>
                        )}
                      </div>
                    );
                    return ready
                      ? <Link key={lesson.id} href={`/lessons/${lesson.id}`}>{inner}</Link>
                      : <div key={lesson.id}>{inner}</div>;
                  })}
                </div>
              </div>
            );
          })}

          {/* Other programs */}
          <h2 className="font-black text-gray-900 text-lg mt-12 mb-4">Explore Lessons by Program</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROGRAMS.map(p => (
              <Link key={p.id} href={`/curriculum/${p.slug}`}
                className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 text-center card-hover"
                style={{ borderColor: p.color + '30', backgroundColor: p.bgColor }}>
                <span className="text-2xl">{p.icon}</span>
                <span className="text-xs font-semibold text-gray-700 leading-tight">{p.shortTitle || p.title}</span>
              </Link>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
