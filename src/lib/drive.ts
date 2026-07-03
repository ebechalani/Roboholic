// The academy's shared Google Drive folder (shared "Anyone with the link — Viewer").
// Coaches/admins use it to open & download any lesson file that isn't individually
// mapped in curricula/drive-links.ts. Kept in its own tiny module so pages that only
// need the folder link don't bundle the whole per-file map.
export const ACADEMY_DRIVE_FOLDER: string =
  'https://drive.google.com/drive/folders/1Xr_r4l_sC3cJ0lM7O5zxlMQOS6xGA55j';
