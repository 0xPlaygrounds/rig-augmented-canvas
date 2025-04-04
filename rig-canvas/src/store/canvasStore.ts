import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Node, Edge, ContextMenuPosition } from '../types';

interface CanvasState {
  nodes: Node[];
  edges: Edge[];
  contextMenu: ContextMenuPosition | null;
  
  addNode: (node: Node) => void;
  updateNode: (id: string, data: Partial<Node>) => void;
  removeNode: (id: string) => void;
  
  addEdge: (edge: Edge) => void;
  updateEdge: (id: string, data: Partial<Edge>) => void;
  removeEdge: (id: string) => void;
  
  setContextMenu: (position: ContextMenuPosition | null) => void;
  
  setNodes: (nodes: Node[]) => void;
  setEdges: (edges: Edge[]) => void;
  
  clearCanvas: () => void;
}

// Define the store with TypeScript
export const useCanvasStore = create<CanvasState>()(
  persist(
    (set) => ({
      nodes: [],
      edges: [],
      contextMenu: null,
      
      addNode: (node) => set((state) => ({ 
        nodes: [...state.nodes, node] 
      })),
      
      updateNode: (id, data) => set((state) => ({
        nodes: state.nodes.map((node) => 
          node.id === id ? { ...node, ...data } : node
        )
      })),
      
      removeNode: (id) => set((state) => ({
        nodes: state.nodes.filter((node) => node.id !== id),
        edges: state.edges.filter(
          (edge) => edge.source !== id && edge.target !== id
        )
      })),
      
      addEdge: (edge) => set((state) => ({ 
        edges: [...state.edges, edge] 
      })),
      
      updateEdge: (id, data) => set((state) => ({
        edges: state.edges.map((edge) => 
          edge.id === id ? { ...edge, ...data } : edge
        )
      })),
      
      removeEdge: (id) => set((state) => ({
        edges: state.edges.filter((edge) => edge.id !== id)
      })),
      
      setContextMenu: (position) => set({ contextMenu: position }),
      
      setNodes: (nodes) => set({ nodes }),
      
      setEdges: (edges) => set({ edges }),
      
      clearCanvas: () => set({ nodes: [], edges: [] }),
    }),
    {
      name: 'rig-augmented-canvas-storage',
    }
  )
);
