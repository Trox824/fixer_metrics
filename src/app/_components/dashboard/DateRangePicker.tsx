"use client";

import { useState, useRef, useEffect, useMemo } from "react";
import {
  format,
  subDays,
  startOfWeek,
  startOfMonth,
  endOfDay,
  startOfDay,
  isSameDay,
  isWithinInterval,
  addMonths,
  subMonths,
  getDaysInMonth,
  getDay,
  isBefore,
  isAfter,
} from "date-fns";

export interface DateRange {
  startDate: Date;
  endDate: Date;
}

type PresetKey = "week_to_date" | "month_to_date" | "last_7_days" | "last_14_days" | "last_30_days" | "custom";

interface Preset {
  key: PresetKey;
  label: string;
  getRange: () => DateRange;
}

const PRESETS: Preset[] = [
  {
    key: "week_to_date",
    label: "Week to date",
    getRange: () => ({
      startDate: startOfWeek(new Date(), { weekStartsOn: 0 }),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    key: "month_to_date",
    label: "Month to date",
    getRange: () => ({
      startDate: startOfMonth(new Date()),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    key: "last_7_days",
    label: "Last 7 days",
    getRange: () => ({
      startDate: startOfDay(subDays(new Date(), 6)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    key: "last_14_days",
    label: "Last 14 days",
    getRange: () => ({
      startDate: startOfDay(subDays(new Date(), 13)),
      endDate: endOfDay(new Date()),
    }),
  },
  {
    key: "last_30_days",
    label: "Last 30 days",
    getRange: () => ({
      startDate: startOfDay(subDays(new Date(), 29)),
      endDate: endOfDay(new Date()),
    }),
  },
];

interface DateRangePickerProps {
  value: DateRange;
  onChange: (range: DateRange) => void;
}

function CalendarIcon() {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d={direction === "left" ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7"}
      />
    </svg>
  );
}

function Calendar({
  month,
  selectedRange,
  onDateClick,
  hoveredDate,
  onDateHover,
  selectionStart,
}: {
  month: Date;
  selectedRange: DateRange | null;
  onDateClick: (date: Date) => void;
  hoveredDate: Date | null;
  onDateHover: (date: Date | null) => void;
  selectionStart: Date | null;
}) {
  const daysInMonth = getDaysInMonth(month);
  const firstDayOfMonth = getDay(new Date(month.getFullYear(), month.getMonth(), 1));
  const today = new Date();

  const days: (Date | null)[] = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(null);
  }
  for (let i = 1; i <= daysInMonth; i++) {
    days.push(new Date(month.getFullYear(), month.getMonth(), i));
  }

  const isInRange = (date: Date) => {
    if (selectionStart && hoveredDate) {
      const start = isBefore(selectionStart, hoveredDate) ? selectionStart : hoveredDate;
      const end = isBefore(selectionStart, hoveredDate) ? hoveredDate : selectionStart;
      return isWithinInterval(date, { start: startOfDay(start), end: endOfDay(end) });
    }
    if (selectedRange) {
      return isWithinInterval(date, {
        start: startOfDay(selectedRange.startDate),
        end: endOfDay(selectedRange.endDate),
      });
    }
    return false;
  };

  const isRangeStart = (date: Date) => {
    if (selectionStart && !hoveredDate) {
      return isSameDay(date, selectionStart);
    }
    if (selectionStart && hoveredDate) {
      const start = isBefore(selectionStart, hoveredDate) ? selectionStart : hoveredDate;
      return isSameDay(date, start);
    }
    return selectedRange ? isSameDay(date, selectedRange.startDate) : false;
  };

  const isRangeEnd = (date: Date) => {
    if (selectionStart && hoveredDate) {
      const end = isBefore(selectionStart, hoveredDate) ? hoveredDate : selectionStart;
      return isSameDay(date, end);
    }
    return selectedRange ? isSameDay(date, selectedRange.endDate) : false;
  };

  const isFutureDate = (date: Date) => isAfter(startOfDay(date), endOfDay(today));

  return (
    <div className="w-[280px]">
      <div className="mb-3 text-center text-sm font-medium text-foreground">
        {format(month, "MMMM yyyy")}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
          <div key={day} className="py-2 text-center text-xs text-muted-foreground">
            {day}
          </div>
        ))}
        {days.map((date, idx) => {
          if (!date) {
            return <div key={`empty-${idx}`} className="h-9" />;
          }
          const inRange = isInRange(date);
          const isStart = isRangeStart(date);
          const isEnd = isRangeEnd(date);
          const isToday = isSameDay(date, today);
          const isFuture = isFutureDate(date);

          return (
            <div
              key={date.toISOString()}
              className={`relative h-9 ${
                inRange && !isStart && !isEnd ? "bg-accent-muted" : ""
              } ${isStart ? "rounded-l-full bg-accent-muted" : ""} ${
                isEnd ? "rounded-r-full bg-accent-muted" : ""
              }`}
            >
              <button
                type="button"
                disabled={isFuture}
                onClick={() => onDateClick(date)}
                onMouseEnter={() => onDateHover(date)}
                onMouseLeave={() => onDateHover(null)}
                className={`absolute inset-0 m-auto flex h-8 w-8 items-center justify-center rounded-full text-sm transition-colors
                  ${isFuture ? "cursor-not-allowed text-muted-foreground/40" : "cursor-pointer"}
                  ${isStart || isEnd ? "bg-accent text-white" : "text-foreground hover:bg-accent/20"}
                  ${isToday && !isStart && !isEnd ? "ring-1 ring-accent" : ""}
                `}
              >
                {date.getDate()}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function DateRangePicker({ value, onChange }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [leftMonth, setLeftMonth] = useState(() => subMonths(new Date(), 1));
  const [rightMonth, setRightMonth] = useState(() => new Date());
  const [selectionStart, setSelectionStart] = useState<Date | null>(null);
  const [hoveredDate, setHoveredDate] = useState<Date | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const activePreset = useMemo(() => {
    for (const preset of PRESETS) {
      const range = preset.getRange();
      if (
        isSameDay(range.startDate, value.startDate) &&
        isSameDay(range.endDate, value.endDate)
      ) {
        return preset.key;
      }
    }
    return "custom";
  }, [value]);

  const displayLabel = useMemo(() => {
    const preset = PRESETS.find((p) => p.key === activePreset);
    if (preset) return preset.label;
    return `${format(value.startDate, "MMM d")} - ${format(value.endDate, "MMM d, yyyy")}`;
  }, [activePreset, value]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSelectionStart(null);
        setHoveredDate(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePresetClick = (preset: Preset) => {
    onChange(preset.getRange());
    setSelectionStart(null);
    setHoveredDate(null);
    setIsOpen(false);
  };

  const handleDateClick = (date: Date) => {
    if (!selectionStart) {
      setSelectionStart(date);
    } else {
      const start = isBefore(selectionStart, date) ? selectionStart : date;
      const end = isBefore(selectionStart, date) ? date : selectionStart;
      onChange({
        startDate: startOfDay(start),
        endDate: endOfDay(end),
      });
      setSelectionStart(null);
      setHoveredDate(null);
      setIsOpen(false);
    }
  };

  const navigateMonths = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setLeftMonth(subMonths(leftMonth, 1));
      setRightMonth(subMonths(rightMonth, 1));
    } else {
      setLeftMonth(addMonths(leftMonth, 1));
      setRightMonth(addMonths(rightMonth, 1));
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex h-10 items-center gap-2 rounded-lg border border-border bg-card px-3 text-sm hover:bg-muted focus:outline-none focus:ring-2 focus:ring-accent"
      >
        <CalendarIcon />
        <span className="text-foreground">{displayLabel}</span>
        <svg
          className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? "rotate-180" : ""}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full z-50 mt-1 rounded-lg border border-border bg-card shadow-lg">
          <div className="flex">
            {/* Presets */}
            <div className="w-[160px] border-r border-border p-2">
              {PRESETS.map((preset) => (
                <button
                  key={preset.key}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors hover:bg-muted ${
                    activePreset === preset.key ? "bg-muted font-medium" : ""
                  }`}
                >
                  {activePreset === preset.key && (
                    <svg className="h-4 w-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                  <span className={activePreset === preset.key ? "" : "pl-6"}>{preset.label}</span>
                </button>
              ))}
            </div>

            {/* Calendars */}
            <div className="p-4">
              <div className="mb-2 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => navigateMonths("prev")}
                  className="rounded p-1 hover:bg-muted"
                >
                  <ChevronIcon direction="left" />
                </button>
                <div className="flex-1" />
                <button
                  type="button"
                  onClick={() => navigateMonths("next")}
                  className="rounded p-1 hover:bg-muted"
                >
                  <ChevronIcon direction="right" />
                </button>
              </div>
              <div className="flex gap-6">
                <Calendar
                  month={leftMonth}
                  selectedRange={selectionStart ? null : value}
                  onDateClick={handleDateClick}
                  hoveredDate={hoveredDate}
                  onDateHover={setHoveredDate}
                  selectionStart={selectionStart}
                />
                <Calendar
                  month={rightMonth}
                  selectedRange={selectionStart ? null : value}
                  onDateClick={handleDateClick}
                  hoveredDate={hoveredDate}
                  onDateHover={setHoveredDate}
                  selectionStart={selectionStart}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
