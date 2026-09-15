export interface StakeholderAction {
  id: string;
  label: string;
  primary: boolean;
}

export interface StakeholderConfig {
  id: string;
  index: string;
  selectorLabel: string;
  title: string;
  subtitle: string;
  question: string;
  focusArea: string;
  description: string;
  disclaimer?: string;
  actions: StakeholderAction[];
  metadata?: Record<string, string>;
  currentConditions?: Record<string, string>;
  timelineSteps?: Array<{
    id: string;
    label: string;
    offset: string;
    sst: string;
    current: string;
    wave: string;
    anomaly: string;
    status: string;
  }>;
  alerts?: Array<{
    type: string;
    title: string;
    location: string;
    desc: string;
  }>;
  conditions?: Array<{
    label: string;
    value: string;
    detail: string;
    status: string;
  }>;
  zones?: Array<{
    id: string;
    name: string;
    condition: string;
    badge: string;
    notes: string;
  }>;
  lkp?: {
    lat: string;
    lon: string;
    timestamp: string;
  };
  searchArea?: string;
  factors?: {
    current: string;
    timeElapsed: string;
    driftEstimate: string;
    windVector: string;
    leewayDivergence: string;
  };
  topics?: Record<
    string,
    {
      id: string;
      icon: string;
      title: string;
      simpleText: string;
      takeaway: string;
    }
  >;
  statusMatrix?: Array<{
    metric: string;
    state: string;
    badge: string;
    detail: string;
  }>;
  regionalAlerts?: Array<{
    region: string;
    level: string;
    badge: string;
    advisory: string;
  }>;
}

export const STAKEHOLDER_KEYS = [
  'researcher',
  'forecaster',
  'fisheries',
  'search_rescue',
  'student',
  'policymaker',
] as const;

export type StakeholderKey = (typeof STAKEHOLDER_KEYS)[number];

