-- ============================================================
--  RoboHolic Robotics Academy — Database Schema (Supabase / PostgreSQL)
--  Run this in the Supabase SQL Editor (Project → SQL Editor → New query).
--  Safe to re-run: uses IF NOT EXISTS and ON CONFLICT guards.
-- ============================================================

-- ─── Enums ──────────────────────────────────────────────────
DO $$ BEGIN
  CREATE TYPE user_role        AS ENUM ('admin', 'coach', 'student');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE skill_level      AS ENUM ('Beginner', 'Intermediate', 'Advanced');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE resource_type    AS ENUM ('pdf', 'video', 'image', 'code', 'worksheet', 'link', 'slides');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE resource_audience AS ENUM ('coach', 'student', 'both');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE progress_status  AS ENUM ('not_started', 'in_progress', 'completed');
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE section_type     AS ENUM (
    'coach_prep','coach_steps','student_steps','activity','challenge',
    'extra_challenge','troubleshooting','assessment','homework','coach_notes'
  );
EXCEPTION WHEN duplicate_object THEN null; END $$;

DO $$ BEGIN
  CREATE TYPE submission_status AS ENUM ('submitted', 'reviewed', 'approved', 'needs_revision');
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ─── Profiles (extends Supabase auth.users) ─────────────────
CREATE TABLE IF NOT EXISTS profiles (
  id           UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name    TEXT,
  email        TEXT,
  role         user_role NOT NULL DEFAULT 'student',
  avatar_url   TEXT,
  age_group    TEXT,            -- '4-5','6-7','8-9','10-12','13-15'
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now(),
  updated_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Age groups (reference) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS age_groups (
  id         TEXT PRIMARY KEY,    -- '4-5'
  label      TEXT NOT NULL,
  emoji      TEXT,
  min_age    INTEGER,
  max_age    INTEGER,
  nickname   TEXT,                -- 'Tiny Engineers'
  description TEXT,
  sort_order INTEGER NOT NULL DEFAULT 0
);

-- ─── Programs (the 26 technologies) ─────────────────────────
CREATE TABLE IF NOT EXISTS programs (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug         TEXT UNIQUE NOT NULL,
  title        TEXT NOT NULL,
  short_title  TEXT,
  description  TEXT,
  icon         TEXT,             -- emoji
  color        TEXT,             -- hex
  bg_color     TEXT,
  text_color   TEXT,
  category     TEXT NOT NULL,    -- robotics, coding, electronics, design, advanced, competition, projects
  age_groups   TEXT[]  NOT NULL DEFAULT '{}',
  levels       skill_level[] NOT NULL DEFAULT '{}',
  tags         TEXT[]  NOT NULL DEFAULT '{}',
  sort_order   INTEGER NOT NULL DEFAULT 0,
  is_active    BOOLEAN NOT NULL DEFAULT true,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Courses ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS courses (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL,
  title         TEXT NOT NULL,
  program_id    UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  age_group     TEXT,
  level         skill_level,
  description   TEXT,
  objectives    TEXT[]  NOT NULL DEFAULT '{}',
  duration      TEXT,            -- '8 sessions × 45 min'
  total_hours   NUMERIC,
  prerequisites TEXT[]  NOT NULL DEFAULT '{}',
  skills        TEXT[]  NOT NULL DEFAULT '{}',
  thumbnail     TEXT,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  is_active     BOOLEAN NOT NULL DEFAULT true,
  created_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(program_id, slug)
);

-- ─── Modules ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS modules (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  course_id   UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title       TEXT NOT NULL,
  description TEXT,
  sort_order  INTEGER NOT NULL DEFAULT 0,
  created_at  TIMESTAMPTZ DEFAULT now()
);

-- ─── Lessons ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS lessons (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug          TEXT NOT NULL,
  title         TEXT NOT NULL,
  module_id     UUID REFERENCES modules(id) ON DELETE SET NULL,
  course_id     UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  program_id    UUID NOT NULL REFERENCES programs(id) ON DELETE CASCADE,
  sort_order    INTEGER NOT NULL DEFAULT 0,
  duration      TEXT,
  difficulty    INTEGER CHECK (difficulty BETWEEN 1 AND 5) DEFAULT 1,
  skills        TEXT[]  NOT NULL DEFAULT '{}',
  materials     JSONB   NOT NULL DEFAULT '[]',  -- [{item, quantity, isOptional}]
  objectives    TEXT[]  NOT NULL DEFAULT '{}',
  assessment_checklist TEXT[] NOT NULL DEFAULT '{}',
  age_group     TEXT,
  level         skill_level,
  is_published  BOOLEAN NOT NULL DEFAULT false,
  needs_review  BOOLEAN NOT NULL DEFAULT false,
  created_at    TIMESTAMPTZ DEFAULT now(),
  updated_at    TIMESTAMPTZ DEFAULT now(),
  UNIQUE(course_id, slug)
);

-- ─── Lesson sections (the 10 content blocks per lesson) ─────
CREATE TABLE IF NOT EXISTS lesson_sections (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID NOT NULL REFERENCES lessons(id) ON DELETE CASCADE,
  type          section_type NOT NULL,
  title         TEXT,
  emoji         TEXT,
  content       JSONB NOT NULL DEFAULT '[]',     -- string | string[] | steps[] | troubleshoot[]
  student_title TEXT,
  student_content JSONB,
  is_coach_only BOOLEAN NOT NULL DEFAULT false,
  sort_order    INTEGER NOT NULL DEFAULT 0
);

-- ─── Resources (uploaded files) ─────────────────────────────
CREATE TABLE IF NOT EXISTS resources (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title        TEXT NOT NULL,
  type         resource_type NOT NULL,
  audience     resource_audience NOT NULL DEFAULT 'both',
  url          TEXT NOT NULL,           -- Supabase Storage path or external URL
  description  TEXT,
  size_label   TEXT,
  lesson_id    UUID REFERENCES lessons(id)  ON DELETE CASCADE,
  course_id    UUID REFERENCES courses(id)  ON DELETE CASCADE,
  program_id   UUID REFERENCES programs(id) ON DELETE CASCADE,
  needs_review BOOLEAN NOT NULL DEFAULT false,
  review_notes TEXT,
  uploaded_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  created_at   TIMESTAMPTZ DEFAULT now()
);

-- ─── Quizzes ────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS quizzes (
  id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lesson_id     UUID REFERENCES lessons(id) ON DELETE CASCADE,
  title         TEXT NOT NULL,
  description   TEXT,
  passing_score INTEGER NOT NULL DEFAULT 70,
  time_limit    INTEGER,                 -- seconds, null = no limit
  created_at    TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS quiz_questions (
  id             UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quiz_id        UUID NOT NULL REFERENCES quizzes(id) ON DELETE CASCADE,
  text           TEXT NOT NULL,
  type           TEXT NOT NULL DEFAULT 'multiple_choice', -- multiple_choice, true_false, short_answer
  options        JSONB NOT NULL DEFAULT '[]',
  correct_answer TEXT,
  explanation    TEXT,
  points         INTEGER NOT NULL DEFAULT 1,
  sort_order     INTEGER NOT NULL DEFAULT 0
);

-- ─── Groups (class groups) ──────────────────────────────────
CREATE TABLE IF NOT EXISTS groups (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name         TEXT NOT NULL,
  coach_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  age_group    TEXT,
  current_course_id UUID REFERENCES courses(id) ON DELETE SET NULL,
  schedule     TEXT,
  created_at   TIMESTAMPTZ DEFAULT now()
);

CREATE TABLE IF NOT EXISTS group_students (
  group_id   UUID NOT NULL REFERENCES groups(id)   ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  PRIMARY KEY (group_id, student_id)
);

-- ─── Student progress ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS student_progress (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id    UUID NOT NULL REFERENCES lessons(id)  ON DELETE CASCADE,
  status       progress_status NOT NULL DEFAULT 'not_started',
  quiz_score   INTEGER,
  time_spent   INTEGER,                 -- minutes
  completed_at TIMESTAMPTZ,
  coach_id     UUID REFERENCES profiles(id) ON DELETE SET NULL,
  updated_at   TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, lesson_id)
);

-- ─── Badges & achievements ──────────────────────────────────
CREATE TABLE IF NOT EXISTS badges (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug        TEXT UNIQUE NOT NULL,
  name        TEXT NOT NULL,
  description TEXT,
  icon        TEXT,
  color       TEXT,
  category    TEXT NOT NULL DEFAULT 'progress', -- progress, skill, achievement, competition
  criteria    JSONB
);

CREATE TABLE IF NOT EXISTS user_badges (
  student_id    UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  badge_id      UUID NOT NULL REFERENCES badges(id)   ON DELETE CASCADE,
  earned_at     TIMESTAMPTZ DEFAULT now(),
  earned_reason TEXT,
  PRIMARY KEY (student_id, badge_id)
);

-- ─── Project submissions ────────────────────────────────────
CREATE TABLE IF NOT EXISTS submissions (
  id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id   UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  lesson_id    UUID REFERENCES lessons(id) ON DELETE SET NULL,
  type         TEXT NOT NULL DEFAULT 'file',  -- file, text, link, image
  content      TEXT,
  file_url     TEXT,
  status       submission_status NOT NULL DEFAULT 'submitted',
  feedback     TEXT,
  reviewed_by  UUID REFERENCES profiles(id) ON DELETE SET NULL,
  submitted_at TIMESTAMPTZ DEFAULT now(),
  reviewed_at  TIMESTAMPTZ
);

-- ============================================================
--  Helpful indexes
-- ============================================================
CREATE INDEX IF NOT EXISTS idx_courses_program     ON courses(program_id);
CREATE INDEX IF NOT EXISTS idx_modules_course      ON modules(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_course      ON lessons(course_id);
CREATE INDEX IF NOT EXISTS idx_lessons_program     ON lessons(program_id);
CREATE INDEX IF NOT EXISTS idx_sections_lesson     ON lesson_sections(lesson_id);
CREATE INDEX IF NOT EXISTS idx_resources_lesson    ON resources(lesson_id);
CREATE INDEX IF NOT EXISTS idx_progress_student    ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_progress_lesson     ON student_progress(lesson_id);

-- ============================================================
--  Row Level Security (RLS)
--  Note: tighten these as auth is built out. Curriculum content
--  is world-readable; per-user data is owner/coach/admin scoped.
-- ============================================================
ALTER TABLE profiles         ENABLE ROW LEVEL SECURITY;
ALTER TABLE programs         ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses          ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules          ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons          ENABLE ROW LEVEL SECURITY;
ALTER TABLE lesson_sections  ENABLE ROW LEVEL SECURITY;
ALTER TABLE resources        ENABLE ROW LEVEL SECURITY;
ALTER TABLE quizzes          ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_questions   ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE submissions      ENABLE ROW LEVEL SECURITY;
ALTER TABLE badges           ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_badges      ENABLE ROW LEVEL SECURITY;
ALTER TABLE age_groups       ENABLE ROW LEVEL SECURITY;
ALTER TABLE groups           ENABLE ROW LEVEL SECURITY;
ALTER TABLE group_students   ENABLE ROW LEVEL SECURITY;

-- Public read for curriculum reference tables
DO $$ BEGIN
  CREATE POLICY "public read programs"   ON programs   FOR SELECT USING (true);
  CREATE POLICY "public read courses"    ON courses    FOR SELECT USING (true);
  CREATE POLICY "public read modules"    ON modules    FOR SELECT USING (true);
  CREATE POLICY "public read lessons"    ON lessons    FOR SELECT USING (true);
  CREATE POLICY "public read sections"   ON lesson_sections FOR SELECT USING (true);
  CREATE POLICY "public read age_groups" ON age_groups FOR SELECT USING (true);
  CREATE POLICY "public read badges"     ON badges     FOR SELECT USING (true);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Profiles: a user can read/update their own row
DO $$ BEGIN
  CREATE POLICY "own profile read"   ON profiles FOR SELECT USING (auth.uid() = id);
  CREATE POLICY "own profile update" ON profiles FOR UPDATE USING (auth.uid() = id);
  CREATE POLICY "own profile insert" ON profiles FOR INSERT WITH CHECK (auth.uid() = id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- Student progress / submissions: owner can manage their own
DO $$ BEGIN
  CREATE POLICY "own progress"    ON student_progress FOR ALL USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);
  CREATE POLICY "own submissions" ON submissions      FOR ALL USING (auth.uid() = student_id) WITH CHECK (auth.uid() = student_id);
  CREATE POLICY "own badges read" ON user_badges      FOR SELECT USING (auth.uid() = student_id);
EXCEPTION WHEN duplicate_object THEN null; END $$;

-- ============================================================
--  Auto-create a profile row when a new auth user signs up
-- ============================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'student')
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
--  SEED DATA
-- ============================================================

-- Age groups
INSERT INTO age_groups (id, label, emoji, min_age, max_age, nickname, description, sort_order) VALUES
  ('4-5',   'Ages 4–5',   '🌱', 4,  5,  'Tiny Engineers', 'First steps into technology', 1),
  ('6-7',   'Ages 6–7',   '🚀', 6,  7,  'Explorers',      'Hands-on building and simple coding', 2),
  ('8-9',   'Ages 8–9',   '⚙️', 8,  9,  'Builders',       'Sensors, logic, and real projects', 3),
  ('10-12', 'Ages 10–12', '🤖', 10, 12, 'Innovators',     'Advanced robotics and programming', 4),
  ('13-15', 'Ages 13–15', '💡', 13, 15, 'Engineers',      'AI, IoT, web development, and competitions', 5)
ON CONFLICT (id) DO NOTHING;

-- The 26 Programs
INSERT INTO programs (slug, title, short_title, description, icon, color, bg_color, text_color, category, age_groups, levels, tags, sort_order) VALUES
  ('wedo',                  'WeDo',                   NULL,             'LEGO-based hands-on robotics for beginners.',                         '🧱', '#F97316', '#FFF7ED', '#C2410C', 'robotics',    ARRAY['6-7','8-9'],            ARRAY['Beginner','Intermediate']::skill_level[],            ARRAY['LEGO','Building','Sensors','Motors'], 1),
  ('early-simple-machines', 'Early Simple Machines',  'Simple Machines','Levers, wheels, gears, and pulleys through building challenges.',      '⚙️', '#F59E0B', '#FFFBEB', '#B45309', 'robotics',    ARRAY['4-5','6-7'],            ARRAY['Beginner']::skill_level[],                           ARRAY['Gears','Levers','Pulleys','Physics'], 2),
  ('codey-rocky',           'Codey Rocky',            NULL,             'A programmable robot introducing AI concepts and block coding.',      '🤖', '#3B82F6', '#EFF6FF', '#1D4ED8', 'robotics',    ARRAY['6-7','8-9'],            ARRAY['Beginner','Intermediate']::skill_level[],            ARRAY['Makeblock','Block Coding','AI Basics','Sensors'], 3),
  ('mtiny',                 'mTiny',                  NULL,             'Screen-free coding robot with a tap-and-play coding map.',            '🐣', '#EC4899', '#FDF2F8', '#BE185D', 'robotics',    ARRAY['4-5','6-7'],            ARRAY['Beginner']::skill_level[],                           ARRAY['Screen-free','Sequences','Loops','Early Learning'], 4),
  ('scratch-jr',            'Scratch Jr',             NULL,             'Visual block coding on tablets for interactive stories.',             '🐱', '#8B5CF6', '#F5F3FF', '#6D28D9', 'coding',      ARRAY['4-5','6-7'],            ARRAY['Beginner']::skill_level[],                           ARRAY['Visual Coding','Stories','Animation','iPad'], 5),
  ('scratch',               'Scratch',                NULL,             'Build games, animations, and interactive stories.',                   '🐱', '#7C3AED', '#F5F3FF', '#5B21B6', 'coding',      ARRAY['8-9','10-12'],          ARRAY['Beginner','Intermediate','Advanced']::skill_level[], ARRAY['Visual Coding','Games','Animation','Events'], 6),
  ('ev3',                   'EV3',                    'LEGO EV3',       'LEGO Mindstorms EV3 — the classic competition robot.',                '🦾', '#EF4444', '#FEF2F2', '#B91C1C', 'robotics',    ARRAY['10-12','13-15'],        ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['LEGO','Competition','Sensors','PID Control'], 7),
  ('spike-prime',           'Spike Prime',            NULL,             'LEGO Education Spike Prime with Python support for FLL.',              '⚡', '#F97316', '#FFF7ED', '#C2410C', 'robotics',    ARRAY['10-12','13-15'],        ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['LEGO','FLL','Python','Competition'], 8),
  ('microbit',              'micro:bit',              NULL,             'Pocket-sized microcontroller for physical computing.',                '💻', '#10B981', '#ECFDF5', '#047857', 'electronics', ARRAY['8-9','10-12'],          ARRAY['Beginner','Intermediate']::skill_level[],            ARRAY['BBC','Sensors','Display','MakeCode'], 9),
  ('makey-makey',           'Makey Makey',            NULL,             'Turn everyday objects into touchpads.',                               '🎮', '#06B6D4', '#ECFEFF', '#0E7490', 'electronics', ARRAY['8-9','10-12'],          ARRAY['Beginner','Intermediate']::skill_level[],            ARRAY['Invention','Creativity','Conductivity','Scratch'], 10),
  ('mbot2',                 'mBot2',                  NULL,             'Advanced educational robot with Scratch and Python support.',         '🤖', '#2563EB', '#EFF6FF', '#1E40AF', 'robotics',    ARRAY['10-12','13-15'],        ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['Makeblock','Python','Sensors','Autonomous'], 11),
  ('arduino',               'Arduino',                NULL,             'Open-source electronics platform programmed in C++.',                 '🔌', '#0D9488', '#F0FDFA', '#0F766E', 'electronics', ARRAY['13-15'],                ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['C++','Circuits','Sensors','IoT'], 12),
  ('electronics',           'Electronics',            NULL,             'Circuit fundamentals: resistors, LEDs, transistors, breadboards.',    '⚡', '#EAB308', '#FEFCE8', '#A16207', 'electronics', ARRAY['10-12','13-15'],        ARRAY['Beginner','Intermediate']::skill_level[],            ARRAY['Circuits','Components','Ohms Law','Breadboard'], 13),
  ('ai-ml-iot',             'AI / ML / IoT',          'AI & IoT',       'Artificial intelligence, machine learning, and IoT.',                 '🧠', '#7C3AED', '#F5F3FF', '#5B21B6', 'advanced',    ARRAY['13-15'],                ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['AI','Machine Learning','IoT','Data'], 14),
  ('drones',                'Drones',                 NULL,             'Fly, program, and build drones.',                                     '🚁', '#475569', '#F8FAFC', '#334155', 'advanced',    ARRAY['10-12','13-15'],        ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['Flight','Programming','Aerodynamics','Autonomous'], 15),
  ('vr',                    'VR',                     'Virtual Reality','Create and explore virtual reality experiences.',                     '🥽', '#0EA5E9', '#F0F9FF', '#0369A1', 'advanced',    ARRAY['13-15'],                ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['VR','3D','Immersive','Unity'], 16),
  ('3d-modeling',           '3D Modeling',            NULL,             'Design objects in 3D using tools like Tinkercad.',                    '🎨', '#D97706', '#FFFBEB', '#B45309', 'design',      ARRAY['10-12','13-15'],        ARRAY['Beginner','Intermediate']::skill_level[],            ARRAY['Tinkercad','Design','CAD','Engineering'], 17),
  ('3d-printing',           '3D Printing',            NULL,             'From digital design to physical object.',                             '🖨️', '#9333EA', '#FAF5FF', '#7E22CE', 'design',      ARRAY['10-12','13-15'],        ARRAY['Beginner','Intermediate']::skill_level[],            ARRAY['FDM','Slicing','Prototyping','Filament'], 18),
  ('game-design',           'Game Design',            NULL,             'Design and build real video games.',                                  '🎮', '#DC2626', '#FEF2F2', '#991B1B', 'design',      ARRAY['10-12','13-15'],        ARRAY['Beginner','Intermediate','Advanced']::skill_level[], ARRAY['Unity','Godot','Level Design','Mechanics'], 19),
  ('python',                'Python',                 NULL,             'Beginner-friendly text programming and real projects.',               '🐍', '#1D4ED8', '#EFF6FF', '#1E40AF', 'coding',      ARRAY['10-12','13-15'],        ARRAY['Beginner','Intermediate','Advanced']::skill_level[], ARRAY['Text Coding','Variables','Functions','Projects'], 20),
  ('html-css-js',           'HTML / CSS / JavaScript','Web Dev',        'Build real websites from scratch.',                                   '🌐', '#EA580C', '#FFF7ED', '#C2410C', 'coding',      ARRAY['10-12','13-15'],        ARRAY['Beginner','Intermediate','Advanced']::skill_level[], ARRAY['Web','HTML','CSS','JavaScript'], 21),
  ('php-mysql',             'PHP / MySQL',            NULL,             'Server-side web development with databases.',                         '🗄️', '#4F46E5', '#EEF2FF', '#3730A3', 'coding',      ARRAY['13-15'],                ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['Backend','Database','CRUD','Web Dev'], 22),
  ('projects',              'Projects',               NULL,             'Real-world interdisciplinary projects.',                              '🏗️', '#0F766E', '#F0FDFA', '#0F766E', 'projects',    ARRAY['6-7','8-9','10-12','13-15'], ARRAY['Beginner','Intermediate','Advanced']::skill_level[], ARRAY['Interdisciplinary','Design Thinking','Teamwork','Presentation'], 23),
  ('makex',                 'MakeX Preparation',      'MakeX',          'Official MakeX competition training.',                                '🏆', '#B45309', '#FFFBEB', '#92400E', 'competition', ARRAY['10-12','13-15'],        ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['Competition','Strategy','MakeX','Team'], 24),
  ('competition',           'Competition Training',   NULL,             'Develop the skills to win competitions.',                             '🥇', '#DC2626', '#FEF2F2', '#991B1B', 'competition', ARRAY['8-9','10-12','13-15'],  ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['Strategy','Practice','Presentation','Teamwork'], 25),
  ('invention',             'Invention & Innovation', NULL,             'Design thinking, prototyping, and pitching ideas.',                   '💡', '#6D28D9', '#F5F3FF', '#5B21B6', 'projects',    ARRAY['10-12','13-15'],        ARRAY['Intermediate','Advanced']::skill_level[],            ARRAY['Design Thinking','Innovation','Prototype','Pitch'], 26)
ON CONFLICT (slug) DO NOTHING;

-- Badges
INSERT INTO badges (slug, name, description, icon, color, category) VALUES
  ('first-lesson',      'First Steps',      'Completed your first lesson!',             '👟', '#10B981', 'progress'),
  ('week-streak',       '7-Day Streak',     'Showed up 7 sessions in a row!',           '🔥', '#F97316', 'progress'),
  ('quiz-master',       'Quiz Master',      'Scored 100% on a quiz.',                   '🎯', '#7C3AED', 'skill'),
  ('first-robot',       'Robot Builder',    'Built your first working robot!',          '🤖', '#2563EB', 'achievement'),
  ('coder',             'Coder',            'Wrote your first program.',                '💻', '#059669', 'skill'),
  ('innovator',         'Innovator',        'Submitted an original invention project.', '💡', '#D97706', 'achievement'),
  ('team-player',       'Team Player',      'Completed a team challenge.',              '🤝', '#0EA5E9', 'achievement'),
  ('competition-ready', 'Competition Ready','Completed competition training.',          '🏆', '#B45309', 'competition'),
  ('bug-squasher',      'Bug Squasher',     'Fixed a bug all by yourself!',             '🐛', '#EF4444', 'skill'),
  ('designer',          'Designer',         'Finished a 3D modeling project.',          '🎨', '#EC4899', 'skill'),
  ('ai-explorer',       'AI Explorer',      'Completed the AI/ML introduction.',        '🧠', '#6D28D9', 'skill'),
  ('makex-champion',    'MakeX Champion',   'Participated in a MakeX competition.',     '🥇', '#EAB308', 'competition')
ON CONFLICT (slug) DO NOTHING;
