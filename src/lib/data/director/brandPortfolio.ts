// Brand Portfolio — P&L, strategy status, and content-vs-commercial analysis

export interface BrandPnL {
  brand: string;
  adRevenue: number;
  subscriptionRevenue: number;
  totalRevenue: number;
  editorialCost: number;
  productionCost: number;
  totalCost: number;
  contributionMargin: number;
  contributionPercent: number;
  trend: 'growing' | 'stable' | 'declining';
}

export interface BrandStrategyStatus {
  brand: string;
  strategy: 'invest' | 'maintain' | 'harvest' | 'divest';
  rationale: string;
  keyMetric: string;
  keyMetricValue: string;
  readersTrend: number;
  revenueTrend: number;
}

export interface ContentVsCommercial {
  brand: string;
  editorialBudget: number;
  adRevenueGenerated: number;
  ratio: number; // revenue per £1 editorial spend
  isCarryingWeight: boolean;
}

// --- Brand P&L ---

export const brandPnLs: BrandPnL[] = [
  {
    brand: 'BBC Good Food',
    adRevenue: 4_200_000,
    subscriptionRevenue: 1_800_000,
    totalRevenue: 6_000_000,
    editorialCost: 1_400_000,
    productionCost: 364_000,
    totalCost: 1_764_000,
    contributionMargin: 4_236_000,
    contributionPercent: 70.6,
    trend: 'growing',
  },
  {
    brand: 'Radio Times',
    adRevenue: 3_600_000,
    subscriptionRevenue: 2_800_000,
    totalRevenue: 6_400_000,
    editorialCost: 1_680_000,
    productionCost: 336_000,
    totalCost: 2_016_000,
    contributionMargin: 4_384_000,
    contributionPercent: 68.5,
    trend: 'stable',
  },
  {
    brand: 'Gardeners\' World',
    adRevenue: 1_800_000,
    subscriptionRevenue: 1_200_000,
    totalRevenue: 3_000_000,
    editorialCost: 720_000,
    productionCost: 144_000,
    totalCost: 864_000,
    contributionMargin: 2_136_000,
    contributionPercent: 71.2,
    trend: 'growing',
  },
  {
    brand: 'Top Gear',
    adRevenue: 2_400_000,
    subscriptionRevenue: 1_100_000,
    totalRevenue: 3_500_000,
    editorialCost: 1_440_000,
    productionCost: 288_000,
    totalCost: 1_728_000,
    contributionMargin: 1_772_000,
    contributionPercent: 50.6,
    trend: 'declining',
  },
  {
    brand: 'Olive',
    adRevenue: 1_200_000,
    subscriptionRevenue: 680_000,
    totalRevenue: 1_880_000,
    editorialCost: 520_000,
    productionCost: 104_000,
    totalCost: 624_000,
    contributionMargin: 1_256_000,
    contributionPercent: 66.8,
    trend: 'stable',
  },
  {
    brand: 'Countryfile',
    adRevenue: 1_400_000,
    subscriptionRevenue: 920_000,
    totalRevenue: 2_320_000,
    editorialCost: 540_000,
    productionCost: 104_000,
    totalCost: 644_000,
    contributionMargin: 1_676_000,
    contributionPercent: 72.2,
    trend: 'stable',
  },
];

// --- Brand Strategy ---

