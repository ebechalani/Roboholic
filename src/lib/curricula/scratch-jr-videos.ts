import type { LessonDetail, LessonSection } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Scratch Jr — Video Tutorial lessons (15)
//  Source: the academy's 15 ScratchJr coding video tutorials.
//  Each lesson FRAMES its video (watch & build along) and deep-links
//  the video from Drive (too large to host at $0). The video is the
//  real content; the follow-along steps here are RoboHolic SUGGESTED.
// ════════════════════════════════════════════════════════════════

interface SJVideo {
  n: number;
  title: string;       // lesson topic
  topic: string;       // short concept label
  learn: string;       // what you'll learn (from the video title)
  steps: string[];     // suggested follow-along steps
  skills: string[];
  emoji: string;
}

function makeSJVideo(v: SJVideo): LessonDetail {
  const id = `sjr-v${v.n}`;
  const sections: LessonSection[] = [
    {
      type: 'coach_prep',
      title: 'Before-Class Preparation',
      emoji: '📋',
      isCoachOnly: true,
      content: [
        'Have tablets with the Scratch Jr app ready (1 per child or pair).',
        'Open the lesson video (Files section) on the projector and preview it so you can pause at the right moments.',
        `Today's focus: ${v.learn}`,
        'SUGGESTED CONTENT: the video is the official tutorial; the follow-along steps and prompts here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps',
      title: 'Step-by-Step Coach Guide',
      emoji: '🎓',
      isCoachOnly: true,
      content: [
        { step: 1, instruction: `WATCH (5–10 min): Play the video "${v.title}" on the screen. Pause after each new block or step so children can copy it on their tablet.`, tip: 'Pause often — little hands need time to find and drag blocks.' },
        { step: 2, instruction: 'BUILD ALONG (15 min): Re-play key parts and have everyone build the project step by step on their own tablet.' },
        { step: 3, instruction: 'EXPLORE (5–10 min): Let children change colours, characters, or sounds to make the project their own.' },
        { step: 4, instruction: 'SHARE (5 min): A few children show what they made and say one thing they changed.' },
      ],
    },
    {
      type: 'student_steps',
      title: `Watch & Build: ${v.title}! ${v.emoji}`,
      emoji: '🎯',
      studentTitle: `Watch & Build: ${v.title}! ${v.emoji}`,
      content: [
        '📺 Watch the video with your coach.',
        '🧱 Build it on your tablet — copy each block.',
        '⏸️ Pause if you need to catch up!',
        ...v.steps.map(s => '👉 ' + s),
        '🎨 Make it your own — change colours and characters!',
      ],
      studentContent: [
        '📺 Watch the video',
        '🧱 Build it step by step',
        ...v.steps.map(s => '👉 ' + s),
        '🎨 Make it yours!',
      ],
    },
    {
      type: 'activity',
      title: `Build It: ${v.title}`,
      emoji: '🛠️',
      content: [
        'Watch the lesson video (in the Files section) and build along on the tablet. Follow these steps (suggested):',
        ...v.steps,
      ],
      studentContent: ['📺 Watch the video and build along!', ...v.steps.map(s => '✅ ' + s)],
    },
    {
      type: 'challenge',
      title: 'Make It Your Own',
      emoji: '🎚️',
      content: [
        'Change the characters, background, colours, or sounds.',
        `Add one new idea of your own to the ${v.topic.toLowerCase()} project.`,
      ],
      studentContent: ['🎨 Change characters, colours, sounds!', '✨ Add your own idea!'],
    },
    {
      type: 'assessment',
      title: 'Assessment Checklist',
      emoji: '✅',
      content: [
        'Child watched the video and followed along.',
        `Child built the "${v.title}" project (with support as needed).`,
        'Child changed something to make it their own.',
        'Child showed and described their project.',
      ],
    },
    {
      type: 'homework',
      title: 'Practice at Home',
      emoji: '🏠',
      content: [
        'If you have a tablet at home, open Scratch Jr and show a family member what you made.',
        `Try making another ${v.topic.toLowerCase()} project with a different character.`,
      ],
      studentContent: [
        '📱 Show your family your project!',
        `✨ Try another ${v.topic.toLowerCase()} idea`,
      ],
    },
    {
      type: 'coach_notes',
      title: 'Coach Notes (Private)',
      emoji: '📝',
      isCoachOnly: true,
      content: [
        `FOCUS: ${v.learn}`,
        'AGES 4–7: keep it playful and hands-on; pausing the video frequently is the key to success.',
        'Let children explore freely after building — discovery is the learning at this age.',
        'SUGGESTED CONTENT: steps are RoboHolic suggestions; the video is the official tutorial.',
      ],
    },
  ];

  return {
    id,
    slug: `video-${v.n}`,
    title: v.title,
    programId: 'scratch-jr',
    programSlug: 'scratch-jr',
    programTitle: 'Scratch Jr',
    programColor: '#8B5CF6',
    courseId: 'scratch-jr-beginners',
    courseTitle: 'My First Stories with Scratch Jr',
    moduleId: '',          // set by the course; not needed for routing
    moduleTitle: 'Scratch Jr Video Tutorials',
    ageGroup: '6-7',
    level: 'Beginner',
    duration: '30–45 minutes',
    difficulty: (v.n <= 5 ? 1 : v.n <= 11 ? 2 : 3) as 1 | 2 | 3,
    skills: v.skills,
    materials: [
      { item: 'Tablet (iPad/Android) with Scratch Jr', quantity: '1 per child or pair' },
      { item: 'Projector to play the video', quantity: '1 per classroom', isOptional: true },
    ],
    objectives: [
      `Follow the video tutorial to ${v.learn.toLowerCase()}`,
      'Build the project on the tablet, step by step.',
      'Personalise the project with own characters/colours.',
    ],
    assessmentChecklist: [
      'Followed the video.',
      `Built "${v.title}".`,
      'Personalised it.',
    ],
    sections,
    resources: [
      { id: `${id}-r1`, title: `${v.title} — Video Tutorial`, type: 'video', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-sjr', description: 'Watch & build along (Google Drive)', needsReview: true },
      { id: `${id}-r2`, title: 'The Official ScratchJr Book (PDF)', type: 'pdf', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-sjr', description: 'Reference: Help Your Kids Learn to Code', needsReview: true },
    ],
  };
}

const VIDEOS: SJVideo[] = [
  { n: 1,  title: 'Make a Character Move', topic: 'Movement', emoji: '🏃', learn: 'Make a character move with motion blocks and the green flag', skills: ['Motion Blocks', 'Green Flag'], steps: ['Add a character (sprite).', 'Drag motion blocks (move right) into the script area.', 'Tap the green flag to run it.'] },
  { n: 2,  title: 'Move Two Characters', topic: 'Movement', emoji: '👯', learn: 'Make two characters move at the same time', skills: ['Sprites', 'Parallel Scripts'], steps: ['Add a second character.', 'Give each character its own movement script.', 'Run both with the green flag.'] },
  { n: 3,  title: 'Change Size and Speed', topic: 'Looks & Motion', emoji: '📏', learn: 'Change a character\'s size and how fast it moves', skills: ['Grow/Shrink', 'Speed'], steps: ['Add grow/shrink blocks to change size.', 'Add a speed block to move faster or slower.', 'Test with the green flag.'] },
  { n: 4,  title: 'Code Movement', topic: 'Movement', emoji: '🧭', learn: 'Code a sequence of movements in order', skills: ['Sequencing', 'Directions'], steps: ['Plan a path (right, up, left…).', 'Drag movement blocks in that order.', 'Run and watch the path.'] },
  { n: 5,  title: 'Use the Paint Editor', topic: 'Drawing', emoji: '🎨', learn: 'Draw your own character with the Paint Editor', skills: ['Paint Editor', 'Creativity'], steps: ['Open the Paint Editor.', 'Draw and colour your own character.', 'Add it to the stage and animate it.'] },
  { n: 6,  title: 'Make a Basketball Game', topic: 'Game', emoji: '🏀', learn: 'Build a simple basketball game', skills: ['Game Design', 'Touch'], steps: ['Add a ball and a hoop.', 'Make the ball move when tapped.', 'Add a reaction when it reaches the hoop.'] },
  { n: 7,  title: 'Make a Memory Game', topic: 'Game', emoji: '🧠', learn: 'Build a simple memory game', skills: ['Game Design', 'Matching'], steps: ['Add cards/characters.', 'Make them respond when tapped.', 'Add a win reaction.'] },
  { n: 8,  title: 'Maze Game with Messages', topic: 'Game', emoji: '🌀', learn: 'Make a maze game using messages between characters', skills: ['Messages', 'Pages'], steps: ['Draw a maze background.', 'Move the character through it.', 'Use send/receive message blocks to react.'] },
  { n: 9,  title: 'Knock-Knock Joke (Camera & Mic)', topic: 'Sound & Camera', emoji: '🎤', learn: 'Record your voice and use the camera in a project', skills: ['Record Sound', 'Camera'], steps: ['Record a knock-knock joke with the mic.', 'Take a photo with the camera for a character.', 'Play it back with a tap.'] },
  { n: 10, title: 'Among Us in ScratchJr', topic: 'Game', emoji: '🚀', learn: 'Recreate an Among Us-style scene', skills: ['Game Design', 'Characters'], steps: ['Add the characters and a spaceship background.', 'Make them move around.', 'Add a fun reaction/animation.'] },
  { n: 11, title: 'Hide & Seek', topic: 'Looks', emoji: '🙈', learn: 'Use hide and show to make a hide-and-seek game', skills: ['Hide/Show', 'Touch'], steps: ['Place characters around the scene.', 'Make some hide and reappear.', 'Tap to "find" them.'] },
  { n: 12, title: 'Change Looks', topic: 'Looks', emoji: '✨', learn: 'Change how a character looks during a project', skills: ['Looks', 'Costumes'], steps: ['Add looks/appearance changes.', 'Switch the look on a tap or event.', 'Combine with movement.'] },
  { n: 13, title: 'Use Sample Projects', topic: 'Explore', emoji: '📂', learn: 'Open and learn from the built-in sample projects', skills: ['Exploration', 'Remixing'], steps: ['Open a built-in sample project.', 'See how its blocks work.', 'Change something and make it your own.'] },
  { n: 14, title: 'Move Characters', topic: 'Movement', emoji: '🚶', learn: 'Practise moving characters smoothly around the stage', skills: ['Motion', 'Coordination'], steps: ['Plan where each character goes.', 'Build the movement scripts.', 'Run them together.'] },
  { n: 15, title: 'Make a Jumping Game', topic: 'Game', emoji: '🦘', learn: 'Build a jumping game', skills: ['Game Design', 'Jump'], steps: ['Add a character that jumps (up then down).', 'Add things to jump over.', 'Add a win/score reaction.'] },
];

export const SCRATCHJR_VIDEO_LESSONS: LessonDetail[] = VIDEOS.map(makeSJVideo);
