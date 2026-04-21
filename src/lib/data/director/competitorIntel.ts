// Competitor Intelligence — news, moves and market signals

export interface CompetitorNewsItem {
  id: string;
  date: string;
  publisher: string;
  category: 'product' | 'partnership' | 'financial' | 'traffic' | 'talent' | 'regulatory';
  title: string;
  summary: string;
  relevance: 'high' | 'medium' | 'low';
  recommendedAction?: string;
  impact: 'positive' | 'negative' | 'neutral';
}

export const competitorNews: CompetitorNewsItem[] = [
  {
    id: 'ci-01',
    date: '2026-04-15',
    publisher: 'Hearst',
    category: 'product',
    title: 'Hearst launches new contextual targeting product for food advertisers',
    summary: 'Hearst UK has launched "Taste Targeting", a first-party contextual ad product leveraging recipe engagement data across Good Housekeeping and Delicious. Early tests show 40% higher CTR vs standard display.',
    relevance: 'high',
    recommendedAction: 'Direct competitive threat to BBC Good Food ad products. Accelerate our own first-party data offering. Brief Rachel\'s team to proactively pitch Immediate\'s food audience advantages to overlapping advertisers.',
    impact: 'negative',
  },
  {
    id: 'ci-02',
    date: '2026-04-12',
    publisher: 'Future',
    category: 'financial',
    title: 'Future plc Q1 results: digital revenue +18% YoY, total revenue flat',
    summary: 'Future reported Q1 2026 earnings showing 18% digital revenue growth, offsetting continued print decline (-14%). CEO highlighted "audience-led" buying platform as key differentiator. Gaming and tech verticals drove most digital growth.',
    relevance: 'high',
    recommendedAction: 'Competitive threat in digital. Review how Future\'s platform competes with our own programmatic offering. Their Top Gear digital audience overlap with our automotive vertical needs monitoring.',
    impact: 'negative',
  },
  {
    id: 'ci-03',
    date: '2026-04-10',
    publisher: 'News UK',
    category: 'traffic',
    title: 'News UK lifestyle sites see traffic decline of -8% MoM',
    summary: 'SimilarWeb data shows News UK lifestyle portfolio (The Sun Features, Times Luxury) declined 8% month-on-month. Attributed to algorithm changes and reduced social referral traffic.',
    relevance: 'medium',
    recommendedAction: 'Opportunity to pitch displaced advertisers. Identify brands running on News UK lifestyle sites and approach with Immediate audience data as alternative.',
    impact: 'positive',
  },
  {
    id: 'ci-04',
    date: '2026-04-08',
    publisher: 'Condé Nast',
    category: 'talent',
    title: 'Condé Nast UK restructuring sales team — Head of Digital Sales departing',
    summary: 'Condé Nast UK is undergoing a sales restructure. Head of Digital Sales, James Whitfield, is leaving after 6 years. Three senior account directors also reportedly exploring options.',
    relevance: 'medium',
    recommendedAction: 'Talent acquisition opportunity. Brief HR to approach James Whitfield and the departing ADs. Also approach CN\'s agency contacts during transition period when relationships may be unsettled.',
    impact: 'positive',
  },
  {
    id: 'ci-05',
    date: '2026-04-06',
    publisher: 'DMGT / Reach',
    category: 'financial',
    title: 'Reach plc announces cost-cutting: 200 editorial roles at risk',
    summary: 'Reach plc has announced a restructuring programme targeting £20m in savings. Up to 200 editorial roles could be cut across regional and national titles. Digital-only strategy accelerating.',
    relevance: 'medium',
    recommendedAction: 'Monitor for talent opportunities in editorial. Also watch for any brands pulling spend from Reach due to perceived quality decline — potential for Immediate to capture premium-seeking advertisers.',
    impact: 'positive',
  },
  {
    id: 'ci-06',
    date: '2026-04-04',
    publisher: 'Hearst',
    category: 'partnership',
    title: 'Hearst partners with TikTok for shoppable content integration',
    summary: 'Hearst UK has signed a commercial partnership with TikTok enabling shoppable content links from Cosmopolitan and Elle. Brands can run integrated campaigns spanning Hearst editorial and TikTok Shop.',
    relevance: 'high',
    recommendedAction: 'Assess feasibility of similar social commerce partnerships for BBC Good Food recipes and Olive. TikTok food content is massive — first-mover advantage matters.',
    impact: 'negative',
  },
  {
    id: 'ci-07',
    date: '2026-04-02',
    publisher: 'Future',
    category: 'product',
    title: 'Future launches AI-powered ad creative optimisation for programmatic',
    summary: 'Future has rolled out an AI tool that automatically optimises ad creative based on contextual page content. Currently in beta across tech and gaming verticals with plans to expand to all verticals by Q3.',
    relevance: 'medium',
    recommendedAction: 'Evaluate AI-powered creative tools for our own programmatic stack. Could be a differentiator for PMP deals. Discuss with AdOps team.',
    impact: 'neutral',
  },
  {
    id: 'ci-08',
    date: '2026-03-28',
    publisher: 'Condé Nast',
    category: 'product',
    title: 'Condé Nast Traveller relaunches with enhanced digital subscription model',
    summary: 'CN Traveller has relaunched with a metered paywall and premium digital subscription at £6.99/month. Includes exclusive destination guides and hotel reviews. Print frequency reduced to bi-monthly.',
    relevance: 'medium',
    recommendedAction: 'Monitor subscription take-up. If successful, could reduce CN Traveller\'s ad inventory and push travel advertisers to seek alternative premium reach — opportunity for Immediate.',
    impact: 'neutral',
  },
  {
    id: 'ci-09',
    date: '2026-03-25',
    publisher: 'News UK',
    category: 'partnership',
    title: 'News UK signs exclusive data partnership with Sainsbury\'s Nectar',
    summary: 'News UK has secured an exclusive data partnership with Sainsbury\'s Nectar loyalty scheme, enabling deterministic purchase-based targeting across Times and Sun properties for FMCG advertisers.',
    relevance: 'high',
    recommendedAction: 'Significant competitive threat for FMCG categories. Explore similar retail data partnerships — Tesco Clubcard, Waitrose myWaitrose. Prioritise this for Q3 strategy.',
    impact: 'negative',
  },
  {
    id: 'ci-10',
    date: '2026-03-20',
    publisher: 'Hearst',
    category: 'regulatory',
    title: 'Hearst faces ICO investigation over cookie consent practices',
    summary: 'The ICO has opened an investigation into Hearst UK\'s cookie consent mechanism following complaints that reject options were obscured. Potential fine and mandated changes to data collection.',
    relevance: 'low',
    recommendedAction: 'Audit own consent mechanisms proactively. If Hearst faces restrictions on data collection, their targeting capabilities could be weakened — potential advantage for Immediate if our consent is cleaner.',
    impact: 'positive',
  },
  {
    id: 'ci-11',
    date: '2026-03-18',
    publisher: 'Future',
    category: 'talent',
    title: 'Future appoints ex-Google exec as Chief Revenue Officer',
    summary: 'Future plc has appointed Sarah Chen, formerly VP of Publisher Partnerships at Google, as CRO. Expected to accelerate their programmatic strategy and deepen platform relationships.',
    relevance: 'medium',
    recommendedAction: 'Monitor for shifts in Future\'s commercial strategy. A Google background suggests stronger programmatic and platform focus. Could intensify competition for programmatic budgets.',
    impact: 'negative',
  },
  {
    id: 'ci-12',
    date: '2026-03-14',
    publisher: 'DMGT / Reach',
    category: 'traffic',
    title: 'Daily Mail online traffic surges +12% following AI search integration',
    summary: 'MailOnline has seen a 12% traffic increase after being featured prominently in Google\'s AI search overviews for lifestyle and health queries. Immediate\'s brands saw no equivalent uplift.',
    relevance: 'medium',
    recommendedAction: 'Investigate our brands\' visibility in AI search results. Commission SEO audit focused on AI overview inclusion. Risk of traffic erosion if competitors gain preferential AI surfacing.',
    impact: 'negative',
  },
];

export const competitorIntelSummary = {
  totalItems: 12,
  highRelevance: 4,
  mediumRelevance: 7,
  lowRelevance: 1,
  positiveImpact: 4,
  negativeImpact: 6,
  neutralImpact: 2,
  topThreats: [
    'Hearst contextual targeting for food (direct BBC Good Food competitor)',
    'Future digital revenue growth +18% and new CRO from Google',
    'News UK Nectar data partnership for FMCG targeting',
  ],
  topOpportunities: [
    'News UK lifestyle traffic declining — displaced advertisers available',
    'Condé Nast sales team restructure — talent and relationship opportunities',
    'Reach editorial cuts — premium-seeking advertisers may shift',
  ],
};
