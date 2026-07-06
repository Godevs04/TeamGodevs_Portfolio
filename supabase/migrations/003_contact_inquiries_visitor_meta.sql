-- Visitor metadata for contact inquiries (IP, location, user agent)

alter table public.contact_inquiries
  add column if not exists ip_address text,
  add column if not exists country text,
  add column if not exists region text,
  add column if not exists city text,
  add column if not exists timezone text,
  add column if not exists user_agent text;

create index if not exists contact_inquiries_ip_created_idx
  on public.contact_inquiries (ip_address, created_at desc);

create index if not exists contact_inquiries_email_created_idx
  on public.contact_inquiries (email, created_at desc);
