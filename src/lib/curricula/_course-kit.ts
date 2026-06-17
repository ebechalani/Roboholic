import type { LessonDetail, LessonSection, Module, Resource, Difficulty, AgeGroupId, Material, Level, QuizQuestion, LessonInteraction } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Shared factory for the "link-based" courses (Scratch, web dev,
//  projects, competition, etc.). Each course file just supplies data;
//  this builds the standard interactive lesson sections.
// ════════════════════════════════════════════════════════════════

export interface KitProgram {
  programId: string; programSlug: string; programTitle: string; programColor: string;
  courseId: string; courseTitle: string;
}

export interface KitLesson {
  id: string; title: string; emoji: string; difficulty: Difficulty; ageGroup: AgeGroupId; level: Level;
  moduleId: string; moduleTitle: string; order: number; youtubeId?: string;
  concept: string; conceptExplain: string; objectives: string[];
  steps: string[]; code?: string[]; challenge: string; skills: string[];
  materials: Material[]; resources: Resource[];
  safety?: string; // optional extra safety/comfort note for the coach prep
  quiz?: QuizQuestion[];
  playground?: { lang: 'html' | 'python'; starter: string };
  interactions?: LessonInteraction[];
}

export function makeKitLesson(c: KitLesson, p: KitProgram): LessonDetail {
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        c.conceptExplain,
        `You need: ${c.materials.map(m => m.item).join(', ')}.`,
        ...(c.safety ? [c.safety] : []),
        'Open the linked resource (Resources) and try the activity yourself first.',
        'SUGGESTED CONTENT: the linked official/open resources are the source material; the steps and challenge here are RoboHolic suggestions you can adapt.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Coach Guide', emoji: '🎓', isCoachOnly: true,
      content: [
        `ENGAGE: Introduce "${c.title}". ${c.concept[0].toUpperCase() + c.concept.slice(1)}.`,
        'INVESTIGATE: Show the linked resource and demo the idea once.',
        'CREATE: Students work through the steps below.',
        'SHARE & REVIEW: Students show their work and you check the objectives.',
      ],
    },
    {
      type: 'student_steps', title: `Do It: ${c.title} ${c.emoji}`, emoji: '🎯',
      content: ['Follow these steps (and the linked guide in Resources):', ...c.steps, ...(c.code ? ['', 'Example:', ...c.code] : [])],
      studentContent: [`🎯 ${c.title}`, ...c.steps.map(s => '👉 ' + s), ...(c.code ? ['💻 Example:', ...c.code.map(s => '  ' + s)] : [])],
    },
    {
      type: 'challenge', title: 'Challenge & Extend', emoji: '🚀',
      content: [c.challenge],
      studentContent: [`🚀 ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student completed the activity and can explain it.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON: ${c.title}. Topic: ${c.concept}.`,
        'The linked resource (Resources) is the primary material; these prompts are RoboHolic suggestions.',
      ],
    },
  ];

  return {
    id: c.id, slug: c.id, title: c.title,
    programId: p.programId, programSlug: p.programSlug, programTitle: p.programTitle, programColor: p.programColor,
    courseId: p.courseId, courseTitle: p.courseTitle,
    moduleId: c.moduleId, moduleTitle: c.moduleTitle,
    ageGroup: c.ageGroup, level: c.level, duration: '45–60 minutes', difficulty: c.difficulty,
    skills: c.skills, materials: c.materials,
    objectives: c.objectives, assessmentChecklist: c.objectives,
    sections,
    ...(c.youtubeId ? { youtubeId: c.youtubeId } : {}),
    ...(c.quiz ? { quiz: c.quiz } : {}),
    ...(c.playground ? { playground: c.playground } : {}),
    ...(c.interactions ? { interactions: c.interactions } : {}),
    resources: c.resources,
  };
}

export const kitSummary = (c: KitLesson) => ({ id: c.id, title: c.title, duration: '45–60 min', difficulty: c.difficulty, skills: c.skills.slice(0, 2), order: c.order });
