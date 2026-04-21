export interface WinLossRecord {
  quarter: string;
  won: number;
  lost: number;
  winRate: number;
}

export interface LossReason {
  reason: string;
  count: number;
  percentOfLosses: number;
  trend: 'up' | 'flat' | 'down';
  trendDelta: number;
}

export interface WinReason {
  reason: string;
  count: number;
  percentOfWins: number;
}

export const winLossHistory: WinLossRecord[] = [
  { quarter: 'Q1 2025', won: 28, lost: 14, winRate: 67 },
  { quarter: 'Q2 2025', won: 32, lost: 16, winRate: 67 },
  { quarter: 'Q3 2025', won: 30, lost: 18, winRate: 63 },
  { quarter: 'Q4 2025', won: 34, lost: 15, winRate: 69 },
  { quarter: 'Q1 2026', won: 31, lost: 17, winRate: 65 },
  { quarter: 'Q2 2026', won: 26, lost: 12, winRate: 68 },
];

export const lossReasons: LossReason[] = [
  { reason: 'Price', count: 14, percentOfLosses: 28, trend: 'up', trendDelta: 6 },
  { reason: 'Audience Fit', count: 11, percentOfLosses: 22, trend: 'up', trendDelta: 4 },
  { reason: 'Delivery Concerns', count: 9, percentOfLosses: 18, trend: 'down', trendDelta: -3 },
  { reason: 'Budget Cut', count: 8, percentOfLosses: 16, trend: 'flat', trendDelta: 0 },
  { reason: 'Competitor Won', count: 6, percentOfLosses: 12, trend: 'up', trendDelta: 2 },
  { reason: 'Other', count: 2, percentOfLosses: 4, trend: 'flat', trendDelta: 0 },
];

export const winReasons: WinReason[] = [
  { reason: 'Audience Quality', count: 34, percentOfWins: 34 },
  { reason: 'Brand Trust', count: 24, percentOfWins: 24 },
  { reason: 'Pricing', count: 18, percentOfWins: 18 },
  { reason: 'Content Partnership', count: 14, percentOfWins: 14 },
  { reason: 'Speed / Service', count: 10, percentOfWins: 10 },
];
