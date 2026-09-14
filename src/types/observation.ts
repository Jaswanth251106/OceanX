export type InstrumentType =
  | 'argo-float'
  | 'moored-buoy'
  | 'wave-rider-buoy'
  | 'tide-gauge'
  | 'ship-observation';

export type InstrumentStatus = 'active' | 'warning' | 'inactive';

export interface OceanObservationRecord {
  id: string;
  instrumentId: string;
  name: string;
  platform: 'ARGO Float' | 'Moored Buoy' | 'Wave Rider' | 'Coastal Tide Gauge' | 'Ship Observation';
  type: InstrumentType;
  region: 'Arabian Sea' | 'Bay of Bengal' | 'Equatorial Indian Ocean' | 'Southern Indian Ocean';
  basin: string; // for compatibility
  coordinates: {
    latitude: number;
    longitude: number;
  };
  depthMeters: number;
  depthCategory: 'surface' | '0-100m' | '100-500m' | '500-1000m' | '>1000m';
  lastPing: string;
  timestamp: string;
  parameters: {
    seaSurfaceTemperatureCelsius: number;
    salinityPsu: number;
    pressureDbar?: number;
    significantWaveHeightMeters?: number;
    chlorophyllMgM3?: number;
    seaLevelAnomalyCm?: number;
    currentSpeedKnots?: number;
    dissolvedOxygenMgL?: number;
  };
  status: InstrumentStatus;
  batteryPercent: number;
}

export interface ObservationFilterState {
  instrumentType: string; // 'ALL' or InstrumentType
  status: string;         // 'ALL' or InstrumentStatus
  dateRange: string;      // '24h' | '7d' | '30d' | 'custom'
  region: string;         // 'ALL' or region name
  variable: string;       // 'ALL' | 'temperature' | 'salinity' | 'pressure' | 'chlorophyll' | 'wave-height' | 'sea-level'
  depth: string;          // 'ALL' | 'surface' | '0-100m' | '100-500m' | '500-1000m' | '>1000m'
  searchQuery: string;
}

export interface DepthProfilePoint {
  depthMeters: number;
  temperatureCelsius: number;
  salinityPsu: number;
  pressureDbar: number;
  dissolvedOxygenMgL?: number;
}

export interface RecentMeasurementItem {
  id: string;
  timeAgo: string;
  depthMeters: number;
  temperatureCelsius: number;
  salinityPsu: number;
  pressureDbar: number;
  quality: 'Good' | 'Estimated' | 'Suspect';
}

export interface ObservationPlatformSummary {
  totalPlatforms: number;
  lastSynchronized: string;
  filterCounts: {
    active: number;
    warning: number;
    inactive: number;
  };
}
