'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { PROGRAMS, AGE_GROUPS, PROGRAM_CATEGORIES, getProgramsByCategory } from '@/lib/data';
import type { Program } from '@/types';

function ProgramCard({ p }: { p: Program }) {
  return (
    <Link
      href={`/curriculum/${p.slug}`}
      className="group relative bg-white rounded-2xl border-2 p-5 flex flex-col gap-3 card-hover overflow-hidden"
      style={{ borderColor: p.color + '25' }}
    >
      {/* Color accent bar */}
      <div className="absolute top-0 left-0 right-0 h-1 rounded-t-2xl" style={{ backgroundColor: p.color }} />

      <div className="flex items-start justify-between pt-1">
        <div className="text-3xl">{p.icon}</div>
        <span
          className="badge-pill text-xs font-semibold"
          style={{ backgroundColor: p.color + '20', color: p.textColor }}
        >
          {p.category}
        </span>
      </div>

      <div>
        <h3 className="font-bold text-gray-900 mb-1 group-hover:text-blue-700 transition-colors">{p.title}</h3>
        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2">{p.description}</p>
      </div>

      <div className="flex flex-wrap gap-1">
        {p.ageGroups.map(ag => (
          <span key={ag} className="badge-pill bg-gray-100 text-gray-500 text-xs">Ages {ag}</span>
        ))}
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-gray-50">
        <div className="flex items-center gap-1">
          {['Beginner', 'Intermediate', 'Advanced'].map((l, i) => (
            <div key={l} className="w-2.5 h-2.5 rounded-full"
              style={{ backgroundColor: p.levels.includes(l as 'Beginner' | 'Intermediate' | 'Advanced') ? p.color : '#E5E7EB' }}
              title={l} />
          ))}
          <span className="text-xs text-gray-400 ml-1">{p.levels.join(' · ')}</span>
        </div>
        <ArrowRight size={14} className="text-gray-300 group-hover:text-blue-500 group-hover:translate-x-0.5 transition-all" />
      </div>
    </Link>
  );
}

function CurriculumGrid() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAge, setSelectedAge] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = PROGRAMS.filter(p => {
    const catOk = selectedCategory === 'all' || p.category === selectedCategory;
    const ageOk = selectedAge === 'all' || p.ageGroups.includes(selectedAge as import('@/types').AgeGroupId);
    const searchOk = !searchQuery ||
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags || []).some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return catOk && ageOk && searchOk;
  });

  return (
    <div>
      {/* Filters */}
      <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 mb-8">
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search programs, technologies, skills..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-400"
            />
          </div>

          {/* Category filter */}
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
          >
            {PROGRAM_CATEGORIES.map(c => (
              <option key={c.id} value={c.id}>{c.emoji} {c.label}</option>
            ))}
          </select>

          {/* Age filter */}
          <select
            value={selectedAge}
            onChange={e => setSelectedAge(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/20 bg-white"
          >
            <option value="all">All Ages</option>
            {AGE_GROUPS.map(ag => (
              <option key={ag.id} value={ag.id}>{ag.emoji} Ages {ag.id}</option>
            ))}
          </select>
        </div>

        {/* Category chips */}
        <div className="flex flex-wrap gap-2 mt-4">
          {PROGRAM_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`badge-pill text-sm font-semibold border transition-all ${
                selectedCategory === cat.id
                  ? 'bg-gray-900 text-white border-gray-900'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              {cat.emoji} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500">
          Showing <span className="font-bold text-gray-900">{filtered.length}</span> of {PROGRAMS.length} programs
        </p>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(p => <ProgramCard key={p.id} p={p} />)}
        </div>
      ) : (
        <div className="text-center py-20">
          <div className="text-5xl mb-4">🔍</div>
          <h3 className="font-bold text-gray-900 mb-2">No programs found</h3>
          <p className="text-gray-500 text-sm">Try adjusting your filters or search terms.</p>
          <button
            onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedAge('all'); }}
            className="mt-4 text-blue-600 text-sm font-semibold hover:underline"
          >
            Clear all filters
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Age Group Grid view ──────────────────────────────────────────
function AgeGroupView() {
  return (
    <div className="space-y-10">
      {AGE_GROUPS.map(ag => {
        const programs = PROGRAMS.filter(p => p.ageGroups.includes(ag.id));
        return (
          <div key={ag.id}>
            <div className="flex items-center gap-3 mb-5">
              <span className="text-2xl">{ag.emoji}</span>
              <div>
                <h2 className="font-black text-gray-900 text-xl">{ag.label}</h2>
                <p className="text-gray-500 text-sm">{ag.description}</p>
              </div>
              <span className="ml-auto badge-pill bg-gray-100 text-gray-500 font-semibold">
                {programs.length} programs
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {programs.map(p => <ProgramCard key={p.id} p={p} />)}
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Main Curriculum Page ─────────────────────────────────────────
export default function CurriculumPage() {
  const [view, setView] = useState<'grid' | 'byAge'>('grid');

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>

        {/* Header */}
        <div className="hero-bg section-pattern py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl">
              <div className="badge-pill glass text-white/80 text-sm mb-6 inline-flex">
                📚 Complete Curriculum Map
              </div>
              <h1 className="text-4xl sm:text-5xl font-black text-white mb-4">
                26 Programs.<br />One Curriculum.
              </h1>
              <p className="text-white/60 text-lg max-w-xl">
                Browse all robotics, coding, electronics, and design programs.
                Filter by age group, level, or technology to find exactly what you need.
              </p>
            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0">
            <svg viewBox="0 0 1440 40" fill="none"><path d="M0 40L1440 40L1440 20C1200 40 960 0 720 0C480 0 240 40 0 20L0 40Z" fill="#F8FAFF" /></svg>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative">

          {/* View toggle */}
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-black text-gray-900 text-2xl">All Programs</h2>
            <div className="flex items-center gap-1 bg-white rounded-xl p-1 border border-gray-200 shadow-sm">
              <button
                onClick={() => setView('grid')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  view === 'grid' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                🔲 Grid
              </button>
              <button
                onClick={() => setView('byAge')}
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
                  view === 'byAge' ? 'bg-gray-900 text-white shadow-sm' : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                👶 By Age
              </button>
            </div>
          </div>

          {view === 'grid' ? <CurriculumGrid /> : <AgeGroupView />}
        </div>
      </main>
      <Footer />
    </>
  );
}
