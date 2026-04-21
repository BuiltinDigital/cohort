'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { directorTeams, salesTotal } from '@/lib/data/director/teams';
import { portfolioKPIs } from '@/lib/data/director/portfolio';
import { strategicRisks } from '@/lib/data/director/strategicRisks';
import { cn, formatCurrency } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Executive Overview  --  Director Home                              */
/* ------------------------------------------------------------------ */

const severityStyles = {
  critical: 'bg-risk/15 text-risk border-risk/20',
  high: 'bg-warn/15 text-warn border-warn/20',
  medium: 'bg-warn/10 text-warn border-warn/15',
} as const;

const severityPill = {
  critical: 'bg-risk text-paper',
  high: 'bg-warn text-paper',
  medium: 'bg-warn/30 text-warn',
} as const;

const trendIcon = {
  worsening: { arrow: '\u2193', color: 'text-risk' },
  stable: { arrow: '\u2192', color: 'text-muted' },
  improving: { arrow: '\u2191', color: 'text-good' },
} as const;

function pctColor(pct: number) {
  if (pct >= 95) return 'text-good';
  if (pct >= 85) return 'text-warn';
  return 'text-risk';
}

export function ExecutiveOverview({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const kpi = portfolioKPIs;

  return (
    <div className="animate-fade-up">
      {/* ── A) PORTFOLIO HERO ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Delivered Revenue YTD"
          value={formatCurrency(kpi.totalRevenueYTD, true)}
          sub="Business-wide"
        />
        <MetricCard
          label="Delivery Confidence"
          value={String(kpi.deliveryConfidence)}
          sub={
            <>
              <span className="text-good">
                +{kpi.deliveryConfidenceDelta} pts
              </span>{' '}
              this quarter
            </>
          }
          subColor="good"
        />
        <MetricCard
          label="Commission Cost"
          value={`${kpi.commissionCostPercent}%`}
          sub={
            kpi.commissionCostPercent > 5 ? (
              <>Above 5% target</>
            ) : (
              <>Within 5% target</>
            )
          }
          subColor={kpi.commissionCostPercent > 5 ? 'warn' : 'good'}
        />
        <MetricCard
          label="Forecast vs Plan"
          value={`${kpi.forecastVsPlan}%`}
          sub={
            <>
              <span className="text-good">
                +{kpi.forecastVsPlanDelta} pts
              </span>{' '}
              vs last month
            </>
          }
          subColor="good"
        />
      </div>

      {/* ── B) TEAM GRID ─────────────────────────────────────── */}
      <SectionHeading title="My Teams" count={directorTeams.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px] mb-6">
        {directorTeams.map((tm) => {
          const barPct = Math.min(
            Math.round((tm.deliveredQ / tm.targetQ) * 100),
            100,
          );
          const barColor =
            tm.percentOfTarget >= 95
              ? '#1DB77A'
              : tm.percentOfTarget >= 85
                ? '#FF9D2E'
                : '#E53E5C';

          return (
            <div
              key={tm.id}
              onClick={() => onNavigate('cross-team', tm.id)}
              className={cn(
                'bg-paper border border-line rounded-xl p-5 cursor-pointer',
                'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.08)] transition-all',
              )}
            >
              {/* Header row */}
              <div className="flex items-center gap-3 mb-4">
                <div
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center text-paper font-display font-[900] text-[18px]"
                  style={{ backgroundColor: tm.avatarColor }}
                >
                  {tm.managerInitial}
                </div>
                <div>
                  <div className="font-display font-[800] text-[22px] text-navy leading-none">
                    {tm.managerName}
                  </div>
                  <div className="text-[11px] text-muted mt-[2px]">
                    {tm.teamSize} salespeople &middot; {tm.agencies}
                  </div>
                </div>
              </div>

              {/* 2x2 metric mini-grid */}
              <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
                {/* Delivered Q */}
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Delivered Q
                  </div>
                  <div className="font-display font-[800] text-[24px] leading-none text-navy">
                    {formatCurrency(tm.deliveredQ, true)}
                  </div>
                </div>
                {/* % of Target */}
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    % of Target
                  </div>
                  <div
                    className={cn(
                      'font-display font-[800] text-[24px] leading-none',
                      pctColor(tm.percentOfTarget),
                    )}
                  >
                    {tm.percentOfTarget}%
                  </div>
                </div>
                {/* Delivery Score */}
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Delivery Score
                  </div>
                  <div className="flex items-baseline gap-1">
                    <span className="font-display font-[800] text-[24px] leading-none text-navy">
                      {tm.deliveryScore}
                    </span>
                    <span
                      className={cn(
                        'text-[12px] font-semibold',
                        tm.deliveryScoreDelta > 0
                          ? 'text-good'
                          : tm.deliveryScoreDelta < 0
                            ? 'text-risk'
                            : 'text-muted',
                      )}
                    >
                      {tm.deliveryScoreDelta > 0
                        ? `\u2191${tm.deliveryScoreDelta}`
                        : tm.deliveryScoreDelta < 0
                          ? `\u2193${Math.abs(tm.deliveryScoreDelta)}`
                          : '\u2192 0'}
                    </span>
                  </div>
                </div>
                {/* Commission Pool */}
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Commission Pool
                  </div>
                  <div className="font-display font-[800] text-[24px] leading-none text-navy">
                    {formatCurrency(tm.commissionPool, true)}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex justify-between text-[11px] text-muted mb-1">
                  <span>Delivered vs Target</span>
                  <span className="font-mono font-semibold text-ink">
                    {barPct}%
                  </span>
                </div>
                <div className="h-[8px] bg-line-soft rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{ width: `${barPct}%`, background: barColor }}
                  />
                </div>
              </div>

              {/* At-risk flag */}
              {tm.atRiskCampaigns > 0 && (
                <div className="flex items-center gap-1.5 text-[11px]">
                  <span className="w-[6px] h-[6px] rounded-full bg-risk inline-block" />
                  <span className="text-risk font-semibold">
                    {tm.atRiskCampaigns} at-risk campaign
                    {tm.atRiskCampaigns > 1 ? 's' : ''}
                  </span>
                </div>
              )}
            </div>
          );
        })}

        {/* Sales Total card */}
        <div
          className={cn(
            'bg-gradient-to-br from-[#0E2A5C] to-[#1A3F7A] rounded-xl p-5 text-paper',
            'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.20)] transition-all',
          )}
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-[42px] h-[42px] rounded-full bg-white/15 flex items-center justify-center font-display font-[900] text-[18px] text-paper">
              \u03A3
            </div>
            <div>
              <div className="font-display font-[800] text-[22px] leading-none">
                Sales Total
              </div>
              <div className="text-[11px] text-white/60 mt-[2px]">
                {salesTotal.teamCount} salespeople &middot; All agencies
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-x-4 gap-y-3 mb-4">
            <div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-white/50 font-semibold mb-[2px]">
                Delivered Q
              </div>
              <div className="font-display font-[800] text-[24px] leading-none">
                {formatCurrency(salesTotal.deliveredQ, true)}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-white/50 font-semibold mb-[2px]">
                % of Target
              </div>
              <div className="font-display font-[800] text-[24px] leading-none">
                {salesTotal.percentOfTarget}%
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-white/50 font-semibold mb-[2px]">
                Delivery Score
              </div>
              <div className="font-display font-[800] text-[24px] leading-none">
                {salesTotal.deliveryScore}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-white/50 font-semibold mb-[2px]">
                Commission Pool
              </div>
              <div className="font-display font-[800] text-[24px] leading-none">
                {formatCurrency(salesTotal.commissionPool, true)}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div>
            <div className="flex justify-between text-[11px] text-white/60 mb-1">
              <span>Delivered vs Target</span>
              <span className="font-mono font-semibold text-paper">
                {Math.round(
                  (salesTotal.deliveredQ / salesTotal.targetQ) * 100,
                )}
                %
              </span>
            </div>
            <div className="h-[8px] bg-white/15 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-500 bg-sky"
                style={{
                  width: `${Math.min(Math.round((salesTotal.deliveredQ / salesTotal.targetQ) * 100), 100)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── C) STRATEGIC RISKS ───────────────────────────────── */}
      <SectionHeading title="Strategic Risks" count={strategicRisks.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-[14px]">
        {strategicRisks.map((risk) => {
          const trend = trendIcon[risk.trend];

          return (
            <div
              key={risk.id}
              className={cn(
                'border rounded-xl p-5 transition-all',
                'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.08)]',
                severityStyles[risk.severity],
              )}
            >
              {/* Severity pill + category */}
              <div className="flex items-center gap-2 mb-3">
                <span
                  className={cn(
                    'inline-block text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-[3px] rounded',
                    severityPill[risk.severity],
                  )}
                >
                  {risk.severity}
                </span>
                <span className="text-[9px] tracking-[0.14em] uppercase font-bold text-muted">
                  {risk.category.replace('-', ' ')}
                </span>
              </div>

              {/* Title */}
              <div className="font-display font-[800] text-[17px] text-navy leading-[1.15] mb-[6px]">
                {risk.title}
              </div>

              {/* Detail */}
              <p className="text-[12px] text-muted leading-[1.55] mb-3">
                {risk.detail}
              </p>

              {/* Metric + trend */}
              <div className="flex items-center gap-2 mb-3">
                <span className="font-mono text-[12px] font-semibold text-ink">
                  {risk.metric}
                </span>
                <span className={cn('text-[13px] font-bold', trend.color)}>
                  {trend.arrow}
                </span>
                <span
                  className={cn(
                    'text-[10px] font-semibold capitalize',
                    trend.color,
                  )}
                >
                  {risk.trend}
                </span>
              </div>

              {/* Owner */}
              <div className="text-[11px] text-muted mb-3">
                Owner: <span className="font-semibold text-ink">{risk.owner}</span>
              </div>

              {/* Action button */}
              <button
                className={cn(
                  'bg-navy text-paper px-3 py-2 rounded-[6px] text-[11px] font-semibold w-full',
                  'flex justify-between items-center hover:bg-sky transition-colors',
                )}
              >
                {risk.recommendedAction}
                <span className="font-mono bg-white/15 px-[6px] py-[2px] rounded text-[10px] ml-2 shrink-0">
                  Action
                </span>
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
