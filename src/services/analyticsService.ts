import { apiClient } from './apiClient';
import { mockLegacyAnalyticsData, mockCompleteAnalyticsData } from '../mockData/analyticsData';
import { CompleteAnalyticsData, AnalyticsFilterState } from '../types/analytics';

export const analyticsService = {
  // Keep legacy for compat if needed elsewhere
  async getOceanAnalytics(): Promise<any> {
    const res = await apiClient.get<any>('/api/analytics/ocean-trends', mockLegacyAnalyticsData);
    return res.data;
  },

  // New comprehensive endpoint
  async getAnalyticsDashboard(_filters: AnalyticsFilterState): Promise<CompleteAnalyticsData> {
    // In a real app, filters would be query parameters
    const res = await apiClient.get<CompleteAnalyticsData>('/api/analytics/dashboard', mockCompleteAnalyticsData);
    return res.data;
  }
};
