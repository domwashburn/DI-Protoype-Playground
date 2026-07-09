/**
 * EditorContainer Component (Smart Component)
 * 
 * Container component that manages state and business logic for all editor types.
 * Handles auto-save, document loading, and editor type switching.
 * 
 * Phase 5.11.4 Part 2: Updated to use BALEditorWithVocabulary
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React, { useState, useEffect, useCallback } from 'react';
// CARBON_CONVERT: Replace toast from 'sonner@2.0.3' with ToastNotification from '@carbon/react'
import { toast } from 'sonner@2.0.3';
// CARBON_CONVERT: Replace Loader2 with <Loading /> from '@carbon/icons-react' or Loading component from '@carbon/react'
import { Loader2, GitCompare } from 'lucide-react';
// CARBON_CONVERT: Replace shadcn Select with Carbon Select, SelectItem from '@carbon/react'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '../ui/select';
// CARBON_CONVERT: Replace shadcn Switch with Carbon Toggle from '@carbon/react'
import { Switch } from '../ui/switch';
// CARBON_CONVERT: Replace shadcn Label with Carbon FormLabel from '@carbon/react'
import { Label } from '../ui/label';
// CARBON_CONVERT: Replace shadcn Button with Carbon Button from '@carbon/react'
import { Button } from '../ui/button';
import { BALEditorWithVocabulary as BALEditor, type BALError } from '../BALEditor';
import { RichTextEditor } from '../RichTextEditor';
import { MarkdownEditor } from '../MarkdownEditorNew';
import { FormulaEditor } from '../editors/code/FormulaEditor';
import { DiffViewer } from '../DiffViewer';
import { AutoSaveIndicator } from '../AutoSaveIndicator';
import { useAutoSave } from '../../hooks/useAutoSave';
import { useKeyboardShortcuts } from '../../hooks/useKeyboardShortcuts';
import { editorService, type EditorType } from '../../services/editorService';
import type { ContentBlock } from '../../SampleData/richTextSamples';
import type { Variable, Threshold } from '../editors/core/types';
import type { DebugHighlight } from '../../utils/debugHighlighting';
import type { ErrorHighlight, WarningHighlight } from '../editors/code/FormulaEditor/FormulaTestPanel';
import type { LineIssue } from '../editors/code/FormulaEditor/ErrorWarningList';
import { balSamples } from '../../SampleData/balSamples';
import { richTextSamples } from '../../SampleData/richTextSamples';
import { markdownSamples } from '../../SampleData/markdownSamples';
import { formulaSamples } from '../../SampleData/formulaSamples';
import styles from './EditorContainer.module.css';

export interface EditorContainerProps {
  /** Type of editor to display */
  editorType: EditorType;
  /** Initial document ID to load */
  initialDocumentId?: string;
  /** Callback when editor type changes */
  onEditorTypeChange?: (type: EditorType) => void;
  /** Formula variables (for Formula Editor) */
  formulaVariables?: Variable[];
  /** Callback when formula variables change */
  onFormulaVariablesChange?: (variables: Variable[]) => void;
  /** Formula content (for Formula Editor) */
  formulaContent?: string;
  /** Callback when formula content changes */
  onFormulaContentChange?: (content: string) => void;
  /** Formula name */
  formulaName?: string;
  /** Callback when formula name changes */
  onFormulaNameChange?: (name: string) => void;
  /** Formula description */
  formulaDescription?: string;
  /** Callback when formula description changes */
  onFormulaDescriptionChange?: (description: string) => void;
  /** Formula return type */
  formulaReturnType?: 'number' | 'string' | 'boolean' | 'date' | 'time';
  /** Callback when formula return type changes */
  onFormulaReturnTypeChange?: (returnType: 'number' | 'string' | 'boolean' | 'date' | 'time') => void;
  /** Formula thresholds */
  formulaThresholds?: Threshold[];
  /** Callback when formula thresholds change */
  onFormulaThresholdsChange?: (thresholds: Threshold[]) => void;
  /** BAL content (for BAL Editor) */
  balContent?: string;
  /** Callback when BAL content changes */
  onBalContentChange?: (content: string) => void;
  /** BAL name */
  balName?: string;
  /** Callback when BAL name changes */
  onBalNameChange?: (name: string) => void;
  /** BAL description */
  balDescription?: string;
  /** Callback when BAL description changes */
  onBalDescriptionChange?: (description: string) => void;
  /** BAL return type */
  balReturnType?: 'number' | 'string' | 'boolean' | 'date' | 'time';
  /** Callback when BAL return type changes */
  onBalReturnTypeChange?: (returnType: 'number' | 'string' | 'boolean' | 'date' | 'time') => void;
  /** Debug highlight state (Phase 3) */
  debugHighlight?: DebugHighlight | null;
  /** Callback when debug highlight changes */
  onDebugHighlightChange?: (highlight: DebugHighlight | null) => void;
  /** Error highlight state (error line indication) */
  errorHighlight?: ErrorHighlight | null;
  /** Callback when error highlight changes */
  onErrorHighlightChange?: (highlight: ErrorHighlight | null) => void;
  /** Warning highlights state (warning line indications) */
  warningHighlights?: WarningHighlight[];
  /** Callback when warning highlights change */
  onWarningHighlightsChange?: (highlights: WarningHighlight[]) => void;
  /** Line issues state (CRIT-002: error/warning list) */
  lineIssues?: LineIssue[];
  /** Callback when line issues change */
  onLineIssuesChange?: (issues: LineIssue[]) => void;
  /** Callback when document changes (for clearing results) */
  onDocumentChange?: () => void;
}

