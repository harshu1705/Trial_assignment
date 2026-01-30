# 🚀 Complete Implementation Roadmap - Galaxy.ai

**Objective:** Implement ALL deliverables + production-grade fixes  
**Timeline:** 4-6 weeks focused implementation  
**Status:** Starting from scratch on missing features  

---

## 📋 Master Checklist Overview

### Phase 1: Core Infrastructure (Week 1)
- [ ] PostgreSQL database with Prisma ORM
- [ ] User authentication (Clerk)
- [ ] Protected routes & middleware
- [ ] Database schema (User, Workflow, WorkflowRun, NodeResult, ExecutionLog)
- [ ] API routes with Zod validation
- [ ] Environment setup & validation

### Phase 2: Nodes Implementation (Weeks 2-3)
- [ ] Text Node (textarea + output)
- [ ] Upload Image Node (Transloadit)
- [ ] Upload Video Node (Transloadit)
- [ ] LLM Node (Gemini)
- [ ] Crop Image Node (FFmpeg)
- [ ] Extract Frame Node (FFmpeg)
- [ ] Node execution via Trigger.dev
- [ ] Pulsating glow effect during execution

### Phase 3: UI/UX Polish (Week 3)
- [ ] Pixel-perfect Weavy clone UI
- [ ] Dot grid background on canvas
- [ ] Animated purple edges
- [ ] Node connection visualization
- [ ] Run history sidebar
- [ ] Node-level execution details modal

### Phase 4: Advanced Features (Week 4)
- [ ] Workflow save/load
- [ ] Workflow history persistence
- [ ] Workflow export/import as JSON
- [ ] Pre-built sample workflow
- [ ] Real-time execution status
- [ ] Google Gemini vision support

### Phase 5: Deployment & Testing (Week 4-5)
- [ ] Vercel deployment
- [ ] Environment variables
- [ ] Testing setup (vitest + E2E)
- [ ] Demo video (3-5 min)
- [ ] GitHub repository setup

---

## 🎯 Priority Implementation Order

### CRITICAL (Must have for submission)
1. **Database Schema** ← Start here
2. **Clerk Authentication**
3. **Canvas UI** (React Flow + dot grid)
4. **Text Node** (simplest, test basic flow)
5. **LLM Node** (Gemini integration)
6. **API Routes** (execute, runs, workflows)
7. **Trigger.dev Integration**

### HIGH (Core features)
8. **Upload Image Node** (Transloadit)
9. **Upload Video Node** (Transloadit)
10. **Crop Image Node** (FFmpeg)
11. **Extract Frame Node** (FFmpeg)
12. **Workflow Persistence**
13. **UI Polish**

### MEDIUM (Enhancement)
14. **Pulsating Glow Effect**
15. **Animated Purple Edges**
16. **Node-level History Modal**
17. **Export/Import**
18. **Sample Workflow**

### NICE-TO-HAVE
19. **Advanced styling**
20. **Performance optimization**
21. **Error animations**

---

## 📊 Detailed Implementation Tasks

### PHASE 1: INFRASTRUCTURE (Week 1 - 20 hours)

#### Task 1.1: Database Schema
**Time:** 2-3 hours
**Steps:**
1. Update prisma/schema.prisma with complete schema
2. Add: User, Workflow, WorkflowRun, NodeResult, ExecutionLog tables
3. Add indexes for performance
4. Run migration: `npx prisma migrate dev`
5. Generate Prisma client

**Files to create/modify:**
- `prisma/schema.prisma` (update)
- `src/lib/prisma.ts` (verify)

#### Task 1.2: Environment Configuration
**Time:** 1 hour
**Steps:**
1. Create `src/lib/config.ts` with Zod validation
2. Add `.env.example` file
3. Validate all required ENV vars on startup
4. Add NODE_ENV to distinguish dev/staging/prod

**Files to create:**
- `src/lib/config.ts` (new)
- `.env.example` (new)

