import type { Course, LessonDetail, LessonSection, Module, LessonSummary, Difficulty, AgeGroupId, Level, Resource, LessonInteraction } from '@/types';

// ════════════════════════════════════════════════════════════════
//  VEX VR — the FREE "VR Activities" (education.vex.com/stemlabs/vr/
//  activities): ~90 one-page coding challenges, grouped by Level 1–5.
//  Each runs in the free browser playground at vr.vex.com (no kit).
//  These become extra modules on the VEX VR course. Coaching prompts
//  are RoboHolic SUGGESTED additions; the VEX activity is the source.
// ════════════════════════════════════════════════════════════════

const VR_EMBED: LessonInteraction = { kind: 'embed', title: '🤖 Code it in VEXcode VR', url: 'https://vr.vex.com/', height: 540, note: 'Program the virtual robot here and press Start — it runs in the page. (Or open in a new tab.)' };
const VR_LAUNCH: Resource = { id: 'vexvr-launch', title: 'VEXcode VR — launch the playground', type: 'link', audience: 'both', url: 'https://vr.vex.com/', description: 'Free browser-based virtual robot coding (Blocks & Python)' };
const VR_ACTIVITIES: Resource = { id: 'vexvr-act', title: 'VEXcode VR Activities (free)', type: 'link', audience: 'both', url: 'https://education.vex.com/stemlabs/vr/activities', description: 'All the free one-page coding challenges' };
const VR_TEACH: Resource = { id: 'vexvr-teach', title: 'teachVR — educator resources & Activity solutions', type: 'link', audience: 'coach', url: 'https://teachvr.vex.com/', description: 'Walkthroughs and solutions for the activities' };

type Act = [title: string, desc: string];
interface LevelMeta { n: number; id: string; title: string; level: Level; age: AgeGroupId; difficulty: Difficulty; acts: Act[]; }

const kebab = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');

function skillsFor(text: string): string[] {
  const t = text.toLowerCase();
  const s = new Set<string>(['VEXcode VR']);
  if (/\bloop|repeat\b/.test(t)) s.add('Loops');
  if (/sensor|sensing|eye|gps|gyro|distance|detect/.test(t)) s.add('Sensors');
  if (/coordinate|grid|location|position|navigat/.test(t)) s.add('Coordinates');
  if (/variable|list|array/.test(t)) s.add('Variables');
  if (/algorithm/.test(t)) s.add('Algorithms');
  if (/draw|pen|colou?r|art|spiral|pattern|trace|paint|pixel/.test(t)) s.add('Drawing');
  if (/maze/.test(t)) s.add('Problem Solving');
  if (/score|points|goal|disc|disk|launch|collect/.test(t)) s.add('Logic & Strategy');
  if (/area|perimeter|fraction|angle|math|number|count|polygon/.test(t)) s.add('Math');
  if (s.size < 2) s.add('Coding Challenge');
  return Array.from(s).slice(0, 4);
}

