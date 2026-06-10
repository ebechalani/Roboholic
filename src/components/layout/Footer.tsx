import Link from 'next/link';

const LINKS = {
  Curriculum: [
    { label: 'All Programs',     href: '/curriculum' },
    { label: 'Lesson Library',   href: '/lessons' },
    { label: 'Project Library',  href: '/projects' },
    { label: 'Resource Library', href: '/resources' },
    { label: 'Competitions',     href: '/competitions' },
  ],
  'For Coaches': [
    { label: 'Coach Dashboard',  href: '/dashboard/coach' },
    { label: 'Lesson Plans',     href: '/lessons' },
    { label: 'Coach Guides',     href: '/resources?audience=coach' },
    { label: 'Student Progress', href: '/dashboard/coach#students' },
    { label: 'Download Center',  href: '/resources#downloads' },
  ],
  'For Students': [
    { label: 'Student Dashboard', href: '/dashboard/student' },
    { label: 'My Missions',       href: '/student/my-path' },
    { label: 'My Badges',         href: '/student/badges' },
    { label: 'Quizzes',           href: '/student/quiz' },
    { label: 'Submit Project',    href: '/student/submit' },
  ],
};

export default function Footer() {
  return (
    <footer style={{ background: '#080F20' }} className="text-white/70 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-base shadow-lg"
                style={{ background: 'linear-gradient(135deg, #F97316, #DC2626)' }}>
                R
              </div>
              <div>
                <div className="font-black text-white text-lg leading-none">RoboHolic</div>
                <div className="text-white/40 text-xs">Robotics Academy</div>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-white/50">
              The complete curriculum platform for robotics educators and future engineers.
              Build. Code. Innovate.
            </p>
            <div className="flex gap-3 text-2xl">
              <span>🤖</span><span>💡</span><span>🚀</span><span>🏆</span>
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-white font-bold text-sm uppercase tracking-wider mb-4">{title}</h4>
              <ul className="space-y-2">
                {links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-white/30">
          <p>© {new Date().getFullYear()} RoboHolic Robotics Academy. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span>🌍 Teaching robotics to the next generation</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
