'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import {
  teamCommissions,
  individualCommissions,
  commissionTiers,
  businessWideSummary,
} from '@/lib/data/director/compensation';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Component ───────────────────────────────────────────────────── */

export function CompensationView({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const bw = businessWideSummary;

  /* ── Individual columns ──────────────────────────────────────── */
  const individualColumns = [
    {
      key: 'name',
      header: 'Name',
      render: (i: (typeof individualCommissions)[number]) => <BrandCell>{i.name}</BrandCell>,
    },
    {
      key: 'manager',
      header: 'Manager',
      render: (i: (typeof individualCommissions)[number]) => (
        <span className="text-[13px] text-ink">{i.manager}</span>
      ),
    },
    {
      key: 'role',
      header: 'Role',
      render: (i: (typeof individualCommissions)[number]) => (
        <span className="text-[12px] text-muted">{i.role}</span>
      ),
    },
    {
      key: 'revenue',
      header: 'Revenue',
      render: (i: (typeof individualCommissions)[number]) => (
        <MonoCell>{formatCurrency(i.revenue, true)}</MonoCell>
      ),
    },
    {
      key: 'commission',
      header: 'Commission',
      render: (i: (typeof individualCommissions)[number]) => (
        <MonoCell className="font-bold">{formatCurrency(i.commission, true)}</MonoCell>
      ),
    },
    {
      key: 'pct',
      header: 'Commission %',
      render: (i: (typeof individualCommissions)[number]) => (
        <span
          className={cn(
            'font-mono text-[12px] font-bold',
            i.commissionPercent > 6.0 ? 'text-risk' : i.commissionPercent > 5.0 ? 'text-warn' : 'text-good',
          )}
        >
          {i.commissionPercent}%
        </span>
      ),
    },
    {
      key: 'outlier',
      header: 'Outlier',
      render: (i: (typeof individualCommissions)[number]) =>
        i.isOutlier ? (
          <div>
            <StatusDot variant="risk" label="Flagged" />
            {i.outlierReason && (
              <div className="text-[10px] text-muted mt-0.5 max-w-[200px]">{i.outlierReason}</div>
            )}
          </div>
        ) : (
          <StatusDot variant="ok" label="Normal" />
        ),
    },
  ];

  /* ── Tier columns ────────────────────────────────────────────── */
  const tierColumns = [
    {
      key: 'name',
      header: 'Tier',
      render: (t: (typeof commissionTiers)[number]) => (
        <BrandCell>{t.name}</BrandCell>
      ),
    },
    {
      key: 'range',
      header: 'Revenue Range',
      render: (t: (typeof commissionTiers)[number]) => (
        <MonoCell>{t.revenueRange}</MonoCell>
      ),
    },
    {
      key: 'rate',
      header: 'Rate',
      render: (t: (typeof commissionTiers)[number]) => (
        <MonoCell className="font-bold">{(t.rate * 100).toFixed(1)}%</MonoCell>
      ),
    },
    {
      key: 'teams',
      header: 'Current Teams',
      render: (t: (typeof commissionTiers)[number]) => (
        <span className="text-[12px] text-ink">{t.currentTeams.join(', ')}</span>
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      {/* ── Business-Wide Summary ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Commission"
          value={formatCurrency(bw.totalCommission, true)}
          sub={`${bw.commissionPercent}% of revenue`}
          subColor={bw.commissionPercent > bw.targetPercent ? 'warn' : 'good'}
        />
        <MetricCard
          label="Total Revenue"
          value={formatCurrency(bw.totalRevenue, true)}
          sub="Business-wide"
        />
        <MetricCard
          label="Commission %"
          value={`${bw.commissionPercent}%`}
          sub={
            <>
              Target: {bw.targetPercent}% &middot;{' '}
              <span className={bw.variancePercent > 0 ? 'text-warn' : 'text-good'}>
                {bw.variancePercent > 0 ? '+' : ''}
                {bw.variancePercent}pp variance
              </span>
            </>
          }
          subColor={bw.variancePercent > 0 ? 'warn' : 'good'}
        />
        <MetricCard
          label="Target"
          value={`${bw.targetPercent}%`}
          sub="Of revenue benchmark"
        />
      </div>

      {/* ── Team Commission Cards ─────────────────────────────────── */}
      <SectionHeading title="Team Comparison" count={teamCommissions.length} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[14px] mb-6">
        {teamCommissions.map((tm) => {
          const isOver = tm.commissionPercent > tm.target;
          const barPct = Math.min((tm.commissionPercent / 8) * 100, 100);
          const targetPct = (tm.target / 8) * 100;

          return (
            <div
              key={tm.manager}
              className={cn(
                'bg-paper border rounded-xl p-5 transition-all',
                'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.08)]',
                isOver && tm.variance > 1 ? 'border-risk/30' : 'border-line',
              )}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <div className="font-display font-[900] text-[22px] text-navy leading-none">
                    {tm.manager}
                  </div>
                  <div className="text-[11px] text-muted mt-1">
                    Tier: {tm.tier}
                  </div>
                </div>
                <div className="text-right">
                  <div
                    className={cn(
                      'font-display font-[800] text-[30px] leading-none',
                      isOver && tm.variance > 1 ? 'text-risk' : isOver ? 'text-warn' : 'text-good',
                    )}
                  >
                    {tm.commissionPercent}%
                  </div>
                  <div className="text-[10px] text-muted uppercase tracking-wider mt-1">
                    commission rate
                  </div>
                </div>
              </div>

              {/* Metrics */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Team Revenue
                  </div>
                  <div className="font-display font-[800] text-[18px] text-navy leading-none">
                    {formatCurrency(tm.teamRevenue, true)}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Commission Pool
                  </div>
                  <div className="font-display font-[800] text-[18px] text-navy leading-none">
                    {formatCurrency(tm.commissionPool, true)}
                  </div>
                </div>
              </div>

              {/* Bar with target line */}
              <div className="relative mb-2">
                <div className="h-[14px] bg-off rounded-full overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded-full transition-all duration-500',
                      isOver && tm.variance > 1 ? 'bg-risk' : isOver ? 'bg-warn' : 'bg-good',
                    )}
                    style={{ width: `${barPct}%` }}
                  />
                </div>
                {/* Target marker */}
                <div
                  className="absolute top-0 h-full w-[2px] bg-navy/40"
                  style={{ left: `${targetPct}%` }}
                />
              </div>
              <div className="flex justify-between text-[9px] text-muted">
                <span>
                  Variance:{' '}
                  <span
                    className={cn(
                      'font-mono font-bold',
                      tm.variance > 0 ? 'text-warn' : 'text-good',
                    )}
                  >
                    {tm.variance > 0 ? '+' : ''}
                    {tm.variance}pp
                  </span>
                </span>
                <span className="font-mono">Target: {tm.target}%</span>
              </div>

              {/* Flag */}
              {isOver && tm.variance > 1 && (
                <div className="mt-3 bg-risk/10 border border-risk/20 rounded-lg px-3 py-2">
                  <span className="text-[11px] font-semibold text-risk">
                    Commission exceeds target by {tm.variance}pp -- review required
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── Individual Table ──────────────────────────────────────── */}
      <SectionHeading title="Individual Commission" count={individualCommissions.length} />
      <DataTable
        columns={individualColumns}
        data={individualCommissions}
        className="mb-6"
      />

      {/* ── Tier Structure ────────────────────────────────────────── */}
      <SectionHeading title="Commission Tier Structure" count={commissionTiers.length} />
      <DataTable columns={tierColumns} data={commissionTiers} />
    </div>
  );
}
