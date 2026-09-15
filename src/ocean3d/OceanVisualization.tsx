import React from 'react';
import './ocean3d.css';

import { OceanViewport } from './components/explorer/OceanViewport';

export const OceanVisualization: React.FC = () => {
  return (
    <div
      className="ocean3d-root"
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <OceanViewport />
    </div>
  );
};
