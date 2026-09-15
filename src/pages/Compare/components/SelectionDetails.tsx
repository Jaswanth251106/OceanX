import React from 'react';
import { ModelGridInfo } from '../../../types/comparison';

interface Props {
  gridInfo: ModelGridInfo;
  obsLat: number;
  obsLon: number;
}

export const SelectionDetails: React.FC<Props> = ({ gridInfo, obsLat, obsLon }) => {
  const details: { label: string; value: string }[] = [
    { label: 'Model Grid Cell', value: gridInfo.gridId },
    { label: 'Grid Centre', value: `${gridInfo.gridLat.toFixed(2)}°N, ${gridInfo.gridLon.toFixed(2)}°E` },
    { label: 'Resolution', value: gridInfo.resolution },
    { label: 'Nearest Observation', value: gridInfo.nearestObsId },
    { label: 'Observation Position', value: `${obsLat.toFixed(2)}°N, ${obsLon.toFixed(2)}°E` },
    { label: 'Spatial Distance', value: `${gridInfo.distanceKm.toFixed(1)} km` },
    { label: 'Temporal Offset', value: `${gridInfo.temporalOffsetHours.toFixed(1)} h` },
  ];

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
      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0B2A4A', marginBottom: '0.8rem' }}>
        Selection Details
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
        {details.map(({ label, value }) => (
          <div
            key={label}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0.38rem 0',
              borderBottom: '1px solid #F0F4F8',
              fontSize: '0.82rem',
            }}
          >
            <span style={{ color: '#5a7184', fontWeight: 500 }}>{label}</span>
            <span
              style={{
                color: '#0B2A4A',
                fontWeight: 600,
                textAlign: 'right',
                maxWidth: '60%',
                wordBreak: 'break-all',
              }}
            >
              {value}
            </span>
          </div>
        ))}
      </div>

      {/* Distance quality pill */}
      <div style={{ marginTop: '0.8rem' }}>
        <DistancePill km={gridInfo.distanceKm} />
      </div>
    </div>
  );
};

const DistancePill: React.FC<{ km: number }> = ({ km }) => {
  let color = '#22A06B';
  let bg = '#EDFAF3';
  let label = 'Excellent spatial match';
  if (km > 50) { color = '#E5484D'; bg = '#FFF0F0'; label = 'Poor spatial match'; }
  else if (km > 25) { color = '#F59E0B'; bg = '#FFFBEB'; label = 'Moderate spatial match'; }

  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.4rem',
        background: bg,
        color,
        borderRadius: '20px',
        padding: '4px 12px',
        fontSize: '0.76rem',
        fontWeight: 700,
      }}
    >
      <span style={{ width: 7, height: 7, borderRadius: '50%', background: color, display: 'inline-block' }} />
      {label} ({km.toFixed(1)} km)
    </div>
  );
};
