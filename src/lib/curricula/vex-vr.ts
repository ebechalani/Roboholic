import type { Course, LessonDetail, LessonSection, Difficulty, AgeGroupId, Resource, QuizQuestion, LessonInteraction } from '@/types';

// ════════════════════════════════════════════════════════════════
//  VEX VR — "Code a Virtual Robot with VEXcode VR" (free, no hardware)
//  Built on VEX's FREE curriculum: the CS Level 1 — VEXcode VR (Blocks)
//  course (9 units + the Coral Reef Cleanup capstone), coded in the
//  browser at vr.vex.com (Blocks & Python). Every lesson links the
//  official VEX resources and embeds the VR playground. Coaching
//  prompts are RoboHolic SUGGESTED additions.
//  Zero hardware, zero cost — runs on any Chromebook/computer browser.
// ════════════════════════════════════════════════════════════════

const L1 = 'Level I · Drive & Loops (Blocks)';
const L2 = 'Level II · Sensors & Location';
const L3 = 'Level III · Decisions, Algorithms & Capstone';

interface VX {
  id: string; title: string; emoji: string; difficulty: Difficulty; ageGroup: AgeGroupId;
  moduleId: string; moduleTitle: string; order: number;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; challenge: string; skills: string[];
  resources: Resource[]; quiz?: QuizQuestion[]; interactions?: LessonInteraction[];
}

// VEXcode VR playground — code & run a virtual robot right in the page.
const VR_EMBED: LessonInteraction = { kind: 'embed', title: '🤖 Code it in VEXcode VR', url: 'https://vr.vex.com/', height: 540, note: 'Program the virtual robot here and press Start — it runs in the page. (Or open in a new tab.)' };

function makeVX(c: VX): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        'You need: computers/Chromebooks with a web browser. Go to vr.vex.com — VEXcode VR is free, runs in the browser, and needs NO robot or kit.',
        'Open the linked VEX course/activity (Resources) and try it yourself first. Solutions for VR Activities are on teachVR (teachvr.vex.com).',
        'SUGGESTED CONTENT: the linked VEX resources are the source material (free curriculum); the steps and challenge here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Open vr.vex.com on the projector, pick the Playground, and demo the idea once.',
        'CREATE: Students build and run the project on their own browsers (steps below).',
        'SHARE & REVIEW: Students run their robot, share what worked, and you check the objectives.',
      ],
    },
    {
      type: 'student_steps', title: `Do It: ${c.title} ${c.emoji}`, emoji: '🎯',
      content: ['Open VEXcode VR (vr.vex.com), pick the Playground, then follow these steps:', ...c.steps, 'Press Start to run, then Reset to try again.'],
      studentContent: [`🤖 ${c.title}`, '💻 Open vr.vex.com', ...c.steps.map(s => '👉 ' + s), '▶️ Press Start to run your robot!'],
    },
    {
      type: 'challenge', title: 'Challenge & Extend', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student built, ran and can explain their VEXcode VR project.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'VEXcode VR has a Blocks and a Python view — older/advanced students can switch to Python for the same project.',
        'The linked VEX course/activity (Resources) is the primary material; these prompts are RoboHolic suggestions. Activity solutions: teachvr.vex.com.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: 'vex-vr', programSlug: 'vex-vr', programTitle: 'VEX VR', programColor: '#DC2626',
    courseId: 'vex-vr-cs1', courseTitle: 'Code a Virtual Robot with VEXcode VR',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: c.moduleId === 'vxv-m1' ? 'Beginner' : c.moduleId === 'vxv-m2' ? 'Intermediate' : 'Advanced',
    duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [
      { item: 'Computer/Chromebook with a web browser (vr.vex.com)', quantity: '1 per student' },
      { item: 'Projector/screen for the coach demo', quantity: '1 per class', isOptional: true },
    ],
    objectives: c.objectives, assessmentChecklist: c.objectives,
    sections,
    ...(c.quiz ? { quiz: c.quiz } : {}),
    interactions: c.interactions ?? [VR_EMBED],
    resources: c.resources,
  };
}

