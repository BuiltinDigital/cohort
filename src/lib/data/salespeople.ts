export interface Salesperson {
  id: string;
  name: string;
  role: 'salesperson' | 'manager';
  agencies: string[];
  parentGroup: string;
  deliveredQ2: number;
  deliveryScore: number;
  deliveryScoreDelta: number;
  campaignCount: number;
  atRisk: number;
  watching: number;
  q2TargetProgress: number;
  avatarColor: string;
}

export interface Manager {
  id: string;
  name: string;
  teams: string;
  reportCount: number;
  ytdRevenue: number;
  vsQ1Delta: number;
  rank: number;
  avatarColor: string;
}

export const salespeople: Salesperson[] = [
  {
    id: 'alicia',
    name: 'Alicia',
    role: 'salesperson',
    agencies: ['Starcom', 'Zenith', 'Spark Foundry', 'Digitas'],
    parentGroup: 'Publicis',
    deliveredQ2: 1800000,
    deliveryScore: 89,
    deliveryScoreDelta: 3,
    campaignCount: 10,
    atRisk: 1,
    watching: 0,
    q2TargetProgress: 0,
    avatarColor: '#7B4EC9',
  },
  {
    id: 'renita',
    name: 'Renita',
    role: 'salesperson',
    agencies: ['OMD', 'PHD', 'Hearts & Science', 'MGMD'],
    parentGroup: 'Omnicom',
    deliveredQ2: 2400000,
    deliveryScore: 85,
    deliveryScoreDelta: -2,
    campaignCount: 8,
    atRisk: 1,
    watching: 2,
    q2TargetProgress: 0,
    avatarColor: '#E89F4A',
  },
];

export const managers: Manager[] = [
  {
    id: 'rachel',
    name: 'Rachel',
    teams: 'Publicis + Omnicom',
    reportCount: 2,
    ytdRevenue: 4200000,
    vsQ1Delta: 11,
    rank: 2,
    avatarColor: '#4AB4E8',
  },
  {
    id: 'gary',
    name: 'Gary',
    teams: 'WPP + Dentsu',
    reportCount: 3,
    ytdRevenue: 4900000,
    vsQ1Delta: 6,
    rank: 1,
    avatarColor: '#7B4EC9',
  },
  {
    id: 'elise',
    name: 'Elise',
    teams: 'Havas + IPG + Indies',
    reportCount: 2,
    ytdRevenue: 3400000,
    vsQ1Delta: -3,
    rank: 3,
    avatarColor: '#FF9D2E',
  },
];

export const salesTotal = {
  ytdRevenue: 12500000,
  vsQ1Delta: 5,
};
