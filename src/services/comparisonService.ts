import { apiClient } from './apiClient';
import { mockComparisonData } from '../mockData/comparisonData';
import { ComparisonScenario } from '../types/comparison';

export const comparisonService = {
  async getComparisonScenarios(): Promise<ComparisonScenario[]> {
    const res = await apiClient.get<ComparisonScenario[]>('/api/comparison/scenarios', mockComparisonData);
    return res.data;
  },

  async getScenarioById(id: string): Promise<ComparisonScenario | undefined> {
    const scenarios = await this.getComparisonScenarios();
    return scenarios.find((s) => s.id === id);
  },
};
