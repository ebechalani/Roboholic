import type { Course, LessonDetail, LessonSection, Module, Resource, Difficulty, AgeGroupId, QuizQuestion } from '@/types';

// ════════════════════════════════════════════════════════════════
//  VR — "Build Virtual Worlds with CoSpaces Edu" (3 levels, 12 lessons)
//  Built around CoSpaces Edu (Delightex): drag-and-drop 3D scenes +
//  CoBlocks block coding, viewed in VR on Meta Quest headsets (and
//  phone/Cardboard / Merge Cube). Lessons link the official CoSpaces
//  resources and embed the CoBlocks basics video; coaching prompts
//  are RoboHolic SUGGESTED additions.
//  NOTE: CoSpaces Edu has a free Basic tier; some features need Pro.
// ════════════════════════════════════════════════════════════════

const L1 = 'Level I · Build Your First VR World (no-code)';
const L2 = 'Level II · Make It Interactive (CoBlocks)';
const L3 = 'Level III · Advanced VR Projects';

interface VR {
  id: string; title: string; emoji: string; difficulty: Difficulty; ageGroup: AgeGroupId;
  moduleId: string; moduleTitle: string; order: number; youtubeId?: string;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; challenge: string; skills: string[];
  resources: Resource[]; quiz?: QuizQuestion[];
}

function makeVR(c: VR): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        'You need: computers/tablets with a browser for CoSpaces Edu (cospaces.io), and Meta Quest headsets with the CoSpaces app installed for viewing in VR. (CoSpaces also works on phones in a Cardboard viewer and with a Merge Cube for AR.)',
        'HEADSET SAFETY & COMFORT: clear the play area, set the Quest guardian/boundary, wipe lenses, limit sessions (~10–15 min), and let anyone who feels unwell stop. One student in VR at a time per headset, with a spotter.',
        'Build the example yourself first, and pre-create a CoSpaces class/share code so students can join quickly.',
        'SUGGESTED CONTENT: the linked CoSpaces resources are the source material; the steps and challenge here are RoboHolic suggestions. CoSpaces Edu has a free Basic tier — some blocks/features (and more spaces) need a Pro licence.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Open the linked CoSpaces resource and show a finished example (on screen, then in the Quest).',
        'CREATE: Students build it in CoSpaces Edu, previewing on screen as they go.',
        'EXPERIENCE & SHARE: Students view their scene in VR on the Quest (one at a time) and give each other feedback.',
      ],
    },
    {
      type: 'student_steps', title: `Build It: ${c.title} ${c.emoji}`, emoji: '🎯',
      content: ['Open CoSpaces Edu (cospaces.io) and follow these steps (and the linked tutorial in Resources):', ...c.steps, 'Preview on screen, then put on the Quest and experience it in VR!'],
      studentContent: [`🥽 ${c.title}`, '💻 Open CoSpaces Edu', ...c.steps.map(s => '👉 ' + s), '▶️ Preview, then view it in the Quest!'],
    },
    {
      type: 'challenge', title: 'Make It Yours', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student built the scene and experienced it in VR on the headset.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'CoBlocks is block-first but can switch to TypeScript/JavaScript or Python for older students (Pro).',
        'Share/assign spaces via a CoSpaces class code; students view in the Quest CoSpaces app via the shared code or gallery. Watch comfort: keep VR sessions short.',
        'The official CoSpaces resource (Resources) is the primary material; these prompts are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: 'vr', programSlug: 'vr', programTitle: 'VR', programColor: '#0EA5E9',
    courseId: 'vr-cospaces-1', courseTitle: 'Build Virtual Worlds with CoSpaces Edu',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: c.moduleId === 'vr-m1' ? 'Beginner' : c.moduleId === 'vr-m2' ? 'Intermediate' : 'Advanced',
    duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [
      { item: 'Computer/tablet with a browser (cospaces.io)', quantity: '1 per student' },
      { item: 'Meta Quest headset with the CoSpaces app', quantity: '1 per 2–3 students' },
      { item: 'Merge Cube (for AR)', quantity: 'optional', isOptional: true },
    ],
    objectives: c.objectives, assessmentChecklist: c.objectives,
    sections,
    ...(c.youtubeId ? { youtubeId: c.youtubeId } : {}),
    ...(c.quiz ? { quiz: c.quiz } : {}),
    resources: c.resources,
  };
}

