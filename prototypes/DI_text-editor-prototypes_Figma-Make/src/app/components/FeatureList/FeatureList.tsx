/**
 * FeatureList Component (Presentational)
 * 
 * Displays a list of features for testing editor capabilities.
 * Organized by editor type with checkboxes for manual testing tracking.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React, { useState } from 'react';
// CARBON_CONVERT: Replace Check with <Checkmark /> from @carbon/icons-react
import { Check } from 'lucide-react';
// CARBON_CONVERT: Replace shadcn Accordion with Carbon Accordion, AccordionItem from '@carbon/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
// CARBON_CONVERT: Replace shadcn Checkbox with Carbon Checkbox from '@carbon/react'
import { Checkbox } from '../ui/checkbox';
// CARBON_CONVERT: Replace shadcn Label with Carbon FormLabel from '@carbon/react'
import { Label } from '../ui/label';
import type { EditorType } from '../../services/editorService';
import styles from './FeatureList.module.css';

export interface Feature {
  id: string;
  name: string;
  description: string;
  howToTest: string;
}

export interface FeatureCategory {
  category: string;
  features: Feature[];
}

export interface FeatureListProps {
  /** Editor type to show features for */
  editorType: EditorType;
  /** Custom className */
  className?: string;
}

const BAL_FEATURES: FeatureCategory[] = [
  {
    category: 'Syntax Highlighting',
    features: [
      {
        id: 'bal-keywords',
        name: 'Keyword Highlighting',
        description: 'BAL keywords like if, then, else, set are highlighted in blue',
        howToTest: 'Type BAL keywords and verify they appear in blue color'
      },
      {
        id: 'bal-strings',
        name: 'String Highlighting',
        description: 'Quoted strings are highlighted in green',
        howToTest: "Type 'variable name' and verify it appears in green"
      },
      {
        id: 'bal-numbers',
        name: 'Number Highlighting',
        description: 'Numeric values are highlighted in purple',
        howToTest: 'Type numbers like 100, 3.14 and verify purple highlighting'
      },
      {
        id: 'bal-operators',
        name: 'Operator Highlighting',
        description: 'BAL operators are highlighted in pink',
        howToTest: 'Type "is greater than" and verify pink highlighting'
      }
    ]
  },
  {
    category: 'Editor Features',
    features: [
      {
        id: 'bal-line-numbers',
        name: 'Line Numbers',
        description: 'Line numbers displayed in left gutter',
        howToTest: 'Verify line numbers appear and update as you add lines'
      },
      {
        id: 'bal-tab-indentation',
        name: 'Tab Indentation',
        description: 'Tab key inserts 2 spaces for indentation',
        howToTest: 'Press Tab key and verify 2 spaces are inserted'
      },
      {
        id: 'bal-validation',
        name: 'Syntax Validation',
        description: 'Inline error detection and display',
        howToTest: 'Press Ctrl+S to validate, check for error notifications'
      },
      {
        id: 'bal-error-indicators',
        name: 'Error Line Indicators',
        description: 'Lines with errors show red dot in gutter',
        howToTest: 'Trigger validation with errors, verify red dots appear'
      }
    ]
  },
  {
    category: 'Auto-Save',
    features: [
      {
        id: 'bal-autosave',
        name: 'Auto-Save Functionality',
        description: 'Content automatically saves after 2 seconds of inactivity',
        howToTest: 'Type content and wait 2 seconds, verify "Saving..." then "Saved" status'
      },
      {
        id: 'bal-autosave-debounce',
        name: 'Debounced Saving',
        description: 'Save is debounced while typing',
        howToTest: 'Type continuously, verify status shows "Pending..." until you stop'
      },
      {
        id: 'bal-autosave-toggle',
        name: 'Auto-Save Toggle',
        description: 'Can enable/disable auto-save',
        howToTest: 'Toggle auto-save off, make changes, verify no auto-save occurs'
      }
    ]
  }
];

