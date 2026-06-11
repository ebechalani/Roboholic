import type { Course, LessonDetail } from '@/types';

// ════════════════════════════════════════════════════════════════
//  mBot2 / CyberPi — "Coding & IoT, Part 1"
//  Converted from RoboHolic Summer Camp 2025 materials
//  (9-12 yo → Mbot2 Activities Part 1). Lesson plans by Makeblock.
// ════════════════════════════════════════════════════════════════
export const MBOT2_COURSE: Course = {
  id: 'mbot2-iot-1',
  slug: 'coding-and-iot-part-1',
  title: 'mBot2 Coding & IoT — Part 1',
  programId: 'mbot2',
  programSlug: 'mbot2',
  ageGroup: '10-12',
  level: 'Intermediate',
  description:
    'Students use the CyberPi controller and mBlock to build real smart devices — from a noise detector to a houseplant carer and a self-driving vehicle. Each project follows the 5E model (Engage, Explore, Explain, Elaborate, Evaluate) and connects coding to everyday life.',
  objectives: [
    'Use CyberPi sensors to retrieve real-world data',
    'Display data and feedback on the CyberPi screen and LEDs',
    'Use variables, conditionals, and broadcasts in mBlock',
    'Connect computing concepts to real-life problems',
    'Design, build, test, and present a working smart device',
  ],
  duration: '14 sessions × 45 minutes',
  totalHours: 10.5,
  lessonCount: 14,
  prerequisites: ['Comfortable with block-based coding', 'Basic knowledge of sensors'],
  skills: ['Sensors & Data', 'Variables', 'Conditionals', 'IoT Thinking', 'Problem Solving'],
  modules: [
    {
      id: 'mb2-m1',
      title: 'Module 1: Sensing the World',
      description: 'Read sensor data and respond to the environment.',
      order: 1,
      lessons: [
        { id: 'mbot2-l1', title: 'Noise Detector',          duration: '45 min', difficulty: 2, skills: ['Sound Sensor', 'Data', 'Conditionals'], order: 1 },
        { id: 'mbot2-l2', title: 'Voice Reactive Lights',    duration: '45 min', difficulty: 2, skills: ['Sound Sensor', 'LEDs', 'Mapping'],      order: 2 },
        { id: 'mbot2-l3', title: 'Remote Classroom Polling', duration: '45 min', difficulty: 3, skills: ['Wireless', 'Broadcast', 'Data'],        order: 3 },
        { id: 'mbot2-l4', title: 'Houseplant Care',          duration: '45 min', difficulty: 3, skills: ['Sensors', 'Thresholds', 'IoT'],         order: 4 },
      ],
    },
    {
      id: 'mb2-m2',
      title: 'Module 2: Smart Devices',
      description: 'Build devices that make decisions and notify people.',
      order: 2,
      lessons: [
        { id: 'mbot2-l5', title: 'Smart Notifier',     duration: '45 min', difficulty: 3, skills: ['Notifications', 'Logic'],       order: 5 },
        { id: 'mbot2-l6', title: 'Parcel Locker',       duration: '45 min', difficulty: 3, skills: ['Passwords', 'Security', 'Logic'], order: 6 },
        { id: 'mbot2-l7', title: 'Intelligent Vehicles', duration: '45 min', difficulty: 4, skills: ['Motors', 'Autonomy', 'Sensors'], order: 7 },
        { id: 'mbot2-l8', title: 'Bus Tracker',         duration: '45 min', difficulty: 3, skills: ['Real-time Data', 'Display'],     order: 8 },
      ],
    },
    {
      id: 'mb2-m3',
      title: 'Module 3: Games & Interaction',
      description: 'Use sensors and the screen to build interactive games.',
      order: 3,
      lessons: [
        { id: 'mbot2-l9',  title: 'Colors Hunter',            duration: '45 min', difficulty: 3, skills: ['Color Sensor', 'Game Logic'], order: 9 },
        { id: 'mbot2-l10', title: 'Opposite Game',            duration: '45 min', difficulty: 3, skills: ['Logic', 'Reaction'],          order: 10 },
        { id: 'mbot2-l11', title: 'Catch Fish Carnival I',    duration: '45 min', difficulty: 4, skills: ['Game Design', 'Variables'],   order: 11 },
        { id: 'mbot2-l12', title: 'Catch Fish Carnival II',   duration: '45 min', difficulty: 4, skills: ['Game Design', 'Scoring'],     order: 12 },
        { id: 'mbot2-l13', title: 'Dodge the Bird I',         duration: '45 min', difficulty: 4, skills: ['Game Loop', 'Collision'],     order: 13 },
        { id: 'mbot2-l14', title: 'Dodge the Bird II',        duration: '45 min', difficulty: 5, skills: ['Game Polish', 'Levels'],      order: 14 },
      ],
    },
  ],
};

