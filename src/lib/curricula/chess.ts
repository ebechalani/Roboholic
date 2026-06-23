import type { Course, LessonDetail, LessonSection, LessonImage, Module, Difficulty, AgeGroupId, LessonInteraction, QuizQuestion } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Chess — the official ChessKid.com Curriculum (IM Daniel Rensch),
//  20 lessons in 5 sections. The real curriculum pages are rendered
//  as each lesson's deck (so it's visual, not textual); on top we add
//  a board diagram (FEN→SVG), a quiz, order-the-steps, and a live
//  Lichess practice board. Designed to teach straight from the screen.
// ════════════════════════════════════════════════════════════════

const SECTIONS: Record<number, { title: string; level: 'Beginner' | 'Intermediate' | 'Advanced'; age: AgeGroupId }> = {
  1: { title: 'Section 1 · Starting Out — The Basics of Chess', level: 'Beginner', age: '8-9' },
  2: { title: 'Section 2 · Playing, the Phases & the Opening', level: 'Beginner', age: '8-9' },
  3: { title: 'Section 3 · Tactics, Tactics & More Tactics', level: 'Intermediate', age: '10-12' },
  4: { title: 'Section 4 · Endgame Play — Pawns, Technique & King Play', level: 'Intermediate', age: '10-12' },
  5: { title: 'Section 5 · Positional Chess & Advanced Play', level: 'Advanced', age: '13-15' },
};
const PDF = (n: number) => `/lessons/ChessKid_Curriculum/Non_CCSS_Aligned_Curriculum/Lesson%20${n}.pdf`;
const LICHESS = { id: 'lichess', title: 'Lichess — free play, puzzles & lessons', type: 'link' as const, audience: 'both' as const, url: 'https://lichess.org/learn', description: 'Free, no-account interactive chess practice' };

// Lichess practice embeds (click-to-load; open-in-new-tab fallback if framing is blocked).
const LEARN: LessonInteraction = { kind: 'embed', title: '♟️ Practice (Lichess Learn)', url: 'https://lichess.org/learn', height: 520, note: 'Interactive board — move the pieces yourself.' };
const PUZZLES: LessonInteraction = { kind: 'embed', title: '🧩 Tactics Puzzles', url: 'https://lichess.org/training', height: 520, note: 'Train pattern recognition with puzzles.' };
const PRACTICE: LessonInteraction = { kind: 'embed', title: '♟️ Guided Practice', url: 'https://lichess.org/practice', height: 520, note: 'Guided checkmate & endgame positions.' };
const PLAY: LessonInteraction = { kind: 'embed', title: '♟️ Play a Game', url: 'https://lichess.org/', height: 520, note: 'Play vs the computer or a friend.' };

interface CK {
  n: number; title: string; subtitle: string; section: number; pages: number; emoji: string;
  objectives: string[]; teach: string[]; student: string[]; challenge: string; skills: string[];
  practice: LessonInteraction; quiz: QuizQuestion[]; boards?: { fen: string; caption?: string }[];
}

function gallery(n: number, pages: number): LessonImage[] {
  const a: LessonImage[] = [];
  for (let i = 1; i <= pages; i++) a.push({ src: `/lessons/chess-${n}/p-${String(i).padStart(2, '0')}.png`, kind: 'photo', caption: `Page ${i}` });
  return a;
}

function makeCK(c: CK): LessonDetail {
  const sec = SECTIONS[c.section];
  const sections: LessonSection[] = [
    {
      type: 'coach_prep', title: 'Instructor Guide — Before Class', emoji: '🧑‍🏫', isCoachOnly: true,
      content: [
        `ChessKid Lesson ${c.n}: ${c.title}. ${c.subtitle}`,
        'Review the curriculum pages (shown below) first — they contain the diagrams, explanations, mini-games and worksheets for this lesson.',
        'Materials: a chess set + a demonstration board (or screen); optional computers/tablets with lichess.org for live practice.',
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
      { item: 'Computer/tablet with lichess.org', quantity: '1 per pair', isOptional: true },
    ],
    objectives: c.objectives,
    assessmentChecklist: c.objectives,
    sections,
    heroImage: `/lessons/chess-${c.n}/p-01.png`,
    ...(c.boards ? { boards: c.boards } : {}),
    quiz: c.quiz,
    interactions: [c.practice],
    resources: [
      { id: `chess-${c.n}-r1`, title: `Lesson ${c.n} — Full Curriculum & Worksheets (PDF)`, type: 'pdf', audience: 'both', url: PDF(c.n), description: 'The official ChessKid lesson, worksheets & answer keys' },
      LICHESS,
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
