import React from 'react';
import { AlertTriangle, AlertCircle, Info, CheckCircle2, X } from 'lucide-react';

export type AlertSeverity = 'info' | 'warning' | 'danger' | 'success';

export interface AlertCardProps {
  title: string;
  description: string;
  severity?: AlertSeverity;
  regionOrMeta?: string;
  timestamp?: string;
  onDismiss?: () => void;
  action?: React.ReactNode;
}

export const AlertCard: React.FC<AlertCardProps> = ({
  title,
  description,
  severity = 'info',
  regionOrMeta,
  timestamp,
  onDismiss,
  action,
}) => {
  const getTheme = () => {
    switch (severity) {
      case 'warning':
        return {
          bg: 'var(--color-warning-bg)',
          border: 'var(--color-warning-border)',
          color: 'var(--color-warning)',
          Icon: AlertTriangle,
        };
      case 'danger':
        return {
          bg: 'var(--color-danger-bg)',
          border: 'var(--color-danger-border)',
          color: 'var(--color-danger)',
          Icon: AlertCircle,
        };
      case 'success':
        return {
          bg: 'var(--color-success-bg)',
          border: 'var(--color-success-border)',
          color: 'var(--color-success)',
          Icon: CheckCircle2,
        };
      case 'info':
      default:
        return {
          bg: 'var(--color-info-bg)',
          border: 'var(--color-info-border)',
          color: 'var(--color-info)',
          Icon: Info,
        };
    }
  };

  const { bg, border, color, Icon } = getTheme();

  return (
    <div
      style={{
        backgroundColor: bg,
        border: `1px solid ${border}`,
        borderRadius: 'var(--radius-md)',
        padding: 'var(--space-4)',
        display: 'flex',
        gap: 'var(--space-3)',
        alignItems: 'flex-start',
        position: 'relative',
      }}
    >
      <div style={{ color, flexShrink: 0, marginTop: '2px' }}>
        <Icon size={20} />
      </div>

      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '8px' }}>
          <h4
            style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </h4>
          {timestamp && (
            <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)', flexShrink: 0 }}>
              {timestamp}
            </span>
          )}
        </div>

        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            marginTop: '4px',
            lineHeight: 1.4,
          }}
        >
          {description}
        </p>

        {(regionOrMeta || action) && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: 'var(--space-3)',
            }}
          >
            {regionOrMeta && (
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 500,
                  color: 'var(--color-text-primary)',
                  backgroundColor: 'rgba(255, 255, 255, 0.6)',
                  padding: '2px 8px',
                  borderRadius: 'var(--radius-sm)',
                }}
              >
                📍 {regionOrMeta}
              </span>
            )}
            {action && <div>{action}</div>}
          </div>
        )}
      </div>

      {onDismiss && (
        <button
          onClick={onDismiss}
          style={{
            color: 'var(--color-text-muted)',
            cursor: 'pointer',
            padding: '2px',
            marginLeft: 'auto',
          }}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};
