import React from 'react';
import { User, Bot } from 'lucide-react';
import { ChatMessage } from '../types';

export interface MessageBubbleProps {
  /** The message to display */
  message: ChatMessage;
  
  /** Optional CSS class to apply */
  className?: string;
}

/**
 * Component to render a single chat message bubble
 */
export const MessageBubble: React.FC<MessageBubbleProps> = ({ message, className = '' }) => {
  const isUser = message.sender === 'user';
  
  return (
    <div 
      className={`mb-3 max-w-[90%] ${isUser ? 'ml-auto' : 'mr-auto'} ${className}`}
    >
      <div 
        className={`rounded-lg p-2 inline-block ${
          isUser 
            ? 'bg-accent-primary text-white rounded-tr-none' 
            : 'bg-bg-tertiary text-text-primary rounded-tl-none'
        }`}
      >
        <div className="text-xs mb-1 flex items-center gap-1">
          {isUser ? <User size={12} /> : <Bot size={12} />}
          {isUser ? 'You' : 'AI Co-writer'}
        </div>
        <p className="text-sm whitespace-pre-wrap">{message.text}</p>
      </div>
    </div>
  );
};
