export interface StrategicRisk {
  id: string;
  category: 'market-share' | 'client-retention' | 'talent' | 'competitive' | 'financial';
  severity: 'critical' | 'high' | 'medium';
  title: string;
  detail: string;
  metric: string;
  trend: 'worsening' | 'stable' | 'improving';
  owner: string;
  recommendedAction: string;
  impactIfIgnored: string;
}

export const strategicRisks: StrategicRisk[] = [
  {
    id: 'risk-digital-share',
    category: 'market-share',
    severity: 'critical',
    title: 'Digital market share declining',
    detail:
      'Our digital display and programmatic market share has contracted for two consecutive quarters, driven by competitor investment in automated buying and self-serve platforms.',
    metric: '-1.5pts QoQ',
    trend: 'worsening',
    owner: 'James',
    recommendedAction: 'Accelerate digital share recovery programme',
    impactIfIgnored:
      'Could lose #3 position to News UK within 2 quarters',
  },
  {
    id: 'risk-publicis-wallet',
    category: 'client-retention',
    severity: 'high',
    title: 'Share of wallet declining at Publicis Group',
    detail:
      'Publicis agencies are shifting incremental budgets to competitor titles. QBR attendance from senior Publicis stakeholders has dropped and our share of their total media spend is contracting.',
    metric: '-4pts QoQ',
    trend: 'worsening',
    owner: 'Rachel',
    recommendedAction: 'Schedule group-level QBR with Publicis UK CEO',
    impactIfIgnored: '£800k annual revenue at risk',
  },
  {
    id: 'risk-lapsed-advertisers',
    category: 'client-retention',
    severity: 'high',
    title: 'Three top-10 advertisers lapsed in 90 days',
    detail:
      'Next, Volvo, and Specsavers have all lapsed from active booking status within the last 90 days. Combined they represented significant Q2 spend now flowing to competitors.',
    metric: 'Next / Volvo / Specsavers',
    trend: 'stable',
    owner: 'Rachel / Gary',
    recommendedAction:
      'Launch win-back programme with dedicated resource',
    impactIfIgnored: '£818k Q2 spend lost to competitors',
  },
  {
    id: 'risk-elise-delivery',
    category: 'talent',
    severity: 'medium',
    title: "Elise's team delivery score declining",
    detail:
      "Elise's team delivery score has dropped 6 points this quarter, now the lowest across all teams. Campaign pacing issues and late creative swaps are the primary drivers.",
    metric: 'Score 74 (-6pts)',
    trend: 'worsening',
    owner: 'Elise',
    recommendedAction:
      'Review team capacity and redistribute accounts',
    impactIfIgnored: 'Risk of missing Q3 target by 15%+',
  },
  {
    id: 'risk-commission-ratio',
    category: 'financial',
    severity: 'medium',
    title: 'Commission cost ratio creeping above 6% threshold',
    detail:
      'The blended commission cost ratio is at 5.6%, approaching the 6% board-approved ceiling. Accelerator tiers on two high-value deals are the primary contributor.',
    metric: '5.6% vs 5% target',
    trend: 'stable',
    owner: 'James',
    recommendedAction:
      'Review accelerator tier thresholds at next board',
    impactIfIgnored: '£140k annual margin erosion',
  },
];
