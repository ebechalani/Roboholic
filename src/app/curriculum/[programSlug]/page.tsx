'use client';

import Link from 'next/link';
import { ArrowLeft, Clock, Users, BarChart2, ChevronRight, BookOpen, CheckCircle, Lock } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { getProgramBySlug } from '@/lib/data';
import { getCourseByProgramSlug, AVAILABLE_LESSON_IDS } from '@/lib/curricula';
import type { Course } from '@/types';

// Pull the course for this program from the curriculum registry.
function getCourseForProgram(slug: string): Course | null {
  return getCourseByProgramSlug(slug) ?? null;
}

function DifficultyStars({ difficulty }: { difficulty: number }) {
  return (
    <span className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`text-sm ${i <= difficulty ? 'text-amber-400' : 'text-gray-200'}`}>★</span>
      ))}
    </span>
  );
}

export default function ProgramPage({ params }: { params: { programSlug: string } }) {
  const { programSlug } = params;
  const program = getProgramBySlug(programSlug);
  const course = getCourseForProgram(programSlug);

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">🤔</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Program Not Found</h1>
          <Link href="/curriculum" className="text-blue-600 hover:underline">← Back to Curriculum</Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-50">

        {/* Program hero header */}
        <div className="relative overflow-hidden py-12" style={{ backgroundColor: program.color }}>
          <div className="section-pattern absolute inset-0 opacity-30" />
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-white/70 text-sm mb-6">
              <Link href="/curriculum" className="hover:text-white transition-colors flex items-center gap-1">
                <ArrowLeft size={14} /> Curriculum
              </Link>
              <ChevronRight size={14} />
              <span className="text-white font-medium">{program.title}</span>
            </div>

            <div className="flex items-start gap-6">
              <div className="text-6xl lg:text-7xl">{program.icon}</div>
              <div className="flex-1">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge-pill bg-white/20 text-white text-sm capitalize">{program.category}</span>
                  {program.levels.map(l => (
                    <span key={l} className="badge-pill bg-white/20 text-white text-sm">{l}</span>
                  ))}
                </div>
                <h1 className="text-3xl lg:text-4xl font-black text-white mb-3">{program.title}</h1>
                <p className="text-white/75 text-base max-w-2xl leading-relaxed mb-4">{program.description}</p>

                <div className="flex flex-wrap gap-6">
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <BookOpen size={15} /> {program.courseCount} courses
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <CheckCircle size={15} /> {program.lessonCount} lessons
                  </div>
                  <div className="flex items-center gap-2 text-white/80 text-sm">
                    <Users size={15} />
                    {program.ageGroups.map(ag => `Ages ${ag}`).join(', ')}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

          {course ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

              {/* Course overview sidebar */}
              <div className="space-y-5">
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Course Overview</h3>
                  <div className="space-y-3">
                    {[
                      { label: 'Duration', value: course.duration, icon: <Clock size={15} /> },
                      { label: 'Lessons', value: `${course.lessonCount} lessons`, icon: <BookOpen size={15} /> },
                      { label: 'Age Group', value: `Ages ${course.ageGroup}`, icon: <Users size={15} /> },
                      { label: 'Level', value: course.level, icon: <BarChart2 size={15} /> },
                    ].map(item => (
                      <div key={item.label} className="flex items-center gap-3">
                        <div className="text-gray-400 shrink-0">{item.icon}</div>
                        <div>
                          <div className="text-xs text-gray-400">{item.label}</div>
                          <div className="text-sm font-semibold text-gray-900">{item.value}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skills */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Skills Developed</h3>
                  <div className="flex flex-wrap gap-2">
                    {course.skills.map(skill => (
                      <span key={skill} className="badge-pill text-xs text-white font-semibold"
                        style={{ backgroundColor: program.color }}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Objectives */}
                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                  <h3 className="font-bold text-gray-900 mb-4">Course Objectives</h3>
                  <ul className="space-y-2">
                    {course.objectives.map((obj, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: program.color }} />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Modules & Lessons */}
              <div className="lg:col-span-2 space-y-5">
                {course.modules.map((mod, modIdx) => (
                  <div key={mod.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                    {/* Module header */}
                    <div className="px-6 py-4 border-b border-gray-50 flex items-center gap-3"
                      style={{ backgroundColor: program.color + '08' }}>
                      <div className="w-8 h-8 rounded-xl flex items-center justify-center text-white font-black text-sm"
                        style={{ backgroundColor: program.color }}>
                        {modIdx + 1}
                      </div>
                      <div className="flex-1">
                        <h3 className="font-bold text-gray-900">{mod.title}</h3>
                        <p className="text-xs text-gray-500">{mod.description}</p>
                      </div>
                      <span className="badge-pill bg-gray-100 text-gray-500 text-xs">
                        {mod.lessons.length} lessons
                      </span>
                    </div>

                    {/* Lessons */}
                    <div className="divide-y divide-gray-50">
                      {mod.lessons.map((lesson) => {
                        const ready = AVAILABLE_LESSON_IDS.includes(lesson.id);
                        const row = (
                          <>
                            {/* Lesson number */}
                            <div className="w-7 h-7 rounded-full border-2 flex items-center justify-center shrink-0 text-xs font-bold transition-all group-hover:border-transparent group-hover:text-white"
                              style={{ borderColor: program.color, color: program.color }}>
                              {lesson.order}
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="font-semibold text-gray-900 text-sm group-hover:text-blue-700 transition-colors">
                                {lesson.title}
                              </div>
                              <div className="flex items-center gap-3 mt-1">
                                <span className="flex items-center gap-1 text-xs text-gray-400">
                                  <Clock size={11} /> {lesson.duration}
                                </span>
                                <DifficultyStars difficulty={lesson.difficulty} />
                              </div>
                            </div>

                            {/* Skills */}
                            <div className="hidden sm:flex flex-wrap gap-1">
                              {lesson.skills.slice(0, 2).map(skill => (
                                <span key={skill} className="badge-pill text-xs"
                                  style={{ backgroundColor: program.color + '15', color: program.textColor }}>
                                  {skill}
                                </span>
                              ))}
                            </div>

                            {ready ? (
                              <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-500 shrink-0 transition-all group-hover:translate-x-0.5" />
                            ) : (
                              <span className="badge-pill bg-gray-100 text-gray-400 text-xs shrink-0">Soon</span>
                            )}
                          </>
                        );
                        return ready ? (
                          <Link key={lesson.id} href={`/lessons/${lesson.id}`}
                            className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors group">
                            {row}
                          </Link>
                        ) : (
                          <div key={lesson.id} className="flex items-center gap-4 px-6 py-4 opacity-60 cursor-not-allowed" title="Coming soon">
                            {row}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Coming soon state */
            <div className="text-center py-20">
              <div className="text-6xl mb-6">{program.icon}</div>
              <h2 className="text-3xl font-black text-gray-900 mb-4">
                {program.title} — Coming Soon!
              </h2>
              <p className="text-gray-500 text-lg max-w-md mx-auto mb-8">
                We&apos;re building this curriculum right now. Upload your lesson materials and
                they&apos;ll appear here automatically once reviewed.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/resources/upload"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
                  style={{ backgroundColor: program.color }}>
                  Upload Resources
                </Link>
                <Link href="/curriculum"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-700 border-2 border-gray-200 text-sm hover:border-gray-400 transition-colors">
                  <ArrowLeft size={16} /> All Programs
                </Link>
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
