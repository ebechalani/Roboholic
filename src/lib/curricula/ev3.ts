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
    courseTitle: 'EV3 Robotics Programming',
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
const L2A = 'Level II · My Blocks & Reusable Code';
const L2B = 'Level II · Sensors & Reliability';
const L2C = 'Level II · Logic, Variables & Parallelism';
const L3A = 'Level III · Proportional Control';
const L3B = 'Level III · Gyro & Alignment';
const L3C = 'Level III · Data & Systems';

const CONFIGS: Ev3Config[] = [
  {
    id: 'ev3-l2', slug: 'ev3-l2', title: 'Build a Base Robot', order: 1, moduleId: 'ev3-m1', moduleTitle: M1, emoji: '🤖', pages: 7, difficulty: 2,
    concept: 'the driving base robot', conceptExplain: 'Every program needs a robot. The driving base uses two large motors for the wheels (ports B and C) plus spots to add sensors and attachments — it is the foundation for every lesson that follows.',
    objectives: ['Build a sturdy driving base robot.', 'Learn good cable management.', 'Understand where motors, sensors, and attachments connect.'],
    challenge: 'Build the driving base robot, following the instructions, with tidy cables.',
    challengeSteps: ['Follow the build slides step by step.', 'Plug the wheel motors into ports B and C.', 'Route cables so they don\'t snag the wheels or attachments.', 'Check the robot rolls straight and is sturdy.'],
    skills: ['Building', 'Driving Base', 'Cable Management', 'Motors'],
  },
  {
    id: 'ev3-l3', slug: 'ev3-l3', title: 'Intro to the Brick & Software', order: 2, moduleId: 'ev3-m1', moduleTitle: M1, emoji: '🧱', pages: 12, difficulty: 2,
    concept: 'the EV3 brick and software', conceptExplain: 'The EV3 "brick" is the robot\'s computer — buttons (Back, Center, arrows), a screen, and ports for motors and sensors. The EV3 software is where you drag blocks to make a program, then download it to the brick to run.',
    objectives: ['Learn how the EV3 brick operates.', 'Learn the main components of the EV3 software.'],
    challenge: 'Turn on the brick, explore its menus, then build and download a simple one-block program.',
    challengeSteps: ['Power on with the Center button; use Back and the arrows to navigate menus.', 'Open the EV3 software and start a new project.', 'Drag one block (e.g. play a sound or show an image).', 'Download to the brick and run it.'],
    skills: ['EV3 Brick', 'EV3 Software', 'Ports', 'Download & Run'],
  },
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
  {
    id: 'ev3-l8', slug: 'ev3-l8', title: 'Displaying Text & Graphics', order: 8, moduleId: 'ev3-m2', moduleTitle: M2, emoji: '🖥️', pages: 12, difficulty: 2,
    concept: 'the Display block', conceptExplain: 'The Display block shows text and images on the EV3 screen. Grid mode is easy for text (rows & columns); Pixel mode places text/images precisely. It\'s great for showing sensor values — a key debugging tool.',
    objectives: ['Use the Display block to show text and images.', 'Understand why the Display block is useful (e.g. for debugging).'],
    challenge: 'Display "Hello World" in the middle of the screen for 3 seconds — then put "Hello" and "World" on two lines, and show animated eyes while driving.',
    challengeSteps: ['Add a Display block; switch to Grid mode and type your text; set the row/column and size.', 'For two lines, use a second Display block and DON\'T clear the screen on it.', 'For eyes: alternate two eye images with Display + Wait, with Motor On to drive.', 'Tip: display a live sensor value to debug a program.'],
    skills: ['Display', 'Text & Images', 'Grid/Pixel Mode', 'Debugging'],
  },
  {
    id: 'ev3-l9', slug: 'ev3-l9', title: 'Custom Images & Sounds', order: 9, moduleId: 'ev3-m2', moduleTitle: M2, emoji: '🎵', pages: 10, difficulty: 2,
    concept: 'custom images and sounds', conceptExplain: 'The EV3 Image Editor and Sound Editor let you import your own pictures (.png/.jpg/.bmp → converted to the EV3\'s .rgf) and sounds (.mp3), so your Display and Sound blocks can use custom media.',
    objectives: ['Use the Image Editor and Sound Editor to add custom images and sounds to the EV3.'],
    challenge: 'Import a custom image and a custom sound, then use them in your program with the Display and Sound blocks.',
    challengeSteps: ['Open the Image Editor (EV3 menu); open your image; resize, place, and adjust contrast; save it.', 'Open the Sound Editor (Tools menu); open an .mp3; trim it with the blue bar; save it.', 'Add a Display block and pick your custom image; add a Sound block and pick your custom sound.', 'Download and run — your robot shows your picture and plays your sound!'],
    skills: ['Image Editor', 'Sound Editor', 'Custom Media', 'Display & Sound'],
  },
  {
    id: 'ev3-l16', slug: 'ev3-l16', title: 'Picking Up & Moving an Object', order: 16, moduleId: 'ev3-m3', moduleTitle: M3, emoji: '🦾', pages: 12, difficulty: 3,
    concept: 'powered attachments', conceptExplain: 'A powered attachment (an arm/gripper) is driven by a Medium or Large Motor block (not Move Steering — that\'s for the synced wheels). Attach a medium motor to port A (or large to D) to grab and move objects.',
    objectives: ['Program a robot to move a powered attachment arm.', 'Learn how to make useful attachments (incl. FLL tips).'],
    challenge: 'From the start line, drive to a black line, pick up an object with your attachment, and bring it back to the start.',
    challengeSteps: ['Attach a medium motor (port A) with a grabbing/SNAP attachment.', 'Drive to the line with Move Steering; stop.', 'Run the Medium Motor block to close the gripper / lift the object.', 'Drive back (or turn and return) to the start, then release.'],
    skills: ['Attachments', 'Medium/Large Motor', 'Grippers', 'FLL'],
  },
  {
    id: 'ev3-l17', slug: 'ev3-l17', title: 'Final Challenge', order: 17, moduleId: 'ev3-m3', moduleTitle: M3, emoji: '🏁', pages: 6, difficulty: 4,
    concept: 'combining all your skills', conceptExplain: 'The final challenges combine everything from Level I — moving, turning, sensors, loops, switches, and attachments — on a mat or maze you can make with coloured tape (or an old FLL mat).',
    objectives: ['Combine moving, turning, sensors, loops, switches, and attachments to solve a multi-step challenge.'],
    challenge: 'Complete a maze/mat challenge: navigate out of base, through a passage using turns and sensors, and stop exactly on the 3rd line (using a loop + sensor).',
    challengeSteps: ['Plan the whole run as pseudocode first.', 'Maze 1: drive and turn through the passage to the END.', 'Maze 2: use 2–3 sensors (touch a wall, avoid one, follow to the end).', 'Stop on the line: loop + colour sensor, counting lines, stop on the 3rd.'],
    skills: ['Integration', 'Sensors', 'Loops & Switches', 'Problem Solving'],
  },

  // ─── LEVEL II (Intermediate) ─────────────────────────────────────
  {
    id: 'ev3-ii3', slug: 'ev3-ii3', title: 'Data Wires', order: 18, moduleId: 'ev3-m4', moduleTitle: L2A, emoji: '🔌', pages: 12, difficulty: 3,
    concept: 'data wires', conceptExplain: 'A data wire carries a value (a sensor reading, a number) out of one block and into another block\'s input — so blocks can share data instead of using fixed numbers.',
    objectives: ['Understand what a data wire is.', 'Pass a sensor value to another block with a wire.', 'Display a live sensor reading.'],
    challenge: 'Wire the ultrasonic sensor\'s distance into a Display block so the screen shows the live distance.',
    challengeSteps: ['Add the ultrasonic Sensor block in measure mode.', 'Drag a data wire from its output to a Display (text) block input.', 'Wrap it in a loop so it updates continuously.', 'Drive toward a wall and watch the number change.'],
    skills: ['Data Wires', 'Sensors', 'Display'],
  },
  {
    id: 'ev3-ii4', slug: 'ev3-ii4', title: 'My Blocks with Inputs & Outputs', order: 19, moduleId: 'ev3-m4', moduleTitle: L2A, emoji: '🧩', pages: 12, difficulty: 3,
    concept: 'My Blocks (custom blocks) with parameters', conceptExplain: 'A My Block bundles several blocks into one reusable block. Adding inputs/outputs (parameters) lets you reuse it with different values — like writing your own function.',
    objectives: ['Create a My Block.', 'Add inputs and outputs (parameters).', 'Reuse the block with different values.'],
    challenge: 'Build a My Block that takes an input value and uses it (e.g. a beep-N-times block).',
    challengeSteps: ['Select the blocks to bundle → Tools → My Block Builder.', 'Add a parameter (input) to the block.', 'Use the parameter inside the block.', 'Call the My Block with different inputs to test.'],
    skills: ['My Blocks', 'Parameters', 'Reuse'],
  },
  {
    id: 'ev3-ii5', slug: 'ev3-ii5', title: 'Moving with My Blocks', order: 20, moduleId: 'ev3-m4', moduleTitle: L2A, emoji: '📏', pages: 12, difficulty: 3,
    concept: 'a Move-Distance My Block', conceptExplain: 'Wrap the maths of "drive X cm" into a My Block with a distance input, so you can drive exact distances all program long without redoing the wheel-rotation calculation.',
    objectives: ['Convert cm to motor degrees/rotations.', 'Build a MoveCM My Block with a distance input.'],
    challenge: 'Make a MoveCM(distance) block and use it to drive an exact 30 cm.',
    challengeSteps: ['Work out rotations per cm for your wheel.', 'Build a My Block with a "cm" input that drives that far.', 'Call MoveCM(30) and measure with a ruler.', 'Tune until accurate.'],
    skills: ['My Blocks', 'Distance', 'Maths'],
  },
  {
    id: 'ev3-ii6', slug: 'ev3-ii6', title: 'Turning with My Blocks', order: 21, moduleId: 'ev3-m4', moduleTitle: L2A, emoji: '🔄', pages: 12, difficulty: 3,
    concept: 'a Turn-Degrees My Block', conceptExplain: 'Wrap turning into a My Block with a "degrees" input so the robot turns a real number of degrees (using Port View / measured values) every time.',
    objectives: ['Build a Turn My Block with a degrees input.', 'Make turns accurate and reusable.'],
    challenge: 'Make a Turn(degrees) block and drive a square using it.',
    challengeSteps: ['Measure the motor degrees for a real 90° turn.', 'Build a My Block with a "degrees" input.', 'Call Turn(90) four times (in a loop) to trace a square.', 'Adjust for accuracy.'],
    skills: ['My Blocks', 'Turning', 'Accuracy'],
  },
  {
    id: 'ev3-ii7', slug: 'ev3-ii7', title: 'Colour Line Follower with My Blocks', order: 22, moduleId: 'ev3-m4', moduleTitle: L2A, emoji: '🛤️', pages: 12, difficulty: 4,
    concept: 'a reusable line-follower My Block', conceptExplain: 'Package the line-following loop into a My Block (e.g. with a distance/duration input) so you can drop "follow the line" into any program.',
    objectives: ['Wrap line following in a My Block.', 'Follow a line for a set distance.'],
    challenge: 'Build a LineFollow(distance) My Block that follows the line a set distance, then stops.',
    challengeSteps: ['Build the basic edge line-follower (switch on colour).', 'Wrap it in a My Block with a distance input.', 'Use a data wire to stop after the distance.', 'Call it to follow then continue the program.'],
    skills: ['My Blocks', 'Line Following', 'Data Wires'],
  },
  {
    id: 'ev3-ii10', slug: 'ev3-ii10', title: 'Move Blocks (Tank vs Steering)', order: 23, moduleId: 'ev3-m4', moduleTitle: L2A, emoji: '🚜', pages: 12, difficulty: 3,
    concept: 'the different Move blocks', conceptExplain: 'Move Steering and Move Tank both drive two synced motors but set them differently (one steering value vs. two power values). Knowing both gives finer control.',
    objectives: ['Use Move Tank and Move Steering.', 'Understand motor sync and when to use each.'],
    challenge: 'Drive a curve with Move Tank (different power to each wheel), then the same path with Move Steering.',
    challengeSteps: ['Use Move Tank with two power values to curve.', 'Recreate the curve with Move Steering.', 'Compare which is easier for the path.', 'Pick the right block for the job.'],
    skills: ['Move Tank', 'Move Steering', 'Motor Sync'],
  },
  {
    id: 'ev3-ii1', slug: 'ev3-ii1', title: 'Basic Ultrasonic Wall Follower', order: 24, moduleId: 'ev3-m5', moduleTitle: L2B, emoji: '🧱', pages: 7, difficulty: 3,
    concept: 'wall following with the ultrasonic sensor', conceptExplain: 'By steering based on the ultrasonic distance to a wall, the robot keeps a set gap — turning toward the wall when too far and away when too close.',
    objectives: ['Use the ultrasonic sensor to follow a wall.', 'Keep a set distance from the wall.'],
    challenge: 'Make the robot drive alongside a wall, keeping about 15 cm away.',
    challengeSteps: ['Loop: read the ultrasonic distance.', 'If too far from the wall → steer toward it; if too close → steer away.', 'Tune the target distance and steering amount.', 'Test along a straight wall, then a corner.'],
    skills: ['Ultrasonic', 'Wall Following', 'Loops'],
  },
  {
    id: 'ev3-ii2', slug: 'ev3-ii2', title: 'Brick Buttons as Sensors', order: 25, moduleId: 'ev3-m5', moduleTitle: L2B, emoji: '🎛️', pages: 8, difficulty: 3,
    concept: 'the EV3 brick buttons as inputs', conceptExplain: 'The brick\'s buttons (up/down/left/right/centre) can be read like a sensor, so the robot can react to button presses — handy for menus and manual control.',
    objectives: ['Read the brick buttons in a program.', 'React differently to different buttons.'],
    challenge: 'Drive the robot with the brick buttons (up = forward, left/right = turn, centre = stop).',
    challengeSteps: ['Use the Brick Buttons sensor block in a loop.', 'Switch on which button is pressed.', 'Map each button to a motor action.', 'Test driving it like a remote.'],
    skills: ['Brick Buttons', 'Input', 'Switches'],
  },
  {
    id: 'ev3-ii8', slug: 'ev3-ii8', title: 'Infrared Sensor & Beacon', order: 26, moduleId: 'ev3-m5', moduleTitle: L2B, emoji: '📶', pages: 12, difficulty: 3,
    concept: 'the Infrared sensor and beacon', conceptExplain: 'The IR sensor measures proximity and can track the IR beacon\'s direction/distance — letting the robot detect obstacles or follow/seek the beacon (the Home-Edition equivalent of the ultrasonic).',
    objectives: ['Use the IR sensor in proximity mode.', 'Track the IR beacon.'],
    challenge: 'Make the robot stop when something is close (proximity), then follow the IR beacon.',
    challengeSteps: ['Read the IR sensor in proximity mode; stop when close.', 'Switch to Beacon mode; read heading/proximity.', 'Steer toward the beacon\'s heading.', 'Test seeking the beacon around the room.'],
    skills: ['Infrared', 'Beacon', 'Proximity'],
  },
  {
    id: 'ev3-ii9', slug: 'ev3-ii9', title: 'Debugging Techniques', order: 27, moduleId: 'ev3-m5', moduleTitle: L2B, emoji: '🐞', pages: 12, difficulty: 3,
    concept: 'systematic debugging', conceptExplain: 'Debugging is finding and fixing why a program misbehaves: read it top-to-bottom, use Port View and the Display to see values, isolate sections, and test one change at a time.',
    objectives: ['Use a systematic approach to find bugs.', 'Use Port View / Display to inspect values.'],
    challenge: 'Take a program that misbehaves and debug it: locate the fault, fix it, and verify.',
    challengeSteps: ['Reproduce the problem and read the code as a sentence.', 'Display/Port-View the key sensor or variable values.', 'Isolate and test one section at a time.', 'Fix one thing, re-test, repeat.'],
    skills: ['Debugging', 'Port View', 'Problem Solving'],
  },
  {
    id: 'ev3-ii11', slug: 'ev3-ii11', title: 'Reliability Techniques', order: 28, moduleId: 'ev3-m5', moduleTitle: L2B, emoji: '🎯', pages: 12, difficulty: 3,
    concept: 'making runs reliable', conceptExplain: 'Competition runs must work every time. Techniques: start square against a wall, reset gyro/encoders at the start, square on lines, and avoid relying on shaky guesses.',
    objectives: ['Use squaring and resets for consistent starts.', 'Make a run repeatable.'],
    challenge: 'Take a working run and make it reliable so it succeeds 5 times in a row.',
    challengeSteps: ['Start square against a wall/jig for a consistent position.', 'Reset sensors/encoders at the start.', 'Square on a line mid-run to re-align.', 'Run it 5 times and fix what drifts.'],
    skills: ['Reliability', 'Squaring', 'Resets', 'FLL'],
  },
  {
    id: 'ev3-ii12', slug: 'ev3-ii12', title: 'Colour Sensor Calibration', order: 29, moduleId: 'ev3-m5', moduleTitle: L2B, emoji: '🎚️', pages: 7, difficulty: 3,
    concept: 'calibrating the colour sensor', conceptExplain: 'Reflected-light readings differ with lighting and surface. Calibrating the sensor\'s min (black) and max (white) makes readings consistent (0–100) so line following works reliably anywhere.',
    objectives: ['Calibrate the colour sensor\'s min and max.', 'Get consistent reflected-light readings.'],
    challenge: 'Calibrate the colour sensor on your mat, then run a line follower that works under different lighting.',
    challengeSteps: ['Use the calibration blocks: set min on black, max on white.', 'Check readings now span ~0–100.', 'Run your line follower with the calibrated values.', 'Test under brighter/dimmer light.'],
    skills: ['Colour Sensor', 'Calibration', 'Reliability'],
  },
  {
    id: 'ev3-ii13', slug: 'ev3-ii13', title: 'Variables', order: 30, moduleId: 'ev3-m6', moduleTitle: L2C, emoji: '📦', pages: 12, difficulty: 3,
    concept: 'variables', conceptExplain: 'A variable is a named store for a value you can read and change — used for counters, totals, and remembering state across the program.',
    objectives: ['Create and use a variable.', 'Read, write, and update its value.'],
    challenge: 'Use a variable to count how many lines the robot crosses, and show the count.',
    challengeSteps: ['Create a variable "count" set to 0.', 'Each time the colour sensor sees a line, add 1 (read → +1 → write).', 'Display the count live.', 'Stop after a target count.'],
    skills: ['Variables', 'Counters', 'Data Wires'],
  },
  {
    id: 'ev3-ii14', slug: 'ev3-ii14', title: 'Logic Operations & Decision Making', order: 31, moduleId: 'ev3-m6', moduleTitle: L2C, emoji: '🔀', pages: 7, difficulty: 4,
    concept: 'logic operators (AND / OR / NOT)', conceptExplain: 'Logic blocks combine true/false values: AND (both true), OR (either true), NOT (flip). They let the robot decide based on more than one condition at once.',
    objectives: ['Use the Logic block (AND/OR/NOT).', 'Make decisions from two conditions.'],
    challenge: 'Make the robot act only when TWO conditions are true (e.g. sees black AND something is close).',
    challengeSteps: ['Read two sensors into Compare blocks.', 'Combine them with a Logic (AND/OR) block.', 'Feed the result into a Switch.', 'Test that it triggers only as intended.'],
    skills: ['Logic', 'AND/OR/NOT', 'Decisions'],
  },
  {
    id: 'ev3-ii15', slug: 'ev3-ii15', title: 'Introduction to Parallel Beams', order: 32, moduleId: 'ev3-m6', moduleTitle: L2C, emoji: '🪢', pages: 8, difficulty: 4,
    concept: 'parallel sequences (beams)', conceptExplain: 'EV3 can run two sequences ("beams") at the same time from one start block — e.g. drive while also watching a sensor or animating the screen.',
    objectives: ['Run two beams of code in parallel.', 'Coordinate simultaneous actions.'],
    challenge: 'Make the robot drive forward while, at the same time, showing a changing face on the screen.',
    challengeSteps: ['From the Start block, drag two separate sequence beams.', 'Beam 1: drive. Beam 2: loop the display animation.', 'Run both at once and observe.', 'Add a sensor watch on a third beam if you like.'],
    skills: ['Parallel Beams', 'Multitasking', 'Coordination'],
  },

  // ─── LEVEL III (Advanced) ────────────────────────────────────────
  {
    id: 'ev3-iii3', slug: 'ev3-iii3', title: 'Introduction to Proportional Control', order: 33, moduleId: 'ev3-m7', moduleTitle: L3A, emoji: '📈', pages: 12, difficulty: 4,
    concept: 'proportional control', conceptExplain: 'Instead of hard "turn left / turn right", proportional control corrects by an amount proportional to the error (how far off you are) × a gain. Bigger error → bigger correction → smooth, accurate behaviour.',
    objectives: ['Understand error, gain, and proportional correction.', 'Replace harsh on/off control with smooth proportional control.'],
    challenge: 'Compute an error from a sensor and feed (error × gain) into the steering to react smoothly.',
    challengeSteps: ['Pick a target value (e.g. colour sensor = 50 at the line edge).', 'Error = reading − target; multiply by a gain.', 'Wire the result into the Move Steering "steering" input.', 'Tune the gain until it\'s smooth, not wobbly.'],
    skills: ['Proportional Control', 'Error & Gain', 'Data Wires'],
  },
  {
    id: 'ev3-iii4', slug: 'ev3-iii4', title: 'Proportional Line Follower', order: 34, moduleId: 'ev3-m7', moduleTitle: L3A, emoji: '〰️', pages: 12, difficulty: 4,
    concept: 'proportional line following', conceptExplain: 'A proportional line follower steers by (light − target) × gain, so it hugs the line edge smoothly instead of zig-zagging like the basic on/off follower.',
    objectives: ['Build a smooth proportional line follower.', 'Tune the gain for speed vs. stability.'],
    challenge: 'Replace your basic line follower with a proportional one and follow a curvy line smoothly.',
    challengeSteps: ['Error = reflected light − edge value (≈50).', 'Steering = error × gain.', 'Put it in a loop with Move Steering.', 'Tune gain; raise speed once stable.'],
    skills: ['Proportional Control', 'Line Following', 'Tuning'],
  },
  {
    id: 'ev3-iii5', slug: 'ev3-iii5', title: 'Proportional Two-Colour Line Follower', order: 35, moduleId: 'ev3-m7', moduleTitle: L3A, emoji: '🎨', pages: 12, difficulty: 4,
    concept: 'two-colour proportional following', conceptExplain: 'Follow the boundary between two colours using the difference in their reflected light as the error — useful when the line isn\'t simple black-on-white.',
    objectives: ['Follow the edge between two colours proportionally.'],
    challenge: 'Proportionally follow the boundary between two colours around a course.',
    challengeSteps: ['Identify the two colours\' reflected-light values.', 'Target = midpoint between them; error = reading − target.', 'Steering = error × gain in a loop.', 'Tune and test on the two-colour track.'],
    skills: ['Proportional Control', 'Colour Sensor', 'Edges'],
  },
  {
    id: 'ev3-iii6', slug: 'ev3-iii6', title: 'Proportional Ultrasonic Wall Follower', order: 36, moduleId: 'ev3-m7', moduleTitle: L3A, emoji: '🧱', pages: 5, difficulty: 4,
    concept: 'proportional wall following', conceptExplain: 'Keep a set distance from a wall by steering proportionally to (distance − target): drift closer → steer out, drift away → steer in. Smoother than on/off wall following.',
    objectives: ['Follow a wall smoothly with proportional control.'],
    challenge: 'Follow a wall at a steady 15 cm using proportional steering.',
    challengeSteps: ['Error = ultrasonic distance − 15.', 'Steering = error × gain.', 'Loop with Move Steering.', 'Tune the gain so it doesn\'t oscillate.'],
    skills: ['Proportional Control', 'Ultrasonic', 'Wall Following'],
  },
  {
    id: 'ev3-iii7', slug: 'ev3-iii7', title: 'Ramping Up (Acceleration)', order: 37, moduleId: 'ev3-m7', moduleTitle: L3A, emoji: '🛫', pages: 12, difficulty: 4,
    concept: 'ramping power up and down', conceptExplain: 'Starting/stopping at full power makes wheels slip and the robot veer. Ramping gradually increases power at the start (and decreases at the end) for accuracy and smoothness.',
    objectives: ['Ramp motor power up gradually using a loop + variable.', 'Improve straightness and accuracy.'],
    challenge: 'Drive a set distance, ramping power up at the start so the robot doesn\'t jerk or slip.',
    challengeSteps: ['Use a variable for power, starting low.', 'In a loop, increase power a little each cycle up to a max.', 'Drive until the target distance.', 'Compare accuracy vs. starting at full power.'],
    skills: ['Ramping', 'Variables', 'Accuracy'],
  },
  {
    id: 'ev3-iii8', slug: 'ev3-iii8', title: 'Introduction to the Gyro Sensor', order: 38, moduleId: 'ev3-m8', moduleTitle: L3B, emoji: '🧭', pages: 12, difficulty: 4,
    concept: 'the Gyro sensor', conceptExplain: 'The gyro measures the robot\'s rotation angle and rate of turn. It must be reset (and kept still) at the start because it can drift — once calibrated it gives accurate heading.',
    objectives: ['Read the gyro angle and rate.', 'Reset the gyro and handle drift.'],
    challenge: 'Reset the gyro and display the live angle as you turn the robot by hand.',
    challengeSteps: ['Keep the robot still; reset the gyro.', 'Read the angle and show it on the screen in a loop.', 'Turn the robot and watch the angle.', 'Note any drift and re-reset.'],
    skills: ['Gyro Sensor', 'Angle', 'Calibration'],
  },
  {
    id: 'ev3-iii9', slug: 'ev3-iii9', title: 'Gyro Sensor Turns', order: 39, moduleId: 'ev3-m8', moduleTitle: L3B, emoji: '🔄', pages: 12, difficulty: 4,
    concept: 'accurate turns with the gyro', conceptExplain: 'Turning "until the gyro angle reaches N°" is far more accurate and repeatable than guessing motor degrees — the robot turns exactly the angle you want.',
    objectives: ['Turn an exact angle using the gyro.', 'Make turns repeatable.'],
    challenge: 'Make the robot turn exactly 90° using the gyro, then drive a precise square.',
    challengeSteps: ['Reset the gyro.', 'Turn while the loop waits until |angle| ≥ 90.', 'Wrap it in a Turn-by-gyro My Block.', 'Drive a square and check it closes.'],
    skills: ['Gyro Sensor', 'Turns', 'Accuracy'],
  },
  {
    id: 'ev3-iii10', slug: 'ev3-iii10', title: 'Gyro: Move Straight & Wall Follow', order: 40, moduleId: 'ev3-m8', moduleTitle: L3B, emoji: '📏', pages: 10, difficulty: 4,
    concept: 'gyro-corrected driving', conceptExplain: 'Use the gyro angle as the error to drive perfectly straight (steer to keep angle = 0) — and the same idea to hold a heading along a wall.',
    objectives: ['Drive straight using gyro correction.', 'Hold a heading proportionally.'],
    challenge: 'Drive dead-straight for 2 m using the gyro to correct any drift.',
    challengeSteps: ['Reset the gyro to 0.', 'Steering = gyro angle × gain (proportional).', 'Loop with Move Steering until the distance.', 'Test that it tracks straight.'],
    skills: ['Gyro Sensor', 'Proportional Control', 'Straight Driving'],
  },
  {
    id: 'ev3-iii11', slug: 'ev3-iii11', title: 'Squaring on Lines', order: 41, moduleId: 'ev3-m8', moduleTitle: L3B, emoji: '📐', pages: 12, difficulty: 4,
    concept: 'squaring (aligning) on a line', conceptExplain: 'With two colour sensors, the robot can square up to a line: each wheel stops when its sensor hits the line, leaving the robot perfectly aligned — a key reliability trick.',
    objectives: ['Use two colour sensors to align to a line.', 'Improve run reliability by re-squaring.'],
    challenge: 'Drive forward until the robot is squared on a black line using two sensors.',
    challengeSteps: ['Run both motors forward independently.', 'Stop the left motor when the left sensor sees the line; same for right.', 'When both have stopped, the robot is square.', 'Use it mid-run to re-align.'],
    skills: ['Squaring', 'Two Sensors', 'Reliability'],
  },
  {
    id: 'ev3-iii12', slug: 'ev3-iii12', title: 'Stall Detection', order: 42, moduleId: 'ev3-m8', moduleTitle: L3B, emoji: '🛑', pages: 10, difficulty: 4,
    concept: 'detecting a stalled motor', conceptExplain: 'When a motor is pushing against something it stops turning (stalls). Watching the motor\'s rotation: if it isn\'t changing while powered, it has stalled — useful to detect walls or "fully raised" arms without extra sensors.',
    objectives: ['Detect when a motor has stalled.', 'React to a stall (stop / next step).'],
    challenge: 'Drive into a wall and detect the stall (rotation stops) to know you\'ve arrived.',
    challengeSteps: ['Power the drive motors forward.', 'In a loop, check if the rotation has changed.', 'If it hasn\'t changed (stalled), stop.', 'Use it to square against a wall.'],
    skills: ['Stall Detection', 'Motor Rotation', 'Sensing'],
  },
  {
    id: 'ev3-iii1', slug: 'ev3-iii1', title: 'Parallel Beam Synchronization', order: 43, moduleId: 'ev3-m9', moduleTitle: L3C, emoji: '🪢', pages: 11, difficulty: 4,
    concept: 'synchronising parallel beams', conceptExplain: 'When two beams run at once, you sometimes need them to wait for each other. Using variables/flags as signals, one beam can tell the other when to proceed — coordinating multitasking.',
    objectives: ['Run parallel beams that coordinate.', 'Use a flag/variable to synchronise them.'],
    challenge: 'Run two beams where beam 2 waits for beam 1 to finish a step before continuing.',
    challengeSteps: ['Create a "ready" variable.', 'Beam 1 does its task, then sets ready = true.', 'Beam 2 waits until ready = true, then continues.', 'Test the hand-off.'],
    skills: ['Parallel Beams', 'Synchronisation', 'Variables'],
  },
  {
    id: 'ev3-iii2', slug: 'ev3-iii2', title: 'Arrays', order: 44, moduleId: 'ev3-m9', moduleTitle: L3C, emoji: '🗃️', pages: 12, difficulty: 4,
    concept: 'arrays (lists of values)', conceptExplain: 'An array stores many values under one name (e.g. a series of readings or moves). You can fill it, read items by index, and loop over it — essential for data and sequences.',
    objectives: ['Create and fill an array.', 'Read and use array elements.'],
    challenge: 'Record a series of sensor readings into an array, then replay/average them.',
    challengeSteps: ['Create an array variable.', 'In a loop, append readings (write by index).', 'Loop again to read them back.', 'Compute something (e.g. an average).'],
    skills: ['Arrays', 'Indexing', 'Data'],
  },
  {
    id: 'ev3-iii13', slug: 'ev3-iii13', title: 'Menu System', order: 45, moduleId: 'ev3-m9', moduleTitle: L3C, emoji: '📋', pages: 8, difficulty: 4,
    concept: 'an on-brick menu', conceptExplain: 'A menu lets you choose which program/run to launch using the brick buttons + screen — so one download holds many missions, picked on the field.',
    objectives: ['Build a menu using the brick buttons and display.', 'Launch different routines from the menu.'],
    challenge: 'Build a menu: scroll options with the buttons, press to run the chosen routine.',
    challengeSteps: ['Display the current option; use up/down to change a "selection" variable.', 'Show the selected option clearly.', 'On centre press, run the matching My Block.', 'Return to the menu afterwards.'],
    skills: ['Menu', 'Brick Buttons', 'Variables', 'My Blocks'],
  },
  {
    id: 'ev3-iii14', slug: 'ev3-iii14', title: 'Data Logging', order: 46, moduleId: 'ev3-m9', moduleTitle: L3C, emoji: '📊', pages: 11, difficulty: 4,
    concept: 'data logging', conceptExplain: 'Record sensor values over time (to an array or the EV3\'s data log) so you can analyse behaviour — e.g. how the light reading changes along a line, or speed over a run.',
    objectives: ['Log sensor data over time.', 'Review/analyse the logged values.'],
    challenge: 'Log the colour sensor\'s reading as the robot drives, then review the data.',
    challengeSteps: ['In a loop, read the sensor and store each value (array) with a timer.', 'Drive the route while logging.', 'Display or export the values.', 'Discuss what the data shows.'],
    skills: ['Data Logging', 'Arrays', 'Analysis'],
  },
];

