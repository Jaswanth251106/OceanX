import React from 'react';
import { ObservationDataCard } from '../../../types/comparison';

interface Props {
  data: ObservationDataCard;
}

const qcColors: Record<ObservationDataCard['qcFlag'], string> = {
  good: '#22A06B',
  probably_good: '#F59E0B',
  bad: '#E5484D',
  missing: '#9CA3AF',
};

const qcLabels: Record<ObservationDataCard['qcFlag'], string> = {
  good: 'QC: Good',
  probably_good: 'QC: Probably Good',
  bad: 'QC: Bad',
  missing: 'QC: Missing',
};

const row = (label: string, value: React.ReactNode) => (
  <div
    key={label}
    style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0.4rem 0',
      borderBottom: '1px solid #F0F4F8',
      fontSize: '0.82rem',
    }}
  >
    <span style={{ color: '#5a7184', fontWeight: 500 }}>{label}</span>
    <span style={{ color: '#0B2A4A', fontWeight: 600, textAlign: 'right', maxWidth: '55%' }}>{value}</span>
  </div>
);

export const ObservationViewCard: React.FC<Props> = ({ data }) => {
  const fmtDatetime = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleString('en-IN', { dateStyle: 'medium', timeStyle: 'short', hour12: false });
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1rem 1.1rem',
        flex: 1,
        minWidth: 220,
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.8rem' }}>
        <div
          style={{
            width: 10,
            height: 10,
            borderRadius: '2px',
            background: '#22A06B',
            flexShrink: 0,
          }}
        />
        <span style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0B2A4A' }}>
          Observation
        </span>
        <span
          style={{
            marginLeft: 'auto',
            background: '#EDFAF3',
            color: '#22A06B',
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '2px 8px',
            borderRadius: '20px',
          }}
        >
          {data.platformId}
        </span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column' }}>
        {row('Platform', data.platformLabel)}
        {row('Observation Time', fmtDatetime(data.observationTime))}
        {row('Position', `${data.lat.toFixed(2)}°N, ${data.lon.toFixed(2)}°E`)}
        {row('Depth', `${data.depth} m`)}
        {row(
          'QC Flag',
          <span style={{ color: qcColors[data.qcFlag], fontWeight: 700 }}>
            {qcLabels[data.qcFlag]}
          </span>,
        )}
      </div>

      {/* Key values */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.85rem', flexWrap: 'wrap' }}>
        <StatChip label="Temp" value={`${data.temperature.toFixed(1)} °C`} color="#22A06B" />
        <StatChip label="Salinity" value={`${data.salinity.toFixed(2)} PSU`} color="#0B2A4A" />
        {data.currentSpeed !== null ? (
          <StatChip label="Curr. Speed" value={`${data.currentSpeed.toFixed(2)} m/s`} color="#F59E0B" />
        ) : (
          <StatChip label="Curr. Speed" value="N/A" color="#9CA3AF" />
        )}
      </div>
    </div>
  );
};

const StatChip: React.FC<{ label: string; value: string; color: string }> = ({ label, value, color }) => (
  <div
    style={{
      background: '#F6F8FB',
      border: `1.5px solid ${color}30`,
      borderRadius: '8px',
      padding: '0.35rem 0.7rem',
      textAlign: 'center',
      flex: 1,
      minWidth: 90,
    }}
  >
    <div style={{ fontSize: '0.7rem', color: '#5a7184', marginBottom: 2 }}>{label}</div>
    <div style={{ fontSize: '0.9rem', fontWeight: 700, color }}>{value}</div>
  </div>
);
