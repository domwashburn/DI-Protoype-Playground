import { useState, useRef, useEffect, useMemo } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './components/ui/tabs';
import { BookOpen, Code, FileText, Edit3, Calculator, FlaskConical, Database } from 'lucide-react';
import { Toaster } from './components/ui/sonner';
import { EditorContainer } from './components/EditorContainer';
import { FeatureList } from './components/FeatureList';
import { FormulaTestPanel, type FormulaTestPanelHandle } from './components/editors/code/FormulaEditor/FormulaTestPanel';
import { FormulaDetailsPanel } from './components/editors/code/FormulaEditor/FormulaDetailsPanel';
import { VariableTable } from './components/editors/code/shared/components/VariableTable';
import { BALEditorTestSuite } from './components/BALEditorTestSuite';
import { KeyboardShortcutsHelp } from './components/KeyboardShortcutsHelp';
import { DataModelPanel } from './components/DataModelPanel';
import { BALDataModelPanel } from './components/BALDataModelPanel';
import { useKeyboardShortcuts } from './hooks/useKeyboardShortcuts';
import { useDataModel } from './hooks/useDataModel';
import { extractDefinedVariables, extractParameterVariables } from './utils/formulaParser';
import { replaceVariableName } from './utils/variableRename';
import type { EditorType } from './services/editorService';
import { Variable, Threshold } from './components/editors/core/types';
import type { DebugHighlight } from './utils/debugHighlighting';
import type { ErrorHighlight, WarningHighlight } from './components/editors/code/FormulaEditor/FormulaTestPanel';
import type { LineIssue } from './components/editors/code/FormulaEditor/ErrorWarningList';
import { extractBALAttributes } from './components/editors/code/balSupport/balAttributeUtils';
import { initializeDataModelService } from './data/initializeDataModelService';
import styles from '../styles/App.module.css';

// Initialize data model service with sample extensions (Phase 1)
initializeDataModelService();

/**
 * Main App Component
 */
