// Category Share — detailed per-category data with quarterly trends

export interface CategoryShareDetail {
  category: string;
  immediateShare: number;
  marketSize: number;
  topCompetitor: string;
  topCompetitorShare: number;
  growthRate: number;
  immediateGrowthRate: number;
  quarterlyTrend: QuarterlySharePoint[];
  brands: string[];
  keyAdvertisers: string[];
  strategicNote: string;
}

export interface QuarterlySharePoint {
  quarter: string;
  immediateShare: number;
  marketSize: number;
}

export const categoryShareDetails: CategoryShareDetail[] = [
  {
    category: 'Food & Drink',
    immediateShare: 24,
    marketSize: 48_000_000,
    topCompetitor: 'Hearst',
    topCompetitorShare: 20,
    growthRate: 6.2,
    immediateGrowthRate: 8.4,
    quarterlyTrend: [
      { quarter: 'Q3 2024', immediateShare: 20.2, marketSize: 44_000_000 },
      { quarter: 'Q4 2024', immediateShare: 21.0, marketSize: 45_200_000 },
      { quarter: 'Q1 2025', immediateShare: 21.8, marketSize: 45_800_000 },
      { quarter: 'Q2 2025', immediateShare: 22.4, marketSize: 46_200_000 },
      { quarter: 'Q3 2025', immediateShare: 22.9, marketSize: 46_800_000 },
      { quarter: 'Q4 2025', immediateShare: 23.4, marketSize: 47_400_000 },
      { quarter: 'Q1 2026', immediateShare: 23.8, marketSize: 47_700_000 },
      { quarter: 'Q2 2026', immediateShare: 24.0, marketSize: 48_000_000 },
    ],
    brands: ['BBC Good Food', 'Olive'],
    keyAdvertisers: ['Waitrose', 'HelloFresh', 'Tesco', 'Nestlé', 'Unilever'],
    strategicNote: 'Dominant position via BBC Good Food. Olive adds premium-dining audience. Growing share consistently — defend and extend.',
  },
  {
    category: 'Automotive',
    immediateShare: 16,
    marketSize: 62_000_000,
    topCompetitor: 'Future',
    topCompetitorShare: 22,
    growthRate: -1.4,
    immediateGrowthRate: 2.1,
    quarterlyTrend: [
      { quarter: 'Q3 2024', immediateShare: 14.8, marketSize: 64_000_000 },
      { quarter: 'Q4 2024', immediateShare: 15.0, marketSize: 63_600_000 },
      { quarter: 'Q1 2025', immediateShare: 15.2, marketSize: 63_200_000 },
      { quarter: 'Q2 2025', immediateShare: 15.4, marketSize: 63_000_000 },
      { quarter: 'Q3 2025', immediateShare: 15.6, marketSize: 62_800_000 },
      { quarter: 'Q4 2025', immediateShare: 15.8, marketSize: 62_400_000 },
      { quarter: 'Q1 2026', immediateShare: 15.9, marketSize: 62_200_000 },
      { quarter: 'Q2 2026', immediateShare: 16.0, marketSize: 62_000_000 },
    ],
    brands: ['Top Gear'],
    keyAdvertisers: ['Toyota', 'Audi', 'BMW', 'Mercedes-Benz', 'Volkswagen'],
    strategicNote: 'Market declining overall but Immediate growing share via Top Gear digital pivot. Future is key competitor — monitor their EV content strategy.',
  },
  {
    category: 'Home & Garden',
    immediateShare: 28,
    marketSize: 18_000_000,
    topCompetitor: 'Hearst',
    topCompetitorShare: 18,
    growthRate: 4.8,
    immediateGrowthRate: 7.2,
    quarterlyTrend: [
      { quarter: 'Q3 2024', immediateShare: 24.0, marketSize: 16_400_000 },
      { quarter: 'Q4 2024', immediateShare: 24.8, marketSize: 16_800_000 },
      { quarter: 'Q1 2025', immediateShare: 25.4, marketSize: 17_000_000 },
      { quarter: 'Q2 2025', immediateShare: 26.0, marketSize: 17_200_000 },
      { quarter: 'Q3 2025', immediateShare: 26.6, marketSize: 17_400_000 },
      { quarter: 'Q4 2025', immediateShare: 27.2, marketSize: 17_600_000 },
      { quarter: 'Q1 2026', immediateShare: 27.6, marketSize: 17_800_000 },
      { quarter: 'Q2 2026', immediateShare: 28.0, marketSize: 18_000_000 },
    ],
    brands: ['Gardeners\' World', 'Countryfile'],
    keyAdvertisers: ['Homebase', 'John Lewis', 'Wickes', 'B&Q', 'Dulux'],
    strategicNote: 'Strongest category position. Seasonal peaks in spring (March-May). Gardeners\' World drives lion\'s share. Opportunity to expand into broader home/interiors.',
  },
  {
    category: 'Entertainment',
    immediateShare: 22,
    marketSize: 34_000_000,
    topCompetitor: 'News UK',
    topCompetitorShare: 18,
    growthRate: 3.1,
    immediateGrowthRate: 4.6,
    quarterlyTrend: [
      { quarter: 'Q3 2024', immediateShare: 19.8, marketSize: 32_000_000 },
      { quarter: 'Q4 2024', immediateShare: 20.2, marketSize: 32_400_000 },
      { quarter: 'Q1 2025', immediateShare: 20.6, marketSize: 32_800_000 },
      { quarter: 'Q2 2025', immediateShare: 21.0, marketSize: 33_000_000 },
      { quarter: 'Q3 2025', immediateShare: 21.2, marketSize: 33_200_000 },
      { quarter: 'Q4 2025', immediateShare: 21.6, marketSize: 33_600_000 },
      { quarter: 'Q1 2026', immediateShare: 21.8, marketSize: 33_800_000 },
      { quarter: 'Q2 2026', immediateShare: 22.0, marketSize: 34_000_000 },
    ],
    brands: ['Radio Times'],
    keyAdvertisers: ['Sky', 'Netflix', 'Disney+', 'Amazon Prime', 'BritBox'],
    strategicNote: 'Radio Times is unique asset — trusted programming guide. Streaming services growing their ad spend as ad-supported tiers expand. Big opportunity.',
  },
  {
    category: 'Travel',
    immediateShare: 12,
    marketSize: 28_000_000,
    topCompetitor: 'Condé Nast',
    topCompetitorShare: 26,
    growthRate: 8.4,
    immediateGrowthRate: 6.0,
    quarterlyTrend: [
      { quarter: 'Q3 2024', immediateShare: 10.4, marketSize: 24_000_000 },
      { quarter: 'Q4 2024', immediateShare: 10.8, marketSize: 24_800_000 },
      { quarter: 'Q1 2025', immediateShare: 11.0, marketSize: 25_400_000 },
      { quarter: 'Q2 2025', immediateShare: 11.2, marketSize: 26_000_000 },
      { quarter: 'Q3 2025', immediateShare: 11.4, marketSize: 26_400_000 },
      { quarter: 'Q4 2025', immediateShare: 11.6, marketSize: 27_000_000 },
      { quarter: 'Q1 2026', immediateShare: 11.8, marketSize: 27_400_000 },
      { quarter: 'Q2 2026', immediateShare: 12.0, marketSize: 28_000_000 },
    ],
    brands: ['Countryfile', 'BBC Good Food'],
    keyAdvertisers: ['Virgin Atlantic', 'EasyJet', 'Booking.com', 'Expedia', 'TUI'],
    strategicNote: 'Fastest-growing category by market size. Condé Nast dominates via Traveller. Immediate has lifestyle-travel angle through food/countryside brands — differentiated but niche.',
  },
  {
    category: 'Retail',
    immediateShare: 8,
    marketSize: 72_000_000,
    topCompetitor: 'News UK',
    topCompetitorShare: 16,
    growthRate: 2.2,
    immediateGrowthRate: 3.8,
    quarterlyTrend: [
      { quarter: 'Q3 2024', immediateShare: 6.8, marketSize: 68_000_000 },
      { quarter: 'Q4 2024', immediateShare: 7.0, marketSize: 69_000_000 },
      { quarter: 'Q1 2025', immediateShare: 7.2, marketSize: 69_600_000 },
      { quarter: 'Q2 2025', immediateShare: 7.4, marketSize: 70_000_000 },
      { quarter: 'Q3 2025', immediateShare: 7.5, marketSize: 70_400_000 },
      { quarter: 'Q4 2025', immediateShare: 7.7, marketSize: 71_000_000 },
      { quarter: 'Q1 2026', immediateShare: 7.9, marketSize: 71_400_000 },
      { quarter: 'Q2 2026', immediateShare: 8.0, marketSize: 72_000_000 },
    ],
    brands: ['BBC Good Food', 'Radio Times', 'Gardeners\' World'],
    keyAdvertisers: ['John Lewis', 'M&S', 'Amazon', 'Argos', 'Boots'],
    strategicNote: 'Largest market but lowest Immediate share — biggest growth opportunity. Cross-brand retail packages could unlock budget. Requires dedicated retail sales focus.',
  },
  {
    category: 'Beauty',
    immediateShare: 6,
    marketSize: 42_000_000,
    topCompetitor: 'Condé Nast',
    topCompetitorShare: 28,
    growthRate: 5.6,
    immediateGrowthRate: 4.2,
    quarterlyTrend: [
      { quarter: 'Q3 2024', immediateShare: 5.2, marketSize: 38_000_000 },
      { quarter: 'Q4 2024', immediateShare: 5.4, marketSize: 38_800_000 },
      { quarter: 'Q1 2025', immediateShare: 5.5, marketSize: 39_400_000 },
      { quarter: 'Q2 2025', immediateShare: 5.6, marketSize: 39_800_000 },
      { quarter: 'Q3 2025', immediateShare: 5.7, marketSize: 40_200_000 },
      { quarter: 'Q4 2025', immediateShare: 5.8, marketSize: 40_800_000 },
      { quarter: 'Q1 2026', immediateShare: 5.9, marketSize: 41_400_000 },
      { quarter: 'Q2 2026', immediateShare: 6.0, marketSize: 42_000_000 },
    ],
    brands: ['Olive', 'BBC Good Food'],
    keyAdvertisers: ['L\'Oréal', 'Charlotte Tilbury', 'Estée Lauder', 'Boots', 'Unilever'],
    strategicNote: 'Condé Nast stronghold. Immediate lacks a dedicated beauty title — limited to contextual adjacency. Consider editorial investment or partnership to grow.',
  },
];

export const categorySummary = {
  totalAddressableMarket: 304_000_000,
  categoriesAbove20PctShare: ['Food & Drink', 'Home & Garden', 'Entertainment'],
  categoriesBelow10PctShare: ['Retail', 'Beauty'],
  fastestGrowingCategory: 'Travel',
  biggestOpportunityBySize: 'Retail',
  biggestOpportunityByGap: 'Beauty', // largest gap between market growth and Immediate growth
};
