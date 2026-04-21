'use client';

import { cn } from '@/lib/utils';

interface HeatmapCell {
  value: number;
  label?: string;
  sublabel?: string;
}

interface HeatmapTableProps {
  rowHeaders: string[];
  colHeaders: string[];
  data: HeatmapCell[][]; // rows × cols
  getColor?: (value: number) => string;
  formatValue?: (value: number) => string;
  className?: string;
}

function defaultColor(value: number): string {
  if (value === 0) return 'bg-line-soft text-muted-soft';
  if (value >= 90) return 'bg-good/20 text-good';
  if (value >= 80) return 'bg-good/10 text-good';
  if (value >= 70) return 'bg-warn/15 text-warn';
  return 'bg-risk/15 text-risk';
}

export function HeatmapTable({
  rowHeaders, colHeaders, data,
  getColor = defaultColor,
  formatValue = (v) => v === 0 ? '—' : String(v),
  className,
}: HeatmapTableProps) {
  return (
    <div className={cn('bg-paper border border-line rounded-xl overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              <th className="text-left px-4 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[140px]">
                Team
              </th>
              {colHeaders.map(h => (
                <th key={h} className="text-center px-3 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[90px]">
                  {h}
                </th>
              ))}
              <th className="text-center px-3 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[70px]">
                Avg
              </th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => {
              const nonZeroCells = row.filter(c => c.value > 0);
              const avg = nonZeroCells.length > 0
                ? Math.round(nonZeroCells.reduce((s, c) => s + c.value, 0) / nonZeroCells.length)
                : 0;

              return (
                <tr key={i} className="border-b border-line-soft last:border-b-0">
                  <td className="px-4 py-3 font-semibold text-navy text-[13px]">
                    {rowHeaders[i]}
                  </td>
                  {row.map((cell, j) => (
                    <td key={j} className="px-2 py-2 text-center">
                      <div className={cn(
                        'rounded-lg px-2 py-2 mx-auto font-mono text-[13px] font-bold transition-all',
                        getColor(cell.value)
                      )}>
                        {formatValue(cell.value)}
                        {cell.sublabel && (
                          <div className="text-[9px] font-normal opacity-70 mt-0.5">{cell.sublabel}</div>
                        )}
                      </div>
                    </td>
                  ))}
                  <td className="px-2 py-2 text-center">
                    <div className={cn(
                      'rounded-lg px-2 py-2 mx-auto font-mono text-[13px] font-bold',
                      getColor(avg)
                    )}>
                      {formatValue(avg)}
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
