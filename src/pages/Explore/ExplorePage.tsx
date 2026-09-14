import React from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { Compass, Box } from 'lucide-react';

/**
 * Explore Module Placeholder
 * 
 * IMPORTANT:
 * This module is exclusively reserved for the 3D Visualization team.
 * The teammate will integrate React Three Fiber + Three.js + WebGL
 * here without modifying or breaking any other application routes.
 */
export const ExplorePage: React.FC = () => {
  return (
    <div>
      <PageHeader
        title="Explore Module"
        subtitle="Interactive spatial-temporal 3D ocean visualization and depth layer analysis."
        badge={<StatusBadge label="Visualization Team Handoff" variant="info" />}
      />

      <div
        style={{
          backgroundColor: 'var(--color-bg-card)',
          borderRadius: 'var(--radius-lg)',
          border: '2px dashed var(--color-ocean-blue)',
          padding: 'var(--space-10) var(--space-6)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          textAlign: 'center',
          minHeight: '480px',
          boxShadow: 'var(--shadow-card)',
        }}
      >
        <div
          style={{
            width: '72px',
            height: '72px',
            borderRadius: '50%',
            backgroundColor: 'var(--color-light-blue)',
            color: 'var(--color-ocean-blue)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginBottom: 'var(--space-4)',
          }}
        >
          <Compass size={36} />
        </div>

        <h2
          style={{
            fontSize: 'var(--font-size-xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            marginBottom: 'var(--space-2)',
          }}
        >
          Explore Module
        </h2>

        <p
          style={{
            fontSize: 'var(--font-size-md)',
            color: 'var(--color-ocean-blue)',
            fontWeight: 600,
            marginBottom: 'var(--space-4)',
          }}
        >
          This module will be integrated by the visualization team.
        </p>

        <p
          style={{
            fontSize: 'var(--font-size-sm)',
            color: 'var(--color-text-secondary)',
            maxWidth: '540px',
            lineHeight: 1.6,
            marginBottom: 'var(--space-6)',
          }}
        >
          The 3D Globe, ocean bathymetry, current streamline particle fields, and vertical CTD depth transects
          will be mounted directly in this isolated container using React Three Fiber and Three.js.
        </p>

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 16px',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--color-bg-subtle)',
            color: 'var(--color-text-secondary)',
            fontSize: 'var(--font-size-xs)',
            fontFamily: 'var(--font-family-mono)',
          }}
        >
          <Box size={14} />
          <span>Mount target: src/pages/Explore/ExplorePage.tsx</span>
        </div>
      </div>
    </div>
  );
};
