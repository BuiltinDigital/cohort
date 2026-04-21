'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusDot } from '@/components/ui/StatusDot';
import { agencies, agencyGroups } from '@/lib/data/agencies';
import { cn, formatCurrency } from '@/lib/utils';
import { useState } from 'react';
import {
  ArrowUpRight,
  ArrowDownRight,
  Minus,
  Users,
  Calendar,
  TrendingUp,
} from 'lucide-react';

function TrendIcon({ trend }: { trend: 'up' | 'flat' | 'down' }) {
  if (trend === 'up') return <ArrowUpRight className="w-[14px] h-[14px] text-good" />;
  if (trend === 'down') return <ArrowDownRight className="w-[14px] h-[14px] text-risk" />;
  return <Minus className="w-[14px] h-[14px] text-muted" />;
}

function HealthBadge({ score, trend }: { score: number; trend: 'up' | 'flat' | 'down' }) {
  const variant: 'ok' | 'warn' | 'risk' = score >= 75 ? 'ok' : score >= 65 ? 'warn' : 'risk';
  const bg = variant === 'ok' ? 'bg-good/10' : variant === 'warn' ? 'bg-warn/10' : 'bg-risk/10';
  const ring = variant === 'ok' ? 'ring-good/30' : variant === 'warn' ? 'ring-warn/30' : 'ring-risk/30';
  const text = variant === 'ok' ? 'text-good' : variant === 'warn' ? 'text-warn' : 'text-risk';

  return (
    <div className="flex items-center gap-2">
      <div className={cn('w-[38px] h-[38px] rounded-full flex items-center justify-center font-display font-[800] text-[16px] ring-2', bg, ring, text)}>
        {score}
      </div>
      <TrendIcon trend={trend} />
    </div>
  );
}

const GROUP_COLORS: Record<string, string> = {
  Publicis: 'bg-violet-100 text-violet-700',
  Omnicom: 'bg-amber-100 text-amber-700',
};

const AVATAR_COLORS = [
  'bg-sky text-paper',
  'bg-navy text-paper',
  'bg-good text-paper',
];

