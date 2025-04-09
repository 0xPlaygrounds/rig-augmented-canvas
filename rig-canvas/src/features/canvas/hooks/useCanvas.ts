import { useCallback } from 'react';
import { 
  Connection, 
  Edge, 
  EdgeChange, 
  Node, 
  NodeChange, 
  Viewport, 
  addEdge as rfAddEdge,
  applyNodeChanges,
  applyEdgeChanges
} from '@xyflow/react';
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
      // Ensure node has all required properties for proper initialization and compatibility
      const initializedNode: Node = {
        ...node,
        id: node.id || `node-${Date.now()}`,
        position: node.position || { x: 0, y: 0 },
        type: node.type || 'note',
        
        // Explicit UI properties for better React Flow compatibility
        draggable: node.draggable !== undefined ? node.draggable : true,
        selectable: node.selectable !== undefined ? node.selectable : true,
        connectable: node.connectable !== undefined ? node.connectable : true,
        selected: false, // Default to not selected
        
        // Explicit dimensions at node level for XYFlow compatibility
        width: typeof node.width === 'number' ? node.width : 
               (typeof node.data?.width === 'number' ? node.data.width : 250),
        height: typeof node.height === 'number' ? node.height : 
                (typeof node.data?.height === 'number' ? node.data.height : 150),
        
        // Ensure data has all necessary properties
        data: {
          ...node.data,
          width: typeof node.data?.width === 'number' ? node.data.width : 
                 (typeof node.width === 'number' ? node.width : 250),
          height: typeof node.data?.height === 'number' ? node.data.height : 
                  (typeof node.height === 'number' ? node.height : 150),
          // Store original dimensions to allow for resetting if needed
          initialWidth: typeof node.data?.initialWidth === 'number' ? node.data.initialWidth :
                       (typeof node.data?.width === 'number' ? node.data.width : 
                        (typeof node.width === 'number' ? node.width : 250)),
          initialHeight: typeof node.data?.initialHeight === 'number' ? node.data.initialHeight :
                        (typeof node.data?.height === 'number' ? node.data.height : 
                         (typeof node.height === 'number' ? node.height : 150)),
        },
      };
      
      // Use setTimeout to ensure the node is added after the current render cycle
      // This helps avoid React Flow initialization issues
      setTimeout(() => {
        setNodes((nodes) => [...nodes, initializedNode]);
      }, 0);
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

  // Use the React Flow provided utility functions to handle node changes
  const onNodesChange = useCallback(
    (changes: NodeChange[]) => {
      setNodes((nds) => applyNodeChanges(changes, nds));
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

  // Use the React Flow provided utility functions to handle edge changes
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => {
      setEdges((eds) => applyEdgeChanges(changes, eds));
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
