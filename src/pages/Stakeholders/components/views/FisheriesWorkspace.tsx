import React, { useState, useEffect, useCallback } from 'react';
import { StakeholderConfig } from '../../data/stakeholderData';
import ScientificPanel from '../common/ScientificPanel';
import { HeroMetric, MetricRow } from '../common/MetricReadout';
import ActionButton from '../common/ActionButton';
import ActionModal from '../common/ActionModal';
import { stakeholderApiService, FisheriesData } from '../../services/stakeholderApi';
import StakeholderLoadingState from '../common/StakeholderLoadingState';
import StakeholderErrorState from '../common/StakeholderErrorState';

interface FisheriesWorkspaceProps {
  config: StakeholderConfig;
}

export const FisheriesWorkspace: React.FC<FisheriesWorkspaceProps> = ({ config }) => {
  const [selectedZone, setSelectedZone] = useState('zone_b');
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<FisheriesData | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await stakeholderApiService.getFisheriesData();
      setData(res);
      if (res.zones && res.zones.length > 0) {
        setSelectedZone(res.zones[0].id);
      }
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch fisheries ocean condition indicators from backend.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return <StakeholderLoadingState message="Loading ocean condition indicators..." subtext="Querying /api/stakeholder/fisheries" />;
  }

  if (error || !data) {
    return (
      <StakeholderErrorState
        title="Stakeholder data unavailable"
        endpoint="GET /api/stakeholder/fisheries"
        error={error || 'No data returned'}
        onRetry={loadData}
      />
    );
  }

  const zones = data.zones;
  const activeZoneObj = zones.find((z) => z.id === selectedZone) || zones[0];

  return (
    <div className="workspace-inner">
      {/* Notice Banner */}
      <div
        style={{
          background: 'var(--color-soft-aqua)',
          border: '1px solid rgba(8, 127, 234, 0.25)',
          borderRadius: '8px',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: 'var(--color-text-primary)',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ color: 'var(--color-ocean-blue)', fontWeight: 700 }}>ℹ Ocean Conditions Notice:</span>
          <span>{data.disclaimer}</span>
        </span>
        <span className="footer-disclaimer-pill">Environmental Conditions Only</span>
      </div>

      <div className="panels-grid">
        {/* Panel 1: Bay of Bengal 2D Ocean Status */}
        <ScientificPanel
          title="Bay of Bengal"
          tag="2D Ocean Map"
          meta="10°N–15°N, 85°E–90°E"
        >
          <div style={{ background: '#F8FBFE', border: '1px solid var(--color-border)', borderRadius: '8px', padding: '14px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
              <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>SURFACE GRID SUMMARY</span>
              <span className="metric-badge badge-normal">2D Sector Scan</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              <MetricRow label="Bathymetric Zone" value={data.sectorSummary.bathymetricZone} detail="-200m to -1000m" />
              <MetricRow label="Frontal Gradient" value={data.sectorSummary.frontalGradient} detail="Thermal front active" />
              <MetricRow label="Upwelling Velocity" value={data.sectorSummary.upwellingVelocity} badge="Ekman Pumping" badgeType="badge-normal" />
              <MetricRow label="Surface Turbidity" value={data.sectorSummary.turbidity} detail="Nominal" />
            </div>
          </div>

          <div style={{ padding: '10px 12px', background: 'var(--color-sky-blue)', borderRadius: '6px', border: '1px solid var(--color-border)', fontSize: '12px', color: 'var(--color-primary-navy)' }}>
            <strong>Selected Zone Profile:</strong> {activeZoneObj?.name} — <span style={{ color: 'var(--color-text-secondary)' }}>{activeZoneObj?.notes}</span>
          </div>
        </ScientificPanel>

        {/* Panel 2: Compact Condition Indicators */}
        <ScientificPanel
          title="Ocean Condition Indicators"
          tag="Marine Parameters"
          meta="Integrated Telemetry"
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <HeroMetric
                label="TEMPERATURE"
                value={data.indicators.temperature.replace('°C', '')}
                unit="°C"
                subtext="Thermal front"
                statusColor="var(--color-ocean-blue)"
              />
              <HeroMetric
                label="CHLOROPHYLL"
                value={data.indicators.chlorophyll.replace(' mg/m³', '')}
                unit="mg/m³"
                subtext="Productivity index"
                statusColor="var(--color-marine-teal)"
              />
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '6px' }}>
              <div style={{ background: '#F8FBFE', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>CURRENT</div>
                <div style={{ fontSize: '15px', fontWeight: 800 }}>{data.indicators.currentSpeed}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>NE drift</div>
              </div>
              <div style={{ background: '#F8FBFE', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>DEPTH</div>
                <div style={{ fontSize: '15px', fontWeight: 800 }}>{data.indicators.depthMld}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>Mixed layer</div>
              </div>
              <div style={{ background: '#F8FBFE', padding: '8px', borderRadius: '6px', border: '1px solid var(--color-border)' }}>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>ANOMALY</div>
                <div style={{ fontSize: '15px', fontWeight: 800, color: 'var(--color-success)' }}>{data.indicators.anomaly}</div>
                <div style={{ fontSize: '10px', color: 'var(--color-text-secondary)' }}>Baseline</div>
              </div>
            </div>
          </div>
        </ScientificPanel>

        {/* Panel 3: Potential Ocean-Condition Zones */}
        <ScientificPanel
          title="Potential Condition Zones"
          tag="Ocean-Condition Zones"
          meta={`${zones.length} Zones Defined`}
        >
          <table className="zones-table">
            <thead>
              <tr>
                <th>Zone</th>
                <th>Condition</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {zones.map((zone) => {
                const isSelected = selectedZone === zone.id;
                return (
                  <tr
                    key={zone.id}
                    style={isSelected ? { background: '#F8FBFE' } : {}}
                  >
                    <td style={{ fontWeight: 700, color: 'var(--color-text-primary)', fontSize: '12px' }}>
                      {zone.name.split(' (')[0]}
                    </td>
                    <td>
                      <span className={`metric-badge ${zone.badge}`}>
                        {zone.condition}
                      </span>
                    </td>
                    <td>
                      <button
                        type="button"
                        className={`action-btn ${isSelected ? 'btn-primary' : ''}`}
                        style={{ padding: '3px 8px', fontSize: '10.5px' }}
                        onClick={() => setSelectedZone(zone.id)}
                      >
                        {isSelected ? 'Active' : 'Select'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div style={{ marginTop: '8px', fontSize: '11.5px', color: 'var(--color-text-secondary)', lineHeight: '1.4' }}>
            Zones categorize oceanographic parameters like thermal gradients and mixed layer stability.
          </div>
        </ScientificPanel>
      </div>

      {/* Fisheries Action Bar */}
      <div className="workspace-action-bar" style={{ marginTop: '16px' }}>
        <span className="action-bar-label">Marine Advisory Deliverables:</span>
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
        isOpen={activeModal === 'generate_advisory'}
        onClose={() => setActiveModal(null)}
        title="Ocean Condition Advisory"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Operational ocean condition bulletin for maritime stakeholders and coastal fleet safety.
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px' }}>
          <div><strong>Active Zone:</strong> {activeZoneObj?.name}</div>
          <div><strong>Ocean Condition:</strong> {activeZoneObj?.condition}</div>
          <div><strong>SST Thermal Front:</strong> {data.indicators.temperature}</div>
          <div><strong>Chlorophyll Index:</strong> {data.indicators.chlorophyll}</div>
          <div style={{ color: 'var(--color-ocean-blue)', fontWeight: 600, marginTop: '8px' }}>
            Notice: Environmental conditions assessment only. Does not predict fish biomass.
          </div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={activeModal === 'print_bulletin'}
        onClose={() => setActiveModal(null)}
        title="Print Ocean Condition Bulletin"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Official ocean state report formatted for maritime dissemination.
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px' }}>
          <div><strong>Bulletin ID:</strong> OC-ADVISORY-{new Date().toISOString().slice(0, 10)}</div>
          <div><strong>Status:</strong> Ready for export / transmission.</div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={activeModal === 'inspect_fronts'}
        onClose={() => setActiveModal(null)}
        title="Inspect Ocean Thermal Fronts"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          High-gradient surface boundary detection from high-resolution SST maps.
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px' }}>
          <div><strong>Front Intensity:</strong> {data.sectorSummary.frontalGradient}</div>
          <div><strong>Upwelling:</strong> {data.sectorSummary.upwellingVelocity}</div>
        </div>
      </ActionModal>
    </div>
  );
};

export default FisheriesWorkspace;
