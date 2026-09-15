import React from 'react';
import {
  RegionOption,
  ArgoFloatItem,
  GliderItem,
} from '../../../types/comparison';
import { Filter, Layers, RefreshCw } from 'lucide-react';

interface Props {
  platformType: 'ARGO' | 'GLIDER';
  region: RegionOption;
  selectedId: string;
  argoFloats: ArgoFloatItem[];
  gliders: GliderItem[];
  onRegionChange: (region: RegionOption) => void;
  onSelectIdChange: (id: string) => void;
  loading: boolean;
  onRetryPlatforms?: () => void;
  platformError?: string | null;
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.72rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.06em',
  color: 'var(--color-text-secondary, #58708A)',
  marginBottom: '0.35rem',
};

const selectStyle: React.CSSProperties = {
  width: '100%',
  padding: '0.55rem 0.75rem',
  fontSize: '0.85rem',
  border: '1px solid var(--color-border, #D5E5EF)',
  borderRadius: '8px',
  background: '#FFFFFF',
  color: 'var(--color-text-primary, #0B2A4A)',
  cursor: 'pointer',
  outline: 'none',
  fontWeight: 500,
};

export const CompareFilterPanel: React.FC<Props> = ({
  platformType,
  region,
  selectedId,
  argoFloats,
  gliders,
  onRegionChange,
  onSelectIdChange,
  loading,
  onRetryPlatforms,
  platformError,
}) => {
  const isArgo = platformType === 'ARGO';

  return (
    <aside
      style={{
        width: 290,
        minWidth: 270,
        background: '#FFFFFF',
        border: '1px solid var(--color-border, #D5E5EF)',
        borderRadius: '12px',
        padding: '1.25rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.2rem',
        flexShrink: 0,
        alignSelf: 'stretch',
        boxShadow: '0 4px 16px rgba(8, 127, 234, 0.04)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #F3F9FC', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color={isArgo ? '#087FEA' : '#0E9F9A'} />
          <span style={{ fontWeight: 700, fontSize: '0.925rem', color: '#0B3B66' }}>
            {platformType} Filter Panel
          </span>
        </div>
        {onRetryPlatforms && platformError && (
          <button
            onClick={onRetryPlatforms}
            style={{ fontSize: '0.7rem', color: '#E5484D', background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '3px' }}
            title="Retry loading platforms"
          >
            <RefreshCw size={11} /> Retry
          </button>
        )}
      </div>

      {/* Region Dropdown */}
      <div>
        <label style={labelStyle}>Region</label>
        <select
          style={selectStyle}
          value={region}
          onChange={(e) => onRegionChange(e.target.value as RegionOption)}
          disabled={loading}
        >
          <option value="Arabian Sea">Arabian Sea</option>
          <option value="Bay of Bengal">Bay of Bengal</option>
        </select>
      </div>

      {/* Platform Type Dropdown (Read-Only) */}
      <div>
        <label style={labelStyle}>Platform Type</label>
        <select style={{ ...selectStyle, backgroundColor: '#F3F9FC', cursor: 'not-allowed' }} disabled value={platformType}>
          <option value="ARGO">ARGO Profiling Float</option>
          <option value="GLIDER">Autonomous Ocean Glider</option>
        </select>
      </div>

      {/* Dynamic Platform Selection Dropdown */}
      <div>
        <label style={labelStyle}>
          {isArgo ? `ARGO Platform ID (${argoFloats.length} loaded)` : `Glider ID (${gliders.length} loaded)`}
        </label>

        {platformError ? (
          <div style={{ fontSize: '0.75rem', color: '#E5484D', padding: '0.4rem 0' }}>
            {platformError}
          </div>
        ) : (
          <select
            style={selectStyle}
            value={selectedId}
            onChange={(e) => onSelectIdChange(e.target.value)}
            disabled={loading || (isArgo ? argoFloats.length === 0 : gliders.length === 0)}
          >
            <option value="">
              {isArgo
                ? `-- Select ARGO Platform (${argoFloats.length}) --`
                : `-- Select Glider (${gliders.length}) --`}
            </option>

            {isArgo
              ? argoFloats.map((f) => (
                  <option key={f.platform_id} value={f.platform_id}>
                    Platform {f.platform_id} ({f.latitude.toFixed(2)}°N, {f.longitude.toFixed(2)}°E)
                  </option>
                ))
              : gliders.map((g) => (
                  <option key={g.glider_id} value={g.glider_id}>
                    Glider {g.glider_name} ({g.latitude.toFixed(2)}°N, {g.longitude.toFixed(2)}°E)
                  </option>
                ))}
          </select>
        )}
      </div>

      {/* Info Box */}
      <div
        style={{
          marginTop: 'auto',
          padding: '0.75rem',
          borderRadius: '8px',
          backgroundColor: isArgo ? '#EAF6FF' : '#E6F7FB',
          border: '1px solid rgba(0, 184, 217, 0.2)',
          fontSize: '0.75rem',
          color: '#58708A',
          lineHeight: 1.4,
          display: 'flex',
          gap: '8px',
        }}
      >
        <Layers size={16} color={isArgo ? '#087FEA' : '#0E9F9A'} style={{ flexShrink: 0, marginTop: '2px' }} />
        <span>
          Select {isArgo ? 'an ARGO platform' : 'a Glider'} to fetch real live API comparison profiles & summary statistics from backend.
        </span>
      </div>
    </aside>
  );
};
