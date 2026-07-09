import { useState, useEffect, useCallback } from 'react';
import { VocabularyRepository } from '../VocabularyRepository';
import { BusinessObjectModel } from '../types';

/**
 * useVocabulary
 * 
 * Primary hook for accessing vocabulary repository.
 * Provides access to all BOMs and repository methods.
 * 
 * @example
 * const { boms, getBOM, addBOM } = useVocabulary();
 */
export function useVocabulary() {
  const [boms, setBOMs] = useState<BusinessObjectModel[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const repo = VocabularyRepository.getInstance();
  
  useEffect(() => {
    const loadBOMs = async () => {
      setIsLoading(true);
      try {
        if (!repo.isInitialized()) {
          await repo.initialize();
        }
        setBOMs(repo.getAllBOMs());
      } catch (error) {
        console.error('Failed to load vocabulary:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadBOMs();
  }, [repo]);
  
  const getBOM = useCallback((id: string) => {
    return repo.getBOM(id);
  }, [repo]);
  
  const addBOM = useCallback((bom: BusinessObjectModel) => {
    repo.addBOM(bom);
    setBOMs(repo.getAllBOMs());
  }, [repo]);
  
  const updateBOM = useCallback((id: string, updates: Partial<BusinessObjectModel>) => {
    repo.updateBOM(id, updates);
    setBOMs(repo.getAllBOMs());
  }, [repo]);
  
  const deleteBOM = useCallback((id: string) => {
    repo.deleteBOM(id);
    setBOMs(repo.getAllBOMs());
  }, [repo]);
  
  return {
    boms,
    isLoading,
    getBOM,
    addBOM,
    updateBOM,
    deleteBOM,
    repository: repo // Advanced usage
  };
}
