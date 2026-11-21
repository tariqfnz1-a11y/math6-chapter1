import { useState } from 'react';
import { AlertTriangle, Check, RotateCcw } from 'lucide-react';

type Tab = 'balance' | 'solver';

function gcd(a: number, b: number): number {
  let x = Math.abs(a);
  let y = Math.abs(b);
  while (y !== 0) {
    const t = y;
    y = x % y;
    x = t;
  }
  return x;
}

const BALANCE_PRESETS = [
  { label: '12 & 21 (Ex. 21)', a: 12, b: 21 },
  { label: '32 & 48 (Ex. 22)', a: 32, b: 48 },
  { label: '10 & 25 (Ex. 1.5)', a: 10, b: 25 },
  { label: '34 & 68 (Ex. 1.5)', a: 34, b: 68 },
  { label: '160 & 380 (Ex. 1.5)', a: 160, b: 380 },
  { label: '680 & 584 (Ex. 1.5 Q2)', a: 680, b: 584 },
];

export function HcfLcmRelationshipSim() {
  const [tab, setTab] = useState<Tab>('balance');
  const [numA, setNumA] = useState<number>(12);
  const [numB, setNumB] = useState<number>(21);

  // Solver tab state
  const [givenHcf, setGivenHcf] = useState<number>(36);
  const [givenLcm, setGivenLcm] = useState<number>(1260);
  const [givenFirst, setGivenFirst] = useState<number>(72);

  const a = Math.max(2, Math.min(999, Math.floor(numA) || 12));
  const b = Math.max(2, Math.min(999, Math.floor(numB) || 21));
  const hcf = gcd(a, b);
  const lcm = (a * b) / hcf;
  const prodPair = a * b;
  const prodHcfLcm = hcf * lcm;

  const safeHcf = Math.max(1, Math.floor(givenHcf) || 1);
  const safeLcm = Math.max(1, Math.floor(givenLcm) || 1);
  const safeFirst = Math.max(1, Math.floor(givenFirst) || 1);
  const hcfDividesLcm = safeLcm % safeHcf === 0;
  const missingSecond = (safeHcf * safeLcm) / safeFirst;

  const handleReset = () => {
    setNumA(12);
    setNumB(21);
    setGivenHcf(36);
    setGivenLcm(1260);
    setGivenFirst(72);
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-6">
      <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
        <div>
          <h4 className="font-display text-lg font-bold text-slate-900">
            H.C.F × L.C.M Balance Scale &amp; Missing Number Lab
          </h4>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Verify that H.C.F × L.C.M always equals First Number × Second Number, or solve for a missing number in Exercise 1.5!
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setTab('balance')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              tab === 'balance'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Balance Scale Proof
          </button>
          <button
            type="button"
            onClick={() => setTab('solver')}
            className={`rounded-lg px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              tab === 'solver'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            Missing Number Solver
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

      {tab === 'balance' ? (
        <div className="space-y-5">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-slate-500">Textbook Presets:</span>
            {BALANCE_PRESETS.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => {
                  setNumA(p.a);
                  setNumB(p.b);
                }}
                className={`rounded-lg border px-2.5 py-1 font-math text-xs font-semibold cursor-pointer ${
                  a === p.a && b === p.b
                    ? 'border-sky-700 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-slate-50 text-slate-800 hover:bg-slate-100'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
            <div className="md:col-span-5 rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-4">
              <div>
                <label htmlFor="rel-a" className="block text-xs font-semibold text-slate-700">
                  First Number (a)
                </label>
                <input
                  id="rel-a"
                  type="number"
                  min={2}
                  max={999}
                  value={numA}
                  onChange={(e) => setNumA(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="rel-b" className="block text-xs font-semibold text-slate-700">
                  Second Number (b)
                </label>
                <input
                  id="rel-b"
                  type="number"
                  min={2}
                  max={999}
                  value={numB}
                  onChange={(e) => setNumB(Number(e.target.value))}
                  className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm text-slate-900"
                />
              </div>
              <div className="rounded-lg border border-slate-200 bg-white p-3 space-y-1 font-math text-xs">
                <p>
                  H.C.F({a}, {b}) = <strong className="text-sky-700">{hcf}</strong>
                </p>
                <p>
                  L.C.M({a}, {b}) = <strong className="text-emerald-700">{lcm}</strong>
                </p>
              </div>
            </div>

            <div className="md:col-span-7">
              <svg
                viewBox="0 0 460 200"
                className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50"
                role="img"
                aria-label={`Balance scale showing ${hcf} times ${lcm} equals ${a} times ${b}, both ${prodPair}`}
              >
                {/* Fulcrum triangle */}
                <polygon points="230,130 206,178 254,178" fill="#334155" />
                <rect x="60" y="122" width="340" height="8" rx="4" fill="#0F172A" />

                {/* Left pan */}
                <line x1="120" y1="84" x2="120" y2="122" stroke="#64748B" strokeWidth="2" />
                <rect x="28" y="24" width="184" height="62" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.8" />
                <text x="120" y="46" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0369A1">
                  H.C.F × L.C.M
                </text>
                <text x="120" y="70" textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                  {hcf} × {lcm} = {prodHcfLcm}
                </text>

                {/* Right pan */}
                <line x1="340" y1="84" x2="340" y2="122" stroke="#64748B" strokeWidth="2" />
                <rect x="248" y="24" width="184" height="62" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.8" />
                <text x="340" y="46" textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#065F46">
                  1st × 2nd Number
                </text>
                <text x="340" y="70" textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                  {a} × {b} = {prodPair}
                </text>

                <text x="230" y="194" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065F46">
                  ✓ Perfectly Balanced! Both sides equal {prodPair}
                </text>
              </svg>
            </div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => {
                setGivenHcf(36);
                setGivenLcm(1260);
                setGivenFirst(72);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-math font-semibold text-slate-800 hover:bg-slate-100 cursor-pointer"
            >
              Ex. 1.5 Q3 (HCF=36, LCM=1260, a=72)
            </button>
            <button
              type="button"
              onClick={() => {
                setGivenHcf(48);
                setGivenLcm(1440);
                setGivenFirst(240);
              }}
              className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-1.5 text-xs font-math font-semibold text-slate-800 hover:bg-slate-100 cursor-pointer"
            >
              Ex. 1.5 Q4 (HCF=48, LCM=1440, a=240)
            </button>
            <button
              type="button"
              onClick={() => {
                setGivenHcf(10);
                setGivenLcm(399);
                setGivenFirst(190);
              }}
              className="rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-math font-semibold text-amber-950 hover:bg-amber-100 cursor-pointer"
            >
              p. 16 Challenge Check (HCF=10, LCM=399, a=190)
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            <div>
              <label htmlFor="rel-given-hcf" className="block text-xs font-semibold text-slate-700">
                Given H.C.F
              </label>
              <input
                id="rel-given-hcf"
                type="number"
                min={1}
                value={givenHcf}
                onChange={(e) => setGivenHcf(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm"
              />
            </div>
            <div>
              <label htmlFor="rel-given-lcm" className="block text-xs font-semibold text-slate-700">
                Given L.C.M
              </label>
              <input
                id="rel-given-lcm"
                type="number"
                min={1}
                value={givenLcm}
                onChange={(e) => setGivenLcm(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm"
              />
            </div>
            <div>
              <label htmlFor="rel-given-first" className="block text-xs font-semibold text-slate-700">
                First Number
              </label>
              <input
                id="rel-given-first"
                type="number"
                min={1}
                value={givenFirst}
                onChange={(e) => setGivenFirst(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-slate-300 bg-white px-3 py-1.5 font-math text-sm"
              />
            </div>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
            <p className="font-math text-sm text-slate-800">
              Second Number = (H.C.F × L.C.M) ÷ First Number = ({safeHcf} × {safeLcm}) ÷ {safeFirst} ={' '}
              <strong className="text-sky-800 text-base">
                {Number.isInteger(missingSecond) ? missingSecond : missingSecond.toFixed(2)}
              </strong>
            </p>

            {hcfDividesLcm && Number.isInteger(missingSecond) ? (
              <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-800">
                <Check className="h-4 w-4" aria-hidden="true" />
                <span>
                  Valid! {safeHcf} divides {safeLcm} completely, and actual H.C.F({safeFirst},{' '}
                  {missingSecond}) = {gcd(safeFirst, missingSecond)}.
                </span>
              </p>
            ) : (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 flex items-start gap-2">
                <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-700" aria-hidden="true" />
                <span>
                  <strong>Math Detective Alert:</strong> H.C.F must ALWAYS divide L.C.M completely!
                  Here {safeHcf} does NOT divide {safeLcm} evenly (remainder {safeLcm % safeHcf}),
                  so no real pair of whole numbers has H.C.F = {safeHcf} and L.C.M = {safeLcm}.
                  (Applying the raw formula on p. 16 Challenge yields 21, even though H.C.F(190, 21) = 1 ≠ 10.)
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
