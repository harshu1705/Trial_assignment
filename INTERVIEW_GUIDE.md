# 🧠 Engineering Deep Dive (Interview Guide)

This document explains the **internal logic** and **architectural decisions** made in this project. Use this to explain "Why?" during technical interviews.

## 1. Authentication Architecture (Clerk + Next.js 16)

### ❓ The Challenge: "Context Propagation"
**Problem:** Initially, the app crashed on `/sign-in` with `Error: useSession can only be used within <ClerkProvider>`.
**Why?** We had `ClerkProvider` only in `(public)/layout.tsx` and `dashboard/layout.tsx`. The `(auth)` group (containing Sign In) had **no provider** wrapping it.
**Solution:**
We moved `<ClerkProvider>` to **`src/app/layout.tsx` (Root Layout)**.
*   **Logic:** The Root Layout wraps *everything*. By placing the provider here, we push the "Auth Context" to the very top of the React Component Tree.
*   **Result:** Every component, whether server-side (for token verification) or client-side (hooks like `useUser`), has access to auth data.

### 🛡️ Middleware Strategy (`src/middleware.ts`)
**Logic:** We use a "deny-by-default" approach with specific exceptions.
```typescript
const isPublicRoute = createRouteMatcher(['/', '/sign-in(.*)', '/sign-up(.*)'])
```
*   **Internal Logic:** The middleware runs **before** a request hits your page code.
*   **Flow:**
    1.  Request comes in.
    2.  Check: `!isPublicRoute(request)`?
    3.  If yes (e.g., `/dashboard`), call `auth.protect()`.
    4.  If not authenticated, Clerk halts the request *at the edge* and redirects.
*   **Why `src/`?** In Next.js with a `src` directory, middleware **must** reside in `src/`. If it's in the root, Next.js ignores it. This was a critical fix we implemented.

---

## 2. React Flow Integration (Canvas Logic)

### 🎨 Client vs. Server Components
**Decision:** `Canvas.tsx` is marked with `"use client"`.
**Internal Logic:**
*   React Flow interacts with the DOM directly (dragging, zooming, event listeners).
*   Server Components (default in Next 16) cannot attach Window event listeners or manage `useState`.
*   **Optimization:** We keep `dashboard/page.tsx` as a **Server Component**. It fetches the user (server-side) and passes data *down* to the Client `Canvas`. This is the "Pattern of Least Client-Side Javascript".

### 🪢 State Management (`useNodesState`, `useEdgesState`)
**Logic:** We don't just use `useState`.
```typescript
const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
```
*   **Why?** `onNodesChange` isn't just a setter. It handles the **internal physics** of the graph:
    *   Dragging (delta updates).
    *   Selection.
    *   Deletion.
*   **Interview Tip:** "I used `useNodesState` instead of raw `useState` because React Flow requires a specialized reducer to handle simultaneous graph updates like multi-node dragging efficiently."

---

## 3. Project Structure (Route Groups)
**Structure:** `(auth)`, `(public)`, `dashboard`.
**Internal Logic:**
*   **Route Groups `(...)`**: These folders do **not** affect the URL path.
    *   `src/app/(public)/layout.tsx`: Generic layout for landing page.
    *   `src/app/(auth)/layout.tsx`: Specialized Centered Flexbox layout specifically for Login forms.
    *   `src/app/dashboard/layout.tsx`: Sidebar + Shell layout.
*   **Benefit:** We can have completely different visual shells (Sidebar vs. No Sidebar) without complex conditional logic inside a single layout file.

## 4. CSS & Styling (Tailwind)
**Logic:** `h-full` propagation.
*   **Details:** For limits like "Canvas takes remaining height" to work, **every parent** up the tree (`html`, `body`, `main`, `div`) must have explicit height (usually `100%` or `h-full`).
*   **Fix:** You'll see `className="h-full"` added recursively in `layout.tsx` to ensure the Canvas can actually expand to fill the screen.

## 5. Session Persistence (Why don't I login every time?)

### 🍪 The "Session Cookie" (`__session`)
**Question:** "Why does the app remember me?"
**Internal Logic:**
*   When you sign in, Clerk issues a **JWT (JSON Web Token)**.
*   this token is stored in a **Secure, HttpOnly Cookie** named `__session`.
*   **HttpOnly:** This means JavaScript (client-side) *cannot* read this cookie, preventing XSS attacks from stealing your session.

### 🔄 The "Handshake"
1.  **Request:** Browser sends request to `/dashboard` + sends the `__session` cookie automatically.
2.  **Middleware:** `clerkMiddleware()` intercepts the request.
3.  **Verification:** Clerk reads the cookie, verifies the digital signature of the JWT using your `CLERK_SECRET_KEY` (server-side).
    *   **Valid?** `auth()` returns the userId.
    *   **Invalid/Expired?** Redirect to `/sign-in`.
4.  **Re-Auth:** The token has an expiration (e.g., 7 days). As long as it's valid, Clerk considers you "SignedIn".
