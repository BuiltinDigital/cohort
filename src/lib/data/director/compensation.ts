// Commission analysis by team and individual
// Director Dashboard — Cohort (Immediate Media Sales OS)

export interface TeamCommission {
  manager: string;
  teamRevenue: number;
  commissionPool: number;
  commissionPercent: number;
  target: number;
  variance: number;
  tier: 'Base' | 'Accelerator' | 'Super';
}

export interface IndividualCommission {
  name: string;
  manager: string;
  role: string;
  revenue: number;
  commission: number;
  commissionPercent: number;
  isOutlier: boolean;
  outlierReason?: string;
}

export interface CommissionTier {
  name: string;
  revenueRange: string;
  rate: number;
  currentTeams: string[];
}

export const commissionTiers: CommissionTier[] = [
  {
    name: 'Base',
    revenueRange: '£0–3m',
    rate: 0.03,
    currentTeams: ['Elise'],
  },
  {
    name: 'Accelerator',
    revenueRange: '£3–4m',
    rate: 0.04,
    currentTeams: ['Rachel'],
  },
  {
    name: 'Super',
    revenueRange: '£4m+',
    rate: 0.055,
    currentTeams: ['Gary'],
  },
];

export const teamCommissions: TeamCommission[] = [
  {
    manager: 'Rachel',
    teamRevenue: 3_680_000,
    commissionPool: 191_360,
    commissionPercent: 5.2,
    target: 5.0,
    variance: 0.2,
    tier: 'Accelerator',
  },
  {
    manager: 'Gary',
    teamRevenue: 4_520_000,
    commissionPool: 289_280,
    commissionPercent: 6.4,
    target: 5.0,
    variance: 1.4,
    tier: 'Super',
  },
  {
    manager: 'Elise',
    teamRevenue: 2_180_000,
    commissionPool: 104_640,
    commissionPercent: 4.8,
    target: 5.0,
    variance: -0.2,
    tier: 'Base',
  },
];

export const individualCommissions: IndividualCommission[] = [
  {
    name: 'Alicia',
    manager: 'Rachel',
    role: 'Senior Account Manager',
    revenue: 2_140_000,
    commission: 107_000,
    commissionPercent: 5.0,
    isOutlier: false,
  },
  {
    name: 'Renita',
    manager: 'Rachel',
    role: 'Account Manager',
    revenue: 1_540_000,
    commission: 84_360,
    commissionPercent: 5.5,
    isOutlier: false,
  },
  {
    name: 'Marcus',
    manager: 'Gary',
    role: 'Senior Account Manager',
    revenue: 2_380_000,
    commission: 171_360,
    commissionPercent: 7.2,
    isOutlier: true,
    outlierReason: 'Hitting Super tier individually — commission rate 7.2% vs team avg 6.4%',
  },
  {
    name: 'Sarah',
    manager: 'Gary',
    role: 'Account Manager',
    revenue: 1_260_000,
    commission: 63_000,
    commissionPercent: 5.0,
    isOutlier: false,
  },
  {
    name: 'Tom',
    manager: 'Gary',
    role: 'Account Manager',
    revenue: 880_000,
    commission: 54_920,
    commissionPercent: 6.2,
    isOutlier: false,
  },
  {
    name: 'Priya',
    manager: 'Elise',
    role: 'Senior Account Manager',
    revenue: 1_420_000,
    commission: 68_160,
    commissionPercent: 4.8,
    isOutlier: false,
  },
  {
    name: 'Dan',
    manager: 'Elise',
    role: 'Account Manager',
    revenue: 760_000,
    commission: 36_480,
    commissionPercent: 4.8,
    isOutlier: false,
  },
];

export const businessWideSummary = {
  totalCommission: 694_000,
  totalRevenue: 12_380_000,
  commissionPercent: 5.6,
  targetPercent: 5.0,
  variancePercent: 0.6,
} as const;
