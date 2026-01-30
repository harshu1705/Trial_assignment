# 🛠️ Production Hardening - Implementation Guide

## Priority 1: Database Schema (CRITICAL)

### Step 1.1: Update Prisma Schema

Replace the entire schema with:

```prisma
// prisma/schema.prisma

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

// USERS
model User {
  id              String   @id @default(cuid())
  clerkId         String   @unique
  email           String   @unique
  firstName       String?
  lastName        String?
  avatar          String?
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  workflows       Workflow[]
  runs            WorkflowRun[]
  
  @@index([clerkId])
}

// WORKFLOW TEMPLATES
model Workflow {
  id              String   @id @default(cuid())
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name            String
  description     String?
  
  // Canvas state
  nodes           String   // JSON stringified @xyflow/react Node[]
  edges           String   // JSON stringified @xyflow/react Edge[]
  
  // Metadata
  version         Int      @default(1)
  isPublished     Boolean  @default(false)
  tags            String?  // CSV for filtering
  
  createdAt       DateTime @default(now())
  updatedAt       DateTime @updatedAt
  
  runs            WorkflowRun[]
  
  @@index([userId])
  @@index([createdAt])
  @@index([isPublished])
}

// EXECUTION RUNS
model WorkflowRun {
  id              String   @id @default(cuid())
  
  workflowId      String?
  workflow        Workflow? @relation(fields: [workflowId], references: [id], onDelete: SetNull)
  
  userId          String
  user            User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // Status
  status          String   @default("queued") // queued, running, success, partial, failed
  scope           String   @default("full")   // full, partial
  
  // Results
  nodeResults     NodeResult[]
  logs            ExecutionLog[]
  
  // Metadata
  totalNodes      Int      @default(0)
  successNodes    Int      @default(0)
  failedNodes     Int      @default(0)
  duration        Int?     // milliseconds
  
  // Execution ID from Trigger.dev
  triggerId       String?
  
  createdAt       DateTime @default(now())
  startedAt       DateTime?
  completedAt     DateTime?
  
  @@index([userId])
  @@index([workflowId])
  @@index([createdAt])
  @@index([status])
}

// NODE EXECUTION RESULTS
model NodeResult {
  id              String   @id @default(cuid())
  
  runId           String
  run             WorkflowRun @relation(fields: [runId], references: [id], onDelete: Cascade)
  
  nodeId          String
  nodeType        String   // text, llm, vision, debug
  
  status          String   // idle, running, completed, error
  output          String?  // JSON stringified
  error           String?
  
  duration        Int?     // milliseconds
  
  createdAt       DateTime @default(now())
  
  @@index([runId])
  @@index([nodeId])
  @@index([status])
}

// EXECUTION LOGS
model ExecutionLog {
  id              String   @id @default(cuid())
  
  runId           String
  run             WorkflowRun @relation(fields: [runId], references: [id], onDelete: Cascade)
  
  message         String
  level           String   // info, warn, error, debug
  
  timestamp       DateTime @default(now())
  
  @@index([runId])
  @@index([level])
}
```

### Step 1.2: Create Migration

```bash
npx prisma migrate dev --name add_user_workflow_tables
```

---

## Priority 2: API Authentication & Authorization

### Step 2.1: Create Auth Utility

Create `src/lib/auth.ts`:

```typescript
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export type AuthResult = 
  | { success: true; userId: string }
  | { success: false; response: NextResponse };

export async function requireAuth(): Promise<AuthResult> {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return {
        success: false,
        response: new NextResponse("Unauthorized", { status: 401 })
      };
    }
    
    return { success: true, userId };
  } catch (error) {
    return {
      success: false,
      response: new NextResponse("Auth error", { status: 500 })
    };
  }
}

export async function getCurrentUser() {
  const { userId } = await auth();
  if (!userId) return null;
  
  // Optionally fetch from database if you need more user data
  // const user = await prisma.user.findUnique({ where: { clerkId: userId } });
  return userId;
}
```

### Step 2.2: Protect Execute Endpoint

