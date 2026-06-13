import type { Course, LessonDetail, LessonSection, Module, Difficulty } from '@/types';

// ════════════════════════════════════════════════════════════════
//  LEGO Education SPIKE Prime — Building Instructions (Video).
//  Each lesson embeds a build video from the academy's curated
//  YouTube playlist ("Lego spike prime building instructions").
//  The video is the instruction; the coaching prompts are RoboHolic
//  suggestions. Videos are public YouTube links (no Drive needed).
// ════════════════════════════════════════════════════════════════

interface SpikeBuild {
  n: number; title: string; emoji: string; youtubeId: string; difficulty: Difficulty;
  module: 1 | 2; build: string; mechanism: string; skills: string[]; code: string;
}

// Builds are organised into three LEVELS by difficulty.
function levelOf(d: Difficulty): 1 | 2 | 3 { return d <= 2 ? 1 : d === 3 ? 2 : 3; }
const LEVEL_TITLE: Record<1 | 2 | 3, string> = {
  1: 'Level I · Beginner Builds',
  2: 'Level II · Intermediate Builds',
  3: 'Level III · Advanced Builds',
};

function makeBuild(v: SpikeBuild): LessonDetail {
  const id = `spike-v${v.n}`;
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        `Today's build: ${v.title}. ${v.build}`,
        'Have SPIKE Prime sets ready (1 per pair) and the SPIKE App (or Python) open. Preview the video and note the trickier building steps so you can pause there.',
        `Mechanism focus: ${v.mechanism}`,
        'SUGGESTED CONTENT: the video is the building instruction; the coaching prompts and the programming challenge here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        { step: 1, instruction: `WATCH & SORT (5 min): Play the video "${v.title}" and have students sort the pieces they will need.`, tip: 'Pause the video at the parts list so pairs can gather elements first.' },
        { step: 2, instruction: 'BUILD ALONG (20–30 min): Play the video in short sections; pause after each step so pairs build and check before moving on.', tip: 'Pair-build: one finds parts, one places them, then swap.' },
        { step: 3, instruction: `PROGRAM (10–15 min): Connect the hub and program it. ${v.code}` },
        { step: 4, instruction: 'TEST & ITERATE (5–10 min): Run it, observe, and improve the build or the program.' },
      ],
    },
    {
      type: 'student_steps', title: `Watch & Build: ${v.title} ${v.emoji}`, emoji: '🎯',
      studentTitle: `Watch & Build: ${v.title} ${v.emoji}`,
      content: [
        '📺 Watch the video above with your coach.',
        '🧱 Gather your pieces, then build along — pause the video after each step.',
        '🔌 Connect the SPIKE hub and program it.',
        '▶️ Test it, then try the challenge!',
      ],
      studentContent: ['📺 Watch the video', '🧱 Build it step by step', '🔌 Connect & program the hub', '▶️ Test it!'],
    },
    {
      type: 'challenge', title: 'Program & Extend It', emoji: '🚀',
      content: [
        `Now bring your ${v.title.toLowerCase()} to life: ${v.code}`,
        'Then add your own twist — change a speed, add a sensor reaction, or improve the build to make it stronger or faster.',
      ],
      studentContent: [`🚀 Program your ${v.title.toLowerCase()}`, '✨ Add your own twist (speed, sensor, or a sturdier build)!'],
    },
    {
      type: 'assessment', title: 'Assessment Checklist', emoji: '✅',
      content: [
        `Pair built the "${v.title}" model by following the video.`,
        `Pair can explain the mechanism (${v.mechanism}).`,
        'Pair programmed the model to work.',
        'Pair tested and improved the build or the program.',
      ],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `BUILD: ${v.title}. Mechanism: ${v.mechanism}.`,
        'Building from video builds spatial reasoning and perseverance — let pairs problem-solve before you step in.',
        'Extend able pairs by asking them to add a sensor (force, colour, distance) and a matching program behaviour.',
        'SUGGESTED CONTENT: the video is the official build; prompts and the programming task are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id, slug: id, title: v.title,
    programId: 'spike-prime', programSlug: 'spike-prime', programTitle: 'Spike Prime', programColor: '#F97316',
    courseId: 'spike-builds', courseTitle: 'SPIKE Prime — Building Instructions (Video)',
    moduleId: `spike-m${levelOf(v.difficulty)}`,
    moduleTitle: LEVEL_TITLE[levelOf(v.difficulty)],
    ageGroup: '10-12', level: 'Intermediate', duration: '45–60 minutes', difficulty: v.difficulty,
    skills: v.skills,
    materials: [
      { item: 'LEGO Education SPIKE Prime set', quantity: '1 per pair' },
      { item: 'Device with the SPIKE App (or Python)', quantity: '1 per pair' },
    ],
    objectives: [
      `Build the ${v.title} model by following the video instructions`,
      `Understand the mechanism: ${v.mechanism}`,
      'Program the model and test it',
      'Improve the build or program with an own idea',
    ],
    assessmentChecklist: [`Built "${v.title}".`, 'Explained the mechanism.', 'Programmed and tested it.'],
    sections,
    youtubeId: v.youtubeId,
    resources: [
      { id: `${id}-r1`, title: `${v.title} — Build Video`, type: 'video', audience: 'both', url: `https://www.youtube.com/watch?v=${v.youtubeId}`, description: 'Watch & build along (YouTube)' },
    ],
  };
}

