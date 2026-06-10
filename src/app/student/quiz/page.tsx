'use client';

import RequireRole from '@/components/auth/RequireRole';
import ComingSoon from '@/components/layout/ComingSoon';

export default function QuizPage() {
  return (
    <RequireRole allow={['student', 'admin']}>
      <ComingSoon
        emoji="🎯"
        title="Quizzes are coming!"
        description="Get ready for fun, interactive quizzes after each lesson — with instant feedback and badge rewards. The quiz engine is next on the build list."
        backHref="/dashboard/student"
        backLabel="Back to Dashboard"
      />
    </RequireRole>
  );
}
