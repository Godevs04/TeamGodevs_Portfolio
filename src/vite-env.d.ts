/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_CLARITY_ID?: string;
  readonly VITE_SUPABASE_URL?: string;
  readonly VITE_SUPABASE_PUBLISHABLE_KEY?: string;
  /** "true" enables the Student / College Projects catalog */
  readonly VITE_IS_COLLEGE_PROJECT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
