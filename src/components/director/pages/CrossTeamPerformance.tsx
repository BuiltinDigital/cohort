'use client';

import { SectionHeading } from '@/components/ui/SectionHeading';
import { HeatmapTable } from '@/components/ui/HeatmapTable';
import { MiniBarChart } from '@/components/ui/MiniBarChart';
import { MetricCard } from '@/components/ui/MetricCard';
import { heatmapData, heatmapEntities } from '@/lib/data/director/deliveryHeatmap';
import { directorTeams, salesTotal } from '@/lib/data/director/teams';
import { cn, formatCurrency } from '@/lib/utils';

/* ------------------------------------------------------------------ */
/*  Cross-Team Performance  --  Director Dashboard                     */
/* ------------------------------------------------------------------ */

/* Leaderboard metric helpers */
function overallScore(tm: (typeof directorTeams)[number]) {
  const revenueNorm = Math.min((tm.deliveredQ / 2_600_000) * 100, 100); // scaled to highest
  const deliveryAcc = tm.deliveryScore;
  const commEfficiency = Math.max(100 - (tm.commissionPool / tm.deliveredQ) * 100 * 10, 0); // inverse: lower commission% = better
  const pipelineNorm = Math.min((tm.pipelineWeighted / 3_400_000) * 100, 100);
  return Math.round(
    (revenueNorm * 0.3 + deliveryAcc * 0.3 + commEfficiency * 0.2 + pipelineNorm * 0.2),
  );
}

/* Highest values for bar scaling */
const maxRevenue = Math.max(...directorTeams.map((t) => t.deliveredQ));
const maxPipeline = Math.max(...directorTeams.map((t) => t.pipelineWeighted));

/* Total active and at-risk campaigns from teams */
const totalAtRisk = directorTeams.reduce((s, t) => s + t.atRiskCampaigns, 0);

