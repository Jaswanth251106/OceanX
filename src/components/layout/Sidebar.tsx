import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { navItems } from './Navbar';

export interface SidebarProps {
  collapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ collapsed = false }) => {
  const location = useLocation();
  const isExplore = location.pathname === '/explore';
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <aside
      onMouseEnter={() => {
        if (isExplore) setSidebarOpen(true);
      }}
      onMouseLeave={() => {
        if (isExplore) setSidebarOpen(false);
      }}
      style={{
        position: isExplore ? 'fixed' : 'relative',
        left: 0,
        top: isExplore ? '64px' : undefined,
        bottom: isExplore ? 0 : undefined,
        width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        backgroundColor: 'var(--color-deep-navy)',
        backgroundImage: 'linear-gradient(180deg, var(--color-deep-navy) 0%, var(--color-primary-navy) 100%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 'var(--space-4) var(--space-3)',
        transition: 'transform 220ms ease, width var(--transition-normal)',
        flexShrink: 0,
        color: '#FFFFFF',
        zIndex: 300,
        overflow: 'hidden',
        transform: isExplore && !sidebarOpen ? 'translateX(calc(-100% + 10px))' : 'translateX(0)',
        boxShadow: isExplore && sidebarOpen ? '6px 0 24px rgba(0,0,0,0.18)' : 'none',
      }}
    >
      {/* Subtle Sidebar Water Texture Overlay & Wave Lines */}
      <div style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, opacity: 0.05, background: 'radial-gradient(circle at 50% -20%, #ffffff 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ 
        position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, 
        opacity: 0.15, pointerEvents: 'none',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg viewBox="0 0 240 800" xmlns="http://www.w3.org/2000/svg"><path fill="none" stroke="%2300B8D9" stroke-width="2" d="M-50,100 C100,200 150,50 300,150 M-50,300 C150,400 50,250 300,350 M-50,600 C100,500 200,750 300,650" opacity="0.5"/></svg>')`,
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', position: 'relative', zIndex: 1 }}>
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
                  color: isActive ? '#FFFFFF' : 'rgba(255, 255, 255, 0.65)',
                  backgroundColor: isActive ? 'rgba(8, 127, 234, 0.25)' : 'transparent',
                  borderLeft: isActive ? '3px solid var(--color-cyan)' : '3px solid transparent',
                  textDecoration: 'none',
                  transition: 'all var(--transition-fast)',
                  position: 'relative',
                  zIndex: 1
                })}
              >
                <Icon size={18} style={{ flexShrink: 0 }} />
                {!collapsed && <span>{item.label}</span>}
              </NavLink>
            );
          })}
        </nav>
      </div>
    </aside>
  );
};
