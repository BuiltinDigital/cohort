'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from 'recharts';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { contentVsCommercial, portfolioSummary } from '@/lib/data/director/brandPortfolio';
import { cn, formatCurrency } from '@/lib/utils';

/* ─── Chart data ──────────────────────────────────────────────────── */

const chartData = contentVsCommercial.map((b) => ({
  brand: b.brand.replace('BBC ', '').replace("Gardeners' ", "Gard' "),
  'Editorial Budget': b.editorialBudget / 1_000_000,
  'Ad Revenue': b.adRevenueGenerated / 1_000_000,
}));

/* ─── Component ───────────────────────────────────────────────────── */

export function ContentVsCommercial({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const sum = portfolioSummary;
  const totalEditorial = contentVsCommercial.reduce((s, b) => s + b.editorialBudget, 0);
  const totalAdRev = contentVsCommercial.reduce((s, b) => s + b.adRevenueGenerated, 0);
  const avgRatio = totalAdRev / totalEditorial;
  const carryingCount = contentVsCommercial.filter((b) => b.isCarryingWeight).length;

  const columns = [
    {
      key: 'brand',
      header: 'Brand',
      render: (b: (typeof contentVsCommercial)[number]) => <BrandCell>{b.brand}</BrandCell>,
    },
    {
      key: 'editorial',
      header: 'Editorial Budget',
      render: (b: (typeof contentVsCommercial)[number]) => (
        <MonoCell>{formatCurrency(b.editorialBudget, true)}</MonoCell>
      ),
    },
    {
      key: 'adRevenue',
      header: 'Ad Revenue Generated',
      render: (b: (typeof contentVsCommercial)[number]) => (
        <MonoCell className="font-bold">{formatCurrency(b.adRevenueGenerated, true)}</MonoCell>
      ),
    },
    {
      key: 'ratio',
      header: 'Revenue per \u00A31 Spent',
      render: (b: (typeof contentVsCommercial)[number]) => (
        <span
          className={cn(
            'font-mono text-[12px] font-bold',
            b.ratio >= 2.5 ? 'text-good' : b.ratio >= 2.0 ? 'text-warn' : 'text-risk',
          )}
        >
          \u00A3{b.ratio.toFixed(2)}
        </span>
      ),
    },
    {
      key: 'carrying',
      header: 'Carrying Weight?',
      render: (b: (typeof contentVsCommercial)[number]) =>
        b.isCarryingWeight ? (
          <StatusDot variant="ok" label="Yes" />
        ) : (
          <StatusDot variant="risk" label="No" />
        ),
    },
  ];

  return (
    <div className="animate-fade-up">
      {/* ── Summary Metrics ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Editorial Spend"
          value={formatCurrency(totalEditorial, true)}
          sub="Across all brands"
        />
        <MetricCard
          label="Total Ad Revenue"
          value={formatCurrency(totalAdRev, true)}
          sub="Generated from editorial"
          subColor="good"
        />
        <MetricCard
          label="Blended Ratio"
          value={`\u00A3${avgRatio.toFixed(2)}`}
          sub="Revenue per \u00A31 editorial spend"
          subColor={avgRatio >= 2.0 ? 'good' : 'warn'}
        />
        <MetricCard
          label="Carrying Weight"
          value={`${carryingCount}/${contentVsCommercial.length}`}
          sub={
            <>
              Best: {sum.bestCommercialRatio} &middot; Worst: {sum.worstCommercialRatio}
            </>
          }
        />
      </div>

      {/* ── Bar Chart ─────────────────────────────────────────────── */}
      <SectionHeading title="Editorial Spend vs Ad Revenue" />
      <div className="bg-paper border border-line rounded-xl p-6 mb-6">
        <div className="text-[13px] text-muted mb-4">
          Bars show editorial budget alongside ad revenue generated. The break-even line (\u00A32.00 ratio) is the minimum
          threshold for a brand to be &ldquo;carrying its weight&rdquo; commercially.
        </div>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart data={chartData} barCategoryGap="25%">
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
            <Legend iconType="circle" wrapperStyle={{ fontSize: 11, fontWeight: 600 }} />
            <Bar dataKey="Editorial Budget" fill="#E53E5C" opacity={0.5} radius={[4, 4, 0, 0]} />
            <Bar dataKey="Ad Revenue" fill="#4AB4E8" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* ── Ratio Visual ──────────────────────────────────────────── */}
      <SectionHeading title="Commercial Efficiency by Brand" />
      <div className="bg-paper border border-line rounded-xl p-6 mb-6">
        <div className="space-y-4">
          {contentVsCommercial
            .sort((a, b) => b.ratio - a.ratio)
            .map((b) => {
              const maxRatio = 3.5;
              const barPct = Math.min((b.ratio / maxRatio) * 100, 100);
              const breakEvenPct = (2.0 / maxRatio) * 100;

              return (
                <div key={b.brand}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-display font-[800] text-[15px] text-navy">{b.brand}</span>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          'font-mono text-[12px] font-bold',
                          b.ratio >= 2.5 ? 'text-good' : b.ratio >= 2.0 ? 'text-warn' : 'text-risk',
                        )}
                      >
                        \u00A3{b.ratio.toFixed(2)}
                      </span>
                      {b.isCarryingWeight ? (
                        <StatusDot variant="ok" label="Yes" />
                      ) : (
                        <StatusDot variant="risk" label="Below threshold" />
                      )}
                    </div>
                  </div>
                  <div className="relative h-[12px] bg-off rounded-full overflow-hidden">
                    <div
                      className={cn(
                        'h-full rounded-full transition-all duration-500',
                        b.ratio >= 2.5 ? 'bg-good' : b.ratio >= 2.0 ? 'bg-warn' : 'bg-risk',
                      )}
                      style={{ width: `${barPct}%` }}
                    />
                    {/* Break-even marker */}
                    <div
                      className="absolute top-0 h-full w-[2px] bg-navy/40"
                      style={{ left: `${breakEvenPct}%` }}
                    />
                  </div>
                  <div className="flex justify-between text-[9px] text-muted mt-1">
                    <span>
                      Editorial: {formatCurrency(b.editorialBudget, true)} &rarr; Ad Rev:{' '}
                      {formatCurrency(b.adRevenueGenerated, true)}
                    </span>
                    <span className="font-mono">\u00A32.00 break-even</span>
                  </div>
                </div>
              );
            })}
        </div>
      </div>

      {/* ── Data Table ────────────────────────────────────────────── */}
      <SectionHeading title="Detailed View" count={contentVsCommercial.length} />
      <DataTable columns={columns} data={contentVsCommercial.sort((a, b) => b.ratio - a.ratio)} />
    </div>
  );
}
