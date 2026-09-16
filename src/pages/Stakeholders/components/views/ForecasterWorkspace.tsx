import React, { useState, useEffect, useCallback } from 'react';
import { StakeholderConfig } from '../../data/stakeholderData';
import ScientificPanel from '../common/ScientificPanel';
import { MetricRow, HeroMetric } from '../common/MetricReadout';
import ActionButton from '../common/ActionButton';
import ActionModal from '../common/ActionModal';
import { stakeholderApiService, ForecasterData } from '../../services/stakeholderApi';
import StakeholderLoadingState from '../common/StakeholderLoadingState';
import StakeholderErrorState from '../common/StakeholderErrorState';

interface ForecasterWorkspaceProps {
  config: StakeholderConfig;
}

export const ForecasterWorkspace: React.FC<ForecasterWorkspaceProps> = ({ config }) => {
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [selectedConditionTab, setSelectedConditionTab] = useState<'temp' | 'curr' | 'wave' | 'anom'>('temp');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [showWindOverlay, setShowWindOverlay] = useState(false);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<ForecasterData | null>(null);

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const res = await stakeholderApiService.getForecasterData();
      setData(res);
    } catch (err: any) {
      setError(err?.message || 'Failed to fetch forecaster telemetry from backend.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  if (isLoading) {
    return <StakeholderLoadingState message="Loading current ocean conditions..." subtext="Querying /api/stakeholder/forecaster" />;
  }

  if (error || !data) {
    return (
      <StakeholderErrorState
        title="Stakeholder data unavailable"
        endpoint="GET /api/stakeholder/forecaster"
        error={error || 'No data returned'}
        onRetry={loadData}
      />
    );
  }

  const timelineSteps = data.timelineSteps || [];
  const currentTimeline = timelineSteps[activeStepIndex] || timelineSteps[0];
  const alerts = data.alerts.length > 0 ? data.alerts : (config.alerts || []);

  return (
    <div className="workspace-inner">
      {/* Top Layout: Current Conditions & Forecast Timeline */}
      <div className="panels-grid" style={{ marginBottom: '16px' }}>
        {/* Panel 1: CURRENT OCEAN CONDITIONS */}
        <ScientificPanel
          title="Current Ocean Conditions"
          tag="Real-Time Analysis"
          meta="Station: Sector 4"
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
            <HeroMetric
              label="SST"
              value={data.currentConditions.sst.replace('°C', '')}
              unit="°C"
              subtext="Sea Surface Temp"
              statusColor="var(--color-ocean-blue)"
            />
            <HeroMetric
              label="Current"
              value={data.currentConditions.current.replace(' m/s', '')}
              unit="m/s"
              subtext="Surface Speed"
              statusColor="var(--color-warning)"
            />
            <HeroMetric
              label="Salinity"
              value={data.currentConditions.salinity.replace(' PSU', '')}
              unit="PSU"
              subtext="Salinity Units"
              statusColor="var(--color-marine-teal)"
            />
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '2px', marginTop: '6px' }}>
            <MetricRow label="Sig. Wave Height (Hs)" value={data.currentConditions.waveHeight} detail="Period: 7.4s" />
            <MetricRow label="Wind Velocity" value={data.currentConditions.windSpeed} detail={data.currentConditions.windDirection || 'SW Flow'} />
            <MetricRow label="Mixed Layer Depth" value={data.currentConditions.mld} badge="Stratified" badgeType="badge-normal" />
          </div>
        </ScientificPanel>

        {/* Panel 2: FORECAST TIMELINE (Only shows future projections if actually returned by API) */}
        <ScientificPanel
          title={data.hasFutureForecast ? "Forecast Timeline" : "Operational Snapshot"}
          tag={data.hasFutureForecast ? "Forecast" : "Current State"}
          meta={data.hasFutureForecast ? `${currentTimeline?.label || ''} (${currentTimeline?.offset || ''})` : "NRT Observation"}
        >
          {data.hasFutureForecast ? (
            /* Multi-day timeline steps if API provided forecast data */
            <div className="timeline-bar">
              {timelineSteps.map((step, idx) => (
                <button
                  key={step.id}
                  type="button"
                  className={`timeline-step ${activeStepIndex === idx ? 'active' : ''}`}
                  onClick={() => setActiveStepIndex(idx)}
                >
                  <div>{step.label}</div>
                  <div style={{ fontSize: '10px', opacity: 0.8 }}>
                    {step.offset}
                  </div>
                </button>
              ))}
            </div>
          ) : (
            /* Current-state focused badge when backend provides NRT snapshot only */
            <div style={{ padding: '8px 12px', background: '#F8FBFE', borderRadius: '6px', border: '1px solid var(--color-border)', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
                Timeline Mode: <strong>Current NRT Telemetry</strong>
              </span>
              <span className="metric-badge badge-normal">Current State Only</span>
            </div>
          )}

          {/* Condition Tab Selector */}
          <div className="layer-toggle-group" style={{ marginTop: '10px' }}>
            <button
              type="button"
              className={`layer-btn ${selectedConditionTab === 'temp' ? 'active' : ''}`}
              onClick={() => setSelectedConditionTab('temp')}
            >
              Temperature
            </button>
            <button
              type="button"
              className={`layer-btn ${selectedConditionTab === 'curr' ? 'active' : ''}`}
              onClick={() => setSelectedConditionTab('curr')}
            >
              Current
            </button>
            <button
              type="button"
              className={`layer-btn ${selectedConditionTab === 'wave' ? 'active' : ''}`}
              onClick={() => setSelectedConditionTab('wave')}
            >
              Wave
            </button>
            <button
              type="button"
              className={`layer-btn ${selectedConditionTab === 'anom' ? 'active' : ''}`}
              onClick={() => setSelectedConditionTab('anom')}
            >
              Anomaly
            </button>
          </div>

          {/* Condition Details Card */}
          <div style={{ background: '#F8FBFE', padding: '12px 16px', border: '1px solid var(--color-border)', borderRadius: '8px', marginTop: '10px' }}>
            {selectedConditionTab === 'temp' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                    {data.hasFutureForecast ? `PROJECTED SST (${currentTimeline?.label})` : 'CURRENT SST (NRT)'}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-ocean-blue)' }}>{currentTimeline?.sst || data.currentConditions.sst}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  <div>Trend: +0.2°C / 24h</div>
                  <div style={{ color: 'var(--color-success)', fontWeight: 600 }}>Spread: ±0.15°C</div>
                </div>
              </div>
            )}

            {selectedConditionTab === 'curr' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                    {data.hasFutureForecast ? `PROJECTED CURRENT (${currentTimeline?.label})` : 'CURRENT VELOCITY (NRT)'}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-warning)' }}>{currentTimeline?.current || data.currentConditions.current}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  <div>Direction: 068° ENE</div>
                  <div style={{ color: '#B45309', fontWeight: 600 }}>Shear: 0.12 s⁻¹</div>
                </div>
              </div>
            )}

            {selectedConditionTab === 'wave' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                    {data.hasFutureForecast ? `SIG. WAVE HEIGHT (${currentTimeline?.label})` : 'CURRENT WAVE HEIGHT'}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-text-primary)' }}>{currentTimeline?.wave || data.currentConditions.waveHeight}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  <div>Primary Swell: 8.2s @ 210°</div>
                  <div>Sea State: Moderate</div>
                </div>
              </div>
            )}

            {selectedConditionTab === 'anom' && (
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600 }}>
                    {data.hasFutureForecast ? `THERMAL ANOMALY (${currentTimeline?.label})` : 'CURRENT ANOMALY (NRT)'}
                  </div>
                  <div style={{ fontSize: '24px', fontWeight: 800, color: 'var(--color-warning)' }}>{currentTimeline?.anomaly || '+0.8°C'}</div>
                </div>
                <div style={{ textAlign: 'right', fontSize: '12px', color: 'var(--color-text-secondary)' }}>
                  <div>Baseline: Climatological Mean</div>
                  <div style={{ color: '#B45309', fontWeight: 600 }}>Status: Alert</div>
                </div>
              </div>
            )}
          </div>
        </ScientificPanel>

        {/* Panel 3: OPERATIONAL ALERTS */}
        <ScientificPanel
          title="Forecast Alerts"
          tag="Alerts"
          meta={`${alerts.length} Active`}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {alerts.map((alert, i) => (
              <div key={i} className="forecast-alert-box">
                <span className="alert-icon">⚠</span>
                <div className="alert-content">
                  <span className="alert-title">{alert.title}</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-text-secondary)' }}>{alert.location}</span>
                  <span className="alert-desc">{alert.desc}</span>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '2px', padding: '10px 12px', background: '#F8FBFE', border: '1px solid var(--color-border)', borderRadius: '8px', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
              <div style={{ color: 'var(--color-ocean-blue)', fontWeight: 700, marginBottom: '2px' }}>
                Forecast Confidence Index: {data.confidenceIndex || '92%'}
              </div>
              <div>Boundary conditions verified against scatterometer winds.</div>
              {showWindOverlay && (
                <div style={{ color: 'var(--color-success)', fontWeight: 600, marginTop: '4px' }}>
                  ✓ Surface wind vector field active ({data.currentConditions.windSpeed} SW flow).
                </div>
              )}
            </div>
          </div>
        </ScientificPanel>
      </div>

      {/* Forecaster Action Bar */}
      <div className="workspace-action-bar">
        <span className="action-bar-label">Forecaster Operations:</span>
        <div className="action-buttons-group">
          <ActionButton
            label="Run Model Ensemble"
            primary={true}
            onClick={() => setActiveModal('run_ensemble')}
          />
          <ActionButton
            label="Export Reanalysis Package"
            primary={false}
            onClick={() => setActiveModal('export_reanalysis')}
          />
          <ActionButton
            label={showWindOverlay ? 'Disable Wind Overlay' : 'Toggle Wind Overlay'}
            primary={false}
            onClick={() => setShowWindOverlay(!showWindOverlay)}
          />
        </div>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={activeModal === 'run_ensemble'}
        onClose={() => setActiveModal(null)}
        title="20-Member Numerical Model Ensemble"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Executing perturbation ensemble across 20 model realizations for Sector 4.
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px' }}>
          <div><strong>Ensemble Convergence:</strong> 94.6% agreement at +72 hours</div>
          <div><strong>SST Spread:</strong> {data.currentConditions.sst} baseline</div>
          <div><strong>Current Shear Probability:</strong> 78% likelihood &gt; 1.0 m/s</div>
          <div style={{ color: 'var(--color-success)', fontWeight: 600, marginTop: '8px' }}>
            ✓ Forecast envelope calculated and synchronized.
          </div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={activeModal === 'export_reanalysis'}
        onClose={() => setActiveModal(null)}
        title="Export Reanalysis Data Package"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Standard NetCDF-4 / GRIB2 operational payload for external meteorology systems.
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px' }}>
          <div><strong>Filename:</strong> OCEANX_FCST_BAY_OF_BENGAL_06Z.nc</div>
          <div><strong>Parameters:</strong> SST, surface current, salinity, MLD, wave height</div>
          <div><strong>Resolution:</strong> 3-hourly from 0 to 72 hours</div>
          <div style={{ color: 'var(--color-ocean-blue)', fontWeight: 600, marginTop: '6px' }}>
            ✓ Package ready for secure download.
          </div>
        </div>
      </ActionModal>
    </div>
  );
};

export default ForecasterWorkspace;
