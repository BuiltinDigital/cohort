// Margins — team, client and brand-level margin analysis

export interface TeamMargin {
  manager: string;
  revenue: number;
  costOfDelivery: number;
  commission: number;
  grossMargin: number;
  grossMarginPercent: number;
}

export interface ClientMargin {
  client: string;
  revenue: number;
  costOfDelivery: number;
  commission: number;
  grossMargin: number;
  grossMarginPercent: number;
  trend: 'improving' | 'stable' | 'declining';
}

export interface BrandMargin {
  brand: string;
  adRevenue: number;
  editorialCost: number;
  contribution: number;
  contributionPercent: number;
}

export const teamMargins: TeamMargin[] = [
  {
    manager: 'Rachel',
    revenue: 4_800_000,
    costOfDelivery: 1_440_000,
    commission: 1_344_000,
    grossMargin: 2_016_000,
    grossMarginPercent: 42.0,
  },
  {
    manager: 'Gary',
    revenue: 5_200_000,
    costOfDelivery: 1_404_000,
    commission: 1_820_000,
    grossMargin: 1_976_000,
    grossMarginPercent: 38.0,
    // Note: commission-heavy — Gary's team relies on high-commission agency deals
  },
  {
    manager: 'Elise',
    revenue: 3_100_000,
    costOfDelivery: 806_000,
    commission: 868_000,
    grossMargin: 1_426_000,
    grossMarginPercent: 46.0,
    // Lower volume but most efficient team — strong direct-client mix
  },
];

export const teamMarginSummary = {
  totalRevenue: 13_100_000,
  totalCostOfDelivery: 3_650_000,
  totalCommission: 4_032_000,
  totalGrossMargin: 5_418_000,
  blendedMarginPercent: 41.4,
};

export const clientMargins: ClientMargin[] = [
  {
    client: 'Samsung',
    revenue: 1_240_000,
    costOfDelivery: 446_000,
    commission: 397_000,
    grossMargin: 397_000,
    grossMarginPercent: 32.0,
    trend: 'declining',
    // Declining: increasing cost of delivery on bespoke content; renegotiate scope
  },
  {
    client: 'Virgin Atlantic',
    revenue: 680_000,
    costOfDelivery: 170_000,
    commission: 156_000,
    grossMargin: 354_000,
    grossMarginPercent: 52.0,
    trend: 'improving',
  },
  {
    client: 'Toyota',
    revenue: 920_000,
    costOfDelivery: 276_000,
    commission: 248_000,
    grossMargin: 396_000,
    grossMarginPercent: 43.0,
    trend: 'stable',
  },
  {
    client: 'Sky',
    revenue: 1_080_000,
    costOfDelivery: 324_000,
    commission: 302_000,
    grossMargin: 454_000,
    grossMarginPercent: 42.0,
    trend: 'stable',
  },
  {
    client: 'Waitrose',
    revenue: 860_000,
    costOfDelivery: 215_000,
    commission: 215_000,
    grossMargin: 430_000,
    grossMarginPercent: 50.0,
    trend: 'improving',
  },
  {
    client: 'John Lewis',
    revenue: 740_000,
    costOfDelivery: 222_000,
    commission: 185_000,
    grossMargin: 333_000,
    grossMarginPercent: 45.0,
    trend: 'stable',
  },
  {
    client: 'Audi',
    revenue: 580_000,
    costOfDelivery: 186_000,
    commission: 145_000,
    grossMargin: 249_000,
    grossMarginPercent: 43.0,
    trend: 'stable',
  },
  {
    client: 'L\'Oréal',
    revenue: 520_000,
    costOfDelivery: 172_000,
    commission: 140_000,
    grossMargin: 208_000,
    grossMarginPercent: 40.0,
    trend: 'improving',
  },
  {
    client: 'Pepsi',
    revenue: 460_000,
    costOfDelivery: 161_000,
    commission: 115_000,
    grossMargin: 184_000,
    grossMarginPercent: 40.0,
    trend: 'stable',
  },
  {
    client: 'Boots',
    revenue: 380_000,
    costOfDelivery: 125_000,
    commission: 121_000,
    grossMargin: 134_000,
    grossMarginPercent: 35.3,
    trend: 'declining',
  },
];

export const brandMargins: BrandMargin[] = [
  {
    brand: 'BBC Good Food',
    adRevenue: 4_200_000,
    editorialCost: 1_764_000,
    contribution: 2_436_000,
    contributionPercent: 58.0,
  },
  {
    brand: 'Radio Times',
    adRevenue: 3_600_000,
    editorialCost: 2_016_000,
    contribution: 1_584_000,
    contributionPercent: 44.0,
  },
  {
    brand: 'Gardeners\' World',
    adRevenue: 1_800_000,
    editorialCost: 864_000,
    contribution: 936_000,
    contributionPercent: 52.0,
  },
  {
    brand: 'Top Gear',
    adRevenue: 2_400_000,
    editorialCost: 1_728_000,
    contribution: 672_000,
    contributionPercent: 28.0,
    // Low margin — high editorial/production costs for automotive content
  },
  {
    brand: 'Olive',
    adRevenue: 1_200_000,
    editorialCost: 624_000,
    contribution: 576_000,
    contributionPercent: 48.0,
  },
  {
    brand: 'Countryfile',
    adRevenue: 1_400_000,
    editorialCost: 644_000,
    contribution: 756_000,
    contributionPercent: 54.0,
  },
];
