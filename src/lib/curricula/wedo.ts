import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  LEGO Education WeDo 2.0 — "Build & Program"
//  Source: official 45300 building-instruction PDFs, rasterized
//  (first build steps) into in-app galleries; the FULL instructions
//  are deep-linked from Drive. WeDo 2.0 uses a Smarthub, a motor,
//  a motion sensor, and a tilt sensor, programmed with drag-drop blocks.
//  Ages 6–9. Build steps are official; teaching prompts are SUGGESTED.
// ════════════════════════════════════════════════════════════════

interface WedoConfig {
  id: string;
  slug: string;            // image folder, e.g. 'wedo-drive'
  title: string;
  order: number;
  moduleId: string;
  moduleTitle: string;
  emoji: string;
  pages: number;           // rasterized pages available (p-01..p-NN, capped at 14)
  capped: boolean;         // true if the model has more steps in the full PDF
  concept: string;         // the mechanism/idea, e.g. 'a motor and wheels'
  conceptExplain: string;  // factual explanation
  motion: string;          // what the finished model does
  program: string;         // what to program with the WeDo app
  observe: string;
  realWorld: string[];
  modelChallenge: string;
  skills: string[];
}

function buildGallery(slug: string, pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${slug}/p-${n}.png`, kind: 'photo', caption: `Build step ${i - 1}` });
  }
  return imgs;
}

function makeWedoLesson(c: WedoConfig): LessonDetail {
  const galleryNote = c.capped
    ? 'The first build steps are shown below. Open the full building instructions (Files section) for every step.'
    : 'Follow all the build steps below.';

  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Have one WeDo 2.0 kit (Smarthub, medium motor, motion sensor, tilt sensor) per child or pair, plus a tablet/laptop with the WeDo 2.0 app.',
        `Build ${c.title} yourself first so you can help and demonstrate the finished model.`,
        'Open the full building instructions (Files section) on the projector — the in-app gallery shows the first steps; the PDF has every step.',
        'Charge the Smarthub and check it pairs with the app over Bluetooth.',
        'SUGGESTED CONTENT: build steps are official; the objectives, programming task, and prompts here are RoboHolic suggestions.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `HOOK (5 min): Show the finished ${c.title}. Ask "What do you think it does?" then reveal: ${c.motion}`, tip: 'Wonder first, explain second.' },
        { step: 2, instruction: `BUILD (15–20 min): Build together using the steps. ${galleryNote}`, tip: 'Name pieces by colour and shape; wait for most to finish each step.' },
        { step: 3, instruction: `CONNECT & PROGRAM (10 min): Pair the Smarthub with the app. ${c.program}`, coachNote: `This model is about ${c.concept}.` },
        { step: 4, instruction: `EXPLORE (5 min): ${c.observe}` },
        { step: 5, instruction: `WRAP-UP (5 min): Ask "Where have you seen ${c.concept} in real life?" Celebrate each build.` },
      ],
    },
    {
      type: 'student_steps',
      title: `Build & Program ${c.title}! ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Build & Program ${c.title}! ${c.emoji}`,
      content: [
        'Find your pieces and build one step at a time.',
        'Check your model against each picture.',
        'Connect the Smarthub to the app.',
        `Program it: ${c.program}`,
        `Watch: ${c.observe}`,
      ],
      studentContent: [
        '🧱 Build step by step',
        '🔵 Connect the Smarthub',
        '💻 Program it!',
        '🎉 Make it go!',
      ],
    },
    {
      type: 'activity',
      title: `Build & Program: ${c.title}`,
      emoji: '🛠️',
      content: [
        galleryNote,
        `Then connect the Smarthub and program it: ${c.program}`,
      ],
      studentContent: [
        '🧱 Build it (follow the pictures)',
        '🔵 Connect the Smarthub',
        `💻 ${c.program}`,
      ],
      images: buildGallery(c.slug, c.pages),
    },
    {
      type: 'challenge',
      title: 'Tinker & Test',
      emoji: '🎚️',
      content: [
        c.modelChallenge,
        'Change the motor power or time in your program. What happens?',
      ],
      studentContent: [`🔧 ${c.modelChallenge}`, '⚡ Change the motor power — what changes?'],
    },
    {
      type: 'extra_challenge',
      title: 'Super Builder Challenge',
      emoji: '🌟',
      content: [
        `Add a sensor (motion or tilt) so your ${c.title} reacts on its own.`,
        `Explain how ${c.concept} makes it work to a friend.`,
      ],
      studentContent: [`🤖 Add a sensor so it reacts by itself!`, `🗣️ Explain how it works`],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'The Smarthub won\'t connect', cause: 'Bluetooth off, hub asleep, or low battery.', solution: 'Turn on Bluetooth, press the hub button to wake it, check batteries, then connect in the app.' },
        { problem: 'The motor doesn\'t turn', cause: 'Motor not plugged into the hub, or no motor block in the program.', solution: 'Plug the motor into the Smarthub port and add a "motor on / power" block to the program.' },
        { problem: 'The moving part is stiff or rubs', cause: 'Pieces too tight or gears not meshed.', solution: 'Loosen the connection so parts move freely; make sure gear teeth interlock.' },
        { problem: 'A child is stuck on a step — Suggested', cause: 'Too much at once for this age.', solution: 'Point to the exact picture, do that step together, then let them continue.' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        `Built ${c.title} following the instructions (with support as needed).`,
        'Connected the Smarthub to the app.',
        'Programmed the model to move/react.',
        `Observed and described what it does (${c.observe}).`,
        `Can point to or describe the ${c.concept}.`,
      ],
    },
    {
      type: 'homework',
      title: 'Explore at Home',
      emoji: '🏠',
      content: [
        `Look for ${c.concept} in real life. Examples: ${c.realWorld.join(', ')}.`,
        'Tell your family what your model does and how you programmed it.',
      ],
      studentContent: [
        `🔎 Find ${c.concept} at home! (like ${c.realWorld[0]})`,
        '👨‍👩‍👧 Show your family your robot',
      ],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `MACHINE FOCUS: ${c.title} demonstrates ${c.concept}. ${c.conceptExplain}`,
        'WeDo 2.0 = build + program. Spend real time on the programming step — it\'s what makes the model come alive.',
        'AGES 6–9: pre-sort pieces; build as a group; let pairs share one kit and take turns.',
        'The in-app gallery shows the first steps; the full PDF (Files) has every step — project it as you build.',
        'SUGGESTED CONTENT: build steps are official; prompts here are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id,
    slug: c.slug.replace('wedo-', ''),
    title: c.title,
    programId: 'wedo',
    programSlug: 'wedo',
    programTitle: 'WeDo 2.0',
    programColor: '#F97316',
    courseId: 'wedo-build-program',
    courseTitle: 'WeDo 2.0: Build & Program',
    moduleId: c.moduleId,
    moduleTitle: c.moduleTitle,
    ageGroup: '6-7',
    level: 'Beginner',
    duration: '45 minutes',
    difficulty: 1,
    heroImage: `/lessons/${c.slug}/p-01.png`,
    skills: c.skills,
    materials: [
      { item: 'LEGO Education WeDo 2.0 kit (Set 45300)', quantity: '1 per child or pair' },
      { item: 'Tablet/laptop with the WeDo 2.0 app', quantity: '1 per child or pair' },
      { item: 'Full building instructions (projected/printed)', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: [
      `Build ${c.title} from the instructions (SUGGESTED).`,
      `Program it with the WeDo app: ${c.program} (SUGGESTED).`,
      `Discover how ${c.concept} works.`,
      'Practise building, sequencing, and following steps.',
    ],
    assessmentChecklist: [
      `Built ${c.title}.`,
      'Connected and programmed it.',
      `Identified the ${c.concept}.`,
      'Gave a real-world example.',
    ],
    sections,
    resources: [
      { id: `${c.id}-r1`, title: `${c.title} — Full Building Instructions (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-wedo', description: 'Official LEGO WeDo 2.0 step-by-step build', needsReview: true },
    ],
  };
}

