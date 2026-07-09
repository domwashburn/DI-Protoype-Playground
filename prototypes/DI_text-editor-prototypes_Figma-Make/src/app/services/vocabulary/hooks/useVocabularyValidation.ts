import { useState, useEffect } from 'react';
import { VocabularyRepository } from '../VocabularyRepository';
import { ValidationResult } from '../types';

/**
 * useVocabularyValidation
 * 
 * Hook for validating values against vocabulary attribute constraints.
 * 
 * @param attributePath - Path to attribute
 * @param value - Value to validate
 * @param bomId - Optional BOM ID for scoping
 * @returns Validation result
 * 
 * @example
 * const { isValid, errors, warnings } = useVocabularyValidation(
 *   'applicant.creditScore',
 *   750
 * );
 */
export function useVocabularyValidation(
  attributePath: string,
  value: any,
  bomId?: string
) {
  const [validationResult, setValidationResult] = useState<ValidationResult>({
    valid: true
  });
  const repo = VocabularyRepository.getInstance();
  
  useEffect(() => {
    if (!attributePath) {
      setValidationResult({ valid: true });
      return;
    }
    
    const result = repo.validate(attributePath, value, bomId);
    setValidationResult(result);
  }, [attributePath, value, bomId, repo]);
  
  return {
    isValid: validationResult.valid,
    errors: validationResult.errors || [],
    warnings: validationResult.warnings || [],
    validationResult
  };
}
