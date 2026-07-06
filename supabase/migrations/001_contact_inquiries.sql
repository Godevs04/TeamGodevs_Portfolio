-- Run in Supabase SQL Editor: https://supabase.com/dashboard/project/_/sql
-- Stores contact form submissions from teamgodevs.in

create table if not exists public.contact_inquiries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  email text not null,
  project_type text not null,
  budget text not null,
  message text not null,
  source text not null default 'website'
);

create index if not exists contact_inquiries_created_at_idx
  on public.contact_inquiries (created_at desc);

create index if not exists contact_inquiries_email_idx
  on public.contact_inquiries (email);

alter table public.contact_inquiries enable row level security;

-- No public policies — inserts happen server-side with service role key only.
