/**
 * This file contains type definitions for the Rig Canvas application.
 * These types define the structure of nodes, edges, and file system entities.
 */

import type { CSSProperties, ReactNode } from 'react';
import type { Node as ReactFlowNode, Edge as ReactFlowEdge } from '@xyflow/react';

/**
 * Represents the data structure for note nodes in the canvas
 */
export interface NoteData {
  /** Content of the note, usually markdown text */
  content?: string;
  /** Background color of the note */
  color?: string;
  /** Width of the note in pixels */
  width?: number;
  /** Height of the note in pixels */
  height?: number;
  /** Reference to a file in the file system, if this note is linked to a file */
  fileId?: string;
  /** Label or title of the note */
  label?: string;
  /** Allow for additional properties */
  [key: string]: unknown;
}

/**
 * Our custom node type extension of ReactFlow's Node
 */
export type Node = ReactFlowNode<NoteData, 'note'>;

/**
 * Direction options for edges between nodes
 */
export type EdgeDirection = 'forward' | 'backward' | 'bidirectional';

/**
 * Edge type options for styling connections between nodes
 */
export type EdgeType = 'bezier' | 'straight' | 'smoothstep' | 'simplebezier';

/**
 * Data structure for edge customization
 */
export interface EdgeData {
  /** Direction of the edge arrows */
  direction?: EdgeDirection;
  /** Visual style of the edge path */
  edgeType?: EdgeType;
  /** Optional text label for the edge */
  label?: string | ReactNode;
  /** Whether the edge should have animated dashes */
  animated?: boolean;
  /** Allow for additional properties */
  [key: string]: unknown;
}

/**
 * Our custom edge type extension of ReactFlow's Edge
 */
export type Edge = ReactFlowEdge & {
  animated?: boolean;
  style?: CSSProperties;
  label?: string | ReactNode;
  direction?: EdgeDirection;
  data?: EdgeData;
};

/**
 * Represents a complete canvas with all its nodes and edges
 */
export interface CanvasData {
  /** Unique identifier for the canvas */
  id: string;
  /** Display name of the canvas */
  name: string;
  /** All nodes in the canvas */
  nodes: Node[];
  /** All edges in the canvas */
  edges: Edge[];
  /** Timestamp of when this canvas was last modified */
  lastModified: number;
}

/**
 * Represents the position and target of a context menu
 */
export interface ContextMenuPosition {
  /** X-coordinate in the canvas */
  x: number;
  /** Y-coordinate in the canvas */
  y: number;
  /** ID of the node if the context menu is for a node */
  nodeId?: string;
  /** ID of the edge if the context menu is for an edge */
  edgeId?: string;
}

/**
 * Types of files supported in the file system
 */
export type FileType = 'note' | 'image' | 'audio' | 'canvas' | 'pdf' | 'markdown';

/**
 * Represents a file in the file system
 */
export interface FileData {
  /** Unique identifier for the file */
  id: string;
  /** Display name of the file */
  name: string;
  /** Type of the file */
  type: FileType;
  /** Text content for note, markdown, etc. */
  content?: string;
  /** URL for image, audio files */
  url?: string;
  /** Timestamp of when this file was last modified */
  lastModified: number;
  /** Size of the file in bytes */
  size?: number;
}

/**
 * Represents a folder in the file system
 */
export interface FolderData {
  /** Unique identifier for the folder */
  id: string;
  /** Display name of the folder */
  name: string;
  /** Files contained in this folder */
  files: FileData[];
  /** Sub-folders contained in this folder */
  folders: FolderData[];
  /** Timestamp of when this folder was last modified */
  lastModified: number;
}

/**
 * Represents the entire file system structure
 */
export interface FileSystemData {
  /** The top-level folder of the file system */
  rootFolder: FolderData;
}