function makeActivity(a: Act, meta: LevelMeta, order: number): LessonDetail {
  const [title, desc] = a;
  const id = `vxa-l${meta.n}-${kebab(title)}`;
  const objectives = [
    `Complete the "${title}" VEXcode VR challenge`,
    "Plan the robot's moves and build the code",
    'Run, test and improve the solution',
  ];
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        desc,
        `Open vr.vex.com (free, browser-based, no kit). From the VR Activities page (Resources), open "${title}" and try it yourself first.`,
        'SUGGESTED FLOW: this is a one-page VEX VR challenge — the steps below are a general RoboHolic approach you can adapt. Activity solutions: teachvr.vex.com.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce the goal — ${desc}`,
        'INVESTIGATE: Open vr.vex.com on the projector, pick the matching Playground, and demo the idea once.',
        'CREATE: Students open the activity and build their solution (steps below).',
        'SHARE & REVIEW: Students run their robot, compare results, and you check the goal was met.',
      ],
    },
    {
      type: 'student_steps', title: `Do It: ${title} 🤖`, emoji: '🎯',
      content: [
        'Open VEXcode VR (vr.vex.com) and choose the Playground shown in the activity, then:',
        `Read the goal: ${desc}`,
        "Plan the robot's moves, then build the blocks.",
        'Press Start to run — watch what happens, then fix and improve.',
      ],
      studentContent: [`🤖 ${title}`, '💻 Open vr.vex.com', `🎯 Goal: ${desc}`, '🧩 Plan, then build your blocks', '▶️ Press Start — then make it better!'],
    },
    {
      type: 'challenge', title: 'Challenge & Extend', emoji: '🚀',
      content: ['Complete the activity goal, then do it again more efficiently — fewer blocks, faster, or a higher score.'],
      studentContent: ['🚀 Finish it, then beat your own result!'],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student built, ran and can explain their VEXcode VR solution.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `ACTIVITY: ${title}. ${desc}`,
        'VEXcode VR has a Blocks and a Python view — advanced students can switch to Python for the same challenge.',
        'Source: VEX VR Activities (free). Solutions: teachvr.vex.com.',
      ],
    },
  ];
  return {
    id, slug: id, title,
    programId: 'vex-vr', programSlug: 'vex-vr', programTitle: 'VEX VR', programColor: '#DC2626',
    courseId: 'vex-vr-cs1', courseTitle: 'VEXcode VR Activities',
    moduleId: meta.id, moduleTitle: meta.title,
    ageGroup: meta.age, level: meta.level, duration: '30–45 minutes', difficulty: meta.difficulty,
    skills: skillsFor(`${title} ${desc}`),
    materials: [
      { item: 'Computer/Chromebook with a web browser (vr.vex.com)', quantity: '1 per student' },
      { item: 'Projector/screen for the coach demo', quantity: '1 per class', isOptional: true },
    ],
    objectives, assessmentChecklist: objectives,
    sections,
    interactions: [VR_EMBED],
    resources: [VR_LAUNCH, VR_ACTIVITIES, VR_TEACH],
  };
}

