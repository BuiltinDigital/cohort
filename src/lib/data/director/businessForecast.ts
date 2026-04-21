export interface QuarterForecast {
  quarter: string;
  worstCase: number;
  mostLikely: number;
  bestCase: number;
  actual?: number;
  isCurrentQuarter?: boolean;
}

export interface ForecastSummary {
  fullYearWorst: number;
  fullYearMostLikely: number;
  fullYearBest: number;
  confidence: number;
  lastUpdated: string;
}

export const quarterForecasts: QuarterForecast[] = [
  {
    quarter: 'Q1 2026',
    worstCase: 3_800_000,
    mostLikely: 3_800_000,
    bestCase: 3_800_000,
    actual: 3_800_000,
  },
  {
    quarter: 'Q2 2026',
    worstCase: 4_400_000,
    mostLikely: 4_800_000,
    bestCase: 5_200_000,
    actual: 4_600_000,
    isCurrentQuarter: true,
  },
  {
    quarter: 'Q3 2026',
    worstCase: 4_200_000,
    mostLikely: 4_800_000,
    bestCase: 5_400_000,
  },
  {
    quarter: 'Q4 2026',
    worstCase: 5_000_000,
    mostLikely: 5_600_000,
    bestCase: 6_200_000,
  },
];

export const forecastSummary: ForecastSummary = {
  fullYearWorst: 17_400_000,
  fullYearMostLikely: 19_000_000,
  fullYearBest: 20_600_000,
  confidence: 78,
  lastUpdated: '2026-04-17',
};

export interface ForecastAccuracyRecord {
  quarter: string;
  forecast: number;
  actual: number;
  variancePercent: number;
}

export const forecastAccuracyHistory: ForecastAccuracyRecord[] = [
  { quarter: 'Q1 2024', forecast: 3_200_000, actual: 3_050_000, variancePercent: -4.7 },
  { quarter: 'Q2 2024', forecast: 3_600_000, actual: 3_720_000, variancePercent: 3.3 },
  { quarter: 'Q3 2024', forecast: 3_900_000, actual: 3_810_000, variancePercent: -2.3 },
  { quarter: 'Q4 2024', forecast: 4_400_000, actual: 4_580_000, variancePercent: 4.1 },
  { quarter: 'Q1 2025', forecast: 3_500_000, actual: 3_420_000, variancePercent: -2.3 },
  { quarter: 'Q2 2025', forecast: 4_100_000, actual: 4_260_000, variancePercent: 3.9 },
  { quarter: 'Q3 2025', forecast: 4_300_000, actual: 4_150_000, variancePercent: -3.5 },
  { quarter: 'Q4 2025', forecast: 4_800_000, actual: 4_920_000, variancePercent: 2.5 },
];

export interface ConcentrationDeal {
  name: string;
  advertiser: string;
  value: number;
  probability: number;
  closeDate: string;
}

export interface ConcentrationScenarioImpact {
  ifAllSlip: number;
  ifTwoSlip: number;
  quarterTarget: number;
}

export const concentrationRisk = {
  topDeals: [
    {
      name: 'BMW Q3 Brand Partnership',
      advertiser: 'BMW',
      value: 620_000,
      probability: 70,
      closeDate: '2026-05-18',
    },
    {
      name: 'Unilever Summer Always-On',
      advertiser: 'Unilever',
      value: 540_000,
      probability: 65,
      closeDate: '2026-05-04',
    },
    {
      name: 'Samsung Galaxy Launch',
      advertiser: 'Samsung',
      value: 480_000,
      probability: 60,
      closeDate: '2026-05-22',
    },
    {
      name: "L'Oréal Beauty Week Takeover",
      advertiser: "L'Oréal",
      value: 420_000,
      probability: 55,
      closeDate: '2026-06-01',
    },
    {
      name: 'Tesco Seasonal Multi-Title',
      advertiser: 'Tesco',
      value: 340_000,
      probability: 50,
      closeDate: '2026-06-10',
    },
  ] as ConcentrationDeal[],
  scenarioImpact: {
    ifAllSlip: -2_400_000,
    ifTwoSlip: -1_160_000,
    quarterTarget: 6_700_000,
  } as ConcentrationScenarioImpact,
};
