import { useState, useCallback, useRef, useEffect } from 'react';
import { ChatMessage, AIAssistantOptions } from '../types';

/**
 * Hook for managing AI Assistant state and interactions
 */
export const useAIAssistant = (options: AIAssistantOptions = {}) => {
  // Extract options with defaults
  const {
    initialVisible = true,
    initialMessages = [],
    onVisibilityChange,
  } = options;

  // Initialize state
  const [isVisible, setIsVisible] = useState(initialVisible);
  const [messages, setMessages] = useState<ChatMessage[]>(
    initialMessages.length > 0
      ? initialMessages
      : [
          {
            id: '1',
            sender: 'ai',
            text: "Hello! I'm your AI co-writer. Ask me questions or get writing help.",
            timestamp: new Date(),
          },
        ]
  );
  const [inputText, setInputText] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // Toggle visibility
  const toggleVisibility = useCallback(() => {
    const newVisibility = !isVisible;
    setIsVisible(newVisibility);
    if (onVisibilityChange) {
      onVisibilityChange(newVisibility);
    }
  }, [isVisible, onVisibilityChange]);

  // Send a user message and generate AI response
  const sendMessage = useCallback(() => {
    if (!inputText.trim()) return;

    // Create user message
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: inputText,
      timestamp: new Date(),
    };

    // Add to messages
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');

    // Generate AI response (mock implementation)
    setTimeout(() => {
      const lowerMessage = inputText.toLowerCase();
      let aiResponse = "I understand you're working on this document. How can I help you?";

      if (lowerMessage.includes('help') || lowerMessage.includes('how to')) {
        aiResponse = "I'd be happy to help! What specifically do you need assistance with?";
      } else if (
        lowerMessage.includes('suggestion') ||
        lowerMessage.includes('idea')
      ) {
        aiResponse =
          "Here's a suggestion: try expanding on your main point with a specific example.";
      } else if (
        lowerMessage.includes('review') ||
        lowerMessage.includes('feedback')
      ) {
        aiResponse = "I'd suggest reviewing your text for clarity and conciseness.";
      }

      // Add AI response
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          sender: 'ai',
          text: aiResponse,
          timestamp: new Date(),
        },
      ]);
    }, 1000);
  }, [inputText]);

  // Auto-scroll chat to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setInputText(e.target.value);
    },
    []
  );

  // Handle key press (send on Enter)
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessage();
      }
    },
    [sendMessage]
  );

  // Clear all messages
  const clearMessages = useCallback(() => {
    setMessages([
      {
        id: Date.now().toString(),
        sender: 'ai',
        text: "Hello! I'm your AI co-writer. Ask me questions or get writing help.",
        timestamp: new Date(),
      },
    ]);
  }, []);

  return {
    isVisible,
    messages,
    inputText,
    chatContainerRef,
    toggleVisibility,
    sendMessage,
    handleInputChange,
    handleKeyDown,
    clearMessages,
    setIsVisible,
  };
};
