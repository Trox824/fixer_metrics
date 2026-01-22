"use client";

import { Combobox } from "./Combobox";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

export type StatusFilter = "all" | "success" | "failure";

interface FilterBarProps {
  dateRange: DateRange;
  model: string;
  models: string[];
  status: StatusFilter;
  onDateRangeChange: (range: DateRange) => void;
  onModelChange: (model: string) => void;
  onStatusChange: (status: StatusFilter) => void;
}

export function FilterBar({
  dateRange,
  model,
  models,
  status,
  onDateRangeChange,
  onModelChange,
  onStatusChange,
}: FilterBarProps) {
  const modelOptions = [
    { value: "", label: "All Models" },
    ...models.map((m) => ({ value: m, label: m })),
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "success", label: "Success" },
    { value: "failure", label: "Failure" },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <DateRangePicker value={dateRange} onChange={onDateRangeChange} />

      <Combobox
        options={statusOptions}
        value={status}
        onChange={(value) => onStatusChange(value as StatusFilter)}
        placeholder="Status"
        searchPlaceholder="Search status..."
        emptyText="No status found"
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
