import React, { useState } from 'react';
import {
  ArgoComparisonRecord,
  GliderComparisonRecord,
} from '../../../types/comparison';
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
import { Waves, Navigation, ChevronLeft, ChevronRight, RefreshCw } from 'lucide-react';

interface Props {
  platformType: 'ARGO' | 'GLIDER';
  platformId: string;
  records: (ArgoComparisonRecord | GliderComparisonRecord)[];
  totalCount: number;
  limit: number;
  offset: number;
  onPageChange: (newOffset: number) => void;
  loading: boolean;
  error?: string | null;
  onRetry?: () => void;
}

export const ComparisonVisualArea: React.FC<Props> = ({
  platformType,
  platformId,
  records,
  totalCount,
  limit,
  offset,
  onPageChange,
  loading,
  error,
  onRetry,
}) => {
  const isArgo = platformType === 'ARGO';
  const [activeTab, setActiveTab] = useState<'temperature' | 'salinity' | 'table'>('temperature');

  // Format chart data, safely ignoring null values for temperature or salinity
  const chartData = records.map((rec) => {
    const obsTemp = isArgo
      ? (rec as ArgoComparisonRecord).temperature?.argo
      : (rec as GliderComparisonRecord).temperature?.glider;
    const modelTemp = rec.temperature?.model;

    const obsSal = isArgo
      ? (rec as ArgoComparisonRecord).salinity?.argo
      : (rec as GliderComparisonRecord).salinity?.glider;
    const modelSal = rec.salinity?.model;

    return {
      depth: rec.depth,
      obsTemp: obsTemp !== null && obsTemp !== undefined ? Number(obsTemp) : null,
      modelTemp: modelTemp !== null && modelTemp !== undefined ? Number(modelTemp) : null,
      obsSal: obsSal !== null && obsSal !== undefined ? Number(obsSal) : null,
      modelSal: modelSal !== null && modelSal !== undefined ? Number(modelSal) : null,
      time: new Date(rec.observation_time).toLocaleString('en-IN', { dateStyle: 'short', timeStyle: 'short' }),
    };
  });

  const currentPage = Math.floor(offset / limit) + 1;
  const totalPages = Math.ceil(totalCount / limit) || 1;

  return (
    <div
      style={{
        background: '#FFFFFF',
        border: '1px solid var(--color-border, #D5E5EF)',
        borderRadius: '12px',
        padding: '1.25rem 1.5rem',
        boxShadow: '0 4px 16px rgba(8, 127, 234, 0.04)',
      }}
    >
      {/* Header Row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.8rem' }}>
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            {isArgo ? <Waves size={18} color="#087FEA" /> : <Navigation size={18} color="#0E9F9A" />}
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--color-primary-navy, #0B3B66)', margin: 0 }}>
              {platformType} vs MODEL COMPARISON
            </h3>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary, #58708A)', marginTop: '2px' }}>
            ID: <strong>{platformId}</strong> | Records: <strong>{records.length}</strong> loaded ({totalCount} total)
          </div>
        </div>

        {/* View mode toggle tabs */}
        <div style={{ display: 'flex', gap: '4px', backgroundColor: '#F3F9FC', padding: '3px', borderRadius: '8px', border: '1px solid #D5E5EF' }}>
          <button
            onClick={() => setActiveTab('temperature')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'temperature' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'temperature' ? '#087FEA' : '#58708A',
              boxShadow: activeTab === 'temperature' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
            }}
          >
            Temp Profile
          </button>
          <button
            onClick={() => setActiveTab('salinity')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'salinity' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'salinity' ? '#087FEA' : '#58708A',
              boxShadow: activeTab === 'salinity' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
            }}
          >
            Salinity Profile
          </button>
          <button
            onClick={() => setActiveTab('table')}
            style={{
              padding: '4px 10px',
              borderRadius: '6px',
              border: 'none',
              fontSize: '0.75rem',
              fontWeight: 600,
              backgroundColor: activeTab === 'table' ? '#FFFFFF' : 'transparent',
              color: activeTab === 'table' ? '#087FEA' : '#58708A',
              boxShadow: activeTab === 'table' ? '0 1px 3px rgba(0,0,0,0.08)' : 'none',
              cursor: 'pointer',
            }}
          >
            Raw Data Table
          </button>
        </div>
      </div>

      {/* Error state with retry option */}
      {error && (
        <div style={{ padding: '1.5rem', backgroundColor: '#FFF0F0', border: '1px solid #FECACA', borderRadius: '8px', textAlign: 'center', marginBottom: '1rem' }}>
          <div style={{ color: '#E5484D', fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.5rem' }}>
            {error}
          </div>
          {onRetry && (
            <button
              onClick={onRetry}
              style={{
                padding: '0.4rem 0.9rem',
                backgroundColor: '#E5484D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '6px',
                fontSize: '0.8rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
              }}
            >
              <RefreshCw size={14} /> Retry API Fetch
            </button>
          )}
        </div>
      )}

      {/* Loading state overlay */}
      {loading && !error && (
        <div style={{ height: 280, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#087FEA', fontWeight: 600, fontSize: '0.85rem' }}>
          Fetching real {platformType} comparison records from backend API...
        </div>
      )}

      {/* Content Area */}
      {!loading && !error && (
        <>
          {activeTab === 'temperature' && (
            <div style={{ height: 320, width: '100%', marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" />
                  <XAxis
                    type="number"
                    domain={['auto', 'auto']}
                    unit="°C"
                    stroke="#8AA1B9"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="depth"
                    reversed
                    domain={['auto', 'auto']}
                    unit="m"
                    stroke="#8AA1B9"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #D5E5EF', fontSize: '0.8rem' }}
                    formatter={(value: any, name: string) => [
                      value !== null && value !== undefined ? `${Number(value).toFixed(2)} °C` : 'N/A',
                      name,
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '6px' }} />
                  <Line
                    type="monotone"
                    dataKey="modelTemp"
                    name="Model Temp (°C)"
                    stroke="#087FEA"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="obsTemp"
                    name={`Observed ${platformType} Temp (°C)`}
                    stroke={isArgo ? '#00B8D9' : '#0E9F9A'}
                    strokeWidth={2}
                    strokeDasharray="4 2"
                    dot={{ r: 2 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'salinity' && (
            <div style={{ height: 320, width: '100%', marginTop: '0.5rem' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={chartData}
                  layout="vertical"
                  margin={{ top: 10, right: 20, left: 10, bottom: 10 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#EDF2F7" />
                  <XAxis
                    type="number"
                    domain={['auto', 'auto']}
                    unit=" PSU"
                    stroke="#8AA1B9"
                    tick={{ fontSize: 11 }}
                  />
                  <YAxis
                    type="number"
                    dataKey="depth"
                    reversed
                    domain={['auto', 'auto']}
                    unit="m"
                    stroke="#8AA1B9"
                    tick={{ fontSize: 11 }}
                  />
                  <Tooltip
                    contentStyle={{ borderRadius: 8, border: '1px solid #D5E5EF', fontSize: '0.8rem' }}
                    formatter={(value: any, name: string) => [
                      value !== null && value !== undefined ? `${Number(value).toFixed(2)} PSU` : 'N/A (Null)',
                      name,
                    ]}
                  />
                  <Legend wrapperStyle={{ fontSize: '0.8rem', paddingTop: '6px' }} />
                  <Line
                    type="monotone"
                    dataKey="modelSal"
                    name="Model Salinity (PSU)"
                    stroke="#0B3B66"
                    strokeWidth={2}
                    dot={{ r: 2 }}
                    connectNulls={false}
                  />
                  <Line
                    type="monotone"
                    dataKey="obsSal"
                    name={`Observed ${platformType} Salinity (PSU)`}
                    stroke="#00B8D9"
                    strokeWidth={2}
                    strokeDasharray="4 2"
                    dot={{ r: 2 }}
                    connectNulls={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          )}

          {activeTab === 'table' && (
            <div style={{ overflowX: 'auto', marginTop: '0.5rem', maxHeight: 320 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.8rem', textAlign: 'left' }}>
                <thead>
                  <tr style={{ background: '#F3F9FC', color: '#0B3B66', borderBottom: '1px solid #D5E5EF' }}>
                    <th style={{ padding: '8px 12px' }}>Depth (m)</th>
                    <th style={{ padding: '8px 12px' }}>Obs Temp (°C)</th>
                    <th style={{ padding: '8px 12px' }}>Model Temp (°C)</th>
                    <th style={{ padding: '8px 12px' }}>Temp Diff (°C)</th>
                    <th style={{ padding: '8px 12px' }}>Obs Salinity (PSU)</th>
                    <th style={{ padding: '8px 12px' }}>Model Salinity (PSU)</th>
                    <th style={{ padding: '8px 12px' }}>Salinity Diff</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((rec, idx) => {
                    const obsT = isArgo
                      ? (rec as ArgoComparisonRecord).temperature?.argo
                      : (rec as GliderComparisonRecord).temperature?.glider;
                    const modT = rec.temperature?.model;
                    const diffT = rec.temperature?.difference;

                    const obsS = isArgo
                      ? (rec as ArgoComparisonRecord).salinity?.argo
                      : (rec as GliderComparisonRecord).salinity?.glider;
                    const modS = rec.salinity?.model;
                    const diffS = rec.salinity?.difference;

                    return (
                      <tr key={idx} style={{ borderBottom: '1px solid #F0F4F8' }}>
                        <td style={{ padding: '6px 12px', fontWeight: 600, color: '#0B2A4A' }}>{rec.depth}m</td>
                        <td style={{ padding: '6px 12px', color: obsT !== null ? '#0E9F9A' : '#9CA3AF' }}>
                          {obsT !== null && obsT !== undefined ? Number(obsT).toFixed(3) : 'N/A'}
                        </td>
                        <td style={{ padding: '6px 12px', color: '#087FEA' }}>
                          {modT !== null && modT !== undefined ? Number(modT).toFixed(3) : 'N/A'}
                        </td>
                        <td style={{ padding: '6px 12px', color: diffT !== null && diffT !== undefined && diffT > 0 ? '#E5484D' : '#0B2A4A' }}>
                          {diffT !== null && diffT !== undefined ? (diffT > 0 ? `+${diffT.toFixed(3)}` : diffT.toFixed(3)) : 'N/A'}
                        </td>
                        <td style={{ padding: '6px 12px', color: obsS !== null ? '#00B8D9' : '#9CA3AF' }}>
                          {obsS !== null && obsS !== undefined ? Number(obsS).toFixed(3) : 'N/A'}
                        </td>
                        <td style={{ padding: '6px 12px', color: '#0B3B66' }}>
                          {modS !== null && modS !== undefined ? Number(modS).toFixed(3) : 'N/A'}
                        </td>
                        <td style={{ padding: '6px 12px', color: diffS !== null && diffS !== undefined ? '#58708A' : '#9CA3AF' }}>
                          {diffS !== null && diffS !== undefined ? (diffS > 0 ? `+${diffS.toFixed(3)}` : diffS.toFixed(3)) : 'N/A'}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Pagination Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '1rem',
              paddingTop: '0.75rem',
              borderTop: '1px solid #F3F9FC',
              fontSize: '0.78rem',
              color: '#58708A',
            }}
          >
            <div>
              Showing {records.length > 0 ? offset + 1 : 0} - {Math.min(offset + records.length, totalCount)} of {totalCount} records
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <button
                onClick={() => onPageChange(Math.max(0, offset - limit))}
                disabled={offset === 0 || loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #D5E5EF',
                  backgroundColor: '#FFFFFF',
                  color: offset === 0 ? '#CBD5E0' : '#0B2A4A',
                  cursor: offset === 0 ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                }}
              >
                <ChevronLeft size={14} /> Prev
              </button>

              <span style={{ fontWeight: 600, color: '#0B3B66' }}>
                Page {currentPage} of {totalPages}
              </span>

              <button
                onClick={() => onPageChange(offset + limit)}
                disabled={offset + limit >= totalCount || loading}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid #D5E5EF',
                  backgroundColor: '#FFFFFF',
                  color: offset + limit >= totalCount ? '#CBD5E0' : '#0B2A4A',
                  cursor: offset + limit >= totalCount ? 'not-allowed' : 'pointer',
                  fontWeight: 600,
                }}
              >
                Next <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
