/**
 * Shared types for metrics data used across frontend components and API.
 */

// ============================================================================
// FILTER TYPES
// ============================================================================

export type StatusFilter = "all" | "success" | "failure";

export interface DateRange {
  readonly startDate: Date;
  readonly endDate: Date;
}

export interface FilterInput extends DateRange {
  status?: StatusFilter;
  model?: string;
}

// ============================================================================
// TIME SERIES DATA
// ============================================================================

/**
 * A single data point in time series charts.
 * Represents aggregated metrics for a specific time bucket (hour/day/week).
 */
export interface TimeSeriesDataPoint {
  date: Date | string;
  count: number;
  successCount: number;
  failureCount: number;
  avgDurationMs: number;
  totalCostUsd: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
}

// ============================================================================
// MODEL COMPARISON
// ============================================================================

/**
 * Statistics for a single model in comparison views.
 */
export interface ModelStats {
  model: string;
  totalRuns: number;
  successRate: number;
  avgDurationMs: number;
  avgLlmCalls: number;
  avgToolCalls: number;
  totalTokens: number;
  totalCostUsd: number;
  avgFilesModified: number;
}

// ============================================================================
// ERROR ANALYSIS
// ============================================================================

/**
 * Grouped error statistics for error breakdown charts.
 */
export interface ErrorBreakdown {
  errorMessage: string;
  count: number;
  wastedCost: number;
}

/**
 * Failure trend data point for failure analysis charts.
 */
export interface FailureTrendDataPoint {
  date: Date | string;
  failureCount: number;
  totalCount: number;
  failureRate: number;
  wastedCost: number;
}

/**
 * Failure statistics grouped by model.
 */
export interface FailuresByModel {
  model: string;
  failureCount: number;
  totalCount: number;
  failureRate: number;
  wastedCost: number;
}

// ============================================================================
// SUMMARY KPIs
// ============================================================================

/**
 * Aggregated summary metrics returned by getSummary endpoint.
 */
export interface SummaryMetrics {
  totalRuns: number;
  successCount: number;
  failureCount: number;
  successRate: number;
  avgDurationMs: number;
  totalCostUsd: number;
  totalTokens: number;
  totalInputTokens: number;
  totalOutputTokens: number;
  avgLlmCalls: number;
  avgToolCalls: number;
  wastedSpend: number;
  costPerSuccess: number;
  cacheHitRate: number;
  cacheReadTokens: number;
  cacheCreationTokens: number;
  avgFilesModified: number;
}
