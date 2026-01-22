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
import { chartConfig, CHART_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatTokens } from "~/lib/format";
import { ChartWrapper } from "../shared/ChartWrapper";

interface TokenUsageChartProps {
  data: Array<{
    date: Date | string;
    inputTokens: number;
    outputTokens: number;
  }>;
  isLoading?: boolean;
}

export function TokenUsageChart({ data, isLoading }: TokenUsageChartProps) {
  return (
    <ChartWrapper isLoading={isLoading} isEmpty={data.length === 0}>
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
            stroke={CHART_COLORS.primary}
            fill={CHART_COLORS.primary}
            fillOpacity={0.6}
            name="Input Tokens"
          />
          <Area
            type="monotone"
            dataKey="outputTokens"
            stackId="1"
            stroke={CHART_COLORS.success}
            fill={CHART_COLORS.success}
            fillOpacity={0.6}
            name="Output Tokens"
          />
        </AreaChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