/**
 * EditorContainer - Smart component managing editor state and operations
 */
export const EditorContainer: React.FC<EditorContainerProps> = ({
  editorType,
  initialDocumentId,
  onEditorTypeChange,
  formulaVariables,
  onFormulaVariablesChange,
  formulaContent,
  onFormulaContentChange,
  formulaName,
  onFormulaNameChange,
  formulaDescription,
  onFormulaDescriptionChange,
  formulaReturnType,
  onFormulaReturnTypeChange,
  formulaThresholds,
  onFormulaThresholdsChange,
  balContent,
  onBalContentChange,
  balName,
  onBalNameChange,
  balDescription,
  onBalDescriptionChange,
  balReturnType,
  onBalReturnTypeChange,
  debugHighlight,
  onDebugHighlightChange,
  errorHighlight,
  onErrorHighlightChange,
  warningHighlights,
  onWarningHighlightsChange,
  lineIssues,
  onLineIssuesChange,
  onDocumentChange
}) => {
  // State
  const [autoSaveEnabled, setAutoSaveEnabled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [currentDocumentId, setCurrentDocumentId] = useState(initialDocumentId || '');
  const [diffMode, setDiffMode] = useState(false);
  const [compareDocumentId, setCompareDocumentId] = useState('');
  const [isLoadingCompare, setIsLoadingCompare] = useState(false);

  // BAL state
  const [internalBalContent, setInternalBalContent] = useState('');
  const [balErrors, setBalErrors] = useState<BALError[]>([]);
  const [balCompareContent, setBalCompareContent] = useState('');

  // Rich text state
  const [richTextBlocks, setRichTextBlocks] = useState<ContentBlock[]>([]);
  const [richTextCompareBlocks, setRichTextCompareBlocks] = useState<ContentBlock[]>([]);

  // Markdown state
  const [markdownContent, setMarkdownContent] = useState('');
  const [markdownCompareContent, setMarkdownCompareContent] = useState('');

  // Formula state
  const [internalFormulaContent, setInternalFormulaContent] = useState('');
  const [formulaCompareContent, setFormulaCompareContent] = useState('');

  // Use parent's formula content if provided, otherwise use internal state
  const currentFormulaContent = formulaContent !== undefined ? formulaContent : internalFormulaContent;
  
  const handleFormulaContentChange = (content: string) => {
    if (onFormulaContentChange) {
      onFormulaContentChange(content);
    } else {
      setInternalFormulaContent(content);
    }
  };

  // Use parent's BAL content if provided, otherwise use internal state
  const currentBalContent = balContent !== undefined ? balContent : internalBalContent;
  
  const handleBalContentChange = (content: string) => {
    if (onBalContentChange) {
      onBalContentChange(content);
    } else {
      setInternalBalContent(content);
    }
  };

  /**
   * Load document based on editor type and document ID
   */
  useEffect(() => {
    if (!currentDocumentId) return;

    const loadDocument = async () => {
      setIsLoading(true);
      
      try {
        switch (editorType) {
          case 'bal': {
            const response = await editorService.loadBALDocument(currentDocumentId);
            if (response.success && response.data) {
              handleBalContentChange(response.data.content);
              setBalErrors([]);
              
              // Update metadata
              if (onBalNameChange) {
                onBalNameChange(response.data.title);
              }
              if (onBalDescriptionChange) {
                onBalDescriptionChange(response.data.description);
              }
              // BAL return type is typically 'string' for decisions
              if (onBalReturnTypeChange) {
                onBalReturnTypeChange('string');
              }
            }
            break;
          }
          
          case 'richtext': {
            const response = await editorService.loadRichTextDocument(currentDocumentId);
            if (response.success && response.data) {
              setRichTextBlocks(response.data.blocks);
            }
            break;
          }
          
          case 'markdown': {
            const response = await editorService.loadMarkdownDocument(currentDocumentId);
            if (response.success && response.data) {
              setMarkdownContent(response.data.content);
            }
            break;
          }

          case 'formula': {
            const response = await editorService.loadFormulaDocument(currentDocumentId);
            if (response.success && response.data) {
              // Update content
              if (onFormulaContentChange) {
                onFormulaContentChange(response.data.formula);
              } else {
                setInternalFormulaContent(response.data.formula);
              }
              
              // Update variables
              if (onFormulaVariablesChange) {
                onFormulaVariablesChange(response.data.variables);
              }
              
              // Update metadata
              if (onFormulaNameChange) {
                onFormulaNameChange(response.data.formulaName);
              }
              if (onFormulaDescriptionChange) {
                onFormulaDescriptionChange(response.data.description);
              }
              if (onFormulaReturnTypeChange) {
                onFormulaReturnTypeChange(response.data.formulaReturnType);
              }
              if (onFormulaThresholdsChange) {
                onFormulaThresholdsChange(response.data.thresholds);
              }
              
              // Clear debug/error/warning highlights when switching samples
              if (onDebugHighlightChange) {
                onDebugHighlightChange(null);
              }
              if (onErrorHighlightChange) {
                onErrorHighlightChange(null);
              }
              if (onWarningHighlightsChange) {
                onWarningHighlightsChange([]);
              }
            }
            break;
          }
        }
      } catch (error) {
        toast.error('Failed to load document');
        console.error('Load error:', error);
      } finally {
        setIsLoading(false);
        if (onDocumentChange) {
          onDocumentChange();
        }
      }
    };

    loadDocument();
  }, [editorType, currentDocumentId, onFormulaVariablesChange]);

  /**
   * Load compare document for diff mode
   */
  useEffect(() => {
    if (!compareDocumentId || !diffMode) return;

    const loadCompareDocument = async () => {
      setIsLoadingCompare(true);
      try {
        switch (editorType) {
          case 'bal': {
            const response = await editorService.loadBALDocument(compareDocumentId);
            if (response.success && response.data) {
              setBalCompareContent(response.data.content);
            }
            break;
          }
          
          case 'richtext': {
            const response = await editorService.loadRichTextDocument(compareDocumentId);
            if (response.success && response.data) {
              setRichTextCompareBlocks(response.data.blocks);
            }
            break;
          }
          
          case 'markdown': {
            const response = await editorService.loadMarkdownDocument(compareDocumentId);
            if (response.success && response.data) {
              setMarkdownCompareContent(response.data.content);
            }
            break;
          }

          case 'formula': {
            const response = await editorService.loadFormulaDocument(compareDocumentId);
            if (response.success && response.data) {
              setFormulaCompareContent(response.data.formula);
            }
            break;
          }
        }
      } catch (error) {
        toast.error('Failed to load comparison document');
        console.error('Load error:', error);
      } finally {
        setIsLoadingCompare(false);
      }
    };

    loadCompareDocument();
  }, [editorType, compareDocumentId, diffMode]);

  /**
   * Auto-save for BAL editor
   */
  const balAutoSave = useAutoSave({
    content: currentBalContent,
    onSave: async (content) => {
      await editorService.saveBALDocument(currentDocumentId, content);
    },
    enabled: autoSaveEnabled && editorType === 'bal',
    delay: 2000,
    onSaveSuccess: () => {
      // toast.success('BAL document saved');
    },
    onSaveError: (error) => {
      toast.error('Failed to save BAL document');
      console.error('Save error:', error);
    }
  });

  /**
   * Auto-save for rich text editor
   */
  const richTextAutoSave = useAutoSave({
    content: richTextBlocks,
    onSave: async (blocks) => {
      const doc = richTextSamples.find(d => d.id === currentDocumentId);
      if (doc) {
        await editorService.saveRichTextDocument(currentDocumentId, {
          ...doc,
          blocks
        });
      }
    },
    enabled: autoSaveEnabled && editorType === 'richtext',
    delay: 2000,
    onSaveSuccess: () => {
      // toast.success('Rich text document saved');
    },
    onSaveError: (error) => {
      toast.error('Failed to save rich text document');
      console.error('Save error:', error);
    }
  });

  /**
   * Auto-save for markdown editor
   */
  const markdownAutoSave = useAutoSave({
    content: markdownContent,
    onSave: async (content) => {
      await editorService.saveMarkdownDocument(currentDocumentId, content);
    },
    enabled: autoSaveEnabled && editorType === 'markdown',
    delay: 2000,
    onSaveSuccess: () => {
      // toast.success('Markdown document saved');
    },
    onSaveError: (error) => {
      toast.error('Failed to save markdown document');
      console.error('Save error:', error);
    }
  });

  /**
   * Auto-save for formula editor
   */
  const formulaAutoSave = useAutoSave({
    content: currentFormulaContent,
    onSave: async (content) => {
      await editorService.saveFormulaDocument(currentDocumentId, content);
    },
    enabled: autoSaveEnabled && editorType === 'formula',
    delay: 2000,
    onSaveSuccess: () => {
      // toast.success('Formula document saved');
    },
    onSaveError: (error) => {
      toast.error('Failed to save formula document');
      console.error('Save error:', error);
    }
  });

  /**
   * Handle BAL validation
   */
  const handleBALValidation = useCallback(async () => {
    const result = await editorService.validateBAL(currentBalContent);
    setBalErrors(result.errors);
    if (!result.valid) {
      toast.error(`Found ${result.errors.length} syntax error(s)`);
    }
  }, [currentBalContent]);

  /**
   * Get current auto-save state based on editor type
   */
  const getCurrentAutoSaveState = () => {
    switch (editorType) {
      case 'bal':
        return balAutoSave;
      case 'richtext':
        return richTextAutoSave;
      case 'markdown':
        return markdownAutoSave;
      case 'formula':
        return formulaAutoSave;
      default:
        return balAutoSave;
    }
  };

  const autoSaveState = getCurrentAutoSaveState();

  /**
   * Get available documents for current editor type
   */
  const getAvailableDocuments = () => {
    switch (editorType) {
      case 'bal':
        return balSamples;
      case 'richtext':
        return richTextSamples;
      case 'markdown':
        return markdownSamples;
      case 'formula':
        return formulaSamples;
      default:
        return [];
    }
  };

  const availableDocuments = getAvailableDocuments();

  /**
   * Get documents in display order (as shown in the dropdown UI)
   * This matches the visual order: uncategorized first, then categories in specific order
   */
  const getDocumentsInDisplayOrder = () => {
    const docs = getAvailableDocuments();
    
    // Category configuration (matches dropdown rendering order)
    const categoryOrder = [
      'business-rules',
      'basic-functions',
      'verbalizations',
      'loops',
      'arrays-objects',
      'datetime',
      'threshold-strategies',
      'error-tests',
    ];
    
    // Separate uncategorized and categorized documents
    const categorized: Record<string, typeof docs> = {};
    const uncategorized: typeof docs = [];
    
    docs.forEach(doc => {
      const category = (doc as any).category;
      if (category && categoryOrder.includes(category)) {
        if (!categorized[category]) {
          categorized[category] = [];
        }
        categorized[category].push(doc);
      } else {
        uncategorized.push(doc);
      }
    });
    
    // Build ordered list: uncategorized first, then categories in order
    const orderedDocs: typeof docs = [
      ...uncategorized,
      ...categoryOrder.flatMap(categoryKey => categorized[categoryKey] || [])
    ];
    
    return orderedDocs;
  };

  /**
   * Navigate to next example
   */
  const handleNextExample = useCallback(() => {
    const orderedDocs = getDocumentsInDisplayOrder();
    const currentIndex = orderedDocs.findIndex(doc => doc.id === currentDocumentId);
    if (currentIndex < orderedDocs.length - 1) {
      const nextDoc = orderedDocs[currentIndex + 1];
      setCurrentDocumentId(nextDoc.id);
      toast.success(`Loaded: ${nextDoc.title}`);
    }
  }, [currentDocumentId, editorType]);

  /**
   * Navigate to previous example
   */
  const handlePreviousExample = useCallback(() => {
    const orderedDocs = getDocumentsInDisplayOrder();
    const currentIndex = orderedDocs.findIndex(doc => doc.id === currentDocumentId);
    if (currentIndex > 0) {
      const prevDoc = orderedDocs[currentIndex - 1];
      setCurrentDocumentId(prevDoc.id);
      toast.success(`Loaded: ${prevDoc.title}`);
    }
  }, [currentDocumentId, editorType]);

  /**
   * Navigate to first example
   */
  const handleFirstExample = useCallback(() => {
    const orderedDocs = getDocumentsInDisplayOrder();
    if (orderedDocs.length > 0) {
      const firstDoc = orderedDocs[0];
      setCurrentDocumentId(firstDoc.id);
      toast.success(`Jump to first: ${firstDoc.title}`);
    }
  }, [editorType]);

  /**
   * Navigate to last example
   */
  const handleLastExample = useCallback(() => {
    const orderedDocs = getDocumentsInDisplayOrder();
    if (orderedDocs.length > 0) {
      const lastDoc = orderedDocs[orderedDocs.length - 1];
      setCurrentDocumentId(lastDoc.id);
      toast.success(`Jump to last: ${lastDoc.title}`);
    }
  }, [editorType]);

  /**
   * Navigate to first example in current section (category)
   * If already at first item in section, jump to last item in previous section (with wrap-around)
   */
  const handleFirstInSection = useCallback(() => {
    const orderedDocs = getDocumentsInDisplayOrder();
    const currentIndex = orderedDocs.findIndex(doc => doc.id === currentDocumentId);
    
    if (currentIndex === -1 || orderedDocs.length === 0) return;
    
    const currentDoc = orderedDocs[currentIndex];
    const currentCategory = (currentDoc as any).category;
    
    // Find first document in same category
    const firstInCategoryIndex = orderedDocs.findIndex(doc => (doc as any).category === currentCategory);
    
    // If we're already at the first item in this section, jump to last item in previous section
    if (currentIndex === firstInCategoryIndex) {
      // Find previous section (category different from current)
      let targetIndex = -1;
      
      // Go backwards to find a different category
      for (let i = currentIndex - 1; i >= 0; i--) {
        const docCategory = (orderedDocs[i] as any).category;
        if (docCategory !== currentCategory) {
          // Found a different category at index i
          // Now find the LAST item in this category by going forward
          targetIndex = i;
          for (let j = i + 1; j < currentIndex; j++) {
            if ((orderedDocs[j] as any).category === docCategory) {
              targetIndex = j; // Update to later item in same category
            } else {
              break; // Hit a different category, we've found the last item
            }
          }
          break;
        }
      }
      
      // If no previous section found, wrap to last item in list
      if (targetIndex === -1) {
        targetIndex = orderedDocs.length - 1;
      }
      
      const targetDoc = orderedDocs[targetIndex];
      setCurrentDocumentId(targetDoc.id);
      toast.success(`← ${targetDoc.title}`);
    } else {
      // Jump to first item in current section
      const firstInCategory = orderedDocs[firstInCategoryIndex];
      setCurrentDocumentId(firstInCategory.id);
      toast.success(`← ${firstInCategory.title}`);
    }
  }, [currentDocumentId, editorType]);

  /**
   * Navigate to last example in current section (category)
   * If already at last item in section, jump to first item in next section (with wrap-around)
   */
  const handleLastInSection = useCallback(() => {
    const orderedDocs = getDocumentsInDisplayOrder();
    const currentIndex = orderedDocs.findIndex(doc => doc.id === currentDocumentId);
    
    if (currentIndex === -1 || orderedDocs.length === 0) return;
    
    const currentDoc = orderedDocs[currentIndex];
    const currentCategory = (currentDoc as any).category;
    
    // Find last document in same category
    const docsInCategory = orderedDocs.filter(doc => (doc as any).category === currentCategory);
    const lastInCategory = docsInCategory[docsInCategory.length - 1];
    const lastInCategoryIndex = orderedDocs.findIndex(doc => doc.id === lastInCategory.id);
    
    // If we're already at the last item in this section, jump to first item in next section
    if (currentIndex === lastInCategoryIndex) {
      // Find next section's first item
      let nextSectionFirstIndex = -1;
      
      // Go forward to find the first item of the next section
      for (let i = currentIndex + 1; i < orderedDocs.length; i++) {
        const docCategory = (orderedDocs[i] as any).category;
        // If we hit a different category, this is the first item of next section
        if (docCategory !== currentCategory) {
          nextSectionFirstIndex = i;
          break;
        }
      }
      
      // If no next section found, wrap to first item in list
      if (nextSectionFirstIndex === -1) {
        nextSectionFirstIndex = 0;
      }
      
      const targetDoc = orderedDocs[nextSectionFirstIndex];
      setCurrentDocumentId(targetDoc.id);
      toast.success(`→ ${targetDoc.title}`);
    } else {
      // Jump to last item in current section
      setCurrentDocumentId(lastInCategory.id);
      toast.success(`→ ${lastInCategory.title}`);
    }
  }, [currentDocumentId, editorType]);

  /**
   * Keyboard shortcuts
   * Note: Other shortcuts (tab cycling, debug, test) are handled by parent App component
   */
  useKeyboardShortcuts({
    onNextExample: handleNextExample,
    onPreviousExample: handlePreviousExample,
    onFirstExample: handleFirstExample,
    onLastExample: handleLastExample,
    onFirstInSection: handleFirstInSection,
    onLastInSection: handleLastInSection,
    enabled: true
  });

  /**
   * Helper to convert rich text blocks to string for diff viewing
   */
  const richTextBlocksToString = (blocks: ContentBlock[]): string => {
    return blocks.map(block => {
      const prefix = block.type === 'heading' ? `${'#'.repeat(block.level || 1)} ` : '';
      return `${prefix}${block.content}`;
    }).join('\n\n');
  };

  /**
   * Get diff content based on editor type
   */
  const getDiffContent = () => {
    const currentDoc = availableDocuments.find(doc => doc.id === currentDocumentId);
    const compareDoc = availableDocuments.find(doc => doc.id === compareDocumentId);

    switch (editorType) {
      case 'bal':
        return {
          original: balCompareContent,
          modified: currentBalContent,
          originalLabel: compareDoc?.title || 'Original',
          modifiedLabel: currentDoc?.title || 'Modified'
        };
      case 'richtext':
        return {
          original: richTextBlocksToString(richTextCompareBlocks),
          modified: richTextBlocksToString(richTextBlocks),
          originalLabel: compareDoc?.title || 'Original',
          modifiedLabel: currentDoc?.title || 'Modified'
        };
      case 'markdown':
        return {
          original: markdownCompareContent,
          modified: markdownContent,
          originalLabel: compareDoc?.title || 'Original',
          modifiedLabel: currentDoc?.title || 'Modified'
        };
      case 'formula':
        return {
          original: formulaCompareContent,
          modified: currentFormulaContent,
          originalLabel: compareDoc?.title || 'Original',
          modifiedLabel: currentDoc?.title || 'Modified'
        };
      default:
        return {
          original: '',
          modified: '',
          originalLabel: 'Original',
          modifiedLabel: 'Modified'
        };
    }
  };

  return (
    <div className={styles.editorContainer}>
      {/* Controls Bar */}
      <div className={styles.editorControls}>
        <div className={styles.controlsLeft}>
          <div className={styles.controlGroup}>
            {/* CARBON_CONVERT: Replace shadcn Label with Carbon FormLabel */}
            <Label htmlFor="document-select" className={styles.controlLabel}>
              Document:
            </Label>
            {/* CARBON_CONVERT: Replace shadcn Select with Carbon Select */}
            <Select
              value={currentDocumentId}
              onValueChange={setCurrentDocumentId}
            >
              <SelectTrigger id="document-select" className={styles.documentSelect}>
                <SelectValue placeholder="Select a document" />
              </SelectTrigger>
              <SelectContent>
                {(() => {
                  // Group documents by category
                  const categoryLabels: Record<string, string> = {
                    'business-rules': 'Business Rules',
                    'basic-functions': 'Basic Functions',
                    'arrays-objects': 'Arrays & Objects',
                    'loops': 'Loops & Iteration',
                    'verbalizations': 'Natural Language (Verbalizations)',
                    'datetime': 'Date & Time Functions',
                    'threshold-strategies': 'Threshold Strategies',
                    'error-tests': 'Error Tests',
                  };
                  
                  const categorized: Record<string, typeof availableDocuments> = {};
                  const uncategorized: typeof availableDocuments = [];
                  
                  availableDocuments.forEach(doc => {
                    const category = (doc as any).category;
                    if (category && categoryLabels[category]) {
                      if (!categorized[category]) {
                        categorized[category] = [];
                      }
                      categorized[category].push(doc);
                    } else {
                      uncategorized.push(doc);
                    }
                  });
                  
                  const categoryOrder = [
                    'business-rules',
                    'basic-functions',
                    'verbalizations',
                    'loops',
                    'arrays-objects',
                    'datetime',
                    'threshold-strategies',
                    'error-tests',
                  ];
                  
                  return (
                    <>
                      {uncategorized.length > 0 && uncategorized.map((doc) => (
                        <SelectItem key={doc.id} value={doc.id}>
                          {doc.title}
                        </SelectItem>
                      ))}
                      
                      {categoryOrder.map(categoryKey => {
                        const docs = categorized[categoryKey];
                        if (!docs || docs.length === 0) return null;
                        
                        return (
                          <SelectGroup key={categoryKey}>
                            <SelectLabel>{categoryLabels[categoryKey]}</SelectLabel>
                            {docs.map((doc) => (
                              <SelectItem key={doc.id} value={doc.id}>
                                {doc.title}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        );
                      })}
                    </>
                  );
                })()}
              </SelectContent>
            </Select>
          </div>

          {diffMode && (
            <div className={styles.controlGroup}>
              {/* CARBON_CONVERT: Replace shadcn Label with Carbon FormLabel */}
              <Label htmlFor="compare-select" className={styles.controlLabel}>
                Compare to:
              </Label>
              {/* CARBON_CONVERT: Replace shadcn Select with Carbon Select */}
              <Select
                value={compareDocumentId}
                onValueChange={setCompareDocumentId}
              >
                <SelectTrigger id="compare-select" className={styles.documentSelect}>
                  <SelectValue placeholder="Select a document" />
                </SelectTrigger>
                <SelectContent>
                  {availableDocuments.filter(doc => doc.id !== currentDocumentId).map((doc) => (
                    <SelectItem key={doc.id} value={doc.id}>
                      {doc.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </div>

        <div className={styles.controlsRight}>
          <div className={styles.controlGroup}>
            {/* CARBON_CONVERT: Replace shadcn Button with Carbon Button */}
            <Button
              variant={diffMode ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setDiffMode(!diffMode);
                if (!diffMode && availableDocuments.length > 1) {
                  const otherDoc = availableDocuments.find(doc => doc.id !== currentDocumentId);
                  if (otherDoc) {
                    setCompareDocumentId(otherDoc.id);
                  }
                }
              }}
            >
              <GitCompare size={16} />
              <span>{diffMode ? 'Exit Diff' : 'Compare'}</span>
            </Button>
          </div>

          {!diffMode && (
            <>
              <div className={styles.controlGroup}>
                {/* CARBON_CONVERT: Replace shadcn Label with Carbon FormLabel */}
                <Label htmlFor="auto-save-toggle" className={styles.controlLabel}>
                  Auto-save
                </Label>
                {/* CARBON_CONVERT: Replace shadcn Switch with Carbon Toggle */}
                <Switch
                  id="auto-save-toggle"
                  checked={autoSaveEnabled}
                  onCheckedChange={setAutoSaveEnabled}
                />
              </div>

              <AutoSaveIndicator
                status={autoSaveState.autoSaveStatus}
                lastSaved={autoSaveState.lastSaved}
              />
            </>
          )}
        </div>
      </div>

      {/* Editor Area */}
      <div className={styles.editorArea}>
        {/* CARBON_CONVERT: Replace Loader2 with Carbon Loading component */}
        {isLoading ? (
          <div className={styles.editorLoading}>
            {/* CARBON_CONVERT: Replace Loader2 icon with Carbon Loading component */}
            <Loader2 className={styles.loadingSpinner} size={32} />
            <p className={styles.loadingText}>Loading document...</p>
          </div>
        ) : diffMode ? (
          // Diff Viewer Mode - show even if compareDocumentId is not yet selected
          compareDocumentId ? (
            <DiffViewer
              {...getDiffContent()}
              contentType={editorType}
              className={styles.editorInstance}
            />
          ) : (
            <div className={styles.editorLoading}>
              <p className={styles.loadingText}>Select a document to compare with</p>
            </div>
          )
        ) : (
          // Regular Editor Mode
          <>
            {editorType === 'bal' && (
              <BALEditor
                value={currentBalContent}
                onChange={handleBalContentChange}
                errors={balErrors}
                onValidate={handleBALValidation}
                className={styles.editorInstance}
              />
            )}

            {editorType === 'richtext' && (
              <RichTextEditor
                blocks={richTextBlocks}
                onChange={setRichTextBlocks}
                className={styles.editorInstance}
              />
            )}

            {editorType === 'markdown' && (
              <MarkdownEditor
                value={markdownContent}
                onChange={setMarkdownContent}
                className={styles.editorInstance}
              />
            )}

            {editorType === 'formula' && (
              <FormulaEditor
                value={currentFormulaContent}
                onChange={handleFormulaContentChange}
                variables={formulaVariables}
                onVariablesChange={onFormulaVariablesChange}
                formulaName={formulaName}
                formulaDescription={formulaDescription}
                formulaReturnType={formulaReturnType}
                onFormulaMetadataChange={(metadata) => {
                  if (metadata.name !== undefined && onFormulaNameChange) {
                    onFormulaNameChange(metadata.name);
                  }
                  if (metadata.description !== undefined && onFormulaDescriptionChange) {
                    onFormulaDescriptionChange(metadata.description);
                  }
                  if (metadata.returnType !== undefined && onFormulaReturnTypeChange) {
                    onFormulaReturnTypeChange(metadata.returnType);
                  }
                }}
                debugHighlight={debugHighlight}
                errorHighlight={errorHighlight}
                warningHighlights={warningHighlights}
                onWarningHighlightsChange={onWarningHighlightsChange}
                onLineIssuesChange={onLineIssuesChange}
                className={styles.editorInstance}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};