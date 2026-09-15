import React from 'react';
import { STAKEHOLDERS, StakeholderKey } from '../data/stakeholderData';

interface FooterProps {
  activeStakeholder: StakeholderKey;
}

export const Footer: React.FC<FooterProps> = ({ activeStakeholder }) => {
  const stakeholder = STAKEHOLDERS[activeStakeholder];

  return (
    <footer className="console-footer" role="contentinfo">
      <div className="footer-left">
        <div className="footer-item">
          <span>Data Context:</span>
          <span className="footer-disclaimer-pill">Sample / Illustrative Data</span>
        </div>
        <div className="footer-item">
          <span>Region:</span>
          <strong>{stakeholder ? stakeholder.focusArea : 'Bay of Bengal / North Indian Ocean'}</strong>
        </div>
        <div className="footer-item">
          <span>Coordinates:</span>
          <strong>12.45°N, 88.30°E (Sector 4)</strong>
        </div>
        <div className="footer-item">
          <span>Stakeholder:</span>
          <strong style={{ color: 'var(--color-ocean-blue)' }}>{stakeholder ? stakeholder.selectorLabel : 'Operational'}</strong>
        </div>
      </div>

      <div className="footer-right">
        <div className="footer-item">
          <span>Status:</span>
          <strong style={{ color: 'var(--color-success)' }}>Nominal (Simulated Hindcast)</strong>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