export function AgencyScorecard({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <div className="animate-fade-up">
      {/* ------------------------------------------------------------------ */}
      {/* A) AGENCY GROUP SUMMARY                                            */}
      {/* ------------------------------------------------------------------ */}
      <SectionHeading title="Agency Group Summary" count={agencyGroups.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-6">
        {agencyGroups.map((group) => (
          <div
            key={group.name}
            className="bg-paper border border-line rounded-xl p-5"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="font-display font-[900] text-[22px] text-navy leading-none tracking-[0.01em]">
                  {group.name.toUpperCase()}
                </div>
                <div className="flex items-center gap-[6px] mt-[5px]">
                  <Users className="w-[13px] h-[13px] text-muted" />
                  <span className="text-[11px] text-muted font-semibold">Owner: {group.owner}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">
                  Immediate Spend
                </div>
                <div className="font-display font-[800] text-[30px] text-navy leading-none">
                  {formatCurrency(group.totalImmediateSpend, true)}
                </div>
              </div>
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">
                  Market Spend
                </div>
                <div className="font-display font-[800] text-[30px] text-navy leading-none">
                  {formatCurrency(group.totalMarketSpend, true)}
                </div>
              </div>
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">
                  Share of Wallet
                </div>
                <div className="font-display font-[800] text-[30px] text-navy leading-none">
                  {group.shareOfWallet}
                  <span className="text-[16px] opacity-60">%</span>
                </div>
              </div>
            </div>

            {/* Mini wallet bar */}
            <div className="mt-4">
              <div className="h-[6px] bg-line rounded overflow-hidden">
                <div
                  className="h-full bg-sky rounded"
                  style={{ width: `${group.shareOfWallet}%` }}
                />
              </div>
              <div className="text-[10px] text-muted mt-[3px] font-mono">
                {group.shareOfWallet}% of addressable market
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------------------------------------------------------------ */}
      {/* B) AGENCY CARDS GRID                                               */}
      {/* ------------------------------------------------------------------ */}
      <SectionHeading title="Agency Portfolio" count={agencies.length} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
        {agencies.map((agency) => (
          <div
            key={agency.id}
            onClick={() => onNavigate('agency-detail', agency.slug)}
            onMouseEnter={() => setHoveredCard(agency.id)}
            onMouseLeave={() => setHoveredCard(null)}
            className={cn(
              'bg-paper border border-line rounded-xl p-5 cursor-pointer transition-shadow',
              hoveredCard === agency.id && 'shadow-md border-sky/30',
            )}
          >
            {/* --- Card Header --- */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <div className="flex items-center gap-[10px]">
                  <span className="font-display font-[800] text-[22px] text-navy leading-none">
                    {agency.name}
                  </span>
                  <span className={cn(
                    'text-[10px] font-bold px-[8px] py-[2px] rounded-full',
                    GROUP_COLORS[agency.parentGroup] || 'bg-line text-muted',
                  )}>
                    {agency.parentGroup}
                  </span>
                </div>
                <div className="flex items-center gap-[6px] mt-[4px]">
                  <Users className="w-[12px] h-[12px] text-muted" />
                  <span className="text-[11px] text-muted font-semibold">{agency.owner}</span>
                </div>
              </div>
              <HealthBadge score={agency.healthScore} trend={agency.healthTrend} />
            </div>

            {/* --- Three Key Metrics --- */}
            <div className="grid grid-cols-3 gap-[14px] mb-4 pb-4 border-b border-line">
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">
                  Immediate Q2
                </div>
                <div className="font-display font-[800] text-[22px] text-navy leading-none">
                  {formatCurrency(agency.immediateSpendQ, true)}
                </div>
              </div>
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">
                  UK Market Q2
                </div>
                <div className="font-display font-[800] text-[22px] text-navy leading-none">
                  {formatCurrency(agency.marketSpendQ, true)}
                </div>
              </div>
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">
                  Share of Wallet
                </div>
                <div className="flex items-baseline gap-[6px]">
                  <span className="font-display font-[800] text-[22px] text-navy leading-none">
                    {agency.shareOfWallet}
                    <span className="text-[13px] opacity-60">%</span>
                  </span>
                  <span className={cn(
                    'text-[11px] font-mono font-semibold',
                    agency.sowYoYDelta > 0 ? 'text-good' : agency.sowYoYDelta < 0 ? 'text-risk' : 'text-muted',
                  )}>
                    {agency.sowYoYDelta > 0 ? '+' : ''}{agency.sowYoYDelta}%
                  </span>
                </div>
              </div>
            </div>

            {/* --- Wallet Share Bar --- */}
            <div className="mb-4">
              <div className="flex justify-between text-[11px] font-semibold text-muted mb-[5px]">
                <span>Wallet Share</span>
                <span className="font-mono text-navy">{agency.shareOfWallet}%</span>
              </div>
              <div className="h-[8px] bg-line rounded overflow-hidden">
                <div
                  className="h-full bg-sky rounded"
                  style={{ width: `${agency.shareOfWallet}%` }}
                />
              </div>
              <div className="flex justify-between mt-[3px]">
                <span className="text-[10px] text-muted font-mono">
                  {formatCurrency(agency.immediateSpendQ, true)} Immediate
                </span>
                <span className="text-[10px] text-muted font-mono">
                  {formatCurrency(agency.marketSpendQ - agency.immediateSpendQ, true)} others
                </span>
              </div>
            </div>

            {/* --- Top Advertisers --- */}
            <div className="mb-4">
              <div className="flex items-center gap-[5px] mb-[6px]">
                <TrendingUp className="w-[12px] h-[12px] text-muted" />
                <span className="text-[10px] tracking-[0.08em] uppercase text-muted font-semibold">
                  Top Advertisers
                </span>
              </div>
              <div className="space-y-[3px]">
                {agency.topAdvertisers.slice(0, 5).map((adv) => (
                  <div key={adv.name} className="flex justify-between items-center">
                    <span className="text-[12px] text-navy font-medium truncate mr-2">{adv.name}</span>
                    <span className="text-[11px] font-mono text-muted flex-shrink-0">
                      {formatCurrency(adv.spend, true)}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Contacts --- */}
            <div className="mb-4">
              <div className="flex items-center gap-[5px] mb-[6px]">
                <Users className="w-[12px] h-[12px] text-muted" />
                <span className="text-[10px] tracking-[0.08em] uppercase text-muted font-semibold">
                  Contacts
                </span>
              </div>
              <div className="flex items-center gap-[6px]">
                {agency.contacts.slice(0, 3).map((contact, i) => (
                  <div key={contact.email} className="flex items-center gap-[6px]">
                    <div
                      className={cn(
                        'w-[26px] h-[26px] rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0',
                        AVATAR_COLORS[i % AVATAR_COLORS.length],
                      )}
                    >
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span className="text-[11px] text-navy font-medium truncate max-w-[90px]">
                      {contact.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* --- Next Actions --- */}
            <div>
              <div className="flex items-center gap-[5px] mb-[6px]">
                <Calendar className="w-[12px] h-[12px] text-muted" />
                <span className="text-[10px] tracking-[0.08em] uppercase text-muted font-semibold">
                  Next Actions
                </span>
              </div>
              <div className="space-y-[3px]">
                {agency.nextActions.map((action) => (
                  <div key={action.label} className="flex justify-between items-center">
                    <span className="text-[12px] text-navy truncate mr-2">{action.label}</span>
                    <span className="text-[10px] font-mono text-muted flex-shrink-0">{action.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
