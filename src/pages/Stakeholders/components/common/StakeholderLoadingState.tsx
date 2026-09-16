import React from 'react';

interface StakeholderLoadingStateProps {
  message?: string;
  subtext?: string;
}

export const StakeholderLoadingState: React.FC<StakeholderLoadingStateProps> = ({
  message = 'Loading stakeholder data...',
  subtext = 'Connecting to Render backend telemetry...',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '48px 24px',
        background: 'var(--color-bg-card, #FFFFFF)',
        border: '1px solid var(--color-border, #D5E5EF)',
        borderRadius: '8px',
        gap: '12px',
        minHeight: '220px',
        width: '100%',
      }}
      role="status"
      aria-live="polite"
    >
      <div
        style={{
          width: '32px',
          height: '32px',
          border: '3px solid var(--color-border, #E2E8F0)',
          borderTopColor: 'var(--color-ocean-blue, #087FEA)',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <div style={{ textAlign: 'center' }}>
        <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-text-primary, #0B2A4A)' }}>
          {message}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary, #58708A)', marginTop: '4px' }}>
          {subtext}
        </div>
      </div>
    </div>
  );
};

export default StakeholderLoadingState;
