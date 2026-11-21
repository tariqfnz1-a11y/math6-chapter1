import { useEffect, useState } from 'react';
import { Check, HelpCircle, RotateCcw } from 'lucide-react';
import { PracticeQuestion, SelfAssessmentQuestion } from '../types/textbook';

interface PracticeSetData {
  id: string;
  title: string;
  pageRef: string;
  instruction: string;
  questions: PracticeQuestion[];
}

interface PracticeAndAssessmentProps {
  practiceSets: PracticeSetData[];
  selfAssessment: SelfAssessmentQuestion[];
  onSectionCompleted: () => void;
}

const STORAGE_KEY = 'math6_ch1_s1_practice_v1';

interface SavedS1State {
  inputs: Record<string, string>;
  checkedPractice: Record<string, 'correct' | 'try-again'>;
  selectedAnswers: Record<string, number>;
  quizSubmitted: boolean;
}

function loadSavedS1State(): SavedS1State {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SavedS1State>;
      return {
        inputs: parsed.inputs ?? {},
        checkedPractice: parsed.checkedPractice ?? {},
        selectedAnswers: parsed.selectedAnswers ?? {},
        quizSubmitted: Boolean(parsed.quizSubmitted),
      };
    }
  } catch {
    // Ignore storage errors
  }
  return { inputs: {}, checkedPractice: {}, selectedAnswers: {}, quizSubmitted: false };
}

function stripThousandsCommas(raw: string): string {
  let prev = raw;
  let next = prev.replace(/(\d),(\d{3})(?!\d)/g, '$1$2');
  while (next !== prev) {
    prev = next;
    next = prev.replace(/(\d),(\d{3})(?!\d)/g, '$1$2');
  }
  return next;
}

function parseNumberList(raw: string): number[] {
  return stripThousandsCommas(raw)
    .split(/[\s,;]+/)
    .map((s) => s.trim())
    .filter((s) => s.length > 0 && /^-?\d+$/.test(s))
    .map(Number);
}

function arraysEqual(a: number[], b: number[], ordered?: boolean): boolean {
  if (a.length !== b.length) return false;
  if (ordered) {
    return a.every((val, idx) => val === b[idx]);
  }
  const sortedA = [...a].sort((x, y) => x - y);
  const sortedB = [...b].sort((x, y) => x - y);
  return sortedA.every((val, idx) => val === sortedB[idx]);
}

