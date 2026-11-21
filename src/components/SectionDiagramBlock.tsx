import { StandardSectionData } from '../types/textbook';

interface SectionDiagramBlockProps {
  info: StandardSectionData['diagramInfo'];
}

export function SectionDiagramBlock({ info }: SectionDiagramBlockProps) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6 space-y-4">
      <div>
        <p className="text-xs font-medium text-slate-500">
          Visual Diagram · Section {info.type.replace('section-', '').replace(/-/g, '.')}
        </p>
        <h4 className="mt-1 font-display text-lg font-bold text-slate-900">
          {info.title}
        </h4>
        <p className="mt-1 text-xs sm:text-sm text-slate-600">{info.caption}</p>
      </div>

      {info.type === 'section-1-2' && (
        <svg
          viewBox="0 0 640 230"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Step-by-step division diagram comparing 625 divided by 25 with remainder 0 and 625 divided by 17 with remainder 13"
        >
          {/* Left Panel: 625 ÷ 25 (Factor) */}
          <rect x="16" y="16" width="292" height="198" rx="10" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.8" />
          <text x="162" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#065F46">
            Test (i): Is 25 a factor of 625?
          </text>
          <text x="162" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            625 ÷ 25 = 25
          </text>
          <rect x="40" y="90" width="244" height="58" rx="8" fill="#ECFDF5" stroke="#6EE7B7" />
          <text x="162" y="114" textAnchor="middle" fontSize="13" fontFamily="IBM Plex Mono, monospace" fill="#064E3B">
            25 × 25 = 625
          </text>
          <text x="162" y="136" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#047857">
            625 − 625 = 0 (Remainder = 0)
          </text>
          <text x="162" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065F46">
            ✓ YES — 25 IS a factor of 625
          </text>
          <text x="162" y="196" textAnchor="middle" fontSize="11.5" fill="#047857">
            Divides completely with zero remainder
          </text>

          {/* Right Panel: 625 ÷ 17 (Not a Factor) */}
          <rect x="332" y="16" width="292" height="198" rx="10" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1.8" />
          <text x="478" y="42" textAnchor="middle" fontSize="14" fontWeight="700" fill="#92400E">
            Test (ii): Is 17 a factor of 625?
          </text>
          <text x="478" y="72" textAnchor="middle" fontSize="16" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            625 ÷ 17 = 36 (rem 13)
          </text>
          <rect x="356" y="90" width="244" height="58" rx="8" fill="#FFFBEB" stroke="#FCD34D" />
          <text x="478" y="114" textAnchor="middle" fontSize="13" fontFamily="IBM Plex Mono, monospace" fill="#78350F">
            17 × 36 = 612
          </text>
          <text x="478" y="136" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#B45309">
            625 − 612 = 13 (Remainder ≠ 0)
          </text>
          <text x="478" y="176" textAnchor="middle" fontSize="13" fontWeight="700" fill="#92400E">
            ✕ NO — 17 is NOT a factor of 625
          </text>
          <text x="478" y="196" textAnchor="middle" fontSize="11.5" fill="#B45309">
            Leaves 13 left over after 36 equal groups
          </text>
        </svg>
      )}

      {info.type === 'section-1-3' && (
        <svg
          viewBox="0 0 640 245"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Multiples of 13 number line showing 13, 26, 39, 52, 65, 78, 91 and testing 45 versus 65"
        >
          <text x="20" y="26" fontSize="13" fontWeight="700" fill="#0F172A">
            Multiples of 13 (13 × 1, 13 × 2, 13 × 3, ...):
          </text>
          <line x1="36" y1="68" x2="604" y2="68" stroke="#94A3B8" strokeWidth="2" />
          {[13, 26, 39, 52, 65, 78, 91].map((val, idx) => {
            const cx = 56 + idx * 86;
            const isHighlight = val === 39 || val === 65;
            return (
              <g key={val}>
                <circle
                  cx={cx}
                  cy={68}
                  r={18}
                  fill={isHighlight ? '#0284C7' : '#FFFFFF'}
                  stroke={isHighlight ? '#0369A1' : '#64748B'}
                  strokeWidth="2"
                />
                <text
                  x={cx}
                  y={73}
                  textAnchor="middle"
                  fontSize="12.5"
                  fontWeight="700"
                  fontFamily="IBM Plex Mono, monospace"
                  fill={isHighlight ? '#FFFFFF' : '#0F172A'}
                >
                  {val}
                </text>
                <text x={cx} y={102} textAnchor="middle" fontSize="10.5" fill="#475569">
                  ×{idx + 1}
                </text>
              </g>
            );
          })}

          {/* 45 vs 65 comparison boxes */}
          <rect x="20" y="122" width="290" height="104" rx="10" fill="#FFFFFF" stroke="#FDE68A" strokeWidth="1.8" />
          <text x="165" y="146" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#92400E">
            Example 7(ii): Is 45 a multiple of 13?
          </text>
          <text x="165" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            45 ÷ 13 = 3 (rem 6)
          </text>
          <text x="165" y="196" textAnchor="middle" fontSize="12" fill="#B45309">
            45 falls between 39 and 52 (not on a dot)
          </text>
          <text x="165" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="#92400E">
            ✕ NOT a multiple of 13
          </text>

          <rect x="330" y="122" width="290" height="104" rx="10" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.8" />
          <text x="475" y="146" textAnchor="middle" fontSize="13.5" fontWeight="700" fill="#065F46">
            Example 7(iii): Is 65 a multiple of 13?
          </text>
          <text x="475" y="172" textAnchor="middle" fontSize="14" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            65 ÷ 13 = 5 (rem 0)
          </text>
          <text x="475" y="196" textAnchor="middle" fontSize="12" fill="#047857">
            13 × 5 = 65 (lands exactly on 65!)
          </text>
          <text x="475" y="214" textAnchor="middle" fontSize="12" fontWeight="700" fill="#065F46">
            ✓ YES — 65 IS a multiple of 13
          </text>
        </svg>
      )}

      {info.type === 'section-1-4' && (
        <svg
          viewBox="0 0 640 260"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Classification of natural numbers into prime, composite, and 1 as neither, plus rectangular arrays for 7 and 12"
        >
          {/* Top Classification Flowchart */}
          <rect x="200" y="14" width="240" height="36" rx="8" fill="#0F172A" />
          <text x="320" y="37" textAnchor="middle" fontSize="13" fontWeight="700" fill="#FFFFFF">
            Natural Numbers (N = 1, 2, 3, ...)
          </text>

          <line x1="250" y1="50" x2="115" y2="80" stroke="#64748B" strokeWidth="1.8" />
          <line x1="320" y1="50" x2="320" y2="80" stroke="#64748B" strokeWidth="1.8" />
          <line x1="390" y1="50" x2="525" y2="80" stroke="#64748B" strokeWidth="1.8" />

          <rect x="22" y="80" width="186" height="62" rx="8" fill="#ECFEFF" stroke="#0284C7" strokeWidth="1.5" />
          <text x="115" y="102" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0369A1">
            Prime Numbers (P)
          </text>
          <text x="115" y="120" textAnchor="middle" fontSize="11" fill="#0F172A">
            Only 2 factors: 1 &amp; itself
          </text>
          <text x="115" y="135" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            2, 3, 5, 7, 11, 13...
          </text>

          <rect x="227" y="80" width="186" height="62" rx="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
          <text x="320" y="102" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#92400E">
            Number 1
          </text>
          <text x="320" y="120" textAnchor="middle" fontSize="11" fill="#0F172A">
            Only 1 factor (itself)
          </text>
          <text x="320" y="135" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E">
            Neither Prime Nor Composite
          </text>

          <rect x="432" y="80" width="186" height="62" rx="8" fill="#ECFDF5" stroke="#059669" strokeWidth="1.5" />
          <text x="525" y="102" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#065F46">
            Composite Numbers (C)
          </text>
          <text x="525" y="120" textAnchor="middle" fontSize="11" fill="#0F172A">
            More than 2 factors
          </text>
          <text x="525" y="135" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            4, 6, 8, 9, 10, 12...
          </text>

          {/* Bottom Array Proof: 7 vs 12 */}
          <rect x="22" y="158" width="286" height="88" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="36" y="178" fontSize="12" fontWeight="700" fill="#0369A1">
            7 is Prime (only 1 × 7 rectangle possible)
          </text>
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <circle key={i} cx={48 + i * 24} cy={208} r="8" fill="#0284C7" />
          ))}
          <text x="36" y="236" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#475569">
            Factors of 7: 1, 7 (2 factors)
          </text>

          <rect x="332" y="158" width="286" height="88" rx="8" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="346" y="178" fontSize="12" fontWeight="700" fill="#065F46">
            12 is Composite (forms 3 × 4 and 2 × 6 arrays!)
          </text>
          {[0, 1, 2].map((r) =>
            [0, 1, 2, 3].map((c) => (
              <circle key={`${r}-${c}`} cx={358 + c * 20} cy={194 + r * 16} r="5.5" fill="#059669" />
            ))
          )}
          <text x="454" y="206" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            3 × 4 = 12
          </text>
          <text x="454" y="222" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            2 × 6 = 12
          </text>
          <text x="346" y="239" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#475569">
            Factors of 12: 1, 2, 3, 4, 6, 12 (6 factors)
          </text>
        </svg>
      )}

      {info.type === 'section-1-5' && (
        <svg
          viewBox="0 0 640 265"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Prime factorization of 36 using Division Method and Factor Tree Method, plus Base and Index notation anatomy for 2 to the power 5"
        >
          {/* Left: Division Method */}
          <rect x="14" y="14" width="194" height="236" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="111" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0F172A">
            1. Division Method (36)
          </text>
          {[
            { div: '2', num: '36', y: 66 },
            { div: '2', num: '18', y: 98 },
            { div: '3', num: '9', y: 130 },
            { div: '3', num: '3', y: 162 },
            { div: '', num: '1', y: 194 },
          ].map((row, idx) => (
            <g key={idx}>
              <line x1="82" y1={row.y - 18} x2="82" y2={row.y + 8} stroke="#64748B" strokeWidth="1.5" />
              <line x1="54" y1={row.y + 8} x2="162" y2={row.y + 8} stroke="#CBD5E1" strokeWidth="1" />
              <text x="66" y={row.y} textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0284C7">
                {row.div}
              </text>
              <text x="116" y={row.y} textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                {row.num}
              </text>
            </g>
          ))}
          <text x="111" y="232" textAnchor="middle" fontSize="11.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            36 = 2 × 2 × 3 × 3
          </text>

          {/* Middle: Factor Tree Method */}
          <rect x="222" y="14" width="212" height="236" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="328" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0F172A">
            2. Factor Tree (36)
          </text>
          <rect x="308" y="48" width="40" height="26" rx="5" fill="#E0F2FE" stroke="#0284C7" />
          <text x="328" y="66" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            36
          </text>
          <line x1="318" y1="74" x2="274" y2="102" stroke="#64748B" strokeWidth="1.5" />
          <line x1="338" y1="74" x2="376" y2="102" stroke="#64748B" strokeWidth="1.5" />

          <circle cx="270" cy="116" r="14" fill="#ECFDF5" stroke="#059669" strokeWidth="1.6" />
          <text x="270" y="121" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            2
          </text>
          <rect x="356" y="102" width="40" height="26" rx="5" fill="#E0F2FE" stroke="#0284C7" />
          <text x="376" y="120" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            18
          </text>
          <line x1="366" y1="128" x2="328" y2="156" stroke="#64748B" strokeWidth="1.5" />
          <line x1="386" y1="128" x2="404" y2="156" stroke="#64748B" strokeWidth="1.5" />

          <circle cx="326" cy="170" r="14" fill="#ECFDF5" stroke="#059669" strokeWidth="1.6" />
          <text x="326" y="175" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            2
          </text>
          <rect x="386" y="156" width="36" height="26" rx="5" fill="#E0F2FE" stroke="#0284C7" />
          <text x="404" y="174" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            9
          </text>
          <line x1="396" y1="182" x2="370" y2="204" stroke="#64748B" strokeWidth="1.5" />
          <line x1="410" y1="182" x2="416" y2="204" stroke="#64748B" strokeWidth="1.5" />

          <circle cx="366" cy="216" r="13" fill="#ECFDF5" stroke="#059669" strokeWidth="1.6" />
          <text x="366" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            3
          </text>
          <circle cx="416" cy="216" r="13" fill="#ECFDF5" stroke="#059669" strokeWidth="1.6" />
          <text x="416" y="220" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            3
          </text>
          <text x="285" y="242" textAnchor="middle" fontSize="10.5" fill="#065F46">
            Circles = prime leaves
          </text>

          {/* Right: Index Notation Anatomy */}
          <rect x="448" y="14" width="178" height="236" rx="10" fill="#FFFBEB" stroke="#FCD34D" strokeWidth="1.5" />
          <text x="537" y="38" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#92400E">
            3. Index Notation
          </text>
          <text x="524" y="114" textAnchor="middle" fontSize="48" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            2
          </text>
          <text x="556" y="84" textAnchor="middle" fontSize="24" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0284C7">
            5
          </text>
          <text x="572" y="64" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1">
            Index / Power
          </text>
          <text x="492" y="138" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0F172A">
            Base (factor)
          </text>
          <text x="537" y="172" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#78350F">
            2⁵ = 2×2×2×2×2
          </text>
          <text x="537" y="196" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            36 = 2² × 3²
          </text>
          <text x="537" y="224" textAnchor="middle" fontSize="10.5" fill="#78350F">
            Expanded → Exponential
          </text>
        </svg>
      )}

      {info.type === 'section-1-6-1' && (
        <svg
          viewBox="0 0 640 250"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Alisha's 70 cm by 50 cm blue paper tiled into 10 cm by 10 cm squares, alongside Long Division H.C.F of 108 and 144 equal to 36"
        >
          {/* Left: Alisha's 70 x 50 paper */}
          <rect x="16" y="14" width="308" height="222" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="170" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0F172A">
            Example 13: 70 cm × 50 cm Paper Tiling
          </text>
          <text x="170" y="54" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            Common factors of 70 &amp; 50: 1, 2, 5, 10 → H.C.F = 10 cm
          </text>
          <g transform="translate(55, 68)">
            {Array.from({ length: 5 }).map((_, r) =>
              Array.from({ length: 7 }).map((__, c) => (
                <rect
                  key={`${r}-${c}`}
                  x={c * 32}
                  y={r * 26}
                  width="32"
                  height="26"
                  fill="#E0F2FE"
                  stroke="#0284C7"
                  strokeWidth="1.3"
                />
              ))
            )}
            <text x="112" y="148" textAnchor="middle" fontSize="11" fontWeight="700" fill="#0369A1">
              7 × 5 = 35 equal squares (10 cm × 10 cm each)
            </text>
          </g>

          {/* Right: Long Division 108 & 144 */}
          <rect x="338" y="14" width="286" height="222" rx="10" fill="#FFFFFF" stroke="#A7F3D0" strokeWidth="1.6" />
          <text x="481" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#065F46">
            Example 16: Long Division (108 m &amp; 144 m)
          </text>
          <rect x="358" y="52" width="246" height="58" rx="8" fill="#F8FAFC" stroke="#CBD5E1" />
          <text x="481" y="74" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            Step 1: 144 ÷ 108 = 1 (rem 36)
          </text>
          <text x="481" y="96" textAnchor="middle" fontSize="11" fill="#475569">
            144 − 108 = 36 (becomes next divisor)
          </text>

          <rect x="358" y="122" width="246" height="58" rx="8" fill="#ECFDF5" stroke="#6EE7B7" />
          <text x="481" y="144" textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            Step 2: 108 ÷ 36 = 3 (rem 0)
          </text>
          <text x="481" y="166" textAnchor="middle" fontSize="11" fill="#047857">
            Remainder = 0! Last divisor is 36
          </text>

          <text x="481" y="212" textAnchor="middle" fontSize="13" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            H.C.F(108, 144) = 36 m
          </text>
        </svg>
      )}

      {info.type === 'section-1-6-2' && (
        <svg
          viewBox="0 0 640 260"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Nuzat's 15 cm by 10 cm rectangles forming a 30 cm by 30 cm square, alongside Joint Division L.C.M ladder for 16, 24, 36 equal to 144"
        >
          {/* Left: Nuzat's 15x10 -> 30x30 square */}
          <rect x="16" y="14" width="290" height="232" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="161" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0F172A">
            Example 18: 15×10 Cards → 30×30 Square
          </text>
          <text x="161" y="54" textAnchor="middle" fontSize="11" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            Common multiples of 10 &amp; 15: 30, 60... → L.C.M = 30 cm
          </text>
          <g transform="translate(86, 68)">
            {[0, 1, 2].map((r) =>
              [0, 1].map((c) => (
                <g key={`${r}-${c}`}>
                  <rect
                    x={c * 75}
                    y={r * 45}
                    width="75"
                    height="45"
                    fill="#ECFDF5"
                    stroke="#059669"
                    strokeWidth="1.6"
                  />
                  <text
                    x={c * 75 + 37.5}
                    y={r * 45 + 27}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#065F46"
                  >
                    15 × 10
                  </text>
                </g>
              ))
            )}
            <text x="75" y="156" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065F46">
              Width: 2×15 = 30 cm | Height: 3×10 = 30 cm
            </text>
          </g>

          {/* Right: Joint Division 16, 24, 36 */}
          <rect x="322" y="14" width="302" height="232" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="473" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0F172A">
            Example 20: Joint Division (16, 24, 36)
          </text>
          {[
            { d: '2', vals: '16 ,  24 ,  36', y: 62 },
            { d: '2', vals: ' 8 ,  12 ,  18', y: 86 },
            { d: '2', vals: ' 4 ,   6 ,   9', y: 110 },
            { d: '2', vals: ' 2 ,   3 ,   9', y: 134 },
            { d: '3', vals: ' 1 ,   3 ,   9', y: 158 },
            { d: '3', vals: ' 1 ,   1 ,   3', y: 182 },
            { d: '', vals: ' 1 ,   1 ,   1', y: 206 },
          ].map((row, idx) => (
            <g key={idx}>
              <line x1="394" y1={row.y - 15} x2="394" y2={row.y + 6} stroke="#64748B" strokeWidth="1.5" />
              <line x1="352" y1={row.y + 6} x2="584" y2={row.y + 6} stroke="#E2E8F0" strokeWidth="1" />
              <text x="372" y={row.y} textAnchor="middle" fontSize="12" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0284C7">
                {row.d}
              </text>
              <text x="490" y={row.y} textAnchor="middle" fontSize="12" fontWeight="600" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
                {row.vals}
              </text>
            </g>
          ))}
          <text x="473" y="234" textAnchor="middle" fontSize="11.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            L.C.M = 2×2×2×2×3×3 = 144
          </text>
        </svg>
      )}

      {info.type === 'section-1-7' && (
        <svg
          viewBox="0 0 640 245"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Balance scale proof showing H.C.F times L.C.M equals First Number times Second Number for Example 21 (12 and 21) and Example 22 (32 and 48)"
        >
          {/* Top Formula Banner */}
          <rect x="60" y="14" width="520" height="36" rx="8" fill="#0F172A" />
          <text x="320" y="37" textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#FFFFFF">
            H.C.F × L.C.M  =  First Number × Second Number
          </text>

          {/* Left: Example 21 (12 & 21) */}
          <rect x="20" y="66" width="290" height="162" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.6" />
          <text x="165" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="#0369A1">
            Example 21: Numbers 12 and 21
          </text>
          <text x="165" y="114" textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#334155">
            H.C.F = 3   |   L.C.M = 84
          </text>
          <rect x="38" y="130" width="254" height="34" rx="6" fill="#E0F2FE" />
          <text x="165" y="152" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            H.C.F × L.C.M = 3 × 84 = 252
          </text>
          <rect x="38" y="172" width="254" height="34" rx="6" fill="#ECFDF5" />
          <text x="165" y="194" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            12 × 21 = 252  (Equal!)
          </text>

          {/* Right: Example 22 (32 & 48) */}
          <rect x="330" y="66" width="290" height="162" rx="10" fill="#FFFFFF" stroke="#059669" strokeWidth="1.6" />
          <text x="475" y="90" textAnchor="middle" fontSize="13" fontWeight="700" fill="#065F46">
            Example 22: Numbers 32 and 48
          </text>
          <text x="475" y="114" textAnchor="middle" fontSize="12" fontFamily="IBM Plex Mono, monospace" fill="#334155">
            H.C.F = 16   |   L.C.M = 96
          </text>
          <rect x="348" y="130" width="254" height="34" rx="6" fill="#E0F2FE" />
          <text x="475" y="152" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0369A1">
            H.C.F × L.C.M = 16 × 96 = 1,536
          </text>
          <rect x="348" y="172" width="254" height="34" rx="6" fill="#ECFDF5" />
          <text x="475" y="194" textAnchor="middle" fontSize="12.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#065F46">
            32 × 48 = 1,536  (Equal!)
          </text>
        </svg>
      )}

      {info.type === 'section-1-8' && (
        <svg
          viewBox="0 0 640 250"
          className="w-full h-auto rounded-lg border border-slate-200 bg-slate-50/70"
          role="img"
          aria-label="Full square arrays 2x2=4 and 3x3=9 compared with hollow 12-apple frame, plus (-3) squared equals 9 and 7 squared equals 49"
        >
          {/* Left: Full Square vs Hollow 12 */}
          <rect x="16" y="14" width="326" height="222" rx="10" fill="#FFFFFF" stroke="#CBD5E1" />
          <text x="179" y="36" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0F172A">
            Full Square Array vs. Hollow Frame (p. 16)
          </text>

          {/* 3x3 = 9 Full */}
          <text x="84" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="#065F46">
            3 × 3 = 9 (Square!)
          </text>
          {[0, 1, 2].map((r) =>
            [0, 1, 2].map((c) => (
              <circle key={`sq3-${r}-${c}`} cx={56 + c * 28} cy={82 + r * 28} r="9" fill="#059669" />
            ))
          )}

          {/* 4x4 hollow 12 */}
          <text x="248" y="60" textAnchor="middle" fontSize="11" fontWeight="700" fill="#92400E">
            12 Dots (Hollow — Not Square!)
          </text>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3].map((c) => {
              const isEdge = r === 0 || r === 3 || c === 0 || c === 3;
              return isEdge ? (
                <circle key={`hol-${r}-${c}`} cx={206 + c * 28} cy={80 + r * 28} r="8.5" fill="#D97706" />
              ) : (
                <circle
                  key={`hol-${r}-${c}`}
                  cx={206 + c * 28}
                  cy={80 + r * 28}
                  r="8"
                  fill="none"
                  stroke="#CBD5E1"
                  strokeDasharray="3 2"
                  strokeWidth="1.5"
                />
              );
            })
          )}
          <text x="179" y="218" textAnchor="middle" fontSize="11" fill="#475569">
            A square array MUST be completely filled inside!
          </text>

          {/* Right: Integer Squaring Example 23 */}
          <rect x="356" y="14" width="268" height="222" rx="10" fill="#FFFFFF" stroke="#0284C7" strokeWidth="1.5" />
          <text x="490" y="38" textAnchor="middle" fontSize="12.5" fontWeight="700" fill="#0369A1">
            Example 23: Squaring Any Integer
          </text>
          <rect x="374" y="56" width="232" height="68" rx="8" fill="#E0F2FE" />
          <text x="490" y="82" textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            (-3)² = (-3) × (-3) = +9
          </text>
          <text x="490" y="108" textAnchor="middle" fontSize="11" fill="#0369A1">
            Negative × Negative = Positive!
          </text>

          <rect x="374" y="138" width="232" height="68" rx="8" fill="#ECFDF5" />
          <text x="490" y="164" textAnchor="middle" fontSize="13.5" fontWeight="700" fontFamily="IBM Plex Mono, monospace" fill="#0F172A">
            7² = 7 × 7 = 49
          </text>
          <text x="490" y="190" textAnchor="middle" fontSize="11" fill="#065F46">
            Multiply a number by itself
          </text>
        </svg>
      )}
    </div>
  );
}
