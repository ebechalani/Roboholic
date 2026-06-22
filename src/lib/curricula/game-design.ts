import type { Course, LessonDetail, LessonSection, Module, Resource, Difficulty, AgeGroupId, QuizQuestion } from '@/types';
import { GAMEDESIGN_PLAY_MODULE } from './external-resources';

const ARCADE_EMBED = { kind: 'embed' as const, title: '🕹️ Make a Game (MakeCode Arcade)', url: 'https://arcade.makecode.com/', height: 560, note: 'Build your game here and press ▶ to play it in the page. (Or open in a new tab.)' };

// ════════════════════════════════════════════════════════════════
//  Game Design — "Make Games with MakeCode Arcade" (3 levels, 12 lessons)
//  Built around Microsoft MakeCode Arcade (arcade.makecode.com): the
//  Beginner Skillmap, official tutorials, multiplayer, and the
//  blocks → JavaScript/Python path. Lessons link the official
//  tutorials/skillmaps and embed the Chase the Pizza walkthrough;
//  coaching prompts are RoboHolic SUGGESTED additions.
// ════════════════════════════════════════════════════════════════

const L1 = 'Level I · First Games (Beginner Skillmap)';
const L2 = 'Level II · Core Game Mechanics';
const L3 = 'Level III · Advanced Games & Sharing';

interface GD {
  id: string; title: string; emoji: string; difficulty: Difficulty; ageGroup: AgeGroupId;
  moduleId: string; moduleTitle: string; order: number; youtubeId?: string;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; challenge: string; skills: string[];
  resources: Resource[]; quiz?: QuizQuestion[];
}

function makeGD(c: GD): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        'You need: computers/tablets with a browser — MakeCode Arcade runs free at arcade.makecode.com, nothing to install. (Games can also be flashed to Arcade handhelds if you have them.)',
        'Build the game yourself first so you can demo it and anticipate where students get stuck.',
        'SUGGESTED CONTENT: the linked official MakeCode tutorials/skillmap are the source material; the steps and challenge here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Open the linked tutorial/skillmap and play a finished example; name the new blocks.',
        'CREATE: Students build it in MakeCode Arcade, testing in the simulator as they go.',
        'SHARE: Students play each other\'s games and give one "glow" and one "grow".',
      ],
    },
    {
      type: 'student_steps', title: `Build It: ${c.title} ${c.emoji}`, emoji: '🎯',
      content: ['Open arcade.makecode.com and follow these steps (and the official tutorial in Resources):', ...c.steps, 'Test in the simulator as you go, then play your game!'],
      studentContent: [`🎮 ${c.title}`, '💻 Open arcade.makecode.com', ...c.steps.map(s => '👉 ' + s), '▶️ Test and play!'],
    },
    {
      type: 'challenge', title: 'Make It Yours', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student built a working game and added their own twist.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'MakeCode Arcade is blocks-first but every block has a JavaScript/Python equivalent — toggle the language menu to show older students the text code.',
        'Students can SHARE a game as a link or download it; no accounts needed. The official tutorial (Resources) is the primary material.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: 'game-design', programSlug: 'game-design', programTitle: 'Game Design', programColor: '#DC2626',
    courseId: 'game-design-1', courseTitle: 'Make Games with MakeCode Arcade',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: c.moduleId === 'gd-m1' ? 'Beginner' : c.moduleId === 'gd-m2' ? 'Intermediate' : 'Advanced',
    duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills,
    materials: [{ item: 'Computer/tablet with a browser (arcade.makecode.com)', quantity: '1 per student' }, { item: 'MakeCode Arcade handheld', quantity: '1 per student', isOptional: true }],
    objectives: c.objectives, assessmentChecklist: c.objectives,
    sections,
    interactions: [ARCADE_EMBED],
    ...(c.quiz ? { quiz: c.quiz } : {}),
    ...(c.youtubeId ? { youtubeId: c.youtubeId } : {}),
    resources: c.resources,
  };
}

