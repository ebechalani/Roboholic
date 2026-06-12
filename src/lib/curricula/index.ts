// ════════════════════════════════════════════════════════════════
//  Curriculum registry — single source of truth for all courses
//  and lesson detail pages. Add new curricula here and they appear
//  across the lesson library, program pages, and lesson template.
// ════════════════════════════════════════════════════════════════
import type { Course, LessonDetail } from '@/types';
import { SCRATCH_JR_COURSE, SCRATCH_JR_LESSONS_MAP } from './scratch-jr';
import { SCRATCHJR_VIDEO_LESSONS } from './scratch-jr-videos';
import { ESM_COURSE, ESM_LESSONS } from './early-simple-machines';
import { CODEY_COURSE, CODEY_LESSONS } from './codey-rocky';
import { WEDO_COURSE, WEDO_LESSONS } from './wedo';
import { EV3_COURSE, EV3_LESSONS } from './ev3';
import { ARDUINO_COURSE, ARDUINO_LESSONS } from './arduino';
import { CYBERPI_LESSONS } from './cyberpi-basics';
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
  ...Object.fromEntries(SCRATCHJR_VIDEO_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(ESM_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(CODEY_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(WEDO_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(EV3_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(ARDUINO_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(CYBERPI_LESSONS.map(l => [l.id, l])),
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
  [CODEY_COURSE.programSlug]: CODEY_COURSE,
  [WEDO_COURSE.programSlug]: WEDO_COURSE,
  [EV3_COURSE.programSlug]: EV3_COURSE,
  [ARDUINO_COURSE.programSlug]: ARDUINO_COURSE,
};

/** All courses as a list (for the lesson library, etc.). */
export const ALL_COURSES: Course[] = [ESM_COURSE, WEDO_COURSE, SCRATCH_JR_COURSE, CODEY_COURSE, MBOT2_COURSE, EV3_COURSE, ARDUINO_COURSE];

export function getLessonById(id: string): LessonDetail | undefined {
  return ALL_LESSONS[id];
}

export function getCourseByProgramSlug(slug: string): Course | undefined {
  return COURSES_BY_PROGRAM[slug];
}

/** Lesson ids that currently have a full interactive detail page. */
export const AVAILABLE_LESSON_IDS = Object.keys(ALL_LESSONS);
