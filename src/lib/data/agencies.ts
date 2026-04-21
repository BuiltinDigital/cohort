// Cohort — Immediate Media Sales OS
// Agency data for Rachel's portfolio

export interface AgencyContact {
  name: string;
  role: string;
  email: string;
}

export interface Agency {
  id: string;
  slug: string;
  name: string;
  parentGroup: 'Publicis' | 'Omnicom';
  owner: string;
  immediateSpendQ: number;
  marketSpendQ: number;
  shareOfWallet: number;
  sowYoYDelta: number;
  topAdvertisers: { name: string; spend: number }[];
  contacts: AgencyContact[];
  healthScore: number;
  healthTrend: 'up' | 'flat' | 'down';
  nextActions: { label: string; date: string }[];
}

export interface AgencyGroup {
  name: string;
  owner: string;
  totalImmediateSpend: number;
  totalMarketSpend: number;
  shareOfWallet: number;
  agencies: string[];
}

// ---------------------------------------------------------------------------
// Publicis Group — Owner: Alicia
// ---------------------------------------------------------------------------

const starcom: Agency = {
  id: 'ag-starcom',
  slug: 'starcom',
  name: 'Starcom',
  parentGroup: 'Publicis',
  owner: 'Alicia',
  immediateSpendQ: 420_000,
  marketSpendQ: 2_800_000,
  shareOfWallet: 15.0,
  sowYoYDelta: 2.1,
  topAdvertisers: [
    { name: 'Audi', spend: 180_000 },
    { name: 'Samsung', spend: 140_000 },
    { name: 'Waitrose', spend: 84_000 },
    { name: 'Next (lapsed)', spend: 16_000 },
  ],
  contacts: [
    { name: 'Karen Lee', role: 'Group Business Director', email: 'karen.lee@starcom.co.uk' },
    { name: 'Marcus Thorne', role: 'Investment Lead', email: 'marcus.thorne@starcom.co.uk' },
    { name: 'Priya Shah', role: 'Digital Planner', email: 'priya.shah@starcom.co.uk' },
  ],
  healthScore: 82,
  healthTrend: 'up',
  nextActions: [
    { label: 'Audi H2 planning deck review', date: '2026-04-22' },
    { label: 'Samsung digital partnership call', date: '2026-05-06' },
    { label: 'Next re-engagement proposal', date: '2026-06-02' },
  ],
};

const zenith: Agency = {
  id: 'ag-zenith',
  slug: 'zenith',
  name: 'Zenith',
  parentGroup: 'Publicis',
  owner: 'Alicia',
  immediateSpendQ: 340_000,
  marketSpendQ: 3_100_000,
  shareOfWallet: 11.0,
  sowYoYDelta: 0.8,
  topAdvertisers: [
    { name: 'Toyota', spend: 260_000 },
    { name: 'Waitrose', spend: 80_000 },
  ],
  contacts: [
    { name: 'Tom Hadley', role: 'Client Partner', email: 'tom.hadley@zenith.co.uk' },
    { name: 'Sophie Brennan', role: 'Planning Director', email: 'sophie.brennan@zenith.co.uk' },
    { name: 'Daniel Okoro', role: 'Investment Manager', email: 'daniel.okoro@zenith.co.uk' },
  ],
  healthScore: 74,
  healthTrend: 'flat',
  nextActions: [
    { label: 'Toyota Q3 campaign brief alignment', date: '2026-04-28' },
    { label: 'Waitrose seasonal planning session', date: '2026-05-19' },
  ],
};

