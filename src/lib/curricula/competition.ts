import type { Course, LessonDetail } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// ── MakeX ───────────────────────────────────────────────────────
const PX: KitProgram = { programId: 'makex', programSlug: 'makex', programTitle: 'MakeX', programColor: '#B45309', courseId: 'makex-1', courseTitle: 'MakeX Robotics Competition' };
const MX = [{ item: 'Makeblock robot (mBot2 / mBot Neo) + competition kit', quantity: 'per team' }, { item: 'Competition mat / field elements (per season)', quantity: 'per team' }];
const MAKEX = { id: 'makex-official', title: 'MakeX — official competition site (seasons & rules)', type: 'link' as const, audience: 'both' as const, url: 'https://www.makex.io/', description: 'Official MakeX themes, rules and resources' };
const mx = (id: string, title: string, emoji: string, diff: 1|2|3|4, lvl: 'Beginner'|'Intermediate'|'Advanced', mod: string, modTitle: string, order: number, concept: string, conceptExplain: string, objectives: string[], steps: string[], challenge: string, skills: string[], quiz?: import('@/types').QuizQuestion[]): KitLesson =>
  ({ id, title, emoji, difficulty: diff, ageGroup: '13-15', level: lvl, moduleId: mod, moduleTitle: modTitle, order, concept, conceptExplain, objectives, steps, challenge, skills, materials: MX, resources: [MAKEX], ...(quiz ? { quiz } : {}) });
const MXC: KitLesson[] = [
  mx('mx-1', 'What is MakeX? Format & Rules', '🏁', 2, 'Beginner', 'mx-m1', 'Level I · Get Competition-Ready', 1,
    'the MakeX competition format', 'MakeX is a Makeblock robotics competition with a yearly theme. Teams build and program a robot for timed challenge missions (and often a creative project). Knowing the rules and scoring is step one.',
    ['Explain the MakeX format and scoring', 'Read this season\'s rules and field', 'Set team roles'],
    ['Read the current season theme and rulebook.', 'Map the field and the scoring missions.', 'Assign team roles (build, code, strategy).', 'Set a practice schedule.'],
    'Summarise this season\'s top 3 scoring opportunities and a team plan.', ['Competition', 'Rules', 'Teamwork'],
    [
      { question: 'MakeX is a:', options: ['robotics competition with a yearly theme', 'video game', 'spreadsheet', 'phone app'], answerIndex: 0 },
      { question: 'What should a team do FIRST?', options: ['read the season rules and scoring', 'build randomly', 'fly a drone', 'paint the robot'], answerIndex: 0 },
      { question: 'A good team divides up roles like:', options: ['build, code, strategy', 'only one person does everything', 'no roles', 'all build, none code'], answerIndex: 0 },
    ]),
  mx('mx-2', 'Robot Design for Missions', '🔧', 3, 'Beginner', 'mx-m1', 'Level I · Get Competition-Ready', 2,
    'designing a reliable competition robot', 'A competition robot must be reliable, fast and built for the specific missions — stable drive base, the right attachments, and quick, repeatable behaviour.',
    ['Design a stable, fast drive base', 'Add mission-specific attachments', 'Prioritise reliability'],
    ['Build a low, stable drive base.', 'Design attachments for key missions.', 'Make changes quick (modular).', 'Test repeatability.'],
    'Build a robot that completes one mission reliably 5 times in a row.', ['Robot Design', 'Mechanisms', 'Reliability']),
  mx('mx-3', 'Programming Missions & Accuracy', '🎯', 3, 'Intermediate', 'mx-m2', 'Level II · Strategy & Practice', 3,
    'accurate, repeatable mission code', 'Use sensors, calibration and reliable navigation (squaring, gyro) so the robot scores the same way every run — accuracy beats raw speed.',
    ['Program a mission accurately', 'Use sensors/calibration for repeatability', 'Build a run menu'],
    ['Program a scoring mission.', 'Use sensors to stay accurate.', 'Calibrate for the field.', 'Add a menu to select runs.'],
    'Score two missions back-to-back with a run-selection menu.', ['Programming', 'Accuracy', 'Sensors']),
  mx('mx-4', 'Strategy, Practice & Game Day', '🧠', 4, 'Advanced', 'mx-m2', 'Level II · Strategy & Practice', 4,
    'competition strategy and execution', 'Winning teams plan which missions to attempt for the most points, practice under time pressure, manage the pit, and stay calm on game day.',
    ['Plan a points-maximising strategy', 'Practice runs under time', 'Prepare for game day (pit, checklist)'],
    ['Rank missions by points vs reliability.', 'Time full practice runs.', 'Make a pit checklist and backups.', 'Do a mock competition.'],
    'Run a timed mock match and hit a target score consistently.', ['Strategy', 'Practice', 'Game Day']),
];
export const MAKEX_LESSONS: LessonDetail[] = MXC.map(c => makeKitLesson(c, PX));
export const MAKEX_COURSE: Course = {
  id: PX.courseId, slug: 'makex-robotics-competition', title: PX.courseTitle, programId: PX.programId, programSlug: PX.programSlug,
  ageGroup: '13-15', level: 'Intermediate',
  description: 'Prepare for the MakeX robotics competition (Makeblock): understand the season format and rules, design a reliable mission robot, program accurate repeatable runs, and master strategy and game-day execution.',
  objectives: ['Understand the MakeX format, rules and scoring', 'Design a reliable competition robot', 'Program accurate, repeatable missions', 'Plan strategy and execute on game day'],
  duration: '4 lessons × 60–90 minutes', totalHours: 6, lessonCount: 4, prerequisites: ['Robotics experience (mBot2 or similar)'],
  skills: ['Competition', 'Robot Design', 'Accurate Programming', 'Strategy'],
  modules: [
    { id: 'mx-m1', title: 'Level I · Get Competition-Ready', order: 1, description: 'Format, rules, and robot design for the season\'s missions.', lessons: MXC.filter(c => c.moduleId === 'mx-m1').map(kitSummary) },
    { id: 'mx-m2', title: 'Level II · Strategy & Practice', order: 2, description: 'Accurate mission programming, strategy, practice and game day.', lessons: MXC.filter(c => c.moduleId === 'mx-m2').map(kitSummary) },
  ],
};

