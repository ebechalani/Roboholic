import type { Course, LessonDetail, LessonSection, LessonImage, Module, Difficulty, AgeGroupId } from '@/types';

// ════════════════════════════════════════════════════════════════
//  School-curriculum graded chapters (2023 series). Each chapter is a
//  real textbook chapter rendered to images; objectives & activities
//  are transcribed from those pages. Chapters are slotted into their
//  natural programs (Scratch Jr, mBot2, micro:bit) plus a new Small
//  Basic program.
// ════════════════════════════════════════════════════════════════

interface Chap {
  id: string; title: string; emoji: string; pages: number; difficulty: Difficulty;
  programId: string; programSlug: string; programTitle: string; programColor: string;
  courseId: string; courseTitle: string; moduleId: string; moduleTitle: string;
  ageGroup: AgeGroupId; grade: string; software: string;
  concept: string; conceptExplain: string; objectives: string[];
  challenge: string; challengeSteps: string[]; skills: string[];
}

function gallery(slug: string, pages: number): LessonImage[] {
  const a: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) a.push({ src: `/lessons/${slug}/p-${String(i).padStart(2, '0')}.png`, kind: 'photo', caption: `Page ${i}` });
  return a;
}

function makeChapter(c: Chap): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        `This is ${c.grade}, ${c.title}. ${c.conceptExplain}`,
        `You need: ${c.software}`,
        'Open the chapter pages (shown below) — this is the official workbook chapter. Work through it on screen with the class, pausing for the hands-on tasks.',
        'The full chapter PDF is in the unit\'s Drive folder (see Resources).',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Lesson Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Read through the chapter pages below with the class, demonstrating each new idea/tool on screen.',
        'PRACTISE: Students complete the chapter\'s hands-on tasks and the practice exercises.',
        'REVIEW: Check the objectives below and the chapter\'s review questions.',
      ],
      images: gallery(c.id, c.pages),
    },
    {
      type: 'activity', title: `Activity: ${c.title}`, emoji: '🛠️',
      content: [
        `In this chapter you will: ${c.objectives.join('; ')}.`,
        'Follow the workbook pages with your coach and complete each hands-on task.',
      ],
      studentContent: [
        `🎯 ${c.title}`,
        ...c.objectives.map(o => '• ' + o),
        '✍️ Work through the chapter tasks with your coach.',
      ],
    },
    {
      type: 'challenge', title: 'Challenge', emoji: '🚀',
      content: [c.challenge, ...c.challengeSteps],
      studentContent: [`🚀 ${c.challenge}`, ...c.challengeSteps.map(s => '• ' + s)],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o.replace(/^(identify|use|explain|create|know|name|launch|open|write|run|distinguish|list|change)/i, m => m.toLowerCase())), 'Student completed the chapter tasks.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `CHAPTER: ${c.grade} · ${c.title}. Topic: ${c.concept}.`,
        'The full workbook chapter (PDF) is in the Drive folder (Resources).',
        'SOURCE: 2023 school-curriculum chapter series.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: c.programId, programSlug: c.programSlug, programTitle: c.programTitle, programColor: c.programColor,
    courseId: c.courseId, courseTitle: c.courseTitle, moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: 'Beginner', duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [{ item: c.software }],
    objectives: c.objectives,
    assessmentChecklist: c.objectives.map(o => o.replace(/^to\s+/i, '')),
    sections,
    heroImage: `/lessons/${c.id}/p-01.png`,
    resources: [
      { id: `${c.id}-r1`, title: `${c.title} — Chapter (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-school', description: '2023 school-curriculum chapter', needsReview: true },
    ],
  };
}

// ─── Scratch Jr (Grades 1–3) ─────────────────────────────────────
const SJR = { programId: 'scratch-jr', programSlug: 'scratch-jr', programTitle: 'Scratch Jr', programColor: '#8B5CF6', courseId: 'scratch-jr-beginners', courseTitle: 'Scratch Jr', moduleId: 'sjr-school', moduleTitle: 'School Curriculum · Grades 1–3', software: 'iPads/tablets (or computers) with the ScratchJr app.' };
const SCRATCH_CHAPS: Chap[] = [
  {
    ...SJR, id: 'sch-g1-ch5', title: 'Introducing Scratch Junior', emoji: '🐱', pages: 12, difficulty: 1, ageGroup: '6-7', grade: 'Grade 1 · Chapter 5',
    concept: 'launching ScratchJr and its welcome screen', conceptExplain: 'ScratchJr lets young learners program a computer to create games and stories by snapping together colourful blocks.',
    objectives: ['Launch ScratchJr by tapping its icon', 'Identify the Welcome screen', 'Start a new project', 'Identify the Stage, the Sprite, the TIC and the programming screen'],
    challenge: 'Open ScratchJr, start a new project, and point out the Stage, the Sprite and the programming area to a partner.',
    challengeSteps: ['Tap the ScratchJr icon to launch it.', 'On the Welcome screen, start a new project.', 'Find the Stage (where the Sprite acts) and the Sprite.', 'Find the programming screen where you group blocks.'],
    skills: ['ScratchJr', 'Interface', 'Sprites'],
  },
  {
    ...SJR, id: 'sch-g2-ch4', title: 'Getting Started with Scratch Junior', emoji: '📱', pages: 20, difficulty: 1, ageGroup: '6-7', grade: 'Grade 2 · Chapter 4',
    concept: 'opening, navigating and creating ScratchJr projects', conceptExplain: 'A reminder of last year\'s skills: how to open an existing project, return home, and create a new one — and how to spot the Stage and Sprite.',
    objectives: ['Open an existing project', 'Return to the home screen', 'Create a new project', 'Identify the Stage and the Sprite'],
    challenge: 'Create a new project, place a Sprite on the Stage, and save it.',
    challengeSteps: ['Open ScratchJr and create a new project.', 'Identify the Stage and the Sprite.', 'Add or move a Sprite on the Stage.', 'Return to the home screen to find your saved project.'],
    skills: ['ScratchJr', 'Navigation', 'Projects'],
  },
  {
    ...SJR, id: 'sch-g3-ch1', title: 'Scratch Junior Review & Backgrounds', emoji: '🎨', pages: 20, difficulty: 2, ageGroup: '8-9', grade: 'Grade 3 · Chapter 1',
    concept: 'reviewing ScratchJr and changing the background', conceptExplain: 'A review of ScratchJr (a language that builds computational-thinking skills) plus how to change the Stage background to make projects more attractive.',
    objectives: ['Identify the Stage, the Sprite and the coding blocks', 'Change the background picture of a project'],
    challenge: 'Make a scene: change the background and place a Sprite that fits the setting.',
    challengeSteps: ['Open a new project and examine the Welcome screen.', 'Point out the Stage, Sprite and coding blocks.', 'Tap the background button and select a picture.', 'Add a matching Sprite to complete the scene.'],
    skills: ['ScratchJr', 'Backgrounds', 'Computational Thinking'],
  },
];

// ─── mBot2 — Robotics theory (school curriculum) ─────────────────
const MB = { programId: 'mbot2', programSlug: 'mbot2', programTitle: 'mBot2 / CyberPi', programColor: '#2563EB', courseId: 'mbot2-iot-1', courseTitle: 'mBot2: Coding, Robotics, IoT & AI', moduleId: 'mbot2-m11', moduleTitle: 'Part 4 · Module 11: Robotics Theory (School Curriculum)' };
const ROBOTICS_CHAPS: Chap[] = [
  {
    ...MB, id: 'rob-g2-ch5', title: 'What Is a Robot?', emoji: '🦾', pages: 18, difficulty: 1, ageGroup: '6-7', grade: 'Grade 2 · Chapter 5', software: 'The workbook chapter; pictures of robots (no hardware required).',
    concept: 'the science of robotics and what robots do', conceptExplain: 'A robot is a man-made machine that performs specific actions to help humans — building cars, watering farmland, helping customers, cleaning floors and more.',
    objectives: ['Define what a robot is', 'Know that a robot is a man-made machine made of metal', 'Know where robots are found (factory, farm, home)', 'List tasks a robot can perform'],
    challenge: 'Make a poster: draw a robot and label three useful tasks it could do at home or school.',
    challengeSteps: ['Write your own definition of a robot.', 'Name two places robots are used.', 'List three tasks a robot can do.', 'Draw and label your own helpful robot.'],
    skills: ['Robotics', 'Concepts', 'Real-World'],
  },
  {
    ...MB, id: 'rob-g5-ch5', title: 'The Components of a Robot', emoji: '🧩', pages: 16, difficulty: 2, ageGroup: '10-12', grade: 'Grade 5 · Chapter 5', software: 'The workbook chapter; an mBot2 to point out the parts (optional).',
    concept: 'the five components every robot has', conceptExplain: 'Coding and robotics are now sciences we learn at school. Every robot is built from five parts: the brain, the motors, the sensors, the skeleton, and the software.',
    objectives: ['Name the five components of a robot (brain, motors, sensors, skeleton, software)', 'Name domains where robots are used', 'Explain the difference between an educational robot and a real one'],
    challenge: 'Label the five components on a picture of the mBot2 and say what each does.',
    challengeSteps: ['List the five components of a robot.', 'On an mBot2, point to the brain, motors, sensors, skeleton.', 'Explain what the software adds.', 'Give one difference between an educational and a real robot.'],
    skills: ['Robotics', 'Components', 'mBot2'],
  },
  {
    ...MB, id: 'rob-g6-ch4', title: 'Exploring the mBot2 & CyberPi', emoji: '🤖', pages: 14, difficulty: 2, ageGroup: '10-12', grade: 'Grade 6 · Chapter 4', software: 'An mBot2 with the CyberPi controller; the workbook chapter.',
    concept: 'the mBot2 robot and the CyberPi controller', conceptExplain: 'Robots are everywhere, performing automated tasks. The mBot2 is built from the same five components — and its "brain" is the CyberPi, which you will explore.',
    objectives: ['List places where robots are used in real life', 'Identify the five components on the mBot2', 'Research and describe the different parts of the CyberPi'],
    challenge: 'Research the CyberPi: list its screen, buttons, sensors and ports, and what each is for.',
    challengeSteps: ['List three real-life uses of robots.', 'Identify the five components on the mBot2.', 'Look up the CyberPi\'s main parts.', 'Describe what each CyberPi part does.'],
    skills: ['Robotics', 'mBot2', 'CyberPi'],
  },
];

// ─── micro:bit — MakeCode (school curriculum) ────────────────────
const MBIT = { programId: 'microbit', programSlug: 'microbit', programTitle: 'micro:bit', programColor: '#10B981', courseId: 'microbit-first', courseTitle: 'micro:bit Coding & Computing (MakeCode)', moduleId: 'mbk-school', moduleTitle: 'School Curriculum · MakeCode Review' };
const MICROBIT_CHAPS: Chap[] = [
  {
    ...MBIT, id: 'mbk-g5-ch1', title: 'MakeCode for the micro:bit (Review)', emoji: '🟩', pages: 20, difficulty: 2, ageGroup: '10-12', grade: 'Grade 5 · Chapter 1', software: 'BBC micro:bits + USB leads; computers with the MakeCode editor (online or offline).',
    concept: 'getting back into MakeCode for the micro:bit', conceptExplain: 'A review chapter: how to run MakeCode (online at makecode.microbit.org or the offline app) and a recap of the Basic blocks — show number, show string, clear screen, pause, show LEDs.',
    objectives: ['Open MakeCode online or install the offline version', 'Use the Basic blocks: show number, show string, clear screen, pause, show LEDs', 'Describe what each Basic block does'],
    challenge: 'Recreate a short program using show string, show LEDs and pause, then flash it to a micro:bit.',
    challengeSteps: ['Open MakeCode (online or offline).', 'From the Basic category, try show number / show string / show LEDs.', 'Add a pause to control timing.', 'Test in the simulator, then flash it to the micro:bit.'],
    skills: ['MakeCode', 'Basic Blocks', 'Review'],
  },
];

// ─── Small Basic (NEW program) ───────────────────────────────────
const SB = { programId: 'small-basic', programSlug: 'small-basic', programTitle: 'Small Basic', programColor: '#0EA5E9', courseId: 'small-basic-1', courseTitle: 'Coding with Microsoft Small Basic', moduleId: 'sb-m1', moduleTitle: 'Coding with Small Basic', software: 'Computers with Microsoft Small Basic (offline from smallbasic.com, or the online editor).' };
const SMALLBASIC_CHAPS: Chap[] = [
  {
    ...SB, id: 'sb-g7-ch1', title: 'Introduction to Small Basic', emoji: '💠', pages: 16, difficulty: 2, ageGroup: '13-15', grade: 'Grade 7 · Chapter 1',
    concept: 'Small Basic — a beginner programming language', conceptExplain: 'People who use a computer are either Users or Coders. To tell a computer what to do you write in a computer language; Small Basic is a simple, friendly language for beginners (available online and offline).',
    objectives: ['Explain what a computer language is and why we need one', 'Distinguish between a user and a coder', 'Open Small Basic (online or offline)', 'Identify the parts of the Small Basic interface (editor, toolbar, objects & properties, command window)'],
    challenge: 'Open Small Basic and write your first program that prints a welcome message to the screen.',
    challengeSteps: ['Open the Small Basic editor.', 'Identify the editor area, toolbar and command window.', 'Type TextWindow.WriteLine("Hello!").', 'Run it and read the output.'],
    skills: ['Small Basic', 'Programming Concepts', 'Interface'],
  },
  {
    ...SB, id: 'sb-g8', title: 'Variables in Small Basic', emoji: '📦', pages: 14, difficulty: 3, ageGroup: '13-15', grade: 'Grade 8',
    concept: 'variables — storing values', conceptExplain: 'A variable stores information typed at the keyboard or produced by a calculation. Each variable has a name (starting with a letter, made of letters/numbers/underscores, never a command name) and holds one value at a time. TextWindow.Read() reads input; TextWindow.WriteLine() shows output.',
    objectives: ['Use TextWindow.WriteLine and TextWindow.Read for output and input', 'Create and use variables', 'Apply the rules for naming a variable', 'Write programs that calculate with variables'],
    challenge: 'Write a program that asks for two numbers and prints their sum (then try swapping two variables).',
    challengeSteps: ['Read two numbers into variables nb1 and nb2.', 'Compute sum = nb1 + nb2.', 'Print "Their sum is " + sum.', 'Bonus: swap the values of A and B using a third variable.'],
    skills: ['Variables', 'Input/Output', 'Calculation'],
  },
];

// ─── Builds ──────────────────────────────────────────────────────
export const SCRATCH_CHAPTER_LESSONS: LessonDetail[] = SCRATCH_CHAPS.map(makeChapter);
export const ROBOTICS_CHAPTER_LESSONS: LessonDetail[] = ROBOTICS_CHAPS.map(makeChapter);
export const MICROBIT_CHAPTER_LESSONS: LessonDetail[] = MICROBIT_CHAPS.map(makeChapter);
export const SMALLBASIC_LESSONS: LessonDetail[] = SMALLBASIC_CHAPS.map(makeChapter);

const sumLesson = (c: Chap) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: 0 });

export const SCRATCH_CHAPTER_MODULE: Module = {
  id: 'sjr-school', title: 'School Curriculum · Grades 1–3', order: 90,
  description: 'The 2023 school-curriculum ScratchJr chapters: launching ScratchJr, navigating projects, and changing backgrounds.',
  lessons: SCRATCH_CHAPS.map((c, i) => ({ ...sumLesson(c), order: 90 + i })),
};
export const ROBOTICS_CHAPTER_MODULE: Module = {
  id: 'mbot2-m11', title: 'Part 4 · Module 11: Robotics Theory (School Curriculum)', order: 11,
  description: 'The 2023 school-curriculum robotics-theory chapters: what a robot is, the five components, and exploring the mBot2 & CyberPi.',
  lessons: ROBOTICS_CHAPS.map((c, i) => ({ ...sumLesson(c), order: 51 + i })),
};
export const MICROBIT_CHAPTER_MODULE: Module = {
  id: 'mbk-school', title: 'School Curriculum · MakeCode Review', order: 21,
  description: 'The 2023 school-curriculum micro:bit chapter: a MakeCode review of the Basic blocks.',
  lessons: MICROBIT_CHAPS.map(c => ({ ...sumLesson(c), order: 82 })),
};

export const SMALLBASIC_COURSE: Course = {
  id: 'small-basic-1', slug: 'small-basic', title: 'Coding with Microsoft Small Basic',
  programId: 'small-basic', programSlug: 'small-basic', ageGroup: '13-15', level: 'Beginner',
  description: 'A gentle introduction to text-based programming with Microsoft Small Basic — a simple, friendly language. Learn what a programming language is, explore the Small Basic interface, and use variables, input/output and calculations. Based on the 2023 school-curriculum chapters (Grades 7–8).',
  objectives: [
    'Understand what a computer language is and the user vs. coder distinction',
    'Navigate the Small Basic editor (online or offline)',
    'Use TextWindow for input and output',
    'Create and use variables with correct naming rules',
    'Write small programs that calculate with variables',
  ],
  duration: '2 chapters × 45–60 minutes', totalHours: 2, lessonCount: 2,
  prerequisites: [], skills: ['Small Basic', 'Variables', 'Input/Output', 'Programming Concepts'],
  modules: [
    { id: 'sb-m1', title: 'Coding with Small Basic', order: 1, description: 'Introduction to Small Basic and working with variables.', lessons: SMALLBASIC_CHAPS.map((c, i) => ({ ...sumLesson(c), order: i + 1 })) },
  ],
};

export const SCHOOL_CHAPTER_LESSONS: LessonDetail[] = [
  ...SCRATCH_CHAPTER_LESSONS, ...ROBOTICS_CHAPTER_LESSONS, ...MICROBIT_CHAPTER_LESSONS, ...SMALLBASIC_LESSONS,
];
