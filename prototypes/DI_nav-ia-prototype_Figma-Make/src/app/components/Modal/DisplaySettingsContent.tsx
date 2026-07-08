/**
 * Display Settings Content Component
 * 
 * Modal content variant for home page display settings.
 * Used within the standard Modal component.
 * 
 * Features:
 * - Max 4 pinned items constraint
 * - Filled pin icon when pinned
 * - Disabled pinning when max reached
 * - Drag and drop re-ordering using react-dnd
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import { usePinnedAutomations, useAutomations, useServices } from '../../data/hooks';
import styles from './DisplaySettingsContent.module.css';
import { 
  Search, 
  X, 
  GripVertical
} from 'lucide-react';
import { DndProvider, useDrag, useDrop } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import svgPaths from '../../imports/svg-wxegm48afc';

interface DisplaySettingsContentProps {
  onApply?: () => void;
  isOpen?: boolean;
}

const ItemTypes = {
  AUTOMATION: 'automation',
};

// Original path from Figma/imports
const PIN_PATH_OUTLINE = svgPaths.p1057a580;
// Filled version: Remove the inner hole (ZM...Z)
const PIN_PATH_FILLED = PIN_PATH_OUTLINE.split('ZM')[0] + 'Z';

interface DraggableItemProps {
  id: string;
  index: number;
  name: string;
  isPinned: boolean;
  canPin: boolean;
  onTogglePin: (id: string) => void;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
}

function DraggableItem({ 
  id, 
  index, 
  name, 
  isPinned, 
  canPin, 
  onTogglePin, 
  moveItem 
}: DraggableItemProps) {
  const [{ isDragging }, drag] = useDrag({
    type: ItemTypes.AUTOMATION,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: ItemTypes.AUTOMATION,
    hover: (item: { id: string; index: number }, monitor) => {
      if (!monitor.isOver({ shallow: true })) return;
      
      const dragIndex = item.index;
      const hoverIndex = index;

      if (dragIndex === hoverIndex) {
        return;
      }

      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  return (
    <div 
      ref={(node) => {
        if (node) {
          drag(drop(node));
        }
      }}
      className={`${styles.listItem} ${isDragging ? styles.dragging : ''}`}
      style={{ opacity: isDragging ? 0.4 : 1 }}
    >
      <div className={styles.listItemContent}>
        <div className={styles.dragIcon}>
          <GripVertical size={16} />
        </div>
        <p className={styles.listItemText}>{name}</p>
        <button
          className={`${styles.pinButton} ${isPinned ? styles.pinned : ''} ${!isPinned && !canPin ? styles.disabled : ''}`}
          onClick={() => (isPinned || canPin) && onTogglePin(id)}
          disabled={!isPinned && !canPin}
          type="button"
          title={isPinned ? "Unpin" : canPin ? "Pin to home" : "Maximum of 4 items reached"}
        >
          <svg fill="none" preserveAspectRatio="none" viewBox="0 0 16 16" width="16" height="16">
            <rect fill="white" fillOpacity="0.01" height="16" width="16" />
            <path 
              d={isPinned ? PIN_PATH_FILLED : PIN_PATH_OUTLINE} 
              fill="currentColor"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function DisplaySettingsContent({ onApply, isOpen }: DisplaySettingsContentProps) {
  const [activeTab, setActiveTab] = useState<'all' | 'pinned'>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const { pinnedAutomations, setPinnedAutomationsList } = usePinnedAutomations();
  const { automations } = useAutomations();
  const { services } = useServices();

  // Staged changes
  const [orderedAutomations, setOrderedAutomations] = useState<any[]>([]);
  const [stagedPinnedIds, setStagedPinnedIds] = useState<string[]>([]);

  // Initialize state when modal opens or base data changes
  useEffect(() => {
    if (isOpen) {
      const pinnedIds = pinnedAutomations.map(p => p.id);
      setStagedPinnedIds(pinnedIds);

      const pinnedItems = pinnedIds.map(id => automations.find(a => a.id === id)).filter(Boolean);
      const otherItems = automations.filter(a => !pinnedIds.includes(a.id));
      
      setOrderedAutomations([...pinnedItems, ...otherItems]);
    }
  }, [isOpen, automations, pinnedAutomations]);

  // Create a lookup map for service counts per automation
  const serviceCountsByAutomation = useMemo(() => {
    const counts = new Map<string, number>();
    automations.forEach(automation => {
      const automationServices = services.filter(s => s.automationId === automation.id);
      counts.set(automation.id, automationServices.length);
    });
    return counts;
  }, [automations, services]);

  const isStagedPinned = (automationId: string) => {
    return stagedPinnedIds.includes(automationId);
  };

  const moveItem = useCallback((dragIndex: number, hoverIndex: number) => {
    setOrderedAutomations((prevItems) => {
      const updatedItems = [...prevItems];
      const [draggedItem] = updatedItems.splice(dragIndex, 1);
      updatedItems.splice(hoverIndex, 0, draggedItem);
      return updatedItems;
    });
  }, []);

  const handleTogglePin = (automationId: string) => {
    if (isStagedPinned(automationId)) {
      setStagedPinnedIds(current => current.filter(id => id !== automationId));
    } else {
      if (stagedPinnedIds.length >= 4) {
        return;
      }
      setStagedPinnedIds(current => [...current, automationId]);
    }
  };

  // Filter based on tab and search
  const filteredItems = useMemo(() => {
    return orderedAutomations.filter(item => {
      const name = item.displayName || item.name || '';
      const matchesSearch = name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTab = activeTab === 'all' || isStagedPinned(item.id);
      return matchesSearch && matchesTab;
    });
  }, [orderedAutomations, searchTerm, activeTab, stagedPinnedIds]);

  // Expose apply function to parent via window (standard pattern in this project)
  useEffect(() => {
    if (onApply) {
      (window as any).__displaySettingsApply = () => {
        const finalPinnedIdsInOrder = orderedAutomations
          .filter(a => stagedPinnedIds.includes(a.id))
          .map(a => a.id);

        setPinnedAutomationsList(finalPinnedIdsInOrder.map(id => {
          const automation = automations.find(a => a.id === id);
          return {
            id: automation?.id || '',
            name: automation?.displayName || automation?.name || '',
            description: automation?.description || '',
            serviceCount: `${serviceCountsByAutomation.get(automation?.id || '') || 0} decision services`
          };
        }));

        onApply();
      };
    }
  }, [stagedPinnedIds, orderedAutomations, automations, serviceCountsByAutomation, setPinnedAutomationsList, onApply]);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className={styles.content}>
        {/* Progress Section */}
        <div className={styles.progressSection}>
          <div className={styles.pinnedHeader}>
            <p className={styles.pinnedTitle}>Pinned projects</p>
            <p className={styles.pinnedCount}>{stagedPinnedIds.length} of 4 pinned items</p>
          </div>
          <div className={styles.description}>
            <p className={styles.descriptionText}>
              Pin projects to pin to your home screen for quick access by clicking the pin icon. 
              Drag and drop to change the order the projects are displayed.
            </p>
          </div>
        </div>

        {/* Content Switcher */}
        <div className={styles.contentSwitcher}>
          <button
            className={`${styles.switcherButton} ${activeTab === 'all' ? styles.active : ''}`}
            onClick={() => setActiveTab('all')}
            type="button"
          >
            All
          </button>
          <button
            className={`${styles.switcherButton} ${activeTab === 'pinned' ? styles.active : ''}`}
            onClick={() => setActiveTab('pinned')}
            type="button"
          >
            Pinned
          </button>
        </div>

        {/* Search */}
        <div className={styles.searchWrapper}>
          <div className={styles.searchInput}>
            <div className={styles.searchIcon}>
              <Search size={16} color="var(--cds-icon-primary)" />
            </div>
            <input
              type="text"
              placeholder="Find a decision project"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchField}
            />
            {searchTerm && (
              <button 
                className={styles.clearButton}
                onClick={() => setSearchTerm('')}
                type="button"
              >
                <X size={16} color="var(--cds-icon-primary)" />
              </button>
            )}
          </div>
        </div>

        {/* Automation List */}
        <div className={styles.listWrapper}>
          {filteredItems.map((automation, index) => (
            <DraggableItem
              key={automation.id}
              id={automation.id}
              index={index}
              name={automation.displayName || automation.name}
              isPinned={isStagedPinned(automation.id)}
              canPin={stagedPinnedIds.length < 4}
              onTogglePin={handleTogglePin}
              moveItem={moveItem}
            />
          ))}
          {filteredItems.length === 0 && (
            <div className={styles.emptyState}>
              <p className={styles.emptyStateText}>No projects found matching your search.</p>
            </div>
          )}
        </div>
      </div>
    </DndProvider>
  );
}
