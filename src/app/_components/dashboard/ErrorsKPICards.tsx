"use client";

import { formatNumber, formatPercent, formatCurrency } from "~/lib/format";
import { KPICard } from "./shared/KPICard";

interface ErrorsKPICardsProps {
  totalFailures: number;
  wastedSpend: number;
  failureRate: number;
  isLoading?: boolean;
}

export function ErrorsKPICards({
  totalFailures,
  wastedSpend,
  failureRate,
  isLoading,
}: ErrorsKPICardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
      <KPICard
        label="Total Failures"
        value={formatNumber(totalFailures)}
        isLoading={isLoading}
      />
      <KPICard
        label="Wasted Spend"
        value={formatCurrency(wastedSpend)}
        isLoading={isLoading}
      />
      <KPICard
        label="Failure Rate"
        value={formatPercent(failureRate)}
        isLoading={isLoading}
      />
    </div>
  );
}
