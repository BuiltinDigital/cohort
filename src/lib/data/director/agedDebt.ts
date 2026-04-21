// Aged Debt — outstanding receivables by ageing bucket

export interface AgedDebtEntry {
  client: string;
  agency: string;
  totalOwed: number;
  current: number;
  days30: number;
  days60: number;
  days90Plus: number;
  lastPayment: string;
  hasPipeline: boolean;
  pipelineValue?: number;
}

export interface AgedDebtSummary {
  totalOutstanding: number;
  current: number;
  days30: number;
  days60: number;
  days90Plus: number;
  overduePct: number;
}

export const agedDebtSummary: AgedDebtSummary = {
  totalOutstanding: 3_200_000,
  current: 1_800_000,
  days30: 680_000,
  days60: 420_000,
  days90Plus: 300_000,
  overduePct: 43.8, // (680k + 420k + 300k) / 3.2m
};

export const agedDebtEntries: AgedDebtEntry[] = [
  {
    client: 'Homebase',
    agency: 'Havas Media',
    totalOwed: 180_000,
    current: 0,
    days30: 0,
    days60: 42_000,
    days90Plus: 138_000,
    lastPayment: '2025-12-18',
    hasPipeline: false,
    // No pipeline — red flag: debt with no future revenue relationship
  },
  {
    client: 'Boots',
    agency: 'WPP (EssenceMediacom)',
    totalOwed: 120_000,
    current: 0,
    days30: 0,
    days60: 48_000,
    days90Plus: 72_000,
    lastPayment: '2026-01-10',
    hasPipeline: true,
    pipelineValue: 142_000,
  },
  {
    client: 'Samsung',
    agency: 'Starcom (Publicis)',
    totalOwed: 480_000,
    current: 310_000,
    days30: 120_000,
    days60: 50_000,
    days90Plus: 0,
    lastPayment: '2026-03-22',
    hasPipeline: true,
    pipelineValue: 620_000,
  },
  {
    client: 'Toyota',
    agency: 'OMD (Omnicom)',
    totalOwed: 340_000,
    current: 220_000,
    days30: 96_000,
    days60: 24_000,
    days90Plus: 0,
    lastPayment: '2026-03-28',
    hasPipeline: true,
    pipelineValue: 480_000,
  },
  {
    client: 'Virgin Atlantic',
    agency: 'Spark Foundry (Publicis)',
    totalOwed: 260_000,
    current: 180_000,
    days30: 80_000,
    days60: 0,
    days90Plus: 0,
    lastPayment: '2026-04-02',
    hasPipeline: true,
    pipelineValue: 310_000,
  },
  {
    client: 'Sky',
    agency: 'PHD (Omnicom)',
    totalOwed: 420_000,
    current: 340_000,
    days30: 80_000,
    days60: 0,
    days90Plus: 0,
    lastPayment: '2026-04-05',
    hasPipeline: true,
    pipelineValue: 540_000,
  },
  {
    client: 'John Lewis',
    agency: 'Digitas (Publicis)',
    totalOwed: 380_000,
    current: 280_000,
    days30: 64_000,
    days60: 36_000,
    days90Plus: 0,
    lastPayment: '2026-03-18',
    hasPipeline: true,
    pipelineValue: 290_000,
  },
  {
    client: 'Waitrose',
    agency: 'Starcom (Publicis)',
    totalOwed: 520_000,
    current: 370_000,
    days30: 110_000,
    days60: 40_000,
    days90Plus: 0,
    lastPayment: '2026-04-08',
    hasPipeline: true,
    pipelineValue: 380_000,
  },
];

// Clients over 90 days — flagged for escalation
export const redFlags = [
  {
    client: 'Homebase',
    totalOwed: 180_000,
    days90Plus: 138_000,
    hasPipeline: false,
    action: 'Escalate to Finance Director — no future revenue to leverage; consider legal recovery',
  },
  {
    client: 'Boots',
    totalOwed: 120_000,
    days90Plus: 72_000,
    hasPipeline: true,
    pipelineValue: 142_000,
    action: 'Warn sales team — link debt clearance to new campaign sign-off; no new IO until outstanding cleared',
  },
];
