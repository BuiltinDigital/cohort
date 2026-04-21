'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { brandStrategies, portfolioSummary } from '@/lib/data/director/brandPortfolio';
import { cn } from '@/lib/utils';

/* ─── Helpers ─────────────────────────────────────────────────────── */

const strategyColors = {
  invest: { bg: 'bg-good/15', text: 'text-good', border: 'border-good/20', fill: '#1DB77A' },
  maintain: { bg: 'bg-sky/15', text: 'text-sky', border: 'border-sky/20', fill: '#4AB4E8' },
  harvest: { bg: 'bg-warn/15', text: 'text-warn', border: 'border-warn/20', fill: '#FF9D2E' },
  divest: { bg: 'bg-risk/15', text: 'text-risk', border: 'border-risk/20', fill: '#E53E5C' },
} as const;

const QUADRANT_LABELS: Record<string, { label: string; x: number; y: number }> = {
  invest: { label: 'Invest', x: 75, y: 25 },
  maintain: { label: 'Maintain', x: 25, y: 25 },
  harvest: { label: 'Harvest', x: 75, y: 75 },
  divest: { label: 'Divest', x: 25, y: 75 },
};

/* Map brand trends to grid position (0-100 scale) */
function toGridX(revenueTrend: number): number {
  // Range is roughly -5 to +10. Map to 10-90
  return Math.max(5, Math.min(95, 50 + revenueTrend * 5));
}

function toGridY(readersTrend: number): number {
  // Range is roughly -10 to +15. Map to 10-90, but Y is inverted (high = top = low %)
  return Math.max(5, Math.min(95, 50 - readersTrend * 4));
}

/* ─── Component ───────────────────────────────────────────────────── */

