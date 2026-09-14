import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { StatusBadge, StatusVariant } from '../feedback/StatusBadge';

export interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  subtitle?: string;
  changePercent?: number;
  changeDirection?: 'up' | 'down' | 'neutral';
  status?: string;
  statusVariant?: StatusVariant;
  icon?: React.ReactNode;
  trendDescription?: string;
  onClick?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  unit,
  subtitle,
  changePercent,
  changeDirection = 'neutral',
  status,
  statusVariant = 'neutral',
  icon,
  trendDescription,
  onClick,
}) => {
  const renderTrend = () => {
    if (changePercent === undefined) return null;

    const isUp = changeDirection === 'up';
    const isDown = changeDirection === 'down';
    const color = isUp ? 'var(--color-ocean-blue)' : isDown ? 'var(--color-warning)' : 'var(--color-text-muted)';
    const Icon = isUp ? ArrowUpRight : isDown ? ArrowDownRight : Minus;

    return (
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          color,
          fontSize: 'var(--font-size-xs)',
          fontWeight: 600,
        }}
      >
        <Icon size={14} />
        <span>{Math.abs(changePercent)}%</span>
      </div>
    );
  };

  return (
    <div
      onClick={onClick}
      style={{
        backgroundColor: 'var(--color-bg-card)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--color-border)',
        padding: 'var(--space-5)',
        boxShadow: 'var(--shadow-card)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast), border-color var(--transition-fast)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 'var(--space-3)' }}>
        <span
          style={{
            fontSize: 'var(--font-size-sm)',
            fontWeight: 500,
            color: 'var(--color-text-secondary)',
          }}
        >
          {title}
        </span>
        {icon ? (
          <div
            style={{
              padding: '6px',
              borderRadius: 'var(--radius-md)',
              backgroundColor: 'var(--color-light-blue)',
              color: 'var(--color-ocean-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {icon}
          </div>
        ) : status ? (
          <StatusBadge label={status} variant={statusVariant} size="sm" />
        ) : null}
      </div>

      <div style={{ display: 'flex', alignItems: 'baseline', gap: '6px', marginBottom: 'var(--space-2)' }}>
        <span
          style={{
            fontSize: 'var(--font-size-2xl)',
            fontWeight: 700,
            color: 'var(--color-text-primary)',
            letterSpacing: '-0.02em',
          }}
        >
          {value}
        </span>
        {unit && (
          <span
            style={{
              fontSize: 'var(--font-size-md)',
              fontWeight: 500,
              color: 'var(--color-text-secondary)',
            }}
          >
            {unit}
          </span>
        )}
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderTop: '1px solid var(--color-border-subtle)',
          paddingTop: 'var(--space-3)',
          marginTop: 'auto',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {renderTrend()}
          {trendDescription && (
            <span
              style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--color-text-muted)',
              }}
            >
              {trendDescription}
            </span>
          )}
        </div>
        {subtitle && !trendDescription && (
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
            {subtitle}
          </span>
        )}
      </div>
    </div>
  );
};
