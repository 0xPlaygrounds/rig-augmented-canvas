import React, { useCallback, useRef, useState } from 'react';
import ReactFlow, {
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
} from 'reactflow';
import 'reactflow/dist/style.css';

import { useCanvasStore } from '../store/canvasStore';
import NoteNode from './NoteNode';
import ContextMenu from './ContextMenu';
import { Plus } from 'lucide-react';

// Define custom node types
const nodeTypes: NodeTypes = {
  note: NoteNode,
};

const Canvas: React.FC = () => {
  const { nodes, edges, addEdge, setContextMenu, contextMenu } = useCanvasStore();
  const [reactFlowNodes, setNodes, onNodesChange] = useNodesState(nodes);
  const [reactFlowEdges, setEdges, onEdgesChange] = useEdgesState(edges);
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const reactFlowInstance = useReactFlow();

  // Sync store with ReactFlow state
  React.useEffect(() => {
    setNodes(nodes);
    setEdges(edges);
  }, [nodes, edges, setNodes, setEdges]);

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
          animated: false,
        };
        addEdge(newEdge);
      }
    },
    [addEdge]
  );

  const onPaneClick = useCallback(() => {
    // Close context menu when clicking on the pane
    setContextMenu(null);
  }, [setContextMenu]);

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

  const onEdgeContextMenu = useCallback(
    (event: React.MouseEvent, edge: { id: string }) => {
      // Prevent default context menu
      event.preventDefault();
      
      const { clientX, clientY } = event;
      // Calculate position relative to the wrapper
      const boundingRect = reactFlowWrapper.current?.getBoundingClientRect();
      const x = clientX - (boundingRect?.left || 0);
      const y = clientY - (boundingRect?.top || 0);
      
      setContextMenu({ x, y, edgeId: edge.id });
    },
    [setContextMenu]
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
      
      setContextMenu({ x, y });
    },
    [setContextMenu]
  );

  const { addNode } = useCanvasStore();
  
  const handleAddNote = useCallback(() => {
    if (!reactFlowInstance) return;
    
    const id = `note-${Date.now()}`;
    const position = reactFlowInstance.project({
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
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        onPaneClick={onPaneClick}
        onNodeContextMenu={onNodeContextMenu}
        onEdgeContextMenu={onEdgeContextMenu}
        onPaneContextMenu={onPaneContextMenu}
        fitView
        snapToGrid
        snapGrid={[20, 20]}
        defaultEdgeOptions={{ type: 'bezier' }}
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
