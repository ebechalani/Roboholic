import type { Course, LessonDetail, Resource, Material } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// ════════════════════════════════════════════════════════════════
//  CS Unplugged — computer science WITHOUT a computer.
//  Activities from the free, Creative-Commons (CC BY-SA) CS Unplugged
//  project (csunplugged.org). Each lesson links the official topic page
//  — in FRENCH where a translation exists (binary numbers, sorting
//  networks), in English otherwise — plus printable activity sheets.
//  The coaching scaffolding is RoboHolic's; the activities are theirs.
// ════════════════════════════════════════════════════════════════

const P: KitProgram = {
  programId: 'cs-unplugged', programSlug: 'cs-unplugged', programTitle: 'CS Unplugged', programColor: '#4338CA',
  courseId: 'cs-unplugged-1', courseTitle: 'CS Unplugged — Computer Science Without a Computer',
};

const M1 = "Module 1 · Représenter l'information (Data & Representation)";
const M2 = 'Module 2 · Algorithmes & pensée informatique (Algorithms)';

// Topics with a full French translation; everything else falls back to English.
const FR = new Set(['binary-numbers', 'sorting-networks']);
const topic = (slug: string, title: string): Resource => {
  const fr = FR.has(slug);
  return {
    id: `csu-${slug}`, title: `CS Unplugged — ${title}`, type: 'link', audience: 'both',
    url: `https://www.csunplugged.org/${fr ? 'fr' : 'en'}/topics/${slug}/`,
    description: fr
      ? 'Activité officielle CS Unplugged (en français) — plan de leçon, vidéos et fiches imprimables.'
      : 'Official CS Unplugged activity (English — French translation not yet available) — lesson plan, videos & printables.',
  };
};
const HOME: Resource = { id: 'csu-home', title: 'CS Unplugged — site officiel (FR)', type: 'link', audience: 'coach', url: 'https://www.csunplugged.org/fr/', description: "Informatique débranchée : activités gratuites sous licence Creative Commons (CC BY-SA)." };
const SHEETS: Material = { item: 'Printable activity sheets from the CS Unplugged topic page', quantity: 'per group' };

const res = (slug: string, title: string): Resource[] => [topic(slug, title), HOME];

