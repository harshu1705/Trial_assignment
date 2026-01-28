# Galaxy.ai - AI Workflow Editor

A robust, deterministic AI workflow builder built with **Next.js 15**, **React Flow**, and **Trigger.dev v3**. This project demonstrates a production-grade architecture for executing complex, node-based LLM workflows.

## 🚀 Key Features

-   **Canvas-Based Editing**: Drag-and-drop interface powered by React Flow + @xyflow/react.
-   **Deterministic Execution Engine**: Custom DAG (Directed Acyclic Graph) executor using Kahn’s algorithm.
-   **Serverless Background Jobs**: Workflows run as background tasks via Trigger.dev, ensuring reliability and no timeouts.
-   **Multi-Provider AI**:
    -   **Gemini (Preferred)**: Uses Google's `gemini-1.5-flash` via strict REST usage (fetch).
    -   **Groq (Backup)**: Fallback to fast Llama 3 models if Gemini is unavailable.
    -   **Mock Fallback**: Automatic mock mode for demoing without API keys.
-   **Real-time Status**: Poll-based status updates for running nodes (Queued -> Running -> Completed/Failed).

## 🛠️ Tech Stack

-   **Frontend**: Next.js 15 (App Router), TailwindCSS, React Flow.
-   **Backend**: Next.js API Routes, Trigger.dev SDK.
-   **Infrastructure**: Trigger.dev (Worker Platform).
-   **AI Integration**: Google Gemini API, Groq Cloud API.

## 🏃‍♂️ Getting Started

### 1. Installation

```bash
npm install
```

### 2. Environment Setup

Create a `.env.local` file:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Trigger.dev
TRIGGER_SECRET_KEY=tr_dev_...
TRIGGER_PROJECT_ID=proj_...

# AI Keys (At least one required for real AI)
GEMINI_API_KEY=AIza...
GROQ_API_KEY=gsk_...
```

### 3. Run Development Server

You need TWO terminals running:

**Terminal 1 (Next.js App):**
```bash
npm run dev
```

**Terminal 2 (Trigger.dev Worker):**
```bash
npx trigger.dev dev
```

---

## 🧠 Architecture Deep Dive (Interview Prep)

### Q: How does the Execution Engine work?
**A:** The engine (`src/lib/execution/engine.ts`) treats the specific React Flow graph as a standard directed graph.
1.  It validates the graph and detects cycles.
2.  It uses **Kahn’s Algorithm** (Topological Sort) to determine the strictly correct execution order.
3.  It iterates through this order, executing nodes sequentially (or in parallel batches in V2).
4.  Data flows via the `context.nodeResults` map, where downstream nodes look up outputs from their upstream dependencies.

### Q: Why Trigger.dev instead of simple API routes?
**A:** LLM workflows are long-running and unpredictable. Vercel/Next.js serverless functions have strict timeout limits (e.g., 10s-60s). Trigger.dev allows us to run **background jobs** with no timeouts, automatic retries, and persistent logs. It separates the heavy "compute" from the user-facing "interface".

### Q: How do you handle "Unexpected token <" JSON errors?
**A:** This usually happens when an API crashes and returns a Next.js HTML error page. I improved robustness by:
1.  Wrapping the API handler (`/api/execute`) in a global try/catch to **always** return JSON, even on 500 crashes.
2.  Making the frontend fetch logic defensive: it attempts to parse JSON, and if it fails (HTML response), it catches the error and displays a user-friendly message instead of crashing the UI.

### Q: How did you implement LLM Fallbacks?
**A:** In `engine.ts`, the `executeLLMNode` function uses a priority chain:
1.  **Gemini**: Checked first. Uses `fetch` to Google's REST API to keep dependencies low.
2.  **Groq**: Checked second. Fast Llama 3 inference.
3.  **Mock**: Checked last. If no keys are present, returns a safe mock string to ensure the demo always "works" for reviewers.

### Q: Why isn't `[object Object]` showing in the UI anymore?
**A:** Previous implementations nested the response as `{ llmResponse: { text: "..." } }`. React tries to render objects as text, which results in `[object Object]`.
**Fix**: I flattened the engine output to `{ output: "Actual String Here" }` and added strict type checks in the UI component (`typeof data.output === 'string'`) to guarantee only valid text is rendered.

## ✅ Project Status
- [x] Canvas & Node Drag-and-Drop
- [x] Cycle Detection & Validation
- [x] "Run" Button & API Integration
- [x] Background Execution Engine (Trigger.dev)
- [x] Real LLM Integration (Gemini + Groq)
- [x] Robust Error Handling & Fallbacks
- [x] Debug Node Inspector

---
*Built for the Fullstack Engineer Assignment.*
