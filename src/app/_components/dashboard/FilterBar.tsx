"use client";

import { Combobox } from "./Combobox";

interface FilterBarProps {
  dateRange: "7d" | "30d" | "90d";
  status: "all" | "success" | "failure" | "error";
  model: string;
  models: string[];
  onDateRangeChange: (range: "7d" | "30d" | "90d") => void;
  onStatusChange: (status: "all" | "success" | "failure" | "error") => void;
  onModelChange: (model: string) => void;
}

const DATE_RANGE_OPTIONS = [
  { value: "7d", label: "Last 7 days" },
  { value: "30d", label: "Last 30 days" },
  { value: "90d", label: "Last 90 days" },
];

const STATUS_OPTIONS = [
  { value: "all", label: "All Status" },
  { value: "success", label: "Success" },
  { value: "failure", label: "Failure" },
  { value: "error", label: "Error" },
];

export function FilterBar({
  dateRange,
  status,
  model,
  models,
  onDateRangeChange,
  onStatusChange,
  onModelChange,
}: FilterBarProps) {
  const modelOptions = [
    { value: "", label: "All Models" },
    ...models.map((m) => ({ value: m, label: m })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <Combobox
        options={DATE_RANGE_OPTIONS}
        value={dateRange}
        onChange={(v) => onDateRangeChange(v as "7d" | "30d" | "90d")}
        placeholder="Date Range"
        searchPlaceholder="Search range..."
      />

      <Combobox
        options={STATUS_OPTIONS}
        value={status}
        onChange={(v) => onStatusChange(v as "all" | "success" | "failure" | "error")}
        placeholder="Status"
        searchPlaceholder="Search status..."
      />

      <Combobox
        options={modelOptions}
        value={model}
        onChange={onModelChange}
        placeholder="Model"
        searchPlaceholder="Search model..."
        emptyText="No models found"
      />
    </div>
  );
}
