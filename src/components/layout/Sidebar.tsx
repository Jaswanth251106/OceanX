import React from 'react';
import { NavLink } from 'react-router-dom';
import { Activity, ShieldCheck } from 'lucide-react';
import { navItems } from './Navbar';

export interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  return (
    <aside
      style={{
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--color-bg-card)',
        borderRight: '1px solid var(--color-border)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-4) var(--space-3)',
        transition: 'width var(--transition-normal)',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
        {/* Navigation Category Label */}
        {!collapsed && (
          <span
            style={{
              fontSize: '0.7rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color: 'var(--color-text-muted)',
              padding: '0 var(--space-3)',
            }}
          >
            Ocean Navigation
          </span>
        )}

        {/* Sidebar Nav items */}
        <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: collapsed ? '10px 0' : '9px 14px',
                  justifyContent: collapsed ? 'center' : 'flex-start',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 'var(--font-size-sm)',
                  fontWeight: isActive ? 600 : 500,
                  color: isActive ? 'var(--color-ocean-blue)' : 'var(--color-text-secondary)',
                  backgroundColor: isActive ? 'var(--color-light-blue)' : 'transparent',
                  textDecoration: 'none',
                  transition: 'background-color var(--transition-fast), color var(--transition-fast)',
                })}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Bottom Status Card (Operational Health) */}
      {!collapsed && (
        <div
          style={{
            backgroundColor: 'var(--color-bg-page)',
            border: '1px solid var(--color-border-subtle)',
            borderRadius: 'var(--radius-md)',
            padding: 'var(--space-3)',
            display: 'flex',
            flexDirection: 'column',
            gap: '6px',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                color: 'var(--color-text-secondary)',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
              }}
            >
              <Activity size={12} style={{ color: 'var(--color-success)' }} />
              INCOIS Data Feed
            </span>
            <span
              style={{
                width: '6px',
                height: '6px',
                borderRadius: '50%',
                backgroundColor: 'var(--color-success)',
              }}
            />
          </div>
          <span style={{ fontSize: '0.68rem', color: 'var(--color-text-muted)' }}>
            Real-time Telemetry: Live
          </span>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              fontSize: '0.68rem',
              color: 'var(--color-ocean-blue)',
              marginTop: '2px',
            }}
          >
            <ShieldCheck size={12} />
            <span>Encrypted Node 04</span>
          </div>
        </div>
      )}
    </aside>
  );
};
