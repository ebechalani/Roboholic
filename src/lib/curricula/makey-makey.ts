import type { Course, LessonDetail, LessonSection, Module, Resource, Difficulty, AgeGroupId } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Makey Makey — "Invent with Everyday Objects" (3 levels, 11 lessons)
//  Built from the official JoyLabz / Makey Makey curriculum: the
//  Maker Class how-to series, the free Makey Makey 101 course, and
//  the Advanced class. Lessons link the official resources and embed
//  the official intro video; coaching prompts are RoboHolic additions.
// ════════════════════════════════════════════════════════════════

const L1 = 'Level I · Getting Started (Plug & Play)';
const L2 = 'Level II · Make & Play (Scratch & Crafts)';
const L3 = 'Level III · Invent & Code';

interface MM {
  id: string; title: string; emoji: string; difficulty: Difficulty; ageGroup: AgeGroupId;
  moduleId: string; moduleTitle: string; order: number; youtubeId?: string;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; challenge: string; skills: string[];
  materials: { item: string; quantity?: string; isOptional?: boolean }[];
  resources: Resource[];
}

function makeMM(c: MM): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        `You need: ${c.materials.map(m => m.item).join(', ')}.`,
        'A Makey Makey plugs into any computer over USB and pretends to be a keyboard/mouse — no driver or install needed. Test the example yourself first.',
        'SUGGESTED CONTENT: the linked official Makey Makey resources are the source material; the prompts and challenge here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Watch/skim the official resource together and demo the idea once.',
        'CREATE: Students build and test it following the steps below — let them experiment with materials.',
        'SHARE: Students demo their invention and explain what made the circuit work.',
      ],
    },
    {
      type: 'activity', title: `Make It: ${c.title}`, emoji: '🛠️',
      content: ['Follow these steps (and the official guide in Resources):', ...c.steps],
      studentContent: [`🎯 ${c.title}`, ...c.steps.map(s => '👉 ' + s)],
    },
    {
      type: 'challenge', title: 'Invent & Extend', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student built a working invention and explained how the circuit closes.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'KEY IDEA: Makey Makey works by completing a circuit — the person/object is part of the loop back to EARTH (ground). "Nothing happens" almost always means the ground isn\'t connected.',
        'The official guide (Resources) is the primary material; these prompts are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: 'makey-makey', programSlug: 'makey-makey', programTitle: 'Makey Makey', programColor: '#06B6D4',
    courseId: 'makey-makey-1', courseTitle: 'Makey Makey — Invent with Everyday Objects',
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: c.moduleId === 'mm-m1' ? 'Beginner' : c.moduleId === 'mm-m2' ? 'Intermediate' : 'Advanced',
    duration: '45–60 minutes', difficulty: c.difficulty, skills: c.skills, materials: c.materials,
    objectives: c.objectives, assessmentChecklist: c.objectives,
    sections,
    ...(c.youtubeId ? { youtubeId: c.youtubeId } : {}),
    resources: c.resources,
  };
}

// Shared official links
const MM101: Resource = { id: 'mm-101', title: 'Makey Makey 101 — free beginner course', type: 'link', audience: 'both', url: 'https://courses.makeymakey.com/101/', description: 'Official free getting-started course' };
const MM_HOWTO: Resource = { id: 'mm-howto', title: 'Makey Makey How-To & Project Guides', type: 'link', audience: 'both', url: 'https://makeymakey.com/pages/how-to', description: 'Official step-by-step invention guides' };
const MM_EDU: Resource = { id: 'mm-edu', title: 'Makey Makey for Educators (guides & activities)', type: 'link', audience: 'coach', url: 'https://makeymakey.com/pages/educators', description: 'Educator guides: plug-and-play, Scratch, MakeCode Arcade' };

