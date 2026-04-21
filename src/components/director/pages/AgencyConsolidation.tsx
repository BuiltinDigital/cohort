'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RAGBadge } from '@/components/ui/RAGBadge';
import {
  agencyGroups,
  agencyConsolidationSummary,
} from '@/lib/data/director/agencyConsolidation';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Helpers ─────────────────────────────────────────────────────── */

const priorityStyles = {
  grow: { bg: 'bg-good/15', text: 'text-good', border: 'border-good/20', label: 'Grow' },
  maintain: { bg: 'bg-sky/15', text: 'text-sky', border: 'border-sky/20', label: 'Maintain' },
  defend: { bg: 'bg-warn/15', text: 'text-warn', border: 'border-warn/20', label: 'Defend' },
} as const;

/* ─── Component ───────────────────────────────────────────────────── */

export function AgencyConsolidation({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const sum = agencyConsolidationSummary;
  const maxSpend = Math.max(...agencyGroups.map((g) => g.totalUKPublisherSpend));

  return (
    <div className="animate-fade-up">
      {/* ── Summary Metrics ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Agency Groups Tracked"
          value={String(sum.totalAgencyGroupsTracked)}
          sub="Tier-1 holding companies"
        />
        <MetricCard
          label="Total Immediate Spend"
          value={formatCurrency(sum.totalImmediateSpendAcrossGroups, true)}
          sub="Across all groups"
        />
        <MetricCard
          label="Average Share of Wallet"
          value={`${sum.averageSoW}%`}
          sub={
            <>
              Highest: {sum.highestSoW.group} ({sum.highestSoW.sow}%)
            </>
          }
          subColor="good"
        />
        <MetricCard
          label="Biggest Opportunity"
          value={sum.biggestOpportunity.group}
          sub={sum.biggestOpportunity.rationale}
          subColor="warn"
        />
      </div>

      {/* ── Upcoming Reviews ──────────────────────────────────────── */}
      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="font-display font-[800] text-[16px] text-navy mb-3">
          Upcoming Agency Reviews
        </div>
        <div className="flex flex-wrap gap-3">
          {sum.upcomingReviews.map((r) => (
            <div
              key={r.group}
              className="bg-off border border-line rounded-lg px-4 py-3 flex items-center gap-3"
            >
              <div className="font-display font-[800] text-[15px] text-navy">{r.group}</div>
              <div className="font-mono text-[11px] text-muted">{r.date}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── Agency Group Cards ────────────────────────────────────── */}
      <SectionHeading title="Agency Group Overview" count={agencyGroups.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
        {agencyGroups.map((group) => {
          const ps = priorityStyles[group.strategicPriority];
          const immPct = (group.immediateSpend / group.totalUKPublisherSpend) * 100;
          const restPct = 100 - immPct;

          return (
            <div
              key={group.group}
              className={cn(
                'bg-paper border border-line rounded-xl p-5',
                'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.08)] transition-all',
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="font-display font-[900] text-[24px] text-navy leading-none">
                    {group.group}
                  </div>
                  <div className="text-[11px] text-muted mt-1">
                    Teams: {group.teamsServing.join(', ')} &middot; Next review:{' '}
                    <span className="font-mono">{group.nextReview}</span>
                  </div>
                </div>
                <span
                  className={cn(
                    'text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded border',
                    ps.bg,
                    ps.text,
                    ps.border,
                  )}
                >
                  {ps.label}
                </span>
              </div>

              {/* KPIs */}
              <div className="grid grid-cols-4 gap-3 mb-4">
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    UK Publisher Spend
                  </div>
                  <div className="font-display font-[800] text-[18px] text-navy leading-none">
                    {formatCurrency(group.totalUKPublisherSpend, true)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Immediate Spend
                  </div>
                  <div className="font-display font-[800] text-[18px] text-sky leading-none">
                    {formatCurrency(group.immediateSpend, true)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Share of Wallet
                  </div>
                  <div className="font-display font-[800] text-[18px] text-navy leading-none">
                    {group.shareOfWallet}%
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    YoY Delta
                  </div>
                  <div
                    className={cn(
                      'font-display font-[800] text-[18px] leading-none',
                      group.yoyDelta > 0 ? 'text-good' : group.yoyDelta < 0 ? 'text-risk' : 'text-muted',
                    )}
                  >
                    {group.yoyDelta > 0 ? '+' : ''}
                    {group.yoyDelta}pp
                  </div>
                </div>
              </div>

              {/* Stacked bar — Immediate vs rest */}
              <div className="mb-4">
                <div className="flex justify-between text-[10px] text-muted mb-1">
                  <span>Immediate vs rest of publisher spend</span>
                  <span className="font-mono font-semibold text-ink">
                    {group.shareOfWallet}% SoW
                  </span>
                </div>
                <div className="h-[14px] bg-off rounded-full overflow-hidden flex">
                  <div
                    className="h-full bg-sky transition-all duration-500"
                    style={{ width: `${immPct}%` }}
                  />
                  <div
                    className="h-full bg-muted/20 transition-all duration-500"
                    style={{ width: `${restPct}%` }}
                  />
                </div>
                <div className="flex justify-between text-[9px] text-muted mt-1">
                  <span>Immediate {formatCurrency(group.immediateSpend, true)}</span>
                  <span>
                    Others {formatCurrency(group.totalUKPublisherSpend - group.immediateSpend, true)}
                  </span>
                </div>
              </div>

              {/* Top Advertisers */}
              <div className="mb-3">
                <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-2">
                  Top Advertisers
                </div>
                <div className="space-y-1.5">
                  {group.topAdvertisers.map((adv) => {
                    const topSpend = group.topAdvertisers[0].spend;
                    const barW = (adv.spend / topSpend) * 100;
                    return (
                      <div key={adv.name} className="flex items-center gap-2">
                        <div className="w-[100px] text-[11px] font-semibold text-ink truncate">
                          {adv.name}
                        </div>
                        <div className="flex-1 h-[8px] bg-off rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-navy/30 transition-all duration-500"
                            style={{ width: `${barW}%` }}
                          />
                        </div>
                        <div className="w-[52px] text-right font-mono text-[11px] text-ink">
                          {formatCurrency(adv.spend, true)}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Key Contacts */}
              <div>
                <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-1.5">
                  Key Contacts
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {group.keyContacts.map((c) => (
                    <span
                      key={c.name}
                      className="text-[10px] font-semibold bg-off text-muted px-2 py-0.5 rounded"
                      title={c.role}
                    >
                      {c.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
