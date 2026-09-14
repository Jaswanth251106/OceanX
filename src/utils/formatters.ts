/**
 * Common formatting helpers for oceanographic data and scientific presentation.
 */

export function formatCelsius(value?: number): string {
  if (value === undefined || value === null) return '--';
  return `${value.toFixed(1)}°C`;
}

export function formatSalinity(value?: number): string {
  if (value === undefined || value === null) return '--';
  return `${value.toFixed(1)} PSU`;
}

export function formatMeters(value?: number): string {
  if (value === undefined || value === null) return '--';
  return `${value.toFixed(1)} m`;
}

export function formatKnots(value?: number): string {
  if (value === undefined || value === null) return '--';
  return `${value.toFixed(1)} kts`;
}

export function formatCoordinates(lat: number, lon: number): string {
  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';
  return `${Math.abs(lat).toFixed(2)}°${latDir}, ${Math.abs(lon).toFixed(2)}°${lonDir}`;
}

export function formatPercent(value: number): string {
  return `${value > 0 ? '+' : ''}${value.toFixed(1)}%`;
}
