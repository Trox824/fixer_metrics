"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { chartConfig, CHART_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatNumber } from "~/lib/format";

interface FailureTrendChartProps {
  data: Array<{
    date: Date | string;
    failureCount: number;
    totalCount: number;
    failureRate: number;
    wastedCost: number;
  }>;
  isLoading?: boolean;
}

export function FailureTrendChart({ data, isLoading }: FailureTrendChartProps) {
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
      <BarChart data={data}>
        <CartesianGrid {...chartConfig.cartesianGrid} />
        <XAxis
          dataKey="date"
          {...chartConfig.xAxis}
          tickFormatter={(value: Date | string) => formatDateShort(value)}
        />
        <YAxis
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => formatNumber(value)}
        />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value) => [formatNumber(Number(value) || 0), "Failures"]}
        />
        <Bar
          dataKey="failureCount"
          fill={CHART_COLORS.error}
          radius={[4, 4, 0, 0]}
          name="Failures"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