const M1 = 'Module 1: Getting Started';
const M2 = 'Module 2: Machines & Mechanisms';
const M3 = 'Module 3: Sensors & Big Builds';

const CONFIGS: WedoConfig[] = [
  // ── Module 1: Getting Started ──
  { id: 'wedo-l1', slug: 'wedo-cody', title: 'Meet Cody — Build the Robot', order: 1, moduleId: 'wedo-m1', moduleTitle: M1, emoji: '🤖', pages: 6, capped: false,
    concept: 'a motor and a Smarthub', conceptExplain: 'WeDo 2.0 models are driven by a medium motor and controlled by the Smarthub, which talks to your tablet over Bluetooth.',
    motion: 'a motorised robot that drives when you program it.', program: 'turn the motor on so the robot drives forward, then add a stop.',
    observe: 'press play in the app and watch the motor drive the robot.', realWorld: ['a remote-control car', 'a robot vacuum', 'a toy train'],
    modelChallenge: 'Make the robot drive forward, then backward.', skills: ['Motor', 'Smarthub', 'Building', 'First Program'] },
  { id: 'wedo-l2', slug: 'wedo-cody-motion', title: 'Cody with a Motion Sensor', order: 2, moduleId: 'wedo-m1', moduleTitle: M1, emoji: '👀', pages: 6, capped: false,
    concept: 'the Motion Sensor', conceptExplain: 'The motion (distance) sensor detects when an object is near. The program can react to what the sensor "sees".',
    motion: 'reacts when something gets close to its sensor.', program: 'use a "wait for distance" block so the robot stops (or reacts) when something is near.',
    observe: 'move your hand toward the sensor and watch the robot react.', realWorld: ['automatic doors', 'a car parking sensor', 'a hand-dryer'],
    modelChallenge: 'Make it do something different when it senses an object (sound, light, stop).', skills: ['Motion Sensor', 'Input', 'Conditions', 'Building'] },
  { id: 'wedo-l3', slug: 'wedo-cody-tilt', title: 'Cody with a Tilt Sensor', order: 3, moduleId: 'wedo-m1', moduleTitle: M1, emoji: '📐', pages: 6, capped: false,
    concept: 'the Tilt Sensor', conceptExplain: 'The tilt sensor detects which way it is tilted (up, down, left, right). The program can respond to the tilt.',
    motion: 'reacts when you tilt it in different directions.', program: 'use the tilt sensor to control the motor — e.g. tilt one way to go, the other way to stop.',
    observe: 'tilt the model and watch how it responds.', realWorld: ['a phone screen rotating', 'a game controller', 'a step counter'],
    modelChallenge: 'Make a different reaction for each tilt direction.', skills: ['Tilt Sensor', 'Input', 'Direction', 'Building'] },
  { id: 'wedo-l4', slug: 'wedo-easystart2', title: 'Getting Started — Part 2', order: 4, moduleId: 'wedo-m1', moduleTitle: M1, emoji: '🚀', pages: 11, capped: false,
    concept: 'building with a motor', conceptExplain: 'A guided build that adds the motor to your model and gets it moving with a simple program.',
    motion: 'a guided model that moves with the motor.', program: 'turn the motor on at a chosen power for a set time.',
    observe: 'change the power and watch the speed change.', realWorld: ['a fan', 'a blender', 'a toy car'],
    modelChallenge: 'Find the slowest power that still moves the model.', skills: ['Motor', 'Power', 'Building', 'Sequencing'] },
  { id: 'wedo-l5', slug: 'wedo-easystart3', title: 'Getting Started — Part 3', order: 5, moduleId: 'wedo-m1', moduleTitle: M1, emoji: '🧩', pages: 14, capped: false,
    concept: 'building and programming', conceptExplain: 'A guided build that combines building with a longer program (motor + sound or display).',
    motion: 'a guided model with motor and effects.', program: 'add sound or a screen message together with the motor.',
    observe: 'run the program and watch all the parts work together.', realWorld: ['a washing machine', 'a microwave', 'a doorbell'],
    modelChallenge: 'Add a sound that plays when the motor starts.', skills: ['Motor', 'Sound', 'Sequencing', 'Building'] },
  { id: 'wedo-l6', slug: 'wedo-easystart4', title: 'Getting Started — Part 4', order: 6, moduleId: 'wedo-m1', moduleTitle: M1, emoji: '🎓', pages: 14, capped: false,
    concept: 'a complete build-and-program', conceptExplain: 'A guided build that brings together motor, sensor, and program — your first full WeDo project.',
    motion: 'a complete model that moves and reacts.', program: 'combine the motor with a sensor so the model reacts on its own.',
    observe: 'let the model run and react without you touching it.', realWorld: ['a robot vacuum', 'an automatic gate', 'a smart light'],
    modelChallenge: 'Make the model start and stop using a sensor.', skills: ['Motor', 'Sensor', 'Full Project', 'Building'] },

  // ── Module 2: Machines & Mechanisms ──
  { id: 'wedo-l7', slug: 'wedo-drive', title: 'Drive', order: 7, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🚗', pages: 14, capped: false,
    concept: 'a motor and wheels', conceptExplain: 'The motor turns the wheels through gears so the model drives. Changing the motor power changes the speed.',
    motion: 'drives across the floor on its wheels.', program: 'set the motor power and time so it drives a set distance.',
    observe: 'change the power and time and watch how far it goes.', realWorld: ['a car', 'a bus', 'a toy buggy'],
    modelChallenge: 'Program it to drive forward, pause, then reverse.', skills: ['Motor', 'Wheels', 'Speed', 'Sequencing'] },
  { id: 'wedo-l8', slug: 'wedo-crank', title: 'Crank', order: 8, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🔧', pages: 14, capped: false,
    concept: 'a crank', conceptExplain: 'A crank turns round-and-round motion from the motor into a back-and-forth (or up-and-down) movement.',
    motion: 'moves a part back and forth as the motor turns.', program: 'run the motor and watch the crank convert the spinning into a back-and-forth move.',
    observe: 'watch the round turning become a back-and-forth motion.', realWorld: ['a sewing machine', 'a train wheel', 'a pump'],
    modelChallenge: 'Speed the motor up — does the crank move faster?', skills: ['Crank', 'Motion Change', 'Motor', 'Mechanisms'] },
  { id: 'wedo-l9', slug: 'wedo-lift', title: 'Lift', order: 9, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🏗️', pages: 14, capped: true,
    concept: 'gears for lifting', conceptExplain: 'Gears let the motor lift a load more easily and slowly. Bigger gear ratios make lifting stronger but slower.',
    motion: 'lifts a load up and down.', program: 'run the motor one way to lift, the other way to lower.',
    observe: 'watch the gears lift the load slowly and steadily.', realWorld: ['a crane', 'a lift (elevator)', 'a forklift'],
    modelChallenge: 'Lift a small object — can it lift something heavier?', skills: ['Gears', 'Lifting', 'Motor Direction', 'Mechanisms'] },
  { id: 'wedo-l10', slug: 'wedo-grab', title: 'Grab', order: 10, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🦾', pages: 14, capped: true,
    concept: 'a gripper', conceptExplain: 'A gripper opens and closes to hold objects, driven by the motor through a mechanism.',
    motion: 'opens and closes to grab objects.', program: 'run the motor to open the gripper, reverse it to close.',
    observe: 'watch the gripper open and close on an object.', realWorld: ['a claw machine', 'a robot arm in a factory', 'tongs'],
    modelChallenge: 'Grab and move a small object from one spot to another.', skills: ['Gripper', 'Motor Direction', 'Mechanisms', 'Control'] },
  { id: 'wedo-l11', slug: 'wedo-robotic-arm', title: 'Robotic Arm', order: 11, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🦾', pages: 14, capped: true,
    concept: 'a robotic arm', conceptExplain: 'A robotic arm uses gears and joints driven by the motor to reach, lift, and move things — like arms in factories.',
    motion: 'reaches and moves like an arm.', program: 'run the motor to move the arm, and add timing so it reaches and returns.',
    observe: 'watch the arm reach and move with the motor.', realWorld: ['a factory robot arm', 'a digger', 'a crane arm'],
    modelChallenge: 'Program the arm to reach out, pause, and come back.', skills: ['Robotic Arm', 'Gears', 'Joints', 'Sequencing'] },
  { id: 'wedo-l12', slug: 'wedo-revolve', title: 'Revolve', order: 12, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🎡', pages: 14, capped: true,
    concept: 'rotation', conceptExplain: 'The motor spins a part around in a circle. Gears can change how fast it spins.',
    motion: 'spins a part around and around.', program: 'set the motor power and time to control the spinning.',
    observe: 'watch it revolve; change the power to spin faster or slower.', realWorld: ['a merry-go-round', 'a fan', 'a record player'],
    modelChallenge: 'Make it spin one way, stop, then spin the other way.', skills: ['Rotation', 'Motor', 'Gears', 'Speed'] },
  { id: 'wedo-l13', slug: 'wedo-steer', title: 'Steer', order: 13, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🛞', pages: 14, capped: true,
    concept: 'steering', conceptExplain: 'A steering mechanism turns the wheels so the model can change direction, not just go straight.',
    motion: 'changes direction as it drives.', program: 'use the motor (or a sensor) to steer left and right.',
    observe: 'watch the wheels turn to change direction.', realWorld: ['a car steering wheel', 'a go-kart', 'a shopping trolley'],
    modelChallenge: 'Drive a simple path with a turn in it.', skills: ['Steering', 'Direction', 'Motor', 'Control'] },
  { id: 'wedo-l14', slug: 'wedo-joystick', title: 'Joystick', order: 14, moduleId: 'wedo-m2', moduleTitle: M2, emoji: '🕹️', pages: 14, capped: false,
    concept: 'a joystick control', conceptExplain: 'A joystick (using the tilt sensor) lets you control the model by hand — tilt it to send commands.',
    motion: 'is controlled by tilting a joystick.', program: 'read the tilt sensor and move the motor based on the tilt direction.',
    observe: 'tilt the joystick and watch the model respond.', realWorld: ['a game controller', 'a crane control', 'a wheelchair joystick'],
    modelChallenge: 'Make tilt-forward go and tilt-back stop.', skills: ['Tilt Sensor', 'Control', 'Input', 'Motor'] },

  // ── Module 3: Sensors & Big Builds ──
  { id: 'wedo-l15', slug: 'wedo-motion', title: 'Motion Detector', order: 15, moduleId: 'wedo-m3', moduleTitle: M3, emoji: '🚨', pages: 14, capped: false,
    concept: 'the Motion Sensor', conceptExplain: 'The motion sensor detects a nearby object. The program decides what to do when something is detected.',
    motion: 'detects movement nearby and reacts.', program: 'when the sensor detects an object, play a sound or light up.',
    observe: 'move toward the sensor and watch it trigger.', realWorld: ['a burglar alarm', 'automatic taps', 'security lights'],
    modelChallenge: 'Make a louder or flashing alert when something is very close.', skills: ['Motion Sensor', 'Detection', 'Output', 'Conditions'] },
  { id: 'wedo-l16', slug: 'wedo-alarm', title: 'Alarm Device', order: 16, moduleId: 'wedo-m3', moduleTitle: M3, emoji: '🔔', pages: 14, capped: true,
    concept: 'a sensor alarm', conceptExplain: 'An alarm combines a sensor with an output (sound/light): when the sensor is triggered, the program raises the alarm.',
    motion: 'raises an alarm when its sensor is triggered.', program: 'use the sensor to start a repeating sound/light alarm; add a way to reset it.',
    observe: 'trigger the sensor and watch the alarm go off.', realWorld: ['a smoke alarm', 'a door alarm', 'a car alarm'],
    modelChallenge: 'Make the alarm keep going until it is reset.', skills: ['Sensors', 'Alarm', 'Loops', 'Output'] },
  { id: 'wedo-l17', slug: 'wedo-luna-rover', title: 'Luna Rover', order: 17, moduleId: 'wedo-m3', moduleTitle: M3, emoji: '🌙', pages: 14, capped: true,
    concept: 'a space rover', conceptExplain: 'A rover is a driving robot built to explore. It combines a motor, wheels, and sensors to move and react to its surroundings.',
    motion: 'drives like a rover exploring the moon.', program: 'drive forward, and use a sensor to stop or turn at an obstacle.',
    observe: 'let the rover explore and react to obstacles.', realWorld: ['the Mars rover', 'a robot vacuum', 'an explorer drone'],
    modelChallenge: 'Make the rover turn away when it senses an obstacle.', skills: ['Rover', 'Motor', 'Sensors', 'Autonomy'] },
  { id: 'wedo-l18', slug: 'wedo-milo-arm1', title: 'Milo Arm (Part 1)', order: 18, moduleId: 'wedo-m3', moduleTitle: M3, emoji: '🦿', pages: 14, capped: false,
    concept: 'a robot arm', conceptExplain: 'Part 1 of a bigger project: build the base and arm of a robot, driven by the motor.',
    motion: 'an arm that moves with the motor (part of a bigger build).', program: 'run the motor to move the arm; tune the timing.',
    observe: 'watch the arm move; note how the motor drives it.', realWorld: ['a factory arm', 'a crane', 'a digger'],
    modelChallenge: 'Get the arm to move smoothly and stop in place.', skills: ['Robot Arm', 'Motor', 'Building', 'Project'] },
  { id: 'wedo-l19', slug: 'wedo-milo-arm2', title: 'Milo Arm (Part 2)', order: 19, moduleId: 'wedo-m3', moduleTitle: M3, emoji: '🦿', pages: 14, capped: false,
    concept: 'a robot arm (continued)', conceptExplain: 'Part 2 extends the arm with more mechanism and a fuller program.',
    motion: 'a more complete robot arm.', program: 'combine motor moves into a sequence so the arm does a task.',
    observe: 'run the sequence and watch the arm complete a task.', realWorld: ['a robot arm assembling cars', 'a crane', 'a claw'],
    modelChallenge: 'Program the arm to do two moves in a row.', skills: ['Robot Arm', 'Sequencing', 'Motor', 'Project'] },
  { id: 'wedo-l20', slug: 'wedo-milo-twins', title: 'Milo Twins (Part 3)', order: 20, moduleId: 'wedo-m3', moduleTitle: M3, emoji: '👯', pages: 14, capped: false,
    concept: 'robots working together', conceptExplain: 'Two robots can share information. WeDo lets models send and receive messages so they cooperate — an intro to communication.',
    motion: 'two robots that work together.', program: 'have one model send a message and the other react to it.',
    observe: 'watch the two models cooperate when one signals the other.', realWorld: ['robots on a production line', 'cars talking to traffic lights', 'a team relay'],
    modelChallenge: 'Make one robot start the other.', skills: ['Communication', 'Teamwork', 'Sequencing', 'Project'] },
];

