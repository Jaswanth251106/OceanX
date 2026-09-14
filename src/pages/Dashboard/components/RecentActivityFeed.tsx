import React from 'react';
import { DashboardActivityItem } from '../../../types/dashboard';
import { Activity, RefreshCw, AlertTriangle, Radio, Waves, Clock } from 'lucide-react';

export interface RecentActivityFeedProps {
  activities: DashboardActivityItem[];
}

export const RecentActivityFeed: React.FC<RecentActivityFeedProps> = ({ activities }) => {
  const getActivityIcon = (type: DashboardActivityItem['type']) => {
    switch (type) {
      case 'argo':
        return <Activity size={15} color="var(--color-ocean-blue)" />;
      case 'sync':
        return <RefreshCw size={15} color="var(--color-success)" />;
      case 'alert':
        return <AlertTriangle size={15} color="var(--color-warning)" />;
      case 'station':
        return <Radio size={15} color="var(--color-info)" />;
      case 'forecast':
        return <Waves size={15} color="var(--color-ocean-blue)" />;
      default:
        return <Clock size={15} color="var(--color-text-secondary)" />;
    }
  };

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
          <h3
            style={{
              fontSize: 'var(--font-size-base)',
              fontWeight: 600,
              color: 'var(--color-text-primary)',
            }}
          >
            Recent Platform Activity
          </h3>
          <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
            Real-time feed events from distributed in-situ arrays
          </p>
        </div>
        <span
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
          }}
        >
          <Clock size={12} />
          <span>Live Stream</span>
        </span>
      </div>

      {/* Timeline List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {activities.map((item, idx) => {
          const isLast = idx === activities.length - 1;
          return (
            <div
              key={item.id}
              style={{
                display: 'flex',
                gap: '12px',
                position: 'relative',
              }}
            >
              {/* Timeline marker with icon */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div
                  style={{
                    width: '30px',
                    height: '30px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-light-blue)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 1,
                  }}
                >
                  {getActivityIcon(item.type)}
                </div>
                {!isLast && (
                  <div
                    style={{
                      width: '2px',
                      flex: 1,
                      backgroundColor: 'var(--color-border-subtle)',
                      marginTop: '4px',
                    }}
                  />
                )}
              </div>

              {/* Event content */}
              <div
                style={{
                  flex: 1,
                  paddingBottom: isLast ? 0 : 'var(--space-3)',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '8px' }}>
                  <span
                    style={{
                      fontSize: 'var(--font-size-sm)',
                      fontWeight: 600,
                      color: 'var(--color-text-primary)',
                      lineHeight: 1.3,
                    }}
                  >
                    {item.title}
                  </span>
                  <span
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-muted)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {item.timestamp}
                  </span>
                </div>

                {item.details && (
                  <p
                    style={{
                      fontSize: 'var(--font-size-xs)',
                      color: 'var(--color-text-secondary)',
                      marginTop: '4px',
                    }}
                  >
                    {item.details}
                  </p>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
