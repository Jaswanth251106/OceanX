import React from 'react';
import { AnalyticsFilterState } from '../../../types/analytics';

interface Props {
  filters: AnalyticsFilterState;
  onChange: (filters: AnalyticsFilterState) => void;
  loading?: boolean;
}

const selectStyle: React.CSSProperties = {
  padding: '0.45rem 0.65rem',
  fontSize: '0.825rem',
  border: '1px solid var(--color-border, #DCE5EF)',
  borderRadius: '6px',
  background: '#fff',
  color: 'var(--color-text-primary, #0B2A4A)',
  cursor: 'pointer',
  outline: 'none',
  minWidth: 140,
};

export const AnalyticsFilters: React.FC<Props> = ({ filters, onChange, loading }) => {
  return (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <select
        style={selectStyle}
        value={filters.region}
        onChange={(e) => onChange({ ...filters, region: e.target.value })}
        disabled={loading}
      >
        <option value="all">All Regions</option>
        <option value="arabian_sea">Arabian Sea</option>
        <option value="bay_of_bengal">Bay of Bengal</option>
        <option value="equatorial">Equatorial Indian Ocean</option>
      </select>

      <select
        style={selectStyle}
        value={filters.variable}
        onChange={(e) => onChange({ ...filters, variable: e.target.value })}
        disabled={loading}
      >
        <option value="all">All Variables</option>
        <option value="temp">Temperature</option>
        <option value="salinity">Salinity</option>
        <option value="currents">Currents</option>
      </select>

      <select
        style={selectStyle}
        value={filters.timeRange}
        onChange={(e) => onChange({ ...filters, timeRange: e.target.value })}
        disabled={loading}
      >
        <option value="ytd">Year to Date (2026)</option>
        <option value="1y">Last 1 Year</option>
        <option value="5y">Last 5 Years</option>
      </select>
    </div>
  );
};
