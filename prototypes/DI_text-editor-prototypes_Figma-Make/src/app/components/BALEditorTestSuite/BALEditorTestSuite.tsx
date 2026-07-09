/**
 * BAL Editor Test Suite Component
 * 
 * Interactive test harness for validating BAL Editor functionality.
 * Run through all test cases from BAL_EDITOR_TEST_CASES.md
 * 
 * Phase 5.11.4 Part 2: Updated to use BALEditorWithVocabulary
 * 
 * USAGE:
 * - Import and render this component
 * - Follow the test instructions
 * - Check off passing tests
 * - Report any failures
 */

import React, { useState, useRef } from 'react';
import { BALEditorWithVocabulary as BALEditor, type BALEditorHandle, type BALError } from '../BALEditor';
import { BALDefinitionsDemo } from '../editors/code/balSupport/BALDefinitionsDemo';
import { Button } from '../ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Alert, AlertDescription } from '../ui/alert';
import { CheckCircle2, XCircle, AlertCircle, Play, RotateCcw } from 'lucide-react';
import styles from './BALEditorTestSuite.module.css';

const SAMPLE_VOCABULARY = [
  { term: 'customer', definition: 'A person who purchases goods or services', dataType: 'Entity' },
  { term: 'order', definition: 'A request to purchase products', dataType: 'Entity' },
  { term: 'total', definition: 'The sum of all line items', dataType: 'Number' },
];

const SAMPLE_CODE = `// Calculate order total
if customer is premium then
  discount = 0.15
else
  discount = 0.05

total = subtotal * (1 - discount)

// Apply minimum order
if total < 25 then
  total = total + 5
`;

const LARGE_CODE = Array.from({ length: 500 }, (_, i) => 
  `// Line ${i + 1}\\nif condition${i} is true then action${i}()`
).join('\\n');

interface TestResult {
  id: string;
  name: string;
  status: 'pass' | 'fail' | 'pending';
  notes?: string;
}

