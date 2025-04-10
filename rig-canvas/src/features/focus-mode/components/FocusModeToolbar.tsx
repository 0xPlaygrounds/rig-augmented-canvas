import React from 'react';
import { 
  Bold, Italic, List, ListOrdered, Heading1, Heading2, 
  Quote, Code, Link, AlignLeft 
} from 'lucide-react';
import { WritingMode } from '../types';

interface FocusModeToolbarProps {
  handleFormatClick: (format: string) => void;
  currentWritingMode: WritingMode;
}

/**
 * Format button component for the toolbar
 */
const FormatButton: React.FC<{ 
  onClick: () => void; 
  title: string; 
  children: React.ReactNode;
}> = ({ onClick, title, children }) => {
  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
      className="focus-mode-format-button"
      title={title}
    >
      {children}
    </button>
  );
};

/**
 * Toolbar component for the Focus Mode editor
 * Displays different formatting options depending on the writing mode
 */
export const FocusModeToolbar: React.FC<FocusModeToolbarProps> = ({
  handleFormatClick,
  currentWritingMode
}) => {
  return (
    <div className="focus-mode-toolbar">
      <div className="focus-mode-toolbar-group">
        <FormatButton onClick={() => handleFormatClick('**')} title="Bold (Ctrl+B)">
          <Bold size={16} />
        </FormatButton>
        <FormatButton onClick={() => handleFormatClick('*')} title="Italic (Ctrl+I)">
          <Italic size={16} />
        </FormatButton>
        
        <div className="focus-mode-toolbar-divider"></div>
        
        <FormatButton onClick={() => handleFormatClick('# ')} title="Heading 1">
          <Heading1 size={16} />
        </FormatButton>
        <FormatButton onClick={() => handleFormatClick('## ')} title="Heading 2">
          <Heading2 size={16} />
        </FormatButton>
        
        <div className="focus-mode-toolbar-divider"></div>
        
        <FormatButton onClick={() => handleFormatClick('- ')} title="Bullet List">
          <List size={16} />
        </FormatButton>
        <FormatButton onClick={() => handleFormatClick('1. ')} title="Numbered List">
          <ListOrdered size={16} />
        </FormatButton>
        
        <div className="focus-mode-toolbar-divider"></div>
        
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
      
      <div className="focus-mode-mode-hint">
        {currentWritingMode === 'brainstorming' && 'Brainstorming: Just get ideas down'}
        {currentWritingMode === 'drafting' && 'Drafting: Focus on content, not perfection'}
        {currentWritingMode === 'editing' && 'Editing: Refine and improve your work'}
        {currentWritingMode === 'reviewing' && 'Reviewing: Final polish before completion'}
      </div>
    </div>
  );
};
