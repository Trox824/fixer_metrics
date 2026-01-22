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
import { formatNumber, formatCurrency } from "~/lib/format";

interface ErrorBreakdownChartProps {
  data: Array<{
    errorMessage: string;
    count: number;
    wastedCost: number;
  }>;
  isLoading?: boolean;
}

function truncateMessage(message: string, maxLength = 40): string {
  if (message.length <= maxLength) return message;
  return message.slice(0, maxLength) + "...";
}

export function ErrorBreakdownChart({ data, isLoading }: ErrorBreakdownChartProps) {
  if (isLoading) {
    return (
      <div className="flex h-[300px] items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex h-[300px] flex-col items-center justify-center text-muted-foreground">
        <svg
          className="mb-2 h-12 w-12 text-success"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <p className="font-medium">No errors in selected period</p>
        <p className="text-sm">All executions completed successfully</p>
      </div>
    );
  }

  const chartData = data.map((d) => ({
    ...d,
    displayMessage: truncateMessage(d.errorMessage),
  }));

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={Math.max(200, data.length * 50)}>
        <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 20 }}>
          <CartesianGrid {...chartConfig.cartesianGrid} horizontal={false} vertical />
          <XAxis
            type="number"
            {...chartConfig.xAxis}
            tickFormatter={(value: number) => formatNumber(value)}
          />
          <YAxis
            type="category"
            dataKey="displayMessage"
            {...chartConfig.yAxis}
            width={180}
            tick={{ fill: "#64748B", fontSize: 11, fontWeight: 500 }}
          />
          <Tooltip
            {...chartConfig.tooltip}
            formatter={(value, name) => {
              if (name === "count") {
                return [formatNumber(Number(value)), "Occurrences"];
              }
              return [formatCurrency(Number(value)), "Wasted Cost"];
            }}
            labelFormatter={(label, payload) => {
              if (payload && payload.length > 0) {
                const item = payload[0]?.payload as { errorMessage?: string } | undefined;
                return item?.errorMessage ?? String(label);
              }
              return String(label);
            }}
          />
          <Bar
            dataKey="count"
            name="count"
            fill={CHART_COLORS.error}
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Summary table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-2 py-2 text-left font-medium text-muted-foreground">Error</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Count</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Wasted</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-border-subtle">
                <td className="max-w-xs truncate px-2 py-2 font-mono text-xs" title={row.errorMessage}>
                  {truncateMessage(row.errorMessage, 50)}
                </td>
                <td className="px-2 py-2 text-right tabular-nums">{formatNumber(row.count)}</td>
                <td className="px-2 py-2 text-right tabular-nums">
                  {formatCurrency(row.wastedCost)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