#### Task 1.3: Database Client & Utilities
**Time:** 1 hour
**Steps:**
1. Ensure `src/lib/prisma.ts` has singleton pattern
2. Add database initialization check
3. Create seed script for sample data

**Files:**
- `src/lib/prisma.ts` (update)
- `prisma/seed.ts` (new)

#### Task 1.4: Clerk Authentication Middleware
**Time:** 2-3 hours
**Steps:**
1. Configure Clerk middleware
2. Protect `/dashboard` route
3. Add public routes list
4. Create auth utilities

**Files to create:**
- `src/lib/auth.ts` (new)
- `src/middleware.ts` (update)

#### Task 1.5: API Response Standardization
**Time:** 1 hour
**Steps:**
1. Create unified response format
2. Error response format
3. Add to `src/lib/utils.ts`

**Files:**
- `src/lib/utils.ts` (update)

#### Task 1.6: Health Check Endpoint
**Time:** 30 min
**Files to create:**
- `src/app/api/health/route.ts` (new)

---

### PHASE 2: API ROUTES (Week 1-2 - 15 hours)

#### Task 2.1: Workflows CRUD Routes
**Time:** 4-5 hours
**Files to create:**
- `src/app/api/workflows/route.ts` (GET, POST)
- `src/app/api/workflows/[id]/route.ts` (GET, PUT, DELETE)
- Input validation schemas in `src/lib/validation.ts`

**Endpoints:**
```
GET    /api/workflows           - List user's workflows
POST   /api/workflows           - Create new workflow
GET    /api/workflows/[id]      - Get specific workflow
PUT    /api/workflows/[id]      - Update workflow
DELETE /api/workflows/[id]      - Delete workflow
```

#### Task 2.2: Execution Route
**Time:** 2-3 hours
**Files to update:**
- `src/app/api/execute/route.ts` (add auth, validation)

**Features:**
- Auth check (requireAuth)
- Input validation (Zod)
- Trigger background job
- Return runId

#### Task 2.3: Runs History Routes
**Time:** 2-3 hours
**Files to create/update:**
- `src/app/api/runs/route.ts` (GET with pagination)
- `src/app/api/runs/[runId]/route.ts` (GET with details)

**Features:**
- User scoping
- Pagination (page, limit)
- Include nodeResults & logs

---

### PHASE 3: NODES IMPLEMENTATION (Weeks 2-3 - 40 hours)

#### Task 3.1: Text Node
**Time:** 3-4 hours
**Files to create/update:**
- `src/components/nodes/TextNode.tsx` (update)
- `src/lib/execution/nodes/TextNodeExecutor.ts` (update)

**Features:**
- Input textarea
- Output handle
- Live preview

#### Task 3.2: LLM Node
**Time:** 4-5 hours
**Files to create/update:**
- `src/components/nodes/LLMNode.tsx` (update/expand)
- `src/lib/execution/nodes/LLMNodeExecutor.ts` (update)

**Features:**
- Model selector (Gemini, Groq)
- Prompt textarea
- Temperature/tokens input
- Vision support
- Real-time streaming (if possible)

#### Task 3.3: Upload Image Node
**Time:** 5-6 hours
**Files to create:**
- `src/components/nodes/UploadImageNode.tsx` (new)
- `src/lib/execution/nodes/UploadImageNodeExecutor.ts` (new)
- `src/lib/transloadit.ts` (utility for uploads)

**Features:**
- Transloadit upload
- Image preview
- Drag-and-drop
- File size validation

#### Task 3.4: Upload Video Node
**Time:** 5-6 hours
**Files to create:**
- `src/components/nodes/UploadVideoNode.tsx` (new)
- `src/lib/execution/nodes/UploadVideoNodeExecutor.ts` (new)

**Features:**
- Transloadit upload
- Video preview player
- Duration extraction
- Progress bar

#### Task 3.5: Crop Image Node
**Time:** 4-5 hours
**Files to create:**
- `src/components/nodes/CropImageNode.tsx` (new)
- `src/lib/execution/nodes/CropImageNodeExecutor.ts` (new)
- Trigger.dev task for FFmpeg

