# Fixer Agent Metrics Dashboard

A full-stack metrics dashboard for visualizing Fixer Agent execution performance, cost, and reliability. Built as an internal monitoring tool to answer key operational questions across engineering and leadership teams.

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

Open [http://localhost:3000](http://localhost:3000) to view the dashboard.

---

## Architecture Overview

This dashboard uses the **T3 Stack** (Next.js 15 + tRPC + Prisma + TypeScript) for end-to-end type safety and rapid development. The frontend consists of three specialized tabs (Overview, Efficiency, Errors) with 9 Recharts visualizations and dynamic filter bars. The backend exposes 8 tRPC procedures that perform server-side aggregation via Prisma ORM and raw SQL queries against a single PostgreSQL table (`AgentExecution`).

The flat schema design prioritizes development speed over query flexibility - all execution metrics are stored in one denormalized table matching the provided `AgentExecutionMetrics` interface 1:1. This works well for ~100K rows and single-user access, but production scale (>1M rows) would require pre-aggregated rollup tables and partitioning (see WRITEUP.md for scaling strategy).

**Tech Stack:** Next.js 15 App Router, React 19, tRPC v11, Prisma v6, PostgreSQL, Recharts, TanStack Query, TypeScript, Tailwind CSS

---

## Key Design Decisions

### 1. Flat Schema Over Normalization

**Decision:** Single `AgentExecution` table with all metrics denormalized.

**Why:** The provided `AgentExecutionMetrics` interface maps 1:1 to this schema. Normalized tables (separate `llm_calls`, `tool_calls`) would require JOINs, slow down aggregations, and add 2+ hours of development time for marginal benefit at current scale.

**Tradeoff:** Can't drill down to individual LLM/tool call details. Acceptable for aggregate dashboard use case; would revisit if detailed trace viewing is needed.

### 2. Server-Side Aggregation

**Decision:** All aggregations happen in PostgreSQL via Prisma `aggregate()`, `groupBy()`, and raw SQL `DATE_TRUNC`.

**Why:** Client-side aggregation on 1000+ rows blocks UI rendering and consumes memory. Server-side keeps payloads small (<50KB) and leverages database indexes.

**Tradeoff:** Backend must scale with user concurrency. Mitigated by query caching (future: Redis) and read replicas.

### 3. Recharts Over D3/Nivo

**Decision:** Use Recharts for all visualizations.

**Why:** Declarative API (React-native), responsive by default, good TypeScript support, lightweight (~45KB). Alternatives like D3 require low-level imperative code; Nivo is heavier (~150KB).

**Tradeoff:** Less flashy animations than competitors. Acceptable for internal dashboard prioritizing clarity over aesthetics.

### 4. Three-Tab Organization

**Decision:** Split metrics into Overview (health), Efficiency (optimization), Errors (debugging) tabs.

**Why:** Reduces cognitive load vs. single-page dashboard. Leadership cares about Overview (cost, success rate); Engineering uses Efficiency/Errors for optimization and incident response.

**Tradeoff:** Users can't see all charts simultaneously. Mitigated by shared filter bar state across tabs.

### 5. Testing Strategy: Backend-Focused

**Decision:** Prioritize backend aggregation tests over frontend rendering tests.

**Why:** Bugs in aggregation logic (e.g., success rate calculation, cost per run) produce incorrect dashboards. Frontend is mostly "wiring" tRPC data to Recharts props.

**Tests included:**
- ✅ Success rate calculation with filter edge cases
- ✅ Daily time-series grouping accuracy
- ✅ Cost/token aggregation with null handling
- ✅ Cache hit rate formula validation
- ✅ Empty dataset edge cases

**Skipped:** E2E tests (no Playwright setup), frontend component tests (Recharts rendering).

**Tradeoff:** No visual regression testing. Acceptable for v1; would add Chromatic/Percy for production.

### 6. Mock Data Distribution

**Decision:** Seed 500-1000 realistic runs across 30 days with ~90% success rate, multiple models, and clustered failures.

**Why:** Charts need realistic-looking data for demo. Uniform distribution looks fake; clustered failures simulate real incident patterns.

**Tradeoff:** Seed data doesn't match production distribution. Mitigated by clear labeling as "mock data" in UI (future).

---

## Assumptions Made

1. **Status values:** Field contains strings `'success'` or `'failure'` (not `'error'` or other variants)
2. **Cost pre-calculated:** `reportedCostUsd` is provided by agent runtime; dashboard doesn't compute from tokens
3. **Duration:** Computed as `endTime - startTime` in milliseconds
4. **No auth required:** Internal tool assumption per assignment spec
5. **PostgreSQL available:** Database choice with PG-specific features (arrays, `DECIMAL`, `DATE_TRUNC`)
6. **Timezone:** All timestamps stored in UTC; browser displays in local time
7. **Single invocation per run:** `invocationId` is unique when present

---

## Known Limitations

1. **No real-time updates** — Dashboard requires refresh for new data (polling planned for v2)
2. **No drill-down** — Can't click chart point to see individual runs (modal planned)
3. **No export** — No CSV/JSON download functionality
4. **Basic date picker** — Simple dropdown (7d/30d/90d), no calendar widget
5. **No filter persistence** — Filters reset on page reload (URL params solution ready)
6. **No anomaly detection** — Doesn't highlight unusual cost/duration spikes

**Edge cases handled:**
- Empty data states (graceful "No data" messages)
- Null costs (COALESCE fallbacks)
- All-failure datasets (success rate = 0%, not NaN)
- Filter-aware success rate (100% when filtering status="success")

---

## Next Steps with More Time

### Immediate Wins (< 1 day)
1. **URL-persisted filters** — Make dashboard state shareable via query params
2. **CSV export** — Download filtered data for external analysis
3. **Custom date ranges** — Calendar picker for arbitrary time windows
4. **Error message truncation** — Show full error on hover (currently cuts at 100 chars)

### High-Value Features (2-3 days)
5. **Drill-down modals** — Click chart point → see individual runs with full details
6. **Polling for real-time** — Auto-refresh every 30s with visual indicator
7. **Dark mode** — Essential for monitoring dashboards used 24/7
8. **Anomaly detection** — Highlight cost/duration spikes >2σ from baseline
9. **Alert configuration UI** — Set thresholds for failure rate, cost anomalies

### Production Scale (1-2 weeks)
10. **Pre-aggregated rollup tables** — Daily summaries for sub-second dashboard load
11. **Redis caching layer** — Cache hot queries (getSummary, getTimeSeries)
12. **Table partitioning** — Partition by month for fast archival and range queries
13. **Read replicas** — Offload dashboard queries from primary database
14. **P95/P99 latency tracking** — Percentile calculations for tail latency issues
15. **User-level attribution** — Add `userId` to schema for cost/failure tracking per user

---

## Testing

**Run tests:**
```bash
pnpm test
```

**Test coverage:** Backend aggregation logic (success rate, daily grouping, null handling, cache hit rate). See `src/server/api/routers/__tests__/metrics.test.ts`.

**Why backend-focused:** Aggregation bugs cause incorrect dashboards. Frontend is mostly declarative Recharts wiring. Time constraint (3-7 hours) required prioritization.

---

## Documentation

- **[WRITEUP.md](./WRITEUP.md)** — Technical deep dive: metrics rationale, production scaling, edge cases (1,750 words)
- **[docs/DESIGN-GUIDE.md](./docs/DESIGN-GUIDE.md)** — Chart design decisions, filter warnings, correlation hints
- **Architecture details** — See "Key Design Decisions" section above

---

## Questions Answered by This Dashboard

This dashboard helps answer 19 operational questions across 5 categories:

**Cost Analysis (4 questions):**
- How much are we spending daily?
- What's the cost per run?
- Cost per successful run?
- How much wasted on failures?

**Reliability Monitoring (5 questions):**
- Overall success rate?
- Success rate trend over time?
- Success rate by model?
- What errors are occurring?
- Error frequency by type?

**Performance Tracking (3 questions):**
- Average run duration?
- Duration trend over time?
- Which model is fastest?

**Token Usage Insights (4 questions):**
- Total tokens consumed daily?
- Input vs output token split?
- Tokens per run?
- Cache hit rate?

**Agent Behavior (3 questions):**
- Avg LLM calls per run?
- Avg tool calls per run?
- Files modified per run?

**See full mapping:** Each question is mapped to specific KPI cards, charts, and tabs in the dashboard UI.

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

MIT