// ── Shared official VEX (free) links ──────────────────────────────
const VR_LAUNCH: Resource = { id: 'vexvr-launch', title: 'VEXcode VR — launch the playground', type: 'link', audience: 'both', url: 'https://vr.vex.com/', description: 'Free browser-based virtual robot coding (Blocks & Python)' };
const VR_CS_COURSE: Resource = { id: 'vexvr-cs', title: 'VEX CS Level 1 — VEXcode VR (Blocks) course', type: 'link', audience: 'both', url: 'https://education.vex.com/stemlabs/cs/cs-level-1-vexcode-vr-blocks', description: 'The official free course this lesson follows' };
const VR_ACTIVITIES: Resource = { id: 'vexvr-act', title: 'VEXcode VR Activities (free)', type: 'link', audience: 'both', url: 'https://education.vex.com/stemlabs/vr/activities', description: 'One-page coding challenges, by Playground' };
const VR_TEACH: Resource = { id: 'vexvr-teach', title: 'teachVR — educator resources & Activity solutions', type: 'link', audience: 'coach', url: 'https://teachvr.vex.com/', description: 'Walkthroughs, scope & sequence, and solutions' };
const VR_STARTKB: Resource = { id: 'vexvr-kb', title: 'VR Educators Start Here (VEX Library)', type: 'link', audience: 'coach', url: 'https://kb.vex.com/hc/en-us/articles/10237033931028-VR-Educators-Start-Here', description: 'Getting-started guide for teachers' };

