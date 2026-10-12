# Club site

Public event calendar, resources, team page, and an admin login for editing events.
Built with Next.js, Tailwind CSS, FullCalendar, and Supabase.

## How the data works

There is one database table, `events`, with these columns:
title, description, speaker, location, date, time.

Anyone can read events. Anyone who is signed in can add, edit, and delete them.
Sign-ups are turned off in Supabase, so the only people who can sign in are
accounts an admin created by hand. That is what makes "signed in" mean "admin".

## Run it locally

1. Install Node.js (LTS) and run `npm install`.
2. Create a free project at supabase.com. In the SQL Editor, run `supabase/schema.sql`.
3. In Authentication > Users > Add user, create your admin account (tick auto-confirm).
4. In Authentication > Sign In / Providers, turn OFF "Allow new users to sign up".
   Do not skip this step: it is the only thing keeping strangers out of the admin page.
5. Copy `.env.local.example` to `.env.local` and paste your Project URL and anon key
   (Supabase: Project Settings > API).
6. Run `npm run dev` and open http://localhost:3000.

## Where to edit things

| To change...                  | Edit this file               |
| ----------------------------- | ---------------------------- |
| Club name, tagline, socials   | `data/site.js`               |
| Team members                  | `data/team.js`               |
| Resource links                | `data/resources.js`          |
| Colors and fonts              | `app/globals.css`, `app/layout.js` |
| Events                        | `/admin` page on the live site |

## Deploy

Push to GitHub, import the repo in Vercel, and add the two environment variables from
`.env.local` under Project Settings > Environment Variables. Every push redeploys.

## Handing off to next year's officers

- Store the Supabase, GitHub, and Vercel logins in a shared password manager.
- To add an admin: Supabase > Authentication > Users > Add user. No other step needed.
- To remove an admin: delete their user in the same place.
- Free Supabase projects pause after a week of inactivity; open the admin page occasionally over breaks.
