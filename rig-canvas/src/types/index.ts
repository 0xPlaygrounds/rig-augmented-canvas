import type { CSSProperties, ReactNode } from 'react';
import type { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';

// Define the data structure for our note nodes
export interface NoteData {
  content?: string;
  color?: string;
  width?: number;
  height?: number;
  fileId?: string; // Reference to a file in the file system
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
    edgeType?: 'bezier' | 'straight' | 'smoothstep' | 'simplebezier';
    label?: string | ReactNode;
    animated?: boolean;
    [key: string]: unknown;
  };
};

export interface CanvasData {
  nodes: Node[];
  edges: Edge[];
  id: string;
  name: string;
  lastModified: number;
}

export interface ContextMenuPosition {
  x: number;
  y: number;
  nodeId?: string;
  edgeId?: string;
}

// File system types
export type FileType = 'note' | 'image' | 'audio' | 'canvas' | 'pdf' | 'markdown';

export interface FileData {
  id: string;
  name: string;
  type: FileType;
  content?: string;
  url?: string; // For image and audio files
  lastModified: number;
  size?: number;
}

export interface FolderData {
  id: string;
  name: string;
  files: FileData[];
  folders: FolderData[];
  lastModified: number;
}

export interface FileSystemData {
  rootFolder: FolderData;
}
