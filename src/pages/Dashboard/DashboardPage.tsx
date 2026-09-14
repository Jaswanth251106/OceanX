import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatCard } from '../../components/cards/StatCard';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { LoadingState } from '../../components/feedback/LoadingState';
import { AlertCard } from '../../components/cards/AlertCard';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { dashboardService } from '../../services/dashboardService';
import { CompleteDashboardData, DashboardMetric } from '../../types/dashboard';
import { RegionalOverviewMap } from './components/RegionalOverviewMap';
import { RecentActivityFeed } from './components/RecentActivityFeed';
import { SystemDataStatusGrid } from './components/SystemDataStatusGrid';
import { AlertSummarySection } from './components/AlertSummarySection';
import { QuickAccessGrid } from './components/QuickAccessGrid';
import {
  Database,
  Waves,
  Clock,
  Compass,
  Thermometer,
  AlertTriangle,
  RefreshCw,
  Download,
  CheckCircle2,
} from 'lucide-react';

export const DashboardPage: React.FC = () => {
  const [data, setData] = useState<CompleteDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchDashboard = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await dashboardService.getOverviewData();
      setData(result);
    } catch (err) {
      setError('Unable to synchronize with INCOIS central telemetry nodes. Please retry.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const renderStatIcon = (type: DashboardMetric['iconType']) => {
    switch (type) {
      case 'database':
        return <Database size={18} />;
      case 'floats':
        return <Waves size={18} />;
      case 'clock':
        return <Clock size={18} />;
      case 'map':
        return <Compass size={18} />;
      case 'thermometer':
        return <Thermometer size={18} />;
      case 'alert':
        return <AlertTriangle size={18} />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* 1. Page Header / Hero */}
      <PageHeader
        title="Ocean Intelligence Dashboard"
        subtitle="Real-time overview of ocean observations, datasets, alerts, and system status."
        breadcrumbs={[{ label: 'Home' }, { label: 'Dashboard' }]}
        badge={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusBadge label="System Operational" variant="success" />
            {data && (
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}
              >
                <CheckCircle2 size={13} color="var(--color-success)" />
                Last updated: {data.lastUpdated}
              </span>
            )}
          </div>
        }
        actions={
          <>
            <SecondaryButton icon={<RefreshCw size={14} />} onClick={fetchDashboard}>
              Refresh Feeds
            </SecondaryButton>
            <PrimaryButton icon={<Download size={14} />}>
              Export Summary
            </PrimaryButton>
          </>
        }
      />

      {/* Loading & Error Handling */}
      {loading ? (
        <LoadingState message="Connecting to INCOIS telemetry nodes and ingesting ocean state data..." />
      ) : error ? (
        <AlertCard
          title="Telemetry Connection Error"
          description={error}
          severity="danger"
          action={
            <SecondaryButton size="sm" onClick={fetchDashboard}>
              Retry Connection
            </SecondaryButton>
          }
        />
      ) : data ? (
        <>
          {/* 2. Key Statistics Grid (6 Cards) */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {data.stats.map((stat) => (
              <StatCard
                key={stat.id}
                title={stat.title}
                value={stat.value}
                unit={stat.unit}
                trendDescription={stat.supportingText}
                changeDirection={stat.changeDirection}
                icon={renderStatIcon(stat.iconType)}
                statusVariant={
                  stat.status === 'positive' || stat.status === 'calibrated'
                    ? 'success'
                    : stat.status === 'warning'
                    ? 'warning'
                    : stat.status === 'critical'
                    ? 'danger'
                    : 'neutral'
                }
              />
            ))}
          </div>

          {/* 3. Regional Overview (2D Scientific Basin Overview) */}
          <RegionalOverviewMap
            regions={data.regionalOverview.regions}
            totalObservations={data.regionalOverview.totalBasinObservations}
          />

          {/* 4 & 5. Two-column grid: Recent Activity & System Data Status */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))',
              gap: 'var(--space-6)',
              alignItems: 'start',
            }}
          >
            {/* Recent Activity */}
            <RecentActivityFeed activities={data.recentActivities} />

            {/* System & Data Status */}
            <SystemDataStatusGrid items={data.systemDataStatus} />
          </div>

          {/* 6. Active Alert Summary */}
          <AlertSummarySection summary={data.alertSummary} />

          {/* 7. Explore More / Quick Access */}
          <QuickAccessGrid items={data.quickAccess} />
        </>
      ) : null}
    </div>
  );
};
