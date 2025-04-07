import React, { useRef, useEffect, useState, useCallback } from 'react';
import { 
  X, Check, Bold, Italic, List, ListOrdered, Heading1, Heading2, 
  Quote, Code, Link, AlignLeft, BookOpen, Clock, Target, Edit3,
  Eye, Type, ChevronsUp, ChevronsDown, BarChart, Search
} from 'lucide-react';
import ReactDOM from 'react-dom';
import { applyMarkdownFormat } from '../utils/markdownUtils';
import { useSettingsStore } from '../store/settingsStore';
import { useUIVisibility } from '../context/UIVisibilityContext';
import { eventBus } from '../utils/eventBus';
import { TypographyContainer } from './Typography';

// Import CSS
import '../styles/typography.css';

interface FocusModeProps {
  content: string;
  onSave: (content: string) => void;
  onClose: () => void;
}

// Writing mode type with descriptions for UI
const WRITING_MODES = [
  { id: 'brainstorming', name: 'Brainstorming', icon: <Target size={16} /> },
  { id: 'drafting', name: 'Drafting', icon: <Edit3 size={16} /> },
  { id: 'editing', name: 'Editing', icon: <ChevronsUp size={16} /> },
  { id: 'reviewing', name: 'Reviewing', icon: <Eye size={16} /> }
];

/**
 * Enhanced focus mode editor with typography controls
 * - Customizable line width
 * - Reading mode toggle
 * - Word count tracking
 * - Writing mode selector
 * - UI transitions
 */
