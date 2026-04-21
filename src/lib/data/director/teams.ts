import { managers } from '../salespeople';

export interface DirectorTeam {
  id: string;
  managerName: string;
  managerInitial: string;
  avatarColor: string;
  teamSize: number;
  agencies: string;
  deliveredQ: number;
  targetQ: number;
  percentOfTarget: number;
  deliveryScore: number;
  deliveryScoreDelta: number;
  commissionPool: number;
  pipelineWeighted: number;
  atRiskCampaigns: number;
  ytdRevenue: number;
}

export const directorTeams: DirectorTeam[] = [
  {
    id: 'rachel',
    managerName: 'Rachel',
    managerInitial: 'R',
    avatarColor: '#4AB4E8',
    teamSize: 2,
    agencies: 'Publicis + Omnicom',
    deliveredQ: 2_100_000,
    targetQ: 2_200_000,
    percentOfTarget: 95.5,
    deliveryScore: 87,
    deliveryScoreDelta: 4,
    commissionPool: 218_000,
    pipelineWeighted: 2_900_000,
    atRiskCampaigns: 2,
    ytdRevenue: 4_200_000,
  },
  {
    id: 'gary',
    managerName: 'Gary',
    managerInitial: 'G',
    avatarColor: '#7B4EC9',
    teamSize: 3,
    agencies: 'WPP + Dentsu',
    deliveredQ: 2_600_000,
    targetQ: 2_500_000,
    percentOfTarget: 104,
    deliveryScore: 91,
    deliveryScoreDelta: 2,
    commissionPool: 312_000,
    pipelineWeighted: 3_400_000,
    atRiskCampaigns: 1,
    ytdRevenue: 4_900_000,
  },
  {
    id: 'elise',
    managerName: 'Elise',
    managerInitial: 'E',
    avatarColor: '#FF9D2E',
    teamSize: 2,
    agencies: 'Havas + IPG + Indies',
    deliveredQ: 1_700_000,
    targetQ: 2_000_000,
    percentOfTarget: 85,
    deliveryScore: 74,
    deliveryScoreDelta: -6,
    commissionPool: 164_000,
    pipelineWeighted: 1_800_000,
    atRiskCampaigns: 3,
    ytdRevenue: 3_400_000,
  },
];

export const salesTotal = {
  ytdRevenue: 12_500_000,
  deliveredQ: 6_400_000,
  targetQ: 6_700_000,
  percentOfTarget: 95.5,
  deliveryScore: 84,
  commissionPool: 694_000,
  pipelineWeighted: 8_100_000,
  teamCount: 7,
};
