'use client';

import {
  winLossHistory,
  lossReasons,
  winReasons,
  type LossReason,
} from '@/lib/data/director/winLoss';
import {
  LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend, Cell,
} from 'recharts';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { cn, formatCurrency } from '@/lib/utils';

const COLORS = {
  sky: '#4AB4E8',
  navy: '#0E2A5C',
  good: '#1DB77A',
  warn: '#FF9D2E',
  risk: '#E53E5C',
  muted: '#6B7A93',
};

/* Recent closed-lost deals (mock, derived from loss reasons context) */
const recentClosedLost = [
  { deal: 'Dyson Brand Takeover', advertiser: 'Dyson', value: 280_000, lossReason: 'Price', date: '2026-03-28' },
  { deal: 'Nike Running Content', advertiser: 'Nike', value: 190_000, lossReason: 'Audience Fit', date: '2026-03-14' },
  { deal: 'HSBC Finance Hub', advertiser: 'HSBC', value: 320_000, lossReason: 'Budget Cut', date: '2026-02-22' },
  { deal: 'Vodafone Always-On', advertiser: 'Vodafone', value: 410_000, lossReason: 'Price', date: '2026-02-10' },
  { deal: 'Kelloggs Breakfast Series', advertiser: 'Kelloggs', value: 150_000, lossReason: 'Competitor Won', date: '2026-02-04' },
  { deal: 'Barclays Wealth Guide', advertiser: 'Barclays', value: 260_000, lossReason: 'Delivery Concerns', date: '2026-01-28' },
  { deal: 'Netflix Q1 Promo', advertiser: 'Netflix', value: 180_000, lossReason: 'Audience Fit', date: '2026-01-20' },
  { deal: 'Shell EV Partnership', advertiser: 'Shell', value: 220_000, lossReason: 'Price', date: '2026-01-15' },
];

const trendArrow = (trend: 'up' | 'flat' | 'down', delta: number) => {
  if (trend === 'up') return <span className="text-risk font-mono text-[11px] font-semibold ml-1">+{delta}pt</span>;
  if (trend === 'down') return <span className="text-good font-mono text-[11px] font-semibold ml-1">{delta}pt</span>;
  return <span className="text-muted font-mono text-[11px] ml-1">--</span>;
};

export function WinLossAnalysis({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const currentWinRate = winLossHistory[winLossHistory.length - 1].winRate;
  const previousWinRate = winLossHistory[winLossHistory.length - 2].winRate;
  const winRateDelta = currentWinRate - previousWinRate;

  return (
    <div className="animate-fade-up">

      {/* ─── WIN RATE HERO ────────────────────────────────────────────────── */}
      <div className="bg-paper border border-line rounded-xl p-6 mb-6">
        <div className="flex items-baseline gap-3 mb-1">
          <span className="font-display font-[900] text-[44px] text-navy leading-none">{currentWinRate}%</span>
          <span className="text-[14px] text-muted font-semibold">win rate this quarter</span>
          <span className={cn(
            'font-mono text-[13px] font-semibold',
            winRateDelta >= 0 ? 'text-good' : 'text-risk'
          )}>
            {winRateDelta >= 0 ? '+' : ''}{winRateDelta}pt vs last Q
          </span>
        </div>
      </div>

      {/* ─── WIN RATE TREND ───────────────────────────────────────────────── */}
      <SectionHeading title="Win Rate Trend" />

      <div className="bg-paper border border-line rounded-xl p-5 mb-6">
        <div className="h-[280px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={winLossHistory} margin={{ top: 10, right: 30, bottom: 0, left: 10 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="quarter" tick={{ fill: COLORS.muted, fontSize: 11 }} />
              <YAxis
                domain={[50, 80]}
                tickFormatter={(v) => `${v}%`}
                tick={{ fill: COLORS.muted, fontSize: 11 }}
              />
              <Tooltip
                formatter={(value, name) => [`${value}%`, name]}
                contentStyle={{ borderRadius: 10, border: '1px solid #e5e7eb', fontSize: 12 }}
              />
              <Legend wrapperStyle={{ fontSize: 12, fontWeight: 600 }} />
              <Line
                type="monotone"
                dataKey="winRate"
                stroke={COLORS.sky}
                strokeWidth={2.5}
                dot={{ r: 4, fill: COLORS.sky }}
                name="Win Rate"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* ─── LOSS REASONS + WIN REASONS ───────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">

        {/* Loss Reasons */}
        <div>
          <SectionHeading title="Loss Reasons" className="mt-0" />
          <div className="bg-paper border border-line rounded-xl p-5">
            <div className="space-y-3">
              {lossReasons.map((r) => (
                <div key={r.reason} className="flex items-center gap-3">
                  <div className="w-[100px] text-[12px] font-semibold text-navy truncate">{r.reason}</div>
                  <div className="flex-1 h-[22px] bg-off rounded-md overflow-hidden relative">
                    <div
                      className="h-full bg-risk/80 rounded-md transition-all"
                      style={{ width: `${r.percentOfLosses}%` }}
                    />
                    <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-ink">
                      {r.percentOfLosses}%
                    </span>
                  </div>
                  <div className="w-[60px] text-right">
                    {trendArrow(r.trend, r.trendDelta)}
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 p-3 bg-risk/5 border border-risk/20 rounded-lg">
              <div className="text-[11px] font-semibold text-risk">
                Price trending up +6pt — now #1 loss reason. Review pricing strategy.
              </div>
            </div>
          </div>
        </div>

        {/* Win Reasons */}
        <div>
          <SectionHeading title="Win Reasons" className="mt-0" />
          <div className="bg-paper border border-line rounded-xl p-5">
            <div className="space-y-3">
              {winReasons.map((r) => (
                <div key={r.reason} className="flex items-center gap-3">
                  <div className="w-[100px] text-[12px] font-semibold text-navy truncate">{r.reason}</div>
                  <div className="flex-1 h-[22px] bg-off rounded-md overflow-hidden relative">
                    <div
                      className="h-full bg-good/70 rounded-md transition-all"
                      style={{ width: `${r.percentOfWins}%` }}
                    />
                    <span className="absolute inset-0 flex items-center px-2 text-[10px] font-bold text-ink">
                      {r.percentOfWins}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ─── RECENT CLOSED-LOST DEALS ─────────────────────────────────────── */}
      <SectionHeading title="Recent Closed-Lost Deals" count={recentClosedLost.length} />

      <DataTable
        className="mb-6"
        data={recentClosedLost}
        columns={[
          {
            key: 'deal',
            header: 'Deal',
            render: (d) => <BrandCell>{d.deal}</BrandCell>,
          },
          {
            key: 'advertiser',
            header: 'Advertiser',
            render: (d) => <span className="text-ink font-medium">{d.advertiser}</span>,
          },
          {
            key: 'value',
            header: 'Value',
            render: (d) => <MonoCell className="font-semibold">{formatCurrency(d.value, true)}</MonoCell>,
          },
          {
            key: 'lossReason',
            header: 'Loss Reason',
            render: (d) => (
              <span className={cn(
                'text-[11px] font-semibold px-2 py-[3px] rounded-md',
                d.lossReason === 'Price' ? 'bg-risk/10 text-risk' :
                d.lossReason === 'Budget Cut' ? 'bg-warn/10 text-warn' :
                'bg-muted/10 text-muted'
              )}>
                {d.lossReason}
              </span>
            ),
          },
          {
            key: 'date',
            header: 'Date',
            render: (d) => <MonoCell>{d.date}</MonoCell>,
          },
        ]}
      />
    </div>
  );
}
