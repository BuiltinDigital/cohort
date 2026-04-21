// --- Revenue Timeline ---

export interface RevenueTimelineEntry {
  quarter: string;
  immediateRevenue: number;
  marketRevenue: number;
}

export const revenueTimeline: RevenueTimelineEntry[] = [
  { quarter: 'Q3 2024', immediateRevenue: 2800000, marketRevenue: 14200000 },
  { quarter: 'Q4 2024', immediateRevenue: 3100000, marketRevenue: 15800000 },
  { quarter: 'Q1 2025', immediateRevenue: 2600000, marketRevenue: 13400000 },
  { quarter: 'Q2 2025', immediateRevenue: 3000000, marketRevenue: 15100000 },
  { quarter: 'Q3 2025', immediateRevenue: 3200000, marketRevenue: 15600000 },
  { quarter: 'Q4 2025', immediateRevenue: 3500000, marketRevenue: 16400000 },
  { quarter: 'Q1 2026', immediateRevenue: 3100000, marketRevenue: 14800000 },
  { quarter: 'Q2 2026', immediateRevenue: 3400000, marketRevenue: 16100000 },
];

// --- Team Performance ---

export interface TeamPerformanceEntry {
  quarter: string;
  delivered: number;
  target: number;
  percentHit: number;
}

export const teamPerformance: TeamPerformanceEntry[] = [
  { quarter: 'Q1 2025', delivered: 2600000, target: 2800000, percentHit: 93 },
  { quarter: 'Q2 2025', delivered: 3000000, target: 2900000, percentHit: 103 },
  { quarter: 'Q3 2025', delivered: 3200000, target: 3100000, percentHit: 103 },
  { quarter: 'Q4 2025', delivered: 3500000, target: 3400000, percentHit: 103 },
  { quarter: 'Q1 2026', delivered: 3100000, target: 3200000, percentHit: 97 },
  { quarter: 'Q2 2026', delivered: 3400000, target: 3300000, percentHit: 103 },
];

// --- Top Advertisers All Time ---

export interface TopAdvertiserAllTime {
  id: string;
  name: string;
  totalRevenue: number;
  campaigns: number;
  status: 'active' | 'lapsed';
}

export const topAdvertisersAllTime: TopAdvertiserAllTime[] = [
  { id: 'ta-1', name: 'Samsung', totalRevenue: 3400000, campaigns: 18, status: 'active' },
  { id: 'ta-2', name: 'Audi', totalRevenue: 2800000, campaigns: 22, status: 'active' },
  { id: 'ta-3', name: 'Waitrose', totalRevenue: 2100000, campaigns: 14, status: 'active' },
  { id: 'ta-4', name: 'Next', totalRevenue: 1800000, campaigns: 12, status: 'lapsed' },
  { id: 'ta-5', name: 'Toyota', totalRevenue: 1700000, campaigns: 11, status: 'active' },
  { id: 'ta-6', name: 'Pepsi', totalRevenue: 1400000, campaigns: 9, status: 'active' },
];
