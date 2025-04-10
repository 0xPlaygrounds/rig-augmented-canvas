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
    <div className="focus-mode-header">
      <div className="focus-mode-title">
        <div className="focus-mode-selector">
          {/* Dynamically render the icon based on writing mode */}
          {writingMode === 'brainstorming' && <Target size={16} />}
          {writingMode === 'drafting' && <Edit3 size={16} />}
          {writingMode === 'editing' && <ChevronsUp size={16} />}
          {writingMode === 'reviewing' && <Eye size={16} />}
          <select 
            value={writingMode}
            onChange={(e) => changeWritingMode(e.target.value as WritingMode)}
          >
            {WRITING_MODES.map(mode => (
              <option key={mode.id} value={mode.id}>{mode.name} Mode</option>
            ))}
          </select>
          <ChevronDown size={14} />
        </div>
        
        <div className="focus-mode-description">
          {currentModeInfo.description}
        </div>
      </div>
      
      <div className="focus-mode-controls">
        <button
          onClick={toggleReadingMode}
          className={`focus-mode-button ${isReadingMode ? 'active' : ''}`}
          title="Toggle Reading Mode (Ctrl+R)"
        >
          <BookOpen size={16} />
          <span>{isReadingMode ? 'Edit' : 'Read'}</span>
        </button>
        
        <button
          onClick={() => setShowSettingsPanel(!showSettingsPanel)}
          className={`focus-mode-button ${showSettingsPanel ? 'active' : ''}`}
          title="Toggle Settings (Ctrl+,)"
        >
          <Type size={16} />
          <span>Settings</span>
        </button>
        
        <button
          onClick={onClose}
          className="focus-mode-button"
          title="Close (Esc)"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};
