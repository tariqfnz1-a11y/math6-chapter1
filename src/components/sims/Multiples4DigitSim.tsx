import { useState } from 'react';
import { Check, HelpCircle, RotateCcw, XCircle } from 'lucide-react';

type Level = 'easy' | 'medium' | 'challenge';

interface Preset {
  label: string;
  base: number;
  candidate: number;
}

const PRESETS: Record<Level, Preset[]> = {
  easy: [
    { label: '39 of 13 (Ex. 7)', base: 13, candidate: 39 },
    { label: '45 of 13 (Ex. 7)', base: 13, candidate: 45 },
    { label: '65 of 13 (Ex. 7)', base: 13, candidate: 65 },
    { label: '99 of 13 (Ex. 7)', base: 13, candidate: 99 },
  ],
  medium: [
    { label: '180 of 36 (Practice -3)', base: 36, candidate: 180 },
    { label: '225 of 45 (Practice -3)', base: 45, candidate: 225 },
    { label: '380 of 76 (Practice -3)', base: 76, candidate: 380 },
    { label: '250 of 19', base: 19, candidate: 250 },
  ],
  challenge: [
    { label: '1326 of 13 (4-digit)', base: 13, candidate: 1326 },
    { label: '1800 of 45 (4-digit)', base: 45, candidate: 1800 },
    { label: '3040 of 76 (4-digit)', base: 76, candidate: 3040 },
    { label: '4520 of 19 (4-digit)', base: 19, candidate: 4520 },
  ],
};

