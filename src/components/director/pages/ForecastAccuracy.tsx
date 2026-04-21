'use client';

import {
  forecastAccuracy,
  forecastSummary,
  type ForecastAccuracyRecord,
} from '@/lib/data/director/forecastTrack';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from '@/components/ui/MetricCard';
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

const chartData = forecastAccuracy.map(q => ({
  quarter: q.quarter,
  forecast: q.forecastAtStart,
  actual: q.actual,
}));

export function ForecastAccuracy({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">

      {/* ─── HERO STAT ────────────────────────────────────────────────────── */}
      <div className="bg-paper border border-good/30 rounded-xl p-6 mb-6">
        <div className="flex items-center gap-3 mb-2">
          <span className="w-8 h-8 rounded-full bg-good/10 flex items-center justify-center text-good text-[18px] font-bold">
            &#10003;
          </span>
          <span className="font-display font-[900] text-[28px] text-navy leading-none">
            Last {forecastSummary.streakWithinTarget} quarters within 5%
          </span>
        </div>
        <div className="text-[12px] text-muted font-medium ml-11">
          Average variance {forecastSummary.ytdForecastAccuracy}% over last 4 quarters &middot; Target: within 5%
        </div>
      </div>

      {/* ─── METRIC CARDS ─────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <MetricCard
          label="Current Quarter"
          value={forecastSummary.currentQuarter}
          sub={`Forecast: ${formatCurrency(forecastSummary.currentForecast, true)}`}
          subColor="muted"
        />
        <MetricCard
          label="Avg Variance"
          value={`${forecastSummary.ytdForecastAccuracy}%`}
          sub="Last 4 quarters"
          subColor="good"
        />
        <MetricCard
          label="Best Quarter"
          value={forecastSummary.bestQuarter}
          sub="Lowest variance"
          subColor="good"
        />
        <MetricCard
          label="Worst Quarter"
          value={forecastSummary.worstQuarter}
          sub="Highest variance"
          subColor="risk"
        />
      </div>

      {/* ─── 8-QUARTER TABLE ──────────────────────────────────────────────── */}
      <SectionHeading title="8-Quarter Accuracy" />

      <DataTable<ForecastAccuracyRecord>
        className="mb-6"
        data={forecastAccuracy}
        columns={[
          {
            key: 'quarter',
            header: 'Quarter',
            render: (q) => <BrandCell>{q.quarter}</BrandCell>,
          },
          {
            key: 'forecastStart',
            header: 'Forecast at Start',
            render: (q) => <MonoCell>{formatCurrency(q.forecastAtStart, true)}</MonoCell>,
          },
          {
            key: 'forecastMid',
            header: 'Mid-Q Forecast',
            render: (q) => <MonoCell>{formatCurrency(q.forecastMidQuarter, true)}</MonoCell>,
          },
          {
            key: 'actual',
            header: 'Actual',
            render: (q) => <MonoCell className="font-semibold text-navy">{formatCurrency(q.actual, true)}</MonoCell>,
          },
          {
            key: 'variance',
            header: 'Variance %',
            render: (q) => (
              <MonoCell className={cn(
                'font-semibold',
                Math.abs(q.variancePercent) <= 5 ? 'text-good' : 'text-risk'
              )}>
                {q.variancePercent > 0 ? '+' : ''}{q.variancePercent.toFixed(1)}%
              </MonoCell>
            ),
          },
          {
            key: 'withinTarget',
            header: 'Within Target',
            render: (q) => (
              <span className={cn(
                'inline-flex items-center justify-center w-6 h-6 rounded-full text-[14px] font-bold',
                q.withinTarget
                  ? 'bg-good/10 text-good'
                  : 'bg-risk/10 text-risk'
              )}>
                {q.withinTarget ? '\u2713' : '\u2717'}
              </span>
            ),
          },
        ]}
      />

      {/* ─── FORECAST VS ACTUAL CHART ─────────────────────────────────────── */}
      <SectionHeading title="Forecast vs Actual" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" tick={{ fill: COLORS.muted, fontSize: 11 }} />
              <YAxis
                tickFormatter={(v) => `£${(v / 1_000_000).toFixed(1)}m`}
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value), true), '']}
                contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
              <Line
                type="monotone"
                dataKey="forecast"
                stroke={COLORS.sky}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.sky }}
                name="Forecast at Start"
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
      </div>

      {/* ─── ACCURACY IMPROVING CALLOUT ────────────────────────────────────── */}
      <div className="bg-good/5 border border-good/20 rounded-xl p-5 mb-6">
        <div className="flex items-start gap-3">
          <span className="w-6 h-6 rounded-full bg-good/10 flex items-center justify-center text-good text-[14px] font-bold flex-shrink-0 mt-[2px]">
            &#10003;
          </span>
          <div>
            <div className="font-display font-[800] text-[16px] text-navy mb-1">
              Accuracy Trend Improving
            </div>
            <div className="text-[12px] text-ink leading-relaxed">
              {forecastSummary.improvementTrend}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
