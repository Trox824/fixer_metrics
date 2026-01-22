# Fixer Agent Metrics Dashboard — Technical Write-up

## 1. Metrics Selection Rationale

The dashboard is organized into **three specialized tabs** serving distinct stakeholder needs:

**Overview Tab (Leadership + Ops):** Answers "Is the system healthy?" through execution count (volume trends), success rate (reliability SLA), cost analysis (daily spend + normalized cost per run), token usage (cost drivers), and duration (performance baseline). The dual-axis cost chart was critical - showing both total spend and cost-per-run prevents misinterpretation when execution volume changes (e.g., 50% drop in total cost may just mean 50% fewer runs, not improved efficiency).

**Efficiency Tab (Engineering):** Surfaces optimization opportunities through cache performance (hit rate directly impacts cost - 50% cache hits reduce Claude token costs ~40%) and model comparison tables (success rate, duration, cost grouped by model for data-driven selection). The "Avg Files Modified" metric serves as a productivity proxy for successful runs.

**Errors Tab (Engineering):** Enables root cause analysis through error breakdown (top 10 error types with frequency), failure trends (detects spikes correlating with deployments), and failures-by-model charts (identifies model-specific reliability issues). Without this, teams blindly retry failures instead of fixing root causes (e.g., "70% of failures are rate limits" → increase quotas, not retry logic).

**Why these metrics over alternatives:**
- **Chose cache hit rate over raw cache tokens** - Hit rate is actionable (target: >40%), absolute tokens are not
- **Chose cost per run over total cost** - Normalizes volume fluctuations
- **Chose top 10 errors over all errors** - Focuses debugging effort on highest-impact failures
- **Skipped P95/P99 latency** - Requires percentile calculations; average duration sufficient for v1
- **Skipped user-level attribution** - No userId in schema; would require privacy review

**Chart enhancements for data literacy:**
- **Filter warnings** - When filtering by status="success", cost chart warns "cost of failed runs is hidden"
- **Correlation hints** - Badges explain "Tokens drive Cost" and "Duration includes non-LLM time"
- **Dynamic subtitles** - Update based on active filters to prevent misinterpretation

---

## 2. Future Enhancements

### Metrics to Add (by Priority)

**High Value, Low Complexity:**
1. **LLM calls vs. cost correlation chart** - Validates if more LLM calls = higher cost (scatter plot, <1 day)
2. **Cache efficiency by model** - Shows which models benefit most from caching (extend existing query, <1 day)
3. **Benchmark comparisons** - Show "20% slower than last week" on duration trend (requires 7-day rolling average, 2 days)

**High Value, Medium Complexity:**
4. **P95/P99 latency** - Identifies tail latency issues invisible in averages (percentile SQL functions, 2-3 days)
5. **Anomaly detection** - Highlight cost/duration spikes >2σ from baseline (statistical calculation + visual indicators, 3 days)

Critical for production ops:
1. **Failure rate threshold** - Alert if success rate <85% over 1-hour window

### UX Improvements

**Quick wins:**
- URL-persisted filters (shareable dashboard states)
- CSV export (external analysis)
- Custom date ranges (calendar picker)

**Requires more effort:**
- Drill-down modals (click chart point → see individual runs)
- Real-time polling (30s auto-refresh)
- Dark mode (monitoring dashboard standard)

---

## 3. Data Modeling Decisions for Production Scale

### Current Design: Flat Schema

Single `AgentExecution` table with all metrics denormalized. Works well for ~100K rows with single-user access.

**Why this works for v1:**
- 1:1 match with `AgentExecutionMetrics` interface (no transformation layer)
- Simple aggregations via Prisma (no JOINs)
- Fast iteration during 3-7 hour time constraint

### What Breaks at Scale

| Threshold | Problem | Symptom |
|-----------|---------|---------|
| >1M rows | Slow aggregations | Dashboard timeout (>5s response) |
| >10M rows | Full table scans | Database CPU saturation |
| >10 concurrent users | Query contention | Lock escalation, slow queries |
| <1s latency needs | Polling overhead | Backend overload |

### Production Scale Strategy

**1. Pre-aggregated Rollup Tables (Critical)**

