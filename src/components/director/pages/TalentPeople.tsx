'use client';

import { useState } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { talentData, type TalentEntry } from '@/lib/data/director/talentMatrix';
import { cn } from '@/lib/utils';

/* ─── Helpers ─────���───────────────────────────────────────────────── */

const QUADRANT_CONFIG = {
  star: {
    label: 'Stars',
    color: '#1DB77A',
    bg: 'bg-good/10',
    border: 'border-good/20',
    text: 'text-good',
  },
  'high-performer': {
    label: 'High Performers',
    color: '#4AB4E8',
    bg: 'bg-sky/10',
    border: 'border-sky/20',
    text: 'text-sky',
  },
  rising: {
    label: 'Rising Talent',
    color: '#FF9D2E',
    bg: 'bg-warn/10',
    border: 'border-warn/20',
    text: 'text-warn',
  },
  steady: {
    label: 'Steady',
    color: '#6B7A93',
    bg: 'bg-muted/10',
    border: 'border-muted/20',
    text: 'text-muted',
  },
  'at-risk': {
    label: 'At Risk',
    color: '#E53E5C',
    bg: 'bg-risk/10',
    border: 'border-risk/20',
    text: 'text-risk',
  },
  underperformer: {
    label: 'Needs Support',
    color: '#E53E5C',
    bg: 'bg-risk/10',
    border: 'border-risk/20',
    text: 'text-risk',
  },
} as const;

const flightRiskVariant = {
  low: 'ok' as const,
  medium: 'warn' as const,
  high: 'risk' as const,
};

/* Map to 2x2 grid position: x = performance (0-100), y = potential (0-100, inverted for SVG) */
function toGridX(performance: number): number {
  return Math.max(5, Math.min(95, performance));
}
function toGridY(potential: number): number {
  return Math.max(5, Math.min(95, 100 - potential));
}

/* ─── Quadrant Grid ───────────────────────────────────────────────── */

