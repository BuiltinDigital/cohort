'use client';

import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RiskCard } from '@/components/ui/RiskCard';
import { salespeople, managers, salesTotal } from '@/lib/data/salespeople';
import { cn } from '@/lib/utils';

export function TeamOverview({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      {/* Hero Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-5 mb-6">
        {/* Team Hero Card */}
        <div className="bg-gradient-to-br from-sky to-sky-bright rounded-[14px] p-6 lg:p-7 text-paper relative overflow-hidden min-h-[240px]">
          <div className="absolute -top-10 -right-10 w-[180px] h-[180px] border-2 border-white/[0.18] rounded-full" />
          <div className="absolute -bottom-8 -left-4 w-[140px] h-[140px] border border-white/[0.1] rounded-full" />

          <div className="relative">
            <div className="text-[11px] tracking-[0.15em] uppercase font-semibold opacity-90 mb-1">My Team</div>
            <div className="font-display font-[900] text-[32px] leading-none mb-[14px]">Rachel&apos;s Team</div>

            <div className="flex items-baseline gap-[14px] mb-[14px]">
              <div className="font-display font-[900] text-[86px] leading-[0.85] tracking-[-0.03em]">87</div>
              <div>
                <div className="font-display font-bold text-[20px]">Delivery Confidence</div>
                <div className="text-[12px] opacity-85">↑ 4 pts past 7 days · On track</div>
              </div>
            </div>

            <div className="flex gap-2 items-center pt-[14px] border-t border-white/[0.18]">
              {salespeople.map(s => (
                <div key={s.id} className="w-[30px] h-[30px] rounded-full bg-paper text-navy flex items-center justify-center font-bold text-[12px] border-2 border-white/40">
                  {s.name[0]}
                </div>
              ))}
              <span className="text-[12px] opacity-90 ml-[6px]">
                {salespeople.map(s => s.name).join(' · ')}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <MetricCard label="Team Delivered Revenue YTD" value="£4.2" unit="m" sub={<><strong className="text-ink">95.8%</strong> of contracted</>} />
          <MetricCard label="Team Commission Pool" value="£218" unit="k" sub={<>Tracking <strong className="text-ink">+11%</strong> vs Q1</>} subColor="good" />
          <MetricCard label="Active Campaigns" value="18" sub={<><strong className="text-ink">2</strong> at risk · <strong className="text-ink">3</strong> watch</>} />
          <MetricCard label="Pipeline (Weighted)" value="£2.9" unit="m" sub="Q3 target: £3.4m" />
        </div>
      </div>

      {/* Salespeople */}
      <SectionHeading title="My Salespeople" count={salespeople.length} action="Manage team →" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px] mb-6">
        {salespeople.map(person => (
          <div key={person.id} className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 pb-[14px] border-b border-line mb-[14px]">
              <div
                className="w-[42px] h-[42px] rounded-full flex items-center justify-center font-bold text-[15px] text-paper flex-shrink-0"
                style={{ background: person.avatarColor }}
              >
                {person.name[0]}
              </div>
              <div>
                <div className="font-display font-[800] text-[20px] text-navy leading-none">{person.name}</div>
                <div className="text-[11px] text-muted mt-[3px]">{person.parentGroup} · {person.agencies.join(', ')}</div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-[14px] mb-[14px]">
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">Delivered Q2</div>
                <div className="font-display font-[800] text-[22px] text-navy leading-none">
                  £{(person.deliveredQ2 / 1_000_000).toFixed(1)}<span className="text-[13px] opacity-70">m</span>
                </div>
                <div className={cn('text-[10px] font-mono mt-[2px]', person.deliveryScoreDelta > 0 ? 'text-good' : 'text-risk')}>
                  ↑ {Math.abs(Math.round((person.deliveredQ2 / 2_000_000 - 1) * 100))}%
                </div>
              </div>
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">Delivery Score</div>
                <div className="font-display font-[800] text-[22px] text-navy leading-none">{person.deliveryScore}</div>
                <div className={cn('text-[10px] font-mono mt-[2px]', person.deliveryScoreDelta >= 0 ? 'text-good' : 'text-warn')}>
                  {person.deliveryScoreDelta >= 0 ? '↑' : '↓'} {Math.abs(person.deliveryScoreDelta)} pts
                </div>
              </div>
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[3px]">Campaigns</div>
                <div className="font-display font-[800] text-[22px] text-navy leading-none">{person.campaignCount}</div>
                <div className="text-[10px] text-muted mt-[2px]">
                  {person.atRisk > 0 && `${person.atRisk} at risk`}
                  {person.watching > 0 && ` · ${person.watching} watch`}
                </div>
              </div>
            </div>

            <div className="flex justify-between text-[11px] text-muted font-semibold mb-[6px]">
              <span>Q2 Target Progress</span>
              <span className="font-mono text-navy">{person.q2TargetProgress}% / 100%</span>
            </div>
            <div className="h-[7px] bg-line rounded overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-sky to-navy rounded"
                style={{ width: `${person.q2TargetProgress}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* Manager Leaderboard */}
      <SectionHeading title="Manager Leaderboard" action="View full breakdown →" />

      <div className="bg-paper border border-line rounded-xl px-5 lg:px-6 py-5 mb-6">
        {/* Header row */}
        <div className="grid grid-cols-[200px_1fr_100px_100px_70px] gap-4 text-[10px] uppercase tracking-[0.1em] text-muted font-bold pb-2 mb-1 hidden lg:grid">
          <div>Manager · Team</div>
          <div>Delivered</div>
          <div className="text-right">YTD £</div>
          <div className="text-right">vs Q1</div>
          <div className="text-center">Rank</div>
        </div>

        {/* Rachel (highlighted) */}
        {managers.filter(m => m.name === 'Rachel').map(m => (
          <div key={m.id} className="grid grid-cols-1 lg:grid-cols-[200px_1fr_100px_100px_70px] gap-3 lg:gap-4 items-center py-3 bg-sky-ghost -mx-3 px-3 rounded-lg border border-sky/10 mb-2">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-sky text-navy-deep flex items-center justify-center font-bold text-[12px]">R</div>
              <div>
                <div className="font-display font-bold text-[16px] text-navy">Rachel (you)</div>
                <div className="text-[10px] text-muted">{m.teams} · {m.reportCount} reports</div>
              </div>
            </div>
            <div className="h-[10px] bg-line rounded-[5px]">
              <div className="h-full rounded-[5px] bg-sky" style={{ width: '72%' }} />
            </div>
            <div className="font-mono text-[13px] font-semibold text-navy text-right">£{(m.ytdRevenue / 1_000_000).toFixed(1)}m</div>
            <div className={cn('font-mono text-[12px] font-semibold text-right', m.vsQ1Delta >= 0 ? 'text-good' : 'text-risk')}>
              {m.vsQ1Delta >= 0 ? '+' : ''}{m.vsQ1Delta}%
            </div>
            <div className="font-display font-[800] text-[24px] text-navy text-center">#{m.rank}</div>
          </div>
        ))}

        {/* Other managers */}
        {managers.filter(m => m.name !== 'Rachel').map(m => (
          <div key={m.id} className="grid grid-cols-1 lg:grid-cols-[200px_1fr_100px_100px_70px] gap-3 lg:gap-4 items-center py-3 border-b border-line-soft last:border-b-0">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full flex items-center justify-center font-bold text-[12px] text-paper" style={{ background: m.avatarColor }}>{m.name[0]}</div>
              <div>
                <div className="font-display font-bold text-[16px] text-navy">{m.name}</div>
                <div className="text-[10px] text-muted">{m.teams} · {m.reportCount} reports</div>
              </div>
            </div>
            <div className="h-[10px] bg-line rounded-[5px]">
              <div className="h-full rounded-[5px]" style={{
                width: `${(m.ytdRevenue / 5_000_000) * 100}%`,
                background: m.vsQ1Delta >= 0 ? 'var(--color-good)' : 'var(--color-warn)',
              }} />
            </div>
            <div className="font-mono text-[13px] font-semibold text-navy text-right">£{(m.ytdRevenue / 1_000_000).toFixed(1)}m</div>
            <div className={cn('font-mono text-[12px] font-semibold text-right', m.vsQ1Delta >= 0 ? 'text-good' : 'text-risk')}>
              {m.vsQ1Delta >= 0 ? '+' : ''}{m.vsQ1Delta}%
            </div>
            <div className="font-display font-[800] text-[24px] text-navy text-center">#{m.rank}</div>
          </div>
        ))}

        {/* Sales total */}
        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr_100px_100px_70px] gap-3 lg:gap-4 items-center pt-4 mt-2 border-t-2 border-navy">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-navy text-paper flex items-center justify-center font-bold text-[12px]">Σ</div>
            <div>
              <div className="font-display font-bold text-[16px] text-navy">Sales total</div>
              <div className="text-[10px] text-muted">All teams · 7 salespeople</div>
            </div>
          </div>
          <div className="h-[10px] bg-line rounded-[5px]">
            <div className="h-full rounded-[5px] bg-navy" style={{ width: '100%' }} />
          </div>
          <div className="font-mono text-[13px] font-semibold text-navy text-right">£{(salesTotal.ytdRevenue / 1_000_000).toFixed(1)}m</div>
          <div className="font-mono text-[12px] font-semibold text-right text-good">+{salesTotal.vsQ1Delta}%</div>
          <div className="font-display font-[800] text-[24px] text-navy text-center">—</div>
        </div>
      </div>

      {/* Needs Attention */}
      <SectionHeading title="Team Needs Attention" count={3} action="View all →" />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        <RiskCard
          variant="alert"
          owner="Alicia" agency="Starcom"
          campaign="Audi — Easter Drive"
          client="Direct + Programmatic · £180k"
          delivered={42100} target={63000}
          deltaLabel="-33%"
          actionLabel="Reallocate inventory"
          impactLabel="+18%"
        />
        <RiskCard
          variant="warn"
          owner="Renita" agency="OMD"
          campaign="Pepsi — Summer Sizzle"
          client="Content + Partnership · £290k"
          delivered={340000} target={480000}
          deltaLabel="-7% trend"
          actionLabel="Activate 'Gen Z' segment"
          impactLabel="+11%"
        />
        <RiskCard
          variant="ok"
          owner="Alicia" agency="Spark"
          campaign="Virgin Atlantic — Long-Haul"
          client="Partnership + Direct · £240k"
          delivered={218000} target={240000}
          deltaLabel="+3% ahead"
          actionLabel="Upsell Q3 renewal"
          impactLabel="£64k"
        />
      </div>
    </div>
  );
}
