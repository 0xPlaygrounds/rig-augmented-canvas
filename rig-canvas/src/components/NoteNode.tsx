/**
 * NoteNode Component
 * 
 * Represents a note node in the canvas. Supports:
 * - Markdown content editing and rendering
 * - Resizing, focus mode, and quick editing
 * - File linking for persistence
 * - Multiple connection points for edges
 */

import React, { useState, useCallback, useEffect, useRef, useLayoutEffect } from 'react';
import { 
  Handle, 
  Position, 
  NodeProps, 
  NodeResizer, 
  useUpdateNodeInternals,
  useNodesInitialized
} from '@xyflow/react';
import { Edit, Save, Trash2, Maximize2 } from 'lucide-react';
import { NoteData } from '../types';
import { useCanvasStore, useNodeResize } from '../features/canvas';
import { FocusMode } from '../features/focus-mode';
import { MarkdownEditor } from '../features/markdown-editor';
import '../styles/nodeStyles.css';

// Debug flag - controlled from one place
const DEBUG = import.meta.env.DEV;

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
  const [content, setContent] = useState(nodeData.content || '');
  const [isEditing, setIsEditing] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Use React Flow's updateNodeInternals hook
  const updateNodeInternals = useUpdateNodeInternals();
  
  // Default dimensions if not provided - used for initial values
  const initialWidth = nodeData.width || 250;
  const initialHeight = nodeData.height || 150;
  
  // State to track dimensions during resize
  const [nodeDimensions, setNodeDimensions] = useState({
    width: initialWidth,
    height: initialHeight
  });
  
  // Node element reference
  const nodeRef = useRef<HTMLDivElement>(null);
  
  // Use our custom resize hook for handling resize operations
  const { onResize, onResizeEnd, updateNodeElement } = useNodeResize({
    nodeId: id,
    nodeData: nodeData,
    initialDimensions: { width: initialWidth, height: initialHeight }
  });
  
  // Update the hook's reference to our DOM node when it changes
  useEffect(() => {
    if (nodeRef.current) {
      updateNodeElement(nodeRef.current);
    }
  }, [updateNodeElement]);
  
  // Reference to track if the node has been properly initialized
  const isInitializedRef = useRef(false);
  
  // Initial setup with more aggressive updating to ensure node is properly measured
  useLayoutEffect(() => {
    // Use layout effect to ensure dimensions are set before any DOM updates
    updateNodeInternals(id);
    
    // Multiple updates with increasing delays to ensure React Flow has time to initialize the node
    const timeoutIds = [25, 50, 100, 200, 300, 500, 800, 1000, 1500].map(delay => 
      setTimeout(() => {
        updateNodeInternals(id);
        if (delay >= 500) {
          isInitializedRef.current = true;
        }
      }, delay)
    );
    
    return () => timeoutIds.forEach(clearTimeout);
  }, [id, updateNodeInternals]);
  
  // Force update node internals whenever selected state changes
  useEffect(() => {
    // More aggressive updates when selected to ensure visibility
    updateNodeInternals(id);
    
    // If selected, update multiple times to ensure visibility
    if (selected) {
      const timeoutIds = [50, 200].map(delay => 
        setTimeout(() => {
          updateNodeInternals(id);
        }, delay)
      );
      
      return () => timeoutIds.forEach(clearTimeout);
    }
  }, [selected, id, updateNodeInternals]);

  // Update dimensions when node data changes
  useEffect(() => {
    // When dimensions change, update both local state and node internals
    const width = nodeData.width || 250;
    const height = nodeData.height || 150;
    
    // Prevent infinite loop by only updating when dimensions actually change
    if (width !== nodeDimensions.width || height !== nodeDimensions.height) {
      setNodeDimensions({ width, height });
      
      // Initial update of node internals
      updateNodeInternals(id);
      
      // One delayed update is enough
      const timerId = setTimeout(() => updateNodeInternals(id), 100);
      return () => clearTimeout(timerId);
    }
  }, [nodeData.width, nodeData.height, id, updateNodeInternals, nodeDimensions.width, nodeDimensions.height]);
  
  // Separate effect for store updates to prevent infinite loops
  useEffect(() => {
    // Only update the store for significant changes or initialization
    if (nodeData) {
      const width = nodeData.width || 250;
      const height = nodeData.height || 150;
      
      // Only update if needed and not too frequently, and after initialization
      if (isInitializedRef.current && 
          (Math.abs(width - nodeDimensions.width) > 10 || 
           Math.abs(height - nodeDimensions.height) > 10)) {
        
        // Debounce updates to prevent too many state changes
        const timerId = setTimeout(() => {
          updateNode(id, { 
            data: { 
              ...nodeData, 
              width: nodeDimensions.width, 
              height: nodeDimensions.height 
            } 
          });
        }, 200);
        
        return () => clearTimeout(timerId);
      }
    }
  }, [id, updateNode, nodeData, nodeDimensions.width, nodeDimensions.height]);

  // Toggle edit mode
  const toggleEdit = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(!isEditing);
  }, [isEditing]);

  // Handle content change
  const handleContentChange = useCallback((newContent: string) => {
    setContent(newContent);
  }, []);

  // Handle content save
  const handleContentSave = useCallback(() => {
    updateNode(id, { data: { ...nodeData, content } });
    
    // Update node internals when content changes
    updateNodeInternals(id);
  }, [id, content, nodeData, updateNode, updateNodeInternals]);

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

  // Create a standard style object for React
  const nodeStyle = {
    width: `${nodeDimensions.width}px`,
    height: `${nodeDimensions.height}px`,
    minWidth: `${nodeDimensions.width}px`,
    minHeight: `${nodeDimensions.height}px`,
    backgroundColor: nodeData.color || 'var(--bg-secondary)',
    transition: 'none', // Disable transitions during resize
    // Promote to GPU rendering for smoother resizing
    transform: 'translate3d(0,0,0)',
    // Remove any potential interference with the resizer
    position: 'relative' as const,
    overflow: 'hidden' as const,
    // Add these to force size to be respected even with CSS conflicts
    boxSizing: 'border-box' as const,
    maxWidth: 'none',
    maxHeight: 'none',
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
    
    // Update node internals after content change
    updateNodeInternals(id);
  }, [id, nodeData, updateNode, updateNodeInternals]);
  
  // Handle focus mode close
  const handleFocusClose = useCallback(() => {
    setIsFocused(false);
  }, []);

  // Handle resizer resize event
  const handleResize = useCallback((event: any, params: { width: number, height: number }) => {
    // Update local dimensions state
    setNodeDimensions({ 
      width: params.width, 
      height: params.height 
    });
    
    // Call the hook's resize handler
    onResize(event, params);
  }, [onResize]);

  return (
    <>
      {/* Render focus mode if active */}
      {isFocused && (
        <FocusMode
          initialContent={content}
          onSave={handleFocusModeSave}
          onClose={handleFocusClose}
          initialMode="drafting"
          enablePomodoro={true}
        />
      )}
      
      {/* Resize handles with forced visibility and aggressive styling */}
      <NodeResizer 
        minWidth={100} 
        minHeight={50}
        maxWidth={1200}
        maxHeight={800}
        isVisible={selected} 
        onResize={handleResize}
        onResizeEnd={onResizeEnd}
        
        // Use stronger styling to ensure visibility
        lineClassName="border-accent-primary node-resizer-line"
        handleClassName="bg-accent-primary border-2 border-white hover:scale-110 node-resizer-handle"
        
        // Explicitly set styles as inline props to override any potential CSS conflicts
        handleStyle={{ 
          backgroundColor: "var(--accent-primary)",
          width: "12px",
          height: "12px",
          borderRadius: "50%",
          border: "2px solid white",
          zIndex: 1001,
          position: "absolute",
          pointerEvents: "all"
        }}
        lineStyle={{ 
          borderColor: "var(--accent-primary)",
          borderWidth: "2px",
          zIndex: 1000,
          position: "absolute",
          pointerEvents: "none"
        }}
        
        // Disable aspect ratio lock for free resizing
        keepAspectRatio={false}
      />
      
      {/* Connection handles */}
      <Handle
        type="target"
        position={Position.Top}
        isConnectable={isConnectable}
        className="node-handle"
      />
      
      <div 
        ref={nodeRef}
        className={`note-content p-3 overflow-auto bg-bg-secondary rounded-md border ${
          selected ? 'border-accent-primary' : 'border-border-primary'
        }`}
        style={nodeStyle}
        onClick={(e) => isEditing && e.stopPropagation()}
        onDoubleClick={(e) => {
          // Only enter focus mode on double-click if not already editing
          if (!isEditing) {
            e.stopPropagation();
            setIsFocused(true);
          }
        }}
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
        
        {/* Markdown Editor */}
        <div className="h-[calc(100%-40px)]" onClick={(e) => e.stopPropagation()}>
          <MarkdownEditor
            initialContent={content}
            onChange={handleContentChange}
            onSave={handleContentSave}
            minHeight={Math.max(nodeDimensions.height - 70, 50)}
            showToolbar={isEditing}
            showStatusBar={isEditing}
            readOnly={!isEditing}
            autoFocus={isEditing}
          />
        </div>
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
