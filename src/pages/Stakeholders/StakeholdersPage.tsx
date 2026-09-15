import React, { useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { StakeholderKey } from './data/stakeholderData';
import StakeholderSelector from './components/StakeholderSelector';
import StakeholderWorkspace from './components/StakeholderWorkspace';
import Footer from './components/Footer';
import './StakeholderStyles.css';

export const StakeholdersPage: React.FC = () => {
  const [activeStakeholder, setActiveStakeholder] = useState<StakeholderKey>('researcher');

  return (
    <div>
      <PageHeader
        title="Stakeholder Operational Services"
        subtitle="Customized ocean intelligence, advisories, and tools tailored for specific maritime sectors and communities."
        badge={<StatusBadge label="6 Personas Active" variant="info" />}
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Stakeholders' }]}
      />

      <div className="stakeholder-workspace-container">
        {/* Stakeholder Selector Bar */}
        <StakeholderSelector
          activeStakeholder={activeStakeholder}
          onSelectStakeholder={setActiveStakeholder}
        />

        {/* Dynamic Stakeholder Workspace View */}
        <StakeholderWorkspace activeStakeholder={activeStakeholder} />

        {/* Stakeholder Telemetry & Status Footer */}
        <Footer activeStakeholder={activeStakeholder} />
      </div>
    </div>
  );
};

export default StakeholdersPage;
