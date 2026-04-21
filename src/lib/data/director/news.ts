export interface CommercialNews {
  id: string;
  date: string;
  source: 'client' | 'agency' | 'competitor' | 'regulatory' | 'market';
  title: string;
  summary: string;
  relevance: 'high' | 'medium' | 'low';
  tags: string[];
  recommendedAction?: string;
}

export const commercialNews: CommercialNews[] = [
  {
    id: 'news-001',
    date: '2026-04-16',
    source: 'client',
    title: 'Audi announces new EV range with expanded UK marketing budget',
    summary:
      'Audi confirmed a new Q6 e-tron and A6 e-tron launching in UK showrooms in September 2026, with marketing budget reportedly increased by 20%. The launch is expected to include a major digital-first media push targeting in-market EV intenders.',
    relevance: 'high',
    tags: ['automotive', 'EV', 'Audi', 'new-business'],
    recommendedAction:
      'Brief Rachel\'s team to prepare an audience-data-led proposal for the Q6 e-tron launch. Use the first-party EV intender segment from the audience data platform beta.',
  },
  {
    id: 'news-002',
    date: '2026-04-15',
    source: 'agency',
    title: 'Publicis acquires UK data consultancy DataHive',
    summary:
      'Publicis Group has acquired DataHive, a London-based data consultancy specialising in first-party data strategy for publishers. The acquisition signals Publicis\'s intent to bring data partnerships in-house rather than rely on publisher-direct data deals.',
    relevance: 'medium',
    tags: ['Publicis', 'data', 'acquisition', 'agency'],
    recommendedAction:
      'Raise in the Publicis QBR. Understand how DataHive acquisition changes their data buying strategy and whether our audience data platform offering needs repositioning.',
  },
  {
    id: 'news-003',
    date: '2026-04-14',
    source: 'competitor',
    title: 'Hearst UK launches self-serve ad tech platform',
    summary:
      'Hearst UK has launched "Hearst Connect", a self-serve programmatic buying platform giving agencies direct access to inventory across all Hearst titles with first-party audience targeting. Early agency feedback reportedly positive.',
    relevance: 'high',
    tags: ['Hearst', 'programmatic', 'self-serve', 'competitor'],
    recommendedAction:
      'Accelerate our self-serve platform launch. Hearst has first-mover advantage. Get CTO team to brief on timeline risks and ensure June launch is firm.',
  },
  {
    id: 'news-004',
    date: '2026-04-13',
    source: 'regulatory',
    title: 'HFSS enforcement timeline moved forward to July 2026',
    summary:
      'The UK government has confirmed that the next phase of HFSS online advertising restrictions will be enforced from 1 July 2026, one month earlier than previously expected. Penalties for non-compliance will include fines of up to £250K per breach.',
    relevance: 'high',
    tags: ['HFSS', 'regulation', 'food-drink', 'compliance'],
    recommendedAction:
      'Escalate Gary\'s HFSS pipeline rebuild initiative. The earlier enforcement date compresses our timeline. Schedule an emergency review with compliance and affected account teams.',
  },
  {
    id: 'news-005',
    date: '2026-04-12',
    source: 'market',
    title: 'UK digital ad spend grows 11% in Q1 2026',
    summary:
      'IAB UK\'s Q1 2026 Digital Adspend report shows total UK digital advertising grew 11% YoY to £8.2B. Video (+18%) and retail media (+24%) were the fastest-growing formats. Display grew 7%, slightly below market average.',
    relevance: 'medium',
    tags: ['market-data', 'IAB', 'digital', 'growth'],
    recommendedAction:
      'Use in Bauer quarterly review to contextualise our digital performance. If our digital growth is below 11%, we are losing share.',
  },
  {
    id: 'news-006',
    date: '2026-04-11',
    source: 'client',
    title: 'Unilever restructures UK media buying — consolidating into fewer agencies',
    summary:
      'Unilever is consolidating UK media buying from 4 agencies down to 2 as part of a global efficiency drive. Mindshare and Wavemaker are expected to retain the business. Havas and PHD at risk of losing Unilever accounts.',
    relevance: 'high',
    tags: ['Unilever', 'consolidation', 'agency', 'FMCG'],
    recommendedAction:
      'Map which of our Unilever campaigns are booked through Havas/PHD vs. Mindshare/Wavemaker. Prepare relationship-transfer plans for any at-risk bookings.',
  },
  {
    id: 'news-007',
    date: '2026-04-10',
    source: 'competitor',
    title: 'Future plc cuts 12% of commercial headcount',
    summary:
      'Future plc has announced a 12% reduction in its commercial team as part of a restructuring following declining print revenue. The cuts include several senior agency relationships managers and programmatic specialists.',
    relevance: 'medium',
    tags: ['Future', 'competitor', 'redundancies', 'talent'],
    recommendedAction:
      'Identify any strong candidates from Future\'s commercial team for our Head of Programmatic Sales role or other open positions.',
  },
  {
    id: 'news-008',
    date: '2026-04-09',
    source: 'client',
    title: 'Samsung increases UK media budget for Galaxy Z Flip 6 launch',
    summary:
      'Samsung UK has confirmed a 30% media budget increase for the Galaxy Z Flip 6 launch in August 2026. Previous Samsung launches with Immediate have delivered strong brand lift results.',
    relevance: 'high',
    tags: ['Samsung', 'tech', 'launch', 'upsell'],
    recommendedAction:
      'Gary\'s team should proactively pitch a cross-platform package replicating the Z Fold success. Reference the +14pts brand lift case study from the post-mortem.',
  },
  {
    id: 'news-009',
    date: '2026-04-08',
    source: 'market',
    title: 'Print advertising revenue declines 6% in Q1 — slowest decline in 3 years',
    summary:
      'PwC\'s quarterly media outlook shows UK print advertising revenue declined 6% YoY in Q1 2026. While still negative, this is the smallest decline in 3 years, driven by premium magazine titles outperforming newspapers.',
    relevance: 'medium',
    tags: ['print', 'market-data', 'revenue', 'trend'],
  },
  {
    id: 'news-010',
    date: '2026-04-07',
    source: 'agency',
    title: 'GroupM launches unified measurement framework across all agencies',
    summary:
      'GroupM has launched a new cross-agency measurement framework that standardises campaign evaluation metrics. Publishers will need to integrate their reporting with GroupM\'s API by Q3 2026 to maintain preferred partner status.',
    relevance: 'high',
    tags: ['GroupM', 'measurement', 'reporting', 'API'],
    recommendedAction:
      'Get CTO team to assess GroupM API integration requirements immediately. Missing the Q3 deadline would jeopardise our largest agency relationship (£2.6M annual).',
  },
  {
    id: 'news-011',
    date: '2026-04-05',
    source: 'client',
    title: 'Dyson announces entry into beauty tech — new product category',
    summary:
      'Dyson has confirmed a new beauty tech product line launching in October 2026, expanding beyond hair care into skincare devices. Expected to carry significant launch marketing budget targeting premium female audiences.',
    relevance: 'high',
    tags: ['Dyson', 'beauty', 'new-category', 'launch'],
    recommendedAction:
      'Brief Rachel\'s team to prepare a cross-title beauty audience proposal (Stylist, BBC Good Food, Radio Times). Dyson is already a strong account — this is a natural upsell.',
  },
  {
    id: 'news-012',
    date: '2026-04-03',
    source: 'regulatory',
    title: 'ICO publishes new guidance on first-party data use in advertising',
    summary:
      'The ICO has published updated guidance clarifying acceptable uses of first-party data for advertising personalisation. The guidance is broadly permissive for publisher first-party data with proper consent, which supports our audience data platform approach.',
    relevance: 'medium',
    tags: ['ICO', 'privacy', 'first-party-data', 'regulation'],
    recommendedAction:
      'Share with CTO and legal team. Use the ICO guidance as a proof point in agency conversations about the legitimacy and safety of our first-party data offering.',
  },
  {
    id: 'news-013',
    date: '2026-04-02',
    source: 'competitor',
    title: 'News UK poaches two senior agency directors from Conde Nast',
    summary:
      'News UK has hired two senior commercial directors from Conde Nast, reportedly offering 25%+ salary uplifts. Both had strong luxury and fashion agency relationships that may follow them to News UK.',
    relevance: 'medium',
    tags: ['News UK', 'talent', 'competitor', 'luxury'],
    recommendedAction:
      'Review our compensation benchmarking for senior commercial roles. Ensure we are not vulnerable to similar poaching, especially for people with deep agency relationships.',
  },
  {
    id: 'news-014',
    date: '2026-03-30',
    source: 'market',
    title: 'Retail media networks now command 14% of UK digital spend',
    summary:
      'eMarketer reports that retail media networks (Amazon, Tesco, Sainsbury\'s) now represent 14% of total UK digital ad spend, up from 9% a year ago. The growth is primarily cannibalising publisher display budgets in FMCG and grocery verticals.',
    relevance: 'high',
    tags: ['retail-media', 'market-shift', 'display', 'FMCG'],
    recommendedAction:
      'Factor retail media cannibalisation into H2 forecast models. Consider partnership approaches with retailers rather than competing head-on.',
  },
  {
    id: 'news-015',
    date: '2026-03-28',
    source: 'agency',
    title: 'Dentsu restructures UK trading team — new head of investment appointed',
    summary:
      'Dentsu UK has appointed Sarah Mitchell as new Head of Investment, replacing David Chen who left for IPG. Mitchell is reportedly focused on data-driven trading deals and has signalled a review of all publisher preferred partner agreements in H2.',
    relevance: 'high',
    tags: ['Dentsu', 'trading', 'relationship', 'review'],
    recommendedAction:
      'James and Gary should request an introductory meeting with Sarah Mitchell before the Dentsu H2 pitch day on May 28th. Building the relationship early is critical.',
  },
];
