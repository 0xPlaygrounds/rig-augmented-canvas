import React, { useState, useRef, useEffect } from 'react';
import { Handle, Position } from 'reactflow';
import { Trash2, Edit, X, Check, Maximize2 } from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NoteToolbar from './NoteToolbar';
import ResizeHandle from './ResizeHandle';
import FocusMode from './FocusMode';
import { applyMarkdownFormat } from '../utils/markdownUtils';

interface NoteNodeProps {
  id: string;
  data: {
    content: string;
    color?: string;
    width?: number;
    height?: number;
  };
  selected: boolean;
}

const NoteNode: React.FC<NoteNodeProps> = ({ id, data, selected }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [content, setContent] = useState(data.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const updateNode = useCanvasStore((state) => state.updateNode);
  const removeNode = useCanvasStore((state) => state.removeNode);
  
  // Default dimensions
  const defaultWidth = 250;
  const defaultHeight = 150;
  const minWidth = 200;
  const minHeight = 100;
  const maxWidth = 500;
  const maxHeight = 400;

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateNode(id, { data: { ...data, content } });
    setIsEditing(false);
  };

  const handleCancel = () => {
    setContent(data.content);
    setIsEditing(false);
  };

  const handleDelete = () => {
    removeNode(id);
  };

  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  const handleFormatClick = (format: string) => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      const { selectionStart, selectionEnd } = textarea;
      
      const { text, cursorPosition } = applyMarkdownFormat(
        content,
        selectionStart,
        selectionEnd,
        format
      );
      
      setContent(text);
      
      // Set cursor position after state update
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(cursorPosition, cursorPosition);
      }, 0);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Handle keyboard shortcuts
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          handleFormatClick('**');
          break;
        case 'i':
          e.preventDefault();
          handleFormatClick('*');
          break;
        case 's':
          e.preventDefault();
          handleSave();
          break;
        case 'Enter':
          e.preventDefault();
          handleSave();
          break;
      }
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleCancel();
    }
  };

  const handleResize = (deltaWidth: number, deltaHeight: number) => {
    const currentWidth = data.width || defaultWidth;
    const currentHeight = data.height || defaultHeight;
    
    // Calculate new dimensions
    const newWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth + deltaWidth));
    const newHeight = Math.max(minHeight, Math.min(maxHeight, currentHeight + deltaHeight));
    
    // Update node data with new dimensions
    updateNode(id, {
      data: {
        ...data,
        width: newWidth,
        height: newHeight
      }
    });
  };
  
  const handleFocusModeToggle = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    console.log('Focus mode toggled');
    setIsFocusMode(true);
  };
  
  const handleFocusModeSave = (newContent: string) => {
    setContent(newContent);
    updateNode(id, { data: { ...data, content: newContent } });
  };
  
  const handleFocusModeClose = () => {
    setIsFocusMode(false);
  };

  const backgroundColor = data.color || '#ffffff';
  const width = data.width || defaultWidth;
  const height = data.height || defaultHeight;

  return (
    <div
      className={`p-3 rounded-md shadow-md bg-white border-2 relative ${
        selected ? 'border-blue-500' : 'border-gray-200'
      }`}
      style={{ 
        backgroundColor,
        width: `${width}px`,
        height: `${height}px`
      }}
    >
      <Handle type="target" position={Position.Top} className="w-3 h-3" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3" />
      
      {/* Render focus mode if active */}
      {isFocusMode && (
        <FocusMode
          content={content}
          onSave={handleFocusModeSave}
          onClose={handleFocusModeClose}
        />
      )}
      
      {/* Resize handle - only show when not editing and not in focus mode */}
      {!isEditing && !isFocusMode && (
        <div className="absolute bottom-0 right-0 z-20">
          <ResizeHandle onResize={handleResize} />
        </div>
      )}
      
      {isEditing ? (
        <div className="flex flex-col h-full">
          <NoteToolbar onFormatClick={handleFormatClick} />
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            className="w-full h-full min-h-[80px] p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder="Write your note here... (Markdown supported)"
          />
          <div className="flex justify-between mt-2">
            <div className="text-xs text-gray-500">
              Markdown supported
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="p-1 text-gray-500 hover:text-gray-700"
                title="Cancel (Esc)"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleSave}
                className="p-1 text-green-500 hover:text-green-700"
                title="Save (Ctrl+Enter)"
                type="button"
              >
                <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col h-full">
          <div className="flex-grow prose prose-sm max-w-none overflow-auto">
            {content ? (
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            ) : (
              <span className="text-gray-400">Empty note</span>
            )}
          </div>
          <div className="flex justify-end mt-2 space-x-2">
            <button
              onClick={handleFocusModeToggle}
              className="p-1 text-blue-500 hover:text-blue-700"
              title="Focus Mode"
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={handleEdit}
              className="p-1 text-gray-500 hover:text-gray-700"
              title="Edit"
            >
              <Edit size={16} />
            </button>
            <button
              onClick={handleDelete}
              className="p-1 text-red-500 hover:text-red-700"
              title="Delete"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteNode;
