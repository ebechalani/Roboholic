import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Codey Rocky — "Block Coding & Game Design"
//  Source: official lesson Sheets (Makeblock), text via pdftotext,
//  sheet pages rasterized into in-app galleries (with the coding blocks).
//  Ages 8–9. Lesson structure: Objectives → Situated Learning →
//  Key Concept → Learn through Play → Coding Practice → Create.
// ════════════════════════════════════════════════════════════════

interface CodeyConfig {
  id: string;            // 'codey-l1'
  slug: string;          // image folder 'codey-l1'
  title: string;
  order: number;
  moduleId: string;
  moduleTitle: string;
  emoji: string;
  pages: number;         // rasterized sheet pages (p-01 cover, p-02..N content)
  concept: string;       // 'Program', 'Events', 'Loop'…
  conceptExplain: string;
  objectives: string[];
  situated: string;      // engage scenario
  play?: string;         // unplugged 'learn through play' activity
  codingTitle: string;
  codingSteps: string[]; // the Coding Practice / program sequence
  studentMission: string[];
  create: string[];      // Imitate & Create tasks
  reflect: string;       // self-review prompt 3
  skills: string[];
}

// Sheet pages p-02..N as a gallery (p-01 is the cover → used as hero).
function sheetGallery(slug: string, pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${slug}/p-${n}.png`, kind: 'photo', caption: `Lesson sheet — page ${i}` });
  }
  return imgs;
}

function makeCodeyLesson(c: CodeyConfig): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Have a Codey Rocky and a laptop with mBlock 5 installed per child or pair; connect Codey via USB and power it on.',
        `Build the "${c.codingTitle}" program yourself first so you can demonstrate it.`,
        'Open the lesson Sheet (Files section) — the exact coding blocks are shown on the sheet pages below.',
        `Today's computing concept: ${c.concept}. Be ready to explain it simply: ${c.conceptExplain}`,
        'The lesson Sheet is the official content; the discussion prompts and timings here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `ENGAGE — Situated Learning (5–10 min): ${c.situated}`, tip: 'Let students relate the idea to their own experience before any code.' },
        { step: 2, instruction: `EXPLAIN — Key Concept "${c.concept}" (5 min): ${c.conceptExplain}` },
        ...(c.play ? [{ step: 3, instruction: `PLAY — Learn through Play (5–10 min): ${c.play}`, coachNote: 'The unplugged game makes the concept physical before coding.' }] : []),
        { step: c.play ? 4 : 3, instruction: `CODE — Coding Practice "${c.codingTitle}" (15–20 min): demonstrate, then have students build the program (steps in the Main Activity).` },
        { step: c.play ? 5 : 4, instruction: 'SHARE & REVIEW (5 min): students show their projects and reflect — what they made, any bug they hit, and how they fixed it.' },
      ],
    },
    {
      type: 'student_steps',
      title: `Your Mission: ${c.codingTitle}! ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Your Mission: ${c.codingTitle}! ${c.emoji}`,
      content: c.studentMission,
      studentContent: c.studentMission,
    },
    {
      type: 'activity',
      title: `Coding Practice: ${c.codingTitle}`,
      emoji: '🛠️',
      content: [
        `Build the program step by step (the exact blocks are on the lesson-sheet pages below):`,
        ...c.codingSteps,
      ],
      studentContent: [
        `Make ${c.codingTitle}! 🚀`,
        ...c.codingSteps,
        'Upload to Codey and try it!',
      ],
      images: sheetGallery(c.slug, c.pages),
    },
    {
      type: 'challenge',
      title: 'Imitate & Create',
      emoji: '🎚️',
      content: c.create,
      studentContent: c.create.map(t => '✨ ' + t),
    },
    {
      type: 'extra_challenge',
      title: 'Extra Challenge: Fast Finishers',
      emoji: '🌟',
      content: [
        `Add sound, lights, or extra images to make your ${c.concept.toLowerCase()} project more fun.`,
        `Explain the idea of ${c.concept} to a partner in your own words.`,
      ],
      studentContent: [`🎨 Add sounds/lights to your project!`, `🗣️ Explain "${c.concept}" to a friend`],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'Codey won\'t connect to mBlock', cause: 'Wrong serial port or USB not seated.', solution: 'Click Connect in mBlock, pick the correct serial port, re-seat the USB cable, and make sure Codey is powered on.' },
        { problem: 'The program doesn\'t run on Codey', cause: 'Program not uploaded, or still in Live mode.', solution: 'Upload the program to Codey, then unplug and press the trigger (e.g. button A).' },
        { problem: 'Nothing happens when expected — Suggested', cause: 'Missing the Event block that starts the program.', solution: 'Make sure the script starts with the right Event (e.g. "when button A pressed" / "when Codey starts up").' },
        { problem: 'A block seems to do nothing — Suggested', cause: 'A bug — a wrong value or block order.', solution: 'Read the script top-to-bottom like a sentence; check values and order (this is debugging!).' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        `Student can explain "${c.concept}" in simple words.`,
        `Student built and uploaded the "${c.codingTitle}" program.`,
        'Student triggered the program and saw it work on Codey.',
        'Student extended the project in the Create task.',
        'Student reflected on what they made and any bug they fixed.',
      ],
    },
    {
      type: 'homework',
      title: 'Reflect & Explore',
      emoji: '🏠',
      content: [
        'Self-review: What did you learn this lesson? What did you like most?',
        c.reflect,
        'Show a family member your project and explain how it works.',
      ],
      studentContent: [
        '📝 What did you learn? What did you like most?',
        `💭 ${c.reflect}`,
        '👨‍👩‍👧 Show your family your project!',
      ],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `CONCEPT: ${c.concept} — ${c.conceptExplain}`,
        'PACING: keep Engage short and protect the 15–20 min coding time.',
        'mBLOCK 5: students code in blocks (built on Scratch 3.0). Upload mode runs the program on Codey itself.',
        'The exact blocks are on the sheet pages in the activity — show them on the projector as students build.',
        'SUGGESTED CONTENT: the lesson Sheet is official; the prompts/timings here are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id,
    slug: c.slug.replace('codey-', ''),
    title: c.title,
    programId: 'codey-rocky',
    programSlug: 'codey-rocky',
    programTitle: 'Codey Rocky',
    programColor: '#3B82F6',
    courseId: 'codey-blockcoding',
    courseTitle: 'Codey Rocky: Block Coding & Game Design',
    moduleId: c.moduleId,
    moduleTitle: c.moduleTitle,
    ageGroup: '8-9',
    level: 'Beginner',
    duration: '45 minutes',
    difficulty: Math.min(5, Math.max(1, Math.ceil(c.order / 5))) as 1 | 2 | 3 | 4 | 5,
    heroImage: `/lessons/${c.slug}/p-01.png`,
    skills: c.skills,
    materials: [
      { item: 'Codey Rocky robot', quantity: '1 per child or pair' },
      { item: 'Laptop/desktop with mBlock 5', quantity: '1 per child or pair' },
      { item: 'USB cable', quantity: '1 per Codey' },
      { item: 'Lesson Sheet (projected or printed)', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: c.objectives,
    assessmentChecklist: [
      `Explained "${c.concept}".`,
      `Built and uploaded "${c.codingTitle}".`,
      'Saw the program run on Codey.',
      'Completed a Create task.',
    ],
    sections,
    resources: [
      { id: `${c.id}-r1`, title: `${c.title} — Lesson Sheet (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-codey', description: 'Official lesson sheet with the coding blocks', needsReview: true },
      { id: `${c.id}-r2`, title: `${c.title} — Slideshow`, type: 'slides', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-codey', description: 'Projector slides', needsReview: true },
    ],
  };
}

// ─── Module 1 lessons (1–6) ──────────────────────────────────────
const CONFIGS: CodeyConfig[] = [
  {
    id: 'codey-l1', slug: 'codey-l1', title: 'The Secret of Codey Rocky', order: 1,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🤖', pages: 7,
    concept: 'Program',
    conceptExplain: 'A program is an artificial language we use to tell a robot what to do. We turn our idea into a program, upload it to the robot, and it acts: Idea → Program → Robot → Action.',
    objectives: [
      'Understand what a program is and what it can do.',
      'Get to know Codey Rocky and its features.',
      'Master the basics of mBlock 5.',
      'Learn how to upload a program to Codey.',
    ],
    situated: 'Ask "Have you seen robots in real life? What are they for?" Match pictures of a programmable robot, a logistics robot, a delivery robot, and a security robot. Then introduce Codey Rocky — a small programmable robot that can avoid obstacles, follow lines, and even do face recognition.',
    codingTitle: 'My First Program', codingSteps: [
      'Connect Codey to the computer with the USB cable and power it on.',
      'Open mBlock 5, click Connect, and choose the correct serial port.',
      'Build the example program shown on the sheet (e.g. "when Codey starts up" → show an image / play a sound / move).',
      'Upload the program to Codey.',
      'Unplug the cable, put Codey on the table, press button A, and watch it react!',
    ],
    studentMission: [
      '🔌 Connect Codey to the computer and turn it on',
      '🧩 Open mBlock 5 and connect (pick the right port)',
      '🟨 Build the program from the sheet',
      '⬆️ Upload it to Codey',
      '🅰️ Press button A and watch Codey come to life!',
    ],
    create: [
      'Meet Codey (the brain: sensors, LED display, buttons) and Rocky (the chassis: motors, IR sensor) — together they make Codey Rocky.',
      'Change the image or sound in your program and upload again.',
    ],
    reflect: 'Can you think of where programs are used in daily life?',
    skills: ['What is a Program', 'mBlock 5', 'Uploading', 'Robot Basics'],
  },
  {
    id: 'codey-l2', slug: 'codey-l2', title: 'Press Buttons to Change Emotions', order: 2,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '😀', pages: 4,
    concept: 'Events',
    conceptExplain: 'An Event is an action that makes something happen. In a program one or more events can trigger code — for example, pressing a button makes the lights turn on.',
    objectives: [
      'Understand the concept of Events.',
      'Use Event blocks in a program.',
      'Use Event blocks to make buttons do what you want.',
    ],
    situated: 'A panda presses a button and the light turns on. Pressing the button is the "Event" that causes the light. In coding we first pick an event to trigger our program.',
    play: 'Groups game: the teacher draws shapes (triangle, circle, square). When the teacher touches a shape, students do a matching action (e.g. touch triangle → stand up). Touching a shape is the "event".',
    codingTitle: 'Start Up and Smile', codingSteps: [
      'Add the Event block "when Codey starts up" (the yellow block).',
      'Add the blue "show image" block and pick (or draw) a smiley face.',
      'Upload — Codey smiles when it starts!',
    ],
    studentMission: [
      '🟨 Use an Event block: "when Codey starts up"',
      '😀 Add "show image" → choose a smile',
      '⬆️ Upload and watch Codey smile!',
    ],
    create: [
      'Task 1: Make Codey change its face for different events — when button A / B / C is pressed.',
      'Task 2: Make Codey also play different sounds for each button.',
    ],
    reflect: 'Can you think of events in daily life?',
    skills: ['Events', 'Buttons', 'LED Display', 'Triggers'],
  },
  {
    id: 'codey-l3', slug: 'codey-l3', title: 'To Be an Animation Designer', order: 3,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🎬', pages: 5,
    concept: 'Sequence',
    conceptExplain: 'A Sequence is a series of steps carried out in order to complete a task. The order matters — like opening the fridge, putting food in, then closing it.',
    objectives: [
      'Understand the concept of Sequence.',
      'Create animations using a sequence of steps.',
    ],
    situated: 'To put a watermelon in the fridge the panda must: open the door → put it in → close the door. Do the steps out of order and it fails. That ordered set of steps is a Sequence.',
    play: 'Play "I\'m a Robot": the teacher-robot only moves as students instruct, step by step, to walk to the board and draw a smiley — showing how order matters.',
    codingTitle: 'Winking Eyes', codingSteps: [
      'Add the Event "when button A pressed".',
      'Add "show image () for () secs" — eyes open.',
      'Duplicate it and change the image — eyes closed (the wink).',
      'Add "show image () for () secs" again — eyes open.',
      'Upload — press A and Codey winks at you!',
    ],
    studentMission: [
      '🟨 "when button A pressed"',
      '👁️ show eyes-open → eyes-closed → eyes-open (in order!)',
      '⬆️ Upload and press A — Codey winks!',
    ],
    create: [
      'Task 1: Duplicate the "show image" block and change each image slightly, in sequence, to make a smooth animation.',
      'Task 2: Draw your own images on the grid and sequence them into a brand-new animation.',
    ],
    reflect: 'I want to design my own animation. It will be like…',
    skills: ['Sequence', 'Animation', 'Order of Steps', 'Images'],
  },
  {
    id: 'codey-l4', slug: 'codey-l4', title: 'Identify the Bug', order: 4,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🐛', pages: 4,
    concept: 'Bug',
    conceptExplain: 'A bug is a mistake that makes a program fail — like a typo in a sentence. Finding and fixing bugs is called debugging.',
    objectives: [
      'Understand what a bug is.',
      'Learn how to find and fix bugs.',
    ],
    situated: 'Long ago a giant "Colossus" computer stopped working. Programmer Grace Hopper found the cause — a real moth stuck inside! She removed it and taped it in the logbook. That was the first computer "bug", and Hopper became known as the Mother of Debugging.',
    codingTitle: 'Find and Fix the Bugs', codingSteps: [
      'Open the three example programs from the teacher (shown on the sheet).',
      'Program 1 — a car that lost its key: find what\'s missing and fix it.',
      'Program 2 — a bomb that won\'t count down: fix the countdown.',
      'Program 3 — an earthworm that stops at a big bug: remove the bug so it keeps moving.',
      'Read each script top-to-bottom like a sentence to spot the mistake.',
    ],
    studentMission: [
      '🔍 Open the 3 buggy programs',
      '🚗 Fix the car · 💣 fix the bomb · 🪱 free the earthworm',
      '👀 Read each script like a sentence to find the mistake!',
    ],
    create: [
      'Swap programs with a partner and find each other\'s deliberate bugs.',
      'Make your own tiny "buggy" program and challenge a friend to debug it.',
    ],
    reflect: 'Have you been asked to find mistakes in other subjects? Which ones?',
    skills: ['Debugging', 'Logic', 'Problem Solving', 'Attention to Detail'],
  },
  {
    id: 'codey-l5', slug: 'codey-l5', title: 'The Steamed Bread Can’t Jump', order: 5,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🔁', pages: 4,
    concept: 'Loop',
    conceptExplain: 'A Loop is a set of instructions that repeat. Instead of copying the same blocks many times, we use a Repeat (counting loop) block to keep the code neat.',
    objectives: [
      'Understand the concept of Loops.',
      'Use the Counting Loop (Repeat) block.',
      'Create an animation using a counting loop.',
    ],
    situated: 'A panda plants trees along a 20 m street. Each tree needs the same steps (dig, plant, cover, move 5 m). Rather than writing them again and again, repeat the steps 4 times — that\'s a loop.',
    play: 'Beat game: A = tap left leg, B = tap right leg, C = tap both. Follow "ABABABC ABABABC". Ask: how could a loop make the pattern simpler? Add beat D (clap) and try longer patterns.',
    codingTitle: 'The Steamed Bread Can’t Jump', codingSteps: [
      'Add an Event block to start the animation.',
      'Add the steamed-bread images that show it trying to jump.',
      'Wrap the repeated images in a Counting Loop (Repeat) block so it tries several times.',
      'Upload and watch the steamed bread try (and fail!) to jump.',
    ],
    studentMission: [
      '🔁 Use a Repeat block instead of copying blocks',
      '🥟 Show the steamed bread trying to jump, over and over',
      '⬆️ Upload and watch it try!',
    ],
    create: [
      'Improve the teacher\'s program — change the event, the sound, or the number of repeats.',
      'Change the images and give your animation a storyline.',
    ],
    reflect: 'Counting loops are all around us — give an example from daily life.',
    skills: ['Loops', 'Repeat Block', 'Animation', 'Efficiency'],
  },
  {
    id: 'codey-l6', slug: 'codey-l6', title: 'The Jumping Steamed Bread', order: 6,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '♾️', pages: 3,
    concept: 'Infinite Loop',
    conceptExplain: 'An Infinite Loop repeats code endlessly. The Forever block has no bump at the bottom — nothing can come after it, because it never stops.',
    objectives: [
      'Understand the concept of an Infinite Loop.',
      'Use the Forever block.',
      'Create your own animation with a Forever block.',
    ],
    situated: 'Some things repeat a set number of times; others repeat forever — like sunrise and sunset, day after day. We use the Forever block to repeat code endlessly.',
    codingTitle: 'The Jumping Steamed Bread', codingSteps: [
      'Add an Event block to start.',
      'Add the steamed-bread "jumping" images.',
      'Wrap them in a Forever block so it keeps hopping endlessly.',
      'Upload and watch the steamed bread jump forever!',
    ],
    studentMission: [
      '♾️ Use the Forever block (it never stops!)',
      '🥟 Make the steamed bread hop forever',
      '⬆️ Upload and watch it go!',
    ],
    create: [
      'Design two animations: use a Repeat block for one and a Forever block for the other.',
      'Give them storylines (e.g. "can\'t jump" vs "jumping") and add sounds or lights.',
    ],
    reflect: 'Infinite loops are all around us — give an example from daily life.',
    skills: ['Infinite Loop', 'Forever Block', 'Animation', 'Comparing Loops'],
  },
];

export const CODEY_LESSONS: LessonDetail[] = CONFIGS.map(makeCodeyLesson);

// All 24 lesson titles (1–6 detailed; 7–24 listed, detail coming).
const L = (id: string, title: string, order: number, difficulty: 1 | 2 | 3 | 4 | 5, skills: string[]) =>
  ({ id, title, duration: '45 min', difficulty, skills, order });

export const CODEY_COURSE: Course = {
  id: 'codey-blockcoding',
  slug: 'block-coding-game-design',
  title: 'Codey Rocky: Block Coding & Game Design',
  programId: 'codey-rocky',
  programSlug: 'codey-rocky',
  ageGroup: '8-9',
  level: 'Beginner',
  description:
    'Students learn to code with Codey Rocky in mBlock 5 — from their first program to events, sequences, loops, debugging, and on to building real games and driving a robot. 24 lessons across coding foundations, game building, and smart driving.',
  objectives: [
    'Understand core coding concepts: programs, events, sequences, loops, conditionals, variables, and functions',
    'Build animations, games, and interactive projects',
    'Debug programs and think computationally',
    'Drive and program Rocky to sense and respond to the world',
  ],
  duration: '24 sessions × 45 minutes',
  totalHours: 18,
  lessonCount: 24,
  prerequisites: [],
  skills: ['Block Coding', 'Events', 'Loops', 'Conditionals', 'Variables', 'Game Design'],
  modules: [
    {
      id: 'codey-m1', title: 'Module 1: Coding Foundations', order: 1,
      description: 'Programs, events, sequences, debugging, and loops.',
      lessons: [
        L('codey-l1', 'The Secret of Codey Rocky', 1, 1, ['Program', 'mBlock 5']),
        L('codey-l2', 'Press Buttons to Change Emotions', 2, 1, ['Events']),
        L('codey-l3', 'To Be an Animation Designer', 3, 1, ['Sequence']),
        L('codey-l4', 'Identify the Bug', 4, 1, ['Debugging']),
        L('codey-l5', 'The Steamed Bread Can’t Jump', 5, 2, ['Loops']),
        L('codey-l6', 'The Jumping Steamed Bread', 6, 2, ['Infinite Loop']),
      ],
    },
    {
      id: 'codey-m2', title: 'Module 2: Building Games', order: 2,
      description: 'Conditionals, variables, functions, and math through games.',
      lessons: [
        L('codey-l7', 'The Racing Game I', 7, 2, ['Game Design']),
        L('codey-l8', 'The Racing Game II', 8, 3, ['Game Design']),
        L('codey-l9', 'Volume Bar', 9, 2, ['Sound Sensor']),
        L('codey-l10', 'Good Morning! Function', 10, 3, ['Functions']),
        L('codey-l11', 'The Tiny Patroller I', 11, 3, ['Conditionals']),
        L('codey-l12', 'The Tiny Patroller II', 12, 3, ['Conditionals']),
        L('codey-l13', 'The Squirrel’s Nuts Box', 13, 3, ['Variables']),
        L('codey-l14', 'Mathematical Operations', 14, 3, ['Math']),
        L('codey-l15', 'The Bomb', 15, 3, ['Variables', 'Timer']),
        L('codey-l16', 'Rock-Paper-Scissors', 16, 4, ['Random', 'Logic']),
      ],
    },
    {
      id: 'codey-m3', title: 'Module 3: Game Design & Driving', order: 3,
      description: 'Build bigger games and drive Rocky to sense the world.',
      lessons: [
        L('codey-l17', 'My Speedway', 17, 3, ['Game Design']),
        L('codey-l18', 'Game Control Schemes', 18, 3, ['Controls']),
        L('codey-l19', 'Game Mechanics I', 19, 4, ['Game Mechanics']),
        L('codey-l20', 'Game Mechanics II', 20, 4, ['Game Mechanics']),
        L('codey-l21', 'Fast and Furious', 21, 4, ['Motors', 'Speed']),
        L('codey-l22', 'Make a Turn', 22, 4, ['Motors', 'Turning']),
        L('codey-l23', 'Avoid Obstacles', 23, 4, ['IR Sensor']),
        L('codey-l24', 'Line-Following Car', 24, 5, ['Line Following']),
      ],
    },
  ],
};
