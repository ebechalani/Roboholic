import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';
import { DISCOVER_EXTRAS } from './mtiny-discover-extras';

// ════════════════════════════════════════════════════════════════
//  mTiny — screen-free tangible coding (ages 4–6)
//  Two sources:
//   • the official "mTiny Coding Activity Sample Plan" (mTiny's Weekend),
//     rasterized as an in-app gallery, and
//   • the full official mTiny Discover curriculum (Units 1–3, 15 lessons)
//     — every lesson plan PDF, Engage video and unit workbook deep-linked
//     from the academy's "mTiny Discover Curriculum - TOC" document.
// ════════════════════════════════════════════════════════════════

const SLUG = 'mtiny-l1';

function gallery(pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${SLUG}/p-${n}.png`, kind: 'photo', caption: `Activity plan — page ${i}` });
  }
  return imgs;
}

const sections: LessonSection[] = [
  {
    type: 'coach_prep',
    title: 'Before-Class Preparation',
    emoji: '📋',
    isCoachOnly: true,
    content: [
      'Set out the mTiny kit per group: the mTiny robot + Tap Pen, the Input Card, the Go! Card, and Coding Cards (Forward ×4, Turn Right ×4, Turn Left ×4, Repeat ×2/×3/×4).',
      'Lay out the picture Mats: Lawn ×7, plus Book, Bathtub, Bed, Bamboo, Cake, Football, and Carousel.',
      'mTiny is screen-free — children program by snapping physical Coding Cards and tapping them with the pen. Practise once yourself.',
      'Decide on a simple weekend scenario to model (e.g. wake up → breakfast → play football → cake).',
      'The activity plan is official (Makeblock); the prompts/timings here are adaptable.',
    ],
  },
  {
    type: 'coach_steps',
    title: 'Step-by-Step Coach Guide (30–45 min)',
    emoji: '🎓',
    isCoachOnly: true,
    content: [
      { step: 1, instruction: 'ENGAGE (5 min): "Let\'s help mTiny plan his weekend!" Talk about what the children do on weekends (eat, play, sleep).', tip: 'Relate the picture mats to the children\'s own weekends.' },
      { step: 2, instruction: 'SET THE SCENE (5–10 min): Children assemble the mats in order to make mTiny\'s weekend route (e.g. Bed → Bathtub → Cake → Football).', coachNote: 'This is the "story" — let them be creative with the order.' },
      { step: 3, instruction: 'CODE THE ROUTE (15 min): Children snap Coding Cards (Forward, Turn Left/Right, Repeat) to make mTiny travel the route, tap them with the pen, then place the Go! Card to run it.', tip: 'Introduce Repeat cards once they\'re comfortable with Forward/Turn.' },
      { step: 4, instruction: 'TELL THE STORY (5 min): As mTiny moves mat to mat, children narrate what mTiny does at each place.' },
      { step: 5, instruction: 'WRAP-UP: Children describe their route. Set the homework: draw a pictorial activity log of mTiny\'s weekend.' },
    ],
  },
  {
    type: 'student_steps',
    title: 'Help mTiny Plan His Weekend! 🐼',
    emoji: '🎯',
    studentTitle: 'Help mTiny Plan His Weekend! 🐼',
    content: [
      'Lay out the picture mats to make mTiny\'s weekend route.',
      'Snap the Coding Cards: Forward, Turn, and Repeat.',
      'Tap your cards with the pen, then place the Go! card.',
      'Watch mTiny travel the route — tell the story of his weekend!',
    ],
    studentContent: [
      '🗺️ Lay out the mats (Bed, Cake, Football…)',
      '🟦 Snap your cards: Forward + Turn',
      '🟢 Tap them, then put the Go! card',
      '🐼 Watch mTiny go — tell his story!',
    ],
  },
  {
    type: 'activity',
    title: 'Activity: mTiny\'s Weekend',
    emoji: '🛠️',
    content: [
      'Children help mTiny plan his weekend. They build a scenario, assemble the picture mats into a route, then snap and tap Coding Cards to make mTiny travel it — narrating mTiny\'s weekend story along the way.',
      'The full activity plan pages (intended outcomes, resources, and step-by-step) are below:',
    ],
    studentContent: [
      '🗺️ Build mTiny\'s weekend route with the mats',
      '🟦 Code it with Forward / Turn / Repeat cards',
      '🟢 Tap, then Go!',
      '🐼 Tell mTiny\'s weekend story',
    ],
    images: gallery(5),
  },
  {
    type: 'challenge',
    title: 'Make It Longer',
    emoji: '🎚️',
    content: [
      'Add more mats to make a longer weekend route.',
      'Use a Repeat card (×2/×3) instead of placing the same Forward card many times.',
    ],
    studentContent: ['➕ Add more places to mTiny\'s weekend', '🔁 Use a Repeat card to go further!'],
  },
  {
    type: 'troubleshooting',
    title: 'Common Problems & Solutions',
    emoji: '🔧',
    isCoachOnly: true,
    content: [
      { problem: 'mTiny doesn\'t move when tapped', cause: 'Cards not tapped in order, or no Go! card.', solution: 'Tap each card with the pen left-to-right, then place/tap the Go! card to run the sequence.' },
      { problem: 'mTiny goes the wrong way', cause: 'Turn card direction, or mTiny\'s starting orientation.', solution: 'Check which way mTiny faces at the start, and whether Turn Left/Right matches the route.' },
      { problem: 'mTiny overshoots a mat', cause: 'Too many Forward cards.', solution: 'One Forward usually moves one mat — count the mats and match the Forward cards.' },
      { problem: 'A child is overwhelmed — Suggested', cause: 'Too many cards at once.', solution: 'Start with just Forward + one Turn; add Repeat later once they\'re confident.' },
    ],
  },
  {
    type: 'assessment',
    title: 'Assessment Checklist',
    emoji: '✅',
    content: [
      'Child assembled the mats into a route in order.',
      'Child described mTiny\'s weekend activities from the mat pictures.',
      'Child snapped and tapped the correct Coding Cards to follow the route.',
      'Child made mTiny travel the route with the Go! card.',
    ],
  },
  {
    type: 'homework',
    title: 'Draw It at Home',
    emoji: '🏠',
    content: [
      'Draw a pictorial activity log of mTiny\'s weekend — one picture for each thing mTiny did.',
      'Tell a family member the story of mTiny\'s weekend in order.',
    ],
    studentContent: ['🎨 Draw mTiny\'s weekend (one picture per activity)', '👨‍👩‍👧 Tell your family the story!'],
  },
  {
    type: 'coach_notes',
    title: 'Coach Notes (Private)',
    emoji: '📝',
    isCoachOnly: true,
    content: [
      'CONCEPT: screen-free tangible coding — sequencing and simple loops with physical cards. Key competencies: hand-eye coordination, memory, route planning, spatial reasoning, empathy.',
      'mTiny suits ages 4–6; keep it playful and story-driven. No screens involved.',
      'FULL CURRICULUM: the complete mTiny Discover curriculum (Units 1–3, lessons 1.1–3.5) is on this course too — each lesson links its official plan PDF, Engage video and unit workbooks.',
      'SUGGESTED CONTENT: the sample activity plan is official; prompts here are adaptable.',
    ],
  },
];

export const MTINY_LESSON: LessonDetail = {
  id: SLUG, slug: 'mtiny-weekend', title: "mTiny's Weekend (Sample Activity)",
  programId: 'mtiny', programSlug: 'mtiny', programTitle: 'mTiny',
  programColor: '#EC4899',
  courseId: 'mtiny-discover', courseTitle: 'mTiny: Screen-Free Coding',
  moduleId: 'mtiny-m1', moduleTitle: 'mTiny Coding Activities',
  ageGroup: '4-5', level: 'Beginner', duration: '30–45 minutes', difficulty: 1,
  heroImage: `/lessons/${SLUG}/p-01.png`,
  skills: ['Sequencing', 'Route Planning', 'Screen-Free Coding', 'Storytelling'],
  materials: [
    { item: 'mTiny robot + Tap Pen (mTiny Toolkit)', quantity: '1 per group' },
    { item: 'Coding Cards: Forward ×4, Turn Right ×4, Turn Left ×4, Repeat ×2/×3/×4', quantity: '1 set per group' },
    { item: 'Input Card + Go! Card', quantity: '1 each per group' },
    { item: 'Picture Mats: Lawn ×7, Book, Bathtub, Bed, Bamboo, Cake, Football, Carousel', quantity: '1 set per group' },
  ],
  objectives: [
    "Describe mTiny's weekend activities from the pictures on the mats.",
    'Assemble the mats in order based on a weekend scenario.',
    'Snap the right Coding Cards to make mTiny follow the route.',
    'Build sequencing, route-planning, and storytelling skills (screen-free).',
  ],
  assessmentChecklist: [
    'Assembled a mat route in order.',
    'Coded mTiny along the route with the cards.',
    'Told the weekend story.',
  ],
  sections,
  quiz: [
    { question: 'How do you tell mTiny what to do?', options: ['tap the coding cards', 'type on a keyboard', 'shout at it', 'shake it'], answerIndex: 0 },
    { question: 'mTiny moves along the:', options: ['map/mat squares', 'table edge', 'wall', 'ceiling'], answerIndex: 0 },
    { question: 'Putting the cards in the right order is like making a:', options: ['program (sequence)', 'drawing', 'song', 'snack'], answerIndex: 0 },
  ],
  resources: [
    { id: `${SLUG}-r1`, title: 'mTiny Coding Activity — Sample Plan (PDF)', type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-mtiny', description: "mTiny's Weekend activity plan", needsReview: true },
    { id: `${SLUG}-r2`, title: 'mTiny — Developing Literacy & Numeracy (Guide)', type: 'pdf', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-mtiny', description: 'Background guide on tangible programming', needsReview: true },
    { id: `${SLUG}-r3`, title: 'mTiny — A Beginner’s Guide (Makeblock, official)', type: 'link', audience: 'both', url: 'https://support.makeblock.com/hc/en-us/articles/12823234387479-A-Beginner-s-Guide-to-mTiny', description: 'Official Makeblock guide, lessons & activities for mTiny' },
  ],
};

// ════════════════════════════════════════════════════════════════
//  mTiny Discover curriculum — official Units 1–3 (15 lessons).
//  Every link below comes from the academy's "mTiny Discover
//  Curriculum - TOC" PDF: per-lesson plan + Engage video, per-unit
//  learner/educator workbooks and full-curriculum PDFs.
// ════════════════════════════════════════════════════════════════
const D = (id: string) => `https://drive.google.com/file/d/${id}/view?usp=sharing`;
const DISCOVER_GUIDE = D('12U9EGGCSU-Z4bcbEZ_ORgbz6HD_mAqlW');
const DISCOVER_FOLDER = 'https://drive.google.com/drive/folders/1EFA-BObPaa8UwZ8niac7mUxjc4a1Lqh2?usp=sharing';

interface DiscoverLesson { t: string; plan: string; video: string; skills: string[]; focus: string; diff?: 1 | 2 }
interface DiscoverUnit { n: number; name: string; folder: string; learner: string; educator: string; full: string; lessons: DiscoverLesson[] }

const DISCOVER_UNITS: DiscoverUnit[] = [
  {
    n: 1, name: 'Exploring Community', folder: 'https://drive.google.com/drive/folders/1sc87CGSRg0Oz6qGwUwRoOwTXtIlYx9Xh?usp=sharing',
    learner: '1GfPvtSljr9p1xrIVHci9ol7C2pIk-uam', educator: '1W_mAtGbVD41umFO9LJJyopof_h9m8OuG', full: '1m5YwLxxJJk3SvPzk9QZ9Q8a4W5uWihkw',
    lessons: [
      { t: 'My Emotions', plan: '1zRKpyYS008cTF5sEUyfGnT8Ww1zJLkrx', video: '1whfPAcatimRf2FfkGX8S-wd0z8uYvyMq', skills: ['Tangible Coding', 'Sequencing', 'Recognising Emotions', 'Storytelling'], focus: 'recognising and naming our emotions' },
      { t: 'Caring for Others', plan: '1rkkGu5NM--Uv6UfhUPIfs7yh6Tpq9-Lp', video: '1mTLfEQhpw43vUDOgfPmEfngNT0n6pVkN', skills: ['Tangible Coding', 'Map Navigation', 'Caring & Empathy', 'Collaboration'], focus: 'how we care for the people around us' },
      { t: 'Family', plan: '1tbs05TVGL1EYOIhZSptCdTKcYe0YKqep', video: '1iw0XJZeqyyDVVEBSODLwfd-bGbdxEPrj', skills: ['Tangible Coding', 'Sequencing', 'Family Roles', 'Storytelling'], focus: 'our families and what makes each one special' },
      { t: 'Solving Problems as a Classroom Community', plan: '1UQD4BzEJWbNoYx36BsWMu0DJ8Z8cCv2J', video: '1soMRsT2Zk_Evo6qs1KPfpZZDTyxtKHpQ', skills: ['Tangible Coding', 'Map Navigation', 'Problem Solving', 'Collaboration'], focus: 'solving problems together as a classroom' },
      { t: 'Helping Our Common Home', plan: '15aYEv30ttKUO0tvi_BPHiq6wOO13OYcb', video: '1uM8jxz6jUlUgTLkq6JDUfzr6lhDPdDhE', skills: ['Tangible Coding', 'Sequencing', 'Responsibility & Care', 'Map Navigation'], focus: 'small ways we can help our common home, the Earth' },
    ],
  },
  {
    n: 2, name: 'Discovering My Role', folder: 'https://drive.google.com/drive/folders/1EBbxLXfjhO4EIRY3BaCLo59jzm6kv7d3?usp=sharing',
    learner: '1NB1LUyPldY9OdFtTComlb_5WARtUvREm', educator: '1C_R-qXk9TIcbjOStF_eRqrzr-XAoITof', full: '1G7PSlPuVcjiqkFo4JuuJFJ6rw0gz6qb4',
    lessons: [
      { t: 'Discovering My Role in Family', plan: '12PkWdV3aj9cbq1xEhLCJ_U7XLPGYptdr', video: '1fNvHzcovcuXdCm8NG7TwX81JC0L7krIK', skills: ['Tangible Coding', 'Sequencing', 'Family Roles', 'Responsibility & Care'], focus: 'the jobs and roles we each have in our family' },
      { t: 'Discovering My Role at School', plan: '1kSJJMjwn7DepwVcaMv8clv4E7-wInca6', video: '1D0peh2BUBlvYeIxRl6FditKwZ0kgZXkH', skills: ['Tangible Coding', 'Map Navigation', 'School Roles', 'Collaboration'], focus: 'how we help and take part at school' },
      { t: 'Discovering My Role in the Community', plan: '1ILf9d6RgRb1oTRQcRnKghrfzOpoI4UuX', video: '1iPOg4eT6E1k-Juk_d3YJ_AslZGKp7Z4S', skills: ['Tangible Coding', 'Map Navigation', 'Community Roles', 'Problem Solving'], focus: 'community helpers and our own role in the community' },
      { t: 'My Role in Our Common Home, Part 1', plan: '1RKGiqISh3fAbF3FWTuBXXdSKLI2X9mHA', video: '1OnsjhQMZKnuIbAmP27eMK_XXOHwvc5ug', skills: ['Tangible Coding', 'Sequencing', 'Responsibility & Care', 'Map Navigation'], focus: 'what taking care of the Earth looks like day to day' },
      { t: 'My Role in Our Common Home, Part 2 (mTiny Draw)', plan: '1yMvQyGlAsgi588JMyx9RkjFYr90lqbsG', video: '1PW8m4Huiw-STi8vkkVAJbY3vs5dJANKq', skills: ['Tangible Coding', 'Drawing & Creativity', 'Storytelling', 'Sequencing'], focus: 'drawing our ideas with the mTiny Draw accessory' },
    ],
  },
  {
    n: 3, name: 'Making My Mark', folder: 'https://drive.google.com/drive/folders/1L45v0vtkbAC0sDM_0B2elmOD35m6AuLH?usp=sharing',
    learner: '1e9qzKO_lkRhUFvBDcuv-F6eDDozVNIcu', educator: '1VZwttTVNJlzpnttaabmh0qi5Komn1U3h', full: '1zGQPss-FBd3mVLYWaYdUyztEhWkiK9pb',
    lessons: [
      { t: 'Solving Problems for Yourself and Others', plan: '12iRyIGCjk1FnynTWTMNG2yAfRoQvXu1l', video: '1TBo7HVrVnqt1bb63uYOzf80136N6Es7e', skills: ['Tangible Coding', 'Problem Solving', 'Fixing Mistakes', 'Map Navigation'], focus: 'spotting a problem and coding a way to solve it' },
      { t: "The 3R's — Reduce, Reuse, Recycle", plan: '1E7AN3vDSo3XFKdvtHT83ZNaj-hv9OzsE', video: '1l6XnaRZb8qViYmSH05tu73krzangyIHq', skills: ['Tangible Coding', 'Sorting & Patterns', 'Responsibility & Care', 'Sequencing'], focus: "the 3R's — reduce, reuse and recycle" },
      { t: 'Preserving Our Common Home — Build', plan: '1SugQAKh6ZOcjJ-Kiz0-TOFKjgLAFGHXc', video: '1dvRRPO5fieDqMCZPcm-UdHG_mK_6APLb', skills: ['Tangible Coding', 'Building & Design', 'Collaboration', 'Map Navigation'], focus: 'designing and building a scene that protects our common home', diff: 2 },
      { t: 'Preserving Our Common Home — Iterate', plan: '1KPti5nIcdMNWOiocPNMvh_Da43dIgHh5', video: '1EwrYg4O0W66Yd8kqXWGuZtFwEHF2TVW3', skills: ['Tangible Coding', 'Iteration & Improvement', 'Fixing Mistakes', 'Sequencing'], focus: 'testing our build and improving it (iteration)', diff: 2 },
      { t: 'Preserving Our Common Home — Reflect', plan: '1i5kxy7LaNlqvdV-qaFyiQhatyb27p67S', video: '1t8wGY91TBgqrbt9TaTmcpvjedq7Y1LNo', skills: ['Tangible Coding', 'Presenting & Sharing', 'Storytelling', 'Reflection'], focus: 'reflecting on and presenting what we made', diff: 2 },
    ],
  },
];

function makeDiscoverLesson(u: DiscoverUnit, i: number, l: DiscoverLesson): LessonDetail {
  const id = `mtiny-d${u.n}${i + 1}`;
  const num = `${u.n}.${i + 1}`;
  const title = `${num} ${l.t}`;
  // Interactive teaching layer (guided walkthrough / quiz / matching game).
  const extra = DISCOVER_EXTRAS[num];
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        `Open the official Lesson ${num} plan PDF (Resources tab) and read it once — it has the full flow, discussion questions and workbook pages for “${l.t}”.`,
        `Queue the Lesson ${num} Engage video (Resources tab) on the projector — it hooks the class into ${l.focus}.`,
        'Set out one mTiny kit per group: robot + Tap Pen, Coding Cards (Forward / Turn / Repeat), Go! Card, and the map mats named in the plan.',
        'Print the Personal Learning Workbook pages this lesson uses (see the plan).',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide (≈45 min)', emoji: '🎓', isCoachOnly: true,
      content: [
        { step: 1, instruction: `ENGAGE (5 min): play the Lesson ${num} video, then ask what the children noticed about ${l.focus}.`, tip: 'Let 2–3 children answer before moving on.' },
        { step: 2, instruction: 'DISCUSS (5–10 min): talk circle using the discussion questions from the official plan.', coachNote: 'This unit blends social-emotional learning with coding — the talk matters as much as the robot.' },
        { step: 3, instruction: 'SET THE SCENE (5 min): groups build the map scenario from the plan with the picture mats.' },
        { step: 4, instruction: `CODE (15 min): children snap & tap Coding Cards to move mTiny through the scenario — acting out ${l.focus}.`, tip: 'One child codes, one checks the route, one tells the story — rotate roles.' },
        { step: 5, instruction: 'REFLECT (5–10 min): each group shares what mTiny did; children complete their workbook page.' },
      ],
    },
    {
      type: 'activity', title: `Activity: ${l.t}`, emoji: '🛠️',
      content: [
        `Children explore ${l.focus} — then bring it to life on the mTiny map: they build the scene with picture mats and code mTiny through it with physical Coding Cards.`,
        'The complete official lesson plan (scenario, questions, workbook pages) is in the Resources tab.',
      ],
      studentContent: ['🎬 Watch the lesson video', '🗣️ Talk about it together', '🗺️ Build the scene with mats', '🐼 Code mTiny through the story!'],
    },
    {
      type: 'assessment', title: 'Assessment Checklist', emoji: '✅',
      content: [
        'Took part in the discussion about the theme.',
        'Built the map scenario with the group.',
        'Coded mTiny through the scenario with the Coding Cards.',
        'Completed the workbook page and shared their story.',
      ],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `OFFICIAL: this is Lesson ${num} of the Makeblock mTiny Discover curriculum (Unit ${u.n} — ${u.name}). The linked plan PDF is the authoritative version; timings here are a summary.`,
        'The Educator Workbook (Resources) has the unit-level background and answers.',
        'Screen-free: all coding happens with physical cards — keep devices away except the projector for the video.',
      ],
    },
  ];
  return {
    id, slug: `mtiny-discover-${u.n}-${i + 1}`, title,
    programId: 'mtiny', programSlug: 'mtiny', programTitle: 'mTiny', programColor: '#EC4899',
    courseId: 'mtiny-discover', courseTitle: 'mTiny: Screen-Free Coding',
    moduleId: `mtiny-u${u.n}`, moduleTitle: `Unit ${u.n} — ${u.name}`,
    ageGroup: '4-5', level: 'Beginner', duration: '45 minutes', difficulty: l.diff ?? 1,
    skills: l.skills,
    materials: [
      { item: 'mTiny robot + Tap Pen + Coding Cards + Go! Card', quantity: '1 kit per group' },
      { item: 'Picture map mats (see the lesson plan for this lesson\'s set)', quantity: '1 set per group' },
      { item: 'Personal Learning Workbook — this lesson\'s pages, printed', quantity: '1 per child' },
      { item: 'Projector/screen for the Engage video', quantity: '1', isOptional: true },
    ],
    objectives: [
      `Explore ${l.focus}.`,
      'Sequence Coding Cards (Forward, Turn, Repeat) to move mTiny through the map scenario.',
      'Work in a small group: build, code, and tell the story together.',
      'Complete the lesson\'s workbook page.',
    ],
    assessmentChecklist: [
      'Joined the discussion.',
      'Coded mTiny through the scenario.',
      'Completed the workbook page.',
    ],
    sections,
    walkthrough: extra?.walk,
    quiz: extra?.quiz,
    interactions: extra ? [{ kind: 'match', title: extra.match.title, pairs: extra.match.pairs }] : undefined,
    resources: [
      { id: `${id}-r1`, title: `Lesson ${num} — official lesson plan (PDF)`, type: 'pdf', audience: 'both', url: D(l.plan), description: l.t },
      { id: `${id}-r2`, title: `Lesson ${num} — Engage video`, type: 'video', audience: 'both', url: D(l.video), description: 'Play at the start of class' },
      { id: `${id}-r3`, title: 'Personal Learning Workbook (learners)', type: 'worksheet', audience: 'both', url: D(u.learner), description: `Unit ${u.n} workbook — print this lesson's pages` },
      { id: `${id}-r4`, title: 'Educator Workbook (coach)', type: 'pdf', audience: 'coach', url: D(u.educator), description: `Unit ${u.n} background & answers` },
      { id: `${id}-r5`, title: `Unit ${u.n} — full curriculum (PDF)`, type: 'pdf', audience: 'coach', url: D(u.full), description: 'All unit lessons in one document' },
      ...(i === 0 ? [
        { id: `${id}-r6`, title: 'mTiny Discover — Implementation Guide', type: 'pdf' as const, audience: 'coach' as const, url: DISCOVER_GUIDE, description: 'How to run the whole curriculum purposefully' },
        { id: `${id}-r7`, title: 'mTiny Discover — master curriculum folder', type: 'link' as const, audience: 'coach' as const, url: DISCOVER_FOLDER, description: 'Every unit, plan and video in one Drive folder' },
      ] : []),
    ],
  };
}

