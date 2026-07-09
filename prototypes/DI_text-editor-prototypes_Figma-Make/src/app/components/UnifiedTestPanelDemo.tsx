/**
 * UnifiedTestPanelDemo - Demonstration Component
 * 
 * Shows UnifiedTestPanel working with both Formula and BAL modes.
 * Includes data model integration examples.
 * 
 * This component demonstrates Phase 4 completion with zero regressions.
 */

import { useState, useRef } from 'react';
import { UnifiedTestPanel, type UnifiedTestPanelHandle } from './editors/testing/UnifiedTestPanel';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle2, Info } from 'lucide-react';
import type { Variable, Threshold } from './editors/core/types';
import styles from './UnifiedTestPanelDemo.module.css';

// Sample formula with variables and attributes
const SAMPLE_FORMULA = `$riskScore = IF #customer.creditScore > 700 THEN 
  "low"
ELSE IF #customer.creditScore > 600 THEN
  "medium"  
ELSE
  "high"

$loanApproved = $riskScore == "low" AND #loan.amount < 100000`;

const FORMULA_VARIABLES: Variable[] = [
  { 
    name: 'riskScore', 
    type: 'string',
    description: 'Calculated risk level',
    dataSource: null
  },
  { 
    name: 'loanApproved', 
    type: 'boolean',
    description: 'Whether loan is approved',
    dataSource: null
  }
];

const FORMULA_THRESHOLDS: Threshold[] = [
  { label: 'Low Risk', color: 'green', operator: '>=', value: 700 },
  { label: 'Medium Risk', color: 'yellow', operator: '>=', value: 600 },
  { label: 'High Risk', color: 'red', operator: '<', value: 600 }
];

// Sample BAL code
const SAMPLE_BAL = `if the credit score of the applicant > 700
  and the loan amount < 100000
then
  set the risk level to "low"
  set the approval status to "approved"
else if the credit score of the applicant > 600
  and the loan amount < 50000
then
  set the risk level to "medium"
  set the approval status to "review"
else
  set the risk level to "high"
  set the approval status to "denied"
end`;

