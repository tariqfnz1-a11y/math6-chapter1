import { useEffect, useState } from 'react';
import { Play, Pause, RotateCcw, Bus, TrainFront } from 'lucide-react';
import { CHAPTER_1_META } from '../data/chapter1Meta';

interface ChapterOpenerProps {
  onStartLesson: () => void;
}

export function ChapterOpener({ onStartLesson }: ChapterOpenerProps) {
  const [elapsedSec, setElapsedSec] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [prediction, setPrediction] = useState<string | null>(null);

    useEffect(() => {
    if (!isPlaying) return;
    const timer = window.setInterval(() => {
      setElapsedSec((prev) => Math.min(prev + 15, 360));
    }, 180);
    return () => window.clearInterval(timer);
  }, [isPlaying]);

  useEffect(() => {
    if (elapsedSec >= 360) setIsPlaying(false);
  }, [elapsedSec]);

  const busProgress = (elapsedSec % 180) / 180;
  const trainProgress = (elapsedSec % 360) / 360;
  const busArrivals = Math.floor(elapsedSec / 180);
  const trainArrivals = Math.floor(elapsedSec / 360);
  const meetTogether = elapsedSec === 360;

  return (
    <section
      id="chapter-opener"
      className="border-b border-slate-200 bg-white py-10 sm:py-14"
    >
      <div className="mx-auto max-w-5xl px-4 sm:px-8">
        {/* Textbook Chapter Header */}
        <div className="mb-8">
          <p className="text-xs font-medium text-slate-500">
            {CHAPTER_1_META.domain} · {CHAPTER_1_META.subDomainNumber} · Textbook Page 1
          </p>
          <h1 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            Chapter 1: {CHAPTER_1_META.title}
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-slate-600">
            {CHAPTER_1_META.textbookSource}
          </p>
        </div>

        {/* Two-column Book Opener: Learning Outcomes + Interactive Transit Hook */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-12 lg:items-stretch">
          {/* Students' Learning Outcomes */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-slate-50 p-6 lg:col-span-5">
            <div>
              <h2 className="font-display text-base font-semibold text-slate-900">
                Students’ Learning Outcomes
              </h2>
              <p className="mt-1 text-xs text-slate-500">
                By the end of this sub-domain, you will be able to:
              </p>
              <ul className="mt-4 space-y-3 text-sm text-slate-700">
                {CHAPTER_1_META.learningOutcomes.map((outcome, index) => (
                  <li key={outcome} className="flex items-start gap-3">
                    <span className="font-math mt-0.5 text-xs font-semibold text-sky-700">
                      0{index + 1}.
                    </span>
                    <span>{outcome}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-6 pt-5 border-t border-slate-200">
              <button
                type="button"
                onClick={onStartLesson}
                className="w-full rounded-lg bg-sky-700 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 transition-colors cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
              >
                Begin Section 1.1: Factors &amp; Multiples
              </button>
            </div>
          </div>

          {/* Interactive Chapter Opener Hook (Hailey College Transit Stop) */}
          <div className="flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-6 lg:col-span-7">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-display text-base font-semibold text-slate-900">
                  Opening Puzzle · {CHAPTER_1_META.openerHook.title}
                </h2>
                <span className="text-xs text-slate-500">
                  {CHAPTER_1_META.openerHook.pageRef}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-slate-700">
                {CHAPTER_1_META.openerHook.scenario}
              </p>

              {/* Quick Prediction Choice */}
              <div className="mt-4">
                <p className="text-xs font-medium text-slate-600">
                  Make a quick prediction, then run the timer:
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {['180 seconds', '360 seconds', '540 seconds'].map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setPrediction(option)}
                      className={`rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                        prediction === option
                          ? 'border-sky-700 bg-sky-50 text-sky-900'
                          : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Dual-Track Simulation Stage */}
            <div className="mt-5 rounded-lg border border-slate-200 bg-slate-50 p-4">
              <div className="flex items-center justify-between text-xs text-slate-600 mb-3">
                <span className="font-medium">Transit Arrival Timeline</span>
                <span className="font-math font-semibold text-slate-900">
                  Elapsed: {elapsedSec} s ({(elapsedSec / 60).toFixed(1)} min)
                </span>
              </div>

              <div className="space-y-3">
                {/* Metro Bus Track */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                      <Bus className="h-3.5 w-3.5 text-sky-700" aria-hidden="true" />
                      Metro Bus (every 180 s)
                    </span>
                    <span className="font-math text-slate-600">
                      Arrivals: {busArrivals}
                    </span>
                  </div>
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-sky-600 transition-transform duration-150 origin-left"
                      style={{
                        transform: `scaleX(${
                          elapsedSec > 0 && elapsedSec % 180 === 0 ? 1 : busProgress
                        })`,
                      }}
                    />
                  </div>
                </div>

                {/* Orange Train Track */}
                <div>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="inline-flex items-center gap-1.5 font-medium text-slate-700">
                      <TrainFront className="h-3.5 w-3.5 text-amber-700" aria-hidden="true" />
                      Orange Train (every 360 s)
                    </span>
                    <span className="font-math text-slate-600">
                      Arrivals: {trainArrivals}
                    </span>
                  </div>
                  <div className="relative h-2.5 w-full overflow-hidden rounded-full bg-slate-200">
                    <div
                      className="h-full bg-amber-600 transition-transform duration-150 origin-left"
                      style={{
                        transform: `scaleX(${
                          elapsedSec === 360 ? 1 : trainProgress
                        })`,
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* Controls & Live Outcome */}
              <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-slate-200">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      if (elapsedSec >= 360) setElapsedSec(0);
                      setIsPlaying((p) => !p);
                    }}
                    className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    {isPlaying ? (
                      <>
                        <Pause className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Pause</span>
                      </>
                    ) : (
                      <>
                        <Play className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{elapsedSec >= 360 ? 'Replay' : 'Simulate'}</span>
                      </>
                    )}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      setElapsedSec(0);
                    }}
                    className="inline-flex items-center gap-1 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>Reset</span>
                  </button>
                </div>

                {meetTogether ? (
                  <p className="text-xs font-semibold text-emerald-700">
                    Both arrive together at 360 seconds (6 minutes)!
                    {prediction === '360 seconds' ? ' Great prediction!' : ''}
                  </p>
                ) : (
                  <p className="text-xs text-slate-500">
                    Notice: 360 is a multiple of both 180 and 360.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
