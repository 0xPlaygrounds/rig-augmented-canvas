import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Handle, Position, useReactFlow, NodeProps, NodeResizer } from '@xyflow/react';
import { Trash2, Edit, X, Check, Maximize2, Link } from 'lucide-react';
import { useCanvasStore } from '../store/canvasStore';
import { useFileSystem } from '../hooks/useFileSystem';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import NoteToolbar from './NoteToolbar';
import ResizeHandle, { ResizeHandlePosition } from './ResizeHandle';
import FocusMode from './FocusMode';
import { applyMarkdownFormat } from '../utils/markdownUtils';

// Define the data structure for our note nodes
interface NoteNodeData {
  content?: string;
  color?: string;
  width?: number;
  height?: number;
  fileId?: string;
  [key: string]: unknown;
}

// Use any for now to avoid type issues
const NoteNode: React.FC<NodeProps> = ({ id, data, selected, positionAbsoluteX, positionAbsoluteY }) => {
  // Use positionAbsoluteX and positionAbsoluteY instead of xPos and yPos
  const xPos = positionAbsoluteX;
  const yPos = positionAbsoluteY;
  const [isEditing, setIsEditing] = useState(false);
  const [isFocusMode, setIsFocusMode] = useState(false);
  // Cast data to NoteNodeData to access properties safely
  const nodeData = data as NoteNodeData;
  const [content, setContent] = useState(nodeData.content || '');
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

  // Update local content when data changes (e.g., when loading from persistence)
  useEffect(() => {
    const typedData = data as NoteNodeData;
    setContent(typedData.content || '');
  }, [data]);
  
  // Periodically check for updates to the linked file
  useEffect(() => {
    const typedData = data as NoteNodeData;
    const fileId = typedData.fileId;
    
    if (!fileId) return; // Not linked to a file
    
    console.log('Setting up file update check for fileId:', fileId);
    
    // Function to check for file updates
    const checkForFileUpdates = async () => {
      try {
        const file = await getFile(fileId);
        
        if (file && file.content !== content) {
          console.log('File content changed, updating node content');
          console.log('Old content:', content);
          console.log('New content:', file.content);
          
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

  const handleSave = useCallback(async () => {
    const typedData = data as NoteNodeData;
    
    console.log('Saving note with data:', typedData);
    console.log('File ID:', typedData.fileId);
    
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
        console.log('Updating file content for file ID:', typedData.fileId);
        console.log('New content:', content);
        
        // Get the current file to verify it exists
        const currentFile = await getFile(typedData.fileId);
        console.log('Current file:', currentFile);
        
        if (currentFile) {
          // Update the file content in the file system
          const updatedFile = await updateFileContent(typedData.fileId, { content });
          console.log('File update result:', updatedFile);
        } else {
          console.error('File not found with ID:', typedData.fileId);
        }
      } catch (error) {
        console.error('Failed to update file content:', error);
      }
    } else {
      console.log('Note is not linked to a file');
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

  const handleResize = useCallback((deltaWidth: number, deltaHeight: number, position: ResizeHandlePosition) => {
    console.log(`Resizing node ${id} with deltas: width=${deltaWidth}, height=${deltaHeight}, position=${position}`);
    
    // Cast data to NoteNodeData and use type assertions for width and height
    const typedData = data as NoteNodeData;
    const currentWidth = (typedData.width as number) || defaultWidth;
    const currentHeight = (typedData.height as number) || defaultHeight;
    
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
    
    console.log(`New dimensions: width=${newWidth}, height=${newHeight}, position=`, newPosition);
    
    try {
      // Force a direct update to the ReactFlow nodes
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
      
      // Also update the store to ensure persistence
      // Make sure to include the position in the update to ensure it's persisted
      updateNode(id, {
        position: newPosition,
        data: {
          ...typedData,
          width: newWidth,
          height: newHeight
        }
      });
      
      console.log('Node updated successfully');
    } catch (error) {
      console.error('Error updating node:', error);
    }
  }, [data, defaultWidth, defaultHeight, id, updateNode, xPos, yPos, reactFlowInstance]);
  
  const handleFocusModeToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    setIsFocusMode(true);
  }, []);
  
  // Handler for double-click to enter focus mode
  const handleDoubleClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    if (!isEditing) { // Only enter focus mode if not already editing
      setIsFocusMode(true);
    }
  }, [isEditing]);
  
  const handleFocusModeSave = useCallback(async (newContent: string) => {
    setContent(newContent);
    const typedData = data as NoteNodeData;
    
    console.log('Saving note from focus mode with data:', typedData);
    console.log('File ID:', typedData.fileId);
    
    // Update the node in the canvas
    updateNode(id, { 
      position: { x: xPos, y: yPos },
      data: { ...typedData, content: newContent } 
    });
    
    // If this node is linked to a file, update the file content as well
    if (typedData.fileId) {
      try {
        console.log('Updating file content from focus mode for file ID:', typedData.fileId);
        console.log('New content:', newContent);
        
        // Get the current file to verify it exists
        const currentFile = await getFile(typedData.fileId);
        console.log('Current file:', currentFile);
        
        if (currentFile) {
          // Update the file content in the file system
          const updatedFile = await updateFileContent(typedData.fileId, { content: newContent });
          console.log('File update result from focus mode:', updatedFile);
        } else {
          console.error('File not found with ID:', typedData.fileId);
        }
      } catch (error) {
        console.error('Failed to update file content from focus mode:', error);
      }
    } else {
      console.log('Note is not linked to a file');
    }
  }, [data, id, updateNode, xPos, yPos, updateFileContent, getFile]);
  
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

  const handleIncreaseSize = useCallback(() => {
    console.log("Increasing size");
    // Increase size by 50px in width and height
    const typedData = data as NoteNodeData;
    const currentWidth = (typedData.width as number) || defaultWidth;
    const currentHeight = (typedData.height as number) || defaultHeight;
    const newWidth = Math.min(maxWidth, currentWidth + 50);
    const newHeight = Math.min(maxHeight, currentHeight + 50);
    
    // Update node data - make sure to include the position
    updateNode(id, {
      position: { x: xPos, y: yPos },
      data: {
        ...typedData,
        width: newWidth,
        height: newHeight
      }
    });
    
    console.log(`Resized to: ${newWidth}x${newHeight}`);
  }, [data, defaultWidth, defaultHeight, id, maxWidth, maxHeight, updateNode, xPos, yPos]);

  const handleDecreaseSize = useCallback(() => {
    console.log("Decreasing size");
    // Decrease size by 50px in width and height
    const typedData = data as NoteNodeData;
    const currentWidth = (typedData.width as number) || defaultWidth;
    const currentHeight = (typedData.height as number) || defaultHeight;
    const newWidth = Math.max(minWidth, currentWidth - 50);
    const newHeight = Math.max(minHeight, currentHeight - 50);
    
    // Update node data - make sure to include the position
    updateNode(id, {
      position: { x: xPos, y: yPos },
      data: {
        ...typedData,
        width: newWidth,
        height: newHeight
      }
    });
    
    console.log(`Resized to: ${newWidth}x${newHeight}`);
  }, [data, defaultWidth, defaultHeight, id, minWidth, minHeight, updateNode, xPos, yPos]);

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
      onMouseDownCapture={onMouseDownCapture}
      onDoubleClick={handleDoubleClick}
    >
      <Handle 
        type="target" 
        position={Position.Top} 
        id="top-target" 
        className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="source" 
        position={Position.Bottom} 
        id="bottom-source" 
        className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="source" 
        position={Position.Left} 
        id="left-source" 
        className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="target" 
        position={Position.Left} 
        id="left-target" 
        className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="source" 
        position={Position.Right} 
        id="right-source" 
        className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      <Handle 
        type="target" 
        position={Position.Right} 
        id="right-target" 
        className="w-1.5 h-1.5 rounded-full border border-gray-300 bg-white shadow-sm opacity-50 hover:opacity-100 hover:scale-125 transition-all" 
      />
      
      {/* Render focus mode if active */}
      {isFocusMode && (
        <FocusMode
          content={content}
          onSave={handleFocusModeSave}
          onClose={handleFocusModeClose}
        />
      )}
      
      {/* Use ReactFlow's built-in NodeResizer component */}
      {!isEditing && !isFocusMode && (
        <NodeResizer
          minWidth={minWidth}
          minHeight={minHeight}
          maxWidth={maxWidth}
          maxHeight={maxHeight}
          isVisible={selected}
          onResize={(event, { width, height }) => {
            const typedData = data as NoteNodeData;
            updateNode(id, {
              position: { x: xPos, y: yPos },
              data: {
                ...typedData,
                width,
                height
              }
            });
          }}
        />
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
          <div className="flex justify-between mt-2">
            <div className="flex items-center">
              {isLinkedToFile && (
                <span className="text-xs text-blue-500 flex items-center" title="Linked to file">
                  <Link size={12} className="mr-1" />
                  Linked
                </span>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={handleIncreaseSize}
                className="p-1 text-green-500 hover:text-green-700"
                title="Increase Size"
              >
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>+</span>
              </button>
              <button
                onClick={handleDecreaseSize}
                className="p-1 text-red-500 hover:text-red-700"
                title="Decrease Size"
              >
                <span style={{ fontWeight: 'bold', fontSize: '16px' }}>-</span>
              </button>
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
        </div>
      )}
    </div>
  );
};

export default NoteNode;
