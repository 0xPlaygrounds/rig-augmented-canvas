import { useMemo, useCallback, MouseEvent, ReactNode, DragEvent } from 'react';
import {
  ReactFlow,
  ReactFlowProvider,
  Background,
  BackgroundVariant,
  Controls,
  MiniMap,
  Panel,
  PanelPosition,
  NodeTypes,
  EdgeTypes,
  Node,
  OnNodesChange,
  OnEdgesChange,
  OnConnect,
  NodeMouseHandler,
  Viewport,
  OnMove,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { CanvasProps } from '../types';
import { useCanvas } from '../hooks/useCanvas';
import { useCanvasPersistence } from '../hooks/useCanvasPersistence';

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

  // Handle node click
  const handleNodeClick: NodeMouseHandler = useCallback(
    (event, node) => {
      if (onNodeClick) {
        onNodeClick(node);
      }
    },
    [onNodeClick]
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

  // Process node types with defaults
  const processedNodeTypes = useMemo(
    () => ({
      ...nodeTypes, // User-provided node types
    }),
    [nodeTypes]
  );

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
  
  // Handle file drop
  const handleDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    // Get the dragged file data from the dataTransfer
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
  }, [onFileDrop]);

  return (
    <div 
      className={`w-full h-full relative ${className}`}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <ReactFlow
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
      >
        {/* Background */}
        <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
        
        {/* Controls */}
        <Controls showInteractive={false} />
        
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

export default CanvasWithProvider;
