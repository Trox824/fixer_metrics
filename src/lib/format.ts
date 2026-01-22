/**
 * Format a number with commas for thousands
 * @param num - The number to format
 * @param decimals - Optional number of decimal places (default: 0, rounds to integer)
 * @returns Formatted string or '--' for invalid input
 */
export function formatNumber(num: number | null | undefined, decimals?: number): string {
  if (num == null || !isFinite(num)) return '--';
  if (decimals !== undefined && decimals > 0) {
    return new Intl.NumberFormat('en-US', {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(num);
  }
  return new Intl.NumberFormat('en-US').format(Math.round(num));
}

/**
 * Format a percentage with one decimal place
 * @returns Formatted percentage or '--' for invalid input
 */
export function formatPercent(num: number | null | undefined): string {
  if (num == null || !isFinite(num)) return '--';
  return `${num.toFixed(1)}%`;
}

/**
 * Format currency with two decimal places
 * @returns Formatted currency or '--' for invalid input
 */
export function formatCurrency(num: number | null | undefined): string {
  if (num == null || !isFinite(num)) return '--';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
}

/**
 * Format duration in milliseconds to human readable
 * @returns Formatted duration or '--' for invalid input
 */
export function formatDuration(ms: number | null | undefined): string {
  if (ms == null || !isFinite(ms) || ms < 0) return '--';
  const seconds = ms / 1000;
  if (seconds < 60) {
    return `${seconds.toFixed(1)}s`;
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.round(seconds % 60);
  return `${minutes}m ${remainingSeconds}s`;
}

/**
 * Format large token numbers with K/M suffix
 * @returns Formatted token count or '--' for invalid input
 */
export function formatTokens(num: number | null | undefined): string {
  if (num == null || !isFinite(num)) return '--';
  if (num >= 1_000_000) {
    return `${(num / 1_000_000).toFixed(1)}M`;
  }
  if (num >= 1_000) {
    return `${(num / 1_000).toFixed(1)}K`;
  }
  return formatNumber(num);
}

/**
 * Format date for chart axis labels
 * @returns Formatted date string or '--' for invalid input
 */
export function formatDateShort(date: Date | string | null | undefined): string {
  if (!date) return '--';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '--';
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

/**
 * Format date for tooltips
 * @returns Formatted date string or '--' for invalid input
 */
export function formatDateLong(date: Date | string | null | undefined): string {
  if (!date) return '--';
  const d = typeof date === 'string' ? new Date(date) : date;
  if (isNaN(d.getTime())) return '--';
  return d.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });
}
