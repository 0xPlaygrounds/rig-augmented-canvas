import React, { useMemo } from 'react';
import { BarChart, Clock, Search, Target, Clock as ClockIcon } from 'lucide-react';
import { WritingMode, PomodoroState, TTSState, FocusSessionStats } from '../types';
import { useSettingsStore } from '../../../store/settingsStore';

interface SettingsPanelProps {
  wordCount: number;
  writingMode: WritingMode;
  writingGoal: string;
  setWritingGoal: (goal: string) => void;
  stats: Omit<FocusSessionStats, 'endTime'>;
  pomodoro: PomodoroState;
  startPomodoro: () => void;
  stopPomodoro: () => void;
  tts: TTSState;
  speakText: () => void;
  stopSpeaking: () => void;
  content: string;
}

/**
 * Settings panel component for the Focus Mode
 * Shows different settings based on the current writing mode
 */
export const SettingsPanel: React.FC<SettingsPanelProps> = ({
  wordCount,
  writingMode,
  writingGoal,
  setWritingGoal,
  stats,
  pomodoro,
  startPomodoro,
  stopPomodoro,
  tts,
  speakText,
  stopSpeaking,
  content
}) => {
  const { settings, updateSetting } = useSettingsStore();

  // Word frequency analysis
  const analyzeWordFrequency = (text: string) => {
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
  };
  
  // Memoize the word frequency analysis to avoid recalculating on every render
  const frequentWords = useMemo(() => {
    if (writingMode === 'editing') {
      return analyzeWordFrequency(content);
    }
    return [];
  }, [content, writingMode]);

  // Calculate estimated reading time (about 200 words per minute)
  const estimatedReadingTime = Math.max(1, Math.ceil(wordCount / 200));

  // Update line width setting
  const handleLineWidthChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    updateSetting('typography.lineWidth', value);
  };

  // Update paragraph spacing setting
  const handleParagraphSpacingChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    updateSetting('typography.paragraphSpacing', value);
  };

  return (
    <div>
      <h3 className="focus-mode-settings-title">
        Writing Settings
      </h3>
      
      <div className="focus-mode-setting-group">
        <div className="focus-mode-setting-label">
          <span className="focus-mode-setting-name">
            Line Width
          </span>
          <span className="focus-mode-setting-value">
            {settings.typography.lineWidth} chars
          </span>
        </div>
        <input 
          type="range" 
          min="40" 
          max="120" 
          value={settings.typography.lineWidth} 
          onChange={handleLineWidthChange}
          className="focus-mode-setting-slider"
        />
        <div className="focus-mode-setting-range">
          <span>Narrow</span>
          <span>Wide</span>
        </div>
      </div>
      
      <div className="focus-mode-setting-group">
        <div className="focus-mode-setting-label">
          <span className="focus-mode-setting-name">
            Paragraph Spacing
          </span>
          <span className="focus-mode-setting-value">
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
          className="focus-mode-setting-slider"
        />
        <div className="focus-mode-setting-range">
          <span>Compact</span>
          <span>Spacious</span>
        </div>
      </div>
      
      <div className="focus-mode-setting-group">
        <label className="focus-mode-setting-name">
          Writing Goal
        </label>
        <input 
          type="text" 
          value={writingGoal} 
          onChange={(e) => setWritingGoal(e.target.value)}
          placeholder="What's your goal for this session?"
          className="focus-mode-input"
        />
        <div className="focus-mode-hint">
          Setting a clear goal helps focus your writing session
        </div>
      </div>
      
      <div className="focus-mode-panel">
        <h3 className="focus-mode-panel-title">
          <BarChart size={16} /> Document Stats
        </h3>
        
        <ul>
          <li className="focus-mode-stat">
            <span className="focus-mode-stat-label">Words</span>
            <span className="focus-mode-stat-value">{wordCount}</span>
          </li>
          <li className="focus-mode-stat">
            <span className="focus-mode-stat-label">Characters</span>
            <span className="focus-mode-stat-value">{content.length}</span>
          </li>
          <li className="focus-mode-stat">
            <span className="focus-mode-stat-label">Reading Time</span>
            <span className="focus-mode-stat-value">{estimatedReadingTime} min</span>
          </li>
          {stats.wordsWritten > 0 && (
            <li className="focus-mode-stat">
              <span className="focus-mode-stat-label">Words Written</span>
              <span className="focus-mode-stat-value">{stats.wordsWritten}</span>
            </li>
          )}
        </ul>
        
        <div className="focus-mode-hint" style={{ marginTop: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Clock size={14} />
          <span>Stats update as you type</span>
        </div>
      </div>
      
      {/* Pomodoro Timer (only in brainstorming mode) */}
      {writingMode === 'brainstorming' && (
        <div className="focus-mode-panel">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h4 className="focus-mode-panel-title" style={{ margin: 0 }}>
              Focus Timer
            </h4>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>
              {String(pomodoro.minutes).padStart(2, '0')}:{String(pomodoro.seconds).padStart(2, '0')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!pomodoro.active ? (
              <button 
                onClick={startPomodoro}
                className="focus-mode-button"
                style={{ 
                  flex: 1, 
                  backgroundColor: 'var(--accent-primary)', 
                  color: 'white', 
                  border: 'none' 
                }}
              >
                Start Focus Session
              </button>
            ) : (
              <button 
                onClick={stopPomodoro}
                className="focus-mode-button"
                style={{ 
                  flex: 1, 
                  backgroundColor: 'var(--accent-destructive)', 
                  color: 'white', 
                  border: 'none' 
                }}
              >
                Stop Timer
              </button>
            )}
          </div>
        </div>
      )}
      
      {/* Word Frequency Analysis (only in editing mode) */}
      {writingMode === 'editing' && frequentWords.length > 0 && (
        <div className="focus-mode-panel">
          <h4 className="focus-mode-panel-title" style={{ margin: '0 0 8px 0' }}>
            Frequently Used Words
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {frequentWords.map(([word, count]) => (
              <div key={word} className="focus-mode-tag" style={{
                color: count > 3 ? 'var(--accent-destructive)' : 'var(--foreground-secondary)'
              }}>
                {word} ({count})
              </div>
            ))}
          </div>
        </div>
      )}
      
      {/* Text-to-Speech (only in reviewing mode) */}
      {writingMode === 'reviewing' && (
        <div className="focus-mode-panel">
          <h4 className="focus-mode-panel-title" style={{ margin: '0 0 8px 0' }}>
            Listen to Your Text
          </h4>
          <p className="focus-mode-hint" style={{ margin: '0 0 12px 0' }}>
            Hearing your text read aloud helps catch awkward phrasing and errors.
          </p>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!tts.isSpeaking ? (
              <button 
                onClick={speakText}
                className="focus-mode-button"
                style={{ 
                  flex: 1, 
                  backgroundColor: 'var(--accent-primary)', 
                  color: 'white', 
                  border: 'none',
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
                className="focus-mode-button"
                style={{ 
                  flex: 1, 
                  backgroundColor: 'var(--accent-destructive)', 
                  color: 'white', 
                  border: 'none' 
                }}
              >
                Stop Reading
              </button>
            )}
          </div>
        </div>
      )}
      
      <div className="focus-mode-panel" style={{ marginTop: '24px' }}>
        <div style={{ marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '6px' }}>
          <Search size={14} />
          <span style={{ color: 'var(--foreground-primary)' }}>Writing Mode Tips</span>
        </div>
        {writingMode === 'brainstorming' && (
          <p style={{ margin: '0' }}>In brainstorming mode, focus on quantity over quality. Write down all ideas without judgment.</p>
        )}
        {writingMode === 'drafting' && (
          <p style={{ margin: '0' }}>In drafting mode, get your thoughts down quickly. Don't worry about perfection - that comes later.</p>
        )}
        {writingMode === 'editing' && (
          <p style={{ margin: '0' }}>In editing mode, refine your work. Look for clarity, conciseness, and coherence.</p>
        )}
        {writingMode === 'reviewing' && (
          <p style={{ margin: '0' }}>In reviewing mode, do a final check. Look for typos, formatting issues, and overall flow.</p>
        )}
      </div>
    </div>
  );
};
