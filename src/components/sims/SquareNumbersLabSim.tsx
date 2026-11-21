import { Fragment, useState } from 'react';
import { Check, RotateCcw } from 'lucide-react';

type Tab = 'explorer' | 'chart' | 'matcher';

const MATCH_PAIRS = [
  { id: '4', expr: '4²', value: 16 },
  { id: '7', expr: '7²', value: 49 },
  { id: '11', expr: '11²', value: 121 },
  { id: '13', expr: '13²', value: 169 },
  { id: '15', expr: '15²', value: 225 },
  { id: '19', expr: '19²', value: 361 },
];

const SHUFFLED_VALUES = [169, 16, 225, 49, 361, 121];

export function SquareNumbersLabSim() {
  const [tab, setTab] = useState<Tab>('explorer');
  // Explorer state
  const [arrayCount, setArrayCount] = useState<number>(9);
  const [intInput, setIntInput] = useState<number>(-3);

  // Activity -4 10x10 chart painter
  const [shadedCells, setShadedCells] = useState<Record<string, boolean>>({});
  const [chartChecked, setChartChecked] = useState(false);

  // Activity -5 matcher
  const [selectedExprId, setSelectedExprId] = useState<string | null>(null);
  const [matchedIds, setMatchedIds] = useState<string[]>([]);
  const [mismatchMsg, setMismatchMsg] = useState<string>('');

  const safeInt = Math.max(-99, Math.min(99, Math.trunc(intInput) || 0));
  const sqVal = safeInt * safeInt;

  const root = Math.sqrt(arrayCount);
  const isPerfectSquareArray = Number.isInteger(root);
  const gridDim = Math.ceil(root);

  const toggleChartCell = (r: number, c: number) => {
    const key = `${r}-${c}`;
    setShadedCells((prev) => ({ ...prev, [key]: !prev[key] }));
    setChartChecked(false);
  };

  const correctChartCount = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(
    (k) => shadedCells[`${k}-${k}`]
  ).length;
  const extraShaded = Object.entries(shadedCells).filter(([k, on]) => {
    if (!on) return false;
    const [r, c] = k.split('-');
    return r !== c;
  }).length;

  const handleMatchValue = (val: number) => {
    if (!selectedExprId) return;
    const pair = MATCH_PAIRS.find((p) => p.id === selectedExprId);
    if (!pair) return;
    if (pair.value === val) {
      setMatchedIds((prev) => (prev.includes(pair.id) ? prev : [...prev, pair.id]));
      setSelectedExprId(null);
      setMismatchMsg('');
    } else {
      setMismatchMsg(`Not quite: ${pair.expr} means ${pair.id} × ${pair.id}, not ${val}.`);
    }
  };

  const handleReset = () => {
    setArrayCount(9);
    setIntInput(-3);
    setShadedCells({});
    setChartChecked(false);
    setSelectedExprId(null);
    setMatchedIds([]);
    setMismatchMsg('');
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            Square Array, 10×10 Chart &amp; Square Matcher Lab
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Inspect full vs. hollow apple arrays, calculate squares of 2-digit positive and negative integers, or complete Textbook Activities 4 and 5!
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {([
            { id: 'explorer' as Tab, label: 'Arrays & Integer Squares' },
            { id: 'chart' as Tab, label: 'Activity -4 (10×10 Chart)' },
            { id: 'matcher' as Tab, label: 'Activity -5 (Matcher)' },
          ]).map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                tab === t.id
                  ? 'bg-sky-700 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {t.label}
            </button>
          ))}
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

      {tab === 'explorer' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Square Apple Array Tester */}
          <div className="md:col-span-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
            <h5 className="font-display text-sm font-bold text-slate-900">
              1. Full Square Array Tester (p. 16 Note)
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {[1, 4, 8, 9, 10, 12, 16, 25].map((cnt) => (
                <button
                  key={cnt}
                  type="button"
                  onClick={() => setArrayCount(cnt)}
                  className={`rounded-lg border px-2.5 py-1 font-math text-xs font-semibold cursor-pointer ${
                    arrayCount === cnt
                      ? 'border-sky-700 bg-sky-700 text-white'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {cnt}
                </button>
              ))}
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-4 flex flex-col items-center gap-3">
              <div
                className="grid gap-1.5"
                style={{ gridTemplateColumns: `repeat(${gridDim}, minmax(0, 22px))` }}
              >
                {Array.from({ length: gridDim * gridDim }).map((_, idx) => {
                  const filled = idx < arrayCount;
                  return (
                    <span
                      key={idx}
                      className={`h-5 w-5 rounded-full border ${
                        filled
                          ? isPerfectSquareArray
                            ? 'border-emerald-700 bg-emerald-500'
                            : 'border-amber-700 bg-amber-400'
                          : 'border-dashed border-slate-300 bg-slate-100'
                      }`}
                    />
                  );
                })}
              </div>
              <p
                className={`text-xs font-semibold text-center ${
                  isPerfectSquareArray ? 'text-emerald-800' : 'text-amber-900'
                }`}
              >
                {isPerfectSquareArray
                  ? `✓ ${arrayCount} fills a complete ${root} × ${root} square array → Square Number!`
                  : `✕ ${arrayCount} leaves ${gridDim * gridDim - arrayCount} empty gap(s) in a ${gridDim} × ${gridDim} square → NOT a Square Number!`}
              </p>
            </div>
          </div>

          {/* Right: 2-Digit Integer Square Calculator */}
          <div className="md:col-span-6 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
            <h5 className="font-display text-sm font-bold text-slate-900">
              2. Integer Square Calculator (−99 to +99)
            </h5>
            <div className="flex flex-wrap gap-1.5">
              {[-3, 7, 13, -8, 23, -31, 43, 57, -71, 93].map((v) => (
                <button
                  key={v}
                  type="button"
                  onClick={() => setIntInput(v)}
                  className={`rounded-lg border px-2 py-1 font-math text-xs font-semibold cursor-pointer ${
                    safeInt === v
                      ? 'border-sky-700 bg-sky-700 text-white'
                      : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>

            <div>
              <label htmlFor="sq-int" className="block text-xs font-semibold text-slate-700">
                Enter any integer (−99 to 99):
              </label>
              <input
                id="sq-int"
                type="number"
                min={-99}
                max={99}
                value={intInput}
                onChange={(e) => setIntInput(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 font-math text-sm text-slate-900"
              />
            </div>

            <div className="rounded-lg border border-sky-200 bg-sky-50 p-4 space-y-1.5 font-math">
              <p className="text-xs text-sky-800">Step-by-Step Multiplication:</p>
              <p className="text-sm sm:text-base font-bold text-slate-900">
                ({safeInt})² = ({safeInt}) × ({safeInt}) = <span className="text-emerald-700">{sqVal}</span>
              </p>
              <p className="text-xs text-slate-700 font-sans">
                {safeInt < 0
                  ? 'Rule: A negative integer multiplied by itself ALWAYS becomes positive!'
                  : 'Rule: Multiplying a whole number by itself produces a square number.'}
              </p>
            </div>
          </div>
        </div>
      )}

      {tab === 'chart' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <p className="text-xs sm:text-sm text-slate-700">
              <strong>Textbook Activity -4 (p. 16):</strong> Click and shade all the square numbers (1×1, 2×2, ..., 10×10) in red on the 10×10 multiplication chart!
            </p>
            <button
              type="button"
              onClick={() => setChartChecked(true)}
              className="inline-flex items-center gap-1 rounded-lg bg-sky-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer whitespace-nowrap shrink-0"
            >
              <Check className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Check Chart</span>
            </button>
          </div>

          <div className="overflow-x-auto">
            <div className="inline-grid grid-cols-11 gap-1 min-w-[420px]">
              <div className="p-1.5 text-center font-math text-xs font-bold text-slate-500">×</div>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => (
                <div
                  key={`hdr-${col}`}
                  className="p-1.5 text-center font-math text-xs font-bold bg-slate-100 rounded text-slate-800"
                >
                  {col}
                </div>
              ))}
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((row) => (
                <Fragment key={`row-${row}`}>
                  <div className="p-1.5 text-center font-math text-xs font-bold bg-slate-100 rounded text-slate-800">
                    {row}
                  </div>
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((col) => {
                    const key = `${row}-${col}`;
                    const on = Boolean(shadedCells[key]);
                    return (
                      <button
                        key={key}
                        type="button"
                        onClick={() => toggleChartCell(row, col)}
                        className={`p-1.5 rounded border font-math text-xs font-semibold cursor-pointer transition-colors ${
                          on
                            ? 'border-rose-600 bg-rose-500 text-white'
                            : 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50'
                        }`}
                      >
                        {row * col}
                      </button>
                    );
                  })}
                </Fragment>
              ))}
            </div>
          </div>

          {chartChecked && (
            <p
              className={`rounded-lg border px-4 py-2.5 text-xs sm:text-sm font-medium ${
                correctChartCount === 10 && extraShaded === 0
                  ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                  : 'border-amber-200 bg-amber-50 text-amber-950'
              }`}
            >
              {correctChartCount === 10 && extraShaded === 0
                ? '✓ Perfect! Every diagonal cell (1, 4, 9, 16, 25, 36, 49, 64, 81, 100) is shaded!'
                : `You shaded ${correctChartCount}/10 diagonal squares${
                    extraShaded > 0 ? ` and ${extraShaded} non-diagonal cells` : ''
                  }. Look down the main diagonal where Row = Column!`}
            </p>
          )}
        </div>
      )}

      {tab === 'matcher' && (
        <div className="space-y-4">
          <p className="text-xs sm:text-sm text-slate-700">
            <strong>Textbook Activity -5 (p. 18):</strong> Click a square expression on the left, then click its matching square number on the right! ({matchedIds.length}/{MATCH_PAIRS.length} matched)
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500">Square Expressions</p>
              <div className="grid grid-cols-3 gap-2">
                {MATCH_PAIRS.map((p) => {
                  const done = matchedIds.includes(p.id);
                  const active = selectedExprId === p.id;
                  return (
                    <button
                      key={p.id}
                      type="button"
                      disabled={done}
                      onClick={() => {
                        setSelectedExprId(p.id);
                        setMismatchMsg('');
                      }}
                      className={`rounded-lg border py-3 font-math text-sm font-bold cursor-pointer ${
                        done
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 cursor-default'
                          : active
                            ? 'border-sky-700 bg-sky-700 text-white'
                            : 'border-slate-200 bg-slate-50 text-slate-900 hover:bg-slate-100'
                      }`}
                    >
                      {p.expr}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs font-semibold text-slate-500">Matching Square Values</p>
              <div className="grid grid-cols-3 gap-2">
                {SHUFFLED_VALUES.map((val) => {
                  const pair = MATCH_PAIRS.find((p) => p.value === val);
                  const done = pair ? matchedIds.includes(pair.id) : false;
                  return (
                    <button
                      key={val}
                      type="button"
                      disabled={done || !selectedExprId}
                      onClick={() => handleMatchValue(val)}
                      className={`rounded-lg border py-3 font-math text-sm font-bold cursor-pointer ${
                        done
                          ? 'border-emerald-300 bg-emerald-50 text-emerald-800 cursor-default'
                          : selectedExprId
                            ? 'border-sky-300 bg-white text-slate-900 hover:bg-sky-50'
                            : 'border-slate-200 bg-slate-50 text-slate-600'
                      }`}
                    >
                      {val}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {mismatchMsg && (
            <p className="rounded-lg border border-amber-200 bg-amber-50 px-3.5 py-2 text-xs font-medium text-amber-950">
              {mismatchMsg}
            </p>
          )}
          {matchedIds.length === MATCH_PAIRS.length && (
            <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-950">
              ✓ All 6 square blocks matched cleanly!
            </p>
          )}
        </div>
      )}
    </div>
  );
}
