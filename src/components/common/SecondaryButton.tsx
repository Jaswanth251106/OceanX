import React from 'react';

export interface SecondaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const SecondaryButton: React.FC<SecondaryButtonProps> = ({
  icon,
  children,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '5px 12px', fontSize: 'var(--font-size-xs)' },
    md: { padding: '7px 16px', fontSize: 'var(--font-size-sm)' },
    lg: { padding: '9px 20px', fontSize: 'var(--font-size-base)' },
  };

  const style: React.CSSProperties = {
    backgroundColor: 'var(--color-bg-card)',
    color: disabled ? 'var(--color-text-muted)' : 'var(--color-text-primary)',
    border: '1px solid var(--color-border)',
    borderRadius: 'var(--radius-md)',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color var(--transition-fast), border-color var(--transition-fast)',
    boxShadow: 'var(--shadow-sm)',
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles[size],
  };

  return (
    <button
      style={style}
      disabled={disabled}
      className={`ocean-secondary-btn ${className}`}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
