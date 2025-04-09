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
  );
};
