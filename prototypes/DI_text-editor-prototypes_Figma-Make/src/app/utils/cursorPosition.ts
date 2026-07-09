/**
 * Calculate the pixel position of the cursor in a textarea
 * This accounts for line wrapping and actual text rendering
 */
export function getTextareaCaretPosition(
  textarea: HTMLTextAreaElement,
  cursorPosition: number
): { top: number; left: number } {
  // Create a mirror div to calculate exact cursor position
  const mirror = document.createElement('div');
  const computedStyle = window.getComputedStyle(textarea);
  
  // Copy all relevant styles from the textarea to the mirror
  const stylesToCopy = [
    'fontFamily',
    'fontSize',
    'fontWeight',
    'lineHeight',
    'letterSpacing',
    'wordSpacing',
    'whiteSpace',
    'wordWrap',
    'wordBreak',
    'overflowWrap',
    'padding',
    'paddingTop',
    'paddingRight',
    'paddingBottom',
    'paddingLeft',
    'border',
    'borderWidth',
    'boxSizing',
    'width',
  ];
  
  stylesToCopy.forEach(prop => {
    const kebabProp = prop.replace(/([A-Z])/g, '-$1').toLowerCase();
    const value = computedStyle.getPropertyValue(kebabProp);
    (mirror.style as any)[prop] = value;
  });
  
  // Set additional styles for the mirror
  mirror.style.position = 'absolute';
  mirror.style.visibility = 'hidden';
  mirror.style.overflow = 'auto';
  mirror.style.height = 'auto';
  mirror.style.top = '0';
  mirror.style.left = '-9999px';
  mirror.style.pointerEvents = 'none';
  
  // Add mirror to DOM temporarily
  document.body.appendChild(mirror);
  
  // Get the text before cursor
  const textBeforeCursor = textarea.value.substring(0, cursorPosition);
  
  // Create a span to mark the cursor position
  const span = document.createElement('span');
  span.textContent = '\u200b'; // Zero-width space for accurate positioning
  span.style.display = 'inline';
  
  // Set text before cursor
  mirror.textContent = textBeforeCursor;
  mirror.appendChild(span);
  
  // Get the span's position (which represents cursor position)
  const spanRect = span.getBoundingClientRect();
  const mirrorRect = mirror.getBoundingClientRect();
  
  // Calculate relative position
  const top = spanRect.top - mirrorRect.top;
  const left = spanRect.left - mirrorRect.left;
  
  // Clean up
  document.body.removeChild(mirror);
  
  return { top, left };
}