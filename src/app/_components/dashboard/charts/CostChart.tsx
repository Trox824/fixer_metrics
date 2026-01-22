"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { chartConfig, CHART_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatCurrency } from "~/lib/format";

interface CostChartProps {
  data: Array<{
    date: Date | string;
    totalCostUsd: number;
    count: number;
  }>;
  isLoading?: boolean;
}

export function CostChart({ data, isLoading }: CostChartProps) {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      costPerRun: d.count > 0 ? d.totalCostUsd / d.count : 0,
    }));
  }, [data]);

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
      <ComposedChart data={chartData}>
        <CartesianGrid {...chartConfig.cartesianGrid} />
        <XAxis
          dataKey="date"
          {...chartConfig.xAxis}
          tickFormatter={(value: Date | string) => formatDateShort(value)}
        />
        <YAxis
          yAxisId="total"
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => `$${value.toFixed(0)}`}
        />
        <YAxis
          yAxisId="perRun"
          orientation="right"
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => `$${value.toFixed(2)}`}
        />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value, name) => [
            formatCurrency(Number(value) || 0),
            name,
          ]}
        />
        <Legend {...chartConfig.legend} />
        <Bar
          yAxisId="total"
          dataKey="totalCostUsd"
          fill={CHART_COLORS.purple}
          fillOpacity={0.3}
          name="Total Cost"
        />
        <Line
          yAxisId="perRun"
          type="monotone"
          dataKey="costPerRun"
          stroke={CHART_COLORS.cyan}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: CHART_COLORS.cyan }}
          name="Cost per Run"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
