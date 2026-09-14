import React from 'react';
import { useNavigate } from 'react-router-dom';
import { QuickAccessItem } from '../../../types/dashboard';
import { Compass, Waves, GitCompare, BarChart3, ArrowRight } from 'lucide-react';

export interface QuickAccessGridProps {
  items: QuickAccessItem[];
}

export const QuickAccessGrid: React.FC<QuickAccessGridProps> = ({ items }) => {
  const navigate = useNavigate();

  const getIcon = (type: QuickAccessItem['icon']) => {
    switch (type) {
      case 'explore':
        return <Compass size={22} color="var(--color-ocean-blue)" />;
      case 'observations':
        return <Waves size={22} color="var(--color-ocean-blue)" />;
      case 'compare':
        return <GitCompare size={22} color="var(--color-ocean-blue)" />;
      case 'analytics':
        return <BarChart3 size={22} color="var(--color-ocean-blue)" />;
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
      <div>
        <h3
          style={{
            fontSize: 'var(--font-size-base)',
            fontWeight: 600,
            color: 'var(--color-text-primary)',
          }}
        >
          Explore More / Quick Access
        </h3>
        <p style={{ fontSize: 'var(--font-size-xs)', color: 'var(--color-text-secondary)', marginTop: '2px' }}>
          Deep-dive into specialized ocean data portals and analytical toolsets
        </p>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
          gap: 'var(--space-4)',
        }}
      >
        {items.map((item) => (
          <div
            key={item.id}
            onClick={() => navigate(item.route)}
            style={{
              backgroundColor: 'var(--color-bg-card)',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-5)',
              boxShadow: 'var(--shadow-card)',
              cursor: 'pointer',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              minHeight: '140px',
              transition: 'transform var(--transition-fast), border-color var(--transition-fast), box-shadow var(--transition-fast)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-ocean-blue)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--shadow-md)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-border)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'var(--shadow-card)';
            }}
          >
            <div>
              <div
                style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: 'var(--radius-md)',
                  backgroundColor: 'var(--color-light-blue)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 'var(--space-3)',
                }}
              >
                {getIcon(item.icon)}
              </div>

              <h4
                style={{
                  fontSize: 'var(--font-size-base)',
                  fontWeight: 600,
                  color: 'var(--color-text-primary)',
                  marginBottom: '4px',
                }}
              >
                {item.title}
              </h4>
              <p
                style={{
                  fontSize: 'var(--font-size-xs)',
                  color: 'var(--color-text-secondary)',
                  lineHeight: 1.4,
                }}
              >
                {item.description}
              </p>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                color: 'var(--color-ocean-blue)',
                fontSize: 'var(--font-size-xs)',
                fontWeight: 600,
                marginTop: 'var(--space-4)',
              }}
            >
              <span>Launch Module</span>
              <ArrowRight size={14} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