// Shared official links
const ARCADE: Resource = { id: 'arcade-home', title: 'Microsoft MakeCode Arcade (free editor)', type: 'link', audience: 'both', url: 'https://arcade.makecode.com/', description: 'Make games in blocks, JavaScript or Python — no install' };
const ARCADE_SKILLMAP: Resource = { id: 'arcade-skillmap', title: 'Beginner Skillmap (guided tutorials)', type: 'link', audience: 'both', url: 'https://arcade.makecode.com/', description: 'Guided path: Storytelling, Clicker and Dino Run' };
const ARCADE_TUTS: Resource = { id: 'arcade-tuts', title: 'MakeCode Arcade Tutorials', type: 'link', audience: 'both', url: 'https://arcade.makecode.com/tutorials', description: 'Official step-by-step game tutorials' };
const ARCADE_EDU: Resource = { id: 'arcade-edu', title: 'MakeCode Arcade for Educators', type: 'link', audience: 'coach', url: 'https://www.microsoft.com/en-us/makecode/teach/arcade', description: 'Educator guides, courses and lesson plans' };

const CONFIGS: GD[] = [
  // ─── Level I · First Games ───
  {
    id: 'gd-1', title: 'Welcome to MakeCode Arcade', emoji: '🕹️', difficulty: 2, ageGroup: '10-12', moduleId: 'gd-m1', moduleTitle: L1, order: 1, youtubeId: 'vObUjO-QIRU',
    concept: 'the MakeCode Arcade editor, sprites and the simulator', conceptExplain: 'MakeCode Arcade is a free browser editor for making retro games. You drag code blocks, and a simulator plays your game instantly. A "sprite" is any game object (player, food, enemy). The first game — Chase the Pizza — covers the basics.',
    objectives: ['Navigate the Arcade editor and simulator', 'Create a player sprite and move it', 'Build and play the "Chase the Pizza" game'],
    steps: ['Watch the Chase the Pizza walkthrough above.', 'Open arcade.makecode.com → start the "Chase the Pizza" tutorial.', 'Create a player sprite and make it move with the controller.', 'Add the pizza, score a point on overlap, and play.'],
    challenge: 'Change the player and food art, and make the game faster — then play your version.',
    skills: ['Arcade Basics', 'Sprites', 'Simulator'],
    resources: [{ id: 'gd-1-r1', title: 'Tutorial: Chase the Pizza', type: 'link', audience: 'both', url: 'https://arcade.makecode.com/tutorials/chase-the-pizza', description: 'Official starter tutorial' }, { id: 'gd-1-r2', title: 'Video: Chase the Pizza walkthrough', type: 'video', audience: 'both', url: 'https://www.youtube.com/watch?v=vObUjO-QIRU', description: 'Step-by-step video' }, ARCADE],
    quiz: [
      { question: 'In a game, a "sprite" is:', options: ['a sound effect', 'any game object (player, food, enemy)', 'the score', 'the background music'], answerIndex: 1 },
      { question: 'What plays your game instantly as you code?', options: ['the simulator', 'the printer', 'the database', 'the slicer'], answerIndex: 0 },
      { question: 'Scoring a point when the player touches the pizza uses:', options: ['an "on overlap" event', 'a pause block', 'a comment', 'the background'], answerIndex: 0, explanation: 'Overlap (collision) between two sprites triggers the score.' },
    ],
  },
  {
    id: 'gd-2', title: 'Storytelling Game', emoji: '📖', difficulty: 2, ageGroup: '10-12', moduleId: 'gd-m1', moduleTitle: L1, order: 2,
    concept: 'sprites, text and scenes (Beginner Skillmap #1)', conceptExplain: 'The first Beginner-Skillmap game tells an interactive story: place sprites, show text/speech, and change scenes — learning sequencing and the screen.',
    objectives: ['Place sprites and backgrounds', 'Show text/speech and change scenes', 'Sequence events to tell a story'],
    steps: ['Open the Beginner Skillmap → Storytelling.', 'Set a background and add character sprites.', 'Use "say" / text blocks to tell the story.', 'Change the scene to continue the story.'],
    challenge: 'Write your own 3-scene story with at least two characters.',
    skills: ['Sprites', 'Text & Scenes', 'Sequencing'],
    resources: [ARCADE_SKILLMAP, ARCADE],
  },
  {
    id: 'gd-3', title: 'Clicker Game', emoji: '👆', difficulty: 2, ageGroup: '10-12', moduleId: 'gd-m1', moduleTitle: L1, order: 3,
    concept: 'inputs and scoring (Beginner Skillmap #2)', conceptExplain: 'A clicker game responds to button presses and counts points — introducing events (on button pressed) and the score/info system.',
    objectives: ['Respond to button/controller events', 'Add and update a score', 'Give feedback (sound/animation) on a click'],
    steps: ['Open the Beginner Skillmap → Clicker.', 'On A pressed → change score by 1.', 'Show the score with the info blocks.', 'Add a sound or sprite effect for feedback.'],
    challenge: 'Add a timer so players score as much as possible before time runs out.',
    skills: ['Events', 'Score / Info', 'Feedback'],
    resources: [ARCADE_SKILLMAP, ARCADE],
  },
  {
    id: 'gd-4', title: 'Dino Run (Endless Runner)', emoji: '🦖', difficulty: 3, ageGroup: '10-12', moduleId: 'gd-m1', moduleTitle: L1, order: 4,
    concept: 'jumping, obstacles and game-over (Beginner Skillmap #3)', conceptExplain: 'An endless runner where the player jumps over obstacles that spawn over time. It brings together movement, spawning, overlap detection and game-over.',
    objectives: ['Make a player jump', 'Spawn obstacles over time', 'End the game when the player is hit'],
    steps: ['Open the Beginner Skillmap → Dino Run.', 'Make the player jump on a button press.', 'Spawn obstacles on a timer that move across the screen.', 'On overlap with an obstacle → game over.'],
    challenge: 'Make the game get harder over time (obstacles spawn faster) and add a high-score.',
    skills: ['Jumping', 'Spawning', 'Game Over'],
    resources: [ARCADE_SKILLMAP, ARCADE_TUTS],
  },

  // ─── Level II · Core Game Mechanics ───
  {
    id: 'gd-5', title: 'Move with the Controller', emoji: '🎮', difficulty: 3, ageGroup: '10-12', moduleId: 'gd-m2', moduleTitle: L2, order: 5,
    concept: 'controlling the player sprite', conceptExplain: 'The "move sprite with buttons" block links the D-pad to a sprite\'s velocity. Adjusting speed, staying on screen, and facing direction make movement feel good.',
    objectives: ['Move a sprite with the controller', 'Tune speed and keep the sprite on screen', 'React to direction'],
    steps: ['Create a player sprite.', 'Add "move [player] with buttons" and set the speed.', 'Set "stay on screen" so it can\'t leave.', 'Test and tune the speed until it feels right.'],
    challenge: 'Make the sprite face/animate in the direction it moves.',
    skills: ['Controls', 'Velocity', 'Game Feel'],
    resources: [ARCADE_TUTS, ARCADE],
  },
  {
    id: 'gd-6', title: 'Score, Lives & Game Over', emoji: '🏆', difficulty: 3, ageGroup: '10-12', moduleId: 'gd-m2', moduleTitle: L2, order: 6,
    concept: 'the info system: score, life and countdown', conceptExplain: 'Arcade\'s info blocks track score, lives and a countdown timer, and automatically show a win/lose game-over screen — the backbone of most games.',
    objectives: ['Track score and lives with info blocks', 'Use a countdown timer', 'Trigger win/lose game-over'],
    steps: ['Set start score = 0 and lives = 3.', 'Change score on good events; lose a life on bad ones.', 'Add a countdown timer.', 'Let Arcade show game over at 0 lives / time.'],
    challenge: 'Add a "you win" condition when the score reaches a target.',
    skills: ['Score / Lives', 'Timers', 'Game States'],
    resources: [ARCADE_TUTS, ARCADE],
  },
  {
    id: 'gd-7', title: 'Projectiles, Enemies & Collisions', emoji: '💥', difficulty: 4, ageGroup: '13-15', moduleId: 'gd-m2', moduleTitle: L2, order: 7,
    concept: 'shooting, spawning enemies and overlap events', conceptExplain: 'Projectiles are sprites that fly from the player; enemies spawn at random positions; "on sprite overlap" handles hits — together these make shooters and dodgers.',
    objectives: ['Fire projectiles from the player', 'Spawn enemies at random positions', 'Handle overlaps (destroy, score, lose a life)'],
    steps: ['On A pressed → create a projectile from the player.', 'On a timer → spawn an enemy at a random edge.', 'On projectile/enemy overlap → destroy both and score.', 'On player/enemy overlap → lose a life.'],
    challenge: 'Add a boss enemy that takes several hits before it is destroyed.',
    skills: ['Projectiles', 'Spawning', 'Collisions'],
    resources: [ARCADE_TUTS, ARCADE],
  },
  {
    id: 'gd-8', title: 'Tilemaps & Levels', emoji: '🗺️', difficulty: 4, ageGroup: '13-15', moduleId: 'gd-m2', moduleTitle: L2, order: 8,
    concept: 'building worlds with tilemaps', conceptExplain: 'A tilemap is a grid-based map you paint with tiles (walls, floor, water). Walls block sprites, and you can place the player and items on specific tiles — the basis of platformers and adventures.',
    objectives: ['Design a tilemap world', 'Set walls so sprites collide', 'Place the player and items on tiles'],
    steps: ['Open the tilemap editor and paint a level.', 'Mark wall tiles so the player can\'t pass.', 'Place the player on a start tile.', 'Add collectibles/enemies on tiles and test.'],
    challenge: 'Build a 2-level game where reaching the exit loads the next tilemap.',
    skills: ['Tilemaps', 'Level Design', 'Collisions'],
    resources: [ARCADE_TUTS, ARCADE],
  },

  // ─── Level III · Advanced & Share ───
  {
    id: 'gd-9', title: 'Animation, Sound & Polish', emoji: '✨', difficulty: 4, ageGroup: '13-15', moduleId: 'gd-m3', moduleTitle: L3, order: 9,
    concept: 'making a game feel finished', conceptExplain: 'Frame animations, screen effects, sound effects and music turn a working prototype into a polished game. "Juice" (feedback, effects) makes games satisfying.',
    objectives: ['Animate a sprite with frames', 'Add sound effects and music', 'Use screen/sprite effects for polish'],
    steps: ['Create a walk/idle animation for the player.', 'Play a sound on key events (score, hit).', 'Add background music and a screen effect.', 'Play-test and tweak until it feels good.'],
    challenge: 'Add a title screen and a satisfying "win" celebration (effect + sound).',
    skills: ['Animation', 'Sound', 'Game Feel'],
    resources: [ARCADE_TUTS, ARCADE],
  },
  {
    id: 'gd-10', title: 'Variables, Arrays & Difficulty', emoji: '📈', difficulty: 4, ageGroup: '13-15', moduleId: 'gd-m3', moduleTitle: L3, order: 10,
    concept: 'data structures that scale a game', conceptExplain: 'Variables remember state (level, speed); arrays/lists hold many things (enemies, items). Using them, a game can ramp up difficulty and manage many objects.',
    objectives: ['Use variables to track game state', 'Use an array/list of sprites', 'Increase difficulty as the game progresses'],
    steps: ['Make a "level" variable that increases over time.', 'Store spawned enemies in a list.', 'Speed up spawns/enemies as level rises.', 'Show the level and test the ramp.'],
    challenge: 'Add waves: each wave has more/faster enemies, with a short break between.',
    skills: ['Variables', 'Arrays', 'Difficulty Curves'],
    resources: [ARCADE_TUTS, ARCADE],
  },
  {
    id: 'gd-11', title: 'Multiplayer Games', emoji: '👥', difficulty: 4, ageGroup: '13-15', moduleId: 'gd-m3', moduleTitle: L3, order: 11,
    concept: 'making 2–4 player games', conceptExplain: 'Arcade supports up to 4 players, each with their own controller and sprite. Multiplayer blocks let you build co-op or competitive games.',
    objectives: ['Add a second player and controller', 'Track per-player score', 'Design a co-op or competitive mode'],
    steps: ['Add player 2 (and their controller movement).', 'Track each player\'s score separately.', 'Design the goal (race, last-standing, co-op).', 'Play-test with two people.'],
    challenge: 'Make a 2-player competitive game with a clear winner screen.',
    skills: ['Multiplayer', 'Per-Player Logic', 'Design'],
    resources: [ARCADE_TUTS, ARCADE_EDU],
  },
  {
    id: 'gd-12', title: 'Capstone: Design, Code & Share Your Game', emoji: '🚀', difficulty: 4, ageGroup: '13-15', moduleId: 'gd-m3', moduleTitle: L3, order: 12,
    concept: 'the full game-design process — and going from blocks to text', conceptExplain: 'Students design an original game (concept → mechanics → levels → polish), build it, switch the editor to JavaScript/Python to see the text code, then SHARE it as a link or flash it to an Arcade handheld.',
    objectives: ['Plan an original game (concept, mechanics, win/lose)', 'Build, test and polish it', 'View the JavaScript/Python and share the finished game'],
    steps: ['Design your game on paper: goal, controls, win/lose, art.', 'Build the core loop, then add polish (sound, effects, levels).', 'Switch the editor to JavaScript or Python to see the text code.', 'Share it as a link (or download / flash to an Arcade device) and run a playtest.'],
    challenge: 'Publish your game, gather feedback from two players, and ship one improvement.',
    skills: ['Game Design', 'JavaScript/Python', 'Publishing'],
    resources: [ARCADE, ARCADE_EDU, ARCADE_TUTS],
  },
];

