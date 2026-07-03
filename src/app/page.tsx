'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Users, GraduationCap, Trophy, ArrowRight, CheckCircle, Star, Zap, Shield, Download, BarChart, Layers } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { useAuth } from '@/lib/auth/AuthProvider';
import { PROGRAMS, PROGRAM_CATEGORIES, AGE_GROUPS } from '@/lib/data';

// ─── Hero Section ─────────────────────────────────────────────────
function HeroSection() {
  const { role } = useAuth();
  return (
    <section className="relative hero-bg section-pattern min-h-[92vh] flex flex-col justify-center overflow-hidden">
      {/* Decorative animated blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full opacity-10 blur-3xl animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #F97316, transparent)' }} />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full opacity-10 blur-3xl animate-pulse-slow"
          style={{ background: 'radial-gradient(circle, #7C3AED, transparent)', animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 blur-3xl"
          style={{ background: 'radial-gradient(circle, #2563EB, transparent)' }} />
      </div>

      {/* Floating decorative elements */}
      <div className="absolute top-20 right-8 lg:right-20 text-6xl lg:text-8xl animate-float opacity-80" style={{ animationDelay: '0s' }}>🤖</div>
      <div className="absolute bottom-24 right-20 lg:right-48 text-4xl animate-float opacity-60" style={{ animationDelay: '0.8s' }}>⚡</div>
      <div className="absolute top-1/3 right-1/4 text-3xl animate-float opacity-40" style={{ animationDelay: '1.6s' }}>💡</div>
      <div className="absolute bottom-1/3 right-8 text-2xl animate-float opacity-50" style={{ animationDelay: '2.4s' }}>🏆</div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 glass rounded-full px-4 py-2 mb-8 border border-white/20">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white/80 text-sm font-medium">Official Curriculum Platform — RoboHolic Robotics Academy</span>
          </div>

          {/* Main headline */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Build.{' '}
            <span style={{ background: 'linear-gradient(90deg, #F97316, #FCD34D)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Code.
            </span>
            <br />
            Innovate. 🚀
          </h1>

          <p className="text-white/65 text-lg sm:text-xl leading-relaxed mb-10 max-w-xl">
            Everything your coaches and students need — lesson plans, interactive activities,
            projects, quizzes, and progress tracking — all in one place.
          </p>

          {/* CTA buttons — role-aware: signed-in staff go straight to their tools */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12">
            {role === 'admin' ? (
              <>
                <Link href="/admin"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                  <GraduationCap size={20} /> Admin Panel <ArrowRight size={16} />
                </Link>
                <Link href="/dashboard/coach"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
                  <Star size={20} /> Coach Dashboard <ArrowRight size={16} />
                </Link>
              </>
            ) : role === 'coach' ? (
              <>
                <Link href="/dashboard/coach"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                  <GraduationCap size={20} /> My Dashboard <ArrowRight size={16} />
                </Link>
                <Link href="/dashboard/coach/schedule"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
                  <Star size={20} /> Today&apos;s Schedule <ArrowRight size={16} />
                </Link>
              </>
            ) : (
              <>
                <Link href="/login"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #2563EB, #1D4ED8)' }}>
                  <GraduationCap size={20} /> I&apos;m a Coach <ArrowRight size={16} />
                </Link>
                <Link href="/login?tab=student"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl text-white font-bold text-base transition-all hover:scale-105 hover:shadow-xl shadow-lg"
                  style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
                  <Star size={20} /> I&apos;m a Student <ArrowRight size={16} />
                </Link>
              </>
            )}
          </div>

          {/* Quick stats */}
          <div className="flex flex-wrap gap-6">
            {[
              { value: '300+', label: 'Lessons' },
              { value: String(PROGRAMS.length), label: 'Technologies' },
              { value: '5',    label: 'Age Groups' },
              { value: '3',    label: 'Levels' },
            ].map(stat => (
              <div key={stat.label} className="flex items-center gap-2">
                <span className="text-white font-black text-2xl">{stat.value}</span>
                <span className="text-white/50 text-sm font-medium">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 80L1440 80L1440 40C1200 80 960 0 720 0C480 0 240 80 0 40L0 80Z" fill="white" />
        </svg>
      </div>
    </section>
  );
}

// ─── Programs Section ─────────────────────────────────────────────
function ProgramsSection() {
  const [activeCategory, setActiveCategory] = useState('all');

  const filtered = activeCategory === 'all'
    ? PROGRAMS
    : PROGRAMS.filter(p => p.category === activeCategory);

  return (
    <section className="py-20 bg-white" id="programs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Layers size={14} /> {PROGRAMS.length} Programs
          </div>
          <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-4">
            One Platform.{' '}
            <span style={{ background: 'linear-gradient(90deg, #2563EB, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Everything.
            </span>
          </h2>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            From simple machines for 4-year-olds to AI and IoT for teens — the complete RoboHolic curriculum in one place.
          </p>
        </div>

        {/* Category filter chips */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {PROGRAM_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold transition-all border ${
                activeCategory === cat.id
                  ? 'bg-gray-900 text-white border-gray-900 shadow-md'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'
              }`}
            >
              <span>{cat.emoji}</span> {cat.label}
            </button>
          ))}
        </div>

        {/* Programs grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map(program => (
            <ProgramCard key={program.id} program={program} />
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/curriculum"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-semibold text-white transition-all hover:opacity-90"
            style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}
          >
            View Full Curriculum Map <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
}

function ProgramCard({ program }: { program: typeof PROGRAMS[0] }) {
  return (
    <Link
      href={`/curriculum/${program.slug}`}
      className="group block rounded-2xl border-2 p-5 card-hover cursor-pointer"
      style={{
        borderColor: program.color + '30',
        backgroundColor: program.bgColor,
      }}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="text-3xl">{program.icon}</div>
        <div className="flex flex-col items-end gap-1">
          {program.courseCount && (
            <span className="text-xs font-medium text-gray-400">{program.courseCount} courses</span>
          )}
        </div>
      </div>

      <h3 className="font-bold text-gray-900 text-sm mb-1 group-hover:text-opacity-80">
        {program.title}
      </h3>
      <p className="text-xs text-gray-500 mb-3 line-clamp-2 leading-relaxed">
        {program.description}
      </p>

      {/* Age group tags */}
      <div className="flex flex-wrap gap-1 mb-3">
        {program.ageGroups.map(ag => (
          <span
            key={ag}
            className="text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ backgroundColor: program.color + '20', color: program.textColor }}
          >
            {ag}
          </span>
        ))}
      </div>

      {/* Level dots */}
      <div className="flex items-center gap-1">
        {['Beginner', 'Intermediate', 'Advanced'].map(level => (
          <div
            key={level}
            className="w-2 h-2 rounded-full"
            style={{
              backgroundColor: program.levels.includes(level as 'Beginner' | 'Intermediate' | 'Advanced')
                ? program.color
                : '#E5E7EB',
            }}
            title={level}
          />
        ))}
        <span className="text-xs text-gray-400 ml-1">
          {program.levels[0]}
          {program.levels.length > 1 ? ` – ${program.levels[program.levels.length - 1]}` : ''}
        </span>
      </div>
    </Link>
  );
}

// ─── Features Section ─────────────────────────────────────────────
const COACH_FEATURES = [
  { icon: <BookOpen size={20} />, title: 'Complete Lesson Plans',      text: 'Every lesson includes objectives, materials, step-by-step instructions, coach notes, troubleshooting, and assessments.' },
  { icon: <BarChart size={20} />, title: 'ICT Competency Tracking',    text: 'Tick the lessons a student completes — the ICT competencies fill in automatically and feed director-approved parent reports.' },
  { icon: <Shield size={20} />,   title: 'Attendance & Schedule',      text: 'A one-tap daily roll call, and the whole camp mapped week by week with today\'s lessons highlighted.' },
  { icon: <Download size={20} />, title: 'Downloadable Resources',     text: 'Every lesson file deep-linked to the academy Drive — one click to download or print, plus clean PDF coach sheets.' },
];

const STUDENT_FEATURES = [
  { icon: '🚀', title: 'Mission Mode',         text: 'Every lesson is a mission! Follow step-by-step instructions, complete challenges, and earn points.' },
  { icon: '🏅', title: 'Badges & Achievements', text: 'Earn cool badges for completing lessons, acing quizzes, finishing projects, and helping teammates.' },
  { icon: '🎯', title: 'Interactive Quizzes',   text: 'Test your knowledge with fun quizzes after each lesson. Get immediate feedback and try again!' },
  { icon: '📤', title: 'Submit Your Projects',  text: 'Upload photos or videos of your robot or project. Your coach will review and give you feedback.' },
];

function FeaturesSection() {
  const [activeTab, setActiveTab] = useState<'coach' | 'student'>('coach');

  return (
    <section className="py-20" style={{ background: '#F8FAFF' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Built for Everyone in the Classroom</h2>
          <p className="text-gray-500 text-lg">Different views, same powerful platform.</p>

          {/* Tab toggle */}
          <div className="inline-flex items-center gap-1 bg-white rounded-2xl p-1 shadow-sm border border-gray-100 mt-6">
            <button
              onClick={() => setActiveTab('coach')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'coach'
                  ? 'bg-gray-900 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              <GraduationCap size={16} /> For Coaches
            </button>
            <button
              onClick={() => setActiveTab('student')}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                activeTab === 'student'
                  ? 'text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              style={activeTab === 'student' ? { background: 'linear-gradient(135deg, #F97316, #DC2626)' } : {}}
            >
              <Star size={16} /> For Students
            </button>
          </div>
        </div>

        {activeTab === 'coach' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {COACH_FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 card-hover">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4">
                  {f.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {STUDENT_FEATURES.map(f => (
              <div key={f.title} className="bg-white rounded-2xl p-6 shadow-sm border border-orange-100 card-hover">
                <div className="text-3xl mb-4">{f.icon}</div>
                <h3 className="font-bold text-gray-900 mb-2">{f.title}</h3>
                <p className="text-sm text-gray-500 leading-relaxed">{f.text}</p>
              </div>
            ))}
          </div>
        )}

        {/* Feature list */}
        <div className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
            <h3 className="font-black text-xl text-gray-900 mb-6 flex items-center gap-2">
              <GraduationCap className="text-blue-600" size={22} /> Coach Platform Features
            </h3>
            <ul className="space-y-3">
              {[
                'Curriculum map organized by age, level & technology',
                'Step-by-step lesson plans with coach walkthroughs',
                'Daily attendance roll call & week-by-week camp schedule',
                'ICT competency tracking with director-approved parent reports',
                'Every lesson file downloadable from the academy Drive',
                'Coach-only notes hidden from students',
                'Print / PDF coach sheets for any lesson',
                'Competition preparation & training materials',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-green-500 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/login" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
              Coach Dashboard <ArrowRight size={14} />
            </Link>
          </div>

          <div className="bg-white rounded-2xl p-8 border border-orange-100 shadow-sm">
            <h3 className="font-black text-xl text-gray-900 mb-6 flex items-center gap-2">
              <Star className="text-orange-500" size={22} /> Student Platform Features
            </h3>
            <ul className="space-y-3">
              {[
                'Fun, mission-style lesson interface',
                'Clear step-by-step student instructions',
                'Interactive quizzes with immediate feedback',
                'Project submission with photo & video support',
                'Badges & achievement system',
                'Personal progress dashboard',
                'Only sees lessons assigned by coach',
                'Printable student worksheets',
              ].map(item => (
                <li key={item} className="flex items-start gap-3 text-sm text-gray-600">
                  <CheckCircle size={16} className="text-orange-400 mt-0.5 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <Link href="/login?tab=student" className="inline-flex items-center gap-2 mt-6 px-5 py-2.5 rounded-xl font-semibold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
              Student Dashboard <ArrowRight size={14} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Age Groups Section ───────────────────────────────────────────
function AgeGroupsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-black text-gray-900 mb-4">Curriculum for Every Age</h2>
          <p className="text-gray-500 text-lg max-w-xl mx-auto">
            Carefully designed for each stage of development — from kindergarten builders to teen engineers.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {AGE_GROUPS.map((ag, i) => {
            const bgColors = ['#FFF7ED', '#EFF6FF', '#ECFDF5', '#F5F3FF', '#FEF2F2'];
            const textColors = ['#C2410C', '#1D4ED8', '#047857', '#6D28D9', '#B91C1C'];
            const borderColors = ['#FED7AA', '#BFDBFE', '#A7F3D0', '#DDD6FE', '#FECACA'];
            return (
              <div key={ag.id}
                className="rounded-2xl p-6 text-center border-2 card-hover cursor-pointer"
                style={{ backgroundColor: bgColors[i], borderColor: borderColors[i] }}>
                <div className="text-4xl mb-3">{ag.emoji}</div>
                <div className="font-black text-gray-900 text-base mb-1">{ag.label}</div>
                <div className="text-xs font-semibold mb-3" style={{ color: textColors[i] }}>
                  {ag.id === '4-5' ? 'Tiny Engineers' :
                   ag.id === '6-7' ? 'Explorers' :
                   ag.id === '8-9' ? 'Builders' :
                   ag.id === '10-12' ? 'Innovators' : 'Engineers'}
                </div>
                <p className="text-xs text-gray-500 leading-relaxed">{ag.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ─── Competition Section ──────────────────────────────────────────
function CompetitionSection() {
  return (
    <section className="py-20 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #0F2044 0%, #1E3A8A 100%)' }}>
      <div className="section-pattern absolute inset-0" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-yellow-400/20 text-yellow-300 rounded-full px-4 py-1.5 text-sm font-semibold mb-6">
              <Trophy size={14} /> Competition Ready
            </div>
            <h2 className="text-4xl lg:text-5xl font-black text-white mb-6">
              Train to Win.<br />
              <span style={{ color: '#FCD34D' }}>Compete to Excel.</span>
            </h2>
            <p className="text-white/65 text-lg mb-8 leading-relaxed">
              Dedicated MakeX preparation modules, competition strategy training,
              time management drills, and team coordination — everything your students
              need to compete at the highest level.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/curriculum/makex"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-gray-900 text-sm transition-all hover:scale-105"
                style={{ background: '#FCD34D' }}>
                <Trophy size={16} /> MakeX Preparation
              </Link>
              <Link href="/curriculum/competition"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white border-2 border-white/30 text-sm transition-all hover:bg-white/10">
                Competition Training
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {[
              { emoji: '📋', title: 'Competition Rules',    text: 'Full rulebooks and guidelines for MakeX and other competitions' },
              { emoji: '⚙️', title: 'Robot Strategy',       text: 'Design and build strategies to maximize your score' },
              { emoji: '💻', title: 'Programming Drills',   text: 'Practice autonomous programs and sensor algorithms' },
              { emoji: '🤝', title: 'Team Coordination',    text: 'Roles, communication, and pit management skills' },
            ].map(item => (
              <div key={item.title} className="glass rounded-2xl p-5">
                <div className="text-2xl mb-2">{item.emoji}</div>
                <div className="font-bold text-white text-sm mb-1">{item.title}</div>
                <div className="text-white/55 text-xs leading-relaxed">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── CTA Section ──────────────────────────────────────────────────
function CTASection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="text-6xl mb-6">🚀</div>
        <h2 className="text-4xl lg:text-5xl font-black text-gray-900 mb-6">
          Ready to Transform Your<br />
          <span style={{ background: 'linear-gradient(90deg, #F97316, #7C3AED)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
            Robotics Classroom?
          </span>
        </h2>
        <p className="text-gray-500 text-lg mb-10 max-w-xl mx-auto">
          Join RoboHolic — where every lesson is a mission, every build is an adventure,
          and every student discovers they can create anything.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/login"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-white transition-all hover:scale-105 shadow-xl"
            style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
            <GraduationCap size={20} /> Enter Coach Portal
          </Link>
          <Link href="/curriculum"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl font-bold text-base text-gray-900 border-2 border-gray-200 transition-all hover:border-gray-400 hover:scale-105">
            <BookOpen size={20} /> Explore Curriculum
          </Link>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <ProgramsSection />
        <AgeGroupsSection />
        <FeaturesSection />
        <CompetitionSection />
        <CTASection />
      </main>
      <Footer />
    </>
  );
}
