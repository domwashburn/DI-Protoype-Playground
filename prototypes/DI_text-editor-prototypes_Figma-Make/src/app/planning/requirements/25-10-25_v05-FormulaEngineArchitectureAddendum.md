# v05 - Formula Engine Architecture Addendum: Performance & Production Readiness

**Date:** October 25, 2025  
**Type:** Architectural Enhancement  
**Status:** Planning Phase - Extends v04  
**Related:** [v04 - Formula Engine Architecture Plan](./25-10-25_v04-FormulaEngineArchitecturePlan.md)

---

## Executive Summary

This addendum addresses critical gaps in the original architecture plan (v04), focusing on:
1. **Browser performance optimization** - Async execution, Web Workers, progressive loading
2. **Server-side compatibility** - Environment abstraction, serialization, multi-tenancy
3. **Edge case handling** - Comprehensive error scenarios and data validation
4. **Production readiness** - Caching, observability, resource management

---

## Table of Contents

1. [Browser Performance Strategy](#browser-performance-strategy)
2. [Server-Side Compatibility](#server-side-compatibility)
3. [Edge Cases & Error Handling](#edge-cases--error-handling)
4. [Caching & Optimization](#caching--optimization)
5. [API Design Enhancements](#api-design-enhancements)
6. [Resource Management](#resource-management)
7. [Serialization Strategy](#serialization-strategy)
8. [Observability & Telemetry](#observability--telemetry)
9. [Updated Implementation Phases](#updated-implementation-phases)

---

## Browser Performance Strategy

### Problem: Synchronous Parsing Can Block UI

**Issue:** Large formulas or many evaluations can freeze the browser's main thread.

**Solution: Hybrid Sync/Async API**

```typescript
// /services/evaluationEngine/EvaluationEngine.ts

export class EvaluationEngine {
  /**
   * Synchronous compile (for small formulas, immediate feedback)
   * Use when: Real-time validation, simple formulas
   */
  compile(source: string, language: 'formula' | 'bal' = 'formula'): CompileResult;
  
  /**
   * Asynchronous compile (for large formulas, batch processing)
   * Use when: Large formulas, background compilation, batch jobs
   * Returns: Promise that resolves with CompileResult
   */
  compileAsync(
    source: string, 
    language: 'formula' | 'bal' = 'formula',
    options?: CompileOptions
  ): Promise<CompileResult>;
  
  /**
   * Evaluate with cancellation support
   * Use when: Long-running evaluations that might need to be cancelled
   */
  evaluateAsync(
    source: string,
    context: Partial<ExecutionContext>,
    options?: EvaluationOptions
  ): Promise<EvaluationResult>;
}

export interface CompileOptions {
  /** Abort signal for cancellation */
  signal?: AbortSignal;
  /** Progress callback for large compilations */
  onProgress?: (progress: number) => void;
  /** Enable aggressive optimizations (slower compile, faster eval) */
  optimize?: boolean;
}

export interface EvaluationOptions {
  /** Abort signal for cancellation */
  signal?: AbortSignal;
  /** Enable execution trace */
  trace?: boolean;
  /** Timeout in milliseconds */
  timeout?: number;
  /** Batch evaluation mode (multiple inputs) */
  batch?: boolean;
}
```

**Usage Example - Async with Cancellation:**

```typescript
// In FormulaTestPanel.tsx

const handleEvaluate = async () => {
  const controller = new AbortController();
  
  // Store controller for cleanup
  setAbortController(controller);
  
  try {
    setEvaluating(true);
    
    const engine = new EvaluationEngine();
    
    // Compile asynchronously
    const compiled = await engine.compileAsync(formula, 'formula', {
      signal: controller.signal,
      optimize: true
    });
    
    if (!compiled.success) {
      setErrors(compiled.errors);
      return;
    }
    
    // Evaluate asynchronously
    const result = await compiled.program!.evaluateAsync(context, {
      signal: controller.signal,
      trace: true,
      timeout: 5000
    });
    
    setResult(result);
  } catch (err) {
    if (err.name === 'AbortError') {
      // User cancelled
      setStatus('Evaluation cancelled');
    } else {
      setErrors([err]);
    }
  } finally {
    setEvaluating(false);
  }
};

// Cleanup on unmount or cancel
const handleCancel = () => {
  abortController?.abort();
};
```

### Web Worker Support for Heavy Computation

**Use Case:** Batch evaluation of formulas across thousands of rows.

**Architecture:**

```
┌─────────────────────────────────────────────┐
│           Main Thread (UI)                   │
├─────────────────────────────────────────────┤
│  - User interaction                          │
│  - Real-time validation (sync API)           │
│  - Display results                           │
│                                               │
│         ↕ postMessage                        │
│                                               │
├─────────────────────────────────────────────┤
│         Web Worker Thread                    │
├─────────────────────────────────────────────┤
│  - Heavy parsing                             │
│  - Batch evaluation                          │
│  - Optimization passes                       │
│  - Returns serialized results                │
└─────────────────────────────────────────────┘
```

**Implementation:**

```typescript
// /services/evaluationEngine/worker/EvaluationWorker.ts

export class EvaluationWorker {
  private worker: Worker | null = null;
  
  /**
   * Initialize worker (lazy loading)
   */
  private async initWorker() {
    if (!this.worker) {
      // Dynamically import worker
      this.worker = new Worker(
        new URL('./worker/evaluation.worker.ts', import.meta.url),
        { type: 'module' }
      );
    }
    return this.worker;
  }
  
  /**
   * Compile in worker thread
   */
  async compileInWorker(
    source: string,
    language: 'formula' | 'bal'
  ): Promise<SerializedProgram> {
    const worker = await this.initWorker();
    
    return new Promise((resolve, reject) => {
      const messageId = crypto.randomUUID();
      
      const handleMessage = (e: MessageEvent) => {
        if (e.data.id === messageId) {
          worker.removeEventListener('message', handleMessage);
          
          if (e.data.error) {
            reject(e.data.error);
          } else {
            resolve(e.data.result);
          }
        }
      };
      
      worker.addEventListener('message', handleMessage);
      
      worker.postMessage({
        id: messageId,
        type: 'compile',
        source,
        language
      });
    });
  }
  
  /**
   * Batch evaluate in worker
   */
  async evaluateBatch(
    program: SerializedProgram,
    contexts: Partial<ExecutionContext>[],
    onProgress?: (completed: number, total: number) => void
  ): Promise<EvaluationResult[]> {
    const worker = await this.initWorker();
    
    return new Promise((resolve, reject) => {
      const messageId = crypto.randomUUID();
      
      const handleMessage = (e: MessageEvent) => {
        if (e.data.id === messageId) {
          if (e.data.type === 'progress' && onProgress) {
            onProgress(e.data.completed, e.data.total);
          } else if (e.data.type === 'complete') {
            worker.removeEventListener('message', handleMessage);
            resolve(e.data.results);
          } else if (e.data.type === 'error') {
            worker.removeEventListener('message', handleMessage);
            reject(e.data.error);
          }
        }
      };
      
      worker.addEventListener('message', handleMessage);
      
      worker.postMessage({
        id: messageId,
        type: 'evaluateBatch',
        program,
        contexts
      });
    });
  }
  
  /**
   * Terminate worker
   */
  terminate() {
    this.worker?.terminate();
    this.worker = null;
  }
}
```

**Worker Implementation:**

```typescript
// /services/evaluationEngine/worker/evaluation.worker.ts

import { EvaluationEngine } from '../EvaluationEngine';
import { deserializeProgram, serializeProgram } from '../serialization';

self.addEventListener('message', async (e: MessageEvent) => {
  const { id, type, source, language, program, contexts } = e.data;
  
  try {
    if (type === 'compile') {
      const engine = new EvaluationEngine();
      const result = engine.compile(source, language);
      
      if (result.success) {
        const serialized = serializeProgram(result.program!);
        self.postMessage({ id, result: serialized });
      } else {
        self.postMessage({ id, error: result.errors });
      }
    } else if (type === 'evaluateBatch') {
      const deserialized = deserializeProgram(program);
      const results: EvaluationResult[] = [];
      
      for (let i = 0; i < contexts.length; i++) {
        const result = deserialized.evaluate(contexts[i]);
        results.push(result);
        
        // Send progress updates every 10 evaluations
        if (i % 10 === 0) {
          self.postMessage({
            id,
            type: 'progress',
            completed: i + 1,
            total: contexts.length
          });
        }
      }
      
      self.postMessage({ id, type: 'complete', results });
    }
  } catch (error) {
    self.postMessage({ id, type: 'error', error });
  }
});
```

### Progressive Loading & Code Splitting

**Strategy:** Don't load the entire evaluation engine upfront.

```typescript
// /services/evaluationEngine/index.ts

/**
 * Lazy load evaluation engine
 * Only loads when first used
 */
export async function loadEvaluationEngine(): Promise<typeof import('./EvaluationEngine')> {
  return await import('./EvaluationEngine');
}

/**
 * Lazy load specific parsers
 */
export async function loadFormulaParser(): Promise<typeof import('./parsers/FormulaParser')> {
  return await import('./parsers/FormulaParser');
}

export async function loadBALParser(): Promise<typeof import('./parsers/BALParser')> {
  return await import('./parsers/BALParser');
}
```

**Usage:**

```typescript
// In component
const [engine, setEngine] = useState<EvaluationEngine | null>(null);

useEffect(() => {
  // Load engine only when needed
  loadEvaluationEngine().then(({ EvaluationEngine }) => {
    setEngine(new EvaluationEngine());
  });
}, []);
```

### Batching & Streaming Results

**For evaluating formulas against large datasets:**

```typescript
export class CompiledProgram {
  /**
   * Stream evaluation results
   * Yields results one at a time to prevent memory buildup
   */
  async *evaluateStream(
    contexts: Iterable<Partial<ExecutionContext>> | AsyncIterable<Partial<ExecutionContext>>,
    options?: EvaluationOptions
  ): AsyncGenerator<EvaluationResult> {
    for await (const context of contexts) {
      // Check for cancellation
      if (options?.signal?.aborted) {
        throw new DOMException('Evaluation aborted', 'AbortError');
      }
      
      yield this.evaluate(context);
      
      // Yield to event loop every 10 evaluations
      if (Math.random() < 0.1) {
        await new Promise(resolve => setTimeout(resolve, 0));
      }
    }
  }
  
  /**
   * Batch evaluation with progress
   */
  async evaluateBatch(
    contexts: Partial<ExecutionContext>[],
    options?: {
      batchSize?: number;
      onProgress?: (completed: number, total: number) => void;
      signal?: AbortSignal;
    }
  ): Promise<EvaluationResult[]> {
    const batchSize = options?.batchSize || 100;
    const results: EvaluationResult[] = [];
    
    for (let i = 0; i < contexts.length; i += batchSize) {
      // Check cancellation
      if (options?.signal?.aborted) {
        throw new DOMException('Evaluation aborted', 'AbortError');
      }
      
      const batch = contexts.slice(i, i + batchSize);
      const batchResults = batch.map(ctx => this.evaluate(ctx));
      results.push(...batchResults);
      
      // Report progress
      options?.onProgress?.(Math.min(i + batchSize, contexts.length), contexts.length);
      
      // Yield to event loop between batches
      await new Promise(resolve => setTimeout(resolve, 0));
    }
    
    return results;
  }
}
```

---

## Server-Side Compatibility

### Environment Abstraction

**Problem:** Browser APIs (requestAnimationFrame, AbortSignal, Worker) don't exist in Node.js.

**Solution: Platform Adapter Pattern**

```typescript
// /services/evaluationEngine/platform/PlatformAdapter.ts

export interface PlatformAdapter {
  /**
   * Schedule task (browser: requestAnimationFrame, Node: setImmediate)
   */
  scheduleTask(callback: () => void): void;
  
  /**
   * Create cancellation token
   */
  createCancellationToken(): CancellationToken;
  
  /**
   * High-resolution timer
   */
  now(): number;
  
  /**
   * Async execution (browser: Worker, Node: worker_threads)
   */
  createWorker?(script: string): WorkerInterface;
}

export interface CancellationToken {
  isCancelled: boolean;
  cancel(): void;
  onCancel(callback: () => void): void;
}

export interface WorkerInterface {
  postMessage(data: any): void;
  onMessage(callback: (data: any) => void): void;
  terminate(): void;
}
```

**Browser Adapter:**

```typescript
// /services/evaluationEngine/platform/BrowserAdapter.ts

export class BrowserAdapter implements PlatformAdapter {
  scheduleTask(callback: () => void): void {
    requestAnimationFrame(callback);
  }
  
  createCancellationToken(): CancellationToken {
    const controller = new AbortController();
    
    return {
      get isCancelled() {
        return controller.signal.aborted;
      },
      cancel() {
        controller.abort();
      },
      onCancel(callback) {
        controller.signal.addEventListener('abort', callback);
      }
    };
  }
  
  now(): number {
    return performance.now();
  }
  
  createWorker(script: string): WorkerInterface {
    const worker = new Worker(script, { type: 'module' });
    
    return {
      postMessage: (data) => worker.postMessage(data),
      onMessage: (callback) => worker.addEventListener('message', (e) => callback(e.data)),
      terminate: () => worker.terminate()
    };
  }
}
```

**Node.js Adapter:**

```typescript
// /services/evaluationEngine/platform/NodeAdapter.ts

import { Worker } from 'worker_threads';

export class NodeAdapter implements PlatformAdapter {
  scheduleTask(callback: () => void): void {
    setImmediate(callback);
  }
  
  createCancellationToken(): CancellationToken {
    let cancelled = false;
    const callbacks: Array<() => void> = [];
    
    return {
      get isCancelled() {
        return cancelled;
      },
      cancel() {
        cancelled = true;
        callbacks.forEach(cb => cb());
      },
      onCancel(callback) {
        callbacks.push(callback);
      }
    };
  }
  
  now(): number {
    const hrtime = process.hrtime();
    return hrtime[0] * 1000 + hrtime[1] / 1000000;
  }
  
  createWorker(script: string): WorkerInterface {
    const worker = new Worker(script);
    
    return {
      postMessage: (data) => worker.postMessage(data),
      onMessage: (callback) => worker.on('message', callback),
      terminate: () => worker.terminate()
    };
  }
}
```

**Platform Detection:**

```typescript
// /services/evaluationEngine/platform/index.ts

let adapter: PlatformAdapter;

if (typeof window !== 'undefined') {
  // Browser environment
  adapter = new BrowserAdapter();
} else if (typeof process !== 'undefined') {
  // Node.js environment
  adapter = new NodeAdapter();
} else {
  throw new Error('Unsupported platform');
}

export const platform = adapter;
```

**Usage in Engine:**

```typescript
// /services/evaluationEngine/runtime/Evaluator.ts

import { platform } from '../platform';

export class Evaluator {
  async evaluateAsync(ast: Program, context: ExecutionContext): Promise<any> {
    // Use platform adapter for timing
    const startTime = platform.now();
    
    // Yield to event loop periodically
    await new Promise(resolve => platform.scheduleTask(resolve));
    
    // Evaluation logic...
    
    const endTime = platform.now();
    return { value, evalTimeMs: endTime - startTime };
  }
}
```

### Multi-Tenancy & Isolation

**Server-Side Requirement:** Isolate execution contexts between different requests/users.

```typescript
// /services/evaluationEngine/server/TenantExecutor.ts

export class TenantExecutor {
  /**
   * Execute formula in isolated context for a specific tenant
   */
  async executeForTenant(
    tenantId: string,
    program: CompiledProgram,
    context: Partial<ExecutionContext>,
    limits?: ResourceLimits
  ): Promise<EvaluationResult> {
    // Create isolated execution context
    const isolatedContext: ExecutionContext = {
      ...context,
      // Tenant-specific limits
      limits: limits || this.getDefaultLimits(tenantId),
      // Tenant-specific function registry (if custom functions)
      functions: this.getFunctionRegistry(tenantId),
      // Tenant metadata for logging
      metadata: {
        tenantId,
        timestamp: Date.now()
      }
    };
    
    // Execute with timeout and resource limits
    return await program.evaluate(isolatedContext);
  }
  
  private getDefaultLimits(tenantId: string): ResourceLimits {
    // Could vary by tenant tier (free, paid, enterprise)
    return {
      maxIterations: 10000,
      maxCallDepth: 100,
      timeoutMs: 5000,
      maxMemoryMB: 10,
      maxArraySize: 10000
    };
  }
  
  private getFunctionRegistry(tenantId: string): FunctionRegistry {
    // Tenant-specific custom functions
    const registry = new FunctionRegistry();
    
    // Load tenant's custom functions from database
    const customFunctions = this.loadCustomFunctions(tenantId);
    customFunctions.forEach(fn => registry.register(fn.name, fn));
    
    return registry;
  }
}
```

### Express API Endpoints

**Server-side REST API design:**

```typescript
// /server/routes/formula.ts

import express from 'express';
import { EvaluationEngine } from '../services/evaluationEngine';
import { TenantExecutor } from '../services/evaluationEngine/server/TenantExecutor';

const router = express.Router();
const tenantExecutor = new TenantExecutor();

/**
 * POST /api/formula/compile
 * Compile a formula and return compiled program ID
 */
router.post('/compile', async (req, res) => {
  const { source, language } = req.body;
  const tenantId = req.user.tenantId; // From auth middleware
  
  try {
    const engine = new EvaluationEngine();
    const result = await engine.compileAsync(source, language);
    
    if (!result.success) {
      return res.status(400).json({ errors: result.errors });
    }
    
    // Serialize and cache compiled program
    const programId = await cacheCompiledProgram(
      tenantId,
      result.program!,
      { ttl: 3600 } // 1 hour cache
    );
    
    res.json({
      success: true,
      programId,
      metadata: result.program!.getMetadata()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/formula/evaluate
 * Evaluate a compiled formula
 */
router.post('/evaluate', async (req, res) => {
  const { programId, context } = req.body;
  const tenantId = req.user.tenantId;
  
  try {
    // Load cached program
    const program = await loadCompiledProgram(tenantId, programId);
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    
    // Execute with tenant limits
    const result = await tenantExecutor.executeForTenant(
      tenantId,
      program,
      context
    );
    
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/formula/evaluate-batch
 * Batch evaluate formula against multiple contexts
 */
router.post('/evaluate-batch', async (req, res) => {
  const { programId, contexts, streamResults } = req.body;
  const tenantId = req.user.tenantId;
  
  try {
    const program = await loadCompiledProgram(tenantId, programId);
    
    if (!program) {
      return res.status(404).json({ error: 'Program not found' });
    }
    
    if (streamResults) {
      // Stream results using Server-Sent Events
      res.setHeader('Content-Type', 'text/event-stream');
      res.setHeader('Cache-Control', 'no-cache');
      res.setHeader('Connection', 'keep-alive');
      
      let completed = 0;
      for await (const result of program.evaluateStream(contexts)) {
        res.write(`data: ${JSON.stringify({ result, progress: ++completed })}\n\n`);
      }
      
      res.write('data: [DONE]\n\n');
      res.end();
    } else {
      // Return all results at once
      const results = await program.evaluateBatch(contexts, {
        batchSize: 100,
        onProgress: (completed, total) => {
          // Could publish to WebSocket or Redis for real-time progress
        }
      });
      
      res.json({ results });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
```

---

## Edge Cases & Error Handling

### Comprehensive Edge Case Coverage

**1. Circular References**

```typescript
// /services/evaluationEngine/analysis/CircularReferenceDetector.ts

export class CircularReferenceDetector {
  /**
   * Detect circular variable references
   * Example: $a = $b + 1; $b = $a + 1
   */
  detectCircularReferences(ast: Program): CircularReferenceError[] {
    const errors: CircularReferenceError[] = [];
    const graph = this.buildDependencyGraph(ast);
    
    // Perform cycle detection using DFS
    const visited = new Set<string>();
    const recursionStack = new Set<string>();
    
    for (const variable of graph.keys()) {
      if (!visited.has(variable)) {
        const cycle = this.detectCycle(variable, graph, visited, recursionStack, []);
        if (cycle.length > 0) {
          errors.push({
            type: 'CircularReference',
            variables: cycle,
            message: `Circular reference detected: ${cycle.join(' → ')}`
          });
        }
      }
    }
    
    return errors;
  }
  
  private buildDependencyGraph(ast: Program): Map<string, Set<string>> {
    const graph = new Map<string, Set<string>>();
    
    // Walk AST and build variable dependency graph
    // $a = $b + $c creates edges: a → b, a → c
    
    return graph;
  }
  
  private detectCycle(
    node: string,
    graph: Map<string, Set<string>>,
    visited: Set<string>,
    stack: Set<string>,
    path: string[]
  ): string[] {
    visited.add(node);
    stack.add(node);
    path.push(node);
    
    const neighbors = graph.get(node) || new Set();
    
    for (const neighbor of neighbors) {
      if (!visited.has(neighbor)) {
        const cycle = this.detectCycle(neighbor, graph, visited, stack, [...path]);
        if (cycle.length > 0) return cycle;
      } else if (stack.has(neighbor)) {
        // Found cycle
        const cycleStart = path.indexOf(neighbor);
        return path.slice(cycleStart);
      }
    }
    
    stack.delete(node);
    return [];
  }
}
```

**2. Null/Undefined Handling**

```typescript
// /services/evaluationEngine/runtime/NullSafeEvaluator.ts

export class NullSafeEvaluator {
  /**
   * Evaluate binary operation with null safety
   */
  evaluateBinaryOp(operator: string, left: any, right: any): any {
    // Handle null/undefined propagation
    if (left === null || left === undefined) {
      throw new RuntimeError(
        `Left operand is ${left === null ? 'null' : 'undefined'}`,
        { operator, left, right }
      );
    }
    
    if (right === null || right === undefined) {
      throw new RuntimeError(
        `Right operand is ${right === null ? 'null' : 'undefined'}`,
        { operator, left, right }
      );
    }
    
    // Proceed with operation
    switch (operator) {
      case '+':
        return this.safeAdd(left, right);
      case '-':
        return this.safeSubtract(left, right);
      // ...
    }
  }
  
  /**
   * Safe addition with type checking
   */
  private safeAdd(left: any, right: any): any {
    const leftType = typeof left;
    const rightType = typeof right;
    
    // String concatenation
    if (leftType === 'string' || rightType === 'string') {
      return String(left) + String(right);
    }
    
    // Numeric addition
    if (leftType === 'number' && rightType === 'number') {
      const result = left + right;
      
      // Check for overflow
      if (!Number.isFinite(result)) {
        throw new RuntimeError(
          `Arithmetic overflow: ${left} + ${right} = ${result}`,
          { left, right, result }
        );
      }
      
      return result;
    }
    
    // Type mismatch
    throw new TypeError(
      `Cannot add ${leftType} and ${rightType}`,
      leftType as any,
      rightType as any,
      { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } }
    );
  }
}
```

**3. Division by Zero**

```typescript
/**
 * Handle division by zero based on configuration
 */
private safeDivide(left: number, right: number, config: EvalConfig): number {
  if (right === 0) {
    switch (config.divisionByZeroMode) {
      case 'error':
        throw new RuntimeError('Division by zero', { left, right });
      case 'infinity':
        return left > 0 ? Infinity : left < 0 ? -Infinity : NaN;
      case 'null':
        return null as any;
      default:
        return NaN;
    }
  }
  
  return left / right;
}
```

**4. Type Coercion Edge Cases**

```typescript
// /services/evaluationEngine/types/TypeCoercion.ts

export class TypeCoercion {
  /**
   * Coerce value to target type with strict rules
   */
  coerce(value: any, targetType: Type, strict: boolean = false): any {
    const sourceType = this.inferType(value);
    
    if (sourceType === targetType) {
      return value;
    }
    
    // Coercion matrix
    const coercions: Record<string, Record<string, (v: any) => any>> = {
      'string': {
        'number': (v) => {
          const num = Number(v);
          if (isNaN(num)) {
            if (strict) {
              throw new TypeError(
                `Cannot coerce "${v}" to number`,
                'number',
                'string',
                { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } }
              );
            }
            return 0; // Or NaN, configurable
          }
          return num;
        },
        'boolean': (v) => {
          // Explicit string-to-boolean rules
          const lower = v.toLowerCase();
          if (lower === 'true' || lower === '1') return true;
          if (lower === 'false' || lower === '0') return false;
          
          if (strict) {
            throw new TypeError(
              `Cannot coerce "${v}" to boolean`,
              'boolean',
              'string',
              { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } }
            );
          }
          
          return !!v; // Truthy/falsy
        },
        'date': (v) => {
          const date = new Date(v);
          if (isNaN(date.getTime())) {
            throw new TypeError(
              `Cannot coerce "${v}" to date`,
              'date',
              'string',
              { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } }
            );
          }
          return date;
        }
      },
      'number': {
        'string': (v) => String(v),
        'boolean': (v) => v !== 0,
        'date': (v) => new Date(v) // Unix timestamp
      },
      'boolean': {
        'string': (v) => String(v),
        'number': (v) => v ? 1 : 0
      },
      'date': {
        'string': (v) => v.toISOString(),
        'number': (v) => v.getTime()
      }
    };
    
    const converter = coercions[sourceType]?.[targetType];
    
    if (!converter) {
      if (strict) {
        throw new TypeError(
          `Cannot coerce ${sourceType} to ${targetType}`,
          targetType,
          sourceType as any,
          { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } }
        );
      }
      return value; // No conversion
    }
    
    return converter(value);
  }
  
  private inferType(value: any): string {
    if (value === null) return 'null';
    if (value === undefined) return 'undefined';
    if (value instanceof Date) return 'date';
    return typeof value;
  }
}
```

**5. Attribute Path Resolution**

```typescript
/**
 * Safe attribute access with null checking
 */
private resolveAttribute(path: string[], data: any): any {
  let current = data;
  
  for (let i = 0; i < path.length; i++) {
    const segment = path[i];
    
    if (current === null || current === undefined) {
      throw new RuntimeError(
        `Cannot read property '${segment}' of ${current === null ? 'null' : 'undefined'}`,
        {
          path: path.join('.'),
          failedAt: path.slice(0, i + 1).join('.'),
          value: current
        }
      );
    }
    
    if (!Object.prototype.hasOwnProperty.call(current, segment)) {
      throw new RuntimeError(
        `Property '${segment}' does not exist`,
        {
          path: path.join('.'),
          availableProperties: Object.keys(current)
        }
      );
    }
    
    current = current[segment];
  }
  
  return current;
}
```

**6. Floating Point Precision**

```typescript
/**
 * Handle floating point arithmetic with configurable precision
 */
private preciseArithmetic(op: string, left: number, right: number): number {
  // Use decimal.js for precise arithmetic if needed
  // Or round to avoid floating point errors
  
  const result = (() => {
    switch (op) {
      case '+': return left + right;
      case '-': return left - right;
      case '*': return left * right;
      case '/': return left / right;
      default: throw new Error(`Unknown operator: ${op}`);
    }
  })();
  
  // Round to avoid 0.1 + 0.2 = 0.30000000000000004
  // Use configurable precision (default: 10 decimal places)
  const precision = this.config.arithmeticPrecision || 10;
  return Number(result.toFixed(precision));
}
```

**7. Array Operations**

```typescript
/**
 * Handle array operations safely
 */
private evaluateArrayFunction(name: string, args: any[]): any {
  const array = args[0];
  
  if (!Array.isArray(array)) {
    throw new TypeError(
      `Expected array, got ${typeof array}`,
      'array',
      typeof array as any,
      { start: { line: 0, column: 0 }, end: { line: 0, column: 0 } }
    );
  }
  
  if (array.length === 0) {
    // Handle empty array cases
    switch (name.toUpperCase()) {
      case 'SUM':
      case 'AVG':
      case 'AVERAGE':
        return 0; // Or null, configurable
      case 'MAX':
      case 'MIN':
        return null; // No max/min of empty array
      case 'COUNT':
        return 0;
      default:
        throw new RuntimeError(`Function ${name} cannot operate on empty array`);
    }
  }
  
  // Validate array size
  if (array.length > this.limits.maxArraySize) {
    throw new RuntimeError(
      `Array size ${array.length} exceeds limit ${this.limits.maxArraySize}`
    );
  }
  
  // Proceed with operation
  switch (name.toUpperCase()) {
    case 'SUM':
      return array.reduce((sum, val) => sum + Number(val), 0);
    case 'AVG':
    case 'AVERAGE':
      return array.reduce((sum, val) => sum + Number(val), 0) / array.length;
    case 'MAX':
      return Math.max(...array.map(Number));
    case 'MIN':
      return Math.min(...array.map(Number));
    case 'COUNT':
      return array.length;
    default:
      throw new Error(`Unknown array function: ${name}`);
  }
}
```

---

## Caching & Optimization

### Compiled Program Cache

```typescript
// /services/evaluationEngine/cache/ProgramCache.ts

export class ProgramCache {
  private cache = new Map<string, CacheEntry>();
  private maxSize: number;
  private accessCount = new Map<string, number>();
  
  constructor(options: { maxSize?: number } = {}) {
    this.maxSize = options.maxSize || 100;
  }
  
  /**
   * Get cached program (LRU)
   */
  get(key: string): CompiledProgram | null {
    const entry = this.cache.get(key);
    
    if (!entry) {
      return null;
    }
    
    // Check if expired
    if (entry.expiresAt && Date.now() > entry.expiresAt) {
      this.cache.delete(key);
      this.accessCount.delete(key);
      return null;
    }
    
    // Update access count for LRU
    this.accessCount.set(key, (this.accessCount.get(key) || 0) + 1);
    
    return entry.program;
  }
  
  /**
   * Set cached program
   */
  set(key: string, program: CompiledProgram, ttl?: number): void {
    // Evict if cache is full
    if (this.cache.size >= this.maxSize) {
      this.evictLRU();
    }
    
    this.cache.set(key, {
      program,
      cachedAt: Date.now(),
      expiresAt: ttl ? Date.now() + ttl : undefined
    });
    
    this.accessCount.set(key, 0);
  }
  
  /**
   * Evict least recently used entry
   */
  private evictLRU(): void {
    let minAccessCount = Infinity;
    let lruKey: string | null = null;
    
    for (const [key, count] of this.accessCount.entries()) {
      if (count < minAccessCount) {
        minAccessCount = count;
        lruKey = key;
      }
    }
    
    if (lruKey) {
      this.cache.delete(lruKey);
      this.accessCount.delete(lruKey);
    }
  }
  
  /**
   * Clear cache
   */
  clear(): void {
    this.cache.clear();
    this.accessCount.clear();
  }
  
  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return {
      size: this.cache.size,
      maxSize: this.maxSize,
      hitRate: this.calculateHitRate(),
      entries: Array.from(this.cache.entries()).map(([key, entry]) => ({
        key,
        accessCount: this.accessCount.get(key) || 0,
        cachedAt: entry.cachedAt,
        expiresAt: entry.expiresAt
      }))
    };
  }
  
  private calculateHitRate(): number {
    // Track hits/misses for hit rate calculation
    return 0; // Implement tracking
  }
}

interface CacheEntry {
  program: CompiledProgram;
  cachedAt: number;
  expiresAt?: number;
}

interface CacheStats {
  size: number;
  maxSize: number;
  hitRate: number;
  entries: Array<{
    key: string;
    accessCount: number;
    cachedAt: number;
    expiresAt?: number;
  }>;
}
```

**Usage with Engine:**

```typescript
export class EvaluationEngine {
  private cache: ProgramCache;
  
  constructor(options: { cacheSize?: number } = {}) {
    this.cache = new ProgramCache({ maxSize: options.cacheSize });
  }
  
  compile(source: string, language: 'formula' | 'bal' = 'formula'): CompileResult {
    // Generate cache key
    const cacheKey = this.generateCacheKey(source, language);
    
    // Check cache
    const cached = this.cache.get(cacheKey);
    if (cached) {
      return {
        success: true,
        program: cached,
        errors: []
      };
    }
    
    // Compile
    const result = this.doCompile(source, language);
    
    // Cache if successful
    if (result.success && result.program) {
      this.cache.set(cacheKey, result.program, 3600000); // 1 hour TTL
    }
    
    return result;
  }
  
  private generateCacheKey(source: string, language: string): string {
    // Simple hash (use better hashing in production)
    return `${language}:${this.hash(source)}`;
  }
  
  private hash(str: string): string {
    // Use a proper hash function (crypto.subtle.digest in browser, crypto.createHash in Node)
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash;
    }
    return hash.toString(36);
  }
}
```

---

## API Design Enhancements

### Updated API with All Features

```typescript
// /services/evaluationEngine/index.ts

export class EvaluationEngine {
  private cache: ProgramCache;
  private platform: PlatformAdapter;
  private worker: EvaluationWorker | null = null;
  
  constructor(options: EngineOptions = {}) {
    this.cache = new ProgramCache({ maxSize: options.cacheSize });
    this.platform = options.platform || platform; // Auto-detect or inject
  }
  
  // Synchronous API (for real-time validation, small formulas)
  compile(source: string, language: 'formula' | 'bal' = 'formula'): CompileResult;
  evaluate(source: string, context: Partial<ExecutionContext>): EvaluationResult;
  validate(source: string, language: 'formula' | 'bal' = 'formula'): ValidationResult;
  
  // Asynchronous API (for large formulas, batch processing)
  compileAsync(source: string, language?: 'formula' | 'bal', options?: CompileOptions): Promise<CompileResult>;
  evaluateAsync(source: string, context: Partial<ExecutionContext>, options?: EvaluationOptions): Promise<EvaluationResult>;
  
  // Worker-based API (for heavy computation)
  compileInWorker(source: string, language?: 'formula' | 'bal'): Promise<SerializedProgram>;
  evaluateBatchInWorker(program: SerializedProgram, contexts: Partial<ExecutionContext>[]): Promise<EvaluationResult[]>;
  
  // Cache management
  clearCache(): void;
  getCacheStats(): CacheStats;
  
  // Function registry
  registerFunction(fn: BuiltInFunction): void;
  getFunctions(): BuiltInFunction[];
  
  // Configuration
  setConfig(config: Partial<EngineConfig>): void;
  getConfig(): EngineConfig;
}

export interface EngineOptions {
  cacheSize?: number;
  platform?: PlatformAdapter;
  config?: Partial<EngineConfig>;
}

export interface EngineConfig {
  /** Strict type checking */
  strictTypes: boolean;
  
  /** Division by zero behavior */
  divisionByZeroMode: 'error' | 'infinity' | 'nan' | 'null';
  
  /** Arithmetic precision (decimal places) */
  arithmeticPrecision: number;
  
  /** Null propagation behavior */
  nullPropagation: 'error' | 'skip' | 'null';
  
  /** Enable optimizations */
  optimize: boolean;
  
  /** Default resource limits */
  defaultLimits: ResourceLimits;
}
```

---

## Resource Management

### Timeout Enforcement

```typescript
// /services/evaluationEngine/runtime/TimeoutManager.ts

export class TimeoutManager {
  private startTime: number;
  private timeoutMs: number;
  
  constructor(timeoutMs: number) {
    this.timeoutMs = timeoutMs;
    this.startTime = Date.now();
  }
  
  /**
   * Check if evaluation has exceeded timeout
   */
  checkTimeout(): void {
    const elapsed = Date.now() - this.startTime;
    
    if (elapsed > this.timeoutMs) {
      throw new TimeoutError(
        `Evaluation timeout after ${elapsed}ms (limit: ${this.timeoutMs}ms)`
      );
    }
  }
  
  /**
   * Get remaining time
   */
  getRemainingTime(): number {
    return Math.max(0, this.timeoutMs - (Date.now() - this.startTime));
  }
}

export class TimeoutError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TimeoutError';
  }
}
```

**Usage in Evaluator:**

```typescript
export class Evaluator {
  private timeout: TimeoutManager;
  private iterationCount = 0;
  
  evaluate(ast: Program, context: ExecutionContext): any {
    this.timeout = new TimeoutManager(context.limits.timeoutMs);
    this.iterationCount = 0;
    
    return this.evaluateNode(ast, context);
  }
  
  private evaluateNode(node: ASTNode, context: ExecutionContext): any {
    // Check timeout periodically
    if (++this.iterationCount % 100 === 0) {
      this.timeout.checkTimeout();
    }
    
    // Check iteration limit
    if (this.iterationCount > context.limits.maxIterations) {
      throw new RuntimeError(
        `Maximum iterations exceeded: ${this.iterationCount} > ${context.limits.maxIterations}`
      );
    }
    
    // Evaluate node...
  }
}
```

---

## Serialization Strategy

### AST Serialization for Server-Side

```typescript
// /services/evaluationEngine/serialization/index.ts

/**
 * Serialize compiled program for storage/transmission
 */
export function serializeProgram(program: CompiledProgram): SerializedProgram {
  return {
    version: '1.0',
    ast: serializeAST(program.getAST()),
    metadata: program.getMetadata(),
    timestamp: Date.now()
  };
}

/**
 * Deserialize program from JSON
 */
export function deserializeProgram(serialized: SerializedProgram): CompiledProgram {
  const ast = deserializeAST(serialized.ast);
  return new CompiledProgram(ast, serialized.metadata);
}

/**
 * Serialize AST to JSON-safe format
 */
function serializeAST(ast: Program): any {
  return JSON.parse(JSON.stringify(ast, (key, value) => {
    // Handle special types that don't serialize well
    if (value instanceof Date) {
      return { __type: 'Date', value: value.toISOString() };
    }
    if (value instanceof RegExp) {
      return { __type: 'RegExp', pattern: value.source, flags: value.flags };
    }
    return value;
  }));
}

/**
 * Deserialize AST from JSON
 */
function deserializeAST(serialized: any): Program {
  return JSON.parse(JSON.stringify(serialized), (key, value) => {
    // Restore special types
    if (value && typeof value === 'object') {
      if (value.__type === 'Date') {
        return new Date(value.value);
      }
      if (value.__type === 'RegExp') {
        return new RegExp(value.pattern, value.flags);
      }
    }
    return value;
  });
}

export interface SerializedProgram {
  version: string;
  ast: any;
  metadata: ProgramMetadata;
  timestamp: number;
}
```

---

## Observability & Telemetry

### Performance Monitoring

```typescript
// /services/evaluationEngine/telemetry/PerformanceMonitor.ts

export class PerformanceMonitor {
  private metrics: Metric[] = [];
  
  /**
   * Record evaluation metric
   */
  recordEvaluation(metric: EvaluationMetric): void {
    this.metrics.push({
      type: 'evaluation',
      timestamp: Date.now(),
      ...metric
    });
    
    // Limit stored metrics
    if (this.metrics.length > 1000) {
      this.metrics.shift();
    }
  }
  
  /**
   * Get performance statistics
   */
  getStats(): PerformanceStats {
    const evaluations = this.metrics.filter(m => m.type === 'evaluation') as EvaluationMetric[];
    
    if (evaluations.length === 0) {
      return {
        count: 0,
        avgParseTime: 0,
        avgEvalTime: 0,
        avgTotalTime: 0,
        maxTotalTime: 0,
        minTotalTime: 0
      };
    }
    
    const parseTimes = evaluations.map(e => e.parseTimeMs);
    const evalTimes = evaluations.map(e => e.evalTimeMs);
    const totalTimes = evaluations.map(e => e.totalTimeMs);
    
    return {
      count: evaluations.length,
      avgParseTime: this.avg(parseTimes),
      avgEvalTime: this.avg(evalTimes),
      avgTotalTime: this.avg(totalTimes),
      maxTotalTime: Math.max(...totalTimes),
      minTotalTime: Math.min(...totalTimes),
      p95TotalTime: this.percentile(totalTimes, 0.95),
      p99TotalTime: this.percentile(totalTimes, 0.99)
    };
  }
  
  /**
   * Clear metrics
   */
  clear(): void {
    this.metrics = [];
  }
  
  private avg(values: number[]): number {
    return values.reduce((sum, v) => sum + v, 0) / values.length;
  }
  
  private percentile(values: number[], p: number): number {
    const sorted = [...values].sort((a, b) => a - b);
    const index = Math.floor(sorted.length * p);
    return sorted[index];
  }
}

interface EvaluationMetric {
  type: 'evaluation';
  timestamp: number;
  parseTimeMs: number;
  evalTimeMs: number;
  totalTimeMs: number;
  success: boolean;
  formulaLength: number;
  variableCount: number;
}

interface PerformanceStats {
  count: number;
  avgParseTime: number;
  avgEvalTime: number;
  avgTotalTime: number;
  maxTotalTime: number;
  minTotalTime: number;
  p95TotalTime?: number;
  p99TotalTime?: number;
}
```

---

## Updated Implementation Phases

### Phase 1 - Foundation (Week 1-2)

**Original deliverables PLUS:**
- Platform adapter for browser/Node.js compatibility
- Basic resource limits (timeout, max iterations)
- Null/undefined handling
- Simple caching

### Phase 2 - Core Features (Week 3-4)

**Original deliverables PLUS:**
- Circular reference detection
- Type coercion with strict mode
- Division by zero handling (configurable)
- Floating point precision handling
- Async API (compileAsync, evaluateAsync)

### Phase 3 - Advanced Features (Week 5-6)

**Original deliverables PLUS:**
- Web Worker support
- Batch evaluation with progress
- Program serialization
- Performance monitoring
- Comprehensive edge case testing

### Phase 4 - BAL Support (Week 7-8)

**Original deliverables (no changes)**

### Phase 5 - Production Hardening (Week 9-10)

**Original deliverables PLUS:**
- Server-side Express routes
- Multi-tenancy support
- LRU cache with statistics
- Complete edge case coverage
- Load testing and benchmarks
- Documentation for server deployment

---

## Quick Reference: Edge Cases Checklist

### Parser Edge Cases
- [ ] Empty input
- [ ] Very long input (>10KB)
- [ ] Deeply nested expressions (>100 levels)
- [ ] Unclosed strings/brackets
- [ ] Invalid Unicode characters
- [ ] Circular references

### Runtime Edge Cases
- [ ] Null/undefined variable access
- [ ] Division by zero
- [ ] Overflow/underflow
- [ ] NaN propagation
- [ ] Infinity in calculations
- [ ] Empty arrays in aggregate functions
- [ ] Array size exceeding limits
- [ ] Attribute path on null object
- [ ] Function with wrong argument count
- [ ] Function with wrong argument types
- [ ] Timeout exceeded
- [ ] Max iterations exceeded
- [ ] Stack overflow (deep recursion)

### Type System Edge Cases
- [ ] String + Number (should concatenate or error?)
- [ ] Boolean in arithmetic
- [ ] Comparing different types
- [ ] Date arithmetic
- [ ] Type coercion failure
- [ ] Precision loss in decimal arithmetic

### Concurrency Edge Cases
- [ ] Multiple simultaneous evaluations
- [ ] AST modification during evaluation
- [ ] Cache race conditions
- [ ] Worker termination during evaluation

---

## Performance Targets (Updated)

### Browser (Main Thread)
- Parse simple formula (<50 chars): <5ms
- Parse complex formula (<500 chars): <20ms
- Evaluate simple formula: <1ms
- Evaluate complex formula: <10ms
- 100 sequential evaluations: <100ms

### Browser (Web Worker)
- Compile overhead: <50ms (worker initialization)
- Batch 1000 evaluations: <500ms
- Streaming evaluation: <1ms per item

### Server-Side (Node.js)
- API latency (compile): <50ms
- API latency (evaluate): <10ms
- Concurrent requests: 1000 req/s per core
- Memory per evaluation: <1MB

---

## Conclusion

This addendum addresses critical production concerns:

1. **Performance**: Async APIs, Web Workers, caching, batching
2. **Compatibility**: Platform abstraction for browser/Node.js
3. **Robustness**: Comprehensive edge case handling
4. **Observability**: Performance monitoring, telemetry
5. **Scalability**: Multi-tenancy, resource limits, serialization

The evaluation engine will now be production-ready for both client-side and server-side deployments, with excellent performance characteristics and comprehensive error handling.

**Next Steps:**
1. Review and approve this addendum
2. Update Phase 1 implementation to include platform adapter
3. Begin implementation with async/sync hybrid API
4. Set up performance benchmarking infrastructure
