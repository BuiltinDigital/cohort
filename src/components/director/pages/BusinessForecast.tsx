'use client';

import { ScenarioCard } from '@/components/ui/ScenarioCard';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import {
  forecastSummary,
  quarterForecasts,
  forecastAccuracyHistory,
  type QuarterForecast,
} from '@/lib/data/director/businessForecast';
import {
  topDeals,
  concentrationScenarios,
  concentrationRatio,
  type ConcentrationDeal,
  type ConcentrationScenario,
} from '@/lib/data/director/pipelineConcentration';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { cn, formatCurrency } from '@/lib/utils';

const COLORS = {
  sky: '#4AB4E8',
  navy: '#0E2A5C',
  good: '#1DB77A',
  warn: '#FF9D2E',
  risk: '#E53E5C',
  muted: '#6B7A93',
};

export function BusinessForecast({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">

      {/* ─── HERO: FY 2026 Business Forecast ──────────────────────────────── */}
      <ScenarioCard
        title="FY 2026 Business Forecast"
        subtitle={`Updated ${forecastSummary.lastUpdated}`}
        scenarios={[
          { label: 'Worst Case', value: forecastSummary.fullYearWorst },
          { label: 'Most Likely', value: forecastSummary.fullYearMostLikely, highlight: true },
          { label: 'Best Case', value: forecastSummary.fullYearBest },
        ]}
        confidence={forecastSummary.confidence}
        confidenceLabel="based on weighted pipeline + 18mo velocity"
        className="mb-6"
      />

      {/* ─── QUARTERLY BREAKDOWN ──────────────────────────────────────────── */}
      <SectionHeading title="Quarterly Breakdown" />

      <DataTable<QuarterForecast>
        className="mb-6"
        data={quarterForecasts}
        columns={[
          {
            key: 'quarter',
            header: 'Quarter',
            render: (q) => (
              <div className="flex items-center gap-2">
                <BrandCell>{q.quarter}</BrandCell>
                {q.actual !== undefined && !q.isCurrentQuarter && (
                  <span className="text-[10px] font-bold text-good bg-good/10 px-2 py-[2px] rounded-md">ACTUAL</span>
                )}
                {q.isCurrentQuarter && (
                  <span className="text-[10px] font-bold text-sky bg-sky/10 px-2 py-[2px] rounded-md">TRACKING</span>
                )}
                {!q.actual && !q.isCurrentQuarter && (
                  <span className="text-[10px] font-bold text-muted bg-muted/10 px-2 py-[2px] rounded-md">FORECAST</span>
                )}
              </div>
            ),
          },
          {
            key: 'worst',
            header: 'Worst',
            render: (q) => <MonoCell>{formatCurrency(q.worstCase, true)}</MonoCell>,
          },
          {
            key: 'likely',
            header: 'Most Likely',
            render: (q) => <MonoCell className="font-semibold text-navy">{formatCurrency(q.mostLikely, true)}</MonoCell>,
          },
          {
            key: 'best',
            header: 'Best',
            render: (q) => <MonoCell>{formatCurrency(q.bestCase, true)}</MonoCell>,
          },
          {
            key: 'actual',
            header: 'Actual',
            render: (q) =>
              q.actual ? (
                <MonoCell className="font-semibold text-good">{formatCurrency(q.actual, true)}</MonoCell>
              ) : (
                <span className="text-[12px] text-muted">--</span>
              ),
          },
        ]}
      />

      {/* ─── PIPELINE CONCENTRATION RISK ──────────────────────────────────── */}
      <SectionHeading title="Pipeline Concentration Risk" />

      <div className="bg-paper border border-line rounded-xl p-4 mb-4">
        <div className="flex items-center gap-3 mb-4">
          <div className="text-[11px] tracking-[0.1em] uppercase text-muted font-bold">
            Top-5 deals = {concentrationRatio}% of weighted pipeline
          </div>
          <div className={cn(
            'text-[10px] font-bold px-2 py-[2px] rounded-md',
            concentrationRatio > 25 ? 'bg-warn/10 text-warn' : 'bg-good/10 text-good'
          )}>
            {concentrationRatio > 25 ? 'HIGH' : 'OK'}
          </div>
        </div>
      </div>

      <DataTable<ConcentrationDeal>
        className="mb-5"
        data={topDeals}
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
            render: (d) => <span className="text-muted text-[12px]">{d.agency}</span>,
          },
          {
            key: 'value',
            header: 'Value',
            render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.value, true)}</MonoCell>,
          },
          {
            key: 'probability',
            header: 'Prob',
            render: (d) => <MonoCell className="font-semibold">{d.probability}%</MonoCell>,
          },
          {
            key: 'closeDate',
            header: 'Close Date',
            render: (d) => <MonoCell>{d.closeDate}</MonoCell>,
          },
        ]}
      />

      {/* Scenario Impact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {concentrationScenarios.map((s: ConcentrationScenario) => (
          <div
            key={s.label}
            className={cn(
              'bg-paper border rounded-xl p-5',
              s.riskLevel === 'ok' ? 'border-good/30' :
              s.riskLevel === 'warn' ? 'border-warn/30' :
              'border-risk/30'
            )}
          >
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold mb-2">
              {s.label}
            </div>
            <div className={cn(
              'font-display font-[800] text-[30px] leading-none mb-2',
              s.riskLevel === 'ok' ? 'text-good' :
              s.riskLevel === 'warn' ? 'text-warn' :
              'text-risk'
            )}>
              {formatCurrency(s.newForecast, true)}
            </div>
            <div className="flex items-center gap-2 text-[11px]">
              <span className={cn(
                'font-mono font-semibold',
                s.impact >= 0 ? 'text-good' : 'text-risk'
              )}>
                {s.impact >= 0 ? '+' : ''}{formatCurrency(Math.abs(s.impact), true)}
              </span>
              <span className="text-muted">{s.percentOfTarget}% of target</span>
            </div>
          </div>
        ))}
      </div>

      {/* ─── FORECAST ACCURACY CHART ──────────────────────────────────────── */}
      <SectionHeading title="Forecast Accuracy" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={forecastAccuracyHistory} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
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
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
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
          Forecast accuracy improving — variance narrowed from 4.7% to 2.5% over the last 8 quarters.
        </p>
      </div>
    </div>
  );
}
