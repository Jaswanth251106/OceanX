export interface DashboardMetric {
  id: string;
  title: string;
  value: string | number;
  unit?: string;
  supportingText: string;
  changeDirection?: 'up' | 'down' | 'neutral';
  status?: 'normal' | 'warning' | 'critical' | 'calibrated' | 'positive';
  iconType: 'database' | 'floats' | 'clock' | 'map' | 'thermometer' | 'alert';
}

export interface RegionalObservationSummary {
  id: string;
  name: string;
  observationsCount: number;
  activeAlertsCount: number;
  averageSstCelsius: number;
  meanWaveHeightMeters: number;
  coordinates: {
    lat: number;
    lng: number;
  };
}

export interface DashboardActivityItem {
  id: string;
  title: string;
  timestamp: string;
  type: 'argo' | 'sync' | 'alert' | 'station' | 'forecast';
  details?: string;
}

export interface SystemDataComponentStatus {
  id: string;
  name: string;
  status: 'Operational' | 'Degraded' | 'Offline';
  coveragePercent?: number;
  latestRun?: string;
  iconType: 'argo' | 'buoy' | 'tide' | 'satellite' | 'model';
}

export interface ActiveAlertItem {
  id: string;
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'info';
  region: string;
  timestamp: string;
}

export interface AlertBreakdownSummary {
  totalAlerts: number;
  highPriority: number;
  mediumPriority: number;
  informational: number;
  alerts: ActiveAlertItem[];
}

export interface QuickAccessItem {
  id: string;
  title: string;
  description: string;
  route: string;
  icon: 'explore' | 'observations' | 'compare' | 'analytics';
}

export interface CompleteDashboardData {
  lastUpdated: string;
  systemStatus: 'Operational' | 'Degraded' | 'Offline';
  stats: DashboardMetric[];
  regionalOverview: {
    regions: RegionalObservationSummary[];
    totalBasinObservations: number;
  };
  recentActivities: DashboardActivityItem[];
  systemDataStatus: SystemDataComponentStatus[];
  alertSummary: AlertBreakdownSummary;
  quickAccess: QuickAccessItem[];
}
