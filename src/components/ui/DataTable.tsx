'use client';

import { cn } from '@/lib/utils';

interface Column<T> {
  key: string;
  header: string;
  render: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onRowClick?: (item: T) => void;
  className?: string;
}

export function DataTable<T>({ columns, data, onRowClick, className }: DataTableProps<T>) {
  return (
    <div className={cn('bg-paper border border-line rounded-xl overflow-hidden', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse text-[13px]">
          <thead>
            <tr>
              {columns.map(col => (
                <th
                  key={col.key}
                  className="text-left px-5 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line"
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr
                key={i}
                onClick={() => onRowClick?.(item)}
                className={cn(
                  'border-b border-line-soft last:border-b-0 transition-colors',
                  onRowClick && 'cursor-pointer hover:bg-sky-ghost'
                )}
              >
                {columns.map(col => (
                  <td key={col.key} className={cn('px-5 py-[14px] align-middle', col.className)}>
                    {col.render(item)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function BrandCell({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-display font-bold text-[15px] text-navy">
      {children}
    </span>
  );
}

export function MonoCell({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('font-mono text-[12px] text-ink', className)}>
      {children}
    </span>
  );
}
