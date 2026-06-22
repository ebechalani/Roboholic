import type { Course, LessonDetail, LessonSection, Module, Resource, Difficulty, AgeGroupId } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Curated external/partner resources, integrated as lessons:
//   • micro:bit "Explore More" — CreateAI (machine learning) and
//     micro:bit in Sport (official micro:bit Foundation resources).
//   • Electronics — Maker Electronics & Wearables (paper circuits
//     video + Kitronik Electro-fashion sewable-LED wearables).
//  These link/embed the official resources; coaching prompts are
//  RoboHolic SUGGESTED additions.
// ════════════════════════════════════════════════════════════════

interface Ext {
  id: string; title: string; emoji: string; difficulty: Difficulty;
  programId: string; programSlug: string; programTitle: string; programColor: string;
  courseId: string; courseTitle: string; moduleId: string; moduleTitle: string;
  ageGroup: AgeGroupId; youtubeId?: string;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; challenge: string; skills: string[];
  materials: { item: string; quantity?: string; isOptional?: boolean }[];
  resources: Resource[];
  quiz?: import('@/types').QuizQuestion[];
  interactions?: import('@/types').LessonInteraction[];
}

function makeExt(c: Ext): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        `You need: ${c.materials.map(m => m.item).join(', ')}.`,
        'Open the linked official resource (Resources section) and work through it yourself first.',
        'SUGGESTED CONTENT: the linked resource is the official material; the prompts and challenge here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Open the official resource (and video, if shown) and explore the idea together.',
        'CREATE: Students build/make it following the steps below.',
        'SHARE & EVALUATE: Students test, show their work, and reflect on the objectives.',
      ],
    },
    {
      type: 'activity', title: `Make It: ${c.title}`, emoji: '🛠️',
      content: ['Follow the official resource and these steps:', ...c.steps],
      studentContent: [`🎯 ${c.title}`, ...c.steps.map(s => '👉 ' + s)],
    },
    {
      type: 'challenge', title: 'Challenge & Extend', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student made it work and explained how.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'The official resource (Resources) is the primary material; these prompts are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: c.programId, programSlug: c.programSlug, programTitle: c.programTitle, programColor: c.programColor,
    courseId: c.courseId, courseTitle: c.courseTitle, moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: 'Intermediate', duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills, materials: c.materials,
    objectives: c.objectives,
    assessmentChecklist: c.objectives,
    sections,
    ...(c.youtubeId ? { youtubeId: c.youtubeId } : {}),
    ...(c.quiz ? { quiz: c.quiz } : {}),
    ...(c.interactions ? { interactions: c.interactions } : {}),
    resources: c.resources,
  };
}

// Shared reference resources
const MICROBIT_LESSONS_HUB: Resource = { id: 'mbhub', title: 'More micro:bit Lessons (official hub)', type: 'link', audience: 'coach', url: 'https://microbit.org/teach/lessons/', description: 'micro:bit Foundation: 25+ official lessons & design challenges' };
const KITRONIK_CATALOGUE: Resource = { id: 'kitronik-cat', title: 'Kitronik Materials Catalogue 2025–26 (PDF)', type: 'pdf', audience: 'coach', url: 'https://resources.kitronik.co.uk/pdf/kitronik-materials-computing-design-technology-catalogue-2025-2026-web.pdf', description: 'Computing & Design-Technology kit catalogue (for ordering materials)' };

