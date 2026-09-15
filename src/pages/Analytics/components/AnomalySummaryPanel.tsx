import React from 'react';
import { AnomalySummary } from '../../../types/analytics';

interface Props {
  anomalies: AnomalySummary[];
}

const severityColors: Record<string, { bg: string; text: string }> = {
  critical: { bg: '#FFF0F0', text: '#E5484D' },
  high: { bg: '#FFFBEB', text: '#F59E0B' },
  medium: { bg: '#F6F8FB', text: '#087FEA' },
  low: { bg: '#EDFAF3', text: '#22A06B' },
};

export const AnomalySummaryPanel: React.FC<Props> = ({ anomalies }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1.25rem',
        flex: '1 1 300px',
        height: 320,
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Active Anomalies & Warnings
      </div>
      
      <div style={{ overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '0.8rem', paddingRight: '0.5rem' }}>
        {anomalies.map((anomaly) => (
          <div
            key={anomaly.id}
            style={{
              padding: '0.8rem',
              borderRadius: '8px',
              border: `1px solid ${severityColors[anomaly.severity].bg === '#F6F8FB' ? '#DCE5EF' : severityColors[anomaly.severity].bg}`,
              background: severityColors[anomaly.severity].bg,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.4rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.825rem', color: severityColors[anomaly.severity].text }}>
                {anomaly.type}
              </div>
              <div style={{ fontSize: '0.7rem', color: '#5a7184', fontWeight: 600 }}>
                {new Date(anomaly.detectedAt).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
              </div>
            </div>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: '#0B2A4A', marginBottom: '0.2rem' }}>
              {anomaly.region}
            </div>
            <div style={{ fontSize: '0.75rem', color: '#5a7184', lineHeight: 1.4 }}>
              {anomaly.description}
            </div>
          </div>
        ))}
        {anomalies.length === 0 && (
          <div style={{ fontSize: '0.8rem', color: '#9CA3AF', textAlign: 'center', marginTop: '2rem' }}>
            No active anomalies detected in this region.
          </div>
        )}
      </div>
    </div>
  );
};
