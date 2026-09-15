import {
  ComparisonScenario,
  ComparisonOptions,
  CompleteComparisonData,
} from '../types/comparison';

// ── Legacy scenarios (kept for any backward-compat usage) ────────────────────
export const mockComparisonData: ComparisonScenario[] = [
  {
    id: 'cmp-01',
    name: 'ROMS Forecast vs OMNI Buoy BD08 SST',
    sourceA: 'INCOIS ROMS Operational Model',
    sourceB: 'In-Situ OMNI Buoy BD08 Sensor',
    parameter: 'Sea Surface Temp',
    stationId: 'BD08 (18.2°N, 89.6°E)',
    correlationCoefficient: 0.94,
    rmse: 0.38,
    bias: 0.12,
    timeSeries: [
      { timestamp: '00:00Z', observedSst: 29.6, modeledSst: 29.8, variance: 0.2, salinityObserved: 32.4, salinityModeled: 32.3 },
      { timestamp: '04:00Z', observedSst: 29.5, modeledSst: 29.7, variance: 0.2, salinityObserved: 32.4, salinityModeled: 32.5 },
      { timestamp: '08:00Z', observedSst: 29.9, modeledSst: 30.1, variance: 0.2, salinityObserved: 32.3, salinityModeled: 32.4 },
      { timestamp: '12:00Z', observedSst: 30.2, modeledSst: 30.3, variance: 0.1, salinityObserved: 32.4, salinityModeled: 32.4 },
      { timestamp: '16:00Z', observedSst: 29.8, modeledSst: 29.9, variance: 0.1, salinityObserved: 32.5, salinityModeled: 32.5 },
      { timestamp: '20:00Z', observedSst: 29.6, modeledSst: 29.6, variance: 0.0, salinityObserved: 32.4, salinityModeled: 32.3 },
    ],
  },
  {
    id: 'cmp-02',
    name: 'WaveWatch III vs Kochi Wave Rider Buoy',
    sourceA: 'WaveWatch III Indian Ocean Mesh',
    sourceB: 'Datawell WaveRider Mk-IV',
    parameter: 'Wave Height',
    stationId: 'WRB-KC (Kochi Coast)',
    correlationCoefficient: 0.96,
    rmse: 0.24,
    bias: -0.08,
    timeSeries: [
      { timestamp: '00:00Z', observedSst: 29.1, modeledSst: 29.0, variance: -0.1, salinityObserved: 34.5, salinityModeled: 34.6 },
      { timestamp: '04:00Z', observedSst: 29.2, modeledSst: 29.1, variance: -0.1, salinityObserved: 34.6, salinityModeled: 34.6 },
      { timestamp: '08:00Z', observedSst: 29.4, modeledSst: 29.3, variance: -0.1, salinityObserved: 34.6, salinityModeled: 34.7 },
      { timestamp: '12:00Z', observedSst: 29.6, modeledSst: 29.5, variance: -0.1, salinityObserved: 34.5, salinityModeled: 34.5 },
      { timestamp: '16:00Z', observedSst: 29.3, modeledSst: 29.2, variance: -0.1, salinityObserved: 34.5, salinityModeled: 34.6 },
      { timestamp: '20:00Z', observedSst: 29.1, modeledSst: 29.1, variance: 0.0, salinityObserved: 34.6, salinityModeled: 34.6 },
    ],
  },
];

// ── Comparison options (dropdowns) ───────────────────────────────────────────
export const mockComparisonOptions: ComparisonOptions = {
  models: [
    { id: 'hycom_as', label: 'HYCOM Arabian Sea (1/12°)', shortName: 'HYCOM-AS', resolution: '1/12°', provider: 'INCOIS' },
    { id: 'copernicus_iog', label: 'Copernicus IBI Ocean (1/10°)', shortName: 'CMEMS-IBI', resolution: '1/10°', provider: 'CMEMS' },
    { id: 'incois_roms', label: 'INCOIS ROMS Operational', shortName: 'ROMS-OPS', resolution: '1/25°', provider: 'INCOIS' },
    { id: 'ww3_io', label: 'WaveWatch III Indian Ocean', shortName: 'WW3-IO', resolution: '0.5°', provider: 'NCMRWF' },
    { id: 'nemo_v4', label: 'NEMO Ocean v4.2', shortName: 'NEMO-v4', resolution: '1/12°', provider: 'IITM' },
  ],
  observationSources: [
    { id: 'argo_floats', label: 'Argo Profiling Floats', shortName: 'Argo', count: 124, instrumentType: 'CTD Float' },
    { id: 'omni_buoys', label: 'OMNI Moored Buoy Network', shortName: 'OMNI', count: 18, instrumentType: 'Surface Buoy' },
    { id: 'wave_rider', label: 'WaveRider Buoys (Coastal)', shortName: 'WaveRider', count: 12, instrumentType: 'Wave Buoy' },
    { id: 'xbt_transects', label: 'XBT Transect Measurements', shortName: 'XBT', count: 48, instrumentType: 'XBT Probe' },
    { id: 'research_vessel', label: 'Research Vessel (CTD Casts)', shortName: 'R/V CTD', count: 36, instrumentType: 'Ship CTD' },
  ],
  variables: [
    { id: 'temperature', label: 'Temperature', unit: '°C' },
    { id: 'salinity', label: 'Salinity', unit: 'PSU' },
    { id: 'current_speed', label: 'Current Speed', unit: 'm/s' },
  ],
  regions: [
    { id: 'arabian_sea', label: 'Arabian Sea' },
    { id: 'bay_of_bengal', label: 'Bay of Bengal' },
    { id: 'lakshadweep', label: 'Lakshadweep Sea' },
    { id: 'andaman', label: 'Andaman Sea' },
    { id: 'indian_ocean', label: 'North Indian Ocean (Combined)' },
  ],
  depths: [0, 10, 25, 50, 75, 100, 150, 200, 300, 500, 700, 1000],
};

