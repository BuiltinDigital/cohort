export interface ChatMessage {
  id: string;
  role: 'user' | 'cohort';
  content: string;
  timestamp: string;
  attachments?: ChatAttachment[];
}

export interface ChatAttachment {
  type: 'table' | 'action';
  data: any;
}

export interface MockResponse {
  keywords: string[];
  response: string;
  attachments?: ChatAttachment[];
}

export const suggestedPrompts: string[] = [
  "Who hasn't spent with us since last year but is spending in market?",
  "What's Alicia's delivery trend over the last 6 months?",
  "Draft an email to Karen at Starcom about the Audi make-good.",
  "Which of my agencies has the lowest share of wallet?",
  "Summarise this week's risks for my weekly report.",
];

export const mockResponses: MockResponse[] = [
  {
    keywords: ['lapsed', 'churn', 'not spending', 'hasn\'t spent', 'lost', 'inactive'],
    response:
      'I found 14 advertisers who spent with you in FY24 but have placed no orders in FY25 so far. Combined, they represented $3.2M in revenue last year. The top three by prior spend are Volkswagen Group ($680K), Unilever ANZ ($540K), and Suncorp ($410K). Nielsen Ad Intel confirms all three are still actively spending in market -- Volkswagen alone has increased total media spend by 12% YoY. I\'d recommend prioritising outreach to these accounts.',
    attachments: [
      {
        type: 'table',
        data: {
          headers: ['Advertiser', 'FY24 Spend', 'In-Market Status', 'YoY Market Spend'],
          rows: [
            ['Volkswagen Group', '$680,000', 'Active', '+12%'],
            ['Unilever ANZ', '$540,000', 'Active', '+4%'],
            ['Suncorp', '$410,000', 'Active', '-2%'],
            ['Pepsico', '$385,000', 'Active', '+8%'],
            ['Optus', '$310,000', 'Active', '+1%'],
          ],
        },
      },
    ],
  },
  {
    keywords: ['alicia', 'delivery', 'trend', 'pacing'],
    response:
      'Alicia\'s delivery across her 12 active campaigns has been trending upward. Over the last six months her average delivery rate moved from 78% in October to 94% in March. Two campaigns are currently over-delivering: the Toyota Summer Push (at 108%) and the CommBank Brand Awareness flight (at 103%). One campaign, NAB Home Loans Q1, is slightly under-pacing at 87% -- it may need a creative refresh or placement adjustment to hit target by end of flight.',
    attachments: [
      {
        type: 'table',
        data: {
          headers: ['Month', 'Avg Delivery %', 'Active Campaigns', 'At-Risk'],
          rows: [
            ['Oct', '78%', '10', '3'],
            ['Nov', '82%', '11', '2'],
            ['Dec', '85%', '11', '2'],
            ['Jan', '89%', '12', '1'],
            ['Feb', '91%', '12', '1'],
            ['Mar', '94%', '12', '1'],
          ],
        },
      },
    ],
  },
  {
    keywords: ['risk', 'attention', 'at-risk', 'underdelivering', 'weekly report'],
    response:
      'Here\'s your risk summary for the week ending 17 April. There are 5 campaigns flagged: 2 are under-delivering by more than 15% (NAB Home Loans Q1 at 87% and Qantas Brand Relaunch at 82%), 1 has a creative expiry in 3 days with no replacement uploaded (Woolworths Fresh April), and 2 have budget discrepancies between Salesforce and Ad Manager (Telstra 5G Launch and Origin Energy Winter). I\'d suggest raising the Qantas and Woolworths items in your Monday stand-up as they need client-side action.',
  },
  {
    keywords: ['agency', 'wallet', 'share of wallet', 'lowest'],
    response:
      'Across your 8 managed agencies, Publicis Groupe has the lowest share of wallet at just 6.4%. They placed $420K with you in the last 12 months against an estimated total media spend of $6.6M. By comparison, your top-performing agency relationship is Dentsu at 34% share of wallet ($2.1M of $6.2M total). Mediabrands and Havas also sit below 15%, making them strong candidates for growth conversations.',
    attachments: [
      {
        type: 'table',
        data: {
          headers: ['Agency', 'Your Revenue', 'Est. Total Spend', 'Share of Wallet'],
          rows: [
            ['Dentsu', '$2,100,000', '$6,200,000', '34%'],
            ['OMG', '$1,850,000', '$7,100,000', '26%'],
            ['GroupM', '$1,600,000', '$8,400,000', '19%'],
            ['Starcom (Publicis)', '$420,000', '$6,600,000', '6.4%'],
            ['Mediabrands', '$510,000', '$4,200,000', '12%'],
            ['Havas', '$340,000', '$2,800,000', '12%'],
          ],
        },
      },
    ],
  },
  {
    keywords: ['email', 'draft', 'karen', 'starcom', 'make-good', 'audi'],
    response:
      'Here\'s a draft email for your review:\n\n---\n\n**To:** Karen Mitchell, Starcom\n**Subject:** Audi Q5 Campaign -- Make-Good Proposal\n\nHi Karen,\n\nThanks for flagging the delivery shortfall on the Audi Q5 Spring campaign. After reviewing the numbers, we under-delivered by approximately 180,000 impressions across the premium video placements in March.\n\nTo make this right, I\'d like to propose the following:\n- 200,000 bonus impressions on equivalent premium video inventory across April (giving a 10% uplift as a goodwill gesture)\n- Priority placement in the Automotive section during the Easter long weekend\n\nI\'ve attached the revised delivery schedule for your review. Happy to jump on a call this week to walk through it.\n\nBest regards',
    attachments: [
      {
        type: 'action',
        data: {
          label: 'Open in email composer',
          action: 'compose-email',
        },
      },
    ],
  },
  {
    keywords: ['forecast', 'pipeline', 'revenue', 'quarter', 'projection'],
    response:
      'Your Q3 pipeline currently sits at $4.8M across 38 active opportunities. Of that, $2.1M is in "Closed Won" or "Contract Signed" stages, $1.6M is in "Proposal Sent" with a weighted probability of 65%, and $1.1M is in earlier stages. Based on historical conversion rates, I\'d forecast Q3 landing between $3.4M and $3.9M -- that puts you at 88-101% of your $3.85M target. The biggest swing factor is the GroupM Telstra upfront ($480K) which is still in negotiation.',
    attachments: [
      {
        type: 'table',
        data: {
          headers: ['Stage', 'Value', 'Deals', 'Weighted Value'],
          rows: [
            ['Closed Won', '$2,100,000', '14', '$2,100,000'],
            ['Proposal Sent', '$1,600,000', '11', '$1,040,000'],
            ['Negotiation', '$680,000', '6', '$340,000'],
            ['Qualification', '$420,000', '7', '$105,000'],
          ],
        },
      },
    ],
  },
  {
    keywords: ['campaign', 'performance', 'top', 'best', 'performing'],
    response:
      'Your top 5 performing campaigns this month by delivery efficiency and CTR are: Toyota Summer Push (108% delivery, 0.42% CTR), CommBank Brand Awareness (103% delivery, 0.38% CTR), Samsung Galaxy Launch (98% delivery, 0.51% CTR), Woolworths Fresh March (97% delivery, 0.29% CTR), and Qantas Frequent Flyer (96% delivery, 0.35% CTR). Samsung stands out with the highest click-through rate across all active campaigns -- worth noting in your performance review.',
  },
  {
    keywords: ['budget', 'spend', 'underspend', 'overspend', 'utilisation'],
    response:
      'Across your portfolio, total budget utilisation for FY25 YTD is 72%, which is slightly ahead of the 70% pro-rata benchmark for this point in the year. Three accounts are notably under-utilising: Optus Brand (54% utilised with 3 months remaining), Harvey Norman Retail (61%), and AGL Energy (63%). On the flip side, two accounts are running hot and may need budget extensions: Toyota National (89% utilised with a full quarter remaining) and Samsung Mobile (86%). I\'d flag Toyota and Samsung for upsell conversations.',
  },
  {
    keywords: ['competitor', 'market', 'intelligence', 'nielsen', 'spending'],
    response:
      'Based on the latest Nielsen Ad Intel data (synced this morning at 06:00), your top competitor Nine Entertainment has increased digital display spend by 18% QoQ, with the biggest gains in Automotive (+$1.2M) and Finance (+$800K). Seven West Media has shifted approximately $2M from linear TV to digital video year-on-year. In your core Automotive vertical, total market spend is up 9% but your share has dipped from 14.2% to 13.1% -- the gap is largely attributable to programmatic channels where Adomic data shows competitors winning on price.',
  },
  {
    keywords: ['help', 'can you', 'what can', 'how do', 'getting started'],
    response:
      'I can help you with a wide range of tasks across your media sales workflow. Here are some things I\'m good at:\n\n- **Pipeline & Revenue:** Forecast quarterly revenue, identify at-risk deals, surface upsell opportunities\n- **Campaign Ops:** Check delivery pacing, flag under- or over-delivering campaigns, suggest optimisations\n- **Client Intelligence:** Find lapsed advertisers still spending in market, analyse share of wallet by agency\n- **Communications:** Draft client emails, summarise weekly risks, prepare talking points\n- **Market Data:** Pull competitor spend trends from Nielsen, check audience metrics from Comscore\n\nJust ask a question in plain language and I\'ll pull from your connected data sources to give you an answer.',
  },
];

export function getResponse(input: string): MockResponse {
  const normalised = input.toLowerCase();

  // Score each mock response by how many keyword matches it has
  let bestMatch: MockResponse | null = null;
  let bestScore = 0;

  for (const mock of mockResponses) {
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

  // Fallback response if no keywords matched
  if (!bestMatch || bestScore === 0) {
    return {
      keywords: [],
      response:
        "I've searched across your connected data sources but I'm not sure I have enough context to answer that precisely. Could you rephrase your question, or try one of the suggested prompts? You can ask me about pipeline forecasts, campaign delivery, lapsed advertisers, agency share of wallet, or market intelligence.",
    };
  }

  return bestMatch;
}
