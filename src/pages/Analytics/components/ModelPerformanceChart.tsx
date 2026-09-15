import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { ModelPerformancePoint } from '../../../types/analytics';

interface Props {
  data: ModelPerformancePoint[];
}

export const ModelPerformanceChart: React.FC<Props> = ({ data }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1.25rem',
        flex: '1 1 400px',
        height: 320,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Model Performance (RMSE vs Correlation)
      </div>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" vertical={false} />
          <XAxis dataKey="modelName" tick={{ fontSize: 11, fill: '#5a7184' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="left" orientation="left" tick={{ fontSize: 11, fill: '#5a7184' }} axisLine={false} tickLine={false} />
          <YAxis yAxisId="right" orientation="right" domain={[0, 1]} tick={{ fontSize: 11, fill: '#5a7184' }} axisLine={false} tickLine={false} />
          <Tooltip
            contentStyle={{ borderRadius: 8, border: '1px solid #DCE5EF', fontSize: '0.8rem' }}
          />
          <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '10px' }} />
          <Bar yAxisId="left" name="RMSE" dataKey="rmse" fill="#3B82F6" radius={[4, 4, 0, 0]} barSize={30} />
          <Bar yAxisId="right" name="Correlation" dataKey="correlation" fill="#22A06B" radius={[4, 4, 0, 0]} barSize={30} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
