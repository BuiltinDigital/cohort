'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { MetricCard } from '@/components/ui/MetricCard';
import { cn } from '@/lib/utils';
import { Users, Target, BarChart3, Zap, Mail, Share2, Monitor } from 'lucide-react';

const segments = [
  {
    name: 'Food Enthusiasts',
    profiles: '8.2m',
    sources: 'BBC Good Food + Olive',
    matchRate: 84,
  },
  {
    name: 'Home & Garden',
    profiles: '6.4m',
    sources: 'Gardeners\' World + Countryfile',
    matchRate: 78,
  },
  {
    name: 'Entertainment Seekers',
    profiles: '4.8m',
    sources: 'Radio Times',
    matchRate: 71,
  },
  {
    name: 'Auto Intenders',
    profiles: '2.1m',
    sources: 'Top Gear',
    matchRate: 68,
  },
  {
    name: 'Premium Shoppers',
    profiles: '3.6m',
    sources: 'Cross-brand',
    matchRate: 76,
  },
  {
    name: 'Travel Planners',
    profiles: '1.9m',
    sources: 'Cross-brand',
    matchRate: 72,
  },
];

const activationChannels = [
  {
    name: 'Programmatic',
    description: 'Activate via Adomic SSP with real-time bidding across premium inventory',
    icon: Zap,
    status: 'Active',
  },
  {
    name: 'Direct',
    description: 'Push segments to direct-sold campaign targeting within GAM',
    icon: Monitor,
    status: 'Active',
  },
  {
    name: 'Email',
    description: 'Sync segments to email platforms for newsletter personalisation',
    icon: Mail,
    status: 'Active',
  },
  {
    name: 'Social',
    description: 'Export matched audiences to Meta, TikTok, and Pinterest',
    icon: Share2,
    status: 'Beta',
  },
];

export function AudienceStudio({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      {/* ─── Header ───────────────────────────────────────────────────────── */}
      <div className="mb-6">
        <h2 className="font-display font-[900] text-[28px] lg:text-[34px] text-navy leading-none mb-2">
          Audience Studio
        </h2>
        <p className="text-[14px] text-muted font-medium">
          Segment and activate first-party audiences across all Immediate mastheads
        </p>
      </div>

      {/* ─── Audience Stats ───────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total 1P Audience"
          value="42.8"
          unit="m"
          sub="All Immediate mastheads"
        />
        <MetricCard
          label="Addressable"
          value="28.4"
          unit="m"
          sub="66% addressable rate"
          subColor="good"
        />
        <MetricCard
          label="Active Segments"
          value="24"
          sub="6 pre-built shown below"
        />
        <MetricCard
          label="Avg Match Rate"
          value="72%"
          sub="Across all segments"
          subColor="good"
        />
      </div>

      {/* ─── Segment Cards ────────────────────────────────────────────────── */}
      <SectionHeading title="Audience Segments" count={segments.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px] mb-6">
        {segments.map(segment => (
          <div
            key={segment.name}
            className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow"
          >
            {/* Icon + Name */}
            <div className="flex items-center gap-3 mb-3">
              <div className="w-[36px] h-[36px] bg-sky-soft rounded-lg flex items-center justify-center">
                <Users className="w-[18px] h-[18px] text-sky" />
              </div>
              <div className="font-display font-[800] text-[18px] text-navy leading-tight">
                {segment.name}
              </div>
            </div>

            {/* Details */}
            <div className="space-y-[8px] mb-4">
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">Profiles</span>
                <span className="font-display font-[800] text-[20px] text-navy leading-none">{segment.profiles}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">Source</span>
                <span className="text-[12px] text-ink font-medium">{segment.sources}</span>
              </div>
              <div>
                <div className="flex justify-between items-center mb-[5px]">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">Match Rate</span>
                  <span className="font-mono text-[12px] font-bold text-navy">{segment.matchRate}%</span>
                </div>
                <div className="h-[6px] bg-line rounded overflow-hidden">
                  <div
                    className={cn(
                      'h-full rounded transition-all',
                      segment.matchRate >= 80 ? 'bg-gradient-to-r from-good to-good/80' :
                      segment.matchRate >= 70 ? 'bg-gradient-to-r from-sky to-sky-bright' :
                      'bg-gradient-to-r from-warn to-warn/80'
                    )}
                    style={{ width: `${segment.matchRate}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Activate Button */}
            <button className="w-full text-center px-3 py-[8px] bg-navy text-paper rounded-lg text-[12px] font-semibold hover:bg-ink transition-colors">
              Activate
            </button>
          </div>
        ))}
      </div>

      {/* ─── Activation Channels ──────────────────────────────────────────── */}
      <SectionHeading title="Activation Channels" count={activationChannels.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[14px] mb-6">
        {activationChannels.map(channel => {
          const IconComponent = channel.icon;
          return (
            <div
              key={channel.name}
              className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="w-[40px] h-[40px] bg-sky-soft rounded-lg flex items-center justify-center">
                  <IconComponent className="w-[20px] h-[20px] text-sky" />
                </div>
                <span className={cn(
                  'text-[10px] tracking-[0.08em] uppercase font-bold px-[8px] py-[3px] rounded-md',
                  channel.status === 'Active'
                    ? 'text-good bg-good/10'
                    : 'text-warn bg-warn/10'
                )}>
                  {channel.status}
                </span>
              </div>
              <div className="font-display font-[800] text-[18px] text-navy leading-tight mb-[4px]">
                {channel.name}
              </div>
              <div className="text-[12px] text-muted leading-snug">
                {channel.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
