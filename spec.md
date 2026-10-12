# Thucydides Society for Military History Website Specification

## Overview
This project is a simple Next.js website for the Thucydides Society for Military History, a student organization dedicated to the study and discussion of military history. The site is organized into a small set of pages: a home landing page, a FullCalendar-based events page, an administrative area for event management, and a resources page containing organization information.

## File Structure

```text
.
├── app/
│   ├── admin/
│   │   └── page.js
│   ├── api/
│   │   └── events/
│   │       └── route.js
│   ├── calendar/
│   │   └── page.js
│   ├── globals.css
│   ├── layout.js
│   ├── page.js
│   └── resources/
│       └── page.js
├── components/
│   ├── EventCalendar.js
│   └── Navigation.js
├── lib/
│   └── supabase.js
├── supabase/
│   └── migrations/
│       └── 20261012000000_create_events.sql
├── .gitignore
├── .env.example
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── spec.md
├── tailwind.config.js
└── README.md (optional future addition)
```

## File Responsibilities

### app/layout.js
Defines the global page layout and inserts the shared navigation across the site. It also provides the page metadata for the organization and serves as the app wrapper.

### app/page.js
Creates the home page with a welcoming introduction, logo display, mission statement, and a “next meeting” preview card. This page acts as the public landing page for the organization.

### app/calendar/page.js
Creates the public calendar page and renders the FullCalendar component. It is designed to surface the organization’s meeting and event schedule.

### app/admin/page.js
Contains Supabase email/password sign-in and the event-management dashboard. It checks the signed-in user's membership in `event_admins`, and uses the authenticated Supabase session for event inserts, updates, and deletes. Database Row Level Security is the actual authorization boundary.

### app/resources/page.js
Contains the organization’s resources content, including sections on About Us, Learning, Team Members, and Contact Us. This page provides context for new visitors and prospective members.

### app/api/events/route.js
Provides a dynamic, public read-only API endpoint backed by the Supabase `events` table. It reports a configuration or database error rather than silently returning sample data.

### components/Navigation.js
Handles the top-level navigation bar for all pages and keeps a consistent site structure and user flow.

### components/EventCalendar.js
Wraps FullCalendar and renders a month/week calendar with event data. This component is the key UI for displaying and managing events.

### lib/supabase.js
Creates the browser Supabase client and provides the shared event query used by the server-rendered home/calendar pages and API endpoint. It reads `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`.

### supabase/migrations/20261012000000_create_events.sql
Creates the `events` and `event_admins` tables, enables Row Level Security, and installs policies that allow public event reads but restrict event changes to users listed in `event_admins`.

### .env.example
Lists the public Supabase environment variables required to run the application locally or on Vercel. Copy it to `.env.local` and supply values from your Supabase project. Do not commit `.env.local`.

### app/globals.css
Defines the global Tailwind styles, including brand colors, utility classes, and layout patterns for the site.

### package.json
Defines the project dependencies and commands for Next.js, Tailwind, FullCalendar, and Supabase.

### next.config.mjs
Provides the basic Next.js configuration for the application.

### tailwind.config.js
Configures Tailwind for the project and sets custom brand colors used throughout the design.

### spec.md
This document explains the app structure, file purpose, and the future next steps required to turn the starter website into a production-ready project.

## Supabase Setup
1. Create a Supabase project and copy its project URL and publishable/anon key.
2. Apply `supabase/migrations/20261012000000_create_events.sql` using the Supabase SQL Editor or the Supabase CLI.
3. Create an administrator user using Supabase Authentication. Public sign-ups should remain disabled unless they are intentionally needed.
4. Add the administrator's Supabase Auth user ID to `public.event_admins`. For example, after replacing the email with the created user's email, run:

   ```sql
   insert into public.event_admins (user_id)
   select id from auth.users where email = 'admin@example.org';
   ```

   Confirm that the query inserts exactly one row. The admin UI will allow login for Supabase users, but only members of `event_admins` can manage events.
5. Copy `.env.example` to `.env.local` and fill in the project URL and public key. Restart the local Next.js server after changing environment values.

## Deployment Notes
Add `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to the Vercel project's Environment Variables for each required environment, then redeploy. The anon/publishable key is intentionally public; never add a service-role key to browser code or a `NEXT_PUBLIC_` variable. RLS is responsible for restricting database writes.

## TO-DO
- Create the Supabase project, apply the migration, configure local/Vercel environment variables, and provision the initial admin user.
- Test sign-in and event create/edit/delete flows against the deployed Supabase project, including checks that non-admin authenticated users and anonymous users cannot write.
- Add additional branding assets, including a full logo, improved imagery, and a consistent visual identity.
- Expand the site with a member application flow, newsletter signup, or event RSVP functionality.
- Prepare final production content, including more accurate bios, event copy, and faculty or advisor information.
