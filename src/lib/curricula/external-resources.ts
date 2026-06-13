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
const MBX = { programId: 'microbit', programSlug: 'microbit', programTitle: 'micro:bit', programColor: '#10B981', courseId: 'microbit-first', courseTitle: 'micro:bit Coding & Computing (MakeCode)', moduleId: 'mbx-explore', moduleTitle: 'Explore More · AI & Real-World' };
const MICROBIT_EXTRAS: Ext[] = [
  {
    ...MBX, id: 'mbx-createai', title: 'AI with the micro:bit (CreateAI)', emoji: '🧠', difficulty: 4, ageGroup: '13-15',
    concept: 'training a machine-learning model on the micro:bit', conceptExplain: 'micro:bit CreateAI lets students record real movement data from the micro:bit\'s sensors, train a machine-learning model to recognise actions (e.g. waving, running), and use the trained model in a MakeCode program — hands-on AI literacy.',
    objectives: ['Explain how a model learns from example data', 'Record movement data and train a model in CreateAI', 'Use the trained model in a MakeCode program'],
    steps: ['Open micro:bit CreateAI (microbit.org/createai).', 'Record several examples of each action you want to recognise.', 'Train the model and test its accuracy live.', 'Export to MakeCode and make the micro:bit react to each recognised action.'],
    challenge: 'Train a model to recognise 3 of your own gestures and make the micro:bit show a different icon for each.',
    skills: ['Machine Learning', 'Data', 'AI Literacy'],
    materials: [{ item: 'BBC micro:bit (v2) + USB lead', quantity: '1 per pair' }, { item: 'Computer with micro:bit CreateAI', quantity: '1 per pair' }],
    resources: [
      { id: 'mbx-createai-r1', title: 'micro:bit CreateAI (official)', type: 'link', audience: 'both', url: 'https://microbit.org/createai/', description: 'Train & use a machine-learning model on the micro:bit' },
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
  id: 'mbx-explore', title: 'Explore More · AI & Real-World', order: 22,
  description: 'Go beyond coding: train a machine-learning model with micro:bit CreateAI, and use the micro:bit\'s sensors in sport. Includes a link to the official micro:bit lessons hub.',
  lessons: MICROBIT_EXTRAS.map((c, i) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: 83 + i })),
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
