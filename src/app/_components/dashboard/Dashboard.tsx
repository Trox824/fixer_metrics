"use client";

import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { subDays } from "date-fns";
import { FilterBar } from "./FilterBar";
import { KPICards } from "./KPICards";
import { ChartCard } from "./ChartCard";
import { ExecutionsChart } from "./charts/ExecutionsChart";
import { SuccessRateChart } from "./charts/SuccessRateChart";
import { TokenUsageChart } from "./charts/TokenUsageChart";
import { CostChart } from "./charts/CostChart";
import { DurationChart } from "./charts/DurationChart";
import { ModelComparison } from "./ModelComparison";

type DateRange = "7d" | "30d" | "90d";
type Status = "all" | "success" | "failure" | "error";

function getDateRange(range: DateRange): { startDate: Date; endDate: Date } {
  const endDate = new Date();
  const days = range === "7d" ? 7 : range === "30d" ? 30 : 90;
  const startDate = subDays(endDate, days);
  return { startDate, endDate };
}

// Helper to generate dynamic subtitles based on filters
function getFilterContext(status: Status, model: string): string {
  const parts: string[] = [];
  if (status !== "all") {
    parts.push(status === "success" ? "successful" : "failed");
  }
  if (model) {
    parts.push(model);
  }
  return parts.length > 0 ? ` (${parts.join(", ")} runs)` : "";
}

// Filter warnings for specific metric/filter combinations
function getCostFilterWarning(status: Status): string | undefined {
  if (status === "success") {
    return "Showing only successful runs - cost of failed runs is hidden";
  }
  if (status === "failure" || status === "error") {
    return "Showing wasted spend on failed runs";
  }
  return undefined;
}

function getDurationFilterWarning(status: Status): string | undefined {
  if (status === "failure" || status === "error") {
    return "Showing time spent on failed runs (may include partial execution)";
  }
  return undefined;
}

function getTokenFilterWarning(status: Status): string | undefined {
  if (status === "failure" || status === "error") {
    return "Tokens consumed before failure occurred";
  }
  return undefined;
}

export function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange>("30d");
  const [status, setStatus] = useState<Status>("all");
  const [model, setModel] = useState<string>("");

  const { startDate, endDate } = useMemo(() => getDateRange(dateRange), [dateRange]);

  const filterInput = useMemo(
    () => ({
      startDate,
      endDate,
      status,
      model: model || undefined,
    }),
    [startDate, endDate, status, model]
  );

  // Fetch data
  const { data: models = [] } = api.metrics.getModels.useQuery();

  const { data: summary, isLoading: summaryLoading } =
    api.metrics.getSummary.useQuery(filterInput);

  const { data: timeSeries = [], isLoading: timeSeriesLoading } =
    api.metrics.getTimeSeries.useQuery({
      ...filterInput,
      granularity: "day",
    });

  const { data: modelComparison = [], isLoading: modelComparisonLoading } =
    api.metrics.getModelComparison.useQuery(filterInput);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">
            Fixer Agent Metrics
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor performance, costs, and reliability
          </p>
        </div>
        <FilterBar
          dateRange={dateRange}
          status={status}
          model={model}
          models={models}
          onDateRangeChange={setDateRange}
          onStatusChange={setStatus}
          onModelChange={setModel}
        />
      </div>

      {/* KPI Cards */}
      <KPICards
        totalRuns={summary?.totalRuns ?? 0}
        successRate={summary?.successRate ?? 0}
        avgDurationMs={summary?.avgDurationMs ?? 0}
        totalCostUsd={summary?.totalCostUsd ?? 0}
        isLoading={summaryLoading}
      />

      {/* Charts Row 1 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Executions Over Time"
          subtitle={`Daily execution count${getFilterContext(status, model)}`}
        >
          <ExecutionsChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
        <ChartCard
          title="Success / Failure Rate"
          subtitle={`Daily breakdown by status${model ? ` (${model})` : ""}`}
        >
          <SuccessRateChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
      </div>

      {/* Charts Row 2 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Token Usage"
          subtitle={`Input and output tokens${getFilterContext(status, model)}`}
          correlationHint="Tokens drive Cost"
          filterWarning={getTokenFilterWarning(status)}
        >
          <TokenUsageChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
        <ChartCard
          title="Cost Analysis"
          subtitle={`Daily spend + cost per run${getFilterContext(status, model)}`}
          correlationHint="Cost = f(Tokens, Model)"
          filterWarning={getCostFilterWarning(status)}
        >
          <CostChart data={timeSeries} isLoading={timeSeriesLoading} />
        </ChartCard>
      </div>

      {/* Charts Row 3 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Duration Trend"
          subtitle={`Average execution time${getFilterContext(status, model)}`}
          correlationHint="Includes non-LLM time"
          filterWarning={getDurationFilterWarning(status)}
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
