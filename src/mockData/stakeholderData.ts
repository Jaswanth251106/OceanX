import { StakeholderPersona, PotentialFishingZone, SarDriftForecast } from '../types/stakeholder';

export const mockStakeholderPersonas: StakeholderPersona[] = [
  {
    id: 'fisherman',
    title: 'Fisheries & Coastal Fishermen',
    roleDescription: 'Real-time Potential Fishing Zones (PFZ), ocean state forecasts, and safety advisories along maritime landing centers.',
    badge: 'PFZ Advisory Active',
    primaryTools: ['PFZ Satellite Maps', 'High Wave Alerts', 'Local Wind & Swell Forecasts', 'Multilingual Audio Bulletins'],
    sampleAdvisories: [
      'PFZ Bulletin Valid: Off Visakhapatnam Coast (Bearing: 110°, 35 km). High pelagic concentration.',
      'Caution: Rough sea conditions along South Gujarat coast. Swell height reaching 3.2m.',
    ],
  },
  {
    id: 'sar',
    title: 'Search & Rescue (SAR) Operations',
    roleDescription: 'SAR-Aid drift trajectory prediction, leeway probability models, and sea surface velocity maps for Maritime Rescue Coordination Centers (MRCC).',
    badge: 'SAR-Aid Engine Ready',
    primaryTools: ['Drift Trajectory Simulation', 'Search Area Optimization', 'Surface Current Overlay', 'Weather Window Evaluator'],
    sampleAdvisories: [
      'Active Simulation: Vessel FV Matsya-2 (Last ping 12 NM off Mangalore). Predicted drift vector 245° at 1.8 knots.',
      'Standard Search Grid generated for MRCC Mumbai dispatch.',
    ],
  },
  {
    id: 'forecaster',
    title: 'Operational Ocean Forecasters',
    roleDescription: 'High-resolution ocean modeling, storm surge warnings, tsunami early warning telemetry, and model validation suite.',
    badge: 'ROMS & WW3 Synchronized',
    primaryTools: ['Hydrodynamic Model Suite', 'Tsunami Sensor Telemetry', 'Tide Gauge Real-time Ingestion', 'Ensemble Forecast Comparison'],
    sampleAdvisories: [
      'Deep Ocean Tsunami Warning System: All Bottom Pressure Recorders (BPR) reporting nominal signal.',
      'Bay of Bengal depression tracking: Sea state watch initiated for Odisha and Andhra coasts.',
    ],
  },
  {
    id: 'researcher',
    title: 'Oceanographic Researchers & Scientists',
    roleDescription: 'Access to calibrated ARGO float CTD profiles, OMNI buoy long-term climatology, biogeochemical datasets, and NetCDF exports.',
    badge: 'NetCDF / OPeNDAP Online',
    primaryTools: ['ARGO Profile Visualizer', 'Thermocline Depth Estimator', 'Biogeochemical Chlorophyll Tracer', 'Raw Dataset Export'],
    sampleAdvisories: [
      'New biogeochemical float dataset released: Chlorophyll-a and Nitrate transects across 10°N.',
      'Indian Ocean Dipole (IOD) index updated: Neutral phase persistent through September 2026.',
    ],
  },
  {
    id: 'policymaker',
    title: 'Maritime Policy Makers & Coastal Managers',
    roleDescription: 'Coastal Vulnerability Index (CVI), shoreline erosion assessments, marine spatial planning, and climate adaptation metrics.',
    badge: 'Executive Brief Available',
    primaryTools: ['Coastal Vulnerability Index', 'Marine Protected Area Analytics', 'Port & Shipping Traffic Density', 'Disaster Preparedness Scorecard'],
    sampleAdvisories: [
      'Coastal Resilience Index 2026: Low-elevation coastal zones in Sunderbans require fortified embankments.',
      'Blue Economy indicator: Port traffic efficiency improved by 14% with OceanX ocean state routing.',
    ],
  },
  {
    id: 'educator',
    title: 'Students, Educators & Marine Enthusiasts',
    roleDescription: 'Interactive ocean literacy modules, monsoon dynamics, marine biodiversity maps, and simplified real-world scientific datasets.',
    badge: 'Curriculum Ready',
    primaryTools: ['Ocean Currents StoryMap', 'Monsoon Simulator', 'Coral Reef Health Explorer', 'Virtual Ocean Expedition'],
    sampleAdvisories: [
      'Interactive Lesson: Understanding the Somali Current and Indian Ocean Monsoon reversal.',
      'Virtual Buoy Tour: Learn how an OMNI buoy survives open ocean squalls.',
    ],
  },
];

export const mockPfzData: PotentialFishingZone[] = [
  {
    zoneId: 'PFZ-AP-01',
    sector: 'Off Machilipatnam',
    bearingDeg: 125,
    distanceKm: 28,
    depthRange: '40 - 65 m',
    validUntil: 'Today, 23:59 IST',
    confidence: 'High',
  },
  {
    zoneId: 'PFZ-KL-04',
    sector: 'Off Alappuzha',
    bearingDeg: 260,
    distanceKm: 34,
    depthRange: '50 - 90 m',
    validUntil: 'Tomorrow, 12:00 IST',
    confidence: 'Moderate',
  },
];

export const mockSarData: SarDriftForecast[] = [
  {
    incidentId: 'INC-2026-SAR-08',
    vesselName: 'Fishing Boat Sagar Ratna',
    lastKnownPos: '12° 54\' N, 74° 48\' E',
    driftVector: 'WNW at 1.6 kts',
    searchRadiusNm: 8.5,
    status: 'Active SAR',
  },
];
