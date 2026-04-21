'use client';

import { useMemo } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { myPipeline, type MyDeal } from '@/lib/data/sales/myPipeline';
import { formatCurrency } from '@/lib/utils';

const stageOrder = ['Prospecting', 'Proposal', 'Negotiation', 'Verbal Yes', 'Closed Won', 'Closed Lost'] as const;

const stageColors: Record<string, string> = {
  Prospecting: 'bg-muted-soft text-muted',
  Proposal: 'bg-sky-soft text-sky',
  Negotiation: 'bg-warn/10 text-warn',
  'Verbal Yes': 'bg-good/10 text-good',
  'Closed Won': 'bg-good text-paper',
  'Closed Lost': 'bg-risk/10 text-risk',
};

export function MyPipeline({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const openDeals = useMemo(
    () => myPipeline.filter(d => d.stage !== 'Closed Won' && d.stage !== 'Closed Lost'),
    []
  );

  const totalRaw = openDeals.reduce((s, d) => s + d.value, 0);
  const totalWeighted = openDeals.reduce((s, d) => s + d.value * (d.probability / 100), 0);

  const stages = useMemo(() => {
    return stageOrder
      .map(stage => {
        const deals = myPipeline.filter(d => d.stage === stage);
        const raw = deals.reduce((s, d) => s + d.value, 0);
        const weighted = deals.reduce((s, d) => s + d.value * (d.probability / 100), 0);
        return { stage, count: deals.length, raw, weighted };
      })
      .filter(s => s.count > 0);
  }, []);

  const columns = [
    {
      key: 'name',
      header: 'Deal',
      render: (d: MyDeal) => <BrandCell>{d.name}</BrandCell>,
      className: 'min-w-[200px]',
    },
    {
      key: 'advertiser',
      header: 'Advertiser',
      render: (d: MyDeal) => <span className="text-[12.5px] text-ink">{d.advertiser}</span>,
    },
    {
      key: 'agency',
      header: 'Agency',
      render: (d: MyDeal) => <span className="text-[12.5px] text-muted">{d.agency}</span>,
    },
    {
      key: 'value',
      header: 'Value',
      render: (d: MyDeal) => <MonoCell>{formatCurrency(d.value)}</MonoCell>,
    },
    {
      key: 'stage',
      header: 'Stage',
      render: (d: MyDeal) => (
        <span className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-[3px] rounded ${stageColors[d.stage] || ''}`}>
          {d.stage}
        </span>
      ),
    },
    {
      key: 'probability',
      header: 'Prob %',
      render: (d: MyDeal) => <MonoCell>{d.probability}%</MonoCell>,
    },
    {
      key: 'closeDate',
      header: 'Close Date',
      render: (d: MyDeal) => <span className="font-mono text-[12px] text-muted">{d.closeDate}</span>,
    },
    {
      key: 'nextStep',
      header: 'Next Step',
      render: (d: MyDeal) => (
        <span className="text-[11.5px] text-ink leading-snug line-clamp-2">{d.nextStep}</span>
      ),
      className: 'min-w-[200px]',
    },
  ];

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          My Pipeline
        </h1>
        <p className="text-[13px] text-muted">
          {openDeals.length} open deals &middot; {formatCurrency(totalRaw, true)} total
        </p>
      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <MetricCard label="Open Deals" value={String(openDeals.length)} sub={`${myPipeline.length} total incl. closed`} />
        <MetricCard label="Total Pipeline" value={formatCurrency(totalRaw, true)} sub="Raw value" />
        <MetricCard label="Weighted Value" value={formatCurrency(totalWeighted, true)} sub="Probability-adjusted" subColor="good" />
      </div>

      {/* Funnel Stage Cards */}
      <SectionHeading title="Pipeline by Stage" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stages.filter(s => s.stage !== 'Closed Won' && s.stage !== 'Closed Lost').map(s => (
          <div key={s.stage} className="bg-paper border border-line rounded-[10px] p-4">
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mb-2">
              {s.stage}
            </div>
            <div className="font-display font-[800] text-[28px] text-navy leading-none mb-1">
              {s.count}
            </div>
            <div className="font-mono text-[12px] text-muted">
              {formatCurrency(s.raw, true)} raw &middot; {formatCurrency(s.weighted, true)} wtd
            </div>
          </div>
        ))}
      </div>

      {/* Deal Table */}
      <SectionHeading title="All Deals" count={myPipeline.length} />

      <DataTable
        columns={columns}
        data={myPipeline}
        onRowClick={() => {}}
      />
    </div>
  );
}