**Features:**
- Crop coordinates input
- Preview before/after
- FFmpeg execution via Trigger.dev

#### Task 3.6: Extract Frame Node
**Time:** 4-5 hours
**Files to create:**
- `src/components/nodes/ExtractFrameNode.tsx` (new)
- `src/lib/execution/nodes/ExtractFrameNodeExecutor.ts` (new)
- Trigger.dev task for FFmpeg

**Features:**
- Time input (HH:MM:SS)
- Frame preview
- FFmpeg execution via Trigger.dev

#### Task 3.7: Node Registry Update
**Time:** 1 hour
**Files to update:**
- `src/components/nodes/nodeRegistry.ts` (add all nodes)

#### Task 3.8: Pulsating Glow Effect
**Time:** 2 hours
**Files:**
- `src/app/globals.css` (add animations)
- Node components (add className during execution)

---

### PHASE 4: UI/UX POLISH (Week 3 - 20 hours)

#### Task 4.1: Canvas Styling
**Time:** 3-4 hours
**Files to update:**
- `src/components/Canvas.tsx`
- `src/app/globals.css`

**Features:**
- Dot grid background
- Proper sizing
- Responsive layout

#### Task 4.2: Sidebar Styling
**Time:** 3-4 hours
**Files to update:**
- `src/components/NodesSidebar.tsx` (button layout)
- `src/components/RunHistorySidebar.tsx` (history display)

#### Task 4.3: Edge Styling
**Time:** 2-3 hours
**Files:**
- Update React Flow config
- Add purple color theme
- Add animation on execution

#### Task 4.4: Execution Status Visual
**Time:** 3-4 hours
**Files:**
- Add pulsating animation
- Add status colors (queued, running, done, error)
- Update node rendering

#### Task 4.5: Modal/Details Panel
**Time:** 3-4 hours
**Files to create:**
- `src/components/ExecutionDetailsModal.tsx` (new)

**Shows:**
- Node-level execution details
- Input/output values
- Duration
- Error messages

#### Task 4.6: Layout Refinement
**Time:** 2-3 hours
**Files:**
- Dashboard responsive design
- Sidebar widths
- Spacing & padding

---

### PHASE 5: WORKFLOW FEATURES (Week 4 - 15 hours)

#### Task 5.1: Workflow Save
**Time:** 2-3 hours
**Files to update:**
- UI: Add "Save" button
- API: POST /api/workflows

#### Task 5.2: Workflow Load
**Time:** 2-3 hours
**Files to update:**
- UI: Add workflow selector
- API: GET /api/workflows, GET /api/workflows/[id]

#### Task 5.3: Workflow History
**Time:** 2 hours
**Files to update:**
- Right sidebar: Display runs
- Click run → show details

#### Task 5.4: Export/Import
**Time:** 2-3 hours
**Files to create:**
- `src/lib/workflow-io.ts` (JSON export/import)

#### Task 5.5: Sample Workflow
**Time:** 2-3 hours
**Create:**
- Pre-built workflow in database
- Display on first login

#### Task 5.6: Real-time Execution
**Time:** 2-3 hours
**Features:**
- Poll /api/runs/[runId] for status
- Update UI in real-time
- Show node progress

---

### PHASE 6: TRIGGER.DEV TASKS (Week 2-4 - 20 hours)

#### Task 6.1: Workflow Task
**Time:** 3-4 hours
**File:** `src/trigger/workflow.ts`
**Update:**
- Add userId to payload
- Persist results to database
- Handle errors

#### Task 6.2: FFmpeg Crop Task
**Time:** 3-4 hours
**File:** `src/trigger/ffmpeg-crop.ts` (new)
**Features:**
- Receive image URL
- Run FFmpeg crop command
- Return cropped image URL

#### Task 6.3: FFmpeg Extract Frame Task
**Time:** 3-4 hours
**File:** `src/trigger/ffmpeg-extract-frame.ts` (new)
**Features:**
- Receive video URL + timestamp
- Run FFmpeg extract command
- Return frame image URL

