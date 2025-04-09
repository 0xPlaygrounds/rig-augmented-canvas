import { useState, useCallback, useRef, useEffect } from 'react';
import { services } from '../../../services/ServiceProvider';
import { applyFormat, calculateStats } from '../utils/formatting';
import { MarkdownEditorOptions, MarkdownFormatType, SelectionRange } from '../types';

/**
 * Hook for managing markdown editor state and functionality
 */
export const useMarkdownEditor = (options: MarkdownEditorOptions = {}) => {
  const {
    initialContent = '',
    onChange,
    onSave,
    readOnly = false,
    autoFocus = false,
    showToolbar = true,
    showStatusBar = true,
  } = options;

  // State
  const [content, setContent] = useState(initialContent);
  const [isEditing, setIsEditing] = useState(!readOnly);
  const [selection, setSelection] = useState<SelectionRange>({ start: 0, end: 0 });
  const [isFocused, setIsFocused] = useState(false);
  
  // Stats
  const [stats, setStats] = useState(() => calculateStats(initialContent));
  
  // Track if content is modified since last save
  const [isModified, setIsModified] = useState(false);
  
  // Refs
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const isInitialMount = useRef(true);
  
  // Update stats when content changes
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    
    setStats(calculateStats(content));
    
    // Mark as modified
    setIsModified(true);
    
    // Call onChange callback if provided
    if (onChange) {
      onChange(content);
    }
    
    // Publish content changed event
    services.events.typedPublish('document:contentChanged', content, stats.wordCount);
  }, [content, onChange, stats.wordCount]);
  
  // Handle content change
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (readOnly) return;
    setContent(e.target.value);
  }, [readOnly]);
  
  // Handle selection change
  const handleSelectionChange = useCallback(() => {
    if (!editorRef.current) return;
    
    const { selectionStart, selectionEnd } = editorRef.current;
    setSelection({ start: selectionStart, end: selectionEnd });
    
    // Publish selection changed event
    services.events.typedPublish('document:selectionChanged', selectionStart, selectionEnd);
  }, []);
  
  // Apply formatting to content
  const applyFormatting = useCallback((formatType: MarkdownFormatType) => {
    if (readOnly || !editorRef.current) return;
    
    const { text, cursorPosition } = applyFormat(content, selection, formatType);
    
    // Update content
    setContent(text);
    
    // Set focus back to editor and update cursor position after state update
    setTimeout(() => {
      if (editorRef.current) {
        editorRef.current.focus();
        editorRef.current.setSelectionRange(cursorPosition, cursorPosition);
      }
    }, 0);
  }, [content, readOnly, selection]);
  
  // Handle save
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
      setIsModified(false);
      
      // Publish document saved event
      services.events.typedPublish('document:saved', 'markdown-document');
    }
  }, [content, onSave]);
  
  // Toggle edit mode
  const toggleEditMode = useCallback(() => {
    if (readOnly) return;
    setIsEditing(prev => !prev);
  }, [readOnly]);
  
  // Auto-focus on mount if specified
  useEffect(() => {
    if (autoFocus && editorRef.current && !readOnly) {
      editorRef.current.focus();
      // Place cursor at end
      const length = editorRef.current.value.length;
      editorRef.current.setSelectionRange(length, length);
    }
  }, [autoFocus, readOnly]);
  
  // Handle keyboard shortcuts
  useEffect(() => {
    if (!isFocused || readOnly) return;
    
    const handleKeyDown = (e: KeyboardEvent) => {
      // Save: Ctrl/Cmd + S
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
        return;
      }
      
      // Bold: Ctrl/Cmd + B
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        applyFormatting('bold');
        return;
      }
      
      // Italic: Ctrl/Cmd + I
      if ((e.ctrlKey || e.metaKey) && e.key === 'i') {
        e.preventDefault();
        applyFormatting('italic');
        return;
      }
      
      // Heading 1: Ctrl/Cmd + 1
      if ((e.ctrlKey || e.metaKey) && e.key === '1') {
        e.preventDefault();
        applyFormatting('heading1');
        return;
      }
      
      // Heading 2: Ctrl/Cmd + 2
      if ((e.ctrlKey || e.metaKey) && e.key === '2') {
        e.preventDefault();
        applyFormatting('heading2');
        return;
      }
      
      // Heading 3: Ctrl/Cmd + 3
      if ((e.ctrlKey || e.metaKey) && e.key === '3') {
        e.preventDefault();
        applyFormatting('heading3');
        return;
      }
    };
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isFocused, readOnly, handleSave, applyFormatting]);
  
  return {
    // State
    content,
    setContent,
    isEditing,
    setIsEditing,
    selection,
    isFocused,
    stats,
    isModified,
    
    // Refs
    editorRef,
    
    // Actions
    handleContentChange,
    handleSelectionChange,
    applyFormatting,
    handleSave,
    toggleEditMode,
    setIsFocused,
    
    // UI Options
    readOnly,
    showToolbar,
    showStatusBar,
  };
};
