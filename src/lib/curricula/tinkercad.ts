import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  3D Modeling — Tinkercad (3 graded chapters: G4 → G5 → G6)
//  Source: the academy's Tinkercad chapter PDFs, rasterized as in-app
//  step-by-step galleries. Ages 10–12. Each chapter is one lesson.
//  Steps are from the workbook; coaching prompts are adaptable.
// ════════════════════════════════════════════════════════════════

interface TcConfig {
  n: number;
  title: string;
  emoji: string;
  pages: number;
  level: 'Beginner' | 'Intermediate';
  intro: string;
  objectives: string[];
  steps: string[];     // what students do this chapter
  skills: string[];
}

function gallery(slug: string, pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${slug}/p-${n}.png`, kind: 'photo', caption: `Workbook page ${i}` });
  }
  return imgs;
}

function makeTcLesson(c: TcConfig): LessonDetail {
  const slug = `3d-l${c.n}`;
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Each student needs a computer with a web browser and a Tinkercad account (free at tinkercad.com — a class can use the teacher\'s Tinkercad Classroom to avoid individual emails).',
        'Project the workbook pages (the gallery below) so the class can follow each step.',
        'Work through the chapter yourself first so you can demo the moves in Tinkercad.',
        `Focus: ${c.intro}`,
        'The workbook is the academy\'s material; the timings and prompts here are adaptable.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `INTRO (5 min): ${c.intro} Show a finished example to spark ideas.` },
        { step: 2, instruction: 'DEMO (10 min): Walk through the chapter steps live in Tinkercad while students watch, then let them mirror each step.', tip: 'Use drag-to-workplane, then resize/rotate; the workbook pages below show every move.' },
        { step: 3, instruction: 'BUILD (20–25 min): Students follow the workbook pages to complete the chapter\'s model(s). Circulate and help.' },
        { step: 4, instruction: 'SHARE (5 min): Students show their 3D models and say one thing they\'d add or change.' },
      ],
    },
    {
      type: 'student_steps',
      title: `Create in 3D! ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Create in 3D! ${c.emoji}`,
      content: c.steps,
      studentContent: c.steps,
    },
    {
      type: 'activity',
      title: `Build It in Tinkercad: ${c.title}`,
      emoji: '🛠️',
      content: [
        c.intro,
        'Follow the workbook pages below step by step in Tinkercad:',
        ...c.steps,
      ],
      studentContent: ['🖱️ Open tinkercad.com', ...c.steps.map(s => '✅ ' + s)],
      images: gallery(slug, c.pages),
    },
    {
      type: 'challenge',
      title: 'Make It Your Own',
      emoji: '🎚️',
      content: [
        'Add your own shapes, colours, and details to personalise your model.',
        'Combine shapes (group / hole) to make something new.',
      ],
      studentContent: ['🎨 Add your own shapes & colours', '🧩 Group shapes to make something new'],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'Can\'t sign in / no email', cause: 'Young students may not have emails.', solution: 'Use Tinkercad Classroom — the teacher creates the class and students join with a code/nickname (no email).' },
        { problem: 'A shape disappears', cause: 'It was turned into a "hole" or moved off-screen.', solution: 'Toggle Solid/Hole in the inspector; press the Home/fit-view button to recentre the view.' },
        { problem: 'Can\'t resize accurately', cause: 'Dragging by eye.', solution: 'Use the white square handles, or type exact dimensions in the boxes that appear when a shape is selected.' },
        { problem: 'Shapes won\'t combine — Suggested', cause: 'Not selected together before grouping.', solution: 'Shift-click to select multiple shapes, then click Group (Ctrl/Cmd+G).' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        'Student opened Tinkercad and started a design.',
        `Student completed the ${c.title.toLowerCase()} steps.`,
        'Student moved, resized, and combined shapes.',
        'Student personalised and shared their model.',
      ],
    },
    {
      type: 'homework',
      title: 'Design at Home',
      emoji: '🏠',
      content: [
        'Tinkercad works in any browser — design one more small object at home and save it to your account.',
        'Think of one real object you\'d like to 3D-print and sketch how you\'d build it from basic shapes.',
      ],
      studentContent: ['🏠 Design one more object at home', '✏️ Sketch an object to build from shapes'],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `CHAPTER FOCUS: ${c.intro}`,
        'TINKERCAD CLASSROOM is the easiest $0 setup for under-13s (no student emails) — set it up once.',
        'The workbook pages (gallery) contain every screenshot/step — project them as students follow.',
        'SUGGESTED CONTENT: workbook is the academy\'s; timings/prompts here are adaptable.',
      ],
    },
  ];

  return {
    id: slug, slug, title: c.title,
    programId: '3d-modeling', programSlug: '3d-modeling', programTitle: '3D Modeling',
    programColor: '#D97706',
    courseId: '3d-tinkercad', courseTitle: '3D Modeling with Tinkercad',
    moduleId: '3d-m1', moduleTitle: 'Tinkercad: From Shapes to 3D Printing',
    ageGroup: '10-12', level: c.level, duration: '45–60 minutes', difficulty: c.n as 1 | 2 | 3,
    heroImage: `/lessons/${slug}/p-01.png`,
    skills: c.skills,
    materials: [
      { item: 'Computer with a web browser', quantity: '1 per student' },
      { item: 'Tinkercad account (or Tinkercad Classroom)', quantity: 'free' },
      { item: 'Workbook chapter (projected)', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: c.objectives,
    assessmentChecklist: [`Completed the ${c.title} chapter in Tinkercad.`, 'Moved, resized, and combined shapes.', 'Personalised a model.'],
    sections,
    resources: [
      { id: `${slug}-r1`, title: `${c.title} — Workbook Chapter (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-3d', description: 'Tinkercad chapter workbook', needsReview: true },
    ],
  };
}

