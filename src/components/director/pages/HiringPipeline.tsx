'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RAGBadge } from '@/components/ui/RAGBadge';
import { openRoles, hiringMetrics, type OpenRole } from '@/lib/data/director/hiring';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Hiring Pipeline  --  Director Dashboard                            */
/* ------------------------------------------------------------------ */

const statusStyles: Record<OpenRole['status'], { bg: string; label: string }> = {
  open: { bg: 'bg-sky-soft text-sky', label: 'Open' },
  interviewing: { bg: 'bg-warn/15 text-warn', label: 'Interviewing' },
  'offer-stage': { bg: 'bg-good/15 text-good', label: 'Offer Stage' },
  filled: { bg: 'bg-good/20 text-good', label: 'Filled' },
};

const priorityMap: Record<OpenRole['priority'], 'red' | 'amber' | 'green'> = {
  critical: 'red',
  high: 'amber',
  normal: 'green',
};

export function HiringPipeline({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  return (
    <div className="animate-fade-up">
      {/* ── SUMMARY METRICS ──────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Open Roles"
          value={String(hiringMetrics.openRoles)}
          sub="Across all teams"
        />
        <MetricCard
          label="Avg Days to Fill"
          value={String(hiringMetrics.avgDaysToFill)}
          sub="Last 12 months"
        />
        <MetricCard
          label="Offer Accept Rate"
          value={`${Math.round(hiringMetrics.offerAcceptRate * 100)}%`}
          sub="Rolling 12 months"
          subColor="good"
        />
        <MetricCard
          label="Pipeline Candidates"
          value={String(hiringMetrics.pipelineCandidates)}
          sub="Across all open roles"
        />
      </div>

      {/* ── OPEN ROLES ───────────────────────────────────────── */}
      <SectionHeading title="Open Roles" count={openRoles.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {openRoles.map((role) => {
          const statusStyle = statusStyles[role.status];
          const priorityRag = priorityMap[role.priority];

          return (
            <div
              key={role.id}
              className={cn(
                'bg-paper border border-line rounded-xl p-5 transition-all',
                'hover:shadow-[0_4px_12px_rgba(10,31,68,0.06)]',
                role.priority === 'critical' && 'border-risk/25',
              )}
            >
              {/* Header: title + status + priority */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="font-display font-[800] text-[18px] text-navy leading-tight mb-1">
                    {role.title}
                  </div>
                  <div className="text-[11px] text-muted">
                    {role.team} &middot; Reports to{' '}
                    <span className="font-semibold text-ink">{role.manager}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded',
                      statusStyle.bg,
                    )}
                  >
                    {statusStyle.label}
                  </span>
                  <RAGBadge
                    status={priorityRag}
                    label={role.priority.charAt(0).toUpperCase() + role.priority.slice(1)}
                  />
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-4 gap-3 mt-4">
                <div>
                  <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                    Level
                  </div>
                  <div className="font-mono text-[12px] text-ink font-semibold">{role.level}</div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                    Days Open
                  </div>
                  <div
                    className={cn(
                      'font-display font-[800] text-[20px] leading-none',
                      role.daysOpen > 30 ? 'text-warn' : 'text-navy',
                    )}
                  >
                    {role.daysOpen}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                    Candidates
                  </div>
                  <div className="font-display font-[800] text-[20px] leading-none text-navy">
                    {role.candidates}
                  </div>
                </div>
                <div>
                  <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-1">
                    Target Start
                  </div>
                  <div className="font-mono text-[12px] text-ink font-semibold">
                    {role.targetStartDate}
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
