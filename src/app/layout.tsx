import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'RoboHolic Robotics Academy',
    template: '%s | RoboHolic',
  },
  description:
    'The complete curriculum platform for RoboHolic Robotics Academy — lesson plans, activities, projects, and resources for coaches and students.',
  keywords: ['robotics', 'STEM', 'curriculum', 'robotics academy', 'coding', 'education', 'RoboHolic'],
  authors: [{ name: 'RoboHolic Robotics Academy' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-white text-gray-900 antialiased" style={{ fontFamily: "'Inter', system-ui, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}
