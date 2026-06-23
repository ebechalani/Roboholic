import type { Course, LessonDetail, LessonSection, LessonImage, Module, Difficulty, AgeGroupId, LessonInteraction, QuizQuestion, WalkStep } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Chess — the official ChessKid.com Curriculum (IM Daniel Rensch),
//  20 lessons in 5 sections. The real curriculum pages are rendered
//  as each lesson's deck (so it's visual, not textual); on top we add
//  a board diagram (FEN→SVG), a quiz, order-the-steps, a live Lichess
//  practice board (embedded), and per-lesson "open this section" links
//  for BOTH ChessKid.com and Lichess. Teach straight from the screen.
// ════════════════════════════════════════════════════════════════

const SECTIONS: Record<number, { title: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; age: AgeGroupId }> = {
  1: { title: 'Section 1 · Starting Out — The Basics of Chess', level: 'Beginner', age: '8-9' },
  2: { title: 'Section 2 · Playing, the Phases & the Opening', level: 'Beginner', age: '8-9' },
  3: { title: 'Section 3 · Tactics, Tactics & More Tactics', level: 'Intermediate', age: '10-12' },
  4: { title: 'Section 4 · Endgame Play — Pawns, Technique & King Play', level: 'Intermediate', age: '10-12' },
  5: { title: 'Section 5 · Positional Chess & Advanced Play', level: 'Advanced', age: '13-15' },
};
const PDF = (n: number) => `/lessons/ChessKid_Curriculum/Non_CCSS_Aligned_Curriculum/Lesson%20${n}.pdf`;

// ─── "Practise online" links ─────────────────────────────────────
// Each lesson points to BOTH sites and the exact section to open:
//  • ChessKid.com — the matching part of the curriculum's own site
//    (opens in a new tab; ChessKid needs a kid account & blocks embedding).
//  • Lichess — free, no-account; also the board embedded inside the lesson.
type SiteLink = { label: string; url: string; note: string };
const CK_LESSONS = 'https://www.chesskid.com/learn/lessons';
const CK_PUZZLES = 'https://www.chesskid.com/puzzles';
const CK_PLAY = 'https://www.chesskid.com/play';
const CK_VIDEOS = 'https://www.chesskid.com/learn/videos';
const LI_LEARN = 'https://lichess.org/learn';
const LI_PRACTICE = 'https://lichess.org/practice';
const LI_PLAY = 'https://lichess.org/';
const LI_PUZZLE = (theme: string) => `https://lichess.org/training/${theme}`;

// Lichess practice embeds (click-to-load; open-in-new-tab fallback if framing is blocked).
const LEARN: LessonInteraction = { kind: 'embed', title: '♟️ Practice (Lichess Learn)', url: 'https://lichess.org/learn', height: 520, note: 'Interactive board — move the pieces yourself.' };
const PUZZLES: LessonInteraction = { kind: 'embed', title: '🧩 Tactics Puzzles', url: 'https://lichess.org/training', height: 520, note: 'Train pattern recognition with puzzles.' };
const PRACTICE: LessonInteraction = { kind: 'embed', title: '♟️ Guided Practice', url: 'https://lichess.org/practice', height: 520, note: 'Guided checkmate & endgame positions.' };
const PLAY: LessonInteraction = { kind: 'embed', title: '♟️ Play a Game', url: 'https://lichess.org/', height: 520, note: 'Play vs the computer or a friend.' };

// Per-lesson "open this section" map for BOTH sites.
const SITE_LINKS: Record<number, { ck: SiteLink; li: SiteLink }> = {
  1:  { ck: { label: 'Learn → Lessons (Pawn & Knight)', url: CK_LESSONS, note: 'On ChessKid open Learn → Lessons and play the Pawn and Knight lessons to match this class.' },
        li: { label: 'Learn (how the pieces move)', url: LI_LEARN, note: 'On Lichess open Learn and do the Pawn, Knight and King chapters.' } },
  2:  { ck: { label: 'Learn → Lessons (Rook, Bishop & Queen)', url: CK_LESSONS, note: 'On ChessKid open Learn → Lessons and play the Rook, Bishop and Queen lessons.' },
        li: { label: 'Learn (the line pieces)', url: LI_LEARN, note: 'On Lichess open Learn and do the Rook, Bishop and Queen chapters.' } },
  3:  { ck: { label: 'Learn → Lessons (King & Checkmate)', url: CK_LESSONS, note: 'On ChessKid open Learn → Lessons (King) for check, checkmate and stalemate.' },
        li: { label: 'Learn (check & checkmate)', url: LI_LEARN, note: 'On Lichess open Learn and do the Check, Checkmate and Stalemate chapters.' } },
  4:  { ck: { label: 'Puzzles (checkmate)', url: CK_PUZZLES, note: 'On ChessKid open Puzzles and choose checkmate puzzles to drill the basic mates.' },
        li: { label: 'Practice → Checkmates', url: LI_PRACTICE, note: 'On Lichess open Practice → Piece Checkmates for the K+Q and K+R mates.' } },
  5:  { ck: { label: 'Learn → Lessons (special moves)', url: CK_LESSONS, note: 'On ChessKid open Learn → Lessons for castling and en passant.' },
        li: { label: 'Learn (castling & en passant)', url: LI_LEARN, note: 'On Lichess open Learn and do the Castling, En passant and Capturing chapters.' } },
  6:  { ck: { label: 'Learn → Videos (planning)', url: CK_VIDEOS, note: 'On ChessKid open Learn → Videos for the phases of a game and simple plans.' },
        li: { label: 'Play a game', url: LI_PLAY, note: 'On Lichess play a full game and name the opening, middlegame and endgame as you go.' } },
  7:  { ck: { label: 'Puzzles (mate in 1–2)', url: CK_PUZZLES, note: 'On ChessKid open Puzzles and pick mate-in-1 / mate-in-2 to spot the quick mates.' },
        li: { label: 'Puzzles → Mate in 2', url: LI_PUZZLE('mateIn2'), note: 'On Lichess open Puzzles → Mate in 2 to drill quick mates (and to guard f2/f7).' } },
  8:  { ck: { label: 'Learn → Lessons (openings)', url: CK_LESSONS, note: 'On ChessKid open Learn → Lessons for opening principles (develop, centre, castle).' },
        li: { label: 'Puzzles → Opening', url: LI_PUZZLE('opening'), note: 'On Lichess open Puzzles → Opening to practise sound development.' } },
  9:  { ck: { label: 'Puzzles → Fork / Double Attack', url: CK_PUZZLES, note: 'On ChessKid open Puzzles → Themes → Fork / Double Attack.' },
        li: { label: 'Puzzles → Fork', url: LI_PUZZLE('fork'), note: 'On Lichess open Puzzles → Fork.' } },
  10: { ck: { label: 'Puzzles → Pin & Skewer', url: CK_PUZZLES, note: 'On ChessKid open Puzzles → Themes → Pin and Skewer.' },
        li: { label: 'Puzzles → Pin', url: LI_PUZZLE('pin'), note: 'On Lichess open Puzzles → Pin (then Skewer).' } },
  11: { ck: { label: 'Puzzles → Discovered Attack', url: CK_PUZZLES, note: 'On ChessKid open Puzzles → Themes → Discovered Attack.' },
        li: { label: 'Puzzles → Discovered Attack', url: LI_PUZZLE('discoveredAttack'), note: 'On Lichess open Puzzles → Discovered Attack (and Double Check).' } },
  12: { ck: { label: 'Puzzles → Deflection', url: CK_PUZZLES, note: 'On ChessKid open Puzzles → Themes → Deflection / Remove the Defender.' },
        li: { label: 'Puzzles → Deflection', url: LI_PUZZLE('deflection'), note: 'On Lichess open Puzzles → Deflection.' } },
  13: { ck: { label: 'Play → vs Bot (practise the mate)', url: CK_PLAY, note: 'On ChessKid open Play → Play vs Bot and practise the King + Rook mate.' },
        li: { label: 'Practice → Checkmates', url: LI_PRACTICE, note: 'On Lichess open Practice → Piece Checkmates for the K+R mate.' } },
  14: { ck: { label: 'Puzzles → Promotion', url: CK_PUZZLES, note: 'On ChessKid open Puzzles → Themes → Promotion / Passed Pawn.' },
        li: { label: 'Puzzles → Advanced Pawn', url: LI_PUZZLE('advancedPawn'), note: 'On Lichess open Puzzles → Advanced Pawn / Promotion.' } },
  15: { ck: { label: 'Play → vs Bot (K+P endings)', url: CK_PLAY, note: 'On ChessKid open Play → Play vs Bot and practise king-and-pawn endings from both sides.' },
        li: { label: 'Practice → Pawn endgames', url: LI_PRACTICE, note: 'On Lichess open Practice → Pawn Endgames (the opposition).' } },
  16: { ck: { label: 'Play → vs Bot (technique)', url: CK_PLAY, note: 'On ChessKid open Play → Play vs Bot and convert a winning position cleanly.' },
        li: { label: 'Practice → Endgames', url: LI_PRACTICE, note: 'On Lichess open Practice → endgame studies (Queen vs Pawn technique).' } },
  17: { ck: { label: 'Learn → Videos (strategy)', url: CK_VIDEOS, note: 'On ChessKid open Learn → Videos for positional ideas (weak pawns, outposts).' },
        li: { label: 'Play a game', url: LI_PLAY, note: 'On Lichess play a game and point out the pawn weaknesses you create or target.' } },
  18: { ck: { label: 'Learn → Videos (pawn play)', url: CK_VIDEOS, note: 'On ChessKid open Learn → Videos on pawn structure and space.' },
        li: { label: 'Play a game', url: LI_PLAY, note: 'On Lichess play a game and try to turn a pawn majority into a passed pawn.' } },
  19: { ck: { label: 'Learn → Videos (piece play)', url: CK_VIDEOS, note: 'On ChessKid open Learn → Videos on good vs bad pieces.' },
        li: { label: 'Play a game', url: LI_PLAY, note: 'On Lichess play a game and each move improve your worst-placed piece.' } },
  20: { ck: { label: 'Play → Slow Chess (full game)', url: CK_PLAY, note: 'On ChessKid open Play → Play Slow Chess for a full tournament-style game.' },
        li: { label: 'Play a game', url: LI_PLAY, note: 'On Lichess play a full game, then use the analysis board to review it.' } },
};

interface CK {
  n: number; title: string; subtitle: string; section: number; pages: number; emoji: string;
  objectives: string[]; teach: string[]; student: string[]; challenge: string; skills: string[];
  practice: LessonInteraction; quiz: QuizQuestion[]; boards?: { fen: string; caption?: string }[];
  walkthrough?: WalkStep[];
}

function gallery(n: number, pages: number): LessonImage[] {
  const a: LessonImage[] = [];
  for (let i = 1; i <= pages; i++) a.push({ src: `/lessons/chess-${n}/p-${String(i).padStart(2, '0')}.png`, kind: 'photo', caption: `Page ${i}` });
  return a;
}

