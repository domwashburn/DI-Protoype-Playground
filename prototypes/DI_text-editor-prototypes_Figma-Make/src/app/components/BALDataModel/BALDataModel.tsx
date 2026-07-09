/**
 * BALDataModel Component
 * 
 * Displays the available BAL vocabulary, attributes, and data model
 * for reference while editing BAL code.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * See /carbon-conversion.md for complete conversion mapping.
 */

import React, { useState } from 'react';
// CARBON_CONVERT: Replace shadcn Accordion with Carbon Accordion from '@carbon/react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';
// CARBON_CONVERT: Replace lucide-react icons with @carbon/icons-react
import { ChevronDown, ChevronRight, Database, List, Type } from 'lucide-react';
import { balVocabulary } from '../../SampleData/balSamples';
import styles from './BALDataModel.module.css';

export interface BALDataModelProps {
  /** Custom className */
  className?: string;
}

/**
 * BAL vocabulary and data model browser
 */
export const BALDataModel: React.FC<BALDataModelProps> = ({ className = '' }) => {
  const [expandedSections, setExpandedSections] = useState<string[]>(['keywords']);

  // Sample data model (in a real app, this would come from props or API)
  const dataModel = {
    attributes: [
      {
        name: 'employee',
        type: 'object',
        description: 'Employee information',
        subAttributes: [
          { name: 'years of service', type: 'number', description: 'Years employed' },
          { name: 'department', type: 'string', description: 'Department name' },
          { name: 'salary', type: 'number', description: 'Annual salary' },
          { name: 'performance rating', type: 'number', description: 'Performance score (1-5)' }
        ]
      },
      {
        name: 'request',
        type: 'object',
        description: 'Request information',
        subAttributes: [
          { name: 'type', type: 'string', description: 'Type of request' },
          { name: 'duration', type: 'number', description: 'Duration in days' },
          { name: 'start date', type: 'date', description: 'Request start date' },
          { name: 'reason', type: 'string', description: 'Reason for request' }
        ]
      },
      {
        name: 'policy',
        type: 'object',
        description: 'Policy information',
        subAttributes: [
          { name: 'minimum years', type: 'number', description: 'Minimum years required' },
          { name: 'maximum days', type: 'number', description: 'Maximum days allowed' },
          { name: 'blackout dates', type: 'array', description: 'Dates when requests not allowed' }
        ]
      }
    ]
  };

  return (
    <div className={`${styles.dataModelContainer} ${className}`}>
      <div className={styles.dataModelHeader}>
        <Database size={20} />
        <h3>Data Model & Vocabulary</h3>
      </div>

      <Accordion 
        type="multiple" 
        value={expandedSections}
        onValueChange={setExpandedSections}
        className={styles.dataModelAccordion}
      >
        {/* Keywords Section */}
        <AccordionItem value="keywords">
          <AccordionTrigger className={styles.sectionTrigger}>
            <List size={16} />
            <span>Keywords</span>
            <span className={styles.count}>({balVocabulary.keywords.length})</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className={styles.vocabularyList}>
              {balVocabulary.keywords.map((keyword, index) => (
                <div key={index} className={styles.vocabularyItem}>
                  <code className={styles.keyword}>{keyword}</code>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Operators Section */}
        <AccordionItem value="operators">
          <AccordionTrigger className={styles.sectionTrigger}>
            <Type size={16} />
            <span>Operators</span>
            <span className={styles.count}>({balVocabulary.operators.length})</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className={styles.vocabularyList}>
              {balVocabulary.operators.map((operator, index) => (
                <div key={index} className={styles.vocabularyItem}>
                  <code className={styles.operator}>{operator}</code>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Data Model Section */}
        <AccordionItem value="datamodel">
          <AccordionTrigger className={styles.sectionTrigger}>
            <Database size={16} />
            <span>Available Attributes</span>
            <span className={styles.count}>({dataModel.attributes.length})</span>
          </AccordionTrigger>
          <AccordionContent>
            <div className={styles.attributeList}>
              {dataModel.attributes.map((attribute, index) => (
                <AttributeItem key={index} attribute={attribute} />
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

/**
 * Individual attribute display component
 */
interface AttributeItemProps {
  attribute: {
    name: string;
    type: string;
    description: string;
    subAttributes?: Array<{
      name: string;
      type: string;
      description: string;
    }>;
  };
}

const AttributeItem: React.FC<AttributeItemProps> = ({ attribute }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasSubAttributes = attribute.subAttributes && attribute.subAttributes.length > 0;

  return (
    <div className={styles.attributeItem}>
      <div 
        className={styles.attributeHeader}
        onClick={() => hasSubAttributes && setIsExpanded(!isExpanded)}
        style={{ cursor: hasSubAttributes ? 'pointer' : 'default' }}
      >
        {hasSubAttributes && (
          <span className={styles.expandIcon}>
            {isExpanded ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
        {!hasSubAttributes && <span className={styles.expandIcon}>&nbsp;</span>}
        <div className={styles.attributeInfo}>
          <div className={styles.attributeName}>
            <code>{attribute.name}</code>
            <span className={styles.attributeType}>{attribute.type}</span>
          </div>
          <div className={styles.attributeDescription}>{attribute.description}</div>
        </div>
      </div>
      
      {hasSubAttributes && isExpanded && (
        <div className={styles.subAttributeList}>
          {attribute.subAttributes!.map((subAttr, index) => (
            <div key={index} className={styles.subAttributeItem}>
              <code>{attribute.name}.{subAttr.name}</code>
              <span className={styles.attributeType}>{subAttr.type}</span>
              <span className={styles.subAttributeDescription}>{subAttr.description}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