Daily rollup table with pre-computed aggregates (run count, success/failure counts, total tokens, avg duration, total cost) grouped by date + model + status. Dashboard queries hit rollups (1K rows) instead of raw data (10M rows) → sub-second response times. Materialized nightly via cron or CDC (Change Data Capture).

**Tradeoff:** 24-hour granularity for historical data. Intraday queries still hit raw table.

**2. Caching Layer (High Impact)**

Redis cache for hot queries (getSummary: 60s TTL, getTimeSeries: 30s TTL, getModels: 5min TTL). Cache key pattern: `metrics:{endpoint}:{hash(filters)}`.

**Tradeoff:** Stale data for TTL duration. Acceptable for analytics dashboard.

**3. Table Partitioning (Recommended)**

Partition raw data by month (e.g., `agent_execution_2025_01` partition). Benefits: Fast range queries (only scan 2 partitions for "last 30 days"), easy archival (drop old partitions), parallel scans.

**4. Read Replicas (Standard Pattern)**

Offload dashboard queries to read replicas. Primary handles writes, replicas serve reads. Lag tolerance: 1-5 seconds acceptable for analytics.

**What I'd revisit:**
- **Flat schema → Normalized** if we need drill-down to individual LLM/tool calls (unlikely for aggregate dashboard)
- **PostgreSQL → TimescaleDB** if time-series queries dominate (overkill for current needs)
- **Prisma ORM → Raw SQL** if query performance becomes bottleneck (premature optimization)

---

## 4. Known Limitations & Edge Cases

### Current Limitations

**No real-time updates** - Dashboard requires manual refresh. Polling (30s interval) planned for v2 but deprioritized due to time constraint and low user concurrency assumption.

**No drill-down** - Can't click chart point to see individual run details. Would require modal component + `getRunsList` integration. Acceptable for v1 aggregate view.

**No export** - No CSV/JSON download. Leadership may need to share data externally. Client-side CSV library (<1 day implementation).

**No anomaly detection** - Doesn't highlight unusual cost/duration spikes. Requires statistical baseline calculation. High value but deprioritized for time constraint.

**No filter persistence** - Filters reset on page reload. URL query params solution ready (filterSchema already validates date ranges) but not wired to router. <1 hour fix.

### Edge Cases Handled

✅ **Empty datasets** - Charts show "No data available" with filter adjustment suggestions
✅ **All-failure runs** - Success rate displays 0% (not NaN), cost-per-success shows "N/A"
✅ **Null costs** - SQL uses `COALESCE`, TypeScript uses `?? 0` fallbacks
✅ **Filter-aware metrics** - Success rate correctly shows 100% when filtering status="success" (not based on unfiltered data)
✅ **Very long error messages** - Truncated to 100 chars in UI with "..." suffix

### Edge Cases NOT Handled

❌ **Timezone discrepancies** - All times in UTC; browser displays local time without explicit conversion or selector
❌ **Clock skew** - `endTime < startTime` would produce negative duration (no API validation)
❌ **Very large datasets** - >100K rows may slow initial chart render (no virtual scrolling/pagination)
❌ **Concurrent write conflicts** - Dashboard queries run without transaction isolation; may show inconsistent aggregates during heavy writes

### Testing Strategy

**Backend-focused:** 5 test suites covering success rate calculation (with filter edge cases), daily time-series grouping, cost/token aggregation (null handling), cache hit rate formula, empty dataset edge cases.

**Why skip frontend tests:** Aggregation bugs cause incorrect dashboards (high risk). Frontend is mostly declarative Recharts wiring (low risk). Time constraint required prioritization.

**What I'd add with more time:** E2E tests (Playwright) for critical user flows, visual regression tests (Chromatic/Percy) for chart rendering.

---

## Summary

This dashboard prioritizes **actionable insights over raw data dumps**. Three specialized tabs reduce cognitive load while serving distinct workflows (Overview for health, Efficiency for optimization, Errors for debugging). The flat schema enables rapid development; production scale requires rollup tables, caching, and partitioning. Filter warnings and correlation hints improve data literacy. Every metric answers a specific stakeholder question.

**Key tradeoff:** Optimized for v1 speed (3-7 hour constraint) over production features (real-time updates, anomaly detection, drill-down). The path to production scale is clear and documented above.

