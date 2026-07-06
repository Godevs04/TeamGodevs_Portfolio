-- Required when using VITE_SUPABASE_PUBLISHABLE_KEY on the server (no service role).
-- Service role key bypasses RLS and does not need this policy.

create policy "Allow insert contact inquiries"
  on public.contact_inquiries
  for insert
  to anon, authenticated
  with check (true);
