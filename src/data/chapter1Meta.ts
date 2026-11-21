import { ChapterTocItem } from '../types/textbook';

export const CHAPTER_1_META = {
  domain: 'Domain 1 · Numbers and Operations',
  subDomainNumber: 'Sub-Domain 1',
  title: 'Factors and Multiples',
  textbookSource: 'Mathematics 6 · Single National Curriculum 2022 (PCTB)',
  learningOutcomes: [
    'Recognize factors of numbers up to 3-digit.',
    'Find and identify multiples of numbers up to 2-digit.',
    'Calculate and apply H.C.F and L.C.M.',
  ],
  openerHook: {
    title: 'Hailey College Transit Stop',
    pageRef: 'Textbook p. 1',
    scenario:
      'A metro bus arrives near Hailey College every 180 seconds, and an orange train arrives every 360 seconds. If both arrive together right now, after how much time will both the bus and the train arrive together again?',
    busInterval: 180,
    trainInterval: 360,
  },
};

export const CHAPTER_1_TOC: ChapterTocItem[] = [
  {
    id: 'chapter-opener',
    code: 'Intro',
    title: 'Chapter Opener & Learning Outcomes',
    pageRange: 'p. 1',
    status: 'active',
  },
  {
    id: 'section-1-1',
    code: '1.1',
    title: 'Factors and Multiples (1.1.1 & 1.1.2)',
    pageRange: 'pp. 1–3',
    status: 'active',
  },
  {
    id: 'section-1-2',
    code: '1.2',
    title: 'Identification of Factors up to 3-Digit Numbers',
    pageRange: 'p. 4',
    status: 'active',
  },
  {
    id: 'section-1-3',
    code: '1.3',
    title: 'Identification of Multiples of Numbers up to 4-Digit',
    pageRange: 'p. 4',
    status: 'active',
  },
  {
    id: 'section-1-4',
    code: '1.4',
    title: 'Prime Numbers and Composite Numbers',
    pageRange: 'pp. 4–7',
    status: 'active',
  },
  {
    id: 'section-1-5',
    code: '1.5',
    title: 'Prime Factors & Index Notation',
    pageRange: 'pp. 7–9',
    status: 'active',
  },
  {
    id: 'section-1-6-1',
    code: '1.6.1',
    title: 'H.C.F (Highest Common Factor)',
    pageRange: 'pp. 9–12',
    status: 'active',
  },
  {
    id: 'section-1-6-2',
    code: '1.6.2',
    title: 'L.C.M (Least Common Multiple)',
    pageRange: 'pp. 12–15',
    status: 'active',
  },
  {
    id: 'section-1-7',
    code: '1.7',
    title: 'Relationship Between HCF and LCM',
    pageRange: 'pp. 15–16',
    status: 'active',
  },
  {
    id: 'section-1-8',
    code: '1.8',
    title: 'Square of Numbers up to 2-Digit Numbers',
    pageRange: 'pp. 16–17',
    status: 'active',
  },
  {
    id: 'chapter-review',
    code: 'Review',
    title: 'Mind Map, Glossary, Summary & Review Exercise 1',
    pageRange: 'pp. 17–18',
    status: 'active',
  },
  {
    id: 'chapter-assessment',
    code: 'Assessment',
    title: 'Complete Chapter 1 Assessment (100 Qs)',
    pageRange: 'pp. 1–18',
    status: 'active',
  },
];
