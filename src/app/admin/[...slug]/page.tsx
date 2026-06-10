'use client';

import RequireRole from '@/components/auth/RequireRole';
import ComingSoon from '@/components/layout/ComingSoon';

export default function AdminToolPage() {
  return (
    <RequireRole allow={['admin']}>
      <ComingSoon
        emoji="⚙️"
        title="Admin tool coming next"
        description="This management screen is being built. Next up: a content editor to create programs, courses, and lessons, plus bulk-import of your Summer Camp materials as Google Drive links — all on the free plan."
        backHref="/admin"
        backLabel="Back to Admin Panel"
      />
    </RequireRole>
  );
}
