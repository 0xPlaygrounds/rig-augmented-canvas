import React from 'react';
import ReactDOM from 'react-dom';
import { Check } from 'lucide-react';
import { FocusModeOptions } from '../types';
import { useFocusMode } from '../hooks/useFocusMode';
import { FocusModeToolbar } from './FocusModeToolbar';
import { FocusModeHeader } from './FocusModeHeader';
import { SettingsPanel } from './SettingsPanel';
import { MarkdownEditor } from '../../markdown-editor';
import { TypographyContainer } from '../../../components/Typography';

/**
 * Enhanced focus mode editor with typography controls
 * - Customizable line width
 * - Reading mode toggle
 * - Word count tracking
 * - Writing mode selector
 * - UI transitions
 */
export const FocusMode: React.FC<FocusModeOptions> = (options) => {
  const {
    initialContent,
    onSave,
    onClose,
    initialMode,
    initialGoal,
    enablePomodoro,
    themes,
    typography,
  } = options;
  
  const {
    // Content
    content,
    handleContentChange,
    
    // UI State
    isReadingMode,
    toggleReadingMode,
    showSettingsPanel,
    setShowSettingsPanel,
    
    // Writing mode
    writingMode,
    changeWritingMode,
    currentModeInfo,
    writingGoal,
    setWritingGoal,
    
    // Theming
    currentTheme,
    
    // Stats
    stats,
    
    // Pomodoro
    pomodoro,
    startPomodoro,
    stopPomodoro,
    
    // Text-to-speech
    tts,
    speakText,
    stopSpeaking,
    
    // Actions
    handleSave,
    handleClose,
    
    // References
    textareaRef,
    portalContainer,
    
    // Constants
    WRITING_MODES,
  } = useFocusMode(options);

  // Word count calculation
  const wordCount = content.split(/\s+/).filter(word => word.length > 0).length;

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
      onClick={handleClose}
    >
      {/* Modal container */}
      <div 
        className="focus-mode-container"
        style={{
          width: '95%',
          maxWidth: '1200px',
          height: '90%',
          background: currentTheme.background,
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
        <FocusModeHeader 
          writingMode={writingMode}
          changeWritingMode={changeWritingMode}
          currentModeInfo={currentModeInfo}
          isReadingMode={isReadingMode}
          toggleReadingMode={toggleReadingMode}
          showSettingsPanel={showSettingsPanel}
          setShowSettingsPanel={setShowSettingsPanel}
          onClose={handleClose}
          WRITING_MODES={WRITING_MODES}
        />

        {/* Main content area with sidebar if settings are shown */}
        <div className="focus-mode-main" style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Settings panel */}
          {showSettingsPanel && (
            <SettingsPanel 
              wordCount={wordCount}
              writingMode={writingMode}
              writingGoal={writingGoal}
              setWritingGoal={setWritingGoal}
              stats={stats}
              pomodoro={pomodoro}
              startPomodoro={startPomodoro}
              stopPomodoro={stopPomodoro}
              tts={tts}
              speakText={speakText}
              stopSpeaking={stopSpeaking}
              content={content}
            />
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
              <FocusModeToolbar 
                handleFormatClick={(format) => {
                  if (textareaRef.current) {
                    const textarea = textareaRef.current;
                    const { selectionStart, selectionEnd } = textarea;
                    
                    // This would be implemented with the markdown editor formatting util
                    // Let's use the MarkdownToolbar from the markdown-editor feature
                    // For now we're just referencing this
                  }
                }}
                currentWritingMode={writingMode}
              />
            )}
            
            {/* Content area */}
            <div
              className="content-area"
              style={{
                flex: 1,
                padding: '20px',
                overflowY: 'auto',
                background: '#111827',
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              {isReadingMode ? (
                <TypographyContainer content={content} className="reading-view">
                  <div 
                    style={{
                      padding: '20px',
                      background: '#1f2937',
                      borderRadius: '8px',
                      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                      border: '1px solid #374151'
                    }}
                    dangerouslySetInnerHTML={{ 
                      __html: content
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
                  value={content}
                  onChange={handleContentChange}
                  style={{
                    width: '100%',
                    height: '100%',
                    padding: '20px',
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    fontSize: '16px',
                    lineHeight: '1.6',
                    resize: 'none',
                    outline: 'none',
                    boxSizing: 'border-box',
                    backgroundColor: '#1f2937',
                    color: '#f3f4f6',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
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
            background: currentTheme.accent,
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

  if (!portalContainer) {
    return null;
  }

  // Use a portal to render the content to the body
  return ReactDOM.createPortal(modalContent, portalContainer);
};

export default FocusMode;
