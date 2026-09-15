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
import { TemperatureTrendPoint } from '../../../types/analytics';

interface Props {
  data: TemperatureTrendPoint[];
}

export const TemperatureTrendChart: React.FC<Props> = ({ data }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1.25rem',
        flex: '2 1 500px',
        height: 350,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Ocean Surface Temperature Trend
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="date" tick={{ fontSize: 11, fill: '#5a7184' }} axisLine={false} tickLine={false} />
          <YAxis domain={['auto', 'auto']} tick={{ fontSize: 11, fill: '#5a7184' }} axisLine={false} tickLine={false} tickFormatter={(val) => `${val}°C`} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #DCE5EF', fontSize: '0.8rem' }}
          />
          <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />
          <Line
            type="monotone"
            name="2026 Average SST"
            dataKey="averageSST"
            stroke="#E5484D"
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 6 }}
          />
          <Line
            type="monotone"
            name="Climatology (1990-2020)"
            dataKey="climatologySST"
            stroke="#9CA3AF"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};
