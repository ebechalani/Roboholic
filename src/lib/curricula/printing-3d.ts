import type { Course, LessonDetail, LessonSection, Module, Resource, Difficulty, AgeGroupId, QuizQuestion, LessonInteraction } from '@/types';

// ════════════════════════════════════════════════════════════════
//  3D Printing — "From Design to Print with Tinkercad" (3 levels, 12 lessons)
//  The full pipeline: design in Tinkercad → export STL → slice (Cura)
//  → print safely → iterate. Distinct from the 3D Modeling course
//  (which focuses on Tinkercad design); this one focuses on PRINTING.
//  Lessons link the official Tinkercad Learn / Help and Cura docs and
//  embed a beginner walkthrough; coaching prompts are RoboHolic adds.
// ════════════════════════════════════════════════════════════════

const L1 = 'Level I · Design for 3D Printing (Tinkercad)';
const L2 = 'Level II · From Model to Print (Slice & Print)';
const L3 = 'Level III · Precision & Projects';

interface TD {
  id: string; title: string; emoji: string; difficulty: Difficulty; ageGroup: AgeGroupId;
  moduleId: string; moduleTitle: string; order: number; youtubeId?: string;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; challenge: string; skills: string[]; quiz?: QuizQuestion[]; interactions?: LessonInteraction[];
  resources: Resource[];
}

function makeTD(c: TD): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        'You need: computers/tablets with a browser for Tinkercad (free at tinkercad.com); a slicer (UltiMaker Cura, free) on the print computer; and an FDM 3D printer with PLA filament (for the printing lessons).',
        'PRINTER SAFETY: the nozzle (~200 °C) and bed are HOT — never touch them; tie back hair/sleeves; supervise all printer operation; ventilate the room; keep tools (scrapers/cutters) used carefully and by/with an adult.',
        'Do the design + a test print yourself first. SUGGESTED CONTENT: the linked Tinkercad/Cura resources are the source material; the steps and challenge here are RoboHolic suggestions.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Show the linked tutorial and demo the idea on screen (and at the printer where relevant).',
        'CREATE: Students follow the steps in Tinkercad / the slicer.',
        'REVIEW: Check designs against the print rules; queue prints (printing happens over time — rotate students through the printer).',
      ],
    },
    {
      type: 'student_steps', title: `Do It: ${c.title} ${c.emoji}`, emoji: '🎯',
      content: ['Follow these steps (and the linked guide in Resources):', ...c.steps],
      studentContent: [`🖨️ ${c.title}`, ...c.steps.map(s => '👉 ' + s)],
    },
    {
      type: 'challenge', title: 'Design Challenge', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student followed safe practice and produced a printable design / successful print.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'PRINTING TAKES TIME: design in class, print in the background; keep a print queue and a log (who/what/settings/result).',
        'Default beginner settings: PLA, 0.2 mm layer height, 15–20% infill, supports only for big overhangs, brim if adhesion is poor.',
        'The official Tinkercad/Cura resources (Resources) are the primary material; these prompts are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: '3d-printing', programSlug: '3d-printing', programTitle: '3D Printing', programColor: '#9333EA',
    courseId: '3d-printing-1', courseTitle: 'From Design to Print with Tinkercad',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: c.moduleId === 'tdp-m1' ? 'Beginner' : c.moduleId === 'tdp-m2' ? 'Intermediate' : 'Advanced',
    duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [
      { item: 'Computer/tablet with a browser (tinkercad.com)', quantity: '1 per student' },
      { item: 'FDM 3D printer + PLA filament', quantity: '1 per class' },
      { item: 'Slicer software (UltiMaker Cura, free)', quantity: 'on the print computer' },
    ],
    objectives: c.objectives, assessmentChecklist: c.objectives,
    sections,
    ...(c.youtubeId ? { youtubeId: c.youtubeId } : {}),
    ...(c.quiz ? { quiz: c.quiz } : {}),
    ...(c.interactions ? { interactions: c.interactions } : {}),
    resources: c.resources,
  };
}

