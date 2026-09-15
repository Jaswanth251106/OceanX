import React, { KeyboardEvent } from 'react';
import { STAKEHOLDER_KEYS, STAKEHOLDERS, StakeholderKey } from '../data/stakeholderData';

interface StakeholderSelectorProps {
  activeStakeholder: StakeholderKey;
  onSelectStakeholder: (key: StakeholderKey) => void;
}

export const StakeholderSelector: React.FC<StakeholderSelectorProps> = ({
  activeStakeholder,
  onSelectStakeholder,
}) => {
  const handleKeyDown = (e: KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | null = null;
    if (e.key === 'ArrowRight') {
      nextIndex = (index + 1) % STAKEHOLDER_KEYS.length;
    } else if (e.key === 'ArrowLeft') {
      nextIndex = (index - 1 + STAKEHOLDER_KEYS.length) % STAKEHOLDER_KEYS.length;
    }

    if (nextIndex !== null) {
      e.preventDefault();
      const nextKey = STAKEHOLDER_KEYS[nextIndex];
      onSelectStakeholder(nextKey);
      const nextBtn = document.getElementById(`stakeholder-btn-${nextKey}`);
      if (nextBtn) nextBtn.focus();
    }
  };

  const currentIndex = STAKEHOLDER_KEYS.indexOf(activeStakeholder);

  return (
    <nav className="selector-container" aria-label="Stakeholder Modes">
      <div className="selector-header-label">
        <span>Stakeholder Perspective</span>
        <span>{currentIndex >= 0 ? currentIndex + 1 : 1} of 6 Active</span>
      </div>

      <div className="selector-grid" role="tablist" aria-label="Stakeholder Mode Selector">
        {STAKEHOLDER_KEYS.map((key, idx) => {
          const item = STAKEHOLDERS[key];
          const isActive = activeStakeholder === key;

          return (
            <button
              key={key}
              id={`stakeholder-btn-${key}`}
              role="tab"
              aria-selected={isActive}
              aria-controls={`workspace-${key}`}
              tabIndex={isActive ? 0 : -1}
              className={`stakeholder-btn ${isActive ? 'active' : ''}`}
              onClick={() => onSelectStakeholder(key)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              <span className="btn-label">{item.selectorLabel}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
};

export default StakeholderSelector;
