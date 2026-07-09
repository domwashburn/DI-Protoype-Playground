/**
 * BALDataModelPanel - Combined Data Model & Dictionary Panel
 * 
 * Displays BAL attributes and dictionary vocabulary with a context switcher.
 * Combines BALDataModel (attributes) and BALDictionary (vocabulary) into a single panel
 * with tabbed navigation at the top.
 * 
 * CARBON_CONVERT: This component uses CSS modules with Carbon Design System principles.
 * Replace shadcn/ui components with Carbon equivalents when converting.
 */

import { useState } from 'react';
// TODO: Replace with import from '@carbon/react' when package is installed
import { ContentSwitcher, Switch } from '../ui/carbon';
import { BALDataModel } from '../BALDataModel';
import { BALDictionary } from '../BALDictionary';
import styles from './BALDataModelPanel.module.css';

export interface BALDataModelPanelProps {
  /** Custom className */
  className?: string;
}

export function BALDataModelPanel({ className = '' }: BALDataModelPanelProps) {
  const [activeContext, setActiveContext] = useState<'attributes' | 'dictionary'>('attributes');

  return (
    <div className={`${styles.dataModelPanel} ${className}`}>
      {/* Context Switcher (Sticky) */}
      <div className={styles.contextSwitcher}>
        <ContentSwitcher
          size="sm"
          onChange={({ index }) => setActiveContext(index === 0 ? 'attributes' : 'dictionary')}
          selectedIndex={activeContext === 'attributes' ? 0 : 1}
        >
          <Switch>Attributes</Switch>
          <Switch>Dictionary</Switch>
        </ContentSwitcher>
      </div>

      {/* Content */}
      <div className={styles.panelContent}>
        {activeContext === 'attributes' ? (
          <BALDataModel className={styles.contentWrapper} />
        ) : (
          <BALDictionary className={styles.contentWrapper} />
        )}
      </div>
    </div>
  );
}