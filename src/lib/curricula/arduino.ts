import type { Course, LessonDetail, LessonImage, LessonSection, QuizQuestion } from '@/types';

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
  kit?: 'ps' | 's';  // 'ps' = Power Supply Kit, 's' = 37 Sensor Kit (default)
  quiz?: QuizQuestion[];
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
  const kit = c.kit ?? 's';
  const slug = kit === 'ps' ? `ard-ps${c.n}` : `ard-s${c.n}`;
  const kitName = kit === 'ps' ? 'Power Supply Kit' : '37 Sensor Kit';
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        `Have an Arduino Uno + the ${kitName}, a breadboard, and jumper wires per student or pair, with the Arduino IDE installed.`,
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

  const moduleTitle = kit === 'ps'
    ? (c.module === 1 ? 'Power Supply Kit — Basics'
      : c.module === 2 ? 'Power Supply Kit — Displays & Sensors'
      : 'Power Supply Kit — Motors & Motion')
    : (c.module === 1 ? '37 Sensor Kit — Outputs, Switches & Buzzers'
      : c.module === 2 ? '37 Sensor Kit — Sensors & Detectors'
      : '37 Sensor Kit — Analog, Motion & Advanced');

  return {
    id: slug,
    slug,
    title: c.title,
    programId: 'arduino',
    programSlug: 'arduino',
    programTitle: 'Arduino',
    programColor: '#0D9488',
    courseId: 'arduino-electronics',
    courseTitle: 'Arduino: Electronics & Coding',
    moduleId: kit === 'ps' ? `ard-pm${c.module}` : `ard-sm${c.module}`,
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
    ...(c.quiz ? { quiz: c.quiz } : {}),
    resources: [
      { id: `${slug}-r1`, title: `${kitName} — Tutorial (PDF)`, type: 'pdf', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-arduino', description: 'Official kit guide (wiring + code for every module)', needsReview: true },
    ],
  };
}