const RICHTEXT_FEATURES: FeatureCategory[] = [
  {
    category: 'Block Types',
    features: [
      {
        id: 'rte-paragraph',
        name: 'Paragraph Blocks',
        description: 'Standard text paragraphs',
        howToTest: 'Create new blocks and type text'
      },
      {
        id: 'rte-headings',
        name: 'Heading Blocks (H1, H2, H3)',
        description: 'Multiple heading levels with appropriate sizing',
        howToTest: 'Use block menu to change block type to H1, H2, or H3'
      },
      {
        id: 'rte-lists',
        name: 'List Blocks',
        description: 'Bullet lists and numbered lists',
        howToTest: 'Change block type to bullet or numbered list'
      },
      {
        id: 'rte-checkboxes',
        name: 'Checkbox Blocks',
        description: 'Interactive checkboxes for tasks',
        howToTest: 'Create checkbox block and toggle checkbox state'
      },
      {
        id: 'rte-code',
        name: 'Code Blocks',
        description: 'Code blocks with monospace font',
        howToTest: 'Change block type to code and enter code'
      },
      {
        id: 'rte-quote',
        name: 'Quote Blocks',
        description: 'Blockquote styling with left border',
        howToTest: 'Change block type to quote'
      },
      {
        id: 'rte-callout',
        name: 'Callout Blocks',
        description: 'Highlighted callout boxes',
        howToTest: 'Change block type to callout'
      },
      {
        id: 'rte-divider',
        name: 'Divider Blocks',
        description: 'Horizontal rule separators',
        howToTest: 'Change block type to divider'
      }
    ]
  },
  {
    category: 'Block Operations',
    features: [
      {
        id: 'rte-add-block',
        name: 'Add New Block',
        description: 'Press Enter to create new block',
        howToTest: 'Press Enter at end of block to create new paragraph'
      },
      {
        id: 'rte-delete-block',
        name: 'Delete Block',
        description: 'Press Backspace on empty block or use menu',
        howToTest: 'Clear block content and press Backspace, or use delete button'
      },
      {
        id: 'rte-change-type',
        name: 'Change Block Type',
        description: 'Convert blocks between different types',
        howToTest: 'Click drag handle, select new type from dropdown'
      },
      {
        id: 'rte-reorder',
        name: 'Reorder Blocks',
        description: 'Move blocks up and down',
        howToTest: 'Click drag handle and use Move Up/Down buttons'
      }
    ]
  },
  {
    category: 'Auto-Save',
    features: [
      {
        id: 'rte-autosave',
        name: 'Auto-Save Functionality',
        description: 'Blocks automatically save after changes',
        howToTest: 'Add/edit blocks, wait 2 seconds, verify save indicator'
      }
    ]
  }
];

const MARKDOWN_FEATURES: FeatureCategory[] = [
  {
    category: 'Markdown Syntax',
    features: [
      {
        id: 'md-headings',
        name: 'Headings',
        description: 'Support for # H1, ## H2, ### H3',
        howToTest: 'Type # Heading and view in preview'
      },
      {
        id: 'md-bold',
        name: 'Bold Text',
        description: '**bold** or __bold__',
        howToTest: 'Type **bold** and view in preview or use toolbar button'
      },
      {
        id: 'md-italic',
        name: 'Italic Text',
        description: '*italic* or _italic_',
        howToTest: 'Type *italic* and view in preview or use toolbar button'
      },
      {
        id: 'md-strikethrough',
        name: 'Strikethrough',
        description: '~~strikethrough~~',
        howToTest: 'Type ~~text~~ and view in preview or use toolbar button'
      },
      {
        id: 'md-lists',
        name: 'Lists',
        description: 'Bullet lists (-) and numbered lists (1.)',
        howToTest: 'Type - item or 1. item and view in preview'
      },
      {
        id: 'md-checkboxes',
        name: 'Task Lists',
        description: '- [ ] unchecked, - [x] checked',
        howToTest: 'Type - [ ] task and view in preview'
      },
      {
        id: 'md-links',
        name: 'Links',
        description: '[text](url)',
        howToTest: 'Type [Link](https://example.com) or use toolbar button'
      },
      {
        id: 'md-code',
        name: 'Inline Code',
        description: '`code`',
        howToTest: 'Type `code` and view in preview or use toolbar button'
      },
      {
        id: 'md-code-blocks',
        name: 'Code Blocks',
        description: '```language\\ncode\\n```',
        howToTest: 'Type ``` and code, or use toolbar button'
      },
      {
        id: 'md-quotes',
        name: 'Blockquotes',
        description: '> quote',
        howToTest: 'Type > quote or use toolbar button'
      }
    ]
  },
  {
    category: 'View Modes',
    features: [
      {
        id: 'md-edit-mode',
        name: 'Edit Mode',
        description: 'Full-width editor for writing',
        howToTest: 'Click "Edit" button in toolbar'
      },
      {
        id: 'md-preview-mode',
        name: 'Preview Mode',
        description: 'Rendered markdown preview',
        howToTest: 'Click "Preview" button in toolbar'
      },
      {
        id: 'md-split-mode',
        name: 'Split View',
        description: 'Side-by-side edit and preview',
        howToTest: 'Click "Split" button in toolbar'
      },
      {
        id: 'md-raw-view',
        name: 'Raw Markdown View',
        description: 'View raw markdown in preview mode',
        howToTest: 'In preview mode, click code icon to toggle raw view'
      }
    ]
  },
  {
    category: 'Toolbar Features',
    features: [
      {
        id: 'md-toolbar-formatting',
        name: 'Formatting Buttons',
        description: 'Quick access to common markdown formatting',
        howToTest: 'Select text and click toolbar buttons to apply formatting'
      },
      {
        id: 'md-toolbar-headings',
        name: 'Heading Buttons',
        description: 'Quick insert for H1, H2, H3',
        howToTest: 'Click H1, H2, or H3 buttons'
      },
      {
        id: 'md-toolbar-lists',
        name: 'List Buttons',
        description: 'Quick insert for lists and checkboxes',
        howToTest: 'Click bullet, number, or checkbox buttons'
      }
    ]
  },
  {
    category: 'Auto-Save',
    features: [
      {
        id: 'md-autosave',
        name: 'Auto-Save Functionality',
        description: 'Content automatically saves while editing',
        howToTest: 'Edit content, wait 2 seconds, verify save indicator'
      }
    ]
  }
];

