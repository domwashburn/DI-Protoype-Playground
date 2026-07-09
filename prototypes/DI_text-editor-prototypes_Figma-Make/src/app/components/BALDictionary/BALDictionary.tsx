/**
 * BALDictionary Component
 * 
 * Displays a searchable list of BAL vocabulary terms with their variants
 * and associated data model mappings.
 * 
 * CARBON_CONVERT: This file uses temporary replacements for Carbon components.
 * Replace with Carbon Search, DataTable, Tag components.
 */

import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import { vocabularyMappings } from '../../SampleData/balSamples';
import { Input } from '../ui/input';
import { Badge } from '../ui/badge';
import styles from './BALDictionary.module.css';

export interface BALDictionaryProps {
  /** Custom className */
  className?: string;
}

/**
 * BALDictionary - Shows vocabulary terms and data model mappings
 */
export const BALDictionary: React.FC<BALDictionaryProps> = ({ className = '' }) => {
  const [searchQuery, setSearchQuery] = useState('');

  // Filter vocabulary based on search query
  const filteredVocabulary = useMemo(() => {
    if (!searchQuery.trim()) {
      return vocabularyMappings;
    }

    const query = searchQuery.toLowerCase();
    return vocabularyMappings.filter(mapping => 
      mapping.term.toLowerCase().includes(query) ||
      mapping.variants?.some(v => v.toLowerCase().includes(query)) ||
      mapping.attributePath.toLowerCase().includes(query) ||
      mapping.description?.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  return (
    <div className={`${styles.dictionaryContainer} ${className}`}>
      {/* Header */}
      <div className={styles.dictionaryHeader}>
        <h3 className={styles.dictionaryTitle}>BAL Dictionary</h3>
        <p className={styles.dictionaryDescription}>
          Search vocabulary terms and their data model mappings
        </p>
      </div>

      {/* Search */}
      <div className={styles.searchWrapper}>
        {/* CARBON_CONVERT: Replace with Carbon Search component */}
        <div className={styles.searchContainer}>
          <Search size={16} className={styles.searchIcon} />
          <Input
            type="text"
            placeholder="Search terms, variants, or attributes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={styles.searchInput}
          />
        </div>
      </div>

      {/* Results count */}
      <div className={styles.resultsCount}>
        {filteredVocabulary.length} {filteredVocabulary.length === 1 ? 'term' : 'terms'}
      </div>

      {/* Vocabulary list */}
      {/* CARBON_CONVERT: Replace with Carbon DataTable for better performance and accessibility */}
      <div className={styles.vocabularyList}>
        {filteredVocabulary.length === 0 ? (
          <div className={styles.emptyState}>
            <p>No vocabulary terms found matching "{searchQuery}"</p>
          </div>
        ) : (
          filteredVocabulary.map((mapping, index) => {
            return (
              <div key={index} className={styles.vocabularyItem}>
                <div className={styles.termHeader}>
                  <div className={styles.termName}>
                    {mapping.term}
                  </div>
                  {/* CARBON_CONVERT: Replace Badge with Carbon Tag component */}
                  <Badge variant="outline" className={styles.termBadge}>
                    {mapping.type}
                  </Badge>
                </div>

                {mapping.variants && mapping.variants.length > 0 && (
                  <div className={styles.variantsRow}>
                    <span className={styles.variantsLabel}>Variants:</span>
                    <div className={styles.variantsList}>
                      {mapping.variants.map((variant, vIndex) => (
                        <span key={vIndex} className={styles.variant}>
                          {variant}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                <div className={styles.mappingRow}>
                  <span className={styles.mappingLabel}>Maps to:</span>
                  <code className={styles.attributePath}>{mapping.attributePath}</code>
                </div>

                {mapping.description && (
                  <div className={styles.description}>
                    {mapping.description}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
