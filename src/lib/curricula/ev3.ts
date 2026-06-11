import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  LEGO MINDSTORMS EV3 — "Beginner Programming" (Level I)
//  Source: EV3Lessons.com (Droids Robotics) slide decks. Text via
//  pdftotext; slides rasterized into in-app galleries. Build/program
//  lessons for FLL-style robotics. Ages 10–15.
//  Lesson content is from the decks; coaching prompts are SUGGESTED.
// ════════════════════════════════════════════════════════════════

interface Ev3Config {
  id: string;
  slug: string;          // image folder 'ev3-lN'
  title: string;
  order: number;
  moduleId: string;
  moduleTitle: string;
  emoji: string;
  pages: number;
  concept: string;
  conceptExplain: string;
  objectives: string[];
  challenge: string;         // the lesson's main challenge
  challengeSteps: string[];  // suggested steps
  skills: string[];
  difficulty: 2 | 3 | 4;
}

function slideGallery(slug: string, pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${slug}/p-${n}.png`, kind: 'photo', caption: `Slide ${i}` });
  }
  return imgs;
}

function makeEv3Lesson(c: Ev3Config): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Have a built EV3 driving base robot and the EV3 software (or app) ready per team.',
        'Project the lesson slides (Files section) — the in-app gallery below mirrors them.',
        `Build the "${c.challenge}" solution yourself first so you can guide and demo it.`,
        `Today's concept: ${c.concept}. ${c.conceptExplain}`,
        'Lesson content is from EV3Lessons.com (Droids Robotics); the timings and coaching prompts here are RoboHolic suggestions.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `INTRO (5 min): Review the lesson objectives and ask what students already know about ${c.concept.toLowerCase()}.` },
        { step: 2, instruction: `TEACH (10 min): Walk through the slides. ${c.conceptExplain}`, tip: 'Demo the blocks live in the EV3 software as you explain.' },
        { step: 3, instruction: `CHALLENGE (20–25 min): ${c.challenge} Teams plan (pseudocode), build the program, download it to the brick, and test on the mat.`, coachNote: 'Encourage measure-don\'t-guess and iterative testing.' },
        { step: 4, instruction: 'SHARE (5 min): Teams demo their solution and explain their approach and any debugging.' },
      ],
    },
    {
      type: 'student_steps',
      title: `Challenge: ${c.challenge} ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Challenge: ${c.challenge} ${c.emoji}`,
      content: c.challengeSteps,
      studentContent: c.challengeSteps,
    },
    {
      type: 'activity',
      title: `Build & Program: ${c.title}`,
      emoji: '🛠️',
      content: [
        `Concept: ${c.conceptExplain}`,
        `Challenge: ${c.challenge}`,
        'Plan it, program it in the EV3 software, download to the brick, and test. The slides below show the blocks and examples.',
        ...c.challengeSteps,
      ],
      studentContent: [`🎯 ${c.challenge}`, ...c.challengeSteps.map(s => '✅ ' + s), '🤖 Download to the brick and test!'],
      images: slideGallery(c.slug, c.pages),
    },
    {
      type: 'challenge',
      title: 'Extend the Challenge',
      emoji: '🎚️',
      content: [
        `Make your ${c.title.toLowerCase()} solution more accurate or reliable.`,
        'Use Port View to measure instead of guessing, and re-test.',
      ],
      studentContent: ['📏 Measure with Port View, then re-test', '🎯 Make it more accurate!'],
    },
    {
      type: 'extra_challenge',
      title: 'Competition Corner',
      emoji: '🏆',
      content: [
        `Time your solution — how fast and consistent can you make it?`,
        `Explain how ${c.concept.toLowerCase()} would help in an FLL mission.`,
      ],
      studentContent: ['⏱️ Make it fast AND consistent', '🏆 How would this help in a competition mission?'],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'The robot won\'t download/run the program', cause: 'Brick not connected, or low battery.', solution: 'Connect via USB/Bluetooth, check the battery, and download again from the EV3 software.' },
        { problem: 'The robot doesn\'t drive straight', cause: 'Using two separate motor blocks instead of Move Steering.', solution: 'Use the Move Steering block (steering = 0) so both wheels stay in sync.' },
        { problem: 'Turns/distances are inaccurate', cause: 'Program degrees ≠ real-world degrees; wheels slip.', solution: 'Use Port View to measure the real value, then put that number in the block. Test on the actual surface.' },
        { problem: 'A team is stuck planning — Suggested', cause: 'Jumping to code without a plan.', solution: 'Have them write pseudocode first, then translate it block by block.' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        `Student can explain "${c.concept}".`,
        `Student programmed and ran the "${c.challenge}" solution.`,
        'Student tested and improved the program (measure, don\'t guess).',
        'Student explained their approach and any debugging.',
      ],
    },
    {
      type: 'homework',
      title: 'Reflect & Extend',
      emoji: '🏠',
      content: [
        `Write the pseudocode for your ${c.title.toLowerCase()} solution.`,
        `Where could ${c.concept.toLowerCase()} be used in a real robot or competition mission?`,
      ],
      studentContent: [`📝 Write your solution as pseudocode`, `🤖 Where would ${c.concept.toLowerCase()} be useful?`],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `CONCEPT: ${c.concept} — ${c.conceptExplain}`,
        'EV3Lessons.com decks include challenge worksheets and solutions — open the full slides (Files) for those.',
        'PEDAGOGY: emphasise plan (pseudocode) → program → test → improve. This is the FLL mindset.',
        'MEASURE, DON\'T GUESS: Port View is the recurring tool — reinforce it every lesson.',
        'SUGGESTED CONTENT: deck is from Droids Robotics; the prompts/timings here are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id,
    slug: c.slug.replace('ev3-', ''),
    title: c.title,
    programId: 'ev3',
    programSlug: 'ev3',
    programTitle: 'EV3',
    programColor: '#EF4444',
    courseId: 'ev3-beginner',
    courseTitle: 'EV3 Beginner Programming (Level I)',
    moduleId: c.moduleId,
    moduleTitle: c.moduleTitle,
    ageGroup: '10-12',
    level: 'Intermediate',
    duration: '45–60 minutes',
    difficulty: c.difficulty,
    heroImage: `/lessons/${c.slug}/p-01.png`,
    skills: c.skills,
    materials: [
      { item: 'LEGO MINDSTORMS EV3 set + built driving base', quantity: '1 per team' },
      { item: 'Computer/tablet with EV3 software', quantity: '1 per team' },
      { item: 'Challenge mat / tape + space to drive', quantity: '1 per classroom', isOptional: true },
      { item: 'Lesson slides (projected)', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: c.objectives,
    assessmentChecklist: [
      `Explained "${c.concept}".`,
      `Programmed and ran "${c.challenge}".`,
      'Tested and improved it.',
    ],
    sections,
    resources: [
      { id: `${c.id}-r1`, title: `${c.title} — Lesson Slides (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-ev3', description: 'EV3Lessons.com slide deck', needsReview: true },
    ],
  };
}

const M1 = 'Module 1: Robot Basics';
const M2 = 'Module 2: Programming Foundations';
const M3 = 'Module 3: Sensors & Challenges';

const CONFIGS: Ev3Config[] = [
  {
    id: 'ev3-l4', slug: 'ev3-l4', title: 'Moving Straight', order: 4, moduleId: 'ev3-m1', moduleTitle: M1, emoji: '➡️', pages: 12, difficulty: 2,
    concept: 'the Move Steering block', conceptExplain: 'The Move Steering block drives the robot. You set steering (0 = straight), power/speed, and how far (degrees, rotations, or seconds).',
    objectives: ['Make the robot go forward and backward.', 'Use the Move Steering block.', 'Read motor/sensor values using Port View.'],
    challenge: 'Drive forward from the start line to the finish line, then back to the start.',
    challengeSteps: ['Add a Move Steering block; set steering to 0 (straight).', 'Choose power and a distance (rotations or degrees).', 'Add a second block to drive back.', 'Download and test; adjust the distance until it stops on the line.'],
    skills: ['Move Steering', 'Distance', 'Power', 'Port View'],
  },
  {
    id: 'ev3-l5', slug: 'ev3-l5', title: 'Using Sensor Data & Port View', order: 5, moduleId: 'ev3-m1', moduleTitle: M1, emoji: '🔎', pages: 9, difficulty: 2,
    concept: 'Port View', conceptExplain: 'Port View on the EV3 brick shows live sensor and motor values, so you can measure instead of guess-and-check — making programs easier, more accurate, and easier to debug.',
    objectives: ['Retrieve and use sensor data.', 'Use Port View on the EV3 brick.', 'Know when Port View is useful.', 'Solve common problems with Port View.'],
    challenge: 'Use Port View to measure exactly how far the robot must drive, then program it to stop on the finish line first time.',
    challengeSteps: ['Open Port View (third tab on the brick) and pick a motor in "degrees" mode.', 'Roll the robot by hand from start to finish; read the degrees.', 'Put that number into the Move Steering block.', 'Run it — it should stop on the line without guess-and-check.'],
    skills: ['Port View', 'Sensor Data', 'Measurement', 'Debugging'],
  },
  {
    id: 'ev3-l6', slug: 'ev3-l6', title: 'Pseudocode', order: 6, moduleId: 'ev3-m2', moduleTitle: M2, emoji: '📝', pages: 10, difficulty: 2,
    concept: 'pseudocode', conceptExplain: 'Pseudocode is a plain-language, step-by-step plan of your program — part English, part code — written before you build, so you can think and share your plan first.',
    objectives: ['Learn what pseudocode means.', 'Learn why programmers use it.', 'Write pseudocode for a common task.', 'Plan programs for First Lego League.'],
    challenge: 'Write pseudocode for a driving task (e.g. drive to a model, do something, return), then turn it into EV3 blocks.',
    challengeSteps: ['Break the task into clear, ordered steps in plain English.', 'Note distances/turns where you can.', 'Translate each line into EV3 blocks.', 'Test and refine — does the plan match the result?'],
    skills: ['Pseudocode', 'Planning', 'Decomposition', 'FLL'],
  },
  {
    id: 'ev3-l7', slug: 'ev3-l7', title: 'Turning', order: 7, moduleId: 'ev3-m2', moduleTitle: M2, emoji: '↩️', pages: 12, difficulty: 2,
    concept: 'spin and pivot turns', conceptExplain: 'Pivot turns rotate around one stopped wheel; spin turns rotate both wheels in place. Set the Move Steering "steering" value: 50/−50 for pivot turns, 100/−100 for spin turns. Program degrees ≠ real degrees, so measure with Port View.',
    objectives: ['Turn the robot a desired number of degrees.', 'Tell the difference between spin and pivot turns.', 'Program both types of turns.', 'Write pseudocode for the challenge.'],
    challenge: 'Baseball player: drive forward and turn to run the bases — then do a 180° turn and return to the same spot.',
    challengeSteps: ['Use Move Steering to drive straight.', 'For a turn, set steering to ±50 (pivot) or ±100 (spin).', 'Use Port View to find the degrees for a real 90°/180° turn.', 'Combine straight + turns to complete the path.'],
    skills: ['Pivot Turn', 'Spin Turn', 'Steering', 'Accuracy'],
  },
  {
    id: 'ev3-l12', slug: 'ev3-l12', title: 'Loops', order: 12, moduleId: 'ev3-m2', moduleTitle: M2, emoji: '🔁', pages: 7, difficulty: 2,
    concept: 'the Loop block', conceptExplain: 'A Loop block repeats actions until an end condition is true. Instead of repeating (move + turn) four times with 8 blocks, put one (move + turn) inside a Loop set to repeat 4 times — neat and easy.',
    objectives: ['Learn how to repeat an action.', 'Learn how to use Loop blocks.'],
    challenge: 'Program the robot to drive around a box (a square path) and return to its starting position — using a loop.',
    challengeSteps: ['Program ONE side + turn (move straight, then a 90° turn).', 'Put those blocks inside a Loop block.', 'Set the loop to repeat 4 times.', 'Test — the robot should trace the square and return.'],
    skills: ['Loops', 'Repetition', 'Efficiency', 'Squares'],
  },
  {
    id: 'ev3-l13', slug: 'ev3-l13', title: 'Switches', order: 13, moduleId: 'ev3-m2', moduleTitle: M2, emoji: '🔀', pages: 8, difficulty: 3,
    concept: 'the Switch block', conceptExplain: 'A Switch block asks a yes/no question (e.g. "is the touch sensor pressed?") and runs different code depending on the answer — that\'s how a robot makes decisions.',
    objectives: ['Make the robot decide between different choices.', 'Learn how to use a Switch block.'],
    challenge: 'Change the EV3 display based on the touch sensor: if pressed, show a happy face; if not, show a sad face.',
    challengeSteps: ['Add a Switch block set to the touch sensor (pressed?).', 'In the "yes" branch, add a Display block with a happy face.', 'In the "no" branch, add a Display block with a sad face.', 'Wrap it in a Loop so it keeps checking; download and test.'],
    skills: ['Switch', 'Conditionals', 'Touch Sensor', 'Display'],
  },
  {
    id: 'ev3-l10', slug: 'ev3-l10', title: 'Introduction to the Touch Sensor', order: 10, moduleId: 'ev3-m3', moduleTitle: M3, emoji: '👆', pages: 12, difficulty: 3,
    concept: 'the Touch Sensor', conceptExplain: 'The Touch Sensor detects pressed, released, or "bumped". With a Wait For block you can run the motor "On" and have the robot act when the sensor is pressed — e.g. stop when it runs into something.',
    objectives: ['Use the Touch Sensor.', 'Use the Wait For block.', 'Tell the difference between the Wait For block and the Sensor block.', 'Know when to use the Move block\'s "On" mode.'],
    challenge: 'Drive straight until you tap the touch sensor — then extend it to hit a wall, back up, and turn 90°.',
    challengeSteps: ['Add Move Steering set to "On" (it needs a following block).', 'Add a Wait For block → Touch Sensor → pressed.', 'Add Move Off to stop.', 'Extend: after the touch, back up and pivot 90° right.'],
    skills: ['Touch Sensor', 'Wait For', 'Motor On/Off', 'Bumped'],
  },
  {
    id: 'ev3-l11', slug: 'ev3-l11', title: 'Introduction to the Colour Sensor', order: 11, moduleId: 'ev3-m3', moduleTitle: M3, emoji: '🎨', pages: 9, difficulty: 3,
    concept: 'the Colour Sensor', conceptExplain: 'The Colour Sensor detects colour (7 colours) and light intensity (reflected or ambient). In Colour Mode the robot can stop at a coloured line. "Brake" stops the motor instantly (use it to stop ON the line); "Coast" lets it roll on.',
    objectives: ['Use the Colour Sensor.', 'Learn the difference between Coast and Brake.'],
    challenge: 'Drive up to a green line and stop exactly on it using the colour sensor.',
    challengeSteps: ['Move Steering set to "On".', 'Wait For → Colour Sensor → Colour Mode → green.', 'Move Off with BRAKE so it stops right on the line.', 'Test and adjust.'],
    skills: ['Colour Sensor', 'Colour Mode', 'Coast vs Brake', 'Wait For'],
  },
  {
    id: 'ev3-l14', slug: 'ev3-l14', title: 'Introduction to the Ultrasonic Sensor', order: 14, moduleId: 'ev3-m3', moduleTitle: M3, emoji: '📡', pages: 11, difficulty: 3,
    concept: 'the Ultrasonic Sensor', conceptExplain: 'The Ultrasonic Sensor measures distance to a surface (cm or inches). Use "Wait Until Ultrasonic" to act at a set distance, and the Ultrasonic block to read the value.',
    objectives: ['Learn about the Ultrasonic Sensor.', 'Use the Wait Until Ultrasonic block.', 'Tell the difference between Wait Until and the read block.'],
    challenge: 'Drive until 20 cm from a wall — then "use the force": move back if your hand is closer than 20 cm, forward if further.',
    challengeSteps: ['Move Steering "On" → Wait Until Ultrasonic < 20 cm → Move Off.', 'For the force challenge: Loop → Switch on Ultrasonic (< 20 cm?).', 'TRUE branch: Move "On" with negative power (back). FALSE: positive power (forward).', 'Test by moving your hand near/far.'],
    skills: ['Ultrasonic Sensor', 'Distance', 'Wait Until', 'Loop + Switch'],
  },
  {
    id: 'ev3-l15', slug: 'ev3-l15', title: 'Basic Line Follower', order: 15, moduleId: 'ev3-m3', moduleTitle: M3, emoji: '🛤️', pages: 12, difficulty: 4,
    concept: 'edge line following', conceptExplain: 'A robot can only tell "on the line vs off the line", so it follows the EDGE: if it sees black, turn one way; if white, turn the other. A Loop with a Switch keeps it correcting. It must start on the correct side of the line.',
    objectives: ['Understand how humans vs robots follow lines.', 'Follow a line using Colour Mode.', 'Follow a line until a sensor is activated.', 'Follow a line for a set distance.', 'Combine sensors, loops, and switches.'],
    challenge: 'Follow the right edge of a line — then make it stop when the touch sensor is pressed, or after a set distance.',
    challengeSteps: ['Add a Loop; inside it add a Switch on the Colour Sensor.', 'If black → turn right; if white → turn left (small steering values curve more smoothly).', 'Test on straight and curved lines; reduce the steering value if it overshoots.', 'Change the loop end condition to stop on a touch press or after a distance.'],
    skills: ['Line Following', 'Loops', 'Switches', 'Colour Sensor'],
  },
];

export const EV3_LESSONS: LessonDetail[] = CONFIGS.map(makeEv3Lesson);

const L = (id: string, title: string, order: number, difficulty: 2 | 3 | 4, skills: string[]) =>
  ({ id, title, duration: '45–60 min', difficulty, skills, order });

export const EV3_COURSE: Course = {
  id: 'ev3-beginner',
  slug: 'beginner-programming',
  title: 'EV3 Beginner Programming (Level I)',
  programId: 'ev3',
  programSlug: 'ev3',
  ageGroup: '10-12',
  level: 'Intermediate',
  description:
    'Learn to program the LEGO MINDSTORMS EV3 robot, FLL-style: driving straight, turning, using Port View to measure, pseudocode, loops, switches, and the sensors (touch, colour, ultrasonic) — building up to a line follower and a final challenge.',
  objectives: [
    'Drive and turn the EV3 robot accurately with the Move Steering block',
    'Measure with Port View instead of guessing',
    'Plan with pseudocode and use loops and switches',
    'Use the touch, colour, and ultrasonic sensors',
    'Build up to line following and a final challenge',
  ],
  duration: '16 sessions × 45–60 minutes',
  totalHours: 14,
  lessonCount: 16,
  prerequisites: [],
  skills: ['EV3 Software', 'Move Steering', 'Sensors', 'Loops & Switches', 'Pseudocode', 'FLL'],
  modules: [
    {
      id: 'ev3-m1', title: M1, order: 1,
      description: 'Build the robot, learn the brick & software, drive and measure.',
      lessons: [
        L('ev3-l2', 'Build a Base Robot', 1, 2, ['Building']),
        L('ev3-l3', 'Intro to the Brick & Software', 2, 2, ['EV3 Software']),
        L('ev3-l4', 'Moving Straight', 4, 2, ['Move Steering']),
        L('ev3-l5', 'Using Sensor Data & Port View', 5, 2, ['Port View']),
      ],
    },
    {
      id: 'ev3-m2', title: M2, order: 2,
      description: 'Pseudocode, turning, display, loops, and switches.',
      lessons: [
        L('ev3-l6', 'Pseudocode', 6, 2, ['Pseudocode']),
        L('ev3-l7', 'Turning', 7, 2, ['Turns']),
        L('ev3-l8', 'Displaying Text & Graphics', 8, 2, ['Display']),
        L('ev3-l9', 'Custom Images & Sounds', 9, 2, ['Media']),
        L('ev3-l12', 'Loops', 12, 2, ['Loops']),
        L('ev3-l13', 'Switches', 13, 3, ['Switches']),
      ],
    },
    {
      id: 'ev3-m3', title: M3, order: 3,
      description: 'Touch, colour, and ultrasonic sensors, line following, and challenges.',
      lessons: [
        L('ev3-l10', 'Introduction to the Touch Sensor', 10, 3, ['Touch Sensor']),
        L('ev3-l11', 'Introduction to the Colour Sensor', 11, 3, ['Colour Sensor']),
        L('ev3-l14', 'Introduction to the Ultrasonic Sensor', 14, 3, ['Ultrasonic']),
        L('ev3-l15', 'Basic Line Follower', 15, 4, ['Line Following']),
        L('ev3-l16', 'Moving an Object', 16, 3, ['Attachments']),
        L('ev3-l17', 'Final Challenge', 17, 4, ['Assessment']),
      ],
    },
  ],
};