// Shared official links
const CS_START: Resource = { id: 'cs-start', title: 'CoSpaces Edu — Getting Started (educator resources)', type: 'link', audience: 'both', url: 'https://www.cospaces.io/getting-started', description: 'Official onboarding & beginner course' };
const CS_PD: Resource = { id: 'cs-pd', title: 'CoSpaces Edu — Free educator training', type: 'link', audience: 'coach', url: 'https://cospaces.io/edu/pd-training.html', description: 'Free professional-development course' };
const CS_GAME_PDF: Resource = { id: 'cs-game', title: 'CoSpaces Edu — Code a Game with CoBlocks (lesson plan PDF)', type: 'pdf', audience: 'both', url: 'https://cospaces.io/edu/game-coblocks-lesson-plan.pdf', description: 'Official game lesson plan' };
const CS_COBLOCKS_VID: Resource = { id: 'cs-coblocks-vid', title: 'Video: CoBlocks — The Basics for beginners', type: 'video', audience: 'both', url: 'https://www.youtube.com/watch?v=15Vlqe22_x0', description: 'Block-coding walkthrough' };

const CONFIGS: VR[] = [
  // ─── Level I · Build Your First VR World ───
  {
    id: 'vr-1', title: 'What Is VR? & Getting Started with CoSpaces', emoji: '🥽', difficulty: 2, ageGroup: '13-15', moduleId: 'vr-m1', moduleTitle: L1, order: 1,
    concept: 'virtual reality and the CoSpaces Edu editor', conceptExplain: 'Virtual Reality immerses you in a computer-made 3D world you can look around in with a headset. CoSpaces Edu is a browser tool for building those worlds and viewing them in VR on a Quest. This lesson covers VR/AR/360 basics, headset comfort & safety, and the editor.',
    objectives: ['Explain what VR, AR and 360 are', 'Use the Quest safely and comfortably', 'Create a CoSpaces account/space and navigate the editor'],
    steps: ['Discuss VR vs AR vs 360 and watch a VR example.', 'Learn the headset rules: set the guardian boundary, short sessions, stop if unwell.', 'Sign in to CoSpaces Edu and create a new space.', 'Learn to orbit, pan and zoom the camera in the editor.'],
    challenge: 'Pick an environment, add one object, and open the empty world in the Quest to look around.',
    skills: ['VR Concepts', 'Headset Safety', 'CoSpaces Editor'],
    quiz: [
      { question: 'VR (Virtual Reality) means:', options: ['an immersive computer-made 3D world you look around in', 'a 2D photo', 'a phone call', 'a printed book'], answerIndex: 0 },
      { question: 'CoSpaces Edu is used to:', options: ['build 3D/VR worlds in the browser', 'slice 3D prints', 'edit videos', 'send email'], answerIndex: 0 },
      { question: 'A headset safety rule is to:', options: ['set the guardian boundary and keep sessions short', 'fly a drone', 'turn off the lights', 'skip breaks'], answerIndex: 0 },
    ],
    resources: [CS_START, CS_PD],
  },
  {
    id: 'vr-2', title: 'Building a 3D Scene', emoji: '🏗️', difficulty: 2, ageGroup: '13-15', moduleId: 'vr-m1', moduleTitle: L1, order: 2,
    concept: 'placing and transforming 3D objects', conceptExplain: 'A CoSpaces scene is built from a library of objects, characters and environments. You add items and use move, rotate and scale to compose a 3D world.',
    objectives: ['Add objects from the library', 'Move, rotate and scale objects in 3D', 'Compose a themed scene'],
    steps: ['Choose an environment (e.g. terrain, space, room).', 'Drag in objects from the library.', 'Use the move/rotate/scale tools to place them.', 'Build a small themed scene (e.g. a park or a planet base).'],
    challenge: 'Design a themed "diorama" scene with at least 8 well-placed objects.',
    skills: ['3D Building', 'Transforms', 'Composition'],
    quiz: [
      { question: 'To build a scene in CoSpaces you:', options: ['drag objects from the library onto the scene', 'write C++', 'print them', 'scan a QR code'], answerIndex: 0 },
      { question: 'Move, rotate and scale are used to:', options: ['position and size objects in 3D', 'change the password', 'export STL', 'connect Wi-Fi'], answerIndex: 0 },
      { question: 'Good scene composition means:', options: ['placing objects thoughtfully for the viewer', 'using one object only', 'no objects', 'all objects in one spot'], answerIndex: 0 },
    ],
    resources: [CS_START],
  },
  {
    id: 'vr-3', title: 'Characters & Viewpoints', emoji: '🧍', difficulty: 2, ageGroup: '13-15', moduleId: 'vr-m1', moduleTitle: L1, order: 3,
    concept: 'characters and the VR camera/start view', conceptExplain: 'Characters bring a scene to life, and the camera/viewpoint sets where the viewer starts and what they see first in VR — key to a good experience.',
    objectives: ['Add and pose characters', 'Set the camera / start viewpoint', 'Think about what the viewer sees first in VR'],
    steps: ['Add one or more characters and pose them.', 'Place the camera where the VR viewer should start.', 'Preview in VR and adjust the start view.', 'Add small details that reward looking around.'],
    challenge: 'Stage a scene so the viewer notices a "surprise" only when they turn around in VR.',
    skills: ['Characters', 'Camera / Viewpoint', 'VR UX'],
    resources: [CS_START],
  },
  {
    id: 'vr-4', title: 'View & Share in VR on the Quest', emoji: '📲', difficulty: 2, ageGroup: '13-15', moduleId: 'vr-m1', moduleTitle: L1, order: 4,
    concept: 'publishing a space and experiencing it on the headset', conceptExplain: 'CoSpaces spaces can be shared (class code or gallery) and opened in the CoSpaces app on the Meta Quest, so you walk through your creation in real VR.',
    objectives: ['Share/assign a space (class code or gallery)', 'Open a space in the Quest CoSpaces app', 'Navigate your world in VR'],
    steps: ['Press Share and get the code / add it to your class.', 'On the Quest, open the CoSpaces app and enter the code.', 'Put on the headset and look around your scene.', 'Note one thing to improve and fix it back in the editor.'],
    challenge: 'Run a mini "gallery walk": classmates view your space in the Quest and leave one piece of feedback.',
    skills: ['Publishing', 'VR Viewing', 'Feedback'],
    resources: [CS_START, CS_PD],
  },

  // ─── Level II · Make It Interactive (CoBlocks) ───
  {
    id: 'vr-5', title: 'Intro to CoBlocks', emoji: '🧩', difficulty: 3, ageGroup: '13-15', moduleId: 'vr-m2', moduleTitle: L2, order: 5, youtubeId: '15Vlqe22_x0',
    concept: 'block coding in CoSpaces with CoBlocks', conceptExplain: 'CoBlocks is CoSpaces\' drag-and-drop coding language. With "when play" and "forever" plus move/turn blocks, you make objects do things — turning a static scene into an experience.',
    objectives: ['Open the CoBlocks editor', 'Use "when play" and "forever"', 'Make an object move or rotate with code'],
    steps: ['Watch the CoBlocks basics video above.', 'Mark an object as "usable in CoBlocks".', 'Add "when play → forever → rotate/move" for that object.', 'Press play and preview the motion.'],
    challenge: 'Make an object patrol back and forth (or orbit another object) using a loop.',
    skills: ['CoBlocks', 'Loops', 'Motion'],
    quiz: [
      { question: 'CoBlocks is:', options: ['CoSpaces\' drag-and-drop coding language', 'a headset', 'a slicer', 'a 3D printer'], answerIndex: 0 },
      { question: 'To make an object move continuously you use:', options: ['a forever loop', 'one move block only', 'a quiz', 'an image'], answerIndex: 0 },
      { question: '"when play" runs the code:', options: ['when the scene starts', 'never', 'only in VR', 'when you exit'], answerIndex: 0 },
    ],
    resources: [CS_COBLOCKS_VID, CS_START],
  },
  {
    id: 'vr-6', title: 'Click & Collide Interactions', emoji: '👆', difficulty: 3, ageGroup: '13-15', moduleId: 'vr-m2', moduleTitle: L2, order: 6,
    concept: 'event-driven interactions', conceptExplain: 'Interactivity comes from events: "when [object] is clicked" or "when [A] collides with [B]". These let the viewer trigger actions — the heart of an interactive VR experience.',
    objectives: ['Use a "when clicked" event', 'Use a "when collide" event', 'Trigger an action (show, move, sound) from an event'],
    steps: ['Add a "when [object] clicked" block.', 'Make it do something (say text, change, play sound).', 'Add a collision event between two objects.', 'Preview and test both interactions.'],
    challenge: 'Make a clickable "info point" that reveals a fact, and a door that opens when you reach it.',
    skills: ['Events', 'Interactivity', 'CoBlocks'],
    resources: [CS_START],
  },
  {
    id: 'vr-7', title: 'Animate Characters & Dialogue', emoji: '🎭', difficulty: 3, ageGroup: '13-15', moduleId: 'vr-m2', moduleTitle: L2, order: 7,
    concept: 'animation, speech and movement paths', conceptExplain: 'Characters can play built-in animations, "say" speech bubbles, and follow movement paths — perfect for interactive stories and guided tours.',
    objectives: ['Play character animations', 'Add speech/dialogue', 'Move a character along a path'],
    steps: ['Select a character and play an animation (wave, walk).', 'Add "say" blocks for a short dialogue.', 'Move the character to points / along a path.', 'Sequence it into a short scene.'],
    challenge: 'Make a guide character that walks the viewer to 3 spots, saying something at each.',
    skills: ['Animation', 'Dialogue', 'Paths'],
    resources: [CS_START],
  },
  {
    id: 'vr-8', title: 'Variables, Logic & a Quiz', emoji: '🔢', difficulty: 4, ageGroup: '13-15', moduleId: 'vr-m2', moduleTitle: L2, order: 8,
    concept: 'variables and conditionals in CoBlocks', conceptExplain: 'Variables remember things (a score, an answer) and "if/else" makes decisions. With them you can build a VR quiz, a scavenger hunt, or branching choices.',
    objectives: ['Create and use a variable (e.g. score)', 'Use if/else conditionals', 'Build a simple interactive quiz/scavenger hunt'],
    steps: ['Make a "score" variable starting at 0.', 'On a correct click → score + 1 and give feedback.', 'Use if/else to react to right vs wrong answers.', 'Show the score and a finish message.'],
    challenge: 'Build a 3-question VR quiz that shows the final score at the end.',
    skills: ['Variables', 'Conditionals', 'Quiz'],
    resources: [CS_START, CS_GAME_PDF],
  },

  // ─── Level III · Advanced VR Projects ───
  {
    id: 'vr-9', title: 'Physics & Gravity', emoji: '🪂', difficulty: 4, ageGroup: '13-15', moduleId: 'vr-m3', moduleTitle: L3, order: 9,
    concept: 'physics-enabled objects', conceptExplain: 'Turning on physics gives objects gravity, mass and collisions, so they fall, stack, roll and can be thrown — making believable, playful VR scenes.',
    objectives: ['Enable physics on objects', 'Use gravity and collisions', 'Apply a force / throw an object'],
    steps: ['Enable physics on a few objects.', 'Watch them fall and collide with the ground.', 'Stack or knock down objects.', 'Use CoBlocks to push/throw an object on an event.'],
    challenge: 'Build a mini "knock-the-tower" or bowling interaction using physics.',
    skills: ['Physics', 'Gravity', 'Collisions'],
    quiz: [
      { question: 'Turning on physics gives objects:', options: ['gravity, mass and collisions', 'a new colour', 'a password', 'Wi-Fi'], answerIndex: 0 },
      { question: 'With physics on, a raised object will:', options: ['fall and collide with the ground', 'float forever', 'disappear', 'change colour'], answerIndex: 0 },
      { question: 'Physics makes a VR scene feel:', options: ['believable and playful', 'broken', 'slower to design', 'silent'], answerIndex: 0 },
    ],
    resources: [CS_START],
  },
  {
    id: 'vr-10', title: 'Build a VR Game', emoji: '🎮', difficulty: 4, ageGroup: '13-15', moduleId: 'vr-m3', moduleTitle: L3, order: 10,
    concept: 'a complete game loop in VR', conceptExplain: 'Combine scene, interactions, variables and physics into a game with a goal, scoring and a win/lose condition — experienced in the Quest.',
    objectives: ['Define a goal and rules', 'Track score and a win/lose condition', 'Test the game in VR'],
    steps: ['Plan the game: goal, controls, win/lose.', 'Build the scene and code the core loop (collect/avoid/reach).', 'Add scoring and an end condition.', 'Play-test in the Quest and tune it.'],
    challenge: 'Make a timed collectible game (grab all items before time runs out) and beat it in VR.',
    skills: ['Game Design', 'VR', 'CoBlocks'],
    resources: [CS_GAME_PDF, CS_START],
  },
  {
    id: 'vr-11', title: '360 Tours & Merge Cube AR', emoji: '🌐', difficulty: 3, ageGroup: '13-15', moduleId: 'vr-m3', moduleTitle: L3, order: 11,
    concept: 'immersive tours and AR on the Merge Cube', conceptExplain: 'CoSpaces can build 360° virtual tours (great for places/history/science) and AR scenes you hold in your hand on a Merge Cube — two more ways to share immersive content.',
    objectives: ['Build a 360 scene/tour with hotspots', 'Understand the AR / Merge Cube option', 'Choose VR vs 360 vs AR for a purpose'],
    steps: ['Create a 360 scene (or use a 360 image) and add info hotspots.', 'Link hotspots so the viewer can "travel".', 'Switch a space to Merge Cube mode (if you have cubes) and preview the AR.', 'Decide which format best fits your idea.'],
    challenge: 'Build a 3-stop virtual tour (a place, a museum, or a body/solar-system tour).',
    skills: ['360 Tours', 'AR / Merge Cube', 'Immersive Design'],
    resources: [CS_START, CS_PD],
  },
  {
    id: 'vr-12', title: 'Capstone: Design & Publish a VR Experience', emoji: '🚀', difficulty: 4, ageGroup: '13-15', moduleId: 'vr-m3', moduleTitle: L3, order: 12,
    concept: 'the full VR design process (and blocks → text code)', conceptExplain: 'Students design an original VR experience (concept → scene → interactions → test), build and code it in CoSpaces, optionally switch CoBlocks to TypeScript/Python, then publish to the gallery and present it in the Quest.',
    objectives: ['Plan an original VR experience (purpose, scene, interactions)', 'Build, code and test it', 'Publish to the gallery and present it in VR'],
    steps: ['Pick a purpose: game, tour, story, or simulation.', 'Storyboard the scene and the interactions.', 'Build and code it (try switching CoBlocks to TypeScript/Python).', 'Publish to the gallery and run a VR showcase on the Quest.'],
    challenge: 'Publish your VR experience, gather feedback from two viewers in the headset, and ship one improvement.',
    skills: ['VR Design', 'Publishing', 'TypeScript/Python'],
    resources: [CS_START, CS_PD, CS_GAME_PDF],
  },
];

