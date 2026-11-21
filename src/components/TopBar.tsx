import { BookOpen } from 'lucide-react';

interface TopBarProps {
  onOpenToc: () => void;
  onJumpTo: (elementId: string) => void;
}

export function TopBar({ onOpenToc, onJumpTo }: TopBarProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-8 px-4 py-3.5 sm:px-8">
        {/* Zone 1: Single-line Brand Wordmark */}
        <button
          type="button"
          onClick={() => onJumpTo('chapter-opener')}
          className="font-display text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 cursor-pointer hover:text-sky-700 transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded"
        >
          Mathematics 6
        </button>

        {/* Zone 2: Clean single-line text navigation links */}
        <nav
          aria-label="Section navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600"
        >
          <button
            type="button"
            onClick={() => onJumpTo('chapter-opener')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded"
          >
            Opener
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('active-lesson')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded"
          >
            Lesson
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('interactive-lab')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded"
          >
            Interactive Lab
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('worked-examples')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded"
          >
            Examples
          </button>
          <button
            type="button"
            onClick={() => onJumpTo('practice-assessment')}
            className="hover:text-slate-900 hover:underline underline-offset-4 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-600 rounded"
          >
            Practice
          </button>
        </nav>

        {/* Zone 3: Primary Action */}
        <div className="flex items-center shrink-0">
          <button
            type="button"
            onClick={onOpenToc}
            aria-label="Open Chapter 1 Table of Contents"
            className="inline-flex min-h-[38px] items-center gap-2 rounded-lg bg-sky-700 px-4 py-2 text-xs font-semibold text-white hover:bg-sky-800 transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600"
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Contents</span>
          </button>
        </div>
      </div>
    </header>
  );
}
