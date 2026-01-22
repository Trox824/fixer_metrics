"use client";

import type { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  subtitle?: string;
  correlationHint?: string;
  filterWarning?: string;
  children: ReactNode;
}

export function ChartCard({
  title,
  subtitle,
  correlationHint,
  filterWarning,
  children,
}: ChartCardProps) {
  return (
    <div className="rounded-xl border border-border bg-card shadow-sm">
      <div className="border-b border-border-subtle px-5 py-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="text-base font-semibold text-foreground">{title}</h3>
            {subtitle && (
              <p className="text-sm text-muted-foreground">{subtitle}</p>
            )}
          </div>
          {correlationHint && (
            <span
              className="shrink-0 rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground"
              title={correlationHint}
            >
              {correlationHint}
            </span>
          )}
        </div>
        {filterWarning && (
          <p className="mt-2 rounded bg-amber-500/10 px-2 py-1 text-xs text-amber-600 dark:text-amber-400">
            {filterWarning}
          </p>
        )}
      </div>
      <div className="p-5">{children}</div>
    </div>
  );
}
