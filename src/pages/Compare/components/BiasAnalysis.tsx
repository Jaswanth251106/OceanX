import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
  Cell,
} from 'recharts';
import { BiasAnalysis as BiasType } from '../../../types/comparison';

interface Props {
  biasData: BiasType;
}

export const BiasAnalysis: React.FC<Props> = ({ biasData }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1rem 1.1rem',
        flex: 1,
        minWidth: 280,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.88rem', color: '#0B2A4A', marginBottom: '0.5rem' }}>
        Multivariate Bias Analysis
      </div>
      <div style={{ fontSize: '0.78rem', color: '#5a7184', marginBottom: '1.2rem', lineHeight: 1.4 }}>
        {biasData.summary}
      </div>

      <div style={{ flex: 1, minHeight: 220 }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={biasData.points}
            margin={{ top: 10, right: 20, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#EDF2F7" />
            <XAxis
              dataKey="variable"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#5a7184' }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 11, fill: '#5a7184' }}
              tickFormatter={(val) => (val > 0 ? `+${val}` : `${val}`)}
            />
            <Tooltip
              cursor={{ fill: '#F6F8FB' }}
              contentStyle={{ borderRadius: 8, border: '1px solid #DCE5EF', fontSize: '0.78rem' }}
              formatter={(value: number, name: string, props: any) => [`${value > 0 ? '+' : ''}${value} ${props.payload.unit}`, name]}
            />
            <ReferenceLine y={0} stroke="#0B2A4A" strokeWidth={1} />
            <Bar
              dataKey="bias"
              name="Mean Bias"
              radius={[4, 4, 4, 4]}
            >
              {biasData.points.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.bias > 0 ? '#E5484D' : '#3B82F6'} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', fontSize: '0.7rem', color: '#5a7184', marginTop: '0.5rem' }}>
         <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <span style={{width: 10, height: 10, background: '#E5484D', borderRadius: '2px'}}></span> Positive Bias (Model overestimates)
         </div>
         <div style={{display: 'flex', alignItems: 'center', gap: '4px'}}>
            <span style={{width: 10, height: 10, background: '#3B82F6', borderRadius: '2px'}}></span> Negative Bias (Model underestimates)
         </div>
      </div>
    </div>
  );
};
