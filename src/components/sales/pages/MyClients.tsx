'use client';

import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { myClients, type MyClient } from '@/lib/data/sales/myClients';
import { cn, formatCurrency } from '@/lib/utils';

function healthColor(score: number): string {
  if (score >= 85) return 'text-good';
  if (score >= 70) return 'text-warn';
  return 'text-risk';
}

function healthBg(score: number): string {
  if (score >= 85) return 'bg-good/10';
  if (score >= 70) return 'bg-warn/10';
  return 'bg-risk/10';
}

function trendArrow(trend: MyClient['healthTrend']): string {
  if (trend === 'up') return '\u2191';
  if (trend === 'down') return '\u2193';
  return '\u2192';
}

export function MyClients({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return myClients.filter(c =>
      c.name.toLowerCase().includes(q) ||
      c.agency.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          My Clients
        </h1>
        <p className="text-[13px] text-muted">
          {myClients.length} clients in portfolio
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, agency, or category..."
          className="w-full max-w-md bg-paper border border-line rounded-lg px-4 py-[9px] text-[13px] text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky transition-all"
        />
      </div>

      {/* Client Cards Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-[14px]">
        {filtered.map(client => (
          <div
            key={client.slug}
            onClick={() => onNavigate('client-detail', client.slug)}
            className={cn(
              'bg-paper border border-line rounded-xl p-5 cursor-pointer',
              'hover:translate-y-[-2px] hover:shadow-[0_6px_20px_rgba(14,42,92,0.08)] transition-all'
            )}
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="font-display font-[800] text-[20px] text-navy leading-none mb-1">
                  {client.name}
                </div>
                <div className="text-[11.5px] text-muted">
                  {client.agency} &middot; {client.category}
                </div>
              </div>
              <div className={cn(
                'flex items-center gap-1 px-2 py-[3px] rounded-lg text-[12px] font-bold',
                healthBg(client.healthScore),
                healthColor(client.healthScore)
              )}>
                {client.healthScore}
                <span className="text-[10px]">{trendArrow(client.healthTrend)}</span>
              </div>
            </div>

            {/* Metrics */}
            <div className="grid grid-cols-2 gap-3 mb-3">
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                  Current Q Spend
                </div>
                <div className="font-mono text-[13px] font-semibold text-navy">
                  {formatCurrency(client.currentQSpend)}
                </div>
              </div>
              <div>
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                  Lifetime Spend
                </div>
                <div className="font-mono text-[13px] font-semibold text-navy">
                  {formatCurrency(client.lifetimeSpend, true)}
                </div>
              </div>
            </div>

            {/* Dates + Contact */}
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-muted pt-3 border-t border-line-soft">
              <span>Last meeting: <strong className="text-ink">{client.lastMeeting}</strong></span>
              {client.nextMeeting && (
                <span>Next: <strong className="text-ink">{client.nextMeeting}</strong></span>
              )}
              <span>Key: <strong className="text-ink">{client.keyContact}</strong></span>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-10 text-[13px] text-muted">
          No clients match &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}
