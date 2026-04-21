'use client';

import { salespeople } from '@/lib/data/salespeople';
import { campaigns } from '@/lib/data/campaigns';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from '@/components/ui/MetricCard';
import { cn } from '@/lib/utils';
import { Download, Calendar, Clock, CheckCircle, AlertTriangle } from 'lucide-react';

const actions = [
  {
    priority: 'HIGH',
    text: 'Audi Easter Drive — reallocate inventory to recover delivery shortfall',
    color: 'text-risk',
    bg: 'bg-risk/10',
    borderColor: 'border-risk/20',
  },
  {
    priority: 'MEDIUM',
    text: 'Pepsi Summer Sizzle — activate Gen Z segment before mid-month review',
    color: 'text-warn',
    bg: 'bg-warn/10',
    borderColor: 'border-warn/20',
  },
  {
    priority: 'LOW',
    text: 'Virgin Atlantic — prepare Q3 renewal proposal, campaign overdelivering',
    color: 'text-good',
    bg: 'bg-good/10',
    borderColor: 'border-good/20',
  },
];

const nextWeekItems = [
  'Monday — Q2 mid-quarter review with Sales Director',
  'Tuesday — Pepsi campaign optimisation call with OMD',
  'Wednesday — Toyota Hybrid Horizons campaign kick-off',
  'Thursday — Agency scorecard review (Publicis group)',
  'Friday — Pipeline clean-up and CRM audit',
];