const CONFIGS: MM[] = [
  // ─── Level I · Getting Started ───
  {
    id: 'mm-1', title: 'What Is a Makey Makey?', emoji: '🎮', difficulty: 2, ageGroup: '8-9', moduleId: 'mm-m1', moduleTitle: L1, order: 1, youtubeId: 'rfQqh7iCcOU',
    concept: 'how a Makey Makey turns objects into keys', conceptExplain: 'A Makey Makey is an invention kit that plugs into a computer and acts like a keyboard/mouse. When you close a circuit through a conductive object (a banana, your hand, foil…), it sends a key press — so anything that conducts can become a controller.',
    objectives: ['Explain what a Makey Makey does', 'Identify the key inputs (arrows, space, click) and the EARTH bar', 'Set up the board and trigger your first key press'],
    steps: ['Watch the intro video above.', 'Plug the Makey Makey into the computer with the USB cable.', 'Clip one alligator wire to "Space" and one to "EARTH".', 'Hold the EARTH clip and tap the Space clip — you just pressed the spacebar!'],
    challenge: 'Open the Makey Makey piano app and play a note using just your two hands as the connection.',
    skills: ['Invention', 'Circuits', 'Setup'],
    materials: [{ item: 'Makey Makey kit (board, USB cable, alligator clips)', quantity: '1 per pair' }, { item: 'Computer', quantity: '1 per pair' }],
    resources: [{ id: 'mm-1-r1', title: 'Intro Video: An Invention Kit for Everyone', type: 'video', audience: 'both', url: 'https://www.youtube.com/watch?v=rfQqh7iCcOU', description: 'Official Makey Makey introduction' }, MM101, MM_EDU],
  },
  {
    id: 'mm-2', title: 'Craft a Simple Circuit', emoji: '🔌', difficulty: 2, ageGroup: '8-9', moduleId: 'mm-m1', moduleTitle: L1, order: 2,
    concept: 'closed circuits and how Makey Makey completes one', conceptExplain: 'Makey Makey only works when electricity can flow in a complete loop: from the board, through a conductive object, through YOU, and back to EARTH. If the loop is open, nothing happens.',
    objectives: ['Explain what a closed (complete) circuit is', 'Show that touching EARTH completes the loop', 'Predict whether a setup will work'],
    steps: ['Clip "Space" to a conductive object (e.g. foil).', 'Try tapping the object WITHOUT holding EARTH — nothing happens.', 'Now hold the EARTH clip and tap again — it works!', 'Explain why: you closed the loop back to EARTH.'],
    challenge: 'Make a two-person circuit: hold hands so the key only presses when you both touch the board and EARTH.',
    skills: ['Circuits', 'Conductivity', 'Prediction'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Aluminium foil, a banana', isOptional: true }],
    resources: [{ id: 'mm-2-r1', title: 'Maker Class: Craft a Simple Circuit', type: 'link', audience: 'both', url: 'https://makeymakey.com/blogs/how-to-instructions', description: 'Official simple-circuit lesson' }, MM101],
  },
  {
    id: 'mm-3', title: 'Hands on a Makey Makey', emoji: '✋', difficulty: 2, ageGroup: '8-9', moduleId: 'mm-m1', moduleTitle: L1, order: 3,
    concept: 'using your body as part of the circuit', conceptExplain: 'You are conductive! By holding EARTH and touching an input, your body completes the circuit. Several people can join hands to make one big "human circuit".',
    objectives: ['Build a human circuit', 'Use the piano app with hands and objects', 'Connect alligator clips to everyday conductive items'],
    steps: ['Sketch the Makey Makey and label its inputs (this helps you remember the layout).', 'Plug in and open the piano app; hold EARTH and tap the arrow/space pads.', 'Clip the inputs to conductive objects and play those instead.', 'Build a human piano: friends hold hands and each touches a different note.'],
    challenge: 'Make a 4-person band where each person triggers a different sound by being part of the circuit.',
    skills: ['Human Circuit', 'Teamwork', 'Exploration'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Friends / classmates' }],
    resources: [{ id: 'mm-3-r1', title: 'Lesson Two: Hands on a Makey Makey', type: 'link', audience: 'both', url: 'https://makeymakey.com/blogs/how-to-instructions/lesson-two-hands-on-a-makey-makey', description: 'Official lesson' }, MM101],
  },
  {
    id: 'mm-4', title: 'What Is Conductive?', emoji: '🍌', difficulty: 2, ageGroup: '8-9', moduleId: 'mm-m1', moduleTitle: L1, order: 4,
    concept: 'testing materials for conductivity', conceptExplain: 'Some materials let electricity flow (conductors: metal, water-rich foods, graphite, your body) and some do not (insulators: plastic, dry paper, glass). Makey Makey is a perfect conductivity tester.',
    objectives: ['Define conductor and insulator', 'Test everyday materials for conductivity', 'Sort materials into "works" / "doesn\'t work"'],
    steps: ['Clip "Space" to a material and hold EARTH; tap it.', 'If the key fires, the material conducts; if not, it doesn\'t.', 'Test 8–10 objects (banana, foil, pencil graphite, plastic, water, coin…).', 'Record your results in a conductor/insulator table.'],
    challenge: 'Find the most surprising conductor and the most surprising insulator in the room and explain your test.',
    skills: ['Conductivity', 'Testing', 'Data'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'A tray of test objects (metal, fruit, plastic, paper, pencil)', quantity: 'per group' }],
    resources: [{ id: 'mm-4-r1', title: 'Lesson Three: What Is Conductive?', type: 'link', audience: 'both', url: 'https://makeymakey.com/blogs/how-to-instructions', description: 'Official conductivity lesson' }, MM_HOWTO],
  },

  // ─── Level II · Make & Play ───
  {
    id: 'mm-5', title: 'Draw a Playable Instrument', emoji: '🎹', difficulty: 3, ageGroup: '10-12', moduleId: 'mm-m2', moduleTitle: L2, order: 5,
    concept: 'making an instrument from conductive craft materials', conceptExplain: 'Pencil graphite conducts electricity, so a drawing can be a circuit. Students draw piano keys (or use bananas/Play-Doh) and clip each to an input to make a playable instrument.',
    objectives: ['Use graphite/conductive craft materials as inputs', 'Wire several inputs to make multiple notes', 'Play a simple tune'],
    steps: ['Draw thick, dark piano keys with a soft pencil (or line up bananas).', 'Clip each key to a different input (arrows, space, click).', 'Hold EARTH and play each key in the piano app.', 'Arrange your keys to play a short song.'],
    challenge: 'Design and decorate an instrument (drum kit, harp, or keyboard) and perform an 8-note tune.',
    skills: ['Making', 'Music', 'Design'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Soft pencils + paper, or bananas / Play-Doh', quantity: 'per group' }],
    resources: [{ id: 'mm-5-r1', title: 'Maker Class: Draw a Playable Instrument', type: 'link', audience: 'both', url: 'https://makeymakey.com/pages/how-to', description: 'Official instrument lesson' }, MM_HOWTO],
  },
  {
    id: 'mm-6', title: 'Code Key Presses in Scratch', emoji: '🐱', difficulty: 3, ageGroup: '10-12', moduleId: 'mm-m2', moduleTitle: L2, order: 6,
    concept: 'making Scratch react to Makey Makey inputs', conceptExplain: 'Because the Makey Makey sends real key presses, Scratch\'s "when [space] key pressed" blocks respond to it. Students write code that reacts to their physical inputs.',
    objectives: ['Use "when key pressed" blocks in Scratch', 'Link a physical input to an on-screen action', 'Test and debug the connection'],
    steps: ['Open Scratch and add a sprite.', 'Add "when space key pressed → play sound / move".', 'Plug in the Makey Makey and clip Space to a conductive object.', 'Hold EARTH, tap the object, and watch Scratch respond.'],
    challenge: 'Make a sprite that moves up/down/left/right using four conductive objects wired to the arrow inputs.',
    skills: ['Scratch', 'Events', 'Debugging'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Computer with Scratch (scratch.mit.edu)', quantity: '1 per pair' }],
    resources: [{ id: 'mm-6-r1', title: 'Maker Class: Code Key Presses in Scratch', type: 'link', audience: 'both', url: 'https://makeymakey.com/pages/how-to', description: 'Official Scratch lesson' }, MM101],
  },
  {
    id: 'mm-7', title: 'Build a Custom Game Controller', emoji: '🕹️', difficulty: 3, ageGroup: '10-12', moduleId: 'mm-m2', moduleTitle: L2, order: 7,
    concept: 'inventing a physical controller for a game', conceptExplain: 'Map the arrow keys and space to objects you can press, stomp or squeeze — then play an existing Scratch/web game with your homemade controller.',
    objectives: ['Plan which inputs your game needs', 'Wire conductive objects to those inputs', 'Play a game with your invented controller'],
    steps: ['Pick a simple arrow/space game (or a Scratch game).', 'Decide what each control should be (foil pads, fruit, a stomp pad).', 'Wire each to the matching input and connect EARTH.', 'Play-test and adjust so it feels good.'],
    challenge: 'Build an "Ultimate Stomping Pad" floor controller and race a friend.',
    skills: ['Design', 'Game Control', 'Iteration'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Cardboard, foil, tape', quantity: 'per group' }],
    resources: [{ id: 'mm-7-r1', title: 'Official Project: Ultimate Stomping Pad', type: 'link', audience: 'both', url: 'https://makeymakey.com/pages/how-to', description: 'Build a floor-pad controller' }, MM_HOWTO],
  },

  // ─── Level III · Invent & Code ───
  {
    id: 'mm-8', title: 'Craft & Code Interactive Stories', emoji: '📖', difficulty: 3, ageGroup: '10-12', moduleId: 'mm-m3', moduleTitle: L3, order: 8,
    concept: 'combining crafts + Scratch for an interactive poster/story', conceptExplain: 'Students build a physical poster or diorama where touching parts of it triggers narration, sounds or animations coded in Scratch — bringing a story to life.',
    objectives: ['Plan a story with interactive touch-points', 'Wire craft elements to inputs', 'Code each touch-point to play audio/animation in Scratch'],
    steps: ['Storyboard your interactive poster/diorama.', 'Add conductive touch-points (foil/graphite) and wire each to an input.', 'In Scratch, code "when key pressed → say/play/animate" for each point.', 'Test the full experience and refine.'],
    challenge: 'Make a 4-touch-point interactive story poster and present it to the class.',
    skills: ['Scratch', 'Storytelling', 'Making'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Poster/craft materials + foil', quantity: 'per group' }, { item: 'Computer with Scratch', quantity: '1 per pair' }],
    resources: [{ id: 'mm-8-r1', title: 'Maker Class: Craft & Code Interactive Stories', type: 'link', audience: 'both', url: 'https://makeymakey.com/pages/how-to', description: 'Official interactive-story lesson' }, MM101],
  },
  {
    id: 'mm-9', title: 'Code with MakeCode Arcade', emoji: '👾', difficulty: 4, ageGroup: '10-12', moduleId: 'mm-m3', moduleTitle: L3, order: 9,
    concept: 'building a game in MakeCode Arcade controlled by Makey Makey', conceptExplain: 'MakeCode Arcade lets students code retro games that respond to the arrow keys and buttons — which the Makey Makey can trigger, so they play their own game with a homemade controller.',
    objectives: ['Build a simple game in MakeCode Arcade', 'Map controls to Makey Makey inputs', 'Play your game with a physical controller'],
    steps: ['Open MakeCode Arcade (arcade.makecode.com) and make a sprite that moves on the arrows.', 'Add a goal (collect items / avoid enemies) and scoring.', 'Plug in the Makey Makey and wire objects to the arrows + space.', 'Play your game with your invented controller.'],
    challenge: 'Add a second level or a win/lose screen, then let a friend play with your controller.',
    skills: ['MakeCode Arcade', 'Game Design', 'Control'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Computer with MakeCode Arcade', quantity: '1 per pair' }],
    resources: [{ id: 'mm-9-r1', title: 'Maker Class: Code with MakeCode Arcade', type: 'link', audience: 'both', url: 'https://makeymakey.com/pages/how-to', description: 'Official MakeCode Arcade lesson' }, MM_EDU],
  },
  {
    id: 'mm-10', title: 'Craft & Code Custom Switches', emoji: '🔘', difficulty: 4, ageGroup: '10-12', moduleId: 'mm-m3', moduleTitle: L3, order: 10,
    concept: 'designing your own switches', conceptExplain: 'A switch is just two conductors that touch to close a circuit. Students design and build their own switches (a clothespin switch, a tilt switch, a pressure pad) and trigger code with them — core invention literacy.',
    objectives: ['Explain how a switch opens/closes a circuit', 'Design and craft a custom switch', 'Trigger an action when the switch closes'],
    steps: ['Pick a switch type (pinch, tilt, pressure, door).', 'Build it from card + foil so two conductors touch when activated.', 'Wire it to an input + EARTH.', 'Code or use an app so closing the switch does something.'],
    challenge: 'Invent a switch that reacts to a real-world event (door opens, cup lifted, seat sat on) and demo it.',
    skills: ['Switches', 'Invention', 'Engineering'],
    materials: [{ item: 'Makey Makey kit', quantity: '1 per pair' }, { item: 'Card, foil, clothespins, tape', quantity: 'per group' }],
    resources: [{ id: 'mm-10-r1', title: 'Maker Class: Crafting & Designing Switches', type: 'link', audience: 'both', url: 'https://makeymakey.com/blogs/how-to-instructions/lesson-eight-crafting-and-designing-switches', description: 'Official switches lesson' }, MM_HOWTO],
  },
  {
    id: 'mm-11', title: 'Advanced: Remap Keys & Use the Back of the Board', emoji: '🧠', difficulty: 4, ageGroup: '10-12', moduleId: 'mm-m3', moduleTitle: L3, order: 11,
    concept: 'unlocking the full keyboard/mouse with the back header and remapper', conceptExplain: 'The front has 6 keys; the BACK header exposes the full keyboard (W A S D F G, more) and mouse movement. The online remapper lets you reprogram what each input sends — turning the Makey Makey into any controller.',
    objectives: ['Use the back-of-board header for extra keys and mouse', 'Remap inputs with the online remapper', 'Plan a complete invention project'],
    steps: ['Identify the extra keys (W/A/S/D, mouse) on the back header.', 'Wire the back header for a 2-player or WASD setup.', 'Open the Makey Makey remapper and reassign an input to a new key.', 'Combine everything into one invention project.'],
    challenge: 'Design a complete invention (instrument, game controller, or interactive exhibit) that uses at least 6 inputs and one remapped key.',
    skills: ['Advanced Wiring', 'Remapping', 'Project'],
    materials: [{ item: 'Makey Makey kit (with back-header jumper wires)', quantity: '1 per pair' }, { item: 'Computer', quantity: '1 per pair' }],
    resources: [{ id: 'mm-11-r1', title: 'Makey Makey Remapper & Advanced Guide', type: 'link', audience: 'both', url: 'https://makeymakey.com/pages/how-to', description: 'Reprogram inputs; use the back header' }, MM_EDU],
  },
];

export const MAKEY_LESSONS: LessonDetail[] = CONFIGS.map(makeMM);

const sum = (c: MM) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });

export const MAKEY_COURSE: Course = {
  id: 'makey-makey-1', slug: 'invent-with-everyday-objects', title: 'Makey Makey — Invent with Everyday Objects',
  programId: 'makey-makey', programSlug: 'makey-makey', ageGroup: '8-9', level: 'Beginner',
  description: 'Turn bananas, pencil drawings and Play-Doh into a keyboard! Across three levels students go from their first human circuit to coding games and inventing custom switches. Level I: plug-and-play circuits and conductivity. Level II: drawn instruments, Scratch coding and game controllers. Level III: interactive stories, MakeCode Arcade, custom switches and the advanced remapper. Built from the official Makey Makey / JoyLabz curriculum.',
  objectives: [
    'Explain how a Makey Makey completes a circuit to send key presses',
    'Test materials for conductivity and build human circuits',
    'Draw/craft playable instruments and custom controllers',
    'Code Makey Makey projects in Scratch and MakeCode Arcade',
    'Design custom switches and a complete invention project',
  ],
  duration: '11 lessons × 45–60 minutes', totalHours: 11, lessonCount: 11,
  prerequisites: [], skills: ['Invention Literacy', 'Circuits & Conductivity', 'Scratch', 'MakeCode Arcade', 'Design Thinking'],
  modules: [
    { id: 'mm-m1', title: L1, order: 1, description: 'Plug-and-play: how the Makey Makey works, simple circuits, human circuits and conductivity.', lessons: CONFIGS.filter(c => c.moduleId === 'mm-m1').map(sum) },
    { id: 'mm-m2', title: L2, order: 2, description: 'Make and play: drawn instruments, coding key presses in Scratch, and custom game controllers.', lessons: CONFIGS.filter(c => c.moduleId === 'mm-m2').map(sum) },
    { id: 'mm-m3', title: L3, order: 3, description: 'Invent and code: interactive stories, MakeCode Arcade games, custom switches and the advanced remapper.', lessons: CONFIGS.filter(c => c.moduleId === 'mm-m3').map(sum) },
  ],
};
