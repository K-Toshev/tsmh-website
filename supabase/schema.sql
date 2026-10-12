-- Run this once in Supabase: SQL Editor > New query > paste > Run
-- (If you ran an earlier version of this file, the first two lines clear it out.)

drop table if exists events cascade;
drop table if exists admins cascade;

-- One table. That's the whole database.
create table events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  description text,
  speaker text,
  location text,
  date date not null,
  time time not null
);

alter table events enable row level security;

-- Anyone can view events
create policy "Anyone can read events" on events
  for select using (true);

-- Any signed-in user can add, edit, and delete events.
-- Only accounts YOU create in Supabase can sign in (sign-ups are turned off),
-- so "signed in" means "admin".
create policy "Signed-in users can add events" on events
  for insert to authenticated with check (true);

create policy "Signed-in users can edit events" on events
  for update to authenticated using (true);

create policy "Signed-in users can delete events" on events
  for delete to authenticated using (true);

-- Optional sample events
insert into events (title, description, speaker, location, date, time) values
  ('General meeting', 'Placeholder: semester kickoff and introductions.', null, 'Student Union, Room 101', current_date + 3, '18:00'),
  ('Guest talk: Careers in tech', 'Placeholder: a short talk followed by Q&A.', 'Jane Doe', 'Library, Study Room B', current_date + 8, '17:30');
