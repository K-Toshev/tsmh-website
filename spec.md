# Student Organization Website Spec

This project is a scaffold for a student organization website built with JavaScript, React, Next.js, Tailwind CSS, FullCalendar, Supabase, Vercel, Git/GitHub, and Node.js.

The goal is to create a simple but organized website structure that supports:
- a public home page
- a public event calendar
- an admin authentication screen
- an admin dashboard for modifying events
- a public resources page
- a team members page

This is a file structure and layout scaffold only. The pages are created as placeholders and are not fully implemented yet.

## Tech Stack
- JavaScript
- React
- Next.js
- Tailwind CSS
- FullCalendar
- Supabase
- Vercel
- Git/GitHub
- Node.js

## File Structure

```text
student-org-site/
├── .env.example
├── .gitignore
├── README.md
├── index.html
├── jsconfig.json
├── next.config.js
├── package.json
├── postcss.config.js
├── spec.md
├── tailwind.config.js
├── src/
│   ├── app/
│   │   ├── admin/
│   │   │   ├── dashboard/
│   │   │   │   └── page.js
│   │   │   └── login/
│   │   │       └── page.js
│   │   ├── calendar/
│   │   │   └── page.js
│   │   ├── resources/
│   │   │   └── page.js
│   │   ├── team/
│   │   │   └── page.js
│   │   ├── globals.css
│   │   ├── layout.js
│   │   └── page.js
│   ├── components/
│   │   ├── EventCalendar.js
│   │   ├── Footer.js
│   │   ├── Header.js
│   │   ├── ResourceCard.js
│   │   └── TeamMemberCard.js
│   ├── data/
│   │   ├── events.js
│   │   └── resources.js
│   └── lib/
│       └── supabase.js
└── public/
    └── images/
```

## What Each Part Does

### Root Files
- `.env.example` — example environment variables for Supabase configuration.
- `.gitignore` — ignores generated files such as `node_modules`, build output, and local environment files.
- `README.md` — basic project overview and usage notes.
- `index.html` — existing static entry file kept in place as a simple starting point.
- `package.json` — project metadata, scripts, and dependency list for the app.
- `next.config.js` — Next.js configuration.
- `tailwind.config.js` — Tailwind setup and custom theme values.
- `postcss.config.js` — PostCSS configuration for Tailwind processing.
- `jsconfig.json` — JavaScript alias configuration so imports can use `@/` paths.
- `spec.md` — project specification and file explanation.

### `src/app/` (main application pages)
- `src/app/layout.js` — global app layout, wraps all pages and loads CSS.
- `src/app/page.js` — home page for the student organization.
- `src/app/calendar/page.js` — public event calendar page.
- `src/app/resources/page.js` — page for public resources and useful documents.
- `src/app/team/page.js` — page listing team members or leadership.
- `src/app/admin/login/page.js` — admin login screen.
- `src/app/admin/dashboard/page.js` — admin area where event updates can be managed.
- `src/app/globals.css` — global CSS and Tailwind imports.

### `src/components/` (shared reusable UI)
- `Header.js` — navigation bar used across pages.
- `Footer.js` — footer used across pages.
- `EventCalendar.js` — placeholder component that will eventually render a FullCalendar calendar.
- `ResourceCard.js` — card component for resource items.
- `TeamMemberCard.js` — card component for team member profiles.

### `src/data/` (mock content)
- `events.js` — sample event data to be displayed in the calendar.
- `resources.js` — sample resource entries for the resources page.

### `src/lib/` (utility integrations)
- `supabase.js` — connection setup for Supabase client usage.

### `public/images/`
- Intended storage for images such as logos, banners, team photos, or event graphics.

## Current Implementation Status
This structure is intentionally a starter scaffold. The site is organized and ready for future expansion, but the actual functionality is still placeholder-based. The next step would be to implement the calendar, admin logic, authentication flow, and real Supabase data integration.

## Summary
This project is set up as a clean Next.js and Tailwind-based website scaffold for a student organization. It clearly separates public pages, admin pages, reusable components, and data sources so the app can grow into a full event and resource management website without becoming disorganized.