#### Task 6.4: Transloadit Integration
**Time:** 3-4 hours
**File:** `src/lib/transloadit.ts`
**Features:**
- Generate upload tokens
- Webhook handling
- File processing

#### Task 6.5: Error Handling & Retries
**Time:** 2-3 hours
**Files:**
- Add retry logic to all tasks
- Add error notifications
- Add fallback handling

---

### PHASE 7: DEPLOYMENT (Week 4-5 - 15 hours)

#### Task 7.1: Environment Setup
**Time:** 2 hours
**Steps:**
1. Create .env.example with all required vars
2. Document each variable
3. Setup Vercel environment config

#### Task 7.2: Database Migration
**Time:** 2 hours
**Steps:**
1. Create Vercel PostgreSQL database
2. Run migrations
3. Seed sample data

#### Task 7.3: Vercel Deployment
**Time:** 2 hours
**Steps:**
1. Connect GitHub repo to Vercel
2. Configure environment variables
3. Deploy and test

#### Task 7.4: API Keys Setup
**Time:** 2 hours
**Get keys for:**
- Clerk (already have)
- Trigger.dev (already have)
- Gemini API
- Transloadit
- PostgreSQL

#### Task 7.5: Testing in Production
**Time:** 3 hours
**Test:**
- Authentication flow
- Workflow creation & execution
- Node uploads
- End-to-end workflow

#### Task 7.6: Demo Video
**Time:** 3-4 hours
**Record:**
- 3-5 minute walkthrough
- All features demonstrated
- Real-world use case

---

## 📝 File Structure After Completion

```
src/
├── app/
│   ├── api/
│   │   ├── health/
│   │   │   └── route.ts ✨
│   │   ├── execute/
│   │   │   ├── route.ts ✨
│   │   │   └── [runId]/
│   │   │       └── route.ts ✨
│   │   ├── workflows/
│   │   │   ├── route.ts ✨
│   │   │   └── [id]/
│   │   │       └── route.ts ✨
│   │   ├── runs/
│   │   │   ├── route.ts ✨
│   │   │   └── [runId]/
│   │   │       └── route.ts ✨
│   ├── dashboard/
│   │   ├── page.tsx ✨
│   │   └── layout.tsx
│   ├── (public)/
│   │   └── page.tsx
│   └── globals.css ✨
├── components/
│   ├── Canvas.tsx ✨
│   ├── Dashboard.tsx ✨
│   ├── NodesSidebar.tsx ✨
│   ├── RunHistorySidebar.tsx ✨
│   ├── ExecutionDetailsModal.tsx ✨
│   └── nodes/
│       ├── TextNode.tsx ✨
│       ├── LLMNode.tsx ✨
│       ├── UploadImageNode.tsx ✨
│       ├── UploadVideoNode.tsx ✨
│       ├── CropImageNode.tsx ✨
│       ├── ExtractFrameNode.tsx ✨
│       ├── DebugNode.tsx
│       ├── nodeRegistry.ts ✨
│       ├── BaseNode.tsx ✨
│       ├── InputHandle.tsx
│       ├── OutputHandle.tsx
│       └── VisionNode.tsx
├── lib/
│   ├── auth.ts ✨
│   ├── config.ts ✨
│   ├── prisma.ts ✨
│   ├── store.ts ✨
│   ├── utils.ts ✨
│   ├── validation.ts ✨
│   ├── transloadit.ts ✨
│   ├── workflow-io.ts ✨
│   ├── execution/
│   │   ├── engine.ts ✨
│   │   ├── ExecutorRegistry.ts ✨
│   │   ├── types.ts
│   │   └── nodes/
│   │       ├── TextNodeExecutor.ts ✨
│   │       ├── LLMNodeExecutor.ts ✨
│   │       ├── UploadImageNodeExecutor.ts ✨
│   │       ├── UploadVideoNodeExecutor.ts ✨
│   │       ├── CropImageNodeExecutor.ts ✨
│   │       ├── ExtractFrameNodeExecutor.ts ✨
│   │       ├── DebugNodeExecutor.ts
│   │       └── VisionNodeExecutor.ts
├── trigger/
│   ├── index.ts
│   ├── workflow.ts ✨
│   ├── ffmpeg-crop.ts ✨
│   ├── ffmpeg-extract-frame.ts ✨
│   ├── test-job.ts
│   └── transloadit-handler.ts ✨
└── middleware.ts ✨

prisma/
├── schema.prisma ✨
└── migrations/
    └── [new migrations]

.env.example ✨
.env.local (local secrets)
```

