import { useEffect, useState } from 'react';
import { ArrowRight, Check, HelpCircle, RotateCcw, Search, XCircle } from 'lucide-react';

interface Chapter1ReviewViewProps {
  onSelectSection: (sectionId: string) => void;
  onMarkCompleted: () => void;
}

interface GlossaryEntry {
  term: string;
  sectionRef: string;
  sectionId: string;
  definition: string;
  example: string;
}

const GLOSSARY_ENTRIES: GlossaryEntry[] = [
  {
    term: 'Factor',
    sectionRef: '1.1.1 · p. 1',
    sectionId: 'section-1-1',
    definition: 'A number that divides the dividend completely leaving zero remainder.',
    example: 'Factors of 12 are 1, 2, 3, 4, 6, 12.',
  },
  {
    term: 'Multiple',
    sectionRef: '1.1.2 · p. 2',
    sectionId: 'section-1-1',
    definition: 'The product obtained when a given number is multiplied by a counting number (1, 2, 3, ...).',
    example: 'First five multiples of 6: 6, 12, 18, 24, 30.',
  },
  {
    term: 'Dividend, Divisor, Quotient & Remainder',
    sectionRef: '1.1.1 · p. 1',
    sectionId: 'section-1-1',
    definition: 'Connected by dividend = (quotient × divisor) + remainder. When remainder = 0, the divisor is a factor.',
    example: '42 = (14 × 3) + 0 → 3 is a factor of 42.',
  },
  {
    term: 'Even & Odd Numbers',
    sectionRef: '1.1.2 · p. 3',
    sectionId: 'section-1-1',
    definition: 'Even numbers end in 0, 2, 4, 6, or 8 and have 2 as a factor. Odd numbers end in 1, 3, 5, 7, or 9.',
    example: 'Even: 24, 50  |  Odd: 13, 75.',
  },
  {
    term: 'Prime Number (P)',
    sectionRef: '1.4 · p. 4',
    sectionId: 'section-1-4',
    definition: 'A natural number that has exactly two different factors: 1 and the number itself.',
    example: 'P = {2, 3, 5, 7, 11, 13, ...} (2 is the only even prime).',
  },
  {
    term: 'Composite Number (C)',
    sectionRef: '1.4 · p. 5',
    sectionId: 'section-1-4',
    definition: 'A natural number that has more than two different factors.',
    example: 'C = {4, 6, 8, 9, 10, 12, ...}.',
  },
  {
    term: 'Neither Prime Nor Composite',
    sectionRef: '1.4 · p. 6',
    sectionId: 'section-1-4',
    definition: 'The number 1 has only one factor (itself), so it does not fit the definition of prime or composite.',
    example: '1 (1 × 1 = 1).',
  },
  {
    term: 'Twin Primes',
    sectionRef: '1.4 · p. 6',
    sectionId: 'section-1-4',
    definition: 'Two prime numbers that differ by 2.',
    example: '(3, 5), (5, 7), (11, 13), (17, 19).',
  },
  {
    term: 'Sieve of Eratosthenes',
    sectionRef: '1.4 · p. 6',
    sectionId: 'section-1-4',
    definition: 'An ancient method to find all primes up to 100 by encircling 1 and shading multiples of 2, 3, 5, and 7.',
    example: 'Finds all 25 prime numbers from 1 to 100.',
  },
  {
    term: 'Prime Factorization',
    sectionRef: '1.5 · p. 7',
    sectionId: 'section-1-5',
    definition: 'The process of writing a composite number as a product of prime numbers only (using Division Method or Factor Tree).',
    example: '36 = 2 × 2 × 3 × 3.',
  },
  {
    term: 'Index Notation (Exponential Form)',
    sectionRef: '1.5 · p. 8',
    sectionId: 'section-1-5',
    definition: 'Representing repeated prime factors using a Base (the repeated factor) and an Index/Power (how many times it multiplies).',
    example: 'In 5⁴, 5 is the Base and 4 is the Power/Index; 108 = 2² × 3³.',
  },
  {
    term: 'Expanded Form',
    sectionRef: '1.5 · p. 8',
    sectionId: 'section-1-5',
    definition: 'Writing out every repeated prime factor individually with multiplication signs.',
    example: '2² × 3³ written in expanded form is 2 × 2 × 3 × 3 × 3.',
  },
  {
    term: 'H.C.F (G.C.F / G.C.D)',
    sectionRef: '1.6.1 · p. 9',
    sectionId: 'section-1-6-1',
    definition: 'Highest Common Factor: the greatest number that divides all given numbers completely without remainder.',
    example: 'H.C.F(70, 50) = 10; H.C.F(108, 144) = 36.',
  },
  {
    term: 'Co-prime Numbers',
    sectionRef: '1.6.1 · p. 11',
    sectionId: 'section-1-6-1',
    definition: 'Two or more numbers whose Highest Common Factor (H.C.F) is 1.',
    example: 'Any two prime numbers (like 7 and 11) or consecutive numbers (8 and 9).',
  },
  {
    term: 'L.C.M (Least Common Multiple)',
    sectionRef: '1.6.2 · p. 12',
    sectionId: 'section-1-6-2',
    definition: 'The smallest non-zero number that is completely divisible by all the given numbers.',
    example: 'L.C.M(10, 15) = 30; L.C.M(16, 24, 36) = 144.',
  },
  {
    term: 'Square Number',
    sectionRef: '1.8 · p. 16',
    sectionId: 'section-1-8',
    definition: 'A number formed by multiplying an integer by itself; its objects form a completely filled square array.',
    example: '1, 4, 9, 16, 25, 36, ... and (-3)² = 9.',
  },
];

