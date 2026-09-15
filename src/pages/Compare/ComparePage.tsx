import React, { useState, useEffect } from 'react';
import { PageHeader } from '../../components/layout/PageHeader';
import { comparisonService } from '../../services/comparisonService';
import { ComparisonOptions, CompleteComparisonData, ComparisonFilterState } from '../../types/comparison';

// Sub-components
import { ComparisonFilters } from './components/ComparisonFilters';
import { ModelViewCard } from './components/ModelViewCard';
import { ObservationViewCard } from './components/ObservationViewCard';
import { ComparisonProfiles } from './components/ComparisonProfiles';
import { SelectionDetails } from './components/SelectionDetails';
import { ModelGridMatch } from './components/ModelGridMatch';
import { ComparisonMetrics } from './components/ComparisonMetrics';
import { BiasAnalysis } from './components/BiasAnalysis';

export const ComparePage: React.FC = () => {
  const [options, setOptions] = useState<ComparisonOptions | null>(null);
  const [filters, setFilters] = useState<ComparisonFilterState>({
    model: 'hycom_as',
    observationSource: 'argo_floats',
    variable: 'temperature',
    region: 'arabian_sea',
    depth: 0,
    date: '2026-09-10',
  });
  
  const [data, setData] = useState<CompleteComparisonData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load initial options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const opts = await comparisonService.getComparisonOptions();
        setOptions(opts);
      } catch (err) {
        console.error('Failed to load comparison options', err);
        setError('Failed to load comparison options.');
      }
    };
    fetchOptions();
  }, []);

  // Load comparison data
  const loadData = async (currentFilters: ComparisonFilterState) => {
    setLoading(true);
    setError(null);
    try {
      const res = await comparisonService.getComparisonData(currentFilters);
      setData(res);
    } catch (err) {
      console.error('Failed to load comparison data', err);
      setError('Failed to load comparison data.');
    } finally {
      setLoading(false);
    }
  };

  // Initial load
  useEffect(() => {
    loadData(filters);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleApply = () => {
    loadData(filters);
  };

  return (
    <div style={{ padding: '2rem', maxWidth: 1400, margin: '0 auto' }}>
      <PageHeader
          title="Compare Data"
          subtitle="Model vs In-Situ Observation Analysis"
        />

        <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1.5rem', alignItems: 'flex-start' }}>
          
          {/* Left panel: Filters */}
          {options ? (
            <ComparisonFilters
              options={options}
              filters={filters}
              onChange={setFilters}
              onApply={handleApply}
              loading={loading}
            />
          ) : (
            <div style={{ width: 240, minWidth: 200, padding: '2rem', textAlign: 'center', color: '#5a7184' }}>
              Loading filters...
            </div>
          )}

          {/* Main content */}
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            
            {error && (
              <div style={{ padding: '1rem', background: '#FFF0F0', color: '#E5484D', borderRadius: '8px', border: '1px solid #FECACA' }}>
                {error}
              </div>
            )}

            {!data && loading && !error && (
              <div style={{ padding: '4rem', textAlign: 'center', color: '#5a7184' }}>
                Loading comparison data...
              </div>
            )}

            {data && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                
                {/* Row 1: Model & Observation Cards */}
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <ModelViewCard data={data.modelData} />
                  <ObservationViewCard data={data.observationData} />
                </div>

                {/* Row 2: Metrics */}
                <ComparisonMetrics metrics={data.metrics} />

                {/* Row 3: Profiles and Grid Info */}
                <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap' }}>
                  <ComparisonProfiles
                    tempProfile={data.temperatureProfile}
                    salinityProfile={data.salinityProfile}
                    activeVariable={filters.variable}
                  />
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', flex: 1, minWidth: 280 }}>
                    <SelectionDetails 
                      gridInfo={data.gridInfo} 
                      obsLat={data.observationData.lat} 
                      obsLon={data.observationData.lon} 
                    />
                    <ModelGridMatch gridInfo={data.gridInfo} />
                  </div>
                </div>

                {/* Row 4: Bias Analysis */}
                <div style={{ display: 'flex', gap: '1.5rem' }}>
                  <BiasAnalysis biasData={data.biasAnalysis} />
                </div>

              </div>
            )}
            
          </div>
        </div>
      </div>
  );
};
