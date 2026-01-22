import { PrismaClient, Prisma } from "../generated/prisma";

const prisma = new PrismaClient();

// Models with their token pricing (per 1M tokens)
const MODELS = [
  { name: "gpt-4", inputCost: 30, outputCost: 60 },
  { name: "gpt-4-turbo", inputCost: 10, outputCost: 30 },
  { name: "claude-3-opus", inputCost: 15, outputCost: 75 },
  { name: "claude-3-sonnet", inputCost: 3, outputCost: 15 },
] as const;

const STATUSES = ["success", "failure", "error"] as const;

// Error messages for failures
const ERROR_MESSAGES = [
  "Timeout waiting for LLM response",
  "Rate limit exceeded",
  "Invalid API key",
  "Context length exceeded",
  "Tool execution failed: file not found",
  "Tool execution failed: permission denied",
  "Model refused to complete task",
  "Network error connecting to API",
  "JSON parsing error in response",
  "Memory limit exceeded",
];

// Normal distribution using Box-Muller transform
function normalRandom(mean: number, stdDev: number): number {
  const u1 = Math.random();
  const u2 = Math.random();
  const z0 = Math.sqrt(-2.0 * Math.log(u1)) * Math.cos(2.0 * Math.PI * u2);
  return Math.max(0, mean + z0 * stdDev);
}

// Generate a random date within the last N days
function randomDate(daysAgo: number): Date {
  const now = new Date();
  const pastDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const randomTime =
    pastDate.getTime() + Math.random() * (now.getTime() - pastDate.getTime());
  return new Date(randomTime);
}

// Generate realistic token counts based on duration
function generateTokens(durationMs: number): {
  inputTokens: number;
  outputTokens: number;
  totalTokens: number;
  cacheCreationInputTokens: number | null;
  cacheReadInputTokens: number | null;
} {
  // Longer runs tend to use more tokens
  const baseFactor = durationMs / 1000; // seconds
  const inputTokens = Math.floor(normalRandom(baseFactor * 200, baseFactor * 50));
  const outputTokens = Math.floor(normalRandom(baseFactor * 100, baseFactor * 30));
  const totalTokens = inputTokens + outputTokens;

  // 40% chance of cache usage
  const hasCache = Math.random() < 0.4;
  const cacheCreationInputTokens = hasCache
    ? Math.floor(inputTokens * normalRandom(0.3, 0.1))
    : null;
  const cacheReadInputTokens = hasCache
    ? Math.floor(inputTokens * normalRandom(0.5, 0.15))
    : null;

  return {
    inputTokens: Math.max(500, inputTokens),
    outputTokens: Math.max(100, outputTokens),
    totalTokens: Math.max(600, totalTokens),
    cacheCreationInputTokens,
    cacheReadInputTokens,
  };
}

// Calculate cost based on model and tokens
function calculateCost(
  model: (typeof MODELS)[number],
  inputTokens: number,
  outputTokens: number
): Prisma.Decimal {
  const inputCost = (inputTokens / 1_000_000) * model.inputCost;
  const outputCost = (outputTokens / 1_000_000) * model.outputCost;
  return new Prisma.Decimal(inputCost + outputCost);
}

// Generate modified files list
function generateModifiedFiles(): string[] {
  const possibleFiles = [
    "src/index.ts",
    "src/utils/helpers.ts",
    "src/components/Button.tsx",
    "src/api/routes.ts",
    "package.json",
    "README.md",
    "src/types/index.ts",
    "src/hooks/useData.ts",
    "src/services/api.ts",
    "tests/unit/helpers.test.ts",
  ];
  const count = Math.floor(Math.random() * 5);
  const shuffled = possibleFiles.sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}

async function main() {
  console.log("Seeding database...");

  // Clear existing data
  await prisma.agentExecution.deleteMany();
  console.log("Cleared existing agent executions");

  const executions: Prisma.AgentExecutionCreateManyInput[] = [];
  const totalRuns = Math.floor(Math.random() * 500) + 500; // 500-1000 runs

  // Create some clustered failure "incidents" (3-5 incidents over 30 days)
  const incidentDays = Array.from(
    { length: Math.floor(Math.random() * 3) + 3 },
    () => Math.floor(Math.random() * 30)
  );

  for (let i = 0; i < totalRuns; i++) {
    const startTime = randomDate(30);
    const daysAgo = Math.floor(
      (Date.now() - startTime.getTime()) / (24 * 60 * 60 * 1000)
    );

    // Check if this day is an incident day (higher failure rate)
    const isIncidentDay = incidentDays.includes(daysAgo);
    const failureChance = isIncidentDay ? 0.4 : 0.1; // 40% vs 10%

    // Determine status
    let status: (typeof STATUSES)[number];
    const rand = Math.random();
    if (rand < failureChance) {
      status = Math.random() < 0.7 ? "failure" : "error";
    } else {
      status = "success";
    }

    // Duration: 5-120 seconds, normal distribution centered at 45s
    const durationMs = Math.floor(normalRandom(45000, 20000));
    const clampedDuration = Math.max(5000, Math.min(120000, durationMs));

    const endTime = new Date(startTime.getTime() + clampedDuration);
    const model = MODELS[Math.floor(Math.random() * MODELS.length)]!;
    const tokens = generateTokens(clampedDuration);

    // LLM calls correlate with duration
    const llmCallCount = Math.max(
      1,
      Math.floor(normalRandom(clampedDuration / 10000, 2))
    );
    const toolCallsCount = Math.max(
      0,
      Math.floor(normalRandom(clampedDuration / 15000, 3))
    );

    executions.push({
      feedId: Math.random() < 0.8 ? Math.floor(Math.random() * 100) + 1 : null,
      runStartId:
        Math.random() < 0.8 ? Math.floor(Math.random() * 1000) + 1 : null,
      invocationId: `inv_${Date.now()}_${i}_${Math.random().toString(36).substring(7)}`,
      status,
      errorMessage:
        status !== "success"
          ? ERROR_MESSAGES[Math.floor(Math.random() * ERROR_MESSAGES.length)]
          : null,
      model: model.name,
      llmCallCount,
      inputTokens: tokens.inputTokens,
      outputTokens: tokens.outputTokens,
      totalTokens: tokens.totalTokens,
      cacheCreationInputTokens: tokens.cacheCreationInputTokens,
      cacheReadInputTokens: tokens.cacheReadInputTokens,
      toolCallsCount,
      modifiedFiles: status === "success" ? generateModifiedFiles() : [],
      startTime,
      endTime,
      durationMs: clampedDuration,
      taskIndex: Math.random() < 0.9 ? Math.floor(Math.random() * 10) : null,
      temperature: Math.random() < 0.7 ? 0.7 : null,
      maxTokens:
        Math.random() < 0.6
          ? [4096, 8192, 16384][Math.floor(Math.random() * 3)]
          : null,
      reportedCostUsd: calculateCost(
        model,
        tokens.inputTokens,
        tokens.outputTokens
      ),
    });
  }

  // Batch insert
  const result = await prisma.agentExecution.createMany({
    data: executions,
  });

  console.log(`Seeded ${result.count} agent executions`);

  // Print summary
  const summary = await prisma.agentExecution.groupBy({
    by: ["status"],
    _count: true,
  });
  console.log("\nSummary by status:");
  summary.forEach((s) => {
    console.log(`  ${s.status}: ${s._count}`);
  });

  const modelSummary = await prisma.agentExecution.groupBy({
    by: ["model"],
    _count: true,
  });
  console.log("\nSummary by model:");
  modelSummary.forEach((m) => {
    console.log(`  ${m.model}: ${m._count}`);
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
