import React from 'react';

export interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon?: React.ReactNode;
  children: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
}

export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  icon,
  children,
  size = 'md',
  fullWidth = false,
  className = '',
  disabled,
  ...props
}) => {
  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: { padding: '6px 12px', fontSize: 'var(--font-size-xs)' },
    md: { padding: '8px 16px', fontSize: 'var(--font-size-sm)' },
    lg: { padding: '10px 20px', fontSize: 'var(--font-size-base)' },
  };

  const style: React.CSSProperties = {
    backgroundColor: disabled ? 'var(--color-border)' : 'var(--color-ocean-blue)',
    color: 'var(--color-text-inverse)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    fontWeight: 500,
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'background-color var(--transition-fast), box-shadow var(--transition-fast)',
    boxShadow: disabled ? 'none' : '0 1px 3px rgba(8, 127, 234, 0.25)',
    width: fullWidth ? '100%' : 'auto',
    ...sizeStyles[size],
  };

  return (
    <button
      style={style}
      disabled={disabled}
      className={`ocean-primary-btn ${className}`}
      {...props}
    >
      {icon && <span style={{ display: 'inline-flex' }}>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};