function makeCK(c: CK): LessonDetail {
  const sec = SECTIONS[c.section];
  const links = SITE_LINKS[c.n];
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Instructor Guide — Before Class', emoji: '🧑‍🏫', isCoachOnly: true,
      content: [
        `ChessKid Lesson ${c.n}: ${c.title}. ${c.subtitle}`,
        'Review the curriculum pages (shown below) first — they contain the diagrams, explanations, mini-games and worksheets for this lesson.',
        'Materials: a chess set + a demonstration board (or screen); optional computers/tablets for live practice on ChessKid.com or Lichess.',
        `Online practice for this lesson — ChessKid: ${links.ck.label}; Lichess: ${links.li.label}. Both are linked under Resources.`,
        'Designed for ~1 hour. Assign the worksheets in the lesson PDF (Resources) for independent practice.',
      ],
    },
    {
      type: 'coach_steps', title: 'How to Teach It', emoji: '🎓', isCoachOnly: true,
      content: [...c.teach, 'Use the worksheets, mini-games and answer keys in the lesson PDF (Resources).'],
    },
    {
      type: 'activity', title: 'The Lesson', emoji: '♟️',
      content: ['Work through the lesson with your coach — follow the pages below and the board:', ...c.student],
      studentContent: [`🎯 ${c.title}`, ...c.student.map(s => '• ' + s)],
      images: gallery(c.n, c.pages),
    },
    {
      type: 'challenge', title: 'Practice Challenge', emoji: '⭐',
      content: [c.challenge],
      studentContent: [`⭐ ${c.challenge}`],
    },
    {
      type: 'assessment', title: 'Success Criteria', emoji: '✅',
      content: [...c.objectives.map(o => 'Student can ' + o[0].toLowerCase() + o.slice(1)), 'Student completed the lesson and a practice activity.'],
    },
    {
      type: 'coach_notes', title: 'Coach Notes (Private)', emoji: '📝', isCoachOnly: true,
      content: [
        `LESSON ${c.n} · ${sec.title}.`,
        'The pages above are the official ChessKid lesson; printable worksheets, mini-games and answer keys are in the lesson PDF.',
        'SOURCE: ChessKid.com Curriculum by IM Daniel Rensch (used as the academy\'s chess programme).',
      ],
    },
  ];
  return {
    id: `chess-${c.n}`, slug: `chess-${c.n}`, title: c.title,
    programId: 'chess', programSlug: 'chess', programTitle: 'Chess', programColor: '#92400E',
    courseId: 'chess-1', courseTitle: 'Chess — The ChessKid Curriculum',
    moduleId: `chess-s${c.section}`, moduleTitle: sec.title,
    ageGroup: sec.age, level: sec.level, duration: '~60 minutes', difficulty: (c.section <= 1 ? 1 : c.section >= 5 ? 4 : c.section) as Difficulty,
    skills: c.skills,
    materials: [
      { item: 'Chess set & board', quantity: '1 per pair' },
      { item: 'Demonstration board or screen (instructor)', quantity: '1 per class' },
      { item: 'Computer/tablet for ChessKid.com or Lichess', quantity: '1 per pair', isOptional: true },
    ],
    objectives: c.objectives,
    assessmentChecklist: c.objectives,
    sections,
    heroImage: `/lessons/chess-${c.n}/p-01.png`,
    ...(c.boards ? { boards: c.boards } : {}),
    ...(c.walkthrough ? { walkthrough: c.walkthrough } : {}),
    quiz: c.quiz,
    interactions: [c.practice],
    resources: [
      { id: `chess-${c.n}-r1`, title: `Lesson ${c.n} — Full Curriculum & Worksheets (PDF)`, type: 'pdf', audience: 'both', url: PDF(c.n), description: 'The official ChessKid lesson, worksheets & answer keys' },
      { id: `chess-${c.n}-ck`, title: `Practise on ChessKid.com — ${links.ck.label}`, type: 'link', audience: 'both', url: links.ck.url, description: `${links.ck.note} (opens ChessKid.com in a new tab — free account needed)` },
      { id: `chess-${c.n}-li`, title: `Practise on Lichess — ${links.li.label}`, type: 'link', audience: 'both', url: links.li.url, description: `${links.li.note} (free, no account; this is also the board embedded above)` },
    ],
  };
}

