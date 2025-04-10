import { useState, useRef, useEffect, useCallback } from 'react';
import { services } from '../../../services/ServiceProvider';
import { useSettingsStore } from '../../../store/settingsStore';
import {
  WritingMode,
  FocusModeOptions,
  PomodoroState,
  TTSState,
  FocusSessionStats,
  WritingModeInfo,
  WritingModeTheme,
} from '../types';

/**
 * Default themes for writing modes
 */
const DEFAULT_THEMES: Record<WritingMode, WritingModeTheme> = {
  brainstorming: {
    background: '#111827', // Dark blue
    accent: '#8b5cf6', // Purple
    text: '#f3f4f6'
  },
  drafting: {
    background: '#111827', // Dark blue
    accent: '#3b82f6', // Blue
    text: '#f3f4f6'
  },
  editing: {
    background: '#111827', // Dark blue
    accent: '#10b981', // Green
    text: '#f3f4f6'
  },
  reviewing: {
    background: '#111827', // Dark blue
    accent: '#f59e0b', // Amber
    text: '#f3f4f6'
  }
};

/**
 * Writing mode information with icons and descriptions
 */
const WRITING_MODES: WritingModeInfo[] = [
  { 
    id: 'brainstorming', 
    name: 'Brainstorming', 
    icon: 'Target',
    description: 'Free-form idea generation without judgment'
  },
  { 
    id: 'drafting', 
    name: 'Drafting', 
    icon: 'Edit3',
    description: 'Focus on getting your thoughts down quickly'
  },
  { 
    id: 'editing', 
    name: 'Editing', 
    icon: 'ChevronsUp',
    description: 'Refine and improve your existing content'
  },
  { 
    id: 'reviewing', 
    name: 'Reviewing', 
    icon: 'Eye',
    description: 'Final review and polish before completion'
  }
];

/**
 * Hook for managing focus mode state and functionality
 */
