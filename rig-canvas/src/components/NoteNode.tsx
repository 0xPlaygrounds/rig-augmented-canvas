/**
 * NoteNode Component
 * 
 * Represents a note node in the canvas. Supports:
 * - Markdown content editing and rendering
 * - Resizing, focus mode, and quick editing
 * - File linking for persistence
 * - Multiple connection points for edges
 */

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position, useReactFlow, NodeProps, NodeResizer } from '@xyflow/react';
import { Trash2, Edit, X, Check, Maximize2, Link } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// Local components
import NoteToolbar from './NoteToolbar';
import FocusMode from './FocusMode';

// Hooks
import { useCanvasStore } from '../store/canvasStore';
import { useFileSystem } from '../hooks/useFileSystem';

// Utils
import { applyMarkdownFormat } from '../utils/markdownUtils';

/**
 * Data structure for note nodes
 */
interface NoteNodeData {
  /** Content text (markdown supported) */
  content?: string;
  /** Background color */
  color?: string;
  /** Width in pixels */
  width?: number;
  /** Height in pixels */
  height?: number;
  /** Reference to a file ID if linked */
  fileId?: string;
  /** Node display label */
  label?: string;
  /** Additional properties */
  [key: string]: unknown;
}

/**
 * NoteNode - A customizable markdown note component for the canvas
 */
