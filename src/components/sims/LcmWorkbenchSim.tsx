import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Mode = 'nuzat' | 'joint' | 'sync';

interface JointRow {
  divisor: number | null;
  values: number[];
}

function computeJointDivision(nums: number[]): { rows: JointRow[]; lcm: number; primes: number[] } {
  let curr = [...nums];
  const rows: JointRow[] = [];
  const primes: number[] = [];

  while (curr.some((v) => v > 1)) {
    const maxVal = Math.max(...curr);
    let chosenPrime = 2;
    for (let p = 2; p <= maxVal; p++) {
      if (curr.some((v) => v % p === 0)) {
        chosenPrime = p;
        break;
      }
    }
    rows.push({ divisor: chosenPrime, values: [...curr] });
    primes.push(chosenPrime);
    curr = curr.map((v) => (v % chosenPrime === 0 ? v / chosenPrime : v));
  }
  rows.push({ divisor: null, values: [...curr] });
  const lcm = primes.reduce((acc, p) => acc * p, 1);
  return { rows, lcm, primes };
}

const JOINT_PRESETS: { label: string; nums: number[] }[] = [
  { label: '10, 15 (Ex. 18)', nums: [10, 15] },
  { label: '54, 144 (Ex. 19)', nums: [54, 144] },
  { label: '16, 24, 36 (Ex. 20)', nums: [16, 24, 36] },
  { label: '7, 9, 15 (Practice -8)', nums: [7, 9, 15] },
  { label: '29, 58, 116 (Ex. 1.4 Q5)', nums: [29, 58, 116] },
  { label: '21, 56, 63 (Thinking Time)', nums: [21, 56, 63] },
  { label: '30, 60, 90, 120 (Traffic)', nums: [30, 60, 90, 120] },
];

