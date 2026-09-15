export interface UserPreference {
  theme: 'light' | 'system';
  preferredUnits: 'metric' | 'nautical' | 'scientific';
  depthScale: 'meters' | 'fathoms';
  coordinateFormat: 'decimal' | 'dms';
  autoRefreshIntervalSeconds: number;
  language: string;
  emailNotifications: boolean;
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