export const MTINY_DISCOVER_LESSONS: LessonDetail[] =
  DISCOVER_UNITS.flatMap(u => u.lessons.map((l, i) => makeDiscoverLesson(u, i, l)));

export const MTINY_COURSE: Course = {
  id: 'mtiny-discover',
  slug: 'screen-free-coding',
  title: 'mTiny: Screen-Free Coding',
  programId: 'mtiny',
  programSlug: 'mtiny',
  ageGroup: '4-5',
  level: 'Beginner',
  description:
    'Screen-free coding for our youngest learners. With the mTiny robot, a Tap Pen, picture mats, and physical Coding Cards, children plan routes and tell stories — building sequencing, route-planning, and early-STEM skills with no screens. Includes the complete official mTiny Discover curriculum: 3 units × 5 lessons blending coding with social-emotional learning, each with its lesson plan, Engage video and workbooks.',
  objectives: [
    'Code a robot with physical cards (no screen)',
    'Sequence Forward, Turn, and Repeat cards to plan a route',
    'Build route-planning and spatial-reasoning skills',
    'Explore community, roles and caring for our common home (SEL)',
    'Tell stories through robot movement',
  ],
  duration: '45 minutes per lesson',
  totalHours: 12,
  lessonCount: 16,
  prerequisites: [],
  skills: ['Screen-Free Coding', 'Sequencing', 'Route Planning', 'Storytelling', 'Collaboration'],
  modules: [
    ...DISCOVER_UNITS.map((u, mi) => ({
      id: `mtiny-u${u.n}`,
      title: `Unit ${u.n} — ${u.name}`,
      order: mi + 1,
      description: `Official mTiny Discover Unit ${u.n}: ${u.name} — 5 lessons with plan PDFs, Engage videos and workbooks.`,
      lessons: u.lessons.map((l, i) => ({
        id: `mtiny-d${u.n}${i + 1}`, title: `${u.n}.${i + 1} ${l.t}`, duration: '45 min',
        difficulty: (l.diff ?? 1) as 1 | 2, skills: l.skills.slice(0, 2), order: i + 1,
      })),
    })),
    {
      id: 'mtiny-m1', title: 'Bonus Coding Activities', order: 4,
      description: 'Extra tangible, screen-free coding activities with the mTiny robot.',
      lessons: [
        { id: 'mtiny-l1', title: "mTiny's Weekend (Sample Activity)", duration: '30–45 min', difficulty: 1, skills: ['Sequencing', 'Route Planning'], order: 1 },
      ],
    },
  ],
};
