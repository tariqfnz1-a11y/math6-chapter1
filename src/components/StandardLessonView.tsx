import { ReactNode, useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  HelpCircle,
  RotateCcw,
  XCircle,
} from 'lucide-react';
import { StandardSectionData } from '../types/textbook';
import { SectionDiagramBlock } from './SectionDiagramBlock';

interface StandardLessonViewProps {
  data: StandardSectionData;
  simulation: ReactNode;
  onMarkCompleted: () => void;
  prevSection?: { id: string; label: string };
  nextSection?: { id: string; label: string };
  onNavigateSection: (id: string) => void;
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

function normalizeMathText(raw: string): string {
  return stripThousandsCommas(raw)
    .toLowerCase()
    .replace(/[×*]/g, 'x')
    .replace(/\s*x\s*/g, ' x ')
    .replace(/\s*\^\s*/g, '^')
    .replace(/\s+/g, ' ')
    .trim();
}

function numbersEqual(actual: number[], expected: number[], ordered?: boolean): boolean {
  if (actual.length !== expected.length) return false;
  if (ordered) return actual.every((val, idx) => val === expected[idx]);
  const a = [...actual].sort((x, y) => x - y);
  const b = [...expected].sort((x, y) => x - y);
  return a.every((val, idx) => val === b[idx]);
}

interface LessonStorageState {
  practiceInputs: Record<string, string>;
  practiceStatus: Record<string, { attempted: boolean; isCorrect: boolean; showAnswer: boolean }>;
  quizChoices: Record<string, number>;
  quizSubmitted: boolean;
}

function loadLessonState(sectionId: string): LessonStorageState {
  try {
    const raw = window.localStorage.getItem(`math6_ch1_lesson_${sectionId}_v1`);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<LessonStorageState>;
      return {
        practiceInputs: parsed.practiceInputs ?? {},
        practiceStatus: parsed.practiceStatus ?? {},
        quizChoices: parsed.quizChoices ?? {},
        quizSubmitted: Boolean(parsed.quizSubmitted),
      };
    }
  } catch {
    // Ignore storage errors
  }
  return { practiceInputs: {}, practiceStatus: {}, quizChoices: {}, quizSubmitted: false };
}

