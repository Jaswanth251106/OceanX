import React from 'react';
import { OceanVisualization } from '../../ocean3d/OceanVisualization';

export const ExplorePage: React.FC = () => {
  return (
    <div
      style={{
        position: 'fixed',
        top: '64px',
        left: 0,
        right: 0,
        bottom: 0,
        margin: 0,
        padding: 0,
        overflow: 'hidden',
        background: '#0B1D33',
      }}
    >
      <OceanVisualization />
    </div>
  );
};
