import { Connection, Edge, Node, Viewport } from '@xyflow/react';
import { createStore } from '../../../store/createStore';
import { CanvasState, ContextMenuState } from '../types';

// Initial state for the canvas
const initialState: CanvasState = {
  nodes: [],
  edges: [],
  selectedNodes: [],
  selectedEdges: [],
  contextMenu: null,
  viewport: { x: 0, y: 0, zoom: 1 },
};

// Extended state with initialization flag and actions
interface CanvasStoreState extends CanvasState {
  initialized: boolean;
  
  // State setters
  setNodes: (nodes: Node[] | ((nodes: Node[]) => Node[])) => void;
  setEdges: (edges: Edge[] | ((edges: Edge[]) => Edge[])) => void;
  setSelectedNodes: (nodes: Node[]) => void;
  setSelectedEdges: (edges: Edge[]) => void;
  setContextMenu: (contextMenu: ContextMenuState | null) => void;
  setViewport: (viewport: Viewport) => void;
  setInitialized: (initialized: boolean) => void;
  
  // Direct operations from old canvasStore
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<Node['data']>) => void;
  removeNode: (id: string) => void;
  
  addEdge: (connection: Connection | Edge) => void;
  updateEdge: (id: string, data: Partial<Edge>) => void;
  removeEdge: (id: string) => void;
  
  clearCanvas: () => void;
}

/**
 * Canvas store using the standardized store factory
 * This is a consolidated version that includes functionality from both
 * the old canvasStore and the new feature module implementation
 */
export const useCanvasStore = createStore<CanvasState, Omit<CanvasStoreState, keyof CanvasState>>(
  initialState,
  (set) => ({
    initialized: false,
    
    // State setters
    setNodes: (nodes) => 
      set((state) => ({ 
        ...state,
        nodes: typeof nodes === 'function' ? nodes(state.nodes) : nodes 
      })),
    
    setEdges: (edges) => 
      set((state) => ({ 
        ...state,
        edges: typeof edges === 'function' ? edges(state.edges) : edges 
      })),
    
    setSelectedNodes: (selectedNodes) => 
      set((state) => ({ ...state, selectedNodes })),
    
    setSelectedEdges: (selectedEdges) => 
      set((state) => ({ ...state, selectedEdges })),
    
    setContextMenu: (contextMenu) => 
      set((state) => ({ ...state, contextMenu })),
    
    setViewport: (viewport) => 
      set((state) => ({ ...state, viewport })),
    
    setInitialized: (initialized) => 
      set((state) => ({ ...state, initialized })),
    
    // Direct operations from old canvasStore
    addNode: (node) => 
      set((state) => ({ 
        ...state,
        nodes: [...state.nodes, node] 
      })),
    
    updateNode: (id, data) => 
      set((state) => ({
        ...state,
        nodes: state.nodes.map((node) => 
          node.id === id ? { 
            ...node, 
            data: { ...node.data, ...data } 
          } : node
        )
      })),
    
    removeNode: (id) => 
      set((state) => ({
        ...state,
        nodes: state.nodes.filter((node) => node.id !== id),
        edges: state.edges.filter(
          (edge) => edge.source !== id && edge.target !== id
        )
      })),
    
    addEdge: (connection) => 
      set((state) => {
        // Handle both Connection and Edge types
        if ('id' in connection) {
          // It's already an Edge
          return { 
            ...state,
            edges: [...state.edges, connection as Edge] 
          };
        } else {
          // It's a Connection, create an Edge with a unique id
          const edge: Edge = {
            id: `edge-${Date.now()}`,
            source: connection.source,
            sourceHandle: connection.sourceHandle,
            target: connection.target,
            targetHandle: connection.targetHandle,
          };
          
          return { 
            ...state,
            edges: [...state.edges, edge] 
          };
        }
      }),
    
    updateEdge: (id, data) => 
      set((state) => ({
        ...state,
        edges: state.edges.map((edge) => 
          edge.id === id ? { ...edge, ...data } : edge
        )
      })),
    
    removeEdge: (id) => 
      set((state) => ({
        ...state,
        edges: state.edges.filter((edge) => edge.id !== id)
      })),
    
    clearCanvas: () => 
      set((state) => ({ 
        ...state,
        nodes: [], 
        edges: [],
        contextMenu: null
      })),
  }),
  {
    name: 'canvas-store',
  }
);