Update `src/app/api/execute/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { tasks } from "@trigger.dev/sdk/v3";
import { requireAuth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { z } from "zod";

// Input validation schema
const workflowSchema = z.object({
  nodes: z.array(z.any()).min(1),
  edges: z.array(z.any()),
  workflowId: z.string().optional(),
});

export async function POST(req: Request) {
  // 1. Check authentication
  const authResult = await requireAuth();
  if (!authResult.success) {
    return authResult.response;
  }
  
  const { userId } = authResult;

  try {
    // 2. Validate input
    const body = await req.json();
    const validation = workflowSchema.safeParse(body);
    
    if (!validation.success) {
      return NextResponse.json(
        { success: false, error: "Invalid workflow format", errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { nodes, edges, workflowId } = validation.data;

    // 3. Rate limiting (TODO: implement with Redis)
    // const rateLimited = await checkRateLimit(userId);
    // if (rateLimited) {
    //   return NextResponse.json(
    //     { success: false, error: "Too many requests" },
    //     { status: 429 }
    //   );
    // }

    // 4. Verify workflow ownership if referencing existing workflow
    if (workflowId) {
      const workflow = await prisma.workflow.findUnique({
        where: { id: workflowId },
      });
      
      if (!workflow) {
        return NextResponse.json(
          { success: false, error: "Workflow not found" },
          { status: 404 }
        );
      }
      
      if (workflow.userId !== userId) {
        return NextResponse.json(
          { success: false, error: "Unauthorized" },
          { status: 403 }
        );
      }
    }

    // 5. Trigger background job
    const run = await tasks.trigger("workflow-task", {
      nodes,
      edges,
      userId, // Pass user context
      workflowId,
    });

    return NextResponse.json({
      success: true,
      runId: run.id,
    });
  } catch (error: any) {
    console.error("❌ API /execute error:", error);

    return NextResponse.json(
      {
        success: false,
        error: error?.message || "Execution failed",
      },
      { status: 500 }
    );
  }
}
```

### Step 2.3: Protect Runs Endpoint

Update `src/app/api/runs/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export const dynamic = 'force-dynamic';

export async function GET(req: Request) {
  // 1. Authenticate
  const authResult = await requireAuth();
  if (!authResult.success) {
    return authResult.response;
  }

  const { userId } = authResult;

  try {
    // 2. Parse pagination params
    const url = new URL(req.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    const skip = (page - 1) * limit;

    // 3. Get user's runs (user-scoped query)
    const [runs, total] = await Promise.all([
      prisma.workflowRun.findMany({
        where: { userId }, // CRITICAL: User scoping
        skip,
        take: limit,
        orderBy: { createdAt: 'desc' },
        include: {
          nodeResults: true,
          logs: { take: 5 }, // Recent logs only
        },
      }),
      prisma.workflowRun.count({ where: { userId } }),
    ]);

    return NextResponse.json({
      success: true,
      runs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error: any) {
    console.error("Failed to fetch runs:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch run history" },
      { status: 500 }
    );
  }
}
```

### Step 2.4: Create Workflows API

