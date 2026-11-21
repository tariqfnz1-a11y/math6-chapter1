/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { TopBar } from './components/TopBar';
import { ContentsDrawer } from './components/ContentsDrawer';
import { ChapterOpener } from './components/ChapterOpener';
import { Section1_1Lesson } from './components/Section1_1Lesson';
import { StandardLessonView } from './components/StandardLessonView';
import { FactorVerifier3DigitSim } from './components/sims/FactorVerifier3DigitSim';
import { Multiples4DigitSim } from './components/sims/Multiples4DigitSim';
import { PrimeCompositeSieveSim } from './components/sims/PrimeCompositeSieveSim';
import { PrimeFactorizationIndexSim } from './components/sims/PrimeFactorizationIndexSim';
import { HcfWorkbenchSim } from './components/sims/HcfWorkbenchSim';
import { LcmWorkbenchSim } from './components/sims/LcmWorkbenchSim';
import { HcfLcmRelationshipSim } from './components/sims/HcfLcmRelationshipSim';
import { SquareNumbersLabSim } from './components/sims/SquareNumbersLabSim';
import { Chapter1ReviewView } from './components/Chapter1ReviewView';
import { Chapter1AssessmentView } from './components/Chapter1AssessmentView';
import { SECTION_1_1_DATA } from './data/section1_1';
import { SECTION_1_2_DATA } from './data/section1_2';
import { SECTION_1_3_DATA } from './data/section1_3';
import { SECTION_1_4_DATA } from './data/section1_4';
import { SECTION_1_5_DATA } from './data/section1_5';
import { SECTION_1_6_1_DATA } from './data/section1_6_1';
import { SECTION_1_6_2_DATA } from './data/section1_6_2';
import { SECTION_1_7_DATA } from './data/section1_7';
import { SECTION_1_8_DATA } from './data/section1_8';
import { CHAPTER_1_ASSESSMENT_BANK } from './data/chapter1AssessmentBank';
import { CHAPTER_1_META, CHAPTER_1_TOC } from './data/chapter1Meta';

const PROGRESS_STORAGE_KEY = 'math6_ch1_progress_v1';

interface SavedChapterProgress {
  activeSectionId: string;
  completedIds: string[];
}

function loadChapterProgress(validIds: string[]): SavedChapterProgress {
  try {
    const raw = window.localStorage.getItem(PROGRESS_STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SavedChapterProgress>;
      const activeSectionId =
        parsed.activeSectionId && validIds.includes(parsed.activeSectionId)
          ? parsed.activeSectionId
          : 'section-1-1';
      const completedIds = Array.isArray(parsed.completedIds)
        ? parsed.completedIds.filter((id): id is string => typeof id === 'string')
        : [];
      return { activeSectionId, completedIds };
    }
  } catch {
    // Ignore storage errors
  }
  return { activeSectionId: 'section-1-1', completedIds: [] };
}

