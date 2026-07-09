/**
 * Variable Rename Utility
 * 
 * Handles renaming variables in formula text while preserving
 * the structure and other content.
 */

/**
 * Replace all instances of a variable name in formula text
 * 
 * @param formulaText - The formula text to update
 * @param oldName - The old variable name (without $)
 * @param newName - The new variable name (without $)
 * @returns Updated formula text with all instances renamed
 * 
 * @example
 * replaceVariableName('$total + $tax', 'total', 'subtotal')
 * // Returns: '$subtotal + $tax'
 */
export function replaceVariableName(
  formulaText: string,
  oldName: string,
  newName: string
): string {
  if (!formulaText || !oldName || oldName === newName) {
    return formulaText;
  }

  // Create regex to match $variableName as a whole word
  // Uses word boundaries to avoid partial matches
  // Example: $total won't match in $totalAmount
  const regex = new RegExp(`\\$${escapeRegex(oldName)}\\b`, 'g');
  
  return formulaText.replace(regex, `$${newName}`);
}

/**
 * Escape special regex characters in a string
 */
function escapeRegex(str: string): string {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}
