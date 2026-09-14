# OCEANX / INCOIS 3D OCEAN EXPLORER

Frontend Foundation for an INCOIS-inspired Ocean Data & Intelligence Platform.

## 🌊 Overview

This repository provides the enterprise-grade frontend foundation for the INCOIS / OceanX 3D Ocean Explorer, built with React, TypeScript, Vite, React Router, and a centralized light CSS design-token system.

### Key Architecture Highlights
- **Strict Decoupling**: UI Components connect strictly to the `src/services/` layer. The mock data layer (`src/mockData/`) simulates async API latency and can be swapped for live INCOIS REST/GraphQL/ML APIs with zero UI refactoring.
- **Light Visual Theme**: Uses the light INCOIS Settings aesthetic (`#0B2A4A`, `#087FEA`, `#F6F8FB`, `#FFFFFF`, `#DCE5EF`, etc.) defined in `src/theme/tokens.css`.
- **Reusable Component Library**: 19+ accessible and responsive scientific UI components (`Navbar`, `Sidebar`, `PageHeader`, `StatCard`, `MetricCard`, `ChartCard`, `SectionCard`, `DataTable`, `FilterPanel`, `StatusBadge`, buttons, inputs, and indicators).
- **Isolated Explore Module**: The `/explore` route is strictly isolated as a mount point for the 3D visualization team to integrate Three.js and React Three Fiber without side effects on any existing modules.

---

## 📁 Project Directory Structure

```text
D:\SIH 2026\
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
└── src/
    ├── App.tsx                    # React Router configuration (routes & redirects)
    ├── main.tsx                   # React 18 DOM mount & global token injection
    ├── theme/
    │   ├── tokens.css             # Centralized CSS variables (colors, fonts, radii, shadows)
    │   └── index.css              # CSS resets & scrollbar styling
    ├── types/                     # Strong TypeScript domain definitions
    │   ├── dashboard.ts
    │   ├── observation.ts
    │   ├── comparison.ts
    │   ├── analytics.ts
    │   ├── stakeholder.ts
    │   ├── settings.ts
    │   └── index.ts
    ├── mockData/                  # Decoupled mock oceanographic datasets
    │   ├── dashboardData.ts
    │   ├── observationData.ts
    │   ├── comparisonData.ts
    │   ├── analyticsData.ts
    │   ├── stakeholderData.ts
    │   └── settingsData.ts
    ├── services/                  # Async service & API client simulation layer
    │   ├── apiClient.ts
    │   ├── dashboardService.ts
    │   ├── observationService.ts
    │   ├── comparisonService.ts
    │   ├── analyticsService.ts
    │   ├── stakeholderService.ts
    │   └── settingsService.ts
    ├── components/                # 19 Reusable UI components
    │   ├── common/                # PrimaryButton, SecondaryButton, IconButton
    │   ├── feedback/              # StatusBadge, EmptyState, LoadingState, ProgressBar
    │   ├── cards/                 # StatCard, MetricCard, ChartCard, SectionCard, AlertCard
    │   ├── forms/                 # Dropdown, Toggle, FilterPanel
    │   ├── tables/                # DataTable
    │   ├── navigation/            # Tabs
    │   └── layout/                # Navbar, Sidebar, PageHeader
    ├── layouts/
    │   └── AppLayout/             # Global application shell (Top Navbar + Left Sidebar)
    ├── pages/                     # Module route shells
    │   ├── Dashboard/             # In-situ summary, live alerts, quick actions
    │   ├── Explore/               # ISOLATED 3D Visualizer mount point
    │   ├── Observations/          # Buoy, ARGO float, and tide gauge telemetry
    │   ├── Compare/               # Hydrodynamic model vs In-situ validation
    │   ├── Analytics/             # Regional basin trends and heatwave diagnostics
    │   ├── Stakeholders/          # 6 Persona portals (Fisherman, SAR, Forecaster, etc.)
    │   └── Settings/              # Preferences, system health, sync, and audit logs
    └── utils/
        └── formatters.ts          # Unit formatting (°C, PSU, m, kts, coordinates)
```

---

## 🚀 Getting Started

### Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### Production Build & Typecheck
```bash
npm run build
```

---

## 🗺️ Application Routes

| Route | Description |
|---|---|
| `/` | Automatically redirects to `/dashboard` |
| `/dashboard` | Central INCOIS Ocean Intelligence overview |
| `/explore` | **Isolated Placeholder** for 3D visualization team |
| `/observations` | In-situ sensor telemetry, OMNI buoys & ARGO profilers |
| `/compare` | Model validation (ROMS / WW3 vs Observations) |
| `/analytics` | Ocean climate trends, thermal anomalies & OHC |
| `/stakeholders` | 6 role-specific portals (Fisherman, SAR, Forecaster, etc.) |
| `/settings` | System health, preferences, storage, and audit trail |

---

## 🎨 Global Design Tokens

```css
--color-primary-navy: #0B2A4A;
--color-deep-navy: #06213D;
--color-ocean-blue: #087FEA;
--color-bright-blue: #168BEE;
--color-light-blue: #EAF4FF;
--color-bg-page: #F6F8FB;
--color-bg-card: #FFFFFF;
--color-border: #DCE5EF;
--color-text-primary: #102A43;
--color-text-secondary: #64748B;
--color-text-muted: #94A3B8;
--color-success: #22A06B;
--color-warning: #F59E0B;
--color-danger: #E5484D;
--color-info: #3B82F6;
```
