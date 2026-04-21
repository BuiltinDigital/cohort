'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { industryEvents, type IndustryEvent } from '@/lib/data/director/events';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Events Calendar  --  Director Dashboard                            */
/* ------------------------------------------------------------------ */

const typeStyles: Record<IndustryEvent['type'], { bg: string; label: string }> = {
  conference: { bg: 'bg-sky-soft text-sky', label: 'Conference' },
  'trading-review': { bg: 'bg-warn/15 text-warn', label: 'Trading Review' },
  tentpole: { bg: 'bg-[#a78bfa]/15 text-[#7c3aed]', label: 'Tentpole' },
  deadline: { bg: 'bg-risk/15 text-risk', label: 'Deadline' },
  internal: { bg: 'bg-muted/10 text-muted', label: 'Internal' },
};

const importanceStyles: Record<IndustryEvent['importance'], { bg: string; label: string }> = {
  critical: { bg: 'bg-risk/15 text-risk border border-risk/20', label: 'Critical' },
  high: { bg: 'bg-warn/15 text-warn border border-warn/20', label: 'High' },
  medium: { bg: 'bg-muted/10 text-muted border border-line', label: 'Medium' },
};

// Sort chronologically
const sortedEvents = [...industryEvents].sort(
  (a, b) => new Date(a.date).getTime() - new Date(b.date).getTime(),
);

export function EventsCalendar({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  return (
    <div className="animate-fade-up">
      {/* ── HEADER ───────────────────────────────────────────── */}
      <SectionHeading title="Upcoming Events" count={sortedEvents.length} />

      {/* ── EVENT CARDS ──────────────────────────────────────── */}
      <div className="space-y-4">
        {sortedEvents.map((evt) => {
          const typeBadge = typeStyles[evt.type];
          const importanceBadge = importanceStyles[evt.importance];
          const hasHighPipeline = evt.pipelineAtRisk !== undefined && evt.pipelineAtRisk >= 1_000_000;

          return (
            <div
              key={evt.id}
              className={cn(
                'bg-paper border border-line rounded-xl p-5 transition-all',
                'hover:shadow-[0_4px_12px_rgba(10,31,68,0.06)]',
                evt.importance === 'critical' && 'border-risk/25 bg-gradient-to-r from-risk-soft/30 to-paper',
              )}
            >
              {/* Top row: date + badges */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[12px] text-navy font-semibold">
                    {evt.date}
                    {evt.endDate && ` \u2013 ${evt.endDate}`}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded',
                      typeBadge.bg,
                    )}
                  >
                    {typeBadge.label}
                  </span>
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded',
                      importanceBadge.bg,
                    )}
                  >
                    {importanceBadge.label}
                  </span>
                </div>

                {/* Pipeline at risk — big number */}
                {evt.pipelineAtRisk !== undefined && (
                  <div className="text-right shrink-0">
                    <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-0.5">
                      Pipeline at Risk
                    </div>
                    <div
                      className={cn(
                        'font-display font-[800] text-[24px] leading-none',
                        hasHighPipeline ? 'text-risk' : 'text-warn',
                      )}
                    >
                      £{(evt.pipelineAtRisk / 1_000_000).toFixed(1)}m
                    </div>
                  </div>
                )}
              </div>

              {/* Event name */}
              <div className="font-display font-[800] text-[18px] text-navy leading-tight mb-2">
                {evt.name}
              </div>

              {/* Description */}
              <p className="text-[12px] text-muted leading-relaxed mb-3">
                {evt.description}
              </p>

              {/* Attendees */}
              {evt.attendees && evt.attendees.length > 0 && (
                <div className="flex items-center gap-2">
                  <span className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold">
                    Attendees
                  </span>
                  <div className="flex gap-1.5 flex-wrap">
                    {evt.attendees.map((name) => (
                      <span
                        key={name}
                        className="text-[11px] font-semibold text-ink bg-off px-2 py-0.5 rounded-full border border-line-soft"
                      >
                        {name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
