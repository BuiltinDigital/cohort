'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { DataTable, BrandCell, MonoCell } from '@/components/ui/DataTable';
import {
  compBenchmarks,
  individualComp,
  type CompBenchmark as CompBenchmarkType,
  type IndividualComp,
} from '@/lib/data/director/compBenchmark';
import { cn } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Compensation Benchmarking  --  Director Dashboard                  */
/* ------------------------------------------------------------------ */

const belowCount = individualComp.filter((p) => p.isBelow).length;
const totalCount = individualComp.length;

function fmtK(v: number): string {
  return `£${(v / 1000).toFixed(0)}k`;
}

export function CompBenchmark({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  return (
    <div className="animate-fade-up">
      {/* ── WARNING CALLOUT ──────────────────────────────────── */}
      <div className="bg-warn/10 border border-warn/25 rounded-xl p-4 mb-6 flex items-start gap-3">
        <span className="w-5 h-5 rounded-full bg-warn flex items-center justify-center text-paper text-[11px] font-bold shrink-0 mt-0.5">
          !
        </span>
        <div>
          <div className="font-display font-[800] text-[15px] text-navy mb-0.5">
            {belowCount} of {totalCount} salespeople are below market median compensation
          </div>
          <div className="text-[12px] text-muted leading-relaxed">
            This creates retention risk, particularly for high performers. Review individual
            comp against market benchmarks below.
          </div>
        </div>
      </div>

      {/* ── ROLE-LEVEL BENCHMARKING TABLE ────────────────────── */}
      <SectionHeading title="Role-Level Benchmarking" count={compBenchmarks.length} />

      <DataTable<CompBenchmarkType>
        className="mb-6"
        data={compBenchmarks}
        columns={[
          {
            key: 'role',
            header: 'Role',
            render: (r) => <BrandCell>{r.role}</BrandCell>,
          },
          {
            key: 'level',
            header: 'Level',
            render: (r) => (
              <span className="text-[12px] text-muted font-medium">{r.level}</span>
            ),
          },
          {
            key: 'internalAvg',
            header: 'Internal Avg',
            render: (r) => <MonoCell className="font-semibold">{fmtK(r.internalAvg)}</MonoCell>,
          },
          {
            key: 'marketMedian',
            header: 'Market Median',
            render: (r) => <MonoCell>{fmtK(r.marketMedian)}</MonoCell>,
          },
          {
            key: 'marketP75',
            header: 'Market P75',
            render: (r) => <MonoCell>{fmtK(r.marketP75)}</MonoCell>,
          },
          {
            key: 'variance',
            header: 'Variance',
            render: (r) => (
              <MonoCell
                className={cn(
                  'font-semibold',
                  r.variance < 0 ? 'text-risk' : 'text-good',
                )}
              >
                {r.variance > 0 ? '+' : ''}
                {r.variance.toFixed(1)}%
              </MonoCell>
            ),
          },
          {
            key: 'headcount',
            header: 'HC',
            render: (r) => <MonoCell>{r.headcount}</MonoCell>,
          },
        ]}
      />

      {/* ── INDIVIDUAL COMP TABLE ────────────────────────────── */}
      <SectionHeading title="Individual Compensation" count={individualComp.length} />

      <DataTable<IndividualComp>
        className="mb-6"
        data={individualComp}
        columns={[
          {
            key: 'name',
            header: 'Name',
            render: (p) => (
              <div className="flex items-center gap-2">
                <BrandCell>{p.name}</BrandCell>
                {p.isBelow && (
                  <span className="text-[9px] font-bold uppercase tracking-[0.08em] bg-risk/15 text-risk px-1.5 py-0.5 rounded">
                    Below Median
                  </span>
                )}
              </div>
            ),
          },
          {
            key: 'role',
            header: 'Role',
            render: (p) => (
              <span className="text-[12px] text-muted font-medium">{p.role}</span>
            ),
          },
          {
            key: 'manager',
            header: 'Manager',
            render: (p) => (
              <span className="text-[12px] text-ink font-medium">{p.manager}</span>
            ),
          },
          {
            key: 'baseSalary',
            header: 'Base',
            render: (p) => <MonoCell className="font-semibold">{fmtK(p.baseSalary)}</MonoCell>,
          },
          {
            key: 'ote',
            header: 'OTE',
            render: (p) => <MonoCell className="font-semibold">{fmtK(p.ote)}</MonoCell>,
          },
          {
            key: 'marketMedian',
            header: 'Market Median',
            render: (p) => <MonoCell>{fmtK(p.marketMedian)}</MonoCell>,
          },
          {
            key: 'variance',
            header: 'Variance',
            render: (p) => (
              <MonoCell
                className={cn(
                  'font-semibold',
                  p.variancePercent < 0 ? 'text-risk' : 'text-good',
                )}
              >
                {p.variancePercent > 0 ? '+' : ''}
                {p.variancePercent.toFixed(1)}%
              </MonoCell>
            ),
          },
        ]}
      />
    </div>
  );
}
