export interface Lesson {
  id: string;
  date: string;
  campaign: string;
  client: string;
  category: string;
  outcome: 'success' | 'failure' | 'mixed';
  title: string;
  summary: string;
  keyLearning: string;
  tags: string[];
  submittedBy: string;
}

export const lessons: Lesson[] = [
  {
    id: 'lesson-001',
    date: '2026-03-15',
    campaign: 'Charlotte Tilbury Spring Glow',
    client: 'Charlotte Tilbury',
    category: 'Creative Strategy',
    outcome: 'success',
    title: 'Shoppable editorial drove 4x ROAS vs. standard display',
    summary:
      'Ran a shoppable editorial integration across BBC Good Food and Stylist, with embedded product links within recipe and beauty content. Campaign delivered 4.2x ROAS compared to the client\'s standard display benchmark of 1.1x. The client increased H2 spend by 40% on the back of this result.',
    keyLearning:
      'Contextual commerce placements in editorial environments massively outperform standard display for beauty/lifestyle. Build this into the pitch deck as a default recommendation for all beauty clients.',
    tags: ['commerce', 'editorial', 'beauty', 'ROAS'],
    submittedBy: 'Gary',
  },
  {
    id: 'lesson-002',
    date: '2026-02-28',
    campaign: 'Volkswagen ID.7 Launch',
    client: 'Volkswagen Group',
    category: 'Audience Targeting',
    outcome: 'failure',
    title: 'Over-reliance on contextual targeting missed high-intent audience',
    summary:
      'VW wanted to reach in-market EV buyers. We ran contextual targeting on automotive content across Top Gear and Autocar. CTR was 0.08% — well below the 0.25% benchmark. Post-campaign analysis showed in-market EV intenders were more concentrated in finance and technology content.',
    keyLearning:
      'For EV launches, behavioural and cross-title audience segments outperform pure contextual automotive targeting. Recommend first-party audience segments from day one for automotive launches.',
    tags: ['automotive', 'targeting', 'EV', 'audience-data'],
    submittedBy: 'Rachel',
  },
  {
    id: 'lesson-003',
    date: '2026-01-20',
    campaign: 'Tesco Finest Christmas 2025',
    client: 'Tesco',
    category: 'Timing & Planning',
    outcome: 'success',
    title: 'Early September booking secured premium inventory and 18% discount',
    summary:
      'Tesco booked their Christmas campaign in early September, 3 weeks ahead of the typical rush. This secured them premium homepage takeovers on BBC Good Food during peak recipe traffic (Oct-Dec) at an 18% lower CPM than late bookers paid. Campaign delivered 112% of impression target.',
    keyLearning:
      'Incentivise early booking for tentpole periods with tiered pricing. Clients who book 6+ weeks early should get priority placement and better rates — it also helps our yield planning.',
    tags: ['tentpole', 'Christmas', 'yield', 'early-booking'],
    submittedBy: 'Elise',
  },
  {
    id: 'lesson-004',
    date: '2025-12-10',
    campaign: 'Audi Q8 e-tron Always-On',
    client: 'Audi',
    category: 'Campaign Management',
    outcome: 'mixed',
    title: 'Always-on campaign over-delivered by 22% due to missing frequency cap',
    summary:
      'The Audi always-on campaign over-delivered impressions by 22% across a 3-month flight. Root cause was a missing frequency cap in the ad server setup — individual users were seeing the ad 8+ times vs. the agreed 3x cap. Client raised the issue and we issued a partial make-good, costing £14K.',
    keyLearning:
      'Implement a mandatory pre-launch QA checklist that includes frequency cap verification. The £14K make-good was avoidable. Now rolled out across all teams as a standard process.',
    tags: ['QA', 'frequency-cap', 'make-good', 'process'],
    submittedBy: 'Rachel',
  },
  {
    id: 'lesson-005',
    date: '2025-11-15',
    campaign: 'Samsung Galaxy Z Fold Launch',
    client: 'Samsung',
    category: 'Cross-Platform',
    outcome: 'success',
    title: 'Print + digital combo delivered highest brand lift in H2 2025',
    summary:
      'Samsung ran a coordinated launch campaign across Radio Times (print DPS) and RadioTimes.com (high-impact digital takeover). Brand lift study showed +14pts aided awareness and +8pts purchase intent — the strongest result of any H2 2025 campaign. The print element drove the awareness bump while digital drove intent.',
    keyLearning:
      'Cross-platform print + digital packages deliver measurably stronger brand outcomes. Use this case study to justify premium pricing on cross-platform bundles and push back on digital-only briefs from Samsung\'s agency.',
    tags: ['cross-platform', 'brand-lift', 'print', 'digital', 'tech'],
    submittedBy: 'Gary',
  },
  {
    id: 'lesson-006',
    date: '2025-10-22',
    campaign: 'Specsavers Autumn Eye Health',
    client: 'Specsavers',
    category: 'Pricing',
    outcome: 'failure',
    title: 'Aggressive discounting to win deal eroded margin to -2%',
    summary:
      'Discounted CPMs by 35% to win the Specsavers brief against News UK. Won the deal at £120K but delivery cost analysis showed the campaign ran at -2% margin after production, trafficking, and reporting costs. Specsavers then used the discounted rate as their benchmark for all future negotiations.',
    keyLearning:
      'Never discount below floor CPM to win a deal. The long-term damage to rate card integrity outweighs the short-term revenue. Specsavers has since lapsed partly because we couldn\'t sustain the discounted rates.',
    tags: ['pricing', 'margin', 'discounting', 'rate-card'],
    submittedBy: 'Elise',
  },
  {
    id: 'lesson-007',
    date: '2025-09-30',
    campaign: 'L\'Oreal Paris Revitalift Skin Quiz',
    client: "L'Oreal",
    category: 'Interactive Content',
    outcome: 'success',
    title: 'Interactive skin quiz generated 28K first-party data opt-ins',
    summary:
      'Built a bespoke interactive skin quiz for L\'Oreal on the Stylist website. Users completed the quiz and opted in to receive personalised product recommendations. Generated 28K new first-party data records with explicit consent, plus a 6.2% click-through to L\'Oreal\'s e-commerce site.',
    keyLearning:
      'Interactive content that provides genuine user value (personalised recommendations) is the most effective first-party data collection mechanic. Scale this model to other verticals — fitness, recipes, home improvement.',
    tags: ['first-party-data', 'interactive', 'beauty', 'lead-gen'],
    submittedBy: 'Rachel',
  },
  {
    id: 'lesson-008',
    date: '2025-08-14',
    campaign: 'Volvo XC90 Premium Positioning',
    client: 'Volvo',
    category: 'Client Management',
    outcome: 'failure',
    title: 'Late reporting caused client to shift budget to competitor',
    summary:
      'Volvo\'s agency requested weekly performance reports as a condition of the booking. We agreed but consistently delivered reports 2-3 days late due to manual data pulls. After 6 weeks, the agency moved the remaining £180K budget to a competitor who offered real-time dashboards.',
    keyLearning:
      'Reporting commitments must be treated as delivery KPIs, not admin tasks. If we promise weekly reports, automate the pipeline or don\'t commit. This directly contributed to Volvo lapsing as an advertiser.',
    tags: ['reporting', 'client-retention', 'automation', 'SLA'],
    submittedBy: 'Gary',
  },
  {
    id: 'lesson-009',
    date: '2026-03-28',
    campaign: 'NatWest Mortgage Rate Campaign',
    client: 'NatWest',
    category: 'Regulatory',
    outcome: 'mixed',
    title: 'FCA compliance review delayed launch by 2 weeks but avoided fine',
    summary:
      'NatWest mortgage campaign was flagged by our internal compliance review for potentially misleading rate comparisons. We paused the launch for 2 weeks to revise creative with the client. The delay frustrated the agency, but a competitor ran similar copy and received an FCA warning letter the following month.',
    keyLearning:
      'Our compliance review process works. Position it as a value-add to clients rather than a blocker. Use the competitor FCA warning as a proof point when agencies push back on review timelines.',
    tags: ['compliance', 'FCA', 'finance', 'regulatory'],
    submittedBy: 'Elise',
  },
  {
    id: 'lesson-010',
    date: '2026-02-10',
    campaign: 'Dyson Purifier Spring Launch',
    client: 'Dyson',
    category: 'Multi-Title Strategy',
    outcome: 'success',
    title: 'Four-title package doubled reach vs. single-title at 30% lower CPM',
    summary:
      'Dyson typically booked single-title campaigns on BBC Good Food. For the spring launch, we packaged a four-title deal (Good Food, Gardeners\' World, Radio Times, Olive) with deduplicated audience reach. Delivered 2.1x the unique reach at a 30% lower effective CPM. Client upgraded from £60K to £150K annual commitment.',
    keyLearning:
      'Multi-title packages are the strongest value proposition for reach-focused advertisers. Default to proposing cross-title bundles for all new business pitches — single-title proposals leave money on the table.',
    tags: ['multi-title', 'reach', 'packaging', 'upsell'],
    submittedBy: 'Rachel',
  },
];
