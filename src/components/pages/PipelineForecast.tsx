'use client';

import { useState } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { deals, forecastData, pipelineStages, forecastAccuracy, velocityMetrics } from '@/lib/data/deals';
import { cn, formatCurrency } from '@/lib/utils';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart, Line, Legend,
} from 'recharts';

const COLORS = {
  sky: '#4AB4E8',
  navy: '#0E2A5C',
  good: '#1DB77A',
  warn: '#FF9D2E',
  risk: '#E53E5C',
  muted: '#6B7A93',
};

export function PipelineForecast({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [stageFilter, setStageFilter] = useState<string>('all');

  const filteredDeals = deals.filter(d => {
    if (d.stage === 'Closed Lost' && stageFilter === 'all') return false;
    if (stageFilter !== 'all' && d.stage !== stageFilter) return false;
    return true;
  });

  const stageOptions = ['all', 'Prospecting', 'Proposal', 'Negotiation', 'Verbal Yes', 'Closed Won', 'Closed Lost'];

  const maxRawValue = Math.max(...pipelineStages.map(s => s.rawValue));

  const conversionData = pipelineStages
    .filter(s => s.name !== 'Closed Won')
    .map(s => ({ name: s.name, rate: s.convRate }));

  return (
    <div className="animate-fade-up">

      {/* ─── A) FORECAST HERO CARD ─────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-ink to-[#162d5a] rounded-[14px] p-6 lg:p-8 text-paper relative overflow-hidden mb-6">
        <div className="absolute -top-12 -right-12 w-[200px] h-[200px] border-2 border-white/[0.1] rounded-full" />
        <div className="absolute -bottom-10 -left-6 w-[160px] h-[160px] border border-white/[0.07] rounded-full" />

        <div className="relative">
          <div className="text-[11px] tracking-[0.15em] uppercase font-semibold opacity-80 mb-3">
            Q3 2026 Forecast
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-5">
            <div>
              <div className="text-[10px] tracking-[0.12em] uppercase font-semibold opacity-60 mb-1">Worst Case</div>
              <div className="font-display font-[900] text-[44px] lg:text-[52px] leading-none tracking-[-0.02em]">
                {formatCurrency(forecastData.worstCase, true)}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.12em] uppercase font-semibold opacity-60 mb-1">Most Likely</div>
              <div className="font-display font-[900] text-[44px] lg:text-[52px] leading-none tracking-[-0.02em] text-[#4AB4E8]">
                {formatCurrency(forecastData.mostLikely, true)}
              </div>
            </div>
            <div>
              <div className="text-[10px] tracking-[0.12em] uppercase font-semibold opacity-60 mb-1">Best Case</div>
              <div className="font-display font-[900] text-[44px] lg:text-[52px] leading-none tracking-[-0.02em]">
                {formatCurrency(forecastData.bestCase, true)}
              </div>
            </div>
          </div>

          <div className="text-[12px] opacity-70 font-medium">
            {forecastData.confidence}% confidence &middot; based on 18mo deal velocity
          </div>
        </div>
      </div>

      {/* ─── B) PIPELINE FUNNEL ────────────────────────────────────────────── */}
      <SectionHeading title="Pipeline Funnel" count={pipelineStages.reduce((a, s) => a + s.deals, 0)} />

      <div className="flex flex-col lg:flex-row gap-3 mb-6">
        {pipelineStages.map((stage, i) => {
          const widthPct = Math.max(40, (stage.rawValue / maxRawValue) * 100);
          return (
            <div
              key={stage.name}
              className="bg-gradient-to-b from-[#e8f4fc] to-[#f0f8ff] border border-line rounded-xl p-4 transition-shadow hover:shadow-md flex-shrink-0"
              style={{ width: `${widthPct}%`, minWidth: '140px' }}
            >
              <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-bold mb-2">
                {stage.name}
              </div>
              <div className="font-display font-[800] text-[28px] text-navy leading-none mb-1">
                {stage.deals}
              </div>
              <div className="text-[10px] text-muted font-semibold mb-2">deals</div>

              <div className="space-y-[6px]">
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Raw</span>
                  <span className="font-mono text-[11px] text-ink font-semibold">{formatCurrency(stage.rawValue, true)}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Weighted</span>
                  <span className="font-mono text-[11px] text-navy font-semibold">{formatCurrency(stage.weightedValue, true)}</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Conv.</span>
                  <span className="font-mono text-[11px] text-good font-semibold">{stage.convRate}%</span>
                </div>
                <div className="flex justify-between text-[10px]">
                  <span className="text-muted">Avg days</span>
                  <span className="font-mono text-[11px] text-ink">{stage.avgDays}d</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── C) DEALS TABLE ────────────────────────────────────────────────── */}
      <SectionHeading title="Deals" count={filteredDeals.length} />

      <div className="flex gap-2 mb-3 flex-wrap">
        {stageOptions.map(opt => (
          <button
            key={opt}
            onClick={() => setStageFilter(opt)}
            className={cn(
              'text-[11px] font-semibold px-3 py-[5px] rounded-lg border transition-colors',
              stageFilter === opt
                ? 'bg-navy text-paper border-navy'
                : 'bg-paper text-muted border-line hover:border-navy hover:text-navy'
            )}
          >
            {opt === 'all' ? 'All (excl. Lost)' : opt}
          </button>
        ))}
      </div>

      <DataTable
        className="mb-6"
        data={filteredDeals}
        columns={[
          {
            key: 'name',
            header: 'Deal',
            render: (d) => <BrandCell>{d.name}</BrandCell>,
          },
          {
            key: 'advertiser',
            header: 'Advertiser',
            render: (d) => <span className="text-ink font-medium">{d.advertiser}</span>,
          },
          {
            key: 'agency',
            header: 'Agency',
            render: (d) => <span className="text-muted">{d.agency}</span>,
          },
          {
            key: 'owner',
            header: 'Owner',
            render: (d) => <span className="text-ink font-medium">{d.owner}</span>,
          },
          {
            key: 'value',
            header: 'Value',
            render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.value)}</MonoCell>,
          },
          {
            key: 'closeDate',
            header: 'Close Date',
            render: (d) => <MonoCell>{d.closeDate}</MonoCell>,
          },
          {
            key: 'probability',
            header: 'Prob %',
            render: (d) => <MonoCell className="font-semibold">{d.probability}%</MonoCell>,
          },
          {
            key: 'stage',
            header: 'Stage',
            render: (d) => (
              <span className="text-[11px] font-semibold text-ink bg-off px-2 py-[3px] rounded-md">
                {d.stage}
              </span>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (d) => {
              if (d.probability >= 70) return <StatusDot variant="ok" label="On track" />;
              if (d.probability >= 40) return <StatusDot variant="warn" label="Monitor" />;
              return <StatusDot variant="risk" label="At risk" />;
            },
          },
        ]}
      />

      {/* ─── D) VELOCITY & CONVERSION ──────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-5 mb-6">
        {/* Velocity Metrics */}
        <div>
          <SectionHeading title="Deal Velocity" className="mt-0" />
          <div className="bg-paper border border-line rounded-xl p-5 space-y-5">
            {/* Avg Deal Cycle */}
            <div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-bold mb-[6px]">Avg Deal Cycle</div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-[900] text-[36px] text-navy leading-none">
                  {velocityMetrics.avgDealCycle}
                </span>
                <span className="text-[14px] text-muted font-semibold">days</span>
                <span className="font-mono text-[12px] text-good font-semibold ml-2">
                  vs {velocityMetrics.benchmark}d benchmark
                </span>
              </div>
              <div className="h-[8px] bg-line rounded mt-2 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-good to-sky rounded"
                  style={{ width: `${(velocityMetrics.avgDealCycle / velocityMetrics.benchmark) * 100}%` }}
                />
              </div>
            </div>

            {/* Win Rate */}
            <div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-bold mb-[6px]">Win Rate</div>
              <div className="flex items-baseline gap-2">
                <span className="font-display font-[900] text-[36px] text-navy leading-none">
                  {velocityMetrics.winRate}%
                </span>
                <span className="font-mono text-[12px] text-good font-semibold ml-2">
                  +{velocityMetrics.winRateDelta}pt YoY
                </span>
              </div>
            </div>

            {/* Avg Deal Size */}
            <div>
              <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-bold mb-[6px]">Avg Deal Size</div>
              <div className="font-display font-[900] text-[36px] text-navy leading-none">
                {formatCurrency(velocityMetrics.avgDealSize, true)}
              </div>
            </div>
          </div>
        </div>

        {/* Stage Conversion Rates */}
        <div>
          <SectionHeading title="Stage Conversion Rates" className="mt-0" />
          <div className="bg-paper border border-line rounded-xl p-5">
            <div className="h-[260px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conversionData} layout="vertical" margin={{ top: 0, right: 20, bottom: 0, left: 10 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                  <XAxis
                    type="number"
                    domain={[0, 100]}
                    tickFormatter={(v) => `${v}%`}
                    tick={{ fill: COLORS.muted, fontSize: 11 }}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={90}
                    tick={{ fill: COLORS.navy, fontSize: 12, fontWeight: 600 }}
                  />
                  <Tooltip
                    formatter={(value) => [`${value}%`, 'Conversion']}
                    contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
                  />
                  <Bar dataKey="rate" fill={COLORS.sky} radius={[0, 6, 6, 0]} barSize={24} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      {/* ─── E) FORECAST ACCURACY ──────────────────────────────────────────── */}
      <SectionHeading title="Forecast Accuracy" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastAccuracy} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="quarter"
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <YAxis
                tickFormatter={(v) => `£${(v / 1_000_000).toFixed(1)}m`}
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), '']}
                contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Legend
                wrapperStyle={{ fontSize: 12, fontWeight: 600 }}
              />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke={COLORS.sky}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.sky }}
                name="Forecast"
              />
              <Line
                type="monotone"
                dataKey="actual"
                stroke={COLORS.good}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.good }}
                name="Actual"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[12px] text-muted mt-4 font-medium">
          Rachel&apos;s team has called the quarter within 3% for the last 4 quarters running.
        </p>
      </div>
    </div>
  );
}
