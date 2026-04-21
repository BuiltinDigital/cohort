'use client';

import { useState } from 'react';
import { MetricCard } from '@/components/ui/MetricCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { TabGroup } from '@/components/ui/TabGroup';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import {
  pmpDeals,
  pmpStats,
  openMarketStats,
  openMarketAdvertisers,
  notSpendingStats,
  prospectList,
} from '@/lib/data/marketData';
import { formatCurrency } from '@/lib/utils';

const TABS = ['Private Marketplace', 'Open Marketplace', 'Not Spending With Us'] as const;

export function MarketAnalysis({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const [activeTab, setActiveTab] = useState<string>(TABS[0]);

  return (
    <div className="animate-fade-up">
      <TabGroup tabs={[...TABS]} activeTab={activeTab} onTabChange={setActiveTab} className="mb-6" />

      {/* ─── Private Marketplace ───────────────────────────────────────────── */}
      {activeTab === 'Private Marketplace' && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <MetricCard
              label="PMP Deals Active"
              value={String(pmpStats.activeDeals)}
              sub="Across all brands"
            />
            <MetricCard
              label="PMP Revenue Q2"
              value={`£${(pmpStats.revenueQ2 / 1_000_000).toFixed(2)}`}
              unit="m"
              sub={<>+12% vs Q1</>}
              subColor="good"
            />
            <MetricCard
              label="Avg CPM"
              value={`£${pmpStats.avgCPM.toFixed(2)}`}
              sub="Premium vs £4.80 open"
              subColor="good"
            />
            <MetricCard
              label="Fill Rate"
              value={`${pmpStats.fillRate}%`}
              sub="Target: 85%"
              subColor="warn"
            />
          </div>

          <SectionHeading title="Top PMP Deals" count={pmpDeals.length} />

          <DataTable
            data={pmpDeals}
            onRowClick={(d) => onNavigate('deal', d.id)}
            columns={[
              {
                key: 'dealId',
                header: 'Deal Name',
                render: (d) => <BrandCell>{d.dealId}</BrandCell>,
              },
              {
                key: 'agency',
                header: 'Agency',
                render: (d) => <span className="text-muted font-medium">{d.agency}</span>,
              },
              {
                key: 'advertiser',
                header: 'Advertiser',
                render: (d) => <span className="text-ink font-medium">{d.advertiser}</span>,
              },
              {
                key: 'cpm',
                header: 'CPM',
                render: (d) => <MonoCell className="font-semibold">£{d.avgCPM.toFixed(2)}</MonoCell>,
              },
              {
                key: 'spend',
                header: 'Spend 30d',
                render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.spend, true)}</MonoCell>,
              },
              {
                key: 'fillRate',
                header: 'Fill Rate',
                render: (d) => (
                  <MonoCell className={d.fillRate >= 80 ? 'text-good font-semibold' : 'font-semibold'}>
                    {d.fillRate}%
                  </MonoCell>
                ),
              },
              {
                key: 'status',
                header: 'Status',
                render: (d) => (
                  <StatusDot
                    variant={d.status === 'active' ? 'ok' : d.status === 'paused' ? 'warn' : 'cold'}
                    label={d.status.charAt(0).toUpperCase() + d.status.slice(1)}
                  />
                ),
              },
            ]}
          />
        </div>
      )}

      {/* ─── Open Marketplace ──────────────────────────────────────────────── */}
      {activeTab === 'Open Marketplace' && (
        <div className="animate-fade-up">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <MetricCard
              label="Open Market Revenue Q2"
              value={`£${(openMarketStats.revenueQ2 / 1_000).toFixed(0)}`}
              unit="k"
              sub={<>Programmatic open auction</>}
            />
            <MetricCard
              label="Avg CPM"
              value={`£${openMarketStats.avgCPM.toFixed(2)}`}
              sub="Floor: £3.20"
            />
            <MetricCard
              label="Top SSP"
              value={openMarketStats.topSSP}
              sub={<>{openMarketStats.sspShare}% of fill</>}
            />
            <MetricCard
              label="Bid Density"
              value={openMarketStats.bidDensity.toFixed(1)}
              unit="x"
              sub="Avg bids per impression"
            />
          </div>

          <SectionHeading title="Top Advertisers" count={openMarketAdvertisers.length} />

          <DataTable
            data={openMarketAdvertisers}
            columns={[
              {
                key: 'name',
                header: 'Advertiser',
                render: (d) => <BrandCell>{d.name}</BrandCell>,
              },
              {
                key: 'category',
                header: 'Category',
                render: (d) => {
                  const catMap: Record<string, string> = {
                    Amazon: 'E-commerce',
                    'Booking.com': 'Travel',
                    Expedia: 'Travel',
                    HelloFresh: 'Food / DTC',
                    eBay: 'E-commerce',
                  };
                  return <span className="text-muted font-medium">{catMap[d.name] ?? '—'}</span>;
                },
              },
              {
                key: 'spend',
                header: 'Spend 30d',
                render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.spend, true)}</MonoCell>,
              },
              {
                key: 'cpm',
                header: 'CPM',
                render: (d) => <MonoCell className="font-semibold">£{d.avgCPM.toFixed(2)}</MonoCell>,
              },
              {
                key: 'trend',
                header: 'Trend',
                render: (d) => (
                  <span
                    className={
                      d.trend === 'up'
                        ? 'text-good font-semibold text-[12px]'
                        : d.trend === 'down'
                          ? 'text-risk font-semibold text-[12px]'
                          : 'text-muted font-semibold text-[12px]'
                    }
                  >
                    {d.trend === 'up' ? '↑ Rising' : d.trend === 'down' ? '↓ Falling' : '→ Flat'}
                  </span>
                ),
              },
            ]}
          />
        </div>
      )}

      {/* ─── Not Spending With Us ──────────────────────────────────────────── */}
      {activeTab === 'Not Spending With Us' && (
        <div className="animate-fade-up">
          {/* Info Banner */}
          <div className="bg-[#e8f4fc] border border-[#4AB4E8]/20 rounded-xl p-5 mb-6">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-[#4AB4E8] text-paper flex items-center justify-center flex-shrink-0 mt-[2px]">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" />
                  <path d="M8 5v4M8 11v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                </svg>
              </div>
              <div>
                <div className="font-display font-[800] text-[16px] text-navy mb-1">Opportunity View</div>
                <p className="text-[13px] text-ink leading-[1.6]">
                  These brands are spending in our audience categories but have no active campaigns with Immediate.
                  Data sourced from Nielsen Ad Intel, AAR and agency intelligence.
                </p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
            <MetricCard
              label="Opportunity Brands"
              value={String(notSpendingStats.opportunityBrands)}
              sub="Not spending with us"
            />
            <MetricCard
              label="Total Opportunity"
              value={`£${(notSpendingStats.totalOpportunity / 1_000_000).toFixed(0)}`}
              unit="m"
              sub="UK digital + print"
              subColor="good"
            />
            <MetricCard
              label="High Affinity Matches"
              value={String(notSpendingStats.highAffinityMatches)}
              sub="90%+ audience fit"
              subColor="good"
            />
            <MetricCard
              label="Agency Overlap"
              value={`${notSpendingStats.agencyOverlap}%`}
              sub="Already in our agency network"
            />
          </div>

          <SectionHeading title="Prospect Hit List" count={prospectList.length} />

          <DataTable
            data={prospectList}
            onRowClick={(d) => onNavigate('prospect', d.id)}
            columns={[
              {
                key: 'name',
                header: 'Advertiser',
                render: (d) => <BrandCell>{d.name}</BrandCell>,
              },
              {
                key: 'category',
                header: 'Category',
                render: (d) => <span className="text-muted font-medium">{d.category}</span>,
              },
              {
                key: 'agency',
                header: 'Buying Agency',
                render: (d) => <span className="text-ink font-medium">{d.agency}</span>,
              },
              {
                key: 'ukSpend',
                header: 'UK Spend Q2',
                render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.ukSpend, true)}</MonoCell>,
              },
              {
                key: 'audienceFit',
                header: 'Audience Fit',
                render: (d) => (
                  <StatusDot
                    variant={d.audienceFit >= 85 ? 'ok' : d.audienceFit >= 75 ? 'warn' : 'risk'}
                    label={`${d.audienceFit}%`}
                  />
                ),
              },
              {
                key: 'priority',
                header: 'Priority',
                render: (d) => (
                  <span
                    className={
                      d.priority === 'hot'
                        ? 'inline-block text-[11px] font-bold px-[10px] py-[3px] rounded-full bg-risk/10 text-risk'
                        : 'inline-block text-[11px] font-bold px-[10px] py-[3px] rounded-full bg-warn/10 text-warn'
                    }
                  >
                    {d.priority === 'hot' ? 'Hot' : 'Warm'}
                  </span>
                ),
              },
            ]}
          />
        </div>
      )}
    </div>
  );
}