export const EV3_LESSONS: LessonDetail[] = CONFIGS.map(makeEv3Lesson);

const L = (id: string, title: string, order: number, difficulty: 2 | 3 | 4, skills: string[]) =>
  ({ id, title, duration: '45–60 min', difficulty, skills, order });

export const EV3_COURSE: Course = {
  id: 'ev3-beginner',
  slug: 'beginner-programming',
  title: 'EV3 Robotics Programming (Levels I–III)',
  programId: 'ev3',
  programSlug: 'ev3',
  ageGroup: '10-12',
  level: 'Intermediate',
  description:
    'Program the LEGO MINDSTORMS EV3 robot FLL-style. Level I covers driving, turning, Port View, pseudocode, loops, switches, and the sensors. Level II adds data wires, My Blocks, wall following, calibration, reliability, variables, logic, and parallel beams. Level III reaches competition technique — proportional control, the gyro sensor, ramping, squaring, stall detection, arrays, menus, and data logging.',
  objectives: [
    'Drive and turn the EV3 accurately with Move Steering / Move Tank',
    'Measure with Port View and pass values with data wires',
    'Build reusable My Blocks with inputs',
    'Use touch, colour, ultrasonic, IR, and gyro sensors — and calibrate them',
    'Use variables, logic, parallel beams, and reliability techniques',
    'Apply proportional control, ramping, squaring, stall detection, arrays, menus, and data logging',
  ],
  duration: '45 sessions × 45–60 minutes',
  totalHours: 41,
  lessonCount: 45,
  prerequisites: [],
  skills: ['EV3 Software', 'My Blocks', 'Sensors', 'Data Wires', 'Proportional Control', 'Gyro', 'Variables & Logic', 'FLL'],
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
    {
      id: 'ev3-m4', title: L2A, order: 4,
      description: 'Data wires and reusable My Blocks for moving, turning, and line following.',
      lessons: [
        L('ev3-ii3', 'Data Wires', 18, 3, ['Data Wires']),
        L('ev3-ii4', 'My Blocks with Inputs & Outputs', 19, 3, ['My Blocks']),
        L('ev3-ii5', 'Moving with My Blocks', 20, 3, ['My Blocks']),
        L('ev3-ii6', 'Turning with My Blocks', 21, 3, ['My Blocks']),
        L('ev3-ii7', 'Colour Line Follower with My Blocks', 22, 4, ['Line Following']),
        L('ev3-ii10', 'Move Blocks (Tank vs Steering)', 23, 3, ['Move Tank']),
      ],
    },
    {
      id: 'ev3-m5', title: L2B, order: 5,
      description: 'Wall following, brick buttons, IR, debugging, reliability, and calibration.',
      lessons: [
        L('ev3-ii1', 'Basic Ultrasonic Wall Follower', 24, 3, ['Ultrasonic']),
        L('ev3-ii2', 'Brick Buttons as Sensors', 25, 3, ['Brick Buttons']),
        L('ev3-ii8', 'Infrared Sensor & Beacon', 26, 3, ['Infrared']),
        L('ev3-ii9', 'Debugging Techniques', 27, 3, ['Debugging']),
        L('ev3-ii11', 'Reliability Techniques', 28, 3, ['Reliability']),
        L('ev3-ii12', 'Colour Sensor Calibration', 29, 3, ['Calibration']),
      ],
    },
    {
      id: 'ev3-m6', title: L2C, order: 6,
      description: 'Variables, logic operations, and running code in parallel.',
      lessons: [
        L('ev3-ii13', 'Variables', 30, 3, ['Variables']),
        L('ev3-ii14', 'Logic Operations & Decision Making', 31, 4, ['Logic']),
        L('ev3-ii15', 'Introduction to Parallel Beams', 32, 4, ['Parallel Beams']),
      ],
    },
    {
      id: 'ev3-m7', title: L3A, order: 7,
      description: 'Smooth, accurate control with proportional steering and ramping.',
      lessons: [
        L('ev3-iii3', 'Introduction to Proportional Control', 33, 4, ['Proportional Control']),
        L('ev3-iii4', 'Proportional Line Follower', 34, 4, ['Line Following']),
        L('ev3-iii5', 'Proportional Two-Colour Line Follower', 35, 4, ['Colour Sensor']),
        L('ev3-iii6', 'Proportional Ultrasonic Wall Follower', 36, 4, ['Wall Following']),
        L('ev3-iii7', 'Ramping Up (Acceleration)', 37, 4, ['Ramping']),
      ],
    },
    {
      id: 'ev3-m8', title: L3B, order: 8,
      description: 'The gyro sensor, accurate turns, straight driving, squaring, and stall detection.',
      lessons: [
        L('ev3-iii8', 'Introduction to the Gyro Sensor', 38, 4, ['Gyro Sensor']),
        L('ev3-iii9', 'Gyro Sensor Turns', 39, 4, ['Gyro Sensor']),
        L('ev3-iii10', 'Gyro: Move Straight & Wall Follow', 40, 4, ['Gyro Sensor']),
        L('ev3-iii11', 'Squaring on Lines', 41, 4, ['Squaring']),
        L('ev3-iii12', 'Stall Detection', 42, 4, ['Stall Detection']),
      ],
    },
    {
      id: 'ev3-m9', title: L3C, order: 9,
      description: 'Coordinating parallel code, arrays, on-brick menus, and data logging.',
      lessons: [
        L('ev3-iii1', 'Parallel Beam Synchronization', 43, 4, ['Synchronisation']),
        L('ev3-iii2', 'Arrays', 44, 4, ['Arrays']),
        L('ev3-iii13', 'Menu System', 45, 4, ['Menu']),
        L('ev3-iii14', 'Data Logging', 46, 4, ['Data Logging']),
      ],
    },
  ],
};
