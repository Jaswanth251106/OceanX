import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar } from '../../components/layout/Navbar';
import { Sidebar } from '../../components/layout/Sidebar';
import { initTheme } from '../../theme/themeHelper';
import styles from './AppLayout.module.css';

export const AppLayout: React.FC = () => {
  useEffect(() => {
    initTheme();
  }, []);

  return (
    <div className={styles.layoutContainer}>
      <Navbar />
      <div className={styles.bodyContainer}>
        <Sidebar />
        <main className={styles.mainContent}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};