Create `src/app/api/workflows/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";
import { z } from "zod";
import { Node, Edge } from "@xyflow/react";

const workflowCreateSchema = z.object({
  name: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  nodes: z.array(z.any()),
  edges: z.array(z.any()),
});

// GET /api/workflows
export async function GET(req: Request) {
  const authResult = await requireAuth();
  if (!authResult.success) return authResult.response;

  const { userId } = authResult;

  try {
    const workflows = await prisma.workflow.findMany({
      where: { userId },
      select: {
        id: true,
        name: true,
        description: true,
        version: true,
        isPublished: true,
        createdAt: true,
        updatedAt: true,
        _count: { select: { runs: true } },
      },
      orderBy: { updatedAt: 'desc' },
    });

    return NextResponse.json({ success: true, workflows });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// POST /api/workflows
export async function POST(req: Request) {
  const authResult = await requireAuth();
  if (!authResult.success) return authResult.response;

  const { userId } = authResult;

  try {
    const body = await req.json();
    const validation = workflowCreateSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        { success: false, errors: validation.error.errors },
        { status: 400 }
      );
    }

    const { name, description, nodes, edges } = validation.data;

    const workflow = await prisma.workflow.create({
      data: {
        userId,
        name,
        description,
        nodes: JSON.stringify(nodes),
        edges: JSON.stringify(edges),
      },
    });

    return NextResponse.json({ success: true, workflow }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

Create `src/app/api/workflows/[id]/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAuth } from "@/lib/auth";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth();
  if (!authResult.success) return authResult.response;

  const { userId } = authResult;

  try {
    const workflow = await prisma.workflow.findUnique({
      where: { id: params.id },
    });

    if (!workflow) {
      return NextResponse.json(
        { success: false, error: "Workflow not found" },
        { status: 404 }
      );
    }

    // Verify ownership
    if (workflow.userId !== userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    return NextResponse.json({
      success: true,
      workflow: {
        ...workflow,
        nodes: JSON.parse(workflow.nodes),
        edges: JSON.parse(workflow.edges),
      },
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth();
  if (!authResult.success) return authResult.response;

  const { userId } = authResult;

  try {
    const workflow = await prisma.workflow.findUnique({
      where: { id: params.id },
    });

    if (!workflow || workflow.userId !== userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    const { name, description, nodes, edges } = await req.json();

    const updated = await prisma.workflow.update({
      where: { id: params.id },
      data: {
        name,
        description,
        nodes: JSON.stringify(nodes),
        edges: JSON.stringify(edges),
        version: { increment: 1 },
      },
    });

    return NextResponse.json({ success: true, workflow: updated });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const authResult = await requireAuth();
  if (!authResult.success) return authResult.response;

  const { userId } = authResult;

  try {
    const workflow = await prisma.workflow.findUnique({
      where: { id: params.id },
    });

    if (!workflow || workflow.userId !== userId) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 403 }
      );
    }

    await prisma.workflow.delete({ where: { id: params.id } });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
```

---

## Priority 3: Environment Validation

Create `src/lib/config.ts`:

```typescript
import { z } from 'zod';

const envSchema = z.object({
  DATABASE_URL: z.string().url('DATABASE_URL must be a valid URL'),
  NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: z.string().min(1),
  CLERK_SECRET_KEY: z.string().min(1),
  TRIGGER_SECRET_KEY: z.string().min(1),
  TRIGGER_PROJECT_ID: z.string().min(1),
  GEMINI_API_KEY: z.string().optional(),
  GROQ_API_KEY: z.string().optional(),
  NODE_ENV: z.enum(['development', 'staging', 'production']).default('development'),
});

type Config = z.infer<typeof envSchema>;

let config: Config | null = null;

export function getConfig(): Config {
  if (config) return config;

  try {
    config = envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      const message = error.errors
        .map(e => `${e.path.join('.')}: ${e.message}`)
        .join('\n');
      throw new Error(`Configuration validation failed:\n${message}`);
    }
    throw error;
  }

  // Validate at least one AI provider
  if (!config.GEMINI_API_KEY && !config.GROQ_API_KEY) {
    throw new Error('At least one AI API key (GEMINI_API_KEY or GROQ_API_KEY) must be configured');
  }

  return config;
}

export const config = getConfig();
```

Create `.env.example`:

```env
# Database
DATABASE_URL=file:./dev.db

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
CLERK_SECRET_KEY=sk_test_your_key_here

# Trigger.dev
TRIGGER_SECRET_KEY=tr_dev_your_key_here
TRIGGER_PROJECT_ID=proj_your_id_here

# AI Providers (at least one required)
GEMINI_API_KEY=AIza_your_key_here
# GROQ_API_KEY=gsk_your_key_here

# Environment
NODE_ENV=development
```

---

## Priority 4: Structured Logging & Error Handling

Create `src/lib/logger.ts`:

```typescript
type LogLevel = 'debug' | 'info' | 'warn' | 'error';

interface LogEntry {
  level: LogLevel;
  message: string;
  timestamp: string;
  context?: Record<string, any>;
  error?: {
    message: string;
    stack?: string;
  };
}

class Logger {
  private context: Record<string, any> = {};

  setContext(ctx: Record<string, any>) {
    this.context = { ...this.context, ...ctx };
  }

  private log(level: LogLevel, message: string, error?: Error) {
    const entry: LogEntry = {
      level,
      message,
      timestamp: new Date().toISOString(),
      context: this.context,
    };

    if (error) {
      entry.error = {
        message: error.message,
        stack: error.stack,
      };
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      const icon = { debug: '🐛', info: 'ℹ️', warn: '⚠️', error: '❌' }[level];
      console.log(`${icon} [${level.toUpperCase()}] ${message}`, entry);
    }

    // TODO: Send to Sentry, Datadog, etc. in production
    // sentry.captureMessage(JSON.stringify(entry));
  }

  debug(message: string) {
    this.log('debug', message);
  }

  info(message: string) {
    this.log('info', message);
  }

  warn(message: string) {
    this.log('warn', message);
  }

  error(message: string, error?: Error) {
    this.log('error', message, error);
  }
}

export const logger = new Logger();
```

---

## Priority 5: Health Check Endpoint

Create `src/app/api/health/route.ts`:

```typescript
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    // Check database connectivity
    await prisma.$queryRaw`SELECT 1`;

    return NextResponse.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      checks: {
        database: 'ok',
      },
    });
  } catch (error) {
    return NextResponse.json(
      {
        status: 'error',
        timestamp: new Date().toISOString(),
        error: 'Database connection failed',
      },
      { status: 503 }
    );
  }
}
```

---

## Priority 6: Update Trigger Workflow Task

Update `src/trigger/workflow.ts`:

```typescript
import { task } from "@trigger.dev/sdk/v3";
import { runWorkflow } from "@/lib/execution/engine";
import { Node, Edge } from "@xyflow/react";
import { prisma } from "@/lib/prisma";
import { logger } from "@/lib/logger";

