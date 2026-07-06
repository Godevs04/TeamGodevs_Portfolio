import { createClient, type SupabaseClient } from '@supabase/supabase-js';

function getEnv(name: string): string | undefined {
  const value = process.env[name];
  if (typeof value !== 'string') return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function getSupabaseUrl(): string | undefined {
  return getEnv('SUPABASE_URL') ?? getEnv('VITE_SUPABASE_URL');
}

/**
 * Prefer service role on the server (bypasses RLS).
 * Falls back to publishable key when service role is not set (requires insert RLS policy).
 */
export function getSupabaseServerKey(): string | undefined {
  return (
    getEnv('SUPABASE_SERVICE_ROLE_KEY') ??
    getEnv('SUPABASE_SECRET_KEY') ??
    getEnv('SUPABASE_SERVICE_KEY') ??
    getEnv('VITE_SUPABASE_PUBLISHABLE_KEY') ??
    getEnv('VITE_SUPABASE_ANON_KEY')
  );
}

export function isUsingServiceRoleKey(): boolean {
  return Boolean(
    getEnv('SUPABASE_SERVICE_ROLE_KEY') ??
      getEnv('SUPABASE_SECRET_KEY') ??
      getEnv('SUPABASE_SERVICE_KEY')
  );
}

let serverClient: SupabaseClient | null = null;

/** Server-side Supabase client for API routes. */
export function getSupabaseAdmin(): SupabaseClient | null {
  const url = getSupabaseUrl();
  const key = getSupabaseServerKey();

  if (!url || !key) {
    const missing = [
      !url && 'VITE_SUPABASE_URL (or SUPABASE_URL)',
      !key &&
        'SUPABASE_SERVICE_ROLE_KEY or VITE_SUPABASE_PUBLISHABLE_KEY',
    ].filter(Boolean);
    console.warn(`Supabase missing env: ${missing.join(', ')}`);
    return null;
  }

  if (!serverClient) {
    serverClient = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
    });
  }

  return serverClient;
}

export function isSupabaseConfigured(): boolean {
  return Boolean(getSupabaseUrl() && getSupabaseServerKey());
}