// Shared official links
const TC_LEARN: Resource = { id: 'tc-learn', title: 'Tinkercad — Learn 3D Design (Starters, Lessons, Projects)', type: 'link', audience: 'both', url: 'https://www.tinkercad.com/learn/designs', description: 'Official Tinkercad tutorials' };
const TC_EXPORT: Resource = { id: 'tc-export', title: 'Tinkercad — Export file types (STL/OBJ) explained', type: 'link', audience: 'both', url: 'https://www.tinkercad.com/help/3d-editor/export-filetypes', description: 'Choose STL for 3D printing' };
const CURA: Resource = { id: 'cura', title: 'UltiMaker Cura — beginner slicing tutorial', type: 'link', audience: 'both', url: 'https://community.ultimaker.com/topic/28637-tutorial-for-new-beginners/', description: 'Free slicer: settings & first print' };

const CONFIGS: TD[] = [
  // ─── Level I · Design for 3D Printing ───
  {
    id: '3dp-1', title: 'What Is 3D Printing? (How FDM Works)', emoji: '🖨️', difficulty: 2, ageGroup: '10-12', moduleId: 'tdp-m1', moduleTitle: L1, order: 1, youtubeId: 'XL1XVV6gQ9E',
    concept: 'additive manufacturing and the FDM process', conceptExplain: 'A 3D printer builds an object layer by layer (additive manufacturing). An FDM printer melts plastic filament (usually PLA) and lays it down in thin layers that fuse together. Students learn the printer parts, the workflow (design → slice → print) and safety.',
    objectives: ['Explain how FDM 3D printing builds objects layer by layer', 'Name the printer parts (nozzle, hot end, bed, extruder, filament)', 'State the design → slice → print workflow and safety rules'],
    steps: ['Watch the beginner walkthrough above.', 'Identify the printer parts on a real/diagram printer.', 'List the 3 stages: design (Tinkercad) → slice (Cura) → print.', 'Agree the safety rules (hot nozzle/bed, supervision, ventilation).'],
    challenge: 'Sketch the workflow as a flowchart and label 3 safety rules for the print room.',
    skills: ['3D Printing Basics', 'FDM', 'Safety'],
    quiz: [
      { question: 'How does an FDM 3D printer build an object?', options: ['Layer by layer (additive)', 'By carving a block', 'By melting metal', 'By printing ink on paper'], answerIndex: 0 },
      { question: 'Which part melts the filament?', options: ['the bed', 'the nozzle / hot end', 'the screen', 'the SD card'], answerIndex: 1 },
      { question: 'The most common beginner filament is:', options: ['PLA', 'steel', 'glass', 'wood'], answerIndex: 0 },
    ],
    resources: [TC_LEARN, CURA],
  },
  {
    id: '3dp-2', title: 'Tinkercad Basics: Shapes & the Workplane', emoji: '🟦', difficulty: 2, ageGroup: '10-12', moduleId: 'tdp-m1', moduleTitle: L1, order: 2,
    concept: 'placing and transforming shapes in Tinkercad', conceptExplain: 'Tinkercad is a free, browser CAD tool. You drag basic shapes onto the workplane and move, rotate, scale and raise them to build 3D models for printing.',
    objectives: ['Add shapes to the workplane', 'Move, rotate, scale and raise shapes', 'Navigate the 3D view'],
    steps: ['Open Tinkercad and start a new design.', 'Drag in a few basic shapes.', 'Move/rotate/scale them; use the up-arrow to raise a shape.', 'Orbit, pan and zoom to view from all sides.'],
    challenge: 'Build a simple snowman or robot from at least 5 shapes, sized in millimetres.',
    skills: ['Tinkercad', 'Transforms', '3D Navigation'],
    quiz: [
      { question: 'Tinkercad is:', options: ['a free browser 3D design tool', 'a slicer', 'a printer', 'a game'], answerIndex: 0 },
      { question: 'The flat grid you build shapes on is the:', options: ['workplane', 'nozzle', 'infill', 'brim'], answerIndex: 0 },
      { question: 'To resize a shape you use the:', options: ['scale handles', 'colour picker', 'export button', 'ruler only'], answerIndex: 0 },
    ],
    resources: [TC_LEARN],
  },
  {
    id: '3dp-3', title: 'Combine & Hollow: Solids and Holes', emoji: '🕳️', difficulty: 3, ageGroup: '10-12', moduleId: 'tdp-m1', moduleTitle: L1, order: 3,
    concept: 'grouping solids and holes to carve shapes', conceptExplain: 'Any shape can be a "solid" or a "hole". Grouping a hole with a solid cuts the hole out — how you make openings, text cut-outs and hollow parts. Align keeps everything tidy.',
    objectives: ['Turn a shape into a hole', 'Group solids and holes to cut shapes', 'Use Align to position parts'],
    steps: ['Make a solid base shape.', 'Add a shape, set it to "Hole", and position it.', 'Select both and Group to cut the hole.', 'Use Align to centre parts.'],
    challenge: 'Design a keychain or name tag with a hole for the ring and raised/cut-out text.',
    skills: ['Group / Hole', 'Align', 'Design'],
    quiz: [
      { question: 'To cut a hole in a shape you:', options: ['group a "Hole" shape with a solid', 'paint it black', 'export it', 'rotate it'], answerIndex: 0 },
      { question: 'The Align tool is used to:', options: ['line shapes up neatly', 'change colour', 'slice the model', 'add infill'], answerIndex: 0 },
      { question: 'A shape can be set as a solid or a:', options: ['hole', 'layer', 'support', 'brim'], answerIndex: 0 },
    ],
    resources: [TC_LEARN],
  },
  {
    id: '3dp-4', title: 'Designing a Printable Object', emoji: '✅', difficulty: 3, ageGroup: '10-12', moduleId: 'tdp-m1', moduleTitle: L1, order: 4,
    concept: 'design rules so a model actually prints', conceptExplain: 'Not every model prints well. Good prints have a flat base on the workplane, walls that aren\'t too thin, no tiny fragile parts, and limited steep overhangs. Designing with these rules avoids failed prints.',
    objectives: ['Apply print design rules (flat base, wall thickness, no tiny features)', 'Check a model sits flat on the workplane', 'Fix a design that would fail to print'],
    steps: ['Review the print rules: flat base, ≥2 mm walls, avoid thin spikes, limit overhangs.', 'Design a small useful object (e.g. a desk hook, token, or coaster).', 'Drop it flat to the workplane.', 'Check walls/features against the rules and fix any problems.'],
    challenge: 'Design a printable object you actually want, that follows all the print rules.',
    skills: ['Design for Printing', 'Wall Thickness', 'Problem Solving'],
    quiz: [
      { question: 'A model prints best when it has:', options: ['a flat base on the workplane', 'very thin spikes', 'no base', 'floating parts'], answerIndex: 0 },
      { question: 'Very thin walls are a problem because they:', options: ['may fail / break when printed', 'print faster', 'use no plastic', 'look better'], answerIndex: 0 },
      { question: 'Designing with print rules in mind:', options: ['avoids failed prints', 'wastes time', 'is only for experts', 'is impossible'], answerIndex: 0 },
    ],
    resources: [TC_LEARN, CURA],
  },

  // ─── Level II · From Model to Print ───
  {
    id: '3dp-5', title: 'Export STL & Intro to Slicing', emoji: '📤', difficulty: 3, ageGroup: '13-15', moduleId: 'tdp-m2', moduleTitle: L2, order: 5, youtubeId: '4FDlgeCOGUI',
    concept: 'exporting a model and what a slicer does', conceptExplain: 'To print, you export the model as an STL file, then open it in a slicer (like Cura). The slicer converts the model into layers and printer instructions (G-code). It is the bridge between design and printer.',
    objectives: ['Export a design as STL from Tinkercad', 'Import the STL into a slicer', 'Explain what slicing produces (layers → G-code)'],
    steps: ['In Tinkercad, Export → STL.', 'Open UltiMaker Cura and import the STL.', 'Place it on the virtual bed and preview the layers.', 'Slice it and see the estimated time/material.'],
    challenge: 'Export one of your designs, slice it, and report its print time and filament length.',
    skills: ['STL Export', 'Slicing', 'Workflow'],
    quiz: [
      { question: 'For 3D printing you export your model as:', options: ['STL', 'MP3', 'PDF', 'DOCX'], answerIndex: 0 },
      { question: 'A slicer (like Cura) turns the model into:', options: ['layers / printer instructions (G-code)', 'a photo', 'a website', 'a spreadsheet'], answerIndex: 0 },
      { question: 'The design → slice → print order means slicing comes:', options: ['after designing, before printing', 'first', 'last', 'never'], answerIndex: 0 },
    ],
    resources: [TC_EXPORT, CURA],
  },
  {
    id: '3dp-6', title: 'Slicer Settings That Matter', emoji: '⚙️', difficulty: 3, ageGroup: '13-15', moduleId: 'tdp-m2', moduleTitle: L2, order: 6,
    concept: 'the key print settings', conceptExplain: 'A few settings control quality, strength and time: layer height (detail vs speed), infill (inside density/strength), wall count, and temperature. Understanding them lets you trade quality vs time on purpose.',
    objectives: ['Set layer height and explain its effect', 'Set infill and walls for strength', 'Pick settings for a goal (fast vs strong vs detailed)'],
    steps: ['In Cura, try 0.2 mm vs 0.1 mm layer height and compare the preview.', 'Change infill (e.g. 15% vs 50%) and see the inside.', 'Adjust wall count.', 'Choose settings for "fast draft" vs "strong functional".'],
    challenge: 'Slice the same model two ways (fast draft vs strong) and compare time, material and look.',
    skills: ['Layer Height', 'Infill', 'Print Tuning'],
    quiz: [
      { question: 'A smaller layer height gives:', options: ['more detail but a slower print', 'less detail, faster', 'no change', 'a bigger model'], answerIndex: 0 },
      { question: 'Infill controls:', options: ['how solid/dense the inside is', 'the colour', 'the file name', 'the bed size'], answerIndex: 0 },
      { question: 'More infill makes a part:', options: ['stronger (but slower / more material)', 'weaker', 'smaller', 'transparent'], answerIndex: 0 },
    ],
    resources: [CURA],
  },
  {
    id: '3dp-7', title: 'Supports & Orientation', emoji: '🪜', difficulty: 4, ageGroup: '13-15', moduleId: 'tdp-m2', moduleTitle: L2, order: 7,
    concept: 'overhangs, the 45° rule, supports and part orientation', conceptExplain: 'Plastic can\'t print on thin air. Overhangs steeper than ~45° need supports (removable scaffolding), and how you ORIENT a part changes how much support and how strong it is. Smart orientation = better, faster prints.',
    objectives: ['Identify overhangs that need support', 'Enable supports in the slicer', 'Orient a part to reduce support and improve strength'],
    steps: ['Find overhangs on a model (steeper than ~45°).', 'Turn on supports in Cura and preview them.', 'Rotate the part to a better orientation and re-check supports.', 'Choose the orientation with least support / best strength.'],
    challenge: 'Take a tricky model and find the orientation that needs the least support — justify your choice.',
    skills: ['Supports', 'Orientation', 'Overhangs'],
    quiz: [
      { question: 'Overhangs steeper than about 45° usually need:', options: ['supports', 'more colour', 'less infill', 'a bigger nozzle'], answerIndex: 0 },
      { question: 'Supports are:', options: ['removable scaffolding printed under overhangs', 'permanent parts', 'a type of filament', 'a slicer'], answerIndex: 0 },
      { question: 'Changing how a part is oriented can:', options: ['reduce supports and improve strength', 'only change the colour', 'do nothing', 'break the slicer'], answerIndex: 0 },
    ],
    resources: [CURA],
  },
  {
    id: '3dp-8', title: 'First Print: Run the Printer Safely', emoji: '🔥', difficulty: 3, ageGroup: '13-15', moduleId: 'tdp-m2', moduleTitle: L2, order: 8,
    concept: 'operating the printer and finishing a print', conceptExplain: 'Running a print means: check/level the bed, load filament, start the sliced file, watch the first layer (the most important), then remove and finish the part — all with hot-surface safety.',
    objectives: ['Prepare the printer (bed level, filament loaded)', 'Start a print and check the first layer', 'Remove and finish a print safely'],
    steps: ['Check the bed is level and clean; load/confirm filament.', 'Send the sliced file and start the print.', 'Watch the FIRST LAYER stick well (restart if it doesn\'t).', 'When done and cool, remove the part and clean off any brim/supports (carefully).'],
    challenge: 'Run a successful print of your Level-I object and log the settings + result.',
    skills: ['Printer Operation', 'First Layer', 'Safety & Finishing'],
    quiz: [
      { question: 'The nozzle and bed are:', options: ['hot — never touch them', 'always cold', 'made of paper', 'safe to grab'], answerIndex: 0 },
      { question: 'The most important layer to watch is:', options: ['the first layer (adhesion)', 'the last layer', 'the middle', 'none'], answerIndex: 0 },
      { question: 'If the first layer will not stick you should:', options: ['stop, re-level/clean the bed, restart', 'keep printing anyway', 'turn up the speed', 'unplug everything'], answerIndex: 0 },
    ],
    resources: [CURA, TC_LEARN],
  },

  // ─── Level III · Precision & Projects ───
  {
    id: '3dp-9', title: 'Precise Design: Measurements & Tolerances', emoji: '📏', difficulty: 4, ageGroup: '13-15', moduleId: 'tdp-m3', moduleTitle: L3, order: 9,
    concept: 'designing to exact sizes with clearance', conceptExplain: 'Real parts need real dimensions. Tinkercad\'s ruler lets you set exact sizes, and "tolerance" (a small gap, ~0.2–0.4 mm) makes parts that fit together — lids, pegs, holes — actually fit after printing.',
    objectives: ['Use the ruler to set exact dimensions', 'Add clearance/tolerance for fitting parts', 'Measure a real object and model it to size'],
    steps: ['Measure a real object with a ruler/calliper.', 'In Tinkercad, use the Ruler to set exact dimensions.', 'For a peg + hole, make the hole ~0.3 mm larger so it fits.', 'Print and test the fit; adjust tolerance if needed.'],
    challenge: 'Design a box with a lid that fits snugly (use tolerance), print it, and test the fit.',
    skills: ['Dimensions', 'Tolerance', 'Measuring'],
    quiz: [
      { question: 'The Ruler tool in Tinkercad lets you:', options: ['set exact dimensions', 'change colour', 'slice', 'add supports'], answerIndex: 0 },
      { question: 'For two parts to fit together you add a small:', options: ['clearance / tolerance gap', 'colour', 'support', 'brim'], answerIndex: 0 },
      { question: 'A lid that is exactly the same size as the box will probably:', options: ['be too tight to fit', 'fit perfectly always', 'be too loose', 'not print'], answerIndex: 0, explanation: 'Printed parts need a small gap (~0.2–0.4 mm) to fit.' },
    ],
    resources: [TC_LEARN],
  },
  {
    id: '3dp-10', title: 'Multi-Part & Print-in-Place Designs', emoji: '🔗', difficulty: 4, ageGroup: '13-15', moduleId: 'tdp-m3', moduleTitle: L3, order: 10,
    concept: 'assemblies and moving parts', conceptExplain: 'Bigger ideas are made of parts that connect (snap-fits, pegs) or even move when printed together (print-in-place hinges) thanks to clearance. This needs careful tolerance and orientation.',
    objectives: ['Design two parts that connect (snap-fit/peg)', 'Use clearance so parts assemble', 'Understand print-in-place moving parts'],
    steps: ['Design two parts that join (e.g. a peg + socket or snap clip).', 'Add the right clearance so they fit after printing.', 'Print both and assemble.', 'Discuss how a print-in-place hinge uses a tiny gap to move.'],
    challenge: 'Design and print a simple 2-part assembly (e.g. a hinged box or a snap-together toy).',
    skills: ['Assemblies', 'Snap-fit', 'Print-in-place'],
    quiz: [
      { question: 'A "print-in-place" moving part works because of:', options: ['a tiny gap (clearance) between parts', 'glue', 'paint', 'supports'], answerIndex: 0 },
      { question: 'A snap-fit:', options: ['clips two parts together', 'melts the plastic', 'slices the model', 'adds infill'], answerIndex: 0 },
      { question: 'Parts that connect need the correct:', options: ['tolerance', 'colour', 'file name', 'bed size'], answerIndex: 0 },
    ],
    resources: [TC_LEARN, CURA],
  },
  {
    id: '3dp-11', title: 'Generative Design with Tinkercad Codeblocks', emoji: '🧮', difficulty: 4, ageGroup: '13-15', moduleId: 'tdp-m3', moduleTitle: L3, order: 11,
    concept: 'designing with code (parametric/generative)', conceptExplain: 'Tinkercad Codeblocks lets you build shapes with block code and loops/variables — so you can generate patterns and parametric models (change a number, change the shape). It blends coding with 3D design.',
    objectives: ['Build a shape with Codeblocks', 'Use a loop to repeat/pattern shapes', 'Change a variable to alter the model'],
    steps: ['Open Tinkercad Codeblocks and create a new design.', 'Add blocks to draw a shape.', 'Use a loop to repeat it into a pattern (e.g. a row/spiral).', 'Change a variable and watch the model update; export to print.'],
    challenge: 'Generate a parametric object (e.g. a patterned coaster or vase) by changing variables, then print it.',
    skills: ['Codeblocks', 'Parametric Design', 'Loops'],
    quiz: [
      { question: 'Tinkercad Codeblocks builds shapes using:', options: ['code blocks', 'a camera', 'a slicer', 'a printer'], answerIndex: 0 },
      { question: 'A loop in Codeblocks is great for:', options: ['repeating shapes into a pattern', 'changing colour', 'slicing', 'levelling the bed'], answerIndex: 0 },
      { question: 'Changing a variable in a parametric design:', options: ['changes the model', 'breaks it', 'does nothing', 'prints it'], answerIndex: 0 },
    ],
    resources: [TC_LEARN],
  },
  {
    id: '3dp-12', title: 'Capstone: Design, Print & Iterate a Useful Object', emoji: '🚀', difficulty: 4, ageGroup: '13-15', moduleId: 'tdp-m3', moduleTitle: L3, order: 12,
    concept: 'the full iterative design process', conceptExplain: 'Real making is iterative: identify a need, design it, print it, test it, find what\'s wrong, and reprint an improved version. Students run the complete pipeline on a useful object of their own.',
    objectives: ['Identify a real need and design a solution', 'Print, test and evaluate it', 'Improve the design and reprint (iterate)'],
    steps: ['Find a real problem to solve (a holder, hook, tool, organiser…).', 'Design it in Tinkercad following the print rules + tolerances.', 'Slice, print and test it in real use.', 'Note what to improve, revise the model, and print version 2.'],
    challenge: 'Deliver a working printed object plus a short "v1 → v2" reflection on what you changed and why.',
    skills: ['Design Process', 'Iteration', 'Problem Solving'],
    quiz: [
      { question: 'Iterative design means:', options: ['test and improve (v1 → v2)', 'print once and stop', 'never test', 'copy someone else'], answerIndex: 0 },
      { question: 'A good capstone object should:', options: ['solve a real need', 'be impossible to print', 'have no base', 'ignore the rules'], answerIndex: 0 },
      { question: 'Before printing your design you should:', options: ['check the print rules (flat base, walls, tolerance)', 'skip checking', 'delete it', 'paint it'], answerIndex: 0 },
    ],
    resources: [TC_LEARN, CURA, TC_EXPORT],
  },
];

