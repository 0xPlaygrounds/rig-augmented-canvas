import { MarkdownFormatType, SelectionRange, FormatResult } from '../types';

/**
 * Applies markdown formatting to the selected text or at the cursor position
 * 
 * @param text The current text content
 * @param selection The selection range (or cursor position if start === end)
 * @param formatType The markdown format to apply
 * @returns An object with the new text and updated cursor position
 */
export const applyFormat = (
  text: string,
  selection: SelectionRange,
  formatType: MarkdownFormatType
): FormatResult => {
  const { start, end } = selection;
  const selectedText = text.substring(start, end);
  
  // Get the format markers based on the format type
  const formatInfo = getFormatInfo(formatType);
  
  // Apply the format markers to the text
  return applyFormatMarkers(text, start, end, selectedText, formatInfo);
};

/**
 * Represents format markers and application logic
 */
interface FormatInfo {
  /** Prefix to add at the beginning */
  prefix: string;
  /** Suffix to add at the end (if different from prefix) */
  suffix?: string;
  /** Is this a block format (applies to whole line) */
  isBlock?: boolean;
  /** Custom cursor position calculation logic */
  getCursorPosition?: (start: number, end: number, selectedText: string, prefix: string, suffix: string) => number;
}

/**
 * Get format information for a specific format type
 */
const getFormatInfo = (formatType: MarkdownFormatType): FormatInfo => {
  switch (formatType) {
    case 'bold':
      return { prefix: '**' };
    case 'italic':
      return { prefix: '*' };
    case 'heading1':
      return { prefix: '# ', isBlock: true };
    case 'heading2':
      return { prefix: '## ', isBlock: true };
    case 'heading3':
      return { prefix: '### ', isBlock: true };
    case 'bulletList':
      return { prefix: '- ', isBlock: true };
    case 'numberedList':
      return { prefix: '1. ', isBlock: true };
    case 'quote':
      return { prefix: '> ', isBlock: true };
    case 'code':
      return { prefix: '`' };
    case 'codeBlock':
      return { 
        prefix: '```\n', 
        suffix: '\n```',
        getCursorPosition: (start, end, selectedText) => 
          selectedText ? start + selectedText.length + 4 : start + 4
      };
    case 'link':
      return { 
        prefix: '[', 
        suffix: '](url)',
        getCursorPosition: (start, end, selectedText) => 
          selectedText ? end + 3 : start + 1
      };
    case 'image':
      return { 
        prefix: '![', 
        suffix: '](url)',
        getCursorPosition: (start, end, selectedText) => 
          selectedText ? end + 3 : start + 2
      };
    case 'divider':
      return { 
        prefix: '\n---\n',
        getCursorPosition: (start) => start + 5
      };
    default:
      return { prefix: '' };
  }
};

/**
 * Apply format markers to text
 */
const applyFormatMarkers = (
  text: string,
  start: number,
  end: number,
  selectedText: string,
  formatInfo: FormatInfo
): FormatResult => {
  const { prefix, suffix = prefix, isBlock = false, getCursorPosition } = formatInfo;
  let newText = text;
  let cursorPosition = end;

  if (isBlock) {
    // For block formats, apply to the beginning of the line
    const lineStart = text.lastIndexOf('\n', start - 1) + 1;
    const linePrefix = text.substring(lineStart, lineStart + prefix.length);
    
    if (linePrefix === prefix) {
      // Remove format if it already exists
      newText = text.substring(0, lineStart) + text.substring(lineStart + prefix.length);
      cursorPosition = start - prefix.length;
    } else {
      // Add format to beginning of line
      newText = text.substring(0, lineStart) + prefix + text.substring(lineStart);
      cursorPosition = start + prefix.length;
    }
  } else {
    if (selectedText) {
      // Apply format to selection
      newText = 
        text.substring(0, start) + 
        prefix + selectedText + suffix + 
        text.substring(end);
      
      // Use custom cursor position logic if provided, otherwise place cursor after the selection
      cursorPosition = getCursorPosition 
        ? getCursorPosition(start, end, selectedText, prefix, suffix)
        : end + prefix.length + suffix.length;
    } else {
      // Insert format markers and place cursor between them
      newText = 
        text.substring(0, start) + 
        prefix + suffix + 
        text.substring(end);
      
      // Use custom cursor position logic if provided, otherwise place cursor between markers
      cursorPosition = getCursorPosition 
        ? getCursorPosition(start, end, selectedText, prefix, suffix)
        : start + prefix.length;
    }
  }

  return { text: newText, cursorPosition };
};

/**
 * Calculate statistics about markdown content
 */
export const calculateStats = (content: string): {
  wordCount: number;
  charCount: number;
  readingTime: number;
} => {
  if (!content || content.trim() === '') {
    return {
      wordCount: 0,
      charCount: 0,
      readingTime: 0
    };
  }

  // Remove markdown formatting for more accurate counting
  const plainText = content
    .replace(/```[\s\S]*?```/g, '') // Remove code blocks
    .replace(/`[^`]*`/g, '') // Remove inline code
    .replace(/!\[.*?\]\(.*?\)/g, '') // Remove image links
    .replace(/\[.*?\]\(.*?\)/g, '') // Remove links
    .replace(/[#*_~]/g, ''); // Remove other markdown symbols
  
  const charCount = plainText.length;
  const words = plainText.trim().split(/\s+/).filter(word => word.length > 0);
  const wordCount = words.length;
  
  // Average reading speed: 200-250 words per minute
  // We use 225 words per minute as our estimate
  const readingTime = Math.max(1, Math.ceil(wordCount / 225));
  
  return {
    wordCount,
    charCount,
    readingTime
  };
};