const FocusMode: React.FC<FocusModeProps> = ({ content, onSave, onClose }) => {
  const [editedContent, setEditedContent] = useState(content);
  const [wordCount, setWordCount] = useState(0);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(false);
  const [currentWritingMode, setCurrentWritingMode] = useState('drafting');
  const [writingGoal, setWritingGoal] = useState('');
  const [selectionStats, setSelectionStats] = useState({ start: 0, end: 0, selected: 0 });
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [portalContainer] = useState(() => document.createElement('div'));
  
  // Get settings from store
  const { settings, updateSetting } = useSettingsStore();
  const { estimatedReadingTime } = useUIVisibility();
  
  // Calculate word count when content changes
  useEffect(() => {
    const words = editedContent.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    
    // Publish content change event
    eventBus.publish('document:contentChanged', editedContent, words);
  }, [editedContent]);
  
  // Setup the portal container when component mounts
  useEffect(() => {
    // Set up portal container styles
    portalContainer.style.position = 'fixed';
    portalContainer.style.top = '0';
    portalContainer.style.left = '0';
    portalContainer.style.width = '100vw';
    portalContainer.style.height = '100vh';
    portalContainer.style.zIndex = '10000'; // Higher than any other z-index
    portalContainer.style.pointerEvents = 'auto';
    
    // Add the portal to body
    document.body.appendChild(portalContainer);
    
    // Prevent scrolling on the main document
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';
    
    // Focus the textarea when the component mounts
    if (textareaRef.current) {
      setTimeout(() => {
        if (textareaRef.current) {
          textareaRef.current.focus();
          const length = textareaRef.current.value.length;
          textareaRef.current.setSelectionRange(length, length);
        }
      }, 0);
    }

    // Set up escape key handler
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSettingsPanel) {
          setShowSettingsPanel(false);
        } else {
          onClose();
        }
      } else if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        handleSave();
      } else if ((e.ctrlKey || e.metaKey) && e.key === ',') {
        e.preventDefault();
        setShowSettingsPanel(prev => !prev);
      } else if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
        e.preventDefault();
        toggleReadingMode();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    // Cleanup
    return () => {
      document.body.removeChild(portalContainer);
      document.body.style.overflow = originalStyle;
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose, showSettingsPanel]);

  // Save content and close
  const handleSave = useCallback(() => {
    onSave(editedContent);
    onClose();
  }, [editedContent, onSave, onClose]);

  // Update content when typing
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setEditedContent(e.target.value);
  }, []);

  // Track selection for stats
  const handleSelect = useCallback(() => {
    if (textareaRef.current) {
      const { selectionStart, selectionEnd } = textareaRef.current;
      const selectedText = editedContent.substring(selectionStart, selectionEnd);
      const selectedWordCount = selectedText.split(/\s+/).filter(word => word.length > 0).length;
      
      setSelectionStats({
        start: selectionStart,
        end: selectionEnd,
        selected: selectedWordCount
      });
      
      // Publish selection change event
      eventBus.publish('document:selectionChanged', selectionStart, selectionEnd);
    }
  }, [editedContent]);

  // Apply markdown formatting
  const handleFormatClick = useCallback((format: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const { selectionStart, selectionEnd } = textarea;
      
      const { text, cursorPosition } = applyMarkdownFormat(
        editedContent,
        selectionStart,
        selectionEnd,
        format
      );
      
      setEditedContent(text);
      
      // Set cursor position after state update
      setTimeout(() => {
        if (textarea) {
          textarea.focus();
          textarea.setSelectionRange(cursorPosition, cursorPosition);
        }
      }, 0);
    }
  }, [editedContent]);

  // Toggle between editing and reading modes
  const toggleReadingMode = useCallback(() => {
    setIsReadingMode(prev => !prev);
  }, []);

  // Update writing mode
  const changeWritingMode = useCallback((mode: string) => {
    setCurrentWritingMode(mode);
    // Store in settings
    updateSetting('focus.writingMode', mode);
    // Publish writing mode change
    eventBus.publish('focus:session:start', mode, writingGoal);
  }, [updateSetting, writingGoal]);

  // Update line width setting
  const handleLineWidthChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    updateSetting('typography.lineWidth', value);
  }, [updateSetting]);

  // Update paragraph spacing setting
  const handleParagraphSpacingChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateSetting('typography.paragraphSpacing', value);
  }, [updateSetting]);
  
  // Helper component for formatting buttons
  const FormatButton = useCallback(({ onClick, title, children }: { 
    onClick: () => void; 
    title: string; 
    children: React.ReactNode;
  }) => {
    return (
      <button
        onClick={(e) => {
          e.stopPropagation();
          onClick();
        }}
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '6px',
          borderRadius: '4px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d1d5db',
          transition: 'all 0.2s ease',
        }}
        title={title}
      >
        {children}
      </button>
    );
  }, []);

  // The actual modal content
  const modalContent = (
    <div 
      className="focus-mode-overlay"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.85)',
        backdropFilter: 'blur(10px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10000,
        width: '100vw',
        height: '100vh',
      }}
      onClick={onClose}
    >
      {/* Modal container */}
      <div 
        className="focus-mode-container"
        style={{
          width: '95%',
          maxWidth: '1200px',
          height: '90%',
          background: '#1f2937', // Dark mode background
          borderRadius: '8px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          position: 'relative'
        }}
        onClick={(e) => e.stopPropagation()} // Prevent click from reaching the backdrop
      >
        {/* Header */}
        <div 
          className="focus-mode-header"
          style={{
            borderBottom: '1px solid #374151',
            padding: '16px',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            background: '#111827'
          }}
        >
          <div className="focus-mode-title" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <h2 style={{ margin: 0, fontSize: '18px', fontWeight: 500, color: '#f3f4f6' }}>
              {WRITING_MODES.find(m => m.id === currentWritingMode)?.icon}
              <span style={{ marginLeft: '8px' }}>
                {WRITING_MODES.find(m => m.id === currentWritingMode)?.name} Mode
              </span>
            </h2>
            
            <div className="writing-mode-selector" style={{ marginLeft: '16px' }}>
              <select 
                value={currentWritingMode}
                onChange={(e) => changeWritingMode(e.target.value)}
                style={{
                  background: '#374151',
                  border: 'none',
                  color: '#f3f4f6',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  fontSize: '14px'
                }}
              >
                {WRITING_MODES.map(mode => (
                  <option key={mode.id} value={mode.id}>{mode.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="focus-mode-controls" style={{ display: 'flex', gap: '8px' }}>
            <button
              onClick={toggleReadingMode}
              className={`mode-toggle-btn ${isReadingMode ? 'active' : ''}`}
              style={{
                background: isReadingMode ? '#4b5563' : 'transparent',
                border: '1px solid #4b5563',
                borderRadius: '4px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                color: '#e5e7eb',
                fontSize: '14px',
                cursor: 'pointer'
              }}
              title="Toggle Reading Mode (Ctrl+R)"
            >
              <BookOpen size={16} />
              <span>{isReadingMode ? 'Edit' : 'Read'}</span>
            </button>
            
            <button
              onClick={() => setShowSettingsPanel(prev => !prev)}
              className={`settings-btn ${showSettingsPanel ? 'active' : ''}`}
              style={{
                background: showSettingsPanel ? '#4b5563' : 'transparent',
                border: '1px solid #4b5563',
                borderRadius: '4px',
                padding: '4px 8px',
                display: 'flex',
                alignItems: 'center',
                color: '#e5e7eb',
                cursor: 'pointer'
              }}
              title="Toggle Settings (Ctrl+,)"
            >
              <Type size={16} />
            </button>
            
            <button
              onClick={onClose}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '6px',
                borderRadius: '4px',
                color: '#d1d5db'
              }}
              title="Close (Esc)"
            >
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Main content area with sidebar if settings are shown */}
        <div className="focus-mode-main" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Settings panel */}
          {showSettingsPanel && (
            <div 
              className="settings-panel"
              style={{
                width: '250px',
                borderRight: '1px solid #374151',
                background: '#1f2937',
                padding: '16px',
                overflow: 'auto'
              }}
            >
              <h3 style={{ margin: '0 0 16px 0', color: '#f3f4f6', fontSize: '16px' }}>Typography Settings</h3>
              
              <div className="setting-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#d1d5db', fontSize: '14px' }}>
                  Line Width: {settings.typography.lineWidth} chars
                </label>
                <input 
                  type="range" 
                  min="40" 
                  max="120" 
                  value={settings.typography.lineWidth} 
                  onChange={handleLineWidthChange}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div className="setting-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '4px', color: '#d1d5db', fontSize: '14px' }}>
                  Paragraph Spacing: {settings.typography.paragraphSpacing}rem
                </label>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1" 
                  value={settings.typography.paragraphSpacing} 
                  onChange={handleParagraphSpacingChange}
                  style={{ width: '100%' }}
                />
              </div>
              
              <div className="setting-group" style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: '#d1d5db', fontSize: '14px' }}>
                  Writing Goal
                </label>
                <input 
                  type="text" 
                  value={writingGoal} 
                  onChange={(e) => setWritingGoal(e.target.value)}
                  placeholder="What's your goal for this session?"
                  style={{
                    width: '100%',
                    padding: '6px 8px',
                    background: '#374151',
                    border: '1px solid #4b5563',
                    borderRadius: '4px',
                    color: '#f3f4f6',
                    fontSize: '14px'
                  }}
                />
              </div>
              
              <div className="document-stats" style={{ marginTop: '24px' }}>
                <h3 style={{ margin: '0 0 12px 0', color: '#f3f4f6', fontSize: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <BarChart size={16} /> Document Stats
                </h3>
                
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', color: '#d1d5db', fontSize: '14px' }}>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Words:</span>
                    <span>{wordCount}</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Characters:</span>
                    <span>{editedContent.length}</span>
                  </li>
                  <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                    <span>Reading Time:</span>
                    <span>{estimatedReadingTime} min</span>
                  </li>
                  {selectionStats.selected > 0 && (
                    <li style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span>Selected:</span>
                      <span>{selectionStats.selected} words</span>
                    </li>
                  )}
                </ul>
              </div>
            </div>
          )}
          
          {/* Main editor/reader area */}
          <div 
            className="editor-area"
            style={{
              flex: 1,
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Format toolbar (only in edit mode) */}
            {!isReadingMode && (
              <div
                className="format-toolbar"
                style={{
                  display: 'flex',
                  gap: '4px',
                  padding: '8px 16px',
                  borderBottom: '1px solid #374151',
                  background: '#1f2937',
                  overflowX: 'auto'
                }}
              >
                <FormatButton onClick={() => handleFormatClick('**')} title="Bold (Ctrl+B)">
                  <Bold size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('*')} title="Italic (Ctrl+I)">
                  <Italic size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('# ')} title="Heading 1">
                  <Heading1 size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('## ')} title="Heading 2">
                  <Heading2 size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('- ')} title="Bullet List">
                  <List size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('1. ')} title="Numbered List">
                  <ListOrdered size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('> ')} title="Quote">
                  <Quote size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('`')} title="Code">
                  <Code size={16} />
                </FormatButton>
                <FormatButton onClick={() => handleFormatClick('[](url)')} title="Link">
                  <Link size={16} />
                </FormatButton>
              </div>
            )}
            
            {/* Content area */}
            <div
              className="content-area"
              style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                background: '#111827',
                position: 'relative'
              }}
            >
              {isReadingMode ? (
                <TypographyContainer content={editedContent} className="reading-view">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: editedContent
                        .replace(/\n/g, '<br />')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code>$1</code>')
                    }} 
                  />
                </TypographyContainer>
              ) : (
                <textarea
                  ref={textareaRef}
                  value={editedContent}
                  onChange={handleContentChange}
                  onSelect={handleSelect}
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '16px',
                    border: '1px solid #374151',
                    borderRadius: '4px',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    fontFamily: settings.typography.fontPrimary,
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                    maxWidth: `${settings.typography.lineWidth * 0.6}rem`,
                    margin: '0 auto'
                  }}
                  placeholder="Write your note here..."
                />
              )}
            </div>
            
            {/* Footer */}
            <div
              style={{
                borderTop: '1px solid #374151',
                padding: '12px 16px',
                display: 'flex',
                justifyContent: 'space-between',
                background: '#111827',
                fontSize: '14px',
                color: '#9ca3af'
              }}
            >
              <div className="word-count">
                {wordCount} words
              </div>
              <div>
                {isReadingMode ? 'Reading Mode' : 'Markdown supported'} • Ctrl+S to save • Esc to close
              </div>
            </div>
          </div>
        </div>
        
        {/* Save button */}
        <button
          onClick={handleSave}
          style={{
            position: 'absolute',
            bottom: '20px',
            right: '20px',
            width: '56px',
            height: '56px',
            borderRadius: '28px',
            background: '#3b82f6',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            cursor: 'pointer'
          }}
          title="Save (Ctrl+S)"
        >
          <Check size={24} color="white" />
        </button>
      </div>
    </div>
  );

  // Use a portal to render the content to the body
  return ReactDOM.createPortal(modalContent, portalContainer);
};

export default FocusMode;
