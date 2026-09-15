import React from 'react';
import { InsightItem } from '../../../types/analytics';

interface Props {
  insights: InsightItem[];
}

export const RecentInsightsPanel: React.FC<Props> = ({ insights }) => {
  return (
    <div
      style={{
        background: '#fff',
        border: '1px solid #DCE5EF',
        borderRadius: '10px',
        padding: '1.25rem',
        flex: '1 1 300px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Recent Analytical Insights
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {insights.map((insight) => (
          <div key={insight.id} style={{ display: 'flex', gap: '0.8rem', alignItems: 'flex-start' }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: '50%',
                background: '#F6F8FB',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
                color: '#087FEA',
                fontWeight: 700,
                fontSize: '0.8rem',
              }}
            >
              {insight.category === 'trend' ? '📈' : insight.category === 'alert' ? '⚠️' : '🎯'}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                <span style={{ fontWeight: 700, fontSize: '0.825rem', color: '#0B2A4A' }}>
                  {insight.title}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#9CA3AF' }}>
                  {new Date(insight.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' })}
                </span>
              </div>
              <div style={{ fontSize: '0.75rem', color: '#5a7184', lineHeight: 1.5 }}>
                {insight.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