export const brandStrategies: BrandStrategyStatus[] = [
  {
    brand: 'BBC Good Food',
    strategy: 'invest',
    rationale: 'Growing audience across web and app. Recipe engagement driving first-party data asset. Ad revenue growing at 8.4% YoY. Dominant in Food & Drink category (24% share).',
    keyMetric: 'Monthly active users',
    keyMetricValue: '24.2m (+12% YoY)',
    readersTrend: 12.0,
    revenueTrend: 8.4,
  },
  {
    brand: 'Radio Times',
    strategy: 'maintain',
    rationale: 'Stable, high-revenue brand with loyal older demographic. Strong subscription base. Print declining but digital compensating. Streaming ad spend growing into this audience.',
    keyMetric: 'Revenue per reader',
    keyMetricValue: '£0.82 (highest in portfolio)',
    readersTrend: -2.4,
    revenueTrend: 1.8,
  },
  {
    brand: 'Gardeners\' World',
    strategy: 'invest',
    rationale: 'Strong seasonal growth (March-June peaks). Garden & outdoor living is a growing category. Subscription growth outpacing portfolio average. Brand trust is exceptional.',
    keyMetric: 'Seasonal peak revenue',
    keyMetricValue: '£1.1m (Q2 peak, +14% YoY)',
    readersTrend: 8.6,
    revenueTrend: 7.2,
  },
  {
    brand: 'Top Gear',
    strategy: 'harvest',
    rationale: 'Print readership declining but strong brand recognition delivers revenue per reader of £0.55. Automotive ad market contracting. Digital pivot underway but costly. Extract value while managing cost base down.',
    keyMetric: 'Revenue per reader',
    keyMetricValue: '£0.55 (strong for declining audience)',
    readersTrend: -8.2,
    revenueTrend: -3.4,
  },
  {
    brand: 'Olive',
    strategy: 'maintain',
    rationale: 'Niche, loyal premium food audience. Small but highly engaged reader base. Ad revenue stable. Low cost base makes it efficient. Cross-sells well with BBC Good Food for premium food campaigns.',
    keyMetric: 'Engagement rate',
    keyMetricValue: '6.8% (highest in portfolio)',
    readersTrend: 0.4,
    revenueTrend: 1.2,
  },
  {
    brand: 'Countryfile',
    strategy: 'maintain',
    rationale: 'Steady performer in Home & Garden category. Complements Gardeners\' World for portfolio coverage. Strong in countryside/rural advertiser niche. Consistent contribution margin.',
    keyMetric: 'Contribution margin',
    keyMetricValue: '72.2% (highest margin in portfolio)',
    readersTrend: 1.8,
    revenueTrend: 2.4,
  },
];

// --- Content vs Commercial ---

export const contentVsCommercial: ContentVsCommercial[] = [
  {
    brand: 'BBC Good Food',
    editorialBudget: 1_400_000,
    adRevenueGenerated: 4_200_000,
    ratio: 3.0,
    isCarryingWeight: true,
    // £3.00 ad revenue per £1 editorial spend — strong commercial return
  },
  {
    brand: 'Radio Times',
    editorialBudget: 1_680_000,
    adRevenueGenerated: 3_600_000,
    ratio: 2.14,
    isCarryingWeight: true,
  },
  {
    brand: 'Gardeners\' World',
    editorialBudget: 720_000,
    adRevenueGenerated: 1_800_000,
    ratio: 2.5,
    isCarryingWeight: true,
  },
  {
    brand: 'Top Gear',
    editorialBudget: 1_440_000,
    adRevenueGenerated: 2_400_000,
    ratio: 1.67,
    isCarryingWeight: false,
    // Lowest ratio — high editorial cost relative to ad revenue generated
  },
  {
    brand: 'Olive',
    editorialBudget: 520_000,
    adRevenueGenerated: 1_200_000,
    ratio: 2.31,
    isCarryingWeight: true,
  },
  {
    brand: 'Countryfile',
    editorialBudget: 540_000,
    adRevenueGenerated: 1_400_000,
    ratio: 2.59,
    isCarryingWeight: true,
  },
];

export const portfolioSummary = {
  totalPortfolioRevenue: 23_100_000,
  totalAdRevenue: 14_600_000,
  totalSubscriptionRevenue: 8_500_000,
  totalCost: 7_640_000,
  totalContributionMargin: 15_460_000,
  blendedContributionPercent: 66.9,
  investBrands: ['BBC Good Food', 'Gardeners\' World'],
  maintainBrands: ['Radio Times', 'Olive', 'Countryfile'],
  harvestBrands: ['Top Gear'],
  divestBrands: [],
  highestMarginBrand: 'Countryfile',
  lowestMarginBrand: 'Top Gear',
  bestCommercialRatio: 'BBC Good Food',
  worstCommercialRatio: 'Top Gear',
};
