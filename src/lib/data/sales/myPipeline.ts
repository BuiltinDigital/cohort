// ─── My Pipeline ─────────────────────────────────────────────────────────────
// Cohort — Immediate Media Sales OS
// Alicia's 14 pipeline deals (individual rep view)

export interface MyDeal {
  id: string;
  name: string;
  advertiser: string;
  agency: string;
  value: number;
  stage: 'Prospecting' | 'Proposal' | 'Negotiation' | 'Verbal Yes' | 'Closed Won' | 'Closed Lost';
  probability: number;
  closeDate: string;
  daysInStage: number;
  nextStep: string;
  lastContact: string;
}

export const myPipeline: MyDeal[] = [
  // ── Prospecting (4 deals) ──────────────────────────────────────────────────
  {
    id: 'MD-001',
    name: 'BBC Good Food Summer Campaign',
    advertiser: 'Tesco',
    agency: 'Starcom',
    value: 220_000,
    stage: 'Prospecting',
    probability: 15,
    closeDate: '2026-08-14',
    daysInStage: 22,
    nextStep: 'Send category research deck to Karen Lee',
    lastContact: '2026-04-15',
  },
  {
    id: 'MD-002',
    name: 'Radio Times Autumn Preview Sponsorship',
    advertiser: 'Sky',
    agency: 'Zenith',
    value: 185_000,
    stage: 'Prospecting',
    probability: 10,
    closeDate: '2026-09-01',
    daysInStage: 14,
    nextStep: 'Schedule intro call with Sophie Brennan',
    lastContact: '2026-04-12',
  },
  {
    id: 'MD-003',
    name: 'HistoryExtra Podcast Sponsorship',
    advertiser: 'Audible',
    agency: 'Spark Foundry',
    value: 95_000,
    stage: 'Prospecting',
    probability: 20,
    closeDate: '2026-07-15',
    daysInStage: 12,
    nextStep: 'Follow-up call with Hannah Clarke on Wednesday',
    lastContact: '2026-04-16',
  },
  {
    id: 'MD-004',
    name: 'Top Gear Digital Display Q3',
    advertiser: 'BMW',
    agency: 'Zenith',
    value: 160_000,
    stage: 'Prospecting',
    probability: 10,
    closeDate: '2026-09-15',
    daysInStage: 25,
    nextStep: 'Prepare audience reach data pack for Daniel Okoro',
    lastContact: '2026-04-10',
  },

  // ── Proposal (4 deals) ────────────────────────────────────────────────────
  {
    id: 'MD-005',
    name: 'Radio Times Full-Page Print Q3',
    advertiser: 'BT',
    agency: 'Starcom',
    value: 210_000,
    stage: 'Proposal',
    probability: 40,
    closeDate: '2026-07-31',
    daysInStage: 12,
    nextStep: 'Chase Marcus Thorne for procurement feedback',
    lastContact: '2026-04-16',
  },
  {
    id: 'MD-006',
    name: 'BBC Good Food Newsletter Sponsorship',
    advertiser: 'HelloFresh',
    agency: 'Zenith',
    value: 120_000,
    stage: 'Proposal',
    probability: 50,
    closeDate: '2026-07-10',
    daysInStage: 18,
    nextStep: 'Share engagement case study deck',
    lastContact: '2026-04-17',
  },
  {
    id: 'MD-007',
    name: 'Top Gear EV Supplement',
    advertiser: 'Volkswagen',
    agency: 'Spark Foundry',
    value: 230_000,
    stage: 'Proposal',
    probability: 35,
    closeDate: '2026-08-22',
    daysInStage: 14,
    nextStep: 'Revise proposal with digital extension pricing',
    lastContact: '2026-04-12',
  },
  {
    id: 'MD-008',
    name: 'BBC Science Focus Innovation Awards',
    advertiser: 'Samsung',
    agency: 'Starcom',
    value: 200_000,
    stage: 'Proposal',
    probability: 40,
    closeDate: '2026-08-30',
    daysInStage: 13,
    nextStep: 'Present sponsorship tiers to Priya Shah',
    lastContact: '2026-04-15',
  },

  // ── Negotiation (2 deals) ──────────────────────────────────────────────────
  {
    id: 'MD-009',
    name: 'BBC Good Food Autumn Multi-platform',
    advertiser: 'Marks & Spencer',
    agency: 'Zenith',
    value: 260_000,
    stage: 'Negotiation',
    probability: 60,
    closeDate: '2026-07-18',
    daysInStage: 11,
    nextStep: 'Agree volume discount rate with M&S procurement',
    lastContact: '2026-04-17',
  },
  {
    id: 'MD-010',
    name: "Gardeners' World Summer Event Sponsorship",
    advertiser: 'Kew Gardens',
    agency: 'Digitas',
    value: 165_000,
    stage: 'Negotiation',
    probability: 70,
    closeDate: '2026-07-10',
    daysInStage: 8,
    nextStep: 'Await Kew legal sign-off on final terms',
    lastContact: '2026-04-17',
  },

  // ── Verbal Yes (2 deals) ───────────────────────────────────────────────────
  {
    id: 'MD-011',
    name: 'BBC Good Food Video Pre-roll H2',
    advertiser: 'Lurpak',
    agency: 'Starcom',
    value: 190_000,
    stage: 'Verbal Yes',
    probability: 85,
    closeDate: '2026-07-08',
    daysInStage: 5,
    nextStep: 'Chase IO from Karen Lee by Friday',
    lastContact: '2026-04-17',
  },
  {
    id: 'MD-012',
    name: 'HistoryExtra Branded Podcast Mini-series',
    advertiser: 'Penguin Random House',
    agency: 'Spark Foundry',
    value: 135_000,
    stage: 'Verbal Yes',
    probability: 75,
    closeDate: '2026-07-12',
    daysInStage: 9,
    nextStep: 'Resolve podcast licensing terms with legal',
    lastContact: '2026-04-15',
  },

  // ── Closed Won (2 recent deals) ───────────────────────────────────────────
  {
    id: 'MD-013',
    name: 'Radio Times Easter Special',
    advertiser: 'Cadbury',
    agency: 'Starcom',
    value: 95_000,
    stage: 'Closed Won',
    probability: 100,
    closeDate: '2026-03-20',
    daysInStage: 0,
    nextStep: 'Campaign live — monitor delivery pacing',
    lastContact: '2026-03-20',
  },
  {
    id: 'MD-014',
    name: 'BBC Good Food Air Fryer Guide',
    advertiser: 'Ninja',
    agency: 'Digitas',
    value: 115_000,
    stage: 'Closed Won',
    probability: 100,
    closeDate: '2026-04-12',
    daysInStage: 0,
    nextStep: 'Explore Q4 upsell — over-delivered on impressions',
    lastContact: '2026-04-12',
  },
];
