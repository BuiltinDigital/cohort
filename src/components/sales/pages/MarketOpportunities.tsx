'use client';

import { useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { myOpportunities, type Opportunity } from '@/lib/data/sales/myOpportunities';
import { cn, formatCurrency } from '@/lib/utils';

const priorityPill: Record<Opportunity['priority'], string> = {
  hot:  'bg-risk text-paper',
  warm: 'bg-sky-soft text-navy',
  cold: 'bg-line text-muted',
};

function fitColor(fit: number): string {
  if (fit >= 85) return 'text-good';
  if (fit >= 70) return 'text-warn';
  return 'text-risk';
}

export function MarketOpportunities({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const hotOpps = useMemo(() => myOpportunities.filter(o => o.priority === 'hot'), []);
  const totalValue = useMemo(
    () => myOpportunities.reduce((s, o) => s + o.estimatedValue, 0),
    []
  );

  const columns = [
    {
      key: 'advertiser',
      header: 'Advertiser',
      render: (o: Opportunity) => <BrandCell>{o.advertiser}</BrandCell>,
      className: 'min-w-[160px]',
    },
    {
      key: 'category',
      header: 'Category',
      render: (o: Opportunity) => (
        <span className="text-[12.5px] text-ink">{o.category}</span>
      ),
    },
    {
      key: 'agency',
      header: 'Agency',
      render: (o: Opportunity) => (
        <span className="text-[12.5px] text-muted">{o.agency}</span>
      ),
    },
    {
      key: 'ukSpendQ2',
      header: 'UK Spend Q2',
      render: (o: Opportunity) => (
        <MonoCell>{formatCurrency(o.ukSpendQ2)}</MonoCell>
      ),
    },
    {
      key: 'audienceFit',
      header: 'Audience Fit',
      render: (o: Opportunity) => (
        <MonoCell className={fitColor(o.audienceFit)}>{o.audienceFit}%</MonoCell>
      ),
    },
    {
      key: 'priority',
      header: 'Priority',
      render: (o: Opportunity) => (
        <span className={cn(
          'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-[3px] rounded',
          priorityPill[o.priority]
        )}>
          {o.priority}
        </span>
      ),
    },
    {
      key: 'estimatedValue',
      header: 'Est. Value',
      render: (o: Opportunity) => (
        <MonoCell>{formatCurrency(o.estimatedValue)}</MonoCell>
      ),
    },
    {
      key: 'action',
      header: 'Action',
      render: (o: Opportunity) => (
        <span className="text-[11.5px] text-sky font-semibold">{o.recommendedAction}</span>
      ),
      className: 'min-w-[200px]',
    },
  ];

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Market Opportunities
        </h1>
        <p className="text-[13px] text-muted">
          {myOpportunities.length} opportunities &middot; &pound;{(totalValue / 1_000_000).toFixed(1)}m total estimated value
        </p>
      </div>

      {/* Hot Opportunities */}
      <SectionHeading title="Hot Opportunities" count={hotOpps.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-6">
        {hotOpps.map(o => (
          <div
            key={o.id}
            className="bg-paper border border-line rounded-xl p-4 border-l-[3px] border-l-risk hover:shadow-md transition-shadow"
          >
            <div className="font-display font-[800] text-[16px] text-navy leading-snug mb-1">
              {o.advertiser}
            </div>
            <div className="text-[11px] text-muted mb-3">{o.agency} &middot; {o.category}</div>
            <div className="font-display font-[800] text-[30px] text-navy leading-none mb-1">
              {formatCurrency(o.estimatedValue, true)}
            </div>
            <div className="text-[11px] text-muted mb-3">est. value &middot; {o.audienceFit}% fit</div>
            <div className="text-[11.5px] text-sky font-semibold">
              {o.recommendedAction}
            </div>
          </div>
        ))}
      </div>

      {/* Full Table */}
      <SectionHeading title="All Opportunities" count={myOpportunities.length} />
      <DataTable columns={columns} data={myOpportunities} />
    </div>
  );
}
