import React from 'react';
import ReactDOM from 'react-dom';
import { Check } from 'lucide-react';
import { FocusModeOptions } from '../types';
import { useFocusMode } from '../hooks/useFocusMode';
import { FocusModeToolbar } from './FocusModeToolbar';
import { FocusModeHeader } from './FocusModeHeader';
import { SettingsPanel } from './SettingsPanel';
import { MarkdownEditor } from '../../markdown-editor';

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
      className={`focus-mode-overlay focus-mode-${writingMode}`} 
      onClick={handleClose}
    >
      {/* Modal container */}
      <div 
        className="focus-mode-container"
        style={{
          background: currentTheme.background
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
        <div className="focus-mode-main">
          {/* Settings panel */}
          {showSettingsPanel && (
            <div className="focus-mode-settings">
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
            </div>
          )}
          
          {/* Main editor/reader area */}
          <div className="focus-mode-editor">
            {/* Format toolbar (only in edit mode) */}
            <FocusModeToolbar 
              handleFormatClick={(format) => {
                if (textareaRef.current) {
                  const textarea = textareaRef.current;
                  // Placeholder for formatting functionality
                }
              }}
              currentWritingMode={writingMode}
            />
            
            {isReadingMode ? (
              <div className="focus-mode-reading">
                <div className="reading-view">
                  <div 
                    dangerouslySetInnerHTML={{ 
                      __html: content
                        .replace(/\n/g, '<br />')
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                        .replace(/\*(.*?)\*/g, '<em>$1</em>')
                        .replace(/`(.*?)`/g, '<code>$1</code>')
                    }} 
                  />
                </div>
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={content}
                onChange={handleContentChange}
                className="focus-mode-editor-area"
                placeholder="Write your note here..."
              />
            )}
            
            {/* Footer */}
            <div className="focus-mode-footer">
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
          className="focus-mode-save-button"
          title="Save (Ctrl+S)"
        >
          <Check size={24} />
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