// ─── micro:bit · Explore More (AI & Real-World) ──────────────────
const MBX = { programId: 'microbit', programSlug: 'microbit', programTitle: 'micro:bit', programColor: '#10B981', courseId: 'microbit-first', courseTitle: 'micro:bit Coding & Computing (MakeCode)', moduleId: 'mbx-explore', moduleTitle: 'Explore More · Real-World' };
const MICROBIT_EXTRAS: Ext[] = [
  {
    ...MBX, id: 'mbx-music', title: 'Make Music with the micro:bit', emoji: '🎵', difficulty: 3, ageGroup: '10-12',
    concept: 'coding music and instruments on the micro:bit', conceptExplain: 'The micro:bit can play tunes through a speaker/headphones and even become a touch instrument. Students code melodies with loops, build a button "jukebox", and make a foil-and-cardboard "Touch Tunes" guitar — blending music with coding, loops and conductivity.',
    objectives: ['Play a melody on the micro:bit using the music blocks', 'Use a loop to repeat a musical phrase efficiently', 'Build a jukebox (buttons → different tunes) or a touch instrument'],
    steps: ['In MakeCode, use the Music blocks to play a short tune (e.g. Frère Jacques).', 'Wrap a repeated bar in a loop so you don\'t code it twice.', 'Make a "jukebox": play a different built-in tune on button A vs B.', 'Advanced: wire foil strips with crocodile clips to the pins for a "Touch Tunes" guitar.'],
    challenge: 'Code your favourite song\'s opening, then turn it into a 2-button jukebox (or a touch-pin instrument).',
    skills: ['Music', 'Loops', 'Inputs & Pins'],
    materials: [{ item: 'BBC micro:bit + headphones/speaker (crocodile clips)', quantity: '1 per pair' }, { item: 'Computer with MakeCode', quantity: '1 per pair' }, { item: 'Cardboard + foil (for Touch Tunes)', quantity: 'per group', isOptional: true }],
    interactions: [{ kind: 'embed', title: '🟩 Code it in MakeCode', url: 'https://makecode.microbit.org/', height: 540, note: 'Build your tune with the Music blocks and press ▶ to hear it in the simulator. (Or open in a new tab.)' }],
    quiz: [
      { question: 'Why use a loop when coding Frère Jacques?', options: ['to repeat a bar without coding it twice', 'to make it louder', 'to change the colour', 'to connect Wi-Fi'], answerIndex: 0 },
      { question: 'A "jukebox" project plays a different tune when you:', options: ['press a button (A or B)', 'shake it once', 'plug in USB', 'cover the LEDs'], answerIndex: 0 },
      { question: 'The "Touch Tunes" guitar uses foil strips because foil is:', options: ['conductive (completes the circuit when touched)', 'colourful', 'loud', 'magnetic'], answerIndex: 0 },
    ],
    resources: [
      { id: 'mbx-music-r1', title: 'Teach Music with the micro:bit (official ideas)', type: 'link', audience: 'both', url: 'https://microbit.org/news/2026-06-21/teach-music-with-the-bbc-microbit/', description: 'Frère Jacques loops, Jukebox, Touch Tunes + classroom examples' },
      MICROBIT_LESSONS_HUB,
    ],
  },
  {
    ...MBX, id: 'mbx-sport', title: 'micro:bit in Sport', emoji: '🏃', difficulty: 3, ageGroup: '10-12',
    concept: 'using micro:bit sensors to measure and improve in sport', conceptExplain: 'The micro:bit\'s accelerometer and timer turn it into a sports gadget — a step counter, jump/shot counter, reaction timer or stopwatch — so students collect real data about movement and performance.',
    objectives: ['Use the accelerometer and timer to measure movement', 'Build a sports gadget (e.g. step counter or reaction timer)', 'Collect and interpret the data'],
    steps: ['Pick a sport gadget (step counter, jump counter, reaction timer, stopwatch).', 'In MakeCode, use the accelerometer (shake/gesture) or input timing.', 'Display the count/time on the LED display.', 'Test it during a real activity and record the data.'],
    challenge: 'Build a reaction-timer game and compare scores with a partner; suggest how to improve your reaction time.',
    skills: ['Sensors', 'Data', 'Sport Tech'],
    materials: [{ item: 'BBC micro:bit + battery pack', quantity: '1 per pair' }, { item: 'Computer with MakeCode', quantity: '1 per pair' }],
    resources: [
      { id: 'mbx-sport-r1', title: '5 Ways to Use the micro:bit in Sport (official)', type: 'link', audience: 'both', url: 'https://microbit.org/news/2026-04-14/5-ways-to-use-the-bbc-microbit-in-sport/', description: 'micro:bit Foundation: sport project ideas' },
      MICROBIT_LESSONS_HUB,
    ],
  },
];

