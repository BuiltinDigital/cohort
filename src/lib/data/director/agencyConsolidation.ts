// Agency Consolidation — group-level overview with SoW, contacts, strategy

export interface AgencyGroupOverview {
  group: string;
  totalUKPublisherSpend: number;
  immediateSpend: number;
  shareOfWallet: number;
  yoyDelta: number;
  teamsServing: string[];
  topAdvertisers: { name: string; spend: number }[];
  keyContacts: { name: string; role: string }[];
  nextReview: string;
  strategicPriority: 'grow' | 'maintain' | 'defend';
}

export const agencyGroups: AgencyGroupOverview[] = [
  {
    group: 'Publicis',
    totalUKPublisherSpend: 47_000_000,
    immediateSpend: 4_200_000,
    shareOfWallet: 8.9,
    yoyDelta: 1.2,
    teamsServing: ['Rachel', 'Gary'],
    topAdvertisers: [
      { name: 'Samsung', spend: 1_240_000 },
      { name: 'Waitrose', spend: 860_000 },
      { name: 'L\'Oréal', spend: 520_000 },
      { name: 'Visa', spend: 380_000 },
      { name: 'Procter & Gamble', spend: 340_000 },
    ],
    keyContacts: [
      { name: 'Sophie Turner', role: 'Group Investment Director, Starcom' },
      { name: 'Mark Ellis', role: 'Head of Publishing, Spark Foundry' },
      { name: 'Priya Sharma', role: 'Client Partner, Publicis Media' },
    ],
    nextReview: '2026-05-14',
    strategicPriority: 'grow',
    // Highest Immediate spend. Growing SoW. Push for consolidated group deal across Starcom + Spark Foundry.
  },
  {
    group: 'Omnicom',
    totalUKPublisherSpend: 52_000_000,
    immediateSpend: 3_800_000,
    shareOfWallet: 7.3,
    yoyDelta: 0.8,
    teamsServing: ['Gary', 'Elise'],
    topAdvertisers: [
      { name: 'Toyota', spend: 920_000 },
      { name: 'Pepsi', spend: 460_000 },
      { name: 'Sky', spend: 1_080_000 },
      { name: 'McDonald\'s', spend: 280_000 },
      { name: 'Apple', spend: 220_000 },
    ],
    keyContacts: [
      { name: 'James Foster', role: 'Head of Print & Publishing, OMD' },
      { name: 'Claire Dawson', role: 'Investment Director, PHD' },
      { name: 'Raj Patel', role: 'Group Strategy Director, Hearts & Science' },
    ],
    nextReview: '2026-06-02',
    strategicPriority: 'grow',
    // Second largest Immediate spend. Growing SoW. Toyota and Sky are anchor accounts. Push for incremental from PHD clients.
  },
  {
    group: 'WPP',
    totalUKPublisherSpend: 68_000_000,
    immediateSpend: 4_900_000,
    shareOfWallet: 7.2,
    yoyDelta: -0.4,
    teamsServing: ['Rachel', 'Gary', 'Elise'],
    topAdvertisers: [
      { name: 'John Lewis', spend: 740_000 },
      { name: 'Boots', spend: 380_000 },
      { name: 'Vodafone', spend: 520_000 },
      { name: 'Unilever', spend: 680_000 },
      { name: 'HSBC', spend: 440_000 },
    ],
    keyContacts: [
      { name: 'Anna Richardson', role: 'Chief Investment Officer, EssenceMediacom' },
      { name: 'Tom Hughes', role: 'Head of Publishing, Mindshare' },
      { name: 'Lucy Chen', role: 'Digital Director, Wavemaker' },
    ],
    nextReview: '2026-05-28',
    strategicPriority: 'grow',
    // Biggest UK market spend (£68m) but lowest SoW at 7.2% and declining. Major growth opportunity.
    // Three Immediate teams serve WPP — coordinate to avoid competing internally. Present unified group proposition.
  },
  {
    group: 'Dentsu',
    totalUKPublisherSpend: 38_000_000,
    immediateSpend: 2_100_000,
    shareOfWallet: 5.5,
    yoyDelta: 0.3,
    teamsServing: ['Rachel'],
    topAdvertisers: [
      { name: 'Audi', spend: 580_000 },
      { name: 'Microsoft', spend: 420_000 },
      { name: 'Heineken', spend: 340_000 },
      { name: 'adidas', spend: 280_000 },
      { name: 'Nestlé', spend: 240_000 },
    ],
    keyContacts: [
      { name: 'David Park', role: 'Head of Investment, Carat' },
      { name: 'Emma Whitfield', role: 'Client Partner, iProspect' },
    ],
    nextReview: '2026-07-10',
    strategicPriority: 'maintain',
    // Moderate SoW, slow growth. Rachel manages solo. Audi is anchor — protect. Opportunity to pitch Nestlé across food brands.
  },
  {
    group: 'Havas',
    totalUKPublisherSpend: 24_000_000,
    immediateSpend: 1_800_000,
    shareOfWallet: 7.5,
    yoyDelta: 1.6,
    teamsServing: ['Elise'],
    topAdvertisers: [
      { name: 'Homebase', spend: 320_000 },
      { name: 'Reckitt', spend: 280_000 },
      { name: 'Hyundai', spend: 240_000 },
      { name: 'EDF Energy', spend: 180_000 },
      { name: 'O2', spend: 160_000 },
    ],
    keyContacts: [
      { name: 'Katie Morgan', role: 'Managing Partner, Havas Media' },
      { name: 'Ben Crawford', role: 'Head of Publishing, Havas Media' },
    ],
    nextReview: '2026-06-18',
    strategicPriority: 'defend',
    // Highest SoW growth (+1.6pp YoY) driven by Elise's relationship work. Defend gains.
    // NB: Homebase has aged debt (£180k, 90+ days, no pipeline) — flag to Elise before next review.
  },
  {
    group: 'IPG',
    totalUKPublisherSpend: 31_000_000,
    immediateSpend: 1_600_000,
    shareOfWallet: 5.2,
    yoyDelta: -0.2,
    teamsServing: ['Gary'],
    topAdvertisers: [
      { name: 'Amazon', spend: 420_000 },
      { name: 'Coca-Cola', spend: 340_000 },
      { name: 'Johnson & Johnson', spend: 280_000 },
      { name: 'Spotify', spend: 180_000 },
      { name: 'General Motors', spend: 160_000 },
    ],
    keyContacts: [
      { name: 'Michael Brown', role: 'Investment Director, UM' },
      { name: 'Sarah O\'Neill', role: 'Head of Partnerships, Initiative' },
    ],
    nextReview: '2026-08-04',
    strategicPriority: 'maintain',
    // Lowest SoW and slightly declining. Gary manages solo. Amazon is biggest client but routes mostly through open market / programmatic.
    // Opportunity: pitch Coca-Cola food-brand integration via BBC Good Food + Olive.
  },
];

export const agencyConsolidationSummary = {
  totalAgencyGroupsTracked: 6,
  totalImmediateSpendAcrossGroups: 18_400_000,
  averageSoW: 6.9,
  highestSoW: { group: 'Publicis', sow: 8.9 },
  lowestSoW: { group: 'IPG', sow: 5.2 },
  fastestGrowing: { group: 'Havas', yoyDelta: 1.6 },
  biggestOpportunity: {
    group: 'WPP',
    rationale: 'Largest UK publisher spend (£68m) with only 7.2% SoW — even 1pp increase = £680k incremental',
  },
  upcomingReviews: [
    { group: 'Publicis', date: '2026-05-14' },
    { group: 'WPP', date: '2026-05-28' },
    { group: 'Omnicom', date: '2026-06-02' },
  ],
};
