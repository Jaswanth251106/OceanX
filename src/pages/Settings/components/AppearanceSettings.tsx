import React from 'react';
import { UserPreference, ThemeOption } from '../../../types/settings';
import { SectionCard } from './SectionCard';
import { SettingRow } from './SettingRow';
import { ToggleSwitch } from './ToggleSwitch';
import { applyTheme } from '../../../theme/themeHelper';
import { Sun, Moon, Monitor, Palette } from 'lucide-react';

interface Props {
  preferences: UserPreference;
  onChange: (key: keyof UserPreference, value: any) => void;
}

export const AppearanceSettings: React.FC<Props> = ({ preferences, onChange }) => {
  const handleThemeChange = (newTheme: ThemeOption) => {
    onChange('theme', newTheme);
    applyTheme(newTheme);
  };

  const themeOptions: { key: ThemeOption; label: string; icon: React.ReactNode }[] = [
    { key: 'light', label: 'Light', icon: <Sun size={20} color="#087FEA" /> },
    { key: 'dark', label: 'Dark', icon: <Moon size={20} color="#00B8D9" /> },
    { key: 'system', label: 'System', icon: <Monitor size={20} color="#0E9F9A" /> },
  ];

  return (
    <SectionCard icon={<Palette size={18} />} title="Appearance" description="Customize interface theme, visual density, and motion effects.">
      {/* Theme Cards */}
      <div style={{ marginBottom: '1rem' }}>
        <label style={{ display: 'block', fontSize: '0.8rem', color: 'var(--color-text-secondary, #58708A)', fontWeight: 600, marginBottom: '0.75rem' }}>
          Theme Preference
        </label>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          {themeOptions.map((opt) => {
            const isSelected = preferences.theme === opt.key;
            return (
              <div
                key={opt.key}
                onClick={() => handleThemeChange(opt.key)}
                style={{
                  border: `2px solid ${isSelected ? 'var(--color-ocean-blue, #087FEA)' : 'var(--color-border, #D5E5EF)'}`,
                  borderRadius: '10px',
                  padding: '1.1rem 0.8rem',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? 'var(--color-bg-subtle, #EAF6FF)' : 'var(--color-bg-card, #FFFFFF)',
                  textAlign: 'center',
                  transition: 'all 0.2s ease',
                  boxShadow: isSelected ? '0 4px 12px rgba(8, 127, 234, 0.15)' : 'none',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: '50%',
                    backgroundColor: 'var(--color-bg-hover, #E6F7FB)',
                    margin: '0 auto 0.6rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {opt.icon}
                </div>
                <div style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-text-primary, #0B2A4A)' }}>
                  {opt.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Compact Mode */}
      <SettingRow title="Compact Mode" description="Reduce padding and spacing across cards and navigation panels.">
        <ToggleSwitch
          checked={preferences.compactMode || false}
          onChange={(val) => onChange('compactMode', val)}
        />
      </SettingRow>

      {/* Reduce Motion */}
      <SettingRow title="Reduce Motion" description="Minimize interface animations and transition effects.">
        <ToggleSwitch
          checked={preferences.reduceMotion || false}
          onChange={(val) => onChange('reduceMotion', val)}
        />
      </SettingRow>
    </SectionCard>
  );
};
