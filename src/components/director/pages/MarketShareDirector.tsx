'use client';

import { useState } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TabGroup } from '@/components/ui/TabGroup';
import {
  marketShareByFormat,
  categoryShares,
  marketShareSummary,
} from '@/lib/data/director/marketShareFull';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Palette ─────────────────────────────────────────────────────── */

const PUBLISHER_COLORS: Record<string, string> = {
  Immediate: '#4AB4E8',
  Hearst: '#E89F4A',
  Future: '#7B4EC9',
  'Condé Nast': '#1DB77A',
  'News UK': '#E53E5C',
  Others: '#6B7A93',
};

function getColor(publisher: string): string {
  return PUBLISHER_COLORS[publisher] ?? '#6B7A93';
}

/* ─── SVG Donut ───────────────────────────────────────────────────── */

function DonutChart({
  data,
  metric,
  centerLabel,
  centerValue,
}: {
  data: { publisher: string; value: number }[];
  metric: string;
  centerLabel: string;
  centerValue: string;
}) {
  const total = data.reduce((a, d) => a + d.value, 0);
  const radius = 80;
  const strokeWidth = 28;
  const center = 110;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <div>
      <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-paper/60 mb-3 text-center">
        {metric}
      </div>
      <svg viewBox="0 0 220 220" className="w-full max-w-[200px] mx-auto">
        {data.map((d) => {
          const pct = d.value / total;
          const dashLength = pct * circumference;
          const dashOffset = -(cumulative / total) * circumference;
          cumulative += d.value;
          return (
            <circle
              key={d.publisher}
              cx={center}
              cy={center}
              r={radius}
              fill="none"
              stroke={getColor(d.publisher)}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dashLength} ${circumference - dashLength}`}
              strokeDashoffset={dashOffset}
              transform={`rotate(-90 ${center} ${center})`}
              className="transition-all duration-500"
            />
          );
        })}
        <text
          x={center}
          y={center - 8}
          textAnchor="middle"
          className="fill-paper font-display font-[900] text-[26px]"
        >
          {centerValue}
        </text>
        <text
          x={center}
          y={center + 14}
          textAnchor="middle"
          className="fill-paper/70 text-[9px] font-bold tracking-[0.12em] uppercase"
        >
          {centerLabel}
        </text>
      </svg>
    </div>
  );
}

/* ─── HBar ────────────────────────────────────────────────────────── */

function HBar({
  label,
  value,
  max,
  color,
  delta,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  delta?: number;
}) {
  const pct = Math.max(4, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-[100px] text-[12px] font-semibold text-ink truncate">{label}</div>
      <div className="flex-1 h-[14px] bg-off rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="w-[50px] text-right font-mono text-[12px] font-semibold text-ink">
        {value}%
      </div>
      {delta !== undefined && (
        <div
          className={cn(
            'w-[56px] text-right font-mono text-[11px] font-bold',
            delta > 0 ? 'text-good' : delta < 0 ? 'text-risk' : 'text-muted',
          )}
        >
          {delta > 0 ? '+' : ''}
          {delta.toFixed(1)}pts
        </div>
      )}
    </div>
  );
}

/* ─── Growth Comparison Bar ───────────────────────────────────────── */

function GrowthBar({
  publisher,
  growth,
  maxGrowth,
}: {
  publisher: string;
  growth: number;
  maxGrowth: number;
}) {
  const absMax = Math.max(maxGrowth, 1);
  const barPct = Math.abs(growth) / absMax * 80;
  const color = getColor(publisher);

  return (
    <div className="flex items-center gap-3">
      <div className="w-[100px] text-[12px] font-semibold text-ink truncate">{publisher}</div>
      <div className="flex-1 flex items-center">
        {growth < 0 ? (
          <div className="w-full flex justify-end">
            <div className="w-1/2 flex justify-end">
              <div
                className="h-[12px] rounded-l-full transition-all duration-500 opacity-60"
                style={{ width: `${barPct}%`, background: color }}
              />
            </div>
            <div className="w-1/2" />
          </div>
        ) : (
          <div className="w-full flex">
            <div className="w-1/2" />
            <div className="w-1/2">
              <div
                className="h-[12px] rounded-r-full transition-all duration-500"
                style={{ width: `${barPct}%`, background: color }}
              />
            </div>
          </div>
        )}
      </div>
      <div
        className={cn(
          'w-[56px] text-right font-mono text-[12px] font-bold',
          growth > 0 ? 'text-good' : growth < 0 ? 'text-risk' : 'text-muted',
        )}
      >
        {growth > 0 ? '+' : ''}
        {growth.toFixed(1)}%
      </div>
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────── */

export function MarketShareDirector({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [tab, setTab] = useState<string>('By Format');
  const sum = marketShareSummary;

  /* format-specific data */
  const printData = marketShareByFormat.map((d) => ({ publisher: d.publisher, value: d.print }));
  const digitalData = marketShareByFormat.map((d) => ({ publisher: d.publisher, value: d.digital }));
  const totalData = marketShareByFormat.map((d) => ({ publisher: d.publisher, value: d.total }));

  /* growth rates per publisher (total share) — fake YoY for non-Immediate */
  const growthRates = [
    { publisher: 'Immediate', growth: 4.2 },
    { publisher: 'Hearst', growth: 2.8 },
    { publisher: 'Future', growth: 6.1 },
    { publisher: 'Condé Nast', growth: -1.2 },
    { publisher: 'News UK', growth: -0.6 },
    { publisher: 'Others', growth: 0.8 },
  ];
  const maxGrowth = Math.max(...growthRates.map((g) => Math.abs(g.growth)));

  const maxFormat = Math.max(...marketShareByFormat.map((d) => Math.max(d.print, d.digital, d.total)));

  /* category view */
  const maxCatShare = Math.max(...categoryShares.map((c) => Math.max(c.immediateShare, c.topCompetitorShare)));

  const immediateDonut = totalData.find((d) => d.publisher === 'Immediate');

  return (
    <div className="animate-fade-up">
      {/* ── Summary Metrics ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Addressable Market"
          value={formatCurrency(sum.totalAddressableMarket, true)}
          sub="UK publisher display"
        />
        <MetricCard
          label="Immediate Revenue"
          value={formatCurrency(sum.immediateRevenue, true)}
          sub={
            <>
              <span className="text-good">+{sum.yoyShareChange}pp</span> YoY share growth
            </>
          }
          subColor="good"
        />
        <MetricCard
          label="Overall Share"
          value={`${sum.overallShare}%`}
          sub={`Strongest: ${sum.strongestCategory}`}
        />
        <MetricCard
          label="Biggest Opportunity"
          value={sum.biggestOpportunity}
          sub={`Weakest share: ${sum.weakestCategory}`}
          subColor="warn"
        />
      </div>

      {/* ── Tab Selector ─────────────────────────────────────────── */}
      <TabGroup
        tabs={['By Format', 'By Category']}
        activeTab={tab}
        onTabChange={setTab}
        className="mb-6"
      />

      {tab === 'By Format' && (
        <>
          {/* ── Donut Hero ─────────────────────────────────────────── */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-6">
            <div className="bg-gradient-to-br from-ink to-[#162d5a] rounded-[14px] p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-[200px] h-[200px] border-2 border-white/[0.08] rounded-full" />
              <DonutChart
                data={totalData}
                metric="Total Market Share"
                centerLabel="Immediate"
                centerValue={`${immediateDonut?.value ?? 18}%`}
              />
              <div className="grid grid-cols-2 gap-x-4 gap-y-[6px] mt-4">
                {totalData.map((d) => (
                  <div key={d.publisher} className="flex items-center gap-2">
                    <span className="w-[8px] h-[8px] rounded-full flex-shrink-0" style={{ background: getColor(d.publisher) }} />
                    <span className="text-[12px] text-paper/80 font-medium">
                      {d.publisher} <span className="font-mono text-paper/50 ml-1">{d.value}%</span>
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-ink to-[#162d5a] rounded-[14px] p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-[200px] h-[200px] border-2 border-white/[0.08] rounded-full" />
              <DonutChart
                data={printData}
                metric="Print Share"
                centerLabel="Immediate"
                centerValue={`${printData.find((d) => d.publisher === 'Immediate')?.value ?? 24}%`}
              />
            </div>

            <div className="bg-gradient-to-br from-ink to-[#162d5a] rounded-[14px] p-6 relative overflow-hidden">
              <div className="absolute -top-12 -right-12 w-[200px] h-[200px] border-2 border-white/[0.08] rounded-full" />
              <DonutChart
                data={digitalData}
                metric="Digital Share"
                centerLabel="Immediate"
                centerValue={`${digitalData.find((d) => d.publisher === 'Immediate')?.value ?? 14}%`}
              />
            </div>
          </div>

          {/* ── Competitor Comparison Bars ──────────────────────────── */}
          <SectionHeading title="Competitor Comparison" />
          <div className="bg-paper border border-line rounded-xl p-6 mb-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div>
                <div className="font-display font-[800] text-[16px] text-navy mb-4">Print</div>
                <div className="space-y-[10px]">
                  {marketShareByFormat.map((d) => (
                    <HBar key={d.publisher} label={d.publisher} value={d.print} max={maxFormat} color={getColor(d.publisher)} />
                  ))}
                </div>
              </div>
              <div>
                <div className="font-display font-[800] text-[16px] text-navy mb-4">Digital</div>
                <div className="space-y-[10px]">
                  {marketShareByFormat.map((d) => (
                    <HBar key={d.publisher} label={d.publisher} value={d.digital} max={maxFormat} color={getColor(d.publisher)} />
                  ))}
                </div>
              </div>
              <div>
                <div className="font-display font-[800] text-[16px] text-navy mb-4">Total</div>
                <div className="space-y-[10px]">
                  {marketShareByFormat.map((d) => (
                    <HBar key={d.publisher} label={d.publisher} value={d.total} max={maxFormat} color={getColor(d.publisher)} />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ── Growth Rate Trajectory ─────────────────────────────── */}
          <SectionHeading title="Growth Rate Trajectory" />
          <div className="bg-paper border border-line rounded-xl p-6">
            <div className="text-[13px] text-muted mb-5">
              Year-on-year total share growth by publisher — not just position but trajectory
            </div>
            <div className="space-y-[10px]">
              {growthRates
                .sort((a, b) => b.growth - a.growth)
                .map((g) => (
                  <GrowthBar key={g.publisher} publisher={g.publisher} growth={g.growth} maxGrowth={maxGrowth} />
                ))}
            </div>
          </div>
        </>
      )}

      {tab === 'By Category' && (
        <>
          <SectionHeading title="Share by Category" count={categoryShares.length} />
          <div className="space-y-4">
            {categoryShares.map((cat) => {
              const immPct = (cat.immediateShare / maxCatShare) * 100;
              const compPct = (cat.topCompetitorShare / maxCatShare) * 100;
              const marketStr = formatCurrency(cat.marketSize, true);

              return (
                <div
                  key={cat.category}
                  className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow cursor-pointer"
                  onClick={() => onNavigate('category-share', cat.category)}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-display font-[800] text-[18px] text-navy">{cat.category}</div>
                      <div className="text-[11px] text-muted">Market size: {marketStr}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-display font-[800] text-[24px] text-sky leading-none">{cat.immediateShare}%</div>
                      <div className="text-[10px] text-muted uppercase tracking-wider">Immediate share</div>
                    </div>
                  </div>

                  {/* Double bar */}
                  <div className="space-y-2 mb-3">
                    <div className="flex items-center gap-3">
                      <div className="w-[80px] text-[11px] font-semibold text-sky">Immediate</div>
                      <div className="flex-1 h-[12px] bg-off rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-sky transition-all duration-500" style={{ width: `${immPct}%` }} />
                      </div>
                      <div className="w-[40px] text-right font-mono text-[11px] text-ink">{cat.immediateShare}%</div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-[80px] text-[11px] font-semibold text-muted truncate">{cat.topCompetitor}</div>
                      <div className="flex-1 h-[12px] bg-off rounded-full overflow-hidden">
                        <div className="h-full rounded-full bg-muted/40 transition-all duration-500" style={{ width: `${compPct}%` }} />
                      </div>
                      <div className="w-[40px] text-right font-mono text-[11px] text-ink">{cat.topCompetitorShare}%</div>
                    </div>
                  </div>

                  {/* Growth chips */}
                  <div className="flex gap-4 text-[11px]">
                    <span>
                      Immediate growth:{' '}
                      <span className={cn('font-mono font-bold', cat.immediateGrowthRate > 0 ? 'text-good' : 'text-risk')}>
                        {cat.immediateGrowthRate > 0 ? '+' : ''}{cat.immediateGrowthRate}%
                      </span>
                    </span>
                    <span>
                      Market growth:{' '}
                      <span className={cn('font-mono font-bold', cat.growthRate > 0 ? 'text-good' : 'text-risk')}>
                        {cat.growthRate > 0 ? '+' : ''}{cat.growthRate}%
                      </span>
                    </span>
                    {cat.immediateGrowthRate > cat.growthRate && (
                      <span className="bg-good/15 text-good font-semibold px-2 py-0.5 rounded">Gaining share</span>
                    )}
                    {cat.immediateGrowthRate < cat.growthRate && (
                      <span className="bg-risk/15 text-risk font-semibold px-2 py-0.5 rounded">Losing share</span>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}
