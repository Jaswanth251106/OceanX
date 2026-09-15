import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { settingsService } from '../../services/settingsService';
import { UserPreference } from '../../types/settings';
import { applyTheme } from '../../theme/themeHelper';

// Sub-components
import { AppearanceSettings } from './components/AppearanceSettings';
import { LanguageRegionSettings } from './components/LanguageRegionSettings';
import { NotificationsSettings } from './components/NotificationsSettings';
import { DisplaySettings } from './components/DisplaySettings';
import { PrivacyDataSettings } from './components/PrivacyDataSettings';
import { AboutSettings } from './components/AboutSettings';

export const SettingsPage: React.FC = () => {
  const [preferences, setPreferences] = useState<UserPreference | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    const fetchSettings = async () => {
      setLoading(true);
      try {
        const data = await settingsService.getSettingsData();
        setPreferences(data.preferences);
        if (data.preferences?.theme) {
          applyTheme(data.preferences.theme);
        }
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
    const updated = { ...preferences, [key]: value };
    setPreferences(updated);
    setSaveMessage(null);
  };

  const handleResetDefaults = () => {
    const defaultPrefs: UserPreference = {
      theme: 'light',
      compactMode: false,
      reduceMotion: false,
      language: 'en-US',
      timeFormat: '12h',
      dateFormat: 'YYYY-MM-DD',
      notificationsEnabled: true,
      importantAlerts: true,
      systemNotifications: true,
      textSize: 'default',
      interfaceDensity: 'comfortable',
    };
    setPreferences(defaultPrefs);
    applyTheme('light');
  };

  const handleSave = async () => {
    if (!preferences) return;
    setSaving(true);
    setSaveMessage(null);
    try {
      await settingsService.updatePreferences(preferences);
      applyTheme(preferences.theme);
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
      <div style={{ padding: '2rem', maxWidth: 840, margin: '0 auto', textAlign: 'center', color: 'var(--color-text-secondary, #58708A)' }}>
        Loading settings...
      </div>
    );
  }

  if (!preferences) {
    return (
      <div style={{ padding: '2rem', maxWidth: 840, margin: '0 auto', textAlign: 'center', color: 'var(--color-danger, #E5484D)' }}>
        Error loading settings.
      </div>
    );
  }

  return (
    <div style={{ padding: '1.5rem 2rem 3rem 2rem', maxWidth: 880, margin: '0 auto', display: 'flex', flexDirection: 'column' }}>
      <PageHeader
        title="Settings"
        subtitle="Manage general application preferences, appearance, display density, and notification alerts"
      />

      <div style={{ marginTop: '1.5rem', flex: 1 }}>
        <AppearanceSettings preferences={preferences} onChange={handleChange} />
        <LanguageRegionSettings preferences={preferences} onChange={handleChange} />
        <NotificationsSettings preferences={preferences} onChange={handleChange} />
        <DisplaySettings preferences={preferences} onChange={handleChange} />
        <PrivacyDataSettings onResetDefaults={handleResetDefaults} />
        <AboutSettings />
      </div>

      {/* Save Floating Action Bar */}
      <div
        style={{
          position: 'sticky',
          bottom: '1rem',
          backgroundColor: 'var(--color-bg-card, #FFFFFF)',
          border: '1px solid var(--color-border, #D5E5EF)',
          borderRadius: '12px',
          padding: '1rem 1.5rem',
          boxShadow: 'var(--shadow-lg, 0 12px 24px -4px rgba(6, 43, 79, 0.12))',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          zIndex: 10,
        }}
      >
        <div style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary, #58708A)' }}>
          {saveMessage ? (
            <span style={{ fontWeight: 600, color: saveMessage.type === 'success' ? '#0E9F9A' : '#E5484D' }}>
              {saveMessage.type === 'success' ? '✓ ' : '⚠️ '}
              {saveMessage.text}
            </span>
          ) : (
            'Unsaved changes are applied immediately, click save to persist.'
          )}
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          style={{
            backgroundColor: saving ? '#90b8d8' : 'var(--color-ocean-blue, #087FEA)',
            color: '#FFFFFF',
            border: 'none',
            padding: '0.65rem 1.8rem',
            borderRadius: '8px',
            fontWeight: 700,
            fontSize: '0.9rem',
            cursor: saving ? 'not-allowed' : 'pointer',
            transition: 'background-color 0.2s ease',
            boxShadow: '0 4px 12px rgba(8, 127, 234, 0.25)',
          }}
        >
          {saving ? 'Saving...' : 'Save Changes'}
        </button>
      </div>
    </div>
  );
};
