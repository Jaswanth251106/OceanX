import React from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { SalinityTrendPoint } from '../../../types/analytics';

interface Props {
  data: SalinityTrendPoint[];
}

export const SalinityTrendChart: React.FC<Props> = ({ data }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1.25rem',
        flex: '1 1 400px',
        height: 350,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Salinity Variation (Surface vs Deep)
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#5a7184' }} axisLine={false} tickLine={false} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#5a7184' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val} PSU`} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #DCE5EF', fontSize: '0.8rem' }}
          />
          <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />
          <Area
            type="monotone"
            name="Deep Salinity (1000m)"
            dataKey="deepSalinity"
            stroke="#0B2A4A"
            fill="#0B2A4A"
            fillOpacity={0.1}
            strokeWidth={2}
          />
          <Area
            type="monotone"
            name="Surface Salinity (0m)"
            dataKey="surfaceSalinity"
            stroke="#087FEA"
            fill="#087FEA"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
