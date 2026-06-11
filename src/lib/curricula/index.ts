// ════════════════════════════════════════════════════════════════
//  Curriculum registry — single source of truth for all courses
//  and lesson detail pages. Add new curricula here and they appear
//  across the lesson library, program pages, and lesson template.
// ════════════════════════════════════════════════════════════════
import type { Course, LessonDetail } from '@/types';
import { SCRATCH_JR_COURSE, SCRATCH_JR_LESSONS_MAP } from './scratch-jr';
import { ESM_COURSE, ESM_LESSONS } from './early-simple-machines';
import {
  MBOT2_COURSE,
  MBOT2_LESSON_1, MBOT2_LESSON_2, MBOT2_LESSON_3, MBOT2_LESSON_4,
  MBOT2_LESSON_5, MBOT2_LESSON_6, MBOT2_LESSON_7, MBOT2_LESSON_8,
  MBOT2_LESSON_9, MBOT2_LESSON_10, MBOT2_LESSON_11, MBOT2_LESSON_12,
  MBOT2_LESSON_13, MBOT2_LESSON_14,
} from './mbot2';

/** Every fully-detailed lesson, keyed by lesson id. */
export const ALL_LESSONS: Record<string, LessonDetail> = {
  ...SCRATCH_JR_LESSONS_MAP,
  ...Object.fromEntries(ESM_LESSONS.map(l => [l.id, l])),
  [MBOT2_LESSON_1.id]: MBOT2_LESSON_1,
  [MBOT2_LESSON_2.id]: MBOT2_LESSON_2,
  [MBOT2_LESSON_3.id]: MBOT2_LESSON_3,
  [MBOT2_LESSON_4.id]: MBOT2_LESSON_4,
  [MBOT2_LESSON_5.id]: MBOT2_LESSON_5,
  [MBOT2_LESSON_6.id]: MBOT2_LESSON_6,
  [MBOT2_LESSON_7.id]: MBOT2_LESSON_7,
  [MBOT2_LESSON_8.id]: MBOT2_LESSON_8,
  [MBOT2_LESSON_9.id]: MBOT2_LESSON_9,
  [MBOT2_LESSON_10.id]: MBOT2_LESSON_10,
  [MBOT2_LESSON_11.id]: MBOT2_LESSON_11,
  [MBOT2_LESSON_12.id]: MBOT2_LESSON_12,
  [MBOT2_LESSON_13.id]: MBOT2_LESSON_13,
  [MBOT2_LESSON_14.id]: MBOT2_LESSON_14,
};

/** Every course, keyed by its program slug. */
export const COURSES_BY_PROGRAM: Record<string, Course> = {
  [SCRATCH_JR_COURSE.programSlug]: SCRATCH_JR_COURSE,
  [MBOT2_COURSE.programSlug]: MBOT2_COURSE,
  [ESM_COURSE.programSlug]: ESM_COURSE,
};

/** All courses as a list (for the lesson library, etc.). */
export const ALL_COURSES: Course[] = [ESM_COURSE, SCRATCH_JR_COURSE, MBOT2_COURSE];

export function getLessonById(id: string): LessonDetail | undefined {
  return ALL_LESSONS[id];
}

export function getCourseByProgramSlug(slug: string): Course | undefined {
  return COURSES_BY_PROGRAM[slug];
}

/** Lesson ids that currently have a full interactive detail page. */
export const AVAILABLE_LESSON_IDS = Object.keys(ALL_LESSONS);
