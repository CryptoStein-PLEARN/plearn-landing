// ─────────────────────────────────────────────────────────────────────────────
// src/lib/supabase.js
//
// Supabase client singleton.
//
// Uses the public anon key (VITE_SUPABASE_ANON_KEY) — safe to expose in the
// browser because Row Level Security on the database restricts what the anon
// role can do (INSERT only, no SELECT / UPDATE / DELETE on waitlist_signups).
//
// NEVER add the service_role / secret key here. That key bypasses RLS and must
// only be used in server-side code (Edge Functions, backend API, CI scripts).
//
// If either env variable is missing, the client is null and WaitlistForm falls
// back to localStorage — safe for local development without a Supabase project.
// ─────────────────────────────────────────────────────────────────────────────

import { createClient } from '@supabase/supabase-js'

const url  = import.meta.env.VITE_SUPABASE_URL
const key  = import.meta.env.VITE_SUPABASE_ANON_KEY

// Warn in development if variables are missing so the developer knows why
// Supabase is not being used.
if (import.meta.env.DEV && (!url || !key)) {
  console.warn(
    '[PLEARN] Supabase env variables missing.\n' +
    'Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local\n' +
    'to enable real submissions. Using localStorage fallback for now.'
  )
}

// Export null if config is incomplete — WaitlistForm checks for null before
// calling any Supabase methods.
const supabase = (url && key) ? createClient(url, key) : null

export default supabase
