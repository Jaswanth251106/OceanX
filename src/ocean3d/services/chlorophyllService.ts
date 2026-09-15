import type { ModelField } from './modelService';

const BASE_URL = 'https://sih2026-oceanx.onrender.com';

export interface ChlorophyllMetadata {
  dataset: string;
  variable: string;
  units: string;

  time_start: string;
  time_end: string;

  latitude_min: number;
  latitude_max: number;

  longitude_min: number;
  longitude_max: number;
}

interface ChlorophyllPoint {
  latitude: number;
  longitude: number;
  chlorophyll: number;
}

interface ChlorophyllFieldResponse {
  time: string;
  count: number;
  points: ChlorophyllPoint[];
}

export async function getChlorophyllMetadata(
  signal?: AbortSignal
): Promise<ChlorophyllMetadata> {
  const response = await fetch(`${BASE_URL}/api/chlorophyll/metadata`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Chlorophyll metadata failed: ${response.status}`);
  }

  return response.json();
}

export async function getChlorophyllField(
  signal?: AbortSignal
): Promise<ModelField> {
  const response = await fetch(`${BASE_URL}/api/chlorophyll/field`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`Chlorophyll field failed: ${response.status}`);
  }

  const raw: ChlorophyllFieldResponse = await response.json();

  const points = raw.points ?? [];

  const latitudes = Array.from(
    new Set(points.map((point) => point.latitude))
  ).sort((a, b) => a - b);

  const longitudes = Array.from(
    new Set(points.map((point) => point.longitude))
  ).sort((a, b) => a - b);

  const latitudeIndex = new Map(
    latitudes.map((value, index) => [value, index])
  );

  const longitudeIndex = new Map(
    longitudes.map((value, index) => [value, index])
  );

  const values: (number | null)[][] = Array.from(
    { length: latitudes.length },
    () => Array<number | null>(longitudes.length).fill(null)
  );

  const validValues: number[] = [];

  for (const point of points) {
    const latIndex = latitudeIndex.get(point.latitude);
    const lonIndex = longitudeIndex.get(point.longitude);

    if (
      latIndex === undefined ||
      lonIndex === undefined ||
      !Number.isFinite(point.chlorophyll)
    ) {
      continue;
    }

    values[latIndex][lonIndex] = point.chlorophyll;
    validValues.push(point.chlorophyll);
  }

  return {
    variable: 'chlorophyll' as any,

    latitudes,
    longitudes,
    values,

    min: validValues.length ? Math.min(...validValues) : 0,
    max: validValues.length ? Math.max(...validValues) : 1,

    selectedDepth: 0,
    selectedTime: raw.time,

    unit: 'mg/m3',

    raw,
  };
}
