// Revenue Close — waterfall from booked → delivered → invoiced → collected

export interface RevenueWaterfall {
  stage: string;
  amount: number;
  color: string;
}

export interface WaterfallGap {
  from: string;
  to: string;
  gap: number;
  gapPercent: number;
  drivers: string[];
}

export interface UninvoicedRevenue {
  client: string;
  amount: number;
  daysDelivered: number;
  status: 'pending' | 'blocked' | 'in-review';
  reason?: string;
}

export const revenueWaterfall: RevenueWaterfall[] = [
  { stage: 'Booked', amount: 14_200_000, color: '#6366f1' },
  { stage: 'Delivered', amount: 12_500_000, color: '#8b5cf6' },
  { stage: 'Invoiced', amount: 11_800_000, color: '#a78bfa' },
  { stage: 'Collected', amount: 10_400_000, color: '#c4b5fd' },
];

export const waterfallGaps: WaterfallGap[] = [
  {
    from: 'Booked',
    to: 'Delivered',
    gap: 1_700_000,
    gapPercent: 12.0,
    drivers: [
      'Campaigns not yet live (£820k)',
      'Paused / on-hold campaigns (£480k)',
      'Creative delays from agency (£400k)',
    ],
  },
  {
    from: 'Delivered',
    to: 'Invoiced',
    gap: 700_000,
    gapPercent: 5.6,
    drivers: [
      'Awaiting third-party verification (£280k)',
      'IO discrepancies / reconciliation (£240k)',
      'PO number missing from client (£180k)',
    ],
  },
  {
    from: 'Invoiced',
    to: 'Collected',
    gap: 1_400_000,
    gapPercent: 11.9,
    drivers: [
      'Standard payment terms not yet due (£680k)',
      'Aged debt > 30 days (£420k)',
      'Disputed invoices (£300k)',
    ],
  },
];

export const uninvoicedRevenue: UninvoicedRevenue[] = [
  {
    client: 'Samsung',
    amount: 180_000,
    daysDelivered: 22,
    status: 'pending',
    reason: 'Awaiting third-party ad-server reconciliation from DoubleClick',
  },
  {
    client: 'Pepsi',
    amount: 140_000,
    daysDelivered: 18,
    status: 'blocked',
    reason: 'PO number not received from Omnicom — chased twice',
  },
  {
    client: 'Audi',
    amount: 120_000,
    daysDelivered: 31,
    status: 'in-review',
    reason: 'Client querying impression discrepancy on Top Gear campaign',
  },
  {
    client: 'Toyota',
    amount: 96_000,
    daysDelivered: 14,
    status: 'pending',
    reason: 'Standard invoicing cycle — due to be raised this week',
  },
  {
    client: 'L\'Oréal',
    amount: 84_000,
    daysDelivered: 8,
    status: 'pending',
    reason: 'Campaign only recently completed; paperwork in progress',
  },
];

export const uninvoicedTotal = 700_000; // sum of top 5 uninvoiced items

export const revenueCloseSummary = {
  bookedTotal: 14_200_000,
  deliveredTotal: 12_500_000,
  invoicedTotal: 11_800_000,
  collectedTotal: 10_400_000,
  uninvoicedTotal: 700_000,
  collectionRate: 88.1, // collected / invoiced %
  dsoAverage: 42, // days sales outstanding
};
