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

interface ModelComparisonProps {
  data: Array<{
    model: string;
    totalRuns: number;
    successRate: number;
    avgDurationMs: number;
    totalCostUsd: number;
  }>;
  isLoading?: boolean;
}

export function ModelComparison({ data, isLoading }: ModelComparisonProps) {
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

  // Chart showing runs per model
  return (
    <div className="space-y-4">
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data} layout="vertical">
          <CartesianGrid {...chartConfig.cartesianGrid} horizontal={false} vertical />
          <XAxis type="number" {...chartConfig.xAxis} tickFormatter={(value: number) => formatNumber(value)} />
          <YAxis
            type="category"
            dataKey="model"
            {...chartConfig.yAxis}
            width={120}
            tick={{ fill: '#334155', fontSize: 12, fontWeight: 500 }}
          />
          <Tooltip
            {...chartConfig.tooltip}
            formatter={(value) => [formatNumber(Number(value) || 0), "Runs"]}
          />
          <Legend {...chartConfig.legend} />
          <Bar dataKey="totalRuns" fill={CHART_COLORS.primary} name="Total Runs" radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>

      {/* Stats table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border">
              <th className="px-2 py-2 text-left font-medium text-muted-foreground">Model</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Runs</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Success</th>
              <th className="px-2 py-2 text-right font-medium text-muted-foreground">Cost</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row) => (
              <tr key={row.model} className="border-b border-border-subtle">
                <td className="px-2 py-2 font-medium">{row.model}</td>
                <td className="px-2 py-2 text-right tabular-nums">{formatNumber(row.totalRuns)}</td>
                <td className="px-2 py-2 text-right tabular-nums">
                  <span
                    className={
                      row.successRate >= 90
                        ? "text-success"
                        : row.successRate >= 70
                          ? "text-warning"
                          : "text-error"
                    }
                  >
                    {formatPercent(row.successRate)}
                  </span>
                </td>
                <td className="px-2 py-2 text-right tabular-nums">{formatCurrency(row.totalCostUsd)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
