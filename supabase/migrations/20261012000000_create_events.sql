create table public.events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  starts_at timestamptz not null,
  ends_at timestamptz,
  location text not null default '',
  summary text not null default '',
  created_at timestamptz not null default now(),
  constraint valid_event_time check (ends_at is null or ends_at >= starts_at)
);

create table public.event_admins (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.events enable row level security;
alter table public.event_admins enable row level security;

grant select on public.events to anon, authenticated;
grant insert, update, delete on public.events to authenticated;
grant select on public.event_admins to authenticated;

create policy "Events are publicly readable"
  on public.events for select
  to anon, authenticated
  using (true);

create policy "Admins can read their own admin membership"
  on public.event_admins for select
  to authenticated
  using ((select auth.uid()) = user_id);

create or replace function public.is_event_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.event_admins
    where user_id = (select auth.uid())
  );
$$;

grant execute on function public.is_event_admin() to authenticated;
revoke execute on function public.is_event_admin() from public, anon;

create policy "Admins can insert events"
  on public.events for insert
  to authenticated
  with check ((select public.is_event_admin()));

create policy "Admins can update events"
  on public.events for update
  to authenticated
  using ((select public.is_event_admin()))
  with check ((select public.is_event_admin()));

create policy "Admins can delete events"
  on public.events for delete
  to authenticated
  using ((select public.is_event_admin()));
