// ─── Client Data ─────────────────────────────────────────────────────────────
// Cohort — Immediate Media Sales OS

// ─── Interfaces ──────────────────────────────────────────────────────────────

export interface ClientContact {
  name: string;
  role: string;
  org: 'client' | 'agency';
  email: string;
  lastContact: string;
}

export interface ClientCampaign {
  name: string;
  dateRange: string;
  channel: string;
  contractValue: number;
  deliveredValue: number;
  deliveryPercent: number;
  status: 'completed' | 'live' | 'scheduled';
}

export interface ActivityItem {
  type: 'meeting' | 'email' | 'campaign-launch' | 'renewal' | 'pitch-won' | 'pitch-lost';
  title: string;
  date: string;
  description: string;
}

export interface ClientContract {
  name: string;
  value: number;
  startDate: string;
  endDate: string;
  renewalDate: string;
  status: 'active' | 'expiring-soon' | 'expired';
}

export interface Client {
  id: string;
  slug: string;
  name: string;
  category: string;
  agency: string;
  owner: 'Alicia' | 'Renita';
  lifetimeSpend: number;
  campaignCount: number;
  activeCommitments: number;
  lastActive: string;
  spendTimeline: { quarter: string; spend: number }[];
  channelMix: { channel: string; percent: number }[];
  avgDeliveryPercent: number;
  campaigns: ClientCampaign[];
  contacts: ClientContact[];
  activity: ActivityItem[];
  contracts: ClientContract[];
}

export interface ClientListItem {
  slug: string;
  name: string;
  category: string;
  agency: string;
  owner: string;
  lifetimeSpend: number;
  status: 'active' | 'lapsed';
}

// ─── Detailed Clients ────────────────────────────────────────────────────────

