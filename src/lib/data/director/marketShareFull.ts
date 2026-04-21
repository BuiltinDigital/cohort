// Market Share (Extended) — format, category and agency-group breakdowns
// Extends the base market data from lib/data/marketData.ts

export interface MarketShareByFormat {
  publisher: string;
  print: number;
  digital: number;
  total: number;
  color: string;
}

export interface CategoryShare {
  category: string;
  immediateShare: number;
  marketSize: number;
  topCompetitor: string;
  topCompetitorShare: number;
  growthRate: number;
  immediateGrowthRate: number;
}

export interface AgencyGroupShare {
  group: string;
  totalUKSpend: number;
  immediateSpend: number;
  sharePercent: number;
  yoyDelta: number;
  teams: string[];
}

export const marketShareByFormat: MarketShareByFormat[] = [
  { publisher: 'Immediate', print: 24, digital: 14, total: 18, color: '#6366f1' },
  { publisher: 'Hearst', print: 20, digital: 23, total: 22, color: '#ec4899' },
  { publisher: 'Future', print: 12, digital: 19, total: 16, color: '#f97316' },
  { publisher: 'Condé Nast', print: 16, digital: 13, total: 14, color: '#14b8a6' },
  { publisher: 'News UK', print: 10, digital: 14, total: 12, color: '#eab308' },
  { publisher: 'Others', print: 18, digital: 17, total: 18, color: '#94a3b8' },
];

export const categoryShares: CategoryShare[] = [
  {
    category: 'Food & Drink',
    immediateShare: 24,
    marketSize: 48_000_000,
    topCompetitor: 'Hearst',
    topCompetitorShare: 20,
    growthRate: 6.2,
    immediateGrowthRate: 8.4,
  },
  {
    category: 'Automotive',
    immediateShare: 16,
    marketSize: 62_000_000,
    topCompetitor: 'Future',
    topCompetitorShare: 22,
    growthRate: -1.4,
    immediateGrowthRate: 2.1,
  },
  {
    category: 'Home & Garden',
    immediateShare: 28,
    marketSize: 18_000_000,
    topCompetitor: 'Hearst',
    topCompetitorShare: 18,
    growthRate: 4.8,
    immediateGrowthRate: 7.2,
  },
  {
    category: 'Entertainment',
    immediateShare: 22,
    marketSize: 34_000_000,
    topCompetitor: 'News UK',
    topCompetitorShare: 18,
    growthRate: 3.1,
    immediateGrowthRate: 4.6,
  },
  {
    category: 'Travel',
    immediateShare: 12,
    marketSize: 28_000_000,
    topCompetitor: 'Condé Nast',
    topCompetitorShare: 26,
    growthRate: 8.4,
    immediateGrowthRate: 6.0,
  },
  {
    category: 'Retail',
    immediateShare: 8,
    marketSize: 72_000_000,
    topCompetitor: 'News UK',
    topCompetitorShare: 16,
    growthRate: 2.2,
    immediateGrowthRate: 3.8,
  },
  {
    category: 'Beauty',
    immediateShare: 6,
    marketSize: 42_000_000,
    topCompetitor: 'Condé Nast',
    topCompetitorShare: 28,
    growthRate: 5.6,
    immediateGrowthRate: 4.2,
  },
];

export const agencyGroupShares: AgencyGroupShare[] = [
  {
    group: 'Publicis',
    totalUKSpend: 47_000_000,
    immediateSpend: 4_200_000,
    sharePercent: 8.9,
    yoyDelta: 1.2,
    teams: ['Rachel', 'Gary'],
  },
  {
    group: 'Omnicom',
    totalUKSpend: 52_000_000,
    immediateSpend: 3_800_000,
    sharePercent: 7.3,
    yoyDelta: 0.8,
    teams: ['Gary', 'Elise'],
  },
  {
    group: 'WPP',
    totalUKSpend: 68_000_000,
    immediateSpend: 4_900_000,
    sharePercent: 7.2,
    yoyDelta: -0.4,
    teams: ['Rachel', 'Gary', 'Elise'],
  },
  {
    group: 'Dentsu',
    totalUKSpend: 38_000_000,
    immediateSpend: 2_100_000,
    sharePercent: 5.5,
    yoyDelta: 0.3,
    teams: ['Rachel'],
  },
  {
    group: 'Havas',
    totalUKSpend: 24_000_000,
    immediateSpend: 1_800_000,
    sharePercent: 7.5,
    yoyDelta: 1.6,
    teams: ['Elise'],
  },
  {
    group: 'IPG',
    totalUKSpend: 31_000_000,
    immediateSpend: 1_600_000,
    sharePercent: 5.2,
    yoyDelta: -0.2,
    teams: ['Gary'],
  },
];

export const marketShareSummary = {
  totalAddressableMarket: 304_000_000,
  immediateRevenue: 14_200_000,
  overallShare: 4.7,
  yoyShareChange: 0.6,
  strongestCategory: 'Home & Garden',
  weakestCategory: 'Beauty',
  biggestOpportunity: 'Retail', // largest market with lowest Immediate share
};