const CHAPTER_SUMMARY_POINTS = [
  'A factor is a number which divides the dividend completely leaving no remainder.',
  'Multiple of a given number is the dividend, for which the given number is its factor.',
  'A natural number which has only two different factors, 1 and the number itself, is called a prime number.',
  'A natural number which has more than two different factors is called a composite number.',
  'The process of factorizing a number into its prime factors is known as prime factorization.',
  'H.C.F of two or more numbers is the highest number which divides all the given numbers.',
  'L.C.M is the least number which is divisible by all the given numbers.',
];

interface ReviewMcq {
  id: string;
  label: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
}

const REVIEW_EX_Q1: ReviewMcq[] = [
  {
    id: 'rev-q1-i',
    label: '(i)',
    question: 'A number which divides the dividend completely leaving no remainder is called:',
    options: ['multiple', 'factor', 'prime', 'composite'],
    correctIndex: 1,
    explanation: 'A factor divides the dividend completely with remainder 0 (Textbook p. 1 & p. 18).',
  },
  {
    id: 'rev-q1-ii',
    label: '(ii)',
    question: 'The number 0 is a multiple of:',
    options: ['every number except 0 itself', 'only even numbers', 'only prime numbers', 'only 1'],
    correctIndex: 0,
    explanation: '0 = 0 × n for every counting number n (0 ÷ n = 0 with remainder 0).',
  },
  {
    id: 'rev-q1-iii',
    label: '(iii)',
    question: 'Every even number has which digit in its ones place?',
    options: ['1, 3, 5, 7, or 9', '0, 2, 4, 6, or 8', 'only 0 or 5', 'only 2'],
    correctIndex: 1,
    explanation: 'Numbers ending in 0, 2, 4, 6, or 8 are divisible by 2 and are called even numbers.',
  },
  {
    id: 'rev-q1-iv',
    label: '(iv)',
    question: 'Every odd number has which digit in its ones place?',
    options: ['0, 2, 4, 6, or 8', '1, 3, 5, 7, or 9', 'only 1 or 9', '0 or 5'],
    correctIndex: 1,
    explanation: 'Numbers ending in 1, 3, 5, 7, or 9 are not divisible by 2 and are odd numbers.',
  },
  {
    id: 'rev-q1-v',
    label: '(v)',
    question: 'An even composite number greater than 2 (such as 8 = 3 + 5 or 12 = 5 + 7) can always be written as the sum of:',
    options: [
      'two even numbers only',
      'two prime numbers',
      'two zeros',
      'two factors of 10',
    ],
    correctIndex: 1,
    explanation:
      'Textbook p. 5 Interesting Information illustrates 8 = 3 + 5 (note: mathematically this holds for even numbers > 2, while odd composites like 27 cannot be written as two primes).',
  },
  {
    id: 'rev-q1-vi',
    label: '(vi)',
    question: 'Which number is neither prime nor composite?',
    options: ['2', '4', '1', '9'],
    correctIndex: 2,
    explanation: '1 has only one factor (itself), so it is neither prime nor composite (p. 6).',
  },
  {
    id: 'rev-q1-vii',
    label: '(vii)',
    question: 'The product of the prime factors of a given number is always equal to:',
    options: [
      '1',
      'a smaller prime number',
      'the given number itself',
      'zero',
    ],
    correctIndex: 2,
    explanation:
      'Multiplying all prime factors of a number reconstructs the given number itself (e.g., 2 × 2 × 3 × 3 = 36). Note: Textbook p. 182 prints "a. prime number" by mistake, whereas "given number" is mathematically true.',
  },
  {
    id: 'rev-q1-viii',
    label: '(viii)',
    question: 'In 5⁴, which statement is correct?',
    options: [
      '4 is the base and 5 is the power',
      '5 is the base and 4 is the power',
      '4 and 5 are both powers',
      '5⁴ equals 5 × 4 = 20',
    ],
    correctIndex: 1,
    explanation:
      'By Textbook p. 8 definition, 5 is the Base (repeated factor) and 4 is the Index/Power. (Note: p. 182 key prints a typo "c", but p. 8 confirms 5 is base and 4 is power.)',
  },
  {
    id: 'rev-q1-ix',
    label: '(ix)',
    question: 'The greatest or highest number which divides all the given numbers is called their:',
    options: ['L.C.M', 'H.C.F', 'Square', 'Prime Index'],
    correctIndex: 1,
    explanation: 'H.C.F (Highest Common Factor) is the greatest number dividing all given numbers completely.',
  },
  {
    id: 'rev-q1-x',
    label: '(x)',
    question: 'The smallest number which is divisible by all the given numbers is called their:',
    options: ['H.C.F', 'G.C.D', 'L.C.M', 'Factor'],
    correctIndex: 2,
    explanation: 'L.C.M (Least Common Multiple) is the smallest number divisible by every given number.',
  },
];

