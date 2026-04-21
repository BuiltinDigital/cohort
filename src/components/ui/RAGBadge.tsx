'use client';

import { cn } from '@/lib/utils';

type RAGStatus = 'green' | 'amber' | 'red';

const styles: Record<RAGStatus, string> = {
  green: 'bg-good/15 text-good border-good/20',
  amber: 'bg-warn/15 text-warn border-warn/20',
  red: 'bg-risk/15 text-risk border-risk/20',
};

const labels: Record<RAGStatus, string> = {
  green: 'On Track',
  amber: 'At Risk',
  red: 'Off Track',
};

interface RAGBadgeProps {
  status: RAGStatus;
  label?: string;
  size?: 'sm' | 'md';
  className?: string;
}

export function RAGBadge({ status, label, size = 'sm', className }: RAGBadgeProps) {
  return (
    <span className={cn(
      'inline-flex items-center gap-1.5 font-semibold border rounded-md',
      size === 'sm' ? 'text-[10px] px-2 py-0.5' : 'text-[11px] px-2.5 py-1',
      styles[status],
      className,
    )}>
      <span className={cn(
        'rounded-full',
        size === 'sm' ? 'w-1.5 h-1.5' : 'w-2 h-2',
        status === 'green' ? 'bg-good' : status === 'amber' ? 'bg-warn' : 'bg-risk',
      )} />
      {label || labels[status]}
    </span>
  );
}
