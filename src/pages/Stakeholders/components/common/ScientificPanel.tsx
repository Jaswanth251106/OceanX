import React, { ReactNode } from 'react';

interface ScientificPanelProps {
  title: string;
  tag?: string;
  meta?: string;
  children: ReactNode;
  className?: string;
  headerAction?: ReactNode;
}

export const ScientificPanel: React.FC<ScientificPanelProps> = ({
  title,
  tag,
  meta,
  children,
  className = '',
  headerAction,
}) => {
  return (
    <section className={`scientific-panel ${className}`}>
      <header className="panel-header">
        <div className="panel-title">
          <span>{title}</span>
          {tag && <span className="panel-title-tag">[{tag}]</span>}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {meta && <span className="panel-meta">{meta}</span>}
          {headerAction}
        </div>
      </header>
      <div className="panel-body">{children}</div>
    </section>
  );
};

export default ScientificPanel;
