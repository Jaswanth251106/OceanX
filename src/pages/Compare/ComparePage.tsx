import React, { useState, useEffect, useCallback } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { comparisonService } from '../../services/comparisonService';
import {
  RegionOption,
  ArgoFloatItem,
  GliderItem,
  ArgoComparisonRecord,
  GliderComparisonRecord,
  ComparisonSummaryResponse,
} from '../../types/comparison';

// Sub-components
import { CompareFilterPanel } from './components/CompareFilterPanel';
import { EmptyCompareState } from './components/EmptyCompareState';
import { ComparisonVisualArea } from './components/ComparisonVisualArea';
import { ComparisonSummaryArea } from './components/ComparisonSummaryArea';
import { Waves, Navigation } from 'lucide-react';

export const ComparePage: React.FC = () => {
  // ── 1. ARGO SECTION STATE ──────────────────────────────────────────────────
  const [argoRegion, setArgoRegion] = useState<RegionOption>('Arabian Sea');
  const [argoFloats, setArgoFloats] = useState<ArgoFloatItem[]>([]);
  const [selectedArgoId, setSelectedArgoId] = useState<string>('');
  const [argoFloatsError, setArgoFloatsError] = useState<string | null>(null);

  // ARGO Data & Summary
  const [argoRecords, setArgoRecords] = useState<ArgoComparisonRecord[]>([]);
  const [argoTotalCount, setArgoTotalCount] = useState<number>(0);
  const [argoOffset, setArgoOffset] = useState<number>(0);
  const argoLimit = 100;
  const [argoSummary, setArgoSummary] = useState<ComparisonSummaryResponse | null>(null);

  // ARGO API Loading & Error states
  const [argoLoading, setArgoLoading] = useState<boolean>(false);
  const [argoError, setArgoError] = useState<string | null>(null);
  const [argoSummaryError, setArgoSummaryError] = useState<string | null>(null);

  // ── 2. GLIDER SECTION STATE ────────────────────────────────────────────────
  const [gliderRegion, setGliderRegion] = useState<RegionOption>('Arabian Sea');
  const [gliders, setGliders] = useState<GliderItem[]>([]);
  const [selectedGliderId, setSelectedGliderId] = useState<string>('');
  const [glidersError, setGlidersError] = useState<string | null>(null);

  // GLIDER Data & Summary
  const [gliderRecords, setGliderRecords] = useState<GliderComparisonRecord[]>([]);
  const [gliderTotalCount, setGliderTotalCount] = useState<number>(0);
  const [gliderOffset, setGliderOffset] = useState<number>(0);
  const gliderLimit = 100;
  const [gliderSummary, setGliderSummary] = useState<ComparisonSummaryResponse | null>(null);

  // GLIDER API Loading & Error states
  const [gliderLoading, setGliderLoading] = useState<boolean>(false);
  const [gliderError, setGliderError] = useState<string | null>(null);
  const [gliderSummaryError, setGliderSummaryError] = useState<string | null>(null);

  // ── 3. INITIAL PLATFORM LIST FETCHES ───────────────────────────────────────
  const fetchArgoPlatforms = useCallback(async () => {
    setArgoFloatsError(null);
    try {
      const data = await comparisonService.getArgoFloats();
      setArgoFloats(data.floats || []);
    } catch (err: any) {
      console.error('Failed to load ARGO floats', err);
      setArgoFloatsError('Failed to load ARGO platforms from backend API.');
    }
  }, []);

  const fetchGliderPlatforms = useCallback(async () => {
    setGlidersError(null);
    try {
      const data = await comparisonService.getGliders();
      setGliders(data.gliders || []);
    } catch (err: any) {
      console.error('Failed to load Gliders', err);
      setGlidersError('Failed to load Glider platforms from backend API.');
    }
  }, []);

  useEffect(() => {
    fetchArgoPlatforms();
    fetchGliderPlatforms();
  }, [fetchArgoPlatforms, fetchGliderPlatforms]);

  // ── 4. ARGO DATA & SUMMARY FETCH ──────────────────────────────────────────
  const fetchArgoData = useCallback(async (platformId: string, offsetVal: number) => {
    if (!platformId) {
      setArgoRecords([]);
      setArgoTotalCount(0);
      setArgoSummary(null);
      return;
    }

    setArgoLoading(true);
    setArgoError(null);
    setArgoSummaryError(null);

    // Fetch comparison records
    try {
      const res = await comparisonService.getArgoComparisons(platformId, argoLimit, offsetVal);
      setArgoRecords(res.comparisons || []);
      setArgoTotalCount(res.count || 0);
    } catch (err: any) {
      console.error('ARGO comparison data fetch error:', err);
      setArgoError('Unable to fetch ARGO comparison data from backend API.');
    } finally {
      setArgoLoading(false);
    }

    // Fetch summary
    try {
      const sumRes = await comparisonService.getArgoSummary();
      setArgoSummary(sumRes);
    } catch (err: any) {
      console.error('ARGO summary fetch error:', err);
      setArgoSummaryError('Unable to fetch ARGO comparison summary.');
    }
  }, [argoLimit]);

  useEffect(() => {
    fetchArgoData(selectedArgoId, argoOffset);
  }, [selectedArgoId, argoOffset, fetchArgoData]);

  // ── 5. GLIDER DATA & SUMMARY FETCH ─────────────────────────────────────────
  const fetchGliderData = useCallback(async (gliderId: string, offsetVal: number) => {
    if (!gliderId) {
      setGliderRecords([]);
      setGliderTotalCount(0);
      setGliderSummary(null);
      return;
    }

    setGliderLoading(true);
    setGliderError(null);
    setGliderSummaryError(null);

    // Fetch comparison records
    try {
      const res = await comparisonService.getGliderComparisons(gliderId, gliderLimit, offsetVal);
      setGliderRecords(res.comparisons || []);
      setGliderTotalCount(res.count || 0);
    } catch (err: any) {
      console.error('Glider comparison data fetch error:', err);
      setGliderError('Unable to fetch Glider comparison data from backend API.');
    } finally {
      setGliderLoading(false);
    }

    // Fetch summary
    try {
      const sumRes = await comparisonService.getGliderSummary(gliderId);
      setGliderSummary(sumRes);
    } catch (err: any) {
      console.error('Glider summary fetch error:', err);
      setGliderSummaryError('Unable to fetch Glider summary metrics.');
    }
  }, [gliderLimit]);

  useEffect(() => {
    fetchGliderData(selectedGliderId, gliderOffset);
  }, [selectedGliderId, gliderOffset, fetchGliderData]);

  // Handle ARGO ID selection
  const handleArgoSelectChange = (id: string) => {
    setSelectedArgoId(id);
    setArgoOffset(0);
  };

  // Handle Glider ID selection
  const handleGliderSelectChange = (id: string) => {
    setSelectedGliderId(id);
    setGliderOffset(0);
  };

  return (
    <div
      style={{
        padding: '2rem',
        maxWidth: 1400,
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem',
      }}
    >
      <PageHeader
        title="Model vs In-Situ Comparison"
        subtitle="Live backend API integration for ARGO floats and autonomous ocean Gliders"
      />

      {/* ── TOP SECTION: ARGO COMPARISON ──────────────────────────────────── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '0.75rem',
            borderBottom: '2px solid #EAF6FF',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              backgroundColor: '#EAF6FF',
              color: '#087FEA',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Waves size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0B3B66', margin: 0 }}>
              1. ARGO Float Comparison
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#58708A', margin: 0 }}>
              Real-time API comparison of GLORYS12V1 numerical ocean models against ARGO profiling floats ({argoFloats.length} platforms available)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch' }}>
          {/* ARGO Filter Panel */}
          <CompareFilterPanel
            platformType="ARGO"
            region={argoRegion}
            selectedId={selectedArgoId}
            argoFloats={argoFloats}
            gliders={[]}
            onRegionChange={setArgoRegion}
            onSelectIdChange={handleArgoSelectChange}
            loading={argoLoading}
            onRetryPlatforms={fetchArgoPlatforms}
            platformError={argoFloatsError}
          />

          {/* ARGO Main Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {!selectedArgoId ? (
              <EmptyCompareState platform="ARGO" region={argoRegion} />
            ) : (
              <ComparisonVisualArea
                platformType="ARGO"
                platformId={selectedArgoId}
                records={argoRecords}
                totalCount={argoTotalCount}
                limit={argoLimit}
                offset={argoOffset}
                onPageChange={setArgoOffset}
                loading={argoLoading}
                error={argoError}
                onRetry={() => fetchArgoData(selectedArgoId, argoOffset)}
              />
            )}
          </div>
        </div>

        {/* B. ARGO COMPARISON SUMMARY (FULL WIDTH - Fills left empty space) */}
        {selectedArgoId && (
          <ComparisonSummaryArea
            platformType="ARGO"
            platformId={selectedArgoId}
            summary={argoSummary}
            loading={argoLoading}
            error={argoSummaryError}
            onRetry={() => fetchArgoData(selectedArgoId, argoOffset)}
          />
        )}
      </section>

      {/* ── SECTION SEPARATOR ─────────────────────────────────────────────── */}
      <hr style={{ border: 'none', borderTop: '2px dashed #D5E5EF', margin: 0 }} />

      {/* ── BOTTOM SECTION: GLIDER COMPARISON ─────────────────────────────── */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
            paddingBottom: '0.75rem',
            borderBottom: '2px solid #E6F7FB',
          }}
        >
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: '10px',
              backgroundColor: '#E6F6FB',
              color: '#0E9F9A',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Navigation size={22} />
          </div>
          <div>
            <h2 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#0B3B66', margin: 0 }}>
              2. Ocean Glider Comparison
            </h2>
            <p style={{ fontSize: '0.825rem', color: '#58708A', margin: 0 }}>
              Real-time API comparison of ocean models against autonomous ocean gliders ({gliders.length} platforms available)
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'stretch' }}>
          {/* Glider Filter Panel */}
          <CompareFilterPanel
            platformType="GLIDER"
            region={gliderRegion}
            selectedId={selectedGliderId}
            argoFloats={[]}
            gliders={gliders}
            onRegionChange={setGliderRegion}
            onSelectIdChange={handleGliderSelectChange}
            loading={gliderLoading}
            onRetryPlatforms={fetchGliderPlatforms}
            platformError={glidersError}
          />

          {/* Glider Main Area */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            {!selectedGliderId ? (
              <EmptyCompareState platform="GLIDER" region={gliderRegion} />
            ) : (
              <ComparisonVisualArea
                platformType="GLIDER"
                platformId={selectedGliderId}
                records={gliderRecords}
                totalCount={gliderTotalCount}
                limit={gliderLimit}
                offset={gliderOffset}
                onPageChange={setGliderOffset}
                loading={gliderLoading}
                error={gliderError}
                onRetry={() => fetchGliderData(selectedGliderId, gliderOffset)}
              />
            )}
          </div>
        </div>

        {/* B. GLIDER COMPARISON SUMMARY (FULL WIDTH - Fills left empty space) */}
        {selectedGliderId && (
          <ComparisonSummaryArea
            platformType="GLIDER"
            platformId={selectedGliderId}
            summary={gliderSummary}
            loading={gliderLoading}
            error={gliderSummaryError}
            onRetry={() => fetchGliderData(selectedGliderId, gliderOffset)}
          />
        )}
      </section>
    </div>
  );
};
