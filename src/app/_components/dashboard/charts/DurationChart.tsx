"use client";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartConfig, CHART_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatDuration } from "~/lib/format";

interface DurationChartProps {
  data: Array<{
    date: Date | string;
    avgDurationMs: number;
  }>;
  isLoading?: boolean;
}

export function DurationChart({ data, isLoading }: DurationChartProps) {
  if (isLoading) {
    return (
      <div className="flex h-[280px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[280px] items-center justify-center text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={280}>
      <LineChart data={data}>
        <CartesianGrid {...chartConfig.cartesianGrid} />
        <XAxis
          dataKey="date"
          {...chartConfig.xAxis}
          tickFormatter={(value: Date | string) => formatDateShort(value)}
        />
        <YAxis
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => `${(value / 1000).toFixed(0)}s`}
        />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value) => [formatDuration(Number(value) || 0), "Avg Duration"]}
        />
        <Line
          type="monotone"
          dataKey="avgDurationMs"
          stroke={CHART_COLORS.amber}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: CHART_COLORS.amber }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