function QuadrantGrid({ data }: { data: TalentEntry[] }) {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <div className="bg-paper border border-line rounded-xl p-6">
      <div className="relative w-full" style={{ paddingBottom: '65%' }}>
        <div className="absolute inset-0">
          {/* Axis labels */}
          <div className="absolute left-1/2 bottom-0 -translate-x-1/2 text-[10px] tracking-[0.12em] uppercase font-bold text-muted pb-1">
            Performance
          </div>
          <div
            className="absolute left-0 top-1/2 text-[10px] tracking-[0.12em] uppercase font-bold text-muted"
            style={{ transform: 'rotate(-90deg) translateX(-50%)', transformOrigin: '0 0' }}
          >
            Potential
          </div>

          <svg
            viewBox="0 0 100 100"
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            {/* Background quadrants */}
            <rect x="50" y="0" width="50" height="50" fill="#1DB77A" opacity="0.06" />
            {/* Top-right: Stars */}
            <rect x="0" y="0" width="50" height="50" fill="#FF9D2E" opacity="0.06" />
            {/* Top-left: Rising */}
            <rect x="50" y="50" width="50" height="50" fill="#4AB4E8" opacity="0.06" />
            {/* Bottom-right: High Performer */}
            <rect x="0" y="50" width="50" height="50" fill="#E53E5C" opacity="0.06" />
            {/* Bottom-left: Needs Support */}

            {/* Cross lines */}
            <line x1="50" y1="0" x2="50" y2="100" stroke="#E2E6EC" strokeWidth="0.4" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="#E2E6EC" strokeWidth="0.4" />

            {/* Labels */}
            <text x="75" y="7" textAnchor="middle" className="fill-good text-[3.5px] font-bold uppercase">
              STARS
            </text>
            <text x="25" y="7" textAnchor="middle" className="fill-warn text-[3.5px] font-bold uppercase">
              RISING TALENT
            </text>
            <text x="75" y="97" textAnchor="middle" className="fill-sky text-[3.5px] font-bold uppercase">
              HIGH PERFORMERS
            </text>
            <text x="25" y="97" textAnchor="middle" className="fill-risk text-[3.5px] font-bold uppercase">
              NEEDS SUPPORT
            </text>

            {/* People dots */}
            {data.map((person) => {
              const cx = toGridX(person.performance);
              const cy = toGridY(person.potential);
              const qc = QUADRANT_CONFIG[person.quadrant];
              const isHovered = hovered === person.id;
              const flightColor =
                person.flightRisk === 'high'
                  ? '#E53E5C'
                  : person.flightRisk === 'medium'
                    ? '#FF9D2E'
                    : qc.color;

              return (
                <g key={person.id}>
                  {/* Flight risk ring */}
                  {person.flightRisk !== 'low' && (
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isHovered ? 6 : 5}
                      fill="none"
                      stroke={flightColor}
                      strokeWidth="0.5"
                      strokeDasharray="1.5 1"
                      className="transition-all duration-200"
                    />
                  )}
                  <circle
                    cx={cx}
                    cy={cy}
                    r={isHovered ? 4 : 3}
                    fill={qc.color}
                    opacity={isHovered ? 1 : 0.85}
                    stroke="white"
                    strokeWidth="0.5"
                    className="transition-all duration-200 cursor-pointer"
                    onMouseEnter={() => setHovered(person.id)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  <text
                    x={cx}
                    y={cy - (isHovered ? 6 : 4.5)}
                    textAnchor="middle"
                    className={cn(
                      'fill-navy font-bold transition-opacity duration-200',
                      isHovered ? 'text-[3.5px] opacity-100' : 'text-[2.8px] opacity-70',
                    )}
                  >
                    {person.name}
                  </text>
                  {isHovered && (
                    <text
                      x={cx}
                      y={cy + 7}
                      textAnchor="middle"
                      className="fill-muted text-[2.2px]"
                    >
                      P:{person.performance} / Pot:{person.potential} / {person.team}
                    </text>
                  )}
                </g>
              );
            })}
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─── Component ────────���──────────────────────────────────────────── */

export function TalentPeople({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const totalPeople = talentData.length;
  const stars = talentData.filter((t) => t.quadrant === 'star').length;
  const highFlight = talentData.filter((t) => t.flightRisk === 'high').length;
  const avgEngagement = Math.round(
    talentData.reduce((s, t) => s + t.engagementScore, 0) / totalPeople,
  );

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (t: TalentEntry) => <BrandCell>{t.name}</BrandCell>,
    },
    {
      key: 'manager',
      header: 'Manager',
      render: (t: TalentEntry) => <span className="text-[13px] text-ink">{t.manager}</span>,
    },
    {
      key: 'quadrant',
      header: 'Quadrant',
      render: (t: TalentEntry) => {
        const qc = QUADRANT_CONFIG[t.quadrant];
        return (
          <span className={cn('text-[10px] font-bold px-2 py-0.5 rounded', qc.bg, qc.text)}>
            {qc.label}
          </span>
        );
      },
    },
    {
      key: 'performance',
      header: 'Performance',
      render: (t: TalentEntry) => <MonoCell>{t.performance}</MonoCell>,
    },
    {
      key: 'potential',
      header: 'Potential',
      render: (t: TalentEntry) => <MonoCell>{t.potential}</MonoCell>,
    },
    {
      key: 'tenure',
      header: 'Tenure (mo)',
      render: (t: TalentEntry) => <MonoCell>{t.tenure}</MonoCell>,
    },
    {
      key: 'flightRisk',
      header: 'Flight Risk',
      render: (t: TalentEntry) => (
        <StatusDot
          variant={flightRiskVariant[t.flightRisk]}
          label={t.flightRisk.charAt(0).toUpperCase() + t.flightRisk.slice(1)}
        />
      ),
    },
    {
      key: 'engagement',
      header: 'Engagement',
      render: (t: TalentEntry) => (
        <span
          className={cn(
            'font-mono text-[12px] font-bold',
            t.engagementScore >= 75 ? 'text-good' : t.engagementScore >= 55 ? 'text-warn' : 'text-risk',
          )}
        >
          {t.engagementScore}
        </span>
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      {/* ── Summary Metrics ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total People"
          value={String(totalPeople)}
          sub="Across all teams"
        />
        <MetricCard
          label="Stars"
          value={String(stars)}
          sub="High performance + high potential"
          subColor="good"
        />
        <MetricCard
          label="High Flight Risk"
          value={String(highFlight)}
          sub={highFlight > 0 ? 'Requires immediate attention' : 'No immediate concerns'}
          subColor={highFlight > 0 ? 'risk' : 'good'}
        />
        <MetricCard
          label="Avg Engagement"
          value={String(avgEngagement)}
          sub={avgEngagement >= 70 ? 'Healthy' : 'Needs attention'}
          subColor={avgEngagement >= 70 ? 'good' : 'warn'}
        />
      </div>

      {/* ── Quadrant Grid ─────────────────────────────────────────── */}
      <SectionHeading title="Performance / Potential Matrix" />
      <QuadrantGrid data={talentData} />

      {/* ── Quadrant Summary Cards ────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6 mb-6">
        {(['star', 'high-performer', 'rising', 'at-risk'] as const).map((q) => {
          const qc = QUADRANT_CONFIG[q];
          const people = talentData.filter((t) => t.quadrant === q);
          return (
            <div key={q} className={cn('rounded-xl border p-4', qc.bg, qc.border)}>
              <div className={cn('text-[10px] tracking-[0.12em] uppercase font-bold mb-1', qc.text)}>
                {qc.label}
              </div>
              <div className="font-display font-[800] text-[30px] text-navy leading-none mb-1">
                {people.length}
              </div>
              <div className="text-[11px] text-muted">
                {people.map((p) => p.name).join(', ') || 'None'}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── People Table ──────────────────────────────────────────── */}
      <SectionHeading title="All People" count={totalPeople} />
      <DataTable
        columns={columns}
        data={talentData.sort((a, b) => b.performance - a.performance)}
        onRowClick={(t) => onNavigate('performance-matrix', t.id)}
      />
    </div>
  );
}
