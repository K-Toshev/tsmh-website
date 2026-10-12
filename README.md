# Club site

Public event calendar, resources, team page, and an admin login for editing events.
Built with Next.js, Tailwind CSS, FullCalendar, and Supabase.

## Run it locally

1. Install Node.js (LTS) and run `npm install`.
2. Create a free project at supabase.com. In the SQL Editor, run `supabase/schema.sql`.
3. In Supabase, go to Authentication > Users > Add user (tick auto-confirm), then run the
   `insert into admins ...` snippet at the bottom of `schema.sql` with that email.
4. In Authentication > Sign In / Providers, turn off "Allow new users to sign up".
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
- Add new admins: create the user in Supabase, then insert their id into `admins`.
- Free Supabase projects pause after a week of inactivity; open the admin page occasionally over breaks.