const CONFIGS: CK[] = [
  // ─── Section 1 ───
  { n: 1, section: 1, emoji: '♟️', title: 'Meet the Players, Part 1 — King, Knight & Pawn', subtitle: 'The board, basic terms, and how the king, knight and pawn move.', pages: 9,
    objectives: ['Set up the board and use basic terms', 'Move the king, knight and pawn correctly', 'Understand that the pawn captures diagonally'],
    teach: ['Introduce the board, files/ranks and how to record squares.', 'Show the king (one square any way) and the knight (the "L" jump).', 'Show the pawn: forward 1 (or 2 from start), captures diagonally.', 'Play the mini-games "The Farmer and the Piggies" and "Pawn Wars".'],
    student: ['Learn the board and the names of the squares.', 'Practise moving the king and the knight.', 'Play "Pawn Wars" to master the pawn.'],
    challenge: 'Win a game of "Pawn Wars" (get a pawn to the other side) against a partner.', skills: ['Board', 'King & Knight', 'Pawn'],
    practice: LEARN, boards: [{ fen: '8/8/8/3N4/8/8/8/8', caption: 'The knight (d5) jumps in an "L" — the only piece that can jump over others.' }],
    walkthrough: [
      { page: 1, title: 'The King', say: 'The King is the leader of your army — the most important piece, but the slowest. He moves just ONE square at a time, in any direction.', ask: 'What happens if you lose your King?', doThis: 'Put a king in the middle of the demo board and have a volunteer move it to each of the 8 squares around it.' },
      { page: 8, title: 'The Knight', say: 'The Knight moves in an "L": one–two, turn the corner. He is the ONLY piece that can jump over others, and he changes colour every hop.', ask: 'Which piece can jump over other pieces?', doThis: 'Place a knight on d4 and find all the squares it can reach (the stars). Remind them a knight only captures the square it LANDS on — not the pieces it jumps over.' },
      { page: 2, title: 'The Pawn', say: 'The Pawn steps forward one square (or two on its very first move), but it CAPTURES one square diagonally forward. It can never move backward or sideways.', ask: 'Can a pawn capture the piece right in front of it?', doThis: 'Set up a pawn with an enemy piece diagonally in front and make the capture; then show that a piece directly ahead simply blocks the pawn.' },
      { page: 2, title: 'Promotion', say: 'A brave pawn that marches all the way to the far side (rank 8 for White, rank 1 for Black) PROMOTES — it becomes a stronger piece, almost always a Queen.', ask: 'What piece do pawns usually become when they promote?', doThis: 'Race a pawn up an empty file and "queen" it.' },
      { page: 4, title: 'Story: Old MacDonald', say: 'Tell the story: the pawns are piggies that escaped toward the barn (the far rank), and the King is Mr. MacDonald chasing them. Introduce each piece as a farm character to make it stick.', doThis: 'Read the story script aloud, gesturing to the demo board as each character appears.' },
      { page: 3, title: 'Mini-game: Farmer & the Piggies', say: 'The goal: the piggies (pawns) try to reach the 8th rank; the farmer (the lone King) tries to catch them all.', doThis: 'Play Level 1 — your lone King vs 8 pawns — you play the King against the whole class. Let them discover that pawns on opposite sides beat the King.' },
      { page: 6, title: 'Mini-game: Pawn Wars', say: 'Both players get 8 pawns. The first to promote (reach the other side) wins — but watch out for captures along the way!', doThis: 'Pairs play Pawn Wars, then swap colours and play again.' },
      { page: 7, title: 'Practice each piece', say: 'Finish with the King, Knight and Pawn practice pages (the diagrams with stars).', doThis: 'Hand out or project the practice diagrams and have students trace every legal move for each piece.' },
    ],
    quiz: [
      { question: 'The knight moves in the shape of:', options: ['an "L"', 'a straight line', 'a diagonal', 'a circle'], answerIndex: 0 },
      { question: 'A pawn captures:', options: ['one square diagonally forward', 'straight ahead', 'in an L', 'sideways'], answerIndex: 0 },
      { question: 'The king moves:', options: ['one square in any direction', 'like a knight', 'only forward', 'two squares'], answerIndex: 0 },
    ] },
  { n: 2, section: 1, emoji: '♜', title: 'Meet the Players, Part 2 — Rook, Bishop & Queen', subtitle: 'The "line" pieces: rook, bishop and the powerful queen.', pages: 6,
    objectives: ['Move the rook in straight lines', 'Move the bishop on diagonals (one colour)', 'Move the queen (rook + bishop combined)'],
    teach: ['Show the rook sliding along ranks and files.', 'Show the bishop on diagonals — it never changes colour.', 'Show the queen combining both — the most powerful piece.', 'Stress: line pieces cannot jump over other pieces.'],
    student: ['Practise the rook and bishop on an empty board.', 'Find every square a queen can reach.', 'Complete the "moving the rook/bishop/queen" worksheets.'],
    challenge: 'Place a queen on d5 and list all the squares it attacks.', skills: ['Rook', 'Bishop', 'Queen'],
    practice: LEARN, boards: [{ fen: '8/8/8/3Q4/8/8/8/8', caption: 'The queen (d5): straight lines AND diagonals — the most powerful piece.' }],
    walkthrough: [
      { page: 1, title: 'The Rook', say: 'The Rook — the "Tower of Power" — moves as far as it likes in straight lines: up, down, left or right. It cannot jump over pieces.', ask: 'How many squares can a rook on an empty board reach?', doThis: 'Put a rook on d4 and trace its cross (it always covers 14 squares on an empty board).' },
      { page: 1, title: 'The Bishop', say: 'The Bishop moves as far as it likes along diagonals, and ALWAYS stays on its starting colour. Each side has one light-squared and one dark-squared bishop — they work best as a pair.', ask: 'Can a bishop ever land on a different colour square?', doThis: 'Place a bishop and trace its "X"; point out the colour never changes.' },
      { page: 2, title: 'The Queen', say: 'The Queen is the most powerful piece: she moves like a Rook AND a Bishop — straight lines and diagonals, any distance. The only things she cannot do are jump, or move like a Knight.', ask: 'The queen combines which two pieces?', doThis: 'Place a queen on d4 and count every square she attacks.' },
      { page: 4, title: 'Practice the line-pieces', say: 'Finish with the Rook, Bishop and Queen practice pages. Keep reminding students that line-pieces cannot jump over other pieces.', doThis: 'Students trace each piece\'s moves on the practice diagrams (pages 4–6).' },
    ],
    quiz: [
      { question: 'The bishop moves:', options: ['diagonally', 'in straight lines', 'in an L', 'one square'], answerIndex: 0 },
      { question: 'The queen moves like a:', options: ['rook and bishop combined', 'knight', 'pawn', 'king only'], answerIndex: 0 },
      { question: 'A bishop that starts on a light square:', options: ['stays on light squares all game', 'can switch colours', 'can jump', 'moves straight'], answerIndex: 0 },
    ] },
  { n: 3, section: 1, emoji: '👑', title: 'The Aim of a Chess Game — Check, Checkmate & Stalemate', subtitle: 'How to win: check, escaping check, checkmate, and the stalemate draw.', pages: 12,
    objectives: ['Recognise check and the 3 ways to escape it', 'Tell checkmate from stalemate', 'Know the goal is to checkmate the king'],
    teach: ['Show a check; escape it 3 ways: move, block, or capture the attacker.', 'Show checkmate — check with no escape (the goal).', 'Show stalemate — no legal move but NOT in check = a draw.', 'Use worksheets: "Capture the Checker", "Blocking Check", "Is this Checkmate?".'],
    student: ['Practise getting out of check three ways.', 'Decide if positions are checkmate or stalemate.', 'Complete the check/checkmate worksheets.'],
    challenge: 'Set up a check, then change one piece to make it checkmate.', skills: ['Check', 'Checkmate', 'Stalemate'],
    practice: PRACTICE, boards: [
      { fen: 'kR6/8/K7/8/8/8/8/8', caption: 'Checkmate: the rook checks and the king covers every escape square.' },
      { fen: 'k7/8/1Q6/8/8/8/8/7K', caption: 'Stalemate (Black to move): not in check, no legal move → a DRAW.' },
    ],
    walkthrough: [
      { page: 1, title: 'What is "Check"?', say: '"Check" means the enemy King is under attack. (The word comes from the old Persian "Shah" — King!) When your King is in check you MUST get it out of danger right away.', ask: 'In the diagram, which piece is giving check?', doThis: 'Emphasise the big idea: you never actually capture the King — the goal is to trap it.' },
      { page: 2, title: 'Three ways to escape check', say: 'There are exactly three ways out of check: 1) Capture the checking piece, 2) Block it by stepping a piece in the way, or 3) Run the King to a safe square.', ask: 'Can you name all three escapes?', doThis: 'Set up one check on the demo board and solve it all three different ways.' },
      { page: 3, title: 'Checkmate — the goal!', say: 'Checkmate is a check with NO escape — the King cannot capture, block, or run. That is how you WIN the game.', ask: 'What turns an ordinary check into checkmate?', doThis: 'Build a simple check, then add one piece so it becomes checkmate.' },
      { page: 3, title: 'Stalemate — a draw!', say: 'If the player to move has NO legal move but is NOT in check, it is stalemate — the game is a draw. Warn them: never stalemate a game you are winning!', ask: 'No legal move but not in check — is that a win or a draw?' },
      { page: 5, title: 'Worksheet: Check the King', say: 'Students draw arrows showing every way the rook, knight, bishop and queen can check the black King.', doThis: 'Hand out worksheet page 1 (the answer key is on the last two pages of the PDF).' },
      { page: 6, title: 'Worksheet: Capture / Block / Run', say: 'Work through "Capture the Checker", "Blocking Check" and "Running from Check" — one for each escape route.', doThis: 'Students solve pages 6–8, then check their answers against the key.' },
      { page: 9, title: 'Worksheet: Is This Checkmate?', say: 'For each position the King is in check — students decide YES (checkmate) or NO (escape exists).', doThis: 'Students circle each answer, then review together using the answer key.' },
    ],
    quiz: [
      { question: 'Checkmate is when the king is:', options: ['attacked and cannot escape', 'captured', 'in the corner', 'next to a pawn'], answerIndex: 0 },
      { question: 'Which is NOT a way to escape check?', options: ['ignore it', 'move the king', 'block', 'capture the attacker'], answerIndex: 0 },
      { question: 'Stalemate is a:', options: ['draw', 'win', 'loss', 'check'], answerIndex: 0 },
    ] },
  { n: 4, section: 1, emoji: '🎯', title: 'Basic Checkmates & Stalemate', subtitle: 'King + Queen vs King, the two-rook "Roller", and avoiding stalemate.', pages: 10,
    objectives: ['Checkmate with King + Queen vs King', 'Checkmate with two rooks (the "Roller")', 'Avoid accidental stalemate'],
    teach: ['Use the queen to shrink the king\'s box toward the edge — bring your king up to help.', 'Show the two-rook "Roller" (ladder) mate.', 'Warn about stalemate: always leave the king a move until it\'s mate.', 'Drill "checkmate or stalemate?" worksheets.'],
    student: ['Mate a lone king with King + Queen without stalemating.', 'Mate with two rooks using the roller.', 'Spot stalemate traps.'],
    challenge: 'Checkmate a lone king with King + Queen in under 10 moves, no stalemate.', skills: ['K+Q Mate', 'Two-Rook Mate', 'Technique'],
    practice: PRACTICE, boards: [{ fen: '7k/6Q1/6K1/8/8/8/8/8', caption: 'King + Queen mate: the queen mates while the king defends it.' }],
    walkthrough: [
      { page: 1, title: 'King + Queen: the "box"', say: 'Use the Queen to draw an invisible "box" around the lone King, keeping a knight\'s-jump away, and shrink it one square at a time to push the King to the edge.', ask: 'Which part of the board are we pushing the King toward?', doThis: 'From the diagram, play Qd3 and keep shrinking the box, move by move.' },
      { page: 2, title: 'Bring your King & mate', say: 'Once the King is on the edge, STOP shrinking — or you may stalemate! March your own King up to protect the Queen, then deliver checkmate. Golden rule: the only check you give should be checkmate.', ask: 'Why shouldn\'t the Queen keep checking the King early?', doThis: 'Walk the white King up beside the enemy King and play the mating move.' },
      { page: 3, title: 'Two-Rook "Roller" mate', say: 'Two rooks can mate a lone King with NO help from your King. Check with one rook; when the King steps toward it, jump the OTHER rook far across to the next rank ("rolling").', ask: 'Which rook should lead the attack?', doThis: 'Play the rolling checks, always leading with the rook furthest from the King.' },
      { page: 4, title: 'Finish the Roller', say: 'Keep rolling the rooks, one rank at a time, until the King is trapped on the last rank — then deliver the final check. Never let the King catch a rook: jump it to the far side of the board.', doThis: 'Complete the two-rook mate from the diagram.' },
      { page: 5, title: 'Stalemate — the trap to avoid', say: 'Review stalemate: no legal move and NOT in check = a draw. Show how taking the Queen "box" one step too far accidentally causes it.', ask: 'Is stalemate a win or a draw?' },
      { page: 8, title: 'Worksheet: Checkmate or Stalemate?', say: 'For each position students decide: checkmate or stalemate? This cements the difference while it is fresh.', doThis: 'Students circle the answer on pages 8–9, then check the answer key (page 10).' },
      { title: 'Practice the mates', say: 'The mates only stick with repetition.', doThis: 'Pair students up to practise King+Queen and the two-rook mate, alternating attacker and defender 3–5 times — on a board or at lichess.org/practice.' },
    ],
    quiz: [
      { question: 'To mate with K+Q you push the king toward:', options: ['the edge of the board', 'the centre', 'your queen alone', 'a pawn'], answerIndex: 0 },
      { question: 'The biggest danger mating with a queen is:', options: ['accidental stalemate', 'losing the queen', 'running out of board', 'promotion'], answerIndex: 0 },
      { question: 'The two-rook mate is nicknamed the:', options: ['Roller (ladder)', 'Fork', 'Pin', 'Skewer'], answerIndex: 0 },
    ] },
  // ─── Section 2 ───
  { n: 5, section: 2, emoji: '🏰', title: 'How to Win — Counting, Castling & En Passant', subtitle: 'Counting attackers/defenders, the special move (castling), and en passant.', pages: 14,
    objectives: ['Count attackers vs defenders before capturing', 'Castle (and know the rules)', 'Perform an en passant capture'],
    teach: ['Teach "counting": is a capture safe? Count attackers and defenders.', 'Show castling (king 2 toward a rook, rook hops over) and its rules.', 'Show en passant — the special pawn capture.', 'Use the "Is it Defended?", "Who\'s Hanging?" and castling worksheets.'],
    student: ['Practise counting attackers/defenders to win material safely.', 'Castle king-side and queen-side.', 'Capture a pawn en passant.'],
    challenge: 'In a few positions, decide whether a capture wins material by counting.', skills: ['Counting', 'Castling', 'En Passant'],
    practice: PLAY, boards: [{ fen: 'r4rk1/8/8/8/8/8/8/R4RK1', caption: 'After castling (both sides): the king is tucked safely on g1/g8.' }],
    walkthrough: [
      { page: 1, title: 'Counting attackers & defenders', say: 'To capture safely, count how many of your pieces attack a square versus how many defend it. When the captures come out even, that is just a "trade".', ask: 'Before you grab a piece, what two things should you count?', doThis: 'On the example, count the attackers and defenders of the d4 and c6 knights and decide if a capture is safe.' },
      { page: 2, title: 'Hanging (free!) pieces', say: 'A piece with NO defender is "hanging" — you can take it for free. Train students to scan every move for hanging pieces, both theirs and their own.', ask: 'What does it mean when a piece is "hanging"?', doThis: 'Spot the undefended bishop on g5 in the example and take it for free.' },
      { page: 2, title: 'Doggy-piles — count the VALUE', say: 'When many pieces attack and defend one square, imagine everyone capturing in a "doggy-pile" and add up the POINTS. Winning two pawns but losing a knight is more captures — but a bad trade.', ask: 'Is winning two pawns for a knight a good trade?' },
      { page: 2, title: 'Trapped pieces', say: 'A piece that cannot move to safety is "trapped" — attack it and it cannot run away. Great targets to win material.', doThis: 'Show the b3-bishop being trapped by the pawns closing in around it.' },
      { page: 4, title: 'Castling', say: 'Castling is the ONE move where you move two of your own pieces: the king goes two squares toward a rook, and the rook hops to the other side. It tucks the king to safety AND activates a rook in one move. Kingside = 0-0, queenside = 0-0-0.', ask: 'Which two pieces move when you castle?', doThis: 'Castle kingside, then set up and castle queenside on the demo board.' },
      { page: 4, title: 'The 2 castling rules', say: 'You may NOT castle out of, through, or into check; and you may not castle if that king or rook has already moved.', ask: 'Can you castle while your king is in check?' },
      { page: 12, title: 'En Passant (Super Pawns)', say: 'A special pawn capture: right after an enemy pawn jumps two squares and lands beside yours, you may capture it "in passing" as if it had moved only one — but ONLY on the very next move.', ask: 'When is your one and only chance to capture en passant?', doThis: 'Set up the diagram and play the en passant capture.' },
      { page: 6, title: 'Worksheets', say: 'Plenty of practice: Castling Quiz, Is it Defended?, Doggy-Pile Quiz, Who\'s Hanging?, and Can You Capture En Passant?', doThis: 'Students work pages 6–10 and 13; check answers with the keys on pages 11 and 14.' },
    ],
    quiz: [
      { question: 'Before capturing you should:', options: ['count attackers vs defenders', 'always capture', 'castle first', 'move the queen'], answerIndex: 0 },
      { question: 'Castling mainly:', options: ['keeps the king safe', 'wins a pawn', 'promotes', 'gives check'], answerIndex: 0 },
      { question: 'En passant is a special capture by a:', options: ['pawn', 'rook', 'king', 'bishop'], answerIndex: 0 },
    ] },
  { n: 6, section: 2, emoji: '🧭', title: 'Phases of a Game, Planning & Your Opponent', subtitle: 'The three phases (opening/middlegame/endgame), simple planning, and reading your opponent.', pages: 12,
    objectives: ['Name the three phases of a game', 'Make a simple plan', 'Ask "why did my opponent move there?"'],
    teach: ['Explain the 3 phases: opening, middlegame, endgame.', 'Teach simple planning (improve a piece, make a threat, target a weakness).', 'Always ask what the opponent\'s last move threatens.', 'Use "Checks & Captures", "Attack the Queen", "Why did they go there?" worksheets.'],
    student: ['Identify which phase a position is in.', 'After each opponent move, say what it threatens.', 'Make one simple plan in a game.'],
    challenge: 'In a game, write down your opponent\'s threat after each of their moves for 5 moves.', skills: ['Phases', 'Planning', 'Opponent Awareness'],
    practice: PLAY, boards: [{ fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR', caption: 'The opening phase: both sides fight for the centre after 1.e4 e5.' }],
    walkthrough: [
      { page: 1, title: 'The three phases', say: 'Every game has three stages. The Opening: develop your pieces, castle and connect the rooks. The Middlegame: the main battle. The Endgame: few pieces left.', ask: 'Can you name the three phases of a chess game?' },
      { page: 2, title: 'Middlegame & Endgame', say: 'In the Middlegame you have all your pieces out and make plans of attack and defence. In the Endgame, with few pieces left, the game often becomes a race to promote a pawn.', ask: 'Which phase is the "main battle" of the game?' },
      { page: 3, title: 'Think first: CHECKS', say: 'Before every move your #1 priority is to look at ALL your checks — a check might even be checkmate! Missing a check can mean missing a win.', ask: 'Why should you look at every possible check before moving?', doThis: 'In the example, find all the checks — one of them is checkmate.' },
      { page: 4, title: 'Then CAPTURES, then QUEEN ATTACKS', say: 'Priority #2 is every capture (free material), and #3 is every way to attack the queen. "Checks, Captures, Queen attacks" — the Big Three to scan every single move.', ask: 'What are the "Big Three" forcing moves to check every turn?' },
      { page: 5, title: 'Why did my opponent move THERE?', say: 'After your opponent moves, always ask what it threatens — look for THEIR checks, captures and queen attacks. Most games are lost by ignoring the opponent\'s threat.', ask: 'What is the one question to ask after your opponent moves?' },
      { page: 6, title: 'Plans & weaknesses', say: 'If there are no checks, captures or queen attacks, make a plan: improve your worst piece, control the centre, or target a weakness.', ask: 'What should you think about when there are no forcing moves?' },
      { page: 8, title: 'Worksheets', say: 'Build the habit with the Checks, Captures, Attack the Queen, and "Why Did They Go There?" worksheets.', doThis: 'Students work pages 8–11; check the answer key (page 12).' },
    ],
    quiz: [
      { question: 'The three phases of a game are:', options: ['opening, middlegame, endgame', 'start, stop, draw', 'check, mate, stalemate', 'fork, pin, skewer'], answerIndex: 0 },
      { question: 'After your opponent moves, you should ask:', options: ['what does it threaten?', 'can I resign?', 'is it lunchtime?', 'what colour is it?'], answerIndex: 0 },
      { question: 'A simple plan could be to:', options: ['improve a piece or target a weakness', 'move randomly', 'never castle', 'trade everything'], answerIndex: 0 },
    ] },
  { n: 7, section: 2, emoji: '⚡', title: 'The "Quick" Mates & Other Basic Checkmates', subtitle: 'Scholar\'s Mate, Fool\'s Mate and friends — and guarding f2/f7.', pages: 10,
    objectives: ['Recognise the famous quick mates (Scholar\'s, Fool\'s…)', 'Defend the weak f2/f7 square', 'Spot common mating patterns'],
    teach: ['Show Scholar\'s Mate (Qxf7#) and how to refute it.', 'Show Fool\'s Mate and other quick traps.', 'Teach guarding f2 (White) / f7 (Black) — the weakest squares.', 'Use "Famous Checkmates" and "Guarding f2 and f7" worksheets.'],
    student: ['Set up and refute Scholar\'s Mate.', 'Learn to protect f7 in the opening.', 'Practise the famous mate patterns.'],
    challenge: 'Defend against Scholar\'s Mate when a partner tries it on you.', skills: ['Quick Mates', "Scholar's Mate", 'f2/f7'],
    practice: PRACTICE, boards: [{ fen: 'r1bqkb1r/pppp1Qpp/2n2n2/4p3/2B1P3/8/PPPP1PPP/RNB1K1NR', caption: "Scholar's Mate: Qxf7#. The f7 square is Black's weak point — guard it!" }],
    walkthrough: [
      { page: 1, title: "Fool's Mate & quick mates", say: 'The fastest checkmate of all is Fool\'s Mate — just two moves! But it only happens if White plays the worst possible moves. These "quick mates" need the opponent\'s help (bad moves).', ask: 'Who is the only player that can lose in just two moves?' },
      { page: 2, title: "Scholar's Mate", say: 'The famous four-move mate: 1.e4 e5 2.Bc4 and Qh5, both aiming at f7, then Qxf7#. It works only if Black ignores the threat to f7.', ask: 'Which square does Scholar\'s Mate attack?', doThis: 'Play out Scholar\'s Mate, then show how 3...g6 (or developing Nf6) defends it.' },
      { page: 1, title: 'The weakest squares: f2 & f7', say: 'At the start, f7 (for Black) and f2 (for White) are guarded only by the king — that is why every quick mate aims there. Defend them!', ask: 'Why is the f7 square weak in the opening?', doThis: 'Develop the g8-knight to f6 to guard f7.' },
      { page: 4, title: 'Back-rank mate', say: 'A king trapped on its back rank by its OWN pawns gets mated by a rook or queen sliding along the back row. Make a little "escape hole" (luft) by pushing a pawn to prevent it.', ask: 'What usually traps the king in a back-rank mate?' },
      { page: 5, title: 'Smothered & Support mates', say: 'Smothered mate: a knight mates a king boxed in by its own pieces. Support mate: a queen mates right next to the king, protected by a friendly piece.', ask: 'Which piece delivers a smothered mate?' },
      { page: 7, title: 'Worksheets', say: 'Memorise the famous patterns (Swallow\'s Tail, Arabian, Boden\'s, Legal\'s…) and practise guarding f2/f7.', doThis: 'Students solve the Famous Checkmates and Guarding f2/f7 worksheets (pages 7–9); check the key (page 10).' },
    ],
    quiz: [
      { question: "Scholar's Mate attacks which weak square?", options: ['f7', 'a1', 'd4', 'h8'], answerIndex: 0 },
      { question: 'The best defence against quick mates is to:', options: ['develop and guard f7/f2', 'push the h-pawn', 'move the queen out early', 'ignore threats'], answerIndex: 0 },
      { question: "Fool's Mate is the:", options: ['fastest possible checkmate', 'slowest mate', 'a draw', 'an endgame'], answerIndex: 0 },
    ] },
  { n: 8, section: 2, emoji: '🚀', title: 'Opening Principles', subtitle: 'Development, controlling the centre, connecting the rooks, and playing with a purpose.', pages: 9,
    objectives: ['Develop minor pieces quickly toward the centre', 'Control the centre and castle early', 'Connect the rooks'],
    teach: ['Develop knights and bishops early; don\'t move one piece twice.', 'Fight for the centre; castle to safety.', 'Connect the rooks (clear the back rank).', 'Use "Connect the Rooks" and "Counting Development" worksheets.'],
    student: ['Play the opening following the principles.', 'Count how many pieces each side has developed.', 'Aim to connect your rooks.'],
    challenge: 'Reach a position where you have castled and connected your rooks by move 12.', skills: ['Development', 'Centre', 'Castling'],
    practice: PLAY, boards: [{ fen: 'r1bqkb1r/pppp1ppp/2n2n2/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R', caption: 'Good opening play (Italian Game): centre pawn, knights & bishop out, ready to castle.' }],
    walkthrough: [
      { page: 1, title: 'Develop, develop, develop!', say: 'The #1 opening rule: bring your pieces OFF their starting squares and into the game. A "lead in development" means you have more pieces in play than your opponent.', ask: 'What does it mean to "develop" a piece?', doThis: 'From the starting position, develop a knight and a bishop toward the centre.' },
      { page: 2, title: "Don't move a piece twice / keep the queen home", say: 'Get ALL your minor pieces out before you move one a second time. And don\'t bring the queen out too early — "don\'t let Momma play with the kids" — she just gets chased and you lose time.', ask: 'Why is it risky to bring the queen out early?' },
      { page: 3, title: 'Develop toward the CENTRE', say: 'Pieces are stronger in the centre. "A knight on the rim is grim": a knight in the centre controls about 8 squares, but a knight in the corner controls only 2.', ask: 'How many squares does a central knight control compared to a corner knight?', doThis: 'Compare a knight on e5 with a knight on a1.' },
      { page: 4, title: 'Castle & connect the rooks', say: 'Get the king safe by castling, then connect your rooks (clear the back rank between them). That completes the opening — aim to do it by about move 10.', ask: 'Your opening is "done" once your rooks are what?', doThis: 'Reach a position where you have castled and your rooks are connected.' },
      { page: 5, title: 'Develop with a PURPOSE', say: 'Every developing move should make a threat or defend one. In the Ruy Lopez, for example, each move attacks or defends something specific.', ask: 'What should every developing move try to do?' },
      { page: 7, title: 'Worksheets', say: 'Practise with "Connect the Rooks" (count the moves) and "Counting Development" (who is further ahead?).', doThis: 'Students solve pages 7–8; check the answer key (page 9).' },
    ],
    quiz: [
      { question: 'A key opening principle is to:', options: ['develop pieces and control the centre', 'attack with the queen first', 'move only pawns', 'leave the king in the centre'], answerIndex: 0 },
      { question: 'You should usually castle:', options: ['early', 'never', 'only in the endgame', 'after losing the queen'], answerIndex: 0 },
      { question: '"Connecting the rooks" means:', options: ['clearing the back rank between them', 'stacking them', 'trading them', 'promoting them'], answerIndex: 0 },
    ] },
  // ─── Section 3 ───
  { n: 9, section: 3, emoji: '🍴', title: 'Tactics: Double Attack & The Fork', subtitle: 'Attacking two things at once — the most common way to win material.', pages: 7,
    objectives: ['Recognise and play a fork', 'Create a double attack', 'Use the knight as a forking piece'],
    teach: ['Define the double attack / fork: one move attacks two targets.', 'Show a knight fork hitting king + queen (a "royal fork").', 'Show queen and pawn forks too.', 'Drill "Which Is It" and "Knives & Forks" worksheets.'],
    student: ['Find forks in puzzle positions.', 'Play a knight fork to win material.', 'Solve fork puzzles on Lichess.'],
    challenge: 'Solve 10 fork puzzles and note the forking piece each time.', skills: ['Fork', 'Double Attack', 'Knight Tactics'],
    practice: PUZZLES, boards: [{ fen: 'k3q3/2N5/8/8/8/8/8/4K3', caption: 'A royal fork: Nc7 attacks the king (check) AND the queen at once.' }],
    walkthrough: [
      { page: 1, title: 'Tactics win games', say: 'About 90% of chess is tactics! The first and most common one is the double attack — a single move that attacks two things at once.', ask: 'What does a "double attack" do?', doThis: 'Place a queen or rook so it attacks two loose enemy pieces in one move.' },
      { page: 1, title: 'The Fork (knight & pawn)', say: 'When a knight or pawn makes a double attack in a "split" way, we call it a fork. A fork that hits the king AND the queen is a "royal fork".', ask: 'Which pieces are famous for "forking"?', doThis: 'Jump a knight to a square where it forks two enemy pieces.' },
      { page: 2, title: 'Knives, Forks & Spoons', say: 'Three nicknames: "Killer Knives" = double attacks by rook/bishop/queen; "Fearsome Forks" = by knight/pawn; "Soft Spoons" = a double attack that does NOTHING (the target is defended or can be recaptured).', ask: 'Why is a "soft spoon" a useless double attack?' },
      { page: 2, title: 'Aim at loose pieces', say: 'The best double attacks hit two undefended ("loose") pieces — so always scan the board for hanging pieces first.', ask: 'What makes a target good for a fork?' },
      { page: 4, title: 'Worksheets', say: 'Practise spotting them with "Which Is It?" (knife/fork/spoon), "Knives & Forks", and the tricky set.', doThis: 'Students solve pages 4–6; check the key (page 7), then train forks at lichess.org/training.' },
    ],
    quiz: [
      { question: 'A fork is one piece attacking:', options: ['two targets at once', 'the king only', 'a pawn', 'nothing'], answerIndex: 0 },
      { question: 'Which piece is famous for forking?', options: ['the knight', 'the pawn', 'the king', 'the rook'], answerIndex: 0 },
      { question: 'A "royal fork" hits the:', options: ['king and queen', 'two pawns', 'two rooks', 'two bishops'], answerIndex: 0 },
    ] },
  { n: 10, section: 3, emoji: '📌', title: 'Tactics: Learning to Pin & Skewer', subtitle: 'Pinning a piece in place, breaking pins, and the skewer.', pages: 9,
    objectives: ['Recognise and use a pin', 'Break a pin', 'Recognise and use a skewer'],
    teach: ['Show a pin: the piece can\'t move (a more valuable one is behind it).', 'Show how to break a pin.', 'Show a skewer (the "reverse pin"): the valuable piece is in front.', 'Drill the "Pin \'em & Skewer \'em" worksheets.'],
    student: ['Pin an enemy piece to its king or queen.', 'Win material with a skewer.', 'Solve pin & skewer puzzles.'],
    challenge: 'Solve 10 pin/skewer puzzles and label each one.', skills: ['Pin', 'Skewer', 'Tactics'],
    practice: PUZZLES, boards: [{ fen: '3q2k1/8/5n2/6B1/8/8/8/6K1', caption: 'A pin: the knight on f6 can\'t move — the queen is right behind it.' }],
    walkthrough: [
      { page: 1, title: 'What is a pin?', say: 'A piece is "pinned" when it cannot move because a more valuable piece sits behind it on a line. Only line-pieces can pin: the queen, rook and bishop. An ABSOLUTE pin is to the king (it is illegal to move); a RELATIVE pin is to a valuable piece.', ask: 'Which three pieces can make a pin?', doThis: 'Set up a bishop pinning a knight to its king.' },
      { page: 2, title: 'Win a pinned piece — gang up!', say: 'A pinned piece is stuck, so don\'t just trade it — attack it AGAIN with a pawn or another piece ("gang up") and win it for free.', ask: 'Instead of trading a pinned piece, what should you do?' },
      { page: 3, title: 'Breaking the pin', say: 'A RELATIVELY pinned piece can sometimes move anyway — if it does something even bigger, like a discovered check. The famous Legal\'s Mate works exactly this way, so stay alert for a pin breaking.', ask: 'Can a relatively pinned piece ever move?' },
      { page: 4, title: 'The Skewer (the anti-pin)', say: 'A skewer is a pin in reverse: the MORE valuable piece is in front and must move out of the way, so you capture the piece behind it. Like the pin, it is a line-piece tactic.', ask: 'In a skewer, which piece is in front — the valuable one or the cheap one?' },
      { page: 5, title: 'Endgame skewers', say: 'Skewers decide many endgames — the "back-door" rook skewer, and promoting a pawn WITH CHECK to skewer the king and queen on a diagonal. You can even skewer a piece to an important square.', ask: 'How can promoting a pawn with check win the enemy queen?' },
      { page: 7, title: 'Worksheets', say: '"Pin \'em & Skewer \'em": decide pin or skewer and find the move.', doThis: 'Students solve pages 7–8; key on page 9; then train these on lichess.org/training.' },
    ],
    quiz: [
      { question: 'A pinned piece:', options: ['cannot move (something valuable is behind it)', 'can jump', 'is promoted', 'is the king'], answerIndex: 0 },
      { question: 'A skewer is like a pin but:', options: ['the valuable piece is in front and must move', 'it uses a knight', 'it is a draw', 'it only checks'], answerIndex: 0 },
      { question: 'Bishops, rooks and queens can pin because they:', options: ['attack along lines', 'jump', 'move one square', 'promote'], answerIndex: 0 },
    ] },
  { n: 11, section: 3, emoji: '💥', title: 'Tactics: Discovered Attacks & Double Checks', subtitle: 'Unveiling an attack from behind — including the powerful double check.', pages: 9,
    objectives: ['Play a discovered attack', 'Play a discovered (and double) check', 'See why discoveries are so strong'],
    teach: ['Show a discovered attack: move one piece to reveal another\'s attack.', 'Show a discovered check — the moving piece can grab material "for free".', 'Show a double check (only the king move escapes it).', 'Drill "Use Your Discovery" worksheets.'],
    student: ['Find discovered attacks in puzzles.', 'Play a discovered check.', 'Solve discovery puzzles on Lichess.'],
    challenge: 'Find a discovered check and a double check in puzzle positions.', skills: ['Discovered Attack', 'Double Check', 'Tactics'],
    practice: PUZZLES,
    walkthrough: [
      { page: 1, title: 'The discovered attack', say: 'Move ONE piece to uncover an attack from a teammate sitting behind it on a line. Because the moving piece is now free to do anything, a discovery is incredibly powerful — and a discovered CHECK is the strongest version.', ask: 'How does a discovered attack work?' },
      { page: 2, title: 'A discovery is a double attack', say: 'A good discovery hits two things at once: the uncovered attack PLUS whatever the moving piece does. It works best when the uncovered target is undefended.', ask: 'Why is a discovered check so powerful?' },
      { page: 3, title: 'The Windmill', say: 'The Windmill (Torre–Lasker, 1925) is a repeating discovered-check tactic: the rook checks, the king must move, the rook swings back and grabs material — then "rinse and repeat"!', ask: 'What makes the Windmill so devastating?' },
      { page: 4, title: 'Double check', say: 'In a double check, the moving piece AND the uncovered piece BOTH give check at once. The only escape is to move the king — you cannot block or capture two checkers. The famous "Venus Fly Trap" smothered mate uses it. (In notation, double check is "++".)', ask: 'What is the only way to escape a double check?' },
      { page: 5, title: 'Mating nets', say: 'Double checks force the enemy king onto bad squares, leading to a forced checkmate — like the knight-and-rook and bishop-and-rook mating nets.', ask: 'Why is the king almost helpless against a double check?' },
      { page: 7, title: 'Worksheets', say: '"Use Your Discovery!" — find the winning discovery in each diagram.', doThis: 'Students solve pages 7–8; key on page 9; then train on lichess.org/training.' },
    ],
    quiz: [
      { question: 'A discovered attack works by:', options: ['moving one piece to reveal another\'s attack', 'castling', 'promoting', 'trading'], answerIndex: 0 },
      { question: 'A double check can only be met by:', options: ['moving the king', 'blocking', 'capturing', 'castling'], answerIndex: 0 },
      { question: 'A discovered check is strong because the moving piece:', options: ['can do anything while the king must respond', 'is pinned', 'promotes', 'is lost'], answerIndex: 0 },
    ] },
  { n: 12, section: 3, emoji: '🎯', title: 'Tactics: Deflect, Destroy & Remove', subtitle: 'Removing or deflecting the defender to win.', pages: 7,
    objectives: ['Remove a defender to win material', 'Deflect a defender away from its job', 'Combine tactics to win'],
    teach: ['Show "removing the defender": capture/chase the piece guarding a target.', 'Show "deflection": force a defender to move away.', 'Combine with forks/pins for winning shots.', 'Drill "Using Tactics to Win" worksheets.'],
    student: ['Spot the key defender in a position.', 'Remove or deflect it, then win the target.', 'Solve combination puzzles.'],
    challenge: 'Solve 10 "remove the defender / deflection" puzzles.', skills: ['Remove the Defender', 'Deflection', 'Combinations'],
    practice: PUZZLES,
    walkthrough: [
      { page: 1, title: 'Deflection', say: 'Deflection forces a defender AWAY from its job — usually with a check or capture — and then you win whatever it was guarding.', ask: 'What does a deflection do to a defender?' },
      { page: 1, title: 'Decoy', say: 'A decoy lures an enemy piece ONTO a bad square where a tactic hits it — often with a sacrifice. Deflection pushes a piece away; a decoy pulls a piece onto a bad square.', ask: 'How is a decoy different from a deflection?' },
      { page: 2, title: 'Destroying the defender', say: 'Sacrifice to blow open the squares around the enemy king — rip away the pawns or pieces shielding it — then deliver mate. Most effective when you have more attackers near the king than they have defenders.', ask: 'When is "destroying the defender" most effective?' },
      { page: 3, title: 'Removing the guard', say: 'See your target first, then eliminate the piece guarding it — capture it or chase it away — so the target falls.', ask: 'Before grabbing a defended target, what can you do to its guard?' },
      { page: 5, title: 'Worksheets', say: '"Using Tactics to Win!" — mixed deflection, decoy and removal-of-the-defender puzzles.', doThis: 'Students solve pages 5–6; key on page 7. Then keep training — "tactics, tactics and more tactics!" — on lichess.org/training.' },
    ],
    quiz: [
      { question: '"Removing the defender" means:', options: ['eliminating the piece guarding a target', 'castling', 'promoting', 'checking'], answerIndex: 0 },
      { question: 'Deflection forces a defender to:', options: ['move away from its job', 'promote', 'castle', 'check'], answerIndex: 0 },
      { question: 'These tactics usually win by:', options: ['making a key defender disappear', 'offering a draw', 'wasting time', 'moving the king'], answerIndex: 0 },
    ] },
  // ─── Section 4 ───
  { n: 13, section: 4, emoji: '♖', title: 'Rook Mates, Zugzwang & King Play', subtitle: 'King + Rook vs King, zugzwang, and using your king actively.', pages: 9,
    objectives: ['Checkmate with King + Rook vs King', 'Understand zugzwang', 'Use the king as an active piece in the endgame'],
    teach: ['Show the K+R "box" method to mate a lone king.', 'Explain zugzwang (any move worsens your position).', 'Teach king activity — the king is a strong endgame piece.', 'Use the King Play practice mini-games.'],
    student: ['Mate a lone king with King + Rook.', 'Find a zugzwang position.', 'Activate your king in an endgame.'],
    challenge: 'Checkmate a lone king with King + Rook within 16 moves.', skills: ['K+R Mate', 'Zugzwang', 'King Activity'],
    practice: PRACTICE, boards: [{ fen: 'kR6/8/K7/8/8/8/8/8', caption: 'King + Rook mate: the rook mates while the king guards the escape squares.' }],
    walkthrough: [
      { page: 1, title: 'King + Rook checkmate', say: 'With just King and Rook you can mate a lone king. The rook builds a "wall" the enemy king cannot cross, and your king marches up to take away the squares. Drive the enemy king to an EDGE, then deliver the rook check — but only check when the two kings face each other one square apart.', ask: 'Why can\'t a lone rook mate without help from its own king?', doThis: 'On the demo board, walk the kings up "nose to nose" with one square between, then snap the rook down for mate. Show that without your king nearby, the rook check just chases the enemy king back to the centre.' },
      { page: 2, title: 'The waiting move', say: 'Sometimes the enemy king is one square from the edge and it is YOUR move — but any rook check would let him escape toward the centre. The trick is a "waiting move": slide the rook far along its rank so the enemy king is forced to step to the edge himself. Now your check is mate.', ask: 'When it is your move and a check would spoil the mate, what should you do instead?', doThis: 'Set up the position where a waiting rook move forces the king to the edge; have a student find the quiet rook slide.' },
      { page: 3, title: 'Zugzwang', say: 'That idea has a name: zugzwang — a German word meaning "a need to move". It is a position where a player would love to pass, because EVERY legal move makes their position worse. In the K+R mate we put the enemy king in zugzwang so he must step onto the losing square.', ask: 'What does zugzwang mean?', doThis: 'Show a simple K+P position where whoever must move loses ground, and have the class say "zugzwang!" when they spot it.' },
      { page: 5, title: 'Keep the king safe early', say: 'The king is a fighter in the endgame — but NOT in the opening and middlegame, when enemy pieces are everywhere. Early on, the king\'s only job is to get safe (usually by castling) and stay out of the crossfire.', ask: 'In the opening, where does the king belong?', doThis: 'Contrast two boards: a king castled and tucked away (good) vs. a king wandering into the centre with queens on (dangerous).' },
      { page: 6, title: 'The king is powerful', say: 'How strong is the king? From the centre he attacks all 8 squares around him — as many as a knight, and he can bully a lone knight or pawn one-on-one. Once the queens and rooks are off the board, the king becomes a real piece.', ask: 'How many squares does a centralised king control?', doThis: 'Place a king on a central square and count the 8 squares it covers; compare with a knight on the same square.' },
      { page: 7, title: 'Active vs passive king', say: 'In the endgame the side with the more ACTIVE king usually wins. An active king marches toward the centre and the enemy pawns; a passive king hides on the back rank doing nothing. So in endgames: wake your king up and march him forward!', ask: 'Whose king tends to win the endgame — the active one or the passive one?', doThis: 'Show two kings, one on e4 and one on g1, and ask the class which side is happier.' },
      { page: 9, title: 'King-Play practice games', say: 'Finish with the King-Play practice games to drill everything: the K+R mate, spotting zugzwang, and racing the active king forward.', doThis: 'Pair students up to play the practice mini-games; rotate the winning and losing sides so everyone practises the mate.' },
    ],
    quiz: [
      { question: 'In the endgame the king should be:', options: ['active', 'hidden in the corner', 'traded', 'on the back rank'], answerIndex: 0 },
      { question: 'Zugzwang means:', options: ['any move you make worsens your position', 'a quick mate', 'a draw offer', 'a fork'], answerIndex: 0 },
      { question: 'To mate with K+R you drive the king to:', options: ['an edge', 'the centre', 'your rook', 'a pawn'], answerIndex: 0 },
    ] },
  { n: 14, section: 4, emoji: '🏁', title: 'Passed Pawns, Promoting & "Pawn Tactics"', subtitle: 'Passed pawns, the rule of the square, and under-promotion.', pages: 10,
    objectives: ['Recognise a passed pawn and push it', 'Use the "rule of the square"', 'Know when to under-promote'],
    teach: ['Define the passed pawn (no enemy pawns can stop it).', 'Teach the "rule of the square" to see if a king can catch a runner.', 'Show under-promotion (sometimes a knight, not a queen).', 'Use "Circle the Passed Pawns" and "Under or Promote" worksheets.'],
    student: ['Find passed pawns in positions.', 'Use the square rule to decide if a pawn queens.', 'Promote a passed pawn.'],
    challenge: 'In several positions, use the rule of the square to say if the pawn promotes.', skills: ['Passed Pawns', 'Rule of the Square', 'Promotion'],
    practice: PRACTICE, boards: [{ fen: '4k3/8/8/3P4/8/8/8/4K3', caption: 'A passed pawn (d5): use the "rule of the square" to see if the king can catch it.' }],
    walkthrough: [
      { page: 1, title: 'What is a passed pawn?', say: 'A passed pawn is a pawn with a CLEAR path to promotion — no enemy pawn in front of it on its file, and none on the files beside it that could capture it. A passer is dangerous because it is always threatening to become a queen, so the rule is simple: push it!', ask: 'What makes a pawn a "passed" pawn?', doThis: 'On the demo board, point to each pawn and have the class shout "passed!" or "blocked!" — a passer has no enemy pawn ahead of it or diagonally guarding its path.' },
      { page: 2, title: 'The "big three" passers', say: 'Some passed pawns are extra strong. An OUTSIDE passer is far from the kings — it acts as a decoy, dragging the enemy king away so your king gobbles the other side. A PROTECTED passer is defended by one of your own pawns. CONNECTED passers march up the board protecting each other.', ask: 'How can a faraway "outside" passed pawn win the game even if it never promotes?', doThis: 'Set up an outside passer and show the enemy king running to stop it — while your own king strolls in and wins the pawns it left behind.' },
      { page: 5, title: 'The rule of the square', say: 'To check if a lone king can catch a running pawn WITHOUT calculating, draw the imaginary "square" of the pawn: from the pawn, count the squares to the promotion rank, then make a box that size. If the enemy king is inside the box (or can step in on his move), he catches the pawn. If not — it queens!', ask: 'How can you tell at a glance whether the king catches the runaway pawn?', doThis: 'Draw the square on the board with your finger and have students judge several positions "queens!" or "caught!" — then check by playing it out.' },
      { page: 3, title: 'Promotion tactics', say: 'Promoting often comes with a tactic. Promote WITH CHECK and you may skewer or win the piece that was blocking you. Or use a decoy sacrifice to drag a defender off the promotion square, then push through. Always look for a tactic that clears the last rank.', ask: 'Why is promoting "with check" so powerful?', doThis: 'Show a position where pushing the pawn gives check and wins the blocking rook; let a student find it.' },
      { page: 4, title: 'Under-promotion', say: 'A pawn almost always becomes a queen — but sometimes a knight is better! Promote to a knight to deliver a FORK, or to AVOID a stalemate that a new queen would cause, or to defend. Promoting to less than a queen is called under-promotion.', ask: 'When might a knight be a better choice than a queen on promotion?', doThis: 'Set up the classic "queen = stalemate, knight = check & win" position and let the class discover why the knight wins.' },
      { page: 7, title: 'Converting your passers', say: 'Finish with the "Converting Your Passers" mini-game and the "Circle the Passed Pawns" and "To Under-promote or Promote?" worksheets to lock it all in.', doThis: 'Hand out the worksheets, then pair students to play the mini-game pushing passers home; swap colours and replay.' },
    ],
    quiz: [
      { question: 'A passed pawn is one that:', options: ['no enemy pawn can stop from promoting', 'moved twice', 'is captured', 'is pinned'], answerIndex: 0 },
      { question: 'The "rule of the square" tells you if:', options: ['a lone king can catch a passed pawn', 'you can castle', 'a fork works', 'it is a draw'], answerIndex: 0 },
      { question: 'Under-promotion usually means promoting to a:', options: ['knight (instead of a queen)', 'king', 'pawn', 'second king'], answerIndex: 0 },
    ] },
  { n: 15, section: 4, emoji: '🤝', title: 'Opposition, Technique & Advanced King Play', subtitle: 'Direct, distant and irregular opposition in king-and-pawn endings.', pages: 13,
    objectives: ['Use the (direct) opposition to make progress', 'Understand distant and irregular opposition', 'Win king-and-pawn endgames'],
    teach: ['Show the opposition (kings facing, one square apart) and how it gains ground.', 'Show distant opposition (odd squares apart) and irregular opposition.', 'Apply it to promote a pawn.', 'Use the King-and-Pawn Endings worksheets.'],
    student: ['Take and keep the opposition.', 'Promote a pawn using the opposition.', 'Practise K+P vs K from both sides.'],
    challenge: 'Win a King + Pawn vs King position using the opposition.', skills: ['Opposition', 'King & Pawn', 'Technique'],
    practice: PRACTICE, boards: [{ fen: '8/8/8/4k3/8/4K3/4P3/8', caption: 'Direct opposition: the kings face off one square apart — key to promoting.' }],
    walkthrough: [
      { page: 1, title: 'The goal position', say: 'Every king-and-pawn ending aims at one magic picture: your KING on the 6th rank with your PAWN on the 5th, just behind it. From there the pawn always promotes. So the whole plan is "get my king to the 6th rank ahead of my pawn".', ask: 'What is the winning "goal position" in a king-and-pawn ending?', doThis: 'Set up White Kd6, Pd5 vs a black king and show that no matter what Black does, the pawn queens. That is the target to aim for.' },
      { page: 1, title: 'The opposition', say: 'The tool that gets you there is the OPPOSITION: the two kings face each other with exactly one square between them. Whoever has to MOVE must give way — so the side that does NOT have to move is winning the battle. Take the opposition and you push the enemy king back.', ask: 'When the kings stand one square apart, who is better off — the player to move or the player who waits?', doThis: 'Stand two kings nose-to-nose with one gap; move the enemy king and show how he is forced to step aside, letting your king march forward.' },
      { page: 2, title: 'Lead with the king', say: 'The golden rule: the KING goes first, the pawn follows. Marching the pawn too early throws away the opposition and only draws. Walk your king up to the 6th rank, take the opposition, and ONLY then push the pawn home.', ask: 'Which should lead the way up the board — the king or the pawn?', doThis: 'Play the win once leading with the king (it queens), then replay pushing the pawn first (it only draws) so the class sees the difference.' },
      { page: 3, title: 'Drawing methods (defence)', say: 'The defender saves the draw by grabbing the opposition himself and refusing to give way. And remember the rook-pawn (a-file or h-file) is special: it is often only a DRAW, because the defending king can sit in the corner and can\'t be forced out.', ask: 'Why is a lone rook-pawn so often only a draw?', doThis: 'Show the defending king holding the corner against an a- or h-pawn, taking the opposition each time, and never being dislodged.' },
      { page: 5, title: 'Distant & irregular opposition', say: 'When the kings are far apart, hold the DISTANT opposition — keep an odd number of squares between them on the line, using "corresponding squares". When the kings aren\'t lined up neatly, IRREGULAR opposition lets you make progress by manoeuvring around to grab the real opposition.', ask: 'How do you keep the opposition when the kings start far apart?', doThis: 'Set the kings several squares apart and have a student count the squares and step in to keep the odd-number distance.' },
      { page: 10, title: 'King-and-pawn worksheets', say: 'Finish with the "King and Pawn Endings" worksheet — mark the squares where the defender draws no matter whose move it is.', doThis: 'Hand out the worksheet (answer key follows it), then drill K+P vs K from both sides at lichess.org/practice so everyone wins it as the stronger side and holds it as the weaker side.' },
    ],
    quiz: [
      { question: 'The opposition is when the kings:', options: ['face each other with a square between', 'are next to each other', 'are in opposite corners', 'are both in check'], answerIndex: 0 },
      { question: 'Holding the opposition helps you:', options: ['make progress / promote the pawn', 'lose faster', 'castle', 'fork'], answerIndex: 0 },
      { question: 'Distant opposition is when the kings are an:', options: ['odd number of squares apart on a line', 'even number apart', 'L-shape apart', 'diagonal apart only'], answerIndex: 0 },
    ] },
  { n: 16, section: 4, emoji: '✨', title: 'Advanced Endgame Play & Winning Technique', subtitle: 'The principles of converting a win, and the "Magic Square" (Queen vs pawn).', pages: 9,
    objectives: ['Apply the principles of winning technique', 'Convert a winning position cleanly', 'Use the "Magic Square" vs an advanced pawn'],
    teach: ['Teach "win when winning": simplify, avoid counterplay, use your king.', 'Show the Queen vs advanced pawn "Magic Square" technique.', 'Drill the "Is the King Too Close?" worksheet.'],
    student: ['Convert a winning material edge by simplifying.', 'Stop an advanced pawn with the queen technique.', 'Practise clean technique.'],
    challenge: 'Convert a +Queen position to checkmate without giving counterplay.', skills: ['Technique', 'Queen vs Pawn', 'Converting'],
    practice: PRACTICE,
    walkthrough: [
      { page: 1, title: 'The "3 Keepers"', say: 'Technique means knowing HOW to finish off a winning game. There are three rules — the "3 Keepers" — to remember when you are ahead. Keeper #1 is KEEP IT SIMPLE: when you are ahead material, trade pieces and simplify so your extra piece shines. The fewer pieces on the board, the clearer your advantage.', ask: 'When you are ahead a piece, is it better to keep lots of pieces on the board or to trade them off?', doThis: 'Show the cluttered starting diagram, then the simplified one — the same extra knight is obviously winning once the "extra stuff" is traded away.' },
      { page: 2, title: 'Trade pieces, not pawns', say: 'A coach\'s phrase: "when you are ahead PIECES, trade pieces; when you are ahead PAWNS, trade pawns." If you are up a piece, do NOT trade off all the pawns — you need pawns to promote, because a lone knight or bishop can never mate by itself. Keeper #2 is KEEP AN EYE OUT: don\'t get greedy. When you\'re winning, the only thing your opponent has left is tricks.', ask: 'You are up a piece and can grab a free pawn — but is it safe? Why slow down?', doThis: 'Show the back-rank counter-shot (…Qc2!!): grabbing the loose pawn lets Black mate on the back rank. Then show the calm move that wins safely.' },
      { page: 3, title: 'Keep playing chess', say: 'Keeper #3 is KEEP PLAYING CHESS: when there are no good trades and no threats, just keep making good moves. In the OPENING develop and castle; in the MIDDLEGAME improve your worst piece to a better square; in the ENDGAME activate your king. Never stop playing real chess just because you\'re ahead.', ask: 'You\'re winning but there\'s nothing to trade and no threat — what do you do?', doThis: 'Run through the three example boards (opening / middlegame / endgame) and have the class name the best "keep playing" plan for each.' },
      { page: 4, title: 'Magic Square: reach the box', say: 'Part 2 — the "Magic Square" technique for Queen vs an advanced pawn. The enemy pawn is one step from queening and it\'s your queen vs that pawn. The Magic Square is the square directly BEHIND the pawn. Check the king from behind and aim to land your queen on that square — it forces the enemy king IN FRONT of his own pawn, which blocks it for a move and lets your king step closer.', ask: 'Where is the "Magic Square" in a queen-vs-pawn ending?', doThis: 'Play the repeating pattern: check, check, Magic Square! — each cycle drags the king in front of the pawn and walks your king one rank nearer.' },
      { page: 5, title: 'Bring in the king (and two exceptions)', say: 'The queen alone can\'t finish — she forces the king in front of the pawn, and meanwhile YOUR king marches up to help deliver mate. But there are two exceptions where this fails: the ROOK-PAWN (a/h-file) and the BISHOP-PAWN (c/f-file). With those, forcing the king "in front" stalemates him in the corner — so they are drawn unless your king is already close.', ask: 'Which two pawns can a lone queen NOT stop, and why?', doThis: 'Show the rook-pawn stalemate trap and the bishop-pawn …Kh1!! trick so students recognise the two drawn exceptions.' },
      { page: 7, title: '"Win, When Winning!" mini-game', say: 'Use the "Win, When Winning!" mini-game between the two parts. One side starts with extra material; the winning side must convert by trading down and avoiding tricks. There are 8 levels — from "no queen" up to "make up your own imbalance".', doThis: 'Pair students and play; rotate the winning and losing sides until the stronger side wins the majority. After each game, stop and check which "Keeper" was followed or broken.' },
      { page: 8, title: '"Is the King Too Close?" worksheet', say: 'Finish with the "Is the King Too Close?" worksheet: in each diagram decide whether the king is near enough to win against a rook- or bishop-pawn, and circle Yes or No.', doThis: 'Hand out the worksheet (answer key on the last page), then have students drill queen-vs-pawn from both sides at lichess.org/practice.' },
    ],
    quiz: [
      { question: '"Win when winning" technique includes:', options: ['simplify and avoid counterplay', 'create chaos', 'give back material', 'ignore the king'], answerIndex: 0 },
      { question: 'When ahead in material you should usually:', options: ['trade pieces (not pawns)', 'keep all pieces', 'sacrifice', 'stall'], answerIndex: 0 },
      { question: 'The "Magic Square" technique helps a queen:', options: ['stop and win an advanced pawn', 'castle', 'fork two kings', 'promote'], answerIndex: 0 },
    ] },
  // ─── Section 5 ───
  { n: 17, section: 5, emoji: '🧱', title: 'The Fundamentals of Positional Chess', subtitle: 'Doubled, isolated and backward pawns, and "outpost" squares.', pages: 11,
    objectives: ['Identify doubled, isolated and backward pawns', 'Find and use outpost squares', 'Spot positional weaknesses'],
    teach: ['Define doubled, isolated and backward pawns — usually weaknesses.', 'Show an outpost (a safe advanced square for a knight).', 'Teach spotting and targeting weaknesses.', 'Drill "Find the Weakness" worksheets.'],
    student: ['Find each pawn weakness on the board.', 'Place a knight on an outpost.', 'Identify the weak square to target.'],
    challenge: 'In a position, list every pawn weakness for both sides.', skills: ['Pawn Weaknesses', 'Outposts', 'Positional Play'],
    practice: PLAY, boards: [{ fen: '8/8/8/8/3P4/3P4/8/8', caption: 'Doubled pawns (two on the same file) — usually a structural weakness.' }],
    walkthrough: [
      { page: 1, title: 'What is positional chess?', say: 'Tactics are the SHORT-term stuff — captures, checks, immediate threats. Positional chess is everything LONG-term and permanent about a position. A positional player builds up small, lasting advantages and targets the opponent\'s "positional weaknesses". Our first weakness: DOUBLED PAWNS — two pawns of one colour stacked on the same file (they can only get there by a capture).', ask: 'What is the difference between a tactic and a positional advantage?', doThis: 'Show the clean vs. doubled-pawn diagram side by side; the doubled pawns can\'t defend each other and one always blocks the other, so they are weaker.' },
      { page: 2, title: 'When are doubled pawns OK?', say: 'Doubled pawns ("twins", or even "triplets") aren\'t always fatal. They can be fine if they come with compensation — like an OPEN FILE for your rook where the pawn left. But doubled pawns that are ALSO isolated (no friendly pawns beside them) become real targets, because no brother pawn can defend them.', ask: 'What does a doubled pawn give you in exchange — what opens up when a pawn captures sideways?', doThis: 'Compare the "OK" diagram (rook on the open file, active pieces) with the "not OK" one (doubled AND isolated pawns) so students see the difference.' },
      { page: 4, title: 'Isolated pawns & pawn islands', say: 'An ISOLATED pawn has no friendly pawns on the files beside it, so no pawn can ever defend it — only pieces can, and pieces have better things to do. Pawns in connected groups are "pawn islands": the FEWER islands you have, the better, because neighbours protect each other.', ask: 'Why is an isolated pawn weak — who is forced to babysit it?', doThis: 'Count the pawn islands for both sides in the example; the side with more islands has more to defend.' },
      { page: 5, title: 'The isolated queen-pawn (IQP)', say: 'A central isolated pawn — the famous "IQP" on the d-file — is a double-edged sword. It IS a long-term weakness... but it also hands you open files and diagonals right next to it and extra space in the centre. So the IQP side keeps pieces on and attacks; the other side trades pieces and blockades the pawn.', ask: 'Why might a player actually WANT an isolated queen-pawn in the middlegame?', doThis: 'Show the IQP position with all of White\'s pieces aiming at the kingside; then show the same pawn surviving into an endgame where it just falls.' },
      { page: 6, title: 'Backward pawns & outposts', say: 'A BACKWARD pawn is left behind by its neighbours and stuck — it can\'t safely advance. The square in front of it can never be guarded by a pawn again: that is an OUTPOST square (also called a "hole"). Outposts are perfect homes for a KNIGHT, where it can sit untouchable and dominate.', ask: 'What is an outpost square, and which piece loves to sit on one?', doThis: 'Point to the backward pawn, then the hole in front of it, and plant a knight there — show how it can never be kicked away by a pawn.' },
      { page: 9, title: '"Find the Weakness" worksheets', say: 'Finish with the "Find the Weakness" worksheets — in each diagram, circle every doubled pawn, isolated pawn, backward pawn and outpost square.', doThis: 'Hand out the worksheets (answer key on the last page) and have students mark the weaknesses; then look for the same weaknesses in a real game at lichess.org.' },
    ],
    quiz: [
      { question: 'Doubled pawns are two pawns of one colour on the:', options: ['same file', 'same square', 'same diagonal', 'back rank'], answerIndex: 0 },
      { question: 'An outpost is:', options: ['a safe advanced square for a knight', 'a trapped king', 'a passed pawn', 'a back-rank mate'], answerIndex: 0 },
      { question: 'An isolated pawn has:', options: ['no friendly pawns on neighbouring files', 'doubled friends', 'promoted', 'a defender'], answerIndex: 0 },
    ] },
  { n: 18, section: 5, emoji: '🧩', title: 'Playing with the "Little Guys"', subtitle: 'Pawn majorities & minorities, pawn structure, and using space.', pages: 11,
    objectives: ['Use a pawn majority to create a passed pawn', 'Understand pawn structure and space', 'Play with pawns purposefully'],
    teach: ['Explain pawn majorities/minorities and creating a passed pawn.', 'Teach reading pawn structure and using space.', 'Show advanced pawn play and building strength.', 'Drill "Playing with the Pawns" worksheets.'],
    student: ['Turn a pawn majority into a passed pawn.', 'Use space to restrict the opponent.', 'Plan around the pawn structure.'],
    challenge: 'From a majority, create and push a passed pawn.', skills: ['Pawn Majorities', 'Structure', 'Space'],
    practice: PLAY, boards: [{ fen: '8/8/8/8/2PPP3/8/8/8', caption: 'A healthy pawn majority — push carefully to create a passed pawn.' }],
    walkthrough: [
      { page: 1, title: 'Pawn majority', say: '"Majority" just means MORE. If you have more pawns than your opponent on one wing (say four vs three on the queenside), you have a pawn majority there. Its real value is the "pretender" — an unchallenged pawn that only needs its brothers to advance to become a PASSED pawn. The plan: push the majority and turn the pretender into a real passer.', ask: 'What can a healthy pawn majority eventually create?', doThis: 'Set up a 4-vs-3 majority and walk the pawns forward (trading where needed) until one breaks through as a passed pawn.' },
      { page: 2, title: 'Pawn minority', say: 'A minority means FEWER pawns — and on its own that\'s bad. But it has one bright side: one less pawn means one more OPEN FILE for your rooks. With pieces on the board in the middlegame, a minority can give you active play down that open file. So minorities are weak in the endgame but can be a weapon earlier.', ask: 'If you have fewer pawns on one side, what useful thing do you get instead?', doThis: 'Show the minority with no pieces (just lost) and then the same structure with rooks and queen on the open file (suddenly active).' },
      { page: 3, title: 'Pawn structure & the open centre', say: 'Pawn STRUCTURE means everything about the pawns: the pawns themselves, the holes around them, and the open files and diagonals they create. When the central pawns get traded and the centre OPENS, your pieces should rush to the new open files and strong squares — "the pawns tell the pieces where to go", you just have to listen.', ask: 'When the centre opens up, where should your rooks and bishops head?', doThis: 'Trade the central pawns on the demo board, then show how a rook on the newly open file and a bishop on the new diagonal spring to life.' },
      { page: 4, title: 'Pawn chains — swim with the river', say: 'A pawn CHAIN is a diagonal wall of pawns (e.g. b2 up to e5). The chain "points" in a direction — and that\'s the way to attack: swim WITH the river. Attacking on the side your chain points toward is easy; attacking the other way is "swimming upstream" against your own pawns.', ask: 'If your pawn chain points toward the kingside, which side should you attack on?', doThis: 'Draw the chain with your finger, show which way it points, and have students name the side to attack and the open diagonals to fill with pieces.' },
      { page: 6, title: 'Space — and pieces behind pawns', say: 'SPACE is all the squares your army controls behind your most-advanced pawns. More space = more room for your pieces and less for the enemy\'s, so grab space when you safely can. A key trick: advance a pawn first, then develop a knight BEHIND it — the knight then attacks more squares instead of blocking the pawn.', ask: 'Why is it often better to develop a knight behind a pawn rather than in front of it?', doThis: 'Show a knight blocking its own pawn (cramped) vs. the pawn pushed and the knight behind it (more space, more squares attacked).' },
      { page: 9, title: '"Playing with the Pawns" worksheets', say: 'Finish with the "Playing with the Pawns" worksheets — judge each position: who has the better majority, more pawn islands, and which side each player should attack on.', doThis: 'Hand out the worksheets (answer key on the last page); then play a game and pause to ask "which way is your pawn chain pointing?"' },
    ],
    quiz: [
      { question: 'A pawn majority can be used to:', options: ['create a passed pawn', 'castle', 'fork', 'check'], answerIndex: 0 },
      { question: 'Having more space lets you:', options: ['restrict the opponent\'s pieces', 'lose faster', 'skip moves', 'promote instantly'], answerIndex: 0 },
      { question: 'Pawn structure matters because pawns:', options: ['can\'t move backward, so weaknesses last', 'are the strongest', 'can jump', 'don\'t matter'], answerIndex: 0 },
    ] },
  { n: 19, section: 5, emoji: '♝', title: 'Bad Pieces & Other Advanced Piece Play', subtitle: '"Nominal vs absolute" piece power, the knight on the rim, and the bad bishop.', pages: 5,
    objectives: ['Tell a good piece from a "bad" one', 'Avoid the rim knight and the bad bishop', 'Improve your worst piece'],
    teach: ['Explain "nominal vs absolute" piece power — a piece is only as good as its activity.', 'Show "a knight on the rim is dim" and the "bad bishop" (blocked by its own pawns).', 'Teach the habit: improve your worst-placed piece.', 'Drill the advanced piece-play examples.'],
    student: ['Identify a bad piece in a position.', 'Re-route a knight off the rim / free a bad bishop.', 'Improve your worst piece.'],
    challenge: 'Find your worst-placed piece in a game and make a plan to improve it.', skills: ['Piece Activity', 'Bad Bishop', 'Knight on the Rim'],
    practice: PLAY, boards: [{ fen: '8/8/8/7N/8/8/8/8', caption: '"A knight on the rim is dim" — an edge knight controls far fewer squares.' }],
    walkthrough: [
      { page: 1, title: 'Nominal vs absolute power', say: 'Every piece has a "nominal" value — queen 9, rook 5, and so on. But its ABSOLUTE (real) power depends on the position. A knight in the centre attacks EIGHT squares; in the corner, only TWO. A rook on the open 7th rank is worth far more than a sleepy rook at home. The lesson: a piece is only as good as its ACTIVITY.', ask: 'A knight is "worth 3" — but is a corner knight really as good as a centralised one?', doThis: 'Place a knight on d4 (count 8 squares) then on a1 (count 2); same point value, very different piece.' },
      { page: 2, title: 'The power to make threats', say: 'What matters most is the power to actually make THREATS — and to stop your opponent\'s. This works defensively too: sometimes a player even gives up material to kill all of the opponent\'s threats and save the game. "Targets to attack" can matter more than the raw point count.', ask: 'How can the side with FEWER points sometimes be the only one who can win?', doThis: 'Show the famous Ba4!! drawing puzzle: down a rook and bishop, White makes a draw because the extra material has no way to create threats.' },
      { page: 3, title: 'A knight on the rim is dim', say: 'Knights belong near the action. "A knight on the rim is dim" — an edge knight controls few squares and is slow to get back. Knights are also poor at stopping a faraway passed pawn (no "extra file" to jump to), and a stranded knight can even get trapped. Keep your ponies central!', ask: 'Why is a knight on the edge of the board such a weak piece?', doThis: 'Show the rim knight that can\'t catch the passed rook-pawn, and the trapped h5-knight; then re-route a rim knight back toward the centre.' },
      { page: 4, title: 'The "bad bishop"', say: 'A BAD bishop is one buried behind its own pawns — it might as well be a "big pawn", controlling almost nothing while a well-placed knight dominates it. The other kind is the "empty" bishop in opposite-coloured-bishop endings: it has lots of space but can never challenge the enemy bishop, so even an extra pawn or two can be a draw.', ask: 'What makes a bishop "bad", and how could its own player free it?', doThis: 'Show the bishop blocked by its own pawns (a "big pawn") next to a strong knight; then move the pawns off its colour to free it.' },
      { page: 5, title: 'Improve your worst piece', say: 'Put it all together with one golden habit: each move, find your WORST-placed piece and make a plan to improve it. Re-route the rim knight, free the bad bishop, get the rook to an open file. Good players coordinate the whole army — pawns and pieces working in harmony. (Lesson 19 has no worksheets — the examples say it all.)', ask: 'Look at your own position — which is your worst piece right now, and how could you improve it?', doThis: 'Play a practice game at lichess.org and have students "call out" whenever they spot a knight on the rim or a bad bishop — on either side.' },
    ],
    quiz: [
      { question: '"A knight on the rim is...":', options: ['dim (it controls fewer squares)', 'strong', 'safe', 'promoted'], answerIndex: 0 },
      { question: 'A "bad bishop" is one that is:', options: ['blocked by its own pawns', 'on an outpost', 'pinned', 'about to promote'], answerIndex: 0 },
      { question: 'A good habit each move is to:', options: ['improve your worst-placed piece', 'move the king', 'trade randomly', 'push the h-pawn'], answerIndex: 0 },
    ] },
  { n: 20, section: 5, emoji: '🏆', title: 'Playing "Tournament Level" Chess & Planning', subtitle: 'High-level plans, prophylaxis, and the draw rules (perpetual, 3-fold, 50-move).', pages: 7,
    objectives: ['Form a high-level plan and think critically', 'Use prophylactic thinking (stop the opponent\'s idea)', 'Know perpetual check, three-fold repetition and the 50-move rule'],
    teach: ['Teach finding plans and critical thinking in complex positions.', 'Introduce prophylaxis: ask "what does my opponent want?" and prevent it.', 'Cover the draw rules: perpetual check, three-fold repetition, 50-move rule.', 'Play full "tournament level" practice games and analyse them.'],
    student: ['Make a plan and consider the opponent\'s idea before moving.', 'Recognise the three draw rules in a game.', 'Play and analyse a full game.'],
    challenge: 'Play a full game applying prophylaxis, then analyse your two biggest mistakes.', skills: ['Planning', 'Prophylaxis', 'Draw Rules'],
    practice: PLAY,
    walkthrough: [
      { page: 1, title: 'Plans in the opening', say: 'This is the finale — putting it ALL together. Critical thinking (figuring out a position you\'ve never seen) beats memorising. In the OPENING: don\'t just develop pieces, develop PLANS — 1) always fight for the centre, 2) watch how the pawn structure opens paths for your pieces, 3) once the structure is clear make a plan THEN develop accordingly, 4) think about the plan from move one.', ask: 'What\'s the difference between "developing pieces" and "developing a plan"?', doThis: 'From the starting position, have the class name a plan first (centre, then a side to aim at) before deciding where each piece goes.' },
      { page: 2, title: 'Plans in the middlegame & endgame', say: 'In the MIDDLEGAME: no "hope chess" — always play the best move, attack in the direction of your pawns, check the "Big 3" (can I check, capture, or attack the queen?), and target positional weaknesses, because those last. In the ENDGAME: fewer pieces means LESS room for error — slow down, push your passers, and stop your opponent\'s.', ask: 'What is "hope chess", and why should you never play it?', doThis: 'On a middlegame board, run the checklist out loud — attack toward the pawns, scan for check/capture/attack-the-queen, then name the weakness to target.' },
      { page: 3, title: 'Prophylaxis: think of your opponent first', say: 'PROPHYLAXIS means thinking defensively about the FUTURE — not just stopping the opponent\'s immediate threat, but preventing their whole plan before it happens. Before you move, ask: "What does my opponent WANT?" Put their plan first, then carry out your own. It\'s hard, but it\'s the road to real chess strength.', ask: 'What question should you ask about your opponent before every move?', doThis: 'Show a position and have the class state the opponent\'s plan first, then find the quiet move that prevents it.' },
      { page: 4, title: 'Prophylaxis in action', say: 'Even World Champions slip here. The lesson from the master games (Kasparov, Fischer and others): always be aware of your own POTENTIAL weaknesses — especially the back rank — even when you can\'t yet see how they\'d be attacked. Spot the weakness before it costs you the game.', ask: 'Why guard a weakness like the back rank even when there\'s no immediate threat to it?', doThis: 'Walk through a back-rank example where one careless move loses on the spot, then the calm "luft" move that prevents it.' },
      { page: 5, title: 'Perpetual check', say: 'Now the three ways to draw a tough game. PERPETUAL CHECK: when you\'re worse or losing, you can force a DRAW with a never-ending series of checks the opponent can never escape. It\'s the classic "bail-out" — order matters, so pick the check that keeps the king from hiding.', ask: 'If you\'re losing but can check the enemy king forever, what\'s the result?', doThis: 'Play out a perpetual on the demo board (check, king moves, check again) until the class sees it can never end — a draw.' },
      { page: 6, title: 'Three-fold repetition & the 50-move rule', say: 'THREE-FOLD REPETITION: if the exact same position appears three times (same side to move, not necessarily in a row), either player can claim a draw. The 50-MOVE RULE: if 50 moves pass by each side with no capture and no pawn move ("no progress"), it\'s a draw — which is why knowing the basic checkmates matters!', ask: 'After how many moves with no capture or pawn move can a player claim a draw?', doThis: 'Show a repeating position (count it to three) and a K+R vs K race against the 50-move clock to make both rules concrete.' },
      { page: 7, title: 'Play tournament chess!', say: 'That completes the ChessKid curriculum — 20 lessons from the very first piece move to tournament-level planning. Tie the "abstract" ideas back to concrete lessons ("remember openings in Lesson 6?") so they stick. Now it\'s time to PLAY: apply prophylaxis, make plans, and use good technique in real games.', ask: 'Of everything in these 20 lessons, which idea will you use in your very next game?', doThis: 'Play a full "tournament level" game at lichess.org/play, then analyse it together — find the two biggest mistakes and the plan that should have been chosen.' },
    ],
    quiz: [
      { question: 'Prophylactic thinking means:', options: ['preventing your opponent\'s plan', 'attacking only', 'playing fast', 'offering draws'], answerIndex: 0 },
      { question: 'Threefold repetition (same position 3×) is a:', options: ['draw', 'win', 'loss', 'checkmate'], answerIndex: 0 },
      { question: 'The 50-move rule gives a draw if no pawn move or capture happens in:', options: ['50 moves by each side', '5 moves', '500 moves', '15 minutes'], answerIndex: 0 },
    ] },
];

export const CHESS_LESSONS: LessonDetail[] = CONFIGS.map(makeCK);

const sum = (c: CK) => ({ id: `chess-${c.n}`, title: c.title, duration: '~60 min', difficulty: (c.section <= 1 ? 1 : c.section >= 5 ? 4 : c.section) as Difficulty, skills: c.skills.slice(0, 2), order: c.n });

export const CHESS_COURSE: Course = {
  id: 'chess-1', slug: 'chesskid-curriculum', title: 'Chess — The ChessKid Curriculum',
  programId: 'chess', programSlug: 'chess', ageGroup: '8-9', level: 'Beginner',
  description: 'The complete ChessKid.com curriculum (by IM Daniel Rensch) — a clear, professional, classroom-ready chess course from absolute beginner to tournament level, in 20 lessons across 5 sections. Each lesson shows the real curriculum pages (diagrams, mini-games & worksheets), an interactive board, a quiz, and a live Lichess practice board — so coaches can teach straight from the screen and students can self-study.',
  objectives: [
    'Learn all the rules: piece moves, check/checkmate/stalemate, castling, en passant, promotion',
    'Win material with tactics: forks, pins, skewers, discoveries, removing the defender',
    'Play sound openings and the basic checkmates',
    'Master key endgames: K+R/K+Q mates, passed pawns, the opposition, technique',
    'Understand positional chess, piece activity, planning and tournament play',
  ],
  duration: '20 lessons × ~60 minutes', totalHours: 20, lessonCount: 20,
  prerequisites: [],
  skills: ['Rules & Basics', 'Tactics', 'Openings', 'Endgames', 'Positional Play', 'Tournament Play'],
  modules: [1, 2, 3, 4, 5].map(s => ({
    id: `chess-s${s}`, title: SECTIONS[s].title, order: s,
    description: ({ 1: 'The board, all the pieces, check/checkmate/stalemate, and basic checkmates.', 2: 'Counting, castling & en passant, the phases & planning, quick mates, and opening principles.', 3: 'The core tactics: forks, pins & skewers, discovered/double attacks, and removing the defender.', 4: 'Endgames: rook & queen mates, passed pawns, the opposition, and winning technique.', 5: 'Positional chess: pawn weaknesses, pawn play, piece activity, and tournament-level planning.' } as Record<number, string>)[s] ?? '',
    lessons: CONFIGS.filter(c => c.section === s).map(sum),
  })),
};
