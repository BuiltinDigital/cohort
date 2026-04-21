'use client';

import { useState } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusDot } from '@/components/ui/StatusDot';
import { MiniBarChart } from '@/components/ui/MiniBarChart';
import { RAGBadge } from '@/components/ui/RAGBadge';
import { talentData, type TalentEntry } from '@/lib/data/director/talentMatrix';
import { cn } from '@/lib/utils';

/* ─── Helpers ─────────────────────────────────────────────────────── */

const QUADRANT_CONFIG = {
  star: { label: 'Stars', color: '#1DB77A', bg: 'bg-good/10', border: 'border-good/20', text: 'text-good' },
  'high-performer': { label: 'High Performers', color: '#4AB4E8', bg: 'bg-sky/10', border: 'border-sky/20', text: 'text-sky' },
  rising: { label: 'Rising Talent', color: '#FF9D2E', bg: 'bg-warn/10', border: 'border-warn/20', text: 'text-warn' },
  steady: { label: 'Steady', color: '#6B7A93', bg: 'bg-muted/10', border: 'border-muted/20', text: 'text-muted' },
  'at-risk': { label: 'At Risk', color: '#E53E5C', bg: 'bg-risk/10', border: 'border-risk/20', text: 'text-risk' },
  underperformer: { label: 'Needs Support', color: '#E53E5C', bg: 'bg-risk/10', border: 'border-risk/20', text: 'text-risk' },
} as const;

const flightRiskVariant = { low: 'ok' as const, medium: 'warn' as const, high: 'risk' as const };
const flightRiskRAG = { low: 'green' as const, medium: 'amber' as const, high: 'red' as const };

function toGridX(performance: number): number {
  return Math.max(5, Math.min(95, performance));
}
function toGridY(potential: number): number {
  return Math.max(5, Math.min(95, 100 - potential));
}

/* ─── Detail Card ─────────────────────────────────────────────────── */

