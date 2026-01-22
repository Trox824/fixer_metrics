"use client";

import { useMemo } from "react";
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { chartConfig, CHART_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatTokens } from "~/lib/format";

interface CacheChartProps {
  data: Array<{
    date: Date | string;
    cacheReadTokens: number;
    cacheCreationTokens: number;
    inputTokens: number;
  }>;
  isLoading?: boolean;
}

export function CacheChart({ data, isLoading }: CacheChartProps) {
  const chartData = useMemo(() => {
    return data.map((d) => ({
      ...d,
      cacheHitRate: d.inputTokens > 0 ? (d.cacheReadTokens / d.inputTokens) * 100 : 0,
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
          yAxisId="tokens"
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => formatTokens(value)}
        />
        <YAxis
          yAxisId="rate"
          orientation="right"
          {...chartConfig.yAxis}
          tickFormatter={(value: number) => `${value.toFixed(0)}%`}
          domain={[0, 100]}
        />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value, name) => {
            if (name === "cacheHitRate") {
              return [`${Number(value).toFixed(1)}%`, "Cache Hit Rate"];
            }
            return [formatTokens(Number(value) || 0), name === "cacheReadTokens" ? "Cache Read" : "Cache Creation"];
          }}
        />
        <Legend {...chartConfig.legend} />
        <Area
          yAxisId="tokens"
          type="monotone"
          dataKey="cacheReadTokens"
          fill={CHART_COLORS.success}
          fillOpacity={0.3}
          stroke={CHART_COLORS.success}
          strokeWidth={2}
          name="Cache Read"
          stackId="cache"
        />
        <Area
          yAxisId="tokens"
          type="monotone"
          dataKey="cacheCreationTokens"
          fill={CHART_COLORS.amber}
          fillOpacity={0.3}
          stroke={CHART_COLORS.amber}
          strokeWidth={2}
          name="Cache Creation"
          stackId="cache"
        />
        <Line
          yAxisId="rate"
          type="monotone"
          dataKey="cacheHitRate"
          stroke={CHART_COLORS.cyan}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 4, fill: CHART_COLORS.cyan }}
          name="Cache Hit Rate"
        />
      </ComposedChart>
    </ResponsiveContainer>
  );
}
