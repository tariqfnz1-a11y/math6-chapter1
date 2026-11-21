import { X, Check, Clock } from 'lucide-react';
import { CHAPTER_1_META, CHAPTER_1_TOC } from '../data/chapter1Meta';

interface ContentsDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectSection: (id: string) => void;
  completedIds: string[];
}

export function ContentsDrawer({
  isOpen,
  onClose,
  onSelectSection,
  completedIds,
}: ContentsDrawerProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-[1px]"
      role="dialog"
      aria-modal="true"
      aria-label="Chapter 1 Table of Contents"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <aside className="relative z-10 flex h-full w-full max-w-md flex-col bg-white border-l border-slate-200 shadow-xl">
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-5">
          <div>
            <p className="text-xs font-medium text-slate-500">
              {CHAPTER_1_META.domain} · {CHAPTER_1_META.subDomainNumber}
            </p>
            <h2 className="mt-1 font-display text-xl font-bold text-slate-900">
              {CHAPTER_1_META.title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close contents drawer"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors cursor-pointer"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-5">
          <p className="mb-4 text-xs leading-relaxed text-slate-500">
            Select an available section to jump straight to that lesson page. Upcoming sections follow the verified PCTB sequence.
          </p>

          <ul className="divide-y divide-slate-100 border-y border-slate-200">
            {CHAPTER_1_TOC.map((item) => {
              const isAvailable = item.status === 'active';
              const isCompleted = completedIds.includes(item.id);
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    disabled={!isAvailable}
                    onClick={() => {
                      if (isAvailable) {
                        onSelectSection(item.id);
                        onClose();
                      }
                    }}
                    className={`flex w-full items-start justify-between gap-4 py-3.5 text-left transition-colors ${
                      isAvailable
                        ? 'cursor-pointer hover:bg-slate-50 px-2 -mx-2 rounded-lg'
                        : 'cursor-not-allowed opacity-55'
                    }`}
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <span className="font-math font-semibold text-sky-700">{item.code}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.pageRange}</span>
                      </div>
                      <p className="mt-0.5 text-sm font-semibold text-slate-900">
                        {item.title}
                      </p>
                    </div>
                    <div className="shrink-0 pt-1 text-xs font-medium">
                      {isAvailable ? (
                        isCompleted ? (
                          <span className="inline-flex items-center gap-1 text-emerald-700">
                            <Check className="h-3.5 w-3.5" aria-hidden="true" />
                            <span>Done</span>
                          </span>
                        ) : (
                          <span className="text-sky-700">Open</span>
                        )
                      ) : (
                        <span className="inline-flex items-center gap-1 text-slate-400">
                          <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Next</span>
                        </span>
                      )}
                    </div>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="border-t border-slate-200 bg-slate-50 px-6 py-4 text-xs text-slate-500">
          {CHAPTER_1_META.textbookSource}
        </div>
      </aside>
    </div>
  );
}
