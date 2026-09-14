import React from 'react';

export interface MetricItem {
  label: string;
  value: string | number;
  unit?: string;
  subtext?: string;
}

export interface MetricCardProps {
  title: string;
  category?: string;
  metrics: MetricItem[];
  icon?: React.ReactNode;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  title,
  category,
  metrics,
  icon,
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        <div>
          {category && (
            <span
              style={{
                display: 'block',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--color-ocean-blue)',
                marginBottom: '2px',
              }}
            >
              {category}
            </span>
          )}
          <h4
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            {title}
          </h4>
        </div>
        {icon && (
          <div
            style={{
              color: 'var(--color-text-secondary)',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            {icon}
          </div>
        )}
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(metrics.length, 3)}, 1fr)`,
          gap: 'var(--space-3)',
        }}
      >
        {metrics.map((m, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-secondary)',
                marginBottom: '4px',
              }}
            >
              {m.label}
            </span>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: '4px' }}>
              <span
                style={{
                  fontSize: 'var(--font-size-lg)',
                  fontWeight: 700,
                  color: 'var(--color-text-primary)',
                }}
              >
                {m.value}
              </span>
              {m.unit && (
                <span
                  style={{
                    fontSize: 'var(--font-size-xs)',
                    color: 'var(--color-text-muted)',
                  }}
                >
                  {m.unit}
                </span>
              )}
            </div>
            {m.subtext && (
              <span
                style={{
                  fontSize: '0.7rem',
                  color: 'var(--color-text-muted)',
                  marginTop: '2px',
                }}
              >
                {m.subtext}
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
