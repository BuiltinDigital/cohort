'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { weeklyActivity, myKPIs as salesRepKPIs } from '@/lib/data/sales/myPerformance';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const activityLog = [
  { date: 'Apr 17', type: 'Meeting', desc: 'Meeting with Karen Lee (Starcom) — Audi Q3 planning' },
  { date: 'Apr 16', type: 'Proposal', desc: 'Proposal sent: Samsung Galaxy S26 content package' },
  { date: 'Apr 16', type: 'Email', desc: 'Email: Waitrose spring performance update' },
  { date: 'Apr 15', type: 'Call', desc: 'Call with Marcus Thorne — Samsung budget confirmation' },
  { date: 'Apr 14', type: 'Meeting', desc: 'Meeting with Priya Shah (Starcom) — Charlotte Tilbury brief' },
  { date: 'Apr 14', type: 'Email', desc: 'Email: Aldi BBC Good Food renewal discussion' },
  { date: 'Apr 12', type: 'Proposal', desc: 'Proposal sent: Virgin Atlantic Radio Times travel hub' },
  { date: 'Apr 11', type: 'Meeting', desc: 'Meeting with Nathan Cross (Zenith) — Toyota Q2 review' },
  { date: 'Apr 10', type: 'Call', desc: 'Call with Nina Okafor — Volvo Top Gear data pack' },
  { date: 'Apr 9', type: 'Email', desc: 'Email: TUI summer travel guide sponsorship follow-up' },
];

const typeStyles: Record<string, string> = {
  Meeting:  'bg-sky-soft text-sky',
  Proposal: 'bg-good/15 text-good',
  Email:    'bg-warn/15 text-warn',
  Call:     'bg-line text-muted',
};

export function WeeklyActivity({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Weekly Activity
        </h1>
        <p className="text-[13px] text-muted">
          Your sales activity log and trends
        </p>
      </div>

      {/* This week summary */}
      <SectionHeading title="This Week" />

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {[
          { label: 'Meetings', value: salesRepKPIs.meetingsThisWeek },
          { label: 'Proposals Sent', value: salesRepKPIs.proposalsSent },
          { label: 'Deals Progressed', value: 2 },
          { label: 'Emails Sent', value: 18 },
        ].map(item => (
          <div key={item.label} className="bg-paper border border-line rounded-xl p-4 text-center">
            <div className="font-display font-[800] text-[30px] text-navy leading-none mb-1">
              {item.value}
            </div>
            <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold">
              {item.label}
            </div>
          </div>
        ))}
      </div>

      {/* 8-week trend chart */}
      <SectionHeading title="8-Week Trend" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="flex items-center gap-5 mb-4">
          <div className="flex items-center gap-[6px]">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#4AB4E8' }} />
            <span className="text-[11px] text-muted font-semibold">Meetings</span>
          </div>
          <div className="flex items-center gap-[6px]">
            <span className="w-3 h-3 rounded-sm" style={{ backgroundColor: '#0E2A5C' }} />
            <span className="text-[11px] text-muted font-semibold">Proposals</span>
          </div>
        </div>

        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={weeklyActivity} barCategoryGap="20%">
            <XAxis
              dataKey="week"
              tick={{ fontSize: 10, fill: '#8794A0' }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              tick={{ fontSize: 10, fill: '#8794A0' }}
              tickLine={false}
              axisLine={false}
              allowDecimals={false}
            />
            <Tooltip
              contentStyle={{
                background: '#fff',
                border: '1px solid #E4E7EC',
                borderRadius: 10,
                fontSize: 12,
              }}
              formatter={(value) => Number(value)}
            />
            <Bar dataKey="meetings" fill="#4AB4E8" radius={[4, 4, 0, 0]} />
            <Bar dataKey="proposals" fill="#0E2A5C" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Activity log */}
      <SectionHeading title="Recent Activity" count={activityLog.length} />

      <div className="space-y-[10px]">
        {activityLog.map((a, i) => (
          <div
            key={i}
            className="bg-paper border border-line rounded-xl px-4 py-3 flex items-center gap-3 hover:shadow-sm transition-shadow"
          >
            <span className="font-mono text-[11px] text-muted w-[52px] flex-shrink-0">
              {a.date}
            </span>
            <span className={`text-[10px] font-bold uppercase tracking-[0.08em] px-2 py-[3px] rounded flex-shrink-0 ${typeStyles[a.type] || 'bg-line text-muted'}`}>
              {a.type}
            </span>
            <span className="text-[13px] text-ink">{a.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
