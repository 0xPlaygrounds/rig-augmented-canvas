import { useMemo, useCallback, type MouseEvent, type ReactNode, type DragEvent, useState, useEffect, useRef } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  type PanelPosition,
  type NodeTypes,
  type EdgeTypes,
  type Node,
  type OnNodesChange,
  type OnEdgesChange,
  type OnConnect,
  type NodeMouseHandler,
  type Viewport,
  type OnMove,
  useReactFlow,
  useNodesInitialized,
  useUpdateNodeInternals,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { type CanvasProps, type NoteNodeData } from '../types';
import { useCanvas } from '../hooks/useCanvas';
import { useCanvasPersistence } from '../hooks/useCanvasPersistence';
import { type FileData, type FileType } from '../../../types';
import NoteNode from '../../../components/NoteNode';

interface ExtendedCanvasProps extends CanvasProps {
  canvasId?: string;
  nodeTypes?: NodeTypes;
  edgeTypes?: EdgeTypes;
  contextMenu?: ReactNode;
  minZoom?: number;
  maxZoom?: number;
  panOnScroll?: boolean;
  panOnDrag?: boolean;
  zoomOnScroll?: boolean;
  zoomOnPinch?: boolean;
  zoomOnDoubleClick?: boolean;
  snapToGrid?: boolean;
  snapGrid?: [number, number];
}

/**
 * Canvas component that serves as the main interface for the graph editor
 */
