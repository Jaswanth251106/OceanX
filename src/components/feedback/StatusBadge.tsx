import React from 'react';

export type StatusVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral' | 'active' | 'calibrated';

export interface StatusBadgeProps {
  status?: string;
  variant?: StatusVariant;
  label: string;
  showDot?: boolean;
  size?: 'sm' | 'md';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({
  variant = 'info',
  label,
  showDot = true,
  size = 'md',
}) => {
  const getColors = (): { bg: string; text: string; dot: string; border: string } => {
    switch (variant) {
      case 'success':
      case 'calibrated':
      case 'active':
        return {
          bg: 'var(--color-success-bg)',
          text: 'var(--color-success)',
          dot: 'var(--color-success)',
          border: 'var(--color-success-border)',
        };
      case 'warning':
        return {
          bg: 'var(--color-warning-bg)',
          text: 'var(--color-warning)',
          dot: 'var(--color-warning)',
          border: 'var(--color-warning-border)',
        };
      case 'danger':
        return {
          bg: 'var(--color-danger-bg)',
          text: 'var(--color-danger)',
          dot: 'var(--color-danger)',
          border: 'var(--color-danger-border)',
        };
      case 'info':
        return {
          bg: 'var(--color-info-bg)',
          text: 'var(--color-info)',
          dot: 'var(--color-info)',
          border: 'var(--color-info-border)',
        };
      case 'neutral':
      default:
        return {
          bg: 'var(--color-bg-subtle)',
          text: 'var(--color-text-secondary)',
          dot: 'var(--color-text-muted)',
          border: 'var(--color-border)',
        };
    }
  };

  const colors = getColors();
  const isSm = size === 'sm';

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: isSm ? '2px 8px' : '4px 10px',
        borderRadius: 'var(--radius-full)',
        backgroundColor: colors.bg,
        color: colors.text,
        border: `1px solid ${colors.border}`,
        fontSize: isSm ? 'var(--font-size-xs)' : '0.813rem',
        fontWeight: 500,
        lineHeight: 1,
        whiteSpace: 'nowrap',
      }}
    >
      {showDot && (
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: colors.dot,
            display: 'inline-block',
          }}
        />
      )}
      {label}
    </span>
  );
};
