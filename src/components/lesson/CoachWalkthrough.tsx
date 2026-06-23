'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, RotateCcw, MessageCircleQuestion, Hand, Presentation } from 'lucide-react';
import type { WalkStep } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Guided Teaching Walkthrough — steps the coach through the lesson
//  one page at a time, pairing each PDF page with what to SAY, ASK,
//  and DO. Projector-friendly (big page + script + Prev/Next).
// ════════════════════════════════════════════════════════════════

export default function CoachWalkthrough({ steps, slug, color }: { steps: WalkStep[]; slug: string; color: string }) {
  const [i, setI] = useState(0);
  if (!steps?.length) return null;
  const step = steps[i];
  const pct = Math.round(((i + 1) / steps.length) * 100);

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: color + '0D' }}>
        <Presentation size={18} style={{ color }} />
        <h3 className="font-black text-gray-900">Guided Teaching Walkthrough</h3>
        <span className="text-xs text-gray-400 ml-1">— project this & teach step by step</span>
      </div>

      {/* progress */}
      <div className="px-5 pt-4">
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs font-bold text-gray-500">Step {i + 1} of {steps.length}{step.title ? ` · ${step.title}` : ''}</span>
          <span className="text-xs text-gray-400">{pct}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-gray-100 overflow-hidden"><div className="h-full rounded-full transition-all" style={{ width: pct + '%', background: color }} /></div>
      </div>

      <div className="p-5 grid md:grid-cols-2 gap-5 items-start">
        {/* the page being explained */}
        {step.page != null && (
          <img src={`/lessons/${slug}/p-${String(step.page).padStart(2, '0')}.png`} alt={`Page ${step.page}`}
            className="w-full h-auto rounded-lg border border-gray-200 bg-white" />
        )}
        {/* the teaching script */}
        <div className={`space-y-3 ${step.page == null ? 'md:col-span-2' : ''}`}>
          <p className="text-[15px] leading-relaxed text-gray-800"><span className="font-bold" style={{ color }}>Show &amp; explain: </span>{step.say}</p>
          {step.ask && <p className="text-sm text-gray-700 bg-amber-50 border border-amber-100 rounded-xl p-3 flex gap-2"><MessageCircleQuestion size={16} className="shrink-0 mt-0.5 text-amber-600" /><span><b>Ask the class:</b> {step.ask}</span></p>}
          {step.doThis && <p className="text-sm text-gray-700 bg-green-50 border border-green-100 rounded-xl p-3 flex gap-2"><Hand size={16} className="shrink-0 mt-0.5 text-green-600" /><span><b>Now do:</b> {step.doThis}</span></p>}
        </div>
      </div>

      {/* controls */}
      <div className="px-5 pb-5 flex items-center justify-between">
        <button onClick={() => setI(n => Math.max(0, n - 1))} disabled={i === 0}
          className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-gray-600 bg-gray-100 hover:bg-gray-200 disabled:opacity-40"><ChevronLeft size={16} /> Back</button>
        <button onClick={() => setI(0)} className="flex items-center gap-1 text-xs font-semibold text-gray-400 hover:text-gray-600"><RotateCcw size={13} /> Restart</button>
        {i < steps.length - 1
          ? <button onClick={() => setI(n => Math.min(steps.length - 1, n + 1))} className="flex items-center gap-1 px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: color }}>Next <ChevronRight size={16} /></button>
          : <span className="px-4 py-2 rounded-xl text-sm font-bold text-green-700 bg-green-50">✓ Lesson complete</span>}
      </div>
    </section>
  );
}
