// ============================================================
//  RoboHolic — Firestore seed script
//  Populates the reference collections (ageGroups, programs, badges).
//
//  Usage:
//    1. Download a service account key from the Firebase console
//       (Project Settings → Service accounts → Generate new private key)
//       and save it as  scripts/serviceAccountKey.json   (git-ignored),
//       OR set FIREBASE_PROJECT_ID / FIREBASE_CLIENT_EMAIL / FIREBASE_PRIVATE_KEY.
//    2. Run:  npm run seed
// ============================================================
import { readFileSync, existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { initializeApp, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

const __dirname = dirname(fileURLToPath(import.meta.url));
const keyPath = join(__dirname, 'serviceAccountKey.json');

// ── Init admin app (local key file OR env vars) ─────────────
let credential;
if (existsSync(keyPath)) {
  credential = cert(JSON.parse(readFileSync(keyPath, 'utf8')));
  console.log('🔑 Using scripts/serviceAccountKey.json');
} else if (process.env.FIREBASE_PROJECT_ID) {
  credential = cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
  });
  console.log('🔑 Using FIREBASE_* environment variables');
} else {
  console.error('❌ No credentials found. Add scripts/serviceAccountKey.json or set FIREBASE_* env vars.');
  process.exit(1);
}

const app = initializeApp({ credential });
const db = getFirestore(app);

// ── Seed data ───────────────────────────────────────────────
const AGE_GROUPS = [
  { id: '4-5',   label: 'Ages 4–5',   emoji: '🌱', minAge: 4,  maxAge: 5,  nickname: 'Tiny Engineers', description: 'First steps into technology', sortOrder: 1 },
  { id: '6-7',   label: 'Ages 6–7',   emoji: '🚀', minAge: 6,  maxAge: 7,  nickname: 'Explorers',       description: 'Hands-on building and simple coding', sortOrder: 2 },
  { id: '8-9',   label: 'Ages 8–9',   emoji: '⚙️', minAge: 8,  maxAge: 9,  nickname: 'Builders',        description: 'Sensors, logic, and real projects', sortOrder: 3 },
  { id: '10-12', label: 'Ages 10–12', emoji: '🤖', minAge: 10, maxAge: 12, nickname: 'Innovators',      description: 'Advanced robotics and programming', sortOrder: 4 },
  { id: '13-15', label: 'Ages 13–15', emoji: '💡', minAge: 13, maxAge: 15, nickname: 'Engineers',       description: 'AI, IoT, web development, and competitions', sortOrder: 5 },
];

