import { useState } from 'react';
import {
  Check,
  HelpCircle,
  RefreshCw,
} from 'lucide-react';
import {
  PracticalActivityCategory,
  PracticalActivityIllustrationType,
  PracticalActivityItem,
} from '../types/textbook';

interface PracticalActivitiesLabProps {
  activities: PracticalActivityItem[];
}

const FILTER_OPTIONS: { id: 'all' | PracticalActivityCategory; label: string }[] = [
  { id: 'all', label: 'All (6)' },
  { id: 'group', label: 'Group' },
  { id: 'individual', label: 'Individual' },
  { id: 'pair', label: 'Pair-Work' },
  { id: 'home', label: 'Home' },
  { id: 'real-life', label: 'Real-Life' },
  { id: 'creative', label: 'Creative' },
];

function MatchstickInteractiveIllustration() {
  const [mode, setMode] = useState<'multiples' | 'bundles'>('multiples');
  const [groupCount, setGroupCount] = useState<number>(4);
  const [bundleSize, setBundleSize] = useState<number>(4);

  const totalSticks = 24;
  const fullBundles = Math.floor(totalSticks / bundleSize);
  const leftover = totalSticks % bundleSize;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-900">
          Interactive Matchstick Tray
        </span>
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setMode('multiples')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              mode === 'multiples' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Multiples of 3
          </button>
          <button
            type="button"
            onClick={() => setMode('bundles')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              mode === 'bundles' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Bundle 24 Sticks
          </button>
        </div>
      </div>

      {mode === 'multiples' ? (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-600">
            <span>
              Groups of 3: <strong className="font-math text-slate-900">{groupCount}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={groupCount <= 1}
                onClick={() => setGroupCount((g) => Math.max(1, g - 1))}
                className="rounded border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700 disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
              >
                −1 Group
              </button>
              <button
                type="button"
                disabled={groupCount >= 6}
                onClick={() => setGroupCount((g) => Math.min(6, g + 1))}
                className="rounded bg-sky-700 px-2.5 py-1 text-xs font-semibold text-white disabled:opacity-40 cursor-pointer whitespace-nowrap shrink-0"
              >
                +1 Group
              </button>
            </div>
          </div>

          <svg
            viewBox="0 0 380 120"
            className="w-full h-auto rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={`${groupCount} groups of 3 matchsticks totaling ${groupCount * 3}`}
          >
            {Array.from({ length: groupCount }).map((_, gIdx) => {
              const gx = 16 + gIdx * 60;
              return (
                <g key={gIdx}>
                  <rect
                    x={gx}
                    y={14}
                    width={48}
                    height={74}
                    rx="6"
                    fill="#F8FAFC"
                    stroke="#E2E8F0"
                  />
                  {[0, 1, 2].map((sIdx) => {
                    const sx = gx + 12 + sIdx * 11;
                    return (
                      <g key={sIdx}>
                        <rect x={sx} y={28} width="4" height="42" rx="1" fill="#FCD34D" stroke="#D97706" strokeWidth="0.6" />
                        <circle cx={sx + 2} cy={26} r="3.4" fill="#DC2626" />
                      </g>
                    );
                  })}
                  <text
                    x={gx + 24}
                    y={104}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#0369A1"
                  >
                    {(gIdx + 1) * 3}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="font-math text-xs font-semibold text-slate-800">
            {groupCount} × 3 = {groupCount * 3} matchsticks (Multiples: 3, 6, 9, 12, 15, 18)
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-600 mr-1">Tie into bundles of:</span>
            {[2, 3, 4, 5, 6, 8].map((size) => (
              <button
                key={size}
                type="button"
                onClick={() => setBundleSize(size)}
                className={`font-math rounded px-2.5 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                  bundleSize === size
                    ? 'bg-sky-700 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          <svg
            viewBox="0 0 380 132"
            className="w-full h-auto rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={`24 matchsticks grouped into bundles of ${bundleSize}`}
          >
            {Array.from({ length: fullBundles }).map((_, bIdx) => {
              const col = bIdx % 6;
              const row = Math.floor(bIdx / 6);
              const bx = 14 + col * 60;
              const by = 12 + row * 58;
              return (
                <g key={bIdx}>
                  <rect
                    x={bx}
                    y={by}
                    width={52}
                    height={48}
                    rx="5"
                    fill={leftover === 0 ? '#ECFDF5' : '#F8FAFC'}
                    stroke={leftover === 0 ? '#6EE7B7' : '#CBD5E1'}
                  />
                  {Array.from({ length: bundleSize }).map((__, sIdx) => {
                    const sx = bx + 6 + sIdx * Math.min(6, 40 / bundleSize);
                    return (
                      <g key={sIdx}>
                        <line x1={sx} y1={by + 14} x2={sx} y2={by + 40} stroke="#D97706" strokeWidth="2.2" />
                        <circle cx={sx} cy={by + 12} r="2" fill="#DC2626" />
                      </g>
                    );
                  })}
                  <line x1={bx + 4} y1={by + 28} x2={bx + 48} y2={by + 28} stroke="#0369A1" strokeWidth="1.5" />
                </g>
              );
            })}

            {leftover > 0 && (
              <g>
                <rect x={14} y={76} width={156} height={46} rx="5" fill="#FFFBEB" stroke="#F59E0B" strokeDasharray="3 3" />
                {Array.from({ length: leftover }).map((_, lIdx) => {
                  const sx = 28 + lIdx * 16;
                  return (
                    <g key={lIdx}>
                      <line x1={sx} y1={90} x2={sx} y2={114} stroke="#D97706" strokeWidth="2.5" />
                      <circle cx={sx} cy={88} r="2.5" fill="#DC2626" />
                    </g>
                  );
                })}
                <text
                  x={98}
                  y={104}
                  fontSize="10"
                  fontWeight="600"
                  fontFamily="IBM Plex Mono, monospace"
                  fill="#B45309"
                >
                  Leftover: {leftover}
                </text>
              </g>
            )}
          </svg>

          <p className="font-math text-xs font-semibold flex items-center gap-1.5">
            {leftover === 0 ? (
              <span className="text-emerald-800 inline-flex items-center gap-1">
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                24 ÷ {bundleSize} = {fullBundles} exact bundles (rem 0 → {bundleSize} is a factor)
              </span>
            ) : (
              <span className="text-amber-800">
                24 = {fullBundles} × {bundleSize} + {leftover} leftover (rem {leftover} → {bundleSize} is not a factor)
              </span>
            )}
          </p>
        </div>
      )}
    </div>
  );
}

function PaperStripInteractiveIllustration() {
  const [stripLen, setStripLen] = useState<12 | 18 | 24>(24);
  const [stepCm, setStepCm] = useState<number>(6);

  const folds = Math.floor(stripLen / stepCm);
  const leftoverCm = stripLen % stepCm;
  const svgW = 380;
  const barW = 340;
  const startX = 20;
  const pxPerCm = barW / stripLen;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-900">
          Interactive Paper Strip Folder
        </span>
        <div className="flex items-center gap-1">
          {([12, 18, 24] as const).map((len) => (
            <button
              key={len}
              type="button"
              onClick={() => setStripLen(len)}
              className={`font-math rounded px-2 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                stripLen === len
                  ? 'bg-sky-700 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {len} cm
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-600 mr-1">Fold length:</span>
        {[2, 3, 4, 5, 6, 8].map((cm) => (
          <button
            key={cm}
            type="button"
            onClick={() => setStepCm(cm)}
            className={`font-math rounded px-2 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              stepCm === cm
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cm} cm
          </button>
        ))}
      </div>

      <svg
        viewBox={`0 0 ${svgW} 118`}
        className="w-full h-auto rounded-lg border border-slate-200 bg-white"
        role="img"
        aria-label={`${stripLen} cm paper strip folded in ${stepCm} cm sections`}
      >
        {/* Paper background */}
        <rect x={startX} y={32} width={barW} height={44} rx="4" fill="#FEFCE8" stroke="#CBD5E1" strokeWidth="1.5" />

        {/* Exact folds */}
        {Array.from({ length: folds }).map((_, idx) => {
          const x = startX + idx * stepCm * pxPerCm;
          const w = stepCm * pxPerCm;
          return (
            <g key={idx}>
              <rect
                x={x}
                y={32}
                width={w}
                height={44}
                fill={leftoverCm === 0 ? '#E0F2FE' : '#F1F5F9'}
                stroke="#0284C7"
                strokeWidth="1"
              />
              {idx > 0 && (
                <line x1={x} y1={24} x2={x} y2={84} stroke="#0369A1" strokeWidth="1.5" strokeDasharray="3 3" />
              )}
              <text
                x={x + w / 2}
                y={58}
                textAnchor="middle"
                fontSize="10"
                fontWeight="600"
                fontFamily="IBM Plex Mono, monospace"
                fill="#0C4A6E"
              >
                {stepCm}
              </text>
            </g>
          );
        })}

        {/* Leftover margin */}
        {leftoverCm > 0 && (
          <g>
            <rect
              x={startX + folds * stepCm * pxPerCm}
              y={32}
              width={leftoverCm * pxPerCm}
              height={44}
              fill="#FDE68A"
              stroke="#D97706"
              strokeWidth="1.2"
            />
            <text
              x={startX + folds * stepCm * pxPerCm + (leftoverCm * pxPerCm) / 2}
              y={58}
              textAnchor="middle"
              fontSize="9.5"
              fontWeight="700"
              fontFamily="IBM Plex Mono, monospace"
              fill="#92400E"
            >
              +{leftoverCm}
            </text>
          </g>
        )}

        {/* Ruler marks */}
        <text x={startX} y={100} fontSize="10" fontFamily="IBM Plex Mono, monospace" fill="#64748B">
          0 cm
        </text>
        <text
          x={startX + barW}
          y={100}
          textAnchor="end"
          fontSize="10"
          fontFamily="IBM Plex Mono, monospace"
          fill="#64748B"
        >
          {stripLen} cm
        </text>
      </svg>

      <p className="font-math text-xs font-semibold">
        {leftoverCm === 0 ? (
          <span className="text-emerald-800 inline-flex items-center gap-1">
            <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
            {folds} exact folds of {stepCm} cm = {stripLen} cm (0 cm left over)
          </span>
        ) : (
          <span className="text-amber-800">
            {folds} folds reach {folds * stepCm} cm, leaving a {leftoverCm} cm stub!
          </span>
        )}
      </p>
    </div>
  );
}

const CARD_PAIRS: [number, number][] = [
  [18, 6],
  [15, 9],
  [12, 4],
  [14, 5],
  [20, 4],
  [11, 7],
];

function NumberCardsInteractiveIllustration() {
  const [pairIdx, setPairIdx] = useState<number>(0);
  const [cardA, cardB] = CARD_PAIRS[pairIdx];

  const larger = Math.max(cardA, cardB);
  const smaller = Math.min(cardA, cardB);
  const isFactor = larger % smaller === 0;
  const parityOf = (n: number) => (n % 2 === 0 ? 'Even' : 'Odd');

  const divWhole = larger % smaller === 0;
  const divLabel = divWhole
    ? `${larger} ÷ ${smaller} = ${larger / smaller} (${parityOf(larger / smaller)})`
    : `${larger} ÷ ${smaller} = ${(larger / smaller).toFixed(2)} (not whole)`;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-900">
          Interactive Number Card Duel
        </span>
        <button
          type="button"
          onClick={() => setPairIdx((idx) => (idx + 1) % CARD_PAIRS.length)}
          className="inline-flex items-center gap-1.5 rounded-md bg-sky-700 px-3 py-1.5 text-xs font-semibold text-white hover:bg-sky-800 cursor-pointer whitespace-nowrap shrink-0 transition-colors"
        >
          <RefreshCw className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Draw Card Pair</span>
        </button>
      </div>

      {/* SVG Card Pair */}
      <svg
        viewBox="0 0 360 120"
        className="w-full h-auto rounded-lg border border-slate-200 bg-white"
        role="img"
        aria-label={`Number cards ${cardA} and ${cardB}`}
      >
        {/* Card A */}
        <rect x="44" y="14" width="94" height="92" rx="8" fill="#F0F9FF" stroke="#0284C7" strokeWidth="1.5" />
        <text x="56" y="32" fontSize="10" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif" fill="#0369A1">
          Card A
        </text>
        <text
          x="91"
          y="70"
          textAnchor="middle"
          fontSize="30"
          fontWeight="700"
          fontFamily="IBM Plex Mono, monospace"
          fill="#0F172A"
        >
          {cardA}
        </text>
        <text x="91" y="94" textAnchor="middle" fontSize="10" fontWeight="600" fill="#0369A1">
          {parityOf(cardA)}
        </text>

        {/* VS */}
        <text x="180" y="65" textAnchor="middle" fontSize="12" fontWeight="700" fill="#64748B">
          &amp;
        </text>

        {/* Card B */}
        <rect x="222" y="14" width="94" height="92" rx="8" fill="#FFFBEB" stroke="#D97706" strokeWidth="1.5" />
        <text x="234" y="32" fontSize="10" fontWeight="600" fontFamily="Plus Jakarta Sans, sans-serif" fill="#B45309">
          Card B
        </text>
        <text
          x="269"
          y="70"
          textAnchor="middle"
          fontSize="30"
          fontWeight="700"
          fontFamily="IBM Plex Mono, monospace"
          fill="#0F172A"
        >
          {cardB}
        </text>
        <text x="269" y="94" textAnchor="middle" fontSize="10" fontWeight="600" fill="#B45309">
          {parityOf(cardB)}
        </text>
      </svg>

      {/* Results readout */}
      <div className="space-y-1.5 text-xs">
        <p className="font-math font-semibold">
          {isFactor ? (
            <span className="text-emerald-800 inline-flex items-center gap-1">
              <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
              Factor Match! {smaller} is a factor of {larger} ({larger} is a multiple of {smaller}).
            </span>
          ) : (
            <span className="text-amber-800">
              No Factor Match: {larger} ÷ {smaller} leaves remainder {larger % smaller}.
            </span>
          )}
        </p>
        <div className="grid grid-cols-2 gap-x-3 gap-y-1 font-math text-[11px] text-slate-700 pt-1 border-t border-slate-200">
          <span>
            A + B = {cardA + cardB} ({parityOf(cardA + cardB)})
          </span>
          <span>
            A − B = {cardA - cardB} ({parityOf(Math.abs(cardA - cardB))})
          </span>
          <span>
            A × B = {cardA * cardB} ({parityOf(cardA * cardB)})
          </span>
          <span>{divLabel}</span>
        </div>
      </div>
    </div>
  );
}

function HomeCountersInteractiveIllustration() {
  const [tab, setTab] = useState<'beans' | 'coins'>('beans');
  const [rowCount, setRowCount] = useState<number>(3);
  const [coinValue, setCoinValue] = useState<5 | 10>(5);
  const [coinCount, setCoinCount] = useState<number>(4);

  const totalBeans = 18;
  const cols = Math.floor(totalBeans / rowCount);
  const leftover = totalBeans % rowCount;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-900">
          Home Tray &amp; Coin Explorer
        </span>
        <div className="inline-flex rounded-lg border border-slate-200 bg-white p-0.5">
          <button
            type="button"
            onClick={() => setTab('beans')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              tab === 'beans' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            18 Rajma Beans
          </button>
          <button
            type="button"
            onClick={() => setTab('coins')}
            className={`rounded-md px-2.5 py-1 text-xs font-medium cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              tab === 'coins' ? 'bg-sky-700 text-white' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Rs. 5 / 10 Coins
          </button>
        </div>
      </div>

      {tab === 'beans' ? (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5">
            <span className="text-xs text-slate-600 mr-1">Rows on tray:</span>
            {[2, 3, 4, 5, 6].map((r) => (
              <button
                key={r}
                type="button"
                onClick={() => setRowCount(r)}
                className={`font-math rounded px-2.5 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                  rowCount === r
                    ? 'bg-sky-700 text-white'
                    : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                }`}
              >
                {r}
              </button>
            ))}
          </div>

          <svg
            viewBox="0 0 360 138"
            className="w-full h-auto rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={`18 beans arranged in ${rowCount} rows`}
          >
            <rect x="12" y="10" width="336" height="118" rx="10" fill="#F8FAFC" stroke="#CBD5E1" />
            {Array.from({ length: rowCount }).map((_, rIdx) =>
              Array.from({ length: cols }).map((__, cIdx) => (
                <ellipse
                  key={`${rIdx}-${cIdx}`}
                  cx={38 + cIdx * 28}
                  cy={25 + rIdx * 17}
                  rx="7.5"
                  ry="4.8"
                  fill="#991B1B"
                />
              ))
            )}
            {leftover > 0 && (
              <g>
                <line x1="276" y1="20" x2="276" y2="116" stroke="#F59E0B" strokeDasharray="3 3" />
                {Array.from({ length: leftover }).map((_, lIdx) => (
                  <ellipse
                    key={lIdx}
                    cx={304}
                    cy={34 + lIdx * 20}
                    rx="7.5"
                    ry="4.8"
                    fill="#D97706"
                  />
                ))}
                <text x="304" y="114" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#B45309">
                  +{leftover} left
                </text>
              </g>
            )}
          </svg>

          <p className="font-math text-xs font-semibold">
            {leftover === 0 ? (
              <span className="text-emerald-800 inline-flex items-center gap-1">
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                Neat rectangle: {rowCount} × {cols} = 18 (Factor pair!)
              </span>
            ) : (
              <span className="text-amber-800">
                Not a full rectangle: {rowCount} × {cols} + {leftover} leftover
              </span>
            )}
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-1">
              {([5, 10] as const).map((val) => (
                <button
                  key={val}
                  type="button"
                  onClick={() => setCoinValue(val)}
                  className={`font-math rounded px-2.5 py-1 font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                    coinValue === val
                      ? 'bg-slate-900 text-white'
                      : 'border border-slate-200 bg-white text-slate-700'
                  }`}
                >
                  Rs. {val}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                disabled={coinCount <= 1}
                onClick={() => setCoinCount((c) => Math.max(1, c - 1))}
                className="rounded border border-slate-200 bg-white px-2.5 py-1 font-medium text-slate-700 disabled:opacity-40 cursor-pointer"
              >
                −1 Coin
              </button>
              <button
                type="button"
                disabled={coinCount >= 6}
                onClick={() => setCoinCount((c) => Math.min(6, c + 1))}
                className="rounded bg-sky-700 px-2.5 py-1 font-semibold text-white disabled:opacity-40 cursor-pointer"
              >
                +1 Coin
              </button>
            </div>
          </div>

          <svg
            viewBox="0 0 360 110"
            className="w-full h-auto rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={`${coinCount} coins of Rs. ${coinValue}`}
          >
            {Array.from({ length: coinCount }).map((_, idx) => {
              const cx = 38 + idx * 54;
              return (
                <g key={idx}>
                  <circle
                    cx={cx}
                    cy={48}
                    r="20"
                    fill={coinValue === 5 ? '#FEF3C7' : '#E0F2FE'}
                    stroke={coinValue === 5 ? '#D97706' : '#0284C7'}
                    strokeWidth="2"
                  />
                  <text
                    x={cx}
                    y={52}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#0F172A"
                  >
                    Rs.{coinValue}
                  </text>
                  <text
                    x={cx}
                    y={88}
                    textAnchor="middle"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#0369A1"
                  >
                    {(idx + 1) * coinValue}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="font-math text-xs font-semibold text-slate-800">
            Total = Rs. {coinCount * coinValue} ·{' '}
            {coinValue === 5
              ? 'Ends in 5 or 0 → 5 is always a factor!'
              : 'Ends in 0 → 2, 5, and 10 are all factors!'}
          </p>
        </div>
      )}
    </div>
  );
}

function RealLifeInteractiveIllustration() {
  const [scenario, setScenario] = useState<'assembly' | 'mithai' | 'tuckshop'>('assembly');
  const [rowSize, setRowSize] = useState<number>(6);
  const [boxSize, setBoxSize] = useState<3 | 5>(3);
  const [packCount, setPackCount] = useState<number>(7);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-1 bg-white p-1 rounded-lg border border-slate-200">
        {[
          { id: 'assembly' as const, label: 'Assembly (36)' },
          { id: 'mithai' as const, label: 'Mithai (42)' },
          { id: 'tuckshop' as const, label: 'Tuck Shop (×6)' },
        ].map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setScenario(item.id)}
            className={`rounded-md px-2.5 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              scenario === item.id
                ? 'bg-sky-700 text-white'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {scenario === 'assembly' && (
        <div className="space-y-3">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-slate-600">Students per row:</span>
            {[3, 4, 5, 6, 9].map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setRowSize(s)}
                className={`font-math rounded px-2.5 py-1 font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                  rowSize === s
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <svg
            viewBox="0 0 360 134"
            className="w-full h-auto rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={`36 students arranged in rows of ${rowSize}`}
          >
            {Array.from({ length: Math.floor(36 / rowSize) }).map((_, rIdx) => {
              const colGroup = rIdx < 6 ? 0 : 1;
              const localRow = rIdx % 6;
              return Array.from({ length: rowSize }).map((__, cIdx) => (
                <circle
                  key={`${rIdx}-${cIdx}`}
                  cx={18 + colGroup * 174 + cIdx * 16}
                  cy={20 + localRow * 18}
                  r="5"
                  fill={36 % rowSize === 0 ? '#0284C7' : '#64748B'}
                />
              ));
            })}
            {36 % rowSize > 0 && (
              <g>
                <circle cx="320" cy="60" r="6" fill="#D97706" />
                <text x="320" y="80" textAnchor="middle" fontSize="9.5" fontWeight="600" fill="#B45309">
                  +{36 % rowSize} alone
                </text>
              </g>
            )}
          </svg>

          <p className="font-math text-xs font-semibold">
            {36 % rowSize === 0 ? (
              <span className="text-emerald-800 inline-flex items-center gap-1">
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {36 / rowSize} neat rows of {rowSize} students (0 left standing alone!)
              </span>
            ) : (
              <span className="text-amber-800">
                {Math.floor(36 / rowSize)} rows of {rowSize} = 35, leaving 1 student alone!
              </span>
            )}
          </p>
        </div>
      )}

      {scenario === 'mithai' && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-600">Pack 42 gulab jamuns in boxes of:</span>
            {([3, 5] as const).map((sz) => (
              <button
                key={sz}
                type="button"
                onClick={() => setBoxSize(sz)}
                className={`font-math rounded px-2.5 py-1 font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                  boxSize === sz
                    ? 'bg-slate-900 text-white'
                    : 'border border-slate-200 bg-white text-slate-700'
                }`}
              >
                {sz} per box
              </button>
            ))}
          </div>

          <svg
            viewBox="0 0 360 116"
            className="w-full h-auto rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={`42 sweets packed in boxes of ${boxSize}`}
          >
            {Array.from({ length: Math.floor(42 / boxSize) }).map((_, bIdx) => {
              const col = bIdx % 7;
              const row = Math.floor(bIdx / 7);
              const bx = 14 + col * 48;
              const by = 14 + row * 46;
              return (
                <g key={bIdx}>
                  <rect
                    x={bx}
                    y={by}
                    width={42}
                    height={36}
                    rx="4"
                    fill={boxSize === 3 ? '#ECFDF5' : '#F8FAFC'}
                    stroke={boxSize === 3 ? '#059669' : '#CBD5E1'}
                  />
                  {Array.from({ length: boxSize }).map((__, sIdx) => (
                    <circle
                      key={sIdx}
                      cx={bx + 9 + sIdx * (boxSize === 3 ? 11 : 6)}
                      cy={by + 18}
                      r="3.2"
                      fill="#92400E"
                    />
                  ))}
                </g>
              );
            })}
            {42 % boxSize > 0 && (
              <g>
                <rect x="64" y="60" width="90" height="36" rx="4" fill="#FFFBEB" stroke="#D97706" strokeDasharray="3 3" />
                <circle cx="80" cy="78" r="3.5" fill="#D97706" />
                <circle cx="92" cy="78" r="3.5" fill="#D97706" />
                <text x="106" y="82" fontSize="9.5" fontWeight="600" fill="#B45309">
                  +2 extra
                </text>
              </g>
            )}
          </svg>

          <p className="font-math text-xs font-semibold">
            {boxSize === 3 ? (
              <span className="text-emerald-800 inline-flex items-center gap-1">
                <Check className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                42 ÷ 3 = 14 full boxes, 0 unpacked (Example 1!)
              </span>
            ) : (
              <span className="text-amber-800">
                42 ÷ 5 = 8 boxes + 2 leftover gulab jamuns
              </span>
            )}
          </p>
        </div>
      )}

      {scenario === 'tuckshop' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600">
              Sealed packs of 6: <strong className="font-math text-slate-900">{packCount}</strong>
            </span>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                disabled={packCount <= 1}
                onClick={() => setPackCount((p) => Math.max(1, p - 1))}
                className="rounded border border-slate-200 bg-white px-2.5 py-1 font-medium text-slate-700 disabled:opacity-40 cursor-pointer"
              >
                −1 Pack
              </button>
              <button
                type="button"
                disabled={packCount >= 9}
                onClick={() => setPackCount((p) => Math.min(9, p + 1))}
                className="rounded bg-sky-700 px-2.5 py-1 font-semibold text-white disabled:opacity-40 cursor-pointer"
              >
                +1 Pack
              </button>
            </div>
          </div>

          <svg
            viewBox="0 0 360 110"
            className="w-full h-auto rounded-lg border border-slate-200 bg-white"
            role="img"
            aria-label={`${packCount} packs of 6 totaling ${packCount * 6}`}
          >
            {Array.from({ length: packCount }).map((_, idx) => {
              const bx = 12 + idx * 38;
              return (
                <g key={idx}>
                  <rect x={bx} y={24} width={32} height={46} rx="4" fill="#F0F9FF" stroke="#0284C7" />
                  <text
                    x={bx + 16}
                    y={51}
                    textAnchor="middle"
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#0C4A6E"
                  >
                    6
                  </text>
                  <text
                    x={bx + 16}
                    y={88}
                    textAnchor="middle"
                    fontSize="10"
                    fontFamily="IBM Plex Mono, monospace"
                    fill="#0369A1"
                  >
                    {(idx + 1) * 6}
                  </text>
                </g>
              );
            })}
          </svg>

          <p className="font-math text-xs font-semibold text-slate-800">
            Total = {packCount * 6} items · Notice 48 and 54 skip right past 52 (Example 3)!
          </p>
        </div>
      )}
    </div>
  );
}

const GARDEN_OPTIONS: Record<number, [number, number][]> = {
  24: [
    [1, 24],
    [2, 12],
    [3, 8],
    [4, 6],
  ],
  30: [
    [1, 30],
    [2, 15],
    [3, 10],
    [5, 6],
  ],
  36: [
    [1, 36],
    [2, 18],
    [3, 12],
    [4, 9],
    [6, 6],
  ],
  40: [
    [1, 40],
    [2, 20],
    [4, 10],
    [5, 8],
  ],
};

function CreativeGardenInteractiveIllustration() {
  const [area, setArea] = useState<number>(36);
  const [pairIndex, setPairIndex] = useState<number>(3);
  const [showRiddle, setShowRiddle] = useState<boolean>(false);

  const pairs = GARDEN_OPTIONS[area];
  const safeIdx = Math.min(pairIndex, pairs.length - 1);
  const [rows, cols] = pairs[safeIdx];

  const cellW = Math.min(22, Math.floor(310 / cols));
  const cellH = Math.min(22, Math.floor(105 / rows));
  const startX = Math.max(16, (360 - cols * cellW) / 2);
  const startY = Math.max(14, (130 - rows * cellH) / 2);

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-xs font-semibold text-slate-900">
          Factor-Garden Tile Designer
        </span>
        <div className="flex items-center gap-1">
          {[24, 30, 36, 40].map((val) => (
            <button
              key={val}
              type="button"
              onClick={() => {
                setArea(val);
                setPairIndex(Math.min(2, GARDEN_OPTIONS[val].length - 1));
              }}
              className={`font-math rounded px-2 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 ${
                area === val
                  ? 'bg-sky-700 text-white'
                  : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
              }`}
            >
              {val}
            </button>
          ))}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-1.5">
        <span className="text-xs text-slate-600 mr-1">Shape:</span>
        {pairs.map(([r, c], idx) => (
          <button
            key={`${r}x${c}`}
            type="button"
            onClick={() => setPairIndex(idx)}
            className={`font-math rounded px-2 py-1 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
              safeIdx === idx
                ? 'bg-slate-900 text-white'
                : 'border border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
            }`}
          >
            {r}×{c}
          </button>
        ))}
      </div>

      <svg
        viewBox="0 0 360 132"
        className="w-full h-auto rounded-lg border border-slate-200 bg-white"
        role="img"
        aria-label={`Garden grid of ${rows} rows by ${cols} columns making ${area} tiles`}
      >
        {Array.from({ length: rows }).map((_, rIdx) =>
          Array.from({ length: cols }).map((__, cIdx) => (
            <rect
              key={`${rIdx}-${cIdx}`}
              x={startX + cIdx * cellW + 1}
              y={startY + rIdx * cellH + 1}
              width={Math.max(3, cellW - 2)}
              height={Math.max(3, cellH - 2)}
              rx="2"
              fill={(rIdx + cIdx) % 2 === 0 ? '#10B981' : '#34D399'}
            />
          ))
        )}
      </svg>

      <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
        <span className="font-math font-semibold text-emerald-800">
          {rows} × {cols} = {area} tiles {rows === cols ? '(Square Garden!)' : ''}
        </span>
        <button
          type="button"
          onClick={() => setShowRiddle((s) => !s)}
          className="text-xs font-medium text-sky-700 hover:underline cursor-pointer"
        >
          {showRiddle ? 'Hide sample riddle' : 'See sample 3-clue riddle'}
        </button>
      </div>

      {showRiddle && (
        <p className="rounded-lg border border-sky-200 bg-sky-50 px-3 py-2 text-xs text-sky-950">
          <strong>Sample Riddle for {area}:</strong> “I am a multiple of {pairs[pairs.length - 1][0]} and{' '}
          {pairs[pairs.length - 1][1]}. I am between {area - 5} and {area + 5}. You can build {pairs.length} different rectangle gardens with my tiles. Who am I?”
        </p>
      )}
    </div>
  );
}

function renderActivityIllustration(type: PracticalActivityIllustrationType) {
  switch (type) {
    case 'matchsticks':
      return <MatchstickInteractiveIllustration />;
    case 'paper-strip':
      return <PaperStripInteractiveIllustration />;
    case 'number-cards':
      return <NumberCardsInteractiveIllustration />;
    case 'home-counters':
      return <HomeCountersInteractiveIllustration />;
    case 'real-life-packs':
      return <RealLifeInteractiveIllustration />;
    case 'creative-garden':
      return <CreativeGardenInteractiveIllustration />;
  }
}

export function PracticalActivitiesLab({ activities }: PracticalActivitiesLabProps) {
  const [activeFilter, setActiveFilter] = useState<'all' | PracticalActivityCategory>('all');
  const [completedIds, setCompletedIds] = useState<Record<string, boolean>>({});
  const [openReflectionIds, setOpenReflectionIds] = useState<Record<string, boolean>>({});

  const visibleActivities =
    activeFilter === 'all'
      ? activities
      : activities.filter((act) => act.category === activeFilter);

  const completedCount = Object.values(completedIds).filter(Boolean).length;

  return (
    <div className="space-y-6">
      {/* Header & Category Filter Bar */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4">
        <div>
          <p className="text-xs font-medium text-slate-500">
            Learning by Doing · Pakistani Classroom &amp; Home Edition
          </p>
          <h3 className="mt-1 font-display text-2xl font-bold text-slate-900">
            Practical Hands-On Activities
          </h3>
          <p className="mt-1 text-sm text-slate-600 max-w-2xl">
            Explore factors and multiples through matchsticks, paper strips, number cards, rajma beans, coins, and real-life problem solving.
          </p>
        </div>

        <div className="flex flex-col items-start lg:items-end gap-2">
          <p className="text-xs text-slate-500 font-math">
            Completed: <strong className="text-slate-900">{completedCount}</strong> / {activities.length}
          </p>
          <div
            className="flex flex-wrap items-center gap-1 rounded-lg border border-slate-200 bg-slate-100 p-1"
            role="group"
            aria-label="Filter practical activities by format"
          >
            {FILTER_OPTIONS.map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setActiveFilter(opt.id)}
                className={`rounded-md px-2.5 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                  activeFilter === opt.id
                    ? 'bg-white text-slate-900 shadow-xs'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Activity List */}
      <div className="space-y-8">
        {visibleActivities.map((activity) => {
          const isDone = Boolean(completedIds[activity.id]);
          const reflectionOpen = Boolean(openReflectionIds[activity.id]);

          return (
            <article
              key={activity.id}
              className="rounded-xl border border-slate-200 bg-white overflow-hidden"
            >
              {/* Activity Header */}
              <div className="border-b border-slate-200 bg-slate-50 px-5 py-4 sm:px-6 flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs font-medium text-slate-500">
                    Activity {activity.number} · {activity.categoryLabel} · {activity.settingInfo}
                  </p>
                  <h4 className="mt-1 font-display text-lg sm:text-xl font-bold text-slate-900">
                    {activity.title}
                  </h4>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setCompletedIds((prev) => ({ ...prev, [activity.id]: !prev[activity.id] }))
                  }
                  className={`inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-xs font-semibold cursor-pointer whitespace-nowrap shrink-0 transition-colors ${
                    isDone
                      ? 'border-emerald-300 bg-emerald-50 text-emerald-800'
                      : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-100'
                  }`}
                >
                  {isDone ? (
                    <>
                      <Check className="h-3.5 w-3.5" aria-hidden="true" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <span>Mark Done</span>
                  )}
                </button>
              </div>

              {/* Two-Zone Content: Interactive Illustration (Left) + 7-Part Guide (Right) */}
              <div className="grid grid-cols-1 lg:grid-cols-12">
                {/* Left Zone: Interactive Visual Lab */}
                <div className="p-5 sm:p-6 lg:col-span-5 border-b lg:border-b-0 lg:border-r border-slate-200 bg-slate-50/70">
                  {renderActivityIllustration(activity.illustrationType)}
                </div>

                {/* Right Zone: All 7 Pedagogical Fields */}
                <div className="p-5 sm:p-6 lg:col-span-7 divide-y divide-slate-200 text-xs sm:text-sm leading-relaxed text-slate-700">
                  {/* 2. Learning Purpose & 3. Materials Required */}
                  <div className="pb-4 space-y-3">
                    <div>
                      <h5 className="text-xs font-semibold text-slate-900">
                        Learning Purpose
                      </h5>
                      <p className="mt-1">{activity.learningPurpose}</p>
                    </div>
                    <div>
                      <h5 className="text-xs font-semibold text-slate-900">
                        Materials Required
                      </h5>
                      <ul className="mt-1 space-y-1 text-xs text-slate-700">
                        {activity.materialsRequired.map((mat) => (
                          <li key={mat}>• {mat}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* 4. Step-by-Step Instructions */}
                  <div className="py-4">
                    <h5 className="text-xs font-semibold text-slate-900">
                      Instructions
                    </h5>
                    <ol className="mt-2 space-y-1.5 list-decimal pl-5">
                      {activity.instructions.map((step) => (
                        <li key={step}>{step}</li>
                      ))}
                    </ol>
                  </div>

                  {/* 5. Expected Observation & 6. Mathematical Conclusion */}
                  <div className="py-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-xs font-semibold text-slate-900">
                        Expected Observation
                      </h5>
                      <p className="mt-1 text-xs leading-relaxed text-slate-700">
                        {activity.expectedObservation}
                      </p>
                    </div>
                    <div className="rounded-lg border border-sky-200 bg-sky-50/70 p-3">
                      <h5 className="text-xs font-semibold text-sky-950">
                        Mathematical Conclusion
                      </h5>
                      <p className="mt-1 text-xs leading-relaxed text-sky-950">
                        {activity.mathematicalConclusion}
                      </p>
                    </div>
                  </div>

                  {/* 7. Questions for Reflection */}
                  <div className="pt-4 space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h5 className="text-xs font-semibold text-slate-900">
                        Questions for Reflection
                      </h5>
                      <button
                        type="button"
                        onClick={() =>
                          setOpenReflectionIds((prev) => ({
                            ...prev,
                            [activity.id]: !prev[activity.id],
                          }))
                        }
                        className="inline-flex items-center gap-1 text-xs font-medium text-sky-700 hover:underline cursor-pointer whitespace-nowrap shrink-0"
                      >
                        <HelpCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        <span>{reflectionOpen ? 'Hide discussion tip' : 'Discussion tip'}</span>
                      </button>
                    </div>

                    <ul className="space-y-1.5 text-xs sm:text-sm text-slate-800">
                      {activity.reflectionQuestions.map((q, qIdx) => (
                        <li key={q} className="flex items-start gap-2">
                          <span className="font-math text-xs font-bold text-sky-700 mt-0.5 shrink-0">
                            Q{qIdx + 1}.
                          </span>
                          <span>{q}</span>
                        </li>
                      ))}
                    </ul>

                    {reflectionOpen && (
                      <p className="rounded-lg border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-950">
                        <strong>Tip for your notebook:</strong> Write down one full division equation (dividend = quotient × divisor + remainder) or draw a quick diagram to prove your reflection answer!
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
