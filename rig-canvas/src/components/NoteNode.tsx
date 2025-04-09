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
import { useCanvasStore } from '../features/canvas';
import { FocusMode } from '../features/focus-mode';
import { MarkdownEditor } from '../features/markdown-editor';
import '../styles/nodeStyles.css';

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
  
  // Use React Flow's updateNodeInternals hook to inform React Flow about node changes
  const updateNodeInternals = useUpdateNodeInternals();
  
  // State to track dimensions during resize
  const [nodeDimensions, setNodeDimensions] = useState({
    width: nodeData.width || 250,
    height: nodeData.height || 150
  });
  
  // Default dimensions if not provided - used for initial values
  const width = nodeData.width || 250;
  const height = nodeData.height || 150;

  // Check if all nodes are initialized
  const nodesInitialized = useNodesInitialized();

  // Reference to track if the node has been properly initialized
  const isInitializedRef = useRef(false);
  
  // Initial setup with more aggressive updating to ensure node is properly measured
  useLayoutEffect(() => {
    // Use layout effect to ensure dimensions are set before any DOM updates
    updateNodeInternals(id);
    
    // Multiple updates with increasing delays to ensure React Flow has time to initialize the node
    // Use more frequent updates with longer total duration
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

  // Update dimensions when node data changes - with fixed dependency array
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
    // Don't put isInitializedRef.current in the dependency array
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

  // Track previous dimensions to calculate the magnitude of change
  const prevDimensionsRef = useRef({ width, height });
  
  // Handle resize during drag for real-time updates
  const nodeRef = useRef<HTMLDivElement>(null);
  
  const onResize = useCallback((event: any, params: { width: number, height: number }) => {
    // Use dimensions passed directly from the resizer component
    const { width, height } = params;
    
    // Update local state for React rendering
    setNodeDimensions({ width, height });
    
    // Important: Set a flag to avoid redundant updates during resize operations
    prevDimensionsRef.current = { width, height };
    
    // Update React Flow about the change - don't debounce during active resize
    updateNodeInternals(id);
  }, [id, updateNodeInternals]);

  // Handle resize end - this is where we commit the final size to our store
  const onResizeEnd = useCallback((event: any, params: { width: number, height: number }) => {
    const { width, height } = params;
    
    // First update local state
    setNodeDimensions({ width, height });
    
    // Then update the node data in the store
    updateNode(id, { 
      data: { 
        ...nodeData, 
        width, 
        height 
      } 
    });
    
    // Make sure React Flow knows about the new dimensions
    updateNodeInternals(id);
    
    // One more update after a brief delay to ensure connections are updated properly
    setTimeout(() => updateNodeInternals(id), 50);
  }, [id, nodeData, updateNode, updateNodeInternals]);

  // Style for the node - simplify to avoid conflicts
  const nodeStyle = {
    width: `${nodeDimensions.width}px`,
    height: `${nodeDimensions.height}px`,
    backgroundColor: nodeData.color || 'var(--bg-secondary)',
    transition: 'none', // Disable transitions during resize
    // Promote to GPU rendering for smoother resizing
    transform: 'translate3d(0,0,0)',
    // Remove any potential interference with the resizer
    position: 'relative' as const,
    overflow: 'hidden' as const
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
      
      {/* Resize handles - only visible when selected */}
      <NodeResizer 
        minWidth={100} 
        minHeight={50}
        maxWidth={1200}
        maxHeight={800}
        isVisible={selected}
        onResize={onResize}
        onResizeEnd={onResizeEnd}
        lineClassName="border-accent-primary node-resizer-line"
        handleClassName="bg-accent-primary border-2 border-white hover:scale-110 node-resizer-handle"
        keepAspectRatio={false} // Set explicitly to false to allow free resizing
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
