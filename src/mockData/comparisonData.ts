import { ComparisonScenario } from '../types/comparison';

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
