import { useState } from 'react';
import { Check, HelpCircle, RotateCcw, XCircle } from 'lucide-react';

type Tab = 'workbench' | 'tree-puzzle';
type Level = 'easy' | 'medium' | 'challenge';

interface LadderStep {
  prime: number;
  before: number;
  after: number;
}

function factorizeSteps(n: number): LadderStep[] {
  const steps: LadderStep[] = [];
  let rem = n;
  let d = 2;
  while (rem > 1 && d * d <= rem) {
    while (rem % d === 0) {
      steps.push({ prime: d, before: rem, after: rem / d });
      rem = rem / d;
    }
    d++;
  }
  if (rem > 1) {
    steps.push({ prime: rem, before: rem, after: 1 });
  }
  return steps;
}

const PRESETS: Record<Level, number[]> = {
  easy: [36, 96, 108],
  medium: [210, 576, 633],
  challenge: [1386, 2600, 4032, 7875],
};

const SUPERSCRIPTS: Record<string, string> = {
  '0': '⁰',
  '1': '¹',
  '2': '²',
  '3': '³',
  '4': '⁴',
  '5': '⁵',
  '6': '⁶',
  '7': '⁷',
  '8': '⁸',
  '9': '⁹',
};

function toSup(n: number): string {
  return String(n)
    .split('')
    .map((ch) => SUPERSCRIPTS[ch] ?? ch)
    .join('');
}

