# Galaxy.ai - AI Workflow Editor

A production-ready AI workflow builder built with **Next.js 16**, **React Flow**, **Trigger.dev**, and **PostgreSQL**. 

## 🚀 Key Features

-   **Canvas-Based Editing**: Drag-and-drop interface powered by React Flow
-   **8 Node Types**: Text, LLM, Vision, Upload Image, Upload Video, Crop Image, Extract Frame, Debug
-   **File Uploads**: Transloadit integration for image/video uploads (max 50MB images, 500MB videos)
-   **Image Processing**: FFmpeg crop with coordinate inputs
-   **Video Processing**: FFmpeg frame extraction with timestamps
-   **Deterministic Execution**: Custom DAG executor using topological sort
-   **Serverless Jobs**: Background execution via Trigger.dev with no timeouts
-   **User Authentication**: Clerk auth with complete user data isolation
-   **Workflow Persistence**: Save/load/export workflows from PostgreSQL
-   **Execution History**: Track all runs with node-level details
-   **Real-time Status**: Beautiful animations - dot grid, pulsating glow, animated edges
-   **Multi-Provider AI**: Google Gemini + Groq with automatic fallbacks

## 🛠️ Tech Stack

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS 4, React Flow v12
- **Backend**: Next.js API Routes, Trigger.dev SDK v4, Prisma ORM
- **Database**: PostgreSQL 13+
- **Authentication**: Clerk
- **File Processing**: Transloadit (uploads), FFmpeg (video/image processing)
- **AI**: Google Gemini API, Groq API
- **State**: Zustand + Zundo (undo/redo)

## 📋 Prerequisites

- Node.js 18+ (v20 recommended)
- PostgreSQL 13+
- npm or pnpm
- Clerk account (free tier OK)
- Trigger.dev account (free tier OK)

## 🏃‍♂️ Quick Start

### 1. Clone & Install

```bash
git clone <your-repo>
cd assignment-fullstack
npm install
```

### 2. Database Setup

```bash
# Create PostgreSQL database
createdb galaxy_ai

# Run migrations
npx prisma migrate dev --name init
npx prisma generate

# (Optional) View database
npx prisma studio
```

### 3. Environment Variables

Create `.env.local`:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/galaxy_ai"

# Authentication (from Clerk)
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Background Jobs (from Trigger.dev)
TRIGGER_API_KEY=tr_dev_...
TRIGGER_API_URL=https://api.trigger.dev

# AI (from Google Cloud & Groq)
GOOGLE_GENERATIVE_AI_API_KEY=AIza...
GROQ_API_KEY=gsk_...

# File Uploads (from Transloadit)
TRANSLOADIT_AUTH_KEY=your_key
TRANSLOADIT_SECRET=your_secret
```

### 4. Run Development

**Terminal 1 - Next.js App:**
```bash
npm run dev
```

**Terminal 2 - Trigger.dev Worker:**
```bash
npx trigger.dev dev
```

Visit http://localhost:3000

## 📖 API Reference

### Authentication
All endpoints require Clerk authentication. User data automatically isolated by userId.

### Workflows
```bash
GET    /api/workflows              # List user's workflows
POST   /api/workflows              # Create new workflow
GET    /api/workflows/[id]         # Get workflow details
PUT    /api/workflows/[id]         # Update workflow
DELETE /api/workflows/[id]         # Delete workflow
```

### Execution
```bash
POST   /api/execute                # Start workflow execution
GET    /api/execute/[runId]        # Get execution status & results
GET    /api/runs                   # List execution history
```

## 🎨 Node Types

### Input Nodes
| Node | Purpose | Output |
|------|---------|--------|
| **Text** | Enter text input | text |
| **Upload Image** | Upload JPG/PNG images | image-url |
| **Upload Video** | Upload MP4/WebM videos | video-url |

### Processing Nodes
| Node | Purpose | Input | Output |
|------|---------|-------|--------|
| **LLM** | Generate text (Gemini/Groq) | text/image | text |
| **Vision** | Analyze images | image | analysis |
| **Crop Image** | Crop by coordinates | image | cropped-image |
| **Extract Frame** | Extract frame at timestamp | video | frame |

### Utility
| Node | Purpose |
|------|---------|
| **Debug** | Inspect data at any point |

## 🔐 Security & Data

- ✅ All routes protected with Clerk authentication
- ✅ User data isolated at database level (userId foreign keys)
- ✅ Ownership verification on all user resources
- ✅ No cross-user data leakage
- ✅ Secure API routes with Zod validation

## 📊 Database Schema

### User
- id, clerkId (unique), email (unique), name, avatar
- Relations: workflows[], runs[]

### Workflow
- id, userId, name, description, nodes (JSON), edges (JSON)
- Relations: runs[], user

### WorkflowRun
- id, userId, workflowId, status, input/output (JSON), errorMessage
- Relations: nodeResults[], executionLogs[], user, workflow

### NodeResult
- id, runId, nodeId, nodeType, status, input/output (JSON), error
- Tracks individual node execution details

### ExecutionLog
- id, runId, level, message, timestamp
- Audit trail of execution events

## 🚀 Deployment

### Vercel

```bash
# Set environment variables in Vercel dashboard
# Then push to GitHub

