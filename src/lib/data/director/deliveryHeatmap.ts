// Delivery score heatmap: team × agency conglomerate
// Director Dashboard — Cohort (Immediate Media Sales OS)

export interface HeatmapCell {
  team: string;
  entity: string;
  score: number;
  campaigns: number;
  revenue: number;
}

export interface HeatmapRow {
  team: string;
  manager: string;
  cells: HeatmapCell[];
  avgScore: number;
}

export const heatmapEntities = [
  'Publicis',
  'Omnicom',
  'WPP',
  'Dentsu',
  'Havas',
  'IPG',
] as const;

export const heatmapData: HeatmapRow[] = [
  {
    team: 'Team Rachel',
    manager: 'Rachel',
    cells: [
      { team: 'Team Rachel', entity: 'Publicis', score: 88, campaigns: 14, revenue: 820_000 },
      { team: 'Team Rachel', entity: 'Omnicom', score: 85, campaigns: 11, revenue: 645_000 },
      { team: 'Team Rachel', entity: 'WPP', score: 0, campaigns: 0, revenue: 0 },
      { team: 'Team Rachel', entity: 'Dentsu', score: 0, campaigns: 0, revenue: 0 },
      { team: 'Team Rachel', entity: 'Havas', score: 79, campaigns: 6, revenue: 310_000 },
      { team: 'Team Rachel', entity: 'IPG', score: 82, campaigns: 8, revenue: 425_000 },
    ],
    avgScore: 83.5,
  },
  {
    team: 'Team Gary',
    manager: 'Gary',
    cells: [
      { team: 'Team Gary', entity: 'Publicis', score: 78, campaigns: 7, revenue: 390_000 },
      { team: 'Team Gary', entity: 'Omnicom', score: 81, campaigns: 9, revenue: 520_000 },
      { team: 'Team Gary', entity: 'WPP', score: 92, campaigns: 18, revenue: 1_120_000 },
      { team: 'Team Gary', entity: 'Dentsu', score: 89, campaigns: 13, revenue: 780_000 },
      { team: 'Team Gary', entity: 'Havas', score: 76, campaigns: 5, revenue: 270_000 },
      { team: 'Team Gary', entity: 'IPG', score: 74, campaigns: 4, revenue: 215_000 },
    ],
    avgScore: 81.7,
  },
  {
    team: 'Team Elise',
    manager: 'Elise',
    cells: [
      { team: 'Team Elise', entity: 'Publicis', score: 73, campaigns: 8, revenue: 365_000 },
      { team: 'Team Elise', entity: 'Omnicom', score: 70, campaigns: 6, revenue: 280_000 },
      { team: 'Team Elise', entity: 'WPP', score: 75, campaigns: 10, revenue: 440_000 },
      { team: 'Team Elise', entity: 'Dentsu', score: 72, campaigns: 5, revenue: 235_000 },
      { team: 'Team Elise', entity: 'Havas', score: 68, campaigns: 4, revenue: 175_000 },
      { team: 'Team Elise', entity: 'IPG', score: 71, campaigns: 7, revenue: 305_000 },
    ],
    avgScore: 71.5,
  },
];
