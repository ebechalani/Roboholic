import type { Course, LessonDetail, Module, LessonInteraction, QuizQuestion } from '@/types';
import { makeKitLesson, kitSummary, type KitLesson, type KitProgram } from './_course-kit';

// ════════════════════════════════════════════════════════════════
//  Chess — "From First Moves to Tournament Play" (3 levels, 18 lessons)
//  A clear, professional, all-levels chess curriculum: each lesson has
//  instructor-ready teaching steps, student steps, a quiz, and (where
//  useful) an embedded Lichess board for live practice/puzzles ($0).
// ════════════════════════════════════════════════════════════════

const P: KitProgram = { programId: 'chess', programSlug: 'chess', programTitle: 'Chess', programColor: '#92400E', courseId: 'chess-1', courseTitle: 'Chess: From First Moves to Tournament Play' };
const L1 = 'Level I · Beginner — The Basics';
const L2 = 'Level II · Intermediate — Tactics & Fundamentals';
const L3 = 'Level III · Advanced — Strategy & Mastery';

const M = [
  { item: 'A chess set & board', quantity: '1 per pair' },
  { item: 'A demonstration board or screen (instructor)', quantity: '1 per class' },
  { item: 'Computer/tablet with lichess.org (free)', quantity: '1 per pair', isOptional: true },
];
// Reusable embeds (Lichess is free; if a page blocks embedding, the "Open in a new tab" fallback works).
const LEARN: LessonInteraction = { kind: 'embed', title: '♟️ Practice (Lichess Learn)', url: 'https://lichess.org/learn', height: 520, note: 'Interactive board — move the pieces yourself. (Or open in a new tab.)' };
const PUZZLES: LessonInteraction = { kind: 'embed', title: '🧩 Tactics Puzzles', url: 'https://lichess.org/training', height: 520, note: 'Solve tactics puzzles to train pattern recognition. (Or open in a new tab.)' };
const PRACTICE: LessonInteraction = { kind: 'embed', title: '♟️ Guided Practice', url: 'https://lichess.org/practice', height: 520, note: 'Guided practice positions (checkmates, endgames…). (Or open in a new tab.)' };
const PLAY: LessonInteraction = { kind: 'embed', title: '♟️ Play a Game', url: 'https://lichess.org/', height: 520, note: 'Play vs the computer or a friend. (Or open in a new tab.)' };
const LICHESS = { id: 'lichess', title: 'Lichess — free chess: play, puzzles & lessons', type: 'link' as const, audience: 'both' as const, url: 'https://lichess.org/learn', description: 'Free, no-account interactive chess practice' };
const CHESSKID = { id: 'chesskid', title: 'ChessKid (kid-safe chess platform)', type: 'link' as const, audience: 'coach' as const, url: 'https://www.chesskid.com/', description: 'Safe play & lessons for younger students' };

type Age = '6-7' | '8-9' | '10-12' | '13-15';
const ch = (id: string, title: string, emoji: string, diff: 1 | 2 | 3 | 4, age: Age, mod: string, modTitle: string, order: number, concept: string, conceptExplain: string, objectives: string[], steps: string[], challenge: string, skills: string[], quiz: QuizQuestion[], interactions?: LessonInteraction[]): KitLesson => ({
  id, title, emoji, difficulty: diff, ageGroup: age, level: mod === 'chess-m1' ? 'Beginner' : mod === 'chess-m2' ? 'Intermediate' : 'Advanced',
  moduleId: mod, moduleTitle: modTitle, order, concept, conceptExplain, objectives, steps, challenge, skills,
  materials: M, resources: [LICHESS, CHESSKID], quiz, ...(interactions ? { interactions } : {}),
});