export function BrandStrategy({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [hoveredBrand, setHoveredBrand] = useState<string | null>(null);
  const sum = portfolioSummary;

  return (
    <div className="animate-fade-up">
      {/* ── Strategy Summary Bar ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {(['invest', 'maintain', 'harvest', 'divest'] as const).map((s) => {
          const brands =
            s === 'invest' ? sum.investBrands :
            s === 'maintain' ? sum.maintainBrands :
            s === 'harvest' ? sum.harvestBrands :
            sum.divestBrands;
          const sc = strategyColors[s];

          return (
            <div key={s} className={cn('rounded-xl border p-4', sc.bg, sc.border)}>
              <div className={cn('text-[10px] tracking-[0.12em] uppercase font-bold mb-1', sc.text)}>
                {s.charAt(0).toUpperCase() + s.slice(1)}
              </div>
              <div className="font-display font-[800] text-[30px] text-navy leading-none mb-1">
                {brands.length}
              </div>
              <div className="text-[11px] text-muted">
                {brands.length > 0 ? brands.join(', ') : 'None'}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 2x2 Matrix ────────────────────────────────────────────── */}
      <SectionHeading title="Strategy Matrix" />
      <div className="bg-paper border border-line rounded-xl p-6 mb-6 overflow-hidden">
        <div className="relative w-full" style={{ paddingBottom: '70%' }}>
          <div className="absolute inset-0">
            {/* Axis labels */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-[10px] tracking-[0.12em] uppercase font-bold text-muted pb-1">
              Revenue Trend
            </div>
            <div
              className="absolute left-0 top-1/2 text-[10px] tracking-[0.12em] uppercase font-bold text-muted"
              style={{ transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: '0 0' }}
            >
              Readership Trend
            </div>

            {/* Grid */}
            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Background quadrants */}
              <rect x="0" y="0" width="50" height="50" fill="#1DB77A" opacity="0.05" />
              <rect x="50" y="0" width="50" height="50" fill="#4AB4E8" opacity="0.05" />
              <rect x="0" y="50" width="50" height="50" fill="#FF9D2E" opacity="0.05" />
              <rect x="50" y="50" width="50" height="50" fill="#E53E5C" opacity="0.05" />

              {/* Cross lines */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="#E2E6EC" strokeWidth="0.5" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E6EC" strokeWidth="0.5" />

              {/* Quadrant labels */}
              <text x="75" y="8" textAnchor="middle" className="fill-good text-[4px] font-bold uppercase">
                INVEST
              </text>
              <text x="25" y="8" textAnchor="middle" className="fill-sky text-[4px] font-bold uppercase">
                MAINTAIN
              </text>
              <text x="75" y="97" textAnchor="middle" className="fill-warn text-[4px] font-bold uppercase">
                HARVEST
              </text>
              <text x="25" y="97" textAnchor="middle" className="fill-risk text-[4px] font-bold uppercase">
                DIVEST
              </text>

              {/* Brand circles */}
              {brandStrategies.map((b) => {
                const cx = toGridX(b.revenueTrend);
                const cy = toGridY(b.readersTrend);
                const sc = strategyColors[b.strategy];
                const isHovered = hoveredBrand === b.brand;

                return (
                  <g key={b.brand}>
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 5 : 3.5}
                      fill={sc.fill}
                      opacity={isHovered ? 1 : 0.8}
                      stroke="white"
                      strokeWidth="0.5"
                      className="transition-all duration-200 cursor-pointer"
                      onMouseEnter={() => setHoveredBrand(b.brand)}
                      onMouseLeave={() => setHoveredBrand(null)}
                    />
                    <text
                      x={cx}
                      y={cy - 5}
                      textAnchor="middle"
                      className={cn(
                        'fill-navy font-bold transition-opacity duration-200',
                        isHovered ? 'text-[3.5px] opacity-100' : 'text-[2.8px] opacity-70',
                      )}
                    >
                      {b.brand.replace('BBC ', '').replace("Gardeners' ", "GW")}
                    </text>
                  </g>
                );
              })}
            </svg>

            {/* Axis arrow labels */}
            <div className="absolute right-2 bottom-2 text-[9px] text-muted font-mono">+</div>
            <div className="absolute left-8 bottom-2 text-[9px] text-muted font-mono">-</div>
            <div className="absolute left-2 top-2 text-[9px] text-muted font-mono">+</div>
            <div className="absolute left-2 bottom-2 text-[9px] text-muted font-mono">-</div>
          </div>
        </div>
      </div>

      {/* ── Brand Strategy Cards ──────────────────────────────────── */}
      <SectionHeading title="Brand Strategy Detail" count={brandStrategies.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
        {brandStrategies.map((b) => {
          const sc = strategyColors[b.strategy];

          return (
            <div
              key={b.brand}
              className={cn(
                'bg-paper border rounded-xl p-5 transition-all',
                'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.08)]',
                sc.border,
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div className="font-display font-[900] text-[22px] text-navy leading-none">
                  {b.brand}
                </div>
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded border',
                    sc.bg,
                    sc.text,
                    sc.border,
                  )}
                >
                  {b.strategy}
                </span>
              </div>

              {/* Trend metrics */}
              <div className="grid grid-cols-2 gap-4 mb-3">
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Readership Trend
                  </div>
                  <div
                    className={cn(
                      'font-display font-[800] text-[20px] leading-none',
                      b.readersTrend > 0 ? 'text-good' : b.readersTrend < 0 ? 'text-risk' : 'text-muted',
                    )}
                  >
                    {b.readersTrend > 0 ? '+' : ''}
                    {b.readersTrend}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Revenue Trend
                  </div>
                  <div
                    className={cn(
                      'font-display font-[800] text-[20px] leading-none',
                      b.revenueTrend > 0 ? 'text-good' : b.revenueTrend < 0 ? 'text-risk' : 'text-muted',
                    )}
                  >
                    {b.revenueTrend > 0 ? '+' : ''}
                    {b.revenueTrend}%
                  </div>
                </div>
              </div>

              {/* Key metric */}
              <div className="bg-off rounded-lg px-3 py-2 mb-3">
                <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                  {b.keyMetric}
                </div>
                <div className="font-mono text-[12px] font-semibold text-navy">
                  {b.keyMetricValue}
                </div>
              </div>

              {/* Rationale */}
              <p className="text-[12px] text-muted leading-relaxed">{b.rationale}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