const sparkFoundry: Agency = {
  id: 'ag-spark-foundry',
  slug: 'spark-foundry',
  name: 'Spark Foundry',
  parentGroup: 'Publicis',
  owner: 'Alicia',
  immediateSpendQ: 280_000,
  marketSpendQ: 2_200_000,
  shareOfWallet: 12.7,
  sowYoYDelta: -0.4,
  topAdvertisers: [
    { name: 'Virgin Atlantic', spend: 240_000 },
    { name: 'Wickes', spend: 40_000 },
  ],
  contacts: [
    { name: 'Hannah Clarke', role: 'Business Director', email: 'hannah.clarke@sparkfoundry.co.uk' },
    { name: 'James Whitfield', role: 'Digital Activation Lead', email: 'james.whitfield@sparkfoundry.co.uk' },
    { name: 'Anika Patel', role: 'Senior Planner', email: 'anika.patel@sparkfoundry.co.uk' },
  ],
  healthScore: 78,
  healthTrend: 'up',
  nextActions: [
    { label: 'Virgin Atlantic summer campaign proposal', date: '2026-04-30' },
    { label: 'Wickes brand partnership review', date: '2026-05-14' },
    { label: 'Spark Foundry quarterly business review', date: '2026-06-10' },
  ],
};

const digitas: Agency = {
  id: 'ag-digitas',
  slug: 'digitas',
  name: 'Digitas',
  parentGroup: 'Publicis',
  owner: 'Alicia',
  immediateSpendQ: 180_000,
  marketSpendQ: 1_600_000,
  shareOfWallet: 11.3,
  sowYoYDelta: 1.2,
  topAdvertisers: [
    { name: 'John Lewis', spend: 130_000 },
    { name: 'Peloton (lapsed)', spend: 50_000 },
  ],
  contacts: [
    { name: 'Oliver Grant', role: 'Account Director', email: 'oliver.grant@digitas.co.uk' },
    { name: 'Fatima Hussain', role: 'Performance Lead', email: 'fatima.hussain@digitas.co.uk' },
    { name: 'Ben Cartwright', role: 'Strategy Manager', email: 'ben.cartwright@digitas.co.uk' },
  ],
  healthScore: 68,
  healthTrend: 'down',
  nextActions: [
    { label: 'John Lewis autumn content strategy pitch', date: '2026-05-05' },
    { label: 'Peloton win-back meeting', date: '2026-05-22' },
    { label: 'Digitas health-score recovery plan', date: '2026-06-08' },
  ],
};

// ---------------------------------------------------------------------------
// Omnicom Group — Owner: Renita
// ---------------------------------------------------------------------------

const omd: Agency = {
  id: 'ag-omd',
  slug: 'omd',
  name: 'OMD',
  parentGroup: 'Omnicom',
  owner: 'Renita',
  immediateSpendQ: 520_000,
  marketSpendQ: 4_200_000,
  shareOfWallet: 12.4,
  sowYoYDelta: 1.8,
  topAdvertisers: [
    { name: 'Pepsi', spend: 290_000 },
    { name: 'Toyota (backup)', spend: 120_000 },
    { name: 'EasyJet', spend: 110_000 },
  ],
  contacts: [
    { name: 'Laura Mitchell', role: 'Managing Partner', email: 'laura.mitchell@omd.co.uk' },
    { name: 'Chris Nwosu', role: 'Investment Director', email: 'chris.nwosu@omd.co.uk' },
    { name: 'Emma Richardson', role: 'Client Planner', email: 'emma.richardson@omd.co.uk' },
  ],
  healthScore: 86,
  healthTrend: 'up',
  nextActions: [
    { label: 'Pepsi summer activation sign-off', date: '2026-04-24' },
    { label: 'EasyJet travel-season proposal', date: '2026-05-12' },
    { label: 'OMD annual partnership review', date: '2026-06-16' },
  ],
};

const phd: Agency = {
  id: 'ag-phd',
  slug: 'phd',
  name: 'PHD',
  parentGroup: 'Omnicom',
  owner: 'Renita',
  immediateSpendQ: 310_000,
  marketSpendQ: 2_800_000,
  shareOfWallet: 11.1,
  sowYoYDelta: -0.3,
  topAdvertisers: [
    { name: "L'Or\u00e9al", spend: 210_000 },
    { name: 'Nespresso', spend: 100_000 },
  ],
  contacts: [
    { name: 'Rachel Simmons', role: 'Business Director', email: 'rachel.simmons@phd.co.uk' },
    { name: 'David Okonkwo', role: 'Planning Lead', email: 'david.okonkwo@phd.co.uk' },
    { name: 'Megan Foster', role: 'Activation Manager', email: 'megan.foster@phd.co.uk' },
  ],
  healthScore: 72,
  healthTrend: 'down',
  nextActions: [
    { label: "L'Or\u00e9al beauty campaign brief", date: '2026-04-27' },
    { label: 'Nespresso Q3 partnership renewal', date: '2026-05-18' },
  ],
};