export function Multiples4DigitSim() {
  const [level, setLevel] = useState<Level>('challenge');
  const [base, setBase] = useState<number>(13);
  const [candidate, setCandidate] = useState<number>(1326);
  const [prediction, setPrediction] = useState<'yes' | 'no' | null>(null);
  const [checked, setChecked] = useState<boolean>(false);
  const [showHint, setShowHint] = useState<boolean>(false);

  const safeBase = Math.max(2, Math.min(99, Math.floor(base) || 2));
  const safeCandidate = Math.max(safeBase, Math.min(9999, Math.floor(candidate) || safeBase));

  const quotient = Math.floor(safeCandidate / safeBase);
  const lowerMultiple = quotient * safeBase;
  const remainder = safeCandidate - lowerMultiple;
  const nextMultiple = lowerMultiple + safeBase;
  const isMultiple = remainder === 0;

  const firstFive = [1, 2, 3, 4, 5].map((k) => k * safeBase);

  const predictionCorrect =
    prediction !== null && ((prediction === 'yes' && isMultiple) || (prediction === 'no' && !isMultiple));

  const handleSelectPreset = (p: Preset) => {
    setBase(p.base);
    setCandidate(p.candidate);
    setPrediction(null);
    setChecked(false);
    setShowHint(false);
  };

  const handleLevelChange = (next: Level) => {
    setLevel(next);
    const first = PRESETS[next][0];
    setBase(first.base);
    setCandidate(first.candidate);
    setPrediction(null);
    setChecked(false);
    setShowHint(false);
  };

  const handleReset = () => {
    setLevel('challenge');
    setBase(13);
    setCandidate(1326);
    setPrediction(null);
    setChecked(false);
    setShowHint(false);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            Multiples Builder &amp; 4-Digit Checker
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Generate the first 5 multiples of any base number and test whether any 2-, 3-, or 4-digit number (up to 9,999) is a multiple.
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

      {/* Presets */}
      <div className="space-y-2">
        <p className="text-xs font-medium text-slate-500">Quick Textbook Tests ({level}):</p>
        <div className="flex flex-wrap gap-2">
          {PRESETS[level].map((p) => {
            const active = safeBase === p.base && safeCandidate === p.candidate;
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

      {/* First 5 multiples strip */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2.5">
        <p className="text-xs font-semibold text-slate-800">
          First 5 Multiples of <span className="font-math text-sky-800">{safeBase}</span> (multiply by 1, 2, 3, 4, 5):
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {firstFive.map((val, idx) => (
            <div
              key={val}
              className="rounded-lg border border-slate-200 bg-white px-2 py-2 text-center"
            >
              <p className="text-[11px] text-slate-500 font-math">
                {safeBase} × {idx + 1}
              </p>
              <p className="font-math text-sm font-bold text-slate-900">{val}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
        <div className="md:col-span-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <label htmlFor="sim13-base">Base Number (2 to 99)</label>
              <span className="font-math text-sm text-sky-800">{safeBase}</span>
            </div>
            <input
              id="sim13-base"
              type="range"
              min={2}
              max={99}
              value={safeBase}
              onChange={(e) => {
                setBase(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full accent-sky-700 cursor-pointer"
            />
            <input
              type="number"
              min={2}
              max={99}
              value={base}
              aria-label="Enter base number"
              onChange={(e) => {
                setBase(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm text-slate-900"
            />
          </div>

          <div>
            <div className="flex items-center justify-between text-xs font-semibold text-slate-800">
              <label htmlFor="sim13-cand">Candidate Number (up to 9,999)</label>
              <span className="font-math text-sm text-sky-800">{safeCandidate}</span>
            </div>
            <input
              id="sim13-cand"
              type="range"
              min={level === 'easy' ? 10 : level === 'medium' ? 100 : 1000}
              max={level === 'easy' ? 99 : level === 'medium' ? 999 : 9999}
              value={safeCandidate}
              onChange={(e) => {
                setCandidate(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full accent-sky-700 cursor-pointer"
            />
            <input
              type="number"
              min={safeBase}
              max={9999}
              value={candidate}
              aria-label="Enter candidate number up to 9999"
              onChange={(e) => {
                setCandidate(Number(e.target.value));
                setChecked(false);
                setPrediction(null);
              }}
              className="mt-2 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm text-slate-900"
            />
          </div>

          <div className="pt-2 border-t border-slate-200 space-y-2.5">
            <p className="text-xs font-semibold text-slate-900">
              Predict: Is <span className="font-math">{safeCandidate}</span> a multiple of{' '}
              <span className="font-math">{safeBase}</span>?
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
                Yes (Multiple)
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
                No (Not a Multiple)
              </button>
            </div>
            <button
              type="button"
              onClick={() => setShowHint((h) => !h)}
              className="inline-flex items-center gap-1 text-xs font-medium text-sky-800 hover:underline cursor-pointer"
            >
              <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
              <span>{showHint ? 'Hide Hint' : 'Need a Hint?'}</span>
            </button>
            {showHint && (
              <p className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-950">
                Try dividing {safeCandidate} ÷ {safeBase}. Note that {safeBase} × {quotient} ={' '}
                {lowerMultiple}. How far is {safeCandidate} from {lowerMultiple}?
              </p>
            )}
          </div>
        </div>

        <div className="md:col-span-7 rounded-xl border border-slate-200 bg-white p-5 space-y-4">
          <h5 className="font-display text-base font-bold text-slate-900">
            Multiple Landing Check
          </h5>

          <svg
            viewBox="0 0 460 110"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50"
            role="img"
            aria-label={`Checking where ${safeCandidate} lands relative to multiples of ${safeBase}`}
          >
            <line x1="36" y1="54" x2="424" y2="54" stroke="#94A3B8" strokeWidth="2.5" />
            <circle cx="80" cy="54" r="10" fill="#0284C7" />
            <text x="80" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
              {lowerMultiple} ({safeBase}×{quotient})
            </text>

            <circle cx="380" cy="54" r="10" fill="#0284C7" />
            <text x="380" y="34" textAnchor="middle" fontSize="11" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
              {nextMultiple} ({safeBase}×{quotient + 1})
            </text>

            {isMultiple ? (
              <>
                <circle cx="80" cy="54" r="16" fill="none" stroke="#059669" strokeWidth="3" />
                <text x="80" y="88" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
                  ★ {safeCandidate} lands exactly!
                </text>
              </>
            ) : (
              <>
                <circle
                  cx={80 + Math.round((remainder / safeBase) * 300)}
                  cy="54"
                  r="9"
                  fill="#F59E0B"
                  stroke="#92400E"
                  strokeWidth="2"
                />
                <text
                  x={80 + Math.round((remainder / safeBase) * 300)}
                  y="88"
                  textAnchor="middle"
                  fontSize="11.5"
                  fontWeight="700"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="#92400E"
                >
                  {safeCandidate} (between multiples, rem = {remainder})
                </text>
              </>
            )}
          </svg>

          {!checked ? (
            <p className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-xs sm:text-sm text-slate-700">
              Select <strong>Yes</strong> or <strong>No</strong> on the left to check whether{' '}
              <span className="font-math font-semibold">{safeCandidate}</span> is a multiple of{' '}
              <span className="font-math font-semibold">{safeBase}</span>.
            </p>
          ) : (
            <div className="space-y-3">
              {predictionCorrect ? (
                <p className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-800">
                  <Check className="h-4 w-4" aria-hidden="true" />
                  <span>Correct prediction!</span>
                </p>
              ) : (
                <p className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800">
                  <XCircle className="h-4 w-4" aria-hidden="true" />
                  <span>Check the division steps below to see why.</span>
                </p>
              )}

              <ol className="space-y-1.5 text-xs sm:text-sm text-slate-700 list-decimal pl-5 font-math">
                <li>
                  Divide candidate by base: {safeCandidate} ÷ {safeBase} = {quotient} (with remainder {remainder}).
                </li>
                <li>
                  Multiply back: {safeBase} × {quotient} = {lowerMultiple}.
                </li>
                <li>
                  Remainder check: {safeCandidate} − {lowerMultiple} = {remainder}.
                </li>
              </ol>

              <div
                className={`rounded-lg border px-4 py-3 text-xs sm:text-sm font-medium ${
                  isMultiple
                    ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                    : 'border-amber-200 bg-amber-50 text-amber-950'
                }`}
              >
                {isMultiple ? (
                  <>
                    <strong>Conclusion:</strong> Yes! {safeCandidate} is the {quotient}th multiple of{' '}
                    {safeBase} because {safeBase} × {quotient} = {safeCandidate} (remainder 0).
                  </>
                ) : (
                  <>
                    <strong>Conclusion:</strong> No! {safeCandidate} is NOT a multiple of {safeBase}{' '}
                    because {safeCandidate} ÷ {safeBase} leaves remainder {remainder}. The nearest multiples are {lowerMultiple} and {nextMultiple}.
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
