'use client';

import {
  marketShareData,
  competitorMovement,
  printShare,
  digitalShare,
} from '@/lib/data/marketData';
import { cn } from '@/lib/utils';

const PUBLISHER_COLORS: Record<string, string> = {
  Immediate: '#4AB4E8',
  Hearst: '#E89F4A',
  Future: '#7B4EC9',
  'Conde Nast': '#1DB77A',
  'Cond\u00e9 Nast': '#1DB77A',
  'News UK': '#E53E5C',
  DMGT: '#6B7A93',
  Others: '#6B7A93',
};

function getColor(publisher: string): string {
  return PUBLISHER_COLORS[publisher] ?? '#6B7A93';
}

/* ─── SVG Donut ────────────────────────────────────────────────────── */

function DonutChart({ data }: { data: { publisher: string; share: number }[] }) {
  const total = data.reduce((a, d) => a + d.share, 0);
  const radius = 80;
  const strokeWidth = 28;
  const center = 110;
  const circumference = 2 * Math.PI * radius;
  let cumulative = 0;

  return (
    <svg viewBox="0 0 220 220" className="w-full max-w-[220px] mx-auto">
      {data.map((d) => {
        const pct = d.share / total;
        const dashLength = pct * circumference;
        const dashOffset = -(cumulative / total) * circumference;
        cumulative += d.share;
        return (
          <circle
            key={d.publisher}
            cx={center}
            cy={center}
            r={radius}
            fill="none"
            stroke={getColor(d.publisher)}
            strokeWidth={strokeWidth}
            strokeDasharray={`${dashLength} ${circumference - dashLength}`}
            strokeDashoffset={dashOffset}
            transform={`rotate(-90 ${center} ${center})`}
            className="transition-all duration-500"
          />
        );
      })}
      <text
        x={center}
        y={center - 8}
        textAnchor="middle"
        className="fill-paper font-display font-[900] text-[28px]"
      >
        18%
      </text>
      <text
        x={center}
        y={center + 14}
        textAnchor="middle"
        className="fill-paper/70 text-[10px] font-bold tracking-[0.12em] uppercase"
      >
        IMMEDIATE
      </text>
    </svg>
  );
}

/* ─── Horizontal Bar ───────────────────────────────────────────────── */

function HBar({
  label,
  value,
  max,
  color,
  suffix,
}: {
  label: string;
  value: number;
  max: number;
  color: string;
  suffix?: string;
}) {
  const pct = Math.max(4, (value / max) * 100);
  return (
    <div className="flex items-center gap-3">
      <div className="w-[90px] text-[12px] font-semibold text-ink truncate">{label}</div>
      <div className="flex-1 h-[14px] bg-off rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{ width: `${pct}%`, background: color }}
        />
      </div>
      <div className="w-[52px] text-right font-mono text-[12px] font-semibold text-ink">
        {value}%{suffix ?? ''}
      </div>
    </div>
  );
}

/* ─── Component ────────────────────────────────────────────────────── */

export function MarketShare({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const maxCompShare = Math.max(...competitorMovement.map((c) => c.share));
  const maxPrint = Math.max(...printShare.map((p) => p.share));
  const maxDigital = Math.max(...digitalShare.map((p) => p.share));

  return (
    <div className="animate-fade-up">
      {/* ─── Hero Section ────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        {/* Donut Card */}
        <div className="bg-gradient-to-br from-ink to-[#162d5a] rounded-[14px] p-6 lg:p-8 relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-[200px] h-[200px] border-2 border-white/[0.08] rounded-full" />

          <div className="text-[10px] tracking-[0.15em] uppercase font-bold text-paper/60 mb-5">
            UK Publisher Market Share &middot; Digital Display
          </div>

          <DonutChart data={marketShareData} />

          {/* Legend */}
          <div className="grid grid-cols-2 gap-x-5 gap-y-[6px] mt-5">
            {marketShareData.map((d) => (
              <div key={d.publisher} className="flex items-center gap-2">
                <span
                  className="w-[8px] h-[8px] rounded-full flex-shrink-0"
                  style={{ background: getColor(d.publisher) }}
                />
                <span className="text-[12px] text-paper/80 font-medium">
                  {d.publisher}
                  <span className="font-mono text-paper/50 ml-1">{d.share}%</span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Competitor Movement Card */}
        <div className="bg-paper border border-line rounded-xl p-6">
          <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-muted mb-1">
            Competitor Movement
          </div>
          <div className="text-[13px] text-muted mb-5">
            Year-on-year share change by publisher
          </div>

          <div className="space-y-3">
            {competitorMovement.map((c) => (
              <div key={c.publisher}>
                <div className="flex items-center justify-between mb-[5px]">
                  <span className="text-[13px] font-semibold text-ink">{c.publisher}</span>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[12px] text-ink font-semibold">{c.share}%</span>
                    <span
                      className={cn(
                        'font-mono text-[11px] font-bold',
                        c.yoyDelta > 0 ? 'text-good' : c.yoyDelta < 0 ? 'text-risk' : 'text-muted'
                      )}
                    >
                      {c.yoyDelta > 0 ? '+' : ''}
                      {c.yoyDelta.toFixed(1)}pts
                    </span>
                  </div>
                </div>
                <div className="h-[10px] bg-off rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${(c.share / maxCompShare) * 100}%`,
                      background: getColor(c.publisher),
                    }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ─── Split by Format ─────────────────────────────────────────────── */}
      <div className="bg-paper border border-line rounded-xl p-6 mb-6">
        <div className="text-[10px] tracking-[0.12em] uppercase font-bold text-muted mb-1">
          Split by Format
        </div>
        <div className="text-[13px] text-muted mb-5">
          Print vs Digital share by publisher
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Print Share */}
          <div>
            <div className="font-display font-[800] text-[16px] text-navy mb-4">Print Share</div>
            <div className="space-y-[10px] mb-4">
              {printShare.map((p) => (
                <HBar
                  key={p.publisher}
                  label={p.publisher}
                  value={p.share}
                  max={maxPrint}
                  color={getColor(p.publisher)}
                />
              ))}
            </div>
            <div className="bg-good/10 border border-good/20 rounded-lg p-3">
              <span className="text-[12px] font-semibold text-good">
                Print: #2 in UK publisher market
              </span>
            </div>
          </div>

          {/* Digital Share */}
          <div>
            <div className="font-display font-[800] text-[16px] text-navy mb-4">Digital Share</div>
            <div className="space-y-[10px] mb-4">
              {digitalShare.map((p) => (
                <HBar
                  key={p.publisher}
                  label={p.publisher}
                  value={p.share}
                  max={maxDigital}
                  color={getColor(p.publisher)}
                />
              ))}
            </div>
            <div className="bg-warn/10 border border-warn/20 rounded-lg p-3">
              <span className="text-[12px] font-semibold text-warn">
                Digital: #4 -- losing ground to Future
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