const CONFIGS: ArdConfig[] = [
  // ── Power Supply Learning Kit (foundational: 23 lessons) ──
  { n: 1,  kit: 'ps', title: 'Blink', module: 1, emoji: '💡', pages: 7, difficulty: 3, concept: 'The classic first Arduino program.', does: 'It blinks the on-board LED on and off — proving your code uploads and runs on the board.', skills: ['Digital Output', 'delay()', 'IDE Basics'],
    quiz: [
      { question: 'In Arduino code, which function runs once at the start?', options: ['setup()', 'loop()', 'main()', 'start()'], answerIndex: 0, explanation: 'setup() runs once; loop() repeats forever.' },
      { question: 'digitalWrite(pin, HIGH) does what to an LED pin?', options: ['turns it on', 'turns it off', 'reads it', 'deletes it'], answerIndex: 0 },
      { question: 'delay(1000) pauses for:', options: ['1 second (1000 ms)', '1000 seconds', '1 minute', 'no time'], answerIndex: 0 },
    ] },
  { n: 2,  kit: 'ps', title: 'Button', module: 1, emoji: '🔘', pages: 4, difficulty: 3, concept: 'A push button input.', does: 'The Arduino reads whether the button is pressed and reacts (e.g. lights an LED).', skills: ['Digital Input', 'Buttons', 'if'],
    quiz: [
      { question: 'Which function reads whether a button pin is pressed?', options: ['digitalRead()', 'digitalWrite()', 'delay()', 'tone()'], answerIndex: 0 },
      { question: 'A button is an example of a digital:', options: ['input', 'output', 'motor', 'resistor'], answerIndex: 0 },
      { question: 'To do something only when pressed you use:', options: ['an if statement', 'a delay', 'a comment', 'a colour'], answerIndex: 0 },
    ] },
  { n: 3,  kit: 'ps', title: 'Flowing LED Lights', module: 1, emoji: '🌊', pages: 3, difficulty: 3, concept: 'A row of LEDs.', does: 'Lighting them one after another with a loop makes a flowing "chase" effect.', skills: ['Loops', 'Arrays', 'LEDs'] },
  { n: 4,  kit: 'ps', title: 'Active Buzzer', module: 1, emoji: '🔔', pages: 3, difficulty: 3, concept: 'An active buzzer.', does: 'It beeps with a fixed tone when switched on — the simplest sound output.', skills: ['Buzzer', 'Digital Output', 'Sound'] },
  { n: 5,  kit: 'ps', title: 'Passive Buzzer', module: 1, emoji: '🎵', pages: 3, difficulty: 3, concept: 'A passive buzzer.', does: 'Toggling it at different speeds plays different tones — you can play a melody.', skills: ['tone()', 'Frequency', 'Music'] },
  { n: 6,  kit: 'ps', title: 'Photoresistor', module: 1, emoji: '🔆', pages: 3, difficulty: 3, concept: 'A light-dependent resistor (LDR).', does: 'The Arduino reads the surrounding light level as an analog value.', skills: ['analogRead', 'Light', 'Sensors'],
    quiz: [
      { question: 'A photoresistor (LDR) changes its resistance with:', options: ['light level', 'temperature', 'sound', 'colour of the wire'], answerIndex: 0 },
      { question: 'Which function reads a varying (analog) sensor value?', options: ['analogRead()', 'digitalRead()', 'digitalWrite()', 'delay()'], answerIndex: 0 },
      { question: 'A digital input is on/off, while an analog input gives:', options: ['a range of values', 'only HIGH', 'only LOW', 'no value'], answerIndex: 0 },
    ] },
  { n: 7,  kit: 'ps', title: 'RGB LED', module: 1, emoji: '🌈', pages: 3, difficulty: 3, concept: 'A full-colour RGB LED.', does: 'Mixing red, green, and blue with PWM (analogWrite) makes any colour.', skills: ['PWM', 'analogWrite', 'Colour'],
    quiz: [
      { question: 'Which function sets a PWM (varying) output, e.g. brightness?', options: ['analogWrite()', 'digitalWrite()', 'digitalRead()', 'delay()'], answerIndex: 0 },
      { question: 'An RGB LED makes colours by mixing:', options: ['red, green and blue', 'black and white', 'yellow only', 'sound'], answerIndex: 0 },
      { question: 'PWM works by:', options: ['switching the pin on/off very fast to control average power', 'using Wi-Fi', 'reading a sensor', 'playing music'], answerIndex: 0 },
    ] },
  { n: 8,  kit: 'ps', title: 'Servo Motor', module: 2, emoji: '⚙️', pages: 2, difficulty: 3, concept: 'A servo motor.', does: 'It moves to a precise angle (0–180°) on command — used for steering and arms.', skills: ['Servo', 'Angles', 'Libraries'] },
  { n: 9,  kit: 'ps', title: 'LCD1602 Display', module: 2, emoji: '🔡', pages: 3, difficulty: 3, concept: 'A 16×2 character LCD.', does: 'It displays two lines of text — perfect for showing sensor readings and messages.', skills: ['LCD', 'Display', 'Libraries'] },
  { n: 10, kit: 'ps', title: 'Thermistor', module: 2, emoji: '🌡️', pages: 2, difficulty: 3, concept: 'A thermistor.', does: 'Its resistance changes with temperature; the code converts the analog reading into °C.', skills: ['analogRead', 'Temperature', 'Maths'] },
  { n: 11, kit: 'ps', title: 'Voltmeter', module: 2, emoji: '🔋', pages: 2, difficulty: 3, concept: 'A voltage divider.', does: 'The Arduino reads an analog voltage and calculates the value — a simple voltmeter.', skills: ['analogRead', 'Voltage', 'Maths'] },
  { n: 12, kit: 'ps', title: 'Ultrasonic Distance', module: 2, emoji: '📡', pages: 3, difficulty: 3, concept: 'An HC-SR04 ultrasonic sensor.', does: 'It measures distance by sending a pulse and timing the echo.', skills: ['Ultrasonic', 'Distance', 'Timing'] },
  { n: 13, kit: 'ps', title: 'Stopwatch', module: 2, emoji: '⏱️', pages: 3, difficulty: 3, concept: 'A timing project.', does: 'Using millis() and a display, it counts elapsed time like a stopwatch.', skills: ['millis()', 'Timing', 'Display'] },
  { n: 14, kit: 'ps', title: '74HC595 & Segment Display', module: 2, emoji: '🔢', pages: 5, difficulty: 4, concept: 'A shift register driving a 7-segment display.', does: 'The 74HC595 lets the Arduino show digits using only a few pins.', skills: ['Shift Register', '7-Segment', 'Bits'] },
  { n: 15, kit: 'ps', title: 'Joystick', module: 2, emoji: '🕹️', pages: 2, difficulty: 3, concept: 'A 2-axis joystick.', does: 'It gives X and Y analog values plus a button press for two-direction control.', skills: ['Analog', 'Two Axes', 'Control'] },
  { n: 16, kit: 'ps', title: '1-Channel Relay', module: 3, emoji: '🔌', pages: 2, difficulty: 4, concept: 'A relay.', does: 'It lets the Arduino switch a separate, higher-power circuit on and off.', skills: ['Relay', 'Switching', 'Power'] },
  { n: 17, kit: 'ps', title: 'DC Motors', module: 3, emoji: '🌀', pages: 5, difficulty: 4, concept: 'A DC motor.', does: 'Driven through a transistor/driver, it spins — and PWM controls its speed.', skills: ['DC Motor', 'PWM', 'Drivers'] },
  { n: 18, kit: 'ps', title: 'DC Motors Reversing', module: 3, emoji: '🔄', pages: 5, difficulty: 4, concept: 'A DC motor with an H-bridge.', does: 'The H-bridge lets the Arduino spin the motor both forwards and backwards.', skills: ['H-Bridge', 'Direction', 'Motors'] },
  { n: 19, kit: 'ps', title: 'Stepper Motor', module: 3, emoji: '🎯', pages: 5, difficulty: 4, concept: 'A stepper motor.', does: 'It rotates in precise steps for accurate positioning.', skills: ['Stepper', 'Precision', 'Steps'] },
  { n: 20, kit: 'ps', title: 'Automatic Light Tracking', module: 3, emoji: '🔭', pages: 3, difficulty: 4, concept: 'A light-following system.', does: 'LDRs plus a servo make the sensor turn toward the brightest light — like a solar tracker.', skills: ['LDR', 'Servo', 'Feedback'] },
  { n: 21, kit: 'ps', title: 'Packing (Project)', module: 3, emoji: '📦', pages: 3, difficulty: 3, concept: 'A wrap-up build.', does: 'It combines parts you have learned into a finished, packaged project.', skills: ['Integration', 'Project', 'Assembly'] },
  { n: 22, kit: 'ps', title: 'MPU6050 Motion Sensor', module: 3, emoji: '📲', pages: 6, difficulty: 4, concept: 'An accelerometer + gyroscope (MPU6050).', does: 'It measures tilt and motion in three axes over I2C — how phones sense orientation.', skills: ['MPU6050', 'I2C', 'Motion'] },
  { n: 23, kit: 'ps', title: 'Stepper Motor & ULN2003', module: 3, emoji: '⚙️', pages: 5, difficulty: 4, concept: 'A 28BYJ-48 stepper with a ULN2003 driver.', does: 'The driver board lets the Arduino run the geared stepper smoothly and precisely.', skills: ['Stepper', 'ULN2003', 'Drivers'] },

  // ── 37 Sensor Kit (29 lessons) ──
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

// Map a config to a course lesson-listing entry with the correct id per kit.
const entry = (c: ArdConfig) => ({
  id: (c.kit ?? 's') === 'ps' ? `ard-ps${c.n}` : `ard-s${c.n}`,
  title: c.title, duration: '45 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.n,
});
const pick = (kit: 'ps' | 's', module: 1 | 2 | 3) => CONFIGS.filter(c => (c.kit ?? 's') === kit && c.module === module).map(entry);

export const ARDUINO_COURSE: Course = {
  id: 'arduino-electronics',
  slug: 'electronics-and-coding',
  title: 'Arduino: Electronics & Coding',
  programId: 'arduino',
  programSlug: 'arduino',
  ageGroup: '13-15',
  level: 'Intermediate',
  description:
    'Hands-on electronics and coding with the Arduino Uno. Start with the Power Supply Learning Kit (Blink, buttons, motors, LCD, sensors) to learn the foundations, then explore the 37 Sensor Kit — wiring real modules to a breadboard and programming them in the Arduino (C++) language across 52 build-and-code lessons.',
  objectives: [
    'Wire electronic modules to an Arduino on a breadboard',
    'Read and write Arduino (C++) sketches',
    'Use digital and analog inputs and outputs, PWM, and the Serial Monitor',
    'Drive LEDs, buzzers, servos, DC and stepper motors, and displays',
    'Combine modules into real mini-projects',
  ],
  duration: '52 sessions × 45 minutes',
  totalHours: 40,
  lessonCount: 52,
  prerequisites: ['Comfortable with computers; basic typing'],
  skills: ['Electronics', 'Breadboarding', 'Arduino C++', 'Sensors & Motors', 'Digital & Analog I/O'],
  modules: [
    { id: 'ard-pm1', title: 'Power Supply Kit — Basics', order: 1,
      description: 'Blink, buttons, LEDs, buzzers, light, and colour — the Arduino foundations.',
      lessons: pick('ps', 1) },
    { id: 'ard-pm2', title: 'Power Supply Kit — Displays & Sensors', order: 2,
      description: 'Servo, LCD, thermistor, voltmeter, ultrasonic, stopwatch, 7-segment, joystick.',
      lessons: pick('ps', 2) },
    { id: 'ard-pm3', title: 'Power Supply Kit — Motors & Motion', order: 3,
      description: 'Relay, DC motors, H-bridge, steppers, light tracking, and the MPU6050.',
      lessons: pick('ps', 3) },
    { id: 'ard-sm1', title: '37 Sensor Kit — Outputs, Switches & Buzzers', order: 4,
      description: 'Temperature, switches, IR, buzzer, laser, RGB, and more.',
      lessons: pick('s', 1) },
    { id: 'ard-sm2', title: '37 Sensor Kit — Sensors & Detectors', order: 5,
      description: 'Tilt, reed, knock, flame, touch, thermistor, and light sensors.',
      lessons: pick('s', 2) },
    { id: 'ard-sm3', title: '37 Sensor Kit — Analog, Motion & Advanced', order: 6,
      description: 'Voice, joystick, analog Hall, tracking, encoder, relay, and pulse.',
      lessons: pick('s', 3) },
  ],
};
