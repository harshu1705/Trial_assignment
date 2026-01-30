# 🔧 Phase 2: Fix Incomplete Half - Complete Implementation Guide

Now that all missing features are implemented, we need to fix the incomplete/half-built parts of the application.

---

## Priority Order

1. **Database Schema** (BLOCKER - needed for everything else)
2. **API Authentication** (SECURITY - critical)
3. **Workflow Persistence** (FEATURES - save/load workflows)
4. **Run History & Execution Logs** (FEATURES - track executions)
5. **Error Handling & Logging** (QUALITY - production ready)

---

## TASK 1: Complete Database Schema

### Current State
- ❌ Only `WorkflowRun` table exists
- ❌ No `User` table
- ❌ No `Workflow` table for persistence
- ❌ No `NodeResult` for execution details
- ❌ No `ExecutionLog` for audit trail

### What to Do

**File:** `prisma/schema.prisma`

**Replace entire file with:**

```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

// User model - tracks workflow ownership
model User {
  id            String     @id @default(cuid())
  clerkId       String     @unique // Clerk user ID
  email         String     @unique
  name          String?
  avatar        String?
  
  workflows     Workflow[]
  runs          WorkflowRun[]
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([clerkId])
  @@index([email])
}

// Workflow model - stores workflow definitions
model Workflow {
  id            String     @id @default(cuid())
  userId        String     // Foreign key to User
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  name          String
  description   String?
  
  // Workflow graph structure
  nodes         Json       // Array of Node objects
  edges         Json       // Array of Edge objects
  
  // Metadata
  isPublic      Boolean    @default(false)
  tags          String[]   @default([])
  
  runs          WorkflowRun[]
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([userId])
  @@index([createdAt])
  @@fulltext([name, description]) // For search (if using MySQL) - skip for PostgreSQL
}

// WorkflowRun model - tracks execution instances
model WorkflowRun {
  id            String     @id @default(cuid())
  workflowId    String?    // May be null for adhoc runs
  workflow      Workflow?  @relation(fields: [workflowId], references: [id], onDelete: SetNull)
  
  userId        String
  user          User       @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  // From Trigger.dev
  triggerId     String?    @unique // Trigger.dev run ID
  
  // Execution state
  status        String     @default("QUEUED") // QUEUED, RUNNING, COMPLETED, FAILED, CANCELED
  
  // Input/Output
  input         Json?      // Submitted workflow nodes/edges if adhoc
  output        Json?      // Execution results
  
  // Nodes results
  nodeResults   NodeResult[]
  
  // Error tracking
  errorMessage  String?
  errorStack    String?
  
  // Timing
  startedAt     DateTime?
  completedAt   DateTime?
  
  // Metadata
  durationMs    Int?       // Total execution time in milliseconds
  
  executionLogs ExecutionLog[]
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([userId])
  @@index([workflowId])
  @@index([triggerId])
  @@index([status])
  @@index([createdAt])
}

// NodeResult model - detailed execution result per node
model NodeResult {
  id            String     @id @default(cuid())
  runId         String
  run           WorkflowRun @relation(fields: [runId], references: [id], onDelete: Cascade)
  
  nodeId        String     // Canvas node ID
  nodeType      String     // text, llm, vision, uploadImage, etc.
  
  // Execution state
  status        String     @default("IDLE") // IDLE, RUNNING, SUCCESS, FAILED, SKIPPED
  
  // Results
  input         Json?      // Input data to this node
  output        Json?      // Output from this node
  
  // Error tracking
  error         String?    // Error message if failed
  
  // Timing
  startedAt     DateTime?
  completedAt   DateTime?
  durationMs    Int?
  
  createdAt     DateTime   @default(now())
  updatedAt     DateTime   @updatedAt
  
  @@index([runId])
  @@index([nodeId])
  @@index([status])
  @@unique([runId, nodeId])
}

// ExecutionLog model - audit trail
model ExecutionLog {
  id            String     @id @default(cuid())
  runId         String
  run           WorkflowRun @relation(fields: [runId], references: [id], onDelete: Cascade)
  
  level         String     // info, warning, error, debug
  message       String
  
  // Context
  nodeId        String?    // Which node if applicable
  metadata      Json?      // Additional context
  
  timestamp     DateTime   @default(now())
  
  @@index([runId])
  @@index([level])
  @@index([timestamp])
}
```

### Step 2: Create Migration

Run in terminal:

```bash
npx prisma migrate dev --name init_full_schema
```

This will:
1. Create the new tables in PostgreSQL
2. Generate updated Prisma client
3. Create migration file in `prisma/migrations/`

### Step 3: Verify

Check that `prisma/schema.prisma` has all models and run:

```bash
npx prisma generate
```

---

## TASK 2: Add Authentication to API Routes

### Current State
- ❌ `/api/execute` - no auth check
- ❌ `/api/runs` - no auth check
- ❌ `/api/workflows` - doesn't exist

### Create Auth Utility

**File:** `src/lib/auth.ts`