const BUILDS: SpikeBuild[] = [
  { n: 1,  module: 1, title: 'Helicopter', emoji: '🚁', youtubeId: 'EvWXfimxzjE', difficulty: 2, build: 'Build a helicopter with spinning rotor blades driven by a motor.', mechanism: 'gears transferring motor rotation to spin the rotor', skills: ['Building', 'Gears', 'Motors'], code: 'Run the motor to spin the rotor; vary the speed.' },
  { n: 2,  module: 1, title: 'Gyroscope', emoji: '🌀', youtubeId: '8FXHR3tsX6c', difficulty: 3, build: 'Build a spinning gyroscope model.', mechanism: 'high-speed rotation and angular momentum', skills: ['Building', 'Rotation', 'Motors'], code: 'Spin the motor up to speed and observe how it stays balanced.' },
  { n: 3,  module: 2, title: 'Doodler Robot', emoji: '✏️', youtubeId: 'J3AAGIwTeCA', difficulty: 3, build: 'Build a drawing "doodler" robot that scribbles patterns with a pen.', mechanism: 'off-centre (eccentric) rotation creating vibration/movement', skills: ['Building', 'Mechanisms', 'Art'], code: 'Run the motor and watch the pen draw; change speed for different patterns.' },
  { n: 4,  module: 1, title: 'Weightlifting Robot', emoji: '🏋️', youtubeId: 'OOm1JfXjmtQ', difficulty: 3, build: 'Build a robot that lifts a weight like a weightlifter.', mechanism: 'gear reduction for torque (lifting power)', skills: ['Building', 'Gear Ratios', 'Torque'], code: 'Drive the lifting motor up and down; try heavier loads.' },
  { n: 5,  module: 2, title: 'Mini Piano', emoji: '🎹', youtubeId: 'Yixr8XGdbyI', difficulty: 2, build: 'Build a simple mini piano you can play.', mechanism: 'force sensor / buttons triggering sounds', skills: ['Building', 'Sound', 'Inputs'], code: 'Play a different note when each key/sensor is pressed.' },
  { n: 6,  module: 2, title: 'Self-Balancing Line-Following Robot', emoji: '🤸', youtubeId: 'O_1jpoTmlas', difficulty: 4, build: 'Build a self-uprighting, balancing robot that also follows a line.', mechanism: 'gyro feedback for balance + colour sensor for line following', skills: ['Gyro', 'Line Following', 'Control'], code: 'Use the gyro to keep balance and the colour sensor to follow a line (proportional control).' },
  { n: 7,  module: 2, title: 'Scanner & Printer', emoji: '🖨️', youtubeId: 's15KZ88CO4Q', difficulty: 4, build: 'Build a model that scans and "prints" a pattern.', mechanism: 'two-axis (X/Y) motion using two motors', skills: ['Building', 'Coordinated Motors', 'Automation'], code: 'Coordinate two motors to move along rows and mark a pattern.' },
  { n: 8,  module: 1, title: 'Ferris Wheel', emoji: '🎡', youtubeId: 'tSU2qT2x08g', difficulty: 2, build: 'Build a turning Ferris wheel.', mechanism: 'gearing down a motor to turn a large wheel smoothly', skills: ['Building', 'Gears', 'Motors'], code: 'Turn the wheel at a steady, gentle speed; stop at intervals.' },
  { n: 9,  module: 2, title: 'Sorting-by-Size Robot', emoji: '📦', youtubeId: 'f3IgsX--Gt8', difficulty: 4, build: 'Build a machine that sorts objects by their size.', mechanism: 'a distance/ultrasonic measurement driving a sorting gate', skills: ['Sensors', 'Sorting', 'Logic'], code: 'Measure each object and move a gate/arm to sort big vs. small.' },
  { n: 10, module: 2, title: 'Aerospace Penguin', emoji: '🐧', youtubeId: 'Q9BEEpwtsfM', difficulty: 3, build: 'Build a fun animated "aerospace penguin" character.', mechanism: 'linkages turning rotation into a walking/waving motion', skills: ['Building', 'Linkages', 'Animation'], code: 'Animate the penguin with the motor; add lights or sound.' },
  { n: 11, module: 1, title: 'Simple Car (Front-Wheel Steering)', emoji: '🚗', youtubeId: 'Jf5U3wgUEM0', difficulty: 3, build: 'Build a car with working front-wheel steering.', mechanism: 'a steering linkage turning the front wheels', skills: ['Building', 'Steering', 'Motors'], code: 'Drive forward and steer left/right with the steering motor.' },
  { n: 12, module: 1, title: 'Electronic Scale', emoji: '⚖️', youtubeId: 'm97aLy_wadw', difficulty: 3, build: 'Build an electronic scale that weighs objects.', mechanism: 'the force sensor measuring downward push', skills: ['Force Sensor', 'Data', 'Measurement'], code: 'Read the force sensor and show the "weight" on the hub display.' },
  { n: 13, module: 2, title: 'Automatic Door', emoji: '🚪', youtubeId: 'On45NSqluTA', difficulty: 3, build: 'Build an automatic door that opens when someone approaches.', mechanism: 'a distance sensor triggering a motor-driven door', skills: ['Distance Sensor', 'Automation', 'Conditionals'], code: 'When the distance sensor detects someone close, open the door, then close it after a pause.' },
];

