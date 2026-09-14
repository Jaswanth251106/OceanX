import React from 'react';
import { AlertBreakdownSummary } from '../../../types/dashboard';
import { AlertCard } from '../../../components/cards/AlertCard';
import { AlertTriangle, ShieldAlert } from 'lucide-react';

export interface AlertSummarySectionProps {
  summary: AlertBreakdownSummary;
}

export const AlertSummarySection: React.FC<AlertSummarySectionProps> = ({ summary }) => {
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
      }}
    >
      {/* Header with breakdown pill indicators */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '28px',
              height: '28px',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--color-warning-bg)',
              color: 'var(--color-warning)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ShieldAlert size={16} />
          </div>
          <div>
            <h3
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              Active Marine Advisories & Early Warnings
            </h3>
            <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
              Broadcasts synchronized with Indian Tsunami & Coastal State Early Warning Centres
            </p>
          </div>
        </div>

        {/* Breakdown badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-danger-bg)',
              color: 'var(--color-danger)',
              border: '1px solid var(--color-danger-border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <AlertTriangle size={12} />
            {summary.highPriority} High Priority
          </span>

          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-warning-bg)',
              color: 'var(--color-warning)',
              border: '1px solid var(--color-warning-border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
            }}
          >
            {summary.mediumPriority} Medium
          </span>

          <span
            style={{
              padding: '4px 10px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-info-bg)',
              color: 'var(--color-info)',
              border: '1px solid var(--color-info-border)',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 600,
            }}
          >
            {summary.informational} Info
          </span>
        </div>
      </div>

      {/* Alert items list */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {summary.alerts.map((alert) => (
          <AlertCard
            key={alert.id}
            title={alert.title}
            description={alert.description}
            severity={alert.priority === 'high' ? 'danger' : alert.priority === 'medium' ? 'warning' : 'info'}
            regionOrMeta={alert.region}
            timestamp={alert.timestamp}
          />
        ))}
      </div>
    </div>
  );
};
