// Generates src/lib/curricula/microbit-units.ts from the parsed micro:bit
// scheme-of-work text (.lesson-extracts/mbu-*.txt). CC BY-SA 4.0 content.
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const EX = 'C:/Users/PC/Documents/GitHub/RoboHolic/.lesson-extracts';
const OUT = 'C:/Users/PC/Documents/GitHub/RoboHolic/src/lib/curricula/microbit-units.ts';

// unit slug -> { emoji, order, pages:{n:count} }
const PAGES = {
  active1:{1:8,2:10,3:11}, compfun:{1:18,2:17,3:14,4:13,5:15,6:7}, data:{1:19,2:14,3:18,4:14,5:17},
  flashcards:{1:16,2:15,3:12,4:18,5:18}, conductors:{1:17,2:28,3:14,4:14,5:9}, energy:{1:10,2:11,3:8,4:8,5:11,6:6},
  active2:{1:18,2:15,3:16,4:14,5:9}, healthtech:{1:12,2:10,3:13,4:8,5:10}, oceans:{1:12,2:22}, plants:{1:11,2:16},
  crypto:{1:16,2:10,3:15}, cyber:{1:15,2:18,3:10}, musical:{1:16,2:13,3:15,4:11,5:15}, natureart:{1:12,2:12,3:16,4:16},
  nightsafety:{1:11,2:9,3:10}, animals:{1:9,2:9}, seacreatures:{1:8,2:10}, sensory:{1:13,2:22,3:15,4:8}, volcano:{1:13,2:14,3:17,4:9,5:11},
};
// order them after "First Lessons" (module 1); emoji per theme.
const META = [
  ['compfun','🧮',2],['data','📊',3],['flashcards','🃏',4],['musical','🎵',5],['sensory','🧩',6],
  ['conductors','⚡',7],['energy','🔋',8],['nightsafety','🌙',9],['healthtech','🩺',10],
  ['active1','🏃',11],['active2','🤸',12],['oceans','🌊',13],['seacreatures','🐠',14],['plants','🌱',15],
  ['animals','🦌',16],['natureart','🎨',17],['volcano','🌋',18],['crypto','🔐',19],['cyber','🛡️',20],
];

const read = (f) => existsSync(join(EX, f)) ? readFileSync(join(EX, f), 'utf8') : '';
const lines = (s) => s.split('\n').map(x => x.trim()).filter(Boolean);
const clean = (s) => s.replace(/^\d{6,}/, '').trim();

// find index of first line matching test (from start)
function idxOf(arr, test, from = 0) { for (let i = from; i < arr.length; i++) if (test(arr[i])) return i; return -1; }
const H = {
  intro: l => /^(introduction|overview)$/i.test(l),
  time: l => /^time\b/i.test(l),
  lo: l => /^learning objectives?:?$/i.test(l),
  mat: l => /^(materials\b|you will need|resources:?)$/i.test(l) || /^materials\b/i.test(l),
  sum: l => /^(lesson summary|lesson flow|activities:?)$/i.test(l),
  ext: l => /^extension/i.test(l),
  diff: l => /^differentiation/i.test(l),
  assess: l => /^(opportunities for assessment|assessment for learning)/i.test(l),
  curr: l => /^(curriculum links|licensing information|summary)$/i.test(l),
};
function slice(arr, a, b) { if (a < 0) return []; const end = b < 0 ? arr.length : b; return arr.slice(a + 1, end).map(clean).filter(Boolean); }
const firstAfter = (cands, after) => cands.filter(x => x > after).sort((a, b) => a - b)[0] ?? -1;

