import { ReactNode } from 'react';
import { Connection, Edge, EdgeChange, Node, NodeChange, Viewport } from '@xyflow/react';

// Generic node data interface to be extended by specific node types
export interface BaseNodeData {
  type: string;
  [key: string]: any;
}

// Note node specific data
export interface NoteNodeData extends BaseNodeData {
  type: 'note';
  content: string;
  lastEdited?: Date;
}

// Canvas types
export interface CanvasState {
  nodes: Node[];
  edges: Edge[];
  selectedNodes: Node[];
  selectedEdges: Edge[];
  contextMenu: ContextMenuState | null;
  viewport: Viewport;
}

export interface ContextMenuState {
  id: string;
  type: 'node' | 'edge' | 'canvas';
  position: {
    x: number;
    y: number;
  };
}

// Canvas actions
export interface CanvasActions {
  // Node operations
  addNode: (node: Node) => void;
  updateNode: (nodeId: string, data: Partial<Node['data']>) => void;
  removeNode: (nodeId: string) => void;
  onNodesChange: (changes: NodeChange[]) => void;
  setSelectedNodes: (nodes: Node[]) => void;
  
  // Edge operations
  addEdge: (params: Connection) => void;
  updateEdge: (edgeId: string, data: Partial<Edge['data']>) => void;
  removeEdge: (edgeId: string) => void;
  onEdgesChange: (changes: EdgeChange[]) => void;
  setSelectedEdges: (edges: Edge[]) => void;
  
  // Context menu operations
  showContextMenu: (state: ContextMenuState) => void;
  hideContextMenu: () => void;
  
  // Viewport operations
  setViewport: (viewport: Viewport) => void;
  
  // Bulk operations
  clearCanvas: () => void;
  importCanvas: (data: { nodes: Node[]; edges: Edge[] }) => void;
}

// Import FileData type for onFileDrop
import { FileData } from '../../types';

// Props for the Canvas component
export interface CanvasProps {
  canvasId?: string;
  className?: string;
  children?: ReactNode;
  toolbarContent?: ReactNode;
  onNodeClick?: (node: Node) => void;
  onNodeDoubleClick?: (node: Node) => void;
  onPaneClick?: () => void;
  readOnly?: boolean;
  onFileDrop?: (file: FileData) => void;
}

// Hook return type
export interface UseCanvasReturn extends CanvasState, CanvasActions {
  initialized: boolean;
}

// Persistence options
export interface CanvasPersistenceOptions {
  canvasId: string;
  autoSave?: boolean;
  saveInterval?: number;
}
