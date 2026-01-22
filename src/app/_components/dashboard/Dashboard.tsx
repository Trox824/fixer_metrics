"use client";

import { useState, useMemo } from "react";
import { api } from "~/trpc/react";
import { subDays, startOfDay, endOfDay } from "date-fns";
import { FilterBar, type StatusFilter } from "./FilterBar";
import { KPICards } from "./KPICards";
import { DashboardTabs, type TabId } from "./DashboardTabs";
import { OverviewTab } from "./tabs/OverviewTab";
import { EfficiencyTab } from "./tabs/EfficiencyTab";
import { ErrorsTab } from "./tabs/ErrorsTab";
import type { DateRange } from "./DateRangePicker";

function getDefaultDateRange(): DateRange {
  return {
    startDate: startOfDay(subDays(new Date(), 29)),
    endDate: endOfDay(new Date()),
  };
}

export function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRange>(getDefaultDateRange);
  const [model, setModel] = useState<string>("");
  const [status, setStatus] = useState<StatusFilter>("all");
  const [activeTab, setActiveTab] = useState<TabId>("overview");

  const filterInput = useMemo(
    () => ({
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      status: status,
      model: model || undefined,
    }),
    [dateRange, model, status]
  );

  // Query configuration
  // Models rarely change - cache for 5 minutes
  const MODELS_STALE_TIME = 5 * 60 * 1000;
  // Dashboard data - cache for 30 seconds (balance between freshness and performance)
  const DATA_STALE_TIME = 30 * 1000;

  // Fetch data
  const { data: models = [] } = api.metrics.getModels.useQuery(undefined, {
    staleTime: MODELS_STALE_TIME,
    gcTime: MODELS_STALE_TIME * 2,
  });

  const { data: summary, isLoading: summaryLoading } =
    api.metrics.getSummary.useQuery(filterInput, {
      staleTime: DATA_STALE_TIME,
    });

  const { data: timeSeries = [], isLoading: timeSeriesLoading } =
    api.metrics.getTimeSeries.useQuery(
      {
        ...filterInput,
        granularity: "day",
      },
      { staleTime: DATA_STALE_TIME }
    );

  const { data: modelComparison = [], isLoading: modelComparisonLoading } =
    api.metrics.getModelComparison.useQuery(filterInput, {
      staleTime: DATA_STALE_TIME,
    });

  // Error-specific data (only fetch when on errors tab)
  const { data: errorBreakdown = [], isLoading: errorBreakdownLoading } =
    api.metrics.getErrorBreakdown.useQuery(filterInput, {
      enabled: activeTab === "errors",
      staleTime: DATA_STALE_TIME,
    });

  const { data: failureTrend = [], isLoading: failureTrendLoading } =
    api.metrics.getFailureTrend.useQuery(
      { ...filterInput, granularity: "day" },
      {
        enabled: activeTab === "errors",
        staleTime: DATA_STALE_TIME,
      }
    );

  const { data: failuresByModel = [], isLoading: failuresByModelLoading } =
    api.metrics.getFailuresByModel.useQuery(filterInput, {
      enabled: activeTab === "errors",
      staleTime: DATA_STALE_TIME,
    });

  return (
    <div className="space-y-6">
      {/* Header with Tabs and Filters */}
      <div className="flex flex-col gap-4">
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
            model={model}
            models={models}
            status={status}
            onDateRangeChange={setDateRange}
            onModelChange={setModel}
            onStatusChange={setStatus}
          />
        </div>
        <DashboardTabs activeTab={activeTab} onTabChange={setActiveTab} />
      </div>

      {/* KPI Cards (shown on Overview tab) */}
      {activeTab === "overview" && (
        <KPICards
          totalRuns={summary?.totalRuns ?? 0}
          successRate={summary?.successRate ?? 0}
          avgDurationMs={summary?.avgDurationMs ?? 0}
          totalCostUsd={summary?.totalCostUsd ?? 0}
          avgLlmCalls={summary?.avgLlmCalls ?? 0}
          avgToolCalls={summary?.avgToolCalls ?? 0}
          isLoading={summaryLoading}
        />
      )}

      {/* Tab Content */}
      {activeTab === "overview" && (
        <OverviewTab
          timeSeries={timeSeries}
          modelComparison={modelComparison}
          timeSeriesLoading={timeSeriesLoading}
          modelComparisonLoading={modelComparisonLoading}
          model={model}
        />
      )}

      {activeTab === "efficiency" && (
        <EfficiencyTab
          summary={summary}
          timeSeries={timeSeries}
          summaryLoading={summaryLoading}
          timeSeriesLoading={timeSeriesLoading}
        />
      )}

      {activeTab === "errors" && (
        <ErrorsTab
          summary={summary}
          errorBreakdown={errorBreakdown}
          failureTrend={failureTrend}
          failuresByModel={failuresByModel}
          summaryLoading={summaryLoading}
          errorBreakdownLoading={errorBreakdownLoading}
          failureTrendLoading={failureTrendLoading}
          failuresByModelLoading={failuresByModelLoading}
        />
      )}
    </div>
  );
}