export const GAME_DESIGN_LESSONS: LessonDetail[] = CONFIGS.map(makeGD);

const sum = (c: GD) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const GAME_DESIGN_COURSE: Course = {
  id: 'game-design-1', slug: 'make-games-makecode-arcade', title: 'Make Games with MakeCode Arcade',
  programId: 'game-design', programSlug: 'game-design', ageGroup: '10-12', level: 'Beginner',
  description: 'Design and build real video games in Microsoft MakeCode Arcade (free, browser-based). Level I: make your first games with the Beginner Skillmap (Storytelling, Clicker, Dino Run) and Chase the Pizza. Level II: core mechanics — controls, score/lives, projectiles & enemies, and tilemaps. Level III: animation & polish, difficulty with variables/arrays, multiplayer, and a capstone where you design, code (blocks → JavaScript/Python) and share your own game.',
  objectives: [
    'Use the MakeCode Arcade editor, sprites and simulator',
    'Build core mechanics: movement, score/lives, projectiles, collisions, tilemaps',
    'Polish games with animation, sound and effects',
    'Use variables and arrays to scale difficulty, and build multiplayer games',
    'Design, code (blocks → JavaScript/Python) and share an original game',
  ],
  duration: '13 lessons × 45–60 minutes', totalHours: 13, lessonCount: 13,
  prerequisites: [], skills: ['Game Design', 'Sprites & Tilemaps', 'Events & Collisions', 'Variables & Arrays', 'JavaScript/Python'],
  modules: [
    { id: 'gd-m1', title: L1, order: 1, description: 'First games with the Beginner Skillmap and Chase the Pizza: sprites, scenes, scoring and an endless runner.', lessons: CONFIGS.filter(c => c.moduleId === 'gd-m1').map(sum) },
    { id: 'gd-m2', title: L2, order: 2, description: 'Core mechanics: controller movement, score/lives/timers, projectiles & enemies, and tilemap levels.', lessons: CONFIGS.filter(c => c.moduleId === 'gd-m2').map(sum) },
    { id: 'gd-m3', title: L3, order: 3, description: 'Polish, scaling difficulty with variables/arrays, multiplayer, and a design-code-share capstone (blocks → text).', lessons: CONFIGS.filter(c => c.moduleId === 'gd-m3').map(sum) },
    GAMEDESIGN_PLAY_MODULE,
  ],
};
