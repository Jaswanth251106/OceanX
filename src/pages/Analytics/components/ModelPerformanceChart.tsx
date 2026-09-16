import React from 'react';
import { Activity } from 'lucide-react';
import { ApiModelPerformance } from '../../../types/analytics';

interface Props {
  data: ApiModelPerformance | null;
  loading: boolean;
  error: string | null;
}

const metricCardStyle = (accentColor: string, bg: string): React.CSSProperties => ({
  flex: '1 1 140px',
  padding: '0.9rem 1rem',
  borderRadius: 'var(--radius-sm)',
  background: bg,
  border: `1px solid ${accentColor}33`,
  display: 'flex',
  flexDirection: 'column',
  gap: '0.5rem',
});

const metricLabel: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.07em',
  color: 'var(--color-text-muted)',
};

const metricValue = (color: string): React.CSSProperties => ({
  fontSize: '1.4rem',
  fontWeight: 700,
  color,
  letterSpacing: '-0.02em',
  lineHeight: 1,
});

const metricSub: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  color: 'var(--color-text-secondary)',
};

function fmt(n: number, decimals = 3): string {
  return isFinite(n) ? n.toFixed(decimals) : '--';
}

function fmtBias(n: number): string {
  return isFinite(n) ? (n >= 0 ? '+' : '') + n.toFixed(3) : '--';
}

const skeletonLine = (w: string): React.CSSProperties => ({
  height: 12,
  width: w,
  borderRadius: 4,
  background: 'var(--color-bg-subtle)',
  marginBottom: 6,
});

export const ModelPerformanceChart: React.FC<Props> = ({ data, loading, error }) => {
  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        flex: '1 1 400px',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.25rem',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--color-success-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Activity size={16} color="var(--color-marine-teal)" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
            GLORYS Performance
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            {data ? data.model : 'Copernicus Marine Service model metrics'}
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <div style={skeletonLine('80%')} />
          <div style={skeletonLine('60%')} />
          <div style={skeletonLine('70%')} />
        </div>
      )}

      {!loading && error && (
        <div style={{ padding: '1rem', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-danger)', fontSize: 'var(--font-size-xs)' }}>
          {error}
        </div>
      )}

      {!loading && !error && !data && (
        <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          Model performance data unavailable.
        </div>
      )}

      {!loading && !error && data && (
        <>
          {/* Temperature metrics */}
          <div>
            <div
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.6rem',
              }}
            >
              Temperature
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={metricCardStyle('var(--color-ocean-blue)', 'var(--color-info-bg)')}>
                <span style={metricLabel}>MAE</span>
                <span style={metricValue('var(--color-ocean-blue)')}>{fmt(data.temperature.mae)}</span>
                <span style={metricSub}>Mean Absolute Error (°C)</span>
              </div>
              <div style={metricCardStyle('var(--color-warning)', 'var(--color-warning-bg)')}>
                <span style={metricLabel}>Bias</span>
                <span style={metricValue('var(--color-warning)')}>{fmtBias(data.temperature.bias)}</span>
                <span style={metricSub}>Systematic offset (°C)</span>
              </div>
              <div style={metricCardStyle('var(--color-danger)', 'var(--color-danger-bg)')}>
                <span style={metricLabel}>RMSE</span>
                <span style={metricValue('var(--color-danger)')}>{fmt(data.temperature.rmse)}</span>
                <span style={metricSub}>Root Mean Square Error (°C)</span>
              </div>
            </div>
          </div>

          {/* Salinity metrics */}
          <div>
            <div
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 700,
                color: 'var(--color-text-secondary)',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: '0.6rem',
              }}
            >
              Salinity
            </div>
            <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
              <div style={metricCardStyle('var(--color-marine-teal)', 'var(--color-success-bg)')}>
                <span style={metricLabel}>MAE</span>
                <span style={metricValue('var(--color-marine-teal)')}>{fmt(data.salinity.mae)}</span>
                <span style={metricSub}>Mean Absolute Error (PSU)</span>
              </div>
              <div style={metricCardStyle('var(--color-cyan)', '#E6F7FB')}>
                <span style={metricLabel}>Bias</span>
                <span style={metricValue('var(--color-cyan)')}>{fmtBias(data.salinity.bias)}</span>
                <span style={metricSub}>Systematic offset (PSU)</span>
              </div>
              <div style={metricCardStyle('var(--color-primary-navy)', 'var(--color-bg-subtle)')}>
                <span style={metricLabel}>RMSE</span>
                <span style={metricValue('var(--color-primary-navy)')}>{fmt(data.salinity.rmse)}</span>
                <span style={metricSub}>Root Mean Square Error (PSU)</span>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
