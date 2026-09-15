import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { settingsService } from '../../services/settingsService';
import { UserPreference } from '../../types/settings';

// Sub-components
import { ProfileSettings } from './components/ProfileSettings';
import { AppearanceSettings } from './components/AppearanceSettings';
import { GeneralSettings } from './components/GeneralSettings';

export const SettingsPage: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreference | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await settingsService.getSettingsData();
        setPreferences(data.preferences);
      } catch (err) {
        console.error('Failed to load settings', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSettings();
  }, []);

  const handleChange = (key: keyof UserPreference, value: any) => {
    if (!preferences) return;
    setPreferences({ ...preferences, [key]: value });
    setSaveMessage(null); // Clear message on new edits
  };

  const handleSave = async () => {
    if (!preferences) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      await settingsService.updatePreferences(preferences);
      setSaveMessage({ type: 'success', text: 'Settings saved successfully.' });
    } catch (err) {
      console.error('Failed to save settings', err);
      setSaveMessage({ type: 'error', text: 'Failed to save settings. Please try again.' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', textAlign: 'center', color: '#5a7184' }}>
        Loading settings...
      </div>
    );
  }

  if (!preferences) {
    return (
      <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', textAlign: 'center', color: '#E5484D' }}>
        Error loading settings.
      </div>
    );
  }

  return (
    <div style={{ padding: '2rem', maxWidth: 800, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <PageHeader 
        title="Settings" 
        subtitle="Manage your account, appearance, and system preferences" 
      />

      <div style={{ marginTop: '2rem', flex: 1 }}>
        <ProfileSettings />
        
        <div style={{ display: 'flex', gap: '1.5rem', flexDirection: 'column' }}>
          <AppearanceSettings preferences={preferences} onChange={handleChange} />
          <GeneralSettings preferences={preferences} onChange={handleChange} />
        </div>
      </div>

      <div style={{ marginTop: '1rem', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', gap: '1rem' }}>
        {saveMessage && (
          <div style={{ fontSize: '0.85rem', fontWeight: 600, color: saveMessage.type === 'success' ? '#22A06B' : '#E5484D' }}>
            {saveMessage.type === 'success' ? '✓ ' : '⚠️ '}{saveMessage.text}
          </div>
        )}
        <button 
          onClick={handleSave} 
          disabled={saving}
          style={{
            background: saving ? '#90b8d8' : '#087FEA',
            color: '#fff',
            border: 'none',
            padding: '0.6rem 1.5rem',
            borderRadius: '6px',
            fontWeight: 600,
            fontSize: '0.9rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>

    </div>
  );
};
