/**
 * Chart Color Configuration
 * Professional Analytics Dashboard Palette
 *
 * Design principles:
 * - Muted, sophisticated tones (600-level Tailwind colors)
 * - High contrast for accessibility
 * - Harmonious color relationships
 * - Less visual fatigue for data-heavy dashboards
 *
 * @see https://tailwindcss.com/docs/colors
 * @see https://ui.shadcn.com/colors
 */

export const CHART_COLORS = {
  // Primary metrics - sophisticated indigo-blue
  primary: '#4F46E5',    // indigo-600 - main metric color
  secondary: '#6366F1',  // indigo-500 - lighter variant

  // Semantic colors - professional, not alarming
  success: '#059669',    // emerald-600 - positive outcomes
  error: '#DC2626',      // red-600 - failures (muted red)

  // Accent colors - warm tones for secondary metrics
  amber: '#D97706',      // amber-600 - efficiency/time metrics

  // Additional colors for variety
  purple: '#7C3AED',     // violet-600 - model comparison
  cyan: '#0891B2',       // cyan-600 - cache/additional
  teal: '#0D9488',       // teal-600 - tertiary metrics
  pink: '#DB2777',       // pink-600 - accent
  slate: '#475569',      // slate-600 - neutral data
} as const;

// Model comparison colors (visually distinct, harmonious)
export const MODEL_COLORS = [
  '#4F46E5',  // indigo-600
  '#7C3AED',  // violet-600
  '#0891B2',  // cyan-600
  '#D97706',  // amber-600
  '#DB2777',  // pink-600
  '#0D9488',  // teal-600
] as const;

export const chartConfig = {
  cartesianGrid: {
    strokeDasharray: '3 3',
    stroke: '#E2E8F0',
    vertical: false,
  },
  xAxis: {
    stroke: '#E2E8F0',
    tick: { fill: '#64748B', fontSize: 12 },
    tickLine: false,
    axisLine: { stroke: '#E2E8F0' },
  },
  yAxis: {
    stroke: '#E2E8F0',
    tick: { fill: '#64748B', fontSize: 12 },
    tickLine: false,
    axisLine: false,
    width: 50,
  },
  tooltip: {
    contentStyle: {
      backgroundColor: '#FFFFFF',
      border: '1px solid #E2E8F0',
      borderRadius: '8px',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
      padding: '12px',
    },
    labelStyle: {
      color: '#1E293B',
      fontWeight: 600,
      marginBottom: '4px',
    },
    itemStyle: {
      color: '#64748B',
      fontSize: '13px',
    },
  },
  legend: {
    wrapperStyle: {
      paddingTop: '16px',
    },
    iconType: 'circle' as const,
    iconSize: 8,
  },
} as const;
