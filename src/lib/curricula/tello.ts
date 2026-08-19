import type { Course, LessonDetail, LessonSection, Module, Resource, Difficulty, AgeGroupId, QuizQuestion } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Drones — "Code & Fly with Tello EDU" (3 levels, 12 lessons)
//  Built around the Ryze/DJI Tello EDU and the official programming
//  paths: DroneBlocks (block coding) → Python with the Tello SDK /
//  DJITelloPy → mission pads & swarm. Lessons link the official
//  DroneBlocks courses and DJITelloPy docs; coaching prompts and the
//  example code are RoboHolic SUGGESTED additions.
// ════════════════════════════════════════════════════════════════

const L1 = 'Level I · First Flights (DroneBlocks)';
const L2 = 'Level II · Programmed Flight (DroneBlocks)';
const L3 = 'Level III · Python & Swarm (Advanced)';
const L4 = 'Level IV · The Official DJI SDK (Tello-Python)';

interface TL {
  id: string; title: string; emoji: string; difficulty: Difficulty; ageGroup: AgeGroupId;
  moduleId: string; moduleTitle: string; order: number;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; code?: string[]; challenge: string; skills: string[];
  materials: { item: string; quantity?: string; isOptional?: boolean }[];
  resources: Resource[]; quiz?: QuizQuestion[];
}

