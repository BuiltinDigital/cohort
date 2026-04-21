// Forecast Tracking — quarterly forecast accuracy over 8 quarters

export interface ForecastAccuracyRecord {
  quarter: string;
  forecastAtStart: number;
  forecastMidQuarter: number;
  actual: number;
  variancePercent: number;
  withinTarget: boolean; // within 5%
}

export const forecastAccuracy: ForecastAccuracyRecord[] = [
  {
    quarter: 'Q3 2024',
    forecastAtStart: 3_200_000,
    forecastMidQuarter: 3_050_000,
    actual: 2_840_000,
    variancePercent: -11.3,
    withinTarget: false,
  },
  {
    quarter: 'Q4 2024',
    forecastAtStart: 3_800_000,
    forecastMidQuarter: 3_600_000,
    actual: 3_480_000,
    variancePercent: -8.4,
    withinTarget: false,
  },
  {
    quarter: 'Q1 2025',
    forecastAtStart: 3_000_000,
    forecastMidQuarter: 2_920_000,
    actual: 2_640_000,
    variancePercent: -12.0,
    withinTarget: false,
  },
  {
    quarter: 'Q2 2025',
    forecastAtStart: 3_600_000,
    forecastMidQuarter: 3_520_000,
    actual: 3_360_000,
    variancePercent: -6.7,
    withinTarget: false,
  },
  {
    quarter: 'Q3 2025',
    forecastAtStart: 3_400_000,
    forecastMidQuarter: 3_380_000,
    actual: 3_320_000,
    variancePercent: -2.4,
    withinTarget: true,
  },
  {
    quarter: 'Q4 2025',
    forecastAtStart: 4_100_000,
    forecastMidQuarter: 4_060_000,
    actual: 4_020_000,
    variancePercent: -2.0,
    withinTarget: true,
  },
  {
    quarter: 'Q1 2026',
    forecastAtStart: 3_200_000,
    forecastMidQuarter: 3_240_000,
    actual: 3_340_000,
    variancePercent: 4.4,
    withinTarget: true,
  },
  {
    quarter: 'Q2 2026',
    forecastAtStart: 3_800_000,
    forecastMidQuarter: 3_850_000,
    actual: 3_920_000,
    variancePercent: 3.2,
    withinTarget: true,
  },
];

export const forecastSummary = {
  currentQuarter: 'Q2 2026',
  currentForecast: 3_850_000,
  quarterlyTarget: 3_800_000,
  ytdForecastAccuracy: 3.8, // average absolute variance last 4 quarters
  streakWithinTarget: 4, // consecutive quarters within 5%
  bestQuarter: 'Q4 2025', // lowest variance
  worstQuarter: 'Q1 2025', // highest variance
  improvementTrend: 'Forecast accuracy has improved from avg 9.6% variance (Q3 2024 - Q2 2025) to avg 3.0% variance (Q3 2025 - Q2 2026)',
};
