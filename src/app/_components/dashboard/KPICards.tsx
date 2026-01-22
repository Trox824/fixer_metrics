"use client";

import { formatNumber, formatPercent, formatDuration, formatCurrency } from "~/lib/format";
import { KPICard } from "./shared/KPICard";

interface KPICardsProps {
  totalRuns: number;
  successRate: number;
  avgDurationMs: number;
  totalCostUsd: number;
  avgLlmCalls: number;
  avgToolCalls: number;
  isLoading?: boolean;
}

export function KPICards({
  totalRuns,
  successRate,
  avgDurationMs,
  totalCostUsd,
  avgLlmCalls,
  avgToolCalls,
  isLoading,
}: KPICardsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
      <KPICard
        label="Total Runs"
        value={formatNumber(totalRuns)}
        isLoading={isLoading}
      />
      <KPICard
        label="Success Rate"
        value={formatPercent(successRate)}
        isLoading={isLoading}
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
      <KPICard
        label="Avg LLM Calls"
        value={formatNumber(avgLlmCalls, 1)}
        isLoading={isLoading}
      />
      <KPICard
        label="Avg Tool Calls"
        value={formatNumber(avgToolCalls, 1)}
        isLoading={isLoading}
      />
    </div>
  );
}
