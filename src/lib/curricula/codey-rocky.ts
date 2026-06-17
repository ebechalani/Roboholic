import type { Course, LessonDetail, LessonImage, LessonSection, QuizQuestion } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Codey Rocky — "Block Coding & Game Design"
//  Source: official lesson Sheets (Makeblock), text via pdftotext,
//  sheet pages rasterized into in-app galleries (with the coding blocks).
//  Ages 8–9. Lesson structure: Objectives → Situated Learning →
//  Key Concept → Learn through Play → Coding Practice → Create.
// ════════════════════════════════════════════════════════════════

interface CodeyConfig {
  id: string;            // 'codey-l1'
  slug: string;          // image folder 'codey-l1'
  title: string;
  order: number;
  moduleId: string;
  moduleTitle: string;
  emoji: string;
  pages: number;         // rasterized sheet pages (p-01 cover, p-02..N content)
  concept: string;       // 'Program', 'Events', 'Loop'…
  conceptExplain: string;
  objectives: string[];
  situated: string;      // engage scenario
  play?: string;         // unplugged 'learn through play' activity
  codingTitle: string;
  codingSteps: string[]; // the Coding Practice / program sequence
  studentMission: string[];
  create: string[];      // Imitate & Create tasks
  reflect: string;       // self-review prompt 3
  skills: string[];
  quiz?: QuizQuestion[];
}

