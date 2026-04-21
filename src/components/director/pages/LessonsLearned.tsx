'use client';

import { useState, useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TabGroup } from '@/components/ui/TabGroup';
import { lessons, type Lesson } from '@/lib/data/director/lessons';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Lessons Learned  --  Director Dashboard                            */
/* ------------------------------------------------------------------ */

const outcomeTabs = ['All', 'Success', 'Failure', 'Mixed'];

const outcomeStyles: Record<Lesson['outcome'], { bg: string; text: string; label: string }> = {
  success: { bg: 'bg-good/15', text: 'text-good', label: 'Success' },
  failure: { bg: 'bg-risk/15', text: 'text-risk', label: 'Failure' },
  mixed: { bg: 'bg-warn/15', text: 'text-warn', label: 'Mixed' },
};

export function LessonsLearned({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    let result = lessons;

    // Filter by outcome
    if (activeTab !== 'All') {
      result = result.filter(
        (l) => l.outcome === activeTab.toLowerCase(),
      );
    }

    // Filter by search text
    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.summary.toLowerCase().includes(q) ||
          l.campaign.toLowerCase().includes(q) ||
          l.client.toLowerCase().includes(q) ||
          l.keyLearning.toLowerCase().includes(q) ||
          l.tags.some((t) => t.toLowerCase().includes(q)),
      );
    }

    // Sort most recent first
    return [...result].sort(
      (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
    );
  }, [activeTab, search]);

  return (
    <div className="animate-fade-up">
      {/* ── FILTERS ──────────────────────────────────────────── */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 mb-6">
        <TabGroup
          tabs={outcomeTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
        />
        <div className="relative w-full sm:w-auto sm:ml-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search lessons..."
            className={cn(
              'w-full sm:w-[280px] bg-paper border border-line rounded-[10px] px-4 py-2',
              'text-[13px] text-navy placeholder:text-muted focus:outline-none focus:border-sky',
              'transition-colors',
            )}
          />
        </div>
      </div>

      {/* ── LESSONS FEED ─────────────────────────────────────── */}
      <SectionHeading title="Campaign Post-Mortems" count={filtered.length} />

      <div className="space-y-4">
        {filtered.map((lesson) => {
          const oc = outcomeStyles[lesson.outcome];

          return (
            <div
              key={lesson.id}
              className={cn(
                'bg-paper border border-line rounded-xl p-5 transition-all',
                'hover:shadow-[0_4px_12px_rgba(10,31,68,0.06)]',
              )}
            >
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-mono text-[11px] text-muted">{lesson.date}</span>
                  <span
                    className={cn(
                      'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-0.5 rounded',
                      oc.bg,
                      oc.text,
                    )}
                  >
                    {oc.label}
                  </span>
                  <span className="text-[11px] text-muted">
                    {lesson.campaign} &middot;{' '}
                    <span className="font-semibold text-ink">{lesson.client}</span>
                  </span>
                </div>
                <span className="text-[10px] text-muted shrink-0">by {lesson.submittedBy}</span>
              </div>

              {/* Title */}
              <div className="font-display font-[800] text-[16px] text-navy leading-tight mb-2">
                {lesson.title}
              </div>

              {/* Summary */}
              <p className="text-[12px] text-muted leading-relaxed mb-3">{lesson.summary}</p>

              {/* Key learning — highlighted */}
              <div className="bg-sky-soft/50 border border-sky/15 rounded-lg px-4 py-3 mb-3">
                <div className="text-[10px] tracking-[0.12em] uppercase text-sky font-bold mb-1">
                  Key Learning
                </div>
                <p className="text-[12px] text-navy font-medium leading-relaxed">
                  {lesson.keyLearning}
                </p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {lesson.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-semibold text-muted bg-off px-2 py-0.5 rounded-full border border-line-soft"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          );
        })}

        {filtered.length === 0 && (
          <div className="text-center py-12 text-[13px] text-muted">
            No lessons found matching your filters.
          </div>
        )}
      </div>
    </div>
  );
}