function parsePlan(slug, n) {
  const L = lines(read(`mbu-${slug}-${n}.txt`));
  if (!L.length) return null;
  const iIntro = idxOf(L, H.intro), iTime = idxOf(L, H.time), iLo = idxOf(L, H.lo),
        iMat = idxOf(L, H.mat), iSum = idxOf(L, H.sum), iExt = idxOf(L, H.ext),
        iDiff = idxOf(L, H.diff), iAssess = idxOf(L, H.assess), iCurr = idxOf(L, H.curr);
  // every recognised header position, for computing block ends
  const allH = [iIntro, iTime, iLo, iMat, iSum, iExt, iDiff, iAssess, iCurr].filter(x => x >= 0);

  const introEnd = firstAfter(allH, iIntro);
  const intro = iIntro >= 0 ? slice(L, iIntro, introEnd).join(' ') : '';
  const objectives = iLo >= 0 ? slice(L, iLo, firstAfter(allH, iLo)) : [];
  const materials = iMat >= 0 ? slice(L, iMat, firstAfter(allH, iMat)).filter(x => !/^(downloadable resources|other resources)$/i.test(x)).join(', ') : '';

  // Activity walkthrough start: prefer an explicit "Lesson summary/flow" header,
  // else the materials header (its short list is filtered out below), else after
  // objectives/intro. Runs up to the first stop header (extension/diff/assessment).
  const actStart = iSum >= 0 ? iSum : iMat >= 0 ? iMat : iLo >= 0 ? iLo : iIntro;
  const actEnd = firstAfter([iExt, iDiff, iAssess, iCurr], actStart);
  const RES = /^(downloadable resources|other resources|lesson slides|lesson presentation|lesson plan)$/i;
  const activities = actStart >= 0 ? slice(L, actStart, actEnd).filter(x => !RES.test(x)) : [];

  const extension = iExt > actStart ? slice(L, iExt, firstAfter([iDiff, iAssess, iCurr], iExt)) : [];
  const differentiation = iDiff > actStart ? slice(L, iDiff, firstAfter([iAssess, iCurr], iDiff)) : [];
  const assessment = iAssess > actStart ? slice(L, iAssess, firstAfter([iCurr], iAssess)) : [];
  const titleLine = L.find(x => /lesson \d+:/i.test(x));
  const title = titleLine ? clean(titleLine).replace(/^.*?lesson \d+:\s*/i, '') : `Lesson ${n}`;
  return { intro, objectives, materials, activities, extension, differentiation, assessment, title };
}

function parseSummary(slug) {
  const L = lines(read(`mbu-${slug}-summary.txt`));
  const title = clean(L[0] || slug);
  const iSubj = idxOf(L, l => /^subjects? & topics:?/i.test(l));
  const iSum = idxOf(L, l => /^unit of work summary$/i.test(l));
  const iKey = idxOf(L, l => /^overall key learning$/i.test(l));
  const description = slice(L, iSum, iKey).join(' ');
  // skills from subjects block
  const subj = slice(L, iSubj, iSum);
  const skills = [...new Set(subj.flatMap(s => {
    const after = s.includes(':') ? s.split(':').slice(1).join(':') : s;
    return after.split(',').map(x => x.trim()).filter(Boolean);
  }))].slice(0, 6);
  // per-lesson key learning (fallback objectives)
  const keyByN = {};
  for (let i = 0; i < L.length; i++) {
    const m = L[i].match(/^lesson (\d+):/i);
    if (m) {
      const n = +m[1]; const kl = [];
      const kIdx = idxOf(L, l => /^key learning:?$/i.test(l), i);
      if (kIdx > 0) for (let j = kIdx + 1; j < L.length; j++) { if (/^(lesson \d+:|curriculum links|key learning)/i.test(L[j])) break; kl.push(clean(L[j])); }
      keyByN[n] = kl.filter(Boolean);
    }
  }
  return { title, description, skills, keyByN };
}