interface ReviewWordProblem {
  id: string;
  label: string;
  prompt: string;
  placeholder: string;
  acceptedAnswers: string[];
  correctDisplay: string;
  hint: string;
  steps: string[];
}

const REVIEW_WORD_PROBLEMS: ReviewWordProblem[] = [
  {
    id: 'rev-q3',
    label: 'Q3 (p. 18)',
    prompt:
      '60, 84 and 108 participants from three sections sit in equal rows (all from the same section in each row). Find the greatest equal number of participants per row:',
    placeholder: 'Enter number',
    acceptedAnswers: ['12', '12 participants'],
    correctDisplay: '12 participants',
    hint: 'Split 60, 84, and 108 into equal rows → find H.C.F(60, 84, 108).',
    steps: [
      '60 = 2² × 3 × 5;  84 = 2² × 3 × 7;  108 = 2² × 3³.',
      'Common prime factors = 2 × 2 × 3 = 12.',
      'Answer: 12 participants per row (note: textbook prints "minimum" by typo, meaning greatest equal row size = H.C.F = 12).',
    ],
  },
  {
    id: 'rev-q4',
    label: 'Q4 (p. 18)',
    prompt:
      'Three taxis arrive at a stop every 20 minutes, 30 minutes, and 40 minutes. If all three meet at 10:30 a.m., when will they arrive together again?',
    placeholder: 'e.g. 12:30 p.m.',
    acceptedAnswers: ['12:30 p.m.', '12:30 pm', '12:30'],
    correctDisplay: '12:30 p.m.',
    hint: 'Find L.C.M(20, 30, 40) in minutes, convert to hours, and add to 10:30 a.m.',
    steps: [
      'L.C.M(20, 30, 40) = 120 minutes.',
      '120 minutes ÷ 60 = 2 hours.',
      '10:30 a.m. + 2 hours = 12:30 p.m.',
    ],
  },
  {
    id: 'rev-q5',
    label: 'Q5 (p. 18)',
    prompt:
      'Find the smallest number greater than 3 which when divided by 24, 36, and 60 leaves 3 as remainder in each case (Textbook Review Ex. 1 Q5):',
    placeholder: 'Enter number',
    acceptedAnswers: ['363'],
    correctDisplay: '363',
    hint: 'First find L.C.M(24, 36, 60), then add the remainder 3!',
    steps: [
      '24 = 2³ × 3;  36 = 2² × 3²;  60 = 2² × 3 × 5.',
      'L.C.M(24, 36, 60) = 2³ × 3² × 5 = 360.',
      'Add remainder 3: 360 + 3 = 363. (Check: 363 ÷ 24 = 15 rem 3, 363 ÷ 36 = 10 rem 3, 363 ÷ 60 = 6 rem 3.)',
    ],
  },
  {
    id: 'rev-q6',
    label: 'Q6 (p. 18)',
    prompt:
      'Three bells ring at intervals of 10, 20, and 30 minutes. If they ring together at 12:00 noon, at what time will they ring together next?',
    placeholder: 'e.g. 1:00 p.m.',
    acceptedAnswers: ['1:00 p.m.', '1:00 pm', '13:00', '1 pm', '1 p.m.'],
    correctDisplay: '1:00 p.m.',
    hint: 'Find L.C.M(10, 20, 30) in minutes and add to 12:00 noon.',
    steps: [
      'L.C.M(10, 20, 30) = 60 minutes = 1 hour.',
      '12:00 noon + 1 hour = 1:00 p.m.',
    ],
  },
];

