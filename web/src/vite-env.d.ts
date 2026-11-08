/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly NEXT_PUBLIC_CLARITY_ID?: string;
  /** Express API origin, e.g. https://api.teamgodevs.in — empty means same origin (/api proxy) */
  readonly VITE_API_URL?: string;
  /** Razorpay public key id (never the secret) */
  readonly VITE_RAZORPAY_KEY_ID?: string;
  /** "true" enables the Student / College Projects catalog */
  readonly VITE_IS_COLLEGE_PROJECT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