export const STAKEHOLDERS: Record<string, StakeholderConfig> = {
  researcher: {
    id: 'researcher',
    index: '01',
    selectorLabel: 'RESEARCHER',
    title: 'RESEARCHER',
    subtitle: 'Deep Analysis & Model Validation',
    question: 'What is happening scientifically?',
    focusArea: 'Bay of Bengal — Transect 88.3°E',
    description: 'Prioritizing deep physical oceanography, numerical model validation against in-situ Argo profiling floats, and multi-decadal anomaly trends.',
    actions: [
      { id: 'open_3d', label: 'Open 3D Explorer', primary: true },
      { id: 'compare_profile', label: 'Compare Profile', primary: false },
      { id: 'view_anomaly', label: 'View Anomaly', primary: false },
      { id: 'view_trend', label: 'View Trend', primary: false },
    ],
    metadata: {
      dataSource: 'NetCDF-4 Assimilation / Reanalysis',
      referenceSensor: 'Argo Float Array (42 Active Profiles)',
      spatialResolution: '0.08° (~9 km)',
    },
  },

  forecaster: {
    id: 'forecaster',
    index: '02',
    selectorLabel: 'FORECASTER',
    title: 'FORECASTER',
    subtitle: 'Current Conditions & Forecast Awareness',
    question: 'What is happening now and what might happen next?',
    focusArea: 'North Indian Ocean — Forecast Sector 4',
    description: 'Operational real-time telemetry, short-term multi-day forecast trajectories, geostrophic current vectors, and thermal anomaly monitoring.',
    actions: [
      { id: 'run_ensemble', label: 'Run Model Ensemble', primary: true },
      { id: 'export_reanalysis', label: 'Export Reanalysis Package', primary: false },
      { id: 'toggle_wind', label: 'Toggle Wind Overlay', primary: false },
    ],
    currentConditions: {
      sst: '29.1°C',
      current: '0.85 m/s',
      salinity: '33.8 PSU',
      waveHeight: '1.8 m',
      windSpeed: '14.2 kt',
      seaState: 'Moderate (Code 4)',
    },
    timelineSteps: [
      {
        id: 'today',
        label: 'Today',
        offset: '0h',
        sst: '29.1°C',
        current: '0.85 m/s',
        wave: '1.8 m',
        anomaly: '+0.8°C',
        status: 'Active',
      },
      {
        id: 'd1',
        label: '+1d',
        offset: '+24h',
        sst: '29.3°C',
        current: '0.92 m/s',
        wave: '2.1 m',
        anomaly: '+0.9°C',
        status: 'Projected',
      },
      {
        id: 'd2',
        label: '+2d',
        offset: '+48h',
        sst: '29.5°C',
        current: '1.04 m/s',
        wave: '2.4 m',
        anomaly: '+1.2°C',
        status: 'Projected',
      },
      {
        id: 'd3',
        label: '+3d',
        offset: '+72h',
        sst: '29.2°C',
        current: '0.78 m/s',
        wave: '1.9 m',
        anomaly: '+0.7°C',
        status: 'Projected',
      },
    ],
    alerts: [
      {
        type: 'warning',
        title: 'Strong Current Shear',
        location: 'Bay of Bengal [12.8°N, 88.5°E]',
        desc: 'Simulated boundary current exceeds 1.0 m/s with localized shear vorticity.',
      },
      {
        type: 'warning',
        title: 'Temperature Anomaly Warning',
        location: 'Sector 4 Shallow Coastal Mixed Layer',
        desc: 'SST 1.2°C above 30-year climatological mean threshold.',
      },
    ],
  },

  fisheries: {
    id: 'fisheries',
    index: '03',
    selectorLabel: 'FISHERIES',
    title: 'FISHERIES',
    subtitle: 'Marine Conditions & Fisheries Awareness',
    question: 'What ocean conditions are relevant to fisheries?',
    focusArea: 'Bay of Bengal — Regional Shelf & Slope',
    description: 'Providing sea surface temperature gradients, chlorophyll concentration signatures, and mixed layer depth to support marine fisheries advisories.',
    disclaimer: 'Decision support for ocean conditions only. Does not predict fish presence or biomass.',
    actions: [
      { id: 'generate_advisory', label: 'Generate Advisory', primary: true },
      { id: 'print_bulletin', label: 'Print Condition Bulletin', primary: false },
      { id: 'inspect_fronts', label: 'Inspect Frontal Zones', primary: false },
    ],
    conditions: [
      { label: 'TEMPERATURE', value: '28.4°C', detail: 'Thermal front +0.4°C/10km', status: 'Normal' },
      { label: 'CHLOROPHYLL', value: '0.42 mg/m³', detail: 'Optimal phytoplankton signature', status: 'Favourable' },
      { label: 'CURRENT', value: '0.62 m/s', detail: '045° North-Eastward drift', status: 'Moderate' },
      { label: 'DEPTH', value: '48 m', detail: 'Mixed layer depth (MLD)', status: 'Nominal' },
      { label: 'ANOMALY', value: '+0.3°C', detail: 'Within seasonal baseline', status: 'Normal' },
    ],
    zones: [
      {
        id: 'zone_a',
        name: 'Zone A (Deep Offshore Ridge)',
        condition: 'Moderate',
        badge: 'badge-warning',
        notes: 'Divergent currents with minimal vertical nutrient upwelling.',
      },
      {
        id: 'zone_b',
        name: 'Zone B (Thermal Frontal Boundary)',
        condition: 'Favourable',
        badge: 'badge-favourable',
        notes: 'Pronounced thermal gradient with elevated chlorophyll-a signature.',
      },
      {
        id: 'zone_c',
        name: 'Zone C (Coastal Shelf Margin)',
        condition: 'Low',
        badge: 'badge-low',
        notes: 'High turbidity and reduced surface stratification.',
      },
    ],
  },

  search_rescue: {
    id: 'search_rescue',
    index: '04',
    selectorLabel: 'SEARCH & RESCUE',
    title: 'SEARCH & RESCUE',
    subtitle: 'Ocean Conditions & Drift Awareness',
    question: 'How could ocean conditions affect a search area?',
    focusArea: 'Sector SAR-Echo // Eastern Bay of Bengal',
    description: 'Providing geostrophic surface current integration, wind leeway estimations, and expanding probabilistic search ellipse modeling.',
    disclaimer: 'Calculated drift vector based on illustrative leeway models. Decision support only; does not guarantee target location.',
    actions: [
      { id: 'run_drift', label: 'Run Drift Simulation', primary: true },
      { id: 'adjust_leeway', label: 'Adjust Leeway Factors', primary: false },
      { id: 'export_geojson', label: 'Export Search Grid GeoJSON', primary: false },
    ],
    lkp: {
      lat: '12.45°N',
      lon: '88.30°E',
      timestamp: '06:15 UTC (Simulated)',
    },
    searchArea: '2,340 km²',
    factors: {
      current: '0.85 m/s @ 072°',
      timeElapsed: '14h 30m',
      driftEstimate: '44.2 km total displacement',
      windVector: '14 kt from 245° (SW)',
      leewayDivergence: '±18° sector angle',
    },
  },

  student: {
    id: 'student',
    index: '05',
    selectorLabel: 'STUDENT',
    title: 'OCEAN EXPLORER',
    subtitle: 'Interactive Ocean Learning',
    question: 'Can I understand the ocean?',
    focusArea: 'Vertical Water Column — Surface to Abyss',
    description: 'Explore the invisible layers of the deep ocean, see how temperature and sunlight change with depth, and discover the scientific instruments monitoring our planet.',
    actions: [
      { id: 'ocean_quiz', label: 'Interactive Ocean Quiz', primary: true },
      { id: 'reset_depth', label: 'Reset to Surface (0m)', primary: false },
      { id: 'launch_float', label: 'Animate Float Dive', primary: false },
    ],
    topics: {
      currents: {
        id: 'currents',
        icon: '🌊',
        title: 'Currents: Rivers in the Ocean',
        simpleText: 'Ocean currents are massive continuous movements of seawater driven by planetary winds, Earth rotation (Coriolis effect), and temperature differences. They act like a giant global conveyor belt distributing heat around the globe.',
        takeaway: 'Key concept: Warm water travels towards the poles, while cold deep water flows toward the equator.',
      },
      temperature: {
        id: 'temperature',
        icon: '🌡',
        title: 'Temperature & The Thermocline',
        simpleText: 'Sunlight only warms the top 200 meters of the ocean. Below this sunlit layer is the "Thermocline", where temperature plunges steeply from tropical warmth (28°C) down to near-freezing (2°C) in just a few hundred meters.',
        takeaway: 'Key concept: Water gets dramatically colder and denser the deeper you go.',
      },
      salinity: {
        id: 'salinity',
        icon: '🧂',
        title: 'Salinity: Salt & Freshwater Balance',
        simpleText: 'Salinity measures the amount of dissolved salts in seawater (averaging around 35 PSU, or 35 grams of salt per kilogram). In the Bay of Bengal, huge monsoon rivers pour fresh water into the sea, creating a light, fresh surface layer!',
        takeaway: 'Key concept: Differences in salt and temperature determine seawater density, driving deep ocean circulation.',
      },
      argo: {
        id: 'argo',
        icon: '🤿',
        title: 'What is an Argo Float?',
        simpleText: 'An Argo float is an autonomous robotic cylinder that drifts freely in the ocean. Every 10 days, it sinks down to 2,000 meters depth, then slowly rises to the surface measuring temperature and salinity, transmitting the data via satellite.',
        takeaway: 'Key concept: Nearly 4,000 Argo floats are currently active across every ocean on Earth!',
      },
      glider: {
        id: 'glider',
        icon: '🚤',
        title: 'What is an Underwater Glider?',
        simpleText: 'An underwater glider is an autonomous winged submarine with no motorized propeller. Instead, it changes its internal buoyancy to sink and rise, using small wings to glide forward through the ocean for months at a time on very little battery.',
        takeaway: 'Key concept: Gliders map underwater fronts, storms, and marine life habitats across precise transects.',
      },
    },
  },

  policymaker: {
    id: 'policymaker',
    index: '06',
    selectorLabel: 'POLICYMAKER',
    title: 'POLICYMAKER',
    subtitle: 'Regional Ocean Status',
    question: 'What is the overall state and what needs attention?',
    focusArea: 'Northern Indian Ocean Maritime Jurisdictions',
    description: 'High-level synthesis of regional marine baselines, climatic indicators, ecological thresholds, and actionable policy summaries without raw NetCDF complexity.',
    actions: [
      { id: 'download_brief', label: 'Download Policy Brief (PDF)', primary: true },
      { id: 'filter_region', label: 'Filter by Maritime Zone', primary: false },
      { id: 'share_summary', label: 'Share Executive Summary', primary: false },
    ],
    statusMatrix: [
      {
        metric: 'Temperature',
        state: 'Increasing ↑',
        badge: 'badge-warning',
        detail: '+0.8°C above historical 1990–2020 climatology; marine heatwave threshold approaching.',
      },
      {
        metric: 'Salinity',
        state: 'Normal',
        badge: 'badge-normal',
        detail: '33.8 PSU average; monsoonal freshwater dilution within 5-year standard deviation.',
      },
      {
        metric: 'Chlorophyll / Productivity',
        state: 'Decreasing ↓',
        badge: 'badge-decreasing',
        detail: 'Phytoplankton density down 4.2% seasonally due to stratification and warm capping layer.',
      },
      {
        metric: 'Current Intensity',
        state: 'Moderate',
        badge: 'badge-normal',
        detail: 'Geostrophic circulation stable; no anomalous coastal current disruption observed.',
      },
    ],
    regionalAlerts: [
      {
        region: 'Bay of Bengal',
        level: 'Moderate',
        badge: 'badge-warning',
        advisory: 'Elevated SST in north-eastern quadrant. Potential thermal stress on shallow coastal ecosystems.',
      },
      {
        region: 'Arabian Sea',
        level: 'Normal',
        badge: 'badge-normal',
        advisory: 'Seasonal upwelling proceeding within expected thermodynamic boundaries.',
      },
      {
        region: 'Equatorial Channel',
        level: 'Normal',
        badge: 'badge-normal',
        advisory: 'Equatorial current velocity and heat flux remain within seasonal norm.',
      },
    ],
  },
};
