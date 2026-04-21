'use client';

import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TimelineCard } from '@/components/ui/TimelineCard';
import { TabGroup } from '@/components/ui/TabGroup';
import { commercialNews, type CommercialNews } from '@/lib/data/director/news';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  News Feed  --  Director Dashboard                                  */
/* ------------------------------------------------------------------ */

type TimelineVariant = 'info' | 'success' | 'warning' | 'danger' | 'neutral';

const sourceTabs = ['All', 'Client', 'Agency', 'Competitor', 'Regulatory', 'Market'];

const sourceColors: Record<CommercialNews['source'], string> = {
  client: 'bg-good/15 text-good',
  agency: 'bg-sky-soft text-sky',
  competitor: 'bg-warn/15 text-warn',
  regulatory: 'bg-risk/15 text-risk',
  market: 'bg-[#a78bfa]/15 text-[#7c3aed]',
};

const relevanceStyles: Record<CommercialNews['relevance'], { bg: string; label: string }> = {
  high: { bg: 'bg-risk/15 text-risk', label: 'High Relevance' },
  medium: { bg: 'bg-warn/15 text-warn', label: 'Medium' },
  low: { bg: 'bg-muted/10 text-muted', label: 'Low' },
};

function newsVariant(n: CommercialNews): TimelineVariant {
  if (n.source === 'client') return 'success';
  if (n.source === 'competitor') return 'warning';
  if (n.source === 'regulatory') return 'danger';
  if (n.source === 'agency') return 'info';
  return 'neutral';
}

export function NewsFeed({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(() => {
    let result = commercialNews;

    if (activeTab !== 'All') {
      result = result.filter(
        (n) => n.source === activeTab.toLowerCase(),
      );
    }

    // Sort most recent first
    return [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [activeTab]);

  return (
    <div className="animate-fade-up">
      {/* ── SOURCE FILTER ────────────────────────────────────── */}
      <TabGroup
        tabs={sourceTabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {/* ── NEWS FEED ────────────────────────────────────────── */}
      <SectionHeading title="Commercial News" count={filtered.length} />

      <div className="space-y-4">
        {filtered.map((item) => {
          const srcColor = sourceColors[item.source];
          const relStyle = relevanceStyles[item.relevance];
          const isHighRelevance = item.relevance === 'high';

          return (
            <div
              key={item.id}
              className={cn(
                isHighRelevance && 'border-l-[3px] border-l-sky rounded-xl',
              )}
            >
              <TimelineCard
                date={item.date}
                tag={item.source.charAt(0).toUpperCase() + item.source.slice(1)}
                tagColor={srcColor}
                title={item.title}
                description={item.summary}
                variant={newsVariant(item)}
                className={cn(isHighRelevance && 'border-l-0 rounded-l-none')}
              />

              {/* Additional details: relevance + recommended action */}
              <div
                className={cn(
                  'bg-paper border border-line border-t-0 rounded-b-xl px-4 py-3',
                  isHighRelevance && 'border-l-0 ml-[3px]',
                )}
              >
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded',
                      relStyle.bg,
                    )}
                  >
                    {relStyle.label}
                  </span>
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-semibold text-muted bg-off px-2 py-0.5 rounded-full border border-line-soft"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {item.recommendedAction && (
                  <div className="mt-2">
                    <div className="text-[10px] tracking-[0.12em] uppercase text-sky font-bold mb-1">
                      Recommended Action
                    </div>
                    <p className="text-[12px] text-navy font-medium leading-relaxed bg-sky-soft/40 rounded-md px-3 py-2">
                      {item.recommendedAction}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
