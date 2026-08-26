// ════════════════════════════════════════════════════════════════
//  2026–2027 school-year enrolment: branches, class times and the
//  age-group tracks parents choose from on the public /enroll form.
//  Editing this file changes the public form AND the admin view.
// ════════════════════════════════════════════════════════════════

export interface Slot {
  id: string;
  day: string;      // 'Wednesday'
  time: string;     // '4:00 PM'
}

export interface Branch {
  id: 'jdeideh' | 'beit-chabeb';
  name: string;
  emoji: string;
  /** Weekly robotics & coding class times. */
  classSlots: Slot[];
  /** MakeX competition-prep times (a different day from the class). */
  makexSlots: Slot[];
  /** Shown when the branch itself has no MakeX squad. */
  makexNote?: string;
  /** Chess club times (a separate class from robotics & coding). */
  chessSlots: Slot[];
  /** Shown when the branch itself has no chess club. */
  chessNote?: string;
  /** Muay Thai class times (a separate class from robotics & coding). */
  muayThaiSlots: Slot[];
  /** Shown when the branch itself has no Muay Thai class. */
  muayThaiNote?: string;
  /** Drawing class times (a separate class from robotics & coding). */
  drawingSlots: Slot[];
  /** Shown when the branch itself has no drawing class. */
  drawingNote?: string;
}

export const BRANCHES: Branch[] = [
  {
    id: 'jdeideh', name: 'Jdeideh', emoji: '📍',
    classSlots: [
      { id: 'jd-wed-1600', day: 'Wednesday', time: '4:00 PM' },
      { id: 'jd-wed-1730', day: 'Wednesday', time: '5:30 PM' },
      { id: 'jd-thu-1730', day: 'Thursday', time: '5:30 PM' },
      { id: 'jd-fri-1600', day: 'Friday', time: '4:00 PM' },
      { id: 'jd-fri-1730', day: 'Friday', time: '5:30 PM' },
    ],
    makexSlots: [
      { id: 'jd-sat-1500', day: 'Saturday', time: '3:00 PM' },
      { id: 'jd-sat-1630', day: 'Saturday', time: '4:30 PM' },
    ],
    chessSlots: [
      { id: 'jd-chess-sat-1500', day: 'Saturday', time: '3:00 PM' },
      { id: 'jd-chess-sat-1630', day: 'Saturday', time: '4:30 PM' },
    ],
    muayThaiSlots: [
      { id: 'jd-mt-fri-1730', day: 'Friday', time: '5:30 PM' },
    ],
    drawingSlots: [
      { id: 'jd-draw-wed-1800', day: 'Wednesday', time: '6:00 PM' },
      { id: 'jd-draw-sat-1500', day: 'Saturday', time: '3:00 PM' },
      { id: 'jd-draw-sat-1630', day: 'Saturday', time: '4:30 PM' },
    ],
  },
  {
    id: 'beit-chabeb', name: 'Beit Chabeb', emoji: '📍',
    classSlots: [
      { id: 'bc-tue-1600', day: 'Tuesday', time: '4:00 PM' },
      { id: 'bc-fri-1600', day: 'Friday', time: '4:00 PM' },
      { id: 'bc-sat-0900', day: 'Saturday', time: '9:00 AM' },
      { id: 'bc-sat-1030', day: 'Saturday', time: '10:30 AM' },
    ],
    makexSlots: [],
    makexNote: 'The MakeX competition squad trains at our Jdeideh branch on Saturday — tick the box and we\'ll arrange it with you.',
    chessSlots: [],
    chessNote: 'The chess club runs at our Jdeideh branch on Saturday — tick the box and we\'ll arrange it with you.',
    muayThaiSlots: [],
    muayThaiNote: 'Muay Thai runs at our Jdeideh branch on Friday — register and we\'ll arrange it with you.',
    drawingSlots: [
      { id: 'bc-draw-sat-1100', day: 'Saturday', time: '11:00 AM' },
    ],
  },
];

export const branchById = (id: string) => BRANCHES.find(b => b.id === id);
export const slotLabel = (s: Slot) => `${s.day} · ${s.time}`;
/** Find a slot across every branch (used by the admin view). */
export function findSlot(id: string): Slot | undefined {
  for (const b of BRANCHES) {
    const s = [...b.classSlots, ...b.makexSlots, ...b.chessSlots, ...b.muayThaiSlots, ...b.drawingSlots].find(x => x.id === id);
    if (s) return s;
  }
  return undefined;
}

// ─── Age-group tracks ────────────────────────────────────────────
export interface Track {
  age: string;          // '4-5'
  name: string;         // 'Tiny Engineers'
  emoji: string;
  level: string;        // shown as the course level
  tagline: string;      // one warm sentence for parents
  includes: string[];   // what the year includes (real tools)
  outcome: string;      // what the child can do by the end
  /** Old enough for the MakeX competition squad (from age 6). */
  makexEligible: boolean;
}

