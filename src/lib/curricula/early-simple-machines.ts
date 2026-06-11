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
  pages: number;           // total rasterized PDF pages (p-01..p-NN); 0 for video-based
  motion: string;          // what the model does
  mechanism: string;       // factual explanation of the simple machine
  observe: string;         // what to watch
  realWorld: string[];     // real-life examples
  modelChallenge: string;  // a model-specific tweak
  skills: string[];
  /** Video-based models (from PPTX): show finished image + key stages, link the build video. */
  videoBased?: boolean;
  galleryFiles?: { file: string; caption: string }[];
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
  const heroImage = c.videoBased
    ? `/lessons/${c.slug}/finished.png`
    : `/lessons/${c.slug}/p-01.png`;

  // Activity images + intro text differ for PDF (full steps) vs video (key stages) models.
  const activityImages: LessonImage[] = c.videoBased
    ? (c.galleryFiles ?? []).map(g => ({ src: `/lessons/${c.slug}/${g.file}`, kind: 'photo' as const, caption: g.caption }))
    : [{ src: `/lessons/${c.slug}/p-02.png`, kind: 'photo' as const, caption: 'Pieces you need' }, ...buildGallery(c.slug, c.pages)];

  const activityContent = c.videoBased
    ? [
        'For this model the build is an animation. Play the build video (in the Files section) on the screen and build along, pausing after each move.',
        'The pictures below show the finished model and a few key build stages to check against.',
      ]
    : [
        'Pieces you need (see the picture):',
        'Then follow the build steps in order. Match your model to each picture before moving on.',
      ];
  const activityStudent = c.videoBased
    ? ['🎬 Watch the build video and build along', '⏸️ Pause after each move', '✅ Check against the pictures below!']
    : ['🧱 Get the pieces in the picture', '👣 Follow each step in order', '✅ Match the picture before the next step!'];

  const prepBuildLine = c.videoBased
    ? 'Open the build video (Files section) on the screen — it is the official animated, step-by-step build.'
    : 'Project or print the build steps below (they are the official instructions).';
  const coachBuildLine = c.videoBased
    ? `BUILD (15–20 min): Play the build video and build along together, pausing after each move. Check against the finished model and stage pictures below.`
    : `BUILD (15–20 min): Build together one step at a time using the gallery below. Wait until most children finish a step before moving on.`;

  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        `Have one Early Simple Machines (Set 9656) kit ready per child or pair, plus the green base plate.`,
        `Build ${c.title} yourself once so you can help quickly and show the finished model.`,
        prepBuildLine,
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
        { step: 2, instruction: coachBuildLine, tip: 'Name the pieces by colour and shape — great early vocabulary.' },
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
      content: activityContent,
      studentContent: activityStudent,
      images: activityImages,
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
    heroImage,
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
    resources: c.videoBased
      ? [
          { id: `${c.id}-r1`, title: `${c.title} — Build Video (animation)`, type: 'video', audience: 'both', url: 'https://drive.google.com/drive/folders/1GQsWABXdQTtO1lZ_h3j8D9hfoKMcxc0p?usp=sharing', description: 'Full animated step-by-step build (Google Drive)', needsReview: true },
        ]
      : [
          { id: `${c.id}-r1`, title: `${c.title} — Building Instructions (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/1GQsWABXdQTtO1lZ_h3j8D9hfoKMcxc0p?usp=sharing', description: 'Official 3D building instructions', needsReview: true },
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
  // ── Video-based models (from the official PPTX animations) ──
  {
    id: 'esm-l8', slug: 'esm-fan', title: 'The Fan', order: 8,
    moduleId: 'esm-m1', moduleTitle: 'Module 1: Gears that Spin',
    machine: 'gears', emoji: '🌀', pages: 0, videoBased: true,
    galleryFiles: [{ file: 'stage-2.png', caption: 'Build stage — the base' }, { file: 'stage-1.png', caption: 'Build stage — the stand' }, { file: 'finished.png', caption: 'Finished model — the fan' }],
    motion: 'its blades spin around when you turn the handle.',
    mechanism: 'Gears pass turning from one wheel to another. The fan\'s gears take the spin from your hand and turn the blades.',
    observe: 'turn the handle and watch the gears spin the blades.',
    realWorld: ['an electric fan', 'a wind turbine', 'a pinwheel'],
    modelChallenge: 'Turn the handle faster, then slower. Do the blades change speed too?',
    skills: ['Gears', 'Rotation', 'Cause & Effect', 'Following Steps'],
  },
  {
    id: 'esm-l9', slug: 'esm-top', title: 'The Spinning Top', order: 9,
    moduleId: 'esm-m1', moduleTitle: 'Module 1: Gears that Spin',
    machine: 'gears', emoji: '🔄', pages: 0, videoBased: true,
    galleryFiles: [{ file: 'stage-1.png', caption: 'Build stage — gears and axle' }, { file: 'finished.png', caption: 'Finished model — the launcher and top' }],
    motion: 'it launches a spinning top using a gear and a pull.',
    mechanism: 'A big gear turns a small gear quickly. That fast spin is given to the top so it whirls on its own.',
    observe: 'launch the top and watch how long it keeps spinning.',
    realWorld: ['a spinning top toy', 'a fidget spinner', 'a potter\'s wheel'],
    modelChallenge: 'Launch it gently, then with more pull. Does it spin longer?',
    skills: ['Gears', 'Rotation', 'Force & Motion', 'Following Steps'],
  },
  {
    id: 'esm-l10', slug: 'esm-seesaw', title: 'The Seesaw', order: 10,
    moduleId: 'esm-m2', moduleTitle: 'Module 2: Levers that Lift & Launch',
    machine: 'a lever', emoji: '🛝', pages: 0, videoBased: true,
    galleryFiles: [{ file: 'stage-2.png', caption: 'Build stage — the bricks' }, { file: 'stage-1.png', caption: 'Build stage — the axle and wheels' }, { file: 'finished.png', caption: 'Finished model — the seesaw' }],
    motion: 'one side goes up while the other side goes down — just like a playground see-saw.',
    mechanism: 'A see-saw is a lever that balances on a middle point. Push one side down and the other side lifts up.',
    observe: 'press one side down and watch the other side rise.',
    realWorld: ['a playground see-saw', 'a balance scale', 'a catapult'],
    modelChallenge: 'Put something small on each end. Can you make it balance level?',
    skills: ['Levers', 'Balance', 'Force & Motion', 'Following Steps'],
  },
  {
    id: 'esm-l11', slug: 'esm-train', title: 'The Train', order: 11,
    moduleId: 'esm-m3', moduleTitle: 'Module 3: Wheels & Moving Parts',
    machine: 'wheels and axles', emoji: '🚂', pages: 0, videoBased: true,
    galleryFiles: [{ file: 'stage-1.png', caption: 'Build stage — gear and wheels on the body' }, { file: 'finished.png', caption: 'Finished model — the train' }],
    motion: 'it rolls along on its wheels, with a big gear driving it.',
    mechanism: 'Wheels turn on axles so the train rolls smoothly. A gear helps turn the wheels.',
    observe: 'push the train and watch the wheels turn on their axles.',
    realWorld: ['a real train', 'a toy car', 'roller skates'],
    modelChallenge: 'Roll it on different surfaces (table, carpet). Where does it roll best?',
    skills: ['Wheels & Axles', 'Gears', 'Rolling', 'Following Steps'],
  },
  {
    id: 'esm-l12', slug: 'esm-trolley', title: 'The Steering Trolley', order: 12,
    moduleId: 'esm-m3', moduleTitle: 'Module 3: Wheels & Moving Parts',
    machine: 'wheels and axles', emoji: '🛒', pages: 0, videoBased: true,
    galleryFiles: [{ file: 'stage-1.png', caption: 'Build stage — the bricks' }, { file: 'stage-2.png', caption: 'Build stage — the body' }, { file: 'finished.png', caption: 'Finished model — the steering trolley' }],
    motion: 'it rolls on four wheels and can be steered to turn.',
    mechanism: 'Wheels on axles let the trolley roll, and the front wheels turn so it can steer left and right.',
    observe: 'roll the trolley and turn the steering to watch it change direction.',
    realWorld: ['a shopping trolley', 'a car', 'a go-kart'],
    modelChallenge: 'Steer it around a corner. Can you make it follow a path you draw?',
    skills: ['Wheels & Axles', 'Steering', 'Direction', 'Following Steps'],
  },
  {
    id: 'esm-l13', slug: 'esm-scarecrow', title: 'The Scarecrow', order: 13,
    moduleId: 'esm-m3', moduleTitle: 'Module 3: Wheels & Moving Parts',
    machine: 'a cam', emoji: '🌾', pages: 0, videoBased: true,
    galleryFiles: [{ file: 'stage-2.png', caption: 'Build stage — the bricks' }, { file: 'stage-1.png', caption: 'Build stage — body on the base' }, { file: 'finished.png', caption: 'Finished model — the scarecrow mechanism' }],
    motion: 'its arm waves up and down as you turn the handle, to scare birds away.',
    mechanism: 'A cam turns round-and-round motion into an up-and-down (or waving) motion — that is what waves the scarecrow\'s arm.',
    observe: 'turn the handle and watch the round turning make the arm wave.',
    realWorld: ['a waving toy', 'a nodding ornament', 'a windscreen wiper'],
    modelChallenge: 'Turn the handle at a steady speed. Can you make the arm wave in a rhythm?',
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
  duration: '13 sessions × 30–40 minutes',
  totalHours: 8,
  lessonCount: 13,
  prerequisites: [],
  skills: ['Gears', 'Levers', 'Pulleys', 'Wheels & Axles', 'Cams', 'Following Instructions'],
  modules: [
    {
      id: 'esm-m1', title: 'Module 1: Gears that Spin', order: 1,
      description: 'Turning handles and meshing gears make things spin.',
      lessons: [
        { id: 'esm-l1', title: 'The Carousel',   duration: '30–40 min', difficulty: 1, skills: ['Gears', 'Rotation'], order: 1 },
        { id: 'esm-l2', title: 'The Helicopter', duration: '30–40 min', difficulty: 1, skills: ['Gears', 'Rotation'], order: 2 },
        { id: 'esm-l8', title: 'The Fan',          duration: '30–40 min', difficulty: 1, skills: ['Gears', 'Rotation'], order: 3 },
        { id: 'esm-l9', title: 'The Spinning Top', duration: '30–40 min', difficulty: 1, skills: ['Gears', 'Force'], order: 4 },
      ],
    },
    {
      id: 'esm-m2', title: 'Module 2: Levers that Lift & Launch', order: 2,
      description: 'Bars that turn on a point can launch, lift, and open.',
      lessons: [
        { id: 'esm-l3',  title: 'The Catapult',  duration: '30–40 min', difficulty: 1, skills: ['Levers', 'Force'], order: 5 },
        { id: 'esm-l4',  title: 'The Tollbooth', duration: '30–40 min', difficulty: 1, skills: ['Levers', 'Balance'], order: 6 },
        { id: 'esm-l5',  title: 'The Crane',     duration: '30–40 min', difficulty: 1, skills: ['Pulleys', 'Lifting'], order: 7 },
        { id: 'esm-l10', title: 'The Seesaw',    duration: '30–40 min', difficulty: 1, skills: ['Levers', 'Balance'], order: 8 },
      ],
    },
    {
      id: 'esm-m3', title: 'Module 3: Wheels & Moving Parts', order: 3,
      description: 'Wheels, gravity, and cams turn one motion into another.',
      lessons: [
        { id: 'esm-l6',  title: 'The Roller Coaster',   duration: '30–40 min', difficulty: 1, skills: ['Wheels', 'Gravity'], order: 9 },
        { id: 'esm-l7',  title: 'The Dinosaur',         duration: '30–40 min', difficulty: 1, skills: ['Cams', 'Motion'], order: 10 },
        { id: 'esm-l11', title: 'The Train',            duration: '30–40 min', difficulty: 1, skills: ['Wheels', 'Gears'], order: 11 },
        { id: 'esm-l12', title: 'The Steering Trolley', duration: '30–40 min', difficulty: 1, skills: ['Wheels', 'Steering'], order: 12 },
        { id: 'esm-l13', title: 'The Scarecrow',        duration: '30–40 min', difficulty: 1, skills: ['Cams', 'Motion'], order: 13 },
      ],
    },
  ],
};