git add .
git commit -m "Production ready"
git push origin main
```

Vercel auto-deploys on push.

### PostgreSQL Connection

For production, use:
- Vercel Postgres (easy, integrated)
- AWS RDS (reliable, scalable)
- Railway (cheap, easy)
- PlanetScale (MySQL alternative)

Update `DATABASE_URL` in Vercel environment variables.

## 🧪 Testing

```bash
# Run tests
npm test

# Check types
npm run type-check

# Lint code
npm run lint
```

## 📚 Project Structure

```
src/
├─ app/
│  ├─ api/
│  │  ├─ execute/              # Workflow execution
│  │  ├─ runs/                 # Execution history
│  │  └─ workflows/            # Workflow CRUD
│  ├─ dashboard/               # Main app
│  └─ (auth)/                  # Auth pages (Clerk)
├─ components/
│  ├─ Canvas.tsx               # Main editor
│  ├─ NodesSidebar.tsx         # Node palette
│  ├─ RunHistorySidebar.tsx    # Run history
│  └─ nodes/                   # 8 node types
├─ lib/
│  ├─ auth.ts                  # Auth utilities
│  ├─ store.ts                 # Zustand state
│  ├─ execution/
│  │  ├─ engine.ts             # DAG executor
│  │  └─ nodes/                # Node executors
│  └─ prisma.ts                # DB client
├─ trigger/                     # Trigger.dev tasks
└─ middleware.ts                # Route protection

prisma/
├─ schema.prisma               # Database schema
└─ migrations/                 # Migration history
```

## 🎓 Architecture Highlights

### Execution Engine
- **Kahn's Algorithm**: Topological sort for deterministic execution order
- **Cycle Detection**: Prevents infinite loops
- **Data Flow**: Node results accessible to downstream nodes
- **Error Handling**: Graceful failure with detailed error messages

### State Management
- **Zustand**: Simple, lightweight state store
- **Zundo**: Undo/Redo support
- **Shallow selectors**: Prevent unnecessary re-renders

### API Design
- **RESTful**: Standard HTTP verbs (GET, POST, PUT, DELETE)
- **Authenticated**: All routes require Clerk auth
- **Scoped**: Queries automatically filtered by userId
- **Validated**: Zod schemas validate all inputs

## 🤝 Contributing

1. Fork the repo
2. Create feature branch: `git checkout -b feature/my-feature`
3. Commit: `git commit -m "Add feature"`
4. Push: `git push origin feature/my-feature`
5. Open PR

## 📝 License

MIT

## 🙋 Support

For issues or questions:
1. Check existing issues/PRs
2. Create new issue with details
3. Include error logs and reproduction steps

---

**Built with ❤️ for the Fullstack Engineer Assignment**

Latest Update: January 30, 2026
