import { z } from "zod";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { Prisma } from "../../../../generated/prisma";

const filterSchema = z.object({
  startDate: z.date(),
  endDate: z.date(),
  status: z.enum(["all", "success", "failure"]).optional().default("all"),
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

      // Use Prisma native methods for most aggregations
      const [aggregates, statusCounts, successCostAgg, cacheAgg] = await Promise.all([
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
        ctx.db.agentExecution.aggregate({
          where: { ...baseWhere, status: "success" },
          _sum: { reportedCostUsd: true },
          _count: true,
        }),
        ctx.db.agentExecution.aggregate({
          where: baseWhere,
          _sum: {
            cacheReadInputTokens: true,
            cacheCreationInputTokens: true,
            inputTokens: true,
          },
        }),
      ]);

      // Calculate avg files modified using Prisma findMany + JS
      const successfulRuns = await ctx.db.agentExecution.findMany({
        where: {
          ...baseWhere,
          status: "success",
          modifiedFiles: { isEmpty: false },
        },
        select: { modifiedFiles: true },
      });
      const avgFilesModified = successfulRuns.length > 0
        ? successfulRuns.reduce((sum, r) => sum + r.modifiedFiles.length, 0) / successfulRuns.length
        : 0;

      const totalRuns = aggregates._count;
      const successCount = statusCounts.find((s) => s.status === "success")?._count ?? 0;
      const failureCount = statusCounts.find((s) => s.status === "failure")?._count ?? 0;

      const totalCostUsd = aggregates._sum.reportedCostUsd?.toNumber() ?? 0;
      const successCost = successCostAgg._sum.reportedCostUsd?.toNumber() ?? 0;
      const successCostCount = successCostAgg._count;

      const failedCost = statusCounts.find((s) => s.status === "failure")?._sum.reportedCostUsd?.toNumber() ?? 0;

      const cacheReadTokens = cacheAgg._sum.cacheReadInputTokens ?? 0;
      const totalInputTokens = cacheAgg._sum.inputTokens ?? 0;
      const cacheHitRate = totalInputTokens > 0 ? (cacheReadTokens / totalInputTokens) * 100 : 0;

      return {
        totalRuns,
        successCount,
        failureCount,
        successRate: totalRuns > 0 ? (successCount / totalRuns) * 100 : 0,
        avgDurationMs: aggregates._avg.durationMs ?? 0,
        totalCostUsd,
        totalTokens: aggregates._sum.totalTokens ?? 0,
        totalInputTokens: aggregates._sum.inputTokens ?? 0,
        totalOutputTokens: aggregates._sum.outputTokens ?? 0,
        avgLlmCalls: aggregates._avg.llmCallCount ?? 0,
        avgToolCalls: aggregates._avg.toolCallsCount ?? 0,
        wastedSpend: failedCost,
        costPerSuccess: successCostCount > 0 ? successCost / successCostCount : 0,
        cacheHitRate,
        cacheReadTokens,
        cacheCreationTokens: aggregates._sum.cacheCreationInputTokens ?? 0,
        avgFilesModified,
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

      // Build WHERE clause safely using Prisma.sql for parameterized queries
      const conditions: Prisma.Sql[] = [
        Prisma.sql`"startTime" >= ${startDate}`,
        Prisma.sql`"startTime" <= ${endDate}`,
      ];
      if (status !== "all") {
        conditions.push(Prisma.sql`"status" = ${status}`);
      }
      if (model) {
        conditions.push(Prisma.sql`"model" = ${model}`);
      }
      const whereClause = Prisma.join(conditions, " AND ");

      // Whitelist granularity to prevent SQL injection (already validated by zod, but extra safety)
      const granularityMap = { hour: "hour", day: "day", week: "week" } as const;
      const safeGranularity = granularityMap[granularity];

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
          DATE_TRUNC(${safeGranularity}, "startTime") as bucket,
          COUNT(*)::bigint as count,
          COUNT(*) FILTER (WHERE "status" = 'success')::bigint as success_count,
          COUNT(*) FILTER (WHERE "status" = 'failure')::bigint as failure_count,
          AVG("durationMs")::float as avg_duration_ms,
          SUM("reportedCostUsd") as total_cost_usd,
          SUM("inputTokens")::bigint as total_input_tokens,
          SUM("outputTokens")::bigint as total_output_tokens,
          SUM("totalTokens")::bigint as total_tokens,
          SUM(COALESCE("cacheReadInputTokens", 0))::bigint as cache_read_tokens,
          SUM(COALESCE("cacheCreationInputTokens", 0))::bigint as cache_creation_tokens
        FROM "AgentExecution"
        WHERE ${whereClause}
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

      const [modelStats, successCounts] = await Promise.all([
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
      ]);

      // Get avg files per model using Prisma
      const successfulByModel = await ctx.db.agentExecution.findMany({
        where: {
          startTime: { gte: input.startDate, lte: input.endDate },
          status: "success",
          modifiedFiles: { isEmpty: false },
        },
        select: { model: true, modifiedFiles: true },
      });

      // Calculate avg files per model in JS
      const filesPerModel = new Map<string, { total: number; count: number }>();
      for (const run of successfulByModel) {
        const existing = filesPerModel.get(run.model) ?? { total: 0, count: 0 };
        existing.total += run.modifiedFiles.length;
        existing.count += 1;
        filesPerModel.set(run.model, existing);
      }

      const successMap = new Map(successCounts.map((s) => [s.model, s._count]));

      return modelStats.map((stat) => {
        const filesData = filesPerModel.get(stat.model);
        const avgFilesModified = filesData ? filesData.total / filesData.count : 0;

        return {
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
          avgFilesModified,
        };
      });
    }),

  /**
   * Get error breakdown for failed runs (top 10 errors)
   */
  getErrorBreakdown: publicProcedure
    .input(filterSchema)
    .query(async ({ ctx, input }) => {
      const where: Prisma.AgentExecutionWhereInput = {
        startTime: { gte: input.startDate, lte: input.endDate },
        status: "failure",
        ...(input.model && { model: input.model }),
      };

      // Use Prisma groupBy for error breakdown
      const errorGroups = await ctx.db.agentExecution.groupBy({
        by: ["errorMessage"],
        where,
        _count: true,
        _sum: { reportedCostUsd: true },
        orderBy: { _count: { errorMessage: "desc" } },
        take: 10,
      });

      return errorGroups.map((row) => ({
        errorMessage: row.errorMessage ?? "Unknown Error",
        count: row._count,
        wastedCost: row._sum.reportedCostUsd?.toNumber() ?? 0,
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

      // Build WHERE clause safely using Prisma.sql for parameterized queries
      const conditions: Prisma.Sql[] = [
        Prisma.sql`"startTime" >= ${startDate}`,
        Prisma.sql`"startTime" <= ${endDate}`,
      ];
      if (model) {
        conditions.push(Prisma.sql`"model" = ${model}`);
      }
      const whereClause = Prisma.join(conditions, " AND ");

      // Whitelist granularity to prevent SQL injection (already validated by zod, but extra safety)
      const granularityMap = { hour: "hour", day: "day", week: "week" } as const;
      const safeGranularity = granularityMap[granularity];

      const result = await ctx.db.$queryRaw<
        Array<{
          bucket: Date;
          failure_count: bigint;
          total_count: bigint;
          wasted_cost: Prisma.Decimal | null;
        }>
      >`
        SELECT
          DATE_TRUNC(${safeGranularity}, "startTime") as bucket,
          COUNT(*) FILTER (WHERE "status" = 'failure')::bigint as failure_count,
          COUNT(*)::bigint as total_count,
          SUM("reportedCostUsd") FILTER (WHERE "status" = 'failure') as wasted_cost
        FROM "AgentExecution"
        WHERE ${whereClause}
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
      const where: Prisma.AgentExecutionWhereInput = {
        startTime: { gte: input.startDate, lte: input.endDate },
      };

      // Get all runs grouped by model
      const allByModel = await ctx.db.agentExecution.groupBy({
        by: ["model"],
        where,
        _count: true,
      });

      // Get failures grouped by model
      const failuresByModel = await ctx.db.agentExecution.groupBy({
        by: ["model"],
        where: { ...where, status: "failure" },
        _count: true,
        _sum: { reportedCostUsd: true },
      });

      const failureMap = new Map(
        failuresByModel.map((f) => [
          f.model,
          { count: f._count, cost: f._sum.reportedCostUsd?.toNumber() ?? 0 },
        ])
      );

      return allByModel
        .map((row) => {
          const failures = failureMap.get(row.model) ?? { count: 0, cost: 0 };
          return {
            model: row.model,
            failureCount: failures.count,
            totalCount: row._count,
            failureRate: row._count > 0 ? (failures.count / row._count) * 100 : 0,
            wastedCost: failures.cost,
          };
        })
        .sort((a, b) => b.failureCount - a.failureCount);
    }),
});
