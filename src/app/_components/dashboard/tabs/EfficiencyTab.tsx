"use client";

import { ChartCard } from "../ChartCard";
import { CacheChart } from "../charts/CacheChart";
import { TokenUsageChart } from "../charts/TokenUsageChart";
import { CostChart } from "../charts/CostChart";
import { EfficiencyKPICards } from "../EfficiencyKPICards";

interface EfficiencyTabProps {
  summary: {
    cacheHitRate: number;
    totalTokens: number;
    totalRuns: number;
    costPerSuccess: number;
    cacheReadTokens: number;
    cacheCreationTokens: number;
  } | undefined;
  timeSeries: Array<{
    date: Date | string;
    count: number;
    totalCostUsd: number;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
    cacheReadTokens: number;
    cacheCreationTokens: number;
  }>;
  summaryLoading: boolean;
  timeSeriesLoading: boolean;
}

export function EfficiencyTab({
  summary,
  timeSeries,
  summaryLoading,
  timeSeriesLoading,
}: EfficiencyTabProps) {
  const tokensPerRun = summary && summary.totalRuns > 0
    ? summary.totalTokens / summary.totalRuns
    : 0;

  return (
    <div className="space-y-5">
      {/* Efficiency KPIs */}
      <EfficiencyKPICards
        cacheHitRate={summary?.cacheHitRate ?? 0}
        tokensPerRun={tokensPerRun}
        costPerSuccess={summary?.costPerSuccess ?? 0}
        isLoading={summaryLoading}
      />

      {/* Cache Efficiency Chart */}
      <ChartCard
        title="Cache Efficiency"
        subtitle="Cache read/creation tokens and hit rate over time"
        correlationHint="Higher hit rate = lower cost"
      >
        <CacheChart data={timeSeries} isLoading={timeSeriesLoading} />
      </ChartCard>

      {/* Charts Row 2 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Token Usage"
          subtitle="Input and output token breakdown"
        >
          <TokenUsageChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
        <ChartCard
          title="Cost per Run Trend"
          subtitle="Cost efficiency over time"
        >
          <CostChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
      </div>
    </div>
  );
}
