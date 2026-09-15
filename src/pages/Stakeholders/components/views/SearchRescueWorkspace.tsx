import React, { useState, useEffect } from 'react';
import { StakeholderConfig } from '../../data/stakeholderData';
import ScientificPanel from '../common/ScientificPanel';
import { MetricRow, HeroMetric } from '../common/MetricReadout';
import ActionButton from '../common/ActionButton';
import ActionModal from '../common/ActionModal';

interface SearchRescueWorkspaceProps {
  config: StakeholderConfig;
}

export const SearchRescueWorkspace: React.FC<SearchRescueWorkspaceProps> = ({ config }) => {
  const [simStep, setSimStep] = useState(3);
  const [isSimulating, setIsSimulating] = useState(false);
  const [activeModal, setActiveModal] = useState<string | null>(null);

  useEffect(() => {
    let timer: ReturnType<typeof setInterval>;
    if (isSimulating) {
      setSimStep(0);
      let step = 0;
      timer = setInterval(() => {
        step += 1;
        if (step <= 3) {
          setSimStep(step);
        } else {
          setIsSimulating(false);
          clearInterval(timer);
        }
      }, 700);
    }
    return () => clearInterval(timer);
  }, [isSimulating]);

  const driftPoints = [
    { label: 'T+0h (LKP)', x: 70, y: 50, lat: '12.45°N', lon: '88.30°E' },
    { label: 'T+6h', x: 140, y: 85, lat: '12.58°N', lon: '88.48°E' },
    { label: 'T+12h', x: 210, y: 125, lat: '12.71°N', lon: '88.66°E' },
    { label: 'T+14.5h (Datum)', x: 270, y: 160, lat: '12.82°N', lon: '88.82°E' },
  ];

  const searchAreaSizes = ['320 km²', '980 km²', '1,720 km²', '2,340 km²'];

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
          <span>{config.disclaimer}</span>
        </span>
        <span className="footer-disclaimer-pill" style={{ background: '#FEF2F2', borderColor: '#F87171', color: '#B91C1C' }}>
          Decision Support Only
        </span>
      </div>

      <div className="panels-grid-1-2">
        {/* Left Column: LKP & Search Area */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Panel 1: Last Known Position */}
          <ScientificPanel
            title="Last Known Position"
            tag="Origin Datum"
            meta={config.lkp?.timestamp}
          >
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <HeroMetric
                label="Latitude"
                value={config.lkp?.lat || ''}
                subtext="Beacon coordinate"
                statusColor="var(--color-ocean-blue)"
              />
              <HeroMetric
                label="Longitude"
                value={config.lkp?.lon || ''}
                subtext="Beacon coordinate"
                statusColor="var(--color-ocean-blue)"
              />
            </div>
            <div style={{ fontSize: '11.5px', color: 'var(--color-text-secondary)', marginTop: '4px' }}>
              Origin: Simulated emergency locator transmitter (06:15 UTC).
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
              value={searchAreaSizes[simStep]}
              subtext="Expanding uncertainty boundary"
              statusColor="var(--color-danger)"
            />

            <div style={{ display: 'flex', flexDirection: 'column', gap: '3px', marginTop: '6px' }}>
              <MetricRow label="Current" value={config.factors?.current || ''} detail="Geostrophic flow" />
              <MetricRow label="Time" value={config.factors?.timeElapsed || ''} detail="Elapsed drift" />
              <MetricRow label="Drift Estimate" value={config.factors?.driftEstimate || ''} badge="Vector Total" badgeType="badge-warning" />
              <MetricRow label="Windage (Leeway)" value="3.2% leeway" detail="14 kt @ 245° SW" />
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
              onClick={() => setIsSimulating(true)}
            >
              {isSimulating ? '● Running...' : '▶ Run Drift Simulation'}
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

              {simStep > 0 && (
                <polygon
                  points={`70,50 ${driftPoints[simStep].x + 35},${driftPoints[simStep].y - 25} ${driftPoints[simStep].x + 20},${driftPoints[simStep].y + 40}`}
                  fill="rgba(245, 158, 11, 0.08)"
                  stroke="rgba(245, 158, 11, 0.35)"
                  strokeWidth="1"
                  strokeDasharray="4 3"
                />
              )}

              {simStep === 3 && (
                <g opacity="0.8">
                  {[
                    { dx: -12, dy: -8 }, { dx: 15, dy: 10 }, { dx: -8, dy: 14 },
                    { dx: 22, dy: -5 }, { dx: -20, dy: 6 }, { dx: 5, dy: -18 },
                    { dx: 18, dy: 22 }, { dx: -15, dy: -16 }, { dx: 30, dy: 8 },
                    { dx: -28, dy: 2 }, { dx: 8, dy: 25 }, { dx: 2, dy: -12 },
                  ].map((p, i) => (
                    <circle
                      key={i}
                      cx={driftPoints[simStep].x + p.dx}
                      cy={driftPoints[simStep].y + p.dy}
                      r="2"
                      fill="#B45309"
                    />
                  ))}
                </g>
              )}

              <ellipse
                cx={driftPoints[simStep].x}
                cy={driftPoints[simStep].y}
                rx={simStep === 0 ? 15 : simStep === 1 ? 30 : simStep === 2 ? 48 : 65}
                ry={simStep === 0 ? 10 : simStep === 1 ? 20 : simStep === 2 ? 32 : 44}
                fill="url(#searchEllipseGradLight)"
                stroke="#E5484D"
                strokeWidth="1.8"
                strokeDasharray="4 2"
                transform={`rotate(28 ${driftPoints[simStep].x} ${driftPoints[simStep].y})`}
              />

              {simStep >= 1 && (
                <line
                  x1={driftPoints[0].x}
                  y1={driftPoints[0].y}
                  x2={driftPoints[1].x}
                  y2={driftPoints[1].y}
                  stroke="var(--color-ocean-blue)"
                  strokeWidth="2.5"
                />
              )}
              {simStep >= 2 && (
                <line
                  x1={driftPoints[1].x}
                  y1={driftPoints[1].y}
                  x2={driftPoints[2].x}
                  y2={driftPoints[2].y}
                  stroke="var(--color-ocean-blue)"
                  strokeWidth="2.5"
                />
              )}
              {simStep >= 3 && (
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
              <div><strong>LKP:</strong> 12.45°N, 88.30°E</div>
              <div style={{ color: 'var(--color-ocean-blue)', fontWeight: 600 }}>
                {driftPoints[simStep].label}: {driftPoints[simStep].lat}, {driftPoints[simStep].lon}
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
            <span>Drift Model: Geostrophic Current Integration + 3% Leeway</span>
            <span style={{ color: '#B45309', fontWeight: 600 }}>Total Displacement: ~44.2 km ENE</span>
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
                  setIsSimulating(true);
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
          Standard maritime search craft leeway coefficients (IAMSAR standard).
        </p>
        <div style={{ background: 'var(--color-bg-page)', padding: '14px', borderRadius: '8px', border: '1px solid var(--color-border)', fontSize: '12px' }}>
          <div><strong>Target:</strong> Life Raft with Ballast (No Drogue)</div>
          <div><strong>Leeway Rate:</strong> 3.2% of 10m Wind Speed</div>
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
  "name": "OCEANX_SAR_SEARCH_ELLIPSE_06Z",
  "features": [
    {
      "type": "Feature",
      "geometry": {
        "type": "Polygon",
        "coordinates": [[[88.30, 12.45], [88.58, 12.62], [88.94, 12.91], [88.75, 12.72], [88.30, 12.45]]]
      },
      "properties": {
        "search_area_km2": 2340,
        "confidence": "95%",
        "time_elapsed": "14h 30m"
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
