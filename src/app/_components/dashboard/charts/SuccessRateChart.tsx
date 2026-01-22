"use client";

import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { chartConfig, STATUS_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatNumber } from "~/lib/format";

interface SuccessRateChartProps {
  data: Array<{
    date: Date | string;
    successCount: number;
    failureCount: number;
  }>;
  isLoading?: boolean;
}

export function SuccessRateChart({ data, isLoading }: SuccessRateChartProps) {
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
        <YAxis {...chartConfig.yAxis} tickFormatter={(value: number) => formatNumber(value)} />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value, name) => [
            formatNumber(Number(value) || 0),
            name === "successCount" ? "Success" : "Failure",
          ]}
        />
        <Legend {...chartConfig.legend} />
        <Bar
          dataKey="successCount"
          stackId="status"
          fill={STATUS_COLORS.success}
          name="Success"
          radius={[0, 0, 0, 0]}
        />
        <Bar
          dataKey="failureCount"
          stackId="status"
          fill={STATUS_COLORS.failure}
          name="Failure"
          radius={[4, 4, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
