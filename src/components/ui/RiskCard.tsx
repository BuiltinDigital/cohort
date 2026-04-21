'use client';

import { cn } from '@/lib/utils';

interface RiskCardProps {
  variant: 'alert' | 'warn' | 'ok';
  owner: string;
  agency: string;
  campaign: string;
  client: string;
  delivered: number;
  target: number;
  deltaLabel: string;
  actionLabel: string;
  impactLabel: string;
  onClick?: () => void;
}

const pillStyles = {
  alert: { bg: 'bg-risk', label: 'At Risk Now' },
  warn: { bg: 'bg-warn', label: 'At Risk Soon' },
  ok: { bg: 'bg-good', label: 'Action Ready' },
};

const barColors = {
  alert: 'bg-risk',
  warn: 'bg-warn',
  ok: 'bg-good',
};

export function RiskCard({
  variant, owner, agency, campaign, client,
  delivered, target, deltaLabel, actionLabel, impactLabel, onClick
}: RiskCardProps) {
  const pct = Math.round((delivered / target) * 100);
  const targetPct = 82; // approximate visual target line position

  return (
    <div
      onClick={onClick}
      className={cn(
        'bg-paper border border-line rounded-[10px] p-4 lg:p-5 cursor-pointer',
        'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.08)] transition-all',
        variant === 'alert' && 'border-risk/30 bg-gradient-to-b from-risk-soft/60 to-paper',
        variant === 'warn' && 'border-warn/30 bg-gradient-to-b from-warn-soft/60 to-paper',
      )}
    >
      <span className={cn(
        'inline-block text-[10px] font-bold tracking-[0.1em] uppercase px-2 py-[3px] rounded mb-[10px] text-paper',
        pillStyles[variant].bg
      )}>
        {pillStyles[variant].label}
      </span>

      <div className="text-[10.5px] text-muted font-medium mb-[6px]">
        Owned by {owner} · {agency}
      </div>

      <div className="font-display font-[800] text-[19px] text-navy leading-[1.05] mb-[3px]">
        {campaign}
      </div>

      <div className="text-[11px] text-muted mb-3">{client}</div>

      {/* Progress bar */}
      <div className="h-2 bg-line rounded relative overflow-visible mb-[6px]">
        <div
          className={cn('h-full rounded', barColors[variant])}
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-[-3px] bottom-[-3px] w-[2px] bg-navy rounded-sm"
          style={{ left: `${targetPct}%` }}
        />
      </div>

      <div className="flex justify-between text-[11px] font-mono mb-3">
        <span className="text-ink">
          {(delivered / 1000).toFixed(1)}k / <strong>{(target / 1000).toFixed(0)}k</strong>
        </span>
        <span className={cn(
          variant === 'alert' ? 'text-risk' :
          variant === 'warn' ? 'text-warn' :
          'text-good'
        )}>
          {deltaLabel}
        </span>
      </div>

      <button className={cn(
        'bg-navy text-paper px-3 py-2 rounded-[6px] text-[11px] font-semibold w-full',
        'flex justify-between items-center hover:bg-sky transition-colors'
      )}>
        {actionLabel}
        <span className="font-mono bg-white/15 px-[6px] py-[2px] rounded text-[10px]">{impactLabel}</span>
      </button>
    </div>
  );
}