const C: KitLesson[] = [
  // ─── Level I · Beginner ───
  ch('chess-1', 'The Board, the Pieces & the Setup', '♟️', 1, '6-7', 'chess-m1', L1, 1,
    'the board, the pieces and the starting position', 'Chess is played on an 8×8 board of light and dark squares. Each side has 16 pieces. Setting up correctly every time builds good habits — remember "light square on the right" and "queen on her own colour".',
    ['Orient the board correctly (light square bottom-right)', 'Name all six pieces', 'Set up the starting position'],
    ['Place the board so each player has a light square in the bottom-right corner.', 'Set the back row: rook, knight, bishop, queen, king, bishop, knight, rook.', 'Remember "queen on her colour" (white queen on a light square).', 'Place all eight pawns on the second row.'],
    'Set up the full starting position from an empty board in under 60 seconds.', ['Board Setup', 'Piece Names', 'Habits'],
    [
      { question: 'When the board is set up correctly, the bottom-right corner square is:', options: ['light', 'dark', 'empty', 'either'], answerIndex: 0, explanation: 'Remember: "light on the right".' },
      { question: 'The white queen starts on a:', options: ['light square', 'dark square', 'corner', 'knight'], answerIndex: 0, explanation: '"Queen on her own colour" — white queen on a light square.' },
      { question: 'How many pieces does each player start with?', options: ['16', '8', '12', '32'], answerIndex: 0 },
    ]),
  ch('chess-2', 'How the Pieces Move I — Rook, Bishop, Queen', '➕', 1, '6-7', 'chess-m1', L1, 2,
    'the line pieces (rook, bishop, queen)', 'The rook moves in straight lines (up/down/across), the bishop moves diagonally (staying on its colour), and the queen combines both — the most powerful piece. None of them can jump over other pieces.',
    ['Move the rook along ranks and files', 'Move the bishop on diagonals', 'Move the queen (rook + bishop combined)'],
    ['Show the rook sliding any number of empty squares in straight lines.', 'Show the bishop sliding on diagonals — note it never changes colour.', 'Show the queen doing both.', 'Stress: line pieces cannot jump over other pieces.'],
    'Place a queen on an empty board and find every square it can reach.', ['Rook', 'Bishop', 'Queen'],
    [
      { question: 'The bishop moves:', options: ['diagonally', 'in straight lines only', 'in an L-shape', 'one square any way'], answerIndex: 0 },
      { question: 'The queen moves like a:', options: ['rook and bishop combined', 'knight', 'pawn', 'king only'], answerIndex: 0 },
      { question: 'Can a rook jump over a piece in its path?', options: ['no', 'yes', 'only on the first move', 'only diagonally'], answerIndex: 0 },
    ], [LEARN]),
  ch('chess-3', 'How the Pieces Move II — Knight, King, Pawn', '🐴', 1, '6-7', 'chess-m1', L1, 3,
    'the knight, king and pawn', 'The knight moves in an "L" (and is the only piece that jumps). The king moves one square in any direction. The pawn moves forward one square (or two on its first move) but captures diagonally.',
    ['Move the knight in an L-shape (and jump)', 'Move the king one square', 'Move and capture with the pawn correctly'],
    ['Show the knight\'s L-move (2+1) and that it can jump over pieces.', 'Show the king moving one square in any direction.', 'Show the pawn going forward 1 (or 2 from start) — but capturing diagonally.', 'Emphasise: pawns never move backward.'],
    'From the start square, count how many squares a knight can jump to (answer: depends on position — try a corner vs the centre).', ['Knight', 'King', 'Pawn'],
    [
      { question: 'The knight is special because it:', options: ['can jump over pieces', 'moves diagonally far', 'moves backward only', 'cannot capture'], answerIndex: 0 },
      { question: 'A pawn captures:', options: ['one square diagonally forward', 'straight ahead', 'in an L-shape', 'sideways'], answerIndex: 0 },
      { question: 'The king moves:', options: ['one square in any direction', 'like a queen', 'in an L', 'two squares always'], answerIndex: 0 },
    ], [LEARN]),
  ch('chess-4', 'Capturing, Check, Checkmate & Stalemate', '👑', 2, '8-9', 'chess-m1', L1, 4,
    'how to win (and draw) a game', 'You capture by moving onto an enemy piece\'s square. "Check" means the king is attacked and must get out of it. "Checkmate" is check with no escape — that wins the game. "Stalemate" (no legal move but not in check) is a draw.',
    ['Capture enemy pieces correctly', 'Recognise check and the 3 ways to escape it', 'Tell checkmate from stalemate'],
    ['Demonstrate a capture (move onto the square, remove the piece).', 'Show a check; escape it 3 ways: move the king, block, or capture the attacker.', 'Show a simple checkmate (king attacked, no escape).', 'Show a stalemate and explain it\'s a DRAW, not a win.'],
    'Set up a position that is check, then change one piece so it becomes checkmate.', ['Check', 'Checkmate', 'Stalemate'],
    [
      { question: 'Checkmate is:', options: ['the king is attacked and cannot escape', 'any capture of the queen', 'a draw', 'when a pawn promotes'], answerIndex: 0 },
      { question: 'Which is NOT a way to escape check?', options: ['ignore it and move elsewhere', 'move the king', 'block the check', 'capture the attacker'], answerIndex: 0 },
      { question: 'Stalemate (no legal move, king not in check) is a:', options: ['draw', 'win for the player to move', 'win for the other player', 'checkmate'], answerIndex: 0 },
    ], [PRACTICE]),
  ch('chess-5', 'Special Moves — Castling, En Passant, Promotion', '🏰', 2, '8-9', 'chess-m1', L1, 5,
    'the three special rules', 'Castling moves the king two squares toward a rook and the rook jumps over — it keeps the king safe. En passant is a special pawn capture. Promotion turns a pawn that reaches the far side into any piece (usually a queen).',
    ['Castle king-side and queen-side (and know the rules)', 'Perform an en passant capture', 'Promote a pawn'],
    ['Show castling: king moves 2 toward a rook, rook hops over. Rules: nothing between, neither piece has moved, king not in/through/into check.', 'Show en passant: capturing a pawn that just moved two squares, as if it moved one.', 'Show promotion: a pawn reaching the last rank becomes a queen (or other piece).', 'Practise each move on the board.'],
    'Reach a position where you can legally castle, then do it; then promote a pawn to a queen.', ['Castling', 'En Passant', 'Promotion'],
    [
      { question: 'Castling mainly helps to:', options: ['keep the king safe', 'win a pawn', 'promote faster', 'check the queen'], answerIndex: 0 },
      { question: 'A pawn that reaches the far side:', options: ['promotes (usually to a queen)', 'disappears', 'becomes a king', 'must stop'], answerIndex: 0 },
      { question: 'You may NOT castle if:', options: ['the king has already moved', 'it is move 10', 'you have a queen', 'the board is full'], answerIndex: 0 },
    ], [LEARN]),
  ch('chess-6', 'Your First Full Game & The Rules of Play', '🤝', 2, '8-9', 'chess-m1', L1, 6,
    'playing a complete game with good manners', 'Time to play! White moves first, then players alternate. Learn touch-move (touch a piece, move it), how games are drawn, and basic etiquette (handshake, "good game"). The goal: checkmate the opponent\'s king.',
    ['Play a full game start to finish', 'Apply touch-move and turn order', 'Show good sportsmanship'],
    ['Set up; White moves first, then alternate.', 'Apply touch-move: if you touch a piece you must move it (if legal).', 'Play to checkmate (or a draw); shake hands and say "good game".', 'Know the main draws: stalemate, agreement, repetition, insufficient material.'],
    'Play a complete game against a partner, following all the rules and good manners.', ['Full Game', 'Etiquette', 'Rules'],
    [
      { question: 'Who moves first in chess?', options: ['White', 'Black', 'the higher rated player', 'whoever wants'], answerIndex: 0 },
      { question: 'Touch-move means:', options: ['if you touch a piece you must move it (if legal)', 'you can take moves back', 'you must touch the king first', 'no touching allowed'], answerIndex: 0 },
      { question: 'The goal of the game is to:', options: ['checkmate the enemy king', 'capture all pawns', 'promote first', 'control the centre'], answerIndex: 0 },
    ], [PLAY]),
  // ─── Level II · Intermediate ───
  ch('chess-7', 'Piece Values & Good Trades', '⚖️', 2, '8-9', 'chess-m2', L2, 7,
    'how much each piece is worth', 'Knowing the rough value of pieces guides good decisions: pawn = 1, knight = 3, bishop = 3, rook = 5, queen = 9 (the king is priceless). Trade when you win material or improve your position; avoid giving up a big piece for a small one.',
    ['State the value of each piece', 'Decide if a trade is good', 'Count material in a position'],
    ['Introduce the values: P=1, N=3, B=3, R=5, Q=9.', 'Show a good trade (winning material) vs a bad one (losing it).', 'Practise counting material on both sides.', 'Rule of thumb: only trade your big piece for an equal or bigger one (unless there\'s a reason).'],
    'In a few positions, count the material and say who is ahead and by how much.', ['Piece Value', 'Trading', 'Material'],
    [
      { question: 'How many points is a rook worth?', options: ['5', '3', '9', '1'], answerIndex: 0 },
      { question: 'Trading a queen (9) for a knight (3) is:', options: ['a bad trade', 'a great trade', 'an even trade', 'illegal'], answerIndex: 0 },
      { question: 'A knight and a bishop are each worth about:', options: ['3 points', '1 point', '5 points', '9 points'], answerIndex: 0 },
    ]),
  ch('chess-8', 'Basic Checkmates (Q+K, R+K, Back-Rank)', '🎯', 3, '10-12', 'chess-m2', L2, 8,
    'finishing the game with a lone king', 'Once you\'re ahead, you must know how to checkmate. Learn King+Queen vs King and King+Rook vs King (the "ladder/box" method), and the common back-rank mate.',
    ['Checkmate with King + Queen vs King', 'Checkmate with King + Rook (ladder)', 'Spot a back-rank mate'],
    ['Use the queen to shrink the king\'s box toward an edge (don\'t stalemate!).', 'Bring your own king up to support the mate.', 'Show the rook "ladder" mate against the edge.', 'Show the back-rank mate (rook/queen on the back rank, king trapped by its own pawns).'],
    'Checkmate a lone king with King + Queen, then with King + Rook, without stalemating.', ['Checkmating Technique', 'King & Queen', 'Back-Rank'],
    [
      { question: 'To checkmate with K+Q you push the enemy king toward:', options: ['the edge of the board', 'the centre', 'your queen', 'a corner with your queen alone'], answerIndex: 0 },
      { question: 'A back-rank mate happens when the king is trapped by:', options: ['its own pawns on the back rank', 'the centre', 'a knight', 'castling'], answerIndex: 0 },
      { question: 'The biggest danger when mating with a queen is:', options: ['accidental stalemate', 'losing the queen to the king', 'running out of time only', 'promotion'], answerIndex: 0 },
    ], [PRACTICE]),
  ch('chess-9', 'Tactics I — Forks, Pins & Skewers', '🍴', 3, '10-12', 'chess-m2', L2, 9,
    'the three core tactics', 'Tactics win material. A fork attacks two things at once (knights are great forkers). A pin freezes a piece because moving it would expose a more valuable one. A skewer is a "reverse pin" — the valuable piece is in front and must move, losing the one behind.',
    ['Recognise and play a fork', 'Recognise and use a pin', 'Recognise and use a skewer'],
    ['Show a knight fork hitting king + queen.', 'Show a bishop pinning a knight to the king (absolute pin).', 'Show a skewer: check the king so it moves and you win the piece behind.', 'Drill: spot the tactic in several positions.'],
    'Solve 10 fork/pin/skewer puzzles on Lichess and note which tactic each one was.', ['Forks', 'Pins', 'Skewers'],
    [
      { question: 'A fork is when one piece:', options: ['attacks two enemy pieces at once', 'defends the king', 'promotes', 'castles'], answerIndex: 0 },
      { question: 'Which piece is famous for forking?', options: ['the knight', 'the pawn', 'the king', 'the rook only'], answerIndex: 0 },
      { question: 'A pin works because moving the pinned piece would:', options: ['expose a more valuable piece behind it', 'cause stalemate', 'lose the game instantly', 'promote a pawn'], answerIndex: 0 },
    ], [PUZZLES]),
  ch('chess-10', 'Tactics II — Discovered & Double Attacks', '💥', 3, '10-12', 'chess-m2', L2, 10,
    'more powerful tactics', 'A discovered attack: one piece moves out of the way to reveal an attack from the piece behind. A double attack hits two targets. "Removing the defender" captures or chases away the piece that is guarding a key square or piece.',
    ['Play a discovered attack (and discovered check)', 'Create a double attack', 'Remove a defender to win material'],
    ['Show a discovered attack: move a piece to unveil a rook/bishop\'s attack.', 'Show a discovered CHECK (very strong — the moving piece is "free" for a move).', 'Show a double attack with the queen.', 'Show "removing the defender" then winning the now-undefended piece.'],
    'Find a discovered check and a "remove the defender" idea in puzzle positions.', ['Discovered Attack', 'Double Attack', 'Defender'],
    [
      { question: 'A discovered attack works by:', options: ['moving one piece to reveal another\'s attack', 'castling', 'promoting', 'trading queens'], answerIndex: 0 },
      { question: 'A discovered CHECK is strong because:', options: ['the moving piece can do anything while the king must respond to check', 'it promotes', 'it draws', 'it is illegal'], answerIndex: 0 },
      { question: '"Removing the defender" means:', options: ['eliminating the piece that guards a target', 'castling early', 'moving the king', 'offering a draw'], answerIndex: 0 },
    ], [PUZZLES]),
  ch('chess-11', 'Opening Principles', '🚀', 3, '10-12', 'chess-m2', L2, 11,
    'how to start a game well', 'A good opening follows simple principles: control the centre (e4/d4), develop your knights and bishops quickly, castle early to keep the king safe, and don\'t move the same piece twice or bring the queen out too early.',
    ['Control the centre with pawns and pieces', 'Develop minor pieces quickly', 'Castle early'],
    ['Play 1.e4 (or 1.d4) to fight for the centre.', 'Develop knights before bishops, toward the centre.', 'Castle within the first several moves.', 'Avoid: moving one piece many times, early queen sorties, too many pawn moves.'],
    'Play the first 8 moves of a game following all the opening principles, then explain your development.', ['Centre Control', 'Development', 'King Safety'],
    [
      { question: 'A core opening principle is to:', options: ['control the centre and develop pieces', 'attack with the queen immediately', 'move only pawns', 'leave the king in the centre'], answerIndex: 0 },
      { question: 'You should usually castle:', options: ['early, to keep the king safe', 'never', 'only in the endgame', 'after losing the queen'], answerIndex: 0 },
      { question: 'In the opening you should avoid:', options: ['moving the same piece several times', 'developing knights', 'controlling the centre', 'castling'], answerIndex: 0 },
    ]),
  ch('chess-12', 'Basic Endgames — King & Pawn vs King', '🏁', 3, '10-12', 'chess-m2', L2, 12,
    'the most important endgame', 'Endgames decide many games. The key idea is "the opposition" (kings facing with one square between) and using your king actively to escort a pawn to promotion. The "square of the pawn" tells you if a lone king can catch a runner.',
    ['Use the opposition to make progress', 'Escort a pawn to promotion', 'Use the "square" rule to stop a passed pawn'],
    ['Show the opposition (kings facing, odd squares apart) and how it gains ground.', 'Walk the king in front of the pawn to promote it.', 'Show the "square of the pawn" rule for catching a runner.', 'Practise King+Pawn vs King from both sides.'],
    'Promote a pawn in a King+Pawn vs King position using the opposition.', ['Opposition', 'King & Pawn', 'Promotion Technique'],
    [
      { question: '"The opposition" refers to:', options: ['the kings facing each other with a square between', 'two queens', 'a pin', 'castling'], answerIndex: 0 },
      { question: 'In a king-and-pawn endgame your king should be:', options: ['active, escorting the pawn', 'hiding in the corner', 'traded off', 'kept on the back rank'], answerIndex: 0 },
      { question: 'The "square of the pawn" rule tells you whether:', options: ['a lone king can catch a passed pawn', 'you can castle', 'a fork works', 'the game is a draw by repetition'], answerIndex: 0 },
    ], [PRACTICE]),
  // ─── Level III · Advanced ───
  ch('chess-13', 'Pawn Structure', '🧱', 4, '13-15', 'chess-m3', L3, 13,
    'the skeleton of the position', 'Pawns can\'t move backward, so their structure is semi-permanent and shapes the whole game. Learn passed, doubled, isolated and backward pawns, and pawn chains — and which are strengths vs weaknesses.',
    ['Identify passed, doubled, isolated and backward pawns', 'Understand pawn chains and how to attack them', 'Plan around pawn-structure strengths and weaknesses'],
    ['Define and show each pawn type on the board.', 'Show a passed pawn (no enemy pawns can stop it) as a strength.', 'Show how to attack the base of a pawn chain.', 'Discuss creating/avoiding weaknesses.'],
    'Analyse a position and list every pawn weakness for both sides.', ['Pawn Structure', 'Weak Pawns', 'Pawn Chains'],
    [
      { question: 'A passed pawn is:', options: ['one with no enemy pawns able to stop it from promoting', 'a pawn that moved twice', 'a captured pawn', 'a pinned pawn'], answerIndex: 0 },
      { question: 'Why is pawn structure so important?', options: ['pawns can\'t move backward, so weaknesses last', 'pawns are the strongest pieces', 'pawns can jump', 'it isn\'t important'], answerIndex: 0 },
      { question: 'Doubled pawns are two pawns:', options: ['of the same colour on the same file', 'on the same square', 'that promoted', 'pinned together'], answerIndex: 0 },
    ]),
  ch('chess-14', 'Positional Play', '🧠', 4, '13-15', 'chess-m3', L3, 14,
    'winning without tactics', 'Beyond tactics, strong players improve their position: place a knight on an outpost (a safe advanced square), control open files with rooks, prefer a "good" bishop over a "bad" one, and gain space.',
    ['Use outposts for knights', 'Control open files with rooks', 'Tell a good bishop from a bad one'],
    ['Show a knight on a protected outpost — hard to remove, very strong.', 'Put a rook on an open or half-open file.', 'Compare a good bishop (pawns off its colour) vs a bad one (blocked by its own pawns).', 'Discuss space and piece activity.'],
    'Take a quiet position and make three purely positional improving moves; explain each.', ['Outposts', 'Open Files', 'Good vs Bad Bishop'],
    [
      { question: 'An outpost is:', options: ['a safe advanced square for a knight', 'a trapped king', 'a doubled pawn', 'a back-rank mate'], answerIndex: 0 },
      { question: 'Rooks are strongest on:', options: ['open files', 'the first move', 'diagonals', 'the centre squares only'], answerIndex: 0 },
      { question: 'A "bad bishop" is one that is:', options: ['blocked by its own pawns', 'pinned', 'on an outpost', 'about to promote'], answerIndex: 0 },
    ]),
  ch('chess-15', 'Building an Opening Repertoire', '📖', 4, '13-15', 'chess-m3', L3, 15,
    'choosing your openings', 'A repertoire is the set of openings you play. Learn a solid choice for White (e.g. the Italian Game or Ruy Lopez after 1.e4) and a reliable answer to 1.e4 and 1.d4 as Black — and the common traps to avoid.',
    ['Choose an opening for White and answers as Black', 'Play the main ideas (not just memorised moves)', 'Avoid common opening traps'],
    ['Learn the Italian Game (1.e4 e5 2.Nf3 Nc6 3.Bc4) ideas.', 'Pick a defence to 1.e4 and 1.d4 you understand.', 'Focus on the PLANS behind the moves, not memorising 20 moves.', 'Review famous traps (e.g. Scholar\'s Mate) and how to refute them.'],
    'Write a one-page repertoire: your White opening and your replies to 1.e4 and 1.d4, with the main idea of each.', ['Repertoire', 'Opening Ideas', 'Traps'],
    [
      { question: 'A repertoire is:', options: ['the set of openings you choose to play', 'a type of checkmate', 'a tournament', 'a clock'], answerIndex: 0 },
      { question: 'The best way to learn an opening is to:', options: ['understand its plans/ideas', 'memorise 30 moves blindly', 'avoid the centre', 'copy random games'], answerIndex: 0 },
      { question: 'Scholar\'s Mate is an example of:', options: ['an early-attack trap to know and refute', 'an endgame', 'a positional plan', 'a draw'], answerIndex: 0 },
    ]),
  ch('chess-16', 'Calculation & Combinations', '🧮', 4, '13-15', 'chess-m3', L3, 16,
    'thinking ahead accurately', 'Strong play needs calculation: identify candidate moves, calculate the forcing lines (checks, captures, threats) move by move, and visualise the resulting position. A combination is a forcing sequence (often a sacrifice) that wins by force.',
    ['List candidate moves before calculating', 'Calculate forcing lines (checks, captures, threats)', 'Find and play a combination'],
    ['Teach the habit: look at all checks, captures and threats first.', 'Pick 2–3 candidate moves, then calculate each a few moves deep.', 'Practise visualising the position at the end of a line.', 'Solve combinations that end in mate or winning material.'],
    'Solve 10 harder puzzles, writing the full forcing line for each before checking.', ['Calculation', 'Candidate Moves', 'Combinations'],
    [
      { question: 'When calculating, you should look first at:', options: ['checks, captures and threats (forcing moves)', 'quiet pawn moves', 'castling', 'offering a draw'], answerIndex: 0 },
      { question: '"Candidate moves" are:', options: ['the few best moves you consider before calculating', 'illegal moves', 'your opponent\'s pieces', 'pawn promotions only'], answerIndex: 0 },
      { question: 'A combination is:', options: ['a forcing sequence (often a sacrifice) that wins by force', 'a random attack', 'a draw offer', 'an opening'], answerIndex: 0 },
    ], [PUZZLES]),
  ch('chess-17', 'Advanced Endgames — Rook Endgames', '♖', 4, '13-15', 'chess-m3', L3, 17,
    'the most common endgames', 'Rook endgames appear constantly. Learn the two essentials: the Lucena position (how to promote when you\'re a pawn up — "building a bridge") and the Philidor position (how to draw when you\'re defending), plus the rule "rooks belong behind passed pawns".',
    ['Win the Lucena position (building a bridge)', 'Hold the Philidor draw', 'Place rooks behind passed pawns'],
    ['Show the Lucena: cut off the king, then "build a bridge" to promote.', 'Show the Philidor: keep the rook on the 3rd rank to defend, then check from behind.', 'State the rule: put your rook BEHIND a passed pawn (yours or the enemy\'s).', 'Practise both positions from each side.'],
    'Win a Lucena position and hold a Philidor draw against a partner or the computer.', ['Rook Endgames', 'Lucena', 'Philidor'],
    [
      { question: 'Rooks are best placed:', options: ['behind passed pawns', 'in front of their own king', 'on the first move', 'on dark squares only'], answerIndex: 0 },
      { question: 'The Lucena position shows how to:', options: ['win when a pawn up in a rook endgame', 'draw a lost game', 'castle', 'open a game'], answerIndex: 0 },
      { question: 'The Philidor position is a key:', options: ['drawing defence in rook endgames', 'opening trap', 'winning attack', 'mating net'], answerIndex: 0 },
    ], [PRACTICE]),
  ch('chess-18', 'Tournament Play — Notation, Clocks & Analysis', '🏆', 4, '13-15', 'chess-m3', L3, 18,
    'playing and improving like a competitor', 'To play in events you need algebraic notation (recording moves), how to use a chess clock, tournament etiquette, and — most important for improvement — analysing your own games to learn from mistakes. Online ratings track your progress.',
    ['Read and write algebraic notation', 'Use a chess clock and know basic tournament rules', 'Analyse a finished game to find improvements'],
    ['Teach algebraic notation (e4, Nf3, O-O, x for capture, + for check, # for mate).', 'Show how a clock works and time-management basics.', 'Cover etiquette: touch-move, "j\'adoube"/adjust, handshakes.', 'Record a game, then analyse it (your blunders + better moves) on Lichess.'],
    'Play a clocked game, record it in notation, then analyse it and write down your two biggest mistakes.', ['Notation', 'Clocks', 'Game Analysis'],
    [
      { question: '"O-O" in notation means:', options: ['king-side castling', 'a draw', 'check', 'a captured pawn'], answerIndex: 0 },
      { question: 'The best way to improve after games is to:', options: ['analyse your own games for mistakes', 'never look back', 'only play faster', 'memorise openings only'], answerIndex: 0 },
      { question: '"#" at the end of a move means:', options: ['checkmate', 'check', 'capture', 'castle'], answerIndex: 0 },
    ], [PLAY]),
];

