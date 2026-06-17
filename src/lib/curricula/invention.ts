import type { Course, LessonDetail } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// Invention — invention literacy & design thinking (pairs with Makey Makey / Projects).
const P: KitProgram = { programId: 'invention', programSlug: 'invention', programTitle: 'Invention', programColor: '#6D28D9', courseId: 'invention-1', courseTitle: 'Invention Literacy & Design Thinking' };
const L1 = 'Level I · Think Like an Inventor', L2 = 'Level II · Prototype & Build', L3 = 'Level III · Pitch & Launch';
const M = [{ item: 'Maker materials (card, tape, recyclables) + optional Makey Makey / micro:bit', quantity: 'per team' }, { item: 'Invention journal', quantity: '1 per student' }];
const IDEO = { id: 'ideo', title: 'Design Thinking for Educators (free toolkit)', type: 'link' as const, audience: 'coach' as const, url: 'https://www.ideo.com/journal/design-thinking-for-educators-toolkit', description: 'A simple design-thinking process' };

const mk = (id: string, title: string, emoji: string, diff: 1|2|3|4, age: '8-9'|'10-12'|'13-15', lvl: 'Beginner'|'Intermediate'|'Advanced', mod: string, modTitle: string, order: number, concept: string, conceptExplain: string, objectives: string[], steps: string[], challenge: string, skills: string[], quiz?: import('@/types').QuizQuestion[]): KitLesson =>
  ({ id, title, emoji, difficulty: diff, ageGroup: age, level: lvl, moduleId: mod, moduleTitle: modTitle, order, concept, conceptExplain, objectives, steps, challenge, skills, materials: M, resources: [IDEO], ...(quiz ? { quiz } : {}) });

