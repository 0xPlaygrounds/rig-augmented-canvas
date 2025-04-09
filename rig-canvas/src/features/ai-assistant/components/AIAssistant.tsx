import React from 'react';
import { X, Bot, Send } from 'lucide-react';
import { useAIAssistant } from '../hooks/useAIAssistant';
import { MessageBubble } from './MessageBubble';
import { AIAssistantProps } from '../types';

/**
 * AI Assistant component - A chat interface for AI assistance
 */
export const AIAssistant: React.FC<AIAssistantProps> = ({
  initialVisible = true,
  initialMessages = [],
  onVisibilityChange,
  width = '18rem',
  bgColor = 'bg-bg-tertiary',
  title = 'AI Co-writer',
  className = '',
}) => {
  // Use the AI assistant hook to manage state
  const {
    isVisible,
    messages,
    inputText,
    chatContainerRef,
    toggleVisibility,
    sendMessage,
    handleInputChange,
    handleKeyDown,
    setIsVisible,
  } = useAIAssistant({
    initialVisible,
    initialMessages,
    onVisibilityChange,
  });

  // If not visible, don't render anything
  if (!isVisible) return null;

  return (
    <div
      className={`flex flex-col h-full border-l border-border-primary ${bgColor} ${className}`}
      style={{ width }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-border-primary">
        <h3 className="text-sm font-medium text-text-primary flex items-center gap-2">
          <Bot size={16} /> {title}
        </h3>
        <button
          onClick={toggleVisibility}
          className="p-1 rounded hover:bg-bg-primary text-text-secondary hover:text-text-primary"
          title="Close"
        >
          <X size={14} />
        </button>
      </div>

      {/* Chat messages */}
      <div
        ref={chatContainerRef}
        className="flex-1 overflow-y-auto p-3 bg-bg-secondary"
      >
        {messages.map((message) => (
          <MessageBubble key={message.id} message={message} />
        ))}
      </div>

      {/* Message input */}
      <div className="p-3 border-t border-border-primary">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask your AI co-writer..."
            className="flex-1 p-2 rounded bg-bg-primary border border-border-primary text-text-primary text-sm"
          />
          <button
            onClick={sendMessage}
            disabled={!inputText.trim()}
            className={`p-2 rounded ${
              inputText.trim()
                ? 'bg-accent-primary text-white'
                : 'bg-bg-primary text-text-tertiary'
            }`}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};
