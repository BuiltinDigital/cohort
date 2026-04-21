'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { brandPnLs, portfolioSummary } from '@/lib/data/director/brandPortfolio';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Chart data ──────────────────────────────────────────────────── */

const chartData = brandPnLs.map((b) => ({
  brand: b.brand.replace('BBC ', '').replace("Gardeners' ", "Gard' "),
  'Ad Revenue': b.adRevenue / 1_000_000,
  'Subscription Revenue': b.subscriptionRevenue / 1_000_000,
  'Total Cost': b.totalCost / 1_000_000,
}));

/* ─── Trend badge ─────────────────────────────────────────────────── */

function TrendBadge({ trend }: { trend: 'growing' | 'stable' | 'declining' }) {
  const styles = {
    growing: 'bg-good/15 text-good',
    stable: 'bg-sky/15 text-sky',
    declining: 'bg-risk/15 text-risk',
  };
  const arrows = { growing: '\u2191', stable: '\u2192', declining: '\u2193' };

  return (
    <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', styles[trend])}>
      {arrows[trend]} {trend.charAt(0).toUpperCase() + trend.slice(1)}
    </span>
  );
}

/* ─── Component ───────────────────────────────────────────────────── */

export function BrandPnL({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const sum = portfolioSummary;

  const columns = [
    {
      key: 'brand',
      header: 'Brand',
      render: (b: (typeof brandPnLs)[number]) => <BrandCell>{b.brand}</BrandCell>,
    },
    {
      key: 'adRevenue',
      header: 'Ad Revenue',
      render: (b: (typeof brandPnLs)[number]) => (
        <MonoCell>{formatCurrency(b.adRevenue, true)}</MonoCell>
      ),
    },
    {
      key: 'subRevenue',
      header: 'Subscription',
      render: (b: (typeof brandPnLs)[number]) => (
        <MonoCell>{formatCurrency(b.subscriptionRevenue, true)}</MonoCell>
      ),
    },
    {
      key: 'totalRevenue',
      header: 'Total Revenue',
      render: (b: (typeof brandPnLs)[number]) => (
        <MonoCell className="font-bold">{formatCurrency(b.totalRevenue, true)}</MonoCell>
      ),
    },
    {
      key: 'editorial',
      header: 'Editorial',
      render: (b: (typeof brandPnLs)[number]) => (
        <MonoCell className="text-muted">{formatCurrency(b.editorialCost, true)}</MonoCell>
      ),
    },
    {
      key: 'production',
      header: 'Production',
      render: (b: (typeof brandPnLs)[number]) => (
        <MonoCell className="text-muted">{formatCurrency(b.productionCost, true)}</MonoCell>
      ),
    },
    {
      key: 'contribution',
      header: 'Contribution',
      render: (b: (typeof brandPnLs)[number]) => (
        <MonoCell className="font-bold text-good">{formatCurrency(b.contributionMargin, true)}</MonoCell>
      ),
    },
    {
      key: 'margin',
      header: 'Margin %',
      render: (b: (typeof brandPnLs)[number]) => (
        <span
          className={cn(
            'font-mono text-[12px] font-bold',
            b.contributionPercent >= 65 ? 'text-good' : b.contributionPercent >= 50 ? 'text-warn' : 'text-risk',
          )}
        >
          {b.contributionPercent}%
        </span>
      ),
    },
    {
      key: 'trend',
      header: 'Trend',
      render: (b: (typeof brandPnLs)[number]) => <TrendBadge trend={b.trend} />,
    },
  ];

  return (
    <div className="animate-fade-up">
      {/* ── Summary Metrics ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-6">
        <MetricCard
          label="Total Portfolio Revenue"
          value={formatCurrency(sum.totalPortfolioRevenue, true)}
          sub="Ad + Subscription"
        />
        <MetricCard
          label="Ad Revenue"
          value={formatCurrency(sum.totalAdRevenue, true)}
          sub={`${Math.round((sum.totalAdRevenue / sum.totalPortfolioRevenue) * 100)}% of total`}
        />
        <MetricCard
          label="Subscription Revenue"
          value={formatCurrency(sum.totalSubscriptionRevenue, true)}
          sub={`${Math.round((sum.totalSubscriptionRevenue / sum.totalPortfolioRevenue) * 100)}% of total`}
        />
        <MetricCard
          label="Total Contribution"
          value={formatCurrency(sum.totalContributionMargin, true)}
          sub="After editorial + production"
          subColor="good"
        />
        <MetricCard
          label="Blended Margin"
          value={`${sum.blendedContributionPercent}%`}
          sub={
            <>
              Best: {sum.highestMarginBrand} &middot; Worst: {sum.lowestMarginBrand}
            </>
          }
        />
      </div>

      {/* ── Stacked Bar Chart ────────────────────────────────────── */}
      <SectionHeading title="Revenue vs Cost by Brand" />
      <div className="bg-paper border border-line rounded-xl p-6 mb-6">
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="#E2E6EC" />
            <XAxis
              dataKey="brand"
              tick={{ fontSize: 11, fill: '#6B7A93', fontWeight: 600 }}
              axisLine={{ stroke: '#E2E6EC' }}
            />
            <YAxis
              tick={{ fontSize: 11, fill: '#6B7A93' }}
              axisLine={{ stroke: '#E2E6EC' }}
              tickFormatter={(v) => `\u00A3${v}m`}
            />
            <Tooltip
              contentStyle={{
                borderRadius: 10,
                border: '1px solid #E2E6EC',
                fontSize: 12,
                fontFamily: 'monospace',
              }}
              formatter={(value) => [`£${Number(value).toFixed(1)}m`, undefined]}
            />
            <Legend
              iconType="circle"
              wrapperStyle={{ fontSize: 11, fontWeight: 600 }}
            />
            <Bar dataKey="Ad Revenue" stackId="rev" fill="#4AB4E8" radius={[0, 0, 0, 0]} />
            <Bar dataKey="Subscription Revenue" stackId="rev" fill="#0E2A5C" radius={[4, 4, 0, 0]} />
            <Bar dataKey="Total Cost" fill="#E53E5C" opacity={0.5} radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── P&L Table ─────────────────────────────────────────────── */}
      <SectionHeading title="Brand P&L Detail" count={brandPnLs.length} />
      <DataTable columns={columns} data={brandPnLs} />
    </div>
  );
}
