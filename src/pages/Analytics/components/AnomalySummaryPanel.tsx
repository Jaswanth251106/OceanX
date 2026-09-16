import React from 'react';
import { TriangleAlert } from 'lucide-react';
import { ApiAnomaly } from '../../../types/analytics';

interface Props {
  anomalies: ApiAnomaly[] | null;
  loading: boolean;
  error: string | null;
}

const SEVERITY_CONFIG: Record<string, { bg: string; border: string; text: string; badge: string; badgeText: string }> = {
  critical: {
    bg: 'var(--color-danger-bg)',
    border: 'var(--color-danger-border)',
    text: 'var(--color-danger)',
    badge: 'var(--color-danger)',
    badgeText: '#fff',
  },
  high: {
    bg: 'var(--color-warning-bg)',
    border: 'var(--color-warning-border)',
    text: 'var(--color-warning)',
    badge: 'var(--color-warning)',
    badgeText: '#fff',
  },
  medium: {
    bg: 'var(--color-info-bg)',
    border: 'var(--color-info-border)',
    text: 'var(--color-ocean-blue)',
    badge: 'var(--color-ocean-blue)',
    badgeText: '#fff',
  },
  low: {
    bg: 'var(--color-success-bg)',
    border: 'var(--color-success-border)',
    text: 'var(--color-success)',
    badge: 'var(--color-success)',
    badgeText: '#fff',
  },
};

const DEFAULT_CFG = SEVERITY_CONFIG.medium;

export const AnomalySummaryPanel: React.FC<Props> = ({ anomalies, loading, error }) => {
  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        flex: '1 1 300px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-danger-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <TriangleAlert size={16} color="var(--color-danger)" strokeWidth={2} />
        </div>
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 'var(--font-size-sm)',
              color: 'var(--color-text-primary)',
              lineHeight: 1.2,
            }}
          >
            Anomalies & Warnings
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            {anomalies ? `${anomalies.length} event${anomalies.length !== 1 ? 's' : ''}` : 'Loading…'}
          </div>
        </div>
      </div>

      {/* Loading */}
      {loading && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            Loading anomalies…
          </div>
        </div>
      )}

      {/* Error */}
      {!loading && error && (
        <div
          style={{
            padding: '1rem',
            background: 'var(--color-danger-bg)',
            border: '1px solid var(--color-danger-border)',
            borderRadius: 'var(--radius-sm)',
            color: 'var(--color-danger)',
            fontSize: 'var(--font-size-xs)',
          }}
        >
          {error}
        </div>
      )}

      {/* Empty state */}
      {!loading && !error && anomalies && anomalies.length === 0 && (
        <div
          style={{
            textAlign: 'center',
            padding: '2rem 1rem',
            color: 'var(--color-text-muted)',
            fontSize: 'var(--font-size-sm)',
          }}
        >
          No anomalies detected.
        </div>
      )}

      {/* Anomaly list */}
      {!loading && !error && anomalies && anomalies.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '0.75rem',
            overflowY: 'auto',
            maxHeight: 340,
            paddingRight: '0.25rem',
          }}
        >
          {anomalies.map((anomaly, idx) => {
            const severity = (anomaly.severity ?? 'medium').toLowerCase();
            const cfg = SEVERITY_CONFIG[severity] ?? DEFAULT_CFG;
            const detectedDate = anomaly.detected_at
              ? new Date(anomaly.detected_at).toLocaleDateString('en-IN', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })
              : '';

            return (
              <div
                key={anomaly.id ?? `anom-${idx}`}
                style={{
                  padding: '0.85rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  background: cfg.bg,
                  border: `1px solid ${cfg.border}`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.35rem',
                }}
              >
                {/* Row 1: type + severity badge + date */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {anomaly.type && (
                      <span style={{ fontWeight: 700, fontSize: 'var(--font-size-xs)', color: cfg.text }}>
                        {anomaly.type}
                      </span>
                    )}
                    {anomaly.severity && (
                      <span
                        style={{
                          display: 'inline-block',
                          padding: '1px 7px',
                          borderRadius: 'var(--radius-full)',
                          background: cfg.badge,
                          color: cfg.badgeText,
                          fontSize: 10,
                          fontWeight: 700,
                          textTransform: 'uppercase',
                          letterSpacing: '0.06em',
                        }}
                      >
                        {anomaly.severity}
                      </span>
                    )}
                  </div>
                  {detectedDate && (
                    <span style={{ fontSize: 10, color: 'var(--color-text-muted)', fontWeight: 500 }}>
                      {detectedDate}
                    </span>
                  )}
                </div>

                {/* Row 2: region + variable */}
                {(anomaly.region || anomaly.variable) && (
                  <div style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {[anomaly.region, anomaly.variable].filter(Boolean).join(' · ')}
                  </div>
                )}

                {/* Row 3: description */}
                {anomaly.description && (
                  <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', lineHeight: 1.5 }}>
                    {anomaly.description}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
