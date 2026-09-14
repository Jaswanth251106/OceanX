import React from 'react';
import { SystemDataComponentStatus } from '../../../types/dashboard';
import { StatusBadge } from '../../../components/feedback/StatusBadge';
import { ProgressBar } from '../../../components/feedback/ProgressBar';
import { Activity, Anchor, Waves, Satellite, Cpu } from 'lucide-react';

export interface SystemDataStatusGridProps {
  items: SystemDataComponentStatus[];
}

export const SystemDataStatusGrid: React.FC<SystemDataStatusGridProps> = ({ items }) => {
  const getIcon = (type: SystemDataComponentStatus['iconType']) => {
    switch (type) {
      case 'argo':
        return <Activity size={18} color="var(--color-ocean-blue)" />;
      case 'buoy':
        return <Anchor size={18} color="var(--color-ocean-blue)" />;
      case 'tide':
        return <Waves size={18} color="var(--color-ocean-blue)" />;
      case 'satellite':
        return <Satellite size={18} color="var(--color-ocean-blue)" />;
      case 'model':
        return <Cpu size={18} color="var(--color-ocean-blue)" />;
    }
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
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        <div>
          <h3
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            System & Data Status
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Telemetry feed reliability, array coverage, and operational run cadence
          </p>
        </div>
        <StatusBadge label="All Systems Operational" variant="success" size="sm" />
      </div>

      {/* Component status list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '10px 12px',
              backgroundColor: 'var(--color-bg-page)',
              borderRadius: 'var(--radius-md)',
              border: '1px solid var(--color-border-subtle)',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--radius-sm)',
                    backgroundColor: 'var(--color-light-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {getIcon(item.iconType)}
                </div>
                <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {item.name}
                </span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                {item.latestRun && (
                  <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
                    Latest Run: {item.latestRun}
                  </span>
                )}
                <StatusBadge label={item.status} variant="success" size="sm" />
              </div>
            </div>

            {item.coveragePercent !== undefined && (
              <div style={{ marginTop: '2px' }}>
                <ProgressBar
                  value={item.coveragePercent}
                  helperText={`Coverage: ${item.coveragePercent}%`}
                  variant={item.coveragePercent >= 95 ? 'success' : 'primary'}
                  height={6}
                />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};
