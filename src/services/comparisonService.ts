import { apiClient } from './apiClient';
import {
  mockComparisonData,
  mockComparisonOptions,
  mockCompleteComparisonData,
} from '../mockData/comparisonData';
import {
  ComparisonScenario,
  ComparisonOptions,
  CompleteComparisonData,
  ComparisonFilterState,
  ComparisonMetrics,
  BiasAnalysis,
  TemperatureProfilePoint,
  SalinityProfilePoint,
} from '../types/comparison';

export const comparisonService = {
  // ── Legacy ────────────────────────────────────────────────────────────────
  async getComparisonScenarios(): Promise<ComparisonScenario[]> {
    const res = await apiClient.get<ComparisonScenario[]>(
      '/api/comparison/scenarios',
      mockComparisonData,
    );
    return res.data;
  },

  async getScenarioById(id: string): Promise<ComparisonScenario | undefined> {
    const scenarios = await this.getComparisonScenarios();
    return scenarios.find((s) => s.id === id);
  },

  // ── New ───────────────────────────────────────────────────────────────────
  async getComparisonOptions(): Promise<ComparisonOptions> {
    const res = await apiClient.get<ComparisonOptions>(
      '/api/comparison/options',
      mockComparisonOptions,
    );
    return res.data;
  },

  async getComparisonData(
    _filters: ComparisonFilterState,
  ): Promise<CompleteComparisonData> {
    // In production _filters would be passed as query params.
    // For now the mock always returns the Arabian Sea / HYCOM / Argo dataset.
    const res = await apiClient.get<CompleteComparisonData>(
      '/api/comparison/data',
      mockCompleteComparisonData,
    );
    return res.data;
  },

  async getTemperatureProfile(
    _filters: ComparisonFilterState,
  ): Promise<TemperatureProfilePoint[]> {
    const data = await this.getComparisonData(_filters);
    return data.temperatureProfile;
  },

  async getSalinityProfile(
    _filters: ComparisonFilterState,
  ): Promise<SalinityProfilePoint[]> {
    const data = await this.getComparisonData(_filters);
    return data.salinityProfile;
  },

  async getComparisonMetrics(
    _filters: ComparisonFilterState,
  ): Promise<ComparisonMetrics> {
    const data = await this.getComparisonData(_filters);
    return data.metrics;
  },

  async getBiasAnalysis(
    _filters: ComparisonFilterState,
  ): Promise<BiasAnalysis> {
    const data = await this.getComparisonData(_filters);
    return data.biasAnalysis;
  },
};
