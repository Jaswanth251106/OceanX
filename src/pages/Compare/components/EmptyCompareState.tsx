import React from 'react';
import { PlatformType, RegionOption } from '../../../types/comparison';
import { MousePointerClick, Database } from 'lucide-react';

interface Props {
  platform: PlatformType;
  region: RegionOption;
}

export const EmptyCompareState: React.FC<Props> = ({ platform, region }) => {
  return (
    <div
      style={{
        flex: 1,
        background: '#FFFFFF',
        border: '1px stroke var(--color-border, #D5E5EF)',
        borderRadius: '12px',
        padding: '4rem 2rem',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '1rem',
        boxShadow: '0 4px 16px rgba(8, 127, 234, 0.04)',
      }}
    >
      <div
        style={{
          width: 64,
          height: 64,
          borderRadius: '50%',
          backgroundColor: 'var(--color-sky-blue, #EAF6FF)',
          color: 'var(--color-ocean-blue, #087FEA)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <MousePointerClick size={28} />
      </div>

      <div style={{ maxWidth: '440px' }}>
        <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--color-primary-navy, #0B3B66)', marginBottom: '0.4rem' }}>
          Select an {platform} Dataset to Compare
        </h3>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary, #58708A)', lineHeight: 1.5 }}>
          Choose an observation dataset from the left filter panel to run model vs in-situ comparison for the <strong>{region}</strong>.
        </p>
      </div>

      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 14px',
          borderRadius: '20px',
          backgroundColor: '#F3F9FC',
          border: '1px solid #D5E5EF',
          fontSize: '0.78rem',
          color: '#58708A',
          fontWeight: 600,
        }}
      >
        <Database size={14} color="#087FEA" />
        Awaiting dataset selection for future API data binding
      </div>
    </div>
  );
};
