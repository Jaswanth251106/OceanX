import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { SectionCard } from '../../components/cards/SectionCard';
import { DataTable, ColumnDef } from '../../components/tables/DataTable';
import { ProgressBar } from '../../components/feedback/ProgressBar';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { LoadingState } from '../../components/feedback/LoadingState';
import { analyticsService } from '../../services/analyticsService';
import { OceanAnalyticsData, BasinAnalysisSummary, OceanTrendDataPoint } from '../../types/analytics';
import { formatCelsius } from '../../utils/formatters';

export const AnalyticsPage: React.FC = () => {
  const [data, setData] = useState<OceanAnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const res = await analyticsService.getOceanAnalytics();
        setData(res);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const basinColumns: ColumnDef<BasinAnalysisSummary>[] = [
    { header: 'Oceanic Basin', accessorKey: 'basin', width: '200px' },
    {
      header: 'Mean SST',
      cell: (row) => formatCelsius(row.meanSst),
    },
    {
      header: 'Thermal Anomaly',
      cell: (row) => (
        <span style={{ color: 'var(--color-warning)', fontWeight: 600 }}>
          +{row.annualAnomaly}°C
        </span>
      ),
    },
    {
      header: 'Marine Heatwave Days',
      cell: (row) => <span>{row.marineHeatwaveDays} days</span>,
    },
    {
      header: 'Confidence Score',
      width: '220px',
      cell: (row) => (
        <ProgressBar
          value={row.confidenceScore}
          helperText={`${row.confidenceScore}%`}
          variant="primary"
          height={6}
        />
      ),
    },
  ];

  const trendColumns: ColumnDef<OceanTrendDataPoint>[] = [
    { header: 'Observation Month', accessorKey: 'date' },
    {
      header: 'Baseline Climatology',
      cell: (row) => formatCelsius(row.baselineCelsius),
    },
    {
      header: 'Observed Anomaly',
      cell: (row) => (
        <span style={{ color: 'var(--color-ocean-blue)', fontWeight: 600 }}>
          +{row.anomalyCelsius}°C
        </span>
      ),
    },
    {
      header: 'Ocean Heat Content (0-700m)',
      cell: (row) => `${row.oceanHeatContentZJ} ZJ`,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Ocean Climate & Climatological Analytics"
        subtitle="Long-term regional ocean trends, marine heatwave detection, and ocean heat content (OHC) diagnostics."
        badge={<StatusBadge label="Climatology V4.2" variant="info" />}
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Analytics' }]}
      />

      {loading ? (
        <LoadingState message="Processing multi-decadal oceanographic trends..." />
      ) : data ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <SectionCard
            title="Indian Ocean Regional Basin Diagnostics"
            subtitle={data.timeframe}
          >
            <DataTable
              columns={basinColumns}
              data={data.basinSummaries}
              keyExtractor={(r) => r.basin}
            />
          </SectionCard>

          <SectionCard
            title="Monthly Sea Surface Temperature Anomalies & Heat Content"
            subtitle="Calculated relative to 1991-2020 WMO Climatological Normal"
          >
            <DataTable
              columns={trendColumns}
              data={data.sstAnomaliesTimeSeries}
              keyExtractor={(r) => r.date}
            />
          </SectionCard>
        </div>
      ) : null}
    </div>
  );
};
