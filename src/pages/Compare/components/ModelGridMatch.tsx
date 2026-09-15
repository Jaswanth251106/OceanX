import React from 'react';
import { ModelGridInfo } from '../../../types/comparison';

interface Props {
  gridInfo: ModelGridInfo;
}

export const ModelGridMatch: React.FC<Props> = ({ gridInfo }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1rem 1.1rem',
        flex: 1,
        minWidth: 220,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Spatial Match Visualization
      </div>

      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ position: 'relative', width: 140, height: 140 }}>
          {/* Grid Background */}
          <svg width="100%" height="100%" viewBox="0 0 100 100">
            {/* Grid lines */}
            <path d="M0 33 L100 33 M0 66 L100 66" stroke="#DCE5EF" strokeWidth="1" />
            <path d="M33 0 L33 100 M66 0 L66 100" stroke="#DCE5EF" strokeWidth="1" />
            
            {/* Central Model Grid Cell (highlighted) */}
            <rect x="33" y="33" width="34" height="34" fill="#087FEA20" stroke="#087FEA" strokeWidth="1.5" />
            
            {/* Model Center Point */}
            <circle cx="50" cy="50" r="3" fill="#087FEA" />
            
            {/* Observation Point (Offset from center) */}
            <circle cx="65" cy="40" r="3" fill="#22A06B" />
            
            {/* Distance Line */}
            <path d="M50 50 L65 40" stroke="#9CA3AF" strokeWidth="1" strokeDasharray="2 2" />
          </svg>

          {/* Labels */}
          <div style={{ position: 'absolute', top: -20, left: 0, right: 0, textAlign: 'center', fontSize: '0.65rem', color: '#5a7184', fontWeight: 600 }}>
            Model Cell: {gridInfo.resolution}
          </div>
          <div style={{ position: 'absolute', bottom: 15, right: -40, fontSize: '0.65rem', color: '#087FEA', fontWeight: 700 }}>
            Model
          </div>
          <div style={{ position: 'absolute', top: 20, right: -50, fontSize: '0.65rem', color: '#22A06B', fontWeight: 700 }}>
            Observation
          </div>
          <div style={{ position: 'absolute', top: 55, left: 60, fontSize: '0.65rem', color: '#5a7184', background: '#fff', padding: '0 2px' }}>
            {gridInfo.distanceKm.toFixed(1)}km
          </div>
        </div>
      </div>
      <div style={{ textAlign: 'center', fontSize: '0.75rem', color: '#5a7184', marginTop: '1rem' }}>
        Nearest neighbour interpolation applied.
      </div>
    </div>
  );
};