function makeTL(c: TL): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        `You need: ${c.materials.map(m => m.item).join(', ')}.`,
        'SAFETY FIRST: fly in a clear, open space, keep fingers away from props, fit the prop guards, and always have a "land/emergency stop" ready. Charge batteries and check the props before every session.',
        'SUGGESTED CONTENT: the linked DroneBlocks course / DJITelloPy docs are the source material; the prompts, steps and example code here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Skim the official resource and demo the idea once (run the program with the drone on the ground first / props off if just reading values).',
        'CREATE: Students build the program following the steps; test in a clear flight zone one team at a time.',
        'REVIEW: Land, discuss what happened, and check the objectives.',
      ],
    },
    {
      type: 'activity', title: `Fly It: ${c.title}`, emoji: '🚁',
      content: ['Follow these steps (and the official guide in Resources):', ...c.steps, ...(c.code ? ['', 'Example code:', ...c.code] : [])],
      studentContent: [`🎯 ${c.title}`, ...c.steps.map(s => '👉 ' + s), ...(c.code ? ['💻 Example:', ...c.code.map(s => '  ' + s)] : [])],
    },
    {
      type: 'challenge', title: 'Flight Challenge', emoji: '🏁',
      content: [c.challenge],
      studentContent: [`🏁 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student flew the program safely and landed under control.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'SAFETY: one drone flying at a time per zone; spotters watch; net/clear ceiling; land on low battery (<20%). Mission pads need a bright room.',
        'The official resource (Resources) is the primary material; these prompts and code are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: 'drones', programSlug: 'drones', programTitle: 'Drones', programColor: '#475569',
    courseId: 'tello-edu-1', courseTitle: 'Code & Fly with Tello EDU',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: c.moduleId === 'tl-m1' ? 'Beginner' : c.moduleId === 'tl-m2' ? 'Intermediate' : 'Advanced',
    duration: '45–60 minutes', difficulty: c.difficulty, skills: c.skills, materials: c.materials,
    objectives: c.objectives, assessmentChecklist: c.objectives,
    sections,
    ...(c.quiz ? { quiz: c.quiz } : {}),
    resources: c.resources,
  };
}

// Shared official links
const DB_INTRO: Resource = { id: 'db-intro', title: 'DroneBlocks: Intro to Tello EDU (block coding)', type: 'link', audience: 'both', url: 'https://learn.droneblocks.io/p/introduction-to-tello-edu-drone-programming-with-droneblocks', description: 'Official DroneBlocks beginner course' };
const DB_PY: Resource = { id: 'db-py', title: 'DroneBlocks: Tello Programming with Python', type: 'link', audience: 'both', url: 'https://learn.droneblocks.io/p/tello-drone-programming-with-python', description: 'Official Python course' };
const TELLO_PY_DOCS: Resource = { id: 'djitellopy', title: 'DJITelloPy — Python library & API docs', type: 'link', audience: 'both', url: 'https://djitellopy.readthedocs.io/en/latest/tello/', description: 'Official-SDK Python interface (pip install djitellopy)' };
const RYZE: Resource = { id: 'ryze-edu', title: 'Ryze Tello EDU — official product page', type: 'link', audience: 'coach', url: 'https://www.ryzerobotics.com/tello-edu', description: 'Specs, app and SDK downloads' };
// Official DJI Tello-Python sample repository (SDK command set, missions, video, pose control)
const GH_REPO: Resource = { id: 'gh-tello-py', title: 'DJI Tello-Python — official sample repo (GitHub)', type: 'link', audience: 'both', url: 'https://github.com/dji-sdk/Tello-Python', description: 'Official DJI samples: Single_Tello_Test, Tello_Video, pose recognition, tello_state.py' };
const GH_SINGLE: Resource = { id: 'gh-single-test', title: 'Single_Tello_Test — command.txt mission runner', type: 'link', audience: 'both', url: 'https://github.com/dji-sdk/Tello-Python/tree/master/Single_Tello_Test', description: 'Write a txt script of SDK commands and Tello executes them' };
const GH_VIDEO: Resource = { id: 'gh-tello-video', title: 'Tello_Video — live video stream + control panel', type: 'link', audience: 'coach', url: 'https://github.com/dji-sdk/Tello-Python/tree/master/Tello_Video', description: 'H.264 video decoding + GUI; one-click install scripts for Win/mac/Linux' };
const GH_POSE: Resource = { id: 'gh-tello-pose', title: 'Tello_Video_With_Pose_Recognition — fly with your body', type: 'link', audience: 'coach', url: 'https://github.com/dji-sdk/Tello-Python/tree/master/Tello_Video_With_Pose_Recognition', description: 'Official demo: poses mapped to flight commands' };
const GH_STATE: Resource = { id: 'gh-tello-state', title: 'tello_state.py — read the drone\'s live state', type: 'link', audience: 'both', url: 'https://github.com/dji-sdk/Tello-Python/blob/master/tello_state.py', description: 'Official utility that prints Tello telemetry' };
const GH_MULTI: Resource = { id: 'gh-multi-tello', title: 'Multi-Tello-Formation — official swarm repo', type: 'link', audience: 'coach', url: 'https://github.com/TelloSDK/Multi-Tello-Formation', description: 'DJI-referenced repo for multi-drone formations' };

const CONFIGS: TL[] = [
  // ─── Level I · First Flights (DroneBlocks) ───
  {
    id: 'tl-1', title: 'Meet the Tello EDU & Flight Safety', emoji: '🚁', difficulty: 2, ageGroup: '10-12', moduleId: 'tl-m1', moduleTitle: L1, order: 1,
    concept: 'the drone, how it flies, and safe-flight rules', conceptExplain: 'The Tello EDU is a small programmable quadcopter. Four propellers spin to give lift and control pitch, roll and yaw. Before any coding, students learn the parts, fit prop guards, and agree the safety rules.',
    objectives: ['Name the drone\'s main parts (props, motors, camera, battery, sensors)', 'State the class flight-safety rules', 'Connect the Tello EDU to a device over Wi-Fi'],
    steps: ['Identify the parts: 4 props/motors, downward vision sensor, camera, battery, status LED.', 'Fit the prop guards and check the props are tight and undamaged.', 'Power on; connect your device to the TELLO-XXXX Wi-Fi network.', 'Agree the safety rules: clear zone, props away from fingers, one drone flying at a time, land on low battery.'],
    challenge: 'Write your team\'s 5 flight-safety rules and a pre-flight checklist, then do a battery + props check.',
    skills: ['Drone Basics', 'Safety', 'Setup'],
    quiz: [
      { question: 'Before flying you should always:', options: ['clear the area, fit prop guards, check the battery', 'turn off the lights', 'remove the propellers', 'fly near people'], answerIndex: 0 },
      { question: 'How many propellers does the Tello (a quadcopter) have?', options: ['4', '2', '6', '1'], answerIndex: 0 },
      { question: 'You connect a device to the Tello over:', options: ['its Wi-Fi network', 'a USB cable', 'Bluetooth headset', 'HDMI'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU drone + charged battery + prop guards', quantity: '1 per group' }, { item: 'Tablet/phone or computer', quantity: '1 per group' }],
    resources: [DB_INTRO, RYZE],
  },
  {
    id: 'tl-2', title: 'First Flight: Take Off, Hover, Land', emoji: '🛫', difficulty: 2, ageGroup: '10-12', moduleId: 'tl-m1', moduleTitle: L1, order: 2,
    concept: 'autonomous take-off and landing with DroneBlocks', conceptExplain: 'DroneBlocks is a free block-coding app that sends commands to the Tello over Wi-Fi. The first program is the safest: take off, hover, then land — fully autonomous, no manual sticks.',
    objectives: ['Connect DroneBlocks to the Tello EDU', 'Use the takeoff, wait and land blocks', 'Run a program and watch it fly autonomously'],
    steps: ['Open DroneBlocks and connect to the Tello.', 'Drag: takeoff → wait 3 seconds → land.', 'Clear the flight zone; everyone stands back.', 'Run it and observe the autonomous flight.'],
    challenge: 'Make the drone take off, hover for 5 seconds, then land gently — and time how long the whole flight takes.',
    skills: ['DroneBlocks', 'Autonomous Flight', 'Sequencing'],
    quiz: [
      { question: 'DroneBlocks lets you fly the Tello using:', options: ['block code (no manual sticks)', 'a game controller only', 'voice only', 'a keyboard mouse'], answerIndex: 0 },
      { question: 'The safest first program is:', options: ['takeoff → wait → land', 'flip → flip → flip', 'full speed forward', 'spin forever'], answerIndex: 0 },
      { question: '"Autonomous" flight means the drone:', options: ['follows its program by itself', 'is flown by hand', 'never moves', 'needs two pilots'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Device with DroneBlocks app', quantity: '1 per group' }],
    resources: [DB_INTRO],
  },
  {
    id: 'tl-3', title: 'Flying in Directions', emoji: '🧭', difficulty: 2, ageGroup: '10-12', moduleId: 'tl-m1', moduleTitle: L1, order: 3,
    concept: 'moving a set distance and rotating', conceptExplain: 'Movement blocks fly the drone an exact distance (e.g. forward 50 cm) in any direction — forward/back, left/right, up/down — and rotate it clockwise/counter-clockwise by a set angle.',
    objectives: ['Use directional move blocks with set distances', 'Rotate the drone by a set angle', 'Chain moves into a path'],
    steps: ['Take off.', 'Add: forward 50 cm → rotate clockwise 90° → forward 50 cm.', 'Land.', 'Measure where it ended up vs. where you expected.'],
    challenge: 'Fly an "L" shape and return to the start point, landing within 30 cm of take-off.',
    skills: ['Movement', 'Distance & Angle', 'Planning'],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Device with DroneBlocks; tape measure', quantity: '1 per group' }],
    resources: [DB_INTRO],
  },
  {
    id: 'tl-4', title: 'Flight Patterns with Loops', emoji: '🔁', difficulty: 3, ageGroup: '10-12', moduleId: 'tl-m1', moduleTitle: L1, order: 4,
    concept: 'using loops to fly shapes', conceptExplain: 'A square is "forward then turn 90°" repeated 4 times. Loops let the drone fly polygons with far less code — and changing the repeat count/angle changes the shape.',
    objectives: ['Use a repeat loop for a flight pattern', 'Fly a square and another polygon', 'Explain why loops are efficient'],
    steps: ['Take off.', 'Repeat 4 times: { forward 50 cm → rotate clockwise 90° }.', 'Land.', 'Now change it to a triangle (repeat 3, turn 120°).'],
    challenge: 'Fly a pentagon (or hexagon) by working out the correct turn angle (360 ÷ number of sides).',
    skills: ['Loops', 'Geometry', 'Patterns'],
    quiz: [
      { question: 'To fly a square with a loop you repeat "forward + turn 90°":', options: ['4 times', '1 time', 'forever', '360 times'], answerIndex: 0 },
      { question: 'For a regular polygon the turn angle is:', options: ['360 ÷ number of sides', 'always 90°', 'always 45°', 'the number of sides'], answerIndex: 0, explanation: 'Triangle = 360/3 = 120°, pentagon = 72°, etc.' },
      { question: 'Loops make a flight program:', options: ['shorter and easier to change', 'longer', 'impossible', 'louder'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Device with DroneBlocks', quantity: '1 per group' }],
    resources: [DB_INTRO],
  },

  // ─── Level II · Programmed Flight ───
  {
    id: 'tl-5', title: 'Flips, Curves & Speed', emoji: '🤸', difficulty: 3, ageGroup: '13-15', moduleId: 'tl-m2', moduleTitle: L2, order: 5,
    concept: 'acrobatics and smooth curved flight', conceptExplain: 'The Tello can flip in four directions, fly smooth curves between two points, and change its speed. These make richer, more controlled flight routines (always with enough battery and clear space).',
    objectives: ['Use the flip block (check battery > 50%)', 'Fly a curve between two points', 'Set the flight speed'],
    steps: ['Take off and set a sensible speed.', 'Fly forward, then flip (forward/back/left/right).', 'Add a curve block between two coordinates.', 'Land and review the routine.'],
    challenge: 'Choreograph a 20-second flight "routine" combining a curve, a flip and a speed change.',
    skills: ['Acrobatics', 'Curves', 'Control'],
    materials: [{ item: 'Tello EDU + prop guards (battery >50%)', quantity: '1 per group' }, { item: 'Device with DroneBlocks', quantity: '1 per group' }],
    resources: [DB_INTRO],
  },
  {
    id: 'tl-6', title: 'Variables & Custom Flight Paths', emoji: '🔢', difficulty: 3, ageGroup: '13-15', moduleId: 'tl-m2', moduleTitle: L2, order: 6,
    concept: 'using variables to parameterise a flight', conceptExplain: 'Store a distance or angle in a variable, then reuse it across the program. Changing one variable changes the whole flight path — the idea behind flexible, reusable code.',
    objectives: ['Create and use a variable for distance/angle', 'Reuse the variable across multiple moves', 'Change the path by changing one value'],
    steps: ['Create a variable "side = 60".', 'Fly a square using "side" for every forward move.', 'Run it, then change "side" to 100 and re-run.', 'Observe how one change scales the whole pattern.'],
    challenge: 'Make a "spiral" where the side length grows each loop using a variable that increases.',
    skills: ['Variables', 'Reusability', 'Patterns'],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Device with DroneBlocks', quantity: '1 per group' }],
    resources: [DB_INTRO, DB_PY],
  },
  {
    id: 'tl-7', title: 'Mission Pads: Positioning & Navigation', emoji: '🎯', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m2', moduleTitle: L2, order: 7,
    concept: 'using mission pads for precise positioning', conceptExplain: 'Mission pads are printed cards (IDs 1–8) the Tello EDU\'s downward camera can detect. The drone can find a pad and fly to exact x/y/z coordinates relative to it — enabling repeatable, precise navigation (needs a bright room).',
    objectives: ['Enable mission-pad detection', 'Detect a pad and read its ID', 'Fly to a coordinate relative to a pad'],
    steps: ['Lay out mission pads in a bright area.', 'Enable mission-pad detection in DroneBlocks.', 'Take off over a pad and read the detected pad ID.', 'Fly to a set x/y/z position relative to the pad, then land.'],
    challenge: 'Fly a route that hops from pad 1 to pad 2 to pad 3, landing accurately on the last pad.',
    skills: ['Mission Pads', 'Navigation', 'Positioning'],
    quiz: [
      { question: 'Mission pads let the Tello EDU:', options: ['know its position and fly to exact coordinates', 'charge in the air', 'fly faster', 'play music'], answerIndex: 0 },
      { question: 'The Tello detects mission pads with its:', options: ['downward camera', 'propellers', 'Wi-Fi antenna', 'battery'], answerIndex: 0 },
      { question: 'Mission pads need:', options: ['a bright, well-lit area', 'total darkness', 'water', 'no battery'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU + mission pads (1–8)', quantity: '1 set per group' }, { item: 'Bright, well-lit flight area', isOptional: false }],
    resources: [DB_INTRO, RYZE],
  },
  {
    id: 'tl-8', title: 'The Camera: Photos, Video & FPV', emoji: '📷', difficulty: 3, ageGroup: '13-15', moduleId: 'tl-m2', moduleTitle: L2, order: 8,
    concept: 'using the onboard camera', conceptExplain: 'The Tello has a 5 MP camera with a live 720p video stream (FPV — first-person view). Students view the stream, capture photos/video during a flight, and think about aerial-imaging uses (mapping, inspection, film).',
    objectives: ['View the live FPV video stream', 'Capture a photo/video during flight', 'Describe real uses of drone cameras'],
    steps: ['Open the camera/FPV view in the app.', 'Plan a short flight that frames a target.', 'Fly it and capture a photo or short video.', 'Review the footage and discuss aerial-imaging uses.'],
    challenge: 'Plan and fly an "establishing shot" of your classroom or field and capture a smooth clip.',
    skills: ['Camera', 'FPV', 'Aerial Imaging'],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Device with the Tello app', quantity: '1 per group' }],
    resources: [RYZE, DB_INTRO],
  },

  // ─── Level III · Python & Swarm ───
  {
    id: 'tl-9', title: 'Python with DJITelloPy: Connect, Take Off, Land', emoji: '🐍', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m3', moduleTitle: L3, order: 9,
    concept: 'controlling the Tello from Python', conceptExplain: 'DJITelloPy is a Python library built on the official Tello SDK. After "pip install djitellopy", a few lines of Python connect to the drone and fly it — the same commands DroneBlocks sends, now in text code.',
    objectives: ['Set up Python + djitellopy', 'Connect to the Tello from Python', 'Take off and land from code'],
    steps: ['Install: pip install djitellopy.', 'Connect your computer to the Tello Wi-Fi.', 'Write and run the example below.', 'Confirm it takes off and lands safely.'],
    code: ['from djitellopy import Tello', 'tello = Tello()', 'tello.connect()', 'print(tello.get_battery())', 'tello.takeoff()', 'tello.land()'],
    challenge: 'Add a check that refuses to take off if the battery is below 30% (print a warning instead).',
    skills: ['Python', 'DJITelloPy', 'SDK'],
    quiz: [
      { question: 'DJITelloPy is a:', options: ['Python library to control the Tello', 'block editor', 'video game', 'battery'], answerIndex: 0 },
      { question: 'You install it with:', options: ['pip install djitellopy', 'download a .hex', 'a USB stick', 'the app store'], answerIndex: 0 },
      { question: 'In code, tello.takeoff() then tello.land() will:', options: ['take off then land safely', 'do nothing', 'spin forever', 'charge the drone'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Computer with Python + djitellopy', quantity: '1 per group' }],
    resources: [DB_PY, TELLO_PY_DOCS],
  },
  {
    id: 'tl-10', title: 'Python Flight Sequences & Sensor Data', emoji: '📈', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m3', moduleTitle: L3, order: 10,
    concept: 'movement commands and reading the drone\'s sensors', conceptExplain: 'In Python you can chain movement methods (move_forward, rotate_clockwise…) and read live telemetry — battery, height, temperature, speed and attitude — to make data-driven flights.',
    objectives: ['Fly a sequence with Python movement methods', 'Read sensor/telemetry values', 'Use a loop to fly a pattern'],
    steps: ['Take off in code.', 'Use a for-loop to fly a square (move_forward + rotate_clockwise).', 'Print get_height(), get_battery(), get_temperature().', 'Land.'],
    code: ['for i in range(4):', '    tello.move_forward(50)', '    tello.rotate_clockwise(90)', 'print(tello.get_height(), tello.get_battery())'],
    challenge: 'Log height and battery to a list every second during a flight, then print a small report.',
    skills: ['Python', 'Loops', 'Telemetry'],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Computer with Python + djitellopy', quantity: '1 per group' }],
    resources: [DB_PY, TELLO_PY_DOCS],
  },
  {
    id: 'tl-11', title: 'Mission Pad Navigation in Python', emoji: '🗺️', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m3', moduleTitle: L3, order: 11,
    concept: 'precise pad-based navigation in code', conceptExplain: 'With mission pads enabled in Python, the drone can read the current pad and use go_xyz_speed_mid() to fly to exact coordinates relative to a pad — repeatable autonomous navigation.',
    objectives: ['Enable mission pads in Python', 'Read the current pad id', 'Fly to a coordinate relative to a pad'],
    steps: ['enable_mission_pads() and set detection direction.', 'Take off over a pad.', 'Read get_mission_pad_id().', 'Use go_xyz_speed_mid(x, y, z, speed, pad) to navigate, then land.'],
    code: ['tello.enable_mission_pads()', 'tello.set_mission_pad_detection_direction(0)', 'tello.takeoff()', 'tello.go_xyz_speed_mid(0, 0, 100, 50, 1)', 'tello.land()'],
    challenge: 'Program an autonomous route across three pads and measure how repeatable the landing is.',
    skills: ['Mission Pads', 'Python', 'Autonomous Navigation'],
    materials: [{ item: 'Tello EDU + mission pads', quantity: '1 set per group' }, { item: 'Computer with Python + djitellopy; bright room', quantity: '1 per group' }],
    resources: [TELLO_PY_DOCS, DB_PY],
  },
  {
    id: 'tl-12', title: 'Swarm: Fly Multiple Tello EDU Together', emoji: '🐝', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m3', moduleTitle: L3, order: 12,
    concept: 'coordinating a swarm of drones', conceptExplain: 'The Tello EDU supports swarms — several drones flying coordinated routines. DJITelloPy\'s TelloSwarm connects to many drones (over a router) and runs commands in parallel or per-drone — an exciting capstone.',
    objectives: ['Connect to multiple Tello EDU as a swarm', 'Run a command on all drones in parallel', 'Give each drone its own move'],
    steps: ['Put the drones into station mode on one router (per the docs).', 'Create a TelloSwarm from the drone IPs.', 'swarm.takeoff() — all take off together.', 'Use parallel/sequential blocks to choreograph, then swarm.land().'],
    code: ['from djitellopy import TelloSwarm', 'swarm = TelloSwarm.fromIps(["192.168.0.101", "192.168.0.102"])', 'swarm.connect()', 'swarm.takeoff()', 'swarm.move_up(80)', 'swarm.land()'],
    challenge: 'Choreograph a 2–3 drone synchronised routine (e.g. all rise, then each turns a different way) and perform it safely.',
    skills: ['Swarm', 'Parallelism', 'Capstone'],
    materials: [{ item: '2–3 Tello EDU + prop guards', quantity: 'per group' }, { item: 'Wi-Fi router + computer with djitellopy', quantity: '1 per group' }],
    resources: [TELLO_PY_DOCS, DB_PY, GH_MULTI],
  },

  // ─── Level IV · The Official DJI SDK (dji-sdk/Tello-Python) ───
  // NOTE: DJI's repo targets Python 2.7. These lessons teach the same official
  // SDK ideas with tiny Python 3 snippets that run on modern machines, and link
  // the original repo folders as the authoritative reference.
  {
    id: 'tl-13', title: 'Talk to the Drone: the Tello SDK over UDP', emoji: '📡', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m4', moduleTitle: L4, order: 13,
    concept: 'what really happens under DroneBlocks — plain-text SDK commands over UDP', conceptExplain: 'Every app that flies the Tello (DroneBlocks, djitellopy, DJI\'s own samples) does the same thing: it sends plain-text commands like "takeoff" or "forward 50" to the drone\'s IP 192.168.10.1 on UDP port 8889, and the drone answers "ok" or "error". Level IV pulls the curtain back: students speak the SDK directly, exactly like DJI\'s official Tello-Python repo does. (DJI\'s repo is Python 2.7-era — our snippets are the same idea in Python 3.)',
    objectives: ['Explain that the Tello is controlled by text commands over UDP (IP 192.168.10.1, port 8889)', 'Send "command", "battery?" and movement commands from Python', 'Read the drone\'s "ok"/value responses'],
    steps: ['Connect the computer to the Tello Wi-Fi.', 'Run the snippet below — "command" switches the drone into SDK mode.', 'Ask questions first (props off!): battery?, speed?, time?.', 'Then, in a clear zone: send takeoff, forward 50, cw 90, land — one command at a time, reading each "ok".'],
    code: [
      'import socket',
      'sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)',
      "sock.bind(('', 9000))",
      "tello = ('192.168.10.1', 8889)",
      'def send(cmd):',
      '    sock.sendto(cmd.encode(), tello)',
      "    print(cmd, '->', sock.recv(1024).decode())",
      "send('command')      # enter SDK mode",
      "send('battery?')     # ask the battery %",
    ],
    challenge: 'Write a "drone dictionary": send 6 different SDK commands and record what each one answers — including one that returns a value (battery?) and one that returns "error" (find out why!).',
    skills: ['Tello SDK', 'UDP & Networking', 'Python'],
    quiz: [
      { question: 'The Tello is commanded by sending:', options: ['plain-text commands over UDP', 'Bluetooth beeps', 'infrared signals', 'HDMI frames'], answerIndex: 0 },
      { question: 'The first command you must always send is:', options: ['command (enters SDK mode)', 'land', 'flip', 'selfie'], answerIndex: 0 },
      { question: 'When a command works, the Tello answers:', options: ['ok', 'yes sir', 'beep', 'nothing ever'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Computer with Python 3', quantity: '1 per group' }],
    resources: [GH_REPO, GH_SINGLE, TELLO_PY_DOCS],
  },
  {
    id: 'tl-14', title: 'Mission Files: Fly a command.txt like DJI', emoji: '📜', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m4', moduleTitle: L4, order: 14,
    concept: 'DJI\'s Single_Tello_Test pattern — the flight is a text file, the code just reads it', conceptExplain: 'In DJI\'s official Single_Tello_Test, the whole mission lives in command.txt — one SDK command per line, plus "delay N" lines — and a small runner script executes it. Separating the mission (data) from the runner (code) is real engineering: pilots edit a text file, nobody touches the program. Students write their own missions and run them with our 10-line Python 3 runner.',
    objectives: ['Write a flight mission as a command.txt file (one SDK command per line, delay N between)', 'Run it with a mission-runner script', 'Iterate the mission by editing only the text file'],
    steps: ['Create command.txt: command / takeoff / delay 3 / forward 60 / cw 90 / forward 60 / delay 2 / land.', 'Save the runner below next to it and run it in a clear flight zone.', 'Watch the drone execute the file line by line.', 'Edit ONLY command.txt to change the flight (square? zig-zag?) and re-run — no code changes.'],
    code: [
      'import socket, time',
      'sock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)',
      "sock.bind(('', 9000))",
      'def send(cmd):',
      "    sock.sendto(cmd.encode(), ('192.168.10.1', 8889))",
      "    print(cmd, '->', sock.recv(1024).decode())",
      "for line in open('command.txt'):",
      '    line = line.strip()',
      "    if line.startswith('delay'): time.sleep(float(line.split()[1]))",
      '    elif line: send(line)',
    ],
    challenge: 'Mission swap! Each team writes a command.txt for another team\'s drone. Fly it with zero edits to the runner — the mission file is the whole program.',
    skills: ['Mission Files', 'Tello SDK', 'Code vs Data'],
    quiz: [
      { question: 'In Single_Tello_Test, the flight plan lives in:', options: ['a command.txt text file', 'the drone battery', 'a spreadsheet', 'the Wi-Fi router'], answerIndex: 0 },
      { question: '"delay 3" in the mission file means:', options: ['wait 3 seconds before the next command', 'fly 3 meters', 'turn 3 degrees', 'blink 3 times'], answerIndex: 0 },
      { question: 'Separating the mission file from the runner code means:', options: ['you change the flight without touching the code', 'the drone flies faster', 'you need two drones', 'nothing'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Computer with Python 3 + a text editor', quantity: '1 per group' }],
    resources: [GH_SINGLE, GH_REPO],
  },
  {
    id: 'tl-15', title: 'Drone Telemetry: Read the State Stream', emoji: '🩺', difficulty: 4, ageGroup: '13-15', moduleId: 'tl-m4', moduleTitle: L4, order: 15,
    concept: 'the Tello broadcasts its full state every 100 ms — like DJI\'s tello_state.py', conceptExplain: 'Once in SDK mode, the Tello continuously pushes a state string to UDP port 8890: pitch, roll, yaw, height, barometer, time-of-flight distance, battery, temperature and more, as "key:value;" pairs. DJI\'s tello_state.py prints it; students go further — parsing it into a Python dict and logging a flight like a black box.',
    objectives: ['Listen on UDP 8890 and receive the raw state string', 'Parse "key:value;" pairs into a dictionary', 'Log battery/height over a flight and report the data'],
    steps: ['Send "command" first (props off — this works on the ground).', 'Run the listener below and read one raw state line.', 'Parse it: split on ";" then on ":" — print bat, h and tof nicely.', 'Black-box exercise: log 30 seconds of state to a list during a short hover flight, then print min/max height and battery used.'],
    code: [
      'import socket',
      'state = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)',
      "state.bind(('', 8890))          # the Tello pushes state here",
      'raw = state.recv(1024).decode()',
      'data = dict(p.split(":") for p in raw.strip().strip(";").split(";"))',
      'print("battery:", data["bat"], "% | height:", data["h"], "cm")',
    ],
    challenge: 'Build a "flight report": after a 30-second hover, print battery used, max height, and average temperature — and decide from the data if the drone is safe to fly again.',
    skills: ['Telemetry', 'Data Parsing', 'Python Dictionaries'],
    quiz: [
      { question: 'The Tello broadcasts its state on UDP port:', options: ['8890', '80', '443', '1234'], answerIndex: 0 },
      { question: 'The state string looks like:', options: ['key:value pairs separated by ;', 'a photo', 'music notes', 'a PDF'], answerIndex: 0 },
      { question: '"bat:87" in the state stream means:', options: ['battery is at 87%', '87 drones connected', '87 cm high', 'error 87'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU (props off for the ground part)', quantity: '1 per group' }, { item: 'Computer with Python 3', quantity: '1 per group' }],
    resources: [GH_STATE, GH_REPO, TELLO_PY_DOCS],
  },
  {
    id: 'tl-16', title: 'Live Video & Fly-by-Pose (DJI Showcase)', emoji: '🎥', difficulty: 5, ageGroup: '13-15', moduleId: 'tl-m4', moduleTitle: L4, order: 16,
    concept: 'the drone\'s eye in code: video streaming, and DJI\'s pose-controlled flight demo', conceptExplain: 'DJI\'s Tello_Video receives the H.264 camera stream, decodes it and shows it in a GUI with a control panel; Tello_Video_With_Pose_Recognition goes further — it maps body poses to flight commands, so you fly the drone by striking poses. The original demos are Python 2.7 (one-click install scripts in each folder); for Python 3 the same stream is available via djitellopy\'s frame_read. This is the showcase lesson: seeing computer vision drive a real aircraft.',
    objectives: ['Explain how the video stream reaches the computer (streamon → UDP video feed)', 'Show live drone video on screen', 'Describe how pose recognition maps a camera image to a flight command'],
    steps: ['Send "streamon" (SDK) — the camera stream starts.', 'Python 3 path: use djitellopy — frame_read = tello.get_frame_read(), show frames with OpenCV; take a snapshot.', 'Explore DJI\'s Tello_Video folder (Resources): the decoder, GUI and control panel — run it if you have a Python 2.7 machine.', 'Watch/demo the pose-recognition sample: pose detected in the frame → command sent to the drone. Discuss: what else could the camera trigger?'],
    code: [
      '# Python 3 route (pip install djitellopy opencv-python)',
      'from djitellopy import Tello',
      'import cv2',
      'tello = Tello(); tello.connect(); tello.streamon()',
      'frame = tello.get_frame_read().frame',
      "cv2.imwrite('drone_view.jpg', frame)   # snapshot from the sky",
    ],
    challenge: 'Team showcase: capture a live aerial snapshot of a target the class chooses, and present how DJI\'s pose demo turns "arms up" into a flight command — then invent (on paper) your own pose-to-command mapping.',
    skills: ['Video Streaming', 'Computer Vision', 'Capstone'],
    quiz: [
      { question: 'To start the camera stream you send:', options: ['streamon', 'cheese', 'record', 'photo'], answerIndex: 0 },
      { question: 'DJI\'s pose-recognition demo controls the drone with:', options: ['your body poses seen by the camera', 'a steering wheel', 'shouting', 'a magic wand'], answerIndex: 0 },
      { question: 'The video arrives at the computer as:', options: ['an H.264 stream to decode', 'printed photos', 'a DVD', 'Morse code'], answerIndex: 0 },
    ],
    materials: [{ item: 'Tello EDU + prop guards', quantity: '1 per group' }, { item: 'Computer with Python 3 + djitellopy + OpenCV', quantity: '1 per group' }],
    resources: [GH_VIDEO, GH_POSE, GH_REPO, TELLO_PY_DOCS],
  },
];

export const TELLO_LESSONS: LessonDetail[] = CONFIGS.map(makeTL);

const sum = (c: TL) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const TELLO_COURSE: Course = {
  id: 'tello-edu-1', slug: 'code-and-fly-tello-edu', title: 'Code & Fly with Tello EDU',
  programId: 'drones', programSlug: 'drones', ageGroup: '10-12', level: 'Intermediate',
  description: 'Program a real drone — the Ryze/DJI Tello EDU — across four levels. Level I: fly safely and code autonomous flights with DroneBlocks (take-off, directions, loops). Level II: flips, curves, variables, mission-pad navigation and the camera. Level III: text programming in Python with DJITelloPy — flight sequences, sensor data, mission-pad navigation, and a multi-drone swarm capstone. Level IV: the official DJI SDK, straight from the dji-sdk/Tello-Python repo — raw UDP commands, command.txt mission files, the live state stream, and video + pose-controlled flight.',
  objectives: [
    'Fly the Tello EDU safely and pre-flight check it',
    'Code autonomous flights with DroneBlocks (moves, loops, variables)',
    'Use mission pads for precise navigation and the camera for FPV',
    'Program the drone in Python with DJITelloPy and read sensor data',
    'Coordinate a multi-drone swarm',
    'Speak the official Tello SDK directly: UDP commands, mission files, telemetry and video',
  ],
  duration: '16 lessons × 45–60 minutes', totalHours: 16, lessonCount: 16,
  prerequisites: ['Comfortable with block coding; Python helps for Levels III–IV'],
  skills: ['Drone Safety', 'DroneBlocks', 'Loops & Variables', 'Mission Pads', 'Python / DJITelloPy', 'Tello SDK & UDP', 'Swarm'],
  modules: [
    { id: 'tl-m1', title: L1, order: 1, description: 'Fly safely and code your first autonomous flights with DroneBlocks: take-off/land, directions, and loop patterns.', lessons: CONFIGS.filter(c => c.moduleId === 'tl-m1').map(sum) },
    { id: 'tl-m2', title: L2, order: 2, description: 'Go further with DroneBlocks: flips & curves, variables, mission-pad navigation, and the onboard camera.', lessons: CONFIGS.filter(c => c.moduleId === 'tl-m2').map(sum) },
    { id: 'tl-m3', title: L3, order: 3, description: 'Text programming with Python + DJITelloPy: flight sequences, sensor data, mission-pad navigation, and a drone-swarm capstone.', lessons: CONFIGS.filter(c => c.moduleId === 'tl-m3').map(sum) },
    { id: 'tl-m4', title: L4, order: 4, description: 'The official DJI Tello-Python repo, demystified: raw SDK commands over UDP, command.txt mission files (Single_Tello_Test), the 8890 state stream, and live video / pose-controlled flight.', lessons: CONFIGS.filter(c => c.moduleId === 'tl-m4').map(sum) },
  ],
};