export const WEDO_LESSONS: LessonDetail[] = CONFIGS.map(makeWedoLesson);

export const WEDO_COURSE: Course = {
  id: 'wedo-build-program',
  slug: 'build-and-program',
  title: 'WeDo 2.0: Build & Program',
  programId: 'wedo',
  programSlug: 'wedo',
  ageGroup: '6-7',
  level: 'Beginner',
  description:
    'Young engineers build 20 motorised LEGO WeDo 2.0 models and program them with drag-drop blocks. Starting with the Smarthub, motor, and sensors, they explore machines, mechanisms, and bigger robot projects — building, coding, and discovering how each one works.',
  objectives: [
    'Build motorised models from picture instructions',
    'Program with the WeDo 2.0 app (motor, sound, sensors)',
    'Use the motion and tilt sensors as inputs',
    'Discover motors, gears, cranks, grippers, steering, and rotation',
  ],
  duration: '20 sessions × 45 minutes',
  totalHours: 15,
  lessonCount: 20,
  prerequisites: [],
  skills: ['Building', 'Motors', 'Sensors', 'Gears & Mechanisms', 'Block Programming'],
  modules: [
    {
      id: 'wedo-m1', title: M1, order: 1,
      description: 'Meet the Smarthub, motor, and sensors with guided starter builds.',
      lessons: CONFIGS.filter(c => c.moduleId === 'wedo-m1').map(c => ({ id: c.id, title: c.title, duration: '45 min', difficulty: 1 as const, skills: c.skills.slice(0, 2), order: c.order })),
    },
    {
      id: 'wedo-m2', title: M2, order: 2,
      description: 'Motors, gears, cranks, grippers, steering, and rotation.',
      lessons: CONFIGS.filter(c => c.moduleId === 'wedo-m2').map(c => ({ id: c.id, title: c.title, duration: '45 min', difficulty: 1 as const, skills: c.skills.slice(0, 2), order: c.order })),
    },
    {
      id: 'wedo-m3', title: M3, order: 3,
      description: 'Sensors, alarms, rovers, and bigger robot projects.',
      lessons: CONFIGS.filter(c => c.moduleId === 'wedo-m3').map(c => ({ id: c.id, title: c.title, duration: '45 min', difficulty: 1 as const, skills: c.skills.slice(0, 2), order: c.order })),
    },
  ],
};