const PROGRAMS = [
  { slug: 'wedo', title: 'WeDo', shortTitle: null, description: 'LEGO-based hands-on robotics for beginners.', icon: '🧱', color: '#F97316', bgColor: '#FFF7ED', textColor: '#C2410C', category: 'robotics', ageGroups: ['6-7','8-9'], levels: ['Beginner','Intermediate'], tags: ['LEGO','Building','Sensors','Motors'], sortOrder: 1 },
  { slug: 'early-simple-machines', title: 'Early Simple Machines', shortTitle: 'Simple Machines', description: 'Levers, wheels, gears, and pulleys through building challenges.', icon: '⚙️', color: '#F59E0B', bgColor: '#FFFBEB', textColor: '#B45309', category: 'robotics', ageGroups: ['4-5','6-7'], levels: ['Beginner'], tags: ['Gears','Levers','Pulleys','Physics'], sortOrder: 2 },
  { slug: 'codey-rocky', title: 'Codey Rocky', shortTitle: null, description: 'A programmable robot introducing AI concepts and block coding.', icon: '🤖', color: '#3B82F6', bgColor: '#EFF6FF', textColor: '#1D4ED8', category: 'robotics', ageGroups: ['6-7','8-9'], levels: ['Beginner','Intermediate'], tags: ['Makeblock','Block Coding','AI Basics','Sensors'], sortOrder: 3 },
  { slug: 'mtiny', title: 'mTiny', shortTitle: null, description: 'Screen-free coding robot with a tap-and-play coding map.', icon: '🐣', color: '#EC4899', bgColor: '#FDF2F8', textColor: '#BE185D', category: 'robotics', ageGroups: ['4-5','6-7'], levels: ['Beginner'], tags: ['Screen-free','Sequences','Loops','Early Learning'], sortOrder: 4 },
  { slug: 'scratch-jr', title: 'Scratch Jr', shortTitle: null, description: 'Visual block coding on tablets for interactive stories.', icon: '🐱', color: '#8B5CF6', bgColor: '#F5F3FF', textColor: '#6D28D9', category: 'coding', ageGroups: ['4-5','6-7'], levels: ['Beginner'], tags: ['Visual Coding','Stories','Animation','iPad'], sortOrder: 5 },
  { slug: 'scratch', title: 'Scratch', shortTitle: null, description: 'Build games, animations, and interactive stories.', icon: '🐱', color: '#7C3AED', bgColor: '#F5F3FF', textColor: '#5B21B6', category: 'coding', ageGroups: ['8-9','10-12'], levels: ['Beginner','Intermediate','Advanced'], tags: ['Visual Coding','Games','Animation','Events'], sortOrder: 6 },
  { slug: 'ev3', title: 'EV3', shortTitle: 'LEGO EV3', description: 'LEGO Mindstorms EV3 — the classic competition robot.', icon: '🦾', color: '#EF4444', bgColor: '#FEF2F2', textColor: '#B91C1C', category: 'robotics', ageGroups: ['10-12','13-15'], levels: ['Intermediate','Advanced'], tags: ['LEGO','Competition','Sensors','PID Control'], sortOrder: 7 },
  { slug: 'spike-prime', title: 'Spike Prime', shortTitle: null, description: 'LEGO Education Spike Prime with Python support for FLL.', icon: '⚡', color: '#F97316', bgColor: '#FFF7ED', textColor: '#C2410C', category: 'robotics', ageGroups: ['10-12','13-15'], levels: ['Intermediate','Advanced'], tags: ['LEGO','FLL','Python','Competition'], sortOrder: 8 },
  { slug: 'microbit', title: 'micro:bit', shortTitle: null, description: 'Pocket-sized microcontroller for physical computing.', icon: '💻', color: '#10B981', bgColor: '#ECFDF5', textColor: '#047857', category: 'electronics', ageGroups: ['8-9','10-12'], levels: ['Beginner','Intermediate'], tags: ['BBC','Sensors','Display','MakeCode'], sortOrder: 9 },
  { slug: 'makey-makey', title: 'Makey Makey', shortTitle: null, description: 'Turn everyday objects into touchpads.', icon: '🎮', color: '#06B6D4', bgColor: '#ECFEFF', textColor: '#0E7490', category: 'electronics', ageGroups: ['8-9','10-12'], levels: ['Beginner','Intermediate'], tags: ['Invention','Creativity','Conductivity','Scratch'], sortOrder: 10 },
  { slug: 'mbot2', title: 'mBot2', shortTitle: null, description: 'Advanced educational robot with Scratch and Python support.', icon: '🤖', color: '#2563EB', bgColor: '#EFF6FF', textColor: '#1E40AF', category: 'robotics', ageGroups: ['10-12','13-15'], levels: ['Intermediate','Advanced'], tags: ['Makeblock','Python','Sensors','Autonomous'], sortOrder: 11 },
  { slug: 'arduino', title: 'Arduino', shortTitle: null, description: 'Open-source electronics platform programmed in C++.', icon: '🔌', color: '#0D9488', bgColor: '#F0FDFA', textColor: '#0F766E', category: 'electronics', ageGroups: ['13-15'], levels: ['Intermediate','Advanced'], tags: ['C++','Circuits','Sensors','IoT'], sortOrder: 12 },
  { slug: 'electronics', title: 'Electronics', shortTitle: null, description: 'Circuit fundamentals: resistors, LEDs, transistors, breadboards.', icon: '⚡', color: '#EAB308', bgColor: '#FEFCE8', textColor: '#A16207', category: 'electronics', ageGroups: ['10-12','13-15'], levels: ['Beginner','Intermediate'], tags: ['Circuits','Components','Ohms Law','Breadboard'], sortOrder: 13 },
  { slug: 'ai-ml-iot', title: 'AI / ML / IoT', shortTitle: 'AI & IoT', description: 'Artificial intelligence, machine learning, and IoT.', icon: '🧠', color: '#7C3AED', bgColor: '#F5F3FF', textColor: '#5B21B6', category: 'advanced', ageGroups: ['13-15'], levels: ['Intermediate','Advanced'], tags: ['AI','Machine Learning','IoT','Data'], sortOrder: 14 },
  { slug: 'drones', title: 'Drones', shortTitle: null, description: 'Fly, program, and build drones.', icon: '🚁', color: '#475569', bgColor: '#F8FAFC', textColor: '#334155', category: 'advanced', ageGroups: ['10-12','13-15'], levels: ['Intermediate','Advanced'], tags: ['Flight','Programming','Aerodynamics','Autonomous'], sortOrder: 15 },
  { slug: 'vr', title: 'VR', shortTitle: 'Virtual Reality', description: 'Create and explore virtual reality experiences.', icon: '🥽', color: '#0EA5E9', bgColor: '#F0F9FF', textColor: '#0369A1', category: 'advanced', ageGroups: ['13-15'], levels: ['Intermediate','Advanced'], tags: ['VR','3D','Immersive','Unity'], sortOrder: 16 },
  { slug: '3d-modeling', title: '3D Modeling', shortTitle: null, description: 'Design objects in 3D using tools like Tinkercad.', icon: '🎨', color: '#D97706', bgColor: '#FFFBEB', textColor: '#B45309', category: 'design', ageGroups: ['10-12','13-15'], levels: ['Beginner','Intermediate'], tags: ['Tinkercad','Design','CAD','Engineering'], sortOrder: 17 },
  { slug: '3d-printing', title: '3D Printing', shortTitle: null, description: 'From digital design to physical object.', icon: '🖨️', color: '#9333EA', bgColor: '#FAF5FF', textColor: '#7E22CE', category: 'design', ageGroups: ['10-12','13-15'], levels: ['Beginner','Intermediate'], tags: ['FDM','Slicing','Prototyping','Filament'], sortOrder: 18 },
  { slug: 'game-design', title: 'Game Design', shortTitle: null, description: 'Design and build real video games.', icon: '🎮', color: '#DC2626', bgColor: '#FEF2F2', textColor: '#991B1B', category: 'design', ageGroups: ['10-12','13-15'], levels: ['Beginner','Intermediate','Advanced'], tags: ['Unity','Godot','Level Design','Mechanics'], sortOrder: 19 },
  { slug: 'python', title: 'Python', shortTitle: null, description: 'Beginner-friendly text programming and real projects.', icon: '🐍', color: '#1D4ED8', bgColor: '#EFF6FF', textColor: '#1E40AF', category: 'coding', ageGroups: ['10-12','13-15'], levels: ['Beginner','Intermediate','Advanced'], tags: ['Text Coding','Variables','Functions','Projects'], sortOrder: 20 },
  { slug: 'html-css-js', title: 'HTML / CSS / JavaScript', shortTitle: 'Web Dev', description: 'Build real websites from scratch.', icon: '🌐', color: '#EA580C', bgColor: '#FFF7ED', textColor: '#C2410C', category: 'coding', ageGroups: ['10-12','13-15'], levels: ['Beginner','Intermediate','Advanced'], tags: ['Web','HTML','CSS','JavaScript'], sortOrder: 21 },
  { slug: 'php-mysql', title: 'PHP / MySQL', shortTitle: null, description: 'Server-side web development with databases.', icon: '🗄️', color: '#4F46E5', bgColor: '#EEF2FF', textColor: '#3730A3', category: 'coding', ageGroups: ['13-15'], levels: ['Intermediate','Advanced'], tags: ['Backend','Database','CRUD','Web Dev'], sortOrder: 22 },
  { slug: 'projects', title: 'Projects', shortTitle: null, description: 'Real-world interdisciplinary projects.', icon: '🏗️', color: '#0F766E', bgColor: '#F0FDFA', textColor: '#0F766E', category: 'projects', ageGroups: ['6-7','8-9','10-12','13-15'], levels: ['Beginner','Intermediate','Advanced'], tags: ['Interdisciplinary','Design Thinking','Teamwork','Presentation'], sortOrder: 23 },
  { slug: 'makex', title: 'MakeX Preparation', shortTitle: 'MakeX', description: 'Official MakeX competition training.', icon: '🏆', color: '#B45309', bgColor: '#FFFBEB', textColor: '#92400E', category: 'competition', ageGroups: ['10-12','13-15'], levels: ['Intermediate','Advanced'], tags: ['Competition','Strategy','MakeX','Team'], sortOrder: 24 },
  { slug: 'competition', title: 'Competition Training', shortTitle: null, description: 'Develop the skills to win competitions.', icon: '🥇', color: '#DC2626', bgColor: '#FEF2F2', textColor: '#991B1B', category: 'competition', ageGroups: ['8-9','10-12','13-15'], levels: ['Intermediate','Advanced'], tags: ['Strategy','Practice','Presentation','Teamwork'], sortOrder: 25 },
  { slug: 'invention', title: 'Invention & Innovation', shortTitle: null, description: 'Design thinking, prototyping, and pitching ideas.', icon: '💡', color: '#6D28D9', bgColor: '#F5F3FF', textColor: '#5B21B6', category: 'projects', ageGroups: ['10-12','13-15'], levels: ['Intermediate','Advanced'], tags: ['Design Thinking','Innovation','Prototype','Pitch'], sortOrder: 26 },
];

