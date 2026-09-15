import React, { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { initTheme } from '../../theme/themeHelper';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC = () => {
  const location = useLocation();
  const isExplore = location.pathname === '/explore';

  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className={styles.layoutContainer}>
      <Navbar />
      <div className={styles.bodyContainer}>
        <Sidebar />
        <main
          className={styles.mainContent}
          style={{
            marginLeft: isExplore ? 0 : undefined,
            padding: isExplore ? 0 : undefined,
            overflow: isExplore ? 'hidden' : undefined,
          }}
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
};
