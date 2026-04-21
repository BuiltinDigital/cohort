'use client';

import { useState } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { StatusDot } from '@/components/ui/StatusDot';
import { TabGroup } from '@/components/ui/TabGroup';
import { getClientBySlug, clientList, type Client } from '@/lib/data/clients';
import { cn, formatCurrency } from '@/lib/utils';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import {
  Mail,
  Phone,
  Calendar,
  ArrowLeft,
  FileText,
  MessageSquare,
  Plus,
} from 'lucide-react';

// ─── Colors ──────────────────────────────────────────────────────────────────
const COLORS = {
  sky: '#4AB4E8',
  navy: '#0E2A5C',
  good: '#1DB77A',
  warn: '#FF9D2E',
  risk: '#E53E5C',
};

const CHANNEL_COLORS: Record<string, string> = {
  Direct: COLORS.sky,
  Programmatic: COLORS.navy,
  Partnership: COLORS.good,
  Content: COLORS.warn,
};

const ACTIVITY_COLORS: Record<string, string> = {
  meeting: COLORS.sky,
  email: COLORS.navy,
  'campaign-launch': COLORS.good,
  renewal: COLORS.warn,
  'pitch-won': COLORS.good,
  'pitch-lost': COLORS.risk,
};

// ─── Client Detail ───────────────────────────────────────────────────────────

export function ClientDetail({
  slug,
  onNavigate,
}: {
  slug: string;
  onNavigate: (page: string, detail?: string) => void;
}) {
  const client = getClientBySlug(slug);
  const [activeTab, setActiveTab] = useState('Overview');

  // ── Not Found ────────────────────────────────────────────────────────────
  if (!client) {
    return (
      <div className="animate-fade-up">
        <div className="bg-paper border border-line rounded-xl p-8 text-center max-w-md mx-auto mt-12">
          <div className="font-display font-[800] text-[22px] text-navy mb-2">
            Client not found
          </div>
          <p className="text-[13px] text-muted mb-5">
            No client matches the slug &ldquo;{slug}&rdquo;.
          </p>
          <button
            onClick={() => onNavigate('clients')}
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-sky hover:text-navy transition-colors"
          >
            <ArrowLeft size={14} />
            Back to clients
          </button>
        </div>
      </div>
    );
  }

  // ── Tabs ──────────────────────────────────────────────────────────────────
  const tabs = ['Overview', 'Campaigns', 'People', 'Timeline'];

  return (
    <div className="animate-fade-up">
      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <button
        onClick={() => onNavigate('clients')}
        className="inline-flex items-center gap-[6px] text-[12px] font-semibold text-muted hover:text-navy transition-colors mb-4"
      >
        <ArrowLeft size={14} />
        Back to clients
      </button>

      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          {client.name}
        </h1>
        <p className="text-[13px] text-muted">
          {client.category} &middot; {client.agency} &middot; {client.owner}
        </p>
      </div>

      {/* Quick Stats Bar */}
      <div className="flex flex-wrap gap-3 mb-5">
        {[
          { label: 'Lifetime spend', value: formatCurrency(client.lifetimeSpend, true) },
          { label: 'Campaigns to date', value: String(client.campaignCount) },
          { label: 'Active commitments', value: String(client.activeCommitments) },
          { label: 'Last active', value: client.lastActive },
        ].map((stat) => (
          <div
            key={stat.label}
            className="bg-paper border border-line rounded-lg px-5 py-3 min-w-[150px]"
          >
            <div className="text-[9.5px] tracking-[0.12em] uppercase text-muted font-semibold mb-[3px]">
              {stat.label}
            </div>
            <div className="font-display font-[800] text-[20px] text-navy leading-none">
              {stat.value}
            </div>
          </div>
        ))}
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-wrap gap-2 mb-7">
        <button className="inline-flex items-center gap-[6px] px-4 py-[9px] rounded-lg bg-navy text-paper text-[12.5px] font-semibold hover:bg-navy/90 transition-colors">
          <Mail size={14} />
          Draft email
        </button>
        <button className="inline-flex items-center gap-[6px] px-4 py-[9px] rounded-lg bg-sky text-paper text-[12.5px] font-semibold hover:bg-sky/90 transition-colors">
          <MessageSquare size={14} />
          Log meeting
        </button>
        <button className="inline-flex items-center gap-[6px] px-4 py-[9px] rounded-lg border border-line bg-paper text-navy text-[12.5px] font-semibold hover:bg-off transition-colors">
          <Plus size={14} />
          New campaign
        </button>
      </div>

      {/* ── Tab Group ───────────────────────────────────────────────────────── */}
      <TabGroup
        tabs={tabs}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        className="mb-6"
      />

      {/* ── Tab Panels ──────────────────────────────────────────────────────── */}
      {activeTab === 'Overview' && <OverviewTab client={client} />}
      {activeTab === 'Campaigns' && <CampaignsTab client={client} />}
      {activeTab === 'People' && <PeopleTab client={client} />}
      {activeTab === 'Timeline' && <TimelineTab client={client} />}
    </div>
  );
}

