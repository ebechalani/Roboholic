'use client';

import Link from 'next/link';
import { Star, Trophy, Zap, ArrowRight, CheckCircle, Play, Upload, Lock } from 'lucide-react';
import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { STUDENT_DASHBOARD, BADGES } from '@/lib/data';

function MissionPoints({ points }: { points: number }) {
  return (
    <div className="flex items-center gap-2 px-4 py-2 rounded-full text-white font-bold text-sm shadow-lg"
      style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
      <Zap size={16} fill="currentColor" />
      {points.toLocaleString()} Mission Points
    </div>
  );
}

function ProgressRing({ percent }: { percent: number }) {
  const r = 45;
  const circ = 2 * Math.PI * r;
  const offset = circ - (percent / 100) * circ;
  return (
    <svg width="120" height="120" className="-rotate-90">
      <circle cx="60" cy="60" r={r} fill="none" stroke="#E5E7EB" strokeWidth="10" />
      <circle
        cx="60" cy="60" r={r} fill="none"
        stroke="#F97316" strokeWidth="10"
        strokeDasharray={circ}
        strokeDashoffset={offset}
        strokeLinecap="round"
        className="transition-all duration-700"
      />
    </svg>
  );
}

export default function StudentDashboardPage() {
  return (
    <RequireRole allow={['student', 'admin']}>
      <StudentDashboard />
    </RequireRole>
  );
}

function StudentDashboard() {
  const { profile } = useAuth();
  const data = { ...STUDENT_DASHBOARD, studentName: profile?.full_name || STUDENT_DASHBOARD.studentName };

  return (
    <div className="flex min-h-screen" style={{ background: '#FFF7ED' }}>
      <Sidebar role="student" userName={data.studentName} userEmoji="⭐" />

      <main className="flex-1 ml-64">
        {/* Fun colorful header */}
        <header className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #F97316 100%)' }}>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-black text-white mb-1">
                Hey {data.studentName}! 👋
              </h1>
              <p className="text-white/75 font-medium">
                Ready for your next mission? Let&apos;s code something amazing! 🚀
              </p>
            </div>
            <MissionPoints points={data.missionPoints} />
          </div>
        </header>

        <div className="p-8 space-y-8 max-w-6xl">

          {/* Progress + Next Lesson */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Progress card */}
            <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-purple-100 flex flex-col items-center justify-center text-center">
              <div className="relative">
                <ProgressRing percent={data.progress} />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="text-2xl font-black text-gray-900">{data.progress}%</div>
                  <div className="text-xs text-gray-400 font-medium">Done!</div>
                </div>
              </div>
              <div className="mt-3">
                <div className="font-bold text-gray-900 text-sm">{data.currentProgram}</div>
                <div className="text-xs text-gray-400">Current program</div>
              </div>
            </div>

            {/* Next mission */}
            <div className="lg:col-span-2 bg-white rounded-3xl p-6 shadow-sm border-2 border-orange-100">
              <div className="flex items-center gap-2 text-orange-600 font-bold text-sm mb-4">
                <Zap size={16} fill="currentColor" /> YOUR NEXT MISSION
              </div>
              <h2 className="text-2xl font-black text-gray-900 mb-2">{data.nextLesson.title} 🚀</h2>
              <p className="text-gray-500 text-sm mb-6">
                Duration: {data.nextLesson.duration} — You&apos;ve got this!
              </p>
              <div className="flex gap-3">
                <Link
                  href={`/lessons/${data.nextLesson.id}`}
                  className="flex items-center gap-2 px-6 py-3 rounded-2xl font-bold text-white text-sm transition-all hover:scale-105 shadow-md"
                  style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}
                >
                  <Play size={16} fill="currentColor" /> Start Mission!
                </Link>
                <Link
                  href="/student/my-path"
                  className="flex items-center gap-2 px-5 py-3 rounded-2xl font-semibold text-gray-600 border-2 border-gray-200 text-sm hover:border-gray-400 transition-all"
                >
                  My Learning Path <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          </div>

          {/* Badges section */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-yellow-100">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-black text-gray-900 text-xl flex items-center gap-2">
                <Trophy className="text-yellow-500" size={22} /> My Badges
              </h2>
              <Link href="/student/badges" className="text-sm text-orange-600 font-semibold hover:underline flex items-center gap-1">
                See all <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-4">
              {/* Earned badges */}
              {data.badges.map(badge => (
                <div key={badge.id} className="flex flex-col items-center gap-1 text-center">
                  <div
                    className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-sm border-2"
                    style={{ backgroundColor: badge.color + '20', borderColor: badge.color + '40' }}
                    title={badge.name}
                  >
                    {badge.icon}
                  </div>
                  <span className="text-xs font-semibold text-gray-600 leading-tight">{badge.name}</span>
                  <span className="text-xs text-gray-300">{badge.earnedDate}</span>
                </div>
              ))}

              {/* Locked badges */}
              {BADGES.slice(data.badges.length, data.badges.length + 3).map(badge => (
                <div key={badge.id} className="flex flex-col items-center gap-1 text-center opacity-40">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center bg-gray-100 border-2 border-gray-200 relative">
                    <Lock size={20} className="text-gray-400" />
                  </div>
                  <span className="text-xs font-semibold text-gray-400 leading-tight">{badge.name}</span>
                  <span className="text-xs text-gray-300">Locked</span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent activity */}
          <div className="bg-white rounded-3xl p-6 shadow-sm border-2 border-green-100">
            <h2 className="font-black text-gray-900 text-xl flex items-center gap-2 mb-5">
              <CheckCircle className="text-green-500" size={22} /> What I&apos;ve Done 🎉
            </h2>
            <div className="space-y-3">
              {data.recentActivity.map((item, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-green-50 border border-green-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl bg-green-500 flex items-center justify-center text-white">
                      <CheckCircle size={14} />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-sm">{item.lessonTitle}</div>
                      <div className="text-xs text-gray-400">{item.date}</div>
                    </div>
                  </div>
                  {item.score !== undefined && (
                    <div className="flex items-center gap-1">
                      <Star size={14} className="text-yellow-500" fill="currentColor" />
                      <span className="font-bold text-gray-900 text-sm">{item.score}%</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit project card */}
          <div className="rounded-3xl p-6 text-white text-center"
            style={{ background: 'linear-gradient(135deg, #7C3AED, #2563EB)' }}>
            <div className="text-4xl mb-3">📤</div>
            <h2 className="font-black text-2xl mb-2">Submit Your Project!</h2>
            <p className="text-white/70 text-sm mb-5">
              Finished something awesome? Share it with your coach! Upload a photo or video.
            </p>
            <Link
              href="/student/submit"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-white font-bold text-purple-700 text-sm hover:scale-105 transition-all shadow-lg"
            >
              <Upload size={16} /> Submit Project
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
