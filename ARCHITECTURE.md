# 🏗️ Architecture Analysis & Recommendations

## Current Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    FRONTEND (Next.js 16)                     │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  Dashboard (Protected via Clerk)                      │  │
│  │  ├── Canvas Component (React Flow)                    │  │
│  │  ├── NodesSidebar (Palette)                          │  │
│  │  └── RunHistorySidebar (Execute button)              │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                   │
│  ┌───────────────────────────────────────────────────────┐  │
│  │  State Management (Zustand + Zundo)                   │  │
│  │  ├── nodes[] (positions, data)                        │  │
│  │  ├── edges[] (connections)                           │  │
│  │  └── Undo/Redo Stack                                 │  │
│  └───────────────────────────────────────────────────────┘  │
│                           ↓                                   │
│  Validation & Cycle Detection ✅                             │
│  └─ isCyclic() ✓                                             │
│  └─ validateWorkflow() ✓                                     │
│                                                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
        ┌──────────────────────────────────────┐
        │      API ROUTES (Next.js API)         │
        ├──────────────────────────────────────┤
        │                                       │
        │ ❌ POST /api/execute (NO AUTH)        │
        │ ❌ GET /api/runs (NO USER SCOPE)      │
        │ ❌ GET /api/health (MISSING)          │
        │                                       │
        └──────────────────────────────────────┘
                           ↓
        ┌──────────────────────────────────────┐
        │    JOB QUEUE (Trigger.dev v4)         │
        ├──────────────────────────────────────┤
        │                                       │
        │ ✅ workflowTask()                     │
        │    ├── Receives nodes + edges        │
        │    ├── Execution Engine runs         │
        │    └── Returns results               │
        │                                       │
        └──────────────────────────────────────┘
                           ↓
        ┌──────────────────────────────────────┐
        │  EXECUTION ENGINE (lib/execution/)    │
        ├──────────────────────────────────────┤
        │                                       │
        │ ✅ getExecutionOrder()                │
        │    └── Kahn's Algorithm ✓            │
        │                                       │
        │ ✅ Executor Registry                  │
        │    ├── TextNodeExecutor              │
        │    ├── LLMNodeExecutor (Gemini)      │
        │    ├── VisionNodeExecutor            │
        │    └── DebugNodeExecutor             │
        │                                       │
        │ ✅ runWorkflow()                      │
        │    ├── Topological order             │
        │    ├── Per-node execution            │
        │    └── Error handling                │
        │                                       │
        └──────────────────────────────────────┘
                           ↓
        ┌──────────────────────────────────────┐
        │   DATABASE (SQLite + Prisma)          │
        ├──────────────────────────────────────┤
        │                                       │
        │ ❌ WorkflowRun (INCOMPLETE)           │
        │    └── No userId, no workflowId      │
        │    └── payload as JSON blob          │
        │                                       │
        │ ❌ Missing tables:                    │
        │    ├── User                          │
        │    ├── Workflow (templates)          │
        │    ├── NodeResult                    │
        │    └── ExecutionLog                  │
        │                                       │
        └──────────────────────────────────────┘
