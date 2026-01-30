# 🧪 Testing & Quality Strategy

## Current State: ZERO TEST COVERAGE ❌

This is a critical blocker for production. Must implement before launch.

---

## Testing Strategy Overview

```
Unit Tests (70%)
├── Utilities & Helpers
├── Validators
├── Execution Engine
└── Store Logic

Integration Tests (20%)
├── API Routes
├── Database Operations
├── Trigger.dev Integration
└── Workflow Execution

E2E Tests (10%)
├── User Workflows
├── Authentication Flow
└── Error Scenarios
```

---

## Setup (Day 1)

### Install Testing Dependencies

```bash
npm install --save-dev \
  vitest \
  @vitest/ui \
  @testing-library/react \
  @testing-library/user-event \
  @testing-library/jest-dom \
  jsdom \
  @types/vitest \
  vi
```

### Create `vitest.config.ts`

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['**/*.{test,spec}.{ts,tsx}'],
    exclude: ['node_modules', '.next'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        'src/**/*.d.ts',
        'src/**/*.stories.tsx',
        'src/app/**',
      ],
      lines: 70,
      functions: 70,
      branches: 60,
      statements: 70,
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

### Create `vitest.setup.ts`

```typescript
import '@testing-library/jest-dom';
import { expect, afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
});

// Mock Next.js router
vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
  }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}));

// Mock Clerk
vi.mock('@clerk/nextjs/server', () => ({
  auth: vi.fn(() => ({ userId: 'test-user-123' })),
  currentUser: vi.fn(() => ({ id: 'test-user-123', firstName: 'Test' })),
  clerkMiddleware: vi.fn(),
  createRouteMatcher: vi.fn(),
}));
```

### Update `package.json`

```json
{
  "scripts": {
    "test": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest --coverage",
    "test:watch": "vitest --watch"
  }
}
```

---

## Priority 1: Unit Tests for Execution Engine

Create `src/lib/execution/engine.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { getExecutionOrder } from './engine';
import { Node, Edge } from '@xyflow/react';

describe('getExecutionOrder - Topological Sort', () => {
  it('should return nodes in correct dependency order', () => {
    const nodes: Node[] = [
      { id: '1', data: {}, position: { x: 0, y: 0 } },
      { id: '2', data: {}, position: { x: 100, y: 0 } },
      { id: '3', data: {}, position: { x: 200, y: 0 } },
    ];

    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ];

    const order = getExecutionOrder(nodes, edges);
    expect(order).toEqual(['1', '2', '3']);
  });

  it('should handle independent nodes', () => {
    const nodes: Node[] = [
      { id: '1', data: {}, position: { x: 0, y: 0 } },
      { id: '2', data: {}, position: { x: 100, y: 0 } },
    ];

    const edges: Edge[] = [];

    const order = getExecutionOrder(nodes, edges);
    expect(order).toHaveLength(2);
    expect(order).toContain('1');
    expect(order).toContain('2');
  });

  it('should throw error on cycle detection', () => {
    const nodes: Node[] = [
      { id: '1', data: {}, position: { x: 0, y: 0 } },
      { id: '2', data: {}, position: { x: 100, y: 0 } },
    ];

    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-1', source: '2', target: '1' }, // Cycle!
    ];

    expect(() => getExecutionOrder(nodes, edges)).toThrow('Cycle detected');
  });

  it('should handle complex multi-path DAG', () => {
    const nodes: Node[] = [
      { id: '1', data: {}, position: { x: 0, y: 0 } },
      { id: '2', data: {}, position: { x: 100, y: 0 } },
      { id: '3', data: {}, position: { x: 100, y: 100 } },
      { id: '4', data: {}, position: { x: 200, y: 50 } },
    ];

    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e1-3', source: '1', target: '3' },
      { id: 'e2-4', source: '2', target: '4' },
      { id: 'e3-4', source: '3', target: '4' },
    ];

    const order = getExecutionOrder(nodes, edges);
    // 1 must come first
    expect(order[0]).toBe('1');
    // 4 must come last
    expect(order[order.length - 1]).toBe('4');
    // 2 and 3 must come before 4
    expect(order.indexOf('2')).toBeLessThan(order.indexOf('4'));
    expect(order.indexOf('3')).toBeLessThan(order.indexOf('4'));
  });
});
```

---

## Priority 2: Unit Tests for Validators

