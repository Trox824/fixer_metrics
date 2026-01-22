import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Prisma } from "../../../../generated/prisma";

const filterSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["all", "success", "failure", "error"]).optional().default("all"),
  model: z.string().optional(),
});

export const metricsRouter = createTRPCRouter({
  /**
   * Get aggregated summary KPIs for the filtered dataset
   */
  getSummary: publicProcedure
    .input(filterSchema)
    .query(async ({ ctx, input }) => {
      const where: Prisma.AgentExecutionWhereInput = {
        startTime: {
          gte: input.startDate,
          lte: input.endDate,
        },
        ...(input.status !== "all" && { status: input.status }),
        ...(input.model && { model: input.model }),
      };

      const baseWhere: Prisma.AgentExecutionWhereInput = {
        startTime: { gte: input.startDate, lte: input.endDate },
        ...(input.model && { model: input.model }),
      };

      const [aggregates, statusCounts, successCostAgg, cacheAgg, avgFilesResult] = await Promise.all([
        ctx.db.agentExecution.aggregate({
          where,
          _count: true,
          _avg: {
            durationMs: true,
            llmCallCount: true,
            toolCallsCount: true,
          },
          _sum: {
            totalTokens: true,
            inputTokens: true,
            outputTokens: true,
            reportedCostUsd: true,
            cacheReadInputTokens: true,
            cacheCreationInputTokens: true,
          },
        }),
        ctx.db.agentExecution.groupBy({
          by: ["status"],
          where: baseWhere,
          _count: true,
          _sum: { reportedCostUsd: true },
        }),
        // Success-only cost aggregation
        ctx.db.agentExecution.aggregate({
          where: { ...baseWhere, status: "success" },
          _sum: { reportedCostUsd: true },
          _count: true,
        }),
        // Cache aggregation for cache hit rate
        ctx.db.agentExecution.aggregate({
          where: baseWhere,
          _sum: {
            cacheReadInputTokens: true,
            cacheCreationInputTokens: true,
            inputTokens: true,
          },
        }),
        // Avg files modified (only for successful runs with files)
        ctx.db.$queryRaw<[{ avg_files: number | null }]>`
          SELECT AVG(array_length("modifiedFiles", 1))::float as avg_files
          FROM "AgentExecution"
          WHERE "startTime" >= ${input.startDate}
            AND "startTime" <= ${input.endDate}
            AND "status" = 'success'
            AND array_length("modifiedFiles", 1) > 0
            ${input.model ? Prisma.sql`AND "model" = ${input.model}` : Prisma.empty}
        `,
      ]);

      const totalRuns = aggregates._count;
      const successCount = statusCounts.find((s) => s.status === "success")?._count ?? 0;
      const failureCount = statusCounts.find((s) => s.status === "failure")?._count ?? 0;
      const errorCount = statusCounts.find((s) => s.status === "error")?._count ?? 0;
      const totalFailures = failureCount + errorCount;

      const totalCostUsd = aggregates._sum.reportedCostUsd?.toNumber() ?? 0;
      const successCost = successCostAgg._sum.reportedCostUsd?.toNumber() ?? 0;
      const successCostCount = successCostAgg._count;

      // Calculate wasted spend from failed runs
      const failedCost = statusCounts
        .filter((s) => s.status === "failure" || s.status === "error")
        .reduce((sum, s) => sum + (s._sum.reportedCostUsd?.toNumber() ?? 0), 0);

      // Cache hit rate calculation
      const cacheReadTokens = cacheAgg._sum.cacheReadInputTokens ?? 0;
      const totalInputTokens = cacheAgg._sum.inputTokens ?? 0;
      const cacheHitRate = totalInputTokens > 0 ? (cacheReadTokens / totalInputTokens) * 100 : 0;

      return {
        totalRuns,
        successCount,
        failureCount: totalFailures,
        successRate: totalRuns > 0 ? (successCount / totalRuns) * 100 : 0,
        avgDurationMs: aggregates._avg.durationMs ?? 0,
        totalCostUsd,
        totalTokens: aggregates._sum.totalTokens ?? 0,
        totalInputTokens: aggregates._sum.inputTokens ?? 0,
        totalOutputTokens: aggregates._sum.outputTokens ?? 0,
        avgLlmCalls: aggregates._avg.llmCallCount ?? 0,
        avgToolCalls: aggregates._avg.toolCallsCount ?? 0,
        // New metrics
        wastedSpend: failedCost,
        costPerSuccess: successCostCount > 0 ? successCost / successCostCount : 0,
        cacheHitRate,
        cacheReadTokens,
        cacheCreationTokens: aggregates._sum.cacheCreationInputTokens ?? 0,
        avgFilesModified: avgFilesResult[0]?.avg_files ?? 0,
      };
    }),

  /**
   * Get time-bucketed data for charts
   */
  getTimeSeries: publicProcedure
    .input(
      filterSchema.extend({
        granularity: z.enum(["hour", "day", "week"]).default("day"),
      })
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate, status, model, granularity } = input;

      // Build WHERE clause
      const conditions: string[] = [
        `"startTime" >= '${startDate.toISOString()}'`,
        `"startTime" <= '${endDate.toISOString()}'`,
      ];
      if (status !== "all") {
        conditions.push(`"status" = '${status}'`);
      }
      if (model) {
        conditions.push(`"model" = '${model}'`);
      }
      const whereClause = conditions.join(" AND ");

      // Using raw SQL for DATE_TRUNC functionality
      const result = await ctx.db.$queryRaw<
        Array<{
          bucket: Date;
          count: bigint;
          success_count: bigint;
          failure_count: bigint;
          avg_duration_ms: number | null;
          total_cost_usd: Prisma.Decimal | null;
          total_input_tokens: bigint;
          total_output_tokens: bigint;
          total_tokens: bigint;
          cache_read_tokens: bigint;
          cache_creation_tokens: bigint;
        }>
      >`
        SELECT
          DATE_TRUNC(${granularity}, "startTime") as bucket,
          COUNT(*)::bigint as count,
          COUNT(*) FILTER (WHERE "status" = 'success')::bigint as success_count,
          COUNT(*) FILTER (WHERE "status" IN ('failure', 'error'))::bigint as failure_count,
          AVG("durationMs")::float as avg_duration_ms,
          SUM("reportedCostUsd") as total_cost_usd,
          SUM("inputTokens")::bigint as total_input_tokens,
          SUM("outputTokens")::bigint as total_output_tokens,
          SUM("totalTokens")::bigint as total_tokens,
          SUM(COALESCE("cacheReadInputTokens", 0))::bigint as cache_read_tokens,
          SUM(COALESCE("cacheCreationInputTokens", 0))::bigint as cache_creation_tokens
        FROM "AgentExecution"
        WHERE ${Prisma.raw(whereClause)}
        GROUP BY bucket
        ORDER BY bucket ASC
      `;

      return result.map((row) => ({
        date: row.bucket,
        count: Number(row.count),
        successCount: Number(row.success_count),
        failureCount: Number(row.failure_count),
        avgDurationMs: row.avg_duration_ms ?? 0,
        totalCostUsd: row.total_cost_usd?.toNumber() ?? 0,
        inputTokens: Number(row.total_input_tokens),
        outputTokens: Number(row.total_output_tokens),
        totalTokens: Number(row.total_tokens),
        cacheReadTokens: Number(row.cache_read_tokens),
        cacheCreationTokens: Number(row.cache_creation_tokens),
      }));
    }),

  /**
   * Get paginated list of runs for detailed view
   */
  getRunsList: publicProcedure
    .input(
      filterSchema.extend({
        cursor: z.string().optional(),
        limit: z.number().min(1).max(100).default(20),
      })
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate, status, model, cursor, limit } = input;

      const where: Prisma.AgentExecutionWhereInput = {
        startTime: {
          gte: startDate,
          lte: endDate,
        },
        ...(status !== "all" && { status }),
        ...(model && { model }),
      };

      const runs = await ctx.db.agentExecution.findMany({
        where,
        take: limit + 1,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { startTime: "desc" },
      });

      let nextCursor: string | undefined = undefined;
      if (runs.length > limit) {
        const nextItem = runs.pop();
        nextCursor = nextItem?.id;
      }

      return {
        runs: runs.map((run) => ({
          ...run,
          reportedCostUsd: run.reportedCostUsd?.toNumber() ?? null,
        })),
        nextCursor,
      };
    }),

  /**
   * Get distinct models for filter dropdown
   */
  getModels: publicProcedure.query(async ({ ctx }) => {
    const models = await ctx.db.agentExecution.findMany({
      select: { model: true },
      distinct: ["model"],
      orderBy: { model: "asc" },
    });
    return models.map((m) => m.model);
  }),

  /**
   * Get model comparison statistics
   */
  getModelComparison: publicProcedure
    .input(filterSchema)
    .query(async ({ ctx, input }) => {
      const where: Prisma.AgentExecutionWhereInput = {
        startTime: {
          gte: input.startDate,
          lte: input.endDate,
        },
        ...(input.status !== "all" && { status: input.status }),
      };

      const [modelStats, successCounts, avgFilesPerModel] = await Promise.all([
        ctx.db.agentExecution.groupBy({
          by: ["model"],
          where,
          _count: true,
          _avg: {
            durationMs: true,
            llmCallCount: true,
            toolCallsCount: true,
          },
          _sum: {
            totalTokens: true,
            reportedCostUsd: true,
          },
        }),
        ctx.db.agentExecution.groupBy({
          by: ["model"],
          where: { ...where, status: "success" },
          _count: true,
        }),
        // Get avg files modified per model
        ctx.db.$queryRaw<Array<{ model: string; avg_files: number | null }>>`
          SELECT "model", AVG(array_length("modifiedFiles", 1))::float as avg_files
          FROM "AgentExecution"
          WHERE "startTime" >= ${input.startDate}
            AND "startTime" <= ${input.endDate}
            AND "status" = 'success'
            AND array_length("modifiedFiles", 1) > 0
          GROUP BY "model"
        `,
      ]);

      const successMap = new Map(successCounts.map((s) => [s.model, s._count]));
      const avgFilesMap = new Map(avgFilesPerModel.map((r) => [r.model, r.avg_files ?? 0]));

      return modelStats.map((stat) => ({
        model: stat.model,
        totalRuns: stat._count,
        successRate:
          stat._count > 0
            ? ((successMap.get(stat.model) ?? 0) / stat._count) * 100
            : 0,
        avgDurationMs: stat._avg.durationMs ?? 0,
        avgLlmCalls: stat._avg.llmCallCount ?? 0,
        avgToolCalls: stat._avg.toolCallsCount ?? 0,
        totalTokens: stat._sum.totalTokens ?? 0,
        totalCostUsd: stat._sum.reportedCostUsd?.toNumber() ?? 0,
        avgFilesModified: avgFilesMap.get(stat.model) ?? 0,
      }));
    }),

  /**
   * Get error breakdown for failed runs (top 10 errors)
   */
  getErrorBreakdown: publicProcedure
    .input(filterSchema)
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.$queryRaw<
        Array<{
          error_message: string | null;
          count: bigint;
          total_cost: Prisma.Decimal | null;
        }>
      >`
        SELECT
          COALESCE("errorMessage", 'Unknown Error') as error_message,
          COUNT(*)::bigint as count,
          SUM("reportedCostUsd") as total_cost
        FROM "AgentExecution"
        WHERE "startTime" >= ${input.startDate}
          AND "startTime" <= ${input.endDate}
          AND "status" IN ('failure', 'error')
          ${input.model ? Prisma.sql`AND "model" = ${input.model}` : Prisma.empty}
        GROUP BY "errorMessage"
        ORDER BY count DESC
        LIMIT 10
      `;

      return result.map((row) => ({
        errorMessage: row.error_message ?? "Unknown Error",
        count: Number(row.count),
        wastedCost: row.total_cost?.toNumber() ?? 0,
      }));
    }),

  /**
   * Get failure trend over time
   */
  getFailureTrend: publicProcedure
    .input(
      filterSchema.extend({
        granularity: z.enum(["hour", "day", "week"]).default("day"),
      })
    )
    .query(async ({ ctx, input }) => {
      const { startDate, endDate, model, granularity } = input;

      const result = await ctx.db.$queryRaw<
        Array<{
          bucket: Date;
          failure_count: bigint;
          total_count: bigint;
          wasted_cost: Prisma.Decimal | null;
        }>
      >`
        SELECT
          DATE_TRUNC(${granularity}, "startTime") as bucket,
          COUNT(*) FILTER (WHERE "status" IN ('failure', 'error'))::bigint as failure_count,
          COUNT(*)::bigint as total_count,
          SUM("reportedCostUsd") FILTER (WHERE "status" IN ('failure', 'error')) as wasted_cost
        FROM "AgentExecution"
        WHERE "startTime" >= ${startDate}
          AND "startTime" <= ${endDate}
          ${model ? Prisma.sql`AND "model" = ${model}` : Prisma.empty}
        GROUP BY bucket
        ORDER BY bucket ASC
      `;

      return result.map((row) => ({
        date: row.bucket,
        failureCount: Number(row.failure_count),
        totalCount: Number(row.total_count),
        failureRate: Number(row.total_count) > 0
          ? (Number(row.failure_count) / Number(row.total_count)) * 100
          : 0,
        wastedCost: row.wasted_cost?.toNumber() ?? 0,
      }));
    }),

  /**
   * Get failures grouped by model
   */
  getFailuresByModel: publicProcedure
    .input(filterSchema)
    .query(async ({ ctx, input }) => {
      const result = await ctx.db.$queryRaw<
        Array<{
          model: string;
          failure_count: bigint;
          total_count: bigint;
          wasted_cost: Prisma.Decimal | null;
        }>
      >`
        SELECT
          "model",
          COUNT(*) FILTER (WHERE "status" IN ('failure', 'error'))::bigint as failure_count,
          COUNT(*)::bigint as total_count,
          SUM("reportedCostUsd") FILTER (WHERE "status" IN ('failure', 'error')) as wasted_cost
        FROM "AgentExecution"
        WHERE "startTime" >= ${input.startDate}
          AND "startTime" <= ${input.endDate}
        GROUP BY "model"
        ORDER BY failure_count DESC
      `;

      return result.map((row) => ({
        model: row.model,
        failureCount: Number(row.failure_count),
        totalCount: Number(row.total_count),
        failureRate: Number(row.total_count) > 0
          ? (Number(row.failure_count) / Number(row.total_count)) * 100
          : 0,
        wastedCost: row.wasted_cost?.toNumber() ?? 0,
      }));
    }),
});
