import { useEffect, useState } from 'react';
import {
  Check,
  HelpCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { PracticeBankCategory, PracticeBankQuestion } from '../types/textbook';

interface InteractivePracticeBankProps {
  questions: PracticeBankQuestion[];
  onMilestoneCompleted?: () => void;
}

interface QuestionAttemptState {
  draftValue: string;
  selectedOption: number | null;
  selectedBoolean: boolean | null;
  attempted: boolean;
  isCorrect: boolean;
  attemptsCount: number;
  explanationRevealed: boolean;
}

type FilterTab = 'all' | PracticeBankCategory;

const STORAGE_KEY = 'math6_ch1_s1_interactive_practice_v1';

const CATEGORY_TABS: { id: FilterTab; label: string }[] = [
  { id: 'mcq', label: 'MCQ (10)' },
  { id: 'fill-blank', label: 'Fill Blanks (10)' },
  { id: 'true-false', label: 'True / False (10)' },
  { id: 'short-answer', label: 'Short Answer (5)' },
  { id: 'problem-solving', label: 'Problem Solving (5)' },
  { id: 'real-life', label: 'Real-Life (2)' },
  { id: 'challenge', label: 'Challenge (1)' },
  { id: 'all', label: 'All (43)' },
];

const DEFAULT_ATTEMPT: QuestionAttemptState = {
  draftValue: '',
  selectedOption: null,
  selectedBoolean: null,
  attempted: false,
  isCorrect: false,
  attemptsCount: 0,
  explanationRevealed: false,
};

function stripThousandsCommas(raw: string): string {
  let prev = raw;
  let next = prev.replace(/(\d),(\d{3})(?!\d)/g, '$1$2');
  while (next !== prev) {
    prev = next;
    next = prev.replace(/(\d),(\d{3})(?!\d)/g, '$1$2');
  }
  return next;
}

function normalizeMathText(raw: string): string {
  return stripThousandsCommas(raw)
    .toLowerCase()
    .replace(/[×*]/g, 'x')
    .replace(/\s*x\s*/g, ' x ')
    .replace(/\s*\^\s*/g, '^')
    .replace(/\s+/g, ' ')
    .trim();
}

function parseNumberList(raw: string): number[] {
  return stripThousandsCommas(raw)
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && /^-?\d+$/.test(s))
    .map(Number);
}

function numbersMatch(actual: number[], expected: number[], ordered?: boolean): boolean {
  if (actual.length !== expected.length) return false;
  if (ordered) {
    return actual.every((val, idx) => val === expected[idx]);
  }
  const sortedA = [...actual].sort((x, y) => x - y);
  const sortedB = [...expected].sort((x, y) => x - y);
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

function loadSavedProgress(): Record<string, QuestionAttemptState> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (parsed && typeof parsed === 'object') {
      return parsed as Record<string, QuestionAttemptState>;
    }
    return {};
  } catch {
    return {};
  }
}