// Sheet pages p-02..N as a gallery (p-01 is the cover → used as hero).
function sheetGallery(slug: string, pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${slug}/p-${n}.png`, kind: 'photo', caption: `Lesson sheet — page ${i}` });
  }
  return imgs;
}

function makeCodeyLesson(c: CodeyConfig): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Have a Codey Rocky and a laptop with mBlock 5 installed per child or pair; connect Codey via USB and power it on.',
        `Build the "${c.codingTitle}" program yourself first so you can demonstrate it.`,
        'Open the lesson Sheet (Files section) — the exact coding blocks are shown on the sheet pages below.',
        `Today's computing concept: ${c.concept}. Be ready to explain it simply: ${c.conceptExplain}`,
        'The lesson Sheet is the official content; the discussion prompts and timings here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `ENGAGE — Situated Learning (5–10 min): ${c.situated}`, tip: 'Let students relate the idea to their own experience before any code.' },
        { step: 2, instruction: `EXPLAIN — Key Concept "${c.concept}" (5 min): ${c.conceptExplain}` },
        ...(c.play ? [{ step: 3, instruction: `PLAY — Learn through Play (5–10 min): ${c.play}`, coachNote: 'The unplugged game makes the concept physical before coding.' }] : []),
        { step: c.play ? 4 : 3, instruction: `CODE — Coding Practice "${c.codingTitle}" (15–20 min): demonstrate, then have students build the program (steps in the Main Activity).` },
        { step: c.play ? 5 : 4, instruction: 'SHARE & REVIEW (5 min): students show their projects and reflect — what they made, any bug they hit, and how they fixed it.' },
      ],
    },
    {
      type: 'student_steps',
      title: `Your Mission: ${c.codingTitle}! ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Your Mission: ${c.codingTitle}! ${c.emoji}`,
      content: c.studentMission,
      studentContent: c.studentMission,
    },
    {
      type: 'activity',
      title: `Coding Practice: ${c.codingTitle}`,
      emoji: '🛠️',
      content: [
        `Build the program step by step (the exact blocks are on the lesson-sheet pages below):`,
        ...c.codingSteps,
      ],
      studentContent: [
        `Make ${c.codingTitle}! 🚀`,
        ...c.codingSteps,
        'Upload to Codey and try it!',
      ],
      images: sheetGallery(c.slug, c.pages),
    },
    {
      type: 'challenge',
      title: 'Imitate & Create',
      emoji: '🎚️',
      content: c.create,
      studentContent: c.create.map(t => '✨ ' + t),
    },
    {
      type: 'extra_challenge',
      title: 'Extra Challenge: Fast Finishers',
      emoji: '🌟',
      content: [
        `Add sound, lights, or extra images to make your ${c.concept.toLowerCase()} project more fun.`,
        `Explain the idea of ${c.concept} to a partner in your own words.`,
      ],
      studentContent: [`🎨 Add sounds/lights to your project!`, `🗣️ Explain "${c.concept}" to a friend`],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'Codey won\'t connect to mBlock', cause: 'Wrong serial port or USB not seated.', solution: 'Click Connect in mBlock, pick the correct serial port, re-seat the USB cable, and make sure Codey is powered on.' },
        { problem: 'The program doesn\'t run on Codey', cause: 'Program not uploaded, or still in Live mode.', solution: 'Upload the program to Codey, then unplug and press the trigger (e.g. button A).' },
        { problem: 'Nothing happens when expected — Suggested', cause: 'Missing the Event block that starts the program.', solution: 'Make sure the script starts with the right Event (e.g. "when button A pressed" / "when Codey starts up").' },
        { problem: 'A block seems to do nothing — Suggested', cause: 'A bug — a wrong value or block order.', solution: 'Read the script top-to-bottom like a sentence; check values and order (this is debugging!).' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        `Student can explain "${c.concept}" in simple words.`,
        `Student built and uploaded the "${c.codingTitle}" program.`,
        'Student triggered the program and saw it work on Codey.',
        'Student extended the project in the Create task.',
        'Student reflected on what they made and any bug they fixed.',
      ],
    },
    {
      type: 'homework',
      title: 'Reflect & Explore',
      emoji: '🏠',
      content: [
        'Self-review: What did you learn this lesson? What did you like most?',
        c.reflect,
        'Show a family member your project and explain how it works.',
      ],
      studentContent: [
        '📝 What did you learn? What did you like most?',
        `💭 ${c.reflect}`,
        '👨‍👩‍👧 Show your family your project!',
      ],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `CONCEPT: ${c.concept} — ${c.conceptExplain}`,
        'PACING: keep Engage short and protect the 15–20 min coding time.',
        'mBLOCK 5: students code in blocks (built on Scratch 3.0). Upload mode runs the program on Codey itself.',
        'The exact blocks are on the sheet pages in the activity — show them on the projector as students build.',
        'SUGGESTED CONTENT: the lesson Sheet is official; the prompts/timings here are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id,
    slug: c.slug.replace('codey-', ''),
    title: c.title,
    programId: 'codey-rocky',
    programSlug: 'codey-rocky',
    programTitle: 'Codey Rocky',
    programColor: '#3B82F6',
    courseId: 'codey-blockcoding',
    courseTitle: 'Codey Rocky: Block Coding & Game Design',
    moduleId: c.moduleId,
    moduleTitle: c.moduleTitle,
    ageGroup: '8-9',
    level: 'Beginner',
    duration: '45 minutes',
    difficulty: Math.min(5, Math.max(1, Math.ceil(c.order / 5))) as 1 | 2 | 3 | 4 | 5,
    heroImage: `/lessons/${c.slug}/p-01.png`,
    skills: c.skills,
    materials: [
      { item: 'Codey Rocky robot', quantity: '1 per child or pair' },
      { item: 'Laptop/desktop with mBlock 5', quantity: '1 per child or pair' },
      { item: 'USB cable', quantity: '1 per Codey' },
      { item: 'Lesson Sheet (projected or printed)', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: c.objectives,
    assessmentChecklist: [
      `Explained "${c.concept}".`,
      `Built and uploaded "${c.codingTitle}".`,
      'Saw the program run on Codey.',
      'Completed a Create task.',
    ],
    sections,
    ...(c.quiz ? { quiz: c.quiz } : {}),
    resources: [
      { id: `${c.id}-r1`, title: `${c.title} — Lesson Sheet (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-codey', description: 'Official lesson sheet with the coding blocks', needsReview: true },
      { id: `${c.id}-r2`, title: `${c.title} — Slideshow`, type: 'slides', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-codey', description: 'Projector slides', needsReview: true },
    ],
  };
}

// ─── Module 1 lessons (1–6) ──────────────────────────────────────
const CONFIGS: CodeyConfig[] = [
  {
    id: 'codey-l1', slug: 'codey-l1', title: 'The Secret of Codey Rocky', order: 1,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🤖', pages: 7,
    concept: 'Program',
    conceptExplain: 'A program is an artificial language we use to tell a robot what to do. We turn our idea into a program, upload it to the robot, and it acts: Idea → Program → Robot → Action.',
    objectives: [
      'Understand what a program is and what it can do.',
      'Get to know Codey Rocky and its features.',
      'Master the basics of mBlock 5.',
      'Learn how to upload a program to Codey.',
    ],
    situated: 'Ask "Have you seen robots in real life? What are they for?" Match pictures of a programmable robot, a logistics robot, a delivery robot, and a security robot. Then introduce Codey Rocky — a small programmable robot that can avoid obstacles, follow lines, and even do face recognition.',
    codingTitle: 'My First Program', codingSteps: [
      'Connect Codey to the computer with the USB cable and power it on.',
      'Open mBlock 5, click Connect, and choose the correct serial port.',
      'Build the example program shown on the sheet (e.g. "when Codey starts up" → show an image / play a sound / move).',
      'Upload the program to Codey.',
      'Unplug the cable, put Codey on the table, press button A, and watch it react!',
    ],
    studentMission: [
      '🔌 Connect Codey to the computer and turn it on',
      '🧩 Open mBlock 5 and connect (pick the right port)',
      '🟨 Build the program from the sheet',
      '⬆️ Upload it to Codey',
      '🅰️ Press button A and watch Codey come to life!',
    ],
    create: [
      'Meet Codey (the brain: sensors, LED display, buttons) and Rocky (the chassis: motors, IR sensor) — together they make Codey Rocky.',
      'Change the image or sound in your program and upload again.',
    ],
    reflect: 'Can you think of where programs are used in daily life?',
    skills: ['What is a Program', 'mBlock 5', 'Uploading', 'Robot Basics'],
    quiz: [
      { question: 'A program is:', options: ['a set of instructions a computer/robot follows', 'a type of battery', 'a sticker', 'a wheel'], answerIndex: 0 },
      { question: 'Codey Rocky is programmed with:', options: ['mBlock', 'Microsoft Word', 'a TV remote', 'a calculator'], answerIndex: 0 },
      { question: 'To run your code on Codey you:', options: ['upload it to the robot', 'print it', 'read it aloud', 'email it'], answerIndex: 0 },
    ],
  },
  {
    id: 'codey-l2', slug: 'codey-l2', title: 'Press Buttons to Change Emotions', order: 2,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '😀', pages: 4,
    concept: 'Events',
    conceptExplain: 'An Event is an action that makes something happen. In a program one or more events can trigger code — for example, pressing a button makes the lights turn on.',
    objectives: [
      'Understand the concept of Events.',
      'Use Event blocks in a program.',
      'Use Event blocks to make buttons do what you want.',
    ],
    situated: 'A panda presses a button and the light turns on. Pressing the button is the "Event" that causes the light. In coding we first pick an event to trigger our program.',
    play: 'Groups game: the teacher draws shapes (triangle, circle, square). When the teacher touches a shape, students do a matching action (e.g. touch triangle → stand up). Touching a shape is the "event".',
    codingTitle: 'Start Up and Smile', codingSteps: [
      'Add the Event block "when Codey starts up" (the yellow block).',
      'Add the blue "show image" block and pick (or draw) a smiley face.',
      'Upload — Codey smiles when it starts!',
    ],
    studentMission: [
      '🟨 Use an Event block: "when Codey starts up"',
      '😀 Add "show image" → choose a smile',
      '⬆️ Upload and watch Codey smile!',
    ],
    create: [
      'Task 1: Make Codey change its face for different events — when button A / B / C is pressed.',
      'Task 2: Make Codey also play different sounds for each button.',
    ],
    reflect: 'Can you think of events in daily life?',
    skills: ['Events', 'Buttons', 'LED Display', 'Triggers'],
    quiz: [
      { question: 'Pressing a button to make something happen is an example of an:', options: ['event', 'output', 'battery', 'wheel'], answerIndex: 0 },
      { question: 'Codey shows faces/emotions on its:', options: ['LED display', 'wheels', 'speaker only', 'cable'], answerIndex: 0 },
      { question: 'A different face for button A and button B uses:', options: ['two button events', 'one loop only', 'no code', 'the motor'], answerIndex: 0 },
    ],
  },
  {
    id: 'codey-l3', slug: 'codey-l3', title: 'To Be an Animation Designer', order: 3,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🎬', pages: 5,
    concept: 'Sequence',
    conceptExplain: 'A Sequence is a series of steps carried out in order to complete a task. The order matters — like opening the fridge, putting food in, then closing it.',
    objectives: [
      'Understand the concept of Sequence.',
      'Create animations using a sequence of steps.',
    ],
    situated: 'To put a watermelon in the fridge the panda must: open the door → put it in → close the door. Do the steps out of order and it fails. That ordered set of steps is a Sequence.',
    play: 'Play "I\'m a Robot": the teacher-robot only moves as students instruct, step by step, to walk to the board and draw a smiley — showing how order matters.',
    codingTitle: 'Winking Eyes', codingSteps: [
      'Add the Event "when button A pressed".',
      'Add "show image () for () secs" — eyes open.',
      'Duplicate it and change the image — eyes closed (the wink).',
      'Add "show image () for () secs" again — eyes open.',
      'Upload — press A and Codey winks at you!',
    ],
    studentMission: [
      '🟨 "when button A pressed"',
      '👁️ show eyes-open → eyes-closed → eyes-open (in order!)',
      '⬆️ Upload and press A — Codey winks!',
    ],
    create: [
      'Task 1: Duplicate the "show image" block and change each image slightly, in sequence, to make a smooth animation.',
      'Task 2: Draw your own images on the grid and sequence them into a brand-new animation.',
    ],
    reflect: 'I want to design my own animation. It will be like…',
    skills: ['Sequence', 'Animation', 'Order of Steps', 'Images'],
    quiz: [
      { question: 'An animation is made by showing images:', options: ['one after another in order', 'all at once', 'never', 'backwards only'], answerIndex: 0 },
      { question: 'Running steps in a set order is called a:', options: ['sequence', 'sensor', 'battery', 'wheel'], answerIndex: 0 },
      { question: 'If the order of steps is wrong, the animation will:', options: ['not look right', 'be perfect', 'delete itself', 'speed up'], answerIndex: 0 },
    ],
  },
  {
    id: 'codey-l4', slug: 'codey-l4', title: 'Identify the Bug', order: 4,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🐛', pages: 4,
    concept: 'Bug',
    conceptExplain: 'A bug is a mistake that makes a program fail — like a typo in a sentence. Finding and fixing bugs is called debugging.',
    objectives: [
      'Understand what a bug is.',
      'Learn how to find and fix bugs.',
    ],
    situated: 'Long ago a giant "Colossus" computer stopped working. Programmer Grace Hopper found the cause — a real moth stuck inside! She removed it and taped it in the logbook. That was the first computer "bug", and Hopper became known as the Mother of Debugging.',
    codingTitle: 'Find and Fix the Bugs', codingSteps: [
      'Open the three example programs from the teacher (shown on the sheet).',
      'Program 1 — a car that lost its key: find what\'s missing and fix it.',
      'Program 2 — a bomb that won\'t count down: fix the countdown.',
      'Program 3 — an earthworm that stops at a big bug: remove the bug so it keeps moving.',
      'Read each script top-to-bottom like a sentence to spot the mistake.',
    ],
    studentMission: [
      '🔍 Open the 3 buggy programs',
      '🚗 Fix the car · 💣 fix the bomb · 🪱 free the earthworm',
      '👀 Read each script like a sentence to find the mistake!',
    ],
    create: [
      'Swap programs with a partner and find each other\'s deliberate bugs.',
      'Make your own tiny "buggy" program and challenge a friend to debug it.',
    ],
    reflect: 'Have you been asked to find mistakes in other subjects? Which ones?',
    skills: ['Debugging', 'Logic', 'Problem Solving', 'Attention to Detail'],
  },
  {
    id: 'codey-l5', slug: 'codey-l5', title: 'The Steamed Bread Can’t Jump', order: 5,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '🔁', pages: 4,
    concept: 'Loop',
    conceptExplain: 'A Loop is a set of instructions that repeat. Instead of copying the same blocks many times, we use a Repeat (counting loop) block to keep the code neat.',
    objectives: [
      'Understand the concept of Loops.',
      'Use the Counting Loop (Repeat) block.',
      'Create an animation using a counting loop.',
    ],
    situated: 'A panda plants trees along a 20 m street. Each tree needs the same steps (dig, plant, cover, move 5 m). Rather than writing them again and again, repeat the steps 4 times — that\'s a loop.',
    play: 'Beat game: A = tap left leg, B = tap right leg, C = tap both. Follow "ABABABC ABABABC". Ask: how could a loop make the pattern simpler? Add beat D (clap) and try longer patterns.',
    codingTitle: 'The Steamed Bread Can’t Jump', codingSteps: [
      'Add an Event block to start the animation.',
      'Add the steamed-bread images that show it trying to jump.',
      'Wrap the repeated images in a Counting Loop (Repeat) block so it tries several times.',
      'Upload and watch the steamed bread try (and fail!) to jump.',
    ],
    studentMission: [
      '🔁 Use a Repeat block instead of copying blocks',
      '🥟 Show the steamed bread trying to jump, over and over',
      '⬆️ Upload and watch it try!',
    ],
    create: [
      'Improve the teacher\'s program — change the event, the sound, or the number of repeats.',
      'Change the images and give your animation a storyline.',
    ],
    reflect: 'Counting loops are all around us — give an example from daily life.',
    skills: ['Loops', 'Repeat Block', 'Animation', 'Efficiency'],
  },
  {
    id: 'codey-l6', slug: 'codey-l6', title: 'The Jumping Steamed Bread', order: 6,
    moduleId: 'codey-m1', moduleTitle: 'Module 1: Coding Foundations', emoji: '♾️', pages: 3,
    concept: 'Infinite Loop',
    conceptExplain: 'An Infinite Loop repeats code endlessly. The Forever block has no bump at the bottom — nothing can come after it, because it never stops.',
    objectives: [
      'Understand the concept of an Infinite Loop.',
      'Use the Forever block.',
      'Create your own animation with a Forever block.',
    ],
    situated: 'Some things repeat a set number of times; others repeat forever — like sunrise and sunset, day after day. We use the Forever block to repeat code endlessly.',
    codingTitle: 'The Jumping Steamed Bread', codingSteps: [
      'Add an Event block to start.',
      'Add the steamed-bread "jumping" images.',
      'Wrap them in a Forever block so it keeps hopping endlessly.',
      'Upload and watch the steamed bread jump forever!',
    ],
    studentMission: [
      '♾️ Use the Forever block (it never stops!)',
      '🥟 Make the steamed bread hop forever',
      '⬆️ Upload and watch it go!',
    ],
    create: [
      'Design two animations: use a Repeat block for one and a Forever block for the other.',
      'Give them storylines (e.g. "can\'t jump" vs "jumping") and add sounds or lights.',
    ],
    reflect: 'Infinite loops are all around us — give an example from daily life.',
    skills: ['Infinite Loop', 'Forever Block', 'Animation', 'Comparing Loops'],
  },

  // ─── Module 2: Building Games (7–16) ───────────────────────────
  {
    id: 'codey-l7', slug: 'codey-l7', title: 'The Racing Game I', order: 7,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '🏁', pages: 6,
    concept: 'Conditional & Boolean',
    conceptExplain: 'A Conditional (if) runs an instruction only when something is true. The hexagonal "Boolean" block in the hole reports true/false (1/0) — so the code decides what to do based on the situation.',
    objectives: [
      'Understand Conditionals and Boolean values.',
      'Use Conditional (if) blocks to complete tasks.',
      'Identify the Colour Sensor and the IR Proximity Sensor on Rocky.',
    ],
    situated: 'A panda checks if it\'s raining before going out: IF raining → put on a raincoat; otherwise go straight out. That decision is a conditional — the action depends on whether something is true.',
    play: 'Play "Conditional Box": draw paper strips with conditions like "if you wear glasses". Read it out, decide if it\'s true for you, and do the action only if it is.',
    codingTitle: 'Start on the Green Flag', codingSteps: [
      'Find Rocky\'s Colour Sensor (front-bottom row) — it detects red, green, blue.',
      'When button A is pressed, Codey gets ready at the start line (play sound "ready").',
      'IF the detected colour is green → move forward at top speed.',
      'Turn the RGB LED red once the program makes its decision.',
      'Extension: avoid an obstacle using the IR Proximity Sensor (turn to get around it).',
    ],
    studentMission: [
      '🟩 Find the Colour Sensor on Rocky',
      '🅰️ Press A → "ready" at the start line',
      '❓ IF colour = green → zoom forward!',
      '🔴 Light the RGB red when it decides',
    ],
    create: [
      'Give Codey Rocky facial expressions and sounds while it races.',
      'Add: if it sees red, move backward; use the IR sensor to dodge an obstacle.',
    ],
    reflect: 'Describe where the colour sensor and IR proximity sensor are located.',
    skills: ['Conditionals', 'Boolean', 'Colour Sensor', 'IR Sensor'],
  },
  {
    id: 'codey-l8', slug: 'codey-l8', title: 'The Racing Game II', order: 8,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '⛽', pages: 5,
    concept: 'Comparison Operators',
    conceptExplain: 'Comparison Operators (<, =, >) compare two values so the program can decide — e.g. "if light intensity < 20". Combine them with if blocks and repeats to keep code concise.',
    objectives: [
      'Use the if block and repeat block to keep code concise.',
      'Use comparison operators inside an if block.',
      'Identify the Light Sensor and the RGB Indicator.',
    ],
    situated: 'We compare values to decide all the time — "if my temperature is over 38, see a doctor". In code we use <, =, > the same way.',
    codingTitle: 'Service Station & The Tunnel', codingSteps: [
      'Service Station: surround Codey with books. When button A is pressed, IF it meets an obstacle, keep turning until it finds the exit (use if more than once), then turn left and speed onto the track.',
      'The Tunnel: find the Light Sensor (black dot, bottom-right of Codey) and read its value (show it on the LED, add a wait to slow updates).',
      'When button A is pressed, Codey moves forward at top speed.',
      'IF the light intensity < 20 (dark tunnel) → turn on the white RGB indicator and slow down.',
    ],
    studentMission: [
      '📚 Service station: keep turning until you find the exit',
      '💡 Read the Light Sensor value',
      '🌑 IF light < 20 → lights on + slow down (tunnel!)',
    ],
    create: [
      'Add sounds and facial expressions when Codey is in the dark.',
      'Tune the light threshold for your room.',
    ],
    reflect: 'Describe where the Light Sensor or RGB Indicator is located.',
    skills: ['Comparison Operators', 'Light Sensor', 'RGB Indicator', 'Conditionals'],
  },
  {
    id: 'codey-l9', slug: 'codey-l9', title: 'Volume Bar', order: 9,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '🔊', pages: 6,
    concept: 'Logic Operators',
    conceptExplain: 'Logic Operators combine Booleans: "and" is true only if both are true; "or" is true if either is; "not" flips a value. They let you build ranges like 10 < x < 20.',
    objectives: [
      'Nest an if block inside a Forever block.',
      'Use Logic Operators and the if…then…else block.',
      'Identify the Sound Sensor.',
    ],
    situated: 'To check a range like "loudness between 10 and 20" you need BOTH conditions true — that\'s the "and" operator. For "below 10 OR above 20" you use "or".',
    codingTitle: 'Volume Bar', codingSteps: [
      'Find the Sound Sensor (bottom-right of Codey) — it measures loudness.',
      'When Codey starts up, IF applause loudness > 20 → the volume bar reaches the top.',
      'IF loudness is between 10 and 20 (use "and") → the bar drops to the middle.',
      'IF loudness < 10 → the bar falls to the lowest.',
      'Wrap it all in a Forever block so Codey keeps listening.',
    ],
    studentMission: [
      '🎤 Find the Sound Sensor',
      '📈 Loud (>20) → bar high · 🔉 10–20 → middle · 🤫 <10 → low',
      '🔁 Forever loop so it keeps listening!',
    ],
    create: [
      'Make the RGB LED change colour based on the sound volume.',
      'Subdivide the loudness ranges to make the volume bar more sensitive.',
    ],
    reflect: 'Describe where the Sound Sensor is located.',
    skills: ['Logic Operators', 'Sound Sensor', 'Nested If', 'Forever'],
  },
  {
    id: 'codey-l10', slug: 'codey-l10', title: 'Good Morning! Functions', order: 10,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '🌅', pages: 6,
    concept: 'Functions',
    conceptExplain: 'A Function (My Block) gives a name to a set of instructions so you can reuse it — like saying "wash hair" instead of listing every step. It keeps code neat and easy to read.',
    objectives: [
      'Understand the concept of Functions.',
      'Use the Function block (My Block) in your code.',
      'Create and call a function to give Codey a custom boot animation.',
    ],
    situated: 'Washing hair = shampoo + massage + rinse. We give that set of steps one name, "wash hair", and just say the name. A function works the same way in code.',
    play: 'Play "Functions of Morning": name groups of morning actions (e.g. "put on shoes", "brush teeth") as functions, then call them in order to describe your whole morning.',
    codingTitle: 'Codey\'s Startup Animation', codingSteps: [
      'Click "My Blocks" → "Make a Block" and give your function a name (e.g. "starting up").',
      'A "define starting up" block appears — add the animation/sound instructions under it.',
      'Call the function by adding the "starting up" block under "when Codey starts up".',
      'Upload — Codey plays your custom boot animation!',
    ],
    studentMission: [
      '🧩 My Blocks → Make a Block → name it',
      '🎬 Put your animation under "define …"',
      '📞 Call it under "when Codey starts up"',
      '⬆️ Upload and watch your boot animation!',
    ],
    create: [
      'Improve the sample — change the animation or sound.',
      'Pick a built-in image, refine it, and build your own animation with the function.',
    ],
    reflect: 'Where do we reuse named sets of steps in daily life?',
    skills: ['Functions', 'My Block', 'Reuse', 'Animation'],
  },
  {
    id: 'codey-l11', slug: 'codey-l11', title: 'The Tiny Patroller I', order: 11,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '🛡️', pages: 3,
    concept: 'Functions + Line Following',
    conceptExplain: 'A function is a custom block you can call repeatedly. Here we wrap a repeated driving pattern in a function and reuse it — combined with measuring and a little maths.',
    objectives: [
      'Use function blocks (My Block) in your code.',
      'Create a function and call it.',
      'Apply functions and simple maths to complete the challenge.',
    ],
    situated: 'Codey Rocky is a security guard patrolling the 1st floor along black lines — it should drive a repeating square route.',
    codingTitle: 'Patrol the 1st Floor', codingSteps: [
      'Program Codey to follow the black-line route (move forward + turn right, repeated 4 times = a square).',
      'Create a function named "Square" for that repeating pattern.',
      'Measure one side of the square and the linking line; work out how long each takes at a set power/speed.',
      'Call "Square" twice under "when button A pressed" to patrol the whole route.',
    ],
    studentMission: [
      '⬛ Follow the black-line square route',
      '🧩 Make a "Square" function (forward + turn ×4)',
      '📏 Measure & time each side',
      '📞 Call "Square" twice to patrol!',
    ],
    create: [
      'Add facial expressions, sounds, and lights as Codey patrols.',
      'Note: the DC motor isn\'t precise — a rough line-follow is fine.',
    ],
    reflect: 'Where else do we reuse a named routine to save effort?',
    skills: ['Functions', 'Line Following', 'Measurement', 'Maths'],
  },
  {
    id: 'codey-l12', slug: 'codey-l12', title: 'The Tiny Patroller II', order: 12,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '🏢', pages: 3,
    concept: 'Functions (Advanced)',
    conceptExplain: 'Build on functions: define more than one function and combine them with repeats to drive a more complex route — neat, reusable code.',
    objectives: [
      'Use function blocks for a more complex route.',
      'Create and call multiple functions.',
      'Apply functions and maths to complete the challenge.',
    ],
    situated: 'Now Codey patrols the 2nd floor — more rooms and a more complex route made of two squares.',
    codingTitle: 'Patrol the 2nd Floor', codingSteps: [
      'Program Codey to drive the 2nd-floor black-line route.',
      'Create TWO functions: "Upper square" and "Bottom square".',
      'Measure and time each square and the linking line (as in Patroller I).',
      'Under "when button A pressed", call the functions (use a repeat block) to drive the full route — e.g. bottom square, move, then upper square ×2.',
    ],
    studentMission: [
      '⬛⬛ Drive the 2nd-floor route (two squares)',
      '🧩 Make "Upper square" + "Bottom square" functions',
      '🔁 Combine them with a repeat to patrol it all',
    ],
    create: [
      'Add facial expressions, sounds, and lights.',
      'Try the pseudocode approach: bottom square → move → upper square, repeated.',
    ],
    reflect: 'How did splitting the route into two functions help?',
    skills: ['Functions', 'Line Following', 'Decomposition', 'Maths'],
  },
  {
    id: 'codey-l13', slug: 'codey-l13', title: 'The Squirrel’s Nuts Box', order: 13,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '🐿️', pages: 5,
    concept: 'Variables',
    conceptExplain: 'A Variable is like a box with a name that stores a value you can change anytime — like a scoreboard whose number goes up and down during a game.',
    objectives: [
      'Understand the concept of a Variable.',
      'Create a variable and use it in your code.',
    ],
    situated: 'A squirrel\'s nut box starts with 10 nuts. Through the day it eats some, finds some, gives some away — the number keeps changing. That changing number is a variable.',
    play: 'Play "The Squirrel\'s Nuts Box": start at 10, draw event strips (eats 2, finds 5, gives 3…) and update the number on the board each time. That number is the variable.',
    codingTitle: 'Turn with a Variable', codingSteps: [
      'Beginner: make a "speed" variable; when button A is pressed, set speed = 30 and move forward at that speed for 1 second.',
      'Create a variable named "angle".',
      'Set angle = 70, and make Codey turn left by "angle" degrees.',
      'Assign a new value (140) to "angle" and make Codey turn right by "angle", then back.',
      'Add facial expressions, sounds, and light effects.',
    ],
    studentMission: [
      '📦 Make a variable (a named box for a value)',
      '🔢 Set "angle" = 70 → turn left by angle',
      '🔁 Change "angle" → turn by the new value',
      '⬆️ Upload and watch Codey turn!',
    ],
    create: [
      'Reset the value and the facial expressions in the sample.',
      'Design a program that uses 3 variables together.',
    ],
    reflect: 'In daily life, variables are around us — give an example.',
    skills: ['Variables', 'Assigning Values', 'Motors', 'Angles'],
  },
  {
    id: 'codey-l14', slug: 'codey-l14', title: 'Mathematical Operations', order: 14,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '➗', pages: 4,
    concept: 'Variables & Operators',
    conceptExplain: 'Use Operator blocks (+, −, ×, ÷) on a variable: calculate a result, then store it back in the variable. The LED can show numbers from −999 to 9999.',
    objectives: [
      'Understand variables.',
      'Assign values to variables and do operations with them.',
    ],
    situated: 'Codey is learning maths — it can add 1, subtract 1, multiply, and divide a stored number, showing the result each time.',
    codingTitle: 'Codey Does Maths', codingSteps: [
      'When Codey starts up, set the variable "number" = 0.',
      'When button A is pressed, increase "number" by 1; when button B is pressed, decrease it by 1 (a negative change = subtract).',
      'Show the result with "show () until done" under each event.',
      'Multiply/Divide: use the multiply/divide Operator block to get a result, then reassign it to "number" (×2 on A, ÷2 on B).',
    ],
    studentMission: [
      '0️⃣ Start "number" at 0',
      '➕ A → +1 · ➖ B → −1',
      '✖️ Use the multiply/divide operator, store the result back',
      '🔢 Show the result on the LED',
    ],
    create: [
      'Change the starting value and the factor (use a value other than 2).',
      'Make sure all events use the SAME variable.',
    ],
    reflect: 'Where do we store-and-update a running total in real life?',
    skills: ['Variables', 'Operators', 'Arithmetic', 'LED Display'],
  },
  {
    id: 'codey-l15', slug: 'codey-l15', title: 'The Bomb', order: 15,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '💣', pages: 4,
    concept: 'Variables & Countdown',
    conceptExplain: 'Use a variable to count down (decrease over time) and a random number for surprise. Compare the variable to a target with an if block to trigger the "explosion".',
    objectives: [
      'Understand variables.',
      'Increase or decrease a variable\'s value over time.',
    ],
    situated: 'A party game: Codey counts down while players pass it and name animals. When time hits 0 — boom!',
    codingTitle: 'The Bomb Game', codingSteps: [
      'When Codey starts up, set the variable "time" = 30.',
      'When button A is pressed, count down: every 1 second decrease "time" by 1, repeated 30 times; show the time left on the LED and add tense sounds.',
      'When "time" = 0, the bomb explodes — light the RGB LED red.',
      'Variant: make "bomb" a random number 1–20; each press of B increases "number" by 1; when "number" = "bomb" → explode (use a comparison + if).',
    ],
    studentMission: [
      '⏱️ Set "time" = 30, count down each second',
      '🔢 Show time left + tense sounds',
      '💥 time = 0 → red light, boom!',
      '🎲 Variant: random "bomb" number to match',
    ],
    create: [
      'Reset the starting "time" to make the game longer or shorter.',
      'Change the random range of "bomb".',
    ],
    reflect: 'Where do we see countdowns using a changing number?',
    skills: ['Variables', 'Countdown', 'Random', 'Comparison'],
  },
  {
    id: 'codey-l16', slug: 'codey-l16', title: 'Rock-Paper-Scissors', order: 16,
    moduleId: 'codey-m2', moduleTitle: 'Module 2: Building Games', emoji: '✊', pages: 4,
    concept: 'Variables & Comparison',
    conceptExplain: 'Use several variables (gesture, win, lose, draw) and comparisons. A random number picks Codey\'s move; you tally results and can even calculate a win rate with operators.',
    objectives: [
      'Understand variables.',
      'Make comparisons between variables.',
    ],
    situated: 'Play rock-paper-scissors against Codey: shake it and it randomly shows rock, scissors, or paper — then you tally wins, losses, and draws.',
    codingTitle: 'Play Rock-Paper-Scissors', codingSteps: [
      'When Codey starts up, set all values to 0.',
      'When shaken, set "gesture" to a random 0/1/2 → show fist / scissors / paper on the LED.',
      'Press A if Codey wins (win +1, smile + "laugh"); B if it loses (lose +1, sad face); C for a draw (draw +1, calm hum).',
      'Bonus: when light intensity > 2, show the win chance = wins ÷ (wins + losses + draws).',
    ],
    studentMission: [
      '🎲 Shake → random gesture (✊✌️✋)',
      '🅰️ win+1 😀 · 🅱️ lose+1 😢 · 🅲 draw+1 😐',
      '📊 Bonus: show your win chance!',
    ],
    create: [
      'Show the win chance as a percentage, or as a ratio.',
      'Two-Codey laser battle: send IR messages; getting "shot" lowers health points to 0.',
    ],
    reflect: 'How could you compare scores between more than two players?',
    skills: ['Variables', 'Comparison', 'Random', 'Tallying'],
  },

  // ─── Module 3: Game Design & Driving (17–24) ───────────────────
  {
    id: 'codey-l17', slug: 'codey-l17', title: 'My Speedway', order: 17,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '🏎️', pages: 4,
    concept: 'Game Scenes & Characters',
    conceptExplain: 'A game\'s characters, scenes, and backstory decide who finds it fun. Richer, more detailed characters and scenes make a game more enjoyable and engaging.',
    objectives: [
      'Use mBlock to design game scenes and characters.',
      'Achieve dynamic (moving) effects.',
      'Create a simple game.',
    ],
    situated: 'The racing game is coming — first we design the speedway and the car, then make the car move and set the rules.',
    codingTitle: 'Design My Speedway', codingSteps: [
      'Delete the default "Panda" sprite and add a "racing car" sprite (from the library, an imported picture, or draw your own).',
      'Use the arrow keys to move the car: Up/Down/Left/Right.',
      'Add a "speedway" background (library, imported, or drawn).',
      'Rule 1: if the car leaves the track, it returns to the start.',
      'Rule 2: when the car reaches the red finish line, show "Win!".',
    ],
    studentMission: [
      '🗑️ Remove the panda, add a racing-car sprite',
      '⬆️⬇️⬅️➡️ Move the car with the arrow keys',
      '🛣️ Add a speedway background',
      '🏁 Off the track → back to start · finish line → "Win!"',
    ],
    create: [
      'Add backward-moving trees so the car looks like it\'s speeding forward.',
      'Make the scene and car more detailed and fun.',
    ],
    reflect: 'What was the best design idea you had today?',
    skills: ['Game Design', 'Sprites', 'Backgrounds', 'Movement'],
  },
  {
    id: 'codey-l18', slug: 'codey-l18', title: 'Game Control Schemes', order: 18,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '🎮', pages: 3,
    concept: 'Control Schemes',
    conceptExplain: 'Different platforms (PC, mobile, console, VR) use different controls (mouse, keyboard, controller, headset). Here we turn Codey itself into a tilt controller using its gyroscope.',
    objectives: [
      'Design an interactive control scheme for a game.',
    ],
    situated: 'For the racing game, we want the car to move the way we lean — tilt left, the car goes left; tilt right, it goes right. Codey\'s built-in gyroscope can sense the tilt.',
    codingTitle: 'Tilt to Steer', codingSteps: [
      'Design the racing car and speedway (from My Speedway).',
      'Turn Codey into a controller: use the gyroscope to detect tilt (front/back/left/right).',
      'When Codey is tilted, broadcast a message; the car sprite receives it and turns that way.',
      'When switching from turning left to right, stop the car first so it changes cleanly.',
    ],
    studentMission: [
      '🎛️ Use Codey\'s gyroscope (tilt sensing)',
      '↩️ Tilt left → car left · ↪️ tilt right → car right',
      '📡 Tilt → broadcast → car receives and turns',
    ],
    create: [
      'Use a variable instead of broadcasting to control the car.',
      'Make the track more detailed and add different characters.',
    ],
    reflect: 'What control scheme would you design for your dream game?',
    skills: ['Control Schemes', 'Gyroscope', 'Tilt', 'Broadcast'],
  },
  {
    id: 'codey-l19', slug: 'codey-l19', title: 'Game Mechanics I', order: 19,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '📐', pages: 3,
    concept: 'Game Mechanics',
    conceptExplain: 'Game mechanics are the rules that define what players can and can\'t do. They shape how the game is played and how it feels — an essential part of any game.',
    objectives: [
      'Design game rules (mechanics) in mBlock 5.',
      'Design rules for the racing game.',
      'Spice up your prototype by adding mechanics.',
    ],
    situated: 'A good game needs clear rules. For our racer: the car must stay between the outside and inside lanes; if it goes off track it explodes and restarts from the start line.',
    codingTitle: 'Add the Rules', codingSteps: [
      'Make the track from two lanes — the car must drive between them.',
      'Detect when the car leaves the track: switch to an "explode" costume, then reappear at the start.',
      'Turn Codey into the controller (gyroscope tilt) and add that to your earlier code.',
      'Invite players to test, then refine the rules from their feedback.',
    ],
    studentMission: [
      '🛣️ Car must stay between the two lanes',
      '💥 Off track → explode → restart at the start',
      '🎛️ Steer with Codey tilt',
      '🧪 Test with players and refine!',
    ],
    create: [
      'Add a time limit: finish a lap within the required time.',
      'Tune the rules to make the game fair and fun.',
    ],
    reflect: 'Rules matter in daily life too — can you think of some?',
    skills: ['Game Mechanics', 'Rules', 'Collision', 'Playtesting'],
  },
  {
    id: 'codey-l20', slug: 'codey-l20', title: 'Game Mechanics II', order: 20,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '🦇', pages: 4,
    concept: 'Game Conflicts',
    conceptExplain: 'Conflicts make a game challenging: obstacles (fixed or moving), opponents, and dilemmas (choices with pros and cons). They stop players reaching the goal too easily.',
    objectives: [
      'Design an interactive scheme for a game.',
      'Make the racing game harder by adding conflict.',
    ],
    situated: 'To make the racer thrilling, add moving obstacles: bats keep falling from the sky and the car must dodge them while driving.',
    codingTitle: 'Add Falling Bats', codingSteps: [
      'Add a "Bat" sprite with two costumes: a whole bat and a smashed bat (black spots).',
      'Make the bat appear randomly and fall from the sky; after landing it soon falls again.',
      'If the car is hit by a bat → it explodes (new costume) and returns to the start.',
      'If the car avoids the bats, the game continues.',
      'Invite players to test the conflict and refine it.',
    ],
    studentMission: [
      '🦇 Add bats that fall randomly from the sky',
      '🚗 Dodge the bats while driving',
      '💥 Hit by a bat → explode → back to start',
      '🧪 Test and refine!',
    ],
    create: [
      'Add a gold coin to grab before it lands (while still dodging bats).',
      'Add a narrow shortcut track for a risk/reward dilemma.',
    ],
    reflect: 'What was the best game you made or played today?',
    skills: ['Game Conflicts', 'Obstacles', 'Random', 'Collision'],
  },
  {
    id: 'codey-l21', slug: 'codey-l21', title: 'Fast and Furious', order: 21,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '🏆', pages: 3,
    concept: 'Game Outcomes',
    conceptExplain: 'A game outcome is the win or lose state that results from the player\'s choices. Clear outcomes give players a goal and a sense of achievement.',
    objectives: [
      'Design game mechanics and outcomes for the racing game.',
      'Improve the gaming experience of your own game.',
    ],
    situated: 'Our racer needs outcomes: WIN when the car completes a lap (reaches the blue finish line, with a sign and a sound); LOSE if it goes off-track or hits an obstacle and must restart.',
    codingTitle: 'Add Win & Lose', codingSteps: [
      'Win: the car completes one full lap → show a "win" sign and play a sound.',
      'Draw a finish line so the program can detect a completed lap.',
      'Lose: the car explodes if it drives off the speedway; it makes a sound when hit by a bat and returns to start.',
      'Use Codey as the controller, then invite players to test and refine.',
    ],
    studentMission: [
      '🏁 Complete a lap → WIN sign + sound',
      '💥 Off track or hit → lose, back to start',
      '🎛️ Drive with Codey · 🧪 test and refine',
    ],
    create: [
      'Add tougher rules: finish within a time limit, complete several laps, or reach the red line.',
    ],
    reflect: 'Which game you built was your favourite, and why?',
    skills: ['Game Outcomes', 'Win/Lose', 'Finish Line', 'Polish'],
  },
  {
    id: 'codey-l22', slug: 'codey-l22', title: 'Make a Turn', order: 22,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '🔄', pages: 4,
    concept: 'Robot Driving',
    conceptExplain: 'Robots perform tasks as instructed. Codey Rocky drives with two wheels — by setting each wheel\'s power (0–100) you can make it go straight, circle, or curve along a route.',
    objectives: [
      'Review the basics of robots.',
      'Design a route for Codey Rocky to follow.',
    ],
    situated: 'Robots (educational, delivery, security, logistics) follow instructions. Today we design driving routes for Codey Rocky.',
    play: 'Two students act as the two wheels: together they move forward, make a circle, and make a semicircle turn — feeling how wheel speeds create turns.',
    codingTitle: 'Drive a Route', codingSteps: [
      'Use the block that sets both wheels\' power (0–100) to move.',
      'Task 1: program a full-circle route and a semicircle route.',
      'Task 2: follow an S-curve route within a set time limit.',
      'Adjust the wheel powers/times to shape each curve.',
    ],
    studentMission: [
      '🛞 Set the wheel power (0–100) to move',
      '⭕ Drive a circle and a semicircle',
      '〰️ Follow an S-curve in time!',
    ],
    create: [
      'Design curved tracks — consecutive curves or a figure-8.',
      'Swap route maps with classmates and try theirs.',
    ],
    reflect: 'What was the most unique route you designed today?',
    skills: ['Robot Driving', 'Motors', 'Turning', 'Routes'],
  },
  {
    id: 'codey-l23', slug: 'codey-l23', title: 'Avoid Obstacles', order: 23,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '🚧', pages: 3,
    concept: 'Self-Driving & Sensors',
    conceptExplain: 'Self-driving cars use sensors to gather information about the road, then decide their speed and route in real time. Codey Rocky uses its sensors the same way to detect and avoid obstacles.',
    objectives: [
      'Know how self-driving car technology is used.',
      'Create and call a function.',
      'Apply functions and maths to complete the challenge.',
    ],
    situated: 'Build a road full of obstacles and have students "be" self-driving cars avoiding them — then program Codey Rocky to do the same.',
    codingTitle: 'Sense & Avoid', codingSteps: [
      'Task 1: turn Codey Rocky into an alarm (react when it senses something).',
      'Task 2: using the teacher\'s map, program Codey Rocky to drive and avoid the obstacles.',
      'Wrap repeated sense-and-turn behaviour in a function and call it.',
      'Challenge: keep Codey safely on the table without falling — think about how to detect the edge.',
    ],
    studentMission: [
      '🚨 Make Codey react when it senses something',
      '🗺️ Drive the map and avoid the obstacles',
      '🧩 Reuse a sense-and-avoid function',
      '🛑 Don\'t fall off the table — detect the edge!',
    ],
    create: [
      'Make Codey take a detour around an obstacle (turn, pass, turn back).',
      'Add facial expressions and sounds when it meets an obstacle.',
    ],
    reflect: 'Where in real life do we need to avoid obstacles?',
    skills: ['Self-Driving', 'IR Sensor', 'Functions', 'Edge Detection'],
  },
  {
    id: 'codey-l24', slug: 'codey-l24', title: 'Line-Following Car', order: 24,
    moduleId: 'codey-m3', moduleTitle: 'Module 3: Game Design & Driving', emoji: '🛤️', pages: 3,
    concept: 'Line Following',
    conceptExplain: 'Robots "see" the road with sensors. A black line reflects less light than a white surface, so by measuring the reflected light intensity Codey Rocky can tell where the line is and follow it.',
    objectives: [
      'Know where line-following robots are used in daily life.',
      'Learn about reflected light intensity.',
      'Understand why Codey Rocky can follow lines.',
    ],
    situated: 'Following lines is a basic robot skill used everywhere from home to industry. Robots keep their "eyes" (sensors) on the path so they don\'t stray.',
    play: 'Fist game: when your fist is over the black area, step forward and turn 45° — simulating how the robot reacts to the line edge with each reading.',
    codingTitle: 'Follow the Line', codingSteps: [
      'Program Rocky to measure reflected light intensity and show the value on its screen in real time.',
      'Measure the value on the black line vs. the white surface (note them down).',
      'When the sensor is on the edge of the black line, steer to stay on it (turn toward the line).',
      'Combine the readings + turns so Codey Rocky follows the path.',
    ],
    studentMission: [
      '💡 Show the reflected-light value on the screen',
      '⚫⚪ Compare black-line vs white values',
      '↪️ On the line edge → steer to stay on it',
      '🛤️ Follow the whole path!',
    ],
    create: [
      'Design your own line path and tune the turning so Codey follows it smoothly.',
      'Note: the DC motors aren\'t precise — a rough follow is fine.',
    ],
    reflect: 'Where have you seen line-following machines in real life?',
    skills: ['Line Following', 'Light Intensity', 'Sensors', 'Steering'],
  },
];

export const CODEY_LESSONS: LessonDetail[] = CONFIGS.map(makeCodeyLesson);

// All 24 lesson titles (1–6 detailed; 7–24 listed, detail coming).
const L = (id: string, title: string, order: number, difficulty: 1 | 2 | 3 | 4 | 5, skills: string[]) =>
  ({ id, title, duration: '45 min', difficulty, skills, order });

export const CODEY_COURSE: Course = {
  id: 'codey-blockcoding',
  slug: 'block-coding-game-design',
  title: 'Codey Rocky: Block Coding & Game Design',
  programId: 'codey-rocky',
  programSlug: 'codey-rocky',
  ageGroup: '8-9',
  level: 'Beginner',
  description:
    'Students learn to code with Codey Rocky in mBlock 5 — from their first program to events, sequences, loops, debugging, and on to building real games and driving a robot. 24 lessons across coding foundations, game building, and smart driving.',
  objectives: [
    'Understand core coding concepts: programs, events, sequences, loops, conditionals, variables, and functions',
    'Build animations, games, and interactive projects',
    'Debug programs and think computationally',
    'Drive and program Rocky to sense and respond to the world',
  ],
  duration: '24 sessions × 45 minutes',
  totalHours: 18,
  lessonCount: 24,
  prerequisites: [],
  skills: ['Block Coding', 'Events', 'Loops', 'Conditionals', 'Variables', 'Game Design'],
  modules: [
    {
      id: 'codey-m1', title: 'Module 1: Coding Foundations', order: 1,
      description: 'Programs, events, sequences, debugging, and loops.',
      lessons: [
        L('codey-l1', 'The Secret of Codey Rocky', 1, 1, ['Program', 'mBlock 5']),
        L('codey-l2', 'Press Buttons to Change Emotions', 2, 1, ['Events']),
        L('codey-l3', 'To Be an Animation Designer', 3, 1, ['Sequence']),
        L('codey-l4', 'Identify the Bug', 4, 1, ['Debugging']),
        L('codey-l5', 'The Steamed Bread Can’t Jump', 5, 2, ['Loops']),
        L('codey-l6', 'The Jumping Steamed Bread', 6, 2, ['Infinite Loop']),
      ],
    },
    {
      id: 'codey-m2', title: 'Module 2: Building Games', order: 2,
      description: 'Conditionals, variables, functions, and math through games.',
      lessons: [
        L('codey-l7', 'The Racing Game I', 7, 2, ['Game Design']),
        L('codey-l8', 'The Racing Game II', 8, 3, ['Game Design']),
        L('codey-l9', 'Volume Bar', 9, 2, ['Sound Sensor']),
        L('codey-l10', 'Good Morning! Function', 10, 3, ['Functions']),
        L('codey-l11', 'The Tiny Patroller I', 11, 3, ['Conditionals']),
        L('codey-l12', 'The Tiny Patroller II', 12, 3, ['Conditionals']),
        L('codey-l13', 'The Squirrel’s Nuts Box', 13, 3, ['Variables']),
        L('codey-l14', 'Mathematical Operations', 14, 3, ['Math']),
        L('codey-l15', 'The Bomb', 15, 3, ['Variables', 'Timer']),
        L('codey-l16', 'Rock-Paper-Scissors', 16, 4, ['Random', 'Logic']),
      ],
    },
    {
      id: 'codey-m3', title: 'Module 3: Game Design & Driving', order: 3,
      description: 'Build bigger games and drive Rocky to sense the world.',
      lessons: [
        L('codey-l17', 'My Speedway', 17, 3, ['Game Design']),
        L('codey-l18', 'Game Control Schemes', 18, 3, ['Controls']),
        L('codey-l19', 'Game Mechanics I', 19, 4, ['Game Mechanics']),
        L('codey-l20', 'Game Mechanics II', 20, 4, ['Game Mechanics']),
        L('codey-l21', 'Fast and Furious', 21, 4, ['Motors', 'Speed']),
        L('codey-l22', 'Make a Turn', 22, 4, ['Motors', 'Turning']),
        L('codey-l23', 'Avoid Obstacles', 23, 4, ['IR Sensor']),
        L('codey-l24', 'Line-Following Car', 24, 5, ['Line Following']),
      ],
    },
  ],
};
