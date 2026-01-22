"use client";

import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { chartConfig, TOKEN_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatTokens } from "~/lib/format";

interface TokenUsageChartProps {
  data: Array<{
    date: Date | string;
    inputTokens: number;
    outputTokens: number;
  }>;
  isLoading?: boolean;
}

export function TokenUsageChart({ data, isLoading }: TokenUsageChartProps) {
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
      <AreaChart data={data}>
        <CartesianGrid {...chartConfig.cartesianGrid} />
        <XAxis
          dataKey="date"
          {...chartConfig.xAxis}
          tickFormatter={(value: Date | string) => formatDateShort(value)}
        />
        <YAxis {...chartConfig.yAxis} tickFormatter={(value: number) => formatTokens(value)} />
        <Tooltip
          {...chartConfig.tooltip}
          labelFormatter={(value) => formatDateLong(value as Date | string)}
          formatter={(value, name) => [
            formatTokens(Number(value) || 0),
            name,
          ]}
        />
        <Legend {...chartConfig.legend} />
        <Area
          type="monotone"
          dataKey="inputTokens"
          stackId="1"
          stroke={TOKEN_COLORS.input}
          fill={TOKEN_COLORS.input}
          fillOpacity={0.6}
          name="Input Tokens"
        />
        <Area
          type="monotone"
          dataKey="outputTokens"
          stackId="1"
          stroke={TOKEN_COLORS.output}
          fill={TOKEN_COLORS.output}
          fillOpacity={0.6}
          name="Output Tokens"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
