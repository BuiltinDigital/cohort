'use client';

import { salespeople, managers } from '@/lib/data/salespeople';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { cn } from '@/lib/utils';

const commissionMembers = [
  {
    name: 'Rachel',
    role: 'Manager Override',
    base: 42_000,
    multiplier: 1.15,
    current: 48_300,
    target: 55_000,
    avatarColor: '#4AB4E8',
  },
  {
    name: 'Alicia',
    role: 'Individual',
    base: 82_000,
    multiplier: 1.2,
    current: 98_400,
    target: 110_000,
    avatarColor: '#7B4EC9',
  },
  {
    name: 'Renita',
    role: 'Individual',
    base: 71_000,
    multiplier: 1.1,
    current: 78_100,
    target: 88_000,
    avatarColor: '#E89F4A',
  },
];

const commissionTiers = [
  { tier: 'Base', range: '£0 – £3m', rate: '3%', active: false },
  { tier: 'Accelerator', range: '£3m – £4m', rate: '4%', active: true },
  { tier: 'Super', range: '£4m+', rate: '5.5%', active: false },
];

const quarterData = [
  { quarter: 'Q1 2026', value: 196_000, label: '£196k' },
  { quarter: 'Q2 2026', value: 218_000, label: '£218k' },
];

export function CommissionPage({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      {/* ─── Hero Card ────────────────────────────────────────────────────── */}
      <div className="bg-gradient-to-br from-sky to-sky-bright rounded-[14px] p-6 lg:p-8 text-paper relative overflow-hidden mb-6">
        <div className="absolute -top-10 -right-10 w-[180px] h-[180px] border-2 border-white/[0.18] rounded-full" />
        <div className="absolute -bottom-8 -left-4 w-[140px] h-[140px] border border-white/[0.1] rounded-full" />

        <div className="relative">
          <div className="text-[11px] tracking-[0.15em] uppercase font-semibold opacity-90 mb-1">
            Q2 Commission
          </div>
          <div className="font-display font-[900] text-[32px] leading-none mb-3">
            Team Commission Pool
          </div>
          <div className="font-display font-[900] text-[72px] leading-[0.9] tracking-[-0.03em] mb-3">
            £218k
          </div>
          <div className="text-[14px] opacity-85 font-medium">
            Tracking <strong>+11%</strong> vs Q1
          </div>
        </div>
      </div>

      {/* ─── Commission Breakdown ─────────────────────────────────────────── */}
      <SectionHeading title="Commission Breakdown" count={3} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-[14px] mb-6">
        {commissionMembers.map(member => {
          const progress = Math.round((member.current / member.target) * 100);
          return (
            <div key={member.name} className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow">
              {/* Header */}
              <div className="flex items-center gap-3 pb-[14px] border-b border-line mb-[14px]">
                <div
                  className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold text-[15px] text-paper flex-shrink-0"
                  style={{ background: member.avatarColor }}
                >
                  {member.name[0]}
                </div>
                <div>
                  <div className="font-display font-[800] text-[20px] text-navy leading-none">{member.name}</div>
                  <div className="text-[11px] text-muted mt-[3px]">{member.role}</div>
                </div>
              </div>

              {/* Stats */}
              <div className="space-y-[10px] mb-[14px]">
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">Base Commission</span>
                  <span className="font-mono text-[13px] text-ink font-semibold">£{(member.base / 1_000).toFixed(0)}k</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">Multiplier</span>
                  <span className="font-mono text-[13px] text-good font-bold">{member.multiplier}x</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">Current Earnings</span>
                  <span className="font-display font-[800] text-[22px] text-navy leading-none">
                    £{(member.current / 1_000).toFixed(1)}k
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">Target</span>
                  <span className="font-mono text-[12px] text-muted">£{(member.target / 1_000).toFixed(0)}k</span>
                </div>
              </div>

              {/* Progress Bar */}
              <div className="flex justify-between text-[11px] text-muted font-semibold mb-[6px]">
                <span>Progress</span>
                <span className="font-mono text-navy">{progress}%</span>
              </div>
              <div className="h-[7px] bg-line rounded overflow-hidden">
                <div
                  className={cn(
                    'h-full rounded transition-all',
                    progress >= 90 ? 'bg-gradient-to-r from-good to-good/80' :
                    progress >= 70 ? 'bg-gradient-to-r from-sky to-navy' :
                    'bg-gradient-to-r from-warn to-warn/80'
                  )}
                  style={{ width: `${Math.min(progress, 100)}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* ─── Commission Structure ─────────────────────────────────────────── */}
      <SectionHeading title="Commission Structure" />

      <div className="bg-paper border border-line rounded-xl overflow-hidden mb-6">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="text-left px-5 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line">Tier</th>
                <th className="text-left px-5 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line">Revenue Range</th>
                <th className="text-left px-5 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line">Rate</th>
                <th className="text-left px-5 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line">Status</th>
              </tr>
            </thead>
            <tbody>
              {commissionTiers.map(t => (
                <tr
                  key={t.tier}
                  className={cn(
                    'border-b border-line-soft last:border-b-0 transition-colors',
                    t.active && 'bg-sky-ghost'
                  )}
                >
                  <td className="px-5 py-[14px]">
                    <span className="font-display font-[800] text-[15px] text-navy">{t.tier}</span>
                  </td>
                  <td className="px-5 py-[14px]">
                    <span className="font-mono text-[12px] text-ink">{t.range}</span>
                  </td>
                  <td className="px-5 py-[14px]">
                    <span className="font-mono text-[13px] font-bold text-navy">{t.rate}</span>
                  </td>
                  <td className="px-5 py-[14px]">
                    {t.active ? (
                      <span className="inline-flex items-center gap-[6px] text-[11.5px] font-semibold text-good">
                        <span className="w-[7px] h-[7px] rounded-full bg-good" />
                        Current Tier
                      </span>
                    ) : (
                      <span className="text-[11.5px] text-muted font-medium">—</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Quarter-over-Quarter Commission ──────────────────────────────── */}
      <SectionHeading title="Quarter-over-Quarter Commission" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="flex items-end gap-6 justify-center h-[200px] pb-4">
          {quarterData.map(q => {
            const maxVal = Math.max(...quarterData.map(d => d.value));
            const heightPct = (q.value / maxVal) * 100;
            return (
              <div key={q.quarter} className="flex flex-col items-center gap-2">
                <span className="font-display font-[800] text-[18px] text-navy">{q.label}</span>
                <div
                  className={cn(
                    'w-[80px] lg:w-[120px] rounded-t-lg transition-all',
                    q.quarter === 'Q2 2026'
                      ? 'bg-gradient-to-t from-sky to-sky-bright'
                      : 'bg-gradient-to-t from-line to-off'
                  )}
                  style={{ height: `${heightPct}%`, minHeight: '40px' }}
                />
                <span className="text-[12px] text-muted font-semibold">{q.quarter}</span>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-2">
          <span className="font-mono text-[13px] text-good font-bold">+11.2%</span>
          <span className="text-[12px] text-muted ml-2">quarter-over-quarter growth</span>
        </div>
      </div>
    </div>
  );
}