export const workflowTask = task({
    id: "workflow-task",
    maxDuration: 600,
    run: async (payload: { 
      nodes: Node[]; 
      edges: Edge[];
      userId: string;
      workflowId?: string;
    }) => {
        logger.info(`Starting workflow execution for user ${payload.userId}`);

        const nodeStatus: Record<string, string> = {};
        payload.nodes.forEach(node => {
            nodeStatus[node.id] = 'idle';
        });

        try {
            const context = await runWorkflow(payload.nodes, payload.edges, (nodeId, status) => {
                logger.info(`Node ${nodeId} status: ${status}`);
                nodeStatus[nodeId] = status;
            });

            const results = Object.fromEntries(context.nodeResults);
            const hasFailure = Array.from(context.nodeResults.values()).some((r: any) => r.status === 'failed');
            const hasSuccess = Array.from(context.nodeResults.values()).some((r: any) => r.status === 'success');

            let runStatus = "success";
            if (hasFailure) {
                runStatus = hasSuccess ? "partial" : "failed";
            }

            const result = {
                success: !hasFailure,
                executionId: context.executionId,
                results,
                logs: context.logs,
                nodeStatus,
            };

            // Persist to database
            try {
                const run = await prisma.workflowRun.create({
                    data: {
                        userId: payload.userId,
                        workflowId: payload.workflowId,
                        status: runStatus,
                        scope: "full",
                        totalNodes: payload.nodes.length,
                        successNodes: payload.nodes.length - (
                          Array.from(context.nodeResults.values())
                            .filter((r: any) => r.status === 'failed').length
                        ),
                        failedNodes: Array.from(context.nodeResults.values())
                          .filter((r: any) => r.status === 'failed').length,
                        duration: context.duration,
                    },
                });

                // Store node results
                for (const [nodeId, result] of context.nodeResults) {
                    await prisma.nodeResult.create({
                        data: {
                            runId: run.id,
                            nodeId,
                            nodeType: payload.nodes.find(n => n.id === nodeId)?.type || 'unknown',
                            status: (result as any).status,
                            output: (result as any).output ? JSON.stringify((result as any).output) : null,
                            error: (result as any).error,
                            duration: (result as any).duration,
                        },
                    });
                }

                logger.info(`Run ${run.id} persisted successfully`);
            } catch (dbError) {
                logger.error('Failed to persist run', dbError as Error);
            }

            return result;
        } catch (error: any) {
            logger.error('Workflow execution failed', error);
            throw error;
        }
    },
});
```

---

## Quick Wins Checklist

- [ ] Add auth utility function
- [ ] Protect all API routes with `requireAuth()`
- [ ] Update database schema (run migration)
- [ ] Add env validation config
- [ ] Create .env.example
- [ ] Add logger utility
- [ ] Create health check endpoint
- [ ] Add workflow CRUD endpoints
- [ ] Update trigger task to use userId
- [ ] Add to-database persistence

**Estimated time:** 2-3 hours for experienced developer

