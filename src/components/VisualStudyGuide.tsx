import { useState } from 'react';
import { Check, XCircle } from 'lucide-react';
import { CommonErrorItem, KeyTermItem } from '../types/textbook';

interface VisualStudyGuideProps {
  keyTerms: KeyTermItem[];
  commonErrors: CommonErrorItem[];
  studyNotes: { heading: string; points: string[] }[];
  summaryPoints: string[];
}

type StudyTab = 'all' | 'mindmap' | 'diagrams' | 'rules' | 'notes';
type MindMapNodeId = 'center' | 'factors' | 'multiples' | 'division' | 'clues' | 'parity';

interface MindMapNodeDetail {
  id: MindMapNodeId;
  title: string;
  subtitle: string;
  bullets: string[];
  example: string;
  toneClass: string;
}

const MIND_MAP_DETAILS: Record<MindMapNodeId, MindMapNodeDetail> = {
  center: {
    id: 'center',
    title: 'Factors & Multiples (Section 1.1)',
    subtitle: 'Two opposite directions of exact multiplication and division',
    bullets: [
      'Both ideas come from the same fact: when a × b = c, a and b are factors of c, while c is a multiple of a and b.',
      'Click any branch in the concept map to inspect its rules and example.',
    ],
    example: 'In 6 × 3 = 18:  6 and 3 are factors of 18;  18 is a multiple of 6 and 3.',
    toneClass: 'border-slate-200 bg-slate-50 text-slate-900',
  },
  factors: {
    id: 'factors',
    title: 'Factors (Inside the Number)',
    subtitle: 'Numbers that divide the dividend with remainder 0',
    bullets: [
      'Every number > 1 has at least two factors: 1 and itself.',
      'All factors of a number are less than or equal to the number (finite list).',
      'Find all factors using pairs (1 × n, 2 × ...) and stop when pairs repeat.',
    ],
    example: 'Factors of 36: 1×36, 2×18, 3×12, 4×9, 6×6 → 1, 2, 3, 4, 6, 9, 12, 18, 36.',
    toneClass: 'border-sky-200 bg-sky-50/70 text-sky-950',
  },
  multiples: {
    id: 'multiples',
    title: 'Multiples (Growing Outward)',
    subtitle: 'Products made by multiplying by 1, 2, 3, 4, ...',
    bullets: [
      'Every number is a multiple of itself (1 × n = n).',
      'Every natural multiple is greater than or equal to the number.',
      'A number has unlimited multiples—they go on forever.',
    ],
    example: 'First five multiples of 7:  7, 14, 21, 28, 35.',
    toneClass: 'border-emerald-200 bg-emerald-50/70 text-emerald-950',
  },
  division: {
    id: 'division',
    title: 'Exact Division & Remainder Rule',
    subtitle: 'dividend = quotient × divisor + remainder',
    bullets: [
      'If remainder = 0, the divisor is a factor AND the dividend is a multiple.',
      'If remainder ≠ 0, the divisor is NOT a factor AND the dividend is NOT a multiple.',
    ],
    example: '42 ÷ 3 = 14 (rem 0 → factor)   |   42 ÷ 5 = 8 (rem 2 → not a factor).',
    toneClass: 'border-amber-200 bg-amber-50/70 text-amber-950',
  },
  clues: {
    id: 'clues',
    title: 'Ending-Digit Factor Clues (Fun Facts)',
    subtitle: 'Instant checks without long division',
    bullets: [
      'Even numbers (ending in 0, 2, 4, 6, 8) always have 2 as a factor.',
      'Numbers ending in 5 always have 5 as a factor.',
      'Numbers > 0 ending in 0 always have 2, 5, and 10 as factors.',
    ],
    example: '230 ends in 0 → 2, 5, and 10 are all factors of 230!',
    toneClass: 'border-sky-200 bg-sky-50/70 text-sky-950',
  },
  parity: {
    id: 'parity',
    title: 'Even & Odd Patterns (Thinking Time)',
    subtitle: 'Behavior under +, −, ×, and ÷',
    bullets: [
      'Addition & Subtraction follow identical rules: Same parity → Even; Different parity → Odd.',
      'Multiplication is Even whenever at least one factor is Even; Odd × Odd = Odd.',
      'Division does not always produce a whole number (e.g., 6 ÷ 4 = 1.5).',
    ],
    example: 'Odd − Odd = Even (9 − 3 = 6)   |   Even × Odd = Even (4 × 5 = 20).',
    toneClass: 'border-slate-200 bg-slate-50 text-slate-900',
  },
};

