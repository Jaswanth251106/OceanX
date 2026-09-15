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

// ---- New Extended Types ----

export interface AnalyticsFilterState {
  region: string;
  variable: string;
  timeRange: string;
}

export interface AnalyticsKPIs {
  totalObservations: number;
  dataQualityScore: number;
  modelAccuracyPercentage: number;
  activeAnomalies: number;
}

export interface TemperatureTrendPoint {
  date: string;
  averageSST: number;
  climatologySST: number;
}

export interface SalinityTrendPoint {
  date: string;
  surfaceSalinity: number;
  deepSalinity: number;
}

export interface ModelPerformancePoint {
  modelName: string;
  rmse: number;
  bias: number;
  correlation: number;
}

export interface AnomalySummary {
  id: string;
  region: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  detectedAt: string;
}

export interface InsightItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: 'trend' | 'alert' | 'performance';
}

export interface CompleteAnalyticsData {
  filters: AnalyticsFilterState;
  kpis: AnalyticsKPIs;
  temperatureTrends: TemperatureTrendPoint[];
  salinityTrends: SalinityTrendPoint[];
  modelPerformance: ModelPerformancePoint[];
  anomalies: AnomalySummary[];
  recentInsights: InsightItem[];
}
