/**
 * BAL Editor Vocabulary Demo
 * 
 * Phase 5.11.4 Part 2
 * 
 * Demonstration component showing vocabulary integration in BAL Editor.
 * Useful for testing and validating vocabulary features.
 * 
 * @module BALEditor/BALEditorVocabularyDemo
 */

import React, { useState, useEffect } from 'react';
import { BALEditorWithVocabulary } from './BALEditorWithVocabulary';
import { 
  getVocabularyFeatureStatus,
  updateVocabularyConfig 
} from '../../services/evaluationEngine/config/vocabularyConfig';
import { initializeVocabularySystem } from '../../services/vocabulary';
import { getVocabularyResolver } from '../../services/evaluationEngine/parsers/VocabularyResolver';

/**
 * Sample BAL code with vocabulary terms
 */
const SAMPLE_CODE = `// Sample BAL code with vocabulary terms
if the credit score is greater than 700 then
  set the approval status to "approved"
  set the interest rate to 3.5
otherwise if the credit score is greater than 600 then
  set the approval status to "conditional"
  set the interest rate to 5.0
otherwise
  set the approval status to "denied"
end

// Using vocabulary terms
if the annual income is greater than 50000 then
  set the debt-to-income ratio to the total debt divided by the annual income
end`;

/**
 * BAL Editor Vocabulary Demo Component
 */
export function BALEditorVocabularyDemo() {
  const [code, setCode] = useState(SAMPLE_CODE);
  const [initialized, setInitialized] = useState(false);
  const [vocabularyStatus, setVocabularyStatus] = useState<any>(null);
  const [vocabularyTerms, setVocabularyTerms] = useState<string[]>([]);
  
  // Initialize vocabulary system
  useEffect(() => {
    async function init() {
      try {
        await initializeVocabularySystem();
        setInitialized(true);
        
        // Get status
        const status = getVocabularyFeatureStatus();
        setVocabularyStatus(status);
        
        // Get available terms
        const resolver = getVocabularyResolver();
        if (resolver.isEnabled()) {
          const terms = resolver.getAllTerms();
          setVocabularyTerms(terms);
        }
      } catch (error) {
        console.error('Failed to initialize vocabulary:', error);
      }
    }
    
    init();
  }, []);
  
  // Toggle vocabulary features
  const toggleVocabulary = () => {
    const current = getVocabularyFeatureStatus();
    updateVocabularyConfig({
      enabledInBAL: !current.editors.bal
    });
    setVocabularyStatus(getVocabularyFeatureStatus());
  };
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh',
      padding: '16px',
      gap: '16px',
      fontFamily: 'IBM Plex Sans, sans-serif'
    }}>
      {/* Header */}
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottom: '1px solid #e0e0e0',
        paddingBottom: '16px'
      }}>
        <div>
          <h1 style={{ margin: 0, fontSize: '24px', fontWeight: 400 }}>
            BAL Editor with Vocabulary
          </h1>
          <p style={{ margin: '4px 0 0', color: '#6f6f6f', fontSize: '14px' }}>
            Phase 5.11.4 Part 2 - Demonstration
          </p>
        </div>
        
        {initialized && (
          <div style={{ 
            display: 'flex', 
            gap: '8px',
            alignItems: 'center'
          }}>
            <span style={{ 
              fontSize: '12px',
              color: vocabularyStatus?.editors.bal ? '#24a148' : '#da1e28',
              fontWeight: 600
            }}>
              {vocabularyStatus?.editors.bal ? '✓ Vocabulary Enabled' : '✗ Vocabulary Disabled'}
            </span>
            <button
              onClick={toggleVocabulary}
              style={{
                padding: '8px 16px',
                fontSize: '14px',
                border: '1px solid #0f62fe',
                borderRadius: '4px',
                background: 'white',
                color: '#0f62fe',
                cursor: 'pointer'
              }}
            >
              Toggle Vocabulary
            </button>
          </div>
        )}
      </div>
      
      {/* Content */}
      <div style={{ 
        display: 'flex', 
        flex: 1,
        gap: '16px',
        minHeight: 0
      }}>
        {/* Editor */}
        <div style={{ 
          flex: 2,
          display: 'flex',
          flexDirection: 'column',
          minHeight: 0
        }}>
          <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>
            BAL Editor
          </h2>
          <div style={{ flex: 1, minHeight: 0 }}>
            <BALEditorWithVocabulary
              value={code}
              onChange={setCode}
            />
          </div>
        </div>
        
        {/* Sidebar */}
        <div style={{ 
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
          minHeight: 0,
          overflowY: 'auto'
        }}>
          {/* Status */}
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>
              Feature Status
            </h2>
            {vocabularyStatus && (
              <div style={{ 
                fontSize: '12px',
                fontFamily: 'IBM Plex Mono, monospace',
                background: '#f4f4f4',
                padding: '12px',
                borderRadius: '4px'
              }}>
                <div><strong>Master:</strong> {vocabularyStatus.master ? '✓' : '✗'}</div>
                <div style={{ marginTop: '8px' }}>
                  <strong>Editors:</strong>
                  <div style={{ marginLeft: '16px' }}>
                    <div>BAL: {vocabularyStatus.editors.bal ? '✓' : '✗'}</div>
                    <div>Formula: {vocabularyStatus.editors.formula ? '✓' : '✗'}</div>
                    <div>Test: {vocabularyStatus.editors.test ? '✓' : '✗'}</div>
                  </div>
                </div>
                <div style={{ marginTop: '8px' }}>
                  <strong>Features:</strong>
                  <div style={{ marginLeft: '16px' }}>
                    <div>Autocomplete: {vocabularyStatus.features.autocomplete ? '✓' : '✗'}</div>
                    <div>Syntax: {vocabularyStatus.features.syntax ? '✓' : '✗'}</div>
                    <div>Parser: {vocabularyStatus.features.parser ? '✓' : '✗'}</div>
                    <div>Validation: {vocabularyStatus.features.validation ? '✓' : '✗'}</div>
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Available Terms */}
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>
              Available Vocabulary Terms
            </h2>
            <div style={{ 
              fontSize: '12px',
              background: '#f4f4f4',
              padding: '12px',
              borderRadius: '4px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {vocabularyTerms.length > 0 ? (
                <ul style={{ 
                  margin: 0, 
                  paddingLeft: '20px',
                  listStyle: 'disc'
                }}>
                  {vocabularyTerms.map((term, i) => (
                    <li key={i} style={{ marginBottom: '4px' }}>
                      {term}
                    </li>
                  ))}
                </ul>
              ) : (
                <div style={{ color: '#6f6f6f', fontStyle: 'italic' }}>
                  No vocabulary terms loaded
                </div>
              )}
            </div>
          </div>
          
          {/* Instructions */}
          <div>
            <h2 style={{ margin: '0 0 8px', fontSize: '16px', fontWeight: 600 }}>
              Instructions
            </h2>
            <div style={{ 
              fontSize: '12px',
              background: '#e8f5e9',
              padding: '12px',
              borderRadius: '4px',
              lineHeight: '1.6'
            }}>
              <p style={{ margin: '0 0 8px' }}>
                <strong>Try typing vocabulary terms:</strong>
              </p>
              <ul style={{ margin: 0, paddingLeft: '20px' }}>
                <li>the credit score</li>
                <li>the annual income</li>
                <li>the debt-to-income ratio</li>
              </ul>
              <p style={{ margin: '12px 0 0' }}>
                <strong>Vocabulary terms will be highlighted</strong> with special styling 
                when vocabulary is enabled.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BALEditorVocabularyDemo;
