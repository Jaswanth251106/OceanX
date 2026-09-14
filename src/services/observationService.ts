import { apiClient } from './apiClient';
import {
  mockObservationRecords,
  mockDepthProfiles,
  mockRecentMeasurements,
  mockObservationSummary,
} from '../mockData/observationData';
import {
  OceanObservationRecord,
  ObservationFilterState,
  DepthProfilePoint,
  RecentMeasurementItem,
  ObservationPlatformSummary,
} from '../types/observation';

export const observationService = {
  async getObservations(filter?: Partial<ObservationFilterState>): Promise<OceanObservationRecord[]> {
    const res = await apiClient.get<OceanObservationRecord[]>('/api/observations', mockObservationRecords);
    let data = [...res.data];

    if (filter) {
      if (filter.instrumentType && filter.instrumentType !== 'ALL') {
        data = data.filter((item) => item.type === filter.instrumentType);
      }
      if (filter.status && filter.status !== 'ALL') {
        data = data.filter((item) => item.status === filter.status);
      }
      if (filter.region && filter.region !== 'ALL') {
        data = data.filter((item) => item.region === filter.region || item.basin === filter.region);
      }
      if (filter.depth && filter.depth !== 'ALL') {
        data = data.filter((item) => item.depthCategory === filter.depth);
      }
      if (filter.variable && filter.variable !== 'ALL') {
        // Check that the instrument records the selected variable
        data = data.filter((item) => {
          switch (filter.variable) {
            case 'temperature':
              return item.parameters.seaSurfaceTemperatureCelsius !== undefined;
            case 'salinity':
              return item.parameters.salinityPsu !== undefined;
            case 'pressure':
              return item.parameters.pressureDbar !== undefined;
            case 'chlorophyll':
              return item.parameters.chlorophyllMgM3 !== undefined;
            case 'wave-height':
              return item.parameters.significantWaveHeightMeters !== undefined;
            case 'sea-level':
              return item.parameters.seaLevelAnomalyCm !== undefined;
            default:
              return true;
          }
        });
      }
      if (filter.searchQuery && filter.searchQuery.trim() !== '') {
        const q = filter.searchQuery.toLowerCase().trim();
        data = data.filter(
          (item) =>
            item.name.toLowerCase().includes(q) ||
            item.instrumentId.toLowerCase().includes(q) ||
            item.platform.toLowerCase().includes(q) ||
            item.region.toLowerCase().includes(q)
        );
      }
    }

    return data;
  },

  async getObservationById(id: string): Promise<OceanObservationRecord | undefined> {
    const records = await this.getObservations();
    return records.find((item) => item.id === id || item.instrumentId === id);
  },

  async getObservationProfile(id: string): Promise<DepthProfilePoint[]> {
    const profile = mockDepthProfiles[id] || mockDepthProfiles.default;
    const res = await apiClient.get<DepthProfilePoint[]>(`/api/observations/${id}/profile`, profile);
    return res.data;
  },

  async getRecentMeasurements(_id: string): Promise<RecentMeasurementItem[]> {
    const res = await apiClient.get<RecentMeasurementItem[]>(`/api/observations/${_id}/measurements`, mockRecentMeasurements);
    return res.data;
  },

  async getObservationSummary(): Promise<ObservationPlatformSummary> {
    const res = await apiClient.get<ObservationPlatformSummary>('/api/observations/summary', mockObservationSummary);
    return res.data;
  },
};
