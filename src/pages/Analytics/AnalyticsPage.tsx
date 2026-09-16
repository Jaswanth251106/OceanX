import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { analyticsService } from '../../services/analyticsService';
import {
  AnalyticsFilterState,
  ApiAnalyticsSummary,
  ApiTemperaturePoint,
  ApiSalinityDepthPoint,
  ApiModelPerformance,
  ApiAnomaly,
} from '../../types/analytics';

// Sub-components
import { AnalyticsFilters } from './components/AnalyticsFilters';
import { AnalyticsKPIGrid } from './components/AnalyticsKPIGrid';
import { TemperatureTrendChart } from './components/TemperatureTrendChart';
import { SalinityTrendChart } from './components/SalinityTrendChart';
import { ModelPerformanceChart } from './components/ModelPerformanceChart';
import { AnomalySummaryPanel } from './components/AnomalySummaryPanel';
import { RecentInsightsPanel } from './components/RecentInsightsPanel';

/**
 * Each API section has its own loading/error/data state,
 * so one failed endpoint does not crash the entire page.
 */
interface SectionState<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
}

const initial = <T,>(): SectionState<T> => ({ data: null, loading: true, error: null });

export const AnalyticsPage: React.FC = () => {
  // Filters — preserved from the UI redesign.
  // The current API endpoints do not accept filter query params,
  // so we keep the UI controls but do not pass them to the backend.
  const [filters, setFilters] = useState<AnalyticsFilterState>({
    region: 'arabian_sea',
    variable: 'temp',
    timeRange: 'ytd',
  });

  // Independent section states
  const [summary, setSummary] = useState<SectionState<ApiAnalyticsSummary>>(initial);
  const [tempTrend, setTempTrend] = useState<SectionState<ApiTemperaturePoint[]>>(initial);
  const [salinityDepth, setSalinityDepth] = useState<SectionState<ApiSalinityDepthPoint[]>>(initial);
  const [modelPerf, setModelPerf] = useState<SectionState<ApiModelPerformance>>(initial);
  const [anomalies, setAnomalies] = useState<SectionState<ApiAnomaly[]>>(initial);

  const fetchAll = useCallback(async () => {
    // Mark all as loading
    setSummary((s) => ({ ...s, loading: true, error: null }));
    setTempTrend((s) => ({ ...s, loading: true, error: null }));
    setSalinityDepth((s) => ({ ...s, loading: true, error: null }));
    setModelPerf((s) => ({ ...s, loading: true, error: null }));
    setAnomalies((s) => ({ ...s, loading: true, error: null }));

    // Fire all 5 requests in parallel — independent error handling
    analyticsService
      .getSummary()
      .then((data) => setSummary({ data, loading: false, error: null }))
      .catch((e) => setSummary({ data: null, loading: false, error: String(e?.message ?? e) }));

    analyticsService
      .getTemperatureTrend()
      .then((data) => setTempTrend({ data, loading: false, error: null }))
      .catch((e) => setTempTrend({ data: null, loading: false, error: String(e?.message ?? e) }));

    analyticsService
      .getSalinityDepth()
      .then((data) => setSalinityDepth({ data, loading: false, error: null }))
      .catch((e) => setSalinityDepth({ data: null, loading: false, error: String(e?.message ?? e) }));

    analyticsService
      .getModelPerformance()
      .then((data) => setModelPerf({ data, loading: false, error: null }))
      .catch((e) => setModelPerf({ data: null, loading: false, error: String(e?.message ?? e) }));

    analyticsService
      .getAnomalies()
      .then((data) => setAnomalies({ data, loading: false, error: null }))
      .catch((e) => setAnomalies({ data: null, loading: false, error: String(e?.message ?? e) }));
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const anyLoading =
    summary.loading ||
    tempTrend.loading ||
    salinityDepth.loading ||
    modelPerf.loading ||
    anomalies.loading;

  return (
    <div
      style={{
        padding: '2rem 2.5rem',
        maxWidth: 1440,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem',
        fontFamily: 'var(--font-family-base)',
      }}
    >
      {/* ── Header ── */}
      <PageHeader
        title="Analytics & Trends"
        subtitle="Long-term oceanographic trends and model performance analysis"
      />

      {/* ── Filters ── */}
      <AnalyticsFilters filters={filters} onChange={setFilters} loading={anyLoading} />

      {/* ── Row 1: KPI cards ── */}
      <AnalyticsKPIGrid summary={summary.data} loading={summary.loading} />

      {/* ── Row 2: Temperature Trend / Salinity by Depth ── */}
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        {filters.variable === 'temp' && (
          <TemperatureTrendChart
            data={tempTrend.data}
            loading={tempTrend.loading}
            error={tempTrend.error}
          />
        )}
        {filters.variable === 'salinity' && (
          <SalinityTrendChart
            data={salinityDepth.data}
            loading={salinityDepth.loading}
            error={salinityDepth.error}
          />
        )}
      </div>

      {/* ── Row 3: GLORYS Performance + Anomalies & Warnings ── */}
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        <ModelPerformanceChart
          data={modelPerf.data}
          loading={modelPerf.loading}
          error={modelPerf.error}
        />
        <AnomalySummaryPanel
          anomalies={anomalies.data}
          loading={anomalies.loading}
          error={anomalies.error}
        />
      </div>

      {/* ── Row 4: Recent Analytical Insights (no API endpoint) ── */}
      <RecentInsightsPanel />
    </div>
  );
};
