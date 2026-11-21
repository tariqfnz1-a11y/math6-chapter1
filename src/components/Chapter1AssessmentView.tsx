import { useEffect, useState } from 'react';
import {
  ArrowLeft,
  Award,
  Check,
  Eye,
  FileCheck2,
  HelpCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import {
  AssessmentDifficulty,
  AssessmentQuestion,
  AssessmentQuestionCategory,
  AssessmentSectionTag,
} from '../types/textbook';

interface Chapter1AssessmentViewProps {
  questions: AssessmentQuestion[];
  onReviseSection: (sectionId: string) => void;
  onAssessmentCompleted: () => void;
}

type MainMode = 'interactive' | 'report' | 'answer-key';
type CategoryFilter = 'all' | AssessmentQuestionCategory;
type DifficultyFilter = 'all' | AssessmentDifficulty;
type SectionFilter = 'all' | AssessmentSectionTag;

interface AttemptState {
  draftValue: string;
  selectedOption: number | null;
  selectedBoolean: boolean | null;
  attempted: boolean;
  isCorrect: boolean;
  explanationRevealed: boolean;
}

interface SavedAttemptRecord {
  id: string;
  dateLabel: string;
  attempted: number;
  correct: number;
  total: number;
  percent: number;
}

const PROGRESS_STORAGE_KEY = 'math6_ch1_final_assessment_v1';
const HISTORY_STORAGE_KEY = 'math6_ch1_final_assessment_history_v1';

const DEFAULT_ATTEMPT: AttemptState = {
  draftValue: '',
  selectedOption: null,
  selectedBoolean: null,
  attempted: false,
  isCorrect: false,
  explanationRevealed: false,
};

const CATEGORY_META: { id: CategoryFilter; label: string }[] = [
  { id: 'mcq', label: 'MCQ (30)' },
  { id: 'fill-blank', label: 'Fill Blanks (20)' },
  { id: 'true-false', label: 'True / False (20)' },
  { id: 'short-answer', label: 'Short Answer (10)' },
  { id: 'problem-solving', label: 'Problem Solving (10)' },
  { id: 'real-life', label: 'Real-Life (5)' },
  { id: 'higher-order', label: 'Higher-Order (5)' },
  { id: 'all', label: 'All (100)' },
];

const SECTION_META: { tag: AssessmentSectionTag; id: string; title: string }[] = [
  { tag: '1.1', id: 'section-1-1', title: 'Factors and Multiples' },
  { tag: '1.2', id: 'section-1-2', title: 'Factors up to 3-Digit Numbers' },
  { tag: '1.3', id: 'section-1-3', title: 'Multiples up to 4-Digit Numbers' },
  { tag: '1.4', id: 'section-1-4', title: 'Prime & Composite Numbers' },
  { tag: '1.5', id: 'section-1-5', title: 'Prime Factors & Index Notation' },
  { tag: '1.6.1', id: 'section-1-6-1', title: 'H.C.F (Highest Common Factor)' },
  { tag: '1.6.2', id: 'section-1-6-2', title: 'L.C.M (Least Common Multiple)' },
  { tag: '1.7', id: 'section-1-7', title: 'Relationship Between HCF & LCM' },
  { tag: '1.8', id: 'section-1-8', title: 'Square of 2-Digit Numbers' },
];

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

function numbersMatch(actual: number[], expected: number[], ordered?: boolean): boolean {
  if (actual.length !== expected.length) return false;
  if (ordered) return actual.every((val, idx) => val === expected[idx]);
  const a = [...actual].sort((x, y) => x - y);
  const b = [...expected].sort((x, y) => x - y);
  return a.every((val, idx) => val === b[idx]);
}

function normalizeMathText(s: string): string {
  return stripThousandsCommas(s)
    .trim()
    .toLowerCase()
    .replace(/×|\*/g, 'x')
    .replace(/\s+/g, '');
}

function loadJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function Chapter1AssessmentView({
  questions,
  onReviseSection,
  onAssessmentCompleted,
}: Chapter1AssessmentViewProps) {
  const [mainMode, setMainMode] = useState<MainMode>('interactive');
  const [catFilter, setCatFilter] = useState<CategoryFilter>('mcq');
  const [diffFilter, setDiffFilter] = useState<DifficultyFilter>('all');
  const [secFilter, setSecFilter] = useState<SectionFilter>('all');
  const [progressMap, setProgressMap] = useState<Record<string, AttemptState>>(() =>
    loadJson<Record<string, AttemptState>>(PROGRESS_STORAGE_KEY, {})
  );
  const [history, setHistory] = useState<SavedAttemptRecord[]>(() =>
    loadJson<SavedAttemptRecord[]>(HISTORY_STORAGE_KEY, [])
  );
  const [openHints, setOpenHints] = useState<Record<string, boolean>>({});
  const [confirmRetake, setConfirmRetake] = useState(false);
  const [keyUnlocked, setKeyUnlocked] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progressMap));
    } catch {
      // Ignore storage errors
    }
  }, [progressMap]);

  useEffect(() => {
    try {
      window.localStorage.setItem(HISTORY_STORAGE_KEY, JSON.stringify(history));
    } catch {
      // Ignore storage errors
    }
  }, [history]);

  const getAttempt = (id: string): AttemptState => progressMap[id] ?? DEFAULT_ATTEMPT;

  const updateAttempt = (id: string, patch: Partial<AttemptState>) => {
    setProgressMap((prev) => ({
      ...prev,
      [id]: { ...(prev[id] ?? DEFAULT_ATTEMPT), ...patch },
    }));
  };

  const evaluateQuestion = (q: AssessmentQuestion) => {
    const st = getAttempt(q.id);
    let correct = false;

    if (q.category === 'mcq') {
      if (st.selectedOption === null) return;
      correct = st.selectedOption === q.correctIndex;
    } else if (q.category === 'true-false') {
      if (st.selectedBoolean === null) return;
      correct = st.selectedBoolean === q.correctBoolean;
    } else {
      const raw = st.draftValue.trim();
      if (!raw) return;

      if (q.acceptedTextAnswers) {
        const normInput = normalizeMathText(raw);
        if (q.acceptedTextAnswers.some((ans) => normalizeMathText(ans) === normInput)) {
          correct = true;
        }
      }
      if (!correct && q.expectedNumbers) {
        const parsed = parseNumberList(raw);
        if (parsed.length > 0) {
          const list = q.orderedNumbers ? parsed : Array.from(new Set(parsed));
          correct = numbersMatch(list, q.expectedNumbers, q.orderedNumbers);
        }
      }
    }

    updateAttempt(q.id, {
      attempted: true,
      isCorrect: correct,
      explanationRevealed: correct ? true : st.explanationRevealed,
    });

    const newCorrectCount = questions.filter((item) =>
      item.id === q.id ? correct : Boolean(progressMap[item.id]?.isCorrect)
    ).length;
    if (newCorrectCount >= 50) {
      onAssessmentCompleted();
    }
  };

  const handleRetryQuestion = (id: string) => {
    setProgressMap((prev) => ({
      ...prev,
      [id]: { ...DEFAULT_ATTEMPT },
    }));
  };

  const totalCount = questions.length;
  const totalAttempted = questions.filter((q) => progressMap[q.id]?.attempted).length;
  const totalCorrect = questions.filter((q) => progressMap[q.id]?.isCorrect).length;
  const progressPercent = totalCount > 0 ? Math.round((totalAttempted / totalCount) * 100) : 0;
  const scorePercent = totalCount > 0 ? Math.round((totalCorrect / totalCount) * 100) : 0;

  const handleSaveAndRetake = () => {
    if (totalAttempted > 0) {
      const record: SavedAttemptRecord = {
        id: String(Date.now()),
        dateLabel: new Date().toLocaleString(undefined, {
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        attempted: totalAttempted,
        correct: totalCorrect,
        total: totalCount,
        percent: scorePercent,
      };
      setHistory((prev) => [record, ...prev].slice(0, 10));
    }
    setProgressMap({});
    setOpenHints({});
    setConfirmRetake(false);
    setMainMode('interactive');
    try {
      window.localStorage.removeItem(PROGRESS_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const filteredQuestions = questions.filter((q) => {
    if (catFilter !== 'all' && q.category !== catFilter) return false;
    if (diffFilter !== 'all' && q.difficulty !== diffFilter) return false;
    if (secFilter !== 'all' && q.sectionTag !== secFilter) return false;
    return true;
  });

  const getMasteryBand = (pct: number) => {
    if (pct >= 90) return { label: 'Distinction', note: 'Outstanding mastery across all Chapter 1 concepts.' };
    if (pct >= 75) return { label: 'Proficient', note: 'Strong understanding; review a few challenging items.' };
    if (pct >= 50) return { label: 'Developing', note: 'Solid start; revise sections below 70% accuracy.' };
    return { label: 'Building Foundations', note: 'Keep practicing section by section using the hints and labs.' };
  };

  const mastery = getMasteryBand(scorePercent);

  return (
    <article
      id="chapter-assessment"
      className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14 space-y-8"
    >
      {/* Header & Score Overview */}
      <header className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
        <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-6">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Complete Chapter 1 Assessment · Textbook pp. 1–18
            </p>
            <h2 className="mt-1 font-display text-3xl font-bold tracking-tight text-slate-900">
              Chapter 1 Mastery Assessment (100 Questions)
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-slate-600 max-w-2xl">
              Balanced across all sections (1.1 to 1.8) and difficulty levels: 30 MCQs, 20 Fill-in-the-Blanks, 20 True/False, 10 Short Answer, 10 Problem Solving, 5 Real-Life Applications, and 5 Higher-Order Thinking problems.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-2.5 text-right">
              <p className="text-[11px] font-medium text-slate-500">Current Score</p>
              <p className="font-math text-xl font-bold text-slate-900">
                {totalCorrect} / {totalCount}{' '}
                <span className="text-sm font-semibold text-sky-700">({scorePercent}%)</span>
              </p>
            </div>

            {!confirmRetake ? (
              <button
                type="button"
                onClick={() => setConfirmRetake(true)}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3.5 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Retake Assessment</span>
              </button>
            ) : (
              <div className="inline-flex items-center gap-2 rounded-lg border border-amber-200 bg-amber-50 px-3 py-2">
                <span className="text-xs font-medium text-amber-950">
                  Save score &amp; start fresh?
                </span>
                <button
                  type="button"
                  onClick={handleSaveAndRetake}
                  className="rounded bg-sky-700 px-2.5 py-1 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer"
                >
                  Confirm
                </button>
                <button
                  type="button"
                  onClick={() => setConfirmRetake(false)}
                  className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-1.5">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-600 font-math">
            <span>
              Attempted: <strong className="text-slate-900">{totalAttempted}</strong> / {totalCount} ({progressPercent}%)
            </span>
            <span>
              Saved locally · Retakes logged: <strong className="text-slate-900">{history.length}</strong>
            </span>
          </div>
          <div
            className="h-2.5 w-full overflow-hidden rounded-full bg-slate-200"
            role="progressbar"
            aria-valuenow={progressPercent}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Chapter 1 assessment progress"
          >
            <div
              className="h-full bg-sky-700 transition-all duration-300"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* Mode Switcher */}
        <div className="flex flex-wrap items-center gap-2 pt-2">
          <button
            type="button"
            onClick={() => setMainMode('interactive')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              mainMode === 'interactive'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <FileCheck2 className="h-4 w-4" aria-hidden="true" />
            <span>Interactive Assessment</span>
          </button>
          <button
            type="button"
            onClick={() => setMainMode('report')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              mainMode === 'report'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Award className="h-4 w-4" aria-hidden="true" />
            <span>Performance Report</span>
          </button>
          <button
            type="button"
            onClick={() => setMainMode('answer-key')}
            className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs sm:text-sm font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
              mainMode === 'answer-key'
                ? 'bg-sky-700 text-white'
                : 'border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
            }`}
          >
            <Eye className="h-4 w-4" aria-hidden="true" />
            <span>Verified Answer Key</span>
          </button>
        </div>
      </header>

      {/* ============================================================
          MODE 1: INTERACTIVE ASSESSMENT
         ============================================================ */}
      {mainMode === 'interactive' && (
        <section id="practice-assessment" className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 p-5 space-y-4">
            {/* Category Tabs */}
            <div className="flex flex-wrap gap-1.5" role="tablist" aria-label="Assessment categories">
              {CATEGORY_META.map((cat) => {
                const list =
                  cat.id === 'all' ? questions : questions.filter((q) => q.category === cat.id);
                const corr = list.filter((q) => progressMap[q.id]?.isCorrect).length;
                const active = catFilter === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => setCatFilter(cat.id)}
                    className={`rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'border-sky-700 bg-sky-700 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span>{cat.label}</span>
                    {corr > 0 && (
                      <span
                        className={`ml-1.5 font-math text-[11px] ${
                          active ? 'text-sky-100' : 'text-emerald-700'
                        }`}
                      >
                        · {corr}/{list.length}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Difficulty & Section Filters */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="text-xs font-medium text-slate-500 mr-1">Difficulty:</span>
                {(['all', 'easy', 'medium', 'challenge'] as DifficultyFilter[]).map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDiffFilter(d)}
                    className={`rounded-md border px-2.5 py-1 text-xs font-semibold capitalize cursor-pointer whitespace-nowrap shrink-0 ${
                      diffFilter === d
                        ? 'border-slate-900 bg-slate-900 text-white'
                        : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    {d === 'all' ? 'All Levels' : d}
                  </button>
                ))}
              </div>

              <div className="flex items-center gap-2">
                <label htmlFor="assess-sec-filter" className="text-xs font-medium text-slate-600">
                  Section:
                </label>
                <select
                  id="assess-sec-filter"
                  value={secFilter}
                  onChange={(e) => setSecFilter(e.target.value as SectionFilter)}
                  className="rounded-lg border border-slate-300 bg-white px-2.5 py-1 text-xs font-medium text-slate-800"
                >
                  <option value="all">All Sections (1.1–1.8)</option>
                  {SECTION_META.map((s) => (
                    <option key={s.tag} value={s.tag}>
                      {s.tag} · {s.title}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="divide-y divide-slate-200">
            {filteredQuestions.length === 0 ? (
              <p className="p-8 text-center text-sm text-slate-600">
                No questions match this combination of filters. Switch Difficulty or Section back to All.
              </p>
            ) : (
              filteredQuestions.map((q, idx) => {
                const st = getAttempt(q.id);
                const hintOpen = Boolean(openHints[q.id]);
                const hasInput =
                  q.category === 'mcq'
                    ? st.selectedOption !== null
                    : q.category === 'true-false'
                      ? st.selectedBoolean !== null
                      : st.draftValue.trim().length > 0;

                return (
                  <div key={q.id} className="p-5 sm:p-6 space-y-4">
                    <div className="flex flex-wrap items-start justify-between gap-3">
                      <div className="space-y-1 max-w-3xl">
                        <p className="text-xs font-medium text-slate-500">
                          <span className="font-math font-bold text-sky-700 mr-1.5">
                            Q{idx + 1}.
                          </span>
                          <span>{q.categoryLabel}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span className="font-math">Section {q.sectionTag}</span>
                          <span className="mx-1.5" aria-hidden="true">·</span>
                          <span className="capitalize">{q.difficulty}</span>
                          {q.textbookRef && (
                            <>
                              <span className="mx-1.5" aria-hidden="true">·</span>
                              <span>{q.textbookRef}</span>
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
                          <span>{hintOpen ? 'Hide Hint' : 'Hint'}</span>
                        </button>
                        {st.attempted && (
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

                    {/* MCQ Options */}
                    {q.category === 'mcq' && q.options && (
                      <div className="space-y-3">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {q.options.map((opt, optIdx) => {
                            const isSel = st.selectedOption === optIdx;
                            let style = 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';
                            if (st.attempted) {
                              if (
                                optIdx === q.correctIndex &&
                                (st.isCorrect || st.explanationRevealed)
                              ) {
                                style = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                              } else if (isSel && !st.isCorrect) {
                                style = 'border-amber-500 bg-amber-50 text-amber-950 font-semibold';
                              } else {
                                style = 'border-slate-200 bg-white text-slate-500';
                              }
                            } else if (isSel) {
                              style = 'border-sky-700 bg-sky-50 text-sky-950 font-semibold';
                            }

                            return (
                              <button
                                key={opt}
                                type="button"
                                disabled={st.attempted}
                                onClick={() => updateAttempt(q.id, { selectedOption: optIdx })}
                                className={`rounded-lg border px-4 py-2.5 text-left text-xs sm:text-sm cursor-pointer disabled:cursor-default ${style}`}
                              >
                                <span className="font-math font-semibold mr-2">
                                  {String.fromCharCode(97 + optIdx)}.
                                </span>
                                {opt}
                              </button>
                            );
                          })}
                        </div>
                        {!st.attempted && (
                          <button
                            type="button"
                            disabled={!hasInput}
                            onClick={() => evaluateQuestion(q)}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                          >
                            Check Answer
                          </button>
                        )}
                      </div>
                    )}

                    {/* True / False */}
                    {q.category === 'true-false' && (
                      <div className="flex flex-wrap items-center gap-3">
                        {[true, false].map((val) => {
                          const isSel = st.selectedBoolean === val;
                          let style = 'border-slate-200 bg-white text-slate-800 hover:bg-slate-50';
                          if (st.attempted) {
                            if (
                              val === q.correctBoolean &&
                              (st.isCorrect || st.explanationRevealed)
                            ) {
                              style = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                            } else if (isSel && !st.isCorrect) {
                              style = 'border-amber-500 bg-amber-50 text-amber-950 font-semibold';
                            } else {
                              style = 'border-slate-200 bg-white text-slate-500';
                            }
                          } else if (isSel) {
                            style = 'border-sky-700 bg-sky-50 text-sky-950 font-semibold';
                          }

                          return (
                            <button
                              key={String(val)}
                              type="button"
                              disabled={st.attempted}
                              onClick={() => updateAttempt(q.id, { selectedBoolean: val })}
                              className={`rounded-lg border px-5 py-2 text-xs sm:text-sm font-medium cursor-pointer disabled:cursor-default ${style}`}
                            >
                              {val ? 'True' : 'False'}
                            </button>
                          );
                        })}
                        {!st.attempted && (
                          <button
                            type="button"
                            disabled={!hasInput}
                            onClick={() => evaluateQuestion(q)}
                            className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                          >
                            Check Answer
                          </button>
                        )}
                      </div>
                    )}

                    {/* Text / Numeric Input */}
                    {q.category !== 'mcq' && q.category !== 'true-false' && (
                      <div className="flex flex-col sm:flex-row gap-2.5 max-w-xl">
                        <input
                          type="text"
                          aria-label={`Answer for question ${idx + 1}: ${q.prompt}`}
                          disabled={st.attempted && st.isCorrect}
                          value={st.draftValue}
                          onChange={(e) =>
                            updateAttempt(q.id, {
                              draftValue: e.target.value,
                              attempted: st.attempted && st.isCorrect ? true : false,
                              explanationRevealed:
                                st.attempted && st.isCorrect ? st.explanationRevealed : false,
                            })
                          }
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' && hasInput && !(st.attempted && st.isCorrect)) {
                              evaluateQuestion(q);
                            }
                          }}
                          placeholder={q.placeholder ?? 'Enter your answer'}
                          className="font-math flex-1 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-xs sm:text-sm text-slate-900"
                        />
                        {!(st.attempted && st.isCorrect) && (
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

                    {/* Feedback */}
                    {st.attempted && st.isCorrect && (
                      <div className="rounded-lg border border-emerald-200 bg-emerald-50/80 p-3.5 text-xs sm:text-sm text-emerald-950 space-y-1">
                        <p className="inline-flex items-center gap-1.5 font-semibold text-emerald-800">
                          <Check className="h-4 w-4 shrink-0" aria-hidden="true" />
                          <span>Correct!</span>
                        </p>
                        <p>{q.explanation}</p>
                      </div>
                    )}

                    {st.attempted && !st.isCorrect && (
                      <div className="rounded-lg border border-amber-200 bg-amber-50/80 p-3.5 text-xs sm:text-sm text-amber-950 space-y-2">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <p className="inline-flex items-center gap-1.5 font-semibold text-amber-900">
                            <XCircle className="h-4 w-4 shrink-0" aria-hidden="true" />
                            <span>Not quite right yet — try again or view the explanation.</span>
                          </p>
                          {!st.explanationRevealed && (
                            <button
                              type="button"
                              onClick={() => updateAttempt(q.id, { explanationRevealed: true })}
                              className="text-xs font-semibold text-sky-800 hover:underline cursor-pointer"
                            >
                              Show Answer &amp; Explanation
                            </button>
                          )}
                        </div>
                        {!st.explanationRevealed ? (
                          <p className="text-xs text-amber-900">
                            <strong>Hint:</strong> {q.hint}
                          </p>
                        ) : (
                          <div className="pt-2 border-t border-amber-200 text-xs space-y-1">
                            <p className="font-math font-bold text-slate-900">
                              Verified Answer: {q.correctDisplay}
                            </p>
                            <p>{q.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
        </section>
      )}

      {/* ============================================================
          MODE 2: PERFORMANCE REPORT
         ============================================================ */}
      {mainMode === 'report' && (
        <section className="space-y-6">
          {/* Summary Banner */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-center">
            <div className="md:col-span-7 space-y-2">
              <p className="text-xs font-medium text-slate-500">Final Performance Summary</p>
              <h3 className="font-display text-2xl font-bold text-slate-900">
                Performance Level: <span className="text-sky-800">{mastery.label}</span>
              </h3>
              <p className="text-sm text-slate-700">{mastery.note}</p>
              <div className="pt-2 flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => setConfirmRetake(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer"
                >
                  <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Save &amp; Retake Assessment</span>
                </button>
                <button
                  type="button"
                  onClick={() => setMainMode('interactive')}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
                >
                  <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>Continue Answering Questions</span>
                </button>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-cols-3 gap-3 text-center">
              <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <p className="text-[11px] text-slate-500">Attempted</p>
                <p className="font-math text-lg font-bold text-slate-900">
                  {totalAttempted}/{totalCount}
                </p>
              </div>
              <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-3">
                <p className="text-[11px] text-emerald-800">Correct</p>
                <p className="font-math text-lg font-bold text-emerald-950">{totalCorrect}</p>
              </div>
              <div className="rounded-lg border border-sky-200 bg-sky-50 p-3">
                <p className="text-[11px] text-sky-800">Overall %</p>
                <p className="font-math text-lg font-bold text-sky-950">{scorePercent}%</p>
              </div>
            </div>
          </div>

          {/* Difficulty & Question Type Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
              <h4 className="font-display text-lg font-bold text-slate-900">
                Breakdown by Question Format
              </h4>
              <div className="space-y-3">
                {CATEGORY_META.filter((c) => c.id !== 'all').map((cat) => {
                  const list = questions.filter((q) => q.category === cat.id);
                  const att = list.filter((q) => progressMap[q.id]?.attempted).length;
                  const corr = list.filter((q) => progressMap[q.id]?.isCorrect).length;
                  const pct = list.length > 0 ? Math.round((corr / list.length) * 100) : 0;
                  return (
                    <div key={cat.id} className="space-y-1">
                      <div className="flex justify-between text-xs font-medium text-slate-700">
                        <span>{cat.label}</span>
                        <span className="font-math">
                          {corr}/{list.length} correct ({att} attempted · {pct}%)
                        </span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-slate-100 overflow-hidden">
                        <div
                          className="h-full bg-sky-700"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-white p-6 space-y-4">
              <h4 className="font-display text-lg font-bold text-slate-900">
                Breakdown by Difficulty
              </h4>
              <div className="space-y-3">
                {(['easy', 'medium', 'challenge'] as AssessmentDifficulty[]).map((diff) => {
                  const list = questions.filter((q) => q.difficulty === diff);
                  const corr = list.filter((q) => progressMap[q.id]?.isCorrect).length;
                  const pct = list.length > 0 ? Math.round((corr / list.length) * 100) : 0;
                  return (
                    <div key={diff} className="rounded-lg border border-slate-200 bg-slate-50 p-3.5 space-y-1">
                      <div className="flex justify-between text-xs font-semibold capitalize text-slate-900">
                        <span>{diff} Level</span>
                        <span className="font-math">
                          {corr}/{list.length} ({pct}%)
                        </span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
                        <div className="h-full bg-emerald-600" style={{ width: `${pct}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section-by-Section Mastery Table */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 overflow-x-auto">
            <h4 className="font-display text-lg font-bold text-slate-900">
              Section-by-Section Mastery (Sections 1.1 – 1.8)
            </h4>
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs text-slate-500">
                  <th className="py-2 pr-4">Section</th>
                  <th className="py-2 px-3">Attempted</th>
                  <th className="py-2 px-3">Correct</th>
                  <th className="py-2 px-3">Score</th>
                  <th className="py-2 pl-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {SECTION_META.map((sec) => {
                  const list = questions.filter((q) => q.sectionTag === sec.tag);
                  const att = list.filter((q) => progressMap[q.id]?.attempted).length;
                  const corr = list.filter((q) => progressMap[q.id]?.isCorrect).length;
                  const pct = list.length > 0 ? Math.round((corr / list.length) * 100) : 0;
                  return (
                    <tr key={sec.tag}>
                      <td className="py-2.5 pr-4 font-semibold text-slate-900">
                        <span className="font-math text-sky-700 mr-1.5">{sec.tag}</span>
                        {sec.title}
                      </td>
                      <td className="py-2.5 px-3 font-math text-slate-700">
                        {att}/{list.length}
                      </td>
                      <td className="py-2.5 px-3 font-math font-semibold text-emerald-800">
                        {corr}/{list.length}
                      </td>
                      <td className="py-2.5 px-3 font-math text-slate-900">{pct}%</td>
                      <td className="py-2.5 pl-3 text-right">
                        <button
                          type="button"
                          onClick={() => onReviseSection(sec.id)}
                          className="text-xs font-semibold text-sky-700 hover:underline cursor-pointer whitespace-nowrap"
                        >
                          Revise Section
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Saved Local Retake History */}
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-3">
            <h4 className="font-display text-lg font-bold text-slate-900">
              Saved Local Attempt History
            </h4>
            {history.length === 0 ? (
              <p className="text-xs sm:text-sm text-slate-600">
                No completed retakes saved yet. Whenever you click &ldquo;Save &amp; Retake Assessment,&rdquo; your past score will be recorded here automatically.
              </p>
            ) : (
              <ul className="divide-y divide-slate-100 text-xs sm:text-sm">
                {history.map((item, idx) => (
                  <li key={item.id} className="py-2.5 flex flex-wrap justify-between gap-2">
                    <span className="text-slate-700">
                      Attempt #{history.length - idx} · {item.dateLabel}
                    </span>
                    <span className="font-math font-semibold text-slate-900">
                      {item.correct} / {item.total} ({item.percent}%) · {item.attempted} attempted
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

      {/* ============================================================
          MODE 3: VERIFIED ANSWER KEY & EXPLANATIONS
         ============================================================ */}
      {mainMode === 'answer-key' && (
        <section className="rounded-xl border border-slate-200 bg-white p-6 space-y-5">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h3 className="font-display text-xl font-bold text-slate-900">
                Verified Chapter 1 Answer Key &amp; Explanations
              </h3>
              <p className="mt-1 text-xs sm:text-sm text-slate-600">
                All 100 questions mathematically verified against the PCTB Grade 6 textbook (with answer-key print typos corrected).
              </p>
            </div>
            {!keyUnlocked && totalAttempted < totalCount && (
              <button
                type="button"
                onClick={() => setKeyUnlocked(true)}
                className="rounded-lg bg-slate-900 px-4 py-2 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer whitespace-nowrap shrink-0"
              >
                Reveal Full Answer Key ({totalCount - totalAttempted} unattempted)
              </button>
            )}
          </div>

          {!keyUnlocked && totalAttempted < totalCount ? (
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 text-xs sm:text-sm text-amber-950 space-y-2">
              <p className="font-semibold">
                Try solving the questions in Interactive Mode first!
              </p>
              <p>
                You currently have {totalCount - totalAttempted} unattempted questions. If you are a teacher checking solutions or have finished practicing on paper, click &ldquo;Reveal Full Answer Key&rdquo; above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-1.5">
                {CATEGORY_META.map((cat) => (
                  <button
                    key={cat.id}
                    type="button"
                    onClick={() => setCatFilter(cat.id)}
                    className={`rounded-lg border px-2.5 py-1 text-xs font-semibold cursor-pointer ${
                      catFilter === cat.id
                        ? 'border-sky-700 bg-sky-700 text-white'
                        : 'border-slate-200 bg-slate-50 text-slate-700'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>

              <div className="divide-y divide-slate-200 border-t border-slate-200">
                {(catFilter === 'all'
                  ? questions
                  : questions.filter((q) => q.category === catFilter)
                ).map((q, idx) => (
                  <div key={q.id} className="py-3.5 space-y-1 text-xs sm:text-sm">
                    <p className="font-semibold text-slate-900">
                      <span className="font-math text-sky-700 mr-1.5">#{idx + 1}</span>
                      [{q.categoryLabel} · §{q.sectionTag}] {q.prompt}
                    </p>
                    <p className="font-math font-bold text-emerald-800">
                      Answer: {q.correctDisplay}
                    </p>
                    <p className="text-xs text-slate-600">{q.explanation}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </article>
  );
}
