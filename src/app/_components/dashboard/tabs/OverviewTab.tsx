"use client";

import { ChartCard } from "../ChartCard";
import { ExecutionsChart } from "../charts/ExecutionsChart";
import { SuccessRateChart } from "../charts/SuccessRateChart";
import { DurationChart } from "../charts/DurationChart";
import { ModelComparison } from "../ModelComparison";

interface OverviewTabProps {
  timeSeries: Array<{
    date: Date | string;
    count: number;
    successCount: number;
    failureCount: number;
    avgDurationMs: number;
    totalCostUsd: number;
    inputTokens: number;
    outputTokens: number;
    totalTokens: number;
  }>;
  modelComparison: Array<{
    model: string;
    totalRuns: number;
    successRate: number;
    avgDurationMs: number;
    totalCostUsd: number;
    avgFilesModified: number;
  }>;
  timeSeriesLoading: boolean;
  modelComparisonLoading: boolean;
  model: string;
}

function getFilterContext(model: string): string {
  return model ? ` (${model})` : "";
}

export function OverviewTab({
  timeSeries,
  modelComparison,
  timeSeriesLoading,
  modelComparisonLoading,
  model,
}: OverviewTabProps) {
  return (
    <div className="space-y-5">
      {/* Charts Row 1 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Executions Over Time"
          subtitle={`Daily execution count${getFilterContext(model)}`}
        >
          <ExecutionsChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
        <ChartCard
          title="Success / Failure Rate"
          subtitle={`Daily breakdown by status${getFilterContext(model)}`}
        >
          <SuccessRateChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Duration Trend"
          subtitle={`Average execution time${getFilterContext(model)}`}
          correlationHint="Includes non-LLM time"
        >
          <DurationChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
        <ChartCard
          title="Model Comparison"
          subtitle="Performance metrics by model"
        >
          <ModelComparison data={modelComparison} isLoading={modelComparisonLoading} />
        </ChartCard>
      </div>
    </div>
  );
}
