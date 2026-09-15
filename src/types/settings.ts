export type ThemeOption = 'light' | 'dark' | 'system';
export type TimeFormatOption = '12h' | '24h';
export type DateFormatOption = 'YYYY-MM-DD' | 'DD/MM/YYYY' | 'MM/DD/YYYY';
export type TextSizeOption = 'small' | 'default' | 'large';
export type InterfaceDensityOption = 'comfortable' | 'compact';

export interface UserPreference {
  theme: ThemeOption;
  compactMode: boolean;
  reduceMotion: boolean;

  language: string;
  timeFormat: TimeFormatOption;
  dateFormat: DateFormatOption;

  notificationsEnabled: boolean;
  importantAlerts: boolean;
  systemNotifications: boolean;

  textSize: TextSizeOption;
  interfaceDensity: InterfaceDensityOption;

  // Legacy fields preserved for backward compatibility
  preferredUnits?: 'metric' | 'nautical' | 'scientific';
  depthScale?: 'meters' | 'fathoms';
  coordinateFormat?: 'decimal' | 'dms';
  autoRefreshIntervalSeconds?: number;
  emailNotifications?: boolean;
}

export interface SystemHealthStatus {
  serviceName: string;
  endpoint: string;
  status: 'healthy' | 'degraded' | 'offline';
  latencyMs: number;
  lastChecked: string;
}

export interface SyncStatus {
  datasetName: string;
  recordsCount: number;
  lastSynced: string;
  syncFrequency: string;
  syncState: 'synchronized' | 'syncing' | 'failed';
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  action: string;
  user: string;
  ipAddress: string;
  status: 'SUCCESS' | 'WARNING' | 'FAILED';
}

export interface SettingsData {
  preferences: UserPreference;
  systemHealth: SystemHealthStatus[];
  storageUsage: {
    cachedMb: number;
    maxCacheMb: number;
    offlineTileStoreMb: number;
  };
  syncStatus: SyncStatus[];
  recentAuditLogs: AuditLogItem[];
}
