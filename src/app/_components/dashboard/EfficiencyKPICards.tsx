"use client";

import { formatPercent, formatTokens, formatCurrency } from "~/lib/format";

interface EfficiencyKPICardsProps {
  cacheHitRate: number;
  tokensPerRun: number;
  costPerSuccess: number;
  isLoading?: boolean;
}

interface KPICardProps {
  label: string;
  value: string;
  isLoading?: boolean;
  variant?: "default" | "success" | "warning";
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
    success: "border-success/30 bg-success/5",
    warning: "border-amber-500/30 bg-amber-500/5",
  };

  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${variantStyles[variant]}`}>
      <div className="text-3xl font-bold tabular-nums text-foreground">
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

export function EfficiencyKPICards({
  cacheHitRate,
  tokensPerRun,
  costPerSuccess,
  isLoading,
}: EfficiencyKPICardsProps) {
  const cacheVariant = cacheHitRate >= 50 ? "success" : cacheHitRate >= 20 ? "default" : "warning";

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <KPICard
        label="Cache Hit Rate"
        value={formatPercent(cacheHitRate)}
        isLoading={isLoading}
        variant={cacheVariant}
      />
      <KPICard
        label="Tokens per Run"
        value={formatTokens(tokensPerRun)}
        isLoading={isLoading}
      />
      <KPICard
        label="Cost per Success"
        value={formatCurrency(costPerSuccess)}
        isLoading={isLoading}
      />
    </div>
  );
}
