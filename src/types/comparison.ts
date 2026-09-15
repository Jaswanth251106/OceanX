// ─────────────────────────────────────────────────────────────────────────────
// Comparison domain types — Real Backend API Models + Complete Interfaces
// ─────────────────────────────────────────────────────────────────────────────

export type PlatformType = 'ARGO' | 'GLIDER';
export type RegionOption = 'Arabian Sea' | 'Bay of Bengal';

// ── Backend API Response Interfaces ──────────────────────────────────────────

// ARGO Float from API: GET /api/argo/floats
export interface ArgoFloatItem {
  platform_id: string;
  platform_type: string;
  latitude: number;
  longitude: number;
  last_seen: string;
}

export interface ArgoFloatsResponse {
  count: number;
  floats: ArgoFloatItem[];
}

// Glider from API: GET /api/glider/gliders
export interface GliderItem {
  glider_id: string;
  glider_name: string;
  latitude: number;
  longitude: number;
  last_seen: string;
}

export interface GlidersResponse {
  count: number;
  gliders: GliderItem[];
}

// Single comparison measurement pair
export interface ParameterComparisonValue {
  argo?: number | null;
  glider?: number | null;
  model: number | null;
  difference: number | null;
}

// ARGO Comparison Record: GET /api/comparison/argo?platform_id={id}&limit=100&offset=0
export interface ArgoComparisonRecord {
  platform_id: string;
  cycle_number: number;
  observation_time: string;
  latitude: number;
  longitude: number;
  depth: number;
  temperature: ParameterComparisonValue;
  salinity: ParameterComparisonValue;
}

export interface ArgoComparisonResponse {
  count: number;
  limit: number;
  offset: number;
  comparisons: ArgoComparisonRecord[];
}

// Glider Comparison Record: GET /api/comparison/glider?glider_id={id}&limit=100&offset=0
export interface GliderComparisonRecord {
  glider_id: string;
  observation_time: string;
  latitude: number;
  longitude: number;
  depth: number;
  temperature: ParameterComparisonValue;
  salinity: ParameterComparisonValue;
}

export interface GliderComparisonResponse {
  count: number;
  limit: number;
  offset: number;
  comparisons: GliderComparisonRecord[];
}

// Comparison Summary Metric Group (Temperature / Salinity)
export interface ComparisonSummaryMetricGroup {
  valid_comparisons: number;
  bias: number;
  mae: number;
  rmse: number;
}

// Comparison Summary Response (ARGO & Glider)
export interface ComparisonSummaryResponse {
  dataset: string;
  observation_source: string;
  glider_id?: string;
  temperature: ComparisonSummaryMetricGroup;
  salinity: ComparisonSummaryMetricGroup;
}

// ── Shared Domain & Component Interfaces ─────────────────────────────────────

export interface ObservationDatasetOption {
  id: string;
  label: string;
  platform: PlatformType;
  region: RegionOption;
  date: string;
  depthRange: string;
  parameters: string[];
}

export interface WorkflowFilterState {
  platform: PlatformType;
  region: RegionOption;
  datasetId: string;
}

export interface ModelVsObsComparisonPayload {
  workflow: PlatformType;
  region: RegionOption;
  datasetId: string;
  datasetLabel: string;
  modelName: string;
  modelGridId: string;
  forecastTime: string;
  comparisonData: {
    depthProfile?: { depth: number; modelValue: number; obsValue: number }[];
    timeSeries?: { timestamp: string; modelValue: number; obsValue: number }[];
  };
  summary: {
    bias?: number;
    rmse?: number;
    mae?: number;
    correlation?: number;
    skillScore?: number;
    sampleCount?: number;
    notes?: string;
  };
}

// ── Legacy Component Interfaces (Kept for full build compatibility) ───────────

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

export type ComparisonVariable = 'temperature' | 'salinity' | 'current_speed';
export type ComparisonRegion =
  | 'arabian_sea'
  | 'bay_of_bengal'
  | 'lakshadweep'
  | 'andaman'
  | 'indian_ocean';

export interface ComparisonFilterState {
  model: string;
  observationSource: string;
  variable: ComparisonVariable;
  region: ComparisonRegion;
  depth: number;
  date: string;
}

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

export interface TemperatureProfilePoint {
  depth: number;
  modelTemp: number;
  obsTemp: number;
}

export interface SalinityProfilePoint {
  depth: number;
  modelSalinity: number;
  obsSalinity: number;
}

export interface ModelDataCard {
  modelId: string;
  modelLabel: string;
  gridId: string;
  forecastTime: string;
  initTime: string;
  lat: number;
  lon: number;
  resolution: string;
  depth: number;
  temperature: number;
  salinity: number;
  currentSpeed: number | null;
}

export interface ObservationDataCard {
  platformId: string;
  platformLabel: string;
  observationTime: string;
  lat: number;
  lon: number;
  depth: number;
  temperature: number;
  salinity: number;
  currentSpeed: number | null;
  qcFlag: 'good' | 'probably_good' | 'bad' | 'missing';
}

export interface ModelGridInfo {
  gridId: string;
  gridLat: number;
  gridLon: number;
  resolution: string;
  nearestObsId: string;
  distanceKm: number;
  temporalOffsetHours: number;
}

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
