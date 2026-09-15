import {
  ArgoFloatsResponse,
  GlidersResponse,
  ArgoComparisonResponse,
  GliderComparisonResponse,
  ComparisonSummaryResponse,
} from '../types/comparison';

export const API_BASE_URL = 'https://sih2026-oceanx.onrender.com';

export const comparisonService = {
  // ── ARGO ENDPOINTS ──────────────────────────────────────────────────────────
  
  // 1. Fetch ARGO platform list (21 floats)
  async getArgoFloats(): Promise<ArgoFloatsResponse> {
    const res = await fetch(`${API_BASE_URL}/api/argo/floats`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ARGO floats: ${res.statusText} (${res.status})`);
    }
    return res.json();
  },

  // 2. Fetch ARGO comparison data for a selected platform_id with pagination
  async getArgoComparisons(
    platform_id: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<ArgoComparisonResponse> {
    const params = new URLSearchParams({
      platform_id,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    const res = await fetch(`${API_BASE_URL}/api/comparison/argo?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ARGO comparison data: ${res.statusText} (${res.status})`);
    }
    return res.json();
  },

  // 3. Fetch ARGO comparison summary
  async getArgoSummary(): Promise<ComparisonSummaryResponse> {
    const res = await fetch(`${API_BASE_URL}/api/comparison/argo/summary`);
    if (!res.ok) {
      throw new Error(`Failed to fetch ARGO comparison summary: ${res.statusText} (${res.status})`);
    }
    return res.json();
  },

  // ── GLIDER ENDPOINTS ────────────────────────────────────────────────────────

  // 1. Fetch Glider platform list (5 gliders)
  async getGliders(): Promise<GlidersResponse> {
    const res = await fetch(`${API_BASE_URL}/api/glider/gliders`);
    if (!res.ok) {
      throw new Error(`Failed to fetch Gliders: ${res.statusText} (${res.status})`);
    }
    return res.json();
  },

  // 2. Fetch Glider comparison data for a selected glider_id with pagination
  async getGliderComparisons(
    glider_id: string,
    limit: number = 100,
    offset: number = 0,
  ): Promise<GliderComparisonResponse> {
    const params = new URLSearchParams({
      glider_id,
      limit: limit.toString(),
      offset: offset.toString(),
    });
    const res = await fetch(`${API_BASE_URL}/api/comparison/glider?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch Glider comparison data: ${res.statusText} (${res.status})`);
    }
    return res.json();
  },

  // 3. Fetch Glider comparison summary for selected glider_id
  async getGliderSummary(glider_id: string): Promise<ComparisonSummaryResponse> {
    const params = new URLSearchParams({ glider_id });
    const res = await fetch(`${API_BASE_URL}/api/comparison/glider/summary?${params.toString()}`);
    if (!res.ok) {
      throw new Error(`Failed to fetch Glider comparison summary: ${res.statusText} (${res.status})`);
    }
    return res.json();
  },
};
