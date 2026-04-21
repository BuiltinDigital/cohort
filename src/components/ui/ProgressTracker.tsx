'use client';

import { cn } from '@/lib/utils';
import { RAGBadge } from './RAGBadge';

interface ProgressTrackerProps {
  progress: number;
  status: 'green' | 'amber' | 'red';
  spent?: number;
  budget?: number;
  nextMilestone?: string;
  nextMilestoneDate?: string;
  className?: string;
}

export function ProgressTracker({
  progress, status, spent, budget,
  nextMilestone, nextMilestoneDate, className,
}: ProgressTrackerProps) {
  const barColor = status === 'green' ? 'bg-good' : status === 'amber' ? 'bg-warn' : 'bg-risk';

  return (
    <div className={cn('space-y-3', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="font-mono text-[13px] font-bold text-navy">{progress}%</span>
          <RAGBadge status={status} />
        </div>
        {budget !== undefined && spent !== undefined && (
          <span className="font-mono text-[11px] text-muted">
            £{(spent / 1000).toFixed(0)}k / £{(budget / 1000).toFixed(0)}k spent
          </span>
        )}
      </div>

      <div className="h-2 bg-line-soft rounded-full overflow-hidden">
        <div className={cn('h-full rounded-full transition-all', barColor)} style={{ width: `${progress}%` }} />
      </div>

      {nextMilestone && (
        <div className="text-[11px] text-muted">
          Next: <span className="text-ink font-medium">{nextMilestone}</span>
          {nextMilestoneDate && <span className="font-mono ml-1">· {nextMilestoneDate}</span>}
        </div>
      )}
    </div>
  );
}
