'use client';

import { useMemo, useRef, useState } from 'react';
import { CheckCircle, XCircle, RotateCcw, Play, ArrowUp, ArrowDown, Lightbulb, Sparkles, ExternalLink } from 'lucide-react';
import type { LessonDetail, QuizQuestion, StepItem, LessonInteraction } from '@/types';

// ════════════════════════════════════════════════════════════════
//  Interactive Exercises — on every lesson. Turns reading into doing:
//  reorder steps, quizzes, fill-in-the-blanks, matching, predict-the-
//  output, live code playgrounds, and embedded live tools. All $0 /
//  client-side.
// ════════════════════════════════════════════════════════════════

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1));[a[i], a[j]] = [a[j], a[i]]; }
  return a;
}
const norm = (s: string) => s.trim().toLowerCase().replace(/[;.]$/, '');

function extractSteps(lesson: LessonDetail): string[] {
  const sec = lesson.sections.find(s => s.type === 'student_steps') || lesson.sections.find(s => s.type === 'activity') || lesson.sections.find(s => s.type === 'coach_steps');
  if (!sec || !Array.isArray(sec.content)) return [];
  const raw = (sec.content as (string | StepItem)[]).map(it => (typeof it === 'string' ? it : (it && 'instruction' in it ? it.instruction : ''))).filter(Boolean) as string[];
  const cleaned = raw
    .map(s => s.replace(/^[^\w(<]+/, '').trim())
    .filter(s => s.length > 6 && s.length < 160)
    .filter(s => !/^(follow|in this|open (cospaces|scratch|makecode|tinkercad|mblock|the makecode)|work through|example|preview|test in the|run it|build the program|👉|🎯|💻|▶)/i.test(s));
  return cleaned.filter((s, i) => cleaned.indexOf(s) === i).slice(0, 6);
}

// ─── Order the Steps ──────────────────────────────────────────────
function StepSorter({ steps, color }: { steps: string[]; color: string }) {
  const [order, setOrder] = useState<number[]>(() => { let s = shuffle(steps.map((_, i) => i)); if (s.every((v, i) => v === i)) s = shuffle(s); return s; });
  const [checked, setChecked] = useState(false);
  const move = (pos: number, dir: -1 | 1) => { const t = pos + dir; if (t < 0 || t >= order.length) return; const n = [...order];[n[pos], n[t]] = [n[t], n[pos]]; setOrder(n); setChecked(false); };
  const correct = order.filter((v, i) => v === i).length, allRight = correct === steps.length;
  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">Put these steps in the right order, then check.</p>
      <ol className="space-y-2">
        {order.map((stepIdx, pos) => {
          const right = checked && stepIdx === pos, wrong = checked && stepIdx !== pos;
          return (
            <li key={stepIdx} className={`flex items-center gap-3 rounded-xl border p-3 bg-white ${right ? 'border-green-300 bg-green-50' : wrong ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
              <span className="w-6 h-6 rounded-full text-white text-xs font-bold flex items-center justify-center shrink-0" style={{ background: color }}>{pos + 1}</span>
              <span className="flex-1 text-sm text-gray-800">{steps[stepIdx]}</span>
              {checked && (right ? <CheckCircle size={16} className="text-green-500 shrink-0" /> : <XCircle size={16} className="text-red-400 shrink-0" />)}
              <span className="flex flex-col shrink-0">
                <button onClick={() => move(pos, -1)} disabled={pos === 0} className="text-gray-400 hover:text-gray-700 disabled:opacity-30" aria-label="Move up"><ArrowUp size={15} /></button>
                <button onClick={() => move(pos, 1)} disabled={pos === order.length - 1} className="text-gray-400 hover:text-gray-700 disabled:opacity-30" aria-label="Move down"><ArrowDown size={15} /></button>
              </span>
            </li>
          );
        })}
      </ol>
      <div className="flex items-center gap-3 mt-4">
        <button onClick={() => setChecked(true)} className="px-4 py-2 rounded-xl text-sm font-bold text-white" style={{ background: color }}>Check order</button>
        <button onClick={() => { setOrder(shuffle(order)); setChecked(false); }} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"><RotateCcw size={14} /> Shuffle</button>
        {checked && <span className={`text-sm font-bold ${allRight ? 'text-green-600' : 'text-gray-500'}`}>{allRight ? '🎉 Perfect order!' : `${correct} / ${steps.length} in the right place`}</span>}
      </div>
    </div>
  );
}

// ─── Quiz ─────────────────────────────────────────────────────────
function Quiz({ questions, color }: { questions: QuizQuestion[]; color: string }) {
  const [picked, setPicked] = useState<(number | null)[]>(() => questions.map(() => null));
  const [submitted, setSubmitted] = useState(false);
  const score = picked.filter((p, i) => p === questions[i].answerIndex).length;
  return (
    <div className="space-y-5">
      {questions.map((q, qi) => (
        <div key={qi}>
          <p className="font-semibold text-sm text-gray-900 mb-2">{qi + 1}. {q.question}</p>
          <div className="space-y-1.5">
            {q.options.map((opt, oi) => {
              const isPicked = picked[qi] === oi, isAnswer = q.answerIndex === oi;
              let cls = 'border-gray-200 hover:border-gray-300';
              if (submitted && isAnswer) cls = 'border-green-300 bg-green-50';
              else if (submitted && isPicked && !isAnswer) cls = 'border-red-200 bg-red-50';
              else if (isPicked) cls = 'border-blue-300 bg-blue-50';
              return (
                <button key={oi} disabled={submitted} onClick={() => { const n = [...picked]; n[qi] = oi; setPicked(n); }} className={`w-full text-left text-sm px-3 py-2 rounded-lg border flex items-center gap-2 ${cls}`}>
                  <span className="w-5 h-5 rounded-full border text-[11px] flex items-center justify-center shrink-0 font-bold text-gray-500">{String.fromCharCode(65 + oi)}</span>
                  <span className="flex-1 text-gray-800">{opt}</span>
                  {submitted && isAnswer && <CheckCircle size={15} className="text-green-500" />}
                  {submitted && isPicked && !isAnswer && <XCircle size={15} className="text-red-400" />}
                </button>
              );
            })}
          </div>
          {submitted && q.explanation && <p className="text-xs text-gray-500 mt-1.5 flex gap-1"><Lightbulb size={13} className="shrink-0 mt-0.5 text-amber-500" /> {q.explanation}</p>}
        </div>
      ))}
      <div className="flex items-center gap-3">
        {!submitted
          ? <button onClick={() => setSubmitted(true)} disabled={picked.some(p => p === null)} className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: color }}>Check answers</button>
          : <><span className={`text-sm font-bold ${score === questions.length ? 'text-green-600' : 'text-gray-700'}`}>You scored {score} / {questions.length}{score === questions.length ? ' 🎉' : ''}</span>
              <button onClick={() => { setPicked(questions.map(() => null)); setSubmitted(false); }} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"><RotateCcw size={14} /> Try again</button></>}
      </div>
    </div>
  );
}

// ─── Fill in the blanks ───────────────────────────────────────────
function FillBlanks({ text, answers, intro, color }: { text: string; answers: string[]; intro?: string; color: string }) {
  const parts = text.split('___');
  const [vals, setVals] = useState<string[]>(() => answers.map(() => ''));
  const [checked, setChecked] = useState(false);
  const right = (i: number) => norm(vals[i] || '') === norm(answers[i] || '');
  const score = answers.filter((_, i) => right(i)).length;
  return (
    <div>
      {intro && <p className="text-sm text-gray-500 mb-3">{intro}</p>}
      <p className="text-[15px] leading-8 text-gray-800">
        {parts.map((part, i) => (
          <span key={i}>
            {part}
            {i < answers.length && (
              <input value={vals[i]} disabled={checked} onChange={e => { const n = [...vals]; n[i] = e.target.value; setVals(n); }}
                className={`mx-1 px-2 py-0.5 w-32 rounded-md border text-sm font-mono ${checked ? (right(i) ? 'border-green-400 bg-green-50' : 'border-red-300 bg-red-50') : 'border-gray-300'}`} placeholder="?" />
            )}
          </span>
        ))}
      </p>
      <div className="flex items-center gap-3 mt-4">
        {!checked
          ? <button onClick={() => setChecked(true)} disabled={vals.some(v => !v.trim())} className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: color }}>Check</button>
          : <><span className={`text-sm font-bold ${score === answers.length ? 'text-green-600' : 'text-gray-700'}`}>{score} / {answers.length} correct{score === answers.length ? ' 🎉' : ''}</span>
              {score < answers.length && <span className="text-xs text-gray-500">Answers: {answers.join(', ')}</span>}
              <button onClick={() => { setVals(answers.map(() => '')); setChecked(false); }} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"><RotateCcw size={14} /> Retry</button></>}
      </div>
    </div>
  );
}

// ─── Match pairs (dropdown matching) ──────────────────────────────
function MatchPairs({ pairs, color }: { pairs: { left: string; right: string }[]; color: string }) {
  const rights = useMemo(() => shuffle(pairs.map(p => p.right)), [pairs]);
  const [sel, setSel] = useState<string[]>(() => pairs.map(() => ''));
  const [checked, setChecked] = useState(false);
  const right = (i: number) => sel[i] === pairs[i].right;
  const score = pairs.filter((_, i) => right(i)).length;
  return (
    <div>
      <p className="text-sm text-gray-500 mb-3">Match each item on the left to the correct answer.</p>
      <div className="space-y-2">
        {pairs.map((p, i) => (
          <div key={i} className={`flex items-center gap-3 rounded-xl border p-2.5 bg-white ${checked ? (right(i) ? 'border-green-300 bg-green-50' : 'border-red-200 bg-red-50') : 'border-gray-200'}`}>
            <span className="flex-1 text-sm font-semibold text-gray-800">{p.left}</span>
            <span className="text-gray-300">→</span>
            <select value={sel[i]} disabled={checked} onChange={e => { const n = [...sel]; n[i] = e.target.value; setSel(n); }} className="flex-1 text-sm rounded-lg border border-gray-300 px-2 py-1.5 bg-white">
              <option value="">Choose…</option>
              {rights.map((r, ri) => <option key={ri} value={r}>{r}</option>)}
            </select>
            {checked && (right(i) ? <CheckCircle size={16} className="text-green-500" /> : <XCircle size={16} className="text-red-400" />)}
          </div>
        ))}
      </div>
      <div className="flex items-center gap-3 mt-4">
        {!checked
          ? <button onClick={() => setChecked(true)} disabled={sel.some(v => !v)} className="px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-40" style={{ background: color }}>Check</button>
          : <><span className={`text-sm font-bold ${score === pairs.length ? 'text-green-600' : 'text-gray-700'}`}>{score} / {pairs.length} matched{score === pairs.length ? ' 🎉' : ''}</span>
              <button onClick={() => { setSel(pairs.map(() => '')); setChecked(false); }} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"><RotateCcw size={14} /> Retry</button></>}
      </div>
    </div>
  );
}

// ─── Predict the output ───────────────────────────────────────────
function Predict({ code, question, options, answerIndex, explanation, color }: { code: string; question: string; options: string[]; answerIndex: number; explanation?: string; color: string }) {
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">Read the code and predict what it does — no running!</p>
      <pre className="text-[13px] font-mono text-gray-100 bg-gray-900 rounded-xl p-3 mb-3 overflow-x-auto whitespace-pre-wrap">{code}</pre>
      <Quiz questions={[{ question, options, answerIndex, explanation }]} color={color} />
    </div>
  );
}

// ─── Embedded live tool ───────────────────────────────────────────
function Embed({ url, note, height }: { url: string; note?: string; height?: number }) {
  const [load, setLoad] = useState(false);
  return (
    <div>
      {note && <p className="text-sm text-gray-500 mb-3">{note}</p>}
      {load
        ? <iframe src={url} title="Live tool" className="w-full rounded-xl border border-gray-200 bg-white" style={{ height: (height || 460) + 'px' }} sandbox="allow-scripts allow-same-origin allow-popups allow-forms allow-modals" allow="autoplay; fullscreen; camera; microphone; xr-spatial-tracking" />
        : <button onClick={() => setLoad(true)} className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-bold text-white" style={{ background: '#2563EB' }}><Play size={15} /> Launch the live tool</button>}
      <a href={url} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1 text-xs text-blue-600 font-semibold mt-2 hover:underline"><ExternalLink size={12} /> Open in a new tab</a>
    </div>
  );
}

// ─── Live code playground (HTML or Python) ────────────────────────
function Playground({ lang, starter, color }: { lang: 'html' | 'python'; starter: string; color: string }) {
  const [code, setCode] = useState(starter);
  const [out, setOut] = useState('');
  const [running, setRunning] = useState(false);
  const pyRef = useRef<unknown>(null);
  async function run() {
    if (lang === 'html') { setOut(code); return; }
    setRunning(true); setOut('Loading Python… (first run downloads the engine)');
    try {
      const w = window as unknown as { loadPyodide?: (o: { indexURL: string }) => Promise<unknown> };
      if (!w.loadPyodide) await new Promise<void>((res, rej) => { const s = document.createElement('script'); s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js'; s.onload = () => res(); s.onerror = () => rej(new Error('load')); document.head.appendChild(s); });
      if (!pyRef.current) pyRef.current = await w.loadPyodide!({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' });
      const py = pyRef.current as { setStdout: (o: { batched: (s: string) => void }) => void; runPythonAsync: (c: string) => Promise<void> };
      let buf = ''; py.setStdout({ batched: (s: string) => { buf += s + '\n'; } });
      await py.runPythonAsync(code);
      setOut(buf || '(no output — use print() to show results)');
    } catch { setOut('⚠️ Could not run Python here (the first run needs internet). Check your code and try again.'); }
    finally { setRunning(false); }
  }
  return (
    <div>
      <p className="text-sm text-gray-500 mb-2">Edit the code and press <b>Run</b> — it runs right here in your browser.</p>
      <textarea value={code} onChange={e => setCode(e.target.value)} spellCheck={false} className="w-full h-44 font-mono text-[13px] rounded-xl border border-gray-200 bg-gray-900 text-gray-100 p-3 focus:outline-none focus:ring-2 focus:ring-blue-500/30" />
      <div className="flex items-center gap-3 my-3">
        <button onClick={run} disabled={running} className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-bold text-white disabled:opacity-50" style={{ background: color }}><Play size={14} /> {running ? 'Running…' : 'Run'}</button>
        <button onClick={() => { setCode(starter); setOut(''); }} className="flex items-center gap-1 px-3 py-2 rounded-xl text-sm font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200"><RotateCcw size={14} /> Reset</button>
      </div>
      <div className="rounded-xl border border-gray-200 overflow-hidden">
        <div className="text-[11px] font-semibold text-gray-400 px-3 py-1.5 bg-gray-50 border-b border-gray-100">{lang === 'html' ? 'PREVIEW' : 'OUTPUT'}</div>
        {lang === 'html'
          ? <iframe title="preview" sandbox="allow-scripts" srcDoc={out} className="w-full h-56 bg-white" />
          : <pre className="text-[13px] font-mono text-gray-800 p-3 whitespace-pre-wrap min-h-[3rem] bg-white">{out}</pre>}
      </div>
    </div>
  );
}

// ─── Wrapper ──────────────────────────────────────────────────────
interface Tab { id: string; label: string; render: () => React.ReactNode; }

export default function InteractiveExercises({ lesson }: { lesson: LessonDetail }) {
  const color = lesson.programColor;
  const steps = useMemo(() => extractSteps(lesson), [lesson]);

  const defaultPg = useMemo(() => {
    if (lesson.playground) return lesson.playground;
    if (lesson.programSlug === 'html-css-js') return { lang: 'html' as const, starter: '<!DOCTYPE html>\n<html>\n<head><style>\n  body { font-family: sans-serif; text-align:center; padding:24px; }\n  h1 { color:#EA580C; }\n</style></head>\n<body>\n  <h1>Hello, RoboHolic!</h1>\n  <p>Edit me and press Run ▶</p>\n</body>\n</html>' };
    if (lesson.programSlug === 'python') return { lang: 'python' as const, starter: 'name = "RoboHolic"\nfor i in range(3):\n    print("Hello from Python!", name)' };
    return null;
  }, [lesson]);

  const labelFor = (it: LessonInteraction): string => it.title || ({ quiz: '🧠 Quiz', playground: '💻 Try Code', fill: '✏️ Fill the Blanks', match: '🔗 Match', predict: '🔮 Predict', embed: '🚀 Live Tool' }[it.kind]);

  const tabs: Tab[] = [];
  if (steps.length >= 3) tabs.push({ id: 'order', label: '🔀 Order the Steps', render: () => <StepSorter steps={steps} color={color} /> });
  if (lesson.quiz?.length) tabs.push({ id: 'quiz', label: '🧠 Quiz', render: () => <Quiz questions={lesson.quiz!} color={color} /> });
  (lesson.interactions || []).forEach((it, i) => {
    tabs.push({
      id: 'i' + i, label: labelFor(it),
      render: () => it.kind === 'quiz' ? <Quiz questions={it.questions} color={color} />
        : it.kind === 'playground' ? <Playground lang={it.lang} starter={it.starter} color={color} />
          : it.kind === 'fill' ? <FillBlanks text={it.text} answers={it.answers} intro={it.intro} color={color} />
            : it.kind === 'match' ? <MatchPairs pairs={it.pairs} color={color} />
              : it.kind === 'predict' ? <Predict code={it.code} question={it.question} options={it.options} answerIndex={it.answerIndex} explanation={it.explanation} color={color} />
                : <Embed url={it.url} note={it.note} height={it.height} />,
    });
  });
  if (defaultPg && !(lesson.interactions || []).some(it => it.kind === 'playground')) tabs.push({ id: 'code', label: '💻 Try Code Live', render: () => <Playground lang={defaultPg.lang} starter={defaultPg.starter} color={color} /> });

  const [tab, setTab] = useState<string>('');
  if (!tabs.length) return null;
  const active = tabs.find(t => t.id === tab) || tabs[0];

  return (
    <section className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-4 border-b border-gray-100 flex items-center gap-2" style={{ background: color + '0D' }}>
        <Sparkles size={18} style={{ color }} />
        <h3 className="font-black text-gray-900">Interactive Exercises</h3>
        <span className="text-xs text-gray-400 ml-1">— try it yourself</span>
      </div>
      {tabs.length > 1 && (
        <div className="flex gap-1 px-3 pt-3 flex-wrap">
          {tabs.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} className={`px-3 py-1.5 rounded-lg text-sm font-semibold ${active.id === t.id ? 'text-white' : 'text-gray-500 bg-gray-100 hover:bg-gray-200'}`} style={active.id === t.id ? { background: color } : undefined}>{t.label}</button>
          ))}
        </div>
      )}
      <div className="p-5">{active.render()}</div>
    </section>
  );
}
