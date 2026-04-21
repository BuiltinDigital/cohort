'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MiniBarChart } from '@/components/ui/MiniBarChart';
import { categoryShareDetails, categorySummary } from '@/lib/data/director/categoryShare';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Component ───────────────────────────────────────────────────── */

export function CategoryShare({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const sum = categorySummary;
  const maxShare = Math.max(
    ...categoryShareDetails.flatMap((c) => [c.immediateShare, c.topCompetitorShare]),
  );

  return (
    <div className="animate-fade-up">
      {/* ── Summary Metrics ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Addressable Market"
          value={formatCurrency(sum.totalAddressableMarket, true)}
          sub="7 categories tracked"
        />
        <MetricCard
          label="Categories >20% Share"
          value={String(sum.categoriesAbove20PctShare.length)}
          sub={sum.categoriesAbove20PctShare.join(', ')}
          subColor="good"
        />
        <MetricCard
          label="Fastest Growing Category"
          value={sum.fastestGrowingCategory}
          sub="By market size growth"
          subColor="good"
        />
        <MetricCard
          label="Biggest Opportunity"
          value={sum.biggestOpportunityBySize}
          sub="Largest market, lowest Immediate share"
          subColor="warn"
        />
      </div>

      {/* ── Category Cards ───────────────────────────────────────── */}
      <SectionHeading title="Immediate Share by Category" count={categoryShareDetails.length} />

      <div className="space-y-4">
        {categoryShareDetails
          .sort((a, b) => b.immediateShare - a.immediateShare)
          .map((cat) => {
            const immPct = (cat.immediateShare / maxShare) * 100;
            const compPct = (cat.topCompetitorShare / maxShare) * 100;
            const immRev = cat.marketSize * (cat.immediateShare / 100);
            const outgrowingMarket = cat.immediateGrowthRate > cat.growthRate;
            const lastQ = cat.quarterlyTrend[cat.quarterlyTrend.length - 1];
            const firstQ = cat.quarterlyTrend[0];
            const shareDelta = lastQ.immediateShare - firstQ.immediateShare;

            return (
              <div
                key={cat.category}
                className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-all"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="font-display font-[800] text-[20px] text-navy leading-none">
                      {cat.category}
                    </div>
                    <div className="text-[11px] text-muted mt-1">
                      Market size: {formatCurrency(cat.marketSize, true)} &middot;{' '}
                      Brands: {cat.brands.join(', ')}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-display font-[800] text-[30px] text-sky leading-none">
                      {cat.immediateShare}%
                    </div>
                    <div className="text-[10px] text-muted uppercase tracking-wider mt-1">
                      Immediate Share
                    </div>
                  </div>
                </div>

                {/* Double bar — Immediate vs top competitor */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-[100px] text-[12px] font-semibold text-sky">Immediate</div>
                    <div className="flex-1 h-[14px] bg-off rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-sky transition-all duration-500"
                        style={{ width: `${immPct}%` }}
                      />
                    </div>
                    <div className="w-[40px] text-right font-mono text-[12px] font-semibold text-ink">
                      {cat.immediateShare}%
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-[100px] text-[12px] font-semibold text-muted truncate">
                      {cat.topCompetitor}
                    </div>
                    <div className="flex-1 h-[14px] bg-off rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full bg-muted/40 transition-all duration-500"
                        style={{ width: `${compPct}%` }}
                      />
                    </div>
                    <div className="w-[40px] text-right font-mono text-[12px] font-semibold text-ink">
                      {cat.topCompetitorShare}%
                    </div>
                  </div>
                </div>

                {/* Metrics row */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-4">
                  <div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                      Immediate Revenue
                    </div>
                    <div className="font-display font-[800] text-[18px] text-navy leading-none">
                      {formatCurrency(immRev, true)}
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                      Immediate Growth
                    </div>
                    <div
                      className={cn(
                        'font-display font-[800] text-[18px] leading-none',
                        cat.immediateGrowthRate > 0 ? 'text-good' : 'text-risk',
                      )}
                    >
                      {cat.immediateGrowthRate > 0 ? '+' : ''}
                      {cat.immediateGrowthRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                      Market Growth
                    </div>
                    <div
                      className={cn(
                        'font-display font-[800] text-[18px] leading-none',
                        cat.growthRate > 0 ? 'text-good' : 'text-risk',
                      )}
                    >
                      {cat.growthRate > 0 ? '+' : ''}
                      {cat.growthRate}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                      Share Change (8Q)
                    </div>
                    <div
                      className={cn(
                        'font-display font-[800] text-[18px] leading-none',
                        shareDelta > 0 ? 'text-good' : 'text-risk',
                      )}
                    >
                      {shareDelta > 0 ? '+' : ''}
                      {shareDelta.toFixed(1)}pp
                    </div>
                  </div>
                  <div>
                    <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                      Trajectory
                    </div>
                    {outgrowingMarket ? (
                      <span className="bg-good/15 text-good text-[11px] font-bold px-2 py-1 rounded">
                        Gaining Share
                      </span>
                    ) : (
                      <span className="bg-risk/15 text-risk text-[11px] font-bold px-2 py-1 rounded">
                        Losing Share
                      </span>
                    )}
                  </div>
                </div>

                {/* Quarterly sparkline */}
                <div className="flex items-center gap-1 mb-3">
                  {cat.quarterlyTrend.map((q, i) => (
                    <div key={q.quarter} className="flex-1 text-center">
                      <div
                        className="mx-auto rounded-sm bg-sky transition-all duration-300"
                        style={{
                          height: `${Math.max(8, (q.immediateShare / maxShare) * 40)}px`,
                          opacity: 0.4 + (i / cat.quarterlyTrend.length) * 0.6,
                        }}
                      />
                      <div className="text-[8px] text-muted mt-1">{q.quarter.replace('20', "'")}</div>
                    </div>
                  ))}
                </div>

                {/* Key advertisers */}
                <div className="flex flex-wrap gap-1.5 mb-2">
                  {cat.keyAdvertisers.map((adv) => (
                    <span
                      key={adv}
                      className="text-[10px] font-semibold text-muted bg-off px-2 py-0.5 rounded"
                    >
                      {adv}
                    </span>
                  ))}
                </div>

                {/* Strategic note */}
                <div className="text-[12px] text-muted leading-relaxed italic">
                  {cat.strategicNote}
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
