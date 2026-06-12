import type { LessonDetail, LessonSection, LessonImage, Module, Difficulty } from '@/types';

// ════════════════════════════════════════════════════════════════
//  mBot2 — Part 2 (Makeblock Education). Four advanced strands added
//  on top of the IoT/CyberPi course:
//   • Getting Started Activities (9 official lessons — "Let's move!" … "mBot2 in the wild")
//   • Advanced AI: Smart Camera / Visual Recognition (7 lessons)
//   • Smart Logistics challenges + Bluetooth controller (5 lessons)
//   • Mini-projects & add-ons (3 lessons)
//  Lesson decks are the real Makeblock teacher/student books, rendered
//  to images; titles & objectives are transcribed from those decks.
// ════════════════════════════════════════════════════════════════

const M4 = 'Part 3 · Module 7: mBot2 Getting Started';
const M5 = 'Part 3 · Module 8: Advanced AI — Smart Camera Vision';
const M6 = 'Part 3 · Module 9: Smart Logistics Challenges';
const M7 = 'Part 3 · Module 10: Mini-Projects & Add-ons';

interface P2 {
  id: string; title: string; emoji: string; pages: number; difficulty: Difficulty;
  moduleId: string; moduleTitle: string; order: number;
  concept: string; conceptExplain: string;
  objectives: string[]; focus: string[];
  challenge: string; challengeSteps: string[]; skills: string[];
}

function gallery(slug: string, pages: number): LessonImage[] {
  const a: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) a.push({ src: `/lessons/${slug}/p-${String(i).padStart(2, '0')}.png`, kind: 'photo', caption: `Page ${i}` });
  return a;
}

