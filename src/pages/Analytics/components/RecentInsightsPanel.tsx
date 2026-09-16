import React from 'react';
import { TrendingUp } from 'lucide-react';

/**
 * Recent Analytical Insights
 *
 * No dedicated API endpoint exists for insights in the current backend handoff.
 * This component shows a clean empty/unavailable state.
 * When a backend endpoint is provided later, connect it here.
 */

export const RecentInsightsPanel: React.FC = () => {
  return (
    <div
      style={{
        background: 'var(--color-bg-card)',
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-md)',
        padding: '1.25rem 1.5rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        boxShadow: 'var(--shadow-card)',
      }}
    >
      {/* Section header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 'var(--radius-sm)',
              background: 'var(--color-info-bg)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <TrendingUp size={16} color="var(--color-ocean-blue)" strokeWidth={2} />
          </div>
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 'var(--font-size-sm)',
                color: 'var(--color-text-primary)',
                lineHeight: 1.2,
              }}
            >
              Recent Analytical Insights
            </div>
            <div style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-muted)' }}>
              Latest model & observational findings
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ height: 1, background: 'var(--color-border-subtle)' }} />

      {/* Empty state — no backend endpoint available */}
      <div
        style={{
          textAlign: 'center',
          padding: '2rem 1rem',
          color: 'var(--color-text-muted)',
          fontSize: 'var(--font-size-sm)',
          lineHeight: 1.6,
        }}
      >
        <div style={{ marginBottom: '0.5rem', fontSize: '1.5rem' }}>📊</div>
        <div>No analytical insights available at this time.</div>
        <div style={{ fontSize: 'var(--font-size-xs)', marginTop: '0.35rem' }}>
          Insights will appear here when backend analytics processing is connected.
        </div>
      </div>
    </div>
  );
};
