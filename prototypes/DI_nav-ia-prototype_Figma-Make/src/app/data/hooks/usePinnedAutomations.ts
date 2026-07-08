/**
 * usePinnedAutomations
 * 
 * Manages pinned decision automations using browser localStorage.
 * Persists across browser sessions until explicitly cleared.
 * 
 * Constraints:
 * - Min: 0 pinned items
 * - Max: 4 pinned items
 * 
 * @returns {Object} Pinned automations data and management methods
 * @returns {PinnedAutomation[]} pinnedAutomations - Up to 4 pinned automations
 * @returns {Function} pinAutomation - Pin an automation
 * @returns {Function} unpinAutomation - Unpin an automation
 * @returns {Function} isPinned - Check if an automation is pinned
 * @returns {Function} clearPinnedAutomations - Clear all pinned automations
 * @returns {Function} setPinnedAutomationsList - Set pinned automations from a list of automation objects
 * 
 * @example
 * const { pinnedAutomations, pinAutomation, unpinAutomation, isPinned } = usePinnedAutomations();
 * 
 * // Pin an automation
 * pinAutomation({
 *   id: 'auto-001',
 *   name: 'Credit Scoring',
 *   description: 'Automated credit scoring service',
 *   serviceCount: '5 decision services'
 * });
 * 
 * // Check if pinned
 * if (isPinned('auto-001')) {
 *   unpinAutomation('auto-001');
 * }
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'decisionAutomations_pinnedItems';
const MAX_PINNED_ITEMS = 4;

export interface PinnedAutomation {
  id: string;
  name: string;
  description: string;
  serviceCount: string;
  pinnedAt: number; // Timestamp
}

interface AutomationToPin {
  id: string;
  name: string;
  description: string;
  serviceCount: string;
}

export function usePinnedAutomations() {
  const [pinnedAutomations, setPinnedAutomations] = useState<PinnedAutomation[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    loadPinnedAutomations();
    
    // Listen for storage changes (from other tabs or components)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadPinnedAutomations();
      }
    };
    
    // Listen for custom event (for same-page updates)
    const handleCustomStorageChange = () => {
      loadPinnedAutomations();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('pinnedAutomationsChanged', handleCustomStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('pinnedAutomationsChanged', handleCustomStorageChange);
    };
  }, []);

  const loadPinnedAutomations = useCallback(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as PinnedAutomation[];
        // Ensure we don't exceed max items
        const limited = parsed.slice(0, MAX_PINNED_ITEMS);
        setPinnedAutomations(limited);
      } else {
        // First-time initialization: Set default pinned items
        const defaultPinned: PinnedAutomation[] = [
          {
            id: 'test-6', // Dynamic Pricing Automation
            name: 'Dynamic Pricing Automation',
            description: 'Real-time pricing optimization based on demand, inventory, and competitive analysis',
            serviceCount: '3 decision services',
            pinnedAt: Date.now() - 3000 // Slightly different timestamps
          },
          {
            id: 'test-1', // Customer Churn Prevention
            name: 'Customer Churn Prevention',
            description: 'ML-powered customer churn prediction with automated retention campaign triggers',
            serviceCount: '2 decision services',
            pinnedAt: Date.now() - 2000
          },
          {
            id: 'test-2', // Regulatory Compliance Monitoring
            name: 'Regulatory Compliance Monitoring',
            description: 'Comprehensive regulatory compliance monitoring across multiple jurisdictions',
            serviceCount: '4 decision services',
            pinnedAt: Date.now() - 1000
          }
        ];
        
        setPinnedAutomations(defaultPinned);
        saveToStorage(defaultPinned);
      }
      setIsInitialized(true);
    } catch (error) {
      console.error('Failed to load pinned automations from localStorage:', error);
      setPinnedAutomations([]);
      setIsInitialized(true);
    }
  }, []);

  const saveToStorage = useCallback((automations: PinnedAutomation[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(automations));
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('pinnedAutomationsChanged'));
    } catch (error) {
      console.error('Failed to save pinned automations to localStorage:', error);
    }
  }, []);

  /**
   * Pin an automation
   * Only pins if we haven't reached the max (4 items)
   */
  const pinAutomation = useCallback((automation: AutomationToPin) => {
    setPinnedAutomations(current => {
      // Check if already pinned
      if (current.some(a => a.id === automation.id)) {
        return current;
      }
      
      // Check if we've reached max
      if (current.length >= MAX_PINNED_ITEMS) {
        console.warn(`Cannot pin automation: Maximum of ${MAX_PINNED_ITEMS} items reached`);
        return current;
      }
      
      // Add to end of list
      const updated = [
        ...current,
        {
          ...automation,
          pinnedAt: Date.now()
        }
      ];
      
      // Save to localStorage
      saveToStorage(updated);
      
      return updated;
    });
  }, [saveToStorage]);

  /**
   * Unpin an automation
   */
  const unpinAutomation = useCallback((automationId: string) => {
    setPinnedAutomations(current => {
      const updated = current.filter(a => a.id !== automationId);
      
      // Save to localStorage
      saveToStorage(updated);
      
      return updated;
    });
  }, [saveToStorage]);

  /**
   * Check if an automation is pinned
   */
  const isPinned = useCallback((automationId: string) => {
    return pinnedAutomations.some(a => a.id === automationId);
  }, [pinnedAutomations]);

  /**
   * Clear all pinned automations
   */
  const clearPinnedAutomations = useCallback(() => {
    setPinnedAutomations([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('pinnedAutomationsChanged'));
    } catch (error) {
      console.error('Failed to clear pinned automations from localStorage:', error);
    }
  }, []);

  /**
   * Set pinned automations from a list of automation objects
   * Replaces the entire pinned list
   */
  const setPinnedAutomationsList = useCallback((automations: AutomationToPin[]) => {
    const pinnedList: PinnedAutomation[] = automations
      .slice(0, MAX_PINNED_ITEMS) // Ensure max limit
      .map((automation, index) => ({
        ...automation,
        pinnedAt: Date.now() + index // Ensure unique timestamps in order
      }));
    
    setPinnedAutomations(pinnedList);
    saveToStorage(pinnedList);
  }, [saveToStorage]);

  return {
    pinnedAutomations,
    pinAutomation,
    unpinAutomation,
    isPinned,
    clearPinnedAutomations,
    setPinnedAutomationsList,
    isInitialized
  };
}