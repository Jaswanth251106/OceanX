import React, { useMemo } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  TooltipProps,
} from 'recharts';
import { Waves } from 'lucide-react';
import { ApiSalinityDepthPoint } from '../../../types/analytics';

interface Props {
  data: ApiSalinityDepthPoint[] | null;
  loading: boolean;
  error: string | null;
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (!active || !payload || payload.length === 0) return null;
  const d = payload[0]?.payload as ApiSalinityDepthPoint;
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
      <div style={{ fontWeight: 700, color: 'var(--color-text-primary)', marginBottom: '0.25rem' }}>
        Depth: {d.depth.toFixed(1)} m
      </div>
      <div style={{ color: 'var(--color-text-secondary)' }}>
        Salinity: <strong style={{ color: 'var(--color-text-primary)' }}>{d.salinity.toFixed(3)} PSU</strong>
      </div>
      {d.observations > 0 && (
        <div style={{ color: 'var(--color-text-muted)', marginTop: '0.2rem' }}>
          {d.observations} obs
        </div>
      )}
    </div>
  );
};

/**
 * The salinity-depth API returns thousands of fine-grained depth bins.
 * We down-sample to ~80 representative points for chart performance
 * by averaging salinity within equal depth intervals.
 */
function downsampleDepthProfile(
  raw: ApiSalinityDepthPoint[],
  targetBins = 80
): ApiSalinityDepthPoint[] {
  if (raw.length === 0) return [];

  const sorted = [...raw].sort((a, b) => a.depth - b.depth);
  const maxDepth = sorted[sorted.length - 1].depth;
  const minDepth = sorted[0].depth;
  const binSize = (maxDepth - minDepth) / targetBins;

  if (binSize <= 0) return sorted;

  const bins: { sum: number; count: number; obs: number; depth: number }[] = Array.from(
    { length: targetBins },
    (_, i) => ({ sum: 0, count: 0, obs: 0, depth: minDepth + i * binSize + binSize / 2 })
  );

  for (const pt of sorted) {
    const idx = Math.min(Math.floor((pt.depth - minDepth) / binSize), targetBins - 1);
    bins[idx].sum += pt.salinity;
    bins[idx].count += 1;
    bins[idx].obs += pt.observations;
  }

  return bins
    .filter((b) => b.count > 0)
    .map((b) => ({
      depth: parseFloat(b.depth.toFixed(1)),
      salinity: parseFloat((b.sum / b.count).toFixed(3)),
      observations: b.obs,
    }));
}

export const SalinityTrendChart: React.FC<Props> = ({ data, loading, error }) => {
  const chartData = useMemo(
    () => (data ? downsampleDepthProfile(data) : []),
    [data]
  );

  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        flex: '1 1 380px',
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
            background: 'var(--color-info-bg)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Waves size={16} color="var(--color-ocean-blue)" strokeWidth={2} />
        </div>
        <div>
          <div style={{ fontWeight: 700, fontSize: 'var(--font-size-sm)', color: 'var(--color-text-primary)', lineHeight: 1.2 }}>
            Salinity by Depth
          </div>
          <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            PSU vs depth (m) — Argo float observations
          </div>
        </div>
      </div>

      {loading && (
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ color: 'var(--color-text-muted)', fontSize: 'var(--font-size-sm)' }}>
            Loading salinity profile…
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
          No salinity depth data available.
        </div>
      )}

      {!loading && !error && chartData.length > 0 && (
        <div style={{ flex: 1, minHeight: 260 }}>
          {/* 
            Depth profile: depth on Y-axis (inverted — 0 at top, deep at bottom),
            salinity on X-axis. This is the correct oceanographic convention.
          */}
          <ResponsiveContainer width="100%" height="100%">
            <ScatterChart margin={{ top: 5, right: 16, left: 0, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border-subtle)" />
              <XAxis
                type="number"
                dataKey="salinity"
                domain={['auto', 'auto']}
                name="Salinity"
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-family-base)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val: number) => `${val.toFixed(1)}`}
                label={{
                  value: 'Salinity (PSU)',
                  position: 'insideBottom',
                  offset: -2,
                  fontSize: 11,
                  fill: 'var(--color-text-muted)',
                }}
              />
              <YAxis
                type="number"
                dataKey="depth"
                name="Depth"
                reversed
                domain={['auto', 'auto']}
                tick={{ fontSize: 11, fill: 'var(--color-text-muted)', fontFamily: 'var(--font-family-base)' }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(val: number) => `${val.toFixed(0)}m`}
              />
              <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
              <Scatter
                name="Salinity"
                data={chartData}
                fill="var(--color-ocean-blue)"
                fillOpacity={0.7}
                line={{ stroke: 'var(--color-ocean-blue)', strokeWidth: 1.5, strokeOpacity: 0.6 }}
                lineType="fitting"
                shape="circle"
              />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
};
