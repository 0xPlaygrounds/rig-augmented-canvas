/**
 * Utilities for style manipulation
 */

/**
 * Apply styles with !important to override any CSS conflicts
 * This is particularly useful for ensuring node dimensions are respected
 * 
 * @param element - The DOM element to apply styles to
 * @param styles - Object with style properties and values to apply
 */
export const applyForcedStyles = (
  element: HTMLElement | null,
  styles: Record<string, string>
): void => {
  if (!element) return;
  
  Object.entries(styles).forEach(([property, value]) => {
    element.style.setProperty(property, value, 'important');
  });
};
