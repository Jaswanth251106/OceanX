import React from 'react';

export interface ProgressBarProps {
  value: number; // 0 - 100
  max?: number;
  label?: string;
  helperText?: string;
  variant?: 'primary' | 'success' | 'warning' | 'danger';
  height?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  label,
  helperText,
  variant = 'primary',
  height = 8,
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));

  const getColor = (): string => {
    switch (variant) {
      case 'success':
        return 'var(--color-success)';
      case 'warning':
        return 'var(--color-warning)';
      case 'danger':
        return 'var(--color-danger)';
      case 'primary':
      default:
        return 'var(--color-ocean-blue)';
    }
  };

  return (
    <div style={{ width: '100%' }}>
      {(label || helperText) && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-1)',
            fontSize: 'var(--font-size-xs)',
          }}
        >
          {label && (
            <span style={{ fontWeight: 500, color: 'var(--color-text-primary)' }}>
              {label}
            </span>
          )}
          {helperText && (
            <span style={{ color: 'var(--color-text-muted)' }}>
              {helperText}
            </span>
          )}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height: `${height}px`,
          backgroundColor: 'var(--color-border-subtle)',
          borderRadius: 'var(--radius-full)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: getColor(),
            borderRadius: 'var(--radius-full)',
            transition: 'width 300ms ease-in-out',
          }}
        />
      </div>
    </div>
  );
};
