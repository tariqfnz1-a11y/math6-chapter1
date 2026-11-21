import { useEffect, useState } from 'react';
import {
  Check,
  ChevronRight,
  HelpCircle,
  Pause,
  Play,
  RotateCcw,
  XCircle,
} from 'lucide-react';

type Difficulty = 'easy' | 'medium' | 'challenge';
type SimMode = 'factor' | 'multiple';

interface SimPreset {
  id: string;
  dividend: number;
  divisor: number;
  mode: SimMode;
  promptLabel: string;
}

const PRESETS_BY_LEVEL: Record<Difficulty, SimPreset[]> = {
  easy: [
    { id: 'e1', dividend: 12, divisor: 3, mode: 'factor', promptLabel: 'Is 3 a factor of 12?' },
    { id: 'e2', dividend: 18, divisor: 4, mode: 'factor', promptLabel: 'Is 4 a factor of 18?' },
    { id: 'e3', dividend: 20, divisor: 5, mode: 'multiple', promptLabel: 'Is 20 a multiple of 5?' },
    { id: 'e4', dividend: 17, divisor: 3, mode: 'multiple', promptLabel: 'Is 17 a multiple of 3?' },
  ],
  medium: [
    { id: 'm1', dividend: 42, divisor: 3, mode: 'factor', promptLabel: 'Is 3 a factor of 42?' },
    { id: 'm2', dividend: 42, divisor: 5, mode: 'factor', promptLabel: 'Is 5 a factor of 42?' },
    { id: 'm3', dividend: 52, divisor: 6, mode: 'multiple', promptLabel: 'Is 52 a multiple of 6?' },
    { id: 'm4', dividend: 70, divisor: 6, mode: 'multiple', promptLabel: 'Is 70 a multiple of 6?' },
  ],
  challenge: [
    { id: 'c1', dividend: 84, divisor: 7, mode: 'factor', promptLabel: 'Is 7 a factor of 84?' },
    { id: 'c2', dividend: 120, divisor: 15, mode: 'factor', promptLabel: 'Is 15 a factor of 120?' },
    { id: 'c3', dividend: 230, divisor: 23, mode: 'factor', promptLabel: 'Is 23 a factor of 230?' },
    { id: 'c4', dividend: 145, divisor: 29, mode: 'multiple', promptLabel: 'Is 145 a multiple of 29?' },
    { id: 'c5', dividend: 352, divisor: 12, mode: 'factor', promptLabel: 'Is 12 a factor of 352?' },
  ],
};

const LEVEL_RANGES: Record<Difficulty, { minDividend: number; maxDividend: number; maxDivisor: number }> = {
  easy: { minDividend: 4, maxDividend: 30, maxDivisor: 12 },
  medium: { minDividend: 10, maxDividend: 99, maxDivisor: 20 },
  challenge: { minDividend: 20, maxDividend: 360, maxDivisor: 40 },
};

