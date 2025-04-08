import React, { useRef, useEffect, useState, useCallback, RefObject, useMemo, useLayoutEffect } from 'react';
import { 
  X, Check, Bold, Italic, List, ListOrdered, Heading1, Heading2, 
  Quote, Code, Link, AlignLeft, BookOpen, Clock, Target, Edit3,
  Eye, Type, ChevronsUp, ChevronsDown, BarChart, Search, ChevronDown
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
  
  // Theme variables based on current writing mode with fallback
  const defaultTheme = {
    background: '#111827',
    accent: '#3b82f6',
    text: '#f3f4f6'
  };
  
  // Use theme from settings if available, otherwise use default theme
  const currentTheme = settings.themes && settings.themes[currentWritingMode as keyof typeof settings.themes] 
    ? settings.themes[currentWritingMode as keyof typeof settings.themes] 
    : defaultTheme;
  
  // Pomodoro timer state
  const [pomodoroActive, setPomodoroActive] = useState(false);
  const [pomodoroMinutes, setPomodoroMinutes] = useState(25);
  const [pomodoroSeconds, setPomodoroSeconds] = useState(0);
  const [pomodoroInterval, setPomodoroInterval] = useState<number | null>(null);
  
  // Text-to-speech state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const speechUtterance = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Text-to-speech functions
  const speakText = useCallback(() => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(editedContent);
    utterance.rate = 0.9; // Slightly slower than default
    utterance.pitch = 1.0;
    
    // Get available voices and set a good one if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Daniel') || // macOS
      voice.name.includes('Google UK English Male') || // Chrome
      voice.name.includes('Microsoft David') // Windows
    );
    
    if (preferredVoice) utterance.voice = preferredVoice;
    
    // Set up event handlers
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    
    // Store reference to cancel later if needed
    speechUtterance.current = utterance;
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  }, [editedContent]);

  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  }, []);
  
  // Text-to-speech component
  const TextToSpeechControl = useCallback(() => (
    <div style={{
      padding: '12px',
      background: '#111827',
      borderRadius: '6px',
      border: '1px solid #374151',
      marginTop: '16px'
    }}>
      <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#e5e7eb' }}>
        Listen to Your Text
      </h4>
      <p style={{ margin: '0 0 12px 0', fontSize: '12px', color: '#9ca3af' }}>
        Hearing your text read aloud helps catch awkward phrasing and errors.
      </p>
      <div style={{ display: 'flex', gap: '8px' }}>
        {!isSpeaking ? (
          <button 
            onClick={speakText}
            style={{
              flex: 1,
              padding: '6px 12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            <span>Read Aloud</span>
          </button>
        ) : (
          <button 
            onClick={stopSpeaking}
            style={{
              flex: 1,
              padding: '6px 12px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Stop Reading
          </button>
        )}
      </div>
    </div>
  ), [isSpeaking, speakText, stopSpeaking]);
  
  // Clean up speech synthesis on unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis && isSpeaking) {
        window.speechSynthesis.cancel();
      }
    };
  }, [isSpeaking]);
  
  // Pomodoro timer functions
  const startPomodoro = useCallback(() => {
    if (pomodoroInterval) clearInterval(pomodoroInterval);
    
    setPomodoroActive(true);
    setPomodoroMinutes(settings.focus.pomodoroDuration);
    setPomodoroSeconds(0);
    
    const interval = setInterval(() => {
      setPomodoroSeconds(prev => {
        if (prev === 0) {
          setPomodoroMinutes(prevMin => {
            if (prevMin === 0) {
              // Timer complete
              clearInterval(interval);
              setPomodoroActive(false);
              // Play sound or show notification
              try {
                new Audio('/notification.mp3').play().catch(e => console.log('Audio play failed:', e));
              } catch (e) {
                console.log('Audio play failed:', e);
              }
              return 0;
            }
            return prevMin - 1;
          });
          return 59;
        }
        return prev - 1;
      });
    }, 1000);
    
    setPomodoroInterval(interval);
  }, [pomodoroInterval, settings.focus.pomodoroDuration]);

  const stopPomodoro = useCallback(() => {
    if (pomodoroInterval) {
      clearInterval(pomodoroInterval);
      setPomodoroInterval(null);
    }
    setPomodoroActive(false);
  }, [pomodoroInterval]);
  
  // Pomodoro Timer component
  const PomodoroTimer = useCallback(() => (
    <div style={{
      padding: '12px',
      background: '#111827',
      borderRadius: '6px',
      border: '1px solid #374151',
      marginTop: '16px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '8px'
      }}>
        <h4 style={{ margin: 0, fontSize: '14px', color: '#e5e7eb' }}>
          Focus Timer
        </h4>
        <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#e5e7eb' }}>
          {String(pomodoroMinutes).padStart(2, '0')}:{String(pomodoroSeconds).padStart(2, '0')}
        </div>
      </div>
      <div style={{ display: 'flex', gap: '8px' }}>
        {!pomodoroActive ? (
          <button 
            onClick={startPomodoro}
            style={{
              flex: 1,
              padding: '6px 12px',
              background: '#3b82f6',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Start Focus Session
          </button>
        ) : (
          <button 
            onClick={stopPomodoro}
            style={{
              flex: 1,
              padding: '6px 12px',
              background: '#ef4444',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            Stop Timer
          </button>
        )}
      </div>
    </div>
  ), [pomodoroActive, pomodoroMinutes, pomodoroSeconds, startPomodoro, stopPomodoro]);
  
  // Clean up pomodoro timer on unmount
  useEffect(() => {
    return () => {
      if (pomodoroInterval) clearInterval(pomodoroInterval);
    };
  }, [pomodoroInterval]);
  
  // Word frequency analysis
  const analyzeWordFrequency = useCallback((text: string) => {
    // Remove common punctuation and convert to lowercase
    const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, '');
    
    // Split into words
    const words = cleanText.split(/\s+/);
    
    // Count word frequency
    const wordFrequency: Record<string, number> = {};
    const commonWords = new Set(['the', 'and', 'a', 'to', 'of', 'in', 'is', 'it', 'that', 'was', 'for', 'on', 'with']);
    
    words.forEach(word => {
      // Skip very short words and common words
      if (word.length <= 2 || commonWords.has(word)) return;
      
      wordFrequency[word] = (wordFrequency[word] || 0) + 1;
    });
    
    // Sort by frequency
    return Object.entries(wordFrequency)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10); // Top 10 most frequent words
  }, []);
  
  // Memoize the word frequency analysis to avoid recalculating on every render
  const frequentWords = useMemo(() => {
    if (currentWritingMode === 'editing') {
      return analyzeWordFrequency(editedContent);
    }
    return [];
  }, [editedContent, currentWritingMode, analyzeWordFrequency]);
  
  // Word Frequency Display component
  const WordFrequencyDisplay = useCallback(() => {
    return (
      <div className="word-frequency-panel" style={{
        padding: '12px',
        background: '#111827',
        borderRadius: '6px',
        border: '1px solid #374151',
        marginTop: '16px'
      }}>
        <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', color: '#e5e7eb' }}>
          Frequently Used Words
        </h4>
        {frequentWords.length > 0 ? (
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {frequentWords.map(([word, count]) => (
              <div key={word} style={{
                padding: '4px 8px',
                background: '#1f2937',
                borderRadius: '4px',
                fontSize: '12px',
                color: count > 3 ? '#ef4444' : '#9ca3af'
              }}>
                {word} ({count})
              </div>
            ))}
          </div>
        ) : (
          <div style={{ fontSize: '13px', color: '#9ca3af' }}>
            No significant word patterns detected yet.
          </div>
        )}
      </div>
    );
  }, [frequentWords]);
  
  // Typewriter mode state
  const enableTypewriterMode = useCallback(() => {
    if (textareaRef.current && currentWritingMode === 'drafting') {
      // Get the current cursor position
      const cursorPosition = textareaRef.current.selectionStart;
      
      // Find the line number of the cursor
      const text = textareaRef.current.value;
      const lines = text.substr(0, cursorPosition).split('\n');
      const currentLineNumber = lines.length;
      
      // Calculate line height (can be determined from computed styles)
      const lineHeight = parseInt(window.getComputedStyle(textareaRef.current).lineHeight) || 24;
      
      // Calculate the position to scroll to (center the current line)
      const scrollPosition = (currentLineNumber - 1) * lineHeight - 
        (textareaRef.current.clientHeight / 2) + (lineHeight / 2);
      
      // Scroll to position
      textareaRef.current.scrollTop = Math.max(0, scrollPosition);
    }
  }, [currentWritingMode]);
  
  
  // Calculate word count when content changes
  useEffect(() => {
    const words = editedContent.split(/\s+/).filter(word => word.length > 0).length;
    setWordCount(words);
    
    // Publish content change event
    eventBus.publish('document:contentChanged', editedContent, words);
  }, [editedContent]);
  
  // Typewriter mode effect
  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea && currentWritingMode === 'drafting') {
      const handleKeyUp = () => enableTypewriterMode();
      const handleClick = () => enableTypewriterMode();
      
      textarea.addEventListener('keyup', handleKeyUp);
      textarea.addEventListener('click', handleClick);
      
      return () => {
        textarea.removeEventListener('keyup', handleKeyUp);
        textarea.removeEventListener('click', handleClick);
      };
    }
  }, [textareaRef, currentWritingMode, enableTypewriterMode]);

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
        <div className="focus-mode-title" style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '8px', 
            background: '#1f2937', 
            padding: '6px 12px', 
            borderRadius: '6px',
            border: '1px solid #374151'
          }}>
            {WRITING_MODES.find(m => m.id === currentWritingMode)?.icon}
            <select 
              value={currentWritingMode}
              onChange={(e) => changeWritingMode(e.target.value)}
              style={{
                background: 'transparent',
                border: 'none',
                color: '#f3f4f6',
                fontSize: '15px',
                fontWeight: 500,
                cursor: 'pointer',
                padding: '0',
                appearance: 'none',
                marginRight: '24px',
                position: 'relative'
              }}
            >
              {WRITING_MODES.map(mode => (
                <option key={mode.id} value={mode.id}>{mode.name} Mode</option>
              ))}
            </select>
            <ChevronDown size={14} style={{ position: 'absolute', marginLeft: '130px', color: '#9ca3af' }} />
          </div>
          
          <div style={{ marginLeft: '16px', fontSize: '14px', color: '#9ca3af' }}>
            {currentWritingMode === 'brainstorming' && 'Free-form idea generation without judgment'}
            {currentWritingMode === 'drafting' && 'Focus on getting your thoughts down quickly'}
            {currentWritingMode === 'editing' && 'Refine and improve your existing content'}
            {currentWritingMode === 'reviewing' && 'Final review and polish before completion'}
          </div>
        </div>
        
        <div className="focus-mode-controls" style={{ display: 'flex', gap: '8px' }}>
          <button
            onClick={toggleReadingMode}
            className={`mode-toggle-btn ${isReadingMode ? 'active' : ''}`}
            style={{
              background: isReadingMode ? currentTheme.accent : '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: isReadingMode ? '#ffffff' : '#e5e7eb',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
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
              background: showSettingsPanel ? currentTheme.accent : '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              color: showSettingsPanel ? '#ffffff' : '#e5e7eb',
              fontSize: '14px',
              cursor: 'pointer',
              transition: 'all 0.2s ease'
            }}
            title="Toggle Settings (Ctrl+,)"
          >
            <Type size={16} />
            <span>Settings</span>
          </button>
          
          <button
            onClick={onClose}
            style={{
              background: '#1f2937',
              border: '1px solid #374151',
              borderRadius: '6px',
              cursor: 'pointer',
              padding: '6px 12px',
              display: 'flex',
              alignItems: 'center',
              color: '#e5e7eb',
              transition: 'all 0.2s ease'
            }}
            title="Close (Esc)"
          >
            <X size={16} />
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
                width: '280px',
                borderRight: '1px solid #374151',
                background: '#1f2937',
                padding: '20px',
                overflow: 'auto'
              }}
            >
              <h3 style={{ 
                margin: '0 0 20px 0', 
                color: '#f3f4f6', 
                fontSize: '16px',
                borderBottom: '1px solid #374151',
                paddingBottom: '10px'
              }}>
                Writing Settings
              </h3>
              
              <div className="setting-group" style={{ marginBottom: '24px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '8px' 
                }}>
                  <label style={{ color: '#e5e7eb', fontSize: '14px', fontWeight: 500 }}>
                    Line Width
                  </label>
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                    {settings.typography.lineWidth} chars
                  </span>
                </div>
                <input 
                  type="range" 
                  min="40" 
                  max="120" 
                  value={settings.typography.lineWidth} 
                  onChange={handleLineWidthChange}
                  style={{ 
                    width: '100%',
                    accentColor: '#3b82f6'
                  }}
                />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '12px', 
                  color: '#9ca3af',
                  marginTop: '4px'
                }}>
                  <span>Narrow</span>
                  <span>Wide</span>
                </div>
              </div>
              
              <div className="setting-group" style={{ marginBottom: '24px' }}>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center', 
                  marginBottom: '8px' 
                }}>
                  <label style={{ color: '#e5e7eb', fontSize: '14px', fontWeight: 500 }}>
                    Paragraph Spacing
                  </label>
                  <span style={{ color: '#9ca3af', fontSize: '13px' }}>
                    {settings.typography.paragraphSpacing}rem
                  </span>
                </div>
                <input 
                  type="range" 
                  min="1" 
                  max="3" 
                  step="0.1" 
                  value={settings.typography.paragraphSpacing} 
                  onChange={handleParagraphSpacingChange}
                  style={{ 
                    width: '100%',
                    accentColor: '#3b82f6'
                  }}
                />
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  fontSize: '12px', 
                  color: '#9ca3af',
                  marginTop: '4px'
                }}>
                  <span>Compact</span>
                  <span>Spacious</span>
                </div>
              </div>
              
              <div className="setting-group" style={{ marginBottom: '24px' }}>
                <label style={{ 
                  display: 'block', 
                  marginBottom: '8px', 
                  color: '#e5e7eb', 
                  fontSize: '14px',
                  fontWeight: 500
                }}>
                  Writing Goal
                </label>
                <input 
                  type="text" 
                  value={writingGoal} 
                  onChange={(e) => setWritingGoal(e.target.value)}
                  placeholder="What's your goal for this session?"
                  style={{
                    width: '100%',
                    padding: '8px 12px',
                    background: '#111827',
                    border: '1px solid #374151',
                    borderRadius: '6px',
                    color: '#f3f4f6',
                    fontSize: '14px'
                  }}
                />
                <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '6px' }}>
                  Setting a clear goal helps focus your writing session
                </div>
              </div>
              
              <div className="document-stats" style={{ 
                marginTop: '24px',
                background: '#111827',
                padding: '16px',
                borderRadius: '6px',
                border: '1px solid #374151'
              }}>
                <h3 style={{ 
                  margin: '0 0 12px 0', 
                  color: '#f3f4f6', 
                  fontSize: '15px', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '6px' 
                }}>
                  <BarChart size={16} /> Document Stats
                </h3>
                
                <ul style={{ 
                  margin: 0, 
                  padding: 0, 
                  listStyle: 'none', 
                  color: '#d1d5db', 
                  fontSize: '14px',
                  display: 'grid',
                  gap: '8px'
                }}>
                  <li style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '4px 0',
                    borderBottom: '1px solid #1f2937'
                  }}>
                    <span>Words</span>
                    <span className="font-medium">{wordCount}</span>
                  </li>
                  <li style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '4px 0',
                    borderBottom: '1px solid #1f2937'
                  }}>
                    <span>Characters</span>
                    <span className="font-medium">{editedContent.length}</span>
                  </li>
                  <li style={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    padding: '4px 0',
                    borderBottom: '1px solid #1f2937'
                  }}>
                    <span>Reading Time</span>
                    <span className="font-medium">{estimatedReadingTime} min</span>
                  </li>
                  {selectionStats.selected > 0 && (
                    <li style={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      padding: '4px 0',
                      borderBottom: '1px solid #1f2937'
                    }}>
                      <span>Selected</span>
                      <span className="font-medium">{selectionStats.selected} words</span>
                    </li>
                  )}
                </ul>
                
                <div style={{ 
                  marginTop: '16px', 
                  fontSize: '13px', 
                  color: '#9ca3af',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px'
                }}>
                  <Clock size={14} />
                  <span>Stats update as you type</span>
                </div>
              </div>
              
              {/* Pomodoro Timer (only in brainstorming mode) */}
              {currentWritingMode === 'brainstorming' && (
                <PomodoroTimer />
              )}
              
              {/* Word Frequency Analysis (only in editing mode) */}
              {currentWritingMode === 'editing' && (
                <WordFrequencyDisplay />
              )}
              
              {/* Text-to-Speech (only in reviewing mode) */}
              {currentWritingMode === 'reviewing' && (
                <TextToSpeechControl />
              )}
              
              <div style={{ 
                marginTop: '24px', 
                padding: '12px', 
                background: '#111827', 
                borderRadius: '6px',
                border: '1px solid #374151',
                fontSize: '13px',
                color: '#9ca3af'
              }}>
                <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Search size={14} />
                  <span style={{ color: '#e5e7eb' }}>Writing Mode Tips</span>
                </div>
                {currentWritingMode === 'brainstorming' && (
                  <p style={{ margin: '0' }}>In brainstorming mode, focus on quantity over quality. Write down all ideas without judgment.</p>
                )}
                {currentWritingMode === 'drafting' && (
                  <p style={{ margin: '0' }}>In drafting mode, get your thoughts down quickly. Don't worry about perfection - that comes later.</p>
                )}
                {currentWritingMode === 'editing' && (
                  <p style={{ margin: '0' }}>In editing mode, refine your work. Look for clarity, conciseness, and coherence.</p>
                )}
                {currentWritingMode === 'reviewing' && (
                  <p style={{ margin: '0' }}>In reviewing mode, do a final check. Look for typos, formatting issues, and overall flow.</p>
                )}
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
                  padding: '12px 16px',
                  borderBottom: '1px solid #374151',
                  background: '#1f2937',
                  overflowX: 'auto'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <FormatButton onClick={() => handleFormatClick('**')} title="Bold (Ctrl+B)">
                    <Bold size={16} />
                  </FormatButton>
                  <FormatButton onClick={() => handleFormatClick('*')} title="Italic (Ctrl+I)">
                    <Italic size={16} />
                  </FormatButton>
                  
                  <div style={{ width: '1px', height: '24px', background: '#4b5563', margin: '0 8px' }}></div>
                  
                  <FormatButton onClick={() => handleFormatClick('# ')} title="Heading 1">
                    <Heading1 size={16} />
                  </FormatButton>
                  <FormatButton onClick={() => handleFormatClick('## ')} title="Heading 2">
                    <Heading2 size={16} />
                  </FormatButton>
                  
                  <div style={{ width: '1px', height: '24px', background: '#4b5563', margin: '0 8px' }}></div>
                  
                  <FormatButton onClick={() => handleFormatClick('- ')} title="Bullet List">
                    <List size={16} />
                  </FormatButton>
                  <FormatButton onClick={() => handleFormatClick('1. ')} title="Numbered List">
                    <ListOrdered size={16} />
                  </FormatButton>
                  
                  <div style={{ width: '1px', height: '24px', background: '#4b5563', margin: '0 8px' }}></div>
                  
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
                
                <div style={{ 
                  marginLeft: 'auto', 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '8px',
                  color: '#9ca3af',
                  fontSize: '13px'
                }}>
                  {currentWritingMode === 'brainstorming' && 'Brainstorming: Just get ideas down'}
                  {currentWritingMode === 'drafting' && 'Drafting: Focus on content, not perfection'}
                  {currentWritingMode === 'editing' && 'Editing: Refine and improve your work'}
                  {currentWritingMode === 'reviewing' && 'Reviewing: Final polish before completion'}
                </div>
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
                position: 'relative',
                display: 'flex',
                justifyContent: 'center'
              }}
            >
              <div style={{ 
                width: '100%', 
                maxWidth: isReadingMode ? '700px' : `${settings.typography.lineWidth * 0.6}rem`,
                margin: '0 auto'
              }}>
                {isReadingMode ? (
                  <TypographyContainer content={editedContent} className="reading-view">
                    <div 
                      style={{
                        padding: '20px',
                        background: '#1f2937',
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                        border: '1px solid #374151'
                      }}
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
                      padding: '20px',
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      fontSize: '16px',
                      lineHeight: '1.6',
                      fontFamily: settings.typography.fontPrimary,
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

  // Use a portal to render the content to the body
  return ReactDOM.createPortal(modalContent, portalContainer);
};

export default FocusMode;
