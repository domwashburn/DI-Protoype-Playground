/**
 * ObjectiveHierarchyTree Component
 * 
 * Displays the hierarchical structure of objectives showing:
 * - Parent objectives
 * - Sibling objectives
 * - Child objectives
 * - Grandchild objectives
 * 
 * Highlights the current objective in the hierarchy.
 */

import React from 'react';
import styles from './ObjectiveHierarchyTree.module.css';
import { BusinessObjective } from '../../data/objectives/types';

interface ObjectiveHierarchyTreeProps {
  currentObjective: BusinessObjective;
  allObjectives: BusinessObjective[];
}

interface HierarchyNode {
  parent?: BusinessObjective;
  siblings: BusinessObjective[];
  children: BusinessObjective[];
  grandchildren: Map<string, BusinessObjective[]>; // Map of child ID to its children
}

export default function ObjectiveHierarchyTree({
  currentObjective,
  allObjectives,
}: ObjectiveHierarchyTreeProps) {
  
  // Build the hierarchy structure
  const hierarchy: HierarchyNode = React.useMemo(() => {
    const parent = currentObjective.parentId
      ? allObjectives.find(obj => obj.id === currentObjective.parentId)
      : undefined;
    
    const siblings = parent?.childIds
      ? allObjectives.filter(obj => 
          parent.childIds?.includes(obj.id) && obj.id !== currentObjective.id
        )
      : [];
    
    const children = currentObjective.childIds
      ? allObjectives.filter(obj => currentObjective.childIds?.includes(obj.id))
      : [];
    
    const grandchildren = new Map<string, BusinessObjective[]>();
    children.forEach(child => {
      if (child.childIds && child.childIds.length > 0) {
        const childrenOfChild = allObjectives.filter(obj => 
          child.childIds?.includes(obj.id)
        );
        grandchildren.set(child.id, childrenOfChild);
      }
    });
    
    return { parent, siblings, children, grandchildren };
  }, [currentObjective, allObjectives]);

  const hasHierarchy = hierarchy.parent || hierarchy.children.length > 0 || hierarchy.siblings.length > 0;

  const renderObjectiveItem = (objective: BusinessObjective, isCurrent: boolean = false) => (
    <div key={objective.id} className={`${styles.treeItem} ${isCurrent ? styles.current : ''}`}>
      <div className={styles.itemContent}>
        <div className={styles.itemHeader}>
          <h4 className={styles.itemName}>{objective.name}</h4>
          <div className={styles.itemMeta}>
            <span className={`${styles.itemStatus} ${styles[`status-${objective.status}`]}`}>
              {objective.status.replace('-', ' ')}
            </span>
            <span className={styles.itemProgress}>{objective.progress}%</span>
          </div>
        </div>
        <p className={styles.itemDescription}>{objective.description}</p>
      </div>
    </div>
  );

  if (!hasHierarchy) {
    return (
      <div className={styles.emptyState}>
        <h3 className={styles.emptyStateTitle}>No hierarchy</h3>
        <p className={styles.emptyStateText}>
          This objective is not part of a hierarchical structure. It exists as a standalone objective.
        </p>
      </div>
    );
  }

  return (
    <div className={styles.hierarchyContainer}>
      <div className={styles.hierarchyHeader}>
        <h2 className={styles.hierarchyTitle}>Objective Hierarchy</h2>
        <p className={styles.hierarchyDescription}>
          This shows how "{currentObjective.name}" fits within the organizational objective structure.
        </p>
      </div>

      {/* Parent Objective */}
      {hierarchy.parent && (
        <div className={styles.treeSection}>
          <span className={styles.sectionLabel}>Parent Objective</span>
          <div className={styles.treeList}>
            {renderObjectiveItem(hierarchy.parent, false)}
          </div>
        </div>
      )}

      {/* Siblings */}
      {hierarchy.siblings.length > 0 && (
        <div className={styles.treeSection}>
          <span className={styles.sectionLabel}>
            Sibling Objectives ({hierarchy.siblings.length})
          </span>
          <div className={styles.treeList}>
            {hierarchy.siblings.map(sibling => renderObjectiveItem(sibling, false))}
          </div>
        </div>
      )}

      {/* Current Objective */}
      <div className={styles.treeSection}>
        <span className={styles.sectionLabel}>Current Objective</span>
        <div className={styles.treeList}>
          {renderObjectiveItem(currentObjective, true)}
        </div>
      </div>

      {/* Child Objectives */}
      {hierarchy.children.length > 0 && (
        <div className={styles.treeSection}>
          <span className={styles.sectionLabel}>
            Child Objectives ({hierarchy.children.length})
          </span>
          <div className={styles.treeList}>
            {hierarchy.children.map(child => (
              <div key={child.id}>
                {renderObjectiveItem(child, false)}
                
                {/* Grandchildren */}
                {hierarchy.grandchildren.has(child.id) && (
                  <div className={styles.nestedList}>
                    {hierarchy.grandchildren.get(child.id)?.map(grandchild =>
                      renderObjectiveItem(grandchild, false)
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
