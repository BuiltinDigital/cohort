// Compensation benchmarking: internal vs market rates
// Director Dashboard — Cohort (Immediate Media Sales OS)

export interface CompBenchmark {
  role: string;
  level: string;
  internalAvg: number;
  marketMedian: number;
  marketP75: number;
  variance: number;
  headcount: number;
}

export interface IndividualComp {
  name: string;
  role: string;
  manager: string;
  baseSalary: number;
  ote: number;
  marketMedian: number;
  variancePercent: number;
  isBelow: boolean;
}

export const compBenchmarks: CompBenchmark[] = [
  {
    role: 'Account Manager',
    level: 'Mid',
    internalAvg: 52_000,
    marketMedian: 55_000,
    marketP75: 61_000,
    variance: -5.5,
    headcount: 4,
  },
  {
    role: 'Senior Account Manager',
    level: 'Senior',
    internalAvg: 68_000,
    marketMedian: 72_000,
    marketP75: 79_000,
    variance: -5.6,
    headcount: 2,
  },
  {
    role: 'Sales Manager',
    level: 'Manager',
    internalAvg: 85_000,
    marketMedian: 82_000,
    marketP75: 90_000,
    variance: 3.7,
    headcount: 3,
  },
  {
    role: 'Director',
    level: 'Director',
    internalAvg: 120_000,
    marketMedian: 118_000,
    marketP75: 132_000,
    variance: 1.7,
    headcount: 1,
  },
];

export const individualComp: IndividualComp[] = [
  {
    name: 'Alicia',
    role: 'Senior Account Manager',
    manager: 'Rachel',
    baseSalary: 73_000,
    ote: 98_000,
    marketMedian: 72_000,
    variancePercent: 1.4,
    isBelow: false,
  },
  {
    name: 'Renita',
    role: 'Account Manager',
    manager: 'Rachel',
    baseSalary: 48_000,
    ote: 64_000,
    marketMedian: 55_000,
    variancePercent: -12.7,
    isBelow: true,
  },
  {
    name: 'Marcus',
    role: 'Senior Account Manager',
    manager: 'Gary',
    baseSalary: 74_000,
    ote: 108_000,
    marketMedian: 72_000,
    variancePercent: 2.8,
    isBelow: false,
  },
  {
    name: 'Sarah',
    role: 'Account Manager',
    manager: 'Gary',
    baseSalary: 56_000,
    ote: 74_000,
    marketMedian: 55_000,
    variancePercent: 1.8,
    isBelow: false,
  },
  {
    name: 'Tom',
    role: 'Account Manager',
    manager: 'Gary',
    baseSalary: 49_000,
    ote: 62_000,
    marketMedian: 55_000,
    variancePercent: -10.9,
    isBelow: true,
  },
  {
    name: 'Priya',
    role: 'Senior Account Manager',
    manager: 'Elise',
    baseSalary: 64_000,
    ote: 84_000,
    marketMedian: 72_000,
    variancePercent: -11.1,
    isBelow: true,
  },
  {
    name: 'Dan',
    role: 'Account Manager',
    manager: 'Elise',
    baseSalary: 42_000,
    ote: 56_000,
    marketMedian: 55_000,
    variancePercent: -23.6,
    isBelow: false,
  },
];
