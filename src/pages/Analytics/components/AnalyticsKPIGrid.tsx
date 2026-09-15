import React from 'react';
import { AnalyticsKPIs } from '../../../types/analytics';

interface Props {
  kpis: AnalyticsKPIs;
}

const KPICard: React.FC<{ label: string; value: string; trend?: string; isGood?: boolean }> = ({ label, value, trend, isGood }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1.25rem',
        flex: 1,
        minWidth: 200,
        display: 'flex',
        flexDirection: 'column',
        gap: '0.5rem',
      }}
    >
      <div style={{ fontSize: '0.825rem', color: '#5a7184', fontWeight: 600 }}>{label}</div>
      <div style={{ fontSize: '1.75rem', fontWeight: 700, color: '#0B2A4A' }}>{value}</div>
      {trend && (
        <div style={{ fontSize: '0.75rem', fontWeight: 600, color: isGood === false ? '#E5484D' : '#22A06B' }}>
          {trend}
        </div>
      )}
    </div>
  );
};

export const AnalyticsKPIGrid: React.FC<Props> = ({ kpis }) => {
  return (
    <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
      <KPICard
        label="Total Observations"
        value={(kpis.totalObservations / 1000000).toFixed(2) + 'M'}
        trend="+12% vs last year"
        isGood={true}
      />
      <KPICard
        label="Data Quality Score"
        value={kpis.dataQualityScore.toFixed(1) + '%'}
        trend="+1.2% vs last month"
        isGood={true}
      />
      <KPICard
        label="Model Accuracy (Overall)"
        value={kpis.modelAccuracyPercentage.toFixed(1) + '%'}
        trend="-0.4% vs last month"
        isGood={false}
      />
      <KPICard
        label="Active Anomalies"
        value={kpis.activeAnomalies.toString()}
        trend="Requires attention"
        isGood={false}
      />
    </div>
  );
};
