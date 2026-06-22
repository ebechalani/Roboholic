import type { Course, LessonDetail, LessonSection, Module, Difficulty, QuizQuestion, LessonInteraction } from '@/types';
import { PYTHON_PLAY_MODULE } from './external-resources';

// ════════════════════════════════════════════════════════════════
//  Python & MicroPython (physical computing).
//  AUTHORED lessons (clearly "Suggested content") covering the topics
//  of the two reference books in the academy Drive:
//    • Wolfram Donat — "Getting Started with the micro:bit"
//    • Rui Santos — "MicroPython Programming with ESP32 and ESP8266"
//  Those books are COPYRIGHTED and are linked as optional reference
//  reading only — their pages are NOT reproduced here.
// ════════════════════════════════════════════════════════════════

interface PyLesson {
  n: number; title: string; emoji: string; difficulty: Difficulty;
  concept: string; conceptExplain: string; objectives: string[];
  code: string[]; challenge: string; challengeSteps: string[];
  hardware: string; skills: string[]; book?: 1 | 2;
  quiz?: QuizQuestion[]; playground?: { lang: 'html' | 'python'; starter: string }; interactions?: LessonInteraction[];
}

function makeLesson(c: PyLesson): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        `You need: ${c.hardware}`,
        'Run the example yourself first. SUGGESTED CONTENT: these lessons were authored by RoboHolic to teach the topics; the two reference books in the Resources are optional further reading (and are copyrighted — do not redistribute).',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Show the example code and explain each line.',
        'CREATE: Students type and run the code, then attempt the challenge.',
        'EVALUATE: Review the objectives and discuss what each line does.',
      ],
    },
    {
      type: 'student_steps', title: `Code It: ${c.title} ${c.emoji}`, emoji: '🎯',
      content: ['Type this program and run it:', ...c.code, 'Run it and observe the result, then try the challenge.'],
      studentContent: ['💻 Type and run:', ...c.code.map(s => '  ' + s), '▶️ Run it, then try the challenge!'],
    },
    {
      type: 'challenge', title: 'Challenge', emoji: '🚀',
      content: [c.challenge, ...c.challengeSteps],
      studentContent: [`🚀 ${c.challenge}`, ...c.challengeSteps.map(s => '• ' + s)],
    },
    {
      type: 'assessment', title: 'Assessment Checklist', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student typed, ran and debugged the program.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'SUGGESTED CONTENT — authored by RoboHolic. The reference books (Resources) cover this topic in more depth and are for the coach\'s own reading.',
      ],
    },
  ];

  const resources = c.book === 1
    ? [{ id: 'python-bk1', title: 'Reference: "Getting Started with the micro:bit" (Donat)', type: 'pdf' as const, audience: 'coach' as const, url: 'https://drive.google.com/drive/folders/roboholic-python', description: 'Optional reference reading (copyrighted — coach only)', needsReview: true }]
    : c.book === 2
      ? [{ id: 'python-bk2', title: 'Reference: "MicroPython Programming with ESP32 and ESP8266" (Santos)', type: 'pdf' as const, audience: 'coach' as const, url: 'https://drive.google.com/drive/folders/roboholic-python', description: 'Optional reference reading (copyrighted — coach only)', needsReview: true }]
      : [];

  return {
    id: `py-l${c.n}`, slug: `python-${c.n}`, title: c.title,
    programId: 'python', programSlug: 'python', programTitle: 'Python', programColor: '#1D4ED8',
    courseId: 'python-1', courseTitle: 'Python & MicroPython (Physical Computing)',
    moduleId: c.n <= 2 ? 'py-m1' : c.n <= 4 ? 'py-m2' : 'py-m3',
    moduleTitle: c.n <= 2 ? 'Module 1: Python Foundations' : c.n <= 4 ? 'Module 2: MicroPython on the micro:bit' : 'Module 3: MicroPython on the ESP32 (IoT)',
    ageGroup: '13-15', level: c.n <= 2 ? 'Beginner' : 'Intermediate', duration: '60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [{ item: c.hardware }],
    objectives: c.objectives,
    assessmentChecklist: c.objectives,
    sections,
    ...(c.quiz ? { quiz: c.quiz } : {}),
    ...(c.playground ? { playground: c.playground } : {}),
    ...(c.interactions ? { interactions: c.interactions } : {}),
    resources,
  };
}

