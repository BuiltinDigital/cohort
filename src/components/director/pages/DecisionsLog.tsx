'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineCard } from '@/components/ui/TimelineCard';
import { TabGroup } from '@/components/ui/TabGroup';
import { decisions, type Decision } from '@/lib/data/director/decisions';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Decisions Log  --  Director Dashboard                              */
/* ------------------------------------------------------------------ */

type TimelineVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const categoryTabs = ['All', 'Structural', 'Commercial', 'Investment', 'People', 'Product'];

const categoryColors: Record<Decision['category'], string> = {
  structural: 'bg-sky-soft text-sky',
  commercial: 'bg-good/15 text-good',
  investment: 'bg-warn/15 text-warn',
  people: 'bg-[#a78bfa]/15 text-[#7c3aed]',
  product: 'bg-[#f472b6]/15 text-[#db2777]',
};

const outcomeStyles: Record<string, { bg: string; label: string }> = {
  positive: { bg: 'bg-good/15 text-good', label: 'Positive' },
  mixed: { bg: 'bg-warn/15 text-warn', label: 'Mixed' },
  negative: { bg: 'bg-risk/15 text-risk', label: 'Negative' },
  'too-early': { bg: 'bg-muted/10 text-muted', label: 'Too Early' },
  'pending-review': { bg: 'bg-sky-soft text-sky', label: 'Pending Review' },
};

function decisionVariant(d: Decision): TimelineVariant {
  if (d.status === 'positive') return 'success';
  if (d.status === 'mixed') return 'warning';
  if (d.status === 'negative') return 'danger';
  if (d.status === 'too-early') return 'neutral';
  return 'info';
}

export function DecisionsLog({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered =
    activeTab === 'All'
      ? decisions
      : decisions.filter((d) => d.category === activeTab.toLowerCase());

  // Sort chronologically — most recent first
  const sorted = [...filtered].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );

  return (
    <div className="animate-fade-up">
      {/* ── CATEGORY FILTER ──────────────────────────────────── */}
      <TabGroup
        tabs={categoryTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {/* ── DECISIONS FEED ───────────────────────────────────── */}
      <SectionHeading title="Decisions" count={sorted.length} />

      <div className="space-y-4">
        {sorted.map((dec) => {
          const catColor = categoryColors[dec.category];
          const outcomeStyle = outcomeStyles[dec.status];

          return (
            <div key={dec.id}>
              <TimelineCard
                date={dec.date}
                tag={dec.category.charAt(0).toUpperCase() + dec.category.slice(1)}
                tagColor={catColor}
                title={dec.title}
                description={`${dec.context}\n\nDecision: ${dec.decision}\n\nRationale: ${dec.rationale}`}
                variant={decisionVariant(dec)}
              />

              {/* Outcome review section */}
              {dec.outcome && (
                <div className="ml-5 mt-[-1px] bg-paper border border-line border-t-0 rounded-b-xl px-4 py-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold">
                      Outcome Review
                    </div>
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded',
                        outcomeStyle.bg,
                      )}
                    >
                      {outcomeStyle.label}
                    </span>
                    {dec.outcomeDate && (
                      <span className="font-mono text-[10px] text-muted">
                        as of {dec.outcomeDate}
                      </span>
                    )}
                  </div>
                  <p className="text-[12px] text-ink leading-relaxed">{dec.outcome}</p>
                </div>
              )}

              {/* Pending status for decisions without outcomes */}
              {!dec.outcome && (
                <div className="ml-5 mt-[-1px] bg-paper border border-line border-t-0 rounded-b-xl px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold">
                      Outcome Review
                    </div>
                    <span
                      className={cn(
                        'text-[10px] font-bold px-2 py-0.5 rounded',
                        outcomeStyle.bg,
                      )}
                    >
                      {outcomeStyle.label}
                    </span>
                  </div>
                  <p className="text-[12px] text-muted mt-1">
                    Owner: {dec.owner} — outcome review pending
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
