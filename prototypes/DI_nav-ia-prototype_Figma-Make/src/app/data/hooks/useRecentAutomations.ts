/**
 * useRecentAutomations
 * 
 * Manages recently accessed decision automations using browser localStorage.
 * Persists across browser sessions until explicitly cleared.
 * 
 * @returns {Object} Recent automations data and tracking methods
 * @returns {RecentAutomation[]} recentAutomations - Up to 8 most recently accessed automations
 * @returns {Function} trackAutomationAccess - Record automation access/creation
 * @returns {Function} clearRecentAutomations - Clear all recent automations
 * 
 * @example
 * const { recentAutomations, trackAutomationAccess } = useRecentAutomations();
 * 
 * // Track when user accesses an automation
 * trackAutomationAccess({
 *   id: 'auto-001',
 *   name: 'Credit Scoring',
 *   description: 'Automated credit scoring service',
 *   serviceCount: '5 decision services'
 * });
 */

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'decisionAutomations_recentAccess';
const MAX_RECENT_ITEMS = 8;

export interface RecentAutomation {
  id: string;
  name: string;
  description: string;
  serviceCount: string;
  lastAccessed: number; // Timestamp
}

interface AutomationToTrack {
  id: string;
  name: string;
  description: string;
  serviceCount: string;
}

export function useRecentAutomations() {
  const [recentAutomations, setRecentAutomations] = useState<RecentAutomation[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    loadRecentAutomations();
    
    // Listen for storage events (when localStorage changes from other tabs/windows)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) {
        loadRecentAutomations();
      }
    };
    
    // Listen for custom event (when localStorage changes from same window)
    const handleRecentAutomationsChanged = () => {
      loadRecentAutomations();
    };
    
    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('recentAutomationsChanged', handleRecentAutomationsChanged);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('recentAutomationsChanged', handleRecentAutomationsChanged);
    };
  }, []);

  const loadRecentAutomations = () => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as RecentAutomation[];
        // Sort by most recent first (highest timestamp = most recent)
        const sorted = parsed.sort((a, b) => b.lastAccessed - a.lastAccessed);
        setRecentAutomations(sorted);
      }
    } catch (error) {
      console.error('Failed to load recent automations from localStorage:', error);
      setRecentAutomations([]);
    }
  };

  /**
   * Track automation access
   * Updates lastAccessed timestamp if automation exists, or adds it to the list
   */
  const trackAutomationAccess = useCallback((automation: AutomationToTrack) => {
    try {
      // Read current state from localStorage directly (source of truth)
      const stored = localStorage.getItem(STORAGE_KEY);
      const current = stored ? JSON.parse(stored) as RecentAutomation[] : [];
      
      // Find existing automation
      const existingIndex = current.findIndex(a => a.id === automation.id);
      
      let updated: RecentAutomation[];
      
      if (existingIndex >= 0) {
        // Update existing automation's timestamp and move to front
        const existingItem = current[existingIndex];
        updated = [
          {
            ...existingItem,
            ...automation,
            lastAccessed: Date.now()
          },
          ...current.slice(0, existingIndex),
          ...current.slice(existingIndex + 1)
        ];
      } else {
        // Add new automation to front
        updated = [
          {
            ...automation,
            lastAccessed: Date.now()
          },
          ...current
        ];
      }
      
      // Limit to MAX_RECENT_ITEMS
      const limited = updated.slice(0, MAX_RECENT_ITEMS);
      
      // Save to localStorage
      localStorage.setItem(STORAGE_KEY, JSON.stringify(limited));
      
      // Update React state
      setRecentAutomations(limited);
      
      // Dispatch custom event to notify other components
      window.dispatchEvent(new Event('recentAutomationsChanged'));
    } catch (error) {
      console.error('Failed to track automation access:', error);
    }
  }, []);

  /**
   * Clear all recent automations
   */
  const clearRecentAutomations = useCallback(() => {
    setRecentAutomations([]);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear recent automations from localStorage:', error);
    }
  }, []);

  return {
    recentAutomations,
    trackAutomationAccess,
    clearRecentAutomations
  };
}