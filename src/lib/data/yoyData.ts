// --- YoY Summary ---

export const yoySummary = {
  retained: 142,
  retainedValue: 3100000,
  lapsed: 38,
  lapsedValue: 2400000,
  newAdvertisers: 26,
  newValue: 1100000,
};

// --- Churn List ---

export interface ChurnedAdvertiser {
  id: string;
  name: string;
  agency: string;
  lostValue: number;
  lastActive: string;
  stillSpending: boolean;
  currentMarketSpend: number;
  recoveryPriority: 'high' | 'medium' | 'low';
  note?: string;
}

export const churnList: ChurnedAdvertiser[] = [
  {
    id: 'ch-1',
    name: 'Next',
    agency: 'Zenith',
    lostValue: 380000,
    lastActive: '2025-09-30',
    stillSpending: true,
    currentMarketSpend: 4200000,
    recoveryPriority: 'high',
  },
  {
    id: 'ch-2',
    name: 'Volvo',
    agency: 'Starcom',
    lostValue: 240000,
    lastActive: '2025-11-15',
    stillSpending: true,
    currentMarketSpend: 3100000,
    recoveryPriority: 'high',
  },
  {
    id: 'ch-3',
    name: 'Specsavers',
    agency: 'MGMD',
    lostValue: 198000,
    lastActive: '2025-08-20',
    stillSpending: true,
    currentMarketSpend: 5800000,
    recoveryPriority: 'high',
  },
  {
    id: 'ch-4',
    name: 'Dyson',
    agency: 'Spark Foundry',
    lostValue: 164000,
    lastActive: '2025-10-10',
    stillSpending: true,
    currentMarketSpend: 2700000,
    recoveryPriority: 'medium',
  },
  {
    id: 'ch-5',
    name: 'Boots',
    agency: 'OMD',
    lostValue: 142000,
    lastActive: '2025-12-01',
    stillSpending: true,
    currentMarketSpend: 6400000,
    recoveryPriority: 'medium',
  },
  {
    id: 'ch-6',
    name: 'Nespresso',
    agency: 'PHD',
    lostValue: 128000,
    lastActive: '2025-07-15',
    stillSpending: true,
    currentMarketSpend: 1900000,
    recoveryPriority: 'medium',
  },
  {
    id: 'ch-7',
    name: 'Peloton',
    agency: 'Digitas',
    lostValue: 96000,
    lastActive: '2025-06-30',
    stillSpending: false,
    currentMarketSpend: 0,
    recoveryPriority: 'low',
    note: 'Cut UK budget',
  },
  {
    id: 'ch-8',
    name: 'HSBC',
    agency: 'Zenith',
    lostValue: 88000,
    lastActive: '2025-09-01',
    stillSpending: true,
    currentMarketSpend: 8200000,
    recoveryPriority: 'medium',
  },
];

// --- Retained Growth ---

export interface RetainedGrowthEntry {
  id: string;
  name: string;
  agency: string;
  yoyGrowthPercent: number;
}

export const retainedGrowth: RetainedGrowthEntry[] = [
  { id: 'rg-1', name: 'Audi', agency: 'Starcom', yoyGrowthPercent: 27 },
  { id: 'rg-2', name: 'Samsung', agency: 'Starcom', yoyGrowthPercent: 31 },
  { id: 'rg-3', name: 'Waitrose', agency: 'Zenith', yoyGrowthPercent: 11 },
  { id: 'rg-4', name: 'Toyota', agency: 'Zenith', yoyGrowthPercent: 13 },
  { id: 'rg-5', name: 'Pepsi', agency: 'OMD', yoyGrowthPercent: 32 },
  { id: 'rg-6', name: "L'Oréal", agency: 'PHD', yoyGrowthPercent: 14 },
];
