import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Thermometer } from 'lucide-react';
import { ApiTemperaturePoint } from '../../../types/analytics';

interface Props {
  data: ApiTemperaturePoint[] | null;
  loading: boolean;
  error: string | null;
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
  if (!active || !payload || payload.length === 0) return null;
  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-sm)',
        padding: '0.6rem 0.9rem',
        boxShadow: 'var(--shadow-md)',
        fontSize: 'var(--font-size-xs)',
      }}
    >
      <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.35rem' }}>
        {label}
      </div>
      {payload.map((entry) => (
        <div key={entry.name} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.15rem' }}>
          <span style={{ display: 'inline-block', width: 10, height: 3, borderRadius: 2, background: entry.color }} />
          <span style={{ color: 'var(--color-text-secondary)' }}>{entry.name}:</span>
          <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
            {Number(entry.value).toFixed(3)}°C
          </span>
        </div>
      ))}
      {payload[0]?.payload?.observations !== undefined && (
        <div style={{ marginTop: '0.3rem', color: 'var(--color-text-muted)', fontSize: 10 }}>
          {payload[0].payload.observations.toLocaleString()} observations
        </div>
      )}
    </div>
  );
};

/** Format "2025-01" → "Jan 2025" */
function formatMonth(month: string): string {
  const [year, m] = month.split('-');
  const date = new Date(Number(year), Number(m) - 1, 1);
  return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
}

export const TemperatureTrendChart: React.FC<Props> = ({ data, loading, error }) => {
  const chartData = data?.map((p) => ({ ...p, label: formatMonth(p.month) })) ?? [];

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        flex: '2 1 500px',
        minHeight: 340,
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div
          style={{
            width: 30,
            height: 30,
            borderRadius: 'var(--radius-sm)',
            background: '#FFF3F3',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Thermometer size={16} color="#E5484D" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
            Temperature Trend
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            Monthly averaged Argo float observations (°C)
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            Loading temperature data…
          </div>
        </div>
      )}

      {!loading && error && (
        <div style={{ padding: '1rem', background: 'var(--color-danger-bg)', border: '1px solid var(--color-danger-border)', borderRadius: 'var(--radius-sm)', color: 'var(--color-danger)', fontSize: 'var(--font-size-xs)' }}>
          {error}
        </div>
      )}

      {!loading && !error && chartData.length === 0 && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
          No temperature data available.
        </div>
      )}

      {!loading && !error && chartData.length > 0 && (
        <div style={{ flex: 1, minHeight: 260 }}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={chartData} margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-family-base)' }}
                axisLine={false}
                tickLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                domain={['auto', 'auto']}
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-family-base)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val: number) => `${val.toFixed(1)}°C`}
              />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                name="Temperature"
                dataKey="temperature"
                stroke="#E5484D"
                strokeWidth={2.5}
                dot={false}
                activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
