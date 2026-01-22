"use client";

import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { chartConfig, CHART_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatNumber, formatCurrency } from "~/lib/format";

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
      <ComposedChart data={data}>
        <CartesianGrid {...chartConfig.cartesianGrid} />
        <XAxis
          dataKey="date"
          {...chartConfig.xAxis}
          tickFormatter={(value: Date | string) => formatDateShort(value)}
        />
        <YAxis
          yAxisId="count"
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => formatNumber(value)}
        />
        <YAxis
          yAxisId="rate"
          orientation="right"
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => `${value.toFixed(0)}%`}
          domain={[0, "auto"]}
        />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value, name) => {
            if (name === "failureRate") {
              return [`${Number(value).toFixed(1)}%`, "Failure Rate"];
            }
            if (name === "wastedCost") {
              return [formatCurrency(Number(value)), "Wasted Cost"];
            }
            return [formatNumber(Number(value) || 0), "Failures"];
          }}
        />
        <Legend {...chartConfig.legend} />
        <Bar
          yAxisId="count"
          dataKey="failureCount"
          fill={CHART_COLORS.error}
          fillOpacity={0.3}
          name="Failures"
        />
        <Line
          yAxisId="rate"
          type="monotone"
          dataKey="failureRate"
          stroke={CHART_COLORS.error}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: CHART_COLORS.error }}
          name="Failure Rate"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