export default function App() {
  const activeSections = CHAPTER_1_TOC.filter(
    (item) => item.status === 'active' && item.id !== 'chapter-opener'
  );
  const validSectionIds = activeSections.map((s) => s.id);
  const initialProgress = loadChapterProgress(validSectionIds);

  const [tocOpen, setTocOpen] = useState(false);
  const [activeSectionId, setActiveSectionId] = useState<string>(initialProgress.activeSectionId);
  const [completedIds, setCompletedIds] = useState<string[]>(initialProgress.completedIds);

  useEffect(() => {
    try {
      const payload: SavedChapterProgress = { activeSectionId, completedIds };
      window.localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage errors
    }
  }, [activeSectionId, completedIds]);

  const handleJumpTo = (elementId: string) => {
    const el = document.getElementById(elementId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    if (activeSectionId === 'chapter-review' || activeSectionId === 'chapter-assessment') {
      setActiveSectionId('section-1-1');
      window.setTimeout(() => {
        const target = document.getElementById(elementId) ?? document.getElementById('active-lesson');
        target?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 60);
    }
  };

  const handleSelectSection = (id: string) => {
    if (id === 'chapter-opener') {
      handleJumpTo('chapter-opener');
      return;
    }
    setActiveSectionId(id);
    window.setTimeout(() => {
      const el = document.getElementById('active-lesson');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 40);
  };

  const handleMarkCompleted = (sectionId: string) => {
    setCompletedIds((prev) => (prev.includes(sectionId) ? prev : [...prev, sectionId]));
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <TopBar onOpenToc={() => setTocOpen(true)} onJumpTo={handleJumpTo} />

      <ContentsDrawer
        isOpen={tocOpen}
        onClose={() => setTocOpen(false)}
        onSelectSection={handleSelectSection}
        completedIds={completedIds}
      />

      <main>
        <ChapterOpener onStartLesson={() => handleSelectSection('section-1-1')} />

        {/* Chapter Section Switcher Ribbon */}
        <nav
          aria-label="Chapter 1 sections"
          className="border-y border-slate-200 bg-white"
        >
          <div className="mx-auto flex max-w-5xl items-center gap-2 overflow-x-auto px-4 py-3 sm:px-8">
            <span className="text-xs font-medium text-slate-500 whitespace-nowrap shrink-0 mr-1">
              Chapter 1 Sections:
            </span>
            {activeSections.map((sec) => {
              const isCurrent = activeSectionId === sec.id;
              const isDone = completedIds.includes(sec.id);
              return (
                <button
                  key={sec.id}
                  type="button"
                  onClick={() => handleSelectSection(sec.id)}
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isCurrent
                      ? 'border-sky-700 bg-sky-700 text-white'
                      : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  <span className="font-math">{sec.code}</span>
                  <span className="hidden sm:inline">{sec.title}</span>
                  {isDone && <Check className="h-3.5 w-3.5" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </nav>

        <div id="active-lesson">
          {activeSectionId === 'section-1-1' && (
            <>
              <Section1_1Lesson
                data={SECTION_1_1_DATA}
                onMarkCompleted={() => handleMarkCompleted('section-1-1')}
              />
              <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-8">
                <div className="flex flex-wrap items-center justify-end border-t border-slate-200 pt-6">
                  <button
                    type="button"
                    onClick={() => handleSelectSection('section-1-2')}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-sky-800 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Next: 1.2 Identification of Factors (3-Digit)</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSectionId === 'section-1-2' && (
            <StandardLessonView
              data={SECTION_1_2_DATA}
              simulation={<FactorVerifier3DigitSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-2')}
              prevSection={{ id: 'section-1-1', label: 'Previous: 1.1 Factors & Multiples' }}
              nextSection={{ id: 'section-1-3', label: 'Next: 1.3 Multiples up to 4-Digit' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'section-1-3' && (
            <StandardLessonView
              data={SECTION_1_3_DATA}
              simulation={<Multiples4DigitSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-3')}
              prevSection={{ id: 'section-1-2', label: 'Previous: 1.2 Factors (3-Digit)' }}
              nextSection={{ id: 'section-1-4', label: 'Next: 1.4 Prime & Composite' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'section-1-4' && (
            <StandardLessonView
              data={SECTION_1_4_DATA}
              simulation={<PrimeCompositeSieveSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-4')}
              prevSection={{ id: 'section-1-3', label: 'Previous: 1.3 Multiples (4-Digit)' }}
              nextSection={{ id: 'section-1-5', label: 'Next: 1.5 Prime Factors & Index' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'section-1-5' && (
            <StandardLessonView
              data={SECTION_1_5_DATA}
              simulation={<PrimeFactorizationIndexSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-5')}
              prevSection={{ id: 'section-1-4', label: 'Previous: 1.4 Prime & Composite' }}
              nextSection={{ id: 'section-1-6-1', label: 'Next: 1.6.1 H.C.F' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'section-1-6-1' && (
            <StandardLessonView
              data={SECTION_1_6_1_DATA}
              simulation={<HcfWorkbenchSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-6-1')}
              prevSection={{ id: 'section-1-5', label: 'Previous: 1.5 Prime Factors & Index' }}
              nextSection={{ id: 'section-1-6-2', label: 'Next: 1.6.2 L.C.M' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'section-1-6-2' && (
            <StandardLessonView
              data={SECTION_1_6_2_DATA}
              simulation={<LcmWorkbenchSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-6-2')}
              prevSection={{ id: 'section-1-6-1', label: 'Previous: 1.6.1 H.C.F' }}
              nextSection={{ id: 'section-1-7', label: 'Next: 1.7 HCF & LCM Relationship' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'section-1-7' && (
            <StandardLessonView
              data={SECTION_1_7_DATA}
              simulation={<HcfLcmRelationshipSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-7')}
              prevSection={{ id: 'section-1-6-2', label: 'Previous: 1.6.2 L.C.M' }}
              nextSection={{ id: 'section-1-8', label: 'Next: 1.8 Square Numbers' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'section-1-8' && (
            <StandardLessonView
              data={SECTION_1_8_DATA}
              simulation={<SquareNumbersLabSim />}
              onMarkCompleted={() => handleMarkCompleted('section-1-8')}
              prevSection={{ id: 'section-1-7', label: 'Previous: 1.7 HCF & LCM Relationship' }}
              nextSection={{ id: 'chapter-review', label: 'Next: Chapter Review & Mind Map' }}
              onNavigateSection={handleSelectSection}
            />
          )}

          {activeSectionId === 'chapter-review' && (
            <>
              <Chapter1ReviewView
                onSelectSection={handleSelectSection}
                onMarkCompleted={() => handleMarkCompleted('chapter-review')}
              />
              <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                  <button
                    type="button"
                    onClick={() => handleSelectSection('section-1-8')}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Previous: 1.8 Square Numbers</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSelectSection('chapter-assessment')}
                    className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-sky-800 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <span>Next: Complete Chapter 1 Assessment (100 Qs)</span>
                    <ArrowRight className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </>
          )}

          {activeSectionId === 'chapter-assessment' && (
            <>
              <Chapter1AssessmentView
                questions={CHAPTER_1_ASSESSMENT_BANK}
                onReviseSection={handleSelectSection}
                onAssessmentCompleted={() => handleMarkCompleted('chapter-assessment')}
              />
              <div className="mx-auto max-w-5xl px-4 pb-12 sm:px-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-slate-200 pt-6">
                  <button
                    type="button"
                    onClick={() => handleSelectSection('chapter-review')}
                    className="inline-flex items-center gap-2 rounded-lg border border-slate-200 bg-white px-5 py-2.5 text-xs sm:text-sm font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer whitespace-nowrap shrink-0"
                  >
                    <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                    <span>Previous: Chapter 1 Review &amp; Glossary</span>
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-6 sm:px-8 text-xs text-slate-500">
          <span>
            {CHAPTER_1_META.textbookSource} · {CHAPTER_1_META.subDomainNumber}: {CHAPTER_1_META.title}
          </span>
          <button
            type="button"
            onClick={() => setTocOpen(true)}
            className="font-medium text-sky-700 hover:underline cursor-pointer"
          >
            Open Chapter 1 Table of Contents
          </button>
        </div>
      </footer>
    </div>
  );
}