function PersonDetail({ person, onClose }: { person: TalentEntry; onClose: () => void }) {
  const qc = QUADRANT_CONFIG[person.quadrant];
  const quarters = ['Q1 2025', 'Q2 2025', 'Q3 2025', 'Q4 2025'];
  const maxAttainment = Math.max(...person.quotaAttainment);
  const latestAttainment = person.quotaAttainment[person.quotaAttainment.length - 1];
  const attainmentTrend =
    person.quotaAttainment.length >= 2
      ? person.quotaAttainment[person.quotaAttainment.length - 1] -
        person.quotaAttainment[person.quotaAttainment.length - 2]
      : 0;

  return (
    <div className="bg-paper border border-line rounded-xl p-5 animate-fade-up">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="font-display font-[900] text-[24px] text-navy leading-none">
            {person.name}
          </div>
          <div className="text-[11px] text-muted mt-1">
            {person.team} &middot; Manager: {person.manager} &middot; Tenure: {person.tenure}mo
            {person.lastPromotion && (
              <> &middot; Last promotion: <span className="font-mono">{person.lastPromotion}</span></>
            )}
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className={cn('text-[10px] font-bold uppercase tracking-[0.1em] px-2.5 py-1 rounded border', qc.bg, qc.text, qc.border)}>
            {qc.label}
          </span>
          <button
            onClick={onClose}
            className="text-[11px] text-muted hover:text-navy font-semibold bg-off px-3 py-1.5 rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-3 mb-5">
        <div className="bg-off rounded-lg p-3">
          <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
            Performance
          </div>
          <div className="font-display font-[800] text-[22px] text-navy leading-none">
            {person.performance}
          </div>
        </div>
        <div className="bg-off rounded-lg p-3">
          <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
            Potential
          </div>
          <div className="font-display font-[800] text-[22px] text-navy leading-none">
            {person.potential}
          </div>
        </div>
        <div className="bg-off rounded-lg p-3">
          <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
            Engagement
          </div>
          <div className={cn(
            'font-display font-[800] text-[22px] leading-none',
            person.engagementScore >= 75 ? 'text-good' : person.engagementScore >= 55 ? 'text-warn' : 'text-risk',
          )}>
            {person.engagementScore}
          </div>
        </div>
        <div className="bg-off rounded-lg p-3">
          <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
            Meetings / Pipeline
          </div>
          <div className="font-display font-[800] text-[22px] text-navy leading-none">
            {person.meetingsLogged}/{person.pipelineActivity}
          </div>
        </div>
        <div className="bg-off rounded-lg p-3">
          <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
            Flight Risk
          </div>
          <RAGBadge status={flightRiskRAG[person.flightRisk]} label={person.flightRisk} size="md" />
        </div>
      </div>

      {/* Quota Attainment over 4 quarters */}
      <div className="mb-5">
        <div className="font-display font-[800] text-[16px] text-navy mb-3">
          Quota Attainment (4 Quarters)
        </div>
        <div className="grid grid-cols-4 gap-3">
          {person.quotaAttainment.map((val, i) => {
            const barColor = val >= 100 ? '#1DB77A' : val >= 85 ? '#FF9D2E' : '#E53E5C';
            return (
              <div key={i} className="bg-off rounded-lg p-3 text-center">
                <div className="text-[10px] text-muted font-semibold mb-2">{quarters[i]}</div>
                <div className="flex justify-center mb-2">
                  <div className="w-[40px] bg-line-soft rounded-full overflow-hidden" style={{ height: 60 }}>
                    <div className="w-full flex flex-col justify-end" style={{ height: 60 }}>
                      <div
                        className="w-full rounded-t-full transition-all duration-500"
                        style={{
                          height: `${Math.min((val / 130) * 100, 100)}%`,
                          background: barColor,
                        }}
                      />
                    </div>
                  </div>
                </div>
                <div className={cn(
                  'font-mono text-[14px] font-bold',
                  val >= 100 ? 'text-good' : val >= 85 ? 'text-warn' : 'text-risk',
                )}>
                  {val}%
                </div>
              </div>
            );
          })}
        </div>
        <div className="flex items-center gap-3 mt-2 text-[11px]">
          <span className="text-muted">
            Latest: <span className="font-mono font-bold text-ink">{latestAttainment}%</span>
          </span>
          <span className={cn('font-mono font-bold', attainmentTrend > 0 ? 'text-good' : attainmentTrend < 0 ? 'text-risk' : 'text-muted')}>
            {attainmentTrend > 0 ? '+' : ''}{attainmentTrend}pp trend
          </span>
        </div>
      </div>

      {/* Flight risk reasons */}
      {person.flightRiskReasons && person.flightRiskReasons.length > 0 && (
        <div className="bg-risk/5 border border-risk/15 rounded-xl p-4">
          <div className="font-display font-[800] text-[14px] text-risk mb-2">Flight Risk Factors</div>
          <div className="space-y-1.5">
            {person.flightRiskReasons.map((r, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px] text-ink">
                <span className="w-[6px] h-[6px] rounded-full bg-risk flex-shrink-0 mt-1.5" />
                {r}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ─── Component ───────────────────────────────────────────────────── */

export function PerformanceMatrix({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedPerson = talentData.find((t) => t.id === selectedId) ?? null;

  const totalPeople = talentData.length;
  const stars = talentData.filter((t) => t.quadrant === 'star');
  const highFlight = talentData.filter((t) => t.flightRisk === 'high');
  const avgPerformance = Math.round(talentData.reduce((s, t) => s + t.performance, 0) / totalPeople);
  const avgPotential = Math.round(talentData.reduce((s, t) => s + t.potential, 0) / totalPeople);

  return (
    <div className="animate-fade-up">
      {/* ── Summary ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Avg Performance"
          value={String(avgPerformance)}
          sub={`${stars.length} stars identified`}
          subColor="good"
        />
        <MetricCard
          label="Avg Potential"
          value={String(avgPotential)}
          sub="Across all teams"
        />
        <MetricCard
          label="High Flight Risk"
          value={String(highFlight.length)}
          sub={highFlight.map((p) => p.name).join(', ') || 'None'}
          subColor={highFlight.length > 0 ? 'risk' : 'good'}
        />
        <MetricCard
          label="Team Size"
          value={String(totalPeople)}
          sub="Click any person for detail"
        />
      </div>

      {/* ── 2x2 Matrix (prominent) ────────────────────────────────── */}
      <SectionHeading title="Performance / Potential Grid" />
      <div className="bg-paper border border-line rounded-xl p-6 mb-6">
        <div className="relative w-full" style={{ paddingBottom: '60%' }}>
          <div className="absolute inset-0">
            {/* Axis labels */}
            <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-[10px] tracking-[0.12em] uppercase font-bold text-muted pb-1">
              Performance Score
            </div>
            <div
              className="absolute left-0 top-1/2 text-[10px] tracking-[0.12em] uppercase font-bold text-muted"
              style={{ transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: '0 0' }}
            >
              Potential Score
            </div>

            <svg
              viewBox="0 0 100 100"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="none"
            >
              {/* Quadrant backgrounds */}
              <rect x="50" y="0" width="50" height="50" fill="#1DB77A" opacity="0.06" />
              <rect x="0" y="0" width="50" height="50" fill="#FF9D2E" opacity="0.06" />
              <rect x="50" y="50" width="50" height="50" fill="#4AB4E8" opacity="0.06" />
              <rect x="0" y="50" width="50" height="50" fill="#E53E5C" opacity="0.06" />

              {/* Cross */}
              <line x1="50" y1="0" x2="50" y2="100" stroke="#E2E6EC" strokeWidth="0.4" />
              <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E6EC" strokeWidth="0.4" />

              {/* Labels */}
              <text x="75" y="6" textAnchor="middle" className="fill-good text-[3.5px] font-bold uppercase">
                STARS
              </text>
              <text x="25" y="6" textAnchor="middle" className="fill-warn text-[3.5px] font-bold uppercase">
                RISING TALENT
              </text>
              <text x="75" y="97" textAnchor="middle" className="fill-sky text-[3.5px] font-bold uppercase">
                HIGH PERFORMERS
              </text>
              <text x="25" y="97" textAnchor="middle" className="fill-risk text-[3.5px] font-bold uppercase">
                NEEDS SUPPORT
              </text>

              {/* People circles — clickable */}
              {talentData.map((person) => {
                const cx = toGridX(person.performance);
                const cy = toGridY(person.potential);
                const qc = QUADRANT_CONFIG[person.quadrant];
                const isSelected = selectedId === person.id;
                const flightColor =
                  person.flightRisk === 'high' ? '#E53E5C'
                    : person.flightRisk === 'medium' ? '#FF9D2E'
                      : qc.color;

                return (
                  <g
                    key={person.id}
                    onClick={() => setSelectedId(isSelected ? null : person.id)}
                    className="cursor-pointer"
                  >
                    {/* Flight risk ring */}
                    {person.flightRisk !== 'low' && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={isSelected ? 7 : 5.5}
                        fill="none"
                        stroke={flightColor}
                        strokeWidth="0.5"
                        strokeDasharray="1.5 1"
                        className="transition-all duration-200"
                      />
                    )}
                    {/* Selection ring */}
                    {isSelected && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={8}
                        fill="none"
                        stroke="#0E2A5C"
                        strokeWidth="0.6"
                        className="transition-all duration-200"
                      />
                    )}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isSelected ? 4.5 : 3.5}
                      fill={qc.color}
                      opacity={isSelected ? 1 : 0.85}
                      stroke="white"
                      strokeWidth="0.5"
                      className="transition-all duration-200"
                    />
                    <text
                      x={cx}
                      y={cy - (isSelected ? 6.5 : 5)}
                      textAnchor="middle"
                      className={cn(
                        'fill-navy font-bold',
                        isSelected ? 'text-[3.5px] opacity-100' : 'text-[2.8px] opacity-70',
                      )}
                    >
                      {person.name}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-4 mt-4 pt-3 border-t border-line">
          {(['star', 'high-performer', 'rising', 'at-risk', 'underperformer', 'steady'] as const).map((q) => {
            const qc = QUADRANT_CONFIG[q];
            const count = talentData.filter((t) => t.quadrant === q).length;
            if (count === 0) return null;
            return (
              <div key={q} className="flex items-center gap-1.5">
                <span className="w-[8px] h-[8px] rounded-full" style={{ background: qc.color }} />
                <span className="text-[11px] font-semibold text-ink">
                  {qc.label} <span className="font-mono text-muted ml-0.5">({count})</span>
                </span>
              </div>
            );
          })}
          <div className="flex items-center gap-1.5 ml-2">
            <span className="w-[12px] h-[12px] rounded-full border border-dashed border-risk" />
            <span className="text-[11px] font-semibold text-muted">Flight risk ring</span>
          </div>
        </div>
      </div>

      {/* ── Person Detail Card ────────────────────────────────────── */}
      {selectedPerson && (
        <>
          <SectionHeading title={`Detail: ${selectedPerson.name}`} />
          <PersonDetail person={selectedPerson} onClose={() => setSelectedId(null)} />
        </>
      )}

      {!selectedPerson && (
        <div className="bg-off border border-line rounded-xl p-6 text-center text-[13px] text-muted">
          Click on any person in the grid above to see their detailed performance profile, quota attainment history, and flight risk assessment.
        </div>
      )}

      {/* ── All People Quick List ──────────────────────────────────── */}
      <SectionHeading title="Quick Reference" count={totalPeople} className="mt-6" />
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3">
        {talentData
          .sort((a, b) => b.performance - a.performance)
          .map((person) => {
            const qc = QUADRANT_CONFIG[person.quadrant];
            const latestQ = person.quotaAttainment[person.quotaAttainment.length - 1];
            const isSelected = selectedId === person.id;

            return (
              <div
                key={person.id}
                onClick={() => setSelectedId(isSelected ? null : person.id)}
                className={cn(
                  'bg-paper border rounded-xl p-4 cursor-pointer transition-all',
                  'hover:translate-y-[-2px] hover:shadow-[0_4px_12px_rgba(14,42,92,0.08)]',
                  isSelected ? 'border-navy shadow-md' : 'border-line',
                )}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="font-display font-[800] text-[17px] text-navy">{person.name}</div>
                  <span className={cn('text-[9px] font-bold uppercase tracking-[0.1em] px-2 py-0.5 rounded', qc.bg, qc.text)}>
                    {qc.label}
                  </span>
                </div>
                <div className="text-[11px] text-muted mb-2">
                  {person.team} &middot; {person.manager}
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  <div>
                    <div className="text-[9px] text-muted font-semibold">Perf</div>
                    <div className="font-mono text-[13px] font-bold text-navy">{person.performance}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-muted font-semibold">Pot</div>
                    <div className="font-mono text-[13px] font-bold text-navy">{person.potential}</div>
                  </div>
                  <div>
                    <div className="text-[9px] text-muted font-semibold">Quota</div>
                    <div className={cn('font-mono text-[13px] font-bold', latestQ >= 100 ? 'text-good' : latestQ >= 85 ? 'text-warn' : 'text-risk')}>
                      {latestQ}%
                    </div>
                  </div>
                  <div>
                    <div className="text-[9px] text-muted font-semibold">Flight</div>
                    <StatusDot variant={flightRiskVariant[person.flightRisk]} label={person.flightRisk.charAt(0).toUpperCase()} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
