'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/lib/auth/AuthProvider';
import ContentGuard from '@/components/auth/ContentGuard';
import { getClass } from '@/lib/classes';
import {
  ArrowLeft, Clock, Users, BarChart2, ChevronRight, BookOpen,
  CheckCircle, Download, GraduationCap, Star, Eye, EyeOff,
  Printer, Share2, ChevronDown, ChevronUp, Lock, FileText,
  Video, Code, ExternalLink, Image as ImageIcon, List,
} from 'lucide-react';
import { ALL_LESSONS } from '@/lib/curricula';
import { DRIVE_LINKS } from '@/lib/curricula/drive-links';
import InteractiveExercises from '@/components/lesson/InteractiveExercises';
import ChessBoards from '@/components/lesson/ChessBoards';
import type { LessonDetail, LessonSection, LessonSectionType, StepItem, TroubleshootItem, LessonImage } from '@/types';

// ─── Section config ───────────────────────────────────────────────
const SECTION_CONFIG: Record<LessonSectionType, { label: string; emoji: string; bgColor: string; borderColor: string; coachOnly?: boolean }> = {
  coach_prep:        { label: 'Before-Class Preparation', emoji: '📋', bgColor: '#EFF6FF', borderColor: '#BFDBFE', coachOnly: true },
  coach_steps:       { label: 'Coach Instructions',       emoji: '🎓', bgColor: '#F0FDF4', borderColor: '#BBF7D0', coachOnly: true },
  student_steps:     { label: 'Student Instructions',     emoji: '🎯', bgColor: '#FFF7ED', borderColor: '#FED7AA', coachOnly: false },
  activity:          { label: 'Main Activity',            emoji: '🎬', bgColor: '#F0FDFA', borderColor: '#99F6E4', coachOnly: false },
  challenge:         { label: 'Challenge',                emoji: '⭐', bgColor: '#FEFCE8', borderColor: '#FDE68A', coachOnly: false },
  extra_challenge:   { label: 'Extra Challenge',          emoji: '🌟', bgColor: '#FDF4FF', borderColor: '#E9D5FF', coachOnly: false },
  troubleshooting:   { label: 'Troubleshooting',          emoji: '🔧', bgColor: '#FEF2F2', borderColor: '#FECACA', coachOnly: true },
  assessment:        { label: 'Assessment Checklist',     emoji: '✅', bgColor: '#F0FDF4', borderColor: '#BBF7D0', coachOnly: false },
  homework:          { label: 'Homework / Practice',      emoji: '🏠', bgColor: '#F8FAFF', borderColor: '#C7D2FE', coachOnly: false },
  coach_notes:       { label: 'Coach Notes',              emoji: '📝', bgColor: '#FFFBEB', borderColor: '#FDE68A', coachOnly: true },
};

// ─── Resource type icon ───────────────────────────────────────────
function ResourceIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    pdf:       <FileText size={16} className="text-red-500" />,
    video:     <Video size={16} className="text-blue-500" />,
    code:      <Code size={16} className="text-green-500" />,
    worksheet: <FileText size={16} className="text-orange-500" />,
    image:     <ImageIcon size={16} className="text-purple-500" />,
    link:      <ExternalLink size={16} className="text-blue-500" />,
    slides:    <List size={16} className="text-indigo-500" />,
  };
  return <>{icons[type] || <FileText size={16} />}</>;
}