export function PracticeAndAssessment({
  practiceSets,
  selfAssessment,
  onSectionCompleted,
}: PracticeAndAssessmentProps) {
  const saved = loadSavedS1State();
  const [inputs, setInputs] = useState<Record<string, string>>(saved.inputs);
  const [checkedPractice, setCheckedPractice] = useState<Record<string, 'correct' | 'try-again'>>(
    saved.checkedPractice
  );
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [revealedAnswers, setRevealedAnswers] = useState<Record<string, boolean>>({});

  // Self-assessment state
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>(
    saved.selectedAnswers
  );
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(saved.quizSubmitted);

  useEffect(() => {
    try {
      const payload: SavedS1State = {
        inputs,
        checkedPractice,
        selectedAnswers,
        quizSubmitted,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage errors
    }
  }, [inputs, checkedPractice, selectedAnswers, quizSubmitted]);

  const handleCheckQuestion = (q: PracticeQuestion) => {
    const parsed = parseNumberList(inputs[q.id] ?? '');
    const uniqueParsed = q.ordered ? parsed : Array.from(new Set(parsed));
    const isCorrect = arraysEqual(uniqueParsed, q.expectedValues, q.ordered);
    setCheckedPractice((prev) => ({
      ...prev,
      [q.id]: isCorrect ? 'correct' : 'try-again',
    }));
  };

  const correctQuizCount = selfAssessment.filter(
    (q) => selectedAnswers[q.id] === q.correctIndex
  ).length;

  const handleSubmitQuiz = () => {
    setQuizSubmitted(true);
    if (Object.keys(selectedAnswers).length === selfAssessment.length) {
      onSectionCompleted();
    }
  };

  return (
    <div id="practice-assessment" className="space-y-10">
      {/* Textbook Practice Sets (Practice -1 & Practice -2) */}
      <div className="space-y-6">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Guided Textbook Practice · pp. 2–3
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Practice Exercises
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {practiceSets.map((set) => (
            <div
              key={set.id}
              className="rounded-xl border border-slate-200 bg-white p-6 space-y-5"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <h4 className="font-display text-lg font-semibold text-slate-900">
                    {set.title}
                  </h4>
                  <span className="text-xs text-slate-500">{set.pageRef}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-slate-600">
                  {set.instruction}
                </p>
              </div>

              <div className="space-y-4">
                {set.questions.map((q) => {
                  const status = checkedPractice[q.id];
                  const showHint = openHints[q.id];
                  const showAns = revealedAnswers[q.id];
                  return (
                    <div
                      key={q.id}
                      className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2.5"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <label
                          htmlFor={q.id}
                          className="text-sm font-semibold text-slate-900"
                        >
                          <span className="text-sky-700 mr-1.5">{q.label}</span>
                          Number: <span className="font-math">{q.prompt}</span>
                        </label>
                        <div className="flex items-center gap-3 text-xs">
                          <button
                            type="button"
                            onClick={() =>
                              setOpenHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                            }
                            className="inline-flex items-center gap-1 text-slate-600 hover:text-slate-900 cursor-pointer"
                          >
                            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>{showHint ? 'Hide hint' : 'Hint'}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setRevealedAnswers((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                            }
                            className="text-sky-700 hover:underline font-medium cursor-pointer"
                          >
                            {showAns ? 'Hide answer' : 'Show answer'}
                          </button>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <input
                          id={q.id}
                          type="text"
                          value={inputs[q.id] ?? ''}
                          onChange={(e) =>
                            setInputs((prev) => ({ ...prev, [q.id]: e.target.value }))
                          }
                          placeholder={
                            q.ordered
                              ? 'e.g. 3, 6, 9, 12, 15'
                              : 'e.g. 1, 2, 3, ...'
                          }
                          className="font-math flex-1 rounded-lg border border-slate-300 bg-white px-3 py-2 text-xs text-slate-900 placeholder:text-slate-400 focus:border-sky-600 focus:outline-none"
                        />
                        <button
                          type="button"
                          onClick={() => handleCheckQuestion(q)}
                          className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                        >
                          Check
                        </button>
                      </div>

                      {status === 'correct' && (
                        <p className="inline-flex items-center gap-1.5 text-xs font-semibold text-emerald-700">
                          <Check className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Correct! Every number matches.</span>
                        </p>
                      )}
                      {status === 'try-again' && (
                        <p className="text-xs font-medium text-amber-800">
                          Not quite complete yet—check for missing pairs or arithmetic slips, or use the hint.
                        </p>
                      )}
                      {showHint && (
                        <p className="text-xs text-slate-600 bg-white rounded border border-slate-200 px-3 py-2">
                          <strong>Hint:</strong> {q.hint}
                        </p>
                      )}
                      {showAns && (
                        <p className="font-math text-xs font-semibold text-sky-900 bg-sky-50 rounded border border-sky-200 px-3 py-2">
                          Answer: {q.expectedValues.join(', ')}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Short Self-Assessment */}
      <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Section 1.1 Check-In · 5 Questions
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
              Short Self-Assessment
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              Test your understanding of factors, multiples, division remainders, and parity rules before moving to Section 1.2.
            </p>
          </div>
          {quizSubmitted && (
            <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2.5 text-right">
              <p className="text-xs text-slate-500">Your Score</p>
              <p className="font-math text-lg font-bold text-slate-900">
                {correctQuizCount} / {selfAssessment.length}
              </p>
            </div>
          )}
        </div>

        <ol className="space-y-6">
          {selfAssessment.map((q, qIdx) => {
            const chosen = selectedAnswers[q.id];
            const isCorrect = chosen === q.correctIndex;
            return (
              <li key={q.id} className="space-y-3">
                <p className="text-sm font-semibold text-slate-900">
                  <span className="font-math text-sky-700 mr-2">Q{qIdx + 1}.</span>
                  {q.question}
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = chosen === optIdx;
                    let optionStyle =
                      'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';

                    if (quizSubmitted) {
                      if (optIdx === q.correctIndex) {
                        optionStyle =
                          'border-emerald-600 bg-emerald-50 text-emerald-900 font-semibold';
                      } else if (isSelected && optIdx !== q.correctIndex) {
                        optionStyle =
                          'border-rose-400 bg-rose-50 text-rose-900';
                      } else {
                        optionStyle = 'border-slate-200 bg-white text-slate-500';
                      }
                    } else if (isSelected) {
                      optionStyle =
                        'border-sky-700 bg-sky-50 text-sky-900 font-semibold';
                    }

                    return (
                      <button
                        key={opt}
                        type="button"
                        disabled={quizSubmitted}
                        onClick={() =>
                          setSelectedAnswers((prev) => ({ ...prev, [q.id]: optIdx }))
                        }
                        className={`rounded-lg border px-4 py-2.5 text-left text-xs sm:text-sm transition-colors cursor-pointer disabled:cursor-default ${optionStyle}`}
                      >
                        <span className="font-math mr-2 font-semibold">
                          {String.fromCharCode(97 + optIdx)}.
                        </span>
                        {opt}
                      </button>
                    );
                  })}
                </div>

                {quizSubmitted && (
                  <p
                    className={`text-xs leading-relaxed rounded-lg border px-3.5 py-2.5 ${
                      isCorrect
                        ? 'border-emerald-200 bg-emerald-50/70 text-emerald-900'
                        : 'border-amber-200 bg-amber-50/70 text-amber-900'
                    }`}
                  >
                    <strong>{isCorrect ? 'Correct:' : 'Explanation:'}</strong> {q.explanation}
                  </p>
                )}
              </li>
            );
          })}
        </ol>

        <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-slate-200">
          {!quizSubmitted ? (
            <button
              type="button"
              disabled={Object.keys(selectedAnswers).length < selfAssessment.length}
              onClick={handleSubmitQuiz}
              className="rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-45 transition-colors cursor-pointer"
            >
              Submit Self-Assessment ({Object.keys(selectedAnswers).length}/{selfAssessment.length} answered)
            </button>
          ) : (
            <button
              type="button"
              onClick={() => {
                setSelectedAnswers({});
                setQuizSubmitted(false);
              }}
              className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
            >
              <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
              <span>Retake Self-Assessment</span>
            </button>
          )}
          <span className="text-xs text-slate-500">
            Immediate explanations appear after you submit all 5 questions.
          </span>
        </div>
      </div>
    </div>
  );
}