export const MICROBIT_EXTRA_LESSONS: LessonDetail[] = MICROBIT_EXTRAS.map(makeExt);
export const MICROBIT_EXTRA_MODULE: Module = {
  id: 'mbx-explore', title: 'Explore More · Real-World', order: 22,
  description: 'Go beyond coding: make music and instruments, and use the micro:bit\'s sensors in sport. Includes a link to the official micro:bit lessons hub.',
  lessons: MICROBIT_EXTRAS.map((c, i) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: 83 + i })),
};

// ─── micro:bit · First Lessons with CreateAI (official 7-lesson unit, ages 9–12) ───
const CAI = { programId: 'microbit', programSlug: 'microbit', programTitle: 'micro:bit', programColor: '#10B981', courseId: 'microbit-first', courseTitle: 'micro:bit Coding & Computing (MakeCode)', moduleId: 'mbx-createai', moduleTitle: 'micro:bit CreateAI · First Lessons (AI & Machine Learning)' };
const CREATEAI_UNIT_LINK: Resource = { id: 'cai-unit', title: 'First Lessons with micro:bit CreateAI (official unit)', type: 'link', audience: 'both', url: 'https://microbit.org/teach/lessons/first-lessons-with-microbit-createai/', description: 'micro:bit Foundation: the full 7-lesson unit (plans, slides, handouts)' };
const CREATEAI_TOOL_LINK: Resource = { id: 'cai-tool', title: 'micro:bit CreateAI tool', type: 'link', audience: 'both', url: 'https://microbit.org/createai/', description: 'Record data, train and test a machine-learning model' };
const CAI_MATS = [{ item: 'BBC micro:bit (v2) + USB lead', quantity: '1 per pair' }, { item: 'Computer with micro:bit CreateAI', quantity: '1 per pair' }];
const CREATEAI_LESSONS_CFG: Ext[] = [
  {
    ...CAI, id: 'createai-1', title: 'Introducing AI', emoji: '🤖', difficulty: 2, ageGroup: '10-12',
    concept: 'what AI is (and is not)', conceptExplain: 'An unplugged introduction: students explore everyday technologies and decide which ones use artificial intelligence and which do not, building a first mental model of AI.',
    objectives: ['Give examples of technology that does and does not use AI', 'Explain in simple terms what AI is'],
    steps: ['Brainstorm technologies you use every day.', 'Sort them into "uses AI" / "does not use AI".', 'Discuss what the AI ones have in common (they learn or decide).', 'Agree a class definition of AI.'],
    challenge: 'Find one device at home you think uses AI and explain why.',
    skills: ['AI Literacy', 'Discussion'], materials: [{ item: 'No hardware needed (unplugged)' }],
    resources: [CREATEAI_UNIT_LINK, MICROBIT_LESSONS_HUB],
  },
  {
    ...CAI, id: 'createai-2', title: 'Exploring Patterns in Data', emoji: '🔢', difficulty: 2, ageGroup: '10-12',
    concept: 'patterns and rules in data', conceptExplain: 'Unplugged: students spot patterns and apply rules to sort data into categories — the same idea a machine-learning model uses to classify data.',
    objectives: ['Identify patterns in a set of data', 'Apply rules to sort data into categories'],
    steps: ['Look at a set of examples (cards/objects).', 'Find features that group them.', 'Write a rule that sorts them into categories.', 'Test your rule on new examples.'],
    challenge: 'Invent a rule that sorts classmates\' shoes into 3 groups, then test it.',
    skills: ['Data', 'Classification', 'Patterns'], materials: [{ item: 'Sorting cards/objects (unplugged)' }],
    resources: [CREATEAI_UNIT_LINK],
  },
  {
    ...CAI, id: 'createai-3', title: 'Adding Labels & Collecting Data', emoji: '🏷️', difficulty: 3, ageGroup: '10-12',
    concept: 'collecting labelled movement data', conceptExplain: 'Students use the micro:bit\'s accelerometer in CreateAI to record movement-data samples and give each action a label — the training data a model learns from.',
    objectives: ['Use the accelerometer to collect movement-data samples', 'Add a clear label to each action'],
    steps: ['Open micro:bit CreateAI and pick 2–3 actions (e.g. wave, shake, still).', 'Add a label for each action.', 'Record several samples of each by performing the action.', 'Check you have enough samples per label.'],
    challenge: 'Collect clean data for three of your own actions, with at least 5 samples each.',
    skills: ['Data Collection', 'Accelerometer', 'Labels'], materials: CAI_MATS,
    resources: [CREATEAI_TOOL_LINK, CREATEAI_UNIT_LINK],
  },
  {
    ...CAI, id: 'createai-4', title: 'Training & Testing an ML Model', emoji: '🧠', difficulty: 3, ageGroup: '10-12',
    concept: 'training and improving a model', conceptExplain: 'Students train a machine-learning model on their labelled data, test how well it recognises each action, and improve it by cleaning the data and adding more samples.',
    objectives: ['Train a model from labelled data', 'Test the model and read its accuracy', 'Improve a model by cleaning and adding data'],
    steps: ['Train the model on your collected data.', 'Test it live — does it recognise each action?', 'Remove bad samples and add more good ones.', 'Re-train and compare the results.'],
    challenge: 'Get your model to reliably tell two similar actions apart.',
    skills: ['Machine Learning', 'Testing', 'Iteration'], materials: CAI_MATS,
    resources: [CREATEAI_TOOL_LINK, CREATEAI_UNIT_LINK],
  },
  {
    ...CAI, id: 'createai-5', title: 'Enhancing Code with ML', emoji: '💻', difficulty: 3, ageGroup: '10-12',
    concept: 'using an ML model as an input in MakeCode', conceptExplain: 'Students bring their trained model into MakeCode and use "the model recognises X" as an input/event — so the micro:bit reacts to real actions.',
    objectives: ['Use a trained ML model as an input in MakeCode', 'Make the micro:bit respond to recognised actions'],
    steps: ['Open your model in MakeCode.', 'Add an "on ML event" block for each action.', 'Make the micro:bit react (icon/sound) per action.', 'Flash it and test on the device.'],
    challenge: 'Build a project where each recognised action does something different (e.g. a gesture-controlled pet).',
    skills: ['MakeCode', 'ML as Input', 'Events'], materials: CAI_MATS,
    resources: [CREATEAI_TOOL_LINK, CREATEAI_UNIT_LINK],
  },
  {
    ...CAI, id: 'createai-6', title: 'Evaluating an AI System', emoji: '🧪', difficulty: 4, ageGroup: '10-12',
    concept: 'evaluating a model on real, varied users', conceptExplain: 'Students test their project on actual micro:bits with live data from different people — discovering that a model trained on one person may not work for everyone.',
    objectives: ['Test an AI system with live data from different people', 'Identify where the model fails and why'],
    steps: ['Flash your project to a micro:bit.', 'Have several different people try the actions.', 'Record where it works and where it fails.', 'Discuss why it might fail for some people.'],
    challenge: 'List two reasons your model failed for some people and how you could fix it.',
    skills: ['Evaluation', 'Testing', 'AI Ethics'], materials: CAI_MATS,
    resources: [CREATEAI_TOOL_LINK, CREATEAI_UNIT_LINK],
  },
  {
    ...CAI, id: 'createai-7', title: 'Strengthening Models with Diverse Data', emoji: '🌍', difficulty: 4, ageGroup: '10-12',
    concept: 'data diversity and bias', conceptExplain: 'Students improve their model by adding training data from different people, learning why diverse data reduces bias — and the human role in designing fair AI.',
    objectives: ['Improve a model by adding diverse data', 'Explain why diverse data reduces bias', 'Describe the human role in designing AI'],
    steps: ['Collect extra samples from several different people.', 'Add them to your training data and re-train.', 'Re-test with new people and compare to before.', 'Discuss how data choices affect fairness.'],
    challenge: 'Show that adding diverse data made your model work better for more people.',
    skills: ['Data Bias', 'Diversity', 'AI Ethics'], materials: CAI_MATS,
    resources: [CREATEAI_TOOL_LINK, CREATEAI_UNIT_LINK],
  },
];

