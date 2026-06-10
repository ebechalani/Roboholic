import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center" style={{ background: '#F8FAFF' }}>
      <div className="text-center max-w-md mx-auto px-4">
        <div className="text-8xl mb-6">🤖</div>
        <h1 className="text-5xl font-black text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Page Not Found</h2>
        <p className="text-gray-500 mb-8 leading-relaxed">
          Oops! This page got lost in the robot lab. Let&apos;s get you back on track.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/"
            className="px-6 py-3 rounded-xl font-bold text-white text-sm"
            style={{ background: 'linear-gradient(135deg, #0F2044, #2563EB)' }}>
            🏠 Go Home
          </Link>
          <Link href="/curriculum"
            className="px-6 py-3 rounded-xl font-bold text-gray-700 border-2 border-gray-200 text-sm hover:border-gray-400">
            📚 Browse Curriculum
          </Link>
        </div>
      </div>
    </div>
  );
}
