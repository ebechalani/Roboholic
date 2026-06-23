'use client';

// ════════════════════════════════════════════════════════════════
//  Renders chess board diagrams from FEN as crisp inline SVG — no
//  dependencies. Used for the "On the Board" panel in chess lessons.
// ════════════════════════════════════════════════════════════════

const GLYPH: Record<string, string> = { k: '♚', q: '♛', r: '♜', b: '♝', n: '♞', p: '♟' };
const LIGHT = '#F0D9B5', DARK = '#B58863';

function parseFen(fen: string): (string | null)[][] {
  const rows = fen.split(' ')[0].split('/');
  return rows.map(row => {
    const squares: (string | null)[] = [];
    for (const ch of row) {
      if (/\d/.test(ch)) for (let i = 0; i < Number(ch); i++) squares.push(null);
      else squares.push(ch);
    }
    while (squares.length < 8) squares.push(null);
    return squares.slice(0, 8);
  });
}

function Board({ fen }: { fen: string }) {
  const grid = parseFen(fen);          // grid[0] = rank 8 … grid[7] = rank 1
  const S = 44;                        // square size
  const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
  return (
    <svg viewBox={`0 0 ${S * 8} ${S * 8}`} className="w-full h-auto rounded-lg shadow-sm" style={{ maxWidth: 300 }} role="img" aria-label="Chess position">
      {grid.map((rank, r) =>
        rank.map((piece, c) => {
          const dark = (r + c) % 2 === 1;
          const x = c * S, y = r * S;
          const rankNum = 8 - r;
          return (
            <g key={`${r}-${c}`}>
              <rect x={x} y={y} width={S} height={S} fill={dark ? DARK : LIGHT} />
              {c === 0 && <text x={x + 3} y={y + 12} fontSize="10" fontWeight="700" fill={dark ? LIGHT : DARK}>{rankNum}</text>}
              {r === 7 && <text x={x + S - 9} y={y + S - 4} fontSize="10" fontWeight="700" fill={dark ? LIGHT : DARK}>{files[c]}</text>}
              {piece && (
                <text x={x + S / 2} y={y + S / 2} fontSize={S * 0.78} textAnchor="middle" dominantBaseline="central"
                  fill={piece === piece.toUpperCase() ? '#FFFFFF' : '#1A1A1A'}
                  stroke={piece === piece.toUpperCase() ? '#3A3A3A' : '#000000'} strokeWidth={piece === piece.toUpperCase() ? 1.1 : 0.6}
                  style={{ paintOrder: 'stroke' }}>
                  {GLYPH[piece.toLowerCase()]}
                </text>
              )}
            </g>
          );
        })
      )}
    </svg>
  );
}

export default function ChessBoards({ boards, color }: { boards: { fen: string; caption?: string }[]; color: string }) {
  if (!boards?.length) return null;
  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: color + '0D' }}>
        <span className="text-lg">♟️</span>
        <h3 className="font-black text-gray-900">On the Board</h3>
        <span className="text-xs text-gray-400 ml-1">— follow along on a real board</span>
      </div>
      <div className="p-5 flex flex-wrap gap-6 justify-center">
        {boards.map((b, i) => (
          <figure key={i} className="flex flex-col items-center gap-2" style={{ width: 300 }}>
            <Board fen={b.fen} />
            {b.caption && <figcaption className="text-sm text-gray-600 text-center">{b.caption}</figcaption>}
          </figure>
        ))}
      </div>
    </section>
  );
}
