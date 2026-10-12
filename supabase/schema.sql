-- Run this once in Supabase: SQL Editor > New query > paste > Run

create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  location text,
  start_time timestamptz not null,
  end_time timestamptz,
  created_at timestamptz default now()
);

create table admins (
  user_id uuid primary key references auth.users(id) on delete cascade
);

alter table events enable row level security;
alter table admins enable row level security;

-- Anyone can view events
create policy "Public can read events" on events
  for select using (true);

-- Logged-in users can check whether they are an admin
create policy "Users can read own admin row" on admins
  for select to authenticated using (user_id = auth.uid());

-- Only admins can change events
create policy "Admins can insert events" on events
  for insert to authenticated
  with check (exists (select 1 from admins where admins.user_id = auth.uid()));

create policy "Admins can update events" on events
  for update to authenticated
  using (exists (select 1 from admins where admins.user_id = auth.uid()));

create policy "Admins can delete events" on events
  for delete to authenticated
  using (exists (select 1 from admins where admins.user_id = auth.uid()));

-- Optional: a few sample events to see the calendar working
insert into events (title, description, location, start_time, end_time) values
  ('General meeting', 'Placeholder: semester kickoff and introductions.', 'Student Union, Room 101', now() + interval '3 days', now() + interval '3 days 1 hour'),
  ('Workshop: Resume review', 'Placeholder: bring a printed resume.', 'Library, Study Room B', now() + interval '8 days', now() + interval '8 days 2 hours');

-- After creating your first user in Authentication > Users, make them an admin:
-- insert into admins (user_id)
-- select id from auth.users where email = 'your-email@example.com';
