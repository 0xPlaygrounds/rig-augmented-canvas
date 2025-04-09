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
    
    // State setters with enhanced persistence
    setNodes: (nodes) => 
      set((state) => {
        const updatedNodes = typeof nodes === 'function' ? nodes(state.nodes) : nodes;
        
        // Ensure all nodes have proper dimensions and positions saved
        const processedNodes = updatedNodes.map(node => {
          // Extract and safely convert dimensions to numbers
          const measuredWidth = typeof node.measured?.width === 'number' ? node.measured.width : undefined;
          const measuredHeight = typeof node.measured?.height === 'number' ? node.measured.height : undefined;
          const nodeWidth = typeof node.width === 'number' ? node.width : undefined;
          const nodeHeight = typeof node.height === 'number' ? node.height : undefined;
          const dataWidth = typeof node.data?.width === 'number' ? node.data.width : undefined;
          const dataHeight = typeof node.data?.height === 'number' ? node.data.height : undefined;
          
          // Start with the base node and selectively add properly typed properties
          const processedNode = { 
            ...node,
            // Preserve draggable status and resizing flags
            draggable: node.draggable !== false,
            resizing: false
          } as Node;
          
          // Only set width/height if we have valid numeric values
          if (measuredWidth || nodeWidth || dataWidth) {
            processedNode.width = measuredWidth || nodeWidth || dataWidth;
          }
          
          if (measuredHeight || nodeHeight || dataHeight) {
            processedNode.height = measuredHeight || nodeHeight || dataHeight;
          }
          
          return processedNode;
        });
        
        return { 
          ...state,
          nodes: processedNodes 
        };
      }),
    
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
      set((state) => {
        const nodeIndex = state.nodes.findIndex(node => node.id === id);
        
        // If node is not found, return unchanged state
        if (nodeIndex === -1) return state;
        
        // Get the node to be updated
        const nodeToUpdate = state.nodes[nodeIndex];
        
        // Create updated node with new data
        const updatedNode = { 
          ...nodeToUpdate, 
          data: { ...nodeToUpdate.data, ...data } 
        };
        
        // Explicitly handle width and height for resize operations
        if (data && 'width' in data && typeof data.width === 'number') {
          updatedNode.width = data.width;
        }
        
        if (data && 'height' in data && typeof data.height === 'number') {
          updatedNode.height = data.height;
        }
        
        // Create new nodes array with updated node
        const updatedNodes = [...state.nodes];
        updatedNodes[nodeIndex] = updatedNode;
        
        return {
          ...state,
          nodes: updatedNodes
        };
      }),
    
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
