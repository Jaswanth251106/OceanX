import React from 'react';
import { STAKEHOLDERS, StakeholderKey } from '../data/stakeholderData';
import ResearcherWorkspace from './views/ResearcherWorkspace';
import ForecasterWorkspace from './views/ForecasterWorkspace';
import FisheriesWorkspace from './views/FisheriesWorkspace';
import SearchRescueWorkspace from './views/SearchRescueWorkspace';
import StudentWorkspace from './views/StudentWorkspace';
import PolicymakerWorkspace from './views/PolicymakerWorkspace';

interface StakeholderWorkspaceProps {
  activeStakeholder: StakeholderKey;
}

export const StakeholderWorkspace: React.FC<StakeholderWorkspaceProps> = ({ activeStakeholder }) => {
  const currentStakeholder = STAKEHOLDERS[activeStakeholder] || STAKEHOLDERS.researcher;

  const renderActiveView = () => {
    switch (activeStakeholder) {
      case 'researcher':
        return <ResearcherWorkspace config={currentStakeholder} />;
      case 'forecaster':
        return <ForecasterWorkspace config={currentStakeholder} />;
      case 'fisheries':
        return <FisheriesWorkspace config={currentStakeholder} />;
      case 'search_rescue':
        return <SearchRescueWorkspace config={currentStakeholder} />;
      case 'student':
        return <StudentWorkspace config={currentStakeholder} />;
      case 'policymaker':
        return <PolicymakerWorkspace config={currentStakeholder} />;
      default:
        return <ResearcherWorkspace config={currentStakeholder} />;
    }
  };

  return (
    <main
      className="workspace-wrapper"
      id={`workspace-${activeStakeholder}`}
      role="tabpanel"
      aria-labelledby={`stakeholder-btn-${activeStakeholder}`}
    >
      {/* Workspace Header Block */}
      <div className="workspace-header">
        <div className="workspace-title-group">
          <div className="workspace-mode-badge">
            <span>● Stakeholder Operational View</span>
          </div>
          <h2 className="workspace-title">
            {currentStakeholder.title}
          </h2>
          <p className="workspace-subtitle">
            {currentStakeholder.subtitle} · <span style={{ color: 'var(--color-text-secondary)' }}>Region: {currentStakeholder.focusArea}</span>
          </p>
        </div>
      </div>

      {/* Dynamic Content Area */}
      <div className="workspace-content" key={activeStakeholder}>
        {renderActiveView()}
      </div>
    </main>
  );
};

export default StakeholderWorkspace;
