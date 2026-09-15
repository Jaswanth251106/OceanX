import React from 'react';
import { ComparisonFilterState, ComparisonOptions } from '../../../types/comparison';

interface Props {
  filters: ComparisonFilterState;
  options: ComparisonOptions;
  onChange: (next: ComparisonFilterState) => void;
  onApply: () => void;
  loading: boolean;
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 600,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--color-text-secondary, #5a7184)',
  marginBottom: '0.3rem',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.45rem 0.65rem',
  fontSize: '0.825rem',
  border: '1px solid var(--color-border, #DCE5EF)',
  borderRadius: '6px',
  background: '#fff',
  color: 'var(--color-text-primary, #0B2A4A)',
  cursor: 'pointer',
  outline: 'none',
};

export const ComparisonFilters: React.FC<Props> = ({
  filters,
  options,
  onChange,
  onApply,
  loading,
}) => {
  const set = <K extends keyof ComparisonFilterState>(
    key: K,
    val: ComparisonFilterState[K],
  ) => onChange({ ...filters, [key]: val });

  return (
    <aside
      style={{
        width: 240,
        minWidth: 200,
        background: '#fff',
        border: '1px solid var(--color-border, #DCE5EF)',
        borderRadius: '10px',
        padding: '1.2rem 1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        flexShrink: 0,
        alignSelf: 'flex-start',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--color-navy, #0B2A4A)', marginBottom: '0.25rem' }}>
        Comparison Filters
      </div>

      {/* Model */}
      <div>
        <label style={labelStyle}>Ocean Model</label>
        <select
          style={selectStyle}
          value={filters.model}
          onChange={(e) => set('model', e.target.value)}
        >
          {options.models.map((m) => (
            <option key={m.id} value={m.id}>{m.label}</option>
          ))}
        </select>
      </div>

      {/* Observation source */}
      <div>
        <label style={labelStyle}>Observation Source</label>
        <select
          style={selectStyle}
          value={filters.observationSource}
          onChange={(e) => set('observationSource', e.target.value)}
        >
          {options.observationSources.map((o) => (
            <option key={o.id} value={o.id}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Variable */}
      <div>
        <label style={labelStyle}>Variable</label>
        <select
          style={selectStyle}
          value={filters.variable}
          onChange={(e) => set('variable', e.target.value as ComparisonFilterState['variable'])}
        >
          {options.variables.map((v) => (
            <option key={v.id} value={v.id}>{v.label} ({v.unit})</option>
          ))}
        </select>
      </div>

      {/* Region */}
      <div>
        <label style={labelStyle}>Region</label>
        <select
          style={selectStyle}
          value={filters.region}
          onChange={(e) => set('region', e.target.value as ComparisonFilterState['region'])}
        >
          {options.regions.map((r) => (
            <option key={r.id} value={r.id}>{r.label}</option>
          ))}
        </select>
      </div>

      {/* Depth */}
      <div>
        <label style={labelStyle}>Reference Depth (m)</label>
        <select
          style={selectStyle}
          value={filters.depth}
          onChange={(e) => set('depth', Number(e.target.value))}
        >
          {options.depths.map((d) => (
            <option key={d} value={d}>{d === 0 ? 'Surface (0 m)' : `${d} m`}</option>
          ))}
        </select>
      </div>

      {/* Date */}
      <div>
        <label style={labelStyle}>Date</label>
        <input
          type="date"
          style={{ ...selectStyle }}
          value={filters.date}
          onChange={(e) => set('date', e.target.value)}
        />
      </div>

      <button
        onClick={onApply}
        disabled={loading}
        style={{
          marginTop: '0.5rem',
          padding: '0.55rem 0',
          width: '100%',
          background: loading ? '#90b8d8' : 'var(--color-ocean-blue, #087FEA)',
          color: '#fff',
          border: 'none',
          borderRadius: '7px',
          fontWeight: 700,
          fontSize: '0.85rem',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'background 0.2s',
          letterSpacing: '0.03em',
        }}
      >
        {loading ? 'Loading…' : 'Run Comparison'}
      </button>
    </aside>
  );
};
