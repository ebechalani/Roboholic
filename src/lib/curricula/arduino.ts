import type { Course, LessonDetail, LessonImage, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Arduino — "37 Sensor Kit" (RobotLinking)
//  Source: the official 37 Sensor Kit master tutorial PDF (wiring +
//  code per module), rasterized per lesson; each lesson also has its
//  .ino code in the kit. Ages 13–15. Electronics + C++ coding.
//  Module facts are standard electronics; coaching prompts are SUGGESTED.
// ════════════════════════════════════════════════════════════════

interface ArdConfig {
  n: number;
  title: string;
  module: 1 | 2 | 3;
  concept: string;   // what the module is
  does: string;      // what it does / detects / outputs
  pages: number;     // rasterized pages (p-01..pN)
  skills: string[];
  emoji: string;
  difficulty: 3 | 4;
}

function gallery(slug: string, pages: number): LessonImage[] {
  const imgs: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) {
    const n = String(i).padStart(2, '0');
    imgs.push({ src: `/lessons/${slug}/p-${n}.png`, kind: 'photo', caption: i === pages ? 'Wiring & code' : `Page ${i}` });
  }
  return imgs;
}

function makeArdLesson(c: ArdConfig): LessonDetail {
  const slug = `ard-s${c.n}`;
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Have an Arduino Uno + the 37 Sensor Kit, a breadboard, and jumper wires per student or pair, with the Arduino IDE installed.',
        `Build the ${c.title} circuit yourself first and upload the code so you can demo it.`,
        'Open the kit tutorial (Files section) — the wiring diagram and code for this module are on the pages shown below; the matching .ino file is in the kit folder.',
        `Concept: ${c.concept} ${c.does}`,
        'The kit tutorial is the official source; the coaching prompts and timings here are RoboHolic suggestions.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `INTRO (5 min): Introduce the ${c.title}. ${c.concept} ${c.does} Ask where it might be used in real devices.` },
        { step: 2, instruction: 'WIRE (10 min): Build the circuit on the breadboard following the wiring diagram (pages below). Double-check power (5V/GND) and the signal pin.', tip: 'Power off while wiring; check connections before plugging in USB.' },
        { step: 3, instruction: 'CODE & UPLOAD (15 min): Open the lesson code in the Arduino IDE, read it together, then upload to the board. Open the Serial Monitor where the sketch prints values.', coachNote: 'Have students predict what each line does before uploading.' },
        { step: 4, instruction: `TEST (5–10 min): Trigger the module and watch it work. ${c.does}` },
        { step: 5, instruction: 'DISCUSS (5 min): What changed in the reading? How could you use this module in a project?' },
      ],
    },
    {
      type: 'student_steps',
      title: `Build It: ${c.title} ${c.emoji}`,
      emoji: '🎯',
      studentTitle: `Build It: ${c.title} ${c.emoji}`,
      content: [
        'Wire the module to the Arduino following the diagram.',
        'Open the lesson code in the Arduino IDE.',
        'Upload it to the board.',
        'Open the Serial Monitor (if used) and trigger the module.',
        `Watch what happens: ${c.does}`,
      ],
      studentContent: [
        '🔌 Wire the module (check 5V / GND / signal)',
        '💻 Open & upload the code',
        '🖥️ Open the Serial Monitor',
        '🧪 Trigger it and watch!',
      ],
    },
    {
      type: 'activity',
      title: `Wire & Code: ${c.title}`,
      emoji: '🛠️',
      content: [
        `${c.concept} ${c.does}`,
        'Build the circuit from the wiring diagram, upload the code, and test. The pages below show the exact wiring and the full code listing.',
      ],
      studentContent: [
        '🔌 Build the circuit from the diagram',
        '💻 Upload the code',
        '🧪 Test it and read the values!',
      ],
      images: gallery(slug, c.pages),
    },
    {
      type: 'challenge',
      title: 'Tinker with the Code',
      emoji: '🎚️',
      content: [
        'Change a value in the code (a threshold, delay, or pin) and re-upload. What changes?',
        `Make the ${c.title} trigger something else — e.g. light an LED or print a message when it activates.`,
      ],
      studentContent: ['🎚️ Change a value and re-upload', '💡 Make it trigger an LED or message'],
    },
    {
      type: 'extra_challenge',
      title: 'Project Corner',
      emoji: '🌟',
      content: [
        `Combine the ${c.title} with another module you\'ve built into a mini-project.`,
        'Sketch a real device that would use this module.',
      ],
      studentContent: [`🔧 Combine it with another module`, '💡 Design a real device that uses it'],
    },
    {
      type: 'troubleshooting',
      title: 'Common Problems & Solutions',
      emoji: '🔧',
      isCoachOnly: true,
      content: [
        { problem: 'Nothing happens / no readings', cause: 'Wiring error — wrong pin, or swapped 5V/GND.', solution: 'Recheck the diagram: power to 5V & GND, signal to the correct pin. Confirm the pin number matches the code.' },
        { problem: 'Upload fails in the Arduino IDE', cause: 'Wrong board or port selected.', solution: 'Tools → Board → Arduino Uno, and Tools → Port → the connected port. Re-seat the USB cable.' },
        { problem: 'Serial Monitor shows nothing / gibberish', cause: 'Baud rate mismatch.', solution: 'Set the Serial Monitor baud rate to match Serial.begin() in the code (often 9600).' },
        { problem: 'Readings are noisy/unstable — Suggested', cause: 'Loose breadboard connections or no delay.', solution: 'Push components in firmly; add a small delay() in the loop to slow the readings.' },
      ],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        `Student can explain what the ${c.title} does.`,
        'Student wired the circuit correctly.',
        'Student uploaded the code and saw it work.',
        'Student modified a value and observed the effect.',
        'Student suggested a real-world use.',
      ],
    },
    {
      type: 'homework',
      title: 'Reflect & Explore',
      emoji: '🏠',
      content: [
        `Where is a ${c.title.toLowerCase()} used in real products? List 2 examples.`,
        'Write one sentence explaining the key line of code that reads or controls the module.',
      ],
      studentContent: [`🔎 Where is this module used in real life?`, '📝 Explain the key line of code'],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `MODULE: ${c.title} — ${c.concept} ${c.does}`,
        'SAFETY: wire with power off; double-check 5V/GND before connecting USB.',
        'CODE READING: have students predict behaviour before uploading — builds real understanding of C++/Arduino.',
        'The wiring diagram + full code are on the gallery pages; the .ino file is in the kit folder.',
        'SUGGESTED CONTENT: kit tutorial is official; the prompts here are RoboHolic suggestions.',
      ],
    },
  ];

  const moduleTitle = c.module === 1 ? 'Module 1: Outputs, Switches & Buzzers'
    : c.module === 2 ? 'Module 2: Sensors & Detectors'
    : 'Module 3: Analog, Motion & Advanced Modules';

  return {
    id: slug,
    slug,
    title: c.title,
    programId: 'arduino',
    programSlug: 'arduino',
    programTitle: 'Arduino',
    programColor: '#0D9488',
    courseId: 'arduino-37sensor',
    courseTitle: 'Arduino: 37 Sensor Kit',
    moduleId: `ard-m${c.module}`,
    moduleTitle,
    ageGroup: '13-15',
    level: 'Intermediate',
    duration: '45 minutes',
    difficulty: c.difficulty,
    heroImage: `/lessons/${slug}/p-01.png`,
    skills: c.skills,
    materials: [
      { item: 'Arduino Uno + 37 Sensor Kit', quantity: '1 per student or pair' },
      { item: 'Breadboard + jumper wires', quantity: '1 set per student or pair' },
      { item: 'Computer with the Arduino IDE', quantity: '1 per student or pair' },
    ],
    objectives: [
      `Understand what the ${c.title} is and does.`,
      'Wire the module to the Arduino correctly.',
      'Upload and read the Arduino (C++) code.',
      'Modify the code and observe the effect.',
    ],
    assessmentChecklist: [
      `Explained the ${c.title}.`,
      'Wired it correctly.',
      'Uploaded the code and tested it.',
      'Modified a value.',
    ],
    sections,
    resources: [
      { id: `${slug}-r1`, title: '37 Sensor Kit — Tutorial (PDF)', type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-arduino', description: 'Official kit guide (wiring + code for every module)', needsReview: true },
    ],
  };
}

