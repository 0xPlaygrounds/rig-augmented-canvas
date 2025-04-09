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
  useNodesInitialized,
  useReactFlow
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
  
  // Use React Flow's hooks to interact with the flow instance
  const updateNodeInternals = useUpdateNodeInternals();
  const reactFlowInstance = useReactFlow();
  
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
    
    // DEBUG: Log resize event
    console.log(`[DEBUG][Node ${id}] RESIZE EVENT:`, { width, height, event });
    
    // Update local state for React rendering
    setNodeDimensions({ width, height });
    
    // Important: Set a flag to avoid redundant updates during resize operations
    prevDimensionsRef.current = { width, height };
    
    // Force immediate DOM update for visual feedback
    if (nodeRef.current) {
      nodeRef.current.style.width = `${width}px`;
      nodeRef.current.style.height = `${height}px`;
    }
    
    // CRITICAL: Directly update the node in ReactFlow instance
    // This is a more direct approach that bypasses React Flow's normal update mechanism
    const nodes = reactFlowInstance.getNodes();
    const nodeIndex = nodes.findIndex(node => node.id === id);
    
    if (nodeIndex !== -1) {
      const updatedNodes = [...nodes];
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        width,
        height,
        data: {
          ...updatedNodes[nodeIndex].data,
          width,
          height
        }
      };
      
      // Set the nodes directly in ReactFlow, bypassing React's update cycle
      reactFlowInstance.setNodes(updatedNodes);
    }
    
    // Update React Flow about the change - don't debounce during active resize
    updateNodeInternals(id);
    
    // DEBUG: Log after updating node internals
    console.log(`[DEBUG][Node ${id}] After updateNodeInternals during resize`);
  }, [id, updateNodeInternals, reactFlowInstance]);

  // Handle resize end - this is where we commit the final size to our store
  const onResizeEnd = useCallback((event: any, params: { width: number, height: number }) => {
    const { width, height } = params;
    
    // DEBUG: Log resize end
    console.log(`[DEBUG][Node ${id}] RESIZE END:`, { width, height, event });
    
    // First update local state
    setNodeDimensions({ width, height });
    
    // Force immediate DOM update for visual feedback
    if (nodeRef.current) {
      nodeRef.current.style.width = `${width}px`;
      nodeRef.current.style.height = `${height}px`;
    }
    
    // CRITICAL: Directly update the node in ReactFlow instance again for final size
    const nodes = reactFlowInstance.getNodes();
    const nodeIndex = nodes.findIndex(node => node.id === id);
    
    if (nodeIndex !== -1) {
      const updatedNodes = [...nodes];
      updatedNodes[nodeIndex] = {
        ...updatedNodes[nodeIndex],
        width,
        height,
        data: {
          ...updatedNodes[nodeIndex].data,
          width,
          height
        }
      };
      
      // Set the nodes directly in ReactFlow, bypassing React's update cycle
      reactFlowInstance.setNodes(updatedNodes);
    }
    
    // Then update the node data in the store
    console.log(`[DEBUG][Node ${id}] Updating node data with new dimensions:`, { width, height });
    
    // Add a brief delay before updating the store to ensure DOM updates have happened
    setTimeout(() => {
      updateNode(id, { 
        data: { 
          ...nodeData, 
          width, 
          height 
        } 
      });
      
      // Make sure React Flow knows about the new dimensions
      updateNodeInternals(id);
      console.log(`[DEBUG][Node ${id}] updateNodeInternals after resize`);
      
      // Additional update for edge connections
      setTimeout(() => {
        updateNodeInternals(id);
        console.log(`[DEBUG][Node ${id}] Final updateNodeInternals after resize`);
      }, 100);
    }, 10);
  }, [id, nodeData, updateNode, updateNodeInternals, reactFlowInstance]);

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
  
  // Force inline styles using direct DOM manipulation
  useEffect(() => {
    if (nodeRef.current) {
      // Apply important styles directly to DOM for maximum override capability
      const style = nodeRef.current.style;
      style.setProperty('width', `${nodeDimensions.width}px`, 'important');
      style.setProperty('height', `${nodeDimensions.height}px`, 'important');
      style.setProperty('min-width', `${nodeDimensions.width}px`, 'important');
      style.setProperty('min-height', `${nodeDimensions.height}px`, 'important');
      style.setProperty('transition', 'none', 'important');
      style.setProperty('box-sizing', 'border-box', 'important');
      style.setProperty('max-width', 'none', 'important');
      style.setProperty('max-height', 'none', 'important');
    }
  }, [nodeDimensions.width, nodeDimensions.height]);

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
      
      {/* Resize handles with forced visibility and aggressive styling */}
      <NodeResizer 
        minWidth={100} 
        minHeight={50}
        maxWidth={1200}
        maxHeight={800}
        isVisible={selected} 
        onResize={(event, params) => {
          // Directly manipulate the DOM during resize for immediate feedback
          if (nodeRef.current) {
            nodeRef.current.style.width = `${params.width}px`;
            nodeRef.current.style.height = `${params.height}px`;
          }
          onResize(event, params);
        }}
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
