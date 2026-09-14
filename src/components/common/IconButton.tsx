import React from 'react';

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  label: string; // for accessible aria-label
  variant?: 'ghost' | 'outline' | 'filled';
  size?: 'sm' | 'md' | 'lg';
  active?: boolean;
}

export const IconButton: React.FC<IconButtonProps> = ({
  icon,
  label,
  variant = 'ghost',
  size = 'md',
  active = false,
  className = '',
  disabled,
  style,
  ...props
}) => {
  const sizeMap = {
    sm: { width: '30px', height: '30px', padding: '5px' },
    md: { width: '36px', height: '36px', padding: '8px' },
    lg: { width: '42px', height: '42px', padding: '10px' },
  };

  const getVariantStyles = (): React.CSSProperties => {
    switch (variant) {
      case 'outline':
        return {
          backgroundColor: active ? 'var(--color-light-blue)' : 'var(--color-bg-card)',
          border: `1px solid ${active ? 'var(--color-ocean-blue)' : 'var(--color-border)'}`,
          color: active ? 'var(--color-ocean-blue)' : 'var(--color-text-secondary)',
        };
      case 'filled':
        return {
          backgroundColor: 'var(--color-ocean-blue)',
          border: 'none',
          color: 'var(--color-text-inverse)',
        };
      case 'ghost':
      default:
        return {
          backgroundColor: active ? 'var(--color-light-blue)' : 'transparent',
          border: 'none',
          color: active ? 'var(--color-ocean-blue)' : 'var(--color-text-secondary)',
        };
    }
  };

  const combinedStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 'var(--radius-md)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    opacity: disabled ? 0.5 : 1,
    ...sizeMap[size],
    ...getVariantStyles(),
    ...style,
  };

  return (
    <button
      style={combinedStyles}
      aria-label={label}
      title={label}
      disabled={disabled}
      className={`ocean-icon-btn ${className}`}
      {...props}
    >
      {icon}
    </button>
  );
};