const C: KitLesson[] = [
  // ─── Module 1 · Data & Representation ───
  {
    id: 'csu-1', title: 'Binary Numbers — Counting with On & Off', emoji: '🔢', difficulty: 2, ageGroup: '6-7', level: 'Beginner',
    moduleId: 'csu-m1', moduleTitle: M1, order: 1,
    concept: 'how computers store numbers using only two states (binary)',
    conceptExplain: 'Computers only understand two states — on/off, 1/0. With a row of dot-cards (16, 8, 4, 2, 1) students turn cards face-up or face-down to build any number, discovering how binary counting works. No screen required.',
    objectives: ['Explain that computers use only two states (0 and 1)', 'Build the numbers 0–31 with five binary cards', 'Encode a letter or their age as a binary code'],
    steps: [
      'Give each student the five dot-cards: 16, 8, 4, 2, 1 (face-down = 0, face-up = its value).',
      'Flip cards face-up so the dots add to a target number (e.g. 13 = 8 + 4 + 1).',
      'Practise counting 0, 1, 2, 3 … by flipping cards one step at a time.',
      'Send a secret "binary message": encode a letter (A = 1, B = 2 …) and have a partner decode it.',
    ],
    challenge: 'Write your age and the first letter of your name in 5-bit binary, then swap with a friend and decode theirs.',
    skills: ['Binary', 'Number Sense', 'Encoding'],
    quiz: [
      { question: 'Computers store information using only:', options: ['two states (0 and 1)', 'ten digits', 'letters', 'colours'], answerIndex: 0 },
      { question: 'With cards worth 16, 8, 4, 2, 1, the number 13 is:', options: ['8 + 4 + 1', '16 − 3', '8 + 2', '4 + 4 + 4 + 1'], answerIndex: 0 },
      { question: 'A single binary digit (0 or 1) is called a:', options: ['bit', 'byte', 'pixel', 'pen'], answerIndex: 0 },
    ],
    materials: [{ item: 'Binary dot-cards (set of 5 per student)', quantity: '1 set per student' }, SHEETS],
    resources: res('binary-numbers', 'Nombres binaires'),
  },
  {
    id: 'csu-2', title: 'Image Representation — Pictures Made of Pixels', emoji: '🖼️', difficulty: 2, ageGroup: '8-9', level: 'Beginner',
    moduleId: 'csu-m1', moduleTitle: M1, order: 2,
    concept: 'how pictures are stored as a grid of pixels and compressed with number codes',
    conceptExplain: 'A digital image is a grid of pixels, each black or white. To save space, computers can store the COUNTS of colours along each row (run-length encoding). Students decode number codes into a hidden picture, then encode a picture of their own.',
    objectives: ['Explain that images are made of pixels', 'Decode run-length number codes into a picture', 'Encode their own picture as numbers'],
    steps: [
      'Look at a black-and-white grid — each little square is a pixel.',
      'Read a row code like "4, 1, 3" = 4 white, 1 black, 3 white; colour that row in.',
      'Decode every row to reveal the hidden picture.',
      'Draw your own picture on a blank grid and write its row codes for a partner to decode.',
    ],
    challenge: 'Create a coded picture (your initial or a simple emoji) and have a partner decode it exactly.',
    skills: ['Pixels', 'Encoding', 'Compression'],
    quiz: [
      { question: 'A digital picture is made of tiny dots called:', options: ['pixels', 'bytes', 'cells', 'bits'], answerIndex: 0 },
      { question: 'The row code "4, 1, 3" means:', options: ['4 white, 1 black, 3 white', '4 + 1 + 3 = 8 black', '4 rows of 13', '413 pixels'], answerIndex: 0 },
      { question: 'Storing colour COUNTS instead of every pixel is a kind of:', options: ['compression (saving space)', 'deletion', 'encryption', 'printing'], answerIndex: 0 },
    ],
    materials: [{ item: 'Pixel-grid worksheets', quantity: 'per student' }, { item: 'Coloured pencils', quantity: 'per group' }, SHEETS],
    resources: res('image-representation', 'Image Representation'),
  },
  {
    id: 'csu-3', title: 'Error Detection — The Parity Card Trick', emoji: '🃏', difficulty: 2, ageGroup: '8-9', level: 'Beginner',
    moduleId: 'csu-m1', moduleTitle: M1, order: 3,
    concept: 'how computers detect (and fix) errors in data using a parity bit',
    conceptExplain: 'Data can get corrupted when it is stored or sent. Computers add extra "parity" bits so mistakes can be caught. With a magic trick — a 5×5 grid of two-colour cards plus a parity row and column — students detect a secretly flipped card every single time.',
    objectives: ['Explain why errors happen when data is stored or sent', 'Use a parity bit to detect an error', 'Find the single flipped card every time'],
    steps: [
      'Lay out a 5×5 grid of two-colour cards (each card a random colour up).',
      'Add a 6th "parity" card to each row and each column so every line shows an EVEN number of one colour.',
      'Close your eyes while a partner secretly flips exactly ONE card.',
      'Find the error: the row and column whose colour-count is now ODD cross at the flipped card.',
    ],
    challenge: 'Be the magician — set up the grid, let the class flip one card, and find it using parity alone.',
    skills: ['Error Detection', 'Parity', 'Logic'],
    quiz: [
      { question: 'A parity bit is added so that a computer can:', options: ['detect when data has an error', 'make data colourful', 'delete data', 'speed up the screen'], answerIndex: 0 },
      { question: 'In the trick, each row and column is set to an:', options: ['even number of one colour', 'odd number always', 'random number', 'count of 5'], answerIndex: 0 },
      { question: 'The flipped card is found where:', options: ['the odd row and odd column cross', 'the grid is biggest', 'two parity cards match', 'the centre is'], answerIndex: 0 },
    ],
    materials: [{ item: 'Two-colour cards / squares (36 per group)', quantity: 'per group' }, SHEETS],
    resources: res('error-detection-and-correction', 'Error Detection & Correction'),
  },

  // ─── Module 2 · Algorithms & Computational Thinking ───
  {
    id: 'csu-4', title: 'Kidbots — Program a Human Robot', emoji: '🤖', difficulty: 2, ageGroup: '6-7', level: 'Beginner',
    moduleId: 'csu-m2', moduleTitle: M2, order: 4,
    concept: 'giving a "robot" precise step-by-step instructions — programming and debugging, unplugged',
    conceptExplain: 'A program is an exact list of instructions. On a floor grid, one student is the "robot" who may ONLY follow forward/turn cards exactly as written. This teaches precise algorithms — and debugging, when the robot ends up somewhere it shouldn\'t. A perfect screen-free bridge to real robot programming.',
    objectives: ['Write a precise sequence of instructions (an algorithm)', 'Act as a robot that follows instructions exactly', 'Find and fix a bug in a program'],
    steps: [
      'Tape a grid on the floor; mark a START square and a TARGET square.',
      'One student is the "bot" and may only do three things: move forward, turn left, turn right.',
      'The team writes the whole program with arrow cards BEFORE the bot moves.',
      'Run the program step by step; if the bot misses the target, find the bug, fix it, and run again.',
    ],
    challenge: 'Program the bot around an obstacle to reach the target with no wrong moves — first try after debugging.',
    skills: ['Algorithms', 'Sequencing', 'Debugging'],
    quiz: [
      { question: 'A program is:', options: ['an exact list of instructions', 'a lucky guess', 'a drawing', 'a single button'], answerIndex: 0 },
      { question: 'When the robot ends up in the wrong place, you should:', options: ['debug — find and fix the wrong instruction', 'give up', 'push the robot', 'add more robots'], answerIndex: 0 },
      { question: 'The "robot" must follow the instructions:', options: ['exactly as written', 'however it likes', 'only the fun ones', 'backwards'], answerIndex: 0 },
    ],
    materials: [{ item: 'Floor grid (tape or mat)', quantity: '1 per group' }, { item: 'Arrow / instruction cards (forward, left, right)', quantity: 'per group' }, SHEETS],
    resources: res('kidbots', 'Kidbots (programming)'),
  },
  {
    id: 'csu-5', title: 'Sorting Networks — Many Comparisons at Once', emoji: '🔀', difficulty: 3, ageGroup: '8-9', level: 'Intermediate',
    moduleId: 'csu-m2', moduleTitle: M2, order: 5,
    concept: 'sorting by comparing and swapping — and doing many comparisons in parallel',
    conceptExplain: 'A sorting network is a diagram drawn on the ground. Students holding number cards walk through it; at each node two students compare numbers — the smaller takes one path, the larger the other. Amazingly everyone arrives in sorted order, and many comparisons happen at the SAME time (parallelism).',
    objectives: ['Compare and swap two values to order them', 'Follow a sorting network to sort six numbers', 'Explain why doing comparisons in parallel is faster'],
    steps: [
      'Draw the six-input sorting network with chalk outside (or tape it on the floor).',
      'Six students each take a number card and stand on the start nodes.',
      'Walk forward; at each circle, compare with the other person — smaller goes one way, larger the other.',
      'Reach the end and read the numbers in order — they come out sorted!',
    ],
    challenge: 'Time the network against sorting the six cards one-by-one by hand — which is faster, and why?',
    skills: ['Sorting', 'Parallelism', 'Algorithms'],
    quiz: [
      { question: 'At each node of a sorting network you:', options: ['compare two numbers and send them different ways', 'add the numbers', 'pick randomly', 'stop'], answerIndex: 0 },
      { question: 'A sorting network is fast because comparisons can happen:', options: ['at the same time (in parallel)', 'one per day', 'only on a computer', 'never'], answerIndex: 0 },
      { question: 'After passing through the network the numbers are:', options: ['in sorted order', 'shuffled', 'doubled', 'erased'], answerIndex: 0 },
    ],
    materials: [{ item: 'Chalk or floor tape (to draw the network)', quantity: '1 per group' }, { item: 'Number cards (six)', quantity: 'per group' }, SHEETS],
    resources: res('sorting-networks', 'Réseaux de tri'),
  },
  {
    id: 'csu-6', title: 'Searching Algorithms — Linear vs Binary Search', emoji: '🔎', difficulty: 3, ageGroup: '8-9', level: 'Intermediate',
    moduleId: 'csu-m2', moduleTitle: M2, order: 6,
    concept: 'two ways to find something in a list — checking each item vs halving a sorted list',
    conceptExplain: 'How do you find something in a list? Linear search checks each item one at a time. Binary search works on a SORTED list: jump to the middle and throw away half each guess — far fewer guesses. Students play both as games to feel the difference.',
    objectives: ['Use linear search to find a hidden number', 'Use binary search on a sorted list', 'Explain why binary search needs sorted data and is faster'],
    steps: [
      'Hide numbers under cups in a row (unsorted). Find a target by checking one cup at a time — count your guesses (linear search).',
      'Now use a SORTED row of numbers.',
      'Binary search: guess the MIDDLE number; learn "higher" or "lower"; repeat on the half that remains.',
      'Compare your guess counts: binary search needs far fewer.',
    ],
    challenge: 'Find a number in a sorted list of 32 in five guesses or fewer using binary search.',
    skills: ['Searching', 'Binary Search', 'Efficiency'],
    quiz: [
      { question: 'Linear search finds an item by:', options: ['checking each item one at a time', 'jumping to the middle', 'guessing once', 'sorting first'], answerIndex: 0 },
      { question: 'Binary search only works when the list is:', options: ['sorted', 'short', 'colourful', 'hidden'], answerIndex: 0 },
      { question: 'Compared to linear search, binary search usually needs:', options: ['far fewer guesses', 'more guesses', 'the same', 'no guesses'], answerIndex: 0 },
    ],
    materials: [{ item: 'Cups + number cards (or printed number lists)', quantity: 'per group' }, SHEETS],
    resources: res('searching-algorithms', 'Searching Algorithms'),
  },
  {
    id: 'csu-7', title: 'Data Structures for Searching', emoji: '🗂️', difficulty: 3, ageGroup: '13-15', level: 'Intermediate',
    moduleId: 'csu-m2', moduleTitle: M2, order: 7,
    concept: 'how the way data is organised changes how fast you can search it',
    conceptExplain: 'Searching is far faster when data is organised well. Students compare finding a value in an unsorted pile versus a sorted list, and meet the idea of structures (sorted lists, trees) that keep data quick to search — seeing that the right data structure makes all the difference.',
    objectives: ['Compare searching unsorted vs sorted data', 'Explain how the data structure affects search speed', 'Choose a better way to organise data for fast searching'],
    steps: [
      'Search an unsorted pile of cards for a value — count how many you check.',
      'Sort the cards, then binary-search for a value — count the checks again.',
      'Discuss structures that keep data searchable: sorted lists and trees.',
      'Decide how you would organise a class library so any book is found fast.',
    ],
    challenge: 'Propose and justify the best way to organise 100 items so any one can be found quickly.',
    skills: ['Data Structures', 'Searching', 'Efficiency'],
    quiz: [
      { question: 'Searching is fastest when the data is:', options: ['well organised (e.g. sorted)', 'in a random pile', 'hidden', 'doubled'], answerIndex: 0 },
      { question: 'A good data structure for fast searching is a:', options: ['sorted list or tree', 'random heap', 'single long sentence', 'blank page'], answerIndex: 0 },
      { question: 'The lesson shows that the data STRUCTURE affects:', options: ['how fast you can search', 'the colour of data', 'the price', 'nothing'], answerIndex: 0 },
    ],
    materials: [{ item: 'Number / word cards', quantity: 'per group' }, SHEETS],
    resources: res('data-structures-for-searching', 'Data Structures for Searching'),
  },
];

