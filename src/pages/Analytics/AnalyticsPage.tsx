import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { analyticsService } from '../../services/analyticsService';
import { CompleteAnalyticsData, AnalyticsFilterState } from '../../types/analytics';

// Sub-components
import { AnalyticsFilters } from './components/AnalyticsFilters';
import { AnalyticsKPIGrid } from './components/AnalyticsKPIGrid';
import { TemperatureTrendChart } from './components/TemperatureTrendChart';
import { SalinityTrendChart } from './components/SalinityTrendChart';
import { ModelPerformanceChart } from './components/ModelPerformanceChart';
import { AnomalySummaryPanel } from './components/AnomalySummaryPanel';
import { RecentInsightsPanel } from './components/RecentInsightsPanel';

export const AnalyticsPage: React.FC = () => {
  const [filters, setFilters] = useState<AnalyticsFilterState>({
    region: 'all',
    variable: 'all',
    timeRange: 'ytd',
  });
  
  const [data, setData] = useState<CompleteAnalyticsData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAnalytics = async () => {
      setLoading(true);
      setError(null);
      try {
        const result = await analyticsService.getAnalyticsDashboard(filters);
        setData(result);
      } catch (err) {
        console.error('Failed to load analytics data', err);
        setError('Failed to load analytics data.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchAnalytics();
  }, [filters]); // Re-fetch when filters change

  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
      <PageHeader
        title="Analytics & Trends"
        subtitle="Long-term oceanographic trends and model performance analysis"
      />

      {/* Top Bar: Filters */}
      <div style={{ margin: '1.5rem 0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
        <AnalyticsFilters filters={filters} onChange={setFilters} loading={loading} />
        
        {loading && (
          <div style={{ fontSize: '0.8rem', color: '#087FEA', fontWeight: 600 }}>
            Updating analytics...
          </div>
        )}
      </div>

      {error && (
        <div style={{ padding: '1rem', background: '#FFF0F0', color: '#E5484D', borderRadius: '8px', border: '1px solid #FECACA', marginBottom: '1.5rem' }}>
          {error}
        </div>
      )}

      {data && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          
          {/* Row 1: KPIs */}
          <AnalyticsKPIGrid kpis={data.kpis} />

          {/* Row 2: Main Trend Charts */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <TemperatureTrendChart data={data.temperatureTrends} />
            <SalinityTrendChart data={data.salinityTrends} />
          </div>

          {/* Row 3: Performance, Anomalies, Insights */}
          <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
            <ModelPerformanceChart data={data.modelPerformance} />
            <AnomalySummaryPanel anomalies={data.anomalies} />
            <RecentInsightsPanel insights={data.recentInsights} />
          </div>

        </div>
      )}
    </div>
  );
};
