// --- PMP Deals ---

export interface PMPDeal {
  id: string;
  dealId: string;
  advertiser: string;
  agency: string;
  avgCPM: number;
  spend: number;
  fillRate: number;
  impressions: number;
  status: 'active' | 'paused' | 'ended';
}

export const pmpDeals: PMPDeal[] = [
  {
    id: 'pmp-1',
    dealId: 'IMM-Premium-Food-PMP',
    advertiser: 'Waitrose',
    agency: 'Starcom',
    avgCPM: 28.4,
    spend: 186000,
    fillRate: 82,
    impressions: 6550000,
    status: 'active',
  },
  {
    id: 'pmp-2',
    dealId: 'IMM-Auto-Intenders',
    advertiser: 'Toyota',
    agency: 'OMD',
    avgCPM: 22.1,
    spend: 142000,
    fillRate: 74,
    impressions: 6425000,
    status: 'active',
  },
  {
    id: 'pmp-3',
    dealId: 'IMM-Luxury-Travel',
    advertiser: 'Virgin Atlantic',
    agency: 'Spark Foundry',
    avgCPM: 31.6,
    spend: 218000,
    fillRate: 86,
    impressions: 6899000,
    status: 'active',
  },
  {
    id: 'pmp-4',
    dealId: 'IMM-Home-Shoppers',
    advertiser: 'John Lewis',
    agency: 'Digitas',
    avgCPM: 19.8,
    spend: 124000,
    fillRate: 71,
    impressions: 6263000,
    status: 'active',
  },
  {
    id: 'pmp-5',
    dealId: 'IMM-TV-Entertainment',
    advertiser: 'Sky',
    agency: 'PHD',
    avgCPM: 26.2,
    spend: 164000,
    fillRate: 80,
    impressions: 6260000,
    status: 'active',
  },
  {
    id: 'pmp-6',
    dealId: 'IMM-Gardening-Enthusiasts',
    advertiser: 'Homebase',
    agency: 'Havas Media (H&S)',
    avgCPM: 18.4,
    spend: 98000,
    fillRate: 68,
    impressions: 5326000,
    status: 'active',
  },
];

export const pmpStats = {
  activeDeals: 34,
  revenueQ2: 1120000,
  avgCPM: 24.5,
  fillRate: 78,
};

// --- Open Market ---

export const openMarketStats = {
  revenueQ2: 680000,
  avgCPM: 4.8,
  topSSP: 'Adomic',
  sspShare: 42,
  bidDensity: 4.2,
};

export interface OpenMarketAdvertiser {
  id: string;
  name: string;
  spend: number;
  avgCPM: number;
  impressions: number;
  trend: 'up' | 'flat' | 'down';
}

export const openMarketAdvertisers: OpenMarketAdvertiser[] = [
  { id: 'om-1', name: 'Amazon', spend: 142000, avgCPM: 5.2, impressions: 27308000, trend: 'up' },
  { id: 'om-2', name: 'Booking.com', spend: 118000, avgCPM: 4.6, impressions: 25652000, trend: 'up' },
  { id: 'om-3', name: 'Expedia', spend: 96000, avgCPM: 4.4, impressions: 21818000, trend: 'flat' },
  { id: 'om-4', name: 'HelloFresh', spend: 84000, avgCPM: 5.8, impressions: 14483000, trend: 'down' },
  { id: 'om-5', name: 'eBay', spend: 72000, avgCPM: 3.9, impressions: 18462000, trend: 'flat' },
];

// --- Not Spending / Prospects ---

export const notSpendingStats = {
  opportunityBrands: 94,
  totalOpportunity: 38000000,
  highAffinityMatches: 18,
  agencyOverlap: 62,
};

export interface Prospect {
  id: string;
  name: string;
  category: string;
  agency: string;
  ukSpend: number;
  audienceFit: number;
  priority: 'hot' | 'warm';
}

export const prospectList: Prospect[] = [
  { id: 'pr-1', name: 'M&S', category: 'Retail', agency: 'Mindshare', ukSpend: 8200000, audienceFit: 91, priority: 'hot' },
  { id: 'pr-2', name: 'Ocado', category: 'Grocery / E-commerce', agency: 'the7stars', ukSpend: 4800000, audienceFit: 88, priority: 'hot' },
  { id: 'pr-3', name: 'Charlotte Tilbury', category: 'Beauty', agency: 'Wavemaker', ukSpend: 3600000, audienceFit: 82, priority: 'warm' },
  { id: 'pr-4', name: 'Monzo', category: 'Finance', agency: 'In-house', ukSpend: 2900000, audienceFit: 74, priority: 'warm' },
  { id: 'pr-5', name: 'EasyJet', category: 'Travel', agency: 'VCCP Media', ukSpend: 6400000, audienceFit: 86, priority: 'hot' },
  { id: 'pr-6', name: 'Hello Magazine', category: 'Media / Entertainment', agency: 'Havas', ukSpend: 1800000, audienceFit: 78, priority: 'warm' },
  { id: 'pr-7', name: 'Citroen', category: 'Automotive', agency: 'Publicis Media', ukSpend: 5100000, audienceFit: 80, priority: 'warm' },
  { id: 'pr-8', name: 'Wickes', category: 'Home / DIY', agency: 'MediaCom', ukSpend: 3200000, audienceFit: 84, priority: 'hot' },
];

// --- Market Share ---

export interface MarketShareEntry {
  publisher: string;
  share: number;
}

export const marketShareData: MarketShareEntry[] = [
  { publisher: 'Immediate', share: 18 },
  { publisher: 'Hearst', share: 22 },
  { publisher: 'Future', share: 16 },
  { publisher: 'Condé Nast', share: 14 },
  { publisher: 'News UK', share: 12 },
  { publisher: 'Others', share: 18 },
];

export interface CompetitorMovement {
  publisher: string;
  share: number;
  yoyDelta: number;
}

export const competitorMovement: CompetitorMovement[] = [
  { publisher: 'Immediate', share: 18, yoyDelta: 1.2 },
  { publisher: 'Hearst', share: 22, yoyDelta: -0.8 },
  { publisher: 'Future', share: 16, yoyDelta: 2.4 },
  { publisher: 'Condé Nast', share: 14, yoyDelta: -1.1 },
  { publisher: 'News UK', share: 12, yoyDelta: 0.3 },
  { publisher: 'Others', share: 18, yoyDelta: -2.0 },
];

export interface ChannelShareEntry {
  publisher: string;
  share: number;
}

export const printShare: ChannelShareEntry[] = [
  { publisher: 'Immediate', share: 24 },
  { publisher: 'Hearst', share: 20 },
  { publisher: 'Future', share: 12 },
  { publisher: 'Condé Nast', share: 16 },
  { publisher: 'News UK', share: 10 },
  { publisher: 'Others', share: 18 },
];

export const digitalShare: ChannelShareEntry[] = [
  { publisher: 'Immediate', share: 14 },
  { publisher: 'Hearst', share: 23 },
  { publisher: 'Future', share: 19 },
  { publisher: 'Condé Nast', share: 13 },
  { publisher: 'News UK', share: 14 },
  { publisher: 'Others', share: 17 },
];
