'use client';

import Link from 'next/link';
import { FileText, Video, Code, ExternalLink, Image as ImageIcon, List, Download, Search } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import { SCRATCH_JR_LESSON_1, SCRATCH_JR_LESSON_2 } from '@/lib/curricula/scratch-jr';
import type { Resource } from '@/types';

const ICONS: Record<string, React.ReactNode> = {
  pdf: <FileText size={16} className="text-red-500" />,
  video: <Video size={16} className="text-blue-500" />,
  code: <Code size={16} className="text-green-500" />,
  worksheet: <FileText size={16} className="text-orange-500" />,
  image: <ImageIcon size={16} className="text-purple-500" />,
  link: <ExternalLink size={16} className="text-blue-500" />,
  slides: <List size={16} className="text-indigo-500" />,
};

// Aggregate the resources we currently have (from the sample lessons).
const ALL_RESOURCES: (Resource & { lesson: string })[] = [
  ...SCRATCH_JR_LESSON_1.resources.map(r => ({ ...r, lesson: SCRATCH_JR_LESSON_1.title })),
  ...SCRATCH_JR_LESSON_2.resources.map(r => ({ ...r, lesson: SCRATCH_JR_LESSON_2.title })),
];

const TYPES = ['all', 'pdf', 'worksheet', 'video', 'code', 'link'] as const;
const AUDIENCES = ['all', 'coach', 'student', 'both'] as const;

export default function ResourceLibraryPage() {
  const [type, setType] = useState<string>('all');
  const [audience, setAudience] = useState<string>('all');
  const [q, setQ] = useState('');

  const filtered = ALL_RESOURCES.filter(r =>
    (type === 'all' || r.type === type) &&
    (audience === 'all' || r.audience === audience) &&
    r.title.toLowerCase().includes(q.toLowerCase())
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="📁 Resource Library"
          title="Resources & Downloads"
          subtitle="PDFs, worksheets, videos, and code — filterable by type and audience. Files are linked from Google Drive."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          {/* Filters */}
          <div className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 mb-8 flex flex-col sm:flex-row gap-3 flex-wrap">
            <div className="relative flex-1 min-w-[200px]">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input value={q} onChange={e => setQ(e.target.value)} placeholder="Search resources…"
                className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20" />
            </div>
            <select value={type} onChange={e => setType(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-white">
              {TYPES.map(t => <option key={t} value={t}>{t === 'all' ? 'All types' : t}</option>)}
            </select>
            <select value={audience} onChange={e => setAudience(e.target.value)}
              className="px-4 py-2.5 rounded-xl border border-gray-200 text-sm font-medium bg-white">
              {AUDIENCES.map(a => <option key={a} value={a}>{a === 'all' ? 'All audiences' : a}</option>)}
            </select>
          </div>

          {/* Admin upload hint */}
          <div className="flex items-center justify-between mb-4">
            <p className="text-sm text-gray-500"><b className="text-gray-900">{filtered.length}</b> resources</p>
            <Link href="/admin/resources" className="text-sm text-blue-600 font-semibold hover:underline">+ Add resource (admin)</Link>
          </div>

          {/* List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {filtered.map(r => (
              <div key={r.id} className="flex items-center gap-3 bg-white rounded-xl border border-gray-100 p-4 card-hover">
                <div className="w-9 h-9 rounded-lg bg-gray-50 flex items-center justify-center shrink-0">{ICONS[r.type]}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-gray-900 truncate">{r.title}</div>
                  <div className="text-xs text-gray-400">{r.lesson} · <span className="capitalize">{r.audience}</span></div>
                </div>
                {/^https?:\/\//.test(r.url) && !r.url.includes('roboholic-') ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" title="Open / download"
                    className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 shrink-0">
                    {r.type === 'link' ? <ExternalLink size={14} className="text-gray-600" /> : <Download size={14} className="text-gray-600" />}
                  </a>
                ) : (
                  <span className="text-[11px] text-gray-400 shrink-0">📁 in Drive</span>
                )}
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16 text-gray-400">
              <FileText size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">No resources match your filters.</p>
            </div>
          )}

          <div className="mt-10 bg-blue-50 border border-blue-100 rounded-2xl p-5 text-sm text-blue-900">
            📥 <b>Growing library:</b> Your Summer Camp 2025 materials (WeDo, mBot2, EV3, Arduino, Codey Rocky and more)
            will appear here as we import them — linked from your Google Drive, at no cost.
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