// Board diagrams (FEN) per lesson — rendered as SVG in the "On the Board" panel.
const BOARDS: Record<string, { fen: string; caption?: string }[]> = {
  'chess-1': [{ fen: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR', caption: 'The starting position. Light square on the right; white queen on a light square.' }],
  'chess-2': [
    { fen: '8/8/8/3Q4/8/8/8/8', caption: 'The Queen (d5): moves in straight lines AND diagonals — the most powerful piece.' },
    { fen: '8/8/8/8/2B5/8/8/8', caption: 'The Bishop (c4): only diagonals, so it stays on one colour all game.' },
  ],
  'chess-3': [
    { fen: '8/8/8/3N4/8/8/8/8', caption: 'The Knight (d5): jumps in an "L" — and is the only piece that can jump over others.' },
    { fen: '8/8/8/8/8/8/3P4/8', caption: 'The Pawn (d2): moves forward 1 (or 2 from its start) but captures one square diagonally.' },
  ],
  'chess-4': [
    { fen: 'kR6/8/K7/8/8/8/8/8', caption: 'Checkmate: the rook checks the king, and the white king covers every escape square.' },
    { fen: 'k7/8/1Q6/8/8/8/8/7K', caption: 'Stalemate (Black to move): the king is NOT in check but has no legal move — this is a DRAW.' },
  ],
  'chess-5': [
    { fen: '8/P7/8/8/8/8/8/k6K', caption: 'Promotion: the a7 pawn steps to a8 and becomes a queen (or any piece).' },
    { fen: 'r4rk1/8/8/8/8/8/8/R4RK1', caption: 'After king-side castling (both sides): king on g1/g8, rook on f1/f8 — the king is tucked away safely.' },
  ],
  'chess-6': [{ fen: 'rnbqkbnr/pppp1ppp/8/4p3/4P3/8/PPPP1PPP/RNBQKBNR', caption: 'After 1.e4 e5 — both players stake a claim in the centre.' }],
  'chess-8': [
    { fen: '7k/6Q1/6K1/8/8/8/8/8', caption: 'King + Queen mate: the queen gives checkmate while the king defends it.' },
    { fen: '6k1/5ppp/8/8/8/8/8/R5K1', caption: 'Back-rank mate: White plays Ra8# — the king is trapped by its own pawns.' },
  ],
  'chess-9': [{ fen: 'k3q3/2N5/8/8/8/8/8/4K3', caption: 'A knight fork: Nc7 attacks the king (check) AND the queen at the same time.' }],
  'chess-11': [{ fen: 'r1bqkbnr/pppp1ppp/2n5/4p3/2B1P3/5N2/PPPP1PPP/RNBQK2R', caption: 'Good opening play: centre pawn, knights & bishop developed, ready to castle (Italian Game).' }],
  'chess-12': [{ fen: '8/8/8/4k3/8/4K3/4P3/8', caption: 'King & pawn vs king: the kings face off in "opposition" — the key to promoting the pawn.' }],
  'chess-13': [{ fen: '4k3/8/8/3P4/8/8/8/4K3', caption: 'A passed pawn (d5): no enemy pawn can stop it from promoting — a powerful long-term asset.' }],
  'chess-17': [{ fen: '4k3/8/8/P7/8/8/8/R3K3', caption: 'A golden rook-endgame rule: put your rook BEHIND the passed pawn to support its march.' }],
};
C.forEach(c => { if (BOARDS[c.id]) c.boards = BOARDS[c.id]; });

export const CHESS_LESSONS: LessonDetail[] = C.map(c => makeKitLesson(c, P));
export const CHESS_COURSE: Course = {
  id: P.courseId, slug: 'from-first-moves-to-tournament', title: P.courseTitle, programId: P.programId, programSlug: P.programSlug,
  ageGroup: '6-7', level: 'Beginner',
  description: 'A clear, professional chess course for all levels — easy to teach and easy to learn. Level I (Beginner): the board, every piece, special moves and a first full game. Level II (Intermediate): piece values, basic checkmates, tactics (forks/pins/skewers/discoveries), opening principles and king-and-pawn endgames. Level III (Advanced): pawn structure, positional play, opening repertoire, calculation, rook endgames and tournament play. Every lesson has instructor steps, student steps, a quiz, and an embedded Lichess board for live practice.',
  objectives: [
    'Know all the rules: piece moves, check/checkmate, castling, en passant, promotion',
    'Win material with tactics (forks, pins, skewers, discovered & double attacks)',
    'Play sound openings and finish with basic checkmates and endgames',
    'Understand pawn structure, positional play and calculation',
    'Read/write notation, use a clock, and analyse your own games',
  ],
  duration: '18 lessons × 45–60 minutes', totalHours: 18, lessonCount: 18,
  prerequisites: [],
  skills: ['Chess Rules', 'Tactics', 'Openings', 'Endgames', 'Strategy', 'Notation & Tournament Play'],
  modules: [
    { id: 'chess-m1', title: L1, order: 1, description: 'The board, all the pieces, special moves, check/checkmate, and a first full game.', lessons: C.filter(c => c.moduleId === 'chess-m1').map(kitSummary) },
    { id: 'chess-m2', title: L2, order: 2, description: 'Piece values, basic checkmates, core tactics, opening principles, and king-and-pawn endgames.', lessons: C.filter(c => c.moduleId === 'chess-m2').map(kitSummary) },
    { id: 'chess-m3', title: L3, order: 3, description: 'Pawn structure, positional play, opening repertoire, calculation, rook endgames, and tournament play.', lessons: C.filter(c => c.moduleId === 'chess-m3').map(kitSummary) },
  ],
};
