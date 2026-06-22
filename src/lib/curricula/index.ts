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
import { TINKERCAD_COURSE, TINKERCAD_LESSONS } from './tinkercad';
import { MICROBIT_COURSE, MICROBIT_LESSONS } from './microbit';
import { MICROBIT_UNIT_LESSONS } from './microbit-units';
import { MBOT2_P2_LESSONS } from './mbot2-part2';
import { SCHOOL_CHAPTER_LESSONS, SMALLBASIC_COURSE, SMALLBASIC_LESSONS } from './school-chapters';
import { PYTHON_COURSE, PYTHON_LESSONS } from './python';
import { SPIKE_COURSE, SPIKE_LESSONS } from './spike-prime';
import { MICROBIT_EXTRA_LESSONS, MICROBIT_CREATEAI_LESSONS, ELECTRONICS_COURSE, ELECTRONICS_LESSONS, AI_ML_COURSE, PYTHON_PLAY_LESSONS, GAMEDESIGN_PLAY_LESSONS } from './external-resources';
import { MAKEY_COURSE, MAKEY_LESSONS } from './makey-makey';
import { TELLO_COURSE, TELLO_LESSONS } from './tello';
import { GAME_DESIGN_COURSE, GAME_DESIGN_LESSONS } from './game-design';
import { VR_COURSE, VR_LESSONS } from './vr';
import { PRINTING_3D_COURSE, PRINTING_3D_LESSONS } from './printing-3d';
import { SCRATCH_COURSE, SCRATCH_LESSONS } from './scratch';
import { WEBDEV_COURSE, WEBDEV_LESSONS } from './webdev';
import { PHP_COURSE, PHP_LESSONS } from './php-mysql';
import { PROJECTS_COURSE, PROJECTS_LESSONS } from './projects';
import { MAKEX_COURSE, MAKEX_LESSONS, COMPETITION_COURSE, COMPETITION_LESSONS } from './competition';
import { INVENTION_COURSE, INVENTION_LESSONS } from './invention';
import { MTINY_COURSE, MTINY_LESSON } from './mtiny';
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
  ...Object.fromEntries(TINKERCAD_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(MICROBIT_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(MICROBIT_UNIT_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(MBOT2_P2_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(SCHOOL_CHAPTER_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(PYTHON_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(PYTHON_PLAY_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(GAMEDESIGN_PLAY_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(SPIKE_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(MICROBIT_EXTRA_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(MICROBIT_CREATEAI_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(ELECTRONICS_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(MAKEY_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(TELLO_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(GAME_DESIGN_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(VR_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(PRINTING_3D_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(SCRATCH_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(WEBDEV_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(PHP_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(PROJECTS_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(MAKEX_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(COMPETITION_LESSONS.map(l => [l.id, l])),
  ...Object.fromEntries(INVENTION_LESSONS.map(l => [l.id, l])),
  [MTINY_LESSON.id]: MTINY_LESSON,
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
  [TINKERCAD_COURSE.programSlug]: TINKERCAD_COURSE,
  [MICROBIT_COURSE.programSlug]: MICROBIT_COURSE,
  [MTINY_COURSE.programSlug]: MTINY_COURSE,
  [SMALLBASIC_COURSE.programSlug]: SMALLBASIC_COURSE,
  [PYTHON_COURSE.programSlug]: PYTHON_COURSE,
  [SPIKE_COURSE.programSlug]: SPIKE_COURSE,
  [ELECTRONICS_COURSE.programSlug]: ELECTRONICS_COURSE,
  [AI_ML_COURSE.programSlug]: AI_ML_COURSE,
  [MAKEY_COURSE.programSlug]: MAKEY_COURSE,
  [TELLO_COURSE.programSlug]: TELLO_COURSE,
  [GAME_DESIGN_COURSE.programSlug]: GAME_DESIGN_COURSE,
  [VR_COURSE.programSlug]: VR_COURSE,
  [PRINTING_3D_COURSE.programSlug]: PRINTING_3D_COURSE,
  [SCRATCH_COURSE.programSlug]: SCRATCH_COURSE,
  [WEBDEV_COURSE.programSlug]: WEBDEV_COURSE,
  [PHP_COURSE.programSlug]: PHP_COURSE,
  [PROJECTS_COURSE.programSlug]: PROJECTS_COURSE,
  [MAKEX_COURSE.programSlug]: MAKEX_COURSE,
  [COMPETITION_COURSE.programSlug]: COMPETITION_COURSE,
  [INVENTION_COURSE.programSlug]: INVENTION_COURSE,
};

/** All courses as a list (for the lesson library, etc.). */
export const ALL_COURSES: Course[] = [ESM_COURSE, WEDO_COURSE, SCRATCH_JR_COURSE, CODEY_COURSE, MBOT2_COURSE, EV3_COURSE, ARDUINO_COURSE, TINKERCAD_COURSE, MICROBIT_COURSE, MTINY_COURSE, SMALLBASIC_COURSE, PYTHON_COURSE, SPIKE_COURSE, ELECTRONICS_COURSE, AI_ML_COURSE, MAKEY_COURSE, TELLO_COURSE, GAME_DESIGN_COURSE, VR_COURSE, PRINTING_3D_COURSE, SCRATCH_COURSE, WEBDEV_COURSE, PHP_COURSE, PROJECTS_COURSE, MAKEX_COURSE, COMPETITION_COURSE, INVENTION_COURSE];

export function getLessonById(id: string): LessonDetail | undefined {
  return ALL_LESSONS[id];
}

export function getCourseByProgramSlug(slug: string): Course | undefined {
  return COURSES_BY_PROGRAM[slug];
}

/** Lesson ids that currently have a full interactive detail page. */
export const AVAILABLE_LESSON_IDS = Object.keys(ALL_LESSONS);
