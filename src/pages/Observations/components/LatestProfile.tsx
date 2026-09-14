import React, { useState } from 'react';
import { DepthProfilePoint } from '../../../types/observation';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';

export interface LatestProfileProps {
  profileData: DepthProfilePoint[];
  platformName: string;
}

export const LatestProfile: React.FC<LatestProfileProps> = ({
  profileData,
  platformName,
}) => {
  const [activeMetric, setActiveMetric] = useState<'both' | 'temp' | 'salinity'>('both');

  // Custom tooltip formatter for oceanographic CTD profile
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload as DepthProfilePoint;
      return (
        <div
          style={{
            backgroundColor: '#FFFFFF',
            border: '1px solid var(--color-border)',
            borderRadius: 'var(--radius-md)',
            padding: '8px 12px',
            boxShadow: 'var(--shadow-md)',
            fontSize: 'var(--font-size-xs)',
          }}
        >
          <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '4px' }}>
            Depth: {data.depthMeters} m ({data.pressureDbar} dbar)
          </div>
          <div style={{ color: '#087FEA', fontWeight: 600 }}>
            Temperature: {data.temperatureCelsius.toFixed(1)}°C
          </div>
          <div style={{ color: '#22A06B', fontWeight: 600 }}>
            Salinity: {data.salinityPsu.toFixed(2)} PSU
          </div>
          {data.dissolvedOxygenMgL && (
            <div style={{ color: '#64748B' }}>
              Dissolved O₂: {data.dissolvedOxygenMgL} mg/L
            </div>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        boxShadow: 'var(--shadow-card)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
      }}
    >
      {/* Header bar & Metric Selector */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        <div>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Latest Vertical CTD Depth Profile
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Vertical thermocline profile • {platformName} (0 – 1,000 m)
          </p>
        </div>

        {/* Switcher Buttons */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: 'var(--color-bg-page)',
            padding: '2px',
            borderRadius: 'var(--radius-md)',
            border: '1px solid var(--color-border-subtle)',
          }}
        >
          <button
            onClick={() => setActiveMetric('both')}
            style={{
              padding: '4px 10px',
              fontSize: 'var(--font-size-xs)',
              fontWeight: activeMetric === 'both' ? 600 : 500,
              backgroundColor: activeMetric === 'both' ? '#FFFFFF' : 'transparent',
              color: activeMetric === 'both' ? 'var(--color-ocean-blue)' : 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: activeMetric === 'both' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
            }}
          >
            Both
          </button>
          <button
            onClick={() => setActiveMetric('temp')}
            style={{
              padding: '4px 10px',
              fontSize: 'var(--font-size-xs)',
              fontWeight: activeMetric === 'temp' ? 600 : 500,
              backgroundColor: activeMetric === 'temp' ? '#FFFFFF' : 'transparent',
              color: activeMetric === 'temp' ? '#087FEA' : 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: activeMetric === 'temp' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
            }}
          >
            Temperature
          </button>
          <button
            onClick={() => setActiveMetric('salinity')}
            style={{
              padding: '4px 10px',
              fontSize: 'var(--font-size-xs)',
              fontWeight: activeMetric === 'salinity' ? 600 : 500,
              backgroundColor: activeMetric === 'salinity' ? '#FFFFFF' : 'transparent',
              color: activeMetric === 'salinity' ? '#22A06B' : 'var(--color-text-secondary)',
              borderRadius: 'var(--radius-sm)',
              boxShadow: activeMetric === 'salinity' ? 'var(--shadow-sm)' : 'none',
              cursor: 'pointer',
            }}
          >
            Salinity
          </button>
        </div>
      </div>

      {/* Chart Container with scientific inverted depth axis */}
      <div style={{ width: '100%', height: '320px', minHeight: '300px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={profileData}
            layout="vertical"
            margin={{ top: 10, right: 25, left: 10, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#E2ECF7" />

            {/* Depth Y-Axis (Inverted: 0m Surface at top, 1000m at bottom) */}
            <YAxis
              type="number"
              dataKey="depthMeters"
              reversed={true}
              domain={[0, 1000]}
              tickCount={6}
              tick={{ fontSize: 11, fill: '#64748B' }}
              unit=" m"
              label={{
                value: 'Depth (meters below surface)',
                angle: -90,
                position: 'insideLeft',
                offset: 5,
                style: { fill: '#64748B', fontSize: '11px', textAnchor: 'middle' },
              }}
            />

            {/* Temperature X-Axis */}
            {(activeMetric === 'both' || activeMetric === 'temp') && (
              <XAxis
                xAxisId="temp"
                type="number"
                dataKey="temperatureCelsius"
                domain={[10, 32]}
                orientation="top"
                tick={{ fontSize: 11, fill: '#087FEA' }}
                unit="°C"
                label={{
                  value: 'Temperature (°C)',
                  position: 'top',
                  offset: 5,
                  style: { fill: '#087FEA', fontSize: '11px', fontWeight: 600 },
                }}
              />
            )}

            {/* Salinity X-Axis */}
            {(activeMetric === 'both' || activeMetric === 'salinity') && (
              <XAxis
                xAxisId="salinity"
                type="number"
                dataKey="salinityPsu"
                domain={[34.0, 37.0]}
                orientation="bottom"
                tick={{ fontSize: 11, fill: '#22A06B' }}
                unit=" PSU"
                label={{
                  value: 'Salinity (PSU)',
                  position: 'bottom',
                  offset: 5,
                  style: { fill: '#22A06B', fontSize: '11px', fontWeight: 600 },
                }}
              />
            )}

            <Tooltip content={<CustomTooltip />} />
            <Legend verticalAlign="bottom" height={24} />

            {/* Temperature Profile Line */}
            {(activeMetric === 'both' || activeMetric === 'temp') && (
              <Line
                xAxisId="temp"
                dataKey="temperatureCelsius"
                name="Temperature (°C)"
                stroke="#087FEA"
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#087FEA', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                activeDot={{ r: 6 }}
                type="monotone"
              />
            )}

            {/* Salinity Profile Line */}
            {(activeMetric === 'both' || activeMetric === 'salinity') && (
              <Line
                xAxisId="salinity"
                dataKey="salinityPsu"
                name="Salinity (PSU)"
                stroke="#22A06B"
                strokeWidth={2}
                strokeDasharray="4 2"
                dot={{ r: 4, fill: '#22A06B', stroke: '#FFFFFF', strokeWidth: 1.5 }}
                activeDot={{ r: 6 }}
                type="monotone"
              />
            )}
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div
        style={{
          marginTop: 'auto',
          paddingTop: 'var(--space-2)',
          fontSize: 'var(--font-size-xs)',
          color: 'var(--color-text-muted)',
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <span>Profile Resolution: 8 standard CTD depth levels</span>
        <span>Sensor: Sea-Bird SBE 41CP CTD</span>
      </div>
    </div>
  );
};
