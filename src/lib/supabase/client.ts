import { createBrowserClient } from '@supabase/ssr';

let clientInstance: ReturnType<typeof createBrowserClient> | null = null;

/**
 * Browser-side Supabase client (singleton).
 * Used inside Client Components.
 */
export function createClient() {
  if (typeof window === 'undefined') {
    // Return a placeholder client during SSR — client components never use it on the server.
    return createBrowserClient(
      'https://placeholder.supabase.co',
      'placeholder-key'
    );
  }
  if (!clientInstance) {
    clientInstance = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
  }
  return clientInstance;
}