Create `src/lib/validation.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { validateWorkflow } from './validation';
import { Node, Edge } from '@xyflow/react';

describe('validateWorkflow', () => {
  it('should reject empty canvas', () => {
    const result = validateWorkflow([], []);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('empty');
  });

  it('should accept valid text node', () => {
    const nodes: Node[] = [
      {
        id: '1',
        type: 'text',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
      },
    ];
    const edges: Edge[] = [];

    const result = validateWorkflow(nodes, edges);
    expect(result.isValid).toBe(true);
  });

  it('should reject LLM node without prompt input', () => {
    const nodes: Node[] = [
      {
        id: '1',
        type: 'llm',
        data: { prompt: '' },
        position: { x: 0, y: 0 },
      },
    ];
    const edges: Edge[] = [];

    const result = validateWorkflow(nodes, edges);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('prompt');
  });

  it('should accept LLM node with manual prompt', () => {
    const nodes: Node[] = [
      {
        id: '1',
        type: 'llm',
        data: { prompt: 'Hello, tell me a joke' },
        position: { x: 0, y: 0 },
      },
    ];
    const edges: Edge[] = [];

    const result = validateWorkflow(nodes, edges);
    expect(result.isValid).toBe(true);
  });

  it('should accept LLM node with connected input', () => {
    const nodes: Node[] = [
      {
        id: '1',
        type: 'text',
        data: { label: 'Hello' },
        position: { x: 0, y: 0 },
      },
      {
        id: '2',
        type: 'llm',
        data: { prompt: '' },
        position: { x: 100, y: 0 },
      },
    ];
    const edges: Edge[] = [
      {
        id: 'e1-2',
        source: '1',
        target: '2',
        targetHandle: 'text-prompt',
      },
    ];

    const result = validateWorkflow(nodes, edges);
    expect(result.isValid).toBe(true);
  });

  it('should reject Vision node without image', () => {
    const nodes: Node[] = [
      {
        id: '1',
        type: 'vision',
        data: { imageUrl: '' },
        position: { x: 0, y: 0 },
      },
    ];
    const edges: Edge[] = [];

    const result = validateWorkflow(nodes, edges);
    expect(result.isValid).toBe(false);
    expect(result.error).toContain('Image');
  });
});
```

---

## Priority 3: Unit Tests for Store

Create `src/lib/store.test.ts`:

```typescript
import { describe, it, expect } from 'vitest';
import { isCyclic } from './store';
import { Node, Edge, Connection } from '@xyflow/react';

describe('isCyclic - Cycle Detection', () => {
  const createNodes = (ids: string[]): Node[] =>
    ids.map(id => ({
      id,
      data: {},
      position: { x: 0, y: 0 },
    }));

  it('should detect direct cycle', () => {
    const nodes = createNodes(['1', '2']);
    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-1', source: '2', target: '1' }, // Cycle
    ];
    const connection: Connection = { source: '2', target: '1' };

    const hasCycle = isCyclic(nodes, edges, connection);
    expect(hasCycle).toBe(true);
  });

  it('should detect indirect cycle', () => {
    const nodes = createNodes(['1', '2', '3']);
    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
      { id: 'e2-3', source: '2', target: '3' },
    ];
    const connection: Connection = { source: '3', target: '1' };

    const hasCycle = isCyclic(nodes, edges, connection);
    expect(hasCycle).toBe(true);
  });

  it('should allow valid DAG connection', () => {
    const nodes = createNodes(['1', '2', '3']);
    const edges: Edge[] = [
      { id: 'e1-2', source: '1', target: '2' },
    ];
    const connection: Connection = { source: '1', target: '3' };

    const hasCycle = isCyclic(nodes, edges, connection);
    expect(hasCycle).toBe(false);
  });
});
```

---

## Priority 4: API Route Tests

Create `src/app/api/health/__tests__/route.test.ts`:

```typescript
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET } from '../route';
import * as prismaModule from '@/lib/prisma';

vi.mock('@/lib/prisma', () => ({
  prisma: {
    $queryRaw: vi.fn(),
  },
}));

describe('GET /api/health', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return ok status when database is healthy', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$queryRaw).mockResolvedValueOnce([]);

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.status).toBe('ok');
    expect(data.checks.database).toBe('ok');
  });

  it('should return error status when database is down', async () => {
    const { prisma } = await import('@/lib/prisma');
    vi.mocked(prisma.$queryRaw).mockRejectedValueOnce(
      new Error('Connection failed')
    );

    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(503);
    expect(data.status).toBe('error');
  });
});
```

---

## Priority 5: Integration Tests

Create `src/__tests__/api.integration.test.ts`:

