"use client";

export type KPICardVariant = "default" | "success" | "warning" | "error";

export interface KPICardProps {
  label: string;
  value: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  isLoading?: boolean;
  variant?: KPICardVariant;
}

const variantStyles: Record<KPICardVariant, string> = {
  default: "",
  success: "",
  warning: "",
  error: "",
};

const valueStyles: Record<KPICardVariant, string> = {
  default: "text-foreground",
  success: "text-success",
  warning: "text-amber-600",
  error: "text-error",
};

export function KPICard({
  label,
  value,
  trend,
  isLoading,
  variant = "default",
}: KPICardProps) {
  if (isLoading) {
    return (
      <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
        <div className="mb-2 h-5 w-16 animate-pulse rounded bg-muted" />
        <div className="h-9 w-24 animate-pulse rounded bg-muted" />
        <div className="mt-1 h-4 w-20 animate-pulse rounded bg-muted" />
      </div>
    );
  }

  return (
    <div
      className={`rounded-xl border border-border bg-card p-5 shadow-sm ${variantStyles[variant]}`}
    >
      {trend && (
        <div
          className={`mb-2 inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium ${
            trend.isPositive
              ? "bg-success-muted text-success"
              : "bg-error-muted text-error"
          }`}
        >
          <svg
            className={`h-3 w-3 ${trend.isPositive ? "" : "rotate-180"}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
          {trend.isPositive ? "+" : ""}
          {trend.value.toFixed(1)}%
        </div>
      )}
      <div className={`text-3xl font-bold tabular-nums ${valueStyles[variant]}`}>
        {value}
      </div>
      <div className="mt-1 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

/**
 * Helper function to determine success rate variant
 */
export function getSuccessRateVariant(rate: number): KPICardVariant {
  if (rate >= 90) return "success";
  if (rate >= 70) return "default";
  return "warning";
}

/**
 * Helper function to determine failure rate variant
 */
export function getFailureRateVariant(rate: number): KPICardVariant {
  if (rate <= 5) return "default";
  if (rate <= 15) return "warning";
  return "error";
}

/**
 * Helper function to determine cache hit rate variant
 */
export function getCacheRateVariant(rate: number): KPICardVariant {
  if (rate >= 50) return "success";
  if (rate >= 20) return "default";
  return "warning";
}
