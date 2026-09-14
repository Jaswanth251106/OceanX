import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { SectionCard } from '../../components/cards/SectionCard';
import { DataTable, ColumnDef } from '../../components/tables/DataTable';
import { Toggle } from '../../components/forms/Toggle';
import { Dropdown } from '../../components/forms/Dropdown';
import { ProgressBar } from '../../components/feedback/ProgressBar';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { LoadingState } from '../../components/feedback/LoadingState';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { settingsService } from '../../services/settingsService';
import { SettingsData, SystemHealthStatus, SyncStatus, AuditLogItem } from '../../types/settings';
import { Save, RotateCcw, ShieldCheck, Database, HardDrive, Bell } from 'lucide-react';

export const SettingsPage: React.FC = () => {
  const [data, setData] = useState<SettingsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState<'general' | 'health' | 'sync' | 'audit'>('general');

  // Local state for interactive preferences demonstration
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [preferredUnits, setPreferredUnits] = useState('metric');
  const [depthScale, setDepthScale] = useState('meters');

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await settingsService.getSettingsData();
        setData(res);
        if (res.preferences) {
          setPreferredUnits(res.preferences.preferredUnits);
          setDepthScale(res.preferences.depthScale);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const healthColumns: ColumnDef<SystemHealthStatus>[] = [
    {
      header: 'Service / API Endpoint',
      cell: (row) => (
        <div>
          <div style={{ fontWeight: 600 }}>{row.serviceName}</div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', fontFamily: 'var(--font-family-mono)' }}>
            {row.endpoint}
          </div>
        </div>
      ),
    },
    {
      header: 'Status',
      cell: (row) => (
        <StatusBadge
          label={row.status.toUpperCase()}
          variant={row.status === 'healthy' ? 'success' : row.status === 'degraded' ? 'warning' : 'danger'}
          size="sm"
        />
      ),
    },
    {
      header: 'Latency',
      cell: (row) => `${row.latencyMs} ms`,
    },
    {
      header: 'Last Checked',
      accessorKey: 'lastChecked',
    },
  ];

  const syncColumns: ColumnDef<SyncStatus>[] = [
    { header: 'Oceanographic Dataset', accessorKey: 'datasetName', width: '280px' },
    {
      header: 'Records',
      cell: (row) => row.recordsCount.toLocaleString(),
    },
    { header: 'Frequency', accessorKey: 'syncFrequency' },
    { header: 'Last Synced', accessorKey: 'lastSynced' },
    {
      header: 'State',
      cell: (row) => (
        <StatusBadge
          label={row.syncState}
          variant={row.syncState === 'synchronized' ? 'success' : 'warning'}
          size="sm"
        />
      ),
    },
  ];

  const auditColumns: ColumnDef<AuditLogItem>[] = [
    { header: 'Event ID', accessorKey: 'id', width: '120px' },
    { header: 'Timestamp', accessorKey: 'timestamp' },
    {
      header: 'Action',
      cell: (row) => <code style={{ fontSize: 'var(--font-size-xs)' }}>{row.action}</code>,
    },
    { header: 'User', accessorKey: 'user' },
    { header: 'Source IP', accessorKey: 'ipAddress' },
    {
      header: 'Result',
      cell: (row) => (
        <StatusBadge
          label={row.status}
          variant={row.status === 'SUCCESS' ? 'success' : 'danger'}
          size="sm"
        />
      ),
    },
  ];

  return (
    <div>
      <PageHeader
        title="Settings & System Configuration"
        subtitle="Manage user preferences, INCOIS telemetry feeds, storage cache, sync status, and system security."
        badge={<StatusBadge label="All Systems Operational" variant="success" />}
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Settings' }]}
        actions={
          <>
            <SecondaryButton icon={<RotateCcw size={14} />}>Reset Defaults</SecondaryButton>
            <PrimaryButton icon={<Save size={14} />}>Save Preferences</PrimaryButton>
          </>
        }
      />

      {loading ? (
        <LoadingState message="Loading settings and system configuration..." />
      ) : data ? (
        <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: 'var(--space-6)' }}>
          {/* Internal Settings Navigation Sidebar */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '4px',
              backgroundColor: 'var(--color-bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--color-border)',
              padding: 'var(--space-3)',
              height: 'fit-content',
            }}
          >
            {[
              { id: 'general', label: 'General & Display', icon: Database },
              { id: 'health', label: 'System Health', icon: ShieldCheck },
              { id: 'sync', label: 'Data Sources & Sync', icon: HardDrive },
              { id: 'audit', label: 'Security & Audit Logs', icon: Bell },
            ].map((sec) => {
              const Icon = sec.icon;
              const isActive = activeSection === sec.id;
              return (
                <button
                  key={sec.id}
                  onClick={() => setActiveSection(sec.id as any)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    padding: '8px 12px',
                    borderRadius: 'var(--radius-md)',
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: isActive ? 600 : 500,
                    color: isActive ? 'var(--color-ocean-blue)' : 'var(--color-text-secondary)',
                    backgroundColor: isActive ? 'var(--color-light-blue)' : 'transparent',
                    textAlign: 'left',
                    width: '100%',
                    cursor: 'pointer',
                    transition: 'all var(--transition-fast)',
                  }}
                >
                  <Icon size={16} />
                  <span>{sec.label}</span>
                </button>
              );
            })}
          </div>

          {/* Settings Section Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            {activeSection === 'general' && (
              <>
                <SectionCard
                  title="General Preferences & Scientific Units"
                  subtitle="Configure measurement units, coordinate formats, and automated refresh intervals"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Toggle
                        checked={autoRefresh}
                        onChange={setAutoRefresh}
                        label="Auto-refresh Live Ocean Telemetry"
                        description="Automatically poll INCOIS buoy feeds every 60 seconds"
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                      <Dropdown
                        label="Preferred Oceanographic Units"
                        value={preferredUnits}
                        onChange={setPreferredUnits}
                        options={[
                          { value: 'metric', label: 'Metric (°C, m, km/h)' },
                          { value: 'nautical', label: 'Nautical (°C, m, knots)' },
                          { value: 'scientific', label: 'Scientific SI (K, m, m/s)' },
                        ]}
                      />

                      <Dropdown
                        label="Bathymetry & Depth Scale"
                        value={depthScale}
                        onChange={setDepthScale}
                        options={[
                          { value: 'meters', label: 'Meters (m)' },
                          { value: 'fathoms', label: 'Fathoms (fm)' },
                        ]}
                      />
                    </div>
                  </div>
                </SectionCard>

                <SectionCard
                  title="Offline Storage & Tile Cache"
                  subtitle="Manage cached bathymetry and vector field layers on this device"
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
                    <ProgressBar
                      value={data.storageUsage.cachedMb}
                      max={data.storageUsage.maxCacheMb}
                      label={`Local Cache: ${data.storageUsage.cachedMb} MB of ${data.storageUsage.maxCacheMb} MB used`}
                      helperText="24.2% Capacity"
                      variant="primary"
                    />
                    <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 'var(--space-2)' }}>
                      <SecondaryButton size="sm">Purge Offline Tile Cache</SecondaryButton>
                    </div>
                  </div>
                </SectionCard>
              </>
            )}

            {activeSection === 'health' && (
              <SectionCard
                title="INCOIS Central Infrastructure & Health"
                subtitle="Real-time connectivity status to Hyderabad data center endpoints"
              >
                <DataTable
                  columns={healthColumns}
                  data={data.systemHealth}
                  keyExtractor={(r) => r.serviceName}
                />
              </SectionCard>
            )}

            {activeSection === 'sync' && (
              <SectionCard
                title="Data Pipelines & Model Synchronization"
                subtitle="Status of active vector field, bathymetric, and advisory datasets"
              >
                <DataTable
                  columns={syncColumns}
                  data={data.syncStatus}
                  keyExtractor={(r) => r.datasetName}
                />
              </SectionCard>
            )}

            {activeSection === 'audit' && (
              <SectionCard
                title="Security Audit Trail"
                subtitle="Recent administrative actions and authentication access events"
              >
                <DataTable
                  columns={auditColumns}
                  data={data.recentAuditLogs}
                  keyExtractor={(r) => r.id}
                />
              </SectionCard>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};
