/**
 * AI Assistant Types
 */

/**
 * Represents a single message in the chat interface
 */
export interface ChatMessage {
  /** Unique identifier for the message */
  id: string;
  
  /** Who sent the message */
  sender: 'user' | 'ai';
  
  /** The message content */
  text: string;
  
  /** When the message was sent */
  timestamp: Date;
}

/**
 * Configuration options for the AI Assistant
 */
export interface AIAssistantOptions {
  /** Initial visibility state */
  initialVisible?: boolean;
  
  /** Initial messages to display */
  initialMessages?: ChatMessage[];
  
  /** Callback for when assistant visibility changes */
  onVisibilityChange?: (visible: boolean) => void;
  
  /** Width for the assistant panel */
  width?: number | string;
  
  /** Optional background color */
  bgColor?: string;
  
  /** Optional title for the assistant */
  title?: string;
}

/**
 * Props for the AI Assistant component
 */
export interface AIAssistantProps extends AIAssistantOptions {
  /** CSS class name for styling */
  className?: string;
}