const CONFIGS: PyLesson[] = [
  {
    n: 1, title: 'Python Basics: Variables & Input/Output', emoji: '🐍', difficulty: 2,
    concept: 'variables, types and input/output', conceptExplain: 'Python is a readable, beginner-friendly text language. Programs store data in variables, read input with input(), and show output with print().',
    objectives: ['Use print() and input()', 'Create variables and use int/float/str types', 'Do basic arithmetic'],
    hardware: 'A computer with Python 3 installed (or an online editor like replit.com).',
    code: ['name = input("Your name? ")', 'age = int(input("Your age? "))', 'print("Hi " + name + "! Next year you are", age + 1)'],
    challenge: 'Write a program that asks for two numbers and prints their sum, difference and product.',
    challengeSteps: ['Read two numbers with input() and int().', 'Compute the three results.', 'print() each with a label.', 'Test with different inputs.'],
    skills: ['Python', 'Variables', 'Input/Output'],
    playground: { lang: 'python', starter: 'name = "RoboHolic"\nage = 14\nprint("Hi " + name + "! Next year you are", age + 1)\n# Change name and age, then Run ▶' },
    quiz: [
      { question: 'Which function shows output on the screen?', options: ['input()', 'print()', 'show()', 'echo()'], answerIndex: 1 },
      { question: 'int("5") gives:', options: ['the text "5"', 'the number 5', 'an error', 'nothing'], answerIndex: 1, explanation: 'int() converts text to a whole number.' },
      { question: 'A variable in Python:', options: ['must start with $', 'stores a value under a name', 'can only hold numbers', 'never changes'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'x = 4\ny = 3\nprint(x + y, x * y)', question: 'What does this print?', options: ['7 12', '43 43', '12 7', 'x+y x*y'], answerIndex: 0, explanation: '4+3=7 and 4×3=12.' }],
  },
  {
    n: 2, title: 'Control Flow & Functions', emoji: '🔀', difficulty: 3,
    concept: 'decisions, loops and functions', conceptExplain: 'Programs make decisions with if/elif/else, repeat with for/while loops, and stay organised with reusable functions (def).',
    objectives: ['Use if/elif/else', 'Use for and while loops', 'Define and call a function'],
    hardware: 'A computer with Python 3 (or an online editor).',
    code: ['def is_even(n):', '    return n % 2 == 0', '', 'for i in range(1, 6):', '    print(i, "even" if is_even(i) else "odd")'],
    challenge: 'Write a function that returns the largest of three numbers, and test it in a loop.',
    challengeSteps: ['Define max3(a, b, c) using if/else.', 'Return the largest value.', 'Call it with several trios.', 'Print each result.'],
    skills: ['Conditionals', 'Loops', 'Functions'],
    playground: { lang: 'python', starter: 'def is_even(n):\n    return n % 2 == 0\n\nfor i in range(1, 6):\n    print(i, "even" if is_even(i) else "odd")\n# Try changing range(1, 6)' },
    quiz: [
      { question: 'What does a for loop do?', options: ['Makes a decision', 'Repeats code', 'Defines a function', 'Imports a library'], answerIndex: 1 },
      { question: 'def is used to:', options: ['delete a variable', 'define a function', 'divide numbers', 'declare a loop'], answerIndex: 1 },
      { question: 'n % 2 == 0 is True when n is:', options: ['odd', 'even', 'negative', 'zero only'], answerIndex: 1, explanation: '% is the remainder; even numbers divide by 2 with remainder 0.' },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'total = 0\nfor i in range(1, 4):\n    total += i\nprint(total)', question: 'What is printed?', options: ['3', '6', '123', '4'], answerIndex: 1, explanation: '1 + 2 + 3 = 6.' }],
  },
  {
    n: 3, title: 'MicroPython on the micro:bit I — Display & Buttons', emoji: '🔘', difficulty: 3, book: 1,
    concept: 'MicroPython on the micro:bit', conceptExplain: 'The BBC micro:bit runs MicroPython — a small Python for microcontrollers. Use the Python editor (python.microbit.org) to control the LED display and read the buttons.',
    objectives: ['Use the microbit module', 'Show text/images on the LED display', 'React to button A/B presses'],
    hardware: 'BBC micro:bit + USB lead; the micro:bit Python editor (python.microbit.org).',
    code: ['from microbit import *', '', 'while True:', '    if button_a.is_pressed():', '        display.show(Image.HAPPY)', '    else:', '        display.scroll("Hi")'],
    challenge: 'Make a counter: button A adds 1, button B resets to 0, and the number shows on the display.',
    challengeSteps: ['Keep a variable count = 0.', 'On button A pressed → count += 1.', 'On button B pressed → count = 0.', 'display.show(count) in the loop.'],
    skills: ['MicroPython', 'LED Display', 'Buttons'],
    quiz: [
      { question: 'Which import gives you the micro:bit features?', options: ['import microbit', 'from microbit import *', 'include microbit', 'using microbit'], answerIndex: 1 },
      { question: 'Which shows a scrolling message on the LEDs?', options: ['display.scroll("Hi")', 'print("Hi")', 'led.write("Hi")', 'show.text("Hi")'], answerIndex: 0 },
      { question: 'button_a.is_pressed() returns:', options: ['the letter A', 'True or False', 'a number 0-9', 'an image'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'from microbit import *\nwhile True:\n    if button_a.is_pressed():\n        display.show(Image.HAPPY)\n    else:\n        display.scroll("Hi")', question: 'What does the micro:bit do?', options: ['Always shows a happy face', 'Scrolls "Hi", but shows a happy face while A is held', 'Does nothing', 'Beeps when A is pressed'], answerIndex: 1, explanation: 'The if checks button A each loop; held → happy face, otherwise it scrolls "Hi".' }],
  },
  {
    n: 4, title: 'MicroPython on the micro:bit II — Sensors, Music & Radio', emoji: '📻', difficulty: 4, book: 1,
    concept: 'the micro:bit sensors, music and radio', conceptExplain: 'MicroPython exposes the accelerometer, compass and temperature sensor, can play music, and can send radio messages between micro:bits.',
    objectives: ['Read the accelerometer / gestures', 'Play a tune with the music module', 'Send and receive a radio message'],
    hardware: 'Two BBC micro:bits + USB leads; headphones/speaker (optional) for music.',
    code: ['from microbit import *', 'import radio', 'radio.on()', '', 'while True:', '    if accelerometer.was_gesture("shake"):', '        radio.send("hello")', '    msg = radio.receive()', '    if msg:', '        display.scroll(msg)'],
    challenge: 'Build a 2-micro:bit "message ping": shake one to light an icon on the other.',
    challengeSteps: ['radio.on() on both micro:bits.', 'On shake → radio.send a code.', 'On receive → display.show an image.', 'Test between two devices.'],
    skills: ['Sensors', 'Radio', 'Music'],
    quiz: [
      { question: 'Which detects the micro:bit being shaken?', options: ['accelerometer.was_gesture("shake")', 'display.shake()', 'button_a.shake()', 'radio.shake()'], answerIndex: 0 },
      { question: 'What must you call before sending radio messages?', options: ['radio.start()', 'radio.on()', 'radio.connect()', 'radio.begin()'], answerIndex: 1 },
      { question: 'radio lets two micro:bits:', options: ['charge faster', 'send messages wirelessly to each other', 'play louder', 'show more LEDs'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'if accelerometer.was_gesture("shake"):\n    radio.send("hello")', question: 'When is "hello" sent?', options: ['Every loop', 'Only when the micro:bit is shaken', 'When a button is pressed', 'Never'], answerIndex: 1 }],
  },
  {
    n: 5, title: 'MicroPython on the ESP32 — GPIO & Analog', emoji: '🔌', difficulty: 4, book: 2,
    concept: 'MicroPython on the ESP32/ESP8266', conceptExplain: 'The ESP32/ESP8266 are Wi-Fi microcontrollers. After flashing the MicroPython firmware, use an editor like Thonny to control GPIO pins — blink an LED, read a button, fade with PWM, and read analog values.',
    objectives: ['Flash MicroPython firmware and connect with Thonny', 'Control a digital output (LED) and read a digital input (button)', 'Use PWM and read an analog value'],
    hardware: 'ESP32 (or ESP8266) board + USB cable; an LED, button, resistor; Thonny IDE with MicroPython flashed.',
    code: ['from machine import Pin', 'from time import sleep', 'led = Pin(2, Pin.OUT)', '', 'while True:', '    led.value(1); sleep(0.5)', '    led.value(0); sleep(0.5)'],
    challenge: 'Make the LED brightness fade up and down using PWM.',
    challengeSteps: ['Import PWM from machine.', 'Create PWM on the LED pin.', 'Loop the duty cycle 0→1023→0.', 'Add small sleeps so the fade is visible.'],
    skills: ['ESP32', 'GPIO', 'PWM'],
    quiz: [
      { question: 'Pin(2, Pin.OUT) creates:', options: ['an input button', 'an output pin (e.g. to drive an LED)', 'a Wi-Fi connection', 'a timer'], answerIndex: 1 },
      { question: 'What is PWM used for here?', options: ['Connecting Wi-Fi', 'Fading an LED\'s brightness', 'Reading a sensor', 'Printing text'], answerIndex: 1, explanation: 'PWM rapidly switches the pin to control average power → brightness.' },
      { question: 'led.value(1) then led.value(0) with sleeps makes the LED:', options: ['stay off', 'blink', 'get brighter forever', 'beep'], answerIndex: 1 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'led = Pin(2, Pin.OUT)\nwhile True:\n    led.value(1); sleep(0.5)\n    led.value(0); sleep(0.5)', question: 'What does the LED do?', options: ['Stays on', 'Blinks on/off about once a second', 'Fades smoothly', 'Stays off'], answerIndex: 1, explanation: '0.5s on + 0.5s off ≈ one blink per second.' }],
  },
  {
    n: 6, title: 'ESP32 IoT — Wi-Fi & a Web Server', emoji: '🌐', difficulty: 4, book: 2,
    concept: 'connecting the ESP32 to Wi-Fi and serving a web page', conceptExplain: 'The ESP32 can join Wi-Fi and run a tiny web server, so you can control hardware (or read a sensor) from any phone/computer on the network — the basis of an IoT device.',
    objectives: ['Connect the ESP32 to Wi-Fi', 'Run a simple socket web server', 'Control an output (or read a sensor) from a web page'],
    hardware: 'ESP32 board + USB; an LED; a Wi-Fi network; Thonny with MicroPython.',
    code: ['import network', 'sta = network.WLAN(network.STA_IF)', 'sta.active(True)', 'sta.connect("SSID", "PASSWORD")', 'while not sta.isconnected():', '    pass', 'print("IP:", sta.ifconfig()[0])'],
    challenge: 'Serve a web page with ON/OFF links that switch the LED.',
    challengeSteps: ['Connect to Wi-Fi and print the IP.', 'Open a socket and listen on port 80.', 'Parse the request for /on or /off.', 'Set the LED pin and return an HTML page.'],
    skills: ['Wi-Fi', 'Web Server', 'IoT'],
    quiz: [
      { question: 'What does the ESP32 need to be an IoT device?', options: ['A bigger battery', 'A Wi-Fi connection', 'A second LED', 'A printer'], answerIndex: 1 },
      { question: 'After connecting to Wi-Fi, ifconfig()[0] gives the:', options: ['password', 'IP address', 'temperature', 'time'], answerIndex: 1 },
      { question: 'A tiny web server on the ESP32 lets you:', options: ['control hardware from a phone/computer on the network', 'charge the board', 'compile C++', 'edit photos'], answerIndex: 0 },
    ],
    interactions: [{ kind: 'predict', title: '🔮 Predict', code: 'sta.connect("SSID", "PASSWORD")\nwhile not sta.isconnected():\n    pass\nprint("IP:", sta.ifconfig()[0])', question: 'What does the while loop do?', options: ['Blinks an LED', 'Waits until Wi-Fi is connected', 'Sends a message', 'Counts to 10'], answerIndex: 1, explanation: 'It loops doing nothing until isconnected() becomes True.' }],
  },
];

export const PYTHON_LESSONS: LessonDetail[] = CONFIGS.map(makeLesson);

const sum = (c: PyLesson) => ({ id: `py-l${c.n}`, title: c.title, duration: '60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.n });

export const PYTHON_COURSE: Course = {
  id: 'python-1', slug: 'python', title: 'Python & MicroPython (Physical Computing)',
  programId: 'python', programSlug: 'python', ageGroup: '13-15', level: 'Intermediate',
  description: 'Start with core Python (variables, control flow, functions), then bring code into the physical world with MicroPython — first on the BBC micro:bit (display, buttons, sensors, radio) and then on the Wi-Fi-enabled ESP32/ESP8266 (GPIO, PWM, analog, and a web server for IoT). Authored by RoboHolic; the two reference books in the academy Drive are optional further reading.',
  objectives: [
    'Write Python programs using variables, control flow and functions',
    'Program the micro:bit in MicroPython (display, buttons, sensors, radio)',
    'Flash and program the ESP32/ESP8266 in MicroPython',
    'Control GPIO, PWM and analog hardware',
    'Connect to Wi-Fi and build a simple IoT web server',
  ],
  duration: '8 lessons × 45–60 minutes', totalHours: 8, lessonCount: 8,
  prerequisites: ['Comfortable with block coding (e.g. MakeCode/Scratch)'],
  skills: ['Python', 'MicroPython', 'micro:bit', 'ESP32', 'GPIO', 'IoT'],
  modules: [
    { id: 'py-m1', title: 'Module 1: Python Foundations', order: 1, description: 'Core Python: variables, input/output, control flow and functions.', lessons: CONFIGS.filter(c => c.n <= 2).map(sum) },
    { id: 'py-m2', title: 'Module 2: MicroPython on the micro:bit', order: 2, description: 'Bring Python to the micro:bit: display, buttons, sensors, music and radio.', lessons: CONFIGS.filter(c => c.n > 2 && c.n <= 4).map(sum) },
    { id: 'py-m3', title: 'Module 3: MicroPython on the ESP32 (IoT)', order: 3, description: 'GPIO, PWM, analog, Wi-Fi and a web server on the ESP32/ESP8266.', lessons: CONFIGS.filter(c => c.n > 4).map(sum) },
    PYTHON_PLAY_MODULE,
  ],
};
