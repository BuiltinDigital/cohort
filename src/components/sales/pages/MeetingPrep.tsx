'use client';

import { cn } from '@/lib/utils';

interface Meeting {
  title: string;
  date: string;
  time: string;
  attendees: string[];
  talkingPoints: string[];
  campaignName: string;
  campaignPercent: number;
  campaignStatus: 'at-risk' | 'ahead' | 'on-track';
  clientSlug?: string;
}

const meetings: Meeting[] = [
  {
    title: 'Starcom — Audi Q3 Planning',
    date: 'Apr 22, 2026',
    time: '10:00 – 11:00',
    attendees: ['Karen Lee', 'Marcus Thorne'],
    talkingPoints: [
      'Easter Drive delivery recovery plan',
      'Q3 EV launch opportunity (+20% budget)',
      'Propose content partnership on Top Gear',
    ],
    campaignName: 'Easter Drive',
    campaignPercent: 54,
    campaignStatus: 'at-risk',
    clientSlug: 'audi',
  },
  {
    title: 'Spark Foundry — Virgin Atlantic Review',
    date: 'Apr 23, 2026',
    time: '14:00 – 15:00',
    attendees: ['Rebecca Foyle'],
    talkingPoints: [
      'Long-Haul campaign overdelivering (+3%)',
      'Propose Q3 renewal with upsell (£64k)',
      'Discuss premium cabin launch content',
    ],
    campaignName: 'Long-Haul',
    campaignPercent: 91,
    campaignStatus: 'ahead',
    clientSlug: 'virgin-atlantic',
  },
  {
    title: 'Zenith — Toyota Monthly',
    date: 'Apr 24, 2026',
    time: '11:00 – 11:30',
    attendees: ['Hannah Clarke'],
    talkingPoints: [
      'Hybrid Range on track (85%)',
      'Share BBC Good Food audience data for food-auto crossover',
      'Discuss Countryfile sponsorship opportunity',
    ],
    campaignName: 'Hybrid Range',
    campaignPercent: 85,
    campaignStatus: 'on-track',
    clientSlug: 'toyota',
  },
  {
    title: 'Starcom — Samsung Galaxy Launch',
    date: 'Apr 25, 2026',
    time: '09:30 – 10:30',
    attendees: ['Karen Lee', 'Priya Shah'],
    talkingPoints: [
      'Galaxy S26 launch media plan (£420k)',
      'Audience segment: Auto Intenders + Premium Shoppers',
      'Confirm Top Gear takeover dates',
    ],
    campaignName: 'Galaxy Launch',
    campaignPercent: 78,
    campaignStatus: 'on-track',
    clientSlug: 'samsung',
  },
];

const statusStyles: Record<Meeting['campaignStatus'], { bar: string; label: string; text: string }> = {
  'at-risk':  { bar: 'bg-risk',  label: 'At Risk', text: 'text-risk' },
  'ahead':    { bar: 'bg-good',  label: 'Ahead',   text: 'text-good' },
  'on-track': { bar: 'bg-sky',   label: 'On Track', text: 'text-sky' },
};

export function MeetingPrep({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Meeting Prep
        </h1>
        <p className="text-[13px] text-muted">
          {meetings.length} upcoming meetings this week
        </p>
      </div>

      <div className="space-y-[14px]">
        {meetings.map((m, i) => {
          const status = statusStyles[m.campaignStatus];
          return (
            <div
              key={i}
              className="bg-paper border border-line rounded-xl p-5"
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-display font-[800] text-[18px] text-navy leading-snug">
                    {m.title}
                  </div>
                  <div className="text-[12px] text-muted mt-[2px]">
                    {m.date} &middot; {m.time}
                  </div>
                </div>
                <span className={cn(
                  'text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-[3px] rounded flex-shrink-0',
                  m.campaignStatus === 'at-risk' ? 'bg-risk/15 text-risk' :
                  m.campaignStatus === 'ahead' ? 'bg-good/15 text-good' :
                  'bg-sky-soft text-sky'
                )}>
                  {status.label}
                </span>
              </div>

              {/* Attendees */}
              <div className="flex flex-wrap gap-[6px] mb-4">
                {m.attendees.map(a => (
                  <span
                    key={a}
                    className="text-[10px] font-bold bg-sky-soft text-navy px-2 py-[2px] rounded"
                  >
                    {a}
                  </span>
                ))}
              </div>

              {/* Talking points */}
              <div className="mb-4">
                <div className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold mb-2">
                  Talking Points
                </div>
                <ol className="list-decimal list-inside space-y-[6px]">
                  {m.talkingPoints.map((tp, j) => (
                    <li key={j} className="text-[13px] text-ink leading-relaxed">
                      {tp}
                    </li>
                  ))}
                </ol>
              </div>

              {/* Campaign status bar */}
              <div className="mb-4">
                <div className="flex items-center justify-between mb-[6px]">
                  <span className="text-[10px] tracking-[0.1em] uppercase text-muted font-semibold">
                    {m.campaignName} — Delivery
                  </span>
                  <span className={cn('font-mono text-[12px] font-semibold', status.text)}>
                    {m.campaignPercent}%
                  </span>
                </div>
                <div className="h-[8px] bg-line rounded-full overflow-hidden">
                  <div
                    className={cn('h-full rounded-full transition-all duration-500', status.bar)}
                    style={{ width: `${m.campaignPercent}%` }}
                  />
                </div>
              </div>

              {/* Action */}
              <button
                onClick={() => m.clientSlug && onNavigate('client-detail', m.clientSlug)}
                className="text-[12px] text-sky font-semibold hover:text-navy transition-colors"
              >
                Open client detail &rarr;
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