export function BALEditorTestSuite() {
  const [value, setValue] = useState(SAMPLE_CODE);
  const [errors, setErrors] = useState<BALError[]>([]);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [performanceMetrics, setPerformanceMetrics] = useState<{
    renderTime?: number;
    keystrokeTime?: number;
    syntaxHighlightTime?: number;
  }>({});
  
  const editorRef = useRef<BALEditorHandle>(null);

  const handleValidate = () => {
    // Mock validation
    const mockErrors: BALError[] = [
      { line: 3, message: 'Variable "discount" not declared' },
      { line: 10, message: 'Expected "end" statement' },
    ];
    setErrors(mockErrors);
  };

  const runTest = (testId: string, testName: string, testFn: () => boolean) => {
    try {
      const passed = testFn();
      setTestResults(prev => [
        ...prev.filter(t => t.id !== testId),
        { id: testId, name: testName, status: passed ? 'pass' : 'fail' }
      ]);
    } catch (error) {
      setTestResults(prev => [
        ...prev.filter(t => t.id !== testId),
        { 
          id: testId, 
          name: testName, 
          status: 'fail',
          notes: error instanceof Error ? error.message : 'Unknown error'
        }
      ]);
    }
  };

  const runPerformanceTests = () => {
    // Test 1: Initial render
    const renderStart = performance.now();
    setValue(SAMPLE_CODE);
    requestAnimationFrame(() => {
      const renderTime = performance.now() - renderStart;
      setPerformanceMetrics(prev => ({ ...prev, renderTime }));
    });

    // Test 2: Syntax highlighting (measure via React profiler in production)
    // This is a placeholder - real test would use React DevTools Profiler
  };

  const loadLargeFile = () => {
    setValue(LARGE_CODE);
  };

  const resetEditor = () => {
    setValue(SAMPLE_CODE);
    setErrors([]);
    setTestResults([]);
    setPerformanceMetrics({});
  };

  return (
    <div className={styles.testSuite}>
      <div className={styles.header}>
        <h1>BAL Editor Test Suite</h1>
        <p>Interactive test harness for validating editor functionality</p>
      </div>

      <Tabs defaultValue="interactive" className={styles.tabs}>
        <TabsList>
          <TabsTrigger value="interactive">Interactive Tests</TabsTrigger>
          <TabsTrigger value="automated">Automated Tests</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="definitions">Definitions Demo</TabsTrigger>
        </TabsList>

        {/* Interactive Tests */}
        <TabsContent value="interactive" className={styles.tabContent}>
          <div className={styles.editorControls}>
            <div className={styles.controlGroup}>
              <label>Test Actions:</label>
              <div className={styles.buttonGroup}>
                <Button onClick={() => editorRef.current?.focus()} variant="outline">
                  Focus Editor
                </Button>
                <Button onClick={handleValidate} variant="outline">
                  Trigger Validation
                </Button>
                <Button onClick={loadLargeFile} variant="outline">
                  Load Large File (500 lines)
                </Button>
                <Button onClick={resetEditor} variant="outline">
                  <RotateCcw size={16} /> Reset
                </Button>
              </div>
            </div>
          </div>

          <div className={styles.editorWrapper}>
            <BALEditor
              ref={editorRef}
              value={value}
              onChange={setValue}
              errors={errors}
              onValidate={handleValidate}
              vocabularyMappings={SAMPLE_VOCABULARY}
            />
          </div>

          <Card className={styles.instructionsCard}>
            <CardHeader>
              <CardTitle>Manual Test Instructions</CardTitle>
              <CardDescription>
                Perform these actions and verify expected behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.testChecklist}>
                <h3>1. Basic Editing</h3>
                <ul>
                  <li>✓ Type characters - should appear immediately</li>
                  <li>✓ Press Backspace - should delete previous character</li>
                  <li>✓ Press Enter - should create new line (with smart indent)</li>
                  <li>✓ Press Delete - should delete next character</li>
                  <li>✓ Type at beginning, middle, and end of lines</li>
                </ul>

                <h3>2. Selection & Clipboard</h3>
                <ul>
                  <li>✓ Click and drag to select text</li>
                  <li>✓ Double-click to select word</li>
                  <li>✓ Cmd/Ctrl+A to select all</li>
                  <li>✓ Cmd/Ctrl+C to copy, Cmd/Ctrl+V to paste</li>
                  <li>✓ Cmd/Ctrl+X to cut</li>
                </ul>

                <h3>3. Keyboard Shortcuts</h3>
                <ul>
                  <li>✓ Tab - should indent line (2 spaces)</li>
                  <li>✓ Shift+Tab - should outdent line</li>
                  <li>✓ Select multiple lines + Tab - should indent all lines</li>
                  <li>✓ Cmd/Ctrl+Z - should undo last change</li>
                  <li>✓ Cmd/Ctrl+Shift+Z - should redo</li>
                  <li>✓ Cmd/Ctrl+S - should trigger validation</li>
                </ul>

                <h3>4. Syntax Highlighting</h3>
                <ul>
                  <li>✓ Keywords (if, then, else) highlighted in blue</li>
                  <li>✓ Vocabulary (customer, order, total) highlighted in purple</li>
                  <li>✓ Numbers highlighted in purple</li>
                  <li>✓ Strings (in quotes) highlighted in green</li>
                  <li>✓ Comments (//) highlighted in gray italic</li>
                  <li>✓ Highlighting doesn't interfere with typing</li>
                </ul>

                <h3>5. Hanging Indent</h3>
                <ul>
                  <li>✓ Resize window to make lines wrap</li>
                  <li>✓ Indented lines (2+ spaces) should have wrapped lines aligned</li>
                  <li>✓ Non-indented lines wrap at position 0</li>
                </ul>

                <h3>6. Line Numbers</h3>
                <ul>
                  <li>✓ Line numbers displayed for all lines</li>
                  <li>✓ Line numbers scroll in sync with content</li>
                  <li>✓ Error lines (3, 10) show red highlight</li>
                  <li>✓ Hover error line number shows tooltip</li>
                </ul>

                <h3>7. Performance (Large File Test)</h3>
                <ul>
                  <li>✓ Click "Load Large File" button</li>
                  <li>✓ Editor should load without freezing</li>
                  <li>✓ Typing should remain responsive</li>
                  <li>✓ Scrolling should be smooth</li>
                  <li>✓ Syntax highlighting should complete within ~1 second</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automated Tests */}
        <TabsContent value="automated" className={styles.tabContent}>
          <Card>
            <CardHeader>
              <CardTitle>Automated Test Results</CardTitle>
              <CardDescription>
                Programmatic validation of editor functionality
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.buttonGroup}>
                <Button 
                  onClick={() => runTest('focus', 'Focus Test', () => {
                    editorRef.current?.focus();
                    return document.activeElement?.tagName === 'TEXTAREA';
                  })}
                >
                  <Play size={16} /> Run Focus Test
                </Button>
                <Button onClick={runPerformanceTests}>
                  <Play size={16} /> Run Performance Tests
                </Button>
              </div>

              <Separator className={styles.separator} />

              <div className={styles.testResults}>
                {testResults.length === 0 ? (
                  <Alert>
                    <AlertCircle size={16} />
                    <AlertDescription>
                      No tests run yet. Click a test button above to run.
                    </AlertDescription>
                  </Alert>
                ) : (
                  testResults.map(result => (
                    <div key={result.id} className={styles.testResult}>
                      {result.status === 'pass' ? (
                        <CheckCircle2 className={styles.passIcon} size={20} />
                      ) : (
                        <XCircle className={styles.failIcon} size={20} />
                      )}
                      <div className={styles.testInfo}>
                        <div className={styles.testName}>{result.name}</div>
                        {result.notes && (
                          <div className={styles.testNotes}>{result.notes}</div>
                        )}
                      </div>
                      <Badge variant={result.status === 'pass' ? 'default' : 'destructive'}>
                        {result.status.toUpperCase()}
                      </Badge>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Performance Tests */}
        <TabsContent value="performance" className={styles.tabContent}>
          <Card>
            <CardHeader>
              <CardTitle>Performance Metrics</CardTitle>
              <CardDescription>
                Measure rendering, typing, and syntax highlighting performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className={styles.metrics}>
                <div className={styles.metric}>
                  <div className={styles.metricLabel}>Initial Render Time</div>
                  <div className={styles.metricValue}>
                    {performanceMetrics.renderTime 
                      ? `${performanceMetrics.renderTime.toFixed(2)}ms`
                      : 'Not measured'}
                  </div>
                  <div className={styles.metricTarget}>Target: {'<'} 100ms</div>
                </div>

                <div className={styles.metric}>
                  <div className={styles.metricLabel}>Line Count</div>
                  <div className={styles.metricValue}>
                    {value.split('\n').length} lines
                  </div>
                </div>

                <div className={styles.metric}>
                  <div className={styles.metricLabel}>Character Count</div>
                  <div className={styles.metricValue}>
                    {value.length} chars
                  </div>
                </div>
              </div>

              <Separator className={styles.separator} />

              <Alert>
                <AlertCircle size={16} />
                <AlertDescription>
                  <strong>Performance Testing Tips:</strong>
                  <ul>
                    <li>Open Chrome DevTools → Performance tab</li>
                    <li>Start recording, type rapidly, stop recording</li>
                    <li>Look for "Input Latency" - should be {'<'}16ms (60fps)</li>
                    <li>Check for long tasks (yellow bars)</li>
                    <li>Memory tab: watch for leaks during extended use</li>
                  </ul>
                </AlertDescription>
              </Alert>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Definitions Demo */}
        <TabsContent value="definitions" className={styles.tabContent}>
          <Card>
            <CardHeader>
              <CardTitle>BAL Definitions Demo</CardTitle>
              <CardDescription>
                Demonstration of BAL vocabulary definitions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <BALDefinitionsDemo />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}