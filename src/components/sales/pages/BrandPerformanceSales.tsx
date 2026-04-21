'use client';

import { useMemo } from 'react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { brands } from '@/lib/data/brands';
import { cn, formatCurrency } from '@/lib/utils';

/* Which of Alicia's clients advertise on each brand */
const brandClientMap: Record<string, string[]> = {
  'top-gear':         ['Samsung', 'Audi', 'Volvo', 'Tesla'],
  'bbc-good-food':    ['Waitrose', 'Hellmanns', 'Aldi', 'Lidl'],
  'radio-times':      ['Virgin Atlantic', 'TUI', 'Samsung'],
  'olive':            ['Waitrose', 'Hellmanns'],
  'gardeners-world':  ['Aldi'],
  'countryfile':       ['Toyota', 'Volvo'],
};

const displayBrandIds = ['top-gear', 'bbc-good-food', 'radio-times', 'olive', 'gardeners-world', 'countryfile'];

function formatReaders(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}m`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(0)}k`;
  return String(n);
}

export function BrandPerformanceSales({ onNavigate }: { onNavigate: (page: string, detail?: string) => void }) {
  const selectedBrands = useMemo(
    () => displayBrandIds.map(id => brands.find(b => b.id === id)!).filter(Boolean),
    []
  );

  return (
    <div className="animate-fade-up">
      <div className="mb-6">
        <h1 className="font-display font-[900] text-[36px] text-navy leading-none mb-1">
          Brand Performance
        </h1>
        <p className="text-[13px] text-muted">
          {selectedBrands.length} Immediate brands relevant to your client portfolio
        </p>
      </div>

      <SectionHeading title="Your Brands" count={selectedBrands.length} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[14px]">
        {selectedBrands.map(brand => {
          const clients = brandClientMap[brand.id] || [];
          return (
            <div
              key={brand.id}
              className="bg-paper border border-line rounded-xl p-5 hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="mb-3">
                <div className="font-display font-[800] text-[18px] text-navy leading-snug">
                  {brand.name}
                </div>
                <div className="text-[11px] text-muted">{brand.type} &middot; {brand.category}</div>
              </div>

              {/* Big number — readers */}
              <div className="mb-4">
                <div className="font-display font-[800] text-[34px] text-navy leading-none">
                  {formatReaders(brand.monthlyReaders)}
                </div>
                <div className="text-[10px] tracking-[0.12em] uppercase text-muted font-semibold mt-[2px]">
                  {brand.readersLabel}
                </div>
              </div>

              {/* Metrics grid */}
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div>
                  <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    YoY Growth
                  </div>
                  <div className={cn(
                    'font-mono text-[13px] font-semibold',
                    brand.yoyGrowth > 0 ? 'text-good' : brand.yoyGrowth < 0 ? 'text-risk' : 'text-muted'
                  )}>
                    {brand.yoyGrowth > 0 ? '+' : ''}{brand.yoyGrowth}%
                  </div>
                </div>
                <div>
                  <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[2px]">
                    Ad Revenue Q2
                  </div>
                  <div className="font-mono text-[13px] font-semibold text-navy">
                    {formatCurrency(brand.adRevenueQ2, true)}
                  </div>
                </div>
              </div>

              {/* Client tags */}
              <div className="pt-3 border-t border-line-soft">
                <div className="text-[9.5px] tracking-[0.1em] uppercase text-muted font-semibold mb-[6px]">
                  Your Clients on This Brand
                </div>
                <div className="flex flex-wrap gap-[6px]">
                  {clients.map(c => (
                    <span
                      key={c}
                      className="text-[10px] font-bold bg-sky-soft text-navy px-2 py-[2px] rounded"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
