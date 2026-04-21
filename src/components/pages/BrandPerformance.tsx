'use client';

import { brands, type Brand } from '@/lib/data/brands';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/* Sparkline SVG helper                                               */
/* ------------------------------------------------------------------ */
function Sparkline({ data, trend }: { data: number[]; trend: 'up' | 'flat' | 'down' }) {
  if (data.length === 0) return null;

  const viewW = 200;
  const viewH = 36;
  const pad = 2;
  const min = Math.min(...data);
  const max = Math.max(...data);
  const range = max - min || 1;

  const points = data.map((v, i) => {
    const x = pad + (i / (data.length - 1)) * (viewW - pad * 2);
    const y = viewH - pad - ((v - min) / range) * (viewH - pad * 2);
    return `${x},${y}`;
  });

  const polylineStr = points.join(' ');
  // Closed polygon for the fill area
  const firstX = pad;
  const lastX = pad + ((data.length - 1) / (data.length - 1)) * (viewW - pad * 2);
  const fillStr = `${firstX},${viewH} ${polylineStr} ${lastX},${viewH}`;

  const strokeColor = trend === 'down' ? 'var(--color-warn)' : 'var(--color-good)';
  const fillColor = trend === 'down' ? 'rgba(var(--warn-rgb, 234,179,8), 0.15)' : 'rgba(var(--good-rgb, 34,197,94), 0.15)';

  return (
    <svg viewBox={`0 0 ${viewW} ${viewH}`} className="w-full h-[36px]" preserveAspectRatio="none">
      <polygon points={fillStr} fill={fillColor} />
      <polyline
        points={polylineStr}
        fill="none"
        stroke={strokeColor}
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/* Format helpers                                                      */
/* ------------------------------------------------------------------ */
function formatReaders(n: number): { value: string; suffix: string } {
  if (n >= 1_000_000) return { value: (n / 1_000_000).toFixed(1), suffix: 'm' };
  if (n >= 1_000) return { value: (n / 1_000).toFixed(0), suffix: 'k' };
  return { value: String(n), suffix: '' };
}

function formatCompact(n: number): string {
  if (n >= 1_000_000) return `£${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `£${(n / 1_000).toFixed(0)}k`;
  return `£${n}`;
}

/* ------------------------------------------------------------------ */
/* Brand Card                                                          */
/* ------------------------------------------------------------------ */
function BrandCard({ brand }: { brand: Brand }) {
  const readers = formatReaders(brand.monthlyReaders);
  const isUp = brand.trend === 'up';

  // Determine the secondary metric for the middle column
  let secondaryLabel = '';
  let secondaryValue = '';
  if (brand.subRevenue) {
    secondaryLabel = 'Sub Revenue';
    secondaryValue = formatCompact(brand.subRevenue);
  } else if (brand.printCirc) {
    secondaryLabel = 'Print Circ';
    secondaryValue = `${(brand.printCirc / 1_000).toFixed(0)}k`;
  } else if (brand.newsletterSubs) {
    secondaryLabel = 'Newsletter Subs';
    secondaryValue = `${(brand.newsletterSubs / 1_000_000).toFixed(1)}m`;
  } else {
    secondaryLabel = 'Pages / Visit';
    secondaryValue = brand.pagesPerVisit ? String(brand.pagesPerVisit) : '—';
  }

  return (
    <div className="bg-paper border border-line rounded-xl p-5 hover:shadow-lg hover:translate-y-[-3px] transition">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="font-display font-[800] text-[22px] text-navy leading-tight">
            {brand.name}
          </div>
          <div className="text-[10px] uppercase tracking-[0.12em] text-muted mt-[2px]">
            {brand.type} · {brand.category}
          </div>
        </div>
        <span
          className={cn(
            'mt-[6px] w-[10px] h-[10px] rounded-full flex-shrink-0',
            isUp ? 'bg-good' : 'bg-warn'
          )}
        />
      </div>

      {/* Big reader number */}
      <div className="mb-1">
        <span className="font-display font-[900] text-[40px] text-sky leading-none">
          {readers.value}
        </span>
        <span className="font-display font-[700] text-[22px] text-sky/70 ml-[2px]">
          {readers.suffix}
        </span>
      </div>
      <div className="text-[11px] text-muted mb-3">
        {brand.readersLabel} ·{' '}
        <span className={cn('font-semibold', isUp ? 'text-good' : 'text-warn')}>
          {brand.yoyGrowth >= 0 ? '+' : ''}
          {brand.yoyGrowth}% YoY
        </span>
      </div>

      {/* Sparkline */}
      <div className="mb-4">
        <Sparkline data={brand.sparkData} trend={brand.trend} />
      </div>

      {/* Bottom metrics row */}
      <div className="grid grid-cols-3 gap-3 pt-3 border-t border-line">
        <div>
          <div className="text-[9.5px] uppercase tracking-[0.1em] text-muted font-semibold mb-[2px]">
            Time on Site
          </div>
          <div className="font-display font-bold text-[16px] text-navy">
            {brand.timeOnSite || '—'}
          </div>
        </div>
        <div>
          <div className="text-[9.5px] uppercase tracking-[0.1em] text-muted font-semibold mb-[2px]">
            {secondaryLabel}
          </div>
          <div className="font-display font-bold text-[16px] text-navy">
            {secondaryValue}
          </div>
        </div>
        <div>
          <div className="text-[9.5px] uppercase tracking-[0.1em] text-muted font-semibold mb-[2px]">
            Ad Rev Q2
          </div>
          <div className="font-display font-bold text-[16px] text-navy">
            {formatCompact(brand.adRevenueQ2)}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Rankings Table                                                       */
/* ------------------------------------------------------------------ */
type RankedBrand = Brand & { rank: number };

function buildRankings(): RankedBrand[] {
  return [...brands]
    .sort((a, b) => b.monthlyReaders - a.monthlyReaders)
    .map((b, i) => ({ ...b, rank: i + 1 }));
}

const rankingsColumns = [
  {
    key: 'rank',
    header: 'Rank',
    render: (b: RankedBrand) => <MonoCell>#{b.rank}</MonoCell>,
    className: 'w-[60px]',
  },
  {
    key: 'brand',
    header: 'Brand',
    render: (b: RankedBrand) => <BrandCell>{b.name}</BrandCell>,
  },
  {
    key: 'reach',
    header: 'Monthly Reach',
    render: (b: RankedBrand) => {
      const r = formatReaders(b.monthlyReaders);
      return <MonoCell>{r.value}{r.suffix}</MonoCell>;
    },
  },
  {
    key: 'time',
    header: 'Time on Brand',
    render: (b: RankedBrand) => <MonoCell>{b.timeOnSite || '—'}</MonoCell>,
  },
  {
    key: 'yoy',
    header: 'YoY',
    render: (b: RankedBrand) => (
      <MonoCell className={b.yoyGrowth >= 0 ? 'text-good' : 'text-warn'}>
        {b.yoyGrowth >= 0 ? '+' : ''}{b.yoyGrowth}%
      </MonoCell>
    ),
  },
  {
    key: 'revenue',
    header: 'Revenue Q2',
    render: (b: RankedBrand) => <MonoCell>{formatCompact(b.adRevenueQ2)}</MonoCell>,
  },
  {
    key: 'rpr',
    header: 'Rev per Reader',
    render: (b: RankedBrand) => <MonoCell>£{b.revPerReader.toFixed(2)}</MonoCell>,
  },
];

/* ------------------------------------------------------------------ */
/* Page component                                                      */
/* ------------------------------------------------------------------ */
export function BrandPerformance({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const ranked = buildRankings();

  return (
    <div className="animate-fade-up">
      {/* ---------------------------------------------------------------- */}
      {/* A) BRAND CARDS GRID                                              */}
      {/* ---------------------------------------------------------------- */}
      <div className="mb-8">
        <div className="font-display font-[800] text-[26px] text-navy mb-4">
          Brand Performance
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {brands.map(brand => (
            <BrandCard key={brand.id} brand={brand} />
          ))}
        </div>
      </div>

      {/* ---------------------------------------------------------------- */}
      {/* B) RANKINGS TABLE                                                */}
      {/* ---------------------------------------------------------------- */}
      <div className="mb-6">
        <div className="mb-3">
          <div className="font-display font-[800] text-[22px] text-navy">
            Brand Readership Rankings · Q2 2026
          </div>
          <div className="text-[11px] text-muted mt-[2px]">
            Source: Immediate Media internal analytics · comScore verified
          </div>
        </div>

        <DataTable
          columns={rankingsColumns}
          data={ranked}
          onRowClick={(b) => onNavigate('brand-detail', b.id)}
        />
      </div>
    </div>
  );
}
