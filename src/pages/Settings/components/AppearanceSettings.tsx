import React from 'react';
import { UserPreference } from '../../../types/settings';

interface Props {
  preferences: UserPreference;
  onChange: (key: keyof UserPreference, value: any) => void;
}

export const AppearanceSettings: React.FC<Props> = ({ preferences, onChange }) => {
  return (
    <div style={{ background: '#fff', border: '1px solid #DCE5EF', borderRadius: '10px', padding: '1.5rem', marginBottom: '1.5rem' }}>
      <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#0B2A4A', marginBottom: '1rem' }}>
        Appearance
      </div>

      <div>
        <label style={{ display: 'block', fontSize: '0.75rem', color: '#5a7184', fontWeight: 600, marginBottom: '0.6rem' }}>Theme</label>
        <div style={{ display: 'flex', gap: '1rem' }}>
          
          <div 
            onClick={() => onChange('theme', 'light')}
            style={{ 
              flex: 1, 
              border: `2px solid ${preferences.theme === 'light' ? '#087FEA' : '#DCE5EF'}`, 
              borderRadius: '8px', 
              padding: '1rem',
              cursor: 'pointer',
              background: '#F6F8FB',
              textAlign: 'center'
            }}
          >
            <div style={{ width: 40, height: 40, background: '#fff', borderRadius: '4px', margin: '0 auto 0.5rem', border: '1px solid #DCE5EF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              ☀️
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#0B2A4A' }}>Light</div>
          </div>

          <div 
            style={{ 
              flex: 1, 
              border: '2px solid #DCE5EF', 
              borderRadius: '8px', 
              padding: '1rem',
              cursor: 'not-allowed',
              background: '#1A202C',
              textAlign: 'center',
              opacity: 0.6
            }}
          >
            <div style={{ width: 40, height: 40, background: '#2D3748', borderRadius: '4px', margin: '0 auto 0.5rem', border: '1px solid #4A5568', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              🌙
            </div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#fff' }}>Dark (Coming Soon)</div>
          </div>

        </div>
      </div>
    </div>
  );
};
