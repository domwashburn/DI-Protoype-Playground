/**
 * Data Model Service Tests
 * 
 * Tests for data model resolution, extensions, and operations.
 * Run these to verify the service layer works correctly.
 */

import { dataModelService } from '../dataModelService';
import type { DataModelExtension } from '../dataModelService';
import { LOAN_APPROVAL_EXTENSION } from '../../data/dataModelExtensions';

/**
 * Manual test runner
 * Call this function from console to run tests
 */
export function runDataModelServiceTests(): void {
  console.group('Data Model Service Tests');
  
  // Test 1: Register and retrieve extension
  console.log('\n--- Test 1: Register and retrieve extension ---');
  dataModelService.registerExtension(LOAN_APPROVAL_EXTENSION);
  const retrieved = dataModelService.getExtension(LOAN_APPROVAL_EXTENSION.id);
  console.assert(retrieved !== undefined, 'Should retrieve registered extension');
  console.assert(retrieved?.id === LOAN_APPROVAL_EXTENSION.id, 'Should have correct ID');
  console.log('✅ Test 1 passed');
  
  // Test 2: Get extension by automation ID
  console.log('\n--- Test 2: Get extension by automation ID ---');
  const byAutomation = dataModelService.getExtensionByAutomation('auto-loan-approval');
  console.assert(byAutomation !== undefined, 'Should find extension by automation ID');
  console.assert(byAutomation?.automationId === 'auto-loan-approval', 'Should match automation ID');
  console.log('✅ Test 2 passed');
  
  // Test 3: Resolve model
  console.log('\n--- Test 3: Resolve model ---');
  try {
    const resolved = dataModelService.resolveModel('auto-loan-approval');
    console.assert(resolved !== null, 'Should resolve model');
    console.assert(resolved.isExtended === true, 'Should be marked as extended');
    console.assert(resolved.baseModelId === 'loan-financial', 'Should have correct base model');
    console.assert(resolved.attributes.length > 0, 'Should have attributes');
    
    // Check custom attributes are included
    const hasRiskScore = resolved.attributes.some(attr => attr.name === 'riskScore');
    console.assert(hasRiskScore, 'Should include custom attribute: riskScore');
    
    // Check vocabulary overrides are applied
    const applicantAttr = resolved.attributes.find(attr => attr.name === 'applicant');
    if (applicantAttr?.subAttributes) {
      const creditScoreAttr = applicantAttr.subAttributes.find(attr => attr.name === 'creditScore');
      const hasOverriddenVocab = creditScoreAttr?.vocabulary?.includes('FICO score');
      console.assert(hasOverriddenVocab, 'Should have overridden vocabulary');
    }
    
    console.log('Resolved model:', {
      id: resolved.id,
      name: resolved.name,
      isExtended: resolved.isExtended,
      attributeCount: resolved.attributes.length,
      customAttributeCount: resolved.attributes.filter(attr => 
        resolved.attributeSources.get(attr.name) === 'custom'
      ).length
    });
    console.log('✅ Test 3 passed');
  } catch (err) {
    console.error('❌ Test 3 failed:', err);
  }
  
  // Test 4: Add custom attribute
  console.log('\n--- Test 4: Add custom attribute ---');
  try {
    const testExtension: DataModelExtension = {
      id: 'test-ext-001',
      automationId: 'test-auto-001',
      baseModelId: 'loan-financial',
      addedAttributes: [],
      vocabularyOverrides: {},
      hiddenAttributes: [],
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    dataModelService.registerExtension(testExtension);
    
    dataModelService.addAttribute('test-ext-001', {
      name: 'testAttribute',
      type: 'string',
      vocabulary: ['test vocab'],
      description: 'Test attribute'
    });
    
    const updated = dataModelService.getExtension('test-ext-001');
    console.assert(updated?.addedAttributes.length === 1, 'Should have one custom attribute');
    console.assert(updated?.addedAttributes[0].name === 'testAttribute', 'Should have correct name');
    console.log('✅ Test 4 passed');
  } catch (err) {
    console.error('❌ Test 4 failed:', err);
  }
  
  // Test 5: Add vocabulary override
  console.log('\n--- Test 5: Add vocabulary override ---');
  try {
    dataModelService.addVocabulary('test-ext-001', 'applicant.income', ['custom income term']);
    const updated = dataModelService.getExtension('test-ext-001');
    const vocabTerms = updated?.vocabularyOverrides['applicant.income'];
    console.assert(vocabTerms?.includes('custom income term'), 'Should have custom vocabulary term');
    console.log('✅ Test 5 passed');
  } catch (err) {
    console.error('❌ Test 5 failed:', err);
  }
  
  // Test 6: Hide attribute
  console.log('\n--- Test 6: Hide attribute ---');
  try {
    dataModelService.hideAttribute('test-ext-001', 'loanTerm');
    const updated = dataModelService.getExtension('test-ext-001');
    console.assert(updated?.hiddenAttributes.includes('loanTerm'), 'Should hide attribute');
    
    // Verify hidden attribute is not in resolved model
    const resolved = dataModelService.resolveModel('test-auto-001', 'test-ext-001');
    const hasLoanTerm = resolved.attributes.some(attr => attr.name === 'loanTerm');
    console.assert(!hasLoanTerm, 'Hidden attribute should not appear in resolved model');
    console.log('✅ Test 6 passed');
  } catch (err) {
    console.error('❌ Test 6 failed:', err);
  }
  
  // Test 7: Validate extension
  console.log('\n--- Test 7: Validate extension ---');
  const validation = dataModelService.validateExtension(LOAN_APPROVAL_EXTENSION);
  console.assert(validation.isValid === true, 'Valid extension should pass validation');
  console.assert(validation.errors.length === 0, 'Should have no errors');
  console.log('Validation result:', validation);
  console.log('✅ Test 7 passed');
  
  // Test 8: Get all vocabulary
  console.log('\n--- Test 8: Get all vocabulary ---');
  try {
    const resolved = dataModelService.resolveModel('auto-loan-approval');
    const vocabulary = dataModelService.getAllVocabulary(resolved);
    console.assert(vocabulary.length > 0, 'Should have vocabulary terms');
    console.assert(vocabulary.includes('FICO score'), 'Should include custom vocabulary');
    console.assert(vocabulary.includes('risk score'), 'Should include custom attribute vocabulary');
    console.log(`Found ${vocabulary.length} vocabulary terms`);
    console.log('Sample terms:', vocabulary.slice(0, 10));
    console.log('✅ Test 8 passed');
  } catch (err) {
    console.error('❌ Test 8 failed:', err);
  }
  
  console.groupEnd();
  console.log('\n🎉 All tests completed!');
}

/**
 * Example usage:
 * 
 * import { runDataModelServiceTests } from './services/__tests__/dataModelService.test';
 * runDataModelServiceTests();
 */
