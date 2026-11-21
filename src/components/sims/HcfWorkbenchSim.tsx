import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Mode = 'tiling' | 'prime-hcf' | 'long-div';

interface DivStep {
  dividend: number;
  divisor: number;
  quotient: number;
  remainder: number;
}

function gcdTwo(a: number, b: number): { hcf: number; steps: DivStep[] } {
  let x = Math.max(a, b);
  let y = Math.min(a, b);
  const steps: DivStep[] = [];
  while (y > 0) {
    const q = Math.floor(x / y);
    const r = x - q * y;
    steps.push({ dividend: x, divisor: y, quotient: q, remainder: r });
    x = y;
    y = r;
  }
  return { hcf: x, steps };
}

function getPrimeList(n: number): number[] {
  const res: number[] = [];
  let x = n;
  let d = 2;
  while (x > 1 && d * d <= x) {
    while (x % d === 0) {
      res.push(d);
      x /= d;
    }
    d++;
  }
  if (x > 1) res.push(x);
  return res;
}

const PRESETS: { label: string; nums: number[]; level: string }[] = [
  { label: '27, 54, 315 (Ex. 14)', nums: [27, 54, 315], level: 'Easy' },
  { label: '45, 110 (Ex. 15)', nums: [45, 110], level: 'Easy' },
  { label: '108, 144 (Ex. 16)', nums: [108, 144], level: 'Medium' },
  { label: '65, 91, 117 (Ex. 17)', nums: [65, 91, 117], level: 'Medium' },
  { label: '160, 280, 200 (Practice -7)', nums: [160, 280, 200], level: 'Challenge' },
  { label: '1015, 880 (Ex. 1.3 Q7)', nums: [1015, 880], level: 'Challenge' },
];

