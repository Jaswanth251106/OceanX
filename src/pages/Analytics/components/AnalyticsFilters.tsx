import React from 'react';
import { AnalyticsFilterState } from '../../../types/analytics';

interface Props {
  filters: AnalyticsFilterState;
  onChange: (filters: AnalyticsFilterState) => void;
  loading?: boolean;
}

const filterBarStyle: React.CSSProperties = {
  background: 'var(--color-bg-card)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  padding: '1rem 1.25rem',
  display: 'flex',
  gap: '1.5rem',
  alignItems: 'flex-end',
  flexWrap: 'wrap',
  boxShadow: 'var(--shadow-sm)',
};

const filterGroupStyle: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.35rem',
  minWidth: 160,
};

const labelStyle: React.CSSProperties = {
  fontSize: 'var(--font-size-xs)',
  fontWeight: 600,
  color: 'var(--color-text-secondary)',
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
};

const selectStyle: React.CSSProperties = {
  padding: '0.5rem 0.75rem',
  fontSize: 'var(--font-size-sm)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-sm)',
  background: 'var(--color-bg-page)',
  color: 'var(--color-text-primary)',
  cursor: 'pointer',
  outline: 'none',
  fontFamily: 'var(--font-family-base)',
  fontWeight: 500,
  transition: 'border-color var(--transition-fast), box-shadow var(--transition-fast)',
  appearance: 'auto',
};

export const AnalyticsFilters: React.FC<Props> = ({ filters, onChange, loading }) => {
  return (
    <div style={filterBarStyle}>
      <div style={filterGroupStyle}>
        <label style={labelStyle}>Region</label>
        <select
          style={{ ...selectStyle, opacity: loading ? 0.6 : 1 }}
          value={filters.region}
          onChange={(e) => onChange({ ...filters, region: e.target.value })}
          disabled={loading}
        >
          <option value="arabian_sea">Arabian Sea</option>
          <option value="bay_of_bengal">Bay of Bengal</option>
        </select>
      </div>

      <div style={filterGroupStyle}>
        <label style={labelStyle}>Variable</label>
        <select
          style={{ ...selectStyle, opacity: loading ? 0.6 : 1 }}
          value={filters.variable}
          onChange={(e) => onChange({ ...filters, variable: e.target.value })}
          disabled={loading}
        >
          <option value="temp">Temperature</option>
          <option value="salinity">Salinity</option>
        </select>
      </div>

      <div style={filterGroupStyle}>
        <label style={labelStyle}>Period</label>
        <select
          style={{ ...selectStyle, opacity: loading ? 0.6 : 1 }}
          value={filters.timeRange}
          onChange={(e) => onChange({ ...filters, timeRange: e.target.value })}
          disabled={loading}
        >
          <option value="ytd">Year to Date (2026)</option>
          <option value="1y">Last 1 Year</option>
          <option value="5y">Last 5 Years</option>
        </select>
      </div>

      {loading && (
        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: '0.4rem',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-ocean-blue)',
            fontWeight: 600,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--color-ocean-blue)',
              display: 'inline-block',
              animation: 'pulse 1.2s ease-in-out infinite',
            }}
          />
          Updating...
        </div>
      )}
    </div>
  );
};
