import React, { useState } from 'react';
import { RegionalObservationSummary } from '../../../types/dashboard';
import { MapPin, Radio, Waves, Thermometer } from 'lucide-react';
import { StatusBadge } from '../../../components/feedback/StatusBadge';

export interface RegionalOverviewMapProps {
  regions: RegionalObservationSummary[];
  totalObservations: number;
}

export const RegionalOverviewMap: React.FC<RegionalOverviewMapProps> = ({
  regions,
  totalObservations,
}) => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('reg-bob');

  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

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
      {/* Header bar */}
      <div
        style={{
          padding: 'var(--space-4) var(--space-5)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <h3
              style={{
                fontSize: 'var(--font-size-base)',
                fontWeight: 600,
                color: 'var(--color-text-primary)',
              }}
            >
              Regional Ocean Overview
            </h3>
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
                backgroundColor: 'var(--color-light-blue)',
                color: 'var(--color-ocean-blue)',
              }}
            >
              2D Basin Telemetry
            </span>
          </div>
          <p
            style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--color-text-secondary)',
              marginTop: '2px',
            }}
          >
            Spatial coverage across {regions.length} sub-basins • {totalObservations.toLocaleString()} active telemetry points
          </p>
        </div>

        {/* Legend */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-secondary)',
            backgroundColor: 'var(--color-bg-page)',
            padding: '6px 12px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-ocean-blue)',
                display: 'inline-block',
              }}
            />
            <span>Observation</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-warning)',
                display: 'inline-block',
              }}
            />
            <span>Active Alert</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span
              style={{
                width: '8px',
                height: '8px',
                backgroundColor: 'var(--color-success)',
                display: 'inline-block',
                borderRadius: '2px',
              }}
            />
            <span>Monitoring Station</span>
          </div>
        </div>
      </div>

      {/* Main content: 2D Stylized Map Panel + Regional summary cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(320px, 1fr)',
          gap: 0,
          minHeight: '400px',
        }}
      >
        {/* Left side: Stylized 2D Scientific Vector Map Panel */}
        <div
          style={{
            position: 'relative',
            backgroundColor: '#F0F6FC',
            borderRight: '1px solid var(--color-border)',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '380px',
          }}
        >
          {/* Subtle ocean grid lines */}
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 600 400"
            style={{ width: '100%', height: '100%', display: 'block' }}
          >
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#D8E5F3" strokeWidth="0.8" strokeDasharray="3,3" />
              </pattern>
              <linearGradient id="oceanGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#EAF3FD" />
                <stop offset="100%" stopColor="#DCEBFA" />
              </linearGradient>
            </defs>

            {/* Ocean background */}
            <rect width="600" height="400" fill="url(#oceanGradient)" />
            <rect width="600" height="400" fill="url(#grid)" />

            {/* Coordinate grid labels */}
            <text x="15" y="30" fill="#8FA4BC" fontSize="10" fontFamily="monospace">20°N</text>
            <text x="15" y="150" fill="#8FA4BC" fontSize="10" fontFamily="monospace">10°N</text>
            <text x="15" y="260" fill="#8FA4BC" fontSize="10" fontFamily="monospace">0° (Equator)</text>
            <text x="15" y="370" fill="#8FA4BC" fontSize="10" fontFamily="monospace">15°S</text>

            <text x="120" y="390" fill="#8FA4BC" fontSize="10" fontFamily="monospace">60°E</text>
            <text x="270" y="390" fill="#8FA4BC" fontSize="10" fontFamily="monospace">75°E</text>
            <text x="430" y="390" fill="#8FA4BC" fontSize="10" fontFamily="monospace">90°E</text>

            {/* Stylized landmass silhouette (India, Arabian Peninsula, SE Asia hint) */}
            {/* Indian Peninsula */}
            <path
              d="M 230 10 L 250 60 L 265 95 L 285 140 L 295 185 L 285 210 L 275 195 L 260 160 L 235 110 L 210 90 L 190 70 L 180 10 Z"
              fill="#D1DFEE"
              stroke="#B5CCE4"
              strokeWidth="1.5"
            />
            {/* Sri Lanka */}
            <ellipse cx="308" cy="225" rx="9" ry="14" fill="#D1DFEE" stroke="#B5CCE4" strokeWidth="1.2" />

            {/* Horn of Africa / Arabian Peninsula hint on left */}
            <path
              d="M 10 10 L 70 30 L 110 70 L 100 120 L 70 160 L 50 200 L 10 240 Z"
              fill="#D1DFEE"
              stroke="#B5CCE4"
              strokeWidth="1.5"
            />

            {/* Myanmar / Andaman hint on right */}
            <path
              d="M 450 10 L 460 70 L 475 130 L 490 190 L 510 230 L 580 250 L 590 10 Z"
              fill="#D1DFEE"
              stroke="#B5CCE4"
              strokeWidth="1.5"
            />

            {/* Depth contours (subtle bathymetry curves) */}
            <path d="M 130 140 Q 200 230 290 260 T 450 220" fill="none" stroke="#C8DCF0" strokeWidth="1.2" />
            <path d="M 110 260 Q 250 310 490 290" fill="none" stroke="#C8DCF0" strokeWidth="1.2" />

            {/* Observation dots across the ocean */}
            {/* Arabian Sea cluster */}
            <circle cx="160" cy="110" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="190" cy="130" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="175" cy="165" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="215" cy="175" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="230" cy="135" r="3.5" fill="#087FEA" opacity="0.85" />
            {/* Bay of Bengal cluster */}
            <circle cx="340" cy="105" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="380" cy="120" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="360" cy="150" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="410" cy="165" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="355" cy="190" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="430" cy="125" r="3.5" fill="#087FEA" opacity="0.85" />
            {/* Equatorial cluster */}
            <circle cx="240" cy="270" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="290" cy="265" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="330" cy="275" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="380" cy="285" r="3.5" fill="#087FEA" opacity="0.85" />
            {/* Southern Ocean cluster */}
            <circle cx="220" cy="340" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="280" cy="355" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="350" cy="350" r="3.5" fill="#087FEA" opacity="0.85" />
            <circle cx="410" cy="345" r="3.5" fill="#087FEA" opacity="0.85" />

            {/* Monitoring stations (green squares) */}
            <rect x="265" y="195" width="7" height="7" fill="#22A06B" rx="1.5" />
            <rect x="290" y="130" width="7" height="7" fill="#22A06B" rx="1.5" />
            <rect x="365" y="105" width="7" height="7" fill="#22A06B" rx="1.5" />
            <rect x="180" y="95" width="7" height="7" fill="#22A06B" rx="1.5" />

            {/* Active alerts (pulsing yellow/orange markers) */}
            {/* Alert in Arabian Sea */}
            <g transform="translate(180, 140)">
              <circle cx="0" cy="0" r="10" fill="#F59E0B" opacity="0.25">
                <animate attributeName="r" values="8;14;8" dur="2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="5" fill="#F59E0B" />
            </g>
            {/* Alert in Bay of Bengal */}
            <g transform="translate(385, 135)">
              <circle cx="0" cy="0" r="10" fill="#E5484D" opacity="0.25">
                <animate attributeName="r" values="8;14;8" dur="2.2s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0.1;0.3" dur="2.2s" repeatCount="indefinite" />
              </circle>
              <circle cx="0" cy="0" r="5" fill="#E5484D" />
            </g>

            {/* Region Interactive Targets & Labels */}
            {/* 1. Arabian Sea */}
            <g
              onClick={() => setSelectedRegionId('reg-as')}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x="120"
                y="95"
                width="110"
                height="32"
                rx="6"
                fill={selectedRegionId === 'reg-as' ? '#FFFFFF' : '#EAF4FF'}
                stroke={selectedRegionId === 'reg-as' ? '#087FEA' : '#BED9F8'}
                strokeWidth={selectedRegionId === 'reg-as' ? '2' : '1'}
                filter="drop-shadow(0 1px 3px rgba(11,42,74,0.1))"
              />
              <text x="130" y="112" fill="#0B2A4A" fontSize="11" fontWeight="700">Arabian Sea</text>
              <text x="130" y="123" fill="#64748B" fontSize="9">542 obs • 1 Alert</text>
            </g>

            {/* 2. Bay of Bengal */}
            <g
              onClick={() => setSelectedRegionId('reg-bob')}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x="345"
                y="85"
                width="115"
                height="32"
                rx="6"
                fill={selectedRegionId === 'reg-bob' ? '#FFFFFF' : '#EAF4FF'}
                stroke={selectedRegionId === 'reg-bob' ? '#087FEA' : '#BED9F8'}
                strokeWidth={selectedRegionId === 'reg-bob' ? '2' : '1'}
                filter="drop-shadow(0 1px 3px rgba(11,42,74,0.1))"
              />
              <text x="355" y="102" fill="#0B2A4A" fontSize="11" fontWeight="700">Bay of Bengal</text>
              <text x="355" y="113" fill="#64748B" fontSize="9">718 obs • 1 Alert</text>
            </g>

            {/* 3. Equatorial Indian Ocean */}
            <g
              onClick={() => setSelectedRegionId('reg-eio')}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x="220"
                y="245"
                width="160"
                height="32"
                rx="6"
                fill={selectedRegionId === 'reg-eio' ? '#FFFFFF' : '#EAF4FF'}
                stroke={selectedRegionId === 'reg-eio' ? '#087FEA' : '#BED9F8'}
                strokeWidth={selectedRegionId === 'reg-eio' ? '2' : '1'}
                filter="drop-shadow(0 1px 3px rgba(11,42,74,0.1))"
              />
              <text x="230" y="262" fill="#0B2A4A" fontSize="11" fontWeight="700">Equatorial Indian Ocean</text>
              <text x="230" y="273" fill="#64748B" fontSize="9">389 observations</text>
            </g>

            {/* 4. Southern Indian Ocean */}
            <g
              onClick={() => setSelectedRegionId('reg-sio')}
              style={{ cursor: 'pointer' }}
            >
              <rect
                x="225"
                y="325"
                width="150"
                height="32"
                rx="6"
                fill={selectedRegionId === 'reg-sio' ? '#FFFFFF' : '#EAF4FF'}
                stroke={selectedRegionId === 'reg-sio' ? '#087FEA' : '#BED9F8'}
                strokeWidth={selectedRegionId === 'reg-sio' ? '2' : '1'}
                filter="drop-shadow(0 1px 3px rgba(11,42,74,0.1))"
              />
              <text x="235" y="342" fill="#0B2A4A" fontSize="11" fontWeight="700">Southern Indian Ocean</text>
              <text x="235" y="353" fill="#64748B" fontSize="9">271 observations</text>
            </g>
          </svg>
        </div>

        {/* Right side: Interactive Regional summary cards & selected detail */}
        <div
          style={{
            padding: 'var(--space-4) var(--space-5)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: 'var(--space-4)',
            backgroundColor: '#FFFFFF',
          }}
        >
          {/* Quick list of all 4 regions */}
          <div>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                color: 'var(--color-text-muted)',
                marginBottom: 'var(--space-2)',
                display: 'block',
              }}
            >
              Select Monitored Basin
            </span>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {regions.map((reg) => {
                const isSelected = reg.id === selectedRegionId;
                return (
                  <div
                    key={reg.id}
                    onClick={() => setSelectedRegionId(reg.id)}
                    style={{
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-md)',
                      border: isSelected
                        ? '1.5px solid var(--color-ocean-blue)'
                        : '1px solid var(--color-border)',
                      backgroundColor: isSelected ? 'var(--color-light-blue)' : 'var(--color-bg-page)',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      transition: 'all var(--transition-fast)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin
                        size={15}
                        color={isSelected ? 'var(--color-ocean-blue)' : 'var(--color-text-secondary)'}
                      />
                      <span
                        style={{
                          fontSize: 'var(--font-size-sm)',
                          fontWeight: isSelected ? 600 : 500,
                          color: isSelected ? 'var(--color-ocean-blue)' : 'var(--color-text-primary)',
                        }}
                      >
                        {reg.name}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <span
                        style={{
                          fontSize: 'var(--font-size-xs)',
                          fontWeight: 600,
                          color: 'var(--color-text-secondary)',
                        }}
                      >
                        {reg.observationsCount} obs
                      </span>
                      {reg.activeAlertsCount > 0 && (
                        <span
                          style={{
                            width: '8px',
                            height: '8px',
                            borderRadius: '50%',
                            backgroundColor: 'var(--color-warning)',
                          }}
                          title={`${reg.activeAlertsCount} active alert`}
                        />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Selected Region Detailed Card */}
          <div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-bg-page)',
              border: '1px solid var(--color-border-subtle)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Radio size={14} color="var(--color-ocean-blue)" />
                <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                  {selectedRegion.name} Status
                </span>
              </div>
              {selectedRegion.activeAlertsCount > 0 ? (
                <StatusBadge label={`${selectedRegion.activeAlertsCount} Alert`} variant="warning" size="sm" />
              ) : (
                <StatusBadge label="Nominal" variant="success" size="sm" />
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Thermometer size={16} color="var(--color-text-secondary)" />
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Avg SST</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {selectedRegion.averageSstCelsius}°C
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <Waves size={16} color="var(--color-text-secondary)" />
                <div>
                  <div style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>Mean Wave Height</div>
                  <div style={{ fontSize: 'var(--font-size-sm)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
                    {selectedRegion.meanWaveHeightMeters} m
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
