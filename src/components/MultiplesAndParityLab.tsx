import { useState } from 'react';
import { Plus, Minus, RotateCcw } from 'lucide-react';

const BASE_CHOICES = [3, 5, 6, 7, 9, 12];

type Parity = 'Even' | 'Odd';
type OpSymbol = '+' | '−' | '×' | '÷';

const PARITY_EXAMPLES: Record<Parity, number[]> = {
  Even: [2, 4, 6, 8, 12],
  Odd: [1, 3, 5, 7, 9],
};

export function MultiplesAndParityLab() {
  const [base, setBase] = useState<number>(5);
  const [groupsCount, setGroupsCount] = useState<number>(4);

  // Interactive Thinking Time Parity Lab state
  const [leftParity, setLeftParity] = useState<Parity>('Even');
  const [rightParity, setRightParity] = useState<Parity>('Odd');
  const [operation, setOperation] = useState<OpSymbol>('+');
  const [sampleA, setSampleA] = useState<number>(8);
  const [sampleB, setSampleB] = useState<number>(3);

  const handleParityPick = (side: 'left' | 'right', nextParity: Parity) => {
    if (side === 'left') {
      setLeftParity(nextParity);
      setSampleA(nextParity === 'Even' ? 8 : 7);
    } else {
      setRightParity(nextParity);
      setSampleB(nextParity === 'Even' ? 4 : 3);
    }
  };

  const evaluateParity = (): { resultText: string; parityLabel: string; explanation: string } => {
    if (operation === '+') {
      const sum = sampleA + sampleB;
      return {
        resultText: `${sampleA} + ${sampleB} = ${sum}`,
        parityLabel: sum % 2 === 0 ? 'Always Even' : 'Always Odd',
        explanation: `${leftParity} + ${rightParity} always gives an ${sum % 2 === 0 ? 'Even' : 'Odd'} number.`,
      };
    }
    if (operation === '−') {
      const diff = sampleA - sampleB;
      return {
        resultText: `${sampleA} − ${sampleB} = ${diff}`,
        parityLabel: Math.abs(diff) % 2 === 0 ? 'Always Even' : 'Always Odd',
        explanation: `Just like addition, ${leftParity} − ${rightParity} gives an ${
          Math.abs(diff) % 2 === 0 ? 'Even' : 'Odd'
        } integer!`,
      };
    }
    if (operation === '×') {
      const prod = sampleA * sampleB;
      return {
        resultText: `${sampleA} × ${sampleB} = ${prod}`,
        parityLabel: prod % 2 === 0 ? 'Always Even' : 'Always Odd',
        explanation: `Only Odd × Odd gives an Odd product; any multiplication with an Even factor produces an Even result.`,
      };
    }
    // Division case (Textbook Thinking Time p. 3)
    const isWhole = sampleA % sampleB === 0;
    if (!isWhole) {
      return {
        resultText: `${sampleA} ÷ ${sampleB} = ${(sampleA / sampleB).toFixed(2)} (not a whole number)`,
        parityLabel: 'Not always a whole number',
        explanation:
          'Unlike multiplication, dividing two integers does not always give a whole number—so Even/Odd rules do not always hold for division!',
      };
    }
    const q = sampleA / sampleB;
    return {
      resultText: `${sampleA} ÷ ${sampleB} = ${q}`,
      parityLabel: q % 2 === 0 ? 'Even here (can vary)' : 'Odd here (can vary)',
      explanation:
        leftParity === 'Even' && rightParity === 'Even'
          ? 'Careful! Even ÷ Even can be Even (8 ÷ 2 = 4), Odd (6 ÷ 2 = 3), or not a whole number (6 ÷ 4 = 1.5).'
          : `${sampleA} ÷ ${sampleB} equals ${q}, which is ${q % 2 === 0 ? 'Even' : 'Odd'}—but try 8 ÷ 3 or 6 ÷ 4 to see why division behaves differently!`,
    };
  };

  const parityOutcome = evaluateParity();

  return (
    <div className="space-y-8">
      {/* Figure 1.2: Multiples Box Stacker (Textbook p. 2) */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Interactive Figure 1.2 · Section 1.1.2
            </p>
            <h3 className="font-display text-lg font-semibold text-slate-900">
              Box-Stacking Multiples Builder
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-1.5" role="group" aria-label="Choose base number">
            {BASE_CHOICES.map((num) => (
              <button
                key={num}
                type="button"
                onClick={() => setBase(num)}
                className={`font-math rounded-md px-3 py-1.5 text-xs font-semibold transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                  base === num
                    ? 'bg-sky-700 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {num}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12">
          {/* Visual Stack Area */}
          <div className="p-6 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-slate-200">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
              {Array.from({ length: groupsCount }).map((_, idx) => {
                const multiplier = idx + 1;
                const total = multiplier * base;
                return (
                  <div
                    key={multiplier}
                    className="rounded-lg border border-slate-200 bg-slate-50 p-3 flex flex-col justify-between"
                  >
                    <div className="space-y-1">
                      {Array.from({ length: multiplier }).map((__, row) => (
                        <div key={row} className="flex flex-wrap gap-1">
                          {Array.from({ length: base }).map((___, box) => (
                            <span
                              key={box}
                              className="h-2.5 w-2.5 rounded-[2px] bg-amber-500 border border-amber-600/40"
                              aria-hidden="true"
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-2 border-t border-slate-200">
                      <p className="font-math text-xs font-semibold text-slate-900">
                        {total} boxes
                      </p>
                      <p className="font-math text-xs text-sky-700">
                        {multiplier} × {base} = {total}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Control Deck */}
          <div className="p-6 lg:col-span-4 bg-slate-50/70 flex flex-col justify-between space-y-4">
            <div>
              <p className="text-sm font-semibold text-slate-900">
                Number of Groups: <span className="font-math text-sky-700">{groupsCount}</span>
              </p>
              <p className="mt-1 text-xs text-slate-600">
                Each new group adds {base} more boxes. Multiples grow without end!
              </p>

              <div className="mt-4 flex items-center gap-2">
                <button
                  type="button"
                  disabled={groupsCount <= 1}
                  onClick={() => setGroupsCount((c) => Math.max(1, c - 1))}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 disabled:opacity-40 cursor-pointer"
                >
                  <Minus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Remove Group</span>
                </button>
                <button
                  type="button"
                  disabled={groupsCount >= 8}
                  onClick={() => setGroupsCount((c) => Math.min(8, c + 1))}
                  className="inline-flex items-center gap-1 rounded-lg bg-sky-700 px-3 py-2 text-xs font-semibold text-white hover:bg-sky-800 disabled:opacity-40 cursor-pointer"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Add Group</span>
                </button>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-white p-3.5">
              <p className="text-xs font-medium text-slate-500">
                First {groupsCount} multiples of {base}:
              </p>
              <p className="font-math mt-1.5 text-sm font-semibold text-slate-900">
                {Array.from({ length: groupsCount }, (_, i) => (i + 1) * base).join(', ')}
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setBase(5);
                setGroupsCount(4);
              }}
              className="inline-flex items-center gap-1 self-start text-xs text-slate-600 hover:text-slate-900 cursor-pointer"
            >
              <RotateCcw className="h-3 w-3" aria-hidden="true" />
              <span>Reset to textbook example (5)</span>
            </button>
          </div>
        </div>
      </div>

      {/* Interactive Thinking Time: Even & Odd Parity Lab (Textbook p. 3) */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
        <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
          <p className="text-xs font-medium text-slate-500">
            Thinking Time · Textbook p. 3
          </p>
          <h3 className="font-display text-lg font-semibold text-slate-900">
            Even &amp; Odd Operation Explorer
          </h3>
          <p className="mt-1 text-xs text-slate-600">
            Test the textbook’s addition and multiplication tables—then switch to subtraction (−) or division (÷) to answer the Thinking Time challenge!
          </p>
        </div>

        <div className="p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Interactive Tester */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              {/* First number parity */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 block">First Number</span>
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                  {(['Even', 'Odd'] as Parity[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleParityPick('left', p)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                        leftParity === p ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>

              {/* Operator */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 block">Operation</span>
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                  {(['+', '−', '×', '÷'] as OpSymbol[]).map((op) => (
                    <button
                      key={op}
                      type="button"
                      onClick={() => setOperation(op)}
                      className={`font-math rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                        operation === op ? 'bg-sky-700 text-white' : 'text-slate-700'
                      }`}
                    >
                      {op}
                    </button>
                  ))}
                </div>
              </div>

              {/* Second number parity */}
              <div className="space-y-1">
                <span className="text-xs font-medium text-slate-500 block">Second Number</span>
                <div className="inline-flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                  {(['Even', 'Odd'] as Parity[]).map((p) => (
                    <button
                      key={p}
                      type="button"
                      onClick={() => handleParityPick('right', p)}
                      className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer transition-colors ${
                        rightParity === p ? 'bg-white text-slate-900 shadow-xs' : 'text-slate-600'
                      }`}
                    >
                      {p}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Sample Pickers */}
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-600">
              <div className="flex items-center gap-1.5">
                <span>Try {leftParity}:</span>
                {PARITY_EXAMPLES[leftParity].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSampleA(n)}
                    className={`font-math rounded px-2 py-1 border cursor-pointer ${
                      sampleA === n
                        ? 'border-sky-700 bg-sky-50 text-sky-900 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
              <div className="flex items-center gap-1.5">
                <span>Try {rightParity}:</span>
                {PARITY_EXAMPLES[rightParity].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => setSampleB(n)}
                    className={`font-math rounded px-2 py-1 border cursor-pointer ${
                      sampleB === n
                        ? 'border-sky-700 bg-sky-50 text-sky-900 font-semibold'
                        : 'border-slate-200 bg-white text-slate-700'
                    }`}
                  >
                    {n}
                  </button>
                ))}
              </div>
            </div>

            {/* Result Card */}
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-math text-base font-bold text-slate-900">
                  {parityOutcome.resultText}
                </span>
                <span className="text-xs font-semibold text-sky-800">
                  Result: {parityOutcome.parityLabel}
                </span>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-slate-700">
                {parityOutcome.explanation}
              </p>
            </div>
          </div>

          {/* Textbook Reference Tables (p. 3) */}
          <div className="lg:col-span-5 grid grid-cols-2 gap-3 text-xs">
            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-3 py-2 font-semibold text-slate-800">
                Addition Table
              </div>
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Even + Even</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Even</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Even + Odd</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Odd</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Odd + Even</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Odd</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Odd + Odd</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Even</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="rounded-lg border border-slate-200 overflow-hidden">
              <div className="bg-slate-100 px-3 py-2 font-semibold text-slate-800">
                Multiplication Table
              </div>
              <table className="w-full text-left">
                <tbody className="divide-y divide-slate-100">
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Even × Even</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Even</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Even × Odd</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Even</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Odd × Even</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Even</td>
                  </tr>
                  <tr>
                    <td className="px-3 py-1.5 text-slate-700">Odd × Odd</td>
                    <td className="px-3 py-1.5 font-semibold text-slate-900">Odd</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
