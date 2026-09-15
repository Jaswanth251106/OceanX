import React from 'react';
import { ComparisonMetrics as MetricsType } from '../../../types/comparison';

interface Props {
  metrics: MetricsType;
}

const MetricBox: React.FC<{ label: string; value: string; desc: string; isGood?: boolean }> = ({ label, value, desc, isGood }) => (
  <div
    style={{
      background: '#F6F8FB',
      border: '1px solid #DCE5EF',
      borderRadius: '8px',
      padding: '0.8rem',
      flex: '1 1 140px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    <div style={{ fontSize: '0.75rem', color: '#5a7184', fontWeight: 600, marginBottom: '0.3rem' }}>
      {label}
    </div>
    <div
      style={{
        fontSize: '1.25rem',
        fontWeight: 700,
        color: isGood === true ? '#22A06B' : isGood === false ? '#E5484D' : '#0B2A4A',
        marginBottom: '0.2rem',
      }}
    >
      {value}
    </div>
    <div style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>{desc}</div>
  </div>
);

export const ComparisonMetrics: React.FC<Props> = ({ metrics }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1rem 1.1rem',
        gridColumn: '1 / -1', // Span full width in a grid
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0B2A4A' }}>
          Statistical Metrics
        </div>
        <div style={{ fontSize: '0.75rem', color: '#5a7184' }}>
          n = {metrics.sampleCount} pairs
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.8rem', flexWrap: 'wrap' }}>
        <MetricBox
          label="Mean Bias"
          value={`${metrics.bias > 0 ? '+' : ''}${metrics.bias.toFixed(2)} ${metrics.unit}`}
          desc="Average difference (Model - Obs)"
          isGood={Math.abs(metrics.bias) < 0.5} // Example threshold
        />
        <MetricBox
          label="RMSE"
          value={`${metrics.rmse.toFixed(2)} ${metrics.unit}`}
          desc="Root Mean Square Error"
        />
        <MetricBox
          label="MAE"
          value={`${metrics.mae.toFixed(2)} ${metrics.unit}`}
          desc="Mean Absolute Error"
        />
        <MetricBox
          label="Pearson Correlation"
          value={metrics.correlation.toFixed(2)}
          desc="Linear correlation (r)"
          isGood={metrics.correlation > 0.8}
        />
        <MetricBox
          label="Skill Score"
          value={metrics.skillScore.toFixed(2)}
          desc="Murphy's Skill Score (0 to 1)"
          isGood={metrics.skillScore > 0.7}
        />
      </div>
    </div>
  );
};
