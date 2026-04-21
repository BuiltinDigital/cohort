'use client';

import { useState } from 'react';
import {
  teamMargins,
  teamMarginSummary,
  clientMargins,
  brandMargins,
  type TeamMargin,
  type ClientMargin,
  type BrandMargin,
} from '@/lib/data/director/margins';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { TabGroup } from '@/components/ui/TabGroup';
import { cn, formatCurrency, formatPercent } from '@/lib/utils';

const COLORS = {
  sky: '#4AB4E8',
  navy: '#0E2A5C',
  good: '#1DB77A',
  warn: '#FF9D2E',
  risk: '#E53E5C',
  muted: '#6B7A93',
};

const tabs = ['By Team', 'By Client', 'By Brand'];

const teamChartData = teamMargins.map(t => ({
  name: t.manager,
  revenue: t.revenue,
  cost: t.costOfDelivery,
  commission: t.commission,
  margin: t.grossMarginPercent,
}));

export function MarginAnalysis({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [activeTab, setActiveTab] = useState('By Team');

  return (
    <div className="animate-fade-up">

      {/* ─── TAB GROUP ────────────────────────────────────────────────────── */}
      <TabGroup
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {/* ─── BY TEAM ──────────────────────────────────────────────────────── */}
      {activeTab === 'By Team' && (
        <>
          {/* Summary */}
          <div className="bg-paper border border-line rounded-xl p-4 mb-5">
            <div className="flex items-baseline gap-3">
              <span className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold">Blended Margin</span>
              <span className="font-display font-[800] text-[36px] text-navy leading-none">
                {teamMarginSummary.blendedMarginPercent}%
              </span>
              <span className="font-mono text-[12px] text-muted">
                {formatCurrency(teamMarginSummary.totalGrossMargin, true)} / {formatCurrency(teamMarginSummary.totalRevenue, true)}
              </span>
            </div>
          </div>

          {/* Team Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mb-5">
            {teamMargins.map((t) => (
              <div key={t.manager} className="bg-paper border border-line rounded-xl p-5">
                <div className="font-display font-[800] text-[18px] text-navy mb-3">{t.manager}</div>
                <div className="space-y-2">
                  <div className="flex justify-between text-[12px]">
                    <span className="text-muted">Revenue</span>
                    <span className="font-mono font-semibold text-ink">{formatCurrency(t.revenue, true)}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-muted">Cost of Delivery</span>
                    <span className="font-mono font-semibold text-ink">{formatCurrency(t.costOfDelivery, true)}</span>
                  </div>
                  <div className="flex justify-between text-[12px]">
                    <span className="text-muted">Commission</span>
                    <span className="font-mono font-semibold text-ink">{formatCurrency(t.commission, true)}</span>
                  </div>
                  <div className="border-t border-line pt-2 flex justify-between text-[12px]">
                    <span className="font-semibold text-navy">Gross Margin</span>
                    <span className="font-mono font-bold text-navy">{formatCurrency(t.grossMargin, true)}</span>
                  </div>
                </div>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className={cn(
                    'font-display font-[800] text-[30px] leading-none',
                    t.grossMarginPercent >= 42 ? 'text-good' :
                    t.grossMarginPercent >= 38 ? 'text-navy' :
                    'text-warn'
                  )}>
                    {t.grossMarginPercent}%
                  </span>
                  <span className="text-[11px] text-muted font-semibold">margin</span>
                </div>
              </div>
            ))}
          </div>

          {/* Team Margin Chart */}
          <SectionHeading title="Margin Comparison" />
          <div className="bg-paper border border-line rounded-xl p-5 mb-6">
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={teamChartData} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: COLORS.navy, fontSize: 12, fontWeight: 600 }} />
                  <YAxis
                    tickFormatter={(v) => `£${(v / 1_000_000).toFixed(1)}m`}
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                  />
                  <Tooltip
                    formatter={(value, name) => [formatCurrency(Number(value), true), name]}
                    contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
                  <Bar dataKey="revenue" fill={COLORS.sky} radius={[4, 4, 0, 0]} name="Revenue" />
                  <Bar dataKey="cost" fill={COLORS.warn} radius={[4, 4, 0, 0]} name="Cost" />
                  <Bar dataKey="commission" fill={COLORS.muted} radius={[4, 4, 0, 0]} name="Commission" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </>
      )}

      {/* ─── BY CLIENT ────────────────────────────────────────────────────── */}
      {activeTab === 'By Client' && (
        <>
          <SectionHeading title="Top 10 Clients by Margin" />
          <DataTable<ClientMargin>
            className="mb-6"
            data={clientMargins}
            columns={[
              {
                key: 'client',
                header: 'Client',
                render: (c) => <BrandCell>{c.client}</BrandCell>,
              },
              {
                key: 'revenue',
                header: 'Revenue',
                render: (c) => <MonoCell className="font-semibold">{formatCurrency(c.revenue, true)}</MonoCell>,
              },
              {
                key: 'cost',
                header: 'Cost',
                render: (c) => <MonoCell>{formatCurrency(c.costOfDelivery, true)}</MonoCell>,
              },
              {
                key: 'commission',
                header: 'Commission',
                render: (c) => <MonoCell>{formatCurrency(c.commission, true)}</MonoCell>,
              },
              {
                key: 'margin',
                header: 'Margin',
                render: (c) => <MonoCell className="font-semibold">{formatCurrency(c.grossMargin, true)}</MonoCell>,
              },
              {
                key: 'marginPct',
                header: 'Margin %',
                render: (c) => (
                  <span className={cn(
                    'font-mono text-[12px] font-bold',
                    c.grossMarginPercent >= 45 ? 'text-good' :
                    c.grossMarginPercent >= 35 ? 'text-navy' :
                    'text-risk'
                  )}>
                    {c.grossMarginPercent}%
                  </span>
                ),
              },
              {
                key: 'trend',
                header: 'Trend',
                render: (c) => (
                  <span className={cn(
                    'text-[11px] font-semibold px-2 py-[3px] rounded-md',
                    c.trend === 'improving' ? 'bg-good/10 text-good' :
                    c.trend === 'declining' ? 'bg-risk/10 text-risk' :
                    'bg-muted/10 text-muted'
                  )}>
                    {c.trend === 'improving' ? 'Improving' :
                     c.trend === 'declining' ? 'Declining' : 'Stable'}
                  </span>
                ),
              },
            ]}
          />
        </>
      )}

      {/* ─── BY BRAND ─────────────────────────────────────────────────────── */}
      {activeTab === 'By Brand' && (
        <>
          <SectionHeading title="Brand Contribution Analysis" />
          <DataTable<BrandMargin>
            className="mb-6"
            data={brandMargins}
            columns={[
              {
                key: 'brand',
                header: 'Brand',
                render: (b) => <BrandCell>{b.brand}</BrandCell>,
              },
              {
                key: 'adRevenue',
                header: 'Ad Revenue',
                render: (b) => <MonoCell className="font-semibold">{formatCurrency(b.adRevenue, true)}</MonoCell>,
              },
              {
                key: 'editorialCost',
                header: 'Editorial Cost',
                render: (b) => <MonoCell>{formatCurrency(b.editorialCost, true)}</MonoCell>,
              },
              {
                key: 'contribution',
                header: 'Contribution',
                render: (b) => <MonoCell className="font-semibold">{formatCurrency(b.contribution, true)}</MonoCell>,
              },
              {
                key: 'contributionPct',
                header: 'Contribution %',
                render: (b) => (
                  <div className="flex items-center gap-2">
                    <div className="w-[60px] h-[6px] bg-line rounded overflow-hidden">
                      <div
                        className={cn(
                          'h-full rounded',
                          b.contributionPercent >= 50 ? 'bg-good' :
                          b.contributionPercent >= 40 ? 'bg-sky' :
                          'bg-warn'
                        )}
                        style={{ width: `${b.contributionPercent}%` }}
                      />
                    </div>
                    <span className={cn(
                      'font-mono text-[12px] font-bold',
                      b.contributionPercent >= 50 ? 'text-good' :
                      b.contributionPercent >= 40 ? 'text-navy' :
                      'text-warn'
                    )}>
                      {b.contributionPercent}%
                    </span>
                  </div>
                ),
              },
            ]}
          />
        </>
      )}
    </div>
  );
}