// ─── Lesson 1: Noise Detector — Full Detail ──────────────────────
// Source: "Lesson 01_Lesson Plan.docx" (Makeblock CyberPi curriculum).
export const MBOT2_LESSON_1: LessonDetail = {
  id: 'mbot2-l1',
  slug: 'noise-detector',
  title: 'Noise Detector',
  programId: 'mbot2',
  programSlug: 'mbot2',
  programTitle: 'mBot2 / CyberPi',
  programColor: '#2563EB',
  courseId: 'mbot2-iot-1',
  courseTitle: 'mBot2 Coding & IoT — Part 1',
  moduleId: 'mb2-m1',
  moduleTitle: 'Module 1: Sensing the World',
  ageGroup: '10-12',
  level: 'Intermediate',
  duration: '45 minutes',
  difficulty: 2,
  skills: ['Sound Sensor', 'Data & Variables', 'Conditionals', 'LEDs & Screen', 'IoT Thinking'],
  materials: [
    { item: 'Laptop/desktop with mBlock installed', quantity: '1 per student or pair' },
    { item: 'CyberPi kit',                          quantity: '1 per student or pair' },
    { item: 'Pens and paper (for the survey)',      quantity: '1 per student' },
    { item: 'Visual Aids slides (projector)',       quantity: '1 per classroom', isOptional: true },
  ],
  objectives: [
    'Identify the basic characteristics and types of data.',
    'Explain the importance and common uses of data in everyday life.',
    'Use a sensor to retrieve data and display it on the screen.',
    'Write a program that creates a working noise detector.',
  ],
  assessmentChecklist: [
    'Student can give examples of different types of data (images, sounds, text, numbers).',
    'Student connected CyberPi to mBlock and read the sound-volume sensor.',
    'Student stored the volume in a variable and displayed it on the screen.',
    'Student used a conditional + threshold to trigger an alert (red LEDs + "Please be quiet").',
    'Student described a real situation where a noise detector would be useful.',
  ],
  sections: [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Install mBlock on each laptop and confirm it connects to a CyberPi (USB or Bluetooth).',
        'Charge / check every CyberPi kit. Have at least one spare ready.',
        'Open the "Lesson 01 Visual Aids" slides on the projector — the lesson refers to specific slides.',
        'Build the finished Noise Detector yourself first so you can demo it and anticipate issues.',
        'Print or prepare pens & paper for the opening in-class survey.',
        'Prerequisites to keep in mind: students should already be comfortable with block-based coding and the basic idea of a sensor.',
      ] as string[],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Instructions (5E Model)',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        {
          step: 1,
          instruction: 'ENGAGE (5–10 min) · Slides 3–8: Hand out pens & paper; students work in pairs and survey classmates with 3 questions (e.g. "Where would you like to spend your weekends?", "How many times do you visit the library per month?", "Have you seen any uncivil behaviour?"). Give 1 minute, then pick 2–3 pairs to share.',
          tip: 'Then ask "What is data?" Explain that all those answers ARE data — data is distinct information (birthday, height, hobby…) that comes as images, sounds, text, symbols and numbers.',
          coachNote: 'Goal of this section: students feel that data is everywhere and useful — don\'t rush to the robot yet.',
        },
        {
          step: 2,
          instruction: 'EXPLORE (5 min) · Slides 10–11: Introduce a scenario where noise is annoying — e.g. "You\'re on a bus and someone is talking very loudly. How do you feel?" Then: "Imagine a device that monitors the sound around us. What features must it have?" Pairs discuss 1 minute; pick 2 students to share.',
          tip: 'Write the suggested features on the board — you\'ll turn them into a mind map next.',
        },
        {
          step: 3,
          instruction: 'EXPLAIN (5 min) · Slides 13–16: Show how a noise detector works. Together with the class, analyse the features it needs and draw a mind map (detect sound → decide if too loud → warn).',
        },
        {
          step: 4,
          instruction: 'ELABORATE (20 min) · Slides 18–28: Show where the modules are on CyberPi (LED screen, buttons, joystick, sensors, LED indicators). Help students start CyberPi, connect it in mBlock, and add the CyberPi device. Then build the program in stages — see the Main Activity below.',
          coachNote: 'This is the heart of the lesson. Move through it in small steps and let students test after each stage.',
        },
        {
          step: 5,
          instruction: 'EVALUATE (5 min) · Slides 30–31: Pick 1–2 students to demo their noise detector. Discuss: "Where would a noise detector be useful? When should we watch our own volume?" Finish with: "What other uses of data can you think of in daily life?"',
          tip: 'Tie it back to the opening survey — bring the lesson full circle from data → device → real life.',
        },
      ],
    },
    {
      type: 'student_steps',
      title: 'Your Mission: Build a Noise Detector! 🔊',
      emoji: '🎯',
      studentTitle: 'Your Mission: Build a Noise Detector! 🔊',
      content: [
        'Do the quick class survey with your partner — you\'re collecting DATA!',
        'Connect your CyberPi to mBlock.',
        'Use the sound sensor to read the volume around you.',
        'Show the volume number on the CyberPi screen.',
        'Make a rule: if it gets too loud, flash red LEDs and show "Please be quiet".',
        'Test it — shout, clap, whisper. Does it react?',
        'Show your detector to the class!',
      ] as string[],
      studentContent: [
        '📋 Collect data with the class survey',
        '🔌 Connect CyberPi to mBlock',
        '🎤 Read the sound volume with the sensor',
        '🖥️ Show the volume on the screen',
        '🚨 If too loud → red LEDs + "Please be quiet"',
        '🧪 Test it: shout, clap, whisper!',
        '🎉 Show off your noise detector!',
      ],
    },
    {
      type: 'activity',
      title: 'Main Activity: Program the Noise Detector',
      emoji: '🛠️',
      content: [
        'Build the program in 3 stages — have students test after each one.',
        'STAGE 1 — Display the volume: Use CyberPi\'s sound sensor to read "loudness". Clear the screen first, then print the volume value. Tip: the raw value fluctuates fast, so store it in a variable named "volume" to make it readable.',
        'STAGE 2 — Make a decision: Add a conditional that checks the volume against a threshold (the example uses 40, but students can choose their own). If the volume is above the threshold, broadcast an "alert" message.',
        'STAGE 3 — Define alert vs. standby: On "alert" → LEDs blink red AND the screen shows "Please be quiet". On standby (volume below threshold) → LEDs off and the warning text disappears.',
        'Once all three stages work together, the device continuously listens and reacts in real time.',
      ] as string[],
      studentContent: [
        '1️⃣ Read the volume and show it on screen (store it in a "volume" variable so it\'s steady)',
        '2️⃣ Add a rule: IF volume > 40 → send an "alert"',
        '3️⃣ On alert: 🔴 LEDs blink red + screen says "Please be quiet"',
        '4️⃣ When quiet again: LEDs off, message gone',
        '✅ Put it all together — your detector now reacts live!',
      ],
    },
    {
      type: 'challenge',
      title: 'Challenge: Tune Your Detector',
      emoji: '🎚️',
      content: [
        'Change the threshold value and test it. What number works best for your classroom?',
        'Add a second level: a yellow "getting loud" warning before the red "too loud" alert.',
        'Make the alert friendlier or funnier — change the message or add a sound.',
      ] as string[],
      studentContent: [
        '🎚️ Change the loudness limit — what number is best?',
        '🟡 Add a "getting loud" yellow warning before red',
        '😄 Make your alert message fun!',
      ],
    },
    {
      type: 'extra_challenge',
      title: 'Extra Challenge: Fast Finishers',
      emoji: '🌟',
      content: [
        'Count how many times the room got "too loud" during the lesson and show the count on the screen.',
        'Use the joystick or buttons to let the user change the threshold without editing the code.',
        'Discuss: how could this become a real product for a library or hospital?',
      ] as string[],
      studentContent: [
        '🔢 Count how many times it got too loud and show the total',
        '🕹️ Use the buttons/joystick to change the limit live',
        '💡 How could this be a real product for a library?',
      ],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        {
          problem: 'The volume number on screen changes too fast to read',
          cause: 'The sound sensor updates continuously, so the raw value fluctuates every instant.',
          solution: 'Store the reading in a variable named "volume" and display the variable. Optionally add a short wait in the loop to slow updates.',
        },
        {
          problem: 'CyberPi won\'t connect to mBlock',
          cause: 'Device not added, wrong connection mode, or driver/Bluetooth issue.',
          solution: 'In mBlock, click "Add" and choose CyberPi, then Connect (USB or Bluetooth). Re-seat the USB cable, and make sure the CyberPi is powered on.',
        },
        {
          problem: 'Old text stays on the screen behind the new text',
          cause: 'The screen was not cleared before printing.',
          solution: 'Add the "clear screen" block at the start of the loop so each update shows cleanly. (Note: the standby step already clears it — don\'t clear twice.)',
        },
        {
          problem: 'LEDs stay red even when it\'s quiet — Suggested',
          cause: 'No standby branch, so the alert state is never reset.',
          solution: 'Make sure the ELSE / standby path turns the LEDs off and removes the warning text when volume is below the threshold.',
        },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        'Student can give examples of different types of data.',
        'Student connected CyberPi and read the sound sensor.',
        'Student displayed the volume using a variable.',
        'Student used a threshold + conditional to trigger an alert.',
        'Student demonstrated the working detector and explained a real use.',
      ] as string[],
    },
    {
      type: 'homework',
      title: 'Practice & Reflect',
      emoji: '🏠',
      content: [
        'Find 3 places in your home or neighbourhood where a noise detector would be useful. Write down what the "too loud" limit should be for each.',
        'List 3 other kinds of data you meet every day (e.g. a weather report, bus arrival times, a step counter) and what problem each one helps solve.',
        'Optional: sketch an upgrade for your detector and bring the idea next lesson.',
      ] as string[],
      studentContent: [
        '🏠 Find 3 places a noise detector would help — what\'s the right limit for each?',
        '📊 List 3 kinds of data you see every day and what they\'re for',
        '✏️ Sketch one upgrade idea for next time!',
      ],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        'BIG IDEA: The lesson is really about DATA — the noise detector is the hook. Keep linking "sensor reading" back to "this is data".',
        'THRESHOLD: 40 is just the example value. Encourage students to experiment — owning the number increases engagement.',
        'PACING: The 20-minute Elaborate build is the core. If short on time, trim the survey/discussion, not the build.',
        'DATA VARIABLE: The "store volume in a variable" trick is the key teaching moment — make sure everyone sees why the raw value is hard to read.',
        'REAL-WORLD TIE-IN: Libraries, hospitals, exam halls, cinemas are great discussion examples for where this matters.',
      ] as string[],
    },
  ],
  resources: [
    { id: 'mb2l1-r1', title: 'Lesson 1 Visual Aids (Slides)',  type: 'slides', audience: 'coach',   url: 'https://drive.google.com/drive/folders/roboholic-mbot2', description: 'Projector slides referenced in the plan', needsReview: true },
    { id: 'mb2l1-r2', title: 'Demo Program (.mblock)',          type: 'code',   audience: 'coach',   url: 'https://drive.google.com/drive/folders/roboholic-mbot2', description: 'Finished noise detector program',        needsReview: true },
    { id: 'mb2l1-r3', title: 'Original Lesson Plan (PDF)',      type: 'pdf',    audience: 'coach',   url: 'https://drive.google.com/drive/folders/roboholic-mbot2', description: 'Full Makeblock lesson plan',             needsReview: true },
  ],
};