const units = [];
for (const [slug, emoji, order] of META) {
  const sum = parseSummary(slug);
  const pmap = PAGES[slug];
  const ns = Object.keys(pmap).map(Number).sort((a, b) => a - b);
  const lessons = [];
  for (const n of ns) {
    const p = parsePlan(slug, n) || {};
    let objectives = (p.objectives && p.objectives.length ? p.objectives : (sum.keyByN[n] || [])).slice(0, 6);
    if (!objectives.length) objectives = ['Apply micro:bit coding (MakeCode) to the unit theme.', 'Plan, build, test and debug a working program.', 'Discuss and evaluate how the technology helps solve a real-world problem.'];
    lessons.push({
      n, slug: `mbu-${slug}-${n}`, title: p.title || `Lesson ${n}`, pages: pmap[n],
      intro: p.intro || '', materials: p.materials || '', objectives,
      activities: (p.activities || []).slice(0, 60),
      extension: (p.extension || []).slice(0, 8),
      differentiation: (p.differentiation || []).slice(0, 8),
      assessment: (p.assessment || []).slice(0, 8),
    });
  }
  units.push({ slug, title: sum.title, emoji, order, description: sum.description, skills: sum.skills, lessons });
}

const body = `import type { Course, LessonDetail, LessonSection, LessonImage, Module, Difficulty } from '@/types';

// ════════════════════════════════════════════════════════════════
//  micro:bit — themed schemes of work (BBC micro:bit Foundation /
//  "do your :bit"). AUTO-GENERATED from the official lesson plans,
//  summaries and slide decks (CC BY-SA 4.0). Slide images are
//  rendered from the source .pptx; plans/handouts/.hex are in Drive.
//  Edit scripts/gen-microbit-units.mjs and re-run to regenerate.
// ════════════════════════════════════════════════════════════════

export const MICROBIT_COURSE_TITLE = 'micro:bit Coding & Computing (MakeCode)';

interface UnitLesson { n: number; slug: string; title: string; pages: number; intro: string; materials: string; objectives: string[]; activities: string[]; extension: string[]; differentiation: string[]; assessment: string[]; }
interface Unit { slug: string; title: string; emoji: string; order: number; description: string; skills: string[]; lessons: UnitLesson[]; }

const UNITS: Unit[] = ${JSON.stringify(units, null, 1)};

function gallery(slug: string, pages: number): LessonImage[] {
  const a: LessonImage[] = [];
  for (let i = 2; i <= pages; i++) a.push({ src: \`/lessons/\${slug}/p-\${String(i).padStart(2, '0')}.png\`, kind: 'photo', caption: \`Slide \${i}\` });
  return a;
}

function makeLesson(u: Unit, l: UnitLesson): LessonDetail {
  const diff = (l.n <= 1 ? 2 : 3) as Difficulty;
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Before-Class Preparation', emoji: '📋', isCoachOnly: true,
      content: [
        l.intro || \`Introduce "\${l.title}" from the \${u.title} unit.\`,
        l.materials ? \`Materials: \${l.materials}\` : 'Materials: BBC micro:bits + USB leads, computers/tablets with the MakeCode editor (makecode.microbit.org), and the unit handouts.',
        'Open the lesson slides (shown below). The editable plan (.docx), slides (.pptx), printable student handouts and ready-made MakeCode .hex files are in the unit\\'s Drive folder (see Resources).',
        'This is official micro:bit Foundation curriculum (CC BY-SA 4.0) — the timings and prompts are adaptable to your class.',
      ],
    },
    {
      type: 'coach_steps', title: 'Step-by-Step Lesson Guide', emoji: '🎓', isCoachOnly: true,
      content: l.activities.length ? l.activities : ['Work through the lesson slides below with the class, pausing for the practical MakeCode activities.'],
      images: gallery(l.slug, l.pages),
    },
    {
      type: 'activity', title: \`Activity: \${l.title}\`, emoji: '🛠️',
      content: [
        l.intro || \`In this lesson you will explore "\${l.title}".\`,
        'Follow your coach through the activities and build, test and debug the code in MakeCode (makecode.microbit.org). Test in the simulator, then flash it to a real micro:bit.',
      ],
      studentContent: [
        \`🎯 Today: \${l.title}\`,
        ...l.objectives.map(o => '• ' + o),
        '💻 Build and test your code in MakeCode, then flash it to your micro:bit!',
      ],
    },
    ...(l.extension.length ? [{
      type: 'extra_challenge' as const, title: 'Extension & Challenge', emoji: '🚀',
      content: l.extension,
    }] : []),
    {
      type: 'assessment', title: 'Assessment & Success Criteria', emoji: '✅',
      content: l.assessment.length ? l.assessment : l.objectives.map(o => 'Can ' + o.replace(/^to\\s+/i, '').toLowerCase()),
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        \`UNIT: \${u.title} · Lesson \${l.n} of \${u.lessons.length}.\`,
        ...(l.differentiation.length ? ['DIFFERENTIATION: ' + l.differentiation.join(' ')] : []),
        'The slides, editable lesson plan, student handouts and completed MakeCode .hex files are in the unit Drive folder (Resources).',
        'micro:bit classroom (mbit.io/lessons-classroom) is a free, no-accounts way to manage and save every student\\'s code.',
        'SOURCE: official micro:bit Foundation curriculum, licensed CC BY-SA 4.0.',
      ],
    },
  ];

  return {
    id: l.slug, slug: l.slug, title: l.title,
    programId: 'microbit', programSlug: 'microbit', programTitle: 'micro:bit', programColor: '#10B981',
    courseId: 'microbit-first', courseTitle: MICROBIT_COURSE_TITLE,
    moduleId: \`mbu-\${u.slug}\`, moduleTitle: \`\${u.emoji} \${u.title}\`,
    ageGroup: '10-12', level: 'Intermediate', duration: '45–60 minutes', difficulty: diff,
    skills: u.skills.slice(0, 4),
    materials: [
      { item: 'BBC micro:bit + micro-USB cable', quantity: '1 per pair' },
      { item: 'Computer/tablet with MakeCode editor', quantity: '1 per pair' },
      { item: 'micro:bit battery pack', quantity: '1 per micro:bit', isOptional: true },
    ],
    objectives: l.objectives,
    assessmentChecklist: l.objectives.map(o => o.replace(/^to\\s+/i, 'Can ')),
    sections,
    heroImage: \`/lessons/\${l.slug}/p-01.png\`,
    resources: [
      { id: \`\${l.slug}-r1\`, title: \`\${l.title} — Lesson Slides (PPTX)\`, type: 'slides', audience: 'both', url: 'https://drive.google.com/drive/folders/roboholic-microbit', description: 'Official micro:bit slide deck', needsReview: true },
      { id: \`\${l.slug}-r2\`, title: \`\${l.title} — Lesson Plan (DOCX)\`, type: 'pdf', audience: 'coach', url: 'https://drive.google.com/drive/folders/roboholic-microbit', description: 'Official micro:bit lesson plan', needsReview: true },
    ],
  };
}

export const MICROBIT_UNIT_LESSONS: LessonDetail[] = UNITS.flatMap(u => u.lessons.map(l => makeLesson(u, l)));

export const MICROBIT_UNIT_MODULES: Module[] = UNITS.map(u => ({
  id: \`mbu-\${u.slug}\`, title: \`\${u.emoji} \${u.title}\`, order: u.order,
  description: u.description.slice(0, 200),
  lessons: u.lessons.map(l => ({ id: l.slug, title: l.title, duration: '45–60 min', difficulty: (l.n <= 1 ? 2 : 3) as Difficulty, skills: u.skills.slice(0, 2), order: l.n })),
}));

export const MICROBIT_UNIT_LESSON_COUNT = MICROBIT_UNIT_LESSONS.length;
`;

writeFileSync(OUT, body, 'utf8');
console.log('Units:', units.length, '| Lessons:', units.reduce((s, u) => s + u.lessons.length, 0));
console.log('Wrote', OUT);
