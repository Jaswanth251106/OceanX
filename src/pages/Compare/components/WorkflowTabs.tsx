import React from 'react';
import { PlatformType } from '../../../types/comparison';
import { Waves, Navigation } from 'lucide-react';

interface Props {
  activePlatform: PlatformType;
  onSelectPlatform: (platform: PlatformType) => void;
}

export const WorkflowTabs: React.FC<Props> = ({ activePlatform, onSelectPlatform }) => {
  return (
    <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.5rem' }}>
      <button
        onClick={() => onSelectPlatform('ARGO')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.7rem 1.4rem',
          borderRadius: '10px',
          border: '1px solid',
          borderColor: activePlatform === 'ARGO' ? 'var(--color-ocean-blue, #087FEA)' : 'var(--color-border, #D5E5EF)',
          backgroundColor: activePlatform === 'ARGO' ? '#087FEA' : '#FFFFFF',
          color: activePlatform === 'ARGO' ? '#FFFFFF' : 'var(--color-text-primary, #0B2A4A)',
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: activePlatform === 'ARGO' ? '0 4px 12px rgba(8, 127, 234, 0.25)' : 'none',
        }}
      >
        <Waves size={18} />
        ARGO Float Comparison
      </button>

      <button
        onClick={() => onSelectPlatform('GLIDER')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          padding: '0.7rem 1.4rem',
          borderRadius: '10px',
          border: '1px solid',
          borderColor: activePlatform === 'GLIDER' ? 'var(--color-marine-teal, #0E9F9A)' : 'var(--color-border, #D5E5EF)',
          backgroundColor: activePlatform === 'GLIDER' ? '#0E9F9A' : '#FFFFFF',
          color: activePlatform === 'GLIDER' ? '#FFFFFF' : 'var(--color-text-primary, #0B2A4A)',
          fontWeight: 700,
          fontSize: '0.9rem',
          cursor: 'pointer',
          transition: 'all 0.2s ease',
          boxShadow: activePlatform === 'GLIDER' ? '0 4px 12px rgba(14, 159, 154, 0.25)' : 'none',
        }}
      >
        <Navigation size={18} />
        Glider Comparison
      </button>
    </div>
  );
};
