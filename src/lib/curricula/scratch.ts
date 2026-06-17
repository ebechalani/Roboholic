import type { Course, LessonDetail, Module } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// Scratch (scratch.mit.edu) — visual coding: games, animations, stories.
const P: KitProgram = { programId: 'scratch', programSlug: 'scratch', programTitle: 'Scratch', programColor: '#7C3AED', courseId: 'scratch-1', courseTitle: 'Code Games & Stories with Scratch' };
const L1 = 'Level I · Scratch Basics', L2 = 'Level II · Build Games', L3 = 'Level III · Advanced Projects';
const M = (item: string) => [{ item: 'Computer/tablet with a browser (scratch.mit.edu)', quantity: '1 per student' }, ...(item ? [{ item }] : [])];
const SCRATCH = { id: 'scratch-guide', title: 'Scratch — Ideas, tutorials & starter projects', type: 'link' as const, audience: 'both' as const, url: 'https://scratch.mit.edu/ideas', description: 'Official Scratch tutorials and starter projects' };

const C: KitLesson[] = [
  { id: 'sc-1', title: 'Welcome to Scratch: Sprites & the Stage', emoji: '🐱', difficulty: 1, ageGroup: '8-9', level: 'Beginner', moduleId: 'sc-m1', moduleTitle: L1, order: 1, youtubeId: 'jXUZaf5D12A',
    concept: 'the Scratch editor, sprites and blocks', conceptExplain: 'Scratch is a free block-coding language for games, animations and stories. You snap blocks together to control sprites (characters) on the stage.',
    objectives: ['Navigate the Scratch editor', 'Add a sprite and a backdrop', 'Use a "when green flag clicked" + motion block'],
    steps: ['Open scratch.mit.edu and start a project.', 'Add a sprite and a backdrop.', 'Drag "when green flag clicked" → "move 10 steps".', 'Run it with the green flag.'],
    challenge: 'Make your sprite move across the stage and say hello when clicked.', skills: ['Scratch', 'Sprites', 'Events'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-2', title: 'Motion, Looks & Sequencing', emoji: '🎬', difficulty: 1, ageGroup: '8-9', level: 'Beginner', moduleId: 'sc-m1', moduleTitle: L1, order: 2,
    concept: 'sequences of motion and looks blocks', conceptExplain: 'A program is a sequence of instructions. Motion blocks move/turn the sprite; Looks blocks change costume, size and speech.',
    objectives: ['Sequence several blocks in order', 'Use motion and looks blocks', 'Add wait blocks to control timing'],
    steps: ['Chain move/turn blocks for a path.', 'Add "say" and "switch costume".', 'Insert "wait" blocks between actions.', 'Run and refine the timing.'],
    challenge: 'Animate your sprite walking across the stage and waving (costume change).', skills: ['Sequencing', 'Looks', 'Animation'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-3', title: 'Loops & Events', emoji: '🔁', difficulty: 2, ageGroup: '8-9', level: 'Beginner', moduleId: 'sc-m1', moduleTitle: L1, order: 3,
    concept: 'repetition and event-driven code', conceptExplain: 'Loops (repeat / forever) repeat actions; events (key pressed, sprite clicked, broadcast) start scripts. Together they make interactive programs.',
    objectives: ['Use repeat and forever loops', 'Trigger scripts with key/click events', 'Combine loops and events'],
    steps: ['Put motion inside a "forever" loop.', 'Add "when [space] key pressed".', 'Use "repeat 4" to draw/move in a pattern.', 'Test with keys.'],
    challenge: 'Control a sprite with the arrow keys using four key-press events.', skills: ['Loops', 'Events', 'Interactivity'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-4', title: 'Make an Animation or Story', emoji: '📖', difficulty: 2, ageGroup: '8-9', level: 'Beginner', moduleId: 'sc-m1', moduleTitle: L1, order: 4,
    concept: 'multi-sprite stories with broadcasts', conceptExplain: 'Stories use several sprites that talk in turn. "Broadcast" messages let one sprite cue another so the conversation flows.',
    objectives: ['Use multiple sprites', 'Use broadcast to coordinate sprites', 'Build a short animated scene'],
    steps: ['Add 2–3 sprites and a backdrop.', 'Sprite 1 says a line then broadcasts "next".', 'Sprite 2 starts "when I receive next".', 'Build a 4-line animated conversation.'],
    challenge: 'Create a 2-character animated story with at least 3 broadcasts.', skills: ['Broadcasts', 'Storytelling', 'Multi-sprite'], materials: M(''), resources: [SCRATCH] },
  // Level II
  { id: 'sc-5', title: 'Variables & Score', emoji: '🔢', difficulty: 2, ageGroup: '10-12', level: 'Intermediate', moduleId: 'sc-m2', moduleTitle: L2, order: 5,
    concept: 'variables for scores and lives', conceptExplain: 'A variable stores a value like a score or lives that changes during play. You create one, set it at the start, and change it during the game.',
    objectives: ['Create a variable', 'Set and change it during play', 'Display it on the stage'],
    steps: ['Make a "score" variable, set to 0 on green flag.', 'Change score by 1 on an event.', 'Show the score on stage.', 'Test it increases.'],
    challenge: 'Make a clicker game: each click on the sprite adds 1 to the score.', skills: ['Variables', 'Scoring', 'Game Logic'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-6', title: 'Conditionals & Collisions', emoji: '💥', difficulty: 3, ageGroup: '10-12', level: 'Intermediate', moduleId: 'sc-m2', moduleTitle: L2, order: 6,
    concept: 'if/else and "touching" detection', conceptExplain: 'Conditionals (if/else) make decisions; "touching" blocks detect collisions. Games react: if touching an enemy → lose a life.',
    objectives: ['Use if / if-else blocks', 'Detect collisions with "touching"', 'React to a condition'],
    steps: ['In a forever loop, check "if touching [sprite]".', 'On touch → change score / play sound.', 'Add an else branch.', 'Test the collision response.'],
    challenge: 'Make a "collect the stars" game where touching a star adds score and hides it.', skills: ['Conditionals', 'Collisions', 'Logic'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-7', title: 'Build a Complete Game', emoji: '🎮', difficulty: 3, ageGroup: '10-12', level: 'Intermediate', moduleId: 'sc-m2', moduleTitle: L2, order: 7,
    concept: 'a full game loop with win/lose', conceptExplain: 'A complete game has a goal, controls, scoring, and a win/lose end. You combine movement, variables, conditionals and a timer.',
    objectives: ['Combine movement, score and collisions', 'Add a timer or lives', 'Add a win/lose ending'],
    steps: ['Plan goal + controls + win/lose.', 'Code player movement and a scoring rule.', 'Add a timer or lives variable.', 'Add a "Game Over"/"You win" screen.'],
    challenge: 'Build a maze or catch game with a score, a timer, and a clear ending.', skills: ['Game Design', 'Integration', 'Variables'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-8', title: 'Clones & Spawning', emoji: '👯', difficulty: 3, ageGroup: '10-12', level: 'Intermediate', moduleId: 'sc-m2', moduleTitle: L2, order: 8,
    concept: 'clones to spawn many objects', conceptExplain: 'Clones make copies of a sprite at run-time — perfect for falling objects, bullets or enemies — without copy-pasting sprites.',
    objectives: ['Create clones at intervals', 'Give clones their own behaviour', 'Delete clones when done'],
    steps: ['Use "create clone of myself" on a timer.', 'In "when I start as a clone", move it down.', 'Delete the clone at the edge.', 'Tune the spawn rate.'],
    challenge: 'Make falling objects the player must catch or dodge using clones.', skills: ['Clones', 'Spawning', 'Game Feel'], materials: M(''), resources: [SCRATCH] },
  // Level III
  { id: 'sc-9', title: 'Lists & Data', emoji: '🗃️', difficulty: 4, ageGroup: '10-12', level: 'Advanced', moduleId: 'sc-m3', moduleTitle: L3, order: 9,
    concept: 'lists (arrays) of values', conceptExplain: 'A list stores many values under one name — quiz questions, high scores, inventory. You add, read by index, and loop over a list.',
    objectives: ['Create and fill a list', 'Read items by index', 'Use a list in a project (e.g. a quiz)'],
    steps: ['Make a list and add items.', 'Read item (i) of the list.', 'Loop through the list.', 'Use it for a quiz or high-score table.'],
    challenge: 'Build a quiz that pulls questions from a list and tracks the score.', skills: ['Lists', 'Data', 'Quiz'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-10', title: 'Custom Blocks (My Blocks)', emoji: '🧩', difficulty: 4, ageGroup: '10-12', level: 'Advanced', moduleId: 'sc-m3', moduleTitle: L3, order: 10,
    concept: 'defining your own blocks (functions)', conceptExplain: 'My Blocks let you define your own block (a function) with inputs, so you can reuse code and keep scripts tidy — a key step toward real programming.',
    objectives: ['Define a custom block with an input', 'Call it with different values', 'Refactor repeated code into a block'],
    steps: ['Make a block e.g. "draw star (size)".', 'Define what it does using the input.', 'Call it several times with different sizes.', 'Replace duplicated code with your block.'],
    challenge: 'Refactor one of your games to use at least one custom block with an input.', skills: ['Functions', 'Reusability', 'Refactoring'], materials: M(''), resources: [SCRATCH] },
  { id: 'sc-11', title: 'Capstone: Design & Share a Project', emoji: '🚀', difficulty: 4, ageGroup: '10-12', level: 'Advanced', moduleId: 'sc-m3', moduleTitle: L3, order: 11,
    concept: 'the full design + publish process', conceptExplain: 'Students plan, build, test and publish an original Scratch project (game, animation or interactive story), then share it to the Scratch community and get feedback.',
    objectives: ['Plan an original project', 'Build, test and debug it', 'Publish/share and gather feedback'],
    steps: ['Pick a project type and storyboard it.', 'Build it using variables/loops/conditionals/clones.', 'Test and debug.', 'Share it and write project notes/credits.'],
    challenge: 'Publish a polished project with instructions, then improve it from one piece of feedback.', skills: ['Design Process', 'Publishing', 'Iteration'], materials: M(''), resources: [SCRATCH] },
];

export const SCRATCH_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));
export const SCRATCH_COURSE: Course = {
  id: P.courseId, slug: 'code-games-and-stories', title: P.courseTitle, programId: P.programId, programSlug: P.programSlug,
  ageGroup: '8-9', level: 'Beginner',
  description: 'Code games, animations and interactive stories with Scratch (scratch.mit.edu). Level I: sprites, motion, loops, events and stories. Level II: variables, conditionals, collisions, complete games and clones. Level III: lists, custom blocks, and a publish-and-share capstone.',
  objectives: ['Build programs with sequences, loops, events and broadcasts', 'Use variables, conditionals and collision detection', 'Build complete games with scoring and win/lose', 'Use lists and custom blocks', 'Design, publish and iterate an original project'],
  duration: '11 lessons × 45–60 minutes', totalHours: 11, lessonCount: 11, prerequisites: [],
  skills: ['Scratch', 'Game Design', 'Variables & Logic', 'Lists', 'Functions'],
  modules: [
    { id: 'sc-m1', title: L1, order: 1, description: 'Sprites, motion, looks, loops, events and a first animation/story.', lessons: C.filter(c => c.moduleId === 'sc-m1').map(kitSummary) },
    { id: 'sc-m2', title: L2, order: 2, description: 'Variables, conditionals, collisions, a complete game, and clones.', lessons: C.filter(c => c.moduleId === 'sc-m2').map(kitSummary) },
    { id: 'sc-m3', title: L3, order: 3, description: 'Lists, custom blocks, and a design-and-publish capstone.', lessons: C.filter(c => c.moduleId === 'sc-m3').map(kitSummary) },
  ],
};