```

---

## Recommended Production Architecture

```
┌──────────────────────────────────────────────────────────────┐
│                   FRONTEND (Next.js 16)                       │
├──────────────────────────────────────────────────────────────┤
│                                                                │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Auth Middleware (Clerk)                                │  │
│  │ ├── Protect /dashboard                                │  │
│  │ └── Set X-User-ID header in requests                 │  │
│  └────────────────────────────────────────────────────────┘  │
│                           ↓                                    │
│  ┌────────────────────────────────────────────────────────┐  │
│  │ Dashboard UI                                           │  │
│  │ ├── Canvas (save to /api/workflows)                  │  │
│  │ ├── Load previous workflows                          │  │
│  │ └── View run history (paginated)                     │  │
│  └────────────────────────────────────────────────────────┘  │
│                           ↓                                    │
│  Zustand Store (persist to localStorage)                       │
│                                                                │
└──────────────────────────────────────────────────────────────┘
                           ↓
    ┌─────────────────────────────────────────┐
    │     MIDDLEWARE LAYER (New) ✨            │
    ├─────────────────────────────────────────┤
    │                                          │
    │ 1. Authentication Check                 │
    │    └── Verify JWT/Clerk token           │
    │                                          │
    │ 2. Authorization                        │
    │    └── User can only access own data    │
    │                                          │
    │ 3. Rate Limiting (Redis)                │
    │    └── 100 requests/minute per user     │
    │                                          │
    │ 4. Input Validation                     │
    │    └── Zod schema validation            │
    │                                          │
    └─────────────────────────────────────────┘
                           ↓
    ┌─────────────────────────────────────────┐
    │     API ROUTES (Enhanced) ✨             │
    ├─────────────────────────────────────────┤
    │                                          │
    │ ✅ GET /api/health                      │
    │ ✅ POST /api/execute (auth required)    │
    │ ✅ GET /api/runs (user scoped)          │
    │ ✅ GET /api/workflows                   │
    │ ✅ POST /api/workflows                  │
    │ ✅ GET /api/workflows/[id]              │
    │ ✅ PUT /api/workflows/[id]              │
    │ ✅ DELETE /api/workflows/[id]           │
    │                                          │
    └─────────────────────────────────────────┘
                           ↓
    ┌─────────────────────────────────────────┐
    │  BACKGROUND JOBS (Trigger.dev v4)       │
    ├─────────────────────────────────────────┤
    │                                          │
    │ ✅ workflowTask()                       │
    │    ├── userId passed in payload         │
    │    ├── Execution engine runs            │
    │    └── Results persisted to DB          │
    │                                          │
    │ ✅ Automatic retries + fallback         │
    │                                          │
    └─────────────────────────────────────────┘
                           ↓
    ┌─────────────────────────────────────────┐
    │  EXECUTION ENGINE (lib/execution/)      │
    ├─────────────────────────────────────────┤
    │                                          │
    │ ✅ Deterministic DAG execution          │
    │ ✅ Node result persistence              │
    │ ✅ Structured error handling            │
    │ ✅ Logging to database                  │
    │                                          │
    └─────────────────────────────────────────┘
                           ↓
    ┌─────────────────────────────────────────┐
    │  CACHE LAYER (Redis) ✨                 │
    ├─────────────────────────────────────────┤
    │                                          │
    │ • User workflow list (5 min TTL)        │
    │ • Rate limit counters                   │
    │ • API response caching                  │
    │ • Session data                          │
    │                                          │
    └─────────────────────────────────────────┘
                           ↓
    ┌─────────────────────────────────────────┐
    │  DATABASE (PostgreSQL) ✨               │
    ├─────────────────────────────────────────┤
    │                                          │
    │ ✅ User                                 │
    │    └── clerkId, email, firstName, etc. │
    │                                          │
    │ ✅ Workflow                             │
    │    ├── userId (FK)                     │
    │    ├── name, description                │
    │    ├── nodes, edges (JSON)             │
    │    └── version, isPublished             │
    │                                          │
    │ ✅ WorkflowRun                          │
    │    ├── userId (FK)                     │
    │    ├── workflowId (FK, optional)       │
    │    ├── status, duration                │
    │    └── nodeResults, logs (relations)   │
    │                                          │
    │ ✅ NodeResult                           │
    │    ├── runId (FK)                      │
    │    ├── nodeId, nodeType                │
    │    ├── status, output, error           │
    │    └── duration                         │
    │                                          │
    │ ✅ ExecutionLog                         │
    │    ├── runId (FK)                      │
    │    ├── message, level                  │
    │    └── timestamp                        │
    │                                          │
    └─────────────────────────────────────────┘
                           ↓
    ┌─────────────────────────────────────────┐
    │  EXTERNAL SERVICES ✨                   │
    ├─────────────────────────────────────────┤
    │                                          │
    │ 📊 Monitoring (Datadog/New Relic)       │
    │    ├── APM metrics                      │
    │    ├── Error tracking                   │
    │    └── Performance dashboards           │
    │                                          │
    │ 🚨 Error Tracking (Sentry)              │
    │    ├── Exception capture                │
    │    ├── Release tracking                 │
    │    └── Source map support               │
    │                                          │
    │ 🤖 AI Providers                         │
    │    ├── Google Gemini (primary)          │
    │    └── Groq (fallback)                  │
    │                                          │
    │ 💾 S3 (for images)                      │
    │    └── Vision node image storage        │
    │                                          │
    │ 🔔 PagerDuty                            │
    │    └── Production alerts                │
    │                                          │
    └─────────────────────────────────────────┘
```

---

## Data Flow Diagram

### Create & Execute Workflow

```
User creates workflow in Canvas
         ↓
State stored in Zustand (client)
         ↓
Click "Execute" button
         ↓
POST /api/execute
  ├── Middleware: Check auth ✅ NEW
  ├── Middleware: Rate limit check ✅ NEW
  ├── Middleware: Validate schema ✅ NEW
  └── Extract userId from header ✅ NEW
         ↓
Trigger background job
  └── tasks.trigger("workflow-task", {
        nodes, edges, userId, workflowId
      })
         ↓