```typescript
import { auth } from '@clerk/nextjs/server';
import { prisma } from '@/lib/prisma';

/**
 * Get authenticated user from Clerk
 * Throws if not authenticated
 */
export async function requireAuth() {
  const session = await auth();
  
  if (!session || !session.userId) {
    throw new Error('Unauthorized');
  }
  
  return session.userId;
}

/**
 * Get or create user in database from Clerk user
 */
export async function getOrCreateUser(clerkId: string, email: string) {
  let user = await prisma.user.findUnique({
    where: { clerkId },
  });
  
  if (!user) {
    user = await prisma.user.create({
      data: {
        clerkId,
        email,
      },
    });
  }
  
  return user;
}

/**
 * Get current user with database record
 */
export async function getCurrentUser() {
  const clerkId = await requireAuth();
  const session = await auth();
  
  const user = await getOrCreateUser(clerkId, session?.sessionClaims?.email as string);
  return user;
}
```

### Update `/api/execute/route.ts`

**File:** `src/app/api/execute/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { validateWorkflow } from '@/lib/validation';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const ExecuteSchema = z.object({
  nodes: z.array(z.any()),
  edges: z.array(z.any()),
  workflowId: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    // 1. Authenticate user
    const user = await getCurrentUser();
    
    // 2. Parse and validate input
    const body = await request.json();
    const { nodes, edges, workflowId } = ExecuteSchema.parse(body);
    
    // 3. Validate workflow structure
    const validation = validateWorkflow(nodes, edges);
    if (!validation.isValid) {
      return NextResponse.json(
        { success: false, error: validation.error },
        { status: 400 }
      );
    }
    
    // 4. Create WorkflowRun record
    const run = await prisma.workflowRun.create({
      data: {
        userId: user.id,
        workflowId: workflowId || undefined,
        status: 'QUEUED',
        input: { nodes, edges },
      },
    });
    
    // 5. Trigger background job (Trigger.dev)
    // TODO: Call trigger.dev API to queue workflow execution
    // For now, just return the run ID
    
    return NextResponse.json({
      success: true,
      runId: run.id,
    });
    
  } catch (error) {
    console.error('Execute error:', error);
    return NextResponse.json(
      { 
        success: false, 
        error: error instanceof Error ? error.message : 'Execution failed'
      },
      { status: 500 }
    );
  }
}
```

### Create `/api/workflows/route.ts`

**File:** `src/app/api/workflows/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const CreateWorkflowSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  nodes: z.array(z.any()),
  edges: z.array(z.any()),
});

// GET /api/workflows - List user's workflows
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    
    const workflows = await prisma.workflow.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
      select: {
        id: true,
        name: true,
        description: true,
        tags: true,
        createdAt: true,
        updatedAt: true,
        runs: {
          select: { id: true, status: true },
          take: 1,
          orderBy: { createdAt: 'desc' },
        },
      },
    });
    
    return NextResponse.json({
      success: true,
      workflows,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workflows' },
      { status: 500 }
    );
  }
}

// POST /api/workflows - Create new workflow
export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const { name, description, nodes, edges } = CreateWorkflowSchema.parse(body);
    
    const workflow = await prisma.workflow.create({
      data: {
        userId: user.id,
        name,
        description,
        nodes,
        edges,
      },
    });
    
    return NextResponse.json({
      success: true,
      workflow,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to create workflow' },
      { status: 500 }
    );
  }
}
```

### Create `/api/workflows/[id]/route.ts`

**File:** `src/app/api/workflows/[id]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const UpdateWorkflowSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  nodes: z.array(z.any()).optional(),
  edges: z.array(z.any()).optional(),
});

// GET /api/workflows/[id] - Get workflow details
export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    
    const workflow = await prisma.workflow.findUnique({
      where: { id: params.id },
      include: {
        runs: {
          select: { id: true, status: true, createdAt: true },
          orderBy: { createdAt: 'desc' },
          take: 10,
        },
      },
    });
    
    if (!workflow) {
      return NextResponse.json(
        { success: false, error: 'Workflow not found' },
        { status: 404 }
      );
    }
    
    // Check ownership
    if (workflow.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      workflow,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch workflow' },
      { status: 500 }
    );
  }
}

// PUT /api/workflows/[id] - Update workflow
export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    const body = await request.json();
    const updates = UpdateWorkflowSchema.parse(body);
    
    // Verify ownership
    const workflow = await prisma.workflow.findUnique({
      where: { id: params.id },
    });
    
    if (!workflow || workflow.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    const updated = await prisma.workflow.update({
      where: { id: params.id },
      data: updates,
    });
    
    return NextResponse.json({
      success: true,
      workflow: updated,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to update workflow' },
      { status: 500 }
    );
  }
}

// DELETE /api/workflows/[id] - Delete workflow
export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const user = await getCurrentUser();
    
    const workflow = await prisma.workflow.findUnique({
      where: { id: params.id },
    });
    
    if (!workflow || workflow.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    await prisma.workflow.delete({
      where: { id: params.id },
    });
    
    return NextResponse.json({
      success: true,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to delete workflow' },
      { status: 500 }
    );
  }
}
```

### Update `/api/runs/route.ts`

