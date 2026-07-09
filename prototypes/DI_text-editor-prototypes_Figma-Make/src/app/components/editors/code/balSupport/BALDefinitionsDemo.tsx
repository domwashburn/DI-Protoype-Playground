/**
 * BALDefinitionsDemo - Test component for useBALDefinitions hook
 * 
 * Demonstrates Phase 1 of Dynamic Keyword Highlighting epic:
 * - Extracts defined terms from BAL code
 * - Shows term locations and values
 * - Tests normalization and matching logic
 */

import { useState } from 'react';
import { useBALDefinitions, normalizeBALTerm, matchesDefinedTerm } from './hooks/useBALDefinitions';

const SAMPLE_BAL = `// Holiday Eligibility
define decision 'Holiday Eligibility'

definitions:
  set 'minimum service for fixed holidays' to 0.5;
  set 'minimum service for personal choice' to 1;
  set 'personal holidays per year' to 3;
  set 'additional holidays after 5 years' to 2;

// Rules
if the years of service of the employee is greater than or equal to the minimum service for fixed holidays
then
  set 'is eligible for fixed holidays' to true;`;

export function BALDefinitionsDemo() {
  const [code, setCode] = useState(SAMPLE_BAL);
  const { definedTerms, termLocations, termValues } = useBALDefinitions(code);
  
  const [testReference, setTestReference] = useState('the minimum service for fixed holidays');
  const [matchResults, setMatchResults] = useState<string[]>([]);

  const handleTestMatching = () => {
    const results: string[] = [];
    definedTerms.forEach(term => {
      if (matchesDefinedTerm(testReference, term)) {
        results.push(term);
      }
    });
    setMatchResults(results);
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1>BAL Definitions Extraction Demo</h1>
      <p>Phase 1 of Dynamic Keyword Highlighting Epic</p>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '20px' }}>
        {/* Code Editor */}
        <div>
          <h3>BAL Code</h3>
          <textarea
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              width: '100%',
              height: '400px',
              fontFamily: 'monospace',
              fontSize: '14px',
              padding: '10px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
        </div>

        {/* Extracted Definitions */}
        <div>
          <h3>Extracted Definitions ({definedTerms.size})</h3>
          <div style={{ 
            border: '1px solid #ccc', 
            borderRadius: '4px', 
            padding: '10px',
            maxHeight: '400px',
            overflowY: 'auto',
            backgroundColor: '#f9f9f9'
          }}>
            {definedTerms.size === 0 ? (
              <p style={{ color: '#999' }}>No definitions found</p>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ddd' }}>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Term</th>
                    <th style={{ textAlign: 'left', padding: '8px' }}>Value</th>
                    <th style={{ textAlign: 'right', padding: '8px' }}>Line</th>
                  </tr>
                </thead>
                <tbody>
                  {Array.from(definedTerms).map(term => (
                    <tr key={term} style={{ borderBottom: '1px solid #eee' }}>
                      <td style={{ 
                        padding: '8px',
                        fontFamily: 'monospace',
                        color: '#0f62fe',
                        fontWeight: 500
                      }}>
                        {term}
                      </td>
                      <td style={{ 
                        padding: '8px',
                        fontFamily: 'monospace',
                        color: '#8a3ffc'
                      }}>
                        {termValues.get(term)}
                      </td>
                      <td style={{ 
                        padding: '8px',
                        textAlign: 'right',
                        color: '#666',
                        fontFamily: 'monospace'
                      }}>
                        {termLocations.get(term)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>

      {/* Term Matching Test */}
      <div style={{ marginTop: '30px' }}>
        <h3>Term Matching Test</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Test how references in code match against defined terms (handles articles like "the", "a", etc.)
        </p>
        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <input
            type="text"
            value={testReference}
            onChange={(e) => setTestReference(e.target.value)}
            placeholder="Enter a reference (e.g., 'the minimum service')"
            style={{
              flex: 1,
              padding: '10px',
              fontSize: '14px',
              fontFamily: 'monospace',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={handleTestMatching}
            style={{
              padding: '10px 20px',
              backgroundColor: '#0f62fe',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 500
            }}
          >
            Test Match
          </button>
        </div>
        
        {matchResults.length > 0 && (
          <div style={{ 
            marginTop: '15px',
            padding: '15px',
            backgroundColor: '#defbe6',
            border: '1px solid #24a148',
            borderRadius: '4px'
          }}>
            <strong style={{ color: '#24a148' }}>Matches found ({matchResults.length}):</strong>
            <ul style={{ marginTop: '10px', marginBottom: 0 }}>
              {matchResults.map(term => (
                <li key={term} style={{ 
                  fontFamily: 'monospace',
                  color: '#0f62fe',
                  marginTop: '5px'
                }}>
                  {term}
                </li>
              ))}
            </ul>
          </div>
        )}
        
        {matchResults.length === 0 && testReference && (
          <div style={{ 
            marginTop: '15px',
            padding: '15px',
            backgroundColor: '#fff1f1',
            border: '1px solid #da1e28',
            borderRadius: '4px'
          }}>
            <strong style={{ color: '#da1e28' }}>No matches found</strong>
            <p style={{ marginTop: '5px', marginBottom: 0, fontSize: '14px' }}>
              Normalized reference: <code style={{ backgroundColor: '#f4f4f4', padding: '2px 6px', borderRadius: '3px' }}>
                {normalizeBALTerm(testReference)}
              </code>
            </p>
          </div>
        )}
      </div>

      {/* Normalization Examples */}
      <div style={{ marginTop: '30px' }}>
        <h3>Normalization Examples</h3>
        <p style={{ color: '#666', fontSize: '14px' }}>
          Shows how terms are normalized for matching (removes articles, lowercase, etc.)
        </p>
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '10px',
          marginTop: '10px'
        }}>
          {[
            'the minimum service for fixed holidays',
            'a personal holiday',
            'an employee',
            'the years of service',
            'The Employee',
            'each additional holiday'
          ].map(example => (
            <div key={example} style={{
              padding: '10px',
              backgroundColor: '#f4f4f4',
              borderRadius: '4px',
              fontFamily: 'monospace',
              fontSize: '13px'
            }}>
              <div style={{ color: '#666' }}>{example}</div>
              <div style={{ color: '#0f62fe', marginTop: '5px' }}>
                → {normalizeBALTerm(example)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
