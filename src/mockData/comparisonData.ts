import {
  ObservationDatasetOption,
  PlatformType,
  RegionOption,
  ModelVsObsComparisonPayload,
  ComparisonScenario,
  ComparisonOptions,
  CompleteComparisonData,
} from '../types/comparison';

// ── ARGO Datasets (21 items: 12 Arabian Sea, 9 Bay of Bengal) ────────────────
export const mockArgoDatasets: ObservationDatasetOption[] = [
  // Arabian Sea (12)
  { id: 'ARGO-AS-2026-001', label: 'Argo Float IN2026-0842 (Arabian Sea North)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-09-10', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-002', label: 'Argo Float IN2026-0917 (Arabian Sea Central)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-09-08', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity', 'Pressure'] },
  { id: 'ARGO-AS-2026-003', label: 'Argo Float IN2026-0731 (Mumbai Offshore)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-09-05', depthRange: '0 - 1500m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-004', label: 'Argo Float IN2026-1104 (Goa Deep Basin)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-09-02', depthRange: '0 - 2000m', parameters: ['Temperature', 'Salinity', 'Dissolved Oxygen'] },
  { id: 'ARGO-AS-2026-005', label: 'Argo Float IN2026-0512 (Lakshadweep Transect)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-30', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-006', label: 'Argo Float IN2026-0628 (Kochi Shelf Margin)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-27', depthRange: '0 - 800m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-007', label: 'Argo Float IN2026-0419 (Oman Basin Edge)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-24', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-008', label: 'Argo Float IN2026-0388 (Socotra Passage)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-20', depthRange: '0 - 2000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-009', label: 'Argo Float IN2026-0291 (Veraval Coastal)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-15', depthRange: '0 - 500m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-010', label: 'Argo Float IN2026-0177 (Gujarat South)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-10', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-011', label: 'Argo Float IN2026-0103 (Ratnagiri Deep)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-05', depthRange: '0 - 1500m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-AS-2026-012', label: 'Argo Float IN2026-0084 (Karwar Transect)', platform: 'ARGO', region: 'Arabian Sea', date: '2026-08-01', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },

  // Bay of Bengal (9)
  { id: 'ARGO-BOB-2026-001', label: 'Argo Float IN2026-0955 (Chennai Coastal Slope)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-09-11', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-BOB-2026-002', label: 'Argo Float IN2026-0882 (Vizag Basin)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-09-09', depthRange: '0 - 1200m', parameters: ['Temperature', 'Salinity', 'Chlorophyll'] },
  { id: 'ARGO-BOB-2026-003', label: 'Argo Float IN2026-0790 (Paradip Fresh Water)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-09-06', depthRange: '0 - 800m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-BOB-2026-004', label: 'Argo Float IN2026-0644 (Northern Bay Plume)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-09-03', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-BOB-2026-005', label: 'Argo Float IN2026-0520 (Andaman Sea Entry)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-08-29', depthRange: '0 - 1500m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-BOB-2026-006', label: 'Argo Float IN2026-0433 (Puducherry Offshore)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-08-25', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-BOB-2026-007', label: 'Argo Float IN2026-0310 (Ganga Plume Station)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-08-21', depthRange: '0 - 600m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-BOB-2026-008', label: 'Argo Float IN2026-0205 (Nicobar Deep)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-08-16', depthRange: '0 - 2000m', parameters: ['Temperature', 'Salinity'] },
  { id: 'ARGO-BOB-2026-009', label: 'Argo Float IN2026-0099 (Sri Lanka East Coast)', platform: 'ARGO', region: 'Bay of Bengal', date: '2026-08-12', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity'] },
];

// ── GLIDER Datasets (5 items: 2 Arabian Sea, 3 Bay of Bengal) ────────────────
export const mockGliderDatasets: ObservationDatasetOption[] = [
  // Arabian Sea (2)
  { id: 'GLIDER-AS-001', label: 'Autonomous Glider Slocum-G01 (Arabian Sea Shelf)', platform: 'GLIDER', region: 'Arabian Sea', date: '2026-09-12', depthRange: '0 - 500m', parameters: ['Temperature', 'Salinity', 'Current Velocity'] },
  { id: 'GLIDER-AS-002', label: 'Deep Glider Seaglider-SG04 (Lakshadweep Basin)', platform: 'GLIDER', region: 'Arabian Sea', date: '2026-09-07', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity', 'Acoustic Backscatter'] },

  // Bay of Bengal (3)
  { id: 'GLIDER-BOB-001', label: 'Coastal Glider Slocum-G03 (Vizag Canyon Transect)', platform: 'GLIDER', region: 'Bay of Bengal', date: '2026-09-13', depthRange: '0 - 400m', parameters: ['Temperature', 'Salinity', 'Turbidity'] },
  { id: 'GLIDER-BOB-002', label: 'Seaglider SG-09 (Northern Bay Stratification)', platform: 'GLIDER', region: 'Bay of Bengal', date: '2026-09-10', depthRange: '0 - 1000m', parameters: ['Temperature', 'Salinity', 'Dissolved Oxygen'] },
  { id: 'GLIDER-BOB-003', label: 'Spray Glider SP-02 (Andaman Passage Survey)', platform: 'GLIDER', region: 'Bay of Bengal', date: '2026-09-04', depthRange: '0 - 750m', parameters: ['Temperature', 'Salinity', 'Current Speed'] },
];

// Helper to filter datasets by platform and region
export const getDatasetsByFilter = (platform: PlatformType, region: RegionOption): ObservationDatasetOption[] => {
  const pool = platform === 'ARGO' ? mockArgoDatasets : mockGliderDatasets;
  return pool.filter((d) => d.region === region);
};

// Simulated mock comparison result when a dataset is selected (ready to be replaced by API payload)
export const getMockComparisonPayload = (datasetId: string): ModelVsObsComparisonPayload | null => {
  const all = [...mockArgoDatasets, ...mockGliderDatasets];
  const ds = all.find((d) => d.id === datasetId);
  if (!ds) return null;

  const isArgo = ds.platform === 'ARGO';

  return {
    workflow: ds.platform,
    region: ds.region,
    datasetId: ds.id,
    datasetLabel: ds.label,
    modelName: ds.region === 'Arabian Sea' ? 'HYCOM Operational Arabian Sea (1/12°)' : 'ROMS Bay of Bengal Coastal (1/25°)',
    modelGridId: isArgo ? 'HYCOM-AS-GRID-1542' : 'ROMS-BOB-GRID-0921',
    forecastTime: '2026-09-12T12:00:00Z',
    comparisonData: {
      depthProfile: [
        { depth: 0, modelValue: 28.4, obsValue: 28.2 },
        { depth: 50, modelValue: 28.1, obsValue: 27.9 },
        { depth: 100, modelValue: 27.6, obsValue: 27.3 },
        { depth: 200, modelValue: 25.8, obsValue: 25.5 },
        { depth: 300, modelValue: 23.9, obsValue: 23.7 },
        { depth: 500, modelValue: 19.8, obsValue: 19.6 },
        { depth: 700, modelValue: 15.6, obsValue: 15.4 },
        { depth: 1000, modelValue: 11.2, obsValue: 11.0 },
      ],
    },
    summary: {
      bias: isArgo ? 0.22 : 0.18,
      rmse: isArgo ? 0.35 : 0.29,
      mae: isArgo ? 0.24 : 0.20,
      correlation: isArgo ? 0.95 : 0.97,
      skillScore: isArgo ? 0.91 : 0.93,
      sampleCount: isArgo ? 248 : 512,
      notes: `${ds.platform} dataset ${ds.label} compared against ${ds.region} model grid cell. Reserved API summary slot.`,
    },
  };
};

// ── Legacy exports kept for backward compat ────────────────────────────────────
export const mockComparisonData: ComparisonScenario[] = [];
export const mockComparisonOptions: ComparisonOptions = {
  models: [],
  observationSources: [],
  variables: [],
  regions: [],
  depths: [],
};
export const mockCompleteComparisonData: CompleteComparisonData = {} as any;
