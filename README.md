# Fixer Agent Metrics Dashboard

A full-stack application for visualizing Fixer Agent execution metrics. Built as an internal monitoring tool to track performance, cost, and reliability of AI agent runs.

---

## Quick Start

```bash
# Install dependencies
pnpm install

# Setup database (requires PostgreSQL)
cp .env.example .env  # Configure DATABASE_URL
pnpm db:push
pnpm db:seed

# Start development server
pnpm dev

# Run tests
pnpm test
```

---

## Architecture Overview

This dashboard follows a **three-tier architecture** using the T3 Stack:

```
┌─────────────────────────────────────────────────────────────┐
│  FRONTEND (Next.js 15 App Router)                           │
│  ├── Dashboard Page (/)                                     │
│  │   ├── FilterBar - Date range, status, model filters      │
│  │   ├── KPICards - Summary statistics                      │
│  │   └── Charts - Recharts visualizations                   │
│  └── TanStack Query - Server state management               │
├─────────────────────────────────────────────────────────────┤
│  API LAYER (tRPC)                                           │
│  ├── metrics.getSummary - Aggregated KPIs                   │
│  ├── metrics.getTimeSeries - Time-bucketed data             │
│  ├── metrics.getRunsList - Paginated run details            │
│  └── metrics.getModels - Available models for filter        │
├─────────────────────────────────────────────────────────────┤
│  DATABASE (PostgreSQL + Prisma ORM)                         │
│  └── AgentExecution table - Flat denormalized schema        │
└─────────────────────────────────────────────────────────────┘
```

**Why T3 Stack?**
- **Type safety end-to-end**: tRPC ensures API contracts are enforced at compile time
- **Modern React**: Next.js 15 with App Router, React 19, Server Components
- **Excellent DX**: Hot reload, TypeScript, Tailwind CSS
- **Production-ready**: Prisma migrations, environment validation

---

## Key Design Decisions

### 1. Data Modeling: Single Flat Table

**Decision:** Store all execution data in one `AgentExecution` table, matching the provided `AgentExecutionMetrics` interface 1:1.

**Alternatives Considered:**
- Normalized schema (separate tables for runs, LLM calls, tool calls)
- Time-series database (InfluxDB, TimescaleDB)

**Why Flat Table:**
| Factor | Flat Table | Normalized |
|--------|------------|------------|
| Query complexity | Simple aggregations | JOINs needed |
| Write performance | Single insert | Multiple inserts |
| Schema matches spec | Yes, 1:1 | Requires transformation |
| Development time | ~30 min | ~2+ hours |
| Dashboard use case | Sufficient | Over-engineered |

**Tradeoff:** Less flexible for future call-level drill-down, but follows YAGNI principle for current requirements.

---

### 2. Charting Library: Recharts

**Decision:** Use Recharts for all data visualizations.

**Alternatives Considered:**
| Library | Pros | Cons |
|---------|------|------|
| **Recharts** | React-native, declarative, good TS, lightweight (~45kb) | Less flashy animations |
| Tremor | Beautiful out-of-box, Tailwind-native | Extra abstraction layer |
| Chart.js | Popular, many examples | Imperative API, less React-y |
| Nivo | D3-based, beautiful | Heavier bundle (~150kb) |
| Visx | Low-level D3 wrapper | Too low-level for dashboards |

**Why Recharts:**
1. **Declarative API** fits React mental model
2. **Responsive by default** with ResponsiveContainer
3. **Good TypeScript support** for type-safe chart props
4. **Lightweight** - fast initial load for dashboard
5. **Active maintenance** - regular updates, good docs

---

### 3. Aggregation Strategy: Server-Side

**Decision:** Perform all aggregations in the database via Prisma, not in the browser.

**Why Server-Side:**
```
Client-Side Aggregation:
1. Fetch 1000 raw rows (large payload)
2. JavaScript processes in browser (slow, blocks UI)
3. Memory pressure on client device

Server-Side Aggregation:
1. SQL/Prisma computes aggregates (optimized)
2. Fetch only summary data (small payload)
3. Fast render, no client computation
```

**Implementation:**
- Prisma `groupBy` for time-series buckets
- Prisma `aggregate` for KPI summaries
- Database indexes on `startTime`, `status`, `model`

---

### 4. Time Bucketing: Daily Default

**Decision:** Default to daily aggregation with option for hourly/weekly.

**Rationale:**
- 30 days of data = 30 data points (readable charts)
- Hourly useful for debugging recent issues
- Weekly useful for trend analysis over months

