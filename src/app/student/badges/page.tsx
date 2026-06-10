'use client';

import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { BADGES, STUDENT_DASHBOARD } from '@/lib/data';
import { Lock } from 'lucide-react';

export default function BadgesPage() {
  return (
    <RequireRole allow={['student', 'admin']}>
      <Badges />
    </RequireRole>
  );
}

function Badges() {
  const { profile } = useAuth();
  const earnedIds = new Set(STUDENT_DASHBOARD.badges.map(b => b.id));

  const CATEGORY_LABELS: Record<string, string> = {
    progress: '🚀 Progress', skill: '🧠 Skills', achievement: '🏅 Achievements', competition: '🏆 Competition',
  };
  const byCategory = BADGES.reduce<Record<string, typeof BADGES>>((acc, b) => {
    (acc[b.category] ||= []).push(b); return acc;
  }, {});

  return (
    <div className="flex min-h-screen" style={{ background: '#FFF7ED' }}>
      <Sidebar role="student" userName={profile?.full_name || STUDENT_DASHBOARD.studentName} userEmoji="⭐" />
      <main className="flex-1 ml-64">
        <header className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #F97316 100%)' }}>
          <h1 className="text-3xl font-black text-white mb-1">My Badges 🏅</h1>
          <p className="text-white/75 font-medium">
            You&apos;ve earned {earnedIds.size} of {BADGES.length} badges. Keep going!
          </p>
        </header>

        <div className="p-8 space-y-8 max-w-5xl">
          {Object.entries(byCategory).map(([cat, badges]) => (
            <div key={cat}>
              <h2 className="font-black text-gray-900 text-lg mb-4">{CATEGORY_LABELS[cat] || cat}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 gap-4">
                {badges.map(b => {
                  const earned = earnedIds.has(b.id);
                  return (
                    <div key={b.id} className={`bg-white rounded-2xl border-2 p-4 text-center ${earned ? '' : 'opacity-50'}`}
                      style={{ borderColor: earned ? b.color + '50' : '#E5E7EB' }}>
                      <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mx-auto mb-2"
                        style={{ backgroundColor: earned ? b.color + '20' : '#F3F4F6' }}>
                        {earned ? b.icon : <Lock size={20} className="text-gray-400" />}
                      </div>
                      <div className="font-bold text-gray-900 text-xs leading-tight mb-1">{b.name}</div>
                      <div className="text-[11px] text-gray-400 leading-tight">{earned ? b.description : 'Locked'}</div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
