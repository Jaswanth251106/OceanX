import React, { useState, useEffect, useCallback } from 'react';
import { StakeholderConfig } from '../../data/stakeholderData';
import ScientificPanel from '../common/ScientificPanel';
import ActionButton from '../common/ActionButton';
import ActionModal from '../common/ActionModal';
import { stakeholderApiService, PolicymakerData } from '../../services/stakeholderApi';
import StakeholderLoadingState from '../common/StakeholderLoadingState';
import StakeholderErrorState from '../common/StakeholderErrorState';

interface PolicymakerWorkspaceProps {
  config: StakeholderConfig;
}

export const PolicymakerWorkspace: React.FC<PolicymakerWorkspaceProps> = ({ config }) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('All Indian Ocean');

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<PolicymakerData | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await stakeholderApiService.getPolicymakerData();
      setData(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch regional policymaker synthesis from backend.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return <StakeholderLoadingState message="Loading regional status..." subtext="Querying /api/stakeholder/policymaker" />;
  }

  if (error || !data) {
    return (
      <StakeholderErrorState
        title="Stakeholder data unavailable"
        endpoint="GET /api/stakeholder/policymaker"
        error={error || 'No data returned'}
        onRetry={loadData}
      />
    );
  }

  const statusMatrix = data.statusMatrix;
  const regionalAlerts = data.regionalAlerts;

  return (
    <div className="workspace-inner">
      <div className="panels-grid">
        {/* Panel 1: INDIAN OCEAN STATUS */}
        <ScientificPanel
          title="Indian Ocean Status"
          tag="Executive Summary"
          meta="Regional Synthesis"
        >
          <table className="policy-status-table">
            <tbody>
              {statusMatrix.map((item, idx) => (
                <tr key={idx}>
                  <td style={{ fontWeight: 700, color: 'var(--color-text-primary)', width: '38%' }}>
                    {item.metric}
                  </td>
                  <td style={{ width: '28%' }}>
                    <span className={`metric-badge ${item.badge}`}>
                      {item.state}
                    </span>
                  </td>
                  <td style={{ fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                    {item.detail}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div style={{ padding: '10px 12px', background: '#F8FBFE', border: '1px solid var(--color-border)', borderRadius: '8px', marginTop: '6px', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
            <span style={{ color: 'var(--color-primary-navy)', fontWeight: 700 }}>Executive Note: </span>
            Thermal baseline is elevating moderately; ecosystem primary productivity exhibits seasonal contraction. Physical circulation remains within nominal limits.
          </div>
        </ScientificPanel>

        {/* Panel 2: REGIONAL ALERTS */}
        <ScientificPanel
          title="Regional Alerts"
          tag="Surveillance"
          meta={`${regionalAlerts.length} Maritime Zones`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {regionalAlerts.map((alert, idx) => (
              <div
                key={idx}
                style={{
                  background: '#F8FBFE',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '12px 14px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '4px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '13px' }}>
                    {alert.region}
                  </span>
                  <span className={`metric-badge ${alert.badge}`}>
                    {alert.level} Alert
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.45' }}>
                  {alert.advisory}
                </div>
              </div>
            ))}
          </div>
        </ScientificPanel>

        {/* Panel 3: RECENT CLIMATOLOGICAL TREND */}
        <ScientificPanel
          title="Recent Thermal Anomaly Trend"
          tag="Recent Trend"
          meta={data.recentTrend?.baselineLabel || "Current Operational Cycle"}
        >
          <div className="trend-graph-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, marginBottom: '6px' }}>
              <span>Thermal Anomaly Profile (°C)</span>
              <span style={{ color: '#B45309', fontWeight: 700 }}>{data.recentTrend?.anomalyDelta || "+0.8°C Delta"}</span>
            </div>

            <svg viewBox="0 0 320 100" style={{ width: '100%', height: '90px' }}>
              <defs>
                <linearGradient id="policyTrendGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#F59E0B" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#087FEA" stopOpacity="0.02" />
                </linearGradient>
              </defs>

              <line x1="20" y1="20" x2="300" y2="20" stroke="#E5484D" strokeWidth="1.2" strokeDasharray="3 3" />
              <text x="175" y="16" fill="#B91C1C" fontSize="8.5" fontWeight="700">
                +1.0°C Policy Advisory Threshold
              </text>

              <line x1="20" y1="70" x2="300" y2="70" stroke="var(--color-border)" strokeWidth="1" />
              <text x="2" y="73" fill="var(--color-text-secondary)" fontSize="8">0.0°</text>
              <text x="2" y="32" fill="var(--color-text-secondary)" fontSize="8">+0.8°</text>

              <path
                d="M 20,74 Q 60,70 100,65 T 180,52 T 250,40 L 300,32 L 300,70 L 20,70 Z"
                fill="url(#policyTrendGrad)"
              />
              <path
                d="M 20,74 Q 60,70 100,65 T 180,52 T 250,40 L 300,32"
                fill="none"
                stroke="var(--color-ocean-blue)"
                strokeWidth="2.5"
              />

              <circle cx="300" cy="32" r="5" fill="var(--color-ocean-blue)" stroke="#FFFFFF" strokeWidth="1.8" />

              <text x="20" y="86" fill="var(--color-text-secondary)" fontSize="8.5">Recent-Q1</text>
              <text x="105" y="86" fill="var(--color-text-secondary)" fontSize="8.5">Recent-Q2</text>
              <text x="195" y="86" fill="var(--color-text-secondary)" fontSize="8.5">Recent-Q3</text>
              <text x="280" y="86" fill="var(--color-text-secondary)" fontSize="8.5">Current</text>
            </svg>
          </div>

          <div style={{ marginTop: '10px', fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.5' }}>
            {data.recentTrend?.narrative || 'Regional warming observed in recent operational cycles, contributing to heightened seasonal stratification in shallow coastal mixed layers.'}
          </div>
        </ScientificPanel>
      </div>

      {/* Action Bar */}
      <div className="workspace-action-bar" style={{ marginTop: '16px' }}>
        <span className="action-bar-label">Executive Deliverables:</span>
        <div className="action-buttons-group">
          {config.actions.map((act) => (
            <ActionButton
              key={act.id}
              label={act.label}
              primary={act.primary}
              onClick={() => setActiveModal(act.id)}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={activeModal === 'download_brief'}
        onClose={() => setActiveModal(null)}
        title="Executive Policy Briefing: Northern Indian Ocean Marine Status"
      >
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', lineHeight: '1.6' }}>
          <div style={{ background: '#F8FBFE', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '12px' }}>
            <div style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-primary-navy)', marginBottom: '4px' }}>
              EXECUTIVE BRIEFING · REPORT ID: POL-OCN-2026-Q3
            </div>
            <div><strong>Recipient:</strong> Ministry of Earth Sciences / Maritime Environmental Authority</div>
            <div><strong>Status:</strong> Formal Synthesis Briefing</div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>1. Key Strategic Finding:</strong> Sea surface temperature anomalies have reached +0.8°C in Sector 4 of the Bay of Bengal, approaching the regional thermal stress advisory threshold.
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>2. Ecological & Fisheries Impact:</strong> Primary productivity (chlorophyll-a) exhibits a seasonal downturn due to upper-layer thermal capping.
            </div>
            <div>
              <strong style={{ color: 'var(--color-text-primary)' }}>3. Recommended Policy Actions:</strong>
              <ul style={{ paddingLeft: '20px', marginTop: '4px' }}>
                <li>Maintain inter-agency surveillance on coastal upwelling zones.</li>
                <li>Coordinate regional automated sensor float redeployment in high-shear corridors.</li>
                <li>Commission quarterly cross-jurisdictional environmental reviews.</li>
              </ul>
            </div>
            <div style={{ marginTop: '10px', padding: '10px 12px', background: 'var(--color-sky-blue)', border: '1px solid var(--color-border)', borderRadius: '6px', color: 'var(--color-primary-navy)', fontWeight: 600 }}>
              ✓ PDF package ready: OCEANX_POLICY_BRIEF_Q3_2026.pdf (1.4 MB)
            </div>
          </div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={activeModal === 'filter_region'}
        onClose={() => setActiveModal(null)}
        title="Filter by Maritime Jurisdiction"
      >
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {['All Indian Ocean', 'Bay of Bengal EEZ', 'Arabian Sea Corridor', 'Andaman Sea Basin'].map((j) => (
            <button
              key={j}
              type="button"
              className={`action-btn ${selectedJurisdiction === j ? 'btn-primary' : ''}`}
              onClick={() => setSelectedJurisdiction(j)}
            >
              {j}
            </button>
          ))}
        </div>
        <div style={{ fontSize: '12px', color: 'var(--color-text-secondary)', marginTop: '10px' }}>
          Currently displaying regional metrics for: <strong style={{ color: 'var(--color-ocean-blue)' }}>{selectedJurisdiction}</strong>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={activeModal === 'share_summary'}
        onClose={() => setActiveModal(null)}
        title="Share Executive Summary"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Direct secure link to stakeholder dashboard with current snapshot values:
        </p>
        <div style={{ background: '#F8FBFE', padding: '12px', borderRadius: '6px', border: '1px solid var(--color-border)', fontFamily: 'var(--font-family-mono, monospace)', fontSize: '11px', color: 'var(--color-ocean-blue)' }}>
          https://oceanx.ops.marine.gov/briefing/snapshot?mode=policymaker&token=sim-7f89b1
        </div>
      </ActionModal>
    </div>
  );
};

export default PolicymakerWorkspace;