const CONFIGS: VX[] = [
  // ─── Level I · Drive & Loops ───
  {
    id: 'vxv-1', title: 'Getting Started with VEXcode VR', emoji: '🤖', difficulty: 1, ageGroup: '8-9', moduleId: 'vxv-m1', moduleTitle: L1, order: 1,
    concept: 'the VEXcode VR playground and the virtual robot', conceptExplain: 'VEXcode VR is a FREE, browser-based platform (vr.vex.com) where students code a virtual robot — no kit, no cost. It has a Blocks view (and a Python view for older students) and several "Playgrounds". This lesson covers the interface, choosing a Playground, and running a first project.',
    objectives: ['Open VEXcode VR and choose a Playground', 'Identify the VR Robot\'s drivetrain, sensors and pen', 'Build, run (Start) and reset a project'],
    steps: ['Go to vr.vex.com and pick a Playground (e.g. the Playground grid).', 'Find the Blocks toolbox and the robot on the field.', 'Drag a "drive for" block under "when started".', 'Press Start to run, then Reset.'],
    challenge: 'Make the robot drive forward and stop on a target tile, then reset and do it again.',
    skills: ['VEXcode VR', 'Interface', 'Run a Project'],
    quiz: [
      { question: 'VEXcode VR runs:', options: ['free in a web browser with a virtual robot (no kit)', 'only on a paid VEX robot', 'on a 3D printer', 'on a phone SIM card'], answerIndex: 0 },
      { question: 'To make the robot act, you:', options: ['drag blocks under "when started" and press Start', 'plug in a USB cable', 'print the field', 'email VEX'], answerIndex: 0 },
      { question: 'VEXcode VR also has a ___ view for older students:', options: ['Python', 'Excel', 'Photoshop', 'C# only'], answerIndex: 0 },
    ],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_STARTKB],
  },
  {
    id: 'vxv-2', title: 'Moving Your Robot', emoji: '🛣️', difficulty: 1, ageGroup: '8-9', moduleId: 'vxv-m1', moduleTitle: L1, order: 2,
    concept: 'drivetrain blocks — drive for distance and turn for degrees', conceptExplain: 'The VR Robot moves with drivetrain blocks: "drive for [distance]" and "turn for [degrees]". Chaining these in order makes the robot follow a path. This is sequencing — the order of the blocks matters.',
    objectives: ['Use "drive for [distance]"', 'Use "turn for [degrees]"', 'Sequence moves to follow a path'],
    steps: ['Add "drive for 200 mm".', 'Add "turn right for 90 degrees".', 'Repeat to trace a path around the grid.', 'Adjust the numbers so it lands where you want.'],
    challenge: 'Drive the robot in a perfect square back to its start.',
    skills: ['Drivetrain', 'Sequencing', 'Movement'],
    resources: [VR_LAUNCH, VR_CS_COURSE],
  },
  {
    id: 'vxv-3', title: 'Repeating Behaviors with Loops', emoji: '🔁', difficulty: 2, ageGroup: '8-9', moduleId: 'vxv-m1', moduleTitle: L1, order: 3,
    concept: 'loops — using a repeat block instead of copying blocks', conceptExplain: 'When the same blocks repeat (like drive-then-turn four times for a square), a "repeat" loop does the job with far fewer blocks. Lowering the pen lets the robot DRAW the shape as it loops — a clear, visual way to see a loop work.',
    objectives: ['Spot repeated blocks', 'Replace them with a "repeat" loop', 'Draw a shape with the pen using a loop'],
    steps: ['Lower the pen.', 'Put "drive for" + "turn for 90°" inside "repeat 4".', 'Run it to draw a square.', 'Change the repeat count and the turn angle to draw other shapes.'],
    challenge: 'Draw a triangle and a hexagon by changing only the loop count and the turn angle.',
    skills: ['Loops', 'Pen Drawing', 'Patterns'],
    quiz: [
      { question: 'A "repeat" loop is used to:', options: ['run the same blocks several times with fewer blocks', 'delete the robot', 'change the wifi', 'print a page'], answerIndex: 0 },
      { question: 'To draw a square with a loop you repeat:', options: ['drive forward + turn 90° four times', 'one drive block', 'a turn only', 'nothing'], answerIndex: 0 },
      { question: 'To draw a shape as it moves, the robot first:', options: ['lowers the pen', 'turns off', 'opens Python', 'removes a wheel'], answerIndex: 0 },
    ],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_ACTIVITIES],
  },

  // ─── Level II · Sensors & Location ───
  {
    id: 'vxv-4', title: 'Navigating a Maze', emoji: '🧩', difficulty: 2, ageGroup: '10-12', moduleId: 'vxv-m2', moduleTitle: L2, order: 4,
    concept: 'sequencing precise movements to solve the Wall Maze', conceptExplain: 'In the Wall Maze playground the robot must reach the exit. With only drive and turn blocks, students plan the path, then sequence exact distances and turns — testing and fixing (debugging) until the robot gets out.',
    objectives: ['Plan a path through the maze', 'Sequence drive/turn blocks accurately', 'Test and debug to reach the exit'],
    steps: ['Open the Wall Maze playground.', 'Trace the path with your finger and note each turn.', 'Write the move sequence block by block.', 'Run, watch where it fails, and fix the distances/turns.'],
    challenge: 'Solve the maze, then solve it again with the fewest blocks possible.',
    skills: ['Sequencing', 'Debugging', 'Problem Solving'],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_ACTIVITIES],
  },
  {
    id: 'vxv-5', title: 'Detecting Walls from a Distance', emoji: '📡', difficulty: 3, ageGroup: '10-12', moduleId: 'vxv-m2', moduleTitle: L2, order: 5,
    concept: 'the distance ("front eye") sensor with loops and waits', conceptExplain: 'Fixed distances break when the maze changes. The distance sensor lets the robot "see" a wall ahead and react. With "wait until distance < X" or a loop that checks the sensor, the robot drives until it nears a wall, then turns — a smarter, reusable solution.',
    objectives: ['Read the distance sensor', 'Drive until a wall is detected', 'Use "wait until" / a condition with a loop'],
    steps: ['Add "drive" then "wait until distance < 100 mm".', 'Stop, then "turn" to a clear direction.', 'Wrap it in a loop so it repeats at each wall.', 'Test it in the maze.'],
    challenge: 'Get through the maze using the sensor only — no fixed drive distances.',
    skills: ['Sensors', 'Conditions', 'Loops'],
    quiz: [
      { question: 'The distance sensor lets the robot:', options: ['detect how far away a wall is', 'change colour', 'fly', 'print'], answerIndex: 0 },
      { question: 'Using the sensor instead of fixed distances makes the code:', options: ['work even if the maze changes', 'slower to type only', 'break', 'turn off'], answerIndex: 0 },
      { question: '"wait until distance < 100 mm" makes the robot:', options: ['keep going until it is close to a wall', 'stop immediately', 'reverse forever', 'delete blocks'], answerIndex: 0 },
    ],
    resources: [VR_LAUNCH, VR_CS_COURSE],
  },
  {
    id: 'vxv-6', title: 'Knowing Your Location', emoji: '📍', difficulty: 3, ageGroup: '10-12', moduleId: 'vxv-m2', moduleTitle: L2, order: 6,
    concept: 'the Location sensor and (x, y) coordinates on the grid', conceptExplain: 'On the Grid / Numbered Grid playground the robot knows its position as (x, y) coordinates. Reading the Location sensor lets students drive to exact points and check where the robot is — connecting coding to the coordinate plane in maths.',
    objectives: ['Read the robot\'s location (x, y)', 'Drive to a target coordinate', 'Navigate several grid points in order'],
    steps: ['Open the (Numbered) Grid Map playground.', 'Print or watch the robot\'s X and Y position.', 'Drive to a target like (3, 2) and check it.', 'Visit several points in sequence.'],
    challenge: 'Visit three given coordinates in order and finish back at the start.',
    skills: ['Coordinates', 'Location Sensor', 'Navigation'],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_ACTIVITIES],
  },

  // ─── Level III · Decisions, Algorithms & Capstone ───
  {
    id: 'vxv-7', title: 'Making Decisions with Colors', emoji: '🎨', difficulty: 3, ageGroup: '13-15', moduleId: 'vxv-m3', moduleTitle: L3, order: 7,
    concept: 'the down ("eye") color sensor with if / else conditionals', conceptExplain: 'The down-facing eye reads the color under the robot. With "if / else" the robot makes a decision — do one thing on red, another on blue. Conditionals are how programs react to what they sense.',
    objectives: ['Read a color with the down eye', 'Use an if / else conditional', 'Make the robot act differently per color'],
    steps: ['Drive onto colored areas of the playground.', 'Add "if color is red → turn, else → drive on".', 'Test on different colors.', 'Add more branches for more colors.'],
    challenge: 'Make the robot follow or sort by color using conditionals (e.g. turn on red, continue on green).',
    skills: ['Color Sensor', 'Conditionals', 'Decisions'],
    quiz: [
      { question: 'An "if / else" block lets the robot:', options: ['choose between two actions based on a condition', 'drive only straight', 'change owner', 'print a map'], answerIndex: 0 },
      { question: 'The down "eye" sensor reads:', options: ['the color under the robot', 'the wifi password', 'the time', 'the battery brand'], answerIndex: 0 },
      { question: 'Conditionals let a program:', options: ['react to what it senses', 'never change', 'use fewer colors', 'turn off sensors'], answerIndex: 0 },
    ],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_ACTIVITIES],
  },
  {
    id: 'vxv-8', title: 'Moving Disks with Loops', emoji: '🧲', difficulty: 3, ageGroup: '13-15', moduleId: 'vxv-m3', moduleTitle: L3, order: 8,
    concept: 'combining loops with pick-up / drop actions (Disk Mover)', conceptExplain: 'In the Disk Mover playground the robot uses its electromagnet to pick up and drop disks. Combining a loop with drive + pickup + drop lets the robot clear many disks with a short, repeatable program.',
    objectives: ['Use the magnet to pick up and drop', 'Loop the move-pick-drop sequence', 'Clear multiple disks efficiently'],
    steps: ['Drive to a disk and turn the electromagnet on (pick up).', 'Carry it to the target and turn the magnet off (drop).', 'Wrap the sequence in a loop.', 'Tune it to clear every disk.'],
    challenge: 'Move all the disks to the goal using a single loop.',
    skills: ['Loops', 'Electromagnet', 'Automation'],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_ACTIVITIES],
  },
  {
    id: 'vxv-9', title: 'Developing Algorithms', emoji: '🧠', difficulty: 4, ageGroup: '13-15', moduleId: 'vxv-m3', moduleTitle: L3, order: 9,
    concept: 'algorithms — combining sequence, loops and conditionals', conceptExplain: 'An algorithm is a clear set of steps to solve a problem. Here students combine everything — sequence, loops and conditionals (and sensors) — to make the robot complete a multi-step task reliably, then test and refine it (debugging and optimizing).',
    objectives: ['Break a task into clear steps', 'Combine loops and conditionals into an algorithm', 'Test, debug and refine it'],
    steps: ['Pick a playground task and write the steps in words first.', 'Build the algorithm with loops + conditionals + sensors.', 'Run it, find where it fails, and fix it.', 'Simplify it to the fewest reliable blocks.'],
    challenge: 'Write an algorithm that completes a multi-step task reliably three times in a row.',
    skills: ['Algorithms', 'Debugging', 'Computational Thinking'],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_TEACH],
  },
  {
    id: 'vxv-10', title: 'Capstone: Coral Reef Cleanup', emoji: '🐠', difficulty: 4, ageGroup: '13-15', moduleId: 'vxv-m3', moduleTitle: L3, order: 10,
    concept: 'applying everything to a real challenge under a constraint', conceptExplain: 'The capstone uses the Coral Reef playground: clean the reef by collecting as much trash as possible BEFORE the solar battery runs down. Students plan an efficient route and combine loops, sensors and conditionals — a real engineering problem with a constraint to optimise against.',
    objectives: ['Plan an efficient collection route', 'Combine loops, sensors and conditionals', 'Maximise trash collected before the battery runs out'],
    steps: ['Open the Coral Reef Cleanup playground and study the layout.', 'Plan the shortest route to the most trash.', 'Code collection with loops + sensors.', 'Run it, note the score, and optimise the route/battery use.'],
    challenge: 'Collect as much trash as you can before the battery dies — then beat your own best score.',
    skills: ['Project', 'Optimisation', 'Sensors & Loops'],
    resources: [VR_LAUNCH, VR_CS_COURSE, VR_ACTIVITIES, VR_TEACH],
  },
];

