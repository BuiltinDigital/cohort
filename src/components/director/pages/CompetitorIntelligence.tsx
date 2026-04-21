'use client';

import { useState, useMemo } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TabGroup } from '@/components/ui/TabGroup';
import { TimelineCard } from '@/components/ui/TimelineCard';
import { RAGBadge } from '@/components/ui/RAGBadge';
import {
  competitorNews,
  competitorIntelSummary,
  type CompetitorNewsItem,
} from '@/lib/data/director/competitorIntel';
import { cn } from '@/lib/utils';

/* ─── Helpers ─────────────────────────────────────────────────────── */

const PUBLISHERS = ['All', ...Array.from(new Set(competitorNews.map((n) => n.publisher)))];
const RELEVANCE_TABS = ['All', 'High', 'Medium', 'Low'];

function variantForImpact(impact: CompetitorNewsItem['impact']): 'danger' | 'success' | 'neutral' {
  if (impact === 'negative') return 'danger';
  if (impact === 'positive') return 'success';
  return 'neutral';
}

function ragForRelevance(relevance: CompetitorNewsItem['relevance']): 'red' | 'amber' | 'green' {
  if (relevance === 'high') return 'red';
  if (relevance === 'medium') return 'amber';
  return 'green';
}

const categoryLabels: Record<CompetitorNewsItem['category'], string> = {
  product: 'Product',
  partnership: 'Partnership',
  financial: 'Financial',
  traffic: 'Traffic',
  talent: 'Talent',
  regulatory: 'Regulatory',
};

const categoryColors: Record<CompetitorNewsItem['category'], string> = {
  product: 'bg-sky-soft text-sky',
  partnership: 'bg-good/15 text-good',
  financial: 'bg-warn/15 text-warn',
  traffic: 'bg-risk/15 text-risk',
  talent: 'bg-purple-100 text-purple-700',
  regulatory: 'bg-muted/15 text-muted',
};

/* Group items by date */
function groupByDate(items: CompetitorNewsItem[]): Record<string, CompetitorNewsItem[]> {
  const groups: Record<string, CompetitorNewsItem[]> = {};
  for (const item of items) {
    if (!groups[item.date]) groups[item.date] = [];
    groups[item.date].push(item);
  }
  return groups;
}

/* ─── Component ───────────────────────────────────────────────────── */

export function CompetitorIntelligence({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [publisherFilter, setPublisherFilter] = useState('All');
  const [relevanceFilter, setRelevanceFilter] = useState('All');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const sum = competitorIntelSummary;

  const filtered = useMemo(() => {
    return competitorNews.filter((n) => {
      if (publisherFilter !== 'All' && n.publisher !== publisherFilter) return false;
      if (relevanceFilter !== 'All' && n.relevance !== relevanceFilter.toLowerCase()) return false;
      return true;
    });
  }, [publisherFilter, relevanceFilter]);

  const grouped = useMemo(() => groupByDate(filtered), [filtered]);
  const sortedDates = Object.keys(grouped).sort((a, b) => b.localeCompare(a));

  return (
    <div className="animate-fade-up">
      {/* ── Summary Metrics ──────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Intel Items"
          value={String(sum.totalItems)}
          sub={`${sum.highRelevance} high relevance`}
          subColor="risk"
        />
        <MetricCard
          label="Negative Impact"
          value={String(sum.negativeImpact)}
          sub="Items flagged as threats"
          subColor="risk"
        />
        <MetricCard
          label="Positive Impact"
          value={String(sum.positiveImpact)}
          sub="Opportunities identified"
          subColor="good"
        />
        <MetricCard
          label="Neutral"
          value={String(sum.neutralImpact)}
          sub="Monitor items"
        />
      </div>

      {/* ── Key Threats & Opportunities ──────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <div className="bg-risk/5 border border-risk/15 rounded-xl p-5">
          <div className="font-display font-[800] text-[16px] text-risk mb-3">Top Threats</div>
          <div className="space-y-2">
            {sum.topThreats.map((t, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px] text-ink">
                <span className="w-[6px] h-[6px] rounded-full bg-risk flex-shrink-0 mt-1.5" />
                {t}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-good/5 border border-good/15 rounded-xl p-5">
          <div className="font-display font-[800] text-[16px] text-good mb-3">Top Opportunities</div>
          <div className="space-y-2">
            {sum.topOpportunities.map((o, i) => (
              <div key={i} className="flex items-start gap-2 text-[12px] text-ink">
                <span className="w-[6px] h-[6px] rounded-full bg-good flex-shrink-0 mt-1.5" />
                {o}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Filters ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center gap-3 mb-5">
        <div className="text-[11px] text-muted font-semibold uppercase tracking-wider">Publisher:</div>
        <div className="flex gap-[5px] flex-wrap">
          {PUBLISHERS.map((p) => (
            <button
              key={p}
              onClick={() => setPublisherFilter(p)}
              className={cn(
                'px-3 py-1.5 rounded-[6px] text-[11px] font-semibold transition-all',
                publisherFilter === p
                  ? 'bg-navy text-paper'
                  : 'bg-off text-muted hover:bg-line hover:text-navy',
              )}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="text-[11px] text-muted font-semibold uppercase tracking-wider ml-2">
          Relevance:
        </div>
        <TabGroup
          tabs={RELEVANCE_TABS}
          activeTab={relevanceFilter}
          onTabChange={setRelevanceFilter}
        />
      </div>

      {/* ── Timeline Feed ────────────────────────────────────────── */}
      <SectionHeading title="Intelligence Feed" count={filtered.length} />

      {sortedDates.length === 0 && (
        <div className="bg-paper border border-line rounded-xl p-8 text-center text-[13px] text-muted">
          No items match the current filters.
        </div>
      )}

      {sortedDates.map((date) => (
        <div key={date} className="mb-5">
          <div className="font-mono text-[11px] text-muted font-semibold mb-2 pl-1">
            {new Date(date).toLocaleDateString('en-GB', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
              year: 'numeric',
            })}
          </div>
          <div className="space-y-3">
            {grouped[date].map((item) => {
              const isExpanded = expandedId === item.id;
              return (
                <div key={item.id}>
                  <TimelineCard
                    date={item.date}
                    tag={item.publisher}
                    tagColor={categoryColors[item.category]}
                    title={item.title}
                    description={item.summary}
                    variant={variantForImpact(item.impact)}
                    action={isExpanded ? 'Collapse' : 'View action'}
                    onAction={() => setExpandedId(isExpanded ? null : item.id)}
                  />
                  {/* Extra detail below card */}
                  {isExpanded && (
                    <div className="ml-4 mt-2 bg-off border border-line rounded-lg p-4 animate-fade-up">
                      <div className="flex items-center gap-3 mb-2">
                        <RAGBadge status={ragForRelevance(item.relevance)} label={`${item.relevance} relevance`} />
                        <span
                          className={cn(
                            'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded',
                            categoryColors[item.category],
                          )}
                        >
                          {categoryLabels[item.category]}
                        </span>
                      </div>
                      {item.recommendedAction && (
                        <div className="mt-2">
                          <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-1">
                            Recommended Action
                          </div>
                          <div className="text-[12px] text-navy font-medium leading-relaxed bg-paper border border-line rounded-lg p-3">
                            {item.recommendedAction}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}
