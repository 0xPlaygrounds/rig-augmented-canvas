import { useCallback } from 'react';
import { Connection, Edge, EdgeChange, Node, NodeChange, Viewport, addEdge as rfAddEdge } from '@xyflow/react';
import { useCanvasStore } from '../store/canvasStore';
import { ContextMenuState, UseCanvasReturn } from '../types';

/**
 * Hook for interacting with the canvas state and actions.
 */
export const useCanvas = (): UseCanvasReturn => {
  const {
    nodes,
    edges,
    selectedNodes,
    selectedEdges,
    contextMenu,
    viewport,
    initialized,
    setNodes,
    setEdges,
    setSelectedNodes,
    setSelectedEdges,
    setContextMenu,
    setViewport,
    setInitialized,
  } = useCanvasStore();

  // Node operations
  const addNode = useCallback(
    (node: Node) => {
      setNodes((nodes) => [...nodes, node]);
    },
    [setNodes]
  );

  const updateNode = useCallback(
    (nodeId: string, data: Partial<Node['data']>) => {
      setNodes((nodes) =>
        nodes.map((node) => 
          node.id === nodeId 
            ? { ...node, data: { ...node.data, ...data } } 
            : node
        )
      );
    },
    [setNodes]
  );

  const removeNode = useCallback(
    (nodeId: string) => {
      setNodes((nodes) => nodes.filter((node) => node.id !== nodeId));
      // Also remove any connected edges
      setEdges((edges) => 
        edges.filter(
          (edge) => edge.source !== nodeId && edge.target !== nodeId
        )
      );
    },
    [setNodes, setEdges]
  );

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nodes) => 
        changes.reduce((acc, change) => {
          // Process node changes based on type
          if (change.type === 'remove') {
            return acc.filter((node) => node.id !== change.id);
          } else if (change.type === 'position' && change.position && change.positionAbsolute) {
            return acc.map((node) => 
              node.id === change.id
                ? { 
                    ...node, 
                    position: change.position || node.position,
                    positionAbsolute: change.positionAbsolute 
                  }
                : node
            );
          } else if (change.type === 'select') {
            return acc.map((node) => 
              node.id === change.id 
                ? { ...node, selected: change.selected } 
                : node
            );
          } else if (change.type === 'dimensions' && change.dimensions) {
            return acc.map((node) => 
              node.id === change.id && change.dimensions 
                ? { 
                    ...node, 
                    width: change.dimensions?.width, 
                    height: change.dimensions?.height 
                  } 
                : node
            );
          }
          return acc;
        }, nodes)
      );
    },
    [setNodes]
  );

  // Edge operations
  const addEdge = useCallback(
    (params: Connection) => {
      setEdges((edges) => rfAddEdge({ ...params, animated: true }, edges));
    },
    [setEdges]
  );

  const updateEdge = useCallback(
    (edgeId: string, data: Partial<Edge['data']>) => {
      setEdges((edges) =>
        edges.map((edge) => 
          edge.id === edgeId 
            ? { ...edge, data: { ...edge.data, ...data } } 
            : edge
        )
      );
    },
    [setEdges]
  );

  const removeEdge = useCallback(
    (edgeId: string) => {
      setEdges((edges) => edges.filter((edge) => edge.id !== edgeId));
    },
    [setEdges]
  );

  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((edges) => 
        changes.reduce((acc, change) => {
          if (change.type === 'remove') {
            return acc.filter((edge) => edge.id !== change.id);
          } else if (change.type === 'select') {
            return acc.map((edge) => 
              edge.id === change.id 
                ? { ...edge, selected: change.selected } 
                : edge
            );
          }
          return acc;
        }, edges)
      );
    },
    [setEdges]
  );

  // Context menu operations
  const showContextMenu = useCallback(
    (state: ContextMenuState) => {
      setContextMenu(state);
    },
    [setContextMenu]
  );

  const hideContextMenu = useCallback(() => {
    setContextMenu(null);
  }, [setContextMenu]);

  // Viewport operations
  const setViewportCallback = useCallback(
    (viewport: Viewport) => {
      setViewport(viewport);
    },
    [setViewport]
  );

  // Bulk operations
  const clearCanvas = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setContextMenu(null);
  }, [setNodes, setEdges, setContextMenu]);

  const importCanvas = useCallback(
    (data: { nodes: Node[]; edges: Edge[] }) => {
      setNodes(data.nodes);
      setEdges(data.edges);
    },
    [setNodes, setEdges]
  );

  return {
    // State
    nodes,
    edges,
    selectedNodes,
    selectedEdges,
    contextMenu,
    viewport,
    initialized,
    
    // Actions
    addNode,
    updateNode,
    removeNode,
    onNodesChange,
    setSelectedNodes,
    
    addEdge,
    updateEdge,
    removeEdge,
    onEdgesChange,
    setSelectedEdges,
    
    showContextMenu,
    hideContextMenu,
    
    setViewport: setViewportCallback,
    
    clearCanvas,
    importCanvas,
  };
};
