'use client';

import { cn } from '@/lib/utils';

interface MiniBarChartProps {
  value: number;
  max?: number;
  color?: string;
  height?: number;
  label?: string;
  className?: string;
}

export function MiniBarChart({ value, max = 100, color, height = 8, label, className }: MiniBarChartProps) {
  const pct = Math.min((value / max) * 100, 100);

  return (
    <div className={cn('w-full', className)}>
      {label && (
        <div className="flex justify-between text-[11px] text-muted mb-1">
          <span>{label}</span>
          <span className="font-mono font-semibold text-ink">{value}%</span>
        </div>
      )}
      <div className="bg-line-soft rounded-full overflow-hidden" style={{ height }}>
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${pct}%`,
            background: color || '#4AB4E8',
          }}
        />
      </div>
    </div>
  );
}
