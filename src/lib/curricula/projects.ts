import type { Course, LessonDetail } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// Projects — interdisciplinary capstone briefs combining the academy's programs.
const P: KitProgram = { programId: 'projects', programSlug: 'projects', programTitle: 'Projects', programColor: '#0F766E', courseId: 'projects-1', courseTitle: 'Maker Projects & Design Challenges' };
const L1 = 'Level I · Guided Projects', L2 = 'Level II · Design Challenges', L3 = 'Level III · Capstone & Showcase';
const M = [{ item: 'Mixed kit (depends on the project — robot/micro:bit/craft materials)', quantity: 'per team' }, { item: 'Design journal / planning sheet', quantity: '1 per student' }];
const DT = { id: 'design-thinking', title: 'Design Thinking for Educators (free toolkit)', type: 'link' as const, audience: 'coach' as const, url: 'https://www.ideo.com/journal/design-thinking-for-educators-toolkit', description: 'Empathise → Define → Ideate → Prototype → Test' };

const mk = (id: string, title: string, emoji: string, diff: 1|2|3|4, age: '8-9'|'10-12'|'13-15', lvl: 'Beginner'|'Intermediate'|'Advanced', mod: string, modTitle: string, order: number, concept: string, conceptExplain: string, objectives: string[], steps: string[], challenge: string, skills: string[]): KitLesson =>
  ({ id, title, emoji, difficulty: diff, ageGroup: age, level: lvl, moduleId: mod, moduleTitle: modTitle, order, concept, conceptExplain, objectives, steps, challenge, skills, materials: M, resources: [DT] });

const C: KitLesson[] = [
  mk('pj-1', 'The Design Process (Plan Like an Engineer)', '🧭', 2, '10-12', 'Beginner', 'pj-m1', L1, 1,
    'the engineering/design-thinking cycle', 'Great projects follow a process: understand the problem, brainstorm, plan, build, test, and improve. This lesson sets up the design journal you\'ll use throughout.',
    ['Describe the design-thinking stages', 'Define a problem and users', 'Plan a project in a design journal'],
    ['Learn the cycle: Empathise → Define → Ideate → Prototype → Test.', 'Pick a problem and who it helps.', 'Brainstorm 5+ ideas.', 'Plan your first build in the journal.'],
    'Write a one-page project brief: the problem, the user, and your idea.', ['Design Thinking', 'Planning', 'Teamwork']),
  mk('pj-2', 'Interactive Poster (micro:bit + Crafts)', '📌', 2, '10-12', 'Beginner', 'pj-m1', L1, 2,
    'combining coding with making', 'Combine a micro:bit (or Makey Makey) with craft materials to make a poster that lights up, plays sound, or responds to touch — coding meets making.',
    ['Combine hardware with a craft build', 'Code a simple interaction', 'Present the result'],
    ['Design a poster with an interactive element.', 'Wire a micro:bit/Makey Makey to it.', 'Code the response (light/sound).', 'Test and present.'],
    'Build an interactive info-poster on a topic you choose.', ['Physical Computing', 'Making', 'Presenting']),
  mk('pj-3', 'Robot Mission (Drive & Sense)', '🤖', 3, '10-12', 'Beginner', 'pj-m1', L1, 3,
    'applying robotics to a mission', 'Use any class robot (mBot2, EV3, SPIKE…) to complete a short mission — navigate a course, react to a sensor, or move an object — applying what you know.',
    ['Plan a robot mission', 'Program drive + sensing', 'Test and improve reliability'],
    ['Define the mission and rules.', 'Program the drive path.', 'Add a sensor reaction.', 'Test and make it repeatable.'],
    'Complete a mission course with at least one sensor-based decision.', ['Robotics', 'Sensors', 'Reliability']),
  // Level II
  mk('pj-4', 'Design Challenge: Solve a Real Problem', '💡', 3, '13-15', 'Intermediate', 'pj-m2', L2, 4,
    'open-ended problem solving', 'Teams pick a real problem (in the school, home or community) and design a tech solution from scratch using any tools they\'ve learned.',
    ['Identify and define a real problem', 'Ideate and choose a solution', 'Build a first prototype'],
    ['Research a real problem and its users.', 'Ideate; pick the best solution.', 'Plan the build and roles.', 'Build a rough prototype.'],
    'Prototype a solution to a real problem and explain your design choices.', ['Problem Solving', 'Prototyping', 'Collaboration']),
  mk('pj-5', 'Prototype, Test & Iterate', '🔧', 3, '13-15', 'Intermediate', 'pj-m2', L2, 5,
    'testing and improving a prototype', 'Real design is iterative. Teams test their prototype with users, gather feedback, find failures, and build an improved version.',
    ['Test a prototype with users', 'Gather and act on feedback', 'Produce an improved version'],
    ['Make a test plan.', 'Test with real users.', 'Record what worked/failed.', 'Revise and rebuild (v2).'],
    'Show a v1 → v2 improvement driven by user feedback.', ['Testing', 'Iteration', 'User Feedback']),
  mk('pj-6', 'Data Project (Collect & Visualise)', '📊', 3, '13-15', 'Intermediate', 'pj-m2', L2, 6,
    'using sensors/code to gather data', 'Use a micro:bit/robot sensor (or code) to collect real data about the world, then present it as a chart and draw a conclusion.',
    ['Collect data with a sensor or program', 'Organise and chart the data', 'Draw a conclusion'],
    ['Pick a question (e.g. light/temperature/sound over time).', 'Collect data with a sensor.', 'Chart it (sheet/Scratch/Python).', 'Interpret the result.'],
    'Run a data investigation and present a chart + finding.', ['Data', 'Sensors', 'Analysis']),
  // Level III
  mk('pj-7', 'Capstone: Plan Your Big Project', '🗺️', 4, '13-15', 'Advanced', 'pj-m3', L3, 7,
    'scoping an ambitious project', 'Teams scope a capstone that combines multiple skills (e.g. robot + app, or sensor + web dashboard), set milestones, and divide the work.',
    ['Scope a multi-disciplinary project', 'Set milestones and roles', 'Plan the build and risks'],
    ['Choose an ambitious, combined project.', 'Break it into milestones.', 'Assign roles and a timeline.', 'List risks and a plan B.'],
    'Produce a capstone plan with milestones, roles and a timeline.', ['Project Management', 'Scoping', 'Teamwork']),
  mk('pj-8', 'Capstone: Build, Showcase & Reflect', '🏆', 4, '13-15', 'Advanced', 'pj-m3', L3, 8,
    'delivering and presenting a project', 'Teams build their capstone, prepare a demo, present it to an audience, and reflect on what they learned and would do next.',
    ['Build and finish a capstone', 'Demo and present it', 'Reflect and identify next steps'],
    ['Build to the milestones.', 'Prepare a clear demo + slides.', 'Present to an audience.', 'Reflect: what worked, what\'s next.'],
    'Deliver and present a finished capstone, with a reflection on improvements.', ['Delivery', 'Presentation', 'Reflection']),
];