export const TRACKS: Track[] = [
  {
    age: '4-5', name: 'Tiny Engineers', emoji: '🧸', level: 'Beginner · pre-readers',
    tagline: 'A first year of building, coding and storytelling — where your child programs a real robot before they can even read.',
    includes: [
      'mTiny screen-free robot — coding with cards, not screens',
      'LEGO Early Simple Machines: gears, levers and pulleys',
      'ScratchJr on tablets — bring your own characters to life',
      'Build a catapult, a crane, a carousel, a roller coaster',
      'Stories about family, friends and caring for the Earth',
    ],
    outcome: 'By the end of the year your child can build a working machine with gears and levers, program the mTiny robot to travel a route, and create their own animated story — all before reading fluently.',
    makexEligible: false,
  },
  {
    age: '6-7', name: 'Explorers', emoji: '🚀', level: 'Beginner',
    tagline: 'A year where curious six-year-olds build LEGO machines, give little robots their first commands, and discover they can make things happen.',
    includes: [
      'LEGO WeDo 2.0 robots with motors and tilt sensors',
      'LEGO Early Simple Machines: gears, levers, pulleys',
      'mTiny: screen-free coding with tap-and-play cards',
      'ScratchJr on tablets — own stories and mini-games',
      'Codey Rocky: a friendly robot, coded block by block',
      'First chess moves and screen-free CS puzzles',
    ],
    outcome: 'By the end of the year your child can build a working motorised LEGO model, program a robot to do exactly what they planned, and proudly explain how it works.',
    makexEligible: true,
  },
  {
    age: '8-9', name: 'Builders', emoji: '🔧', level: 'Beginner → Intermediate',
    tagline: 'The year building meets thinking: your child wires up sensors, writes real code, and watches their own ideas come to life.',
    includes: [
      'LEGO WeDo robots with motion & tilt sensors',
      'Codey Rocky: block coding, games, line-following',
      'micro:bit: step counter, nightlight, name badge',
      'Scratch games with scores, loops and characters',
      'Makey Makey: turn a banana into a game controller',
      'VEX VR robots, chess, and screen-free logic games',
    ],
    outcome: 'By the end of the year your child can build a working robot, program it to react to what it senses, and present a game or invention they made themselves.',
    makexEligible: true,
  },
  {
    age: '10-12', name: 'Innovators', emoji: '💡', level: 'Intermediate',
    tagline: 'The year ideas become machines — your child builds robots that sense and decide, designs real games, and flies a coded drone.',
    includes: [
      'mBot2 and LEGO EV3 robots with real sensors',
      'micro:bit projects: step counter, nightlight, games',
      'Tello drone: first flights, coded not joysticked',
      '3D design in Tinkercad, from idea to printed object',
      'Real video games built in MakeCode Arcade',
      'First steps in Python and text-based coding',
    ],
    outcome: 'By the end of the year your child can build a working robot, program it to sense its surroundings and decide what to do on its own, and confidently explain how they made it.',
    makexEligible: true,
  },
  {
    age: '13-15', name: 'Engineers', emoji: '⚙️', level: 'Advanced',
    tagline: 'The year your teen stops just using technology and starts building it — real circuits, real code, real robots, real projects.',
    includes: [
      'Arduino circuits and sensors, coded in C++',
      'Python & MicroPython on micro:bit and ESP32',
      'Flying and coding a real Tello EDU drone',
      'Websites built with HTML, CSS and JavaScript',
      '3D design in Tinkercad, printed for real',
      'Competition robotics: EV3, mBot2 and MakeX',
    ],
    outcome: 'By the end of the year your teen can wire and program their own device, write real code in Python and JavaScript, and present a finished project they designed and built themselves.',
    makexEligible: true,
  },
];

export const trackByAge = (age: string) => TRACKS.find(t => t.age === age);

// ─── Activities (the three tabs on the public form) ──────────────
export type ActivityId = 'robotics' | 'drawing' | 'muaythai';

export interface Activity {
  id: ActivityId;
  name: string;
  short: string;        // tab label
  emoji: string;
  color: string;
  blurb: string;        // one line under the tabs
  /** Times for this activity at a given branch. */
  slots: (b: Branch) => Slot[];
  /** Shown when the branch doesn't run this activity. */
  note: (b: Branch) => string | undefined;
}

export const ACTIVITIES: Activity[] = [
  {
    id: 'robotics', name: 'Robotics & Coding', short: 'Robotics', emoji: '🤖', color: '#2563EB',
    blurb: 'A full school year of robots, coding, drones and 3D design — for ages 4 to 15. Optional MakeX competition squad and chess club.',
    slots: b => b.classSlots, note: () => undefined,
  },
  {
    id: 'drawing', name: 'Drawing Classes', short: 'Drawing', emoji: '🎨', color: '#7C3AED',
    blurb: 'Saturday drawing classes — sketching, shading, colour and imagination, step by step from first lines to finished pieces.',
    slots: b => b.drawingSlots, note: b => b.drawingNote,
  },
  {
    id: 'muaythai', name: 'Muay Thai', short: 'Muay Thai', emoji: '🥊', color: '#DC2626',
    blurb: 'Fitness, discipline, technique and self-defence — taught in a safe, structured way for kids and teens.',
    slots: b => b.muayThaiSlots, note: b => b.muayThaiNote,
  },
];

export const activityById = (id: string) => ACTIVITIES.find(a => a.id === id);
