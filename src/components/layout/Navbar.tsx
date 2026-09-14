import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  Bell,
  HelpCircle,
  Compass,
  LayoutDashboard,
  Waves,
  GitCompare,
  BarChart3,
  Users,
  Settings,
} from 'lucide-react';
import { IconButton } from '../common/IconButton';

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
  { path: '/settings', label: 'Settings', icon: Settings },
];

export const Navbar: React.FC<NavbarProps> = () => {
  return (
    <header
      style={{
        height: 'var(--header-height)',
        backgroundColor: 'var(--color-bg-card)',
        borderBottom: '1px solid var(--color-border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 var(--space-6)',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: 'var(--shadow-sm)',
      }}
    >
      {/* Left: Branding */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
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
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 700,
                  letterSpacing: '0.08em',
                  color: 'var(--color-ocean-blue)',
                  textTransform: 'uppercase',
                }}
              >
                INCOIS
              </span>
              <span style={{ fontSize: '10px', color: 'var(--color-border)' }}>|</span>
              <span
                style={{
                  fontSize: 'var(--font-size-xs)',
                  fontWeight: 600,
                  color: 'var(--color-text-secondary)',
                  letterSpacing: '0.04em',
                }}
              >
                OCEANX
              </span>
            </div>
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
      </div>

      {/* Middle: Horizontal Nav items */}
      <nav
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          height: '100%',
        }}
        className="ocean-nav-links"
      >
        {navItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            style={({ isActive }) => ({
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              height: '100%',
              padding: '0 12px',
              fontSize: 'var(--font-size-sm)',
              fontWeight: isActive ? 600 : 500,
              color: isActive ? 'var(--color-ocean-blue)' : 'var(--color-text-secondary)',
              borderBottom: isActive ? '3px solid var(--color-ocean-blue)' : '3px solid transparent',
              textDecoration: 'none',
              transition: 'color var(--transition-fast), border-color var(--transition-fast)',
              backgroundColor: 'transparent',
            })}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Right: Actions, Notifications, Help, Profile */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        {/* Help button */}
        <IconButton
          icon={<HelpCircle size={18} />}
          label="INCOIS Documentation & Help"
          variant="ghost"
        />

        {/* Notification bell with active pill */}
        <div style={{ position: 'relative' }}>
          <IconButton
            icon={<Bell size={18} />}
            label="Operational Alerts & Telemetry Notifications"
            variant="ghost"
          />
          <span
            style={{
              position: 'absolute',
              top: '6px',
              right: '6px',
              width: '8px',
              height: '8px',
              backgroundColor: 'var(--color-danger)',
              borderRadius: '50%',
              border: '2px solid var(--color-bg-card)',
            }}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            width: '1px',
            height: '24px',
            backgroundColor: 'var(--color-border)',
            margin: '0 4px',
          }}
        />

        {/* User profile avatar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            cursor: 'pointer',
            padding: '4px 8px',
            borderRadius: 'var(--radius-md)',
            transition: 'background-color var(--transition-fast)',
          }}
          title="Scientist Profile (INCOIS Hyderabad)"
        >
          <div
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '50%',
              backgroundColor: 'var(--color-light-blue)',
              border: '1.5px solid var(--color-ocean-blue)',
              color: 'var(--color-ocean-blue)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--font-size-xs)',
              fontWeight: 700,
            }}
          >
            IN
          </div>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              lineHeight: 1.1,
            }}
          >
            <span style={{ fontSize: 'var(--font-size-xs)', fontWeight: 600, color: 'var(--color-text-primary)' }}>
              Dr. Scientist
            </span>
            <span style={{ fontSize: '0.7rem', color: 'var(--color-text-muted)' }}>
              INCOIS Ocean Lead
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
