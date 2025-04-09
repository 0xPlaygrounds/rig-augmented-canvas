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
            <span className="font-medium">{content.length}</span>
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
          {stats.wordsWritten > 0 && (
            <li style={{ 
              display: 'flex', 
              justifyContent: 'space-between', 
              padding: '4px 0',
              borderBottom: '1px solid #1f2937'
            }}>
              <span>Words Written</span>
              <span className="font-medium">{stats.wordsWritten}</span>
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
      {writingMode === 'brainstorming' && (
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
              {String(pomodoro.minutes).padStart(2, '0')}:{String(pomodoro.seconds).padStart(2, '0')}
            </div>
          </div>
          <div style={{ display: 'flex', gap: '8px' }}>
            {!pomodoro.active ? (
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
      )}
      
      {/* Word Frequency Analysis (only in editing mode) */}
      {writingMode === 'editing' && frequentWords.length > 0 && (
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
        </div>
      )}
      
      {/* Text-to-Speech (only in reviewing mode) */}
      {writingMode === 'reviewing' && (
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
            {!tts.isSpeaking ? (
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
