import { apiClient } from './apiClient';
import { mockSettingsData } from '../mockData/settingsData';
import { SettingsData, UserPreference } from '../types/settings';

export const settingsService = {
  async getSettingsData(): Promise<SettingsData> {
    const res = await apiClient.get<SettingsData>('/api/settings', mockSettingsData);
    return res.data;
  },

  async updatePreferences(newPrefs: Partial<UserPreference>): Promise<UserPreference> {
    const current = mockSettingsData.preferences;
    const updated = { ...current, ...newPrefs };
    const res = await apiClient.post<UserPreference>('/api/settings/preferences', updated, updated);
    return res.data;
  },
};