export const VEX_VR_LESSONS: LessonDetail[] = CONFIGS.map(makeVX);

const sum = (c: VX) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const VEX_VR_COURSE: Course = {
  id: 'vex-vr-cs1', slug: 'vexcode-vr-cs-level-1', title: 'Code a Virtual Robot with VEXcode VR',
  programId: 'vex-vr', programSlug: 'vex-vr', ageGroup: '10-12', level: 'Beginner',
  description: 'Learn to code with a virtual robot using VEX\'s FREE VEXcode VR (vr.vex.com) — no robot, no kit, no cost. Following VEX\'s free CS Level 1 (Blocks) course: Level I builds driving and loops (and pen-drawing); Level II adds the distance and location sensors and grid coordinates; Level III covers color decisions (if/else), moving disks with loops, designing algorithms, and a Coral Reef Cleanup capstone. Blocks throughout, with a Python view for older students.',
  objectives: [
    'Run and build projects in VEXcode VR (Blocks, with optional Python)',
    'Drive and turn the robot and use loops to repeat and draw',
    'Use the distance and location sensors to navigate',
    'Make decisions with the color sensor and if/else conditionals',
    'Combine loops, sensors and conditionals into algorithms and a capstone project',
  ],
  duration: '10 lessons × 45–60 minutes', totalHours: 10, lessonCount: 10,
  prerequisites: [], skills: ['Block Coding', 'Loops', 'Sensors', 'Conditionals', 'Algorithms', 'Python (intro)'],
  modules: [
    { id: 'vxv-m1', title: L1, order: 1, description: 'Get started in VEXcode VR, drive and turn the robot, and use loops to repeat moves and draw shapes.', lessons: CONFIGS.filter(c => c.moduleId === 'vxv-m1').map(sum) },
    { id: 'vxv-m2', title: L2, order: 2, description: 'Solve mazes, then use the distance and location sensors and grid coordinates to navigate.', lessons: CONFIGS.filter(c => c.moduleId === 'vxv-m2').map(sum) },
    { id: 'vxv-m3', title: L3, order: 3, description: 'Make decisions with the color sensor, move disks with loops, develop algorithms, and finish with the Coral Reef Cleanup capstone.', lessons: CONFIGS.filter(c => c.moduleId === 'vxv-m3').map(sum) },
  ],
};