export const useFocusMode = (options: FocusModeOptions) => {
  const {
    initialContent,
    onSave,
    onClose,
    initialMode = 'drafting',
    initialGoal = '',
    enablePomodoro = true,
    themes = DEFAULT_THEMES,
    typography,
  } = options;

  // Get settings from store
  const { settings, updateSetting } = useSettingsStore();
  
  // Content state
  const [content, setContent] = useState(initialContent);
  const [isReadingMode, setIsReadingMode] = useState(false);
  const [showSettingsPanel, setShowSettingsPanel] = useState(true);
  const previousContentRef = useRef(initialContent);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  
  // Session state
  const [sessionStartTime] = useState(new Date());
  const [writingMode, setWritingMode] = useState<WritingMode>(initialMode);
  const [writingGoal, setWritingGoal] = useState(initialGoal);
  const [stats, setStats] = useState<Omit<FocusSessionStats, 'endTime'>>({
    duration: 0,
    wordsWritten: 0,
    wordsDeleted: 0,
    startTime: sessionStartTime,
    mode: initialMode,
    goal: initialGoal,
  });
  
  // Pomodoro state
  const [pomodoro, setPomodoro] = useState<PomodoroState>({
    active: false,
    minutes: settings.focus.pomodoroDuration,
    seconds: 0,
    isBreak: false,
    duration: settings.focus.pomodoroDuration,
  });
  const pomodoroIntervalRef = useRef<number | null>(null);
  
  // Text-to-speech state
  const [tts, setTTS] = useState<TTSState>({
    isSpeaking: false,
    rate: 0.9,
    pitch: 1.0,
  });
  const speechUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  
  // Portal container for the modal
  const [portalContainer] = useState(() => {
    if (typeof document !== 'undefined') {
      return document.createElement('div');
    }
    return null;
  });
  
  // Get current theme based on writing mode
  const currentTheme = themes[writingMode] || DEFAULT_THEMES[writingMode];
  
  // Apply writing mode change
  const changeWritingMode = useCallback((mode: WritingMode) => {
    setWritingMode(mode);
    
    // Store in settings
    updateSetting('focus.writingMode', mode);
    
    // Publish writing mode change event
    services.events.typedPublish('focus:session:start', mode, writingGoal);
  }, [updateSetting, writingGoal]);
  
  // Word counting
  useEffect(() => {
    // Calculate word count
    const words = content.split(/\s+/).filter(word => word.length > 0).length;
    const prevWords = previousContentRef.current.split(/\s+/).filter(word => word.length > 0).length;
    
    // Calculate words written/deleted
    const wordsWritten = Math.max(0, words - prevWords);
    const wordsDeleted = Math.max(0, prevWords - words);
    
    // Update stats
    setStats(prev => ({
      ...prev,
      wordsWritten: prev.wordsWritten + wordsWritten,
      wordsDeleted: (prev.wordsDeleted || 0) + wordsDeleted,
    }));
    
    // Store current content for next comparison
    previousContentRef.current = content;
    
    // Publish content change event
    services.events.typedPublish('document:contentChanged', content, words);
  }, [content]);
  
  // Handle content change
  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);
  
  // Toggle reading mode
  const toggleReadingMode = useCallback(() => {
    setIsReadingMode(prev => !prev);
    services.events.typedPublish('ui:readingMode:toggle', !isReadingMode);
  }, [isReadingMode]);
  
  // Handle save
  const handleSave = useCallback(() => {
    if (onSave) {
      onSave(content);
      
      // Publish document saved event
      services.events.typedPublish('document:saved', 'focus-mode-document');
      
      // Record final session stats
      const endStats: FocusSessionStats = {
        ...stats,
        endTime: new Date(),
        duration: new Date().getTime() - sessionStartTime.getTime(),
      };
      
      // Publish session end event
      services.events.typedPublish('focus:session:end', endStats);
    }
  }, [content, onSave, sessionStartTime, stats]);
  
  // Handle close
  const handleClose = useCallback(() => {
    // Stop any active processes
    if (pomodoroIntervalRef.current) {
      window.clearInterval(pomodoroIntervalRef.current);
    }
    
    if (tts.isSpeaking && window.speechSynthesis) {
      window.speechSynthesis.cancel();
    }
    
    // Call onClose callback
    if (onClose) {
      onClose();
    }
  }, [onClose, tts.isSpeaking]);
  
  // Start pomodoro timer
  const startPomodoro = useCallback(() => {
    if (pomodoroIntervalRef.current) {
      window.clearInterval(pomodoroIntervalRef.current);
    }
    
    setPomodoro(prev => ({
      ...prev,
      active: true,
      minutes: settings.focus.pomodoroDuration,
      seconds: 0,
    }));
    
    const interval = window.setInterval(() => {
      setPomodoro(prev => {
        if (prev.seconds === 0) {
          if (prev.minutes === 0) {
            // Timer complete
            window.clearInterval(interval);
            
            // Publish pomodoro complete event
            services.events.typedPublish('focus:pomodoro:complete', prev.isBreak);
            
            // Play notification sound
            try {
              const audio = new Audio('/notification.mp3');
              audio.play().catch(e => console.error('Failed to play notification:', e));
            } catch (error) {
              console.error('Audio play failed:', error);
            }
            
            return {
              ...prev,
              active: false,
            };
          }
          
          // Decrement minute, reset seconds
          return {
            ...prev,
            minutes: prev.minutes - 1,
            seconds: 59,
          };
        }
        
        // Decrement seconds
        return {
          ...prev,
          seconds: prev.seconds - 1,
        };
      });
    }, 1000);
    
    pomodoroIntervalRef.current = interval;
  }, [settings.focus.pomodoroDuration]);
  
  // Stop pomodoro timer
  const stopPomodoro = useCallback(() => {
    if (pomodoroIntervalRef.current) {
      window.clearInterval(pomodoroIntervalRef.current);
      pomodoroIntervalRef.current = null;
    }
    
    setPomodoro(prev => ({
      ...prev,
      active: false,
    }));
  }, []);
  
  // Text-to-speech functions
  const speakText = useCallback(() => {
    if (!window.speechSynthesis) return;
    
    // Cancel any ongoing speech
    window.speechSynthesis.cancel();
    
    // Create new utterance
    const utterance = new SpeechSynthesisUtterance(content);
    utterance.rate = tts.rate;
    utterance.pitch = tts.pitch;
    
    // Get available voices and set a good one if available
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(voice => 
      voice.name.includes('Daniel') || // macOS
      voice.name.includes('Google UK English Male') || // Chrome
      voice.name.includes('Microsoft David') // Windows
    );
    
    if (preferredVoice) utterance.voice = preferredVoice;
    
    // Set up event handlers
    utterance.onstart = () => setTTS(prev => ({ ...prev, isSpeaking: true }));
    utterance.onend = () => setTTS(prev => ({ ...prev, isSpeaking: false }));
    utterance.onerror = () => setTTS(prev => ({ ...prev, isSpeaking: false }));
    
    // Store reference to cancel later if needed
    speechUtteranceRef.current = utterance;
    
    // Start speaking
    window.speechSynthesis.speak(utterance);
  }, [content, tts.pitch, tts.rate]);
  
  // Stop speech
  const stopSpeaking = useCallback(() => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setTTS(prev => ({ ...prev, isSpeaking: false }));
    }
  }, []);
  
  // Set up keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (showSettingsPanel) {
          setShowSettingsPanel(false);
        } else {
          handleClose();
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
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClose, handleSave, showSettingsPanel, toggleReadingMode]);
  
  // Set up portal container
  useEffect(() => {
    if (portalContainer) {
      // Set up portal container styles
      portalContainer.style.position = 'fixed';
      portalContainer.style.top = '0';
      portalContainer.style.left = '0';
      portalContainer.style.width = '100vw';
      portalContainer.style.height = '100vh';
      portalContainer.style.zIndex = '10000';
      portalContainer.style.pointerEvents = 'auto';
      
      // Add the portal to body
      document.body.appendChild(portalContainer);
      
      // Prevent scrolling on the main document
      const originalStyle = window.getComputedStyle(document.body).overflow;
      document.body.style.overflow = 'hidden';
      
      // Auto-focus textarea
      if (textareaRef.current) {
        setTimeout(() => {
          if (textareaRef.current) {
            textareaRef.current.focus();
            // Place cursor at end
            const length = textareaRef.current.value.length;
            textareaRef.current.setSelectionRange(length, length);
          }
        }, 0);
      }
      
      // Clean up on unmount
      return () => {
        if (document.body.contains(portalContainer)) {
          document.body.removeChild(portalContainer);
        }
        document.body.style.overflow = originalStyle;
        
        // Clean up any resources
        if (pomodoroIntervalRef.current) {
          window.clearInterval(pomodoroIntervalRef.current);
        }
        
        if (window.speechSynthesis && tts.isSpeaking) {
          window.speechSynthesis.cancel();
        }
      };
    }
  }, [portalContainer, tts.isSpeaking]);
  
  // Get current writing mode info
  const currentModeInfo = WRITING_MODES.find(mode => mode.id === writingMode) || WRITING_MODES[1];

  return {
    // Content
    content,
    setContent,
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
  };
};
