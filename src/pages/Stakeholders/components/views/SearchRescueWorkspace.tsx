import React, { useState } from 'react';
import { StakeholderConfig } from '../../data/stakeholderData';
import ScientificPanel from '../common/ScientificPanel';
import { MetricRow, HeroMetric } from '../common/MetricReadout';
import ActionButton from '../common/ActionButton';
import ActionModal from '../common/ActionModal';
import { stakeholderApiService, SarDriftData, SarTrajectoryPoint } from '../../services/stakeholderApi';
import StakeholderErrorState from '../common/StakeholderErrorState';

interface SearchRescueWorkspaceProps {
  config: StakeholderConfig;
}

export const SearchRescueWorkspace: React.FC<SearchRescueWorkspaceProps> = ({ config }) => {
  // Incident input states (allows user to enter/change incident data)
  const [latInput, setLatInput] = useState<number>(12.45);
  const [lonInput, setLonInput] = useState<number>(88.30);
  const [durationHours, setDurationHours] = useState<number>(14.5);
  const [startTime, setStartTime] = useState<string>('06:15');
  const [leewayPercent, setLeewayPercent] = useState<number>(3.2);

  // Simulation & API states
  const [simStep, setSimStep] = useState<number>(3);
  const [isSimulating, setIsSimulating] = useState<boolean>(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [apiError, setApiError] = useState<string | null>(null);

  // Active drift data state (defaults to initial baseline, updated via POST)
  const [driftData, setDriftData] = useState<SarDriftData>({
    lkp: {
      lat: `${latInput.toFixed(2)}°N`,
      lon: `${lonInput.toFixed(2)}°E`,
      timestamp: `${startTime} UTC (Recorded)`,
    },
    calculatedSearchArea: '2,340 km²',
    displacement: '44.2 km total displacement',
    factors: {
      current: '0.85 m/s @ 072°',
      timeElapsed: '14h 30m',
      driftEstimate: '44.2 km total displacement',
      windVector: '14 kt from 245° (SW)',
      leewayDivergence: '±18° sector angle',
    },
    driftPoints: [
      { label: 'T+0h (LKP)', x: 70, y: 50, lat: '12.45°N', lon: '88.30°E' },
      { label: 'T+6h', x: 140, y: 85, lat: '12.58°N', lon: '88.48°E' },
      { label: 'T+12h', x: 210, y: 125, lat: '12.71°N', lon: '88.66°E' },
      { label: 'T+14.5h (Datum)', x: 270, y: 160, lat: '12.82°N', lon: '88.82°E' },
    ],
    disclaimer: config.disclaimer || 'Calculated drift vector based on illustrative leeway models. Decision support only; does not guarantee target location.',
  });

  // Execute Drift Simulation POST Request
  const handleRunSimulation = async () => {
    setIsSimulating(true);
    setApiError(null);
    setSimStep(0);

    try {
      const result = await stakeholderApiService.runSearchRescueDrift({
        latitude: latInput,
        longitude: lonInput,
        durationHours,
        startTime,
        leewayPercent,
      });
      setDriftData(result);
    } catch (err: any) {
      setApiError(err?.message || 'Search and Rescue drift calculation endpoint unavailable.');
    } finally {
      // Run sequential trajectory animation across simulation steps
      let step = 0;
      const timer = setInterval(() => {
        step += 1;
        if (step <= 3) {
          setSimStep(step);
        } else {
          setIsSimulating(false);
          clearInterval(timer);
        }
      }, 700);
    }
  };

  const driftPoints: SarTrajectoryPoint[] = driftData.driftPoints;
  const currentPt = driftPoints[Math.min(simStep, driftPoints.length - 1)] || driftPoints[0];

  return (
    <div className="workspace-inner">
      {/* Disclaimer Banner */}
      <div
        style={{
          background: '#FEE2E2',
          border: '1px solid #FCA5A5',
          borderRadius: '8px',
          padding: '10px 16px',
          marginBottom: '16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          fontSize: '12px',
          color: '#991B1B',
        }}
      >
        <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ fontWeight: 700 }}>⚠ SAR Operations Mandate:</span>
          <span>{driftData.disclaimer}</span>
        </span>
        <span className="footer-disclaimer-pill" style={{ background: '#FEF2F2', borderColor: '#F87171', color: '#B91C1C' }}>
          Decision Support Only
        </span>
      </div>

      {apiError && (
        <StakeholderErrorState
          title="SAR Drift Simulation Unavailable"
          endpoint="POST /api/stakeholder/search-rescue/drift"
          error={apiError}
          onRetry={handleRunSimulation}
        />
      )}

      <div className="panels-grid-1-2">
        {/* Left Column: LKP & Search Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Panel 1: Last Known Position with Editable Incident Inputs */}
          <ScientificPanel
            title="Last Known Position & Incident Inputs"
            tag="Origin Datum"
            meta={`${startTime} UTC`}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                  Latitude (°N)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={latInput}
                  onChange={(e) => setLatInput(parseFloat(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--color-primary-navy)',
                    background: '#FFFFFF',
                  }}
                  disabled={isSimulating}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                  Longitude (°E)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={lonInput}
                  onChange={(e) => setLonInput(parseFloat(e.target.value) || 0)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontSize: '13px',
                    fontWeight: 700,
                    color: 'var(--color-primary-navy)',
                    background: '#FFFFFF',
                  }}
                  disabled={isSimulating}
                />
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', marginTop: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                  Start Time (UTC)
                </label>
                <input
                  type="text"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: '#FFFFFF',
                  }}
                  disabled={isSimulating}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                  Elapsed (Hours)
                </label>
                <input
                  type="number"
                  step="0.5"
                  min="1"
                  max="72"
                  value={durationHours}
                  onChange={(e) => setDurationHours(parseFloat(e.target.value) || 1)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: '#FFFFFF',
                  }}
                  disabled={isSimulating}
                />
              </div>
              <div>
                <label style={{ fontSize: '11px', color: 'var(--color-text-secondary)', fontWeight: 600, display: 'block', marginBottom: '2px' }}>
                  Leeway (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  min="0.5"
                  max="10"
                  value={leewayPercent}
                  onChange={(e) => setLeewayPercent(parseFloat(e.target.value) || 3.2)}
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    borderRadius: '6px',
                    border: '1px solid var(--color-border)',
                    fontSize: '12px',
                    fontWeight: 600,
                    background: '#FFFFFF',
                  }}
                  disabled={isSimulating}
                />
              </div>
            </div>

            <div style={{ fontSize: '11px', color: 'var(--color-text-secondary)', marginTop: '8px' }}>
              Inputs propagate to <strong>POST /api/stakeholder/search-rescue/drift</strong>.
            </div>
          </ScientificPanel>

          {/* Panel 2: Search Area & Environmental Factors */}
          <ScientificPanel
            title="Search Area & Drift Factors"
            tag="Search Area"
            meta="95% Containment"
          >
            <HeroMetric
              label="Calculated Search Area"
              value={driftData.calculatedSearchArea}
              subtext="Expanding uncertainty boundary"
              statusColor="var(--color-danger)"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px' }}>
              <MetricRow label="Current" value={driftData.factors.current} detail="Geostrophic flow" />
              <MetricRow label="Time Elapsed" value={driftData.factors.timeElapsed} detail="Elapsed drift" />
              <MetricRow label="Drift Estimate" value={driftData.factors.driftEstimate} badge="Vector Total" badgeType="badge-warning" />
              <MetricRow label="Windage (Leeway)" value={`${leewayPercent}% leeway`} detail={driftData.factors.windVector} />
            </div>
          </ScientificPanel>
        </div>

        {/* Right Column: Trajectory Visualization */}
        <ScientificPanel
          title="Estimated Drift Trajectory & Search Grid"
          tag="Trajectory"
          meta={isSimulating ? 'Simulating Drift...' : 'Ready'}
          headerAction={
            <button
              type="button"
              className="action-btn btn-primary"
              style={{ padding: '4px 12px', fontSize: '11.5px' }}
              disabled={isSimulating}
              onClick={handleRunSimulation}
            >
              {isSimulating ? '● Calculating...' : '▶ Run Drift Simulation'}
            </button>
          }
        >
          <div className="trajectory-canvas-box">
            <svg viewBox="0 0 460 230" style={{ width: '100%', height: '100%' }}>
              <defs>
                <radialGradient id="searchEllipseGradLight" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#E5484D" stopOpacity="0.35" />
                  <stop offset="60%" stopColor="#E5484D" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#E5484D" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              <rect x="0" y="0" width="460" height="230" fill="#F8FBFE" />

              <line x1="40" y1="50" x2="420" y2="50" stroke="#EDF4F9" strokeWidth="1" />
              <line x1="40" y1="110" x2="420" y2="110" stroke="#EDF4F9" strokeWidth="1" />
              <line x1="40" y1="170" x2="420" y2="170" stroke="#EDF4F9" strokeWidth="1" />
              <line x1="120" y1="20" x2="120" y2="210" stroke="#EDF4F9" strokeWidth="1" />
              <line x1="240" y1="20" x2="240" y2="210" stroke="#EDF4F9" strokeWidth="1" />
              <line x1="360" y1="20" x2="360" y2="210" stroke="#EDF4F9" strokeWidth="1" />

              {[
                { x: 80, y: 130 },
                { x: 180, y: 60 },
                { x: 300, y: 80 },
                { x: 380, y: 140 },
              ].map((arrow, i) => (
                <g key={i} opacity="0.45">
                  <line x1={arrow.x} y1={arrow.y} x2={arrow.x + 28} y2={arrow.y + 14} stroke="var(--color-ocean-blue)" strokeWidth="1.5" />
                  <polygon
                    points={`${arrow.x + 28},${arrow.y + 14} ${arrow.x + 22},${arrow.y + 10} ${arrow.x + 24},${arrow.y + 17}`}
                    fill="var(--color-ocean-blue)"
                  />
                </g>
              ))}

              {simStep > 0 && currentPt && (
                <polygon
                  points={`70,50 ${currentPt.x + 35},${currentPt.y - 25} ${currentPt.x + 20},${currentPt.y + 40}`}
                  fill="rgba(245, 158, 11, 0.08)"
                  stroke="rgba(245, 158, 11, 0.35)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
              )}

              {simStep === 3 && currentPt && (
                <g opacity="0.8">
                  {[
                    { dx: -12, dy: -8 }, { dx: 15, dy: 10 }, { dx: -8, dy: 14 },
                    { dx: 22, dy: -5 }, { dx: -20, dy: 6 }, { dx: 5, dy: -18 },
                    { dx: 18, dy: 22 }, { dx: -15, dy: -16 }, { dx: 30, dy: 8 },
                    { dx: -28, dy: 2 }, { dx: 8, dy: 25 }, { dx: 2, dy: -12 },
                  ].map((p, i) => (
                    <circle
                      key={i}
                      cx={currentPt.x + p.dx}
                      cy={currentPt.y + p.dy}
                      r="2"
                      fill="#B45309"
                    />
                  ))}
                </g>
              )}

              {currentPt && (
                <ellipse
                  cx={currentPt.x}
                  cy={currentPt.y}
                  rx={simStep === 0 ? 15 : simStep === 1 ? 30 : simStep === 2 ? 48 : 65}
                  ry={simStep === 0 ? 10 : simStep === 1 ? 20 : simStep === 2 ? 32 : 44}
                  fill="url(#searchEllipseGradLight)"
                  stroke="#E5484D"
                  strokeWidth="1.8"
                  strokeDasharray="4 2"
                  transform={`rotate(28 ${currentPt.x} ${currentPt.y})`}
                />
              )}

              {simStep >= 1 && driftPoints[0] && driftPoints[1] && (
                <line
                  x1={driftPoints[0].x}
                  y1={driftPoints[0].y}
                  x2={driftPoints[1].x}
                  y2={driftPoints[1].y}
                  stroke="var(--color-ocean-blue)"
                  strokeWidth="2.5"
                />
              )}
              {simStep >= 2 && driftPoints[1] && driftPoints[2] && (
                <line
                  x1={driftPoints[1].x}
                  y1={driftPoints[1].y}
                  x2={driftPoints[2].x}
                  y2={driftPoints[2].y}
                  stroke="var(--color-ocean-blue)"
                  strokeWidth="2.5"
                />
              )}
              {simStep >= 3 && driftPoints[2] && driftPoints[3] && (
                <line
                  x1={driftPoints[2].x}
                  y1={driftPoints[2].y}
                  x2={driftPoints[3].x}
                  y2={driftPoints[3].y}
                  stroke="var(--color-ocean-blue)"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
              )}

              {driftPoints.slice(0, simStep + 1).map((pt, idx) => (
                <g key={idx}>
                  <circle
                    cx={pt.x}
                    cy={pt.y}
                    r={idx === 0 ? 6.5 : idx === simStep ? 7 : 5}
                    fill={idx === 0 ? 'var(--color-success)' : idx === simStep ? 'var(--color-danger)' : 'var(--color-ocean-blue)'}
                    stroke="#FFFFFF"
                    strokeWidth="1.8"
                  />
                  <text
                    x={pt.x + 10}
                    y={pt.y + 4}
                    fill="var(--color-text-primary)"
                    fontSize="9.5"
                    fontWeight="700"
                  >
                    {pt.label}
                  </text>
                </g>
              ))}

              <rect x="145" y="98" width="112" height="22" fill="#FFFFFF" stroke="var(--color-border)" rx="4" />
              <text
                x="152"
                y="113"
                fill="var(--color-ocean-blue)"
                fontSize="10"
                fontWeight="700"
              >
                Estimated Drift ➔
              </text>
            </svg>

            <div className="sar-hud-overlay">
              <div><strong>LKP:</strong> {driftData.lkp.lat}, {driftData.lkp.lon}</div>
              <div style={{ color: 'var(--color-ocean-blue)', fontWeight: 600 }}>
                {currentPt?.label}: {currentPt?.lat}, {currentPt?.lon}
              </div>
            </div>

            <div className="sar-hud-legend">
              <div className="legend-item">
                <span className="legend-swatch" style={{ background: 'var(--color-success)' }} />
                <span>Last Known Position (LKP)</span>
              </div>
              <div className="legend-item">
                <span className="legend-swatch" style={{ background: 'var(--color-ocean-blue)' }} />
                <span>Estimated Drift Vector</span>
              </div>
              <div className="legend-item">
                <span className="legend-swatch" style={{ background: 'var(--color-danger)' }} />
                <span>Search Area (95% Ellipse)</span>
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', fontSize: '11.5px', color: 'var(--color-text-secondary)' }}>
            <span>Drift Model: Geostrophic Current Integration + Leeway Vector</span>
            <span style={{ color: '#B45309', fontWeight: 600 }}>Total Displacement: ~{driftData.displacement}</span>
          </div>
        </ScientificPanel>
      </div>

      {/* SAR Action Bar */}
      <div className="workspace-action-bar" style={{ marginTop: '16px' }}>
        <span className="action-bar-label">Search Operations Procedures:</span>
        <div className="action-buttons-group">
          {config.actions.map((act) => (
            <ActionButton
              key={act.id}
              label={act.label}
              primary={act.primary}
              onClick={() => {
                if (act.id === 'run_drift') {
                  handleRunSimulation();
                } else {
                  setActiveModal(act.id);
                }
              }}
            />
          ))}
        </div>
      </div>

      {/* Modals */}
      <ActionModal
        isOpen={activeModal === 'adjust_leeway'}
        onClose={() => setActiveModal(null)}
        title="Tactical Leeway & Drift Factors"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Maritime search craft leeway coefficients (IAMSAR standard).
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px' }}>
          <div><strong>Target:</strong> Life Raft with Ballast (No Drogue)</div>
          <div><strong>Active Leeway Rate:</strong> {leewayPercent}% of 10m Wind Speed</div>
          <div><strong>Divergence Angle:</strong> ±18.0°</div>
          <div><strong>Surface Current:</strong> 100% Geostrophic + Wind-drift</div>
          <div style={{ color: 'var(--color-success)', fontWeight: 600, marginTop: '8px' }}>
            ✓ Hydrodynamic vectors calibrated for Sector 88.3°E.
          </div>
        </div>
      </ActionModal>

      <ActionModal
        isOpen={activeModal === 'export_geojson'}
        onClose={() => setActiveModal(null)}
        title="Export Search Grid GeoJSON"
      >
        <p style={{ color: 'var(--color-text-secondary)' }}>
          Bounding box and 95% containment ellipse coordinates for navigational plotters.
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '12px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '11px', maxHeight: '180px', overflowY: 'auto' }}>
          <pre style={{ margin: 0, color: 'var(--color-text-primary)', fontFamily: 'var(--font-family-mono, monospace)' }}>
{`{
  "type": "FeatureCollection",
  "name": "OCEANX_SAR_SEARCH_ELLIPSE",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[${lonInput}, ${latInput}], [${(lonInput + 0.28).toFixed(2)}, ${(latInput + 0.17).toFixed(2)}], [${(lonInput + 0.64).toFixed(2)}, ${(latInput + 0.46).toFixed(2)}], [${lonInput}, ${latInput}]]]
      },
      "properties": {
        "search_area": "${driftData.calculatedSearchArea}",
        "confidence": "95%",
        "time_elapsed": "${driftData.factors.timeElapsed}"
      }
    }
  ]
}`}
          </pre>
        </div>
      </ActionModal>
    </div>
  );
};

export default SearchRescueWorkspace;
