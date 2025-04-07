import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useSettingsStore } from '../store/settingsStore';
import { eventBus } from '../utils/eventBus';

/**
 * Interface for the UI Visibility context values
 */
interface UIVisibilityContextType {
  /** Whether sidebar should be visible */
  sidebarVisible: boolean;
  /** Whether toolbar should be visible */
  toolbarVisible: boolean;
  /** Toggle reading mode on/off */
  toggleReadingMode: () => void;
  /** Current reading mode state */
  isReadingMode: boolean;
  /** Estimated reading time in minutes */
  estimatedReadingTime: number;
  /** Apply highlighting animation to an element */
  highlightElement: (elementId: string) => void;
}

/**
 * Context for managing UI visibility and reading mode
 */
const UIVisibilityContext = createContext<UIVisibilityContextType | null>(null);

/**
 * Props for the UIVisibilityProvider component
 */
interface UIVisibilityProviderProps {
  children: React.ReactNode;
}

/**
 * Provider for UI visibility features
 * - Manages fade-in UI elements
 * - Handles reading mode toggle
 * - Calculates estimated reading time
 */
export const UIVisibilityProvider: React.FC<UIVisibilityProviderProps> = ({ children }) => {
  const { settings } = useSettingsStore();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [toolbarVisible, setToolbarVisible] = useState(true);
  const [contentLength, setContentLength] = useState(0);
  const [contentWordCount, setContentWordCount] = useState(0);

  // Track mouse position for UI visibility
  useEffect(() => {
    if (!settings.ui.fadeInUiElements) return;

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [settings.ui.fadeInUiElements]);

  // Determine UI visibility based on mouse position and settings
  useEffect(() => {
    if (!settings.ui.fadeInUiElements) {
      setSidebarVisible(true);
      setToolbarVisible(true);
      return;
    }

    const edgeThreshold = 100; // pixels
    const isNearLeftEdge = mousePosition.x < edgeThreshold;
    const isNearTopEdge = mousePosition.y < edgeThreshold;

    setSidebarVisible(isNearLeftEdge || !isReadingMode);
    setToolbarVisible(isNearTopEdge || !isReadingMode);
    
    // Publish event for components to react to visibility changes
    eventBus.publish('ui:fadeElements', isNearLeftEdge || isNearTopEdge);
  }, [mousePosition, isReadingMode, settings.ui.fadeInUiElements]);

  // Toggle reading mode
  const toggleReadingMode = useCallback(() => {
    const newMode = !isReadingMode;
    setIsReadingMode(newMode);
    // Publish event for components to react to reading mode change
    eventBus.publish('ui:readingMode:toggle', newMode);
  }, [isReadingMode]);

  // Highlight an element (for transitions between reading modes)
  const highlightElement = useCallback((elementId: string) => {
    eventBus.publish('ui:animation:highlight', elementId);
  }, []);

  // Calculate reading time (words / 200-250 words per minute)
  const calculateReadingTime = useCallback((wordCount: number) => {
    const wordsPerMinute = 225; // Average reading speed
    return Math.ceil(wordCount / wordsPerMinute);
  }, []);

  // Listen for document content changes to update reading time
  useEffect(() => {
    const unsubscribe = eventBus.subscribe('document:contentChanged', 
      (content: string, wordCount: number) => {
        setContentLength(content.length);
        setContentWordCount(wordCount);
      }
    );
    return unsubscribe;
  }, []);

  // Calculate estimated reading time based on word count
  const estimatedReadingTime = calculateReadingTime(contentWordCount);

  // Context value
  const contextValue: UIVisibilityContextType = {
    sidebarVisible,
    toolbarVisible,
    toggleReadingMode,
    isReadingMode,
    estimatedReadingTime,
    highlightElement
  };

  return (
    <UIVisibilityContext.Provider value={contextValue}>
      {children}
    </UIVisibilityContext.Provider>
  );
};

/**
 * Hook to use the UI visibility context
 */
export const useUIVisibility = () => {
  const context = useContext(UIVisibilityContext);
  if (!context) {
    throw new Error('useUIVisibility must be used within UIVisibilityProvider');
  }
  return context;
};
