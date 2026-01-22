"use client";

import { formatPercent, formatTokens, formatCurrency } from "~/lib/format";
import { KPICard } from "./shared/KPICard";

interface EfficiencyKPICardsProps {
  cacheHitRate: number;
  tokensPerRun: number;
  costPerSuccess: number;
  isLoading?: boolean;
}

export function EfficiencyKPICards({
  cacheHitRate,
  tokensPerRun,
  costPerSuccess,
  isLoading,
}: EfficiencyKPICardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <KPICard
        label="Cache Hit Rate"
        value={formatPercent(cacheHitRate)}
        isLoading={isLoading}
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