const BADGES = [
  { slug: 'first-lesson',      name: 'First Steps',       description: 'Completed your first lesson!',             icon: '👟', color: '#10B981', category: 'progress' },
  { slug: 'week-streak',       name: '7-Day Streak',      description: 'Showed up 7 sessions in a row!',           icon: '🔥', color: '#F97316', category: 'progress' },
  { slug: 'quiz-master',       name: 'Quiz Master',       description: 'Scored 100% on a quiz.',                   icon: '🎯', color: '#7C3AED', category: 'skill' },
  { slug: 'first-robot',       name: 'Robot Builder',     description: 'Built your first working robot!',          icon: '🤖', color: '#2563EB', category: 'achievement' },
  { slug: 'coder',             name: 'Coder',             description: 'Wrote your first program.',                icon: '💻', color: '#059669', category: 'skill' },
  { slug: 'innovator',         name: 'Innovator',         description: 'Submitted an original invention project.', icon: '💡', color: '#D97706', category: 'achievement' },
  { slug: 'team-player',       name: 'Team Player',       description: 'Completed a team challenge.',              icon: '🤝', color: '#0EA5E9', category: 'achievement' },
  { slug: 'competition-ready', name: 'Competition Ready', description: 'Completed competition training.',          icon: '🏆', color: '#B45309', category: 'competition' },
  { slug: 'bug-squasher',      name: 'Bug Squasher',      description: 'Fixed a bug all by yourself!',             icon: '🐛', color: '#EF4444', category: 'skill' },
  { slug: 'designer',          name: 'Designer',          description: 'Finished a 3D modeling project.',          icon: '🎨', color: '#EC4899', category: 'skill' },
  { slug: 'ai-explorer',       name: 'AI Explorer',       description: 'Completed the AI/ML introduction.',        icon: '🧠', color: '#6D28D9', category: 'skill' },
  { slug: 'makex-champion',    name: 'MakeX Champion',    description: 'Participated in a MakeX competition.',      icon: '🥇', color: '#EAB308', category: 'competition' },
];

// ── Write to Firestore (batched, idempotent by doc id) ──────
async function seedCollection(name, items, idField) {
  const batch = db.batch();
  for (const item of items) {
    const id = item[idField];
    batch.set(db.collection(name).doc(id), { ...item, updatedAt: new Date().toISOString() }, { merge: true });
  }
  await batch.commit();
  console.log(`✅ Seeded ${items.length} → ${name}`);
}

async function main() {
  console.log('🌱 Seeding RoboHolic Firestore...');
  await seedCollection('ageGroups', AGE_GROUPS, 'id');
  await seedCollection('programs',  PROGRAMS,   'slug');
  await seedCollection('badges',    BADGES,     'slug');
  console.log('🎉 Done!');
  process.exit(0);
}

main().catch((err) => { console.error('❌ Seed failed:', err); process.exit(1); });