function makeLesson(c: P2): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        `You need built mBot2 robots (with CyberPi) + USB-C cables and computers running mBlock (block coding). ${c.skills.includes('Smart Camera') ? 'This lesson also needs the mBuild Smart Camera attached and PixyMon installed.' : ''}`.trim(),
        `Concept: ${c.conceptExplain}`,
        'Open the lesson deck (shown below) — it is the official Makeblock teacher/student book. Build and test the program yourself first so you can demo it.',
        'The full teacher & student books (and any example code) are in the unit\'s Drive folder (see Resources).',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Lesson Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Walk through the deck pages below with the class, demonstrating the new blocks/hardware.',
        'CREATE: Students build the program in mBlock, test in live mode, then upload to the mBot2.',
        'EVALUATE: Students test on the robot, debug, and try the challenge.',
      ],
      images: gallery(c.id, c.pages),
    },
    {
      type: 'activity', title: `Activity: ${c.title}`, emoji: '🛠️',
      content: [
        `In this lesson you will: ${c.objectives.join('; ')}.`,
        'Build the program in mBlock (block coding), test it in live mode, then upload it to your mBot2 and try it on the robot.',
      ],
      studentContent: [
        `🎯 ${c.title}`,
        ...c.objectives.map(o => '• ' + o),
        '💻 Code it in mBlock → test in live mode → upload to the mBot2!',
      ],
    },
    {
      type: 'challenge', title: 'Challenge', emoji: '🚀',
      content: [c.challenge, ...c.challengeSteps],
      studentContent: [`🚀 ${c.challenge}`, ...c.challengeSteps.map(s => '• ' + s)],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [
        ...c.focus.map(f => 'Student knows: ' + f),
        'Student built, uploaded and tested a working program on the mBot2.',
      ],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'STRUCTURE: Makeblock lessons follow Engage → Investigate → Create → Evaluate. Use live mode to test quickly, upload mode to run untethered.',
        'The teacher & student books and example programs are in the unit Drive folder (Resources).',
        'SOURCE: Makeblock Education mBot2 curriculum.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: 'mbot2', programSlug: 'mbot2', programTitle: 'mBot2 / CyberPi', programColor: '#2563EB',
    courseId: 'mbot2-iot-1', courseTitle: 'mBot2: Coding, Robotics, IoT & AI',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: '10-12', level: 'Intermediate', duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [
      { item: 'mBot2 robot (with CyberPi)', quantity: '1 per pair' },
      { item: 'Computer with mBlock', quantity: '1 per pair' },
      { item: 'USB-C cable / 2.4G dongle', quantity: '1 per robot' },
      ...(c.skills.includes('Smart Camera') ? [{ item: 'mBuild Smart Camera + PixyMon', quantity: '1 per robot' }] : []),
    ],
    objectives: c.objectives,
    assessmentChecklist: [...c.focus.map(f => 'Knows ' + f.toLowerCase()), 'Built and tested the program on the mBot2.'],
    sections,
    heroImage: `/lessons/${c.id}/p-01.png`,
    resources: [
      { id: `${c.id}-r1`, title: `${c.title} — Lesson Book (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-mbot2', description: 'Makeblock Education teacher/student book', needsReview: true },
    ],
  };
}

const CONFIGS: P2[] = [
  // ─── Module 4: Getting Started (transcribed from the official decks) ───
  {
    id: 'mbot-gs-1', title: 'Let\'s move!', emoji: '🚗', pages: 10, difficulty: 2, moduleId: 'mbot2-m4', moduleTitle: M4, order: 15,
    concept: 'driving the mBot2 with precision', conceptExplain: 'The mBot2 drives with its two encoder motors. You can move it forward/backward a set distance and turn it by a set angle using the move and turn blocks — the encoders make it accurate.',
    objectives: ['Drive the mBot2 with precision'],
    focus: ['What movements the mBot2 can do', 'Which programming blocks make the mBot2 move'],
    challenge: 'Program the mBot2 to drive a precise square (or your initials) and return to the start.',
    challengeSteps: ['Use move-forward and turn blocks with set distances/angles.', 'Test, measure the error, and adjust the numbers.', 'Loop the four sides for a square.'],
    skills: ['Movement', 'Encoder Motors', 'mBlock'],
  },
  {
    id: 'mbot-gs-2', title: 'Sensing = data', emoji: '📊', pages: 16, difficulty: 2, moduleId: 'mbot2-m4', moduleTitle: M4, order: 16,
    concept: 'reading sensors and showing data', conceptExplain: 'A robot perceives its surroundings with sensors (its "senses"). The mBot2 can measure things like sound and temperature, show the data on the CyberPi screen, and you can run it in live mode (tethered) or upload mode (untethered).',
    objectives: ['Recognize and use the code blocks for operating the sensors', 'Show the data from the sensors on the display of the mBot2', 'Build your own program in mBlock to control the sensors and show the data'],
    focus: ['What sensors the mBot2 has', 'How the sensors work', 'The difference between live mode and upload mode', 'How to show sensor data on the CyberPi display'],
    challenge: 'Build a "classroom monitor" that shows the live sound level and temperature on the CyberPi screen.',
    challengeSteps: ['Read a sensor value into the program.', 'Show it on the CyberPi display in a forever loop.', 'Add a second sensor on another line.', 'Upload it and walk around taking readings.'],
    skills: ['Sensors', 'Data', 'CyberPi Display'],
  },
  {
    id: 'mbot-gs-3', title: 'Listen to mBot2', emoji: '🔊', pages: 9, difficulty: 2, moduleId: 'mbot2-m4', moduleTitle: M4, order: 17,
    concept: 'sound — speaker and microphone', conceptExplain: 'The mBot2 has a microphone and a speaker. With the microphone it records sound; with the speaker it plays sound back. You can also run several tasks side-by-side (in parallel).',
    objectives: ['Recognize and use the code blocks for controlling the speaker and microphone', 'Build a program to make the mBot2 record sound and play it back', 'Run multiple programming tasks side by side'],
    focus: ['How to use the speaker in coding and robotics', 'How to record and play back sound', 'How to run multiple tasks in parallel'],
    challenge: 'Make the mBot2 a "parrot" — record a short sound, then play it back when you press a button.',
    challengeSteps: ['Use a record block on one event.', 'Play the recording on another event (button press).', 'Add a light/animation that runs in parallel while it plays.'],
    skills: ['Speaker', 'Microphone', 'Parallel Tasks'],
  },
  {
    id: 'mbot-gs-4', title: 'Seeing with sound', emoji: '📡', pages: 8, difficulty: 2, moduleId: 'mbot2-m4', moduleTitle: M4, order: 18,
    concept: 'the ultrasonic sensor', conceptExplain: 'Autonomous robots must avoid collisions. The mBot2\'s front ultrasonic sensor detects objects using sound humans can\'t hear (ultrasound) and reports the distance, so the robot can react to obstacles.',
    objectives: ['Understand what ultrasound is and how an ultrasonic sensor works', 'Know applications of these sensors in everyday life and robotics'],
    focus: ['Use an ultrasonic sensor for range and obstacle detection', 'Make the mBot2 react to obstacles and avoid them while driving'],
    challenge: 'Program an obstacle-avoiding robot that drives forward and turns away whenever something is too close.',
    challengeSteps: ['In a forever loop, read the ultrasonic distance.', 'If distance < a threshold → stop and turn.', 'Else → keep driving forward.', 'Tune the threshold and turn angle.'],
    skills: ['Ultrasonic Sensor', 'Obstacle Avoidance', 'Conditionals'],
  },
  {
    id: 'mbot-gs-5', title: 'Sightseeing', emoji: '🎨', pages: 15, difficulty: 3, moduleId: 'mbot2-m4', moduleTitle: M4, order: 19,
    concept: 'the colour / line-following (quad RGB) sensor', conceptExplain: 'The mBot2\'s quad RGB sensor reads the surface colour and the line beneath it. The robot can follow a line and trigger different actions when it sees different colours — like an automated tour bus following a route.',
    objectives: ['Understand how colour sensors work', 'Know their applications in everyday life and robotics'],
    focus: ['Make the mBot2 follow a line', 'Have the mBot2 perform actions based on colours'],
    challenge: 'Make a "tour bus" that follows a line and announces something (sound/display) when it reaches a coloured stop.',
    challengeSteps: ['Set up line-following with the quad RGB sensor.', 'In parallel, check the detected colour.', 'When a specific colour is seen → play a sound / show a message.', 'Test it around a coloured-stop track.'],
    skills: ['Quad RGB Sensor', 'Line Following', 'Colour Detection'],
  },
  {
    id: 'mbot-gs-6', title: 'Careful drive', emoji: '🧭', pages: 13, difficulty: 3, moduleId: 'mbot2-m4', moduleTitle: M4, order: 20,
    concept: 'the gyroscope & accelerometer', conceptExplain: 'A gyroscope measures tipping/turning speed; an accelerometer measures changes in velocity. Together they tell the robot about its position and motion in space — so it can react to sudden movements or bumpy/crashed roads.',
    objectives: ['Recognize and use the code blocks for the gyroscope/accelerometer in CyberPi', 'Build a program to measure changes in the inclination of the mBot2 and adjust its movements'],
    focus: ['How gyroscopes and accelerometers work and how their measurements combine', 'How to make a robot react to sudden changes and detect crashed or bumpy roads'],
    challenge: 'Make the mBot2 slow down (or stop and alert) when it detects a bumpy road or a sudden tilt.',
    challengeSteps: ['Read the accelerometer/gyro values.', 'Detect a sudden change (above a threshold).', 'On a bump → slow down or stop and flash a warning.', 'Test by driving over an uneven surface.'],
    skills: ['Gyroscope', 'Accelerometer', 'Motion Sensing'],
  },
  {
    id: 'mbot-gs-7', title: 'A network game', emoji: '📶', pages: 10, difficulty: 3, moduleId: 'mbot2-m4', moduleTitle: M4, order: 21,
    concept: 'wireless LAN between robots', conceptExplain: 'The mBot2\'s built-in Wi-Fi automatically forms a local network (LAN) with other mBot2/CyberPi within ~30 m — no access point needed. Robots can send each other messages and commands. Random selection adds unpredictability to a game.',
    objectives: ['Have multiple mBot2 communicate wirelessly without a Wi-Fi access point', 'Write a program to control multiple mBot2', 'Apply random selection in a program'],
    focus: ['What a LAN connection is', 'How to set up the connection and where to apply it', 'How random selection works in programming'],
    challenge: 'Build a 2-robot game (e.g. "Simon says" or tag) where one mBot2 sends a random command and the other reacts.',
    challengeSteps: ['Set up LAN messaging on both robots.', 'Robot A picks a random command and broadcasts it.', 'Robot B reacts to the received message.', 'Add scoring or rounds.'],
    skills: ['Wireless LAN', 'Messaging', 'Random'],
  },
  {
    id: 'mbot-gs-8', title: 'mBot2 at your service', emoji: '🗣️', pages: 18, difficulty: 4, moduleId: 'mbot2-m4', moduleTitle: M4, order: 22,
    concept: 'speech recognition & cloud messaging', conceptExplain: 'Speech recognition converts spoken words to text (over a Wi-Fi internet connection). Combined with variables, Boolean logic, and cloud messaging, the mBot2 can act as a service robot that holds a simple spoken dialog.',
    objectives: ['Make the mBot2 carry out tasks using speech recognition and a Wi-Fi connection', 'Combine speech recognition with variables for dialogs', 'Send messages via cloud messaging', 'Use Boolean statements with sensor data'],
    focus: ['What speech recognition is and how to apply it', 'How to make an internet connection using Wi-Fi', 'How to develop a dialog with the user', 'Send messages to remote computers via cloud messaging', 'Use variables to describe a stage in a process'],
    challenge: 'Program a "service robot" dialog: ask a question, recognise the spoken answer, and respond / act on it.',
    challengeSteps: ['Connect the mBot2 to Wi-Fi.', 'Ask a question on the display + speaker.', 'Use speech recognition to capture the answer into a variable.', 'Use Boolean logic to respond differently per answer.'],
    skills: ['Speech Recognition', 'Wi-Fi', 'Cloud Messaging', 'Variables & Boolean'],
  },
  {
    id: 'mbot-gs-9', title: 'mBot2 in the wild', emoji: '🤖', pages: 12, difficulty: 4, moduleId: 'mbot2-m4', moduleTitle: M4, order: 23,
    concept: 'machine learning & AI', conceptExplain: 'Machine Learning is a form of AI: based on collected data, a system chooses actions from the history of data and probability, without a hand-written algorithm. You integrate ML into the mBot2 and make its features work together as one ecosystem.',
    objectives: ['Integrate Machine Learning into programming the mBot2', 'Make multiple technical features of the mBot2 work together', 'Establish communication between the robot (upload mode) and the computer (mBlock stage)'],
    focus: ['What Machine Learning is and how to apply it', 'How to make the mBot2 act based on conditions', 'How the mBot2\'s features work together in an ecosystem', 'A communication protocol between the robot and the computer'],
    challenge: 'Train a simple ML model (e.g. gestures or images) and use it to control an mBot2 behaviour.',
    challengeSteps: ['Use mBlock\'s Machine Learning / Teachable Machine extension.', 'Train a model with a few categories of examples.', 'Map each category to an mBot2 action.', 'Test it live, then refine the training data.'],
    skills: ['Machine Learning', 'AI', 'Ecosystem'],
  },

  // ─── Module 5: Smart Camera (Advanced AI / Visual Recognition) ───
  {
    id: 'mbot-cam-1', title: 'Visual Lab Induction', emoji: '📷', pages: 11, difficulty: 3, moduleId: 'mbot2-m5', moduleTitle: M5, order: 24,
    concept: 'the Smart Camera & visual recognition', conceptExplain: 'The mBuild Smart Camera gives the mBot2 machine vision. PixyMon is the companion app used to set up and watch what the camera sees. A barcode label lets you trigger and interact with the camera.',
    objectives: ['Recognize and describe the basic features of the Smart Camera module', 'Operate PixyMon to perform basic visual recognition tasks', 'Use the barcode label to monitor and interact with the mBot2 + Smart Camera'],
    focus: ['What the mBot2 + Smart Camera can do', 'How to connect the Smart Camera to the mBot2'],
    challenge: 'Connect the Smart Camera, open PixyMon, and make the mBot2 react when the camera sees the barcode label.',
    challengeSteps: ['Attach the Smart Camera and open PixyMon.', 'Confirm the live camera view.', 'Detect the barcode label in your program.', 'React — e.g. show a message or move.'],
    skills: ['Smart Camera', 'PixyMon', 'Machine Vision'],
  },
  {
    id: 'mbot-cam-2', title: 'Object Recognition I', emoji: '🟥', pages: 9, difficulty: 3, moduleId: 'mbot2-m5', moduleTitle: M5, order: 25,
    concept: 'training colour signatures', conceptExplain: 'The Smart Camera recognises objects by "colour signatures" you train it on. Once a signature is learned, the camera can detect that object in its view and report it to the mBot2.',
    objectives: ['Train a colour signature on the Smart Camera', 'Detect a trained object from the mBot2 program'],
    focus: ['How the camera learns a colour signature', 'How to read a detection in code'],
    challenge: 'Train one colour signature and make the mBot2 react (move/sound) when it sees that object.',
    challengeSteps: ['Train a colour signature in PixyMon.', 'Read "object detected" in your program.', 'React when it is seen.', 'Test with the object at different distances.'],
    skills: ['Smart Camera', 'Colour Signatures', 'Recognition'],
  },
  {
    id: 'mbot-cam-3', title: 'Object Recognition II', emoji: '🟦', pages: 8, difficulty: 4, moduleId: 'mbot2-m5', moduleTitle: M5, order: 26,
    concept: 'recognising multiple objects', conceptExplain: 'The camera can track more than one signature at once. Your program can tell the objects apart and respond differently to each — the basis of sorting and selection tasks.',
    objectives: ['Train and detect multiple colour signatures', 'Respond differently to each recognised object'],
    focus: ['How to distinguish several objects', 'How to branch behaviour per object'],
    challenge: 'Train two signatures and make the mBot2 do a different action for each.',
    challengeSteps: ['Train two colour signatures.', 'In a loop, check which signature is seen.', 'Use if/else to act differently per object.', 'Test alternating the two objects.'],
    skills: ['Smart Camera', 'Multiple Objects', 'Selection'],
  },
  {
    id: 'mbot-cam-4', title: 'Object Recognition III', emoji: '🎯', pages: 9, difficulty: 4, moduleId: 'mbot2-m5', moduleTitle: M5, order: 27,
    concept: 'object position & size', conceptExplain: 'Beyond "what" it sees, the camera reports where the object is (x/y in the frame) and how big it is. Your robot can steer toward an object or judge how close it is from its size.',
    objectives: ['Read an object\'s position and size from the camera', 'Use that data to steer toward or follow an object'],
    focus: ['How position and size data are reported', 'How to make the robot track an object'],
    challenge: 'Make the mBot2 turn to keep a recognised object centred in its view (object following).',
    challengeSteps: ['Read the object\'s x-position.', 'If it\'s left → steer left; if right → steer right (proportional is best).', 'Drive forward while it\'s small (far), stop when big (near).', 'Test by moving the object around.'],
    skills: ['Smart Camera', 'Object Tracking', 'Proportional Control'],
  },
  {
    id: 'mbot-cam-5', title: 'Line Tracking with the Camera', emoji: '〰️', pages: 9, difficulty: 4, moduleId: 'mbot2-m5', moduleTitle: M5, order: 28,
    concept: 'vision-based line tracking', conceptExplain: 'The Smart Camera can detect a line in its view and report its direction — letting the mBot2 follow a line by camera, which handles curves and intersections better than a single floor sensor.',
    objectives: ['Use the Smart Camera to detect and follow a line', 'Steer the robot from the camera\'s line data'],
    focus: ['How the camera detects a line', 'How to follow it smoothly'],
    challenge: 'Make the mBot2 follow a curved line using only the Smart Camera.',
    challengeSteps: ['Enable line tracking on the camera.', 'Read the line\'s direction/offset.', 'Steer proportionally to stay on the line.', 'Tune for speed vs. stability on curves.'],
    skills: ['Smart Camera', 'Line Tracking', 'Steering'],
  },
  {
    id: 'mbot-cam-6', title: 'Path Selection', emoji: '🛤️', pages: 9, difficulty: 4, moduleId: 'mbot2-m5', moduleTitle: M5, order: 29,
    concept: 'choosing a path at intersections', conceptExplain: 'At a junction the camera can read markers/branches and the robot decides which way to go — combining line tracking with recognition to navigate a layout.',
    objectives: ['Detect intersections/markers with the camera', 'Make the robot choose a path based on what it sees'],
    focus: ['How to detect a junction', 'How to decide and turn the right way'],
    challenge: 'Navigate a track with branches: the mBot2 picks the correct path at each intersection using the camera.',
    challengeSteps: ['Follow the line until an intersection is detected.', 'Read the marker/branch to choose a direction.', 'Turn onto the chosen path and resume following.', 'Test the full route.'],
    skills: ['Smart Camera', 'Navigation', 'Decision Making'],
  },
  {
    id: 'mbot-cam-7', title: 'Mini-Capstone: Automatic Sorting Machine', emoji: '🏭', pages: 6, difficulty: 4, moduleId: 'mbot2-m5', moduleTitle: M5, order: 30,
    concept: 'an automatic sorting system', conceptExplain: 'The capstone combines everything: recognise objects by colour, then sort/route them automatically — exactly how vision systems work in real factories and logistics.',
    objectives: ['Combine recognition, movement and logic into one system', 'Build an automatic sorting machine with the mBot2 + Smart Camera'],
    focus: ['How to integrate the skills from this module', 'How vision-based sorting works in industry'],
    challenge: 'Build an automatic sorter: the mBot2 recognises objects by colour and routes each to the right place.',
    challengeSteps: ['Train the signatures for the items to sort.', 'For each detected item, decide its destination.', 'Drive/route it there (or signal a sorter).', 'Run a full batch and check accuracy.'],
    skills: ['Smart Camera', 'Sorting', 'Systems Integration'],
  },

  // ─── Module 6: Smart Logistics Challenges ───
  {
    id: 'mbot-ch-1', title: 'Smart Logistics Challenge 1', emoji: '📦', pages: 9, difficulty: 3, moduleId: 'mbot2-m6', moduleTitle: M6, order: 31,
    concept: 'a smart-logistics transport task', conceptExplain: 'Smart logistics uses robots to move goods automatically. In this challenge the mBot2 must complete a transport task on a logistics map — driving accurately and reacting to the course.',
    objectives: ['Plan and program the mBot2 to complete a logistics transport task', 'Combine driving and sensing reliably'],
    focus: ['How to break a transport task into steps', 'How to make a run repeatable'],
    challenge: 'Complete the Challenge 1 course: move the mBot2 from start to the goal accurately.',
    challengeSteps: ['Map out the route into straight runs and turns.', 'Program each segment; use sensors to stay accurate.', 'Test and refine the distances/angles.', 'Aim for a repeatable run.'],
    skills: ['Logistics', 'Accurate Driving', 'Planning'],
  },
  {
    id: 'mbot-ch-2', title: 'Smart Logistics Challenge 2', emoji: '📦', pages: 5, difficulty: 3, moduleId: 'mbot2-m6', moduleTitle: M6, order: 32,
    concept: 'a harder logistics task', conceptExplain: 'Building on Challenge 1, this task adds complexity (more turns, decisions, or precision) that the mBot2 must handle to deliver successfully.',
    objectives: ['Extend the logistics program to a more complex course', 'Use sensors/conditions to handle the added difficulty'],
    focus: ['How to handle decisions/precision in the course', 'How to debug a longer run'],
    challenge: 'Complete the Challenge 2 course within the rules.',
    challengeSteps: ['Identify what makes this course harder than Challenge 1.', 'Add the needed sensing/decisions.', 'Build, test, and debug segment by segment.', 'Run the full course.'],
    skills: ['Logistics', 'Conditionals', 'Debugging'],
  },
  {
    id: 'mbot-ch-3', title: 'Smart Logistics Challenge 3', emoji: '📦', pages: 5, difficulty: 4, moduleId: 'mbot2-m6', moduleTitle: M6, order: 33,
    concept: 'the advanced logistics challenge', conceptExplain: 'The final transport challenge requires combining accurate driving, sensing and decision-making to complete the toughest course — a mini competition task.',
    objectives: ['Complete the most complex logistics course', 'Optimise the run for reliability (and speed)'],
    focus: ['How to combine all the logistics skills', 'How to optimise a competition run'],
    challenge: 'Complete Challenge 3 and then optimise it for reliability and time.',
    challengeSteps: ['Plan the full route and decisions.', 'Program and test it in sections.', 'Improve reliability (squaring, sensors).', 'Time it and refine.'],
    skills: ['Logistics', 'Optimisation', 'Competition'],
  },
  {
    id: 'mbot-ch-4', title: 'Bluetooth Controller: Grab, Carry & Release', emoji: '🎮', pages: 12, difficulty: 3, moduleId: 'mbot2-m6', moduleTitle: M6, order: 34,
    concept: 'manual control with a Bluetooth controller', conceptExplain: 'With a Bluetooth controller (and a grabbing add-on), you drive the mBot2 by hand to grab an object, carry it, and release it — useful for teleoperated logistics tasks.',
    objectives: ['Connect and use a Bluetooth controller with the mBot2', 'Program controls to grab, carry and release an object'],
    focus: ['How to map controller buttons to robot actions', 'How to control a grabbing mechanism'],
    challenge: 'Use the controller to pick up an object, carry it across the map, and set it down on a target.',
    challengeSteps: ['Pair the Bluetooth controller.', 'Map sticks/buttons to drive + grab/release.', 'Practise the pick-carry-place sequence.', 'Run it on the logistics map.'],
    skills: ['Bluetooth Controller', 'Teleoperation', 'Mechanisms'],
  },
  {
    id: 'mbot-ch-5', title: 'Bluetooth Controller: Vertical Move & Turn', emoji: '🎮', pages: 10, difficulty: 3, moduleId: 'mbot2-m6', moduleTitle: M6, order: 35,
    concept: 'controlling lift and turning', conceptExplain: 'This activity maps the Bluetooth controller to vertical movement (raising/lowering a lift add-on) and turning — the controls needed to stack or shelve goods in a logistics scenario.',
    objectives: ['Map the controller to vertical (lift) movement and turning', 'Coordinate lift + turn to place goods'],
    focus: ['How to control a lift mechanism', 'How to coordinate movements precisely'],
    challenge: 'Use the controller to raise/lower a load and turn to place it on a shelf level.',
    challengeSteps: ['Map buttons to lift up/down and turn.', 'Practise precise positioning.', 'Place a load at a target height.', 'Combine with driving for a full task.'],
    skills: ['Bluetooth Controller', 'Lift Mechanism', 'Coordination'],
  },

  // ─── Module 7: Mini-Projects & Add-ons ───
  {
    id: 'mbot-x-1', title: 'CyberPi Getting Started Activities', emoji: '🖥️', pages: 20, difficulty: 2, moduleId: 'mbot2-m7', moduleTitle: M7, order: 36,
    concept: 'coding the CyberPi on its own', conceptExplain: 'CyberPi is the brain of the mBot2 and also works as a standalone coding device — with a colour screen, buttons, joystick, LEDs, speaker, microphone and sensors. These activities introduce coding it directly in mBlock.',
    objectives: ['Code the CyberPi\'s screen, buttons, joystick, LEDs and sensors', 'Build several small standalone CyberPi projects'],
    focus: ['What the CyberPi can do on its own', 'How to use its display, inputs and outputs'],
    challenge: 'Build a standalone CyberPi gadget (e.g. a dice, level meter, or mini-game) using its screen and inputs.',
    challengeSteps: ['Pick a small project idea.', 'Use the screen + buttons/joystick for interaction.', 'Add a sensor or the LEDs/speaker.', 'Upload and use it untethered.'],
    skills: ['CyberPi', 'Display & Inputs', 'mBlock'],
  },
  {
    id: 'mbot-x-2', title: 'Automated Parking Lot', emoji: '🅿️', pages: 20, difficulty: 3, moduleId: 'mbot2-m7', moduleTitle: M7, order: 37,
    concept: 'an automated parking system', conceptExplain: 'A project that models a smart car park: the mBot2 (and sensors) automate detecting, guiding or counting vehicles — applying sensing, logic and counting to a real-world system.',
    objectives: ['Design and program an automated parking-lot system', 'Use sensors and logic to detect and manage "vehicles"'],
    focus: ['How automated parking systems work', 'How to combine sensing, counting and signalling'],
    challenge: 'Build an automated parking lot that detects a vehicle, signals free/full, and keeps a count.',
    challengeSteps: ['Detect a vehicle with a sensor (ultrasonic/line/camera).', 'Update a "spaces" count with each entry/exit.', 'Signal free/full on the display or LEDs.', 'Test the full entry-exit cycle.'],
    skills: ['Sensors', 'Counting & Logic', 'Systems'],
  },
  {
    id: 'mbot-x-3', title: 'Smart World Add-on Challenges', emoji: '🌍', pages: 20, difficulty: 3, moduleId: 'mbot2-m7', moduleTitle: M7, order: 38,
    concept: 'the Smart World add-on challenges', conceptExplain: 'The Smart World add-on extends the mBot2 with parts to model real-world "smart city" scenarios (traffic, gates, etc.). These challenges apply coding and sensing to those builds.',
    objectives: ['Build and program Smart World add-on scenarios', 'Apply sensing and logic to smart-city style challenges'],
    focus: ['What the Smart World add-on enables', 'How to program real-world scenario builds'],
    challenge: 'Complete a Smart World challenge (e.g. a smart gate or traffic system) with the mBot2.',
    challengeSteps: ['Build the add-on for the chosen scenario.', 'Program the trigger → action behaviour.', 'Use a sensor to make it automatic.', 'Test and refine the scenario.'],
    skills: ['Smart City', 'Add-ons', 'Automation'],
  },
];

export const MBOT2_P2_LESSONS: LessonDetail[] = CONFIGS.map(makeLesson);

const L = (c: P2) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const MBOT2_P2_MODULES: Module[] = [
  { id: 'mbot2-m4', title: M4, order: 7, description: 'The 9 official mBot2 Getting Started activities — movement, every sensor, sound, wireless, speech and machine learning.', lessons: CONFIGS.filter(c => c.moduleId === 'mbot2-m4').map(L) },
  { id: 'mbot2-m5', title: M5, order: 8, description: 'Machine vision with the mBuild Smart Camera — visual recognition, object tracking, line tracking, path selection and an automatic sorting capstone.', lessons: CONFIGS.filter(c => c.moduleId === 'mbot2-m5').map(L) },
  { id: 'mbot2-m6', title: M6, order: 9, description: 'Smart-logistics transport challenges plus Bluetooth-controller teleoperation (grab/carry/release and lift/turn).', lessons: CONFIGS.filter(c => c.moduleId === 'mbot2-m6').map(L) },
  { id: 'mbot2-m7', title: M7, order: 10, description: 'Standalone CyberPi coding, an automated parking lot, and the Smart World add-on challenges.', lessons: CONFIGS.filter(c => c.moduleId === 'mbot2-m7').map(L) },
];

export const MBOT2_P2_LESSON_COUNT = MBOT2_P2_LESSONS.length;