export function InteractivePracticeBank({
  questions,
  onMilestoneCompleted,
}: InteractivePracticeBankProps) {
  const [activeTab, setActiveTab] = useState<FilterTab>('mcq');
  const [progressMap, setProgressMap] = useState<Record<string, QuestionAttemptState>>(() =>
    loadSavedProgress()
  );
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [confirmResetAll, setConfirmResetAll] = useState<boolean>(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(progressMap));
    } catch {
      // Ignore storage quota or private-mode restrictions
    }
  }, [progressMap]);

  const getAttempt = (id: string): QuestionAttemptState => progressMap[id] ?? DEFAULT_ATTEMPT;

  const updateAttempt = (id: string, patch: Partial<QuestionAttemptState>) => {
    setProgressMap((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? DEFAULT_ATTEMPT), ...patch },
    }));
  };

  const evaluateQuestion = (q: PracticeBankQuestion) => {
    const state = getAttempt(q.id);
    let correct = false;

    if (q.category === 'mcq') {
      if (state.selectedOption === null) return;
      correct = state.selectedOption === q.correctIndex;
    } else if (q.category === 'true-false') {
      if (state.selectedBoolean === null) return;
      correct = state.selectedBoolean === q.correctBoolean;
    } else if (q.acceptedTextAnswers) {
      const normalized = normalizeMathText(state.draftValue);
      if (!normalized) return;
      correct = q.acceptedTextAnswers.some((ans) => normalizeMathText(ans) === normalized);
    } else if (q.expectedNumbers) {
      const parsed = parseNumberList(state.draftValue);
      if (parsed.length === 0) return;
      const normalizedList = q.orderedNumbers ? parsed : Array.from(new Set(parsed));
      correct = numbersMatch(normalizedList, q.expectedNumbers, q.orderedNumbers);
    }

    const nextAttempts = state.attemptsCount + 1;
    updateAttempt(q.id, {
      attempted: true,
      isCorrect: correct,
      attemptsCount: nextAttempts,
      explanationRevealed: correct ? true : state.explanationRevealed,
    });

    if (correct && onMilestoneCompleted) {
      const totalCorrectAfter =
        questions.filter((item) =>
          item.id === q.id ? true : Boolean(progressMap[item.id]?.isCorrect)
        ).length;
      if (totalCorrectAfter >= 10) {
        onMilestoneCompleted();
      }
    }
  };

  const handleRetryQuestion = (id: string) => {
    setProgressMap((prev) => {
      const current = prev[id] ?? DEFAULT_ATTEMPT;
      return {
        ...prev,
        [id]: {
          ...DEFAULT_ATTEMPT,
          attemptsCount: current.attemptsCount,
        },
      };
    });
  };

  const handleResetAll = () => {
    setProgressMap({});
    setOpenHints({});
    setConfirmResetAll(false);
    try {
      window.localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const visibleQuestions =
    activeTab === 'all' ? questions : questions.filter((q) => q.category === activeTab);

  const totalQuestions = questions.length;
  const totalAttempted = questions.filter((q) => progressMap[q.id]?.attempted).length;
  const totalCorrect = questions.filter((q) => progressMap[q.id]?.isCorrect).length;
  const progressPercent = totalQuestions > 0 ? Math.round((totalAttempted / totalQuestions) * 100) : 0;

  const tabCorrect = visibleQuestions.filter((q) => progressMap[q.id]?.isCorrect).length;
  const tabAttempted = visibleQuestions.filter((q) => progressMap[q.id]?.attempted).length;

  return (
    <div id="interactive-practice-bank" className="rounded-xl border border-slate-200 bg-white overflow-hidden">
      {/* Header + Progress & Score Summary */}
      <div className="border-b border-slate-200 bg-slate-50 p-5 sm:p-6 space-y-5">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Section 1.1 Comprehensive Practice Bank · Progress Saved Locally
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
              Interactive Practice &amp; Mastery Check
            </h3>
            <p className="mt-1 text-sm text-slate-600 max-w-2xl">
              Work through all 43 textbook-level questions across 7 formats. Answers stay hidden until you submit an attempt, and you can retry anytime.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-right">
              <p className="text-[11px] font-medium text-slate-500">Overall Score</p>
              <p className="font-math text-lg font-bold text-slate-900">
                {totalCorrect} / {totalQuestions}
              </p>
            </div>

            {!confirmResetAll ? (
              <button
                type="button"
                onClick={() => setConfirmResetAll(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Reset Progress</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-2.5 py-1.5">
                <span className="text-xs font-medium text-rose-900">Clear all?</span>
                <button
                  type="button"
                  onClick={handleResetAll}
                  className="rounded bg-rose-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-rose-800 cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmResetAll(false)}
                  className="rounded border border-slate-200 bg-white px-2 py-1 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Overall Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600">
            <span className="font-math">
              Overall Progress: <strong className="text-slate-900">{totalAttempted}</strong> / {totalQuestions} attempted ({progressPercent}%)
            </span>
            <span className="font-math">
              Current Tab: <strong className="text-sky-800">{tabCorrect}</strong> correct of {tabAttempted} attempted ({visibleQuestions.length} total)
            </span>
          </div>
          <div
            className="h-2 w-full overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Overall interactive practice progress"
          >
            <div
              className="h-full bg-sky-700 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Category Navigation Tabs */}
        <div
          className="flex flex-wrap items-center gap-1.5"
          role="tablist"
          aria-label="Practice question categories"
        >
          {CATEGORY_TABS.map((tab) => {
            const countInTab =
              tab.id === 'all'
                ? totalQuestions
                : questions.filter((q) => q.category === tab.id).length;
            const correctInTab =
              tab.id === 'all'
                ? totalCorrect
                : questions.filter(
                    (q) => q.category === tab.id && progressMap[q.id]?.isCorrect
                  ).length;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                onClick={() => setActiveTab(tab.id)}
                className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                  isActive
                    ? 'border-sky-700 bg-sky-700 text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                <span>{tab.label}</span>
                {correctInTab > 0 && (
                  <span
                    className={`font-math ml-1.5 text-[11px] ${
                      isActive ? 'text-sky-100' : 'text-emerald-700'
                    }`}
                  >
                    · {correctInTab}/{countInTab}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Question Cards List */}
      <div className="divide-y divide-slate-200">
        {visibleQuestions.map((q, idx) => {
          const state = getAttempt(q.id);
          const hintOpen = Boolean(openHints[q.id]);
          const hasInput =
            q.category === 'mcq'
              ? state.selectedOption !== null
              : q.category === 'true-false'
                ? state.selectedBoolean !== null
                : state.draftValue.trim().length > 0;

          return (
            <div key={q.id} className="p-5 sm:p-6 space-y-4">
              {/* Question Meta & Prompt */}
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1 max-w-3xl">
                  <p className="text-xs font-medium text-slate-500">
                    <span className="font-math text-sky-700 font-semibold mr-1.5">
                      Q{idx + 1}.
                    </span>
                    <span>{q.categoryLabel}</span>
                    {q.contextNote && (
                      <>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span>{q.contextNote}</span>
                      </>
                    )}
                    {state.attempted && (
                      <>
                        <span className="mx-1.5" aria-hidden="true">
                          ·
                        </span>
                        <span
                          className={`font-semibold ${
                            state.isCorrect ? 'text-emerald-700' : 'text-amber-700'
                          }`}
                        >
                          {state.isCorrect ? 'Answered Correctly' : 'Needs Review'}
                        </span>
                      </>
                    )}
                  </p>
                  <p className="text-sm sm:text-[15px] font-semibold leading-relaxed text-slate-900">
                    {q.prompt}
                  </p>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <button
                    type="button"
                    onClick={() =>
                      setOpenHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                    }
                    className="inline-flex items-center gap-1 text-xs font-medium text-slate-600 hover:text-slate-900 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                    <span>{hintOpen ? 'Hide hint' : 'Hint'}</span>
                  </button>

                  {state.attempted && (
                    <button
                      type="button"
                      onClick={() => handleRetryQuestion(q.id)}
                      className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-white px-2.5 py-1 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      <RotateCcw className="h-3 w-3" aria-hidden="true" />
                      <span>Retry</span>
                    </button>
                  )}
                </div>
              </div>

              {hintOpen && (
                <p className="rounded-lg border border-sky-200 bg-sky-50/70 px-3.5 py-2 text-xs text-sky-950">
                  <strong>Hint:</strong> {q.hint}
                </p>
              )}

              {/* Input Controls Based on Question Category */}
              {q.category === 'mcq' && q.options && (
                <div className="space-y-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = state.selectedOption === optIdx;
                      let btnStyle =
                        'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';

                      if (state.attempted) {
                        if (optIdx === q.correctIndex && (state.isCorrect || state.explanationRevealed)) {
                          btnStyle =
                            'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isSelected && !state.isCorrect) {
                          btnStyle =
                            'border-amber-500 bg-amber-50 text-amber-950 font-semibold';
                        } else if (isSelected && state.isCorrect) {
                          btnStyle =
                            'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                        } else {
                          btnStyle = 'border-slate-200 bg-white text-slate-500';
                        }
                      } else if (isSelected) {
                        btnStyle =
                          'border-sky-700 bg-sky-50 text-sky-950 font-semibold';
                      }

                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={state.attempted}
                          onClick={() =>
                            updateAttempt(q.id, { selectedOption: optIdx })
                          }
                          className={`rounded-lg border px-4 py-2.5 text-left text-xs sm:text-sm transition-colors cursor-pointer disabled:cursor-default ${btnStyle}`}
                        >
                          <span className="font-math font-semibold mr-2">
                            {String.fromCharCode(97 + optIdx)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>

                  {!state.attempted && (
                    <button
                      type="button"
                      disabled={!hasInput}
                      onClick={() => evaluateQuestion(q)}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              )}

              {q.category === 'true-false' && (
                <div className="flex flex-wrap items-center gap-3">
                  {[true, false].map((boolVal) => {
                    const isSelected = state.selectedBoolean === boolVal;
                    let btnStyle =
                      'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';

                    if (state.attempted) {
                      if (boolVal === q.correctBoolean && (state.isCorrect || state.explanationRevealed)) {
                        btnStyle =
                          'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                      } else if (isSelected && !state.isCorrect) {
                        btnStyle =
                          'border-amber-500 bg-amber-50 text-amber-950 font-semibold';
                      } else if (isSelected && state.isCorrect) {
                        btnStyle =
                          'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                      } else {
                        btnStyle = 'border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      btnStyle =
                        'border-sky-700 bg-sky-50 text-sky-950 font-semibold';
                    }

                    return (
                      <button
                        key={String(boolVal)}
                        type="button"
                        disabled={state.attempted}
                        onClick={() =>
                          updateAttempt(q.id, { selectedBoolean: boolVal })
                        }
                        className={`rounded-lg border px-5 py-2 text-xs sm:text-sm font-medium transition-colors cursor-pointer disabled:cursor-default whitespace-nowrap shrink-0 ${btnStyle}`}
                      >
                        {boolVal ? 'True' : 'False'}
                      </button>
                    );
                  })}

                  {!state.attempted && (
                    <button
                      type="button"
                      disabled={!hasInput}
                      onClick={() => evaluateQuestion(q)}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              )}

              {q.category !== 'mcq' && q.category !== 'true-false' && (
                <div className="flex flex-col sm:flex-row gap-2.5 max-w-xl">
                  <input
                    type="text"
                    aria-label={`Answer for ${q.prompt}`}
                    disabled={state.attempted && state.isCorrect}
                    value={state.draftValue}
                    onChange={(e) =>
                      updateAttempt(q.id, {
                        draftValue: e.target.value,
                        attempted: state.attempted && state.isCorrect ? true : false,
                        explanationRevealed:
                          state.attempted && state.isCorrect ? state.explanationRevealed : false,
                      })
                    }
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' && hasInput && !(state.attempted && state.isCorrect)) {
                        evaluateQuestion(q);
                      }
                    }}
                    placeholder={q.placeholder ?? 'Enter your answer'}
                    className="font-math flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none disabled:bg-slate-50"
                  />
                  {!(state.attempted && state.isCorrect) && (
                    <button
                      type="button"
                      disabled={!hasInput}
                      onClick={() => evaluateQuestion(q)}
                      className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Check Answer
                    </button>
                  )}
                </div>
              )}

              {/* Instant Feedback & Post-Attempt Explanation (Never rendered before attempt) */}
              {state.attempted && state.isCorrect && (
                <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs sm:text-sm text-emerald-950 space-y-1">
                  <p className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
                    <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                    <span>Correct!</span>
                  </p>
                  <p className="leading-relaxed">{q.explanation}</p>
                </div>
              )}

              {state.attempted && !state.isCorrect && (
                <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3.5 text-xs sm:text-sm text-amber-950 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="inline-flex items-center gap-1.5 font-semibold text-amber-900">
                      <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                      <span>Not quite right yet. Try again or check the explanation!</span>
                    </p>
                    {!state.explanationRevealed && (
                      <button
                        type="button"
                        onClick={() =>
                          updateAttempt(q.id, { explanationRevealed: true })
                        }
                        className="text-xs font-semibold text-sky-800 hover:underline cursor-pointer whitespace-nowrap shrink-0"
                      >
                        Explain Correct Answer
                      </button>
                    )}
                  </div>

                  {!state.explanationRevealed ? (
                    <p className="text-xs text-amber-900">
                      <strong>Hint:</strong> {q.hint}
                    </p>
                  ) : (
                    <div className="pt-2 border-t border-amber-200 space-y-1 text-xs leading-relaxed">
                      <p className="font-math font-semibold text-slate-900">
                        Correct Answer: {q.correctDisplay}
                      </p>
                      <p>{q.explanation}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
