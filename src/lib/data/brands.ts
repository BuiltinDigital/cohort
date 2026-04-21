export interface Brand {
  id: string;
  name: string;
  type: string;
  category: string;
  monthlyReaders: number;
  readersLabel: string;
  yoyGrowth: number;
  timeOnSite: string;
  subRevenue?: number;
  printCirc?: number;
  newsletterSubs?: number;
  pagesPerVisit?: number;
  adRevenueQ2: number;
  revPerReader: number;
  trend: 'up' | 'flat' | 'down';
  sparkData: number[];
}

export const brands: Brand[] = [
  {
    id: 'radio-times',
    name: 'Radio Times',
    type: 'Print + Digital',
    category: 'Entertainment',
    monthlyReaders: 1420000,
    readersLabel: 'Monthly readers',
    yoyGrowth: 3,
    timeOnSite: '3:42',
    subRevenue: 2100000,
    adRevenueQ2: 620000,
    revPerReader: 0.44,
    trend: 'up',
    sparkData: [38, 41, 40, 43, 42, 44, 45, 47],
  },
  {
    id: 'bbc-good-food',
    name: 'BBC Good Food',
    type: 'Digital',
    category: 'Food & Drink',
    monthlyReaders: 18400000,
    readersLabel: 'Monthly uniques',
    yoyGrowth: 12,
    timeOnSite: '',
    pagesPerVisit: 4.2,
    newsletterSubs: 1200000,
    adRevenueQ2: 1400000,
    revPerReader: 0.08,
    trend: 'up',
    sparkData: [52, 56, 61, 64, 68, 72, 76, 80],
  },
  {
    id: 'top-gear',
    name: 'Top Gear',
    type: 'Print + Digital',
    category: 'Automotive',
    monthlyReaders: 620000,
    readersLabel: 'Monthly readers',
    yoyGrowth: -4,
    timeOnSite: '2:14',
    printCirc: 112000,
    adRevenueQ2: 340000,
    revPerReader: 0.55,
    trend: 'down',
    sparkData: [48, 46, 45, 44, 42, 41, 40, 38],
  },
  {
    id: 'olive',
    name: 'Olive',
    type: 'Print + Digital',
    category: 'Food & Lifestyle',
    monthlyReaders: 480000,
    readersLabel: 'Monthly readers',
    yoyGrowth: 6,
    timeOnSite: '4:08',
    printCirc: 68000,
    adRevenueQ2: 280000,
    revPerReader: 0.58,
    trend: 'up',
    sparkData: [30, 31, 33, 34, 36, 37, 39, 40],
  },
  {
    id: 'gardeners-world',
    name: "Gardeners' World",
    type: 'Print + Digital',
    category: 'Garden & Outdoor',
    monthlyReaders: 2800000,
    readersLabel: 'Monthly readers',
    yoyGrowth: 8,
    timeOnSite: '4:51',
    printCirc: 168000,
    adRevenueQ2: 420000,
    revPerReader: 0.15,
    trend: 'up',
    sparkData: [44, 46, 49, 52, 55, 58, 61, 64],
  },
  {
    id: 'countryfile',
    name: 'Countryfile',
    type: 'Print + Digital',
    category: 'Rural/Lifestyle',
    monthlyReaders: 840000,
    readersLabel: 'Monthly readers',
    yoyGrowth: 4,
    timeOnSite: '3:18',
    printCirc: 94000,
    adRevenueQ2: 210000,
    revPerReader: 0.25,
    trend: 'up',
    sparkData: [34, 35, 36, 37, 38, 39, 40, 42],
  },
];