export function WeeklyReport({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const alicia = salespeople.find(s => s.id === 'alicia')!;
  const renita = salespeople.find(s => s.id === 'renita')!;

  return (
    <div className="animate-fade-up">
      {/* ─── Report Header ────────────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 mb-6">
        <div>
          <h2 className="font-display font-[900] text-[28px] lg:text-[34px] text-navy leading-none mb-2">
            Weekly Report — W/C 14 April 2026
          </h2>
          <div className="flex items-center gap-3 text-[12px] text-muted">
            <span className="inline-flex items-center gap-[5px]">
              <Calendar className="w-[13px] h-[13px]" />
              Auto-generated Monday 08:00
            </span>
            <span className="inline-flex items-center gap-[5px]">
              <Clock className="w-[13px] h-[13px]" />
              Rachel&apos;s Team
            </span>
          </div>
        </div>
        <button className="inline-flex items-center gap-2 px-4 py-[9px] bg-navy text-paper text-[12px] font-semibold rounded-[10px] hover:bg-ink transition-colors w-fit">
          <Download className="w-4 h-4" />
          Download PDF
        </button>
      </div>

      {/* ─── Executive Summary ────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-[#f0f8ff] to-paper border border-line rounded-xl p-5 lg:p-6 mb-6">
        <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-bold mb-2">Executive Summary</div>
        <p className="text-[14px] text-ink leading-relaxed font-medium">
          This week Rachel&apos;s team delivered <strong className="text-navy">£186k</strong> across{' '}
          <strong className="text-navy">18 active campaigns</strong>. Delivery confidence rose{' '}
          <strong className="text-good">4 points to 87</strong>. Two campaigns require immediate attention.
        </p>
      </div>

      {/* ─── Key Metrics ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Weekly Revenue" value="£186k" sub="vs £172k prev week" subColor="good" />
        <MetricCard label="Delivery Confidence" value="87" sub="+ 4 pts this week" subColor="good" />
        <MetricCard label="Campaigns Active" value="18" sub="2 at risk" subColor="warn" />
        <MetricCard label="Actions Required" value="2" sub="1 high priority" subColor="risk" />
      </div>

      {/* ─── Team Performance ─────────────────────────────────────────────── */}
      <SectionHeading title="Team Performance" count={2} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px] mb-6">
        {/* Alicia */}
        <div className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-[14px] border-b border-line mb-[14px]">
            <div
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold text-[15px] text-paper flex-shrink-0"
              style={{ background: alicia.avatarColor }}
            >
              A
            </div>
            <div>
              <div className="font-display font-[800] text-[20px] text-navy leading-none">Alicia</div>
              <div className="text-[11px] text-muted mt-[3px]">Publicis Group</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
            <div>
              <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">Revenue This Week</div>
              <div className="font-display font-[800] text-[22px] text-navy leading-none">£104k</div>
            </div>
            <div>
              <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">Campaigns</div>
              <div className="font-display font-[800] text-[22px] text-navy leading-none">
                7 <span className="text-[13px] text-good font-semibold">on track</span>
                {' '}<span className="text-[13px] text-risk font-semibold">1 at risk</span>
              </div>
            </div>
          </div>

          <div className="space-y-[6px]">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-[14px] h-[14px] text-good flex-shrink-0 mt-[2px]" />
              <span className="text-[12px] text-ink">Samsung Smart Home Edit completed ahead of schedule — 103% delivery</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-[14px] h-[14px] text-good flex-shrink-0 mt-[2px]" />
              <span className="text-[12px] text-ink">L&apos;Oreal Glow Up Series pacing well at 80% delivery</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-[14px] h-[14px] text-risk flex-shrink-0 mt-[2px]" />
              <span className="text-[12px] text-ink">Audi Easter Drive underdelivering — needs inventory reallocation</span>
            </div>
          </div>
        </div>

        {/* Renita */}
        <div className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow">
          <div className="flex items-center gap-3 pb-[14px] border-b border-line mb-[14px]">
            <div
              className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold text-[15px] text-paper flex-shrink-0"
              style={{ background: renita.avatarColor }}
            >
              R
            </div>
            <div>
              <div className="font-display font-[800] text-[20px] text-navy leading-none">Renita</div>
              <div className="text-[11px] text-muted mt-[3px]">Omnicom Group</div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-[14px] mb-[14px]">
            <div>
              <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">Revenue This Week</div>
              <div className="font-display font-[800] text-[22px] text-navy leading-none">£82k</div>
            </div>
            <div>
              <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">Campaigns</div>
              <div className="font-display font-[800] text-[22px] text-navy leading-none">
                6 <span className="text-[13px] text-good font-semibold">on track</span>
                {' '}<span className="text-[13px] text-risk font-semibold">1 at risk</span>
              </div>
            </div>
          </div>

          <div className="space-y-[6px]">
            <div className="flex items-start gap-2">
              <CheckCircle className="w-[14px] h-[14px] text-good flex-shrink-0 mt-[2px]" />
              <span className="text-[12px] text-ink">Specsavers Screen Time at 90% delivery — strong finish expected</span>
            </div>
            <div className="flex items-start gap-2">
              <CheckCircle className="w-[14px] h-[14px] text-good flex-shrink-0 mt-[2px]" />
              <span className="text-[12px] text-ink">John Lewis Outdoor Living pacing steady across direct + content</span>
            </div>
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-[14px] h-[14px] text-warn flex-shrink-0 mt-[2px]" />
              <span className="text-[12px] text-ink">Pepsi Summer Sizzle needs Gen Z segment activation before mid-month</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Risk & Actions ───────────────────────────────────────────────── */}
      <SectionHeading title="Risk & Actions" count={actions.length} />

      <div className="space-y-[10px] mb-6">
        {actions.map((action, i) => (
          <div
            key={i}
            className={cn(
              'bg-paper border rounded-xl px-5 py-4 flex items-center gap-4',
              action.borderColor
            )}
          >
            <span className={cn(
              'text-[10px] tracking-[0.1em] uppercase font-bold px-[10px] py-[4px] rounded-md flex-shrink-0',
              action.bg, action.color
            )}>
              {action.priority}
            </span>
            <span className="text-[13px] text-ink font-medium">{action.text}</span>
          </div>
        ))}
      </div>

      {/* ─── Pipeline Update ──────────────────────────────────────────────── */}
      <SectionHeading title="Pipeline Update" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="flex items-baseline gap-3 mb-3">
          <span className="font-display font-[800] text-[30px] text-navy leading-none">£2.9m</span>
          <span className="text-[14px] text-muted font-medium">weighted pipeline for Q3</span>
        </div>
        <p className="text-[13px] text-ink font-medium">
          3 deals in <strong className="text-navy">Verbal Yes</strong> stage worth{' '}
          <strong className="text-navy">£480k</strong>. Pipeline coverage sits at{' '}
          <span className="font-mono text-good font-semibold">0.85x</span> against Q3 target of £3.4m.
        </p>
      </div>

      {/* ─── Next Week Preview ────────────────────────────────────────────── */}
      <SectionHeading title="Next Week Preview" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="space-y-[8px]">
          {nextWeekItems.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              <span className="w-[6px] h-[6px] rounded-full bg-sky flex-shrink-0 mt-[7px]" />
              <span className="text-[13px] text-ink font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