export const PROJECTS_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));
export const PROJECTS_COURSE: Course = {
  id: P.courseId, slug: 'maker-projects', title: P.courseTitle, programId: P.programId, programSlug: P.programSlug,
  ageGroup: '10-12', level: 'Intermediate',
  description: 'Interdisciplinary projects that combine everything students learn — robotics, coding, electronics and making — through the design process. Level I: guided projects (interactive poster, robot mission). Level II: open design challenges, iterate-on-feedback, and a data project. Level III: a planned, built and presented capstone. Pulls together the academy\'s other programs.',
  objectives: ['Apply the design-thinking / engineering process', 'Combine coding, hardware and making in one project', 'Prototype, test with users, and iterate', 'Collect and present data', 'Plan, build, present and reflect on a capstone'],
  duration: '8 projects × 45–90 minutes', totalHours: 10, lessonCount: 8, prerequisites: ['Some experience in at least one other program (robotics or coding)'],
  skills: ['Design Thinking', 'Prototyping', 'Collaboration', 'Data', 'Presentation'],
  modules: [
    { id: 'pj-m1', title: L1, order: 1, description: 'The design process plus guided cross-discipline projects.', lessons: C.filter(c => c.moduleId === 'pj-m1').map(kitSummary) },
    { id: 'pj-m2', title: L2, order: 2, description: 'Open design challenges, iteration on feedback, and a data project.', lessons: C.filter(c => c.moduleId === 'pj-m2').map(kitSummary) },
    { id: 'pj-m3', title: L3, order: 3, description: 'Plan, build, showcase and reflect on a capstone.', lessons: C.filter(c => c.moduleId === 'pj-m3').map(kitSummary) },
  ],
};
