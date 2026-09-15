import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
  Compass,
  LayoutDashboard,
  Waves,
  GitCompare,
  BarChart3,
  Users,
  Settings,
} from 'lucide-react';

export interface NavbarProps {
  onToggleSidebar?: () => void;
}

export const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/explore', label: 'Explore', icon: Compass },
  { path: '/observations', label: 'Observations', icon: Waves },
  { path: '/compare', label: 'Compare', icon: GitCompare },
  { path: '/analytics', label: 'Analytics', icon: BarChart3 },
  { path: '/stakeholders', label: 'Stakeholders', icon: Users },
];

const getPageTitle = (pathname: string): string => {
  if (pathname.includes('/explore')) return 'Explore';
  if (pathname.includes('/observations')) return 'Observations';
  if (pathname.includes('/compare')) return 'Compare';
  if (pathname.includes('/analytics')) return 'Analytics';
  if (pathname.includes('/stakeholders')) return 'Stakeholders';
  if (pathname.includes('/settings')) return 'Settings';
  return 'Dashboard';
};

export const Navbar: React.FC<NavbarProps> = () => {
  const location = useLocation();
  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'rgba(255, 255, 255, 0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: '2px solid transparent',
        borderImage: 'linear-gradient(90deg, var(--color-cyan) 0%, var(--color-ocean-blue) 50%, var(--color-marine-teal) 100%) 1',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-6)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 8px 32px -4px rgba(6, 43, 79, 0.08)',
      }}
    >
      {/* Left: Branding + Left-aligned Page Title */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
        <NavLink
          to="/dashboard"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '16px',
            textDecoration: 'none',
            cursor: 'pointer',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Scientific Ocean Emblem */}
            <div
              style={{
                width: '36px',
                height: '36px',
                borderRadius: 'var(--radius-md)',
                background: 'linear-gradient(135deg, var(--color-primary-navy) 0%, var(--color-ocean-blue) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontWeight: 800,
                fontSize: '18px',
                boxShadow: '0 2px 6px rgba(11, 42, 74, 0.2)',
              }}
            >
              🌊
            </div>

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 800,
                  letterSpacing: '0.08em',
                  color: 'var(--color-ocean-blue)',
                  textTransform: 'uppercase',
                }}
              >
                OCEANX
              </span>
              <span
                style={{
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: 700,
                  color: 'var(--color-deep-navy)',
                  letterSpacing: '-0.01em',
                }}
              >
                3D Ocean Explorer
              </span>
            </div>
          </div>
        </NavLink>

        {/* Vertical Divider */}
        <div
          style={{
            width: '1px',
            height: '24px',
            backgroundColor: 'var(--color-border)',
          }}
        />

        {/* Left-Aligned Current Page Title */}
        <span
          style={{
            fontSize: '1.15rem',
            fontWeight: 700,
            color: 'var(--color-primary-navy)',
            letterSpacing: '-0.01em',
          }}
        >
          {getPageTitle(location.pathname)}
        </span>
      </div>

      {/* Right: Settings gear icon ONLY */}
      <NavLink
        to="/settings"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-bg-page)',
          border: '1px solid var(--color-border)',
          color: 'var(--color-primary-navy)',
          textDecoration: 'none',
          transition: 'all 0.2s ease',
        }}
        title="Settings"
      >
        <Settings size={18} />
      </NavLink>
    </header>
  );
};
