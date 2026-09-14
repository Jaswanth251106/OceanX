import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/navigation/Tabs';
import { MetricCard } from '../../components/cards/MetricCard';
import { ChartCard } from '../../components/cards/ChartCard';
import { DataTable, ColumnDef } from '../../components/tables/DataTable';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { LoadingState } from '../../components/feedback/LoadingState';
import { comparisonService } from '../../services/comparisonService';
import { ComparisonScenario, ModelVsObservedComparison } from '../../types/comparison';
import { formatCelsius } from '../../utils/formatters';

export const ComparePage: React.FC = () => {
  const [scenarios, setScenarios] = useState<ComparisonScenario[]>([]);
  const [activeScenarioId, setActiveScenarioId] = useState<string>('cmp-01');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await comparisonService.getComparisonScenarios();
        setScenarios(data);
        if (data.length > 0) {
          setActiveScenarioId(data[0].id);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const currentScenario = scenarios.find((s) => s.id === activeScenarioId);

  const columns: ColumnDef<ModelVsObservedComparison>[] = [
    { header: 'Time (UTC)', accessorKey: 'timestamp', width: '120px' },
    {
      header: 'Observed Value',
      cell: (row) => <strong>{formatCelsius(row.observedSst)}</strong>,
    },
    {
      header: 'Model Output',
      cell: (row) => formatCelsius(row.modeledSst),
    },
    {
      header: 'Variance / Delta',
      cell: (row) => (
        <span
          style={{
            fontWeight: 600,
            color: Math.abs(row.variance) <= 0.1 ? 'var(--color-success)' : 'var(--color-warning)',
          }}
        >
          {row.variance > 0 ? `+${row.variance}` : row.variance}°C
        </span>
      ),
    },
    {
      header: 'Observed Salinity',
      cell: (row) => `${row.salinityObserved} PSU`,
    },
    {
      header: 'Modeled Salinity',
      cell: (row) => `${row.salinityModeled} PSU`,
    },
  ];

  return (
    <div>
      <PageHeader
        title="Model Validation & Comparative Analysis"
        subtitle="Benchmark numerical hydrodynamic models (ROMS, WaveWatch III, HYCOM) against calibrated in-situ buoy observations."
        badge={<StatusBadge label="Validation Engine Synchronized" variant="success" />}
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Compare' }]}
      />

      {loading ? (
        <LoadingState message="Loading comparative datasets..." />
      ) : currentScenario ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          <Tabs
            tabs={scenarios.map((s) => ({ id: s.id, label: s.name }))}
            activeTabId={activeScenarioId}
            onTabChange={setActiveScenarioId}
          />

          {/* Statistical Validation Metrics */}
          <MetricCard
            title={`${currentScenario.sourceA} vs ${currentScenario.sourceB}`}
            category={`Station: ${currentScenario.stationId}`}
            metrics={[
              {
                label: 'Correlation (r)',
                value: currentScenario.correlationCoefficient,
                subtext: 'High statistical correlation',
              },
              {
                label: 'Root Mean Square Error',
                value: currentScenario.rmse,
                unit: '°C',
                subtext: 'Within 0.4°C tolerance',
              },
              {
                label: 'Systematic Bias',
                value: currentScenario.bias > 0 ? `+${currentScenario.bias}` : currentScenario.bias,
                unit: '°C',
                subtext: 'Slight positive model warmth',
              },
            ]}
          />

          {/* Time-series Table comparison */}
          <ChartCard
            title={`Temporal Variance Profile (${currentScenario.parameter})`}
            subtitle="Side-by-side 4-hourly verification records"
            footerInfo="Source: INCOIS National Data Centre Operational Verification Stream"
          >
            <DataTable
              columns={columns}
              data={currentScenario.timeSeries}
              keyExtractor={(r) => r.timestamp}
            />
          </ChartCard>
        </div>
      ) : null}
    </div>
  );
};
