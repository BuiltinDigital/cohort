'use client';

import { useState } from 'react';
import { campaigns, Campaign } from '@/lib/data/campaigns';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TabGroup } from '@/components/ui/TabGroup';
import { cn, formatCurrency } from '@/lib/utils';
import { Filter, Search } from 'lucide-react';

const STATUS_TABS = ['All', 'Live', 'At Risk', 'Scheduled', 'Completed', 'Paused'];

function statusToTab(status: string): string {
  if (status === 'at-risk') return 'At Risk';
  return status.charAt(0).toUpperCase() + status.slice(1);
}

function statusToVariant(status: string): 'ok' | 'warn' | 'risk' | 'cold' {
  switch (status) {
    case 'live': return 'ok';
    case 'at-risk': return 'risk';
    case 'scheduled': return 'cold';
    case 'completed': return 'ok';
    case 'paused': return 'warn';
    default: return 'cold';
  }
}

export function CampaignsPage({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [activeTab, setActiveTab] = useState('All');
  const [search, setSearch] = useState('');

  const activeCampaigns = campaigns.filter(c => c.status === 'live' || c.status === 'at-risk');
  const atRiskCampaigns = campaigns.filter(c => c.status === 'at-risk');
  const totalValue = campaigns.reduce((sum, c) => sum + c.contractValue, 0);
  const avgDelivery = campaigns.filter(c => c.status !== 'scheduled').reduce((sum, c) => sum + c.deliveryPercent, 0) /
    campaigns.filter(c => c.status !== 'scheduled').length;

  const filtered = campaigns.filter(c => {
    const matchesTab = activeTab === 'All' || statusToTab(c.status) === activeTab;
    const matchesSearch = search === '' || c.name.toLowerCase().includes(search.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="animate-fade-up">
      {/* ─── Top Metrics ──────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Active"
          value={String(activeCampaigns.length)}
          sub={<><strong className="text-ink">{campaigns.filter(c => c.status === 'live').length}</strong> live &middot; <strong className="text-ink">{atRiskCampaigns.length}</strong> at risk</>}
        />
        <MetricCard
          label="Total Value"
          value={formatCurrency(totalValue, true)}
          sub="All campaigns combined"
        />
        <MetricCard
          label="Avg Delivery %"
          value={`${Math.round(avgDelivery)}%`}
          sub="Excl. scheduled"
          subColor={avgDelivery >= 75 ? 'good' : avgDelivery >= 60 ? 'warn' : 'risk'}
        />
        <MetricCard
          label="At Risk"
          value={String(atRiskCampaigns.length)}
          sub="Require attention"
          subColor="risk"
        />
      </div>

      {/* ─── Filter / Search Bar ──────────────────────────────────────────── */}
      <div className="flex flex-col lg:flex-row lg:items-center gap-3 mb-5">
        <div className="relative flex-1 max-w-[360px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted" />
          <input
            type="text"
            placeholder="Search campaigns..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-[9px] bg-paper border border-line rounded-[10px] text-[13px] text-ink placeholder:text-muted/60 focus:outline-none focus:border-sky transition-colors"
          />
        </div>
        <TabGroup tabs={STATUS_TABS} activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* ─── Campaign Table ───────────────────────────────────────────────── */}
      <SectionHeading title="All Campaigns" count={filtered.length} />

      <DataTable<Campaign>
        className="mb-6"
        data={filtered}
        onRowClick={(c) => onNavigate('campaign-detail', c.id)}
        columns={[
          {
            key: 'name',
            header: 'Campaign',
            render: (c) => (
              <BrandCell>{c.name}</BrandCell>
            ),
          },
          {
            key: 'advertiser',
            header: 'Advertiser',
            render: (c) => <span className="text-ink font-medium">{c.advertiser}</span>,
          },
          {
            key: 'agency',
            header: 'Agency',
            render: (c) => <span className="text-muted">{c.agency}</span>,
          },
          {
            key: 'owner',
            header: 'Owner',
            render: (c) => <span className="text-ink font-medium">{c.owner}</span>,
          },
          {
            key: 'brand',
            header: 'Brand',
            render: (c) => <span className="text-muted">{c.brand}</span>,
          },
          {
            key: 'channels',
            header: 'Channels',
            render: (c) => <span className="text-[11px] text-muted">{c.channels.join(', ')}</span>,
          },
          {
            key: 'contractValue',
            header: 'Contract',
            render: (c) => <MonoCell className="font-semibold">{formatCurrency(c.contractValue)}</MonoCell>,
          },
          {
            key: 'deliveredValue',
            header: 'Delivered',
            render: (c) => <MonoCell className="font-semibold">{formatCurrency(c.deliveredValue)}</MonoCell>,
          },
          {
            key: 'deliveryPercent',
            header: 'Delivery %',
            render: (c) => (
              <MonoCell
                className={cn(
                  'font-semibold',
                  c.deliveryPercent >= 85 ? 'text-good' :
                  c.deliveryPercent >= 65 ? 'text-warn' :
                  'text-risk'
                )}
              >
                {c.deliveryPercent}%
              </MonoCell>
            ),
          },
          {
            key: 'status',
            header: 'Status',
            render: (c) => (
              <StatusDot
                variant={statusToVariant(c.status)}
                label={statusToTab(c.status)}
              />
            ),
          },
        ]}
      />
    </div>
  );
}
