// Performance/potential matrix and flight risk data
// Director Dashboard — Cohort (Immediate Media Sales OS)

export interface TalentEntry {
  id: string;
  name: string;
  manager: string;
  team: string;
  performance: number;
  potential: number;
  quadrant: 'star' | 'high-performer' | 'rising' | 'steady' | 'at-risk' | 'underperformer';
  tenure: number;
  quotaAttainment: number[];
  flightRisk: 'low' | 'medium' | 'high';
  flightRiskReasons?: string[];
  lastPromotion?: string;
  engagementScore: number;
  meetingsLogged: number;
  pipelineActivity: number;
}

export const talentData: TalentEntry[] = [
  // ── Rachel's Team ──────────────────────────────────────────────
  {
    id: 'tal-001',
    name: 'Alicia',
    manager: 'Rachel',
    team: 'Team Rachel',
    performance: 91,
    potential: 88,
    quadrant: 'star',
    tenure: 28,
    quotaAttainment: [108, 112, 105, 118],
    flightRisk: 'low',
    lastPromotion: '2025-06-01',
    engagementScore: 87,
    meetingsLogged: 34,
    pipelineActivity: 19,
  },
  {
    id: 'tal-002',
    name: 'Renita',
    manager: 'Rachel',
    team: 'Team Rachel',
    performance: 64,
    potential: 58,
    quadrant: 'steady',
    tenure: 14,
    quotaAttainment: [88, 92, 85, 90],
    flightRisk: 'medium',
    flightRiskReasons: ['Below benchmark comp', 'Limited progression path in current team'],
    lastPromotion: undefined,
    engagementScore: 62,
    meetingsLogged: 18,
    pipelineActivity: 11,
  },

  // ── Gary's Team ────────────────────────────────────────────────
  {
    id: 'tal-003',
    name: 'Marcus',
    manager: 'Gary',
    team: 'Team Gary',
    performance: 95,
    potential: 90,
    quadrant: 'star',
    tenure: 36,
    quotaAttainment: [115, 122, 118, 126],
    flightRisk: 'low',
    lastPromotion: '2025-01-15',
    engagementScore: 91,
    meetingsLogged: 42,
    pipelineActivity: 24,
  },
  {
    id: 'tal-004',
    name: 'Sarah',
    manager: 'Gary',
    team: 'Team Gary',
    performance: 72,
    potential: 80,
    quadrant: 'rising',
    tenure: 8,
    quotaAttainment: [78, 85, 91, 96],
    flightRisk: 'low',
    lastPromotion: undefined,
    engagementScore: 79,
    meetingsLogged: 26,
    pipelineActivity: 16,
  },
  {
    id: 'tal-005',
    name: 'Tom',
    manager: 'Gary',
    team: 'Team Gary',
    performance: 38,
    potential: 42,
    quadrant: 'at-risk',
    tenure: 42,
    quotaAttainment: [95, 82, 74, 68],
    flightRisk: 'high',
    flightRiskReasons: [
      '3 quarters declining quota attainment',
      'Comp below market median',
      'Disengaged in team meetings',
    ],
    lastPromotion: '2023-09-01',
    engagementScore: 41,
    meetingsLogged: 8,
    pipelineActivity: 5,
  },

  // ── Elise's Team ───────────────────────────────────────────────
  {
    id: 'tal-006',
    name: 'Priya',
    manager: 'Elise',
    team: 'Team Elise',
    performance: 82,
    potential: 70,
    quadrant: 'high-performer',
    tenure: 22,
    quotaAttainment: [102, 98, 106, 104],
    flightRisk: 'medium',
    flightRiskReasons: ['Passed over for promotion in Q1 cycle', 'Expressed interest in external roles'],
    lastPromotion: '2024-04-01',
    engagementScore: 58,
    meetingsLogged: 22,
    pipelineActivity: 14,
  },
  {
    id: 'tal-007',
    name: 'Dan',
    manager: 'Elise',
    team: 'Team Elise',
    performance: 30,
    potential: 35,
    quadrant: 'underperformer',
    tenure: 6,
    quotaAttainment: [42, 55, 61, 68],
    flightRisk: 'low',
    flightRiskReasons: ['New hire, still ramping'],
    lastPromotion: undefined,
    engagementScore: 72,
    meetingsLogged: 20,
    pipelineActivity: 9,
  },
];
