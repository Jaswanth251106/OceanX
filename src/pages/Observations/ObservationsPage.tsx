import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { LoadingState } from '../../components/feedback/LoadingState';
import { AlertCard } from '../../components/cards/AlertCard';
import { EmptyState } from '../../components/feedback/EmptyState';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { SecondaryButton } from '../../components/common/SecondaryButton';
import { observationService } from '../../services/observationService';
import {
  OceanObservationRecord,
  ObservationFilterState,
  DepthProfilePoint,
  RecentMeasurementItem,
  ObservationPlatformSummary,
} from '../../types/observation';
import { ObservationFilters } from './components/ObservationFilters';
import { ObservationMap } from './components/ObservationMap';
import { SelectedObservationCard } from './components/SelectedObservationCard';
import { LatestProfile } from './components/LatestProfile';
import { RecentMeasurements } from './components/RecentMeasurements';
import { ObservationRecordsTable } from './components/ObservationRecordsTable';
import { Download, RefreshCw, Layers, CheckCircle2 } from 'lucide-react';

const defaultFilters: ObservationFilterState = {
  instrumentType: 'ALL',
  status: 'ALL',
  dateRange: '24h',
  region: 'ALL',
  variable: 'ALL',
  depth: 'ALL',
  searchQuery: '',
};

export const ObservationsPage: React.FC = () => {
  const [summary, setSummary] = useState<ObservationPlatformSummary | null>(null);
  const [observations, setObservations] = useState<OceanObservationRecord[]>([]);
  const [selectedObservation, setSelectedObservation] = useState<OceanObservationRecord | null>(null);
  const [profileData, setProfileData] = useState<DepthProfilePoint[]>([]);
  const [recentMeasurements, setRecentMeasurements] = useState<RecentMeasurementItem[]>([]);
  const [filters, setFilters] = useState<ObservationFilterState>(defaultFilters);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Calculate active filter count
  const activeFilterCount =
    (filters.instrumentType !== 'ALL' ? 1 : 0) +
    (filters.status !== 'ALL' ? 1 : 0) +
    (filters.dateRange !== '24h' ? 1 : 0) +
    (filters.region !== 'ALL' ? 1 : 0) +
    (filters.variable !== 'ALL' ? 1 : 0) +
    (filters.depth !== 'ALL' ? 1 : 0) +
    (filters.searchQuery.trim() !== '' ? 1 : 0);

  const fetchObservations = async (currentFilters: ObservationFilterState = filters) => {
    setLoading(true);
    setError(null);
    try {
      const [sum, obsList] = await Promise.all([
        observationService.getObservationSummary(),
        observationService.getObservations(currentFilters),
      ]);
      setSummary(sum);
      setObservations(obsList);

      // Keep selection or default to first observation
      if (obsList.length > 0) {
        const stillSelected = obsList.find(
          (item) => item.id === selectedObservation?.id || item.instrumentId === selectedObservation?.instrumentId
        );
        const target = stillSelected || obsList[0];
        setSelectedObservation(target);
        await loadPlatformTelemetry(target.instrumentId);
      } else {
        setSelectedObservation(null);
        setProfileData([]);
        setRecentMeasurements([]);
      }
    } catch (err) {
      setError('Unable to load observation data.');
    } finally {
      setLoading(false);
    }
  };

  const loadPlatformTelemetry = async (instrumentId: string) => {
    try {
      const [prof, meas] = await Promise.all([
        observationService.getObservationProfile(instrumentId),
        observationService.getRecentMeasurements(instrumentId),
      ]);
      setProfileData(prof);
      setRecentMeasurements(meas);
    } catch (err) {
      console.error('Failed to load profile telemetry for:', instrumentId, err);
    }
  };

  useEffect(() => {
    fetchObservations(filters);
  }, []);

  const handleSelectObservation = async (obs: OceanObservationRecord) => {
    setSelectedObservation(obs);
    await loadPlatformTelemetry(obs.instrumentId);
  };

  const handleApplyFilters = (newFilters: ObservationFilterState) => {
    setFilters(newFilters);
    fetchObservations(newFilters);
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    fetchObservations(defaultFilters);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      {/* 1. Page Header */}
      <PageHeader
        title="Ocean Observations"
        subtitle="Explore real-time and historical observations from oceanographic instruments and monitoring stations."
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Observations' }]}
        badge={
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <StatusBadge
              label={`${summary ? summary.totalPlatforms.toLocaleString() : '2,486'} active platforms`}
              variant="success"
            />
            {summary && (
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
                Last synchronized {summary.lastSynchronized}
              </span>
            )}
          </div>
        }
        actions={
          <>
            <SecondaryButton icon={<RefreshCw size={14} />} onClick={() => fetchObservations(filters)}>
              Sync Feeds
            </SecondaryButton>
            <PrimaryButton icon={<Download size={14} />}>
              Export All Observations
            </PrimaryButton>
          </>
        }
      />

      {/* Loading & Error Feedback */}
      {loading && !observations.length ? (
        <LoadingState message="Loading in-situ platforms and spatial ocean telemetry..." />
      ) : error ? (
        <AlertCard
          title="Telemetry Sync Failed"
          description={error}
          severity="danger"
          action={
            <SecondaryButton size="sm" onClick={() => fetchObservations(filters)}>
              Retry Connection
            </SecondaryButton>
          }
        />
      ) : (
        <>
          {/* 2. Filter + Observation Workspace */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '290px minmax(0, 1fr)',
              gap: 'var(--space-6)',
              alignItems: 'start',
            }}
          >
            {/* Left Filter Panel */}
            <ObservationFilters
              initialFilters={filters}
              onApplyFilters={handleApplyFilters}
              onResetFilters={handleResetFilters}
              activeCount={activeFilterCount}
            />

            {/* Right 2D Observation Map */}
            <ObservationMap
              observations={observations}
              selectedObservationId={selectedObservation?.id}
              onSelectObservation={handleSelectObservation}
            />
          </div>

          {/* Empty State when filters yield 0 results */}
          {observations.length === 0 ? (
            <EmptyState
              icon={<Layers size={28} />}
              title="No observations match the selected filters"
              description="Try widening your date range, clearing specific variable requirements, or switching region boundaries."
              actionLabel="Clear Filters"
              onAction={handleResetFilters}
            />
          ) : (
            <>
              {/* 3. Selected Observation Details */}
              {selectedObservation && (
                <SelectedObservationCard observation={selectedObservation} />
              )}

              {/* 4 & 5. Latest Profile & Recent Measurements */}
              {selectedObservation && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'minmax(0, 1.2fr) minmax(360px, 1fr)',
                    gap: 'var(--space-6)',
                    alignItems: 'stretch',
                  }}
                >
                  <LatestProfile
                    profileData={profileData}
                    platformName={selectedObservation.name}
                  />

                  <RecentMeasurements measurements={recentMeasurements} />
                </div>
              )}

              {/* 6. Observation Data Table */}
              <ObservationRecordsTable
                observations={observations}
                selectedObservationId={selectedObservation?.id}
                onSelectObservation={handleSelectObservation}
              />
            </>
          )}
        </>
      )}
    </div>
  );
};
