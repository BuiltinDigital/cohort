'use client';

import { useState, useMemo } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { TabGroup } from '@/components/ui/TabGroup';
import { myCampaigns } from '@/lib/data/sales/myCampaigns';
import { cn, formatCurrency } from '@/lib/utils';

const tabs = ['All', 'Live', 'At Risk', 'Scheduled', 'Completed'];

export function MyCampaigns({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [activeTab, setActiveTab] = useState('All');

  const filtered = useMemo(() => {
    if (activeTab === 'All') return myCampaigns;
    if (activeTab === 'Live') return myCampaigns.filter(c => c.status === 'live');
    if (activeTab === 'At Risk') return myCampaigns.filter(c => c.status === 'at-risk');
    if (activeTab === 'Scheduled') return myCampaigns.filter(c => c.status === 'scheduled');
    if (activeTab === 'Completed') return myCampaigns.filter(c => c.status === 'completed');
    return myCampaigns;
  }, [activeTab]);

  const active = myCampaigns.filter(c => c.status === 'live' || c.status === 'at-risk');
  const totalValue = myCampaigns.reduce((s, c) => s + c.contractValue, 0);
  const avgDelivery = Math.round(
    myCampaigns.filter(c => c.status !== 'scheduled').reduce((s, c) => s + c.deliveryPercent, 0) /
    myCampaigns.filter(c => c.status !== 'scheduled').length
  );
  const atRisk = myCampaigns.filter(c => c.status === 'at-risk').length;

  const columns = [
    {
      key: 'name',
      header: 'Campaign',
      render: (c: (typeof myCampaigns)[number]) => <BrandCell>{c.name}</BrandCell>,
      className: 'min-w-[180px]',
    },
    {
      key: 'advertiser',
      header: 'Advertiser',
      render: (c: (typeof myCampaigns)[number]) => (
        <span className="text-[12.5px] text-ink">{c.advertiser}</span>
      ),
    },
    {
      key: 'agency',
      header: 'Agency',
      render: (c: (typeof myCampaigns)[number]) => (
        <span className="text-[12.5px] text-muted">{c.agency}</span>
      ),
    },
    {
      key: 'brand',
      header: 'Brand',
      render: (c: (typeof myCampaigns)[number]) => (
        <span className="text-[12.5px] text-ink">{c.brand}</span>
      ),
    },
    {
      key: 'value',
      header: 'Value',
      render: (c: (typeof myCampaigns)[number]) => (
        <MonoCell>{formatCurrency(c.contractValue)}</MonoCell>
      ),
    },
    {
      key: 'delivery',
      header: 'Delivery %',
      render: (c: (typeof myCampaigns)[number]) => (
        <MonoCell className={cn(
          c.deliveryPercent >= 85 ? 'text-good' :
          c.deliveryPercent >= 60 ? 'text-warn' :
          c.deliveryPercent > 0 ? 'text-risk' :
          'text-muted'
        )}>
          {c.deliveryPercent}%
        </MonoCell>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c: (typeof myCampaigns)[number]) => (
        <StatusDot
          variant={
            c.status === 'completed' ? 'ok' :
            c.status === 'live' ? 'ok' :
            c.status === 'at-risk' ? 'risk' :
            c.status === 'scheduled' ? 'cold' :
            'warn'
          }
          label={
            c.status === 'completed' ? 'Completed' :
            c.status === 'live' ? 'Live' :
            c.status === 'at-risk' ? 'At Risk' :
            c.status === 'scheduled' ? 'Scheduled' :
            c.status.charAt(0).toUpperCase() + c.status.slice(1)
          }
        />
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          My Campaigns
        </h1>
        <p className="text-[13px] text-muted">
          {myCampaigns.length} campaigns &middot; {active.length} active
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard label="Active" value={String(active.length)} sub="Live + at-risk" />
        <MetricCard
          label="Total Value"
          value={formatCurrency(totalValue, true)}
          sub={`${myCampaigns.length} campaigns`}
        />
        <MetricCard
          label="Avg Delivery"
          value={`${avgDelivery}%`}
          sub="Excl. scheduled"
          subColor={avgDelivery >= 80 ? 'good' : 'warn'}
        />
        <MetricCard
          label="At Risk"
          value={String(atRisk)}
          sub={atRisk > 0 ? 'Action required' : 'None'}
          subColor={atRisk > 0 ? 'risk' : 'good'}
        />
      </div>

      {/* Tabs + Table */}
      <TabGroup tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} className="mb-5" />

      <DataTable columns={columns} data={filtered} />

      {filtered.length === 0 && (
        <div className="text-center py-10 text-[13px] text-muted">
          No campaigns match the selected filter.
        </div>
      )}
    </div>
  );
}
