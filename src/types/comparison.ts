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