export function HcfWorkbenchSim() {
  const [mode, setMode] = useState<Mode>('tiling');
  const [tileSize, setTileSize] = useState<number>(10);
  const [useThree, setUseThree] = useState<boolean>(true);
  const [n1, setN1] = useState<number>(27);
  const [n2, setN2] = useState<number>(54);
  const [n3, setN3] = useState<number>(315);

  const a = Math.max(2, Math.min(3999, Math.floor(n1) || 27));
  const b = Math.max(2, Math.min(3999, Math.floor(n2) || 54));
  const c = Math.max(2, Math.min(3999, Math.floor(n3) || 315));

  const firstPair = gcdTwo(a, b);
  const secondPair = useThree ? gcdTwo(firstPair.hcf, c) : null;
  const finalHcf = secondPair ? secondPair.hcf : firstPair.hcf;
  const isCoprime = finalHcf === 1;

  // Prime factorization common matcher
  const activeNums = useThree ? [a, b, c] : [a, b];
  const primeLists = activeNums.map((v) => getPrimeList(v));
  const commonPrimes: number[] = [];
  const remainingCopies = primeLists.map((arr) => [...arr]);
  for (const p of primeLists[0]) {
    const allHave = remainingCopies.slice(1).every((arr) => arr.includes(p));
    if (allHave) {
      commonPrimes.push(p);
      remainingCopies.slice(1).forEach((arr) => {
        const idx = arr.indexOf(p);
        if (idx !== -1) arr.splice(idx, 1);
      });
    }
  }

  // Alisha's 70 x 50 tiling checks
  const fitsWidth = 70 % tileSize === 0;
  const fitsHeight = 50 % tileSize === 0;
  const tilesAlongW = Math.floor(70 / tileSize);
  const tilesAlongH = Math.floor(50 / tileSize);

  const handleSelectPreset = (nums: number[]) => {
    setN1(nums[0]);
    setN2(nums[1]);
    if (nums.length === 3) {
      setUseThree(true);
      setN3(nums[2]);
    } else {
      setUseThree(false);
    }
  };

  const handleReset = () => {
    setMode('tiling');
    setTileSize(10);
    setUseThree(true);
    setN1(27);
    setN2(54);
    setN3(315);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            H.C.F Paper-Tiling, Prime Factorization &amp; Long Division Lab
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Explore Alisha&apos;s square tile experiment (Example 13), match common prime factors, or step through the Long Division H.C.F cascade.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {([
            { id: 'tiling' as Mode, label: "Alisha's Square Tiles" },
            { id: 'prime-hcf' as Mode, label: 'Prime Factor H.C.F' },
            { id: 'long-div' as Mode, label: 'Long Division H.C.F' },
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

      {mode === 'tiling' ? (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-slate-700">
              Try square tile side length on 70 cm × 50 cm sheet:
            </span>
            {[2, 5, 7, 10, 14, 25].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setTileSize(s)}
                className={`rounded-lg border px-3 py-1.5 font-math text-xs font-semibold cursor-pointer ${
                  tileSize === s
                    ? 'border-sky-700 bg-sky-700 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {s} cm × {s} cm
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-7">
              <svg
                viewBox="0 0 380 270"
                className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50"
                role="img"
                aria-label={`Tiling a 70 cm by 50 cm rectangle with ${tileSize} cm squares`}
              >
                {/* Sheet outline scaled ×5: 350 × 250 */}
                <rect x="15" y="10" width="350" height="250" fill="#FEF3C7" stroke="#94A3B8" strokeWidth="2" />
                {Array.from({ length: tilesAlongH }).map((_, r) =>
                  Array.from({ length: tilesAlongW }).map((__, col) => (
                    <rect
                      key={`${r}-${col}`}
                      x={15 + col * tileSize * 5}
                      y={10 + r * tileSize * 5}
                      width={tileSize * 5}
                      height={tileSize * 5}
                      fill={fitsWidth && fitsHeight ? '#BAE6FD' : '#E2E8F0'}
                      stroke="#0284C7"
                      strokeWidth="1"
                    />
                  ))
                )}
              </svg>
            </div>
            <div className="md:col-span-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3 text-xs sm:text-sm">
              <p className="font-display text-base font-bold text-slate-900">
                Tile Size: <span className="font-math">{tileSize} cm × {tileSize} cm</span>
              </p>
              <p className="font-math text-slate-700">
                Width 70 cm ÷ {tileSize} = {Math.floor(70 / tileSize)} (rem {70 % tileSize} cm)
              </p>
              <p className="font-math text-slate-700">
                Height 50 cm ÷ {tileSize} = {Math.floor(50 / tileSize)} (rem {50 % tileSize} cm)
              </p>
              <div
                className={`rounded-lg border p-3 font-medium ${
                  fitsWidth && fitsHeight
                    ? tileSize === 10
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-950'
                      : 'border-sky-200 bg-sky-50 text-sky-950'
                    : 'border-amber-200 bg-amber-50 text-amber-950'
                }`}
              >
                {fitsWidth && fitsHeight
                  ? tileSize === 10
                    ? '✓ Largest Possible Square! 10 cm is the H.C.F of 70 and 50 (35 exact squares, 0 waste).'
                    : `✓ ${tileSize} cm tiles fit cleanly (${tilesAlongW * tilesAlongH} squares), because ${tileSize} is a common factor—but can we use a LARGER square?`
                  : `✕ Leaves leftover strip! ${tileSize} is NOT a common factor of both 70 and 50.`}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {/* Shared Number Controls & Presets */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Textbook Presets:</span>
            {PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSelectPreset(p.nums)}
                className="rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-math font-semibold text-slate-800 hover:bg-slate-100 cursor-pointer"
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-end gap-3 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div>
              <label htmlFor="hcf-n1" className="block text-xs font-semibold text-slate-700">
                1st Number
              </label>
              <input
                id="hcf-n1"
                type="number"
                min={2}
                max={3999}
                value={n1}
                onChange={(e) => setN1(Number(e.target.value))}
                className="mt-1 w-24 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-math text-sm text-slate-900"
              />
            </div>
            <div>
              <label htmlFor="hcf-n2" className="block text-xs font-semibold text-slate-700">
                2nd Number
              </label>
              <input
                id="hcf-n2"
                type="number"
                min={2}
                max={3999}
                value={n2}
                onChange={(e) => setN2(Number(e.target.value))}
                className="mt-1 w-24 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-math text-sm text-slate-900"
              />
            </div>
            {useThree && (
              <div>
                <label htmlFor="hcf-n3" className="block text-xs font-semibold text-slate-700">
                  3rd Number
                </label>
                <input
                  id="hcf-n3"
                  type="number"
                  min={2}
                  max={3999}
                  value={n3}
                  onChange={(e) => setN3(Number(e.target.value))}
                  className="mt-1 w-24 rounded-lg border border-slate-300 bg-white px-2.5 py-1.5 font-math text-sm text-slate-900"
                />
              </div>
            )}
            <button
              type="button"
              onClick={() => setUseThree((v) => !v)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              {useThree ? 'Switch to 2 Numbers' : '+ Add 3rd Number'}
            </button>

            <div className="ml-auto rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-2 text-right">
              <p className="text-[11px] font-medium text-emerald-800">Verified H.C.F (G.C.D)</p>
              <p className="font-math text-lg font-bold text-emerald-950">
                {finalHcf} {isCoprime ? '(Co-prime!)' : ''}
              </p>
            </div>
          </div>

          {mode === 'prime-hcf' ? (
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-3">
              <p className="text-xs font-semibold text-slate-700">
                Prime Factorization of each number (circle factors common to ALL {activeNums.length} numbers):
              </p>
              <div className="space-y-2 font-math text-sm">
                {activeNums.map((val, idx) => (
                  <p key={`${val}-${idx}`} className="rounded border border-slate-200 bg-slate-50 px-3 py-2">
                    <span className="font-bold text-slate-900">{val}</span> ={' '}
                    <span className="text-sky-800">{primeLists[idx].join(' × ')}</span>
                  </p>
                ))}
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-xs sm:text-sm text-emerald-950">
                <strong>Common prime factors across all numbers:</strong>{' '}
                <span className="font-math font-bold">
                  {commonPrimes.length > 0 ? `${commonPrimes.join(' × ')} = ${finalHcf}` : 'None except 1 → H.C.F = 1 (Co-prime!)'}
                </span>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                <p className="text-xs font-bold text-slate-900">
                  Step-I: Long Division of {Math.max(a, b)} and {Math.min(a, b)}
                </p>
                <ol className="space-y-1.5 font-math text-xs text-slate-700 list-decimal pl-4">
                  {firstPair.steps.map((st, idx) => (
                    <li key={idx}>
                      {st.dividend} ÷ {st.divisor} = {st.quotient} (rem {st.remainder})
                    </li>
                  ))}
                </ol>
                <p className="text-xs font-bold text-sky-900">
                  H.C.F({a}, {b}) = {firstPair.hcf}
                </p>
              </div>

              {secondPair && (
                <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                  <p className="text-xs font-bold text-slate-900">
                    Step-II: Long Division of {firstPair.hcf} and {c}
                  </p>
                  <ol className="space-y-1.5 font-math text-xs text-slate-700 list-decimal pl-4">
                    {secondPair.steps.map((st, idx) => (
                      <li key={idx}>
                        {st.dividend} ÷ {st.divisor} = {st.quotient} (rem {st.remainder})
                      </li>
                    ))}
                  </ol>
                  <p className="text-xs font-bold text-emerald-900">
                    Final H.C.F({a}, {b}, {c}) = {secondPair.hcf}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
