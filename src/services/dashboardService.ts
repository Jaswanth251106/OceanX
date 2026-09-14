import { apiClient } from './apiClient';
import { mockCompleteDashboardData } from '../mockData/dashboardData';
import { CompleteDashboardData, ActiveAlertItem } from '../types/dashboard';

export const dashboardService = {
  async getOverviewData(): Promise<CompleteDashboardData> {
    const res = await apiClient.get<CompleteDashboardData>('/api/dashboard/overview', mockCompleteDashboardData);
    return res.data;
  },

  async getActiveAlerts(): Promise<ActiveAlertItem[]> {
    const res = await apiClient.get<ActiveAlertItem[]>('/api/dashboard/alerts', mockCompleteDashboardData.alertSummary.alerts);
    return res.data;
  },
};
