// ============================================================
// ANALYTICS API TYPES
// Derived from actual API responses at:
// https://sih2026-oceanx.onrender.com/api/analytics/*
// ============================================================

// ---- Existing filter/display types (unchanged) ----

export interface AnalyticsFilterState {
  region: string;
  variable: string;
  timeRange: string;
}

// ---- /api/analytics/summary ----

export interface ApiAnalyticsSummary {
  total_observations: number;
  argo_model_comparisons: number;
  temperature_mae: number;
  temperature_bias: number;
  temperature_rmse: number;
  model_accuracy_score: number;
}

// ---- /api/analytics/temperature-trend ----

export interface ApiTemperaturePoint {
  month: string;        // e.g. "2025-01"
  temperature: number;  // °C
  observations: number;
}

// ---- /api/analytics/salinity-depth ----

export interface ApiSalinityDepthPoint {
  depth: number;       // metres
  salinity: number;    // PSU
  observations: number;
}

// ---- /api/analytics/model-performance ----

export interface ApiModelMetrics {
  bias: number;
  mae: number;
  rmse: number;
}

export interface ApiModelPerformance {
  model: string;
  temperature: ApiModelMetrics;
  salinity: ApiModelMetrics;
}

// ---- /api/analytics/anomalies ----
// The API currently returns an empty array [].
// Shape is unknown until the backend provides data.
// Using a flexible record type for forward compatibility.

export interface ApiAnomaly {
  id?: string;
  type?: string;
  region?: string;
  variable?: string;
  severity?: string;
  description?: string;
  detected_at?: string;
  [key: string]: unknown; // allow any additional fields
}

// ---- Legacy types kept for reference (not used by new API flow) ----

export interface OceanTrendDataPoint {
  date: string;
  anomalyCelsius: number;
  baselineCelsius: number;
  oceanHeatContentZJ: number;
}

export interface BasinAnalysisSummary {
  basin: string;
  meanSst: number;
  annualAnomaly: number;
  marineHeatwaveDays: number;
  confidenceScore: number;
}