export const MICROBIT_CREATEAI_LESSONS: LessonDetail[] = CREATEAI_LESSONS_CFG.map(makeExt);
export const MICROBIT_CREATEAI_MODULE: Module = {
  id: 'mbx-createai', title: 'micro:bit CreateAI · First Lessons (AI & Machine Learning)', order: 23,
  description: 'The official 7-lesson micro:bit CreateAI unit (ages 9–12): from "what is AI?" and patterns in data, through collecting movement data, training & testing a model, using it in MakeCode, to evaluating fairness and strengthening models with diverse data.',
  lessons: CREATEAI_LESSONS_CFG.map((c, i) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: 85 + i })),
};

// Cross-listed under the AI / ML / IoT program — same lessons (no duplication;
// they live in the micro:bit course and are reused here by id).
export const AI_ML_COURSE: Course = {
  id: 'ai-ml-createai', slug: 'ai-machine-learning-foundations',
  title: 'AI & Machine Learning Foundations',
  programId: 'ai-ml-iot', programSlug: 'ai-ml-iot', ageGroup: '10-12', level: 'Intermediate',
  description: 'A hands-on first course in artificial intelligence and machine learning, delivered with micro:bit CreateAI. From "what is AI?" and finding patterns in data, through collecting movement data and training, testing and using a model in code, to evaluating an AI system for fairness and reducing bias with diverse data. (Lessons run on the BBC micro:bit.)',
  objectives: [
    'Explain what AI and machine learning are, with everyday examples',
    'Collect and label data, then train and test an ML model',
    'Use a trained model as an input in a program',
    'Evaluate an AI system and understand data bias and diversity',
  ],
  duration: '7 lessons × 45–60 minutes', totalHours: 7, lessonCount: 7,
  prerequisites: [], skills: ['AI Literacy', 'Machine Learning', 'Data', 'AI Ethics'],
  modules: [
    {
      id: 'aiml-m1', title: 'AI & Machine Learning with micro:bit CreateAI', order: 1,
      description: 'The full CreateAI unit — unplugged AI concepts through training, using and evaluating your own ML model.',
      lessons: CREATEAI_LESSONS_CFG.map((c, i) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: i + 1 })),
    },
  ],
};