// ── Competition (general: FLL / WRO / MakeX prep) ───────────────
const PC: KitProgram = { programId: 'competition', programSlug: 'competition', programTitle: 'Competition', programColor: '#DC2626', courseId: 'competition-1', courseTitle: 'Robotics Competition Prep (FLL · WRO · MakeX)' };
const CM = [{ item: 'Competition robot kit (LEGO SPIKE/EV3, mBot2, or per league)', quantity: 'per team' }, { item: 'Engineering notebook', quantity: '1 per team' }];
const FLL = { id: 'fll', title: 'FIRST LEGO League — official', type: 'link' as const, audience: 'coach' as const, url: 'https://www.firstlegoleague.org/', description: 'FLL Challenge season, rules & rubrics' };
const WRO = { id: 'wro', title: 'World Robot Olympiad — official', type: 'link' as const, audience: 'coach' as const, url: 'https://wro-association.org/', description: 'WRO categories, rules & seasons' };
const cm = (id: string, title: string, emoji: string, diff: 1|2|3|4, lvl: 'Beginner'|'Intermediate'|'Advanced', mod: string, modTitle: string, order: number, concept: string, conceptExplain: string, objectives: string[], steps: string[], challenge: string, skills: string[], quiz?: import('@/types').QuizQuestion[]): KitLesson =>
  ({ id, title, emoji, difficulty: diff, ageGroup: '10-12', level: lvl, moduleId: mod, moduleTitle: modTitle, order, concept, conceptExplain, objectives, steps, challenge, skills, materials: CM, resources: [FLL, WRO], ...(quiz ? { quiz } : {}) });
