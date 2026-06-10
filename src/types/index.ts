// ─── User & Auth ────────────────────────────────────────────────
export type UserRole = 'admin' | 'coach' | 'student';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl?: string;
  ageGroup?: AgeGroupId;
  groupId?: string;
}

// ─── Curriculum taxonomy ─────────────────────────────────────────
export type AgeGroupId = '4-5' | '6-7' | '8-9' | '10-12' | '13-15';
export type Level = 'Beginner' | 'Intermediate' | 'Advanced';
export type Difficulty = 1 | 2 | 3 | 4 | 5;

export type ProgramCategory =
  | 'robotics'
  | 'coding'
  | 'electronics'
  | 'design'
  | 'advanced'
  | 'competition'
  | 'projects';

export interface AgeGroup {
  id: AgeGroupId;
  label: string;
  emoji: string;
  description: string;
}

export interface Program {
  id: string;
  slug: string;
  title: string;
  shortTitle?: string;
  description: string;
  icon: string;
  color: string;          // hex, used for border/accent
  bgColor: string;        // hex, used for card background tint
  textColor: string;      // hex, foreground on bgColor
  category: ProgramCategory;
  ageGroups: AgeGroupId[];
  levels: Level[];
  courseCount?: number;
  lessonCount?: number;
  tags?: string[];
}

export interface Course {
  id: string;
  slug: string;
  title: string;
  programId: string;
  programSlug: string;
  ageGroup: AgeGroupId;
  level: Level;
  description: string;
  objectives: string[];
  duration: string;        // e.g. "8 sessions × 45 min"
  totalHours: number;
  lessonCount: number;
  prerequisites?: string[];
  skills: string[];
  thumbnail?: string;
  modules: Module[];
}

export interface Module {
  id: string;
  title: string;
  description: string;
  order: number;
  lessons: LessonSummary[];
}

export interface LessonSummary {
  id: string;
  title: string;
  duration: string;
  difficulty: Difficulty;
  skills: string[];
  order: number;
  isCompleted?: boolean;
}

// ─── Full Lesson ─────────────────────────────────────────────────
export interface LessonDetail {
  id: string;
  slug: string;
  title: string;
  programId: string;
  programSlug: string;
  programTitle: string;
  programColor: string;
  courseId: string;
  courseTitle: string;
  moduleId: string;
  moduleTitle: string;
  ageGroup: AgeGroupId;
  level: Level;
  duration: string;
  difficulty: Difficulty;
  skills: string[];
  materials: Material[];
  objectives: string[];
  sections: LessonSection[];
  resources: Resource[];
  assessmentChecklist: string[];
}

export interface Material {
  item: string;
  quantity?: string;
  isOptional?: boolean;
}

export type LessonSectionType =
  | 'coach_prep'
  | 'coach_steps'
  | 'student_steps'
  | 'activity'
  | 'challenge'
  | 'extra_challenge'
  | 'troubleshooting'
  | 'assessment'
  | 'homework'
  | 'coach_notes';

export interface LessonSection {
  type: LessonSectionType;
  title: string;
  emoji?: string;
  content: string | string[] | StepItem[] | TroubleshootItem[];
  isCoachOnly?: boolean;
  studentTitle?: string;       // alternate title shown in student mode
  studentContent?: string | string[];
}

export interface StepItem {
  step: number;
  instruction: string;
  tip?: string;
  coachNote?: string;
  image?: string;
}

export interface TroubleshootItem {
  problem: string;
  cause: string;
  solution: string;
}

// ─── Resources ───────────────────────────────────────────────────
export type ResourceType = 'pdf' | 'video' | 'image' | 'code' | 'worksheet' | 'link' | 'slides';
export type ResourceAudience = 'coach' | 'student' | 'both';

export interface Resource {
  id: string;
  title: string;
  type: ResourceType;
  audience: ResourceAudience;
  url: string;
  size?: string;
  description?: string;
  needsReview?: boolean;
}

// ─── Badges & Progress ───────────────────────────────────────────
export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  color: string;
  category: 'progress' | 'skill' | 'achievement' | 'competition';
  earned?: boolean;
  earnedDate?: string;
}

export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface StudentProgress {
  lessonId: string;
  status: ProgressStatus;
  quizScore?: number;
  completedAt?: string;
  timeSpent?: number;
}

// ─── Dashboard ───────────────────────────────────────────────────
export interface ScheduledLesson {
  id: string;
  title: string;
  programTitle: string;
  programColor: string;
  group: string;
  time: string;
  duration: string;
  ageGroup: AgeGroupId;
  lessonId: string;
}

export interface CoachDashboardData {
  coachName: string;
  todayLessons: ScheduledLesson[];
  recentLessons: (LessonSummary & { programTitle: string; programColor: string; completedDate: string })[];
  stats: {
    totalStudents: number;
    completedThisWeek: number;
    totalLessons: number;
    completedLessons: number;
  };
  groups: Group[];
}

export interface Group {
  id: string;
  name: string;
  ageGroup: AgeGroupId;
  studentCount: number;
  currentCourse: string;
  schedule: string;
}

export interface StudentDashboardData {
  studentName: string;
  currentProgram: string;
  currentProgramColor: string;
  nextLesson: { id: string; title: string; duration: string };
  progress: number;
  badges: Badge[];
  recentActivity: { lessonTitle: string; date: string; score?: number }[];
  missionPoints: number;
}