// ─── Electronics · Maker Electronics & Wearables (NEW course) ────
const EL = { programId: 'electronics', programSlug: 'electronics', programTitle: 'Electronics', programColor: '#EAB308', courseId: 'electronics-maker', courseTitle: 'Maker Electronics & Wearables', moduleId: 'elec-m1', moduleTitle: 'Circuits You Can Make & Wear' };
const ELECTRONICS_CHAPS: Ext[] = [
  {
    ...EL, id: 'elec-paper-circuits', title: 'Paper Circuits', emoji: '💡', difficulty: 2, ageGroup: '10-12', youtubeId: 'ZaTKVjxt_kQ',
    concept: 'building a simple circuit on paper', conceptExplain: 'A paper circuit is a working electrical circuit built on paper using copper tape, an LED and a coin-cell battery. It teaches the basics — a complete loop, polarity (+/−), and a switch — with no soldering.',
    objectives: ['Explain what makes a complete circuit', 'Identify the LED\'s + and − legs (polarity)', 'Build a working paper circuit with a switch'],
    steps: ['Plan your circuit on paper (battery → LED → back to battery).', 'Lay copper tape for the two conductive paths.', 'Place the LED so its legs touch the correct (+/−) tape.', 'Add the coin cell and fold a flap to make a press switch.'],
    challenge: 'Add a second LED, or make a fold-over switch so the light only turns on when the card is opened (a light-up greeting card).',
    skills: ['Circuits', 'Polarity', 'Making'],
    materials: [{ item: 'Copper tape, 5 mm LEDs, CR2032 coin cells', quantity: 'per pair' }, { item: 'Card/paper, sticky tape', quantity: 'per pair' }],
    resources: [
      { id: 'elec-paper-r1', title: 'How to Make Paper Circuits — Video (Science Buddies)', type: 'video', audience: 'both', url: 'https://youtu.be/ZaTKVjxt_kQ', description: 'Step-by-step paper-circuit build' },
      KITRONIK_CATALOGUE,
    ],
  },
  {
    ...EL, id: 'elec-sewable-leds', title: 'Wearables: Sewable LEDs (Electro-fashion)', emoji: '🧵', difficulty: 3, ageGroup: '13-15',
    concept: 'e-textiles — sewing a circuit with conductive thread', conceptExplain: 'Electro-fashion (Kitronik) is an e-textiles kit: you sew sewable LEDs to a battery holder using conductive thread, building a wearable circuit. Same circuit rules as paper circuits — a complete loop and correct polarity — but stitched into fabric.',
    objectives: ['Plan a wearable circuit layout', 'Sew sewable LEDs to a battery holder with conductive thread', 'Keep + and − threads from crossing (no short circuit)'],
    steps: ['Plan where the battery holder and LEDs go on the fabric.', 'Sew the + (positive) thread path from the battery holder + to each LED +.', 'Sew the − path separately so the two never touch.', 'Insert the coin cell and check every LED lights.'],
    challenge: 'Design a wearable badge or cuff with at least 3 LEDs and a neat, short-free stitched layout.',
    skills: ['E-textiles', 'Circuits', 'Design'],
    materials: [{ item: 'Kitronik Electro-fashion kit (sewable LEDs, battery holder, conductive thread)', quantity: 'per pair' }, { item: 'Felt/fabric and needles', quantity: 'per pair' }],
    resources: [
      { id: 'elec-sew-r1', title: 'Electro-fashion Sewable LED Kits — Guide (Kitronik PDF)', type: 'pdf', audience: 'both', url: 'https://resources.kitronik.co.uk/pdf/Electro_fashion_sewable_LED_kits_web.pdf', description: 'How to build wearable sewable-LED circuits' },
      KITRONIK_CATALOGUE,
    ],
  },
];

