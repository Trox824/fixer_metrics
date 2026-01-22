export const CHART_COLORS = {
  primary: '#0052FF',
  success: '#10B981',
  error: '#EF4444',
  purple: '#8B5CF6',
  amber: '#F59E0B',
  pink: '#EC4899',
  cyan: '#06B6D4',
} as const;

export const TOKEN_COLORS = {
  input: '#0052FF',
  output: '#10B981',
} as const;

export const STATUS_COLORS = {
  success: '#10B981',
  failure: '#EF4444',
} as const;

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
      color: '#0F172A',
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