const C: KitLesson[] = [
  mk('inv-1', 'What Is Invention? (Invention Literacy)', '💡', 1, '8-9', 'Beginner', 'inv-m1', L1, 1,
    'inventions and how they come to be', 'Inventions are solutions people create for problems. "Invention literacy" means being able to read how things work AND write (create) your own inventions. We start by spotting problems worth solving.',
    ['Explain what an invention is', 'Spot problems in everyday life', 'Start an invention journal'],
    ['Look at everyday inventions and the problems they solve.', 'List annoyances/problems you notice.', 'Pick one worth solving.', 'Start your invention journal.'],
    'Fill a journal page with 10 problems you\'d like to solve.', ['Invention Literacy', 'Observation', 'Curiosity'],
    [
      { question: 'An invention is:', options: ['a solution someone creates for a problem', 'a type of battery', 'a sticker', 'a colour'], answerIndex: 0 },
      { question: '"Invention literacy" means being able to:', options: ['read how things work AND create your own', 'only read books', 'only draw', 'memorise facts'], answerIndex: 0 },
      { question: 'Inventors start by:', options: ['spotting a real problem worth solving', 'building randomly', 'copying others', 'giving up'], answerIndex: 0 },
    ]),
  mk('inv-2', 'Empathise & Define the Problem', '🔎', 2, '10-12', 'Beginner', 'inv-m1', L1, 2,
    'understanding the user and the real problem', 'Good inventions solve a real need. You learn about the people affected (empathise) and write a clear problem statement before jumping to solutions.',
    ['Find out who has the problem and why', 'Write a clear problem statement', 'Avoid solving the wrong problem'],
    ['Choose a problem and its users.', 'Ask/observe to understand their need.', 'Write: "[User] needs [need] because [insight]".', 'Check you\'re solving the real problem.'],
    'Write a one-sentence problem statement backed by a user insight.', ['Empathy', 'Problem Definition', 'Research']),
  mk('inv-3', 'Brainstorm & Choose an Idea', '🧠', 2, '10-12', 'Beginner', 'inv-m1', L1, 3,
    'generating and selecting ideas', 'Inventors generate many ideas before choosing. You brainstorm freely (quantity first), then pick the most promising idea using simple criteria.',
    ['Brainstorm many ideas without judging', 'Use criteria to choose one', 'Sketch the chosen idea'],
    ['Brainstorm 15+ ideas (no bad ideas yet).', 'Group and discuss them.', 'Score them (useful? doable? exciting?).', 'Sketch your chosen idea.'],
    'Pick one idea and sketch how it works with labels.', ['Ideation', 'Decision Making', 'Sketching']),
  // Level II
  mk('inv-4', 'Build a Cardboard Prototype', '📦', 2, '10-12', 'Intermediate', 'inv-m2', L2, 4,
    'rapid low-cost prototyping', 'A prototype is a rough first build to test an idea — cardboard, tape and recyclables are perfect. Fast and cheap beats slow and perfect.',
    ['Build a quick physical prototype', 'Use low-cost materials', 'Show how the idea works'],
    ['Gather card/tape/recyclables.', 'Build a rough version of your idea.', 'Make the key part actually work/move.', 'Note what to test.'],
    'Build a cardboard prototype that demonstrates your core idea.', ['Prototyping', 'Making', 'Resourcefulness']),
  mk('inv-5', 'Add Interactivity (Makey Makey / micro:bit)', '⚡', 3, '13-15', 'Intermediate', 'inv-m2', L2, 5,
    'making a prototype interactive', 'Bring a prototype to life with simple tech — a Makey Makey input, a micro:bit sensor/output — so it responds, lights up or reacts.',
    ['Add a tech input or output', 'Connect it to the prototype', 'Demo the interaction'],
    ['Decide what should react (light/sound/sensor).', 'Wire a Makey Makey or micro:bit.', 'Code the response.', 'Integrate it into the prototype.'],
    'Make your prototype respond to a touch or a sensor.', ['Physical Computing', 'Integration', 'Making']),
  mk('inv-6', 'Test with Users & Improve', '🔁', 3, '13-15', 'Intermediate', 'inv-m2', L2, 6,
    'testing and iterating an invention', 'Inventors test with real people, learn what fails, and improve. One round of feedback usually makes a big difference.',
    ['Test the invention with users', 'Gather honest feedback', 'Make a clear improvement'],
    ['Plan what to test.', 'Watch users try it.', 'Record what worked/failed.', 'Make one solid improvement (v2).'],
    'Show a v1 → v2 change based on real user feedback.', ['Testing', 'Iteration', 'Feedback']),
  // Level III
  mk('inv-7', 'Pitch Your Invention', '🎤', 3, '13-15', 'Advanced', 'inv-m3', L3, 7,
    'communicating an invention', 'A great invention needs a clear pitch: the problem, your solution, how it works, and why it matters — short, visual and convincing.',
    ['Structure a short pitch', 'Make a simple visual/demo', 'Present clearly and answer questions'],
    ['Write the pitch: problem → solution → how → why.', 'Make a poster/slide or demo.', 'Rehearse a 2-minute pitch.', 'Practise Q&A.'],
    'Deliver a 2-minute pitch of your invention with a visual or demo.', ['Communication', 'Storytelling', 'Confidence']),
  mk('inv-8', 'Capstone: Invention Showcase', '🏆', 4, '13-15', 'Advanced', 'inv-m3', L3, 8,
    'the full invention process end-to-end', 'Students run the whole cycle — find a problem, design, prototype, add tech, test, improve — and present a finished invention at a showcase, then reflect on next steps.',
    ['Run the full invention process', 'Present a finished invention', 'Reflect and plan next steps'],
    ['Take an invention from problem to tested prototype.', 'Polish it and the pitch.', 'Present at a showcase/fair.', 'Reflect: impact and what\'s next.'],
    'Showcase a finished, tested invention with a pitch and a reflection.', ['Invention', 'Project', 'Reflection']),
];

export const INVENTION_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));
export const INVENTION_COURSE: Course = {
  id: P.courseId, slug: 'invention-literacy', title: P.courseTitle, programId: P.programId, programSlug: P.programSlug,
  ageGroup: '10-12', level: 'Beginner',
  description: 'Learn to invent — turn problems into solutions using design thinking and "invention literacy". Level I: spot problems, empathise, define and brainstorm. Level II: build cardboard prototypes, add interactivity (Makey Makey / micro:bit), and test with users. Level III: pitch your invention and run a full invention-showcase capstone.',
  objectives: ['Spot problems worth solving and define them', 'Brainstorm and choose ideas', 'Build and make prototypes interactive', 'Test with users and iterate', 'Pitch and showcase a finished invention'],
  duration: '8 lessons × 45–60 minutes', totalHours: 8, lessonCount: 8, prerequisites: [],
  skills: ['Invention Literacy', 'Design Thinking', 'Prototyping', 'Physical Computing', 'Pitching'],
  modules: [
    { id: 'inv-m1', title: L1, order: 1, description: 'Invention literacy, empathy, problem definition and ideation.', lessons: C.filter(c => c.moduleId === 'inv-m1').map(kitSummary) },
    { id: 'inv-m2', title: L2, order: 2, description: 'Cardboard prototypes, adding interactivity, and testing with users.', lessons: C.filter(c => c.moduleId === 'inv-m2').map(kitSummary) },
    { id: 'inv-m3', title: L3, order: 3, description: 'Pitch your invention and run a full showcase capstone.', lessons: C.filter(c => c.moduleId === 'inv-m3').map(kitSummary) },
  ],
};
