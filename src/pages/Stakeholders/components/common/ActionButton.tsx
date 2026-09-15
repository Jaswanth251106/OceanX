import React, { ReactNode } from 'react';

interface ActionButtonProps {
  label: string;
  onClick: () => void;
  primary?: boolean;
  icon?: ReactNode;
  className?: string;
  disabled?: boolean;
}

export const ActionButton: React.FC<ActionButtonProps> = ({
  label,
  onClick,
  primary = false,
  icon,
  className = '',
  disabled = false,
}) => {
  return (
    <button
      type="button"
      className={`action-btn ${primary ? 'btn-primary' : ''} ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {icon && <span aria-hidden="true">{icon}</span>}
      <span>{label}</span>
    </button>
  );
};

export default ActionButton;