// ─── Single section renderer ──────────────────────────────────────
function LessonSectionBlock({
  section,
  isCoachView,
  studentMode,
}: {
  section: LessonSection;
  isCoachView: boolean;
  studentMode: boolean;
}) {
  const [collapsed, setCollapsed] = useState(false);
  const config = SECTION_CONFIG[section.type];

  // Hide coach-only sections in student mode
  if (!isCoachView && config.coachOnly) return null;
  // In student mode, show student-friendly content if available
  const showStudentContent = studentMode && !isCoachView;
  const content = showStudentContent && section.studentContent ? section.studentContent : section.content;
  const title = showStudentContent && section.studentTitle ? section.studentTitle : section.title;

  return (
    <div
      className="rounded-2xl border-2 overflow-hidden"
      style={{ backgroundColor: config.bgColor, borderColor: config.borderColor }}
      id={`section-${section.type}`}
    >
      {/* Section header */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full flex items-center gap-3 px-6 py-4 text-left hover:opacity-90 transition-opacity"
      >
        <span className="text-xl">{section.emoji || config.emoji}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">{title}</span>
            {config.coachOnly && (
              <span className="badge-pill text-xs bg-blue-100 text-blue-700 font-semibold">
                <Lock size={10} /> Coach only
              </span>
            )}
          </div>
        </div>
        {collapsed ? <ChevronDown size={18} className="text-gray-400" /> : <ChevronUp size={18} className="text-gray-400" />}
      </button>

      {/* Content */}
      {!collapsed && (
        <div className="px-6 pb-6 space-y-5">
          <ContentRenderer content={content} type={section.type} />
          {section.images && section.images.length > 0 && <LessonFigures images={section.images} />}
        </div>
      )}
    </div>
  );
}

// ─── Image figures (coding blocks, device photos, diagrams) ───────
function LessonFigures({ images }: { images: LessonImage[] }) {
  const single = images.length === 1;
  return (
    <div className={`grid gap-4 ${single ? 'grid-cols-1 max-w-md mx-auto' : 'grid-cols-1 sm:grid-cols-2'}`}>
      {images.map((img, i) => (
        <figure key={i} className="rounded-xl border border-gray-200 overflow-hidden bg-white">
          <div className="flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={img.src} alt={img.caption || 'Lesson figure'} loading="lazy"
              className="max-h-80 w-auto object-contain" />
          </div>
          {img.caption && (
            <figcaption className="text-xs text-gray-500 px-3 py-2 border-t border-gray-100 bg-gray-50 text-center">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}

// ─── Content rendering by type ────────────────────────────────────
function ContentRenderer({ content, type }: { content: LessonSection['content']; type: LessonSectionType }) {
  if (!content) return null;

  // String content
  if (typeof content === 'string') {
    return <p className="text-gray-700 text-sm leading-relaxed">{content}</p>;
  }

  // Array of strings (bullet list)
  if (Array.isArray(content) && typeof content[0] === 'string') {
    return (
      <ul className="space-y-2">
        {(content as string[]).map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-700">
            {type === 'assessment' ? (
              <CheckCircle size={15} className="text-green-500 mt-0.5 shrink-0" />
            ) : (
              <span className="text-gray-400 shrink-0 mt-0.5 font-bold">•</span>
            )}
            <span className="flex-1">{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  // Array of StepItems
  if (Array.isArray(content) && (content[0] as StepItem).step !== undefined) {
    return (
      <div className="space-y-4">
        {(content as StepItem[]).map(item => (
          <div key={item.step} className="flex gap-4">
            <div className="w-8 h-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-black text-sm shrink-0 mt-0.5">
              {item.step}
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-800 font-medium leading-relaxed">{item.instruction}</p>
              {item.tip && (
                <div className="mt-2 flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl px-3 py-2">
                  <span className="text-sm">💡</span>
                  <p className="text-xs text-amber-800"><strong>Tip:</strong> {item.tip}</p>
                </div>
              )}
              {item.coachNote && (
                <div className="mt-2 flex items-start gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
                  <span className="text-sm">📝</span>
                  <p className="text-xs text-blue-800"><strong>Note:</strong> {item.coachNote}</p>
                </div>
              )}
              {item.image && (
                <div className="mt-3 rounded-xl border border-gray-200 bg-white p-3 inline-block">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={item.image} alt={`Step ${item.step} figure`} loading="lazy" className="max-h-72 w-auto object-contain" />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Array of TroubleshootItems
  if (Array.isArray(content) && (content[0] as TroubleshootItem).problem !== undefined) {
    return (
      <div className="space-y-4">
        {(content as TroubleshootItem[]).map((item, i) => (
          <div key={i} className="bg-white rounded-xl border border-red-100 p-4">
            <div className="flex items-start gap-2 mb-2">
              <span className="text-base">❌</span>
              <div>
                <div className="font-bold text-gray-900 text-sm">Problem: {item.problem}</div>
                <div className="text-xs text-gray-500 mt-0.5">Cause: {item.cause}</div>
              </div>
            </div>
            <div className="flex items-start gap-2 ml-6">
              <span className="text-base">✅</span>
              <div className="text-sm text-green-800"><strong>Fix:</strong> {item.solution}</div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return null;
}

// ─── Materials checklist ──────────────────────────────────────────
function MaterialsChecklist({ materials }: { materials: LessonDetail['materials'] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev);
    if (next.has(i)) next.delete(i); else next.add(i);
    return next;
  });
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-xl">🎒</span> Required Materials
        <span className="badge-pill bg-gray-100 text-gray-500 text-xs ml-auto">
          {checked.size}/{materials.length} ready
        </span>
      </h3>
      <ul className="space-y-2">
        {materials.map((mat, i) => (
          <li key={i}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              checked.has(i) ? 'bg-green-50 opacity-60' : 'hover:bg-gray-50'
            }`}
            onClick={() => toggle(i)}
          >
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checked.has(i) ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}>
              {checked.has(i) && <CheckCircle size={12} className="text-white" />}
            </div>
            <div className="flex-1">
              <span className={`text-sm font-medium ${checked.has(i) ? 'line-through text-gray-400' : 'text-gray-700'}`}>
                {mat.item}
              </span>
              {mat.quantity && <span className="text-xs text-gray-400 ml-2">— {mat.quantity}</span>}
              {mat.isOptional && <span className="badge-pill text-xs bg-gray-100 text-gray-400 ml-2">optional</span>}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

// A resource link is "live" only if it's a real http(s) URL that isn't one
// of our not-yet-linked placeholders (marked with "roboholic-" or /uploads/).
function isLiveResource(url: string): boolean {
  return /^https?:\/\//.test(url) && !url.includes('roboholic-');
}

// ─── Resources panel ──────────────────────────────────────────────
function ResourcesPanel({ resources, isCoachView }: { resources: LessonDetail['resources']; isCoachView: boolean }) {
  const visible = isCoachView ? resources : resources.filter(r => r.audience !== 'coach');
  return (
    <div className="bg-white rounded-2xl border-2 border-gray-100 p-6">
      <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2">
        <span className="text-xl">📁</span> Files & Resources
        {!isCoachView && (
          <span className="badge-pill bg-orange-100 text-orange-600 text-xs ml-auto">Student resources</span>
        )}
      </h3>
      {visible.length === 0 ? (
        <p className="text-sm text-gray-400">No resources available yet.</p>
      ) : (
        <div className="space-y-2">
          {visible.map(r => {
            // Prefer the exact Drive file link when we have one (mapped from the academy Drive).
            const url = DRIVE_LINKS[r.id] ?? r.url;
            const live = isLiveResource(url);
            return (
              <div key={r.id} className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 transition-all hover:shadow-sm">
                <ResourceIcon type={r.type} />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-gray-900 truncate">{r.title}</div>
                  {r.description && <div className="text-xs text-gray-400">{r.description}</div>}
                  {!live && (
                    <span className="inline-flex items-center gap-1 text-xs text-gray-400 mt-0.5">
                      📁 In the academy Google Drive
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  {r.size && <span className="text-xs text-gray-400">{r.size}</span>}
                  {live ? (
                    <a href={url} target="_blank" rel="noopener noreferrer" title="Open / download"
                      className="p-1.5 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors">
                      {r.type === 'link' ? <ExternalLink size={14} className="text-gray-600" /> : <Download size={14} className="text-gray-600" />}
                    </a>
                  ) : (
                    <span className="p-1.5 rounded-lg bg-gray-50 text-gray-300" title="Not linked yet — add the Drive link in the admin panel">
                      <Download size={14} />
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

// ─── Assessment panel ─────────────────────────────────────────────
function AssessmentPanel({ checklist }: { checklist: string[] }) {
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setChecked(prev => {
    const next = new Set(prev); if (next.has(i)) next.delete(i); else next.add(i); return next;
  });
  const pct = Math.round((checked.size / checklist.length) * 100);

  return (
    <div className="bg-white rounded-2xl border-2 border-green-100 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-900 flex items-center gap-2">
          <span className="text-xl">✅</span> Assessment Checklist
        </h3>
        <span className="font-bold text-sm" style={{ color: pct === 100 ? '#10B981' : '#F97316' }}>
          {checked.size}/{checklist.length}
        </span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5 mb-4">
        <div className="h-1.5 rounded-full transition-all duration-500 bg-green-500" style={{ width: `${pct}%` }} />
      </div>
      <ul className="space-y-2">
        {checklist.map((item, i) => (
          <li key={i}
            onClick={() => toggle(i)}
            className={`flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all ${
              checked.has(i) ? 'bg-green-50' : 'hover:bg-gray-50'
            }`}>
            <div className={`w-5 h-5 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all ${
              checked.has(i) ? 'bg-green-500 border-green-500' : 'border-gray-300'
            }`}>
              {checked.has(i) && <CheckCircle size={12} className="text-white" />}
            </div>
            <span className={`text-sm ${checked.has(i) ? 'line-through text-gray-400' : 'text-gray-700'}`}>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Main Lesson Page ─────────────────────────────────────────────
export default function LessonPage({ params }: { params: { lessonId: string } }) {
  const { lessonId } = params;
  const lesson = ALL_LESSONS[lessonId];

  const [isCoachView, setIsCoachView] = useState(true);
  const [studentMode, setStudentMode] = useState(false);
  const [activeTab, setActiveTab] = useState<'lesson' | 'resources' | 'assessment'>('lesson');

  // Students may only open lessons their coach assigned to their class.
  const { role, profile, configured } = useAuth();
  const [studentAccess, setStudentAccess] = useState<'checking' | 'ok' | 'denied'>('checking');
  useEffect(() => {
    if (!configured || role !== 'student') { setStudentAccess('ok'); return; }
    let on = true;
    if (!profile?.classId) { setStudentAccess('denied'); return; }
    getClass(profile.classId)
      .then(cls => { if (on) setStudentAccess((cls?.lessonIds ?? []).includes(lessonId) ? 'ok' : 'denied'); })
      .catch(() => { if (on) setStudentAccess('denied'); });
    return () => { on = false; };
  }, [configured, role, profile?.classId, lessonId]);

  const difficultyLabels = ['', 'Very Easy', 'Easy', 'Medium', 'Hard', 'Very Hard'];
  const difficultyColors = ['', '#10B981', '#3B82F6', '#F59E0B', '#F97316', '#EF4444'];

  // Student trying to open a lesson that isn't assigned to their class.
  if (role === 'student' && studentAccess === 'denied') {
    return (
      <div className="min-h-screen flex items-center justify-center p-6" style={{ background: '#FFF7ED' }}>
        <div className="text-center max-w-sm">
          <div className="text-6xl mb-4">🔒</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Not in your missions yet</h1>
          <p className="text-gray-500 text-sm mb-6">This lesson isn&apos;t one your coach has given you. Check your dashboard for your missions!</p>
          <Link href="/dashboard/student" className="inline-flex px-5 py-2.5 rounded-xl font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
            Go to my missions
          </Link>
        </div>
      </div>
    );
  }

  if (!lesson) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="text-6xl mb-4">📚</div>
          <h1 className="text-2xl font-black text-gray-900 mb-2">Lesson Not Found</h1>
          <p className="text-gray-500 mb-6 text-sm">This lesson hasn&apos;t been added yet, or the link is incorrect.</p>
          <Link href="/curriculum" className="text-blue-600 hover:underline font-semibold">← Back to Curriculum</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${studentMode ? 'student-mode' : ''}`} style={{ background: '#F8FAFF' }}>

      {/* Per-user watermark + copy deterrent (deterrent, not DRM) */}
      <ContentGuard />

      {/* Top navigation bar */}
      <header className="bg-white border-b border-gray-100 sticky top-0 z-50 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 gap-4">

            {/* Breadcrumb */}
            <div className="flex items-center gap-1.5 text-sm min-w-0 overflow-hidden">
              <Link href="/curriculum" className="text-gray-400 hover:text-gray-700 shrink-0">Curriculum</Link>
              <ChevronRight size={14} className="text-gray-300 shrink-0" />
              <Link href={`/curriculum/${lesson.programSlug}`} className="text-gray-400 hover:text-gray-700 shrink-0 hidden sm:block">
                {lesson.programTitle}
              </Link>
              <ChevronRight size={14} className="text-gray-300 shrink-0 hidden sm:block" />
              <span className="text-gray-900 font-semibold truncate">{lesson.title}</span>
            </div>

            {/* View controls */}
            <div className="flex items-center gap-2 shrink-0">
              {/* Coach/Student toggle */}
              <div className="flex items-center gap-1 bg-gray-100 rounded-xl p-1">
                <button
                  onClick={() => { setIsCoachView(true); setStudentMode(false); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    isCoachView ? 'bg-white text-blue-700 shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <GraduationCap size={13} /> Coach
                </button>
                <button
                  onClick={() => { setIsCoachView(false); setStudentMode(true); }}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                    !isCoachView ? 'bg-orange-500 text-white shadow-sm' : 'text-gray-500'
                  }`}
                >
                  <Star size={13} /> Student
                </button>
              </div>

              {/* Print */}
              <button
                onClick={() => window.print()}
                className="p-2 rounded-lg border border-gray-200 hover:bg-gray-50 transition-colors no-print"
                title="Print lesson"
              >
                <Printer size={15} className="text-gray-500" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left sidebar — lesson info */}
          <div className="space-y-5">

            {/* Lesson header card */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Color top bar */}
              <div className="h-2" style={{ backgroundColor: lesson.programColor }} />
              <div className="p-6">
                {/* Program badge */}
                <Link href={`/curriculum/${lesson.programSlug}`}
                  className="inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full text-white mb-4"
                  style={{ backgroundColor: lesson.programColor }}>
                  <ArrowLeft size={11} /> {lesson.programTitle}
                </Link>

                <h1 className={`font-black text-gray-900 mb-4 leading-tight ${studentMode ? 'text-2xl' : 'text-xl'}`}>
                  {lesson.title}
                  {studentMode && <span className="ml-2">🚀</span>}
                </h1>

                {/* Embedded video tutorial */}
                {lesson.youtubeId && (
                  <div className="mb-4 rounded-xl overflow-hidden border border-gray-100 bg-black aspect-video">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${lesson.youtubeId}`}
                      title={lesson.title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {/* Hero image */}
                {!lesson.youtubeId && lesson.heroImage && (
                  <div className="mb-4 rounded-xl border border-gray-100 bg-gray-50 flex items-center justify-center p-4">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={lesson.heroImage} alt={lesson.title} className="max-h-44 w-auto object-contain" />
                  </div>
                )}

                {/* Meta info */}
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { label: 'Duration', value: lesson.duration, icon: <Clock size={14} /> },
                    { label: 'Age Group', value: `Ages ${lesson.ageGroup}`, icon: <Users size={14} /> },
                    { label: 'Level', value: lesson.level, icon: <BarChart2 size={14} /> },
                    {
                      label: 'Difficulty',
                      value: difficultyLabels[lesson.difficulty],
                      icon: <span className="text-xs">{'★'.repeat(lesson.difficulty)}</span>,
                    },
                  ].map(item => (
                    <div key={item.label} className="bg-gray-50 rounded-xl p-3">
                      <div className="flex items-center gap-1.5 text-gray-400 mb-1">
                        <span className="text-gray-400">{item.icon}</span>
                        <span className="text-xs">{item.label}</span>
                      </div>
                      <div className="text-sm font-bold text-gray-900">{item.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Objectives */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                <BookOpen size={16} className="text-blue-600" />
                {studentMode ? '🎯 What You\'ll Learn' : 'Learning Objectives'}
              </h3>
              <ul className="space-y-2">
                {lesson.objectives.map((obj, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <CheckCircle size={15} className="mt-0.5 shrink-0" style={{ color: lesson.programColor }} />
                    {obj}
                  </li>
                ))}
              </ul>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h3 className="font-bold text-gray-900 mb-3">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {lesson.skills.map(skill => (
                  <span key={skill} className="badge-pill text-xs text-white font-semibold"
                    style={{ backgroundColor: lesson.programColor }}>
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Materials (interactive checklist) */}
            <MaterialsChecklist materials={lesson.materials} />
          </div>

          {/* Main content area */}
          <div className="lg:col-span-2 space-y-5">

            {/* Tab navigation */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-1.5 flex gap-1 no-print">
              {[
                { id: 'lesson',     label: 'Lesson Content', emoji: '📖' },
                { id: 'resources',  label: 'Resources',      emoji: '📁' },
                { id: 'assessment', label: 'Assessment',     emoji: '✅' },
              ].map(tab => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as 'lesson' | 'resources' | 'assessment')}
                  className={`flex items-center gap-2 flex-1 justify-center px-4 py-2.5 rounded-xl text-sm font-bold transition-all ${
                    activeTab === tab.id
                      ? 'bg-gray-900 text-white shadow-sm'
                      : 'text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab.emoji} {tab.label}
                </button>
              ))}
            </div>

            {/* Lesson sections */}
            {activeTab === 'lesson' && (
              <div className="space-y-4">
                {!isCoachView && (
                  <div className="bg-orange-500 rounded-2xl p-5 text-white">
                    <div className="text-2xl mb-2">🚀 Mission Briefing!</div>
                    <p className="font-bold text-lg">{lesson.title}</p>
                    <p className="text-white/80 text-sm mt-1">
                      Duration: {lesson.duration} · Level: {lesson.level} · Ages {lesson.ageGroup}
                    </p>
                  </div>
                )}

                {lesson.boards?.length ? <ChessBoards boards={lesson.boards} color={lesson.programColor} /> : null}

                {lesson.sections.map((section) => (
                  <LessonSectionBlock
                    key={section.type}
                    section={section}
                    isCoachView={isCoachView}
                    studentMode={studentMode}
                  />
                ))}

                <InteractiveExercises lesson={lesson} />
              </div>
            )}

            {/* Resources tab */}
            {activeTab === 'resources' && (
              <ResourcesPanel resources={lesson.resources} isCoachView={isCoachView} />
            )}

            {/* Assessment tab */}
            {activeTab === 'assessment' && (
              <AssessmentPanel checklist={lesson.assessmentChecklist} />
            )}

            {/* Navigation between lessons */}
            <div className="flex items-center justify-between pt-2 no-print">
              <Link
                href={`/curriculum/${lesson.programSlug}`}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border-2 border-gray-200 text-sm font-semibold text-gray-600 hover:border-gray-400 transition-all"
              >
                <ArrowLeft size={15} /> Course Overview
              </Link>
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold text-white transition-all hover:opacity-90"
                  style={{ backgroundColor: lesson.programColor }}>
                  <CheckCircle size={15} /> Mark Complete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
