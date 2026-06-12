import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  mTiny — screen-free tangible coding (ages 4–6)
//  Source: the official "mTiny Coding Activity Sample Plan" (mTiny's
//  Weekend), rasterized as an in-app gallery. The full mTiny Discover
//  curriculum (Units 1–3) is referenced in the TOC but those lesson
//  files aren't in the provided materials (to be uploaded later).
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
      'FULL CURRICULUM: the mTiny Discover curriculum (Units 1–3, lessons 1.1–3.5) is referenced in the TOC but those lesson files were not in the provided materials — upload them to add the full course.',
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
  resources: [
    { id: `${SLUG}-r1`, title: 'mTiny Coding Activity — Sample Plan (PDF)', type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-mtiny', description: "mTiny's Weekend activity plan", needsReview: true },
    { id: `${SLUG}-r2`, title: 'mTiny — Developing Literacy & Numeracy (Guide)', type: 'pdf', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-mtiny', description: 'Background guide on tangible programming', needsReview: true },
  ],
};

export const MTINY_COURSE: Course = {
  id: 'mtiny-discover',
  slug: 'screen-free-coding',
  title: 'mTiny: Screen-Free Coding',
  programId: 'mtiny',
  programSlug: 'mtiny',
  ageGroup: '4-5',
  level: 'Beginner',
  description:
    'Screen-free coding for our youngest learners. With the mTiny robot, a Tap Pen, picture mats, and physical Coding Cards, children plan routes and tell stories — building sequencing, route-planning, and early-STEM skills with no screens. (Sample activity shown; the full mTiny Discover curriculum can be added as materials are uploaded.)',
  objectives: [
    'Code a robot with physical cards (no screen)',
    'Sequence Forward, Turn, and Repeat cards to plan a route',
    'Build route-planning and spatial-reasoning skills',
    'Tell stories through robot movement',
  ],
  duration: '30–45 minutes per activity',
  totalHours: 1,
  lessonCount: 1,
  prerequisites: [],
  skills: ['Screen-Free Coding', 'Sequencing', 'Route Planning', 'Storytelling'],
  modules: [
    {
      id: 'mtiny-m1', title: 'mTiny Coding Activities', order: 1,
      description: 'Tangible, screen-free coding activities with the mTiny robot.',
      lessons: [
        { id: 'mtiny-l1', title: "mTiny's Weekend (Sample Activity)", duration: '30–45 min', difficulty: 1, skills: ['Sequencing', 'Route Planning'], order: 1 },
      ],
    },
  ],
};
