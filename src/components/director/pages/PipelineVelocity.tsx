'use client';

import {
  velocityByStage,
  overallCycle,
  velocityTrend,
  type VelocityByStage,
} from '@/lib/data/director/pipelineVelocity';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from '@/components/ui/MetricCard';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { cn } from '@/lib/utils';

const COLORS = {
  sky: '#4AB4E8',
  navy: '#0E2A5C',
  good: '#1DB77A',
  warn: '#FF9D2E',
  risk: '#E53E5C',
  muted: '#6B7A93',
};

/* Stalling deals: deals sitting in a stage > 2x average */
const stallingDeals = [
  { deal: 'Dyson Print + Digital', stage: 'Negotiation', daysInStage: 28, avgForStage: 11, owner: 'Gary' },
  { deal: 'Barclays Content Series', stage: 'Proposal', daysInStage: 34, avgForStage: 14, owner: 'Rachel' },
  { deal: 'Shell EV Sponsorship', stage: 'Prospecting', daysInStage: 42, avgForStage: 18, owner: 'Elise' },
];

export function PipelineVelocity({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">

      {/* ─── HERO: AVG CYCLE ──────────────────────────────────────────────── */}
      <div className="bg-paper border border-line rounded-xl p-6 mb-6">
        <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold mb-2">
          Average Sales Cycle
        </div>
        <div className="flex items-baseline gap-3">
          <span className="font-display font-[900] text-[52px] text-navy leading-none">
            {overallCycle.currentDays}
          </span>
          <span className="text-[16px] text-muted font-semibold">days</span>
          <span className="font-mono text-[14px] text-good font-semibold ml-2">
            {overallCycle.delta}d vs last year ({overallCycle.lastYearDays}d)
          </span>
        </div>
        <div className="h-[8px] bg-line rounded mt-3 overflow-hidden max-w-[400px]">
          <div
            className="h-full bg-gradient-to-r from-good to-sky rounded"
            style={{ width: `${(overallCycle.currentDays / overallCycle.lastYearDays) * 100}%` }}
          />
        </div>
      </div>

      {/* ─── STAGE-BY-STAGE COMPARISON ────────────────────────────────────── */}
      <SectionHeading title="Stage-by-Stage Comparison" />

      <DataTable<VelocityByStage>
        className="mb-6"
        data={velocityByStage}
        columns={[
          {
            key: 'stage',
            header: 'Stage',
            render: (s) => <BrandCell>{s.stage}</BrandCell>,
          },
          {
            key: 'current',
            header: 'Current Avg',
            render: (s) => <MonoCell className="font-semibold">{s.currentAvgDays}d</MonoCell>,
          },
          {
            key: 'lastYear',
            header: 'Last Year',
            render: (s) => <MonoCell>{s.lastYearAvgDays}d</MonoCell>,
          },
          {
            key: 'delta',
            header: 'Delta',
            render: (s) => (
              <MonoCell className={cn('font-semibold', s.delta < 0 ? 'text-good' : s.delta > 0 ? 'text-risk' : 'text-muted')}>
                {s.delta > 0 ? '+' : ''}{s.delta}d
              </MonoCell>
            ),
          },
          {
            key: 'deals',
            header: 'Deals in Stage',
            render: (s) => <MonoCell>{s.dealsInStage}</MonoCell>,
          },
        ]}
      />

      {/* ─── VELOCITY TREND CHART ─────────────────────────────────────────── */}
      <SectionHeading title="Velocity Trend" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={velocityTrend} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" tick={{ fill: COLORS.muted, fontSize: 11 }} />
              <YAxis
                domain={[30, 60]}
                tickFormatter={(v) => `${v}d`}
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <Tooltip
                formatter={(value) => [`${value} days`, 'Avg Cycle']}
                contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
              <Line
                type="monotone"
                dataKey="avgCycleDays"
                stroke={COLORS.sky}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.sky }}
                name="Avg Cycle Days"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <p className="text-[12px] text-muted mt-4 font-medium">
          Sales cycle has decreased steadily from 51 days to 42 days over the last 6 quarters.
        </p>
      </div>

      {/* ─── STALLING DEALS CALLOUT ───────────────────────────────────────── */}
      <SectionHeading title="Stalling Deals" count={stallingDeals.length} />

      <div className="bg-warn/5 border border-warn/20 rounded-xl p-5 mb-6">
        <div className="text-[11px] font-semibold text-warn mb-3">
          Deals sitting in a stage longer than 2x the average — may need intervention.
        </div>

        <div className="space-y-3">
          {stallingDeals.map((d) => (
            <div key={d.deal} className="flex items-center justify-between bg-paper border border-line rounded-lg p-4">
              <div>
                <div className="font-display font-bold text-[15px] text-navy">{d.deal}</div>
                <div className="text-[11px] text-muted mt-1">
                  <span className="font-semibold">{d.stage}</span> &middot; Owner: {d.owner}
                </div>
              </div>
              <div className="text-right">
                <div className="font-display font-[800] text-[28px] text-risk leading-none">
                  {d.daysInStage}d
                </div>
                <div className="font-mono text-[11px] text-muted">
                  avg {d.avgForStage}d ({(d.daysInStage / d.avgForStage).toFixed(1)}x)
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
