'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { MiniBarChart } from '@/components/ui/MiniBarChart';
import { commissionBreakdown, myKPIs } from '@/lib/data/sales/myPerformance';
import { cn, formatCurrency } from '@/lib/utils';

export function MyCommission({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const cb = commissionBreakdown;
  const kpi = myKPIs;
  const earnedPct = Math.round((cb.currentEarnings / kpi.commissionTarget) * 100);
  const revenueNeeded = cb.nextTierAt - kpi.deliveredQ2;

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          My Commission
        </h1>
        <p className="text-[13px] text-muted">
          Q2 2026 earnings &middot; Tier: {cb.tier}
        </p>
      </div>

      {/* Hero Earned */}
      <div className="bg-gradient-to-br from-sky to-sky-bright rounded-[14px] p-6 lg:p-7 text-paper relative overflow-hidden mb-6">
        <div className="absolute -top-8 -right-8 w-[160px] h-[160px] border-2 border-white/[0.15] rounded-full" />
        <div className="absolute -bottom-6 -left-3 w-[120px] h-[120px] border border-white/[0.08] rounded-full" />

        <div className="relative">
          <div className="text-[11px] tracking-[0.15em] uppercase font-semibold opacity-90 mb-2">
            Commission Earned
          </div>
          <div className="font-display font-[900] text-[64px] leading-[0.85] tracking-[-0.03em] mb-3">
            &pound;{(cb.currentEarnings / 1_000).toFixed(0)}k
          </div>
          <div className="text-[13px] opacity-85 mb-4">
            {earnedPct}% of &pound;{(kpi.commissionTarget / 1_000).toFixed(0)}k target
          </div>

          {/* Progress bar */}
          <div className="h-[10px] bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-paper transition-all duration-500"
              style={{ width: `${Math.min(earnedPct, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-[11px] mt-2 opacity-80">
            <span>&pound;0</span>
            <span>&pound;{(kpi.commissionTarget / 1_000).toFixed(0)}k target</span>
          </div>
        </div>
      </div>

      {/* Current Tier + Next Tier */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Current Tier */}
        <div className="bg-paper border border-line rounded-xl p-5">
          <SectionHeading title="Current Tier" className="!mt-0 !mb-4" />
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-display font-[800] text-[30px] text-navy">{cb.tier}</span>
            <span className="text-[10px] font-bold tracking-[0.1em] uppercase bg-sky-soft text-sky px-2 py-[3px] rounded">
              {cb.tierRate}% rate
            </span>
          </div>
          <div className="text-[12.5px] text-muted leading-relaxed">
            Current multiplier: <strong className="text-navy">{cb.multiplier}x</strong> on base of &pound;{(cb.base / 1_000).toFixed(0)}k
          </div>
        </div>

        {/* Next Tier Progress */}
        <div className="bg-paper border border-line rounded-xl p-5">
          <SectionHeading title="Next Tier: Super" className="!mt-0 !mb-4" />
          <div className="flex items-baseline gap-3 mb-3">
            <span className="font-display font-[800] text-[30px] text-navy">{cb.nextTierRate}%</span>
            <span className="text-[13px] text-muted">commission rate</span>
          </div>
          <div className="text-[12.5px] text-muted mb-3">
            <strong className="text-navy">{formatCurrency(revenueNeeded, true)}</strong> more revenue needed to unlock
          </div>
          <MiniBarChart
            value={Math.round((kpi.deliveredQ2 / cb.nextTierAt) * 100)}
            label={`Revenue: ${formatCurrency(kpi.deliveredQ2, true)} / ${formatCurrency(cb.nextTierAt, true)}`}
          />
        </div>
      </div>

      {/* Earnings Breakdown */}
      <SectionHeading title="Earnings Breakdown" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="space-y-4">
          {[
            { label: 'Base salary (annualised)', value: cb.base, color: 'text-navy' },
            { label: 'Commission at current tier', value: cb.currentEarnings - cb.base, color: 'text-good' },
            { label: 'Total earned to date', value: cb.currentEarnings, color: 'text-navy', bold: true },
          ].map((item) => (
            <div key={item.label} className="flex items-center justify-between py-2 border-b border-line-soft last:border-b-0">
              <span className={cn('text-[13px]', item.bold ? 'font-bold text-navy' : 'text-muted')}>
                {item.label}
              </span>
              <span className={cn('font-mono text-[13px] font-semibold', item.color)}>
                {formatCurrency(item.value)}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Projection */}
      <SectionHeading title="Q2 Projection" />

      <div className="bg-paper border border-line rounded-xl p-5">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="font-display font-[800] text-[30px] text-good">
            &pound;{(cb.projectedQ2 / 1_000).toFixed(0)}k
          </span>
          <span className="text-[13px] text-muted">projected Q2 earnings</span>
        </div>
        <p className="text-[12.5px] text-muted leading-relaxed mb-4">
          If current pace holds, you are on track to exceed the &pound;{(kpi.commissionTarget / 1_000).toFixed(0)}k target
          by <strong className="text-good">&pound;{((cb.projectedQ2 - kpi.commissionTarget) / 1_000).toFixed(0)}k</strong>.
        </p>
        <div className="h-[10px] bg-line rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full bg-good transition-all duration-500"
            style={{ width: `${Math.min(Math.round((cb.projectedQ2 / kpi.commissionTarget) * 100), 100)}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-muted mt-2">
          <span>&pound;0</span>
          <span>Projected &pound;{(cb.projectedQ2 / 1_000).toFixed(0)}k</span>
        </div>
      </div>
    </div>
  );
}
