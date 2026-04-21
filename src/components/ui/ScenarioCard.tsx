'use client';

import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/utils';

interface Scenario {
  label: string;
  value: number;
  highlight?: boolean;
}

interface ScenarioCardProps {
  title: string;
  subtitle?: string;
  scenarios: Scenario[];
  confidence?: number;
  confidenceLabel?: string;
  className?: string;
}

export function ScenarioCard({ title, subtitle, scenarios, confidence, confidenceLabel, className }: ScenarioCardProps) {
  return (
    <div className={cn(
      'bg-gradient-to-br from-ink to-navy-mid rounded-[14px] p-6 lg:p-7 text-paper relative overflow-hidden',
      className
    )}>
      <div className="absolute -top-10 -right-10 w-[180px] h-[180px] border-2 border-white/[0.08] rounded-full" />
      <div className="absolute -bottom-8 -left-4 w-[120px] h-[120px] border border-white/[0.06] rounded-full" />

      <div className="relative">
        <div className="text-[11px] tracking-[0.15em] uppercase font-semibold text-sky mb-1">{title}</div>
        {subtitle && <div className="text-[12px] text-white/60 mb-5">{subtitle}</div>}

        <div className="grid grid-cols-3 gap-4">
          {scenarios.map(s => (
            <div key={s.label} className={cn(
              'text-center',
              s.highlight && 'relative'
            )}>
              <div className="text-[10px] tracking-[0.1em] uppercase text-white/50 font-semibold mb-2">
                {s.label}
              </div>
              <div className={cn(
                'font-display font-[900] leading-none tracking-[-0.03em]',
                s.highlight ? 'text-[44px] text-sky-bright' : 'text-[36px] text-white/90'
              )}>
                {formatCurrency(s.value, true)}
              </div>
            </div>
          ))}
        </div>

        {confidence !== undefined && (
          <div className="mt-5 pt-4 border-t border-white/[0.1] text-[12px] text-white/60">
            <span className="font-semibold text-white/80">{confidence}% confidence</span>
            {confidenceLabel && <span> · {confidenceLabel}</span>}
          </div>
        )}
      </div>
    </div>
  );
}
