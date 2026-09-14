import React from 'react';
import { Loader2 } from 'lucide-react';

export interface LoadingStateProps {
  message?: string;
  minHeight?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({
  message = 'Loading telemetry and oceanographic data...',
  minHeight = '200px',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight,
        gap: 'var(--space-3)',
        color: 'var(--color-text-secondary)',
      }}
    >
      <Loader2
        size={28}
        style={{
          color: 'var(--color-ocean-blue)',
          animation: 'spin 1s linear infinite',
        }}
      />
      <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 500 }}>
        {message}
      </span>
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
