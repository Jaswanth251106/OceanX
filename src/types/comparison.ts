// ─────────────────────────────────────────────────────────────────────────────
// Comparison domain types — OceanX / INCOIS Ocean Explorer
// ─────────────────────────────────────────────────────────────────────────────

// ── Legacy types kept for backward compat ────────────────────────────────────
export interface ModelVsObservedComparison {
  timestamp: string;
  observedSst: number;
  modeledSst: number;
  variance: number;
  salinityObserved: number;
  salinityModeled: number;
}

export interface ComparisonScenario {
  id: string;
  name: string;
  sourceA: string;
  sourceB: string;
  parameter: 'Sea Surface Temp' | 'Salinity' | 'Wave Height' | 'Current Velocity';
  stationId: string;
  correlationCoefficient: number;
  rmse: number;
  bias: number;
  timeSeries: ModelVsObservedComparison[];
}

// ── Filter state ─────────────────────────────────────────────────────────────
export type ComparisonVariable = 'temperature' | 'salinity' | 'current_speed';
export type ComparisonRegion =
  | 'arabian_sea'
  | 'bay_of_bengal'
  | 'lakshadweep'
  | 'andaman'
  | 'indian_ocean';

export interface ComparisonFilterState {
  model: string;          // e.g. 'hycom_as'
  observationSource: string; // e.g. 'argo_floats'
  variable: ComparisonVariable;
  region: ComparisonRegion;
  depth: number;          // metres
  date: string;           // ISO date string
}

// ── Model & observation options ───────────────────────────────────────────────
export interface ModelOption {
  id: string;
  label: string;
  shortName: string;
  resolution: string;
  provider: string;
}

export interface ObservationSourceOption {
  id: string;
  label: string;
  shortName: string;
  count: number;
  instrumentType: string;
}

export interface ComparisonOptions {
  models: ModelOption[];
  observationSources: ObservationSourceOption[];
  variables: { id: ComparisonVariable; label: string; unit: string }[];
  regions: { id: ComparisonRegion; label: string }[];
  depths: number[];
}

// ── Profile data ─────────────────────────────────────────────────────────────
export interface TemperatureProfilePoint {
  depth: number;       // metres (positive = deeper)
  modelTemp: number;   // °C
  obsTemp: number;     // °C
}

export interface SalinityProfilePoint {
  depth: number;
  modelSalinity: number; // PSU
  obsSalinity: number;   // PSU
}

// ── Model data card ───────────────────────────────────────────────────────────
export interface ModelDataCard {
  modelId: string;
  modelLabel: string;
  gridId: string;
  forecastTime: string;   // ISO datetime
  initTime: string;       // ISO datetime
  lat: number;
  lon: number;
  resolution: string;
  depth: number;
  temperature: number;
  salinity: number;
  currentSpeed: number | null;
}

// ── Observation data card ─────────────────────────────────────────────────────
export interface ObservationDataCard {
  platformId: string;
  platformLabel: string;
  observationTime: string; // ISO datetime
  lat: number;
  lon: number;
  depth: number;
  temperature: number;
  salinity: number;
  currentSpeed: number | null;
  qcFlag: 'good' | 'probably_good' | 'bad' | 'missing';
}

// ── Model grid match ──────────────────────────────────────────────────────────
export interface ModelGridInfo {
  gridId: string;
  gridLat: number;
  gridLon: number;
  resolution: string;
  nearestObsId: string;
  distanceKm: number;
  temporalOffsetHours: number;
}

// ── Comparison metrics ────────────────────────────────────────────────────────
export interface ComparisonMetrics {
  variable: ComparisonVariable;
  unit: string;
  bias: number;
  rmse: number;
  mae: number;
  correlation: number;
  skillScore: number;
  sampleCount: number;
}

// ── Bias analysis ─────────────────────────────────────────────────────────────
export interface BiasPoint {
  variable: string;
  unit: string;
  bias: number;
  rmse: number;
}

export interface BiasAnalysis {
  points: BiasPoint[];
  summary: string;
}

// ── Complete comparison data ──────────────────────────────────────────────────
export interface CompleteComparisonData {
  filters: ComparisonFilterState;
  modelData: ModelDataCard;
  observationData: ObservationDataCard;
  temperatureProfile: TemperatureProfilePoint[];
  salinityProfile: SalinityProfilePoint[];
  gridInfo: ModelGridInfo;
  metrics: ComparisonMetrics;
  biasAnalysis: BiasAnalysis;
}