Background Job (Trigger.dev)
  ├── Run execution engine
  ├── Persist results to NodeResult table ✅ NEW
  ├── Store logs in ExecutionLog table ✅ NEW
  └── Update WorkflowRun.status
         ↓
Database stores results (user-scoped) ✅ NEW
         ↓
Frontend polls GET /api/runs/[runId]
  ├── Middleware: Check auth
  ├── Middleware: Verify user owns this run ✅ NEW
  └── Return results (with caching) ✅ NEW
         ↓
UI displays results to user
```

### Save Workflow

```
User edits workflow in Canvas
         ↓
State in Zustand (client)
         ↓
Click "Save" button (NEW UI)
         ↓
POST /api/workflows or PUT /api/workflows/[id]
  ├── Middleware: Check auth
  ├── Middleware: Validate input
  └── Extract userId
         ↓
Database stores Workflow
  ├── userId (tied to user)
  ├── nodes, edges (JSON)
  ├── version incremented
  └── updatedAt timestamp
         ↓
Cache invalidated for user's workflow list
         ↓
Frontend shows success message
```

### Load Workflow

```
User clicks "Load Workflow"
         ↓
GET /api/workflows (auth required)
  ├── Query: WHERE userId = :userId
  ├── Return: List of user's workflows
  └── Cache: 5 minute TTL
         ↓
User selects workflow
         ↓
GET /api/workflows/[id] (auth required)
  ├── Verify: workflow.userId === currentUser
  ├── Parse: nodes, edges from JSON
  └── Return: Full workflow data
         ↓
Frontend loads into Canvas
  └── Zustand state updated
```

---

## Data Model Relationships

```
User (1) ──────→ (*) Workflow
  |
  └──────→ (*) WorkflowRun
              |
              ├──────→ (*) NodeResult
              |
              └──────→ (*) ExecutionLog

Workflow (1) ──────→ (*) WorkflowRun
```

### ERD (Entity Relationship Diagram)

```
┌─────────────────────┐
│       User          │
├─────────────────────┤
│ id (PK)             │
│ clerkId (UNIQUE)    │
│ email (UNIQUE)      │
│ firstName           │
│ lastName            │
│ avatar              │
│ createdAt           │
│ updatedAt           │
└─────────────────────┘
        │
        │ (1:N)
        ↓
┌─────────────────────┐     ┌─────────────────────┐
│    Workflow         │────→│   WorkflowRun       │
├─────────────────────┤     ├─────────────────────┤
│ id (PK)             │     │ id (PK)             │
│ userId (FK)         │     │ workflowId (FK)     │
│ name                │     │ userId (FK)         │
│ description         │     │ status              │
│ nodes (JSON)        │     │ scope               │
│ edges (JSON)        │     │ totalNodes          │
│ version             │     │ successNodes        │
│ isPublished         │     │ failedNodes         │
│ createdAt           │     │ duration            │
│ updatedAt           │     │ triggerId           │
└─────────────────────┘     │ createdAt           │
                            │ completedAt         │
                            └─────────────────────┘
                                    │
                                    │ (1:N)
                                    ↓
                            ┌─────────────────────┐
                            │   NodeResult        │
                            ├─────────────────────┤
                            │ id (PK)             │
                            │ runId (FK)          │
                            │ nodeId              │
                            │ nodeType            │
                            │ status              │
                            │ output              │
                            │ error               │
                            │ duration            │
                            │ createdAt           │
                            └─────────────────────┘

                            ┌─────────────────────┐
                            │  ExecutionLog       │
                            ├─────────────────────┤
                            │ id (PK)             │
                            │ runId (FK)          │
                            │ message             │
                            │ level               │
                            │ timestamp           │
                            └─────────────────────┘
```

---

## API Endpoint Structure

```
Authentication REQUIRED on all routes (except /health)
User data scoped to authenticated user

GET  /api/health
     └── No auth required, returns status

GET  /api/workflows
     ├── Auth: required
     ├── Query params: page, limit
     └── Returns: List of user's workflows

POST /api/workflows
     ├── Auth: required
     ├── Body: { name, description, nodes, edges }
     └── Returns: Created workflow

GET  /api/workflows/[id]
     ├── Auth: required
     ├── Verify: User owns workflow
     └── Returns: Workflow with parsed nodes/edges

PUT  /api/workflows/[id]
     ├── Auth: required
     ├── Verify: User owns workflow
     ├── Body: { name, description, nodes, edges }
     └── Returns: Updated workflow (version++)

DELETE /api/workflows/[id]
       ├── Auth: required
       ├── Verify: User owns workflow
       └── Returns: Deletion confirmation

