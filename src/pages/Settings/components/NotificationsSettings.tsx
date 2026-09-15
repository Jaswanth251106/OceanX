import React from 'react';
import { UserPreference } from '../../../types/settings';
import { SectionCard } from './SectionCard';
import { SettingRow } from './SettingRow';
import { ToggleSwitch } from './ToggleSwitch';
import { Bell } from 'lucide-react';

interface Props {
  preferences: UserPreference;
  onChange: (key: keyof UserPreference, value: any) => void;
}

export const NotificationsSettings: React.FC<Props> = ({ preferences, onChange }) => {
  return (
    <SectionCard icon={<Bell size={18} />} title="Notifications" description="Configure system notifications and alert delivery preferences.">
      {/* Enable Notifications */}
      <SettingRow title="Enable Notifications" description="Master switch for application alerts and updates.">
        <ToggleSwitch
          checked={preferences.notificationsEnabled ?? true}
          onChange={(val) => onChange('notificationsEnabled', val)}
        />
      </SettingRow>

      {/* Important Alerts */}
      <SettingRow title="Important Alerts" description="Receive high-priority operational bulletins.">
        <ToggleSwitch
          checked={preferences.importantAlerts ?? true}
          onChange={(val) => onChange('importantAlerts', val)}
        />
      </SettingRow>

      {/* System Notifications */}
      <SettingRow title="System Notifications" description="Receive background updates and status messages.">
        <ToggleSwitch
          checked={preferences.systemNotifications ?? true}
          onChange={(val) => onChange('systemNotifications', val)}
        />
      </SettingRow>
    </SectionCard>
  );
};