**Implementation:**
```sql
-- Daily bucket (Prisma raw query fallback if needed)
SELECT
  DATE_TRUNC('day', "startTime") as bucket,
  COUNT(*) as count,
  AVG("durationMs") as avgDuration
FROM "AgentExecution"
GROUP BY bucket
ORDER BY bucket
```

---

### 5. Testing Strategy: Backend-Focused

**Decision:** Prioritize backend aggregation tests over frontend component tests.

**Why:**
- Aggregation logic is where bugs cause **incorrect dashboards**
- Frontend is mostly "wiring" - tRPC data → Recharts
- Time constraint (3-7 hours) requires prioritization

**Test Coverage:**

| Area | Priority | Tests |
|------|----------|-------|
| Aggregation logic | High | Success rate calc, daily grouping, cost sums |
| Edge cases | High | Empty data, all failures, null costs |
| API endpoints | Medium | Input validation, filter combinations |
| Frontend rendering | Low | Basic smoke test (optional) |

**Framework:** Vitest (fast, ESM-native, works with T3)

---

### 6. Mock Data: Realistic Distribution

**Decision:** Generate synthetic data mimicking real-world patterns.

**Data Characteristics:**
```typescript
{
  totalRuns: 500-1000,
  timeSpan: 30 days,
  models: ['gpt-4', 'gpt-4-turbo', 'claude-3-opus', 'claude-3-sonnet'],
  successRate: ~90% (realistic for production agent),
  duration: 5-120 seconds (normal distribution),
  tokens: 500-50,000 (correlates with duration),
  cost: Derived from model pricing,
  failures: Some clustered (simulates incidents)
}
```

**Why Realistic:**
- Charts look believable for demo
- Edge cases naturally occur (all-success days, high-cost outliers)
- Leadership can evaluate dashboard with "real-looking" data

---

### 7. Chart Metric Design: Reasonability & Filter Awareness

**Problem Identified:** The original 3 line charts (Token Usage, Cost, Duration) had issues with metric reasonability when filters were applied.

#### Issue Analysis

**Original Implementation:**
```
Token Usage → SUM(tokens) per day
Cost        → SUM(totalCostUsd) per day
Duration    → AVG(durationMs) per day
```

**Problems discovered:**

| Filter Applied | Metric | Problem |
|----------------|--------|---------|
| Status = "Success" | Cost | Hides "wasted" cost on failed runs - misleading for budget analysis |
| Status = "Failure" | Duration | Shows failed run durations without context that these are incomplete executions |
| Status = "Failure" | Tokens | Shows tokens consumed but user doesn't know these are "wasted" tokens |

**Metric Correlation Analysis:**

```
┌─────────────────────────────────────────────────────────────┐
│  NATURAL CORRELATIONS BETWEEN METRICS                       │
├─────────────────────────────────────────────────────────────┤
│  Token Usage ────→ Cost       (STRONG POSITIVE)             │
│  • More tokens = higher cost (direct causal relationship)   │
│  • Cost = f(model_price, tokens)                            │
│                                                              │
│  Duration ────→ Token Usage   (MODERATE POSITIVE)           │
│  • Longer runs tend to use more tokens                       │
│  • NOT always linear (retries, tool calls, API waits)       │
│                                                              │
│  Duration ────→ Cost          (WEAK/INDIRECT)               │
│  • Relationship only via tokens                              │
│  • 10s cheap model can cost less than 5s expensive model    │
└─────────────────────────────────────────────────────────────┘
```

**Verdict:** All 3 charts are necessary (not redundant) because:
- Token Usage: Measures LLM workload
- Cost: Measures spend (affected by model pricing, not just tokens)
- Duration: Measures total time (includes non-LLM operations like tool calls)

#### Solution Implemented

**1. Cost Chart: Added "Cost per Run" Derived Metric**

| Before | After |
|--------|-------|
| Single line showing `SUM(totalCostUsd)` | ComposedChart with bar (total) + line (per run) |
| Volume changes distort cost perception | `costPerRun = totalCostUsd / count` normalizes the metric |

**Why:** If you have 100 runs one day and 50 runs the next, total cost dropping 50% doesn't mean efficiency improved - it just means fewer runs. Cost per run reveals true efficiency.

**2. Dynamic Subtitles Based on Active Filters**

| Before | After |
|--------|-------|
| Static: "Daily spend in USD" | Dynamic: "Daily spend + cost per run (successful runs)" |
| User doesn't know what data they're seeing | Subtitle explicitly states filter context |

**Why:** When user filters to "Success only", subtitles update to remind them the scope of data being displayed.

**3. Correlation Hints (Badge on Chart Header)**

