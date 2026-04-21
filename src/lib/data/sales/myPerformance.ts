// ─── My Performance ──────────────────────────────────────────────────────────
// Cohort — Immediate Media Sales OS
// Alicia's individual sales rep dashboard KPIs

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface SalesRepKPIs {
  name: string;
  deliveredQ2: number;
  targetQ2: number;
  percentOfTarget: number;
  deliveryScore: number;
  deliveryScoreDelta: number;
  pipelineWeighted: number;
  commissionEarned: number;
  commissionTarget: number;
  activeCampaigns: number;
  atRiskCampaigns: number;
  dealsInPipeline: number;
  meetingsThisWeek: number;
  proposalsSent: number;
}

export interface WeeklyActivity {
  week: string;
  meetings: number;
  proposals: number;
  deals: number;
  revenue: number;
}

export interface CommissionBreakdown {
  base: number;
  multiplier: number;
  currentEarnings: number;
  projectedQ2: number;
  tier: string;
  tierRate: number;
  nextTierAt: number;
  nextTierRate: number;
}

// ─── KPIs ────────────────────────────────────────────────────────────────────

export const myKPIs: SalesRepKPIs = {
  name: 'Alicia',
  deliveredQ2: 1_800_000,
  targetQ2: 2_200_000,
  percentOfTarget: 82,
  deliveryScore: 89,
  deliveryScoreDelta: 3,
  pipelineWeighted: 1_400_000,
  commissionEarned: 82_000,
  commissionTarget: 95_000,
  activeCampaigns: 10,
  atRiskCampaigns: 1,
  dealsInPipeline: 14,
  meetingsThisWeek: 6,
  proposalsSent: 3,
};

// ─── Weekly Activity (last 8 weeks) ─────────────────────────────────────────

export const weeklyActivity: WeeklyActivity[] = [
  { week: 'W8 (17 Feb)',  meetings: 4, proposals: 1, deals: 0, revenue: 0 },
  { week: 'W9 (24 Feb)',  meetings: 5, proposals: 2, deals: 1, revenue: 85_000 },
  { week: 'W10 (3 Mar)',  meetings: 7, proposals: 1, deals: 0, revenue: 0 },
  { week: 'W11 (10 Mar)', meetings: 3, proposals: 2, deals: 2, revenue: 200_000 },
  { week: 'W12 (17 Mar)', meetings: 6, proposals: 3, deals: 1, revenue: 95_000 },
  { week: 'W13 (24 Mar)', meetings: 5, proposals: 1, deals: 1, revenue: 140_000 },
  { week: 'W14 (31 Mar)', meetings: 8, proposals: 2, deals: 2, revenue: 190_000 },
  { week: 'W15 (7 Apr)',  meetings: 6, proposals: 3, deals: 1, revenue: 115_000 },
];

// ─── Commission Breakdown ───────────────────────────────────────────────────

export const commissionBreakdown: CommissionBreakdown = {
  base: 68_000,
  multiplier: 1.2,
  currentEarnings: 82_000,
  projectedQ2: 98_000,
  tier: 'Accelerator',
  tierRate: 4,
  nextTierAt: 2_200_000,
  nextTierRate: 5.5,
};
