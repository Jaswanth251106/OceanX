import React from 'react';
import { SectionCard } from './SectionCard';
import { Info, Check } from 'lucide-react';

export const AboutSettings: React.FC = () => {
  return (
    <SectionCard icon={<Info size={18} />} title="About OCEANX" description="Application metadata, system versioning, and environment details.">
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1rem',
          backgroundColor: 'var(--color-bg-subtle, #EAF6FF)',
          padding: '1.2rem',
          borderRadius: '10px',
          border: '1px solid var(--color-border, #D5E5EF)',
        }}
      >
        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted, #8AA1B9)', fontWeight: 700, textTransform: 'uppercase' }}>
            Application
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-text-primary, #0B2A4A)', marginTop: '2px' }}>
            OCEANX
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary, #58708A)' }}>
            3D Ocean Explorer
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted, #8AA1B9)', fontWeight: 700, textTransform: 'uppercase' }}>
            Version
          </div>
          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--color-ocean-blue, #087FEA)', marginTop: '2px' }}>
            v1.0.0
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary, #58708A)' }}>
            Operational Release
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.72rem', color: 'var(--color-text-muted, #8AA1B9)', fontWeight: 700, textTransform: 'uppercase' }}>
            Engine Platform
          </div>
          <div style={{ fontSize: '0.95rem', fontWeight: 700, color: 'var(--color-text-primary, #0B2A4A)', marginTop: '2px' }}>
            React + TypeScript + Vite
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-success, #0E9F9A)', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}>
            <Check size={12} /> Live Deployed
          </div>
        </div>
      </div>
    </SectionCard>
  );
};
