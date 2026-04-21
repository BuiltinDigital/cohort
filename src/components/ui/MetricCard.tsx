'use client';

import { cn } from '@/lib/utils';

interface MetricCardProps {
  label: string;
  value: string;
  unit?: string;
  sub?: React.ReactNode;
  subColor?: 'good' | 'risk' | 'warn' | 'muted';
  className?: string;
}

export function MetricCard({ label, value, unit, sub, subColor = 'muted', className }: MetricCardProps) {
  return (
    <div className={cn(
      'bg-paper border border-line rounded-[10px] p-4 lg:px-[18px] lg:py-4',
      'shadow-[0_1px_3px_rgba(10,31,68,0.04)] hover:shadow-[0_4px_12px_rgba(10,31,68,0.06)] transition-shadow',
      className
    )}>
      <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-[6px]">
        {label}
      </div>
      <div className="font-display font-[800] text-[32px] leading-none text-navy tracking-[-0.01em]">
        {value}
        {unit && <span className="text-[18px] text-muted font-semibold">{unit}</span>}
      </div>
      {sub && (
        <div className={cn(
          'text-[11px] mt-[5px] font-medium',
          subColor === 'good' ? 'text-good' :
          subColor === 'risk' ? 'text-risk' :
          subColor === 'warn' ? 'text-warn' :
          'text-muted'
        )}>
          {sub}
        </div>
      )}
    </div>
  );
}
