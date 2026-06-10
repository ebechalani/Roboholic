export default function SectionHeader({
  badge,
  title,
  subtitle,
}: {
  badge?: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="hero-bg section-pattern py-14 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {badge && (
          <div className="badge-pill glass text-white/80 text-sm mb-5 inline-flex">{badge}</div>
        )}
        <h1 className="text-3xl sm:text-4xl font-black text-white mb-3">{title}</h1>
        {subtitle && <p className="text-white/60 text-lg max-w-2xl">{subtitle}</p>}
      </div>
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 40" fill="none">
          <path d="M0 40L1440 40L1440 20C1200 40 960 0 720 0C480 0 240 40 0 20L0 40Z" fill="#F8FAFF" />
        </svg>
      </div>
    </div>
  );
}
