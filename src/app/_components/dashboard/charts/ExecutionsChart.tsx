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
import { formatDateShort, formatDateLong, formatNumber } from "~/lib/format";

interface ExecutionsChartProps {
  data: Array<{
    date: Date | string;
    count: number;
  }>;
  isLoading?: boolean;
}

export function ExecutionsChart({ data, isLoading }: ExecutionsChartProps) {
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
        <YAxis {...chartConfig.yAxis} tickFormatter={(value: number) => formatNumber(value)} />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value) => [formatNumber(Number(value) || 0), "Executions"]}
        />
        <Line
          type="monotone"
          dataKey="count"
          stroke={CHART_COLORS.primary}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: CHART_COLORS.primary }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