export const ELECTRONICS_LESSONS: LessonDetail[] = ELECTRONICS_CHAPS.map(makeExt);

export const ELECTRONICS_COURSE: Course = {
  id: 'electronics-maker', slug: 'maker-electronics-wearables', title: 'Maker Electronics & Wearables',
  programId: 'electronics', programSlug: 'electronics', ageGroup: '10-12', level: 'Beginner',
  description: 'Hands-on, no-solder electronics: build a working paper circuit with copper tape and an LED, then stitch a wearable e-textiles circuit with sewable LEDs (Kitronik Electro-fashion). Learn complete circuits, polarity and switches by making things you can keep and wear.',
  objectives: [
    'Understand what makes a complete circuit and why polarity matters',
    'Build a paper circuit with copper tape, an LED and a coin cell',
    'Sew a wearable circuit with conductive thread and sewable LEDs',
    'Design a circuit layout that avoids short circuits',
  ],
  duration: '2 projects × 45–60 minutes', totalHours: 2, lessonCount: 2,
  prerequisites: [], skills: ['Circuits', 'Polarity', 'E-textiles', 'Making'],
  modules: [
    { id: 'elec-m1', title: 'Circuits You Can Make & Wear', order: 1, description: 'Paper circuits and sewable-LED wearables.', lessons: ELECTRONICS_CHAPS.map((c, i) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: i + 1 })) },
  ],
};

