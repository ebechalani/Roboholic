import type { LessonDetail, LessonSection, Module } from '@/types';

// ════════════════════════════════════════════════════════════════
//  mBot2 / CyberPi — Part 2: "CyberPi Basics" (Project-Based Coding Kit)
//  Source: official CyberPi Basics lesson plans (.docx) + PPT + .mblock.
//  12 build-and-program projects. Appended to the mBot2 course as
//  Modules 4–6. Lesson plans are official; prompts are adaptable.
// ════════════════════════════════════════════════════════════════

interface CpConfig {
  n: number;          // 1..12 → id cp2-l{n}, order 14 + n
  title: string;
  module: 4 | 5 | 6;
  emoji: string;
  hardware: string;   // the mBuild module(s) used
  concept: string;    // key focus
  build: string;      // what students build
  program: string[];  // the coding task steps
  skills: string[];
  quiz?: string;      // a review question (where the plan provides one)
}

const HERO = '/lessons/mbot2-l1/cyberpi-device.png';

function makeCpLesson(c: CpConfig): LessonDetail {
  const moduleTitle = c.module === 4 ? 'Part 2 · Module 4: CyberPi Basics — Sensors & Sound'
    : c.module === 5 ? 'Part 2 · Module 5: CyberPi Basics — Motors & Servos'
    : 'Part 2 · Module 6: CyberPi Basics — Smart Projects';

  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Have a CyberPi Project-Based Coding Kit per student or pair, a Type-C cable, and a computer with mBlock 5 (5.30+) or mLink2 for the web version.',
        `This project uses: ${c.hardware}.`,
        `Build "${c.title}" yourself first and test it so you can demo it.`,
        'Open the lesson plan, slides, and demo .mblock (Files section) — they hold the wiring photos, sample script, and quiz.',
        'The lesson plan is official (Makeblock); the timings and prompts here are adaptable.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide (40 min)',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `PROJECT DEMO (2 min): Show the finished ${c.title} and a short hook video to spark interest.` },
        { step: 2, instruction: `KEY FOCUS (8 min): ${c.concept} Connect CyberPi to mBlock (add the device + the extension), and explore the new blocks live.`, tip: 'Right-click a block → Help for a built-in description.' },
        { step: 3, instruction: `HANDS-ON (20–25 min): ${c.build} Then program it (see the Main Activity). Beginners follow along; experienced students explore independently.`, coachNote: 'Use Live mode to test; Upload mode (with Pocket Shield) runs it without the cable.' },
        { step: 4, instruction: 'WRAP-UP (6 min): A couple of students showcase their build and discuss a real-life use.' },
        { step: 5, instruction: 'QUIZ (3 min): Quick review questions to consolidate the concept (optional Challenge to extend).' },
      ],
    },
    {
      type: 'student_steps',
      title: `Build & Program: ${c.title} ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Build & Program: ${c.title} ${c.emoji}`,
      content: [
        `Build the ${c.title} with your CyberPi kit.`,
        'Connect CyberPi to mBlock (add the device + extension).',
        ...c.program,
        'Test in Live mode — does it work? Improve it!',
      ],
      studentContent: [
        `🔧 Build the ${c.title}`,
        '🔌 Connect CyberPi to mBlock',
        ...c.program.map(s => '💻 ' + s),
        '🧪 Test and improve!',
      ],
    },
    {
      type: 'activity',
      title: `Hands-On: ${c.title}`,
      emoji: '🛠️',
      content: [
        `Hardware: ${c.hardware}.`,
        `Build: ${c.build}`,
        'Program it in mBlock (the sample script is in the lesson slides / demo .mblock):',
        ...c.program,
      ],
      studentContent: [`🔧 ${c.build}`, ...c.program.map(s => '✅ ' + s)],
    },
    {
      type: 'challenge',
      title: 'Challenge (optional)',
      emoji: '🎚️',
      content: [
        `Extend your ${c.title}: add sounds, lights, or a second trigger (e.g. button B), or make it react automatically.`,
        'Work in small groups or independently, then test and refine.',
      ],
      studentContent: [`✨ Add a feature to your ${c.title}!`, '🧪 Test and improve it'],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'CyberPi won\'t connect to mBlock', cause: 'Device/extension not added, or wrong mode.', solution: 'Add CyberPi under Devices, add the right extension, plug in the Type-C cable, and click Connect in Live mode.' },
        { problem: 'The mBuild module does nothing', cause: 'Cable not chained, or wrong module block.', solution: 'Chain the module to CyberPi (or via the Pocket Shield) with the mBuild cable and use the matching block.' },
        { problem: 'Servo/motor moves the wrong way or jams', cause: 'Wrong angle/horn or value.', solution: 'Re-seat the servo horn at 0°, and check the angle/speed values in the script.' },
        { problem: 'A team is stuck — Suggested', cause: 'Too much at once.', solution: 'Have them analyse the function (mind map) first, then build the script one block at a time.' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment & Quiz',
      emoji: '✅',
      content: [
        `Student built the ${c.title}.`,
        'Student connected CyberPi and used the correct blocks.',
        'Student programmed and tested the project.',
        ...(c.quiz ? [`Quick quiz: ${c.quiz}`] : []),
        'Student described a real-world use.',
      ],
    },
    {
      type: 'homework',
      title: 'Reflect & Explore',
      emoji: '🏠',
      content: [
        `Where could a ${c.title.toLowerCase()} be useful in real life? Give an example.`,
        'Sketch one upgrade you would add, and which block you\'d use.',
      ],
      studentContent: [`🔎 Where is a ${c.title.toLowerCase()} useful in real life?`, '✏️ Sketch one upgrade'],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `PROJECT: ${c.title} — ${c.hardware}. ${c.concept}`,
        'PROJECT-BASED LEARNING: give a general direction and let students explore/collaborate to find answers.',
        'LIVE vs UPLOAD: test in Live mode; the Pocket Shield enables Upload mode for cable-free running.',
        'The sample script, wiring photos, and quiz answers are in the lesson slides / demo .mblock (Files).',
        'SUGGESTED CONTENT: the plan is official; timings/prompts here are adaptable.',
      ],
    },
  ];

  return {
    id: `cp2-l${c.n}`,
    slug: `cyberpi-${c.n}`,
    title: c.title,
    programId: 'mbot2',
    programSlug: 'mbot2',
    programTitle: 'mBot2 / CyberPi',
    programColor: '#2563EB',
    courseId: 'mbot2-iot-1',
    courseTitle: 'mBot2: Coding, IoT & CyberPi',
    moduleId: `mb2-pm${c.module}`,
    moduleTitle,
    ageGroup: '10-12',
    level: 'Intermediate',
    duration: '40 minutes',
    difficulty: (c.module === 4 ? 2 : c.module === 5 ? 3 : 4) as 2 | 3 | 4,
    heroImage: HERO,
    skills: c.skills,
    materials: [
      { item: 'CyberPi Project-Based Coding Kit', quantity: '1 per student or pair' },
      { item: 'Type-C cable + computer with mBlock 5', quantity: '1 per student or pair' },
      { item: 'CyberPi build manual / slides', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: [
      `Understand the ${c.hardware} and its blocks.`,
      `Build the ${c.title}.`,
      'Program and test the project in mBlock.',
      'Connect the project to a real-world use.',
    ],
    assessmentChecklist: [
      `Built the ${c.title}.`,
      'Used the correct blocks and connected CyberPi.',
      'Programmed and tested it.',
    ],
    sections,
    resources: [
      { id: `cp2-l${c.n}-r1`, title: `${c.title} — Lesson Plan (PDF/DOCX)`, type: 'pdf', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-cyberpi', description: 'Official lesson plan', needsReview: true },
      { id: `cp2-l${c.n}-r2`, title: `${c.title} — Demo Program (.mblock)`, type: 'code', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-cyberpi', description: 'Sample mBlock script', needsReview: true },
    ],
  };
}

const CONFIGS: CpConfig[] = [
  { n: 1, title: 'Distance Detector', module: 4, emoji: '📏', hardware: 'the Ranging (distance) Sensor',
    concept: 'The Ranging Sensor measures the distance to an obstacle with infrared waves (2–200 cm).',
    build: 'Build a Distance Detector from CyberPi + Ranging Sensor.',
    program: ['When button A is pressed, read the ranging sensor and show the distance on the screen.', 'Use an if-statement: show a "safe distance" or "too close" message based on the value.'],
    skills: ['Ranging Sensor', 'If Statements', 'Distance'], quiz: 'What does the Ranging Sensor use to detect distance? (Infrared waves.)' },
  { n: 2, title: 'Orientation Detector', module: 4, emoji: '🧭', hardware: 'CyberPi\'s built-in attitude/angle sensor',
    concept: 'CyberPi can sense how it is tilted (its orientation) using its angle sensor.',
    build: 'Use CyberPi to detect orientation, then make a simple Bat-and-Ball game.',
    program: ['Read the angle/orientation and show it on screen.', 'Use the tilt to move a paddle and bounce a ball in a mini game.'],
    skills: ['Angle Sensor', 'Tilt', 'Game Logic'] },
  { n: 3, title: 'Playing Electronic Keyboard', module: 4, emoji: '🎹', hardware: 'CyberPi\'s speaker and buttons',
    concept: 'CyberPi can play musical notes through its speaker — each input can trigger a different tone.',
    build: 'Turn CyberPi into a little electronic keyboard.',
    program: ['Map buttons/inputs to musical notes.', 'Play the matching note when each is pressed; show the note on screen.'],
    skills: ['Sound', 'Notes', 'Inputs'] },
  { n: 4, title: 'Lightsaber', module: 4, emoji: '⚔️', hardware: 'the 7-colour LED strip + speaker',
    concept: 'An addressable LED strip can show colours and flowing-light effects, paired with sound.',
    build: 'Build a Lightsaber with the LED strip.',
    program: ['Light the strip in your chosen colour when switched on.', 'Add a flowing-light animation and a swing sound effect.'],
    skills: ['LED Strip', 'Animation', 'Sound'] },
  { n: 5, title: 'Electric Road Gate', module: 5, emoji: '🚧', hardware: 'a Servo',
    concept: 'A servo moves to a precise angle, so it can raise and lower a barrier on command.',
    build: 'Build an electric road gate driven by a servo.',
    program: ['On button A, set the servo to raise the gate; on button B, lower it.', 'Add a light/sound while the gate moves.'],
    skills: ['Servo', 'Angles', 'Control'] },
  { n: 6, title: 'Motor Lab', module: 5, emoji: '⚙️', hardware: 'the encoder/DC motor (via Pocket Shield)',
    concept: 'Motors can be controlled for speed and direction — the foundation of moving machines.',
    build: 'Set up a motor on the Pocket Shield and experiment with it.',
    program: ['Run the motor at different powers and directions.', 'Start/stop it with buttons and observe the effect.'],
    skills: ['Motors', 'Speed', 'Direction'] },
  { n: 7, title: 'Oscillating Fan 1', module: 5, emoji: '🌬️', hardware: 'a motor (fan) + servo',
    concept: 'Combining a spinning motor (the fan) with a servo (the swivel) makes an oscillating fan.',
    build: 'Build a fan that both spins and swings side to side.',
    program: ['Run the fan motor when turned on.', 'Sweep the servo back and forth so the fan oscillates.'],
    skills: ['Motor', 'Servo', 'Oscillation'] },
  { n: 8, title: 'Oscillating Fan 2', module: 5, emoji: '🍃', hardware: 'motor + servo (+ controls)',
    concept: 'Adding controls makes the fan smart — adjustable speed and on/off modes.',
    build: 'Upgrade the oscillating fan with speed settings and controls.',
    program: ['Use buttons to change fan speed (low/medium/high).', 'Toggle oscillation on/off and show the mode on screen.'],
    skills: ['Motor', 'Servo', 'Modes'] },
  { n: 9, title: 'Smart Trash Can 1', module: 6, emoji: '🗑️', hardware: 'Pocket Shield + Servo + Ranging Sensor',
    concept: 'A bigger build: a trash can whose lid is moved by a servo, with a ranging sensor to detect a hand.',
    build: 'Build the Smart Trash Can from the build manual; mount the servo and ranging sensor.',
    program: ['Write a test script to move the servo and read the ranging sensor.', 'Confirm both work, then return the servo angle to 0.'],
    skills: ['Servo', 'Ranging Sensor', 'Building'], quiz: 'What is the Ranging Sensor\'s effective max distance? (200 cm.)' },
  { n: 10, title: 'Smart Trash Can 2', module: 6, emoji: '♻️', hardware: 'Servo + Ranging Sensor',
    concept: 'Now make it automatic — the lid opens when someone approaches and closes after.',
    build: 'Use the trash can from Lesson 9.',
    program: ['When the ranging sensor detects a hand within range, open the lid (servo).', 'Close the lid after a short delay; add button A/B as manual open/close.'],
    skills: ['Automation', 'Servo', 'Sensors'] },
  { n: 11, title: 'Autonomous Vehicle 1', module: 6, emoji: '🚗', hardware: 'mBot2 drive motors',
    concept: 'Build and drive a vehicle — the base for autonomous behaviour.',
    build: 'Assemble the mBot2 vehicle and get it driving.',
    program: ['Drive forward, backward, and turn using the motor blocks.', 'Drive a simple set path.'],
    skills: ['Motors', 'Driving', 'Building'] },
  { n: 12, title: 'Autonomous Vehicle 2', module: 6, emoji: '🤖', hardware: 'mBot2 motors + sensors',
    concept: 'Add sensors so the vehicle drives itself — avoiding obstacles or following a line.',
    build: 'Use the vehicle from Lesson 11.',
    program: ['Use the ranging sensor to stop/turn at obstacles, or the line sensor to follow a line.', 'Combine sensing + driving in a loop so it runs autonomously.'],
    skills: ['Autonomy', 'Sensors', 'Loops'] },
];

export const CYBERPI_LESSONS: LessonDetail[] = CONFIGS.map(makeCpLesson);

// Modules 4–6 appended to the mBot2 course.
export const CYBERPI_MODULES: Module[] = [
  {
    id: 'mb2-pm4', title: 'Part 2 · Module 4: CyberPi Basics — Sensors & Sound', order: 4,
    description: 'Distance, orientation, sound, and light with the CyberPi project kit.',
    lessons: CONFIGS.filter(c => c.module === 4).map(c => ({ id: `cp2-l${c.n}`, title: c.title, duration: '40 min', difficulty: 2 as const, skills: c.skills.slice(0, 2), order: 14 + c.n })),
  },
  {
    id: 'mb2-pm5', title: 'Part 2 · Module 5: CyberPi Basics — Motors & Servos', order: 5,
    description: 'Servos and motors: road gate, motor lab, and an oscillating fan.',
    lessons: CONFIGS.filter(c => c.module === 5).map(c => ({ id: `cp2-l${c.n}`, title: c.title, duration: '40 min', difficulty: 3 as const, skills: c.skills.slice(0, 2), order: 14 + c.n })),
  },
  {
    id: 'mb2-pm6', title: 'Part 2 · Module 6: CyberPi Basics — Smart Projects', order: 6,
    description: 'Bigger builds: a smart trash can and an autonomous vehicle.',
    lessons: CONFIGS.filter(c => c.module === 6).map(c => ({ id: `cp2-l${c.n}`, title: c.title, duration: '40 min', difficulty: 4 as const, skills: c.skills.slice(0, 2), order: 14 + c.n })),
  },
];