✨ = Files to create or significantly update

---

## 🎯 Success Criteria

### Code Quality
- ✅ TypeScript strict mode throughout
- ✅ Zod validation on all inputs
- ✅ Error handling on all API routes
- ✅ No console errors in production

### Features
- ✅ All 6 node types working
- ✅ All node executions via Trigger.dev
- ✅ Workflow save/load/export working
- ✅ Real-time execution status
- ✅ File uploads (images & videos)
- ✅ Image processing (crop)
- ✅ Video processing (extract frame)

### UI/UX
- ✅ Pixel-perfect Weavy clone
- ✅ Dot grid canvas background
- ✅ Animated purple edges
- ✅ Pulsating glow on execution
- ✅ Responsive design
- ✅ Smooth animations

### Deployment
- ✅ GitHub repo with all code
- ✅ Vercel live demo
- ✅ All API keys working
- ✅ Database synced
- ✅ Environment variables set

### Documentation
- ✅ 3-5 min demo video
- ✅ README with setup instructions
- ✅ API documentation
- ✅ Component documentation

---

## ⏱️ Weekly Timeline

### Week 1: Infrastructure + Basic API
- Day 1-2: Database schema + migrations
- Day 3-4: Authentication + middleware
- Day 5: API routes setup + Zod validation
- **Result:** Core API ready, can authenticate

### Week 2: First Nodes + Execution
- Day 1-2: Text Node implementation
- Day 3-4: LLM Node + Gemini integration
- Day 5: Trigger.dev task execution
- **Result:** Can create and execute basic workflows

### Week 3: File Handling Nodes
- Day 1-2: Upload Image Node + Transloadit
- Day 3-4: Upload Video Node + player
- Day 5: UI polish + sidebar refinement
- **Result:** Can upload and preview media

### Week 4: Image/Video Processing
- Day 1-2: Crop Image Node + FFmpeg
- Day 3-4: Extract Frame Node + FFmpeg
- Day 5: Workflow save/load + export/import
- **Result:** Full workflow with processing

### Week 5: Final Polish + Deployment
- Day 1-2: UI refinement + animations
- Day 3-4: Testing + bug fixes
- Day 5: Vercel deployment + demo video
- **Result:** Production-ready application

---

## 🚀 How to Start

### TODAY
1. Read this entire roadmap
2. Decide: "Full implementation or phased?"
3. Setup database schema (Task 1.1)

### TOMORROW
1. Implement authentication (Task 1.4)
2. Create API routes (Task 2.1)
3. Start with Text Node (Task 3.1)

### THIS WEEK
1. Complete all Phase 1 tasks
2. Get basic API working
3. Demo to team

---

## 📊 Effort Estimate

```
Phase 1: Infrastructure    20 hrs
Phase 2: API Routes        15 hrs
Phase 3: Nodes             40 hrs
Phase 4: UI/UX             20 hrs
Phase 5: Workflow Features 15 hrs
Phase 6: Trigger.dev Tasks 20 hrs
Phase 7: Deployment        15 hrs
────────────────────────────────
TOTAL                     145 hrs

Team Allocation:
- 1 Full-stack engineer: 6 weeks (240 hours available)
- 1 Part-time DevOps: 1 week for deployment
```

---

## ✅ Next Action

Start with **Task 1.1: Database Schema** tomorrow.

All the code examples and detailed implementation steps are in IMPLEMENTATION_GUIDE.md.

Let's build this! 🚀

