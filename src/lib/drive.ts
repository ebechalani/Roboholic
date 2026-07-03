// The academy's shared Google Drive folder (shared "Anyone with the link — Viewer").
// Coaches/admins use it to open & download any lesson file that isn't individually
// mapped in curricula/drive-links.ts. Kept in its own tiny module so pages that only
// need the folder link don't bundle the whole per-file map.
export const ACADEMY_DRIVE_FOLDER: string =
  'https://drive.google.com/drive/folders/1Xr_r4l_sC3cJ0lM7O5zxlMQOS6xGA55j';

// Per-program subfolders inside the shared academy Drive (programSlug → folder).
// Used as the fallback for a resource with no exact file link, so coaches land
// in the right folder instead of the Drive root.
const F = (id: string) => `https://drive.google.com/drive/folders/${id}`;
export const PROGRAM_DRIVE_FOLDERS: Record<string, string> = {
  'mbot2': F('19B5FzPMcFbWfzlfhjOpdr5dLO-_hCsyH'),          // Mbot2 Activites Part 1
  'microbit': F('1gZLPyhmKltYm1fnW4rJ6QXCHRIvRfPdd'),       // MicroBit
  'codey-rocky': F('1fGmkw4oQJ2tlSHOhzYOyPXkLOzIGyss3'),    // CodeyRockey
  'wedo': F('1hD6ZwLoOOn2fJ7zeTpIUQ8p2ex5CHnU8'),           // WeDo2.0
  'ev3': F('1H4B7p_TdvDiv8bwipiSdlkZKU6lQHjh3'),            // Robotic Lessons (Levels I–IV)
  'mtiny': F('1FZbKFQXxA5yHQ2V_41dTq81ADiZPB9HE'),          // mTiny activities
  'scratch-jr': F('1RobhFz3RpCh7VAMLfYi_V-4VKZ9LeTrM'),     // ScratchJR
  'arduino': F('14xyHNpoYY-QOAQ-CAaJr2pVTnqQM5oFk'),        // arduino RoboHolic
  '3d-modeling': F('1BS0GCOxwscUw4XmcCmab-qK0mVYEwQmF'),    // Summer Camp 2025/9-12 yo/3d
  'python': F('13UjaVGRwq0CvpmOgVCHXl0S2IlR2U5s-'),         // Python Livres
};
