"use client";

import { Combobox } from "./Combobox";
import { DateRangePicker, type DateRange } from "./DateRangePicker";

interface FilterBarProps {
  dateRange: DateRange;
  model: string;
  models: string[];
  onDateRangeChange: (range: DateRange) => void;
  onModelChange: (model: string) => void;
}

export function FilterBar({
  dateRange,
  model,
  models,
  onDateRangeChange,
  onModelChange,
}: FilterBarProps) {
  const modelOptions = [
    { value: "", label: "All Models" },
    ...models.map((m) => ({ value: m, label: m })),
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <DateRangePicker value={dateRange} onChange={onDateRangeChange} />

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