POST /api/execute
     ├── Auth: required
     ├── Rate limit: 100/minute per user
     ├── Body: { nodes, edges, workflowId? }
     └── Returns: { runId }

GET  /api/runs
     ├── Auth: required
     ├── Query params: page, limit, status
     ├── Scope: Only user's runs
     └── Returns: Paginated runs with counts

GET  /api/runs/[runId]
     ├── Auth: required
     ├── Verify: User owns run
     ├── Include: nodeResults, logs
     └── Returns: Full run data
```

---

## Performance Optimizations

### Database Indexes
```sql
-- Workflows
CREATE INDEX idx_workflow_userId ON Workflow(userId);
CREATE INDEX idx_workflow_createdAt ON Workflow(createdAt DESC);
CREATE INDEX idx_workflow_userId_createdAt ON Workflow(userId, createdAt DESC);

-- WorkflowRuns
CREATE INDEX idx_run_userId ON WorkflowRun(userId);
CREATE INDEX idx_run_workflowId ON WorkflowRun(workflowId);
CREATE INDEX idx_run_status ON WorkflowRun(status);
CREATE INDEX idx_run_userId_createdAt ON WorkflowRun(userId, createdAt DESC);

-- NodeResults
CREATE INDEX idx_noderesult_runId ON NodeResult(runId);
CREATE INDEX idx_noderesult_status ON NodeResult(status);

-- ExecutionLogs
CREATE INDEX idx_log_runId ON ExecutionLog(runId);
CREATE INDEX idx_log_level ON ExecutionLog(level);
```

### Caching Strategy
```
Resource                TTL       Key Pattern
────────────────────────────────────────────
User workflows          5 min     workflows:{userId}
Single workflow         10 min    workflow:{userId}:{workflowId}
Run list                2 min     runs:{userId}:{page}
Run details             15 min    run:{runId}
Rate limit counter      1 min     ratelimit:{userId}:{endpoint}
```

### Query Optimization
```typescript
// ❌ BAD - N+1 query problem
const workflows = await prisma.workflow.findMany();
for (const w of workflows) {
  const runs = await prisma.workflowRun.findMany({ 
    where: { workflowId: w.id } 
  });
}

// ✅ GOOD - Single query with relation
const workflows = await prisma.workflow.findMany({
  where: { userId },
  include: {
    _count: { select: { runs: true } }
  }
});
```

---

## Security Layers

```
Request
  ↓
1. HTTPS/TLS (transport security)
  ↓
2. Clerk Authentication (identity)
  ↓
3. Authorization Middleware (ownership)
  ↓
4. Input Validation (schema)
  ↓
5. Rate Limiting (abuse prevention)
  ↓
6. Database Permission (user scoping)
  ↓
7. Logging & Audit Trail (accountability)
  ↓
Response (encrypted)
```

---

## Scalability Path

### Phase 1: Foundation (Now)
- PostgreSQL with proper indexes
- Redis for caching + rate limiting
- Structured logging (Sentry)

### Phase 2: Mid-scale (3-6 months)
- Database read replicas
- CDN for static assets
- Job queue optimization

### Phase 3: Enterprise (6-12 months)
- Horizontal scaling (multiple app instances)
- Database sharding (by userId)
- Multi-region deployment
- Advanced caching (varnish, elasticsearch)

---

## Deployment Architecture

```
Git Repository
      ↓
GitHub Actions (CI)
  ├── Lint
  ├── Test (70%+ coverage)
  ├── Build
  └── Push to registry
      ↓
Staging Environment
  ├── Run integration tests
  ├── Performance tests
  └── E2E tests
      ↓
Production (Vercel)
  ├── Blue-green deployment
  ├── Database migrations
  ├── Health checks
  └── Automated rollback on failure
      ↓
Monitoring (Datadog)
  ├── APM metrics
  ├── Error tracking (Sentry)
  ├── Alerts (PagerDuty)
  └── Dashboards
```

---

## Summary

| Aspect | Current | Recommended | Benefit |
|--------|---------|-------------|---------|
| **Database** | SQLite | PostgreSQL | Concurrency, reliability |
| **Caching** | None | Redis | Performance, rate limiting |
| **API Auth** | Missing | JWT/Clerk | Security |
| **Monitoring** | None | Datadog + Sentry | Observability |
| **Logging** | Console | Structured (JSON) | Debugging |
| **Testing** | 0% | 70%+ | Confidence |
| **Scoping** | None | By userId | Multi-tenancy |

**Implementing this architecture ensures production-grade reliability, security, and scalability.** ✅

