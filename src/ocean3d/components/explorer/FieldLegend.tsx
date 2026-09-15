import type { ModelField, ScalarVariable } from '../../services/modelService';
import { SALINITY_COLORS, TEMPERATURE_COLORS } from '../../utils/modelColors';

interface Props {
  field: ModelField | null;
  variable: ScalarVariable;
}

export default function FieldLegend({ field, variable }: Props) {
  if (!field) return null;

  const colors =
    variable === 'thetao' ? TEMPERATURE_COLORS : SALINITY_COLORS;

  const title =
    variable === 'thetao' ? 'Temperature' : 'Salinity';

  const defaultUnit =
    variable === 'thetao' ? '°C' : 'PSU';

  const displayUnit =
    field.unit || defaultUnit;

  const gradient =
    `linear-gradient(to right, ${colors.join(',')})`;

  const middle =
    ((field.min + field.max) / 2).toFixed(2);

  return (
    <div
      style={{
        width: '340px',
        minHeight: '95px',
        boxSizing: 'border-box',

        background: 'rgba(255,255,255,0.97)',
        border: '1px solid #DCE5EC',
        borderRadius: '14px',

        padding: '12px 16px',

        boxShadow: '0 8px 28px rgba(15,23,42,0.18)',
        backdropFilter: 'blur(14px)',

        color: '#152235',
        fontFamily: 'Inter, system-ui, sans-serif',
        pointerEvents: 'auto',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '8px',
        }}
      >
        <span
          style={{
            fontSize: '12px',
            lineHeight: 1,
            fontWeight: 800,
            color: '#152235',
          }}
        >
          {title}
        </span>

        <span
          style={{
            fontSize: '10px',
            fontWeight: 600,
            color: '#64748B',
          }}
        >
          {displayUnit}
        </span>
      </div>

      {/* Gradient */}
      <div
        style={{
          width: '100%',
          height: '9px',
          borderRadius: '999px',
          background: gradient,
        }}
      />

      {/* Numbers */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'space-between',
          marginTop: '5px',

          fontSize: '10px',
          fontFamily: 'monospace',
          color: '#64748B',
        }}
      >
        <span>{field.min.toFixed(2)}</span>
        <span>{middle}</span>
        <span>{field.max.toFixed(2)}</span>
      </div>

      {/* Depth */}
      <div
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: '5px',

          fontSize: '10px',
          fontWeight: 500,
          color: '#94A3B8',
        }}
      >
        Depth: {Number(field.selectedDepth).toFixed(1)} m
      </div>
    </div>
  );
}