export const clients: Client[] = [
  // ── 1. Audi ──────────────────────────────────────────────────────────────
  {
    id: 'client-001',
    slug: 'audi',
    name: 'Audi',
    category: 'Automotive',
    agency: 'Starcom',
    owner: 'Alicia',
    lifetimeSpend: 2_800_000,
    campaignCount: 22,
    activeCommitments: 2,
    lastActive: '2026-04-14',
    spendTimeline: [
      { quarter: 'Q3 2024', spend: 120_000 },
      { quarter: 'Q4 2024', spend: 135_000 },
      { quarter: 'Q1 2025', spend: 140_000 },
      { quarter: 'Q2 2025', spend: 155_000 },
      { quarter: 'Q3 2025', spend: 160_000 },
      { quarter: 'Q4 2025', spend: 165_000 },
      { quarter: 'Q1 2026', spend: 175_000 },
      { quarter: 'Q2 2026', spend: 180_000 },
    ],
    channelMix: [
      { channel: 'Direct', percent: 45 },
      { channel: 'Programmatic', percent: 30 },
      { channel: 'Content', percent: 15 },
      { channel: 'Partnership', percent: 10 },
    ],
    avgDeliveryPercent: 94,
    campaigns: [
      {
        name: 'Audi — Easter Drive',
        dateRange: '2 Mar 2026 – 20 Apr 2026',
        channel: 'Direct',
        contractValue: 180_000,
        deliveredValue: 97_200,
        deliveryPercent: 54,
        status: 'live',
      },
      {
        name: 'Audi — Q-Range Launch',
        dateRange: '1 May 2026 – 30 Jun 2026',
        channel: 'Programmatic',
        contractValue: 160_000,
        deliveredValue: 0,
        deliveryPercent: 0,
        status: 'scheduled',
      },
      {
        name: 'Audi — Winter Test Drive',
        dateRange: '1 Nov 2025 – 22 Dec 2025',
        channel: 'Direct',
        contractValue: 145_000,
        deliveredValue: 145_000,
        deliveryPercent: 100,
        status: 'completed',
      },
      {
        name: 'Audi — Summer Sport',
        dateRange: '15 Jun 2025 – 31 Aug 2025',
        channel: 'Content',
        contractValue: 120_000,
        deliveredValue: 114_000,
        deliveryPercent: 95,
        status: 'completed',
      },
      {
        name: 'Audi — Electric Future Spotlight',
        dateRange: '1 Feb 2025 – 31 Mar 2025',
        channel: 'Partnership',
        contractValue: 95_000,
        deliveredValue: 95_000,
        deliveryPercent: 100,
        status: 'completed',
      },
    ],
    contacts: [
      {
        name: 'James Whitfield',
        role: 'Head of Media, Audi UK',
        org: 'client',
        email: 'j.whitfield@audi.co.uk',
        lastContact: '2026-04-14',
      },
      {
        name: 'Sophie Marchetti',
        role: 'Brand Manager, Audi UK',
        org: 'client',
        email: 's.marchetti@audi.co.uk',
        lastContact: '2026-03-28',
      },
      {
        name: 'Oliver Trent',
        role: 'Client Director, Starcom',
        org: 'agency',
        email: 'oliver.trent@starcomww.com',
        lastContact: '2026-04-10',
      },
      {
        name: 'Hannah Birch',
        role: 'Digital Lead, Starcom',
        org: 'agency',
        email: 'hannah.birch@starcomww.com',
        lastContact: '2026-04-02',
      },
    ],
    activity: [
      {
        type: 'meeting',
        title: 'Q-Range Launch briefing with Starcom',
        date: '2026-04-10',
        description: 'Briefed creative requirements for the Q-Range campaign. Agreed targeting and channel split.',
      },
      {
        type: 'campaign-launch',
        title: 'Easter Drive campaign went live',
        date: '2026-03-02',
        description: 'Direct display campaign launched across Top Gear and BBC Good Food auto sections.',
      },
      {
        type: 'email',
        title: 'Delivery pacing check sent to Oliver Trent',
        date: '2026-03-18',
        description: 'Flagged Easter Drive at 32% delivery with 55% of flight elapsed. Recommended optimisation.',
      },
      {
        type: 'pitch-won',
        title: 'Won Q-Range Launch brief',
        date: '2026-02-14',
        description: 'Competitive pitch against Hearst and Future. Won on audience reach and content proposition.',
      },
      {
        type: 'renewal',
        title: 'Annual partnership contract renewed',
        date: '2025-09-01',
        description: 'Renewed 12-month partnership at £680k, 8% uplift on prior year.',
      },
      {
        type: 'meeting',
        title: 'QBR with Audi UK marketing team',
        date: '2025-07-15',
        description: 'Presented H1 2025 results. Audi pleased with content engagement metrics.',
      },
    ],
    contracts: [
      {
        name: 'Audi UK Annual Partnership 2025–26',
        value: 680_000,
        startDate: '2025-09-01',
        endDate: '2026-08-31',
        renewalDate: '2026-07-01',
        status: 'expiring-soon',
      },
    ],
  },

  // ── 2. Waitrose ──────────────────────────────────────────────────────────
  {
    id: 'client-002',
    slug: 'waitrose',
    name: 'Waitrose',
    category: 'Retail / Food',
    agency: 'Starcom',
    owner: 'Alicia',
    lifetimeSpend: 2_100_000,
    campaignCount: 14,
    activeCommitments: 1,
    lastActive: '2026-04-11',
    spendTimeline: [
      { quarter: 'Q3 2024', spend: 85_000 },
      { quarter: 'Q4 2024', spend: 95_000 },
      { quarter: 'Q1 2025', spend: 105_000 },
      { quarter: 'Q2 2025', spend: 110_000 },
      { quarter: 'Q3 2025', spend: 125_000 },
      { quarter: 'Q4 2025', spend: 140_000 },
      { quarter: 'Q1 2026', spend: 145_000 },
      { quarter: 'Q2 2026', spend: 155_000 },
    ],
    channelMix: [
      { channel: 'Content', percent: 50 },
      { channel: 'Direct', percent: 25 },
      { channel: 'Programmatic', percent: 15 },
      { channel: 'Partnership', percent: 10 },
    ],
    avgDeliveryPercent: 97,
    campaigns: [
      {
        name: 'Waitrose — Spring Recipe Collection',
        dateRange: '10 Mar 2026 – 30 Apr 2026',
        channel: 'Content',
        contractValue: 110_000,
        deliveredValue: 66_000,
        deliveryPercent: 60,
        status: 'live',
      },
      {
        name: 'Waitrose — Christmas Entertaining',
        dateRange: '1 Nov 2025 – 24 Dec 2025',
        channel: 'Content',
        contractValue: 140_000,
        deliveredValue: 140_000,
        deliveryPercent: 100,
        status: 'completed',
      },
      {
        name: 'Waitrose — Summer BBQ Series',
        dateRange: '1 Jun 2025 – 31 Aug 2025',
        channel: 'Direct',
        contractValue: 95_000,
        deliveredValue: 95_000,
        deliveryPercent: 100,
        status: 'completed',
      },
      {
        name: 'Waitrose — Organic Range Spotlight',
        dateRange: '15 Jan 2025 – 28 Feb 2025',
        channel: 'Partnership',
        contractValue: 70_000,
        deliveredValue: 68_600,
        deliveryPercent: 98,
        status: 'completed',
      },
      {
        name: 'Waitrose — Autumn Baking',
        dateRange: '1 Sep 2024 – 31 Oct 2024',
        channel: 'Content',
        contractValue: 85_000,
        deliveredValue: 85_000,
        deliveryPercent: 100,
        status: 'completed',
      },
    ],
    contacts: [
      {
        name: 'Eleanor Graves',
        role: 'Head of Brand Partnerships, Waitrose',
        org: 'client',
        email: 'eleanor.graves@waitrose.co.uk',
        lastContact: '2026-04-11',
      },
      {
        name: 'Tom Hadley',
        role: 'Marketing Manager, Waitrose',
        org: 'client',
        email: 'tom.hadley@waitrose.co.uk',
        lastContact: '2026-03-20',
      },
      {
        name: 'Oliver Trent',
        role: 'Client Director, Starcom',
        org: 'agency',
        email: 'oliver.trent@starcomww.com',
        lastContact: '2026-04-08',
      },
      {
        name: 'Lucy Pemberton',
        role: 'Planning Manager, Starcom',
        org: 'agency',
        email: 'lucy.pemberton@starcomww.com',
        lastContact: '2026-03-25',
      },
    ],
    activity: [
      {
        type: 'campaign-launch',
        title: 'Spring Recipe Collection launched',
        date: '2026-03-10',
        description: 'Content-led campaign across BBC Good Food featuring seasonal Waitrose ingredients.',
      },
      {
        type: 'meeting',
        title: 'H2 planning session with Waitrose',
        date: '2026-02-18',
        description: 'Discussed autumn/winter content calendar and potential Christmas partnership expansion.',
      },
      {
        type: 'email',
        title: 'Spring campaign creative approval',
        date: '2026-02-25',
        description: 'Eleanor signed off recipe series creative. Production to begin early March.',
      },
      {
        type: 'renewal',
        title: 'Content partnership renewed for 2026',
        date: '2025-12-15',
        description: 'Renewed annual BBC Good Food content deal at £520k, a 12% uplift year-on-year.',
      },
      {
        type: 'pitch-won',
        title: 'Won Christmas Entertaining brief',
        date: '2025-08-20',
        description: 'Won against Conde Nast. Waitrose valued BBC Good Food audience alignment.',
      },
      {
        type: 'meeting',
        title: 'QBR with Waitrose brand team',
        date: '2025-06-10',
        description: 'Reviewed H1 content performance. Recipe engagement 22% above benchmark.',
      },
    ],
    contracts: [
      {
        name: 'Waitrose x BBC Good Food Content Partnership 2026',
        value: 520_000,
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        renewalDate: '2026-10-01',
        status: 'active',
      },
    ],
  },

  // ── 3. Samsung ───────────────────────────────────────────────────────────
  {
    id: 'client-003',
    slug: 'samsung',
    name: 'Samsung',
    category: 'Electronics',
    agency: 'Starcom',
    owner: 'Alicia',
    lifetimeSpend: 3_400_000,
    campaignCount: 18,
    activeCommitments: 3,
    lastActive: '2026-04-16',
    spendTimeline: [
      { quarter: 'Q3 2024', spend: 180_000 },
      { quarter: 'Q4 2024', spend: 210_000 },
      { quarter: 'Q1 2025', spend: 195_000 },
      { quarter: 'Q2 2025', spend: 220_000 },
      { quarter: 'Q3 2025', spend: 230_000 },
      { quarter: 'Q4 2025', spend: 250_000 },
      { quarter: 'Q1 2026', spend: 260_000 },
      { quarter: 'Q2 2026', spend: 275_000 },
    ],
    channelMix: [
      { channel: 'Direct', percent: 35 },
      { channel: 'Programmatic', percent: 30 },
      { channel: 'Content', percent: 20 },
      { channel: 'Partnership', percent: 15 },
    ],
    avgDeliveryPercent: 96,
    campaigns: [
      {
        name: 'Samsung — Galaxy S26 Launch',
        dateRange: '15 Mar 2026 – 15 May 2026',
        channel: 'Direct',
        contractValue: 220_000,
        deliveredValue: 110_000,
        deliveryPercent: 50,
        status: 'live',
      },
      {
        name: 'Samsung — Smart Home Hub',
        dateRange: '1 Apr 2026 – 30 Jun 2026',
        channel: 'Content',
        contractValue: 150_000,
        deliveredValue: 22_500,
        deliveryPercent: 15,
        status: 'live',
      },
      {
        name: 'Samsung — Summer Audio Push',
        dateRange: '1 Jun 2026 – 31 Aug 2026',
        channel: 'Programmatic',
        contractValue: 130_000,
        deliveredValue: 0,
        deliveryPercent: 0,
        status: 'scheduled',
      },
      {
        name: 'Samsung — Black Friday Tech Deals',
        dateRange: '10 Nov 2025 – 2 Dec 2025',
        channel: 'Direct',
        contractValue: 195_000,
        deliveredValue: 195_000,
        deliveryPercent: 100,
        status: 'completed',
      },
      {
        name: 'Samsung — Galaxy Fold Feature',
        dateRange: '1 Jul 2025 – 30 Sep 2025',
        channel: 'Partnership',
        contractValue: 175_000,
        deliveredValue: 171_500,
        deliveryPercent: 98,
        status: 'completed',
      },
    ],
    contacts: [
      {
        name: 'Priya Kapoor',
        role: 'UK Media Director, Samsung',
        org: 'client',
        email: 'p.kapoor@samsung.com',
        lastContact: '2026-04-16',
      },
      {
        name: 'David Chen',
        role: 'Product Marketing Manager, Samsung',
        org: 'client',
        email: 'd.chen@samsung.com',
        lastContact: '2026-04-05',
      },
      {
        name: 'Rebecca Foyle',
        role: 'Senior Planner, Starcom',
        org: 'agency',
        email: 'rebecca.foyle@starcomww.com',
        lastContact: '2026-04-12',
      },
      {
        name: 'Oliver Trent',
        role: 'Client Director, Starcom',
        org: 'agency',
        email: 'oliver.trent@starcomww.com',
        lastContact: '2026-04-09',
      },
    ],
    activity: [
      {
        type: 'campaign-launch',
        title: 'Smart Home Hub content series launched',
        date: '2026-04-01',
        description: 'Content campaign across Radio Times and BBC Science Focus featuring Samsung SmartThings.',
      },
      {
        type: 'campaign-launch',
        title: 'Galaxy S26 Launch campaign went live',
        date: '2026-03-15',
        description: 'High-impact display takeovers across Top Gear, BBC Science Focus, and Radio Times.',
      },
      {
        type: 'meeting',
        title: 'Summer Audio Push planning call',
        date: '2026-03-05',
        description: 'Agreed programmatic strategy and audience segments for Galaxy Buds and soundbar range.',
      },
      {
        type: 'pitch-won',
        title: 'Won Galaxy S26 Launch brief',
        date: '2026-01-22',
        description: 'Samsung awarded full launch spend after strong proposal on tech-savvy audience reach.',
      },
      {
        type: 'email',
        title: 'Year-end performance summary sent',
        date: '2025-12-18',
        description: 'Shared 2025 wrap-up deck with Priya. All campaigns delivered 96%+ against contract.',
      },
      {
        type: 'renewal',
        title: 'Samsung framework agreement renewed',
        date: '2025-11-01',
        description: 'Renewed annual framework at £850k, largest single-client commitment on the book.',
      },
    ],
    contracts: [
      {
        name: 'Samsung UK Annual Framework 2025–26',
        value: 850_000,
        startDate: '2025-11-01',
        endDate: '2026-10-31',
        renewalDate: '2026-08-01',
        status: 'active',
      },
    ],
  },

  // ── 4. Toyota ────────────────────────────────────────────────────────────
  {
    id: 'client-004',
    slug: 'toyota',
    name: 'Toyota',
    category: 'Automotive',
    agency: 'Zenith',
    owner: 'Alicia',
    lifetimeSpend: 1_700_000,
    campaignCount: 11,
    activeCommitments: 1,
    lastActive: '2026-04-07',
    spendTimeline: [
      { quarter: 'Q3 2024', spend: 80_000 },
      { quarter: 'Q4 2024', spend: 90_000 },
      { quarter: 'Q1 2025', spend: 95_000 },
      { quarter: 'Q2 2025', spend: 100_000 },
      { quarter: 'Q3 2025', spend: 105_000 },
      { quarter: 'Q4 2025', spend: 115_000 },
      { quarter: 'Q1 2026', spend: 120_000 },
      { quarter: 'Q2 2026', spend: 125_000 },
    ],
    channelMix: [
      { channel: 'Direct', percent: 40 },
      { channel: 'Content', percent: 30 },
      { channel: 'Programmatic', percent: 20 },
      { channel: 'Partnership', percent: 10 },
    ],
    avgDeliveryPercent: 92,
    campaigns: [
      {
        name: 'Toyota — Hybrid Range Spring Push',
        dateRange: '1 Mar 2026 – 31 May 2026',
        channel: 'Direct',
        contractValue: 125_000,
        deliveredValue: 62_500,
        deliveryPercent: 50,
        status: 'live',
      },
      {
        name: 'Toyota — GR Yaris Feature',
        dateRange: '1 Oct 2025 – 30 Nov 2025',
        channel: 'Content',
        contractValue: 90_000,
        deliveredValue: 90_000,
        deliveryPercent: 100,
        status: 'completed',
      },
      {
        name: 'Toyota — RAV4 Adventure',
        dateRange: '15 Jun 2025 – 15 Aug 2025',
        channel: 'Direct',
        contractValue: 100_000,
        deliveredValue: 92_000,
        deliveryPercent: 92,
        status: 'completed',
      },
      {
        name: 'Toyota — Electric Futures',
        dateRange: '1 Feb 2025 – 31 Mar 2025',
        channel: 'Partnership',
        contractValue: 75_000,
        deliveredValue: 67_500,
        deliveryPercent: 90,
        status: 'completed',
      },
      {
        name: 'Toyota — Autumn Deals',
        dateRange: '1 Sep 2024 – 31 Oct 2024',
        channel: 'Programmatic',
        contractValue: 80_000,
        deliveredValue: 76_000,
        deliveryPercent: 95,
        status: 'completed',
      },
    ],
    contacts: [
      {
        name: 'Mark Hargreaves',
        role: 'Media Planning Lead, Toyota GB',
        org: 'client',
        email: 'm.hargreaves@toyota.co.uk',
        lastContact: '2026-04-07',
      },
      {
        name: 'Claire Donovan',
        role: 'Marketing Director, Toyota GB',
        org: 'client',
        email: 'c.donovan@toyota.co.uk',
        lastContact: '2026-03-12',
      },
      {
        name: 'Nathan Cross',
        role: 'Account Director, Zenith',
        org: 'agency',
        email: 'nathan.cross@zenithmedia.com',
        lastContact: '2026-04-03',
      },
      {
        name: 'Aimee Sutherland',
        role: 'Digital Planner, Zenith',
        org: 'agency',
        email: 'aimee.sutherland@zenithmedia.com',
        lastContact: '2026-03-20',
      },
    ],
    activity: [
      {
        type: 'campaign-launch',
        title: 'Hybrid Range Spring Push launched',
        date: '2026-03-01',
        description: 'Display-led campaign across Top Gear promoting Toyota hybrid line-up.',
      },
      {
        type: 'meeting',
        title: 'H2 2026 planning with Zenith',
        date: '2026-02-20',
        description: 'Early discussion on autumn plans. Toyota considering expanded content investment.',
      },
      {
        type: 'email',
        title: 'GR Yaris campaign wrap-up shared',
        date: '2025-12-05',
        description: 'Final report sent to Mark. Strong engagement on video content, CTR 1.8%.',
      },
      {
        type: 'pitch-won',
        title: 'Won Hybrid Range Spring brief',
        date: '2025-12-18',
        description: 'Zenith recommended Immediate for automotive audience reach. Won against Dennis.',
      },
      {
        type: 'renewal',
        title: 'Toyota display deal renewed',
        date: '2025-08-15',
        description: 'Renewed annual display commitment at £420k for Top Gear inventory.',
      },
      {
        type: 'meeting',
        title: 'Mid-year review with Toyota GB',
        date: '2025-06-25',
        description: 'Reviewed H1 delivery at 93%. Toyota satisfied, discussed adding content layer.',
      },
    ],
    contracts: [
      {
        name: 'Toyota x Top Gear Display 2025–26',
        value: 420_000,
        startDate: '2025-09-01',
        endDate: '2026-08-31',
        renewalDate: '2026-06-15',
        status: 'active',
      },
    ],
  },

  // ── 5. Pepsi ─────────────────────────────────────────────────────────────
  {
    id: 'client-005',
    slug: 'pepsi',
    name: 'Pepsi',
    category: 'FMCG',
    agency: 'OMD',
    owner: 'Renita',
    lifetimeSpend: 1_400_000,
    campaignCount: 9,
    activeCommitments: 1,
    lastActive: '2026-04-15',
    spendTimeline: [
      { quarter: 'Q3 2024', spend: 70_000 },
      { quarter: 'Q4 2024', spend: 60_000 },
      { quarter: 'Q1 2025', spend: 80_000 },
      { quarter: 'Q2 2025', spend: 95_000 },
      { quarter: 'Q3 2025', spend: 85_000 },
      { quarter: 'Q4 2025', spend: 75_000 },
      { quarter: 'Q1 2026', spend: 90_000 },
      { quarter: 'Q2 2026', spend: 100_000 },
    ],
    channelMix: [
      { channel: 'Direct', percent: 30 },
      { channel: 'Programmatic', percent: 35 },
      { channel: 'Content', percent: 20 },
      { channel: 'Partnership', percent: 15 },
    ],
    avgDeliveryPercent: 88,
    campaigns: [
      {
        name: 'Pepsi — Summer Sizzle',
        dateRange: '1 Apr 2026 – 31 Jul 2026',
        channel: 'Direct',
        contractValue: 100_000,
        deliveredValue: 12_000,
        deliveryPercent: 12,
        status: 'live',
      },
      {
        name: 'Pepsi — New Year Fizz',
        dateRange: '2 Jan 2026 – 28 Feb 2026',
        channel: 'Programmatic',
        contractValue: 80_000,
        deliveredValue: 72_000,
        deliveryPercent: 90,
        status: 'completed',
      },
      {
        name: 'Pepsi — Autumn Crunch',
        dateRange: '1 Sep 2025 – 31 Oct 2025',
        channel: 'Direct',
        contractValue: 75_000,
        deliveredValue: 63_750,
        deliveryPercent: 85,
        status: 'completed',
      },
      {
        name: 'Pepsi — Festival Season',
        dateRange: '1 Jun 2025 – 31 Aug 2025',
        channel: 'Content',
        contractValue: 90_000,
        deliveredValue: 81_000,
        deliveryPercent: 90,
        status: 'completed',
      },
      {
        name: 'Pepsi — Super Bowl Tie-In',
        dateRange: '1 Feb 2025 – 15 Mar 2025',
        channel: 'Partnership',
        contractValue: 65_000,
        deliveredValue: 58_500,
        deliveryPercent: 90,
        status: 'completed',
      },
    ],
    contacts: [
      {
        name: 'Gemma Holt',
        role: 'Senior Brand Manager, PepsiCo UK',
        org: 'client',
        email: 'gemma.holt@pepsico.com',
        lastContact: '2026-04-15',
      },
      {
        name: 'Ryan Mulligan',
        role: 'Shopper Marketing Lead, PepsiCo UK',
        org: 'client',
        email: 'ryan.mulligan@pepsico.com',
        lastContact: '2026-03-22',
      },
      {
        name: 'Fiona Byrne',
        role: 'Group Account Director, OMD',
        org: 'agency',
        email: 'fiona.byrne@omd.com',
        lastContact: '2026-04-12',
      },
      {
        name: 'Jake Ellison',
        role: 'Digital Activation Lead, OMD',
        org: 'agency',
        email: 'jake.ellison@omd.com',
        lastContact: '2026-04-01',
      },
    ],
    activity: [
      {
        type: 'campaign-launch',
        title: 'Summer Sizzle campaign launched',
        date: '2026-04-01',
        description: 'Display campaign across BBC Good Food and Radio Times. Early pacing is behind target.',
      },
      {
        type: 'email',
        title: 'Pacing alert sent to Fiona Byrne',
        date: '2026-04-15',
        description: 'Summer Sizzle at 12% delivery after two weeks. Flagged as at-risk, proposed optimisations.',
      },
      {
        type: 'meeting',
        title: 'Summer Sizzle kick-off call',
        date: '2026-03-18',
        description: 'Aligned on targeting, creative assets, and flight plan with OMD and PepsiCo.',
      },
      {
        type: 'pitch-won',
        title: 'Won Summer Sizzle brief',
        date: '2026-02-05',
        description: 'Beat Bauer Media on food audience proposition. Pepsi valued BBC Good Food alignment.',
      },
      {
        type: 'email',
        title: 'New Year Fizz final report sent',
        date: '2026-03-10',
        description: 'Campaign delivered 90% against contract. Gemma asked for learnings to feed into summer.',
      },
      {
        type: 'meeting',
        title: 'Annual review with PepsiCo marketing',
        date: '2025-11-20',
        description: 'Reviewed 2025 performance. Average delivery at 88%, PepsiCo want to see improvement.',
      },
    ],
    contracts: [
      {
        name: 'PepsiCo UK Digital Display 2026',
        value: 350_000,
        startDate: '2026-01-01',
        endDate: '2026-12-31',
        renewalDate: '2026-10-01',
        status: 'active',
      },
    ],
  },

  // ── 6. John Lewis ────────────────────────────────────────────────────────
  {
    id: 'client-006',
    slug: 'john-lewis',
    name: 'John Lewis',
    category: 'Retail',
    agency: 'Digitas',
    owner: 'Alicia',
    lifetimeSpend: 1_100_000,
    campaignCount: 8,
    activeCommitments: 1,
    lastActive: '2026-04-09',
    spendTimeline: [
      { quarter: 'Q3 2024', spend: 50_000 },
      { quarter: 'Q4 2024', spend: 75_000 },
      { quarter: 'Q1 2025', spend: 60_000 },
      { quarter: 'Q2 2025', spend: 65_000 },
      { quarter: 'Q3 2025', spend: 70_000 },
      { quarter: 'Q4 2025', spend: 95_000 },
      { quarter: 'Q1 2026', spend: 80_000 },
      { quarter: 'Q2 2026', spend: 85_000 },
    ],
    channelMix: [
      { channel: 'Content', percent: 40 },
      { channel: 'Direct', percent: 30 },
      { channel: 'Partnership', percent: 20 },
      { channel: 'Programmatic', percent: 10 },
    ],
    avgDeliveryPercent: 95,
    campaigns: [
      {
        name: 'John Lewis — Spring Interiors Edit',
        dateRange: '15 Mar 2026 – 15 May 2026',
        channel: 'Content',
        contractValue: 85_000,
        deliveredValue: 38_250,
        deliveryPercent: 45,
        status: 'live',
      },
      {
        name: 'John Lewis — Christmas Gift Guide',
        dateRange: '1 Nov 2025 – 24 Dec 2025',
        channel: 'Content',
        contractValue: 95_000,
        deliveredValue: 95_000,
        deliveryPercent: 100,
        status: 'completed',
      },
      {
        name: 'John Lewis — Back to School',
        dateRange: '1 Aug 2025 – 15 Sep 2025',
        channel: 'Direct',
        contractValue: 55_000,
        deliveredValue: 53_350,
        deliveryPercent: 97,
        status: 'completed',
      },
      {
        name: 'John Lewis — Summer Home & Garden',
        dateRange: '1 May 2025 – 30 Jun 2025',
        channel: 'Partnership',
        contractValue: 65_000,
        deliveredValue: 61_750,
        deliveryPercent: 95,
        status: 'completed',
      },
      {
        name: 'John Lewis — Valentine\'s Gifting',
        dateRange: '20 Jan 2025 – 14 Feb 2025',
        channel: 'Direct',
        contractValue: 40_000,
        deliveredValue: 38_000,
        deliveryPercent: 95,
        status: 'completed',
      },
    ],
    contacts: [
      {
        name: 'Charlotte Ridley',
        role: 'Head of Partnerships, John Lewis',
        org: 'client',
        email: 'c.ridley@johnlewis.co.uk',
        lastContact: '2026-04-09',
      },
      {
        name: 'Ben Ashworth',
        role: 'Digital Marketing Manager, John Lewis',
        org: 'client',
        email: 'b.ashworth@johnlewis.co.uk',
        lastContact: '2026-03-15',
      },
      {
        name: 'Sarah Millward',
        role: 'Account Director, Digitas',
        org: 'agency',
        email: 'sarah.millward@digitas.com',
        lastContact: '2026-04-04',
      },
      {
        name: 'Kieran Walsh',
        role: 'Planning Lead, Digitas',
        org: 'agency',
        email: 'kieran.walsh@digitas.com',
        lastContact: '2026-03-28',
      },
    ],
    activity: [
      {
        type: 'campaign-launch',
        title: 'Spring Interiors Edit launched',
        date: '2026-03-15',
        description: 'Content series across Olive and BBC Good Food home sections. Strong early engagement.',
      },
      {
        type: 'meeting',
        title: 'Creative review with John Lewis team',
        date: '2026-03-05',
        description: 'Reviewed Spring Interiors creative. Charlotte happy with editorial integration approach.',
      },
      {
        type: 'email',
        title: 'Christmas Gift Guide wrap-up sent',
        date: '2026-01-10',
        description: 'Full delivery against contract. 2.1m page views, 34% above forecast.',
      },
      {
        type: 'pitch-won',
        title: 'Won Spring Interiors brief',
        date: '2026-01-28',
        description: 'Digitas recommended Immediate for home and lifestyle audience. Won against Hearst.',
      },
      {
        type: 'renewal',
        title: 'John Lewis content deal renewed',
        date: '2025-10-12',
        description: 'Renewed annual content partnership at £310k. Scope expanded to include Olive magazine.',
      },
      {
        type: 'meeting',
        title: 'Mid-year performance review',
        date: '2025-07-08',
        description: 'Shared H1 results. John Lewis appreciated content-first approach and audience quality.',
      },
    ],
    contracts: [
      {
        name: 'John Lewis Content Partnership 2025–26',
        value: 310_000,
        startDate: '2025-11-01',
        endDate: '2026-10-31',
        renewalDate: '2026-08-01',
        status: 'active',
      },
    ],
  },

  // ── 7. Virgin Atlantic ───────────────────────────────────────────────────
  {
    id: 'client-007',
    slug: 'virgin-atlantic',
    name: 'Virgin Atlantic',
    category: 'Travel',
    agency: 'Spark Foundry',
    owner: 'Alicia',
    lifetimeSpend: 960_000,
    campaignCount: 6,
    activeCommitments: 1,
    lastActive: '2026-04-13',
    spendTimeline: [
      { quarter: 'Q3 2024', spend: 40_000 },
      { quarter: 'Q4 2024', spend: 55_000 },
      { quarter: 'Q1 2025', spend: 60_000 },
      { quarter: 'Q2 2025', spend: 70_000 },
      { quarter: 'Q3 2025', spend: 75_000 },
      { quarter: 'Q4 2025', spend: 80_000 },
      { quarter: 'Q1 2026', spend: 90_000 },
      { quarter: 'Q2 2026', spend: 95_000 },
    ],
    channelMix: [
      { channel: 'Content', percent: 35 },
      { channel: 'Direct', percent: 30 },
      { channel: 'Programmatic', percent: 20 },
      { channel: 'Partnership', percent: 15 },
    ],
    avgDeliveryPercent: 102,
    campaigns: [
      {
        name: 'Virgin Atlantic — Long-Haul Luxury',
        dateRange: '1 Mar 2026 – 31 May 2026',
        channel: 'Content',
        contractValue: 95_000,
        deliveredValue: 57_000,
        deliveryPercent: 60,
        status: 'live',
      },
      {
        name: 'Virgin Atlantic — Winter Sun Escapes',
        dateRange: '15 Oct 2025 – 15 Dec 2025',
        channel: 'Direct',
        contractValue: 80_000,
        deliveredValue: 84_000,
        deliveryPercent: 105,
        status: 'completed',
      },
      {
        name: 'Virgin Atlantic — Caribbean Dreaming',
        dateRange: '1 Jun 2025 – 31 Aug 2025',
        channel: 'Content',
        contractValue: 70_000,
        deliveredValue: 73_500,
        deliveryPercent: 105,
        status: 'completed',
      },
      {
        name: 'Virgin Atlantic — Spring City Breaks',
        dateRange: '1 Mar 2025 – 30 Apr 2025',
        channel: 'Programmatic',
        contractValue: 55_000,
        deliveredValue: 55_000,
        deliveryPercent: 100,
        status: 'completed',
      },
      {
        name: 'Virgin Atlantic — Festive Flights',
        dateRange: '1 Nov 2024 – 20 Dec 2024',
        channel: 'Direct',
        contractValue: 50_000,
        deliveredValue: 50_000,
        deliveryPercent: 100,
        status: 'completed',
      },
    ],
    contacts: [
      {
        name: 'Isabel Thornton',
        role: 'Head of Media, Virgin Atlantic',
        org: 'client',
        email: 'isabel.thornton@fly.virgin.com',
        lastContact: '2026-04-13',
      },
      {
        name: 'George Latham',
        role: 'Brand Partnerships Manager, Virgin Atlantic',
        org: 'client',
        email: 'george.latham@fly.virgin.com',
        lastContact: '2026-03-28',
      },
      {
        name: 'Nina Okafor',
        role: 'Account Director, Spark Foundry',
        org: 'agency',
        email: 'nina.okafor@sparkfoundryww.com',
        lastContact: '2026-04-10',
      },
      {
        name: 'Daniel Reeves',
        role: 'Digital Strategist, Spark Foundry',
        org: 'agency',
        email: 'daniel.reeves@sparkfoundryww.com',
        lastContact: '2026-03-20',
      },
    ],
    activity: [
      {
        type: 'campaign-launch',
        title: 'Long-Haul Luxury campaign launched',
        date: '2026-03-01',
        description: 'Content-led campaign across Radio Times travel section. Early pacing ahead of target.',
      },
      {
        type: 'email',
        title: 'Overdelivery update sent to Isabel',
        date: '2026-04-13',
        description: 'Long-Haul Luxury at 60% delivery with 54% of flight elapsed. Trending to overdeliver.',
      },
      {
        type: 'meeting',
        title: 'Autumn campaign scoping with Spark Foundry',
        date: '2026-02-15',
        description: 'Discussed potential autumn/winter campaign. Virgin Atlantic keen to grow investment.',
      },
      {
        type: 'pitch-won',
        title: 'Won Long-Haul Luxury brief',
        date: '2026-01-10',
        description: 'Spark Foundry recommended Immediate for premium travel audience. Won sole-source.',
      },
      {
        type: 'renewal',
        title: 'Virgin Atlantic partnership extended',
        date: '2025-09-20',
        description: 'Extended annual deal to £280k, up from £220k. Added Radio Times to title portfolio.',
      },
      {
        type: 'meeting',
        title: 'QBR with Virgin Atlantic media team',
        date: '2025-07-22',
        description: 'H1 review showed 105% average delivery. Virgin Atlantic praised content quality.',
      },
    ],
    contracts: [
      {
        name: 'Virgin Atlantic x Immediate Travel Portfolio 2025–26',
        value: 280_000,
        startDate: '2025-10-01',
        endDate: '2026-09-30',
        renewalDate: '2026-07-15',
        status: 'active',
      },
    ],
  },
];

