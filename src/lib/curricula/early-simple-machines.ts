import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Early Simple Machines (LEGO Set 9656) — "Build & Explore"
//  Source: official 3D building-instruction PDFs (Editorial Arenas
//  Educativas), rasterized into in-app build galleries.
//  Ages 5–7. The BUILD STEPS are from the official set; the teaching
//  prompts (objectives, discussion, activities) are RoboHolic
//  SUGGESTED content a coach can adapt.
// ════════════════════════════════════════════════════════════════

interface EsmConfig {
  id: string;
  slug: string;            // public image folder, e.g. 'esm-catapult'
  title: string;           // 'The Catapult'
  order: number;
  moduleId: string;
  moduleTitle: string;
  machine: string;         // 'a lever', 'gears', 'a pulley'…
  emoji: string;
  pages: number;           // total rasterized pages (p-01..p-NN)
  motion: string;          // what the model does
  mechanism: string;       // factual explanation of the simple machine
  observe: string;         // what to watch
  realWorld: string[];     // real-life examples
  modelChallenge: string;  // a model-specific tweak
  skills: string[];
}

// Build a step-image gallery from the rasterized pages.
// p-01 = finished model (hero), p-02 = pieces, p-03..N = build steps.
function buildGallery(slug: string, pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 3; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${slug}/p-${n}.png`, kind: 'photo', caption: `Build step ${i - 2}` });
  }
  return imgs;
}

function makeEsmLesson(c: EsmConfig): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        `Have one Early Simple Machines (Set 9656) kit ready per child or pair, plus the green base plate.`,
        `Build ${c.title} yourself once so you can help quickly and show the finished model.`,
        `Project or print the build steps below (they are the official instructions).`,
        `Sort the pieces shown on the "Pieces" image so young builders can find them easily.`,
        `SUGGESTED CONTENT: the build steps are from the official set; the objectives, questions, and activities here are RoboHolic suggestions — adapt them to your group.`,
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `HOOK (5 min): Show the finished ${c.title}. Ask "What do you think it does?" Let a few children guess, then reveal: ${c.motion}`, tip: 'Keep it playful — wonder first, explain second.' },
        { step: 2, instruction: `BUILD (15–20 min): Build together one step at a time using the gallery below. Wait until most children finish a step before moving on.`, tip: 'Name the pieces by colour and shape — great early vocabulary.' },
        { step: 3, instruction: `EXPLORE (5–10 min): ${c.observe} Let children play and notice what moves.`, coachNote: `This model demonstrates ${c.machine}.` },
        { step: 4, instruction: `EXPLAIN (5 min): ${c.mechanism}`, tip: 'Use simple words and gestures; relate it to their own bodies where you can.' },
        { step: 5, instruction: `WRAP-UP (5 min): Ask "Where have you seen ${c.machine} before?" Take a few answers and celebrate everyone\'s build.` },
      ],
    },
    {
      type: 'student_steps',
      title: `Let's Build ${c.title}! ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Let's Build ${c.title}! ${c.emoji}`,
      content: [
        'Find all your pieces (look at the Pieces picture).',
        'Build one step at a time — follow the pictures.',
        'Check your model looks like each picture before the next step.',
        'When it\'s finished, make it move!',
        `Watch carefully: ${c.observe}`,
      ],
      studentContent: [
        '🧱 Find your pieces',
        '👣 Build one step at a time',
        '🔍 Check each picture',
        '🎉 Make it move!',
        `👀 Watch: ${c.observe}`,
      ],
    },
    {
      type: 'activity',
      title: `Build It: ${c.title}`,
      emoji: '🛠️',
      content: [
        'Pieces you need (see the picture):',
        'Then follow the build steps in order. Match your model to each picture before moving on.',
      ],
      studentContent: [
        '🧱 Get the pieces in the picture',
        '👣 Follow each step in order',
        '✅ Match the picture before the next step!',
      ],
      images: [
        { src: `/lessons/${c.slug}/p-02.png`, kind: 'photo', caption: 'Pieces you need' },
        ...buildGallery(c.slug, c.pages),
      ],
    },
    {
      type: 'challenge',
      title: 'Play & Tinker',
      emoji: '🎚️',
      content: [
        c.modelChallenge,
        'Try it a few times. What changes? Talk about what you notice.',
      ],
      studentContent: [`🔧 ${c.modelChallenge}`, '👀 What changes? Tell a friend!'],
    },
    {
      type: 'extra_challenge',
      title: 'Super Builder Challenge',
      emoji: '🌟',
      content: [
        `Can you decorate or add to your ${c.title} to make it your own?`,
        `Can you explain to someone how the ${c.machine} makes it work?`,
      ],
      studentContent: [`🎨 Make your ${c.title} your own!`, `🗣️ Explain how it works to a friend`],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'The moving part is stiff or stuck', cause: 'Pieces pushed together too tightly, or a gear/axle is rubbing.', solution: 'Loosen the connection slightly so the part can move freely; check axles spin.' },
        { problem: 'Gears slip or don\'t turn together', cause: 'Gear teeth aren\'t meshed.', solution: 'Move the gears so their teeth interlock; they should turn each other.' },
        { problem: 'The model falls apart', cause: 'Base pieces not pressed firmly onto the plate.', solution: 'Press the base bricks firmly onto the green plate before building up.' },
        { problem: 'A child is stuck on a step — Suggested', cause: 'Too much at once for this age.', solution: 'Point to the exact picture, do that one step with them, then let them continue.' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        `Child built ${c.title} by following the picture steps (with support as needed).`,
        'Child made the model move.',
        `Child noticed what moves and how (${c.observe}).`,
        `Child can point to or name the ${c.machine}.`,
        'Child played, tinkered, and shared what they saw.',
      ],
    },
    {
      type: 'homework',
      title: 'Explore at Home',
      emoji: '🏠',
      content: [
        `Look for ${c.machine} at home or outside. Examples: ${c.realWorld.join(', ')}.`,
        'Tell your family what your model does and how it moves.',
      ],
      studentContent: [
        `🔎 Find ${c.machine} at home! (like ${c.realWorld[0]})`,
        '👨‍👩‍👧 Show your family how your model moves',
      ],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `MACHINE FOCUS: ${c.title} demonstrates ${c.machine}. ${c.mechanism}`,
        'AGES 4–5: pre-sort pieces and build step-by-step as a group; let them focus on connecting and playing.',
        'AGES 6–7: encourage them to follow the picture steps more independently and predict what will move.',
        'LANGUAGE: name pieces by colour/shape and use motion words (spin, lift, push, swing) — strong early-STEM vocabulary.',
        'SUGGESTED CONTENT: build steps are official; the prompts here are RoboHolic suggestions to adapt.',
      ],
    },
  ];

  return {
    id: c.id,
    slug: c.slug.replace('esm-', ''),
    title: c.title,
    programId: 'early-simple-machines',
    programSlug: 'early-simple-machines',
    programTitle: 'Early Simple Machines',
    programColor: '#F59E0B',
    courseId: 'esm-build-explore',
    courseTitle: 'Simple Machines to Build & Explore',
    moduleId: c.moduleId,
    moduleTitle: c.moduleTitle,
    ageGroup: '6-7',
    level: 'Beginner',
    duration: '30–40 minutes',
    difficulty: 1,
    heroImage: `/lessons/${c.slug}/p-01.png`,
    skills: c.skills,
    materials: [
      { item: 'Early Simple Machines kit (LEGO Set 9656)', quantity: '1 per child or pair' },
      { item: 'Green building base plate', quantity: '1 per child or pair' },
      { item: 'Projected or printed build steps', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: [
      `Build ${c.title} by following picture-based instructions (SUGGESTED).`,
      `Discover how ${c.machine} makes the model move (SUGGESTED).`,
      'Practise fine motor skills, sequencing, and following steps.',
      `Connect the model to real-life examples of ${c.machine}.`,
    ],
    assessmentChecklist: [
      `Built ${c.title} with appropriate support.`,
      'Made the model move and observed the motion.',
      `Identified the ${c.machine}.`,
      'Gave a real-world example.',
    ],
    sections,
    resources: [
      { id: `${c.id}-r1`, title: `${c.title} — Building Instructions (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-esm', description: 'Official 3D building instructions', needsReview: true },
    ],
  };
}

// ─── The 7 models ────────────────────────────────────────────────
const CONFIGS: EsmConfig[] = [
  {
    id: 'esm-l1', slug: 'esm-carousel', title: 'The Carousel', order: 1,
    moduleId: 'esm-m1', moduleTitle: 'Module 1: Gears that Spin',
    machine: 'gears', emoji: '🎠', pages: 11,
    motion: 'it spins around and around when you turn the handle.',
    mechanism: 'Gears are wheels with teeth. When one gear turns, its teeth push the next gear, so they turn together. That is how turning the handle spins the carousel.',
    observe: 'turn the handle slowly and watch the gears push each other to make the top spin.',
    realWorld: ['a merry-go-round at a park', 'a bicycle\'s gears', 'a hand whisk'],
    modelChallenge: 'Turn the handle faster, then slower. Does the carousel spin faster too?',
    skills: ['Gears', 'Rotation', 'Following Steps', 'Fine Motor Skills'],
  },
  {
    id: 'esm-l2', slug: 'esm-helicopter', title: 'The Helicopter', order: 2,
    moduleId: 'esm-m1', moduleTitle: 'Module 1: Gears that Spin',
    machine: 'gears', emoji: '🚁', pages: 18,
    motion: 'its blades (rotor) spin around on top when you turn the handle.',
    mechanism: 'Gears change the direction of spinning. The helicopter\'s gears turn the spin from your hand into the spinning blades on top.',
    observe: 'turn the handle and watch the gears send the spin up to the blades.',
    realWorld: ['a real helicopter\'s rotor', 'a ceiling fan', 'a wind turbine'],
    modelChallenge: 'Watch the blades. Which way do they spin when you turn the handle the other way?',
    skills: ['Gears', 'Rotation', 'Cause & Effect', 'Following Steps'],
  },
  {
    id: 'esm-l3', slug: 'esm-catapult', title: 'The Catapult', order: 3,
    moduleId: 'esm-m2', moduleTitle: 'Module 2: Levers that Lift & Launch',
    machine: 'a lever', emoji: '🏹', pages: 11,
    motion: 'it flings a small ball into the air when you press the arm.',
    mechanism: 'A lever is a bar that turns on a fixed point. Push down on one end and the other end flies up — that is how the catapult launches the ball.',
    observe: 'press the arm down and let go — watch the lever swing the ball up and away.',
    realWorld: ['a see-saw', 'a spoon flicking peas', 'a door handle'],
    modelChallenge: 'Try launching from different positions. Can you make the ball go higher or further?',
    skills: ['Levers', 'Force & Motion', 'Cause & Effect', 'Following Steps'],
  },
  {
    id: 'esm-l4', slug: 'esm-tollbooth', title: 'The Tollbooth', order: 4,
    moduleId: 'esm-m2', moduleTitle: 'Module 2: Levers that Lift & Launch',
    machine: 'a lever', emoji: '🚧', pages: 11,
    motion: 'its barrier arm lifts up and down to let cars through.',
    mechanism: 'The barrier is a lever that turns on a point. Push one end down and the long arm lifts up to open the gate.',
    observe: 'press one end and watch the long barrier arm lift up like a gate.',
    realWorld: ['a car-park barrier', 'a railway crossing gate', 'a see-saw'],
    modelChallenge: 'Make the barrier open and close smoothly. Can you let a toy car through?',
    skills: ['Levers', 'Balance', 'Following Steps', 'Fine Motor Skills'],
  },
  {
    id: 'esm-l5', slug: 'esm-crane', title: 'The Crane', order: 5,
    moduleId: 'esm-m2', moduleTitle: 'Module 2: Levers that Lift & Launch',
    machine: 'a pulley', emoji: '🏗️', pages: 11,
    motion: 'it lifts a load up and down using a string and a wheel.',
    mechanism: 'A pulley is a wheel with a string over it. Pulling the string lets us lift heavy things more easily — that is how the crane raises its load.',
    observe: 'turn the handle and watch the string wind up over the wheel to lift the load.',
    realWorld: ['a building crane', 'a flagpole', 'a well bucket'],
    modelChallenge: 'Lift a small object. Is it easier to lift with the pulley than with your hand alone?',
    skills: ['Pulleys', 'Lifting', 'Force & Motion', 'Following Steps'],
  },
  {
    id: 'esm-l6', slug: 'esm-roller-coaster', title: 'The Roller Coaster', order: 6,
    moduleId: 'esm-m3', moduleTitle: 'Module 3: Wheels & Moving Parts',
    machine: 'wheels and slopes', emoji: '🎢', pages: 11,
    motion: 'a car rolls down the track using its wheels and gravity.',
    mechanism: 'Wheels turn on axles so things roll easily, and gravity pulls the car down the slope. Together they make the car zoom along the track.',
    observe: 'let the car go from the top and watch it roll down the slope on its wheels.',
    realWorld: ['a real roller coaster', 'a toy car on a ramp', 'a slide'],
    modelChallenge: 'Start the car from higher up, then lower down. When does it go faster?',
    skills: ['Wheels & Axles', 'Gravity', 'Speed', 'Following Steps'],
  },
  {
    id: 'esm-l7', slug: 'esm-dinosaur', title: 'The Dinosaur', order: 7,
    moduleId: 'esm-m3', moduleTitle: 'Module 3: Wheels & Moving Parts',
    machine: 'a cam', emoji: '🦕', pages: 15,
    motion: 'its body or jaw moves up and down as you turn the handle.',
    mechanism: 'A cam is a specially shaped piece that turns round-and-round motion into up-and-down motion. That is what makes the dinosaur bob as you turn the handle.',
    observe: 'turn the handle slowly and watch the round turning become an up-and-down move.',
    realWorld: ['a nodding-toy', 'a music box figure', 'an engine'],
    modelChallenge: 'Turn the handle steadily. Can you make the dinosaur move in a smooth rhythm?',
    skills: ['Cams', 'Motion Change', 'Rhythm', 'Following Steps'],
  },
];

export const ESM_LESSONS: LessonDetail[] = CONFIGS.map(makeEsmLesson);

export const ESM_COURSE: Course = {
  id: 'esm-build-explore',
  slug: 'build-and-explore',
  title: 'Simple Machines to Build & Explore',
  programId: 'early-simple-machines',
  programSlug: 'early-simple-machines',
  ageGroup: '6-7',
  level: 'Beginner',
  description:
    'Young builders make 7 motorless LEGO machines and discover how gears, levers, pulleys, wheels, and cams make things move. Each lesson is a hands-on build followed by play, observation, and simple discussion.',
  objectives: [
    'Follow picture-based building instructions step by step',
    'Discover gears, levers, pulleys, wheels & axles, and cams',
    'Connect each machine to real-life examples',
    'Build sequencing, fine motor, and early-STEM vocabulary',
  ],
  duration: '7 sessions × 30–40 minutes',
  totalHours: 4,
  lessonCount: 7,
  prerequisites: [],
  skills: ['Gears', 'Levers', 'Pulleys', 'Wheels & Axles', 'Cams', 'Following Instructions'],
  modules: [
    {
      id: 'esm-m1', title: 'Module 1: Gears that Spin', order: 1,
      description: 'Turning handles and meshing gears make things spin.',
      lessons: [
        { id: 'esm-l1', title: 'The Carousel',   duration: '30–40 min', difficulty: 1, skills: ['Gears', 'Rotation'], order: 1 },
        { id: 'esm-l2', title: 'The Helicopter', duration: '30–40 min', difficulty: 1, skills: ['Gears', 'Rotation'], order: 2 },
      ],
    },
    {
      id: 'esm-m2', title: 'Module 2: Levers that Lift & Launch', order: 2,
      description: 'Bars that turn on a point can launch, lift, and open.',
      lessons: [
        { id: 'esm-l3', title: 'The Catapult',  duration: '30–40 min', difficulty: 1, skills: ['Levers', 'Force'], order: 3 },
        { id: 'esm-l4', title: 'The Tollbooth', duration: '30–40 min', difficulty: 1, skills: ['Levers', 'Balance'], order: 4 },
        { id: 'esm-l5', title: 'The Crane',     duration: '30–40 min', difficulty: 1, skills: ['Pulleys', 'Lifting'], order: 5 },
      ],
    },
    {
      id: 'esm-m3', title: 'Module 3: Wheels & Moving Parts', order: 3,
      description: 'Wheels, gravity, and cams turn one motion into another.',
      lessons: [
        { id: 'esm-l6', title: 'The Roller Coaster', duration: '30–40 min', difficulty: 1, skills: ['Wheels', 'Gravity'], order: 6 },
        { id: 'esm-l7', title: 'The Dinosaur',       duration: '30–40 min', difficulty: 1, skills: ['Cams', 'Motion'], order: 7 },
      ],
    },
  ],
};