/**
 * FeatureList - Interactive checklist of editor features
 */
export const FeatureList: React.FC<FeatureListProps> = ({
  editorType,
  className = ''
}) => {
  const [checkedFeatures, setCheckedFeatures] = useState<Set<string>>(new Set());

  const getFeatures = (): FeatureCategory[] => {
    switch (editorType) {
      case 'bal':
        return BAL_FEATURES;
      case 'richtext':
        return RICHTEXT_FEATURES;
      case 'markdown':
        return MARKDOWN_FEATURES;
      default:
        return [];
    }
  };

  const features = getFeatures();

  const toggleFeature = (featureId: string) => {
    const newChecked = new Set(checkedFeatures);
    if (newChecked.has(featureId)) {
      newChecked.delete(featureId);
    } else {
      newChecked.add(featureId);
    }
    setCheckedFeatures(newChecked);
  };

  const totalFeatures = features.reduce((sum, cat) => sum + cat.features.length, 0);
  const checkedCount = checkedFeatures.size;
  const progress = totalFeatures > 0 ? Math.round((checkedCount / totalFeatures) * 100) : 0;

  return (
    <div className={`${styles.featureList} ${className}`}>
      <div className={styles.featureHeader}>
        <h3 className={styles.featureTitle}>Testing Checklist</h3>
        <div className={styles.featureProgress}>
          <span className={styles.progressText}>
            {checkedCount} / {totalFeatures} tested ({progress}%)
          </span>
          {/* CARBON_CONVERT: Replace custom progress bar with Carbon ProgressBar */}
          <div className={styles.progressBar}>
            <div className={styles.progressFill} style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>

      {/* CARBON_CONVERT: Replace shadcn Accordion with Carbon Accordion */}
      <Accordion type="multiple" defaultValue={[features[0]?.category || '']} className={styles.featureAccordion}>
        {features.map((category) => {
          const categoryChecked = category.features.filter(f => checkedFeatures.has(f.id)).length;
          const categoryTotal = category.features.length;
          
          return (
            <AccordionItem key={category.category} value={category.category}>
              <AccordionTrigger className={styles.categoryTrigger}>
                {category.category} ({categoryChecked}/{categoryTotal})
              </AccordionTrigger>
              <AccordionContent>
                <div className={styles.featureCategory}>
                  {category.features.map((feature) => (
                    <div key={feature.id} className={styles.featureItem}>
                      <div className={styles.featureItemHeader}>
                        {/* CARBON_CONVERT: Replace shadcn Checkbox with Carbon Checkbox */}
                        <Checkbox
                          id={feature.id}
                          checked={checkedFeatures.has(feature.id)}
                          onCheckedChange={() => toggleFeature(feature.id)}
                          className={styles.featureCheckbox}
                        />
                        <div className={styles.featureInfo}>
                          {/* CARBON_CONVERT: Replace shadcn Label with Carbon FormLabel */}
                          <Label htmlFor={feature.id} className={styles.featureName}>
                            {feature.name}
                          </Label>
                          <div className={styles.featureDescription}>{feature.description}</div>
                          <div className={styles.featureTest}>
                            <strong>How to test:</strong> {feature.howToTest}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
};