| Chart | Hint Displayed |
|-------|----------------|
| Token Usage | "Tokens drive Cost" |
| Cost Analysis | "Cost = f(Tokens, Model)" |
| Duration Trend | "Includes non-LLM time" |

**Why:** Helps users understand metric relationships without documentation. Duration hint clarifies it's not pure LLM time.

**4. Filter Warnings for Misleading States**

| Filter | Chart | Warning Displayed |
|--------|-------|-------------------|
| Status = Success | Cost | "Showing only successful runs - cost of failed runs is hidden" |
| Status = Failure | Cost | "Showing wasted spend on failed runs" |
| Status = Failure | Duration | "Showing time spent on failed runs (may include partial execution)" |
| Status = Failure | Tokens | "Tokens consumed before failure occurred" |

**Why:** Proactively warns users when filter + metric combination could lead to misinterpretation.

#### Files Changed

| File | Change |
|------|--------|
| `CostChart.tsx` | LineChart → ComposedChart with dual Y-axis (total + per run) |
| `ChartCard.tsx` | Added `correlationHint` and `filterWarning` props |
| `Dashboard.tsx` | Added helper functions for dynamic subtitles and warnings |

#### Visual Result

```
┌─────────────────────────────────────────────────────┐
│ Cost Analysis                    [Cost = f(Tokens)] │
│ Daily spend + cost per run (successful runs)        │
│ ⚠️ Showing only successful runs - cost hidden       │
├─────────────────────────────────────────────────────┤
│  [$] Total Cost (bar)    [—] Cost per Run (line)   │
│  Left Y-axis: $0-100     Right Y-axis: $0.00-1.00  │
└─────────────────────────────────────────────────────┘
```

---

## Metrics Displayed

### Core Metrics (Required)

| Metric | Visualization | Aggregation | Why It Matters |
|--------|---------------|-------------|----------------|
| **Execution Count** | Bar/Line chart | COUNT per day | Volume trends, capacity planning |
| **Success Rate** | Stacked bar + Pie | COUNT GROUP BY status | Reliability indicator |
| **Duration** | Line chart | AVG(durationMs) per day | Performance monitoring |
| **Token Usage** | Stacked area | SUM(input/output/total) | Cost driver, model efficiency |
| **Cost (USD)** | Line chart | SUM(reportedCostUsd) | Budget tracking |
| **LLM Call Count** | Bar chart | SUM(llmCallCount) | Agent complexity |
| **Tool Call Count** | Bar chart | SUM(toolCallsCount) | Agent behavior |

### Extended Metrics (Product Thinking)

| Metric | Value | Audience |
|--------|-------|----------|
| **Cost per Success** | Total cost / successful runs | Leadership - ROI |
| **Cost per Failure** | Cost of failed runs | Engineering - waste |
| **Cache Hit Rate** | cacheReadTokens / inputTokens | Engineering - optimization |
| **Avg Files Modified** | Productivity proxy | Leadership |
| **Model Comparison** | Stats by model | Engineering - model selection |

### Metrics NOT Included (and why)

| Metric | Reason |
|--------|--------|
| P95/P99 latency | Requires raw data; AVG sufficient for v1 |
| Error categorization | Needs NLP on errorMessage; future feature |
| User-level breakdown | No user ID in schema |
| Geographic distribution | No location data |

---

## Filters

| Filter | Options | Implementation |
|--------|---------|----------------|
| **Date Range** | Last 7d, 30d, 90d, Custom | URL query params + Prisma WHERE |
| **Status** | All, Success, Failure | Dropdown, filters API query |
| **Model** | All, [dynamic list] | Fetched from `metrics.getModels` |

**State Management:** URL search params (shareable dashboard links)

---

## Assumptions Made

1. **Status values:** Field contains strings like `'success'`, `'failure'`, `'error'`
2. **Cost pre-calculated:** `reportedCostUsd` is provided; no need to compute from tokens
3. **Duration:** Computed as `endTime - startTime` in milliseconds
4. **No auth required:** Internal tool assumption per spec
5. **PostgreSQL:** Database choice; schema uses PG-specific features (arrays, decimal)
6. **Timezone:** All timestamps stored in UTC; display in browser's local timezone
7. **Invocation uniqueness:** `invocationId` is unique when present

---

## Known Limitations

1. **No real-time updates:** Dashboard requires refresh for new data
2. **No drill-down:** Can't click chart point to see individual runs (would add in v2)
3. **No export:** No CSV/JSON download functionality
4. **Basic date picker:** Uses simple dropdown, not calendar widget
5. **No persistence of filters:** Filters reset on page reload (URL params would fix)
6. **No anomaly detection:** Doesn't highlight unusual cost/duration spikes

---