export function CrossTeamPerformance({
  onNavigate,
}: {
  onNavigate: (page: string, detail?: string) => void;
}) {
  /* ── Build heatmap props ───────────────────────────────── */
  const rowHeaders = heatmapData.map((r) => r.manager);
  const colHeaders = [...heatmapEntities];

  const heatCells = heatmapData.map((row) =>
    row.cells.map((cell) => ({
      value: cell.score,
      sublabel: cell.campaigns > 0 ? `${cell.campaigns} camps` : undefined,
    })),
  );

  /* ── Avg delivery score across teams ───────────────────── */
  const avgDelivery = Math.round(
    directorTeams.reduce((s, t) => s + t.deliveryScore, 0) / directorTeams.length,
  );

  return (
    <div className="animate-fade-up">
      {/* ── A) SUMMARY STATS ─────────────────────────────────── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        <MetricCard
          label="Total Revenue YTD"
          value={formatCurrency(salesTotal.ytdRevenue, true)}
          sub="Across all teams"
        />
        <MetricCard
          label="Avg Delivery Score"
          value={String(avgDelivery)}
          sub={
            avgDelivery >= 80 ? (
              <>Above 80 threshold</>
            ) : (
              <>Below 80 threshold</>
            )
          }
          subColor={avgDelivery >= 80 ? 'good' : 'warn'}
        />
        <MetricCard
          label="Active Campaigns"
          value={String(
            heatmapData.reduce(
              (s, r) => s + r.cells.reduce((cs, c) => cs + c.campaigns, 0),
              0,
            ),
          )}
          sub="All agency groups"
        />
        <MetricCard
          label="At-Risk Campaigns"
          value={String(totalAtRisk)}
          sub={
            totalAtRisk > 3 ? (
              <>Needs attention</>
            ) : (
              <>Within tolerance</>
            )
          }
          subColor={totalAtRisk > 3 ? 'risk' : 'good'}
        />
      </div>

      {/* ── B) DELIVERY HEATMAP ──────────────────────────────── */}
      <SectionHeading title="Delivery Score by Team \u00D7 Agency" />

      <HeatmapTable
        rowHeaders={rowHeaders}
        colHeaders={colHeaders}
        data={heatCells}
        className="mb-6"
      />

      {/* ── C) MANAGER LEADERBOARD ───────────────────────────── */}
      <SectionHeading title="Manager Leaderboard \u2014 Multi-Metric" count={directorTeams.length} />

      <div className="bg-paper border border-line rounded-xl overflow-hidden">
        {/* Table header */}
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-[13px]">
            <thead>
              <tr>
                <th className="text-left px-4 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[180px]">
                  Manager
                </th>
                <th className="text-left px-3 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[150px]">
                  Revenue
                </th>
                <th className="text-left px-3 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[150px]">
                  Delivery Accuracy
                </th>
                <th className="text-left px-3 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[150px]">
                  Commission Eff.
                </th>
                <th className="text-left px-3 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[150px]">
                  Pipeline Health
                </th>
                <th className="text-center px-3 py-3 bg-off text-[10px] tracking-[0.12em] uppercase text-muted font-bold border-b border-line min-w-[100px]">
                  Overall
                </th>
              </tr>
            </thead>
            <tbody>
              {directorTeams.map((tm) => {
                const revPct = Math.round((tm.deliveredQ / maxRevenue) * 100);
                const commPct = Math.round(
                  (tm.commissionPool / tm.deliveredQ) * 100 * 10,
                ); // raw commission%*10 for display
                const commEff = Math.max(100 - commPct, 0); // efficiency: inverse
                const pipePct = Math.round(
                  (tm.pipelineWeighted / maxPipeline) * 100,
                );
                const overall = overallScore(tm);

                return (
                  <tr
                    key={tm.id}
                    className="border-b border-line-soft last:border-b-0 hover:bg-off/60 transition-colors cursor-pointer"
                    onClick={() => onNavigate('cross-team', tm.id)}
                  >
                    {/* Manager info */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-[34px] h-[34px] rounded-full flex items-center justify-center text-paper font-display font-[900] text-[14px] shrink-0"
                          style={{ backgroundColor: tm.avatarColor }}
                        >
                          {tm.managerInitial}
                        </div>
                        <div>
                          <div className="font-display font-[800] text-[15px] text-navy leading-none">
                            {tm.managerName}
                          </div>
                          <div className="text-[10px] text-muted mt-[2px]">
                            {tm.teamSize} people &middot; {tm.agencies}
                          </div>
                        </div>
                      </div>
                    </td>

                    {/* Revenue */}
                    <td className="px-3 py-4">
                      <div className="font-mono text-[12px] font-semibold text-ink mb-1">
                        {formatCurrency(tm.deliveredQ, true)}
                      </div>
                      <MiniBarChart
                        value={revPct}
                        color="#4AB4E8"
                        height={6}
                      />
                    </td>

                    {/* Delivery Accuracy */}
                    <td className="px-3 py-4">
                      <div
                        className={cn(
                          'font-mono text-[12px] font-semibold mb-1',
                          tm.deliveryScore >= 85
                            ? 'text-good'
                            : tm.deliveryScore >= 75
                              ? 'text-warn'
                              : 'text-risk',
                        )}
                      >
                        {tm.deliveryScore}%
                      </div>
                      <MiniBarChart
                        value={tm.deliveryScore}
                        color={
                          tm.deliveryScore >= 85
                            ? '#1DB77A'
                            : tm.deliveryScore >= 75
                              ? '#FF9D2E'
                              : '#E53E5C'
                        }
                        height={6}
                      />
                    </td>

                    {/* Commission Efficiency */}
                    <td className="px-3 py-4">
                      <div
                        className={cn(
                          'font-mono text-[12px] font-semibold mb-1',
                          commEff >= 90
                            ? 'text-good'
                            : commEff >= 80
                              ? 'text-warn'
                              : 'text-risk',
                        )}
                      >
                        {commEff}%
                        <span className="text-[10px] text-muted font-normal ml-1">
                          eff.
                        </span>
                      </div>
                      <MiniBarChart
                        value={commEff}
                        color={
                          commEff >= 90
                            ? '#1DB77A'
                            : commEff >= 80
                              ? '#FF9D2E'
                              : '#E53E5C'
                        }
                        height={6}
                      />
                    </td>

                    {/* Pipeline Health */}
                    <td className="px-3 py-4">
                      <div className="font-mono text-[12px] font-semibold text-ink mb-1">
                        {formatCurrency(tm.pipelineWeighted, true)}
                      </div>
                      <MiniBarChart
                        value={pipePct}
                        color="#4AB4E8"
                        height={6}
                      />
                    </td>

                    {/* Overall Score */}
                    <td className="px-3 py-4 text-center">
                      <div
                        className={cn(
                          'inline-flex items-center justify-center w-[48px] h-[48px] rounded-full font-display font-[900] text-[20px]',
                          overall >= 85
                            ? 'bg-good/15 text-good'
                            : overall >= 70
                              ? 'bg-warn/15 text-warn'
                              : 'bg-risk/15 text-risk',
                        )}
                      >
                        {overall}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