export function StandardLessonView({
  data,
  simulation,
  onMarkCompleted,
  prevSection,
  nextSection,
  onNavigateSection,
}: StandardLessonViewProps) {
  const initialSaved = loadLessonState(data.id);

  // Worked example step-through visibility
  const [visibleStepsMap, setVisibleStepsMap] = useState<Record<string, number>>({});
  // Practice question state (answers never revealed before attempt)
  const [practiceInputs, setPracticeInputs] = useState<Record<string, string>>(
    initialSaved.practiceInputs
  );
  const [practiceStatus, setPracticeStatus] = useState<
    Record<string, { attempted: boolean; isCorrect: boolean; showAnswer: boolean }>
  >(initialSaved.practiceStatus);
  const [practiceHints, setPracticeHints] = useState<Record<string, boolean>>({});
  // Quick assessment state
  const [quizChoices, setQuizChoices] = useState<Record<string, number>>(initialSaved.quizChoices);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(initialSaved.quizSubmitted);

  useEffect(() => {
    const saved = loadLessonState(data.id);
    setPracticeInputs(saved.practiceInputs);
    setPracticeStatus(saved.practiceStatus);
    setQuizChoices(saved.quizChoices);
    setQuizSubmitted(saved.quizSubmitted);
    setPracticeHints({});
    setVisibleStepsMap({});
  }, [data.id]);

  useEffect(() => {
    try {
      const payload: LessonStorageState = {
        practiceInputs,
        practiceStatus,
        quizChoices,
        quizSubmitted,
      };
      window.localStorage.setItem(`math6_ch1_lesson_${data.id}_v1`, JSON.stringify(payload));
    } catch {
      // Ignore storage errors
    }
  }, [data.id, practiceInputs, practiceStatus, quizChoices, quizSubmitted]);

  const handleCheckPractice = (
    q: StandardSectionData['practiceSets'][number]['questions'][number]
  ) => {
    const raw = (practiceInputs[q.id] ?? '').trim();
    if (!raw) return;

    let isCorrect = false;
    if (q.unorderedNumbers) {
      const parsed = Array.from(new Set(parseNumberList(raw)));
      isCorrect = numbersEqual(parsed, q.unorderedNumbers, false);
    } else if (q.orderedNumbers) {
      const parsed = parseNumberList(raw);
      isCorrect = numbersEqual(parsed, q.orderedNumbers, true);
    } else {
      const norm = normalizeMathText(raw);
      isCorrect = q.acceptedAnswers.some((ans) => normalizeMathText(ans) === norm);
    }

    setPracticeStatus((prev) => ({
      ...prev,
      [q.id]: {
        attempted: true,
        isCorrect,
        showAnswer: isCorrect ? true : Boolean(prev[q.id]?.showAnswer),
      },
    }));
  };

  const correctQuizCount = data.selfAssessment.filter(
    (q) => quizChoices[q.id] === q.correctIndex
  ).length;

  return (
    <article id={data.id} className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14 space-y-14">
      {/* Section Header + Motivating Intro + Learning Objectives */}
      <header className="border-b border-slate-200 pb-8">
        <p className="text-xs font-medium text-slate-500">
          Section {data.sectionNumber} · {data.pageRef}
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
          {data.sectionNumber} {data.title}
        </h2>

        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 rounded-xl border border-slate-200 bg-white p-6">
            <h3 className="font-display text-base font-semibold text-slate-900">
              {data.motivatingIntro.heading}
            </h3>
            <p className="mt-2.5 text-sm leading-relaxed text-slate-700">
              {data.motivatingIntro.story}
            </p>
            <p className="mt-4 rounded-lg border border-sky-200 bg-sky-50/70 px-4 py-3 text-xs sm:text-sm font-medium text-sky-950">
              <strong>Guiding Question:</strong> {data.motivatingIntro.guidingQuestion}
            </p>
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-display text-base font-semibold text-slate-900">
              Learning Objectives
            </h3>
            <p className="mt-1 text-xs text-slate-500">In this lesson, you will learn to:</p>
            <ul className="mt-3.5 space-y-2.5 text-xs sm:text-sm text-slate-700">
              {data.learningObjectives.map((obj, idx) => (
                <li key={obj} className="flex items-start gap-2.5">
                  <span className="font-math font-semibold text-sky-700 shrink-0">
                    {idx + 1}.
                  </span>
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      {/* Concept Explanations */}
      <section className="space-y-6">
        {data.conceptExplanations.map((block) => (
          <div key={block.heading} className="space-y-4">
            <h3 className="font-display text-2xl font-bold text-slate-900">
              {block.heading}
            </h3>
            <div className="space-y-3 text-sm sm:text-[15px] leading-relaxed text-slate-700 max-w-4xl">
              {block.paragraphs.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            {block.formulaHighlight && (
              <div className="rounded-xl border border-sky-200 bg-sky-50/70 px-5 py-3.5 font-math text-xs sm:text-sm font-semibold text-sky-950">
                {block.formulaHighlight}
              </div>
            )}
          </div>
        ))}
      </section>

      {/* Definitions & Terminology */}
      <section className="space-y-5 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">Definitions &amp; Vocabulary</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Key Terms &amp; Examples
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.keyTerms.map((term) => (
            <div
              key={term.term}
              className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-display text-base font-semibold text-sky-900">
                  {term.term}
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {term.definition}
                </p>
              </div>
              <p className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-900">Example:</strong>{' '}
                <span className="font-math">{term.example}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Visual Diagram */}
      <section className="pt-4 border-t border-slate-200">
        <SectionDiagramBlock info={data.diagramInfo} />
      </section>

      {/* Interactive Simulation */}
      <section id="interactive-lab" className="space-y-4 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">Interactive Lab</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Hands-On Mathematics Simulation
          </h3>
        </div>
        {simulation}
      </section>

      {/* Worked Examples */}
      <section id="worked-examples" className="space-y-6 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Textbook Worked Examples · {data.pageRef}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Step-by-Step Worked Examples
          </h3>
        </div>

        <div className="space-y-6">
          {data.workedExamples.map((ex) => (
            <div
              key={ex.id}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    {ex.numberLabel} · {ex.pageRef} · {ex.methodName}
                  </p>
                  <h4 className="mt-1 font-display text-lg font-semibold text-slate-900">
                    {ex.title}
                  </h4>
                </div>
              </div>

              <div className="divide-y divide-slate-200">
                {ex.parts.map((part) => {
                  const key = `${ex.id}-${part.label}`;
                  const totalSteps = part.steps.length;
                  const visibleCount = visibleStepsMap[key] ?? totalSteps;

                  return (
                    <div key={key} className="p-5 sm:p-6 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <p className="text-sm font-semibold text-slate-900">
                          <span className="text-sky-700 mr-2">{part.label}</span>
                          {part.prompt}
                        </p>
                        <div className="flex items-center gap-1.5">
                          <button
                            type="button"
                            onClick={() =>
                              setVisibleStepsMap((prev) => ({
                                ...prev,
                                [key]: visibleCount >= totalSteps ? 1 : visibleCount + 1,
                              }))
                            }
                            className="inline-flex items-center gap-1 rounded-md border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700 hover:bg-slate-100 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            <span>
                              {visibleCount >= totalSteps ? 'Step-by-Step' : 'Next Step'}
                            </span>
                            <ChevronRight className="h-3.5 w-3.5" aria-hidden="true" />
                          </button>
                          {visibleCount < totalSteps && (
                            <button
                              type="button"
                              onClick={() =>
                                setVisibleStepsMap((prev) => ({ ...prev, [key]: totalSteps }))
                              }
                              className="rounded-md bg-sky-700 px-2.5 py-1 text-xs font-semibold text-white cursor-pointer whitespace-nowrap shrink-0"
                            >
                              Show All
                            </button>
                          )}
                        </div>
                      </div>

                      <ol className="space-y-2 text-xs sm:text-sm text-slate-700 list-decimal pl-5 font-math">
                        {part.steps.slice(0, visibleCount).map((st) => (
                          <li key={st} className="leading-relaxed">
                            {st}
                          </li>
                        ))}
                      </ol>

                      {visibleCount >= totalSteps && (
                        <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 px-4 py-2.5 text-xs sm:text-sm font-medium text-emerald-950">
                          <strong>Conclusion:</strong> {part.conclusion}
                        </div>
                      )}

                      {part.note && (
                        <p className="text-xs text-slate-600 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2">
                          {part.note}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Real-Life Applications & Interesting Facts */}
      <section className="pt-4 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Everyday Connections</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                Real-Life Applications
              </h3>
            </div>
            <div className="space-y-3">
              {data.realLifeApplications.map((app) => (
                <div
                  key={app.title}
                  className="rounded-xl border border-slate-200 bg-white p-5"
                >
                  <h4 className="font-display text-base font-semibold text-slate-900">
                    {app.title}
                  </h4>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-700">
                    {app.description}
                  </p>
                  <p className="mt-2 text-xs font-medium text-sky-800">{app.mathLink}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5 flex flex-col">
            <div>
              <p className="text-xs font-medium text-slate-500">Did You Know?</p>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                Interesting Facts
              </h3>
            </div>
            <div className="mt-4 flex-1 rounded-xl border border-amber-200 bg-amber-50/60 p-6">
              <ul className="space-y-3 text-sm leading-relaxed text-slate-800">
                {data.interestingFacts.map((fact, idx) => (
                  <li key={fact} className="flex items-start gap-2.5">
                    <span className="font-math text-xs font-bold text-amber-800 mt-1 shrink-0">
                      0{idx + 1}.
                    </span>
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Practical Classroom & Home Activities */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">Learning by Doing</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Classroom &amp; Home Activities
          </h3>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Practical Classroom Activity · {data.classroomActivity.textbookRef}
              </p>
              <h4 className="mt-1 font-display text-lg font-semibold text-slate-900">
                {data.classroomActivity.title}
              </h4>
            </div>
            <p className="text-xs text-slate-600">
              <strong className="text-slate-900">Materials:</strong>{' '}
              {data.classroomActivity.materials.join(' · ')}
            </p>
            <ol className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700 list-decimal pl-5">
              {data.classroomActivity.steps.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ol>
            <p className="rounded-lg border border-sky-200 bg-sky-50/70 px-3.5 py-2.5 text-xs text-sky-950">
              <strong>Observation:</strong> {data.classroomActivity.observation}
            </p>
            <p className="text-xs text-slate-600 pt-2 border-t border-slate-100">
              <strong className="text-slate-900">Discussion:</strong>{' '}
              {data.classroomActivity.discussionPrompt}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-6 space-y-4 flex flex-col justify-between">
            <div className="space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-500">
                  Home Activity · Everyday Materials
                </p>
                <h4 className="mt-1 font-display text-lg font-semibold text-slate-900">
                  {data.homeActivity.title}
                </h4>
              </div>
              <p className="text-xs text-slate-600">
                <strong className="text-slate-900">You will need:</strong>{' '}
                {data.homeActivity.materials.join(' · ')}
              </p>
              <ol className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700 list-decimal pl-5">
                {data.homeActivity.steps.map((s) => (
                  <li key={s}>{s}</li>
                ))}
              </ol>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-4 text-xs text-slate-700">
              <strong className="text-slate-900">Notebook Tip:</strong>{' '}
              {data.homeActivity.recordingTip}
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes + Study Notes + Section Summary */}
      <section id="study-guide" className="space-y-8 pt-4 border-t border-slate-200">
        <div className="space-y-4">
          <div>
            <p className="text-xs font-medium text-slate-500">Watch Out</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
              Common Mistakes &amp; Study Notes
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.commonErrors.map((err) => (
              <div
                key={err.mistakeTitle}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5"
              >
                <h4 className="font-display text-base font-semibold text-slate-900">
                  {err.mistakeTitle}
                </h4>
                <p className="text-xs text-rose-900 bg-rose-50 rounded-lg border border-rose-200 px-3 py-2">
                  <strong>Common Mistake:</strong> {err.wrongThinking}
                </p>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                  <strong className="text-slate-900">How to Avoid:</strong> {err.howToAvoid}
                </p>
                <p className="font-math text-xs font-semibold text-emerald-900 bg-emerald-50 rounded-lg border border-emerald-200 px-3 py-2">
                  Correct: {err.exampleFix}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {data.studyNotes.map((block) => (
              <div
                key={block.heading}
                className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5"
              >
                <h4 className="font-display text-base font-semibold text-sky-900">
                  {block.heading}
                </h4>
                <ul className="space-y-2 text-xs leading-relaxed text-slate-700">
                  {block.points.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 rounded-xl border border-slate-200 bg-slate-50 p-6 space-y-3">
            <h4 className="font-display text-lg font-bold text-slate-900">
              Section {data.sectionNumber} Summary
            </h4>
            <ul className="space-y-2.5 text-sm leading-relaxed text-slate-800">
              {data.summaryPoints.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5">
                  <span className="font-math text-xs font-bold text-sky-700 mt-1">✓</span>
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Practice Questions & Quick Assessment */}
      <section id="practice-assessment" className="space-y-10 pt-4 border-t border-slate-200">
        <div className="space-y-6">
          <div>
            <p className="text-xs font-medium text-slate-500">Guided Practice</p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
              Practice Exercises
            </h3>
          </div>

          <div className="space-y-6">
            {data.practiceSets.map((set) => (
              <div
                key={set.id}
                className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-5"
              >
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div>
                    <h4 className="font-display text-lg font-semibold text-slate-900">
                      {set.title}
                    </h4>
                    <p className="text-xs text-slate-600 mt-0.5">{set.instruction}</p>
                  </div>
                  <span className="text-xs text-slate-500">{set.pageRef}</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {set.questions.map((q) => {
                    const st = practiceStatus[q.id];
                    const showHint = Boolean(practiceHints[q.id]);

                    return (
                      <div
                        key={q.id}
                        className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-2.5"
                      >
                        <div className="flex items-start justify-between gap-2">
                          <label
                            htmlFor={q.id}
                            className="text-xs sm:text-sm font-semibold text-slate-900"
                          >
                            <span className="font-math text-sky-700 mr-1.5">{q.label}</span>
                            {q.prompt}
                          </label>
                          <button
                            type="button"
                            onClick={() =>
                              setPracticeHints((prev) => ({ ...prev, [q.id]: !prev[q.id] }))
                            }
                            className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 cursor-pointer shrink-0"
                          >
                            <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Hint</span>
                          </button>
                        </div>

                        <div className="flex gap-2">
                          <input
                            id={q.id}
                            type="text"
                            value={practiceInputs[q.id] ?? ''}
                            onChange={(e) => {
                              setPracticeInputs((prev) => ({ ...prev, [q.id]: e.target.value }));
                              if (st && !st.isCorrect) {
                                setPracticeStatus((prev) => ({
                                  ...prev,
                                  [q.id]: { ...prev[q.id], attempted: false },
                                }));
                              }
                            }}
                            onKeyDown={(e) => {
                              if (e.key === 'Enter') handleCheckPractice(q);
                            }}
                            placeholder={q.placeholder}
                            className="font-math flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                          />
                          <button
                            type="button"
                            onClick={() => handleCheckPractice(q)}
                            className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer whitespace-nowrap shrink-0"
                          >
                            Check
                          </button>
                        </div>

                        {showHint && (
                          <p className="rounded border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs text-sky-950">
                            <strong>Hint:</strong> {q.hint}
                          </p>
                        )}

                        {st?.attempted && st.isCorrect && (
                          <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-950 space-y-1">
                            <p className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                              <Check className="h-3.5 w-3.5" aria-hidden="true" />
                              <span>Correct!</span>
                            </p>
                            <p>{q.explanation}</p>
                          </div>
                        )}

                        {st?.attempted && !st.isCorrect && (
                          <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 space-y-1.5">
                            <div className="flex items-center justify-between gap-2">
                              <p className="inline-flex items-center gap-1 font-semibold text-amber-900">
                                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                                <span>Not quite yet — try again!</span>
                              </p>
                              {!st.showAnswer && (
                                <button
                                  type="button"
                                  onClick={() =>
                                    setPracticeStatus((prev) => ({
                                      ...prev,
                                      [q.id]: { ...prev[q.id], showAnswer: true },
                                    }))
                                  }
                                  className="font-semibold text-sky-800 hover:underline cursor-pointer"
                                >
                                  Show Solution
                                </button>
                              )}
                            </div>
                            {st.showAnswer && (
                              <p className="pt-1 border-t border-amber-200">
                                <strong className="font-math">Answer: {q.correctDisplay}</strong> — {q.explanation}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Assessment */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-5">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Section {data.sectionNumber} Check-In · {data.selfAssessment.length} Questions
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                Quick Knowledge Assessment
              </h3>
            </div>
            {quizSubmitted && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-right">
                <p className="text-xs text-slate-500">Score</p>
                <p className="font-math text-lg font-bold text-slate-900">
                  {correctQuizCount} / {data.selfAssessment.length}
                </p>
              </div>
            )}
          </div>

          <ol className="space-y-6">
            {data.selfAssessment.map((q, idx) => {
              const chosen = quizChoices[q.id];
              const isCorrect = chosen === q.correctIndex;
              return (
                <li key={q.id} className="space-y-3">
                  <p className="text-sm font-semibold text-slate-900">
                    <span className="font-math text-sky-700 mr-2">Q{idx + 1}.</span>
                    {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {q.options.map((opt, optIdx) => {
                      const isSel = chosen === optIdx;
                      let style = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                      if (quizSubmitted) {
                        if (optIdx === q.correctIndex) {
                          style = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isSel) {
                          style = 'border-rose-400 bg-rose-50 text-rose-950';
                        }
                      } else if (isSel) {
                        style = 'border-sky-700 bg-sky-50 text-sky-950 font-semibold';
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={quizSubmitted}
                          onClick={() =>
                            setQuizChoices((prev) => ({ ...prev, [q.id]: optIdx }))
                          }
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
                  {quizSubmitted && (
                    <p
                      className={`rounded-lg border px-3.5 py-2 text-xs ${
                        isCorrect
                          ? 'border-emerald-200 bg-emerald-50 text-emerald-950'
                          : 'border-amber-200 bg-amber-50 text-amber-950'
                      }`}
                    >
                      <strong>{isCorrect ? 'Correct:' : 'Explanation:'}</strong> {q.explanation}
                    </p>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-200">
            {!quizSubmitted ? (
              <button
                type="button"
                disabled={Object.keys(quizChoices).length < data.selfAssessment.length}
                onClick={() => {
                  setQuizSubmitted(true);
                  onMarkCompleted();
                }}
                className="rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-45 cursor-pointer"
              >
                Submit Quick Assessment ({Object.keys(quizChoices).length}/
                {data.selfAssessment.length})
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setQuizChoices({});
                  setQuizSubmitted(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Retry Assessment</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Page-Turner Navigation */}
      <nav
        aria-label="Chapter section pagination"
        className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-slate-200"
      >
        {prevSection ? (
          <button
            type="button"
            onClick={() => onNavigateSection(prevSection.id)}
            className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-4 py-2.5 text-xs sm:text-sm font-semibold text-slate-800 hover:bg-slate-50 cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>{prevSection.label}</span>
          </button>
        ) : (
          <span />
        )}

        {nextSection && (
          <button
            type="button"
            onClick={() => onNavigateSection(nextSection.id)}
            className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-sky-800 cursor-pointer"
          >
            <span>{nextSection.label}</span>
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </nav>
    </article>
  );
}
