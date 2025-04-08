/**
 * NoteNode Component
 * 
 * Represents a note node in the canvas. Supports:
 * - Markdown content editing and rendering
 * - Resizing, focus mode, and quick editing
 * - File linking for persistence
 * - Multiple connection points for edges
 */

import React, { useState, useCallback, memo } from 'react';
import { Handle, Position, NodeProps, NodeResizer } from '@xyflow/react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { Edit, Save, Trash2, Maximize2 } from 'lucide-react';
import { NoteData } from '../types';
import { useCanvasStore } from '../store/canvasStore';
import { applyMarkdownFormat } from '../utils/markdownUtils';
import FocusMode from './FocusMode';

// Define the component with proper typing
const NoteNode: React.FC<NodeProps> = ({ 
  id, 
  data, 
  selected,
  isConnectable 
}) => {
  // Cast data to NoteData to access properties safely
  const nodeData = data as NoteData;
  const { updateNode, removeNode } = useCanvasStore();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(nodeData.content || '');
  const [isFocused, setIsFocused] = useState(false);
  
  // Default dimensions if not provided
  const width = nodeData.width || 250;
  const height = nodeData.height || 150;

  // Handle content change
  const handleContentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
  };

  // Toggle edit mode
  const toggleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
    
    // Save content when exiting edit mode
    if (isEditing) {
      updateNode(id, { data: { ...nodeData, content } });
    }
  }, [id, isEditing, content, nodeData, updateNode]);

  // Delete node
  const handleDelete = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    removeNode(id);
  }, [id, removeNode]);

  // Toggle focus mode
  const toggleFocus = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFocused(!isFocused);
  }, [isFocused]);

  // Handle resize end
  const onResizeEnd = useCallback((_: any, params: { width: number, height: number }) => {
    updateNode(id, { 
      data: { 
        ...nodeData, 
        width: params.width, 
        height: params.height 
      } 
    });
  }, [id, nodeData, updateNode]);

  // Style for the node
  const nodeStyle = {
    width: `${width}px`,
    height: `${height}px`,
    backgroundColor: nodeData.color || 'var(--bg-secondary)',
    transition: 'width 0.2s, height 0.2s, transform 0.2s',
  };

  // Handle focus mode save
  const handleFocusModeSave = useCallback((newContent: string) => {
    setContent(newContent);
    updateNode(id, { 
      data: { 
        ...nodeData, 
        content: newContent 
      } 
    });
  }, [id, nodeData, updateNode]);
  
  // Handle focus mode close
  const handleFocusClose = useCallback(() => {
    setIsFocused(false);
  }, []);

  return (
    <>
      {/* Render focus mode if active */}
      {isFocused && (
        <FocusMode
          content={content}
          onSave={handleFocusModeSave}
          onClose={handleFocusClose}
        />
      )}
      
      {/* Resize handles - only visible when selected */}
      <NodeResizer 
        minWidth={100} 
        minHeight={50}
        isVisible={selected}
        onResizeEnd={onResizeEnd}
        lineClassName="border-accent-primary"
        handleClassName="bg-accent-primary border-2 border-white hover:scale-110"
      />
      
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="node-handle"
      />
      
      <div 
        className={`note-content p-3 overflow-auto bg-bg-secondary rounded-md border ${
          selected ? 'border-accent-primary' : 'border-border-primary'
        }`}
        style={nodeStyle}
        onClick={(e) => isEditing && e.stopPropagation()}
      >
        {/* Toolbar */}
        <div className="note-toolbar flex justify-end mb-2 gap-1">
          <button
            onClick={toggleEdit}
            className="p-1 rounded hover:bg-bg-tertiary text-text-tertiary hover:text-accent-primary transition-colors"
            title={isEditing ? "Save" : "Edit"}
          >
            {isEditing ? <Save size={16} /> : <Edit size={16} />}
          </button>
          <button
            onClick={toggleFocus}
            className="p-1 rounded hover:bg-bg-tertiary text-text-tertiary hover:text-accent-primary transition-colors"
            title="Focus Mode"
          >
            <Maximize2 size={16} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 rounded hover:bg-bg-tertiary text-text-tertiary hover:text-red-500 transition-colors"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
        
        {/* Content display/edit */}
        {isEditing ? (
          <textarea
            value={content}
            onChange={handleContentChange}
            className="w-full h-[calc(100%-40px)] p-2 bg-bg-secondary text-text-primary border border-border-primary rounded outline-none focus:border-accent-primary resize-none"
            autoFocus
            onClick={(e) => e.stopPropagation()}
          />
        ) : (
          <div className="prose prose-invert prose-sm max-w-none overflow-auto h-[calc(100%-40px)]">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content || 'Empty note'}
            </ReactMarkdown>
          </div>
        )}
      </div>
      
      <Handle
        type="source"
        position={Position.Bottom}
        isConnectable={isConnectable}
        className="node-handle"
      />
    </>
  );
};

export default NoteNode;
