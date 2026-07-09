/**
 * Editor Service - BFF (Backend for Frontend) Layer
 * This service provides an abstraction layer for editor operations
 * Can be swapped with real API calls in production
 */

import { balSamples, type BALSample } from '../SampleData/balSamples';
import { richTextSamples, type RichTextDocument } from '../SampleData/richTextSamples';
import { markdownSamples, type MarkdownDocument } from '../SampleData/markdownSamples';
import { formulaSamples, type FormulaDocument } from '../SampleData/formulaSamples';
import { objectListSamples } from '../SampleData/objectListSamples';

export type EditorType = 'bal' | 'richtext' | 'markdown' | 'formula';

export interface SaveResponse {
  success: boolean;
  timestamp: number;
  documentId: string;
  message?: string;
}

export interface LoadResponse<T> {
  success: boolean;
  data: T | null;
  message?: string;
}

/**
 * Simulates network delay for realistic testing
 */
const simulateNetworkDelay = (ms: number = 300): Promise<void> => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

/**
 * Editor Service API
 * Replace these implementations with actual API calls in production
 */
export const editorService = {
  /**
   * Load BAL document
   */
  loadBALDocument: async (documentId: string): Promise<LoadResponse<BALSample>> => {
    await simulateNetworkDelay();
    
    const document = balSamples.find(doc => doc.id === documentId);
    
    if (document) {
      return {
        success: true,
        data: document
      };
    }
    
    return {
      success: false,
      data: null,
      message: 'Document not found'
    };
  },

  /**
   * Save BAL document
   */
  saveBALDocument: async (documentId: string, content: string): Promise<SaveResponse> => {
    await simulateNetworkDelay(200);
    
    // In production, this would be an API call
    console.log('[EditorService] Saving BAL document:', { documentId, contentLength: content.length });
    
    return {
      success: true,
      timestamp: Date.now(),
      documentId,
      message: 'BAL document saved successfully'
    };
  },

  /**
   * Load Rich Text document
   */
  loadRichTextDocument: async (documentId: string): Promise<LoadResponse<RichTextDocument>> => {
    await simulateNetworkDelay();
    
    const document = richTextSamples.find(doc => doc.id === documentId);
    
    if (document) {
      return {
        success: true,
        data: document
      };
    }
    
    return {
      success: false,
      data: null,
      message: 'Document not found'
    };
  },

  /**
   * Save Rich Text document
   */
  saveRichTextDocument: async (documentId: string, document: RichTextDocument): Promise<SaveResponse> => {
    await simulateNetworkDelay(200);
    
    console.log('[EditorService] Saving Rich Text document:', { documentId, blocks: document.blocks.length });
    
    return {
      success: true,
      timestamp: Date.now(),
      documentId,
      message: 'Rich text document saved successfully'
    };
  },

  /**
   * Load Markdown document
   */
  loadMarkdownDocument: async (documentId: string): Promise<LoadResponse<MarkdownDocument>> => {
    await simulateNetworkDelay();
    
    const document = markdownSamples.find(doc => doc.id === documentId);
    
    if (document) {
      return {
        success: true,
        data: document
      };
    }
    
    return {
      success: false,
      data: null,
      message: 'Document not found'
    };
  },

  /**
   * Save Markdown document
   */
  saveMarkdownDocument: async (documentId: string, content: string): Promise<SaveResponse> => {
    await simulateNetworkDelay(200);
    
    console.log('[EditorService] Saving Markdown document:', { documentId, contentLength: content.length });
    
    return {
      success: true,
      timestamp: Date.now(),
      documentId,
      message: 'Markdown document saved successfully'
    };
  },

  /**
   * Load Formula document
   */
  loadFormulaDocument: async (documentId: string): Promise<LoadResponse<FormulaDocument>> => {
    await simulateNetworkDelay();
    
    // Merge formula samples with object/list samples
    const allFormulaSamples = [...formulaSamples, ...objectListSamples];
    const document = allFormulaSamples.find(doc => doc.id === documentId);
    
    if (document) {
      return {
        success: true,
        data: document
      };
    }
    
    return {
      success: false,
      data: null,
      message: 'Document not found'
    };
  },

  /**
   * Save Formula document
   */
  saveFormulaDocument: async (documentId: string, content: string): Promise<SaveResponse> => {
    await simulateNetworkDelay(200);
    
    console.log('[EditorService] Saving Formula document:', { documentId, contentLength: content.length });
    
    return {
      success: true,
      timestamp: Date.now(),
      documentId,
      message: 'Formula document saved successfully'
    };
  },

  /**
   * Get available documents by type
   */
  getDocumentList: async (type: EditorType): Promise<Array<{ id: string; title: string; description: string }>> => {
    await simulateNetworkDelay(150);
    
    switch (type) {
      case 'bal':
        return balSamples.map(({ id, title, description }) => ({ id, title, description }));
      case 'richtext':
        return richTextSamples.map(({ id, title, description }) => ({ id, title, description }));
      case 'markdown':
        return markdownSamples.map(({ id, title, description }) => ({ id, title, description }));
      case 'formula': {
        // Merge formula samples with object/list samples
        const allFormulaSamples = [...formulaSamples, ...objectListSamples];
        return allFormulaSamples.map(({ id, title, description }) => ({ id, title, description }));
      }
      default:
        return [];
    }
  },

  /**
   * Validate BAL syntax
   */
  validateBAL: async (_content: string): Promise<{ valid: boolean; errors: Array<{ line: number; message: string }> }> => {
    await simulateNetworkDelay(100);
    // Real BAL parser/validator is not yet implemented. The previous regex-based mock
    // produced false-positive punctuation-style errors on valid BAL syntax. Until a real
    // parser lands, return no errors so users are not misled.
    console.warn('[editorService.validateBAL] BAL validation is not yet implemented — returning no errors.');
    return { valid: true, errors: [] };
  }
};