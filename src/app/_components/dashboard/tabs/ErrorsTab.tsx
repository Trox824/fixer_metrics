"use client";

import { ChartCard } from "../ChartCard";
import { ErrorBreakdownChart } from "../charts/ErrorBreakdownChart";
import { FailureTrendChart } from "../charts/FailureTrendChart";
import { FailuresByModelChart } from "../charts/FailuresByModelChart";
import { ErrorsKPICards } from "../ErrorsKPICards";

interface ErrorsTabProps {
  summary: {
    failureCount: number;
    wastedSpend: number;
    successRate: number;
    totalRuns: number;
  } | undefined;
  errorBreakdown: Array<{
    errorMessage: string;
    count: number;
    wastedCost: number;
  }>;
  failureTrend: Array<{
    date: Date | string;
    failureCount: number;
    totalCount: number;
    failureRate: number;
    wastedCost: number;
  }>;
  failuresByModel: Array<{
    model: string;
    failureCount: number;
    totalCount: number;
    failureRate: number;
    wastedCost: number;
  }>;
  summaryLoading: boolean;
  errorBreakdownLoading: boolean;
  failureTrendLoading: boolean;
  failuresByModelLoading: boolean;
}

export function ErrorsTab({
  summary,
  errorBreakdown,
  failureTrend,
  failuresByModel,
  summaryLoading,
  errorBreakdownLoading,
  failureTrendLoading,
  failuresByModelLoading,
}: ErrorsTabProps) {
  const failureRate = summary && summary.totalRuns > 0
    ? 100 - summary.successRate
    : 0;

  return (
    <div className="space-y-5">
      {/* Errors KPIs */}
      <ErrorsKPICards
        totalFailures={summary?.failureCount ?? 0}
        wastedSpend={summary?.wastedSpend ?? 0}
        failureRate={failureRate}
        isLoading={summaryLoading}
      />

      {/* Error Breakdown */}
      <ChartCard
        title="Error Breakdown"
        subtitle="Top 10 errors by occurrence"
      >
        <ErrorBreakdownChart data={errorBreakdown} isLoading={errorBreakdownLoading} />
      </ChartCard>

      {/* Charts Row 2 */}
      <div className="grid gap-5 lg:grid-cols-2">
        <ChartCard
          title="Failure Trend"
          subtitle="Failures and failure rate over time"
        >
          <FailureTrendChart data={failureTrend} isLoading={failureTrendLoading} />
        </ChartCard>
        <ChartCard
          title="Failures by Model"
          subtitle="Model reliability comparison"
        >
          <FailuresByModelChart data={failuresByModel} isLoading={failuresByModelLoading} />
        </ChartCard>
      </div>
    </div>
  );
}
