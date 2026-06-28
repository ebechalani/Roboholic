// Pure parent-report composer — shared by the coach UI and the daily cron.
// A "competency" is a lesson skill; key is `${lessonId}::${skill}`.
import { ALL_LESSONS } from '@/lib/curricula';

const KEY = (lessonId: string, skill: string) => `${lessonId}::${skill}`;

export interface ComposedReport { text: string; subject: string; count: number; }

export function composeReport(
  student: { displayName: string; lastReportAt?: string },
  scope: 'new' | 'all',
  competencies: Record<string, string>,
  lessonIds: string[],
  coachName: string,
): ComposedReport {
  const since = scope === 'all' ? '' : (student.lastReportAt ?? '');
  const first = student.displayName.split(/\s+/)[0];
  const groups: Record<string, string[]> = {};
  for (const id of lessonIds) {
    const l = ALL_LESSONS[id];
    if (!l || !l.skills?.length) continue;
    for (const sk of l.skills) {
      const at = competencies[KEY(id, sk)];
      if (at && at > since) (groups[l.programTitle] ??= []).push(`${sk} — ${l.title}`);
    }
  }
  const lines: string[] = [];
  for (const [program, items] of Object.entries(groups)) {
    lines.push(`*${program}*`);
    for (const it of items) lines.push(`• ${it}`);
    lines.push('');
  }
  const total = Object.values(groups).reduce((n, a) => n + a.length, 0);
  const today = new Date().toLocaleDateString();
  const emptyText = scope === 'all'
    ? `Hi! ${first} hasn't logged any mastered skills yet — we'll share progress soon. — Coach ${coachName}, RoboHolic Robotics Academy`
    : `Hi! No new skills to report for ${first} since the last update — we'll share progress again soon. — Coach ${coachName}, RoboHolic Robotics Academy`;
  const intro = scope === 'all'
    ? `Here is everything ${first} has accomplished at camp so far (${total} skill${total === 1 ? '' : 's'}):`
    : `Since our last update, ${first} has mastered ${total} new skill${total === 1 ? '' : 's'}:`;
  const text = total === 0 ? emptyText
    : `🎉 RoboHolic Robotics Academy — progress update for ${student.displayName} (${today})\n\n${intro}\n\n${lines.join('\n').trim()}\n\nWell done, ${first}! 👏\n— Coach ${coachName}`;
  return { text, subject: `${student.displayName} — RoboHolic progress update`, count: total };
}
