/**
 * Legacy Analytics Mock Data
 *
 * These mock datasets are no longer used by the Analytics service
 * (which now fetches from the live backend at sih2026-oceanx.onrender.com).
 * Retained for backward compatibility if any other module references them.
 */

import {
  OceanTrendDataPoint,
  BasinAnalysisSummary,
} from '../types/analytics';

export const mockLegacyAnalyticsData = {
  timeframe: '2026 Q1-Q3 Observational Aggregate',
  basinSummaries: [
    {
      basin: 'Bay of Bengal',
      meanSst: 29.8,
      annualAnomaly: 0.94,
      marineHeatwaveDays: 42,
      confidenceScore: 98.4,
    },
    {
      basin: 'Arabian Sea',
      meanSst: 28.9,
      annualAnomaly: 1.12,
      marineHeatwaveDays: 56,
      confidenceScore: 97.8,
    },
    {
      basin: 'Equatorial Indian Ocean',
      meanSst: 29.3,
      annualAnomaly: 0.65,
      marineHeatwaveDays: 28,
      confidenceScore: 99.1,
    },
    {
      basin: 'Southern Indian Ocean',
      meanSst: 18.2,
      annualAnomaly: 0.41,
      marineHeatwaveDays: 14,
      confidenceScore: 95.7,
    },
  ] as BasinAnalysisSummary[],
  sstAnomaliesTimeSeries: [
    { date: 'Jan 2026', anomalyCelsius: 0.62, baselineCelsius: 28.2, oceanHeatContentZJ: 242.1 },
    { date: 'Feb 2026', anomalyCelsius: 0.71, baselineCelsius: 28.4, oceanHeatContentZJ: 243.5 },
    { date: 'Mar 2026', anomalyCelsius: 0.88, baselineCelsius: 28.9, oceanHeatContentZJ: 245.8 },
    { date: 'Apr 2026', anomalyCelsius: 1.04, baselineCelsius: 29.5, oceanHeatContentZJ: 248.2 },
    { date: 'May 2026', anomalyCelsius: 1.18, baselineCelsius: 29.8, oceanHeatContentZJ: 250.6 },
    { date: 'Jun 2026', anomalyCelsius: 0.95, baselineCelsius: 29.1, oceanHeatContentZJ: 249.1 },
    { date: 'Jul 2026', anomalyCelsius: 0.82, baselineCelsius: 28.6, oceanHeatContentZJ: 247.9 },
    { date: 'Aug 2026', anomalyCelsius: 0.79, baselineCelsius: 28.5, oceanHeatContentZJ: 247.4 },
    { date: 'Sep 2026', anomalyCelsius: 0.85, baselineCelsius: 28.7, oceanHeatContentZJ: 248.3 },
  ] as OceanTrendDataPoint[],
};
