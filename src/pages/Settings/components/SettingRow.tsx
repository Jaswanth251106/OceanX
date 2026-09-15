import React from 'react';

interface Props {
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const SettingRow: React.FC<Props> = ({ title, description, children }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0.65rem 0',
        borderBottom: '1px solid var(--color-border-subtle, #EAF6FF)',
        gap: '1.5rem',
      }}
    >
      <div>
        <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-text-primary, #0B2A4A)' }}>
          {title}
        </div>
        {description && (
          <div style={{ fontSize: '0.78rem', color: 'var(--color-text-secondary, #58708A)', marginTop: '2px' }}>
            {description}
          </div>
        )}
      </div>
      <div style={{ flexShrink: 0 }}>{children}</div>
    </div>
  );
};