export function LcmWorkbenchSim() {
  const [mode, setMode] = useState<Mode>('nuzat');
  // Nuzat's 15x10 square builder
  const [cols, setCols] = useState<number>(2);
  const [rows, setRows] = useState<number>(3);
  // Joint division numbers
  const [numsInput, setNumsInput] = useState<number[]>([16, 24, 36]);
  // Sync timeline scenario
  const [syncScenario, setSyncScenario] = useState<'hailey' | 'ex14q4' | 'gpo'>('gpo');

  const rectW = cols * 15;
  const rectH = rows * 10;
  const isSquare = rectW === rectH;

  const safeNums = numsInput.map((n) => Math.max(2, Math.min(999, Math.floor(n) || 2)));
  const joint = computeJointDivision(safeNums);

  const handleReset = () => {
    setMode('nuzat');
    setCols(2);
    setRows(3);
    setNumsInput([16, 24, 36]);
    setSyncScenario('gpo');
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            L.C.M Square Builder, Joint Division Ladder &amp; Transit Sync Lab
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Build squares with Nuzat&apos;s 15 cm × 10 cm cards, step through the Joint Division bring-down table, or solve real-life bus &amp; traffic light sync problems.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {([
            { id: 'nuzat' as Mode, label: "Nuzat's Square (Ex. 18)" },
            { id: 'joint' as Mode, label: 'Joint Division L.C.M' },
            { id: 'sync' as Mode, label: 'Bus & Traffic Lights' },
          ]).map((m) => (
            <button
              key={m.id}
              type="button"
              onClick={() => setMode(m.id)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                mode === m.id
                  ? 'bg-sky-700 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {m.label}
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

      {mode === 'nuzat' && (
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-5 space-y-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <p className="text-xs font-semibold text-slate-800">
              Adjust columns (15 cm wide) and rows (10 cm tall) until Total Width = Total Height!
            </p>
            <div>
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="nuzat-cols">Columns (× 15 cm)</label>
                <span className="font-math text-sky-800">
                  {cols} → {rectW} cm
                </span>
              </div>
              <input
                id="nuzat-cols"
                type="range"
                min={1}
                max={6}
                value={cols}
                onChange={(e) => setCols(Number(e.target.value))}
                className="mt-1.5 w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold">
                <label htmlFor="nuzat-rows">Rows (× 10 cm)</label>
                <span className="font-math text-sky-800">
                  {rows} → {rectH} cm
                </span>
              </div>
              <input
                id="nuzat-rows"
                type="range"
                min={1}
                max={6}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="mt-1.5 w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div
              className={`rounded-lg border p-3 text-xs font-medium ${
                isSquare
                  ? rectW === 30
                    ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                    : 'border-sky-200 bg-sky-50 text-sky-950'
                  : 'border-amber-200 bg-amber-50 text-amber-950'
              }`}
            >
              {isSquare
                ? rectW === 30
                  ? '✓ Smallest Square Found! 30 cm × 30 cm uses 2×3 = 6 cards. L.C.M(15, 10) = 30 cm!'
                  : `✓ Square of ${rectW} cm × ${rectH} cm (${rectW} is a common multiple, though 30 cm is the LEAST common multiple).`
                : `Not a square yet: Width (${rectW} cm) ≠ Height (${rectH} cm). Try matching them!`}
            </div>
          </div>

          <div className="md:col-span-7 flex justify-center">
            <svg
              viewBox="0 0 380 260"
              className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50"
              role="img"
              aria-label={`${cols} by ${rows} grid of 15 by 10 rectangles`}
            >
              {Array.from({ length: rows }).map((_, r) =>
                Array.from({ length: cols }).map((__, c) => (
                  <g key={`${r}-${c}`}>
                    <rect
                      x={20 + c * 52}
                      y={20 + r * 35}
                      width="52"
                      height="35"
                      fill={isSquare ? '#D1FAE5' : '#E0F2FE'}
                      stroke={isSquare ? '#059669' : '#0284C7'}
                      strokeWidth="1.5"
                    />
                    <text
                      x={20 + c * 52 + 26}
                      y={20 + r * 35 + 21}
                      textAnchor="middle"
                      fontSize="10"
                      fontWeight="700"
                      fontFamily="IBM Plex Mono, monospace"
                      fill="#0F172A"
                    >
                      15×10
                    </text>
                  </g>
                ))
              )}
              <text x="20" y="246" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                Total Size: {rectW} cm × {rectH} cm ({cols * rows} cards)
              </text>
            </svg>
          </div>
        </div>
      )}

      {mode === 'joint' && (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Textbook Presets:</span>
            {JOINT_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => setNumsInput(p.nums)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-math font-semibold text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            {numsInput.map((val, idx) => (
              <div key={idx}>
                <label htmlFor={`lcm-joint-num-${idx}`} className="block text-xs font-semibold text-slate-700">
                  Number {idx + 1}
                </label>
                <input
                  id={`lcm-joint-num-${idx}`}
                  type="number"
                  min={2}
                  max={999}
                  value={val}
                  onChange={(e) => {
                    const next = [...numsInput];
                    next[idx] = Number(e.target.value);
                    setNumsInput(next);
                  }}
                  className="mt-1 w-20 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-math text-sm text-slate-900"
                />
              </div>
            ))}
            {numsInput.length < 4 && (
              <button
                type="button"
                onClick={() => setNumsInput((prev) => [...prev, 12])}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                + Add Number
              </button>
            )}
            {numsInput.length > 2 && (
              <button
                type="button"
                onClick={() => setNumsInput((prev) => prev.slice(0, -1))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                Remove Last
              </button>
            )}

            <div className="ml-auto rounded-lg border border-sky-200 bg-sky-50 px-4 py-2 text-right">
              <p className="text-[11px] font-medium text-sky-800">Calculated L.C.M</p>
              <p className="font-math text-lg font-bold text-sky-950">{joint.lcm}</p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 overflow-x-auto">
            <table className="w-full text-left font-math text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500">
                  <th className="py-2 pr-4 w-28">Prime Divisor</th>
                  <th className="py-2 px-3">Numbers (bring down if not divisible)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {joint.rows.map((r, idx) => (
                  <tr key={idx}>
                    <td className="py-2 pr-4 font-bold text-sky-700 border-r-2 border-slate-300">
                      {r.divisor ?? '—'}
                    </td>
                    <td className="py-2 px-3 font-semibold text-slate-900">
                      {r.values.join('   ,   ')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="mt-4 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 font-math text-xs sm:text-sm font-bold text-emerald-950">
              L.C.M = {joint.primes.join(' × ')} = {joint.lcm}
            </p>
          </div>
        </div>
      )}

      {mode === 'sync' && (
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setSyncScenario('gpo')}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                syncScenario === 'gpo'
                  ? 'border-sky-700 bg-sky-700 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            >
              GPO Traffic Lights (Ex. 1.4 Q6)
            </button>
            <button
              type="button"
              onClick={() => setSyncScenario('hailey')}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                syncScenario === 'hailey'
                  ? 'border-sky-700 bg-sky-700 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            >
              Hailey College Transit (p. 1 Opener)
            </button>
            <button
              type="button"
              onClick={() => setSyncScenario('ex14q4')}
              className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer ${
                syncScenario === 'ex14q4'
                  ? 'border-sky-700 bg-sky-700 text-white'
                  : 'border-slate-200 bg-slate-50 text-slate-800'
              }`}
            >
              Bus 280s &amp; Train 360s (Ex. 1.4 Q4)
            </button>
          </div>

          {syncScenario === 'gpo' && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2 text-sm text-slate-800">
              <p className="font-display font-bold text-slate-900">
                GPO Chowk Traffic Lights: 30 s, 60 s, 90 s, 120 s (Starting at 9:00 a.m.)
              </p>
              <p className="font-math text-xs sm:text-sm">
                L.C.M(30, 60, 90, 120) = 360 seconds = 360 ÷ 60 = 6 minutes.
              </p>
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-950">
                Verified Answer: 9:00 a.m. + 6 minutes = 9:06 a.m. (Note: Textbook p. 182 key has a typo printing 09:00 pm; 9:06 a.m. is mathematically verified!)
              </p>
            </div>
          )}

          {syncScenario === 'hailey' && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2 text-sm text-slate-800">
              <p className="font-display font-bold text-slate-900">
                Chapter Opener Solved! Bus every 180 s, Orange Train every 360 s
              </p>
              <p className="font-math text-xs sm:text-sm">
                Because 180 is a factor of 360, L.C.M(180, 360) = 360 seconds = 6 minutes!
              </p>
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-950">
                Remember Rule (p. 13): When one number is a factor of the other, their L.C.M is always the greater number!
              </p>
            </div>
          )}

          {syncScenario === 'ex14q4' && (
            <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-5 space-y-2 text-sm text-slate-800">
              <p className="font-display font-bold text-slate-900">
                Exercise 1.4 Q4: Bus every 280 s, Orange Train every 360 s
              </p>
              <p className="font-math text-xs sm:text-sm">
                280 = 2³ × 5 × 7; 360 = 2³ × 3² × 5 → L.C.M = 2³ × 3² × 5 × 7 = 2,520 seconds.
              </p>
              <p className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2.5 text-xs sm:text-sm font-semibold text-emerald-950">
                2,520 seconds ÷ 60 = 42 minutes until they arrive together again!
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
