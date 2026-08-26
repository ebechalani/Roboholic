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

/** Account approval status. Coaches start 'pending' until the admin approves. */
export type AccountStatus = 'pending' | 'approved' | 'rejected';

/** Firestore profile document stored at users/{uid}. */
export interface Profile {
  uid: string;
  full_name: string;
  email: string;
  role: UserRole;
  status?: AccountStatus;     // missing on legacy accounts = approved
  avatar_url?: string;
  age_group?: AgeGroupId | null;
  is_active?: boolean;
  created_at?: string;
  // Student accounts created by a coach:
  classId?: string;
  classCode?: string;
  username?: string;
  // Confidentiality / acceptable-use agreement:
  termsAcceptedAt?: string;
  termsVersion?: number;
  // If true, this user is exempt from the lesson watermark / copy-lock.
  // (Admins are always exempt.)
  watermarkExempt?: boolean;
}

/** A coach's class (Firestore: classes/{id}). */
export interface ClassDoc {
  id: string;
  name: string;
  coachId: string;
  coachName?: string;
  code: string;               // e.g. "RH-K7M2P" — students use this to log in
  lessonIds: string[];        // assigned lesson ids (= plan flattened, for access)
  plan?: string[][];          // the day-by-day plan: one array of lesson ids per day (in-app shape)
  planJson?: string;          // storage shape: JSON.stringify(plan) — Firestore forbids nested arrays
  createdAt: string;
}

/** A student roster entry (Firestore: classes/{id}/students/{uid}). */
export interface ClassStudent {
  uid: string;
  displayName: string;
  username: string;           // e.g. "sami42"
  pin?: string;               // legacy; logins now use class code + username only
  createdAt: string;
  // Per-student progress. The coach ticks LESSONS the student completed;
  // ICT competencies are derived automatically (see mapSkillsToIct).
  // lessonsDone: key = lessonId, value = ISO date the lesson was completed.
  lessonsDone?: Record<string, string>;
  competencies?: Record<string, string>;   // legacy (direct competency ticks); no longer written
  lastReportAt?: string;      // ISO of the last parent report generated for this student
  // Optional parent contact, used to send the generated progress report.
  parentName?: string;
  parentPhone?: string;       // for the WhatsApp link
  parentEmail?: string;       // for the mailto link
  // Parent confirmation page (/welcome):
  dob?: string;               // child's date of birth, entered by the parent
  confirmedAt?: string;       // ISO when the parent confirmed registration
  // Which weekdays the child attends (1=Mon … 5=Fri). The admin sets this;
  // a student only appears in the coach's roll call on their days.
  // Unset / empty = attends every camp day (Mon–Fri).
  attendDays?: number[];
  // Camp fee tracking, admin-only. Key = month ('2026-07', '2026-08').
  payments?: Record<string, StudentPayment>;
}

/** One month's camp fee for a student (the amount to collect + how it was paid). */
export interface StudentPayment {
  amount?: number;            // fee to collect this month (also counts as collected once paid)
  method?: 'whish' | 'cash';  // set when actually paid; absent = amount entered but not yet paid
  at?: string;                // ISO date the payment was recorded
  note?: string;
}

/** A parent's enrollment request for the 2026–2027 school-year classes.
 *  Created by the public /enroll form (via the Admin-SDK API route);
 *  Firestore: registrations/{id}, readable/updatable by the admin only. */
export interface Registration {
  id: string;
  childName: string;
  dob?: string;
  ageGroup?: string;          // '4-5' | '6-7' | '8-9' | '10-12' | '13-15' | ''
  parentName: string;
  parentPhone: string;
  parentEmail?: string;
  // Which activity they registered for (tab on the public form).
  // Missing on early submissions = robotics.
  activity?: 'robotics' | 'drawing' | 'muaythai';
  // Branch + chosen class time (see src/lib/enrollment.ts)
  branch?: string;            // 'jdeideh' | 'beit-chabeb'
  slotId?: string;            // chosen weekly class slot
  slotLabel?: string;         // human label, stored so it survives schedule edits
  otherDay?: string;          // parent's requested alternative day/time
  // MakeX competition squad (a different day from the class)
  makex?: boolean;
  makexSlotId?: string;
  makexSlotLabel?: string;
  // Chess club (a separate class from robotics & coding)
  chess?: boolean;
  chessSlotId?: string;
  chessSlotLabel?: string;
  // Muay Thai (a separate class from robotics & coding)
  muayThai?: boolean;
  muayThaiSlotId?: string;
  muayThaiSlotLabel?: string;
  schedule?: string;          // legacy free-text preference (older submissions)
  notes?: string;
  status: 'new' | 'contacted' | 'enrolled' | 'archived';
  createdAt: string;
}

/** An academy expense (admin-only bookkeeping). Firestore: expenses/{id}. */
export interface Expense {
  id: string;
  label: string;
  amount: number;
  month?: string;             // optional '2026-07' tag
  at: string;                 // ISO recorded
}

// ─── Attendance / roll call ─────────────────────────────────────
export type AttendanceStatus = 'present' | 'absent' | 'late';

/** One day's roll call (Firestore: classes/{id}/attendance/{YYYY-MM-DD}). */
export interface AttendanceDoc {
  date: string;                               // YYYY-MM-DD
  marks: Record<string, AttendanceStatus>;    // student uid → status
  takenBy?: string;                           // coach/admin uid who took it
  takenAt?: string;                           // ISO of the last change
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
  heroImage?: string;          // illustrative image shown in the lesson header
  youtubeId?: string;          // if set, an embedded YouTube player is shown in the lesson header
  boards?: { fen: string; caption?: string }[];  // chess board diagrams (rendered from FEN) shown in an "On the Board" panel
  walkthrough?: WalkStep[];    // step-by-step coach teaching guide (paired with the lesson's pages)
  quiz?: QuizQuestion[];       // optional interactive quiz shown in the Interactive Exercises panel
  /** Starter code for the in-lesson code playground. lang picks the runner. */
  playground?: { lang: 'html' | 'python'; starter: string };
  /** Extra interactive activities (fill-in, match, predict-output, embedded tools…). */
  interactions?: LessonInteraction[];
}

/** One step of a step-by-step coach teaching walkthrough. */
export interface WalkStep {
  page?: number;   // which lesson page image to show (p-0N.png); omit to show no image
  title?: string;  // short step label
  say: string;     // what the coach explains/shows
  ask?: string;    // a question to ask the class
  doThis?: string; // a hands-on action to do
}

/** An interactive multiple-choice / true-false question shown in a lesson. */
export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;       // index of the correct option
  explanation?: string;      // shown after answering
}

/** A rich interactive activity rendered in the lesson's Interactive Exercises panel. */
export type LessonInteraction =
  | { kind: 'quiz'; title?: string; questions: QuizQuestion[] }
  | { kind: 'playground'; title?: string; lang: 'html' | 'python'; starter: string }
  | { kind: 'fill'; title?: string; intro?: string; text: string; answers: string[] }   // use ___ in text for each blank
  | { kind: 'match'; title?: string; pairs: { left: string; right: string }[] }
  | { kind: 'predict'; title?: string; code: string; question: string; options: string[]; answerIndex: number; explanation?: string }
  | { kind: 'embed'; title?: string; url: string; note?: string; height?: number };

export interface LessonImage {
  src: string;
  caption?: string;
  /** 'block' = coding block / screenshot (white bg, contained); 'photo' = full-bleed image. */
  kind?: 'block' | 'photo';
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
  images?: LessonImage[];      // figures shown inside the section
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
