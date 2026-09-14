import React from 'react';
import { Search, Filter, RotateCcw } from 'lucide-react';
import { SecondaryButton } from '../common/SecondaryButton';

export interface FilterPanelProps {
  searchQuery?: string;
  onSearchChange?: (val: string) => void;
  searchPlaceholder?: string;
  children?: React.ReactNode;
  onReset?: () => void;
  activeFilterCount?: number;
}

export const FilterPanel: React.FC<FilterPanelProps> = ({
  searchQuery = '',
  onSearchChange,
  searchPlaceholder = 'Search by ID, instrument, or basin...',
  children,
  onReset,
  activeFilterCount = 0,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-4)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginBottom: 'var(--space-4)',
      }}
    >
      {onSearchChange && (
        <div
          style={{
            position: 'relative',
            flex: '1 1 240px',
            minWidth: '200px',
          }}
        >
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
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder={searchPlaceholder}
            style={{
              width: '100%',
              padding: '7px 12px 7px 34px',
              fontSize: 'var(--font-size-sm)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-page)',
              color: 'var(--color-text-primary)',
              outline: 'none',
              transition: 'border-color var(--transition-fast)',
            }}
          />
        </div>
      )}

      {children && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}
        >
          {children}
        </div>
      )}

      {onReset && (
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '8px' }}>
          {activeFilterCount > 0 && (
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 500,
                color: 'var(--color-ocean-blue)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Filter size={13} /> {activeFilterCount} Active
            </span>
          )}
          <SecondaryButton size="sm" icon={<RotateCcw size={14} />} onClick={onReset}>
            Reset
          </SecondaryButton>
        </div>
      )}
    </div>
  );
};
