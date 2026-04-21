export interface VelocityByStage {
  stage: string;
  currentAvgDays: number;
  lastYearAvgDays: number;
  delta: number;
  dealsInStage: number;
}

export interface VelocityTrend {
  quarter: string;
  avgCycleDays: number;
}

export const velocityByStage: VelocityByStage[] = [
  { stage: 'Prospecting', currentAvgDays: 18, lastYearAvgDays: 22, delta: -4, dealsInStage: 14 },
  { stage: 'Proposal', currentAvgDays: 14, lastYearAvgDays: 16, delta: -2, dealsInStage: 11 },
  { stage: 'Negotiation', currentAvgDays: 11, lastYearAvgDays: 14, delta: -3, dealsInStage: 9 },
  { stage: 'Verbal Yes', currentAvgDays: 7, lastYearAvgDays: 8, delta: -1, dealsInStage: 8 },
];

/** Overall average sales cycle: 42 days current vs 52 days last year */
export const overallCycle = {
  currentDays: 42,
  lastYearDays: 52,
  delta: -10,
};

export const velocityTrend: VelocityTrend[] = [
  { quarter: 'Q1 2025', avgCycleDays: 51 },
  { quarter: 'Q2 2025', avgCycleDays: 49 },
  { quarter: 'Q3 2025', avgCycleDays: 47 },
  { quarter: 'Q4 2025', avgCycleDays: 45 },
  { quarter: 'Q1 2026', avgCycleDays: 44 },
  { quarter: 'Q2 2026', avgCycleDays: 42 },
];