export const SPIKE_LESSONS: LessonDetail[] = BUILDS.map(makeBuild);

const sum = (v: SpikeBuild) => ({ id: `spike-v${v.n}`, title: v.title, duration: '45–60 min', difficulty: v.difficulty, skills: v.skills.slice(0, 2), order: v.n });

const MODULES: Module[] = [
  { id: 'spike-m1', title: LEVEL_TITLE[1], order: 1, description: 'Gentle first builds focusing on gears and motors: helicopter, mini piano and Ferris wheel.', lessons: BUILDS.filter(b => levelOf(b.difficulty) === 1).map(sum) },
  { id: 'spike-m2', title: LEVEL_TITLE[2], order: 2, description: 'Step up to mechanisms and single sensors: gyroscope, doodler, weightlifter, aerospace penguin, steering car, electronic scale and automatic door.', lessons: BUILDS.filter(b => levelOf(b.difficulty) === 2).map(sum) },
  { id: 'spike-m3', title: LEVEL_TITLE[3], order: 3, description: 'Advanced, multi-sensor robots and control: self-balancing line follower, scanner/printer and size-sorting robot.', lessons: BUILDS.filter(b => levelOf(b.difficulty) === 3).map(sum) },
];

export const SPIKE_COURSE: Course = {
  id: 'spike-builds', slug: 'spike-building-instructions',
  title: 'SPIKE Prime — Building Instructions (Video)',
  programId: 'spike-prime', programSlug: 'spike-prime', ageGroup: '10-12', level: 'Intermediate',
  description: 'Build 13 LEGO Education SPIKE Prime models by following along with curated video instructions — from a helicopter, Ferris wheel and steering car to a self-balancing line follower, a size-sorting robot and an automatic door. Each build is then programmed and extended. The video is the building instruction; coaching prompts and programming challenges are RoboHolic additions.',
  objectives: [
    'Build SPIKE Prime models by following video instructions',
    'Understand mechanisms: gears, gear ratios, steering, linkages',
    'Use the hub, motors and sensors (force, colour, distance, gyro)',
    'Program each model and extend it with own ideas',
  ],
  duration: '13 builds × 45–60 minutes', totalHours: 12, lessonCount: 13,
  prerequisites: [], skills: ['Building', 'Mechanisms', 'Motors & Sensors', 'Programming', 'Problem Solving'],
  modules: MODULES,
};
