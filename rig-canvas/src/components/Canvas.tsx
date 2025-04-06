import React, { useCallback, useRef, useMemo, useState } from 'react';
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
import { Node, NoteData } from '../types';

const Canvas: React.FC = () => {
  const { nodes, edges, addEdge, setContextMenu, contextMenu, updateNode, updateEdge } = useCanvasStore();
  const [selectedEdgeId, setSelectedEdgeId] = useState<string | null>(null);
  // Keep track of previous selected edge to reset its style
  const prevSelectedEdgeIdRef = useRef<string | null>(null);
  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

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
    (event: React.MouseEvent, node: { id: string }) => {
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
    (event: React.MouseEvent, edge: { id: string }) => {
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
    (event: React.MouseEvent, edge: { id: string }) => {
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
    (event: React.MouseEvent) => {
      // Prevent default context menu
      event.preventDefault();
      
      const { clientX, clientY } = event;
      // Calculate position relative to the wrapper
      const boundingRect = reactFlowWrapper.current?.getBoundingClientRect();
      const x = clientX - (boundingRect?.left || 0);
      const y = clientY - (boundingRect?.top || 0);
      
      console.log('Opening context menu at:', { x, y });
      setContextMenu({ x, y });
    },
    [setContextMenu]
  );

  const { addNode } = useCanvasStore();
  
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
    <div className="w-full h-full" ref={reactFlowWrapper}>
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
        edgesUpdatable={true}
        edgesFocusable={true}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        defaultEdgeOptions={{ 
          type: 'default',
          animated: false,
          style: { stroke: '#555', strokeWidth: 2 },
          data: {
            direction: 'forward' as const // Store direction in data with explicit type
          }
        }}
      >
        <Background color="#aaa" gap={20} />
        <Controls />
        <MiniMap />
        
        <Panel position="top-right" className="bg-white p-2 rounded-md shadow-md">
          <button
            onClick={handleAddNote}
            className="flex items-center gap-2 px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
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
const CanvasWithProvider: React.FC = () => {
  return (
    <ReactFlowProvider>
      <Canvas />
    </ReactFlowProvider>
  );
};

export default CanvasWithProvider;
