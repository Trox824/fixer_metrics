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
import { chartConfig, CHART_COLORS } from "~/lib/chart-config";
import { formatDateShort, formatDateLong, formatNumber } from "~/lib/format";
import { ChartWrapper } from "../shared/ChartWrapper";

interface SuccessRateChartProps {
  data: Array<{
    date: Date | string;
    successCount: number;
    failureCount: number;
  }>;
  isLoading?: boolean;
}

export function SuccessRateChart({ data, isLoading }: SuccessRateChartProps) {
  return (
    <ChartWrapper isLoading={isLoading} isEmpty={data.length === 0}>
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
            fill={CHART_COLORS.success}
            name="Success"
            radius={[0, 0, 0, 0]}
          />
          <Bar
            dataKey="failureCount"
            stackId="status"
            fill={CHART_COLORS.error}
            name="Failure"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartWrapper>
  );
}
