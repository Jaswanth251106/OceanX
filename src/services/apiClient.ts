/**
 * Base API Client abstraction for OCEANX / INCOIS Explorer.
 * In development, returns mock data with simulated async network latency.
 * Ready to be connected to real INCOIS REST / GraphQL / ML endpoints in production.
 */

export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
  timestamp: string;
}

export const SIMULATED_LATENCY_MS = 120;

export async function simulateNetworkDelay(ms: number = SIMULATED_LATENCY_MS): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export const apiClient = {
  async get<T>(endpoint: string, mockFallback: T): Promise<ApiResponse<T>> {
    await simulateNetworkDelay();
    return {
      data: mockFallback,
      status: 200,
      message: `Retrieved from mock service for [${endpoint}]`,
      timestamp: new Date().toISOString(),
    };
  },

  async post<T, B = unknown>(endpoint: string, _payload: B, mockFallback: T): Promise<ApiResponse<T>> {
    await simulateNetworkDelay();
    return {
      data: mockFallback,
      status: 201,
      message: `Simulated POST to [${endpoint}]`,
      timestamp: new Date().toISOString(),
    };
  },
};
