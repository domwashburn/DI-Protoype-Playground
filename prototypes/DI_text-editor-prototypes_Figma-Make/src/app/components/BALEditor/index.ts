/**
 * BALEditor - Business Automation Language Editor
 * 
 * Production-ready code editor for BAL with syntax highlighting,
 * autocomplete, and natural cursor behavior.
 * 
 * Uses textarea + overlay architecture for zero cursor jumping.
 * 
 * Phase 5.11.4: Added BALEditorWithVocabulary wrapper
 */

export { BALEditor, type BALEditorProps, type BALEditorHandle, type BALError } from './BALEditor';
export { BALEditorWithVocabulary } from './BALEditorWithVocabulary';