const NoteNode: React.FC<NodeProps> = ({ id, data, selected, positionAbsoluteX, positionAbsoluteY }) => {
  // Use positionAbsoluteX and positionAbsoluteY instead of xPos and yPos
  const xPos = positionAbsoluteX;
  const yPos = positionAbsoluteY;
  const [isEditing, setIsEditing] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  const [isEditingLabel, setIsEditingLabel] = useState(false);
  // Cast data to NoteNodeData to access properties safely
  const nodeData = data as NoteNodeData;
  const [content, setContent] = useState(nodeData.content || '');
  const [label, setLabel] = useState(nodeData.label || 'Untitled');
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const reactFlowInstance = useReactFlow();
  
  const { updateNode, removeNode } = useCanvasStore(state => ({
    updateNode: state.updateNode,
    removeNode: state.removeNode
  }));
  
  // Get the file system hook
  const { updateFileContent, getFile } = useFileSystem();
  
  // Dimensions configuration
  const defaultWidth = 250;
  const defaultHeight = 150;
  const minWidth = 150;
  const minHeight = 100;
  const maxWidth = 800;
  const maxHeight = 600;

  // Check if this node is linked to a file
  const isLinkedToFile = Boolean(nodeData.fileId);

  // Update local content and label when data changes (e.g., when loading from persistence)
  useEffect(() => {
    const typedData = data as NoteNodeData;
    setContent(typedData.content || '');
    setLabel(typedData.label || 'Untitled');
  }, [data]);
  
  /**
   * Sync node content with linked file
   * Checks for file updates every 2 seconds if this node is linked to a file
   */
  useEffect(() => {
    const typedData = data as NoteNodeData;
    const fileId = typedData.fileId;
    
    if (!fileId) return; // Not linked to a file
    
    // Function to check for file updates
    const checkForFileUpdates = async () => {
      try {
        const file = await getFile(fileId);
        
        if (file && file.content !== content) {
          // Update the local content
          setContent(file.content || '');
          
          // Update the node data
          updateNode(id, {
            position: { x: xPos, y: yPos },
            data: {
              ...typedData,
              content: file.content
            }
          });
        }
      } catch (error) {
        console.error('Error checking for file updates:', error);
      }
    };
    
    // Check for updates immediately
    checkForFileUpdates();
    
    // Set up interval to check for updates every 2 seconds
    const intervalId = setInterval(checkForFileUpdates, 2000);
    
    // Clean up interval on unmount
    return () => {
      clearInterval(intervalId);
    };
  }, [id, data, content, xPos, yPos, updateNode, getFile]);

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

  /**
   * Save the note content and update linked file if necessary
   */
  const handleSave = useCallback(async () => {
    const typedData = data as NoteNodeData;
    
    // Update the node in the canvas
    updateNode(id, { 
      position: { x: xPos, y: yPos },
      data: { 
        ...typedData, 
        content 
      } 
    });
    
    // If this node is linked to a file, update the file content as well
    if (typedData.fileId) {
      try {
        // Get the current file to verify it exists
        const currentFile = await getFile(typedData.fileId);
        
        if (currentFile) {
          // Update the file content in the file system
          await updateFileContent(typedData.fileId, { content });
        } else {
          console.error('File not found with ID:', typedData.fileId);
        }
      } catch (error) {
        console.error('Failed to update file content:', error);
      }
    }
    
    setIsEditing(false);
  }, [id, data, content, updateNode, xPos, yPos, updateFileContent, getFile]);

  const handleCancel = useCallback(() => {
    const typedData = data as NoteNodeData;
    setContent(typedData.content || '');
    setIsEditing(false);
  }, [data]);

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

  /**
   * Handles resizing the node through NodeResizer component
   * Updates the width and height in the node data for persistence
   */
  const handleResize = useCallback((event: any, { width, height }: { width: number, height: number }) => {
    // Cast data to NoteNodeData
    const typedData = data as NoteNodeData;
    
    // Create a copy of the current data with updated dimensions
    const updatedData = {
      ...typedData,
      width,
      height
    };
    
    // Update the node in the store to ensure persistence
    // Note: The data object should be directly assigned, not nested inside another data property
    updateNode(id, {
      data: updatedData
    });
  }, [data, id, updateNode]);
  
  /**
   * Enters full-screen focus mode for better content editing
   */
  const handleFocusModeToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsFocusMode(true);
  }, []);
  
  // Handler for double-click to enter focus mode
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!isEditing && !isEditingLabel) { // Only enter focus mode if not already editing
      setIsFocusMode(true);
    }
  }, [isEditing, isEditingLabel]);
  
  // Handler for double-clicking the label to edit it
  const handleLabelDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsEditingLabel(true);
  }, []);
  
  // Handler for saving the label
  const handleLabelSave = useCallback(() => {
    const typedData = data as NoteNodeData;
    
    // Update the node in the canvas with the new label
    updateNode(id, { 
      position: { x: xPos, y: yPos },
      data: { 
        ...typedData, 
        label 
      } 
    });
    
    setIsEditingLabel(false);
  }, [id, data, label, updateNode, xPos, yPos]);
  
  // Handler for canceling label editing
  const handleLabelCancel = useCallback(() => {
    const typedData = data as NoteNodeData;
    setLabel(typedData.label || 'Untitled');
    setIsEditingLabel(false);
  }, [data]);
  
  // Handler for label input changes
  const handleLabelChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setLabel(e.target.value);
  }, []);
  
  // Handler for label input key down events
  const handleLabelKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleLabelSave();
    } else if (e.key === 'Escape') {
      e.preventDefault();
      handleLabelCancel();
    }
  }, [handleLabelSave, handleLabelCancel]);
  
  /**
   * Save content from focus mode and update linked file if needed
   * Called when exiting focus mode with content changes
   */
  const handleFocusModeSave = useCallback(async (newContent: string) => {
    setContent(newContent);
    const typedData = data as NoteNodeData;
    
    // Update the node in the canvas
    updateNode(id, { 
      position: { x: xPos, y: yPos },
      data: { ...typedData, content: newContent } 
    });
    
    // If this node is linked to a file, update the file content as well
    if (typedData.fileId) {
      try {
        // Get the current file to verify it exists
        const currentFile = await getFile(typedData.fileId);
        
        if (currentFile) {
          // Update the file content in the file system
          await updateFileContent(typedData.fileId, { content: newContent });
        } else {
          console.error('File not found with ID:', typedData.fileId);
        }
      } catch (error) {
        console.error('Failed to update file content from focus mode:', error);
      }
    }
  }, [data, id, updateNode, xPos, yPos, updateFileContent, getFile]);
  
  /**
   * Exit focus mode without saving changes
   */
  const handleFocusModeClose = useCallback(() => {
    setIsFocusMode(false);
  }, []);

  // Cast data to NoteNodeData and use type assertions for properties
  const typedData = data as NoteNodeData;
  const backgroundColor = typedData.color || '#ffffff';
  const width = (typedData.width as number) || defaultWidth;
  const height = (typedData.height as number) || defaultHeight;

  // Prevent the parent node from handling drag events when resizing
  const onClickCapture = useCallback((e: React.MouseEvent) => {
    // Check if the click is on a resize handle
    if (e.target instanceof Element && 
        (e.target.classList.contains('resize-handle') || 
         e.target.closest('.resize-handle'))) {
      // Stop propagation to prevent the node from being dragged
      e.stopPropagation();
      e.preventDefault();
    }
  }, []);
  
  // Also prevent mousedown events on resize handles from triggering node drag
  const onMouseDownCapture = useCallback((e: React.MouseEvent) => {
    if (e.target instanceof Element && 
        (e.target.classList.contains('resize-handle') || 
         e.target.closest('.resize-handle'))) {
      e.stopPropagation();
    }
  }, []);

  /**
   * Increases node size by 50px in both width and height
   * Respects maximum size constraints
   */
  const handleIncreaseSize = useCallback(() => {
    // Increase size by 50px in width and height
    const typedData = data as NoteNodeData;
    const currentWidth = (typedData.width as number) || defaultWidth;
    const currentHeight = (typedData.height as number) || defaultHeight;
    const newWidth = Math.min(maxWidth, currentWidth + 50);
    const newHeight = Math.min(maxHeight, currentHeight + 50);
    
    // Create a copy of the current data with updated dimensions
    const updatedData = {
      ...typedData,
      width: newWidth,
      height: newHeight
    };
    
    // Update node data with the new dimensions
    updateNode(id, {
      data: updatedData
    });
  }, [data, defaultWidth, defaultHeight, id, maxWidth, maxHeight, updateNode]);

  /**
   * Decreases node size by 50px in both width and height
   * Respects minimum size constraints
   */
  const handleDecreaseSize = useCallback(() => {
    // Decrease size by 50px in width and height
    const typedData = data as NoteNodeData;
    const currentWidth = (typedData.width as number) || defaultWidth;
    const currentHeight = (typedData.height as number) || defaultHeight;
    const newWidth = Math.max(minWidth, currentWidth - 50);
    const newHeight = Math.max(minHeight, currentHeight - 50);
    
    // Create a copy of the current data with updated dimensions
    const updatedData = {
      ...typedData,
      width: newWidth,
      height: newHeight
    };
    
    // Update node data with the new dimensions
    updateNode(id, {
      data: updatedData
    });
  }, [data, defaultWidth, defaultHeight, id, minWidth, minHeight, updateNode]);

  return (
    <div
      className={`p-3 rounded-lg shadow-node border-2 relative ${
        selected ? 'border-node-border-selected' : 'border-node-border'
      }`}
      style={{ 
        backgroundColor: '#1f2937', // Dark mode color
        width: `${width}px`,
        height: `${height}px`,
        boxShadow: 'var(--shadow)',
        display: 'flex',
        flexDirection: 'column'
      }}
      onClickCapture={onClickCapture}
      onMouseDownCapture={onMouseDownCapture}
      onDoubleClick={handleDoubleClick}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        id="top-target" 
        className="w-2 h-2 rounded-full border border-border-primary bg-handle-color shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom-source" 
        className="w-2 h-2 rounded-full border border-border-primary bg-handle-color shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        id="left-source" 
        className="w-2 h-2 rounded-full border border-border-primary bg-handle-color shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left-target" 
        className="w-2 h-2 rounded-full border border-border-primary bg-handle-color shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right-source" 
        className="w-2 h-2 rounded-full border border-border-primary bg-handle-color shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="target" 
        position={Position.Right} 
        id="right-target" 
        className="w-2 h-2 rounded-full border border-border-primary bg-handle-color shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      
      {/* Render focus mode if active */}
      {isFocusMode && (
        <FocusMode
          content={content}
          onSave={handleFocusModeSave}
          onClose={handleFocusModeClose}
        />
      )}
      
      {/* Use ReactFlow's NodeResizer component with more control */}
      {!isEditing && !isFocusMode && (
        <NodeResizer
          nodeId={id}
          minWidth={minWidth}
          minHeight={minHeight}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          isVisible={selected}
          handleClassName="resize-handle bg-blue-500 border border-white"
          handleStyle={{ width: '8px', height: '8px' }}
          lineClassName="resize-line border-blue-500"
          lineStyle={{ borderWidth: '1px', borderStyle: 'dashed' }}
          color="#3b82f6" // Blue color for handles and lines
          onResize={handleResize}
        />
      )}
      
      {/* Header section with label and controls */}
      <div className="flex justify-between items-center mb-2">
        {/* Label section (left) */}
        <div className="flex-grow mr-2">
          {isEditingLabel ? (
            <input
              type="text"
              value={label}
              onChange={handleLabelChange}
              onKeyDown={handleLabelKeyDown}
              onBlur={handleLabelSave}
              className="w-full px-2 py-1 text-sm font-medium bg-gray-700 border border-gray-500 rounded focus:outline-none focus:ring-1 focus:ring-blue-500"
              autoFocus
            />
          ) : (
            <div 
              className="px-2 py-1 text-sm font-medium text-gray-200 cursor-pointer hover:bg-gray-700 rounded"
              onDoubleClick={handleLabelDoubleClick}
              title="Double-click to edit label"
            >
              {label || 'Untitled'}
            </div>
          )}
        </div>
        
        {/* Controls section (right) */}
        <div className="flex space-x-1">
          <button
            onClick={handleIncreaseSize}
            className="p-1 text-green-500 hover:text-green-700 hover:bg-gray-700 rounded"
            title="Increase Size"
          >
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>+</span>
          </button>
          <button
            onClick={handleDecreaseSize}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-gray-700 rounded"
            title="Decrease Size"
          >
            <span style={{ fontWeight: 'bold', fontSize: '14px' }}>-</span>
          </button>
          <button
            onClick={handleFocusModeToggle}
            className="p-1 text-blue-500 hover:text-blue-700 hover:bg-gray-700 rounded"
            title="Focus Mode"
          >
            <Maximize2 size={14} />
          </button>
          <button
            onClick={handleDelete}
            className="p-1 text-red-500 hover:text-red-700 hover:bg-gray-700 rounded"
            title="Delete"
          >
            <Trash2 size={14} />
          </button>
        </div>
      </div>
        
      {/* Separator line */}
      <div className="h-px bg-gray-600 mb-2"></div>
      
      {/* Content section */}
      {isEditing ? (
        <div className="flex flex-col flex-grow">
          <NoteToolbar onFormatClick={handleFormatClick} />
          <textarea
            ref={textareaRef}
            value={content}
            onChange={handleContentChange}
            onKeyDown={handleKeyDown}
            className="w-full flex-grow min-h-[80px] p-2 border border-gray-600 rounded resize-none focus:outline-none focus:ring-1 focus:ring-blue-500 font-mono text-sm bg-gray-800"
            placeholder="Write your note here... (Markdown supported)"
          />
          <div className="flex justify-between mt-2">
            <div className="text-xs text-gray-500">
              Markdown supported
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleCancel}
                className="p-1 text-gray-500 hover:text-gray-300"
                title="Cancel (Esc)"
              >
                <X size={16} />
              </button>
              <button
                onClick={handleSave}
                className="p-1 text-green-500 hover:text-green-300"
                title="Save (Ctrl+Enter)"
                type="button"
              >
                <Check size={16} />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex-grow overflow-auto prose prose-sm max-w-none prose-invert">
          {content ? (
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {content}
            </ReactMarkdown>
          ) : (
            <span className="text-gray-400">Empty note</span>
          )}
        </div>
      )}
      
      {/* File link indicator at the bottom */}
      {isLinkedToFile && !isEditing && (
        <div className="mt-2 flex items-center">
          <span className="text-xs text-blue-500 flex items-center" title="Linked to file">
            <Link size={12} className="mr-1" />
            Linked
          </span>
        </div>
      )}
    </div>
  );
};

export default NoteNode;
