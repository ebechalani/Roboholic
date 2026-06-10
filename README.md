# 🤖 RoboHolic Robotics Academy — Curriculum Platform

The official curriculum platform for RoboHolic Robotics Academy. Lesson plans,
interactive activities, projects, quizzes, resources, and progress tracking for
**coaches** and **students** — across 26 technology programs and 5 age groups.

Built with **Next.js 14 + TypeScript + Tailwind CSS + Firebase**, deployed on **Vercel**.

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

## 🔥 Firebase Setup

1. Create a project at <https://console.firebase.google.com>.
2. Enable the services you need:
   - **Authentication** → Sign-in method → enable **Email/Password** (add Google later if desired).
   - **Firestore Database** → create database (start in production mode).
   - **Storage** → set up a default bucket.
3. **Register a Web app** (Project settings → General → Your apps → `</>`) and
   copy the SDK config into `.env.local` (see `.env.local.example`) as the
   `NEXT_PUBLIC_FIREBASE_*` values.
4. **Service account** (for the seed script + server SDK): Project settings →
   Service accounts → *Generate new private key*. Either:
   - save it as `scripts/serviceAccountKey.json` (git-ignored), **or**
   - set `FIREBASE_PROJECT_ID` / `FIREBASE_CLIENT_EMAIL` / `FIREBASE_PRIVATE_KEY`.
5. **Seed the database** with the 26 programs, age groups, and badges:
   ```bash
   npm run seed
   ```
6. **Deploy security rules** (after installing the Firebase CLI, `npm i -g firebase-tools`):
   ```bash
   firebase deploy --only firestore:rules,storage
   ```

### Firebase code map
- `src/lib/firebase/client.ts` — browser SDK (`auth`, `db`, `storage`)
- `src/lib/firebase/admin.ts` — Admin SDK (server only)
- `firestore.rules` / `storage.rules` — security rules
- `scripts/seed.mjs` — Firestore seed script (`npm run seed`)

### Firestore data model (collections)
```
ageGroups/{id}            programs/{slug}        courses/{id}
modules/{id}              lessons/{id}           lessonSections/{id}
resources/{id}            quizzes/{id}/questions  badges/{slug}
users/{uid}               groups/{id}            studentProgress/{id}
submissions/{id}          userBadges/{id}
```
Roles (`admin` / `coach` / `student`) are stored on each `users/{uid}` doc and
enforced by the security rules.

---

## ▲ Deploy to Vercel

1. Push to GitHub (done — `github.com/ebechalani/RoboHolic`).
2. In Vercel, **Add New → Project** and import the `Roboholic` repo.
   Next.js is auto-detected — no `vercel.json` needed.
3. Add the environment variables under
   **Project → Settings → Environment Variables** — all the
   `NEXT_PUBLIC_FIREBASE_*` values, plus `FIREBASE_PROJECT_ID`,
   `FIREBASE_CLIENT_EMAIL`, and `FIREBASE_PRIVATE_KEY` for server features.
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
    firebase/client.ts|admin.ts    # Firebase SDKs
  types/index.ts                   # Shared TypeScript types
firestore.rules / storage.rules    # Security rules
firebase.json                      # Firebase config
scripts/seed.mjs                   # Firestore seed script
```

---

## 🛣️ Roadmap

- [ ] Authentication (coach / student / admin roles via Firebase Auth)
- [ ] Migrate curriculum content from `lib/data.ts` into Firestore
- [ ] Admin content editor (create/edit lessons, upload resources)
- [ ] Resource upload → Firebase Storage with auto-classification
- [ ] Interactive quiz engine with scoring + badge awards
- [ ] Student project submissions & coach review
- [ ] Fill in the remaining 25 programs as materials are uploaded

---

_Build · Code · Innovate · 🚀_
