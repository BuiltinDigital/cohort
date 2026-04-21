'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { ProgressTracker } from '@/components/ui/ProgressTracker';
import { initiatives, type Initiative } from '@/lib/data/director/initiatives';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Strategic Initiatives  --  Director Dashboard                      */
/* ------------------------------------------------------------------ */

const onTrack = initiatives.filter((i) => i.status === 'green').length;
const atRisk = initiatives.filter((i) => i.status === 'amber' || i.status === 'red').length;

export function StrategicInitiatives({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  return (
    <div className="animate-fade-up">
      {/* ── SUMMARY METRICS ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-6">
        <MetricCard
          label="Total Initiatives"
          value={String(initiatives.length)}
          sub="Active strategic workstreams"
        />
        <MetricCard
          label="On Track"
          value={String(onTrack)}
          sub="Progressing as planned"
          subColor="good"
        />
        <MetricCard
          label="At Risk"
          value={String(atRisk)}
          sub="Require attention"
          subColor={atRisk > 0 ? 'warn' : 'good'}
        />
      </div>

      {/* ── INITIATIVE CARDS ─────────────────────────────────── */}
      <SectionHeading title="Initiatives" count={initiatives.length} />

      <div className="space-y-5">
        {initiatives.map((init) => (
          <div
            key={init.id}
            className={cn(
              'bg-paper border border-line rounded-xl p-5 transition-all',
              'hover:shadow-[0_4px_12px_rgba(10,31,68,0.06)]',
              init.status === 'red' && 'border-risk/25',
              init.status === 'amber' && 'border-warn/25',
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between gap-3 mb-3">
              <div>
                <div className="font-display font-[800] text-[18px] text-navy leading-tight">
                  {init.name}
                </div>
                <div className="text-[11px] text-muted mt-1">
                  Owner: <span className="font-semibold text-ink">{init.owner}</span>
                  <span className="mx-2">&middot;</span>
                  <span className="font-mono">
                    {init.startDate} &rarr; {init.targetDate}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <p className="text-[12px] text-muted leading-relaxed mb-4">
              {init.description}
            </p>

            {/* Progress tracker */}
            <ProgressTracker
              progress={init.progress}
              status={init.status}
              spent={init.spent}
              budget={init.budget}
              nextMilestone={init.nextMilestone}
              nextMilestoneDate={init.nextMilestoneDate}
            />

            {/* Last update */}
            {init.lastUpdate && (
              <div className="mt-4 pt-3 border-t border-line-soft">
                <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                  Latest Update
                </div>
                <p className="text-[12px] text-ink leading-relaxed">
                  {init.lastUpdate}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
