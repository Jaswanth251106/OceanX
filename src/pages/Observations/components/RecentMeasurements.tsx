import React from 'react';
import { RecentMeasurementItem } from '../../../types/observation';
import { DataTable, ColumnDef } from '../../../components/tables/DataTable';
import { StatusBadge } from '../../../components/feedback/StatusBadge';
import { formatCelsius, formatSalinity, formatMeters } from '../../../utils/formatters';

export interface RecentMeasurementsProps {
  measurements: RecentMeasurementItem[];
}

export const RecentMeasurements: React.FC<RecentMeasurementsProps> = ({ measurements }) => {
  const columns: ColumnDef<RecentMeasurementItem>[] = [
    {
      header: 'Time',
      accessorKey: 'timeAgo',
      width: '110px',
    },
    {
      header: 'Depth',
      cell: (row) => formatMeters(row.depthMeters),
      width: '90px',
    },
    {
      header: 'Temperature',
      cell: (row) => (
        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {formatCelsius(row.temperatureCelsius)}
        </span>
      ),
    },
    {
      header: 'Salinity',
      cell: (row) => formatSalinity(row.salinityPsu),
    },
    {
      header: 'Pressure',
      cell: (row) => `${row.pressureDbar} dbar`,
    },
    {
      header: 'Quality Flag',
      cell: (row) => (
        <StatusBadge
          label={row.quality}
          variant={row.quality === 'Good' ? 'success' : row.quality === 'Estimated' ? 'warning' : 'danger'}
          size="sm"
        />
      ),
    },
  ];

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
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
          borderBottom: '1px solid var(--color-border-subtle)',
          paddingBottom: 'var(--space-3)',
        }}
      >
        <div>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Recent High-Resolution Measurements
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Calibrated sensor telemetry packet history (WMO QC Grade 1)
          </p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={measurements}
        keyExtractor={(item) => item.id}
        emptyMessage="No recent measurement records found for this platform."
      />
    </div>
  );
};
