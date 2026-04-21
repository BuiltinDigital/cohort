'use client';

import {
  agedDebtSummary,
  agedDebtEntries,
  redFlags,
  type AgedDebtEntry,
} from '@/lib/data/director/agedDebt';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from '@/components/ui/MetricCard';
import { StatusDot } from '@/components/ui/StatusDot';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { cn, formatCurrency } from '@/lib/utils';

export function AgedDebt({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">

      {/* ─── SUMMARY CARDS ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mb-6">
        <MetricCard
          label="Total Outstanding"
          value={formatCurrency(agedDebtSummary.totalOutstanding, true)}
          sub={`${agedDebtSummary.overduePct}% overdue`}
          subColor="warn"
        />
        <MetricCard
          label="Current"
          value={formatCurrency(agedDebtSummary.current, true)}
          sub="Not yet due"
          subColor="good"
        />
        <MetricCard
          label="30-Day"
          value={formatCurrency(agedDebtSummary.days30, true)}
          sub="1-30 days overdue"
          subColor="warn"
        />
        <MetricCard
          label="60-Day"
          value={formatCurrency(agedDebtSummary.days60, true)}
          sub="31-60 days overdue"
          subColor="warn"
        />
        <MetricCard
          label="90+ Day"
          value={formatCurrency(agedDebtSummary.days90Plus, true)}
          sub="Requires escalation"
          subColor="risk"
          className="border-risk/40"
        />
      </div>

      {/* ─── AGED DEBT TABLE ──────────────────────────────────────────────── */}
      <SectionHeading title="Aged Debt by Client" count={agedDebtEntries.length} />

      <div className="bg-paper border border-line rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                {['Client', 'Agency', 'Total Owed', 'Current', '30d', '60d', '90+', 'Last Payment', 'Pipeline?'].map(h => (
                  <th
                    key={h}
                    className="text-left px-5 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {agedDebtEntries.map((entry, i) => {
                const hasHighAged = entry.days90Plus > 0;
                const owingWithPipeline = (entry.days60 > 0 || entry.days90Plus > 0) && entry.hasPipeline;

                return (
                  <tr
                    key={i}
                    className={cn(
                      'border-b border-line-soft last:border-b-0 transition-colors',
                      hasHighAged && 'bg-risk/[0.03] border-l-[3px] border-l-risk'
                    )}
                  >
                    <td className="px-5 py-[14px] align-middle">
                      <span className="font-display font-bold text-[15px] text-navy">{entry.client}</span>
                    </td>
                    <td className="px-5 py-[14px] align-middle text-muted text-[12px]">{entry.agency}</td>
                    <td className="px-5 py-[14px] align-middle">
                      <span className="font-mono text-[12px] font-semibold text-navy">
                        {formatCurrency(entry.totalOwed, true)}
                      </span>
                    </td>
                    <td className="px-5 py-[14px] align-middle">
                      <span className="font-mono text-[12px] text-ink">
                        {entry.current > 0 ? formatCurrency(entry.current, true) : '--'}
                      </span>
                    </td>
                    <td className="px-5 py-[14px] align-middle">
                      <span className={cn('font-mono text-[12px]', entry.days30 > 0 ? 'text-warn font-semibold' : 'text-muted')}>
                        {entry.days30 > 0 ? formatCurrency(entry.days30, true) : '--'}
                      </span>
                    </td>
                    <td className="px-5 py-[14px] align-middle">
                      <span className={cn('font-mono text-[12px]', entry.days60 > 0 ? 'text-warn font-semibold' : 'text-muted')}>
                        {entry.days60 > 0 ? formatCurrency(entry.days60, true) : '--'}
                      </span>
                    </td>
                    <td className="px-5 py-[14px] align-middle">
                      <span className={cn('font-mono text-[12px]', entry.days90Plus > 0 ? 'text-risk font-bold' : 'text-muted')}>
                        {entry.days90Plus > 0 ? formatCurrency(entry.days90Plus, true) : '--'}
                      </span>
                    </td>
                    <td className="px-5 py-[14px] align-middle">
                      <span className="font-mono text-[12px] text-ink">{entry.lastPayment}</span>
                    </td>
                    <td className="px-5 py-[14px] align-middle">
                      {entry.hasPipeline ? (
                        <div>
                          <StatusDot variant={owingWithPipeline ? 'warn' : 'ok'} label="Yes" />
                          {entry.pipelineValue && (
                            <div className="font-mono text-[10px] text-muted mt-1">
                              {formatCurrency(entry.pipelineValue, true)}
                            </div>
                          )}
                        </div>
                      ) : (
                        <StatusDot variant="risk" label="No pipeline" />
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── RED FLAGS (90+ DAYS) ─────────────────────────────────────────── */}
      <SectionHeading title="Escalation Required" count={redFlags.length} />

      <div className="space-y-3 mb-6">
        {redFlags.map((flag) => (
          <div key={flag.client} className="bg-risk/5 border border-risk/20 rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <div className="font-display font-bold text-[16px] text-navy">{flag.client}</div>
              <div className="font-display font-[800] text-[24px] text-risk leading-none">
                {formatCurrency(flag.days90Plus, true)}
                <span className="text-[11px] font-semibold text-muted ml-1">90+ days</span>
              </div>
            </div>
            <div className="flex items-center gap-3 mb-2">
              <span className="font-mono text-[12px] text-ink">Total: {formatCurrency(flag.totalOwed, true)}</span>
              {flag.hasPipeline ? (
                <StatusDot variant="warn" label={`Pipeline: ${formatCurrency(flag.pipelineValue || 0, true)}`} />
              ) : (
                <StatusDot variant="risk" label="No active pipeline" />
              )}
            </div>
            <div className="text-[12px] text-ink font-medium">
              {flag.action}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
