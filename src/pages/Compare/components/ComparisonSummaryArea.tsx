import React from 'react';
import { ComparisonSummaryResponse } from '../../../types/comparison';
import { FileText, CheckCircle2, RefreshCw, AlertCircle } from 'lucide-react';

interface Props {
  platformType: 'ARGO' | 'GLIDER';
  platformId: string;
  summary: ComparisonSummaryResponse | null;
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

const SummaryCard: React.FC<{ label: string; value?: string | number; unit?: string; desc: string; highlightColor?: string }> = ({
  label,
  value,
  unit,
  desc,
  highlightColor = '#0B3B66',
}) => (
  <div
    style={{
      backgroundColor: '#F3F9FC',
      border: '1px solid #D5E5EF',
      borderRadius: '8px',
      padding: '0.9rem 1.1rem',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      width: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ fontSize: '0.72rem', color: '#58708A', fontWeight: 700, textTransform: 'uppercase', marginBottom: '0.35rem' }}>
      {label}
    </div>
    <div style={{ fontSize: '1.25rem', fontWeight: 800, color: highlightColor, marginBottom: '0.15rem' }}>
      {value !== undefined && value !== null ? `${value}${unit ? ' ' + unit : ''}` : 'N/A'}
    </div>
    <div style={{ fontSize: '0.68rem', color: '#8AA1B9' }}>{desc}</div>
  </div>
);

export const ComparisonSummaryArea: React.FC<Props> = ({
  platformType,
  summary,
  loading,
  error,
  onRetry,
}) => {
  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-border, #D5E5EF)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 4px 16px rgba(8, 127, 234, 0.04)',
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FileText size={18} color="#0B3B66" />
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-navy, #0B3B66)', margin: 0 }}>
            {platformType} COMPARISON SUMMARY
          </h3>
        </div>

        {summary && (
          <span
            style={{
              fontSize: '0.72rem',
              fontWeight: 600,
              color: '#0E9F9A',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <CheckCircle2 size={13} />
            Dataset: {summary.dataset} ({summary.observation_source})
          </span>
        )}
      </div>

      {/* Error state */}
      {error && (
        <div style={{ padding: '1rem', backgroundColor: '#FFF0F0', border: '1px solid #FECACA', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#E5484D', fontSize: '0.825rem', fontWeight: 600 }}>
            <AlertCircle size={16} />
            {error}
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              style={{ padding: '0.35rem 0.75rem', backgroundColor: '#E5484D', color: '#FFFFFF', border: 'none', borderRadius: '6px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
            >
              <RefreshCw size={12} /> Retry
            </button>
          )}
        </div>
      )}

      {/* Loading state */}
      {loading && !error && (
        <div style={{ padding: '2rem', textAlign: 'center', color: '#087FEA', fontSize: '0.85rem', fontWeight: 600 }}>
          Fetching {platformType} summary metrics from backend API...
        </div>
      )}

      {/* Summary Content */}
      {!loading && !error && summary && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', width: '100%' }}>
          {/* Temperature Metrics */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#087FEA', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Temperature Metrics ({summary.temperature.valid_comparisons} comparisons)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', width: '100%' }}>
              <SummaryCard
                label="Temp Bias"
                value={summary.temperature.bias > 0 ? `+${summary.temperature.bias.toFixed(4)}` : summary.temperature.bias.toFixed(4)}
                unit="°C"
                desc="Mean Error (Model - Obs)"
                highlightColor={summary.temperature.bias > 0 ? '#087FEA' : '#0E9F9A'}
              />
              <SummaryCard
                label="Temp MAE"
                value={summary.temperature.mae.toFixed(4)}
                unit="°C"
                desc="Mean Absolute Error"
              />
              <SummaryCard
                label="Temp RMSE"
                value={summary.temperature.rmse.toFixed(4)}
                unit="°C"
                desc="Root Mean Square Error"
              />
              <SummaryCard
                label="Valid Records"
                value={summary.temperature.valid_comparisons.toLocaleString()}
                unit="pts"
                desc="Valid observation points"
              />
            </div>
          </div>

          {/* Salinity Metrics */}
          <div>
            <div style={{ fontSize: '0.78rem', fontWeight: 700, color: '#0E9F9A', marginBottom: '0.65rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
              Salinity Metrics ({summary.salinity.valid_comparisons} comparisons)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '0.85rem', width: '100%' }}>
              <SummaryCard
                label="Salinity Bias"
                value={summary.salinity.bias > 0 ? `+${summary.salinity.bias.toFixed(4)}` : summary.salinity.bias.toFixed(4)}
                unit="PSU"
                desc="Mean Error (Model - Obs)"
                highlightColor={summary.salinity.bias > 0 ? '#00B8D9' : '#0E9F9A'}
              />
              <SummaryCard
                label="Salinity MAE"
                value={summary.salinity.mae.toFixed(4)}
                unit="PSU"
                desc="Mean Absolute Error"
              />
              <SummaryCard
                label="Salinity RMSE"
                value={summary.salinity.rmse.toFixed(4)}
                unit="PSU"
                desc="Root Mean Square Error"
              />
              <SummaryCard
                label="Valid Records"
                value={summary.salinity.valid_comparisons.toLocaleString()}
                unit="pts"
                desc="Valid salinity points"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
