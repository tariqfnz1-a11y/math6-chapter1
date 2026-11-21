import { useState } from 'react';
import { ChevronRight, RotateCcw } from 'lucide-react';
import { WorkedExample } from '../types/textbook';

interface WorkedExampleCardProps {
  example: WorkedExample;
}

export function WorkedExampleCard({ example }: WorkedExampleCardProps) {
  const [stepMode, setStepMode] = useState<'all' | 'step'>('step');
  const [revealedCount, setRevealedCount] = useState<number>(1);

  const totalItems =
    example.parts?.length ??
    example.factorPairs?.length ??
    example.multipleColumns?.length ??
    1;

  const visibleCount = stepMode === 'all' ? totalItems : revealedCount;

  return (
    <article className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Header */}
      <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Example {example.number} · {example.pageRef} · {example.methodName}
          </p>
          <h4 className="mt-1 font-display text-base font-semibold text-slate-900">
            {example.title}
          </h4>
        </div>

        {totalItems > 1 && (
          <div className="flex items-center gap-1 rounded-lg border border-slate-200 bg-white p-1 shrink-0">
            <button
              type="button"
              onClick={() => {
                setStepMode('step');
                setRevealedCount(1);
              }}
              className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                stepMode === 'step' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Step-by-Step
            </button>
            <button
              type="button"
              onClick={() => setStepMode('all')}
              className={`rounded px-2.5 py-1 text-xs font-medium cursor-pointer transition-colors whitespace-nowrap shrink-0 ${
                stepMode === 'all' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Full Solution
            </button>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="p-5 sm:p-6">
        {/* Division-based Examples (Example 1 & Example 3) */}
        {example.parts && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {example.parts.slice(0, visibleCount).map((part) => (
              <div
                key={part.label}
                className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 flex flex-col justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-sky-800">{part.label}</p>
                  <p className="mt-1 text-xs text-slate-600">{part.prompt}</p>

                  {part.divisionLayout && (
                    <div className="mt-3 flex items-start gap-5 rounded-md border border-slate-200 bg-white p-3.5">
                      {/* Textbook Long Division Bracket */}
                      <div className="font-math text-sm leading-snug text-slate-900 shrink-0">
                        <div className="pl-6 border-b border-slate-400 text-sky-800 font-semibold">
                          {part.divisionLayout.quotient}
                        </div>
                        <div className="flex items-center">
                          <span className="pr-1.5 text-slate-600">
                            {part.divisionLayout.divisor}
                          </span>
                          <span className="border-l border-slate-900 pl-2 font-semibold">
                            {part.divisionLayout.dividend}
                          </span>
                        </div>
                        <div className="pl-6 text-xs text-slate-500 mt-1">
                          rem: <strong className="text-slate-900">{part.divisionLayout.remainder}</strong>
                        </div>
                      </div>

                      <ul className="space-y-1 text-xs text-slate-600">
                        {part.steps.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>

                <div className="mt-3 pt-3 border-t border-slate-200">
                  <p
                    className={`text-xs font-semibold ${
                      part.divisionLayout?.remainder === 0 ? 'text-emerald-800' : 'text-amber-800'
                    }`}
                  >
                    {part.conclusion}
                  </p>
                  {part.note && (
                    <p className="mt-1.5 text-[11px] leading-relaxed text-slate-500">
                      {part.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Factor-Pair Examples (Example 2) */}
        {example.factorPairs && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {example.factorPairs.slice(0, visibleCount).map((item) => (
              <div
                key={item.target}
                className="rounded-lg border border-slate-200 bg-slate-50/60 p-4"
              >
                <p className="text-sm font-semibold text-slate-900 mb-3">
                  Factors of <span className="font-math text-sky-700">{item.target}</span>
                </p>
                <div className="rounded-md border border-slate-200 bg-white p-3.5 font-math text-sm space-y-1">
                  {item.pairs.map(([a, b]) => (
                    <div key={`${a}-${b}`} className="text-slate-800">
                      {item.target} = <span className="font-semibold text-sky-700">{a}</span> ×{' '}
                      <span className="font-semibold text-sky-700">{b}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3 text-xs leading-relaxed text-slate-700">
                  Hence, the factors of {item.target} are{' '}
                  <strong className="font-math text-slate-900">{item.factors.join(', ')}</strong>.
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Multiples Columns Example (Example 4) */}
        {example.multipleColumns && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {example.multipleColumns.slice(0, visibleCount).map((col) => (
              <div
                key={col.base}
                className="rounded-lg border border-slate-200 bg-slate-50/60 p-4 flex flex-col justify-between"
              >
                <div>
                  <h5 className="text-sm font-semibold text-slate-900 mb-2">
                    Multiples of {col.base}
                  </h5>
                  <div className="rounded-md border border-slate-200 bg-white p-3 font-math text-xs space-y-1 text-slate-800">
                    {col.rows.map((r) => (
                      <div key={r.multiplier}>
                        {r.multiplier} × {col.base} ={' '}
                        <strong className="text-sky-700">{r.product}</strong>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-xs text-slate-700 leading-relaxed">{col.listText}</p>
              </div>
            ))}
          </div>
        )}

        {/* Stepper Footer */}
        {stepMode === 'step' && totalItems > 1 && (
          <div className="mt-5 flex items-center justify-between pt-4 border-t border-slate-100">
            <span className="text-xs text-slate-500">
              Showing part {visibleCount} of {totalItems}
            </span>
            <div className="flex items-center gap-2">
              {visibleCount > 1 && (
                <button
                  type="button"
                  onClick={() => setRevealedCount(1)}
                  className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-medium text-slate-600 hover:bg-slate-50 cursor-pointer"
                >
                  <RotateCcw className="h-3 w-3" aria-hidden="true" />
                  <span>Start Over</span>
                </button>
              )}
              {visibleCount < totalItems && (
                <button
                  type="button"
                  onClick={() => setRevealedCount((c) => Math.min(totalItems, c + 1))}
                  className="inline-flex items-center gap-1 rounded-lg bg-sky-700 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer"
                >
                  <span>Next Part</span>
                  <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </article>
  );
}