const CONFIGS: ArdConfig[] = [
  { n: 1,  title: 'Temperature & Humidity Module (DHT11)', module: 1, emoji: '🌡️', pages: 3, difficulty: 3, concept: 'A DHT11 sensor.', does: 'It measures the temperature and humidity of the air and sends the readings to the Arduino.', skills: ['DHT11', 'Serial Monitor', 'Sensors'] },
  { n: 2,  title: 'Shock (Vibration) Switch', module: 1, emoji: '💥', pages: 2, difficulty: 3, concept: 'A vibration switch.', does: 'It closes briefly when shaken or knocked, so the Arduino can detect movement.', skills: ['Vibration', 'Digital Input'] },
  { n: 3,  title: 'Hall Magnetic Sensor', module: 1, emoji: '🧲', pages: 2, difficulty: 3, concept: 'A digital Hall sensor.', does: 'It detects the presence of a magnetic field and signals HIGH/LOW.', skills: ['Hall Effect', 'Magnets', 'Digital Input'] },
  { n: 4,  title: 'Button Switch', module: 1, emoji: '🔘', pages: 2, difficulty: 3, concept: 'A push button.', does: 'It is a simple digital input — pressed or not — the foundation of user controls.', skills: ['Buttons', 'Digital Input', 'Debounce'] },
  { n: 5,  title: 'Infrared Receiver & IR Emission', module: 1, emoji: '📡', pages: 5, difficulty: 4, concept: 'An IR receiver and emitter.', does: 'It receives codes from an IR remote (and can send them) — how TV remotes work.', skills: ['Infrared', 'Remote Control', 'Libraries'] },
  { n: 6,  title: 'Passive Buzzer', module: 1, emoji: '🔔', pages: 2, difficulty: 3, concept: 'A passive buzzer.', does: 'It makes tones when the Arduino switches it on and off quickly — changing the speed changes the pitch.', skills: ['Buzzer', 'Tone', 'Frequency'] },
  { n: 7,  title: 'Laser Module', module: 1, emoji: '🔴', pages: 2, difficulty: 3, concept: 'A laser diode module.', does: 'It emits a focused laser dot, controlled on/off like an LED.', skills: ['Laser', 'Digital Output', 'Safety'] },
  { n: 8,  title: 'RGB LED Module', module: 1, emoji: '🌈', pages: 3, difficulty: 3, concept: 'A full-colour RGB LED.', does: 'It mixes red, green, and blue (with PWM) to make any colour.', skills: ['RGB', 'PWM', 'Colour Mixing'] },
  { n: 9,  title: 'DS18B20 Digital Temperature Sensor', module: 1, emoji: '🌡️', pages: 2, difficulty: 4, concept: 'A DS18B20 sensor.', does: 'It gives a precise digital temperature reading over a 1-Wire connection.', skills: ['DS18B20', '1-Wire', 'Libraries'] },
  { n: 10, title: 'Photo-Interrupter Module', module: 1, emoji: '🚧', pages: 2, difficulty: 3, concept: 'A photo-interrupter.', does: 'It detects when an object blocks a light beam in its slot — used for counting and position.', skills: ['Optical', 'Beam Break', 'Counting'] },
  { n: 11, title: 'Mercury Switch', module: 2, emoji: '⚗️', pages: 2, difficulty: 3, concept: 'A mercury tilt switch.', does: 'A blob of mercury connects the contacts depending on the angle — detects tilt.', skills: ['Tilt', 'Switches', 'Orientation'] },
  { n: 12, title: 'Tilt Switch Module', module: 2, emoji: '📐', pages: 2, difficulty: 3, concept: 'A ball tilt switch.', does: 'A rolling ball opens/closes the contacts when tilted — a simple orientation sensor.', skills: ['Tilt', 'Digital Input', 'Orientation'] },
  { n: 13, title: 'Reed Switch', module: 2, emoji: '🧲', pages: 3, difficulty: 3, concept: 'A reed switch.', does: 'Its contacts close when a magnet is near — used in door/window alarms.', skills: ['Reed Switch', 'Magnets', 'Security'] },
  { n: 14, title: 'Dual-Colour LED', module: 2, emoji: '🚦', pages: 2, difficulty: 3, concept: 'A two-colour LED.', does: 'One LED with red and green — switch or mix them for different colours.', skills: ['LEDs', 'Digital Output', 'Colour'] },
  { n: 15, title: 'Knock Sensor', module: 2, emoji: '👊', pages: 2, difficulty: 3, concept: 'A knock/tap sensor.', does: 'It detects a sharp tap or knock — like a secret-knock trigger.', skills: ['Vibration', 'Detection', 'Triggers'] },
  { n: 16, title: 'Digital Temperature Module', module: 2, emoji: '🌡️', pages: 2, difficulty: 3, concept: 'A thermistor with a comparator.', does: 'It outputs HIGH/LOW when the temperature crosses an adjustable threshold.', skills: ['Threshold', 'Comparator', 'Temperature'] },
  { n: 17, title: 'Flame Sensor', module: 2, emoji: '🔥', pages: 2, difficulty: 3, concept: 'A flame (IR) sensor.', does: 'It detects the infrared light from a flame — the basis of a fire alarm.', skills: ['Flame Detection', 'Infrared', 'Safety'] },
  { n: 18, title: 'Metal Touch Module', module: 2, emoji: '✋', pages: 2, difficulty: 3, concept: 'A touch sensor.', does: 'It senses a finger touch and signals the Arduino — a touch button.', skills: ['Touch', 'Capacitive', 'Input'] },
  { n: 19, title: 'Analog Temperature Module (Thermistor)', module: 2, emoji: '🌡️', pages: 3, difficulty: 3, concept: 'A thermistor.', does: 'Its resistance changes with temperature; the Arduino reads it as an analog value.', skills: ['Thermistor', 'Analog Read', 'Maths'] },
  { n: 20, title: 'Photoresistor (LDR)', module: 2, emoji: '💡', pages: 3, difficulty: 3, concept: 'A light-dependent resistor.', does: 'Its resistance changes with light; the Arduino reads brightness as an analog value.', skills: ['LDR', 'Analog Read', 'Light'] },
  { n: 21, title: '7-Colour Flash LED', module: 3, emoji: '✨', pages: 2, difficulty: 3, concept: 'An auto-flashing RGB LED.', does: 'It cycles through seven colours on its own when powered.', skills: ['LEDs', 'Colour', 'Output'] },
  { n: 22, title: 'High-Sensitivity Voice Sensor', module: 3, emoji: '🎤', pages: 3, difficulty: 3, concept: 'A microphone/sound sensor.', does: 'It detects sound/loudness and can trigger actions (clap to activate).', skills: ['Sound', 'Microphone', 'Triggers'] },
  { n: 23, title: 'Magic Light Cup Module', module: 3, emoji: '🥤', pages: 2, difficulty: 4, concept: 'A pair of modules with a tilt sensor.', does: 'Using two modules and PWM, light appears to "pour" from one cup to the other as you tilt.', skills: ['PWM', 'Tilt', 'Effects'] },
  { n: 24, title: 'Joystick Module', module: 3, emoji: '🕹️', pages: 3, difficulty: 4, concept: 'A 2-axis joystick with a button.', does: 'It gives X and Y analog values plus a press — for controlling things in two directions.', skills: ['Analog', 'Two Axes', 'Control'] },
  { n: 25, title: 'Linear & Analog Hall Module', module: 3, emoji: '🧲', pages: 3, difficulty: 4, concept: 'An analog Hall sensor.', does: 'It measures the strength of a magnetic field as an analog value, not just on/off.', skills: ['Hall Effect', 'Analog Read', 'Magnets'] },
  { n: 26, title: 'Tracking & Avoidance Module', module: 3, emoji: '🛣️', pages: 3, difficulty: 4, concept: 'IR line-tracking & obstacle-avoidance sensors.', does: 'They detect a dark line below or an obstacle ahead using reflected IR — the basis of line-following robots.', skills: ['IR Sensing', 'Line Following', 'Robotics'] },
  { n: 27, title: 'Rotary Encoder Module', module: 3, emoji: '🎛️', pages: 3, difficulty: 4, concept: 'A rotary encoder.', does: 'It reports how far and which way a knob is turned — endless rotation input.', skills: ['Encoder', 'Rotation', 'Direction'] },
  { n: 28, title: '1-Channel Relay Module', module: 3, emoji: '🔌', pages: 2, difficulty: 4, concept: 'A relay.', does: 'It lets the Arduino switch a separate, higher-power circuit on and off — like a remote-controlled switch.', skills: ['Relay', 'Switching', 'Power'] },
  { n: 29, title: 'Heartbeat (Pulse) Module', module: 3, emoji: '❤️', pages: 2, difficulty: 4, concept: 'A pulse sensor.', does: 'It detects a heartbeat from a fingertip and the Arduino can measure the pulse.', skills: ['Pulse Sensor', 'Analog', 'Biometrics'] },
];

