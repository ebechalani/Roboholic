import Link from 'next/link';
import { ArrowLeft, Hammer } from 'lucide-react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function ComingSoon({
  emoji = '🛠️',
  title,
  description,
  backHref = '/',
  backLabel = 'Go Home',
  chrome = true,
}: {
  emoji?: string;
  title: string;
  description: string;
  backHref?: string;
  backLabel?: string;
  chrome?: boolean;
}) {
  const body = (
    <div className="min-h-[70vh] flex items-center justify-center px-6" style={{ background: '#F8FAFF' }}>
      <div className="text-center max-w-md">
        <div className="text-6xl mb-5">{emoji}</div>
        <div className="inline-flex items-center gap-1.5 badge-pill bg-amber-100 text-amber-700 text-xs mb-4">
          <Hammer size={12} /> In progress
        </div>
        <h1 className="text-2xl font-black text-gray-900 mb-3">{title}</h1>
        <p className="text-gray-500 text-sm leading-relaxed mb-8">{description}</p>
        <Link href={backHref}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white text-sm"
          style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
          <ArrowLeft size={15} /> {backLabel}
        </Link>
      </div>
    </div>
  );

  if (!chrome) return body;
  return (
    <>
      <Navbar />
      <main>{body}</main>
      <Footer />
    </>
  );
}
