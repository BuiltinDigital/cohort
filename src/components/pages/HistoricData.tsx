'use client';

import { useState } from 'react';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { TabGroup } from '@/components/ui/TabGroup';
import { SectionHeading } from '@/components/ui/SectionHeading';
import {
  revenueTimeline,
  teamPerformance,
  topAdvertisersAllTime,
} from '@/lib/data/historicData';
import { cn, formatCurrency } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Area,
  AreaChart,
} from 'recharts';

const COLORS = {
  immediate: '#4AB4E8',
  market: '#9BA7BD',
  navy: '#0E2A5C',
  muted: '#6B7A93',
};

const TABS = ['Internal + Market', 'Internal Only', 'Market Only'] as const;

export function HistoricData({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);
  const [granularity, setGranularity] = useState<'quarter' | 'monthly'>('quarter');

  const showImmediate = activeTab !== 'Market Only';
  const showMarket = activeTab !== 'Internal Only';

  return (
    <div className="animate-fade-up">
      {/* ─── Tab Toggle ────────────────────────────────────────────────────── */}
      <TabGroup tabs={[...TABS]} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {/* ─── Revenue Chart ─────────────────────────────────────────────────── */}
      <div className="bg-paper border border-line rounded-xl p-5 lg:p-6 mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-5">
          <div>
            <h3 className="font-display font-[800] text-[20px] text-navy tracking-[0.01em]">
              Revenue Over Time &middot; 24 months
            </h3>
            <p className="text-[12px] text-muted mt-[3px]">
              Source: Internal CRM + Nielsen Ad Intel estimates
            </p>
          </div>

          {/* Granularity Chips */}
          <div className="flex gap-[5px]">
            {(['quarter', 'monthly'] as const).map((g) => (
              <button
                key={g}
                onClick={() => setGranularity(g)}
                className={cn(
                  'px-3 py-[5px] rounded-lg text-[11px] font-semibold border transition-colors',
                  granularity === g
                    ? 'bg-navy text-paper border-navy'
                    : 'bg-paper text-muted border-line hover:border-navy hover:text-navy'
                )}
              >
                {g === 'quarter' ? 'Quarterly' : 'Monthly'}
              </button>
            ))}
          </div>
        </div>

        <div className="h-[320px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={revenueTimeline} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
              <defs>
                <linearGradient id="immediateFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={COLORS.immediate} stopOpacity={0.2} />
                  <stop offset="100%" stopColor={COLORS.immediate} stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="quarter"
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(v) => `£${(Number(v) / 1_000_000).toFixed(1)}m`}
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <Tooltip
                formatter={(value, name) => [
                  formatCurrency(Number(value), true),
                  name === 'immediateRevenue' ? 'Immediate' : 'Market',
                ]}
                contentStyle={{
                  borderRadius: 10,
                  border: '1px solid #e5e7eb',
                  fontSize: 12,
                }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
                formatter={(value: string) =>
                  value === 'immediateRevenue' ? 'Immediate' : 'Market'
                }
              />
              {showImmediate && (
                <Area
                  type="monotone"
                  dataKey="immediateRevenue"
                  stroke={COLORS.immediate}
                  strokeWidth={2.5}
                  fill="url(#immediateFill)"
                  dot={{ r: 4, fill: COLORS.immediate }}
                  name="immediateRevenue"
                />
              )}
              {showMarket && (
                <Line
                  type="monotone"
                  dataKey="marketRevenue"
                  stroke={COLORS.market}
                  strokeWidth={2}
                  strokeDasharray="6 3"
                  dot={{ r: 3, fill: COLORS.market }}
                  name="marketRevenue"
                />
              )}
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ─── Two-Column Grid ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Team Performance */}
        <div>
          <SectionHeading title="Team Performance" count={teamPerformance.length} className="mt-0" />
          <DataTable
            data={teamPerformance}
            columns={[
              {
                key: 'quarter',
                header: 'Quarter',
                render: (d) => (
                  <span className="font-display font-bold text-[14px] text-navy">{d.quarter}</span>
                ),
              },
              {
                key: 'delivered',
                header: 'Delivered',
                render: (d) => (
                  <MonoCell className="font-semibold">{formatCurrency(d.delivered, true)}</MonoCell>
                ),
              },
              {
                key: 'target',
                header: 'Target',
                render: (d) => (
                  <MonoCell>{formatCurrency(d.target, true)}</MonoCell>
                ),
              },
              {
                key: 'percentHit',
                header: '% Hit',
                render: (d) => (
                  <span
                    className={cn(
                      'font-mono text-[12px] font-bold',
                      d.percentHit >= 100 ? 'text-good' : d.percentHit >= 95 ? 'text-warn' : 'text-risk'
                    )}
                  >
                    {d.percentHit}%
                  </span>
                ),
              },
            ]}
          />
        </div>

        {/* Top Advertisers All Time */}
        <div>
          <SectionHeading title="Top Advertisers All Time" count={topAdvertisersAllTime.length} className="mt-0" />
          <DataTable
            data={topAdvertisersAllTime}
            onRowClick={(d) => onNavigate('advertiser', d.id)}
            columns={[
              {
                key: 'name',
                header: 'Advertiser',
                render: (d) => <BrandCell>{d.name}</BrandCell>,
              },
              {
                key: 'totalRevenue',
                header: 'Lifetime £',
                render: (d) => (
                  <MonoCell className="font-semibold">{formatCurrency(d.totalRevenue, true)}</MonoCell>
                ),
              },
              {
                key: 'campaigns',
                header: 'Campaigns',
                render: (d) => (
                  <MonoCell className="font-semibold">{d.campaigns}</MonoCell>
                ),
              },
              {
                key: 'status',
                header: 'Status',
                render: (d) => (
                  <StatusDot
                    variant={d.status === 'active' ? 'ok' : 'risk'}
                    label={d.status === 'active' ? 'Active' : 'Lapsed'}
                  />
                ),
              },
            ]}
          />
        </div>
      </div>
    </div>
  );
}
