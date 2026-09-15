import React from 'react';

interface Props {
  icon: React.ReactNode;
  title: string;
  description?: string;
  children: React.ReactNode;
}

export const SectionCard: React.FC<Props> = ({ icon, title, description, children }) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--color-bg-card, #FFFFFF)',
        border: '1px solid var(--color-border, #D5E5EF)',
        borderRadius: '12px',
        padding: '1.5rem',
        boxShadow: 'var(--shadow-card, 0 4px 16px rgba(8, 127, 234, 0.04))',
        marginBottom: '1.5rem',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: description ? '0.25rem' : '1.25rem' }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: '8px',
            backgroundColor: 'var(--color-bg-subtle, #EAF6FF)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--color-ocean-blue, #087FEA)',
            flexShrink: 0,
          }}
        >
          {icon}
        </div>
        <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--color-text-primary, #0B2A4A)', margin: 0 }}>
          {title}
        </h3>
      </div>

      {description && (
        <p style={{ fontSize: '0.825rem', color: 'var(--color-text-secondary, #58708A)', margin: '0 0 1.25rem 0', paddingLeft: '42px' }}>
          {description}
        </p>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {children}
      </div>
    </div>
  );
};
