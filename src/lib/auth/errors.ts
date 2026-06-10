/** Maps Firebase Auth error codes to friendly, classroom-appropriate messages. */
export function friendlyAuthError(err: unknown): string {
  const code =
    typeof err === 'object' && err !== null && 'code' in err
      ? String((err as { code: unknown }).code)
      : '';

  switch (code) {
    case 'auth/invalid-email':        return 'That email address doesn’t look right.';
    case 'auth/user-disabled':        return 'This account has been disabled. Contact your academy admin.';
    case 'auth/user-not-found':       return 'No account found with that email.';
    case 'auth/wrong-password':
    case 'auth/invalid-credential':   return 'Wrong email or password. Please try again.';
    case 'auth/email-already-in-use': return 'An account with this email already exists. Try logging in.';
    case 'auth/weak-password':        return 'Password is too weak — use at least 6 characters.';
    case 'auth/too-many-requests':    return 'Too many attempts. Please wait a moment and try again.';
    case 'auth/network-request-failed': return 'Network error. Check your connection and try again.';
    case 'auth/invalid-api-key':
    case 'auth/configuration-not-found': return 'Firebase isn’t configured yet. Add your keys to .env.local.';
    default:
      return 'Something went wrong. Please try again.';
  }
}
