# Take-Home Coding Assignment: Fixer Agent Metrics Dashboard

## Overview
Build a small **full-stack application** that visualizes key metrics for **Fixer Agent executions** over time.

The goal is to understand how you think about:
- Metrics & observability
- Data modeling
- Visualization & UX
- Practical full-stack tradeoffs

You should treat this as a **real internal dashboard** used to monitor Fixer Agent performance, cost, and reliability across the organization.

---

## Core Requirements

### 1. Metrics Visualization
Visualize Fixer Agent execution metrics over time. At minimum, include:

- Execution count
- Success vs failure rate
- Duration (latency)
- Token usage (input / output / total)
- Cost (USD)
- LLM call count
- Tool call count

Metrics should be:
- **Aggregated across all Fixer Agent runs**
- **Viewable over time** (e.g. daily, weekly, per run)

---

### 2. UI / UX
- A simple dashboard UI (charts, tables, filters)
- Ability to filter by:
  - Time range
  - Status (success / failure)
  - Model (if helpful)
- Visual clarity matters more than polish

---

### 3. Extensibility
You are encouraged to think beyond the provided metrics:
- What *other* metrics would be useful?
- What trends or regressions would you want to detect?
- What benchmarks or alerts would matter to leadership vs engineers?

You don’t need to implement everything — just show evidence of thought.

---

## Technical Constraints

- **Frontend**: Your choice (React, Svelte, etc.)
- **Backend**: Your choice (Node, API routes, etc.)
- **Database**: Your choice (SQLite, Postgres, in-memory mock, etc.)
- **Auth**: Not required (assume internal tool)

Mock data is acceptable if you explain it clearly.

---

## Deliverables

Final deliverable can be shared as a github repo (share it with EllAchE if you make it private) or as a zip.

1. **Working application**
   - Runs locally
   - Clear setup instructions (README)

2. **README**
   - How to run (install, migrate/seed, start)
   - Architecture overview (1–2 paragraphs)
   - Key design decisions + tradeoffs
   - Assumptions made
   - What you would do next with more time

3. **Short write-up (1–2 pages)**
   - What metrics you chose and why
   - What you’d add next (metrics, alerts, UX improvements)
   - Any data modeling decisions you’d revisit for production scale
   - Known limitations / edge cases

4. **Testing**
   - Include a small set of tests that demonstrate good judgment:
     - **Backend**: e.g. aggregation/query logic, cost/duration calculations
     - **Frontend** (optional): e.g. one component/unit test, or basic rendering state
   - Tests should be runnable via a single command (e.g. `pnpm test` / `npm test`)
   - If you skip an area, explain why in the README

---

## Time Expectations

- **Expected time**: 3–7 hours
- Delivery expected by 1 week after receiving the challenge (next Wed.)

We care more about:
- Clear thinking
- Sensible tradeoffs
- Signal over completeness

Do not over-engineer.

---

## Evaluation Criteria

We will evaluate on:
- Data modeling quality
- Metric selection & interpretation
- Visualization clarity
- Code readability & structure
- Test choices and coverage (quality > quantity)
- Product thinking and written communication

---

## Attachment: Fixer Agent Execution Metrics

The following is the execution metrics schema and persistence logic currently used internally. Your solution should be compatible with this data shape.

```ts
export interface AgentExecutionMetrics {
  feedId?: number;
  runStartId?: number;
  invocationId?: string;
  status: string;
  errorMessage?: string;
  model: string;
  llmCallCount: number;
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheCreationInputTokens?: number;
  cacheReadInputTokens?: number;
  toolCallsCount: number;
  modifiedFiles: string[];
  startTime: Date;
  endTime?: Date;
  taskIndex?: number;
  temperature?: number;
  maxTokens?: number;
  errorInfo?: Record<string, unknown>;
  executionMetadata?: Record<string, unknown>;
  reportedCostUsd?: number;
  trajectoryGcsPath?: string | null;
}

