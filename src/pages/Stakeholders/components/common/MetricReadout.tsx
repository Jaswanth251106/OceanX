import React from 'react';

interface MetricRowProps {
  label: string;
  value: string;
  unit?: string;
  badge?: string;
  badgeType?: string;
  detail?: string;
}

export const MetricRow: React.FC<MetricRowProps> = ({
  label,
  value,
  unit,
  badge,
  badgeType = 'badge-normal',
  detail,
}) => {
  return (
    <div className="metric-row">
      <div className="metric-label">
        <span>{label}</span>
        {detail && <span style={{ color: 'var(--color-text-secondary)', fontSize: '9.5px' }}>({detail})</span>}
      </div>
      <div className="metric-value-group">
        <span className="metric-value">{value}</span>
        {unit && <span className="metric-unit">{unit}</span>}
        {badge && <span className={`metric-badge ${badgeType}`}>{badge}</span>}
      </div>
    </div>
  );
};

interface HeroMetricProps {
  label: string;
  value: string;
  unit?: string;
  subtext?: string;
  statusColor?: string;
}

export const HeroMetric: React.FC<HeroMetricProps> = ({
  label,
  value,
  unit,
  subtext,
  statusColor,
}) => {
  return (
    <div className="hero-readout" style={statusColor ? { borderLeftColor: statusColor } : {}}>
      <span className="hero-readout-label">{label}</span>
      <div className="hero-readout-num">
        <span>{value}</span>
        {unit && <span className="metric-unit" style={{ fontSize: '12px' }}>{unit}</span>}
      </div>
      {subtext && <div className="hero-readout-sub">{subtext}</div>}
    </div>
  );
};
