# Assignment Fullstack - AI Workflow Editor

A robust, production-ready AI Workflow Editor built with **Next.js 16**, **React Flow**, and **Trigger.dev**. This application allows users to visually construct and execute generative AI workflows consisting of text inputs, LLM processing (Gemini), and debugging tools.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Status](https://img.shields.io/badge/status-Active-success.svg)

## 🚀 Key Features

### 🎨 Infinite Canvas (Frontend)
*   **Drag-and-Drop Interface**: Built on `@xyflow/react` (React Flow), allowing intuitive node placement and connection.
*   **Custom Nodes**:
    *   **Text Node**: User input source.
    *   **LLM Node**: Integration with Google Gemini for AI generation.
    *   **Debug Node**: Inspect data flow at any point.
*   **Real-time Feedback**: Visual indicators for node status (Idle, Queued, Running, Success, Error).

### ⚡ Execution Engine (Backend)
*   **Asynchronous Background Jobs**: Powered by **Trigger.dev** to handle long-running AI tasks without browser timeouts.
*   **Google Gemini Integration**: Secure, server-side execution of prompts using `gemini-1.5-flash`.
*   **Topological Execution**: Guaranteed order of operations (Inputs -> Processing -> Outputs).

### 🔐 Security & Architecture
*   **Clerk Authentication**: production-grade user management and route protection.
*   **Type Safety**: Full TypeScript implementation across frontend and backend.
*   **Clean API**: `src/app/api/execute` endpoint decoupling UI from execution logic.

## 🛠️ Tech Stack

| Category | Technology | Reason |
| :--- | :--- | :--- |
| **Framework** | **Next.js 16 (App Router)** | Server Components, SEO, and robust API handling. |
| **Language** | **TypeScript** | Strict type safety and maintainability. |
| **Auth** | **Clerk** | Secure, drop-in authentication solution. |
| **UI Library** | **React Flow** | Best-in-class library for node-based interfaces. |
| **Styling** | **Tailwind CSS 4** | Rapid UI development with utility classes. |
| **Background Jobs** | **Trigger.dev (v3)** | Reliable serverless task execution for AI flows. |
| **AI Model** | **Google Gemini** | Fast, efficient LLM for text generation. |

## 🏃‍♂️ Getting Started

### 1. Prerequisites
*   Node.js 18+
*   npm or yarn
*   A Clerk account
*   A Trigger.dev account
*   A Google Cloud Project (for Gemini API)

### 2. Installation

```bash
# Clone the repository
git clone <repository_url>

# Install dependencies
npm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...

# Trigger.dev
TRIGGER_SECRET_KEY=tr_dev_...
TRIGGER_API_KEY=tr_dev_...
TRIGGER_PROJECT_ID=proj_...

# Google Gemini
GEMINI_API_KEY=AIza...
```

### 4. Running the App

You need to run both the Next.js dev server and the Trigger.dev dev worker.

**Terminal 1 (Next.js):**
```bash
npm run dev
```

**Terminal 2 (Trigger.dev):**
```bash
npx trigger.dev@latest dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

## 📂 Project Structure

```
src/
├── app/
│   ├── (auth)/          # Clerk Sign-in/Sign-up routes
│   ├── (public)/        # Landing page
│   ├── api/             # Next.js API Routes (Execution endpoints)
│   └── dashboard/       # Main Editor UI (Protected)
├── components/
│   ├── nodes/           # Custom React Flow Nodes (Text, LLM, Debug)
│   ├── Canvas.tsx       # Main Editor Component
│   └── Sidebar.tsx      # Node Palette
├── lib/
│   ├── execution/       # Node Execution Logic & Engine
│   └── utils.ts         # shared utilities
├── trigger/             # Trigger.dev Task Definitions
└── middleware.ts        # Auth protection rules
```

## 🧪 Interview Prep

This repository includes a detailed `INTERVIEW_GUIDE.md` covering architectural decisions and potential interview questions. This file is git-ignored by default to keep the repo clean, but you can find it generated in the root during development.
