import React from 'react';
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
import { TemperatureProfilePoint, SalinityProfilePoint } from '../../../types/comparison';

interface Props {
  tempProfile: TemperatureProfilePoint[];
  salinityProfile: SalinityProfilePoint[];
  activeVariable: 'temperature' | 'salinity' | 'current_speed';
}

interface ChartEntry {
  depth: number;
  Model: number;
  Observation: number;
}

export const ComparisonProfiles: React.FC<Props> = ({
  tempProfile,
  salinityProfile,
  activeVariable,
}) => {
  const isSalinity = activeVariable === 'salinity';
  const unit = isSalinity ? 'PSU' : '°C';
  const title = isSalinity ? 'Salinity Depth Profile' : 'Temperature Depth Profile';

  const chartData: ChartEntry[] = isSalinity
    ? salinityProfile.map((p) => ({
        depth: p.depth,
        Model: p.modelSalinity,
        Observation: p.obsSalinity,
      }))
    : tempProfile.map((p) => ({
        depth: p.depth,
        Model: p.modelTemp,
        Observation: p.obsTemp,
      }));

  // Custom tooltip
  const CustomTooltip = ({
    active,
    payload,
    label,
  }: {
    active?: boolean;
    payload?: { name: string; value: number; color: string }[];
    label?: number;
  }) => {
    if (!active || !payload || payload.length === 0) return null;
    return (
      <div
        style={{
          background: '#0B2A4A',
          border: '1px solid #DCE5EF',
          borderRadius: 8,
          padding: '0.5rem 0.75rem',
          fontSize: '0.78rem',
          color: '#fff',
          lineHeight: 1.6,
        }}
      >
        <div style={{ fontWeight: 700, marginBottom: 4 }}>Depth: {label} m</div>
        {payload.map((p) => (
          <div key={p.name} style={{ color: p.color }}>
            {p.name}: {p.value.toFixed(2)} {unit}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1rem 1.1rem',
        flex: 1,
        minWidth: 280,
      }}
    >
      <div
        style={{
          fontWeight: 700,
          fontSize: '0.88rem',
          color: '#0B2A4A',
          marginBottom: '1rem',
        }}
      >
        {title}
        <span style={{ fontSize: '0.75rem', color: '#5a7184', fontWeight: 400, marginLeft: '0.5rem' }}>
          (Model vs Observation)
        </span>
      </div>

      {activeVariable === 'current_speed' ? (
        <div
          style={{
            height: 320,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: '#9CA3AF',
            fontSize: '0.85rem',
          }}
        >
          Depth profile not available for Current Speed
        </div>
      ) : (
        <ResponsiveContainer width="100%" height={320}>
          <LineChart
            data={chartData}
            layout="vertical"
            margin={{ top: 8, right: 24, left: 8, bottom: 8 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" />
            <XAxis
              type="number"
              dataKey={undefined}
              domain={['auto', 'auto']}
              tickFormatter={(v: number) => `${v.toFixed(1)}`}
              label={{
                value: unit,
                position: 'insideBottom',
                offset: -2,
                fontSize: 11,
                fill: '#5a7184',
              }}
              tick={{ fontSize: 11 }}
              stroke="#CBD5E0"
            />
            <YAxis
              type="number"
              dataKey="depth"
              reversed
              domain={[0, 1000]}
              ticks={[0, 50, 100, 200, 300, 500, 700, 1000]}
              label={{
                value: 'Depth (m)',
                angle: -90,
                position: 'insideLeft',
                offset: 12,
                fontSize: 11,
                fill: '#5a7184',
              }}
              tick={{ fontSize: 11 }}
              stroke="#CBD5E0"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend
              iconType="line"
              wrapperStyle={{ fontSize: '0.78rem', paddingTop: '6px' }}
            />
            <Line
              type="monotone"
              dataKey="Model"
              stroke="#087FEA"
              strokeWidth={2}
              dot={{ r: 3, fill: '#087FEA' }}
              activeDot={{ r: 5 }}
            />
            <Line
              type="monotone"
              dataKey="Observation"
              stroke="#22A06B"
              strokeWidth={2}
              strokeDasharray="5 3"
              dot={{ r: 3, fill: '#22A06B' }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};