// ─── Overview Tab ────────────────────────────────────────────────────────────

function OverviewTab({ client }: { client: Client }) {
  return (
    <div className="space-y-6">
      {/* Spend Timeline */}
      <div>
        <SectionHeading title="Spend Timeline" />
        <div className="bg-paper border border-line rounded-xl p-5">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={client.spendTimeline}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="quarter"
                tick={{ fontSize: 11, fill: '#8896a7' }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tickFormatter={(v) => `${(Number(v) / 1000).toFixed(0)}k`}
                tick={{ fontSize: 11, fill: '#8896a7' }}
                axisLine={false}
                tickLine={false}
                width={50}
              />
              <Tooltip
                formatter={(value) => [formatCurrency(Number(value)), 'Spend']}
                contentStyle={{
                  fontSize: 12,
                  borderRadius: 8,
                  border: '1px solid #e5e7eb',
                }}
              />
              <Line
                type="monotone"
                dataKey="spend"
                stroke={COLORS.sky}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.sky, strokeWidth: 0 }}
                activeDot={{ r: 6, fill: COLORS.sky }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Channel Mix */}
      <div>
        <SectionHeading title="Channel Mix" />
        <div className="bg-paper border border-line rounded-xl p-5 space-y-3">
          {client.channelMix.map((ch) => (
            <div key={ch.channel}>
              <div className="flex items-center justify-between mb-[5px]">
                <span className="text-[12.5px] font-semibold text-navy">
                  {ch.channel}
                </span>
                <span className="font-mono text-[12px] text-muted">
                  {ch.percent}%
                </span>
              </div>
              <div className="h-[8px] bg-line rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${ch.percent}%`,
                    backgroundColor: CHANNEL_COLORS[ch.channel] || COLORS.sky,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Delivery Track Record */}
      <div>
        <SectionHeading title="Delivery Track Record" />
        <div className="bg-paper border border-line rounded-xl p-5 flex items-center gap-6">
          <div>
            <div className="text-[9.5px] tracking-[0.12em] uppercase text-muted font-semibold mb-[3px]">
              Avg delivery
            </div>
            <div
              className={cn(
                'font-display font-[800] text-[32px] leading-none',
                client.avgDeliveryPercent >= 95
                  ? 'text-good'
                  : client.avgDeliveryPercent >= 85
                    ? 'text-warn'
                    : 'text-risk'
              )}
            >
              {client.avgDeliveryPercent}%
            </div>
          </div>
          <div>
            <div className="text-[9.5px] tracking-[0.12em] uppercase text-muted font-semibold mb-[3px]">
              Campaigns delivered
            </div>
            <div className="font-display font-[800] text-[32px] text-navy leading-none">
              {client.campaignCount}
            </div>
          </div>
        </div>
      </div>

      {/* Contract Status */}
      <div>
        <SectionHeading title="Contract Status" count={client.contracts.length} />
        <div className="space-y-2">
          {client.contracts.map((contract) => (
            <div
              key={contract.name}
              className="bg-paper border border-line rounded-xl p-5 flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6"
            >
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold text-[15px] text-navy truncate">
                  {contract.name}
                </div>
                <div className="text-[11.5px] text-muted mt-[2px]">
                  {contract.startDate} &ndash; {contract.endDate} &middot; Renewal{' '}
                  {contract.renewalDate}
                </div>
              </div>
              <div className="font-mono text-[13px] font-semibold text-navy">
                {formatCurrency(contract.value)}
              </div>
              <StatusDot
                variant={
                  contract.status === 'active'
                    ? 'ok'
                    : contract.status === 'expiring-soon'
                      ? 'warn'
                      : 'risk'
                }
                label={
                  contract.status === 'active'
                    ? 'Active'
                    : contract.status === 'expiring-soon'
                      ? 'Expiring soon'
                      : 'Expired'
                }
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Campaigns Tab ───────────────────────────────────────────────────────────

function CampaignsTab({ client }: { client: Client }) {
  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (c: Client['campaigns'][number]) => <BrandCell>{c.name}</BrandCell>,
      className: 'min-w-[200px]',
    },
    {
      key: 'dateRange',
      header: 'Date range',
      render: (c: Client['campaigns'][number]) => (
        <span className="text-[12.5px] text-muted">{c.dateRange}</span>
      ),
    },
    {
      key: 'channel',
      header: 'Channel',
      render: (c: Client['campaigns'][number]) => (
        <span className="text-[12.5px] text-ink">{c.channel}</span>
      ),
    },
    {
      key: 'contractValue',
      header: 'Contract value',
      render: (c: Client['campaigns'][number]) => (
        <MonoCell>{formatCurrency(c.contractValue)}</MonoCell>
      ),
    },
    {
      key: 'deliveredValue',
      header: 'Delivered value',
      render: (c: Client['campaigns'][number]) => (
        <MonoCell>{formatCurrency(c.deliveredValue)}</MonoCell>
      ),
    },
    {
      key: 'deliveryPercent',
      header: 'Delivery %',
      render: (c: Client['campaigns'][number]) => (
        <MonoCell
          className={cn(
            c.deliveryPercent >= 95
              ? 'text-good'
              : c.deliveryPercent >= 80
                ? 'text-warn'
                : 'text-risk'
          )}
        >
          {c.deliveryPercent}%
        </MonoCell>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c: Client['campaigns'][number]) => (
        <StatusDot
          variant={
            c.status === 'completed'
              ? 'ok'
              : c.status === 'live'
                ? 'warn'
                : 'cold'
          }
          label={c.status === 'completed' ? 'Completed' : c.status === 'live' ? 'Live' : 'Scheduled'}
        />
      ),
    },
  ];

  return (
    <div>
      <SectionHeading title="Campaigns" count={client.campaigns.length} />
      <DataTable columns={columns} data={client.campaigns} />
    </div>
  );
}

// ─── People Tab ──────────────────────────────────────────────────────────────

function PeopleTab({ client }: { client: Client }) {
  return (
    <div>
      <SectionHeading title="People" count={client.contacts.length} />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {client.contacts.map((contact) => (
          <div
            key={contact.email}
            className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[38px] h-[38px] rounded-full bg-navy text-paper flex items-center justify-center font-bold text-[13px] flex-shrink-0">
                {contact.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')
                  .slice(0, 2)}
              </div>
              <div className="min-w-0">
                <div className="font-display font-bold text-[15px] text-navy truncate">
                  {contact.name}
                </div>
                <div className="text-[11.5px] text-muted truncate">{contact.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-2 mb-2">
              <span
                className={cn(
                  'text-[10px] font-bold uppercase tracking-[0.08em] px-[7px] py-[2px] rounded-md',
                  contact.org === 'client'
                    ? 'bg-sky-soft text-sky'
                    : 'bg-warn/10 text-warn'
                )}
              >
                {contact.org === 'client' ? 'Client' : 'Agency'}
              </span>
            </div>

            <div className="space-y-[6px] mt-3">
              <div className="flex items-center gap-2 text-[12px] text-muted">
                <Mail size={12} className="flex-shrink-0 opacity-60" />
                <span className="truncate">{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-[12px] text-muted">
                <Calendar size={12} className="flex-shrink-0 opacity-60" />
                <span>Last contact: {contact.lastContact}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Timeline Tab ────────────────────────────────────────────────────────────

function ActivityIcon({ type }: { type: string }) {
  const size = 14;
  switch (type) {
    case 'meeting':
      return <Calendar size={size} />;
    case 'email':
      return <Mail size={size} />;
    case 'campaign-launch':
      return <Plus size={size} />;
    case 'renewal':
      return <FileText size={size} />;
    case 'pitch-won':
      return <Plus size={size} />;
    case 'pitch-lost':
      return <MessageSquare size={size} />;
    default:
      return <FileText size={size} />;
  }
}

function TimelineTab({ client }: { client: Client }) {
  return (
    <div>
      <SectionHeading title="Timeline" count={client.activity.length} />
      <div className="relative pl-6">
        {/* Vertical line */}
        <div className="absolute left-[11px] top-0 bottom-0 w-[2px] bg-line" />

        <div className="space-y-0">
          {client.activity.map((item, i) => {
            const color = ACTIVITY_COLORS[item.type] || COLORS.sky;
            return (
              <div key={i} className="relative pb-6 last:pb-0">
                {/* Dot */}
                <div
                  className="absolute -left-6 top-[2px] w-[22px] h-[22px] rounded-full flex items-center justify-center text-paper z-10"
                  style={{ backgroundColor: color }}
                >
                  <ActivityIcon type={item.type} />
                </div>

                {/* Content card */}
                <div
                  className="bg-paper border border-line rounded-xl p-4 ml-4"
                  style={{ borderLeftWidth: 3, borderLeftColor: color }}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="font-display font-bold text-[14px] text-navy">
                      {item.title}
                    </div>
                    <span className="text-[11px] text-muted whitespace-nowrap flex-shrink-0">
                      {item.date}
                    </span>
                  </div>
                  <p className="text-[12.5px] text-muted leading-[1.5]">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Client List ─────────────────────────────────────────────────────────────

export function ClientList({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  const [search, setSearch] = useState('');

  const filtered = clientList.filter((c) => {
    const q = search.toLowerCase();
    return (
      c.name.toLowerCase().includes(q) ||
      c.category.toLowerCase().includes(q) ||
      c.agency.toLowerCase().includes(q) ||
      c.owner.toLowerCase().includes(q)
    );
  });

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (c: (typeof clientList)[number]) => <BrandCell>{c.name}</BrandCell>,
    },
    {
      key: 'category',
      header: 'Category',
      render: (c: (typeof clientList)[number]) => (
        <span className="text-[12.5px] text-ink">{c.category}</span>
      ),
    },
    {
      key: 'agency',
      header: 'Agency',
      render: (c: (typeof clientList)[number]) => (
        <span className="text-[12.5px] text-muted">{c.agency}</span>
      ),
    },
    {
      key: 'owner',
      header: 'Owner',
      render: (c: (typeof clientList)[number]) => (
        <span className="text-[12.5px] text-ink">{c.owner}</span>
      ),
    },
    {
      key: 'lifetimeSpend',
      header: 'Lifetime spend',
      render: (c: (typeof clientList)[number]) => (
        <MonoCell>{formatCurrency(c.lifetimeSpend, true)}</MonoCell>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (c: (typeof clientList)[number]) => (
        <StatusDot
          variant={c.status === 'active' ? 'ok' : 'cold'}
          label={c.status === 'active' ? 'Active' : 'Lapsed'}
        />
      ),
    },
  ];

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Clients
        </h1>
        <p className="text-[13px] text-muted">
          {clientList.length} clients &middot; {clientList.filter((c) => c.status === 'active').length} active
        </p>
      </div>

      {/* Search */}
      <div className="mb-5">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, category, agency, or owner..."
          className="w-full max-w-md bg-paper border border-line rounded-lg px-4 py-[9px] text-[13px] text-ink placeholder:text-muted/60 focus:outline-none focus:ring-2 focus:ring-sky/30 focus:border-sky transition-all"
        />
      </div>

      <DataTable
        columns={columns}
        data={filtered}
        onRowClick={(c) => onNavigate('client-detail', c.slug)}
      />

      {filtered.length === 0 && (
        <div className="text-center py-10 text-[13px] text-muted">
          No clients match &ldquo;{search}&rdquo;
        </div>
      )}
    </div>
  );
}
