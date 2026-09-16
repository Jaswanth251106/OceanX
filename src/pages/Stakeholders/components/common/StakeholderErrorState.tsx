import React from 'react';

interface StakeholderErrorStateProps {
  title?: string;
  endpoint?: string;
  error?: string;
  onRetry?: () => void;
}

export const StakeholderErrorState: React.FC<StakeholderErrorStateProps> = ({
  title = 'Stakeholder data unavailable',
  endpoint,
  error,
  onRetry,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '36px 24px',
        background: '#FFF8F8',
        border: '1px solid #FCA5A5',
        borderRadius: '8px',
        gap: '14px',
        textAlign: 'center',
        width: '100%',
        margin: '12px 0',
      }}
      role="alert"
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: '50%',
          background: '#FEE2E2',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#DC2626',
          fontSize: '20px',
          fontWeight: 800,
        }}
      >
        !
      </div>

      <div>
        <h3 style={{ fontSize: '15px', fontWeight: 700, color: '#991B1B', margin: '0 0 6px 0' }}>
          {title}
        </h3>
        <p style={{ fontSize: '12.5px', color: '#7F1D1D', margin: 0, maxWidth: '560px', lineHeight: '1.5' }}>
          The backend service could not provide live ocean telemetry for this stakeholder view.
          {error && <span style={{ display: 'block', marginTop: '4px', opacity: 0.9 }}>Details: {error}</span>}
          {endpoint && <span style={{ display: 'block', fontSize: '11px', color: '#991B1B', marginTop: '4px', fontFamily: 'monospace' }}>Endpoint: {endpoint}</span>}
        </p>
      </div>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            background: 'var(--color-primary-navy, #0B3B66)',
            color: '#FFFFFF',
            border: 'none',
            borderRadius: '6px',
            padding: '8px 18px',
            fontSize: '12px',
            fontWeight: 600,
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            transition: 'opacity 150ms ease',
          }}
          onMouseOver={(e) => (e.currentTarget.style.opacity = '0.9')}
          onMouseOut={(e) => (e.currentTarget.style.opacity = '1')}
        >
          <span>↻</span>
          <span>Retry Connection</span>
        </button>
      )}
    </div>
  );
};

export default StakeholderErrorState;
