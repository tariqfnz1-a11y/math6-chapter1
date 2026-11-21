import { LessonSectionData } from '../types/textbook';
import { SECTION_1_1_PRACTICE_BANK } from '../data/section1_1PracticeBank';
import { FactorArrayLab } from './FactorArrayLab';
import { FactorsMultiplesSimulation } from './FactorsMultiplesSimulation';
import { InteractivePracticeBank } from './InteractivePracticeBank';
import { MultiplesAndParityLab } from './MultiplesAndParityLab';
import { PracticalActivitiesLab } from './PracticalActivitiesLab';
import { VisualStudyGuide } from './VisualStudyGuide';
import { WorkedExampleCard } from './WorkedExampleCard';
import { PracticeAndAssessment } from './PracticeAndAssessment';

interface Section1_1LessonProps {
  data: LessonSectionData;
  onMarkCompleted: () => void;
}

export function Section1_1Lesson({ data, onMarkCompleted }: Section1_1LessonProps) {
  const sub1 = data.subsections[0];
  const sub2 = data.subsections[1];

  return (
    <article id={data.id} className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14 space-y-14">
      {/* Section Header */}
      <header className="border-b border-slate-200 pb-8">
        <p className="text-xs font-medium text-slate-500">
          Section {data.sectionNumber} · {data.pageRef}
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
          {data.sectionNumber} {data.title}
        </h2>

        {/* Motivating Introduction + Learning Objectives */}
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
            <p className="mt-1 text-xs text-slate-500">
              In this lesson, you will learn to:
            </p>
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

      {/* Subsection 1.1.1 — Defining a Factor */}
      <section className="space-y-6">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Subsection {sub1.code} · {sub1.pageRef}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            {sub1.code} {sub1.title}
          </h3>
        </div>

        {/* Textbook Definition Highlight */}
        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-6 space-y-3">
          <p className="text-xs font-semibold text-sky-900">
            Mathematical Definitions
          </p>
          <p className="text-base font-medium leading-relaxed text-slate-900">
            {sub1.formalDefinition}
          </p>
          {sub1.secondaryDefinition && (
            <p className="text-base font-medium leading-relaxed text-slate-900">
              {sub1.secondaryDefinition}
            </p>
          )}
          {sub1.formulaHighlight && (
            <p className="font-math pt-2 border-t border-sky-200 text-xs sm:text-sm font-semibold text-sky-900">
              {sub1.formulaHighlight}
            </p>
          )}
        </div>

        {/* Concept Explanation + Textbook Division Table for 12 */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-slate-700">
            {sub1.conceptExplanation.map((para) => (
              <p key={para}>{para}</p>
            ))}

            {/* Visual Array Diagram for 6 × 3 = 18 (Textbook p. 1) */}
            <div className="mt-4 rounded-xl border border-slate-200 bg-white p-4">
              <p className="text-xs font-medium text-slate-500 mb-3">
                Visual Array · Textbook p. 1: 6 (factor) × 3 (factor) = 18 (product)
              </p>
              <div className="space-y-1.5" aria-label="3 rows of 6 items making 18">
                {[0, 1, 2].map((row) => (
                  <div key={row} className="flex items-center gap-2">
                    {[0, 1, 2, 3, 4, 5].map((col) => (
                      <span
                        key={col}
                        className="h-5 w-5 rounded-full bg-amber-500 border border-amber-700/30"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                ))}
              </div>
              <p className="font-math mt-3 text-xs font-semibold text-slate-800">
                6 (factor) × 3 (factor) = 18 (product)
              </p>
            </div>
          </div>

          {/* Division Facts for 12 + Remember Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5">
              <p className="text-xs font-semibold text-slate-900 mb-3">
                Complete Division of 12 (Textbook p. 1)
              </p>
              <div className="grid grid-cols-2 gap-2 font-math text-xs sm:text-sm">
                {[1, 2, 3, 4, 6, 12].map((d) => (
                  <div
                    key={d}
                    className="rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-slate-800"
                  >
                    12 ÷ <span className="font-semibold text-sky-700">{d}</span> = {12 / d}{' '}
                    <span className="text-[11px] text-emerald-700">(rem 0)</span>
                  </div>
                ))}
              </div>
              <p className="mt-3 text-xs text-slate-600">
                Remainder in each case is <strong>zero (0)</strong>, so the factors of 12 are{' '}
                <strong className="font-math text-slate-900">1, 2, 3, 4, 6, 12</strong>.
              </p>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
              <p className="text-xs font-semibold text-amber-900 mb-2">
                Note &amp; Remember · Textbook p. 2
              </p>
              <ul className="space-y-2 text-xs leading-relaxed text-amber-950">
                {sub1.rememberNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Subsection 1.1.2 — Defining a Multiple */}
      <section className="space-y-6 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Subsection {sub2.code} · {sub2.pageRef}
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            {sub2.code} {sub2.title}
          </h3>
        </div>

        <div className="rounded-xl border border-sky-200 bg-sky-50/60 p-6 space-y-3">
          <p className="text-xs font-semibold text-sky-900">
            Mathematical Definitions
          </p>
          <p className="text-base font-medium leading-relaxed text-slate-900">
            {sub2.formalDefinition}
          </p>
          {sub2.secondaryDefinition && (
            <p className="text-base font-medium leading-relaxed text-slate-900">
              {sub2.secondaryDefinition}
            </p>
          )}
          {sub2.formulaHighlight && (
            <p className="font-math pt-2 border-t border-sky-200 text-xs sm:text-sm font-semibold text-sky-900">
              {sub2.formulaHighlight}
            </p>
          )}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-7 space-y-3.5 text-sm sm:text-[15px] leading-relaxed text-slate-700">
            {sub2.conceptExplanation.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>

          <div className="lg:col-span-5 space-y-4">
            <div className="rounded-xl border border-slate-200 bg-white p-5 space-y-3">
              <p className="text-xs font-semibold text-slate-900">
                Connecting Factor &amp; Multiple (Textbook p. 2)
              </p>
              <div className="grid grid-cols-2 gap-3 font-math text-xs sm:text-sm">
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">16 ÷ 2 = 8</p>
                  <p className="mt-1 text-[11px] text-slate-600">
                    2 is a factor of 16; 16 is a multiple of 2.
                  </p>
                </div>
                <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                  <p className="font-semibold text-slate-900">18 ÷ 3 = 6</p>
                  <p className="mt-1 text-[11px] text-slate-600">
                    3 is a factor of 18; 18 is a multiple of 3.
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-5">
              <p className="text-xs font-semibold text-amber-900 mb-2">
                Remember · Textbook pp. 3–4
              </p>
              <ul className="space-y-2 text-xs leading-relaxed text-amber-950">
                {sub2.rememberNotes.map((note) => (
                  <li key={note}>• {note}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Terms with Simple Examples */}
      <section className="space-y-5 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">Vocabulary</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Key Terms &amp; Simple Examples
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.keyTerms.map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between"
            >
              <div>
                <h4 className="font-display text-base font-semibold text-sky-900">
                  {item.term}
                </h4>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {item.definition}
                </p>
              </div>
              <p className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-900">Example:</strong> {item.example}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive Diagrams & Simulations */}
      <section id="interactive-lab" className="space-y-8 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Hands-On Visual Diagrams
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Interactive Visual Lab
          </h3>
          <p className="mt-1 text-sm text-slate-600">
            Test numbers with the step-by-step Division &amp; Multiples simulation, explore how factors split numbers cleanly with zero remainder, and see how multiples and even/odd numbers behave.
          </p>
        </div>

        <FactorsMultiplesSimulation />
        <FactorArrayLab />
        <MultiplesAndParityLab />
      </section>

      {/* Step-by-Step Worked Examples */}
      <section id="worked-examples" className="space-y-6 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Textbook Worked Examples · pp. 1–3
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Step-by-Step Worked Examples
          </h3>
        </div>

        <div className="space-y-6">
          {data.workedExamples.map((ex) => (
            <WorkedExampleCard key={ex.id} example={ex} />
          ))}
        </div>
      </section>

      {/* Real-Life Applications & Interesting Facts */}
      <section className="space-y-8 pt-4 border-t border-slate-200">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Real-life Applications */}
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

          {/* Interesting Facts (Textbook Fun Facts) */}
          <div className="lg:col-span-5 flex flex-col">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Textbook Fun Facts · pp. 2–3
              </p>
              <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
                Interesting Facts
              </h3>
            </div>
            <div className="mt-4 flex-1 rounded-xl border border-amber-200 bg-amber-50/60 p-6">
              <ul className="space-y-3 text-sm leading-relaxed text-slate-800">
                {data.funFacts.map((fact, idx) => (
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

      {/* Practical Classroom, Individual, Pair, Home, Real-Life & Creative Activities */}
      <section id="practical-activities" className="pt-4 border-t border-slate-200">
        <PracticalActivitiesLab activities={data.practicalActivities} />
      </section>

      {/* Visual Study Notes, Diagrams, Concept Mind Map, Mistakes & Quick Summary */}
      <section id="study-guide" className="pt-4 border-t border-slate-200">
        <VisualStudyGuide
          keyTerms={data.keyTerms}
          commonErrors={data.commonErrors}
          studyNotes={data.studyNotes}
          summaryPoints={data.summaryPoints}
        />
      </section>

      {/* Practice, Interactive Practice Bank & Short Self-Assessment */}
      <section className="space-y-10 pt-4 border-t border-slate-200">
        <PracticeAndAssessment
          practiceSets={data.practiceSets}
          selfAssessment={data.selfAssessment}
          onSectionCompleted={onMarkCompleted}
        />
        <InteractivePracticeBank
          questions={SECTION_1_1_PRACTICE_BANK}
          onMilestoneCompleted={onMarkCompleted}
        />
      </section>
    </article>
  );
}
