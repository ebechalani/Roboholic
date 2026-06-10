import Link from 'next/link';
import { ArrowRight, Wrench } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import SectionHeader from '@/components/layout/SectionHeader';
import { PROGRAMS } from '@/lib/data';

export default function ProjectLibraryPage() {
  const projectPrograms = PROGRAMS.filter(p => p.category === 'projects' || p.category === 'competition');

  return (
    <>
      <Navbar />
      <main className="min-h-screen" style={{ background: '#F8FAFF' }}>
        <SectionHeader
          badge="🏗️ Project Library"
          title="Projects & Inventions"
          subtitle="Hands-on, interdisciplinary builds where students design, make, test, and present."
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {projectPrograms.map(p => (
              <Link key={p.id} href={`/curriculum/${p.slug}`}
                className="bg-white rounded-2xl border-2 p-6 card-hover"
                style={{ borderColor: p.color + '30' }}>
                <div className="text-3xl mb-3">{p.icon}</div>
                <h3 className="font-bold text-gray-900 mb-1">{p.title}</h3>
                <p className="text-xs text-gray-500 mb-4 leading-relaxed">{p.description}</p>
                <span className="inline-flex items-center gap-1 text-sm font-semibold" style={{ color: p.color }}>
                  Explore <ArrowRight size={14} />
                </span>
              </Link>
            ))}
          </div>

          <div className="mt-10 bg-white rounded-2xl border border-gray-100 p-8 text-center">
            <div className="w-12 h-12 rounded-2xl bg-teal-50 text-teal-600 flex items-center justify-center mx-auto mb-4">
              <Wrench size={24} />
            </div>
            <h3 className="font-black text-gray-900 text-lg mb-2">More project files coming</h3>
            <p className="text-gray-500 text-sm max-w-md mx-auto">
              Your WeDo 2.0 builds, mBot2 activities, and Early Simple Machines projects from Summer Camp 2025
              will be added here as a browsable, downloadable project gallery.
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
