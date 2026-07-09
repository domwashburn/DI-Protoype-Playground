/**
 * Initialize Data Model Service
 * 
 * Registers sample extensions with the data model service.
 * This should be called once at app startup.
 */

import { dataModelService } from '../services/dataModelService';
import { ALL_EXTENSIONS } from './dataModelExtensions';

/**
 * Initialize the data model service with sample data
 */
export function initializeDataModelService(): void {
  // Register all sample extensions
  for (const extension of ALL_EXTENSIONS) {
    dataModelService.registerExtension(extension);
  }
  
  console.log(`[Data Model Service] Initialized with ${ALL_EXTENSIONS.length} extensions`);
}

/**
 * Reset the data model service (for testing)
 */
export function resetDataModelService(): void {
  // This would clear all extensions if we had a method for it
  // For now, just log
  console.log('[Data Model Service] Reset requested');
}