export const PRINTING_3D_LESSONS: LessonDetail[] = CONFIGS.map(makeTD);

const sum = (c: TD) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const PRINTING_3D_COURSE: Course = {
  id: '3d-printing-1', slug: 'design-to-print-tinkercad', title: 'From Design to Print with Tinkercad',
  programId: '3d-printing', programSlug: '3d-printing', ageGroup: '10-12', level: 'Beginner',
  description: 'Take an idea all the way to a physical object. Level I: design printable models in Tinkercad (shapes, holes, and the rules that make prints succeed). Level II: export STL, slice in Cura (layer height, infill, supports & orientation) and run your first print safely. Level III: precise design with tolerances, multi-part and print-in-place assemblies, generative design with Codeblocks, and an iterative design-print-improve capstone.',
  objectives: [
    'Explain how FDM 3D printing works and operate a printer safely',
    'Design printable models in Tinkercad (solids, holes, design rules)',
    'Export STL and slice with the right settings (layer height, infill, supports, orientation)',
    'Design precise, fitting parts using measurements and tolerances',
    'Run the full design → print → test → iterate process',
  ],
  duration: '12 lessons × 45–60 minutes', totalHours: 12, lessonCount: 12,
  prerequisites: [], skills: ['Tinkercad', 'Design for Printing', 'Slicing (Cura)', 'Tolerances', 'Printer Operation'],
  modules: [
    { id: 'tdp-m1', title: L1, order: 1, description: 'How 3D printing works, and designing printable models in Tinkercad: shapes, the workplane, holes, and print design rules.', lessons: CONFIGS.filter(c => c.moduleId === 'tdp-m1').map(sum) },
    { id: 'tdp-m2', title: L2, order: 2, description: 'Export STL, slice in Cura (layer height, infill, supports & orientation), and run your first print safely.', lessons: CONFIGS.filter(c => c.moduleId === 'tdp-m2').map(sum) },
    { id: 'tdp-m3', title: L3, order: 3, description: 'Precision with tolerances, multi-part & print-in-place assemblies, generative design with Codeblocks, and an iterate-and-improve capstone.', lessons: CONFIGS.filter(c => c.moduleId === 'tdp-m3').map(sum) },
  ],
};