**File:** `src/app/api/runs/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();
    const searchParams = request.nextUrl.searchParams;
    const workflowId = searchParams.get('workflowId');
    const limit = parseInt(searchParams.get('limit') || '20');
    const skip = parseInt(searchParams.get('skip') || '0');
    
    const where: any = { userId: user.id };
    if (workflowId) {
      where.workflowId = workflowId;
    }
    
    const [runs, total] = await Promise.all([
      prisma.workflowRun.findMany({
        where,
        include: {
          nodeResults: {
            select: {
              id: true,
              nodeId: true,
              nodeType: true,
              status: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.workflowRun.count({ where }),
    ]);
    
    return NextResponse.json({
      success: true,
      runs,
      total,
      hasMore: skip + limit < total,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch runs' },
      { status: 500 }
    );
  }
}
```

### Update `/api/execute/[runId]/route.ts`

**File:** `src/app/api/execute/[runId]/route.ts`

```typescript
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET(
  request: NextRequest,
  { params }: { params: { runId: string } }
) {
  try {
    const user = await getCurrentUser();
    
    const run = await prisma.workflowRun.findUnique({
      where: { id: params.runId },
      include: {
        nodeResults: true,
        executionLogs: {
          orderBy: { timestamp: 'asc' },
        },
      },
    });
    
    if (!run) {
      return NextResponse.json(
        { success: false, error: 'Run not found' },
        { status: 404 }
      );
    }
    
    // Check ownership
    if (run.userId !== user.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 403 }
      );
    }
    
    return NextResponse.json({
      success: true,
      run,
    });
    
  } catch (error) {
    return NextResponse.json(
      { success: false, error: 'Failed to fetch run' },
      { status: 500 }
    );
  }
}
```

---

## TASK 3: Update Execution Engine to Save Results

### File: `src/lib/execution/engine.ts`

The execution engine should save NodeResult records as it executes each node.

**Add after each node execution:**

```typescript
// Save node result
await prisma.nodeResult.upsert({
  where: { runId_nodeId: { runId: context.runId, nodeId: nodeId } },
  create: {
    runId: context.runId,
    nodeId: nodeId,
    nodeType: nodeData.type,
    status: 'SUCCESS',
    input: nodeInput,
    output: nodeOutput,
    startedAt: new Date(nodeStartTime),
    completedAt: new Date(),
    durationMs: Date.now() - nodeStartTime,
  },
  update: {
    status: 'SUCCESS',
    output: nodeOutput,
    completedAt: new Date(),
    durationMs: Date.now() - nodeStartTime,
  },
});
```

---

## TASK 4: Add Environment Variables

**File:** `.env.local`

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/galaxy_ai"

# Clerk Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_key
CLERK_SECRET_KEY=your_secret

# Transloadit (File Uploads)
TRANSLOADIT_AUTH_KEY=your_key
TRANSLOADIT_SECRET=your_secret

# Trigger.dev (Background Jobs)
TRIGGER_API_KEY=your_key
TRIGGER_API_URL=https://api.trigger.dev

# AI Services
GOOGLE_GENERATIVE_AI_API_KEY=your_key
GROQ_API_KEY=your_key
```

---

## ✅ Implementation Checklist

- [ ] Update `prisma/schema.prisma` with complete schema
- [ ] Run `prisma migrate dev --name init_full_schema`
- [ ] Create `src/lib/auth.ts`
- [ ] Update `src/app/api/execute/route.ts` with auth
- [ ] Create `src/app/api/workflows/route.ts`
- [ ] Create `src/app/api/workflows/[id]/route.ts`
- [ ] Update `src/app/api/runs/route.ts` with user filtering
- [ ] Update `src/app/api/execute/[runId]/route.ts` with auth
- [ ] Update execution engine to save NodeResult
- [ ] Add environment variables to `.env.local`
- [ ] Test all endpoints with Postman/curl

---

## 🧪 Testing

### Test Database Setup
```bash
npx prisma db push
npx prisma generate
```

### Test Workflow Creation
```bash
curl -X POST http://localhost:3000/api/workflows \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "My First Workflow",
    "description": "Test workflow",
    "nodes": [],
    "edges": []
  }'
```

### Test Workflow Execution
```bash
curl -X POST http://localhost:3000/api/execute \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "nodes": [...],
    "edges": [...],
    "workflowId": "workflow_id"
  }'
```

---

## Next Steps

After completing these tasks:

1. ✅ Test all API endpoints work with authentication
2. ✅ Verify workflows are saved to database
3. ✅ Verify runs are tracked in database
4. ✅ Verify node results are saved
5. Then move to Phase 3: **UI Polish & Deployment**

---

## Phase Breakdown (All Tasks)

- ✅ **Phase 1:** All missing features (COMPLETE)
- 🔄 **Phase 2:** Fix incomplete half (THIS TASK)
  - Database schema (Task 1 - START HERE)
  - API authentication (Task 2)
  - Workflow persistence (Task 3)
  - Execution logging (Task 4)
- ⏳ **Phase 3:** Polish & deploy (6 remaining tasks)
