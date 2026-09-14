import React from 'react';
import { OceanObservationRecord } from '../../../types/observation';
import { DataTable, ColumnDef } from '../../../components/tables/DataTable';
import { StatusBadge } from '../../../components/feedback/StatusBadge';
import { formatCelsius, formatSalinity, formatMeters } from '../../../utils/formatters';
import { Download } from 'lucide-react';
import { SecondaryButton } from '../../../components/common/SecondaryButton';

export interface ObservationRecordsTableProps {
  observations: OceanObservationRecord[];
  selectedObservationId?: string;
  onSelectObservation: (obs: OceanObservationRecord) => void;
}

export const ObservationRecordsTable: React.FC<ObservationRecordsTableProps> = ({
  observations,
  selectedObservationId,
  onSelectObservation,
}) => {
  const columns: ColumnDef<OceanObservationRecord>[] = [
    {
      header: 'Observation ID',
      width: '150px',
      cell: (row) => {
        const isSelected = row.id === selectedObservationId || row.instrumentId === selectedObservationId;
        return (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            {isSelected && (
              <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--color-ocean-blue)' }} />
            )}
            <span style={{ fontWeight: 600, fontFamily: 'var(--font-family-mono)', color: isSelected ? 'var(--color-ocean-blue)' : 'var(--color-text-primary)' }}>
              {row.instrumentId}
            </span>
          </div>
        );
      },
    },
    {
      header: 'Platform',
      cell: (row) => (
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            backgroundColor: 'var(--color-light-blue)',
            color: 'var(--color-ocean-blue)',
            padding: '2px 8px',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 500,
          }}
        >
          {row.platform}
        </span>
      ),
    },
    {
      header: 'Instrument Name',
      cell: (row) => (
        <span style={{ color: 'var(--color-text-secondary)', fontWeight: 500 }}>
          {row.name}
        </span>
      ),
    },
    {
      header: 'Region',
      accessorKey: 'region',
    },
    {
      header: 'Timestamp',
      accessorKey: 'lastPing',
      width: '110px',
    },
    {
      header: 'Temperature',
      cell: (row) => (
        <span style={{ fontWeight: 600, color: 'var(--color-text-primary)' }}>
          {formatCelsius(row.parameters.seaSurfaceTemperatureCelsius)}
        </span>
      ),
    },
    {
      header: 'Salinity',
      cell: (row) => formatSalinity(row.parameters.salinityPsu),
    },
    {
      header: 'Depth',
      cell: (row) => (row.depthMeters === 0 ? 'Surface' : formatMeters(row.depthMeters)),
    },
    {
      header: 'Status',
      cell: (row) => (
        <StatusBadge
          label={row.status.toUpperCase()}
          variant={row.status === 'active' ? 'success' : row.status === 'warning' ? 'warning' : 'neutral'}
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
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        style={{
          padding: 'var(--space-4) var(--space-5)',
          borderBottom: '1px solid var(--color-border-subtle)',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 'var(--space-3)',
          backgroundColor: '#FFFFFF',
        }}
      >
        <div>
          <h3 style={{ fontSize: 'var(--font-size-base)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
            Observation Records
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Showing {observations.length} platforms matching the active filter criteria • Click any row to inspect telemetry
          </p>
        </div>

        <SecondaryButton size="sm" icon={<Download size={14} />}>
          Export CSV / NetCDF
        </SecondaryButton>
      </div>

      <DataTable
        columns={columns}
        data={observations}
        keyExtractor={(row) => row.id}
        emptyMessage="No observation records match the current filter parameters."
        onRowClick={(row) => onSelectObservation(row)}
      />
    </div>
  );
};
