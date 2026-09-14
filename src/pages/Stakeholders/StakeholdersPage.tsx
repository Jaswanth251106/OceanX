import React, { useEffect, useState } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { Tabs } from '../../components/navigation/Tabs';
import { SectionCard } from '../../components/cards/SectionCard';
import { StatusBadge } from '../../components/feedback/StatusBadge';
import { LoadingState } from '../../components/feedback/LoadingState';
import { PrimaryButton } from '../../components/common/PrimaryButton';
import { stakeholderService } from '../../services/stakeholderService';
import { StakeholderPersona, StakeholderPersonaId } from '../../types/stakeholder';
import { Anchor, LifeBuoy, CloudRain, GraduationCap, Building2, Microscope, ArrowRight } from 'lucide-react';

export const StakeholdersPage: React.FC = () => {
  const [personas, setPersonas] = useState<StakeholderPersona[]>([]);
  const [activeRole, setActiveRole] = useState<StakeholderPersonaId>('fisherman');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      setLoading(true);
      try {
        const data = await stakeholderService.getPersonas();
        setPersonas(data);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const getRoleIcon = (id: StakeholderPersonaId) => {
    switch (id) {
      case 'fisherman': return <Anchor size={16} />;
      case 'sar': return <LifeBuoy size={16} />;
      case 'forecaster': return <CloudRain size={16} />;
      case 'researcher': return <Microscope size={16} />;
      case 'policymaker': return <Building2 size={16} />;
      case 'educator': return <GraduationCap size={16} />;
    }
  };

  const currentPersona = personas.find((p) => p.id === activeRole);

  return (
    <div>
      <PageHeader
        title="Stakeholder Operational Services"
        subtitle="Customized ocean intelligence, advisories, and tools tailored for specific maritime sectors and communities."
        badge={<StatusBadge label="6 Personas Configured" variant="info" />}
        breadcrumbs={[{ label: 'Home', href: '/dashboard' }, { label: 'Stakeholders' }]}
      />

      {loading ? (
        <LoadingState message="Loading stakeholder profiles and operational advisories..." />
      ) : currentPersona ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
          {/* Tab Navigation for 6 Stakeholder Personas */}
          <Tabs
            tabs={personas.map((p) => ({
              id: p.id,
              label: p.title,
              icon: getRoleIcon(p.id),
            }))}
            activeTabId={activeRole}
            onTabChange={(id) => setActiveRole(id as StakeholderPersonaId)}
          />

          {/* Persona Overview Shell */}
          <SectionCard
            title={currentPersona.title}
            subtitle={currentPersona.roleDescription}
            headerAction={<StatusBadge label={currentPersona.badge} variant="active" />}
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-5)' }}>
              {/* Primary Specialized Tools */}
              <div>
                <h4
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Configured Operational Tools:
                </h4>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
                  {currentPersona.primaryTools.map((tool, idx) => (
                    <span
                      key={idx}
                      style={{
                        padding: '6px 12px',
                        borderRadius: 'var(--radius-md)',
                        backgroundColor: 'var(--color-light-blue)',
                        color: 'var(--color-ocean-blue)',
                        fontSize: 'var(--font-size-xs)',
                        fontWeight: 500,
                        border: '1px solid var(--color-border)',
                      }}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Sample Advisories */}
              <div>
                <h4
                  style={{
                    fontSize: 'var(--font-size-sm)',
                    fontWeight: 600,
                    color: 'var(--color-text-primary)',
                    marginBottom: 'var(--space-3)',
                  }}
                >
                  Active Operational Bulletins:
                </h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {currentPersona.sampleAdvisories.map((advisory, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: '10px 14px',
                        backgroundColor: 'var(--color-bg-page)',
                        borderRadius: 'var(--radius-md)',
                        borderLeft: '3px solid var(--color-ocean-blue)',
                        fontSize: 'var(--font-size-sm)',
                        color: 'var(--color-text-secondary)',
                      }}
                    >
                      {advisory}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ marginTop: 'var(--space-2)' }}>
                <PrimaryButton icon={<ArrowRight size={14} />}>
                  Open Dedicated {currentPersona.title} Workspace
                </PrimaryButton>
              </div>
            </div>
          </SectionCard>
        </div>
      ) : null}
    </div>
  );
};
