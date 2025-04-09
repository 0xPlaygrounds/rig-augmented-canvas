import React from 'react';
import { useMarkdownEditor } from '../hooks/useMarkdownEditor';
import { MarkdownToolbar } from './MarkdownToolbar';
import { MarkdownPreview } from './MarkdownPreview';
import { Card } from '../../../components/atoms/Card';
import { Button } from '../../../components/atoms/Button';
import { Save, Eye, Edit3 } from 'lucide-react';
import { MarkdownEditorOptions } from '../types';

export interface MarkdownEditorProps extends MarkdownEditorOptions {
  /** Additional CSS class for the editor container */
  className?: string;
}

/**
 * Complete markdown editor component with editing, preview, and formatting
 */
export const MarkdownEditor: React.FC<MarkdownEditorProps> = ({
  initialContent = '',
  onChange,
  onSave,
  readOnly = false,
  minHeight = 200,
  maxHeight,
  autoResize = false,
  placeholder = 'Write something...',
  autoFocus = false,
  showToolbar = true,
  showStatusBar = true,
  className = '',
}) => {
  const {
    content,
    handleContentChange,
    handleSelectionChange,
    applyFormatting,
    handleSave,
    isEditing,
    toggleEditMode,
    setIsFocused,
    stats,
    editorRef,
  } = useMarkdownEditor({
    initialContent,
    onChange,
    onSave,
    readOnly,
    autoFocus,
    showToolbar,
    showStatusBar,
  });

  return (
    <div className={`flex flex-col w-full h-full ${className}`}>
      {/* Toolbar - only show when not in read-only mode or explicitly disabled */}
      {showToolbar && !readOnly && (
        <MarkdownToolbar
          onFormat={applyFormatting}
          onTogglePreview={toggleEditMode}
          isPreview={!isEditing}
        />
      )}
      
      {/* Editor/Preview Area */}
      <div className="flex-1 overflow-hidden">
        {isEditing ? (
          <div className="h-full">
            <textarea
              ref={editorRef}
              value={content}
              onChange={handleContentChange}
              onSelect={handleSelectionChange}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="w-full h-full p-4 bg-bg-secondary text-text-primary border border-border-primary rounded outline-none focus:border-accent-primary focus:ring-1 focus:ring-accent-primary resize-none"
              placeholder={placeholder}
              readOnly={readOnly}
              style={{
                minHeight: `${minHeight}px`,
                maxHeight: maxHeight ? `${maxHeight}px` : undefined,
              }}
            />
          </div>
        ) : (
          <div className="h-full overflow-auto">
            <MarkdownPreview content={content} />
          </div>
        )}
      </div>
      
      {/* Status bar */}
      {showStatusBar && (
        <div className="flex justify-between items-center p-2 bg-bg-secondary border-t border-border-primary text-sm text-text-tertiary">
          <div className="flex space-x-3">
            <span>{stats.wordCount} words</span>
            <span>{stats.charCount} characters</span>
            {stats.readingTime > 0 && (
              <span>~{stats.readingTime} min read</span>
            )}
          </div>
          
          <div className="flex space-x-2">
            {!readOnly && onSave && (
              <Button 
                variant="primary" 
                size="sm" 
                onClick={handleSave}
                leftIcon={<Save size={14} />}
              >
                Save
              </Button>
            )}
            
            {!readOnly && (
              <Button
                variant="secondary"
                size="sm"
                onClick={toggleEditMode}
                leftIcon={isEditing ? <Eye size={14} /> : <Edit3 size={14} />}
              >
                {isEditing ? 'Preview' : 'Edit'}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
