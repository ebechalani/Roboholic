export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen" style={{ background: '#F0F4FF' }}>
      {children}
    </div>
  );
}
