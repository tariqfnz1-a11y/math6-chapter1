import { useState } from 'react';
import { RotateCcw } from 'lucide-react';

type Mode = 'sieve' | 'array';
type RangeMax = 30 | 60 | 100;

const SIEVE_STEPS = [
  { key: 'circle1', label: 'Step 1: Circle 1 (Neither)', prime: 1 },
  { key: 'shade2', label: 'Step 2: Shade multiples of 2 (>2)', prime: 2 },
  { key: 'shade3', label: 'Step 3: Shade multiples of 3 (>3)', prime: 3 },
  { key: 'shade5', label: 'Step 4: Shade multiples of 5 (>5)', prime: 5 },
  { key: 'shade7', label: 'Step 5: Shade multiples of 7 (>7)', prime: 7 },
] as const;

function getFactors(n: number): number[] {
  const f: number[] = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) f.push(i);
  }
  return f;
}

function isPrimeNumber(n: number): boolean {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) return false;
  }
  return true;
}

export function PrimeCompositeSieveSim() {
  const [mode, setMode] = useState<Mode>('sieve');
  const [rangeMax, setRangeMax] = useState<RangeMax>(100);
  const [activeSteps, setActiveSteps] = useState<Record<string, boolean>>({});
  const [showTwinPrimes, setShowTwinPrimes] = useState(false);
  const [selectedNum, setSelectedNum] = useState<number>(29);

  const toggleStep = (key: string) => {
    setActiveSteps((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleRunAllSieve = () => {
    setActiveSteps({
      circle1: true,
      shade2: true,
      shade3: true,
      shade5: true,
      shade7: true,
    });
  };

  const handleReset = () => {
    setActiveSteps({});
    setShowTwinPrimes(false);
    setSelectedNum(29);
    setRangeMax(100);
  };

  const getCellState = (n: number): 'neither' | 'shaded2' | 'shaded3' | 'shaded5' | 'shaded7' | 'prime' | 'open' => {
    if (n === 1) return activeSteps.circle1 ? 'neither' : 'open';
    if (activeSteps.shade2 && n > 2 && n % 2 === 0) return 'shaded2';
    if (activeSteps.shade3 && n > 3 && n % 3 === 0) return 'shaded3';
    if (activeSteps.shade5 && n > 5 && n % 5 === 0) return 'shaded5';
    if (activeSteps.shade7 && n > 7 && n % 7 === 0) return 'shaded7';
    const allDone =
      activeSteps.circle1 &&
      activeSteps.shade2 &&
      activeSteps.shade3 &&
      activeSteps.shade5 &&
      activeSteps.shade7;
    if (allDone && isPrimeNumber(n)) return 'prime';
    return 'open';
  };

  const isTwinPrime = (n: number): boolean => {
    if (!isPrimeNumber(n)) return false;
    return (n - 2 >= 2 && isPrimeNumber(n - 2)) || (n + 2 <= rangeMax && isPrimeNumber(n + 2));
  };

  const factors = getFactors(selectedNum);
  const selectedIsPrime = isPrimeNumber(selectedNum);
  const factorPairs: [number, number][] = [];
  for (let i = 1; i * i <= selectedNum; i++) {
    if (selectedNum % i === 0) {
      factorPairs.push([i, selectedNum / i]);
    }
  }

  const allSieveCompleted =
    activeSteps.circle1 &&
    activeSteps.shade2 &&
    activeSteps.shade3 &&
    activeSteps.shade5 &&
    activeSteps.shade7;

  const discoveredPrimes = Array.from({ length: rangeMax }, (_, i) => i + 1).filter(isPrimeNumber);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            Sieve of Eratosthenes &amp; Factor-Count Array Lab
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Run Eratosthenes&apos;s step-by-step sieve on 1–100 to filter out composite numbers, or inspect any number&apos;s rectangular factor arrays.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setMode('sieve')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              mode === 'sieve'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Sieve of Eratosthenes
          </button>
          <button
            type="button"
            onClick={() => setMode('array')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              mode === 'array'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Array Explorer
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

      {mode === 'sieve' ? (
        <div className="space-y-5">
          {/* Difficulty / Grid Range + Step Controls */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-1.5">
              <span className="text-xs font-medium text-slate-500 mr-1">Level Range:</span>
              {([
                { max: 30 as RangeMax, label: 'Easy (1–30)' },
                { max: 60 as RangeMax, label: 'Medium (1–60)' },
                { max: 100 as RangeMax, label: 'Challenge (1–100)' },
              ]).map((r) => (
                <button
                  key={r.max}
                  type="button"
                  onClick={() => setRangeMax(r.max)}
                  className={`rounded-lg px-2.5 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                    rangeMax === r.max
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {r.label}
                </button>
              ))}
            </div>

            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleRunAllSieve}
                className="rounded-lg bg-emerald-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-800 cursor-pointer whitespace-nowrap shrink-0"
              >
                Complete All Steps
              </button>
              <button
                type="button"
                onClick={() => setShowTwinPrimes((v) => !v)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                  showTwinPrimes
                    ? 'border-sky-700 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {showTwinPrimes ? 'Hide Twin Primes' : 'Highlight Twin Primes'}
              </button>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {SIEVE_STEPS.map((st) => {
              const on = Boolean(activeSteps[st.key]);
              return (
                <button
                  key={st.key}
                  type="button"
                  onClick={() => toggleStep(st.key)}
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                    on
                      ? 'border-sky-700 bg-sky-700 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                  }`}
                >
                  {st.label}
                </button>
              );
            })}
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
            <div className="lg:col-span-8">
              <div className="grid grid-cols-10 gap-1 sm:gap-1.5">
                {Array.from({ length: rangeMax }, (_, i) => i + 1).map((n) => {
                  const st = getCellState(n);
                  const twin = showTwinPrimes && isTwinPrime(n);
                  const isSel = selectedNum === n;

                  let cls = 'border-slate-200 bg-white text-slate-900';
                  if (st === 'neither') cls = 'border-amber-500 bg-amber-100 text-amber-950 font-bold';
                  else if (st === 'shaded2') cls = 'border-rose-200 bg-rose-100/80 text-rose-800 line-through';
                  else if (st === 'shaded3') cls = 'border-orange-200 bg-orange-100/80 text-orange-800 line-through';
                  else if (st === 'shaded5') cls = 'border-purple-200 bg-purple-100/80 text-purple-800 line-through';
                  else if (st === 'shaded7') cls = 'border-indigo-200 bg-indigo-100/80 text-indigo-800 line-through';
                  else if (st === 'prime') cls = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-bold';

                  if (twin) {
                    cls += ' ring-2 ring-sky-500';
                  }

                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setSelectedNum(n)}
                      aria-label={`Number ${n}, ${
                        st === 'neither'
                          ? 'neither prime nor composite'
                          : st === 'prime'
                            ? 'prime'
                            : st === 'open'
                              ? 'not yet shaded'
                              : 'shaded composite'
                      }`}
                      className={`min-w-0 rounded border py-1.5 sm:py-2 font-math text-[11px] sm:text-sm text-center cursor-pointer transition-colors ${cls} ${
                        isSel ? 'outline-2 outline-offset-1 outline-slate-900' : ''
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Side Inspector */}
            <div className="lg:col-span-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
              <p className="text-xs font-medium text-slate-500">Cell Inspector (click any number)</p>
              <div className="flex items-baseline justify-between">
                <span className="font-math text-2xl font-bold text-slate-900">{selectedNum}</span>
                <span
                  className={`text-xs font-bold ${
                    selectedNum === 1
                      ? 'text-amber-800'
                      : selectedIsPrime
                        ? 'text-emerald-800'
                        : 'text-sky-800'
                  }`}
                >
                  {selectedNum === 1
                    ? 'Neither Prime Nor Composite'
                    : selectedIsPrime
                      ? 'Prime Number (P)'
                      : 'Composite Number (C)'}
                </span>
              </div>
              <p className="text-xs text-slate-700">
                <strong>Factors ({factors.length}):</strong>{' '}
                <span className="font-math">{factors.join(', ')}</span>
              </p>
              <p className="text-xs text-slate-600 leading-relaxed">
                {selectedNum === 1
                  ? '1 has only 1 factor (itself), so it is neither prime nor composite.'
                  : selectedIsPrime
                    ? `${selectedNum} has exactly 2 different factors (1 and ${selectedNum}), so it remains unshaded in the Sieve!`
                    : `${selectedNum} has ${factors.length} factors (> 2), so it gets shaded as a composite multiple.`}
              </p>

              {allSieveCompleted && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 space-y-1">
                  <p className="font-bold">
                    Primes left unshaded (1–{rangeMax}): {discoveredPrimes.length} primes
                  </p>
                  <p className="font-math leading-relaxed">{discoveredPrimes.join(', ')}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Textbook Examples:</span>
            {[7, 12, 29, 38, 41, 51, 56].map((n) => (
              <button
                key={n}
                type="button"
                onClick={() => setSelectedNum(n)}
                className={`rounded-lg border px-3 py-1.5 font-math text-xs font-semibold cursor-pointer ${
                  selectedNum === n
                    ? 'border-sky-700 bg-sky-700 text-white'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {n}
              </button>
            ))}
            <label htmlFor="sim14-num" className="text-xs font-medium text-slate-600 ml-2">
              Or enter (2–60):
            </label>
            <input
              id="sim14-num"
              type="number"
              min={1}
              max={60}
              value={selectedNum}
              onChange={(e) => setSelectedNum(Math.max(1, Math.min(60, Number(e.target.value) || 1)))}
              className="w-20 rounded-lg border border-slate-300 bg-white px-2.5 py-1 font-math text-xs text-slate-900"
            />
          </div>

          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-3">
            <p className="text-sm font-semibold text-slate-900">
              <span className="font-math text-sky-800">{selectedNum}</span> has{' '}
              <span className="font-math">{factors.length}</span> factors ({factors.join(', ')}) →{' '}
              <strong>
                {selectedNum === 1
                  ? 'Neither Prime Nor Composite'
                  : selectedIsPrime
                    ? 'Prime (only 1 rectangular row possible!)'
                    : `Composite (${factorPairs.length} rectangular arrangements)`}
              </strong>
            </p>
            <div className="flex flex-wrap gap-4">
              {factorPairs.map(([rows, cols]) => (
                <div
                  key={`${rows}x${cols}`}
                  className="rounded-lg border border-slate-200 bg-white p-3 space-y-2"
                >
                  <p className="font-math text-xs font-semibold text-slate-700">
                    {rows} × {cols} = {selectedNum}
                  </p>
                  <div
                    className="grid gap-1"
                    style={{ gridTemplateColumns: `repeat(${Math.min(cols, 15)}, minmax(0, 10px))` }}
                  >
                    {Array.from({ length: Math.min(selectedNum, rows * Math.min(cols, 15)) }).map(
                      (_, idx) => (
                        <span
                          key={idx}
                          className={`h-2.5 w-2.5 rounded-full ${
                            selectedIsPrime ? 'bg-sky-600' : 'bg-emerald-600'
                          }`}
                        />
                      )
                    )}
                  </div>
                  {cols > 15 && (
                    <p className="text-[10px] text-slate-500 font-math">
                      ({cols} dots wide)
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
