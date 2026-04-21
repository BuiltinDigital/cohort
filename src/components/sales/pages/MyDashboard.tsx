'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RiskCard } from '@/components/ui/RiskCard';
import { myKPIs } from '@/lib/data/sales/myPerformance';
import { cn } from '@/lib/utils';

export function MyDashboard({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const kpi = myKPIs;

  return (
    <div className="animate-fade-up">
      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-5 mb-6">
        {/* Personal Hero Card */}
        <div className="bg-gradient-to-br from-sky to-sky-bright rounded-[14px] p-6 lg:p-7 text-paper relative overflow-hidden min-h-[240px]">
          <div className="absolute -top-10 -right-10 w-[180px] h-[180px] border-2 border-white/[0.18] rounded-full" />
          <div className="absolute -bottom-8 -left-4 w-[140px] h-[140px] border border-white/[0.1] rounded-full" />

          <div className="relative">
            <div className="text-[11px] tracking-[0.15em] uppercase font-semibold opacity-90 mb-1">
              My Dashboard
            </div>
            <div className="font-display font-[900] text-[32px] leading-none mb-[14px]">
              {kpi.name}
            </div>

            <div className="flex items-baseline gap-[14px] mb-[14px]">
              <div className="font-display font-[900] text-[86px] leading-[0.85] tracking-[-0.03em]">
                {kpi.deliveryScore}
              </div>
              <div>
                <div className="font-display font-bold text-[20px]">Delivery Score</div>
                <div className="text-[12px] opacity-85">
                  +{kpi.deliveryScoreDelta} pts past 7 days &middot; On track
                </div>
              </div>
            </div>

            <div className="flex gap-3 items-center pt-[14px] border-t border-white/[0.18]">
              <span className="text-[10px] font-bold tracking-[0.1em] uppercase bg-white/20 px-2 py-[3px] rounded">
                Publicis
              </span>
              <span className="text-[12px] opacity-90">
                Starcom &middot; Zenith &middot; Spark Foundry &middot; Digitas
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard
            label="Delivered Q2"
            value={`\u00A3${(kpi.deliveredQ2 / 1_000_000).toFixed(1)}`}
            unit="m"
            sub={<><strong className="text-ink">{kpi.percentOfTarget}%</strong> of &pound;{(kpi.targetQ2 / 1_000_000).toFixed(1)}m target</>}
          />
          <MetricCard
            label="Pipeline (Weighted)"
            value={`\u00A3${(kpi.pipelineWeighted / 1_000_000).toFixed(1)}`}
            unit="m"
            sub={<><strong className="text-ink">{kpi.dealsInPipeline}</strong> deals in pipeline</>}
          />
          <MetricCard
            label="Commission Earned"
            value={`\u00A3${(kpi.commissionEarned / 1_000).toFixed(0)}`}
            unit="k"
            sub={<><strong className="text-ink">{Math.round((kpi.commissionEarned / kpi.commissionTarget) * 100)}%</strong> of &pound;{(kpi.commissionTarget / 1_000).toFixed(0)}k target</>}
            subColor="good"
          />
          <MetricCard
            label="Active Campaigns"
            value={String(kpi.activeCampaigns)}
            sub={<><strong className="text-ink">{kpi.atRiskCampaigns}</strong> at risk</>}
            subColor={kpi.atRiskCampaigns > 0 ? 'warn' : 'muted'}
          />
        </div>
      </div>

      {/* Campaigns at Risk */}
      <SectionHeading
        title="My Campaigns at Risk"
        count={1}
        action="View all campaigns →"
        onAction={() => onNavigate('my-campaigns')}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] mb-6">
        <RiskCard
          variant="alert"
          owner="Alicia"
          agency="Starcom"
          campaign="Audi — Easter Drive"
          client="Direct + Programmatic · £180k"
          delivered={42100}
          target={63000}
          deltaLabel="-33%"
          actionLabel="Reallocate inventory"
          impactLabel="+18%"
          onClick={() => onNavigate('my-campaigns')}
        />
      </div>

      {/* Weekly Snapshot */}
      <SectionHeading title="This Week" action="View activity →" onAction={() => onNavigate('weekly-activity')} />

      <div className="grid grid-cols-3 gap-3 mb-6">
        <div className="bg-paper border border-line rounded-[10px] p-4 text-center">
          <div className="font-display font-[800] text-[30px] text-navy leading-none mb-1">
            {kpi.meetingsThisWeek}
          </div>
          <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold">
            Meetings
          </div>
        </div>
        <div className="bg-paper border border-line rounded-[10px] p-4 text-center">
          <div className="font-display font-[800] text-[30px] text-navy leading-none mb-1">
            {kpi.proposalsSent}
          </div>
          <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold">
            Proposals Sent
          </div>
        </div>
        <div className="bg-paper border border-line rounded-[10px] p-4 text-center">
          <div className="font-display font-[800] text-[30px] text-navy leading-none mb-1">
            2
          </div>
          <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold">
            Deals Progressed
          </div>
        </div>
      </div>

      {/* Q2 Target Progress */}
      <SectionHeading title="Q2 Target Progress" />

      <div className="bg-paper border border-line rounded-xl p-5">
        <div className="flex justify-between items-baseline mb-3">
          <div>
            <span className="font-display font-[800] text-[22px] text-navy">
              &pound;{(kpi.deliveredQ2 / 1_000_000).toFixed(1)}m
            </span>
            <span className="text-[13px] text-muted ml-2">
              of &pound;{(kpi.targetQ2 / 1_000_000).toFixed(1)}m target
            </span>
          </div>
          <span className={cn(
            'font-mono text-[13px] font-semibold',
            kpi.percentOfTarget >= 80 ? 'text-good' : kpi.percentOfTarget >= 60 ? 'text-warn' : 'text-risk'
          )}>
            {kpi.percentOfTarget}%
          </span>
        </div>
        <div className="h-[12px] bg-line rounded-full overflow-hidden relative">
          <div
            className="h-full rounded-full bg-gradient-to-r from-sky to-navy transition-all duration-500"
            style={{ width: `${kpi.percentOfTarget}%` }}
          />
        </div>
        <div className="flex justify-between text-[11px] text-muted mt-2">
          <span>&pound;0</span>
          <span>&pound;{(kpi.targetQ2 / 1_000_000).toFixed(1)}m</span>
        </div>
      </div>
    </div>
  );
}
