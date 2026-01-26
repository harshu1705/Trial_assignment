# Assignment Fullstack - AI Workflow Editor

A Next.js 16 application featuring secure authentication and an infinite canvas for AI workflows.

## 🚀 Features

*   **Next.js 16 (App Router)**: Modern React architecture with Server Components.
*   **Clerk Authentication**: Robust, secure Sign-In/Sign-Up flows.
    *   Protected Dashboard routes.
    *   Public Landing page.
*   **React Flow Canvas**:
    *   Interactive Drag-and-Drop nodes.
    *   Infinite panning and zooming.
    *   Custom controls and background.
*   **Tailwind CSS 4**: High-performance, utility-first styling.

## 🛠️ Tech Stack

*   **Framework**: Next.js 16
*   **Language**: TypeScript
*   **Auth**: Clerk
*   **UI Library**: React Flow (`@xyflow/react`)
*   **Icons**: Lucide React

## 🏃‍♂️ Getting Started

1.  **Install Dependencies**
    ```bash
    npm install
    ```

2.  **Environment Setup**
    Ensure `.env.local` is populated with your Clerk keys:
    ```env
    NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
    CLERK_SECRET_KEY=sk_test_...
    ```

3.  **Run Development Server**
    ```bash
    npm run dev
    ```
    Open [http://localhost:3000](http://localhost:3000).

## 📂 Project Structure

*   `src/app/(public)`: Public routes (Landing page).
*   `src/app/(auth)`: Authentication routes (Sign In/Up).
*   `src/app/dashboard`: Protected application area.
*   `src/components`: Reusable UI components (Canvas, Sidebar).
*   `src/middleware.ts`: Edge-layer route protection.

## 🧪 Verification

*   **Auth**: Try accessing `/dashboard` without logging in -> Redirects to Sign In.
*   **Canvas**: Log in -> Dashboard. Try dragging the nodes on the canvas.
