import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position, useReactFlow, NodeProps } from 'reactflow';
import { Trash2, Edit, X, Check, Maximize2 } from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NoteToolbar from './NoteToolbar';
import ResizeHandle, { ResizeHandlePosition } from './ResizeHandle';
import FocusMode from './FocusMode';
import { applyMarkdownFormat } from '../utils/markdownUtils';

interface NoteNodeData {
  content: string;
  color?: string;
  width?: number;
  height?: number;
}

type NoteNodeProps = NodeProps<NoteNodeData>;

const NoteNode: React.FC<NoteNodeProps> = ({ id, data, selected, xPos, yPos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [content, setContent] = useState(data.content);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reactFlowInstance = useReactFlow();
  
  const { updateNode, removeNode } = useCanvasStore(state => ({
    updateNode: state.updateNode,
    removeNode: state.removeNode
  }));
  
  // Dimensions configuration
  const defaultWidth = 250;
  const defaultHeight = 150;
  const minWidth = 150;
  const minHeight = 100;
  const maxWidth = 800;
  const maxHeight = 600;

  // Update local content when data changes (e.g., when loading from persistence)
  useEffect(() => {
    setContent(data.content);
  }, [data.content]);

  useEffect(() => {
    if (isEditing && textareaRef.current) {
      textareaRef.current.focus();
      textareaRef.current.select();
    }
  }, [isEditing]);

  const handleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  }, []);

  const handleSave = useCallback(() => {
    updateNode(id, { 
      data: { 
        ...data, 
        content 
      } 
    });
    setIsEditing(false);
  }, [id, data, content, updateNode]);

  const handleCancel = useCallback(() => {
    setContent(data.content);
    setIsEditing(false);
  }, [data.content]);

  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    removeNode(id);
  }, [id, removeNode]);

  const handleContentChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  }, []);

  const handleFormatClick = useCallback((format: string) => {
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
  }, [content]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLTextAreaElement>) => {
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
  }, [handleFormatClick, handleSave, handleCancel]);

  const handleResize = useCallback((deltaWidth: number, deltaHeight: number, position: ResizeHandlePosition) => {
    const currentWidth = data.width || defaultWidth;
    const currentHeight = data.height || defaultHeight;
    
    let newWidth = currentWidth;
    let newHeight = currentHeight;
    let newPosition = { x: xPos, y: yPos };
    
    // Calculate new dimensions and any position offsets needed
    switch (position) {
      case 'bottom-right':
        // Simple addition for bottom-right resizing
        newWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth + deltaWidth));
        newHeight = Math.max(minHeight, Math.min(maxHeight, currentHeight + deltaHeight));
        break;
        
      case 'bottom-left':
        // Adjust width and position from left side
        newWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth - deltaWidth));
        newHeight = Math.max(minHeight, Math.min(maxHeight, currentHeight + deltaHeight));
        newPosition.x = xPos + (currentWidth - newWidth);
        break;
        
      case 'top-right':
        // Adjust height and position from top side
        newWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth + deltaWidth));
        newHeight = Math.max(minHeight, Math.min(maxHeight, currentHeight - deltaHeight));
        newPosition.y = yPos + (currentHeight - newHeight);
        break;
        
      case 'top-left':
        // Adjust both width and height from top-left
        newWidth = Math.max(minWidth, Math.min(maxWidth, currentWidth - deltaWidth));
        newHeight = Math.max(minHeight, Math.min(maxHeight, currentHeight - deltaHeight));
        newPosition.x = xPos + (currentWidth - newWidth);
        newPosition.y = yPos + (currentHeight - newHeight);
        break;
    }
    
    // Update node data
    const nodeUpdate: any = {
      data: {
        ...data,
        width: newWidth,
        height: newHeight
      }
    };
    
    // Check if position has changed
    if (newPosition.x !== xPos || newPosition.y !== yPos) {
      // Update both node data and position
      reactFlowInstance.setNodes(nodes => 
        nodes.map(node => {
          if (node.id === id) {
            return {
              ...node,
              position: newPosition,
              data: {
                ...node.data,
                width: newWidth,
                height: newHeight
              }
            };
          }
          return node;
        })
      );
    } else {
      // Only update node data
      updateNode(id, nodeUpdate);
    }
  }, [data, defaultWidth, defaultHeight, id, updateNode, xPos, yPos, reactFlowInstance]);
  
  const handleFocusModeToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsFocusMode(true);
  }, []);
  
  const handleFocusModeSave = useCallback((newContent: string) => {
    setContent(newContent);
    updateNode(id, { data: { ...data, content: newContent } });
  }, [data, id, updateNode]);
  
  const handleFocusModeClose = useCallback(() => {
    setIsFocusMode(false);
  }, []);

  const backgroundColor = data.color || '#ffffff';
  const width = data.width || defaultWidth;
  const height = data.height || defaultHeight;

  // Prevent the parent node from handling drag events when resizing
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    if ((e.target as HTMLElement).classList.contains('resize-handle')) {
      e.stopPropagation();
    }
  }, []);

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
      onClickCapture={onClickCapture}
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
      
      {/* Resize handles - only show when not editing and not in focus mode */}
      {!isEditing && !isFocusMode && (
        <>
          <ResizeHandle 
            position="bottom-right" 
            onResize={(deltaWidth, deltaHeight) => handleResize(deltaWidth, deltaHeight, 'bottom-right')} 
          />
          <ResizeHandle 
            position="bottom-left" 
            onResize={(deltaWidth, deltaHeight) => handleResize(deltaWidth, deltaHeight, 'bottom-left')} 
          />
          <ResizeHandle 
            position="top-right" 
            onResize={(deltaWidth, deltaHeight) => handleResize(deltaWidth, deltaHeight, 'top-right')} 
          />
          <ResizeHandle 
            position="top-left" 
            onResize={(deltaWidth, deltaHeight) => handleResize(deltaWidth, deltaHeight, 'top-left')} 
          />
        </>
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