// ─── Python · Learn by Playing (CodeCombat + Py-Rates) ───────────
const PY = { programId: 'python', programSlug: 'python', programTitle: 'Python', programColor: '#1D4ED8', courseId: 'python-1', courseTitle: 'Python & MicroPython (Physical Computing)', moduleId: 'py-m4', moduleTitle: 'Module 4: Learn Python by Playing' };
const PYTHON_PLAY_CFG: Ext[] = [
  {
    ...PY, id: 'py-codecombat', title: 'CodeCombat — Code Your Hero in Python', emoji: '⚔️', difficulty: 2, ageGroup: '10-12',
    concept: 'learning real Python by playing CodeCombat', conceptExplain: 'CodeCombat is a game where you type real Python to move your hero, defeat ogres and solve mazes. Unlike block games it uses actual code, so students practise Python syntax (commands, arguments, loops) while playing. The core levels are free.',
    objectives: ['Write Python commands to control a character', 'Use methods with arguments (e.g. hero.moveRight())', 'Apply loops to repeat actions in a level'],
    steps: ['Open CodeCombat and start the free "Dungeon" / Intro to CS course.', 'Type the Python commands shown to move and act.', 'Read the error hints and fix your code to pass each level.', 'Use a loop when you repeat the same action.'],
    challenge: 'Complete the first set of levels using a loop at least once, then explain what your code did.',
    skills: ['Python', 'Syntax', 'Game-Based Learning'],
    materials: [{ item: 'Computer with a browser (codecombat.com) — free account', quantity: '1 per student' }],
    interactions: [{ kind: 'embed', title: '⚔️ Play CodeCombat', url: 'https://codecombat.com/play', height: 560, note: 'Type real Python to play. If it doesn\'t load embedded, use "Open in a new tab".' }],
    quiz: [
      { question: 'How is CodeCombat different from block-coding games?', options: ['you type real Python (and JavaScript) code', 'you only drag blocks', 'you draw pictures', 'you record video'], answerIndex: 0 },
      { question: 'hero.moveRight() is an example of:', options: ['calling a method (command)', 'a variable', 'a comment', 'a loop'], answerIndex: 0 },
      { question: 'When you repeat the same action many times you should use a:', options: ['loop', 'new file', 'picture', 'sound'], answerIndex: 0 },
    ],
    resources: [
      { id: 'cc-r1', title: 'CodeCombat — coding games to learn Python', type: 'link', audience: 'both', url: 'https://codecombat.com/', description: 'Free core progression; school dashboards available' },
      { id: 'cc-r2', title: 'CodeCombat for Educators', type: 'link', audience: 'coach', url: 'https://codecombat.com/teachers', description: 'Class dashboards, guides and curriculum' },
    ],
  },
  {
    ...PY, id: 'py-pyrates', title: 'Py-Rates — Python Pirate Adventure', emoji: '🏴‍☠️', difficulty: 2, ageGroup: '10-12',
    concept: 'easing from blocks to text Python with Py-Rates', conceptExplain: 'Py-Rates is a free "serious game" where you control a pirate by writing short Python programs (move, turn, loops, conditions). It is designed to bridge block coding and real Python text — a gentle way into typing code.',
    objectives: ['Control a character by writing Python', 'Use sequences, loops and conditions in code', 'Build confidence typing Python (not blocks)'],
    steps: ['Open Py-Rates (py-rates.org) and start the first island.', 'Write Python to move/turn the pirate to the goal.', 'Add a loop to repeat moves, and a condition where needed.', 'Progress through the islands, fixing your code as you go.'],
    challenge: 'Finish an island using a loop, and explain why the loop was shorter than repeating the moves.',
    skills: ['Python', 'Loops & Conditions', 'Game-Based Learning'],
    materials: [{ item: 'Computer with a browser (py-rates.org) — free, no install', quantity: '1 per student' }],
    interactions: [{ kind: 'embed', title: '🏴‍☠️ Play Py-Rates', url: 'https://py-rates.org/', height: 560, note: 'Write Python to guide the pirate. If it doesn\'t load embedded, use "Open in a new tab".' }],
    quiz: [
      { question: 'Py-Rates is designed to help students move from:', options: ['block coding to real text Python', 'Python to blocks', 'drawing to music', 'reading to writing only'], answerIndex: 0 },
      { question: 'You control the pirate by:', options: ['writing Python code', 'tapping arrows only', 'shaking the mouse', 'speaking'], answerIndex: 0 },
      { question: 'A loop in Py-Rates lets you:', options: ['repeat moves with less code', 'change the colour', 'add sound', 'end the game'], answerIndex: 0 },
    ],
    resources: [
      { id: 'pyr-r1', title: 'Py-Rates — free Python game', type: 'link', audience: 'both', url: 'https://py-rates.org/', description: 'Serious game easing the block→text Python transition' },
    ],
  },
];

