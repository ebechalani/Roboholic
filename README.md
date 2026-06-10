# 🤖 RoboHolic Robotics Academy — Curriculum Platform

The official curriculum platform for RoboHolic Robotics Academy. Lesson plans,
interactive activities, projects, quizzes, resources, and progress tracking for
**coaches** and **students** — across 26 technology programs and 5 age groups.

Built with **Next.js 14 + TypeScript + Tailwind CSS + Supabase**, deployed on **Vercel**.

---

## ✨ Features

- **Homepage** with all 26 programs, filterable by category & age
- **Coach dashboard** — today's lessons, groups, progress tracking, quick access
- **Student dashboard** — missions, badges, progress ring, project submission
- **Curriculum map** — search & filter by age, level, technology
- **Full lesson pages** — 15 sections, Coach ↔ Student view toggle, printable
- **Sample curriculum** — complete Scratch Jr course ("My First Stories", 8 lessons)

---

## 🚀 Local Development

```bash
npm install
cp .env.local.example .env.local   # then fill in your Supabase keys
npm run dev
```

Open <http://localhost:3000>.

### Key routes
| Page | Path |
|------|------|
| Homepage | `/` |
| Coach dashboard | `/dashboard/coach` |
| Student dashboard | `/dashboard/student` |
| Curriculum map | `/curriculum` |
| Program page | `/curriculum/scratch-jr` |
| Lesson page | `/lessons/sjb-l1` |

---

## 🗄️ Supabase Setup

1. Create a project at <https://supabase.com>.
2. In the dashboard, open **SQL Editor → New query**, paste the contents of
   [`supabase/schema.sql`](supabase/schema.sql), and run it. This creates all
   tables, RLS policies, the new-user trigger, and seeds the 26 programs,
   age groups, and badges.
3. Copy your **Project URL** and **anon public key** from
   **Project Settings → API**.
4. Put them in `.env.local` (see `.env.local.example`).
5. (Later) Create a **Storage bucket** named `resources` for uploaded PDFs,
   worksheets, images, and code files.

The Supabase clients live in:
- `src/lib/supabase/client.ts` — browser (Client Components)
- `src/lib/supabase/server.ts` — server (Server Components / Actions / Route Handlers)

---

## ▲ Deploy to Vercel

1. Push to GitHub (done — `github.com/ebechalani/RoboHolic`).
2. In Vercel, **Add New → Project** and import the `RoboHolic` repo.
   Next.js is auto-detected — no `vercel.json` needed.
3. Add the two environment variables under
   **Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy. Future pushes to `main` auto-deploy.

---

## 📁 Project Structure

```
src/
  app/
    page.tsx                       # Homepage
    curriculum/                    # Curriculum map + program pages
    lessons/[lessonId]/            # Full lesson template
    dashboard/coach|student/       # Role dashboards
  components/layout/               # Navbar, Sidebar, Footer
  lib/
    data.ts                        # Programs, age groups, badges, mock dashboards
    curricula/scratch-jr.ts        # Sample full curriculum
    supabase/client.ts|server.ts   # Supabase clients
  types/index.ts                   # Shared TypeScript types
supabase/schema.sql                # Database schema + seed data
```

---

## 🛣️ Roadmap

- [ ] Authentication (coach / student / admin roles via Supabase Auth)
- [ ] Migrate curriculum content from `lib/data.ts` into Supabase tables
- [ ] Admin content editor (create/edit lessons, upload resources)
- [ ] Resource upload → Supabase Storage with auto-classification
- [ ] Interactive quiz engine with scoring + badge awards
- [ ] Student project submissions & coach review
- [ ] Fill in the remaining 25 programs as materials are uploaded

---

_Build · Code · Innovate · 🚀_
