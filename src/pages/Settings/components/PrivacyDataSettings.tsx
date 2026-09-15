import React, { useState } from 'react';
import { SectionCard } from './SectionCard';
import { SettingRow } from './SettingRow';
import { Shield, Trash2, RotateCcw, CheckCircle2 } from 'lucide-react';

interface Props {
  onResetDefaults: () => void;
}

export const PrivacyDataSettings: React.FC<Props> = ({ onResetDefaults }) => {
  const [cacheMessage, setCacheMessage] = useState<string | null>(null);
  const [resetMessage, setResetMessage] = useState<string | null>(null);

  const handleClearCache = () => {
    localStorage.removeItem('oceanx_cached_tiles');
    setCacheMessage('Local data cache cleared successfully.');
    setTimeout(() => setCacheMessage(null), 3500);
  };

  const handleReset = () => {
    onResetDefaults();
    setResetMessage('Preferences reset to application defaults.');
    setTimeout(() => setResetMessage(null), 3500);
  };

  return (
    <SectionCard icon={<Shield size={18} />} title="Privacy & Data" description="Manage local storage, clear temporary cached assets, or reset settings.">
      {/* Clear Cached Data */}
      <SettingRow title="Clear Cached Data" description="Purge locally stored tiles, observation profiles, and offline data.">
        <button
          onClick={handleClearCache}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border, #D5E5EF)',
            backgroundColor: 'var(--color-bg-card, #FFFFFF)',
            color: 'var(--color-text-primary, #0B2A4A)',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <Trash2 size={14} color="#E5484D" /> Clear Cache
        </button>
      </SettingRow>
      {cacheMessage && (
        <div style={{ fontSize: '0.78rem', color: '#0E9F9A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '4px' }}>
          <CheckCircle2 size={14} /> {cacheMessage}
        </div>
      )}

      {/* Reset Preferences */}
      <SettingRow title="Reset Preferences" description="Restore all settings back to factory default values.">
        <button
          onClick={handleReset}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '0.5rem 1rem',
            borderRadius: '8px',
            border: '1px solid var(--color-border, #D5E5EF)',
            backgroundColor: 'var(--color-bg-card, #FFFFFF)',
            color: 'var(--color-text-primary, #0B2A4A)',
            fontSize: '0.825rem',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
        >
          <RotateCcw size={14} color="#087FEA" /> Reset to Defaults
        </button>
      </SettingRow>
      {resetMessage && (
        <div style={{ fontSize: '0.78rem', color: '#0E9F9A', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px', paddingLeft: '4px' }}>
          <CheckCircle2 size={14} /> {resetMessage}
        </div>
      )}
    </SectionCard>
  );
};
