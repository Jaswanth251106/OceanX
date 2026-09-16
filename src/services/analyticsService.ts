/**
 * Analytics Service — OceanX
 *
 * Communicates with the Analytics backend endpoints at:
 * https://sih2026-oceanx.onrender.com/api/analytics/*
 *
 * No authentication is required.
 * All endpoints are GET requests.
 * Base URL is centralised here — do not repeat it in components.
 */

import {
  ApiAnalyticsSummary,
  ApiTemperaturePoint,
  ApiSalinityDepthPoint,
  ApiModelPerformance,
  ApiAnomaly,
} from '../types/analytics';

const ANALYTICS_BASE_URL = 'https://sih2026-oceanx.onrender.com/api/analytics';

async function fetchJson<T>(path: string): Promise<T> {
  const response = await fetch(`${ANALYTICS_BASE_URL}${path}`);
  if (!response.ok) {
    throw new Error(
      `Analytics API error: ${response.status} ${response.statusText} for ${path}`
    );
  }
  return response.json() as Promise<T>;
}

export const analyticsService = {
  /**
   * GET /api/analytics/summary
   * Returns aggregate KPI values and GLORYS model metrics.
   */
  async getSummary(): Promise<ApiAnalyticsSummary> {
    return fetchJson<ApiAnalyticsSummary>('/summary');
  },

  /**
   * GET /api/analytics/temperature-trend
   * Returns monthly averaged temperature from Argo float observations.
   */
  async getTemperatureTrend(): Promise<ApiTemperaturePoint[]> {
    return fetchJson<ApiTemperaturePoint[]>('/temperature-trend');
  },

  /**
   * GET /api/analytics/salinity-depth
   * Returns salinity binned by depth — a true depth-profile dataset.
   */
  async getSalinityDepth(): Promise<ApiSalinityDepthPoint[]> {
    return fetchJson<ApiSalinityDepthPoint[]>('/salinity-depth');
  },

  /**
   * GET /api/analytics/model-performance
   * Returns GLORYS / Copernicus model performance metrics
   * (bias, MAE, RMSE) for both temperature and salinity.
   */
  async getModelPerformance(): Promise<ApiModelPerformance> {
    return fetchJson<ApiModelPerformance>('/model-performance');
  },

  /**
   * GET /api/analytics/anomalies
   * Returns active anomaly events.
   * Currently returns [] from the backend — empty state is valid.
   */
  async getAnomalies(): Promise<ApiAnomaly[]> {
    return fetchJson<ApiAnomaly[]>('/anomalies');
  },
};
