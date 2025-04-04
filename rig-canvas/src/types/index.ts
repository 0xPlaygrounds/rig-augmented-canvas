import type { CSSProperties, ReactNode } from 'react';

export interface Node {
  id: string;
  type: 'note';
  position: {
    x: number;
    y: number;
  };
  data: {
    content: string;
    color?: string;
    width?: number;
    height?: number;
  };
}

export interface Edge {
  id: string;
  source: string;
  target: string;
  type?: string;
  animated?: boolean;
  style?: CSSProperties;
  label?: string | ReactNode;
  [key: string]: any; // Allow additional properties
}

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
