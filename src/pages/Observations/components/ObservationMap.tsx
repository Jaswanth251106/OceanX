import React from 'react';
import { OceanObservationRecord, InstrumentType } from '../../../types/observation';

export interface ObservationMapProps {
  observations: OceanObservationRecord[];
  selectedObservationId?: string;
  onSelectObservation: (obs: OceanObservationRecord) => void;
}

export const ObservationMap: React.FC<ObservationMapProps> = ({
  observations,
  selectedObservationId,
  onSelectObservation,
}) => {
  // Coordinate projection from geographical (Lat, Lon) to SVG coordinate space
  // Lon: 55°E to 95°E (width 700)
  // Lat: 25°N to -30°S (height 440)
  const project = (lat: number, lon: number): { x: number; y: number } => {
    const minLon = 55;
    const maxLon = 95;
    const maxLat = 25;
    const minLat = -30;

    const x = ((lon - minLon) / (maxLon - minLon)) * 700;
    const y = ((maxLat - lat) / (maxLat - minLat)) * 440;
    return {
      x: Math.max(15, Math.min(685, x)),
      y: Math.max(15, Math.min(425, y)),
    };
  };

  const getMarkerColor = (status: OceanObservationRecord['status']) => {
    switch (status) {
      case 'warning':
        return '#F59E0B';
      case 'inactive':
        return '#94A3B8';
      case 'active':
      default:
        return '#087FEA';
    }
  };

  const renderMarkerShape = (type: InstrumentType, color: string, isSelected: boolean) => {
    const strokeColor = isSelected ? '#0B2A4A' : '#FFFFFF';
    const strokeW = isSelected ? 2.5 : 1.5;

    switch (type) {
      case 'argo-float':
        // Profiling circle with inner core
        return (
          <g>
            <circle cx="0" cy="0" r="7" fill={color} stroke={strokeColor} strokeWidth={strokeW} />
            <circle cx="0" cy="0" r="2.5" fill="#FFFFFF" />
          </g>
        );
      case 'moored-buoy':
        // Diamond shape
        return (
          <polygon
            points="0,-8 8,0 0,8 -8,0"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeW}
          />
        );
      case 'wave-rider-buoy':
        // Concentric wave ring
        return (
          <g>
            <circle cx="0" cy="0" r="8" fill="none" stroke={color} strokeWidth="2.5" />
            <circle cx="0" cy="0" r="4" fill={color} stroke={strokeColor} strokeWidth={strokeW} />
          </g>
        );
      case 'tide-gauge':
        // Square station marker
        return (
          <rect
            x="-6"
            y="-6"
            width="12"
            height="12"
            rx="2"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeW}
          />
        );
      case 'ship-observation':
      default:
        // Triangle vessel marker
        return (
          <polygon
            points="0,-8 7,6 -7,6"
            fill={color}
            stroke={strokeColor}
            strokeWidth={strokeW}
          />
        );
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Map Control Bar */}
      <div
        style={{
          padding: 'var(--space-3) var(--space-5)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Indian Ocean Basin Observations Map
          </span>
          <span
            style={{
              fontSize: 'var(--font-size-xs)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-full)',
              backgroundColor: 'var(--color-light-blue)',
              color: 'var(--color-ocean-blue)',
              fontWeight: 600,
            }}
          >
            {observations.length} Platforms Displayed
          </span>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            gap: '14px',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', backgroundColor: '#087FEA', display: 'inline-block' }} />
            <span>ARGO Float</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', transform: 'rotate(45deg)', backgroundColor: '#087FEA', display: 'inline-block' }} />
            <span>Moored Buoy</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', borderRadius: '50%', border: '2px solid #087FEA', display: 'inline-block' }} />
            <span>Wave Rider</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '9px', height: '9px', backgroundColor: '#087FEA', display: 'inline-block', borderRadius: '2px' }} />
            <span>Tide Gauge</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <span style={{ width: '0', height: '0', borderLeft: '5px solid transparent', borderRight: '5px solid transparent', borderBottom: '9px solid #087FEA', display: 'inline-block' }} />
            <span>Ship</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', borderLeft: '1px solid var(--color-border)', paddingLeft: '10px' }}>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#22A06B', display: 'inline-block' }} />
              Active
            </span>
            <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#F59E0B', display: 'inline-block' }} />
              Warning
            </span>
          </div>
        </div>
      </div>

      {/* SVG Canvas */}
      <div
        style={{
          position: 'relative',
          backgroundColor: '#F0F6FC',
          width: '100%',
          height: '420px',
          overflow: 'hidden',
        }}
      >
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 700 440"
          preserveAspectRatio="xMidYMid meet"
          style={{ width: '100%', height: '100%', display: 'block' }}
        >
          <defs>
            <pattern id="obsGrid" width="50" height="40" patternUnits="userSpaceOnUse">
              <path d="M 50 0 L 0 0 0 40" fill="none" stroke="#DCE8F5" strokeWidth="0.8" strokeDasharray="3,3" />
            </pattern>
            <linearGradient id="obsWater" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#EAF4FD" />
              <stop offset="100%" stopColor="#D8EAFC" />
            </linearGradient>
            <filter id="markerShadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="1.5" stdDeviation="1.5" floodColor="#0B2A4A" floodOpacity="0.25" />
            </filter>
          </defs>

          {/* Background Ocean & Grid */}
          <rect width="700" height="440" fill="url(#obsWater)" />
          <rect width="700" height="440" fill="url(#obsGrid)" />

          {/* Bathymetric depth contours */}
          <path d="M 120 120 Q 240 210 390 220 T 640 180" fill="none" stroke="#C8DCF0" strokeWidth="1.2" />
          <path d="M 100 240 Q 300 290 620 260" fill="none" stroke="#C8DCF0" strokeWidth="1.2" />
          <path d="M 160 360 Q 380 390 600 370" fill="none" stroke="#C8DCF0" strokeWidth="1.2" />

          {/* Latitude Lines & Labels */}
          <text x="12" y="24" fill="#8FA4BC" fontSize="10" fontFamily="monospace">20°N</text>
          <line x1="45" y1="20" x2="690" y2="20" stroke="#E2ECF7" strokeWidth="1" strokeDasharray="4,4" />

          <text x="12" y="104" fill="#8FA4BC" fontSize="10" fontFamily="monospace">10°N</text>
          <line x1="45" y1="100" x2="690" y2="100" stroke="#E2ECF7" strokeWidth="1" strokeDasharray="4,4" />

          <text x="12" y="184" fill="#8FA4BC" fontSize="10" fontFamily="monospace">0° (Equator)</text>
          <line x1="85" y1="180" x2="690" y2="180" stroke="#BED6ED" strokeWidth="1.2" />

          <text x="12" y="264" fill="#8FA4BC" fontSize="10" fontFamily="monospace">10°S</text>
          <line x1="45" y1="260" x2="690" y2="260" stroke="#E2ECF7" strokeWidth="1" strokeDasharray="4,4" />

          <text x="12" y="344" fill="#8FA4BC" fontSize="10" fontFamily="monospace">20°S</text>
          <line x1="45" y1="340" x2="690" y2="340" stroke="#E2ECF7" strokeWidth="1" strokeDasharray="4,4" />

          {/* Longitude Labels */}
          <text x="175" y="432" fill="#8FA4BC" fontSize="10" fontFamily="monospace">65°E</text>
          <text x="350" y="432" fill="#8FA4BC" fontSize="10" fontFamily="monospace">75°E</text>
          <text x="525" y="432" fill="#8FA4BC" fontSize="10" fontFamily="monospace">85°E</text>

          {/* Continental & Island Landmasses */}
          {/* Indian Subcontinent */}
          <path
            d="M 230 0 L 260 20 L 290 35 L 320 65 L 345 95 L 375 125 L 395 137 L 415 125 L 438 98 L 470 70 L 520 40 L 570 20 L 590 0 Z"
            fill="#D1DFEE"
            stroke="#B5CCE4"
            strokeWidth="1.5"
          />
          {/* Sri Lanka */}
          <ellipse cx="435" cy="148" rx="10" ry="16" fill="#D1DFEE" stroke="#B5CCE4" strokeWidth="1.2" />

          {/* Maldives Chain (simplified atoll dots) */}
          <circle cx="318" cy="165" r="3" fill="#B5CCE4" />
          <circle cx="320" cy="180" r="3" fill="#B5CCE4" />
          <circle cx="322" cy="195" r="3" fill="#B5CCE4" />
          <circle cx="324" cy="210" r="2.5" fill="#B5CCE4" />

          {/* Horn of Africa Hint (Left) */}
          <path
            d="M 0 0 L 50 15 L 90 50 L 105 95 L 85 140 L 50 180 L 10 220 L 0 240 Z"
            fill="#D1DFEE"
            stroke="#B5CCE4"
            strokeWidth="1.5"
          />

          {/* Myanmar & Andaman Coast (Right) */}
          <path
            d="M 590 0 L 600 50 L 615 110 L 630 160 L 650 200 L 700 220 L 700 0 Z"
            fill="#D1DFEE"
            stroke="#B5CCE4"
            strokeWidth="1.5"
          />
          {/* Andaman & Nicobar Islands */}
          <ellipse cx="612" cy="115" rx="3.5" ry="14" fill="#B5CCE4" />
          <ellipse cx="622" cy="148" rx="3" ry="9" fill="#B5CCE4" />

          {/* Region Text Labels */}
          <text x="175" y="110" fill="#6A85A3" fontSize="13" fontWeight="700" letterSpacing="0.04em">
            ARABIAN SEA
          </text>
          <text x="475" y="105" fill="#6A85A3" fontSize="13" fontWeight="700" letterSpacing="0.04em">
            BAY OF BENGAL
          </text>
          <text x="275" y="215" fill="#6A85A3" fontSize="12" fontWeight="700" letterSpacing="0.04em">
            EQUATORIAL INDIAN OCEAN
          </text>
          <text x="285" y="360" fill="#6A85A3" fontSize="12" fontWeight="700" letterSpacing="0.04em">
            SOUTHERN INDIAN OCEAN
          </text>

          {/* Observation Markers */}
          {observations.map((obs) => {
            const { x, y } = project(obs.coordinates.latitude, obs.coordinates.longitude);
            const isSelected = obs.id === selectedObservationId || obs.instrumentId === selectedObservationId;
            const color = getMarkerColor(obs.status);

            return (
              <g
                key={obs.id}
                transform={`translate(${x}, ${y})`}
                onClick={() => onSelectObservation(obs)}
                style={{ cursor: 'pointer' }}
                filter="url(#markerShadow)"
              >
                {/* Highlight ring if selected */}
                {isSelected && (
                  <circle
                    cx="0"
                    cy="0"
                    r="15"
                    fill="none"
                    stroke="#087FEA"
                    strokeWidth="2"
                    strokeDasharray="3,3"
                    opacity="0.9"
                  >
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      from="0"
                      to="360"
                      dur="8s"
                      repeatCount="indefinite"
                    />
                  </circle>
                )}

                {/* Marker body */}
                {renderMarkerShape(obs.type, color, isSelected)}

                {/* Interactive hover / label */}
                <title>
                  {`${obs.name} (${obs.platform})\nStatus: ${obs.status}\nLat: ${obs.coordinates.latitude}°, Lon: ${obs.coordinates.longitude}°\nDepth: ${obs.depthMeters}m | SST: ${obs.parameters.seaSurfaceTemperatureCelsius}°C`}
                </title>

                {/* Compact ID tag beneath marker */}
                <rect
                  x="-28"
                  y="10"
                  width="56"
                  height="14"
                  rx="3"
                  fill={isSelected ? '#0B2A4A' : 'rgba(255, 255, 255, 0.88)'}
                  stroke={isSelected ? '#087FEA' : '#DCE5EF'}
                  strokeWidth="0.8"
                />
                <text
                  x="0"
                  y="20"
                  textAnchor="middle"
                  fill={isSelected ? '#FFFFFF' : '#102A43'}
                  fontSize="8.5"
                  fontWeight="600"
                  fontFamily="monospace"
                >
                  {obs.instrumentId.replace('IN2026-', '#')}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
    </div>
  );
};