const heartsAndScience: Agency = {
  id: 'ag-hearts-science',
  slug: 'hearts-and-science',
  name: 'Hearts & Science',
  parentGroup: 'Omnicom',
  owner: 'Renita',
  immediateSpendQ: 240_000,
  marketSpendQ: 1_900_000,
  shareOfWallet: 12.6,
  sowYoYDelta: 0.5,
  topAdvertisers: [
    { name: 'Homebase', spend: 140_000 },
    { name: 'M&S (backup)', spend: 100_000 },
  ],
  contacts: [
    { name: 'Sarah Townsend', role: 'Client Partner', email: 'sarah.townsend@heartsscience.co.uk' },
    { name: 'Ravi Sharma', role: 'Data & Planning Lead', email: 'ravi.sharma@heartsscience.co.uk' },
    { name: 'Lucy Edwards', role: 'Digital Strategist', email: 'lucy.edwards@heartsscience.co.uk' },
  ],
  healthScore: 76,
  healthTrend: 'flat',
  nextActions: [
    { label: 'Homebase spring/summer media plan', date: '2026-04-20' },
    { label: 'M&S cross-portfolio opportunity scoping', date: '2026-05-08' },
    { label: 'Hearts & Science QBR preparation', date: '2026-06-04' },
  ],
};

const mgmd: Agency = {
  id: 'ag-mgmd',
  slug: 'mgmd',
  name: 'MGMD',
  parentGroup: 'Omnicom',
  owner: 'Renita',
  immediateSpendQ: 160_000,
  marketSpendQ: 1_400_000,
  shareOfWallet: 11.4,
  sowYoYDelta: -0.8,
  topAdvertisers: [
    { name: 'Specsavers', spend: 100_000 },
    { name: 'Citroen', spend: 60_000 },
  ],
  contacts: [
    { name: 'Natalie Brooks', role: 'Account Director', email: 'natalie.brooks@mgmd.co.uk' },
    { name: 'George Adeyemi', role: 'Investment Manager', email: 'george.adeyemi@mgmd.co.uk' },
    { name: 'Claire Jennings', role: 'Planning Executive', email: 'claire.jennings@mgmd.co.uk' },
  ],
  healthScore: 64,
  healthTrend: 'down',
  nextActions: [
    { label: 'Specsavers awareness campaign pitch', date: '2026-05-01' },
    { label: 'Citroen brand re-evaluation call', date: '2026-05-28' },
    { label: 'MGMD health-score recovery workshop', date: '2026-06-15' },
  ],
};

// ---------------------------------------------------------------------------
// Exported arrays
// ---------------------------------------------------------------------------

export const agencies: Agency[] = [
  starcom,
  zenith,
  sparkFoundry,
  digitas,
  omd,
  phd,
  heartsAndScience,
  mgmd,
];

export const agencyGroups: AgencyGroup[] = [
  {
    name: 'Publicis Group',
    owner: 'Alicia',
    totalImmediateSpend: 1_220_000,
    totalMarketSpend: 9_700_000,
    shareOfWallet: 12.6,
    agencies: ['ag-starcom', 'ag-zenith', 'ag-spark-foundry', 'ag-digitas'],
  },
  {
    name: 'Omnicom Group',
    owner: 'Renita',
    totalImmediateSpend: 1_230_000,
    totalMarketSpend: 10_300_000,
    shareOfWallet: 11.9,
    agencies: ['ag-omd', 'ag-phd', 'ag-hearts-science', 'ag-mgmd'],
  },
];