```typescript
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest';

// These would typically use a test database or mock Trigger.dev
// For now, showing structure

describe('API Integration Tests', () => {
  beforeAll(() => {
    // Setup test database
    // Seed test data
  });

  afterAll(() => {
    // Cleanup
  });

  describe('POST /api/execute', () => {
    it('should require authentication', async () => {
      // Test without auth token
      // Should return 401
    });

    it('should validate workflow input', async () => {
      // Test with invalid nodes/edges
      // Should return 400 with validation errors
    });

    it('should trigger workflow job', async () => {
      // Test with valid workflow
      // Should queue job and return runId
    });
  });

  describe('GET /api/workflows', () => {
    it('should return user-scoped workflows', async () => {
      // Test fetching workflows
      // Should only return workflows for authenticated user
    });
  });

  describe('Workflow Execution', () => {
    it('should execute linear workflow', async () => {
      // Test execution of Text -> LLM -> Debug
      // Verify all nodes execute in order
      // Verify results are persisted
    });

    it('should execute parallel workflow', async () => {
      // Test execution of branching workflow
      // Verify all paths execute correctly
    });

    it('should handle node failures gracefully', async () => {
      // Test workflow with failing node
      // Verify status is "partial" if some succeed
      // Verify error is captured
    });
  });
});
```

---

## Priority 6: E2E Tests (Using Playwright)

```bash
npm install --save-dev @playwright/test
npx playwright install
```

Create `e2e/auth.spec.ts`:

```typescript
import { test, expect } from '@playwright/test';

test.describe('Authentication Flow', () => {
  test('should redirect unauthenticated user to sign-in', async ({ page }) => {
    await page.goto('/dashboard');
    await expect(page).toHaveURL(/sign-in/);
  });

  test('should allow user to sign in and access dashboard', async ({ page }) => {
    // This would need Clerk test account setup
    await page.goto('/sign-in');
    // Fill in credentials...
    // Navigate to dashboard
    // Verify canvas is loaded
  });
});
```

---

## Quality Metrics Target

```
Metric                  | Target | Current
-----------------------|--------|----------
Unit Test Coverage      | 70%    | 0%
Integration Tests       | 15     | 0
E2E Test Scenarios      | 10     | 0
Type Safety             | 100%   | ~85%
Lint Errors             | 0      | 0 ✓
Circular Dependencies   | 0      | 0 ✓
Bundle Size             | <500KB | ?
Performance (FCP)       | <2s    | ?
Accessibility Score     | >90    | ?
```

---

## CI/CD Pipeline with Tests

Create `.github/workflows/test.yml`:

```yaml
name: Test & Quality

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main, develop]

jobs:
  test:
    runs-on: ubuntu-latest
    
    services:
      postgres:
        image: postgres:16
        env:
          POSTGRES_PASSWORD: postgres
        options: >-
          --health-cmd pg_isready
          --health-interval 10s
          --health-timeout 5s
          --health-retries 5

    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      
      - run: npm run lint
        continue-on-error: true
      
      - run: npm run test -- --coverage
      
      - name: Upload coverage
        uses: codecov/codecov-action@v3
        with:
          files: ./coverage/coverage-final.json
      
      - run: npm run build
      
  e2e:
    runs-on: ubuntu-latest
    needs: test
    
    steps:
      - uses: actions/checkout@v4
      
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      
      - run: npm ci
      
      - run: npx playwright install --with-deps
      
      - run: npm run build
      
      - run: npm run test:e2e
      
      - uses: actions/upload-artifact@v3
        if: always()
        with:
          name: playwright-report
          path: playwright-report/
```

---

## Testing Best Practices

1. **Test Name Convention**
   ```
   ✅ Good: "should execute nodes in topological order"
   ❌ Bad: "test1", "works"
   ```

2. **Arrange-Act-Assert Pattern**
   ```typescript
   it('should validate workflow', () => {
     // ARRANGE
     const nodes = createNodes(['1', '2']);
     const edges = createEdges(['1->2']);
     
     // ACT
     const result = validateWorkflow(nodes, edges);
     
     // ASSERT
     expect(result.isValid).toBe(true);
   });
   ```

3. **Mock External Dependencies**
   ```typescript
   vi.mock('@/lib/prisma');
   const mockPrisma = vi.mocked(prisma);
   ```

4. **Test Error Cases**
   ```typescript
   it('should throw on invalid input', () => {
     expect(() => parse(null)).toThrow();
   });
   ```

5. **Use Snapshots for Complex Objects**
   ```typescript
   expect(result).toMatchSnapshot();
   ```

---

## Success Criteria

- [ ] 70%+ line coverage
- [ ] All API routes have tests
- [ ] All validators have tests
- [ ] Engine execution tested (happy + error paths)
- [ ] CI/CD pipeline runs all tests
- [ ] Coverage report in PR comments
- [ ] Tests pass before merge to main

