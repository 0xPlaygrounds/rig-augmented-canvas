import type { CSSProperties, ReactNode } from 'react';
import type { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';

// Define the data structure for our note nodes
export interface NoteData {
  content?: string;
  color?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
}

// Define our custom node type
export type Node = ReactFlowNode<NoteData, 'note'>;

// Define our custom edge type
export type Edge = ReactFlowEdge & {
  animated?: boolean;
  style?: CSSProperties;
  label?: string | ReactNode;
  // Add direction property to control arrow direction
  direction?: 'forward' | 'backward' | 'bidirectional';
  // Add data property to store additional data
  data?: {
    direction?: 'forward' | 'backward' | 'bidirectional';
    [key: string]: unknown;
  };
};

export interface CanvasData {
  nodes: Node[];
  edges: Edge[];
}

export interface ContextMenuPosition {
  x: number;
  y: number;
  nodeId?: string;
  edgeId?: string;
}
