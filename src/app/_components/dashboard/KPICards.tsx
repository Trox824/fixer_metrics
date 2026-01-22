"use client";

import { formatNumber, formatPercent, formatDuration, formatCurrency } from "~/lib/format";

interface KPICardsProps {
  totalRuns: number;
  successRate: number;
  avgDurationMs: number;
  totalCostUsd: number;
  isLoading?: boolean;
}

interface KPICardProps {
  label: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  variant?: "default" | "warning" | "success";
}

function KPICard({ label, value, trend, isLoading, variant = "default" }: KPICardProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-2 h-5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-9 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-20 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  const variantStyles = {
    default: "",
    warning: "border-error/30 bg-error/5",
    success: "border-success/30 bg-success/5",
  };

  const valueStyles = {
    default: "text-foreground",
    warning: "text-error",
    success: "text-success",
  };

  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${variantStyles[variant]}`}>
      {trend && (
        <div
          className={`mb-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            trend.isPositive
              ? "bg-success-muted text-success"
              : "bg-error-muted text-error"
          }`}
        >
          <svg
            className={`h-3 w-3 ${trend.isPositive ? "" : "rotate-180"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          {trend.isPositive ? "+" : ""}
          {trend.value.toFixed(1)}%
        </div>
      )}
      <div className={`text-3xl font-bold tabular-nums ${valueStyles[variant]}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function KPICards({
  totalRuns,
  successRate,
  avgDurationMs,
  totalCostUsd,
  isLoading,
}: KPICardsProps) {
  const successRateVariant = successRate >= 90 ? "success" : successRate >= 70 ? "default" : "warning";

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      <KPICard
        label="Total Runs"
        value={formatNumber(totalRuns)}
        isLoading={isLoading}
      />
      <KPICard
        label="Success Rate"
        value={formatPercent(successRate)}
        isLoading={isLoading}
        variant={successRateVariant}
      />
      <KPICard
        label="Avg Duration"
        value={formatDuration(avgDurationMs)}
        isLoading={isLoading}
      />
      <KPICard
        label="Total Cost"
        value={formatCurrency(totalCostUsd)}
        isLoading={isLoading}
      />
    </div>
  );
}
