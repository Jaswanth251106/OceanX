import React from 'react';
import { UserPreference, TimeFormatOption, DateFormatOption } from '../../../types/settings';
import { SectionCard } from './SectionCard';
import { SettingRow } from './SettingRow';
import { Globe } from 'lucide-react';

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

export const LanguageRegionSettings: React.FC<Props> = ({ preferences, onChange }) => {
  return (
    <SectionCard icon={<Globe size={18} />} title="Language & Region" description="Manage localization, time zone display, and date formatting options.">
      {/* Language */}
      <SettingRow title="Language" description="Select preferred display language for system interface.">
        <select
          style={selectControlStyle}
          value={preferences.language || 'en-US'}
          onChange={(e) => onChange('language', e.target.value)}
        >
          <option value="en-US">English (US)</option>
          <option value="en-GB">English (UK)</option>
          <option value="hi-IN">Hindi (हिंदी)</option>
          <option value="ta-IN">Tamil (தமிழ்)</option>
          <option value="te-IN">Telugu (తెలుగు)</option>
        </select>
      </SettingRow>

      {/* Time Format */}
      <SettingRow title="Time Format" description="Choose 12-hour or 24-hour clock display.">
        <select
          style={selectControlStyle}
          value={preferences.timeFormat || '12h'}
          onChange={(e) => onChange('timeFormat', e.target.value as TimeFormatOption)}
        >
          <option value="12h">12-hour (1:30 PM)</option>
          <option value="24h">24-hour (13:30)</option>
        </select>
      </SettingRow>

      {/* Date Format */}
      <SettingRow title="Date Format" description="Set standard calendar date representation.">
        <select
          style={selectControlStyle}
          value={preferences.dateFormat || 'YYYY-MM-DD'}
          onChange={(e) => onChange('dateFormat', e.target.value as DateFormatOption)}
        >
          <option value="YYYY-MM-DD">YYYY-MM-DD (2026-09-15)</option>
          <option value="DD/MM/YYYY">DD/MM/YYYY (15/09/2026)</option>
          <option value="MM/DD/YYYY">MM/DD/YYYY (09/15/2026)</option>
        </select>
      </SettingRow>
    </SectionCard>
  );
};
