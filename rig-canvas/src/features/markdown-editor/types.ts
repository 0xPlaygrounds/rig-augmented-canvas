/**
 * Types for the markdown editor feature
 */

/**
 * Options for the markdown editor
 */
export interface MarkdownEditorOptions {
  /** Initial content */
  initialContent?: string;
  /** Callback when content changes */
  onChange?: (content: string) => void;
  /** Callback when editor is saved */
  onSave?: (content: string) => void;
  /** Is the editor in read-only mode */
  readOnly?: boolean;
  /** Minimum height of the editor */
  minHeight?: number;
  /** Maximum height of the editor */
  maxHeight?: number;
  /** Auto-resize to content */
  autoResize?: boolean;
  /** Placeholder text */
  placeholder?: string;
  /** Focus the editor on mount */
  autoFocus?: boolean;
  /** Show toolbar */
  showToolbar?: boolean;
  /** Show status bar */
  showStatusBar?: boolean;
}

/**
 * Markdown format type
 */
export type MarkdownFormatType = 
  | 'bold'
  | 'italic'
  | 'heading1'
  | 'heading2'
  | 'heading3'
  | 'bulletList'
  | 'numberedList'
  | 'quote'
  | 'code'
  | 'codeBlock'
  | 'link'
  | 'image'
  | 'divider';

/**
 * Selection range in the editor
 */
export interface SelectionRange {
  start: number;
  end: number;
}

/**
 * Result of applying a markdown format
 */
export interface FormatResult {
  /** Updated text after formatting */
  text: string;
  /** New cursor position */
  cursorPosition: number;
}

/**
 * Statistics about the markdown content
 */
export interface MarkdownStats {
  /** Word count */
  wordCount: number;
  /** Character count */
  charCount: number;
  /** Estimated reading time in minutes */
  readingTime: number;
  /** Number of headings */
  headings: number;
  /** Number of paragraphs */
  paragraphs: number;
}