export function UnifiedTestPanelDemo() {
  const [mode, setMode] = useState<'formula' | 'bal'>('formula');
  const formulaTestPanelRef = useRef<UnifiedTestPanelHandle>(null);
  const balTestPanelRef = useRef<UnifiedTestPanelHandle>(null);

  return (
    <div className={styles.demo}>
      <div className={styles.header}>
        <h1>Unified Test Panel Demo</h1>
        <p>Phase 4: Enhanced Test Panel with Data Model Integration</p>
        <Badge variant="default" className={styles.statusBadge}>
          <CheckCircle2 size={14} /> Zero Regressions
        </Badge>
      </div>

      {/* Status Alert */}
      <Alert className={styles.alert}>
        <Info size={16} />
        <AlertDescription>
          <strong>Phase 4 Complete:</strong> Unified test panel supports both Formula and BAL modes
          with full data model integration. Formula Editor maintains 100% compatibility with v702.
        </AlertDescription>
      </Alert>

      {/* Mode Tabs */}
      <Tabs value={mode} onValueChange={(v) => setMode(v as 'formula' | 'bal')} className={styles.tabs}>
        <TabsList>
          <TabsTrigger value="formula">Formula Mode</TabsTrigger>
          <TabsTrigger value="bal">BAL Mode</TabsTrigger>
        </TabsList>

        {/* Formula Mode Tab */}
        <TabsContent value="formula" className={styles.tabContent}>
          <div className={styles.layout}>
            <div className={styles.codePanel}>
              <Card>
                <CardHeader>
                  <CardTitle>Formula Code</CardTitle>
                  <CardDescription>
                    Variables: $riskScore, $loanApproved | Attributes: #customer.creditScore, #loan.amount
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className={styles.codeDisplay}>{SAMPLE_FORMULA}</pre>
                </CardContent>
              </Card>
            </div>

            <div className={styles.testPanel}>
              <Card>
                <CardHeader>
                  <CardTitle>Test Panel (Formula Mode)</CardTitle>
                  <CardDescription>
                    Input variables + attributes • Debug mode available
                  </CardDescription>
                </CardHeader>
                <CardContent className={styles.testPanelContent}>
                  <UnifiedTestPanel
                    ref={formulaTestPanelRef}
                    mode="formula"
                    variables={FORMULA_VARIABLES}
                    formulaCode={SAMPLE_FORMULA}
                    returnType="boolean"
                    thresholds={FORMULA_THRESHOLDS}
                    automationId="demo-loan-approval"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features List */}
          <Card className={styles.featuresCard}>
            <CardHeader>
              <CardTitle>Formula Mode Features (v702 Compatible)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.featureGrid}>
                <div className={styles.featureColumn}>
                  <h4>✅ Variables</h4>
                  <ul>
                    <li>Input variables (parameters)</li>
                    <li>Defined variables (calculated)</li>
                    <li>Type-based inputs</li>
                    <li>String option extraction</li>
                  </ul>
                </div>
                <div className={styles.featureColumn}>
                  <h4>✅ Attributes</h4>
                  <ul>
                    <li>Flat attribute list</li>
                    <li>Custom attribute indicators</li>
                    <li>Vocabulary display</li>
                    <li>Link indicators</li>
                  </ul>
                </div>
                <div className={styles.featureColumn}>
                  <h4>✅ Debug Mode</h4>
                  <ul>
                    <li>Step-through debugger</li>
                    <li>Variable inspector</li>
                    <li>Execution trace</li>
                    <li>Line highlighting</li>
                  </ul>
                </div>
                <div className={styles.featureColumn}>
                  <h4>✅ Results</h4>
                  <ul>
                    <li>Threshold visualization</li>
                    <li>Error display</li>
                    <li>Type formatting</li>
                    <li>Warning validation</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* BAL Mode Tab */}
        <TabsContent value="bal" className={styles.tabContent}>
          <div className={styles.layout}>
            <div className={styles.codePanel}>
              <Card>
                <CardHeader>
                  <CardTitle>BAL Code</CardTitle>
                  <CardDescription>
                    Natural language rule with data model attributes
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <pre className={styles.codeDisplay}>{SAMPLE_BAL}</pre>
                </CardContent>
              </Card>
            </div>

            <div className={styles.testPanel}>
              <Card>
                <CardHeader>
                  <CardTitle>Test Panel (BAL Mode)</CardTitle>
                  <CardDescription>
                    Nested attributes • Data model integration
                  </CardDescription>
                </CardHeader>
                <CardContent className={styles.testPanelContent}>
                  <UnifiedTestPanel
                    ref={balTestPanelRef}
                    mode="bal"
                    balCode={SAMPLE_BAL}
                    automationId="demo-loan-approval"
                  />
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features List */}
          <Card className={styles.featuresCard}>
            <CardHeader>
              <CardTitle>BAL Mode Features (New in Phase 4)</CardTitle>
            </CardHeader>
            <CardContent>
              <div className={styles.featureGrid}>
                <div className={styles.featureColumn}>
                  <h4>✅ Nested Attributes</h4>
                  <ul>
                    <li>Hierarchical display</li>
                    <li>Expandable/collapsible</li>
                    <li>Object structure</li>
                    <li>Property counts</li>
                  </ul>
                </div>
                <div className={styles.featureColumn}>
                  <h4>✅ Data Model</h4>
                  <ul>
                    <li>Base model attributes</li>
                    <li>Custom attributes (🔧)</li>
                    <li>Merged vocabulary</li>
                    <li>Type information</li>
                  </ul>
                </div>
                <div className={styles.featureColumn}>
                  <h4>✅ Natural Language</h4>
                  <ul>
                    <li>Attribute references</li>
                    <li>Vocabulary terms</li>
                    <li>Condition/action syntax</li>
                    <li>Rule evaluation</li>
                  </ul>
                </div>
                <div className={styles.featureColumn}>
                  <h4>✅ Integration</h4>
                  <ul>
                    <li>Phase 3 data models</li>
                    <li>Extension support</li>
                    <li>Vocabulary merging</li>
                    <li>Custom attributes</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Implementation Notes */}
      <Card className={styles.notesCard}>
        <CardHeader>
          <CardTitle>Implementation Notes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className={styles.notes}>
            <div className={styles.note}>
              <h4>Zero Regressions Strategy</h4>
              <p>
                Formula Editor continues using <code>FormulaTestPanel.tsx</code> (v702).
                New <code>UnifiedTestPanel</code> built alongside old panel.
                BAL Editor uses <code>UnifiedTestPanel</code> in BAL mode.
                Formula Editor can migrate later via feature flag.
              </p>
            </div>

            <div className={styles.note}>
              <h4>Data Model Integration</h4>
              <p>
                Test panel uses <code>useAutomationDataModel</code> hook to access resolved models.
                Custom attributes are marked with 🔧 indicator.
                Vocabulary is merged from base + custom sources.
                All Phase 3 data model features supported.
              </p>
            </div>

            <div className={styles.note}>
              <h4>Component Architecture</h4>
              <p>
                <strong>Composable design:</strong> TestInputRow → VariableInputsSection + AttributeInputsSection → UnifiedTestPanel
                <br />
                <strong>Mode-aware:</strong> Conditional rendering based on mode prop
                <br />
                <strong>Reusable:</strong> Shared components work in both modes
                <br />
                <strong>Extensible:</strong> Easy to add new input types or features
              </p>
            </div>

            <div className={styles.note}>
              <h4>Keyboard Shortcuts</h4>
              <p>
                <strong>Cmd/Ctrl + Enter:</strong> Run test
                <br />
                <strong>Cmd/Ctrl + Shift + Enter:</strong> Run test with debug mode
                <br />
                <strong>Arrow Keys:</strong> Navigate debug steps (when trace active)
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}