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
  description: 'Go beyond coding: use the micro:bit\'s sensors in sport. Includes a link to the official micro:bit lessons hub.',
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
