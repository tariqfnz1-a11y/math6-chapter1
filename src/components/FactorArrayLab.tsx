import { useState } from 'react';
import { Check, XCircle, RotateCcw } from 'lucide-react';

const PRESET_NUMBERS = [12, 18, 24, 36, 40, 42];

export function FactorArrayLab() {
  const [dividend, setDividend] = useState<number>(18);
  const [divisor, setDivisor] = useState<number>(6);
  const [discoveredDivisors, setDiscoveredDivisors] = useState<number[]>([6]);

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  const isFactor = remainder === 0;

  const fullRowsCount = quotient;
  const maxDivisor = dividend;

  const handleSelectDividend = (num: number) => {
    setDividend(num);
    const initialDivisor = num === 18 ? 6 : num === 12 ? 3 : 2;
    setDivisor(initialDivisor);
    setDiscoveredDivisors(num % initialDivisor === 0 ? [initialDivisor] : []);
  };

  const handleDivisorChange = (nextDivisor: number) => {
    setDivisor(nextDivisor);
    if (dividend % nextDivisor === 0 && !discoveredDivisors.includes(nextDivisor)) {
      setDiscoveredDivisors((prev) => [...prev, nextDivisor].sort((a, b) => a - b));
    }
  };

  const allTrueFactors = Array.from({ length: dividend }, (_, i) => i + 1).filter(
    (n) => dividend % n === 0
  );

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Interactive Figure 1.1 · Section 1.1.1
          </p>
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Factor Array &amp; Remainder Explorer
          </h3>
        </div>
        <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Select dividend number">
          {PRESET_NUMBERS.map((num) => (
            <button
              key={num}
              type="button"
              onClick={() => handleSelectDividend(num)}
              className={`font-math rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                dividend === num
                  ? 'bg-sky-700 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {/* Two-Zone Sandbox Layout: Visual Canvas (left) + Control & Concept Deck (right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Zone: Interactive Visual Stage */}
        <div className="p-6 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 flex flex-col justify-between bg-white">
          <div>
            <div className="flex flex-wrap items-center justify-between gap-2 mb-4">
              <span className="text-xs font-medium text-slate-600">
                Arranging <strong className="font-math text-slate-900">{dividend}</strong> items into groups of{' '}
                <strong className="font-math text-slate-900">{divisor}</strong>
              </span>
              {isFactor ? (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>FACTOR · Remainder = 0</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-700">
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  <span>NOT A FACTOR · Remainder = {remainder}</span>
                </span>
              )}
            </div>

            {/* Equal Rows Grid */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 space-y-2.5">
              {fullRowsCount === 0 ? (
                <p className="text-xs text-slate-500">Cannot form a full group of {divisor}.</p>
              ) : (
                <div className="space-y-1.5">
                  {Array.from({ length: fullRowsCount }).map((_, rowIdx) => (
                    <div key={rowIdx} className="flex flex-wrap items-center gap-1.5">
                      {Array.from({ length: divisor }).map((__, colIdx) => (
                        <span
                          key={colIdx}
                          className={`h-4 w-4 rounded-sm transition-colors ${
                            isFactor ? 'bg-sky-600' : 'bg-slate-600'
                          }`}
                          aria-hidden="true"
                        />
                      ))}
                      <span className="font-math ml-2 text-[11px] text-slate-500">
                        Row {rowIdx + 1} ({divisor})
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Remainder Leftover Row */}
              {remainder > 0 && (
                <div className="pt-2.5 mt-2.5 border-t border-dashed border-amber-300">
                  <div className="flex flex-wrap items-center gap-1.5">
                    {Array.from({ length: remainder }).map((_, remIdx) => (
                      <span
                        key={remIdx}
                        className="h-4 w-4 rounded-sm bg-amber-500"
                        aria-hidden="true"
                      />
                    ))}
                    <span className="ml-2 text-xs font-semibold text-amber-800">
                      Leftover remainder: {remainder}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Live Textbook Division Equation */}
          <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 px-4 py-3">
            <p className="text-xs text-slate-500 mb-1">
              Textbook Division Check (dividend = quotient × divisor + remainder)
            </p>
            <p className="font-math text-sm sm:text-base font-semibold text-slate-900">
              {dividend} = {quotient} × {divisor} +{' '}
              <span className={isFactor ? 'text-emerald-700' : 'text-amber-700'}>
                {remainder}
              </span>
            </p>
          </div>
        </div>

        {/* Right Zone: Control & Concept Deck */}
        <div className="p-6 lg:col-span-5 bg-slate-50/70 flex flex-col justify-between space-y-5">
          <div>
            <div className="flex items-center justify-between mb-2">
              <label
                htmlFor="divisor-slider"
                className="text-sm font-semibold text-slate-900"
              >
                Test Divisor: <span className="font-math text-sky-700">{divisor}</span>
              </label>
              <span className="font-math text-xs text-slate-500">
                Range: 1 to {maxDivisor}
              </span>
            </div>

            <input
              id="divisor-slider"
              type="range"
              min={1}
              max={maxDivisor}
              value={divisor}
              onChange={(e) => handleDivisorChange(Number(e.target.value))}
              className="w-full accent-sky-700 cursor-pointer"
            />

            <div className="mt-3 flex items-center justify-between gap-2">
              <button
                type="button"
                disabled={divisor <= 1}
                onClick={() => handleDivisorChange(Math.max(1, divisor - 1))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                Previous (−1)
              </button>
              <button
                type="button"
                disabled={divisor >= maxDivisor}
                onClick={() => handleDivisorChange(Math.min(maxDivisor, divisor + 1))}
                className="rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
              >
                Next (+1)
              </button>
            </div>
          </div>

          {/* Factor Discovery Tracker */}
          <div className="rounded-lg border border-slate-200 bg-white p-4">
            <div className="flex items-center justify-between gap-2 mb-2">
              <h4 className="text-xs font-semibold text-slate-900">
                Factors of {dividend} Discovered ({discoveredDivisors.length} of {allTrueFactors.length})
              </h4>
              <button
                type="button"
                onClick={() => setDiscoveredDivisors(allTrueFactors)}
                className="text-xs font-medium text-sky-700 hover:underline cursor-pointer"
              >
                Reveal all
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 min-h-8">
              {discoveredDivisors.length === 0 ? (
                <p className="text-xs text-slate-500">
                  Slide the divisor to find numbers that leave remainder 0.
                </p>
              ) : (
                discoveredDivisors.map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => handleDivisorChange(f)}
                    className="font-math rounded border border-emerald-200 bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-800 hover:bg-emerald-100 cursor-pointer"
                  >
                    {f}
                  </button>
                ))
              )}
            </div>

            {discoveredDivisors.length === allTrueFactors.length && (
              <p className="mt-3 text-xs font-medium text-emerald-700">
                Complete! You found every factor of {dividend}.
              </p>
            )}
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <span>Tip: Both divisor and quotient form a factor pair.</span>
            <button
              type="button"
              onClick={() => {
                setDivisor(1);
                setDiscoveredDivisors([1]);
              }}
              className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Reset</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