export const ARDUINO_LESSONS: LessonDetail[] = CONFIGS.map(makeArdLesson);

const L = (n: number, title: string, difficulty: 3 | 4, skills: string[]) =>
  ({ id: `ard-s${n}`, title, duration: '45 min', difficulty, skills: skills.slice(0, 2), order: n });

export const ARDUINO_COURSE: Course = {
  id: 'arduino-37sensor',
  slug: '37-sensor-kit',
  title: 'Arduino: 37 Sensor Kit',
  programId: 'arduino',
  programSlug: 'arduino',
  ageGroup: '13-15',
  level: 'Intermediate',
  description:
    'Hands-on electronics and coding with the Arduino Uno and the 37 Sensor Kit. Across 29 build-and-code lessons, students wire real modules — sensors, switches, LEDs, buzzers, motors, relays — to a breadboard and program them in the Arduino (C++) language.',
  objectives: [
    'Wire electronic modules to an Arduino on a breadboard',
    'Read and write Arduino (C++) sketches',
    'Use digital and analog inputs and outputs',
    'Read sensors via the Serial Monitor and react to them',
    'Combine modules into real mini-projects',
  ],
  duration: '29 sessions × 45 minutes',
  totalHours: 22,
  lessonCount: 29,
  prerequisites: ['Comfortable with computers; basic typing'],
  skills: ['Electronics', 'Breadboarding', 'Arduino C++', 'Sensors', 'Digital & Analog I/O'],
  modules: [
    {
      id: 'ard-m1', title: 'Module 1: Outputs, Switches & Buzzers', order: 1,
      description: 'First circuits: temperature, switches, IR, buzzer, laser, RGB, and more.',
      lessons: CONFIGS.filter(c => c.module === 1).map(c => L(c.n, c.title, c.difficulty, c.skills)),
    },
    {
      id: 'ard-m2', title: 'Module 2: Sensors & Detectors', order: 2,
      description: 'Tilt, reed, knock, flame, touch, thermistor, and light sensors.',
      lessons: CONFIGS.filter(c => c.module === 2).map(c => L(c.n, c.title, c.difficulty, c.skills)),
    },
    {
      id: 'ard-m3', title: 'Module 3: Analog, Motion & Advanced Modules', order: 3,
      description: 'Voice, joystick, analog Hall, tracking, encoder, relay, and pulse.',
      lessons: CONFIGS.filter(c => c.module === 3).map(c => L(c.n, c.title, c.difficulty, c.skills)),
    },
  ],
};