export default function App() {
  const [selectedEditorType, setSelectedEditorType] = useState<EditorType>('bal');
  const [balSidebarTab, setBalSidebarTab] = useState<'details' | 'datamodel' | 'test'>('details');
  const [formulaSidebarTab, setFormulaSidebarTab] = useState<'details' | 'variables' | 'testing'>('details');
  const [formulaVariables, setFormulaVariables] = useState<Variable[]>([]);
  const [formulaContent, setFormulaContent] = useState('');
  const [formulaName, setFormulaName] = useState('');
  const [formulaDescription, setFormulaDescription] = useState('');
  const [formulaReturnType, setFormulaReturnType] = useState<'number' | 'string' | 'boolean' | 'date' | 'time'>('number');
  const [formulaThresholds, setFormulaThresholds] = useState<Threshold[]>([]);
  const [showTestSuite, setShowTestSuite] = useState(false);
  const [showDiagnostic, setShowDiagnostic] = useState(false);
  
  // BAL editor state
  const [balContent, setBalContent] = useState('');
  const [balName, setBalName] = useState('');
  const [balDescription, setBalDescription] = useState('');
  const [balReturnType, setBalReturnType] = useState<'number' | 'string' | 'boolean' | 'date' | 'time'>('string');
  const [balDocumentId, setBalDocumentId] = useState('loan-approval');
  
  // Get data models for current BAL document
  const balDataModel = useDataModel(balDocumentId);
  
  // Convert data model attributes to FormulaTestPanel format,
  // filtered to only include attributes referenced in the BAL code
  const balTestAttributes = useMemo(() => {
    // First, get all available attributes from data model
    const allAttributes = balDataModel.attributes.flatMap(attr => {
      const attributes: Array<{
        path: string;
        type: 'string' | 'number' | 'boolean' | 'date' | 'time' | 'datetime';
        description?: string;
      }> = [];
      
      // Add main attribute if it has sub-attributes (object type)
      if (attr.subAttributes) {
        // Add each sub-attribute with full path
        attr.subAttributes.forEach(subAttr => {
          attributes.push({
            path: `${attr.name}.${subAttr.name}`,
            type: subAttr.type as any,
            description: subAttr.description
          });
        });
      } else {
        // Simple attribute
        attributes.push({
          path: attr.name,
          type: attr.type as any,
          description: attr.description
        });
      }
      
      return attributes;
    });
    
    // If there's no BAL content, return all attributes
    if (!balContent || balContent.trim() === '' || balContent.trim().startsWith('//') && balContent.split('\n').length === 1) {
      return allAttributes;
    }
    
    // Extract attributes referenced in BAL code
    const referencedPaths = extractBALAttributes(balContent);
    
    // Filter to only include referenced attributes
    // Also include parent objects if any of their children are referenced
    const referencedSet = new Set(referencedPaths);
    const parentObjects = new Set<string>();
    
    referencedPaths.forEach(path => {
      const parts = path.split('.');
      // Add all parent paths (e.g., for "applicant.creditScore", also add "applicant")
      for (let i = 1; i < parts.length; i++) {
        parentObjects.add(parts.slice(0, i).join('.'));
      }
    });
    
    return allAttributes.filter(attr => 
      referencedSet.has(attr.path) || parentObjects.has(attr.path)
    );
  }, [balDataModel.attributes, balContent]);
  
  // Debug highlighting state for Formula Editor (Phase 3)
  const [debugHighlight, setDebugHighlight] = useState<DebugHighlight | null>(null);
  
  // Error highlighting state for Formula Editor (error line indication)
  const [errorHighlight, setErrorHighlight] = useState<ErrorHighlight | null>(null);
  
  // Warning highlighting state for Formula Editor (warning line indications)
  const [warningHighlights, setWarningHighlights] = useState<WarningHighlight[]>([]);
  
  // Line issues state for Formula Editor (CRIT-002: error/warning list)
  const [lineIssues, setLineIssues] = useState<LineIssue[]>([]);
  
  // Keyboard shortcuts help modal state
  const [showKeyboardHelp, setShowKeyboardHelp] = useState(false);
  
  // Data model panel state
  const [showDataModelPanel, setShowDataModelPanel] = useState(false);
  
  // Track previous defined variables to prevent unnecessary updates
  const prevDefinedVarsRef = useRef<string>('');

  // Refs for FormulaTestPanel actions (exposed via ref callback pattern)
  const testPanelRef = useRef<FormulaTestPanelHandle>(null);

  const handleTabChange = (value: string) => {
    setSelectedEditorType(value as EditorType);
  };

  /**
   * Cycle right panel tabs (for keyboard shortcuts)
   */
  const handleCycleTabsRight = () => {
    if (selectedEditorType === 'bal') {
      const tabs = ['details', 'datamodel', 'test'] as const;
      const currentIndex = tabs.indexOf(balSidebarTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setBalSidebarTab(tabs[nextIndex]);
    } else if (selectedEditorType === 'formula') {
      const tabs = ['details', 'variables', 'testing'] as const;
      const currentIndex = tabs.indexOf(formulaSidebarTab);
      const nextIndex = (currentIndex + 1) % tabs.length;
      setFormulaSidebarTab(tabs[nextIndex]);
    }
  };

  /**
   * Cycle right panel tabs left (for keyboard shortcuts)
   */
  const handleCycleTabsLeft = () => {
    if (selectedEditorType === 'bal') {
      const tabs = ['details', 'datamodel', 'test'] as const;
      const currentIndex = tabs.indexOf(balSidebarTab);
      const nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      setBalSidebarTab(tabs[nextIndex]);
    } else if (selectedEditorType === 'formula') {
      const tabs = ['details', 'variables', 'testing'] as const;
      const currentIndex = tabs.indexOf(formulaSidebarTab);
      const nextIndex = currentIndex === 0 ? tabs.length - 1 : currentIndex - 1;
      setFormulaSidebarTab(tabs[nextIndex]);
    }
  };

  /**
   * Switch editor tab by number (Ctrl+Shift+Number)
   */
  const handleSwitchEditorTab = (tabIndex: number) => {
    const editorTypes: EditorType[] = ['bal', 'richtext', 'markdown', 'formula'];
    const targetIndex = tabIndex - 1; // 1-based to 0-based
    if (targetIndex >= 0 && targetIndex < editorTypes.length) {
      setSelectedEditorType(editorTypes[targetIndex]);
    }
  };

  /**
   * Switch panel tab by number (Ctrl+Cmd+Shift+Number)
   */
  const handleSwitchPanelTab = (tabIndex: number) => {
    if (selectedEditorType === 'bal') {
      const tabs = ['details', 'datamodel', 'test'] as const;
      const targetIndex = tabIndex - 1; // 1-based to 0-based
      if (targetIndex >= 0 && targetIndex < tabs.length) {
        setBalSidebarTab(tabs[targetIndex]);
      }
    } else if (selectedEditorType === 'formula') {
      const tabs = ['details', 'variables', 'testing'] as const;
      const targetIndex = tabIndex - 1; // 1-based to 0-based
      if (targetIndex >= 0 && targetIndex < tabs.length) {
        setFormulaSidebarTab(tabs[targetIndex]);
      }
    }
  };

  /**
   * Toggle debug mode (for keyboard shortcuts)
   */
  const handleToggleDebugMode = () => {
    // For formula editor, toggle debug mode via ref
    if (selectedEditorType === 'formula' && testPanelRef.current) {
      testPanelRef.current.toggleDebugMode();
    }
  };

  /**
   * Run test (for keyboard shortcuts)
   */
  const handleRunTest = () => {
    // For formula editor, run test via ref
    if (selectedEditorType === 'formula' && testPanelRef.current) {
      testPanelRef.current.runTest();
    }
  };

  /**
   * Run test in debug mode (for keyboard shortcuts)
   */
  const handleRunTestDebug = () => {
    // For formula editor, run test in debug mode via ref
    if (selectedEditorType === 'formula' && testPanelRef.current) {
      testPanelRef.current.runTestDebug();
    }
  };

  /**
   * Clear debug output (for keyboard shortcuts)
   */
  const handleClearDebugOutput = () => {
    if (selectedEditorType === 'formula' && testPanelRef.current) {
      testPanelRef.current.clearDebugOutput();
    }
    // Clear all debug/error/warning highlights
    setDebugHighlight(null);
    setErrorHighlight(null);
    setWarningHighlights([]);
    setLineIssues([]);
  };

  /**
   * Step forward in debug trace (for keyboard shortcuts)
   */
  const handleDebugStepForward = () => {
    if (selectedEditorType === 'formula' && testPanelRef.current) {
      testPanelRef.current.stepForward();
    }
  };

  /**
   * Step backward in debug trace (for keyboard shortcuts)
   */
  const handleDebugStepBackward = () => {
    if (selectedEditorType === 'formula' && testPanelRef.current) {
      testPanelRef.current.stepBackward();
    }
  };

  /**
   * Global keyboard shortcuts
   * Note: Next/Previous example shortcuts are handled by EditorContainer component
   */
  useKeyboardShortcuts({
    onCycleTabsRight: handleCycleTabsRight,
    onCycleTabsLeft: handleCycleTabsLeft,
    onToggleDebugMode: handleToggleDebugMode,
    onRunTest: handleRunTest,
    onRunTestDebug: handleRunTestDebug,
    onClearDebugOutput: handleClearDebugOutput,
    onDebugStepForward: handleDebugStepForward,
    onDebugStepBackward: handleDebugStepBackward,
    onShowHelp: () => setShowKeyboardHelp(true),
    onSwitchEditorTab: handleSwitchEditorTab,
    onSwitchPanelTab: handleSwitchPanelTab,
    enabled: !showTestSuite // Disable when in test suite mode
  });

  /**
   * Auto-detect defined variables when formula content changes
   * Uses ref to prevent unnecessary updates during typing
   */
  useEffect(() => {
    if (!formulaContent) return;

    const definedVarNames = extractDefinedVariables(formulaContent);
    const definedVarsKey = definedVarNames.sort().join(',');
    
    // Only update if the set of defined variables actually changed
    if (definedVarsKey !== prevDefinedVarsRef.current) {
      prevDefinedVarsRef.current = definedVarsKey;
      
      setFormulaVariables(prevVars => {
        // CRITICAL: Only create new array if something actually changed
        const updatedVars = prevVars.map(v => ({
          ...v,
          definedInEditor: definedVarNames.includes(v.name)
        }));
        
        // Check if any values actually changed
        const hasChanges = updatedVars.some((v, i) => 
          v.definedInEditor !== prevVars[i]?.definedInEditor
        );
        
        // Return same reference if nothing changed to prevent re-renders
        return hasChanges ? updatedVars : prevVars;
      });
    }
  }, [formulaContent]);

  /**
   * Handle variable CRUD operations
   */
  const handleVariableCreate = (variable: Omit<Variable, 'id'>) => {
    const newVariable: Variable = {
      ...variable,
      id: `var-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
    };
    setFormulaVariables([...formulaVariables, newVariable]);
  };

  const handleVariableUpdate = (id: string, updates: Partial<Variable>) => {
    // Check if the name is being changed (for 2-way binding)
    if (updates.name !== undefined) {
      const oldVariable = formulaVariables.find(v => v.id === id);
      
      if (oldVariable && oldVariable.name !== updates.name) {
        // Name changed - update all instances in the formula
        const updatedFormula = replaceVariableName(
          formulaContent,
          oldVariable.name,
          updates.name
        );
        
        // Update formula content
        setFormulaContent(updatedFormula);
      }
    }
    
    // Update the variable in the table
    setFormulaVariables(
      formulaVariables.map(v => v.id === id ? { ...v, ...updates } : v)
    );
  };

  const handleVariableDelete = (id: string) => {
    setFormulaVariables(formulaVariables.filter(v => v.id !== id));
  };

  // Toggle test suite mode
  if (showTestSuite) {
    return (
      <div className={styles.appContainer}>
        <Toaster position="top-right" />
        
        <header className={styles.header}>
          <div className={styles.headerContent}>
            <h1 className={styles.headerTitle}>BAL Editor - Test Suite</h1>
            <button 
              className={styles.headerAction} 
              onClick={() => setShowTestSuite(false)}
              aria-label="Back to Main App"
            >
              <BookOpen size={20} />
              <span style={{ marginLeft: '8px' }}>Back to App</span>
            </button>
          </div>
        </header>

        <main className={styles.mainContent}>
          <BALEditorTestSuite />
        </main>
      </div>
    );
  }

  return (
    <div className={styles.appContainer}>
      {/* Toast notifications */}
      {/* CARBON_CONVERT: Replace Toaster with Carbon ToastNotification */}
      <Toaster position="top-right" />

      {/* Carbon-style Header */}
      {/* CARBON_CONVERT: Replace custom header with Carbon Header, HeaderName, HeaderGlobalBar, HeaderGlobalAction */}
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.headerTitle}>Rich Text Editor Platform</h1>
          <div style={{ display: 'flex', gap: '8px' }}>
            <button 
              className={styles.headerAction} 
              onClick={() => setShowTestSuite(true)}
              aria-label="Open Test Suite"
              title="Open BAL Editor Test Suite"
            >
              {/* CARBON_CONVERT: Replace FlaskConical with <TestTool /> from @carbon/icons-react */}
              <FlaskConical size={20} />
              <span style={{ marginLeft: '8px' }}>Test Suite</span>
            </button>
            <button 
              className={styles.headerAction}
              onClick={() => setShowDataModelPanel(true)}
              aria-label="Data Models"
              title="Manage Data Models"
            >
              {/* CARBON_CONVERT: Replace Database with <DataBase /> from @carbon/icons-react */}
              <Database size={20} />
              <span style={{ marginLeft: '8px' }}>Data Models</span>
            </button>
            <button className={styles.headerAction} aria-label="Documentation">
              {/* CARBON_CONVERT: Replace BookOpen with <Book /> from @carbon/icons-react */}
              <BookOpen size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className={styles.mainContent}>
        <div className={styles.contentWrapper}>
          {/* Page Header */}
          <div className={styles.pageHeader}>
            <h2 className={styles.pageTitle}>Editor Testing Suite</h2>
            <p className={styles.pageDescription}>
              Test and explore three powerful editor implementations: Business Automation Language (BAL),
              Rich Text Editor with content blocks, and Markdown Editor with live preview.
            </p>
          </div>

          {/* Editor Type Tabs */}
          {/* CARBON_CONVERT: Replace shadcn Tabs with Carbon Tabs component */}
          <Tabs value={selectedEditorType} onValueChange={handleTabChange} className={styles.editorTabs}>
            <TabsList className={styles.tabsList}>
              {/* CARBON_CONVERT: Replace TabsTrigger with Carbon Tab */}
              <TabsTrigger value="bal" className={styles.tabTrigger}>
                {/* CARBON_CONVERT: Replace Code with <Code /> from @carbon/icons-react */}
                <Code size={16} />
                <span>BAL Editor</span>
              </TabsTrigger>
              <TabsTrigger value="richtext" className={styles.tabTrigger}>
                {/* CARBON_CONVERT: Replace FileText with <DocumentBlank /> from @carbon/icons-react */}
                <FileText size={16} />
                <span>Rich Text Editor</span>
              </TabsTrigger>
              <TabsTrigger value="markdown" className={styles.tabTrigger}>
                {/* CARBON_CONVERT: Replace Edit3 with <Edit /> from @carbon/icons-react */}
                <Edit3 size={16} />
                <span>Markdown Editor</span>
              </TabsTrigger>
              <TabsTrigger value="formula" className={styles.tabTrigger}>
                {/* CARBON_CONVERT: Replace Calculator with <Formula /> from @carbon/icons-react */}
                <Calculator size={16} />
                <span>Formula Editor</span>
              </TabsTrigger>
            </TabsList>

            {/* BAL Editor Panel */}
            {/* CARBON_CONVERT: Replace TabsContent with Carbon TabPanel */}
            <TabsContent value="bal" className={styles.tabContent}>
              <div className={styles.editorGrid}>
                <div className={styles.editorColumn}>
                  <div className={styles.editorWrapper}>
                    <EditorContainer
                      editorType="bal"
                      initialDocumentId="loan-approval"
                      balContent={balContent}
                      onBalContentChange={setBalContent}
                      balName={balName}
                      onBalNameChange={setBalName}
                      balDescription={balDescription}
                      onBalDescriptionChange={setBalDescription}
                      balReturnType={balReturnType}
                      onBalReturnTypeChange={setBalReturnType}
                    />
                  </div>
                </div>
                <div className={styles.featuresColumn}>
                  {/* Sidebar tabs for BAL editor */}
                  <div className={styles.sidebarTabs}>
                    <button
                      className={`${styles.sidebarTab} ${balSidebarTab === 'details' ? styles.active : ''}`}
                      onClick={() => setBalSidebarTab('details')}
                    >
                      Details
                    </button>
                    <button
                      className={`${styles.sidebarTab} ${balSidebarTab === 'datamodel' ? styles.active : ''}`}
                      onClick={() => setBalSidebarTab('datamodel')}
                    >
                      Data Model
                    </button>
                    <button
                      className={`${styles.sidebarTab} ${balSidebarTab === 'test' ? styles.active : ''}`}
                      onClick={() => setBalSidebarTab('test')}
                    >
                      Test
                    </button>
                  </div>
                  <div className={styles.sidebarContent}>
                    {balSidebarTab === 'details' ? (
                      <FormulaDetailsPanel
                        formulaName={balName}
                        formulaDescription={balDescription}
                        formulaReturnType={balReturnType}
                        onMetadataChange={(metadata) => {
                          if (metadata.name !== undefined) setBalName(metadata.name);
                          if (metadata.description !== undefined) setBalDescription(metadata.description);
                          if (metadata.returnType !== undefined) setBalReturnType(metadata.returnType);
                        }}
                        mode="bal"
                      />
                    ) : balSidebarTab === 'datamodel' ? (
                      <BALDataModelPanel />
                    ) : (
                      <FormulaTestPanel
                        mode="bal"
                        variables={[]}
                        attributes={balTestAttributes}
                        formulaCode={balContent}
                        returnType={balReturnType}
                      />
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Rich Text Editor Panel */}
            <TabsContent value="richtext" className={styles.tabContent}>
              <div className={styles.editorGrid}>
                <div className={styles.editorColumn}>
                  <div className={styles.editorWrapper}>
                    <EditorContainer
                      editorType="richtext"
                      initialDocumentId="project-plan"
                    />
                  </div>
                </div>
                <div className={styles.featuresColumn}>
                  <FeatureList editorType="richtext" />
                </div>
              </div>
            </TabsContent>

            {/* Markdown Editor Panel */}
            <TabsContent value="markdown" className={styles.tabContent}>
              <div className={styles.editorGrid}>
                <div className={styles.editorColumn}>
                  <div className={styles.editorWrapper}>
                    <EditorContainer
                      editorType="markdown"
                      initialDocumentId="technical-spec"
                    />
                  </div>
                </div>
                <div className={styles.featuresColumn}>
                  <FeatureList editorType="markdown" />
                </div>
              </div>
            </TabsContent>

            {/* Formula Editor Panel */}
            <TabsContent value="formula" className={styles.tabContent}>
              <div className={styles.editorGrid}>
                <div className={styles.editorColumn}>
                  <div className={styles.editorWrapper}>
                    <EditorContainer
                      editorType="formula"
                      initialDocumentId="customer-discount"
                      formulaVariables={formulaVariables}
                      onFormulaVariablesChange={setFormulaVariables}
                      formulaContent={formulaContent}
                      onFormulaContentChange={setFormulaContent}
                      formulaName={formulaName}
                      onFormulaNameChange={setFormulaName}
                      formulaDescription={formulaDescription}
                      onFormulaDescriptionChange={setFormulaDescription}
                      formulaReturnType={formulaReturnType}
                      onFormulaReturnTypeChange={setFormulaReturnType}
                      formulaThresholds={formulaThresholds}
                      onFormulaThresholdsChange={setFormulaThresholds}
                      debugHighlight={debugHighlight}
                      onDebugHighlightChange={setDebugHighlight}
                      errorHighlight={errorHighlight}
                      onErrorHighlightChange={setErrorHighlight}
                      warningHighlights={warningHighlights}
                      onWarningHighlightsChange={setWarningHighlights}
                      onLineIssuesChange={setLineIssues}
                      onDocumentChange={handleClearDebugOutput}
                    />
                  </div>
                </div>
                <div className={styles.featuresColumn}>
                  {/* Sidebar tabs for Formula editor */}
                  <div className={styles.sidebarTabs}>
                    <button
                      className={`${styles.sidebarTab} ${formulaSidebarTab === 'details' ? styles.active : ''}`}
                      onClick={() => setFormulaSidebarTab('details')}
                    >
                      Details
                    </button>
                    <button
                      className={`${styles.sidebarTab} ${formulaSidebarTab === 'variables' ? styles.active : ''}`}
                      onClick={() => setFormulaSidebarTab('variables')}
                    >
                      Variables
                    </button>
                    <button
                      className={`${styles.sidebarTab} ${formulaSidebarTab === 'testing' ? styles.active : ''}`}
                      onClick={() => setFormulaSidebarTab('testing')}
                    >
                      Test
                    </button>
                  </div>
                  <div className={styles.sidebarContent}>
                    {formulaSidebarTab === 'details' && (
                      <FormulaDetailsPanel
                        formulaName={formulaName}
                        formulaDescription={formulaDescription}
                        formulaReturnType={formulaReturnType}
                        thresholds={formulaThresholds}
                        onMetadataChange={(metadata) => {
                          if (metadata.name !== undefined) setFormulaName(metadata.name);
                          if (metadata.description !== undefined) setFormulaDescription(metadata.description);
                          if (metadata.returnType !== undefined) setFormulaReturnType(metadata.returnType);
                        }}
                        onThresholdsChange={setFormulaThresholds}
                        mode="formula"
                      />
                    )}
                    {formulaSidebarTab === 'variables' && (
                      <VariableTable
                        variables={formulaVariables}
                        onCreate={handleVariableCreate}
                        onUpdate={handleVariableUpdate}
                        onDelete={handleVariableDelete}
                      />
                    )}
                    {/* Always render FormulaTestPanel to keep ref valid, but hide when not active */}
                    <div style={{ display: formulaSidebarTab === 'testing' ? 'block' : 'none' }}>
                      <FormulaTestPanel
                        ref={testPanelRef}
                        mode="formula"
                        variables={formulaVariables}
                        formulaCode={formulaContent}
                        returnType={formulaReturnType}
                        thresholds={formulaThresholds}
                        onDebugHighlight={setDebugHighlight}
                        onErrorHighlight={setErrorHighlight}
                        onWarningHighlight={setWarningHighlights}
                        lineIssues={lineIssues}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Keyboard Shortcuts Help Modal */}
      <KeyboardShortcutsHelp
        isOpen={showKeyboardHelp}
        onClose={() => setShowKeyboardHelp(false)}
      />
      
      {/* Data Model Management Panel */}
      <DataModelPanel
        isOpen={showDataModelPanel}
        onClose={() => setShowDataModelPanel(false)}
      />
    </div>
  );
}