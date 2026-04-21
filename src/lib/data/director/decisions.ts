export interface Decision {
  id: string;
  date: string;
  title: string;
  category: 'structural' | 'commercial' | 'investment' | 'people' | 'product';
  context: string;
  decision: string;
  rationale: string;
  outcome?: string;
  outcomeDate?: string;
  status: 'pending-review' | 'positive' | 'mixed' | 'negative' | 'too-early';
  owner: string;
}

export const decisions: Decision[] = [
  {
    id: 'dec-merge-partnerships',
    date: '2025-04-15',
    title: 'Q2 2025: Merge partnerships into direct sales',
    category: 'structural',
    context:
      'The partnerships team was operating as a separate P&L with overlapping client relationships. Several agencies had two Immediate contacts competing on the same briefs, causing confusion and margin erosion.',
    decision:
      'Merge the 4-person partnerships team into the direct sales structure, re-assigning accounts by agency alignment.',
    rationale:
      'Eliminating duplicated client coverage would reduce cost base and present a single commercial face to agencies. Expected to unlock cross-sell between print and digital.',
    outcome: '+£1.2M revenue, -£400K duplicated costs, net +£800K',
    outcomeDate: '2025-12-31',
    status: 'positive',
    owner: 'James',
  },
  {
    id: 'dec-bbcgoodfood-newsletter',
    date: '2025-07-01',
    title: 'Q3 2025: Invest in BBC Good Food newsletter expansion',
    category: 'investment',
    context:
      'BBC Good Food newsletter had 180K subscribers with strong engagement (42% open rate) but limited monetisation. Market research showed food/recipe newsletters commanding premium CPMs.',
    decision:
      'Invest £120K in newsletter growth (acquisition, content, and ad product development) to reach 500K subscribers by end of FY26.',
    rationale:
      'High-engagement first-party channel with clear monetisation path. HFSS restrictions make owned channels more valuable as advertisers seek compliant placements.',
    outcome: '+320K subscribers, £180K incremental ad revenue',
    outcomeDate: '2026-03-31',
    status: 'positive',
    owner: 'James',
  },
  {
    id: 'dec-elise-third-seller',
    date: '2025-10-15',
    title: "Q4 2025: Restructure Elise's team — add third salesperson",
    category: 'people',
    context:
      "Elise's team was consistently over-target but delivery scores lagged due to account overload. Two sellers managing 45 accounts between them, with several flagged for slow response times.",
    decision:
      'Add a third salesperson to the team, redistributing accounts to reduce load from ~22 to ~15 per seller.',
    rationale:
      'Delivery quality was becoming a churn risk. Adding headcount would protect existing revenue while creating capacity for growth accounts.',
    outcome: 'Revenue up 12% but delivery score dropped 6 pts during transition',
    outcomeDate: '2026-03-31',
    status: 'mixed',
    owner: 'Elise',
  },
  {
    id: 'dec-premium-cpm-tier',
    date: '2026-01-10',
    title: 'Q1 2026: Launch premium CPM tier for first-party audiences',
    category: 'commercial',
    context:
      'Audience data platform was nearing completion. Competitors had already launched data-driven pricing tiers. Our CPMs were flat YoY while market was moving to outcome-based pricing.',
    decision:
      'Introduce a premium CPM tier (£8-£14 range) for campaigns using first-party audience segments, alongside the standard tier.',
    rationale:
      'First-party data segments deliver 2.4x higher CTR. Premium pricing reflects value without cannibalising standard bookings.',
    outcome: 'Avg CPM +£3.20, no fill rate decline',
    outcomeDate: '2026-03-31',
    status: 'positive',
    owner: 'James',
  },
  {
    id: 'dec-topgear-budget-cut',
    date: '2026-01-20',
    title: 'Q1 2026: Reduce Top Gear editorial budget by 15%',
    category: 'investment',
    context:
      'Top Gear print circulation declining 8% YoY. Digital traffic flat. Editorial costs high relative to ad revenue contribution. Portfolio review flagged it as underperforming vs. other titles.',
    decision:
      'Reduce editorial budget by 15%, reinvesting savings into BBC Good Food and Radio Times digital content.',
    rationale:
      'Protect portfolio margin by shifting investment toward titles with stronger commercial trajectories. Print holding for now; monitoring closely.',
    outcome: 'Print circ holding, digital declining, need 2 more quarters',
    outcomeDate: '2026-09-30',
    status: 'too-early',
    owner: 'James',
  },
  {
    id: 'dec-ai-campaign-optimisation',
    date: '2026-04-01',
    title: 'Q2 2026: Pilot AI-assisted campaign optimisation',
    category: 'product',
    context:
      'Campaign delivery teams spending 6+ hours per week manually optimising placements. Competitors offering automated optimisation as standard. Three agency partners requested it in Q1 QBRs.',
    decision:
      'Run a 3-month pilot using AI-assisted optimisation on 20 campaigns, measuring delivery efficiency, time saved, and client satisfaction vs. control group.',
    rationale:
      'Automation is table stakes within 12 months. Piloting now de-risks a full rollout and generates proof points for the sales narrative.',
    status: 'too-early',
    owner: 'CTO',
  },
  {
    id: 'dec-head-of-programmatic',
    date: '2026-04-10',
    title: 'Q2 2026: Hire Head of Programmatic Sales',
    category: 'people',
    context:
      'Programmatic revenue growing 22% YoY but managed ad-hoc across teams. No dedicated leadership. Self-serve platform launching in June needs a commercial owner.',
    decision:
      'Create and recruit a Head of Programmatic Sales role reporting to James, with P&L ownership of all programmatic revenue.',
    rationale:
      'Dedicated leadership required to capitalise on self-serve platform launch and coordinate programmatic strategy across all teams.',
    status: 'pending-review',
    owner: 'James',
  },
  {
    id: 'dec-exit-peloton',
    date: '2024-10-15',
    title: 'Q4 2024: Exit Peloton account',
    category: 'commercial',
    context:
      'Peloton had been a mid-tier account (£90K annual) but increasingly demanding on delivery resources. 3x the average number of revision rounds, late creative, and disputed invoices totalling £18K.',
    decision:
      'Decline to renew the Peloton contract and reallocate the account team capacity to prospecting higher-value opportunities.',
    rationale:
      'Account was margin-negative when factoring in delivery overhead and disputed invoices. Team capacity better deployed elsewhere.',
    outcome: 'Freed capacity for Charlotte Tilbury, net +£60K revenue',
    outcomeDate: '2025-06-30',
    status: 'positive',
    owner: 'Gary',
  },
];
