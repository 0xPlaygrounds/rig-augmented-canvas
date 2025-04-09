import React from 'react';
import { ToolbarButton } from '../../../components/molecules/ToolbarButton';
import { 
  Bold, Italic, Heading1, Heading2, Heading3, 
  List, ListOrdered, Quote, Code, CodeSquare, Link, 
  Image, Minus, Eye, Edit3
} from 'lucide-react';
import { MarkdownFormatType } from '../types';
import { services } from '../../../services/ServiceProvider';

export interface MarkdownToolbarProps {
  /** Apply formatting callback */
  onFormat: (format: MarkdownFormatType) => void;
  /** Toggle between edit and preview mode */
  onTogglePreview?: () => void;
  /** Is preview mode active */
  isPreview?: boolean;
  /** Additional CSS class */
  className?: string;
}

/**
 * Toolbar for markdown editor with formatting controls
 */
export const MarkdownToolbar: React.FC<MarkdownToolbarProps> = ({
  onFormat,
  onTogglePreview,
  isPreview = false,
  className = '',
}) => {
  return (
    <div className={`flex items-center gap-1 p-2 bg-bg-secondary border-b border-border-primary ${className}`}>
      {/* Edit/Preview toggle */}
      {onTogglePreview && (
        <>
          <ToolbarButton
            onClick={onTogglePreview}
            active={isPreview}
            tooltip={isPreview ? 'Edit (Esc)' : 'Preview (Esc)'}
          >
            {isPreview ? <Edit3 size={16} /> : <Eye size={16} />}
          </ToolbarButton>
          
          <div className="h-6 border-r border-border-primary mx-1"></div>
        </>
      )}
      
      {/* Text formatting */}
      <ToolbarButton
        onClick={() => onFormat('bold')}
        tooltip="Bold (Ctrl+B)"
      >
        <Bold size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('italic')}
        tooltip="Italic (Ctrl+I)"
      >
        <Italic size={16} />
      </ToolbarButton>
      
      <div className="h-6 border-r border-border-primary mx-1"></div>
      
      {/* Headings */}
      <ToolbarButton
        onClick={() => onFormat('heading1')}
        tooltip="Heading 1 (Ctrl+1)"
      >
        <Heading1 size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('heading2')}
        tooltip="Heading 2 (Ctrl+2)"
      >
        <Heading2 size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('heading3')}
        tooltip="Heading 3 (Ctrl+3)"
      >
        <Heading3 size={16} />
      </ToolbarButton>
      
      <div className="h-6 border-r border-border-primary mx-1"></div>
      
      {/* Lists */}
      <ToolbarButton
        onClick={() => onFormat('bulletList')}
        tooltip="Bullet List"
      >
        <List size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('numberedList')}
        tooltip="Numbered List"
      >
        <ListOrdered size={16} />
      </ToolbarButton>
      
      <div className="h-6 border-r border-border-primary mx-1"></div>
      
      {/* Other formatting */}
      <ToolbarButton
        onClick={() => onFormat('quote')}
        tooltip="Quote"
      >
        <Quote size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('code')}
        tooltip="Inline Code"
      >
        <Code size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('codeBlock')}
        tooltip="Code Block"
      >
        <CodeSquare size={16} />
      </ToolbarButton>
      
      <div className="h-6 border-r border-border-primary mx-1"></div>
      
      {/* Media */}
      <ToolbarButton
        onClick={() => onFormat('link')}
        tooltip="Link"
      >
        <Link size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('image')}
        tooltip="Image"
      >
        <Image size={16} />
      </ToolbarButton>
      
      <ToolbarButton
        onClick={() => onFormat('divider')}
        tooltip="Horizontal Rule"
      >
        <Minus size={16} />
      </ToolbarButton>
      
      {/* Event for toolbar interaction */}
      <div className="flex-1" onClick={() => {
        services.events.typedPublish('ui:animation:highlight', 'markdown-toolbar');
      }}></div>
    </div>
  );
};
