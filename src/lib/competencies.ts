// ════════════════════════════════════════════════════════════════
//  ICT competency framework — what coaches tick per student, instead
//  of per-lesson skill tags. Grouped into strands. Each tick maps to a
//  recognised ICT/CS competency and feeds the parent progress report.
//  (Adaptable — edit/extend the strands and items as your academy needs.)
// ════════════════════════════════════════════════════════════════

export interface IctCompetency { id: string; label: string; }
export interface IctStrand { id: string; title: string; color: string; items: IctCompetency[]; }

export const ICT_STRANDS: IctStrand[] = [
  {
    id: 'ct', title: 'Computational Thinking', color: '#7C3AED', items: [
      { id: 'ct-decompose', label: 'Breaks a problem into smaller steps' },
      { id: 'ct-patterns', label: 'Recognises patterns' },
      { id: 'ct-abstract', label: 'Focuses on what matters (abstraction)' },
      { id: 'ct-algorithm', label: 'Designs a step-by-step algorithm' },
    ],
  },
  {
    id: 'prog', title: 'Programming & Coding', color: '#2563EB', items: [
      { id: 'prog-sequence', label: 'Sequences instructions in the right order' },
      { id: 'prog-loops', label: 'Uses loops (repetition)' },
      { id: 'prog-conditionals', label: 'Uses conditionals (if / else)' },
      { id: 'prog-variables', label: 'Uses variables and data' },
      { id: 'prog-events', label: 'Uses events and functions' },
      { id: 'prog-debug', label: 'Tests and debugs (finds & fixes errors)' },
    ],
  },
  {
    id: 'robo', title: 'Robotics & Physical Computing', color: '#DC2626', items: [
      { id: 'robo-build', label: 'Builds or assembles a model / robot' },
      { id: 'robo-motors', label: 'Controls motors and movement' },
      { id: 'robo-sensors', label: 'Reads and reacts to sensors' },
      { id: 'robo-task', label: 'Programs a robot to complete a task' },
    ],
  },
  {
    id: 'data', title: 'Data & Information', color: '#0D9488', items: [
      { id: 'data-collect', label: 'Collects or inputs data' },
      { id: 'data-interpret', label: 'Represents or interprets data' },
    ],
  },
  {
    id: 'design', title: 'Digital Creativity & Design', color: '#F59E0B', items: [
      { id: 'design-create', label: 'Designs a digital / creative project' },
      { id: 'design-iterate', label: 'Improves a project through iteration' },
    ],
  },
  {
    id: 'citizen', title: 'Digital Citizenship & Communication', color: '#16A34A', items: [
      { id: 'citizen-collab', label: 'Works with others and shares ideas' },
      { id: 'citizen-safe', label: 'Uses technology safely and responsibly' },
      { id: 'citizen-present', label: 'Presents or explains their work' },
    ],
  },
];

/** Look up a competency's label + strand by its id (for reports/badges). */
export const ICT_BY_ID: Record<string, { label: string; strand: string }> = Object.fromEntries(
  ICT_STRANDS.flatMap(s => s.items.map(i => [i.id, { label: i.label, strand: s.title }])),
);