// ─── Client List (30 items) ──────────────────────────────────────────────────

export const clientList: ClientListItem[] = [
  // 7 detailed clients
  { slug: 'audi', name: 'Audi', category: 'Automotive', agency: 'Starcom', owner: 'Alicia', lifetimeSpend: 2_800_000, status: 'active' },
  { slug: 'waitrose', name: 'Waitrose', category: 'Retail / Food', agency: 'Starcom', owner: 'Alicia', lifetimeSpend: 2_100_000, status: 'active' },
  { slug: 'samsung', name: 'Samsung', category: 'Electronics', agency: 'Starcom', owner: 'Alicia', lifetimeSpend: 3_400_000, status: 'active' },
  { slug: 'toyota', name: 'Toyota', category: 'Automotive', agency: 'Zenith', owner: 'Alicia', lifetimeSpend: 1_700_000, status: 'active' },
  { slug: 'pepsi', name: 'Pepsi', category: 'FMCG', agency: 'OMD', owner: 'Renita', lifetimeSpend: 1_400_000, status: 'active' },
  { slug: 'john-lewis', name: 'John Lewis', category: 'Retail', agency: 'Digitas', owner: 'Alicia', lifetimeSpend: 1_100_000, status: 'active' },
  { slug: 'virgin-atlantic', name: 'Virgin Atlantic', category: 'Travel', agency: 'Spark Foundry', owner: 'Alicia', lifetimeSpend: 960_000, status: 'active' },

  // 23 additional clients
  { slug: 'loreal', name: 'L\'Or\u00e9al', category: 'Beauty', agency: 'Zenith', owner: 'Renita', lifetimeSpend: 1_850_000, status: 'active' },
  { slug: 'marks-and-spencer', name: 'M&S', category: 'Retail', agency: 'Mindshare', owner: 'Alicia', lifetimeSpend: 1_620_000, status: 'active' },
  { slug: 'ocado', name: 'Ocado', category: 'Retail / Food', agency: 'the7stars', owner: 'Renita', lifetimeSpend: 780_000, status: 'active' },
  { slug: 'charlotte-tilbury', name: 'Charlotte Tilbury', category: 'Beauty', agency: 'Starcom', owner: 'Alicia', lifetimeSpend: 540_000, status: 'active' },
  { slug: 'dyson', name: 'Dyson', category: 'Electronics', agency: 'Havas', owner: 'Alicia', lifetimeSpend: 920_000, status: 'active' },
  { slug: 'next', name: 'Next', category: 'Retail / Fashion', agency: 'Carat', owner: 'Renita', lifetimeSpend: 680_000, status: 'active' },
  { slug: 'specsavers', name: 'Specsavers', category: 'Healthcare', agency: 'Manning Gottlieb', owner: 'Alicia', lifetimeSpend: 450_000, status: 'active' },
  { slug: 'nespresso', name: 'Nespresso', category: 'FMCG', agency: 'Zenith', owner: 'Alicia', lifetimeSpend: 620_000, status: 'active' },
  { slug: 'easyjet', name: 'EasyJet', category: 'Travel', agency: 'VCCP Media', owner: 'Renita', lifetimeSpend: 510_000, status: 'active' },
  { slug: 'wickes', name: 'Wickes', category: 'Home & DIY', agency: 'Wavemaker', owner: 'Renita', lifetimeSpend: 340_000, status: 'lapsed' },
  { slug: 'citroen', name: 'Citro\u00ebn', category: 'Automotive', agency: 'Zenith', owner: 'Alicia', lifetimeSpend: 580_000, status: 'active' },
  { slug: 'homebase', name: 'Homebase', category: 'Home & DIY', agency: 'Goodstuff', owner: 'Renita', lifetimeSpend: 290_000, status: 'lapsed' },
  { slug: 'sky', name: 'Sky', category: 'Media & Entertainment', agency: 'MediaCom', owner: 'Alicia', lifetimeSpend: 1_380_000, status: 'active' },
  { slug: 'boots', name: 'Boots', category: 'Health & Beauty', agency: 'Wavemaker', owner: 'Renita', lifetimeSpend: 1_150_000, status: 'active' },
  { slug: 'volvo', name: 'Volvo', category: 'Automotive', agency: 'Mindshare', owner: 'Alicia', lifetimeSpend: 870_000, status: 'active' },
  { slug: 'hsbc', name: 'HSBC', category: 'Financial Services', agency: 'PHD', owner: 'Alicia', lifetimeSpend: 720_000, status: 'active' },
  { slug: 'hellofresh', name: 'HelloFresh', category: 'Food & Delivery', agency: 'the7stars', owner: 'Renita', lifetimeSpend: 430_000, status: 'active' },
  { slug: 'ebay', name: 'eBay', category: 'E-Commerce', agency: 'Essence Mediacom', owner: 'Renita', lifetimeSpend: 650_000, status: 'active' },
  { slug: 'amazon', name: 'Amazon', category: 'E-Commerce', agency: 'Initiative', owner: 'Alicia', lifetimeSpend: 2_200_000, status: 'active' },
  { slug: 'booking-com', name: 'Booking.com', category: 'Travel', agency: 'Starcom', owner: 'Alicia', lifetimeSpend: 890_000, status: 'active' },
  { slug: 'expedia', name: 'Expedia', category: 'Travel', agency: 'OMD', owner: 'Renita', lifetimeSpend: 560_000, status: 'lapsed' },
  { slug: 'monzo', name: 'Monzo', category: 'Financial Services', agency: 'In-House', owner: 'Renita', lifetimeSpend: 210_000, status: 'active' },
  { slug: 'hello-magazine', name: 'Hello Magazine', category: 'Media & Entertainment', agency: 'Havas', owner: 'Alicia', lifetimeSpend: 180_000, status: 'lapsed' },
];

// ─── Lookup Helper ───────────────────────────────────────────────────────────

export function getClientBySlug(slug: string): Client | undefined {
  return clients.find((c) => c.slug === slug);
}
