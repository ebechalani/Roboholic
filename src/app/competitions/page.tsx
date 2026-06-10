import Link from 'next/link';
import { Trophy, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import { PROGRAMS } from '@/lib/data';

export default function CompetitionsPage() {
  const compPrograms = PROGRAMS.filter(p => p.category === 'competition');

  const PILLARS = [
    { emoji: '📋', title: 'Competition Rules', text: 'Official rulebooks and scoring guides for MakeX and other competitions.' },
    { emoji: '⚙️', title: 'Robot Strategy', text: 'Design and build strategies to maximize your match score.' },
    { emoji: '💻', title: 'Programming Drills', text: 'Practice autonomous routines and sensor algorithms under time pressure.' },
    { emoji: '🤝', title: 'Team Coordination', text: 'Roles, communication, pit management, and presentation skills.' },
  ];

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="🏆 Competition Hub"
          title="Train to Win"
          subtitle="MakeX preparation, competition training, and the skills your teams need to excel."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Programs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-12">
            {compPrograms.map(p => (
              <Link key={p.id} href={`/curriculum/${p.slug}`}
                className="bg-white rounded-2xl border-2 p-6 card-hover flex items-start gap-4"
                style={{ borderColor: p.color + '30' }}>
                <div className="text-4xl">{p.icon}</div>
                <div>
                  <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                  <p className="text-xs text-gray-500 mb-3 leading-relaxed">{p.description}</p>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: p.color }}>
                    Open program <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Pillars */}
          <h2 className="font-black text-gray-900 text-xl mb-5 flex items-center gap-2">
            <Trophy className="text-amber-500" size={22} /> What competition training covers
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PILLARS.map(item => (
              <div key={item.title} className="bg-white rounded-2xl border border-gray-100 p-5 card-hover">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <h3 className="font-bold text-gray-900 text-sm mb-1">{item.title}</h3>
                <p className="text-xs text-gray-500 leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