const LEVELS: LevelMeta[] = [
  { n: 1, id: 'vxa-l1', title: 'Activities · Level 1 (Beginner)', level: 'Beginner', age: '8-9', difficulty: 1, acts: [
    ['Distance Drive', 'Explore the movement controls of the VR Robot'],
    ['Color By Number', 'Solve classic color-by-numbers puzzles using your VR Robot'],
    ['Constellation Creator', 'Code the VR Robot+ to design and draw your own constellations'],
    ['Clean Your Room', 'Code the VR 123 Robot to push pom-poms off the Field'],
    ['Get to the Castle', 'Code the VR 123 Robot to avoid the sleeping dragon and drive villagers to safety'],
    ['Move Around', 'Code the VR 123 Robot to drive around the cubes'],
    ['Ring and Run', 'Code your VR 123 Robot to ring the doorbell and run away'],
    ['Visit the Zoo', 'Go on a Field Trip to the Zoo with your VR 123 Robot'],
    ['Touch Down', 'Code the VR Hero Robot to clear the Landing Site and lift the Rocket Ship'],
    ['To the Lab!', 'Code the VR Hero Robot to deliver samples to the Lab'],
    ['Crater Collection', 'Code the VR Hero Robot to collect samples and rescue the Rover'],
    ['Winter Holiday Coloring Book', 'Code your VR Robot to drive and color in winter-holiday-themed coloring pages'],
    ['Color in Fractions', 'Color in fractions of a circle with your VR Robot'],
    ['Life Cycles', 'Program your robot to show the life cycles of a butterfly, frog, and sunflower'],
    ['Crash Course', 'Program the robot to find the hidden tool, then crash and clear the Castle and Rocks'],
    ['Constellation Mapper', 'Code the VR Robot+ to create known constellations on the Art Canvas+'],
    ['Topographic Map', 'Fill in elevation areas and draw contour lines on a Topographic Map'],
    ['Basketball Drills', 'Program the VR Robot to move forward and reverse to various distances'],
    ['Find Your Age', 'Navigate the Number Grid Map to find your age using the VR Robot'],
  ]},
  { n: 2, id: 'vxa-l2', title: 'Activities · Level 2', level: 'Intermediate', age: '10-12', difficulty: 2, acts: [
    ['Gather Materials', 'Code the VR 123 Robot to sneak past the sleeping dragon and bring supplies to the castle'],
    ['Push the Dragon', 'Push the dragon out of the village with your VR 123 Robot'],
    ['Robot Word Search', 'Drive your VR 123 Robot to letters and sounds on the Field to spell words'],
    ['Robot Count', 'Drive your VR 123 Robot to numbers on the Field in order from lowest to highest'],
    ['Pathfinder', 'Code the VR 123 Robot to drive along the path'],
    ['Treasure Hunt', 'Find the treasure with your VR 123 Robot'],
    ['Neutralizer', 'Locate enemies around the planet and absorb their radiation to neutralize them'],
    ['Mars Math Expedition', 'Score as many points as possible in the Mars Math Expedition'],
    ['Fuel Frenzy', 'Code the VR Hero Robot to deliver fuel cells on the Stage 4 Field'],
    ['Hang Low', 'Navigate around the Hanging Bar and score points with a Low Hang'],
    ['Dispenser Dash', 'Score points by releasing discs from each Dispenser type on the Field'],
    ['In the Zone', 'Explore how to score discs in different Goal Zones to optimize your score'],
    ['Take A Shot', 'Dispense and score discs in all Goal Zones on the Field'],
    ['High Achiever', 'Score by launching disks into both the Low and High Goals'],
    ['Spin and Score', 'Score by launching disks into the low goal and spinning the Roller'],
    ['Take It and Leave It', 'Pick up disks from the Autonomous Line and the Blue Barrier and score them in the Low Goal'],
    ['Roll it Red', 'Use sensors to practice spinning the Roller to red'],
    ['Where to Begin', 'Find the quickest path to score from different starting positions'],
    ['Balancing with Moby', 'Program Moby to move a Mobile Goal and balance on the Platform'],
    ['Score Party', 'Program Moby to score as many points as you can'],
    ['Snow Much Fun', 'Code your VR Robot to use the Pen to add fun features to a snow person'],
    ['Ski-bot', "Code your VR Robot to trace its path as it 'skis' down a mountain"],
    ['Where in the World?', 'Practice mapping continents, states and countries using Art Canvas+'],
    ['On Target', 'Hit the bullseye by drawing angles with your robot'],
    ['Word Search', 'Solve a word search puzzle by highlighting words with your VR Robot'],
    ['Disk Mover', 'Use the electromagnet to pick up and place colored disks into different colored goals'],
    ['Draw a House', 'Program the VR Robot to draw a house with the Pen'],
    ['Draw a Triangle with Gyro', 'Use the Gyro Sensor and the Pen to draw a triangle with the VR Robot'],
    ['Draw Your Initials', 'Program the VR Robot to draw your initials with the Pen'],
    ['Letter Maze', 'Move through the Wall Maze stopping on each lettered location'],
    ['Number Maze', 'Move through the Wall Maze stopping on each numbered location'],
    ['Tracing Triangles', 'Trace triangles and calculate their area and perimeter'],
    ['Tracing Unique Shapes', 'Trace unique shapes and calculate their area and perimeter'],
  ]},
  { n: 3, id: 'vxa-l3', title: 'Activities · Level 3', level: 'Intermediate', age: '10-12', difficulty: 3, acts: [
    ['Coral Reef Cleanup', 'Clean the Mangrove Reef by collecting as much trash as you can before the batteries run down'],
    ['Low Goal, High Goal', 'Collect and score balls in the Low and High Goals on the Field'],
    ['Navigate the Maze', 'Code the VR MazeBot to drive through mazes'],
    ['Storm the Castle', 'Use the VR Robot to knock the Castle and surrounding buildings off the Playground'],
    ['Crash the Castle +', 'Create an algorithm to use the VR Robot+ to clear as much of the Castle as you can, as quickly as you can'],
    ['Load it and Score', 'Intake disks from the Loaders and score them in the Low and High Goals'],
    ['Location, Location, Location', 'Use the GPS sensor and coordinate grid to score from different starting positions'],
    ['Sensing with Moby', "Use Moby's sensors to move Mobile Goals and Rings"],
    ['Clear the Enclosure Walls', 'Clear as much of the castle walls as possible without crashing or falling into water'],
    ['Hidden Message Maze', 'Solve a maze while tracing the path to uncover secret messages'],
    ['Flower Garden', 'Use loops and variables to draw flowers in a VR garden'],
    ['Mondrian Patterns', 'Program your VR Robot to create modern art inspired by Mondrian'],
    ['Color Counting Algorithms', 'Program the VR Robot to detect the color and location of lines'],
    ['Coordinate Numbers', 'Navigate the VR Robot to a specific position using coordinates'],
    ['Counting Lines', 'Track the number of black lines detected using variables'],
    ['Dynamic Wall Maze', 'Create an algorithm to navigate the VR Robot through multiple wall mazes'],
    ['Maximize Perimeter', 'Draw the largest perimeter square possible on the Grid World'],
    ['Robot Dance Party', 'Program the VR Robot to turn, pivot and spin to create a dance move'],
    ['Robot Vacuum', 'Program the VR Robot to move like a robotic vacuum'],
    ['Sensing Colors', 'Program the VR Robot to draw and detect different colored lines'],
    ['Spiral Drawing', 'Create a spiral geometric drawing using the VR Robot'],
    ['Sweep the Castle', 'Create an algorithm to clear every Castle building off the Playground'],
  ]},
  { n: 4, id: 'vxa-l4', title: 'Activities · Level 4', level: 'Advanced', age: '13-15', difficulty: 4, acts: [
    ['Survivalist', 'Keep your mission going for as many days as possible as you neutralize enemies and recover mineral samples'],
    ['Searching for Minerals', 'Create an algorithm to find and use as many minerals as possible during the Rover Rescue'],
    ['Aiming Disks', 'Maximize your score by launching discs into the 4-point Goal Zone'],
    ['VRC GPS Sensor Navigation', 'Use the GPS Sensor and the Pythagorean Theorem to design an algorithm to navigate Disco'],
    ['Pixel World Adventure', 'Follow the instructions to create mystery pixel art using loops'],
    ['Face It', 'Use variables to store information and create different facial expressions'],
    ['Trash Collection', 'Complete ocean-cleaning challenges to collect a specific amount of trash'],
    ['Castle Color Match', 'Program the VR Robot to pick up and place disks around the Castle'],
    ['Crash the Castle', 'Create an algorithm to knock over different Castle layouts in this changing challenge'],
    ['Cross Every Number', 'Program the VR Robot to cross off each number from 1-100'],
    ['Grid Map Spiral', 'Draw a spiral that hits every square on the Grid Map using the Pen'],
    ['Secret Message', 'Use provided coordinates, the VR Robot and the Pen to decode a secret message'],
    ['Tracing Polygons', 'Trace polygons and calculate their area and perimeter'],
  ]},
  { n: 5, id: 'vxa-l5', title: 'Activities · Level 5 (Advanced)', level: 'Advanced', age: '13-15', difficulty: 5, acts: [
    ['Maze Solver', 'Create an algorithm using sensors on the VR MazeBot to solve different mazes'],
    ['Smart Delivery', 'Deliver packages to random locations using variables'],
    ['Disk Color Maze', 'Move through the Disk Maze using the Front Eye Sensor'],
    ['Encoded Message', 'Use sensors and Lists (arrays) to decode messages represented by binary ASCII'],
    ['Hidden Pixel Art', 'Use sensors and 2D Lists (arrays) to discover artwork hidden under a gold roof'],
  ]},
];

export const VEX_VR_ACTIVITY_LESSONS: LessonDetail[] =
  LEVELS.flatMap(meta => meta.acts.map((a, i) => makeActivity(a, meta, i + 1)));

const summarize = (l: LessonDetail, order: number): LessonSummary =>
  ({ id: l.id, title: l.title, duration: '30–45 min', difficulty: l.difficulty, skills: l.skills.slice(0, 2), order });

export const VEX_VR_ACTIVITY_MODULES: Module[] = LEVELS.map((meta, mi) => ({
  id: meta.id, title: meta.title, order: 10 + mi,
  description: `Free standalone VEXcode VR challenges (${meta.acts.length}) — ${meta.level.toLowerCase()} level, run in the browser at vr.vex.com.`,
  lessons: VEX_VR_ACTIVITY_LESSONS.filter(l => l.moduleId === meta.id).map((l, i) => summarize(l, i + 1)),
}));

// Re-export the course type so vex-vr.ts can splice these in.
export type { Course };