export const Canvas = ({
  canvasId = 'main',
  className = '',
  children,
  toolbarContent,
  readOnly = false,
  nodeTypes = {},
  edgeTypes = {},
  contextMenu,
  minZoom = 0.1,
  maxZoom = 2,
  panOnScroll = true,
  panOnDrag = true,
  zoomOnScroll = true,
  zoomOnPinch = true,
  zoomOnDoubleClick = true,
  snapToGrid = false,
  snapGrid = [15, 15],
  onNodeClick,
  onNodeDoubleClick,
  onPaneClick,
  onFileDrop,
}: ExtendedCanvasProps) => {
  // Initialize canvas state and persistence
  const {
    nodes,
    edges,
    onNodesChange,
    onEdgesChange,
    addEdge,
    addNode,
    contextMenu: menuState,
    hideContextMenu,
    viewport,
    setViewport,
  } = useCanvas();

  // Set up persistence
  const { isLoading, lastSaved } = useCanvasPersistence({
    canvasId,
    autoSave: true,
    saveInterval: 2000,
  });

  // Node internals updating and initialization
  const updateNodeInternals = useUpdateNodeInternals();
  const nodesInitialized = useNodesInitialized();
  const reactFlowInstance = useReactFlow();

  // Handle node click with improved focus handling
  const handleNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      // Ensure the node gets proper focus for keyboard interactions
      if (event.currentTarget && 'focus' in event.currentTarget) {
        // This helps with accessibility and ensuring the node is the active element
        (event.currentTarget as HTMLElement).focus();
      }
      
      // Force an update to node internals when clicked
      updateNodeInternals(node.id);
      
      if (onNodeClick) {
        onNodeClick(node);
      }
    },
    [onNodeClick, updateNodeInternals]
  );

  // Handle node double click
  const handleNodeDoubleClick: NodeMouseHandler = useCallback(
    (event, node) => {
      if (onNodeDoubleClick) {
        onNodeDoubleClick(node);
      }
    },
    [onNodeDoubleClick]
  );

  // Handle pane click
  const handlePaneClick = useCallback(
    (event: MouseEvent) => {
      hideContextMenu();
      if (onPaneClick) {
        onPaneClick();
      }
    },
    [hideContextMenu, onPaneClick]
  );

  // Handle connection creation between nodes
  const handleConnect: OnConnect = useCallback(
    (params) => {
      addEdge(params);
    },
    [addEdge]
  );

  // Wrap handlers for readOnly mode
  const wrappedOnNodesChange: OnNodesChange = useCallback(
    (changes) => {
      if (!readOnly) {
        onNodesChange(changes);
      }
    },
    [readOnly, onNodesChange]
  );

  const wrappedOnEdgesChange: OnEdgesChange = useCallback(
    (changes) => {
      if (!readOnly) {
        onEdgesChange(changes);
      }
    },
    [readOnly, onEdgesChange]
  );

  const wrappedOnConnect: OnConnect = useCallback(
    (params) => {
      if (!readOnly) {
        handleConnect(params);
      }
    },
    [readOnly, handleConnect]
  );

  // Handle viewport change
  const handleViewportChange = useCallback((event: any) => {
    if (event?.viewport) {
      setViewport(event.viewport);
    }
  }, [setViewport]);

  // Process node types with defaults - keeping this outside component to avoid re-creation
  const processedNodeTypes = useMemo(
    () => {
      console.log('[DEBUG][Canvas] Registering node types:', {
        defaultNodeType: 'note',
        customNodeTypes: Object.keys(nodeTypes)
      });
      return {
        note: NoteNode,  // Register the NoteNode component for 'note' type
        ...nodeTypes,    // User-provided node types
      };
    },
    [nodeTypes]
  );
  
  // Track whether the canvas has completed its initial load
  const hasInitializedRef = useRef(false);
  
  // Update node internals whenever nodes change or are initialized
  useEffect(() => {
    if (nodes.length > 0) {
      // Use multiple delays with increasing timeouts to ensure the DOM has updated
      // and React Flow has had time to process the nodes
      const timeoutIds = [50, 200, 500, 1000, 2000].map(delay => 
        setTimeout(() => {
          // Update internal node measurements to ensure edges connect properly
          nodes.forEach(node => {
            updateNodeInternals(node.id);
          });
          
          // After the final update, ensure the viewport is properly adjusted
          // but only do fitView if viewport hasn't been restored from storage yet
          if (delay === 2000 && nodesInitialized && reactFlowInstance) {
            if (!hasInitializedRef.current) {
              if (viewport && viewport.zoom) {
                // If we have a saved viewport, explicitly set it
                reactFlowInstance.setViewport({
                  x: viewport.x,
                  y: viewport.y,
                  zoom: viewport.zoom
                }, { duration: 0 });  // Instant transition
              } else {
                // Only fit view if no viewport was saved
                reactFlowInstance.fitView({ padding: 0.2, includeHiddenNodes: false });
              }
              
              // Mark as initialized to prevent multiple viewport resets
              hasInitializedRef.current = true;
            }
          }
        }, delay)
      );
      
      return () => timeoutIds.forEach(clearTimeout);
    }
  }, [nodes, updateNodeInternals, nodesInitialized, reactFlowInstance, viewport]);

  // Process edge types with defaults
  const processedEdgeTypes = useMemo(
    () => ({
      ...edgeTypes, // User-provided edge types
    }),
    [edgeTypes]
  );
  
  // Handle drag over event to allow dropping
  const handleDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);
  
  // Function to create a new node
  const createNewNode = useCallback(() => {
    const nodeId = `node-${Date.now()}`;
    const position = { x: viewport.x + 200, y: viewport.y + 100 };
    
    // Create a new note node
    const newNode: Node = {
      id: nodeId,
      type: 'note', // Make sure this matches a registered node type
      position,
      draggable: true, // Explicitly set draggable to true
      data: {
        type: 'note',
        content: 'New note',
        width: 250,
        height: 150,
      } as NoteNodeData,
    };
    
    // Add the node to the canvas
    addNode(newNode);
  }, [addNode, viewport]);

  // Handle file drop
  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    // Check if files were dropped
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const file = event.dataTransfer.files[0];
      
      // Create a FileReader to read the file contents
      const reader = new FileReader();
      
      reader.onload = (e) => {
        if (e.target?.result && onFileDrop) {
          // Create a FileData object with a generated ID
          const fileData: FileData = {
            id: `file-${Date.now()}`,
            name: file.name,
            type: 'markdown' as FileType, // Default to markdown for text files
            content: e.target.result as string,
            lastModified: Date.now(),
            size: file.size
          };
          
          // Call the onFileDrop callback with the file data
          onFileDrop(fileData);
          
          // Optionally, create a node with the file information
          const nodeId = `file-node-${Date.now()}`;
          const dropPoint = { 
            x: event.clientX - event.currentTarget.getBoundingClientRect().left,
            y: event.clientY - event.currentTarget.getBoundingClientRect().top 
          };
          
          // Convert screen coordinates to flow coordinates
          const position = {
            x: (dropPoint.x - viewport.x) / viewport.zoom,
            y: (dropPoint.y - viewport.y) / viewport.zoom
          };
          
          // Create a new note node with the file name as content
          const newNode: Node = {
            id: nodeId,
            type: 'note',
            position,
            draggable: true, // Explicitly set draggable to true
            data: {
              type: 'note',
              content: `# ${file.name}\n\nType: ${file.type}\nSize: ${(file.size / 1024).toFixed(2)} KB`,
              width: 250,
              height: 150,
            } as NoteNodeData,
          };
          
          // Add the node to the canvas
          addNode(newNode);
        }
      };
      
      // Read the file as text
      reader.readAsText(file);
    } else {
      // Try to get the dragged file data from the dataTransfer
      const fileData = event.dataTransfer.getData('application/json');
      
      if (fileData && onFileDrop) {
        try {
          const file = JSON.parse(fileData);
          
          // Call the onFileDrop callback with the file data
          onFileDrop(file);
        } catch (error) {
          console.error('Error parsing dragged file data:', error);
        }
      }
    }
  }, [onFileDrop, addNode, viewport]);

  return (
    <div 
      className={`w-full h-full relative ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
        key={`flow-${nodes.length}`} // Force re-initialize when nodes change
        nodes={nodes}
        edges={edges}
        onNodesChange={wrappedOnNodesChange}
        onEdgesChange={wrappedOnEdgesChange}
        onConnect={wrappedOnConnect}
        onNodeClick={handleNodeClick}
        onNodeDoubleClick={handleNodeDoubleClick}
        onPaneClick={handlePaneClick}
        nodeTypes={processedNodeTypes}
        edgeTypes={processedEdgeTypes}
        minZoom={minZoom}
        maxZoom={maxZoom}
        defaultViewport={viewport}
        onMove={handleViewportChange}
        panOnScroll={panOnScroll}
        panOnDrag={panOnDrag}
        zoomOnScroll={zoomOnScroll}
        zoomOnPinch={zoomOnPinch}
        zoomOnDoubleClick={zoomOnDoubleClick}
        snapToGrid={snapToGrid}
        snapGrid={snapGrid}
        nodesDraggable={!readOnly}
        elementsSelectable={!readOnly}
        selectNodesOnDrag={true}
        nodeDragThreshold={1}
        nodesFocusable={true}
        edgesFocusable={false}
        disableKeyboardA11y={false}
        nodeClickDistance={5}  // More responsive node clicking
        proOptions={{ 
          hideAttribution: true
        }}
        
        // Resize handling configurations
        nodeExtent={[[-Infinity, -Infinity], [Infinity, Infinity]]} // Allow unlimited node movement
        
        // Enhanced resize options
        fitViewOptions={{
          padding: 0.2,
          includeHiddenNodes: false,
          duration: 500
        }}
        
        // Improved interaction to help with resizing
        autoPanOnNodeDrag={true}
        autoPanOnConnect={true}
        elevateEdgesOnSelect={true}  // Better edge visibility
      >
        {/* Background */}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        
        {/* Controls */}
        <Controls showInteractive={false} />
        
        {/* Add Node Button */}
        <Panel position="top-left" className="add-node-panel">
          <button
            onClick={createNewNode}
            className="bg-accent-primary hover:bg-accent-secondary text-white font-medium py-2 px-4 rounded-full shadow-md transition-colors"
            title="Add Note"
          >
            + Add Note
          </button>
        </Panel>
        
        {/* Mini map */}
        <MiniMap
          nodeStrokeWidth={3}
          zoomable
          pannable
          position="bottom-right"
        />
        
        {/* Toolbar panel */}
        {toolbarContent && (
          <Panel position="top-right" className="toolbar-panel">
            {toolbarContent}
          </Panel>
        )}
        
        {/* Context menu */}
        {contextMenu && menuState && (
          <div
            className="absolute z-10"
            style={{
              left: menuState.position.x,
              top: menuState.position.y,
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {contextMenu}
          </div>
        )}
        
        {/* Last saved indicator */}
        {lastSaved && (
          <Panel position="bottom-left" className="text-xs text-gray-500">
            Last saved: {lastSaved.toLocaleTimeString()}
          </Panel>
        )}
        
        {/* Loading indicator */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-opacity-50 bg-gray-900 z-50">
            <div className="text-white">Loading canvas...</div>
          </div>
        )}
        
        {/* Additional children */}
        {children}
      </ReactFlow>
    </div>
  );
};

/**
 * Exported Canvas component with ReactFlowProvider
 */
export const CanvasWithProvider = (props: ExtendedCanvasProps) => {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  );
};

// This is the default export
export default CanvasWithProvider;
