'use client';

import {
  revenueWaterfall,
  waterfallGaps,
  uninvoicedRevenue,
  revenueCloseSummary,
  type UninvoicedRevenue,
} from '@/lib/data/director/revenueClose';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell, LabelList,
} from 'recharts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from '@/components/ui/MetricCard';
import { StatusDot } from '@/components/ui/StatusDot';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { cn, formatCurrency } from '@/lib/utils';

const COLORS = {
  sky: '#4AB4E8',
  navy: '#0E2A5C',
  good: '#1DB77A',
  warn: '#FF9D2E',
  risk: '#E53E5C',
  muted: '#6B7A93',
};

const barColors = ['#4AB4E8', '#0E2A5C', '#6B7A93', '#1DB77A'];

const statusMap: Record<string, 'ok' | 'warn' | 'risk'> = {
  pending: 'warn',
  blocked: 'risk',
  'in-review': 'warn',
};

export function RevenueClose({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">

      {/* ─── KEY METRICS ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Total Booked"
          value={formatCurrency(revenueCloseSummary.bookedTotal, true)}
          sub="FY 2026 to date"
          subColor="muted"
        />
        <MetricCard
          label="Collected"
          value={formatCurrency(revenueCloseSummary.collectedTotal, true)}
          sub={`${revenueCloseSummary.collectionRate}% collection rate`}
          subColor="good"
        />
        <MetricCard
          label="Collection Rate"
          value={`${revenueCloseSummary.collectionRate}%`}
          sub={`DSO avg ${revenueCloseSummary.dsoAverage} days`}
          subColor="muted"
        />
        <MetricCard
          label="Uninvoiced"
          value={formatCurrency(revenueCloseSummary.uninvoicedTotal, true)}
          sub="Delivered but not yet invoiced"
          subColor="warn"
        />
      </div>

      {/* ─── REVENUE WATERFALL ────────────────────────────────────────────── */}
      <SectionHeading title="Revenue Waterfall" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-4">
        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={revenueWaterfall} margin={{ top: 20, right: 30, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="stage"
                tick={{ fill: COLORS.navy, fontSize: 12, fontWeight: 600 }}
              />
              <YAxis
                tickFormatter={(v) => `£${(v / 1_000_000).toFixed(0)}m`}
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value), true), 'Amount']}
                contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Bar dataKey="amount" radius={[6, 6, 0, 0]} barSize={60}>
                {revenueWaterfall.map((entry, i) => (
                  <Cell key={entry.stage} fill={barColors[i]} />
                ))}
                <LabelList
                  dataKey="amount"
                  position="top"
                  formatter={(v) => formatCurrency(Number(v), true)}
                  style={{ fill: COLORS.navy, fontSize: 12, fontWeight: 700 }}
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Gap breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-6">
        {waterfallGaps.map((gap) => (
          <div key={gap.from + gap.to} className="bg-paper border border-line rounded-xl p-4">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold mb-2">
              {gap.from} to {gap.to}
            </div>
            <div className="font-display font-[800] text-[26px] text-risk leading-none mb-1">
              -{formatCurrency(gap.gap, true)}
            </div>
            <div className="font-mono text-[11px] text-muted mb-3">
              {gap.gapPercent}% drop-off
            </div>
            <div className="space-y-1">
              {gap.drivers.map((driver, i) => (
                <div key={i} className="text-[11px] text-ink leading-snug">
                  &bull; {driver}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ─── UNINVOICED REVENUE TABLE ─────────────────────────────────────── */}
      <SectionHeading title="Uninvoiced Revenue" count={uninvoicedRevenue.length} />

      <DataTable<UninvoicedRevenue>
        className="mb-6"
        data={uninvoicedRevenue}
        columns={[
          {
            key: 'client',
            header: 'Client',
            render: (d) => <BrandCell>{d.client}</BrandCell>,
          },
          {
            key: 'amount',
            header: 'Amount',
            render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.amount, true)}</MonoCell>,
          },
          {
            key: 'daysDelivered',
            header: 'Days Delivered',
            render: (d) => (
              <MonoCell className={cn('font-semibold', d.daysDelivered > 21 ? 'text-risk' : 'text-ink')}>
                {d.daysDelivered}d
              </MonoCell>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (d) => (
              <StatusDot
                variant={statusMap[d.status] || 'warn'}
                label={d.status.charAt(0).toUpperCase() + d.status.slice(1)}
              />
            ),
          },
          {
            key: 'reason',
            header: 'Reason',
            render: (d) => <span className="text-[12px] text-muted">{d.reason}</span>,
          },
        ]}
      />
    </div>
  );
}
