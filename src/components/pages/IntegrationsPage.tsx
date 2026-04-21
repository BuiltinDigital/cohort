'use client';

import { integrations } from '@/lib/data/integrations';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { StatusDot } from '@/components/ui/StatusDot';
import { cn } from '@/lib/utils';
import {
  Database,
  LayoutDashboard,
  Zap,
  Table,
  CheckSquare,
  MessageSquare,
  BarChart2,
  Users,
} from 'lucide-react';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  'database': Database,
  'layout-dashboard': LayoutDashboard,
  'zap': Zap,
  'table': Table,
  'check-square': CheckSquare,
  'message-square': MessageSquare,
  'bar-chart-2': BarChart2,
  'users': Users,
};

function statusToVariant(status: string): 'ok' | 'warn' | 'risk' | 'cold' {
  switch (status) {
    case 'connected': return 'ok';
    case 'syncing': return 'warn';
    case 'error': return 'risk';
    default: return 'cold';
  }
}

function statusToLabel(status: string): string {
  switch (status) {
    case 'connected': return 'Connected';
    case 'syncing': return 'Syncing';
    case 'error': return 'Error';
    default: return 'Not Connected';
  }
}

export function IntegrationsPage({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      {/* ─── Header ───────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="font-display font-[900] text-[28px] lg:text-[34px] text-navy leading-none mb-2">
          Integrations
        </h2>
        <p className="text-[14px] text-muted font-medium">
          Connected platforms powering your Cohort workspace
        </p>
      </div>

      {/* ─── Integration Grid ─────────────────────────────────────────────── */}
      <SectionHeading title="Connected Platforms" count={integrations.filter(i => i.status === 'connected').length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] mb-6">
        {integrations.map(integration => {
          const IconComponent = iconMap[integration.icon] || Database;
          return (
            <div
              key={integration.id}
              className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              {/* Icon + Category */}
              <div className="flex items-start justify-between mb-3">
                <div className="w-[40px] h-[40px] bg-off rounded-lg flex items-center justify-center">
                  <IconComponent className="w-[20px] h-[20px] text-muted" />
                </div>
                <span className="text-[10px] tracking-[0.08em] uppercase font-bold text-muted bg-off px-[8px] py-[3px] rounded-md">
                  {integration.category}
                </span>
              </div>

              {/* Name + Description */}
              <div className="font-display font-[800] text-[18px] text-navy leading-tight mb-[4px]">
                {integration.name}
              </div>
              <div className="text-[12px] text-muted mb-3 leading-snug">
                {integration.description}
              </div>

              {/* Status + Last Sync */}
              <div className="flex items-center justify-between mb-3">
                <StatusDot
                  variant={statusToVariant(integration.status)}
                  label={statusToLabel(integration.status)}
                />
                <span className="font-mono text-[11px] text-muted">
                  {integration.lastSync}
                </span>
              </div>

              {/* Configure Button */}
              <button className="w-full text-center px-3 py-[7px] bg-off border border-line rounded-lg text-[12px] text-muted font-semibold hover:bg-line hover:text-navy transition-colors">
                Configure
              </button>
            </div>
          );
        })}
      </div>

      {/* ─── Data Freshness ───────────────────────────────────────────────── */}
      <SectionHeading title="Data Freshness" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="space-y-[8px]">
          {integrations.map(integration => (
            <div
              key={integration.id}
              className="flex items-center justify-between py-[6px] border-b border-line-soft last:border-b-0"
            >
              <div className="flex items-center gap-3">
                <span className={cn(
                  'w-[7px] h-[7px] rounded-full',
                  integration.status === 'connected' ? 'bg-good' :
                  integration.status === 'syncing' ? 'bg-warn' :
                  integration.status === 'error' ? 'bg-risk' : 'bg-muted'
                )} />
                <span className="text-[13px] text-ink font-medium">{integration.name}</span>
              </div>
              <span className="font-mono text-[11px] text-muted">{integration.lastSync}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
