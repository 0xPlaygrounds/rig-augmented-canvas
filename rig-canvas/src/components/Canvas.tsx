/**
 * Canvas Component
 * 
 * The core component that powers the interactive canvas area where users create notes
 * and connect them with edges. It leverages React Flow to provide the interactive
 * node-based diagram functionality.
 */

import React, { useCallback, useRef, useMemo, useState, DragEvent } from 'react';
// XY Flow (React Flow) imports
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  NodeTypes,
  EdgeTypes,
  Connection,
  Edge,
  useNodesState,
  useEdgesState,
  Panel,
  ReactFlowProvider,
  useReactFlow,
  Node as ReactFlowNode,
  NodeChange,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Local components
import CustomEdge from './CustomEdge';
import NoteNode from './NoteNode';
import ContextMenu from './ContextMenu';

// Hooks
import { useCanvasStore } from '../store/canvasStore';
import { useFileSystem } from '../hooks/useFileSystem';

// Types
import { Node, NoteData, FileData, Edge as CustomEdgeType } from '../types';

// Icons
import { Plus } from 'lucide-react';

/**
 * Props for the Canvas component
 */
interface CanvasProps {
  /** Optional callback when a file is dropped onto the canvas */
  onFileDrop?: (file: FileData) => void;
}

const Canvas: React.FC<CanvasProps> = ({ onFileDrop }) => {
  const canvasStore = useCanvasStore();
  const { 
    nodes, 
    edges, 
    addEdge, 
    setContextMenu, 
    contextMenu, 
    updateNode, 
    updateEdge, 
    addNode 
  } = canvasStore;
  
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  // Keep track of previous selected edge to reset its style
  const prevSelectedEdgeIdRef = useRef<string | null>(null);
  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState<Node>(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState<Edge>(edges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const { getFile } = useFileSystem();
  
  /**
   * Handles dropping a file from the sidebar onto the canvas
   * Creates a new node with the file's content
   */
  const handleFileDrop = useCallback(async (file: FileData, dropPosition?: { x: number, y: number }) => {
    if (!reactFlowInstance) return;
    
    // Create a position for the new node
    let position;
    
    if (dropPosition) {
      // Use the drop position if provided
      position = reactFlowInstance.screenToFlowPosition(dropPosition);
    } else {
      // Default to center of the viewport
      position = reactFlowInstance.screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });
    }
    
    const id = `file-node-${Date.now()}`;
    let nodeData: NoteData = {
      fileId: file.id,
      width: 250,
      height: 150
    };
    
    // Set content based on file type
    if (file.type === 'note' || file.type === 'markdown') {
      nodeData.content = file.content || '';
    } else if (file.type === 'image') {
      nodeData.content = `![${file.name}](${file.url})`;
    } else if (file.type === 'audio') {
      nodeData.content = `<audio controls src="${file.url}"></audio>`;
    }
    
    const newNode: Node = {
      id,
      type: 'note',
      position,
      data: nodeData
    };
    
    // Verify the file exists before creating the node
    await getFile(file.id);
    addNode(newNode);
  }, [reactFlowInstance, addNode, getFile]);
  
  /**
   * Handles drag over event to indicate we can drop files
   */
  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);
  
  /**
   * Handles drop events from file explorer to canvas
   * Parses the file data and creates a new node at the drop position
   */
  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    // Get the dragged file data from the dataTransfer
    const fileData = event.dataTransfer.getData('application/json');
    
    if (fileData) {
      try {
        const file = JSON.parse(fileData) as FileData;
        
        // Get the drop position
        const dropPosition = {
          x: event.clientX,
          y: event.clientY
        };
        
        // Create a new node at the drop position
        handleFileDrop(file, dropPosition);
      } catch (error) {
        console.error('Error parsing dragged file data:', error);
      }
    } else {
      console.warn('No file data received in drop event');
    }
  }, [handleFileDrop]);

  // Define custom node types with useMemo to prevent recreation on each render
  const nodeTypes = useMemo<NodeTypes>(() => ({
    note: NoteNode,
  }), []);

  // Define custom edge types with useMemo
  const edgeTypes = useMemo<EdgeTypes>(() => ({
    default: CustomEdge,  // Use our custom edge component
    bezier: CustomEdge,   // Also use our custom edge for bezier type
    straight: CustomEdge,  // Also use our custom edge for straight type
    step: CustomEdge,      // Also use our custom edge for step type
    smoothstep: CustomEdge // Also use our custom edge for smoothstep type
  }), []);

  // Sync store with ReactFlow state
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);
  
  /**
   * Handles node position changes and persists them to the store
   */
  const handleNodesChange = useCallback((changes: NodeChange<Node>[]) => {
    // Let ReactFlow handle the changes internally
    onNodesChange(changes);
    
    // After ReactFlow processes the changes, update our store with the current nodes
    // This ensures we're not interfering with ReactFlow's internal state management
    setTimeout(() => {
      // Get the current nodes from ReactFlow instance
      const currentNodes = reactFlowInstance.getNodes();
      
      // Update our store with the current nodes
      currentNodes.forEach(node => {
        if (node.position) {
          updateNode(node.id, { position: node.position });
        }
      });
    }, 0);
  }, [onNodesChange, updateNode, reactFlowInstance]);

  /**
   * Handles connecting two nodes with an edge
   */
  const onConnect = useCallback(
    (connection: Connection) => {
      // Ensure source and target are not null
      if (connection.source && connection.target) {
        const newEdge = {
          id: `edge-${Date.now()}`,
          source: connection.source,
          target: connection.target,
          sourceHandle: connection.sourceHandle,
          targetHandle: connection.targetHandle,
          type: 'default', // This should match the key in edgeTypes
          animated: false,
          style: { stroke: '#555', strokeWidth: 2 },
          data: {
            direction: 'forward' as const, // Store direction in data with explicit type
            edgeType: 'bezier' as const,
            animated: false
          }
        };
        addEdge(newEdge);
      }
    },
    [addEdge]
  );

  /**
   * Handles clicks on the canvas pane
   * Closes any open context menu and deselects edges
   */
  const onPaneClick = useCallback(() => {
    // Close context menu when clicking on the pane
    setContextMenu(null);
    
    // Reset style of previously selected edge
    if (prevSelectedEdgeIdRef.current) {
      const prevEdge = edges.find(e => e.id === prevSelectedEdgeIdRef.current);
      if (prevEdge) {
        updateEdge(prevSelectedEdgeIdRef.current, {
          style: { stroke: '#555', strokeWidth: 2 }
        });
      }
    }
    
    // Clear selected edge
    setSelectedEdgeId(null);
    prevSelectedEdgeIdRef.current = null;
  }, [setContextMenu, edges, updateEdge]);

  /**
   * Handles right-click on a node to open the context menu
   */
  const onNodeContextMenu = useCallback(
    (event: React.MouseEvent, node: ReactFlowNode) => {
      // Prevent default context menu
      event.preventDefault();
      
      const { clientX, clientY } = event;
      // Calculate position relative to the wrapper
      const boundingRect = reactFlowWrapper.current?.getBoundingClientRect();
      const x = clientX - (boundingRect?.left || 0);
      const y = clientY - (boundingRect?.top || 0);
      
      setContextMenu({ x, y, nodeId: node.id });
    },
    [setContextMenu]
  );

  /**
   * Handles edge clicks to show selection styling
   */
  const onEdgeClick = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      event.stopPropagation();
      
      // Reset style of previously selected edge
      if (prevSelectedEdgeIdRef.current && prevSelectedEdgeIdRef.current !== edge.id) {
        const prevEdge = edges.find(e => e.id === prevSelectedEdgeIdRef.current);
        if (prevEdge) {
          updateEdge(prevSelectedEdgeIdRef.current, {
            style: { stroke: '#555', strokeWidth: 2 }
          });
        }
      }
      
      // Update current edge style to show it's selected
      updateEdge(edge.id, {
        style: { 
          stroke: '#3b82f6', // Blue color for selected edge
          strokeWidth: 3 
        }
      });
      
      // Update selected edge state
      setSelectedEdgeId(edge.id);
      prevSelectedEdgeIdRef.current = edge.id;
    },
    [updateEdge, edges]
  );

  /**
   * Handles right-click on an edge to open the context menu
   */
  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: Edge) => {
      // Prevent default context menu
      event.preventDefault();
      
      // Reset style of previously selected edge
      if (prevSelectedEdgeIdRef.current && prevSelectedEdgeIdRef.current !== edge.id) {
        const prevEdge = edges.find(e => e.id === prevSelectedEdgeIdRef.current);
        if (prevEdge) {
          updateEdge(prevSelectedEdgeIdRef.current, {
            style: { stroke: '#555', strokeWidth: 2 }
          });
        }
      }
      
      // Select the edge if it's not already selected
      if (selectedEdgeId !== edge.id) {
        // Update edge style to show it's selected
        updateEdge(edge.id, {
          style: { 
            stroke: '#3b82f6', // Blue color for selected edge
            strokeWidth: 3 
          }
        });
        
        setSelectedEdgeId(edge.id);
        prevSelectedEdgeIdRef.current = edge.id;
      }
      
      const { clientX, clientY } = event;
      // Calculate position relative to the wrapper
      const boundingRect = reactFlowWrapper.current?.getBoundingClientRect();
      const x = clientX - (boundingRect?.left || 0);
      const y = clientY - (boundingRect?.top || 0);
      
      setContextMenu({ x, y, edgeId: edge.id });
    },
    [setContextMenu, selectedEdgeId, updateEdge, edges]
  );

  /**
   * Handles right-click on the canvas pane to open the context menu
   */
  const onPaneContextMenu = useCallback(
    (event: React.MouseEvent<Element, MouseEvent> | MouseEvent) => {
      // Prevent default context menu
      event.preventDefault();
      
      // Handle both React.MouseEvent and MouseEvent
      const clientX = 'clientX' in event ? event.clientX : 0;
      const clientY = 'clientY' in event ? event.clientY : 0;
      
      // Calculate position relative to the wrapper
      const boundingRect = reactFlowWrapper.current?.getBoundingClientRect();
      const x = clientX - (boundingRect?.left || 0);
      const y = clientY - (boundingRect?.top || 0);
      
      setContextMenu({ x, y });
    },
    [setContextMenu]
  );

  /**
   * Creates a new note in the center of the viewport
   */
  const handleAddNote = useCallback(() => {
    if (!reactFlowInstance) return;
    
    const id = `note-${Date.now()}`;
    // Use screenToFlowPosition instead of project
    const position = reactFlowInstance.screenToFlowPosition({
      x: window.innerWidth / 2,
      y: window.innerHeight / 2,
    });
    
    const newNode = {
      id,
      type: 'note' as const,
      position,
      data: { 
        content: 'New note',
        width: 250,  // Default width
        height: 150  // Default height
      },
    };
    
    // Add node to the store instead of directly to ReactFlow
    addNode(newNode);
  }, [reactFlowInstance, addNode]);

  return (
    <div 
      className="w-full h-full" 
      ref={reactFlowWrapper}
      onDragOver={onDragOver}
      onDrop={onDrop}
    >
      <ReactFlow
        nodes={reactFlowNodes}
        edges={reactFlowEdges}
        onNodesChange={handleNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeClick={onEdgeClick}
        onEdgeContextMenu={onEdgeContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        selectNodesOnDrag={false}
        nodesDraggable={true}
        nodesConnectable={true}
        elementsSelectable={true}
        edgesFocusable={true}
        fitView
        snapToGrid
        snapGrid={[40, 40]} // Match grid size from CSS variables
        defaultEdgeOptions={{ 
          type: 'default',
          animated: false,
          style: { stroke: 'var(--accent-primary)', strokeWidth: 2 },
          data: {
            direction: 'forward' as const, // Store direction in data with explicit type
            edgeType: 'bezier' as const,
            animated: false
          }
        }}
        className="bg-bg-primary"
      >
        <Background color="var(--grid-color)" gap={40} size={1} />
        <Controls 
          className="bg-bg-secondary border border-border-primary rounded-md overflow-hidden text-white" 
          style={{ 
            backgroundColor: '#1f2937', 
            color: 'white',
            // Apply custom styles to the controls via CSS variables
            ['--controls-button-background-color' as string]: '#1f2937',
            ['--controls-button-color' as string]: 'white',
            ['--controls-button-hover-background-color' as string]: '#374151',
            ['--controls-button-hover-color' as string]: 'white',
            ['--controls-button-border-color' as string]: '#374151',
            ['--controls-button-border-width' as string]: '1px',
            ['--controls-button-width' as string]: '24px',
            ['--controls-button-height' as string]: '24px',
            ['--controls-button-padding' as string]: '2px',
            ['--controls-button-border-radius' as string]: '4px',
            ['--controls-button-box-shadow' as string]: 'none',
            // Ensure the SVG icons are visible in dark mode
            ['--controls-button-svg-color' as string]: 'white',
            ['--controls-button-svg-width' as string]: '14px',
            ['--controls-button-svg-height' as string]: '14px',
          } as React.CSSProperties}
        />
        <MiniMap 
          className="bg-bg-secondary border border-border-primary rounded-md overflow-hidden"
          nodeColor="#1f2937"
          nodeBorderRadius={4}
          maskColor="rgba(0, 0, 0, 0.2)"
          style={{
            backgroundColor: '#1f2937',
            border: '1px solid #374151',
          }}
        />
        
        <Panel position="top-right" className="bg-bg-secondary p-3 rounded-md shadow-md border border-border-primary">
          <button
            onClick={handleAddNote}
            className="flex items-center gap-2 px-3 py-2 bg-accent-primary text-white rounded-md hover:bg-accent-hover transition-colors"
          >
            <Plus size={16} />
            <span>Add Note</span>
          </button>
        </Panel>
        
        {contextMenu && (
          <ContextMenu
            x={contextMenu.x}
            y={contextMenu.y}
            nodeId={contextMenu.nodeId}
            edgeId={contextMenu.edgeId}
            onClose={() => setContextMenu(null)}
          />
        )}
      </ReactFlow>
    </div>
  );
};

// Wrap with ReactFlowProvider to use hooks outside of ReactFlow
const CanvasWithProvider: React.FC<CanvasProps> = (props) => {
  return (
    <ReactFlowProvider>
      <Canvas {...props} />
    </ReactFlowProvider>
  );
};

export default CanvasWithProvider;
