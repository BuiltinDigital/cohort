export interface IndustryEvent {
  id: string;
  name: string;
  date: string;
  endDate?: string;
  type: 'conference' | 'trading-review' | 'tentpole' | 'deadline' | 'internal';
  description: string;
  pipelineAtRisk?: number;
  attendees?: string[];
  importance: 'critical' | 'high' | 'medium';
}

export const industryEvents: IndustryEvent[] = [
  {
    id: 'evt-zenith-review',
    name: 'Zenith trading review',
    date: '2026-05-14',
    type: 'trading-review',
    description:
      'Annual trading review with Zenith Media. They represent Audi, L\'Oreal, and NatWest across our titles. Key agenda: rate card renegotiation, first-party data access, and H2 commitments.',
    pipelineAtRisk: 2_400_000,
    attendees: ['James', 'Rachel', 'Sophie'],
    importance: 'critical',
  },
  {
    id: 'evt-bauer-quarterly',
    name: 'Bauer quarterly review',
    date: '2026-05-20',
    type: 'internal',
    description:
      'Quarterly business review with Bauer Media Group leadership. Must present Q1 actuals, Q2 forecast, digital share trajectory, and initiative progress. Board-level visibility.',
    attendees: ['James', 'Rachel', 'Gary', 'Elise'],
    importance: 'critical',
  },
  {
    id: 'evt-newfronts-uk',
    name: 'NewFronts UK',
    date: '2026-05-12',
    endDate: '2026-05-13',
    type: 'conference',
    description:
      'UK edition of the digital content upfronts. Opportunity to showcase the audience data platform and programmatic self-serve offering to agency trading leads. Competitor presentations will reveal their H2 product roadmaps.',
    attendees: ['James', 'CTO'],
    importance: 'medium',
  },
  {
    id: 'evt-omd-annual-review',
    name: 'OMD annual review',
    date: '2026-06-10',
    type: 'trading-review',
    description:
      'OMD\'s annual publisher review covering all Omnicom client spend across Immediate titles. Critical for retaining Samsung, Dyson, and Volkswagen budgets into H2.',
    pipelineAtRisk: 1_800_000,
    attendees: ['James', 'Rachel', 'Gary'],
    importance: 'critical',
  },
  {
    id: 'evt-cannes-lions',
    name: 'Cannes Lions',
    date: '2026-06-15',
    endDate: '2026-06-19',
    type: 'conference',
    description:
      'International Festival of Creativity. Key networking event with global agency heads and brand CMOs. Hosting a dinner for 12 senior agency contacts on the Tuesday evening.',
    attendees: ['James'],
    importance: 'high',
  },
  {
    id: 'evt-hfss-enforcement',
    name: 'HFSS enforcement escalation',
    date: '2026-07-01',
    type: 'deadline',
    description:
      'Next phase of HFSS advertising restrictions takes effect. Impacts online and TV advertising of products high in fat, sugar, and salt. Estimated £1.8M revenue at risk across food and drink categories. Must have alternative pipeline in place.',
    pipelineAtRisk: 1_800_000,
    importance: 'high',
  },
  {
    id: 'evt-h2-upfronts',
    name: 'H2 upfront season opens',
    date: '2026-06-01',
    endDate: '2026-06-30',
    type: 'deadline',
    description:
      'Window for securing H2 upfront commitments from major agencies. GroupM, Publicis, and Dentsu typically finalise H2 allocations by end of June. Must have rate cards and data packages ready.',
    pipelineAtRisk: 4_200_000,
    attendees: ['James', 'Rachel', 'Gary', 'Elise'],
    importance: 'high',
  },
  {
    id: 'evt-christmas-deadlines',
    name: 'Christmas campaign booking deadline',
    date: '2026-09-15',
    type: 'deadline',
    description:
      'Internal deadline for Christmas/Q4 tentpole campaign bookings. Premium inventory (BBC Good Food Christmas hub, Radio Times Christmas issue) sells out early. Must have 80% of premium slots committed by this date.',
    importance: 'high',
  },
  {
    id: 'evt-publicis-qbr',
    name: 'Publicis Group QBR',
    date: '2026-05-15',
    type: 'trading-review',
    description:
      'Group-level quarterly business review with Publicis UK CEO. First time we\'ve secured this meeting. Agenda: cross-agency spend consolidation, preferred partner status, and data partnership proposal.',
    pipelineAtRisk: 800_000,
    attendees: ['James', 'Rachel'],
    importance: 'critical',
  },
  {
    id: 'evt-ipa-effectiveness',
    name: 'IPA Effectiveness Conference',
    date: '2026-10-08',
    endDate: '2026-10-09',
    type: 'conference',
    description:
      'IPA\'s flagship effectiveness event. Opportunity to present the Charlotte Tilbury shoppable editorial case study and Samsung cross-platform brand lift results. Builds credibility with planners.',
    attendees: ['James', 'Rachel'],
    importance: 'medium',
  },
  {
    id: 'evt-dentsu-h2-pitch',
    name: 'Dentsu H2 pitch day',
    date: '2026-05-28',
    type: 'trading-review',
    description:
      'Dentsu has invited top 5 publishers to pitch for H2 preferred partner status. We\'re currently #2 by spend. Winning preferred status would unlock estimated £600K incremental in H2.',
    pipelineAtRisk: 600_000,
    attendees: ['James', 'Gary'],
    importance: 'high',
  },
  {
    id: 'evt-mid-year-talent-review',
    name: 'Mid-year talent review',
    date: '2026-06-25',
    type: 'internal',
    description:
      'Annual mid-year talent calibration with HR. Must bring updated talent matrix, flight risk assessments, promotion recommendations, and succession plans for all management-level roles.',
    attendees: ['James'],
    importance: 'high',
  },
];