const CC: KitLesson[] = [
  cm('cmp-1', 'Choosing a League & Reading the Rules', '📜', 2, 'Beginner', 'cmp-m1', 'Level I · Foundations', 1,
    'how robotics competitions work', 'Leagues like FIRST LEGO League, World Robot Olympiad and MakeX each have a yearly theme, a game field, missions and judged elements (robot design, project, teamwork). Picking a league and reading its rules comes first.',
    ['Compare the main leagues (FLL/WRO/MakeX)', 'Read a rulebook and scoring', 'Form a balanced team'],
    ['Compare leagues and pick one.', 'Read the season rules + field.', 'List the scoring missions.', 'Form roles and norms.'],
    'Produce a one-pager: chosen league, top missions, and team roles.', ['Competition', 'Rules', 'Teamwork'],
    [
      { question: 'Which is a real robotics competition league?', options: ['FIRST LEGO League (FLL)', 'FIFA', 'NBA', 'the Olympics of chess'], answerIndex: 0 },
      { question: 'Most leagues each season have a:', options: ['theme, field, missions and judged parts', 'single fixed robot', 'no rules', 'only a written test'], answerIndex: 0 },
      { question: 'The first step in competition prep is to:', options: ['read the rules and scoring', 'build blindly', 'buy trophies', 'skip the field'], answerIndex: 0 },
    ]),
  cm('cmp-2', 'The Engineering Notebook', '📓', 2, 'Beginner', 'cmp-m1', 'Level I · Foundations', 2,
    'documenting the design journey', 'Judged competitions reward documentation. An engineering notebook records ideas, designs, tests and decisions — and is often scored.',
    ['Keep an engineering notebook', 'Document designs, tests and decisions', 'Use it to track progress'],
    ['Set up notebook sections.', 'Log each build/test with dates.', 'Record why decisions were made.', 'Review it weekly.'],
    'Document one full build-test-improve cycle in the notebook.', ['Documentation', 'Engineering Process', 'Reflection']),
  cm('cmp-3', 'Reliable Robot & Repeatable Runs', '🤖', 3, 'Intermediate', 'cmp-m2', 'Level II · Build & Compete', 3,
    'building for reliability under pressure', 'Competitions are won by reliability: a stable base, consistent navigation (squaring, gyro, sensors), and quick attachment changes that score the same every time.',
    ['Build a reliable, modular robot', 'Program repeatable navigation', 'Reduce run-to-run variation'],
    ['Build a stable, modular base.', 'Use sensors/gyro for accuracy.', 'Add quick-swap attachments.', 'Test repeatability (5+ runs).'],
    'Achieve a mission that scores reliably 5 runs in a row.', ['Reliability', 'Navigation', 'Mechanisms']),
  cm('cmp-4', 'Project, Presentation & Game Day', '🏆', 3, 'Advanced', 'cmp-m2', 'Level II · Build & Compete', 4,
    'the judged project and competing well', 'Many leagues include an innovation project and judged interviews. Teams research a problem, propose a solution, present it, and manage game-day strategy and nerves.',
    ['Prepare an innovation project & pitch', 'Practice the judged interview', 'Plan game-day strategy'],
    ['Research a real problem and solution.', 'Build a clear presentation.', 'Rehearse the interview Q&A.', 'Plan match strategy + pit checklist.'],
    'Deliver a mock judging session (robot + project + interview) and a timed match.', ['Presentation', 'Strategy', 'Teamwork']),
];
export const COMPETITION_LESSONS: LessonDetail[] = CC.map(c => makeKitLesson(c, PC));
export const COMPETITION_COURSE: Course = {
  id: PC.courseId, slug: 'robotics-competition-prep', title: PC.courseTitle, programId: PC.programId, programSlug: PC.programSlug,
  ageGroup: '10-12', level: 'Intermediate',
  description: 'Get a team ready for robotics competitions — FIRST LEGO League, World Robot Olympiad or MakeX. Choose a league and read its rules, keep an engineering notebook, build a reliable robot with repeatable runs, and prepare the judged project, presentation and game-day strategy.',
  objectives: ['Compare leagues and read competition rules', 'Keep an engineering notebook', 'Build a reliable robot with repeatable runs', 'Prepare a project, presentation and game-day plan'],
  duration: '4 lessons × 60–90 minutes', totalHours: 6, lessonCount: 4, prerequisites: ['Robotics experience'],
  skills: ['Competition', 'Engineering Notebook', 'Reliability', 'Presentation'],
  modules: [
    { id: 'cmp-m1', title: 'Level I · Foundations', order: 1, description: 'Choose a league, read the rules, and keep an engineering notebook.', lessons: CC.filter(c => c.moduleId === 'cmp-m1').map(kitSummary) },
    { id: 'cmp-m2', title: 'Level II · Build & Compete', order: 2, description: 'Reliable robot & repeatable runs, plus project, presentation and game day.', lessons: CC.filter(c => c.moduleId === 'cmp-m2').map(kitSummary) },
  ],
};
