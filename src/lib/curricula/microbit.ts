import type { Course, LessonDetail, LessonSection } from '@/types';
import { MICROBIT_UNIT_MODULES, MICROBIT_UNIT_LESSON_COUNT, MICROBIT_COURSE_TITLE } from './microbit-units';

// ════════════════════════════════════════════════════════════════
//  micro:bit — "First Lessons with MakeCode" (BBC micro:bit Foundation)
//  Source: the official 6-lesson series (plan .docx + slides + .hex).
//  Ages 8–11. Coding in MakeCode blocks. Lesson plans are official;
//  coaching prompts are adaptable.
// ════════════════════════════════════════════════════════════════

interface MbConfig {
  n: number;
  title: string;
  emoji: string;
  topics: string;
  outcome: string;
  objectives: string[];
  build: string[];       // the Create coding steps
  skills: string[];
  difficulty: 1 | 2 | 3;
}

function makeMbLesson(c: MbConfig): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'You need BBC micro:bits + micro-USB cables (1 per pair) and computers/iPads with the MakeCode editor (makecode.microbit.org). Battery packs optional.',
        'Open the lesson slides and the completed code (Files section) — the plan includes a ready-made .hex you can drag onto the MICROBIT drive if internet is limited.',
        `Build "${c.title}" yourself first in MakeCode and flash it to a micro:bit so you can demo it.`,
        'micro:bit classroom (mbit.io/lessons-classroom) is a free way to manage and save every student\'s code.',
        'The lesson plan is official (micro:bit Foundation); the timings and prompts here are adaptable.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `ENGAGE (5 min): Introduce the project — "${c.title}". ${c.outcome}` },
        { step: 2, instruction: `INVESTIGATE (10 min): Explore the blocks/inputs needed (${c.topics}). Show the MakeCode editor and the simulator.`, tip: 'The simulator lets students test without a physical micro:bit.' },
        { step: 3, instruction: 'CREATE (20 min): Students build the code (steps in the Main Activity), test in the simulator, then flash it to a real micro:bit.', coachNote: 'Model it on screen, or hand out the printed code-block sheets to assemble.' },
        { step: 4, instruction: 'EVALUATE (5–10 min): Students download to a real micro:bit, test it, and answer the evaluation questions (on paper, with a partner, or as a class).' },
      ],
    },
    {
      type: 'student_steps',
      title: `Code It: ${c.title} ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Code It: ${c.title} ${c.emoji}`,
      content: [
        'Open MakeCode (makecode.microbit.org) and start a new project.',
        ...c.build,
        'Test in the simulator, then flash it to your micro:bit and try it!',
      ],
      studentContent: [
        '💻 Open MakeCode',
        ...c.build.map(s => '🧩 ' + s),
        '▶️ Test in the simulator, then flash it!',
      ],
    },
    {
      type: 'activity',
      title: `Create: ${c.title}`,
      emoji: '🛠️',
      content: [
        c.outcome,
        'Build the program in MakeCode blocks (the completed code is in the slides):',
        ...c.build,
      ],
      studentContent: ['💻 Open MakeCode', ...c.build.map(s => '✅ ' + s)],
    },
    {
      type: 'challenge',
      title: 'Extend It',
      emoji: '🎚️',
      content: [
        `Add your own twist to the ${c.title.toLowerCase()} — extra images, sounds, or a second button/input.`,
        'Test your changes in the simulator and on the micro:bit.',
      ],
      studentContent: [`✨ Add your own twist to the ${c.title.toLowerCase()}`, '▶️ Test it!'],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'The code won\'t flash to the micro:bit', cause: 'Pairing or drive issue.', solution: 'Connect via USB; download the .hex and drag it onto the MICROBIT drive, or use "Connect device" / WebUSB in MakeCode.' },
        { problem: 'Nothing shows on the LED display', cause: 'Missing a "show" block or wrong event.', solution: 'Make sure the show-string / show-icon block is inside the correct event (on start / forever / on button pressed).' },
        { problem: 'Internet/MakeCode is blocked', cause: 'School network.', solution: 'Use the offline MakeCode app or the provided .hex; the slides also include a code-assembly animation.' },
        { problem: 'A student is stuck — Suggested', cause: 'New to blocks.', solution: 'Give the printed code-block handout to cut out and assemble in order, then rebuild it on screen.' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        'Student built the program in MakeCode.',
        'Student tested it in the simulator.',
        'Student flashed it to a real micro:bit and it worked.',
        `Student can explain the key idea (${c.topics}).`,
        'Student extended the project with their own idea.',
      ],
    },
    {
      type: 'homework',
      title: 'Reflect & Explore',
      emoji: '🏠',
      content: [
        'MakeCode runs in any browser — recreate or improve your project at home and save it.',
        `Where might a ${c.title.toLowerCase()} be useful in real life? Give an example.`,
      ],
      studentContent: [`🏠 Improve your ${c.title.toLowerCase()} at home`, '🔎 Where would it be useful in real life?'],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `PROJECT: ${c.title}. Topics: ${c.topics}.`,
        'STRUCTURE: micro:bit lessons follow Engage → Investigate → Create → Evaluate.',
        'The completed code, slides, printable code-block handouts, and a .hex are in the lesson download (Files).',
        'micro:bit classroom saves every student\'s code with no individual accounts — great for $0 management.',
        'SUGGESTED CONTENT: the plan is official; timings/prompts here are adaptable.',
      ],
    },
  ];

  return {
    id: `mb-l${c.n}`, slug: `microbit-${c.n}`, title: c.title,
    programId: 'microbit', programSlug: 'microbit', programTitle: 'micro:bit',
    programColor: '#10B981',
    courseId: 'microbit-first', courseTitle: 'First Lessons with MakeCode',
    moduleId: 'mb-m1', moduleTitle: 'First Lessons with MakeCode & the micro:bit',
    ageGroup: '8-9', level: 'Beginner', duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [
      { item: 'BBC micro:bit + micro-USB cable', quantity: '1 per pair' },
      { item: 'Computer/iPad with MakeCode editor', quantity: '1 per pair' },
      { item: 'micro:bit battery pack', quantity: '1 per micro:bit', isOptional: true },
    ],
    objectives: c.objectives,
    assessmentChecklist: [`Built and flashed "${c.title}".`, 'Tested in the simulator and on the micro:bit.', 'Extended it.'],
    sections,
    resources: [
      { id: `mb-l${c.n}-r1`, title: `${c.title} — Lesson Plan (DOCX)`, type: 'pdf', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-microbit', description: 'Official micro:bit Foundation lesson plan', needsReview: true },
      { id: `mb-l${c.n}-r2`, title: `${c.title} — Completed Code (.hex)`, type: 'code', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-microbit', description: 'Drag onto the MICROBIT drive', needsReview: true },
    ],
  };
}

const CONFIGS: MbConfig[] = [
  {
    n: 1, title: 'Name Badge', emoji: '🏷️', difficulty: 1,
    topics: 'algorithms, input/output, loops', outcome: 'Code the micro:bit for the first time to scroll your name on the LED display.',
    objectives: ['Understand the micro:bit is a tiny computer that needs coded instructions.', 'Understand a sequence of instructions is an algorithm/program.', 'Use the MakeCode editor and transfer code to the micro:bit.', 'Use the LED display output to show words.'],
    build: ['From "on start", add a "show string" block and type your name.', 'Test in the simulator — your name scrolls across the LEDs.', 'Flash it to the micro:bit.'],
    skills: ['MakeCode', 'LED Display', 'Algorithms'],
  },
  {
    n: 2, title: 'Beating Heart', emoji: '❤️', difficulty: 1,
    topics: 'iteration/loops, output, sequence', outcome: 'Animate a beating heart on the LED display using a loop.',
    objectives: ['Use the "forever" loop to repeat actions.', 'Show icons/images on the LED display.', 'Use pauses to control animation speed.'],
    build: ['In "forever", show a big heart icon, then a small heart icon.', 'Add short "pause" blocks between them so it "beats".', 'Test and flash it.'],
    skills: ['Loops', 'Animation', 'Icons'],
  },
  {
    n: 3, title: 'Emotion Badge', emoji: '😀', difficulty: 2,
    topics: 'inputs, events, selection', outcome: 'Show different faces when buttons A and B are pressed.',
    objectives: ['Use button inputs (events) to trigger actions.', 'Show different images for different inputs.', 'Understand how a program responds to the user.'],
    build: ['On "button A pressed", show a happy face.', 'On "button B pressed", show a sad face.', 'Test both buttons in the simulator, then flash it.'],
    skills: ['Inputs', 'Events', 'Selection'],
  },
  {
    n: 4, title: 'Step Counter', emoji: '👟', difficulty: 2,
    topics: 'variables, sensors (accelerometer)', outcome: 'Use the accelerometer to count steps and show the total.',
    objectives: ['Create and use a variable to keep a count.', 'Use the accelerometer "on shake" input.', 'Display the changing value on the LED display.'],
    build: ['Make a variable "steps" set to 0 on start.', 'On "shake", change "steps" by 1.', 'On "button A pressed", show the "steps" number. Test and flash.'],
    skills: ['Variables', 'Accelerometer', 'Counting'],
  },
  {
    n: 5, title: 'Nightlight', emoji: '🔦', difficulty: 3,
    topics: 'sensors (light), conditionals', outcome: 'Use the light sensor so the micro:bit lights up when it gets dark.',
    objectives: ['Read the light-level sensor.', 'Use an if/else conditional based on the reading.', 'Turn the display on/off as an output.'],
    build: ['In "forever", check "if light level < a threshold".', 'If dark → show a bright image; else → clear the display.', 'Test by covering the micro:bit, then flash it.'],
    skills: ['Light Sensor', 'Conditionals', 'Thresholds'],
  },
  {
    n: 6, title: 'Rock, Paper, Scissors', emoji: '✊', difficulty: 3,
    topics: 'random numbers, variables, selection', outcome: 'Shake the micro:bit to randomly show rock, paper, or scissors.',
    objectives: ['Use a random number.', 'Use a variable and conditionals to choose an outcome.', 'Respond to the shake input with an image.'],
    build: ['On "shake", set a variable to a random number 1–3.', 'If 1 → show rock, 2 → paper, 3 → scissors (use if/else if).', 'Test by shaking in the simulator, then flash it.'],
    skills: ['Random', 'Variables', 'Selection'],
  },
];

export const MICROBIT_LESSONS: LessonDetail[] = CONFIGS.map(makeMbLesson);

export const MICROBIT_COURSE: Course = {
  id: 'microbit-first',
  slug: 'first-lessons-makecode',
  title: MICROBIT_COURSE_TITLE,
  programId: 'microbit',
  programSlug: 'microbit',
  ageGroup: '8-9',
  level: 'Beginner',
  description:
    'Code the BBC micro:bit with MakeCode blocks — from your very first program to full cross-curricular projects. Start with six beginner projects (name badge, beating heart, step counter…), then go further with 19 official micro:bit Foundation "do your :bit" units covering computing fundamentals, data handling, sensors, electricity, music, cryptography, cyber security, and the UN Global Goals.',
  objectives: [
    'Code the micro:bit in the MakeCode block editor',
    'Use the LED display, buttons, accelerometer, light, temperature and radio',
    'Use sequences, loops, variables, conditionals, and data',
    'Apply coding to real-world, cross-curricular projects (the UN Global Goals)',
    'Test in the simulator and flash code to a real micro:bit',
  ],
  duration: `${6 + MICROBIT_UNIT_LESSON_COUNT} sessions × 45–60 minutes`,
  totalHours: 6 + MICROBIT_UNIT_LESSON_COUNT,
  lessonCount: 6 + MICROBIT_UNIT_LESSON_COUNT,
  prerequisites: [],
  skills: ['MakeCode', 'Inputs & Outputs', 'Loops & Variables', 'Sensors', 'Conditionals', 'Data', 'Global Goals'],
  modules: [
    {
      id: 'mb-m1', title: '🚀 First Lessons with MakeCode & the micro:bit', order: 1,
      description: 'Six beginner projects from name badge to rock-paper-scissors.',
      lessons: CONFIGS.map(c => ({ id: `mb-l${c.n}`, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.n })),
    },
    ...MICROBIT_UNIT_MODULES,
  ],
};
