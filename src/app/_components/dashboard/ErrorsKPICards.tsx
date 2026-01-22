"use client";

import { formatNumber, formatPercent, formatCurrency } from "~/lib/format";

interface ErrorsKPICardsProps {
  totalFailures: number;
  wastedSpend: number;
  failureRate: number;
  isLoading?: boolean;
}

interface KPICardProps {
  label: string;
  value: string;
  isLoading?: boolean;
  variant?: "default" | "error" | "warning";
}

function KPICard({ label, value, isLoading, variant = "default" }: KPICardProps) {
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
    error: "border-error/30 bg-error/5",
    warning: "border-amber-500/30 bg-amber-500/5",
  };

  const valueStyles = {
    default: "text-foreground",
    error: "text-error",
    warning: "text-amber-600",
  };

  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${variantStyles[variant]}`}>
      <div className={`text-3xl font-bold tabular-nums ${valueStyles[variant]}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function ErrorsKPICards({
  totalFailures,
  wastedSpend,
  failureRate,
  isLoading,
}: ErrorsKPICardsProps) {
  const failureVariant = totalFailures === 0 ? "default" : totalFailures > 10 ? "error" : "warning";
  const rateVariant = failureRate <= 5 ? "default" : failureRate <= 15 ? "warning" : "error";

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <KPICard
        label="Total Failures"
        value={formatNumber(totalFailures)}
        isLoading={isLoading}
        variant={failureVariant}
      />
      <KPICard
        label="Wasted Spend"
        value={formatCurrency(wastedSpend)}
        isLoading={isLoading}
        variant={wastedSpend > 0 ? "error" : "default"}
      />
      <KPICard
        label="Failure Rate"
        value={formatPercent(failureRate)}
        isLoading={isLoading}
        variant={rateVariant}
      />
    </div>
  );
}
