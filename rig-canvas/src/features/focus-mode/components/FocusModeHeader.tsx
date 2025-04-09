import React from 'react';
import { BookOpen, Type, X, ChevronDown, Edit3, Target, Eye, ChevronsUp } from 'lucide-react';
import { WritingMode, WritingModeInfo } from '../types';

interface FocusModeHeaderProps {
  writingMode: WritingMode;
  changeWritingMode: (mode: WritingMode) => void;
  currentModeInfo: WritingModeInfo;
  isReadingMode: boolean;
  toggleReadingMode: () => void;
  showSettingsPanel: boolean;
  setShowSettingsPanel: (show: boolean) => void;
  onClose: () => void;
  WRITING_MODES: WritingModeInfo[];
}

export const FocusModeHeader: React.FC<FocusModeHeaderProps> = ({
  writingMode,
  changeWritingMode,
  currentModeInfo,
  isReadingMode,
  toggleReadingMode,
  showSettingsPanel,
  setShowSettingsPanel,
  onClose,
  WRITING_MODES,
}) => {
  return (
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
          {/* Dynamically render the icon based on writing mode */}
          {writingMode === 'brainstorming' && <Target size={16} />}
          {writingMode === 'drafting' && <Edit3 size={16} />}
          {writingMode === 'editing' && <ChevronsUp size={16} />}
          {writingMode === 'reviewing' && <Eye size={16} />}
          <select 
            value={writingMode}
            onChange={(e) => changeWritingMode(e.target.value as WritingMode)}
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
          {currentModeInfo.description}
        </div>
      </div>
      
      <div className="focus-mode-controls" style={{ display: 'flex', gap: '8px' }}>
        <button
          onClick={toggleReadingMode}
          className={`mode-toggle-btn ${isReadingMode ? 'active' : ''}`}
          style={{
            background: isReadingMode ? 'var(--accent-primary)' : '#1f2937',
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
          onClick={() => setShowSettingsPanel(!showSettingsPanel)}
          className={`settings-btn ${showSettingsPanel ? 'active' : ''}`}
          style={{
            background: showSettingsPanel ? 'var(--accent-primary)' : '#1f2937',
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
  );
};