const CONFIGS: TcConfig[] = [
  {
    n: 1, title: 'Tinkercad Basics — Drawing 3D Objects', emoji: '🧊', pages: 12, level: 'Beginner',
    intro: 'Discover the Tinkercad platform and create your first 3D objects by adding and shaping blocks on the workplane.',
    objectives: ['Discover the Tinkercad platform for 3D design.', 'Create an account / join a class.', 'Add shapes to the workplane.', 'Move, resize, and rotate 3D objects.'],
    steps: ['Open tinkercad.com and sign in (or join your class).', 'Start a new design and add a box to the workplane.', 'Move, resize, and rotate it.', 'Add more shapes and arrange them into an object.'],
    skills: ['Tinkercad', 'Shapes', 'Workplane', '3D Basics'],
  },
  {
    n: 2, title: 'Advanced 3D Models', emoji: '🏛️', pages: 12, level: 'Intermediate',
    intro: 'Build on last year\'s basics to produce more advanced 3D models using new Tinkercad features.',
    objectives: ['Revisit the Tinkercad workplane.', 'Use advanced shape tools and alignment.', 'Combine shapes with group and hole.', 'Produce a more detailed 3D model.'],
    steps: ['Open tinkercad.com and start a new design.', 'Add and precisely position several shapes (use Align).', 'Use "hole" + Group to cut and combine shapes.', 'Build a detailed model and colour it.'],
    skills: ['Align', 'Group & Hole', 'Advanced Shapes', '3D Modeling'],
  },
  {
    n: 3, title: 'Tinkercad for 3D Printing', emoji: '🖨️', pages: 14, level: 'Intermediate',
    intro: 'Design models specifically for 3D printing — understanding how a digital design becomes a real object.',
    objectives: ['Understand what Tinkercad is and what 3D printing is.', 'Create an account and explore the welcome screen.', 'Design a printable 3D model.', 'Export a model for printing.'],
    steps: ['Open tinkercad.com and explore the welcome screen.', 'Design a solid, printable model from basic shapes.', 'Check it sits flat on the workplane with no floating parts.', 'Export the model (e.g. .STL) ready for a 3D printer.'],
    skills: ['3D Printing', 'STL Export', 'Design for Print', 'Tinkercad'],
  },
];

export const TINKERCAD_LESSONS: LessonDetail[] = CONFIGS.map(makeTcLesson);

export const TINKERCAD_COURSE: Course = {
  id: '3d-tinkercad',
  slug: 'tinkercad',
  title: '3D Modeling with Tinkercad',
  programId: '3d-modeling',
  programSlug: '3d-modeling',
  ageGroup: '10-12',
  level: 'Beginner',
  description:
    'Design 3D objects in the free Tinkercad app — from your first blocks on the workplane to advanced models and designs ready for a 3D printer. Three graded chapters take students from complete beginner to print-ready designer.',
  objectives: [
    'Navigate Tinkercad and the 3D workplane',
    'Add, move, resize, rotate, and combine shapes',
    'Build detailed 3D models using Align, Group, and Hole',
    'Design and export a model for 3D printing',
  ],
  duration: '3 chapters × 45–60 minutes',
  totalHours: 3,
  lessonCount: 3,
  prerequisites: [],
  skills: ['Tinkercad', '3D Design', 'Shapes & Alignment', '3D Printing'],
  modules: [
    {
      id: '3d-m1', title: 'Tinkercad: From Shapes to 3D Printing', order: 1,
      description: 'Three graded chapters: basics → advanced models → designing for 3D printing.',
      lessons: [
        { id: '3d-l1', title: 'Tinkercad Basics — Drawing 3D Objects', duration: '45–60 min', difficulty: 1, skills: ['Tinkercad', 'Shapes'], order: 1 },
        { id: '3d-l2', title: 'Advanced 3D Models',                     duration: '45–60 min', difficulty: 2, skills: ['Group & Hole', 'Align'], order: 2 },
        { id: '3d-l3', title: 'Tinkercad for 3D Printing',             duration: '45–60 min', difficulty: 3, skills: ['3D Printing', 'STL'], order: 3 },
      ],
    },
  ],
};