export const CS_UNPLUGGED_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));

export const CS_UNPLUGGED_COURSE: Course = {
  id: P.courseId, slug: 'cs-unplugged', title: P.courseTitle,
  programId: P.programId, programSlug: P.programSlug, ageGroup: '8-9', level: 'Beginner',
  description: 'Computer science WITHOUT a computer — hands-on, screen-free activities that build computational thinking. Module 1 represents information (binary numbers, pixels & images, error detection). Module 2 explores algorithms (Kidbots robot-programming, sorting networks, linear & binary search, data structures). Built from the free, Creative-Commons CS Unplugged project — French resources are linked where available, English otherwise. Perfect for screen-free sessions and as an unplugged bridge to real robot programming.',
  objectives: [
    'Represent numbers and images the way a computer does (binary, pixels)',
    'Detect errors in data using a parity bit',
    'Write, run and debug a precise algorithm (Kidbots)',
    'Compare and apply sorting and searching algorithms',
    'Explain how data structures make searching faster',
  ],
  duration: '7 activities × 45–60 minutes', totalHours: 7, lessonCount: 7, prerequisites: [],
  skills: ['Computational Thinking', 'Algorithms', 'Binary & Data', 'Debugging', 'Problem Solving'],
  modules: [
    { id: 'csu-m1', title: M1, order: 1, description: 'Represent information the way computers do: binary numbers, images as pixels, and error detection with parity.', lessons: C.filter(c => c.moduleId === 'csu-m1').map(kitSummary) },
    { id: 'csu-m2', title: M2, order: 2, description: 'Algorithms & computational thinking: Kidbots programming, sorting networks, searching, and data structures.', lessons: C.filter(c => c.moduleId === 'csu-m2').map(kitSummary) },
  ],
};