## What I'd Add With More Time

### High Priority
1. **Run detail view:** Click a data point → see individual executions
2. **URL-persisted filters:** Shareable dashboard links
3. **Date range picker:** Proper calendar component
4. **Loading states:** Skeleton loaders for better UX

### Medium Priority
5. **Anomaly highlighting:** Flag runs >2σ from mean
6. **Export to CSV:** Download filtered data
7. **Error categorization:** Group errors by pattern
8. **Real-time updates:** Polling or WebSocket

### Nice to Have
9. **Dark mode:** Better for monitoring dashboards
10. **Mobile responsive:** Collapsible sidebar, stacked charts
11. **Comparison mode:** Model A vs B side-by-side
12. **Alerts configuration:** Email when failure rate >X%

---

## Data Modeling for Scale

**Current design works for:** ~100k rows, single dashboard user

**For production scale (millions of rows):**

| Challenge | Solution |
|-----------|----------|
| Slow aggregations | Pre-computed daily rollups table |
| Large table scans | Partitioning by month |
| Concurrent users | Redis caching for common queries |
| Real-time | Change data capture → streaming aggregation |

**Schema Evolution:**
```prisma
// Add rollup table for pre-aggregated data
model DailyMetricsRollup {
  id          String   @id @default(cuid())
  date        DateTime @db.Date
  model       String
  status      String
  runCount    Int
  totalTokens BigInt
  totalCostUsd Decimal
  avgDurationMs Int

  @@unique([date, model, status])
  @@index([date])
}
```

---

## API Reference

### `metrics.getSummary`

Returns aggregated KPIs for the filtered dataset.

**Input:**
```typescript
{
  startDate: Date,
  endDate: Date,
  status?: 'success' | 'failure' | 'all',
  model?: string
}
```

**Output:**
```typescript
{
  totalRuns: number,
  successCount: number,
  failureCount: number,
  successRate: number,        // 0-100
  avgDurationMs: number,
  totalCostUsd: number,
  totalTokens: number,
  avgLlmCalls: number,
  avgToolCalls: number
}
```

### `metrics.getTimeSeries`

Returns time-bucketed data for charts.

**Input:**
```typescript
{
  startDate: Date,
  endDate: Date,
  granularity: 'hour' | 'day' | 'week',
  status?: string,
  model?: string
}
```

**Output:**
```typescript
Array<{
  date: Date,
  count: number,
  successCount: number,
  failureCount: number,
  avgDurationMs: number,
  totalCostUsd: number,
  inputTokens: number,
  outputTokens: number,
  totalTokens: number
}>
```

### `metrics.getModels`

Returns distinct models for filter dropdown.

**Output:**
```typescript
string[]  // e.g., ['gpt-4', 'claude-3-opus', ...]
```

---

## Project Structure

```
fixer_metrics/
├── prisma/
│   ├── schema.prisma        # Database schema
│   └── seed.ts              # Mock data generator
├── src/
│   ├── app/
│   │   ├── page.tsx         # Dashboard page
│   │   └── _components/
│   │       └── dashboard/
│   │           ├── FilterBar.tsx
│   │           ├── KPICards.tsx
│   │           └── charts/
│   │               ├── ExecutionsChart.tsx
│   │               ├── SuccessRateChart.tsx
│   │               ├── TokenUsageChart.tsx
│   │               ├── CostChart.tsx
│   │               └── DurationChart.tsx
│   ├── server/
│   │   ├── db.ts            # Prisma client
│   │   └── api/
│   │       ├── root.ts      # tRPC app router
│   │       ├── trpc.ts      # tRPC setup
│   │       └── routers/
│   │           ├── metrics.ts           # Metrics endpoints
│   │           └── __tests__/
│   │               └── metrics.test.ts  # Backend tests
│   └── trpc/
│       ├── react.tsx        # tRPC React hooks
│       └── server.ts        # Server-side tRPC
├── vitest.config.ts         # Test configuration
├── README.md                # This file
└── docs/
    └── DESIGN.md            # Extended write-up (optional)
```

---

## Development Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start dev server with Turbopack |
| `pnpm build` | Production build |
| `pnpm start` | Start production server |
| `pnpm db:push` | Push schema to database |
| `pnpm db:seed` | Seed mock data |
| `pnpm db:studio` | Open Prisma Studio |
| `pnpm test` | Run Vitest tests |
| `pnpm lint` | ESLint check |
| `pnpm typecheck` | TypeScript check |

---

## Environment Variables

```env
# .env
DATABASE_URL="postgresql://user:password@localhost:5432/fixer_metrics"
```

---

## License

Private - Take-home assignment for [Company Name]