const KEY_MATHEMATICAL_RULES = [
  {
    ruleTitle: '1. The Remainder Test',
    formula: 'dividend = quotient × divisor + remainder',
    ruleText: 'Remainder = 0 means exact factor and exact multiple. Any remainder > 0 means NOT a factor and NOT a multiple.',
  },
  {
    ruleTitle: '2. Factor-Pair Stopping Rule',
    formula: '1 × n, 2 × ..., stop on repeat',
    ruleText: 'Test counting numbers from 1 upward in pairs. Once a pair repeats (such as 6 × 6, or 8 × 5 after 5 × 8), stop—you have every factor.',
  },
  {
    ruleTitle: '3. Finite vs. Unlimited Bounds',
    formula: '1 ≤ factor ≤ n   |   n ≤ multiple < ∞',
    ruleText: 'Factors sit between 1 and the number itself (limited count). Natural multiples start at the number and continue forever.',
  },
  {
    ruleTitle: '4. Instant Last-Digit Clues',
    formula: 'Even → 2   |   Ends in 5 → 5   |   Ends in 0 → 2, 5, 10',
    ruleText: 'Every even number has 2 as a factor, numbers ending in 5 have 5, and numbers > 0 ending in 0 have 2, 5, and 10 as factors.',
  },
];

export function VisualStudyGuide({
  keyTerms,
  commonErrors,
  studyNotes,
  summaryPoints,
}: VisualStudyGuideProps) {
  const [activeTab, setActiveTab] = useState<StudyTab>('all');
  const [selectedNode, setSelectedNode] = useState<MindMapNodeId>('center');

  const activeDetail = MIND_MAP_DETAILS[selectedNode];

  const showSection = (target: Exclude<StudyTab, 'all'>) =>
    activeTab === 'all' || activeTab === target;

  return (
    <div id="visual-study-guide" className="space-y-10">
      {/* Header & Section Switcher */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Visual Revision Guide · Section 1.1 · Textbook pp. 1–4
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Study Notes, Diagrams &amp; Concept Mind Map
          </h3>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Review every definition, mathematical rule, step-by-step diagram, concept connection, common mistake, and quick summary in one mobile-friendly study spread.
          </p>
        </div>

        <div
          className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1"
          role="tablist"
          aria-label="Filter visual study aids"
        >
          {[
            { id: 'all' as const, label: 'All Visual Aids' },
            { id: 'mindmap' as const, label: 'Concept Map' },
            { id: 'diagrams' as const, label: 'Step Diagrams' },
            { id: 'rules' as const, label: 'Rules & Terms' },
            { id: 'notes' as const, label: 'Notes & Mistakes' },
          ].map((tab) => (
            <button
              key={tab.id}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-md px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                activeTab === tab.id
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* 8. Visual Concept Map (Interactive Desktop + Mobile SVG) */}
      {showSection('mindmap') && (
        <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
          <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 flex flex-wrap items-center justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Visual Concept Map · Tap any branch to inspect
              </p>
              <h4 className="font-display text-lg font-bold text-slate-900">
                Section 1.1 Mind Map: How Everything Connects
              </h4>
            </div>
            <span className="text-xs text-slate-500">
              Selected: <strong className="text-sky-800">{activeDetail.title}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12">
            {/* SVG Mind Map Canvas */}
            <div className="p-4 sm:p-6 lg:col-span-8 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/50">
              {/* Desktop / Tablet Horizontal SVG Mind Map */}
              <svg
                viewBox="0 0 760 400"
                className="hidden md:block w-full h-auto"
                role="img"
                aria-label="Interactive concept map connecting Factors, Multiples, Division Rule, Ending-Digit Clues, and Parity"
              >
                {/* Connector lines from center (380, 200) */}
                <line
                  x1="380"
                  y1="200"
                  x2="145"
                  y2="78"
                  stroke={selectedNode === 'factors' ? '#0284C7' : '#CBD5E1'}
                  strokeWidth={selectedNode === 'factors' ? '3' : '2'}
                />
                <line
                  x1="380"
                  y1="200"
                  x2="615"
                  y2="78"
                  stroke={selectedNode === 'multiples' ? '#059669' : '#CBD5E1'}
                  strokeWidth={selectedNode === 'multiples' ? '3' : '2'}
                />
                <line
                  x1="380"
                  y1="200"
                  x2="380"
                  y2="335"
                  stroke={selectedNode === 'division' ? '#D97706' : '#CBD5E1'}
                  strokeWidth={selectedNode === 'division' ? '3' : '2'}
                />
                <line
                  x1="380"
                  y1="200"
                  x2="140"
                  y2="322"
                  stroke={selectedNode === 'clues' ? '#0284C7' : '#CBD5E1'}
                  strokeWidth={selectedNode === 'clues' ? '3' : '2'}
                />
                <line
                  x1="380"
                  y1="200"
                  x2="620"
                  y2="322"
                  stroke={selectedNode === 'parity' ? '#475569' : '#CBD5E1'}
                  strokeWidth={selectedNode === 'parity' ? '3' : '2'}
                />

                {/* Top-Left Node: Factors */}
                <g
                  onClick={() => setSelectedNode('factors')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode('factors');
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Factors branch"
                >
                  <rect
                    x="24"
                    y="24"
                    width="242"
                    height="96"
                    rx="10"
                    fill={selectedNode === 'factors' ? '#E0F2FE' : '#FFFFFF'}
                    stroke={selectedNode === 'factors' ? '#0284C7' : '#BAE6FD'}
                    strokeWidth="2"
                  />
                  <text x="145" y="54" textAnchor="middle" fontSize="15" fontWeight="700" fill="#0C4A6E">
                    1. Factors
                  </text>
                  <text x="145" y="76" textAnchor="middle" fontSize="12" fill="#334155">
                    Divide completely (rem = 0)
                  </text>
                  <text x="145" y="98" textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
                    1 ≤ factor ≤ n (Finite)
                  </text>
                </g>

                {/* Top-Right Node: Multiples */}
                <g
                  onClick={() => setSelectedNode('multiples')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode('multiples');
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Multiples branch"
                >
                  <rect
                    x="494"
                    y="24"
                    width="242"
                    height="96"
                    rx="10"
                    fill={selectedNode === 'multiples' ? '#D1FAE5' : '#FFFFFF'}
                    stroke={selectedNode === 'multiples' ? '#059669' : '#A7F3D0'}
                    strokeWidth="2"
                  />
                  <text x="615" y="54" textAnchor="middle" fontSize="15" fontWeight="700" fill="#064E3B">
                    2. Multiples
                  </text>
                  <text x="615" y="76" textAnchor="middle" fontSize="12" fill="#334155">
                    Multiply by 1, 2, 3, 4, ...
                  </text>
                  <text x="615" y="98" textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#047857">
                    n ≤ multiple (Unlimited)
                  </text>
                </g>

                {/* Bottom-Left Node: Ending-Digit Clues */}
                <g
                  onClick={() => setSelectedNode('clues')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode('clues');
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Last-Digit Clues branch"
                >
                  <rect
                    x="20"
                    y="274"
                    width="232"
                    height="96"
                    rx="10"
                    fill={selectedNode === 'clues' ? '#E0F2FE' : '#FFFFFF'}
                    stroke={selectedNode === 'clues' ? '#0284C7' : '#CBD5E1'}
                    strokeWidth="2"
                  />
                  <text x="136" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F172A">
                    4. Last-Digit Clues
                  </text>
                  <text x="136" y="326" textAnchor="middle" fontSize="12" fill="#334155">
                    Even → 2  |  Ends in 5 → 5
                  </text>
                  <text x="136" y="348" textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
                    Ends in 0 → 2, 5, 10
                  </text>
                </g>

                {/* Bottom-Center Node: Division Rule */}
                <g
                  onClick={() => setSelectedNode('division')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode('division');
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Division Check branch"
                >
                  <rect
                    x="270"
                    y="286"
                    width="220"
                    height="92"
                    rx="10"
                    fill={selectedNode === 'division' ? '#FEF3C7' : '#FFFFFF'}
                    stroke={selectedNode === 'division' ? '#D97706' : '#FDE68A'}
                    strokeWidth="2"
                  />
                  <text x="380" y="314" textAnchor="middle" fontSize="14" fontWeight="700" fill="#78350F">
                    3. Division Check
                  </text>
                  <text x="380" y="336" textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#92400E">
                    D = Q × d + R
                  </text>
                  <text x="380" y="358" textAnchor="middle" fontSize="12" fill="#451A03">
                    R = 0 proves both!
                  </text>
                </g>

                {/* Bottom-Right Node: Parity */}
                <g
                  onClick={() => setSelectedNode('parity')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode('parity');
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Even and Odd Rules branch"
                >
                  <rect
                    x="508"
                    y="274"
                    width="232"
                    height="96"
                    rx="10"
                    fill={selectedNode === 'parity' ? '#F1F5F9' : '#FFFFFF'}
                    stroke={selectedNode === 'parity' ? '#334155' : '#CBD5E1'}
                    strokeWidth="2"
                  />
                  <text x="624" y="304" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0F172A">
                    5. Even &amp; Odd Rules
                  </text>
                  <text x="624" y="326" textAnchor="middle" fontSize="12" fill="#334155">
                    +, −, × keep clear patterns
                  </text>
                  <text x="624" y="348" textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#475569">
                    Odd × Odd = Odd
                  </text>
                </g>

                {/* Center Hub Node */}
                <g
                  onClick={() => setSelectedNode('center')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode('center');
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Factors and Multiples central concept"
                >
                  <rect
                    x="266"
                    y="148"
                    width="228"
                    height="98"
                    rx="14"
                    fill="#0F172A"
                    stroke={selectedNode === 'center' ? '#0284C7' : '#334155'}
                    strokeWidth="3"
                  />
                  <text x="380" y="182" textAnchor="middle" fontSize="16" fontWeight="700" fill="#FFFFFF">
                    Factors &amp; Multiples
                  </text>
                  <text x="380" y="206" textAnchor="middle" fontSize="12.5" fontFamily="IBM Plex Mono, monospace" fill="#7DD3FC">
                    6 × 3 = 18  ↔  18 ÷ 3 = 6
                  </text>
                  <text x="380" y="228" textAnchor="middle" fontSize="12" fill="#CBD5E1">
                    Tap any box to explore
                  </text>
                </g>
              </svg>

              {/* Mobile Vertical SVG Mind Map (Large readable labels on 320px–640px screens) */}
              <svg
                viewBox="0 0 340 500"
                className="md:hidden w-full h-auto"
                role="img"
                aria-label="Mobile concept map connecting Factors, Multiples, Division Check, Last-Digit Clues, and Even/Odd Rules"
              >
                {/* Vertical Spine */}
                <line x1="34" y1="74" x2="34" y2="452" stroke="#CBD5E1" strokeWidth="2.5" />
                {[124, 206, 288, 370, 452].map((cy) => (
                  <line key={cy} x1="34" y1={cy} x2="64" y2={cy} stroke="#CBD5E1" strokeWidth="2.5" />
                ))}

                {/* Center Top Hub */}
                <g
                  onClick={() => setSelectedNode('center')}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      setSelectedNode('center');
                    }
                  }}
                  className="cursor-pointer"
                  role="button"
                  tabIndex={0}
                  aria-label="Inspect Factors and Multiples central concept"
                >
                  <rect
                    x="14"
                    y="12"
                    width="312"
                    height="64"
                    rx="10"
                    fill="#0F172A"
                    stroke={selectedNode === 'center' ? '#0284C7' : '#334155'}
                    strokeWidth="2.5"
                  />
                  <text x="170" y="38" textAnchor="middle" fontSize="15" fontWeight="700" fill="#FFFFFF">
                    Factors &amp; Multiples (6 × 3 = 18)
                  </text>
                  <text x="170" y="58" textAnchor="middle" fontSize="12" fill="#7DD3FC">
                    Tap any branch below to inspect
                  </text>
                </g>

                {[
                  { id: 'factors' as const, y: 92, title: '1. Factors (Divide with rem = 0)', sub: 'Finite list: 1 ≤ factor ≤ n', fill: '#E0F2FE', stroke: '#0284C7' },
                  { id: 'multiples' as const, y: 174, title: '2. Multiples (Multiply by 1, 2, 3...)', sub: 'Unlimited list: multiple ≥ n', fill: '#D1FAE5', stroke: '#059669' },
                  { id: 'division' as const, y: 256, title: '3. Division Check (D = Q × d + R)', sub: 'Remainder = 0 proves factor & multiple', fill: '#FEF3C7', stroke: '#D97706' },
                  { id: 'clues' as const, y: 338, title: '4. Last-Digit Clues (2, 5, 10)', sub: 'Even → 2 · Ends in 5 → 5 · Ends in 0 → 2, 5, 10', fill: '#E0F2FE', stroke: '#0284C7' },
                  { id: 'parity' as const, y: 420, title: '5. Even & Odd Parity Rules', sub: '+, −, × have patterns; ÷ may not be whole', fill: '#F1F5F9', stroke: '#475569' },
                ].map((item) => {
                  const isSel = selectedNode === item.id;
                  return (
                    <g
                      key={item.id}
                      onClick={() => setSelectedNode(item.id)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedNode(item.id);
                        }
                      }}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect ${item.title}`}
                    >
                      <rect
                        x="64"
                        y={item.y}
                        width="262"
                        height="64"
                        rx="8"
                        fill={isSel ? item.fill : '#FFFFFF'}
                        stroke={isSel ? item.stroke : '#CBD5E1'}
                        strokeWidth={isSel ? '2.5' : '1.5'}
                      />
                      <text x="78" y={item.y + 26} fontSize="13" fontWeight="700" fill="#0F172A">
                        {item.title}
                      </text>
                      <text x="78" y={item.y + 46} fontSize="11.5" fill="#334155">
                        {item.sub}
                      </text>
                    </g>
                  );
                })}
              </svg>
            </div>

            {/* Selected Node Detail Card */}
            <div className="p-5 sm:p-6 lg:col-span-4 flex flex-col justify-between space-y-4">
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-slate-500">Concept Map Branch</p>
                  <h5 className="mt-1 font-display text-lg font-bold text-slate-900">
                    {activeDetail.title}
                  </h5>
                  <p className="text-xs text-slate-600">{activeDetail.subtitle}</p>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {activeDetail.bullets.map((pt) => (
                    <li key={pt}>• {pt}</li>
                  ))}
                </ul>
              </div>

              <div className={`rounded-lg border p-3.5 text-xs ${activeDetail.toneClass}`}>
                <p className="font-semibold mb-1">Example</p>
                <p className="font-math leading-relaxed">{activeDetail.example}</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Step-by-Step Diagrams & 5. Concept Connections */}
      {showSection('diagrams') && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Diagram A: Step-by-Step Rainbow Factor-Pair Diagram for 36 */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Step-by-Step Diagram 1 · Finding All Factors of 36
              </p>
              <h4 className="mt-1 font-display text-lg font-bold text-slate-900">
                Factor-Pair Arc Method (Know When to Stop!)
              </h4>
            </div>

            <svg
              viewBox="0 0 520 215"
              className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
              role="img"
              aria-label="Factor pair arcs for 36 showing 1 times 36, 2 times 18, 3 times 12, 4 times 9, and 6 times 6"
            >
              {/* Arcs connecting factor pairs */}
              <path d="M 38 148 Q 260 12 482 148" fill="none" stroke="#0284C7" strokeWidth="2" />
              <path d="M 92 148 Q 260 44 428 148" fill="none" stroke="#0284C7" strokeWidth="2" />
              <path d="M 146 148 Q 260 76 374 148" fill="none" stroke="#0284C7" strokeWidth="2" />
              <path d="M 200 148 Q 260 108 320 148" fill="none" stroke="#059669" strokeWidth="2.2" />
              {/* Self loop for 6 x 6 */}
              <circle cx="260" cy="144" r="20" fill="none" stroke="#D97706" strokeWidth="2" strokeDasharray="4 3" />

              {/* Labels on arcs */}
              <text x="260" y="34" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
                1 × 36 = 36
              </text>
              <text x="260" y="68" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
                2 × 18 = 36
              </text>
              <text x="260" y="96" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
                3 × 12 = 36
              </text>
              <text x="260" y="122" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#047857">
                4 × 9 = 36
              </text>

              {/* Factor badges along bottom line */}
              {[
                { x: 38, val: '1' },
                { x: 92, val: '2' },
                { x: 146, val: '3' },
                { x: 200, val: '4' },
                { x: 260, val: '6' },
                { x: 320, val: '9' },
                { x: 374, val: '12' },
                { x: 428, val: '18' },
                { x: 482, val: '36' },
              ].map((pt) => (
                <g key={pt.val}>
                  <circle
                    cx={pt.x}
                    cy={158}
                    r="17"
                    fill={pt.val === '6' ? '#FEF3C7' : '#FFFFFF'}
                    stroke={pt.val === '6' ? '#D97706' : '#0284C7'}
                    strokeWidth="2"
                  />
                  <text
                    x={pt.x}
                    y={163}
                    textAnchor="middle"
                    fontSize="14"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#0F172A"
                  >
                    {pt.val}
                  </text>
                </g>
              ))}

              <text x="260" y="200" textAnchor="middle" fontSize="13" fontWeight="600" fill="#B45309">
                Stop at 6 × 6 = 36 (write 6 only once!)
              </text>
            </svg>

            <ol className="space-y-1.5 text-xs leading-relaxed text-slate-700 list-decimal pl-5">
              <li>Start with <strong className="font-math">1 × 36</strong>, then test <strong className="font-math">2, 3, 4</strong> in order.</li>
              <li>Skip <strong className="font-math">5</strong> because <strong className="font-math">36 ÷ 5 = 7 rem 1</strong> (remainder is not 0).</li>
              <li>Stop at <strong className="font-math">6 × 6 = 36</strong> and read all numbers in order: <strong className="font-math text-slate-900">1, 2, 3, 4, 6, 9, 12, 18, 36</strong>.</li>
            </ol>
          </div>

          {/* Diagram B: Concept Connection — Multiplication, Division, Factors & Multiples */}
          <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500">
                Step-by-Step Diagram 2 · Concept Connections
              </p>
              <h4 className="mt-1 font-display text-lg font-bold text-slate-900">
                Factors vs. Multiples Around One Number (42)
              </h4>
            </div>

            <svg
              viewBox="0 0 520 215"
              className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
              role="img"
              aria-label="Concept connection diagram showing factors of 42 on the left and multiples of 42 on the right"
            >
              {/* Left Box: Factors of 42 */}
              <rect x="16" y="20" width="166" height="122" rx="8" fill="#E0F2FE" stroke="#0284C7" strokeWidth="1.5" />
              <text x="99" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill="#0C4A6E">
                FACTORS of 42
              </text>
              <text x="99" y="64" textAnchor="middle" fontSize="12" fill="#0369A1">
                Divide cleanly (rem 0)
              </text>
              <text x="99" y="92" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                1, 2, 3, 6,
              </text>
              <text x="99" y="110" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                7, 14, 21, 42
              </text>
              <text x="99" y="132" textAnchor="middle" fontSize="12" fontWeight="600" fill="#0369A1">
                Always ≤ 42 (Finite)
              </text>

              {/* Center Hub: 42 */}
              <circle cx="260" cy="81" r="34" fill="#0F172A" />
              <text x="260" y="88" textAnchor="middle" fontSize="22" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#FFFFFF">
                42
              </text>

              {/* Arrows */}
              <line x1="184" y1="81" x2="222" y2="81" stroke="#0284C7" strokeWidth="2.5" />
              <line x1="298" y1="81" x2="336" y2="81" stroke="#059669" strokeWidth="2.5" />

              {/* Right Box: Multiples of 42 */}
              <rect x="338" y="20" width="166" height="122" rx="8" fill="#D1FAE5" stroke="#059669" strokeWidth="1.5" />
              <text x="421" y="44" textAnchor="middle" fontSize="14" fontWeight="700" fill="#064E3B">
                MULTIPLES of 42
              </text>
              <text x="421" y="64" textAnchor="middle" fontSize="12" fill="#047857">
                Multiply by 1, 2, 3, ...
              </text>
              <text x="421" y="94" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                42, 84, 126,
              </text>
              <text x="421" y="112" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                168, 210, ...
              </text>
              <text x="421" y="132" textAnchor="middle" fontSize="12" fontWeight="600" fill="#047857">
                Always ≥ 42 (Unlimited)
              </text>

              {/* Bottom Division Bridge */}
              <rect x="16" y="156" width="488" height="44" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
              <text x="260" y="182" textAnchor="middle" fontSize="13" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                42 ÷ 3 = 14 (rem 0) → 3 &amp; 14 are factors; 42 is a multiple
              </text>
            </svg>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="rounded-lg border border-emerald-200 bg-emerald-50/70 p-3">
                <p className="font-semibold text-emerald-900 inline-flex items-center gap-1">
                  <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>When Remainder = 0</span>
                </p>
                <p className="font-math mt-1 text-emerald-950">42 = 14 × 3 + 0 → 3 is a factor of 42.</p>
              </div>
              <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-3">
                <p className="font-semibold text-amber-900 inline-flex items-center gap-1">
                  <XCircle className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                  <span>When Remainder ≠ 0</span>
                </p>
                <p className="font-math mt-1 text-amber-950">42 = 8 × 5 + 2 → 5 is NOT a factor of 42.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. Important Definitions, 3. Key Mathematical Rules & 6. Examples Beside Terms */}
      {showSection('rules') && (
        <div className="space-y-8">
          {/* Key Mathematical Rules */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Core Principles</p>
              <h4 className="mt-1 font-display text-xl font-bold text-slate-900">
                Key Mathematical Rules
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {KEY_MATHEMATICAL_RULES.map((rule) => (
                <div
                  key={rule.ruleTitle}
                  className="rounded-xl border border-slate-200 bg-white p-5 space-y-2"
                >
                  <h5 className="font-display text-base font-semibold text-slate-900">
                    {rule.ruleTitle}
                  </h5>
                  <p className="font-math rounded-lg border border-sky-200 bg-sky-50/70 px-3 py-2 text-xs font-semibold text-sky-950">
                    {rule.formula}
                  </p>
                  <p className="text-xs sm:text-sm leading-relaxed text-slate-700">
                    {rule.ruleText}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Important Definitions & Examples Beside Important Terms */}
          <div className="rounded-xl border border-slate-200 bg-white overflow-hidden">
            <div className="border-b border-slate-200 bg-slate-50 px-5 py-4">
              <p className="text-xs font-medium text-slate-500">
                Important Definitions &amp; Term-by-Term Examples
              </p>
              <h4 className="mt-1 font-display text-lg font-bold text-slate-900">
                Key Terms with Examples Side by Side
              </h4>
            </div>

            <div className="divide-y divide-slate-200">
              {keyTerms.map((item) => (
                <div
                  key={item.term}
                  className="grid grid-cols-1 md:grid-cols-12 gap-3 p-4 sm:px-6 items-center"
                >
                  <div className="md:col-span-3">
                    <span className="font-display text-base font-bold text-sky-900">
                      {item.term}
                    </span>
                  </div>
                  <div className="md:col-span-5 text-xs sm:text-sm leading-relaxed text-slate-700">
                    {item.definition}
                  </div>
                  <div className="md:col-span-4 rounded-lg border border-slate-200 bg-slate-50 px-3.5 py-2 text-xs text-slate-800">
                    <strong className="text-slate-900">Example:</strong>{' '}
                    <span className="font-math">{item.example}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. Concise Revision Notes, 7. Common Mistakes & 9. Quick Revision Summary */}
      {showSection('notes') && (
        <div className="space-y-8">
          {/* 7. Common Mistakes */}
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-slate-500">Watch Out</p>
              <h4 className="mt-1 font-display text-xl font-bold text-slate-900">
                Common Mistakes &amp; How to Avoid Them
              </h4>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {commonErrors.map((err) => (
                <div
                  key={err.mistakeTitle}
                  className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5"
                >
                  <h5 className="font-display text-base font-semibold text-slate-900">
                    {err.mistakeTitle}
                  </h5>
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

          {/* 1. Concise Revision Notes & 9. Quick Revision Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
            <div className="lg:col-span-7 space-y-4">
              <div>
                <p className="text-xs font-medium text-slate-500">Quick Reference</p>
                <h4 className="mt-1 font-display text-xl font-bold text-slate-900">
                  Concise Revision Notes
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {studyNotes.map((block) => (
                  <div
                    key={block.heading}
                    className="rounded-xl border border-slate-200 bg-white p-5 space-y-2.5"
                  >
                    <h5 className="font-display text-base font-semibold text-sky-900">
                      {block.heading}
                    </h5>
                    <ul className="space-y-2 text-xs leading-relaxed text-slate-700">
                      {block.points.map((pt) => (
                        <li key={pt}>• {pt}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col">
              <div>
                <p className="text-xs font-medium text-slate-500">1-Minute Exam Checklist</p>
                <h4 className="mt-1 font-display text-xl font-bold text-slate-900">
                  Quick Revision Summary
                </h4>
              </div>
              <div className="mt-4 flex-1 rounded-xl border border-slate-200 bg-slate-50 p-6 flex flex-col justify-between gap-4">
                <ul className="space-y-3 text-sm leading-relaxed text-slate-800">
                  {summaryPoints.map((pt) => (
                    <li key={pt} className="flex items-start gap-2.5">
                      <span className="font-math text-xs font-bold text-sky-700 mt-1 shrink-0">
                        ✓
                      </span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
                <p className="pt-3 border-t border-slate-200 text-xs text-slate-600">
                  <strong className="text-slate-900">Memory Hook:</strong> Factors fit <em>inside</em> (divide evenly); Multiples grow <em>outward</em> (multiply by 1, 2, 3, ...).
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
