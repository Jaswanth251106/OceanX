import React from 'react';
import { UserPreference } from '../../../types/settings';

interface Props {
  preferences: UserPreference;
  onChange: (key: keyof UserPreference, value: any) => void;
}

export const GeneralSettings: React.FC<Props> = ({ preferences, onChange }) => {
  const selectStyle = {
    width: '100%',
    padding: '0.6rem',
    border: '1px solid #DCE5EF',
    borderRadius: '6px',
    fontSize: '0.85rem',
    outline: 'none',
    color: '#0B2A4A'
  };

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: '0.75rem',
    color: '#5a7184',
    fontWeight: 600,
    marginBottom: '0.4rem'
  };

  return (
    <div style={{ background: '#fff', border: '1px solid #DCE5EF', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0B2A4A', marginBottom: '1.5rem' }}>
        System Preferences
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        
        {/* Language */}
        <div>
          <label style={labelStyle}>Language</label>
          <select value={preferences.language} onChange={(e) => onChange('language', e.target.value)} style={selectStyle}>
            <option value="en">English (UK)</option>
            <option value="hi">Hindi (हिंदी)</option>
            <option value="fr">French (Français)</option>
          </select>
        </div>

        {/* Data Refresh */}
        <div>
          <label style={labelStyle}>Data Auto-Refresh</label>
          <select value={preferences.autoRefreshIntervalSeconds} onChange={(e) => onChange('autoRefreshIntervalSeconds', Number(e.target.value))} style={selectStyle}>
            <option value={30}>Every 30 seconds</option>
            <option value={60}>Every 1 minute</option>
            <option value={300}>Every 5 minutes</option>
            <option value={3600}>Every 1 hour</option>
          </select>
        </div>

        {/* Preferred Units */}
        <div>
          <label style={labelStyle}>Preferred Units</label>
          <select value={preferences.preferredUnits} onChange={(e) => onChange('preferredUnits', e.target.value)} style={selectStyle}>
            <option value="metric">Metric (°C, km, m/s)</option>
            <option value="nautical">Nautical (knots, nm)</option>
            <option value="scientific">Scientific (Kelvin, m/s)</option>
          </select>
        </div>

        {/* Depth Scale */}
        <div>
          <label style={labelStyle}>Depth Scale</label>
          <select value={preferences.depthScale} onChange={(e) => onChange('depthScale', e.target.value)} style={selectStyle}>
            <option value="meters">Meters (m)</option>
            <option value="fathoms">Fathoms (ftm)</option>
          </select>
        </div>

        {/* Email Notifications */}
        <div style={{ gridColumn: '1 / -1', marginTop: '0.5rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'pointer' }}>
            <input 
              type="checkbox" 
              checked={preferences.emailNotifications} 
              onChange={(e) => onChange('emailNotifications', e.target.checked)} 
              style={{ width: 18, height: 18, accentColor: '#087FEA' }}
            />
            <div>
              <div style={{ fontWeight: 600, color: '#0B2A4A', fontSize: '0.85rem' }}>Email Notifications</div>
              <div style={{ fontSize: '0.75rem', color: '#5a7184' }}>Receive critical alerts and weekly digests.</div>
            </div>
          </label>
        </div>

      </div>
    </div>
  );
};
