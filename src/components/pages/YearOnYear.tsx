'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { yoySummary, churnList, retainedGrowth } from '@/lib/data/yoyData';
import { cn, formatCurrency } from '@/lib/utils';

export function YearOnYear({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      {/* ─── Summary Cards ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {/* Retained */}
        <div className="bg-paper border border-line rounded-xl overflow-hidden">
          <div className="h-[4px] bg-good" />
          <div className="p-5">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold mb-2">
              Retained Advertisers
            </div>
            <div className="font-display font-[900] text-[48px] leading-none text-good tracking-[-0.02em] mb-1">
              {yoySummary.retained}
            </div>
            <div className="font-mono text-[13px] text-ink font-semibold mb-[6px]">
              {formatCurrency(yoySummary.retainedValue, true)} retained value
            </div>
            <p className="text-[12px] text-muted leading-[1.5]">
              Advertisers that spent in both Q2 2025 and Q2 2026. Core revenue base is holding strong.
            </p>
          </div>
        </div>

        {/* Lapsed */}
        <div className="bg-paper border border-line rounded-xl overflow-hidden">
          <div className="h-[4px] bg-risk" />
          <div className="p-5">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold mb-2">
              Lapsed Advertisers
            </div>
            <div className="font-display font-[900] text-[48px] leading-none text-risk tracking-[-0.02em] mb-1">
              {yoySummary.lapsed}
            </div>
            <div className="font-mono text-[13px] text-ink font-semibold mb-[6px]">
              {formatCurrency(yoySummary.lapsedValue, true)} churn value
            </div>
            <p className="text-[12px] text-muted leading-[1.5]">
              Spent in Q2 2025 but not yet in Q2 2026. Many still active in market -- recovery opportunity.
            </p>
          </div>
        </div>

        {/* New */}
        <div className="bg-paper border border-line rounded-xl overflow-hidden">
          <div className="h-[4px] bg-[#4AB4E8]" />
          <div className="p-5">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold mb-2">
              New Advertisers
            </div>
            <div className="font-display font-[900] text-[48px] leading-none text-navy tracking-[-0.02em] mb-1">
              {yoySummary.newAdvertisers}
            </div>
            <div className="font-mono text-[13px] text-ink font-semibold mb-[6px]">
              {formatCurrency(yoySummary.newValue, true)} gained value
            </div>
            <p className="text-[12px] text-muted leading-[1.5]">
              First-time Immediate advertisers in Q2 2026. Largest source: programmatic PMP deals.
            </p>
          </div>
        </div>
      </div>

      {/* ─── Churn List ────────────────────────────────────────────────────── */}
      <SectionHeading title="Churn List" count={churnList.length} action="Export CSV" />

      <DataTable
        className="mb-6"
        data={churnList}
        onRowClick={(d) => onNavigate('advertiser', d.id)}
        columns={[
          {
            key: 'name',
            header: 'Advertiser',
            render: (d) => <BrandCell>{d.name}</BrandCell>,
          },
          {
            key: 'agency',
            header: 'Agency',
            render: (d) => <span className="text-muted font-medium">{d.agency}</span>,
          },
          {
            key: 'lostValue',
            header: 'Q2 2025 Spend',
            render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.lostValue, true)}</MonoCell>,
          },
          {
            key: 'lastActive',
            header: 'Last Active',
            render: (d) => <MonoCell>{d.lastActive}</MonoCell>,
          },
          {
            key: 'stillSpending',
            header: 'Still Spending?',
            render: (d) => (
              <StatusDot
                variant={d.stillSpending ? 'ok' : 'cold'}
                label={d.stillSpending ? 'Yes — in market' : 'No'}
              />
            ),
          },
          {
            key: 'recoveryPriority',
            header: 'Recovery Priority',
            render: (d) => (
              <span
                className={cn(
                  'inline-block text-[11px] font-bold px-[10px] py-[3px] rounded-full',
                  d.recoveryPriority === 'high'
                    ? 'bg-risk/10 text-risk'
                    : d.recoveryPriority === 'medium'
                      ? 'bg-warn/10 text-warn'
                      : 'bg-off text-muted'
                )}
              >
                {d.recoveryPriority.charAt(0).toUpperCase() + d.recoveryPriority.slice(1)}
              </span>
            ),
          },
        ]}
      />

      {/* ─── Retained Growth ───────────────────────────────────────────────── */}
      <SectionHeading title="Retained Growth" count={retainedGrowth.length} action="View all retained" />

      <DataTable
        className="mb-6"
        data={retainedGrowth}
        onRowClick={(d) => onNavigate('advertiser', d.id)}
        columns={[
          {
            key: 'name',
            header: 'Advertiser',
            render: (d) => <BrandCell>{d.name}</BrandCell>,
          },
          {
            key: 'agency',
            header: 'Agency',
            render: (d) => <span className="text-muted font-medium">{d.agency}</span>,
          },
          {
            key: 'q2_2025',
            header: 'Q2 2025',
            render: (d) => {
              const q2_2026 = Math.round(200_000 * (1 + d.yoyGrowthPercent / 100));
              const q2_2025 = 200_000;
              return <MonoCell className="font-semibold">{formatCurrency(q2_2025, true)}</MonoCell>;
            },
          },
          {
            key: 'q2_2026',
            header: 'Q2 2026',
            render: (d) => {
              const q2_2026 = Math.round(200_000 * (1 + d.yoyGrowthPercent / 100));
              return <MonoCell className="font-semibold">{formatCurrency(q2_2026, true)}</MonoCell>;
            },
          },
          {
            key: 'yoyGrowth',
            header: 'Delta YoY',
            render: (d) => (
              <span className={cn('font-mono text-[12px] font-semibold', d.yoyGrowthPercent >= 0 ? 'text-good' : 'text-risk')}>
                {d.yoyGrowthPercent >= 0 ? '+' : ''}{d.yoyGrowthPercent}%
              </span>
            ),
          },
          {
            key: 'owner',
            header: 'Owner',
            render: (d) => {
              const ownerMap: Record<string, string> = {
                Starcom: 'Alicia',
                Zenith: 'Renita',
                OMD: 'James',
                PHD: 'Alicia',
              };
              return <span className="text-ink font-medium">{ownerMap[d.agency] ?? 'Unassigned'}</span>;
            },
          },
        ]}
      />
    </div>
  );
}
