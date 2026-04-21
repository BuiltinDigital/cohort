// ─── My Opportunities ────────────────────────────────────────────────────────
// Cohort — Immediate Media Sales OS
// Market opportunities relevant to Alicia's patch

export interface Opportunity {
  id: string;
  advertiser: string;
  category: string;
  agency: string;
  ukSpendQ2: number;
  audienceFit: number;
  priority: 'hot' | 'warm' | 'cold';
  estimatedValue: number;
  recommendedAction: string;
}

export const myOpportunities: Opportunity[] = [
  {
    id: 'opp-001',
    advertiser: 'Tesla',
    category: 'Automotive',
    agency: 'Starcom',
    ukSpendQ2: 4_200_000,
    audienceFit: 82,
    priority: 'hot',
    estimatedValue: 280_000,
    recommendedAction: 'Pitch Top Gear EV content partnership',
  },
  {
    id: 'opp-002',
    advertiser: 'LG Electronics',
    category: 'Electronics',
    agency: 'Zenith',
    ukSpendQ2: 2_800_000,
    audienceFit: 76,
    priority: 'hot',
    estimatedValue: 195_000,
    recommendedAction: 'Present BBC Science Focus native series',
  },
  {
    id: 'opp-003',
    advertiser: 'Aldi',
    category: 'Retail / Food',
    agency: 'Zenith',
    ukSpendQ2: 6_500_000,
    audienceFit: 88,
    priority: 'warm',
    estimatedValue: 340_000,
    recommendedAction: 'Propose BBC Good Food seasonal content hub',
  },
  {
    id: 'opp-004',
    advertiser: 'Volvo',
    category: 'Automotive',
    agency: 'Spark Foundry',
    ukSpendQ2: 3_100_000,
    audienceFit: 79,
    priority: 'warm',
    estimatedValue: 220_000,
    recommendedAction: 'Share Top Gear audience data pack',
  },
  {
    id: 'opp-005',
    advertiser: 'Unilever (Hellmanns)',
    category: 'FMCG',
    agency: 'Starcom',
    ukSpendQ2: 5_800_000,
    audienceFit: 91,
    priority: 'hot',
    estimatedValue: 310_000,
    recommendedAction: 'Pitch BBC Good Food recipe integration',
  },
  {
    id: 'opp-006',
    advertiser: 'Swatch Group',
    category: 'Luxury Goods',
    agency: 'Zenith',
    ukSpendQ2: 1_400_000,
    audienceFit: 64,
    priority: 'cold',
    estimatedValue: 120_000,
    recommendedAction: 'Explore Radio Times premium display',
  },
  {
    id: 'opp-007',
    advertiser: 'British Airways',
    category: 'Travel',
    agency: 'Spark Foundry',
    ukSpendQ2: 7_200_000,
    audienceFit: 85,
    priority: 'hot',
    estimatedValue: 380_000,
    recommendedAction: 'Proposal for Radio Times travel content hub',
  },
  {
    id: 'opp-008',
    advertiser: 'Lidl',
    category: 'Retail / Food',
    agency: 'Starcom',
    ukSpendQ2: 4_800_000,
    audienceFit: 83,
    priority: 'warm',
    estimatedValue: 260_000,
    recommendedAction: 'BBC Good Food budget meal partnership pitch',
  },
  {
    id: 'opp-009',
    advertiser: 'Sonos',
    category: 'Electronics',
    agency: 'Digitas',
    ukSpendQ2: 1_100_000,
    audienceFit: 72,
    priority: 'cold',
    estimatedValue: 95_000,
    recommendedAction: 'Content partnership proposal for Radio Times',
  },
  {
    id: 'opp-010',
    advertiser: 'TUI',
    category: 'Travel',
    agency: 'Starcom',
    ukSpendQ2: 5_500_000,
    audienceFit: 87,
    priority: 'warm',
    estimatedValue: 290_000,
    recommendedAction: 'Radio Times summer travel guide sponsorship',
  },
];
