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
import { formatNumber, formatPercent, formatCurrency } from "~/lib/format";

interface FailuresByModelChartProps {
  data: Array<{
    model: string;
    failureCount: number;
    totalCount: number;
    failureRate: number;
    wastedCost: number;
  }>;
  isLoading?: boolean;
}

export function FailuresByModelChart({ data, isLoading }: FailuresByModelChartProps) {
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

  // Filter to only show models with failures
  const modelsWithFailures = data.filter((d) => d.failureCount > 0);

  if (modelsWithFailures.length === 0) {
    return (
      <div className="flex h-[280px] flex-col items-center justify-center text-muted-foreground">
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
        <p className="font-medium">No model failures</p>
        <p className="text-sm">All models performing well</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={modelsWithFailures} layout="vertical">
          <CartesianGrid {...chartConfig.cartesianGrid} horizontal={false} vertical />
          <XAxis
            type="number"
            {...chartConfig.xAxis}
            tickFormatter={(value: number) => formatNumber(value)}
          />
          <YAxis
            type="category"
            dataKey="model"
            {...chartConfig.yAxis}
            width={120}
            tick={{ fill: "#334155", fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            {...chartConfig.tooltip}
            formatter={(value, name) => {
              if (name === "failureCount") {
                return [formatNumber(Number(value)), "Failures"];
              }
              return [formatNumber(Number(value)), name];
            }}
          />
          <Legend {...chartConfig.legend} />
          <Bar
            dataKey="failureCount"
            fill={CHART_COLORS.error}
            name="Failures"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ResponsiveContainer>

      {/* Stats table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-2 py-2 text-left font-medium text-muted-foreground">Model</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Failures</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Rate</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Wasted</th>
            </tr>
          </thead>
          <tbody>
            {modelsWithFailures.map((row) => (
              <tr key={row.model} className="border-b border-border-subtle">
                <td className="px-2 py-2 font-medium">{row.model}</td>
                <td className="px-2 py-2 text-right tabular-nums">{formatNumber(row.failureCount)}</td>
                <td className="px-2 py-2 text-right tabular-nums">
                  <span
                    className={
                      row.failureRate <= 5
                        ? "text-success"
                        : row.failureRate <= 15
                          ? "text-warning"
                          : "text-error"
                    }
                  >
                    {formatPercent(row.failureRate)}
                  </span>
                </td>
                <td className="px-2 py-2 text-right tabular-nums text-error">
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
