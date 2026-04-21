export interface Initiative {
  id: string;
  name: string;
  owner: string;
  budget: number;
  spent: number;
  progress: number; // 0-100
  status: 'green' | 'amber' | 'red';
  startDate: string;
  targetDate: string;
  nextMilestone: string;
  nextMilestoneDate: string;
  description: string;
  lastUpdate: string;
}

export const initiatives: Initiative[] = [
  {
    id: 'init-team-restructure',
    name: 'Team model restructure',
    owner: 'James',
    budget: 180_000,
    spent: 112_000,
    progress: 65,
    status: 'amber',
    startDate: '2025-09-01',
    targetDate: '2026-09-30',
    nextMilestone: 'Complete pilot group transition',
    nextMilestoneDate: '2026-05-31',
    description:
      'Restructure the direct sales team model from agency-aligned pods to a hybrid vertical/agency matrix. Aims to reduce single-point-of-failure risk and improve cross-sell between brands.',
    lastUpdate:
      'Pilot group (Gary\'s team) has adopted new structure. Early signs positive on cross-sell but delivery scores dipped during transition. Need to monitor before rolling out to Rachel\'s and Elise\'s teams.',
  },
  {
    id: 'init-digital-share-recovery',
    name: 'Digital share recovery programme',
    owner: 'James',
    budget: 420_000,
    spent: 148_000,
    progress: 35,
    status: 'green',
    startDate: '2026-01-15',
    targetDate: '2026-12-31',
    nextMilestone: 'Launch programmatic self-serve platform',
    nextMilestoneDate: '2026-06-30',
    description:
      'Multi-workstream programme to recover digital market share lost over the past 3 quarters. Includes self-serve programmatic platform, first-party data packaging, and digital-first sales training.',
    lastUpdate:
      'Self-serve platform in UAT with two agency partners. Digital training module 1 completed by 80% of sales team. On track for June launch but dependent on CTO team resource.',
  },
  {
    id: 'init-audience-data-platform',
    name: 'Audience data platform launch',
    owner: 'CTO',
    budget: 650_000,
    spent: 502_000,
    progress: 78,
    status: 'green',
    startDate: '2025-04-01',
    targetDate: '2026-06-30',
    nextMilestone: 'Beta with 3 agency partners',
    nextMilestoneDate: '2026-04-30',
    description:
      'Build and launch a first-party audience data platform leveraging logged-in user data across all Immediate titles. Enables premium CPM tiers and advertiser self-serve audience insights.',
    lastUpdate:
      'Platform core build complete. Onboarding Zenith, OMD, and Havas for closed beta in April. Data matching rates exceeding 72% target at 78%. Privacy review passed.',
  },
  {
    id: 'init-publicis-consolidation',
    name: 'Agency consolidation strategy — Publicis Group',
    owner: 'Rachel',
    budget: 50_000,
    spent: 22_000,
    progress: 45,
    status: 'amber',
    startDate: '2025-11-01',
    targetDate: '2026-08-31',
    nextMilestone: 'Group-level QBR with Publicis UK',
    nextMilestoneDate: '2026-05-15',
    description:
      'Develop a unified commercial strategy across all Publicis agencies (Starcom, Zenith, Spark Foundry) to arrest share-of-wallet decline and secure a group-level trading agreement.',
    lastUpdate:
      'Individual agency reviews completed. Share of wallet down to 6.4% across group. QBR with Publicis UK CEO confirmed for mid-May. Need compelling data story showing cross-title reach advantage.',
  },
  {
    id: 'init-hfss-pipeline-rebuild',
    name: 'HFSS-resilient advertiser pipeline rebuild',
    owner: 'Gary',
    budget: 80_000,
    spent: 16_000,
    progress: 20,
    status: 'red',
    startDate: '2026-02-01',
    targetDate: '2026-10-31',
    nextMilestone: 'Identify 15 non-HFSS verticals for outreach',
    nextMilestoneDate: '2026-05-31',
    description:
      'Proactively build pipeline in verticals unaffected by HFSS advertising restrictions to offset projected £1.8M revenue at risk from food and drink advertisers impacted by the regulations.',
    lastUpdate:
      'Initial vertical mapping underway but progress slower than planned. Gary\'s team stretched between BAU and this workstream. Only 4 of 15 target verticals scoped so far. Escalation likely needed.',
  },
];
