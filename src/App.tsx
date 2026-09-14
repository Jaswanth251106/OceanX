import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AppLayout } from './layouts/AppLayout/AppLayout';
import { DashboardPage } from './pages/Dashboard/DashboardPage';
import { ExplorePage } from './pages/Explore/ExplorePage';
import { ObservationsPage } from './pages/Observations/ObservationsPage';
import { ComparePage } from './pages/Compare/ComparePage';
import { AnalyticsPage } from './pages/Analytics/AnalyticsPage';
import { StakeholdersPage } from './pages/Stakeholders/StakeholdersPage';
import { SettingsPage } from './pages/Settings/SettingsPage';

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          {/* Root redirects to /dashboard */}
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/explore" element={<ExplorePage />} />
          <Route path="/observations" element={<ObservationsPage />} />
          <Route path="/compare" element={<ComparePage />} />
          <Route path="/analytics" element={<AnalyticsPage />} />
          <Route path="/stakeholders" element={<StakeholdersPage />} />
          <Route path="/settings" element={<SettingsPage />} />

          {/* Catch-all route redirects back to /dashboard */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
