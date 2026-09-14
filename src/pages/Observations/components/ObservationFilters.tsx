import React, { useState } from 'react';
import { ObservationFilterState } from '../../../types/observation';
import { Dropdown } from '../../../components/forms/Dropdown';
import { PrimaryButton } from '../../../components/common/PrimaryButton';
import { SecondaryButton } from '../../../components/common/SecondaryButton';
import { Filter, RotateCcw, Search } from 'lucide-react';

export interface ObservationFiltersProps {
  initialFilters: ObservationFilterState;
  onApplyFilters: (filters: ObservationFilterState) => void;
  onResetFilters: () => void;
  activeCount: number;
}

export const ObservationFilters: React.FC<ObservationFiltersProps> = ({
  initialFilters,
  onApplyFilters,
  onResetFilters,
  activeCount,
}) => {
  const [draftFilters, setDraftFilters] = useState<ObservationFilterState>(initialFilters);

  const updateField = (field: keyof ObservationFilterState, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleApply = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    onApplyFilters(draftFilters);
  };

  const handleReset = () => {
    const empty: ObservationFilterState = {
      instrumentType: 'ALL',
      status: 'ALL',
      dateRange: '24h',
      region: 'ALL',
      variable: 'ALL',
      depth: 'ALL',
      searchQuery: '',
    };
    setDraftFilters(empty);
    onResetFilters();
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        width: '100%',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Filter size={16} color="var(--color-ocean-blue)" />
          <h3 style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Observation Filters
          </h3>
        </div>
        {activeCount > 0 && (
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              backgroundColor: 'var(--color-light-blue)',
              color: 'var(--color-ocean-blue)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              fontWeight: 600,
            }}
          >
            {activeCount} Active
          </span>
        )}
      </div>

      <form onSubmit={handleApply} style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {/* Search Input */}
        <div>
          <label style={{ fontSize: 'var(--font-size-xs)', fontWeight: 500, color: 'var(--color-text-secondary)', marginBottom: '4px', display: 'block' }}>
            Keyword Search
          </label>
          <div style={{ position: 'relative' }}>
            <div
              style={{
                position: 'absolute',
                left: '10px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: 'var(--color-text-muted)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Search size={14} />
            </div>
            <input
              type="text"
              value={draftFilters.searchQuery}
              onChange={(e) => updateField('searchQuery', e.target.value)}
              placeholder="Instrument ID, platform, region..."
              style={{
                width: '100%',
                padding: '7px 10px 7px 30px',
                fontSize: 'var(--font-size-xs)',
                border: '1px solid var(--color-border)',
                borderRadius: 'var(--radius-md)',
                backgroundColor: 'var(--color-bg-page)',
                color: 'var(--color-text-primary)',
                outline: 'none',
              }}
            />
          </div>
        </div>

        {/* 1. Instrument Type */}
        <Dropdown
          label="Instrument Type"
          value={draftFilters.instrumentType}
          onChange={(val) => updateField('instrumentType', val)}
          fullWidth
          options={[
            { value: 'ALL', label: 'All Instruments' },
            { value: 'argo-float', label: 'ARGO Profiling Float' },
            { value: 'moored-buoy', label: 'Moored Buoy (OMNI)' },
            { value: 'wave-rider-buoy', label: 'Wave Rider Buoy' },
            { value: 'tide-gauge', label: 'Coastal Tide Gauge' },
            { value: 'ship-observation', label: 'Ship Observation' },
          ]}
        />

        {/* 2. Status */}
        <Dropdown
          label="Instrument Status"
          value={draftFilters.status}
          onChange={(val) => updateField('status', val)}
          fullWidth
          options={[
            { value: 'ALL', label: 'All Statuses' },
            { value: 'active', label: 'Active (Online)' },
            { value: 'warning', label: 'Warning / Elevated' },
            { value: 'inactive', label: 'Inactive / Maintenance' },
          ]}
        />

        {/* 3. Region */}
        <Dropdown
          label="Oceanic Region"
          value={draftFilters.region}
          onChange={(val) => updateField('region', val)}
          fullWidth
          options={[
            { value: 'ALL', label: 'All Regions' },
            { value: 'Arabian Sea', label: 'Arabian Sea' },
            { value: 'Bay of Bengal', label: 'Bay of Bengal' },
            { value: 'Equatorial Indian Ocean', label: 'Equatorial Indian Ocean' },
            { value: 'Southern Indian Ocean', label: 'Southern Indian Ocean' },
          ]}
        />

        {/* 4. Date Range */}
        <Dropdown
          label="Temporal Window"
          value={draftFilters.dateRange}
          onChange={(val) => updateField('dateRange', val)}
          fullWidth
          options={[
            { value: '24h', label: 'Last 24 Hours' },
            { value: '7d', label: 'Last 7 Days' },
            { value: '30d', label: 'Last 30 Days' },
            { value: 'custom', label: 'Custom Range...' },
          ]}
        />

        {/* 5. Variable */}
        <Dropdown
          label="Ocean Variable"
          value={draftFilters.variable}
          onChange={(val) => updateField('variable', val)}
          fullWidth
          options={[
            { value: 'ALL', label: 'All Variables' },
            { value: 'temperature', label: 'Temperature (°C)' },
            { value: 'salinity', label: 'Salinity (PSU)' },
            { value: 'pressure', label: 'Pressure (dbar)' },
            { value: 'chlorophyll', label: 'Chlorophyll-a (mg/m³)' },
            { value: 'wave-height', label: 'Wave Height (m)' },
            { value: 'sea-level', label: 'Sea Level Anomaly (cm)' },
          ]}
        />

        {/* 6. Depth Bracket */}
        <Dropdown
          label="Depth Range"
          value={draftFilters.depth}
          onChange={(val) => updateField('depth', val)}
          fullWidth
          options={[
            { value: 'ALL', label: 'All Depths' },
            { value: 'surface', label: 'Surface (0 m)' },
            { value: '0-100m', label: 'Epipelagic (0 – 100 m)' },
            { value: '100-500m', label: 'Mesopelagic (100 – 500 m)' },
            { value: '500-1000m', label: 'Bathypelagic (500 – 1,000 m)' },
            { value: '>1000m', label: 'Deep Ocean (> 1,000 m)' },
          ]}
        />

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '8px', marginTop: 'var(--space-2)' }}>
          <PrimaryButton type="submit" fullWidth size="sm">
            Apply Filters
          </PrimaryButton>
          <SecondaryButton type="button" onClick={handleReset} icon={<RotateCcw size={13} />} size="sm">
            Clear
          </SecondaryButton>
        </div>
      </form>
    </div>
  );
};
