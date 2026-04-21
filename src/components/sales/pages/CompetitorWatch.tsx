'use client';

import { TimelineCard } from '@/components/ui/TimelineCard';

const newsItems = [
  {
    date: 'Apr 16, 2026',
    tag: 'Client',
    title: 'Audi announces new EV range — marketing budget +20%',
    description:
      'Audi UK confirms expanded marketing investment for Q3 EV launch. Strong upsell opportunity for Top Gear content partnership — brief expected within 2 weeks.',
    variant: 'success' as const,
  },
  {
    date: 'Apr 14, 2026',
    tag: 'Agency',
    title: 'Publicis acquires data consultancy — new targeting capabilities',
    description:
      'Publicis Groupe completed acquisition of Propel Data, adding first-party data enrichment across Starcom and Zenith planning teams. New audience tools expected by Q3.',
    variant: 'info' as const,
  },
  {
    date: 'Apr 12, 2026',
    tag: 'Competitor',
    title: 'Hearst launches contextual targeting for food advertisers',
    description:
      'Hearst UK rolled out recipe-level contextual targeting on Delish and Good Housekeeping — threatens BBC Good Food position with Waitrose, Hellmanns and Aldi briefs.',
    variant: 'warning' as const,
  },
  {
    date: 'Apr 10, 2026',
    tag: 'Client',
    title: 'Samsung Galaxy S26 launch confirmed for June — expect brief increase',
    description:
      'Samsung UK officially confirmed June launch for Galaxy S26. Media plan RFP expected imminently — coordinate with Karen Lee (Starcom) for Top Gear takeover.',
    variant: 'success' as const,
  },
  {
    date: 'Apr 8, 2026',
    tag: 'Market',
    title: 'UK digital ad spend grows 11% in Q1 2026',
    description:
      'IAB UK reports double-digit growth in digital display and video. Premium publishers outperforming programmatic open exchange — positive signal for Immediate portfolio.',
    variant: 'info' as const,
  },
  {
    date: 'Apr 5, 2026',
    tag: 'Competitor',
    title: 'Future plc reports digital revenue +18% YoY',
    description:
      'Future plc Q1 results show strong digital growth driven by affiliate and commerce content. Key threat in automotive (Top Gear vs TechRadar) and food verticals.',
    variant: 'danger' as const,
  },
  {
    date: 'Apr 3, 2026',
    tag: 'Regulatory',
    title: 'HFSS enforcement timeline accelerated — impacts food clients',
    description:
      'UK Government confirms HFSS advertising restrictions to take effect October 2026, six months earlier than planned. Impacts Hellmanns, Aldi, and Lidl campaign planning.',
    variant: 'warning' as const,
  },
  {
    date: 'Apr 1, 2026',
    tag: 'Client',
    title: 'Virgin Atlantic launches premium cabin refresh — travel spend expected to rise',
    description:
      'Virgin Atlantic unveils Upper Class Suite redesign with significant marketing push planned for Q3. Opportunity to position Radio Times premium travel content hub.',
    variant: 'success' as const,
  },
];

export function CompetitorWatch({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Competitor &amp; Market Watch
        </h1>
        <p className="text-[13px] text-muted">
          {newsItems.length} updates relevant to your Publicis portfolio
        </p>
      </div>

      <div className="space-y-[14px]">
        {newsItems.map((item, i) => (
          <TimelineCard
            key={i}
            date={item.date}
            tag={item.tag}
            title={item.title}
            description={item.description}
            variant={item.variant}
          />
        ))}
      </div>
    </div>
  );
}
