export interface ConcentrationDeal {
  name: string;
  advertiser: string;
  agency: string;
  owner: string;
  value: number;
  probability: number;
  closeDate: string;
}

export interface ConcentrationScenario {
  label: string;
  impact: number;
  newForecast: number;
  percentOfTarget: number;
  riskLevel: 'ok' | 'warn' | 'critical';
}

export const topDeals: ConcentrationDeal[] = [
  {
    name: 'BMW Q3 Brand Partnership',
    advertiser: 'BMW',
    agency: 'Mindshare (WPP)',
    owner: 'Gary',
    value: 620_000,
    probability: 70,
    closeDate: '2026-05-18',
  },
  {
    name: 'Unilever Summer Always-On',
    advertiser: 'Unilever',
    agency: 'PHD (Omnicom)',
    owner: 'Rachel',
    value: 540_000,
    probability: 65,
    closeDate: '2026-05-04',
  },
  {
    name: 'Samsung Galaxy Launch',
    advertiser: 'Samsung',
    agency: 'Starcom (Publicis)',
    owner: 'Rachel',
    value: 480_000,
    probability: 60,
    closeDate: '2026-05-22',
  },
  {
    name: "L'Oréal Beauty Week Takeover",
    advertiser: "L'Oréal",
    agency: 'Havas Media',
    owner: 'Elise',
    value: 420_000,
    probability: 55,
    closeDate: '2026-06-01',
  },
  {
    name: 'Tesco Seasonal Multi-Title',
    advertiser: 'Tesco',
    agency: 'MediaCom (WPP)',
    owner: 'Gary',
    value: 340_000,
    probability: 50,
    closeDate: '2026-06-10',
  },
];

export const concentrationScenarios: ConcentrationScenario[] = [
  {
    label: 'All 5 land',
    impact: 2_400_000,
    newForecast: 9_100_000,
    percentOfTarget: 136,
    riskLevel: 'ok',
  },
  {
    label: 'Top 3 slip by 1 quarter',
    impact: -1_600_000,
    newForecast: 5_963_000,
    percentOfTarget: 89,
    riskLevel: 'warn',
  },
  {
    label: 'Top 5 all slip',
    impact: -2_400_000,
    newForecast: 5_494_000,
    percentOfTarget: 82,
    riskLevel: 'critical',
  },
];

/** Weighted pipeline total from top 5 deals */
export const topDealWeightedTotal = topDeals.reduce(
  (sum, d) => sum + d.value * (d.probability / 100),
  0,
);

/** Concentration ratio: top-5 deals as % of total weighted pipeline */
export const concentrationRatio = 29.6; // top-5 weighted value / total £8.1m pipeline
