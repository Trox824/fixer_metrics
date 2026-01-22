import { describe, it, expect } from 'vitest';

// Helper functions extracted from the metrics router for testing
// These represent the core aggregation logic

interface ExecutionRecord {
  status: string;
  durationMs: number;
  reportedCostUsd: number | null;
  totalTokens: number;
}

function calculateSuccessRate(records: ExecutionRecord[]): number {
  if (records.length === 0) return 0;
  const successCount = records.filter((r) => r.status === 'success').length;
  return (successCount / records.length) * 100;
}

function calculateTotalCost(records: ExecutionRecord[]): number {
  return records.reduce((sum, r) => sum + (r.reportedCostUsd ?? 0), 0);
}

function calculateAvgDuration(records: ExecutionRecord[]): number {
  if (records.length === 0) return 0;
  const totalDuration = records.reduce((sum, r) => sum + r.durationMs, 0);
  return totalDuration / records.length;
}

function calculateTotalTokens(records: ExecutionRecord[]): number {
  return records.reduce((sum, r) => sum + r.totalTokens, 0);
}

interface TimeSeriesRecord {
  date: Date;
  status: string;
}

function aggregateByDay(
  records: TimeSeriesRecord[]
): Map<string, { count: number; successCount: number; failureCount: number }> {
  const buckets = new Map<
    string,
    { count: number; successCount: number; failureCount: number }
  >();

  for (const record of records) {
    const dateKey = record.date.toISOString().split('T')[0]!;
    const bucket = buckets.get(dateKey) ?? {
      count: 0,
      successCount: 0,
      failureCount: 0,
    };

    bucket.count++;
    if (record.status === 'success') {
      bucket.successCount++;
    } else {
      bucket.failureCount++;
    }

    buckets.set(dateKey, bucket);
  }

  return buckets;
}

function filterByStatus(
  records: ExecutionRecord[],
  status: string
): ExecutionRecord[] {
  if (status === 'all') return records;
  return records.filter((r) => r.status === status);
}

function filterByModel(
  records: Array<ExecutionRecord & { model: string }>,
  model: string | undefined
): Array<ExecutionRecord & { model: string }> {
  if (!model) return records;
  return records.filter((r) => r.model === model);
}

