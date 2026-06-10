'use client';

import RequireRole from '@/components/auth/RequireRole';
import ComingSoon from '@/components/layout/ComingSoon';

export default function ResourceUploadPage() {
  return (
    <RequireRole allow={['admin', 'coach']}>
      <ComingSoon
        emoji="📥"
        title="Add a resource"
        description="The resource form is on the way. To keep everything free, resources are added as links (Google Drive, YouTube, GitHub) rather than file uploads. We'll wire this to Firestore next."
        backHref="/resources"
        backLabel="Back to Resources"
      />
    </RequireRole>
  );
}
