/**
 * Applies markdown formatting to the selected text or at the cursor position
 * 
 * @param text The current text content
 * @param selectionStart The start position of the selection
 * @param selectionEnd The end position of the selection
 * @param format The markdown format to apply
 * @returns An object with the new text and updated cursor position
 */
export const applyMarkdownFormat = (
  text: string,
  selectionStart: number,
  selectionEnd: number,
  format: string
): { text: string; cursorPosition: number } => {
  const selectedText = text.substring(selectionStart, selectionEnd);
  let newText = text;
  let cursorPosition = selectionEnd;

  // Handle different format types
  switch (format) {
    // Inline formats (bold, italic, code)
    case '**':
    case '*':
    case '`':
      if (selectedText) {
        // Apply format to selection
        newText = 
          text.substring(0, selectionStart) + 
          format + selectedText + format + 
          text.substring(selectionEnd);
        cursorPosition = selectionEnd + format.length * 2;
      } else {
        // Insert format markers and place cursor between them
        newText = 
          text.substring(0, selectionStart) + 
          format + format + 
          text.substring(selectionEnd);
        cursorPosition = selectionStart + format.length;
      }
      break;

    // Line-starting formats (headings, lists, quotes)
    case '# ':
    case '## ':
    case '### ':
    case '- ':
    case '1. ':
    case '> ':
      // Find the beginning of the current line
      const lineStart = text.lastIndexOf('\n', selectionStart - 1) + 1;
      
      // Check if format already exists at line start
      const linePrefix = text.substring(lineStart, lineStart + format.length);
      
      if (linePrefix === format) {
        // Remove format if it already exists
        newText = 
          text.substring(0, lineStart) + 
          text.substring(lineStart + format.length);
        cursorPosition = selectionStart - format.length;
      } else {
        // Add format to beginning of line
        newText = 
          text.substring(0, lineStart) + 
          format + 
          text.substring(lineStart);
        cursorPosition = selectionStart + format.length;
      }
      break;

    // Special formats (links, images)
    case '[](url)':
      if (selectedText) {
        newText = 
          text.substring(0, selectionStart) + 
          '[' + selectedText + '](url)' + 
          text.substring(selectionEnd);
        cursorPosition = selectionStart + selectedText.length + 3;
      } else {
        newText = 
          text.substring(0, selectionStart) + 
          '[](url)' + 
          text.substring(selectionEnd);
        cursorPosition = selectionStart + 1;
      }
      break;

    case '![](url)':
      if (selectedText) {
        newText = 
          text.substring(0, selectionStart) + 
          '![' + selectedText + '](url)' + 
          text.substring(selectionEnd);
        cursorPosition = selectionStart + selectedText.length + 4;
      } else {
        newText = 
          text.substring(0, selectionStart) + 
          '![](url)' + 
          text.substring(selectionEnd);
        cursorPosition = selectionStart + 2;
      }
      break;

    default:
      // Just insert the format as is
      if (selectedText) {
        newText = 
          text.substring(0, selectionStart) + 
          format + selectedText + 
          text.substring(selectionEnd);
        cursorPosition = selectionEnd + format.length;
      } else {
        newText = 
          text.substring(0, selectionStart) + 
          format + 
          text.substring(selectionEnd);
        cursorPosition = selectionStart + format.length;
      }
  }

  return { text: newText, cursorPosition };
};
