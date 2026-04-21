'use client';

import { cn } from '@/lib/utils';

type StatusVariant = 'ok' | 'warn' | 'risk' | 'cold';

const variants: Record<StatusVariant, { dot: string; text: string }> = {
  ok: { dot: 'bg-good', text: 'text-good' },
  warn: { dot: 'bg-warn', text: 'text-warn' },
  risk: { dot: 'bg-risk', text: 'text-risk' },
  cold: { dot: 'bg-muted-soft', text: 'text-muted' },
};

interface StatusDotProps {
  variant: StatusVariant;
  label: string;
  className?: string;
}

export function StatusDot({ variant, label, className }: StatusDotProps) {
  const v = variants[variant];
  return (
    <span className={cn('inline-flex items-center gap-[6px] text-[11.5px] font-semibold', v.text, className)}>
      <span className={cn('w-[7px] h-[7px] rounded-full', v.dot)} />
      {label}
    </span>
  );
}
