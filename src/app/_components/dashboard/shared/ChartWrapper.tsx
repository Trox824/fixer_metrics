"use client";

import type { ReactNode } from "react";

interface ChartWrapperProps {
  isLoading?: boolean;
  isEmpty: boolean;
  height?: number;
  emptyMessage?: string;
  children: ReactNode;
}

/**
 * Wrapper component for charts that handles loading and empty states consistently.
 * Use this to avoid duplicating loading spinners and empty state messages across charts.
 */
export function ChartWrapper({
  isLoading,
  isEmpty,
  height = 280,
  emptyMessage = "No data available",
  children,
}: ChartWrapperProps) {
  if (isLoading) {
    return (
      <div
        className="flex items-center justify-center"
        style={{ height }}
      >
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-accent border-t-transparent" />
      </div>
    );
  }

  if (isEmpty) {
    return (
      <div
        className="flex items-center justify-center text-muted-foreground"
        style={{ height }}
      >
        {emptyMessage}
      </div>
    );
  }

  return <>{children}</>;
}