export function PrimeFactorizationIndexSim() {
  const [tab, setTab] = useState<Tab>('workbench');
  const [level, setLevel] = useState<Level>('easy');
  const [num, setNum] = useState<number>(108);
  const [visibleCount, setVisibleCount] = useState<number>(99);

  // Exercise 1.2 Q1 Fill-in-the-blank Factor Tree Puzzle state
  const [tree20A, setTree20A] = useState('');
  const [tree20B, setTree20B] = useState('');
  const [tree105A, setTree105A] = useState('');
  const [tree105B, setTree105B] = useState('');
  const [tree180A, setTree180A] = useState('');
  const [tree180B, setTree180B] = useState('');
  const [treeChecked, setTreeChecked] = useState(false);

  const safeNum = Math.max(4, Math.min(9999, Math.floor(num) || 36));
  const steps = factorizeSteps(safeNum);
  const shownSteps = steps.slice(0, visibleCount);

  const primeCounts: Record<number, number> = {};
  steps.forEach((s) => {
    primeCounts[s.prime] = (primeCounts[s.prime] ?? 0) + 1;
  });

  const expandedStr = steps.map((s) => s.prime).join(' × ');
  const indexStr = Object.entries(primeCounts)
    .map(([p, count]) => (count === 1 ? `${p}` : `${p}${toSup(count)}`))
    .join(' × ');

  const handleSelectNum = (val: number) => {
    setNum(val);
    setVisibleCount(99);
  };

  const handleReset = () => {
    setLevel('easy');
    setNum(108);
    setVisibleCount(99);
    setTree20A('');
    setTree20B('');
    setTree105A('');
    setTree105B('');
    setTree180A('');
    setTree180B('');
    setTreeChecked(false);
  };

  const is20Ok = Number(tree20A) === 10 && Number(tree20B) === 5;
  const is105Ok = Number(tree105A) === 35 && Number(tree105B) === 7;
  const is180Ok = Number(tree180A) === 90 && Number(tree180B) === 45;

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            Prime Factorization &amp; Index Notation Workbench
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Watch the Division Method ladder and Factor Tree build together for numbers up to 9,999, or solve Textbook Exercise 1.2 Q1 tree puzzles!
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTab('workbench')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              tab === 'workbench'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Division &amp; Factor Tree
          </button>
          <button
            type="button"
            onClick={() => setTab('tree-puzzle')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              tab === 'tree-puzzle'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Ex. 1.2 Q1 Tree Puzzles
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset</span>
          </button>
        </div>
      </div>

      {tab === 'workbench' ? (
        <div className="space-y-5">
          {/* Level + Presets */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              {(['easy', 'medium', 'challenge'] as Level[]).map((lvl) => (
                <button
                  key={lvl}
                  type="button"
                  onClick={() => {
                    setLevel(lvl);
                    handleSelectNum(PRESETS[lvl][0]);
                  }}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold capitalize cursor-pointer whitespace-nowrap shrink-0 ${
                    level === lvl
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {lvl}
                </button>
              ))}
              {PRESETS[level].map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => handleSelectNum(val)}
                  className={`rounded-lg border px-2.5 py-1 font-math text-xs font-semibold cursor-pointer ${
                    safeNum === val
                      ? 'border-sky-700 bg-sky-50 text-sky-900'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                  }`}
                >
                  {val}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sim15-num" className="text-xs font-medium text-slate-700">
                Any number (4–9999):
              </label>
              <input
                id="sim15-num"
                type="number"
                min={4}
                max={9999}
                value={num}
                onChange={(e) => handleSelectNum(Number(e.target.value))}
                className="w-24 rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-math text-xs text-slate-900"
              />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => setVisibleCount((c) => (c >= steps.length ? 1 : c + 1))}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-semibold text-slate-800 hover:bg-slate-100 cursor-pointer"
            >
              {visibleCount >= steps.length ? 'Replay Step-by-Step' : `Next Step (${shownSteps.length}/${steps.length})`}
            </button>
            {visibleCount < steps.length && (
              <button
                type="button"
                onClick={() => setVisibleCount(99)}
                className="rounded-lg bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer"
              >
                Show All Steps
              </button>
            )}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            {/* Division Method Ladder */}
            <div className="md:col-span-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
              <h5 className="font-display text-sm font-bold text-slate-900">
                1. Division Method Ladder
              </h5>
              <div className="rounded-lg border border-slate-200 bg-white p-3 font-math text-sm space-y-1">
                {shownSteps.map((st, idx) => (
                  <div key={`${st.before}-${idx}`} className="flex items-center border-b border-slate-100 py-1">
                    <span className="w-14 pr-3 text-right font-bold text-sky-700 border-r-2 border-slate-400">
                      {st.prime}
                    </span>
                    <span className="pl-3 font-semibold text-slate-900">{st.before}</span>
                    <span className="ml-auto text-xs text-slate-500">
                      {st.before} ÷ {st.prime} = {st.after}
                    </span>
                  </div>
                ))}
                {shownSteps.length === steps.length && (
                  <div className="flex items-center py-1">
                    <span className="w-14 pr-3 border-r-2 border-slate-400" />
                    <span className="pl-3 font-bold text-emerald-700">1</span>
                    <span className="ml-auto text-xs text-emerald-700">Done!</span>
                  </div>
                )}
              </div>
            </div>

            {/* Factor Tree SVG + Expanded / Index Output */}
            <div className="md:col-span-7 rounded-xl border border-slate-200 bg-white p-4 space-y-4">
              <h5 className="font-display text-sm font-bold text-slate-900">
                2. Factor Tree &amp; Index Notation
              </h5>

              <svg
                viewBox={`0 0 380 ${Math.max(120, 48 + shownSteps.length * 38)}`}
                className="w-full h-auto max-h-72 rounded-lg border border-slate-200 bg-slate-50"
                role="img"
                aria-label={`Factor tree for ${safeNum}`}
              >
                <rect x="158" y="10" width="64" height="24" rx="5" fill="#E0F2FE" stroke="#0284C7" />
                <text x="190" y="27" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
                  {safeNum}
                </text>
                {shownSteps.map((st, idx) => {
                  const topY = 34 + idx * 36;
                  const parentX = Math.min(310, 190 + idx * 9);
                  const leafX = Math.max(20, parentX - 58);
                  const rightX = Math.min(346, parentX + 26);
                  const rowY = topY + 26;
                  return (
                    <g key={`${st.before}-${idx}`}>
                      <line x1={parentX - 8} y1={topY} x2={leafX} y2={rowY - 12} stroke="#64748B" strokeWidth="1.4" />
                      <line x1={parentX + 8} y1={topY} x2={rightX} y2={rowY - 12} stroke="#64748B" strokeWidth="1.4" />
                      <circle cx={leafX} cy={rowY} r="12" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
                      <text x={leafX} y={rowY + 4} textAnchor="middle" fontSize="11.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
                        {st.prime}
                      </text>
                      {st.after === 1 ? null : st.after > 1 && idx === steps.length - 1 ? null : (
                        <>
                          <rect
                            x={rightX - 24}
                            y={rowY - 12}
                            width="48"
                            height="24"
                            rx="5"
                            fill={st.after > 1 && idx === steps.length - 2 ? '#ECFDF5' : '#E0F2FE'}
                            stroke={st.after > 1 && idx === steps.length - 2 ? '#059669' : '#0284C7'}
                          />
                          <text
                            x={rightX}
                            y={rowY + 4}
                            textAnchor="middle"
                            fontSize="11.5"
                            fontWeight="700"
                            fontFamily="IBM Plex Mono, monospace"
                            fill="#0F172A"
                          >
                            {st.after}
                          </text>
                        </>
                      )}
                    </g>
                  );
                })}
              </svg>

              {shownSteps.length === steps.length && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                    <p className="text-[11px] font-semibold text-slate-500">Expanded Form</p>
                    <p className="mt-1 font-math text-sm font-bold text-slate-900">
                      {safeNum} = {expandedStr}
                    </p>
                  </div>
                  <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
                    <p className="text-[11px] font-semibold text-sky-800">Index Notation</p>
                    <p className="mt-1 font-math text-sm font-bold text-sky-950">
                      {safeNum} = {indexStr}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <p className="text-xs sm:text-sm text-slate-700">
            <strong>Textbook Exercise 1.2 Q1 (p. 8):</strong> Fill in the missing composite or prime numbers to complete each factor tree!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Tree (i) 20 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-center">
              <p className="font-display text-sm font-bold text-slate-900">(i) Factor Tree of 20</p>
              <p className="font-math text-sm font-bold text-sky-800">20 = 2 × [ ? ]</p>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span>20 → 2 ×</span>
                <input
                  type="number"
                  value={tree20A}
                  aria-label="Factor tree of 20 first missing number"
                  onChange={(e) => {
                    setTree20A(e.target.value);
                    setTreeChecked(false);
                  }}
                  placeholder="?"
                  className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-math"
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span>Then [ ? ] → 2 ×</span>
                <input
                  type="number"
                  value={tree20B}
                  aria-label="Factor tree of 20 second missing number"
                  onChange={(e) => {
                    setTree20B(e.target.value);
                    setTreeChecked(false);
                  }}
                  placeholder="?"
                  className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-math"
                />
              </div>
              {treeChecked && (
                <p className={`text-xs font-semibold ${is20Ok ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {is20Ok ? '✓ Correct: 20 = 2 × 10 → 2 × 2 × 5' : 'Hint: 20 ÷ 2 = 10, then 10 ÷ 2 = 5'}
                </p>
              )}
            </div>

            {/* Tree (ii) 105 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-center">
              <p className="font-display text-sm font-bold text-slate-900">(ii) Factor Tree of 105</p>
              <p className="font-math text-sm font-bold text-sky-800">105 = 3 × [ ? ]</p>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span>105 → 3 ×</span>
                <input
                  type="number"
                  value={tree105A}
                  aria-label="Factor tree of 105 first missing number"
                  onChange={(e) => {
                    setTree105A(e.target.value);
                    setTreeChecked(false);
                  }}
                  placeholder="?"
                  className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-math"
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span>Then [ ? ] → 5 ×</span>
                <input
                  type="number"
                  value={tree105B}
                  aria-label="Factor tree of 105 second missing number"
                  onChange={(e) => {
                    setTree105B(e.target.value);
                    setTreeChecked(false);
                  }}
                  placeholder="?"
                  className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-math"
                />
              </div>
              {treeChecked && (
                <p className={`text-xs font-semibold ${is105Ok ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {is105Ok ? '✓ Correct: 105 = 3 × 35 → 3 × 5 × 7' : 'Hint: 105 ÷ 3 = 35, then 35 ÷ 5 = 7'}
                </p>
              )}
            </div>

            {/* Tree (iii) 180 */}
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-center">
              <p className="font-display text-sm font-bold text-slate-900">(iii) Factor Tree of 180</p>
              <p className="font-math text-sm font-bold text-sky-800">180 = 2 × [ ? ]</p>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span>180 → 2 ×</span>
                <input
                  type="number"
                  value={tree180A}
                  aria-label="Factor tree of 180 first missing number"
                  onChange={(e) => {
                    setTree180A(e.target.value);
                    setTreeChecked(false);
                  }}
                  placeholder="?"
                  className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-math"
                />
              </div>
              <div className="flex items-center justify-center gap-2 text-xs">
                <span>Then [ ? ] → 2 ×</span>
                <input
                  type="number"
                  value={tree180B}
                  aria-label="Factor tree of 180 second missing number"
                  onChange={(e) => {
                    setTree180B(e.target.value);
                    setTreeChecked(false);
                  }}
                  placeholder="?"
                  className="w-16 rounded border border-slate-300 bg-white px-2 py-1 text-center font-math"
                />
              </div>
              {treeChecked && (
                <p className={`text-xs font-semibold ${is180Ok ? 'text-emerald-700' : 'text-amber-700'}`}>
                  {is180Ok
                    ? '✓ Correct: 180 = 2 × 90 → 2 × 2 × 45 (= 2² × 3² × 5)'
                    : 'Hint: 180 ÷ 2 = 90, then 90 ÷ 2 = 45'}
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setTreeChecked(true)}
              className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Check All Factor Trees</span>
            </button>
            {treeChecked && !(is20Ok && is105Ok && is180Ok) && (
              <span className="inline-flex items-center gap-1 text-xs text-amber-800">
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Check the hints under any incomplete tree.</span>
              </span>
            )}
            {treeChecked && is20Ok && is105Ok && is180Ok && (
              <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-800">
                <Check className="h-3.5 w-3.5" aria-hidden="true" />
                <span>All 3 trees verified!</span>
              </span>
            )}
            {treeChecked && (!tree20A || !tree105A || !tree180A) && (
              <span className="inline-flex items-center gap-1 text-xs text-slate-600">
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Fill all blanks to verify.</span>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
