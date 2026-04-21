'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MiniBarChart } from '@/components/ui/MiniBarChart';
import { RAGBadge } from '@/components/ui/RAGBadge';
import { talentData, type TalentEntry } from '@/lib/data/director/talentMatrix';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Flight Risk  --  Director Dashboard                                */
/* ------------------------------------------------------------------ */

const flightRiskPeople = talentData.filter(
  (p) => p.flightRisk === 'medium' || p.flightRisk === 'high',
);

const highCount = flightRiskPeople.filter((p) => p.flightRisk === 'high').length;
const mediumCount = flightRiskPeople.filter((p) => p.flightRisk === 'medium').length;

// Rough comp exposure based on average OTE * headcount at risk
const compExposure = flightRiskPeople.reduce((sum, p) => {
  const avgOte = p.flightRisk === 'high' ? 62_000 : 72_000;
  return sum + avgOte;
}, 0);

const riskBadge: Record<string, { status: 'red' | 'amber'; label: string }> = {
  high: { status: 'red', label: 'High Risk' },
  medium: { status: 'amber', label: 'Medium Risk' },
};

function recommendedAction(p: TalentEntry): string {
  if (p.flightRisk === 'high') {
    if (p.quotaAttainment[3] < p.quotaAttainment[0]) {
      return 'Performance conversation + retention package review';
    }
    return 'Urgent retention conversation with manager';
  }
  if (p.engagementScore < 65) {
    return 'Schedule 1:1 career development discussion';
  }
  return 'Comp review and progression path mapping';
}

export function FlightRisk({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  return (
    <div className="animate-fade-up">
      {/* ── SUMMARY METRICS ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <MetricCard
          label="High Risk"
          value={String(highCount)}
          sub="Immediate attention required"
          subColor="risk"
        />
        <MetricCard
          label="Medium Risk"
          value={String(mediumCount)}
          sub="Monitor closely"
          subColor="warn"
        />
        <MetricCard
          label="Total Comp Exposure"
          value={`£${Math.round(compExposure / 1000)}k`}
          sub="Combined OTE of at-risk people"
          subColor="muted"
        />
      </div>

      {/* ── PEOPLE AT RISK ───────────────────────────────────── */}
      <SectionHeading title="People at Risk" count={flightRiskPeople.length} />

      <div className="space-y-4">
        {flightRiskPeople
          .sort((a, b) => (a.flightRisk === 'high' ? -1 : 1))
          .map((person) => {
            const badge = riskBadge[person.flightRisk];
            const trend = person.quotaAttainment;
            const trendDirection =
              trend[3] > trend[0] ? 'improving' : trend[3] < trend[0] ? 'declining' : 'flat';
            const trendColor =
              trendDirection === 'improving'
                ? 'text-good'
                : trendDirection === 'declining'
                  ? 'text-risk'
                  : 'text-muted';

            return (
              <div
                key={person.id}
                className={cn(
                  'bg-paper border border-line rounded-xl p-5 transition-all',
                  'hover:shadow-[0_4px_12px_rgba(10,31,68,0.06)]',
                  person.flightRisk === 'high' && 'border-risk/30 bg-gradient-to-r from-risk-soft/40 to-paper',
                  person.flightRisk === 'medium' && 'border-warn/30',
                )}
              >
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="font-display font-[800] text-[20px] text-navy">
                      {person.name}
                    </div>
                    <RAGBadge status={badge.status} label={badge.label} size="md" />
                  </div>
                  <div className="text-[11px] text-muted">
                    Manager: <span className="font-semibold text-ink">{person.manager}</span>
                  </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                  {/* Left: tenure + engagement */}
                  <div className="space-y-3">
                    <div>
                      <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                        Tenure
                      </div>
                      <div className="font-mono text-[13px] text-ink font-semibold">
                        {person.tenure} months
                      </div>
                    </div>
                    <div>
                      <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                        Engagement Score
                      </div>
                      <MiniBarChart
                        value={person.engagementScore}
                        color={person.engagementScore >= 70 ? '#1DB77A' : person.engagementScore >= 50 ? '#FF9D2E' : '#E53E5C'}
                      />
                    </div>
                  </div>

                  {/* Centre: quota trend */}
                  <div>
                    <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-2">
                      Quota Trend (Last 4 Quarters)
                    </div>
                    <div className="flex items-end gap-2 h-[48px]">
                      {trend.map((q, i) => (
                        <div key={i} className="flex flex-col items-center gap-1 flex-1">
                          <div
                            className="w-full rounded-sm transition-all"
                            style={{
                              height: `${Math.max((q / 140) * 48, 4)}px`,
                              background: q >= 100 ? '#1DB77A' : q >= 85 ? '#FF9D2E' : '#E53E5C',
                            }}
                          />
                          <span className="font-mono text-[10px] text-muted">{q}%</span>
                        </div>
                      ))}
                    </div>
                    <div className={cn('text-[11px] font-semibold mt-2', trendColor)}>
                      {trendDirection === 'improving' && '\u2191 Improving'}
                      {trendDirection === 'declining' && '\u2193 Declining'}
                      {trendDirection === 'flat' && '\u2192 Flat'}
                    </div>
                  </div>

                  {/* Right: reasons + action */}
                  <div className="space-y-3">
                    {person.flightRiskReasons && person.flightRiskReasons.length > 0 && (
                      <div>
                        <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                          Risk Reasons
                        </div>
                        <ul className="space-y-1">
                          {person.flightRiskReasons.map((reason, i) => (
                            <li key={i} className="text-[12px] text-ink leading-relaxed flex items-start gap-1.5">
                              <span className="w-1 h-1 rounded-full bg-risk mt-[6px] shrink-0" />
                              {reason}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div>
                      <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                        Recommended Action
                      </div>
                      <div className="text-[12px] text-navy font-medium bg-sky-soft/50 rounded-md px-3 py-2">
                        {recommendedAction(person)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
