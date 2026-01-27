# 🎙️ Interview Guide: AI Workflow Assistant

This guide covers the key architectural decisions, challenges, and technical implementation details of the project. Use this to prepare for your interview.

---

## 🏗️ Architecture & High-Level Design

### **Q: Can you explain the overall architecture of the application?**
**A:**
The application is a full-stack AI workflow editor built with **Next.js 16**. It separates concerns into three distinct layers:
1.  **Frontend (Canvas UI)**: Built with **React Flow (@xyflow/react)**, it provides an interactive drag-and-drop interface for users to construct DAGs (Directed Acyclic Graphs).
2.  **API Layer (Next.js App Router)**: Acts as the bridge between the UI and the execution engine. It handles authentication (Clerk) and request validation before triggering background tasks.
3.  **Execution Engine (Trigger.dev)**: A distributed background job system that executes the workflow logic asynchronously. This prevents timeouts on long-running AI tasks.

### **Q: Why did you choose Trigger.dev over simple API routes?**
**A:**
AI workflows are inherently long-running and unpredictable. A standard Vercel/Next.js API route has a hard execution timeout (usually 10-60s).
**Trigger.dev** allows us to:
*   Offload execution to a background worker.
*   Handle retries automatically if an API (like Gemini) fails.
*   Avoid blocking the main thread or UI.
*   Persist execution logs and status natively.

---

## 💻 Tech Stack Deep Dive

### **Q: Why Next.js 16?**
**A:**
*   **Server Components (`use client` vs default)**: Allows us to keep the initial page load fast and SEO-friendly, while only hydrating the interactive Canvas on the client.
*   **App Router**: Provides intuitive file-based routing and API handling in the same codebase.
*   **Turbopack**: Significantly faster local development cycle.

### **Q: How are you handling state in the Canvas?**
**A:**
We use React Flow’s internal state hooks (`useNodesState`, `useEdgesState`) for position and topology.
For execution state (Queued/Running/Completed), we used a "Fire-and-Forget" + Polling architecture:
1.  **Optimistic UI**: When "Run" is clicked, we immediately show "Queued".
2.  **Polling**: The client polls `/api/execute/[runId]` to fetch the latest state from Trigger.dev.
3.  **Sync**: Once completed, we merge the execution results back into the `node.data` to visualize outputs.

### **Q: How is the integration with the LLM (Gemini) handled?**
**A:**
We use the **Google Generative AI SDK**.
*   **Secure**: The API Key is kept server-side (in Trigger.dev tasks), never exposed to the client.
*   **Abstraction**: We created an `LLMNodeExecutor` class that encapsulates the logic.
*   **Data Flow**: The node expects a `prompt` input from an upstream node (Text Node), reinforcing the data-flow concept of the editor.

---

## 🔧 Key Challenges & Solutions

### **Challenge 1: Handling Asynchronous Execution**
**Problem**: The UI needs to know when a background job finishes.
**Solution**: Implemented a **Polling Mechanism**.
*   Frontend triggers execution -> gets `runId`.
*   Frontend polls status endpoint every 1s.
*   Status maps from Trigger.dev events (`QUEUED`, `EXECUTING`, `COMPLETED`) to UI states.

### **Challenge 2: Data Flow Between Nodes**
**Problem**: How does the LLM node get text from the Text node?
**Solution**: Topologically Sorted Execution.
*   The backend calculates the dependency graph.
*   It executes nodes in order (Inputs first).
*   Outputs from Node A are passed as Inputs to Node B.

### **Challenge 3: Type Safety**
**Problem**: Ensuring nodes have the correct data structure.
**Solution**: TypeScript Interfaces.
*   Defined explicit contracts for `NodeData`, `ExecutionContext`, and `ExecutableNode`.
*   Prop types in React components prevent invalid data being passed to handles.

---

## 🔮 Future Improvements

### **Q: What would you add next?**
**A:**
1.  **Persistence**: Save workflows to a database (PostgreSQL/Prisma) so users can return to them.
2.  **Real-time Logic**: Switch from polling to **Websockets** (or Server-Sent Events) for instant feedback.
3.  **More Nodes**: Add Image Generation (Replicate/DALL-E) or API Request nodes.
4.  **Collaboration**: Use Y.js or similar libraries to allow multiple users to edit the same canvas simultaneously.