export const PYTHON_PLAY_LESSONS: LessonDetail[] = PYTHON_PLAY_CFG.map(makeExt);
export const PYTHON_PLAY_MODULE: Module = {
  id: 'py-m4', title: 'Module 4: Learn Python by Playing', order: 4,
  description: 'Practise real Python by playing two free coding games in the browser: CodeCombat (code your hero) and Py-Rates (a pirate Python adventure).',
  lessons: PYTHON_PLAY_CFG.map((c, i) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: i + 1 })),
};

// ─── Game Design · Code a Game (CodeCombat) ──────────────────────
const GDP_CFG: Ext[] = [
  {
    programId: 'game-design', programSlug: 'game-design', programTitle: 'Game Design', programColor: '#DC2626',
    courseId: 'game-design-1', courseTitle: 'Make Games with MakeCode Arcade', moduleId: 'gd-m4', moduleTitle: 'Code-a-Game · CodeCombat',
    id: 'gd-codecombat', title: 'CodeCombat — Code a Game with Real Code', emoji: '⚔️', difficulty: 3, ageGroup: '10-12',
    concept: 'learning game logic by typing real code in CodeCombat', conceptExplain: 'CodeCombat is a game where you write real Python (or JavaScript) to control a hero — moving, fighting and solving levels. It teaches the same logic as game design (sequences, loops, conditions, coordinates) but with typed code instead of blocks.',
    objectives: ['Control a game character by typing code', 'Use loops and conditions to beat levels', 'Connect coding logic to game behaviour'],
    steps: ['Open CodeCombat and start the free intro course.', 'Type the commands to move and act.', 'Use a loop to repeat moves; add a condition to react.', 'Progress through levels, debugging your code.'],
    challenge: 'Beat a set of levels using a loop and a condition, then explain how your code controlled the game.',
    skills: ['Coding', 'Game Logic', 'Loops & Conditions'],
    materials: [{ item: 'Computer with a browser (codecombat.com) — free account', quantity: '1 per student' }],
    interactions: [{ kind: 'embed', title: '⚔️ Play CodeCombat', url: 'https://codecombat.com/play', height: 560, note: 'Type real code to play. If it doesn\'t load embedded, use "Open in a new tab".' }],
    quiz: [
      { question: 'CodeCombat teaches game logic using:', options: ['real typed code (Python/JS)', 'only drag-and-drop blocks', 'paper only', 'video'], answerIndex: 0 },
      { question: 'Which is most useful for repeating a move in a level?', options: ['a loop', 'a comment', 'a new file', 'a sound'], answerIndex: 0 },
      { question: 'Reacting differently when an enemy is near uses a:', options: ['condition (if)', 'loop only', 'variable name', 'colour'], answerIndex: 0 },
    ],
    resources: [
      { id: 'gd-cc-r1', title: 'CodeCombat — coding games', type: 'link', audience: 'both', url: 'https://codecombat.com/', description: 'Free core progression; learn by playing' },
      { id: 'gd-cc-r2', title: 'CodeCombat for Educators', type: 'link', audience: 'coach', url: 'https://codecombat.com/teachers', description: 'Class dashboards & curriculum' },
    ],
  },
];
export const GAMEDESIGN_PLAY_LESSONS: LessonDetail[] = GDP_CFG.map(makeExt);
export const GAMEDESIGN_PLAY_MODULE: Module = {
  id: 'gd-m4', title: 'Code-a-Game · CodeCombat', order: 4,
  description: 'Go from blocks to real code: play CodeCombat to learn game logic (loops, conditions) by typing Python/JavaScript.',
  lessons: GDP_CFG.map(c => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: 1 })),
};
