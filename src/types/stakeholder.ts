export type StakeholderPersonaId = 
  | 'researcher'
  | 'forecaster'
  | 'fisherman'
  | 'sar'
  | 'educator'
  | 'policymaker';

export interface StakeholderPersona {
  id: StakeholderPersonaId;
  title: string;
  roleDescription: string;
  badge: string;
  primaryTools: string[];
  sampleAdvisories: string[];
}

export interface PotentialFishingZone {
  zoneId: string;
  sector: string;
  bearingDeg: number;
  distanceKm: number;
  depthRange: string;
  validUntil: string;
  confidence: 'High' | 'Moderate' | 'Low';
}

export interface SarDriftForecast {
  incidentId: string;
  vesselName: string;
  lastKnownPos: string;
  driftVector: string;
  searchRadiusNm: number;
  status: 'Active SAR' | 'Standby' | 'Resolved';
}
