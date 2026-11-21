import { useState } from 'react';
import { Check, HelpCircle, RotateCcw, XCircle } from 'lucide-react';

type Level = 'easy' | 'medium' | 'challenge';

interface Preset {
  label: string;
  dividend: number;
  divisor: number;
  source: string;
}

const PRESETS: Record<Level, Preset[]> = {
  easy: [
    { label: '30 ÷ 5 (Ex. 5)', dividend: 30, divisor: 5, source: 'Example 5 (i), p. 4' },
    { label: '30 ÷ 7 (Ex. 5)', dividend: 30, divisor: 7, source: 'Example 5 (ii), p. 4' },
    { label: '36 ÷ 9 (Practice -3)', dividend: 36, divisor: 9, source: 'Practice -3, p. 4' },
    { label: '76 ÷ 4 (Practice -3)', dividend: 76, divisor: 4, source: 'Practice -3, p. 4' },
  ],
  medium: [
    { label: '120 ÷ 15', dividend: 120, divisor: 15, source: '3-digit factor check' },
    { label: '230 ÷ 23', dividend: 230, divisor: 23, source: '3-digit factor check' },
    { label: '165 ÷ 11 (Ex. 1.1)', dividend: 165, divisor: 11, source: 'Exercise 1.1, p. 6' },
    { label: '220 ÷ 16', dividend: 220, divisor: 16, source: '3-digit remainder check' },
  ],
  challenge: [
    { label: '625 ÷ 25 (Ex. 6)', dividend: 625, divisor: 25, source: 'Example 6 (i), p. 4' },
    { label: '625 ÷ 17 (Ex. 6)', dividend: 625, divisor: 17, source: 'Example 6 (ii), p. 4' },
    { label: '840 ÷ 24', dividend: 840, divisor: 24, source: '3-digit high check' },
    { label: '945 ÷ 19', dividend: 945, divisor: 19, source: '3-digit non-factor' },
  ],
};