// ── Complete comparison result (default: HYCOM-AS, Argo, Temperature) ────────
export const mockCompleteComparisonData: CompleteComparisonData = {
  filters: {
    model: 'hycom_as',
    observationSource: 'argo_floats',
    variable: 'temperature',
    region: 'arabian_sea',
    depth: 0,
    date: '2026-09-10',
  },
  modelData: {
    modelId: 'hycom_as',
    modelLabel: 'HYCOM Arabian Sea (1/12°)',
    gridId: 'HYCOM-AS-15-067',
    forecastTime: '2026-09-10T12:00:00Z',
    initTime: '2026-09-10T00:00:00Z',
    lat: 15.25,
    lon: 67.42,
    resolution: '1/12°',
    depth: 0,
    temperature: 28.3,
    salinity: 35.8,
    currentSpeed: 0.42,
  },
  observationData: {
    platformId: 'IN2026-0842',
    platformLabel: 'Argo Float IN2026-0842',
    observationTime: '2026-09-10T10:34:00Z',
    lat: 14.98,
    lon: 67.64,
    depth: 0,
    temperature: 28.1,
    salinity: 35.72,
    currentSpeed: null,
    qcFlag: 'good',
  },
  temperatureProfile: [
    { depth: 0,    modelTemp: 28.3, obsTemp: 28.1 },
    { depth: 50,   modelTemp: 28.0, obsTemp: 27.9 },
    { depth: 100,  modelTemp: 27.5, obsTemp: 27.4 },
    { depth: 200,  modelTemp: 25.9, obsTemp: 25.7 },
    { depth: 300,  modelTemp: 24.1, obsTemp: 23.9 },
    { depth: 500,  modelTemp: 20.0, obsTemp: 19.8 },
    { depth: 700,  modelTemp: 15.9, obsTemp: 15.7 },
    { depth: 1000, modelTemp: 11.4, obsTemp: 11.2 },
  ],
  salinityProfile: [
    { depth: 0,    modelSalinity: 35.80, obsSalinity: 35.72 },
    { depth: 50,   modelSalinity: 35.92, obsSalinity: 35.84 },
    { depth: 100,  modelSalinity: 36.14, obsSalinity: 36.06 },
    { depth: 200,  modelSalinity: 36.52, obsSalinity: 36.44 },
    { depth: 300,  modelSalinity: 36.71, obsSalinity: 36.63 },
    { depth: 500,  modelSalinity: 35.90, obsSalinity: 35.82 },
    { depth: 700,  modelSalinity: 35.21, obsSalinity: 35.13 },
    { depth: 1000, modelSalinity: 34.82, obsSalinity: 34.74 },
  ],
  gridInfo: {
    gridId: 'HYCOM-AS-15-067',
    gridLat: 15.25,
    gridLon: 67.42,
    resolution: '1/12°',
    nearestObsId: 'IN2026-0842',
    distanceKm: 24.6,
    temporalOffsetHours: 1.4,
  },
  metrics: {
    variable: 'temperature',
    unit: '°C',
    bias: 0.20,
    rmse: 0.34,
    mae: 0.21,
    correlation: 0.96,
    skillScore: 0.91,
    sampleCount: 248,
  },
  biasAnalysis: {
    points: [
      { variable: 'Temperature', unit: '°C',   bias: 0.20,  rmse: 0.34 },
      { variable: 'Salinity',    unit: 'PSU',  bias: -0.08, rmse: 0.12 },
      { variable: 'Curr. Speed', unit: 'm/s',  bias: 0.04,  rmse: 0.07 },
    ],
    summary:
      'Model exhibits a warm bias of +0.20 °C in the upper 300 m thermocline. ' +
      'Salinity is slightly fresh-biased (−0.08 PSU). ' +
      'Current speed overestimates observed by 0.04 m/s on average.',
  },
};