export function FactorsMultiplesSimulation() {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const [presetId, setPresetId] = useState<string>('e1');
  const [mode, setMode] = useState<SimMode>('factor');
  const [dividend, setDividend] = useState<number>(12);
  const [divisor, setDivisor] = useState<number>(3);
  const [dividendDraft, setDividendDraft] = useState<string>('12');
  const [divisorDraft, setDivisorDraft] = useState<string>('3');

  // Student prediction inputs
  const [predictedAnswer, setPredictedAnswer] = useState<'yes' | 'no' | null>(null);
  const [predictedQuotient, setPredictedQuotient] = useState<string>('');
  const [predictedRemainder, setPredictedRemainder] = useState<string>('');
  const [feedback, setFeedback] = useState<{
    status: 'idle' | 'correct' | 'mistake';
    message: string;
    hint?: string;
  }>({ status: 'idle', message: '' });
  const [showHintBox, setShowHintBox] = useState<boolean>(false);

  // Step-by-step visualization state (0 = ready, 1..4 = step index)
  const [stepIndex, setStepIndex] = useState<number>(4);
  const [isAutoPlaying, setIsAutoPlaying] = useState<boolean>(false);

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;
  const productCovered = quotient * divisor;
  const isExact = remainder === 0;
  const range = LEVEL_RANGES[difficulty];

  useEffect(() => {
    if (!isAutoPlaying) return;
    const timer = window.setInterval(() => {
      setStepIndex((prev) => {
        if (prev >= 4) {
          setIsAutoPlaying(false);
          return 4;
        }
        return prev + 1;
      });
    }, 900);
    return () => window.clearInterval(timer);
  }, [isAutoPlaying]);

  const clearAttempt = (defaultStep = 1) => {
    setPredictedAnswer(null);
    setPredictedQuotient('');
    setPredictedRemainder('');
    setFeedback({ status: 'idle', message: '' });
    setShowHintBox(false);
    setIsAutoPlaying(false);
    setStepIndex(defaultStep);
  };

  useEffect(() => {
    setDividendDraft(String(dividend));
  }, [dividend]);

  useEffect(() => {
    setDivisorDraft(String(divisor));
  }, [divisor]);

  const handleSelectDifficulty = (nextLevel: Difficulty) => {
    const first = PRESETS_BY_LEVEL[nextLevel][0];
    setDifficulty(nextLevel);
    setPresetId(first.id);
    setMode(first.mode);
    setDividend(first.dividend);
    setDivisor(first.divisor);
    clearAttempt(4);
  };

  const handleSelectPreset = (preset: SimPreset) => {
    setPresetId(preset.id);
    setMode(preset.mode);
    setDividend(preset.dividend);
    setDivisor(preset.divisor);
    clearAttempt(1);
  };

  const handleDividendChange = (nextVal: number) => {
    const clamped = Math.max(range.minDividend, Math.min(range.maxDividend, nextVal));
    setDividend(clamped);
    setDividendDraft(String(clamped));
    if (divisor > clamped) {
      const nextDiv = Math.max(1, clamped);
      setDivisor(nextDiv);
      setDivisorDraft(String(nextDiv));
    }
    setPresetId('custom');
    clearAttempt(4);
  };

  const handleDivisorChange = (nextVal: number) => {
    const clamped = Math.max(1, Math.min(Math.min(range.maxDivisor, dividend), nextVal));
    setDivisor(clamped);
    setDivisorDraft(String(clamped));
    setPresetId('custom');
    clearAttempt(4);
  };

  const handleReset = () => {
    const first = PRESETS_BY_LEVEL[difficulty][0];
    setPresetId(first.id);
    setMode(first.mode);
    setDividend(first.dividend);
    setDivisor(first.divisor);
    clearAttempt(4);
  };

  const handleCheckPrediction = () => {
    if (predictedAnswer === null) {
      setFeedback({
        status: 'mistake',
        message: 'First choose Yes or No to make your prediction.',
        hint:
          mode === 'factor'
            ? `Think: Can ${dividend} be divided by ${divisor} with zero (0) remainder?`
            : `Think: Can you reach ${dividend} by multiplying ${divisor} by a counting number?`,
      });
      return;
    }

    const qNum = predictedQuotient.trim() === '' ? null : Number(predictedQuotient.trim());
    const rNum = predictedRemainder.trim() === '' ? null : Number(predictedRemainder.trim());
    const expectedYesNo = isExact ? 'yes' : 'no';

    const wrongYesNo = predictedAnswer !== expectedYesNo;
    const wrongQ = qNum !== null && qNum !== quotient;
    const wrongR = rNum !== null && rNum !== remainder;

    if (!wrongYesNo && !wrongQ && !wrongR) {
      setStepIndex(4);
      setIsAutoPlaying(false);
      setFeedback({
        status: 'correct',
        message:
          mode === 'factor'
            ? isExact
              ? `Correct! ${divisor} IS a factor of ${dividend} because ${dividend} ÷ ${divisor} = ${quotient} with remainder 0.`
              : `Correct! ${divisor} is NOT a factor of ${dividend} because ${dividend} ÷ ${divisor} = ${quotient} leaves remainder ${remainder}.`
            : isExact
              ? `Correct! ${dividend} IS a multiple of ${divisor} because ${quotient} × ${divisor} = ${dividend} (remainder 0).`
              : `Correct! ${dividend} is NOT a multiple of ${divisor} because ${quotient} × ${divisor} = ${productCovered}, leaving remainder ${remainder}.`,
      });
      return;
    }

    // Build targeted mistake hint
    let hintText = '';
    if (wrongQ) {
      hintText = `Hint for Quotient: How many full groups of ${divisor} fit inside ${dividend} without passing ${dividend}? Try multiplying ${divisor} × ${Math.max(1, quotient - 1)} or ${divisor} × ${quotient}.`;
    } else if (wrongR) {
      hintText = `Hint for Remainder: ${quotient} groups of ${divisor} use up ${productCovered}. Subtract ${dividend} − ${productCovered} to see what is left over!`;
    } else if (wrongYesNo && isExact) {
      hintText = `Hint: Check ${dividend} ÷ ${divisor}. It equals ${quotient} with remainder 0—whenever remainder is 0, the answer is Yes!`;
    } else {
      hintText = `Hint: ${quotient} × ${divisor} = ${productCovered}, which leaves ${remainder} left over. Because the remainder is not 0, the answer is No!`;
    }

    setStepIndex(3);
    setFeedback({
      status: 'mistake',
      message: 'Not quite yet—check the visual diagram and try the hint below.',
      hint: hintText,
    });
  };

  const stepsData = [
    {
      num: 1,
      title: mode === 'factor' ? 'Set Up Exact Division' : 'Set Up Equal Jumps',
      detail:
        mode === 'factor'
          ? `We want to test if ${divisor} divides ${dividend} completely (${dividend} ÷ ${divisor}).`
          : `Start at 0 and jump forward in equal steps of ${divisor} toward ${dividend}.`,
    },
    {
      num: 2,
      title: mode === 'factor' ? 'Form Full Equal Groups' : 'Count Full Multiples',
      detail: `${quotient} full group${quotient === 1 ? '' : 's'} of ${divisor} make ${quotient} × ${divisor} = ${productCovered}.`,
    },
    {
      num: 3,
      title: 'Check What Is Left Over (Remainder)',
      detail: `Subtract from ${dividend}: ${dividend} − ${productCovered} = ${remainder} (remainder).`,
    },
    {
      num: 4,
      title: 'Verify Why the Answer Is Correct',
      detail: isExact
        ? `Because ${dividend} = ${quotient} × ${divisor} + 0 leaves ZERO remainder, ${
            mode === 'factor'
              ? `${divisor} is a factor of ${dividend}`
              : `${dividend} is a multiple of ${divisor}`
          }!`
        : `Because ${dividend} = ${quotient} × ${divisor} + ${remainder} leaves remainder ${remainder} (not 0), ${
            mode === 'factor'
              ? `${divisor} is NOT a factor of ${dividend}`
              : `${dividend} is NOT a multiple of ${divisor}`
          }.`,
    },
  ];

  // SVG layout math for Number Line (Multiple mode) or Partition Array/Bar (Factor mode)
  const renderVisualSvg = () => {
    if (mode === 'multiple') {
      const maxScale = Math.max(dividend + divisor, productCovered + divisor);
      const svgWidth = 640;
      const svgHeight = 165;
      const padLeft = 28;
      const padRight = 28;
      const trackWidth = svgWidth - padLeft - padRight;
      const xOf = (val: number) => padLeft + (val / maxScale) * trackWidth;

      const jumpsToDraw = stepIndex >= 2 ? Math.min(quotient, 14) : 0;
      const tooManyJumps = quotient > 14;

      return (
        <svg
          viewBox={`0 0 ${svgWidth} ${svgHeight}`}
          className="w-full h-auto"
          role="img"
          aria-label={`Number line showing jumps of ${divisor} toward ${dividend}`}
        >
          {/* Baseline */}
          <line
            x1={padLeft}
            y1={110}
            x2={svgWidth - padRight}
            y2={110}
            stroke="#CBD5E1"
            strokeWidth="2.5"
            strokeLinecap="round"
          />

          {/* Zero tick */}
          <line x1={xOf(0)} y1={102} x2={xOf(0)} y2={118} stroke="#475569" strokeWidth="2" />
          <text
            x={xOf(0)}
            y={135}
            textAnchor="middle"
            fontSize="11"
            fontFamily="IBM Plex Mono, monospace"
            fill="#334155"
          >
            0
          </text>

          {/* Target marker */}
          <line
            x1={xOf(dividend)}
            y1={36}
            x2={xOf(dividend)}
            y2={118}
            stroke={stepIndex >= 4 ? (isExact ? '#059669' : '#D97706') : '#0369A1'}
            strokeWidth="2"
            strokeDasharray="4 3"
          />
          <rect
            x={xOf(dividend) - 24}
            y={14}
            width="48"
            height="22"
            rx="4"
            fill={stepIndex >= 4 ? (isExact ? '#ECFDF5' : '#FFFBEB') : '#F0F9FF'}
            stroke={stepIndex >= 4 ? (isExact ? '#059669' : '#D97706') : '#0369A1'}
          />
          <text
            x={xOf(dividend)}
            y={29}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="IBM Plex Mono, monospace"
            fill={stepIndex >= 4 ? (isExact ? '#065F46' : '#92400E') : '#0C4A6E'}
          >
            {dividend}
          </text>

          {/* Jump Arcs */}
          {stepIndex >= 2 &&
            !tooManyJumps &&
            Array.from({ length: jumpsToDraw }).map((_, idx) => {
              const startVal = idx * divisor;
              const endVal = (idx + 1) * divisor;
              const x1 = xOf(startVal);
              const x2 = xOf(endVal);
              const midX = (x1 + x2) / 2;
              const arcPeak = Math.max(46, 102 - Math.min(44, (x2 - x1) * 0.45));
              return (
                <g key={idx}>
                  <path
                    d={`M ${x1} 108 Q ${midX} ${arcPeak} ${x2} 108`}
                    fill="none"
                    stroke="#0284C7"
                    strokeWidth="2"
                  />
                  <circle cx={x2} cy={110} r="3.5" fill="#0284C7" />
                  <text
                    x={x2}
                    y={135}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#0369A1"
                  >
                    {endVal}
                  </text>
                </g>
              );
            })}

          {/* Condensed Jump Summary when quotient > 14 */}
          {stepIndex >= 2 && tooManyJumps && (
            <g>
              <path
                d={`M ${xOf(0)} 108 Q ${(xOf(0) + xOf(productCovered)) / 2} 54 ${xOf(productCovered)} 108`}
                fill="none"
                stroke="#0284C7"
                strokeWidth="2.5"
                strokeDasharray="6 4"
              />
              <text
                x={(xOf(0) + xOf(productCovered)) / 2}
                y={72}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fontFamily="IBM Plex Mono, monospace"
                fill="#0369A1"
              >
                {quotient} jumps of {divisor} = {productCovered}
              </text>
              <circle cx={xOf(productCovered)} cy={110} r="4" fill="#0284C7" />
              <text
                x={xOf(productCovered)}
                y={135}
                textAnchor="middle"
                fontSize="10"
                fontFamily="IBM Plex Mono, monospace"
                fill="#0369A1"
              >
                {productCovered}
              </text>
            </g>
          )}

          {/* Remainder Gap Highlight */}
          {stepIndex >= 3 && remainder > 0 && (
            <g>
              <line
                x1={xOf(productCovered)}
                y1={110}
                x2={xOf(dividend)}
                y2={110}
                stroke="#D97706"
                strokeWidth="5"
                strokeLinecap="round"
              />
              <text
                x={(xOf(productCovered) + xOf(dividend)) / 2}
                y={154}
                textAnchor="middle"
                fontSize="11"
                fontWeight="600"
                fontFamily="IBM Plex Mono, monospace"
                fill="#B45309"
              >
                Gap = {remainder}
              </text>
            </g>
          )}
        </svg>
      );
    }

    // Factor Mode: Exact Rectangular Dot Array (for <= 60) OR Proportional Partition Bar (for > 60)
    if (dividend <= 60) {
      const cols = Math.min(divisor, 15);
      const dotRows = Math.ceil(divisor / cols);
      const cellSize = 18;
      const gap = 5;
      const groupHeight = dotRows * (cellSize + gap);
      const visibleGroups = stepIndex >= 2 ? quotient : 0;
      const totalHeight = Math.max(
        130,
        visibleGroups * (groupHeight + 8) + (stepIndex >= 3 && remainder > 0 ? 48 : 24)
      );

      return (
        <svg
          viewBox={`0 0 560 ${totalHeight}`}
          className="w-full h-auto max-h-80"
          role="img"
          aria-label={`Visual grouping of ${dividend} items by ${divisor}`}
        >
          {stepIndex < 2 && (
            <text
              x="280"
              y="68"
              textAnchor="middle"
              fontSize="13"
              fontFamily="Plus Jakarta Sans, sans-serif"
              fill="#475569"
            >
              Ready to group {dividend} items into rows of {divisor} (press Next Step).
            </text>
          )}

          {stepIndex >= 2 &&
            Array.from({ length: visibleGroups }).map((_, rIdx) => {
              const yStart = 12 + rIdx * (groupHeight + 8);
              return (
                <g key={rIdx}>
                  {Array.from({ length: divisor }).map((__, cIdx) => {
                    const cx = 20 + (cIdx % cols) * (cellSize + gap);
                    const cy = yStart + Math.floor(cIdx / cols) * (cellSize + gap);
                    return (
                      <rect
                        key={cIdx}
                        x={cx}
                        y={cy}
                        width={cellSize}
                        height={cellSize}
                        rx="4"
                        fill={stepIndex >= 4 && isExact ? '#059669' : '#0284C7'}
                      />
                    );
                  })}
                  <text
                    x={20 + Math.min(divisor, cols) * (cellSize + gap) + 10}
                    y={yStart + 13}
                    fontSize="11"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#475569"
                  >
                    Group {rIdx + 1} ({divisor})
                  </text>
                </g>
              );
            })}

          {stepIndex >= 3 && remainder > 0 && (
            <g transform={`translate(0, ${14 + visibleGroups * (groupHeight + 8)})`}>
              <line
                x1="20"
                y1="0"
                x2="520"
                y2="0"
                stroke="#F59E0B"
                strokeWidth="1.5"
                strokeDasharray="4 4"
              />
              {Array.from({ length: remainder }).map((_, remIdx) => (
                <rect
                  key={remIdx}
                  x={20 + (remIdx % 18) * (cellSize + gap)}
                  y={10 + Math.floor(remIdx / 18) * (cellSize + gap)}
                  width={cellSize}
                  height={cellSize}
                  rx="4"
                  fill="#D97706"
                />
              ))}
              <text
                x={20 + Math.min(remainder, 18) * (cellSize + gap) + 10}
                y={23}
                fontSize="11"
                fontWeight="600"
                fontFamily="IBM Plex Mono, monospace"
                fill="#B45309"
              >
                Remainder: {remainder}
              </text>
            </g>
          )}
        </svg>
      );
    }

    // Large Number Partition Bar (for 3-digit / Challenge numbers > 60)
    const svgWidth = 600;
    const barWidth = 540;
    const startX = 30;
    const coveredWidth = (productCovered / dividend) * barWidth;
    const remWidth = (remainder / dividend) * barWidth;
    const segments = Math.min(quotient, 12);

    return (
      <svg
        viewBox={`0 0 ${svgWidth} 150`}
        className="w-full h-auto"
        role="img"
        aria-label={`Proportional partition bar of ${dividend} divided by ${divisor}`}
      >
        <text
          x={startX}
          y={26}
          fontSize="12"
          fontWeight="600"
          fontFamily="IBM Plex Mono, monospace"
          fill="#0F172A"
        >
          Total Dividend = {dividend}
        </text>

        {/* Outer frame */}
        <rect
          x={startX}
          y={38}
          width={barWidth}
          height={44}
          rx="6"
          fill="#F1F5F9"
          stroke="#CBD5E1"
          strokeWidth="1.5"
        />

        {/* Equal Quotient Segments */}
        {stepIndex >= 2 &&
          Array.from({ length: segments }).map((_, idx) => {
            const segW = coveredWidth / segments;
            return (
              <rect
                key={idx}
                x={startX + idx * segW}
                y={38}
                width={Math.max(1, segW - 1)}
                height={44}
                rx={idx === 0 ? 4 : 0}
                fill={stepIndex >= 4 && isExact ? '#059669' : '#0284C7'}
              />
            );
          })}

        {stepIndex >= 2 && (
          <text
            x={startX + coveredWidth / 2}
            y={104}
            textAnchor="middle"
            fontSize="11"
            fontWeight="600"
            fontFamily="IBM Plex Mono, monospace"
            fill="#0369A1"
          >
            {quotient} × {divisor} = {productCovered}
          </text>
        )}

        {/* Remainder Segment */}
        {stepIndex >= 3 && remainder > 0 && (
          <g>
            <rect
              x={startX + coveredWidth}
              y={38}
              width={Math.max(10, remWidth)}
              height={44}
              rx="4"
              fill="#D97706"
            />
            <text
              x={startX + coveredWidth + Math.max(10, remWidth) / 2}
              y={126}
              textAnchor="middle"
              fontSize="11"
              fontWeight="600"
              fontFamily="IBM Plex Mono, monospace"
              fill="#B45309"
            >
              Rem: {remainder}
            </text>
          </g>
        )}
      </svg>
    );
  };

  return (
    <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Simulation Header & Difficulty Selector */}
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Interactive Mathematics Simulation · Offline Ready
          </p>
          <h3 className="font-display text-lg sm:text-xl font-bold text-slate-900">
            Division &amp; Multiples Sandbox
          </h3>
        </div>

        {/* Difficulty Levels: Easy / Medium / Challenge */}
        <div
          className="inline-flex items-center rounded-lg border border-slate-200 bg-white p-1"
          role="group"
          aria-label="Select difficulty level"
        >
          {(['easy', 'medium', 'challenge'] as Difficulty[]).map((lvl) => (
            <button
              key={lvl}
              type="button"
              onClick={() => handleSelectDifficulty(lvl)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold capitalize transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                difficulty === lvl
                  ? 'bg-sky-700 text-white'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {lvl}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Student Instructions Strip */}
      <div className="border-b border-slate-200 bg-sky-50/50 px-5 py-3 text-xs text-slate-700 flex flex-wrap items-center justify-between gap-2">
        <p>
          <strong className="text-slate-900">How to use:</strong> Pick a level question (or move the sliders to test your own numbers), predict whether the remainder will be 0, and step through the visual proof.
        </p>
        <button
          type="button"
          onClick={handleReset}
          className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
        >
          <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Reset Simulation</span>
        </button>
      </div>

      {/* Level Preset Questions */}
      <div className="border-b border-slate-200 px-5 py-3 bg-white flex flex-wrap items-center gap-2">
        <span className="text-xs font-medium text-slate-500 mr-1">
          Try a {difficulty} problem:
        </span>
        {PRESETS_BY_LEVEL[difficulty].map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => handleSelectPreset(preset)}
            className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
              presetId === preset.id
                ? 'border-sky-700 bg-sky-50 text-sky-900 font-semibold'
                : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
            }`}
          >
            {preset.promptLabel}
          </button>
        ))}
      </div>

      {/* Two-Zone Sandbox: Visual Stage (Left) + Controls & Prediction (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12">
        {/* Left Zone: SVG Visual Stage + Step-by-Step Result */}
        <div className="p-5 sm:p-6 lg:col-span-7 border-b lg:border-b-0 lg:border-r border-slate-200 space-y-5">
          {/* Question & Mode Toggle */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <h4 className="font-display text-base sm:text-lg font-semibold text-slate-900">
              {mode === 'factor'
                ? `Is ${divisor} a factor of ${dividend}?`
                : `Is ${dividend} a multiple of ${divisor}?`}
            </h4>

            <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
              <button
                type="button"
                onClick={() => {
                  setMode('factor');
                  clearAttempt(4);
                }}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  mode === 'factor' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Factor View
              </button>
              <button
                type="button"
                onClick={() => {
                  setMode('multiple');
                  clearAttempt(4);
                }}
                className={`rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                  mode === 'multiple' ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                }`}
              >
                Multiple View
              </button>
            </div>
          </div>

          {/* SVG Visual Canvas */}
          <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4">
            {renderVisualSvg()}
          </div>

          {/* Step-by-Step Result Controls & Display */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <span className="text-xs font-semibold text-slate-900">
                Step-by-Step Process (Step {stepIndex} of 4)
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => {
                    if (stepIndex >= 4) setStepIndex(1);
                    setIsAutoPlaying((p) => !p);
                  }}
                  className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer"
                >
                  {isAutoPlaying ? (
                    <>
                      <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Animate</span>
                    </>
                  )}
                </button>
                <button
                  type="button"
                  disabled={stepIndex >= 4}
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setStepIndex((s) => Math.min(4, s + 1));
                  }}
                  className="inline-flex items-center gap-1 rounded-md bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-800 disabled:opacity-40 cursor-pointer"
                >
                  <span>Next Step</span>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAutoPlaying(false);
                    setStepIndex(4);
                  }}
                  className="rounded-md border border-slate-200 px-2.5 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  Show All
                </button>
              </div>
            </div>

            <ol className="space-y-2">
              {stepsData.slice(0, stepIndex).map((st) => (
                <li
                  key={st.num}
                  className={`rounded-lg border px-3.5 py-2.5 text-xs leading-relaxed ${
                    st.num === 4
                      ? isExact
                        ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                        : 'border-amber-200 bg-amber-50 text-amber-950'
                      : 'border-slate-200 bg-slate-50 text-slate-800'
                  }`}
                >
                  <span className="font-math font-semibold mr-1.5">Step {st.num}:</span>
                  <strong className="mr-1">{st.title} —</strong>
                  <span>{st.detail}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* Right Zone: Number Controls + Prediction Check + Mistake Hints */}
        <div className="p-5 sm:p-6 lg:col-span-5 bg-slate-50/60 space-y-6">
          {/* Interactive Number Controls */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
            <h5 className="text-xs font-semibold text-slate-900">
              1. Change Numbers ({difficulty} range)
            </h5>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="sim-dividend-slider" className="font-medium text-slate-700">
                  {mode === 'factor' ? 'Dividend (Total)' : 'Target Number'}:{' '}
                  <strong className="font-math text-sky-700">{dividend}</strong>
                </label>
                <input
                  type="number"
                  aria-label="Enter dividend number"
                  min={range.minDividend}
                  max={range.maxDividend}
                  value={dividendDraft}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setDividendDraft(raw);
                    const parsed = Number(raw);
                    if (
                      raw.trim() !== '' &&
                      Number.isFinite(parsed) &&
                      parsed >= range.minDividend &&
                      parsed <= range.maxDividend
                    ) {
                      handleDividendChange(Math.round(parsed));
                    }
                  }}
                  onBlur={() => {
                    const parsed = Number(dividendDraft);
                    if (!Number.isFinite(parsed) || dividendDraft.trim() === '') {
                      setDividendDraft(String(dividend));
                    } else {
                      handleDividendChange(Math.round(parsed));
                    }
                  }}
                  className="font-math w-20 rounded border border-slate-300 px-2 py-1 text-right text-xs text-slate-900"
                />
              </div>
              <input
                id="sim-dividend-slider"
                type="range"
                min={range.minDividend}
                max={range.maxDividend}
                value={dividend}
                onChange={(e) => handleDividendChange(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-xs mb-1.5">
                <label htmlFor="sim-divisor-slider" className="font-medium text-slate-700">
                  {mode === 'factor' ? 'Divisor (Group Size)' : 'Base Step Size'}:{' '}
                  <strong className="font-math text-sky-700">{divisor}</strong>
                </label>
                <input
                  type="number"
                  aria-label="Enter divisor number"
                  min={1}
                  max={Math.min(range.maxDivisor, dividend)}
                  value={divisorDraft}
                  onChange={(e) => {
                    const raw = e.target.value;
                    setDivisorDraft(raw);
                    const parsed = Number(raw);
                    const maxAllowed = Math.min(range.maxDivisor, dividend);
                    if (
                      raw.trim() !== '' &&
                      Number.isFinite(parsed) &&
                      parsed >= 1 &&
                      parsed <= maxAllowed
                    ) {
                      handleDivisorChange(Math.round(parsed));
                    }
                  }}
                  onBlur={() => {
                    const parsed = Number(divisorDraft);
                    if (!Number.isFinite(parsed) || divisorDraft.trim() === '') {
                      setDivisorDraft(String(divisor));
                    } else {
                      handleDivisorChange(Math.round(parsed));
                    }
                  }}
                  className="font-math w-20 rounded border border-slate-300 px-2 py-1 text-right text-xs text-slate-900"
                />
              </div>
              <input
                id="sim-divisor-slider"
                type="range"
                min={1}
                max={Math.min(range.maxDivisor, dividend)}
                value={divisor}
                onChange={(e) => handleDivisorChange(Number(e.target.value))}
                className="w-full accent-sky-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Student Prediction & Immediate Feedback */}
          <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-4">
            <div className="flex items-center justify-between gap-2">
              <h5 className="text-xs font-semibold text-slate-900">
                2. Predict &amp; Check Answer
              </h5>
              <button
                type="button"
                onClick={() => setShowHintBox((h) => !h)}
                className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:underline cursor-pointer"
              >
                <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                <span>{showHintBox ? 'Hide hint' : 'Need a hint?'}</span>
              </button>
            </div>

            {showHintBox && (
              <p className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-950">
                <strong>Hint:</strong> Divide {dividend} ÷ {divisor}. Count how many full groups of {divisor} fit inside {dividend}, then check if anything is left over!
              </p>
            )}

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPredictedAnswer('yes')}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                  predictedAnswer === 'yes'
                    ? 'border-sky-700 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                Yes ({mode === 'factor' ? 'Factor' : 'Multiple'})
              </button>
              <button
                type="button"
                onClick={() => setPredictedAnswer('no')}
                className={`rounded-lg border px-3 py-2 text-xs font-semibold cursor-pointer transition-colors ${
                  predictedAnswer === 'no'
                    ? 'border-sky-700 bg-sky-50 text-sky-900'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                No (Not {mode === 'factor' ? 'Factor' : 'Multiple'})
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="pred-quotient"
                  className="block text-[11px] font-medium text-slate-600 mb-1"
                >
                  Quotient (optional)
                </label>
                <input
                  id="pred-quotient"
                  type="number"
                  min={0}
                  value={predictedQuotient}
                  onChange={(e) => setPredictedQuotient(e.target.value)}
                  placeholder="e.g. 4"
                  className="font-math w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900"
                />
              </div>
              <div>
                <label
                  htmlFor="pred-remainder"
                  className="block text-[11px] font-medium text-slate-600 mb-1"
                >
                  Remainder (optional)
                </label>
                <input
                  id="pred-remainder"
                  type="number"
                  min={0}
                  value={predictedRemainder}
                  onChange={(e) => setPredictedRemainder(e.target.value)}
                  placeholder="e.g. 0"
                  className="font-math w-full rounded-lg border border-slate-300 px-3 py-1.5 text-xs text-slate-900"
                />
              </div>
            </div>

            <button
              type="button"
              onClick={handleCheckPrediction}
              className="w-full rounded-lg bg-slate-900 px-4 py-2.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer"
            >
              Check My Answer
            </button>

            {feedback.status === 'correct' && (
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3 text-xs text-emerald-950 space-y-1">
                <p className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
                  <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Verified!</span>
                </p>
                <p>{feedback.message}</p>
              </div>
            )}

            {feedback.status === 'mistake' && (
              <div className="rounded-lg border border-amber-200 bg-amber-50 p-3 text-xs text-amber-950 space-y-1.5">
                <p className="inline-flex items-center gap-1.5 font-semibold text-amber-900">
                  <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                  <span>Let’s check together</span>
                </p>
                <p>{feedback.message}</p>
                {feedback.hint && (
                  <p className="pt-1.5 border-t border-amber-200 font-medium">
                    {feedback.hint}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
