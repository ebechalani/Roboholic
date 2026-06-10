'use client';

import { useState } from 'react';
import Sidebar from '@/components/layout/Sidebar';
import RequireRole from '@/components/auth/RequireRole';
import { useAuth } from '@/lib/auth/AuthProvider';
import { STUDENT_DASHBOARD } from '@/lib/data';
import { Upload, Link as LinkIcon, Type, CheckCircle } from 'lucide-react';

export default function SubmitPage() {
  return (
    <RequireRole allow={['student', 'admin']}>
      <Submit />
    </RequireRole>
  );
}

function Submit() {
  const { profile } = useAuth();
  const [kind, setKind] = useState<'link' | 'text'>('link');
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ background: '#FFF7ED' }}>
      <Sidebar role="student" userName={profile?.full_name || STUDENT_DASHBOARD.studentName} userEmoji="⭐" />
      <main className="flex-1 ml-64">
        <header className="px-8 py-6" style={{ background: 'linear-gradient(135deg, #7C3AED 0%, #F97316 100%)' }}>
          <h1 className="text-3xl font-black text-white mb-1">Submit Your Project 📤</h1>
          <p className="text-white/75 font-medium">Share your work — your coach will review it and give feedback!</p>
        </header>

        <div className="p-8 max-w-2xl">
          {submitted ? (
            <div className="bg-white rounded-3xl border-2 border-green-100 p-10 text-center">
              <div className="w-16 h-16 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} />
              </div>
              <h2 className="font-black text-gray-900 text-xl mb-2">Project Submitted! 🎉</h2>
              <p className="text-gray-500 text-sm mb-6">Your coach will take a look soon. Great work!</p>
              <button onClick={() => setSubmitted(false)}
                className="px-5 py-2.5 rounded-xl font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
                Submit another
              </button>
            </div>
          ) : (
            <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }}
              className="bg-white rounded-3xl border-2 border-orange-100 p-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">What are you submitting?</label>
                <div className="grid grid-cols-2 gap-3">
                  <button type="button" onClick={() => setKind('link')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold ${kind === 'link' ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500'}`}>
                    <LinkIcon size={16} /> A link (Drive, video…)
                  </button>
                  <button type="button" onClick={() => setKind('text')}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 text-sm font-bold ${kind === 'text' ? 'border-orange-400 bg-orange-50 text-orange-700' : 'border-gray-200 text-gray-500'}`}>
                    <Type size={16} /> Write about it
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project title</label>
                <input required placeholder="My awesome robot"
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400" />
              </div>

              {kind === 'link' ? (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Link to your project</label>
                  <input required type="url" placeholder="https://drive.google.com/…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400" />
                  <p className="text-xs text-gray-400 mt-1">Paste a Google Drive, YouTube, or photo link (make sure sharing is on).</p>
                </div>
              ) : (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Describe your project</label>
                  <textarea required rows={5} placeholder="I built… It can… The hardest part was…"
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-orange-400/20 focus:border-orange-400" />
                </div>
              )}

              <button type="submit"
                className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
                <Upload size={16} /> Submit Project
              </button>
              <p className="text-xs text-gray-400 text-center">
                Tip: files stay free by linking from Google Drive — no uploads needed.
              </p>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
