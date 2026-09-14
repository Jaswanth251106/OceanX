import { apiClient } from './apiClient';
import { mockAnalyticsData } from '../mockData/analyticsData';
import { OceanAnalyticsData } from '../types/analytics';

export const analyticsService = {
  async getOceanAnalytics(): Promise<OceanAnalyticsData> {
    const res = await apiClient.get<OceanAnalyticsData>('/api/analytics/ocean-trends', mockAnalyticsData);
    return res.data;
  },
};