export const VR_LESSONS: LessonDetail[] = CONFIGS.map(makeVR);

const sum = (c: VR) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const VR_COURSE: Course = {
  id: 'vr-cospaces-1', slug: 'build-virtual-worlds-cospaces', title: 'Build Virtual Worlds with CoSpaces Edu',
  programId: 'vr', programSlug: 'vr', ageGroup: '13-15', level: 'Beginner',
  description: 'Create and explore your own virtual reality worlds with CoSpaces Edu, viewed in VR on Meta Quest headsets. Level I: build 3D scenes with characters and viewpoints and experience them in VR (no code). Level II: make them interactive with CoBlocks — events, animation, variables and a quiz. Level III: physics, a VR game, 360 tours / Merge Cube AR, and a capstone where you design, code (blocks → TypeScript/Python) and publish a VR experience.',
  objectives: [
    'Explain VR/AR/360 and use a headset safely',
    'Build 3D scenes in CoSpaces with objects, characters and viewpoints',
    'Add interactivity with CoBlocks (events, animation, variables, logic)',
    'Use physics and build a VR game',
    'Create 360 tours / AR and publish a VR experience to the gallery',
  ],
  duration: '12 lessons × 45–60 minutes', totalHours: 12, lessonCount: 12,
  prerequisites: [], skills: ['VR/AR Design', '3D Building', 'CoBlocks', 'Interactivity', 'Physics', 'Publishing'],
  modules: [
    { id: 'vr-m1', title: L1, order: 1, description: 'No-code: VR basics & headset safety, build 3D scenes with characters and viewpoints, and experience them in VR on the Quest.', lessons: CONFIGS.filter(c => c.moduleId === 'vr-m1').map(sum) },
    { id: 'vr-m2', title: L2, order: 2, description: 'Make worlds interactive with CoBlocks: motion, click/collide events, animation & dialogue, variables and a quiz.', lessons: CONFIGS.filter(c => c.moduleId === 'vr-m2').map(sum) },
    { id: 'vr-m3', title: L3, order: 3, description: 'Advanced: physics, a VR game, 360 tours & Merge Cube AR, and a design-code-publish capstone (blocks → TypeScript/Python).', lessons: CONFIGS.filter(c => c.moduleId === 'vr-m3').map(sum) },
  ],
};
