import React from 'react';
import { Eye, ShieldCheck, BrainCircuit, TriangleAlert } from 'lucide-react';
import { ApiAnalyticsSummary } from '../../../types/analytics';

interface Props {
  summary: ApiAnalyticsSummary | null;
  loading: boolean;
}

interface KPICardDef {
  label: string;
  value: string;
  subLabel: string;
  icon: React.ReactNode;
  accentColor: string;
  iconBg: string;
  trendColor?: string;
}

const cardStyle: React.CSSProperties = {
  background: 'var(--color-bg-card)',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-md)',
  padding: '1.25rem 1.5rem',
  flex: '1 1 200px',
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem',
  boxShadow: 'var(--shadow-card)',
  position: 'relative',
  overflow: 'hidden',
};

const skeletonStyle: React.CSSProperties = {
  background: 'var(--color-bg-subtle)',
  borderRadius: 4,
  height: 24,
  width: '60%',
  animation: 'pulse 1.5s ease-in-out infinite',
};

const KPICard: React.FC<KPICardDef> = ({
  label,
  value,
  subLabel,
  icon,
  accentColor,
  iconBg,
  trendColor,
}) => (
  <div style={cardStyle}>
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        height: 3,
        background: accentColor,
        borderRadius: 'var(--radius-md) var(--radius-md) 0 0',
      }}
    />
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
      <div
        style={{
          width: 34,
          height: 34,
          borderRadius: 'var(--radius-sm)',
          background: iconBg,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        {icon}
      </div>
      <span
        style={{
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
          color: 'var(--color-text-secondary)',
          textTransform: 'uppercase',
          letterSpacing: '0.06em',
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </div>
    <div
      style={{
        fontSize: '2rem',
        fontWeight: 700,
        color: 'var(--color-text-primary)',
        lineHeight: 1,
        letterSpacing: '-0.02em',
      }}
    >
      {value}
    </div>
    <div
      style={{
        fontSize: 'var(--font-size-xs)',
        fontWeight: 500,
        color: trendColor ?? 'var(--color-text-muted)',
      }}
    >
      {subLabel}
    </div>
  </div>
);

export const AnalyticsKPIGrid: React.FC<Props> = ({ summary, loading }) => {
  if (loading) {
    return (
      <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} style={{ ...cardStyle, minHeight: 130 }}>
            <div style={{ ...skeletonStyle, width: '40%', height: 10 }} />
            <div style={{ ...skeletonStyle, width: '55%', height: 28 }} />
            <div style={{ ...skeletonStyle, width: '70%', height: 10 }} />
          </div>
        ))}
      </div>
    );
  }

  if (!summary) {
    return (
      <div
        style={{
          padding: '1.25rem',
          background: 'var(--color-bg-card)',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-md)',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
        }}
      >
        KPI data unavailable.
      </div>
    );
  }

  const fmt = (n: number, decimals = 0) =>
    isFinite(n) ? n.toFixed(decimals) : '--';

  const cards: KPICardDef[] = [
    {
      label: 'Observations',
      value:
        summary.total_observations >= 1_000_000
          ? (summary.total_observations / 1_000_000).toFixed(2) + 'M'
          : summary.total_observations.toLocaleString(),
      subLabel: `${summary.argo_model_comparisons.toLocaleString()} Argo–model comparisons`,
      icon: <Eye size={18} color="var(--color-ocean-blue)" strokeWidth={2} />,
      accentColor: 'var(--color-ocean-blue)',
      iconBg: 'var(--color-info-bg)',
    },
    {
      label: 'Temperature MAE',
      value: fmt(summary.temperature_mae, 3) + '°C',
      subLabel: `Bias: ${summary.temperature_bias >= 0 ? '+' : ''}${fmt(summary.temperature_bias, 3)}°C`,
      icon: <ShieldCheck size={18} color="var(--color-marine-teal)" strokeWidth={2} />,
      accentColor: 'var(--color-marine-teal)',
      iconBg: 'var(--color-success-bg)',
    },
    {
      label: 'Model Accuracy Score',
      value: fmt(summary.model_accuracy_score, 1) + '%',
      subLabel: 'GLORYS / Copernicus — derived score',
      icon: <BrainCircuit size={18} color="var(--color-cyan)" strokeWidth={2} />,
      accentColor: 'var(--color-cyan)',
      iconBg: '#E6F7FB',
      trendColor:
        summary.model_accuracy_score >= 90
          ? 'var(--color-success)'
          : 'var(--color-warning)',
    },
    {
      label: 'Temperature RMSE',
      value: fmt(summary.temperature_rmse, 3) + '°C',
      subLabel: 'Root Mean Square Error',
      icon: <TriangleAlert size={18} color="var(--color-warning)" strokeWidth={2} />,
      accentColor: 'var(--color-warning)',
      iconBg: 'var(--color-warning-bg)',
    },
  ];

  return (
    <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
      {cards.map((card) => (
        <KPICard key={card.label} {...card} />
      ))}
    </div>
  );
};