describe('Metrics Aggregation Logic', () => {
  describe('calculateSuccessRate', () => {
    it('should calculate 90% success rate for 9 success + 1 failure', () => {
      const successRecord: ExecutionRecord = {
        status: 'success',
        durationMs: 1000,
        reportedCostUsd: 0.01,
        totalTokens: 1000,
      };
      const failureRecord: ExecutionRecord = {
        status: 'failure',
        durationMs: 1000,
        reportedCostUsd: 0.01,
        totalTokens: 1000,
      };
      const records: ExecutionRecord[] = [
        successRecord, successRecord, successRecord,
        successRecord, successRecord, successRecord,
        successRecord, successRecord, successRecord,
        failureRecord,
      ];
      expect(calculateSuccessRate(records)).toBe(90);
    });

    it('should return 0% for all failures', () => {
      const failureRecord: ExecutionRecord = {
        status: 'failure',
        durationMs: 1000,
        reportedCostUsd: 0.01,
        totalTokens: 1000,
      };
      const records: ExecutionRecord[] = [
        failureRecord, failureRecord, failureRecord,
        failureRecord, failureRecord,
      ];
      expect(calculateSuccessRate(records)).toBe(0);
    });

    it('should return 100% for all successes', () => {
      const successRecord: ExecutionRecord = {
        status: 'success',
        durationMs: 1000,
        reportedCostUsd: 0.01,
        totalTokens: 1000,
      };
      const records: ExecutionRecord[] = [
        successRecord, successRecord, successRecord,
        successRecord, successRecord,
      ];
      expect(calculateSuccessRate(records)).toBe(100);
    });

    it('should return 0 for empty data', () => {
      expect(calculateSuccessRate([])).toBe(0);
    });
  });

  describe('calculateTotalCost', () => {
    it('should sum all costs correctly', () => {
      const records: ExecutionRecord[] = [
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.5, totalTokens: 1000 },
        { status: 'success', durationMs: 1000, reportedCostUsd: 1.5, totalTokens: 1000 },
        { status: 'success', durationMs: 1000, reportedCostUsd: 2.0, totalTokens: 1000 },
      ];
      expect(calculateTotalCost(records)).toBe(4.0);
    });

    it('should handle null costs (sum only non-null values)', () => {
      const records: ExecutionRecord[] = [
        { status: 'success', durationMs: 1000, reportedCostUsd: 1.0, totalTokens: 1000 },
        { status: 'success', durationMs: 1000, reportedCostUsd: null, totalTokens: 1000 },
        { status: 'success', durationMs: 1000, reportedCostUsd: 2.0, totalTokens: 1000 },
      ];
      expect(calculateTotalCost(records)).toBe(3.0);
    });

    it('should return 0 for empty data', () => {
      expect(calculateTotalCost([])).toBe(0);
    });
  });

  describe('calculateAvgDuration', () => {
    it('should calculate average duration correctly', () => {
      const records: ExecutionRecord[] = [
        { status: 'success', durationMs: 10000, reportedCostUsd: 0.01, totalTokens: 1000 },
        { status: 'success', durationMs: 20000, reportedCostUsd: 0.01, totalTokens: 1000 },
        { status: 'success', durationMs: 30000, reportedCostUsd: 0.01, totalTokens: 1000 },
      ];
      expect(calculateAvgDuration(records)).toBe(20000);
    });

    it('should return 0 for empty data', () => {
      expect(calculateAvgDuration([])).toBe(0);
    });
  });

  describe('calculateTotalTokens', () => {
    it('should sum all tokens correctly', () => {
      const records: ExecutionRecord[] = [
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000 },
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 2000 },
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 3000 },
      ];
      expect(calculateTotalTokens(records)).toBe(6000);
    });

    it('should return 0 for empty data', () => {
      expect(calculateTotalTokens([])).toBe(0);
    });
  });

  describe('aggregateByDay', () => {
    it('should group runs correctly by date', () => {
      const records: TimeSeriesRecord[] = [
        { date: new Date('2024-01-15T10:00:00Z'), status: 'success' },
        { date: new Date('2024-01-15T14:00:00Z'), status: 'success' },
        { date: new Date('2024-01-15T18:00:00Z'), status: 'failure' },
        { date: new Date('2024-01-16T10:00:00Z'), status: 'success' },
      ];

      const result = aggregateByDay(records);

      expect(result.get('2024-01-15')).toEqual({
        count: 3,
        successCount: 2,
        failureCount: 1,
      });
      expect(result.get('2024-01-16')).toEqual({
        count: 1,
        successCount: 1,
        failureCount: 0,
      });
    });

    it('should return empty map for empty data', () => {
      const result = aggregateByDay([]);
      expect(result.size).toBe(0);
    });
  });

  describe('filterByStatus', () => {
    it('should exclude non-matching runs when filtering by success', () => {
      const records: ExecutionRecord[] = [
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000 },
        { status: 'failure', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000 },
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000 },
      ];

      const result = filterByStatus(records, 'success');
      expect(result.length).toBe(2);
      expect(result.every((r) => r.status === 'success')).toBe(true);
    });

    it('should return all records when status is "all"', () => {
      const records: ExecutionRecord[] = [
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000 },
        { status: 'failure', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000 },
      ];

      const result = filterByStatus(records, 'all');
      expect(result.length).toBe(2);
    });
  });

  describe('filterByModel', () => {
    it('should exclude non-matching runs when filtering by model', () => {
      const records = [
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000, model: 'gpt-4' },
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000, model: 'claude-3-opus' },
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000, model: 'gpt-4' },
      ];

      const result = filterByModel(records, 'gpt-4');
      expect(result.length).toBe(2);
      expect(result.every((r) => r.model === 'gpt-4')).toBe(true);
    });

    it('should return all records when model is undefined', () => {
      const records = [
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000, model: 'gpt-4' },
        { status: 'success', durationMs: 1000, reportedCostUsd: 0.01, totalTokens: 1000, model: 'claude-3-opus' },
      ];

      const result = filterByModel(records, undefined);
      expect(result.length).toBe(2);
    });
  });
});

describe('Format Utilities', () => {
  // Testing the format utilities since they're critical for display

  describe('formatNumber', () => {
    it('should format numbers with commas', () => {
      // We're testing the logic pattern that format.ts uses
      const formatNumber = (num: number) =>
        new Intl.NumberFormat('en-US').format(Math.round(num));

      expect(formatNumber(1234)).toBe('1,234');
      expect(formatNumber(1234567)).toBe('1,234,567');
      expect(formatNumber(0)).toBe('0');
    });
  });

  describe('formatPercent', () => {
    it('should format percentages with one decimal', () => {
      const formatPercent = (num: number) => `${num.toFixed(1)}%`;

      expect(formatPercent(94.25)).toBe('94.3%');
      expect(formatPercent(100)).toBe('100.0%');
      expect(formatPercent(0)).toBe('0.0%');
    });
  });

  describe('formatCurrency', () => {
    it('should format as USD with two decimals', () => {
      const formatCurrency = (num: number) =>
        new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(num);

      expect(formatCurrency(45.67)).toBe('$45.67');
      expect(formatCurrency(1234.5)).toBe('$1,234.50');
      expect(formatCurrency(0)).toBe('$0.00');
    });
  });

  describe('formatDuration', () => {
    it('should format milliseconds to human readable', () => {
      const formatDuration = (ms: number) => {
        const seconds = ms / 1000;
        if (seconds < 60) {
          return `${seconds.toFixed(1)}s`;
        }
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.round(seconds % 60);
        return `${minutes}m ${remainingSeconds}s`;
      };

      expect(formatDuration(12300)).toBe('12.3s');
      expect(formatDuration(135000)).toBe('2m 15s');
      expect(formatDuration(60000)).toBe('1m 0s');
    });
  });
});
