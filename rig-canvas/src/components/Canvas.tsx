import React, { useCallback, useRef, useMemo, useState, useEffect, DragEvent } from 'react';
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
  NodeChange,
  Node as ReactFlowNode,
  ConnectionLineType,
  MarkerType,
} from '@xyflow/react';
import CustomEdge from './CustomEdge';
import '@xyflow/react/dist/style.css';

import { useCanvasStore } from '../store/canvasStore';
import NoteNode from './NoteNode';
import ContextMenu from './ContextMenu';
import { Plus } from 'lucide-react';
import { Node, NoteData, FileData } from '../types';
import { useFileSystem } from '../hooks/useFileSystem';

interface CanvasProps {
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
  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();
  const { getFile } = useFileSystem();
  
  // Handle file drop from the sidebar
  const handleFileDrop = useCallback(async (file: FileData, dropPosition?: { x: number, y: number }) => {
    if (!reactFlowInstance) return;
    
    console.log('handleFileDrop called with file:', file);
    console.log('File ID:', file.id);
    console.log('File content:', file.content);
    
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
    
    console.log('Node position:', position);
    
    const id = `file-node-${Date.now()}`;
    let nodeData: NoteData = {
      fileId: file.id,
      width: 250,
      height: 150
    };
    
    console.log('Node data before setting content:', nodeData);
    
    // Set content based on file type
    if (file.type === 'note' || file.type === 'markdown') {
      nodeData.content = file.content || '';
    } else if (file.type === 'image') {
      nodeData.content = `![${file.name}](${file.url})`;
    } else if (file.type === 'audio') {
      nodeData.content = `<audio controls src="${file.url}"></audio>`;
    }
    
    console.log('Node data after setting content:', nodeData);
    
    const newNode: Node = {
      id,
      type: 'note',
      position,
      data: nodeData
    };
    
    console.log('Creating new node:', newNode);
    
    // Verify the file exists before creating the node
    const existingFile = await getFile(file.id);
    console.log('Verified file exists:', existingFile);
    
    addNode(newNode);
    
    console.log('Node added to canvas');
  }, [reactFlowInstance, addNode, getFile]);
  
  // Handle direct drag and drop from file explorer to canvas
  const onDragOver = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'copy';
  }, []);
  
  const onDrop = useCallback((event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    
    console.log('Drop event on canvas');
    
    // Get the dragged file data from the dataTransfer
    const fileData = event.dataTransfer.getData('application/json');
    console.log('Received file data:', fileData);
    
    if (fileData) {
      try {
        const file = JSON.parse(fileData) as FileData;
        console.log('Parsed file:', file);
        console.log('File ID:', file.id);
        console.log('File content:', file.content);
        
        // Get the drop position
        const dropPosition = {
          x: event.clientX,
          y: event.clientY
        };
        
        console.log('Drop position:', dropPosition);
        
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
  
  // Handle node position changes
  const handleNodesChange = useCallback((changes: any) => {
    // First, let ReactFlow update its internal state
    onNodesChange(changes);
    
    // Then, update our persistent store with the new positions
    changes.forEach((change: any) => {
      // Only process position changes
      if (change.type === 'position' && 'position' in change && change.position) {
        updateNode(change.id, { position: change.position });
      }
    });
  }, [onNodesChange, updateNode]);

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
            direction: 'forward' as const // Store direction in data with explicit type
          }
        };
        console.log('Creating new edge:', newEdge);
        addEdge(newEdge);
      }
    },
    [addEdge]
  );

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

  // Handle edge click to select it
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
      
      console.log('Opening context menu at:', { x, y });
      setContextMenu({ x, y });
    },
    [setContextMenu]
  );

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
          style: { stroke: 'var(--accent-primary)', strokeWidth: 2, strokeDasharray: '5 5' },
          data: {
            direction: 'forward' as const // Store direction in data with explicit type
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