export function FactorVerifier3DigitSim() {
  const [level, setLevel] = useState<Level>('challenge');
  const [dividend, setDividend] = useState<number>(625);
  const [divisor, setDivisor] = useState<number>(25);
  const [prediction, setPrediction] = useState<'yes' | 'no' | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const safeDividend = Math.max(10, Math.min(999, Math.floor(dividend) || 10));
  const safeDivisor = Math.max(1, Math.min(safeDividend, Math.floor(divisor) || 1));

  const quotient = Math.floor(safeDividend / safeDivisor);
  const product = quotient * safeDivisor;
  const remainder = safeDividend - product;
  const isFactor = remainder === 0;

  const predictionCorrect =
    prediction !== null && ((prediction === 'yes' && isFactor) || (prediction === 'no' && !isFactor));

  const handleSelectPreset = (p: Preset) => {
    setDividend(p.dividend);
    setDivisor(p.divisor);
    setPrediction(null);
    setChecked(false);
    setShowHint(false);
  };

  const handleLevelChange = (next: Level) => {
    setLevel(next);
    const first = PRESETS[next][0];
    setDividend(first.dividend);
    setDivisor(first.divisor);
    setPrediction(null);
    setChecked(false);
    setShowHint(false);
  };

  const handleReset = () => {
    setLevel('challenge');
    setDividend(625);
    setDivisor(25);
    setPrediction(null);
    setChecked(false);
    setShowHint(false);
  };

  // Visual proportional bar width
  const fillPercent = Math.round((product / safeDividend) * 100);

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            3-Digit Factor Verifier Lab
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Choose a 2- or 3-digit dividend (up to 999) and a divisor, predict whether it divides evenly, then run the division check.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {(['easy', 'medium', 'challenge'] as Level[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => handleLevelChange(lvl)}
              className={`rounded-lg px-3 py-1.5 text-xs font-semibold capitalize cursor-pointer whitespace-nowrap shrink-0 ${
                level === lvl
                  ? 'bg-sky-700 text-white'
                  : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
              }`}
            >
              {lvl}
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

      {/* Textbook Presets */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">Quick Textbook Tests ({level}):</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS[level].map((p) => {
            const active = safeDividend === p.dividend && safeDivisor === p.divisor;
            return (
              <button
                key={p.label}
                type="button"
                onClick={() => handleSelectPreset(p)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-math font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                  active
                    ? 'border-sky-700 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Controls + Prediction */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        <div className="md:col-span-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <label htmlFor="sim12-dividend">Dividend (up to 999)</label>
              <span className="font-math text-sm text-sky-800">{safeDividend}</span>
            </div>
            <input
              id="sim12-dividend"
              type="range"
              min={level === 'easy' ? 12 : 100}
              max={level === 'easy' ? 99 : level === 'medium' ? 400 : 999}
              value={safeDividend}
              onChange={(e) => {
                setDividend(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full accent-sky-700 cursor-pointer"
            />
            <input
              type="number"
              min={10}
              max={999}
              value={dividend}
              aria-label="Enter dividend manually"
              onChange={(e) => {
                setDividend(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm text-slate-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <label htmlFor="sim12-divisor">Test Divisor</label>
              <span className="font-math text-sm text-sky-800">{safeDivisor}</span>
            </div>
            <input
              id="sim12-divisor"
              type="range"
              min={2}
              max={Math.min(99, safeDividend)}
              value={Math.min(safeDivisor, safeDividend)}
              onChange={(e) => {
                setDivisor(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full accent-sky-700 cursor-pointer"
            />
            <input
              type="number"
              min={1}
              max={999}
              value={divisor}
              aria-label="Enter divisor manually"
              onChange={(e) => {
                setDivisor(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm text-slate-900"
            />
          </div>

          {/* Prediction Step */}
          <div className="pt-2 border-t border-slate-200 space-y-2.5">
            <p className="text-xs font-semibold text-slate-900">
              Your Prediction: Is <span className="font-math">{safeDivisor}</span> a factor of{' '}
              <span className="font-math">{safeDividend}</span>?
            </p>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => {
                  setPrediction('yes');
                  setChecked(true);
                }}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer ${
                  prediction === 'yes'
                    ? 'border-sky-700 bg-sky-700 text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                Yes (Rem = 0)
              </button>
              <button
                type="button"
                onClick={() => {
                  setPrediction('no');
                  setChecked(true);
                }}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer ${
                  prediction === 'no'
                    ? 'border-sky-700 bg-sky-700 text-white'
                    : 'border-slate-300 bg-white text-slate-800 hover:bg-slate-50'
                }`}
              >
                No (Rem &gt; 0)
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowHint((h) => !h)}
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-800 hover:underline cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{showHint ? 'Hide Clue' : 'Need a Divisibility Clue?'}</span>
            </button>
            {showHint && (
              <p className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-950">
                Think: Does {safeDivisor} × some whole number equal {safeDividend} exactly? Try
                estimating {safeDivisor} × {Math.max(1, Math.floor(safeDividend / safeDivisor))}.
              </p>
            )}
          </div>
        </div>

        {/* Visual Division Breakdown & Step-by-Step Result */}
        <div className="md:col-span-7 rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h5 className="font-display text-base font-bold text-slate-900">
              Visual Division Strip &amp; Equation Check
            </h5>
            <span className="font-math text-xs text-slate-500">
              {safeDividend} ÷ {safeDivisor}
            </span>
          </div>

          {/* SVG Proportional Bar */}
          <svg
            viewBox="0 0 460 112"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50"
            role="img"
            aria-label={`Visualizing ${safeDividend} divided into groups of ${safeDivisor}`}
          >
            <text x="16" y="24" fontSize="12" fontWeight="600" fill="#334155">
              Dividend = {safeDividend} split into {quotient} equal group{quotient === 1 ? '' : 's'} of {safeDivisor}
            </text>
            <rect x="16" y="38" width="428" height="28" rx="6" fill="#E2E8F0" />
            <rect
              x="16"
              y="38"
              width={Math.max(8, Math.round((428 * fillPercent) / 100))}
              height="28"
              rx="6"
              fill={isFactor ? '#059669' : '#0284C7'}
            />
            {remainder > 0 && (
              <rect
                x={16 + Math.round((428 * fillPercent) / 100)}
                y="38"
                width={Math.max(6, 428 - Math.round((428 * fillPercent) / 100))}
                height="28"
                rx="4"
                fill="#F59E0B"
              />
            )}
            <text
              x="24"
              y="56"
              fontSize="11.5"
              fontWeight="700"
              fontFamily="IBM Plex Mono, monospace"
              fill="#FFFFFF"
            >
              {quotient} × {safeDivisor} = {product}
            </text>
            <text x="16" y="88" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill={isFactor ? '#065F46' : '#92400E'}>
              Remainder = {safeDividend} − {product} = {remainder}
            </text>
            <text x="16" y="104" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#475569">
              Rule: {safeDividend} = ({quotient} × {safeDivisor}) + {remainder} (rem = 0 → factor)
            </text>
          </svg>

          {!checked ? (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-700">
              Select <strong>Yes</strong> or <strong>No</strong> on the left to test your prediction and reveal the step-by-step proof!
            </div>
          ) : (
            <div className="space-y-3">
              {predictionCorrect ? (
                <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Great reasoning! Your prediction is correct.</span>
                </p>
              ) : (
                <p className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  <span>
                    Not quite — look at the remainder below. Try predicting carefully next time!
                  </span>
                </p>
              )}

              <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-decimal pl-5 font-math">
                <li>
                  Divide {safeDividend} by {safeDivisor}: closest whole quotient is {quotient}.
                </li>
                <li>
                  Multiply back: {safeDivisor} × {quotient} = {product}.
                </li>
                <li>
                  Subtract to find remainder: {safeDividend} − {product} = {remainder}.
                </li>
              </ol>

              <div
                className={`rounded-lg border px-4 py-3 text-xs sm:text-sm font-medium ${
                  isFactor
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                    : 'border-amber-200 bg-amber-50 text-amber-950'
                }`}
              >
                {isFactor ? (
                  <>
                    <strong>Conclusion:</strong> Yes, {safeDivisor} is a factor of {safeDividend}{' '}
                    because it divides {safeDividend} completely leaving zero remainder (0). Notice{' '}
                    {quotient} is also a factor of {safeDividend}!
                  </>
                ) : (
                  <>
                    <strong>Conclusion:</strong> No, {safeDivisor} is NOT a factor of {safeDividend}{' '}
                    because dividing leaves a non-zero remainder of {remainder}.
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
