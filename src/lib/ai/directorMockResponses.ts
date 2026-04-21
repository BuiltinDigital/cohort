import type { MockResponse } from './mockResponses';

export const directorSuggestedPrompts: string[] = [
  "What's driving the digital market share decline?",
  'Which teams are most at risk of missing Q3?',
  'Summarise the case for investing in the audience data platform.',
  'Who are my top 3 flight risks and why?',
  'What should I raise at the Bauer quarterly review?',
  'Draft my monthly report to the CEO.',
];

export const directorMockResponses: MockResponse[] = [
  {
    keywords: [
      'market share',
      'digital share',
      'share decline',
      'losing share',
      'digital decline',
    ],
    response:
      "Your digital market share has contracted by 1.5pts over the last two quarters, from 14.2% to 12.7%. Three factors are driving this:\n\n1. **Programmatic gap:** Competitors (Hearst, News UK) have launched self-serve platforms while we still rely on IO-based buying. Agencies are routing incremental spend to platforms with automated access.\n2. **Retail media cannibalisation:** Retail media networks (Amazon, Tesco, Sainsbury's) now command 14% of UK digital spend, up from 9% a year ago. This is pulling FMCG and grocery budgets away from publisher display.\n3. **Rate card rigidity:** Our average digital CPM has remained flat at £5.40 while competitors are offering dynamic pricing. Agencies are choosing flexibility over our fixed rates.\n\nThe digital share recovery programme is the primary counter-initiative, but it's only at 35% progress. The self-serve platform launch in June is the single most important milestone — if it slips, we risk losing another 1-2pts by Q4.",
    attachments: [
      {
        type: 'table',
        data: {
          headers: ['Factor', 'Impact', 'Mitigation', 'Timeline'],
          rows: [
            [
              'No self-serve platform',
              '-0.8pts share',
              'Programmatic self-serve launch',
              'Jun 2026',
            ],
            [
              'Retail media growth',
              '-0.4pts share',
              'Retail media partnerships',
              'H2 2026',
            ],
            [
              'Fixed rate cards',
              '-0.3pts share',
              'Dynamic pricing pilot',
              'Q3 2026',
            ],
          ],
        },
      },
    ],
  },
  {
    keywords: [
      'team',
      'at risk',
      'missing',
      'Q3',
      'target',
      'behind',
      'underperforming',
    ],
    response:
      "Based on current pipeline weighted values and historical conversion rates, here's the Q3 risk assessment by team:\n\n**Gary's team** is the most at risk. While they're at 104% for Q2, their Q3 pipeline is thin — only £1.1M weighted against a £2.5M target. The HFSS pipeline rebuild initiative is behind schedule (20% progress, red status), which was supposed to backfill the £600K+ expected to drop from food & drink clients post-July.\n\n**Elise's team** is a moderate risk. The third salesperson added in Q4 2025 drove revenue up 12% but delivery scores dropped 6pts during transition. If delivery issues persist, the Tesco and NatWest renewals (combined £380K) are vulnerable.\n\n**Rachel's team** is in the strongest position at 95.5% Q2 delivery, but the Publicis share-of-wallet decline is a Q3 concern. The May QBR outcome will be decisive — if Publicis doesn't commit to H2 volumes, Rachel's Q3 could come in 8-10% light.",
    attachments: [
      {
        type: 'table',
        data: {
          headers: [
            'Team',
            'Q2 % of Target',
            'Q3 Pipeline (Weighted)',
            'Q3 Target',
            'Risk Level',
          ],
          rows: [
            ['Gary', '104%', '£1,100,000', '£2,500,000', 'High'],
            ['Elise', '98%', '£1,800,000', '£2,100,000', 'Medium'],
            ['Rachel', '95.5%', '£2,200,000', '£2,200,000', 'Medium'],
          ],
        },
      },
    ],
  },
  {
    keywords: ['flight risk', 'retention', 'leaving', 'resign', 'attrition', 'talent'],
    response:
      "Based on the talent matrix, compensation benchmarking, and behavioural signals, your top 3 flight risks are:\n\n1. **Sophie (Rachel's team)** — High risk. She's been in-role for 2.5 years with no promotion pathway visible. Her comp is 12% below market benchmark for her level. LinkedIn profile updated 3 weeks ago and she's been absent from two optional team events. Sophie manages £1.4M in accounts — losing her would put the Zenith relationship at immediate risk.\n\n2. **Marcus (Gary's team)** — Medium-high risk. Top performer at 118% of target but frustrated by the team restructure pilot. He's expressed concerns about account changes in 1:1s. Competitors (News UK specifically) have been poaching senior sellers with 25%+ uplifts.\n\n3. **Alex (Elise's team)** — Medium risk. Joined 8 months ago as the third hire. Onboarding was disrupted by the restructure and delivery scores in their accounts are the lowest on the team. Early signs of disengagement — low participation in training modules and skipped the last team offsite.\n\nRecommended actions: accelerate Sophie's promotion case, review Marcus's compensation against the new News UK benchmark, and pair Alex with a senior mentor.",
  },
  {
    keywords: ['forecast', 'projection', 'revenue', 'quarter', 'outlook', 'landing'],
    response:
      "Here's the consolidated revenue forecast across all three teams:\n\n**Q2 2026 (current quarter):** Tracking to land between £6.4M and £6.8M against a £6.7M target (95-101%). The Zenith trading review on May 14th is the biggest swing factor — a positive outcome could push us to 103%.\n\n**H2 2026 outlook:** Pipeline is building but below this time last year. Total weighted H2 pipeline sits at £8.2M against a £12.4M H2 target. Key risks are HFSS revenue loss (est. £1.8M), Publicis share-of-wallet decline (est. £800K), and the self-serve platform launch delay risk. Key upside: Audi EV launch (£300K+), Samsung Z Flip 6 (£200K+), Dyson beauty tech entry (£150K+).\n\n**Full year:** Current trajectory puts FY26 at £24.8M against a £26.2M target (94.7%). To close the £1.4M gap, we need at least two of: Publicis QBR win, HFSS pipeline backfill, and self-serve platform generating £500K in H2.",
    attachments: [
      {
        type: 'table',
        data: {
          headers: ['Period', 'Target', 'Forecast (Low)', 'Forecast (High)', '% Range'],
          rows: [
            ['Q2 2026', '£6,700,000', '£6,400,000', '£6,800,000', '95-101%'],
            ['H2 2026', '£12,400,000', '£10,800,000', '£12,100,000', '87-98%'],
            ['FY26 Total', '£26,200,000', '£24,200,000', '£25,600,000', '92-98%'],
          ],
        },
      },
    ],
  },
  {
    keywords: [
      'initiative',
      'programme',
      'strategic',
      'audience data',
      'platform',
      'invest',
      'case for',
    ],
    response:
      "Here's the investment case for the Audience Data Platform:\n\n**Investment:** £650K total (£502K spent, £148K remaining)\n**Status:** 78% complete, green, on track for agency beta in April 2026\n\n**The case for:**\n- Premium CPM tier already generating +£3.20 avg CPM uplift with no fill rate decline — this proves agencies will pay for first-party audiences\n- Data matching rates at 78%, exceeding the 72% target — the tech works\n- Three agency partners (Zenith, OMD, Havas) confirmed for closed beta — there's demand\n- ICO guidance published April 2026 is broadly supportive of publisher first-party data use — regulatory tailwind\n- Competitors are already live: Hearst launched their platform in April 2026. Every month of delay is share loss\n\n**Projected returns:**\n- Year 1: £800K-£1.2M incremental revenue from premium CPM tier\n- Year 2: £2M-£3M as self-serve access scales programmatic demand\n- Year 3: Data licensing revenue (est. £500K) as agencies use insights beyond media buying\n\n**The risk of not investing:** We lose the premium CPM tier entirely and revert to commodity pricing. Agencies already expect data-driven targeting as standard. Without this, we're competing on reach and price alone — a race to the bottom.",
  },
  {
    keywords: ['margin', 'profitability', 'cost', 'efficiency', 'P&L', 'profit'],
    response:
      "Portfolio margin analysis across the three teams:\n\n**Overall margin:** 32.4% blended across all active campaigns, up from 29.8% same period last year. The improvement is driven by the partnerships merger (+£800K net contribution) and premium CPM tier launch (+£3.20 avg CPM).\n\n**By team:**\n- Gary's team: 35.1% — highest margin, driven by Samsung and Dyson premium packages\n- Rachel's team: 31.8% — solid but Publicis accounts running at lower margin due to group discount\n- Elise's team: 28.6% — lowest margin, partially due to the Specsavers-era rate card issues and high delivery costs during team restructure\n\n**Margin risks for H2:**\n- HFSS clients currently booking at above-average margin (food & drink brands pay premium CPMs for BBC Good Food). Losing these without replacement hits margin disproportionately.\n- GroupM's new measurement API requirement will add integration costs (est. £80K)\n- Head of Programmatic hire adds £120K+ to cost base before generating revenue\n\n**Margin opportunity:** Multi-title packages running at 38% margin vs. 28% for single-title. Shifting the mix from 40% to 60% multi-title would add 2-3pts to blended margin.",
    attachments: [
      {
        type: 'table',
        data: {
          headers: ['Team', 'Current Margin', 'YoY Change', 'Top Contributor'],
          rows: [
            ['Gary', '35.1%', '+3.2pts', 'Samsung cross-platform'],
            ['Rachel', '31.8%', '+1.8pts', 'L\'Oreal interactive'],
            ['Elise', '28.6%', '+2.1pts', 'Tesco early-booking'],
          ],
        },
      },
    ],
  },
  {
    keywords: [
      'competitor',
      'intelligence',
      'Hearst',
      'News UK',
      'Future',
      'competitive',
    ],
    response:
      "Competitive intelligence summary as of mid-April 2026:\n\n**Hearst UK** — The biggest competitive threat right now. They've launched \"Hearst Connect\" (self-serve ad platform) ahead of us, cutting into our agency relationships. Early feedback from Zenith is that the platform is \"good but limited in scale\". We still have a window to launch a superior product if we hit June.\n\n**News UK** — Aggressively poaching talent. Two senior hires from Conde Nast with 25%+ salary uplifts. They're investing heavily in video (+18% YoY spend in video formats). Their Times+ subscriber data gives them a first-party advantage in news/current affairs verticals where we don't compete directly.\n\n**Future plc** — Cutting 12% of commercial headcount. This is an opportunity: they have strong people becoming available, and their agency relationships may weaken during restructuring. Worth targeting their programmatic specialists for our Head of Programmatic role.\n\n**Retail media networks** — The structural threat. Amazon, Tesco, and Sainsbury's media networks now command 14% of UK digital spend (up from 9% a year ago). They're primarily cannibalising FMCG publisher display budgets. We need a partnership strategy, not a competitive one.\n\n**Key action:** The Hearst self-serve launch is the most urgent competitive response. Every week of delay costs us consideration in H2 agency planning cycles.",
  },
  {
    keywords: [
      'Bauer',
      'quarterly',
      'review',
      'board',
      'raise',
      'agenda',
      'prepare',
    ],
    response:
      "For the Bauer quarterly review on May 20th, here's what I'd recommend raising:\n\n**Lead with the wins:**\n- Partnerships merger delivered net +£800K (positive ROI in under 12 months)\n- Premium CPM tier launched successfully — +£3.20 avg CPM, no fill rate decline\n- BBC Good Food newsletter at 500K subscribers, generating £180K incremental revenue\n- Charlotte Tilbury campaign: 4x ROAS case study earning industry recognition\n\n**Be transparent on risks:**\n- Digital market share down 1.5pts — explain the recovery plan and self-serve platform timeline\n- HFSS enforcement moved to July — £1.8M at risk, pipeline rebuild behind schedule\n- Three top-10 advertisers lapsed in 90 days (Next, Volvo, Specsavers)\n\n**Investment asks to signal:**\n- Audience data platform: remaining £148K to complete — ROI case is strong\n- Head of Programmatic Sales hire: £120K+ cost but critical for self-serve platform commercialisation\n- GroupM API integration: £80K required to maintain preferred partner status\n\n**The narrative:** We're in a market transition from IO-based to data-driven, automated buying. We've made strong commercial decisions (partnerships merger, premium CPMs) and the audience data platform positions us well. But we need to accelerate digital investment to avoid being leapfrogged by Hearst and News UK.",
  },
  {
    keywords: [
      'CEO',
      'monthly report',
      'draft',
      'report',
      'summary',
      'board report',
    ],
    response:
      "Here's a draft monthly report to the CEO for April 2026:\n\n---\n\n**Commercial Division — Monthly Report — April 2026**\n\n**Revenue:** Q2 tracking at 95-101% of £6.7M target. Full year forecast: £24.8M vs. £26.2M target (94.7%). Key upside: Zenith review (May 14), Publicis QBR (May 15), and Dentsu H2 pitch (May 28) collectively represent £3.8M in pipeline.\n\n**Market share:** Digital share declined 1.5pts QoQ to 12.7%. Recovery programme in progress — self-serve programmatic platform on track for June launch. Audience data platform 78% complete with agency beta live.\n\n**Key wins this month:**\n- Premium CPM tier generating +£3.20 avg uplift with no fill decline\n- BBC Good Food newsletter hit 500K subscribers (+320K since investment)\n- Charlotte Tilbury expanded H2 commitment by 40% following 4x ROAS campaign\n\n**Key risks:**\n- HFSS enforcement moved to July 2026 — £1.8M revenue at risk, mitigation behind schedule\n- Publicis share of wallet at 6.4% and declining — QBR in May is critical\n- Three top-10 advertisers lapsed in 90 days — win-back programme initiated\n\n**People:** Head of Programmatic Sales role approved and in recruitment. One flight risk flagged in talent review (Sophie, Rachel's team). Future plc redundancies present opportunistic hiring pool.\n\n**Decisions requiring visibility:**\n- AI-assisted campaign optimisation pilot launched (3-month evaluation)\n- Top Gear editorial budget reduced 15% — monitoring impact over 2 quarters\n\n---\n\nWant me to adjust the tone, add detail to any section, or format this for a specific template?",
    attachments: [
      {
        type: 'action',
        data: {
          label: 'Export as document',
          action: 'export-document',
        },
      },
    ],
  },
  {
    keywords: [
      'HFSS',
      'food',
      'regulation',
      'restriction',
      'pipeline rebuild',
      'non-HFSS',
    ],
    response:
      "HFSS impact assessment and mitigation status:\n\n**The threat:** HFSS online advertising restrictions now enforced from 1 July 2026 (moved forward one month). This impacts all advertising for products high in fat, sugar, and salt — our exposure is primarily through BBC Good Food and Olive Magazine advertisers.\n\n**Revenue at risk:** £1.8M annually across 12 affected accounts. The top 5 by spend are:\n\n| Advertiser | Annual Spend | HFSS Exposure | Risk Level |\n|---|---|---|---|\n| Cadbury (Mondelez) | £380K | Full | High |\n| McDonald's | £310K | Full | High |\n| Walkers (PepsiCo) | £240K | Full | High |\n| Coca-Cola | £220K | Partial | Medium |\n| Kellogg's | £180K | Partial | Medium |\n\n**Mitigation — HFSS pipeline rebuild initiative:**\n- Owner: Gary | Progress: 20% | Status: Red\n- Only 4 of 15 target non-HFSS verticals scoped so far\n- Next milestone: Identify all 15 verticals by end of May\n- Gary's team is stretched between BAU and this workstream\n\n**My recommendation:** This needs escalation. At current pace, we'll have less than £400K in replacement pipeline by July. Consider temporarily reassigning one seller from Elise's team to support the outreach effort, or bring in a contract business development resource for 3 months.",
  },
  {
    keywords: ['help', 'can you', 'what can', 'how do', 'getting started', 'director'],
    response:
      "As your Director Dashboard assistant, I can help you with strategic-level questions across your commercial division. Here's what I'm best at:\n\n- **Strategic initiatives:** Track progress, surface blockers, and assess ROI of your major programmes\n- **Decision history:** Review past decisions, their outcomes, and lessons learned\n- **Team performance:** Compare teams, identify who's at risk of missing targets, and flag people issues\n- **Forecasting:** Revenue projections, pipeline analysis, and scenario modelling\n- **Competitive intelligence:** Track competitor moves, market trends, and regulatory changes\n- **Stakeholder prep:** Draft CEO reports, prepare for quarterly reviews, and build talking points\n- **Campaign lessons:** Surface learnings from past campaigns to inform strategy\n\nI draw from your connected data across teams, initiatives, decisions, news, and industry events. Just ask in plain language and I'll synthesise an answer.",
  },
];

export function getDirectorResponse(input: string): MockResponse {
  const normalised = input.toLowerCase();

  let bestMatch: MockResponse | null = null;
  let bestScore = 0;

  for (const mock of directorMockResponses) {
    let score = 0;
    for (const keyword of mock.keywords) {
      if (normalised.includes(keyword.toLowerCase())) {
        score++;
      }
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = mock;
    }
  }

  if (!bestMatch || bestScore === 0) {
    return {
      keywords: [],
      response:
        "I've searched across your strategic data sources but I'm not confident I can answer that precisely. Could you rephrase, or try one of the suggested prompts? I can help with market share analysis, team performance, flight risks, forecasting, initiative tracking, competitor intelligence, or stakeholder report drafts.",
    };
  }

  return bestMatch;
}
