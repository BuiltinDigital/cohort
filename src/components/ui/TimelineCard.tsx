'use client';

import { cn } from '@/lib/utils';

type TimelineVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const variantStyles: Record<TimelineVariant, { border: string; dot: string }> = {
  info: { border: 'border-l-sky', dot: 'bg-sky' },
  success: { border: 'border-l-good', dot: 'bg-good' },
  warning: { border: 'border-l-warn', dot: 'bg-warn' },
  danger: { border: 'border-l-risk', dot: 'bg-risk' },
  neutral: { border: 'border-l-muted-soft', dot: 'bg-muted-soft' },
};

interface TimelineCardProps {
  date: string;
  tag?: string;
  tagColor?: string;
  title: string;
  description: string;
  variant?: TimelineVariant;
  action?: string;
  onAction?: () => void;
  className?: string;
}

export function TimelineCard({
  date, tag, tagColor, title, description,
  variant = 'neutral', action, onAction, className,
}: TimelineCardProps) {
  const v = variantStyles[variant];

  return (
    <div className={cn(
      'bg-paper border border-line rounded-xl p-4 border-l-[3px] transition-shadow hover:shadow-md',
      v.border,
      className
    )}>
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex items-center gap-2">
          <span className={cn('w-2 h-2 rounded-full flex-shrink-0', v.dot)} />
          <span className="font-mono text-[11px] text-muted">{date}</span>
          {tag && (
            <span className={cn(
              'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded',
              tagColor || 'bg-sky-soft text-sky'
            )}>
              {tag}
            </span>
          )}
        </div>
        {action && (
          <button
            onClick={onAction}
            className="text-[11px] text-sky font-semibold hover:text-navy transition-colors flex-shrink-0"
          >
            {action}
          </button>
        )}
      </div>
      <h4 className="font-semibold text-[14px] text-navy mb-1">{title}</h4>
      <p className="text-[12px] text-muted leading-relaxed">{description}</p>
    </div>
  );
}