const STORAGE_KEY = 'math6_ch1_review_v1';

interface SavedReviewState {
  mcqChoices: Record<string, number>;
  mcqSubmitted: boolean;
  wordInputs: Record<string, string>;
  wordStatus: Record<string, { attempted: boolean; isCorrect: boolean; showAnswer: boolean }>;
}

function loadReviewState(): SavedReviewState {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SavedReviewState>;
      return {
        mcqChoices: parsed.mcqChoices ?? {},
        mcqSubmitted: Boolean(parsed.mcqSubmitted),
        wordInputs: parsed.wordInputs ?? {},
        wordStatus: parsed.wordStatus ?? {},
      };
    }
  } catch {
    // Ignore storage errors
  }
  return { mcqChoices: {}, mcqSubmitted: false, wordInputs: {}, wordStatus: {} };
}

function normalizeReviewAnswer(raw: string): string {
  return raw
    .toLowerCase()
    .replace(/\s+/g, ' ')
    .replace(/\./g, '')
    .trim();
}

export function Chapter1ReviewView({
  onSelectSection,
  onMarkCompleted,
}: Chapter1ReviewViewProps) {
  const saved = loadReviewState();
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const [openDefMap, setOpenDefMap] = useState<Record<string, boolean>>({});
  const [mcqChoices, setMcqChoices] = useState<Record<string, number>>(saved.mcqChoices);
  const [mcqSubmitted, setMcqSubmitted] = useState<boolean>(saved.mcqSubmitted);
  const [wordInputs, setWordInputs] = useState<Record<string, string>>(saved.wordInputs);
  const [wordStatus, setWordStatus] = useState<
    Record<string, { attempted: boolean; isCorrect: boolean; showAnswer: boolean }>
  >(saved.wordStatus);
  const [wordHints, setWordHints] = useState<Record<string, boolean>>({});

  useEffect(() => {
    try {
      const payload: SavedReviewState = {
        mcqChoices,
        mcqSubmitted,
        wordInputs,
        wordStatus,
      };
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      // Ignore storage errors
    }
  }, [mcqChoices, mcqSubmitted, wordInputs, wordStatus]);

  const filteredGlossary = GLOSSARY_ENTRIES.filter((entry) => {
    const q = glossaryQuery.trim().toLowerCase();
    if (!q) return true;
    return (
      entry.term.toLowerCase().includes(q) ||
      entry.definition.toLowerCase().includes(q) ||
      entry.example.toLowerCase().includes(q)
    );
  });

  const mcqScore = REVIEW_EX_Q1.filter((q) => mcqChoices[q.id] === q.correctIndex).length;

  const handleCheckWordProblem = (wp: ReviewWordProblem) => {
    const raw = (wordInputs[wp.id] ?? '').trim();
    if (!raw) return;
    const norm = normalizeReviewAnswer(raw);
    const isCorrect = wp.acceptedAnswers.some((ans) => normalizeReviewAnswer(ans) === norm);
    setWordStatus((prev) => ({
      ...prev,
      [wp.id]: {
        attempted: true,
        isCorrect,
        showAnswer: isCorrect ? true : Boolean(prev[wp.id]?.showAnswer),
      },
    }));
  };

  return (
    <article id="chapter-review" className="mx-auto max-w-5xl px-4 py-10 sm:px-8 sm:py-14 space-y-14">
      {/* Header */}
      <header className="border-b border-slate-200 pb-8">
        <p className="text-xs font-medium text-slate-500">
          Chapter 1 Consolidation · Textbook pp. 17–18 &amp; p. 188
        </p>
        <h2 className="mt-2 font-display text-3xl font-bold tracking-tight text-slate-900">
          Chapter 1 Mind Map, Glossary, Summary &amp; Review Exercise 1
        </h2>
        <p className="mt-2 text-sm sm:text-[15px] leading-relaxed text-slate-600 max-w-3xl">
          Connect all eight sections of Factors and Multiples on one visual map, revise every key term in the Glossary, read the Textbook p. 18 Summary, and solve Review Exercise 1 before taking the 100-Question Chapter Assessment.
        </p>
      </header>

      {/* 1. Chapter-Wide Interactive Mind Map */}
      <section className="space-y-4">
        <div>
          <p className="text-xs font-medium text-slate-500">Big Picture Connections</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Chapter 1 Visual Mind Map
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Click any section card below to jump straight back to that lesson and its interactive simulator.
          </p>
        </div>

        <div className="rounded-xl border border-slate-200 bg-white p-4 sm:p-6 space-y-5">
          <svg
            viewBox="0 0 760 270"
            className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
            role="img"
            aria-label="Chapter 1 mind map linking Factors and Multiples to sections 1.1 through 1.8"
          >
            {/* Connector Lines from Center Hub (380, 135) */}
            {[
              { x: 115, y: 46 },
              { x: 290, y: 46 },
              { x: 470, y: 46 },
              { x: 645, y: 46 },
              { x: 115, y: 224 },
              { x: 290, y: 224 },
              { x: 470, y: 224 },
              { x: 645, y: 224 },
            ].map((pt, i) => (
              <line
                key={i}
                x1="380"
                y1="135"
                x2={pt.x}
                y2={pt.y}
                stroke="#94A3B8"
                strokeWidth="1.6"
                strokeDasharray="4 3"
              />
            ))}

            {/* Top Row Nodes (1.1 - 1.4) */}
            {[
              { id: 'section-1-1', x: 28, y: 14, code: '1.1', title: 'Factors & Multiples', sub: 'rem = 0 · Even/Odd', color: '#E0F2FE', stroke: '#0284C7' },
              { id: 'section-1-2', x: 203, y: 14, code: '1.2', title: '3-Digit Factors', sub: 'Division & Rules 2,5,10', color: '#E0F2FE', stroke: '#0284C7' },
              { id: 'section-1-3', x: 383, y: 14, code: '1.3', title: '4-Digit Multiples', sub: 'Multiples up to 9,999', color: '#E0F2FE', stroke: '#0284C7' },
              { id: 'section-1-4', x: 558, y: 14, code: '1.4', title: 'Prime & Composite', sub: 'Sieve 1–100 · Twin Primes', color: '#ECFDF5', stroke: '#059669' },
            ].map((node) => (
              <g
                key={node.id}
                onClick={() => onSelectSection(node.id)}
                className="cursor-pointer"
              >
                <rect x={node.x} y={node.y} width="174" height="58" rx="8" fill={node.color} stroke={node.stroke} strokeWidth="1.5" />
                <text x={node.x + 87} y={node.y + 22} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">
                  {node.code} · {node.title}
                </text>
                <text x={node.x + 87} y={node.y + 42} textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#334155">
                  {node.sub}
                </text>
              </g>
            ))}

            {/* Center Hub */}
            <rect x="245" y="103" width="270" height="64" rx="12" fill="#0F172A" />
            <text x="380" y="130" textAnchor="middle" fontSize="14.5" fontWeight="700" fill="#FFFFFF">
              Chapter 1: Factors &amp; Multiples
            </text>
            <text x="380" y="150" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#7DD3FC">
              Divide (Factors/HCF) ↔ Multiply (Multiples/LCM)
            </text>

            {/* Bottom Row Nodes (1.5 - 1.8) */}
            {[
              { id: 'section-1-5', x: 28, y: 196, code: '1.5', title: 'Prime Factors & Index', sub: 'Tree · Ladder · aⁿ', color: '#ECFDF5', stroke: '#059669' },
              { id: 'section-1-6-1', x: 203, y: 196, code: '1.6.1', title: 'H.C.F & Co-Primes', sub: 'Factorize · Long Division', color: '#FFFBEB', stroke: '#D97706' },
              { id: 'section-1-6-2', x: 383, y: 196, code: '1.6.2', title: 'L.C.M Methods', sub: 'Prime & Joint Division', color: '#FFFBEB', stroke: '#D97706' },
              { id: 'section-1-8', x: 558, y: 196, code: '1.7–1.8', title: 'HCF×LCM & Squares', sub: 'a×b · Full Arrays · n²', color: '#F5F3FF', stroke: '#7C3AED' },
            ].map((node) => (
              <g
                key={node.id}
                onClick={() => onSelectSection(node.id)}
                className="cursor-pointer"
              >
                <rect x={node.x} y={node.y} width="174" height="58" rx="8" fill={node.color} stroke={node.stroke} strokeWidth="1.5" />
                <text x={node.x + 87} y={node.y + 22} textAnchor="middle" fontSize="11.5" fontWeight="700" fill="#0F172A">
                  {node.code} · {node.title}
                </text>
                <text x={node.x + 87} y={node.y + 42} textAnchor="middle" fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#334155">
                  {node.sub}
                </text>
              </g>
            ))}
          </svg>
        </div>
      </section>

      {/* 2. Textbook Summary (p. 18) */}
      <section className="space-y-4 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">Textbook p. 18</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Official Chapter 1 Summary
          </h3>
        </div>
        <div className="rounded-xl border border-sky-200 bg-sky-50/50 p-6">
          <ol className="space-y-2.5 text-sm leading-relaxed text-slate-800 list-decimal pl-5">
            {CHAPTER_SUMMARY_POINTS.map((point) => (
              <li key={point}>{point}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* 3. Chapter 1 Glossary */}
      <section className="space-y-5 pt-4 border-t border-slate-200">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <p className="text-xs font-medium text-slate-500">
              Vocabulary · Textbook pp. 1–18 &amp; p. 188
            </p>
            <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
              Chapter 1 Glossary ({filteredGlossary.length} terms)
            </h3>
          </div>
          <div className="relative w-full sm:w-72">
            <Search
              className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400"
              aria-hidden="true"
            />
            <input
              type="search"
              value={glossaryQuery}
              onChange={(e) => setGlossaryQuery(e.target.value)}
              placeholder="Filter glossary terms..."
              aria-label="Filter glossary terms"
              className="w-full rounded-lg border border-slate-300 bg-white pl-9 pr-3 py-2 text-xs text-slate-900 placeholder:text-slate-400"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredGlossary.map((item) => (
            <div
              key={item.term}
              className="rounded-xl border border-slate-200 bg-white p-5 flex flex-col justify-between space-y-3"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-display text-base font-semibold text-sky-900">
                    {item.term}
                  </h4>
                  <button
                    type="button"
                    onClick={() => onSelectSection(item.sectionId)}
                    className="font-math text-[11px] font-semibold text-sky-700 hover:underline whitespace-nowrap shrink-0 cursor-pointer"
                  >
                    §{item.sectionRef}
                  </button>
                </div>
                <p className="mt-1.5 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {item.definition}
                </p>
              </div>
              <p className="pt-2.5 border-t border-slate-100 text-xs text-slate-600">
                <strong className="text-slate-900">Example:</strong>{' '}
                <span className="font-math">{item.example}</span>
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Interactive Review Exercise 1 (Textbook pp. 17–18) */}
      <section className="space-y-8 pt-4 border-t border-slate-200">
        <div>
          <p className="text-xs font-medium text-slate-500">Textbook pp. 17–18</p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Review Exercise 1
          </h3>
        </div>

        {/* Review Ex 1 Q1: 10 Conceptual MCQs */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-6">
          <div className="flex flex-wrap items-start justify-between gap-4 border-b border-slate-200 pb-4">
            <div>
              <h4 className="font-display text-lg font-bold text-slate-900">
                Q1. Choose the Correct Option (10 Questions)
              </h4>
              <p className="mt-1 text-xs text-slate-600">
                Answer all 10 conceptual review items from Textbook p. 17, then submit to see your score and verified explanations.
              </p>
            </div>
            {mcqSubmitted && (
              <div className="rounded-lg border border-slate-200 bg-slate-50 px-4 py-2 text-right">
                <p className="text-xs text-slate-500">Q1 Score</p>
                <p className="font-math text-lg font-bold text-slate-900">
                  {mcqScore} / {REVIEW_EX_Q1.length}
                </p>
              </div>
            )}
          </div>

          <ol className="space-y-6">
            {REVIEW_EX_Q1.map((q) => {
              const chosen = mcqChoices[q.id];
              const isCorrect = chosen === q.correctIndex;
              return (
                <li key={q.id} className="space-y-2.5">
                  <p className="text-sm font-semibold text-slate-900">
                    <span className="font-math text-sky-700 mr-2">{q.label}</span>
                    {q.question}
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {q.options.map((opt, optIdx) => {
                      const isSel = chosen === optIdx;
                      let cls = 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50';
                      if (mcqSubmitted) {
                        if (optIdx === q.correctIndex) {
                          cls = 'border-emerald-600 bg-emerald-50 text-emerald-950 font-semibold';
                        } else if (isSel) {
                          cls = 'border-rose-400 bg-rose-50 text-rose-950';
                        }
                      } else if (isSel) {
                        cls = 'border-sky-700 bg-sky-50 text-sky-950 font-semibold';
                      }
                      return (
                        <button
                          key={opt}
                          type="button"
                          disabled={mcqSubmitted}
                          onClick={() => setMcqChoices((prev) => ({ ...prev, [q.id]: optIdx }))}
                          className={`rounded-lg border px-4 py-2 text-left text-xs sm:text-sm cursor-pointer disabled:cursor-default ${cls}`}
                        >
                          <span className="font-math font-semibold mr-2">
                            {String.fromCharCode(97 + optIdx)}.
                          </span>
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                  {mcqSubmitted && (
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
            {!mcqSubmitted ? (
              <button
                type="button"
                disabled={Object.keys(mcqChoices).length < REVIEW_EX_Q1.length}
                onClick={() => {
                  setMcqSubmitted(true);
                  onMarkCompleted();
                }}
                className="rounded-lg bg-sky-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-sky-800 disabled:opacity-45 cursor-pointer"
              >
                Submit Q1 Review ({Object.keys(mcqChoices).length}/{REVIEW_EX_Q1.length})
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setMcqChoices({});
                  setMcqSubmitted(false);
                }}
                className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
              >
                <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Retry Q1</span>
              </button>
            )}
          </div>
        </div>

        {/* Review Ex 1 Q2: 8 Key Definitions & Examples */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5">
          <div>
            <h4 className="font-display text-lg font-bold text-slate-900">
              Q2. Define with Examples (8 Core Terms · p. 18)
            </h4>
            <p className="mt-1 text-xs text-slate-600">
              Try stating each definition and example aloud in your own words first, then click to verify against the textbook definition.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {[
              { id: 'def-1', term: 'Factors', def: 'A number dividing the dividend completely with remainder 0. Example: Factors of 12 are 1, 2, 3, 4, 6, 12.' },
              { id: 'def-2', term: 'Multiples', def: 'Products of a number with 1, 2, 3, ... Example: Multiples of 7 are 7, 14, 21, 28, ...' },
              { id: 'def-3', term: 'Prime numbers', def: 'Natural numbers with exactly two factors (1 and itself). Example: 2, 3, 5, 7, 11.' },
              { id: 'def-4', term: 'Composite numbers', def: 'Natural numbers with more than two factors. Example: 4, 6, 8, 9, 12.' },
              { id: 'def-5', term: 'Index notation', def: 'Writing repeated prime factors with base and power. Example: 2 × 2 × 3 × 3 × 3 = 2² × 3³.' },
              { id: 'def-6', term: 'Prime factorization', def: 'Breaking a composite number into prime factors only. Example: 36 = 2 × 2 × 3 × 3.' },
              { id: 'def-7', term: 'H.C.F', def: 'Highest Common Factor dividing all given numbers. Example: H.C.F(27, 54, 315) = 9.' },
              { id: 'def-8', term: 'L.C.M', def: 'Least Common Multiple divisible by all given numbers. Example: L.C.M(10, 15) = 30.' },
            ].map((item, idx) => {
              const isOpen = Boolean(openDefMap[item.id]);
              return (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 flex flex-col justify-between space-y-3"
                >
                  <div>
                    <p className="font-math text-xs font-semibold text-sky-700">
                      ({['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii'][idx]})
                    </p>
                    <p className="mt-0.5 font-display text-sm font-bold text-slate-900">
                      {item.term}
                    </p>
                    {isOpen && (
                      <p className="mt-2 text-xs leading-relaxed text-slate-700">{item.def}</p>
                    )}
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenDefMap((prev) => ({ ...prev, [item.id]: !prev[item.id] }))
                    }
                    className="self-start text-xs font-semibold text-sky-700 hover:underline cursor-pointer"
                  >
                    {isOpen ? 'Hide Definition' : 'Check Definition'}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Review Ex 1 Q3–Q6: Applied Word Problems */}
        <div className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 space-y-5">
          <div>
            <h4 className="font-display text-lg font-bold text-slate-900">
              Q3–Q6. Applied Word Problems (Textbook p. 18)
            </h4>
            <p className="mt-1 text-xs text-slate-600">
              Solve each problem in your notebook, enter your final answer, and check step-by-step solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {REVIEW_WORD_PROBLEMS.map((wp) => {
              const st = wordStatus[wp.id];
              const showHint = Boolean(wordHints[wp.id]);
              return (
                <div
                  key={wp.id}
                  className="rounded-lg border border-slate-200 bg-slate-50/70 p-4 space-y-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <label
                      htmlFor={wp.id}
                      className="text-xs sm:text-sm font-semibold text-slate-900 leading-snug"
                    >
                      <span className="font-math text-sky-700 mr-1.5">{wp.label}</span>
                      {wp.prompt}
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setWordHints((prev) => ({ ...prev, [wp.id]: !prev[wp.id] }))
                      }
                      className="inline-flex items-center gap-1 text-xs text-slate-600 hover:text-slate-900 cursor-pointer shrink-0"
                    >
                      <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Hint</span>
                    </button>
                  </div>

                  <div className="flex gap-2">
                    <input
                      id={wp.id}
                      type="text"
                      value={wordInputs[wp.id] ?? ''}
                      onChange={(e) => {
                        setWordInputs((prev) => ({ ...prev, [wp.id]: e.target.value }));
                        if (st && !st.isCorrect) {
                          setWordStatus((prev) => ({
                            ...prev,
                            [wp.id]: { ...prev[wp.id], attempted: false },
                          }));
                        }
                      }}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') handleCheckWordProblem(wp);
                      }}
                      placeholder={wp.placeholder}
                      className="font-math flex-1 rounded-lg border border-slate-300 bg-white px-3 py-1.5 text-xs text-slate-900"
                    />
                    <button
                      type="button"
                      onClick={() => handleCheckWordProblem(wp)}
                      className="rounded-lg bg-slate-900 px-3.5 py-1.5 text-xs font-semibold text-white hover:bg-slate-800 cursor-pointer whitespace-nowrap shrink-0"
                    >
                      Check
                    </button>
                  </div>

                  {showHint && (
                    <p className="rounded border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs text-sky-950">
                      <strong>Hint:</strong> {wp.hint}
                    </p>
                  )}

                  {st?.attempted && st.isCorrect && (
                    <div className="rounded border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-950 space-y-1">
                      <p className="inline-flex items-center gap-1 font-semibold text-emerald-800">
                        <Check className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>Correct! ({wp.correctDisplay})</span>
                      </p>
                      <ul className="space-y-0.5 font-math pl-4 list-disc">
                        {wp.steps.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {st?.attempted && !st.isCorrect && (
                    <div className="rounded border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950 space-y-1.5">
                      <div className="flex items-center justify-between gap-2">
                        <p className="inline-flex items-center gap-1 font-semibold text-amber-900">
                          <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Check units/time and try again!</span>
                        </p>
                        {!st.showAnswer && (
                          <button
                            type="button"
                            onClick={() =>
                              setWordStatus((prev) => ({
                                ...prev,
                                [wp.id]: { ...prev[wp.id], showAnswer: true },
                              }))
                            }
                            className="font-semibold text-sky-800 hover:underline cursor-pointer"
                          >
                            Show Solution
                          </button>
                        )}
                      </div>
                      {st.showAnswer && (
                        <div className="pt-1 border-t border-amber-200 space-y-1">
                          <p className="font-math font-semibold">Answer: {wp.correctDisplay}</p>
                          <ul className="space-y-0.5 font-math pl-4 list-disc">
                            {wp.steps.map((s) => (
                              <li key={s}>{s}</li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mark Completed CTA */}
      <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-5">
        <p className="text-xs sm:text-sm text-slate-700">
          Finished reviewing the Mind Map, Glossary, and Review Exercise 1? Proceed to the 100-question Chapter 1 Assessment!
        </p>
        <button
          type="button"
          onClick={() => {
            onMarkCompleted();
            onSelectSection('chapter-assessment');
          }}
          className="inline-flex items-center gap-2 rounded-lg bg-sky-700 px-5 py-2.5 text-xs sm:text-sm font-semibold text-white hover:bg-sky-800 cursor-pointer whitespace-nowrap shrink-0"
        >
          <span>Start Chapter 1 Assessment (100 Qs)</span>
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </article>
  );
}
