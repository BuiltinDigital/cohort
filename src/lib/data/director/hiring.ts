// Open roles and hiring pipeline metrics
// Director Dashboard — Cohort (Immediate Media Sales OS)

export interface OpenRole {
  id: string;
  title: string;
  team: string;
  manager: string;
  level: string;
  status: 'open' | 'interviewing' | 'offer-stage' | 'filled';
  daysOpen: number;
  candidates: number;
  targetStartDate: string;
  priority: 'critical' | 'high' | 'normal';
}

export interface HiringMetrics {
  openRoles: number;
  avgDaysToFill: number;
  offerAcceptRate: number;
  pipelineCandidates: number;
}

export const openRoles: OpenRole[] = [
  {
    id: 'role-001',
    title: 'Senior Account Manager',
    team: 'Team Elise',
    manager: 'Elise',
    level: 'Senior',
    status: 'interviewing',
    daysOpen: 34,
    candidates: 12,
    targetStartDate: '2026-06-01',
    priority: 'critical',
  },
  {
    id: 'role-002',
    title: 'Digital Sales Executive',
    team: 'Team Gary',
    manager: 'Gary',
    level: 'Mid',
    status: 'interviewing',
    daysOpen: 18,
    candidates: 8,
    targetStartDate: '2026-06-15',
    priority: 'high',
  },
  {
    id: 'role-003',
    title: 'Sales Coordinator',
    team: 'Team Rachel',
    manager: 'Rachel',
    level: 'Junior',
    status: 'open',
    daysOpen: 7,
    candidates: 22,
    targetStartDate: '2026-07-01',
    priority: 'normal',
  },
  {
    id: 'role-004',
    title: 'Head of Programmatic Sales',
    team: 'Central',
    manager: 'Director',
    level: 'Head of',
    status: 'offer-stage',
    daysOpen: 45,
    candidates: 5,
    targetStartDate: '2026-05-19',
    priority: 'critical',
  },
];

export const hiringMetrics: HiringMetrics = {
  openRoles: 4,
  avgDaysToFill: 26,
  offerAcceptRate: 0.78,
  pipelineCandidates: 47,
};
