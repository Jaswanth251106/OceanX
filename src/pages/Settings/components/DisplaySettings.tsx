import React from 'react';
import { UserPreference, TextSizeOption, InterfaceDensityOption } from '../../../types/settings';
import { SectionCard } from './SectionCard';
import { SettingRow } from './SettingRow';
import { Layout } from 'lucide-react';

interface Props {
  preferences: UserPreference;
  onChange: (key: keyof UserPreference, value: any) => void;
}

const selectControlStyle: React.CSSProperties = {
  padding: '0.5rem 0.8rem',
  borderRadius: '8px',
  border: '1px solid var(--color-border, #D5E5EF)',
  backgroundColor: 'var(--color-bg-card, #FFFFFF)',
  color: 'var(--color-text-primary, #0B2A4A)',
  fontSize: '0.85rem',
  fontWeight: 500,
  outline: 'none',
  minWidth: 160,
  cursor: 'pointer',
};

export const DisplaySettings: React.FC<Props> = ({ preferences, onChange }) => {
  return (
    <SectionCard icon={<Layout size={18} />} title="Display" description="Adjust font size scaling and interface element density.">
      {/* Text Size */}
      <SettingRow title="Text Size" description="Change base typography sizing for better readability.">
        <select
          style={selectControlStyle}
          value={preferences.textSize || 'default'}
          onChange={(e) => onChange('textSize', e.target.value as TextSizeOption)}
        >
          <option value="small">Small (13px)</option>
          <option value="default">Default (15px)</option>
          <option value="large">Large (17px)</option>
        </select>
      </SettingRow>

      {/* Interface Density */}
      <SettingRow title="Interface Density" description="Control vertical rhythm and element spacing.">
        <select
          style={selectControlStyle}
          value={preferences.interfaceDensity || 'comfortable'}
          onChange={(e) => onChange('interfaceDensity', e.target.value as InterfaceDensityOption)}
        >
          <option value="comfortable">Comfortable</option>
          <option value="compact">Compact</option>
        </select>
      </SettingRow>
    </SectionCard>
  );
};
