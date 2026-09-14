export interface OceanTrendDataPoint {
  date: string;
  anomalyCelsius: number;
  baselineCelsius: number;
  oceanHeatContentZJ: number; // ZettaJoules
}

export interface BasinAnalysisSummary {
  basin: string;
  meanSst: number;
  annualAnomaly: number;
  marineHeatwaveDays: number;
  confidenceScore: number;
}

export interface OceanAnalyticsData {
  timeframe: string;
  basinSummaries: BasinAnalysisSummary[];
  sstAnomaliesTimeSeries: OceanTrendDataPoint[];
}
