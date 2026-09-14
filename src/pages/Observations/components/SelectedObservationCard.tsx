import React from 'react';
import { OceanObservationRecord } from '../../../types/observation';
import { StatusBadge } from '../../../components/feedback/StatusBadge';
import { formatCelsius, formatSalinity, formatMeters, formatCoordinates } from '../../../utils/formatters';
import { Radio, Compass, Waves, Thermometer, BatteryCharging, Clock, ArrowUpRight } from 'lucide-react';
import { PrimaryButton } from '../../../components/common/PrimaryButton';

export interface SelectedObservationCardProps {
  observation: OceanObservationRecord;
}

export const SelectedObservationCard: React.FC<SelectedObservationCardProps> = ({ observation }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}
    >
      {/* Header: Platform Name, ID, and Status */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: 'var(--color-ocean-blue)',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
              }}
            >
              {observation.platform}
            </span>
            <span style={{ fontSize: '10px', color: 'var(--color-border)' }}>•</span>
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', fontFamily: 'var(--font-family-mono)' }}>
              ID: {observation.instrumentId}
            </span>
          </div>
          <h3
            style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 700,
              color: 'var(--color-text-primary)',
            }}
          >
            {observation.name}
          </h3>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <StatusBadge
            label={observation.status.toUpperCase()}
            variant={observation.status === 'active' ? 'success' : observation.status === 'warning' ? 'warning' : 'neutral'}
            size="md"
          />
          <PrimaryButton size="sm" icon={<ArrowUpRight size={14} />}>
            Export NetCDF
          </PrimaryButton>
        </div>
      </div>

      {/* Primary Key Metrics Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
          gap: 'var(--space-3)',
        }}
      >
        {/* Region */}
        <div
          style={{
            padding: '10px',
            backgroundColor: 'var(--color-bg-page)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Compass size={13} color="var(--color-ocean-blue)" />
            <span>Region</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px' }}>
            {observation.region}
          </div>
        </div>

        {/* Coordinates */}
        <div
          style={{
            padding: '10px',
            backgroundColor: 'var(--color-bg-page)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Radio size={13} color="var(--color-ocean-blue)" />
            <span>Coordinates</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px', fontFamily: 'var(--font-family-mono)' }}>
            {formatCoordinates(observation.coordinates.latitude, observation.coordinates.longitude)}
          </div>
        </div>

        {/* Depth */}
        <div
          style={{
            padding: '10px',
            backgroundColor: 'var(--color-bg-page)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Waves size={13} color="var(--color-ocean-blue)" />
            <span>Observation Depth</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px' }}>
            {formatMeters(observation.depthMeters)}
          </div>
        </div>

        {/* Latest SST */}
        <div
          style={{
            padding: '10px',
            backgroundColor: 'var(--color-bg-page)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Thermometer size={13} color="var(--color-ocean-blue)" />
            <span>Latest Temp</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '4px' }}>
            {formatCelsius(observation.parameters.seaSurfaceTemperatureCelsius)}
          </div>
        </div>

        {/* Latest Salinity */}
        <div
          style={{
            padding: '10px',
            backgroundColor: 'var(--color-bg-page)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Waves size={13} color="var(--color-ocean-blue)" />
            <span>Latest Salinity</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 700, color: 'var(--color-text-primary)', marginTop: '4px' }}>
            {formatSalinity(observation.parameters.salinityPsu)}
          </div>
        </div>

        {/* Last Observation & Battery */}
        <div
          style={{
            padding: '10px',
            backgroundColor: 'var(--color-bg-page)',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px', fontSize: '0.72rem', color: 'var(--color-text-muted)' }}>
            <Clock size={13} color="var(--color-ocean-blue)" />
            <span>Last Ping</span>
          </div>
          <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)', marginTop: '4px' }}>
            {observation.lastPing}
          </div>
        </div>
      </div>

      {/* Secondary Sensor Metadata */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-secondary)',
          backgroundColor: 'var(--color-bg-subtle)',
          padding: '8px 12px',
          borderRadius: 'var(--radius-md)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {observation.parameters.pressureDbar && (
            <span>Pressure: <strong>{observation.parameters.pressureDbar} dbar</strong></span>
          )}
          {observation.parameters.dissolvedOxygenMgL && (
            <span>Dissolved O₂: <strong>{observation.parameters.dissolvedOxygenMgL} mg/L</strong></span>
          )}
          {observation.parameters.significantWaveHeightMeters && (
            <span>Wave Height: <strong>{observation.parameters.significantWaveHeightMeters} m</strong></span>
          )}
          {observation.parameters.currentSpeedKnots && (
            <span>Current: <strong>{observation.parameters.currentSpeedKnots} kts</strong></span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <BatteryCharging size={14} color="var(--color-success)" />
          <span>Battery: <strong>{observation.batteryPercent}%</strong></span>
        </div>
      </div>
    </div>
  );
};
